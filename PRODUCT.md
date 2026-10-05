# Product

<!-- impeccable:product-schema 1 -->

## Platform

android

## Stack

delegated: Native Android or React Native (Unified Android application)

## Users

Tarlac State University (TSU) students, faculty, and administrative staff across Main Campus and Lucinda Campus. Their primary job is moving efficiently between classes and executing day-to-day administrative/commerce tasks on campus.

## Product Purpose

A unified Collegiate Academic Portal and Campus Services application. It aims to reduce physical queue wait times at terminals, canteen counters, and print shops by at least 60% through scheduled passes, advance ordering, and express pickup counters.

## Positioning

An exclusive two-campus ecosystem strictly bounded to TSU Main and Lucinda campuses, functioning both as an academic portal and a cashless commerce engine (via markups and merchant commissions).

## Operating Context

High-frequency, high-density physical usage during class transitions and lunch hours. Interacts directly with physical infrastructure: dual-lane shuttle terminals, express canteen pickup counters, and verified print shop partner queues.

## Capabilities and Constraints

- **Campus Constraints:** All routes, vendors, and directories are strictly limited to the Main Campus ↔ Lucinda Campus corridor.
- **Authentication:** Must integrate with TSU SSO Authentication (OAuth 2.0 / OpenID Connect) to the student portal.
- **Ledger & Payments:** Integrated cashless settlement (GCash, Maya) and semester-billed ledger debits. Cash transactions are disabled for shuttle bookings.
- **Real-Time Data:** WebSocket service required for live shuttle passenger seat counters, order status pipelines, and print shop queue positions.
- **Build Requirements:** Built and validated for Android debug APK assembly (ADB emulator deployment).

## Brand Commitments

- **Tone & Identity:** Editorial Neo-Classicism merged with Contemporary Corporate SaaS, conveying historic prestige and administrative clarity.
- **Visual Evidence:** Extracted screen data (Campus Hub, Campus Shuttle, Canteen Express, Print Hub, Merch Store) captured from the Stitch MCP is available locally as a reference.
- **Design System:** Existing DESIGN.md captures the deep maroon, academic gold, Playfair Display, and Manrope specifications.

## Evidence on Hand

- Complete Product Requirement Document.
- Documented `DESIGN.md` visual system based on Collegiate Academic Portal specifications.
- Raw reference schemas for 5 core screens in `.impeccable/screens/`.

## Product Principles

1. **Queue Compression over Aesthetics:** The primary metric of success is moving physical bodies through bottlenecks faster; visual flourishes must not compromise data density or action clarity.
2. **Strict Exclusivity:** The platform belongs only to TSU Main and Lucinda; never generalize features for non-campus use cases.
3. **Institutional Authority:** Every screen should feel like an official extension of the university registrar or administration, maintaining high trust and dignity.
