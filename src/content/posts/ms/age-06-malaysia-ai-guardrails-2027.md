---
title: 'AI guardrail di Malaysia: undang-undang tiba 2027 — apa engineer patut sedia sekarang'
description: 'Draf Rang Undang-Undang Tadbir Urus AI dah siap, MY-AISafe dah wujud, dan deepfake jadi lawan harian. Apa yang diketahui, dan apa nak build sekarang.'
pubDate: 2026-10-26
tags:
  - ai
  - security
  - guardrail
  - malaysia
categories: ['AI Guardrail Engineering']
postType: field-note
toc: true
translationKey: 'age-06-malaysia-ai-guardrails-2027'
draft: true
---

> Nota lapangan tentang cara Malaysia mendekati AI guardrail: undang-undang yang akan datang, institusi baru, di mana kemudaratan sebenar muncul, dan apa yang team engineering boleh sediakan sebelum peraturan dimuktamadkan.

## Versi pendek

Di Malaysia, "AI guardrail" sekarang bermaksud **undang-undang, institusi dan kemudaratan awam**, bukan filter prompt injection:

1. **Rang Undang-Undang Tadbir Urus AI (AI Governance Bill) dah didraf** dan kini dijangka dibentang di Dewan Rakyat **awal 2027**. Ia berasaskan risiko, ikut berapa besar kemudaratan yang sesuatu sistem boleh bawa.
2. **Institusi baru dah wujud untuk kuatkuasakannya:** AI Malaysia Berhad, dan **Institut Keselamatan AI Malaysia (MY-AISafe)** yang uruskan safety benchmark, penilaian risiko dan pelaporan insiden.
3. **Keselamatan kanak-kanak dan pendedahan AI** dah masuk skop: safety-by-design untuk chatbot kanak-kanak, dan notis "ini ialah AI" secara berperingkat untuk aplikasi berisiko tinggi.
4. **Deepfake dan scam jadi lawan harian:** 713 deepfake politik diturunkan sejak 2025, dan Bank Negara berulang kali beri amaran tentang deepfake gabenornya.
5. **Bank diingatkan yang manusia kekal bertanggungjawab** atas keputusan AI.

Teks rang undang-undang tu belum diumumkan, jadi butirannya boleh berubah. Tapi hala tujunya dah cukup jelas untuk mula build.

## 1. Rang Undang-Undang Tadbir Urus AI: dah didraf, berasaskan risiko, awal 2027

Pada 10 September, Menteri Digital Gobind Singh Deo kata draf **AI Governance Bill** dah siap dan akan dibawa ke Kabinet, dan kerajaan sedang "setting up the structure needed to enforce the proposed law". Rangka kerja yang lebih luas juga termasuk standard teknikal dan peraturan, dengan AI Malaysia dan sebuah pusat standard baru bekerjasama dengan badan seperti SIRIM.

Pada 5 Oktober, dia beritahu Dewan Rakyat yang rang undang-undang tu akan dibentang **awal tahun depan**, bukan tahun ni, dan terangkan bentuknya:

- **Berasaskan risiko ikut potensi kemudaratan.** Tahap kawalan dan obligasi dinilai berdasarkan potensi kemudaratan sistem AI itu sendiri, bukan sekadar klasifikasi risiko ikut industri.
- **Satu rangka kerja merentas sektor**, yang melengkapkan undang-undang sektoral sedia ada.
- **Meliputi keselamatan, hak asasi manusia dan kebajikan individu.**

Ayat yang paling berkait dengan guardrail engineering: untuk sistem AI yang makin berkuasa, autonomi, dan berpotensi beri kesan besar kepada manusia atau sistem kritikal, "safety controls, testing, monitoring, human oversight, and response mechanisms must be strengthened before their use is expanded."

## 2. Institusi: AI Malaysia dan MY-AISafe

Pada Julai, kerajaan lancarkan **AI Malaysia Berhad**, sebuah perbadanan tetap bawah Kementerian Digital yang ambil alih tugas Pejabat AI Nasional (NAIO, ditubuhkan Disember 2024), bersama **Pelan Tindakan AI Nasional 2026–2030**. Pelan tu ada 28 inisiatif nasional merentasi lima tonggak, salah satunya "increasing digital trust".

Pelancaran yang sama perkenalkan **Institut Keselamatan AI Malaysia (MY-AISafe)**. Menurut menteri, ia "specifically responsible for overseeing the governance aspects of AI, which include safety benchmarks, risk assessments, and incident reporting for necessary corrective actions."

Selepas mesyuarat lembaga pengarah pertama AI Malaysia pada September, pengerusinya Aireen Omar kata rang undang-undang dan institut keselamatan tu jadi keutamaan, dan tadbir urus patut memudahkan inovasi, bukan jadi penghalang. AI Malaysia juga teruskan instrumen sukarela NAIO yang sedia ada: **Kod Etika AI**, **Boardroom Primer on AI Governance**, **AI Impact Assessment for the Public Sector** dan **AI Dataset Readiness Guide**.

Undang-undang sedia ada pun dah terpakai di sekeliling AI: **Akta Keselamatan Siber 2024**, dikuatkuasakan NACSA, dan **Akta Perlindungan Data Peribadi 2010** untuk penyalahgunaan data peribadi.

## 3. Kanak-kanak dan pendedahan AI dah masuk perbincangan

Dalam jawapan bertulis Parlimen pada 6 Oktober, menteri kata rang undang-undang tu akan wajibkan developer aplikasi atau chatbot **yang ditujukan kepada kanak-kanak** untuk bina **safety-by-design**, termasuk penilaian impak risiko secara berkala dan filtering kandungan berbahaya untuk elak manipulasi psikologi kanak-kanak.

Untuk **bot disclosure**, iaitu beritahu pengguna yang mereka sedang bercakap dengan AI dan bukan manusia, pendekatannya bersasar, bukan menyeluruh. Ia akan dilaksanakan berperingkat ikut tahap risiko dan sektor, dan penyedia AI akhirnya perlu paparkan notis yang jelas, terutamanya untuk aplikasi **berisiko tinggi**. Akta Keselamatan Dalam Talian dan Garis Panduan Nasional Tadbir Urus dan Etika AI menyokong pendekatan ni.

## 4. Di mana kemudaratan sebenar muncul: deepfake dan scam

Kerja AI safety yang paling nampak di Malaysia hari ni ialah membersihkan kesan penyalahgunaan:

- **713 deepfake pemimpin politik** dibuang oleh platform antara 1 Januari 2025 dan 15 September 2026 selepas permintaan takedown MCMC, menurut Menteri Komunikasi Fahmi Fadzil.
- **Bank Negara Malaysia** sekali lagi beri amaran pada 14 Oktober tentang scammer yang menyamar sebagai gabenor dan pegawai kanannya, dan dah sediakan portal dengan contoh kandungan deepfake yang melibatkan BNM.

## 5. Kewangan: manusia kekal bertanggungjawab

Pada Julai, Gabenor BNM Abdul Rasheed Ghaffour kata lebih **70% penyedia perkhidmatan kewangan Malaysia** dah laksanakan sekurang-kurangnya satu aplikasi AI. Mesejnya: AI ialah isu tadbir urus. Institusi mesti boleh terangkan hasil dan cabar keputusan, lembaga pengarah patut pegang risiko AI, dan tanggungjawab "cannot be delegated to an algorithm".

## Jurangnya: hampir tiada perbincangan tentang guardrail teknikal

Apa yang aku tak jumpa dalam liputan Malaysia terkini ialah lapisan engineering: prompt injection, permission agent, policy untuk tool call, atau sejauh mana guardrail bertahan dalam **Bahasa Melayu dan teks bercampur bahasa**.

Jurang ni penting. Guardrail yang kebanyakannya ditala dalam English memang titik lemah yang diketahui untuk pengguna Melayu. Singapura dah buat red-teaming dalam English, Mandarin, Melayu dan Tamil bersama IMDA dan AI Verify Foundation, dan pada 14 Oktober tandatangan MOU dengan Anthropic yang merangkumi model evaluation dan incident response. Benchmark MY-AISafe ialah tempat yang sesuai untuk Malaysia cover benda ni; sebelum tu, team kena uji sendiri.

## Apa nak sedia sekarang

Semua ni belum jadi undang-undang muktamad, tapi setiap perkara di bawah berpadanan dengan sesuatu yang menteri atau regulator dah sebut:

- **Simpan inventori dan penilaian risiko untuk setiap sistem AI.** Obligasi akan ikut potensi kemudaratan, jadi tahu sistem mana yang boleh mudaratkan manusia atau sistem kritikal. AI Impact Assessment sektor awam ialah templat permulaan yang baik.
- **Uji sebelum kau luaskan penggunaan.** Simpan suite evaluation dan red-team untuk setiap sistem, termasuk **prompt Bahasa Melayu dan bercampur bahasa**, dan jalankan semula setiap kali model atau prompt berubah.
- **Log dan monitor apa yang AI buat**, terutamanya tool call agent, supaya kau boleh siasat dan lapor. Tulis runbook insiden AI sekarang; pelaporan insiden memang fungsi rasmi MY-AISafe.
- **Letak manusia dalam loop untuk tindakan berimpak tinggi**, dan pastikan ada orang yang boleh terangkan dan override sesuatu hasil. Ini memang dah jangkaan BNM untuk sektor kewangan.
- **Jadikan pendedahan "ini AI" sebagai feature flag**, supaya kau boleh hidupkan ikut produk dan tahap risiko bila peraturan tiba.
- **Kalau budak bawah umur mungkin guna produk kau**, reka untuk itu dari sekarang: filtering kandungan berbahaya, default yang sesuai umur dan semakan risiko berkala.
- **Kalau jenama atau eksekutif kau boleh disamar**, monitor deepfake dan terbitkan satu saluran pengesahan rasmi, macam yang BNM buat.

## Kesimpulan

Malaysia sedang bina AI guardrail dari atas ke bawah: undang-undang berasaskan risiko awal 2027, institut keselamatan dengan benchmark dan pelaporan insiden, dan penguatkuasaan aktif terhadap deepfake. Bahagian engineering, iaitu prestasi guardrail dalam Bahasa Melayu dan dalam AI agent, ialah bahagian yang belum ada siapa bincang. Team yang bina penilaian risiko, testing, logging, human oversight dan disclosure dari sekarang akan bersedia bila rang undang-undang tu tiba.

Sumber:

- [Digital minister says Malaysia's draft AI Governance Bill complete, hopes to table it by Q1 2027](https://www.malaymail.com/news/malaysia/2026/09/10/digital-minister-says-malaysias-draft-ai-governance-bill-complete-hopes-to-table-it-by-q1-2027/234656) — Malay Mail, 10 Sep 2026
- [AI Governance Bill covering safety, human rights to be tabled in Dewan Rakyat early 2027](https://dayakdaily.com/ai-governance-bill-covering-safety-human-rights-to-be-tabled-in-dewan-rakyat-early-2027/) — DayakDaily (Bernama), 5 Okt 2026
- [Malaysia sets up permanent corporation and safety institute to steer national AI agenda](https://govinsider.asia/intl-en/article/malaysia-sets-up-permanent-corporation-and-safety-institute-to-steer-national-ai-agenda) — GovInsider, 29 Jul 2026
- [AI Malaysia To Prioritise Governance Bill, Safety Institute](https://www.bernama.com/en/news.php?id=2606395) — Bernama, 12 Sep 2026
- [Govt says AI chatbots aimed at children will have safety built in](https://www.freemalaysiatoday.com/category/nation/2026/10/06/govt-says-ai-chatbots-aimed-at-children-will-have-safety-built-in) — Free Malaysia Today, 6 Okt 2026
- [713 deepfakes of political leaders taken down since 2025](https://www.freemalaysiatoday.com/category/nation/2026/10/07/713-deepfakes-of-political-leaders-taken-down-since-2025) — Free Malaysia Today, 7 Okt 2026
- [Bank Negara warns of scammers impersonating governor, top officials](https://www.freemalaysiatoday.com/category/nation/2026/10/14/bank-negara-warns-of-scammers-impersonating-governor-top-officials) — Free Malaysia Today, 14 Okt 2026
- [BNM Governor Says Banks Must Keep Humans Accountable for AI Decisions](https://fintechnews.my/59532/ai/bnm-ai-banks/) — Fintech News Malaysia, 9 Jul 2026
- [Malaysia plans to tighten regulation of AI tech](https://www.straitstimes.com/asia/se-asia/malaysia-plans-to-tighten-regulation-of-ai-tech) — The Straits Times, 30 Sep 2026
- [Anthropic opens Singapore office and signs MOU with the Government of Singapore](https://www.anthropic.com/news/singapore-office-opening) — Anthropic, 14 Okt 2026
