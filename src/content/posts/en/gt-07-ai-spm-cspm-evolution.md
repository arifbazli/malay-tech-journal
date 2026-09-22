---
title: "AI-SPM Isn't a New Category — It's CSPM Learning to See AI Workloads"
description: 'Orca and Microsoft both ship AI-SPM as an extension of their existing CSPM platform, not a standalone product — except for one 2026 licensing change that cuts the other way. What AI-SPM actually covers, and where the real boundary sits.'
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
draft: false
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: 'Ground truth essay — AI-SPM as an extension of CSPM'
---

## AI-SPM Sounds Like a New Market — Mostly, It Isn't

"AI Security Posture Management" reads like a new product category — a companion acronym to CSPM, ASPM, and every other -SPM that's shown up in the last few years. Check what's actually shipping in 2026 and the picture is less exciting, and more useful: **AI-SPM is CSPM extending its existing scanning and policy engine to recognize AI-specific resources.** Not a new market. A new resource type inside the market you already have.

Two vendors confirm this directly. Orca Security's AI-SPM reuses its existing agentless "SideScanning" technology — the same engine that already scans cloud resources — now extended to cover "50+ AI models and software packages." Microsoft ships AI security posture as a capability _inside_ the Defender CSPM plan, not a separate product: "The Defender Cloud Security Posture Management (CSPM) plan in Microsoft Defender for Cloud... secures generative AI applications and AI agents throughout their entire lifecycle."

## What AI-SPM Actually Adds

Strip away the branding and both vendors are doing the same category of thing CSPM has always done — inventory resources, evaluate them against policy, flag misconfigurations — just pointed at AI-specific resource types that plain CSPM never looked at:

- **Shadow AI discovery.** Orca's own framing: "security teams don't know which AI models are in use and aren't able to discover shadow AI." This is the AI-era version of the unmanaged-S3-bucket problem — an AI model or endpoint nobody on the security team knew existed.
- **Model and credential exposure.** Exposed API keys or a publicly reachable model endpoint "can cause model theft" per Orca; the equivalent of an open storage bucket, but for a trained model instead of a data blob.
- **Training-data exposure.** Sensitive data accidentally folded into training data "can cause AI models to expose sensitive data and PII" — a new failure mode CSPM's traditional data-classification checks weren't built to catch.
- **An AI Bill of Materials.** Microsoft's Defender CSPM builds an inventory of AI-related code, data, and artifacts "from code to cloud" — SBOM's concept, applied to models and datasets instead of software packages.
- **AI-specific IaC checks and attack paths.** Concrete examples from Microsoft's own docs: "Use Azure AI Service Private Endpoints," "Use Managed Identity for Azure AI Service Accounts" — plus attack-path analysis extended to cover model grounding and fine-tuning data exposure.

And critically: Microsoft's AI-SPM coverage isn't Azure-only. It explicitly covers Azure OpenAI Service and Azure AI Foundry, but also Azure ML, **Amazon Bedrock, and Google Vertex AI**. A CSPM vendor's AI posture module inventorying a competitor's AI service is a pretty clean signal that this is genuinely about "wherever your AI workloads run," not a walled-garden upsell.

## Two Vendors, Two Emphases — Same Underlying Idea

Orca's public messaging leans on _discovery_: what AI do we even have running. Microsoft's leans on _lifecycle and remediation_: here's the specific IaC fix and the specific attack path. Neither framing is "more correct" — they're the same posture-management pattern (inventory → evaluate → prioritize → fix) with different marketing emphasis. Worth knowing if you're evaluating either: you're not comparing two different product categories, you're comparing two vendors' UX on the same underlying capability.

## The One Genuine New Boundary: Agent-Level Posture Just Got Carved Out

Here's the part actually worth an action item, not just a mental model update. Straight from Microsoft's own documentation, dated to the month:

> "Effective July 1, 2026, AI agent discovery and security posture for Microsoft Foundry agents and third-party cloud agents require a Microsoft Agent 365 license. These capabilities were previously available through the Defender CSPM plan... but agent-level capabilities now require Agent 365."

Read that carefully: _workload_-level AI-SPM (the model/data/endpoint coverage above) stays inside Defender CSPM. _Agent_-level posture — discovery and security for autonomous AI agents specifically — got split into a new, separately licensed product. So the trend line isn't uniformly "AI capabilities keep getting absorbed into CSPM." It's more precise than that: static/workload AI security is being absorbed into CSPM, while the newest, most cutting-edge layer — agentic AI — is being spun into its own monetized tier instead.

If your organization runs Defender CSPM and has any Foundry or third-party AI agents in scope, your coverage for those agents specifically narrowed on **2026-07-01** unless Agent 365 was also licensed. That's not a trend to note — that's a licensing audit to run this quarter.

## Where This Connects to the CSA's 2026 Threat Ranking

[CSA's _Top Threats to Cloud Computing Survey Report 2026_](/en/posts/gt-06-csa-top-threats-2026/) ranks Inadequate IAM as the #1 cloud threat — driven explicitly by non-human identity growth — and introduces two AI-specific threats for the first time: AI-Enhanced Attacks (#2) and AI System Compromise (#6). The report itself never uses the term "AI-SPM." It doesn't need to. It's describing the exact threat surface — unmanaged AI identities, compromised AI systems, exposed models — that AI-SPM tooling is built to reduce. The product category and the threat ranking are two views of the same shift: AI workloads are now numerous and exposed enough to need the same posture discipline cloud infrastructure got a decade ago.

## What This Means for Teams in Malaysia

Two concrete things, not a general "watch this space":

- **Don't shop for "AI-SPM" as a brand-new tool line item.** Check whether your existing CSPM vendor already ships this as a module first — per the evidence here, that's the more common shipping pattern (Orca and Microsoft both did it this way), not a separate procurement category. Vendor sprawl is exactly the problem the [ASPM consolidation trend](/en/posts/cse-04-aspm-appsec-consolidation/) is trying to solve on the application-security side; don't recreate it on the AI side by buying a fourth posture tool when your third one already covers it.
- **If you're on Microsoft, check your Agent 365 licensing now**, not when an agent-related incident forces the question. Workload coverage and agent coverage are no longer the same line item.

## Bottom Line

AI-SPM isn't a new market to research from scratch — it's CSPM's existing inventory-evaluate-prioritize pattern, pointed at AI models, training data, and endpoints instead of just VMs and storage buckets. The one place a genuinely new boundary is forming is agentic AI, which at least one major vendor is now treating as a separate, separately-priced problem. Know which side of that line your posture tooling actually covers.

Sources:

- [AI Security Posture Management](https://orca.security/platform/ai-security-posture-management/) — Orca Security
- [Overview - AI security posture management - Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/ai-security-posture) — Microsoft Learn
- [AI Emerges as an Attack Enabler and Target in Cloud Security Alliance's 2026 Top Threats Report](https://cloudsecurityalliance.org/articles/ai-emerges-as-an-attack-enabler-and-target-in-csa-2026-top-threats-report) — Cloud Security Alliance
