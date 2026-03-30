# ASN Joule Demo — Walk-Me Guide
**SAP Business Network · Advanced Shipping Notice (ASN)**

---

## Before You Start

1. Open `index.html` in **Chrome** (recommended).
2. A yellow **"Test Build"** banner appears at the bottom of the screen.
   - Click the **✕** button on the right side of the banner to dismiss it permanently, OR
   - Just open Joule — the banner auto-hides while Joule is open.

---

## The Screen Layout

| Area | What it is |
|---|---|
| **Top bar** | Shell bar — SAP logo, search, and action icons on the right |
| **Left strip** | Side navigation icons (decorative) |
| **KPI tiles** | Scrollable metric tiles below the page title |
| **Table** | "Items to Ship (38)" — the main workbench list |
| **Right panel** | Joule chat panel (hidden until you open it) |
| **Bottom bar** | Yellow "Test Build" banner — dismiss with ✕ or ignore |

### Bottom bar
A yellow **"Test Build – Internal testing version"** banner sits at the very bottom of the screen.
- **✕ button** — click it to dismiss the banner for the rest of the session. It will reappear the next time you open the file.
- **Joule open** — the banner automatically hides whenever the Joule panel is open.
- **Joule close** — the banner reappears when you close Joule (unless you already dismissed it with ✕).

### Header panel buttons
- **▲ / ▼ (collapse)** — small round button on the bottom edge of the header panel, slightly left of centre. Click it to hide/show the KPI tiles and filter bar.
- **📌 (pin)** — sits just to the right of the collapse button. Click it to pin the filter bar open.

---

## Step 1 — Open the App

You see the **Workbench** page.
- Page title: **Workbench**
- KPI tile highlighted in blue border: **Items to ship — 38**
- Table title: **Items to Ship (38)** showing purchase order lines

---

## Step 2 — Open Joule

Click the **Joule icon** (sparkle / DA icon) in the top-right area of the shell bar.

The Joule panel slides in from the right. A loading animation plays for about 1–2 seconds, then the **Welcome screen** appears with:
- "Hello Sam, How can I help you?"
- A chip button: **"Review order items to ship this week"**

---

## Step 3 — Start the Conversation

Click anywhere in the **Joule message input field** at the bottom of the Joule panel.

It auto-types:
> *"I want to review the Order items I have confirmed I will ship this week for customer ABC"*

Press the **Send button** (blue circle with paper-plane icon) or press **Enter**.

---

## Step 4 — Joule Shows Matched Items

Joule shows a card listing **6 order items** confirmed to ship this week for customer ABC, across 4 purchase orders — 3 going to Chicago (ASN-777) and 3 going to Dallas (ASN-999).

Below the card, Joule asks:
> *"Do you want to start the shipment process for these order items?"*

Two option buttons appear:

| Button | What happens |
|---|---|
| **1 — Generate one ASN per ship-to location** | Recommended path — continue to Step 5 |
| **2 — Generate one ASN per PO** | Alternative path — Joule generates by PO |

Click **Option 1**.

---

## Step 5 — Joule Reads Buyer Rules

Joule shows a spinner: *"Reading related buyer rule settings…"*

After a moment, a rule badge appears confirming:
- ✅ Rule: Packing slip autogeneration is ON
- ✅ Rule: Mandatory delivery date is ON

Then Joule says it is preparing **ASN-777 (Chicago, IL)** and **ASN-999 (Dallas, TX)**.

---

## Step 6 — Estimate Delivery Date

Joule asks (bold text):
> *"Would you like me to estimate the delivery date based on the origin, destination, and required ship date?"*

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Yes** | Joule confirms it will use the required ship date as the basis, and a date picker appears — continue to Step 7 |
| **2 — No** | Joule generates ASNs without dates, workbench updates |

Click **Option 1 — Yes**.

---

## Step 7 — Confirm or Adjust the Shipping Date

A mini calendar appears inside the Joule panel.
- Dates in **green** = on-time delivery guaranteed
- The **recommended date (April 9)** is highlighted with a green border
- Dates in **orange** = late risk

Click any **green date** (April 9 or earlier). The date becomes selected (purple circle).

Click **Confirm**.

Joule shows the date you selected as a user bubble, then a spinner: *"Reading historical data for carriers…"*

---

## Step 8 — Choose a Carrier

Joule presents two carrier options:

| Option | Details |
|---|---|
| **1 — Carrier A** (Best match) | 97% on-time, avg 2 days, $320 |
| **2 — Carrier B** (2nd best) | 91% on-time, avg 3 days, $290 |
| **3 — No Carrier assignment** | Generate without carrier |

Click **Carrier A** (Option 1) for the full demo path.

Joule fetches arrival data from the carrier system, then says:

> *"ASN-777 has been generated with estimated delivery date March 28 and ASN-999 with estimated delivery date March 29."*

**At this moment:**
- The 6 items assigned to the ASNs **disappear from the workbench table**
- The table title updates to **Items to Ship (32)**
- The **KPI tile "Items to ship" changes from 38 → 32**

---

## Step 9 — Choose What to Do Next

Joule asks (bold): **"How can I assist you next?"**

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Review generated ASNs** | Switches view to the Ship Notice list — recommended |
| **2 — Download shipping labels** | Joule generates PDF labels for both ASNs |

Click **Option 1 — Review generated ASNs**.

Joule says *"Opening ASN-777 and ASN-999 for review"* and the screen switches to the **Ship Notice** view.

---

## Step 10 — Ship Notice View

The screen now shows:
- Page title: **Ship Notice**
- KPI tile: **Ship Notice — 2** (last 24 hours)
- Table: **Ship Notice (2)** with ASN-777 and ASN-999 rows

In the Joule panel, two action buttons appear:

| Button | What happens |
|---|---|
| **1 — Edit ASN-777** | Opens a cancel/edit flow for ASN-777 |
| **2 — Edit ASN-999** | Opens ASN-999 detail page for editing |

---

## Step 11 — Edit ASN-999 (Optional)

Click **Option 2 — Edit ASN-999**.

Joule checks the edit policy, confirms editing is permitted, then opens the **ASN-999 Object Page** showing full shipment details: supplier info, ship-to address, carrier, and line items.

Joule asks: *"What would you like to modify?"*

Click the Joule input field — it auto-types:
> *"Modify the line item quantity"*

Press **Send**. Joule loads the line items and shows a picker card where you can toggle line items on/off and adjust quantities.

---

## Step 12 — Cancel ASN-777 (Optional)

From the Ship Notice list view, click the Joule input — it auto-types:
> *"Cancel 777"*

Press **Send**. Joule checks the cancellation policy (cancel is permitted before carrier pickup), then asks:
> *"Do you want to proceed?"*

Click **Yes**. Joule cancels ASN-777 and the status in the table updates to **Cancelled**.

Follow-up options appear: Reinstate, Create a replacement ASN, or Send a cancellation notice.

---

## Step 13 — Close Joule

Click the **✕ (Minimize)** button at the top-right of the Joule panel header, or click the **Joule icon** in the shell bar again.

The panel slides away. The Workbench is fully visible.

---

## Reset the Demo

Press **Cmd+R** (Mac) or **F5** (Windows) to refresh the page. Everything resets back to the start — 38 items, Joule closed.

You can also click the **↺ (Restart)** icon in the Joule header toolbar to reset the conversation without refreshing the page.

---

## Quick Reference

| What you want to do | How |
|---|---|
| Open / close Joule | Click the sparkle icon in the shell bar top-right |
| Send a message | Click the input field → text auto-types → click Send or press Enter |
| Pick an option | Click one of the numbered option buttons below Joule's message |
| Dismiss yellow banner | Click ✕ on the banner — gone for the session, back on next open |
| Banner auto-hides | Opens automatically when Joule is open, returns when Joule closes |
| Collapse KPI + filter bar | Click the small round ▲ button on the bottom edge of the header panel |
| Pin the filter bar open | Click the small round 📌 button next to the collapse button |
| Reset the demo | Refresh the browser page (Cmd+R / F5) |
