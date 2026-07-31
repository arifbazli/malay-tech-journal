---
title: "Dunia Sedang Menulis Undang-Undang AI — Apa yang Engineer Sebenarnya Perlu Tahu"
description: "EU AI Act mula dikuatkuasakan Feb 2025. Malaysia sedang muktamadkan AI Governance Bill. ASEAN ada framework sendiri. Regulasi sedang membentuk cara kita bina AI — sama ada kita perasan atau tidak. Panduan untuk engineer."
pubDate: 2026-07-12
tags:
  - ai
  - security
  - cloud
  - malaysia
categories: ['Ground Truth']
translationKey: gt-03-ai-regulation
toc: true
postType: essay
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: "Ground truth essay — AI regulation 2026"

---

## Kenapa Engineer Perlu Ambil Berat Tentang Regulasi

Regulasi bukan domain lawyer sahaja. Bila undang-undang AI masuk production environment, ia jadi requirement teknikal yang kena engineer implement.

EU AI Act bukan hanya dokumen polisi. Ia ada technical annexe yang specify logging requirements, explainability standards, data governance controls, dan human oversight mechanisms. Engineer yang tidak baca ini akan bina sistem yang perlu di-rebuild.

Essay ini adalah panduan praktikal: apa yang sedang berlaku di EU, Malaysia, dan ASEAN — dan apa yang bermakna bagi engineer yang bina AI systems hari ini.

---

## EU AI Act — Framework Yang Ubah Segalanya

### Timeline dan Status

- **Ditandatangani:** 13 Jun 2023 (European Parliament)
- **Mula berkuatkuasa:** 1 Ogos 2024
- **Prohibited AI provisions:** 2 Februari 2025 ✓ **(sudah aktif)**
- **High-risk AI obligations:** 2 Ogos 2026
- **GPAI (General Purpose AI) rules:** 2 Ogos 2025

Ini bukan "future legislation." Sebahagian darinya **sudah dikuatkuasakan sekarang.**

### Risk-Based Framework

EU AI Act kategorikan AI systems kepada 4 tahap:

**Unacceptable Risk (Diharamkan):**
- Social scoring oleh kerajaan
- Real-time biometric surveillance di ruang awam (dengan pengecualian terhad)
- Subliminal manipulation
- Exploitation of vulnerabilities (kanak-kanak, orang tua)

**High Risk:**
- Critical infrastructure (tenaga, air, pengangkutan)
- Educational assessment
- Employment screening
- Essential private and public services
- Law enforcement
- Migration and border control
- Administration of justice

**Limited Risk:**
- Chatbots (kena disclosure bahawa ia AI)
- Deepfakes (kena label)

**Minimal Risk:**
- Spam filters, recommendation engines, dll

### Technical Requirements untuk High-Risk AI

Ini yang engineer perlu implement:

```
1. Risk Management System
   - Kena ada documented risk assessment
   - Iterative — bukan sekali sahaja
   - Cover foreseeable misuse, not just intended use

2. Data and Data Governance
   - Training data kena relevant, representative
   - Kena document data provenance
   - Bias detection dan mitigation

3. Technical Documentation
   - Sebelum market placement
   - Kena update bila ada changes
   - Accessible untuk market surveillance authorities

4. Record-Keeping (Logging)
   - Automatic logging untuk high-risk AI
   - Tamper-evident logs
   - Retention period minimum sesuai dengan lifecycle

5. Transparency
   - Users kena tahu mereka interacting dengan AI
   - Untuk high-risk: capabilities dan limitations kena disclosed

6. Human Oversight
   - Technical measures untuk enable human monitoring
   - Ability to interrupt, stop, override

7. Accuracy, Robustness, Cybersecurity
   - Consistent performance metrics
   - Resilience terhadap adversarial inputs
   - Cybersecurity measures
```

### GPAI (General Purpose AI) — Yang Paling Relevan untuk LLM Teams

Model macam GPT-4, Claude, Gemini masuk kategori GPAI. Requirements:

- Technical documentation yang comprehen­sive
- Copyright compliance untuk training data
- Publish summary of training data content

Untuk **GPAI dengan systemic risk** (model yang sangat powerful — estimated FLOPs > 10^25):
- Adversarial testing (red-teaming)
- Incident reporting kepada European AI Office
- Cybersecurity measures
- Energy efficiency reporting

---

## Malaysia AI Governance — Status 2026

### AI Governance Framework (2024)

Malaysia publish **Artificial Intelligence Governance Framework (AIGF)** melalui MDEC pada 2024. Ini adalah voluntary framework, bukan legislation, dengan prinsip utama:

1. **Human-Centred** — AI untuk manfaat rakyat
2. **Fairness** — tiada discrimination
3. **Accountability** — clear responsibility chain
4. **Transparency** — explainable decisions
5. **Safety and Security** — robust systems
6. **Privacy** — data protection compliance

Voluntary bermakna tiada legal penalty untuk tidak comply — buat masa ini.

### AI Governance Bill — Yang Sedang Difinalisasi

NACSA (National Cyber Security Agency) dan MDEC sedang kerjasama untuk finalisasi **AI Governance Bill** yang akan beri legal teeth kepada AIGF.

Key elements yang dijangka (berdasarkan public consultation documents):

- **Mandatory registration** untuk high-risk AI applications
- **AI impact assessment** sebelum deployment
- **Incident reporting** kepada NACSA untuk AI security breaches
- **Penalties** untuk non-compliance — potentially aligned dengan PDPA enforcement model

Status: Dijangka tabled di Parlimen **akhir 2026 atau Q1 2027**.

### PDPA Amendment — AI Data Dimension

Pindaan PDPA 2010 (berkuatkuasa 2024) ada direct implication untuk AI:

- **Consent requirements** lebih ketat untuk data used in AI training
- **Data portability** — users boleh request data dalam machine-readable format
- **Right to explanation** untuk automated decisions yang affect rights

Engineer yang build customer-facing AI di Malaysia perlu audit data collection flows mereka sekarang, bukan tunggu AI Bill.

### Sektor-Spesifik: BNM dan SC

**Bank Negara Malaysia (BNM):**
- Discussion paper tentang Responsible AI in Finance (2024)
- Fokus pada explainability untuk credit decisions
- Requirement untuk human oversight dalam high-stakes decisions

**Securities Commission Malaysia:**
- Guidelines on Digital Assets include AI trading restrictions
- Algorithmic trading disclosure requirements

---

## ASEAN AI Governance Framework

ASEAN Guide on AI Governance and Ethics (OECD-aligned) ada 8 prinsip:

1. Inclusivity dan Human Centricity
2. Safety and Robustness
3. Fairness
4. Transparency and Explainability
5. Data Governance and Protection
6. Accountability
7. Intellectual Property
8. Sustainability

**Realiti:** ASEAN framework adalah guidance, bukan binding. Implementation bergantung kepada setiap negara.

Yang menarik adalah **ASEAN-wide AI incident database** yang sedang dibina — akan membolehkan cross-border sharing tentang AI failures dan misuse patterns. Relevan untuk CSPM teams yang monitor AI workloads.

---

## Comparison: EU vs Malaysia vs ASEAN

| Dimensi | EU AI Act | Malaysia (Incoming) | ASEAN |
|---|---|---|---|
| Legal force | Binding legislation | Bill (incoming) | Non-binding |
| Risk classification | 4 tiers (formal) | High-risk focus | Principle-based |
| Technical requirements | Very specific | TBD | General |
| Penalties | Up to €35M or 7% global revenue | TBD (PDPA model reference) | N/A |
| Scope | Organisations placing AI in EU market | Malaysian organisations | Member state guidance |
| Effective for engineer | August 2026 (high-risk) | 2027 (est.) | Now (voluntary) |

---

## Apa yang Ini Bermakna Untuk Engineering Teams

### Hari Ini

Walaupun AI Bill Malaysia belum final, ini adalah actions yang masuk akal sekarang:

**1. Inventory AI Systems**
Dokumentasikan semua AI/ML systems yang sedang digunakan. Untuk setiap satu:
- Apa decision yang ia buat atau influence?
- Data apa yang digunakan?
- Ada human oversight atau fully automated?

**2. Classify Risk Level**
Gunakan EU AI Act risk tiers sebagai reference walaupun anda bukan EU company. Ia adalah framework terbaik yang ada. Kalau system anda jatuh dalam "high-risk" oleh EU standard, assume Malaysia akan ada similar requirements.

**3. Start Logging**
Logging untuk AI decisions adalah hampir pasti akan jadi mandatory. Implement sekarang:
- Input/output logging dengan timestamps
- Decision rationale (untuk explainable AI)
- Version tracking untuk models
- Tamper-evident storage

**4. Human Override Mechanism**
Untuk sebarang AI yang membuat consequential decisions (kredit, akses, penyaringan), pastikan ada clear human override pathway. Ini bukan hanya regulasi requirement — ini good engineering practice.

**5. Bias Testing**
Run bias audits pada models yang deal dengan people decisions. Baseline metrics sekarang supaya ada comparison bila regulasi require it.

### Bila Malaysia AI Bill Passed

Jangka:
- Registration process untuk high-risk AI systems
- Designated compliance officer requirement (kemungkinan besar)
- Audit trail yang boleh dikemukakan kepada NACSA
- Incident notification dalam 72 jam (model dari PDPA amendment)

---

## The Engineer's Mental Model

Cara terbaik untuk think about regulasi AI:

**Regulasi adalah lagging indicator.** Ia mencerminkan harms yang dah berlaku. Yang bermakna — kalau anda bina responsibly hari ini, anda sudah ahead.

**Technical controls = regulatory compliance.** Logging, explainability, human oversight — semua ini adalah good engineering yang juga happen to be regulatory requirements. Bukan dua benda berbeza.

**Scope tidak terhad kepada headquarters.** EU AI Act berlaku kepada sesiapa yang place AI systems dalam EU market — walaupun syarikat anda di Kuala Lumpur. SaaS product yang accessible dari EU? Potentially in scope.

---

## Bottom Line

Regulasi AI bukan future concern. Sebahagian darinya sudah aktif (EU), sebahagian lagi akan datang (Malaysia). Perbezaan antara engineer yang perlu do emergency refactoring dan yang tidak — adalah sama ada mereka audit systems mereka sekarang.

Framework yang perlu tahu:
- **EU AI Act** — paling comprehensive, most prescriptive technically
- **Malaysia AIGF + incoming AI Bill** — voluntary sekarang, legislation coming
- **PDPA Amendment 2024** — berkuatkuasa sekarang, impacts AI data use
- **BNM / SC sector guidelines** — untuk financial AI

Baca technical annexes. Bukan hanya summary. Itulah yang akan jadi implementation requirements.

---

*Sumber: EUR-Lex EU AI Act Full Text, MDEC AI Governance Framework 2024, NACSA Malaysia Cybersecurity Reports, ASEAN Guide on AI Governance and Ethics, Bank Negara Malaysia Discussion Paper on Responsible AI*
