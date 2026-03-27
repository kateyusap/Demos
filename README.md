# SAP Business Network — Joule Demo Suite

Scripted, single-file prototype demos showing Joule (SAP's AI assistant) integrated into the SAP Business Network supplier workbench. Built with SAPUI5 (Fiori Horizon theme), no backend required — open `index.html` in Chrome and go.

---

## Demos

| Demo | Scenario | Folder |
|---|---|---|
| **ASN-Joule-Demo** | Advanced Shipping Notice — Joule guides a supplier through generating ASNs from open order items, selecting a ship date, choosing a carrier, and reviewing or editing the resulting shipments | `ASN-Joule-Demo/` |
| **OC-Joule-Demo** | Order Confirmation — Joule helps a supplier configure workbench groupings, update auto-confirmation rules, bulk-confirm qualifying items, handle exceptions, and resolve buyer-escalated orders | `OC-Joule-Demo/` |

---

## Getting Started

**Requirements:** Chrome (recommended). No install, no server, no build step.

```
Open ASN-Joule-Demo/index.html   # ASN demo
Open OC-Joule-Demo/index.html    # Order Confirmation demo
```

Each demo is fully self-contained in its folder (`index.html` + `init.js`).

---

## How the Demos Work

- The app renders a SAPUI5 Fiori Horizon workbench with a shell bar, KPI tiles, and a data table.
- Clicking the **Joule icon** (sparkle) in the top-right opens the Joule chat panel.
- The message input **auto-types** scripted prompts — click the field, then click Send (or press Enter).
- Joule responds with cards, option buttons, spinners, and confirmations. Clicking option buttons advances the script.
- UI state (table rows, KPI counts) updates live as actions are taken in Joule.
- A yellow **"Test Build"** banner at the bottom identifies the build as a prototype; it auto-hides while Joule is open.

**Reset:** Press `Cmd+R` / `F5` to reload from scratch, or click the **↺** icon in the Joule header to restart the conversation only.

---

## Demo Walkthroughs

Detailed step-by-step scripts for presenting each demo are in the `WALKME.md` file inside each demo folder:

- [`ASN-Joule-Demo/WALKME.md`](ASN-Joule-Demo/WALKME.md)
- [`OC-Joule-Demo/WALKME.md`](OC-Joule-Demo/WALKME.md)

---

## Repository Structure

```
Demos/
├── README.md
├── index.html          # Root landing page
├── init.js             # Root init script
├── ASN-Joule-Demo/
│   ├── index.html      # ASN demo entry point
│   ├── init.js         # ASN demo logic & conversation script
│   └── WALKME.md       # Presenter walk-through guide
└── OC-Joule-Demo/
    ├── index.html      # OC demo entry point
    ├── init.js         # OC demo logic & conversation script
    └── WALKME.md       # Presenter walk-through guide
```

---

## Technology

- **SAPUI5** loaded from `ui5.sap.com` (CDN) — no local install needed
- **Theme:** `sap_horizon`
- **Libraries:** `sap.m`, `sap.uxap`, `sap.ui.layout`, `sap.f`, `sap.tnt`
- All demo data and conversation scripts are embedded in `init.js` — no external API calls
