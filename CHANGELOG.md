# Changelog

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
