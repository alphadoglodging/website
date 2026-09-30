# AlphaDog Lodging Website

Static HTML site maintained by PartnerPress. Several developers update it from their own machines, some with Claude Code and some by hand, so the team workflow is the single source of truth:

@CONTRIBUTING.md

`README.md` is the page-by-page editing guide (file map, `EDIT` comments, adding photos and video).

## Rules for Claude Code

- Follow the workflow in `CONTRIBUTING.md` for every change: branch from an up-to-date `main`, edit only inside `site/` unless the task is about tooling or docs, run `python3 scripts/check.py`, commit, push the branch.
- Never commit to, merge into, or push to `main`. Pull requests are merged on GitHub by a person.
- Push with `git push -u origin <branch>`. If Git can't authenticate on this machine, stop and ask the user to click **Publish branch** (or **Push origin**) in GitHub Desktop.
- After pushing, give the user the pull request link Git printed, or tell them to click **Create Pull Request** in GitHub Desktop. If the `gh` CLI is installed and authenticated, offer to open the pull request with `gh pr create` instead.
- Many people on this team use GitHub Desktop, not the command line. When a step needs the user to do something in Git, name the GitHub Desktop button or menu item, not a command.
- For local preview, start the `site` configuration in `.claude/launch.json` (serves `site/` on port 8080). Check changed pages at desktop and phone width before committing.
- If `scripts/check.py` reports errors, fix them before committing. Mention any warnings to the user.
- When a change touches the header or footer, apply it to all 14 pages and confirm the check passes.
- To roll back, prefer reverting through a pull request (`git revert` on a branch, then push). Say so plainly if Netlify's instant rollback is the better fit, since only the user can do that in the Netlify dashboard.
