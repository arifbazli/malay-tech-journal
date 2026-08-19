---
title: 'Identiti Adalah Perimeter Baru — Pelajaran dari Snowflake, MGM dan Scattered Spider'
description: 'Pada 2024, UNC5537 curi data 165 syarikat Snowflake tanpa exploit sebiji pun. Pada 2023, Scattered Spider letak MGM lumpuh dalam 10 minit telefon. Ini bukan serangan teknikal biasa — ini adalah era baru di mana identiti adalah satu-satunya perimeter yang tinggal.'
pubDate: 2026-07-10
tags:
  - cloud
  - security
  - iam
categories: ['Ground Truth']
translationKey: gt-01-identity-perimeter
toc: true
postType: essay
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: 'Ground truth essay — identity is the new perimeter'
---

## Pendahuluan: Bila Firewall Tidak Lagi Relevan

Ada satu soalan yang saya selalu tanya bila onboarding engineer baru ke projek cloud security:

> "Kalau penyerang dah ada username dan password yang sah, apa yang kita ada untuk hentikan dia?"

Jawapan yang biasa: _"Kita ada MFA."_

Dan saya kata: _"Apa jenis MFA? TOTP? SMS? Hardware key? Boleh bypass tak? Ada session hijacking tak? Credential yang kena steal tu — dari laptop pekerja, dari CI/CD pipeline, atau dari third-party contractor yang guna laptop kerja untuk stream Netflix?"_

Biasanya senyap.

Ini adalah realiti cloud security pada 2024-2026: **penyerang dah berhenti nak hack sistem. Mereka log in.**

---

## Kes Snowflake 2024: Serangan Terbesar yang Bukan Exploit

Antara April dan Julai 2024, kumpulan ancaman yang Mandiant rekod sebagai **UNC5537** menjalankan operasi exfiltration data terbesar dalam sejarah cloud. Mangsa: pelanggan Snowflake — platform data warehouse yang digunakan oleh lebih 9,000 syarikat global.

Skala: **165 organisasi** terkena. AT&T, Ticketmaster, Santander Bank, LendingTree — semua dalam satu kempen yang sama.

Yang paling penting untuk faham: **Snowflake sendiri tidak kena hack**. Tiada CVE. Tiada zero-day. Tiada vulnerability dalam Snowflake platform.

Yang berlaku adalah ini:

1. Infostealer malware (Vidar, Raccoon, Redline, Lumma) dah jangkiti berjuta-juta laptop selama bertahun-tahun — termasuk laptop kontraktor, developer, dan pekerja remote
2. Malware ini steal credentials yang disimpan dalam browser dan applications
3. Credentials dijual dalam dark web markets
4. UNC5537 beli atau aggregate credentials ini dan log in ke Snowflake accounts pelanggan
5. Snowflake accounts yang diserang **tidak ada MFA enabled** dan **tidak ada network policy yang restrict akses**
6. Data diexfil, pelanggan diblackmail

Push Security, yang menganalisis kempen ini secara mendalam, describe ia sebagai **"watershed moment"** — bukti konkrit bahawa kita telah masuk era di mana identiti adalah sasaran utama.

### Kenapa Ini Penting untuk Engineer Malaysia

Kalau syarikat kau guna Snowflake, atau mana-mana SaaS platform lain, soalan yang kau perlu jawab sekarang:

- Berapa banyak accounts yang ada akses ke production data yang **tidak ada MFA**?
- Berapa banyak kontraktor atau vendor third-party yang ada akses ke systems kau?
- Credentials dalam CI/CD pipelines kau — disimpan macam mana? Siapa boleh access secrets tu?
- Ada kau monitor impossible travel? Login dari geo location yang pelik?

Ini bukan soalan compliance. Ini soalan survival.

---

## Kes MGM 2023: 10 Minit Telefon, 10 Hari Krisis

September 2023. Scattered Spider (juga dikenali sebagai UNC3944) telefon MGM Resorts IT helpdesk.

Dalam **10 minit**, mereka berjaya social engineer akses kepada Okta identity platform MGM. Dari situ, mereka lateral move ke seluruh MGM infrastructure — hotel systems, slot machines, room keys, reservations.

**Kesan:** 10 hari outage. Anggaran kerugian: lebih **$100 juta**. MGM terpaksa disclosed dalam SEC filing.

Cara serangan yang Scattered Spider guna bukan teknikal sophistication — ia adalah **vishing** (voice phishing) yang dibantu oleh:

- LinkedIn data untuk tahu nama IT staff dan struktur org
- Caller ID spoofing
- Script social engineering yang convince helpdesk untuk reset MFA

Yang paling shocking: Scattered Spider bukan nation-state APT. Mereka adalah **kumpulan hacker berumur 17-22 tahun**, kebanyakannya dari US dan UK, yang berkomunikasi di Telegram dan Discord.

Pada 2025, kumpulan yang sama bertukar nama kepada "Scattered Lapsus$ Hunters" dan menyerang Marks & Spencer, Co-op UK, Jaguar Land Rover, dan ratusan pelanggan Salesforce.

### Pelajaran untuk Cloud Security Engineer

**Helpdesk adalah attack surface.** Identity reset flows adalah attack surface. Setiap proses yang boleh "unblock" seseorang dari authentication adalah attack surface.

Pertanyaan untuk semak sekarang:

- Proses reset MFA dalam org kau — apa verification yang diperlukan?
- Staff helpdesk kau — berapa dalam training mereka tentang vishing?
- Okta, Azure AD, atau whatever IdP yang kau guna — ada anomaly detection untuk admin actions?

---

## Identity-First Security: Bukan Buzzword, Ini Matematik

Kenapa penyerang focus pada identity? Kerana **risk/reward calculation** dah berubah.

| Attack Vector            | Effort           | Detection Risk | Payoff                  |
| ------------------------ | ---------------- | -------------- | ----------------------- |
| Exploit zero-day         | Sangat tinggi    | Tinggi         | Tinggi tapi susah dapat |
| Phish credentials        | Rendah           | Rendah         | Tinggi, scalable        |
| Buy stolen creds         | Sangat rendah    | Sangat rendah  | Tinggi, immediate       |
| Social engineer helpdesk | Rendah-sederhana | Rendah         | Akses penuh             |

Dari perspektif penyerang, kenapa nak habiskan masa bulan-bulan reverse engineering vulnerability bila boleh beli credentials untuk $50 di dark web dan log in macam pekerja sah?

CSA Top Threats to Cloud Computing 2025 mengkategorikan ini sebagai **"Inadequate Identity, Credential, Access, and Key Management"** — nombor satu dalam senarai mereka selama tahun berturut-turut.

---

## Apa yang Berubah dalam Defense

Industri perlahan-lahan bergerak dari model **"trust but verify"** kepada **"never trust, always verify"** — Zero Trust Architecture.

Tapi Zero Trust bukan produk. Ia adalah posture. Dan posture memerlukan:

**1. MFA yang betul-betul kuat**

- Hardware keys (FIDO2/WebAuthn) untuk privileged accounts
- TOTP sebagai minimum, bukan SMS (SIM swapping adalah real threat)
- Phishing-resistant MFA — passkeys, Yubikey

**2. Least-privilege yang serius dijalankan**

- Review IAM policies setiap quarter, bukan setahun sekali
- Just-in-time access untuk privileged operations
- Tidak ada standing admin access untuk human users

**3. Session monitoring dan anomaly detection**

- Impossible travel detection
- New device alerts
- Unusual data access patterns

**4. Third-party dan contractor hygiene**

- Vendor access reviews setiap 90 hari
- Separate identity domains untuk contractors
- No shared credentials antara contractors

**5. Helpdesk hardening**

- Multi-step identity verification sebelum credential reset
- Training spesifik tentang social engineering
- Approval workflow untuk high-risk identity operations

---

## Konteks Malaysia: Apa yang Relevan Untuk Kita

BNM RMiT yang disemak semula pada November 2025 memberi tekanan khusus kepada **identity dan access management** untuk institusi kewangan Malaysia. Keperluan "S" (Standard) — yang ada kuasa undang-undang — termasuk:

- Strong authentication untuk sistem kritikal
- Privileged access management yang documented
- Monitoring untuk akses anomalous

Ini bukan compliance checkbox. Ini adalah minimum viable baseline.

Untuk syarikat bukan-BFSI, soalan yang sama masih relevan. Cloud adoption di Malaysia terus pesat — tapi kematangan security tidak ikut kadar yang sama.

---

## Kesimpulan

Snowflake tidak kena hack. MGM tidak kena hack melalui exploit teknikal. Kedua-dua mereka diserang melalui **identiti** — credentials yang dicuri, helpdesk yang diperdaya, MFA yang tidak dikuatkuasakan.

Kalau masih ada production systems yang bergantung kepada username + password sahaja, tanpa MFA, tanpa anomaly detection, tanpa third-party access review — itu bukan security posture. Itu harapan.

Dan dalam era ini, harapan bukan strategi.

---

_Sumber: Mandiant UNC5537 analysis, Push Security Snowflake retrospective 2025, CSA Top Threats to Cloud Computing 2025, MGM SEC 10-Q filings._
