(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1420c5b9"],{"0cb2":function(t,e,n){var a=n("7b0b"),i=Math.floor,r="".replace,s=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,c=/\$([$&'`]|\d{1,2})/g;t.exports=function(t,e,n,o,l,u){var d=n+t.length,f=o.length,h=c;return void 0!==l&&(l=a(l),h=s),r.call(u,h,(function(a,r){var s;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(d);case"<":s=l[r.slice(1,-1)];break;default:var c=+r;if(0===c)return a;if(c>f){var u=i(c/10);return 0===u?a:u<=f?void 0===o[u-1]?r.charAt(1):o[u-1]+r.charAt(1):a}s=o[c-1]}return void 0===s?"":s}))}},1148:function(t,e,n){"use strict";var a=n("a691"),i=n("1d80");t.exports=function(t){var e=String(i(this)),n="",r=a(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(n+=e);return n}},1276:function(t,e,n){"use strict";var a=n("d784"),i=n("44e7"),r=n("825a"),s=n("1d80"),c=n("4840"),o=n("8aa5"),l=n("50c4"),u=n("14c3"),d=n("9263"),f=n("9f7f"),h=f.UNSUPPORTED_Y,v=[].push,p=Math.min,g=4294967295;a("split",2,(function(t,e,n){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var a=String(s(this)),r=void 0===n?g:n>>>0;if(0===r)return[];if(void 0===t)return[a];if(!i(t))return e.call(a,t,r);var c,o,l,u=[],f=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,p=new RegExp(t.source,f+"g");while(c=d.call(p,a)){if(o=p.lastIndex,o>h&&(u.push(a.slice(h,c.index)),c.length>1&&c.index<a.length&&v.apply(u,c.slice(1)),l=c[0].length,h=o,u.length>=r))break;p.lastIndex===c.index&&p.lastIndex++}return h===a.length?!l&&p.test("")||u.push(""):u.push(a.slice(h)),u.length>r?u.slice(0,r):u}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=s(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,i,n):a.call(String(i),e,n)},function(t,i){var s=n(a,t,this,i,a!==e);if(s.done)return s.value;var d=r(t),f=String(this),v=c(d,RegExp),x=d.unicode,m=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(h?"g":"y"),b=new v(h?"^(?:"+d.source+")":d,m),_=void 0===i?g:i>>>0;if(0===_)return[];if(0===f.length)return null===u(b,f)?[f]:[];var y=0,E=0,C=[];while(E<f.length){b.lastIndex=h?0:E;var w,D=u(b,h?f.slice(E):f);if(null===D||(w=p(l(b.lastIndex+(h?E:0)),f.length))===y)E=o(f,E,x);else{if(C.push(f.slice(y,E)),C.length===_)return C;for(var S=1;S<=D.length-1;S++)if(C.push(D[S]),C.length===_)return C;E=y=w}}return C.push(f.slice(y)),C}]}),h)},"14c3":function(t,e,n){var a=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var r=n.call(t,e);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==a(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"159b":function(t,e,n){var a=n("da84"),i=n("fdbc"),r=n("17c2"),s=n("9112");for(var c in i){var o=a[c],l=o&&o.prototype;if(l&&l.forEach!==r)try{s(l,"forEach",r)}catch(u){l.forEach=r}}},"17c2":function(t,e,n){"use strict";var a=n("b727").forEach,i=n("a640"),r=i("forEach");t.exports=r?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},"408a":function(t,e,n){var a=n("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=a(t))throw TypeError("Incorrect invocation");return+t}},"44e7":function(t,e,n){var a=n("861d"),i=n("c6b6"),r=n("b622"),s=r("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==i(t))}},5319:function(t,e,n){"use strict";var a=n("d784"),i=n("825a"),r=n("50c4"),s=n("a691"),c=n("1d80"),o=n("8aa5"),l=n("0cb2"),u=n("14c3"),d=Math.max,f=Math.min,h=function(t){return void 0===t?t:String(t)};a("replace",2,(function(t,e,n,a){var v=a.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,p=a.REPLACE_KEEPS_$0,g=v?"$":"$0";return[function(n,a){var i=c(this),r=void 0==n?void 0:n[t];return void 0!==r?r.call(n,i,a):e.call(String(i),n,a)},function(t,a){if(!v&&p||"string"===typeof a&&-1===a.indexOf(g)){var c=n(e,t,this,a);if(c.done)return c.value}var x=i(t),m=String(this),b="function"===typeof a;b||(a=String(a));var _=x.global;if(_){var y=x.unicode;x.lastIndex=0}var E=[];while(1){var C=u(x,m);if(null===C)break;if(E.push(C),!_)break;var w=String(C[0]);""===w&&(x.lastIndex=o(m,r(x.lastIndex),y))}for(var D="",S=0,k=0;k<E.length;k++){C=E[k];for(var R=String(C[0]),I=d(f(s(C.index),m.length),0),A=[],$=1;$<C.length;$++)A.push(h(C[$]));var T=C.groups;if(b){var N=[R].concat(A,I,m);void 0!==T&&N.push(T);var P=String(a.apply(void 0,N))}else P=l(R,m,I,A,T,a);I>=S&&(D+=m.slice(S,I)+P,S=I+R.length)}return D+m.slice(S)}]}))},"8aa5":function(t,e,n){"use strict";var a=n("6547").charAt;t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},9263:function(t,e,n){"use strict";var a=n("ad6d"),i=n("9f7f"),r=n("5692"),s=RegExp.prototype.exec,c=r("native-string-replace",String.prototype.replace),o=s,l=function(){var t=/a/,e=/b*/g;return s.call(t,"a"),s.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),u=i.UNSUPPORTED_Y||i.BROKEN_CARET,d=void 0!==/()??/.exec("")[1],f=l||d||u;f&&(o=function(t){var e,n,i,r,o=this,f=u&&o.sticky,h=a.call(o),v=o.source,p=0,g=t;return f&&(h=h.replace("y",""),-1===h.indexOf("g")&&(h+="g"),g=String(t).slice(o.lastIndex),o.lastIndex>0&&(!o.multiline||o.multiline&&"\n"!==t[o.lastIndex-1])&&(v="(?: "+v+")",g=" "+g,p++),n=new RegExp("^(?:"+v+")",h)),d&&(n=new RegExp("^"+v+"$(?!\\s)",h)),l&&(e=o.lastIndex),i=s.call(f?n:o,g),f?i?(i.input=i.input.slice(p),i[0]=i[0].slice(p),i.index=o.lastIndex,o.lastIndex+=i[0].length):o.lastIndex=0:l&&i&&(o.lastIndex=o.global?i.index+i[0].length:e),d&&i&&i.length>1&&c.call(i[0],n,(function(){for(r=1;r<arguments.length-2;r++)void 0===arguments[r]&&(i[r]=void 0)})),i}),t.exports=o},"9f7f":function(t,e,n){"use strict";var a=n("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=a((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=a((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}},a79e:function(t,e,n){},ac1f:function(t,e,n){"use strict";var a=n("23e7"),i=n("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var a=n("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b0c0:function(t,e,n){var a=n("83ab"),i=n("9bf2").f,r=Function.prototype,s=r.toString,c=/^\s*function ([^ (]*)/,o="name";a&&!(o in r)&&i(r,o,{configurable:!0,get:function(){try{return s.call(this).match(c)[1]}catch(t){return""}}})},b596:function(t,e,n){"use strict";n("a79e")},b680:function(t,e,n){"use strict";var a=n("23e7"),i=n("a691"),r=n("408a"),s=n("1148"),c=n("d039"),o=1..toFixed,l=Math.floor,u=function(t,e,n){return 0===e?n:e%2===1?u(t,e-1,n*t):u(t*t,e/2,n)},d=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},f=function(t,e,n){var a=-1,i=n;while(++a<6)i+=e*t[a],t[a]=i%1e7,i=l(i/1e7)},h=function(t,e){var n=6,a=0;while(--n>=0)a+=t[n],t[n]=l(a/e),a=a%e*1e7},v=function(t){var e=6,n="";while(--e>=0)if(""!==n||0===e||0!==t[e]){var a=String(t[e]);n=""===n?a:n+s.call("0",7-a.length)+a}return n},p=o&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){o.call({})}));a({target:"Number",proto:!0,forced:p},{toFixed:function(t){var e,n,a,c,o=r(this),l=i(t),p=[0,0,0,0,0,0],g="",x="0";if(l<0||l>20)throw RangeError("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return String(o);if(o<0&&(g="-",o=-o),o>1e-21)if(e=d(o*u(2,69,1))-69,n=e<0?o*u(2,-e,1):o/u(2,e,1),n*=4503599627370496,e=52-e,e>0){f(p,0,n),a=l;while(a>=7)f(p,1e7,0),a-=7;f(p,u(10,a,1),0),a=e-1;while(a>=23)h(p,1<<23),a-=23;h(p,1<<a),f(p,1,1),h(p,2),x=v(p)}else f(p,0,n),f(p,1<<-e,0),x=v(p)+s.call("0",l);return l>0?(c=x.length,x=g+(c<=l?"0."+s.call("0",l-c)+x:x.slice(0,c-l)+"."+x.slice(c-l))):x=g+x,x}})},b727:function(t,e,n){var a=n("0366"),i=n("44ad"),r=n("7b0b"),s=n("50c4"),c=n("65f0"),o=[].push,l=function(t){var e=1==t,n=2==t,l=3==t,u=4==t,d=6==t,f=7==t,h=5==t||d;return function(v,p,g,x){for(var m,b,_=r(v),y=i(_),E=a(p,g,3),C=s(y.length),w=0,D=x||c,S=e?D(v,C):n||f?D(v,0):void 0;C>w;w++)if((h||w in y)&&(m=y[w],b=E(m,w,_),t))if(e)S[w]=b;else if(b)switch(t){case 3:return!0;case 5:return m;case 6:return w;case 2:o.call(S,m)}else switch(t){case 4:return!1;case 7:o.call(S,m)}return d?-1:l||u?u:S}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},d784:function(t,e,n){"use strict";n("ac1f");var a=n("6eeb"),i=n("9263"),r=n("d039"),s=n("b622"),c=n("9112"),o=s("species"),l=RegExp.prototype,u=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),d=function(){return"$0"==="a".replace(/./,"$0")}(),f=s("replace"),h=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),v=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var p=s(t),g=!r((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),x=g&&!r((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[o]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!g||!x||"replace"===t&&(!u||!d||h)||"split"===t&&!v){var m=/./[p],b=n(p,""[t],(function(t,e,n,a,r){var s=e.exec;return s===i||s===l.exec?g&&!r?{done:!0,value:m.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}}),{REPLACE_KEEPS_$0:d,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:h}),_=b[0],y=b[1];a(String.prototype,t,_),a(l,p,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}f&&c(l[p],"sham",!0)}},daab:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"presonal"},[n("van-nav-bar",{attrs:{title:"订单结算","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),n("div",{staticClass:"address-select"},[n("div",{staticClass:"select"},[n("span",{on:{click:function(e){t.show=!0}}},[t._v("选择地址")]),n("van-icon",{attrs:{name:"arrow"},on:{click:function(e){t.show=!0}}})],1),n("div",{staticClass:"xinxi"},[n("span",{staticClass:"name"},[t._v(t._s(t.defaultData.name))]),n("span",{staticClass:"phone"},[t._v(t._s(t.defaultData.tel))]),1==t.defaultData.isDefault?n("span",{staticClass:"home"},[t._v("默认")]):t._e()]),n("div",{staticClass:"address-box"},[t._v(t._s(t.defaultData.province)+t._s(t.defaultData.city)+t._s(t.defaultData.county)+t._s(t.defaultData.addressDetail))])]),n("div",{staticClass:"content"},[n("div",{staticClass:"content-box"},[t._m(0),n("div",{staticClass:"table"},t._l(t.data,(function(e,a){return n("div",{key:a,staticClass:"view"},[n("van-card",{attrs:{tag:1==e.hot?"hot":"",num:e.count,price:e.price,desc:e.enname,title:e.name,thumb:e.url},scopedSlots:t._u([{key:"tags",fn:function(){return[n("div",{staticClass:"type"},[t._v(t._s(e.rule))])]},proxy:!0}],null,!0)})],1)})),0),n("div",{staticClass:"footer"},[n("div",{staticClass:"round-left"}),n("div",{staticClass:"round-right"}),n("div",{staticClass:"date"},[t._v(t._s(t.time[0])+" "+t._s(t.time[1]))]),n("div",{staticClass:"sum"},[n("div",{staticClass:"count"},[t._v("共计"),n("span",[t._v(t._s(t.sum))]),t._v("件")]),n("div",{staticClass:"total"},[n("span",[t._v("合计")]),t._v("￥"+t._s(t.summoney))])])])])]),n("div",{staticClass:"button"},[n("van-button",{attrs:{type:"primary",round:"",size:"large",color:"#0C34BA"},on:{click:t.settlement}},[t._v(" 立即结算 ")])],1),n("van-popup",{style:{height:"50%"},attrs:{round:"",position:"bottom",closeable:""},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[n("div",{staticClass:"addselect btn-address"},[n("div",{staticClass:"select"},[n("span",[t._v("选择地址")])]),t._l(t.addressArr,(function(e,a){return n("div",{key:a,staticClass:"address"},[n("div",{staticClass:"address-left"},[n("van-checkbox",{attrs:{"checked-color":"#0C34BA"},on:{click:function(n){return t.toggleAddress(e.aid)}},model:{value:e.checked,callback:function(n){t.$set(e,"checked",n)},expression:"item.checked"}})],1),n("div",{staticClass:"address-right"},[n("div",{staticClass:"xinxi"},[n("span",{staticClass:"name"},[t._v(t._s(e.name))]),n("span",{staticClass:"phone"},[t._v(t._s(e.tel))]),1==e.isDefault?n("span",{staticClass:"home"},[t._v("默认")]):t._e()]),n("div",{staticClass:"address-box"},[t._v(t._s(e.province)+t._s(e.city)+t._s(e.county)+t._s(e.addressDetail))])])])}))],2),n("div",{staticClass:"button-address"},[n("van-button",{attrs:{type:"primary",round:"",size:"large",color:"#0C34BA"},on:{click:t.addressNext}},[t._v(" 新增地址 ")])],1)])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("div",{staticClass:"t-left"},[t._v("订单信息")])])}],r=(n("159b"),n("b0c0"),n("b680"),n("ac1f"),n("5319"),n("1276"),{data:function(){return{show:!1,data:[],summoney:0,sum:0,time:"",addressArr:[],sid:0,defaultData:"",objid:{}}},methods:{getData:function(t,e,n){return"get"==e?this.axios.get(t,{params:n}):"post"==e?this.axios.post(t,n):this.axios({url:t,method:e})},onClickLeft:function(){this.$router.go(-1)},getCommodity:function(){var t=this;this.getData("/commitShopcart","get",{sids:JSON.stringify(this.objid.dis)}).then((function(e){t.summoney=0,t.sum=0,e.result.forEach((function(e){t.summoney+=e.price*e.count,t.sum+=e.count,t.data.push({count:e.count,hot:e.is_hot,enname:e.enname,name:e.name,pid:e.pid,price:e.price,rule:e.rule,url:e.small_img})})),t.summoney=t.summoney.toFixed(2);var n=(new Date).toLocaleString("chinese",{hour12:!1}),a=n.replace(/[\u4e00-\u9fa5]+/,",");a=a.replace(/[\/]/g,"-"),t.time=a.split(",")})).catch((function(t){console.log(t)}))},getAddres:function(){var t=this;this.getData("/findAddress","get").then((function(e){if(2e4==e.code){var n=[];e.result.forEach((function(t){n.push({name:t.name,tel:t.tel,province:t.province,city:t.city,county:t.county,addressDetail:t.addressDetail,areaCode:t.areaCode,postalCode:t.postalCode,isDefault:t.isDefault,aid:t.aid,checked:!1})})),t.addressArr=n,n.forEach((function(e){1==e.isDefault&&(t.default=1,t.defaultData=e)}))}})).catch((function(t){console.log(t)}))},toggleAddress:function(t){var e=this;this.addressArr.forEach((function(n){n.checked=!1,n.aid==t&&(e.defaultData=n,n.checked=!0)}))},settlement:function(){var t=this;this.getData("/pay","post",{sids:JSON.stringify(this.objid.dis),phone:this.defaultData.tel,address:this.defaultData.province+this.defaultData.city+this.defaultData.county+this.defaultData.addressDetail,receiver:this.defaultData.name}).then((function(e){6e4==e.code&&setTimeout((function(){t.$router.push({name:"myOrder",query:{status:1,id:1001}})}),1500)})).catch((function(t){console.log(t)}))},addressNext:function(){var t=this;setTimeout((function(){t.$router.push({name:"newAddress"})}),500)}},created:function(){var t=this.$route.query.sids,e={};""!=t&&(e.dis=t,this.objid=e,this.sid=e.dis,this.getCommodity(),this.getAddres())}}),s=r,c=(n("b596"),n("2877")),o=Object(c["a"])(s,a,i,!1,null,"0322f72c",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-1420c5b9.74f90328.js.map