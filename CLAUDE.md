# AlphaDog Lodging Website

Static HTML site for AlphaDog Lodging, maintained by PartnerPress. No CMS, no database, no build step. `README.md` is the client-facing editing guide: read it for page layout and the `EDIT` comment convention.

## Layout

- `site/`: everything that gets published. Netlify serves this folder as is (see `netlify.toml`).
- Outside `site/` (this file, `README.md`, `netlify.toml`, `.claude/`): maintenance only, never published.

## Hosting and Deploys

- GitHub repository, connected to Netlify.
- Pushing to `main` publishes to the live site within a minute or two.
- Pushing any other branch creates a branch deploy at `https://<branch-name>--<netlify-site-name>.netlify.app` (Netlify's "Branch deploys: All" setting), which is how changes get previewed before going live.

## Update Workflow

Follow these steps for every change unless the user says otherwise.

1. **Sync.** `git checkout main && git pull` so work starts from what is live.
2. **Branch.** `git checkout -b update/<short-description>` (for example `update/holiday-hours`).
3. **Edit.** Make the change inside `site/`. The header and footer are duplicated in all 14 HTML files: a change to the menu, phone number, hours, or footer must be made in every one.
4. **Preview locally.** Start the `site` preview server from `.claude/launch.json` (serves `site/` on port 8080) and check the affected pages, including at mobile width.
5. **Check.** Before committing, run the pre-commit checks below.
6. **Commit.** One logical change per commit. Message in the imperative, describing the change as the client would see it (for example "Update holiday closure dates on contact page").
7. **Preview on Netlify.** `git push -u origin <branch>`, then give the user the branch deploy URL to review or send to the client.
8. **Publish.** Only after the user approves: merge into `main` with `git checkout main && git merge --no-ff <branch> && git push`, then delete the branch locally and on GitHub.

Tiny, low-risk fixes (a typo, one price) may go straight to `main` if the user asks, but still get their own commit.

Never force-push `main` and never rewrite its history: the history is the rollback record.

## Pre-Commit Checks

- No links back into the old WordPress site: `grep -rn "wp-content\|wp-includes" site/` should return nothing.
- Every local `href` and `src` points to a file that exists in `site/`.
- Header and footer are still identical across all 14 pages if either was touched.
- New images are resized for the web (roughly 2000px on the long edge or less, under 500 KB where possible).
- No placeholder text (`$XX`, `EDIT`-only stubs) is being published unintentionally.

## Rollback

Two options, depending on urgency:

- **Instant (live site is broken now):** In Netlify, open Deploys, pick the last good deploy, and click "Publish deploy". This locks auto publishing, so pushes to `main` stop going live until it is unlocked. Then fix `main` using the next option and unlock auto publishing.
- **Permanent:** `git revert <commit>` (or `git revert -m 1 <merge-commit>` for a merged branch), commit, and push to `main`. Prefer revert over reset so the history stays intact.

To see what changed and when: `git log --oneline -- site/<file>`.
