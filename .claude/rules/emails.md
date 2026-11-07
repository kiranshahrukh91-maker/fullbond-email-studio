---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for every Fullbond email file

These rules apply to every email file in any campaign, and only to email files.

Each email file must:

- **Start with a subject and preview.** The first line is `Subject: ...` and must be 50 characters or fewer. The second line is `Preview: ...` and must be 90 characters or fewer.
- **Greet the reader** with `{{first_name}}`.
- **Be easy to read on a phone.** The body is 150 words or fewer.
- **Have exactly one main link.**
  - Sales emails use `[Get the toolkit – $29](https://fullbond.com.au/toolkit)`.
  - The first email uses `[Download your checklist](https://fullbond.com.au/free-checklist)`.
- **Stay honest and calm.**
  - Never promise a full bond back.
  - Never give legal advice.
  - Never invent urgency. A deadline may only be mentioned if it is real (LAUNCH10 ends after the first 2 weeks).
- **End with our sign-off from `brand/voice.md`** ("Here to help," then "The Fullbond Team"), then this three-line footer as plain text, never inside a code block:

You're getting this because you downloaded the free 10 Bond Mistakes checklist from Fullbond.

Fullbond · ABN {{abn}} · hello@fullbond.com.au · {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Fullbond provides general information, not legal advice.
