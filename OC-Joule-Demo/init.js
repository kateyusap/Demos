sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Sorter",
  "sap/m/Table",
  "sap/m/Column",
  "sap/m/ColumnListItem",
  "sap/m/GroupHeaderListItem",
  "sap/m/Text",
  "sap/m/Link",
  "sap/m/Title",
  "sap/m/Toolbar",
  "sap/m/ToolbarSpacer",
  "sap/m/Button",
  "sap/m/Popover",
  "sap/m/List",
  "sap/m/StandardListItem",
  "sap/m/VBox",
  "sap/m/Label",
  "sap/m/MenuButton",
  "sap/m/Menu",
  "sap/m/MenuItem",
  "sap/m/MessageToast",
  "sap/m/ObjectStatus",
  "sap/m/Input",
  "sap/m/MultiInput",
  "sap/m/Token"
], function (
  JSONModel, Sorter,
  Table, Column, ColumnListItem, GroupHeaderListItem,
  Text, Link, Title,
  Toolbar, ToolbarSpacer,
  Button,
  Popover, List, StandardListItem,
  VBox, Label,
  MenuButton, Menu, MenuItem,
  MessageToast,
  ObjectStatus,
  Input,
  MultiInput, Token
) {
  "use strict";

  /* ────────────────────────────────────────────────────────────
     SAP ICON HELPER  — renders a named SAP icon via icon font
  ──────────────────────────────────────────────────────────── */
  function _ocIcon(name, size, extraStyle) {
    var sz = size || 16;
    var info = sap.ui.core.IconPool.getIconInfo("sap-icon://" + name);
    var char = info ? info.content : "";
    var base = "font-family:'SAP-icons';speak:none;font-style:normal;font-weight:normal;"
             + "font-size:" + sz + "px;width:" + sz + "px;height:" + sz + "px;"
             + "display:inline-flex;align-items:center;justify-content:center;line-height:1;";
    return '<span style="' + base + (extraStyle || "") + '">' + char + '</span>';
  }

  /* ────────────────────────────────────────────────────────────
     GLOBAL STYLES  (shell + sidebar identical to ASN)
  ──────────────────────────────────────────────────────────── */
  var oStyleEl = document.createElement("style");
  oStyleEl.textContent = `
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
      z-index:100;position:relative;box-sizing:border-box;
    }
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

    /* ── App layout ── */
    .bn-app{display:flex;flex:1;min-height:0;overflow:hidden;}

    /* ── Side Nav ── */
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

    /* ── Main content ── */
    .bn-main{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#f5f6f7;min-width:0;}

    /* ── Header panel ── */
    .bn-header-panel{background:#fff;box-shadow:0 2px 2px rgba(85,107,130,.05);position:relative;overflow:visible;flex-shrink:0;}
    .bn-header-panel::after{content:"";display:block;position:absolute;left:0;right:0;bottom:0;height:1px;background:#d9d9d9;}
    .bn-page-title-row{display:flex;align-items:baseline;padding:24px 16px 16px 16px;}
    .bn-page-title{font-family:"72","72full",Arial,sans-serif;font-size:2rem;font-weight:700;color:#000;line-height:1.2;}
    .bn-indication-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;background:#fff;border:1px solid #bcc3ca;border-radius:8px;cursor:pointer;padding:0;position:absolute;bottom:-12px;z-index:5;}
    .bn-indication-btn:hover{background:#f5f5f5;}
    #oc-collapse-btn{left:50%;margin-left:-24px;}
    #oc-pin-btn{left:50%;margin-left:4px;}

    /* ── KPI tiles ── */
    .bn-kpi-row{padding:0 0 16px 0;position:relative;overflow:hidden;}
    .bn-kpi-row-header{display:flex;align-items:center;justify-content:flex-end;padding:4px 16px 4px 16px;min-height:28px;}
    .bn-manage-tiles-link{font-size:14px;font-weight:400;color:#0064d9;text-decoration:none;cursor:pointer;white-space:nowrap;}
    .bn-manage-tiles-link:hover{text-decoration:underline;}
    .bn-kpi-scroll-inner{display:flex;align-items:center;position:relative;width:100%;overflow:hidden;}
    .bn-kpi-scroll-btn{position:absolute;z-index:2;background:#fff;border:1px solid #d9d9d9;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,.15);}
    .bn-kpi-scroll-btn.prev{left:0px;}
    .bn-kpi-scroll-btn.next{right:0px;}
    .bn-kpi-scroll-btn:hover{background:#f5f5f5;}
    .bn-kpi-tiles{display:flex;gap:12px;overflow-x:scroll;flex:1;padding:4px 16px;box-sizing:border-box;scroll-behavior:smooth;scrollbar-width:none;}
    .bn-kpi-tiles::-webkit-scrollbar{display:none;}
    .bn-kpi-tile{width:176px;min-width:176px;flex-shrink:0;background:#fff;border-radius:16px;box-shadow:0 0 2px rgba(34,53,72,.2),0 2px 4px rgba(34,53,72,.2);display:flex;flex-direction:column;padding:16px;cursor:pointer;box-sizing:border-box;border-bottom:4.5px solid transparent;transition:box-shadow .15s;height:172px;}
    .bn-kpi-tile:hover{box-shadow:0 4px 12px rgba(34,53,72,.25);}
    .bn-kpi-tile.active{border-bottom:4.5px solid #0070f2;}
    .bn-kpi-value{font-size:36px;font-weight:300;color:#256f3a;line-height:1;margin-top:auto;padding-top:8px;}
    .bn-kpi-title{font-size:14px;font-weight:700;color:#1d2d3e;line-height:18px;}
    .bn-kpi-sub{font-size:14px;font-weight:400;color:#556b82;line-height:18px;}

    /* ── Filter bar ── */
    .bn-filter-bar{padding:8px 16px 16px 16px;}
    .bn-filter-fields{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;width:100%;box-sizing:border-box;margin-bottom:4px;}
    .bn-filter-field{display:flex;flex-direction:column;gap:5px;width:223px;flex-shrink:0;padding-bottom:3px;box-sizing:border-box;}
    .bn-filter-label{font-family:"72","72full",Arial,sans-serif;font-size:12px;color:#556b82;white-space:nowrap;}
    .bn-filter-footer{display:flex;justify-content:flex-end;align-items:flex-end;margin-left:auto;padding-bottom:3px;}
    .bn-filter-actions{display:flex;gap:8px;align-items:center;}
    .bn-action-btn{height:26px;padding:0 8px;border-radius:8px;font-family:"72","72full",Arial,sans-serif;font-size:14px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;}
    .bn-action-emphasized{background:#0070f2;border:1px solid #0070f2;color:#fff;font-weight:700;}
    .bn-action-emphasized:hover{background:#0064d9;}
    .bn-action-default{background:#fff;border:1px solid #bcc3ca;color:#0064d9;font-weight:600;}
    .bn-action-default:hover{background:#f5f5f5;}
    .bn-action-transparent{background:transparent;border:1px solid transparent;color:#0064d9;font-weight:600;}
    .bn-action-transparent:hover{background:#f5f5f5;}
    .bn-filter-input{height:1.75rem;width:100%;border:1px solid #bcc3ca;border-radius:.25rem;padding:0 .5rem;font-size:.75rem;font-family:inherit;outline:none;box-sizing:border-box;}
    .bn-filter-input:hover{border-color:#8696a9;}
    .bn-filter-input:focus{border-color:#0070f2;box-shadow:0 0 0 2px rgba(0,112,242,.12);}

    /* ── Text input (UI5 Horizon) ── */
    .bn-filter-text{height:1.75rem;width:100%;background:#fff;background-image:linear-gradient(0deg,#556b81,#556b81);background-repeat:no-repeat;background-size:100% .0625rem;background-position:0 100%;border:none;border-radius:.25rem;box-shadow:inset 0 0 0 .0625rem rgba(85,107,129,0.25);padding:0 .625rem;font-size:.875rem;font-family:"72","72full",Arial,sans-serif;outline:none;box-sizing:border-box;color:#131e29;}
    .bn-filter-text::placeholder{color:#556b82;font-style:italic;}
    .bn-filter-text:hover{background-image:linear-gradient(0deg,#0064d9,#0064d9);box-shadow:inset 0 0 0 .0625rem rgba(79,160,255,0.5);}
    .bn-filter-text:focus{background-image:linear-gradient(0deg,#0032a5,#0032a5);box-shadow:inset 0 0 0 .0625rem rgba(79,160,255,0.5),0 0 0 .125rem #0032a5;}

    /* ── Date picker control ── */
    .bn-filter-date-wrap{position:relative;width:100%;}
    .bn-filter-date{height:1.75rem;width:100%;border:1px solid #bcc3ca;border-radius:.25rem;padding:0 2rem 0 .5rem;font-size:.75rem;font-family:"72","72full",Arial,sans-serif;outline:none;box-sizing:border-box;background:#fff;color:#1d2d3e;cursor:pointer;}
    .bn-filter-date:hover{border-color:#8696a9;}
    .bn-filter-date:focus{border-color:#0070f2;box-shadow:0 0 0 2px rgba(0,112,242,.12);}
    .bn-filter-date.bn-filter-date-empty{color:transparent;}
    .bn-filter-date.bn-filter-date-empty:focus{color:#1d2d3e;}
    .bn-filter-date::-webkit-calendar-picker-indicator{opacity:0;position:absolute;right:0;width:36px;height:100%;cursor:pointer;}
    .bn-filter-date-icon{position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center;}
    .bn-filter-date-ph{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;font-family:"72","72full",Arial,sans-serif;color:#8c9bac;pointer-events:none;white-space:nowrap;}
    .bn-filter-date:not(.bn-filter-date-empty) ~ .bn-filter-date-ph{display:none;}

    /* ── Italic placeholders (all inputs) ── */
    input::placeholder,.sapMInputBaseInner::placeholder,.sapMMultiInputInputContainer input::placeholder{font-style:italic;}

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
    .bn-link{color:#0064d9;cursor:pointer;text-decoration:none;}
    .bn-link:hover{text-decoration:underline;}
    .bn-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;background:#e8f3ff;color:#0064d9;}

    /* ── Joule Panel ── */
    .bn-joule-wrap{display:flex;flex-direction:column;width:416px;min-width:416px;flex-shrink:0;height:100%;border-radius:16px 16px 0 0;box-shadow:-4px 0 16px rgba(91,115,139,.12);overflow:hidden;background:#fff;}
    .bn-joule{width:416px;min-width:416px;display:flex;flex-direction:column;background:#fff;flex-shrink:0;height:100%;border-radius:16px 16px 0 0;overflow:hidden;}
    .bn-joule-header{background:linear-gradient(180deg,#5d36ff 0%,#6431fa 100%);height:56px;min-height:56px;display:flex;align-items:center;padding:0 8px;flex-shrink:0;border-radius:16px 16px 0 0;}
    .bn-joule-header-title{display:flex;align-items:center;gap:0;flex:1;padding-left:4px;}
    .bn-joule-title{font-family:"72","72full",Arial,sans-serif;font-size:16px;font-weight:700;color:#fff;white-space:nowrap;margin-left:6px;}
    .bn-joule-toolbar{display:flex;align-items:center;gap:4px;padding:10px 8px 10px 0;}
    .bn-joule-hbtn{display:flex;align-items:center;justify-content:center;min-height:36px;padding:10px;border-radius:8px;border:1px solid transparent;background:transparent;cursor:pointer;flex-shrink:0;}
    .bn-joule-hbtn:hover{background:rgba(255,255,255,.15);}
    .bn-joule-body{flex:1;overflow-y:auto;background:#f7f7f7;display:flex;flex-direction:column;}
    .bn-joule-content{display:flex;flex-direction:column;gap:16px;padding:16px;box-sizing:border-box;width:100%;margin-top:auto;}
    .bn-joule-time{font-family:"72","72full",Arial,sans-serif;font-size:12px;color:#8396a8;text-align:center;width:100%;line-height:20px;}
    .bn-joule-bubble{background:#eff1f2;border:1px solid #eff1f2;border-radius:0 8px 8px 8px;padding:8px 16px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:21px;align-self:flex-start;max-width:352px;min-height:37px;}
    .bn-joule-dots{display:flex;align-items:center;gap:5px;padding:4px 0;}
    .bn-joule-dot{width:7px;height:7px;border-radius:50%;background:#8396a8;animation:bnDotBounce 1.2s infinite ease-in-out;}
    .bn-joule-dot:nth-child(2){animation-delay:.2s;}
    .bn-joule-dot:nth-child(3){animation-delay:.4s;}
    @keyframes bnDotBounce{0%,60%,100%{transform:translateY(0);opacity:.4;}30%{transform:translateY(-5px);opacity:1;}}
    .bn-joule-user-bubble{align-self:flex-end;background:#5d36ff;color:#fff;border-radius:8px 0 8px 8px;padding:8px 14px;font-family:"72","72full",Arial,sans-serif;font-size:14px;line-height:21px;max-width:300px;word-wrap:break-word;}
    .bn-joule-footer{background:#fff;flex-shrink:0;padding:16px 16px 0 16px;display:flex;align-items:flex-end;justify-content:center;}
    .bn-joule-input-wrap{display:flex;align-items:flex-end;gap:4px;flex:1;min-height:40px;padding:4px 8px;border:2px solid #0064d8;border-radius:4px;background:#fff;box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);box-sizing:border-box;}
    .bn-joule-input-text{display:flex;align-items:center;flex:1;padding:5px 8px 7px 8px;position:relative;min-width:0;}
    .bn-joule-cursor{position:absolute;left:7px;top:3px;width:1px;height:18px;background:#223548;}
    .bn-joule-input{flex:1;border:none;outline:none;background:transparent;font-family:"72","72full",Arial,sans-serif;font-size:14px;font-style:italic;color:#556b82;padding:0;transition:color .15s,font-style .15s;}
    .bn-joule-input.has-text{font-style:normal;color:#1d2d3e;}
    .bn-joule-send{width:28px;height:28px;min-width:28px;border-radius:24px;background:#0070f2;border:1px solid #0070f2;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:.4;flex-shrink:0;transition:opacity .15s;}
    .bn-joule-send:hover{opacity:1;}
    .bn-joule-send.active{opacity:1;}
    .bn-joule-disclaimer{background:#fff;flex-shrink:0;padding:6px 16px 14px 16px;font-family:"72","72full",Arial,sans-serif;font-size:10px;color:#32363a;line-height:14px;text-align:left;}
    .bn-joule-chips{display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start;width:100%;}
    .bn-joule-chip{background:#fff;border:none;border-radius:16px;padding:4px 12px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#0064d9;line-height:20px;cursor:pointer;white-space:nowrap;box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);transition:background .15s,box-shadow .15s;}
    .bn-joule-chip:hover{background:#e8f4ff;}

    /* ── Joule Welcome screen ── */
    .bn-joule-welcome{display:flex;flex-direction:column;flex-shrink:0;width:100%;position:relative;overflow:hidden;}
    .bn-joule-welcome-hero{width:100%;height:408px;flex-shrink:0;position:relative;background:linear-gradient(180deg,#6135fe 0%,#a100c2 100%);overflow:hidden;}
    .bn-joule-welcome-text{position:absolute;bottom:32px;left:16px;right:16px;}
    .bn-joule-welcome-hello{font-family:"72","72full",Arial,sans-serif;font-size:20px;font-weight:300;color:#fff;line-height:30px;margin-bottom:2px;}
    .bn-joule-welcome-tagline{font-family:"72","72full",Arial,sans-serif;font-size:42px;font-weight:300;color:#fff;line-height:56px;letter-spacing:-1px;margin-bottom:12px;white-space:nowrap;}
    .bn-joule-welcome-hint{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:0 8px 8px 8px;padding:8px 16px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#fff;line-height:20px;max-width:384px;}
    .bn-joule-welcome-chips{background:#f7f7f7;padding:16px;display:flex;flex-direction:column;gap:8px;}
    .bn-joule-welcome-chips-label{font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#1d2d3e;font-weight:600;background:#eff1f2;border:1px solid #eff1f2;border-radius:0 8px 8px 8px;padding:8px 12px;display:inline-block;margin-bottom:4px;}
    .bn-joule-welcome-chips-row{display:flex;flex-wrap:wrap;gap:8px;}
    .bn-joule-welcome-chip{background:#fff;border-radius:16px;padding:4px 12px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#0064d9;line-height:20px;border:none;cursor:pointer;box-shadow:0 0 2px rgba(27,144,255,.16),0 4px 8px rgba(27,144,255,.16);}
    .bn-joule-welcome-chip:hover{background:#f0f7ff;}

    /* ── Joule welcome icon ── */
    .bn-joule-welcome-icon{position:absolute;top:54px;left:50%;transform:translateX(-50%);width:120px;height:120px;}
    .bn-joule-welcome-icon img,.bn-joule-welcome-icon svg{width:100%;height:100%;}
    @keyframes bn-star-flash{
      0%,100%{opacity:1;}
      40%{opacity:.15;}
      70%{opacity:.8;}
    }
    @keyframes bnJouleFadeIn{0%{opacity:0;}70%{opacity:.8;}100%{opacity:1;}}
    #oc-joule-word{display:inline-block;transition:opacity .35s ease,transform .35s ease;}
    #oc-joule-word.fade{opacity:0;transform:translateY(8px);}

    /* ── Joule typewriter ── */
    .bn-joule-caret{display:inline-block;width:2px;height:14px;background:#5d36ff;margin-left:2px;vertical-align:middle;animation:bnCaretBlink .8s steps(1) infinite;}
    @keyframes bnCaretBlink{0%,100%{opacity:1;}50%{opacity:0;}}
    .bn-joule-typing{background:linear-gradient(90deg,#1d2d3e 0%,#5d36ff 50%,#1d2d3e 100%);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:bnShimmer 1.6s linear infinite;}
    @keyframes bnShimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}

    /* ── Joule loading screen ── */
    .bn-joule-loader{position:absolute;inset:0;border-radius:16px;background:linear-gradient(180deg,#6135fe 0%,#a100c2 100%);display:flex;align-items:center;justify-content:center;z-index:20;transition:opacity .4s ease;}
    .bn-joule-loader.fade-out{opacity:0;pointer-events:none;}
    .bn-joule-loader-grid{display:grid;grid-template-columns:repeat(3,18px);gap:14px;}
    .bn-joule-loader-dot{width:16px;height:16px;border-radius:50%;background:#fff;animation:bnLoaderPulse 1.4s ease-in-out infinite;}
    @keyframes bnLoaderPulse{0%,100%{opacity:.2;transform:scale(.7);}50%{opacity:1;transform:scale(1);}}

    /* ── Joule result card ── */
    .bn-joule-result-card{align-self:flex-start;background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;width:100%;box-shadow:0 0 2px rgba(91,115,139,.16),0 4px 8px rgba(91,115,139,.16);font-family:"72","72full",Arial,sans-serif;font-size:13px;color:#1d2d3e;}
    .bn-joule-card-header{background:#f0eeff;padding:8px 12px;font-size:12px;font-weight:700;color:#5d36ff;border-bottom:1px solid #e0d9ff;display:flex;align-items:center;gap:6px;}
    .bn-joule-card-header-dot{width:6px;height:6px;border-radius:50%;background:#5d36ff;}
    .bn-joule-card-row{display:grid;grid-template-columns:90px 1fr 90px;gap:0;padding:7px 12px;border-bottom:1px solid #eef1f4;align-items:start;}
    .bn-joule-card-row:last-child{border-bottom:none;}
    .bn-joule-card-row:hover{background:#f7f9fb;}
    .bn-joule-card-order{font-size:13px;font-weight:700;color:#0064d9;text-decoration:none;cursor:pointer;white-space:nowrap;}
    .bn-joule-card-order:hover{text-decoration:underline;}
    .bn-joule-card-desc{font-size:12px;color:#556b82;padding:0 8px;line-height:18px;}
    .bn-joule-card-ship{font-size:12px;color:#1d2d3e;text-align:right;white-space:nowrap;}
    .bn-joule-card-footer{padding:8px 12px;background:#f7f9fb;font-size:12px;color:#556b82;border-top:1px solid #eef1f4;}
    .bn-joule-card-col-label{font-size:11px;color:#8396a8;font-weight:700;letter-spacing:.02em;}
    .bn-joule-confirm-label{display:inline-block;background:#e8f5e9;color:#256f3a;font-size:11px;font-weight:700;border-radius:4px;padding:1px 6px;white-space:nowrap;}

    /* ── Joule option buttons ── */
    .bn-joule-options{display:flex;flex-direction:column;gap:8px;align-self:flex-start;width:100%;}
    .bn-joule-option-btn{display:flex;align-items:flex-start;gap:10px;background:#fff;border:1.5px solid #bcc3ca;border-radius:8px;padding:10px 14px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:18px;cursor:pointer;text-align:left;transition:border-color .15s,background .15s,box-shadow .15s;box-shadow:0 0 2px rgba(27,144,255,.08),0 2px 4px rgba(27,144,255,.08);}
    .bn-joule-option-btn:hover{border-color:#5d36ff;background:#f0eeff;box-shadow:0 0 0 2px rgba(93,54,255,.12);}
    .bn-joule-option-btn:active{background:#e4d9ff;}
    .bn-joule-option-btn:disabled{opacity:.45;cursor:default;pointer-events:none;}
    .bn-joule-option-num{min-width:20px;height:20px;line-height:20px;border-radius:50%;background:#5d36ff;color:#fff;font-size:11px;font-weight:700;text-align:center;flex-shrink:0;margin-top:1px;}

    /* ── Joule guide + status ── */
    .bn-joule-guide{align-self:flex-start;background:#eff1f2;border:1px solid #eff1f2;border-radius:0 8px 8px 8px;padding:12px 16px;font-family:"72","72full",Arial,sans-serif;font-size:14px;color:#1d2d3e;line-height:22px;max-width:352px;}
    .bn-joule-guide-q{margin:10px 0 10px 0;font-size:14px;color:#1d2d3e;font-weight:600;}
    .bn-joule-status{align-self:flex-start;display:flex;align-items:center;gap:8px;font-family:"72","72full",Arial,sans-serif;font-size:13px;color:#556b82;font-style:italic;padding:4px 0;}
    .bn-joule-status-spinner{width:14px;height:14px;border-radius:50%;border:2px solid #e0d9ff;border-top-color:#5d36ff;animation:bnSpin .7s linear infinite;flex-shrink:0;}
    @keyframes bnSpin{to{transform:rotate(360deg);}}
    .oc-cust-header .sapMGHLITitle{padding-left:.6rem;}
    .oc-cust-row td.sapMListTblCell:first-child, .oc-cust-row td.sapMListTblNavCol{padding-left:.6rem;}
  `;
  document.head.appendChild(oStyleEl);

  /* ────────────────────────────────────────────────────────────
     STATIC DATA
  ──────────────────────────────────────────────────────────── */
  var SRC = [
    /* ── Week Mar 25–31 : Best Run Buyer (4 lines) ── */
    { orderNumber:"4500123401", lineNumber:"10", custPartNumber:"BRB-SF-001", supplier:"Best Run Buyer",  needByDate:"2026-03-25", estDelivery:"2026-03-25", reqQty:50,  qtyToConfirm:50,  description:"Steel Frame",      reqUnitPrice:320.00,  confUnitPrice:320.00,  currency:"USD" },
    { orderNumber:"4500123401", lineNumber:"20", custPartNumber:"BRB-GU-002", supplier:"Best Run Buyer",  needByDate:"2026-03-26", estDelivery:"2026-03-26", reqQty:25,  qtyToConfirm:25,  description:"Gear Unit",        reqUnitPrice:750.00,  confUnitPrice:745.00,  currency:"USD" },
    { orderNumber:"4500123402", lineNumber:"10", custPartNumber:"BRB-MD-003", supplier:"Best Run Buyer",  needByDate:"2026-03-28", estDelivery:"2026-03-27", reqQty:10,  qtyToConfirm:10,  description:"Motor Drive",      reqUnitPrice:1200.00, confUnitPrice:1200.00, currency:"USD" },
    { orderNumber:"4500123402", lineNumber:"20", custPartNumber:"BRB-CP-004", supplier:"Best Run Buyer",  needByDate:"2026-03-28", estDelivery:"2026-03-28", reqQty:5,   qtyToConfirm:5,   description:"Control Panel",    reqUnitPrice:4500.00, confUnitPrice:4450.00, currency:"USD" },
    /* ── Week Mar 25–31 : Acme Corp (2 lines) ── */
    { orderNumber:"4500123403", lineNumber:"10", custPartNumber:"ACM-LK-010", supplier:"Acme Corp",       needByDate:"2026-03-31", estDelivery:"2026-03-30", reqQty:100, qtyToConfirm:100, description:"Lighting Kit",     reqUnitPrice:85.00,   confUnitPrice:82.00,   currency:"USD" },
    { orderNumber:"4500123403", lineNumber:"20", custPartNumber:"ACM-CA-011", supplier:"Acme Corp",       needByDate:"2026-03-31", estDelivery:"2026-03-31", reqQty:200, qtyToConfirm:200, description:"Cable Assembly",   reqUnitPrice:12.50,   confUnitPrice:12.50,   currency:"USD" },
    /* ── Week Apr 1–7 : Best Run Buyer (3 lines) ── */
    { orderNumber:"4500123404", lineNumber:"10", custPartNumber:"BRB-VS-020", supplier:"Best Run Buyer",  needByDate:"2026-04-01", estDelivery:"2026-03-31", reqQty:40,  qtyToConfirm:40,  description:"Valve Set",        reqUnitPrice:280.00,  confUnitPrice:280.00,  currency:"EUR" },
    { orderNumber:"4500123404", lineNumber:"20", custPartNumber:"BRB-SK-021", supplier:"Best Run Buyer",  needByDate:"2026-04-02", estDelivery:"2026-04-02", reqQty:80,  qtyToConfirm:75,  description:"Seal Kit",         reqUnitPrice:45.00,   confUnitPrice:45.00,   currency:"EUR" },
    { orderNumber:"4500123404", lineNumber:"30", custPartNumber:"BRB-NH-022", supplier:"Best Run Buyer",  needByDate:"2026-04-03", estDelivery:"2026-04-03", reqQty:20,  qtyToConfirm:18,  description:"Network HW",       reqUnitPrice:950.00,  confUnitPrice:950.00,  currency:"USD" },
    /* ── Week Apr 1–7 : Acme Corp (2 lines) ── */
    { orderNumber:"4500123405", lineNumber:"10", custPartNumber:"ACM-SU-030", supplier:"Acme Corp",       needByDate:"2026-04-04", estDelivery:"2026-04-03", reqQty:3,   qtyToConfirm:3,   description:"Server Unit",      reqUnitPrice:8200.00, confUnitPrice:8200.00, currency:"USD" },
    { orderNumber:"4500123405", lineNumber:"20", custPartNumber:"ACM-BR-031", supplier:"Acme Corp",       needByDate:"2026-04-04", estDelivery:"2026-04-04", reqQty:60,  qtyToConfirm:60,  description:"Bracket Set",      reqUnitPrice:38.00,   confUnitPrice:37.50,   currency:"EUR" },
    /* ── Week Apr 1–7 : Initech GmbH (2 lines) ── */
    { orderNumber:"4500123406", lineNumber:"10", custPartNumber:"INT-PH-040", supplier:"Initech GmbH",    needByDate:"2026-04-06", estDelivery:"2026-04-05", reqQty:15,  qtyToConfirm:15,  description:"Pump Housing",     reqUnitPrice:640.00,  confUnitPrice:635.00,  currency:"EUR" },
    { orderNumber:"4500123406", lineNumber:"20", custPartNumber:"INT-SB-041", supplier:"Initech GmbH",    needByDate:"2026-04-07", estDelivery:"2026-04-07", reqQty:30,  qtyToConfirm:30,  description:"Support Bracket",  reqUnitPrice:155.00,  confUnitPrice:155.00,  currency:"EUR" },
    /* ── Week Apr 8–14 : Initech GmbH (1 line — escalation candidate) ── */
    { orderNumber:"4500123408", lineNumber:"10", custPartNumber:"INT-BS-050", supplier:"Initech GmbH",    needByDate:"2026-04-10", estDelivery:"2026-04-14", reqQty:60,  qtyToConfirm:60,  description:"Bracket Set",      reqUnitPrice:38.00,   confUnitPrice:40.00,   currency:"EUR" }
  ];

  var _filtered = SRC.slice();

  /* ── SAPUI5 Table (built once, placed in loadOCPage) ── */
  var oOCModel = new JSONModel({ items: SRC });

  var oOCTableTitle = new Title({
    text: "Items to Confirm (" + SRC.length + ")",
    level: "H3", titleStyle: "H4"
  });

  /* ── Group Popover ── */
  /* ─────────────────────────────────────────────────────────────
     GROUP POPOVER
     State:
       _activeGroupKey        — primary key applied to the table ("needby-weekly" default)
       _activeSecondaryKey    — secondary key applied to the table (null = none applied)
       _jouleSecondaryKey     — secondary key Joule suggested (shown in popover, not yet applied)
  ──────────────────────────────────────────────────────────── */
  var _activeGroupKey     = "needby-weekly";
  var _activeSecondaryKey = null;   /* currently applied secondary (null = primary only) */
  var _jouleSecondaryKey  = null;   /* suggested by Joule — shown unselected until user picks */

  /* ── Primary list — one item (the active primary), always selected ── */
  var _groupPrimaryItem = new StandardListItem({
    title: "Delivery Date \u2014 Weekly",
    info:  "Mon\u2013Sun buckets",
    type:  "Active",
    selected: true,
    customData: [ new sap.ui.core.CustomData({ key: "gk", value: "needby-weekly" }) ]
  });

  var _groupPrimaryList = new List({
    mode: "SingleSelectMaster",
    showSeparators: "None",
    showNoData: false,
    items: [ _groupPrimaryItem ]
    /* primary is fixed in this demo — no selectionChange needed */
  });

  /* ── Secondary list — hidden until Joule suggests one ── */
  var _groupSecondaryItem = null;   /* created lazily when Joule unlocks secondary */

  var _groupSecondaryList = new List({
    mode: "SingleSelectMaster",
    showSeparators: "None",
    showNoData: false,
    items: [],
    selectionChange: function (oEvent) {
      var item = oEvent.getParameter("listItem");
      var key  = item.getCustomData()[0].getValue();
      _activeSecondaryKey = key;
      _groupPopover.close();
      _applyTableGrouping();
    }
  });

  var _groupSecondarySection = new VBox({
    visible: false,
    items: [
      new Label({ text: "Secondary" })
        .addStyleClass("sapUiTinyMarginBeginEnd sapUiTinyMarginTop sapMH6Style"),
      _groupSecondaryList
    ]
  });

  var _groupPopover = new Popover({
    title:        "Group",
    placement:    "Bottom",
    showHeader:   true,
    contentWidth: "300px",
    content: [
      new VBox({
        items: [
          new Label({ text: "Primary" })
            .addStyleClass("sapUiTinyMarginBeginEnd sapUiTinyMarginTop sapMH6Style"),
          _groupPrimaryList,
          _groupSecondarySection
        ]
      })
    ]
  });

  /* ── Apply current grouping state to table ── */
  var _PAGE_SIZE = 10;

  function _applyTableGrouping() {
    if (!oOCTable) return;

    var data = oOCModel.getProperty("/items") || [];

    function _makeRow(o) {
      var fmt = function (p, c) { return p != null ? p.toFixed(2) + "\u00a0" + (c || "") : ""; };
      return new ColumnListItem({
        type: "Navigation",
        press: function () { MessageToast.show("Order: " + o.orderNumber); },
        cells: [
          new Link({ text: o.orderNumber, press: function () { MessageToast.show("Order: " + o.orderNumber); } }),
          new Text({ text: o.lineNumber,     wrapping: false }),
          new Text({ text: o.custPartNumber, wrapping: false }),
          new Text({ text: o.supplier,       wrapping: false }),
          new Text({ text: o.needByDate,     wrapping: false }),
          new Text({ text: o.estDelivery,    wrapping: false }),
          new Text({ text: String(o.reqQty),        wrapping: false }),
          new Text({ text: String(o.qtyToConfirm),  wrapping: false }),
          new Text({ text: o.description,    wrapping: false }),
          new Text({ text: fmt(o.reqUnitPrice,  o.currency), wrapping: false }),
          new Text({ text: fmt(o.confUnitPrice, o.currency), wrapping: false })
        ]
      });
    }

    /* ── Clear table, disable native growing (we handle it manually) ── */
    oOCTable.setGrowing(false);
    oOCTable.unbindItems();
    oOCTable.removeAllItems();

    /* ── Build full flat item list (group headers + data rows) ── */
    var allItems   = []; /* { item: ListItem, isDataRow: bool } */

    if (_activeSecondaryKey === "customer") {
      /* Two-level: Week → Customer */
      var sorted = data.slice().sort(function (a, b) {
        if (a.needByDate  < b.needByDate)  return -1;
        if (a.needByDate  > b.needByDate)  return  1;
        if ((a.supplier||"") < (b.supplier||"")) return -1;
        if ((a.supplier||"") > (b.supplier||"")) return  1;
        return 0;
      });

      var weeks = [];
      sorted.forEach(function (o) {
        var wk   = _weekLabel(o.needByDate);
        var week = weeks.find(function (w) { return w.weekKey === wk; });
        if (!week) { week = { weekKey: wk, customers: [] }; weeks.push(week); }
        var cust = week.customers.find(function (c) { return c.name === (o.supplier || "Unknown"); });
        if (!cust) { cust = { name: o.supplier || "Unknown", rows: [] }; week.customers.push(cust); }
        cust.rows.push(o);
      });

      weeks.forEach(function (week) {
        var weekCount = week.customers.reduce(function (n, c) { return n + c.rows.length; }, 0);
        var weekHeader = new GroupHeaderListItem({ title: week.weekKey, count: String(weekCount), upperCase: false });
        allItems.push({ item: weekHeader, isDataRow: false, weekHeader: true });

        week.customers.forEach(function (cust) {
          var custRows = cust.rows.map(function (o) {
            var row = _makeRow(o);
            row.addStyleClass("oc-cust-row");
            return { item: row, isDataRow: true, collapsed: false };
          });
          var collapsed = false;
          var custHeader = new GroupHeaderListItem({
            title: "\u25bc\u2002" + cust.name,
            count: String(cust.rows.length),
            upperCase: false,
            type: "Active",
            press: function () {
              collapsed = !collapsed;
              custHeader.setTitle((collapsed ? "\u25b6" : "\u25bc") + "\u2002" + cust.name);
              /* Toggle only rows that are visible due to pagination (not paginated-away rows) */
              custRows.forEach(function (r) {
                r.collapsed = collapsed;
                /* Only affect visibility if row is already paginated-in */
                if (r.paginatedIn) { r.item.setVisible(!collapsed); }
              });
            }
          });
          /* Tag each custRow with its collapse state accessor */
          custRows.forEach(function (r) { r.isCollapsed = function () { return collapsed; }; });
          custHeader.addStyleClass("oc-cust-header");
          allItems.push({ item: custHeader, isDataRow: false, custHeader: true });
          custRows.forEach(function (r) { allItems.push(r); });
        });
      });

    } else {
      /* Primary only: Week */
      var sorted = data.slice().sort(function (a, b) {
        return a.needByDate < b.needByDate ? -1 : a.needByDate > b.needByDate ? 1 : 0;
      });
      var weeks = [];
      sorted.forEach(function (o) {
        var wk   = _weekLabel(o.needByDate);
        var week = weeks.find(function (w) { return w.weekKey === wk; });
        if (!week) { week = { weekKey: wk, rows: [] }; weeks.push(week); }
        week.rows.push(o);
      });
      weeks.forEach(function (week) {
        allItems.push({ item: new GroupHeaderListItem({ title: week.weekKey, count: String(week.rows.length), upperCase: false }), isDataRow: false });
        week.rows.forEach(function (o) { allItems.push({ item: _makeRow(o), isDataRow: true }); });
      });
    }

    /* ── Paginate: show exactly _PAGE_SIZE data rows, hide the rest ── */
    var totalDataRows = allItems.filter(function (e) { return e.isDataRow; }).length;
    var visibleCount  = 0;

    allItems.forEach(function (e) {
      if (e.isDataRow) {
        e.paginatedIn = visibleCount < _PAGE_SIZE;
        e.item.setVisible(e.paginatedIn && !(e.isCollapsed && e.isCollapsed()));
        if (e.paginatedIn) visibleCount++;
      } else {
        e.item.setVisible(false); /* headers revealed below */
      }
      oOCTable.addItem(e.item);
    });

    /* Reveal group headers that have ≥1 paginated-in row beneath them */
    var pendingHeaders = [];
    allItems.forEach(function (e) {
      if (!e.isDataRow) {
        pendingHeaders.push(e);
      } else if (e.paginatedIn) {
        pendingHeaders.forEach(function (h) { h.item.setVisible(true); });
        pendingHeaders = [];
      }
    });

    oOCTableTitle.setText("Items to Confirm (" + totalDataRows + ")");
    _renderLoadMoreFooter(allItems, totalDataRows, visibleCount);
    var _tileEl = document.querySelector(".bn-kpi-tile[data-key='itemsToConfirm'] .bn-kpi-value");
    if (_tileEl) { _tileEl.textContent = totalDataRows; }
  }

  function _renderLoadMoreFooter(allItems, total, shown) {
    /* Remove any previous load-more wrap */
    var oldWrap = document.getElementById("oc-load-more-wrap");
    if (oldWrap) { oldWrap.parentNode && oldWrap.parentNode.removeChild(oldWrap); }

    if (shown >= total) return;

    /* Mirror the native UI5 sapMGrowingList trigger DOM structure exactly */
    var wrap = document.createElement("div");
    wrap.id = "oc-load-more-wrap";
    wrap.className = "sapMListUl sapMGrowingList";

    /* Inner trigger row — same classes as native: sapMLIB sapMLIBTypeActive sapMLIBActionable */
    var lib = document.createElement("div");
    lib.className = "sapMLIB sapMLIB-CTX sapMLIBShowSeparator sapMLIBTypeActive sapMLIBActionable sapMLIBHoverable sapMLIBFocusable sapMCLI";
    lib.setAttribute("role", "button");
    lib.setAttribute("tabindex", "0");

    var libContent = document.createElement("div");
    libContent.className = "sapMLIBContent";

    var trigger = document.createElement("div");
    trigger.className = "sapMGrowingListTrigger";

    var titleDiv = document.createElement("div");
    titleDiv.className = "sapMSLIDiv sapMGrowingListTriggerText";
    var titleSpan = document.createElement("span");
    titleSpan.className = "sapMSLITitle";
    titleSpan.textContent = "Load more";
    titleDiv.appendChild(titleSpan);

    var info = document.createElement("div");
    info.className = "sapMGrowingListDescription sapMSLIDescription";
    info.style.display = "block";
    info.textContent = "[ " + shown + " / " + total + " ]";

    trigger.appendChild(titleDiv);
    trigger.appendChild(info);
    libContent.appendChild(trigger);
    lib.appendChild(libContent);
    wrap.appendChild(lib);

    lib.addEventListener("click", function () {
      var revealed = 0;
      allItems.forEach(function (e) {
        if (e.isDataRow && !e.paginatedIn && revealed < _PAGE_SIZE) {
          e.paginatedIn = true;
          revealed++;
          if (!e.isCollapsed || !e.isCollapsed()) {
            e.item.setVisible(true);
          }
        }
      });
      /* Reveal group headers that now have paginatedIn rows */
      var pendingH = [];
      allItems.forEach(function (e) {
        if (!e.isDataRow) {
          pendingH.push(e);
        } else if (e.paginatedIn) {
          pendingH.forEach(function (h) { if (!h.item.getVisible()) h.item.setVisible(true); });
          pendingH = [];
        }
      });
      var nowShown = allItems.filter(function (e) { return e.isDataRow && e.paginatedIn; }).length;
      info.textContent = "[ " + nowShown + " / " + total + " ]";
      if (nowShown >= total) { wrap.style.display = "none"; }
    });
    lib.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") { lib.click(); }
    });

    /* Insert after table renders — use setTimeout to wait for DOM */
    setTimeout(function () {
      var tbl = oOCTable.getDomRef();
      if (!tbl) return;
      var parent = tbl.parentNode;
      if (!parent) return;
      /* Remove stale wrap if re-inserted */
      var stale = document.getElementById("oc-load-more-wrap");
      if (stale && stale !== wrap) { stale.parentNode && stale.parentNode.removeChild(stale); }
      parent.insertBefore(wrap, tbl.nextSibling);
    }, 0);
  }

  /* ── Called by Joule to suggest/apply a secondary grouping ── */
  function _syncGroupPopover(primary, secondary) {
    _activeGroupKey    = primary || "needby-weekly";
    _jouleSecondaryKey = secondary || null;

    if (_jouleSecondaryKey && !_groupSecondarySection.getVisible()) {
      /* Build the secondary item and show the section */
      var defs = {
        "customer": { text: "Customer",    info: "Group by buyer company name" },
        "shipto":   { text: "Ship-to",     info: "Group by delivery address"   },
        "partno":   { text: "Part Number", info: "Group by buyer part number"  }
      };
      var def = defs[_jouleSecondaryKey];
      if (def) {
        _groupSecondaryItem = new StandardListItem({
          title: def.text, info: def.info, type: "Active",
          selected: _activeSecondaryKey === _jouleSecondaryKey, /* selected if already applied */
          customData: [ new sap.ui.core.CustomData({ key: "gk", value: _jouleSecondaryKey }) ]
        });
        _groupSecondaryList.removeAllItems();
        _groupSecondaryList.addItem(_groupSecondaryItem);
        _groupSecondarySection.setVisible(true);
      }
    } else if (_groupSecondaryItem) {
      /* Section already visible — just sync the selected state */
      _groupSecondaryItem.setSelected(_activeSecondaryKey === _jouleSecondaryKey);
    }
  }

  /* ── Lazy ViewSettingsDialog for Customized ── */
  var _viewSettingsDlg = null;
  function _openViewSettingsDialog() {
    if (_viewSettingsDlg) { _viewSettingsDlg.open(); return; }
    sap.ui.require(["sap/m/ViewSettingsDialog", "sap/m/ViewSettingsGroupItem"], function (ViewSettingsDialog, ViewSettingsGroupItem) {
      _viewSettingsDlg = new ViewSettingsDialog({
        title: "Group",
        groupItems: [
          new ViewSettingsGroupItem({ key: "needby-weekly",  text: "Delivery Date \u2014 Weekly",  selected: _activeGroupKey === "needby-weekly" }),
          new ViewSettingsGroupItem({ key: "needby-daily",   text: "Delivery Date \u2014 Daily",   selected: _activeGroupKey === "needby-daily" }),
          new ViewSettingsGroupItem({ key: "needby-monthly", text: "Delivery Date \u2014 Monthly", selected: _activeGroupKey === "needby-monthly" }),
          new ViewSettingsGroupItem({ key: "customer",       text: "Customer",                     selected: _activeGroupKey === "customer" }),
          new ViewSettingsGroupItem({ key: "shipto",         text: "Ship-to Location",             selected: _activeGroupKey === "shipto" }),
          new ViewSettingsGroupItem({ key: "partno",         text: "Buyer Part Number",            selected: _activeGroupKey === "partno" })
        ],
        confirm: function (oEvent) {
          var oItem = oEvent.getParameter("groupItem");
          if (oItem) {
            _activeGroupKey = oItem.getKey();
            _applyTableGrouping();
          }
        }
      });
      _viewSettingsDlg.open();
    });
  }

  var oGroupButton = new Button({
    icon:    "sap-icon://group-2",
    type:    "Transparent",
    tooltip: "Group",
    press: function (oEvent) {
      _groupPopover.openBy(oEvent.getSource());
    }
  });

  var oOCToolbar = new Toolbar({
    design: "Transparent",
    content: [
      oOCTableTitle,
      new ToolbarSpacer(),
      oGroupButton,
      new MenuButton({
        icon: "sap-icon://excel-attachment",
        type: "Transparent",
        tooltip: "Export to Spreadsheet",
        defaultAction: function () { MessageToast.show("Export to spreadsheet"); },
        menu: new Menu({
          items: [
            new MenuItem({ text: "Export to Spreadsheet", press: function () { MessageToast.show("Export to Spreadsheet"); } }),
            new MenuItem({ text: "Export as PDF",          press: function () { MessageToast.show("Export as PDF"); } })
          ]
        })
      })
    ]
  });

  var oOCTable = new Table({
    growing: true,
    growingThreshold: 10,
    growingScrollToLoad: false,
    sticky: ["HeaderToolbar", "ColumnHeaders"],
    width: "100%",
    busyIndicatorDelay: 0,
    updateFinished: function (oEvent) {
      var total   = oEvent.getParameter("total");
      var visible = oEvent.getParameter("actual");
      oOCTableTitle.setText("Items to Confirm (" + total + ")");
      if (oOCTable.getGrowingThreshold() !== 5) { oOCTable.setGrowingThreshold(5); }
      oOCTable.setGrowingTriggerText(visible < total ? "Load more" : "");
    },
    noDataText: "No items found",
    headerToolbar: oOCToolbar,
    columns: [
      new Column({ header: new Text({ text: "Order Number" }) }),
      new Column({ minScreenWidth: "Tablet",  demandPopin: true, header: new Text({ text: "Line Number" }) }),
      new Column({ minScreenWidth: "Tablet",  demandPopin: true, header: new Text({ text: "Customer Part Number" }) }),
      new Column({ minScreenWidth: "Tablet",  demandPopin: true, header: new Text({ text: "Supplier" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, header: new Text({ text: "Need By" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, header: new Text({ text: "Estimated Delivery" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Requested Qty" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Qty to Confirm" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, header: new Text({ text: "Description" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Req. Unit Price" }) }),
      new Column({ minScreenWidth: "Desktop", demandPopin: true, hAlign: "End", header: new Text({ text: "Conf. Unit Price" }) })
    ],
    items: {
      path: "oc>/items",
      template: new ColumnListItem({
        type: "Navigation",
        press: function (e) {
          var ctx = e.getSource().getBindingContext("oc");
          if (ctx) { MessageToast.show("Order: " + ctx.getProperty("orderNumber")); }
        },
        cells: [
          new Link({ text: "{oc>orderNumber}", press: function (e) {
            var ctx = e.getSource().getBindingContext("oc");
            if (ctx) { MessageToast.show("Order: " + ctx.getProperty("orderNumber")); }
          }}),
          new Text({ text: "{oc>lineNumber}",     wrapping: false }),
          new Text({ text: "{oc>custPartNumber}", wrapping: false }),
          new Text({ text: "{oc>supplier}",       wrapping: false }),
          new Text({ text: "{oc>needByDate}",     wrapping: false }),
          new Text({ text: "{oc>estDelivery}",    wrapping: false }),
          new Text({ text: "{oc>reqQty}",         wrapping: false }),
          new Text({ text: "{oc>qtyToConfirm}",   wrapping: false }),
          new Text({ text: "{oc>description}",    wrapping: false }),
          new Text({ text: { parts: [{path:"oc>reqUnitPrice"},{path:"oc>currency"}],
            formatter: function(p,c){ return p != null ? p.toFixed(2) + "\u00a0" + (c||"") : ""; }
          }, wrapping: false }),
          new Text({ text: { parts: [{path:"oc>confUnitPrice"},{path:"oc>currency"}],
            formatter: function(p,c){ return p != null ? p.toFixed(2) + "\u00a0" + (c||"") : ""; }
          }, wrapping: false })
        ]
      })
    }
  });
  oOCTable.setModel(oOCModel, "oc");

  /* Update table after filter changes */
  window._ocApplyFiltersToTable = function (filtered) {
    oOCModel.setProperty("/items", filtered);
    if (window._ocListMode) { return; } /* OC list page — plain binding, no grouping */
    oOCTable.setGrowingThreshold(10);
    _applyTableGrouping();
  };

  /* ── Grouping state & apply ── */
  var _ocGrouping = { primary: null, secondary: null }; /* null = no grouping */

  /* Get week label — anchored to Wednesday so Mar 25 2026 starts "Mar 25 – 31"
     Parse date as local time to avoid UTC-midnight timezone shift.          */
  function _weekLabel(dateStr) {
    if (!dateStr) return "Delivery date: No Date";
    var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var p   = dateStr.split("-");
    var d   = new Date(+p[0], +p[1] - 1, +p[2]); /* local time — no UTC shift */
    /* Anchor to Wednesday: (getDay + 4) % 7 = days since last Wed */
    var wed = new Date(d); wed.setDate(d.getDate() - ((d.getDay() + 4) % 7));
    var tue = new Date(wed); tue.setDate(wed.getDate() + 6);
    var start = MONTHS[wed.getMonth()] + " " + wed.getDate();
    var end   = wed.getMonth() === tue.getMonth()
                  ? String(tue.getDate())
                  : MONTHS[tue.getMonth()] + " " + tue.getDate();
    return "Delivery date: " + start + " \u2013 " + end;
  }

  /* Called by Joule — applies both primary and secondary grouping immediately */
  window._ocSetGrouping = function (primary, secondary) {
    _ocGrouping.primary   = primary;
    _ocGrouping.secondary = secondary;
    _activeGroupKey     = primary   || "needby-weekly";
    _activeSecondaryKey = secondary || null;
    _syncGroupPopover(primary, secondary);
    _applyTableGrouping();
  };

  /* ────────────────────────────────────────────────────────────
     createShell() — pixel-accurate ASN shell bar
  ──────────────────────────────────────────────────────────── */
  function createShell() {
    return `
      <div class="bn-shell">

        <!-- LEFT -->
        <div class="bn-shell-left">
          <div class="bn-shell-logo-wrap">
            <button class="bn-shell-menu-btn" title="Main menu">
              ${_ocIcon("menu2")}
            </button>
            <svg width="60" height="29" viewBox="0 0 60 29" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-left:2px;">
              <g clip-path="url(#oc-sap-clip)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 29.3478H29.983L59.3257 0H0V29.3478Z" fill="url(#oc-sap-grad)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M35.2068 5.86961H29.3477L29.3673 19.65L24.2653 5.86504H19.2064L14.8512 17.3779C14.3881 14.4483 11.3594 13.4374 8.97639 12.6803C7.40269 12.1748 5.73247 11.4313 5.74943 10.6096C5.76247 9.93526 6.64291 9.30983 8.39269 9.40309C9.5666 9.46635 10.6036 9.56091 12.6664 10.5574L14.6946 7.02265C12.8138 6.06526 10.2129 5.4607 8.0803 5.45874H8.06726C5.58052 5.45874 3.50986 6.26418 2.22639 7.59135C1.3316 8.51744 0.848995 9.69526 0.829429 10.9977C0.796821 12.7898 1.45356 14.0603 2.83356 15.0757C3.99965 15.93 5.49117 16.4844 6.8053 16.8913C8.42595 17.3935 9.74986 17.8305 9.73356 18.7605C9.72052 19.0996 9.59269 19.4166 9.34878 19.6722C8.94443 20.0896 8.32486 20.2461 7.46726 20.2631C5.81269 20.2983 4.5866 20.0381 2.63269 18.8831L0.828125 22.4635C2.78008 23.5735 4.85204 24.1305 7.20639 24.1305L7.73595 24.1266C9.78508 24.0894 11.4481 23.5983 12.7694 22.5353C12.8451 22.4746 12.9129 22.4133 12.9833 22.3513L12.7616 23.494L17.7051 23.4783L18.592 21.2074C19.5246 21.5257 20.5851 21.7018 21.7107 21.7018C22.8077 21.7018 23.8394 21.5348 24.7544 21.2348L25.3727 23.4783L34.2423 23.4868L34.2638 18.3098H36.1512C40.7131 18.3098 43.4099 15.9881 43.4099 12.0946C43.4086 7.75831 40.7868 5.86961 35.2068 5.86961ZM21.7107 17.6492C21.0292 17.6492 20.3901 17.5305 19.8403 17.3218L21.6899 11.4816H21.7257L23.5453 17.3381C22.9975 17.5337 22.3733 17.6492 21.7101 17.6492H21.7107ZM35.5499 14.2937H34.2625V9.587H35.5505C37.2657 9.587 38.6353 10.1583 38.6353 11.91C38.634 13.7231 37.2657 14.2937 35.5505 14.2937" fill="white"/>
              </g>
              <defs>
                <linearGradient id="oc-sap-grad" x1="29.6628" y1="0" x2="29.6628" y2="29.3485" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00AEEF"/>
                  <stop offset="0.212" stop-color="#0097DC"/>
                  <stop offset="0.519" stop-color="#007CC5"/>
                  <stop offset="0.792" stop-color="#006CB8"/>
                  <stop offset="1" stop-color="#0066B3"/>
                </linearGradient>
                <clipPath id="oc-sap-clip"><rect width="60" height="29" fill="white"/></clipPath>
              </defs>
            </svg>
            <button class="bn-shell-brand-btn" title="Back to Workbench" onclick="window.location.href='../index.html'">
              <span class="bn-shell-brand-text">Business Network</span>
              <span class="bn-shell-brand-arrow">
                ${_ocIcon("slim-arrow-down")}
              </span>
            </button>
          </div>
          <span class="bn-test-tag">Test Mode</span>
        </div>

        <!-- CENTER -->
        <div class="bn-shell-center">
          <div class="bn-search-wrap">
            <div class="bn-search-menu-btn">
              <div class="bn-search-select-inner">
                <span class="bn-search-select-text">Select</span>
                <span class="bn-search-select-arrow">
                  ${_ocIcon("slim-arrow-down")}
                </span>
              </div>
            </div>
            <div class="bn-search-sep"></div>
            <input class="bn-search-input" placeholder="Search" />
            <button class="bn-search-btn" title="Search">
              ${_ocIcon("search")}
            </button>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="bn-shell-right">
          <div class="bn-shell-enterprise-wrap">
            <span class="bn-shell-enterprise">Enterprise</span>
            <div class="bn-shell-divider"></div>
          </div>
          <div class="bn-shell-actions">
            <button class="bn-icon-btn" title="Joule"
              onclick="window._ocJouleToggle && window._ocJouleToggle()">
              ${_ocIcon("da")}
            </button>
            <button class="bn-icon-btn" title="Notifications">
              ${_ocIcon("bell")}
            </button>
            <button class="bn-icon-btn" title="Campaigns">
              ${_ocIcon("marketing-campaign")}
            </button>
            <button class="bn-icon-btn" title="Messages">
              ${_ocIcon("discussion-2")}
            </button>
            <button class="bn-icon-btn" title="Help">
              ${_ocIcon("sys-help")}
            </button>
            <div class="bn-avatar" title="JS">
              JS<span class="bn-avatar-dot"></span>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  /* ────────────────────────────────────────────────────────────
     initJoule() — full ASN-style Joule panel (loader + welcome + chat)
  ──────────────────────────────────────────────────────────── */
  function initJoule(appEl) {
    var _open = false;

    /* ── Panel HTML ── */
    var jouleDiv = document.createElement("div");
    jouleDiv.style.cssText = "display:none;flex-shrink:0;box-sizing:border-box;align-self:flex-end;height:calc(100% - 16px);border-radius:16px 16px 0 0;overflow:hidden;border-left:1px solid #C0B1FF;box-shadow:0 0 2px 0 rgba(93,54,255,0.16),0 4px 8px 0 rgba(93,54,255,0.16);";
    jouleDiv.id = "oc-joule-wrap";
    jouleDiv.innerHTML = `
      <div class="bn-joule" id="oc-joule">

        <!-- Header -->
        <div class="bn-joule-header">
          <div class="bn-joule-header-title">
            ${_ocIcon("da", 16, "filter:brightness(0) invert(1);margin-left:2px;")}
            <span class="bn-joule-title">Joule</span>
          </div>
          <div class="bn-joule-toolbar">
            <button class="bn-joule-hbtn" title="Reset conversation" onclick="window._ocJouleReset&&window._ocJouleReset()">
              ${_ocIcon("restart",16,"filter:brightness(0) invert(1);")}
            </button>
            <button class="bn-joule-hbtn" title="Full screen">
              ${_ocIcon("full-screen",16,"filter:brightness(0) invert(1);")}
            </button>
            <button class="bn-joule-hbtn" title="More options">
              ${_ocIcon("overflow",16,"filter:brightness(0) invert(1);")}
            </button>
            <button class="bn-joule-hbtn" title="Minimize" onclick="window._ocJouleToggle&&window._ocJouleToggle()">
              ${_ocIcon("decline",16,"filter:brightness(0) invert(1);")}
            </button>
          </div>
        </div>

        <!-- Conversation body -->
        <div class="bn-joule-body" id="oc-joule-body" style="display:none;">
          <div class="bn-joule-content" id="oc-joule-content"></div>
        </div>

        <!-- Welcome screen -->
        <div class="bn-joule-welcome" id="oc-joule-welcome" style="display:none;flex:1;overflow-y:auto;">
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
              <div class="bn-joule-welcome-tagline">How can I <span id="oc-joule-word">help</span> you?</div>
              <div class="bn-joule-welcome-hint">Describe what you need and I will take care of the rest. For example, "Show my items to confirm this week."</div>
            </div>
          </div>
          <div class="bn-joule-welcome-chips">
            <div class="bn-joule-welcome-chips-label">Get started</div>
            <div class="bn-joule-welcome-chips-row">
              <button class="bn-joule-welcome-chip" id="oc-joule-welcome-chip">Configure how my items to confirm are grouped</button>
            </div>
          </div>
        </div>

        <!-- Input footer -->
        <div class="bn-joule-footer">
          <div class="bn-joule-input-wrap" id="oc-joule-input-wrap">
            <div class="bn-joule-input-text">
              <span class="bn-joule-cursor"></span>
              <input class="bn-joule-input" id="oc-joule-input" placeholder="Message Joule..." />
            </div>
            <button class="bn-joule-send" id="oc-joule-send" title="Send">
              ${_ocIcon("paper-plane",16,"filter:brightness(0) invert(1);")}
            </button>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="bn-joule-disclaimer">
          Joule is powered by generative AI and all output should be reviewed before use.
          Please do not enter any sensitive personal data, and avoid entering any other personal data you do not wish to be processed.
        </div>

      </div>
    `;
    appEl.appendChild(jouleDiv);

    /* ── Toggle: show/hide with loader on open ── */
    window._ocJouleToggle = function () {
      _open = !_open;
      if (!_open) {
        jouleDiv.style.display = "none";
        return;
      }

      /* Show panel */
      jouleDiv.style.display = "block";

      /* Inject loading screen */
      var panel = document.getElementById("oc-joule");
      var loader = document.createElement("div");
      loader.className = "bn-joule-loader";
      loader.id = "oc-joule-loader";
      var dotHtml = "";
      for (var i = 0; i < 9; i++) {
        var delay = (Math.random() * 1.2).toFixed(2);
        var dur   = (1.0 + Math.random() * 0.8).toFixed(2);
        dotHtml += '<div class="bn-joule-loader-dot" style="animation-delay:' + delay + 's;animation-duration:' + dur + 's"></div>';
      }
      loader.innerHTML = '<div class="bn-joule-loader-grid">' + dotHtml + '</div>';
      panel.style.position = "relative";
      panel.appendChild(loader);

      /* Show welcome underneath before fade */
      var welcome = document.getElementById("oc-joule-welcome");
      if (welcome) { welcome.style.display = "flex"; welcome.style.flexDirection = "column"; }

      /* Fade loader out after 1.4s */
      setTimeout(function () {
        loader.classList.add("fade-out");
        setTimeout(function () { if (loader.parentNode) { loader.parentNode.removeChild(loader); } }, 420);
      }, 1400);

      /* Word cycling on welcome tagline */
      var _words = ["help", "assist", "guide"];
      var _wIdx  = 0;
      var _wordEl = document.getElementById("oc-joule-word");
      if (_wordEl) {
        var _wTimer = setInterval(function () {
          if (!document.getElementById("oc-joule-word")) { clearInterval(_wTimer); return; }
          _wordEl.classList.add("fade");
          setTimeout(function () {
            _wIdx = (_wIdx + 1) % _words.length;
            _wordEl.textContent = _words[_wIdx];
            _wordEl.classList.remove("fade");
          }, 360);
        }, 2200);
      }

      /* Input click → simulate human typing, user sends manually */
      var inputEl = document.getElementById("oc-joule-input");
      if (inputEl) {
        inputEl.addEventListener("click", function _onInputClick() {
          inputEl.removeEventListener("click", _onInputClick);
          setTimeout(function () {
          _bnAutoType("I want to configure how my pending orders are grouped in the Items to confirm view", null);
          }, 420);
        });
      }

      /* Wire input */
      _initInput();
    };

    /* ── Reset ── */
    window._ocJouleReset = function () {
      var body    = document.getElementById("oc-joule-body");
      var content = document.getElementById("oc-joule-content");
      var welcome = document.getElementById("oc-joule-welcome");
      if (content) content.innerHTML = "";
      if (body)    body.style.display    = "none";
      if (welcome) { welcome.style.display = "flex"; welcome.style.flexDirection = "column"; }
      _scenarioPhase = 0;
      _unlockInput();
    };

    /* ── Auto-type into input ── */
    function _bnAutoType(text, onDone) {
      var input = document.getElementById("oc-joule-input");
      var send  = document.getElementById("oc-joule-send");
      if (!input) { if (onDone) onDone(); return; }
      input.value = "";
      input.classList.remove("has-text");
      if (send) send.classList.remove("active");
      input.focus();

      var idx = 0;
      function typeNext() {
        if (idx >= text.length) {
          input.classList.add("has-text");
          if (send) send.classList.add("active");
          /* Focus + move caret to end so last word is fully visible */
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
          /* Force scroll to end — defer so browser has painted the value */
          requestAnimationFrame(function () {
            input.scrollLeft = input.scrollWidth;
          });
          /* Natural pause — as if reading before hitting send */
          setTimeout(function () { if (onDone) onDone(); }, 900);
          return;
        }
        var ch = text[idx++];
        input.value += ch;
        /* Keep caret and scroll at end on every keystroke */
        input.setSelectionRange(input.value.length, input.value.length);
        requestAnimationFrame(function () { input.scrollLeft = input.scrollWidth; });
        input.classList.toggle("has-text", input.value.length > 0);
        if (send) send.classList.toggle("active", input.value.length > 0);

        /* Human-like delay: base 55–110ms, word-end pause, punctuation pause, rare hesitation */
        var delay = 55 + Math.random() * 55;
        if (ch === " ")  delay += 40 + Math.random() * 60;
        if (ch === ",")  delay += 80;
        if (ch === ".")  delay += 120;
        if (ch === "$")  delay += 60;
        if (Math.random() < 0.08) delay += 180 + Math.random() * 200;

        setTimeout(typeNext, delay);
      }
      typeNext();
    }

    /* ── Scenario state ── */
    var _scenarioPhase    = 0; /* tracks which scenario/phase we're in */
    var _inputLocked      = false;
    var _awaitModifyItem  = false; /* true when waiting for user to specify which item to modify */

    /* ── Lock / unlock input ── */
    function _lockInput() {
      _inputLocked = true;
      var input = document.getElementById("oc-joule-input");
      var send  = document.getElementById("oc-joule-send");
      if (input) input.disabled = true;
      if (send)  send.disabled  = true;
    }
    function _unlockInput() {
      _inputLocked = false;
      var input = document.getElementById("oc-joule-input");
      var send  = document.getElementById("oc-joule-send");
      if (input) { input.disabled = false; input.value = ""; input.classList.remove("has-text"); }
      if (send)  { send.disabled  = false; send.classList.remove("active"); }
    }

    /* ── Thinking dots (1600 ms) ── */
    function _showDots(cb) {
      var el = _appendBubble("bn-joule-bubble",
        '<div class="bn-joule-dots" id="oc-jd-dots">' +
        '<div class="bn-joule-dot"></div>' +
        '<div class="bn-joule-dot"></div>' +
        '<div class="bn-joule-dot"></div>' +
        '</div>'
      );
      _scrollBottom();
      setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        if (cb) cb();
      }, 1600);
    }

    /* ── Type reply (shimmer → settle) ── */
    function _typeReply(text, onDone) {
      var bubble = _appendBubble("bn-joule-bubble", "");
      var textEl = document.createElement("span");
      textEl.className = "bn-joule-typing";
      var caret = document.createElement("span");
      caret.className = "bn-joule-caret";
      bubble.appendChild(textEl);
      bubble.appendChild(caret);
      var i = 0, speed = Math.max(18, Math.round(1800 / text.length));
      var timer = setInterval(function () {
        textEl.textContent += text[i++];
        _scrollBottom();
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(function () {
            textEl.style.background = "none";
            textEl.style.webkitTextFillColor = "#1d2d3e";
            textEl.style.color = "#1d2d3e";
            textEl.className = "";
            caret.style.display = "none";
            if (onDone) onDone();
          }, 500);
        }
      }, speed);
    }

    /* ── Type bold reply ── */
    function _typeBoldReply(text, onDone) {
      var bubble = _appendBubble("bn-joule-bubble", "");
      var strong = document.createElement("strong");
      strong.style.color = "#1d2d3e";
      var caret = document.createElement("span");
      caret.className = "bn-joule-caret";
      bubble.appendChild(strong);
      bubble.appendChild(caret);
      var i = 0;
      var timer = setInterval(function () {
        strong.textContent += text[i++];
        _scrollBottom();
        if (i >= text.length) {
          clearInterval(timer);
          setTimeout(function () { caret.style.display = "none"; if (onDone) onDone(); }, 500);
        }
      }, 32);
    }

    /* ── Status spinner line ── */
    function _showStatus(msg, duration, cb) {
      var el = _appendBubble("bn-joule-status",
        '<div class="bn-joule-status-spinner"></div>' + msg);
      _scrollBottom();
      setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        if (cb) cb();
      }, duration);
    }

    /* ── Append option buttons ── */
    function _appendOptions(opts, onSelect) {
      var wrap = _appendBubble("bn-joule-options", "");
      opts.forEach(function (opt, idx) {
        var btn = document.createElement("button");
        btn.className = "bn-joule-option-btn";
        btn.innerHTML =
          '<span class="bn-joule-option-num">' + (idx + 1) + '</span>' +
          '<span>' + opt + '</span>';
        btn.onclick = function () {
          wrap.querySelectorAll(".bn-joule-option-btn").forEach(function (b) {
            b.disabled = true;
          });
          btn.style.borderColor = "#5d36ff";
          btn.style.background  = "#f0eeff";
          setTimeout(function () { onSelect(idx, opt); }, 300);
        };
        wrap.appendChild(btn);
      });
      _scrollBottom();
      return wrap;
    }

    /* ── Fade-in element ── */
    function _fadeIn(el) {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      el.style.transition = "opacity .35s ease, transform .35s ease";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          _scrollBottom();
        });
      });
    }

    /* ════════════════════════════════════════════════════════════
       SCENARIOS
    ════════════════════════════════════════════════════════════ */

    /* ─── Scenario 2b: Apply rule changes ─── */
    function _runScenario2RulesChange() {
      _showDots(function () {
        _showStatus("Parsing your requested changes\u2026", 900, function () {
          _showStatus("Validating new thresholds against policy limits\u2026", 1000, function () {

            _typeReply("I\u2019m about to update your Lightweight Rules:", function () {

              /* Diff card */
              var diffCard = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Lightweight Rules \u2014 Proposed Changes' +
                '</div>' +
                '<div class="bn-joule-card-row" style="grid-template-columns:160px 1fr 1fr;background:#f7f9fb;padding:5px 12px;">' +
                  '<span class="bn-joule-card-col-label">RULE</span>' +
                  '<span class="bn-joule-card-col-label">BEFORE</span>' +
                  '<span class="bn-joule-card-col-label">AFTER</span>' +
                '</div>' +
                '<div class="bn-joule-card-row" style="grid-template-columns:160px 1fr 1fr;">' +
                  '<span class="bn-joule-card-col-label">Value cap</span>' +
                  '<span class="bn-joule-card-desc" style="color:#556b82;">$10,000</span>' +
                  '<span class="bn-joule-card-desc" style="font-weight:700;color:#256f3a;">$25,000' +
                    ' <span style="font-size:11px;background:#e8f5e9;color:#256f3a;border-radius:4px;padding:1px 5px;">+$15,000</span>' +
                  '</span>' +
                '</div>' +
                '<div class="bn-joule-card-row" style="grid-template-columns:160px 1fr 1fr;border-bottom:none;">' +
                  '<span class="bn-joule-card-col-label">Auto-confirm score</span>' +
                  '<span class="bn-joule-card-desc" style="color:#556b82;">\u2265 85</span>' +
                  '<span class="bn-joule-card-desc" style="font-weight:700;color:#256f3a;">\u2265 80' +
                    ' <span style="font-size:11px;background:#e8f5e9;color:#256f3a;border-radius:4px;padding:1px 5px;">\u22125</span>' +
                  '</span>' +
                '</div>'
              );
              _fadeIn(diffCard);

              setTimeout(function () {
                var impactBubble = _appendBubble("bn-joule-bubble",
                  '<div style="display:flex;flex-direction:column;gap:6px;">' +
                    '<span style="font-size:12px;font-weight:700;color:#0064d9;letter-spacing:.02em;">Impact</span>' +
                    '<div style="display:flex;flex-direction:column;gap:4px;">' +
                      '<div style="display:flex;align-items:baseline;gap:6px;">' +
                        '<span style="font-family:SAP-icons;font-size:13px;color:#256f3a;">&#xe1c1;</span>' +
                        '<span style="font-size:13px;color:#1d2d3e;">Auto-confirmable items increase by approximately ' +
                          '<span style="font-weight:700;background:#d4edda;color:#256f3a;padding:1px 5px;border-radius:4px;">15\u201320%</span>' +
                        '</span>' +
                      '</div>' +
                      '<div style="display:flex;align-items:baseline;gap:6px;">' +
                        '<span style="font-family:SAP-icons;font-size:13px;color:#256f3a;">&#xe1c1;</span>' +
                        '<span style="font-size:13px;color:#1d2d3e;">More items confirmed <span style="font-weight:700;color:#256f3a;">without manual review</span></span>' +
                      '</div>' +
                      '<div style="display:flex;align-items:baseline;gap:6px;">' +
                        '<span style="font-family:SAP-icons;font-size:13px;color:#0064d9;">&#xe289;</span>' +
                        '<span style="font-size:13px;color:#1d2d3e;">Review range shifts from ' +
                          '<span style="font-weight:700;background:#e8f0fb;color:#0064d9;padding:1px 5px;border-radius:4px;">60\u201384</span>' +
                          ' to ' +
                          '<span style="font-weight:700;background:#e8f0fb;color:#0064d9;padding:1px 5px;border-radius:4px;">60\u201379</span>' +
                        '</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>'
                );
                _fadeIn(impactBubble);

                setTimeout(function () {
                  _typeBoldReply("Should I apply these changes?", function () {
                    _appendOptions(
                      ["Yes", "No"],
                      function (idx) {
                        if (idx === 0) {
                          _showDots(function () {
                            _showStatus("Saving updated Lightweight Rules\u2026", 1000, function () {
                              _showStatus("Activating new thresholds\u2026", 700, function () {

                                var successBubble = _appendBubble("bn-joule-bubble",
                                  '<span style="color:#256f3a;font-weight:700;">\u2714 Lightweight Rules updated successfully.</span>' +
                                  '<span style="color:#1d2d3e;"> New settings are active immediately. All future PO evaluations will use the updated thresholds.</span>'
                                );
                                _fadeIn(successBubble);
                                setTimeout(function () {
                                  var tipBubble = _appendBubble("bn-joule-bubble",
                                    '<span style="font-size:12px;font-weight:700;color:#5d36ff;">Tip</span>' +
                                    '<span style="font-size:13px;color:#556b82;"> \u2014 You can always say \u201cshow my current rules\u201d to review your configuration.</span>'
                                  );
                                  _fadeIn(tipBubble);
                                  setTimeout(function () {
                                    _typeBoldReply("How can I assist you next?", function () {
                                      var inputEl = document.getElementById("oc-joule-input");
                                      if (inputEl) {
                                        inputEl.addEventListener("click", function _onPoReviewClick() {
                                          inputEl.removeEventListener("click", _onPoReviewClick);
                                          setTimeout(function () {
                                            _bnAutoType("I want to review and confirm my pending purchase orders for this week", null);
                                          }, 350);
                                        });
                                      }
                                      _unlockInput();
                                    });
                                  }, 400);
                                }, 600);
                              });
                            });
                          });
                        } else {
                          _typeReply("No changes applied. Your current rules remain in effect.", function () {
                            _unlockInput();
                          });
                        }
                      }
                    );
                  });
                }, 500);
              }, 600);
            });
          });
        });
      });
    }

    /* ─── Scenario 3 Step 1: Show grouping info, ask about secondary ─── */
    function _runScenario3GroupingInfo() {
      _showDots(function () {
        _showStatus("Reading your current grouping settings\u2026", 1200, function () {

          _typeReply("Here are your current grouping settings:", function () {

            /* Current settings card */
            var groupCard = _appendBubble("bn-joule-result-card",
              '<div class="bn-joule-card-header">' +
                '<div class="bn-joule-card-header-dot"></div>' +
                'Current Grouping Settings' +
              '</div>' +
              '<div class="bn-joule-card-row" style="grid-template-columns:160px 1fr;">' +
                '<span class="bn-joule-card-col-label">PRIMARY GROUPING</span>' +
                '<span class="bn-joule-card-desc" style="font-weight:700;color:#1d2d3e;">Delivery date \u2014 Weekly (Mon\u2013Sun buckets)</span>' +
              '</div>' +
              '<div class="bn-joule-card-row" style="grid-template-columns:160px 1fr;border-bottom:none;">' +
                '<span class="bn-joule-card-col-label">SECONDARY GROUPING</span>' +
                '<span class="bn-joule-card-desc" style="color:#8396a8;">None</span>' +
              '</div>'
            );
            _fadeIn(groupCard);

            setTimeout(function () {
              _typeReply("You can change the primary grouping to any of these options:", function () {

                /* Options card */
                var optCard = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Need By Grouping Options' +
                  '</div>' +
                  [
                    ["Option 1", "Daily",   "One group per delivery date"],
                    ["Option 2", "Weekly",  "Mon\u2013Sun buckets \u2014 current"],
                    ["Option 3", "Monthly", "One group per calendar month"]
                  ].map(function (r) {
                    var isCurrent = r[1] === "Weekly";
                    return '<div class="bn-joule-card-row" style="grid-template-columns:70px 90px 1fr;">' +
                      '<span class="bn-joule-card-col-label">' + r[0] + '</span>' +
                      '<span style="font-size:13px;font-weight:700;color:#1d2d3e;">' + r[1] + '</span>' +
                      '<span class="bn-joule-card-desc">' + r[2] +
                        (isCurrent ? ' <span class="bn-joule-confirm-label">Current</span>' : '') +
                      '</span>' +
                    '</div>';
                  }).join("") +
                  '<div class="bn-joule-card-header" style="border-top:1px solid #e0d9ff;">Other Grouping Options</div>' +
                  [
                    ["Option 4", "Customer",         "Group by buyer company name"],
                    ["Option 5", "Ship-to location", "Group by delivery address / city"],
                    ["Option 6", "Buyer part number","Group by customer part number"]
                  ].map(function (r) {
                    return '<div class="bn-joule-card-row" style="grid-template-columns:70px 130px 1fr;">' +
                      '<span class="bn-joule-card-col-label">' + r[0] + '</span>' +
                      '<span style="font-size:13px;font-weight:700;color:#1d2d3e;">' + r[1] + '</span>' +
                      '<span class="bn-joule-card-desc">' + r[2] + '</span>' +
                    '</div>';
                  }).join("") +
                  '<div class="bn-joule-card-footer">You can also set a secondary grouping (sub-groups within the primary).</div>'
                );
                _fadeIn(optCard);

                setTimeout(function () {
                  _typeBoldReply("Would you like to choose a sub-group for your primary grouping?", function () {
                    _appendOptions(["Yes", "No"], function (idx) {
                      if (idx === 0) {
                        /* Yes — ask how to organize, then wire input click */
                        _typeBoldReply("Great. How would you like to organize items within each primary group?", function () {
                          var inp = document.getElementById("oc-joule-input");
                          if (inp) {
                            inp.addEventListener("click", function _onGroupingClick() {
                              inp.removeEventListener("click", _onGroupingClick);
                              setTimeout(function () {
                                _bnAutoType("Set primary grouping to Weekly delivery date, and secondary grouping to Customer", null);
                              }, 350);
                            });
                          }
                          _unlockInput();
                        });
                      } else {
                        /* No — apply weekly grouping with no secondary */
                        var inp = document.getElementById("oc-joule-input");
                        if (inp) {
                          inp.addEventListener("click", function _onGroupingClick() {
                            inp.removeEventListener("click", _onGroupingClick);
                            setTimeout(function () {
                              _bnAutoType("Set primary grouping to Weekly delivery date, no secondary grouping", null);
                            }, 350);
                          });
                        }
                        _typeReply("No problem \u2014 I\u2019ll group by Delivery date \u2014 Weekly with no secondary grouping.", function () {
                          if (window._ocSetGrouping) {
                            window._ocSetGrouping("needby-weekly", null);
                          }
                          _unlockInput();
                        });
                      }
                    });
                  });
                }, 700);
              });
            }, 600);
          });
        });
      });
    }

    /* ─── Scenario 2: Auto-confirmation rules ─── */
    function _runScenario2Rules() {
      _showDots(function () {
        _showStatus("Loading your auto-confirmation rule configuration\u2026", 1100, function () {
          _showStatus("Retrieving current thresholds\u2026", 900, function () {

            _typeReply("Here are your current auto-confirmation rules:", function () {

              var rulesCard = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Auto-Confirmation Rules \u2014 Current Settings' +
                '</div>' +
                [
                  ["Lead-time buffer (domestic)",          "7 days"],
                  ["Lead-time buffer (international)",     "14 days"],
                  ["Quantity threshold (auto-confirm max)", "100 units"],
                  ["Value cap (auto-confirm)",             "$10,000"],
                  ["Buyer score \u2014 auto-confirm",     "\u2265 85"],
                  ["Buyer score \u2014 review",           "60\u201384"],
                  ["Buyer score \u2014 escalate",         "< 60"],
                  ["Partial confirmation",                 "Allowed"]
                ].map(function (r) {
                  return '<div class="bn-joule-card-row" style="grid-template-columns:1fr 100px;">' +
                    '<span class="bn-joule-card-desc" style="color:#1d2d3e;">' + r[0] + '</span>' +
                    '<span class="bn-joule-card-ship" style="font-weight:700;color:#1d2d3e;">' + r[1] + '</span>' +
                  '</div>';
                }).join("") +
                '<div class="bn-joule-card-footer">Rules apply to all incoming purchase order lines</div>'
              );
              _fadeIn(rulesCard);

              setTimeout(function () {
                _typeBoldReply("What would you like to change?", function () {
                  /* Wire next input click to auto-type the rules change command */
                  var inp = document.getElementById("oc-joule-input");
                  if (inp) {
                    inp.addEventListener("click", function _onRulesChangeClick() {
                      inp.removeEventListener("click", _onRulesChangeClick);
                      setTimeout(function () {
                        _bnAutoType("I want to increase the value cap to $25,000 and reduce the auto-confirm buyer score to 80", null);
                      }, 350);
                    });
                  }
                  _unlockInput();
                });
              }, 700);
            });
          });
        });
      });
    }

    /* ─── Scenario 3: Grouping preferences ─── */
    function _runScenario3() {
      _lockInput();

      /* Loading */
      _showDots(function () {
        _showStatus("Reading your grouping preferences\u2026", 1000, function () {
          _showStatus("Preparing preview\u2026", 900, function () {

            /* Intro reply */
            _typeReply("I\u2019m about to update your grouping preferences:", function () {

              /* Before / After diff card */
              var diffCard = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Grouping Configuration \u2014 Changes' +
                '</div>' +
                /* Column labels */
                '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr 1fr;background:#f7f9fb;padding:5px 12px;">' +
                  '<span class="bn-joule-card-col-label"></span>' +
                  '<span class="bn-joule-card-col-label">BEFORE</span>' +
                  '<span class="bn-joule-card-col-label">AFTER</span>' +
                '</div>' +
                /* Primary row — no change */
                '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr 1fr;">' +
                  '<span class="bn-joule-card-col-label">PRIMARY</span>' +
                  '<span class="bn-joule-card-desc" style="color:#556b82;">Delivery date \u2014 Weekly</span>' +
                  '<span class="bn-joule-card-desc" style="color:#1d2d3e;font-weight:700;">Delivery date \u2014 Weekly' +
                    ' <span style="font-size:11px;background:#eff1f2;color:#556b82;border-radius:4px;padding:1px 5px;">no change</span>' +
                  '</span>' +
                '</div>' +
                /* Secondary row — changed: None → Customer */
                '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr 1fr;border-bottom:none;">' +
                  '<span class="bn-joule-card-col-label">SECONDARY</span>' +
                  '<span class="bn-joule-card-desc" style="color:#8396a8;">None</span>' +
                  '<span class="bn-joule-card-desc" style="color:#256f3a;font-weight:700;">Customer' +
                    ' <span style="font-size:11px;background:#e8f5e9;color:#256f3a;border-radius:4px;padding:1px 5px;">new</span>' +
                  '</span>' +
                '</div>'
              );
              _fadeIn(diffCard);

              /* Preview label */
              setTimeout(function () {
                _typeReply("Your Items to confirm will display as:", function () {

                  /* Preview card */
                  var previewCard = _appendBubble("bn-joule-result-card",
                    '<div class="bn-joule-card-header">' +
                      '<div class="bn-joule-card-header-dot"></div>' +
                      'Preview \u2014 Items to Confirm' +
                    '</div>' +

                    /* Week 1 header */
                    '<div style="padding:8px 12px 4px 12px;font-size:12px;font-weight:700;color:#1d2d3e;' +
                        'background:#f7f9fb;border-bottom:1px solid #eef1f4;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:14px;color:#5d36ff;">&#xe1fe;</span> Mar 25 \u2013 31' +
                    '</div>' +
                    '<div class="bn-joule-card-row" style="grid-template-columns:16px 1fr 60px;padding:5px 12px 5px 20px;">' +
                      '' + _ocIcon("building",13,"vertical-align:middle;opacity:0.6;margin-right:2px;") + '' +
                      '<span class="bn-joule-card-desc" style="color:#1d2d3e;">Best Run Buyer</span>' +
                      '<span class="bn-joule-card-ship" style="color:#8396a8;">4 lines</span>' +
                    '</div>' +
                    '<div class="bn-joule-card-row" style="grid-template-columns:16px 1fr 60px;padding:5px 12px 5px 20px;border-bottom:none;">' +
                      '' + _ocIcon("building",13,"vertical-align:middle;opacity:0.6;margin-right:2px;") + '' +
                      '<span class="bn-joule-card-desc" style="color:#1d2d3e;">Acme Corp</span>' +
                      '<span class="bn-joule-card-ship" style="color:#8396a8;">2 lines</span>' +
                    '</div>' +

                    /* Week 2 header */
                    '<div style="padding:8px 12px 4px 12px;font-size:12px;font-weight:700;color:#1d2d3e;' +
                        'background:#f7f9fb;border-top:1px solid #eef1f4;border-bottom:1px solid #eef1f4;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:14px;color:#5d36ff;">&#xe1fe;</span> Apr 1 \u2013 7' +
                    '</div>' +
                    '<div class="bn-joule-card-row" style="grid-template-columns:16px 1fr 60px;padding:5px 12px 5px 20px;">' +
                      '' + _ocIcon("building",13,"vertical-align:middle;opacity:0.6;margin-right:2px;") + '' +
                      '<span class="bn-joule-card-desc" style="color:#1d2d3e;">Best Run Buyer</span>' +
                      '<span class="bn-joule-card-ship" style="color:#8396a8;">3 lines</span>' +
                    '</div>' +
                    '<div class="bn-joule-card-row" style="grid-template-columns:16px 1fr 60px;padding:5px 12px 5px 20px;">' +
                      '' + _ocIcon("building",13,"vertical-align:middle;opacity:0.6;margin-right:2px;") + '' +
                      '<span class="bn-joule-card-desc" style="color:#1d2d3e;">Acme Corp</span>' +
                      '<span class="bn-joule-card-ship" style="color:#8396a8;">2 lines</span>' +
                    '</div>' +
                    '<div class="bn-joule-card-row" style="grid-template-columns:16px 1fr 60px;padding:5px 12px 5px 20px;border-bottom:none;">' +
                      '' + _ocIcon("building",13,"vertical-align:middle;opacity:0.6;margin-right:2px;") + '' +
                      '<span class="bn-joule-card-desc" style="color:#1d2d3e;">Initech GmbH</span>' +
                      '<span class="bn-joule-card-ship" style="color:#8396a8;">2 lines</span>' +
                    '</div>' +

                    '<div class="bn-joule-card-footer">12 items across 2 delivery weeks \u2014 grouped by customer within each week</div>'
                  );
                  _fadeIn(previewCard);

                  /* Bold question */
                  setTimeout(function () {
                    _typeBoldReply("Should I apply this configuration?", function () {
                      _appendOptions(
                        [
                          "Yes",
                          "No",
                          "Change primary grouping to a different option"
                        ],
                        function (idx) {
                          if (idx === 0) {
                            _showDots(function () {
                              _showStatus("Saving grouping preferences\u2026", 800, function () {
                                _showStatus("Rebuilding your Items to confirm view\u2026", 900, function () {

                                  /* Apply grouping to table — both primary + secondary immediately */
                                  window._ocSetGrouping("needby-weekly", "customer");

                                  /* Confirmation card */
                                  var confirmCard = _appendBubble("bn-joule-result-card",
                                    '<div class="bn-joule-card-header">' +
                                      '<div class="bn-joule-card-header-dot"></div>' +
                                      'Grouping Preferences Updated' +
                                    '</div>' +
                                    '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr;border-bottom:none;">' +
                                      '<span class="bn-joule-card-col-label">PRIMARY</span>' +
                                      '<span class="bn-joule-card-desc" style="font-weight:700;color:#1d2d3e;">Delivery date \u2014 Weekly <span class="bn-joule-confirm-label">Applied</span></span>' +
                                    '</div>' +
                                    '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr;border-bottom:none;">' +
                                      '<span class="bn-joule-card-col-label">SECONDARY</span>' +
                                      '<span class="bn-joule-card-desc" style="font-weight:700;color:#1d2d3e;">Customer <span class="bn-joule-confirm-label">Applied</span></span>' +
                                    '</div>'
                                  );
                                  _fadeIn(confirmCard);

                                  setTimeout(function () {
                                    _typeReply(
                                      "This is now your default view. You can always change grouping on-the-fly from the Items to confirm toolbar using the \u201cGroup by\u201d dropdown.",
                                      function () {
                                        /* Tip bubble */
                                        var tip = _appendBubble("bn-joule-bubble",
                                          '<span style="font-size:12px;font-weight:700;color:#5d36ff;">Tip</span>' +
                                          '<span style="font-size:13px;color:#556b82;"> \u2014 Say \u201cgroup by location\u201d or \u201cswitch to daily grouping\u201d anytime during a confirmation session to change the view without modifying your saved default.</span>'
                                        );
                                        _fadeIn(tip);
                                        setTimeout(function () {
                                          _typeBoldReply("How can I assist you next?", function () {
                                            /* Wire next input click to auto-type the rules message */
                                            var inp = document.getElementById("oc-joule-input");
                                            if (inp) {
                                              inp.addEventListener("click", function _onRulesClick() {
                                                inp.removeEventListener("click", _onRulesClick);
                                                setTimeout(function () {
                                                  _bnAutoType("I want to change my auto-confirmation rules", null);
                                                }, 350);
                                              });
                                            }
                                            _unlockInput();
                                          });
                                        }, 600);
                                      }
                                    );
                                  }, 600);
                                });
                              });
                            });
                          } else if (idx === 1) {
                            _typeReply("Keeping current settings unchanged.", function () {
                              setTimeout(_runScenario3Analysis, 400);
                            });
                          } else {
                            _runScenario1();
                          }
                        }
                      );
                    });
                  }, 700);
                });
              }, 600);
            });
          });
        });
      });
    }

    /* ─── Scenario 3 analysis (after grouping step) ─── */
    function _runScenario3Analysis() {
      _showDots(function () {
        _showStatus("Analysing your pending purchase orders\u2026", 1400, function () {
          _showStatus("Checking auto-confirm rules and supplier scores\u2026", 1200, function () {

            /* Summary reply */
            _typeReply(
              "I found 12 open order lines in your workbench. Here\u2019s how I\u2019ve grouped them for you:",
              function () {

                /* Three-bucket result card */
                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Order Confirmation Analysis \u2014 This Week' +
                  '</div>' +
                  '<div class="bn-joule-card-row" style="background:#f7f9fb;padding:5px 12px;">' +
                    '<span class="bn-joule-card-col-label">BUCKET</span>' +
                    '<span class="bn-joule-card-col-label" style="padding:0 8px;">ORDERS</span>' +
                    '<span class="bn-joule-card-col-label" style="text-align:right;">ACTION</span>' +
                  '</div>' +
                  '<div class="bn-joule-card-row">' +
                    '<span class="bn-joule-card-order">Auto-confirm</span>' +
                    '<span class="bn-joule-card-desc">PO 4500123401, 4500123405, 4500123407<br>7 items \u2014 exact qty, on-time delivery</span>' +
                    '<span class="bn-joule-card-ship"><span class="bn-joule-confirm-label">Ready</span></span>' +
                  '</div>' +
                  '<div class="bn-joule-card-row">' +
                    '<span class="bn-joule-card-order">Review</span>' +
                    '<span class="bn-joule-card-desc">PO 4500123402, 4500123404, 4500123406<br>3 items \u2014 partial qty or price variance</span>' +
                    '<span class="bn-joule-card-ship" style="color:#e76500;">Needs input</span>' +
                  '</div>' +
                  '<div class="bn-joule-card-row">' +
                    '<span class="bn-joule-card-order">Escalate</span>' +
                    '<span class="bn-joule-card-desc">PO 4500123403, 4500123408<br>2 items \u2014 high cancel risk, buyer flagged</span>' +
                    '<span class="bn-joule-card-ship" style="color:#bb0000;">Urgent</span>' +
                  '</div>' +
                  '<div class="bn-joule-card-footer">12 items across 8 purchase orders \u2014 2 waves recommended</div>'
                );
                _fadeIn(card);

                setTimeout(function () {
                  _typeBoldReply("The 7 auto-confirm items all pass your rules. Shall I confirm them now?", function () {
                    _appendOptions(
                      [
                        "Yes \u2014 confirm all 7 items across 2 waves",
                        "Show me the item list first",
                        "Adjust thresholds before confirming"
                      ],
                      function (idx) {
                        if (idx === 0) {
                          _confirmWave1();
                        } else if (idx === 1) {
                          _showItemList(function () { _confirmWave1(); });
                        } else {
                          _scenarioThresholds();
                        }
                      }
                    );
                  });
                }, 700);
              }
            );
          });
        });
      });
    }

    /* Show the 7 item list then call cb */
    function _showItemList(cb) {
      _showDots(function () {
        var card = _appendBubble("bn-joule-result-card",
          '<div class="bn-joule-card-header">' +
            '<div class="bn-joule-card-header-dot"></div>' +
            'Auto-Confirm Items (7)' +
          '</div>' +
          '<div class="bn-joule-card-row" style="background:#f7f9fb;padding:5px 12px;">' +
            '<span class="bn-joule-card-col-label">ORDER / LINE</span>' +
            '<span class="bn-joule-card-col-label" style="padding:0 8px;">DESCRIPTION</span>' +
            '<span class="bn-joule-card-col-label" style="text-align:right;">QTY / NEED BY</span>' +
          '</div>' +
          [
            ["4500123401 / 10", "Steel Frame",     "50 / Apr 10"],
            ["4500123401 / 20", "Gear Unit",        "25 / Apr 10"],
            ["4500123405 / 10", "Lighting Kit",     "100 / Apr 12"],
            ["4500123405 / 20", "Cable Assembly",   "200 / Apr 12"],
            ["4500123407 / 10", "Valve Set",        "40 / Apr 18"],
            ["4500123407 / 20", "Seal Kit",         "75 / Apr 18"],
            ["4500123402 / 10", "Motor Drive",      "10 / Apr 15"]
          ].map(function (r) {
            return '<div class="bn-joule-card-row">' +
              '<span class="bn-joule-card-order">' + r[0] + '</span>' +
              '<span class="bn-joule-card-desc">' + r[1] + '</span>' +
              '<span class="bn-joule-card-ship">' + r[2] + '</span>' +
            '</div>';
          }).join("") +
          '<div class="bn-joule-card-footer">All items match exact quantity and meet delivery window</div>'
        );
        _fadeIn(card);
        setTimeout(function () {
          _typeBoldReply("Confirm all 7 items in 2 waves?", function () {
            _appendOptions(
              ["Yes \u2014 confirm now", "Cancel"],
              function (idx) {
                if (idx === 0) _confirmWave1(); else _unlockInput();
              }
            );
          });
        }, 700);
      });
    }

    /* Wave 1 confirm */
    function _confirmWave1() {
      _showDots(function () {
        _showStatus("Generating Wave 1 OC documents (4 items)\u2026", 1400, function () {
          _showStatus("Sending confirmations to buyers\u2026", 1000, function () {
            _typeReply(
              "Wave 1 complete \u2014 4 order confirmation documents generated for PO 4500123401 and PO 4500123405.",
              function () {
                /* Wave 1 result card */
                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Wave 1 Confirmed \u2014 4 OC Documents' +
                  '</div>' +
                  [
                    ["OC-100201", "4500123401 / 10", "Steel Frame \u2014 50 units"],
                    ["OC-100202", "4500123401 / 20", "Gear Unit \u2014 25 units"],
                    ["OC-100203", "4500123405 / 10", "Lighting Kit \u2014 100 units"],
                    ["OC-100204", "4500123405 / 20", "Cable Assembly \u2014 200 units"]
                  ].map(function (r) {
                    return '<div class="bn-joule-card-row">' +
                      '<span class="bn-joule-card-order">' + r[0] + '</span>' +
                      '<span class="bn-joule-card-desc">' + r[1] + '</span>' +
                      '<span class="bn-joule-card-ship"><span class="bn-joule-confirm-label">Sent</span></span>' +
                    '</div>';
                  }).join("") +
                  '<div class="bn-joule-card-footer">4 confirmations sent \u2014 buyers notified automatically</div>'
                );
                _fadeIn(card);
                setTimeout(function () { _confirmWave2(); }, 800);
              }
            );
          });
        });
      });
    }

    /* Wave 2 confirm */
    function _confirmWave2() {
      _showStatus("Generating Wave 2 OC documents (3 items)\u2026", 1400, function () {
        _typeReply(
          "Wave 2 complete \u2014 3 more confirmation documents generated for PO 4500123407 and PO 4500123402.",
          function () {
            var card = _appendBubble("bn-joule-result-card",
              '<div class="bn-joule-card-header">' +
                '<div class="bn-joule-card-header-dot"></div>' +
                'Wave 2 Confirmed \u2014 3 OC Documents' +
              '</div>' +
              [
                ["OC-100205", "4500123407 / 10", "Valve Set \u2014 40 units"],
                ["OC-100206", "4500123407 / 20", "Seal Kit \u2014 75 units"],
                ["OC-100207", "4500123402 / 10", "Motor Drive \u2014 10 units"]
              ].map(function (r) {
                return '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">' + r[0] + '</span>' +
                  '<span class="bn-joule-card-desc">' + r[1] + '</span>' +
                  '<span class="bn-joule-card-ship"><span class="bn-joule-confirm-label">Sent</span></span>' +
                '</div>';
              }).join("") +
              '<div class="bn-joule-card-footer">7 of 12 items confirmed \u2014 5 items still need your attention</div>'
            );
            _fadeIn(card);
            setTimeout(function () {
              _typeBoldReply("What would you like to do next?", function () {
                _appendOptions(
                  [
                    "Review 3 items that need input (partial qty / price variance)",
                    "Handle 2 escalated items with high cancel risk",
                    "View all Order Confirmations"
                  ],
                  function (idx) {
                    if (idx === 0) _runScenario4();
                    else if (idx === 1) _runScenario5();
                    else _viewAllOCs();
                  }
                );
              });
            }, 700);
          }
        );
      });
    }

    /* ─── Scenario 4: Review 3 items with Joule suggestions ─── */
    function _runScenario4() {
      _showDots(function () {
        _showStatus("Loading items with variances\u2026", 1000, function () {
          _typeReply(
            "Here are the 3 items that need your input. I\u2019ve prepared a suggested response for each:",
            function () {
              /* Card showing 3 items with Joule suggestions */
              var card = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Items Requiring Review \u2014 Joule Suggestions' +
                '</div>' +
                '<div class="bn-joule-card-row" style="background:#f7f9fb;padding:5px 12px;">' +
                  '<span class="bn-joule-card-col-label">ORDER / LINE</span>' +
                  '<span class="bn-joule-card-col-label" style="padding:0 8px;">ISSUE</span>' +
                  '<span class="bn-joule-card-col-label" style="text-align:right;">SUGGESTION</span>' +
                '</div>' +
                '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">4500123404 / 10</span>' +
                  '<span class="bn-joule-card-desc">Network HW<br>Req 20, can ship 18</span>' +
                  '<span class="bn-joule-card-ship" style="color:#e76500;font-size:11px;">Partial qty<br>Confirm 18</span>' +
                '</div>' +
                '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">4500123406 / 10</span>' +
                  '<span class="bn-joule-card-desc">Pump Housing<br>Need By May 1</span>' +
                  '<span class="bn-joule-card-ship" style="color:#e76500;font-size:11px;">+2 day shift<br>Confirm Apr 29</span>' +
                '</div>' +
                '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">4500123403 / 20</span>' +
                  '<span class="bn-joule-card-desc">Server Unit<br>Price \u00b12.5%</span>' +
                  '<span class="bn-joule-card-ship" style="color:#e76500;font-size:11px;">Accept price<br>$8,200 \u2192 $8,200</span>' +
                '</div>' +
                '<div class="bn-joule-card-footer">3 items \u2014 Joule suggestions based on your current stock and lead times</div>'
              );
              _fadeIn(card);

              setTimeout(function () {
                _typeBoldReply("Do you want to accept all Joule suggestions, or override one?", function () {
                  _appendOptions(
                    [
                      "Accept all 3 suggestions and confirm",
                      "Override Network HW \u2014 confirm full qty 20 on back-order",
                      "Reject Pump Housing \u2014 request buyer extend Need By"
                    ],
                    function (idx) {
                      if (idx === 0) {
                        _acceptAllSuggestions();
                      } else if (idx === 1) {
                        _overrideNetworkHW();
                      } else {
                        _rejectPumpHousing();
                      }
                    }
                  );
                });
              }, 700);
            }
          );
        });
      });
    }

    function _acceptAllSuggestions() {
      _showDots(function () {
        _showStatus("Generating 2 OC documents with Joule adjustments\u2026", 1400, function () {
          _typeReply(
            "Done \u2014 2 more confirmations sent with your approved adjustments.",
            function () {
              var card = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Confirmed with Adjustments \u2014 2 OC Documents' +
                '</div>' +
                [
                  ["OC-100208", "4500123404 / 10", "Network HW \u2014 18 units (partial)"],
                  ["OC-100209", "4500123406 / 10", "Pump Housing \u2014 Apr 29 delivery"]
                ].map(function (r) {
                  return '<div class="bn-joule-card-row">' +
                    '<span class="bn-joule-card-order">' + r[0] + '</span>' +
                    '<span class="bn-joule-card-desc">' + r[1] + '</span>' +
                    '<span class="bn-joule-card-ship"><span class="bn-joule-confirm-label">Sent</span></span>' +
                  '</div>';
                }).join("") +
                '<div class="bn-joule-card-footer">9 of 12 items confirmed \u2014 2 escalated items remain</div>'
              );
              _fadeIn(card);
              setTimeout(function () {
                _typeBoldReply("2 escalated items still need your attention. Handle them now?", function () {
                  _appendOptions(
                    ["Yes \u2014 review escalated items", "View all Order Confirmations"],
                    function (idx) {
                      if (idx === 0) _runScenario5(); else _viewAllOCs();
                    }
                  );
                });
              }, 700);
            }
          );
        });
      });
    }

    function _overrideNetworkHW() {
      _showDots(function () {
        _typeReply(
          "Understood \u2014 I\u2019ll confirm Network HW for full qty 20 as a back-order split delivery. " +
          "Pump Housing and Server Unit will use Joule\u2019s suggestions.",
          function () {
            _showStatus("Generating OC documents with your override\u2026", 1400, function () {
              _typeReply(
                "Done \u2014 OC-100208 confirmed for 20 units (back-order). OC-100209 confirmed Apr 29.",
                function () {
                  _typeBoldReply("2 escalated items still need your attention. Handle them now?", function () {
                    _appendOptions(
                      ["Yes \u2014 review escalated items", "View all Order Confirmations"],
                      function (idx) {
                        if (idx === 0) _runScenario5(); else _viewAllOCs();
                      }
                    );
                  });
                }
              );
            });
          }
        );
      });
    }

    function _rejectPumpHousing() {
      _showDots(function () {
        _typeReply(
          "I\u2019ll send a request to the buyer to extend the Need By date for Pump Housing. " +
          "The other 2 items will be confirmed with Joule\u2019s suggestions.",
          function () {
            _showStatus("Sending buyer change request for PO 4500123406\u2026", 1000, function () {
              _typeReply(
                "Buyer notified. OC-100208 (Network HW \u2014 18 units) and OC-100209 (Server Unit) have been confirmed.",
                function () {
                  _typeBoldReply("2 escalated items still need your attention. Handle them now?", function () {
                    _appendOptions(
                      ["Yes \u2014 review escalated items", "View all Order Confirmations"],
                      function (idx) {
                        if (idx === 0) _runScenario5(); else _viewAllOCs();
                      }
                    );
                  });
                }
              );
            });
          }
        );
      });
    }

    /* ─── Scenario 5: Escalated items ─── */
    function _runScenario5() {
      _showDots(function () {
        _showStatus("Retrieving escalation details from buyer system\u2026", 1400, function () {
          _typeReply(
            "The 2 escalated items have been flagged by buyers due to high cancel risk. Here are the details:",
            function () {
              var card = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Escalated Items \u2014 Buyer-Flagged High Cancel Risk' +
                '</div>' +
                '<div class="bn-joule-card-row" style="background:#fff3e0;padding:5px 12px;">' +
                  '<span class="bn-joule-card-col-label">ORDER / LINE</span>' +
                  '<span class="bn-joule-card-col-label" style="padding:0 8px;">ISSUE</span>' +
                  '<span class="bn-joule-card-col-label" style="text-align:right;">RISK LEVEL</span>' +
                '</div>' +
                '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">4500123403 / 10</span>' +
                  '<span class="bn-joule-card-desc">Control Panel \u2014 5 units<br>Buyer needs by Apr 20, you can ship Apr 25</span>' +
                  '<span class="bn-joule-card-ship" style="color:#bb0000;font-size:12px;font-weight:700;">HIGH</span>' +
                '</div>' +
                '<div class="bn-joule-card-row">' +
                  '<span class="bn-joule-card-order">4500123408 / 10</span>' +
                  '<span class="bn-joule-card-desc">Bracket Set \u2014 60 units<br>Price variance \u22654% above tolerance</span>' +
                  '<span class="bn-joule-card-ship" style="color:#bb0000;font-size:12px;font-weight:700;">HIGH</span>' +
                '</div>' +
                '<div class="bn-joule-card-footer">Both buyers have issued cancellation warnings \u2014 immediate response required</div>'
              );
              _fadeIn(card);

              setTimeout(function () {
                _typeBoldReply("How would you like to respond to the Control Panel escalation (PO 4500123403)?", function () {
                  _appendOptions(
                    [
                      "Confirm 50% partial (3 units) now, rest in back-order",
                      "Accept cancel risk \u2014 confirm Apr 25 delivery as-is",
                      "Escalate to account manager for buyer negotiation"
                    ],
                    function (idx) {
                      if (idx === 0) {
                        _handleEscalationPartial();
                      } else if (idx === 1) {
                        _handleEscalationFull();
                      } else {
                        _handleEscalationManager();
                      }
                    }
                  );
                });
              }, 700);
            }
          );
        });
      });
    }

    function _handleEscalationPartial() {
      _showDots(function () {
        _showStatus("Generating split delivery OC for Control Panel\u2026", 1400, function () {
          _showStatus("Processing Bracket Set price adjustment\u2026", 1000, function () {
            _typeReply(
              "Both escalations resolved. OC split confirmed for Control Panel and price accepted for Bracket Set.",
              function () {
                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Escalation Resolved \u2014 2 Final OC Documents' +
                  '</div>' +
                  [
                    ["OC-100210", "4500123403 / 10", "Control Panel \u2014 3 units + back-order"],
                    ["OC-100211", "4500123408 / 10", "Bracket Set \u2014 60 units (adjusted price)"]
                  ].map(function (r) {
                    return '<div class="bn-joule-card-row">' +
                      '<span class="bn-joule-card-order">' + r[0] + '</span>' +
                      '<span class="bn-joule-card-desc">' + r[1] + '</span>' +
                      '<span class="bn-joule-card-ship"><span class="bn-joule-confirm-label">Sent</span></span>' +
                    '</div>';
                  }).join("") +
                  '<div class="bn-joule-card-footer">All 12 items processed \u2014 11 confirmed, 1 escalated to account manager</div>'
                );
                _fadeIn(card);

                /* Session summary */
                setTimeout(function () {
                  _typeReply(
                    "Session complete! Here\u2019s your summary: 11 order confirmation documents generated across 3 waves. " +
                    "All auto-confirm rules applied. 2 partial deliveries negotiated. 1 buyer price variance accepted. " +
                    "Your workbench has been updated.",
                    function () {
                      _typeBoldReply("What would you like to do next?", function () {
                        _appendOptions(
                          [
                            "View all Order Confirmations",
                            "Configure auto-confirm rules for next week",
                            "Export confirmation summary to spreadsheet"
                          ],
                          function (idx) {
                            if (idx === 0) _viewAllOCs();
                            else if (idx === 1) _runScenario1();
                            else {
                              _showDots(function () {
                                _typeReply(
                                  "Exporting order confirmation summary\u2026 your spreadsheet will be ready in a moment.",
                                  function () { _unlockInput(); }
                                );
                              });
                            }
                          }
                        );
                      });
                    }
                  );
                }, 800);
              }
            );
          });
        });
      });
    }

    function _handleEscalationFull() {
      _showDots(function () {
        _showStatus("Generating OC for Apr 25 delivery \u2014 flagging buyer of delay\u2026", 1400, function () {
          _typeReply(
            "OC-100210 confirmed for Apr 25 delivery. Buyer has been notified of the delay with a formal apology note.",
            function () {
              _showStatus("Processing Bracket Set price adjustment\u2026", 1000, function () {
                _typeReply(
                  "OC-100211 confirmed for Bracket Set with accepted price. All 12 items are now processed.",
                  function () {
                    _typeBoldReply("Session complete. What would you like to do?", function () {
                      _appendOptions(
                        ["View all Order Confirmations", "Export summary"],
                        function (idx) {
                          if (idx === 0) _viewAllOCs();
                          else {
                            _showDots(function () {
                              _typeReply("Exporting order confirmation summary\u2026", function () { _unlockInput(); });
                            });
                          }
                        }
                      );
                    });
                  }
                );
              });
            }
          );
        });
      });
    }

    function _handleEscalationManager() {
      _showDots(function () {
        _typeReply(
          "I\u2019ve escalated the Control Panel order to your account manager. " +
          "A summary with buyer communications has been sent. " +
          "The Bracket Set has been confirmed with adjusted pricing.",
          function () {
            _showStatus("Notifying account manager team\u2026", 1000, function () {
              _typeBoldReply("What would you like to do next?", function () {
                _appendOptions(
                  ["View all Order Confirmations", "Export summary"],
                  function (idx) {
                    if (idx === 0) _viewAllOCs();
                    else {
                      _showDots(function () {
                        _typeReply("Exporting order confirmation summary\u2026", function () { _unlockInput(); });
                      });
                    }
                  }
                );
              });
            });
          }
        );
      });
    }

    /* ─── Review & confirm pending POs (triggered after rules flow) ─── */
    function _runReviewPendingPOs() {
      _showDots(function () {
        _showStatus("Analysing your pending purchase orders\u2026", 1400, function () {
          _showStatus("Checking auto-confirm rules and supplier scores\u2026", 1200, function () {
            _typeReply(
              "I\u2019ve analyzed your 14 pending items across 6 POs against your Lightweight Rules and buyer scoring. Here\u2019s what I found:",
              function () {
                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Order Confirmation Analysis \u2014 This Week' +
                  '</div>' +
                  '<div class="bn-joule-card-row" style="display:block;padding:10px 16px 6px;">' +
                    '<div style="color:#256f3a;font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:16px;color:#256f3a;">&#xe1c1;</span>' +
                      '7 items ready to auto-confirm' +
                    '</div>' +
                    '<div style="color:#556b82;font-size:13px;padding-left:22px;">All pass Lightweight Rules (\u2265 85%) and buyer score \u2265 85.</div>' +
                  '</div>' +
                  '<div class="bn-joule-card-row" style="display:block;padding:6px 16px;">' +
                    '<div style="color:#e76500;font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:16px;color:#e76500;">&#xe094;</span>' +
                      '4 items need your review' +
                    '</div>' +
                    '<div style="color:#556b82;font-size:13px;padding-left:22px;">Buyer score 60\u201384 or value above threshold. I suggest partial qty for 3 items.</div>' +
                  '</div>' +
                  '<div class="bn-joule-card-row" style="display:block;padding:6px 16px 10px;border-bottom:none;">' +
                    '<div style="color:#bb0000;font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:16px;color:#bb0000;">&#xe1ac;</span>' +
                      '2 items should be escalated' +
                    '</div>' +
                    '<div style="color:#556b82;font-size:13px;padding-left:22px;">Buyer score < 60 or prior rejection history.</div>' +
                  '</div>'
                );
                _fadeIn(card);
                setTimeout(function () {
                  _typeReply(
                    "Your items are organized by delivery wave in the Items to Confirm tile.",
                    function () {
                      _typeBoldReply("Which approach would you like to take?", function () {
                      _appendOptions(
                        [
                          "Confirm all 7 auto-confirm items now",
                          "Confirm by delivery wave",
                          "Review all items before confirming"
                        ],
                        function (idx) {
                          if (idx === 0) {
                            _confirmAll7Preview();
                          } else {
                            _confirmAll7Preview();
                          }
                        }
                      );
                      });
                    }
                  );
                }, 600);
              }
            );
          });
        });
      });
    }

    /* ─── Confirm all 7 preview ─── */
    function _confirmAll7Preview() {
      _showDots(function () {
        _showStatus("Preparing confirmation preview\u2026", 1200, function () {
          _showStatus("Validating items against current rules\u2026", 900, function () {
            _typeReply(
              "I\u2019m about to auto-confirm the following 7 items across 4 POs:",
              function () {
                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Auto-Confirm Preview \u2014 7 Items' +
                  '</div>' +

                  /* Wave 1 header */
                  '<div style="padding:8px 12px 4px 12px;font-size:12px;font-weight:700;color:#1d2d3e;' +
                      'background:#f7f9fb;border-bottom:1px solid #eef1f4;display:flex;align-items:center;gap:6px;">' +
                    '<span style="font-family:SAP-icons;font-size:14px;color:#5d36ff;">&#xe1fe;</span>' +
                    'Wave: Mar 25 \u2013 31 <span style="font-weight:400;color:#556b82;margin-left:4px;">(4 items)</span>' +
                  '</div>' +
                  [
                    ["4500002512", "Ln 10 / SL 10", "TG-0011-A", "10 PCE", "Mar 28", "USD 10.00"],
                    ["4500002512", "Ln 20 / SL 10", "TG-0012-B", "15 PCE", "Mar 28", "EUR 14.75"],
                    ["4500002446", "Ln 20 / SL 10", "TG-0012-B", "7 PCE",  "Mar 29", "EUR 14.75"],
                    ["4500002435", "Ln 20 / SL 20", "TG-0012-B", "20 PCE", "Mar 30", "EUR 14.75"]
                  ].map(function (r) {
                    return '<div style="display:grid;grid-template-columns:90px 80px 90px 60px 60px 72px;' +
                               'gap:0;padding:6px 12px;border-bottom:1px solid #eef1f4;font-size:12px;align-items:center;">' +
                      '<span style="color:#0064d9;font-weight:600;">' + r[0] + '</span>' +
                      '<span style="color:#556b82;">' + r[1] + '</span>' +
                      '<span style="color:#1d2d3e;font-weight:500;">' + r[2] + '</span>' +
                      '<span style="color:#556b82;">' + r[3] + '</span>' +
                      '<span style="color:#556b82;">Est. ' + r[4] + '</span>' +
                      '<span style="color:#1d2d3e;font-weight:600;text-align:right;">' + r[5] + '</span>' +
                    '</div>';
                  }).join("") +

                  /* Wave 2 header */
                  '<div style="padding:8px 12px 4px 12px;font-size:12px;font-weight:700;color:#1d2d3e;' +
                      'background:#f7f9fb;border-top:1px solid #eef1f4;border-bottom:1px solid #eef1f4;display:flex;align-items:center;gap:6px;">' +
                    '<span style="font-family:SAP-icons;font-size:14px;color:#5d36ff;">&#xe1fe;</span>' +
                    'Wave: Apr 1 \u2013 7 <span style="font-weight:400;color:#556b82;margin-left:4px;">(3 items)</span>' +
                  '</div>' +
                  [
                    ["4500002459", "Ln 10 / SL 10", "TG-0011-A", "10 PCE", "Apr 2", "EUR 10.00"],
                    ["4500002497", "Ln 10 / SL 10", "MAT-2847",  "5 PCE",  "Apr 3", "EUR 89.50"],
                    ["4500002504", "Ln 10 / SL 10", "TG-0011-A", "10 PCE", "Apr 5", "USD 10.00"]
                  ].map(function (r) {
                    return '<div style="display:grid;grid-template-columns:90px 80px 90px 60px 60px 72px;' +
                               'gap:0;padding:6px 12px;border-bottom:1px solid #eef1f4;font-size:12px;align-items:center;">' +
                      '<span style="color:#0064d9;font-weight:600;">' + r[0] + '</span>' +
                      '<span style="color:#556b82;">' + r[1] + '</span>' +
                      '<span style="color:#1d2d3e;font-weight:500;">' + r[2] + '</span>' +
                      '<span style="color:#556b82;">' + r[3] + '</span>' +
                      '<span style="color:#556b82;">Est. ' + r[4] + '</span>' +
                      '<span style="color:#1d2d3e;font-weight:600;text-align:right;">' + r[5] + '</span>' +
                    '</div>';
                  }).join("") +

                  /* Footer summary */
                  '<div style="padding:8px 12px;font-size:12px;color:#556b82;background:#f7f9fb;' +
                      'border-top:1px solid #eef1f4;display:flex;gap:16px;">' +
                    '<span><b style="color:#1d2d3e;">Total value:</b> $1,243.75</span>' +
                    '<span><b style="color:#1d2d3e;">Buyer scores:</b> 86\u201394</span>' +
                    '<span><b style="color:#1d2d3e;">LW Rule:</b> 90\u201398%</span>' +
                  '</div>'
                );
                _fadeIn(card);
                setTimeout(function () {
                  _typeBoldReply("Should I proceed with confirming all 7 items?", function () {
                    _appendOptions(
                      ["Yes", "No"],
                      function (idx) {
                        if (idx === 0) { _confirmAll7Execute(); } else { _unlockInput(); }
                      }
                    );
                  });
                }, 600);
              }
            );
          });
        });
      });
    }

    /* ─── Confirm all 7 — execute ─── */
    function _confirmAll7Execute() {
      _showDots(function () {
        _showStatus("Generating Order Confirmation documents\u2026", 1400, function () {
          _showStatus("Submitting to SAP Business Network\u2026", 1100, function () {
            var successBubble = _appendBubble("bn-joule-bubble",
              '<span style="color:#256f3a;font-weight:700;">' +
                '<span style="font-family:SAP-icons;font-size:14px;vertical-align:-1px;">&#xe1c1;</span>' +
                ' Done! I\u2019ve generated 4 Order Confirmations and submitted them to SBN:' +
              '</span>'
            );
            _fadeIn(successBubble);

            var card = _appendBubble("bn-joule-result-card",
              '<div class="bn-joule-card-header">' +
                '<div class="bn-joule-card-header-dot"></div>' +
                'Order Confirmations Submitted \u2014 7 Items' +
              '</div>' +
              [
                ["OC-4500002512", "2 lines confirmed", "Best Run Buyer", "Newark, NJ"],
                ["OC-4500002446", "1 line confirmed",  "Best Run Buyer", "Newark, NJ"],
                ["OC-4500002435", "1 line confirmed",  "Best Run Buyer", "Chicago, IL"],
                ["OC-4500002459", "1 line confirmed",  "Best Run Buyer", "Newark, NJ"],
                ["OC-4500002497", "1 line confirmed",  "Best Run Buyer", "Munich, DE"],
                ["OC-4500002504", "1 line confirmed",  "Best Run Buyer", "Newark, NJ"]
              ].map(function (r) {
                return '<div class="bn-joule-card-row" style="grid-template-columns:110px 1fr 1fr;">' +
                  '<span class="bn-joule-card-order" style="color:#0064d9;font-weight:600;">' + r[0] + '</span>' +
                  '<span class="bn-joule-card-desc">' +
                    '<span style="font-weight:600;color:#1d2d3e;">' + r[2] + '</span>' +
                    '<span style="color:#556b82;font-size:12px;"> \u2014 ' + r[3] + '</span>' +
                  '</span>' +
                  '<span class="bn-joule-card-ship" style="color:#556b82;font-size:12px;">' + r[1] + '</span>' +
                '</div>';
              }).join("") +
              '<div class="bn-joule-card-footer" style="color:#556b82;">' +
                '<span style="font-family:SAP-icons;font-size:12px;color:#e76500;vertical-align:-1px;">&#xe094;</span>' +
                ' 24-hour review window is active. You can amend any confirmation from the Order Confirmations tile.' +
              '</div>'
            );
            _fadeIn(card);

            /* Remove the 7 confirmed rows from SRC and refresh table + KPI tile */
            var confirmedOrders = ["4500123401","4500123402","4500123403","4500123404"];
            for (var i = SRC.length - 1; i >= 0; i--) {
              var po = SRC[i].orderNumber;
              if (po === "4500123401" || po === "4500123402" || po === "4500123403") {
                SRC.splice(i, 1);
              } else if (po === "4500123404" && SRC[i].lineNumber === "10") {
                SRC.splice(i, 1);
              }
            }
            /* Refresh table */
            _applyTableGrouping();
            /* Update KPI tile */
            var newCount = SRC.length;
            var tileEl = document.querySelector(".bn-kpi-tile[data-key='itemsToConfirm'] .bn-kpi-value");
            if (tileEl) { tileEl.textContent = newCount; }
            var tileData = OC_KPI_TILES.find(function (t) { return t.key === "itemsToConfirm"; });
            if (tileData) { tileData.value = newCount; }

            setTimeout(function () {
              _typeBoldReply("7 of your 14 items still need attention. How would you like to proceed?", function () {
                _appendOptions(
                  [
                    "Review the remaining 4 items that need attention",
                    "Handle the 2 escalated items",
                    "View generated Order Confirmations"
                  ],
                  function (idx) {
                    if (idx === 0) { _reviewRemaining4(); } else if (idx === 2) { _viewAllOCs(); } else { _unlockInput(); }
                  }
                );
              });
            }, 600);
          });
        });
      });
    }

    /* ─── Review remaining 4 items ─── */
    function _reviewRemaining4() {
      _showDots(function () {
        _showStatus("Retrieving item details and buyer history\u2026", 1300, function () {
          _showStatus("Generating adjustment suggestions\u2026", 1000, function () {
            _typeReply(
              "Here are the 4 items that need your review. I\u2019ve prepared suggestions for each based on buyer history and Lightweight Rules:",
              function () {

                function _itemBlock(po, ln, sl, buyer, city, score, rule, suggestions) {
                  return '<div style="border-bottom:1px solid #eef1f4;padding:10px 14px 8px;">' +
                    '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:4px;">' +
                      '<span style="font-size:12px;font-weight:700;color:#0064d9;">' + po + '</span>' +
                      '<span style="font-size:11px;color:#556b82;">' + buyer + ' \u2014 ' + city + '</span>' +
                    '</div>' +
                    '<div style="font-size:12px;color:#556b82;margin-bottom:6px;">' +
                      'Ln ' + ln + ' / SL ' + sl +
                      ' &nbsp;\u00b7&nbsp; Buyer score: <b style="color:#e76500;">' + score + '/100</b>' +
                      ' &nbsp;\u00b7&nbsp; LW Rule: <b style="color:#e76500;">' + rule + '</b>' +
                    '</div>' +
                    suggestions.map(function (s) {
                      return '<div style="display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#1d2d3e;margin-bottom:3px;">' +
                        '<span style="font-family:SAP-icons;font-size:13px;color:#556b82;flex-shrink:0;margin-top:1px;">' + s.icon + '</span>' +
                        '<span><b>' + s.label + ':</b> ' + s.text + '</span>' +
                      '</div>';
                    }).join("") +
                  '</div>';
                }

                var card = _appendBubble("bn-joule-result-card",
                  '<div class="bn-joule-card-header">' +
                    '<div class="bn-joule-card-header-dot"></div>' +
                    'Items Requiring Review \u2014 Joule Suggestions' +
                  '</div>' +

                  _itemBlock("PO 4500002501", "20", "10", "Acme Corp", "Tokyo, JP", "72", "65%", [
                    { icon: "&#xe16a;", label: "Qty",   text: "Confirm 16 of 20 PCE (80%) \u2014 buyer cancel rate 12%" },
                    { icon: "&#xe22a;", label: "Date",  text: "Apr 10 <span style='color:#556b82;'>(was Apr 6)</span> \u2014 lead time buffer needed" },
                    { icon: "&#xe286;", label: "Split", text: "16 PCE on Apr 10 + 4 PCE on Apr 17" }
                  ]) +

                  _itemBlock("PO 4500002501", "30", "10", "Acme Corp", "Tokyo, JP", "72", "58%", [
                    { icon: "&#xe16a;", label: "Qty",   text: "Confirm 40 of 50 PCE (80%)" },
                    { icon: "&#xe22a;", label: "Date",  text: "Apr 12 <span style='color:#556b82;'>(was Apr 6)</span>" },
                    { icon: "&#xe286;", label: "Split", text: "40 PCE on Apr 12 + 10 PCE on Apr 19" }
                  ]) +

                  _itemBlock("PO 4500002502", "10", "10", "Initech GmbH", "Munich, DE", "68", "52%", [
                    { icon: "&#xe16a;", label: "Qty",   text: "Confirm 12 of 15 PCE (80%)" },
                    { icon: "&#xe22a;", label: "Date",  text: "Apr 14 <span style='color:#556b82;'>(was Apr 8)</span>" },
                    { icon: "&#xe286;", label: "Split", text: "12 PCE on Apr 14 + 3 PCE on Apr 21" },
                    { icon: "&#xe033;", label: "Price", text: "EUR 238.00 <span style='color:#556b82;'>(was EUR 245.00)</span> \u2014 contract price mismatch" }
                  ]) +

                  _itemBlock("PO 4500002502", "20", "10", "Initech GmbH", "Munich, DE", "68", "48%", [
                    { icon: "&#xe16a;", label: "Qty",   text: "Confirm 6 of 8 PCE (75%)" },
                    { icon: "&#xe22a;", label: "Date",  text: "Apr 15 <span style='color:#556b82;'>(was Apr 8)</span>" },
                    { icon: "&#xe033;", label: "Price", text: "EUR 305.00 <span style='color:#556b82;'>(was EUR 312.00)</span>" }
                  ]) +

                  '<div class="bn-joule-card-footer" style="color:#556b82;">' +
                    'Suggestions are based on buyer cancel history, lead times, and contract pricing.' +
                  '</div>'
                );
                _fadeIn(card);

                setTimeout(function () {
                  _typeBoldReply("How do you want to proceed?", function () {
                    _appendOptions(
                      [
                        "Accept all suggestions as-is",
                        "Accept suggestions but modify one item",
                        "Confirm all at full quantity instead"
                      ],
                      function (idx) {
                        if (idx === 0) { _acceptAllSuggestions(); }
                        else if (idx === 1) { _modifyOneItem(); }
                        else { _unlockInput(); }
                      }
                    );
                  });
                }, 600);
              }
            );
          });
        });
      });
    }

    /* ─── Modify one item: ask which ─── */
    function _modifyOneItem() {
      _showDots(function () {
        _typeBoldReply(
          "Which item would you like to adjust? Please specify the PO number and line, along with the change you\u2019d like to make.",
          function () {
            _awaitModifyItem = true;
            var inputEl = document.getElementById("oc-joule-input");
            if (inputEl) {
              inputEl.addEventListener("click", function _onModifyClick() {
                inputEl.removeEventListener("click", _onModifyClick);
                setTimeout(function () {
                  _bnAutoType("PO 4500002502 line 10 to full quantity at the suggested date", null);
                }, 350);
              });
            }
            _unlockInput();
          }
        );
      });
    }

    /* ─── Modify one item: execute ─── */
    function _modifyOneItemExecute() {
      _showDots(function () {
        _showStatus("Applying your change to PO 4500002502 line 10\u2026", 1100, function () {
          _showStatus("Generating Order Confirmation documents\u2026", 1200, function () {
            _showStatus("Submitting to SAP Business Network\u2026", 1000, function () {

              /* Success + 2 partial OCs */
              var ocBubble = _appendBubble("bn-joule-bubble",
                '<span style="color:#256f3a;font-weight:700;">' +
                  '<span style="font-family:SAP-icons;font-size:14px;vertical-align:-1px;">&#xe1c1;</span>' +
                  ' Done! 2 partial Order Confirmations generated:' +
                '</span>'
              );
              _fadeIn(ocBubble);

              var ocCard = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Order Confirmations Submitted \u2014 2 Items' +
                '</div>' +
                [
                  ["OC-4500002468", "Partial 5/10 PCE",  "Acme Corp", "Newark, NJ"],
                  ["OC-4500002469", "Partial 10/20 PCE", "Acme Corp", "Newark, NJ"]
                ].map(function (r) {
                  return '<div class="bn-joule-card-row" style="grid-template-columns:110px 1fr 1fr;">' +
                    '<span class="bn-joule-card-order" style="color:#0064d9;font-weight:600;">' + r[0] + '</span>' +
                    '<span class="bn-joule-card-desc">' +
                      '<span style="font-weight:600;color:#1d2d3e;">' + r[2] + '</span>' +
                      '<span style="color:#556b82;font-size:12px;"> \u2014 ' + r[3] + '</span>' +
                    '</span>' +
                    '<span class="bn-joule-card-ship" style="color:#556b82;font-size:12px;">' + r[1] + '</span>' +
                  '</div>';
                }).join("")
              );
              _fadeIn(ocCard);

              setTimeout(function () {
                /* Session complete summary */
                var summaryBubble = _appendBubble("bn-joule-bubble",
                  '<div style="display:flex;flex-direction:column;gap:5px;">' +
                    '<div style="font-weight:700;color:#256f3a;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:14px;vertical-align:-1px;">&#xe1c1;</span>' +
                      'All 14 items processed. Session complete.' +
                    '</div>' +
                    '<div style="height:1px;background:#eef1f4;margin:4px 0;"></div>' +
                    '<div style="font-size:13px;font-weight:700;color:#1d2d3e;margin-bottom:2px;">Summary</div>' +
                    '<div style="font-size:12px;color:#1d2d3e;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:13px;color:#256f3a;">&#xe1c1;</span>' +
                      '7 auto-confirmed (full quantity)' +
                    '</div>' +
                    '<div style="font-size:12px;color:#1d2d3e;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:13px;color:#e76500;">&#xe094;</span>' +
                      '4 partial confirmed (with split deliveries and price adjustments)' +
                    '</div>' +
                    '<div style="font-size:12px;color:#1d2d3e;display:flex;align-items:center;gap:6px;">' +
                      '<span style="font-family:SAP-icons;font-size:13px;color:#bb0000;">&#xe1ac;</span>' +
                      '2 partial confirmed at 50% (high-risk buyers)' +
                    '</div>' +
                    '<div style="height:1px;background:#eef1f4;margin:4px 0;"></div>' +
                    '<div style="font-size:12px;color:#556b82;">' +
                      'Processing time: 12 seconds \u00b7 Estimated time saved: ~1.5 hours' +
                    '</div>' +
                    '<div style="font-size:12px;color:#556b82;">' +
                      'Total value processed: $4,827.50 \u00b7 24-hour review window active' +
                    '</div>' +
                  '</div>'
                );
                _fadeIn(summaryBubble);

                setTimeout(function () {
                  _typeBoldReply("What would you like to do next?", function () {
                    _appendOptions(
                      [
                        "View all Order Confirmations",
                        "Download confirmation report"
                      ],
                      function (idx) {
                        if (idx === 0) { _viewAllOCs(); } else { _unlockInput(); }
                      }
                    );
                  });
                }, 600);
              }, 600);
            });
          });
        });
      });
    }

    /* ─── View all Order Confirmations ─── */
    function _viewAllOCs() {
      _showDots(function () {
        _showStatus("Navigating to Order Confirmations\u2026", 1100, function () {
          _showStatus("Loading submitted confirmations\u2026", 900, function () {

            /* ── OC data (6 items remaining after 7 auto-confirmed) ── */
            var OC_ROWS = [
              { ocNumber:"OC-4500002512", buyer:"Best Run Buyer", shipTo:"Newark, NJ",  lines:"1", qty:"50 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002512", buyer:"Best Run Buyer", shipTo:"Newark, NJ",  lines:"1", qty:"25 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002446", buyer:"Best Run Buyer", shipTo:"Newark, NJ",  lines:"1", qty:"10 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002435", buyer:"Best Run Buyer", shipTo:"Chicago, IL", lines:"1", qty:"10 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002459", buyer:"Best Run Buyer", shipTo:"Newark, NJ",  lines:"1", qty:"5 PCE",    confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002497", buyer:"Best Run Buyer", shipTo:"Munich, DE",  lines:"1", qty:"40 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" },
              { ocNumber:"OC-4500002504", buyer:"Best Run Buyer", shipTo:"Newark, NJ",  lines:"1", qty:"80 PCE",   confDate:"Mar 25, 2026", status:"Confirmed" }
            ];
            var ocCount = OC_ROWS.length; /* 7 */

            /* ── 1. Page title ── */
            var titleEl = document.querySelector(".bn-page-title");
            if (titleEl) { titleEl.textContent = "Order Confirmation"; }
            document.title = "Order Confirmation";

            /* ── 2. Force header expanded ── */
            if (_ocFilterCollapsed) { window._ocToggleFilters(); }

            /* ── 3. KPI tile: value = 6 ── */
            var kpiScroll = document.getElementById("oc-kpi-tiles-scroll");
            if (kpiScroll) {
              kpiScroll.innerHTML = _buildOcKpiTilesHtml([
                { key: "orderConfirmations", value: ocCount, title: "Order Confirmations", sub: "Last 24 hours", active: true }
              ]);
            }
            var kpiRowHeader = document.querySelector(".bn-kpi-row-header");
            if (kpiRowHeader) { kpiRowHeader.style.display = "none"; }
            var btnPrev = document.getElementById("oc-kpi-btn-prev");
            var btnNext = document.getElementById("oc-kpi-btn-next");
            if (btnPrev) { btnPrev.style.display = "none"; }
            if (btnNext) { btnNext.style.display = "none"; }

            /* ── 4. Keep filter bar visible; replace Creation Date input with "Last 24 hours" token ── */
            var filterWrap = document.getElementById("oc-filter-wrap");
            if (filterWrap) { filterWrap.style.display = ""; }

            /* Replace Creation Date placeholder with "Last 24 Hours" token */
            if (window._ocCreationDateInput) {
              window._ocCreationDateInput.removeAllTokens();
              window._ocCreationDateInput.addToken(new Token({ key: "last24h", text: "Last 24 Hours" }));
            }

            /* ── 5. Table: replace columns & data for OC list (no grouping) ── */
            /* Tear down manual grouping state */
            window._ocListMode = true;
            var oldFooter = document.getElementById("oc-load-more-wrap");
            if (oldFooter) { oldFooter.parentNode && oldFooter.parentNode.removeChild(oldFooter); }

            oOCTable.removeAllColumns();
            [
              "OC Number", "Buyer", "Ship-To", "Lines", "Qty Confirmed", "Conf. Date", "Status"
            ].forEach(function (h) {
              oOCTable.addColumn(new Column({ header: new Text({ text: h }) }));
            });

            oOCTable.setGrowing(true);
            oOCTable.setGrowingThreshold(10);
            oOCTable.setGrowingScrollToLoad(false);

            oOCModel.setProperty("/items", OC_ROWS);
            oOCTable.bindItems({
              path: "oc>/items",
              template: new ColumnListItem({
                type: "Navigation",
                cells: [
                  new Link({ text: "{oc>ocNumber}" }),
                  new Text({ text: "{oc>buyer}",    wrapping: false }),
                  new Text({ text: "{oc>shipTo}",   wrapping: false }),
                  new Text({ text: "{oc>lines}",    wrapping: false }),
                  new Text({ text: "{oc>qty}",      wrapping: false }),
                  new Text({ text: "{oc>confDate}", wrapping: false }),
                  new ObjectStatus({
                    text: "{oc>status}",
                    state: {
                      path: "oc>status",
                      formatter: function (s) {
                        return s === "Confirmed" ? "Success" : "Warning";
                      }
                    }
                  })
                ]
              })
            });

            if (oOCTableTitle) { oOCTableTitle.setText("Order Confirmations (" + ocCount + ")"); }

            /* ── 6. Activate 5th nav item from current (expense) ── */
            document.querySelectorAll(".bn-nav-item").forEach(function (el) {
              el.classList.remove("active");
              if (el.dataset.key === "expense") { el.classList.add("active"); }
            });

            setTimeout(function () {
              _typeBoldReply("How can I assist you next?", function () {
                _unlockInput();
              });
            }, 400);
          });
        });
      });
    }

    /* ─── Scenario 1: Configure grouping preferences ─── */
    function _runScenario1() {
      _showDots(function () {
        _showStatus("Loading current auto-confirm rule configuration\u2026", 1200, function () {
          _typeReply(
            "Here are your current auto-confirm rules. You can adjust the thresholds to control which items are auto-processed:",
            function () {
              var card = _appendBubble("bn-joule-result-card",
                '<div class="bn-joule-card-header">' +
                  '<div class="bn-joule-card-header-dot"></div>' +
                  'Auto-Confirm Rules \u2014 Current Settings' +
                '</div>' +
                [
                  ["Qty variance cap", "0%", "Exact match only"],
                  ["Price variance cap", "2.5%", "Within tolerance"],
                  ["Delivery window", "\u00b13 days", "Need By ±3"],
                  ["Supplier score min", "80/100", "Trusted suppliers"],
                  ["Max order value", "$10,000", "Per line item"],
                  ["Currency match", "Required", "No FX auto-confirm"]
                ].map(function (r) {
                  return '<div class="bn-joule-card-row" style="grid-template-columns:140px 1fr 1fr;">' +
                    '<span class="bn-joule-card-order" style="font-size:12px;">' + r[0] + '</span>' +
                    '<span class="bn-joule-card-desc" style="font-weight:700;color:#1d2d3e;">' + r[1] + '</span>' +
                    '<span class="bn-joule-card-ship" style="color:#556b82;">' + r[2] + '</span>' +
                  '</div>';
                }).join("") +
                '<div class="bn-joule-card-footer">These rules applied to 7 items in your last session</div>'
              );
              _fadeIn(card);

              setTimeout(function () {
                _typeBoldReply("Which rule would you like to adjust?", function () {
                  _appendOptions(
                    [
                      "Increase price variance cap to 5%",
                      "Lower supplier score minimum to 70",
                      "Expand delivery window to \u00b15 days",
                      "Keep current settings"
                    ],
                    function (idx) {
                      if (idx === 3) {
                        _typeReply("Settings kept unchanged. Ready for your next session.", function () { _unlockInput(); });
                      } else {
                        var changes = [
                          "Price variance cap updated to 5%. This will allow more items to auto-confirm even with minor price differences.",
                          "Supplier score minimum lowered to 70. More suppliers will qualify for auto-confirm.",
                          "Delivery window expanded to \u00b15 days. Items with small delivery shifts will be auto-confirmed."
                        ];
                        _showDots(function () {
                          _showStatus("Saving rule changes\u2026", 900, function () {
                            _typeReply(changes[idx], function () {
                              _typeBoldReply("Changes saved. What would you like to do next?", function () {
                                _appendOptions(
                                  ["View all Order Confirmations", "Run another confirmation session"],
                                  function (i2) {
                                    if (i2 === 0) _viewAllOCs();
                                    else _runScenario3();
                                  }
                                );
                              });
                            });
                          });
                        });
                      }
                    }
                  );
                });
              }, 700);
            }
          );
        });
      });
    }

    /* ─── Scenario thresholds (from option 3 in Scenario 3) ─── */
    function _scenarioThresholds() {
      _runScenario1();
    }

    /* ── Send message — entry point ── */
    function _sendMessage() {
      var input = document.getElementById("oc-joule-input");
      var send  = document.getElementById("oc-joule-send");
      if (!input || !input.value.trim()) return;
      var msg = input.value.trim();
      input.value = "";
      input.classList.remove("has-text");
      if (send) send.classList.remove("active");

      /* Transition welcome → body */
      var welcome = document.getElementById("oc-joule-welcome");
      var body    = document.getElementById("oc-joule-body");
      if (welcome && welcome.style.display !== "none") {
        welcome.style.display = "none";
        if (body) { body.style.display = "flex"; body.style.flexDirection = "column"; }
      }

      /* Timestamp + user bubble */
      _appendBubble("bn-joule-time", "<b>Today</b> " + _now());
      _appendBubble("bn-joule-user-bubble", msg);
      _scrollBottom();

      /* Route to correct scenario based on interaction phase */
      _lockInput();
      _scenarioPhase++;
      if (_scenarioPhase === 1) {
        _runScenario3GroupingInfo();
      } else if (_scenarioPhase === 2) {
        _runScenario3();
      } else if (_scenarioPhase === 3) {
        _runScenario2Rules();
      } else if (_scenarioPhase === 4) {
        _runScenario2RulesChange();
      } else if (msg.toLowerCase().indexOf("pending purchase orders") !== -1) {
        _runReviewPendingPOs();
      } else if (_awaitModifyItem && msg.toLowerCase().indexOf("4500002502") !== -1) {
        _awaitModifyItem = false;
        _modifyOneItemExecute();
      } else {
        /* Subsequent free-text: unlock and wait */
        _unlockInput();
      }
    }

    /* ── Init input wiring ── */
    function _initInput() {
      var input = document.getElementById("oc-joule-input");
      var send  = document.getElementById("oc-joule-send");
      if (!input) return;
      input.addEventListener("input", function () {
        input.classList.toggle("has-text", input.value.length > 0);
        if (send) send.classList.toggle("active", input.value.length > 0);
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") _sendMessage();
      });
      if (send) send.addEventListener("click", _sendMessage);
    }

    /* ── Helpers ── */
    function _appendBubble(cls, html) {
      var content = document.getElementById("oc-joule-content");
      if (!content) return null;
      var el = document.createElement("div");
      el.className = cls;
      el.innerHTML = html;
      content.appendChild(el);
      return el;
    }

    function _appendChips(labels) {
      var content = document.getElementById("oc-joule-content");
      if (!content) return;
      var wrap = document.createElement("div");
      wrap.className = "bn-joule-chips";
      labels.forEach(function (label) {
        var btn = document.createElement("button");
        btn.className = "bn-joule-chip";
        btn.textContent = label;
        btn.onclick = function () {
          wrap.remove();
          var input = document.getElementById("oc-joule-input");
          if (input) { input.value = label; }
          _sendMessage();
        };
        wrap.appendChild(btn);
      });
      content.appendChild(wrap);
      _scrollBottom();
    }

    function _scrollBottom() {
      var body = document.getElementById("oc-joule-body");
      if (body) body.scrollTop = body.scrollHeight;
    }

    function _now() {
      var d = new Date();
      var h = d.getHours(), m = d.getMinutes();
      var ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return h + ":" + (m < 10 ? "0" : "") + m + " " + ampm;
    }
  }


  /* ────────────────────────────────────────────────────────────
     KPI TILES DATA
  ──────────────────────────────────────────────────────────── */
  var OC_KPI_TILES = [
    { key: "orders",          value: 40,  title: "Orders",             sub: "This month",   active: false },
    { key: "itemsToConfirm",  value: 14,  title: "Items to confirm",   sub: "This month",   active: true  },
    { key: "itemsToShip",     value: 38,  title: "Items to ship",      sub: "This month",   active: false },
    { key: "returnItems",     value: 5,   title: "Return items",       sub: "This month",   active: false },
    { key: "newOrders",       value: 8,   title: "New orders",         sub: "This month",   active: false },
    { key: "changedOrders",   value: 3,   title: "Changed orders",     sub: "This month",   active: false },
    { key: "ordersToInvoice", value: 40,  title: "Orders to invoice",  sub: "This month",   active: false },
    { key: "serviceOrders",   value: 0,   title: "Orders with service line", sub: "This month", active: false },
    { key: "overdueInvoices", value: 40,  title: "Overdue invoices - Not approved", sub: "This month", active: false }
  ];

  function _buildOcKpiTilesHtml(aTiles) {
    return aTiles.map(function (t) {
      return '<div class="bn-kpi-tile' + (t.active ? " active" : "") + '" data-key="' + t.key + '">' +
        '<div><div class="bn-kpi-title">' + t.title + '</div>' +
        '<div class="bn-kpi-sub">' + t.sub + '</div></div>' +
        '<div class="bn-kpi-value">' + t.value + '</div>' +
        '</div>';
    }).join("");
  }

  function _updateOcKpiScroll() {
    var scroller = document.getElementById("oc-kpi-tiles-scroll");
    var btnPrev  = document.getElementById("oc-kpi-btn-prev");
    var btnNext  = document.getElementById("oc-kpi-btn-next");
    if (!scroller || !btnPrev || !btnNext) { return; }
    var overflows = scroller.scrollWidth > scroller.clientWidth + 2;
    var atStart   = scroller.scrollLeft <= 2;
    var atEnd     = scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 2;
    btnPrev.style.display = (overflows && !atStart) ? "flex" : "none";
    btnNext.style.display = (overflows && !atEnd)   ? "flex" : "none";
    scroller.style.paddingRight = overflows ? "48px" : "16px";
  }

  window._ocKpiPrev = function () {
    var t = document.getElementById("oc-kpi-tiles-scroll");
    if (t) { t.scrollLeft -= 200; setTimeout(_updateOcKpiScroll, 320); }
  };
  window._ocKpiNext = function () {
    var t = document.getElementById("oc-kpi-tiles-scroll");
    if (t) { t.scrollLeft += 200; setTimeout(_updateOcKpiScroll, 320); }
  };

  /* Collapse / Pin toggle */
  var _ocFilterCollapsed = false;
  window._ocToggleFilters = function () {
    _ocFilterCollapsed = !_ocFilterCollapsed;
    var kpi  = document.querySelector("#oc-header-panel .bn-kpi-row");
    if (kpi)  { kpi.style.display  = _ocFilterCollapsed ? "none" : ""; }
    var wrap = document.getElementById("oc-filter-wrap");
    if (wrap) { wrap.style.display = _ocFilterCollapsed ? "none" : ""; }
    var icon = document.getElementById("oc-collapse-icon");
    if (icon) { icon.innerHTML = _ocIcon(_ocFilterCollapsed ? 'slim-arrow-down' : 'slim-arrow-up'); }
    var btn  = document.getElementById("oc-collapse-btn");
    if (btn)  { btn.title = _ocFilterCollapsed ? "Expand filter bar" : "Collapse filter bar"; }
  };

  var _ocFilterPinned = false;
  window._ocTogglePin = function () {
    _ocFilterPinned = !_ocFilterPinned;
    var icon = document.getElementById("oc-pin-icon");
    if (icon) { icon.innerHTML = _ocIcon(_ocFilterPinned ? 'pushpin-on' : 'pushpin-off'); }
    var btn  = document.getElementById("oc-pin-btn");
    if (btn)  { btn.title = _ocFilterPinned ? "Unpin filter bar" : "Pin filter bar"; }
  };

  /* ────────────────────────────────────────────────────────────
     loadOCPage() — KPI tiles, filter bar, order table
  ──────────────────────────────────────────────────────────── */
  function loadOCPage(main) {

    /* Header panel */
    var headerWrap = document.createElement("div");
    headerWrap.className = "bn-header-panel";
    headerWrap.id = "oc-header-panel";
    main.appendChild(headerWrap);

    /* Page title */
    var titleEl = document.createElement("div");
    titleEl.className = "bn-page-title-row";
    titleEl.innerHTML = '<span class="bn-page-title">Workbench</span>';
    headerWrap.appendChild(titleEl);

    /* KPI row — carousel with prev/next buttons */
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
      '  <button id="oc-kpi-btn-prev" class="bn-kpi-scroll-btn prev" title="Previous" style="display:none"',
      '    onclick="window._ocKpiPrev&&window._ocKpiPrev()">',
      '    ' + _ocIcon("slim-arrow-left",14),
      '  </button>',
      '  <div class="bn-kpi-tiles" id="oc-kpi-tiles-scroll" style="overflow-x:scroll;overflow-y:hidden;flex:1;min-width:0;">',
      _buildOcKpiTilesHtml(OC_KPI_TILES),
      '  </div>',
      '  <button id="oc-kpi-btn-next" class="bn-kpi-scroll-btn next" title="Next" style="display:none"',
      '    onclick="window._ocKpiNext&&window._ocKpiNext()">',
      '    ' + _ocIcon("slim-arrow-right",14),
      '  </button>',
      '</div>'
    ].join("");
    requestAnimationFrame(function () {
      _updateOcKpiScroll();
      var scroller = document.getElementById("oc-kpi-tiles-scroll");
      if (scroller) {
        scroller.addEventListener("scroll", _updateOcKpiScroll);
      }
      document.addEventListener("click", function (e) {
        var tile = e.target.closest(".bn-kpi-tile");
        if (!tile) return;
        var key = tile.getAttribute("data-key");
        if (key === "orders")      { e.stopImmediatePropagation(); window.location.replace(window.location.href.replace(/\/[^\/]*\/[^\/]*$/, "/index.html")); return; }
        if (key === "itemsToShip") { e.stopImmediatePropagation(); window.location.replace(window.location.href.replace(/\/[^\/]*\/[^\/]*$/, "/ASN-Joule-Demo/index.html")); return; }
        if (!scroller) { return; }
        scroller.querySelectorAll(".bn-kpi-tile").forEach(function (t) { t.classList.remove("active"); });
        tile.classList.add("active");
      }, true); // capturing phase
      if (window.ResizeObserver) {
        new ResizeObserver(_updateOcKpiScroll).observe(scroller);
      } else {
        window.addEventListener("resize", _updateOcKpiScroll);
      }
    });

    /* Filter bar */
    var filterWrap = document.createElement("div");
    filterWrap.id = "oc-filter-wrap";
    filterWrap.className = "bn-filter-bar";
    filterWrap.innerHTML =
      '<div class="bn-filter-fields">' +

        /* Supplier — sap.m.Input placeholder */
        '<div class="bn-filter-field">' +
          '<div class="bn-filter-label">Supplier:</div>' +
          '<div id="oc-f-supplier-wrap"></div>' +
        '</div>' +

        /* Purchase Order Numbers — sap.m.Input placeholder */
        '<div class="bn-filter-field">' +
          '<div class="bn-filter-label">Purchase Order Numbers:</div>' +
          '<div id="oc-f-po-wrap"></div>' +
        '</div>' +

        /* Creation Date — sap.m.MultiInput placeholder (control placed below) */
        '<div class="bn-filter-field">' +
          '<div class="bn-filter-label">Creation Date:</div>' +
          '<div id="oc-f-creation-wrap"></div>' +
        '</div>' +

        /* Need By — sap.m.MultiInput placeholder */
        '<div class="bn-filter-field">' +
          '<div class="bn-filter-label">Need By:</div>' +
          '<div id="oc-f-needby-wrap"></div>' +
        '</div>' +

        '<div class="bn-filter-footer">' +
          '<div class="bn-filter-actions">' +
            '<button class="bn-action-btn bn-action-emphasized" onclick="window._ocApplyFilters&&window._ocApplyFilters()">Apply</button>' +
            '<button class="bn-action-btn bn-action-default"    onclick="window._ocClearFilters&&window._ocClearFilters()">Clear</button>' +
            '<button class="bn-action-btn bn-action-transparent">Adapt Filters</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    headerWrap.appendChild(filterWrap);

    /* Place sap.m controls into their placeholder divs */
    var oFSupplier = new Input({ width: "100%", placeholder: "Search supplier" });
    oFSupplier.placeAt("oc-f-supplier-wrap");
    window._ocSupplierInput = oFSupplier;

    var oFPO = new Input({ width: "100%", placeholder: "Search PO number" });
    oFPO.placeAt("oc-f-po-wrap");
    window._ocPOInput = oFPO;

    var oFCreationDate = new MultiInput({ width: "100%", placeholder: "Select a date" });
    oFCreationDate.placeAt("oc-f-creation-wrap");
    window._ocCreationDateInput = oFCreationDate;

    var oFNeedBy = new MultiInput({ width: "100%", placeholder: "Select a date" });
    oFNeedBy.placeAt("oc-f-needby-wrap");
    window._ocNeedByInput = oFNeedBy;

    /* Collapse button */
    var collapseBtn = document.createElement("button");
    collapseBtn.id = "oc-collapse-btn";
    collapseBtn.className = "bn-indication-btn";
    collapseBtn.title = "Collapse filter bar";
    collapseBtn.setAttribute("onclick", "window._ocToggleFilters&&window._ocToggleFilters()");
    collapseBtn.innerHTML = '<span id="oc-collapse-icon">' + _ocIcon("slim-arrow-up") + '</span>';
    headerWrap.appendChild(collapseBtn);

    /* Pin button */
    var pinBtn = document.createElement("button");
    pinBtn.id = "oc-pin-btn";
    pinBtn.className = "bn-indication-btn";
    pinBtn.title = "Pin filter bar";
    pinBtn.setAttribute("onclick", "window._ocTogglePin&&window._ocTogglePin()");
    pinBtn.innerHTML = '<span id="oc-pin-icon">' + _ocIcon("pushpin-off") + '</span>';
    headerWrap.appendChild(pinBtn);

    /* Gap */
    var gapDiv = document.createElement("div");
    gapDiv.className = "bn-content-gap";
    main.appendChild(gapDiv);

    // ── Table ──
    var contentWrap = document.createElement("div");
    contentWrap.className = "bn-content sapUiSizeCompact";
    main.appendChild(contentWrap);
    oOCTable.placeAt(contentWrap);


    // Apply default grouping: Delivery date — Weekly, no secondary
    oOCTable.attachEventOnce("updateFinished", function () {
      if (window._ocSetGrouping) {
        window._ocSetGrouping("needby-weekly", null);
      }
    });

    // Multi-select PO dropdown logic
    window._ocPoDropdown = function (e) {
      e.stopPropagation();
      var dd = document.getElementById("oc-f-po-dd");
      if (!dd) return;
      var isOpen = dd.classList.contains("open");
      dd.classList.toggle("open", !isOpen);
      if (!isOpen) {
        dd.querySelectorAll("input[type=checkbox]").forEach(function (cb) {
          cb.onchange = window._ocPoTokenUpdate;
        });
        // close on outside click
        setTimeout(function () {
          document.addEventListener("click", function _close(ev) {
            if (!document.getElementById("oc-f-po-wrap").contains(ev.target)) {
              dd.classList.remove("open");
              document.removeEventListener("click", _close);
            }
          });
        }, 0);
      }
    };

    window._ocPoTokenUpdate = function () {
      var box = document.getElementById("oc-f-po-box");
      var ph  = document.getElementById("oc-f-po-ph");
      if (!box) return;
      box.querySelectorAll(".bn-filter-multisel-token").forEach(function (t) { t.remove(); });
      var checked = document.querySelectorAll("#oc-f-po-dd input[type=checkbox]:checked");
      if (checked.length === 0) {
        if (ph) ph.style.display = "";
      } else {
        if (ph) ph.style.display = "none";
        checked.forEach(function (cb) {
          var tok = document.createElement("span");
          tok.className = "bn-filter-multisel-token";
          tok.innerHTML = cb.value +
            '<button class="bn-filter-multisel-token-del" onclick="window._ocPoRemove(\'' + cb.value + '\')">&#x2715;</button>';
          box.insertBefore(tok, ph);
        });
      }
    };

    window._ocPoRemove = function (val) {
      var cb = document.querySelector("#oc-f-po-dd input[value='" + val + "']");
      if (cb) { cb.checked = false; window._ocPoTokenUpdate(); }
    };

    // Filter logic
    window._ocApplyFilters = function () {
      var sSupplier = window._ocSupplierInput ? window._ocSupplierInput.getValue().trim().toLowerCase() : "";
      var aPO       = Array.from(document.querySelectorAll("#oc-f-po-dd input[type=checkbox]:checked")).map(function(c){return c.value;});
      var sCreation = ""; /* creation date filter via sap.m.MultiInput token — not used in demo filtering */
      var sNeedBy   = window._ocNeedByInput ? window._ocNeedByInput.getValue() : "";
      _filtered = SRC.filter(function (o) {
        if (sSupplier && o.supplier  && o.supplier.toLowerCase().indexOf(sSupplier) < 0) return false;
        if (aPO.length && o.orderNumber && aPO.indexOf(o.orderNumber) < 0) return false;
        if (sCreation && o.creationDate && o.creationDate < sCreation) return false;
        if (sNeedBy   && o.needByDate  && o.needByDate   < sNeedBy)   return false;
        return true;
      });
      window._ocApplyFiltersToTable(_filtered);
    };

    window._ocClearFilters = function () {
      if (window._ocSupplierInput)    { window._ocSupplierInput.setValue(""); }
      if (window._ocPOInput)          { window._ocPOInput.setValue(""); }
      if (window._ocCreationDateInput){ window._ocCreationDateInput.removeAllTokens(); }
      if (window._ocNeedByInput)      { window._ocNeedByInput.removeAllTokens(); }
      document.querySelectorAll("#oc-f-po-dd input[type=checkbox]").forEach(function (cb) { cb.checked = false; });
      window._ocPoTokenUpdate && window._ocPoTokenUpdate();
      _filtered = SRC.slice();
      window._ocApplyFiltersToTable(_filtered);
    };
  }

  /* ────────────────────────────────────────────────────────────
     MOUNT
  ──────────────────────────────────────────────────────────── */
  sap.ui.require(["sap/ui/core/Core"], function (Core) {
    var oContent = document.getElementById("content");
    if (!oContent) { return; }

    /* Apply flex column to content */
    oContent.style.cssText = "flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;";

    /* Shell — injected as raw innerHTML */
    var shellWrap = document.createElement("div");
    shellWrap.innerHTML = createShell();
    oContent.appendChild(shellWrap);

    /* App row: sidenav + main + joule */
    var appRow = document.createElement("div");
    appRow.className = "bn-app";
    appRow.style.flex = "1";
    appRow.style.minHeight = "0";
    oContent.appendChild(appRow);

    /* Side nav */
    var NAV_ITEMS = [
      { icon:"home.svg",           key:"home",        label:"Home" },
      { icon:"favorite-list.svg",  key:"favorites",   label:"Favorites" },
      { icon:"present.svg",        key:"present",     label:"Present" },
      { icon:"",                   key:"sapbox",      label:"", blank:true },
      { icon:"sap-box.svg",        key:"crm",         label:"CRM Sales",       active:true, hasArrow:true },
      { icon:"enablement.svg",     key:"product",     label:"Products",        hasArrow:true },
      { icon:"product.svg",        key:"sales",       label:"My Sales Orders", hasArrow:true },
      { icon:"my-sales-order.svg", key:"dimensions",  label:"Dimensions",      hasArrow:true },
      { icon:"dimension.svg",      key:"expense",     label:"Expense Report",  hasArrow:true },
      { icon:"expense-report.svg", key:"money",       label:"Money Bills",     hasArrow:true },
      { icon:"money-bills.svg",    key:"enable",      label:"Enablement",      hasArrow:true },
      { icon:"enablement.svg",     key:"opportunity", label:"Opportunities" },
      { icon:"opportunity.svg",    key:"bcard",       label:"Business Card" },
      { icon:"business-card.svg",  key:"bcard2",      label:"Business Card 2" }
    ];
    var navHtml = NAV_ITEMS.map(function (it) {
      var cls = "bn-nav-item" + (it.active ? " active" : "") + (it.hasArrow ? " has-arrow" : "");
      var iconHtml = it.blank ? "" : it.sapIcon
        ? '<span class="bn-nav-icon-wrap"><span style="font-family:\'SAP-icons\';speak:none;font-style:normal;font-weight:normal;font-size:16px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;line-height:1;">' + it.sapIcon + '</span></span>'
        : '<span class="bn-nav-icon-wrap">' + _ocIcon(it.icon.replace(".svg","")) + '</span>';
      var arrowHtml = it.hasArrow ?
        '<span class="bn-nav-arrow">' + _ocIcon("slim-arrow-right",12) + '</span>' : "";
      return '<button class="' + cls + '" title="' + it.label + '" data-key="' + it.key + '">' +
        '<span class="bn-nav-indicator"></span>' +
        iconHtml + arrowHtml +
        '</button>';
    }).join('');

    var sidenavDiv = document.createElement("div");
    sidenavDiv.innerHTML =
      '<div class="bn-sidenav">' +
        '<div class="bn-sidenav-content">' + navHtml + '</div>' +
        '<div class="bn-sidenav-footer">' +
          '<div class="bn-sidenav-sep"></div>' +
          '<button class="bn-footer-write" title="Write New">' + _ocIcon("write-new") + '</button>' +
          '<button class="bn-footer-icon"  title="Widgets">'   + _ocIcon("widgets")   + '</button>' +
        '</div>' +
      '</div>';
    appRow.appendChild(sidenavDiv.firstChild);

    /* Main wrapper */
    var mainWrap = document.createElement("div");
    mainWrap.className = "bn-main";
    mainWrap.id = "oc-main";
    appRow.appendChild(mainWrap);

    /* OC page content */
    loadOCPage(mainWrap);

    /* Joule panel */
    initJoule(appRow);
  });
});
