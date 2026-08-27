---
title: "CSA's 2026 Top Threats: Identity Beats Infrastructure, AI Shows Up Twice"
description: 'Cloud Security Alliance ranks inadequate IAM — driven by non-human identity sprawl — as the #1 cloud threat for 2026, with two AI-related risks debuting on the list. What actually changed, and what it means for cloud teams.'
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

## The Ranking Just Flipped

Every year, the Cloud Security Alliance polls its Top Threats Working Group and a few hundred industry practitioners, and ranks what's actually worrying cloud security people — not what vendors want to sell them. The **Top Threats to Cloud Computing Survey Report 2026**, published 13 August 2026, just reordered the list in a way worth stopping for.

**Inadequate Identity and Access Management is now #1.** It was #2 in the 2024 report. The threat that held #1 in 2024 — Misconfiguration and Inadequate Change Control — dropped to #5. And for the first time, two AI-related threats made the list at all.

This isn't a reshuffle of ten similar items. It's CSA saying, in effect: _the thing most likely to hurt you in 2026 isn't a misconfigured S3 bucket. It's who — or what — is allowed to log in._

## Why Identity Won

CSA's own framing is direct: "The rapid growth of non-human identities, machine-to-machine interactions, and autonomous decision-making has now surpassed what traditional management and oversight processes were designed to handle."

Read that again without the corporate phrasing: **most IAM programs were built to manage humans with passwords, and now most of the identities in a cloud environment aren't human.** Service accounts, CI/CD pipeline credentials, API keys, workload identities, and — increasingly — autonomous AI agents acting on a schedule or in response to events. None of them take a lunch break, none of them get suspicious about an unfamiliar login prompt, and most of them were provisioned once and never revisited.

That's not a hypothetical. It's the same root cause behind the identity-first attacks already covered on this site — [Snowflake, MGM, and Scattered Spider](/en/posts/gt-01-identity-perimeter/) didn't need an exploit. They needed a valid credential. CSA's 2026 data says the industry now agrees that's the biggest exposure, not an edge case.

## AI Enters the List — Twice

Two new entries appear in the 2026 ranking, both AI-related, both new:

- **AI-Enhanced Attacks (#2)** — AI used to improve or automate attacks themselves: faster reconnaissance, more convincing phishing, adaptive malware.
- **AI System Compromise (#6)** — AI systems treated as assets in their own right, which can be compromised, manipulated, or abused — think poisoned training data, prompt injection against agentic pipelines, or a hijacked inference endpoint.

Vic Hargrave, co-chair of CSA's Top Threats Working Group, put it plainly: "AI is not an emerging cloud security concern. It is already changing both how attacks are carried out and what organizations have to protect." Two threats on an 11-item list is a small number, but it's the first time AI has appeared in this survey at all — and it entered swinging, taking the #2 slot outright.

## What Actually Got Pushed Down — and What Got Cut Entirely

It's worth being precise here, because two different things happened to "traditional infrastructure" concerns, and they're easy to conflate:

1. **Misconfiguration and Inadequate Change Control** — 2024's #1 threat — didn't disappear. It fell to **#5**. Still a real, ranked concern, just no longer the top one.
2. A separate category covering **cloud infrastructure and cloud service provider risk**, which existed on the 2024 list, scored low enough in 2026 that CSA **dropped it from the list entirely**.

Different mechanisms, same direction: the industry's attention moved from "is the platform itself risky" toward "who has access to it, and is that access being watched."

## The Full 2026 List

| #   | Threat                                         |
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

The methodology behind it: a two-stage process, starting with an in-person survey of the Top Threats Working Group, followed by a poll of 500+ industry practitioners rating 23 candidate issues on a 10-point scale. It's a perception survey of practitioners, not a breach-frequency dataset — worth keeping in mind when reading the ranking as "what's most dangerous" versus "what's most top-of-mind."

## What This Means If You're Building Cloud in Malaysia

CSA's report doesn't mention Malaysia specifically — this part is analysis, not something the report says. But the underlying pressure applies directly here: Malaysian cloud estates (banks and GLICs under Bank Negara's RMiT expectations, and the broader government cloud-first push) are accumulating non-human identities — CI/CD service accounts, API integrations, and now AI agents — faster than most teams are auditing them.

Two concrete things worth doing before this shows up as an incident instead of a survey ranking:

- **Inventory non-human identities the same way you'd inventory human accounts.** Service accounts and API keys that were provisioned once, granted broad scope "to be safe," and never rotated are exactly the gap CSA is describing.
- **Put AI agents and pipelines inside your existing IAM and logging model — don't treat them as a special case.** If an AI agent can call an API or trigger a deploy, it needs the same least-privilege and audit trail as a human with those same permissions.

## Bottom Line

The headline isn't "AI is scary" or "identity is hard" — both were already true. The headline is that CSA's own practitioner survey now ranks identity, specifically non-human identity, above the infrastructure and configuration issues that dominated the conversation for years. If your 2026 cloud security roadmap still leads with misconfiguration scanning and hasn't got a line item for machine identity lifecycle management, this report is a good reason to reorder it.

Sources:

- [AI Emerges as an Attack Enabler and Target in Cloud Security Alliance's 2026 Top Threats Report](https://cloudsecurityalliance.org/articles/ai-emerges-as-an-attack-enabler-and-target-in-csa-2026-top-threats-report) — Cloud Security Alliance
- [Top Threats to Cloud Computing Survey Report 2026](https://cloudsecurityalliance.org/artifacts/top-threats-to-cloud-computing-2026) — Cloud Security Alliance
- [Top Threats to Cloud Computing 2024](https://cloudsecurityalliance.org/artifacts/top-threats-to-cloud-computing-2024) — Cloud Security Alliance (baseline comparison)
- [Identity, AI Lead CSA's 2026 Cloud Threat List](https://virtualizationreview.com/articles/2026/08/24/identity-ai-lead-csas-2026-cloud-threat-list.aspx) — Virtualization Review
