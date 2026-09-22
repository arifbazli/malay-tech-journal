---
title: 'AI-SPM Bukan Kategori Baru — Ia CSPM yang Belajar Nampak AI Workload'
description: 'Orca dan Microsoft dua-dua ship AI-SPM sebagai extension kepada platform CSPM sedia ada, bukan produk standalone — kecuali satu perubahan licensing 2026 yang berlaku sebaliknya. Apa AI-SPM betul-betul cover, dan di mana boundary sebenar.'
pubDate: 2026-09-22
tags:
  - cloud
  - security
  - ai
  - iam
categories: ['Ground Truth']
translationKey: 'gt-07-ai-spm-cspm-evolution'
toc: true
postType: essay
draft: true
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: 'Ground truth essay — AI-SPM as an extension of CSPM'
---

## AI-SPM Bunyi Macam Market Baru — Sebenarnya Bukan

"AI Security Posture Management" bunyi macam kategori produk baru — acronym kawan kepada CSPM, ASPM, dan semua -SPM lain yang muncul beberapa tahun kebelakangan ni. Tengok apa yang betul-betul ship pada 2026, gambaran dia kurang exciting, tapi lebih useful: **AI-SPM adalah CSPM yang extend scanning dan policy engine sedia ada untuk recognize resource jenis AI.** Bukan market baru. Resource type baru dalam market yang kau dah ada.

Dua vendor confirm ni secara terus. AI-SPM Orca Security guna semula teknologi agentless "SideScanning" sedia ada — engine yang sama yang dah scan cloud resource — sekarang extend untuk cover "50+ AI models and software packages." Microsoft ship AI security posture sebagai capability _dalam_ Defender CSPM plan, bukan produk berasingan: "The Defender Cloud Security Posture Management (CSPM) plan in Microsoft Defender for Cloud... secures generative AI applications and AI agents throughout their entire lifecycle."

## Apa AI-SPM Betul-Betul Tambah

Buang branding, dua-dua vendor buat benda kategori yang sama macam CSPM selalu buat — inventori resource, evaluate ikut policy, flag misconfiguration — cuma point kat resource type khusus AI yang CSPM biasa tak pernah tengok:

- **Shadow AI discovery.** Framing Orca sendiri: "security teams don't know which AI models are in use and aren't able to discover shadow AI." Ini versi era-AI untuk masalah S3 bucket yang tak terurus — model AI atau endpoint yang tiada siapa dalam security team tahu wujud.
- **Model dan credential exposure.** API key yang exposed atau model endpoint yang boleh diakses public "can cause model theft" ikut Orca — equivalent kepada storage bucket yang terbuka, tapi untuk model yang dilatih, bukan data blob.
- **Training-data exposure.** Data sensitif yang accidentally masuk dalam training data "can cause AI models to expose sensitive data and PII" — failure mode baru yang check klasifikasi-data tradisional CSPM tak direka untuk tangkap.
- **AI Bill of Materials.** Defender CSPM Microsoft bina inventori kod, data, dan artifact berkaitan AI "from code to cloud" — konsep SBOM, applied kat model dan dataset instead of software package.
- **Check IaC khusus AI dan attack path.** Contoh konkrit dari dokumentasi Microsoft sendiri: "Use Azure AI Service Private Endpoints," "Use Managed Identity for Azure AI Service Accounts" — plus attack-path analysis yang extend untuk cover model grounding dan fine-tuning data exposure.

Dan yang penting: coverage AI-SPM Microsoft bukan Azure-only. Dia explicitly cover Azure OpenAI Service dan Azure AI Foundry, tapi juga Azure ML, **Amazon Bedrock, dan Google Vertex AI**. Vendor CSPM yang modul AI posture dia inventori AI service pesaing sendiri — itu signal yang cukup bersih yang ini betul-betul pasal "di mana saja AI workload kau jalan," bukan upsell walled-garden.

## Dua Vendor, Dua Emphasis — Idea Sama

Messaging public Orca lean kat _discovery_: apa AI yang kita ada sekarang. Microsoft lean kat _lifecycle dan remediation_: ini fix IaC khusus dan attack path khusus. Tiada framing yang "lebih betul" — dua-dua pattern posture-management yang sama (inventori → evaluate → prioritize → fix) dengan emphasis marketing yang berbeza. Penting untuk tahu kalau kau evaluate mana-mana satu: kau bukan compare dua kategori produk berbeza, kau compare UX dua vendor atas capability underlying yang sama.

## Satu Boundary Baru yang Genuine: Posture Level-Agent Baru Kena Pisah

Ini bahagian yang betul-betul patut jadi action item, bukan sekadar update mental model. Terus dari dokumentasi Microsoft sendiri, dated kat bulan:

> "Effective July 1, 2026, AI agent discovery and security posture for Microsoft Foundry agents and third-party cloud agents require a Microsoft Agent 365 license. These capabilities were previously available through the Defender CSPM plan... but agent-level capabilities now require Agent 365."

Baca teliti-teliti: AI-SPM level-_workload_ (coverage model/data/endpoint kat atas tu) kekal dalam Defender CSPM. Posture level-_agent_ — discovery dan security untuk autonomous AI agent secara khusus — kena split ke produk baru yang licensed berasingan. Jadi trend line ni bukan uniform "capability AI selalu di-absorb dalam CSPM." Lebih tepat: AI security level-static/workload sedang di-absorb dalam CSPM, sementara layer paling baru dan cutting-edge — agentic AI — sedang di-spin jadi tier sendiri yang dimonetize berasingan.

Kalau organisasi kau jalankan Defender CSPM dan ada Foundry atau third-party AI agent dalam scope, coverage kau untuk agent tu secara khusus mengecil pada **1 Julai 2026** kalau Agent 365 tak sama-sama di-license. Itu bukan trend untuk catat — itu audit licensing untuk jalankan quarter ni.

## Kaitan dengan Ranking Ancaman CSA 2026

[_Top Threats to Cloud Computing Survey Report 2026_ CSA](/posts/gt-06-csa-top-threats-2026/) rank Inadequate IAM sebagai ancaman #1 cloud — didorong secara explicit oleh pertumbuhan non-human identity — dan introduce dua ancaman khusus AI buat kali pertama: AI-Enhanced Attacks (#2) dan AI System Compromise (#6). Laporan tu sendiri tak pernah guna term "AI-SPM." Dia tak perlu. Dia describe threat surface yang exact — AI identity yang tak terurus, sistem AI yang compromised, model yang exposed — yang tooling AI-SPM dibina untuk kurangkan. Kategori produk dan ranking ancaman tu dua view untuk shift yang sama: AI workload sekarang cukup banyak dan cukup exposed untuk perlukan discipline posture yang sama macam cloud infrastructure dapat sedekad lepas.

## Apa Maksudnya untuk Pasukan di Malaysia

Dua benda konkrit, bukan "watch this space" yang general:

- **Jangan shop untuk "AI-SPM" sebagai line item tool yang betul-betul baru.** Check dulu adakah vendor CSPM sedia ada kau dah ship ni sebagai modul — ikut evidence kat sini, itu pattern shipping yang lebih common (Orca dan Microsoft dua-dua buat macam ni), bukan kategori procurement berasingan. Vendor sprawl adalah exactly masalah yang [trend konsolidasi ASPM](/posts/cse-04-aspm-appsec-consolidation/) cuba selesaikan kat sisi application security; jangan recreate benda tu kat sisi AI dengan beli tool posture keempat sedangkan tool ketiga kau dah cover.
- **Kalau kau kat Microsoft, check licensing Agent 365 kau sekarang**, bukan bila insiden berkaitan agent force soalan tu. Coverage workload dan coverage agent bukan line item yang sama lagi.

## Bottom Line

AI-SPM bukan market baru untuk research dari kosong — ia pattern inventori-evaluate-prioritize CSPM sedia ada, di-point kat model AI, training data, dan endpoint instead of sekadar VM dan storage bucket. Satu tempat boundary yang betul-betul baru sedang terbentuk adalah agentic AI, yang sekurang-kurangnya satu vendor major sekarang layan sebagai masalah berasingan yang di-price berasingan. Kenal pasti sisi mana boundary tu posture tooling kau betul-betul cover.

Sumber:

- [AI Security Posture Management](https://orca.security/platform/ai-security-posture-management/) — Orca Security
- [Overview - AI security posture management - Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/ai-security-posture) — Microsoft Learn
- [AI Emerges as an Attack Enabler and Target in Cloud Security Alliance's 2026 Top Threats Report](https://cloudsecurityalliance.org/articles/ai-emerges-as-an-attack-enabler-and-target-in-csa-2026-top-threats-report) — Cloud Security Alliance
