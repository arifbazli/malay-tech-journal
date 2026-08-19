---
title: 'The World Is Writing AI Law — What Engineers Actually Need to Know'
description: 'EU AI Act enforcement began Feb 2025. Malaysia is finalising an AI Governance Bill. ASEAN has its own frameworks. Regulation is shaping how we build AI — whether we are paying attention or not. A guide for engineers.'
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
heroImageAlt: 'Ground truth essay — AI regulation 2026'
---

## Why Engineers Need to Care About Regulation

Regulation isn't only a lawyer's domain. When AI law enters the production environment, it becomes a technical requirement that engineers have to implement.

The EU AI Act isn't just a policy document. It has technical annexes specifying logging requirements, explainability standards, data governance controls, and human oversight mechanisms. Engineers who don't read these will build systems that need to be rebuilt.

This essay is a practical guide: what's happening in the EU, Malaysia, and ASEAN — and what it means for engineers building AI systems today.

---

## EU AI Act — The Framework That Changes Everything

### Timeline and Status

- **Signed:** 13 June 2023 (European Parliament)
- **Entered into force:** 1 August 2024
- **Prohibited AI provisions:** 2 February 2025 ✓ **(already active)**
- **High-risk AI obligations:** 2 August 2026
- **GPAI (General Purpose AI) rules:** 2 August 2025

This is not "future legislation." Parts of it **are already enforced.**

### Risk-Based Framework

The EU AI Act categorises AI systems into 4 tiers:

**Unacceptable Risk (Prohibited):**

- Social scoring by governments
- Real-time biometric surveillance in public spaces (with limited exceptions)
- Subliminal manipulation
- Exploitation of vulnerabilities (children, elderly)

**High Risk:**

- Critical infrastructure (energy, water, transport)
- Educational assessment
- Employment screening
- Essential private and public services
- Law enforcement
- Migration and border control
- Administration of justice

**Limited Risk:**

- Chatbots (must disclose that it is AI)
- Deepfakes (must be labelled)

**Minimal Risk:**

- Spam filters, recommendation engines, etc.

### Technical Requirements for High-Risk AI

This is what engineers need to implement:

```
1. Risk Management System
   - Must have documented risk assessment
   - Iterative — not one-time
   - Cover foreseeable misuse, not just intended use

2. Data and Data Governance
   - Training data must be relevant, representative
   - Must document data provenance
   - Bias detection and mitigation

3. Technical Documentation
   - Before market placement
   - Must update when changes occur
   - Accessible to market surveillance authorities

4. Record-Keeping (Logging)
   - Automatic logging for high-risk AI
   - Tamper-evident logs
   - Retention period appropriate to lifecycle

5. Transparency
   - Users must know they're interacting with AI
   - For high-risk: capabilities and limitations must be disclosed

6. Human Oversight
   - Technical measures to enable human monitoring
   - Ability to interrupt, stop, override

7. Accuracy, Robustness, Cybersecurity
   - Consistent performance metrics
   - Resilience against adversarial inputs
   - Cybersecurity measures
```

### GPAI — Most Relevant for LLM Teams

Models like GPT-4, Claude, Gemini fall under GPAI. Requirements include:

- Comprehensive technical documentation
- Copyright compliance for training data
- Published summary of training data content

For **GPAI with systemic risk** (very powerful models — estimated FLOPs > 10^25):

- Adversarial testing (red-teaming)
- Incident reporting to the European AI Office
- Cybersecurity measures
- Energy efficiency reporting

---

## Malaysia AI Governance — Status 2026

### AI Governance Framework (2024)

Malaysia published the **Artificial Intelligence Governance Framework (AIGF)** through MDEC in 2024. This is a voluntary framework, not legislation, with core principles:

1. **Human-Centred** — AI for the benefit of citizens
2. **Fairness** — no discrimination
3. **Accountability** — clear responsibility chain
4. **Transparency** — explainable decisions
5. **Safety and Security** — robust systems
6. **Privacy** — data protection compliance

Voluntary means no legal penalty for non-compliance — for now.

### AI Governance Bill — Being Finalised

NACSA and MDEC are collaborating to finalise an **AI Governance Bill** that will give legal force to the AIGF.

Key elements expected (based on public consultation documents):

- **Mandatory registration** for high-risk AI applications
- **AI impact assessment** before deployment
- **Incident reporting** to NACSA for AI security breaches
- **Penalties** for non-compliance — potentially aligned with the PDPA enforcement model

Status: Expected to be tabled in Parliament **late 2026 or Q1 2027**.

### PDPA Amendment — The AI Data Dimension

The PDPA 2010 Amendment (in force since 2024) has direct implications for AI:

- **Stricter consent requirements** for data used in AI training
- **Data portability** — users can request their data in machine-readable format
- **Right to explanation** for automated decisions that affect rights

Engineers building customer-facing AI in Malaysia need to audit their data collection flows now, not wait for the AI Bill.

### Sector-Specific: BNM and SC

**Bank Negara Malaysia (BNM):**

- Discussion paper on Responsible AI in Finance (2024)
- Focus on explainability for credit decisions
- Requirement for human oversight in high-stakes decisions

**Securities Commission Malaysia:**

- Guidelines on Digital Assets include AI trading restrictions
- Algorithmic trading disclosure requirements

---

## ASEAN AI Governance Framework

ASEAN's Guide on AI Governance and Ethics (OECD-aligned) has 8 principles:

1. Inclusivity and Human Centricity
2. Safety and Robustness
3. Fairness
4. Transparency and Explainability
5. Data Governance and Protection
6. Accountability
7. Intellectual Property
8. Sustainability

**Reality:** The ASEAN framework is guidance, not binding. Implementation depends on each member state.

What's notable is an **ASEAN-wide AI incident database** under development — enabling cross-border sharing on AI failures and misuse patterns. Directly relevant for CSPM teams monitoring AI workloads.

---

## Comparison: EU vs Malaysia vs ASEAN

| Dimension               | EU AI Act                             | Malaysia (Incoming)        | ASEAN                 |
| ----------------------- | ------------------------------------- | -------------------------- | --------------------- |
| Legal force             | Binding legislation                   | Bill (incoming)            | Non-binding           |
| Risk classification     | 4 formal tiers                        | High-risk focus            | Principle-based       |
| Technical requirements  | Very specific                         | TBD                        | General               |
| Penalties               | Up to €35M or 7% global revenue       | TBD (PDPA model reference) | N/A                   |
| Scope                   | Organisations placing AI in EU market | Malaysian organisations    | Member state guidance |
| Effective for engineers | August 2026 (high-risk)               | 2027 (est.)                | Now (voluntary)       |

---

## What This Means for Engineering Teams

### Today

Even though Malaysia's AI Bill isn't final, these actions make sense now:

**1. Inventory AI Systems**
Document all AI/ML systems currently in use. For each one:

- What decisions does it make or influence?
- What data does it use?
- Is there human oversight or is it fully automated?

**2. Classify Risk Level**
Use EU AI Act risk tiers as reference even if you're not an EU company. It's the most comprehensive framework available. If your system falls into "high-risk" by EU standards, assume Malaysia will have similar requirements.

**3. Start Logging**
Logging for AI decisions is almost certainly going to be mandatory. Implement it now:

- Input/output logging with timestamps
- Decision rationale (for explainable AI)
- Version tracking for models
- Tamper-evident storage

**4. Human Override Mechanism**
For any AI making consequential decisions (credit, access, screening), ensure there's a clear human override pathway. This isn't just a regulatory requirement — it's good engineering practice.

**5. Bias Testing**
Run bias audits on models dealing with people decisions. Establish baseline metrics now so you have a comparison point when regulation requires it.

### When Malaysia AI Bill Passes

Expect:

- Registration process for high-risk AI systems
- Designated compliance officer requirement (likely)
- Audit trail that can be submitted to NACSA
- Incident notification within 72 hours (modelled on PDPA amendment)

---

## The Engineer's Mental Model

The best way to think about AI regulation:

**Regulation is a lagging indicator.** It reflects harms that have already occurred. Which means — if you're building responsibly today, you're already ahead.

**Technical controls = regulatory compliance.** Logging, explainability, human oversight — these are good engineering that also happen to be regulatory requirements. Not two separate things.

**Scope is not limited to headquarters.** The EU AI Act applies to anyone placing AI systems in the EU market — even if your company is in Kuala Lumpur. A SaaS product accessible from the EU? Potentially in scope.

---

## Bottom Line

AI regulation isn't a future concern. Parts of it are already active (EU), more is coming (Malaysia). The difference between engineers who need emergency refactoring and those who don't — is whether they audit their systems now.

Frameworks to know:

- **EU AI Act** — most comprehensive, most technically prescriptive
- **Malaysia AIGF + incoming AI Bill** — voluntary now, legislation coming
- **PDPA Amendment 2024** — in force now, impacts AI data use
- **BNM / SC sector guidelines** — for financial AI

Read the technical annexes. Not just the summaries. Those are what will become implementation requirements.

---

_Sources: EUR-Lex EU AI Act Full Text, MDEC AI Governance Framework 2024, NACSA Malaysia Cybersecurity Reports, ASEAN Guide on AI Governance and Ethics, Bank Negara Malaysia Discussion Paper on Responsible AI_
