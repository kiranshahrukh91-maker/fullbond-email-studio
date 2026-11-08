# Fullbond Email Studio

A workspace for planning, writing and checking email campaigns for [Fullbond](https://fullbond.com.au), which sells the Melbourne Renter Toolkit (Move-In Kit $12, Move-Out Kit $15, Complete Toolkit $25). The list is grown with a free checklist, "10 Bond Mistakes".

Email is sent through Resend and checkout is on Payhip. Drafts are written in plain Australian English in Fullbond's warm, calm, practical voice.

## Folders

| Folder | What it holds |
|---|---|
| `brand/` | Voice, tone and style guidance (`voice.md`) |
| `leads/` | Notes about the list and lead magnet (no real subscriber data) |
| `campaigns/` | One subfolder per campaign: plans and email drafts |
| `notes/` | Research and decisions, including the build plan, which is the source of truth for products, prices and the welcome series |
| `review/` | Output and schema for the automatic email review |
| `scripts/` | `review.mjs`, the headless review script |
| `.claude/` | Project rules, skills and the Resend send guard hook |

## Automatic email review

```
node scripts/review.mjs campaigns/<campaign-folder>
```

This runs Claude Code in a separate headless session. It checks every email against `brand/voice.md` and `.claude/rules/emails.md`, then saves the results to `review/findings.json` in the format set by `review/findings.schema.json`.

Each finding has `file`, `line`, `severity` (high, medium or low), `problem` and `fix`.

| Exit code | Meaning |
|---|---|
| 0 | No high-severity findings |
| 1 | At least one high-severity finding |
| 2 | The review itself failed (for example, no credit or bad output) |

If the same folder was reviewed last time, the previous findings are passed back so only new or unfixed problems are reported.

`campaigns/test-bad` is a deliberately faulty email used to test the reviewer.

If `ANTHROPIC_API_KEY` is set in your shell, Claude Code uses it instead of your subscription login. To use your subscription, run `env -u ANTHROPIC_API_KEY node scripts/review.mjs <folder>`.

## Rules

- Never send email to real people. Sending is allowed only to `@resend.dev` test addresses and the owner's own address, and a hook enforces this.
- Every email needs the Fullbond name, a contact address and an unsubscribe link (Spam Act 2003).
- Fullbond gives general information, not legal advice.
- Never guarantee a bond refund, use fake urgency or scarcity, or use reviews we don't have.

See `CLAUDE.md` and `brand/voice.md` for the full rules.
