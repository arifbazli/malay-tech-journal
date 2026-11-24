---
title: "Malaysia's AI month in Parliament: a stalled probe, chip curbs and a sovereign cloud"
description: "MCMC is still waiting on Anthropic, US chip rules hit Malaysia's data centres, and a US-backed sovereign AI cloud is planned. What happened and what it means."
pubDate: 2026-11-24
tags:
  - ai
  - security
  - cloud
  - malaysia
categories: ['Ground Truth']
postType: field-note
toc: true
translationKey: 'gt-08-malaysia-ai-government-november-2026'
draft: true
---

> Field notes on a busy month for AI policy in Malaysia, checked against what ministers actually said in Parliament and in official statements.

## The short version

Four threads ran through Malaysian AI policy in November 2026:

1. **The AI influence probe has stalled.** MCMC is still waiting for Anthropic to answer questions about an AI-assisted operation that targeted Malaysian voters. The deputy minister called the wait a "challenge".
2. **US chip rules now reach Malaysian data centres.** A new US rule requires licences for advanced AI chips shipped to Malaysia and four other countries, and gives data centres serving China-headquartered customers until about mid-February to get one.
3. **A sovereign AI cloud, with US support.** Malaysia and the US will cooperate on the government's sovereign AI cloud, with Washington offering US$50 million, while Malaysia keeps control of design and data.
4. **The AI Governance Bill is still on track for early 2027,** with an enforcement framework and safety institute being prepared in parallel.

Together they show the same gap from two sides: Malaysia is building AI governance at home, but much of the evidence, hardware and leverage sits with foreign companies and governments.

## 1. The Anthropic case: an investigation waiting on a foreign company

**What was reported.** On 10 September, Anthropic published a threat intelligence report describing how it disrupted a commercial "influence-as-a-service" operation that used its Claude models against Malaysian voters. According to the report, as summarised by local media, the operation:

- ran about **1,000 fake X accounts**, a YouTube channel and a fabricated news site called **"Malaysia Pulse"**;
- used census and electoral data to target all **222 parliamentary constituencies**, around race, religion and royalty;
- produced dossiers with false allegations against an opposition politician and civil society groups;
- logged a request for **one million artificial views** on the sitting Prime Minister's account.

Anthropic linked the platform to an Istanbul-based firm, BBS Bilisim Teknolojileri, which has denied involvement. Anthropic also said the engagement figures were self-reported by the operators and could not be verified, and that it found no evidence the campaign gained significant traction.

**What the government said in November.** In a written parliamentary reply on 17 November, the Communications Ministry said MCMC was seeking further details from Anthropic and would coordinate with enforcement agencies and AI platforms under the **Communications and Multimedia Act 1998** and the **Online Safety Act 2025**. On 23 November, Deputy Communications Minister Teo Nie Ching told the Dewan Rakyat there had been no further progress because Anthropic had not responded, calling it a "challenge" for the regulator, and invited MPs with evidence to submit it.

**What it shows.** The best evidence about this operation is inside a US company's systems: account records, prompts and the links between the operators and their tools. Malaysian law gives MCMC powers over content and platforms in Malaysia, but no direct route to that evidence. That is a structural problem, not a one-off: the next operation may use a different model provider, in a different country.

## 2. US chip curbs reach Malaysian data centres

On 16 November, the US Commerce Department's Bureau of Industry and Security issued an interim final rule naming **Malaysia, Singapore, Thailand, Indonesia and Brazil** as destinations that need licences for covered shipments of advanced semiconductors, citing a higher-than-normal risk of diversion.

The target is remote access. Companies that cannot buy restricted chips directly can rent the computing power from data centres abroad. Under the rule, which took effect on 19 November, data centres that provide large amounts of computing power to companies headquartered in China have **90 days, until around mid-February**, to obtain a US licence. US cloud providers bringing chips in for their own operations may qualify for an exception if they meet reporting requirements.

Malaysia's response so far:

- **Disclosure rules are coming.** Investment, Trade and Industry Minister Johari Abdul Ghani said Malaysia will require data centres to disclose information including electricity use and the number of GPUs they import, and that the disclosure will cover only GPUs subject to US export controls.
- **The data is not there yet.** The ministry does not have details of operators' China-based customers; many operators are bound by confidentiality agreements.
- **Clarification is still pending.** No official notice has been issued while Malaysia seeks clarification from Washington, although the US rule already applies.
- **A Digital Infrastructure (Data Center) Bill** is expected next year, on top of existing controls under the **Strategic Trade Act 2010**.

## 3. A sovereign AI cloud, with US money and Malaysian control

On 18 November, Prime Minister Anwar Ibrahim and President Trump announced cooperation on Malaysia's **sovereign AI cloud**, with Washington offering **US$50 million** in support and possible participation by US technology firms. The project was first funded with **RM2 billion** in Budget 2026, to keep classified information and personal data from being exposed to foreign laws.

MCMC's statement set the conditions: Malaysia decides the design, procurement and operating arrangements; the infrastructure and the data it hosts stay in Malaysia, under Malaysian law and in Malaysia's "possession, custody and control"; and any US company takes part only through Malaysia's laws, procurement process and security requirements.

The tension is obvious. The same week the US tightened access to advanced chips for Malaysian data centres, it offered to help fund a Malaysian government cloud that will likely need those chips. Sovereignty over data does not automatically mean sovereignty over the hardware and software stack underneath it.

## 4. The AI Governance Bill: still early 2027

On 17 November, Deputy Digital Minister Datuk Wilson Ugak Kumbong confirmed that the risk-based **AI Governance Bill** will be tabled early next year and will complement existing sectoral laws. Preparations are running in parallel:

- **AI Malaysia Bhd** is building the enforcement framework;
- the **Malaysia AI Safety Institute** will focus on safety benchmarking, risk assessment and incident reporting;
- **MY-AI Standards** are being developed with SIRIM.

His summary of the approach: "Priority will always be given to safety, and for powerful, autonomous systems that means testing, monitoring and human oversight before use is expanded." I covered the bill's design in more depth in [an October note](/en/posts/age-06-malaysia-ai-guardrails-2027/).

The Anthropic case is a useful test for it. Incident reporting and cooperation duties for AI providers would be exactly the tools MCMC lacks today, but only if they can reach providers based outside Malaysia.

## What engineers should take from this

- **Know where your GPUs and your customers are.** If you run or rent AI compute in Malaysia, expect to disclose GPU counts and power use, and to know who ultimately controls your customers.
- **Design for data residency from the start.** Public-sector and regulated workloads are moving toward in-country hosting under Malaysian law; keep data location, keys and admin access configurable per tenant.
- **Keep evidence you can hand over.** For any AI feature that generates public content, log prompts, outputs and account links in a form you can share with a regulator quickly and lawfully.
- **Monitor for influence operations, not only attacks.** Platforms and media organisations need detection for coordinated fake accounts and synthetic news sites, including in Malay.
- **Prepare for the bill now.** An AI inventory, risk assessments and an incident runbook will be needed whatever the final text says.

## Bottom line

November showed Malaysia acting on AI on several fronts at once: questioning a US AI company in Parliament, absorbing US chip rules, signing up for US support on a sovereign cloud and preparing its own AI law. The common thread is dependency. The evidence, the chips and much of the technology sit outside Malaysia, so the success of the coming law will depend on whether it can reach them.

Sources:

- [No progress in AI political influence probe as MCMC awaits Anthropic response](https://www.malaysiakini.com/news/889690-no-progress-in-ai-political-influence-probe-as-mcmc-awaits-anthropic-response) — Malaysiakini, 23 Nov 2026
- [MCMC seeks details from Anthropic on alleged AI-powered political manipulation targeting Malaysians](https://www.klsescreener.com/v2/news/view/1829643/mcmc-seeks-details-from-anthropic-on-alleged-ai-powered-political-manipulation-targeting-malaysians) — The Edge via KLSE Screener, 17 Nov 2026
- [AI Platform Targeted Malaysian Voters With 1,000 Fake X Accounts, Says Anthropic](https://www.therakyatpost.com/news/2026/09/11/ai-platform-targeted-malaysian-voters-with-1000-fake-x-accounts-says-anthropic/) — The Rakyat Post, 11 Sep 2026
- [Singapore, Malaysia among five hit by tighter US chip curbs](https://www.klsescreener.com/v2/news/view/1828905/singapore-malaysia-among-five-hit-by-tighter-us-chip-curbs) — The Star via KLSE Screener, 17 Nov 2026
- [Not all Malaysian data centers face new US chip curb, Minister says](https://www.thejakartapost.com/business/2026/11/24/not-all-malaysian-data-centers-face-new-us-chip-curb-minister-says) — The Jakarta Post (The Star/ANN), 24 Nov 2026
- [US, Malaysia to strengthen sovereign AI cloud development](https://www.thestar.com.my/business/business-news/2026/11/19/us-malaysia-to-strengthen-sovereign-ai-cloud-development) — The Star (Bloomberg), 19 Nov 2026
- [AI Governance Bill To Supplement Existing Sectoral Laws -- Ministry of Digital](https://www.bernama.com/en/region/news.php?id=2635804) — Bernama, 17 Nov 2026
