---
title: 'jadi cloud security engineer 2026 — skill yang dah berubah'
description: 'Role cloud security engineer dah berubah lebih dalam 2 tahun ni dari 5 tahun sebelumnya. Ini breakdown jujur apa yang berubah, apa yang masih sama, dan skill baru yang kena ada sekarang.'
pubDate: 2026-07-01
tags:
  - cloud
  - security
  - iam
  - tooling
categories: ['Cloud Security Engineering']
postType: field-note
translationKey: cse-01-skill-berubah
toc: true
heroImage: /images/covers/webp/cover-cse.webp
heroImageAlt: 'Cloud security engineering — modern 2026 cover'
---

> Nota dalam Bahasa Melayu untuk sesiapa yang nak masuk atau dah dalam bidang cloud security dan nak tahu apa yang sebenarnya berubah sekarang.

## Pendahuluan

Ada satu quote dari CSOH.org yang kena dengan betul:

> _"Cloud Security Engineer is the connective tissue that turns ten specialists' work into one coherent security posture."_

Kau bukan specialist dalam satu benda. Kau adalah orang yang sambung semua benda.

Tapi "semua benda" tu dah berubah dengan cepat. Skill yang cukup untuk masuk bidang ni tahun 2023 tak cukup lagi untuk tahun 2026 — bukan sebab kau tak belajar, tapi sebab landscape dah shift secara structural.

Post ni breakdown jujur: **apa yang sama, apa yang berubah, dan apa yang baru sama sekali**.

---

## Apa yang masih sama (jangan skip)

Sebelum cakap pasal benda baru, kena jelas dulu: **foundation masih sama**. Orang yang skip benda ni sebab nak terus ke AI/agentic stuff akan struggle.

**Foundation yang masih wajib:**

| Skill                        | Kenapa masih penting                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| **Networking fundamentals**  | VPC, subnets, security groups, NACLs — cloud networking masih pakai konsep yang sama  |
| **IAM basics**               | Roles, policies, least-privilege — sekarang lagi penting sebab agent pun ada identity |
| **Linux**                    | EC2, containers, pods — semua run atas Linux. `ss`, `iptables`, `strace`, `auditd`    |
| **Scripting (Python/Bash)**  | Automation, detection engineering, custom tooling                                     |
| **Threat modeling**          | STRIDE masih relevant. Sekarang kena extend untuk AI/agent threats                    |
| **Incident response basics** | Collect evidence, contain, eradicate, recover — flow tak berubah                      |

Kalau kau lemah dalam mana-mana di atas — fix itu dulu sebelum belajar benda lain.

---

## Apa yang berubah (2024 → 2026)

### 1. Identity jadi lebih kompleks — bukan setakat manusia lagi

Dulu IAM = manage user dan service accounts.

Sekarang kau kena manage:

- **Human identity** — MFA, SSO, conditional access
- **Workload identity** — SPIFFE/SPIRE, pod service accounts, instance profiles
- **Agent identity** — AI agent pun ada identity. Manifest declaration, capability token, audit binding
- **Non-human identity (NHI)** — API keys, OAuth tokens, CI/CD service accounts — sekarang dah ada dedicated tooling: `Aembit`, `Indent`, `Strata`

```bash
# SPIFFE workload identity example
# setiap workload dapat SVID (SPIFFE Verifiable Identity Document)
# bukan hardcoded credential lagi

spiffe://trust-domain/ns/production/sa/security-auditor
```

**Apa kena belajar:** SPIFFE/SPIRE documentation, cloud provider workload identity (AWS IRSA, GCP Workload Identity Federation, Azure Managed Identity).

---

### 2. Supply chain security jadi mandatory

Post-xz-utils backdoor (2024), Log4Shell (2021), SolarWinds (2020) — sekarang supply chain attack dah jadi standard attack vector, bukan edge case.

**Benda baru yang kena faham:**

- **SBOM (Software Bill of Materials)** — inventory semua dependency kau. EU Cyber Resilience Act mewajibkan SBOM untuk software yang dijual di EU.
- **SLSA framework** (Supply chain Levels for Software Artifacts) — provenance verification dari source ke build ke deploy
- **Sigstore/Cosign** — sign dan verify container images secara kriptografik

```bash
# Verify container image signature
cosign verify \
  --certificate-identity="https://github.com/actions/..." \
  --certificate-oidc-issuer="https://token.actions.githubusercontent.com" \
  myapp:latest
```

**Tools:**

- `Trivy` — SCA + container scan + secret detection (semua dalam satu)
- `Grype` — vulnerability scanner untuk SBOM
- `Syft` — generate SBOM dari container/filesystem
- `Renovate/Dependabot` — automated dependency update

---

### 3. Runtime security dah jadi mainstream

Dulu runtime security = mahal, complicated, edge case untuk high-security environment.

Sekarang dengan **eBPF**, runtime security boleh deploy ke semua orang tanpa kernel module atau agent yang heavy.

```bash
# Falco rule example — detect unexpected network connection dari container
- rule: Unexpected outbound connection
  desc: Container buat outbound connection ke IP yang tak dalam allowlist
  condition: >
    outbound and container and
    not proc.name in (known_processes) and
    not fd.sip in (allowed_ips)
  output: >
    Unexpected connection (user=%user.name container=%container.name
    ip=%fd.sip port=%fd.sport)
  priority: WARNING
```

**Tools yang kena tahu:**

- `Falco` — runtime threat detection, Kubernetes-native
- `Tetragon` (Cilium) — eBPF-based enforcement, bukan sekadar detect tapi boleh enforce
- `KubeArmor` — security policy enforcement untuk Kubernetes workloads

**Kenapa penting sekarang:** Container escape attacks makin sophisticated. Dengan agent yang boleh run arbitrary code, runtime detection jadi safety net yang penting.

---

### 4. IaC security dah jadi pre-commit, bukan post-deploy

Dulu security scan IaC berlaku bila ada audit atau before production. Sekarang ia berlaku **sebelum kau push code**.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/bridgecrewio/checkov
    rev: 3.2.0
    hooks:
      - id: checkov
        args: [--framework, terraform]

  - repo: https://github.com/aquasecurity/tfsec
    rev: v1.28.0
    hooks:
      - id: tfsec
```

**Policy-as-code (OPA/Rego)** — kau tulis policy dalam code, enforce dalam CI/CD:

```rego
# Rego policy — block S3 bucket yang public
deny[msg] {
    resource := input.resource.aws_s3_bucket[name]
    resource.acl == "public-read"
    msg := sprintf("S3 bucket '%v' kena private", [name])
}
```

**Shift ini bermaksud:** Security engineer sekarang kena comfortable dengan developer tools — git hooks, CI/CD pipelines, PR review process.

---

### 5. AI-augmented security — bukan pilihan, dah jadi standard

Gartner predict 50% SOC akan ada AI decision support by end 2026. Prediction tu sekarang dah jadi operational reality.

**Benda konkrit yang dah berlaku:**

- **AI-assisted alert triage** — agent review alert, classify severity, suggest response, escalate yang perlu human judgment sahaja
- **AI-generated detection rules** — "describe the behavior" → agent generate Sigma rule / KQL query
- **Natural language threat hunting** — "show me all EC2 instances that made outbound connections to unknown IPs in the last 24 hours" → auto-translate ke query
- **Automated remediation** — agent detect misconfigured S3 bucket, generate PR untuk fix, tunggu human approval sebelum apply

**Apa kena belajar sekarang:**

- Cara validate AI-generated detection rules (bukan blind trust)
- Cara tune AI alert classifier untuk reduce false positive
- Cara design human-in-the-loop workflow untuk automated remediation
- OWASP Top 10 for LLM Applications (sebab kau akan secure AI tools juga)

---

### 6. Agentic AI security — skill baru yang genuine

Ini yang **paling baru dan paling ramai yang belum prepare**.

December 2025: OWASP publish **Top 10 for Agentic Applications** — first formal taxonomy untuk autonomous AI agent risks. Ini bukan extension dari LLM Top 10 biasa — ini kategori risiko baru:

- Goal hijacking, tool misuse, identity abuse, memory poisoning
- Cascading failures, rogue agents, data exfiltration via reasoning
- Privilege escalation, insecure tool chaining, audit evasion

**Cloud Security Engineer 2026 kena tahu:**

1. Macam mana nak threat model agent system (bukan cuma application threat model)
2. Macam mana nak design least-privilege Manifest untuk agent
3. Macam mana nak setup agent observability (Langfuse, OpenTelemetry)
4. Macam mana nak review agent Manifest sebelum production deploy (sama macam code review)
5. AEGIS Framework (Forrester) — governance framework untuk enterprise agentic AI deployment

---

## Role yang muncul dari semua perubahan ni

Dari breadth role cloud security engineer, sekarang ada beberapa specialization yang muncul:

| Specialization                           | Focus                                                        | Contoh kerja                                             |
| ---------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| **Cloud Security Engineer (generalist)** | Connective tissue — IAM, posture, design review, detections  | AWS security audit, policy review, architecture sign-off |
| **Detection Engineer**                   | Tulis dan maintain detection rules, alert triage pipeline    | Sigma rules, KQL queries, SIEM tuning                    |
| **AI/LLM Security Engineer**             | Secure AI systems, guardrail design, agentic threat modeling | OWASP LLM compliance, NeMo Guardrails implementation     |
| **Supply Chain Security Engineer**       | SBOM, provenance, dependency risk                            | Sigstore setup, SLSA compliance, SCA pipeline            |
| **Platform Security Engineer**           | Secure the developer platform itself                         | CI/CD security, secrets management, IaC policy           |

**Realist take:** Untuk entry-level, kau masuk sebagai generalist. Specialization datang dengan experience. Tapi kau kena aware tentang semua specialization ni supaya boleh communicate dan collaborate dengan specialist.

---

## Roadmap konkrit: dari sekarang ke 12 bulan

### Bulan 1-3: Foundation + modern tooling

- [ ] AWS/Azure fundamentals — minimum 1 cloud platform sampai operational depth
- [ ] Checkov + Trivy daily use — scan code repo kau sendiri
- [ ] Falco setup kat local Kubernetes (minikube/kind)
- [ ] Baca OWASP Top 10 for LLM Applications + Agentic Applications

### Bulan 4-6: Intermediate + automation

- [ ] Tulis satu OPA/Rego policy dari scratch
- [ ] Setup pre-commit hooks dengan security scan dalam satu project
- [ ] Cuba SPIFFE/SPIRE locally — faham workload identity flow
- [ ] SBOM generation dengan Syft, scan dengan Grype

### Bulan 7-9: Advanced + AI security

- [ ] Setup NeMo Guardrails untuk satu LLM application
- [ ] Implement agent Manifest + Agent Governance Toolkit dalam satu project
- [ ] Setup Langfuse untuk trace agent behavior
- [ ] Baca Microsoft Agent Governance Toolkit documentation + try it

### Bulan 10-12: Portfolio + specialization

- [ ] Bina satu complete "secure agent" project — dari threat model, Manifest, guardrails, sampai observability
- [ ] Join satu CTF yang ada cloud/AI security category (CloudGoat, HackTheBox Cloud)
- [ ] Contribute ke salah satu open source security tool (Falco, Checkov, Guardrails AI)
- [ ] Tulis tentang apa yang kau belajar — blog, LinkedIn, apa-apa je

---

## Penutup

Role cloud security engineer sekarang adalah role yang **lebar tapi kena ada depth sekurang-kurangnya dalam satu area**.

Orang yang survive dalam field ni adalah orang yang treat breadth sebagai strength — connector yang faham macam mana IAM, runtime security, supply chain, dan sekarang AI security connect dengan satu sama lain.

Bukan expert dalam semua. Tapi **faham semua cukup untuk buat keputusan yang betul** bila dua domain overlap — dan dalam 2026, semua domain overlap dengan AI.

---

**Baca seterusnya:** Kalau nak gambaran 2026 yang lebih luas — macam mana Cloud Security, AI, Agentic OS, dan Intent-driven architecture converge dalam satu narrative kejuruteraan — tengok [**Cloud Security + AI 2026 — Trend Map untuk Engineers**](/posts/age-01-trend-2026/).

---

_Rujukan:_

- _CSOH.org — Cloud Security Engineer: The Role in Depth_
- _Scaler — Cloud Security Engineer Roadmap 2026_
- _Datacipher — 10 Cloud Security Skills That Set IT Professionals Apart in 2026_
- _Refonte Learning — Cloud Security Engineering in 2026: 5 Trends_
- _Microsoft — Secure Agentic AI End-to-End (RSAC 2026)_
- _OWASP Top 10 for Agentic Applications (Dec 2025)_
- _Forrester AEGIS Framework for Agentic AI (2026)_
- _SLSA Framework — Supply Chain Levels for Software Artifacts_
