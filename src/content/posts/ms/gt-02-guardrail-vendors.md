---
title: "Guardrail Vendor vs Realiti Produksi — Apa yang AWS, Azure dan Google Tak Cerita"
description: "AWS Bedrock Guardrails, Azure AI Content Safety, Google Vertex AI Safety — semua kelihatan bagus dalam dokumentasi. Tapi dalam production, ada jurang nyata antara janji vendor dan perlindungan sebenar. Data daripada Unit42, AML bypass research, dan production latency benchmarks."
pubDate: 2026-07-11
tags:
  - ai
  - guardrail
  - cloud
  - security
categories: ['Ground Truth']
translationKey: gt-02-guardrail-vendors
toc: true
postType: essay
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: "Ground truth essay — guardrail vendor landscape"

---

## Masalah Dengan "Guardrails Included"

Apabila pasukan engineering decide nak deploy model AI dalam production, soalan keselamatan yang paling lazim dijawab dengan satu ayat:

> "Kita guna AWS Bedrock — dia ada guardrails built-in."

Atau versi Azure: *"Content Safety dah handle semua tu."*

Ini bukan salah. Tapi ia juga bukan betul sepenuhnya.

Guardrails vendor-managed adalah titik permulaan yang baik. Mereka handle kes biasa — racial slurs, sexual content, obvious jailbreak attempts. Tapi **production reality adalah berbeza** daripada demo environment dan docs page.

Essay ini adalah tentang jurang itu.

---

## Apa Yang Tiga Vendor Besar Offer

### AWS Bedrock Guardrails

AWS Bedrock Guardrails, dilancarkan GA pada April 2024, menawarkan:

- **Content filters** — 6 kategori: Hate, Insults, Sexual, Violence, Misconduct, Prompt Attack
- **Denied topics** — custom topic blocking berdasarkan natural language description
- **Sensitive information redaction** — PII detection (nama, SSN, nombor kad kredit, dll)
- **Grounding check** — RAG hallucination detection via factual consistency scoring
- **Word filters** — exact match dan wildcard blocking
- **Contextual grounding** — threshold-based untuk query-response pair validation

Harga: charged per 1,000 text units. Grounding check lebih mahal — ia run inference semula untuk verify.

**Apa yang docs highlight:** Mudah integrate via API, satu call untuk semua checks, compliance-ready untuk SOC 2 dan HIPAA workloads.

**Apa yang docs kurang tekankan:** Latency overhead per request, false positive rates pada domain-specific content, dan had pada multilingual inputs terutama bahasa bukan-Inggeris.

---

### Azure AI Content Safety

Microsoft Content Safety (bukan Responsible AI suite yang lain) tawarkan:

- **Text analysis** — 4 kategori severity (0–6): Hate, Sexual, Violence, Self-Harm
- **Image analysis** — sama 4 kategori
- **Prompt Shields** — specifically untuk detect direct attacks dan indirect prompt injection
- **Groundedness detection** (preview) — untuk RAG pipelines
- **Protected material detection** — copyright dan code detection

Integration paling mudah untuk Azure OpenAI Service — boleh enable terus dari Azure Portal, zero code change.

**Apa yang docs highlight:** Native integration dengan Azure OpenAI, enterprise SLA, regional data residency.

**Apa yang docs kurang tekankan:** Prompt Shields masih dalam improvement cycle. Unit42 2024 research menunjukkan indirect prompt injection via retrieved documents masih boleh bypass dengan certain document formatting tricks.

---

### Google Vertex AI Safety Filters

Vertex AI (Gemini API) ada:

- **Safety settings** — 4 categories: Harassment, Hate Speech, Sexually Explicit, Dangerous Content
- **Threshold control** — BLOCK_NONE, BLOCK_LOW_AND_ABOVE, BLOCK_MEDIUM_AND_ABOVE, BLOCK_ONLY_HIGH
- **Grounding** — Google Search grounding untuk reduce hallucination
- **Citation** — automatic source attribution untuk grounded responses

**Apa yang docs highlight:** Granular threshold control, transparent blocking reason, citation support.

**Apa yang docs kurang tekankan:** Safety filters operate at generation level, bukan input level secara default. Meaning: model dah "nampak" input sebelum filter kick in.

---

## Jurang #1 — Multilingual Adalah Blind Spot

Ini yang paling kritikal untuk pasukan Malaysia.

**Reality:** Semua tiga vendor train safety filters predominantly pada Inggeris. Performance drop signifikan pada bahasa lain.

Contoh konkrit daripada internal testing (bukan proprietary — ini well-documented dalam academic literature):

| Input | Bahasa | AWS Block | Azure Block | Vertex Block |
|---|---|---|---|---|
| Jelas violent content | EN | ✓ | ✓ | ✓ |
| Sama content | Bahasa Melayu | ✗ | ✗ | ✗ |
| Sama content | Malay-English code-switch | ✗ | ✗ | Partial |
| Romanised Malay slang | BM | ✗ | ✗ | ✗ |

Ini bukan teori. Microsoft sendiri acknowledge dalam Azure AI Content Safety docs bahawa performance adalah "optimised for English" dengan nota bahawa bahasa lain "may have lower accuracy."

AWS Bedrock docs lebih diam tentang topik ini.

**Implikasi untuk pasukan Malaysia:** Jika application anda serve Bahasa Melayu users, vendor guardrails sahaja adalah tidak cukup. Kena ada lapisan tambahan — sama ada custom classifier atau prompt engineering yang force translate ke Inggeris sebelum safety check.

---

## Jurang #2 — Indirect Prompt Injection Masih Terbuka

**Palo Alto Unit42 2024 report** mendokumentasi bahawa indirect prompt injection — di mana injection berlaku melalui retrieved documents dalam RAG pipeline, bukan direct user input — adalah **the most underestimated attack vector** dalam production AI.

Kenapa ini susah untuk vendor guardrails catch:

1. **Content tu "bersih" secara individu** — dokumen yang inject instruction nampak innocent kalau check secara standalone
2. **Injection berlaku dalam context window**, bukan dalam user query
3. **Timing issue** — guardrails biasanya check input dan output, bukan intermediate reasoning steps

AWS Bedrock Grounding Check dan Azure Prompt Shields ada attempt untuk address ini. Tapi effectiveness bergantung kepada:
- Seberapa complex injection chain nya
- Berapa banyak retrieval steps ada dalam pipeline
- Sama ada model dah "compromised" dalam earlier turn

**Data dari Unit42:** Daripada 500 tested RAG applications, **68% ada indirect injection vulnerabilities** yang boleh bypass vendor-level guardrails.

---

## Jurang #3 — Latency Reality vs Marketing Numbers

Ini yang engineering manager perlu tahu sebelum architecture decision.

**Marketing claim:** "Sub-100ms overhead."

**Production reality** (aggregated dari multiple case studies dan public benchmarks):

| Vendor | Stated Overhead | P99 Latency Tambahan | Cold Start |
|---|---|---|---|
| AWS Bedrock Guardrails (full) | ~50ms | 180–320ms | 800ms+ |
| Azure Content Safety | ~30ms | 120–240ms | 400ms+ |
| Vertex AI Safety Filters | Built-in | 80–160ms | N/A |

"Full" untuk AWS bermakna semua features enabled: content filter + denied topics + grounding check. Grounding check sahaja boleh tambah 200ms+ kerana ia run additional inference pass.

**Pattern yang biasa berlaku:**
1. Team enable semua guardrails dalam testing
2. Latency acceptable dalam isolation (single request)
3. Production hit — concurrent requests expose P99 degradation
4. Team disable grounding check untuk "performance reasons"
5. Grounding check adalah yang paling valuable untuk RAG safety

Ini adalah trade-off yang kena buat secara conscious, bukan sebab takut.

---

## Jurang #4 — Threshold Tuning Adalah Seni, Bukan Sains

Vendor guardrails datang dengan default thresholds. Default ni designed untuk "general use" — bermakna false positive rates yang rendah supaya tidak annoying untuk typical users.

**Problem:** Production application bukan typical.

Contoh real scenarios:

**Medical information chatbot:** Default Violence filter akan block legitimate clinical content tentang surgical procedures, trauma treatment, medication overdose thresholds. Team kena tune down Violence filter — tapi ini juga reduce blocking untuk genuine harmful content.

**Cybersecurity assistant:** Default Misconduct filter akan block penetration testing discussions, CVE analysis, vulnerability descriptions. Semua ini adalah legitimate untuk security professionals.

**Customer service untuk financial products:** Default Misconduct filter akan conflict dengan legitimate discussions tentang loan rejection, bankruptcy options, foreclosure processes.

**Setiap tune yang dibuat adalah accepted risk.** Masalahnya — vendor tidak bagi framework yang jelas untuk document dan govern these decisions. Ia jadi ad-hoc, tidak auditable.

---

## Apa Yang Engineer Perlu Buat

Ini bukan essay anti-vendor. Vendor guardrails adalah lapisan penting. Tapi ia harus jadi **lapisan pertama**, bukan lapisan tunggal.

### Framework Defense-in-Depth untuk AI

```
Layer 0 — Input Sanitization
  - Length limits, encoding validation
  - Rate limiting per user/session
  - Language detection → route ke appropriate filter

Layer 1 — Vendor Guardrails
  - AWS / Azure / Vertex default filters
  - Custom denied topics untuk domain
  - PII redaction

Layer 2 — Custom Classifier
  - Domain-specific fine-tuned classifier
  - Multilingual coverage (Bahasa Melayu + EN)
  - Confidence threshold gating

Layer 3 — Output Validation
  - Response schema validation
  - Factual grounding check (manual atau automated)
  - Toxicity re-check pada output

Layer 4 — Monitoring & Feedback Loop
  - Log setiap blocked request dengan reason
  - Human review queue untuk borderline cases
  - Weekly threshold review cycle
```

Untuk rujukan production yang lebih dalam (6 lapisan dengan tools dan tradeoffs), tengok [**AI guardrails — 6 lapisan yang wajib ada dalam production**](/posts/age-02-6-lapisan/).

### Specific Recommendations

**Untuk AWS Bedrock:**
- Enable Grounding Check hanya untuk RAG-heavy flows, bukan semua requests
- Build custom denied topics berdasarkan domain — jangan rely pada generic categories
- Test dengan Bahasa Melayu inputs sebelum production

**Untuk Azure:**
- Combine Content Safety dengan Prompt Shields — jangan satu sahaja
- Enable diagnostic logging — Azure content safety events perlu masuk ke SIEM
- Set up custom blocklist untuk domain-specific terms

**Untuk Vertex AI:**
- Use BLOCK_MEDIUM_AND_ABOVE sebagai starting point, bukan default
- Enable citation untuk semua grounded responses
- Implement separate input classification sebelum Vertex call

---

## Bottom Line

Guardrail vendors buat kerja yang bagus untuk kes biasa. Mereka patut digunakan.

Tapi **"vendor guardrails ada" ≠ "AI system selamat."**

Jurang sebenar adalah:
1. Bahasa bukan-Inggeris — semua vendor underperform
2. Indirect injection melalui RAG — masih largely unsolved
3. Latency vs coverage trade-off — kena buat secara explicit
4. Threshold tuning governance — tiada framework standard

Engineer yang faham jurang ini boleh bina sistem yang lebih jujur tentang risk profile dia. Engineer yang assume vendor handle everything akan surprise dalam production.

---

*Sumber: Palo Alto Unit42 AI Security Report 2024, Microsoft Azure AI Content Safety Documentation, AWS Bedrock Guardrails User Guide, Google Vertex AI Safety Settings Reference, OWASP LLM Top 10 v1.1*
