# **Product Requirement Document (PRD): TSU Collegiate Academic Portal & Campus Services**

## **1\. Executive Summary & Core Objectives**

* **Platform Scope**: A unified Android mobile application built for Tarlac State University (TSU) students, faculty, and administrative staff to streamline daily campus queue operations across transportation, dining, academic document reproduction, and student organization commerce.  
* **Campus Boundaries**: Operating strictly and exclusively across **TSU Main Campus** and **TSU Lucinda Campus**. All route pickers, vendor stalls, and print shop directories must enforce this two-campus scope.  
* **Core Objectives**:  
  * **Queue Compression**: Reduce physical queue wait times at terminals, canteen counters, and print shops by at least 60% via scheduled passes, advance ordering, and express pickup counters.  
  * **Cashless Settlement**: Provide instant e-wallet checkout (GCash, Maya) and semester-billed ledger debits tied to the student's official portal account.  
  * **Platform Monetization**: Generate recurring software revenue via fixed/percentage markups per checkout and merchant commissions on partner sales.

## **2\. Business Model & Monetization Architecture**

| Revenue Stream | Implementation Structure | Application Coverage |
| :---- | :---- | :---- |
| **Transaction Markup** | Fixed rate or percentage service fee added to digital checkout totals. | Shuttle passes, canteen orders, print jobs, and merchandise transactions. |
| **Merchant Commission** | Contracted percentage deducted from vendor payout settlements. | Accredited canteen concessionaires, collaborated partner print shops, and student organizations. |

## **3\. Application Architecture & Core Screens**

                                \+---------------------------+  
                                |  TSU SSO Authentication   |  
                                \+-------------+-------------+  
                                              |  
                                              v  
                                \+---------------------------+  
                                |        Campus Hub         |  
                                | (Dashboard Navigation)    |  
                                \+-------------+-------------+  
                                              |  
      \+---------------------+-----------------+---------------------+---------------------+  
      |                     |                                       |                     |  
      v                     v                                       v                     v  
\+------------+     \+------------------+                   \+------------------+     \+--------------+  
|   Campus   |     |     Canteen      |                   |    Print Hub     |     | Merch Store  |  
|  Shuttle   |     |     Express      |                   | (Partner Shops)  |     |  (CBA/Orgs)  |  
\+------------+     \+------------------+                   \+------------------+     \+--------------+

### **Screen Flow & Routing**

> 1. **Screen 1 — Campus Hub (/)**: Central launchpad displaying the student profile badge, active campus toggle (Main vs. Lucinda), and modular navigation tiles for all four campus utilities.  
> 2. **Screen 2 — Campus Shuttle (/shuttle)**: Terminal departure board, bidirectional route selector, capacity monitor, seat checkout, and active digital ticket view.  
> 3. **Screen 3 — Canteen Express (/canteen)**: Campus dining selector, vendor stall menus, dietary tag filters, order staging cart, and real-time prep tracker.  
> 4. **Screen 4 — Print Hub (/print)**: Collaborated print shop directory, document upload handler, job queue estimator, and express counter ticket.  
> 5. **Screen 5 — Merch Store (/merch)**: College directory with CBA student organization filter chips, product catalogs, sizing matrices, and pre-order scheduling.

## **4\. Module Functional Specifications**

### **4.1 Campus Shuttle Services**

* **Restricted Route Corridor**: Limited exclusively to the bidirectional corridor between **Main Campus Terminal** and **Lucinda Campus Terminal** (\$\\text{Main Campus} \\leftrightarrow \\text{Lucinda Campus}\$). Intermediate or unlisted routes are disabled.  
* **Fare & Financial Rules**:  
  * Fixed fare of **25 PHP** per online ticket booking.  
  * Online cash reservations are **strictly prohibited** to prevent abandoned seats and terminal no-shows.  
  * Accepted payment methods: Connected e-wallets or direct debits against the **Student Account / Portal Ledger** (billed and settled per academic semester).  
  * Online tickets are **strictly non-refundable** once issued.  
* **Terminal Boarding Logic**: Dual-lane processing separating unscheduled walk-in passengers from digital pass holders.  
* **Ticket View Data**: Active Ticket ID, Assigned Vehicle Unit Number, Shuttle Type, Departure Terminal, Arrival Terminal, Scheduled ETD, Real-time ETA, Available Seat Counter, and Non-Refundable legal disclaimer.

### **4.2 Canteen Express Pre-Ordering**

* **Campus Concession Scope**: Restricted strictly to official campus food courts:  
  * **TSU Main Campus Canteen**

  * **TSU Lucinda Campus Canteen**

* **Order & Prep Pipeline**:  
  * Vendor catalog with food imagery, PHP pricing, allergy/dietary tags, and custom preparation instructions.  
  * Live status pipeline: \$\\text{Order Sent} \\longrightarrow \\text{Preparing} \\longrightarrow \\text{Ready for Pickup}\$.  
  * Dynamic scannable pickup QR code generated upon order confirmation for express window handoff.  
* **Payment Terms**: Online payment via e-wallet/student account, or cash-on-pickup at the designated counter.

### **4.3 Campus Print Hub**

* **Partner Facility Scope**: Displays **only** third-party print shops and campus reprographic centers holding verified official partnerships or collaborations with TSU. Unverified independent vendors are excluded.  
* **Advance Upload Workflow**:  
  * Remote file submission form containing Subject, Sender Name, Print Instructions (color/grayscale, page range, binding), and document attachment uploads (PDF, DOCX, PPTX).  
  * Staff-side queue processing allowing operators to print documents prior to the student arriving at the shop.  
* **Fulfillment & Billing**: Support for online prepay or cash settlement at the express counter; displays active queue depth and estimated completion time.

### **4.4 Departmental Merchandise & Student Organizations**

* **Hierarchical Navigation**: \$\\text{College Directory} \\longrightarrow \\text{Course / Student Organization Filter} \\longrightarrow \\text{Product Catalog}\$.  
* **College of Business Administration (CBA) Organization Structure**:  
  * **JPIA**: Junior Philippine Institute of Accountants — TSU Chapter  
  * **JFINEX**: Junior Financial Executives — TSU Chapter  
  * **YES**: Young Entrepreneurs' Society — TSU  
  * **JMA**: Junior Marketing Association — TSU Chapter  
  * **HTM**: Hospitality and Tourism Management Society — TSU  
  * **JPES**: Junior Philippine Economics Society — TSU Chapter  
  * **Organization Placeholders**: Dedicated slots for additional university clubs and course organizations.  
* **Catalog & Purchasing Requirements**:  
  * Organization-tagged inventory (lanyards, department uniforms, jackets, pins, academic accessories).  
  * Sizing charts, designated physical claim points on campus, and pickup batch date schedules.  
  * Payment via online checkout or cash-on-claim.

## **5\. Visual Design System Contract (Collegiate Academic Portal)**

The user interface embodies an **Editorial Neo-Classicism** aesthetic balanced by **Contemporary Corporate SaaS** clarity.

### **5.1 Color Tokens**

| Token Name | Hex Code | Role & Placement |
| :---- | :---- | :---- |
| **primary** | \#800000 | Deep Institutional Maroon. Top navigation bars, primary CTA buttons, active route states, key brand marks. |
| **primary-dark** | \#570000 | Deepest Maroon shade for hover and pressed button states. |
| **primary-container** | \#FFDAD4 | Soft maroon container background for active tabs and alerts. |
| **secondary** | \#FFC632 | Academic Gold / Amber. Interactive focus rings, notification badges, honors tags, secondary CTA pills. |
| **tertiary** | \#1B2336 | Deep Academic Navy / Charcoal. Sub-navigation headers, table columns, card headers, dark container backdrops. |
| **neutral** | \#222222 | Obsidian Charcoal. Primary body typography, icons, input labels. |
| **surface** | \#F4F5F7 | Cool slate background underpinning all portal views. |
| **surface-card** | \#FFFFFF | Pure white container surface for modular service tiles. |
| **border-subtle** | \#E2E5EB | Hairline border framing all service cards and form elements. |
| **cba-primary** | \#4A4A4A | Slate Gray override for College of Business Administration departmental headers. |
| **cba-accent** | \#222222 | Dark Obsidian override for CBA organization badges and cards. |

### **5.2 Typography System**

Display / Headlines   : Playfair Display (Transitional Editorial Serif)  
Body / UI / Forms     : Manrope (Geometric High-Legibility Sans-Serif)  
Metadata / Statuses   : Manrope label-caps (Uppercase \+ 0.08em tracking)

| Type Token | Font Family | Size | Weight | Line Height | Tracking | Usage |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **headline-lg-mobile** | Playfair Display | 26px | 600 | 32px | Normal | Screen hero headers, main dashboard greeting |
| **headline-sm** | Playfair Display | 22px | 600 | 28px | Normal | Section headings, module modal titles |
| **title-lg** | Manrope | 18px | 700 | 26px | Normal | Top App Bar title (64px header), Card headlines |
| **title-md** | Manrope | 16px | 600 | 24px | Normal | Service card titles, vendor names, route labels |
| **body-md** | Manrope | 14px | 400 | 22px | Normal | Descriptions, form inputs, ticket metadata |
| **body-sm** | Manrope | 12px | 400 | 18px | Normal | Secondary sub-labels, estimated transit times |
| **label-lg** | Manrope | 14px | 600 | 20px | 0.01em | Primary CTA button labels (48px buttons) |
| **label-md** | Manrope | 12px | 600 | 16px | 0.02em | CBA student org filter chips (JPIA, JFINEX) |
| **label-caps** | Manrope | 11px | 700 | 16px | 0.08em | Status badges (NON-REFUNDABLE, PREPARING) |

### **5.3 Shape, Border & Elevation Rules**

* **Border Radii**:  
  * sm / Base (4px / 0.25rem): Form inputs, select dropdowns, search bars, table rows, and rectangular department tags.  
  * lg / Container (8px / 0.5rem): Service tiles, ticket cards, bottom sheets, and modal frames.  
  * full / Pill (9999px): Filter chips, count indicators, status pills, and round action buttons.  
* **Hairline Borders**: 1px solid \#E2E5EB applied across all resting cards and input fields.  
* **Academic Shadow Elevation**:  
  * Low (academic-sm): 0 2px 4px rgba(27, 35, 54, 0.04), 0 1px 2px rgba(27, 35, 54, 0.02) on resting cards.  
  * Mid (academic-md): 0 8px 16px rgba(27, 35, 54, 0.08), 0 2px 6px rgba(27, 35, 54, 0.04) on active/hovered cards.

## **6\. Android Mobile Constraints & Layout Architecture**

* **Top App Bar**: Fixed 64px height with 16px safe-area top inset padding for the Android status bar. Left slot houses back navigation; center slot displays 18px Playfair/Manrope screen title; right slot houses cart or user avatar.  
* **Bottom Action Bar**: Fixed 80px bottom sticky container housing primary call-to-action buttons (48px height, label-lg font, \#800000 Maroon or \#FFC632 Gold) on transactional screens.  
* **Touch Targets**: Minimum \$48 \\times 48\\text{ px}\$ interactive touch targets across all icons, filter chips, and list selections.  
* **Android Hardware/Gesture Navigation**: Full integration with the Android navigation back-stack to maintain chronological sub-route reversal.

## **7\. Technical & Non-Functional Specifications**

* **Authentication & Single Sign-On (SSO)**: OAuth 2.0 / OpenID Connect integration linking directly to the university's student portal authentication provider.  
* **Ledger Settlement API**: Dedicated backend integration for appending non-refundable 25 PHP shuttle charges and verified merchant debits to the student's semester ledger.  
* **Real-time Pipeline**: WebSocket service powering the live shuttle passenger seat counter, order status pipeline (Order Sent \$\\rightarrow\$ Preparing \$\\rightarrow\$ Ready for Pickup), and print shop queue positions.  
* **Compilation Pipeline**: Built and validated for Android debug APK assembly (./gradlew assembleDebug) and ADB emulator deployment using the Antigravity Android CLI plugin.