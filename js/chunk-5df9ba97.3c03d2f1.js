(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5df9ba97"],{"0622":function(e,t,a){"use strict";var n=a("15c3"),s=a.n(n);s.a},"15c3":function(e,t,a){},"98ef":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex align-items-center justify-content-center h-100"},[a("b-card",{staticClass:"admin-card",attrs:{title:"admin-nav","no-body":""}},[a("b-card-title",{staticClass:"d-flex justify-content-between align-items-center p-2"},[a("span",[e._v("Личный кабинет администратора для управления всяким")]),a("b-button",{attrs:{variant:"success",to:{name:"Main"}}},[e._v(" Вернуться на сайт ")])],1),a("b-card-header",{attrs:{"header-tag":"nav"}},[a("b-nav",{attrs:{"card-header":"",tabs:""}},e._l(e.navTabs,(function(t){return a("b-nav-item",{key:t.name,attrs:{to:t.to,"active-class":"admin-link--active","link-classes":"link admin-link"}},[e._v(" "+e._s(t.name)+" ")])})),1)],1),a("b-card-body",{staticClass:"text-center admin-body"},[a("router-view")],1)],1)],1)},s=[],r=(a("96cf"),a("1da1")),i=a("5530"),c=a("2f62"),o={name:"AdminHome",data:function(){return{isBusy:!0,navTabs:[{name:"Категория",to:"/ampanel/categories"},{name:"Пользователи",to:"/ampanel/users"},{name:"Роли пользователей",to:"/ampanel/roles"},{name:"Товары",to:"/ampanel/goods"}]}},computed:Object(i["a"])({},Object(c["b"])(["user","adminToken"])),watch:{user:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("getAdminToken",e.$store.getters.user.email);case 2:e.adminToken!==e.$route.params.token&&e.$router.push({name:"Home"});case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.$store.dispatch("setNavVisible",!1)},beforeRouteLeave:function(e,t,a){this.$store.dispatch("setNavVisible",!0),a()}},u=o,d=(a("0622"),a("2877")),l=Object(d["a"])(u,n,s,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-5df9ba97.3c03d2f1.js.map