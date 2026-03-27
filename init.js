sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Sorter",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Select",
  "sap/m/MultiInput",
  "sap/m/Token",
  "sap/m/Table",
  "sap/m/Column",
  "sap/m/ColumnListItem",
  "sap/m/Link",
  "sap/m/Toolbar",
  "sap/m/ToolbarSpacer",
  "sap/m/ToolbarSeparator",
  "sap/m/Button",
  "sap/m/MenuButton",
  "sap/m/Menu",
  "sap/m/MenuItem",
  "sap/m/Title",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/Label",
  "sap/m/MessageToast",
  "sap/m/Avatar",
  "sap/ui/core/HTML",
  "sap/ui/core/Item",
  "sap/m/ComboBox",
  "sap/m/GroupHeaderListItem",
  "sap/m/ObjectStatus"
], function (
  JSONModel, Sorter, Text, Input, Select, MultiInput, Token,
  Table, Column, ColumnListItem, Link,
  Toolbar, ToolbarSpacer, ToolbarSeparator, Button, MenuButton, Menu, MenuItem,
  Title, VBox, HBox, Label, MessageToast, Avatar,
  HTML, Item, ComboBox, GroupHeaderListItem, ObjectStatus
) {
  "use strict";

  /* ────────────────────────────────────────────────────────────
     SAP ICON HELPER
  ──────────────────────────────────────────────────────────── */
  function _bnIcon(name, size, extraStyle) {
    var sz   = size || 16;
    var info = sap.ui.core.IconPool.getIconInfo("sap-icon://" + name);
    var char = info ? info.content : "";
    var base = "font-family:'SAP-icons';speak:none;font-style:normal;font-weight:normal;"
             + "font-size:" + sz + "px;width:" + sz + "px;height:" + sz + "px;"
             + "display:inline-flex;align-items:center;justify-content:center;line-height:1;";
    return '<span style="' + base + (extraStyle || "") + '">' + char + '</span>';
  }

  /* ────────────────────────────────────────────────────────────
     GLOBAL STYLES
  ──────────────────────────────────────────────────────────── */
  var oStyleEl = document.createElement("style");
  oStyleEl.textContent = `
    html,body{height:100%;margin:0;padding:0;overflow:hidden;font-family:"72","72full",Arial,Helvetica,sans-serif;}
    #content{height:100%;display:flex;flex-direction:column;}

    .bn-shell{display:flex;align-items:center;background:#fff;padding:8px 48px 8px 14px;gap:120px;flex-shrink:0;box-shadow:0 0 2px rgba(34,54,73,.2),0 2px 4px rgba(34,54,73,.2);z-index:100;position:relative;box-sizing:border-box;}
    .bn-shell-left{display:flex;align-items:center;gap:16px;height:52px;flex-shrink:0;}
    .bn-shell-logo-wrap{display:flex;align-items:center;flex-shrink:0;}
    .bn-shell-menu-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;border:none;background:transparent;cursor:pointer;flex-shrink:0;}
    .bn-shell-menu-btn:hover{background:rgba(0,0,0,.06);}
    .bn-shell-brand-btn{display:flex;align-items:center;justify-content:center;gap:6px;min-height:36px;padding:10px;border-radius:8px;border:1px solid transparent;background:transparent;cursor:pointer;white-space:nowrap;flex-shrink:0;}
    .bn-shell-brand-btn:hover{background:rgba(0,0,0,.05);}
    .bn-shell-brand-text{font-family:"72","72full",Arial,sans-serif;font-size:16px;font-weight:700;color:#002a86;line-height:1;}
    .bn-shell-brand-arrow{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .bn-test-tag{display:flex;align-items:center;background:#f8d6ff;border:1px solid #f8d6ff;color:#a100c2;font-size:12px;font-weight:700;font-family:"72","72full",Arial,sans-serif;border-radius:8px;padding:3px 8px;white-space:nowrap;flex-shrink:0;line-height:16px;}
    .bn-shell-center{position:absolute;left:0;right:0;display:flex;justify-content:center;pointer-events:none;}
    .bn-search-wrap{width:400px;display:flex;align-items:center;background:#eff1f2;border-radius:18px;box-shadow:inset 0 0 0 1px rgba(85,107,129,.25);padding:4px 4px 4px 0;height:36px;box-sizing:border-box;position:relative;pointer-events:all;}
    .bn-search-menu-btn{display:flex;align-items:center;justify-content:end;padding-right:5px;width:100px;flex-shrink:0;}
    .bn-search-select-inner{display:flex;align-items:center;gap:6px;min-height:26px;padding:5px 8px;border-radius:8px;border:1px solid transparent;background:transparent;cursor:pointer;}
    .bn-search-select-inner:hover{background:rgba(0,0,0,.05);}
    .bn-search-select-text{font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#556b82;flex:1;min-width:0;}
    .bn-search-select-arrow{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .bn-search-sep{width:1px;height:24px;background:#556b81;border-radius:12px;flex-shrink:0;}
    .bn-search-input{flex:1;border:none;background:transparent;outline:none;font-family:"72","72full",Arial,sans-serif;font-size:14px;font-style:italic;color:#556b82;padding:0 8px;}
    .bn-search-btn{background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;flex-shrink:0;}
    .bn-search-btn:hover{background:rgba(0,0,0,.06);}
    .bn-shell-right{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-left:auto;flex-shrink:0;}
    .bn-shell-enterprise-wrap{display:flex;align-items:center;gap:16px;flex-shrink:0;}
    .bn-shell-enterprise{font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;}
    .bn-shell-divider{width:1px;height:24px;background:#d9d9d9;flex-shrink:0;}
    .bn-shell-actions{display:flex;align-items:center;gap:8px;}
    .bn-icon-btn{background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:8px;flex-shrink:0;}
    .bn-icon-btn:hover{background:rgba(0,0,0,.06);}
    .bn-avatar{width:32px;height:32px;border-radius:50%;background:#e76500;color:#fff;font-family:"72","72full",Arial,sans-serif;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;flex-shrink:0;}
    .bn-avatar-dot{position:absolute;bottom:0;right:0;width:10px;height:10px;background:#6bb700;border-radius:50%;border:2px solid #fff;}

    .bn-app{display:flex;flex:1;min-height:0;overflow:hidden;}

    .bn-sidenav{width:62px;min-width:62px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 0 2px rgba(34,53,72,.2),0 2px 4px rgba(34,53,72,.2);z-index:5;flex-shrink:0;height:100%;}
    .bn-sidenav-content{flex:1;display:flex;flex-direction:column;gap:4px;padding:8px 8px 0 8px;}
    .bn-nav-item{display:flex;align-items:center;width:48px;height:32px;padding-left:2px;padding-right:14px;border-radius:8px;border:none;background:#fff;cursor:pointer;position:relative;overflow:hidden;flex-shrink:0;box-sizing:border-box;}
    .bn-nav-item:hover{background:#f5f5f5;}
    .bn-nav-item.active{background:#ebf8ff;}
    .bn-nav-item.active .bn-nav-indicator{display:block;}
    .bn-nav-indicator{display:none;position:absolute;left:0;top:0;bottom:0;width:3px;background:#0064d9;}
    .bn-nav-icon-wrap{display:flex;align-items:center;justify-content:center;width:44px;height:100%;flex-shrink:0;padding:8px 14px;margin-right:-12px;box-sizing:border-box;}
    .bn-nav-item.active .bn-nav-icon-wrap{margin-right:-3px;}
    .bn-nav-arrow{display:none;align-items:center;justify-content:center;width:12px;height:12px;flex-shrink:0;margin-right:-12px;}
    .bn-nav-item.has-arrow .bn-nav-arrow{display:flex;}
    .bn-nav-item.active .bn-nav-arrow{margin-right:-3px;}
    .bn-sidenav-footer{display:flex;flex-direction:column;gap:4px;align-items:center;padding:4px 0 8px 0;flex-shrink:0;width:62px;}
    .bn-sidenav-sep{height:1px;background:#d9d9d9;width:46px;margin:0 8px;}
    .bn-footer-write{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;border:1px solid #bcc3ca;background:#fff;cursor:pointer;box-sizing:border-box;}
    .bn-footer-write:hover{background:#f5f5f5;}
    .bn-footer-icon{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;border:none;background:#fff;cursor:pointer;box-sizing:border-box;}
    .bn-footer-icon:hover{background:#f5f5f5;}

    .bn-main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#f5f6f7;min-width:0;}

    .bn-header-panel{background:#fff;box-shadow:0 2px 2px rgba(85,107,130,.05);position:relative;overflow:visible;transition:box-shadow .2s;flex-shrink:0;}
    .bn-header-panel::after{content:"";display:block;position:absolute;left:0;right:0;bottom:0;height:1px;background:#d9d9d9;}
    .bn-header-panel.bn-collapsed .bn-kpi-row,.bn-header-panel.bn-collapsed #bn-filter-wrap{display:none;}
    .bn-header-panel.bn-collapsed{box-shadow:0 2px 6px rgba(34,54,73,.15);}
    .bn-page-title-row{display:flex;align-items:baseline;padding:24px 16px 16px 16px;}
    .bn-page-title{font-family:"72","72full",Arial,sans-serif;font-size:2rem;font-weight:700;color:#000;line-height:1.2;letter-spacing:0;}
    .bn-manage-tiles-link{font-size:14px;font-weight:400;color:#0064d9;text-decoration:none;cursor:pointer;white-space:nowrap;}
    .bn-manage-tiles-link:hover{text-decoration:underline;}

    .bn-kpi-row{padding:0 0 16px 0;position:relative;overflow:hidden;}
    .bn-kpi-row-header{display:flex;align-items:center;justify-content:flex-end;padding:4px 16px 4px 16px;min-height:28px;}
    .bn-kpi-scroll-inner{display:flex;align-items:center;position:relative;width:100%;overflow:hidden;}
    .bn-kpi-scroll-btn{background:#fff;border:1px solid #d1d1d1;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;position:absolute;z-index:3;top:50%;transform:translateY(-50%);}
    .bn-kpi-scroll-btn.prev{left:0;}
    .bn-kpi-scroll-btn.next{right:0;}
    .bn-kpi-scroll-btn:hover{background:#f5f5f5;}
    .bn-kpi-tiles{display:flex;gap:12px;overflow-x:scroll;flex:1;padding:4px 16px;box-sizing:border-box;scroll-behavior:smooth;scrollbar-width:none;}
    .bn-kpi-tiles::-webkit-scrollbar{display:none;}
    .bn-kpi-tile{width:176px;min-width:176px;flex-shrink:0;background:#fff;border-radius:16px;box-shadow:0 0 2px rgba(34,53,72,.2),0 2px 4px rgba(34,53,72,.2);display:flex;flex-direction:column;padding:16px;cursor:pointer;box-sizing:border-box;border-bottom:4.5px solid transparent;transition:box-shadow .15s;height:172px;}
    .bn-kpi-tile:hover{box-shadow:0 4px 12px rgba(34,53,72,.25);}
    .bn-kpi-tile.active{border-bottom:4.5px solid #0070f2;}
    .bn-kpi-value{font-size:36px;font-weight:300;color:#256f3a;line-height:1;margin-top:auto;padding-top:8px;}
    .bn-kpi-title{font-size:14px;font-weight:700;color:#1d2d3e;line-height:18px;}
    .bn-kpi-sub{font-size:14px;font-weight:400;color:#556b82;line-height:18px;}

    .bn-filter-bar{padding:8px 16px 16px 16px;}
    .bn-filter-fields{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;width:100%;box-sizing:border-box;margin-bottom:4px;}
    .bn-filter-field{display:flex;flex-direction:column;gap:5px;width:223px;flex-shrink:0;padding-bottom:3px;box-sizing:border-box;}
    .bn-filter-range{display:flex;gap:4px;width:100%;align-items:center;}
    .bn-filter-range > *{flex:1 1 0;min-width:0;}
    .bn-filter-footer{display:flex;justify-content:flex-end;align-items:flex-end;margin-left:auto;padding-bottom:3px;}
    .bn-filter-actions{display:flex;gap:8px;align-items:center;}
    .bn-action-btn{height:26px;padding:0 8px;border-radius:8px;font-family:"72","72full",Arial,sans-serif;font-size:14px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;}
    .bn-action-emphasized{background:#0070f2;border:1px solid #0070f2;color:#fff;font-weight:700;}
    .bn-action-emphasized:hover{background:#0064d9;}
    .bn-action-default{background:#fff;border:1px solid #bcc3ca;color:#0064d9;font-weight:600;}
    .bn-action-default:hover{background:#f5f5f5;}
    .bn-action-transparent{background:transparent;border:1px solid transparent;color:#0064d9;font-weight:600;}
    .bn-action-transparent:hover{background:#f5f5f5;}

    .bn-indication-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;background:#fff;border:1px solid #bcc3ca;border-radius:8px;cursor:pointer;padding:0;position:absolute;bottom:-12px;z-index:5;}
    .bn-indication-btn:hover{background:#f5f5f5;}
    #bn-collapse-btn{left:50%;margin-left:-24px;}
    #bn-pin-btn{left:50%;margin-left:4px;}

    .bn-content-gap{height:16px;background:#f5f6f7;flex-shrink:0;}
    .bn-content{flex:1;height:0;overflow-y:auto;overflow-x:hidden;padding:0 16px 2rem 16px;min-width:0;}
    .bn-content .sapMList{width:100%;box-sizing:border-box;}
    .bn-content .sapMListTbl{width:100%!important;}
    .bn-content .sapMListTbl td,.bn-content .sapMListTbl th{overflow:hidden;white-space:nowrap;}

    /* Status badge in ObjectStatus */
    .sapMObjStatusText{font-weight:600;}
  `;
  document.head.appendChild(oStyleEl);

  /* ────────────────────────────────────────────────────────────
     DATA MODEL
  ──────────────────────────────────────────────────────────── */
  var ORDERS_ALL = [
    { po:"PO-2320586794", customer:"Good Company",  needBy:"2025-11-26", shipBy:"2025-11-26", confirmed:"2025-11-26", items:7,  qty:975,   org:"Org. 001", grp:"998765", status:"open"    },
    { po:"PO-4510234567", customer:"Dell",           needBy:"2025-12-10", shipBy:"2025-12-05", confirmed:"2025-12-10", items:3,  qty:1700,  org:"Org. 002", grp:"112233", status:"partial" },
    { po:"PO-9876543210", customer:"Apple",          needBy:"2026-01-15", shipBy:"2026-01-10", confirmed:"2026-01-15", items:5,  qty:90,    org:"Org. 003", grp:"445566", status:"open"    },
    { po:"PO-1122334455", customer:"Ernst & Young",  needBy:"2026-02-10", shipBy:"2026-02-05", confirmed:"2026-02-10", items:8,  qty:245,   org:"Org. 001", grp:"334455", status:"open"    },
    { po:"PO-3344556677", customer:"Siemens AG",     needBy:"2026-02-20", shipBy:"2026-02-14", confirmed:"2026-02-20", items:2,  qty:15,    org:"Org. 003", grp:"667788", status:"open"    },
    { po:"PO-5566778899", customer:"SAP SE",         needBy:"2026-03-05", shipBy:"2026-02-28", confirmed:"2026-03-05", items:6,  qty:296,   org:"Org. 002", grp:"001122", status:"open"    },
    { po:"PO-7788990011", customer:"Good Company",   needBy:"2026-03-15", shipBy:"2026-03-10", confirmed:"2026-03-15", items:4,  qty:44,    org:"Org. 001", grp:"445566", status:"open"    },
    { po:"PO-2244668800", customer:"Dell",           needBy:"2026-03-30", shipBy:"2026-03-25", confirmed:"2026-03-30", items:3,  qty:56,    org:"Org. 003", grp:"556677", status:"open"    },
    { po:"PO-1001100110", customer:"Apple",          needBy:"2025-10-15", shipBy:"2025-10-10", confirmed:"2025-10-15", items:2,  qty:120,   org:"Org. 001", grp:"112200", status:"open"    },
    { po:"PO-1001200120", customer:"Siemens AG",     needBy:"2025-10-20", shipBy:"2025-10-15", confirmed:"2025-10-20", items:4,  qty:340,   org:"Org. 002", grp:"334400", status:"partial" },
    { po:"PO-1001300130", customer:"Good Company",   needBy:"2025-10-28", shipBy:"2025-10-22", confirmed:"",          items:3,  qty:75,    org:"Org. 001", grp:"556600", status:"new"     },
    { po:"PO-1001400140", customer:"SAP SE",         needBy:"2025-11-05", shipBy:"2025-10-30", confirmed:"2025-11-05",items:6,  qty:600,   org:"Org. 003", grp:"778800", status:"open"    },
    { po:"PO-1001500150", customer:"Ernst & Young",  needBy:"2025-11-10", shipBy:"2025-11-04", confirmed:"2025-11-10",items:1,  qty:50,    org:"Org. 001", grp:"112200", status:"open"    },
    { po:"PO-1001600160", customer:"Dell",           needBy:"2025-11-14", shipBy:"2025-11-08", confirmed:"",          items:5,  qty:250,   org:"Org. 002", grp:"334400", status:"new"     },
    { po:"PO-1001700170", customer:"Good Company",   needBy:"2025-11-20", shipBy:"2025-11-14", confirmed:"2025-11-20",items:9,  qty:1100,  org:"Org. 001", grp:"445500", status:"partial" },
    { po:"PO-1001800180", customer:"SAP SE",         needBy:"2025-12-01", shipBy:"2025-11-25", confirmed:"2025-12-01",items:3,  qty:90,    org:"Org. 003", grp:"667700", status:"open"    },
    { po:"PO-1001900190", customer:"Apple",          needBy:"2025-12-05", shipBy:"2025-11-28", confirmed:"",          items:2,  qty:40,    org:"Org. 001", grp:"889900", status:"new"     },
    { po:"PO-1002000200", customer:"Siemens AG",     needBy:"2025-12-10", shipBy:"2025-12-03", confirmed:"2025-12-10",items:7,  qty:700,   org:"Org. 002", grp:"112233", status:"open"    },
    { po:"PO-1002100210", customer:"Ernst & Young",  needBy:"2025-12-15", shipBy:"2025-12-08", confirmed:"2025-12-15",items:4,  qty:200,   org:"Org. 001", grp:"334455", status:"open"    },
    { po:"PO-1002200220", customer:"Dell",           needBy:"2025-12-20", shipBy:"2025-12-13", confirmed:"",          items:6,  qty:480,   org:"Org. 003", grp:"556677", status:"new"     },
    { po:"PO-1002300230", customer:"Good Company",   needBy:"2026-01-05", shipBy:"2025-12-29", confirmed:"2026-01-05",items:3,  qty:150,   org:"Org. 001", grp:"778899", status:"open"    },
    { po:"PO-1002400240", customer:"SAP SE",         needBy:"2026-01-10", shipBy:"2026-01-03", confirmed:"2026-01-10",items:5,  qty:500,   org:"Org. 002", grp:"001122", status:"open"    },
    { po:"PO-1002500250", customer:"Apple",          needBy:"2026-01-15", shipBy:"2026-01-08", confirmed:"",          items:2,  qty:60,    org:"Org. 001", grp:"334455", status:"new"     },
    { po:"PO-1002600260", customer:"Siemens AG",     needBy:"2026-01-20", shipBy:"2026-01-13", confirmed:"2026-01-20",items:8,  qty:960,   org:"Org. 003", grp:"556677", status:"open"    },
    { po:"PO-1002700270", customer:"Ernst & Young",  needBy:"2026-01-25", shipBy:"2026-01-18", confirmed:"2026-01-25",items:4,  qty:320,   org:"Org. 001", grp:"112233", status:"partial" },
    { po:"PO-1002800280", customer:"Dell",           needBy:"2026-02-01", shipBy:"2026-01-25", confirmed:"",          items:3,  qty:90,    org:"Org. 002", grp:"334455", status:"new"     },
    { po:"PO-1002900290", customer:"Good Company",   needBy:"2026-02-05", shipBy:"2026-01-29", confirmed:"2026-02-05",items:6,  qty:720,   org:"Org. 001", grp:"667788", status:"open"    },
    { po:"PO-1003000300", customer:"SAP SE",         needBy:"2026-02-10", shipBy:"2026-02-03", confirmed:"2026-02-10",items:2,  qty:80,    org:"Org. 003", grp:"001122", status:"open"    },
    { po:"PO-1003100310", customer:"Apple",          needBy:"2026-02-15", shipBy:"2026-02-08", confirmed:"",          items:5,  qty:250,   org:"Org. 001", grp:"334455", status:"new"     },
    { po:"PO-1003200320", customer:"Siemens AG",     needBy:"2026-02-20", shipBy:"2026-02-13", confirmed:"2026-02-20",items:7,  qty:840,   org:"Org. 002", grp:"556677", status:"open"    },
    { po:"PO-1003300330", customer:"Ernst & Young",  needBy:"2026-02-25", shipBy:"2026-02-18", confirmed:"2026-02-25",items:4,  qty:200,   org:"Org. 001", grp:"778899", status:"open"    },
    { po:"PO-1003400340", customer:"Dell",           needBy:"2026-03-01", shipBy:"2026-02-22", confirmed:"",          items:3,  qty:150,   org:"Org. 003", grp:"112233", status:"new"     },
    { po:"PO-1003500350", customer:"Good Company",   needBy:"2026-03-05", shipBy:"2026-02-26", confirmed:"2026-03-05",items:6,  qty:600,   org:"Org. 001", grp:"334455", status:"open"    },
    { po:"PO-1003600360", customer:"SAP SE",         needBy:"2026-03-10", shipBy:"2026-03-03", confirmed:"2026-03-10",items:2,  qty:100,   org:"Org. 002", grp:"556677", status:"open"    },
    { po:"PO-1003700370", customer:"Apple",          needBy:"2026-03-15", shipBy:"2026-03-08", confirmed:"",          items:9,  qty:450,   org:"Org. 001", grp:"001122", status:"new"     },
    { po:"PO-1003800380", customer:"Siemens AG",     needBy:"2026-03-20", shipBy:"2026-03-13", confirmed:"2026-03-20",items:5,  qty:250,   org:"Org. 003", grp:"334455", status:"open"    },
    { po:"PO-1003900390", customer:"Ernst & Young",  needBy:"2026-03-25", shipBy:"2026-03-18", confirmed:"2026-03-25",items:3,  qty:180,   org:"Org. 001", grp:"556677", status:"partial" },
    { po:"PO-1004000400", customer:"Dell",           needBy:"2026-03-30", shipBy:"2026-03-23", confirmed:"",          items:4,  qty:320,   org:"Org. 002", grp:"778899", status:"new"     },
    { po:"PO-1004100410", customer:"Good Company",   needBy:"2026-04-05", shipBy:"2026-03-29", confirmed:"2026-04-05",items:5,  qty:500,   org:"Org. 001", grp:"001122", status:"open"    },
    { po:"PO-1004200420", customer:"SAP SE",         needBy:"2026-04-10", shipBy:"2026-04-03", confirmed:"2026-04-10",items:2,  qty:80,    org:"Org. 003", grp:"112233", status:"partial" }
  ];

  var oModel = new JSONModel({ orders: JSON.parse(JSON.stringify(ORDERS_ALL)) });

  /* ────────────────────────────────────────────────────────────
     DATE FORMATTER
  ──────────────────────────────────────────────────────────── */
  function fmtDate(sIso) {
    if (!sIso) { return "\u2014"; }
    var d = new Date(sIso);
    return d.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
  }

  /* ────────────────────────────────────────────────────────────
     FILTER LOGIC
  ──────────────────────────────────────────────────────────── */
  var oFCustomer, oFOrderNum, oTableTitle;

  function applyFilters() {
    var sNum  = (oFOrderNum  ? oFOrderNum.getValue()  || "" : "").trim().toLowerCase();
    var sCust = (oFCustomer  ? oFCustomer.getValue()  || "" : "").trim();
    var aF = ORDERS_ALL.filter(function (o) {
      if (sNum  && !o.po.toLowerCase().includes(sNum))               { return false; }
      if (sCust && o.customer.toLowerCase() !== sCust.toLowerCase()) { return false; }
      return true;
    });
    oModel.setProperty("/orders", aF);
    if (oTableTitle) { oTableTitle.setText("Orders (" + aF.length + ")"); }
  }

  function clearFilters() {
    if (oFCustomer) { oFCustomer.setValue(""); }
    if (oFOrderNum) { oFOrderNum.setValue(""); }
    oModel.setProperty("/orders", JSON.parse(JSON.stringify(ORDERS_ALL)));
    if (oTableTitle) { oTableTitle.setText("Orders (" + ORDERS_ALL.length + ")"); }
  }

  window._bnApplyFilters = applyFilters;
  window._bnClearFilters = clearFilters;

  /* ── Collapse / Pin ── */
  var _bnFilterCollapsed = false;
  window._bnToggleFilters = function () {
    _bnFilterCollapsed = !_bnFilterCollapsed;
    var header = document.querySelector(".bn-header-panel");
    if (header) { header.classList.toggle("bn-collapsed", _bnFilterCollapsed); }
    var icon = document.getElementById("bn-collapse-icon");
    if (icon) { icon.innerHTML = _bnFilterCollapsed ? _bnIcon("slim-arrow-down") : _bnIcon("slim-arrow-up"); }
    var btn = document.getElementById("bn-collapse-btn");
    if (btn) { btn.title = _bnFilterCollapsed ? "Expand filter bar" : "Collapse filter bar"; }
  };

  var _bnFilterPinned = false;
  window._bnTogglePin = function () {
    _bnFilterPinned = !_bnFilterPinned;
    var icon = document.getElementById("bn-pin-icon");
    if (icon) { icon.innerHTML = _bnFilterPinned ? _bnIcon("pushpin", 12, "color:#0064d9;") : _bnIcon("pushpin-off", 12); }
    var btn = document.getElementById("bn-pin-btn");
    if (btn) { btn.title = _bnFilterPinned ? "Unpin filter bar" : "Pin filter bar"; }
  };

  /* ────────────────────────────────────────────────────────────
     SHELL BAR
  ──────────────────────────────────────────────────────────── */
  var oShell = new HTML({
    content: `
    <div class="bn-shell">
      <div class="bn-shell-left">
        <div class="bn-shell-logo-wrap">
          <button class="bn-shell-menu-btn" title="Main menu">${_bnIcon("menu2")}</button>
          <svg width="60" height="29" viewBox="0 0 60 29" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-left:2px;">
            <g clip-path="url(#wb-sap-clip)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 29.3478H29.983L59.3257 0H0V29.3478Z" fill="url(#wb-sap-grad)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.2068 5.86961H29.3477L29.3673 19.65L24.2653 5.86504H19.2064L14.8512 17.3779C14.3881 14.4483 11.3594 13.4374 8.97639 12.6803C7.40269 12.1748 5.73247 11.4313 5.74943 10.6096C5.76247 9.93526 6.64291 9.30983 8.39269 9.40309C9.5666 9.46635 10.6036 9.56091 12.6664 10.5574L14.6946 7.02265C12.8138 6.06526 10.2129 5.4607 8.0803 5.45874H8.06726C5.58052 5.45874 3.50986 6.26418 2.22639 7.59135C1.3316 8.51744 0.848995 9.69526 0.829429 10.9977C0.796821 12.7898 1.45356 14.0603 2.83356 15.0757C3.99965 15.93 5.49117 16.4844 6.8053 16.8913C8.42595 17.3935 9.74986 17.8305 9.73356 18.7605C9.72052 19.0996 9.59269 19.4166 9.34878 19.6722C8.94443 20.0896 8.32486 20.2461 7.46726 20.2631C5.81269 20.2983 4.5866 20.0381 2.63269 18.8831L0.828125 22.4635C2.78008 23.5735 4.85204 24.1305 7.20639 24.1305L7.73595 24.1266C9.78508 24.0894 11.4481 23.5983 12.7694 22.5353C12.8451 22.4746 12.9129 22.4133 12.9833 22.3513L12.7616 23.494L17.7051 23.4783L18.592 21.2074C19.5246 21.5257 20.5851 21.7018 21.7107 21.7018C22.8077 21.7018 23.8394 21.5348 24.7544 21.2348L25.3727 23.4783L34.2423 23.4868L34.2638 18.3098H36.1512C40.7131 18.3098 43.4099 15.9881 43.4099 12.0946C43.4086 7.75831 40.7868 5.86961 35.2068 5.86961ZM21.7107 17.6492C21.0292 17.6492 20.3901 17.5305 19.8403 17.3218L21.6899 11.4816H21.7257L23.5453 17.3381C22.9975 17.5337 22.3733 17.6492 21.7101 17.6492H21.7107ZM35.5499 14.2937H34.2625V9.587H35.5505C37.2657 9.587 38.6353 10.1583 38.6353 11.91C38.634 13.7231 37.2657 14.2937 35.5505 14.2937" fill="white"/>
            </g>
            <defs>
              <linearGradient id="wb-sap-grad" x1="29.6628" y1="0" x2="29.6628" y2="29.3485" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00AEEF"/><stop offset="0.212" stop-color="#0097DC"/>
                <stop offset="0.519" stop-color="#007CC5"/><stop offset="0.792" stop-color="#006CB8"/>
                <stop offset="1" stop-color="#0066B3"/>
              </linearGradient>
              <clipPath id="wb-sap-clip"><rect width="60" height="29" fill="white"/></clipPath>
            </defs>
          </svg>
          <button class="bn-shell-brand-btn" title="Business Network">
            <span class="bn-shell-brand-text">Business Network</span>
            <span class="bn-shell-brand-arrow">${_bnIcon("slim-arrow-down", 12)}</span>
          </button>
        </div>
        <span class="bn-test-tag">Test Mode</span>
      </div>
      <div class="bn-shell-center">
        <div class="bn-search-wrap">
          <div class="bn-search-menu-btn">
            <div class="bn-search-select-inner">
              <span class="bn-search-select-text">Select</span>
              <span class="bn-search-select-arrow">${_bnIcon("slim-arrow-down", 12)}</span>
            </div>
          </div>
          <div class="bn-search-sep"></div>
          <input class="bn-search-input" placeholder="Search" />
          <button class="bn-search-btn">${_bnIcon("search", 16)}</button>
        </div>
      </div>
      <div class="bn-shell-right">
        <div class="bn-shell-enterprise-wrap">
          <span class="bn-shell-enterprise">Enterprise</span>
          <div class="bn-shell-divider"></div>
        </div>
        <div class="bn-shell-actions">
          <button class="bn-icon-btn" title="Joule">${_bnIcon("da", 20)}</button>
          <button class="bn-icon-btn" title="Notifications">${_bnIcon("bell", 20)}</button>
          <button class="bn-icon-btn" title="Campaigns">${_bnIcon("marketing-campaign", 20)}</button>
          <button class="bn-icon-btn" title="Messages">${_bnIcon("discussion-2", 20)}</button>
          <button class="bn-icon-btn" title="Help">${_bnIcon("sys-help", 20)}</button>
          <div class="bn-avatar" title="Jascha Sayler">JS<span class="bn-avatar-dot"></span></div>
        </div>
      </div>
    </div>`
  });

  /* ────────────────────────────────────────────────────────────
     SIDE NAV
  ──────────────────────────────────────────────────────────── */
  var NAV_ITEMS = [
    { icon:"home",              key:"home",        label:"Home" },
    { icon:"favorite-list",     key:"favorites",   label:"Favorites" },
    { icon:"present",           key:"present",     label:"Present" },
    { icon:"",                  key:"sapbox",      label:"", blank:true },
    { icon:"sap-box",           key:"crm",         label:"CRM Sales",       active:true, hasArrow:true },
    { icon:"enablement",        key:"product",     label:"Products",         hasArrow:true },
    { icon:"product",           key:"sales",       label:"My Sales Orders",  hasArrow:true },
    { icon:"my-sales-order",    key:"dimensions",  label:"Dimensions",       hasArrow:true },
    { icon:"dimension",         key:"expense",     label:"Expense Report",   hasArrow:true },
    { icon:"expense-report",    key:"money",       label:"Money Bills",      hasArrow:true },
    { icon:"money-bills",       key:"enable",      label:"Enablement",       hasArrow:true },
    { icon:"enablement",        key:"opportunity", label:"Opportunities" },
    { icon:"opportunity",       key:"bcard",       label:"Business Card" },
    { icon:"business-card",     key:"bcard2",      label:"Business Card 2" }
  ];

  var oSideNavHtml = NAV_ITEMS.map(function (it) {
    var cls = "bn-nav-item" + (it.active ? " active" : "") + (it.hasArrow ? " has-arrow" : "");
    var iconHtml = it.blank ? "" :
        '<span class="bn-nav-icon-wrap">' + _bnIcon(it.icon, 16) + '</span>';
    var arrowHtml = it.hasArrow ? '<span class="bn-nav-arrow">' + _bnIcon("slim-arrow-right", 12) + '</span>' : "";
    return '<button class="' + cls + '" title="' + it.label + '" data-key="' + it.key + '">'
         + '<span class="bn-nav-indicator"></span>'
         + iconHtml
         + arrowHtml
         + '</button>';
  }).join("");

  var oSideNav = new HTML({
    content: `
    <div class="bn-sidenav">
      <div class="bn-sidenav-content" id="bn-sidenav-content">
        ${oSideNavHtml}
      </div>
      <div class="bn-sidenav-footer">
        <div class="bn-sidenav-sep"></div>
        <button class="bn-footer-write" title="Write New">${_bnIcon("write-new", 16)}</button>
        <button class="bn-footer-icon" title="Widgets">${_bnIcon("widgets", 16)}</button>
      </div>
    </div>`
  });

  /* ── Nav click handler (set after render) ── */
  sap.ui.require([], function () {
    setTimeout(function () {
      var container = document.getElementById("bn-sidenav-content");
      if (!container) { return; }
      container.addEventListener("click", function (e) {
        var btn = e.target.closest(".bn-nav-item");
        if (!btn) { return; }
        container.querySelectorAll(".bn-nav-item.active").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    }, 300);
  });

  /* ────────────────────────────────────────────────────────────
     KPI TILES
  ──────────────────────────────────────────────────────────── */
  var KPI_TILES = [
    { key:"orders",          value:40, title:"Orders",                          sub:"This month", active:true  },
    { key:"itemsToConfirm",  value:14, title:"Items to confirm",                sub:"This month", active:false },
    { key:"itemsToShip",     value:38, title:"Items to ship",                   sub:"This month", active:false },
    { key:"returnItems",     value:5,  title:"Return items",                    sub:"This month", active:false },
    { key:"newOrders",       value:8,  title:"New orders",                      sub:"This month", active:false },
    { key:"changedOrders",   value:3,  title:"Changed orders",                  sub:"This month", active:false },
    { key:"ordersToInvoice", value:40, title:"Orders to invoice",               sub:"This month", active:false },
    { key:"serviceOrders",   value:0,  title:"Orders with service line",        sub:"This month", active:false },
    { key:"overdueInvoices", value:40, title:"Overdue invoices - Not approved", sub:"This month", active:false }
  ];

  function _buildKpiTilesHtml(aTiles) {
    return aTiles.map(function (t) {
      return '<div class="bn-kpi-tile' + (t.active ? " active" : "") + '" data-key="' + t.key + '">'
           + '<div><div class="bn-kpi-title">' + t.title + '</div>'
           + '<div class="bn-kpi-sub">' + t.sub + '</div></div>'
           + '<div class="bn-kpi-value">' + t.value + '</div>'
           + '</div>';
    }).join("");
  }

  function _updateKpiScroll() {
    var scroller = document.getElementById("bn-kpi-tiles-scroll");
    var btnPrev  = document.getElementById("bn-kpi-btn-prev");
    var btnNext  = document.getElementById("bn-kpi-btn-next");
    if (!scroller || !btnPrev || !btnNext) { return; }
    var overflows = scroller.scrollWidth > scroller.clientWidth + 2;
    var atStart   = scroller.scrollLeft <= 2;
    var atEnd     = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 2;
    btnPrev.style.display = (overflows && !atStart) ? "flex" : "none";
    btnNext.style.display = (overflows && !atEnd)   ? "flex" : "none";
    scroller.style.paddingRight = overflows ? "48px" : "16px";
  }

  window._bnKpiPrev = function () {
    var t = document.getElementById("bn-kpi-tiles-scroll");
    if (t) { t.scrollLeft -= 200; setTimeout(_updateKpiScroll, 320); }
  };
  window._bnKpiNext = function () {
    var t = document.getElementById("bn-kpi-tiles-scroll");
    if (t) { t.scrollLeft += 200; setTimeout(_updateKpiScroll, 320); }
  };

  /* ────────────────────────────────────────────────────────────
     FILTER BAR  (sap.m controls)
  ──────────────────────────────────────────────────────────── */
  oFCustomer = new ComboBox({
    width: "100%",
    placeholder: "Choose",
    change: applyFilters,
    selectionChange: applyFilters,
    items: [
      new Item({ key:"Good Company",  text:"Good Company"  }),
      new Item({ key:"Dell",          text:"Dell"          }),
      new Item({ key:"Apple",         text:"Apple"         }),
      new Item({ key:"Ernst & Young", text:"Ernst & Young" }),
      new Item({ key:"Siemens AG",    text:"Siemens AG"    }),
      new Item({ key:"SAP SE",        text:"SAP SE"        })
    ]
  });

  oFOrderNum = new Input({
    width: "100%",
    placeholder: "Enter partial or exact match",
    liveChange: applyFilters
  });

  var oFCreationDate = new MultiInput({
    width: "100%",
    tokens: [ new Token({ key:"last365", text:"Last 365 days" }) ]
  });

  var oFNeedByDate = new ComboBox({
    width: "100%",
    placeholder: "Select or type",
    items: [
      new Item({ key:"today",      text:"Today"      }),
      new Item({ key:"thisWeek",   text:"This week"  }),
      new Item({ key:"thisMonth",  text:"This month" }),
      new Item({ key:"nextMonth",  text:"Next month" })
    ]
  });

  var oFConfirmedDelivDate = new ComboBox({
    width: "100%",
    placeholder: "Select or type",
    items: [
      new Item({ key:"today",     text:"Today"      }),
      new Item({ key:"thisWeek",  text:"This week"  }),
      new Item({ key:"thisMonth", text:"This month" })
    ]
  });

  var oFProductGroupFrom = new Input({ width:"100%", placeholder:"From" });
  var oFProductGroupTo   = new Input({ width:"100%", value:"ABC" });

  var oFPlannerCode = new Input({
    width: "100%",
    placeholder: "Enter partial or exact match"
  });

  var oFStockTransferType = new ComboBox({
    width: "100%",
    placeholder: "Choose",
    items: [
      new Item({ key:"CPT", text:"CPT" }),
      new Item({ key:"EXW", text:"EXW" }),
      new Item({ key:"DDP", text:"DDP" }),
      new Item({ key:"CIF", text:"CIF" })
    ]
  });

  var oFShipFromLocation = new MultiInput({
    width: "100%",
    placeholder: "Select"
  });

  function fField(sLabel, oCtrl) {
    return new VBox({
      items: [ new Label({ text: sLabel }), oCtrl ]
    }).addStyleClass("bn-filter-field");
  }

  var oFProductGroupField = new VBox({
    items: [
      new Label({ text: "Product Group:" }),
      new HBox({ items: [ oFProductGroupFrom, oFProductGroupTo ] })
        .addStyleClass("bn-filter-range")
    ]
  }).addStyleClass("bn-filter-field");

  var oFilterFields = new HBox({
    wrap: "Wrap",
    items: [
      fField("Customer:",                 oFCustomer),
      fField("Order Number:",             oFOrderNum),
      fField("Creation Date:",            oFCreationDate),
      fField("Need By Date:",             oFNeedByDate),
      fField("Confirmed Delivery Date:",  oFConfirmedDelivDate),
      oFProductGroupField,
      fField("Planner Code:",             oFPlannerCode),
      fField("Stock Transfer Type:",      oFStockTransferType),
      fField("Ship From Location:",       oFShipFromLocation)
    ]
  }).addStyleClass("bn-filter-fields");

  var oFilterBar = new VBox({
    width: "100%",
    items: [ oFilterFields ]
  }).addStyleClass("bn-filter-bar");

  /* ────────────────────────────────────────────────────────────
     TABLE
  ──────────────────────────────────────────────────────────── */
  oTableTitle = new Title({
    text: "Orders (" + ORDERS_ALL.length + ")",
    level: "H3",
    titleStyle: "H4"
  });

  var oTableToolbar = new Toolbar({
    design: "Transparent",
    content: [
      oTableTitle,
      new ToolbarSpacer(),
      new Button({ icon:"sap-icon://sort",           type:"Transparent", tooltip:"Sort",
        press: function () { MessageToast.show("Sort"); } }),
      new Button({ icon:"sap-icon://filter",         type:"Transparent", tooltip:"Filter",
        press: function () { MessageToast.show("Filter"); } }),
      new Button({ icon:"sap-icon://action-settings",type:"Transparent", tooltip:"Column Settings",
        press: function () { MessageToast.show("Column settings"); } })
    ]
  });

  var oTable = new Table({
    mode: "MultiSelect",
    growing: true,
    growingThreshold: 15,
    growingScrollToLoad: false,
    busyIndicatorDelay: 0,
    sticky: ["HeaderToolbar", "ColumnHeaders"],
    width: "100%",
    updateFinished: function (oEvent) {
      var total   = oEvent.getParameter("total");
      var visible = oEvent.getParameter("actual");
      var aOrders = oModel.getProperty("/orders") || ORDERS_ALL;
      oTableTitle.setText("Orders (" + aOrders.length + ")");
      oTable.setGrowingTriggerText(
        visible < total ? "Load more" : "All " + total + " orders loaded"
      );
    },
    noDataText: "No orders found",
    headerToolbar: oTableToolbar,
    items: {
      path: "orders>/orders",
      template: new ColumnListItem({
        type: "Navigation",
        press: function (e) {
          var ctx = e.getSource().getBindingContext("orders");
          if (ctx) { MessageToast.show("Open order: " + ctx.getProperty("po")); }
        },
        cells: [
          new Link({
            text: "{orders>po}",
            press: function (e) {
              var ctx = e.getSource().getBindingContext("orders");
              if (ctx) { MessageToast.show("Order: " + ctx.getProperty("po")); }
            }
          }),
          new Text({ text: "{orders>customer}" }),
          new Text({ text: { parts:[{path:"orders>needBy"}],     formatter: fmtDate }, wrapping: false }),
          new Text({ text: { parts:[{path:"orders>shipBy"}],     formatter: fmtDate }, wrapping: false }),
          new Text({ text: { parts:[{path:"orders>confirmed"}],  formatter: fmtDate }, wrapping: false }),
          new Text({ text: "{orders>items}",  wrapping: false }),
          new Text({ text: { path:"orders>qty", formatter: function(v){ return v ? Number(v).toLocaleString("en-US") : ""; } }, wrapping: false }),
          new Text({ text: "{orders>org}" }),
          new Text({ text: "{orders>grp}",    wrapping: false }),
          new ObjectStatus({
            text: { path:"orders>status", formatter: function(s){ return s ? (s.charAt(0).toUpperCase() + s.slice(1)) : ""; } },
            state: { path:"orders>status", formatter: function(s){
              if (s === "open")    { return "Success"; }
              if (s === "partial") { return "Warning"; }
              return "None";
            }}
          })
        ]
      })
    },
    columns: [
      new Column({ header: new Text({ text:"Order Number" }) }),
      new Column({ header: new Text({ text:"Customer" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, header: new Text({ text:"Need By" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, header: new Text({ text:"Ship By" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, header: new Text({ text:"Confirmed Delivery" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, hAlign:"End", header: new Text({ text:"Items" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, hAlign:"End", header: new Text({ text:"Total Qty" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, header: new Text({ text:"Org" }) }),
      new Column({ minScreenWidth:"Desktop", demandPopin:true, header: new Text({ text:"Purch. Group" }) }),
      new Column({ hAlign:"End", header: new Text({ text:"Status" }) })
    ]
  });
  oTable.setModel(oModel, "orders");

  /* ────────────────────────────────────────────────────────────
     MAIN LAYOUT ASSEMBLY
  ──────────────────────────────────────────────────────────── */
  sap.ui.require(["sap/ui/core/Core"], function (Core) {
    var oContent = document.getElementById("content");
    if (!oContent) { return; }

    oContent.style.cssText = "flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;";

    /* Shell */
    var shellWrap = document.createElement("div");
    oContent.appendChild(shellWrap);
    oShell.placeAt(shellWrap);

    /* App row */
    var appRow = document.createElement("div");
    appRow.className = "bn-app";
    appRow.style.flex = "1";
    appRow.style.minHeight = "0";
    oContent.appendChild(appRow);

    /* Side nav */
    var sideWrap = document.createElement("div");
    sideWrap.style.cssText = "display:flex;flex-direction:column;align-self:stretch;";
    appRow.appendChild(sideWrap);
    oSideNav.placeAt(sideWrap);

    /* Main */
    var mainWrap = document.createElement("div");
    mainWrap.className = "bn-main";
    mainWrap.id = "bn-main-content";
    appRow.appendChild(mainWrap);

    /* Header panel */
    var headerWrap = document.createElement("div");
    headerWrap.className = "bn-header-panel";
    mainWrap.appendChild(headerWrap);

    /* Page title row */
    var titleEl = document.createElement("div");
    titleEl.className = "bn-page-title-row";
    titleEl.innerHTML = '<span class="bn-page-title">Workbench</span>';
    headerWrap.appendChild(titleEl);

    /* KPI row */
    var kpiWrap = document.createElement("div");
    kpiWrap.className = "bn-kpi-row";
    kpiWrap.style.overflow = "hidden";
    kpiWrap.style.maxWidth = "100%";
    headerWrap.appendChild(kpiWrap);
    kpiWrap.innerHTML = [
      '<div class="bn-kpi-row-header">',
      '  <a class="bn-manage-tiles-link" href="#" onclick="sap.ui.require([\'sap/m/MessageToast\'],function(T){T.show(\'Manage Tiles\');});return false;">Manage Tiles</a>',
      '</div>',
      '<div class="bn-kpi-scroll-inner" style="display:flex;align-items:center;position:relative;width:100%;overflow:hidden;">',
      '  <button id="bn-kpi-btn-prev" class="bn-kpi-scroll-btn prev" title="Previous" style="display:none"',
      '    onclick="window._bnKpiPrev&&window._bnKpiPrev()">',
      '    ' + _bnIcon("slim-arrow-left", 14),
      '  </button>',
      '  <div class="bn-kpi-tiles" id="bn-kpi-tiles-scroll" style="overflow-x:scroll;overflow-y:hidden;flex:1;min-width:0;">',
      _buildKpiTilesHtml(KPI_TILES),
      '  </div>',
      '  <button id="bn-kpi-btn-next" class="bn-kpi-scroll-btn next" title="Next" style="display:none"',
      '    onclick="window._bnKpiNext&&window._bnKpiNext()">',
      '    ' + _bnIcon("slim-arrow-right", 14),
      '  </button>',
      '</div>'
    ].join("");

    /* KPI tile click handler */
    var kpiContainer = document.getElementById("bn-kpi-tiles-scroll");
    if (kpiContainer) {
      kpiContainer.addEventListener("scroll", _updateKpiScroll);
    }
    document.addEventListener("click", function (e) {
      var tile = e.target.closest(".bn-kpi-tile");
      if (!tile) { return; }
      var key = tile.getAttribute("data-key");
      if (key === "itemsToShip")    { e.stopImmediatePropagation(); window.location.replace(window.location.href.replace(/\/[^\/]*$/, "/") + "ASN-Joule-Demo/index.html"); return; }
      if (key === "itemsToConfirm") { e.stopImmediatePropagation(); window.location.replace(window.location.href.replace(/\/[^\/]*$/, "/") + "OC-Joule-Demo/index.html");  return; }
      if (!kpiContainer) { return; }
      kpiContainer.querySelectorAll(".bn-kpi-tile.active").forEach(function (t) { t.classList.remove("active"); });
      tile.classList.add("active");
    }, true); // capturing phase — fires before SAPUI5 UIArea handler

    requestAnimationFrame(function () {
      _updateKpiScroll();
      if (window.ResizeObserver) {
        var scrollEl = document.getElementById("bn-kpi-tiles-scroll");
        if (scrollEl) { new ResizeObserver(_updateKpiScroll).observe(scrollEl); }
      } else {
        window.addEventListener("resize", _updateKpiScroll);
      }
    });

    /* Filter bar */
    var filterWrap = document.createElement("div");
    filterWrap.id = "bn-filter-wrap";
    headerWrap.appendChild(filterWrap);
    oFilterBar.placeAt(filterWrap);

    /* Filter footer — Apply / Clear / Adapt Filters */
    var filterFooter = document.createElement("div");
    filterFooter.className = "bn-filter-footer";
    filterFooter.innerHTML =
      '<div class="bn-filter-actions">'
      + '<button class="bn-action-btn bn-action-emphasized" onclick="window._bnApplyFilters&&window._bnApplyFilters()">Apply</button>'
      + '<button class="bn-action-btn bn-action-default" onclick="window._bnClearFilters&&window._bnClearFilters()">Clear</button>'
      + '<button class="bn-action-btn bn-action-transparent" onclick="sap.ui.require([\'sap/m/MessageToast\'],function(T){T.show(\'Adapt Filters\');})">Adapt Filters</button>'
      + '</div>';
    setTimeout(function () {
      var oFields = filterWrap.querySelector(".bn-filter-fields");
      if (oFields) { oFields.appendChild(filterFooter); }
      else         { filterWrap.appendChild(filterFooter); }
    }, 0);

    /* Collapse button */
    var collapseBtn = document.createElement("button");
    collapseBtn.id = "bn-collapse-btn";
    collapseBtn.className = "bn-indication-btn";
    collapseBtn.title = "Collapse filter bar";
    collapseBtn.setAttribute("onclick", "window._bnToggleFilters&&window._bnToggleFilters()");
    collapseBtn.innerHTML = '<span id="bn-collapse-icon">' + _bnIcon("slim-arrow-up") + '</span>';
    headerWrap.appendChild(collapseBtn);

    /* Pin button */
    var pinBtn = document.createElement("button");
    pinBtn.id = "bn-pin-btn";
    pinBtn.className = "bn-indication-btn";
    pinBtn.title = "Pin filter bar";
    pinBtn.setAttribute("onclick", "window._bnTogglePin&&window._bnTogglePin()");
    pinBtn.innerHTML = '<span id="bn-pin-icon">' + _bnIcon("pushpin-off", 12) + '</span>';
    headerWrap.appendChild(pinBtn);

    /* Gap */
    var gapDiv = document.createElement("div");
    gapDiv.className = "bn-content-gap";
    mainWrap.appendChild(gapDiv);

    /* Content / table */
    var contentWrap = document.createElement("div");
    contentWrap.className = "bn-content sapUiSizeCompact";
    mainWrap.appendChild(contentWrap);
    oTable.placeAt(contentWrap);
    oTable.setModel(oModel, "orders");

    /* ── Welcome / Announcement dialog ── */
    (function _buildWelcomeDialog() {
      if (sessionStorage.getItem("bn-welcome-seen")) { return; }
      /* Overlay backdrop */
      var overlay = document.createElement("div");
      overlay.id = "bn-welcome-overlay";
      overlay.style.cssText = [
        "position:fixed;inset:0;z-index:10000;",
        "background:rgba(10,22,36,0.55);",
        "display:flex;align-items:center;justify-content:center;",
        "backdrop-filter:blur(2px);",
        "opacity:0;transition:opacity .25s ease;"
      ].join("");

      /* Dialog card */
      var dlg = document.createElement("div");
      dlg.id = "bn-welcome-dlg";
      dlg.style.cssText = [
        "background:#fff;border-radius:8px;",
        "box-shadow:0 16px 48px rgba(10,22,36,0.28);",
        "width:min(640px,92vw);max-height:90vh;",
        "display:flex;flex-direction:column;",
        "font-family:'72','72full',Arial,sans-serif;overflow:hidden;",
        "transform:translateY(12px);transition:transform .25s ease;"
      ].join("");

      /* Header */
      var hdr = document.createElement("div");
      hdr.style.cssText = [
        "display:flex;align-items:center;justify-content:space-between;",
        "padding:20px 24px 16px;",
        "border-bottom:1px solid #e5e8ec;"
      ].join("");
      hdr.innerHTML =
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:18px;font-weight:700;color:#1d2d3e;">SAP Business Network</span>' +
          '<span style="font-size:11px;font-weight:600;color:#e76500;background:#fff3e0;border:1px solid #f5a623;border-radius:4px;padding:2px 8px;letter-spacing:.3px;">DEMO</span>' +
        '</div>' +
        '<button id="bn-welcome-close" title="Close" style="' +
          'background:none;border:none;cursor:pointer;color:#556b82;' +
          'display:flex;align-items:center;justify-content:center;' +
          'width:32px;height:32px;border-radius:4px;font-size:20px;line-height:1;padding:0;' +
        '" onmouseover="this.style.background=\'#f0f2f5\'" onmouseout="this.style.background=\'none\'">' +
          _bnIcon("decline", 16) +
        '</button>';

      /* Body */
      var body = document.createElement("div");
      body.style.cssText = "padding:20px 24px;overflow-y:auto;flex:1;";
      body.innerHTML = [
        /* Purpose callout */
        '<div style="background:#fff8e1;border-left:3px solid #e76500;border-radius:0 6px 6px 0;padding:11px 14px;margin-bottom:16px;">',
          '<div style="font-size:12px;font-weight:700;color:#e76500;margin-bottom:4px;">What is this page?</div>',
          '<div style="font-size:12px;color:#1d2d3e;line-height:1.6;">',
            'This <strong>Workbench</strong> is an <strong>entry page only</strong> — it is not the demo itself.',
            ' The actual demos test the <strong>Joule AI Agent</strong> embedded in two supplier workflows.',
            ' Click the highlighted KPI tiles below to enter each demo.',
          '</div>',
        '</div>',

        /* Scenarios */
        '<div style="background:#f5f8fd;border-radius:6px;padding:14px 16px;margin-bottom:16px;">',
          '<div style="font-size:12px;font-weight:700;color:#0064d9;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">Demo Entrances</div>',

          /* Items to Confirm */
          '<div style="display:flex;gap:12px;margin-bottom:12px;cursor:pointer;" onclick="window._closeWelcome&&window._closeWelcome();window.location.replace(window.location.href.replace(/\\/[^\\/]*$/,\'/\')+\'OC-Joule-Demo/index.html\')">',
            '<div style="flex-shrink:0;width:36px;height:36px;border-radius:6px;background:#e8f3ff;display:flex;align-items:center;justify-content:center;">',
              _bnIcon("accept", 18),
            '</div>',
            '<div>',
              '<div style="font-size:13px;font-weight:700;color:#0064d9;margin-bottom:2px;">',
                'Items to Confirm → Order Confirmation (OC) ↗',
              '</div>',
              '<div style="font-size:12px;color:#556b82;line-height:1.5;">',
                'Joule AI guides a supplier through confirming purchase order lines — quantities, prices, and estimated delivery dates.',
              '</div>',
            '</div>',
          '</div>',

          /* Items to Ship */
          '<div style="display:flex;gap:12px;cursor:pointer;" onclick="window._closeWelcome&&window._closeWelcome();window.location.replace(window.location.href.replace(/\\/[^\\/]*$/,\'/\')+\'ASN-Joule-Demo/index.html\')">',
            '<div style="flex-shrink:0;width:36px;height:36px;border-radius:6px;background:#e8f3ff;display:flex;align-items:center;justify-content:center;">',
              _bnIcon("shipping-status", 18),
            '</div>',
            '<div>',
              '<div style="font-size:13px;font-weight:700;color:#0064d9;margin-bottom:2px;">',
                'Items to Ship → Advance Shipment Notice (ASN) ↗',
              '</div>',
              '<div style="font-size:12px;color:#556b82;line-height:1.5;">',
                'Joule AI guides a supplier through creating and submitting an Advance Shipment Notice for confirmed orders.',
              '</div>',
            '</div>',
          '</div>',
        '</div>',

        /* Joule section */
        '<div style="background:#f0f9f0;border-left:3px solid #188918;border-radius:0 6px 6px 0;padding:12px 14px;margin-bottom:16px;">',
          '<div style="font-size:12px;font-weight:700;color:#188918;margin-bottom:6px;">About the Joule AI Agent</div>',
          '<div style="font-size:12px;color:#1d2d3e;line-height:1.6;">',
            'Joule is SAP\'s embedded conversational AI assistant. In these demos it appears as a panel on the right side of the screen.',
            ' It interprets supplier intent, fetches contextual order data, and executes multi-step tasks end-to-end —',
            ' reducing manual effort and guiding users through complex supplier workflows.',
          '</div>',
        '</div>',

        /* Download buttons */
        '<div style="margin-bottom:18px;">',
          '<div style="font-size:12px;font-weight:700;color:#1d2d3e;margin-bottom:10px;">WalkMe Step-by-Step Instructions</div>',
          '<div style="display:flex;gap:10px;flex-wrap:wrap;">',
            '<button onclick="window._bnDlWalkme&&window._bnDlWalkme(\'oc\')" style="',
              'display:flex;align-items:center;gap:7px;padding:8px 14px;',
              'background:#0064d9;color:#fff;border:none;border-radius:4px;',
              'font-size:12px;font-family:inherit;font-weight:600;cursor:pointer;',
            '" onmouseover="this.style.background=\'#0032a5\'" onmouseout="this.style.background=\'#0064d9\'">',
              _bnIcon("download", 14),
              '<span>OC Demo — WalkMe Guide</span>',
            '</button>',
            '<button onclick="window._bnDlWalkme&&window._bnDlWalkme(\'asn\')" style="',
              'display:flex;align-items:center;gap:7px;padding:8px 14px;',
              'background:#0064d9;color:#fff;border:none;border-radius:4px;',
              'font-size:12px;font-family:inherit;font-weight:600;cursor:pointer;',
            '" onmouseover="this.style.background=\'#0032a5\'" onmouseout="this.style.background=\'#0064d9\'">',
              _bnIcon("download", 14),
              '<span>ASN Demo — WalkMe Guide</span>',
            '</button>',
          '</div>',
          '<div style="font-size:11px;color:#8696a9;margin-top:6px;">PDF guides with annotated screenshots for each scenario.</div>',
        '</div>',

        /* Don't show again checkbox */
        '<label id="bn-welcome-noshowall" style="display:flex;align-items:center;gap:7px;cursor:pointer;margin-bottom:12px;">',
          '<input type="checkbox" id="bn-welcome-cb" style="width:14px;height:14px;accent-color:#0064d9;cursor:pointer;">',
          '<span style="font-size:12px;color:#556b82;">Don\'t show again this session</span>',
        '</label>',

        /* Footer credit */
        '<div style="font-size:11px;color:#8696a9;border-top:1px solid #e5e8ec;padding-top:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px;">',
          '<span>Demo prepared by <strong style="color:#556b82;">Kate Yu</strong> &middot; SAP Business Network</span>',
          '<a href="mailto:kate.yu@sap.com" style="color:#0064d9;text-decoration:none;">kate.yu@sap.com</a>',
        '</div>'
      ].join("");

      dlg.appendChild(hdr);
      dlg.appendChild(body);
      overlay.appendChild(dlg);
      document.body.appendChild(overlay);

      /* Animate in */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.style.opacity = "1";
          dlg.style.transform = "translateY(0)";
        });
      });

      /* Close logic — also exposed so scenario rows can trigger it */
      function _closeDialog() {
        var cb = document.getElementById("bn-welcome-cb");
        if (cb && cb.checked) { sessionStorage.setItem("bn-welcome-seen", "1"); }
        overlay.style.opacity = "0";
        dlg.style.transform = "translateY(8px)";
        setTimeout(function () { overlay.remove(); }, 250);
      }
      window._closeWelcome = _closeDialog;
      document.getElementById("bn-welcome-close").addEventListener("click", _closeDialog);
      overlay.addEventListener("click", function (e) { if (e.target === overlay) _closeDialog(); });
      document.addEventListener("keydown", function _escClose(e) {
        if (e.key === "Escape") { _closeDialog(); document.removeEventListener("keydown", _escClose); }
      });

      /* WalkMe download stub — replace hrefs with real file paths when available */
      window._bnDlWalkme = function (which) {
        var files = { oc: "walkme-oc-demo.pdf", asn: "walkme-asn-demo.pdf" };
        var a = document.createElement("a");
        a.href = files[which] || "#";
        a.download = files[which] || "";
        a.click();
      };
    })();
  });
});
