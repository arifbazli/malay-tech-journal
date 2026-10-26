---
title: 'AI guardrails in October 2026: attackers route around them, defences move outward'
description: 'CrowdStrike, Anthropic, new research and a White House accord agree: guardrails inside the model are not the security boundary. What changed, and what to do.'
pubDate: 2026-10-26
tags:
  - ai
  - security
  - guardrail
  - malaysia
categories: ['AI Guardrail Engineering']
postType: field-note
toc: true
translationKey: 'age-05-guardrails-october-2026'
draft: false
---

> Field notes on a busy month for AI guardrails: what attackers did, what the research showed, what vendors and governments changed, and what it means for teams building on LLMs and agents.

## The short version

Four things happened between late September and late October 2026, and they tell one story:

1. **Attackers are routing around model guardrails in real campaigns**, including against government targets in Southeast Asia.
2. **Per-request safety classifiers have a structural blind spot.** Every request can be classified correctly and the harmful result is still produced.
3. **Small "decision models" used as agent guardrails fail open far more easily than their accuracy suggests.**
4. **Vendors and governments are treating guardrails as access control and governance**, not as a single filter: tiered access for verified defenders, and a voluntary US industry accord built on audits.

Taken together: a guardrail that lives only inside the model, or only in front of it as a per-message filter, cannot be your security boundary. The control has to sit in the system around the model: identity, permissions, deterministic policy on actions, and monitoring across whole sessions.

## 1. Real attackers are routing around guardrails

On 21 October, CrowdStrike's Counter Adversary Operations team published research into four previously unreported threat actors who left their offensive AI agent frameworks exposed in open directories. Between May and August 2026, all four ran **agentic campaigns**, where AI agents made decisions and executed commands, mostly using versions of Anthropic's Claude and open-weight DeepSeek models.

What matters for guardrail engineering:

- **Model routing to exploit uneven guardrails.** CrowdStrike's Adam Meyers told WIRED that "the models don't all have equivalent guardrails and protections, even from one company". The attackers switched between models, often older ones, for cost and to find the weakest safeguards.
- **Faking authorization.** All four groups convinced models that the activity was a legitimate, authorized penetration test. One method seen across groups was to **put files in the agent's working directory claiming the tasks were approved**.
- **Patching the agent itself.** The Chinese-speaking actor used a runtime patch tool, ClawGod, on top of Claude Code to try to remove the `CYBER_RISK_INSTRUCTION` from its system prompt, the instruction that limits it to authorized security testing.
- **Low skill was enough.** The least sophisticated actor, Indonesian-speaking, used 819 mostly public GitHub "skills" with no extra orchestration. It still had to intervene periodically to push the model past its guardrails, yet it **compromised several Indonesian government domains**, a government domain of another country, and private-sector targets.

The guardrails did slow the weaker actor down, but they didn't stop it. CrowdStrike assesses with moderate confidence that agentic AI "commoditizes baseline offensive cyber operations". Meyers also noted that the attacks used no novel exploits: they targeted basic security hygiene gaps, "things that were preventable but weren't prevented."

## 2. Per-request classifiers: correct on every request, wrong about the outcome

On 6 October, CrowdStrike's Cyber Superintelligence Lab published an evaluation of what it called the most advanced publicly deployed content-safety classifier, the second model that screens every request before a frontier model answers.

The headline numbers point in opposite directions, and both matter:

- Against **about 515 direct bypass techniques** (encodings, multi-turn escalation, many-shot, Unicode and tokenizer tricks, and more), the classifier held: **0% direct bypass rate**.
- But a **decompose → benign reframe → recompose** pipeline produced working offensive code in **9 of 10** MITRE ATT&CK-aligned categories. Each sub-request was genuinely benign; an unclassified local model assembled the pieces. Reframing exploit questions as detection engineering ("write Sigma rules for CVE-X") was one of the vehicles.

In CrowdStrike's words: "The classifier correctly evaluates every request it sees. There is no misclassification. The harm is emergent in the composition, and composition happens outside the classifier's observation boundary." Microsoft Research reached the same conclusion independently in September with its "Capability Laundering" paper: per-exchange filtering is structurally insufficient.

The one category that resisted was EDR evasion. There, the classifier blocked the underlying _concept_ regardless of wording.

The recommended fix is not a stricter classifier. It is to **extend the threat model from single requests to request sequences, cross-model composition and cross-provider use**. That also means accepting that a single provider cannot see an attacker who spreads queries across providers and keys.

## 3. Small guard models fail open more than their accuracy suggests

A popular agent-security pattern puts a small "typed decision model" in front of tool calls: it reads the proposed action and picks _allow_ or _block_ from caller-defined options. A paper posted on arXiv on 8 October (Azizi, Baghaei Potraghloo, Pedram, _One Word Opens the Gate_) tested seven open-weight models in exactly that role:

- Allow-or-block accuracy ranged from **36% to 72%**, against a 50% chance level.
- **Six lines of unrelated server-log text** raised one gate's fail-open rate from **0% to 63%** on a policy it otherwise got right.
- Renaming the permissive option to something misleading, without changing its definition or the judged text, drove fail-open rates to **93–100%** on four models.
- A **deterministic rule over typed values scored 100%** on all six policies.

The authors' conclusion is worth copying into your design docs: these models "can reduce how many cases reach a reviewer, but on this evidence they should not be the component that decides."

## 4. Guardrails are becoming access tiers

On 6 October, Anthropic expanded its **Cyber Verification Program** into three access tiers. Generally available models keep "conservative cyber safeguards that block most cyber work". Verified organizations can apply for reduced blocking:

- **Defense Access** for SOC, incident response, malware reverse-engineering and vulnerability validation, open to company and government security teams, critical-infrastructure operators "of any size", open-source maintainers and researchers.
- **Red Team Access** adds authorized penetration testing. Real-time blocks still apply to actions that could cause physical harm or mass disruption, such as deploying ransomware.

This is a different model of a guardrail: **who you are, verified, decides what the model will do for you**. Combined with section 1, it explains why attackers fake authorization: when the guardrail asks "is this authorized?", an attacker's job becomes producing convincing evidence that it is.

## 5. Governance: a voluntary accord, and a push for global coordination

On 29 September, US President Donald Trump and the heads of Anthropic, OpenAI, Google, Meta, xAI and Nvidia signed a one-page **Joint Commitment on Frontier Responsibilities**. It describes four layers of controls and audits:

1. Robust internal controls and monitoring.
2. An empowered internal team to make sure those controls work and issues get fixed.
3. An independent external auditor or evaluator.
4. An independent board committee that oversees the teams and auditors.

It is **voluntary**. As a Council on Foreign Relations analysis points out, the text says companies "should" implement the controls; "will" appears only in the promise to meet regularly on standards. The accord does not say who the external evaluators would be. Al Jazeera reported that the week before, twenty countries and the European Union had called for global coordination to keep AI under human control.

Closer to home, on 14 October Anthropic signed an MOU with Singapore's Ministry of Digital Development and Information covering AI safety, security, model evaluation, testing standards and incident response. It builds on earlier work with IMDA and the AI Verify Foundation, which included a red-teaming project in **English, Mandarin, Malay and Tamil**. Multilingual red-teaming matters here: guardrails tuned mainly on English are a known weak spot for Bahasa Melayu users.

## What this means for teams in Malaysia

None of this argues for dropping guardrails. It argues for **not trusting them as the boundary**:

- **Put the decision outside the model.** Enforce what an agent may do with deterministic policy on typed tool-call fields, such as allowed hosts, paths, verbs and amounts. Use model-based guards to triage and flag, not to approve.
- **Scope agent identity like any non-human identity.** Least-privilege credentials, short-lived tokens, separate identities per agent. The attacks above succeeded on hygiene gaps, not zero-days.
- **Treat everything in the agent's context as untrusted input**, including files in its working directory and log lines. Both were used in the attacks and the study above to flip decisions.
- **Monitor sessions, not just messages.** Correlate tool calls and requests across a whole task. A sequence can be harmful when no single message is.
- **Test guardrails in Bahasa Melayu and code-switched text**, not only English, before you rely on them for Malaysian users.
- **If you do defensive security work with frontier models**, look at vendor verification programs instead of fighting blanket blocks, and expect attackers to imitate the same authorization signals.

## Bottom line

October 2026's evidence lines up: guardrails reduce misuse, but attackers route around them by switching models, faking authorization, splitting tasks and poisoning a guard's input. The industry's response is to move guardrails outward, into identity, access tiers, audits and system-level policy. Build the same way.

Sources:

- [CrowdStrike Uncovers New Agentic AI Campaigns](https://www.crowdstrike.com/en-us/blog/crowdstrike-uncovers-new-agentic-ai-campaigns/) — CrowdStrike, 21 Oct 2026
- [AI Guardrails Aren't Stopping Criminal Hackers](https://www.wired.com/story/ai-guardrails-arent-stopping-criminal-hackers/) — WIRED, 21 Oct 2026
- [Request, Aggregate, Bypass: How Attackers Can Evade LLM Safety Classifiers](https://www.crowdstrike.com/en-us/blog/how-attackers-can-bypass-llm-safety-classifiers/) — CrowdStrike, 6 Oct 2026
- [One Word Opens the Gate: The Option-Channel Attack on Typed Decision Models as Agent Guardrails](https://arxiv.org/abs/2610.12292) — arXiv, 8 Oct 2026
- [Expanding the Cyber Verification Program](https://www.anthropic.com/news/cyber-verification-program) — Anthropic, 6 Oct 2026
- [Trump, tech bosses sign voluntary pact pledging 'robust' AI safeguards](https://www.aljazeera.com/news/2026/9/29/trump-top-tech-firms-sign-accord-to-self-police-ai-development) — Al Jazeera, 29 Sep 2026
- [Trump's AI Safety Pact Is Toothless. But There Is a Path Forward.](https://www.cfr.org/articles/trumps-ai-safety-pact-is-toothless-but-there-is-a-path-forward) — Council on Foreign Relations, 1 Oct 2026
- [Anthropic opens Singapore office and signs MOU with the Government of Singapore](https://www.anthropic.com/news/singapore-office-opening) — Anthropic, 14 Oct 2026
