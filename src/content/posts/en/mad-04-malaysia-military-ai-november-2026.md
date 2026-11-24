---
title: "Malaysia's military in November 2026: drones, gamers and a hybrid-warfare centre"
description: 'Malaysia wants gamers for drone work and plans a hybrid-warfare centre with France. What was announced, and the AI-security questions it raises.'
pubDate: 2026-11-24
tags:
  - ai
  - security
  - drones
  - malaysia
categories: ['Military AI & Defence']
postType: field-note
toc: true
translationKey: 'mad-04-malaysia-military-ai-november-2026'
draft: false
---

> Field notes on three November announcements that shape how Malaysia's armed forces will use unmanned and AI-enabled systems, and what they mean for the people who will build and defend them.

## The short version

November gave a clearer picture of where Malaysia's military technology is heading:

1. **The armed forces chief wants gamers, but not as a shortcut.** General Tan Sri Malek Razak Sulaiman said the military is looking at young people's digital skills, gamers included, to grow its drone capability, while stressing that gaming alone does not qualify anyone.
2. **The drone fleet is growing.** Malaysia bought three ANKA-S drones for RM423.8 million this year and plans three more, for surveillance over the South China Sea and the waters off Sabah.
3. **Malaysia and France will explore a hybrid-warfare centre, RC-SHIELD,** covering drone attacks, cyberattacks, information manipulation and cognitive warfare, with a training role for ASEAN.
4. **The global rule of thumb got a public restatement:** the US Treasury Secretary said Presidents Trump and Xi agreed that humans must stay involved in military AI decisions.

None of the Malaysian announcements uses the words "autonomous weapons". The real story is quieter: more sensors in the air, more data on the ground, and a new front where AI-generated content is itself the threat.

## 1. Gamers for drone operations, with conditions

In an interview published by The Star on 20 November, General Malek Razak, who became Chief of Defence Forces in February, said the armed forces are "looking at tapping into the digital skills of the nation's youth, including gamers, to strengthen its drone capabilities".

He was careful about what that means. Experience with video games or recreational drones "could be considered an added advantage", but it does not translate automatically into military competence:

> "Operating military drones involves specialised training, technical knowledge, an understanding of operational procedures, discipline and the ability to carry out missions safely."

Recruitment stays based on qualifications, aptitude and competency tests. What changes is the funnel: the military is open to "digital platforms, interactive technology, simulations and activities based on skills" to introduce young Malaysians to unmanned systems, communications, cybersecurity and modern defence technology. It has also opened intake to holders of TVET qualifications such as the Malaysian Skills Certificate (SKM) and Diploma (DKM).

The context is the drone fleet. Malaysia bought **three ANKA-S units for RM423.8 million** earlier this year and plans **three more in a second phase**, to expand intelligence, surveillance and reconnaissance (ISR) over the South China Sea and off Sabah.

**Why this matters beyond recruitment:** an ISR drone is a flying sensor attached to a data system. Every flight produces video and telemetry that travels over data links to ground control stations, then to analysts and storage. The skills gap the chief describes is not only piloting. It is everyone who keeps that chain trustworthy: link security, ground-station hardening, identity for operators, and integrity of the data that ends up in front of a commander.

## 2. RC-SHIELD: a hybrid-warfare centre with France

On 19 November, Defence Minister Datuk Seri Mohamed Khaled Nordin said Malaysia and France had agreed to explore a **Centre of Excellence for hybrid-warfare threats under the RC-SHIELD initiative**. It follows a Bilateral Defence Capability and Defence Industrial Partnership Roadmap signed during President Emmanuel Macron's visit.

According to the minister, the centre would strengthen Malaysia's response to hybrid threats including:

- **drone attacks**
- **cyberattacks**
- **information manipulation**
- **cognitive warfare**

It could also become a training and capability hub for ASEAN members, with France providing technical experts. Further discussions follow the letter of intent, with the aim of getting it running "as soon as possible".

The same partnership covers technology transfer and local industry: the proposed purchase of 36 105mm light artillery guns (valued at more than RM600 million) with Malaysian component suppliers, and a letter of intent for four combat search-and-rescue helicopters (about RM1.3 billion). "We must develop what is known as sovereign capability," Khaled said.

**The AI angle is in the last two items.** Information manipulation and cognitive warfare are where generative AI already shows up against Malaysia. In September, Anthropic reported disrupting an AI-assisted operation that ran about 1,000 fake X accounts and a fabricated news site aimed at Malaysian voters (I cover the government side of that case in a [separate note](/en/posts/gt-08-malaysia-ai-government-november-2026/)). A hybrid-warfare centre that takes cognitive warfare seriously will need detection for coordinated inauthentic behaviour and synthetic media, not only firewalls.

## 3. The global backdrop: humans in the loop

On 20 November, US Treasury Secretary Scott Bessent told CNBC that Presidents Trump and Xi agreed during talks in Shenzhen that humans must remain involved in military decisions that use AI, and that the most capable systems should not act autonomously in major military operations.

Two caveats. This is one official's account of a conversation, not a published text, and it says nothing about verification. Still, "human involvement in military AI decisions" is now a line both major powers say they accept, and it is the reasonable baseline for any country buying armed or ISR drones.

For Malaysia, which buys its drones abroad and is now talking about sovereign capability, the practical question is where that human sits in each system: who approves a target, who can override an automated cue, and what gets logged when they do.

## What engineers should take from this

If you work on systems near defence, or on the civilian infrastructure these programmes depend on:

- **Treat drone ISR as a data pipeline.** Map the path from sensor to data link to ground station to storage to analyst, and give each hop authentication, encryption and integrity checks.
- **Harden ground control stations like privileged endpoints.** They are the most attractive target in an unmanned system: strong operator identity, no shared accounts, allow-listed software, monitored sessions.
- **Make human oversight a design feature, not a policy line.** Any automated detection or cueing should show its confidence, require an explicit human decision for consequential actions, and record who decided.
- **Build detection for synthetic influence, not just intrusion.** Cognitive-warfare defence needs signals such as account-creation patterns, coordinated posting and media provenance (for example C2PA), plus Malay-language analysis.
- **Use simulations for training, and secure them.** If gaming-style simulators become part of recruitment and training, they process real operational procedures and should be treated as sensitive systems.

## Bottom line

Malaysia's November defence news was not about killer robots. It was about people, sensors and a new kind of threat: more drones watching the South China Sea, a search for the digital talent to run them, and a centre with France aimed at hybrid attacks that increasingly come as AI-generated content. The AI-security work sits in the unglamorous middle, securing the data chain, keeping a human visibly in the loop and spotting synthetic influence early.

Sources:

- [Military to enlist gamers](https://www.thestar.com.my/news/focus/2026/11/20/military-to-enlist-gamers) — The Star, 20 Nov 2026
- [Malaysian military to enlist gamers to strengthen its drone capabilities](https://www.straitstimes.com/asia/se-asia/malaysian-military-to-enlist-gamers-to-strengthen-its-drone-capabilities) — The Straits Times, 20 Nov 2026
- [Malek Razak is new military head](https://www.thestar.com.my/news/nation/2026/02/01/malek-razak-is-new-military-head) — The Star, 1 Feb 2026
- [France Ready To Help Malaysia Develop Defence Capabilities - Mohamed Khaled](https://www.bernama.com/en/news.php?id=2636573) — Bernama, 19 Nov 2026
- [Trump and Xi Jinping agree on human oversight for military AI](https://www.dimsumdaily.hk/trump-and-xi-jinping-agree-on-human-oversight-for-military-ai/) — Dimsum Daily, 21 Nov 2026
- [AI Platform Targeted Malaysian Voters With 1,000 Fake X Accounts, Says Anthropic](https://www.therakyatpost.com/news/2026/09/11/ai-platform-targeted-malaysian-voters-with-1000-fake-x-accounts-says-anthropic/) — The Rakyat Post, 11 Sep 2026
