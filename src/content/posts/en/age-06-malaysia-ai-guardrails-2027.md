---
title: 'AI guardrails in Malaysia: the law lands in 2027 — what engineers should prepare now'
description: "Malaysia's AI Governance Bill is drafted, an AI Safety Institute exists, and deepfakes are the daily fight. What's known, what isn't, and what to build now."
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

> Field notes on how Malaysia is approaching AI guardrails: the coming law, the new institutions, where the real harms are showing up, and what engineering teams can get ready before the rules are final.

## The short version

In Malaysia, "AI guardrails" currently means **law, institutions and public harms**, not prompt-injection filters:

1. **An AI Governance Bill is drafted** and is now expected in the Dewan Rakyat in **early 2027**. It is risk-based, by how much harm a system could cause.
2. **New institutions exist to enforce it:** AI Malaysia Berhad, and a **Malaysia AI Safety Institute (MY-AISafe)** covering safety benchmarks, risk assessments and incident reporting.
3. **Child safety and AI disclosure** are already in scope: safety-by-design for children's chatbots, and phased "you are talking to AI" notices for high-risk apps.
4. **Deepfakes and scams are the daily fight:** 713 political deepfakes taken down since 2025, and repeated Bank Negara warnings about deepfakes of its governor.
5. **Banks are told humans stay accountable** for AI decisions.

The bill's text is not public yet, so details can change. But the direction is clear enough to start building for.

## 1. The AI Governance Bill: drafted, risk-based, early 2027

On 10 September, Digital Minister Gobind Singh Deo said the draft **AI Governance Bill** was complete and would go to the Cabinet, and that the government was "now setting up the structure needed to enforce the proposed law". The wider framework also includes technical standards and regulations, with AI Malaysia and a new standards centre working with bodies such as SIRIM.

On 5 October he told the Dewan Rakyat the bill would be tabled **early next year** instead of this year, and described its shape:

- **Risk-based by potential harm.** "The level of control and obligation will be assessed based on the potential harm of the AI system itself, rather than just the risk classification by industry."
- **One cross-sector framework**, "complementing existing sectoral laws".
- **Covers safety, human rights and individual welfare.**

The line most relevant to guardrail engineering: "For increasingly powerful AI systems, autonomy, and the potential to have a significant impact on humans or critical systems, safety controls, testing, monitoring, human oversight, and response mechanisms must be strengthened before their use is expanded."

## 2. The institutions: AI Malaysia and MY-AISafe

In July, the government launched **AI Malaysia Berhad**, a permanent corporation under the Ministry of Digital that takes over from the National AI Office (NAIO, set up in December 2024), together with the **National AI Action Plan 2026–2030**. The plan sets out 28 national initiatives across five pillars, one of which is "increasing digital trust".

The same launch introduced the **Malaysia AI Safety Institute (MY-AISafe)**. According to the minister, it is "specifically responsible for overseeing the governance aspects of AI, which include safety benchmarks, risk assessments, and incident reporting for necessary corrective actions."

After AI Malaysia's first board meeting in September, chair Aireen Omar said the bill and the safety institute are its priorities, and that governance should "facilitate innovation and responsible technology adoption, rather than become barriers". AI Malaysia also carries forward NAIO's existing voluntary instruments: the **AI Code of Ethics**, the **Boardroom Primer on AI Governance**, the **AI Impact Assessment for the Public Sector** and the **AI Dataset Readiness Guide**.

Existing laws already apply around AI: the **Cyber Security Act 2024**, enforced by NACSA, and the **Personal Data Protection Act 2010** for misuse of personal data.

## 3. Children and AI disclosure are already on the table

In a written parliamentary reply on 6 October, the minister said the bill will require developers of apps or chatbots **aimed at children** to build in **safety-by-design**, "including requiring regular risk impact assessments and filtering harmful content to prevent the psychological manipulation of children."

On **bot disclosure**, telling users they are talking to an AI and not a person, the approach is targeted, not blanket. It will be phased in by risk level and sector, and AI providers "would eventually have to display clear notices", particularly for **high-risk** applications. The Online Safety Act and the National Guidelines on AI Governance and Ethics back this up.

## 4. Where the harm actually shows up: deepfakes and scams

The most visible AI-safety work in Malaysia today is cleaning up after misuse:

- **713 deepfakes of political leaders** were removed by platforms between 1 January 2025 and 15 September 2026 after MCMC takedown requests, according to Communications Minister Fahmi Fadzil.
- **Bank Negara Malaysia** warned again on 14 October about scammers impersonating its governor and senior officials, and has set up a portal showing examples of deepfake content involving BNM.

## 5. Finance: humans stay accountable

In July, BNM Governor Abdul Rasheed Ghaffour said more than **70% of Malaysian financial service providers** have implemented at least one AI application. His message was that AI is a governance issue: institutions must be able to explain outcomes and challenge decisions, boards should own AI risk, and responsibility "cannot be delegated to an algorithm".

## The gap: almost no talk about technical guardrails

What I could not find in recent Malaysian coverage is the engineering layer: prompt injection, agent permissions, tool-call policy, or how well guardrails hold up in **Bahasa Melayu and code-switched text**.

That gap matters. Guardrails tuned mainly on English are a known weak spot for Malay users. Singapore has already run red-teaming in English, Mandarin, Malay and Tamil with IMDA and the AI Verify Foundation, and on 14 October signed an MOU with Anthropic covering model evaluation and incident response. MY-AISafe's benchmarks are the natural place for Malaysia to cover this; until then, teams have to test it themselves.

## What to prepare now

None of this is final law yet, but each item below maps to something the minister or regulator has already said:

- **Keep an inventory and a risk assessment per AI system.** Obligations will scale with potential harm, so know which of your systems could hurt people or critical systems. The public-sector AI Impact Assessment is a good starting template.
- **Test before you expand use.** Keep an evaluation and red-team suite for each system, including **Bahasa Melayu and code-switched prompts**, and re-run it on every model or prompt change.
- **Log and monitor what AI does**, especially agent tool calls, so you can investigate and report. Write an AI incident runbook now; incident reporting is an explicit MY-AISafe function.
- **Put a human in the loop for high-impact actions**, and make sure someone can explain and override an outcome. This is already BNM's expectation for finance.
- **Make "this is AI" disclosure a feature flag**, so you can switch it on per product and risk level when the rules arrive.
- **If minors might use your product**, design for it now: harmful-content filtering, age-appropriate defaults and regular risk reviews.
- **If your brand or executives can be impersonated**, monitor for deepfakes and publish one official verification channel, as BNM did.

## Bottom line

Malaysia is building AI guardrails from the top down: a risk-based law in early 2027, a safety institute with benchmarks and incident reporting, and active enforcement against deepfakes. The engineering side, how guardrails perform in Malay and inside AI agents, is the part nobody is talking about yet. Teams that build risk assessments, testing, logging, human oversight and disclosure now will be ready when the bill lands.

Sources:

- [Digital minister says Malaysia's draft AI Governance Bill complete, hopes to table it by Q1 2027](https://www.malaymail.com/news/malaysia/2026/09/10/digital-minister-says-malaysias-draft-ai-governance-bill-complete-hopes-to-table-it-by-q1-2027/234656) — Malay Mail, 10 Sep 2026
- [AI Governance Bill covering safety, human rights to be tabled in Dewan Rakyat early 2027](https://dayakdaily.com/ai-governance-bill-covering-safety-human-rights-to-be-tabled-in-dewan-rakyat-early-2027/) — DayakDaily (Bernama), 5 Oct 2026
- [Malaysia sets up permanent corporation and safety institute to steer national AI agenda](https://govinsider.asia/intl-en/article/malaysia-sets-up-permanent-corporation-and-safety-institute-to-steer-national-ai-agenda) — GovInsider, 29 Jul 2026
- [AI Malaysia To Prioritise Governance Bill, Safety Institute](https://www.bernama.com/en/news.php?id=2606395) — Bernama, 12 Sep 2026
- [Govt says AI chatbots aimed at children will have safety built in](https://www.freemalaysiatoday.com/category/nation/2026/10/06/govt-says-ai-chatbots-aimed-at-children-will-have-safety-built-in) — Free Malaysia Today, 6 Oct 2026
- [713 deepfakes of political leaders taken down since 2025](https://www.freemalaysiatoday.com/category/nation/2026/10/07/713-deepfakes-of-political-leaders-taken-down-since-2025) — Free Malaysia Today, 7 Oct 2026
- [Bank Negara warns of scammers impersonating governor, top officials](https://www.freemalaysiatoday.com/category/nation/2026/10/14/bank-negara-warns-of-scammers-impersonating-governor-top-officials) — Free Malaysia Today, 14 Oct 2026
- [BNM Governor Says Banks Must Keep Humans Accountable for AI Decisions](https://fintechnews.my/59532/ai/bnm-ai-banks/) — Fintech News Malaysia, 9 Jul 2026
- [Malaysia plans to tighten regulation of AI tech](https://www.straitstimes.com/asia/se-asia/malaysia-plans-to-tighten-regulation-of-ai-tech) — The Straits Times, 30 Sep 2026
- [Anthropic opens Singapore office and signs MOU with the Government of Singapore](https://www.anthropic.com/news/singapore-office-opening) — Anthropic, 14 Oct 2026
