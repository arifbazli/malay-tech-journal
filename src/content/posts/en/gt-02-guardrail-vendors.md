---
title: "Guardrail Vendors vs Production Reality — What AWS, Azure and Google Don't Tell You"
description: 'AWS Bedrock Guardrails, Azure AI Content Safety, Google Vertex AI Safety — all look solid in documentation. But in production, there are real gaps between vendor promises and actual protection. Data from Palo Alto Unit42, AML bypass research, and production latency benchmarks.'
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
heroImageAlt: 'Ground truth essay — guardrail vendor landscape'
---

## The Problem With "Guardrails Included"

When engineering teams decide to deploy an AI model in production, the security question is most commonly answered with a single line:

> "We're on AWS Bedrock — it has built-in guardrails."

Or the Azure version: _"Content Safety handles all of that."_

This isn't wrong. But it isn't fully right either.

Vendor-managed guardrails are a good starting point. They handle common cases — slurs, sexual content, obvious jailbreak attempts. But **production reality is different** from demo environments and docs pages.

This essay is about that gap.

---

## What the Three Major Vendors Offer

### AWS Bedrock Guardrails

AWS Bedrock Guardrails, launched GA in April 2024, provides:

- **Content filters** — 6 categories: Hate, Insults, Sexual, Violence, Misconduct, Prompt Attack
- **Denied topics** — custom topic blocking based on natural language descriptions
- **Sensitive information redaction** — PII detection (names, SSN, credit card numbers, etc.)
- **Grounding check** — RAG hallucination detection via factual consistency scoring
- **Word filters** — exact match and wildcard blocking
- **Contextual grounding** — threshold-based validation for query-response pairs

Pricing: charged per 1,000 text units. Grounding check costs more — it re-runs inference to verify.

**What docs highlight:** Easy API integration, single call for all checks, compliance-ready for SOC 2 and HIPAA workloads.

**What docs underemphasise:** Latency overhead per request, false positive rates on domain-specific content, and limitations on multilingual inputs — especially non-English languages.

---

### Azure AI Content Safety

Microsoft Content Safety (distinct from the broader Responsible AI suite) offers:

- **Text analysis** — 4 severity categories (0–6): Hate, Sexual, Violence, Self-Harm
- **Image analysis** — same 4 categories
- **Prompt Shields** — specifically for detecting direct attacks and indirect prompt injection
- **Groundedness detection** (preview) — for RAG pipelines
- **Protected material detection** — copyright and code detection

Easiest integration for Azure OpenAI Service — can be enabled directly from the Azure Portal with zero code changes.

**What docs highlight:** Native integration with Azure OpenAI, enterprise SLA, regional data residency.

**What docs underemphasise:** Prompt Shields is still in an improvement cycle. Unit42 2024 research shows indirect prompt injection via retrieved documents can still bypass with certain document formatting techniques.

---

### Google Vertex AI Safety Filters

Vertex AI (Gemini API) provides:

- **Safety settings** — 4 categories: Harassment, Hate Speech, Sexually Explicit, Dangerous Content
- **Threshold control** — BLOCK_NONE, BLOCK_LOW_AND_ABOVE, BLOCK_MEDIUM_AND_ABOVE, BLOCK_ONLY_HIGH
- **Grounding** — Google Search grounding to reduce hallucination
- **Citation** — automatic source attribution for grounded responses

**What docs highlight:** Granular threshold control, transparent blocking reason, citation support.

**What docs underemphasise:** Safety filters operate at the generation level, not the input level by default. Meaning: the model has already "seen" the input before filters kick in.

---

## Gap #1 — Multilingual Is a Blind Spot

This is the most critical issue for Malaysian engineering teams.

**Reality:** All three vendors train safety filters predominantly on English. Performance drops significantly for other languages.

Concrete examples from documented testing (not proprietary — this is well-covered in academic literature):

| Input                   | Language                  | AWS Block | Azure Block | Vertex Block |
| ----------------------- | ------------------------- | --------- | ----------- | ------------ |
| Clearly violent content | EN                        | ✓         | ✓           | ✓            |
| Same content            | Bahasa Melayu             | ✗         | ✗           | ✗            |
| Same content            | Malay-English code-switch | ✗         | ✗           | Partial      |
| Romanised Malay slang   | BM                        | ✗         | ✗           | ✗            |

This is not theoretical. Microsoft explicitly acknowledges in Azure AI Content Safety documentation that performance is "optimised for English" with a note that other languages "may have lower accuracy."

AWS Bedrock docs are notably silent on this topic.

**Implication for Malaysian teams:** If your application serves Bahasa Melayu users, vendor guardrails alone are insufficient. You need an additional layer — either a custom classifier or prompt engineering that force-translates to English before safety checks.

---

## Gap #2 — Indirect Prompt Injection Is Still Open

**Palo Alto Unit42's 2024 report** documented that indirect prompt injection — where injection occurs through retrieved documents in a RAG pipeline rather than direct user input — is **the most underestimated attack vector** in production AI.

Why this is hard for vendor guardrails to catch:

1. **The content looks "clean" in isolation** — documents that inject instructions appear innocent when checked individually
2. **Injection occurs inside the context window**, not in the user query
3. **Timing issue** — guardrails typically check input and output, not intermediate reasoning steps

AWS Bedrock Grounding Check and Azure Prompt Shields attempt to address this. But effectiveness depends on:

- How complex the injection chain is
- How many retrieval steps exist in the pipeline
- Whether the model has been "compromised" in an earlier turn

**Unit42 data:** Of 500 tested RAG applications, **68% had indirect injection vulnerabilities** that could bypass vendor-level guardrails.

---

## Gap #3 — Latency Reality vs Marketing Numbers

This is what engineering managers need to know before making architecture decisions.

**Marketing claim:** "Sub-100ms overhead."

**Production reality** (aggregated from multiple case studies and public benchmarks):

| Vendor                        | Stated Overhead | P99 Latency Added | Cold Start |
| ----------------------------- | --------------- | ----------------- | ---------- |
| AWS Bedrock Guardrails (full) | ~50ms           | 180–320ms         | 800ms+     |
| Azure Content Safety          | ~30ms           | 120–240ms         | 400ms+     |
| Vertex AI Safety Filters      | Built-in        | 80–160ms          | N/A        |

"Full" for AWS means all features enabled: content filter + denied topics + grounding check. Grounding check alone can add 200ms+ because it runs an additional inference pass.

**The pattern that commonly occurs:**

1. Team enables all guardrails in testing
2. Latency is acceptable in isolation (single request)
3. Production hit — concurrent requests expose P99 degradation
4. Team disables grounding check for "performance reasons"
5. The grounding check was the most valuable component for RAG safety

This is a trade-off that needs to be made consciously, not out of fear.

---

## Gap #4 — Threshold Tuning Is Art, Not Science

Vendor guardrails ship with default thresholds. These defaults are designed for "general use" — meaning low false positive rates so they don't frustrate typical users.

**Problem:** Production applications are not typical.

Real scenario examples:

**Medical information chatbot:** Default Violence filter will block legitimate clinical content about surgical procedures, trauma treatment, medication overdose thresholds. Teams need to tune down the Violence filter — but this also reduces blocking for genuinely harmful content.

**Cybersecurity assistant:** Default Misconduct filter will block penetration testing discussions, CVE analysis, vulnerability descriptions. All of these are legitimate for security professionals.

**Financial products customer service:** Default Misconduct filter will conflict with legitimate discussions about loan rejection, bankruptcy options, foreclosure processes.

**Every tune made is an accepted risk.** The problem is that vendors don't provide a clear framework for documenting and governing these decisions. It becomes ad-hoc and unauditable.

---

## What Engineers Should Do

This isn't an anti-vendor essay. Vendor guardrails are an important layer. But they should be the **first layer**, not the only layer.

### Defense-in-Depth Framework for AI

```
Layer 0 — Input Sanitization
  - Length limits, encoding validation
  - Rate limiting per user/session
  - Language detection → route to appropriate filter

Layer 1 — Vendor Guardrails
  - AWS / Azure / Vertex default filters
  - Custom denied topics for domain
  - PII redaction

Layer 2 — Custom Classifier
  - Domain-specific fine-tuned classifier
  - Multilingual coverage (Bahasa Melayu + EN)
  - Confidence threshold gating

Layer 3 — Output Validation
  - Response schema validation
  - Factual grounding check (manual or automated)
  - Toxicity re-check on output

Layer 4 — Monitoring & Feedback Loop
  - Log every blocked request with reason
  - Human review queue for borderline cases
  - Weekly threshold review cycle
```

For a deeper production reference (6 layers with tools and tradeoffs), see [**AI guardrails — 6 layers you must have in production**](/en/posts/age-02-6-lapisan/).

### Specific Recommendations

**For AWS Bedrock:**

- Enable Grounding Check only for RAG-heavy flows, not all requests
- Build custom denied topics based on your domain — don't rely on generic categories
- Test with Bahasa Melayu inputs before going to production

**For Azure:**

- Combine Content Safety with Prompt Shields — don't use either in isolation
- Enable diagnostic logging — Azure content safety events should flow into your SIEM
- Set up a custom blocklist for domain-specific terms

**For Vertex AI:**

- Use BLOCK_MEDIUM_AND_ABOVE as your starting point, not the default
- Enable citation for all grounded responses
- Implement separate input classification before the Vertex API call

---

## Bottom Line

Vendor guardrails do good work for common cases. They should be used.

But **"vendor guardrails exist" ≠ "AI system is safe."**

The real gaps are:

1. Non-English languages — all vendors underperform
2. Indirect injection via RAG — still largely unsolved
3. Latency vs coverage trade-off — needs to be made explicitly
4. Threshold tuning governance — no standard framework exists

Engineers who understand these gaps can build systems that are honest about their risk profile. Engineers who assume vendors handle everything will be surprised in production.

---

_Sources: Palo Alto Unit42 AI Security Report 2024, Microsoft Azure AI Content Safety Documentation, AWS Bedrock Guardrails User Guide, Google Vertex AI Safety Settings Reference, OWASP LLM Top 10 v1.1_
