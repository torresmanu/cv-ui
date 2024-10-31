/*! For license information please see 2.bd4f3c45.chunk.js.LICENSE.txt */
(this.webpackJsonpCryptoVoice=this.webpackJsonpCryptoVoice||[]).push([[2],{440:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n(0),r=n(446);function i(){return o.useContext(r.a)}},620:function(e,t,n){"use strict";var o=n(1),r=n(58),i=n(4),a=n(0),s=n(5),c=n(161),u=n(440),f=n(8),p=n(145),l=a.forwardRef((function(e,t){var n=e.autoFocus,f=e.checked,l=e.checkedIcon,d=e.classes,m=e.className,h=e.defaultChecked,v=e.disabled,g=e.icon,b=e.id,w=e.inputProps,y=e.inputRef,O=e.name,x=e.onBlur,E=e.onChange,T=e.onFocus,j=e.readOnly,L=e.required,k=e.tabIndex,M=e.type,F=e.value,C=Object(i.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),N=Object(c.a)({controlled:f,default:Boolean(h),name:"SwitchBase",state:"checked"}),D=Object(r.a)(N,2),P=D[0],B=D[1],R=Object(u.a)(),S=v;R&&"undefined"===typeof S&&(S=R.disabled);var H="checkbox"===M||"radio"===M;return a.createElement(p.a,Object(o.a)({component:"span",className:Object(s.default)(d.root,m,P&&d.checked,S&&d.disabled),disabled:S,tabIndex:null,role:void 0,onFocus:function(e){T&&T(e),R&&R.onFocus&&R.onFocus(e)},onBlur:function(e){x&&x(e),R&&R.onBlur&&R.onBlur(e)},ref:t},C),a.createElement("input",Object(o.a)({autoFocus:n,checked:f,defaultChecked:h,className:d.input,disabled:S,id:H&&b,name:O,onChange:function(e){var t=e.target.checked;B(t),E&&E(e,t)},readOnly:j,ref:y,required:L,tabIndex:k,type:M,value:F},w)),P?l:g)}));t.a=Object(f.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(l)},665:function(e,t,n){"use strict";var o=n(1),r=n(58),i=n(4),a=n(20),s=n(0),c=n(17),u=n(5),f=n(244),p=n(14),l=n(8),d=n(12),m=n(246),h=n(943),v=n(157),g=n(410),b=n(67),w=n(60),y=n(16);function O(e){return"function"===typeof e?e():e}var x="undefined"!==typeof window?s.useLayoutEffect:s.useEffect,E={},T=s.forwardRef((function(e,t){var n=e.anchorEl,r=e.children,a=e.container,c=e.disablePortal,u=void 0!==c&&c,f=e.keepMounted,p=void 0!==f&&f,l=e.modifiers,d=e.open,m=e.placement,T=void 0===m?"bottom":m,j=e.popperOptions,L=void 0===j?E:j,k=e.popperRef,M=e.style,F=e.transition,C=void 0!==F&&F,N=Object(i.a)(e,["anchorEl","children","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"]),D=s.useRef(null),P=Object(y.a)(D,t),B=s.useRef(null),R=Object(y.a)(B,k),S=s.useRef(R);x((function(){S.current=R}),[R]),s.useImperativeHandle(k,(function(){return B.current}),[]);var H=s.useState(!0),W=H[0],A=H[1],I=function(e,t){if("ltr"===(t&&t.direction||"ltr"))return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(T,Object(v.a)()),V=s.useState(I),U=V[0],z=V[1];s.useEffect((function(){B.current&&B.current.update()}));var Y=s.useCallback((function(){if(D.current&&n&&d){B.current&&(B.current.destroy(),S.current(null));var e=function(e){z(e.placement)},t=(O(n),new h.a(O(n),D.current,Object(o.a)({placement:I},L,{modifiers:Object(o.a)({},u?{}:{preventOverflow:{boundariesElement:"window"}},l,L.modifiers),onCreate:Object(b.a)(e,L.onCreate),onUpdate:Object(b.a)(e,L.onUpdate)})));S.current(t)}}),[n,u,l,d,I,L]),q=s.useCallback((function(e){Object(w.a)(P,e),Y()}),[P,Y]),$=function(){B.current&&(B.current.destroy(),S.current(null))};if(s.useEffect((function(){return function(){$()}}),[]),s.useEffect((function(){d||C||$()}),[d,C]),!p&&!d&&(!C||W))return null;var G={placement:U};return C&&(G.TransitionProps={in:d,onEnter:function(){A(!1)},onExited:function(){A(!0),$()}}),s.createElement(g.a,{disablePortal:u,container:a},s.createElement("div",Object(o.a)({ref:q,role:"tooltip"},N,{style:Object(o.a)({position:"fixed",top:0,left:0,display:d||!p||C?null:"none"},M)}),"function"===typeof r?r(G):r))})),j=n(166),L=n(74),k=n(161),M=n(45);function F(e){return Math.round(1e5*e)/1e5}var C=!1,N=null;var D=s.forwardRef((function(e,t){var n=e.arrow,a=void 0!==n&&n,p=e.children,l=e.classes,h=e.disableFocusListener,v=void 0!==h&&h,g=e.disableHoverListener,b=void 0!==g&&g,O=e.disableTouchListener,x=void 0!==O&&O,E=e.enterDelay,F=void 0===E?100:E,D=e.enterNextDelay,P=void 0===D?0:D,B=e.enterTouchDelay,R=void 0===B?700:B,S=e.id,H=e.interactive,W=void 0!==H&&H,A=e.leaveDelay,I=void 0===A?0:A,V=e.leaveTouchDelay,U=void 0===V?1500:V,z=e.onClose,Y=e.onOpen,q=e.open,$=e.placement,G=void 0===$?"bottom":$,J=e.PopperComponent,_=void 0===J?T:J,X=e.PopperProps,K=e.title,Q=e.TransitionComponent,Z=void 0===Q?m.a:Q,ee=e.TransitionProps,te=Object(i.a)(e,["arrow","children","classes","disableFocusListener","disableHoverListener","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","id","interactive","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","title","TransitionComponent","TransitionProps"]),ne=Object(M.a)(),oe=s.useState(),re=oe[0],ie=oe[1],ae=s.useState(null),se=ae[0],ce=ae[1],ue=s.useRef(!1),fe=s.useRef(),pe=s.useRef(),le=s.useRef(),de=s.useRef(),me=Object(k.a)({controlled:q,default:!1,name:"Tooltip",state:"open"}),he=Object(r.a)(me,2),ve=he[0],ge=he[1],be=ve,we=Object(j.a)(S);s.useEffect((function(){return function(){clearTimeout(fe.current),clearTimeout(pe.current),clearTimeout(le.current),clearTimeout(de.current)}}),[]);var ye=function(e){clearTimeout(N),C=!0,ge(!0),Y&&Y(e)},Oe=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){var n=p.props;"mouseover"===t.type&&n.onMouseOver&&e&&n.onMouseOver(t),ue.current&&"touchstart"!==t.type||(re&&re.removeAttribute("title"),clearTimeout(pe.current),clearTimeout(le.current),F||C&&P?(t.persist(),pe.current=setTimeout((function(){ye(t)}),C?P:F)):ye(t))}},xe=Object(L.a)(),Ee=xe.isFocusVisible,Te=xe.onBlurVisible,je=xe.ref,Le=s.useState(!1),ke=Le[0],Me=Le[1],Fe=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){re||ie(t.currentTarget),Ee(t)&&(Me(!0),Oe()(t));var n=p.props;n.onFocus&&e&&n.onFocus(t)}},Ce=function(e){clearTimeout(N),N=setTimeout((function(){C=!1}),800+I),ge(!1),z&&z(e),clearTimeout(fe.current),fe.current=setTimeout((function(){ue.current=!1}),ne.transitions.duration.shortest)},Ne=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return function(t){var n=p.props;"blur"===t.type&&(n.onBlur&&e&&n.onBlur(t),ke&&(Me(!1),Te())),"mouseleave"===t.type&&n.onMouseLeave&&t.currentTarget===re&&n.onMouseLeave(t),clearTimeout(pe.current),clearTimeout(le.current),t.persist(),le.current=setTimeout((function(){Ce(t)}),I)}},De=function(e){ue.current=!0;var t=p.props;t.onTouchStart&&t.onTouchStart(e)},Pe=Object(y.a)(ie,t),Be=Object(y.a)(je,Pe),Re=s.useCallback((function(e){Object(w.a)(Be,c.findDOMNode(e))}),[Be]),Se=Object(y.a)(p.ref,Re);""===K&&(be=!1);var He=!be&&!b,We=Object(o.a)({"aria-describedby":be?we:null,title:He&&"string"===typeof K?K:null},te,p.props,{className:Object(u.default)(te.className,p.props.className),onTouchStart:De,ref:Se}),Ae={};x||(We.onTouchStart=function(e){De(e),clearTimeout(le.current),clearTimeout(fe.current),clearTimeout(de.current),e.persist(),de.current=setTimeout((function(){Oe()(e)}),R)},We.onTouchEnd=function(e){p.props.onTouchEnd&&p.props.onTouchEnd(e),clearTimeout(de.current),clearTimeout(le.current),e.persist(),le.current=setTimeout((function(){Ce(e)}),U)}),b||(We.onMouseOver=Oe(),We.onMouseLeave=Ne(),W&&(Ae.onMouseOver=Oe(!1),Ae.onMouseLeave=Ne(!1))),v||(We.onFocus=Fe(),We.onBlur=Ne(),W&&(Ae.onFocus=Fe(!1),Ae.onBlur=Ne(!1)));var Ie=s.useMemo((function(){return Object(f.a)({popperOptions:{modifiers:{arrow:{enabled:Boolean(se),element:se}}}},X)}),[se,X]);return s.createElement(s.Fragment,null,s.cloneElement(p,We),s.createElement(_,Object(o.a)({className:Object(u.default)(l.popper,W&&l.popperInteractive,a&&l.popperArrow),placement:G,anchorEl:re,open:!!re&&be,id:We["aria-describedby"],transition:!0},Ae,Ie),(function(e){var t=e.placement,n=e.TransitionProps;return s.createElement(Z,Object(o.a)({timeout:ne.transitions.duration.shorter},n,ee),s.createElement("div",{className:Object(u.default)(l.tooltip,l["tooltipPlacement".concat(Object(d.a)(t.split("-")[0]))],ue.current&&l.touch,a&&l.tooltipArrow)},K,a?s.createElement("span",{className:l.arrow,ref:ce}):null))})))}));t.a=Object(l.a)((function(e){return{popper:{zIndex:e.zIndex.tooltip,pointerEvents:"none"},popperInteractive:{pointerEvents:"auto"},popperArrow:{'&[x-placement*="bottom"] $arrow':{top:0,left:0,marginTop:"-0.71em",marginLeft:4,marginRight:4,"&::before":{transformOrigin:"0 100%"}},'&[x-placement*="top"] $arrow':{bottom:0,left:0,marginBottom:"-0.71em",marginLeft:4,marginRight:4,"&::before":{transformOrigin:"100% 0"}},'&[x-placement*="right"] $arrow':{left:0,marginLeft:"-0.71em",height:"1em",width:"0.71em",marginTop:4,marginBottom:4,"&::before":{transformOrigin:"100% 100%"}},'&[x-placement*="left"] $arrow':{right:0,marginRight:"-0.71em",height:"1em",width:"0.71em",marginTop:4,marginBottom:4,"&::before":{transformOrigin:"0 0"}}},tooltip:{backgroundColor:Object(p.a)(e.palette.grey[700],.9),borderRadius:e.shape.borderRadius,color:e.palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(10),lineHeight:"".concat(F(1.4),"em"),maxWidth:300,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},tooltipArrow:{position:"relative",margin:"0"},arrow:{overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:Object(p.a)(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}},touch:{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:"".concat(F(16/14),"em"),fontWeight:e.typography.fontWeightRegular},tooltipPlacementLeft:Object(a.a)({transformOrigin:"right center",margin:"0 24px "},e.breakpoints.up("sm"),{margin:"0 14px"}),tooltipPlacementRight:Object(a.a)({transformOrigin:"left center",margin:"0 24px"},e.breakpoints.up("sm"),{margin:"0 14px"}),tooltipPlacementTop:Object(a.a)({transformOrigin:"center bottom",margin:"24px 0"},e.breakpoints.up("sm"),{margin:"14px 0"}),tooltipPlacementBottom:Object(a.a)({transformOrigin:"center top",margin:"24px 0"},e.breakpoints.up("sm"),{margin:"14px 0"})}}),{name:"MuiTooltip",flip:!1})(D)},943:function(e,t,n){"use strict";(function(e){var n="undefined"!==typeof window&&"undefined"!==typeof document&&"undefined"!==typeof navigator,o=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(n&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();var r=n&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),o))}};function i(e){return e&&"[object Function]"==={}.toString.call(e)}function a(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function s(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function c(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=a(e),n=t.overflow,o=t.overflowX,r=t.overflowY;return/(auto|scroll|overlay)/.test(n+r+o)?e:c(s(e))}function u(e){return e&&e.referenceNode?e.referenceNode:e}var f=n&&!(!window.MSInputMethodContext||!document.documentMode),p=n&&/MSIE 10/.test(navigator.userAgent);function l(e){return 11===e?f:10===e?p:f||p}function d(e){if(!e)return document.documentElement;for(var t=l(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var o=n&&n.nodeName;return o&&"BODY"!==o&&"HTML"!==o?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===a(n,"position")?d(n):n:e?e.ownerDocument.documentElement:document.documentElement}function m(e){return null!==e.parentNode?m(e.parentNode):e}function h(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?e:t,r=n?t:e,i=document.createRange();i.setStart(o,0),i.setEnd(r,0);var a=i.commonAncestorContainer;if(e!==a&&t!==a||o.contains(r))return function(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||d(e.firstElementChild)===e)}(a)?a:d(a);var s=m(e);return s.host?h(s.host,t):h(e,m(t).host)}function v(e){var t="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"===n||"HTML"===n){var o=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||o)[t]}return e[t]}function g(e,t){var n="x"===t?"Left":"Top",o="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"])+parseFloat(e["border"+o+"Width"])}function b(e,t,n,o){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],l(10)?parseInt(n["offset"+e])+parseInt(o["margin"+("Height"===e?"Top":"Left")])+parseInt(o["margin"+("Height"===e?"Bottom":"Right")]):0)}function w(e){var t=e.body,n=e.documentElement,o=l(10)&&getComputedStyle(n);return{height:b("Height",t,n,o),width:b("Width",t,n,o)}}var y=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),O=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};function E(e){return x({},e,{right:e.left+e.width,bottom:e.top+e.height})}function T(e){var t={};try{if(l(10)){t=e.getBoundingClientRect();var n=v(e,"top"),o=v(e,"left");t.top+=n,t.left+=o,t.bottom+=n,t.right+=o}else t=e.getBoundingClientRect()}catch(d){}var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},i="HTML"===e.nodeName?w(e.ownerDocument):{},s=i.width||e.clientWidth||r.width,c=i.height||e.clientHeight||r.height,u=e.offsetWidth-s,f=e.offsetHeight-c;if(u||f){var p=a(e);u-=g(p,"x"),f-=g(p,"y"),r.width-=u,r.height-=f}return E(r)}function j(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=l(10),r="HTML"===t.nodeName,i=T(e),s=T(t),u=c(e),f=a(t),p=parseFloat(f.borderTopWidth),d=parseFloat(f.borderLeftWidth);n&&r&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var m=E({top:i.top-s.top-p,left:i.left-s.left-d,width:i.width,height:i.height});if(m.marginTop=0,m.marginLeft=0,!o&&r){var h=parseFloat(f.marginTop),g=parseFloat(f.marginLeft);m.top-=p-h,m.bottom-=p-h,m.left-=d-g,m.right-=d-g,m.marginTop=h,m.marginLeft=g}return(o&&!n?t.contains(u):t===u&&"BODY"!==u.nodeName)&&(m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=v(t,"top"),r=v(t,"left"),i=n?-1:1;return e.top+=o*i,e.bottom+=o*i,e.left+=r*i,e.right+=r*i,e}(m,t)),m}function L(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===a(e,"position"))return!0;var n=s(e);return!!n&&L(n)}function k(e){if(!e||!e.parentElement||l())return document.documentElement;for(var t=e.parentElement;t&&"none"===a(t,"transform");)t=t.parentElement;return t||document.documentElement}function M(e,t,n,o){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i={top:0,left:0},a=r?k(e):h(e,u(t));if("viewport"===o)i=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,o=j(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),a=t?0:v(n),s=t?0:v(n,"left");return E({top:a-o.top+o.marginTop,left:s-o.left+o.marginLeft,width:r,height:i})}(a,r);else{var f=void 0;"scrollParent"===o?"BODY"===(f=c(s(t))).nodeName&&(f=e.ownerDocument.documentElement):f="window"===o?e.ownerDocument.documentElement:o;var p=j(f,a,r);if("HTML"!==f.nodeName||L(a))i=p;else{var l=w(e.ownerDocument),d=l.height,m=l.width;i.top+=p.top-p.marginTop,i.bottom=d+p.top,i.left+=p.left-p.marginLeft,i.right=m+p.left}}var g="number"===typeof(n=n||0);return i.left+=g?n:n.left||0,i.top+=g?n:n.top||0,i.right-=g?n:n.right||0,i.bottom-=g?n:n.bottom||0,i}function F(e,t,n,o,r){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=M(n,o,i,r),s={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},c=Object.keys(s).map((function(e){return x({key:e},s[e],{area:(t=s[e],t.width*t.height)});var t})).sort((function(e,t){return t.area-e.area})),u=c.filter((function(e){var t=e.width,o=e.height;return t>=n.clientWidth&&o>=n.clientHeight})),f=u.length>0?u[0].key:c[0].key,p=e.split("-")[1];return f+(p?"-"+p:"")}function C(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return j(n,o?k(t):h(t,u(n)),o)}function N(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),o=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+o,height:e.offsetHeight+n}}function D(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function P(e,t,n){n=n.split("-")[0];var o=N(e),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),a=i?"top":"left",s=i?"left":"top",c=i?"height":"width",u=i?"width":"height";return r[a]=t[a]+t[c]/2-o[c]/2,r[s]=n===s?t[s]-o[u]:t[D(s)],r}function B(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function R(e,t,n){return(void 0===n?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===n}));var o=B(e,(function(e){return e[t]===n}));return e.indexOf(o)}(e,"name",n))).forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&i(n)&&(t.offsets.popper=E(t.offsets.popper),t.offsets.reference=E(t.offsets.reference),t=n(t,e))})),t}function S(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=C(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=F(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=P(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=R(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function H(e,t){return e.some((function(e){var n=e.name;return e.enabled&&n===t}))}function W(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),o=0;o<t.length;o++){var r=t[o],i=r?""+r+n:e;if("undefined"!==typeof document.body.style[i])return i}return null}function A(){return this.state.isDestroyed=!0,H(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[W("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function I(e){var t=e.ownerDocument;return t?t.defaultView:window}function V(e,t,n,o){var r="BODY"===e.nodeName,i=r?e.ownerDocument.defaultView:e;i.addEventListener(t,n,{passive:!0}),r||V(c(i.parentNode),t,n,o),o.push(i)}function U(e,t,n,o){n.updateBound=o,I(e).addEventListener("resize",n.updateBound,{passive:!0});var r=c(e);return V(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function z(){this.state.eventsEnabled||(this.state=U(this.reference,this.options,this.state,this.scheduleUpdate))}function Y(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,I(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function q(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function $(e,t){Object.keys(t).forEach((function(n){var o="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&q(t[n])&&(o="px"),e.style[n]=t[n]+o}))}var G=n&&/Firefox/i.test(navigator.userAgent);function J(e,t,n){var o=B(e,(function(e){return e.name===t})),r=!!o&&e.some((function(e){return e.name===n&&e.enabled&&e.order<o.order}));if(!r){var i="`"+t+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return r}var _=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],X=_.slice(3);function K(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=X.indexOf(e),o=X.slice(n+1).concat(X.slice(0,n));return t?o.reverse():o}var Q="flip",Z="clockwise",ee="counterclockwise";function te(e,t,n,o){var r=[0,0],i=-1!==["right","left"].indexOf(o),a=e.split(/(\+|\-)/).map((function(e){return e.trim()})),s=a.indexOf(B(a,(function(e){return-1!==e.search(/,|\s/)})));a[s]&&-1===a[s].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var c=/\s*,\s*|\s+/,u=-1!==s?[a.slice(0,s).concat([a[s].split(c)[0]]),[a[s].split(c)[1]].concat(a.slice(s+1))]:[a];return u=u.map((function(e,o){var r=(1===o?!i:i)?"height":"width",a=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,a=!0,e):a?(e[e.length-1]+=t,a=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,n,o){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],a=r[2];if(!i)return e;if(0===a.indexOf("%")){return E("%p"===a?n:o)[t]/100*i}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i;return i}(e,r,t,n)}))})),u.forEach((function(e,t){e.forEach((function(n,o){q(n)&&(r[t]+=n*("-"===e[o-1]?-1:1))}))})),r}var ne={shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],o=t.split("-")[1];if(o){var r=e.offsets,i=r.reference,a=r.popper,s=-1!==["bottom","top"].indexOf(n),c=s?"left":"top",u=s?"width":"height",f={start:O({},c,i[c]),end:O({},c,i[c]+i[u]-a[u])};e.offsets.popper=x({},a,f[o])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,o=e.placement,r=e.offsets,i=r.popper,a=r.reference,s=o.split("-")[0],c=void 0;return c=q(+n)?[+n,0]:te(n,i,a,s),"left"===s?(i.top+=c[0],i.left-=c[1]):"right"===s?(i.top+=c[0],i.left+=c[1]):"top"===s?(i.left+=c[0],i.top-=c[1]):"bottom"===s&&(i.left+=c[0],i.top+=c[1]),e.popper=i,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||d(e.instance.popper);e.instance.reference===n&&(n=d(n));var o=W("transform"),r=e.instance.popper.style,i=r.top,a=r.left,s=r[o];r.top="",r.left="",r[o]="";var c=M(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);r.top=i,r.left=a,r[o]=s,t.boundaries=c;var u=t.priority,f=e.offsets.popper,p={primary:function(e){var n=f[e];return f[e]<c[e]&&!t.escapeWithReference&&(n=Math.max(f[e],c[e])),O({},e,n)},secondary:function(e){var n="right"===e?"left":"top",o=f[n];return f[e]>c[e]&&!t.escapeWithReference&&(o=Math.min(f[n],c[e]-("right"===e?f.width:f.height))),O({},n,o)}};return u.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";f=x({},f,p[t](e))})),e.offsets.popper=f,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,o=t.reference,r=e.placement.split("-")[0],i=Math.floor,a=-1!==["top","bottom"].indexOf(r),s=a?"right":"bottom",c=a?"left":"top",u=a?"width":"height";return n[s]<i(o[c])&&(e.offsets.popper[c]=i(o[c])-n[u]),n[c]>i(o[s])&&(e.offsets.popper[c]=i(o[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!J(e.instance.modifiers,"arrow","keepTogether"))return e;var o=t.element;if("string"===typeof o){if(!(o=e.instance.popper.querySelector(o)))return e}else if(!e.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var r=e.placement.split("-")[0],i=e.offsets,s=i.popper,c=i.reference,u=-1!==["left","right"].indexOf(r),f=u?"height":"width",p=u?"Top":"Left",l=p.toLowerCase(),d=u?"left":"top",m=u?"bottom":"right",h=N(o)[f];c[m]-h<s[l]&&(e.offsets.popper[l]-=s[l]-(c[m]-h)),c[l]+h>s[m]&&(e.offsets.popper[l]+=c[l]+h-s[m]),e.offsets.popper=E(e.offsets.popper);var v=c[l]+c[f]/2-h/2,g=a(e.instance.popper),b=parseFloat(g["margin"+p]),w=parseFloat(g["border"+p+"Width"]),y=v-e.offsets.popper[l]-b-w;return y=Math.max(Math.min(s[f]-h,y),0),e.arrowElement=o,e.offsets.arrow=(O(n={},l,Math.round(y)),O(n,d,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(H(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=M(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),o=e.placement.split("-")[0],r=D(o),i=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case Q:a=[o,r];break;case Z:a=K(o);break;case ee:a=K(o,!0);break;default:a=t.behavior}return a.forEach((function(s,c){if(o!==s||a.length===c+1)return e;o=e.placement.split("-")[0],r=D(o);var u=e.offsets.popper,f=e.offsets.reference,p=Math.floor,l="left"===o&&p(u.right)>p(f.left)||"right"===o&&p(u.left)<p(f.right)||"top"===o&&p(u.bottom)>p(f.top)||"bottom"===o&&p(u.top)<p(f.bottom),d=p(u.left)<p(n.left),m=p(u.right)>p(n.right),h=p(u.top)<p(n.top),v=p(u.bottom)>p(n.bottom),g="left"===o&&d||"right"===o&&m||"top"===o&&h||"bottom"===o&&v,b=-1!==["top","bottom"].indexOf(o),w=!!t.flipVariations&&(b&&"start"===i&&d||b&&"end"===i&&m||!b&&"start"===i&&h||!b&&"end"===i&&v),y=!!t.flipVariationsByContent&&(b&&"start"===i&&m||b&&"end"===i&&d||!b&&"start"===i&&v||!b&&"end"===i&&h),O=w||y;(l||g||O)&&(e.flipped=!0,(l||g)&&(o=a[c+1]),O&&(i=function(e){return"end"===e?"start":"start"===e?"end":e}(i)),e.placement=o+(i?"-"+i:""),e.offsets.popper=x({},e.offsets.popper,P(e.instance.popper,e.offsets.reference,e.placement)),e=R(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],o=e.offsets,r=o.popper,i=o.reference,a=-1!==["left","right"].indexOf(n),s=-1===["top","left"].indexOf(n);return r[a?"left":"top"]=i[n]-(s?r[a?"width":"height"]:0),e.placement=D(t),e.offsets.popper=E(r),e}},hide:{order:800,enabled:!0,fn:function(e){if(!J(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=B(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,o=t.y,r=e.offsets.popper,i=B(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==i?i:t.gpuAcceleration,s=d(e.instance.popper),c=T(s),u={position:r.position},f=function(e,t){var n=e.offsets,o=n.popper,r=n.reference,i=Math.round,a=Math.floor,s=function(e){return e},c=i(r.width),u=i(o.width),f=-1!==["left","right"].indexOf(e.placement),p=-1!==e.placement.indexOf("-"),l=t?f||p||c%2===u%2?i:a:s,d=t?i:s;return{left:l(c%2===1&&u%2===1&&!p&&t?o.left-1:o.left),top:d(o.top),bottom:d(o.bottom),right:l(o.right)}}(e,window.devicePixelRatio<2||!G),p="bottom"===n?"top":"bottom",l="right"===o?"left":"right",m=W("transform"),h=void 0,v=void 0;if(v="bottom"===p?"HTML"===s.nodeName?-s.clientHeight+f.bottom:-c.height+f.bottom:f.top,h="right"===l?"HTML"===s.nodeName?-s.clientWidth+f.right:-c.width+f.right:f.left,a&&m)u[m]="translate3d("+h+"px, "+v+"px, 0)",u[p]=0,u[l]=0,u.willChange="transform";else{var g="bottom"===p?-1:1,b="right"===l?-1:1;u[p]=v*g,u[l]=h*b,u.willChange=p+", "+l}var w={"x-placement":e.placement};return e.attributes=x({},w,e.attributes),e.styles=x({},u,e.styles),e.arrowStyles=x({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,n;return $(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach((function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&$(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,o,r){var i=C(r,t,e,n.positionFixed),a=F(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",a),$(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}},oe={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:ne},re=function(){function e(t,n){var o=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(o.update)},this.update=r(this.update.bind(this)),this.options=x({},e.Defaults,a),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(x({},e.Defaults.modifiers,a.modifiers)).forEach((function(t){o.options.modifiers[t]=x({},e.Defaults.modifiers[t]||{},a.modifiers?a.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return x({name:e},o.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&i(e.onLoad)&&e.onLoad(o.reference,o.popper,o.options,e,o.state)})),this.update();var s=this.options.eventsEnabled;s&&this.enableEventListeners(),this.state.eventsEnabled=s}return y(e,[{key:"update",value:function(){return S.call(this)}},{key:"destroy",value:function(){return A.call(this)}},{key:"enableEventListeners",value:function(){return z.call(this)}},{key:"disableEventListeners",value:function(){return Y.call(this)}}]),e}();re.Utils=("undefined"!==typeof window?window:e).PopperUtils,re.placements=_,re.Defaults=oe,t.a=re}).call(this,n(42))}}]);
//# sourceMappingURL=2.bd4f3c45.chunk.js.map