---
title: 'Top Threats CSA 2026: Identiti Menewaskan Infrastruktur, AI Muncul Dua Kali'
description: 'Cloud Security Alliance letak IAM yang lemah — didorong oleh pertumbuhan identiti bukan manusia — sebagai ancaman #1 cloud untuk 2026, dengan dua ancaman berkaitan AI muncul buat kali pertama. Apa maksudnya untuk pasukan cloud.'
pubDate: 2026-08-27
tags:
  - iam
  - cloud
  - security
  - ai
  - malaysia
categories: ['Ground Truth']
translationKey: 'gt-06-csa-top-threats-2026'
toc: true
postType: essay
draft: true
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: 'Ground truth essay — CSA 2026 Top Threats: identity and AI'
---

## Ranking Baru Terbalik

Setiap tahun, Cloud Security Alliance (CSA) survey Top Threats Working Group mereka dan beberapa ratus practitioner cloud security industri, lepas tu rank apa yang betul-betul risau orang cloud security — bukan apa yang vendor nak jual. **Top Threats to Cloud Computing Survey Report 2026**, yang keluar 13 Ogos 2026, baru je susun semula list tu dengan cara yang patut kita stop dan fikir sekejap.

**Inadequate Identity and Access Management (IAM) sekarang #1.** Pada 2024, dia #2. Ancaman yang pegang #1 pada 2024 — Misconfiguration and Inadequate Change Control — jatuh ke #5. Dan buat kali pertama, dua ancaman berkaitan AI masuk dalam list tu sekali.

Ini bukan sekadar susun semula 10 benda yang serupa. Ini CSA cakap secara terus: _benda yang paling boleh sakiti kau pada 2026 bukan S3 bucket yang misconfigured. Tapi siapa — atau apa — yang dibenarkan log in._

## Kenapa Identiti Menang

CSA sendiri cakap terus: "Pertumbuhan pesat non-human identities, interaksi machine-to-machine, dan autonomous decision-making sekarang dah lebihi apa yang proses management dan oversight tradisional direka untuk handle."

Baca balik tanpa bahasa formal tu: **kebanyakan program IAM dibina untuk manage manusia dengan password, dan sekarang kebanyakan identiti dalam persekitaran cloud bukan manusia.** Service accounts, credential CI/CD pipeline, API keys, workload identities, dan — semakin banyak — AI agent yang bertindak sendiri mengikut schedule atau respons kepada event. Semua ni tak pernah rehat makan tengahari, tak pernah rasa syak bila nampak login prompt yang pelik, dan kebanyakannya di-provision sekali je lepas tu tak pernah disemak balik.

Ini bukan hipotesis. Ini root cause yang sama di belakang serangan identity-first yang kita pernah bahas di sini — [Snowflake, MGM, dan Scattered Spider](/posts/gt-01-identity-perimeter/) tak perlukan exploit. Mereka perlukan satu credential yang sah. Data CSA 2026 kata industri sekarang setuju itulah exposure paling besar, bukan kes terpencil.

## AI Masuk List — Dua Kali

Dua entry baru muncul dalam ranking 2026, kedua-duanya berkaitan AI, kedua-duanya baru:

- **AI-Enhanced Attacks (#2)** — AI digunakan untuk improve atau automate serangan itu sendiri: reconnaissance lebih cepat, phishing yang lebih convincing, malware yang adaptive.
- **AI System Compromise (#6)** — sistem AI dilayan sebagai asset yang boleh kena compromise, manipulate, atau abuse — contohnya training data yang di-poison, prompt injection kat agentic pipeline, atau inference endpoint yang kena hijack.

Vic Hargrave, co-chair CSA Top Threats Working Group, cakap terus: "AI is not an emerging cloud security concern. It is already changing both how attacks are carried out and what organizations have to protect." Dua ancaman dalam list 11 item memang nampak kecil, tapi ini kali pertama AI muncul dalam survey ni — dan dia masuk dengan power, terus dapat kedudukan #2.

## Apa yang Betul-Betul Jatuh — dan Apa yang Dibuang Terus

Kena teliti sikit sini sebab dua benda berbeza berlaku kat concern "infrastruktur tradisional", dan senang untuk campur adukkan:

1. **Misconfiguration and Inadequate Change Control** — ancaman #1 pada 2024 — tak hilang. Dia jatuh ke **#5**. Masih concern yang real dan berranking, cuma bukan #1 lagi.
2. Satu kategori berasingan yang cover **risiko cloud infrastructure dan cloud service provider**, yang wujud dalam list 2024, score rendah sangat pada 2026 sampai CSA **buang terus dari list**.

Mekanisme berbeza, tapi arah yang sama: fokus industri berpindah dari "adakah platform tu sendiri berisiko" kepada "siapa ada access kat dia, dan adakah access tu dipantau."

## Full List 2026

| #   | Ancaman                                        |
| --- | ---------------------------------------------- |
| 1   | Inadequate Identity and Access Management      |
| 2   | AI-Enhanced Attacks                            |
| 3   | Insecure Third-Party Resources                 |
| 4   | Insecure Interfaces and APIs                   |
| 5   | Misconfiguration and Inadequate Change Control |
| 6   | AI System Compromise                           |
| 7   | Advanced Persistent Threats                    |
| 8   | Lacking Cloud Security Strategy and Governance |
| 9   | Insecure Software Development                  |
| 10  | Accidental Cloud Data Disclosure               |
| 11  | System Vulnerabilities                         |

Methodology di belakang list ni: proses dua peringkat — mula dengan survey in-person Top Threats Working Group, lepas tu poll 500+ practitioner industri yang rate 23 candidate issue atas skala 10-mata. Ini survey persepsi practitioner, bukan dataset kekerapan breach — penting untuk ingat bila baca ranking ni sebagai "apa yang paling bahaya" berbanding "apa yang paling top-of-mind."

## Apa Maksudnya Kalau Kau Bina Cloud di Malaysia

Laporan CSA tak sebut Malaysia secara khusus — bahagian ni analisis saya, bukan apa yang laporan tu cakap. Tapi tekanan yang sama terpakai terus di sini: estet cloud Malaysia (bank dan GLIC bawah ekspektasi RMiT Bank Negara, dan push cloud-first kerajaan yang lebih luas) sedang kumpul non-human identity — service account CI/CD, integrasi API, dan sekarang AI agent — lebih cepat daripada kebanyakan pasukan audit mereka.

Dua benda konkrit yang patut buat sebelum ini jadi insiden bukan sekadar ranking survey:

- **Inventori non-human identity macam kau inventori human account.** Service account dan API key yang di-provision sekali, dibagi scope luas "untuk selamat," lepas tu tak pernah rotate — itulah exactly gap yang CSA describe.
- **Letak AI agent dan pipeline dalam model IAM dan logging yang sedia ada — jangan layan dia sebagai kes istimewa.** Kalau AI agent boleh call API atau trigger deploy, dia perlukan least-privilege dan audit trail yang sama macam human dengan permission yang sama.

## Bottom Line

Headline dia bukan "AI menakutkan" atau "identiti susah" — dua-dua tu memang dah betul sebelum ni. Headline sebenar: survey practitioner CSA sendiri sekarang rank identiti, khususnya non-human identity, atas isu infrastruktur dan konfigurasi yang dominate perbualan selama bertahun-tahun. Kalau roadmap cloud security 2026 kau masih lead dengan misconfiguration scanning dan tak ada line item untuk machine identity lifecycle management, laporan ni sebab yang bagus untuk susun semula.

Sumber:

- [AI Emerges as an Attack Enabler and Target in Cloud Security Alliance's 2026 Top Threats Report](https://cloudsecurityalliance.org/articles/ai-emerges-as-an-attack-enabler-and-target-in-csa-2026-top-threats-report) — Cloud Security Alliance
- [Top Threats to Cloud Computing Survey Report 2026](https://cloudsecurityalliance.org/artifacts/top-threats-to-cloud-computing-2026) — Cloud Security Alliance
- [Top Threats to Cloud Computing 2024](https://cloudsecurityalliance.org/artifacts/top-threats-to-cloud-computing-2024) — Cloud Security Alliance (perbandingan baseline)
- [Identity, AI Lead CSA's 2026 Cloud Threat List](https://virtualizationreview.com/articles/2026/08/24/identity-ai-lead-csas-2026-cloud-threat-list.aspx) — Virtualization Review
