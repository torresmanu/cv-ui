(this.webpackJsonpCryptoVoice=this.webpackJsonpCryptoVoice||[]).push([[5],{10:function(e){e.exports=JSON.parse('{"VERSION":"1.17.0.dev.00","SESSION_KEYS":{"EXPIRATION_TIME":"expiration_time","EXPIRATION_DATE":"expiration_date","API":"api","USER":"username","USER_ID":"user_id","USER_FNAME":"user_first_name","USER_LNAME":"user_last_name","TOKEN":"token","USER_INSTITUTIONS":"user_institutions","PERMISSIONS":"permissions"},"PERMISSIONS":{"SEE_ALL_OWN_INST":"see_all_own_institution","SET":"set","GET":"get","LIST":"list","LIST_EVALUATORS":"list_evaluators","LINK_USER":"link_user","CAN_SET_PERMISSIONS":"set_permissions","CAN_GET_PERMISSIONS":"get_permissions","CAN_LIST_PERMISSIONS":"list_permissions","CAN_EDIT_INSTANCES":"set_product","CAN_CREATE_INSTANCES":"create","CAN_UPDATE_INSTANCES":"set_instance_version","CAN_LIBERATE_INSTANCES":"liberate","CAN_SEE_KPI":"get_failure_stats","CAN_SET_PASSWORD":"set_password","CAN_RESEARCH_DB":"get_filter_values","CAN_GET_FAILURES":"get_failure_stats","CAN_SEARCH_DB":"search","CAN_SEE_MASTER_LIST":"list","CAN_GET_HIDDEN_STUDIES":"get_hidden_studies","CAN_SET_HIDDEN_STUDIES":"set_hidden_studies","CAN_CHANGE_HMD_SN":"set_hmd_change"},"HEADERS_VALUES":{"PARTNER":"VMPartner","LOGIN":"Login","BASIC":"Basic"},"HEADERS_NAMES":{"AUTHORIZATION":"Authorization","AUTH_TYPE":"AuthType","LOGIN_TYPE":"LoginType"},"ENDPOINTS":{"INSTITUTION":{"LIST":"institution/list","GET_REGION":"institution/get_region_list","GET":"institution/get","SET":"institution/set"},"REPORTS":{"LIST":"reports/list","GET_EVALUATORS":"reports/list_evaluators"},"STATS":{"GET_USER_KPI":"stats/get_user_kpi","GET_FILTER_VALUES":"stats/get_filter_values","BUILD_KPI":"stats/build_kpi","STORE_USER_KPI":"stats/set_user_kpi","GET_FAILURES":"stats/get_failure_stats"},"PORTAL_USER":{"MODIFY_OWN":"portal_users/set_own_user","LOGOUT":"portal_users/logout","GET_PERMISSIONS":"portal_users/get_permissions","SET_PERMISSIONS":"portal_users/set_permissions","LIST_PERMISSIONS":"portal_users/list_permissions","GET":"portal_users/get","SET":"portal_users/set","SET_INST":"portal_users/set_login_institution","LIST":"portal_users/list","SEARCH":"portal_users/search","LINK":"portal_users/link_user","RESET_PASSWORD":"portal_users/reset_password_request"},"DB":{"SEARCH":"research_db/search","GET_FILTER_VALUES":"research_db/get_filter_values"},"INSTANCE":{"LIST":"instances/list","GET_ALL_STD":"extras/get_all_std_string","SET_STD_STRING":"extras/set_std_string","GET_PRODUCT":"instances/get_product","SET_PRODUCT":"instances/set_product","SET_VERSION":"instances/set_instance_version","CREATE_PRODUCT":"instances/create","LIBERATE_PRODUCT":"instances/liberate","PASSWORD_RECOVERY":"instances/reset_app_recovery_password","GET_VERSION_LIST":"instances/get_version_list","SET_HMD_SN":"instances/set_hmd_change","GET_HIDDEN_STUDIES":"instances/get_hidden_studies","SET_HIDDEN_STUDIES":"instances/set_hidden_studies"},"TASK_SEQUENCE":{"LIST":"task_sequences/list","SET":"task_sequences/set"}},"DOMAIN":{"URL":"/portal"}}')},102:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(10);const s={checkLogIn:function(){var e=!0;if(null!==sessionStorage.getItem(n.SESSION_KEYS.TOKEN)){var t=new Date;e=!(new Date(sessionStorage.getItem(n.SESSION_KEYS.EXPIRATION_DATE))>t)}else e=!0;e&&(window.location.href="login.html")},setToken:function(e){let t=new Date;t.setMinutes(t.getMinutes()+60),sessionStorage.setItem(n.SESSION_KEYS.TOKEN,e),sessionStorage.setItem(n.SESSION_KEYS.EXPIRATION_DATE,t.toString())},getToken:function(){return sessionStorage.getItem(n.SESSION_KEYS.TOKEN)}}},106:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(22),s=a(10);const r={api:n.a.defaults.baseURL,ApiLogIn:n.a.defaults.baseURL,ApiLogOut:n.a.defaults.baseURL+"/auth/logout",ApiChangePassword:n.a.defaults.baseURL+"/auth/",ApiResetPassword:n.a.defaults.baseURL+"/auth/password",ApiRegister:n.a.defaults.baseURL+"/auth/register",ApiInstitution:s.ENDPOINTS.INSTITUTION.LIST+"/"+sessionStorage.getItem(s.SESSION_KEYS.USER_ID),ApiSetInst:s.ENDPOINTS.PORTAL_USER.SET_INST+"/"};n.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}))},15:function(e,t,a){"use strict";a.d(t,"p",(function(){return n})),a.d(t,"m",(function(){return s})),a.d(t,"n",(function(){return r})),a.d(t,"l",(function(){return i})),a.d(t,"k",(function(){return o})),a.d(t,"h",(function(){return l})),a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return u})),a.d(t,"f",(function(){return p})),a.d(t,"j",(function(){return m})),a.d(t,"o",(function(){return g})),a.d(t,"i",(function(){return h})),a.d(t,"d",(function(){return E})),a.d(t,"e",(function(){return S})),a.d(t,"c",(function(){return b}));const n="SET_THEME",s="SET_SIGNED_IN",r="SET_SIGNED_OUT",i="SET_RESET_PASSWORD_DONE",o="SET_NEW_PASSWORD_DONE",l="SET_AUTH_LOADING",c="SET_AUTH_ERROR",d="ENQUEUE_SNACKBAR",u="CLOSE_SNACKBAR",p="REMOVE_SNACKBAR",m="SET_FORM_STATUS",g="SET_START_DATE",h="SET_END_DATE",E="FETCH_KPI_DATA_REQUEST",S="FETCH_KPI_DATA_SUCCESS",b="FETCH_KPI_DATA_FAILURE"},169:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(22),s=a(106),r=a(27),i=a(21),o=a(33),l=a(19),c=a(10),d=a(226),u=a(40);const p={setInstitution:function(e,t,a){return d.a.create({baseURL:"https://",responseType:"json",headers:{AuthType:c.HEADERS_VALUES.PARTNER,Authorization:t+":"+a,LoginType:4}}).post(s.a.ApiSetInst+e).then((e=>(sessionStorage.setItem(c.SESSION_KEYS.PERMISSIONS,JSON.stringify(e.data.data)),e.data))).catch((e=>{Object(u.a)(e,l.error.portalUsers.set)}))},getMasterList:function(){return n.a.post(c.ENDPOINTS.PORTAL_USER.LIST+"/-1").then((e=>{var t;return Object.values(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data)||[]})).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},get:function(e){return n.a.post(c.ENDPOINTS.PORTAL_USER.GET+"/"+e).then((e=>e.data||[])).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},search:function(e){return n.a.post(c.ENDPOINTS.PORTAL_USER.SEARCH+"/0",{email:e}).then((e=>e.data||[])).catch((e=>{Object(u.a)(e,l.error.portalUsers.get)}))},link:function(e,t,a){const s="/"+e+"?institution="+t+"&link="+a;return n.a.post(c.ENDPOINTS.PORTAL_USER.LINK+s).then((e=>(1===a?i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.link))):i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.unlink))),e.data||[]))).catch((e=>{1===a?Object(u.a)(e,l.error.portalUsers.link):Object(u.a)(e,l.error.portalUsers.unlink)}))},set:function(e,t,a,s){const d=e?"/"+e:"/0",p=e?{name:t.name,lastname:t.lastname,company:t.company,user_role:s}:{name:t.name,lastname:t.lastname,passwd:t.password,email:t.email,company:t.company,institution_id:a,user_role:s,force_enable:!0};return n.a.post(c.ENDPOINTS.PORTAL_USER.SET+d,p).then((t=>(e?i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.edit))):i.a.dispatch(Object(r.b)(Object(o.b)(l.success.portalUsers.create))),t.data||[]))).catch((t=>{const a=e?l.error.portalUsers.edit:l.error.portalUsers.create;Object(u.a)(t,a)}))},enable:function(e,t){return n.a.post(c.ENDPOINTS.PORTAL_USER.SET+"/"+e,{enabled:t}).then((e=>(i.a.dispatch(Object(r.b)(Object(o.b)(t?l.success.portalUsers.enable:l.success.portalUsers.disable))),e.data||[]))).catch((e=>{Object(u.a)(e,t?l.error.portalUsers.enable:l.error.portalUsers.disable)}))}}},171:function(e,t,a){"use strict";a.d(t,"a",(function(){return N})),a.d(t,"c",(function(){return A}));var n=a(84),s=a(22),r=a(19),i=a(10),o=a(40);const l=function(){return s.a.post(i.ENDPOINTS.DB.GET_FILTER_VALUES+"/0").then((e=>e.data||[])).catch((e=>{var t,a;return Object(o.a)(e||"",(null===r||void 0===r||null===(t=r.error)||void 0===t||null===(a=t.researchDB)||void 0===a?void 0:a.get_filter_values)||""),null===e||void 0===e?void 0:e.response}))},c=e=>{var t,a,n,s,r;if(null===e||void 0===e)return"";("string"!==typeof e&&(e=e.toString()),null!==(t=e)&&void 0!==t&&t.startsWith("vm_"))&&(e=null===(s=e)||void 0===s?void 0:s.substring(3));null!==(a=e)&&void 0!==a&&a.endsWith("_id")&&(e=null===(r=e)||void 0===r?void 0:r.substring(0,e.length-3));return(null===(n=e)||void 0===n?void 0:n.split(".")).map((e=>e.split("_").map((e=>{var t;return(null===e||void 0===e||null===(t=e.charAt(0))||void 0===t?void 0:t.toUpperCase())+(null===e||void 0===e?void 0:e.slice(1))})).join(" "))).join(" ")};var d=a(118),u=a.n(d),p=a(223);u.a.locale("es");const m=e=>Object(p.a)(e,"yyyy-MM-dd"),g=Object(n.b)("filters/loadFilterValues",(async(e,t)=>{let{rejectWithValue:a}=t;try{const e=await l();return 200===(null===e||void 0===e?void 0:e.http_code)?e.data:a("Failed to load filter values")}catch(n){return a(n.toString())}})),h=(e,t)=>{let a=[];return e&&e.$in&&(a=e.$in),a.includes(t.key)||a.push(t.key),{$in:a}},E=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:parseFloat,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const n={};return void 0!=e.min&&""!==e.min&&(n.$gte=a?a(e.min,"yyyy-MM-dd"):t(e.min)),void 0!=e.max&&""!==e.max&&(n.$lte=a?a(e.max,"yyyy-MM-dd"):t(e.max)),n},S=e=>{e.selectedFilter=null,e.selectedSubFilter=null,e.selectedCategory=null,e.filterType=""},b=Object(n.c)({name:"filters",initialState:{filters:{subjects:[],evaluations:[]},institutionMap:{},portalUserMap:{},evaluationTypeMap:{},isLoading:!0,error:null,selectedFilter:null,selectedSubFilter:null,selectedCategory:null,appliedFilters:{},appliedValues:[],filtersToRender:[],filterType:"",subFilterType:"",searchDisable:!0,disabledKeys:[]},reducers:{setSelectedFilter:(e,t)=>{e.selectedFilter=t.payload},setSelectedSubFilter:(e,t)=>{e.selectedSubFilter=t.payload},setSelectedCategory:(e,t)=>{e.selectedCategory=t.payload},setFilterType:(e,t)=>{e.filterType=t.payload},setSubFilterType:(e,t)=>{e.subFilterType=t.payload},applyFilters:(e,t)=>{const{filter:a,value:n,filterType:s,filterCategory:r}=t.payload;let i,o,l=a.replace(/^(subjects?|evaluations?)\./,"");if(i="subjects"===r?`subject.${l}`:"evaluations"===r?l:a,e.selectedSubFilter){let t=e.selectedSubFilter.replace(/^(subjects?|evaluations?)\./,"");e.selectedSubFilter="subjects"===r?`subject.${t}`:"evaluations"===r?t:e.selectedSubFilter,o=c(t),i=`${e.selectedSubFilter}`}else o=c(l);const d={filterTitleCase:o,filter_type:s,sub_filter_type:e.subFilterType,filter_values:n,filterCategory:r,filterKey:i};let u;if(e.filtersToRender.push(d),e.appliedFilters[`${r}_filters`]||(e.appliedFilters[`${r}_filters`]={}),"array"===s){const t=e.appliedFilters[`${r}_filters`][i];u=h(t,n)}else if("int"===s||"float"===s)u=E(n,parseFloat),e.disabledKeys.push(l);else if("datetime"===s)u=E(n,null,m),e.disabledKeys.push(l),S(e);else if("list_value_range"===s)if("array"===e.subFilterType){const t=e.appliedFilters[`${r}_filters`][i];u=h(t,n),e.disabledKeys.push(n.key)}else"int"===e.subFilterType||"float"===e.subFilterType?(u=E(n,parseFloat),e.disabledKeys.push(i),S(e)):"datetime"===e.subFilterType?(u=E(n,null,m),e.disabledKeys.push(i),S(e)):"bool"===e.subFilterType&&(u=!0===n||!1,e.disabledKeys.push(i),S(e));e.appliedFilters[`${r}_filters`][i]=u,e.searchDisable=!1},clearAllFilters:e=>{e.appliedFilters={},e.filtersToRender=[],e.appliedValues=[],e.appliedKeys=[],e.disabledKeys=[]},removeAppliedFilter:(e,t)=>{const a=t.payload,{filterCategory:n,filterKey:s,filter_values:r,filter_type:i,sub_filter_type:o}=a;let l=s.replace(/^(subjects?|evaluations?)\./,"");e.disabledKeys="list_value_range"===i?"array"===o?e.disabledKeys.filter((e=>e!==r.key)):e.disabledKeys.filter((e=>e!==s)):e.disabledKeys.filter((e=>e!==l)),e.filtersToRender=e.filtersToRender.filter((e=>!(e.filterKey===s&&e.filterCategory===n&&JSON.stringify(e.filter_values)===JSON.stringify(r))));const c=`${n}_filters`;if(e.appliedFilters[c]){if("array"===i){const t=e.appliedFilters[c][s];t&&t.$in&&(t.$in=t.$in.filter((e=>e!==r.value)),0===t.$in.length?delete e.appliedFilters[c][s]:e.appliedFilters[c][s]=t)}else delete e.appliedFilters[c][s];0===Object.keys(e.appliedFilters[c]).length&&delete e.appliedFilters[c]}},setSearchDisable:(e,t)=>{e.searchDisable=t.payload}},extraReducers:e=>{e.addCase(g.pending,(e=>{e.isLoading=!0})).addCase(g.fulfilled,((e,t)=>{const{institutions:a,portal_users:n,evaluation_types:s,...r}=t.payload,i={...r.subjects},o={...r.evaluations};delete i.last_file_id,delete o.last_file_id,e.filters={subjects:i,evaluations:o},e.institutionMap=a||{},e.portalUserMap=n||{},e.evaluationTypeMap=s||{},e.isLoading=!1})).addCase(g.rejected,((e,t)=>{e.isLoading=!1,e.error=t.payload}))}}),{setSelectedFilter:f,setSelectedSubFilter:_,setSelectedCategory:y,setFilterType:T,setSubFilterType:I,applyFilters:v,removeAppliedFilter:O,clearAllFilters:N,setSearchDisable:A}=b.actions;t.b=b.reducer},19:function(e){e.exports=JSON.parse('{"error":{"account":{"post":"Account could not be modified"},"permissions":{"get":"User Permissions could not be retrieved","set":"User Permissions could not be set","post":"Account could not be modified"},"institutions":{"set":"Institution could not be set","edit":"Institution could not be modified","get":"Institution Information could not be retrieved","list_all":"Institutions could not be retrieved"},"task_sequences":{"get":"Data could not be retrieved","set":"Task Sequence could not be set","delete":"Task Sequence could not be deleted"},"portalUsers":{"set":"User could not be set","edit":"User could not be modified","create":"User could not be created","link":"User could not be linked","unlink":"User could not be unlinked","get":"User Information could not be retrieved","list":"Users could not be retrieved","access_denied":"Access Denied for list Users","reset_user_password":"Password could not be modified","disable":"User could not be disabled","enable":"User could not be enabled"},"instances":{"get":"Instances could not be retrieved","get_product":"Instance could not be retrieved","update":"Instance could not be updated","get_version_list":"Version list could not be retrieved","liberate":"Instance could not be released","create":"Instance could not be created"},"report":{"get":"Report could not be retrieved","get_master_evals":"KPI data could not be retrieved","access_denied":"Access Denied for KPI data"},"auth":{"logout":"Logout failed"},"KPI":{"store_user_kpi":"User KPI could not be stored","get_user_kpi":"User KPIs could not be retrieved","get_filter_values":"Filter Values could not be retrieved","build_kpi":"KPI could not be built","get_evaluators":"Evaluators could not be retrieved"},"researchDB":{"search":"ResearchDB search could not be done","get_filter_values":"Filter Values could not be retrieved"}},"success":{"account":{"post":"Account modified successfully"},"permissions":{"set":"Permissions modified successfully"},"institutions":{"edit":"Institution modified successfully","add":"Institution created successfully"},"task_sequences":{"set":"Task Sequence set successfully","delete":"Task Sequence deleted successfully"},"portalUsers":{"edit":"User modified successfully","create":"User created successfully","link":"User linked successfully","unlink":"User unlinked successfully","password":"Password modified successfully","disable":"User disabled successfully","enable":"User enabled successfully"},"instances":{"liberate":"Instance released successfully","update":"App Version updated successfully","create":"Instance created successfully","edit":"Instance information modified successfully"},"report":{"get_master_evals":"KPI data retrieved successfully"},"KPI":{"store_user_kpi":"User KPI stored successfully"}}}')},208:function(e,t,a){"use strict";t.a=a.p+"static/media/Logo.e372df51.png"},209:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(13),i=a(56),o=a(146),l=a(51),c=a(207),d=a(168),u=a(85),p=a(93);const m=Object(r.c)(o.a)(d.b),g=r.c.div`
  padding: ${e=>e.theme.spacing(6)}px;
  text-align: center;
  background: transparent;

  ${e=>e.theme.breakpoints.up("md")} {
    padding: ${e=>e.theme.spacing(10)}px;
  }
`;t.default=function(){return s.a.createElement(g,null,s.a.createElement(l.a,{component:"h1",variant:"h1",align:"center",gutterBottom:!0},"404"),s.a.createElement(l.a,{component:"h2",variant:"h5",align:"center",gutterBottom:!0},"Page not found."),s.a.createElement(l.a,{component:"h2",variant:"body1",align:"center",gutterBottom:!0},"The page you are looking for might have been removed."),s.a.createElement(m,{component:i.b,to:"/",variant:"contained",color:"secondary",mt:2},"Return to website"),s.a.createElement(c.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},s.a.createElement(c.a,{item:!0,style:{paddingTop:50}},s.a.createElement(u.a,{logo:p.a,width:"45%"}))))}},21:function(e,t,a){"use strict";var n=a(84),s=a(202),r=a(15);const i={loading:!1,signedIn:a(102).a.getToken()&&new Date<new Date(sessionStorage.getItem("expiration_date")),error:null,successMessage:null};const o={notifications:[{open:!1,dismissed:!0,variant:"success",key:"0"}]};const l={startDate:null,endDate:null};const c={isKPILoading:!1,calibrationData:[],trustworthyData:[],processingFailsData:[],discardedData:[],completedEvaluations:[],successfulTasks:[],error:null};var d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.d:return{...e,isKPILoading:!0,error:null};case r.e:return{...e,isKPILoading:!1,calibrationData:t.data.calibrations,trustworthyData:t.data.trustworthy_task,processingFailsData:t.data.processing_fails,discardedData:t.data.discarded,completedEvaluations:t.data.completed_evaluations,successfulTasks:t.data.successful_tasks};case r.c:return{...e,isKPILoading:!1,error:t.error};default:return e}},u=a(171),p=Object(s.a)({dateFilter:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.o:return{...e,startDate:t.date};case r.i:return{...e,endDate:t.date};default:return e}},kpiData:d,filters:u.b,alertMessages:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.b:return{...e,notifications:[...e.notifications,{key:t.key,...t.notification}]};case r.a:return{...e,notifications:e.notifications.map((e=>t.dismissAll||e.key===t.key?{...e,dismissed:!0}:{...e}))};case r.f:return{...e,notifications:e.notifications.filter((e=>e.key!==t.key))};default:return e}},themeReducer:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{currentTheme:0},t=arguments.length>1?arguments[1]:void 0;return t.type===r.p?{...e,currentTheme:t.payload}:e},auth:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case r.m:return{...e,signedIn:!0,loading:!1,error:null,successMessage:null};case r.n:return{...e,signedIn:!1};case r.l:return{...e,loading:!1,error:null,successMessage:"Se envi\xf3 un mail con instrucciones para reestablecer la contrase\xf1a."};case r.k:return{...e,loading:!1,error:null,successMessage:"La contrase\xf1a se cambi\xf3 exitosamente."};case r.h:return{...e,loading:!0};case r.g:return{...e,loading:!1,error:t.payload,successMessage:null};default:return e}}});const m=Object(n.a)({reducer:p});t.a=m},22:function(e,t,a){"use strict";var n=a(226),s=a(10);let r=sessionStorage.getItem(s.SESSION_KEYS.USER_ID)+":"+sessionStorage.getItem(s.SESSION_KEYS.TOKEN);const i=n.a.create({baseURL:"https://",responseType:"json",headers:{AuthType:s.HEADERS_VALUES.PARTNER,Authorization:r,LoginType:4}});t.a=i},27:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return r}));var n=a(15);const s=e=>{const t=e.options&&e.options.key;return{type:n.b,notification:{...e,key:t||(new Date).getTime()+Math.random()}}},r=e=>({type:n.a,dismissAll:!e,key:e})},33:function(e,t,a){"use strict";a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return u}));var n=a(27),s=a(0),r=a.n(s),i=a(145),o=a(105),l=a.n(o),c=a(21);function d(e){return{open:!0,message:`${e}`,options:{variant:"success",autoHideDuration:12e3,key:(new Date).getTime(),action:e=>r.a.createElement(i.a,{key:"close","aria-label":"close",color:"inherit",onClick:()=>c.a.dispatch(Object(n.a)(e))},r.a.createElement(l.a,null))}}}function u(e){return{open:!0,message:`${e}`,options:{variant:"error",autoHideDuration:12e3,key:(new Date).getTime(),action:e=>r.a.createElement(i.a,{key:"close","aria-label":"close",color:"inherit",onClick:()=>c.a.dispatch(Object(n.a)(e))},r.a.createElement(l.a,null))}}}},334:function(e,t){},348:function(e,t,a){},358:function(e,t,a){"use strict";a.r(t);a(252),a(273);var n=a(0),s=a.n(n),r=a(17),i=a.n(r),o=a(36),l=a(210),c=a(421),d=a(372),u=a(375),p=a(13),m=a(165),g=a(114),h=a(115),E=a(116);var S=[{name:"Dark",palette:{primary:{main:"#040505",contrastText:"#FFF"},secondary:{main:g.a[500],contrastText:"#FFF"},textSecondary:{main:"#686868"}},header:{color:"#121212",background:"#121212",search:{color:h.a[800]},indicator:{background:g.a[600]}},sidebar:{color:"#242424",background:"#F6FBFF",header:{color:h.a[900],background:"#121212",brand:{color:g.a[500]}},footer:{color:h.a[900],background:"#F6FBFF",online:{background:E.a[500]}},badge:{color:"#FFF",background:g.a[500]}},body:{background:"linear-gradient(180deg, #181A1F, #1C1B1B)"}}];var b={useNextVariants:!0,fontFamily:['"Segoe UI"',"-apple-system","BlinkMacSystemFont","Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),fontSize:14,fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:600,h1:{fontSize:"2rem",fontWeight:500,lineHeight:1.2},h2:{fontSize:"1.75rem",fontWeight:500,lineHeight:1.2},h3:{fontSize:"1.5rem",fontWeight:500,lineHeight:1.2},h4:{fontSize:"1.25rem",fontWeight:500,lineHeight:1.2},h5:{fontSize:"1.125rem",fontWeight:500,lineHeight:1.2},h6:{fontSize:"1.0625rem",fontWeight:500,lineHeight:1.2},body1:{fontSize:14,fontWeight:500},body2:{fontSize:14,color:"#686868"},button:{textTransform:"none"}};var f={MuiCardHeader:{action:{marginTop:"-4px",marginRight:"-4px"}},MuiPickersDay:{day:{fontWeight:"300"}},MuiPickersYear:{root:{height:"64px"}},MuiPickersCalendar:{transitionContainer:{marginTop:"6px"}},MuiPickersCalendarHeader:{iconButton:{backgroundColor:"transparent","& > *":{backgroundColor:"transparent"}},switchHeader:{marginTop:"2px",marginBottom:"4px"}},MuiPickersClock:{container:{margin:"32px 0 4px"}},MuiPickersClockNumber:{clockNumber:{left:"calc(50% - 16px)",width:"32px",height:"32px"}},MuiPickerDTHeader:{dateHeader:{"& h4":{fontSize:"2.125rem",fontWeight:400}},timeHeader:{"& h3":{fontSize:"3rem",fontWeight:400}}},MuiPickersTimePicker:{hourMinuteLabel:{"& h2":{fontSize:"3.75rem",fontWeight:300}}},MuiPickersToolbar:{toolbar:{"& h4":{fontSize:"2.125rem",fontWeight:400}}}};var _={values:{xs:0,sm:600,md:960,lg:1280,xl:1500}};var y={MuiButtonBase:{disableRipple:!0},MuiCardHeader:{titleTypographyProps:{variant:"h6"}}};function T(e){return`0 0 ${e}px 0 rgba(53,64,82,.05)`}var I=["none",T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14),T(14)];var v=S.map((e=>(e=>Object(m.a)({spacing:4,breakpoints:_,overrides:f,props:y,typography:b,shadows:I,body:e.body,header:e.header,palette:e.palette,sidebar:e.sidebar},e.name))(e))),O=a(65),N=a(406);const A=p.c.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;var R=function(){return s.a.createElement(A,null,s.a.createElement(N.a,{m:2,color:"secondary"}))};function k(e){class t extends s.a.Component{constructor(e){super(e),this.state={component:null}}async componentDidMount(){var t;await(t=250,new Promise((e=>setTimeout(e,t))));const{default:a}=await e();this.setState({component:a})}render(){const e=this.state.component;return e?s.a.createElement(e,this.props):s.a.createElement(R,null)}}return t}var D=a(408),P=a(144),U=a.n(P),x=a(152),F=a(153),j=a.n(F);const C=U()({}),L={authenticatedSelector:e=>!0,authenticatingSelector:e=>!1,wrapperDisplayName:"UserIsAuthenticated"},w=(j()(L),Object(x.connectedRouterRedirect)({...L,AuthenticatingComponent:R,redirectPath:(e,t)=>C.getRedirectQueryParam(t)||"/auth/sign-in"})),M=e=>w(k(e)),K={authenticatedSelector:e=>!e.auth.signedIn&&!e.auth.loading,authenticatingSelector:e=>e.auth.loading,wrapperDisplayName:"UserIsNotAuthenticated"},$=(j()(K),Object(x.connectedRouterRedirect)({...K,redirectPath:(e,t)=>C.getRedirectQueryParam(t)||"/",allowRedirectBack:!1}));var H=a(10);const B=$(k((()=>Promise.all([a.e(0),a.e(1),a.e(11)]).then(a.bind(null,1072)))));const W=k((()=>Promise.all([a.e(0),a.e(1),a.e(14)]).then(a.bind(null,1053)))),G=k((()=>Promise.all([a.e(0),a.e(10)]).then(a.bind(null,1073)))),Y=k((()=>Promise.all([a.e(0),a.e(9)]).then(a.bind(null,1074)))),V=k((()=>Promise.resolve().then(a.bind(null,209)))),z=k((()=>a.e(17).then(a.bind(null,1054)))),q=M((()=>Promise.all([a.e(0),a.e(2),a.e(1),a.e(7),a.e(13)]).then(a.bind(null,1070)))),J=M((()=>Promise.all([a.e(2),a.e(3),a.e(4),a.e(18)]).then(a.bind(null,1068)))),Q=M((()=>Promise.all([a.e(2),a.e(3),a.e(16),a.e(4),a.e(19)]).then(a.bind(null,1067)))),X=M((()=>Promise.all([a.e(0),a.e(12)]).then(a.bind(null,1071)))),Z=k((()=>Promise.all([a.e(15),a.e(20)]).then(a.bind(null,1069)))),ee={id:"Home",path:"/",component:Z,children:null,hidden:!0},te={id:"My Account",path:"/my_account",component:X,children:null,hidden:!0},ae={id:"Auth",path:"/auth",icon:s.a.createElement(q,null),hidden:!0,children:[{path:"/auth/sign-in",name:"Sign In",component:B},{path:"/auth/sign-up",name:"Sign Up",component:W},{path:"/auth/forgot-password",name:"Forgot Password",component:G},{path:"/reset_your_password/:id",name:"Reset Password",component:Y},{path:"/auth/404",name:"404 Page",component:V},{path:"/auth/500",name:"500 Page",component:z}]},ne={id:"Dashboard",path:"/dashboard",component:J,icon:s.a.createElement(D.a,null)},se={id:"Free Dashboard",path:"/free_dashboard",component:Q,icon:s.a.createElement(D.a,null)},re=[te,ne,se],ie=[ae],oe=[{path:"/landing",name:"Landing",component:Z},ee];var le=[te,ne,se],ce=a(89),de=a(56),ue=a(217),pe=a.n(ue),me=(a(348),a(93)),ge=a(221),he=a.n(ge),Ee=a(220),Se=a.n(Ee),be=a(409),fe=a(411),_e=a(363),ye=a(385),Te=a(391),Ie=a(51),ve=a(414),Oe=a(207),Ne=a(423),Ae=a(412),Re=a(413),ke=a(85),De=a(415),Pe=a(146),Ue=a(63),xe=a(86);let Fe=le.filter((e=>!e.hidden));const je=s.a.forwardRef(((e,t)=>s.a.createElement(de.c,Object.assign({innerRef:t},e)))),Ce=Object(p.c)(be.a)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`,Le=Object(p.c)(pe.a)`
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background-image: linear-gradient(to bottom, #FFFFFF 6.34%, #D2D2D2 77.92%) !important;
`,we=Object(p.c)(fe.a)`
`,Me=p.c.div`
  padding-top: ${e=>e.theme.spacing(2.5)}px;
  padding-bottom: ${e=>e.theme.spacing(2.5)}px;
`,Ke=Object(p.c)(_e.a)`
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
`,$e=Object(p.c)(_e.a)`
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
`,He=Object(p.c)(ye.a)`
  margin: 0;
  span {
    color: ${e=>e.theme.sidebar.color};
    font-size: 16px;
    font-weight: 500;
    padding: 0 ${e=>e.theme.spacing(4)}px;
  }
`,Be=Object(p.c)(Ae.a)`
  color: ${e=>Object(ce.a)(e.theme.sidebar.color,.5)};
`,We=Object(p.c)(Re.a)`
  color: ${e=>Object(ce.a)(e.theme.sidebar.color,.5)};
`,Ge=Object(p.c)(_e.a)`
  padding-left: ${e=>e.theme.spacing(14)}px;
  padding-top: ${e=>e.theme.spacing(2)}px;
  padding-bottom: ${e=>e.theme.spacing(2)}px;

  span {
    color: ${e=>Object(ce.a)(e.theme.sidebar.color,.7)};
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
`,Ye=Object(p.c)(ye.a)`
  color: ${e=>e.theme.sidebar.color};
  span {
    font-size: 15px;
  }
  margin-top: 0;
  margin-bottom: 0;
`,Ve=Object(p.c)(Te.a)`
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
`,ze=Object(p.c)(Ve)`
  top: 12px;
`,qe=Object(p.c)(Ie.a)`
  color: ${e=>e.theme.sidebar.color};
  padding: ${e=>e.theme.spacing(4)}px
    ${e=>e.theme.spacing(6)}px ${e=>e.theme.spacing(1)}px;
  font-weight: 600;
  display: block;
`,Je=p.c.div`
  padding: ${e=>e.theme.spacing(3)}px
    ${e=>e.theme.spacing(4)}px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: #FFFFFF 77.92%;
  &:hover {
    background: #D2D2D2;
    cursor: pointer;
  }

`;function Qe(e){let{name:t,icon:a,classes:n,isOpen:r,isCollapsable:i,badge:o,...l}=e;return s.a.createElement($e,l,a,s.a.createElement(He,null,t),i?r?s.a.createElement(We,null):s.a.createElement(Be,null):null,o?s.a.createElement(ze,{label:o}):"")}function Xe(e){let{name:t,to:a,badge:n,disabled:r=!1}=e;return s.a.createElement(Ge,{button:!0,dense:!0,component:je,exact:!0,to:a,activeClassName:"active",disabled:r},s.a.createElement(Ye,null,t),n?s.a.createElement(Ve,{label:n}):"")}class Ze extends s.a.Component{constructor(e){super(e),this.toggle=e=>{Object.keys(this.state).forEach((t=>this.state[e]||this.setState((()=>({[t]:!1}))))),this.setState((t=>({[e]:!t[e]})))},this.state={}}UNSAFE_componentWillMount(){const e=this.props.location.pathname;Fe.forEach(((t,a)=>{const n=0===e.indexOf(t.path),s=t.open,r=!(!t.containsHome||"/"!==e);this.setState((()=>({[a]:n||s||r})))}))}render(){const{classes:e,staticContext:t,...a}=this.props;return s.a.createElement(Ce,Object.assign({variant:"permanent"},a),s.a.createElement(Ke,null,s.a.createElement(ke.a,{logo:me.a,padding:"5",width:"150px"})),s.a.createElement(Le,null,s.a.createElement(we,{disablePadding:!0},s.a.createElement(Me,null,Fe.map(((e,t)=>s.a.createElement(s.a.Fragment,{key:t},e.header?s.a.createElement(qe,null,e.header):null,e.children?s.a.createElement(s.a.Fragment,{key:t},s.a.createElement(Qe,{isOpen:!this.state[t],isCollapsable:!0,name:e.id,icon:e.icon,button:!0,onClick:()=>this.toggle(t)}),s.a.createElement(ve.a,{in:this.state[t],timeout:"auto",unmountOnExit:!0},e.children.map(((e,t)=>e.hidden?null:s.a.createElement(Xe,{key:t,name:e.name,to:e.path,icon:e.icon,badge:e.badge,disabled:e.disabled}))))):s.a.createElement(Qe,{isCollapsable:!1,name:e.id,to:e.path,activeClassName:"active",component:je,icon:e.icon,exact:!0,badge:e.badge}))))))),s.a.createElement(De.a,null),s.a.createElement(Je,{onClick:()=>this.toggle(10)},s.a.createElement(Oe.a,{container:!0,spacing:2},s.a.createElement(Oe.a,{item:!0},s.a.createElement(Ne.a,{alt:sessionStorage.getItem("user_first_name"),src:"../images/user.png",style:{color:"#FFFFFF",backgroundColor:"#D2D2D2"}})),s.a.createElement(Oe.a,{item:!0},s.a.createElement(Ie.a,{variant:"body1"},sessionStorage.getItem("user_first_name")," ",sessionStorage.getItem("user_last_name")),s.a.createElement(Ie.a,{variant:"body2"},sessionStorage.getItem("username"))),s.a.createElement(Oe.a,{item:!0,xs:12},s.a.createElement(ve.a,{in:this.state[10],timeout:"auto",unmountOnExit:!0},s.a.createElement(Oe.a,{item:!0,xs:12},s.a.createElement(Pe.a,{startIcon:s.a.createElement(Se.a,null),onClick:e=>Object(Ue.a)("/my_account"),disabled:!sessionStorage.getItem(H.SESSION_KEYS.TOKEN),fullWidth:!0,style:{justifyContent:"left"}},"My Account")),s.a.createElement(Oe.a,{item:!0,xs:12},s.a.createElement(Pe.a,{startIcon:s.a.createElement(he.a,null),onClick:e=>(xe.a.logout(),sessionStorage.removeItem(H.SESSION_KEYS.TOKEN),sessionStorage.removeItem(H.SESSION_KEYS.USER),sessionStorage.removeItem(H.SESSION_KEYS.USER_ID),void Object(Ue.a)("/auth/sign-in")),disabled:!sessionStorage.getItem(H.SESSION_KEYS.TOKEN),fullWidth:!0,style:{justifyContent:"left"}},"Logout")),s.a.createElement(Oe.a,{item:!0,xs:12},s.a.createElement(Ie.a,{style:{marginTop:"15px"}},"VERSION: ",H.VERSION)))))))}}var et=Object(O.i)(Ze),tt=a(416),at=a(386),nt=a(387),st=a(388),rt=a(208);const it=Object(p.c)(tt.a)`
  background: rgba(30, 35, 41, 0.1);  /* Darker background with some transparency */
  color: ${e=>e.theme.header.color};
  backdrop-filter: blur(10px); /* Apply blur effect */
`,ot=p.c.div`

  
  ${e=>e.theme.breakpoints.up("md")} {
    padding-left: 7vw;   // Apply same padding for left
    padding-right: 8vw;  // Apply same padding for right
  }
`,lt=p.c.img`
  width: 130px;
  height: auto;
  cursor: pointer;  // Changes cursor to pointer on hover
`,ct=p.c.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;var dt=Object(o.connect)()(Object(p.e)((e=>{let{onDrawerToggle:t}=e;const[a,r]=Object(n.useState)(null),i=Object(O.f)(),o=()=>{r(null)},l=()=>{i.push("/")};return s.a.createElement(s.a.Fragment,null,s.a.createElement(it,{position:"sticky",elevation:0},s.a.createElement(ot,null,s.a.createElement(at.a,null,s.a.createElement(Oe.a,{container:!0,alignItems:"center",justifyContent:"space-between"},s.a.createElement(Oe.a,{item:!0,xs:4,container:!0,justifyContent:"left"},s.a.createElement(lt,{src:rt.a,alt:"App Logo",onClick:l})),s.a.createElement(Oe.a,{item:!0,xs:4,container:!0,justifyContent:"flex-end"},s.a.createElement(ct,null,s.a.createElement(Ie.a,{variant:"body1"},"Hello, User"),s.a.createElement(Ne.a,{alt:"User Name",src:"/path-to-avatar-image.jpg",onClick:e=>{r(e.currentTarget)},style:{cursor:"pointer"}})),s.a.createElement(nt.a,{open:Boolean(a),anchorEl:a,onClose:o,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},PaperProps:{style:{minWidth:"200px",padding:"10px"}}},s.a.createElement(st.a,{onClick:o},"Profile"),s.a.createElement(st.a,{onClick:o},"Princing"),s.a.createElement(st.a,{onClick:l},"Logout")," ")))))))}))),ut=a(168),pt=a(107),mt=a(417),gt=a(27),ht=a(109);let Et=[];var St=()=>{const e=Object(o.useDispatch)(),t=Object(o.useSelector)((e=>e.alertMessages.notifications||[])),{enqueueSnackbar:a,closeSnackbar:n}=Object(ht.b)();return s.a.useEffect((()=>{t.forEach((e=>{let{key:t,message:s,options:r={},dismissed:i=!1}=e;var o;i?n(t):Et.includes(t)||(a(s,{key:t,...r,onClose:(e,t,a)=>{r.onClose&&r.onClose(e,t,a)}}),o=t,Et=[...Et,o])}))}),[t,n,a,e]),null};const bt=p.b`
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
`,ft=p.c.div`
  display: flex;
  min-height: 100vh;
`,_t=p.c.div`
  ${e=>e.theme.breakpoints.up("md")} {
    flex-shrink: 0;
  }
`,yt=p.c.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,Tt=Object(p.c)(pt.a)(ut.b),It=Object(p.c)(Tt)`
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
`;class vt extends s.a.Component{constructor(){super(...arguments),this.state={mobileOpen:!1},this.handleDrawerToggle=()=>{this.setState((e=>({mobileOpen:!e.mobileOpen})))}}render(){const{children:e,routes:t}=this.props;return s.a.createElement(ft,null,s.a.createElement(St,null),s.a.createElement(mt.a,null),s.a.createElement(bt,null),s.a.createElement(_t,null,s.a.createElement(et,{routes:t,PaperProps:{style:{width:"20%"}},variant:"temporary",open:this.state.mobileOpen,onClose:this.handleDrawerToggle})),s.a.createElement(yt,null,s.a.createElement(dt,{onDrawerToggle:this.handleDrawerToggle}),s.a.createElement(It,{p:10},e)))}}var Ot=Object(o.connect)(((e,t)=>({snackbar:e.alertMessages.notifications})),(e=>({closeSnackbar:t=>e(Object(gt.a)(t))})))(vt);const Nt=p.b`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${e=>e.theme.body.background};
  }
`,At=p.c.div`
  max-width: 365px;
  max-height: 400px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  padding-bottom: 5%;
`;var Rt=function(e){let{children:t}=e;return s.a.createElement(At,null,s.a.createElement(Nt,null),s.a.createElement(Oe.a,{container:!0,justifyContent:"flex-start",alignItems:"flex-start"},s.a.createElement(Oe.a,{item:!0,xs:12},t)))},kt=a(418),Dt=a(419),Pt=a(420),Ut=a.p+"static/media/logo_simple.28907bff.svg";const xt=p.b`
  html,
  body,
  #root {
    height: 100%;
  }

`;var Ft=function(e){let{children:t}=e;return s.a.createElement(s.a.Fragment,null,s.a.createElement(mt.a,null),s.a.createElement(xt,null),s.a.createElement(kt.a,{sx:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:-9999}},s.a.createElement("video",{src:"https://framerusercontent.com/assets/zGxK107SsQ760NcmS6Ay6X57skY.mp4",loop:!0,autoPlay:!0,muted:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"50% 50%"}})),t,s.a.createElement(kt.a,{sx:{py:5,textAlign:"center",position:"relative",zIndex:1,bgcolor:"rgba(240, 242, 245, 0.9)"}},s.a.createElement(Dt.a,null,s.a.createElement("img",{src:Ut,alt:"Logo",style:{width:"40px",height:"auto",marginBottom:"10px"}}),s.a.createElement(Ie.a,{variant:"caption",component:"p"},"\xa9 All rights reserved",s.a.createElement("br",null)," made by \xa0",s.a.createElement(Pt.a,{href:"https://linkedin.com"},"CryptoVoice")))))},jt=a(209);const Ct=(e,t)=>t.map(((t,a)=>{let{children:n,path:r,component:i}=t;return n?n.map(((t,a)=>{let{path:n,component:r}=t;return s.a.createElement(O.a,{key:a,path:n,exact:!0,render:t=>s.a.createElement(e,null,s.a.createElement(r,t))})})):s.a.createElement(O.a,{key:a,path:r,exact:!0,render:t=>s.a.createElement(e,null,s.a.createElement(i,t))})}));var Lt=()=>s.a.createElement(O.c,null,Ct(Ot,re),Ct(Rt,ie),Ct(Ft,oe),s.a.createElement(n.Suspense,{fallback:s.a.createElement("div",null,"Loading...")},s.a.createElement(O.a,{render:()=>s.a.createElement(Rt,null,s.a.createElement(jt.default,null))}))),wt=a(222);const Mt=Object(o.connect)((e=>({theme:e.themeReducer})))((e=>{let{theme:t}=e;return s.a.createElement(u.b,{injectFirst:!0},s.a.createElement(d.a,{utils:l.a},s.a.createElement(c.a,{theme:v[t.currentTheme]},s.a.createElement(p.a,{theme:v[t.currentTheme]},s.a.createElement(wt.a,null,s.a.createElement(ht.a,{maxSnack:1},s.a.createElement(Lt,null)))))))}));var Kt=function(){return s.a.createElement(de.a,{basename:"/cv-ui"},s.a.createElement(Mt,null))},$t=a(21);i.a.render(s.a.createElement(o.Provider,{store:$t.a},s.a.createElement(Kt,null)),document.getElementById("root"))},40:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(21),s=a(27),r=a(33),i=a(86),o=a(63);function l(e,t){var a,l,c,d,u,p,m,g,h;if(null!==e&&void 0!==e&&null!==(a=e.response)&&void 0!==a&&null!==(l=a.data)&&void 0!==l&&null!==(c=l.message)&&void 0!==c&&c.includes("Failed in authentication")||null!==e&&void 0!==e&&null!==(d=e.response)&&void 0!==d&&null!==(u=d.data)&&void 0!==u&&null!==(p=u.message)&&void 0!==p&&p.includes("Bad permissions"))i.a.logout(),Object(o.a)("/auth/sign-in"),n.a.dispatch(Object(s.b)(Object(r.a)("Failed in authentication. Please Logout")));else{if(null!==e&&void 0!==e&&null!==(m=e.response)&&void 0!==m&&null!==(g=m.data)&&void 0!==g&&null!==(h=g.message)&&void 0!==h&&h.includes("Access denied"))return n.a.dispatch(Object(s.b)(Object(r.a)("Access Denied"))),e.response;var E,S;n.a.dispatch(Object(s.b)(Object(r.a)(t||(null===e||void 0===e||null===(E=e.response)||void 0===E||null===(S=E.data)||void 0===S?void 0:S.message))))}}},63:function(e,t,a){"use strict";function n(e){window.location=e}a.d(t,"a",(function(){return n}))},85:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(0),s=a.n(n);const r=e=>{let{logo:t,width:a,padding:n,otherStyles:r}=e;return s.a.createElement("img",{src:t,alt:"Logo",style:{padding:n,maxWidth:a,width:"100%",...r}})}},86:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a(10),s=a(102),r=a(21),i=a(15);var o=a(63),l=a(106),c=a(22),d=a(27),u=a(33),p=a(19),m=a(169);const g={attemptLogin:function(){const e=document.getElementById("email").value,t=document.getElementById("password").value;g.login(e,t)},login:function(e,t){r.a.dispatch({type:i.h});let a=new XMLHttpRequest;a.open("POST",l.a.api,!0),a.setRequestHeader(n.HEADERS_NAMES.AUTH_TYPE,n.HEADERS_VALUES.LOGIN),a.setRequestHeader(n.HEADERS_NAMES.AUTHORIZATION,n.HEADERS_VALUES.BASIC+" "+function(e){const t=(new TextEncoder).encode(e);return btoa(String.fromCharCode.apply(null,t))}(`${e}:${t}`)),a.setRequestHeader(n.HEADERS_NAMES.LOGIN_TYPE,"4"),a.responseType="json",a.onreadystatechange=function(){if(4===a.readyState){var t;if("OK"!==(null===(t=this.response)||void 0===t?void 0:t.message))throw r.a.dispatch((l=this.response,{type:i.g,payload:l})),this.response;s.a.setToken(this.response.data.token),sessionStorage.setItem(n.SESSION_KEYS.USER,e),sessionStorage.setItem(n.SESSION_KEYS.USER_ID,this.response.data.id),sessionStorage.setItem(n.SESSION_KEYS.USER_FNAME,this.response.data.fname),sessionStorage.setItem(n.SESSION_KEYS.USER_LNAME,this.response.data.lname),m.a.setInstitution(0,this.response.data.id,this.response.data.token).then((e=>{r.a.dispatch({type:i.m}),Object(o.a)("/")}))}var l},a.send(null)},logout:function(){sessionStorage.clear();let e=n.ENDPOINTS.PORTAL_USER.LOGOUT+"/0";return c.a.post(e).then((e=>e)).catch((e=>{r.a.dispatch(Object(d.b)(Object(u.a)(p.error.auth.logout)))}))},receivedInstitutionInfo:function(e){if("OK"!==e.message)return void(document.getElementById("error_message").innerHTML=e.message);let t=e.data,a=[];for(let s=0;s<t.length;s++){let e={};e[n.INST_LIST.NAME]=t[s].institution_name,e[n.INST_LIST.ID]=t[s].keyid,a.push(e)}sessionStorage.setItem(n.SESSION_KEYS.USER_INSTITUTIONS,JSON.stringify(a)),window.location.href="index.html"},modifyAccount:function(e){let t=n.ENDPOINTS.PORTAL_USER.MODIFY_OWN+"/0";const a=Object.fromEntries(Object.entries(e).filter((e=>{let[t,a]=e;return null!==a})));return c.a.post(t,a).then((e=>(r.a.dispatch(Object(d.b)(Object(u.b)(p.success.account.post))),a.name&&sessionStorage.setItem(n.SESSION_KEYS.USER_FNAME,a.name),a.lastname&&sessionStorage.setItem(n.SESSION_KEYS.USER_LNAME,a.lastname),Object(o.a)("/"),e))).catch((e=>{r.a.dispatch(Object(d.b)(Object(u.a)(p.error.account.post)))}))},sendResetPasswordEmail:function(e){let t=n.ENDPOINTS.PORTAL_USER.RESET_PASSWORD+"/"+e;return c.a.post(t).then((e=>e.data.message)).catch((e=>e.response.data.message))},resetPassword:function(e,t,a){let s=n.ENDPOINTS.PORTAL_USER.RESET_PASSWORD+"/"+e+"?key="+t;return c.a.post(s,{password:a}).then((e=>e.data.message)).catch((e=>(r.a.dispatch(Object(d.b)(Object(u.a)(p.error.account.resetPassword))),e.response.data.message)))}}},93:function(e,t,a){"use strict";t.a=a.p+"static/media/Logo4.37f3e511.png"}},[[358,6,8]]]);
//# sourceMappingURL=main.47e68efb.chunk.js.map