# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** Jelo
- **Date:** 2026-10-06
- **Prepared by:** TestSprite AI Team / Antigravity

---

## 2️⃣ Requirement Validation Summary

### 🚌 Requirement: Campus Shuttle Booking
*Users must be able to book shuttle passes between campuses, choose seats, and view their interactive QR boarding pass.*

#### Test TC001 Book a shuttle pass and view the ticket
- **Test Code:** [TC001_Book_a_shuttle_pass_and_view_the_ticket.py](./TC001_Book_a_shuttle_pass_and_view_the_ticket.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** The application correctly deducts the ₱25.00 fare, generates a unique ticket, and displays the QR pass.
---

#### Test TC010 Book the opposite shuttle route with a different seat
- **Test Code:** [TC010_Book_the_opposite_shuttle_route_with_a_different_seat.py](./TC010_Book_the_opposite_shuttle_route_with_a_different_seat.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Bidirectional route selection and seat picker logic perform as expected without conflicts.
---

### 🏛 Requirement: Dashboard & Global Context
*The dashboard must reflect dynamic state changes when the active campus is toggled, including quick actions and live trackers.*

#### Test TC002 Switch campus context on the dashboard
- **Test Code:** [TC002_Switch_campus_context_on_the_dashboard.py](./TC002_Switch_campus_context_on_the_dashboard.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Global state propagates flawlessly. Shuttle recommendations and trackers react to the active campus context.
---

#### Test TC011 View dashboard service shortcuts for the active campus
- **Test Code:** [TC011_View_dashboard_service_shortcuts_for_the_active_campus.py](./TC011_View_dashboard_service_shortcuts_for_the_active_campus.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Quick access grid functions properly, rendering dynamic stats based on the active session context.
---

### 👕 Requirement: Merch Catalog & Checkout
*Students must be able to browse department merchandise, select variations (e.g. size), modify cart quantities, and finalize orders.*

#### Test TC003 Select a merch size, add to cart, and checkout
- **Test Code:** [TC003_Select_a_merch_size_add_to_cart_and_checkout.py](./TC003_Select_a_merch_size_add_to_cart_and_checkout.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Item sizes are correctly persisted into the cart and appear in the successful checkout line-items.
---

#### Test TC007 Choose merch size and complete checkout from the cart
- **Test Code:** [TC007_Choose_merch_size_and_complete_checkout_from_the_cart.py](./TC007_Choose_merch_size_and_complete_checkout_from_the_cart.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** The bottom sheet modal cart supports immediate checkout with ledger balance validation.
---

#### Test TC012 Browse merch by organization and mark a product as favorite
- **Test Code:** [TC012_Browse_merch_by_organization_and_mark_a_product_as_favorite.py](./TC012_Browse_merch_by_organization_and_mark_a_product_as_favorite.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Organization filters correctly filter the merch catalog array and the persistent favorites toggle works.
---

#### Test TC014 Update merch cart contents before checkout
- **Test Code:** [TC014_Update_merch_cart_contents_before_checkout.py](./TC014_Update_merch_cart_contents_before_checkout.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Users can effectively augment or decrement items using the inline cart controls. Empty carts properly disable the checkout button.
---

### 🍔 Requirement: Canteen Express Pre-Order
*Students must be able to browse food stalls, add multiple items, modify their order, and track kitchen preparation status.*

#### Test TC004 Adjust canteen cart quantity and complete checkout
- **Test Code:** [TC004_Adjust_canteen_cart_quantity_and_complete_checkout.py](./TC004_Adjust_canteen_cart_quantity_and_complete_checkout.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Incrementing and decrementing canteen food items correctly scales the subtotal and fees.
---

#### Test TC006 Browse canteen items by category and add food to cart
- **Test Code:** [TC006_Browse_canteen_items_by_category_and_add_food_to_cart.py](./TC006_Browse_canteen_items_by_category_and_add_food_to_cart.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Navigation through stall categories functions without crashing or dropping state.
---

#### Test TC013 Continue canteen order tracking after checkout
- **Test Code:** [TC013_Continue_canteen_order_tracking_after_checkout.py](./TC013_Continue_canteen_order_tracking_after_checkout.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Post-checkout, the Live Tracker widget appears on the Dashboard displaying a simulated kitchen timer status.
---

### 🖨 Requirement: Print Hub Submission
*Users must be able to configure document print settings (color, copies) and submit print jobs for express pickup.*

#### Test TC005 Submit a print job and receive pickup details
- **Test Code:** [TC005_Submit_a_print_job_and_receive_pickup_details.py](./TC005_Submit_a_print_job_and_receive_pickup_details.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Print job cost calculations correctly apply rates for Full Color vs Grayscale pages.
---

#### Test TC008 Submit a print job and receive a pickup PIN
- **Test Code:** [TC008_Submit_a_print_job_and_receive_a_pickup_PIN.py](./TC008_Submit_a_print_job_and_receive_a_pickup_PIN.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Successful submission correctly yields a 4-digit pickup PIN for the partnered print shop.
---

#### Test TC009 Open the print hub and start a print submission
- **Test Code:** [TC009_Open_the_print_hub_and_start_a_print_submission.py](./TC009_Open_the_print_hub_and_start_a_print_submission.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Page routing transitions securely to the print submission modal.
---

#### Test TC015 Change print settings before submitting a document
- **Test Code:** [TC015_Change_print_settings_before_submitting_a_document.py](./TC015_Change_print_settings_before_submitting_a_document.py)
- **Status:** ✅ Passed
- **Analysis / Findings:** Modifying settings successfully updates the real-time pricing preview before deducting from the student ledger.
---


## 3️⃣ Coverage & Matching Metrics

- **100.00%** of tests passed

| Requirement                          | Total Tests | ✅ Passed | ❌ Failed |
|--------------------------------------|-------------|-----------|-----------|
| Campus Shuttle Booking               | 2           | 2         | 0         |
| Dashboard & Global Context           | 2           | 2         | 0         |
| Merch Catalog & Checkout             | 4           | 4         | 0         |
| Canteen Express Pre-Order            | 3           | 3         | 0         |
| Print Hub Submission                 | 4           | 4         | 0         |
| **Total**                            | **15**      | **15**    | **0**     |

---

## 4️⃣ Key Gaps / Risks

- **Mock Data Limitations:** All transactions are interacting with an in-memory `DemoContext`. Refreshing the React Native packager currently resets the balance and active orders. Before launching to staging, all Contexts must be backed by secure API endpoints.
- **Ledger Balances & Security:** Currently, "Insufficient Ledger Balance" triggers a simple client-side alert. A real backend check with appropriate 402 HTTP handling is required, alongside locking checkout buttons globally to prevent race conditions during transaction processing.
- **Playwright / Web Limitations:** While these React Native components tested perfectly in an Expo Web environment via TestSprite, native capabilities (like hardware back-button handling, physical NFC ID taps, and deep linking for print jobs) require dedicated physical device QA.
---
