\# DAITA — Rebrand Content



Replaces all nscale placeholder copy across four routes: `/`, `/platform`, `/our-story`, `/contact`.



\*\*Rules for this pass\*\*

\- Keep every design token exactly as built: colours, typography, spacing, type scale, animation timing, hover states, section rhythm. \*\*Only content changes.\*\*

\- Keep all 12 homepage sections. Do not delete any section. Where DAITA has less content than nscale, the guidance below says how to render fewer items inside the existing layout.

\- Work section by section in page order. Show the copy before writing it.

\- \*\*§0 is absolute.\*\* Nothing from that table appears anywhere in the output.



Design references in `docs/`: `DAITA\_Sand\_Site.html` (primary), `DAITA\_MicroAGI\_dc.html` (secondary). Lift the product-UI mockups from the Sand bundle where this file calls for them, and restyle them with the clone's existing tokens — not Sand's.



\---



\## 0. Do not publish



| Claim | Why |

|---|---|

| Y Combinator / Category / Ritual as investors | Appears only in the Sand mockup. Unverified. Render no investor logos and no funding claim. |

| +30% buyer satisfaction · 25% time saved · 10% lead time | No methodology. Blocked by DAITA's own positioning doc. |

| "Rated 5/5" | n=3. |

| 70% of day chasing · 6-day delay to brand | Sand mockup figures, unsourced. |

| 8–15% profit leakage | Industry claim without citation. |

| 11 factories / 200+ users | Needs splitting into live / pilot / in conversation. |

| Client names: Estee Exports, Eastman Group, CompassTex | Written permission not yet held. §1.6 gives a permission-free fallback. |

| "Rajneesh Kumarin, Pilot Customer" | Same first name as a DAITA engineer. Unresolved. Do not carry over. |



\*\*The only numbers permitted anywhere on the site:\*\* lead time 85 → 75 days, on-time shipment 90% → 94%. Both from Estee Exports, and both gated on the sign-off in §1.7. No other statistic appears on any page.



\---



\## Global



\*\*Meta\*\*

```

Title:       DAITA — AI Textile Supply Chain Coordinator

Description: DAITA reads every WhatsApp update, PO and cutting report across your

&#x20;            factories, then keeps brands, buying offices and production on the

&#x20;            same number. From purchase order to delivery, automated.

```



\*\*Assets\*\* — `public/images/daita/`

\- `sand-3.jpg` — Tiruppur cutting floor, unstaged. Hero and section imagery.

\- `sand-2.mp4` — 26s floor film. Homepage hero background.

\- `logo.svg`, `logo-white.svg`, `favicon.png`, `og-image.png` — supply these. The logo is the single most important asset for making this read as DAITA rather than as a restyled nscale.



If an asset is missing, leave the slot pointing at its intended path rather than substituting anything.



\*\*Link map\*\* — already built, do not change:

`/platform` · `/our-story` · `/contact` · `/#why-daita` · `/#who-its-for` · `/#faq` · Careers and social → `https://www.linkedin.com/company/daitalabs/`



\*\*Contact, used everywhere\*\*

```

hello@daitalabs.com · +91 979 1947 010 · Tiruppur · Bengaluru

```

⚠️ Location conflict across sources: live site says Tiruppur only; Sand gives a Bengaluru address; MicroAGI claims London · Delaware · Tiruppur · Bengaluru. Tiruppur · Bengaluru is what internal docs support. Confirm before launch.



\*\*Copyright:\*\* `© 2026 DAITA Labs. All rights reserved.`



\---



\# 1. Homepage — `/`



\## 1.1 SiteHeader / HeaderDropdowns / MobileMenu



\*\*Mega-menu 1 — Platform\*\*

Heading: \*How DAITA works\*



| Column | Items |

|---|---|

| Capture | Read every floor message · WhatsApp, email, voice notes · Tamil · Hindi · English |

| Structure | Matched to PO and milestone · Quantities, dates, defect counts · One production timeline |

| Coordinate | Plan vs actual, daily · Automatic chasing · Paperwork reconciliation |



Footer link: \*See how it works →\* `/platform`



\*\*Mega-menu 2 — Product\*\*

Heading: \*Explore the platform\*



| Column | Items |

|---|---|

| Tracking | TNA Engine — order × stage grid · Buyer Orders — one order, full history · Change History — what moved and when |

| Actions | Pending Actions — the approval inbox · Process In-Charges — who owns what · Guidelines — your SOPs in plain English |

| Insight | My Team — company-wide roll-up · Chat with your data — ask, don't dig · Reconciliation — PO vs cut vs packing list |

| Integrations | WhatsApp Business · ERP sync, two-way · Documents and email |



Footer link: \*Start a pilot →\* `/contact`



\*\*Plain links:\*\* Our story · Contact

\*\*Header button:\*\* Book a Demo → `/contact` \*(replaces Login)\*



\## 1.2 HeroSection



```

Background:  sand-2.mp4, dark overlay, muted, autoplay, loop

&#x20;            Fallback: sand-3.jpg with the existing slow pan

Eyebrow:     AI TEXTILE SUPPLY CHAIN

H1:          Coordinator

Sub:         From purchase order to delivery, automated.

Primary CTA: Book a Demo → /contact

```



If the built hero carries a secondary CTA, use \*\*See how it works\*\* → `/platform`.



\## 1.3 LatestNewsSection



nscale renders four press-release cards. DAITA has no newsroom — reuse the row for shipped capability. Four cards, no \*Learn more\* links (there is nowhere to send people; a dead link is worse than no link).



Section label: \*\*What's live today\*\*



1\. \*\*Two-way ERP integration\*\* — order data writes back into the factory's own system of record

2\. \*\*Platform for buying offices\*\* — now in commercial use

3\. \*\*Automatic escalation\*\* — when a deadline slips, across three tiers of management

4\. \*\*Tamil, Hindi and English\*\* — voice notes, photos and mixed script, read where they're sent



\## 1.4 PlatformStackSection + PlatformStackMobileSection



The biggest section on the page, and the best fit: nscale's four stacked product layers take DAITA's four capabilities one-to-one.



\*\*Intro\*\*

> ### What DAITA does, on every order.

> From reading every floor message to matching it to a PO, chasing the update, and reconciling the paperwork.

> CTA: Explore the platform → `/platform`



\---



\*\*Layer 1 — Read every floor message\*\*

The agent parses WhatsApp voice notes, photos and text in Tamil, Hindi and English, and writes each one to the PO it belongs to.



\- \*\*No new app for the floor.\*\* Supervisors keep sending messages the way they already do. Nothing changes for the line.

\- \*\*Confirmed before it's written.\*\* The agent reads the quantity back and waits for a yes before it touches the record.

\- \*\*Mixed script and voice.\*\* Voice notes, photos and typed text in any of the three languages.



\*Visual — lift from Sand:\* `WHATSAPP · LINE 7` → \*"4821 sewing 380 pcs done today, machine down 2 hrs"\* resolving to `PO #4821 · Sewing · 380 pcs · 2 hrs downtime`

\*CTAs:\* Book a Demo · Learn more → `/platform`



\*\*Layer 2 — Never chase a status again\*\*

DAITA asks the line for the update before the merchandiser has to, then logs the reply against the milestone.



\- \*\*Nudges on schedule.\*\* Every milestone carries its own due time. The agent asks first.

\- \*\*Replies land as records.\*\* The answer is written to the milestone, not left in a thread.

\- \*\*Escalation when it's needed.\*\* A missed update moves up three tiers of management automatically.



\*Visual — lift from Sand:\* `#4821 · sewing update due 18:00` → `Nudge sent 18:04` → `Reply logged 18:21 · 380 pcs` → `Milestone closed, no chasing`

\*CTAs:\* Book a Demo · Learn more → `/platform`



\*\*Layer 3 — Catch slippage the same day\*\*

Actual output is compared to plan every evening. When a line falls behind, cut, finish and ship dates reflow together.



\- \*\*Plan against actual, nightly.\*\* Not a weekly review. Every evening, every open PO.

\- \*\*Dates move together.\*\* A slip in sewing reflows finishing and shipping, so the ship date is a real date.

\- \*\*Surfaced while it's fixable.\*\* The flag arrives days before the ETD, not after it.



\*Visual — lift from Sand:\* `CUT · PLAN 3–4 APR` / `SEW · ACTUAL` / `FINISH · REFLOWED`, with \*Sewing 3 days behind plan · finishing moved to 15 Apr, ship date held\*

\*CTAs:\* Book a Demo · Learn more → `/platform`



\*\*Layer 4 — Reconcile the paperwork\*\*

POs, cut reports, packing lists and invoices are cross-checked as they arrive. Mismatched quantities are flagged, not discovered at audit.



\- \*\*Checked on arrival.\*\* Every document is matched against the PO the moment it lands.

\- \*\*Shortfalls surface early.\*\* Flagged to the merchandiser and the buying office before the invoice is raised.

\- \*\*Three-way approvals.\*\* Quality, quantity and yes/no can each sit with a different person, so no one signs off alone.



\*Visual — lift from Sand:\* `PO #4821 · 4,800 pcs ✓` / `Cut report · 4,800 pcs ✓` / `Packing list · 4,760 pcs — 40 short`

\*CTAs:\* Book a Demo · Learn more → `/platform`



\## 1.5 InfrastructureSection — `id="why-daita"`



Five video-backed pillar cards, five real claims. No padding needed.



Heading: \*\*Built where the work happens\*\*

Sub: \*Why this works in a factory when most software doesn't.\*



1\. \*\*Embedded, not exported\*\* — The team relocated from cities around the world to Tiruppur to build alongside real merchandisers. Every feature came out of field feedback, not a roadmap meeting.

2\. \*\*T\&A-native\*\* — PO in, Time \& Action out. The critical path is the object the system is built around, not a report generated from it.

3\. \*\*It does the work, not the watching\*\* — The agent chases, extracts, drafts and writes back. A human approves. Dashboards show you a problem; DAITA handles it.

4\. \*\*Live in a week\*\* — One unit, one afternoon. Connect the WhatsApp numbers and the open POs. No IT project, no migration, nothing changes for the floor.

5\. \*\*Your rules, your AI\*\* — Write your production SOPs in plain English. DAITA follows them exactly, escalating and prioritising the way your team already works.



\*Visuals:\* nscale uses stock video loops. Use stills or clips from `sand-2.mp4` instead — real Tiruppur floor footage beats stock decisively here.



\## 1.6 TrustedLogosSection



A client logo wall needs permission that isn't held. Use the integrations wall — same slot, same reassurance, no sign-off required.



Heading: \*\*Works with the systems your factories already run\*\*

Sub: \*Your ERP, your WhatsApp, your email. Nobody changes how they work and nothing has to be migrated.\*



Three marquee rows, in the existing scroll style:

\- \*\*Messaging\*\* — WhatsApp Business · voice notes · Gmail · Outlook · IMAP · SMS · photos · Tamil · Hindi · English

\- \*\*ERP \& systems\*\* — SAP · Oracle · Dynamics 365 · NetSuite · Odoo · Tally · Zoho · in-house ERP · FastReact

\- \*\*Documents\*\* — PO PDF · cut report · packing list · invoice · Excel · CSV · floor photos · scans · trim card



⚠️ Confirm which integrations are actually built before this ships. A logo here reads as a working connector.

\*\*Later:\*\* once permission lands, swap to the client wall under \*Trusted by garment exporters and buying offices across South India\*.



\## 1.7 TestimonialsSection



nscale renders three cards. \*\*One real testimonial exists — render one centred card in the existing card styling.\*\* Do not invent a second or third, and do not use an unattributed quote.



```

Name:  Mr. Thirukkumaran

Title: CEO, Estee Exports · Tiruppur

Quote: They didn't sell from a distance. They moved to Tiruppur and stayed.

&#x20;      This product was built here, with our people, on our real problems.

&#x20;      That's why it works.

```



Beneath the card, a two-stat strip in the clone's existing stat styling:

```

LEAD TIME          85 → 75 days

ON-TIME SHIPMENT   90% → 94%

```

Caption: \*Estee Exports merchandising team\*



⚠️ \*\*Blocked\*\* until written sign-off for the name, quote and figures. If sign-off hasn't landed by launch, hide the section entirely rather than substituting anything.



\## 1.8 IndustrySolutionsSection — `id="who-its-for"`



Two tabs, matching nscale's tab structure.



\*\*Tab 1 — Garment exporters\*\*

\*Sub-heading:\* One timeline across every unit

Export houses running multiple units and multiple buyers, where merchandisers coordinate every order over WhatsApp, email and Excel. DAITA sits on the channels the factory already runs, builds and maintains the T\&A, and surfaces slippage while there's still time to fix it.

\*Image:\* `sand-3.jpg`

\*Learn more →\* `/platform`



\*\*Tab 2 — Buying offices\*\*

\*Sub-heading:\* Visibility into what the supplier is actually doing

Buying offices representing brands across several factories, where status arrives late and second-hand. DAITA structures what suppliers are already reporting, so the office sees the same numbers as the floor on the day they're recorded.

\*Image:\* needed — buying-office desk shot. Until then, reuse `sand-3.jpg` cropped differently.

\*Learn more →\* `/platform`



⚠️ The beachhead question (factories first vs. buying offices first) is unresolved in the positioning doc. Two equal tabs is the neutral position; once decided, lead with the winner.



\## 1.9 LatestStoriesSection → FAQ — `id="faq"`



DAITA has no blog. Convert the four-card row into an FAQ accordion.



Heading: \*\*Frequently asked questions\*\*

Sub: \*If yours isn't here, write to us and we'll answer it against your own orders.\*



\*\*Do our factories have to change how they report?\*\*

No. Supervisors keep sending WhatsApp messages, photos and voice notes the way they already do. The agent reads them, matches each one to a PO and milestone, and confirms the quantity back before writing it.



\*\*Which languages does the agent handle?\*\*

Tamil, Hindi and English, including voice notes and mixed script. Additional languages are added per unit during onboarding.



\*\*Does DAITA replace our ERP?\*\*

No. It sits alongside the ERP and fills the gap between the floor and the system of record. POs, styles and milestones sync both ways, so the ERP stays the book of record.



\*\*How long does setup take?\*\*

A pilot runs on one unit: open POs imported, milestones mapped to how that unit actually works, and the WhatsApp numbers connected. No migration and no change to the floor's routine.



\*\*Who can see what?\*\*

Access is set by role. A line supervisor sees their own POs, a merchandiser sees the orders they own, a buying office sees its brands, and leadership sees the unit roll-up. Brands never see another brand's orders.



\*\*How is DAITA priced?\*\*

Per active production unit, with users included. Talk to us and we'll price the pilot against the number of POs that unit runs in a season.



\## 1.10 CtaSection



```

Heading: Stop paying the coordination tax.

Sub:     Your merchandisers should be making decisions, not chasing status.

&#x20;        Send us one live order. We'll run DAITA against it for a week and

&#x20;        show you where the updates stop.

CTA:     Book a Demo → /contact

Note:    Your data stays in your systems.

Background: sand-3.jpg, heavily darkened, in the existing treatment

```



\## 1.11 Newsletter strip



No mailing list, and the field is already inert. Convert the band to a contact strip in the same styling.



```

Heading: Talk to us

Line:    One live order is all it takes to start.

&#x20;        hello@daitalabs.com · +91 979 1947 010

Places:  Tiruppur · Bengaluru

CTA:     Book a Demo → /contact

```



\## 1.12 SiteFooter



| Column | Links |

|---|---|

| \*\*Platform\*\* | Capture · Structure · Coordinate · Guidelines \*(all → `/platform` anchors)\* |

| \*\*Product\*\* | TNA Engine · Pending Actions · Process In-Charges · My Team · Chat with your data |

| \*\*Who it's for\*\* | Garment exporters · Buying offices \*(→ `/#who-its-for`)\* |

| \*\*Company\*\* | Our story · Contact · Careers \*(→ LinkedIn)\* |



Descriptor under the logo: \*Production coordination for the garment supply chain.\*

Social: LinkedIn only. Do not render empty X or YouTube icons.

`BOTTOM\_LINKS` stays an empty array until real Privacy, Terms and Imprint pages exist.



\---



\# 2. Platform — `/platform`



Purpose: prove the product exists. This is the page a serious prospect reads before booking.



\## 2.1 Hero

```

Eyebrow: PLATFORM

H1:      One record, from PO to delivery.

Sub:     DAITA sits on the channels your factories already run, structures what

&#x20;        is being said, and keeps every party on the same number.

CTA:     Book a Demo → /contact

```

Static image (`sand-3.jpg`), not video — reserve the film for the homepage.



\## 2.2 The three layers — `id="infrastructure"`



Reuse `InfrastructureSection`, rendering three cards rather than five.



1\. \*\*Capture\*\* — The agent joins the WhatsApp groups and mail threads your factories already run. Voice notes, photos and cutting reports are read where they are sent, with no new app for the floor to learn.

2\. \*\*Structure\*\* — Every update is written to the PO, style and milestone it belongs to. Quantities, dates and defect counts become records instead of messages.

3\. \*\*Coordinate\*\* — Plan and actual are compared each evening, missing updates are chased, and packing lists are reconciled against the PO. Slippage surfaces days before the ship date.



\## 2.3 The product



Reuse `PlatformStackSection`. Six screens instead of four layers — if the component is fixed at four, run it twice or render the last two in the same card styling.



\- \*\*TNA Engine\*\* — The order × stage grid. Planned, actual and delta side by side. Filter, group by unit, save custom views. Colour-coded for projected, done and overdue, with a \*No POC\* flag where nobody owns a stage yet.

\- \*\*Buyer Orders\*\* — One order, three tabs: Overview (the stage-by-stage plan), Communications (every chaser sent and update received), Documents (tech packs, quality photos). Plus a full Change History of what moved, when and why.

\- \*\*Pending Actions\*\* — The merchandiser's approval inbox. Every WhatsApp update arrives as a task: what happened, and what to do. Split into buyer orders, supplier orders and system actions, each with a risk indicator.

\- \*\*Process In-Charges\*\* — Every point of contact, the stages they own, how many updates are waiting on them, and their longest outstanding delay. Where a bottleneck becomes a name.

\- \*\*My Team\*\* — The company-wide view. Production broken down by stage and by unit, so leadership sees where the business is stuck, not just one order.

\- \*\*Chat with your data\*\* — Ask questions of your own order data directly, instead of digging through filters and views.



\## 2.4 Your rules, your AI



Reuse the tabbed/card pattern from `IndustrySolutionsSection`.



Heading: \*\*Your rules. Your AI.\*\*

Sub: \*Write your production SOPs in plain English. DAITA follows them exactly, escalating, responding and prioritising the way your team already works.\*



\- \*\*Plain English\*\* — no code, no config files. Write rules the way you would brief a new merchandiser.

\- \*\*Organised by workflow\*\* — sourcing, cutting, sewing, shipping. Each milestone carries its own guidelines.

\- \*\*Always followed\*\* — every message, document and action checked against your rules automatically.



Example guidelines, rendered in the mono/data styling:

```

SOURCING   When a fabric lot lands short of the cut plan, raise it against

&#x20;          the PO and request a substitute.

SOURCING   For every trim order, follow up within 72 hours if no

&#x20;          confirmation is received.

CUTTING    Never let a line start cutting before the lot is approved.

&#x20;          Hold and notify the merchandiser.

SEWING     Follow up when a daily output report is missing. Ask the line

&#x20;          supervisor after 3 hours.

SHIPPING   Monitor ETD against the booking and flag any slip to the brand

&#x20;          the same day.

```



\## 2.5 Live in a week



Reuse the `LatestNewsSection` card row — three cards.



Heading: \*\*Live in a week. Paid back in a season.\*\*

Sub: \*No IT project and no migration.\*



\- \*\*Day 1 · Connect\*\* — One unit, one afternoon. WhatsApp numbers, open POs, ERP export. Nothing changes for the floor.

\- \*\*Week 1 · First flags\*\* — Live milestones on every open PO, and the first slippage caught the day it happens. Brand updates sent automatically.

\- \*\*Season 1 · Full coordination\*\* — Every unit on one timeline, with leadership reading the same numbers as the floor.



\## 2.6 Integrations



Reuse `TrustedLogosSection` with the same three rows as §1.6.



\## 2.7 CTA + Footer

Same as §1.10 and §1.12.



\---



\# 3. Our story — `/our-story`



The strongest narrative asset DAITA owns. Seven beats, alternating image/text in the existing rhythm.



\## 3.1 Hero

```

Eyebrow: OUR STORY

H1:      We moved to Tiruppur.

Sub:     Not to visit. To live there, and build next to the people who use this

&#x20;        every day.

```



\## 3.2 The seven beats



\*\*01 · Factories lose time to manual chaos\*\*

Across garment manufacturing, merchandisers spend hours chasing suppliers, updating sheets and writing status emails. What should be quick decisions turn into endless follow-ups. Delays grow, data scatters, and teams work in firefighting mode instead of production flow.



\*\*02 · Seeing the pattern up close\*\*

Seven months, more than fifty factories, across India, Bangladesh, Turkey, Portugal and Vietnam. The same struggle everywhere — smart, hardworking people trapped in admin work. Automation could free them to focus on the decisions that actually move production forward.



\*\*03 · Turning frustration into a system\*\*

A second factory tour across India, mapping how back-office work really flows, then designing DAITA around those daily realities rather than around an idea of them.



\*\*04 · The team\*\*

Factory insight paired with AI, product and operations talent. One founder scaled Europe's largest green-tech start-up. The other founded a tech venture at school, worked at Snapchat and Bloomberg and with governments on large-scale digital projects, then spent a year in garment factories. Our Chief Engineer, from Carnegie Mellon, led AI work at Qualcomm and Krutrim. Four engineers drive the technology forward.



\*\*05 · Built in the heart of the industry\*\*

The entire team relocated from cities around the world to Tiruppur, the centre of Indian garment manufacturing, to build alongside real merchandisers. DAITA now runs live factory operations. Every feature comes from field feedback, which is why the system holds under real production pressure.



\*\*06 · A smarter global supply chain\*\*

Our mission is to make back-office work as efficient as the production line. Starting in South Asia's textile hubs, DAITA aims to bring clarity, speed and automation to every link of the global apparel supply chain.



\*\*07 · Join us\*\*

We're building the future of garment manufacturing — intelligent, fast, globally connected. Joining DAITA means working at the frontier of AI and industry transformation, not watching it happen. If that sounds like you, we'd like to hear from you.

\*CTA:\* See open roles → LinkedIn



⚠️ The immersion figure is disputed internally — six, seven and eight months all appear across sources. The live site says seven months and fifty-plus factories; that is used above. \*\*Get founder sign-off before launch.\*\*



\## 3.3 One order, five time zones



Place after beat 07. A horizontal timeline in the existing section styling — this does the work an unverifiable statistic would do, without needing one.



Heading: \*\*One order, five time zones.\*\*

Sub: \*Every handoff is a place where the update stops moving.\*



```

02 APR  NEW YORK    PO #4821 issued — 4,800 pcs, 180 GSM crew tee,

&#x20;                   ex-factory 18 Apr

04 APR  LONDON      Buying office confirms. Trims split across two vendors,

&#x20;                   nothing written back to the brand

07 APR  TIRUPPUR    Fabric lot short 400 m. Cutting holds two days, the

&#x20;                   update stays on one WhatsApp thread

11 APR  DHAKA       Line moved, ETD +4 days. Second source picks up

&#x20;                   1,200 pcs at a different rate

28 APR  ROTTERDAM   ETA slips, air freight quoted. The brand hears it six

&#x20;                   days after the floor already knew

```



\## 3.4 CTA + Footer

Same as §1.10 and §1.12.



\---



\# 4. Contact — `/contact`



\## 4.1 Hero

```

Eyebrow: CONTACT

H1:      Send us one live order.

Sub:     We'll run DAITA against it for a week and show you where the updates

&#x20;        stop. If the record doesn't hold up, you keep the data and we stop.

```



\## 4.2 Two columns



\*\*Left — form.\*\* Name · Work email · Company · Role · Number of production units · Message.

Submit: \*\*Book a Demo\*\*

Small print: \*Your data stays in your systems.\*

⚠️ The newsletter field in the clone is inert (nscale mounted HubSpot). Either wire this form to a real endpoint or set it to `mailto:hello@daitalabs.com`. Do not ship a form that silently discards submissions.



\*\*Right — details\*\*, in the mono/data styling:

```

EMAIL      hello@daitalabs.com

PHONE      +91 979 1947 010

TIRUPPUR   Tamil Nadu, India

BENGALURU  Karnataka, India

LINKEDIN   linkedin.com/company/daitalabs

```



\## 4.3 What happens next



Three steps, in the card styling:

1\. \*\*We talk\*\* — 15 minutes to understand how your orders move today.

2\. \*\*One unit, one week\*\* — We connect a single unit's WhatsApp numbers and open POs.

3\. \*\*You see the gaps\*\* — We report back against your own POs and show you where updates stop.



\## 4.4 Footer

Same as §1.12.



\---



\# 5. Voice



\- Short declaratives. No hype adjectives. §1.4 and §1.5 are the target register.

\- Never frame DAITA as replacing merchandisers. It stops merchandisers being a human database lookup. The reader may be the person whose job it touches.

\- Every PO number, quantity, date and status label in the mono/data styling the clone already uses. That texture is what makes the product feel real rather than described.

\- \*\*Do not say:\*\* "AI-native vs. SAP/Oracle legacy" · "DAITA vs. your spreadsheets" · "younger, energetic team" · "AI operating system for global garment manufacturing".

\- Statistics appear in exactly one place, §1.7. Nowhere else on any page carries a number.



\---



\# 6. Checklist



\- \[ ] Zero occurrences of "nscale" in `src/`, `public/` or metadata — grep case-insensitively, including component filenames and directory names

\- \[ ] All nscale imagery, video, SVG logos and favicons deleted from `public/`

\- \[ ] No investor logos, no funding claim

\- \[ ] No client logos

\- \[ ] Testimonial section rendered only if sign-off is held, otherwise hidden

\- \[ ] Only the two Estee figures appear as statistics, and only in §1.7

\- \[ ] Contact form wired to a real destination

\- \[ ] Copyright reads 2026

\- \[ ] All four routes render, no 404s, anchors land clear of the fixed header

\- \[ ] `npm run check` passes

\- \[ ] Checked at 479 / 767 / 991 — the breakpoints inherited from the source



