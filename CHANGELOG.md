# Changelog

## Pipeline installer update: October 22, 2026

- Add automatic static output detection with an editable manual preference; retain existing workflow output settings.
- Show start, finish, elapsed, and completed durations on pipeline cards, with direct access to stage logs.
- Report actual output mismatches and build diagnostics, preserve late log output, and redact saved deployment tokens.
- Use Linux dependency/build-cache volumes and a higher memory allowance for Next.js static exports; clean containers after failed or canceled runs.
- Validate frontend deployment configuration separately from build-only runs. Preserve approval and artifact-integrity checks for automatically selected output.
- 140 non-Docker regression checks passed, alongside native UI and real Docker output/approval and pull request build checks.
- Validate actual Windows installation and final DMG on Apple Silicon macOS 15 and 26. Payload scans exclude credentials, local data, examples, debug symbols, and developer paths.

## Installer update: October 22, 2026

- Full-width branch rows and context menus in the sidebar and Branches tab.
- Refresh origin ahead/behind counts after a verified push; preserve visible authentication failure details.
- Show local and hosted pipeline branches, with clear guidance when a branch has not been published to the owner host.
- Allow only the local owner action to initialize the first branch of an empty hosted repository. Later protected updates continue to require pull requests, independent approval, and passing builds.
- Clean release payloads exclude debug symbols, build paths, bundled projects, example requests, credentials, and developer configuration.
- Validated the actual Windows installation and the final DMG on Apple Silicon macOS 15 and macOS 26. 134 non-Docker regression checks passed. The real Docker integration check was not rerun for this update.


## Working changes review and installer refresh — October 21, 2026

- Added unified and side-by-side code previews for local staged and unstaged changes, with original line numbers, syntax colors, search, and change navigation.
- Added opt-in member previews with author and branch attribution, cached/offline status, and explicit apply controls.
- Kept selected previews stable during quiet refreshes; added cancellation, bounded loading, and retry handling.
- Fixed pull request selection during list refreshes.
- Refreshed the Windows x64 and Apple Silicon macOS installers. Fresh installs start empty; sample projects, examples, developer credentials, and local network settings are excluded.

## Pull requests and installer refresh — October 18, 2026

- Added owner-hosted pull requests, project-member reviews, inline discussions, and configurable branch protection.
- Added conflict previews with the file path, both branches' code, and original line numbers.
- Required successful builds of the proposed merged result before merging. Failed, missing, running, and outdated checks block a merge.
- Unified Create pull request in the sidebar and Branches menus; placed Pull requests after Changes.
- Preserved request selection during background refreshes and kept background checks quiet.
- Tightened private data-directory and local API-key permissions on macOS.
- Rebuilt Windows x64 and Apple Silicon macOS installers from clean payloads. Projects, sample requests, local credentials, and developer network settings are not included.

## Free-use license — October 16, 2026

- XGit.IO is free to download and use for individuals, teams, and businesses. No purchase or subscription is required.
- The license explicitly permits personal, educational, and business use of the published installers. Application source code remains private.
- Published the Terms and Conditions and clarified that connected third-party services may have their own charges.

## macOS installer refresh — October 16, 2026

- Fixed the Apple Silicon app bundle's missing resource seal and managed-DLL signing failure.
- Moved managed resources and native libraries into macOS bundle directories with relative links for .NET runtime lookup.
- Added ad-hoc signatures for native components and the complete app bundle, without requiring a paid signing certificate.
- Rebuilt the DMG natively on macOS with HFS+ and added signature and desktop/agent startup checks against the mounted installer.
- Updated macOS installation guidance and release checksums. The app remains unnotarized.

## v0.1.0-beta — October 15, 2026

First public desktop beta for Windows x64 and Apple Silicon macOS.

- Owner-hosted Git projects with invitations and project roles.
- Local branches, history, working changes, project boards, and team activity.
- LAN HTTPS, SSH tunnel, and self-hosted internet relay connections.
- Optional verified replica for read-only access to confirmed commits during an owner-host outage.
- Docker-backed build and test stages. Admins can run manual builds on their own computers and sync results after reconnecting.
- Owner-managed Azure deployment targets and staging/production approval rules.
- The app, taskbar, Windows installer, macOS app, and README now use the same XGit.IO icon.

The Windows installer is unsigned. The refreshed macOS app is ad-hoc signed and unnotarized. See the README for replica, deployment, and security limits.
