# Updating the AlphaDog Lodging Website

How PartnerPress developers make, review, publish, and roll back changes to this site. Follow it whether you work by hand or with Claude Code. Every step can be done either on the command line or in GitHub Desktop: see [Making a Change With GitHub Desktop](#making-a-change-with-github-desktop). `README.md` covers the page files and the `EDIT` comment convention.

## How the Site Is Built and Deployed

- Plain HTML, CSS, and JavaScript. No CMS, database, or build step.
- Everything published lives in `site/`. Files outside it (docs, `scripts/`, config) are never published.
- The GitHub repository is connected to Netlify:
  - Merging into `main` publishes to the live site within a minute or two.
  - Every pull request gets a Netlify Deploy Preview with its own URL, posted on the pull request.
- `main` always matches the live site. Nobody commits to it directly: all changes arrive through pull requests.

## One-Time Setup on a New Machine

1. **Access.** Ask the site lead to add your GitHub account to the repository. Netlify access is optional and only needed for instant rollbacks (see below).
2. **Tools.** Install:
   - Git, or GitHub Desktop (desktop.github.com) if you'd rather not use the command line.
   - Python 3: preinstalled on macOS; on Windows, install it from python.org. Used only for the local preview and the checks.
   - A text editor.
   - Claude Code is optional.
3. **Clone the repository.**
   ```
   git clone <repository-url> alphadoglodging
   cd alphadoglodging
   ```
   In GitHub Desktop: **File > Clone Repository**, then choose `alphadoglodging/website`.
4. **Set your identity** if Git doesn't already have it, so commits are attributed to you (GitHub Desktop handles this when you sign in):
   ```
   git config user.name "Your Name"
   git config user.email "you@example.com"
   ```

## Making a Change

1. **Start from the live version.**
   ```
   git switch main
   git pull
   ```
2. **Create a branch** named for the change:
   ```
   git switch -c update/holiday-hours
   ```
3. **Edit files in `site/`.** The header and footer are repeated in every HTML file. A change to the menu, phone number, hours, or footer must be made in every page (use find-and-replace across `site/`).
4. **Preview locally.**
   ```
   python3 -m http.server 8080 --directory site
   ```
   Open http://localhost:8080 and check the pages you changed, including at phone width. On Windows, use `py` in place of `python3`.
5. **Run the checks.**
   ```
   python3 scripts/check.py
   ```
   Errors must be fixed before committing. The script checks for:
   - Broken local links and missing images.
   - Leftover WordPress `wp-content` links.
   - Header or footer differences between pages.
   - Redirects in `site/_redirects` that point to a page that doesn't exist.

   Warnings (large images, `$XX` placeholders) are worth fixing but don't block.
6. **Commit.** Keep one logical change per commit. Write the message in the imperative, describing what a site visitor would notice, for example "Update holiday closure dates on contact page".
   ```
   git add site/
   git commit -m "Update holiday closure dates on contact page"
   ```
7. **Push and open a pull request.**
   ```
   git push -u origin update/holiday-hours
   ```
   Git prints a link to open a pull request on GitHub. In the description, say what changed and why. Netlify adds a Deploy Preview link to the pull request: send that to the client when they need to approve the change.
8. **Merge.** When the preview looks right and any needed approval is in, merge the pull request on GitHub using **Squash and merge**. That makes each update a single commit on `main`, which keeps rollbacks to one step. Delete the branch afterward (GitHub offers a button).

Small fixes (a typo, a single price) may be merged by their author once the Deploy Preview is checked. Anything touching layout, the header or footer, `css/styles.css`, or `js/main.js` gets a second look from another developer or the site lead.

## Making a Change With GitHub Desktop

The same workflow, without the command line.

1. **Start from the live version.** Set **Current Branch** to `main`, then click **Fetch origin**, and **Pull origin** if it appears.
2. **Create a branch.** **Current Branch > New Branch**, name it for the change (for example `update/holiday-hours`), and base it on `main`.
3. **Edit files in `site/`** in your text editor. **Repository > Show in Finder** opens the folder. The same header and footer rule applies: change every page.
4. **Preview locally.** Double-click `site/index.html` (or any page) to open it in your browser. Every link on the site is relative, so pages open correctly this way.
5. **Run the checks.** **Repository > Open in Terminal**, then paste `python3 scripts/check.py` and press Return. Fix any errors it lists. Claude Code users can ask Claude to run the checks instead.
6. **Commit.** On the **Changes** tab, review the changed files, write a summary such as "Update holiday closure dates on contact page", and click **Commit to update/holiday-hours**.
7. **Publish and open a pull request.** Click **Publish branch**, then **Preview Pull Request** or **Create Pull Request**. GitHub opens in your browser: describe the change and create the pull request. Netlify adds the Deploy Preview link a minute or two later.
8. **Merge** on GitHub as described above (**Squash and merge**, then delete the branch). Back in GitHub Desktop, switch to `main` and click **Pull origin** so your copy matches the live site.

To bring newer changes from `main` into your branch before merging: **Branch > Update from main**.

## Working Alongside Other Developers

- Keep branches short-lived. Merge or close them within a few days.
- If `main` changed while your branch was open, bring those changes in before merging. Resolve any conflicts, then rerun the checks:
  ```
  git switch update/your-branch
  git pull origin main
  ```
- Header and footer changes touch every page and conflict with almost any other open branch. Say so in the team channel before starting one.
- Never force-push `main` and never rewrite its history: that history is the rollback record.

## Rolling Back

Choose by urgency.

**Undo one update (normal case).** Open the merged pull request on GitHub and click **Revert**. GitHub creates a new pull request that undoes it. Merge that, and the site returns to its previous state. The same thing from the command line:
```
git switch main
git pull
git revert <commit>
git push
```
Find the commit with `git log --oneline` (or `git log --oneline -- site/<file>` for one file's history).

**Live site is broken right now (needs Netlify access).**
1. In Netlify, open **Deploys**, choose the last good deploy, and click **Publish deploy**. The site switches back immediately.
2. This locks auto publishing, so merges to `main` stop going live.
3. Fix `main` with a revert as above, then click **Unlock auto publishing** in Netlify.
