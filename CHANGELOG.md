# Changelog

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
