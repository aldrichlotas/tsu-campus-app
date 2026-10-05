# Surface Brief: Campus Hub

**1. Job and Audience**
TSU students, faculty, and administrative staff opening the portal between classes. They are in a high-urgency state (e.g., trying to catch a shuttle or order food quickly) and need immediate access to campus services.

**2. Outcome and Proof**
A fast, modular launchpad that immediately routes the user to one of the four utilities (Shuttle, Canteen, Print, Merch). Success is proven by a sub-3-second time-to-navigate.

**3. Selected Direction**
- **Aesthetic**: Collegiate Academic Portal (Maroon/Gold accents, Playfair headers, Manrope UI).
- **Layout**: A bold 2x2 grid of square modular tiles for quick, gross-motor thumb access.
- **Top App Bar**: A 64px header containing a prominent Campus Toggle dropdown (Main vs. Lucinda) and the student's profile badge.

**4. Scope and Boundaries**
- The screen is purely navigational; no heavy transactions occur directly on this hub.
- The Campus Toggle choice here governs the initial state of the downstream modules (e.g., selecting "Lucinda" here defaults the Canteen module to Lucinda).

**5. States and Ranges**
- **Active Campus**: Main (default) or Lucinda.
- **Loading State**: Skeleton placeholders for the 4 tiles while fetching any real-time badge counts (e.g., active queue numbers).

**6. Interaction and Layout**
- **Hierarchy**: Header (Toggle + Profile) > 2x2 Utility Grid.
- **Affordances**: The 2x2 tiles use the `academic-sm` elevation and bump to `academic-md` when pressed.

**7. Constraints**
- Standard Android mobile layout constraints (16px outer margins, 12px gutters, minimum 48px touch targets for the top bar elements).
