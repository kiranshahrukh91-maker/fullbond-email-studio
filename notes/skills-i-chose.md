# Skills I chose (nothing installed yet)

Searched skills.sh on 7 Nov 2026 for: email marketing, email sequence, welcome series, resend, campaign plan. Numbers re-checked the same day (install counts re-run with `npx skills find`, stars and folders via the GitHub API). Star counts are for the GitHub repository, taken the same day. "Installs" is the skills.sh count.

## Use these

**1. anthropics/knowledge-work-plugins — for planning campaigns and writing the emails**
- Publisher: Anthropic (official). Repo has about 35,000 stars and was updated today.
- Gives me `campaign-plan` (a full brief: goal, audience, messaging, channels, week-by-week calendar, success metrics) and `email-sequence` (full email copy, timing, branching, exit rules for onboarding, lead nurture, win-back and launch flows). It also has `draft-content` for one-off emails. (skills.sh also still lists `anthropics/knowledge-work-plugins@campaign-planning` with 221 installs, but there is no such folder in the repo and the `campaign-plan` page doesn't list it. I can't confirm it is a real skill from this repo, so it is unverified and I skipped it. Checked 7 Nov 2026.) All three (`campaign-plan`, `email-sequence`, `draft-content`) were re-checked on 7 Nov 2026 and still live under `marketing/skills/` in the repo; the `campaign-plan` page on skills.sh loads. Nothing renamed or removed.
- Why: it is the only official, well-maintained source that covers both planning and writing. `campaign-plan` fits the $29 toolkit launch. `email-sequence` fits the free-checklist welcome flow that leads to a toolkit offer.
- Caveat: only about 3,400 installs for `campaign-plan` and 3,000 for `email-sequence`, so it is less battle-tested than the next one. It also asks me questions first (goal, audience, timeline), which is fine.

**2. resend/resend-skills and resend/email-best-practices — for sending email**
- Publisher: Resend (official, the email service itself). `resend-skills` has about 211 stars and is updated daily. `email-best-practices` has about 147 stars. Low stars here only reflect a niche audience, since the publisher is the vendor. Installs are strong: `resend` 24.3K, `resend-cli` 13.9K, `react-email` 9.9K, `email-best-practices` 8.2K.
- Gives me `resend` (sending, batch sends, broadcasts, contacts, webhooks, templates), `email-best-practices` (SPF/DKIM/DMARC, double opt-in, bounces, unsubscribe handling) and `react-email` for building the email layout. It also has `resend-cli`. All four folders (`resend`, `email-best-practices`, `react-email`, `resend-cli`) were re-checked on 7 Nov 2026 and are in `resend/resend-skills`. Some of these also exist as separate repos (`resend/email-best-practices`, `resend/react-email`, `resend/resend-cli`); both copies are Resend-owned, but pick one copy of each and install from that so the two don't drift apart.
- Why: it is the vendor's own guidance, so API details should be right. `email-best-practices` includes Australia's Spam Act 2003 (consent and unsubscribe), which matters for Fullbond.
- Caveat: `resend` needs a `RESEND_API_KEY`. Keep that key out of the repo.
- Note: the Spam Act row in `references/compliance.md` says "honor unsubscribe within 5 days". I believe the actual rule is 5 *working* days, so the row is imprecise (confirmed on 7 Nov 2026 that the row still says "5 days"). Not yet checked against the ACMA site; do that before relying on it.

## Avoid these

**1. caffeinelabs/skills@extension-email-marketing (30.4K installs)**
- The repo has 2 GitHub stars, yet the install count is the highest in the "email marketing" results. That mismatch is a red flag.
- Reading it, it is not a general email-marketing skill. It is a plug-in for the Caffeine AI app builder and needs that platform's packages and a paid plan. It would not work for a Resend-based studio.

**2. affaan-m/ecc@marketing-campaign (7K installs) — not the right source for this job**
- The repo has about 299,000 stars, but it describes itself as an "agent harness performance optimization system" (skills, memory, security, dev tooling). Marketing is a side feature, and the stars say nothing about this one skill. Installing from it may also pull in a wide setup I did not ask for.
- Anthropic's `campaign-plan` does the same job from a clearer, more focused source, so I would not use this one. I did not read its contents, so this is a judgement about the source, not proof the skill is bad.

Not assessed: `coreyhaines31/marketingskills` has very high installs (`email-sequence` 55.1K, `copywriting` 248K). I have not checked its publisher, stars or SKILL.md, so run it through the three checks below before considering it.

Honourable mentions I also skipped: tiny-install results such as `andrewluxem/lifecycle-skills@welcome-series` (1 star, 1 install) and `heyharmony/skills` (1 star, 1 install). Too little track record.

## How I decided

Check these three things before installing any skill:

1. **Who publishes it.** Prefer the vendor or an official organisation (anthropics, resend). Otherwise look for a named person or team with a track record. Be wary of anonymous accounts.
2. **Is the repository alive and does it match the skill?** Look at the GitHub stars, the last update date and the licence. Then open the SKILL.md and confirm it does what the name says. Install counts alone can mislead: the Caffeine skill has 30K installs and 2 stars.
3. **What can it touch?** Read the SKILL.md for the keys, tools and commands it asks for (for example `RESEND_API_KEY`, scripts, network calls). Only install it if that is proportionate to the job. Check also that it fits an Australian business (for example Spam Act 2003, not just US CAN-SPAM).
