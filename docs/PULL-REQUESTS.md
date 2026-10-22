# Pull requests in XGit.IO

Pull requests live on the owner's host. Push your feature branch to the hosted repository, open **Pull requests**, and choose the source and target branches. GitHub and a cloud repository are not required.

The **Pull requests** tab is directly after **Changes** in both workbenches. Right-click a branch in either the project sidebar or **Branches**, then choose **Create pull request…**. Both menus open the same composer with that branch selected. Publish the branch to the owner host first. **Open origin pull request page** remains a separate action for external Git providers.

## Review and merge

- Developers and Contributors can open requests and comment. Viewers can read them.
- Owners, Admins, and Maintainers can review; assigned Developers and Contributors can also approve or request changes. Authors cannot approve their own requests.
- Owners and Admins can merge after all requirements pass. Owners can disable Maintainer merging under **Branch protection**.
- The default requires one independent approval and a passing build. Owners can increase the approval count or require owner approval. An owner-authored request with owner approval required will remain blocked; choose that policy deliberately.
- Assign reviewers when opening or editing a request. Use **Files changed** to inspect the diff. Comments can reference a repository-relative path and line number and can require resolution.
- New source or target commits invalidate prior approvals and build results. Policy changes invalidate them as well. Current requests for changes and unresolved required threads block merging.

## Conflict and build checks

Compatibility checks merge the current branches in a disposable checkout, without touching a user's working tree. The Conflicts tab shows each conflicting file, code from both branches, and its original line numbers before merging. Binary and file-level conflicts are identified without inventing text line ranges. The desktop refreshes the selected request every ten seconds while its tab is visible. Background checks do not show a progress bar; user actions do.

An Owner, Admin, or Maintainer selects **Run required build**. Docker must be installed and its Linux engine running on the owner host. Validation runs against the proposed merged result, including build and test jobs, without deployment or deployment secrets. Workflow definitions come from the target branch so a feature branch cannot remove its own required checks. Review code before running builds; a container is not a guarantee against every form of malicious code.

The default workflow path is `.xgit/workflows/static-site.yml`. Commit the workflow to the target branch before enabling work on a protected branch. The owner can configure up to four required workflows under **Branch protection**, including `.xgit/workflows/api.yml`. A missing workflow, failed build, missing build, running build, or outdated result blocks merging. Local/offline admin pipeline results are not accepted as pull request validation proofs in this preview; the owner host runs these checks.

## Protected branches and connectivity

For a completely empty hosted repository, the owner checks out the initial target branch, commits its workflow, and clicks **Publish**. The local owner action initializes that first hosted branch without changing protection settings or claiming a passing build. Other roles and direct Git pushes cannot use this initialization flow. Once the host has a branch, protected updates require feature branches and pull requests. Existing hosted repositories are never reinitialized by Publish.

`main` and `development` are protected by default on the hosted repository. Direct pushes to protected branches are rejected, including pushes by the owner. Prepare local changes on a feature branch, push that branch, then use a pull request. The owner controls the protected branch list. Protection is enforced by a Git pre-receive hook in the hosted bare repository; it does not restrict changes made in local working copies or protect against an operating-system administrator altering the repository.

The merge endpoint rechecks permissions, reviews, build evidence, discussions, and current revisions. An atomic Git reference transaction verifies both branch heads before updating the target. Merging creates a merge commit in the hosted repository; fetch/pull it into local working copies. Post-merge deployment follows the existing pipeline and environment approval settings.

Members connect over LAN, SSH, or the relay using existing project credentials. Shared review actions require the owner host online. Replicas remain read-only and do not merge or approve requests. The relay's route allowlist now includes pull requests; an older separately deployed relay must also be updated to support these routes.

## Installation

Close the previous app before updating. On Windows, run the setup `.exe`. On Apple Silicon macOS, open the `.dmg` and drag XGit.IO into Applications. The installers contain no projects, sample requests, member credentials, or machine-specific network settings. An upgrade uses the existing user's local app data; it does not copy the developer's data.

For a portable Windows preview, extract the complete ZIP into a new folder and run `XGit.IO.exe`. Keep its supporting files and Agent/Relay folders together.
