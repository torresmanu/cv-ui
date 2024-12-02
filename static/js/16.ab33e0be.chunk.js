(this.webpackJsonpCryptoVoice=this.webpackJsonpCryptoVoice||[]).push([[16],{1067:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(36),o=(a(646),a(1029)),s=a(208),l=a(1059),c=a(146),u=a(51),m=a(147),p=a(1060),d=a(1061),h=a(647),g=a(13);const f=[{imageUrl:h.a,title:"Latest Crypto News: Bitcoin Hits All-Time High",description:"Researchers at Shanghai University recently claimed to have made a significant breakthrough by cracking RSA encryption algorithms used in banking, military, and cryptocurrency sectors...",newsLink:"https://cryptonews.com/"},{imageUrl:h.a,title:"Ethereum Soars After Upgrade",description:"The latest Ethereum upgrade has sent the price soaring...",newsLink:"https://cryptonews.com/ethereum"}],b=Object(g.c)(o.a)`
  position: relative;
  &:hover .arrows {
    opacity: 1;
  }
`,y=Object(g.c)(s.a)`
  opacity: 0;
  transition: opacity 0.3s ease;
`,E=e=>{let{imageUrl:t,title:a,description:n,newsLink:i,handleNext:o,handlePrevious:h}=e;return r.a.createElement(b,{className:"customCard"},r.a.createElement(l.a,null,r.a.createElement(s.a,{container:!0,spacing:5},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(s.a,{container:!0,alignItems:"center",spacing:2},r.a.createElement(y,{item:!0,md:1,className:"arrows"},r.a.createElement(c.a,{onClick:h},r.a.createElement(p.a,{style:{color:"white"}}))),r.a.createElement(s.a,{item:!0,md:4,xs:12},r.a.createElement("img",{src:t,alt:a,style:{width:"100%"}})),r.a.createElement(s.a,{item:!0,md:6,xs:12},r.a.createElement(u.a,{variant:"h6",style:{marginBottom:"20px"}},a),r.a.createElement(u.a,{variant:"body2"},n),r.a.createElement(m.a,{variant:"outlined",onClick:()=>window.open(i,"_blank","noopener,noreferrer"),style:{padding:"0px 50px",height:"31px",marginTop:"30px"}},"Read More")),r.a.createElement(y,{item:!0,md:1,className:"arrows"},r.a.createElement(c.a,{onClick:o},r.a.createElement(d.a,{style:{color:"white"}}))))))))};var x=()=>{const[e,t]=Object(n.useState)(0),a=f[e];return r.a.createElement(s.a,{container:!0},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(E,{imageUrl:a.imageUrl,title:a.title,description:a.description,newsLink:a.newsLink,handleNext:()=>{t((e=>(e+1)%f.length))},handlePrevious:()=>{t((e=>0===e?f.length-1:e-1))}})))},v=a(661);const w=g.d`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`,C=g.c.div`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  position: relative;
  margin-bottom: 30px;
`,O=g.c.div`
  display: inline-block;
  padding: 10px 0;
  animation: ${w} ${e=>{let{duration:t}=e;return 100*t}}s linear infinite;
  display: flex;
  align-items: center;
  width: 100%;
`,k=g.c.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  color: white; /* Set text to white */
`,S=g.c.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`,j=[{username:"ElonMusk",text:"This is a sample tweet about crypto markets.",avatar:"https://randomuser.me/api/portraits/men/1.jpg"},{username:"CryptoUser",text:"Breaking news! Crypto is going up fast! Stay tuned.",avatar:"https://randomuser.me/api/portraits/men/3.jpg"},{username:"finance",text:"CryptoVoice predicts that BTC will rise by 5%.",avatar:"https://randomuser.me/api/portraits/women/3.jpg"},{username:"Binance",text:"Here\u2019s my analysis on ETH. Let\u2019s see what happens next.",avatar:"https://randomuser.me/api/portraits/women/2.jpg"},{username:"iLoveUPC",text:"CryptoVoice TFM is awesome! Take a look at",avatar:"https://randomuser.me/api/portraits/men/5.jpg"},{username:"CryptoUser",text:"Breaking news! Crypto is going up fast! Stay tuned.",avatar:"https://randomuser.me/api/portraits/men/2.jpg"},{username:"finance",text:"CryptoVoice predicts that BTC will rise by 5%.",avatar:"https://randomuser.me/api/portraits/women/1.jpg"},{username:"Binance",text:"Here\u2019s my analysis on ETH. Let\u2019s see what happens next.",avatar:"https://randomuser.me/api/portraits/women/2.jpg"}];var V=()=>{const e=Object(n.useRef)(null),[t,a]=Object(n.useState)(45);return Object(n.useEffect)((()=>{if(e.current){const t=e.current.scrollWidth,n=e.current.parentElement.offsetWidth;a(t/n*.05)}}),[e]),r.a.createElement(C,null,r.a.createElement(O,{ref:e,duration:t},[...j,...j].map(((e,t)=>r.a.createElement(v.a,{key:t,title:`Go to @${e.username} account on X (Twitter)`,arrow:!0,placement:"top"},r.a.createElement("a",{href:`https://twitter.com/${e.username}`,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none",color:"inherit"}},r.a.createElement(k,null,r.a.createElement(S,{src:e.avatar,alt:`${e.username} avatar`}),r.a.createElement("span",null,r.a.createElement("strong",null,"@",e.username),": ",e.text.slice(0,100),"..."))))))))},T=a(648),R=a(523),F=(a(172),a(417)),P=a(365),A=a(225),N=a(390),D=a(1064),B=a(57),I=Object(B.a)(n.createElement("path",{d:"M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"}),"TrendingDown"),L=a(653),U=a.n(L),M=a(654),z=a.n(M),$=(a(514),a(473)),G=a(515),W=a(516),_=(a(517),a(518),a(519));a(520);$.a,G.a,W.a,_.a;a(521);var H=a(456),Y=a.n(H),q=a(522),X=a(493),J=a(663),K=a(658),Q=a(1063),Z=a(45);X.b.register(X.e,X.g,X.f,X.a,X.c,X.h,X.i,X.d,K.a);const ee={BTC:"#F7931A",ETH:"#627EEA",ADA:"#0033AD",LINK:"#2A5ADA",LTC:"#345D9D",BNB:"#F3BA2F",MATIC:"#8247E5",SOL:"#00FFA3"};var te=e=>{let{selectedToken:t}=e;const[a,i]=Object(n.useState)({}),[o,s]=Object(n.useState)(!0),l=Object(Z.a)(),c=Object(Q.a)(l.breakpoints.up("md"));Object(n.useEffect)((()=>{fetch("/cv-ui/data.csv").then((e=>e.text())).then((e=>{Y.a.parse(e,{header:!0,dynamicTyping:!0,complete:e=>{const t={};e.data.forEach((e=>{if(e.Token&&e.Real_price&&e.Prediction_Ensemble){const a=new Date(e.Fecha);t[e.Token]||(t[e.Token]=[]),t[e.Token].push({date:a,realPrice:e.Real_price,predictionEnsemble:e.Prediction_Ensemble})}})),i(t)}})}))}),[]);const m={responsive:!0,maintainAspectRatio:!0,AspectRatio:3,scales:{y:{ticks:{color:"white",callback:function(e){return e>=1e3?e/1e3+"k":e<=1?e.toFixed(2):e},font:{size:14},padding:20},grid:{color:"rgba(255, 255, 255, 0.1)"},title:{display:!0,text:"Price (USD)",font:{size:16},color:"white"}},x:{ticks:{color:"white",font:{size:14},maxTicksLimit:6,callback:function(e,t,a){const n=new Date(this.getLabelForValue(e));return`${n.getDate()} ${n.toLocaleString("default",{month:"short"})}`},padding:20,maxRotation:0,minRotation:0},grid:{color:"rgba(255, 255, 255, 0.1)"},title:{display:!1,text:"Date",font:{size:16},color:"white"}}},plugins:{legend:{display:!1,position:"bottom",align:"center",labels:{boxWidth:20,padding:10,color:"white"},marginLeft:{left:150}},zoom:{pan:{enabled:!0,mode:"x"},zoom:{enabled:!0,mode:"x",drag:!0}}},interaction:{mode:"nearest",axis:"x",intersect:!1}},p={responsive:!0,maintainAspectRatio:!0,aspectRatio:2,scales:{y:{ticks:{display:!1},grid:{color:"rgba(255, 255, 255, 0.1)"},title:{display:!1,text:"Price (USD)",font:{size:window.innerWidth>600?16:12},color:"white"}},x:{ticks:{display:!1},grid:{color:"rgba(255, 255, 255, 0.1)"},title:{display:!1,text:"Date",font:{size:window.innerWidth>600?16:12},color:"white"}}},plugins:{legend:{display:window.innerWidth>600,position:"bottom",labels:{boxWidth:20,padding:10,color:"white"}},zoom:{pan:{enabled:!0,mode:"x"},zoom:{enabled:!0,mode:"x",drag:!0}}},interaction:{mode:"nearest",axis:"x",intersect:!1}};return r.a.createElement("div",{style:{height:c?"400px":"200px",width:"100%"}},r.a.createElement(F.a,{sx:{display:"flex",flexDirection:c?"row":"column",alignItems:c?"center":"flex-start",justifyContent:"space-between",marginBottom:"10px"}},r.a.createElement(u.a,{variant:"h6",gutterBottom:!0},"Real Price vs Prediction ",c?`Price (Token: ${t})`:"Price"),r.a.createElement(F.a,{sx:{marginTop:c?0:"10px"}}," ",r.a.createElement(q.a,{groupByDay:o,setGroupByDay:s}))),t&&a[t]?r.a.createElement(r.a.Fragment,null,r.a.createElement(J.a,{data:e=>{const n=e.getContext("2d").createLinearGradient(0,0,0,300);if(n.addColorStop(0,"rgba(72, 177, 85, 0.3)"),n.addColorStop(1,"rgba(72, 177, 85, 0)"),!t||!a[t])return;const r=o?(e=>{const t={};return e.forEach((e=>{const a=e.date.toISOString().split("T")[0];t[a]||(t[a]={totalRealPrice:0,totalPrediction:0,count:0}),t[a].totalRealPrice+=e.realPrice,t[a].totalPrediction+=e.predictionEnsemble,t[a].count+=1})),Object.entries(t).map((e=>{let[t,{totalRealPrice:a,totalPrediction:n,count:r}]=e;return{date:new Date(t),avgRealPrice:a/r,avgPredictionEnsemble:n/r}}))})(a[t]):a[t];return{labels:r.map((e=>e.date)),datasets:[{label:"Real Price",data:r.map((e=>o?e.avgRealPrice:e.realPrice)),fill:!0,backgroundColor:n,borderColor:"rgba(72, 177, 85, 0.8)",pointRadius:0,tension:.3},{label:"Prediction Price",data:r.map((e=>o?e.avgPredictionEnsemble:e.predictionEnsemble)),fill:!1,borderColor:ee[t],pointRadius:0,tension:.3}]}},options:c?m:p}),r.a.createElement(F.a,{sx:{display:"flex",justifyContent:"center",marginBottom:"10px"}},r.a.createElement(F.a,{sx:{display:"flex",alignItems:"center",marginRight:2}},r.a.createElement(F.a,{sx:{width:16,height:16,backgroundColor:"rgba(72, 177, 85, 0.8)",borderRadius:"50%",marginRight:5}}),r.a.createElement(u.a,{style:{color:"white",marginRight:10}},"Real Price")),r.a.createElement(F.a,{sx:{display:"flex",alignItems:"center"}},r.a.createElement(F.a,{sx:{width:16,height:16,backgroundColor:ee[t],borderRadius:"50%",marginRight:1,marginRight:10}}),r.a.createElement(u.a,{style:{color:"white"}},"Prediction Price")))):r.a.createElement("p",null,"No data available"))};var ae=e=>{let{selectedToken:t}=e;return r.a.createElement(F.a,{sx:{backgroundColor:"transparent"}},r.a.createElement(te,{selectedToken:t}))};var ne=e=>{let{selectedToken:t}=e;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{container:!0,spacing:4},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(o.a,{className:"customCard"},r.a.createElement(l.a,null,r.a.createElement(ae,{selectedToken:t}))))))},re=a(65);const ie={BTC:"https://cryptologos.cc/logos/bitcoin-btc-logo.png",ETH:$.a,ADA:G.a,LINK:W.a,LTC:"https://cryptologos.cc/logos/litecoin-ltc-logo.png",BNB:"https://cryptologos.cc/logos/binance-coin-bnb-logo.png"};var oe=e=>{let{selectedToken:t,onTokenChange:a}=e;const n=Object(re.f)(),i=Object.keys(ie);return r.a.createElement("div",null,r.a.createElement(s.a,{container:!0,spacing:2,style:{marginBottom:"20px",marginTop:"20px"}},i.map((e=>r.a.createElement(s.a,{item:!0,key:e,style:{position:"relative"}},r.a.createElement(m.a,{onClick:()=>a(e),className:t===e?"selectedToken":"",style:{filter:"BTC"!==e?"blur(5px)":"none",pointerEvents:"BTC"===e?"auto":"none",position:"relative"}},r.a.createElement("img",{src:ie[e],alt:e,style:{width:20,height:20,borderRadius:"50%"}}),r.a.createElement(u.a,{variant:"caption",align:"center",style:{marginLeft:"10px",marginRight:"10px"}},e))))),r.a.createElement(s.a,{item:!0,xs:12,md:3,style:{marginLeft:"auto"}},r.a.createElement(m.a,{className:"premiumButton",fullWidth:!0,onClick:()=>{n.push("/auth/sign-in")}},"Go Premium"))))},se=a(649),le=(a(558),a(650)),ce=a.n(le),ue=a(651);var me=e=>{let{value:t}=e;const a=t<=50;return r.a.createElement(o.a,{className:"customCard"},r.a.createElement(l.a,null,r.a.createElement(u.a,{variant:"h6",gutterBottom:!0},"Fear & Greed Index"),r.a.createElement(u.a,{variant:"body2",gutterBottom:!0,style:{marginBottom:30}},"Powered by CryptoVoice classification model"),r.a.createElement(s.a,{container:!0,spacing:5},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(s.a,{container:!0,alignItems:"center",spacing:2},r.a.createElement(s.a,{item:!0},r.a.createElement(se.a,{icon:a?ue.a:ce.a,style:{width:58,height:58,marginRight:10,color:a?"#FF3333":"#2AAE6F"}})),r.a.createElement(s.a,{item:!0},r.a.createElement(u.a,{variant:"h6"},"Greed Mood"),r.a.createElement(u.a,{variant:"body2",style:{color:a?"#FF3333":"#2AAE6F",fontWeight:500,fontSize:"0.85rem"}},t,"%")))))))},pe=a(89),de=a(8),he=a(1076);const ge=Object(de.a)({root:{color:"#ffffff",height:3,padding:"13px 0"}})(he.a),fe=Object(N.a)({root:{width:300}});function be(e){return`${e}\xb0C`}function ye(){const e=fe(),[t,a]=r.a.useState([20,37]);return r.a.createElement("div",{className:e.root},r.a.createElement(ge,{value:t,onChange:(e,t)=>{a(t)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",getAriaValueText:be}))}var Ee=a(423);const xe=[{symbol:"BTC",name:"Bitcoin",price:67759.94,change:.8,logo:"https://cryptologos.cc/logos/bitcoin-btc-logo.png"},{symbol:"ETH",name:"Ethereum",price:2492,change:.15,logo:$.a},{symbol:"BNB",name:"BNB",price:586.6,change:-.36,logo:"https://cryptologos.cc/logos/binance-coin-bnb-logo.png"},{symbol:"SOL",name:"Solana",price:176.97,change:2.64,logo:"https://cryptologos.cc/logos/solana-sol-logo.png"}],ve=Object(N.a)((e=>({card:{backgroundColor:"#1E2329",color:"white",borderRadius:12,padding:e.spacing(2),position:"relative",overflow:"hidden"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:e.spacing(2)},coinRow:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:e.spacing(2,0)},coinInfo:{display:"flex",alignItems:"center",flex:2},coinLogo:{width:24,height:24,marginRight:e.spacing(2)},coinName:{fontSize:"1rem",fontWeight:500},priceColumn:{flex:1,textAlign:"right",fontWeight:600},changeColumn:{flex:1,textAlign:"right",fontWeight:600},changePositive:{color:"#0DCB81"},changeNegative:{color:"#FF3333"},blurOverlay:{position:"absolute",top:"40%",left:0,width:"100%",height:"60%",background:"linear-gradient(to bottom, rgba(30, 35, 41, 0) 0%, rgba(30, 35, 41, 0.1) 30%, rgba(30, 35, 41, 0.8) 100%)",backdropFilter:"blur(9px)",display:"flex",justifyContent:"center",alignItems:"center"}})));var we=()=>{const e=ve(),t=Object(re.f)();return r.a.createElement(o.a,{className:e.card},r.a.createElement(l.a,null,r.a.createElement(F.a,{className:e.header},r.a.createElement(u.a,{variant:"h6"},"Top Gainers")),xe.map(((t,a)=>r.a.createElement(F.a,{key:t.symbol,className:e.coinRow,style:a>0?{opacity:.4}:{}},r.a.createElement(F.a,{className:e.coinInfo},r.a.createElement(Ee.a,{src:t.logo,alt:t.symbol,className:e.coinLogo}),r.a.createElement(u.a,{className:e.coinName},t.symbol)),r.a.createElement(u.a,{className:e.priceColumn},"$",t.price.toLocaleString()),r.a.createElement(u.a,{className:e.changeColumn,style:{color:t.change>=0?"#2AAE6F":"#FF3333"}},t.change>=0?"+":"",t.change.toFixed(2),"%"))))),r.a.createElement(F.a,{className:e.blurOverlay},r.a.createElement(m.a,{className:"premiumButton",style:{width:"50%"},onClick:()=>{t.push("/auth/sign-in")}},"Go Premium")))},Ce=a(652);const Oe=Object(N.a)((e=>({root:{flexGrow:1,padding:e.spacing(1)},buttonContainer:{display:"flex",alignItems:"center",gap:e.spacing(2),marginTop:e.spacing(2),justifyContent:"center"},dialogContent:{background:Object(pe.a)(30,35,41,.1),backdropFilter:"blur(10px)",padding:e.spacing(6),borderRadius:e.spacing(1),boxShadow:"0px 4px 12px rgba(0, 0, 0, 0.1)"},sliderBox:{display:"flex",alignItems:"center",gap:e.spacing(2),marginTop:e.spacing(2)},sliderIcon:{color:e.palette.primary.main},dialogActionsBox:{display:"flex",justifyContent:"flex-end",gap:e.spacing(2),marginTop:e.spacing(4)}})));var ke=()=>{const e=Oe(),[t,a]=Object(n.useState)("BTC"),[i,o]=Object(n.useState)(["BTC","ETH"]),[l,p]=Object(n.useState)(!1),[d,h]=Object(n.useState)(1e3),[g,f]=Object(n.useState)(5e4),[b,y]=Object(n.useState)({}),[E,x]=Object(n.useState)([]);Object(n.useEffect)((()=>{fetch("/cv-ui/data.csv").then((e=>e.text())).then((e=>{Y.a.parse(e,{header:!0,dynamicTyping:!0,complete:e=>{const t={};e.data.forEach((e=>{e.Token&&e.Real_price&&e.Prediction_Ensemble&&(t[e.Token]||(t[e.Token]=[]),t[e.Token].push({date:new Date(e.Fecha),realPrice:e.Real_price,predictionEnsemble:e.Prediction_Ensemble}))})),y(t);const a=Object.keys(t);x(a)}})}))}),[]);const v=()=>{if(t&&b[t]){const e=Y.a.unparse(b[t]),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(a),r=document.createElement("a");r.href=n,r.setAttribute("download",`${t}_data.csv`),document.body.appendChild(r),r.click(),document.body.removeChild(r)}},w=()=>{p(!0)},C=()=>{p(!1)},O=Object(Z.a)(),k=Object(Q.a)(O.breakpoints.up("md"));return r.a.createElement(s.a,{container:!0,spacing:5,className:e.root},r.a.createElement(s.a,{item:!0,xs:12,md:8},r.a.createElement(oe,{selectedToken:t,onTokenChange:a,favoriteTokens:i,setFavoriteTokens:o})),r.a.createElement(s.a,{item:!0,xs:12,md:4,className:e.buttonContainer},r.a.createElement(c.a,{className:"buttonDisabled",onClick:()=>{o((e=>e.includes(t)?e.filter((e=>e!==t)):[...e,t]))},"aria-label":"favorite",style:{backgroundColor:"rgba(255, 255, 255, 0.1)",padding:5,borderRadius:20,opacity:.9,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.2)"},disabled:!0},r.a.createElement(D.a,{style:{color:"rgba(255, 255, 255, 0.5)",width:26,height:26}})),k?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{className:"buttonDisabled",variant:"outlined",color:"primary",onClick:w,startIcon:r.a.createElement(U.a,null),disabled:!0},"Create Alert"),r.a.createElement(m.a,{className:"buttonDisabled",variant:"outlined",color:"primary",onClick:v,startIcon:r.a.createElement(z.a,null),disabled:!0},"Download CSV Data")):r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{color:"primary",onClick:w,style:{backgroundColor:"rgba(255, 255, 255, 0.1)",padding:5,borderRadius:20,opacity:.9,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.2)"}},r.a.createElement(U.a,{style:{color:"rgba(255, 255, 255, 0.5)",width:26,height:26}})),r.a.createElement(c.a,{color:"primary",onClick:v,style:{backgroundColor:"rgba(255, 255, 255, 0.1)",padding:5,borderRadius:20,opacity:.9,boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.2)"}},r.a.createElement(z.a,{style:{color:"rgba(255, 255, 255, 0.5)",width:26,height:26}})))),r.a.createElement(s.a,{container:!0,spacing:5,className:e.root},r.a.createElement(s.a,{item:!0,xs:12,md:8,style:{display:"flex",flexDirection:"column"}},r.a.createElement(F.a,{style:{height:"100%"}},r.a.createElement(ne,{selectedToken:t}))),r.a.createElement(s.a,{item:!0,xs:12,md:4,style:k?{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"}:{}},r.a.createElement(F.a,{style:k?{flexGrow:1}:{marginBottom:20}},r.a.createElement(we,null)),r.a.createElement(F.a,null,r.a.createElement(me,{value:65})))),r.a.createElement(Ce.a,null),r.a.createElement(P.a,{open:l,onClose:C,fullWidth:!0,maxWidth:"sm",PaperProps:{style:{borderRadius:20,border:"1px solid rgba(255, 255, 255, 0.3)",maxWidth:350,background:Object(pe.a)(30,35,41,.1),backdropFilter:"blur(10px)"}}},r.a.createElement(A.a,{className:e.dialogContent},r.a.createElement(u.a,{variant:"h5",gutterBottom:!0},t," Price Alert"),r.a.createElement(u.a,{variant:"body2",gutterBottom:!0},"Set your price thresholds"),r.a.createElement(F.a,{className:e.sliderBox},r.a.createElement(I,{className:e.sliderIcon}),r.a.createElement(ye,{value:d,setValue:h}),r.a.createElement(u.a,{variant:"body2"},`$${d}`)),r.a.createElement(F.a,{className:e.dialogActionsBox},r.a.createElement(m.a,{onClick:C,color:"primary",variant:"text"},"Cancel"),r.a.createElement(m.a,{onClick:()=>{console.log(`Alert set for ${t}:\n      - Lower Threshold: ${d}\n      - Upper Threshold: ${g}`),C()},color:"primary",variant:"contained"},"Create Alert")))))};t.default=function(){Object(i.useDispatch)();const{appliedFilters:e,accessDenied:t}=Object(i.useSelector)((e=>e.filters)),[a,o]=Object(n.useState)({}),[l,c]=Object(n.useState)({}),[m,p]=Object(n.useState)(!1),[d,h]=Object(n.useState)({});return t?r.a.createElement(R.a,null):r.a.createElement(s.a,{container:!0,spacing:3},r.a.createElement(u.a,{variant:"h1",gutterBottom:!0},"CryptoVoice Dashboard"),r.a.createElement(ke,{evaluations:a,subjects:l,handleCopyFilters:()=>{Object(T.a)(d)}}),r.a.createElement(u.a,{variant:"h1",gutterBottom:!0,style:{marginTop:"70px",marginBottom:"40px"}},"Crypto News Spotlight"),r.a.createElement(V,null),r.a.createElement(x,null))}},558:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),r=a(559);function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function l(e,t,a){return(t=s(t))in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},c.apply(this,arguments)}function u(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,i,o,s=[],l=!0,c=!1;try{if(i=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;l=!1}else for(;!(l=(n=i.call(a)).done)&&(s.push(n.value),s.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{if(!l&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(c)throw r}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var d="undefined"!==typeof window&&"undefined"!==typeof window.document&&"undefined"!==typeof window.document.createElement?n.useLayoutEffect:n.useEffect;function h(e){var t=n.useRef(e);return d((function(){t.current=e})),n.useCallback((function(){for(var e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];return t.current.apply(void 0,a)}),[])}var g=["ref","startOnMount","enableReinitialize","delay","onEnd","onStart","onPauseResume","onReset","onUpdate"],f={decimal:".",separator:",",delay:null,prefix:"",suffix:"",duration:2,start:0,decimals:0,startOnMount:!0,enableReinitialize:!0,useEasing:!0,useGrouping:!0,useIndianSeparators:!1},b=function(e){var t=Object.fromEntries(Object.entries(e).filter((function(e){return void 0!==m(e,2)[1]}))),a=n.useMemo((function(){return o(o({},f),t)}),[e]),i=a.ref,s=a.startOnMount,l=a.enableReinitialize,c=a.delay,p=a.onEnd,d=a.onStart,b=a.onPauseResume,y=a.onReset,E=a.onUpdate,x=u(a,g),v=n.useRef(),w=n.useRef(),C=n.useRef(!1),O=h((function(){return function(e,t){var a=t.decimal,n=t.decimals,i=t.duration,o=t.easingFn,s=t.end,l=t.formattingFn,c=t.numerals,u=t.prefix,m=t.separator,p=t.start,d=t.suffix,h=t.useEasing,g=t.useGrouping,f=t.useIndianSeparators,b=t.enableScrollSpy,y=t.scrollSpyDelay,E=t.scrollSpyOnce,x=t.plugin;return new r.CountUp(e,s,{startVal:p,duration:i,decimal:a,decimalPlaces:n,easingFn:o,formattingFn:l,numerals:c,separator:m,prefix:u,suffix:d,plugin:x,useEasing:h,useIndianSeparators:f,useGrouping:g,enableScrollSpy:b,scrollSpyDelay:y,scrollSpyOnce:E})}("string"===typeof i?i:i.current,x)})),k=h((function(e){var t=v.current;if(t&&!e)return t;var a=O();return v.current=a,a})),S=h((function(){var e=function(){return k(!0).start((function(){null===p||void 0===p||p({pauseResume:j,reset:V,start:R,update:T})}))};c&&c>0?w.current=setTimeout(e,1e3*c):e(),null===d||void 0===d||d({pauseResume:j,reset:V,update:T})})),j=h((function(){k().pauseResume(),null===b||void 0===b||b({reset:V,start:R,update:T})})),V=h((function(){k().el&&(w.current&&clearTimeout(w.current),k().reset(),null===y||void 0===y||y({pauseResume:j,start:R,update:T}))})),T=h((function(e){k().update(e),null===E||void 0===E||E({pauseResume:j,reset:V,start:R})})),R=h((function(){V(),S()})),F=h((function(e){s&&(e&&V(),S())}));return n.useEffect((function(){C.current?l&&F(!0):(C.current=!0,F())}),[l,C,F,c,e.start,e.suffix,e.prefix,e.duration,e.separator,e.decimals,e.decimal,e.formattingFn]),n.useEffect((function(){return function(){V()}}),[V]),{start:R,pauseResume:j,reset:V,update:T,getCountUp:k}},y=["className","redraw","containerProps","children","style"];t.default=function(e){var t=e.className,a=e.redraw,r=e.containerProps,i=e.children,s=e.style,l=u(e,y),m=n.useRef(null),p=n.useRef(!1),d=b(o(o({},l),{},{ref:m,startOnMount:"function"!==typeof i||0===e.delay,enableReinitialize:!1})),g=d.start,f=d.reset,E=d.update,x=d.pauseResume,v=d.getCountUp,w=h((function(){g()})),C=h((function(t){e.preserveValue||f(),E(t)})),O=h((function(){"function"!==typeof e.children||m.current instanceof Element?v():console.error('Couldn\'t find attached element to hook the CountUp instance into! Try to attach "containerRef" from the render prop to a an Element, eg. <span ref={containerRef} />.')}));n.useEffect((function(){O()}),[O]),n.useEffect((function(){p.current&&C(e.end)}),[e.end,C]);var k=a&&e;return n.useEffect((function(){a&&p.current&&w()}),[w,a,k]),n.useEffect((function(){!a&&p.current&&w()}),[w,a,e.start,e.suffix,e.prefix,e.duration,e.separator,e.decimals,e.decimal,e.className,e.formattingFn]),n.useEffect((function(){p.current=!0}),[]),"function"===typeof i?i({countUpRef:m,start:g,reset:f,update:E,pauseResume:x,getCountUp:v}):n.createElement("span",c({className:t,ref:m,style:s},r),"undefined"!==typeof e.start?v().formattingFn(e.start):"")},t.useCountUp=b},559:function(e,t,a){"use strict";a.r(t),a.d(t,"CountUp",(function(){return r}));var n=function(){return n=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},n.apply(this,arguments)},r=function(){function e(e,t,a){var r=this;this.endVal=t,this.options=a,this.version="2.8.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(e){r.startTime||(r.startTime=e);var t=e-r.startTime;r.remaining=r.duration-t,r.useEasing?r.countDown?r.frameVal=r.startVal-r.easingFn(t,0,r.startVal-r.endVal,r.duration):r.frameVal=r.easingFn(t,r.startVal,r.endVal-r.startVal,r.duration):r.frameVal=r.startVal+(r.endVal-r.startVal)*(t/r.duration);var a=r.countDown?r.frameVal<r.endVal:r.frameVal>r.endVal;r.frameVal=a?r.endVal:r.frameVal,r.frameVal=Number(r.frameVal.toFixed(r.options.decimalPlaces)),r.printValue(r.frameVal),t<r.duration?r.rAF=requestAnimationFrame(r.count):null!==r.finalEndVal?r.update(r.finalEndVal):r.options.onCompleteCallback&&r.options.onCompleteCallback()},this.formatNumber=function(e){var t,a,n,i,o=e<0?"-":"";t=Math.abs(e).toFixed(r.options.decimalPlaces);var s=(t+="").split(".");if(a=s[0],n=s.length>1?r.options.decimal+s[1]:"",r.options.useGrouping){i="";for(var l=3,c=0,u=0,m=a.length;u<m;++u)r.options.useIndianSeparators&&4===u&&(l=2,c=1),0!==u&&c%l==0&&(i=r.options.separator+i),c++,i=a[m-u-1]+i;a=i}return r.options.numerals&&r.options.numerals.length&&(a=a.replace(/[0-9]/g,(function(e){return r.options.numerals[+e]})),n=n.replace(/[0-9]/g,(function(e){return r.options.numerals[+e]}))),o+r.options.prefix+a+n+r.options.suffix},this.easeOutExpo=function(e,t,a,n){return a*(1-Math.pow(2,-10*e/n))*1024/1023+t},this.options=n(n({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(t),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof e?document.getElementById(e):e,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined","undefined"!=typeof window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,e):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return r.handleScroll(r)})),window.onscroll=function(){window.onScrollFns.forEach((function(e){return e()}))},this.handleScroll(this)))}return e.prototype.handleScroll=function(e){if(e&&window&&!e.once){var t=window.innerHeight+window.scrollY,a=e.el.getBoundingClientRect(),n=a.top+window.pageYOffset,r=a.top+a.height+window.pageYOffset;r<t&&r>window.scrollY&&e.paused?(e.paused=!1,setTimeout((function(){return e.start()}),e.options.scrollSpyDelay),e.options.scrollSpyOnce&&(e.once=!0)):(window.scrollY>r||n>t)&&!e.paused&&e.reset()}},e.prototype.determineDirectionAndSmartEasing=function(){var e=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>e;var t=e-this.startVal;if(Math.abs(t)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=e;var a=this.countDown?1:-1;this.endVal=e+a*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=e,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},e.prototype.start=function(e){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),e&&(this.options.onCompleteCallback=e),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},e.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},e.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},e.prototype.update=function(e){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(e),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},e.prototype.printValue=function(e){var t;if(this.el){var a=this.formattingFn(e);(null===(t=this.options.plugin)||void 0===t?void 0:t.render)?this.options.plugin.render(this.el,a):"INPUT"===this.el.tagName?this.el.value=a:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=a:this.el.innerHTML=a}},e.prototype.ensureNumber=function(e){return"number"==typeof e&&!isNaN(e)},e.prototype.validateValue=function(e){var t=Number(e);return this.ensureNumber(t)?t:(this.error="[CountUp] invalid start or end value: ".concat(e),null)},e.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},e}()}}]);
//# sourceMappingURL=16.ab33e0be.chunk.js.map