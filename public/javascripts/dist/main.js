parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"zB7T":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.colorsOfRibbonItem=exports.ruStatesOfRibbonItem=exports.statesOfRibbonItem=void 0;var e=(new Map).set(46,"Reject").set(32,"approve").set(13,"escalation");exports.statesOfRibbonItem=e;var t=(new Map).set(46,"Отклонить").set(32,"Одобрить").set(13,"Эскалация");exports.ruStatesOfRibbonItem=t;var s=(new Map).set(46,"text-orange").set(32,"text-green").set(13,"text-blue");exports.colorsOfRibbonItem=s;
},{}],"1vNK":[function(require,module,exports) {
"use strict";function t(t){return n(t)||r(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function n(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.clickF7KeyPsudoEvent=exports.initItems=exports.prepeareData=exports.toNext=exports.isNotExistsMultyAction=exports.isNotExistsAction=exports.isExistsAction=exports.removeIsExistsMany=exports.removeIsExists=exports.isExistsInDocument=exports.isNotExists=exports.isExists=void 0;var o=function(t,e){return null!=t.querySelector(e)};exports.isExists=o;var s=function(t,e){return!o(t,e)};exports.isNotExists=s;var i=function(t){return o(document,t)};exports.isExistsInDocument=i;var c=function(t,e){!0===o(t,e)&&t.querySelector(e).remove()};exports.removeIsExists=c;var a=function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];r.forEach(function(e){c(t,e)})};exports.removeIsExistsMany=a;var u=function(t,e,r){return o(t,e)?r():null};exports.isExistsAction=u;var l=function(t,e,r){return s(t,e)?r():null};exports.isNotExistsAction=l;var p=function(t,e){for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];n.every(function(e){return s(t,e)})&&e()};exports.isNotExistsMultyAction=p;var d=function(t){t=new Number(t)+1,document.querySelector(".focus").classList.remove(".focus");var e=document.getElementById(t);document.getElementById(t)&&(e.classList.add("focus"),e.scrollIntoView({behavior:"smooth"}),e.dispatchEvent(new Event("click")))};exports.toNext=d;var v=function(t){s(t,".decision")&&alert("Обработайте все заявки в ленте");var e=t.querySelector(".decision").innerHTML.split(" ").pop(),r=t.querySelector(".comment")?t.querySelector(".comment").innerHTML:null;if("Отклонить"!==e||r)return{id:t.id,workers_id:100*Math.random()>=50?1:2,status:e,message:r};alert("Укажите причину отклонения для объявления №".concat(t.id))};exports.prepeareData=v;var x=function(e){return t(document.querySelectorAll(e)).map(function(t,e,r){return 0===e&&t.classList.add("focus"),t.addEventListener("click",function(){r.map(function(t){return t.classList.remove("focus")}),t.classList.add("focus")}),t})};exports.initItems=x;var f=function(t,e,r){t.removeEventListener("keyup",e),t.addEventListener("keyup",r);var n=new KeyboardEvent("keyup",{keyCode:118});t.dispatchEvent(n)};exports.clickF7KeyPsudoEvent=f;var y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",e=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,n=new XMLHttpRequest;n.open("POST",t,!0),n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.onreadystatechange=function(){4===n.readyState&&200===n.status?r():console.log(n.status,n.readyState)},n.send(e)};exports.default=y;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=require("./maps.js"),t=n(require("./fn.js"));function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function r(e){return i(e)||c(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function i(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var a=document.querySelector(".app");a.addEventListener("keydown",function(e){if(13===e.keyCode){var n=document.querySelector("#hello");n.classList.add("animation-move"),setTimeout(function(){n.remove(),(0,t.clickF7KeyPsudoEvent)(a,f,l)},1e3,a,f,l)}},{once:!0}),a.addEventListener("keypress",function(e){e.preventDefault()});var u=function(e,n){var r=document.createElement("textarea");return r.classList.add(e),r.placeholder=n,r.addEventListener("keypress",function(e){a.removeEventListener("keyup",f,{once:!0}),a.removeEventListener("keyup",y,{once:!0}),e.target.value+="Enter"===e.key?"":e.key,"Enter"===e.key&&(a.addEventListener("keyup",f),a.addEventListener("keyup",y),document.querySelector(".focus").querySelector(".btns-ribbon").append(s("comment",e.target.value)),document.querySelector(".focus").querySelector("textarea").remove(),(0,t.toNext)(document.querySelector(".focus").id))}),r},s=function(e,t){var n=document.createElement("span");return n.classList.add(e),n.innerHTML=t,n},d=function(){var e=document.createElement("div");e.classList.add("cancel-link");var t=document.createElement("a");t.innerHTML="Отменить решение ",t.href="#";var n=s("text-gray","ctrl + z");return a.addEventListener("keyup",y),e.append(t,n),e},l=function e(n){118===n.keyCode&&fetch("/objects/").then(function(e){return e.text()}).then(function(n){document.querySelector(".app").innerHTML=n,(0,t.initItems)(".ribbon"),a.removeEventListener("keyup",e),a.addEventListener("keyup",f)})},y=function e(n){var o=a.querySelector(".focus");n.ctrlKey&&90===n.keyCode&&(r(o.querySelector(".btns-ribbon").querySelectorAll("div")).map(function(e){return e.style.opacity=1}),a.removeEventListener("keyup",e),(0,t.removeIsExistsMany)(o,".cancel-link",".decision","textarea",".comment"))},f=function n(o){var c=document.querySelector(".focus");if(46===o.keyCode||32===o.keyCode||o.shiftKey&&13===o.keyCode){var i=c.querySelector(".btns-ribbon"),y=s("d-block","Ваше решение: ".concat(e.ruStatesOfRibbonItem.get(o.keyCode)));y.classList.add("decision",e.colorsOfRibbonItem.get(o.keyCode)),(0,t.isNotExistsAction)(i,".decision",function(){return i.append(y)}),r(i.querySelectorAll("div:not(.cancel-link)")).map(function(e){return e.style.opacity=".2"}),(0,t.isNotExistsAction)(i,".cancel-link",function(){return i.append(d())})}if(32===o.keyCode&&(0,t.toNext)(c.id),118!==o.keyCode){if(o.shiftKey&&13===o.keyCode||46===o.keyCode){var f=46===o.keyCode?"Укажите причину удаления":"Укажите комментарий старшему оператору",p=u("textarea","".concat(f," ").concat("\nПосле заполнения нажать Enter чтобы перейти к следующему элементу"),c),v=c.querySelector(".btns-ribbon");(0,t.isNotExistsMultyAction)(v,function(){v.append(p),v.querySelector("textarea").focus()},"textarea ",".comment")}}else{var m=JSON.stringify(r(document.querySelectorAll(".ribbon")).map(function(e){return(0,t.prepeareData)(e)}));(0,t.default)("/",m,function(){(0,t.clickF7KeyPsudoEvent)(a,n,l),a.scrollIntoView({behavior:"smooth"})})}};
},{"./maps.js":"zB7T","./fn.js":"1vNK"}]},{},["epB2"], null)
//# sourceMappingURL=/main.map