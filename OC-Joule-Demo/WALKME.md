# OC Joule Demo — Walk-Me Guide
**SAP Business Network · Order Confirmation (OC)**

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
| **Table** | "Items to Confirm (14)" — the main workbench list |
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
- KPI tile highlighted in blue border: **Items to confirm — 14**
- Table title: **Items to Confirm (14)** showing 14 open purchase order lines grouped by PO

---

## Step 2 — Open Joule

Click the **Joule icon** (sparkle / DA icon) in the top-right area of the shell bar.

The Joule panel slides in from the right. A loading animation plays for 1–2 seconds, then the **Welcome screen** appears with:
- "Hello, How can I help you?"
- A chip button: **"Configure how my items to confirm are grouped"**

---

## Step 3 — Start the Conversation

Click anywhere in the **Joule message input field** at the bottom of the Joule panel.

It auto-types:
> *"I want to configure how my pending orders are grouped in the Items to confirm view"*

Press the **Send button** (blue circle with paper-plane icon) or press **Enter**.

---

## Step 4 — Joule Shows Current Grouping Settings

Joule says: *"Here are your current grouping settings:"* and shows a card with:
- Primary group: **Purchase Order**
- Secondary group: **None**

Then Joule presents grouping options (Delivery Date, Customer, Location, Item Category, etc.) and asks:
> *"Would you like to choose a sub-group for your primary grouping?"*

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Yes** | Joule asks how to organise within the primary group — continue |
| **2 — No** | Joule applies weekly delivery date grouping with no sub-group |

Click **Option 1 — Yes**.

---

## Step 5 — Pick a Secondary Grouping

Joule asks: *"How would you like to organise items within each primary group?"*

Click the Joule input field — it auto-types:
> *"Group by Customer within each weekly delivery date"*

Press **Send**.

Joule shows a Before / After diff card and a preview of how the table will look, then asks (bold):
> *"Should I apply this configuration?"*

Three option buttons:

| Button | What happens |
|---|---|
| **1 — Yes** | Joule applies the grouping and rebuilds the table — recommended |
| **2 — No** | Joule keeps the current settings unchanged |
| **3 — Change primary grouping to a different option** | Go back and pick a different primary group |

Click **Option 1 — Yes**.

Joule applies the grouping. The workbench table re-renders grouped by **Weekly Delivery Date → Customer**.

---

## Step 6 — Review Auto-Confirmation Rules

After confirming the grouping, Joule transitions to reviewing your auto-confirm rules.

Joule asks: *"How can I assist you next?"*

Click the Joule input field — it auto-types:
> *"I want to increase the value cap to $25,000 and reduce the auto-confirm buyer score to 80"*

Press **Send**.

Joule shows your current rules:
- Qty variance cap: 0%
- Price variance cap: 2.5%
- Delivery window: ±3 days
- Buyer score minimum: 85
- Max order value: $10,000

Then Joule proposes the changes and asks (bold):
> *"Should I apply these changes?"*

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Yes** | Joule applies the rule updates — recommended |
| **2 — No** | No changes, rules stay as-is |

Click **Option 1 — Yes**.

---

## Step 7 — Joule Analyses All 14 Items

Joule runs analysis on all pending purchase orders. A status spinner shows *"Analysing your pending purchase orders…"*

Joule presents a summary card showing how the 14 items are grouped:

| Category | Count |
|---|---|
| ✅ Ready to auto-confirm | 7 |
| ⚠️ Need your review | 3 |
| 🔴 Escalated by buyer | 2 |
| ⚪ Not yet confirmed | 2 |

Joule then asks (bold):
> *"The 7 auto-confirm items all pass your rules. Shall I confirm them now?"*

Three option buttons:

| Button | What happens |
|---|---|
| **1 — Yes — confirm all 7 items across 2 waves** | Joule confirms in batches — recommended |
| **2 — Show me the item list first** | See the items before confirming |
| **3 — Adjust thresholds before confirming** | Go back to rule settings |

Click **Option 1**.

---

## Step 8 — Auto-Confirm in 2 Waves

Joule asks once more: *"Confirm all 7 items in 2 waves?"*

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Yes — confirm now** | Joule processes both waves |
| **2 — Cancel** | Return to previous step |

Click **Option 1 — Yes — confirm now**.

**Wave 1:** Joule generates 4 OC documents for PO 4500123401 and PO 4500123405.

**Wave 2:** Joule generates 3 more OC documents for PO 4500123407 and PO 4500123402.

**At this moment:**
- The 7 confirmed items **disappear from the workbench table**
- The **KPI tile "Items to confirm" updates** to the remaining count
- Joule shows a summary card of the 7 confirmed OCs

---

## Step 9 — Handle the 3 Exception Items

Joule asks: *"What would you like to do next?"*

Three option buttons:

| Button | What happens |
|---|---|
| **1 — Review 3 items that need input** | Handle exceptions — recommended path |
| **2 — Handle 2 escalated items with high cancel risk** | Jump to escalations |
| **3 — View all Order Confirmations** | Switch to OC list view |

Click **Option 1 — Review 3 items that need input**.

Joule loads the 3 exception items and shows a card with AI-suggested responses for each:
- Partial quantity adjustments
- Adjusted delivery dates
- Price variance notes

Joule asks (bold):
> *"Do you want to accept all Joule suggestions, or override one?"*

Three option buttons:

| Button | What happens |
|---|---|
| **1 — Accept all 3 suggestions and confirm** | Joule applies all adjustments |
| **2 — Override Network HW — confirm full qty 20 on back-order** | You choose full qty instead |
| **3 — Reject Pump Housing — request buyer extend Need By** | Sends a change request to the buyer |

Click **Option 1 — Accept all 3 suggestions and confirm**.

Joule confirms the 3 items with adjustments applied. The table updates again.

---

## Step 10 — Handle the 2 Escalated Items

Joule asks: *"2 escalated items still need your attention. Handle them now?"*

Two option buttons:

| Button | What happens |
|---|---|
| **1 — Yes — review escalated items** | Continue to escalation flow — recommended |
| **2 — View all Order Confirmations** | Skip and go to OC list |

Click **Option 1 — Yes — review escalated items**.

Joule shows the 2 escalated items flagged by buyers for high cancel risk:
- **PO 4500123403 / Line 10** — buyer needs delivery by Apr 20, you can ship Apr 25
- **PO 4500123408 / Line 10** — second high-risk item

For the first item, Joule offers three options:

| Button | What happens |
|---|---|
| **1 — Confirm 50% partial (3 units) now, rest in back-order** | Split the order |
| **2 — Accept cancel risk — confirm Apr 25 delivery as-is** | Confirm with the later date |
| **3 — Escalate to account manager for buyer negotiation** | Hand it off to your manager |

Choose any option — the demo narrates what Joule does in response.

After both items are handled, Joule shows a final summary:
> *"All 12 items processed — 11 confirmed, 1 escalated to account manager"*

---

## Step 11 — View All Order Confirmations

Joule asks what to do next. Select **"View all Order Confirmations"**.

The screen switches to the **Order Confirmation list view** showing all generated OC documents with their statuses.

---

## Step 12 — Close Joule

Click the **✕ (Minimize)** button at the top-right of the Joule panel header, or click the **Joule icon** in the shell bar again.

The panel slides away. The Workbench is fully visible.

---

## Reset the Demo

Press **Cmd+R** (Mac) or **F5** (Windows) to refresh the page. Everything resets back to the start — 14 items, Joule closed.

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
