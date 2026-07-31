---
title: "Identity Is the New Perimeter — Lessons from Snowflake, MGM and Scattered Spider"
description: "In 2024, UNC5537 stole data from 165 Snowflake customers without exploiting a single vulnerability. In 2023, Scattered Spider paralysed MGM in a 10-minute phone call. This is not a technical attack story — it is the new era where identity is the only perimeter left."
pubDate: 2026-07-10
tags:
  - cloud
  - security
  - iam
categories: ['Ground Truth']
postType: essay
toc: true
translationKey: "gt-01-identity-perimeter"
heroImage: /images/covers/webp/cover-tech-essay.webp
heroImageAlt: "Ground truth essay — identity is the new perimeter"

---

## Introduction: When the Firewall Stopped Mattering

There is a question I always ask when onboarding new engineers to a cloud security project:

> "If an attacker already has valid credentials, what do we have to stop them?"

The usual answer: *"We have MFA."*

And I ask: *"What kind? TOTP? SMS? Hardware key? Can it be bypassed? Is there session hijacking? Those stolen credentials — were they from an employee laptop, a CI/CD pipeline, or a third-party contractor who used their work laptop to stream Netflix?"*

Usually silence.

This is the reality of cloud security in 2024-2026: **attackers have stopped hacking systems. They log in.**

---

## The Snowflake Breach 2024: The Biggest Attack That Used No Exploits

Between April and July 2024, a threat actor tracked by Mandiant as **UNC5537** ran the largest cloud data exfiltration operation in history. Targets: Snowflake customers — the data warehouse platform used by over 9,000 companies worldwide.

Scale: **165 organisations** hit. AT&T, Ticketmaster, Santander Bank, LendingTree — all in a single campaign.

The most important thing to understand: **Snowflake itself was not hacked.** No CVE. No zero-day. No vulnerability in the Snowflake platform.

What happened was this:

1. Infostealer malware (Vidar, Raccoon, Redline, Lumma) had infected millions of laptops for years — including contractor, developer, and remote worker machines
2. The malware stole credentials stored in browsers and applications
3. Those credentials were sold in dark web markets
4. UNC5537 bought or aggregated those credentials and logged into Snowflake customer accounts
5. The targeted accounts had **no MFA enabled** and **no network policy restricting access**
6. Data was exfiltrated, customers were extorted

Push Security, which analysed this campaign in depth, described it as a **"watershed moment"** — concrete proof we have entered an era where identity is the primary target.

### Why This Matters for Engineers in Malaysia

If your company uses Snowflake, or any other SaaS platform, the questions you need to answer right now:

- How many accounts with production data access have **no MFA**?
- How many contractors or third-party vendors have access to your systems?
- Credentials in your CI/CD pipelines — how are they stored? Who can access those secrets?
- Are you monitoring for impossible travel? Login anomalies from unusual geographies?

These are not compliance questions. They are survival questions.

---

## The MGM Breach 2023: 10-Minute Phone Call, 10-Day Crisis

September 2023. Scattered Spider (also tracked as UNC3944) called MGM Resorts IT helpdesk.

In **10 minutes**, they social engineered access to MGM's Okta identity platform. From there, they laterally moved across MGM's entire infrastructure — hotel systems, slot machines, room keys, reservations.

**Impact:** 10-day outage. Estimated loss: over **$100 million**. MGM disclosed the incident in SEC filings.

The technique Scattered Spider used was not technical sophistication — it was **vishing** (voice phishing) enabled by:
- LinkedIn data to identify IT staff names and org structure
- Caller ID spoofing
- A social engineering script that convinced helpdesk to reset MFA

The most shocking part: Scattered Spider is not a nation-state APT. They are a **group of hackers aged 17-22**, mostly from the US and UK, communicating over Telegram and Discord.

By 2025, the same group rebranded as "Scattered Lapsus$ Hunters" and attacked Marks & Spencer, Co-op UK, Jaguar Land Rover, and hundreds of Salesforce customers.

### Lessons for Cloud Security Engineers

**Helpdesk is an attack surface.** Identity reset flows are an attack surface. Every process that can "unblock" someone from authentication is an attack surface.

Questions to check now:
- What verification is required to reset MFA in your org?
- How deeply trained are your helpdesk staff on vishing?
- In Okta, Azure AD, or whatever IdP you use — is there anomaly detection for admin actions?

---

## Identity-First Security: Not a Buzzword, It's Mathematics

Why do attackers focus on identity? Because the **risk/reward calculation** has shifted.

| Attack Vector | Effort | Detection Risk | Payoff |
|---|---|---|---|
| Exploit zero-day | Very high | High | High but hard to find |
| Phish credentials | Low | Low | High, scalable |
| Buy stolen creds | Very low | Very low | High, immediate |
| Social engineer helpdesk | Low-medium | Low | Full access |

From an attacker's perspective, why spend months reverse-engineering a vulnerability when you can buy credentials for $50 on the dark web and log in like a legitimate employee?

The CSA Top Threats to Cloud Computing 2025 categorises this as **"Inadequate Identity, Credential, Access, and Key Management"** — number one on their list for consecutive years.

---

## What Has Changed in Defence

The industry is slowly moving from a **"trust but verify"** model to **"never trust, always verify"** — Zero Trust Architecture.

But Zero Trust is not a product. It is a posture. And posture requires:

**1. Actually strong MFA**
- Hardware keys (FIDO2/WebAuthn) for privileged accounts
- TOTP as a minimum, not SMS (SIM swapping is a real threat)
- Phishing-resistant MFA — passkeys, Yubikey

**2. Least-privilege enforced seriously**
- IAM policy reviews every quarter, not once a year
- Just-in-time access for privileged operations
- No standing admin access for human users

**3. Session monitoring and anomaly detection**
- Impossible travel detection
- New device alerts
- Unusual data access patterns

**4. Third-party and contractor hygiene**
- Vendor access reviews every 90 days
- Separate identity domains for contractors
- No shared credentials between contractors

**5. Helpdesk hardening**
- Multi-step identity verification before credential reset
- Specific training on social engineering recognition
- Approval workflow for high-risk identity operations

---

## Malaysian Context: What Is Relevant Here

BNM's revised RMiT (November 2025) applies specific pressure on **identity and access management** for Malaysian financial institutions. "S" (Standard) requirements — which carry legal force — include:

- Strong authentication for critical systems
- Documented privileged access management
- Monitoring for anomalous access

This is not a compliance checkbox. It is the minimum viable baseline.

For non-BFSI companies, the same questions still apply. Cloud adoption in Malaysia is accelerating — but security maturity is not keeping pace.

---

## Conclusion

Snowflake was not hacked. MGM was not compromised through a technical exploit. Both were attacked through **identity** — stolen credentials, a tricked helpdesk, unenforced MFA.

If you still have production systems that rely on username + password alone, no MFA, no anomaly detection, no third-party access reviews — that is not a security posture. That is hope.

And in this era, hope is not a strategy.

---

*Sources: Mandiant UNC5537 analysis, Push Security Snowflake retrospective 2025, CSA Top Threats to Cloud Computing 2025, MGM SEC 10-Q filings.*
