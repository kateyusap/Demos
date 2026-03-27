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
  "sap/f/DynamicPage",
  "sap/f/DynamicPageTitle",
  "sap/f/DynamicPageHeader",
  "sap/m/ObjectStatus"
], function (
  JSONModel, Sorter, Text, Input, Select, MultiInput, Token,
  Table, Column, ColumnListItem, Link,
  Toolbar, ToolbarSpacer, ToolbarSeparator, Button, MenuButton, Menu, MenuItem,
  Title, VBox, HBox, Label, MessageToast, Avatar,
  HTML, Item, ComboBox, GroupHeaderListItem,
  DynamicPage, DynamicPageTitle, DynamicPageHeader,
  ObjectStatus
) {
  "use strict";

  /* ────────────────────────────────────────────────────────────
     SAP ICON HELPER
     Returns an inline <span> that renders a named SAP icon using
     the SAP-icons font loaded by sap-ui-core.
  ──────────────────────────────────────────────────────────── */
  function _bnIcon(name, size, extraStyle) {
    var sz = size || 16;
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
    /* Reset */
    html,body{height:100%;margin:0;padding:0;overflow:hidden;font-family:"72","72full",Arial,Helvetica,sans-serif;}
    #content{height:100%;display:flex;flex-direction:column;}

    /* ── Shell Bar ── */
    .bn-shell{
      display:flex;align-items:center;
      background:#fff;
      padding:8px 48px 8px 14px;
      gap:120px;
      flex-shrink:0;
      box-shadow:0 0 2px rgba(34,54,73,.2),0 2px 4px rgba(34,54,73,.2);
      z-index:100;
      position:relative;
      box-sizing:border-box;
    }
    /* Left area */
    .bn-shell-left{
      display:flex;align-items:center;gap:16px;
      height:52px;flex-shrink:0;
    }
    .bn-shell-logo-wrap{
      display:flex;align-items:center;flex-shrink:0;
    }
    .bn-shell-menu-btn{
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:8px;border:none;
      background:transparent;cursor:pointer;flex-shrink:0;
    }
    .bn-shell-menu-btn:hover{background:rgba(0,0,0,.06);}
    .bn-shell-brand-btn{
      display:flex;align-items:center;justify-content:center;gap:6px;
      min-height:36px;padding:10px;border-radius:8px;
      border:1px solid transparent;background:transparent;
      cursor:pointer;white-space:nowrap;flex-shrink:0;
    }
    .bn-shell-brand-btn:hover{background:rgba(0,0,0,.05);}
    .bn-shell-brand-text{
      font-family:"72","72full",Arial,sans-serif;
      font-size:16px;font-weight:700;color:#002a86;
      line-height:1;
    }
    .bn-shell-brand-arrow{
      width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .bn-test-tag{
      display:flex;align-items:center;
      background:#f8d6ff;border:1px solid #f8d6ff;
      color:#a100c2;font-size:12px;font-weight:700;
      font-family:"72","72full",Arial,sans-serif;
      border-radius:8px;padding:3px 8px;
      white-space:nowrap;flex-shrink:0;
      line-height:16px;
    }
    /* Center – search */
    .bn-shell-center{
      position:absolute;left:0;right:0;
      display:flex;justify-content:center;
      pointer-events:none;
    }
    .bn-search-wrap{
      width:400px;
      display:flex;align-items:center;
      background:#eff1f2;
      border-radius:18px;
      box-shadow:inset 0 0 0 1px rgba(85,107,129,.25);
      padding:4px 4px 4px 0;
      height:36px;box-sizing:border-box;
      position:relative;
      pointer-events:all;
    }
    .bn-search-menu-btn{
      display:flex;align-items:center;justify-content:end;
      padding-right:5px;width:100px;flex-shrink:0;
    }
    .bn-search-select-inner{
      display:flex;align-items:center;gap:6px;
      min-height:26px;padding:5px 8px;
      border-radius:8px;border:1px solid transparent;
      background:transparent;cursor:pointer;
    }
    .bn-search-select-inner:hover{background:rgba(0,0,0,.05);}
    .bn-search-select-text{
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#556b82;flex:1;min-width:0;
    }
    .bn-search-select-arrow{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .bn-search-sep{
      width:1px;height:24px;
      background:#556b81;border-radius:12px;
      flex-shrink:0;
    }
    .bn-search-input{
      flex:1;border:none;background:transparent;outline:none;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;font-style:italic;color:#556b82;
      padding:0 8px;
    }
    .bn-search-btn{
      background:transparent;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:8px;flex-shrink:0;
    }
    .bn-search-btn:hover{background:rgba(0,0,0,.06);}
    /* Right area */
    .bn-shell-right{
      display:flex;align-items:center;justify-content:flex-end;
      gap:16px;margin-left:auto;flex-shrink:0;
    }
    .bn-shell-enterprise-wrap{
      display:flex;align-items:center;gap:16px;flex-shrink:0;
    }
    .bn-shell-enterprise{
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#556b82;white-space:nowrap;
    }
    .bn-shell-divider{width:1px;height:24px;background:#d9d9d9;flex-shrink:0;}
    .bn-shell-actions{display:flex;align-items:center;gap:8px;}
    .bn-icon-btn{
      background:transparent;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      width:44px;height:44px;border-radius:8px;flex-shrink:0;
    }
    .bn-icon-btn:hover{background:rgba(0,0,0,.06);}
    .bn-avatar{
      width:32px;height:32px;border-radius:50%;
      background:#e76500;color:#fff;
      font-family:"72","72full",Arial,sans-serif;
      font-size:12px;font-weight:700;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;position:relative;flex-shrink:0;
    }
    .bn-avatar-dot{
      position:absolute;bottom:0;right:0;
      width:10px;height:10px;background:#6bb700;border-radius:50%;
      border:2px solid #fff;
    }

    /* ── App layout ── */
    .bn-app{display:flex;flex:1;min-height:0;overflow:hidden;}

    /* ── Side Nav ── */
    .bn-sidenav{
      width:62px;min-width:62px;
      background:#fff;
      display:flex;flex-direction:column;justify-content:space-between;
      box-shadow:0 0 2px rgba(34,53,72,.2),0 2px 4px rgba(34,53,72,.2);
      z-index:5;flex-shrink:0;
      height:100%;
    }
    .bn-sidenav-content{
      flex:1;display:flex;flex-direction:column;gap:4px;
      padding:8px 8px 0 8px;
    }
    .bn-nav-item{
      display:flex;align-items:center;
      width:48px;height:32px;
      padding-left:2px;padding-right:14px;
      border-radius:8px;border:none;background:#fff;
      cursor:pointer;position:relative;overflow:hidden;
      flex-shrink:0;box-sizing:border-box;
    }
    .bn-nav-item:hover{background:#f5f5f5;}
    .bn-nav-item.active{background:#ebf8ff;}
    .bn-nav-item.active .bn-nav-indicator{display:block;}
    .bn-nav-indicator{
      display:none;position:absolute;left:0;top:0;bottom:0;
      width:3px;background:#0064d9;
    }
    .bn-nav-icon-wrap{
      display:flex;align-items:center;justify-content:center;
      width:44px;height:100%;flex-shrink:0;
      padding:8px 14px;margin-right:-12px;box-sizing:border-box;
    }
    .bn-nav-item.active .bn-nav-icon-wrap{margin-right:-3px;}
    .bn-nav-arrow{
      display:none;align-items:center;justify-content:center;
      width:12px;height:12px;flex-shrink:0;margin-right:-12px;
    }
    .bn-nav-item.has-arrow .bn-nav-arrow{display:flex;}
    .bn-nav-item.active .bn-nav-arrow{margin-right:-3px;}
    .bn-sidenav-footer{
      display:flex;flex-direction:column;gap:4px;align-items:center;
      padding:4px 0 8px 0;flex-shrink:0;width:62px;
    }
    .bn-sidenav-sep{
      height:1px;background:#d9d9d9;width:46px;margin:0 8px;
    }
    .bn-footer-write{
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:8px;
      border:1px solid #bcc3ca;background:#fff;cursor:pointer;
      box-sizing:border-box;
    }
    .bn-footer-write:hover{background:#f5f5f5;}
    .bn-footer-icon{
      display:flex;align-items:center;justify-content:center;
      width:32px;height:32px;border-radius:8px;
      border:none;background:#fff;cursor:pointer;
      box-sizing:border-box;
    }
    .bn-footer-icon:hover{background:#f5f5f5;}

    /* ── Main content ── */
    .bn-main{
      flex:1;display:flex;flex-direction:column;
      overflow:hidden;background:#f5f6f7;
      min-width:0;
    }

    /* ── Header panel ── */
    .bn-header-panel{
      background:#fff;
      box-shadow:0 2px 2px rgba(85,107,130,.05);
      position:relative;
      overflow:visible;
      transition:box-shadow .2s;
      flex-shrink:0;
    }
    /* Collapsed state — hides KPI + filter, keeps title visible */
    .bn-header-panel.bn-collapsed .bn-kpi-row,
    .bn-header-panel.bn-collapsed #bn-filter-wrap,
    .bn-header-panel.bn-collapsed .bn-page-title-row{
      display:none;
    }
    .bn-header-panel.bn-collapsed{
      box-shadow:0 2px 6px rgba(34,54,73,.15);
    }
    .bn-page-title-row{
      display:flex;align-items:baseline;
      padding:24px 16px 16px 16px;
    }
    .bn-page-title{
      font-family:"72","72full",Arial,sans-serif;
      font-size:2rem;font-weight:700;color:#000;
      line-height:1.2;letter-spacing:0;
    }
    .bn-manage-tiles-link{
      font-size:14px;font-weight:400;color:#0064d9;
      text-decoration:none;cursor:pointer;white-space:nowrap;
    }
    .bn-manage-tiles-link:hover{text-decoration:underline;}

    /* ── KPI tiles row ── */
    .bn-kpi-row{
      padding:0 0 16px 0;
      position:relative;
      overflow:hidden;
    }
    .bn-kpi-row-header{
      display:flex;align-items:center;justify-content:flex-end;
      padding:4px 16px 4px 16px;
      min-height:28px;
    }
    .bn-kpi-scroll-inner{
      display:flex;align-items:center;
      position:relative;width:100%;
      overflow:hidden;
    }
    .bn-kpi-scroll-btn{
      background:#fff;border:1px solid #d1d1d1;border-radius:50%;
      width:28px;height:28px;display:flex;align-items:center;justify-content:center;
      cursor:pointer;flex-shrink:0;
      position:absolute;z-index:3;top:50%;transform:translateY(-50%);
    }
    .bn-kpi-scroll-btn.prev{left:0px;}
    .bn-kpi-scroll-btn.next{right:0px;}
    .bn-kpi-scroll-btn:hover{background:#f5f5f5;}
    .bn-kpi-tiles{
      display:flex;gap:12px;overflow-x:scroll;flex:1;
      padding:4px 16px;box-sizing:border-box;
      scroll-behavior:smooth;scrollbar-width:none;
    }
    .bn-kpi-tiles::-webkit-scrollbar{display:none;}
    .bn-kpi-tile{
      width:176px;min-width:176px;flex-shrink:0;
      background:#fff;border-radius:16px;
      box-shadow:0 0 2px rgba(34,53,72,.2),0 2px 4px rgba(34,53,72,.2);
      display:flex;flex-direction:column;
      padding:16px;cursor:pointer;box-sizing:border-box;
      border-bottom:4.5px solid transparent;transition:box-shadow .15s;
      height:172px;
    }
    .bn-kpi-tile:hover{box-shadow:0 4px 12px rgba(34,53,72,.25);}
    .bn-kpi-tile.active{border-bottom:4.5px solid #0070f2;}
    .bn-kpi-value{font-size:36px;font-weight:300;color:#256f3a;line-height:1;margin-top:auto;padding-top:8px;}
    .bn-kpi-title{font-size:14px;font-weight:700;color:#1d2d3e;line-height:18px;}
    .bn-kpi-sub{font-size:14px;font-weight:400;color:#556b82;line-height:18px;}

    /* ── Filter bar ── */
    .bn-filter-bar{padding:8px 16px 16px 16px;}

    /* Wrapping flex container — fields wrap naturally at 223px each */
    .bn-filter-fields{
      display:flex;
      flex-wrap:wrap;
      gap:16px;
      align-items:flex-end;
      width:100%;
      box-sizing:border-box;
      margin-bottom:4px;
    }

    /* Each labeled field: fixed 223px, label + control stacked, 5px gap */
    .bn-filter-field{
      display:flex;
      flex-direction:column;
      gap:5px;
      width:223px;
      flex-shrink:0;
      padding-bottom:3px;
      box-sizing:border-box;
    }

    /* SAP Label inherits sapContent_LabelColor (#556b82) from Horizon theme */
    .bn-filter-bar .sapMLabel{
      white-space:nowrap;
    }

    /* Product Group range: two inputs side-by-side, equal width */
    .bn-filter-range{
      display:flex;
      gap:4px;
      width:100%;
      align-items:center;
    }
    .bn-filter-range > *{ flex:1 1 0;min-width:0; }
    /* DynamicPage-style: collapse + pin buttons absolute, centered on the bottom edge of the header panel */
    .bn-header-panel{
      position:relative;
      overflow:visible;
    }
    /* Thin 1px line at the very bottom of the header panel */
    .bn-header-panel::after{
      content:"";
      display:block;
      position:absolute;
      left:0;right:0;bottom:0;
      height:1px;
      background:#d9d9d9;
    }
    /* WIP Header Indication buttons — SAP Secondary Icon Button style */
    .bn-indication-btn{
      display:flex;align-items:center;justify-content:center;
      width:24px;height:24px;
      background:#fff;
      border:1px solid #bcc3ca;border-radius:8px;
      cursor:pointer;padding:0;
      position:absolute;
      bottom:-12px;
      z-index:5;
    }
    .bn-indication-btn:hover{background:#f5f5f5;}
    #bn-collapse-btn{ left:50%; margin-left:-24px; }
    #bn-pin-btn{      left:50%; margin-left:4px;   }
    /* Action buttons row — bottom-right of filter area, above the indicator line */
    .bn-filter-footer{
      display:flex;
      justify-content:flex-end;
      align-items:flex-end;
      margin-left:auto;
      padding-bottom:3px;
    }
    .bn-filter-actions{
      display:flex;gap:8px;align-items:center;
    }
    .bn-action-btn{
      height:26px;padding:0 8px;border-radius:8px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;cursor:pointer;white-space:nowrap;
      display:flex;align-items:center;
    }
    .bn-action-emphasized{
      background:#0070f2;border:1px solid #0070f2;
      color:#fff;font-weight:700;
    }
    .bn-action-emphasized:hover{background:#0064d9;}
    .bn-action-default{
      background:#fff;border:1px solid #bcc3ca;
      color:#0064d9;font-weight:600;
    }
    .bn-action-default:hover{background:#f5f5f5;}
    .bn-action-transparent{
      background:transparent;border:1px solid transparent;
      color:#0064d9;font-weight:600;
    }
    .bn-action-transparent:hover{background:#f5f5f5;}

    /* ── Content area ── */
    .bn-content{flex:1;height:0;overflow-y:auto;overflow-x:hidden;padding:0 16px 16px 16px;min-width:0;min-height:0;}
    .bn-content-gap{height:16px;background:#f5f6f7;flex-shrink:0;}
    .bn-content .sapMList{width:100%;box-sizing:border-box;}
    .bn-content .sapMListCnt{width:100%;}
    .bn-content .sapMListTbl{width:100%!important;}
    .bn-content .sapMListTbl td,.bn-content .sapMListTbl th{overflow:hidden;white-space:nowrap;}
    .bn-content .sapMColumnHeader{overflow:hidden;white-space:nowrap;}
    .bn-content .sapMColumnHeaderContent{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:100%;}
    .bn-content .sapMListTblCell > *{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;display:block;}

    /* ── Joule Panel ── */
    .bn-joule-wrap{
      display:flex;flex-direction:column;
      width:416px;min-width:416px;flex-shrink:0;
      height:100%;
      margin:0;
      border-radius:16px 16px 0 0;
      box-shadow:-4px 0 16px rgba(91,115,139,.12);
      overflow:hidden;
      background:#fff;
    }
    /* SAPUI5 injects a wrapper div around HTML controls — pass radius through */
    .bn-joule-wrap > div {
      border-radius:16px 16px 0 0;
      overflow:hidden;
      height:100%;
    }
    .bn-joule{
      width:416px;min-width:416px;
      display:flex;flex-direction:column;
      background:#fff;flex-shrink:0;
      height:100%;
      border-radius:16px 16px 0 0;
      overflow:hidden;
    }
    .bn-joule-header{
      background:linear-gradient(180deg,#5d36ff 0%,#6431fa 100%);
      height:56px;min-height:56px;
      display:flex;align-items:center;
      padding:0 8px;flex-shrink:0;
      border-radius:16px 16px 0 0;
    }
    .bn-joule-header-title{
      display:flex;align-items:center;gap:0;
      flex:1;padding-left:4px;
    }
    .bn-joule-title{
      font-family:"72","72full",Arial,sans-serif;
      font-size:16px;font-weight:700;color:#fff;
      white-space:nowrap;margin-left:6px;
    }
    .bn-joule-toolbar{
      display:flex;align-items:center;gap:4px;
      padding:10px 8px 10px 0;
    }
    .bn-joule-hbtn{
      display:flex;align-items:center;justify-content:center;
      min-height:36px;padding:10px;
      border-radius:8px;
      border:1px solid transparent;
      background:transparent;cursor:pointer;
      flex-shrink:0;
    }
    .bn-joule-hbtn:hover{background:rgba(255,255,255,.15);}
    .bn-joule-body{
      flex:1;overflow-y:auto;
      background:#f7f7f7;
      display:flex;flex-direction:column;
    }
    .bn-joule-content{
      display:flex;flex-direction:column;gap:16px;
      padding:16px;box-sizing:border-box;
      width:100%;
      margin-top:auto; /* push messages to bottom */
    }
    .bn-joule-time{
      font-family:"72","72full",Arial,sans-serif;
      font-size:12px;color:#8396a8;text-align:center;
      width:100%;line-height:20px;
    }
    .bn-joule-time b{font-weight:700;color:#8396a8;}
    .bn-joule-bubble{
      background:#eff1f2;
      border:1px solid #eff1f2;
      border-radius:0 8px 8px 8px; /* top-left square = Joule origin marker */
      padding:8px 16px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#1d2d3e;line-height:21px;
      align-self:flex-start;
      max-width:352px;
      min-height:37px;
    }
    /* Thinking dots */
    .bn-joule-dots{
      display:flex;align-items:center;gap:5px;
      padding:4px 0;
    }
    .bn-joule-dot{
      width:7px;height:7px;border-radius:50%;
      background:#8396a8;
      animation:bnDotBounce 1.2s infinite ease-in-out;
    }
    .bn-joule-dot:nth-child(2){ animation-delay:.2s; }
    .bn-joule-dot:nth-child(3){ animation-delay:.4s; }
    @keyframes bnDotBounce{
      0%,60%,100%{ transform:translateY(0); opacity:.4; }
      30%{ transform:translateY(-5px); opacity:1; }
    }
    /* Typewriter cursor */
    .bn-joule-caret{
      display:inline-block;width:2px;height:14px;
      background:#5d36ff;margin-left:2px;vertical-align:middle;
      animation:bnCaretBlink .7s step-end infinite;
    }
    @keyframes bnCaretBlink{
      0%,100%{ opacity:1; }
      50%{ opacity:0; }
    }
    /* Gradient shimmer on the typed text */
    .bn-joule-typing{
      background:linear-gradient(90deg,#1d2d3e 0%,#5d36ff 50%,#1d2d3e 100%);
      background-size:200% 100%;
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
      animation:bnShimmer 2s linear infinite;
    }
    @keyframes bnShimmer{
      0%{ background-position:200% 0; }
      100%{ background-position:-200% 0; }
    }
    .bn-joule-footer{
      background:#fff;flex-shrink:0;
      padding:16px 16px 0 16px;
      display:flex;align-items:flex-end;justify-content:center;
    }
    .bn-joule-input-wrap{
      display:flex;align-items:flex-end;gap:4px;
      flex:1;min-height:40px;padding:4px 8px;
      border:2px solid #0064d8;border-radius:4px;
      background:#fff;
      box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);
      box-sizing:border-box;
    }
    .bn-joule-input-text{
      display:flex;align-items:center;flex:1;
      padding:5px 8px 7px 8px;position:relative;min-width:0;
    }
    .bn-joule-cursor{
      position:absolute;left:7px;top:3px;
      width:1px;height:18px;background:#223548;
    }
    .bn-joule-input{
      flex:1;border:none;outline:none;background:transparent;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;font-style:italic;color:#556b82;
      padding:0;transition:color .15s,font-style .15s;
    }
    .bn-joule-input.has-text{
      font-style:normal;color:#1d2d3e;
    }
    .bn-joule-send{
      width:28px;height:28px;min-width:28px;border-radius:24px;
      background:#0070f2;border:1px solid #0070f2;
      cursor:pointer;display:flex;align-items:center;justify-content:center;
      opacity:.4;flex-shrink:0;
      transition:opacity .15s;
    }
    .bn-joule-send:hover{opacity:1;}
    .bn-joule-send.active{opacity:1;}
    /* Disclaimer footer */
    .bn-joule-disclaimer{
      background:#fff;flex-shrink:0;
      padding:6px 16px 14px 16px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:10px;color:#32363a;line-height:14px;
      text-align:left;
    }
    /* User message bubble (right-aligned) */
    .bn-joule-user-bubble{
      align-self:flex-end;
      background:#5d36ff;
      color:#fff;
      border-radius:8px 0 8px 8px; /* top-right square = user bubble */
      padding:8px 14px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;line-height:21px;
      max-width:300px;word-wrap:break-word;
    }
    /* Joule result card */
    .bn-joule-result-card{
      align-self:flex-start;
      background:#fff;
      border:1px solid #e5e5e5;
      border-radius:8px;
      overflow:hidden;
      width:100%;
      box-shadow:0 0 2px rgba(91,115,139,.16),0 4px 8px rgba(91,115,139,.16);
      font-family:"72","72full",Arial,sans-serif;
      font-size:13px;color:#1d2d3e;
    }
    .bn-joule-card-header{
      background:#f0eeff;
      padding:8px 12px;
      font-size:12px;font-weight:700;color:#5d36ff;
      border-bottom:1px solid #e0d9ff;
      display:flex;align-items:center;gap:6px;
    }
    .bn-joule-card-header-dot{
      width:6px;height:6px;border-radius:50%;background:#5d36ff;
    }
    .bn-joule-card-row{
      display:grid;
      grid-template-columns:90px 1fr 90px;
      gap:0;
      padding:7px 12px;
      border-bottom:1px solid #eef1f4;
      align-items:start;
    }
    .bn-joule-card-row:last-child{border-bottom:none;}
    .bn-joule-card-row:hover{background:#f7f9fb;}
    .bn-joule-card-order{
      font-size:13px;font-weight:700;color:#0064d9;
      text-decoration:none;cursor:pointer;white-space:nowrap;
    }
    .bn-joule-card-order:hover{text-decoration:underline;}
    .bn-joule-card-desc{
      font-size:12px;color:#556b82;
      padding:0 8px;line-height:18px;
    }
    .bn-joule-card-ship{
      font-size:12px;color:#1d2d3e;text-align:right;white-space:nowrap;
    }
    .bn-joule-card-footer{
      padding:8px 12px;
      background:#f7f9fb;
      font-size:12px;color:#556b82;
      border-top:1px solid #eef1f4;
    }
    .bn-joule-card-col-label{
      font-size:11px;color:#8396a8;font-weight:700;letter-spacing:.02em;
    }
    .bn-joule-confirm-label{
      display:inline-block;
      background:#e8f5e9;color:#256f3a;
      font-size:11px;font-weight:700;
      border-radius:4px;padding:1px 6px;
      white-space:nowrap;
    }
    /* Guide message bubble */
    .bn-joule-guide{
      align-self:flex-start;
      background:#eff1f2;
      border:1px solid #eff1f2;
      border-radius:0 8px 8px 8px;
      padding:12px 16px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#1d2d3e;line-height:22px;
      max-width:352px;
    }
    .bn-joule-guide-q{
      margin:10px 0 10px 0;
      font-size:14px;color:#1d2d3e;font-weight:600;
    }
    /* Option chips — quick reply pill style */
    .bn-joule-options{
      display:flex;flex-direction:column;gap:8px;
      align-self:flex-start;width:100%;
    }
    .bn-joule-option-btn{
      display:flex;align-items:flex-start;gap:10px;
      background:#fff;
      border:1.5px solid #bcc3ca;
      border-radius:8px;
      padding:10px 14px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#1d2d3e;line-height:18px;
      cursor:pointer;text-align:left;
      transition:border-color .15s,background .15s,box-shadow .15s;
      box-shadow:0 0 2px rgba(27,144,255,.08),0 2px 4px rgba(27,144,255,.08);
    }
    .bn-joule-option-btn:hover{
      border-color:#5d36ff;background:#f0eeff;
      box-shadow:0 0 0 2px rgba(93,54,255,.12);
    }
    .bn-joule-option-btn:active{background:#e4d9ff;}
    .bn-joule-option-num{
      min-width:20px;height:20px;line-height:20px;
      border-radius:50%;background:#5d36ff;color:#fff;
      font-size:11px;font-weight:700;text-align:center;
      flex-shrink:0;margin-top:1px;
    }
    /* Quick reply chips (post-message suggestions) */
    .bn-joule-chips{
      display:flex;flex-wrap:wrap;gap:8px;
      align-self:flex-start;width:100%;
    }
    .bn-joule-chip{
      background:#fff;
      border:none;
      border-radius:16px;
      padding:4px 12px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#0064d9;line-height:20px;
      cursor:pointer;white-space:nowrap;
      box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);
      transition:background .15s,box-shadow .15s;
    }
    .bn-joule-chip:hover{
      background:#e8f4ff;
      box-shadow:0 0 2px rgba(27,144,255,.24),0 4px 8px rgba(27,144,255,.24);
    }
    /* Reading-rules status line */
    .bn-joule-status{align-self:flex-start;display:flex;align-items:center;gap:8px;font-family:"72","72full",Arial,sans-serif;font-size:13px;color:#556b82;font-style:italic;padding:4px 0;}
    .bn-joule-status-spinner{width:14px;height:14px;border-radius:50%;border:2px solid #e0d9ff;border-top-color:#5d36ff;animation:bnSpin .7s linear infinite;flex-shrink:0;}
    @keyframes bnSpin{to{transform:rotate(360deg);}}
    /* Rule badge bubble — exclusive to policy/rule ON notices */
    .bn-joule-rule-card{
      align-self:flex-start;
      background:#eff1f2;
      border:1px solid #eff1f2;
      border-radius:0 8px 8px 8px;
      padding:10px 14px 10px 12px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:13px;color:#1d2d3e;
      box-sizing:border-box;
      max-width:352px;
      border-left:3px solid #5d36ff;
    }
    /* Interactive / data card bubble — picker, diff, selectors */
    .bn-joule-card{
      align-self:flex-start;
      background:#fff;
      border:1.5px solid #d1e0ed;
      border-radius:0 8px 8px 8px;
      overflow:hidden;
      font-family:"72","72full",Arial,sans-serif;
      font-size:13px;color:#1d2d3e;
      box-sizing:border-box;
      box-shadow:0 2px 8px rgba(34,54,73,.08);
    }
    /* Yes / No inline buttons */
    .bn-joule-option-btn:disabled{opacity:.45;cursor:default;pointer-events:none;}
    /* Inline calendar picker */
    .bn-joule-cal{
      align-self:flex-start;
      background:#fff;
      border:1.5px solid #d1e0ed;
      border-radius:12px;
      overflow:hidden;
      width:272px;
      box-sizing:border-box;
      box-shadow:0 4px 16px rgba(34,54,73,.12);
      font-family:"72","72full",Arial,sans-serif;
      font-size:13px;color:#1d2d3e;
    }
    .bn-joule-cal-nav{
      display:flex;align-items:center;justify-content:space-between;
      background:#5d36ff;padding:10px 12px;
    }
    .bn-joule-cal-nav-btn{
      display:flex;align-items:center;justify-content:center;
      width:28px;height:28px;border-radius:6px;
      border:none;background:transparent;cursor:pointer;
      color:#fff;font-size:16px;line-height:1;
      transition:background .15s;
    }
    .bn-joule-cal-nav-btn:hover{background:rgba(255,255,255,.2);}
    .bn-joule-cal-month{
      font-size:14px;font-weight:700;color:#fff;
    }
    .bn-joule-cal-dow{
      display:grid;grid-template-columns:repeat(7,1fr);
      padding:8px 10px 4px;gap:2px;
    }
    .bn-joule-cal-dow span{
      text-align:center;font-size:11px;font-weight:700;
      color:#8396a8;line-height:24px;
    }
    .bn-joule-cal-days{
      display:grid;grid-template-columns:repeat(7,1fr);
      padding:0 10px 10px;gap:2px;
    }
    .bn-joule-cal-day{
      text-align:center;line-height:32px;height:32px;
      border-radius:50%;cursor:pointer;font-size:13px;
      border:none;background:transparent;color:#1d2d3e;
      transition:background .12s,color .12s;
    }
    .bn-joule-cal-day:hover:not(:disabled){background:#f0eeff;color:#5d36ff;}
    .bn-joule-cal-day.today{font-weight:700;color:#5d36ff;}
    .bn-joule-cal-day.selected{background:#5d36ff;color:#fff;font-weight:700;}
    .bn-joule-cal-day.selected:hover{background:#4a2bd4;}
    .bn-joule-cal-day:disabled{color:#bcc3ca;cursor:default;}
    .bn-joule-cal-day.other-month{color:#bcc3ca;}
    .bn-joule-cal-confirm{
      display:flex;justify-content:flex-end;
      padding:4px 10px 10px;gap:8px;
    }
    .bn-joule-cal-ok{
      padding:6px 18px;border-radius:6px;
      background:#5d36ff;color:#fff;
      border:none;font-family:"72","72full",Arial,sans-serif;
      font-size:13px;font-weight:600;cursor:pointer;
      transition:background .15s;
    }
    .bn-joule-cal-ok:hover{background:#4a2bd4;}
    .bn-joule-cal-ok:disabled{opacity:.4;cursor:default;}

    /* Icon font shim – use SAP icon font */
    .bn-icon{font-family:SAP-icons;speak:none;font-style:normal;}

    /* ── Joule welcome screen ── */
    .bn-joule-welcome{
      display:flex;flex-direction:column;flex-shrink:0;
      width:100%;position:relative;overflow:hidden;
    }
    .bn-joule-welcome-hero{
      width:100%;height:408px;flex-shrink:0;position:relative;
      background:linear-gradient(180deg,#6135fe 0%,#a100c2 100%);
      overflow:hidden;
    }
    .bn-joule-welcome-icon{
      position:absolute;top:54px;left:50%;transform:translateX(-50%);
      width:120px;height:120px;
    }
    .bn-joule-welcome-icon img{
      width:100%;height:100%;
    }
    @keyframes bn-star-flash{
      0%,100%{opacity:1;}
      40%{opacity:.15;}
      70%{opacity:.8;}
    }
    .bn-joule-welcome-text{
      position:absolute;bottom:32px;left:16px;right:16px;
    }
    .bn-joule-welcome-hello{
      font-family:"72","72full",Arial,sans-serif;
      font-size:20px;font-weight:300;color:#fff;line-height:30px;margin-bottom:2px;
    }
    .bn-joule-welcome-tagline{
      font-family:"72","72full",Arial,sans-serif;
      font-size:42px;font-weight:300;color:#fff;line-height:56px;
      letter-spacing:-1px;margin-bottom:12px;
      white-space:nowrap;
    }
    #bn-joule-word{
      display:inline-block;
      transition:opacity .35s ease, transform .35s ease;
    }
    #bn-joule-word.fade{opacity:0;transform:translateY(8px);}
    .bn-joule-welcome-hint{
      background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);
      border-radius:0 8px 8px 8px;padding:8px 16px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#fff;line-height:20px;max-width:384px;
    }
    .bn-joule-welcome-chips{
      background:#f7f7f7;padding:16px;display:flex;flex-direction:column;gap:8px;
    }
    .bn-joule-welcome-chips-label{
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#1d2d3e;font-weight:600;
      background:#eff1f2;border:1px solid #eff1f2;border-radius:0 8px 8px 8px;
      padding:8px 12px;display:inline-block;margin-bottom:4px;
    }
    .bn-joule-welcome-chips-row{
      display:flex;flex-wrap:wrap;gap:8px;
    }
    .bn-joule-welcome-chip{
      background:#fff;border-radius:16px;padding:4px 12px;
      font-family:"72","72full",Arial,sans-serif;
      font-size:14px;color:#0064d9;line-height:20px;
      border:none;cursor:pointer;
      box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);
      transition:box-shadow .15s,background .15s;
    }
    .bn-joule-welcome-chip:hover{background:#f0f7ff;}

    /* ── Joule loading screen ── */
    .bn-joule-loader{position:absolute;inset:0;border-radius:16px;background:linear-gradient(180deg,#5d36ff 0%,#8b20ff 100%);display:flex;align-items:center;justify-content:center;z-index:20;transition:opacity .4s ease;}
    .bn-joule-loader.fade-out{opacity:0;pointer-events:none;}
    .bn-joule-loader-grid{display:grid;grid-template-columns:repeat(3,18px);gap:14px;}
    .bn-joule-loader-dot{width:16px;height:16px;border-radius:50%;background:#fff;animation:bnLoaderPulse 1.4s ease-in-out infinite;}
    @keyframes bnLoaderPulse{0%,100%{opacity:.2;transform:scale(.7);}50%{opacity:1;transform:scale(1);}}
  `;
  document.head.appendChild(oStyleEl);

  /* ────────────────────────────────────────────────────────────
     HELPERS
  ──────────────────────────────────────────────────────────── */
  /* Build status bubble HTML: spinner + message. */
  function _bnStatusHtml(text) {
    return '<div class="bn-joule-status-spinner"></div>' + text;
  }

  function fmtDate(s) {
    if (!s) { return ""; }
    var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var parts = s.split("-");
    if (parts.length !== 3) { return s; }
    var yr = parseInt(parts[0], 10), mo = parseInt(parts[1], 10) - 1, dy = parseInt(parts[2], 10);
    return MONTHS[mo] + " " + dy + ", " + yr;
  }

  /* ────────────────────────────────────────────────────────────
     DATA
  ──────────────────────────────────────────────────────────── */
  var SRC = [
    /* PO-2320586794 — 7 lines */
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"6",  supplierPartNumber:"abc123-0", description:"BULLNOSE SHELVING",       needBy:"2025-11-26", shipBy:"2025-11-26", confirmedDeliveryDate:"2025-11-26", requestedQty:"100 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"100 PC",  location:"Werk 001", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"14", supplierPartNumber:"abc123-1", description:"BRACKET ASSEMBLY",        needBy:"2025-11-26", shipBy:"2025-11-26", confirmedDeliveryDate:"2025-11-26", requestedQty:"100 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"100 PC",  location:"Werk 001", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"23", supplierPartNumber:"xyz789-1", description:"WALL PANEL UNIT",         needBy:"2025-12-01", shipBy:"2025-11-28", confirmedDeliveryDate:"2025-12-01", requestedQty:"50 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"50 PC",   location:"Werk 002", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"35", supplierPartNumber:"abc124-2", description:"SHELF SUPPORT RAIL",      needBy:"2025-12-05", shipBy:"2025-12-02", confirmedDeliveryDate:"2025-12-05", requestedQty:"200 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"200 PC",  location:"Werk 001", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"48", supplierPartNumber:"abc125-3", description:"CORNER BRACKET KIT",      needBy:"2025-12-05", shipBy:"2025-12-02", confirmedDeliveryDate:"2025-12-05", requestedQty:"150 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"150 PC",  location:"Werk 001", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"52", supplierPartNumber:"abc126-4", description:"MOUNTING PLATE 200MM",    needBy:"2025-12-08", shipBy:"2025-12-04", confirmedDeliveryDate:"",           requestedQty:"75 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"75 PC",   location:"Werk 002", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    { poNumber:"PO-2320586794", orderNumber:"PO-2320586794", itemNumber:"61", supplierPartNumber:"abc127-5", description:"PANEL DIVIDER STRIP",     needBy:"2025-12-10", shipBy:"2025-12-06", confirmedDeliveryDate:"2025-12-10", requestedQty:"300 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"300 PC",  location:"Werk 001", purchasingGroup:"998765", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    /* PO-4510234567 — 3 lines */
    { poNumber:"PO-4510234567", orderNumber:"PO-4510234567", itemNumber:"3",  supplierPartNumber:"def456-2", description:"STEEL FRAME SECTION",     needBy:"2025-12-10", shipBy:"2025-12-05", confirmedDeliveryDate:"2025-12-10", requestedQty:"200 PC",  shippedQty:"80 PC", receivedQty:"80 PC", dueQty:"120 PC",  location:"Werk 003", purchasingGroup:"112233", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"DDP" },
    { poNumber:"PO-4510234567", orderNumber:"PO-4510234567", itemNumber:"17", supplierPartNumber:"ghi012-3", description:"MOUNTING HARDWARE KIT",   needBy:"2025-12-10", shipBy:"2025-12-05", confirmedDeliveryDate:"2025-12-10", requestedQty:"500 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"500 PC",  location:"Werk 003", purchasingGroup:"112233", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"CIF" },
    { poNumber:"PO-4510234567", orderNumber:"PO-4510234567", itemNumber:"39", supplierPartNumber:"ghi013-5", description:"BOLT SET M8x30",           needBy:"2025-12-15", shipBy:"2025-12-10", confirmedDeliveryDate:"2025-12-15", requestedQty:"1000 PC", shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"1000 PC", location:"Werk 003", purchasingGroup:"112233", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"CIF" },
    /* PO-9876543210 — 5 lines */
    { poNumber:"PO-9876543210", orderNumber:"PO-9876543210", itemNumber:"8",  supplierPartNumber:"jkl345-4", description:"CONTROL MODULE UNIT",     needBy:"2026-01-15", shipBy:"2026-01-10", confirmedDeliveryDate:"2026-01-15", requestedQty:"10 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"10 PC",   location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"CPT" },
    { poNumber:"PO-9876543210", orderNumber:"PO-9876543210", itemNumber:"19", supplierPartNumber:"mno678-5", description:"POWER SUPPLY BOARD",      needBy:"2026-01-15", shipBy:"2026-01-10", confirmedDeliveryDate:"2026-01-15", requestedQty:"10 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"10 PC",   location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"CPT" },
    { poNumber:"PO-9876543210", orderNumber:"PO-9876543210", itemNumber:"27", supplierPartNumber:"pqr901-6", description:"CABLE HARNESS ASSEMBLY",  needBy:"2026-01-20", shipBy:"2026-01-15", confirmedDeliveryDate:"",           requestedQty:"25 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"25 PC",   location:"Werk 004", purchasingGroup:"445566", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"EXW" },
    { poNumber:"PO-9876543210", orderNumber:"PO-9876543210", itemNumber:"38", supplierPartNumber:"stu234-7", description:"SENSOR UNIT COMPACT",     needBy:"2026-02-01", shipBy:"2026-01-25", confirmedDeliveryDate:"2026-02-01", requestedQty:"30 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"30 PC",   location:"Werk 004", purchasingGroup:"778899", purchasingOrg:"Org. 003", purchasingCode:"0044", transportTerms:"CPT" },
    { poNumber:"PO-9876543210", orderNumber:"PO-9876543210", itemNumber:"44", supplierPartNumber:"stu235-8", description:"RELAY MODULE 24V",        needBy:"2026-02-05", shipBy:"2026-01-30", confirmedDeliveryDate:"2026-02-05", requestedQty:"15 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"15 PC",   location:"Werk 004", purchasingGroup:"778899", purchasingOrg:"Org. 003", purchasingCode:"0044", transportTerms:"CPT" },
    /* PO-1122334455 — 8 lines */
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"5",  supplierPartNumber:"vwx111-1", description:"HYDRAULIC PUMP UNIT",     needBy:"2026-02-10", shipBy:"2026-02-05", confirmedDeliveryDate:"2026-02-10", requestedQty:"8 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"8 PC",    location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"12", supplierPartNumber:"vwx112-2", description:"PRESSURE VALVE 12BAR",    needBy:"2026-02-10", shipBy:"2026-02-05", confirmedDeliveryDate:"",           requestedQty:"20 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"20 PC",   location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"18", supplierPartNumber:"vwx113-3", description:"OIL FILTER HOUSING",      needBy:"2026-02-12", shipBy:"2026-02-07", confirmedDeliveryDate:"2026-02-12", requestedQty:"15 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"15 PC",   location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"24", supplierPartNumber:"vwx114-4", description:"PUMP SHAFT SEAL",         needBy:"2026-02-14", shipBy:"2026-02-09", confirmedDeliveryDate:"",           requestedQty:"40 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"40 PC",   location:"Werk 003", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"DDP" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"31", supplierPartNumber:"vwx115-5", description:"INLET MANIFOLD GASKET",   needBy:"2026-02-14", shipBy:"2026-02-09", confirmedDeliveryDate:"2026-02-14", requestedQty:"60 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"60 PC",   location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"37", supplierPartNumber:"vwx116-6", description:"FLOW CONTROL VALVE",      needBy:"2026-02-18", shipBy:"2026-02-12", confirmedDeliveryDate:"",           requestedQty:"12 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"12 PC",   location:"Werk 004", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"43", supplierPartNumber:"vwx117-7", description:"PRESSURE GAUGE 0-10BAR",  needBy:"2026-02-18", shipBy:"2026-02-12", confirmedDeliveryDate:"2026-02-18", requestedQty:"10 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"10 PC",   location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-1122334455", orderNumber:"PO-1122334455", itemNumber:"55", supplierPartNumber:"vwx118-8", description:"HOSE FITTING 3/4 INCH",   needBy:"2026-02-20", shipBy:"2026-02-14", confirmedDeliveryDate:"",           requestedQty:"80 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"80 PC",   location:"Werk 002", purchasingGroup:"334455", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    /* PO-3344556677 — 2 lines */
    { poNumber:"PO-3344556677", orderNumber:"PO-3344556677", itemNumber:"3",  supplierPartNumber:"bcd432-1", description:"ELECTRIC MOTOR 15KW",     needBy:"2026-02-20", shipBy:"2026-02-14", confirmedDeliveryDate:"2026-02-20", requestedQty:"5 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"5 PC",    location:"Werk 001", purchasingGroup:"667788", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"CIF" },
    { poNumber:"PO-3344556677", orderNumber:"PO-3344556677", itemNumber:"11", supplierPartNumber:"bcd433-2", description:"MOTOR COUPLING SHAFT",    needBy:"2026-02-20", shipBy:"2026-02-14", confirmedDeliveryDate:"",           requestedQty:"10 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"10 PC",   location:"Werk 001", purchasingGroup:"667788", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"CPT" },
    /* PO-5566778899 — 6 lines */
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"4",  supplierPartNumber:"hij654-1", description:"PNEUMATIC CYLINDER 80MM", needBy:"2026-03-05", shipBy:"2026-02-28", confirmedDeliveryDate:"2026-03-05", requestedQty:"12 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"12 PC",   location:"Werk 004", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"DDP" },
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"16", supplierPartNumber:"hij655-2", description:"SOLENOID VALVE 24VDC",    needBy:"2026-03-05", shipBy:"2026-02-28", confirmedDeliveryDate:"",           requestedQty:"24 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"24 PC",   location:"Werk 004", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"CPT" },
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"22", supplierPartNumber:"hij656-3", description:"AIR REGULATOR 1/2 NPT",   needBy:"2026-03-08", shipBy:"2026-03-03", confirmedDeliveryDate:"2026-03-08", requestedQty:"18 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"18 PC",   location:"Werk 004", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"DDP" },
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"33", supplierPartNumber:"hij657-4", description:"PUSH-IN FITTING 10MM",    needBy:"2026-03-10", shipBy:"2026-03-05", confirmedDeliveryDate:"",           requestedQty:"200 PC",  shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"200 PC",  location:"Werk 003", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"CIF" },
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"41", supplierPartNumber:"hij658-5", description:"CYLINDER MOUNTING KIT",   needBy:"2026-03-10", shipBy:"2026-03-05", confirmedDeliveryDate:"2026-03-10", requestedQty:"12 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"12 PC",   location:"Werk 004", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"DDP" },
    { poNumber:"PO-5566778899", orderNumber:"PO-5566778899", itemNumber:"50", supplierPartNumber:"hij659-6", description:"SILENCER EXHAUST PORT",   needBy:"2026-03-12", shipBy:"2026-03-07", confirmedDeliveryDate:"",           requestedQty:"30 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"30 PC",   location:"Werk 004", purchasingGroup:"001122", purchasingOrg:"Org. 002", purchasingCode:"0022", transportTerms:"CPT" },
    /* PO-7788990011 — 4 lines */
    { poNumber:"PO-7788990011", orderNumber:"PO-7788990011", itemNumber:"6",  supplierPartNumber:"nop876-1", description:"HEAT EXCHANGER PLATE",    needBy:"2026-03-15", shipBy:"2026-03-10", confirmedDeliveryDate:"2026-03-15", requestedQty:"6 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"6 PC",    location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CIF" },
    { poNumber:"PO-7788990011", orderNumber:"PO-7788990011", itemNumber:"20", supplierPartNumber:"nop877-2", description:"COOLING FAN 230VAC",      needBy:"2026-03-15", shipBy:"2026-03-10", confirmedDeliveryDate:"",           requestedQty:"10 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"10 PC",   location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-7788990011", orderNumber:"PO-7788990011", itemNumber:"28", supplierPartNumber:"nop878-3", description:"THERMAL PASTE 100G",      needBy:"2026-03-18", shipBy:"2026-03-13", confirmedDeliveryDate:"2026-03-18", requestedQty:"20 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"20 PC",   location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"CPT" },
    { poNumber:"PO-7788990011", orderNumber:"PO-7788990011", itemNumber:"36", supplierPartNumber:"nop879-4", description:"FAN GUARD MESH 120MM",    needBy:"2026-03-18", shipBy:"2026-03-13", confirmedDeliveryDate:"",           requestedQty:"8 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"8 PC",    location:"Werk 001", purchasingGroup:"445566", purchasingOrg:"Org. 001", purchasingCode:"0011", transportTerms:"EXW" },
    /* PO-2244668800 — 3 lines */
    { poNumber:"PO-2244668800", orderNumber:"PO-2244668800", itemNumber:"13", supplierPartNumber:"cde432-1", description:"TOUCH PANEL 10 INCH",     needBy:"2026-03-30", shipBy:"2026-03-25", confirmedDeliveryDate:"2026-03-30", requestedQty:"3 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"3 PC",    location:"Werk 002", purchasingGroup:"556677", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"DDP" },
    { poNumber:"PO-2244668800", orderNumber:"PO-2244668800", itemNumber:"31", supplierPartNumber:"cde433-2", description:"CABINET BACK PANEL",      needBy:"2026-03-30", shipBy:"2026-03-25", confirmedDeliveryDate:"2026-03-30", requestedQty:"3 PC",    shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"3 PC",    location:"Werk 002", purchasingGroup:"556677", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"CPT" },
    { poNumber:"PO-2244668800", orderNumber:"PO-2244668800", itemNumber:"47", supplierPartNumber:"cde434-3", description:"DIN RAIL CLIP 35MM",      needBy:"2026-04-02", shipBy:"2026-03-28", confirmedDeliveryDate:"",           requestedQty:"50 PC",   shippedQty:"0 PC",  receivedQty:"0 PC",  dueQty:"50 PC",   location:"Werk 002", purchasingGroup:"556677", purchasingOrg:"Org. 003", purchasingCode:"0033", transportTerms:"EXW" }
  ];
  /* Backup for demo reset — deep copy captured once at startup */
  window._bnSrcBackup = JSON.parse(JSON.stringify(SRC));

  var oModel = new JSONModel({ orders: JSON.parse(JSON.stringify(SRC)) });

  /* ─── ASN workbench update ───────────────────────────────────
     Called once ASN-777 and ASN-999 are generated.
     Removes the 6 items that were assigned to those two ASNs
     (the Chicago + Dallas lines from MATCHED_ORDERS correspond to
     the first 6 SRC rows — PO-2320586794 lines 1-6) from the
     workbench table and updates the KPI tile + title.
  ──────────────────────────────────────────────────────────── */
  var _bnAsnApplied = false;
  /* Indices in SRC that belong to ASN-777 (Chicago, 3 items) and
     ASN-999 (Dallas, 3 items).  We use the first 3 and next 3 rows
     of PO-2320586794 (indices 0-5) — they map cleanly to the 6
     MATCHED_ORDERS lines shown by Joule. */
  var _ASN_SRC_INDICES = [0, 1, 2, 3, 4, 5];

  function _bnApplyAsnToWorkbench() {
    if (_bnAsnApplied) { return; }
    _bnAsnApplied = true;

    /* Remove the 6 assigned rows from SRC in-place (high→low to keep indices valid) */
    for (var i = _ASN_SRC_INDICES.length - 1; i >= 0; i--) {
      SRC.splice(_ASN_SRC_INDICES[i], 1);
    }

    /* Update model */
    oModel.setProperty("/orders", JSON.parse(JSON.stringify(SRC)));

    /* Update table title */
    if (oTableTitle && window._bnTableMode !== "shipNotice") {
      oTableTitle.setText("Items to Ship (" + SRC.length + ")");
    }

    /* Update KPI tile value: Items to ship */
    KPI_TILES.forEach(function (t) {
      if (t.key === "itemsToShip") { t.value = SRC.length; }
    });
    var kpiScroll = document.getElementById("bn-kpi-tiles-scroll");
    if (kpiScroll && window._bnTableMode !== "shipNotice") {
      kpiScroll.innerHTML = _buildKpiTilesHtml(KPI_TILES);
    }
  }

  /* ────────────────────────────────────────────────────────────
     FILTER LOGIC
  ──────────────────────────────────────────────────────────── */
  var oFCustomer, oFOrderNum, oTableTitle;

  function countUniquePO(arr) {
    var seen = {};
    arr.forEach(function (o) { seen[o.poNumber] = true; });
    return Object.keys(seen).length;
  }

  function applyFilters() {
    var sNum  = (oFOrderNum ? oFOrderNum.getValue() || "" : "").trim().toLowerCase();
    var sCust = (oFCustomer ? oFCustomer.getValue() || "" : "").trim();
    var aF = SRC.filter(function (o) {
      if (sNum  && !o.orderNumber.toLowerCase().includes(sNum))          { return false; }
      if (sCust && o.customer.toLowerCase() !== sCust.toLowerCase())     { return false; }
      return true;
    });
    oModel.setProperty("/orders", aF);
    if (oTableTitle) { oTableTitle.setText("Items to Ship (" + aF.length + ")"); }
  }

  function clearFilters() {
    if (oFCustomer) { oFCustomer.setValue(""); }
    if (oFOrderNum) { oFOrderNum.setValue("");  }
    oModel.setProperty("/orders", JSON.parse(JSON.stringify(SRC)));
    if (oTableTitle) { oTableTitle.setText("Items to Ship (" + SRC.length + ")"); }
  }

  /* Expose filter functions for native HTML button onclicks */
  window._bnApplyFilters = applyFilters;
  window._bnClearFilters = clearFilters;

  /* Filter bar collapse toggle */
  var _bnFilterCollapsed = false;
  window._bnToggleFilters = function () {
    _bnFilterCollapsed = !_bnFilterCollapsed;
    var kpi = document.querySelector(".bn-kpi-row");
    if (kpi) { kpi.style.display = _bnFilterCollapsed ? "none" : ""; }
    var wrap = document.getElementById("bn-filter-wrap");
    if (wrap) { wrap.style.display = _bnFilterCollapsed ? "none" : ""; }
    var icon = document.getElementById("bn-collapse-icon");
    if (icon) { icon.innerHTML = _bnFilterCollapsed ? _bnIcon("slim-arrow-down") : _bnIcon("slim-arrow-up"); }
    var btn = document.getElementById("bn-collapse-btn");
    if (btn) { btn.title = _bnFilterCollapsed ? "Expand filter bar" : "Collapse filter bar"; }
  };

  /* Pin toggle */
  var _bnFilterPinned = false;
  window._bnTogglePin = function () {
    _bnFilterPinned = !_bnFilterPinned;
    var icon = document.getElementById("bn-pin-icon");
    if (icon) { icon.innerHTML = _bnFilterPinned ? _bnIcon("pushpin") : _bnIcon("pushpin-off"); }
    var btn = document.getElementById("bn-pin-btn");
    if (btn) { btn.title = _bnFilterPinned ? "Unpin filter bar" : "Pin filter bar"; }
  };

  /* ────────────────────────────────────────────────────────────
     SHELL BAR (native HTML – pixel-accurate to Figma 178-25693)
  ──────────────────────────────────────────────────────────── */
  var oShell = new HTML({
    content: `
    <div class="bn-shell">

      <!-- ── LEFT AREA ── -->
      <div class="bn-shell-left">
        <!-- Logo group: menu icon + SAP logo + brand button + tag -->
        <div class="bn-shell-logo-wrap">
          <!-- Hamburger / menu icon button -->
          <button class="bn-shell-menu-btn" title="Main menu">
            ${_bnIcon("menu2")}
          </button>
          <!-- SAP App Logo -->
          <svg width="60" height="29" viewBox="0 0 60 29" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-left:2px;">
            <g clip-path="url(#asn-sap-clip)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 29.3478H29.983L59.3257 0H0V29.3478Z" fill="url(#asn-sap-grad)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.2068 5.86961H29.3477L29.3673 19.65L24.2653 5.86504H19.2064L14.8512 17.3779C14.3881 14.4483 11.3594 13.4374 8.97639 12.6803C7.40269 12.1748 5.73247 11.4313 5.74943 10.6096C5.76247 9.93526 6.64291 9.30983 8.39269 9.40309C9.5666 9.46635 10.6036 9.56091 12.6664 10.5574L14.6946 7.02265C12.8138 6.06526 10.2129 5.4607 8.0803 5.45874H8.06726C5.58052 5.45874 3.50986 6.26418 2.22639 7.59135C1.3316 8.51744 0.848995 9.69526 0.829429 10.9977C0.796821 12.7898 1.45356 14.0603 2.83356 15.0757C3.99965 15.93 5.49117 16.4844 6.8053 16.8913C8.42595 17.3935 9.74986 17.8305 9.73356 18.7605C9.72052 19.0996 9.59269 19.4166 9.34878 19.6722C8.94443 20.0896 8.32486 20.2461 7.46726 20.2631C5.81269 20.2983 4.5866 20.0381 2.63269 18.8831L0.828125 22.4635C2.78008 23.5735 4.85204 24.1305 7.20639 24.1305L7.73595 24.1266C9.78508 24.0894 11.4481 23.5983 12.7694 22.5353C12.8451 22.4746 12.9129 22.4133 12.9833 22.3513L12.7616 23.494L17.7051 23.4783L18.592 21.2074C19.5246 21.5257 20.5851 21.7018 21.7107 21.7018C22.8077 21.7018 23.8394 21.5348 24.7544 21.2348L25.3727 23.4783L34.2423 23.4868L34.2638 18.3098H36.1512C40.7131 18.3098 43.4099 15.9881 43.4099 12.0946C43.4086 7.75831 40.7868 5.86961 35.2068 5.86961ZM21.7107 17.6492C21.0292 17.6492 20.3901 17.5305 19.8403 17.3218L21.6899 11.4816H21.7257L23.5453 17.3381C22.9975 17.5337 22.3733 17.6492 21.7101 17.6492H21.7107ZM35.5499 14.2937H34.2625V9.587H35.5505C37.2657 9.587 38.6353 10.1583 38.6353 11.91C38.634 13.7231 37.2657 14.2937 35.5505 14.2937" fill="white"/>
            </g>
            <defs>
              <linearGradient id="asn-sap-grad" x1="29.6628" y1="0" x2="29.6628" y2="29.3485" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00AEEF"/>
                <stop offset="0.212" stop-color="#0097DC"/>
                <stop offset="0.519" stop-color="#007CC5"/>
                <stop offset="0.792" stop-color="#006CB8"/>
                <stop offset="1" stop-color="#0066B3"/>
              </linearGradient>
              <clipPath id="asn-sap-clip"><rect width="60" height="29" fill="white"/></clipPath>
            </defs>
          </svg>
          <!-- Business Network menu button -->
          <button class="bn-shell-brand-btn" title="Back to Workbench" onclick="window.location.href='../index.html'">
            <span class="bn-shell-brand-text">Business Network</span>
            <span class="bn-shell-brand-arrow">
              ${_bnIcon("slim-arrow-down")}
            </span>
          </button>
        </div>
        <!-- Test Mode tag -->
        <span class="bn-test-tag">Test Mode</span>
      </div>

      <!-- ── CENTER – SEARCH FIELD (400px, absolute-centred) ── -->
      <div class="bn-shell-center">
        <div class="bn-search-wrap">
          <!-- Select / category dropdown -->
          <div class="bn-search-menu-btn">
            <div class="bn-search-select-inner">
              <span class="bn-search-select-text">Select</span>
              <span class="bn-search-select-arrow">
                ${_bnIcon("slim-arrow-down")}
              </span>
            </div>
          </div>
          <!-- Vertical separator -->
          <div class="bn-search-sep"></div>
          <!-- Search placeholder text -->
          <input class="bn-search-input" placeholder="Search" />
          <!-- Search icon button -->
          <button class="bn-search-btn" title="Search">
            ${_bnIcon("search")}
          </button>
        </div>
      </div>

      <!-- ── RIGHT AREA ── -->
      <div class="bn-shell-right">
        <!-- Enterprise label + separator -->
        <div class="bn-shell-enterprise-wrap">
          <span class="bn-shell-enterprise">Enterprise</span>
          <div class="bn-shell-divider"></div>
        </div>
        <!-- Action icon buttons -->
        <div class="bn-shell-actions">
          <!-- Joule AI -->
          <button class="bn-icon-btn" title="Joule"
            onclick="window._bnJouleToggle && window._bnJouleToggle()">
            ${_bnIcon("da")}
          </button>
          <!-- Bell -->
          <button class="bn-icon-btn" title="Notifications">
            ${_bnIcon("bell")}
          </button>
          <!-- Marketing campaign -->
          <button class="bn-icon-btn" title="Campaigns">
            ${_bnIcon("marketing-campaign")}
          </button>
          <!-- Discussion -->
          <button class="bn-icon-btn" title="Messages">
            ${_bnIcon("discussion-2")}
          </button>
          <!-- Sys-help -->
          <button class="bn-icon-btn" title="Help">
            ${_bnIcon("sys-help")}
          </button>
          <!-- Avatar JS with green presence dot -->
          <div class="bn-avatar" title="JS">
            JS
            <span class="bn-avatar-dot"></span>
          </div>
        </div>
      </div>

    </div>`
  });

  /* ────────────────────────────────────────────────────────────
     SIDE NAV (native HTML – pixel-accurate to Figma 178-25661)
  ──────────────────────────────────────────────────────────── */
  // Items: icon, key, label, active, hasArrow
  // Matches Figma exactly: home, favorite-list, present, sap-box (blank),
  // crm-sales (active+arrow), product+arrow, my-sales-order+arrow,
  // dimension+arrow, expense-report+arrow, money-bills+arrow,
  // enablement, opportunity, business-card
  var NAV_ITEMS = [
    { icon:"home.svg",            key:"home",         label:"Home" },
    { icon:"favorite-list.svg",   key:"favorites",    label:"Favorites" },
    { icon:"present.svg",         key:"present",      label:"Present" },
    { icon:"",                    key:"sapbox",       label:"", blank:true },
    { icon:"sap-box.svg",         key:"crm",          label:"CRM Sales",      active:true, hasArrow:true },
    { icon:"enablement.svg",      key:"product",      label:"Products",        hasArrow:true },
    { icon:"product.svg",         key:"sales",        label:"My Sales Orders", hasArrow:true },
    { icon:"my-sales-order.svg",  key:"dimensions",   label:"Dimensions",      hasArrow:true },
    { icon:"dimension.svg",       key:"expense",      label:"Expense Report",  hasArrow:true },
    { icon:"expense-report.svg",  key:"money",        label:"Money Bills",     hasArrow:true },
    { icon:"money-bills.svg",     key:"enable",       label:"Enablement",      hasArrow:true },
    { icon:"enablement.svg",      key:"opportunity",  label:"Opportunities" },
    { icon:"opportunity.svg",     key:"bcard",        label:"Business Card" },
    { icon:"business-card.svg",   key:"bcard2",       label:"Business Card 2" }
  ];

  var oSideNavItemsHtml = NAV_ITEMS.map(function (it) {
    var cls = "bn-nav-item" + (it.active ? " active" : "") + (it.hasArrow ? " has-arrow" : "");
    var iconHtml = it.blank ? "" :
        '<span class="bn-nav-icon-wrap">'
      +   _bnIcon(it.icon.replace(".svg", ""))
      + '</span>';
    var arrowHtml = it.hasArrow ?
        '<span class="bn-nav-arrow">'
      +   _bnIcon("slim-arrow-right", 12)
      + '</span>' : "";
    return '<button class="' + cls + '" title="' + it.label + '" data-key="' + it.key + '">'
         + '<span class="bn-nav-indicator"></span>'
         + iconHtml
         + arrowHtml
         + '</button>';
  }).join("");

  var oSideNav = new HTML({
    content: `
    <div class="bn-sidenav">
      <div class="bn-sidenav-content">
        ${oSideNavItemsHtml}
      </div>
      <div class="bn-sidenav-footer">
        <div class="bn-sidenav-sep"></div>
        <button class="bn-footer-write" title="Write New">
          ${_bnIcon("write-new")}
        </button>
        <button class="bn-footer-icon" title="Widgets">
          ${_bnIcon("widgets")}
        </button>
      </div>
    </div>`
  });

  /* ────────────────────────────────────────────────────────────
     KPI TILES – scrollable tile row with smart overflow arrows
  ──────────────────────────────────────────────────────────── */
  var KPI_TILES = [
    { key: "orders",          value: 40,  title: "Orders",             sub: "This month",   active: false },
    { key: "itemsToConfirm",  value: 14,  title: "Items to confirm",   sub: "This month",   active: false },
    { key: "itemsToShip",     value: 38,  title: "Items to ship",      sub: "This month", active: true  },
    { key: "returnItems",     value: 5,   title: "Return items",       sub: "This month",   active: false },
    { key: "newOrders",       value: 8,   title: "New orders",         sub: "This month",   active: false },
    { key: "changedOrders",   value: 3,   title: "Changed orders",     sub: "This month",   active: false },
    { key: "ordersToInvoice", value: 40,  title: "Orders to invoice",  sub: "This month",   active: false },
    { key: "serviceOrders",   value: 0,   title: "Orders with service line", sub: "This month", active: false },
    { key: "overdueInvoices", value: 40,  title: "Overdue invoices - Not approved", sub: "This month", active: false }
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

  /* Scroll buttons — use JS scrollLeft since overflow is hidden */
  window._bnKpiPrev = function () {
    var t = document.getElementById("bn-kpi-tiles-scroll");
    if (t) { t.scrollLeft -= 200; setTimeout(_updateKpiScroll, 320); }
  };
  window._bnKpiNext = function () {
    var t = document.getElementById("bn-kpi-tiles-scroll");
    if (t) { t.scrollLeft += 200; setTimeout(_updateKpiScroll, 320); }
  };

  /* ────────────────────────────────────────────────────────────
     FILTER BAR  (Figma Testing · node 189-15719)
     Wrapping flex, 223px fields, 16px gap
     Row 1: Customers | Order Number | Creation Date (token) | Need By Date
     Row 2: Confirmed Delivery Date | Product Group (range) | Planner Code | Stock Transfer Type
     Row 3: Ship From Location (token)          Actions: Apply | Clear | Adapt Filters
  ──────────────────────────────────────────────────────────── */

  oFCustomer = new ComboBox({
    width: "100%",
    placeholder: "Choose",
    change: applyFilters,
    selectionChange: applyFilters,
    items: [
      new Item({ key: "Good Company",  text: "Good Company" }),
      new Item({ key: "Dell",          text: "Dell" }),
      new Item({ key: "Apple",         text: "Apple" }),
      new Item({ key: "Ernst & Young", text: "Ernst & Young" }),
      new Item({ key: "Siemens AG",    text: "Siemens AG" }),
      new Item({ key: "SAP SE",        text: "SAP SE" })
    ]
  });

  oFOrderNum = new Input({
    width: "100%",
    placeholder: "Enter partial or exact match",
    liveChange: applyFilters
  });

  var oFCreationDate = new MultiInput({
    width: "100%",
    tokens: [new Token({ key: "last365", text: "Last 365 days" })]
  });

  var oFNeedByDate = new ComboBox({
    width: "100%",
    placeholder: "Select or type",
    items: []
  });

  var oFConfirmedDelivDate = new ComboBox({
    width: "100%",
    placeholder: "Select or type",
    items: []
  });

  var oFProductGroupFrom = new Input({ width: "100%", placeholder: "Choose" });
  var oFProductGroupTo   = new Input({ width: "100%", value: "ABC" });

  var oFPlannerCode = new Input({
    width: "100%",
    placeholder: "Enter partial or exact match"
  });

  var oFStockTransferType = new ComboBox({
    width: "100%",
    placeholder: "Choose",
    items: [
      new Item({ key: "CPT", text: "CPT" }),
      new Item({ key: "EXW", text: "EXW" }),
      new Item({ key: "DDP", text: "DDP" }),
      new Item({ key: "CIF", text: "CIF" })
    ]
  });

  var oFShipFromLocation = new MultiInput({
    width: "100%",
    placeholder: "Select"
  });

  /* ── Helper: one labeled field (223px fixed) ── */
  function fField(sLabel, oCtrl) {
    return new VBox({
      items: [ new Label({ text: sLabel }), oCtrl ]
    }).addStyleClass("bn-filter-field");
  }

  /* Product Group range: two inputs side-by-side under one label */
  var oFProductGroupField = new VBox({
    items: [
      new Label({ text: "Product Group:" }),
      new HBox({ items: [ oFProductGroupFrom, oFProductGroupTo ] })
        .addStyleClass("bn-filter-range")
    ]
  }).addStyleClass("bn-filter-field");

  /* The filter fields wrap naturally — no manual row splitting */
  var oFilterFields = new HBox({
    wrap: "Wrap",
    items: [
      fField("Customers:",               oFCustomer),
      fField("Order Number:",            oFOrderNum),
      fField("Creation Date:",           oFCreationDate),
      fField("Need By Date:",            oFNeedByDate),
      fField("Confirmed Delivery Date:", oFConfirmedDelivDate),
      oFProductGroupField,
      fField("Planner Code:",            oFPlannerCode),
      fField("Stock Transfer Type:",     oFStockTransferType),
      fField("Ship From Location:",      oFShipFromLocation)
    ]
  }).addStyleClass("bn-filter-fields");

  var oFilterBar = new VBox({
    width: "100%",
    items: [ oFilterFields ]
  }).addStyleClass("bn-filter-bar");

  /* ────────────────────────────────────────────────────────────
     TABLE
  ──────────────────────────────────────────────────────────── */
  oTableTitle = new Title({ text: "Items to Ship (" + SRC.length + ")", level: "H3", titleStyle: "H4" });

  var oTableToolbar = new Toolbar({
    design: "Transparent",
    content: [
      oTableTitle,
      new ToolbarSpacer(),
      new Button({ icon: "sap-icon://group-2",        type: "Transparent", tooltip: "Group View",
        press: function () { MessageToast.show("Group view"); } }),
      new Button({ icon: "sap-icon://action-settings", type: "Transparent", tooltip: "Column Settings",
        press: function () { MessageToast.show("Column settings"); } }),
      new ToolbarSeparator(),
      new MenuButton({
        icon: "sap-icon://excel-attachment",
        type: "Transparent",
        tooltip: "Export to Spreadsheet",
        defaultAction: function () { MessageToast.show("Export to spreadsheet"); },
        menu: new Menu({
          items: [
            new MenuItem({ text: "Export to Spreadsheet",  press: function () { MessageToast.show("Export to Spreadsheet"); } }),
            new MenuItem({ text: "Export as PDF",           press: function () { MessageToast.show("Export as PDF"); } })
          ]
        })
      }),
      new ToolbarSeparator(),
      new Button({ icon: "sap-icon://full-screen",    type: "Transparent", tooltip: "Full Screen",
        press: function () { MessageToast.show("Toggle full screen"); } })
    ]
  });

  /* Group key function — groups by PO number */
  function groupByPO(oContext) {
    return oContext.getProperty("poNumber");
  }

  /* Group header factory */
  function createGroupHeader(oGroup) {
    return new GroupHeaderListItem({
      title: "Purchase Order: " + oGroup.key,
      upperCase: false
    });
  }

  var oTable = new Table({
    mode: "MultiSelect",
    growing: true,
    growingThreshold: 10,
    growingScrollToLoad: false,
    busyIndicatorDelay: 0,
    sticky: ["HeaderToolbar", "ColumnHeaders"],
    width: "100%",
    updateStarted: function () {
      oTable.setBusy(true);
    },
    updateFinished: function (oEvent) {
      oTable.setBusy(false);
      /* After the first render drop threshold to 5 for all subsequent loads */
      if (oTable.getGrowingThreshold() !== 5) { oTable.setGrowingThreshold(5); }
      var total   = oEvent.getParameter("total");
      var visible = oEvent.getParameter("actual");
      if (window._bnTableMode === "shipNotice") {
        oTableTitle.setText("Ship Notice (" + total + ")");
        oTable.setGrowingTriggerText("");
      } else {
        var aOrders = oModel.getProperty("/orders") || SRC;
        oTableTitle.setText("Items to Ship (" + aOrders.length + ")");
        oTable.setGrowingTriggerText(
          visible < total
            ? "Load more (" + Math.min(5, total - visible) + ")"
            : "All " + total + " items loaded"
        );
      }
    },
    noDataText: "No orders found",
    headerToolbar: oTableToolbar,
    items: {
      path: "orders>/orders",
      groupHeaderFactory: createGroupHeader,
      sorter: new Sorter("poNumber", false, groupByPO),
      template: new ColumnListItem({
        type: "Navigation",
        press: function (e) {
          var ctx = e.getSource().getBindingContext("orders");
          if (ctx) { MessageToast.show("Open order: " + ctx.getProperty("orderNumber")); }
        },
        cells: [
          new Link({ text: "{orders>orderNumber}",
            press: function (e) {
              var ctx = e.getSource().getBindingContext("orders");
              if (ctx) { MessageToast.show("Order: " + ctx.getProperty("orderNumber")); }
            }
          }),
          new Text({ text: "{orders>itemNumber}" }),
          new Text({ text: "{orders>supplierPartNumber}", wrapping: false }),
          new Text({ text: "{orders>description}" }),
          new Text({ text: { parts: [{path:"orders>needBy"}],                formatter: fmtDate }, wrapping: false }),
          new Text({ text: { parts: [{path:"orders>shipBy"}],                formatter: fmtDate }, wrapping: false }),
          new Text({ text: { parts: [{path:"orders>confirmedDeliveryDate"}], formatter: fmtDate }, wrapping: false }),
          new Text({ text: "{orders>requestedQty}",           wrapping: false }),
          new Text({ text: "{orders>shippedQty}",             wrapping: false }),
          new Text({ text: "{orders>receivedQty}",            wrapping: false }),
          new Text({ text: "{orders>dueQty}",                 wrapping: false }),
          new Text({ text: "{orders>location}" }),
          new Text({ text: "{orders>purchasingGroup}",        wrapping: false }),
          new Text({ text: "{orders>purchasingOrg}" }),
          new Text({ text: "{orders>purchasingCode}",         wrapping: false })
        ]
      })
    },
    columns: [
      new Column({                                                                               header: new Text({ text: "Order Number" }) }),
      new Column({               minScreenWidth: "Tablet",  demandPopin: true,              header: new Text({ text: "Item Number" }) }),
      new Column({               minScreenWidth: "Tablet",  demandPopin: true,              header: new Text({ text: "Supplier Part Number" }) }),
      new Column({               minScreenWidth: "Tablet",  demandPopin: true,              header: new Text({ text: "Description" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Need By" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Ship By" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Confirmed Delivery Date" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Requested Quantity" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Shipped Quantity" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Received Quantity" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Due Quantity" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Location" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Purchasing Group" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Purchasing Organisation" }) }),
      new Column({               minScreenWidth: "Desktop", demandPopin: true,              header: new Text({ text: "Purchasing Code" }) })
    ]
  });
  oTable.setModel(oModel, "orders");

  /* ────────────────────────────────────────────────────────────
     SHIP NOTICE VIEW — triggered when user picks "Review the generated Ship Notices"
  ──────────────────────────────────────────────────────────── */
  var SN_DATA = [
    { shipNoticeNumber:"ASN-777", customer:"ABC", shipTo:"1200 W Fulton St, Chicago, IL 60607",      carrier:"Carrier A", shipDate:"", estDelivery:"2026-04-10", status:"Created", poNumber:"PO 123, PO 456" },
    { shipNoticeNumber:"ASN-999", customer:"ABC", shipTo:"4800 S Westmoreland Rd, Dallas, TX 75237", carrier:"+1 (214) 555-0182", shipDate:"", estDelivery:"2026-04-11", status:"Created", poNumber:"logistics@abcmetals.com" }
  ];

  window._bnOpenShipNotices = function () {
    /* 1 — Nav: deactivate CRM, activate dimension.svg (Ship Notices) */
    document.querySelectorAll(".bn-nav-item").forEach(function (el) {
      el.classList.remove("active");
      if (el.dataset.key === "expense") { el.classList.add("active"); }
    });

    /* 2 — Page title (header + browser tab) */
    var titleEl = document.querySelector(".bn-page-title");
    if (titleEl) { titleEl.textContent = "Ship Notice"; }
    document.title = "Ship Notice";

    /* 3 — KPI tiles: replace with single Ship Notice tile, hide manage-tiles + carousel */
    var kpiScroll = document.getElementById("bn-kpi-tiles-scroll");
    if (kpiScroll) {
      kpiScroll.innerHTML = _buildKpiTilesHtml([
        { key: "shipNotice", value: 2, title: "Ship Notice", sub: "Last 24 hours", active: true }
      ]);
    }
    var kpiRowHeader = document.querySelector(".bn-kpi-row-header");
    if (kpiRowHeader) { kpiRowHeader.style.display = "none"; }
    var btnPrev = document.getElementById("bn-kpi-btn-prev");
    var btnNext = document.getElementById("bn-kpi-btn-next");
    if (btnPrev) { btnPrev.style.display = "none"; }
    if (btnNext) { btnNext.style.display = "none"; }

    /* 4 — Creation Date token: replace "Last 365 days" with "Last 24 hours" */
    if (oFCreationDate) {
      oFCreationDate.removeAllTokens();
      oFCreationDate.addToken(new Token({ key: "last24h", text: "Last 24 hours" }));
    }

    /* 5 — Filter: hide fields after the first 4 (index >= 4) and hide footer actions */
    setTimeout(function () {
      var filterFields = document.querySelectorAll(".bn-filter-fields > .bn-filter-field, .bn-filter-fields > .sapMVBox.bn-filter-field");
      filterFields.forEach(function (el, idx) {
        if (idx >= 4) { el.style.display = "none"; }
      });
      var filterFooter = document.querySelector(".bn-filter-footer");
      if (filterFooter) { filterFooter.style.display = "none"; }
    }, 0);

    /* 6 — Table: replace data, columns, and title */
    window._bnTableMode = "shipNotice";
    /* Inject the user-selected ship date */
    var snRows = JSON.parse(JSON.stringify(SN_DATA));
    snRows.forEach(function (r) { r.shipDate = window._bnSelectedShipDate || ""; });
    oModel.setProperty("/orders", snRows);
    if (oTableTitle) { oTableTitle.setText("Ship Notice (2)"); }

    /* Replace columns */
    oTable.removeAllColumns();
    [
      "Ship Notice Number", "Customer", "Ship-To Address", "Phone",
      "Ship Date", "Est. Delivery", "Status"
    ].forEach(function (h) {
      oTable.addColumn(new Column({ header: new Text({ text: h }) }));
    });

    /* Replace item template */
    oTable.unbindItems();
    oTable.bindItems({
      path: "orders>/orders",
      template: new ColumnListItem({
        type: "Navigation",
        cells: [
          new Link({ text: "{orders>shipNoticeNumber}" }),
          new Text({ text: "{orders>customer}" }),
          new Text({ text: "{orders>shipTo}" }),
          new Text({ text: "{orders>carrier}", wrapping: false }),
          new Text({ text: { parts: [{path:"orders>shipDate"}],    formatter: fmtDate }, wrapping: false }),
          new Text({ text: { parts: [{path:"orders>estDelivery"}], formatter: fmtDate }, wrapping: false }),
          new ObjectStatus({
            text:  "{orders>status}",
            state: { parts: [{path:"orders>status"}], formatter: function (s) { return s === "Cancelled" ? "Error" : "Information"; } }
          })
        ]
      })
    });

    /* 7 — Wire auto-type + action chips */
    setTimeout(function () {
      var input = document.getElementById("bn-joule-input");
      var sendBtn = document.getElementById("bn-joule-send");
      if (input) {
        input.value = "";
        input.disabled = false;
        if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = ".4"; }

        var onSnInputClick = function () {
          input.removeEventListener("click", onSnInputClick);
          input.removeEventListener("focus", onSnInputClick);
          _bnAutoTypeInput("Cancel 777");
        };
        input.addEventListener("click", onSnInputClick);
        input.addEventListener("focus", onSnInputClick);

        /* Show action chips in Joule panel */
        var _ab = window._bnJouleAppendBubble;
        var _sb = window._bnJouleScrollBottom;
        if (typeof _ab === "function") {
          var snChips = _ab("bn-joule-options", "");
          if (snChips) {
            snChips.style.opacity = "0";
            snChips.style.transform = "translateY(4px)";
            snChips.style.transition = "opacity .3s ease,transform .3s ease";
            [
              { num: "1", label: "Edit ASN-777" },
              { num: "2", label: "Edit ASN-999"   }
            ].forEach(function (opt) {
              var cb = document.createElement("button");
              cb.className = "bn-joule-option-btn";
              cb.innerHTML =
                '<div style="display:flex;align-items:center;gap:8px;">' +
                  '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                  '<span>' + opt.label + '</span>' +
                '</div>';
              cb.addEventListener("click", function () {
                snChips.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                  b.disabled = true;
                  b.style.opacity = b === cb ? "1" : ".45";
                });
                cb.style.borderColor = "#5d36ff";
                cb.style.background  = "#f0eeff";
                input.removeEventListener("click", onSnInputClick);
                input.removeEventListener("focus", onSnInputClick);
                if (opt.num === "1") {
                  /* Type "Cancel 777" into input and send it */
                  _ab("bn-joule-user-bubble", opt.label);
                  if (typeof _sb === "function") { _sb(); }
                  setTimeout(function () {
                    _bnAutoTypeInput("Cancel 777");
                    setTimeout(function () {
                      var sendBtn2 = document.getElementById("bn-joule-send");
                      if (sendBtn2) { sendBtn2.click(); }
                    }, 1800);
                  }, 300);
                } else {
                  _ab("bn-joule-user-bubble", opt.label);
                  if (typeof _sb === "function") { _sb(); }
                  window._bnTypeReply("Of course, I\u2019ll get that sorted.", function () {
                    window._bnEditShipNoticeFlow && window._bnEditShipNoticeFlow();
                  });
                }
              });
              snChips.appendChild(cb);
            });
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                snChips.style.opacity = "1";
                snChips.style.transform = "translateY(0)";
                if (typeof _sb === "function") { _sb(); }
              });
            });
          }
        }
      }
    }, 300);
  };

  /* ────────────────────────────────────────────────────────────
     JOULE PANEL (Figma 180-33070)
  ──────────────────────────────────────────────────────────── */
  var oJoulePanel = new HTML({
    content: `
    <div class="bn-joule" id="bn-joule-panel">
      <!-- Header: gradient #5d36ff→#6431fa, 56px, rounded top corners -->
      <div class="bn-joule-header">
        <!-- Left: title -->
        <div class="bn-joule-header-title">
          ${_bnIcon("da", 16, "filter:brightness(0) invert(1);margin-left:2px;")}
          <span class="bn-joule-title">Joule</span>
        </div>
        <!-- Right toolbar: overflow, fullscreen, minimize/close -->
        <div class="bn-joule-toolbar">
          <button class="bn-joule-hbtn" title="Reset conversation"
            onclick="window._bnJouleReset && window._bnJouleReset()">
            ${_bnIcon("restart", 16, "filter:brightness(0) invert(1);")}
          </button>
          <button class="bn-joule-hbtn" title="Full screen">
            ${_bnIcon("full-screen", 16, "filter:brightness(0) invert(1);")}
          </button>
          <button class="bn-joule-hbtn" title="More options">
            ${_bnIcon("overflow", 16, "filter:brightness(0) invert(1);")}
          </button>
          <button class="bn-joule-hbtn" title="Minimize"
            onclick="window._bnJouleToggle && window._bnJouleToggle()">
            ${_bnIcon("decline", 16, "filter:brightness(0) invert(1);")}
          </button>
        </div>
      </div>

      <!-- Body: scrollable conversation area, grey background -->
      <div class="bn-joule-body" id="bn-joule-body" style="display:none;">
        <div class="bn-joule-content">
          <!-- Timestamp -->
        </div>
      </div>

      <!-- Welcome screen (shown after loader, hidden when chat starts) -->
      <div class="bn-joule-welcome" id="bn-joule-welcome" style="display:none;flex:1;overflow-y:auto;">
        <div class="bn-joule-welcome-hero">
          <div class="bn-joule-welcome-icon">
            <svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- diamond body — static -->
              <path fill-rule="evenodd" clip-rule="evenodd" d="M46.8267 37C45.5538 37 44.3487 37.5715 43.5464 38.5556L25.0605 61.23C23.8466 62.7189 23.7973 64.8368 24.9406 66.3802L61.9123 116.29C62.7089 117.365 63.9708 118 65.3126 118C66.6543 118 67.9163 117.365 68.7128 116.29L105.685 66.3802C106.828 64.8368 106.779 62.7189 105.565 61.23L87.0788 38.5556C86.2765 37.5715 85.0714 37 83.7985 37H46.8267ZM88.7496 63.5392C80.0259 62.0748 77.2344 55.2489 76.3121 50.9797C76.2125 50.5577 75.6641 50.5825 75.5893 51.0045C74.1188 59.6919 67.2644 62.4719 62.9774 63.3903C62.5536 63.4896 62.5786 64.0357 63.0023 64.1101C71.726 65.5746 74.5176 72.4004 75.4398 76.6697C75.5395 77.0917 76.0878 77.0668 76.1626 76.6449C77.6332 67.9574 84.4875 65.1774 88.7746 64.259C89.1983 64.1598 89.1734 63.6137 88.7496 63.5392Z" fill="white"/>
              <!-- stars — flashing -->
              <path class="bn-star" style="animation:bn-star-flash 2s ease-in-out infinite;animation-delay:0s" d="M102.031 20.3013C102.652 23.126 104.532 27.6422 110.407 28.6111C110.692 28.6604 110.709 29.0217 110.424 29.0874C107.536 29.695 102.92 31.5343 101.93 37.2822C101.879 37.5614 101.51 37.5778 101.443 37.2986C100.822 34.474 98.9419 29.9578 93.0668 28.9888C92.7815 28.9396 92.7647 28.5783 93.0501 28.5126C95.9372 27.905 100.553 26.0656 101.544 20.3178C101.594 20.0386 101.963 20.0222 102.031 20.3013Z" fill="white"/>
              <path class="bn-star" style="animation:bn-star-flash 2s ease-in-out infinite;animation-delay:.7s" d="M42.4844 0.302036C43.4002 4.53904 46.1725 11.3133 54.8357 12.7667C55.2565 12.8406 55.2813 13.3826 54.8605 13.4811C50.6031 14.3925 43.7962 17.1515 42.3359 25.7733C42.2616 26.1921 41.7171 26.2167 41.6181 25.798C40.7022 21.561 37.93 14.7867 29.2667 13.3333C28.8459 13.2594 28.8212 12.7174 29.242 12.6189C33.4993 11.7075 40.3062 8.94848 41.7666 0.326668C41.8408 -0.0921059 42.3854 -0.116738 42.4844 0.302036Z" fill="white"/>
              <path class="bn-star" style="animation:bn-star-flash 2s ease-in-out infinite;animation-delay:1.3s" d="M16.868 26.3048C17.4786 29.1782 19.3267 33.7722 25.1022 34.7579C25.3828 34.808 25.3993 35.1755 25.1187 35.2423C22.2805 35.8604 17.7426 37.7315 16.769 43.5784C16.7195 43.8624 16.3565 43.8791 16.2905 43.5951C15.6799 40.7218 13.8317 36.1277 8.05623 35.1421C7.7757 35.092 7.7592 34.7244 8.03973 34.6576C10.878 34.0395 15.4159 32.1685 16.3895 26.3215C16.439 26.0375 16.802 26.0208 16.868 26.3048Z" fill="white"/>
            </svg>
          </div>
          <div class="bn-joule-welcome-text">
            <div class="bn-joule-welcome-hello">Hello Sam,</div>
            <div class="bn-joule-welcome-tagline">How can I <span id="bn-joule-word">help</span> you?</div>
            <div class="bn-joule-welcome-hint">Describe what you need and I will take care of the rest. For example, "Show my items to ship this week."</div>
          </div>
        </div>
        <div class="bn-joule-welcome-chips">
          <div class="bn-joule-welcome-chips-label">Get started</div>
          <div class="bn-joule-welcome-chips-row">
            <button class="bn-joule-welcome-chip" id="bn-joule-welcome-chip-asn">Review order items to ship this week</button>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="bn-joule-footer">
        <div class="bn-joule-input-wrap" id="bn-joule-input-wrap">
          <div class="bn-joule-input-text">
            <span class="bn-joule-cursor"></span>
            <input class="bn-joule-input" id="bn-joule-input"
              placeholder="Message Joule..." />
          </div>
          <button class="bn-joule-send" id="bn-joule-send" title="Send">
            ${_bnIcon("paper-plane", 16, "filter:brightness(0) invert(1);")}
          </button>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="bn-joule-disclaimer">
        Joule is powered by generative AI and all output should be reviewed before use.
        Please do not enter any sensitive personal data, and avoid entering any other
        personal data you do not wish to be processed.
      </div>
    </div>`
  });

  /* Joule toggle — hidden by default, opened via shell bar Joule icon */
  var _bnJouleOpened = false;
  window._bnJouleToggle = function () {
    var el = document.getElementById("bn-joule-panel");
    var wrap = el && el.parentElement;
    if (!el) { return; }
    _bnJouleOpened = !_bnJouleOpened;
    el.style.display = _bnJouleOpened ? "flex" : "none";
    if (wrap) {
      wrap.style.display = _bnJouleOpened ? "block" : "none";
    }
    /* Start greeting animation the first time; show loader on every open */
    if (_bnJouleOpened) {
      var isFirstOpen = !el.dataset.greeted;

      /* Show loading screen every time */
      var loader = document.createElement("div");
      loader.className = "bn-joule-loader";
      var dotsHtml = "";
      for (var d = 0; d < 9; d++) {
        var delay = (Math.random() * 1.2).toFixed(2);
        var dur   = (1.0 + Math.random() * 0.8).toFixed(2);
        dotsHtml += '<div class="bn-joule-loader-dot" style="animation-delay:' + delay + 's;animation-duration:' + dur + 's"></div>';
      }
      loader.innerHTML = '<div class="bn-joule-loader-grid">' + dotsHtml + '</div>';
      el.style.position = "relative";
      el.appendChild(loader);

      /* Fade loader out after 1.4s */
      var loaderTimers = [];
      setTimeout(function () {
        loader.classList.add("fade-out");
        setTimeout(function () {
          if (loader.parentNode) { loader.parentNode.removeChild(loader); }
          if (!isFirstOpen) { scrollBottom(); }
        }, 420);
      }, 1400);

      if (isFirstOpen) {
        el.dataset.greeted = "1";

        /* Show welcome screen underneath before fade starts */
        var welcome = document.getElementById("bn-joule-welcome");
        if (welcome) { welcome.style.display = "flex"; welcome.style.flexDirection = "column"; }

        /* Cycle help / assist / guide in the tagline */
        var _bnWords = ["help", "assist", "guide"];
        var _bnWordIdx = 0;
        var _bnWordEl = document.getElementById("bn-joule-word");
        if (_bnWordEl) {
          var _bnWordTimer = setInterval(function () {
            _bnWordEl.classList.add("fade");
            setTimeout(function () {
              _bnWordIdx = (_bnWordIdx + 1) % _bnWords.length;
              _bnWordEl.textContent = _bnWords[_bnWordIdx];
              _bnWordEl.classList.remove("fade");
            }, 360);
          }, 2200);
          window._bnStopWordCycle = function () { clearInterval(_bnWordTimer); };
        }

        /* Wire input click on welcome screen to auto-type the message */
        var input = document.getElementById("bn-joule-input");
        if (input) {
          function onWelcomeInputClick() {
            input.removeEventListener("click", onWelcomeInputClick);
            input.removeEventListener("focus", onWelcomeInputClick);
            _bnAutoTypeInput("I want to review the Order items I have confirmed I will ship this week for customer ABC");
          }
          input.addEventListener("click", onWelcomeInputClick);
          input.addEventListener("focus", onWelcomeInputClick);
        }
      }

    }
  };

  /* Reset Joule — clear state then re-run the full loader + greeting flow */
  window._bnJouleReset = function () {
    var el = document.getElementById("bn-joule-panel");
    if (!el) { return; }

    /* Stop word-cycle timer if running */
    if (window._bnStopWordCycle) { window._bnStopWordCycle(); }

    /* Clear conversation body */
    var body = document.getElementById("bn-joule-body");
    if (body) {
      body.style.display = "none";
      var content = body.querySelector(".bn-joule-content");
      if (content) { content.innerHTML = ""; }
    }

    /* Hide welcome screen */
    var welcome = document.getElementById("bn-joule-welcome");
    if (welcome) { welcome.style.display = "none"; }

    /* Clear input */
    var input = document.getElementById("bn-joule-input");
    if (input) { input.value = ""; }

    /* Clear greeted flag so _bnJouleToggle treats the next open as first-open */
    delete el.dataset.greeted;

    /* Restore workbench data if ASNs were applied */
    if (_bnAsnApplied) {
      _bnAsnApplied = false;
      /* Re-read original SRC — splice removed entries, restore them from the original snapshot */
      /* SRC is already the live array; reload all 38 rows from the static declaration copy */
      SRC.length = 0;
      Array.prototype.push.apply(SRC, JSON.parse(JSON.stringify(window._bnSrcBackup)));
      KPI_TILES.forEach(function (t) { if (t.key === "itemsToShip") { t.value = 38; } });
      oModel.setProperty("/orders", JSON.parse(JSON.stringify(SRC)));
      if (oTableTitle && window._bnTableMode !== "shipNotice") {
        oTableTitle.setText("Items to Ship (" + SRC.length + ")");
      }
    }

    /* Close then immediately reopen — toggle handles loader + greeting */
    _bnJouleOpened = true;          /* panel is already visible, force close first */
    window._bnJouleToggle();        /* closes */
    window._bnJouleToggle();        /* opens → runs loader → greeting */
  };

  /* Auto-type a string into the Joule input (demo mode) */
  function _bnAutoTypeInput(text) {
    var input = document.getElementById("bn-joule-input");
    if (!input) { return; }

    /* Make input behave like a naturally-scrolling text field:
       set scrollLeft to max after each keystroke so the cursor
       (and the latest characters) are always visible at the right. */
    input.style.textOverflow = "clip";

    var i = 0;
    function typeNext() {
      if (i >= text.length) { return; }
      input.value += text[i];
      input.scrollLeft = input.scrollWidth;
      input.dispatchEvent(new Event("input"));
      i++;

      var ch = text[i - 1];
      var delay;
      if (ch === " ") {
        /* brief pause between words, occasionally longer */
        delay = Math.random() < 0.15 ? 120 + Math.random() * 180 : 30 + Math.random() * 60;
      } else if (ch === "," || ch === "." || ch === "!" || ch === "?") {
        /* pause after punctuation */
        delay = 180 + Math.random() * 200;
      } else {
        /* normal keystroke: fast base with occasional hesitation */
        delay = Math.random() < 0.08
          ? 200 + Math.random() * 300   /* rare long pause — "thinking" */
          : 18 + Math.random() * 55;    /* normal burst */
      }
      setTimeout(typeNext, delay);
    }
    setTimeout(typeNext, 120);
  }

  /* Joule greeting — typewriter animation after thinking dots */
  /* Exposed as startGreeting so _bnJouleToggle can call it on first open */
  var GREETING    = "Good day, Sam. I\u2019m Joule, your SAP Business Network assistant. How can I help you today?";
  var DOT_DELAY   = 1800;
  var TYPE_SPEED  = 38;
  var SHIMMER_END = 800;

  function startGreeting(onReady) {
    var bubble = document.getElementById("bn-joule-greeting");
    var dots   = document.getElementById("bn-joule-dots");
    if (!bubble || !dots) { return; }

    setTimeout(function () {
      dots.style.display = "none";

      var textEl  = document.createElement("span");
      textEl.className = "bn-joule-typing";
      var caretEl = document.createElement("span");
      caretEl.className = "bn-joule-caret";

      bubble.appendChild(textEl);
      bubble.appendChild(caretEl);

      var i = 0;
      var timer = setInterval(function () {
        textEl.textContent += GREETING[i];
        i++;
        if (i >= GREETING.length) {
          clearInterval(timer);
          setTimeout(function () {
            textEl.style.background          = "none";
            textEl.style.webkitTextFillColor = "#1d2d3e";
            textEl.style.color               = "#1d2d3e";
            textEl.className                 = "";
            setTimeout(function () {
              caretEl.style.display = "none";
              var input = document.getElementById("bn-joule-input");
              if (!input) { return; }
              if (onReady) {
                /* Called from chip — auto-type immediately */
                onReady();
              } else {
                /* Direct open — wait for user to click input */
                function onInputClick() {
                  input.removeEventListener("click", onInputClick);
                  input.removeEventListener("focus", onInputClick);
                  _bnAutoTypeInput("I want to review the Order items I have confirmed I will ship this week for customer ABC");
                }
                input.addEventListener("click", onInputClick);
                input.addEventListener("focus", onInputClick);
              }
            }, 1200);
          }, SHIMMER_END);
        }
      }, TYPE_SPEED);
    }, DOT_DELAY);
  }

  /* ── Joule conversation: send message → show result card ── */
  (function () {
    /* Orders to surface — items confirmed to ship this week for customer ABC */
    var MATCHED_ORDERS = [
      { po:"PO 123", item:"10", shipTo:"1200 W Fulton St, Chicago, IL 60607",       qty:"10", deliveryDate:"April 10th" },
      { po:"PO 456", item:"10", shipTo:"1200 W Fulton St, Chicago, IL 60607",       qty:"12", deliveryDate:"April 10th" },
      { po:"PO 456", item:"20", shipTo:"1200 W Fulton St, Chicago, IL 60607",       qty:"50", deliveryDate:"April 11th" },
      { po:"PO 789", item:"10", shipTo:"4800 S Westmoreland Rd, Dallas, TX 75237",  qty:"33", deliveryDate:"April 12th" },
      { po:"PO 789", item:"20", shipTo:"4800 S Westmoreland Rd, Dallas, TX 75237",  qty:"23", deliveryDate:"April 13th" },
      { po:"PO 304", item:"10", shipTo:"4800 S Westmoreland Rd, Dallas, TX 75237",  qty:"18", deliveryDate:"April 14th" }
    ];

    function getNow() {
      var d = new Date();
      var h = d.getHours(), m = d.getMinutes();
      var ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return h + ":" + (m < 10 ? "0" + m : m) + " " + ampm;
    }

    function scrollBottom() {
      var body = document.querySelector(".bn-joule-body");
      if (body) { body.scrollTop = body.scrollHeight; }
    }

    function appendBubble(cls, html) {
      var content = document.querySelector(".bn-joule-content");
      if (!content) { return null; }
      var el = document.createElement("div");
      el.className = cls;
      el.innerHTML = html;
      content.appendChild(el);
      scrollBottom();
      return el;
    }

    function showThinkingDots(cb) {
      var el = appendBubble("bn-joule-bubble",
        '<div class="bn-joule-dots" id="bn-jd2">' +
        '<div class="bn-joule-dot"></div>' +
        '<div class="bn-joule-dot"></div>' +
        '<div class="bn-joule-dot"></div>' +
        '</div>'
      );
      scrollBottom();
      setTimeout(function () {
        if (el && el.parentNode) { el.parentNode.removeChild(el); }
        cb();
      }, 1600);
    }

    function typeReply(text, onDone) {
      var bubble = appendBubble("bn-joule-bubble", "");
      var textEl = document.createElement("span");
      textEl.className = "bn-joule-typing";
      var caretEl = document.createElement("span");
      caretEl.className = "bn-joule-caret";
      bubble.appendChild(textEl);
      bubble.appendChild(caretEl);

      var i = 0;
      var timer = setInterval(function () {
        textEl.textContent += text[i];
        i++;
        scrollBottom();
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(function () {
            textEl.style.background = "none";
            textEl.style.webkitTextFillColor = "#1d2d3e";
            textEl.style.color = "#1d2d3e";
            textEl.className = "";
            caretEl.style.display = "none";
            if (onDone) { onDone(); }
          }, 600);
        }
      }, 32);
    }

    function typeBoldReply(text, onDone) {
      var bubble = appendBubble("bn-joule-bubble", "");
      var strong = document.createElement("strong");
      strong.style.color = "#1d2d3e";
      var caretEl = document.createElement("span");
      caretEl.className = "bn-joule-caret";
      bubble.appendChild(strong);
      bubble.appendChild(caretEl);
      var i = 0;
      var timer = setInterval(function () {
        strong.textContent += text[i];
        i++;
        scrollBottom();
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(function () {
            caretEl.style.display = "none";
            if (onDone) { onDone(); }
          }, 600);
        }
      }, 32);
    }

    function buildResultCard() {
      var rows = MATCHED_ORDERS.map(function (o) {
        return '<div class="bn-joule-card-row">' +
          '<span class="bn-joule-card-order">' + o.po + '<br>Item ' + o.item + '</span>' +
          '<span class="bn-joule-card-desc">' + o.shipTo + '<br>' +
            '<span class="bn-joule-confirm-label">Confirmed</span>' +
          '</span>' +
          '<span class="bn-joule-card-ship">Qty ' + o.qty + '<br>' +
            '<span style="color:#8396a8;font-size:11px;">' + o.deliveryDate + '</span>' +
          '</span>' +
        '</div>';
      }).join("");

      var card = appendBubble("bn-joule-result-card",
        '<div class="bn-joule-card-header">' +
          '<div class="bn-joule-card-header-dot"></div>' +
          'ABC \u2014 Items confirmed to ship this week' +
        '</div>' +
        '<div class="bn-joule-card-row" style="background:#f7f9fb;padding:5px 12px;">' +
          '<span class="bn-joule-card-col-label">PO / ITEM</span>' +
          '<span class="bn-joule-card-col-label" style="padding:0 8px;">SHIP TO</span>' +
          '<span class="bn-joule-card-col-label" style="text-align:right;">QTY / DELIVERY</span>' +
        '</div>' +
        rows +
        '<div class="bn-joule-card-footer">' +
          MATCHED_ORDERS.length + ' items across 4 purchase orders \u2014 all confirmed for shipment' +
        '</div>'
      );

      /* Fade-in the card then show guide message */
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(6px)";
        card.style.transition = "opacity .35s ease, transform .35s ease";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            scrollBottom();
            setTimeout(buildGuideMessage, 700);
          });
        });
      }
    }

    /* ── Shipping date calendar (max April 9th) ── */
    function buildShippingDateInput() {
      var MONTHS = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];
      var DOW    = ["Su","Mo","Tu","We","Th","Fr","Sa"];

      var now = new Date();
      /* Before 10am: can ship today. 10am or later: earliest is tomorrow. */
      var FLOOR = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (now.getHours() >= 10) { FLOOR.setDate(FLOOR.getDate() + 1); }

      /* RECOMMENDED = April 9 of the nearest upcoming April */
      var recYear = now.getFullYear();
      /* If we're past April 9 this year, use next year */
      if (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() > 9)) { recYear++; }
      var RECOMMENDED = new Date(recYear, 3, 9); /* April 9 */

      /* Open on today's month */
      var cur = { y: now.getFullYear(), m: now.getMonth() };
      var selectedDate = null;

      var cal = appendBubble("bn-joule-cal", "");
      if (!cal) { return; }
      cal.style.opacity = "0";
      cal.style.transform = "translateY(6px)";
      cal.style.transition = "opacity .3s ease,transform .3s ease";

      function render() {
        var firstDay    = new Date(cur.y, cur.m, 1).getDay();
        var daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate();
        var daysInPrev  = new Date(cur.y, cur.m, 0).getDate();

        /* Header */
        var navHtml =
          '<div class="bn-joule-cal-nav">' +
            '<button class="bn-joule-cal-nav-btn" id="bn-cal-prev">&#8249;</button>' +
            '<span class="bn-joule-cal-month">' + MONTHS[cur.m] + ' ' + cur.y + '</span>' +
            '<button class="bn-joule-cal-nav-btn" id="bn-cal-next">&#8250;</button>' +
          '</div>';

        /* Hint / warning banner */
        var isLate = selectedDate && new Date(selectedDate.y, selectedDate.m, selectedDate.d) > RECOMMENDED;
        var hintHtml = isLate
          ? '<div style="font-size:11px;color:#bb4a00;background:#fff3e0;border-radius:4px;' +
              'padding:4px 10px;margin:0 8px 6px 8px;text-align:center;">' +
              '&#9888; Late shipping — orders may not arrive on time' +
            '</div>'
          : '<div style="font-size:11px;color:#256f3a;background:#e8f5e9;border-radius:4px;' +
              'padding:4px 10px;margin:0 8px 6px 8px;text-align:center;">' +
              '&#10003; Ship by April 9th ' + recYear + ' to guarantee on-time delivery' +
            '</div>';

        /* Day-of-week row */
        var dowHtml = '<div class="bn-joule-cal-dow">' +
          DOW.map(function (d) { return '<span>' + d + '</span>'; }).join("") +
          '</div>';

        /* Day cells */
        var cells = [];
        for (var p = firstDay - 1; p >= 0; p--) {
          cells.push('<button class="bn-joule-cal-day other-month" disabled>' + (daysInPrev - p) + '</button>');
        }
        for (var d = 1; d <= daysInMonth; d++) {
          var cellDate = new Date(cur.y, cur.m, d);
          var isPast = cellDate < FLOOR;
          var isRec  = (d === RECOMMENDED.getDate() && cur.m === RECOMMENDED.getMonth() && cur.y === RECOMMENDED.getFullYear());
          var isGood = cellDate <= RECOMMENDED;
          var isWarn = cellDate > RECOMMENDED;
          var isSel  = selectedDate && (d === selectedDate.d && cur.m === selectedDate.m && cur.y === selectedDate.y);
          if (isPast) {
            cells.push('<button class="bn-joule-cal-day other-month" disabled>' + d + '</button>');
          } else {
            var cls = "bn-joule-cal-day" + (isRec ? " today" : "") + (isSel ? " selected" : "");
            var extraStyle = "";
            if (!isSel && isGood) { extraStyle = "color:#256f3a;"; }
            if (isRec && !isSel)  { extraStyle = "color:#256f3a;border:1.5px solid #256f3a;font-weight:700;"; }
            if (!isSel && isWarn) { extraStyle = "color:#bb4a00;"; }
            cells.push('<button class="' + cls + '" data-d="' + d + '" data-warn="' + (isWarn ? "1" : "0") + '"' +
              (extraStyle ? ' style="' + extraStyle + '"' : '') + '>' + d + '</button>');
          }
        }
        var remaining = 42 - cells.length;
        for (var n = 1; n <= remaining; n++) {
          cells.push('<button class="bn-joule-cal-day other-month" disabled>' + n + '</button>');
        }
        var daysHtml = '<div class="bn-joule-cal-days">' + cells.join("") + '</div>';

        /* Confirm button */
        var okDisabled = selectedDate ? "" : " disabled";
        var confirmHtml =
          '<div class="bn-joule-cal-confirm">' +
            '<button class="bn-joule-cal-ok" id="bn-cal-ok"' + okDisabled + '>Confirm</button>' +
          '</div>';

        cal.innerHTML = navHtml + hintHtml + dowHtml + daysHtml + confirmHtml;

        /* Wire nav — replace buttons with clones to avoid stacking listeners */
        var prevBtn = cal.querySelector("#bn-cal-prev");
        var nextBtn = cal.querySelector("#bn-cal-next");
        var prevClone = prevBtn.cloneNode(true);
        var nextClone = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(prevClone, prevBtn);
        nextBtn.parentNode.replaceChild(nextClone, nextBtn);
        prevClone.addEventListener("click", function () {
          cur.m--; if (cur.m < 0) { cur.m = 11; cur.y--; } render();
        });
        nextClone.addEventListener("click", function () {
          cur.m++; if (cur.m > 11) { cur.m = 0; cur.y++; } render();
        });

        /* Wire day clicks — fresh nodes each render, no leak */
        cal.querySelectorAll(".bn-joule-cal-day:not(.other-month)").forEach(function (btn) {
          btn.addEventListener("click", function () {
            selectedDate = { d: parseInt(btn.getAttribute("data-d")), m: cur.m, y: cur.y };
            render();
          });
        });

        /* Wire confirm */
        var okBtn = cal.querySelector("#bn-cal-ok");
        if (okBtn && !okBtn.disabled) {
          okBtn.addEventListener("click", function () {
            if (!selectedDate) { return; }
            var mm = String(selectedDate.m + 1).padStart(2, "0");
            var dd = String(selectedDate.d).padStart(2, "0");
            window._bnSelectedShipDate = selectedDate.y + "-" + mm + "-" + dd;
            var dateStr = MONTHS[selectedDate.m] + ' ' + selectedDate.d;
            if (cal.parentNode) { cal.parentNode.removeChild(cal); }
            appendBubble("bn-joule-user-bubble", dateStr);
            scrollBottom();
            showThinkingDots(function () {
              var statusEl = appendBubble("bn-joule-status",
                _bnStatusHtml('Reading historical data for carriers assigned to shipments on the same route\u2026', 2200)
              );
              scrollBottom();
              setTimeout(function () {
                if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }
                buildCarrierOptions(dateStr);
              }, 2200);
            });
          });
        }
      }

      render();

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          cal.style.opacity = "1";
          cal.style.transform = "translateY(0)";
          scrollBottom();
        });
      });
    }

    /* ── Carrier selection ── */
    function buildCarrierOptions(dateStr) {
      /* Parse the selected ship date so we can compute delivery dates */
      var MONTHS_SHORT = ["January","February","March","April","May","June",
                          "July","August","September","October","November","December"];
      function addDays(isoDate, n) {
        var d = new Date(isoDate + "T00:00:00");
        d.setDate(d.getDate() + n);
        return MONTHS_SHORT[d.getMonth()] + " " + d.getDate();
      }
      var shipIso = window._bnSelectedShipDate || new Date().toISOString().slice(0,10);

      var CARRIERS = [
        {
          name: "Carrier A",
          tag: "Best match",
          detail: "On-time rate 97% · Avg. 2 days · Cost $320 · Used 14×",
          avgDays: 2,
          tagColor: "#256f3a", tagBg: "#e8f5e9"
        },
        {
          name: "Carrier B",
          tag: "2nd best",
          detail: "On-time rate 91% · Avg. 3 days · Cost $290 · Used 8×",
          avgDays: 3,
          tagColor: "#0064d9", tagBg: "#e8f4ff"
        }
      ];

      var introText =
        "Based on historical shipments along this route, I am recommending the following carriers:";

      typeReply(introText, function () {
        setTimeout(function () {
          /* Carrier option cards */
          var wrap = appendBubble("bn-joule-options", "");
          if (!wrap) { return; }
          wrap.style.opacity = "0";
          wrap.style.transform = "translateY(4px)";
          wrap.style.transition = "opacity .3s ease,transform .3s ease";

          CARRIERS.forEach(function (carrier, idx) {
            var btn = document.createElement("button");
            btn.className = "bn-joule-option-btn";
            btn.style.flexDirection = "column";
            btn.style.alignItems    = "flex-start";
            btn.style.gap           = "4px";
            btn.innerHTML =
              '<div style="display:flex;align-items:center;gap:8px;width:100%;">' +
                '<span class="bn-joule-option-num">' + (idx + 1) + '</span>' +
                '<span style="font-weight:700;font-size:13px;">' + carrier.name + '</span>' +
                '<span style="margin-left:auto;font-size:11px;font-weight:700;' +
                  'background:' + carrier.tagBg + ';color:' + carrier.tagColor + ';' +
                  'border-radius:4px;padding:1px 7px;">' + carrier.tag + '</span>' +
              '</div>' +
              '<div style="padding-left:28px;font-size:12px;color:#556b82;">' + carrier.detail + '</div>';

            btn.addEventListener("click", function () {
              wrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                b.disabled = true;
                b.style.opacity = b === btn ? "1" : ".45";
              });
              btn.style.borderColor = "#5d36ff";
              btn.style.background  = "#f0eeff";
              appendBubble("bn-joule-user-bubble", carrier.name);
              scrollBottom();

              if (carrier.name === "Carrier B") {
                /* Carrier B — avg 3 days: ASN-777 = +3, ASN-999 = +4 (Dallas is 1 day further) */
                showThinkingDots(function () {
                  typeReply(
                    "Carrier B has been assigned to ASN-777 and ASN-999. Estimated shipping date: " + dateStr + ". " +
                    "Estimated delivery date: " + addDays(shipIso, carrier.avgDays) + " for ASN-777 and " + addDays(shipIso, carrier.avgDays + 1) + " for ASN-999.",
                    function () {
                      _bnApplyAsnToWorkbench();
                      setTimeout(function () {
                        typeBoldReply("How can I assist you next?", function () {
                          setTimeout(function () {
                            var optWrap = appendBubble("bn-joule-options", "");
                            if (!optWrap) { return; }
                            optWrap.style.opacity = "0";
                            optWrap.style.transform = "translateY(4px)";
                            optWrap.style.transition = "opacity .3s ease,transform .3s ease";
                            [
                              { num: "1", label: "Review generated ASNs" },
                              { num: "2", label: "Download shipping labels" }
                            ].forEach(function (opt) {
                              var ob = document.createElement("button");
                              ob.className = "bn-joule-option-btn";
                              ob.innerHTML =
                                '<div style="display:flex;align-items:center;gap:8px;">' +
                                  '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                  '<span>' + opt.label + '</span>' +
                                '</div>';
                              ob.addEventListener("click", function () {
                                optWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                  b.disabled = true;
                                  b.style.opacity = b === ob ? "1" : ".45";
                                });
                                ob.style.borderColor = "#5d36ff";
                                ob.style.background  = "#f0eeff";
                                appendBubble("bn-joule-user-bubble", opt.label);
                                scrollBottom();
                                if (opt.num === "1") {
                                  showThinkingDots(function () {
                                    typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                                      setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                                    });
                                  });
                                } else {
                                  showThinkingDots(function () {
                                    typeReply("Shipping labels for ASN-777 and ASN-999 have been generated.", null);
                                  });
                                }
                              });
                              optWrap.appendChild(ob);
                            });
                            requestAnimationFrame(function () {
                              optWrap.style.opacity = "1";
                              optWrap.style.transform = "translateY(0)";
                            });
                            scrollBottom();
                          }, 300);
                        });
                      }, 400);
                    }
                  );
                });
              } else {
                /* Carrier A — full flow: external system → generate notices → next actions */
                showThinkingDots(function () {
                  var statusEl = appendBubble("bn-joule-status",
                    _bnStatusHtml('Retrieving estimated arrival date from external Carrier system\u2026', 2400));
                  scrollBottom();
                  setTimeout(function () {
                    if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }
                    /* Carrier A avg 2 days: ASN-777 = +2, ASN-999 = +3 (Dallas is 1 day further) */
                    var msg =
                      "ASN-777 has been generated with estimated delivery date " + addDays(shipIso, carrier.avgDays) +
                      " and ASN-999 with estimated delivery date " + addDays(shipIso, carrier.avgDays + 1) + ".";
                    typeReply(msg, function () {
                      _bnApplyAsnToWorkbench();
                      setTimeout(function () {
                        typeBoldReply("How can I assist you next?", function () {
                      setTimeout(function () {
                        var optWrap = appendBubble("bn-joule-options", "");
                        if (!optWrap) { return; }
                        optWrap.style.opacity = "0";
                        optWrap.style.transform = "translateY(4px)";
                        optWrap.style.transition = "opacity .3s ease,transform .3s ease";
                        [
                          { num: "1", label: "Review generated ASNs" },
                          { num: "2", label: "Download shipping labels" }
                        ].forEach(function (opt) {
                          var ob = document.createElement("button");
                          ob.className = "bn-joule-option-btn";
                          ob.innerHTML =
                            '<div style="display:flex;align-items:center;gap:8px;">' +
                              '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                              '<span>' + opt.label + '</span>' +
                            '</div>';
                          ob.addEventListener("click", function () {
                            optWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                              b.disabled = true;
                              b.style.opacity = b === ob ? "1" : ".45";
                            });
                            ob.style.borderColor = "#5d36ff";
                            ob.style.background  = "#f0eeff";
                            appendBubble("bn-joule-user-bubble", opt.label);
                            scrollBottom();
                            if (opt.num === "1") {
                              showThinkingDots(function () {
                                typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                                  setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                                });
                              });
                            } else {
                              showThinkingDots(function () {
                                var statusEl = appendBubble("bn-joule-status",
                                  _bnStatusHtml('Processing PDF template assigned to supplier and generating compressed file\u2026', 2600)
                                );
                                scrollBottom();
                                setTimeout(function () {
                                  if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }
                                  typeReply("Shipping labels for ASN-777 and ASN-999 have been generated.", function () {
                                    setTimeout(function () {
                                      var LABELS = [
                                        { id: "ASN-777", file: "ShippingLabel_SN-777.pdf", pages: "3 pages" },
                                        { id: "ASN-999", file: "ShippingLabel_SN-999.pdf", pages: "2 pages" }
                                      ];


                                      var cardHtml =
                                        '<div style="display:flex;flex-direction:column;">' +
                                          /* header row */
                                          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
                                            '<span style="font-size:13px;font-weight:700;color:#1d2d3e;">Shipping Labels (2)</span>' +
                                            '<button class="bn-action-btn bn-action-default" ' +
                                              'style="font-size:12px;height:26px;padding:0 12px;" ' +
                                              'id="bn-dl-all-btn" ' +
                                              'onclick="(function(btn){' +
                                                'btn.disabled=true;btn.textContent=\'Downloading\u2026\';btn.style.opacity=\'.7\';' +
                                                'setTimeout(function(){btn.textContent=\'All Downloaded\';btn.style.opacity=\'1\';' +
                                                  'btn.style.background=\'#e8f5e9\';btn.style.borderColor=\'#6bb700\';btn.style.color=\'#256f3a\';' +
                                                '},1600);' +
                                              '})(this)">Download all</button>' +
                                          '</div>' +
                                          /* rows */
                                          LABELS.map(function (lbl) {
                                            return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #eef1f4;">' +
                                              '<div style="width:32px;height:32px;border-radius:6px;background:#fff3f0;border:1px solid #f9c0b0;' +
                                                'display:flex;align-items:center;justify-content:center;flex-shrink:0;' +
                                                'font-size:9px;font-weight:700;color:#c0392b;line-height:1;">PDF</div>' +
                                              '<div style="flex:1;min-width:0;">' +
                                                '<div style="font-size:13px;font-weight:700;color:#0064d9;">' + lbl.id + '</div>' +
                                                '<div style="font-size:11px;color:#8396a8;">' + lbl.pages + ' · ' + lbl.file + '</div>' +
                                              '</div>' +
                                            '</div>';
                                          }).join("") +
                                        '</div>';

                                      var card = appendBubble("bn-joule-bubble", cardHtml);
                                      if (card) {
                                        card.style.maxWidth = "100%";
                                        card.style.width = "100%";
                                        card.style.boxSizing = "border-box";
                                        card.style.opacity = "0";
                                        card.style.transform = "translateY(6px)";
                                        card.style.transition = "opacity .3s ease,transform .3s ease";
                                        requestAnimationFrame(function () {
                                          requestAnimationFrame(function () {
                                            card.style.opacity = "1";
                                            card.style.transform = "translateY(0)";
                                            scrollBottom();

                                            /* ── How can I assist you next? ── */
                                            setTimeout(function () {
                                              showThinkingDots(function () {
                                                typeBoldReply("How can I assist you next?", function () {
                                                  setTimeout(function () {
                                                    var nextOpts = [
                                                      { num: "1", label: "Review generated ASNs" },
                                                      { num: "2", label: "Send shipment confirmation to customer ABC" }
                                                    ];
                                                    var nextWrap = appendBubble("bn-joule-options", "");
                                                    if (!nextWrap) { return; }
                                                    nextWrap.style.opacity = "0";
                                                    nextWrap.style.transform = "translateY(4px)";
                                                    nextWrap.style.transition = "opacity .3s ease,transform .3s ease";
                                                    nextOpts.forEach(function (opt) {
                                                      var ob = document.createElement("button");
                                                      ob.className = "bn-joule-option-btn";
                                                      ob.innerHTML =
                                                        '<div style="display:flex;align-items:center;gap:8px;">' +
                                                          '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                                          '<span style="font-weight:700;">' + opt.label + '</span>' +
                                                        '</div>';
                                                      ob.addEventListener("click", function () {
                                                        nextWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                                          b.disabled = true;
                                                          b.style.opacity = b === ob ? "1" : ".45";
                                                        });
                                                        ob.style.borderColor = "#5d36ff";
                                                        ob.style.background  = "#f0eeff";
                                                        appendBubble("bn-joule-user-bubble", opt.label);
                                                        scrollBottom();
                                                        if (opt.num === "1") {
                                                          showThinkingDots(function () {
                                                            typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                                                              setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                                                            });
                                                          });
                                                        } else {
                                                          showThinkingDots(function () {
                                                            typeReply("A shipment confirmation will be sent to customer ABC for ASN-777 and ASN-999.", function () { _bnEnableInput(); });
                                                          });
                                                        }
                                                      });
                                                      nextWrap.appendChild(ob);
                                                    });
                                                    requestAnimationFrame(function () {
                                                      nextWrap.style.opacity = "1";
                                                      nextWrap.style.transform = "translateY(0)";
                                                    });
                                                    scrollBottom();
                                                  }, 400);
                                                });
                                              });
                                            }, 800);
                                          });
                                        });
                                      }
                                    }, 350);
                                  });
                                }, 2600);
                              });
                            }
                          });
                          optWrap.appendChild(ob);
                        });
                        requestAnimationFrame(function () {
                          optWrap.style.opacity = "1";
                          optWrap.style.transform = "translateY(0)";
                        });
                        scrollBottom();
                      }, 400);
                        });
                      }, 300);
                    });
                  }, 2400);
                });
              }
            });
            wrap.appendChild(btn);
          });

          /* No carrier option */
          var noBtn = document.createElement("button");
          noBtn.className = "bn-joule-option-btn";
          noBtn.style.color = "#556b82";
          noBtn.innerHTML =
            '<div style="display:flex;align-items:center;gap:8px;">' +
              '<span class="bn-joule-option-num" style="background:#8396a8;">3</span>' +
              '<span>No Carrier assignment</span>' +
            '</div>';
          noBtn.addEventListener("click", function () {
            wrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
              b.disabled = true;
              b.style.opacity = b === noBtn ? "1" : ".45";
            });
            noBtn.style.borderColor = "#8396a8";
            noBtn.style.background  = "#f7f9fb";
            appendBubble("bn-joule-user-bubble", "No Carrier assignment");
            scrollBottom();
            showThinkingDots(function () {
              typeReply(
                "ASN-777 and ASN-999 have been generated without a carrier assignment. Estimated shipping date: " + dateStr + ".",
                function () {
                  _bnApplyAsnToWorkbench();
                  _bnEnableInput();
                  var ncChips = appendBubble("bn-joule-options", "");
                  ncChips.style.opacity = "0";
                  ncChips.style.transform = "translateY(6px)";
                  ncChips.style.transition = "opacity .25s,transform .25s";
                  [
                    { num: "1", label: "Review ASNs" },
                    { num: "2", label: "Close Joule" }
                  ].forEach(function (opt) {
                    var btn = document.createElement("button");
                    btn.className = "bn-joule-option-btn";
                    btn.innerHTML =
                      '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                      '<span class="bn-joule-option-label">' + opt.label + '</span>';
                    btn.addEventListener("click", function () {
                      ncChips.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                        b.disabled = true;
                        b.style.opacity = b === btn ? "1" : ".45";
                      });
                      btn.style.borderColor = "#5d36ff";
                      btn.style.background  = "#f0eeff";
                      appendBubble("bn-joule-user-bubble", opt.label);
                      scrollBottom();
                      if (opt.num === "1") {
                        showThinkingDots(function () {
                          typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                            setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                          });
                        });
                      } else {
                        setTimeout(function () {
                          if (typeof window._bnJouleToggle === "function") { window._bnJouleToggle(); }
                        }, 400);
                      }
                    });
                    ncChips.appendChild(btn);
                  });
                  requestAnimationFrame(function () {
                    ncChips.style.opacity = "1";
                    ncChips.style.transform = "translateY(0)";
                  });
                  scrollBottom();
                }
              );
            });
          });
          wrap.appendChild(noBtn);

          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              wrap.style.opacity = "1";
              wrap.style.transform = "translateY(0)";
              scrollBottom();
            });
          });
        }, 300);
      });
    }

    function buildGuideMessage() {
      setTimeout(function () {
          /* Question line */
          var qBubble = appendBubble("bn-joule-guide",
            '<div class="bn-joule-guide-q">Do you want to start the shipment process for these order items?</div>'
          );
          if (qBubble) {
            qBubble.style.opacity = "0";
            qBubble.style.transform = "translateY(4px)";
            qBubble.style.transition = "opacity .3s ease, transform .3s ease";
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                qBubble.style.opacity = "1";
                qBubble.style.transform = "translateY(0)";
                scrollBottom();
              });
            });
          }

          /* Option buttons */
          setTimeout(function () {
            var OPTIONS = [
              "Generate one ASN per ship-to location",
              "Generate one ASN per PO"
            ];
            var wrap = appendBubble("bn-joule-options", "");
            if (!wrap) { return; }
            wrap.style.opacity = "0";
            wrap.style.transform = "translateY(4px)";
            wrap.style.transition = "opacity .3s ease, transform .3s ease";

            OPTIONS.forEach(function (label, idx) {
              var btn = document.createElement("button");
              btn.className = "bn-joule-option-btn";
              btn.innerHTML =
                '<span class="bn-joule-option-num">' + (idx + 1) + '</span>' +
                '<span>' + label + '</span>';
              btn.addEventListener("click", function () {
                /* Highlight selected, disable both */
                var allBtns = wrap.querySelectorAll(".bn-joule-option-btn");
                allBtns.forEach(function (b) {
                  b.disabled = true;
                  b.style.opacity = b === btn ? "1" : ".45";
                });
                btn.style.borderColor = "#5d36ff";
                btn.style.background  = "#f0eeff";

                /* Echo user choice */
                appendBubble("bn-joule-user-bubble", label);
                scrollBottom();

                if (idx === 0) {
                  /* ── Option 1: per ship-to location ── */
                  showThinkingDots(function () {

                    /* Step 1 — "Reading buyer rules…" status */
                    var statusEl = appendBubble("bn-joule-status",
                      _bnStatusHtml('Reading related buyer rule settings\u2026', 2000)
                    );
                    scrollBottom();

                    /* Step 2 — after 2 s, remove status, show rule badges + ship-notices message */
                    setTimeout(function () {
                      if (statusEl && statusEl.parentNode) {
                        statusEl.parentNode.removeChild(statusEl);
                      }

                      /* Rule badge bubble */
                      var ruleBubble = appendBubble("bn-joule-rule-card",
                        '<div style="display:flex;flex-direction:column;gap:8px;">' +
                          '<div style="display:flex;align-items:center;gap:6px;">' +
                            '<span style="display:inline-flex;align-items:center;gap:4px;background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:4px;padding:2px 8px;">' +
                              '<span style="font-size:13px;line-height:1;">&#10003;</span> Rule: Packing slip autogeneration is ON' +
                            '</span>' +
                          '</div>' +
                          '<div style="display:flex;align-items:center;gap:6px;">' +
                            '<span style="display:inline-flex;align-items:center;gap:4px;background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:4px;padding:2px 8px;">' +
                              '<span style="font-size:13px;line-height:1;">&#10003;</span> Rule: Mandatory delivery date is ON' +
                            '</span>' +
                          '</div>' +
                          '<div style="font-size:12px;color:#556b82;line-height:1.6;">A packing slip will be auto-generated and a delivery date is required for all ASNs.</div>' +
                        '</div>'
                      );
                      if (ruleBubble) {
                        ruleBubble.style.opacity = "0";
                        ruleBubble.style.transform = "translateY(4px)";
                        ruleBubble.style.transition = "opacity .3s ease,transform .3s ease";
                        requestAnimationFrame(function () {
                          requestAnimationFrame(function () {
                            ruleBubble.style.opacity = "1";
                            ruleBubble.style.transform = "translateY(0)";
                            scrollBottom();
                          });
                        });
                      }

                      setTimeout(function () {
                        typeReply(
                          "Preparing to generate ASN-777 (Chicago, IL) and ASN-999 (Dallas, TX).",
                          function () {
                            setTimeout(function () {
                              typeBoldReply(
                                "Would you like me to assign an estimated ship date based on the origin, destination, and required delivery date?",
                                function () {
                                  /* Step 3 — Yes/No */
                                  setTimeout(function () {
                              var ynWrap = appendBubble("bn-joule-options", "");
                                if (!ynWrap) { return; }
                                ynWrap.style.opacity = "0";
                                ynWrap.style.transform = "translateY(4px)";
                                ynWrap.style.transition = "opacity .3s ease,transform .3s ease";

                                [
                                  { num: "1", label: "Yes" },
                                  { num: "2", label: "No"  }
                                ].forEach(function (opt) {
                                  var ynBtn = document.createElement("button");
                                  ynBtn.className = "bn-joule-option-btn";
                                  ynBtn.innerHTML =
                                    '<div style="display:flex;align-items:center;gap:8px;">' +
                                      '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                      '<span style="font-weight:700;">' + opt.label + '</span>' +
                                    '</div>';
                                  ynBtn.addEventListener("click", function () {
                                    ynWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                      b.disabled = true;
                                      b.style.opacity = b === ynBtn ? "1" : ".45";
                                    });
                                    ynBtn.style.borderColor = "#5d36ff";
                                    ynBtn.style.background  = "#f0eeff";
                                    appendBubble("bn-joule-user-bubble", opt.label);
                                    scrollBottom();

                                    if (opt.label === "Yes") {
                                      /* ── Yes: ask for shipping date → text input → carrier ── */
                                      showThinkingDots(function () {
                        typeReply("Please select the estimated shipping date.", function () {
                                          setTimeout(function () { buildShippingDateInput(); }, 350);
                                        });
                                      });
                                    } else {
                                      /* ── No: generate without dates ── */
                                      showThinkingDots(function () {
                                        typeReply("ASN-777 and ASN-999 have been generated. No estimated delivery dates have been assigned.", function () {
                                          _bnApplyAsnToWorkbench();
                                          _bnEnableInput();
                                          var ndChips = appendBubble("bn-joule-options", "");
                                          ndChips.style.opacity = "0";
                                          ndChips.style.transform = "translateY(6px)";
                                          ndChips.style.transition = "opacity .25s,transform .25s";
                                          [
                                            { num: "1", label: "Review ASNs" },
                                            { num: "2", label: "Close Joule" }
                                          ].forEach(function (opt) {
                                            var btn = document.createElement("button");
                                            btn.className = "bn-joule-option-btn";
                                            btn.innerHTML =
                                              '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                              '<span class="bn-joule-option-label">' + opt.label + '</span>';
                                            btn.addEventListener("click", function () {
                                              ndChips.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                                b.disabled = true;
                                                b.style.opacity = b === btn ? "1" : ".45";
                                              });
                                              btn.style.borderColor = "#5d36ff";
                                              btn.style.background  = "#f0eeff";
                                              appendBubble("bn-joule-user-bubble", opt.label);
                                              scrollBottom();
                                              if (opt.num === "1") {
                                                showThinkingDots(function () {
                                                  typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                                                    setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                                                  });
                                                });
                                              } else {
                                                setTimeout(function () {
                                                  if (typeof window._bnJouleToggle === "function") { window._bnJouleToggle(); }
                                                }, 400);
                                              }
                                            });
                                            ndChips.appendChild(btn);
                                          });
                                          requestAnimationFrame(function () {
                                            ndChips.style.opacity = "1";
                                            ndChips.style.transform = "translateY(0)";
                                          });
                                          scrollBottom();
                                        });
                                      });
                                    }
                                  });
                                  ynWrap.appendChild(ynBtn);
                                });

                                requestAnimationFrame(function () {
                                  requestAnimationFrame(function () {
                                    ynWrap.style.opacity = "1";
                                    scrollBottom();
                                  });
                                });
                              }, 400);
                                }
                              );
                            }, 300);
                          }
                        );
                      }, 600);
                    }, 2000);
                  });

                } else {
                  /* ── Option 2: per Order ── */
                  showThinkingDots(function () {
                    typeReply("One ASN per purchase order will be generated. Processing now.", function () {
                      _bnEnableInput();
                      var po2Chips = appendBubble("bn-joule-options", "");
                      po2Chips.style.opacity = "0";
                      po2Chips.style.transform = "translateY(6px)";
                      po2Chips.style.transition = "opacity .25s,transform .25s";
                      [
                        { num: "1", label: "Review ASNs" },
                        { num: "2", label: "Close Joule" }
                      ].forEach(function (opt) {
                        var btn2 = document.createElement("button");
                        btn2.className = "bn-joule-option-btn";
                        btn2.innerHTML =
                          '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                          '<span class="bn-joule-option-label">' + opt.label + '</span>';
                        btn2.addEventListener("click", function () {
                          po2Chips.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                            b.disabled = true;
                            b.style.opacity = b === btn2 ? "1" : ".45";
                          });
                          btn2.style.borderColor = "#5d36ff";
                          btn2.style.background  = "#f0eeff";
                          appendBubble("bn-joule-user-bubble", opt.label);
                          scrollBottom();
                          if (opt.num === "1") {
                            showThinkingDots(function () {
                              typeReply("Opening ASN-777 and ASN-999 for review.", function () {
                                setTimeout(function () { window._bnOpenShipNotices && window._bnOpenShipNotices(); }, 600);
                              });
                            });
                          } else {
                            setTimeout(function () {
                              if (typeof window._bnJouleToggle === "function") { window._bnJouleToggle(); }
                            }, 400);
                          }
                        });
                        po2Chips.appendChild(btn2);
                      });
                      requestAnimationFrame(function () {
                        po2Chips.style.opacity = "1";
                        po2Chips.style.transform = "translateY(0)";
                      });
                      scrollBottom();
                    });
                  });
                }
              });
              wrap.appendChild(btn);
            });

            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                wrap.style.opacity = "1";
                wrap.style.transform = "translateY(0)";
                scrollBottom();
              });
            });
          }, 400);
      }, 300);
    }

    /* ── Cancel ASN-777 flow ── */
    function _bnCancelShipNoticeFlow() {
      showThinkingDots(function () {
        /* Status: checking rule */
        var statusEl = appendBubble("bn-joule-status",
          _bnStatusHtml('Checking cancellation policy for ASN-777\u2026', 2200)
        );
        scrollBottom();
        setTimeout(function () {
          if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }

          /* Rule info card */
          var ruleHtml =
            '<div style="display:flex;flex-direction:column;gap:8px;">' +
              '<div style="display:flex;align-items:center;gap:6px;">' +
                '<span style="display:inline-flex;align-items:center;gap:4px;background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:4px;padding:2px 8px;">' +
                  '<span style="font-size:13px;line-height:1;">&#10003;</span> Rule: Cancel Ship Notice is ON' +
                '</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#556b82;line-height:1.6;">' +
                'Cancellation is permitted before carrier pickup. ASN-777 has not been picked up yet.' +
              '</div>' +
            '</div>';

          var ruleCard = appendBubble("bn-joule-rule-card", ruleHtml);
          if (ruleCard) {
            ruleCard.style.maxWidth = "100%";
            ruleCard.style.width = "100%";
            ruleCard.style.boxSizing = "border-box";
            ruleCard.style.opacity = "0";
            ruleCard.style.transform = "translateY(6px)";
            ruleCard.style.transition = "opacity .3s ease,transform .3s ease";
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                ruleCard.style.opacity = "1";
                ruleCard.style.transform = "translateY(0)";
                scrollBottom();

                setTimeout(function () {
                  typeReply("The cancellation policy for ASN-777 has been reviewed. Cancellation is permitted at this stage.", function () {
                    setTimeout(function () {
                      typeBoldReply("Do you want to proceed?", function () {
                        setTimeout(function () {
                          /* Yes / No buttons */
                          var yesnoWrap = appendBubble("bn-joule-options", "");
                          if (!yesnoWrap) { return; }
                          yesnoWrap.style.opacity = "0";
                          yesnoWrap.style.transform = "translateY(4px)";
                          yesnoWrap.style.transition = "opacity .3s ease,transform .3s ease";
                          [
                            { num: "1", label: "Yes" },
                            { num: "2", label: "No"  }
                          ].forEach(function (opt) {
                            var ob = document.createElement("button");
                            ob.className = "bn-joule-option-btn";
                            ob.innerHTML =
                              '<div style="display:flex;align-items:center;gap:8px;">' +
                                '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                '<span style="font-weight:700;">' + opt.label + '</span>' +
                              '</div>';
                            ob.addEventListener("click", function () {
                              yesnoWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                b.disabled = true;
                                b.style.opacity = b === ob ? "1" : ".45";
                              });
                              ob.style.borderColor = "#5d36ff";
                              ob.style.background  = "#f0eeff";
                              appendBubble("bn-joule-user-bubble", opt.label);
                              scrollBottom();

                              if (opt.num === "1") {
                                /* Yes — cancel it */
                                typeReply("Got it, I\u2019ll proceed with the cancellation right away.", function () {
                                showThinkingDots(function () {
                                  var cancelStatusEl = appendBubble("bn-joule-status",
                                    _bnStatusHtml('Sending cancellation request to carrier system\u2026', 2000)
                                  );
                                  scrollBottom();
                                  setTimeout(function () {
                                    if (cancelStatusEl && cancelStatusEl.parentNode) { cancelStatusEl.parentNode.removeChild(cancelStatusEl); }

                                    /* Confirm bubble */
                                    typeReply("ASN-777 has been successfully cancelled.", function () {

                                      /* Update table: ASN-777 status → Cancelled */
                                      var snData = oModel.getProperty("/orders");
                                      if (snData) {
                                        snData.forEach(function (row) {
                                          if (row.shipNoticeNumber === "ASN-777") {
                                            row.status = "Cancelled";
                                          }
                                        });
                                        oModel.setProperty("/orders", snData.slice());
                                      }

                                      /* How can I assist you next? */
                                      setTimeout(function () {
                                        typeBoldReply("How can I assist you next?", function () {
                                            setTimeout(function () {
                                              var nextOpts = [
                                                { num: "1", label: "Reinstate ASN-777" },
                                                { num: "2", label: "Create a replacement ASN for ASN-777" },
                                                { num: "3", label: "Send cancellation notice to customer ABC" }
                                              ];
                                              var nextWrap = appendBubble("bn-joule-options", "");
                                              if (!nextWrap) { return; }
                                              nextWrap.style.opacity = "0";
                                              nextWrap.style.transform = "translateY(4px)";
                                              nextWrap.style.transition = "opacity .3s ease,transform .3s ease";
                                              nextOpts.forEach(function (nopt) {
                                                var nb = document.createElement("button");
                                                nb.className = "bn-joule-option-btn";
                                                nb.innerHTML =
                                                  '<div style="display:flex;align-items:center;gap:8px;">' +
                                                    '<span class="bn-joule-option-num">' + nopt.num + '</span>' +
                                                    '<span style="font-weight:700;">' + nopt.label + '</span>' +
                                                  '</div>';
                                                nb.addEventListener("click", function () {
                                                  nextWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                                    b.disabled = true;
                                                    b.style.opacity = b === nb ? "1" : ".45";
                                                  });
                                                  nb.style.borderColor = "#5d36ff";
                                                  nb.style.background  = "#f0eeff";
                                                  appendBubble("bn-joule-user-bubble", nopt.label);
                                                  scrollBottom();
                                                  typeReply("Sure, I\u2019ll take care of that right away!", function () {
                                                  showThinkingDots(function () {
                                                    if (nopt.num === "1") {
                                                      /* Reinstate — flip ASN-777 status back to Active */
                                                      var snRows = oModel.getProperty("/orders");
                                                      if (snRows) {
                                                        snRows.forEach(function (row) {
                                                          if (row.snNumber === "777") { row.status = "Active"; row.statusState = "Success"; }
                                                        });
                                                        oModel.setProperty("/orders", snRows.slice());
                                                      }
                                                      typeReply("ASN-777 has been reinstated. Status is now Active.", function () {
                                                        _bnEnableInput();
                                                      });
                                                    } else if (nopt.num === "2") {
                                                      typeReply("A replacement ASN for ASN-777 will be created. Please provide the required details to proceed.", function () {
                                                        _bnEnableInput();
                                                      });
                                                    } else {
                                                      typeReply("A cancellation notice will be prepared and sent to customer ABC for ASN-777.", function () {
                                                        _bnEnableInput();
                                                      });
                                                    }
                                                  });
                                                  }); /* end typeReply ack */
                                                });
                                                nextWrap.appendChild(nb);
                                              });
                                              requestAnimationFrame(function () {
                                                nextWrap.style.opacity = "1";
                                                nextWrap.style.transform = "translateY(0)";
                                              });
                                              scrollBottom();
                                              /* Wire input: clicking auto-types the edit message */
                                              _bnEnableInput();
                                              _bnWireEditInput();
                                            }, 400);
                                          });
                                      }, 800);
                                    });
                                  }, 2000);
                                });
                                }); /* end typeReply ack */
                              } else {
                                /* No — acknowledge */
                                typeReply("Understood, no problem at all!", function () {
                                  showThinkingDots(function () {
                                    typeReply("ASN-777 will remain active. No cancellation has been processed.", function () { _bnEnableInput(); });
                                  });
                                });
                              }
                            });
                            yesnoWrap.appendChild(ob);
                          });
                          requestAnimationFrame(function () {
                            yesnoWrap.style.opacity = "1";
                            yesnoWrap.style.transform = "translateY(0)";
                          });
                          scrollBottom();
                        }, 400);
                      });
                    }, 300);
                  });
                }, 600);
              });
            });
          }
        }, 2200);
      });
    }

    function _bnEditShipNoticeFlow() {
      showThinkingDots(function () {
        var statusEl = appendBubble("bn-joule-status",
          _bnStatusHtml('Checking edit policy for ASN-999\u2026', 2000)
        );
        scrollBottom();
        setTimeout(function () {
          if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }

          /* Rule card */
          var ruleHtml =
            '<div style="display:flex;flex-direction:column;gap:8px;">' +
              '<div style="display:flex;align-items:center;gap:6px;">' +
                '<span style="display:inline-flex;align-items:center;gap:4px;background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:4px;padding:2px 8px;">' +
                  '<span style="font-size:13px;line-height:1;">&#10003;</span> Rule: Edit Ship Notice is ON' +
                '</span>' +
              '</div>' +
              '<div style="font-size:12px;color:#556b82;line-height:1.6;">' +
                'Editing is permitted before carrier pickup. ASN-999 has not been picked up yet.' +
              '</div>' +
            '</div>';
          appendBubble("bn-joule-rule-card", ruleHtml);
          scrollBottom();

          setTimeout(function () {
            typeReply("The edit policy for ASN-999 has been verified. Opening ASN-999 for modification.", function () {
              typeBoldReply("What would you like to modify?", function () {
                setTimeout(function () {
                  _bnOpenShipNotice999();
                  /* Wire input: click auto-types the modify message */
                  _bnEnableInput();
                  var modInput = document.getElementById("bn-joule-input");
                  if (modInput) {
                    function onModifyInputClick() {
                      modInput.removeEventListener("click", onModifyInputClick);
                      modInput.removeEventListener("focus", onModifyInputClick);
                      _bnAutoTypeInput("Modify the line item quantity");
                    }
                    modInput.addEventListener("click", onModifyInputClick);
                    modInput.addEventListener("focus", onModifyInputClick);
                  }
                }, 600);
              });
            });
          }, 600);
        }, 2000);
      });
    }

    /* ── Modify Line Item Quantity flow ── */
    var _bnLineItems = [
      { line: 1, item: 10, po: "PO 789", desc: "Steel Frame Assembly",    qty: 33 },
      { line: 2, item: 20, po: "PO 789", desc: "Gear Unit Module",         qty: 23 },
      { line: 3, item: 10, po: "PO 304", desc: "Motor Drive Controller",   qty: 18 }
    ];

    function _bnModifyLineItemFlow() {
      showThinkingDots(function () {
        /* Status */
        var statusEl = appendBubble("bn-joule-status",
          _bnStatusHtml('Reading line items for ASN-999\u2026', 1800)
        );
        scrollBottom();

        setTimeout(function () {
          if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }

          typeReply("Select the line items you wish to update and enter the new quantities.", function () {

            /* ── Multi-line item picker card ── */
            var cardEl = appendBubble("bn-joule-card", "");
            /* pendingChanges: { line -> newQty } — only lines the user has toggled on */
            var pendingChanges = {};

            var searchQuery = "";

            function renderPicker() {
              var query    = searchQuery.toLowerCase();
              var filtered = _bnLineItems.filter(function (li) {
                return !query ||
                  li.desc.toLowerCase().includes(query) ||
                  String(li.line).includes(query) ||
                  li.po.toLowerCase().includes(query);
              });

              /* Build rows — each row has an inline qty input */
              var rowsHtml = filtered.length ? filtered.map(function (li) {
                var isOn      = pendingChanges.hasOwnProperty(li.line);
                var rowBg     = isOn ? "#f0eeff" : "#fff";
                var rowBorder = isOn ? "1.5px solid #5d36ff" : "1.5px solid #d1e0ed";
                var numBg     = isOn ? "#5d36ff" : "#eff1f2";
                var numColor  = isOn ? "#fff"    : "#556b82";
                var inputVal  = isOn ? pendingChanges[li.line] : li.qty;

                return (
                  '<div data-line="' + li.line + '" ' +
                    'style="display:flex;align-items:center;gap:10px;padding:8px 10px;' +
                    'background:' + rowBg + ';border:' + rowBorder + ';border-radius:8px;' +
                    'cursor:pointer;flex-shrink:0;transition:background .15s,border-color .15s;">' +

                    /* Line number badge */
                    '<span style="display:inline-flex;align-items:center;justify-content:center;' +
                      'width:22px;height:22px;border-radius:50%;flex-shrink:0;' +
                      'background:' + numBg + ';color:' + numColor + ';font-size:11px;font-weight:700;">' +
                      li.line +
                    '</span>' +

                    /* Description + original qty */
                    '<div style="flex:1;display:flex;flex-direction:column;gap:1px;min-width:0;">' +
                      '<span style="font-size:13px;font-weight:600;color:#1d2d3e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + li.desc + '</span>' +
                      '<span style="font-size:11px;color:#8396a8;">Current: ' + li.qty + ' EA</span>' +
                    '</div>' +

                    /* Inline qty input — enabled only when row is toggled on */
                    '<div style="display:flex;align-items:center;gap:4px;flex-shrink:0;" onclick="event.stopPropagation();">' +
                      '<input data-qty-line="' + li.line + '" type="number" min="1" value="' + inputVal + '" ' +
                        (isOn ? '' : 'disabled ') +
                        'style="width:56px;height:28px;padding:0 6px;text-align:center;' +
                        'border:1.5px solid ' + (isOn ? '#5d36ff' : '#d1e0ed') + ';border-radius:6px;' +
                        'font-family:\'72\',Arial,sans-serif;font-size:13px;color:#1d2d3e;' +
                        'background:' + (isOn ? '#fff' : '#f0f2f4') + ';outline:none;" />' +
                      '<span style="font-size:11px;color:#8396a8;flex-shrink:0;">EA</span>' +
                    '</div>' +
                  '</div>'
                );
              }).join("") :
                '<div style="padding:10px;text-align:center;font-size:13px;color:#8396a8;">No lines match</div>';

              /* Count changed lines to label the Apply button */
              var nChanged = Object.keys(pendingChanges).length;

              cardEl.innerHTML =
                '<div style="display:flex;flex-direction:column;gap:0;font-family:\'72\',Arial,sans-serif;width:300px;">' +

                  /* Search bar */
                  '<div style="padding:8px 10px 6px;">' +
                    '<div style="display:flex;align-items:center;gap:6px;height:30px;' +
                      'border:1.5px solid #d1e0ed;border-radius:6px;background:#f7f9fb;padding:0 8px;">' +
                      '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;opacity:.5;">' +
                        '<circle cx="6.5" cy="6.5" r="5" stroke="#556b82" stroke-width="1.5"/>' +
                        '<path d="M10.5 10.5L14 14" stroke="#556b82" stroke-width="1.5" stroke-linecap="round"/>' +
                      '</svg>' +
                      '<input id="bn-line-search" type="text" placeholder="Search lines\u2026" value="' + searchQuery + '" ' +
                        'style="flex:1;border:none;background:transparent;outline:none;' +
                        'font-family:\'72\',Arial,sans-serif;font-size:13px;color:#1d2d3e;" />' +
                    '</div>' +
                  '</div>' +

                  /* Scrollable row list */
                  '<div style="max-height:200px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding:0 10px 6px;">' +
                    rowsHtml +
                  '</div>' +

                  /* Divider */
                  '<div style="height:1px;background:#e8edf1;margin:0 10px;"></div>' +

                  /* Footer: hint + Apply button */
                  '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;gap:8px;">' +
                    '<span style="font-size:12px;color:#8396a8;">' +
                      (nChanged === 0 ? 'Tap a row to edit its quantity' :
                       nChanged === 1 ? '1 line selected' :
                       nChanged + ' lines selected') +
                    '</span>' +
                    '<button id="bn-modify-confirm-btn" ' +
                      (nChanged > 0 ? '' : 'disabled ') +
                      'style="height:30px;padding:0 16px;background:' + (nChanged > 0 ? '#5d36ff' : '#bcc3ca') + ';color:#fff;border:none;' +
                      'border-radius:6px;font-family:\'72\',Arial,sans-serif;font-size:13px;font-weight:700;' +
                      'cursor:' + (nChanged > 0 ? 'pointer' : 'default') + ';white-space:nowrap;flex-shrink:0;" ' +
                      'onclick="window._bnConfirmModify&&window._bnConfirmModify();">Apply changes</button>' +
                  '</div>' +

                '</div>';

              /* Wire search — update query and re-render, restore focus */
              var searchEl = document.getElementById("bn-line-search");
              if (searchEl) {
                searchEl.addEventListener("input", function () {
                  searchQuery = searchEl.value;
                  renderPicker();
                  var s = document.getElementById("bn-line-search");
                  if (s) { s.focus(); s.setSelectionRange(searchQuery.length, searchQuery.length); }
                });
                searchEl.addEventListener("click", function (e) { e.stopPropagation(); });
              }

              /* Wire row clicks — toggle line on/off */
              cardEl.querySelectorAll("[data-line]").forEach(function (row) {
                row.addEventListener("click", function () {
                  var ln = parseInt(row.getAttribute("data-line"));
                  if (pendingChanges.hasOwnProperty(ln)) {
                    delete pendingChanges[ln];
                  } else {
                    var li = _bnLineItems.filter(function (l) { return l.line === ln; })[0];
                    pendingChanges[ln] = li ? li.qty : 1;
                  }
                  renderPicker();
                  scrollBottom();
                  /* Restore search focus or focus the qty input for newly toggled row */
                  if (pendingChanges.hasOwnProperty(ln)) {
                    var qInput = cardEl.querySelector('[data-qty-line="' + ln + '"]');
                    if (qInput) { setTimeout(function () { qInput.focus(); qInput.select(); }, 40); }
                  } else {
                    var s = document.getElementById("bn-line-search");
                    if (s) { setTimeout(function () { s.focus(); }, 40); }
                  }
                });
              });

              /* Wire qty input changes — update pendingChanges live */
              cardEl.querySelectorAll("[data-qty-line]").forEach(function (inp) {
                inp.addEventListener("input", function () {
                  var ln  = parseInt(inp.getAttribute("data-qty-line"));
                  var val = parseInt(inp.value);
                  if (val > 0) {
                    pendingChanges[ln] = val;
                    /* Refresh footer state without full re-render */
                    var applyBtn = document.getElementById("bn-modify-confirm-btn");
                    var hint     = applyBtn && applyBtn.previousElementSibling;
                    var n        = Object.keys(pendingChanges).length;
                    if (applyBtn) {
                      applyBtn.disabled = n === 0;
                      applyBtn.style.background = n > 0 ? "#5d36ff" : "#bcc3ca";
                      applyBtn.style.cursor = n > 0 ? "pointer" : "default";
                    }
                    if (hint) {
                      hint.textContent = n === 0 ? "Tap a row to edit its quantity" :
                                         n === 1 ? "1 line selected" : n + " lines selected";
                    }
                  }
                });
                inp.addEventListener("click", function (e) { e.stopPropagation(); });
              });
            }

            renderPicker();
            scrollBottom();

            /* ── Confirm handler ── */
            window._bnConfirmModify = function () {
              var changes = [];
              Object.keys(pendingChanges).forEach(function (ln) {
                ln = parseInt(ln);
                var li     = _bnLineItems.filter(function (l) { return l.line === ln; })[0];
                /* Read the live qty input value (user may have typed after toggle) */
                var qInput = cardEl.querySelector('[data-qty-line="' + ln + '"]');
                var newQty = qInput ? parseInt(qInput.value) : pendingChanges[ln];
                if (!li || !newQty || newQty < 1) { return; }
                /* Skip lines where qty hasn't actually changed */
                if (newQty === li.qty) { return; }
                changes.push({ li: li, oldQty: li.qty, newQty: newQty });
              });

              if (changes.length === 0) { return; }

              /* Freeze card */
              cardEl.querySelectorAll("[data-line],[data-qty-line]").forEach(function (el) {
                el.disabled = true;
                el.style.pointerEvents = "none";
              });
              var applyBtn = document.getElementById("bn-modify-confirm-btn");
              if (applyBtn) { applyBtn.disabled = true; applyBtn.style.opacity = ".5"; }

              /* User bubble — summarise all changes */
              var summary = changes.map(function (c) {
                return "Line " + c.li.line + " \u2013 " + c.li.desc + ": " + c.oldQty + " \u2192 " + c.newQty + " EA";
              }).join("; ");
              appendBubble("bn-joule-user-bubble", summary);
              scrollBottom();

              typeReply("Got it! Let me review and validate your changes.", function () {
              showThinkingDots(function () {
                /* Status */
                var s2 = appendBubble("bn-joule-status",
                  _bnStatusHtml('Validating ' + (changes.length === 1 ? 'quantity change' : changes.length + ' quantity changes') + '\u2026', 1600)
                );
                scrollBottom();

                setTimeout(function () {
                  if (s2 && s2.parentNode) { s2.parentNode.removeChild(s2); }

                  /* ── Diff card — one row per changed line ── */
                  var diffEl = appendBubble("bn-joule-card", "");
                  var dataRows = changes.map(function (c, idx) {
                    var isLast = idx === changes.length - 1;
                    var border = isLast ? "" : "border-bottom:1px solid #d9d9d9;";
                    return (
                      '<div style="padding:8px 10px;font-size:14px;color:#1d2d3e;' + border + '">' + c.li.line + '</div>' +
                      '<div style="padding:8px 10px;font-size:14px;color:#1d2d3e;border-left:1px solid #d9d9d9;' + border + '">' + c.li.desc + '</div>' +
                      '<div style="padding:8px 10px;font-size:14px;font-weight:700;color:#aa0000;background:#fff5f5;border-left:1px solid #d9d9d9;' + border + '">' + c.oldQty + ' EA</div>' +
                      '<div style="padding:8px 10px;font-size:14px;font-weight:700;color:#1a6e34;background:#f0faf3;border-left:1px solid #d9d9d9;' + border + '">' + c.newQty + ' EA</div>'
                    );
                  }).join("");

                  diffEl.innerHTML =
                    '<div style="font-family:\'72\',Arial,sans-serif;display:flex;flex-direction:column;gap:10px;padding:12px 14px;">' +
                      '<div style="font-size:13px;font-weight:700;color:#1d2d3e;">Proposed changes \u2014 ASN-999</div>' +
                      '<div style="display:grid;grid-template-columns:50px 1fr 80px 80px;gap:0;border:1px solid #d9d9d9;border-radius:8px;overflow:hidden;">' +
                        '<div style="background:#eff1f2;padding:6px 10px;font-size:12px;font-weight:600;color:#556b82;border-bottom:1px solid #d9d9d9;">Line</div>' +
                        '<div style="background:#eff1f2;padding:6px 10px;font-size:12px;font-weight:600;color:#556b82;border-bottom:1px solid #d9d9d9;border-left:1px solid #d9d9d9;">Description</div>' +
                        '<div style="background:#ffe5e5;padding:6px 10px;font-size:12px;font-weight:600;color:#aa0000;border-bottom:1px solid #d9d9d9;border-left:1px solid #d9d9d9;">Before</div>' +
                        '<div style="background:#e5f5e9;padding:6px 10px;font-size:12px;font-weight:600;color:#1a6e34;border-bottom:1px solid #d9d9d9;border-left:1px solid #d9d9d9;">After</div>' +
                        dataRows +
                      '</div>' +
                    '</div>';
                  scrollBottom();

                  setTimeout(function () {
                    typeBoldReply("How would you like to proceed?", function () {

                      var ynWrap = appendBubble("bn-joule-options", "");
                      if (!ynWrap) { return; }
                      ynWrap.style.opacity = "0";
                      ynWrap.style.transform = "translateY(4px)";
                      ynWrap.style.transition = "opacity .3s ease,transform .3s ease";

                      [{ num: "1", label: "Yes" }, { num: "2", label: "No" }].forEach(function (opt) {
                        var btn = document.createElement("button");
                        btn.className = "bn-joule-option-btn";
                        btn.innerHTML =
                          '<div style="display:flex;align-items:center;gap:8px;">' +
                            '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                            '<span style="font-weight:700;">' + opt.label + '</span>' +
                          '</div>';
                        btn.addEventListener("click", function () {
                          ynWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                            b.disabled = true;
                            b.style.opacity = b === btn ? "1" : ".45";
                          });
                          btn.style.borderColor = "#5d36ff";
                          btn.style.background  = "#f0eeff";
                          appendBubble("bn-joule-user-bubble", opt.label);
                          scrollBottom();

                          if (opt.num === "1") {
                            /* Yes — apply all changes */
                            changes.forEach(function (c) { c.li.qty = c.newQty; });
                            typeReply("Perfect! Applying your updates now.", function () {
                            showThinkingDots(function () {
                              var s3 = appendBubble("bn-joule-status",
                                _bnStatusHtml('Updating ASN-999\u2026', 1800)
                              );
                              scrollBottom();

                              setTimeout(function () {
                                if (s3 && s3.parentNode) { s3.parentNode.removeChild(s3); }

                                typeReply("ASN-999 has been successfully updated.", function () {
                                  typeBoldReply("How can I assist you next?", function () {
                                    /* Apply overlay highlights for every changed line */
                                    changes.forEach(function (c) {
                                      _bnUpdateSn999LineQty(c.li.line, c.oldQty, c.newQty);
                                    });
                                    _bnEnableInput();

                                    var modNextWrap = appendBubble("bn-joule-options", "");
                                    modNextWrap.style.opacity = "0";
                                    modNextWrap.style.transform = "translateY(6px)";
                                    modNextWrap.style.transition = "opacity .25s, transform .25s";

                                    [
                                      { num: "1", label: "Undo Changes" },
                                      { num: "2", label: "Back to Items to Ship" }
                                    ].forEach(function (opt) {
                                      var btn = document.createElement("button");
                                      btn.className = "bn-joule-option-btn";
                                      btn.innerHTML =
                                        '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                        '<span class="bn-joule-option-label">' + opt.label + '</span>';
                                      btn.addEventListener("click", function () {
                                        modNextWrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                          b.disabled = true;
                                          b.style.opacity = b === btn ? "1" : ".45";
                                        });
                                        btn.style.borderColor = "#5d36ff";
                                        btn.style.background  = "#f0eeff";
                                        appendBubble("bn-joule-user-bubble", opt.label);
                                        scrollBottom();

                                        if (opt.num === "1") {
                                          typeReply("Of course, I\u2019ll undo those changes for you.", function () {
                                          showThinkingDots(function () {
                                            /* Revert all changes */
                                            changes.forEach(function (c) {
                                              c.li.qty = c.oldQty;
                                              _bnUpdateSn999LineQty(c.li.line, c.newQty, c.oldQty);
                                            });
                                            var revertMsg = changes.length === 1
                                              ? "The change has been reverted. Line " + changes[0].li.line + " quantity has been restored to " + changes[0].oldQty + " EA."
                                              : "All changes have been reverted. " + changes.map(function (c) { return "Line " + c.li.line + " restored to " + c.oldQty + " EA"; }).join(", ") + ".";
                                            typeReply(revertMsg, function () { _bnEnableInput(); });
                                          });
                                          }); /* end typeReply ack */
                                        } else {
                                          typeReply("Sure, taking you back now!", function () {
                                          showThinkingDots(function () {
                                            setTimeout(function () {
                                              if (typeof window._bnBackToWorkbench === "function") {
                                                window._bnBackToWorkbench();
                                              }
                                            }, 600);
                                          });
                                          }); /* end typeReply ack */
                                        }
                                      });
                                      modNextWrap.appendChild(btn);
                                    });

                                    requestAnimationFrame(function () {
                                      modNextWrap.style.opacity = "1";
                                      modNextWrap.style.transform = "translateY(0)";
                                    });
                                    scrollBottom();
                                  });
                                });

                              }, 1800);
                            });
                            }); /* end typeReply ack */

                          } else {
                            typeReply("No problem, I won\u2019t apply those changes.", function () {
                            typeReply("No changes have been applied to ASN-999.", function () {
                              _bnEnableInput();
                              /* Offer next steps */
                              var noChips = appendBubble("bn-joule-options", "");
                              noChips.style.opacity = "0";
                              noChips.style.transform = "translateY(6px)";
                              noChips.style.transition = "opacity .25s,transform .25s";
                              [
                                { num: "1", label: "Back to Items to Ship" },
                                { num: "2", label: "Close Joule" }
                              ].forEach(function (opt) {
                                var btn = document.createElement("button");
                                btn.className = "bn-joule-option-btn";
                                btn.innerHTML =
                                  '<span class="bn-joule-option-num">' + opt.num + '</span>' +
                                  '<span class="bn-joule-option-label">' + opt.label + '</span>';
                                btn.addEventListener("click", function () {
                                  noChips.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
                                    b.disabled = true;
                                    b.style.opacity = b === btn ? "1" : ".45";
                                  });
                                  btn.style.borderColor = "#5d36ff";
                                  btn.style.background  = "#f0eeff";
                                  appendBubble("bn-joule-user-bubble", opt.label);
                                  scrollBottom();
                                  if (opt.num === "1") {
                                    typeReply("Sure, taking you back!", function () {
                                    showThinkingDots(function () {
                                      setTimeout(function () {
                                        if (typeof window._bnBackToWorkbench === "function") {
                                          window._bnBackToWorkbench();
                                        }
                                      }, 600);
                                    });
                                    }); /* end typeReply ack */
                                  } else {
                                    typeReply("Sure, closing Joule now. Have a great day!", function () {
                                    setTimeout(function () {
                                      if (typeof window._bnJouleToggle === "function") { window._bnJouleToggle(); }
                                    }, 400);
                                    }); /* end typeReply ack */
                                  }
                                });
                                noChips.appendChild(btn);
                              });
                              requestAnimationFrame(function () {
                                noChips.style.opacity = "1";
                                noChips.style.transform = "translateY(0)";
                              });
                              scrollBottom();
                            });
                            }); /* end typeReply ack */
                          }
                        });
                        ynWrap.appendChild(btn);
                      });

                      requestAnimationFrame(function () {
                        ynWrap.style.opacity = "1";
                        ynWrap.style.transform = "translateY(0)";
                      });
                      scrollBottom();
                    });
                  }, 400);

                }, 1600);
              });
              }); /* end typeReply ack */
            };
          });
        }, 1800);
      });
    }

    /* ── Apply qty update to the live ASN-999 overlay ── */
    function _bnUpdateSn999LineQty(lineNum, oldQty, newQty) {
      /* Update progress bars + qty text in the line items table */
      var overlay = document.getElementById("bn-sn999-overlay");
      if (!overlay) { return; }

      /* Find all qty cells — they are plain <td> cells containing the qty number.
         We locate them by scanning all td text nodes for the old qty pattern.
         More robustly: use data attributes we'll inject below via innerHTML rebuild. */

      /* Rebuild the line items table body rows to reflect new qty */
      var rows = overlay.querySelectorAll("tr[data-sn-line]");
      rows.forEach(function (row) {
        if (parseInt(row.getAttribute("data-sn-line")) === lineNum) {
          /* Highlight the row — persists until overlay is removed */
          row.style.background = "#f0faf3";
          row.style.outline = "2px solid #52b76b";
          row.style.outlineOffset = "-2px";

          /* Update the Shipped Qty total — colour it green to stand out */
          var maxLabel = row.querySelector("[data-sn-max]");
          if (maxLabel) {
            maxLabel.textContent = newQty + " EA";
            maxLabel.style.color = "#1a6e34";
            maxLabel.style.background = "#e5f5e9";
            maxLabel.style.borderRadius = "4px";
            maxLabel.style.padding = "1px 5px";
          }
        }
      });

      /* Also update group header totals */
      var liData = _bnLineItems;
      /* PO 789 group: lines 1+2 */
      var po789Total = liData.filter(function (l) { return l.po === "PO 789"; })
                             .reduce(function (s, l) { return s + l.qty; }, 0);
      var po304Total = liData.filter(function (l) { return l.po === "PO 304"; })
                             .reduce(function (s, l) { return s + l.qty; }, 0);

      var grpHeaders = overlay.querySelectorAll("[data-sn-group-total]");
      grpHeaders.forEach(function (el) {
        var po = el.getAttribute("data-sn-group-total");
        if (po === "PO 789") { el.textContent = po789Total + " EA"; }
        if (po === "PO 304") { el.textContent = po304Total + " EA"; }
      });
    }

    /* ── ASN-999 Object Page ── */
    function _bnOpenShipNotice999() {
      var mainArea = document.getElementById("bn-main-content") ||
                     document.getElementById("content");
      if (!mainArea) { return; }

      /* Update page title */
      var pageTitleEl = document.querySelector(".bn-page-title");
      if (pageTitleEl) { pageTitleEl.textContent = "Ship Notice"; }
      document.title = "Ship Notice";

      var snShipDate   = window._bnSelectedShipDate ? fmtDate(window._bnSelectedShipDate) : fmtDate(new Date().toISOString().slice(0, 10));
      var snCreateDate = fmtDate(new Date().toISOString().slice(0, 10));

      /* Reset line item quantities to originals on fresh open */
      _bnLineItems[0].qty = 33;
      _bnLineItems[1].qty = 23;
      _bnLineItems[2].qty = 18;

      var pageHtml =

        /* ══ Object Page Header ══ */
        '<div style="background:#fff;box-shadow:0 2px 2px rgba(34,53,72,.05);flex-shrink:0;padding:0 16px;position:relative;">' +

          /* Back */
          '<div style="padding-top:8px;">' +
            '<button onclick="window._bnBackToSnList()" style="display:inline-flex;align-items:center;gap:4px;background:transparent;border:none;padding:4px 0;cursor:pointer;font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;">' +
              '<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="#0064d9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              ' Back' +
            '</button>' +
          '</div>' +

          /* Title row + action buttons */
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0 0 0;gap:16px;">' +
            '<span style="font-family:\'72\',Arial,sans-serif;font-size:24px;font-weight:900;color:#1d2d3e;line-height:1.2;white-space:nowrap;">ASN-999</span>' +

            /* Action buttons — Edit | Export ▾ | Cancel */
            '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">' +

              /* Edit — Emphasized/Primary */
              '<button onclick="window._bnSn999Edit&&window._bnSn999Edit()" ' +
                'style="display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 16px;' +
                'background:#0070f2;color:#fff;border:1px solid #0070f2;border-radius:8px;' +
                'font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;"' +
                'onmouseover="this.style.background=\'#0064d9\';this.style.borderColor=\'#0064d9\';"' +
                'onmouseout="this.style.background=\'#0070f2\';this.style.borderColor=\'#0070f2\';">' +
                'Edit' +
              '</button>' +

              /* Export — Standard with dropdown arrow */
              '<div style="position:relative;display:inline-flex;">' +
                '<button id="bn-sn999-export-btn" onclick="window._bnSn999ToggleExportMenu&&window._bnSn999ToggleExportMenu()" ' +
                  'style="display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 12px;' +
                  'background:#fff;color:#0064d9;border:1px solid #0064d9;border-radius:8px;' +
                  'font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;"' +
                  'onmouseover="this.style.background=\'#f5f6f7\';"' +
                  'onmouseout="this.style.background=\'#fff\';">' +
                  'Export' +
                  '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;">' +
                    '<path d="M3 5.5L8 10.5L13 5.5" stroke="#0064d9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                  '</svg>' +
                '</button>' +
                /* Dropdown menu */
                '<div id="bn-sn999-export-menu" style="display:none;position:absolute;top:36px;right:0;min-width:160px;' +
                  'background:#fff;border:1px solid #d9d9d9;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:9000;overflow:hidden;">' +
                  '<div onclick="window._bnSn999ExportPDF&&window._bnSn999ExportPDF();document.getElementById(\'bn-sn999-export-menu\').style.display=\'none\';" ' +
                    'style="padding:10px 16px;font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;cursor:pointer;"' +
                    'onmouseover="this.style.background=\'#f5f6f7\';" onmouseout="this.style.background=\'\';">Export as PDF</div>' +
                  '<div onclick="window._bnSn999ExportCSV&&window._bnSn999ExportCSV();document.getElementById(\'bn-sn999-export-menu\').style.display=\'none\';" ' +
                    'style="padding:10px 16px;font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;cursor:pointer;"' +
                    'onmouseover="this.style.background=\'#f5f6f7\';" onmouseout="this.style.background=\'\';">Export as Spreadsheet</div>' +
                '</div>' +
              '</div>' +

              /* Cancel — Tertiary/Ghost */
              '<button onclick="window._bnSn999Cancel&&window._bnSn999Cancel()" ' +
                'style="display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 16px;' +
                'background:transparent;color:rgb(0,112,242);border:1px solid transparent;border-radius:8px;' +
                'font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;"' +
                'onmouseover="this.style.background=\'#f5f6f7\';this.style.borderColor=\'#c2cdd6\';"' +
                'onmouseout="this.style.background=\'transparent\';this.style.borderColor=\'transparent\';">' +
                'Cancel' +
              '</button>' +

            '</div>' +
          '</div>' +

          /* Facets */
          '<div id="bn-sn999-facets" style="display:flex;align-items:flex-start;gap:48px;padding:16px 0;">' +

            /* Avatar + contact facet — customer ABC Metals (sender) */
            '<div style="display:flex;align-items:flex-start;gap:12px;flex-shrink:0;">' +
              '<div style="width:54px;height:54px;border-radius:8px;background:#eaecee;color:#5b738b;font-family:\'72\',Arial,sans-serif;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">AB</div>' +
              '<div style="display:flex;flex-direction:column;gap:6px;font-family:\'72\',Arial,sans-serif;font-size:14px;">' +
                '<div style="display:flex;gap:6px;align-items:baseline;">' +
                  '<span style="color:#556b82;white-space:nowrap;">Customer:</span>' +
                  '<span style="color:#1d2d3e;white-space:nowrap;">ABC</span>' +
                '</div>' +
                '<div style="display:flex;gap:6px;align-items:baseline;">' +
                  '<span style="color:#556b82;white-space:nowrap;">Phone:</span>' +
                  '<span style="color:#1d2d3e;white-space:nowrap;">+1 (214) 555-0182</span>' +
                '</div>' +
                '<div style="display:flex;gap:6px;align-items:baseline;">' +
                  '<span style="color:#556b82;white-space:nowrap;">Email:</span>' +
                  '<span style="color:#0064d9;white-space:nowrap;">logistics@abcmetals.com</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

            /* Dates facet */
            '<div style="display:flex;flex-direction:column;gap:6px;font-family:\'72\',Arial,sans-serif;font-size:14px;">' +
              '<div style="display:flex;gap:6px;align-items:baseline;">' +
                '<span style="color:#556b82;white-space:nowrap;">Creation Date:</span>' +
                '<span style="color:#1d2d3e;white-space:nowrap;">' + snCreateDate + '</span>' +
              '</div>' +
              '<div style="display:flex;gap:6px;align-items:baseline;">' +
                '<span style="color:#556b82;white-space:nowrap;">Shipping Date:</span>' +
                '<span style="color:#1d2d3e;white-space:nowrap;">' + snShipDate + '</span>' +
              '</div>' +
              '<div style="display:flex;gap:6px;align-items:baseline;">' +
                '<span style="color:#556b82;white-space:nowrap;">Delivery Date:</span>' +
                '<span style="color:#1d2d3e;white-space:nowrap;">Apr 11, 2026</span>' +
              '</div>' +
            '</div>' +

            /* Status facet — MicroProcessFlow style (matches Figma node 213:32803) */
            '<div style="display:flex;flex-direction:column;gap:16px;flex-shrink:0;">' +
              '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;white-space:nowrap;">Status</span>' +
              '<div style="display:flex;align-items:center;gap:4px;">' +

                /* Step 1: Order Confirmed — complete.svg, icon colour #788FA6 */
                '<div title="Order Confirmed" style="width:30px;height:30px;border-radius:50%;border:1px solid #788FA6;background:#EFF1F2;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;">' +
                  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M10.25 0.996087C10.6642 0.996087 11 1.33187 11 1.74609C11 2.1603 10.6642 2.49609 10.25 2.49609H3.75C3.05964 2.49609 2.5 3.05573 2.5 3.74609V12.2461C2.5 12.9364 3.05965 13.4961 3.75 13.4961H12.25C12.9404 13.4961 13.5 12.9364 13.5 12.2461V6.74999C13.5 6.33578 13.8358 5.99999 14.25 5.99999C14.6642 5.99999 15 6.33578 15 6.74999V12.2461C15 13.7649 13.7688 14.9961 12.25 14.9961H3.75C2.23122 14.9961 1 13.7649 1 12.2461V3.74609C1 2.2273 2.23122 0.996087 3.75 0.996087H10.25ZM14.6846 0.254876C14.958 -0.0561742 15.4321 -0.0867719 15.7432 0.186517C16.0543 0.459975 16.085 0.933999 15.8115 1.24511L8.7041 9.33105C8.34199 9.74298 7.70735 9.7635 7.31934 9.37597L4.96973 7.02636C4.67683 6.73347 4.67684 6.25871 4.96973 5.96581C5.26262 5.67292 5.73738 5.67292 6.03027 5.96581L7.96387 7.89941L14.6846 0.254876Z" fill="#788FA6"/>' +
                  '</svg>' +
                '</div>' +

                /* Connector */
                '<div style="width:10px;height:1px;background:#788FA6;flex-shrink:0;"></div>' +

                /* Step 2: Ship Notice Sent — connected.svg, icon colour #788FA6 */
                '<div title="Ship Notice Sent" style="width:30px;height:30px;border-radius:50%;border:1px solid #788FA6;background:#EFF1F2;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;">' +
                  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<g clip-path="url(#cc2)">' +
                      '<path d="M0.219731 0.219731C0.512625 -0.0731624 0.987386 -0.0731624 1.28028 0.219731L3.83399 2.77345C4.91083 1.7176 6.64187 1.72441 7.709 2.79884L13.1953 8.32326C14.2488 9.38397 14.2606 11.0902 13.2266 12.166L15.7803 14.7198C16.0731 15.0127 16.0732 15.4874 15.7803 15.7803C15.4874 16.0732 15.0127 16.0731 14.7198 15.7803L12.1758 13.2364C11.0996 14.2786 9.3812 14.2707 8.3174 13.2022L2.82032 7.68166C1.76621 6.62277 1.7523 4.91832 2.78126 3.84181L0.219731 1.28028C-0.0731624 0.987386 -0.0731624 0.512625 0.219731 0.219731ZM7.15236 9.90725L9.38088 12.1446C9.87283 12.6384 10.6741 12.6345 11.1612 12.1358L12.1387 11.1348C12.6157 10.6464 12.6127 9.86545 12.1319 9.38088L9.91311 7.1465L7.15236 9.90725ZM6.64455 3.85646C6.15415 3.36269 5.35438 3.36342 4.86622 3.85939L3.87794 4.86427C3.39741 5.35268 3.39957 6.13738 3.88282 6.62306L6.09474 8.84377L8.85549 6.08302L6.64455 3.85646Z" fill="#788FA6"/>' +
                    '</g>' +
                    '<defs><clipPath id="cc2"><rect width="16" height="16" fill="white"/></clipPath></defs>' +
                  '</svg>' +
                '</div>' +

                /* Connector */
                '<div style="width:10px;height:1px;background:#788FA6;flex-shrink:0;"></div>' +

                /* Step 3: In Transit */
                '<div title="In Transit" style="width:30px;height:30px;border-radius:50%;border:1px solid #788FA6;background:#EFF1F2;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;">' +
                  _bnIcon("shipping-status", 16, "opacity:.6;") +
                '</div>' +

                /* Connector */
                '<div style="width:10px;height:1px;background:#788FA6;flex-shrink:0;"></div>' +

                /* Step 4: Received */
                '<div title="Received" style="width:30px;height:30px;border-radius:50%;border:1px solid #788FA6;background:#EFF1F2;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;">' +
                  _bnIcon("receipt", 16, "opacity:.6;") +
                '</div>' +

              '</div>' +
            '</div>' +

          '</div>' +

          /* WIP Header Indication — Figma .base/Header Indication pattern */
          '<div style="position:relative;height:0;">' +
            /* 196px gradient line centered */
            '<div style="position:absolute;left:50%;transform:translateX(-50%);top:0;width:196px;height:1px;">' +
              '<div style="position:absolute;inset:0;background:linear-gradient(to right, transparent 0%, #d9d9d9 20%, #d9d9d9 80%, transparent 100%);"></div>' +
            '</div>' +
            /* Two buttons centered, straddling the line */
            '<div style="position:absolute;left:50%;transform:translateX(-50%);top:-12px;display:flex;gap:8px;align-items:flex-start;">' +
              '<button id="bn-sn999-collapse-btn" onclick="window._bnSn999ToggleHeader()" title="Collapse header" ' +
                'style="width:24px;height:24px;border-radius:8px;border:1px solid #bcc3ca;background:#fff;' +
                'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;">' +
                '<span style="font-family:\'SAP-icons\';font-size:16px;color:#1d2d3e;line-height:1;" id="bn-sn999-collapse-icon">&#xe1e1;</span>' +
              '</button>' +
              '<button onclick="window._bnSn999TogglePin()" title="Pin header" ' +
                'style="width:24px;height:24px;border-radius:8px;border:1px solid #bcc3ca;background:#fff;' +
                'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;">' +
                '<span id="bn-sn999-pin-icon">' + _bnIcon("pushpin-off", 16) + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          /* Fiori Icon Tab Bar */
          '<div style="display:flex;align-items:center;gap:32px;margin-top:16px;position:relative;z-index:1;background:#fff;box-shadow:0 2px 2px rgba(34,53,72,.05),inset 0 -1px 0 0 #d9d9d9;">' +

            /* Details — active */
            '<div style="position:relative;display:flex;align-items:center;gap:4px;height:44px;padding:0 3px;cursor:pointer;flex-shrink:0;">' +
              '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#0064d9;white-space:nowrap;line-height:1;">Details</span>' +
              '<span style="font-family:\'SAP-icons\';font-size:12px;color:#0064d9;line-height:1;">&#xe1ef;</span>' +
              '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:#0064d9;border-radius:2px 2px 0 0;"></div>' +
            '</div>' +

            /* Line Items — inactive */
            '<div style="display:flex;align-items:center;gap:4px;height:44px;padding:0 3px;cursor:pointer;flex-shrink:0;">' +
              '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#131e29;white-space:nowrap;line-height:1;">Line Items</span>' +
            '</div>' +

            /* Additional Information — inactive */
            '<div style="display:flex;align-items:center;gap:4px;height:44px;padding:0 3px;cursor:pointer;flex-shrink:0;">' +
              '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#131e29;white-space:nowrap;line-height:1;">Additional Information</span>' +
              '<span style="font-family:\'SAP-icons\';font-size:12px;color:#131e29;line-height:1;">&#xe1ef;</span>' +
            '</div>' +

            /* History — inactive */
            '<div style="display:flex;align-items:center;gap:4px;height:44px;padding:0 3px;cursor:pointer;flex-shrink:0;">' +
              '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#131e29;white-space:nowrap;line-height:1;">History</span>' +
            '</div>' +

          '</div>' +

        '</div>' + /* end header */

        /* ══ Scrollable body ══ */
        '<div style="flex:1;overflow-y:auto;padding:20px 16px;background:#f5f6f7;">' +

          /* General — Fiori Form section (matches Figma node 218:11380) */
          '<div style="margin-bottom:12px;">' +
            /* Section title */
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;margin-bottom:8px;">General</div>' +
            /* White card */
            '<div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(34,53,72,.06);">' +
              '<div style="display:flex;gap:0;align-items:flex-start;">' +

                /* Ship From */
                '<div style="flex:0 0 213px;display:flex;flex-direction:column;gap:16px;padding-right:32px;">' +
                  '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;height:32px;display:flex;align-items:center;">Ship From</div>' +
                  '<div style="display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Name:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">ABC Metals</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Address:</span>' +
                      '<div style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:1.4;">' +
                        '1201 Industrial Blvd<br/>Houston, TX 77015<br/>United States' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                /* Ship To */
                '<div style="flex:0 0 260px;display:flex;flex-direction:column;gap:16px;padding-right:32px;">' +
                  '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;height:32px;display:flex;align-items:center;">Ship To</div>' +
                  '<div style="display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Name:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Acme Corp.</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Address:</span>' +
                      '<div style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:1.4;">' +
                        '4800 S Westmoreland Rd<br/>Dallas, TX 75237<br/>United States' +
                      '</div>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Contact:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;">receiving.dallas@acmecorp.com</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                /* Ship Details */
                '<div style="flex:0 0 260px;display:flex;flex-direction:column;gap:16px;padding-right:32px;">' +
                  '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;height:32px;display:flex;align-items:center;">Ship Details</div>' +
                  '<div style="display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Packing Slip ID:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">ASN-999</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Notice Date:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">' + snCreateDate + '</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Priority Level</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Normal</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Ship Notice Type</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Estimated</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                /* Dates column */
                '<div style="flex:0 0 260px;display:flex;flex-direction:column;gap:16px;padding-top:32px;">' +
                  '<div style="display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Estimated Shipping Date</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">' + snShipDate + '</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Estimated Delivery Date:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Apr 11, 2026</span>' +
                    '</div>' +
                  '</div>' +
                '</div>' +

              '</div>' +
            '</div>' +
          '</div>' +

          /* Tracking Details — Fiori Form section (matches Figma node 213:32549) */
          '<div style="margin-bottom:12px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;margin-bottom:8px;padding:8px 0 0;">Tracking Details</div>' +
            '<div style="background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 2px rgba(34,53,72,.06);">' +
              '<div style="display:flex;gap:16px;align-items:flex-start;">' +

                /* Left half: two sub-columns */
                '<div style="flex:1;display:flex;gap:16px;align-items:flex-start;">' +

                  /* Col 1: Carrier Name, Tracking No., Tracking Date */
                  '<div style="flex:1;display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Carrier Name:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Carrier A</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Tracking No.:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;">TRK-2026-09981</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Tracking Date</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">' + snShipDate + ' 08:00:00 AM</span>' +
                    '</div>' +
                  '</div>' +

                  /* Col 2: Shipping Method, Shipping Contract Number */
                  '<div style="flex:1;display:flex;flex-direction:column;gap:8px;">' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Method:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Ground Freight</span>' +
                    '</div>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Contract Number:</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">5550999</span>' +
                    '</div>' +
                  '</div>' +

                '</div>' +

                /* Right half: Shipping Instructions */
                '<div style="flex:1;display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Instructions:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:1.5;">Industrial parts shipment — steel frames, gear units, and motor drive controllers. Secure all pallets with strapping before loading. Do not stack more than 2 pallets high. Contact the receiving dock supervisor at 4800 S Westmoreland Rd at least 2 hours prior to delivery for scheduling. Reference PO 789 and PO 304 on all delivery documentation.</span>' +
                '</div>' +

              '</div>' +
            '</div>' +
          '</div>' +

          /* Delivery Details */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;margin-bottom:8px;">Delivery Details</div>' +
            '<div style="background:#fff;border-radius:16px;padding:16px;">' +
              '<div style="display:flex;gap:16px;">' +

                /* Col 1: Delivery Terms */
                '<div style="flex:1;display:flex;flex-direction:column;gap:12px;">' +
                  '<div style="display:flex;flex-direction:column;gap:2px;">' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Delivery Terms</span>' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">DAP – Delivered at Place</span>' +
                  '</div>' +
                  '<div style="display:flex;flex-direction:column;gap:2px;">' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Delivery Terms Description</span>' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Seller bears all costs and risks of delivering goods to the named destination (4800 S Westmoreland Rd, Dallas, TX). Buyer is responsible for unloading.</span>' +
                  '</div>' +
                '</div>' +

                /* Col 2: Transport Terms Description */
                '<div style="flex:1;display:flex;flex-direction:column;gap:2px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Transport Terms Description</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Carrier A assigned via SAP Business Network. Freight cost $320, prepaid by ABC Metals. Estimated transit 2 days. On-time delivery rate 97% on this route.</span>' +
                '</div>' +

                /* Col 3: Shipping Payment Method + Contract Number */
                '<div style="flex:1;display:flex;flex-direction:column;gap:12px;">' +
                  '<div style="display:flex;flex-direction:column;gap:2px;">' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Payment Method</span>' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Prepaid</span>' +
                  '</div>' +
                  '<div style="display:flex;flex-direction:column;gap:2px;">' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Contract Number</span>' +
                    '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">5550999</span>' +
                  '</div>' +
                '</div>' +

                /* Col 4: Shipping Instructions */
                '<div style="flex:1;display:flex;flex-direction:column;gap:2px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">Shipping Instructions</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;line-height:1.5;">Secure all pallets with strapping before loading. Do not stack more than 2 pallets high. Reference PO 789 and PO 304 on all delivery documentation. Notify receiving dock 2 hours before arrival.</span>' +
                '</div>' +

              '</div>' +
            '</div>' +
          '</div>' +

          /* Transport Details */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;margin-bottom:8px;">Transport Details</div>' +
            '<div style="background:#fff;border-radius:16px;overflow:hidden;">' +

              /* Toolbar */
              '<div style="display:flex;align-items:center;gap:8px;padding:3px 8px;border-bottom:1px solid #a8b3bd;background:#fff;">' +
                '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;flex:1;line-height:38px;">Terms</span>' +
                /* Search input */
                '<div style="display:flex;align-items:center;width:280px;height:26px;border-radius:4px;border:1px solid rgba(85,107,129,.25);background:#fff;padding:0 8px;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;flex:1;">Search</span>' +
                  '<span style="font-family:\'SAP-icons\';font-size:16px;color:#556b82;">&#xe1fd;</span>' +
                '</div>' +
                /* Add Line button */
                '<button style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;background:#fff;border:1px solid #bcc3ca;border-radius:8px;padding:5px 8px;cursor:pointer;white-space:nowrap;">Add Line</button>' +
                /* Lite buttons */
                '<button style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;opacity:.4;white-space:nowrap;">Download PDF</button>' +
                '<button style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;opacity:.4;white-space:nowrap;">Copy</button>' +
                '<button style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#0064d9;background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;opacity:.4;white-space:nowrap;">Paste</button>' +
              '</div>' +

              /* Table */
              '<table style="width:100%;border-collapse:collapse;">' +
                /* Header */
                '<thead>' +
                  '<tr style="background:#fff;">' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;width:134px;white-space:nowrap;">Transport Terms</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;width:214px;white-space:nowrap;">Equipment Identification Code</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;white-space:nowrap;">Gross Volume</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;white-space:nowrap;">Gross Weight</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;white-space:nowrap;">Sealing Party Code</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;white-space:nowrap;">Seal ID</th>' +
                  '</tr>' +
                '</thead>' +
                /* Row */
                '<tbody>' +
                  '<tr style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">DAP</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">EIC001</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">100 M\u00b3</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">142 KG</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">SPC002</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px 8px;height:48px;">S003</td>' +
                  '</tr>' +
                '</tbody>' +
              '</table>' +

            '</div>' +
          '</div>' +

          /* Line Items */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:20px;font-weight:700;color:#1d2d3e;margin-bottom:12px;">Line Items</div>' +
            '<div style="background:#fff;border-radius:16px;overflow:hidden;">' +

              /* Toolbar */
              '<div style="display:flex;align-items:center;gap:8px;padding:3px 8px;border-bottom:1px solid #a8b3bd;background:#fff;">' +
                '<div style="flex:1;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;line-height:38px;">Lines (3)</div>' +
                '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;opacity:.4;" title="Export"><span style="font-family:\'SAP-icons\';font-size:16px;color:#0064d9;">&#xe30f;</span></button>' +
                '<div style="width:1px;height:26px;background:#d9d9d9;"></div>' +
                '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;" title="Settings"><span style="font-family:\'SAP-icons\';font-size:16px;color:#0064d9;">&#xe00d;</span></button>' +
                '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;" title="Full Screen">' + _bnIcon("full-screen", 16) + '</button>' +
              '</div>' +

              /* Table */
              '<table style="width:100%;border-collapse:collapse;">' +
                '<thead>' +
                  '<tr>' +
                    '<th style="width:6px;padding:0;border-bottom:1px solid #a8b3bd;background:#fff;"></th>' +
                    '<th style="width:32px;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;width:60px;white-space:nowrap;">Line</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;width:50px;white-space:nowrap;">Item</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;white-space:nowrap;">Description</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;width:100px;white-space:nowrap;">Qty (EA)</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;width:120px;white-space:nowrap;">Est. Delivery</th>' +
                    '<th style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #a8b3bd;background:#fff;width:271px;white-space:nowrap;">Shipped Qty</th>' +
                    '<th style="width:32px;border-bottom:1px solid #a8b3bd;background:#fff;"></th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody>' +

                  /* ── Group Header: PO 789 ── */
                  '<tr style="background:#eff1f2;">' +
                    '<td style="width:6px;padding:0;border-bottom:1px solid #a8b3bd;background:#eff1f2;"></td>' +
                    '<td style="padding:8px;border-bottom:1px solid #a8b3bd;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></td>' +
                    '<td colspan="7" style="padding:8px;border-bottom:1px solid #a8b3bd;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;">Purchase Order: </span>' +
                      '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#0064d9;cursor:pointer;">PO 789</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;margin-left:12px;">2 items &nbsp;|&nbsp; <span data-sn-group-total="PO 789">56 EA</span> &nbsp;|&nbsp; Ship to: 4800 S Westmoreland Rd, Dallas, TX 75237</span>' +
                    '</td>' +
                  '</tr>' +

                  /* PO 789 / Item 10 — Qty 33, Apr 12 */
                  '<tr data-sn-line="1" style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="width:6px;padding:0;"></td>' +
                    '<td style="padding:8px;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;height:52px;vertical-align:middle;">1</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">10</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Steel Frame Assembly</td>' +
                    '<td data-sn-qty style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">33</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Apr 12, 2026</td>' +
                    '<td style="padding:8px;vertical-align:middle;">' +
                      '<div style="position:relative;width:132px;height:44px;">' +
                        '<span style="position:absolute;top:0;left:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#556b82;">0 EA</span>' +
                        '<div style="position:absolute;bottom:12px;left:0;right:0;height:4px;background:#e5e5e5;border-radius:2px;"></div>' +
                        '<span data-sn-max style="position:absolute;bottom:0;right:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#1d2d3e;">33 EA</span>' +
                      '</div>' +
                    '</td>' +
                    '<td style="padding:8px;text-align:center;vertical-align:middle;"><span style="font-family:\'SAP-icons\';font-size:12px;color:#0064d9;cursor:pointer;">&#xe1ed;</span></td>' +
                  '</tr>' +

                  /* PO 789 / Item 20 — Qty 23, Apr 13 */
                  '<tr data-sn-line="2" style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="width:6px;padding:0;"></td>' +
                    '<td style="padding:8px;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;height:52px;vertical-align:middle;">2</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">20</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Gear Unit Module</td>' +
                    '<td data-sn-qty style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">23</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Apr 13, 2026</td>' +
                    '<td style="padding:8px;vertical-align:middle;">' +
                      '<div style="position:relative;width:132px;height:44px;">' +
                        '<span style="position:absolute;top:0;left:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#556b82;">0 EA</span>' +
                        '<div style="position:absolute;bottom:12px;left:0;right:0;height:4px;background:#e5e5e5;border-radius:2px;"></div>' +
                        '<span data-sn-max style="position:absolute;bottom:0;right:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#1d2d3e;">23 EA</span>' +
                      '</div>' +
                    '</td>' +
                    '<td style="padding:8px;text-align:center;vertical-align:middle;"><span style="font-family:\'SAP-icons\';font-size:12px;color:#0064d9;cursor:pointer;">&#xe1ed;</span></td>' +
                  '</tr>' +

                  /* ── Group Header: PO 304 ── */
                  '<tr style="background:#eff1f2;">' +
                    '<td style="width:6px;padding:0;border-bottom:1px solid #a8b3bd;background:#eff1f2;"></td>' +
                    '<td style="padding:8px;border-bottom:1px solid #a8b3bd;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></td>' +
                    '<td colspan="7" style="padding:8px;border-bottom:1px solid #a8b3bd;">' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;font-weight:600;color:#1d2d3e;">Purchase Order: </span>' +
                      '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#0064d9;cursor:pointer;">PO 304</span>' +
                      '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;margin-left:12px;">1 item &nbsp;|&nbsp; <span data-sn-group-total="PO 304">18 EA</span> &nbsp;|&nbsp; Ship to: 4800 S Westmoreland Rd, Dallas, TX 75237</span>' +
                    '</td>' +
                  '</tr>' +

                  /* PO 304 / Item 10 — Qty 18, Apr 14 */
                  '<tr data-sn-line="3" style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="width:6px;padding:0;"></td>' +
                    '<td style="padding:8px;text-align:center;"><input type="checkbox" style="cursor:pointer;" /></td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;height:52px;vertical-align:middle;">3</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">10</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Motor Drive Controller</td>' +
                    '<td data-sn-qty style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">18</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;vertical-align:middle;">Apr 14, 2026</td>' +
                    '<td style="padding:8px;vertical-align:middle;">' +
                      '<div style="position:relative;width:132px;height:44px;">' +
                        '<span style="position:absolute;top:0;left:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#556b82;">0 EA</span>' +
                        '<div style="position:absolute;bottom:12px;left:0;right:0;height:4px;background:#e5e5e5;border-radius:2px;"></div>' +
                        '<span data-sn-max style="position:absolute;bottom:0;right:0;font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:12px;font-weight:700;color:#1d2d3e;">18 EA</span>' +
                      '</div>' +
                    '</td>' +
                    '<td style="padding:8px;text-align:center;vertical-align:middle;"><span style="font-family:\'SAP-icons\';font-size:12px;color:#0064d9;cursor:pointer;">&#xe1ed;</span></td>' +
                  '</tr>' +

                '</tbody>' +
              '</table>' +

            '</div>' +
          '</div>' +

          /* Additional Information */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:20px;font-weight:700;color:#1d2d3e;margin-bottom:8px;">Additional Information</div>' +
            '<div style="background:#fff;border-radius:12px;padding:16px;display:flex;gap:16px;">' +

              /* Col 1 */
              '<div style="flex:1;display:flex;flex-direction:column;gap:16px;">' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Reason for Shipment:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Standard Replenishment</span>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Comments:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;">Auto-generated by Joule. Carrier A confirmed for Dallas delivery route.</span>' +
                '</div>' +
              '</div>' +

              /* Col 2 */
              '<div style="flex:1;display:flex;flex-direction:column;gap:16px;">' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Invoice Number:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">INV-2026-09981</span>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Total of Packages:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">3</span>' +
                '</div>' +
              '</div>' +

              /* Col 3 */
              '<div style="flex:1;display:flex;flex-direction:column;gap:16px;">' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Government Issued Shipping ID:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">US-TX-2026-44821</span>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Document Title:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">ASN-999 &ndash; ABC Metals to Acme Corp.</span>' +
                '</div>' +
              '</div>' +

              /* Col 4 */
              '<div style="flex:1;display:flex;flex-direction:column;gap:16px;">' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Supplier Reference:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">ABC-SN-2026-999</span>' +
                '</div>' +
                '<div style="display:flex;flex-direction:column;gap:4px;">' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;white-space:nowrap;">Transit Direction:</span>' +
                  '<span style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#131e29;">Outbound</span>' +
                '</div>' +
              '</div>' +

            '</div>' +
          '</div>' +

          /* Related Documents */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;margin-bottom:8px;">Related Documents</div>' +
            '<div style="background:#fff;border-radius:12px;overflow:hidden;">' +

              /* Toolbar */
              '<div style="padding:0 16px;height:44px;display:flex;align-items:center;border-bottom:1px solid #a8b3bd;background:#fff;">' +
                '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;">Documents (2)</span>' +
              '</div>' +

              /* Table */
              '<table style="width:100%;border-collapse:collapse;">' +
                '<thead>' +
                  '<tr>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #e5e5e5;background:#fff;">Document Number</th>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;border-bottom:1px solid #e5e5e5;background:#fff;">Type</th>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:right;padding:8px;border-bottom:1px solid #e5e5e5;background:#fff;">Created Date</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody>' +
                  '<tr style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="padding:8px;height:32px;"><span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#0064d9;cursor:pointer;">PO 789</span></td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;">Purchase Order</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;text-align:right;">Mar 10, 2026</td>' +
                  '</tr>' +
                  '<tr style="border-bottom:1px solid #e5e5e5;">' +
                    '<td style="padding:8px;height:32px;"><span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#0064d9;cursor:pointer;">PO 304</span></td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;">Purchase Order</td>' +
                    '<td style="font-family:\'72\',Arial,sans-serif;font-size:14px;color:#1d2d3e;padding:8px;text-align:right;">Mar 12, 2026</td>' +
                  '</tr>' +
                '</tbody>' +
              '</table>' +

            '</div>' +
          '</div>' +

          /* History */
          '<div style="margin-bottom:16px;">' +
            '<div style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:20px;font-weight:700;color:#1d2d3e;margin-bottom:12px;">History</div>' +
            '<div style="background:#fff;border-radius:12px;overflow:hidden;">' +

              /* Toolbar */
              '<div style="padding:0 16px;height:44px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #a8b3bd;background:#fff;">' +
                '<span style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:16px;font-weight:700;color:#1d2d3e;">Updates</span>' +
                '<div style="display:flex;align-items:center;gap:4px;">' +
                  '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Sort">' + _bnIcon("sort") + '</button>' +
                  '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Filter">' + _bnIcon("filter") + '</button>' +
                  '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Group">' + _bnIcon("group-2") + '</button>' +
                  '<div style="width:1px;height:26px;background:#d9d9d9;margin:0 4px;"></div>' +
                  '<button style="background:transparent;border:1px solid transparent;border-radius:8px;padding:5px 8px;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Full Screen">' + _bnIcon("full-screen") + '</button>' +
                '</div>' +
              '</div>' +

              /* Table header */
              '<table style="width:100%;border-collapse:collapse;">' +
                '<thead>' +
                  '<tr style="border-bottom:1px solid #a8b3bd;">' +
                    '<td style="width:6px;padding:0;border-right:none;background:#fff;border-top:1px solid #e5e5e5;"></td>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;border-bottom:none;background:#fff;border-right:1px solid #e5e5e5;width:168px;">Routing Status</th>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;background:#fff;border-right:1px solid #e5e5e5;">Activity</th>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;background:#fff;border-right:1px solid #e5e5e5;">Changed By</th>' +
                    '<th style="font-family:\'72Bold\',\'72\',Arial,sans-serif;font-size:14px;font-weight:700;color:#1d2d3e;text-align:left;padding:8px;background:#fff;">Date and Time</th>' +
                  '</tr>' +
                '</thead>' +
                '<tbody>' +
                  '<tr>' +
                    '<td colspan="5" style="text-align:center;padding:32px;font-family:\'72\',Arial,sans-serif;font-size:14px;color:#556b82;">No Data</td>' +
                  '</tr>' +
                '</tbody>' +
              '</table>' +

            '</div>' +
          '</div>' +

        '</div>'; /* end scrollable */

      mainArea.style.position = "relative";

      var old = document.getElementById("bn-sn999-overlay");
      if (old) { old.parentNode.removeChild(old); }

      var overlay = document.createElement("div");
      overlay.id = "bn-sn999-overlay";
      overlay.style.cssText = "position:absolute;inset:0;z-index:20;overflow:hidden;display:flex;flex-direction:column;background:#f5f6f7;font-family:'72','72full',Arial,Helvetica,sans-serif;";
      overlay.innerHTML = pageHtml;
      mainArea.appendChild(overlay);
      window._bnTableMode = "sn999";
    }

    function _sn999Field(label, value) {
      return '<div style="display:flex;flex-direction:column;gap:3px;">' +
        '<span style="font-size:11px;color:#8696a9;">' + label + '</span>' +
        '<span style="font-size:13px;color:#223549;">' + value + '</span>' +
      '</div>';
    }

    function _sn999Row(line, partNum, desc, qty, uom, status, poRef, highlight) {
      var rowBg = highlight ? "background:#fff8e1;" : "";
      return '<tr style="border-bottom:1px solid #f0f1f2;' + rowBg + '">' +
        '<td style="padding:10px 12px;color:#223549;font-weight:600;">' + line + '</td>' +
        '<td style="padding:10px 12px;color:#223549;">' + partNum + '</td>' +
        '<td style="padding:10px 12px;color:#223549;">' + desc + '</td>' +
        '<td style="padding:10px 12px;text-align:right;color:#223549;' + (highlight ? 'font-weight:700;' : '') + '">' + qty + '</td>' +
        '<td style="padding:10px 12px;color:#556b82;">' + uom + '</td>' +
        '<td style="padding:10px 12px;color:#223549;">' + (poRef || '\u2014') + '</td>' +
        '<td style="padding:10px 12px;">' +
          '<span style="background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:99px;padding:2px 8px;">' + status + '</span>' +
        '</td>' +
      '</tr>';
    }

    var _bnSn999Collapsed = false;
    window._bnSn999ToggleHeader = function () {
      _bnSn999Collapsed = !_bnSn999Collapsed;
      var facets = document.getElementById("bn-sn999-facets");
      if (facets) { facets.style.display = _bnSn999Collapsed ? "none" : "flex"; }
      var icon = document.getElementById("bn-sn999-collapse-icon");
      if (icon) { icon.innerHTML = _bnSn999Collapsed ? "&#xe1e2;" : "&#xe1e1;"; }
    };

    var _bnSn999Pinned = false;
    window._bnSn999TogglePin = function () {
      _bnSn999Pinned = !_bnSn999Pinned;
      var icon = document.getElementById("bn-sn999-pin-icon");
      if (icon) { icon.innerHTML = _bnSn999Pinned ? _bnIcon("pushpin", 16) : _bnIcon("pushpin-off", 16); }
    };

    window._bnBackToSnList = function () {
      window._bnTableMode = "shipNotice";
      var overlay = document.getElementById("bn-sn999-overlay");
      if (overlay && overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
      /* Re-prompt in Joule */
      var _ab = window._bnJouleAppendBubble;
      var _sb = window._bnJouleScrollBottom;
      if (typeof _ab === "function") {
        setTimeout(function () {
          _ab("bn-joule-bubble", "You\u2019re back on the ASN list. How can I assist you next?");
          if (typeof _sb === "function") { _sb(); }
        }, 300);
      }
    };

    window._bnBackToWorkbench = function () {
      /* Close the ASN-999 overlay */
      var overlay = document.getElementById("bn-sn999-overlay");
      if (overlay && overlay.parentNode) { overlay.parentNode.removeChild(overlay); }

      /* Reflect updated shipped quantities back into the workbench SRC rows */
      var descMap = {};
      _bnLineItems.forEach(function (li) { descMap[li.desc] = li.qty; });
      SRC.forEach(function (row) {
        if (descMap[row.description] !== undefined) {
          row.shippedQty = descMap[row.description] + " PC";
        }
      });

      /* Restore workbench table */
      window._bnTableMode = "orders";
      oModel.setProperty("/orders", JSON.parse(JSON.stringify(SRC)));

      /* Restore columns */
      oTable.removeAllColumns();
      [
        { text: "Order Number" },
        { text: "Item Number",              minScreenWidth: "Tablet",  demandPopin: true },
        { text: "Supplier Part Number",     minScreenWidth: "Tablet",  demandPopin: true },
        { text: "Description",              minScreenWidth: "Tablet",  demandPopin: true },
        { text: "Need By",                  minScreenWidth: "Desktop", demandPopin: true },
        { text: "Ship By",                  minScreenWidth: "Desktop", demandPopin: true },
        { text: "Confirmed Delivery Date",  minScreenWidth: "Desktop", demandPopin: true },
        { text: "Requested Quantity",       minScreenWidth: "Desktop", demandPopin: true, hAlign: "End" },
        { text: "Shipped Quantity",         minScreenWidth: "Desktop", demandPopin: true, hAlign: "End" },
        { text: "Received Quantity",        minScreenWidth: "Desktop", demandPopin: true, hAlign: "End" },
        { text: "Due Quantity",             minScreenWidth: "Desktop", demandPopin: true, hAlign: "End" },
        { text: "Location",                 minScreenWidth: "Desktop", demandPopin: true },
        { text: "Purchasing Group",         minScreenWidth: "Desktop", demandPopin: true },
        { text: "Purchasing Organisation",  minScreenWidth: "Desktop", demandPopin: true },
        { text: "Purchasing Code",          minScreenWidth: "Desktop", demandPopin: true }
      ].forEach(function (c) {
        oTable.addColumn(new Column({
          header: new Text({ text: c.text }),
          minScreenWidth: c.minScreenWidth || undefined,
          demandPopin: c.demandPopin || false,
          hAlign: c.hAlign || "Begin"
        }));
      });

      /* Restore item template */
      oTable.unbindItems();
      oTable.bindItems({
        path: "orders>/orders",
        groupHeaderFactory: createGroupHeader,
        sorter: new Sorter("poNumber", false, groupByPO),
        template: new ColumnListItem({
          type: "Navigation",
          cells: [
            new Link({ text: "{orders>orderNumber}" }),
            new Text({ text: "{orders>itemNumber}" }),
            new Text({ text: "{orders>supplierPartNumber}", wrapping: false }),
            new Text({ text: "{orders>description}" }),
            new Text({ text: { parts: [{path:"orders>needBy"}],                formatter: fmtDate }, wrapping: false }),
            new Text({ text: { parts: [{path:"orders>shipBy"}],                formatter: fmtDate }, wrapping: false }),
            new Text({ text: { parts: [{path:"orders>confirmedDeliveryDate"}], formatter: fmtDate }, wrapping: false }),
            new Text({ text: "{orders>requestedQty}",  wrapping: false }),
            new Text({ text: "{orders>shippedQty}",    wrapping: false }),
            new Text({ text: "{orders>receivedQty}",   wrapping: false }),
            new Text({ text: "{orders>dueQty}",        wrapping: false }),
            new Text({ text: "{orders>location}" }),
            new Text({ text: "{orders>purchasingGroup}", wrapping: false }),
            new Text({ text: "{orders>purchasingOrg}" }),
            new Text({ text: "{orders>purchasingCode}", wrapping: false })
          ]
        })
      });

      /* Restore page title and KPI tiles */
      var titleEl = document.querySelector(".bn-page-title");
      if (titleEl) { titleEl.textContent = "Workbench"; }
      document.title = "Workbench";

      var kpiScroll = document.getElementById("bn-kpi-tiles-scroll");
      if (kpiScroll) { kpiScroll.innerHTML = _buildKpiTilesHtml(KPI_TILES); }
      var kpiRowHeader = document.querySelector(".bn-kpi-row-header");
      if (kpiRowHeader) { kpiRowHeader.style.display = ""; }
      _updateKpiScroll();
      _updateKpiScroll();

      /* Restore filter fields */
      setTimeout(function () {
        var filterFields = document.querySelectorAll(".bn-filter-fields > .bn-filter-field, .bn-filter-fields > .sapMVBox.bn-filter-field");
        filterFields.forEach(function (el) { el.style.display = ""; });
        var filterFooter = document.querySelector(".bn-filter-footer");
        if (filterFooter) { filterFooter.style.display = ""; }
      }, 0);

      /* Restore nav */
      document.querySelectorAll(".bn-nav-item").forEach(function (el) {
        el.classList.remove("active");
        if (el.dataset.key === "workbench") { el.classList.add("active"); }
      });
    };

    window._bnSn999ToggleExportMenu = function () {
      var menu = document.getElementById("bn-sn999-export-menu");
      if (!menu) { return; }
      var isOpen = menu.style.display === "block";
      menu.style.display = isOpen ? "none" : "block";
      if (!isOpen) {
        /* close on next outside click — use a named handler so it can be removed */
        var exportCloseHandler = function (e) {
          var exportBtn = document.getElementById("bn-sn999-export-btn");
          if (!exportBtn || !exportBtn.contains(e.target)) {
            menu.style.display = "none";
            document.removeEventListener("click", exportCloseHandler);
          }
        };
        setTimeout(function () {
          document.addEventListener("click", exportCloseHandler);
        }, 0);
      }
    };

    window._bnSn999Edit   = function () { sap.m.MessageToast && sap.m.MessageToast.show("Edit ASN-999"); };
    window._bnSn999Cancel = function () { sap.m.MessageToast && sap.m.MessageToast.show("Cancel ASN-999"); };
    window._bnSn999ExportPDF = function () { sap.m.MessageToast && sap.m.MessageToast.show("Export as PDF"); };
    window._bnSn999ExportCSV = function () { sap.m.MessageToast && sap.m.MessageToast.show("Export as Spreadsheet"); };

    window._bnOpenShipNotice999 = _bnOpenShipNotice999;
    window._bnJouleAppendBubble = appendBubble;
    window._bnJouleScrollBottom = scrollBottom;
    window._bnCancelShipNoticeFlow = _bnCancelShipNoticeFlow;
    window._bnEditShipNoticeFlow   = _bnEditShipNoticeFlow;
    window._bnTypeReply            = typeReply;

    function _bnEnableInput() {
      var input   = document.getElementById("bn-joule-input");
      var sendBtn = document.getElementById("bn-joule-send");
      if (input)   { input.disabled = false; }
      if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = input && input.value.trim() ? "1" : ".4"; }
    }
    window._bnEnableInput = _bnEnableInput;

    function _bnWireEditInput() {
      var editInput = document.getElementById("bn-joule-input");
      if (!editInput) { return; }
      function onEditInputClick() {
        editInput.removeEventListener("click", onEditInputClick);
        editInput.removeEventListener("focus", onEditInputClick);
        _bnAutoTypeInput("I want to edit the ASN-999");
      }
      editInput.addEventListener("click", onEditInputClick);
      editInput.addEventListener("focus", onEditInputClick);
    }

    function sendMessage() {
      var input = document.getElementById("bn-joule-input");
      var sendBtn = document.getElementById("bn-joule-send");
      if (!input) { return; }
      var msg = input.value.trim();
      if (!msg) { return; }

      /* If welcome screen is still showing, transition to chat body */
      var welcome = document.getElementById("bn-joule-welcome");
      var body = document.getElementById("bn-joule-body");
      if (welcome && welcome.style.display !== "none") {
        welcome.style.display = "none";
        if (body) { body.style.display = "flex"; }
        if (window._bnStopWordCycle) { window._bnStopWordCycle(); }
      }

      /* Disable input while processing */
      input.disabled = true;
      if (sendBtn) { sendBtn.disabled = true; sendBtn.style.opacity = ".4"; }

      /* 1. Timestamp then user bubble */
      appendBubble("bn-joule-time", "<b>Today</b> " + getNow());
      appendBubble("bn-joule-user-bubble", msg);
      input.value = "";
      input.classList.remove("has-text");
      input.dispatchEvent(new Event("input"));

      /* 3. Thinking → loading status → reply text → result card */
      /* Route based on message content */
      if (msg.toLowerCase().indexOf("cancel") !== -1 && msg.toLowerCase().indexOf("777") !== -1) {
        typeReply("Sure, let me look into that for you.", function () { _bnCancelShipNoticeFlow(); });
      } else if (msg.toLowerCase().indexOf("edit") !== -1 && msg.toLowerCase().indexOf("999") !== -1) {
        typeReply("Of course, I\u2019ll get that sorted.", function () { _bnEditShipNoticeFlow(); });
      } else if (msg.toLowerCase().indexOf("modify") !== -1 && msg.toLowerCase().indexOf("line") !== -1) {
        typeReply("Great, let me pull up the line items for you.", function () { _bnModifyLineItemFlow(); });
      } else {
        typeReply("Sure. Let me find the relevant order items for you.", function () {
        showThinkingDots(function () {
          var statusEl = appendBubble("bn-joule-status",
            _bnStatusHtml('Retrieving order items matching the request\u2026', 2000)
          );
          scrollBottom();
          setTimeout(function () {
            if (statusEl && statusEl.parentNode) { statusEl.parentNode.removeChild(statusEl); }
            typeReply("I have identified the order items confirmed for shipment this week for customer ABC. Please review the details below.", function () {
              setTimeout(buildResultCard, 200);
            });
          }, 2000);
        });
        }); /* end typeReply ack */
      }
    }

    function init() {
      var sendBtn = document.getElementById("bn-joule-send");
      var input   = document.getElementById("bn-joule-input");
      if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
      }
      if (input) {
        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
        });
        /* Light up send button when input has text */
        input.addEventListener("input", function () {
          var hasText = input.value.trim().length > 0;
          input.classList.toggle("has-text", hasText);
          if (sendBtn) {
            sendBtn.style.opacity = hasText ? "1" : ".4";
          }
        });
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      setTimeout(init, 300);
    }
  })();

  /* ────────────────────────────────────────────────────────────
     MAIN LAYOUT
  ──────────────────────────────────────────────────────────── */
  /* Wrap side nav + main + joule in horizontal band */
  var oAppRow = new HTML({ content: '<div class="bn-app" id="bn-app-row">' });
  var oAppRowEnd = new HTML({ content: '</div>' });

  /* ────────────────────────────────────────────────────────────
     ROOT CONTAINER
  ──────────────────────────────────────────────────────────── */
  /* We can't nest HTML-wrappers easily so we build the DOM directly */
  sap.ui.require(["sap/ui/core/Core"], function (Core) {
    /* Render shell bar + side nav as raw DOM, then place UI5 controls */
    var oContent = document.getElementById("content");
    if (!oContent) { return; }

    /* Apply flex column to content */
    oContent.style.cssText = "flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;";

    /* Shell wrapper div */
    var shellWrap = document.createElement("div");
    oContent.appendChild(shellWrap);
    oShell.placeAt(shellWrap);

    /* App row: sidenav + main + joule */
    var appRow = document.createElement("div");
    appRow.className = "bn-app";
    appRow.style.flex = "1";
    appRow.style.minHeight = "0";
    oContent.appendChild(appRow);

    /* Side nav wrapper */
    var sideWrap = document.createElement("div");
    sideWrap.style.cssText = "display:flex;flex-direction:column;align-self:stretch;";
    appRow.appendChild(sideWrap);
    oSideNav.placeAt(sideWrap);

    /* Main wrapper */
    var mainWrap = document.createElement("div");
    mainWrap.className = "bn-main";
    mainWrap.id = "bn-main-content";
    appRow.appendChild(mainWrap);

    /* Header panel */
    var headerWrap = document.createElement("div");
    headerWrap.className = "bn-header-panel";
    mainWrap.appendChild(headerWrap);

    /* Page title row – styled as DynamicPageTitle */
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
      '<div class="bn-kpi-scroll-inner" style="display:flex;align-items:center;position:relative;width:100%;max-width:100%;overflow:hidden;">',
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
    requestAnimationFrame(function () {
      _updateKpiScroll();
      var scroller = document.getElementById("bn-kpi-tiles-scroll");
      if (scroller) {
        scroller.addEventListener("scroll", _updateKpiScroll);
      }
      document.addEventListener("click", function (e) {
        var tile = e.target.closest(".bn-kpi-tile");
        if (!tile) { return; }
        var key = tile.getAttribute("data-key");
        if (key === "orders")         { e.stopImmediatePropagation(); e.preventDefault(); setTimeout(function(){ window.location.replace(window.location.href.replace(/\/[^\/]*\/[^\/]*$/, "/index.html")); }, 0); return; }
        if (key === "itemsToConfirm") { e.stopImmediatePropagation(); e.preventDefault(); setTimeout(function(){ window.location.replace(window.location.href.replace(/\/[^\/]*\/[^\/]*$/, "/OC-Joule-Demo/index.html")); }, 0); return; }
        if (!scroller) { return; }
        scroller.querySelectorAll(".bn-kpi-tile.active").forEach(function (t) { t.classList.remove("active"); });
        tile.classList.add("active");
      }, true); // capturing phase — fires before SAPUI5 UIArea handler
      if (window.ResizeObserver) {
        new ResizeObserver(_updateKpiScroll)
          .observe(document.getElementById("bn-kpi-tiles-scroll"));
      } else {
        window.addEventListener("resize", _updateKpiScroll);
      }
    });

    /* Filter bar */
    var filterWrap = document.createElement("div");
    filterWrap.id = "bn-filter-wrap";
    headerWrap.appendChild(filterWrap);
    oFilterBar.placeAt(filterWrap);

    /* Action buttons — injected into .bn-filter-fields as last item */
    var filterFooter = document.createElement("div");
    filterFooter.className = "bn-filter-footer";
    filterFooter.innerHTML =
      '<div class="bn-filter-actions">' +
        '<button class="bn-action-btn bn-action-emphasized" onclick="window._bnApplyFilters&&window._bnApplyFilters()">Apply</button>' +
        '<button class="bn-action-btn bn-action-default" onclick="window._bnClearFilters&&window._bnClearFilters()">Clear</button>' +
        '<button class="bn-action-btn bn-action-transparent" onclick="sap.ui.require([\'sap/m/MessageToast\'],function(T){T.show(\'Adapt Filters\');})">Adapt Filters</button>' +
      '</div>';
    setTimeout(function () {
      var oFields = filterWrap.querySelector(".bn-filter-fields");
      if (oFields) { oFields.appendChild(filterFooter); }
      else { filterWrap.appendChild(filterFooter); }
    }, 0);

    /* Collapse + Pin buttons — absolute, centered on the bottom edge of the header panel */
    var collapseBtn = document.createElement("button");
    collapseBtn.id = "bn-collapse-btn";
    collapseBtn.className = "bn-indication-btn";
    collapseBtn.title = "Collapse filter bar";
    collapseBtn.setAttribute("onclick", "window._bnToggleFilters&&window._bnToggleFilters()");
    collapseBtn.innerHTML = '<span id="bn-collapse-icon">' + _bnIcon("slim-arrow-up") + '</span>';
    headerWrap.appendChild(collapseBtn);

    var pinBtn = document.createElement("button");
    pinBtn.id = "bn-pin-btn";
    pinBtn.className = "bn-indication-btn";
    pinBtn.title = "Pin filter bar";
    pinBtn.setAttribute("onclick", "window._bnTogglePin&&window._bnTogglePin()");
    pinBtn.innerHTML = '<span id="bn-pin-icon">' + _bnIcon("pushpin-off") + '</span>';
    headerWrap.appendChild(pinBtn);

    /* Gap between header and table */
    var gapDiv = document.createElement("div");
    gapDiv.className = "bn-content-gap";
    mainWrap.appendChild(gapDiv);

    /* Table content area */
    var contentWrap = document.createElement("div");
    contentWrap.className = "bn-content sapUiSizeCompact";
    mainWrap.appendChild(contentWrap);
    oTable.placeAt(contentWrap);
    oTable.setModel(oModel, "orders");

    /* Joule panel wrapper – hidden by default, shown on icon click */
    var jouleWrap = document.createElement("div");
    jouleWrap.style.cssText = "display:none;flex-shrink:0;box-sizing:border-box;align-self:flex-end;height:calc(100% - 16px);border-radius:16px 16px 0 0;overflow:hidden;border-left:1px solid #C0B1FF;box-shadow:0 0 2px 0 rgba(93,54,255,0.16),0 4px 8px 0 rgba(93,54,255,0.16);";
    appRow.appendChild(jouleWrap);
    oJoulePanel.placeAt(jouleWrap);
  });
});
