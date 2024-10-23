(this.webpackJsonpCryptoVoice=this.webpackJsonpCryptoVoice||[]).push([[5],{113:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(8);const s={checkLogIn:function(){var e=!0;if(null!==sessionStorage.getItem(n.SESSION_KEYS.TOKEN)){var t=new Date;e=!(new Date(sessionStorage.getItem(n.SESSION_KEYS.EXPIRATION_DATE))>t)}else e=!0;e&&(window.location.href="login.html")},setToken:function(e){let t=new Date;t.setMinutes(t.getMinutes()+60),sessionStorage.setItem(n.SESSION_KEYS.TOKEN,e),sessionStorage.setItem(n.SESSION_KEYS.EXPIRATION_DATE,t.toString())},getToken:function(){return sessionStorage.getItem(n.SESSION_KEYS.TOKEN)}}},116:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(22),s=a(8);const r={api:n.a.defaults.baseURL,ApiLogIn:n.a.defaults.baseURL,ApiLogOut:n.a.defaults.baseURL+"/auth/logout",ApiChangePassword:n.a.defaults.baseURL+"/auth/",ApiResetPassword:n.a.defaults.baseURL+"/auth/password",ApiRegister:n.a.defaults.baseURL+"/auth/register",ApiInstitution:s.ENDPOINTS.INSTITUTION.LIST+"/"+sessionStorage.getItem(s.SESSION_KEYS.USER_ID),ApiSetInst:s.ENDPOINTS.PORTAL_USER.SET_INST+"/"};n.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}))},137:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));const n=e=>{var t,a,n,s,r;if(null===e||void 0===e)return"";("string"!==typeof e&&(e=e.toString()),null!==(t=e)&&void 0!==t&&t.startsWith("vm_"))&&(e=null===(s=e)||void 0===s?void 0:s.substring(3));null!==(a=e)&&void 0!==a&&a.endsWith("_id")&&(e=null===(r=e)||void 0===r?void 0:r.substring(0,e.length-3));return(null===(n=e)||void 0===n?void 0:n.split(".")).map((e=>e.split("_").map((e=>{var t;return(null===e||void 0===e||null===(t=e.charAt(0))||void 0===t?void 0:t.toUpperCase())+(null===e||void 0===e?void 0:e.slice(1))})).join(" "))).join(" ")}},15:function(e,t,a){"use strict";a.d(t,"p",(function(){return n})),a.d(t,"m",(function(){return s})),a.d(t,"n",(function(){return r})),a.d(t,"l",(function(){return i})),a.d(t,"k",(function(){return o})),a.d(t,"h",(function(){return l})),a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return u})),a.d(t,"f",(function(){return p})),a.d(t,"j",(function(){return m})),a.d(t,"o",(function(){return g})),a.d(t,"i",(function(){return h})),a.d(t,"d",(function(){return S})),a.d(t,"e",(function(){return E})),a.d(t,"c",(function(){return b}));const n="SET_THEME",s="SET_SIGNED_IN",r="SET_SIGNED_OUT",i="SET_RESET_PASSWORD_DONE",o="SET_NEW_PASSWORD_DONE",l="SET_AUTH_LOADING",c="SET_AUTH_ERROR",d="ENQUEUE_SNACKBAR",u="CLOSE_SNACKBAR",p="REMOVE_SNACKBAR",m="SET_FORM_STATUS",g="SET_START_DATE",h="SET_END_DATE",S="FETCH_KPI_DATA_REQUEST",E="FETCH_KPI_DATA_SUCCESS",b="FETCH_KPI_DATA_FAILURE"},153:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"c",(function(){return l}));var n=a(92),s=a.n(n),r=a(163);s.a.locale("es");const i=e=>{const t=e.substring(0,10),a=(null===t||void 0===t?void 0:t.split("-"))||[0,0,0];return`${a[2]}/${a[1]}/${a[0]}`},o=e=>Object(r.a)(e,"yyyy-MM-dd"),l=e=>e instanceof Date&&!isNaN(e.getTime())},177:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(22),s=a(116),r=a(27),i=a(21),o=a(33),l=a(19),c=a(8),d=a(234),u=a(39);const p={setInstitution:function(e,t,a){return d.a.create({baseURL:"https://",responseType:"json",headers:{AuthType:c.HEADERS_VALUES.PARTNER,Authorization:t+":"+a,LoginType:4}}).post(s.a.ApiSetInst+e).then((e=>(sessionStorage.setItem(c.SESSION_KEYS.PERMISSIONS,JSON.stringify(e.data.data)),e.data))).catch((e=>{Object(u.a)(e,l.error.portalUsers.set)}))},getMasterList:function(){return n.a.post(c.ENDPOINTS.PORTAL_USER.LIST+"/-1").then((e=>{var t;return Object.values(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data)||[]})).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},get:function(e){return n.a.post(c.ENDPOINTS.PORTAL_USER.GET+"/"+e).then((e=>e.data||[])).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},search:function(e){return n.a.post(c.ENDPOINTS.PORTAL_USER.SEARCH+"/0",{email:e}).then((e=>e.data||[])).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},link:function(e,t,a){const s="/"+e+"?institution="+t+"&link="+a;return n.a.post(c.ENDPOINTS.PORTAL_USER.LINK+s).then((e=>(1===a?i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.link))):i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.unlink))),e.data||[]))).catch((e=>{1===a?Object(u.a)(e,l.error.portalUsers.link):Object(u.a)(e,l.error.portalUsers.unlink)}))},set:function(e,t,a,s){const d=e?"/"+e:"/0",p=e?{name:t.name,lastname:t.lastname,company:t.company,user_role:s}:{name:t.name,lastname:t.lastname,passwd:t.password,email:t.email,company:t.company,institution_id:a,user_role:s,force_enable:!0};return n.a.post(c.ENDPOINTS.PORTAL_USER.SET+d,p).then((t=>(e?i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.edit))):i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.create))),t.data||[]))).catch((t=>{const a=e?l.error.portalUsers.edit:l.error.portalUsers.create;Object(u.a)(t,a)}))},enable:function(e,t){return n.a.post(c.ENDPOINTS.PORTAL_USER.SET+"/"+e,{enabled:t}).then((e=>(i.a.dispatch(Object(r.b)(Object(o.b)(t?l.success.portalUsers.enable:l.success.portalUsers.disable))),e.data||[]))).catch((e=>{Object(u.a)(e,t?l.error.portalUsers.enable:l.error.portalUsers.disable)}))}}},186:function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"h",(function(){return p})),a.d(t,"i",(function(){return m})),a.d(t,"g",(function(){return g})),a.d(t,"j",(function(){return S})),a.d(t,"a",(function(){return E})),a.d(t,"e",(function(){return b})),a.d(t,"b",(function(){return f})),a.d(t,"f",(function(){return _}));var n=a(85),s=a(219),r=a(137),i=a(153);const o=Object(n.b)("filters/loadFilterValues",(async(e,t)=>{let{rejectWithValue:a}=t;try{const e=await s.a.getFilterValues();return 200===(null===e||void 0===e?void 0:e.http_code)?e.data:a("Failed to load filter values")}catch(n){return a(n.toString())}})),l=(e,t)=>{let a=[];return e&&e.$in&&(a=e.$in),a.includes(t.key)||a.push(t.key),{$in:a}},c=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:parseFloat,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const n={};return void 0!=e.min&&""!==e.min&&(n.$gte=a?a(e.min,"yyyy-MM-dd"):t(e.min)),void 0!=e.max&&""!==e.max&&(n.$lte=a?a(e.max,"yyyy-MM-dd"):t(e.max)),n},d=e=>{e.selectedFilter=null,e.selectedSubFilter=null,e.selectedCategory=null,e.filterType=""},u=Object(n.c)({name:"filters",initialState:{filters:{subjects:[],evaluations:[]},institutionMap:{},portalUserMap:{},evaluationTypeMap:{},isLoading:!0,error:null,selectedFilter:null,selectedSubFilter:null,selectedCategory:null,appliedFilters:{},appliedValues:[],filtersToRender:[],filterType:"",subFilterType:"",searchDisable:!0,disabledKeys:[]},reducers:{setSelectedFilter:(e,t)=>{e.selectedFilter=t.payload},setSelectedSubFilter:(e,t)=>{e.selectedSubFilter=t.payload},setSelectedCategory:(e,t)=>{e.selectedCategory=t.payload},setFilterType:(e,t)=>{e.filterType=t.payload},setSubFilterType:(e,t)=>{e.subFilterType=t.payload},applyFilters:(e,t)=>{const{filter:a,value:n,filterType:s,filterCategory:o}=t.payload;let u,p,m=a.replace(/^(subjects?|evaluations?)\./,"");if(u="subjects"===o?`subject.${m}`:"evaluations"===o?m:a,e.selectedSubFilter){let t=e.selectedSubFilter.replace(/^(subjects?|evaluations?)\./,"");e.selectedSubFilter="subjects"===o?`subject.${t}`:"evaluations"===o?t:e.selectedSubFilter,p=Object(r.a)(t),u=`${e.selectedSubFilter}`}else p=Object(r.a)(m);const g={filterTitleCase:p,filter_type:s,sub_filter_type:e.subFilterType,filter_values:n,filterCategory:o,filterKey:u};let h;if(e.filtersToRender.push(g),e.appliedFilters[`${o}_filters`]||(e.appliedFilters[`${o}_filters`]={}),"array"===s){const t=e.appliedFilters[`${o}_filters`][u];h=l(t,n)}else if("int"===s||"float"===s)h=c(n,parseFloat),e.disabledKeys.push(m);else if("datetime"===s)h=c(n,null,i.a),e.disabledKeys.push(m),d(e);else if("list_value_range"===s)if("array"===e.subFilterType){const t=e.appliedFilters[`${o}_filters`][u];h=l(t,n),e.disabledKeys.push(n.key)}else"int"===e.subFilterType||"float"===e.subFilterType?(h=c(n,parseFloat),e.disabledKeys.push(u),d(e)):"datetime"===e.subFilterType?(h=c(n,null,i.a),e.disabledKeys.push(u),d(e)):"bool"===e.subFilterType&&(h=!0===n||!1,e.disabledKeys.push(u),d(e));e.appliedFilters[`${o}_filters`][u]=h,e.searchDisable=!1},clearAllFilters:e=>{e.appliedFilters={},e.filtersToRender=[],e.appliedValues=[],e.appliedKeys=[],e.disabledKeys=[]},removeAppliedFilter:(e,t)=>{const a=t.payload,{filterCategory:n,filterKey:s,filter_values:r,filter_type:i,sub_filter_type:o}=a;let l=s.replace(/^(subjects?|evaluations?)\./,"");e.disabledKeys="list_value_range"===i?"array"===o?e.disabledKeys.filter((e=>e!==r.key)):e.disabledKeys.filter((e=>e!==s)):e.disabledKeys.filter((e=>e!==l)),e.filtersToRender=e.filtersToRender.filter((e=>!(e.filterKey===s&&e.filterCategory===n&&JSON.stringify(e.filter_values)===JSON.stringify(r))));const c=`${n}_filters`;if(e.appliedFilters[c]){if("array"===i){const t=e.appliedFilters[c][s];t&&t.$in&&(t.$in=t.$in.filter((e=>e!==r.value)),0===t.$in.length?delete e.appliedFilters[c][s]:e.appliedFilters[c][s]=t)}else delete e.appliedFilters[c][s];0===Object.keys(e.appliedFilters[c]).length&&delete e.appliedFilters[c]}},setSearchDisable:(e,t)=>{e.searchDisable=t.payload}},extraReducers:e=>{e.addCase(o.pending,(e=>{e.isLoading=!0})).addCase(o.fulfilled,((e,t)=>{const{institutions:a,portal_users:n,evaluation_types:s,...r}=t.payload,i={...r.subjects},o={...r.evaluations};delete i.last_file_id,delete o.last_file_id,e.filters={subjects:i,evaluations:o},e.institutionMap=a||{},e.portalUserMap=n||{},e.evaluationTypeMap=s||{},e.isLoading=!1})).addCase(o.rejected,((e,t)=>{e.isLoading=!1,e.error=t.payload}))}}),{setSelectedFilter:p,setSelectedSubFilter:m,setSelectedCategory:g,setFilterType:h,setSubFilterType:S,applyFilters:E,removeAppliedFilter:b,clearAllFilters:f,setSearchDisable:_}=u.actions;t.c=u.reducer},19:function(e){e.exports=JSON.parse('{"error":{"account":{"post":"Account could not be modified"},"permissions":{"get":"User Permissions could not be retrieved","set":"User Permissions could not be set","post":"Account could not be modified"},"institutions":{"set":"Institution could not be set","edit":"Institution could not be modified","get":"Institution Information could not be retrieved","list_all":"Institutions could not be retrieved"},"task_sequences":{"get":"Data could not be retrieved","set":"Task Sequence could not be set","delete":"Task Sequence could not be deleted"},"portalUsers":{"set":"User could not be set","edit":"User could not be modified","create":"User could not be created","link":"User could not be linked","unlink":"User could not be unlinked","get":"User Information could not be retrieved","list":"Users could not be retrieved","access_denied":"Access Denied for list Users","reset_user_password":"Password could not be modified","disable":"User could not be disabled","enable":"User could not be enabled"},"instances":{"get":"Instances could not be retrieved","get_product":"Instance could not be retrieved","update":"Instance could not be updated","get_version_list":"Version list could not be retrieved","liberate":"Instance could not be released","create":"Instance could not be created"},"report":{"get":"Report could not be retrieved","get_master_evals":"KPI data could not be retrieved","access_denied":"Access Denied for KPI data"},"auth":{"logout":"Logout failed"},"KPI":{"store_user_kpi":"User KPI could not be stored","get_user_kpi":"User KPIs could not be retrieved","get_filter_values":"Filter Values could not be retrieved","build_kpi":"KPI could not be built","get_evaluators":"Evaluators could not be retrieved"},"researchDB":{"search":"ResearchDB search could not be done","get_filter_values":"Filter Values could not be retrieved"}},"success":{"account":{"post":"Account modified successfully"},"permissions":{"set":"Permissions modified successfully"},"institutions":{"edit":"Institution modified successfully","add":"Institution created successfully"},"task_sequences":{"set":"Task Sequence set successfully","delete":"Task Sequence deleted successfully"},"portalUsers":{"edit":"User modified successfully","create":"User created successfully","link":"User linked successfully","unlink":"User unlinked successfully","password":"Password modified successfully","disable":"User disabled successfully","enable":"User enabled successfully"},"instances":{"liberate":"Instance released successfully","update":"App Version updated successfully","create":"Instance created successfully","edit":"Instance information modified successfully"},"report":{"get_master_evals":"KPI data retrieved successfully"},"KPI":{"store_user_kpi":"User KPI stored successfully"}}}')},21:function(e,t,a){"use strict";var n=a(85),s=a(182),r=a(15);const i={loading:!1,signedIn:a(113).a.getToken()&&new Date<new Date(sessionStorage.getItem("expiration_date")),error:null,successMessage:null};const o={notifications:[{open:!1,dismissed:!0,variant:"success",key:"0"}]};const l={startDate:null,endDate:null};const c={isKPILoading:!1,calibrationData:[],trustworthyData:[],processingFailsData:[],discardedData:[],completedEvaluations:[],successfulTasks:[],error:null};var d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.d:return{...e,isKPILoading:!0,error:null};case r.e:return{...e,isKPILoading:!1,calibrationData:t.data.calibrations,trustworthyData:t.data.trustworthy_task,processingFailsData:t.data.processing_fails,discardedData:t.data.discarded,completedEvaluations:t.data.completed_evaluations,successfulTasks:t.data.successful_tasks};case r.c:return{...e,isKPILoading:!1,error:t.error};default:return e}},u=a(186),p=Object(s.a)({dateFilter:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.o:return{...e,startDate:t.date};case r.i:return{...e,endDate:t.date};default:return e}},kpiData:d,filters:u.c,alertMessages:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.b:return{...e,notifications:[...e.notifications,{key:t.key,...t.notification}]};case r.a:return{...e,notifications:e.notifications.map((e=>t.dismissAll||e.key===t.key?{...e,dismissed:!0}:{...e}))};case r.f:return{...e,notifications:e.notifications.filter((e=>e.key!==t.key))};default:return e}},themeReducer:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{currentTheme:0},t=arguments.length>1?arguments[1]:void 0;return t.type===r.p?{...e,currentTheme:t.payload}:e},auth:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.m:return{...e,signedIn:!0,loading:!1,error:null,successMessage:null};case r.n:return{...e,signedIn:!1};case r.l:return{...e,loading:!1,error:null,successMessage:"Se envi\xf3 un mail con instrucciones para reestablecer la contrase\xf1a."};case r.k:return{...e,loading:!1,error:null,successMessage:"La contrase\xf1a se cambi\xf3 exitosamente."};case r.h:return{...e,loading:!0};case r.g:return{...e,loading:!1,error:t.payload,successMessage:null};default:return e}}});const m=Object(n.a)({reducer:p});t.a=m},219:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(22),s=a(19),r=a(8),i=a(39);const o={getFilterValues:function(){return n.a.post(r.ENDPOINTS.DB.GET_FILTER_VALUES+"/0").then((e=>e.data||[])).catch((e=>{var t,a;return Object(i.a)(e||"",(null===s||void 0===s||null===(t=s.error)||void 0===t||null===(a=t.researchDB)||void 0===a?void 0:a.get_filter_values)||""),null===e||void 0===e?void 0:e.response}))},search:function(e){return n.a.post(r.ENDPOINTS.DB.SEARCH+"/0",e).then((e=>e.data.data||[])).catch((t=>{var a,n;console.log("Error in DBService.search when applying filters: "),console.log(e||"No filters applied"),Object(i.a)(t||"",(null===s||void 0===s||null===(a=s.error)||void 0===a||null===(n=a.researchDB)||void 0===n?void 0:n.search)||"")}))}}},22:function(e,t,a){"use strict";var n=a(234),s=a(8);let r=sessionStorage.getItem(s.SESSION_KEYS.USER_ID)+":"+sessionStorage.getItem(s.SESSION_KEYS.TOKEN);const i=n.a.create({baseURL:"https://",responseType:"json",headers:{AuthType:s.HEADERS_VALUES.PARTNER,Authorization:r,LoginType:4}});t.a=i},223:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(13),i=a(57),o=a(135),l=a(47),c=a(180),d=a(169),u=a(86),p=a(95);const m=Object(r.c)(o.a)(d.b),g=r.c.div`
  padding: ${e=>e.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${e=>e.theme.breakpoints.up("md")} {
    padding: ${e=>e.theme.spacing(10)}px;
  }
`;t.default=function(){return s.a.createElement(g,null,s.a.createElement(l.a,{component:"h1",variant:"h1",align:"center",gutterBottom:!0},"404"),s.a.createElement(l.a,{component:"h2",variant:"h5",align:"center",gutterBottom:!0},"Page not found."),s.a.createElement(l.a,{component:"h2",variant:"body1",align:"center",gutterBottom:!0},"The page you are looking for might have been removed."),s.a.createElement(m,{component:i.b,to:"/",variant:"contained",color:"secondary",mt:2},"Return to website"),s.a.createElement(c.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},s.a.createElement(c.a,{item:!0,style:{paddingTop:50}},s.a.createElement(u.a,{logo:p.a,width:"45%"}))))}},27:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return r}));var n=a(15);const s=e=>{const t=e.options&&e.options.key;return{type:n.b,notification:{...e,key:t||(new Date).getTime()+Math.random()}}},r=e=>({type:n.a,dismissAll:!e,key:e})},33:function(e,t,a){"use strict";a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return u}));var n=a(27),s=a(0),r=a.n(s),i=a(134),o=a(89),l=a.n(o),c=a(21);function d(e){return{open:!0,message:`${e}`,options:{variant:"success",autoHideDuration:12e3,key:(new Date).getTime(),action:e=>r.a.createElement(i.a,{key:"close","aria-label":"close",color:"inherit",onClick:()=>c.a.dispatch(Object(n.a)(e))},r.a.createElement(l.a,null))}}}function u(e){return{open:!0,message:`${e}`,options:{variant:"error",autoHideDuration:12e3,key:(new Date).getTime(),action:e=>r.a.createElement(i.a,{key:"close","aria-label":"close",color:"inherit",onClick:()=>c.a.dispatch(Object(n.a)(e))},r.a.createElement(l.a,null))}}}},348:function(e,t){},362:function(e,t,a){},372:function(e,t,a){"use strict";a.r(t);a(266),a(287);var n=a(0),s=a.n(n),r=a(16),i=a.n(r),o=a(36),l=a(183),c=a(435),d=a(406),u=a(381),p=a(13),m=a(168),g=a(96),h=a(97),S=a(98);var E=[{name:"Dark",palette:{primary:{main:"#040505",contrastText:"#FFF"},secondary:{main:g.a[500],contrastText:"#FFF"},textSecondary:{main:"#686868"}},header:{color:"#121212",background:"#121212",search:{color:h.a[800]},indicator:{background:g.a[600]}},sidebar:{color:"#242424",background:"#F6FBFF",header:{color:h.a[900],background:"#121212",brand:{color:g.a[500]}},footer:{color:h.a[900],background:"#F6FBFF",online:{background:S.a[500]}},badge:{color:"#FFF",background:g.a[500]}},body:{background:"linear-gradient(180deg, #181A1F, #1C1B1B)"}}];var b={useNextVariants:!0,fontFamily:['"Segoe UI"',"-apple-system","BlinkMacSystemFont","Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),fontSize:14,fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:600,h1:{fontSize:"2rem",fontWeight:500,lineHeight:1.2},h2:{fontSize:"1.75rem",fontWeight:500,lineHeight:1.2},h3:{fontSize:"1.5rem",fontWeight:500,lineHeight:1.2},h4:{fontSize:"1.25rem",fontWeight:500,lineHeight:1.2},h5:{fontSize:"1.125rem",fontWeight:500,lineHeight:1.2},h6:{fontSize:"1.0625rem",fontWeight:500,lineHeight:1.2},body1:{fontSize:14,fontWeight:500},body2:{fontSize:14,color:"#686868"},button:{textTransform:"none"}};var f={MuiCardHeader:{action:{marginTop:"-4px",marginRight:"-4px"}},MuiPickersDay:{day:{fontWeight:"300"}},MuiPickersYear:{root:{height:"64px"}},MuiPickersCalendar:{transitionContainer:{marginTop:"6px"}},MuiPickersCalendarHeader:{iconButton:{backgroundColor:"transparent","& > *":{backgroundColor:"transparent"}},switchHeader:{marginTop:"2px",marginBottom:"4px"}},MuiPickersClock:{container:{margin:"32px 0 4px"}},MuiPickersClockNumber:{clockNumber:{left:"calc(50% - 16px)",width:"32px",height:"32px"}},MuiPickerDTHeader:{dateHeader:{"& h4":{fontSize:"2.125rem",fontWeight:400}},timeHeader:{"& h3":{fontSize:"3rem",fontWeight:400}}},MuiPickersTimePicker:{hourMinuteLabel:{"& h2":{fontSize:"3.75rem",fontWeight:300}}},MuiPickersToolbar:{toolbar:{"& h4":{fontSize:"2.125rem",fontWeight:400}}}};var _={values:{xs:0,sm:600,md:960,lg:1280,xl:1500}};var T={MuiButtonBase:{disableRipple:!0},MuiCardHeader:{titleTypographyProps:{variant:"h6"}}};function I(e){return`0 0 ${e}px 0 rgba(53,64,82,.05)`}var y=["none",I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14),I(14)];var v=E.map((e=>(e=>Object(m.a)({spacing:4,breakpoints:_,overrides:f,props:T,typography:b,shadows:y,body:e.body,header:e.header,palette:e.palette,sidebar:e.sidebar},e.name))(e))),O=a(66),N=a(408);const A=p.c.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;var R=function(){return s.a.createElement(A,null,s.a.createElement(N.a,{m:2,color:"secondary"}))};function P(e){class t extends s.a.Component{constructor(e){super(e),this.state={component:null}}async componentDidMount(){var t;await(t=250,new Promise((e=>setTimeout(e,t))));const{default:a}=await e();this.setState({component:a})}render(){const e=this.state.component;return e?s.a.createElement(e,this.props):s.a.createElement(R,null)}}return t}var k=a(429),D=a(430),U=a(431),F=a(432),x=a(154),j=a.n(x),C=a(158),L=a(159),w=a.n(L);const M=j()({}),K={authenticatedSelector:e=>!0,authenticatingSelector:e=>!1,wrapperDisplayName:"UserIsAuthenticated"},$=(w()(K),Object(C.connectedRouterRedirect)({...K,AuthenticatingComponent:R,redirectPath:(e,t)=>M.getRedirectQueryParam(t)||"/auth/sign-in"})),H=e=>$(P(e)),B={authenticatedSelector:e=>!e.auth.signedIn&&!e.auth.loading,authenticatingSelector:e=>e.auth.loading,wrapperDisplayName:"UserIsNotAuthenticated"},W=(w()(B),Object(C.connectedRouterRedirect)({...B,redirectPath:(e,t)=>M.getRedirectQueryParam(t)||"/",allowRedirectBack:!1}));var V,G,Y,z,q,J,Q,X=a(8);const Z=W(P((()=>Promise.all([a.e(0),a.e(1),a.e(26)]).then(a.bind(null,1374)))));const ee=P((()=>Promise.all([a.e(0),a.e(1),a.e(28)]).then(a.bind(null,1354)))),te=P((()=>Promise.all([a.e(0),a.e(23)]).then(a.bind(null,1375)))),ae=P((()=>Promise.all([a.e(0),a.e(24)]).then(a.bind(null,1376)))),ne=P((()=>Promise.resolve().then(a.bind(null,223)))),se=P((()=>a.e(29).then(a.bind(null,1355)))),re=(H((()=>a.e(22).then(a.bind(null,1377)))),H((()=>a.e(30).then(a.bind(null,1356)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(14)]).then(a.bind(null,1370)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(17)]).then(a.bind(null,1371)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(9)]).then(a.bind(null,1367)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(12)]).then(a.bind(null,1357))))),ie=(H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(10)]).then(a.bind(null,1358)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(8)]).then(a.bind(null,1368)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(20)]).then(a.bind(null,1363)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(19)]).then(a.bind(null,1373)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(13)]).then(a.bind(null,1359)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(11)]).then(a.bind(null,1360)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(15)]).then(a.bind(null,1361)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(4),a.e(7)]).then(a.bind(null,1372)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(18)]).then(a.bind(null,1369)))),H((()=>Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(21)]).then(a.bind(null,1364))))),oe=H((()=>Promise.all([a.e(0),a.e(25)]).then(a.bind(null,1362)))),le=P((()=>Promise.all([a.e(27),a.e(31)]).then(a.bind(null,1366)))),ce=JSON.parse(sessionStorage.getItem(X.SESSION_KEYS.PERMISSIONS)),de=(!!ce&&((null===(V=ce.stats)||void 0===V?void 0:V.find((e=>e===X.PERMISSIONS.CAN_SEE_KPI)))||(null===(G=ce.reports)||void 0===G?void 0:G.find((e=>e===X.PERMISSIONS.LIST)))||(null===(Y=ce.reports)||void 0===Y?void 0:Y.find((e=>e===X.PERMISSIONS.LIST_EVALUATORS)))||(null===(z=ce.instances)||void 0===z||z.find((e=>e===X.PERMISSIONS.LIST)))),!!ce&&(null===(q=ce.research_db)||void 0===q||q.find((e=>e===X.PERMISSIONS.CAN_RESEARCH_DB))),!!ce&&(null===(J=ce.research_db)||void 0===J||J.find((e=>e===X.PERMISSIONS.CAN_SEARCH_DB))),!!ce&&(null===(Q=ce.portal_users)||void 0===Q||Q.find((e=>e===X.PERMISSIONS.CAN_SEE_MASTER_LIST))),{id:"Home",path:"/",component:le,children:null,hidden:!0}),ue={id:"My Account",path:"/my_account",component:oe,children:null,hidden:!0},pe=(k.a,D.a,U.a,k.a,F.a,{id:"Auth",path:"/auth",icon:s.a.createElement(re,null),hidden:!0,children:[{path:"/auth/sign-in",name:"Sign In",component:Z},{path:"/auth/sign-up",name:"Sign Up",component:ee},{path:"/auth/forgot-password",name:"Forgot Password",component:te},{path:"/reset_your_password/:id",name:"Reset Password",component:ae},{path:"/auth/404",name:"404 Page",component:ne},{path:"/auth/500",name:"500 Page",component:se}]}),me={id:"Dashboard",path:"/dashboard",component:ie,icon:s.a.createElement(F.a,null)},ge=[ue,me],he=[pe],Se=[{path:"/landing",name:"Landing",component:le},de];var Ee=[ue,me],be=a(105),fe=a(57),_e=a(226),Te=a.n(_e),Ie=(a(362),a(95)),ye=a(230),ve=a.n(ye),Oe=a(229),Ne=a.n(Oe),Ae=a(400),Re=a(411),Pe=a(258),ke=a(388),De=a(394),Ue=a(47),Fe=a(412),xe=a(180),je=a(423),Ce=a(433),Le=a(434),we=a(86),Me=a(413),Ke=a(135),$e=a(64),He=a(93);let Be=Ee.filter((e=>!e.hidden));const We=s.a.forwardRef(((e,t)=>s.a.createElement(fe.c,Object.assign({innerRef:t},e)))),Ve=Object(p.c)(Ae.a)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`,Ge=Object(p.c)(Te.a)`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background-image: linear-gradient(to bottom, #FFFFFF 6.34%, #D2D2D2 77.92%) !important;
`,Ye=Object(p.c)(Re.a)`
`,ze=p.c.div`
  padding-top: ${e=>e.theme.spacing(2.5)}px;
  padding-bottom: ${e=>e.theme.spacing(2.5)}px;
`,qe=Object(p.c)(Pe.a)`
  font-size: ${e=>e.theme.typography.h5.fontSize};
  font-weight: ${e=>e.theme.typography.fontWeightMedium};
  color: ${e=>e.theme.sidebar.header.color};
  background: #FFFFFF 6.34%;
  font-family: ${e=>e.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${e=>e.theme.spacing(6)}px;
  padding-right: ${e=>e.theme.spacing(6)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  

  ${e=>e.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`,Je=Object(p.c)(Pe.a)`
  padding-top: ${e=>e.theme.spacing(3)}px;
  padding-bottom: ${e=>e.theme.spacing(3)}px;
  padding-left: ${e=>e.theme.spacing(6)}px;
  padding-right: ${e=>e.theme.spacing(5)}px;
  font-weight: ${e=>e.theme.typography.fontWeightRegular};

  svg {
    color: ${e=>e.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #D2D2D2;
    border-radius: 8px;
  }

  &.${e=>e.activeClassName} {

    span {
      color: ${e=>e.theme.sidebar.color};
    }
  }
`,Qe=Object(p.c)(ke.a)`
  margin: 0;
  span {
    color: ${e=>e.theme.sidebar.color};
    font-size: 16px;
    font-weight: 500;
    padding: 0 ${e=>e.theme.spacing(4)}px;
  }
`,Xe=Object(p.c)(Ce.a)`
  color: ${e=>Object(be.a)(e.theme.sidebar.color,.5)};
`,Ze=Object(p.c)(Le.a)`
  color: ${e=>Object(be.a)(e.theme.sidebar.color,.5)};
`,et=Object(p.c)(Pe.a)`
  padding-left: ${e=>e.theme.spacing(14)}px;
  padding-top: ${e=>e.theme.spacing(2)}px;
  padding-bottom: ${e=>e.theme.spacing(2)}px;

  span {
    color: ${e=>Object(be.a)(e.theme.sidebar.color,.7)};
  }

  &:hover {
    background: #EEF7FF;
    border-radius: 8px;
    span {
      color: ${e=>e.theme.sidebar.color};
    }
  }

  &.${e=>e.activeClassName} {

    span {
      color: ${e=>e.theme.sidebar.color};
    }
  }
`,tt=Object(p.c)(ke.a)`
  color: ${e=>e.theme.sidebar.color};
  span {
    font-size: 15px;
  }
  margin-top: 0;
  margin-bottom: 0;
`,at=Object(p.c)(De.a)`
  font-size: 11px;
  font-weight: ${e=>e.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${e=>e.theme.sidebar.badge.color};
    padding-left: ${e=>e.theme.spacing(2)}px;
    padding-right: ${e=>e.theme.spacing(2)}px;
  }
`,nt=Object(p.c)(at)`
  top: 12px;
`,st=Object(p.c)(Ue.a)`
  color: ${e=>e.theme.sidebar.color};
  padding: ${e=>e.theme.spacing(4)}px
    ${e=>e.theme.spacing(6)}px ${e=>e.theme.spacing(1)}px;
  font-weight: 600;
  display: block;
`,rt=p.c.div`
  padding: ${e=>e.theme.spacing(3)}px
    ${e=>e.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: #FFFFFF 77.92%;
  &:hover {
    background: #D2D2D2;
    cursor: pointer;
  }

`;function it(e){let{name:t,icon:a,classes:n,isOpen:r,isCollapsable:i,badge:o,...l}=e;return s.a.createElement(Je,l,a,s.a.createElement(Qe,null,t),i?r?s.a.createElement(Ze,null):s.a.createElement(Xe,null):null,o?s.a.createElement(nt,{label:o}):"")}function ot(e){let{name:t,to:a,badge:n,disabled:r=!1}=e;return s.a.createElement(et,{button:!0,dense:!0,component:We,exact:!0,to:a,activeClassName:"active",disabled:r},s.a.createElement(tt,null,t),n?s.a.createElement(at,{label:n}):"")}class lt extends s.a.Component{constructor(e){super(e),this.toggle=e=>{Object.keys(this.state).forEach((t=>this.state[e]||this.setState((()=>({[t]:!1}))))),this.setState((t=>({[e]:!t[e]})))},this.state={}}UNSAFE_componentWillMount(){const e=this.props.location.pathname;Be.forEach(((t,a)=>{const n=0===e.indexOf(t.path),s=t.open,r=!(!t.containsHome||"/"!==e);this.setState((()=>({[a]:n||s||r})))}))}render(){const{classes:e,staticContext:t,...a}=this.props;return s.a.createElement(Ve,Object.assign({variant:"permanent"},a),s.a.createElement(qe,null,s.a.createElement(we.a,{logo:Ie.a,padding:"5",width:"150px"})),s.a.createElement(Ge,null,s.a.createElement(Ye,{disablePadding:!0},s.a.createElement(ze,null,Be.map(((e,t)=>s.a.createElement(s.a.Fragment,{key:t},e.header?s.a.createElement(st,null,e.header):null,e.children?s.a.createElement(s.a.Fragment,{key:t},s.a.createElement(it,{isOpen:!this.state[t],isCollapsable:!0,name:e.id,icon:e.icon,button:!0,onClick:()=>this.toggle(t)}),s.a.createElement(Fe.a,{in:this.state[t],timeout:"auto",unmountOnExit:!0},e.children.map(((e,t)=>e.hidden?null:s.a.createElement(ot,{key:t,name:e.name,to:e.path,icon:e.icon,badge:e.badge,disabled:e.disabled}))))):s.a.createElement(it,{isCollapsable:!1,name:e.id,to:e.path,activeClassName:"active",component:We,icon:e.icon,exact:!0,badge:e.badge}))))))),s.a.createElement(Me.a,null),s.a.createElement(rt,{onClick:()=>this.toggle(10)},s.a.createElement(xe.a,{container:!0,spacing:2},s.a.createElement(xe.a,{item:!0},s.a.createElement(je.a,{alt:sessionStorage.getItem("user_first_name"),src:"../images/user.png",style:{color:"#FFFFFF",backgroundColor:"#D2D2D2"}})),s.a.createElement(xe.a,{item:!0},s.a.createElement(Ue.a,{variant:"body1"},sessionStorage.getItem("user_first_name")," ",sessionStorage.getItem("user_last_name")),s.a.createElement(Ue.a,{variant:"body2"},sessionStorage.getItem("username"))),s.a.createElement(xe.a,{item:!0,xs:12},s.a.createElement(Fe.a,{in:this.state[10],timeout:"auto",unmountOnExit:!0},s.a.createElement(xe.a,{item:!0,xs:12},s.a.createElement(Ke.a,{startIcon:s.a.createElement(Ne.a,null),onClick:e=>Object($e.a)("/my_account"),disabled:!sessionStorage.getItem(X.SESSION_KEYS.TOKEN),fullWidth:!0,style:{justifyContent:"left"}},"My Account")),s.a.createElement(xe.a,{item:!0,xs:12},s.a.createElement(Ke.a,{startIcon:s.a.createElement(ve.a,null),onClick:e=>(He.a.logout(),sessionStorage.removeItem(X.SESSION_KEYS.TOKEN),sessionStorage.removeItem(X.SESSION_KEYS.USER),sessionStorage.removeItem(X.SESSION_KEYS.USER_ID),void Object($e.a)("/auth/sign-in")),disabled:!sessionStorage.getItem(X.SESSION_KEYS.TOKEN),fullWidth:!0,style:{justifyContent:"left"}},"Logout")),s.a.createElement(xe.a,{item:!0,xs:12},s.a.createElement(Ue.a,{style:{marginTop:"15px"}},"VERSION: ",X.VERSION)))))))}}var ct=Object(O.i)(lt),dt=a(414),ut=a(389),pt=a(390),mt=a(391),gt=a.p+"static/media/Logo.e372df51.png";const ht=Object(p.c)(dt.a)`
  background: rgba(30, 35, 41, 0.1);  /* Darker background with some transparency */
  color: ${e=>e.theme.header.color};
  backdrop-filter: blur(10px); /* Apply blur effect */
`,St=p.c.div`

  
  ${e=>e.theme.breakpoints.up("md")} {
    padding-left: 7vw;   // Apply same padding for left
    padding-right: 8vw;  // Apply same padding for right
  }
`,Et=p.c.img`
  width: 130px;
  height: auto;
`,bt=p.c.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;var ft=Object(o.connect)()(Object(p.e)((e=>{let{onDrawerToggle:t}=e;const[a,r]=Object(n.useState)(null),i=Object(O.f)(),o=()=>{r(null)};return s.a.createElement(s.a.Fragment,null,s.a.createElement(ht,{position:"sticky",elevation:0},s.a.createElement(St,null,s.a.createElement(ut.a,null,s.a.createElement(xe.a,{container:!0,alignItems:"center",justifyContent:"space-between"},s.a.createElement(xe.a,{item:!0,xs:4,container:!0,justifyContent:"left"},s.a.createElement(Et,{src:gt,alt:"App Logo"})),s.a.createElement(xe.a,{item:!0,xs:4,container:!0,justifyContent:"flex-end"},s.a.createElement(bt,null,s.a.createElement(Ue.a,{variant:"body1"},"Hello, User"),s.a.createElement(je.a,{alt:"User Name",src:"/path-to-avatar-image.jpg",onClick:e=>{r(e.currentTarget)},style:{cursor:"pointer"}})),s.a.createElement(pt.a,{open:Boolean(a),anchorEl:a,onClose:o,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},PaperProps:{style:{minWidth:"200px",padding:"10px"}}},s.a.createElement(mt.a,{onClick:o},"Profile"),s.a.createElement(mt.a,{onClick:o},"Princing"),s.a.createElement(mt.a,{onClick:()=>{i.push("/")}},"Logout")," ")))))))}))),_t=a(169),Tt=a(88),It=a(416),yt=a(27),vt=a(118);let Ot=[];var Nt=()=>{const e=Object(o.useDispatch)(),t=Object(o.useSelector)((e=>e.alertMessages.notifications||[])),{enqueueSnackbar:a,closeSnackbar:n}=Object(vt.b)();return s.a.useEffect((()=>{t.forEach((e=>{let{key:t,message:s,options:r={},dismissed:i=!1}=e;var o;i?n(t):Ot.includes(t)||(a(s,{key:t,...r,onClose:(e,t,a)=>{r.onClose&&r.onClose(e,t,a)}}),o=t,Ot=[...Ot,o])}))}),[t,n,a,e]),null};const At=p.b`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${e=>e.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`,Rt=p.c.div`
  display: flex;
  min-height: 100vh;
`,Pt=p.c.div`
  ${e=>e.theme.breakpoints.up("md")} {
    flex-shrink: 0;
  }
`,kt=p.c.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,Dt=Object(p.c)(Tt.a)(_t.b),Ut=Object(p.c)(Dt)`
  flex: 1;
  background: ${e=>e.theme.body.background};
  
  ${e=>e.theme.breakpoints.down("md")} {
    max-width: 100vw;
  }
  
  ${e=>e.theme.breakpoints.up("md")} {
    max-width: calc(100vw);
    padding-left: 8vw;
    padding-right: 8vw;
  }
 

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;class Ft extends s.a.Component{constructor(){super(...arguments),this.state={mobileOpen:!1},this.handleDrawerToggle=()=>{this.setState((e=>({mobileOpen:!e.mobileOpen})))}}render(){const{children:e,routes:t}=this.props;return s.a.createElement(Rt,null,s.a.createElement(Nt,null),s.a.createElement(It.a,null),s.a.createElement(At,null),s.a.createElement(Pt,null,s.a.createElement(ct,{routes:t,PaperProps:{style:{width:"20%"}},variant:"temporary",open:this.state.mobileOpen,onClose:this.handleDrawerToggle})),s.a.createElement(kt,null,s.a.createElement(ft,{onDrawerToggle:this.handleDrawerToggle}),s.a.createElement(Ut,{p:10},e)))}}var xt=Object(o.connect)(((e,t)=>({snackbar:e.alertMessages.notifications})),(e=>({closeSnackbar:t=>e(Object(yt.a)(t))})))(Ft);const jt=p.b`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: linear-gradient(180deg, white, black); /* Gradient background */
  }
`,Ct=p.c.div`
  max-width: 365px;
  max-height: 400px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  padding-bottom: 5%;
`;var Lt=function(e){let{children:t}=e;return s.a.createElement(Ct,null,s.a.createElement(jt,null),s.a.createElement(xe.a,{container:!0,justifyContent:"flex-start",alignItems:"flex-start"},s.a.createElement(xe.a,{item:!0,xs:12},t)))},wt=a(401),Mt=a(417),Kt=a(418),$t=a.p+"static/media/logo_simple.28907bff.svg";const Ht=p.b`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${e=>e.theme.body.background};
  }
`;var Bt=function(e){let{children:t}=e;return s.a.createElement(s.a.Fragment,null,s.a.createElement(It.a,null),s.a.createElement(Ht,null),t,s.a.createElement(wt.a,{sx:{py:5,textAlign:"center",position:"relative",bgcolor:"#f0f2f5"}},s.a.createElement(Mt.a,null,s.a.createElement("img",{src:$t,alt:"Logo",style:{width:"40px",height:"auto",marginBottom:"10px"}}),s.a.createElement(Ue.a,{variant:"caption",component:"p"},"\xa9 All rights reserved",s.a.createElement("br",null)," made by \xa0",s.a.createElement(Kt.a,{href:"https://linkedin.com"},"CryptoVoice")))))},Wt=a(223);const Vt=(e,t)=>t.map(((t,a)=>{let{children:n,path:r,component:i}=t;return n?n.map(((t,a)=>{let{path:n,component:r}=t;return s.a.createElement(O.a,{key:a,path:n,exact:!0,render:t=>s.a.createElement(e,null,s.a.createElement(r,t))})})):s.a.createElement(O.a,{key:a,path:r,exact:!0,render:t=>s.a.createElement(e,null,s.a.createElement(i,t))})}));var Gt=()=>s.a.createElement(O.c,null,Vt(xt,ge),Vt(Lt,he),Vt(Bt,Se),s.a.createElement(n.Suspense,{fallback:s.a.createElement("div",null,"Loading...")},s.a.createElement(O.a,{render:()=>s.a.createElement(Lt,null,s.a.createElement(Wt.default,null))}))),Yt=a(231);const zt=Object(o.connect)((e=>({theme:e.themeReducer})))((e=>{let{theme:t}=e;return s.a.createElement(u.b,{injectFirst:!0},s.a.createElement(d.a,{utils:l.a},s.a.createElement(c.a,{theme:v[t.currentTheme]},s.a.createElement(p.a,{theme:v[t.currentTheme]},s.a.createElement(Yt.a,null,s.a.createElement(vt.a,{maxSnack:1},s.a.createElement(Gt,null)))))))}));var qt=function(){return s.a.createElement(fe.a,{basename:"/cv-ui"},s.a.createElement(zt,null))},Jt=a(21);i.a.render(s.a.createElement(o.Provider,{store:Jt.a},s.a.createElement(qt,null)),document.getElementById("root"))},39:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(21),s=a(27),r=a(33),i=a(93),o=a(64);function l(e,t){var a,l,c,d,u,p,m,g,h;if(null!==e&&void 0!==e&&null!==(a=e.response)&&void 0!==a&&null!==(l=a.data)&&void 0!==l&&null!==(c=l.message)&&void 0!==c&&c.includes("Failed in authentication")||null!==e&&void 0!==e&&null!==(d=e.response)&&void 0!==d&&null!==(u=d.data)&&void 0!==u&&null!==(p=u.message)&&void 0!==p&&p.includes("Bad permissions"))i.a.logout(),Object(o.a)("/auth/sign-in"),n.a.dispatch(Object(s.b)(Object(r.a)("Failed in authentication. Please Logout")));else{if(null!==e&&void 0!==e&&null!==(m=e.response)&&void 0!==m&&null!==(g=m.data)&&void 0!==g&&null!==(h=g.message)&&void 0!==h&&h.includes("Access denied"))return n.a.dispatch(Object(s.b)(Object(r.a)("Access Denied"))),e.response;var S,E;n.a.dispatch(Object(s.b)(Object(r.a)(t||(null===e||void 0===e||null===(S=e.response)||void 0===S||null===(E=S.data)||void 0===E?void 0:E.message))))}}},64:function(e,t,a){"use strict";function n(e){window.location=e}a.d(t,"a",(function(){return n}))},8:function(e){e.exports=JSON.parse('{"VERSION":"1.17.0.dev.00","SESSION_KEYS":{"EXPIRATION_TIME":"expiration_time","EXPIRATION_DATE":"expiration_date","API":"api","USER":"username","USER_ID":"user_id","USER_FNAME":"user_first_name","USER_LNAME":"user_last_name","TOKEN":"token","USER_INSTITUTIONS":"user_institutions","PERMISSIONS":"permissions"},"PERMISSIONS":{"SEE_ALL_OWN_INST":"see_all_own_institution","SET":"set","GET":"get","LIST":"list","LIST_EVALUATORS":"list_evaluators","LINK_USER":"link_user","CAN_SET_PERMISSIONS":"set_permissions","CAN_GET_PERMISSIONS":"get_permissions","CAN_LIST_PERMISSIONS":"list_permissions","CAN_EDIT_INSTANCES":"set_product","CAN_CREATE_INSTANCES":"create","CAN_UPDATE_INSTANCES":"set_instance_version","CAN_LIBERATE_INSTANCES":"liberate","CAN_SEE_KPI":"get_failure_stats","CAN_SET_PASSWORD":"set_password","CAN_RESEARCH_DB":"get_filter_values","CAN_GET_FAILURES":"get_failure_stats","CAN_SEARCH_DB":"search","CAN_SEE_MASTER_LIST":"list","CAN_GET_HIDDEN_STUDIES":"get_hidden_studies","CAN_SET_HIDDEN_STUDIES":"set_hidden_studies","CAN_CHANGE_HMD_SN":"set_hmd_change"},"HEADERS_VALUES":{"PARTNER":"VMPartner","LOGIN":"Login","BASIC":"Basic"},"HEADERS_NAMES":{"AUTHORIZATION":"Authorization","AUTH_TYPE":"AuthType","LOGIN_TYPE":"LoginType"},"ENDPOINTS":{"INSTITUTION":{"LIST":"institution/list","GET_REGION":"institution/get_region_list","GET":"institution/get","SET":"institution/set"},"REPORTS":{"LIST":"reports/list","GET_EVALUATORS":"reports/list_evaluators"},"STATS":{"GET_USER_KPI":"stats/get_user_kpi","GET_FILTER_VALUES":"stats/get_filter_values","BUILD_KPI":"stats/build_kpi","STORE_USER_KPI":"stats/set_user_kpi","GET_FAILURES":"stats/get_failure_stats"},"PORTAL_USER":{"MODIFY_OWN":"portal_users/set_own_user","LOGOUT":"portal_users/logout","GET_PERMISSIONS":"portal_users/get_permissions","SET_PERMISSIONS":"portal_users/set_permissions","LIST_PERMISSIONS":"portal_users/list_permissions","GET":"portal_users/get","SET":"portal_users/set","SET_INST":"portal_users/set_login_institution","LIST":"portal_users/list","SEARCH":"portal_users/search","LINK":"portal_users/link_user","RESET_PASSWORD":"portal_users/reset_password_request"},"DB":{"SEARCH":"research_db/search","GET_FILTER_VALUES":"research_db/get_filter_values"},"INSTANCE":{"LIST":"instances/list","GET_ALL_STD":"extras/get_all_std_string","SET_STD_STRING":"extras/set_std_string","GET_PRODUCT":"instances/get_product","SET_PRODUCT":"instances/set_product","SET_VERSION":"instances/set_instance_version","CREATE_PRODUCT":"instances/create","LIBERATE_PRODUCT":"instances/liberate","PASSWORD_RECOVERY":"instances/reset_app_recovery_password","GET_VERSION_LIST":"instances/get_version_list","SET_HMD_SN":"instances/set_hmd_change","GET_HIDDEN_STUDIES":"instances/get_hidden_studies","SET_HIDDEN_STUDIES":"instances/set_hidden_studies"},"TASK_SEQUENCE":{"LIST":"task_sequences/list","SET":"task_sequences/set"}},"DOMAIN":{"URL":"/portal"}}')},86:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0),s=a.n(n);const r=e=>{let{logo:t,width:a,padding:n,otherStyles:r}=e;return s.a.createElement("img",{src:t,alt:"Logo",style:{padding:n,maxWidth:a,width:"100%",...r}})}},93:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a(8),s=a(113),r=a(21),i=a(15);var o=a(64),l=a(116),c=a(22),d=a(27),u=a(33),p=a(19),m=a(177);const g={attemptLogin:function(){const e=document.getElementById("email").value,t=document.getElementById("password").value;g.login(e,t)},login:function(e,t){r.a.dispatch({type:i.h});let a=new XMLHttpRequest;a.open("POST",l.a.api,!0),a.setRequestHeader(n.HEADERS_NAMES.AUTH_TYPE,n.HEADERS_VALUES.LOGIN),a.setRequestHeader(n.HEADERS_NAMES.AUTHORIZATION,n.HEADERS_VALUES.BASIC+" "+function(e){const t=(new TextEncoder).encode(e);return btoa(String.fromCharCode.apply(null,t))}(`${e}:${t}`)),a.setRequestHeader(n.HEADERS_NAMES.LOGIN_TYPE,"4"),a.responseType="json",a.onreadystatechange=function(){if(4===a.readyState){var t;if("OK"!==(null===(t=this.response)||void 0===t?void 0:t.message))throw r.a.dispatch((l=this.response,{type:i.g,payload:l})),this.response;s.a.setToken(this.response.data.token),sessionStorage.setItem(n.SESSION_KEYS.USER,e),sessionStorage.setItem(n.SESSION_KEYS.USER_ID,this.response.data.id),sessionStorage.setItem(n.SESSION_KEYS.USER_FNAME,this.response.data.fname),sessionStorage.setItem(n.SESSION_KEYS.USER_LNAME,this.response.data.lname),m.a.setInstitution(0,this.response.data.id,this.response.data.token).then((e=>{r.a.dispatch({type:i.m}),Object(o.a)("/")}))}var l},a.send(null)},logout:function(){sessionStorage.clear();let e=n.ENDPOINTS.PORTAL_USER.LOGOUT+"/0";return c.a.post(e).then((e=>e)).catch((e=>{r.a.dispatch(Object(d.b)(Object(u.a)(p.error.auth.logout)))}))},receivedInstitutionInfo:function(e){if("OK"!==e.message)return void(document.getElementById("error_message").innerHTML=e.message);let t=e.data,a=[];for(let s=0;s<t.length;s++){let e={};e[n.INST_LIST.NAME]=t[s].institution_name,e[n.INST_LIST.ID]=t[s].keyid,a.push(e)}sessionStorage.setItem(n.SESSION_KEYS.USER_INSTITUTIONS,JSON.stringify(a)),window.location.href="index.html"},modifyAccount:function(e){let t=n.ENDPOINTS.PORTAL_USER.MODIFY_OWN+"/0";const a=Object.fromEntries(Object.entries(e).filter((e=>{let[t,a]=e;return null!==a})));return c.a.post(t,a).then((e=>(r.a.dispatch(Object(d.b)(Object(u.b)(p.success.account.post))),a.name&&sessionStorage.setItem(n.SESSION_KEYS.USER_FNAME,a.name),a.lastname&&sessionStorage.setItem(n.SESSION_KEYS.USER_LNAME,a.lastname),Object(o.a)("/"),e))).catch((e=>{r.a.dispatch(Object(d.b)(Object(u.a)(p.error.account.post)))}))},sendResetPasswordEmail:function(e){let t=n.ENDPOINTS.PORTAL_USER.RESET_PASSWORD+"/"+e;return c.a.post(t).then((e=>e.data.message)).catch((e=>e.response.data.message))},resetPassword:function(e,t,a){let s=n.ENDPOINTS.PORTAL_USER.RESET_PASSWORD+"/"+e+"?key="+t;return c.a.post(s,{password:a}).then((e=>e.data.message)).catch((e=>(r.a.dispatch(Object(d.b)(Object(u.a)(p.error.account.resetPassword))),e.response.data.message)))}}},95:function(e,t,a){"use strict";t.a=a.p+"static/media/Logo4.37f3e511.png"}},[[372,6,16]]]);
//# sourceMappingURL=main.21edc622.chunk.js.map