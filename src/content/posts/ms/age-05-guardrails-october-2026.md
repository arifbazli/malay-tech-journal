---
title: 'AI guardrail Oktober 2026: attacker pusing keliling, pertahanan pindah ke luar model'
description: 'CrowdStrike, Anthropic, kajian baru dan accord White House setuju: guardrail dalam model bukan security boundary. Apa yang berubah, dan apa kau patut buat.'
pubDate: 2026-10-26
tags:
  - ai
  - security
  - guardrail
  - malaysia
categories: ['AI Guardrail Engineering']
postType: field-note
toc: true
translationKey: 'age-05-guardrails-october-2026'
draft: true
---

> Nota lapangan untuk bulan yang sibuk bagi AI guardrail: apa attacker buat, apa research tunjuk, apa vendor dan kerajaan ubah, dan apa maksudnya untuk team yang build atas LLM dan agent.

## Versi pendek

Empat benda jadi antara hujung September dan hujung Oktober 2026, dan semua cerita benda yang sama:

1. **Attacker dah pusing keliling guardrail model dalam campaign sebenar**, termasuk terhadap sasaran kerajaan di Asia Tenggara.
2. **Safety classifier per-request ada blind spot struktur.** Setiap request boleh diklasifikasi dengan betul, tapi hasil yang berbahaya tetap keluar.
3. **"Decision model" kecil yang dijadikan guardrail agent lebih senang fail open daripada yang accuracy dia tunjuk.**
4. **Vendor dan kerajaan dah layan guardrail sebagai access control dan governance**, bukan satu filter: access bertingkat untuk defender yang disahkan, dan accord industri sukarela di US yang berasaskan audit.

Kesimpulannya: guardrail yang duduk dalam model sahaja, atau di depan model sebagai filter per-mesej sahaja, tak boleh jadi security boundary kau. Kawalan kena ada dalam sistem di sekeliling model: identiti, permission, policy deterministik untuk tindakan, dan monitoring merentasi keseluruhan session.

## 1. Attacker sebenar dah pusing keliling guardrail

Pada 21 Oktober, team Counter Adversary Operations CrowdStrike publish research tentang empat threat actor yang belum pernah dilaporkan, yang tertinggal framework AI agent ofensif mereka terbuka dalam open directory. Antara Mei dan Ogos 2026, keempat-empat mereka jalankan **campaign agentic**: AI agent yang buat keputusan dan execute command sendiri. Kebanyakannya guna versi Claude dari Anthropic dan model open-weight DeepSeek.

Yang penting untuk guardrail engineering:

- **Model routing untuk exploit guardrail yang tak sekata.** Adam Meyers dari CrowdStrike beritahu WIRED, "the models don't all have equivalent guardrails and protections, even from one company". Attacker tukar-tukar model, selalunya versi lama, sebab kos dan untuk cari safeguard yang paling lemah.
- **Palsukan authorization.** Keempat-empat group yakinkan model yang aktiviti tu pentest yang sah dan dibenarkan. Satu cara yang banyak group guna: **letak fail dalam working directory agent yang kononnya sahkan task tu dah diluluskan**.
- **Patch agent tu sendiri.** Actor berbahasa Cina guna runtime patch tool, ClawGod, atas Claude Code untuk cuba buang `CYBER_RISK_INSTRUCTION` dari system prompt dia. Itu arahan yang hadkan Claude Code kepada security testing yang dibenarkan sahaja.
- **Skill rendah pun dah cukup.** Actor paling tak sofistikated, yang berbahasa Indonesia, guna 819 "skill" yang kebanyakannya dari GitHub awam, tanpa orchestration tambahan. Dia masih kena campur tangan sekali-sekala untuk tolak model melepasi guardrail, tapi tetap **berjaya compromise beberapa domain kerajaan Indonesia**, satu domain kerajaan negara lain, dan sasaran sektor swasta.

Guardrail memang perlahankan actor yang lemah tu, tapi tak berjaya halang dia. CrowdStrike menilai, dengan keyakinan sederhana, yang agentic AI "commoditizes baseline offensive cyber operations". Meyers juga sebut serangan ni tak guna exploit baru: ia sasarkan jurang security hygiene asas, "things that were preventable but weren't prevented."

## 2. Classifier per-request: betul untuk setiap request, salah tentang hasilnya

Pada 6 Oktober, Cyber Superintelligence Lab CrowdStrike publish penilaian ke atas apa yang mereka panggil content-safety classifier paling maju yang dah di-deploy secara awam. Ia model kedua yang saring setiap request sebelum frontier model jawab.

Dua angka utama nampak bercanggah, tapi dua-dua penting:

- Terhadap **lebih kurang 515 teknik bypass terus** (encoding, multi-turn escalation, many-shot, trik Unicode dan tokenizer, dan lain-lain), classifier tu bertahan: **kadar bypass terus 0%**.
- Tapi pipeline **decompose → benign reframe → recompose** berjaya hasilkan code ofensif yang berfungsi dalam **9 daripada 10** kategori selari MITRE ATT&CK. Setiap sub-request memang benign; model lokal tanpa classifier yang cantumkan semuanya. Salah satu cara: tukar soalan exploit jadi detection engineering ("write Sigma rules for CVE-X").

Kata CrowdStrike: "The classifier correctly evaluates every request it sees. There is no misclassification. The harm is emergent in the composition, and composition happens outside the classifier's observation boundary." Microsoft Research capai kesimpulan sama secara berasingan pada September melalui paper "Capability Laundering": filtering per-exchange memang tak mencukupi dari segi struktur.

Satu-satunya kategori yang bertahan ialah EDR evasion. Untuk yang tu, classifier block _konsep_ di sebaliknya walau apa pun perkataan yang diguna.

Penyelesaian yang dicadangkan bukan classifier yang lebih ketat. Ia **luaskan threat model dari request tunggal kepada urutan request, gabungan merentas model dan penggunaan merentas provider**. Maksudnya juga, terima hakikat yang satu provider tak boleh nampak attacker yang sebarkan query merentas banyak provider dan API key.

## 3. Guard model kecil fail open lebih teruk daripada accuracy dia tunjuk

Satu pattern agent-security yang popular letak "typed decision model" kecil di depan tool call: dia baca tindakan yang dicadangkan dan pilih _allow_ atau _block_ daripada option yang ditetapkan caller. Satu paper yang dipost di arXiv pada 8 Oktober (Azizi, Baghaei Potraghloo, Pedram, _One Word Opens the Gate_) uji tujuh model open-weight dalam peranan tu:

- Accuracy allow-atau-block antara **36% hingga 72%**, berbanding tahap rawak 50%.
- **Enam baris server log yang tak berkaitan** naikkan kadar fail-open satu gate dari **0% ke 63%**, pada policy yang dia sebenarnya boleh putuskan dengan betul.
- Tukar nama option yang membenarkan kepada nama yang mengelirukan, tanpa ubah definisi atau teks yang dinilai, naikkan kadar fail-open ke **93–100%** pada empat model.
- **Rule deterministik ke atas nilai bertaip capai 100%** pada keenam-enam policy.

Kesimpulan penulis patut kau salin masuk design doc: model ni "can reduce how many cases reach a reviewer, but on this evidence they should not be the component that decides."

## 4. Guardrail dah jadi access tier

Pada 6 Oktober, Anthropic besarkan **Cyber Verification Program** dia kepada tiga access tier. Model yang dibuka umum kekal dengan "conservative cyber safeguards that block most cyber work". Organisasi yang disahkan boleh mohon untuk kurangkan blocking:

- **Defense Access** untuk kerja SOC, incident response, reverse-engineering malware dan validasi vulnerability. Terbuka kepada security team syarikat dan kerajaan, operator infrastruktur kritikal "of any size", maintainer open-source dan researcher.
- **Red Team Access** tambah pentest yang dibenarkan. Block masa-nyata masih kekal untuk tindakan yang boleh bawa kemudaratan fizikal atau gangguan besar-besaran, contohnya deploy ransomware.

Ini model guardrail yang lain: **siapa kau, selepas disahkan, tentukan apa yang model sanggup buat untuk kau**. Gabung dengan seksyen 1, ia terangkan kenapa attacker palsukan authorization: bila guardrail tanya "ini dibenarkan ke?", kerja attacker jadi menghasilkan bukti palsu yang meyakinkan.

## 5. Governance: accord sukarela, dan desakan untuk koordinasi global

Pada 29 September, Presiden US Donald Trump dan ketua Anthropic, OpenAI, Google, Meta, xAI dan Nvidia tandatangan **Joint Commitment on Frontier Responsibilities** satu muka surat. Ia gariskan empat lapisan kawalan dan audit:

1. Internal control dan monitoring yang kukuh.
2. Team dalaman yang diberi kuasa untuk pastikan kawalan tu berfungsi dan isu dibaiki.
3. Auditor atau evaluator luar yang bebas.
4. Jawatankuasa lembaga pengarah yang bebas untuk awasi team dan auditor tu.

Ia **sukarela**. Seperti yang ditunjuk analisis Council on Foreign Relations, teksnya kata syarikat "should" laksanakan kawalan tu; perkataan "will" cuma muncul dalam janji untuk bermesyuarat secara berkala tentang standard. Accord tu tak nyatakan siapa evaluator luar tu. Al Jazeera laporkan yang seminggu sebelumnya, dua puluh negara dan Kesatuan Eropah dah gesa koordinasi global untuk pastikan AI kekal bawah kawalan manusia.

Lebih dekat dengan kita, pada 14 Oktober Anthropic tandatangan MOU dengan Kementerian Pembangunan Digital dan Penerangan Singapura, merangkumi AI safety, security, model evaluation, testing standard dan incident response. Ia sambungan kerja sebelum ni dengan IMDA dan AI Verify Foundation, termasuk projek red-teaming dalam **English, Mandarin, Melayu dan Tamil**. Red-teaming pelbagai bahasa ni penting: guardrail yang kebanyakannya ditala dalam English memang titik lemah yang diketahui untuk pengguna Bahasa Melayu.

## Apa maksudnya untuk team di Malaysia

Semua ni bukan alasan untuk buang guardrail. Ia alasan untuk **tak percaya guardrail sebagai boundary**:

- **Letak keputusan di luar model.** Kuatkuasakan apa yang agent boleh buat dengan policy deterministik ke atas field tool-call yang bertaip, contohnya host, path, verb dan jumlah yang dibenarkan. Guna guard berasaskan model untuk triage dan flag, bukan untuk luluskan.
- **Scope identiti agent macam non-human identity yang lain.** Credential least-privilege, token jangka pendek, identiti berasingan untuk setiap agent. Serangan di atas berjaya sebab jurang hygiene, bukan zero-day.
- **Anggap semua dalam context agent sebagai input tak dipercayai**, termasuk fail dalam working directory dan baris log. Dua-dua digunakan dalam serangan dan kajian di atas untuk terbalikkan keputusan.
- **Monitor session, bukan sekadar mesej.** Kaitkan tool call dan request merentasi keseluruhan task. Satu urutan boleh berbahaya walaupun tiada satu mesej pun yang berbahaya.
- **Uji guardrail dalam Bahasa Melayu dan teks bercampur bahasa**, bukan English sahaja, sebelum kau bergantung padanya untuk pengguna Malaysia.
- **Kalau kau buat kerja defensive security dengan frontier model**, tengok program verifikasi vendor daripada bergaduh dengan blanket block, dan jangkakan attacker akan tiru isyarat authorization yang sama.

## Kesimpulan

Bukti Oktober 2026 selari: guardrail kurangkan penyalahgunaan, tapi attacker pusing keliling dengan tukar model, palsukan authorization, pecahkan task dan racun input guard. Respons industri ialah pindahkan guardrail ke luar, ke identiti, access tier, audit dan policy peringkat sistem. Build dengan cara yang sama.

Sumber:

- [CrowdStrike Uncovers New Agentic AI Campaigns](https://www.crowdstrike.com/en-us/blog/crowdstrike-uncovers-new-agentic-ai-campaigns/) — CrowdStrike, 21 Okt 2026
- [AI Guardrails Aren't Stopping Criminal Hackers](https://www.wired.com/story/ai-guardrails-arent-stopping-criminal-hackers/) — WIRED, 21 Okt 2026
- [Request, Aggregate, Bypass: How Attackers Can Evade LLM Safety Classifiers](https://www.crowdstrike.com/en-us/blog/how-attackers-can-bypass-llm-safety-classifiers/) — CrowdStrike, 6 Okt 2026
- [One Word Opens the Gate: The Option-Channel Attack on Typed Decision Models as Agent Guardrails](https://arxiv.org/abs/2610.12292) — arXiv, 8 Okt 2026
- [Expanding the Cyber Verification Program](https://www.anthropic.com/news/cyber-verification-program) — Anthropic, 6 Okt 2026
- [Trump, tech bosses sign voluntary pact pledging 'robust' AI safeguards](https://www.aljazeera.com/news/2026/9/29/trump-top-tech-firms-sign-accord-to-self-police-ai-development) — Al Jazeera, 29 Sep 2026
- [Trump's AI Safety Pact Is Toothless. But There Is a Path Forward.](https://www.cfr.org/articles/trumps-ai-safety-pact-is-toothless-but-there-is-a-path-forward) — Council on Foreign Relations, 1 Okt 2026
- [Anthropic opens Singapore office and signs MOU with the Government of Singapore](https://www.anthropic.com/news/singapore-office-opening) — Anthropic, 14 Okt 2026
