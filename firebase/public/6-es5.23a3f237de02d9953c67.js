function _slicedToArray(n,l){return _arrayWithHoles(n)||_iterableToArrayLimit(n,l)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(n,l){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n)){var e=[],t=!0,i=!1,u=void 0;try{for(var o,a=n[Symbol.iterator]();!(t=(o=a.next()).done)&&(e.push(o.value),!l||e.length!==l);t=!0);}catch(r){i=!0,u=r}finally{try{t||null==a.return||a.return()}finally{if(i)throw u}}return e}}function _arrayWithHoles(n){if(Array.isArray(n))return n}function _toConsumableArray(n){return _arrayWithoutHoles(n)||_iterableToArray(n)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function _arrayWithoutHoles(n){if(Array.isArray(n)){for(var l=0,e=new Array(n.length);l<n.length;l++)e[l]=n[l];return e}}function _defineProperties(n,l){for(var e=0;e<l.length;e++){var t=l[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{mrSG:function(n,l,e){"use strict";function t(n,l,e,t){return new(e||(e=Promise))((function(i,u){function o(n){try{r(t.next(n))}catch(l){u(l)}}function a(n){try{r(t.throw(n))}catch(l){u(l)}}function r(n){var l;n.done?i(n.value):(l=n.value,l instanceof e?l:new e((function(n){n(l)}))).then(o,a)}r((t=t.apply(n,l||[])).next())}))}e.d(l,"a",(function(){return t}))},o1NI:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J"),i=function n(){_classCallCheck(this,n)},u=e("pMnS"),o=e("SVse"),a=e("mnDg"),r=function(){function n(l){_classCallCheck(this,n),this.store$=l}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"closeSideNav",value:function(){this.store$.dispatch(a.a.UpdateSideNavVisibility({visible:!1}))}}]),n}(),c=e("DQLy"),s=t.pb({encapsulation:0,styles:[[".sidenav[_ngcontent-%COMP%]{height:100%;z-index:1000;background-color:#2b624c;color:#f5f0f6;box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}.title-section[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;font-size:1.5rem;padding:1rem;border-bottom:1px solid #f5f0f6}.content-section[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;font-size:1.25rem;padding:1rem}@media (max-width:767px){.sidenav[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:95%}}@media (min-width:768px){.close-button[_ngcontent-%COMP%]{display:none}}"]],data:{}});function d(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,7,"div",[["class","sidenav"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,4,"div",[["class","title-section"]],null,null,null,null,null)),(n()(),t.rb(2,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Select a Frame"])),(n()(),t.rb(4,0,null,null,1,"span",[["class","clickable close-button"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.closeSideNav()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["X"])),(n()(),t.rb(6,0,null,null,1,"div",[["class","content-section"]],null,null,null,null,null)),t.Bb(null,0)],null,null)}var b=function(){function n(){_classCallCheck(this,n),this.closeModal=new t.m,this.createFrame=new t.m,this.errorText=""}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"onCloseModal",value:function(){this.closeModal.emit(!0)}},{key:"onCreateFrame",value:function(n){n&&""!==n?this.createFrame.emit(n):this.errorText="Must enter a name."}}]),n}(),p=t.pb({encapsulation:0,styles:[[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#f5f0f6;margin:15% auto;padding:1rem;border:1px solid #888;width:80%}.header[_ngcontent-%COMP%]{font-size:1.5rem;display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;padding-bottom:.25rem}hr.header-seperator[_ngcontent-%COMP%]{padding-bottom:.75rem;border-top:1px solid #000;border-left:none}.body[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.footer[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:end;justify-content:flex-end;padding-top:.75rem}.input-label[_ngcontent-%COMP%]{padding-bottom:.25rem}.error[_ngcontent-%COMP%]{color:#d8000c}@media (max-width:767px){.modal-content[_ngcontent-%COMP%]{width:80%}}@media (min-width:768px){.modal-content[_ngcontent-%COMP%]{width:50%}}@media (min-width:1024px){.modal-content[_ngcontent-%COMP%]{width:30%}}"]],data:{}});function f(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,16,"div",[["class","modal"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,15,"div",[["class","modal-content"]],null,null,null,null,null)),(n()(),t.rb(2,0,null,null,4,"div",[["class","header"]],null,null,null,null,null)),(n()(),t.rb(3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Create a Frame"])),(n()(),t.rb(5,0,null,null,1,"span",[["class","clickable"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onCloseModal()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["X"])),(n()(),t.rb(7,0,null,null,0,"hr",[["class","header-seperator"]],null,null,null,null,null)),(n()(),t.rb(8,0,null,null,5,"div",[["class","body"]],null,null,null,null,null)),(n()(),t.rb(9,0,null,null,1,"span",[["class","input-label"]],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Name:"])),(n()(),t.rb(11,0,[["frameName",1]],null,0,"input",[["type","text"]],null,null,null,null,null)),(n()(),t.rb(12,0,null,null,1,"span",[["class","error"]],null,null,null,null,null)),(n()(),t.Ib(13,null,["",""])),(n()(),t.rb(14,0,null,null,2,"div",[["class","footer"]],null,null,null,null,null)),(n()(),t.rb(15,0,null,null,1,"button",[["class","btn btn-primary"]],null,[[null,"click"]],(function(n,l,e){var i=!0;return"click"===l&&(i=!1!==n.component.onCreateFrame(t.Cb(n,11).value)&&i),i}),null,null)),(n()(),t.Ib(-1,null,["CREATE"]))],null,(function(n,l){n(l,13,0,l.component.errorText)}))}var h=e("RLuz"),g=function(){function n(l){_classCallCheck(this,n),this.store$=l}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"onLogout",value:function(){this.store$.dispatch(h.a.SignOutUser())}},{key:"openSideNav",value:function(){this.store$.dispatch(a.a.UpdateSideNavVisibility({visible:!0}))}}]),n}(),m=t.pb({encapsulation:0,styles:[[".layout[_ngcontent-%COMP%]{display:-webkit-box;display:flex;color:#f5f0f6;padding:.75rem;background-color:#2b4162;z-index:1000;-webkit-box-pack:justify;justify-content:space-between;box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}@media (max-width:767px){.account[_ngcontent-%COMP%], .menu-button[_ngcontent-%COMP%]{display:block;-webkit-box-flex:1;flex:1}.account[_ngcontent-%COMP%]{text-align:right}.filler[_ngcontent-%COMP%]{display:none}}@media (min-width:768px){.filler[_ngcontent-%COMP%]{display:block}.menu-button[_ngcontent-%COMP%]{display:none}}.dropdown-content[_ngcontent-%COMP%]{display:none;position:absolute;background-color:#f5f0f6;color:#2b4162;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1;padding:1rem;right:5px}.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{display:block}"]],data:{}});function v(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,11,"div",[["class","layout"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,1,"span",[["class","menu-button clickable"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openSideNav()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["Ham"])),(n()(),t.rb(3,0,null,null,0,"span",[["class","filler"]],null,null,null,null,null)),(n()(),t.rb(4,0,null,null,1,"span",[["class","nav-title"]],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Launchpad Frame"])),(n()(),t.rb(6,0,null,null,5,"div",[["class","account dropdown"]],null,null,null,null,null)),(n()(),t.rb(7,0,null,null,1,"span",[["class","clickable"]],null,null,null,null,null)),(n()(),t.Ib(-1,null,["Account"])),(n()(),t.rb(9,0,null,null,2,"div",[["class","dropdown-content"]],null,null,null,null,null)),(n()(),t.rb(10,0,null,null,1,"span",[["class","clickable"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onLogout()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["Logout"]))],null,null)}var y=e("HDdC"),k=e("D0XW"),x=e("Y7HM");function C(n){var l=n.subscriber,e=n.counter,t=n.period;l.next(e),this.schedule({subscriber:l,counter:e+1,period:t},t)}var _=e("vkgz"),w=e("Kqap"),O=e("JX91"),I=e("zp1y"),M=e("lJxs"),F=function(){function n(l){_classCallCheck(this,n),this.store$=l,this.currentImages$=this.setCurrentImagesListener(),this.currentImageIndex$=this.setCurrentImageIndexGenerator(),this.liveImage$=this.setLiveImageGenerator(),this.images=[],this.exit=new t.m}return _createClass(n,[{key:"onEscapeHandler",value:function(n){this.exit.emit(!0)}},{key:"ngOnInit",value:function(){this.store$.dispatch(a.a.LiveImageListenerRequest())}},{key:"ngOnDestroy",value:function(){this.store$.dispatch(a.a.LiveImageListenerStopRequest())}},{key:"setCurrentImagesListener",value:function(){return this.store$.select(a.b.SelectFrameImages).pipe(Object(_.a)((function(n){return console.log("New payload from store: ",n)})),Object(w.a)((function(n,l){console.log("Current accumulated: ",n);var e=l.filter((function(l){return!n.includes(l)}));return console.log("Detected difference of ",e),[].concat(_toConsumableArray(n),_toConsumableArray(e))}),[]),Object(_.a)((function(n){return console.log("Outputting current images ",n)})))}},{key:"setCurrentImageIndexGenerator",value:function(){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k.a;return(!Object(x.a)(n)||n<0)&&(n=0),l&&"function"==typeof l.schedule||(l=k.a),new y.a((function(e){return e.add(l.schedule(C,n,{subscriber:e,counter:0,period:n})),e}))}(7500).pipe(Object(O.a)(0),Object(I.a)(this.currentImages$),Object(M.a)((function(n){var l=_slicedToArray(n,2);l[0];return l[1]})),Object(w.a)((function(n,l){return(n+1)%l.length}),0))}},{key:"setLiveImageGenerator",value:function(){return this.currentImageIndex$.pipe(Object(I.a)(this.currentImages$),Object(M.a)((function(n){var l=_slicedToArray(n,2),e=l[0];return l[1][e]})))}}]),n}(),P=t.pb({encapsulation:0,styles:[[".layout[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#000;position:fixed;top:0;left:0;z-index:100;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}"]],data:{}});function S(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.context.ngIf.downloadUrl)}))}function $(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,3,"div",[["class","layout"]],null,null,null,null,null)),(n()(),t.gb(16777216,null,null,2,null,S)),t.qb(2,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),t.Db(131072,o.b,[t.h])],(function(n,l){var e=l.component;n(l,2,0,t.Jb(l,2,0,t.Cb(l,3).transform(e.liveImage$)))}),null)}e("mrSG");var j=function n(){_classCallCheck(this,n)};function A(n){return null!=n&&"false"!=="".concat(n)}var q=function(){function n(){_classCallCheck(this,n)}return _createClass(n,[{key:"parseFileList",value:function(n,l,e,t){for(var i=[],u=[],o=0;o<n.length;o++){var a=n.item(o);this.isAccepted(a,l)?e&&a.size>e?this.rejectFile(u,a,"size"):!t&&i.length>=1?this.rejectFile(u,a,"no_multiple"):i.push(a):this.rejectFile(u,a,"type")}return{addedFiles:i,rejectedFiles:u}}},{key:"isAccepted",value:function(n,l){if("*"===l)return!0;var e=l.split(",").map((function(n){return n.toLowerCase().trim()})),t=n.type.toLowerCase(),i=n.name.toLowerCase();return!!e.find((function(n){return n.endsWith("/*")?t.split("/")[0]===n.split("/")[0]:n.startsWith(".")?i.endsWith(n):n==t}))}},{key:"rejectFile",value:function(n,l,e){var t=l;t.reason=e,n.push(t)}}]),n}(),L=function(){function n(l){_classCallCheck(this,n),this.service=l,this.change=new t.m,this.accept="*",this._disabled=!1,this._multiple=!0,this._maxFileSize=void 0,this._expandable=!1,this._disableClick=!1,this._isHovered=!1}return _createClass(n,[{key:"_onClick",value:function(){this.disableClick||this.showFileSelector()}},{key:"_onDragOver",value:function(n){this.disabled||(this.preventDefault(n),this._isHovered=!0)}},{key:"_onDragLeave",value:function(){this._isHovered=!1}},{key:"_onDrop",value:function(n){this.disabled||(this.preventDefault(n),this._isHovered=!1,this.handleFileDrop(n.dataTransfer.files))}},{key:"showFileSelector",value:function(){this.disabled||this._fileInput.nativeElement.click()}},{key:"_onFilesSelected",value:function(n){this.handleFileDrop(n.target.files),this._fileInput.nativeElement.value="",this.preventDefault(n)}},{key:"handleFileDrop",value:function(n){var l=this.service.parseFileList(n,this.accept,this.maxFileSize,this.multiple);this.change.next({addedFiles:l.addedFiles,rejectedFiles:l.rejectedFiles,source:this})}},{key:"preventDefault",value:function(n){n.preventDefault(),n.stopPropagation()}},{key:"_hasPreviews",get:function(){return!!this._previewChildren.length}},{key:"disabled",get:function(){return this._disabled},set:function(n){this._disabled=A(n),this._isHovered&&(this._isHovered=!1)}},{key:"multiple",get:function(){return this._multiple},set:function(n){this._multiple=A(n)}},{key:"maxFileSize",get:function(){return this._maxFileSize},set:function(n){this._maxFileSize=function(n){return isNaN(parseFloat(n))||isNaN(Number(n))?null:Number(n)}(n)}},{key:"expandable",get:function(){return this._expandable},set:function(n){this._expandable=A(n)}},{key:"disableClick",get:function(){return this._disableClick},set:function(n){this._disableClick=A(n)}}]),n}(),N=function n(){_classCallCheck(this,n)};e("cUpR");var D=t.pb({encapsulation:0,styles:["[_nghost-%COMP%]{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}.ngx-dz-hovered[_nghost-%COMP%]{border-style:solid}.ngx-dz-disabled[_nghost-%COMP%]{opacity:.5;cursor:no-drop;pointer-events:none}.expandable[_nghost-%COMP%]{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}.unclickable[_nghost-%COMP%]{cursor:default}[_nghost-%COMP%]     ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus +   ngx-dropzone-label{outline:#000 dotted 1px;outline:-webkit-focus-ring-color auto 5px}"],data:{}});function z(n){return t.Kb(0,[t.Bb(null,0),(n()(),t.gb(0,null,null,0))],null,null)}function J(n){return t.Kb(0,[t.Gb(402653184,1,{_fileInput:0}),(n()(),t.rb(1,0,[[1,0],["fileInput",1]],null,0,"input",[["type","file"]],[[8,"id",0],[8,"multiple",0],[8,"accept",0],[8,"disabled",0],[1,"aria-label",0],[1,"aria-labelledby",0],[1,"aria-describedby",0]],[[null,"change"]],(function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component._onFilesSelected(e)&&t),t}),null,null)),(n()(),t.gb(16777216,null,null,1,null,z)),t.qb(3,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),t.Bb(null,1),t.Bb(null,2)],(function(n,l){n(l,3,0,!l.component._hasPreviews)}),(function(n,l){var e=l.component;n(l,1,0,e.id,e.multiple,e.accept,e.disabled,e.ariaLabel,e.ariaLabelledby,e.ariaDescribedBy)}))}var K=function(){function n(l){_classCallCheck(this,n),this.store$=l,this.selectedFrame$=this.store$.select(a.b.SelectSelectedFrame),this.uploadPercentage$=this.store$.select(a.b.SelectUploadPercentage),this.groupedImages$=this.setGroupedImagesSelector(),this.showLiveView=!1}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"onFilesAdded",value:function(n){this.store$.dispatch(a.a.UploadImagesRequest({Images:n}))}},{key:"onFilesAddedMobile",value:function(n){this.onFilesAdded(Array.from(n))}},{key:"onFabClick",value:function(){document.getElementById("mobileUpload").click()}},{key:"onShowLiveView",value:function(){this.showLiveView=!0}},{key:"onExitLiveView",value:function(){this.showLiveView=!1}},{key:"setGroupedImagesSelector",value:function(){return this.selectedFrame$.pipe(Object(M.a)((function(n){var l=[];return n.images.forEach((function(n){var e=l.findIndex((function(l){return l.displayKey===n.username}));e>=0?l[e].downloadUrls.push(n.downloadUrl):l.push({displayKey:n.username,downloadUrls:[n.downloadUrl]})})),l})))}}]),n}(),E=t.pb({encapsulation:0,styles:[[".layout[_ngcontent-%COMP%]{padding:1rem;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.title[_ngcontent-%COMP%]{font-size:1.5rem;padding-bottom:.5rem;align-self:center;text-decoration:underline}.group-image-display-section[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding-top:1rem}.group-image-display-section[_ngcontent-%COMP%]   .group-title[_ngcontent-%COMP%]{font-weight:700;padding-bottom:.5rem}.group-image-display-section[_ngcontent-%COMP%]   .image-section[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:wrap;-webkit-box-pack:center;justify-content:center}.group-image-display-section[_ngcontent-%COMP%]   .image-section[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{padding-bottom:.3rem;max-width:100%;height:auto}.image-upload-zone[_ngcontent-%COMP%]{display:-webkit-box;display:flex;opacity:.75;height:100px}.image-upload-camera[_ngcontent-%COMP%]{display:none}@media (max-width:1023px){.image-upload-zone[_ngcontent-%COMP%]{display:none}.image-upload-camera[_ngcontent-%COMP%]{display:block}}.fab-image-capture[_ngcontent-%COMP%]{position:fixed;bottom:50px;right:50px;z-index:10;box-shadow:0 3px 6px rgba(0,0,0,.5);background-color:#624c2b;color:#f5f0f6;width:60px;height:60px;border-radius:100%;border:none}.upload-progress[_ngcontent-%COMP%]{background-color:#649742;height:10px;width:100%;position:fixed;bottom:0;left:0}"]],data:{}});function U(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,1,"main-live-view",[],null,[[null,"exit"],["document","keydown.escape"]],(function(n,l,e){var i=!0,u=n.component;return"document:keydown.escape"===l&&(i=!1!==t.Cb(n,1).onEscapeHandler(e)&&i),"exit"===l&&(i=!1!==u.onExitLiveView()&&i),i}),$,P)),t.qb(1,245760,null,0,F,[c.o],null,{exit:"exit"})],(function(n,l){n(l,1,0)}),null)}function T(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),t.Ib(1,null,[" ","% COMPLETE "]))],null,(function(n,l){n(l,1,0,l.context.ngIf)}))}function H(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,0,"img",[["class","image"]],[[8,"src",4]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.context.$implicit)}))}function V(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,5,"div",[["class","group-image-display-section"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,1,"span",[["class","group-title"]],null,null,null,null,null)),(n()(),t.Ib(2,null,["","'s Images"])),(n()(),t.rb(3,0,null,null,2,"div",[["class","image-section"]],null,null,null,null,null)),(n()(),t.gb(16777216,null,null,1,null,H)),t.qb(5,278528,null,0,o.j,[t.N,t.J,t.q],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){n(l,5,0,l.context.$implicit.downloadUrls)}),(function(n,l){n(l,2,0,l.context.$implicit.displayKey)}))}function R(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,25,"div",[["class","layout"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,6,"div",[["class","title"]],null,null,null,null,null)),(n()(),t.rb(2,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t.Ib(3,null,["",""])),(n()(),t.rb(4,0,null,null,1,"span",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onShowLiveView()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["Live View"])),(n()(),t.gb(16777216,null,null,1,null,U)),t.qb(7,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),(n()(),t.rb(8,0,null,null,11,"div",[["class","image-upload-section"]],null,null,null,null,null)),(n()(),t.rb(9,0,null,null,6,"ngx-dropzone",[["class","image-upload-zone"]],[[2,"ngx-dz-disabled",null],[2,"expandable",null],[2,"unclickable",null],[2,"ngx-dz-hovered",null]],[[null,"change"],[null,"click"],[null,"dragover"],[null,"dragleave"],[null,"drop"]],(function(n,l,e){var i=!0,u=n.component;return"click"===l&&(i=!1!==t.Cb(n,11)._onClick()&&i),"dragover"===l&&(i=!1!==t.Cb(n,11)._onDragOver(e)&&i),"dragleave"===l&&(i=!1!==t.Cb(n,11)._onDragLeave()&&i),"drop"===l&&(i=!1!==t.Cb(n,11)._onDrop(e)&&i),"change"===l&&(i=!1!==u.onFilesAdded(e.addedFiles)&&i),i}),J,D)),t.Fb(512,null,q,q,[]),t.qb(11,49152,null,1,L,[[4,q]],null,{change:"change"}),t.Gb(603979776,1,{_previewChildren:1}),(n()(),t.rb(13,0,null,0,2,"ngx-dropzone-label",[],null,null,null,null,null)),t.qb(14,16384,null,0,j,[],null,null),(n()(),t.Ib(-1,null,["Drag Files or Click to Browse"])),(n()(),t.rb(16,0,null,null,3,"div",[["class","image-upload-camera"]],null,null,null,null,null)),(n()(),t.rb(17,0,null,null,0,"input",[["accept","image/*"],["capture","camera"],["id","mobileUpload"],["type","file"]],[[8,"hidden",0]],[[null,"change"]],(function(n,l,e){var t=!0;return"change"===l&&(t=!1!==n.component.onFilesAddedMobile(e.target.files)&&t),t}),null,null)),(n()(),t.rb(18,0,null,null,1,"button",[["class","fab-image-capture"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onFabClick()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["CAM"])),(n()(),t.gb(16777216,null,null,2,null,T)),t.qb(21,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),t.Db(131072,o.b,[t.h]),(n()(),t.gb(16777216,null,null,2,null,V)),t.qb(24,278528,null,0,o.j,[t.N,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),t.Db(131072,o.b,[t.h])],(function(n,l){var e=l.component;n(l,7,0,e.showLiveView),n(l,21,0,t.Jb(l,21,0,t.Cb(l,22).transform(e.uploadPercentage$))),n(l,24,0,t.Jb(l,24,0,t.Cb(l,25).transform(e.groupedImages$)))}),(function(n,l){n(l,3,0,l.context.ngIf.name),n(l,9,0,t.Cb(l,11).disabled,t.Cb(l,11).expandable,t.Cb(l,11).disableClick,t.Cb(l,11)._isHovered),n(l,17,0,!0)}))}function G(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,0,"div",[["class","upload-progress"]],[[4,"width","%"]],null,null,null,null))],null,(function(n,l){n(l,0,0,l.context.ngIf)}))}function B(n){return t.Kb(0,[(n()(),t.Ib(-1,null,[" NO FRAME SELECTED!\n"]))],null,null)}function W(n){return t.Kb(0,[(n()(),t.gb(16777216,null,null,2,null,R)),t.qb(1,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),t.Db(131072,o.b,[t.h]),(n()(),t.gb(16777216,null,null,2,null,G)),t.qb(4,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),t.Db(131072,o.b,[t.h]),(n()(),t.gb(0,[["noFrame",2]],null,0,null,B))],(function(n,l){var e=l.component;n(l,1,0,t.Jb(l,1,0,t.Cb(l,2).transform(e.selectedFrame$)),t.Cb(l,6)),n(l,4,0,t.Jb(l,4,0,t.Cb(l,5).transform(e.uploadPercentage$)))}),null)}var X=function(){function n(l){_classCallCheck(this,n),this.store$=l,this.showSidenav$=this.store$.select(a.b.SelectSideNavVisibility),this.user$=this.store$.select(h.b.SelectAuthenticationUser),this.selectedFrameId$=this.setSelectedFrameIdListener(),this.showCreateFrameModal=!1}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"onFrameSelect",value:function(n){this.store$.dispatch(a.a.SelectFrame.Request({request:n.frameId})),this.closeSideNav()}},{key:"openCreateFrame",value:function(){this.closeSideNav(),this.showCreateFrameModal=!0}},{key:"onCloseModal",value:function(){this.showCreateFrameModal=!1}},{key:"onCreateFrame",value:function(n){this.store$.dispatch(a.a.NewFrame.Request({request:n})),this.onCloseModal()}},{key:"closeSideNav",value:function(){this.store$.dispatch(a.a.UpdateSideNavVisibility({visible:!1}))}},{key:"setSelectedFrameIdListener",value:function(){return this.store$.select(a.b.SelectSelectedFrame).pipe(Object(M.a)((function(n){return n?n.id:""})))}}]),n}(),Y=t.pb({encapsulation:0,styles:[[".sidenav-item[_ngcontent-%COMP%]{padding-bottom:.75rem}.sidenav-item-selected[_ngcontent-%COMP%]{text-decoration:underline;font-weight:700;font-style:italic}.layout[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100vh}.layout[_ngcontent-%COMP%]   .component-layout[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;overflow:hidden}.layout[_ngcontent-%COMP%]   .component-layout[_ngcontent-%COMP%]   .sidenav-space[_ngcontent-%COMP%]{-webkit-box-flex:3;flex:3}.layout[_ngcontent-%COMP%]   .component-layout[_ngcontent-%COMP%]   .frame-space[_ngcontent-%COMP%]{-webkit-box-flex:7;flex:7;overflow:auto}@media (max-width:767px){.mobile-sidenav[_ngcontent-%COMP%]{display:block}.fixed-sidenav[_ngcontent-%COMP%]{display:none}}@media (min-width:768px){.mobile-sidenav[_ngcontent-%COMP%]{display:none}.fixed-sidenav[_ngcontent-%COMP%]{display:block}}"]],data:{}});function Z(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,5,"span",[["class","clickable sidenav-item"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onFrameSelect(n.context.$implicit)&&t),t}),null,null)),t.Fb(512,null,o.t,o.u,[t.q,t.r,t.k,t.B]),t.qb(2,278528,null,0,o.i,[o.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t.Db(131072,o.b,[t.h]),t.Eb(4,{"sidenav-item-selected":0}),(n()(),t.Ib(5,null,[" "," "]))],(function(n,l){var e=l.component,i=n(l,4,0,t.Jb(l,2,1,t.Cb(l,3).transform(e.selectedFrameId$))===l.context.$implicit.frameId);n(l,2,0,"clickable sidenav-item",i)}),(function(n,l){n(l,5,0,l.context.$implicit.name)}))}function Q(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,6,"app-sidenav",[["class","sidenav-space mobile-sidenav"]],null,null,null,d,s)),t.qb(1,114688,null,0,r,[c.o],null,null),(n()(),t.rb(2,0,null,0,1,"span",[["class","clickable sidenav-item"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openCreateFrame()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["+ Create New Frame"])),(n()(),t.gb(16777216,null,0,2,null,Z)),t.qb(5,278528,null,0,o.j,[t.N,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),t.Db(131072,o.b,[t.h])],(function(n,l){var e=l.component;n(l,1,0),n(l,5,0,t.Jb(l,5,0,t.Cb(l,6).transform(e.user$)).frames)}),null)}function nn(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,5,"span",[["class","clickable sidenav-item"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onFrameSelect(n.context.$implicit)&&t),t}),null,null)),t.Fb(512,null,o.t,o.u,[t.q,t.r,t.k,t.B]),t.qb(2,278528,null,0,o.i,[o.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t.Db(131072,o.b,[t.h]),t.Eb(4,{"sidenav-item-selected":0}),(n()(),t.Ib(5,null,[" "," "]))],(function(n,l){var e=l.component,i=n(l,4,0,t.Jb(l,2,1,t.Cb(l,3).transform(e.selectedFrameId$))===l.context.$implicit.frameId);n(l,2,0,"clickable sidenav-item",i)}),(function(n,l){n(l,5,0,l.context.$implicit.name)}))}function ln(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,1,"main-create-frame",[],null,[[null,"closeModal"],[null,"createFrame"]],(function(n,l,e){var t=!0,i=n.component;return"closeModal"===l&&(t=!1!==i.onCloseModal()&&t),"createFrame"===l&&(t=!1!==i.onCreateFrame(e)&&t),t}),f,p)),t.qb(1,114688,null,0,b,[],null,{closeModal:"closeModal",createFrame:"createFrame"})],(function(n,l){n(l,1,0)}),null)}function en(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,15,"div",[["class","layout"]],null,null,null,null,null)),(n()(),t.rb(1,0,null,null,1,"app-navbar",[],null,null,null,v,m)),t.qb(2,114688,null,0,g,[c.o],null,null),(n()(),t.rb(3,0,null,null,12,"div",[["class","component-layout"]],null,null,null,null,null)),(n()(),t.gb(16777216,null,null,2,null,Q)),t.qb(5,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null),t.Db(131072,o.b,[t.h]),(n()(),t.rb(7,0,null,null,6,"app-sidenav",[["class","sidenav-space fixed-sidenav"]],null,null,null,d,s)),t.qb(8,114688,null,0,r,[c.o],null,null),(n()(),t.rb(9,0,null,0,1,"span",[["class","clickable sidenav-item"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.openCreateFrame()&&t),t}),null,null)),(n()(),t.Ib(-1,null,["+ Create New Frame"])),(n()(),t.gb(16777216,null,0,2,null,nn)),t.qb(12,278528,null,0,o.j,[t.N,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),t.Db(131072,o.b,[t.h]),(n()(),t.rb(14,0,null,null,1,"main-frame",[["class","frame-space"]],null,null,null,W,E)),t.qb(15,114688,null,0,K,[c.o],null,null),(n()(),t.gb(16777216,null,null,1,null,ln)),t.qb(17,16384,null,0,o.k,[t.N,t.J],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0),n(l,5,0,t.Jb(l,5,0,t.Cb(l,6).transform(e.showSidenav$))),n(l,8,0),n(l,12,0,t.Jb(l,12,0,t.Cb(l,13).transform(e.user$)).frames),n(l,15,0),n(l,17,0,e.showCreateFrameModal)}),null)}var tn=t.nb("app-entry",X,(function(n){return t.Kb(0,[(n()(),t.rb(0,0,null,null,1,"app-entry",[],null,null,null,en,Y)),t.qb(1,114688,null,0,X,[c.o],null,null)],(function(n,l){n(l,1,0)}),null)}),{},{},[]),un=e("LRne"),on=e("itXk"),an=e("5+tZ"),rn=e("SxV6"),cn=e("CqXF"),sn=e("p26r"),dn=function(){function n(l,e,t){_classCallCheck(this,n),this.authenticationService=l,this.router=e,this.store$=t}return _createClass(n,[{key:"canActivate",value:function(n,l){var e=this;return this.authenticationService.userIsSignedIn().pipe(Object(an.a)((function(n){return n?e.ensureUserDataIsInStore():Object(un.a)(e.router.parseUrl(sn.a.authentication))})))}},{key:"ensureUserDataIsInStore",value:function(){var n=this.store$.pipe(Object(c.D)(h.b.SelectAuthenticationUser)),l=this.store$.pipe(Object(c.D)(h.b.SelectLoginErrorMessage));return Object(on.a)(n,l).pipe(this.fetchUserIfNull(),Object(rn.a)((function(n){var l=_slicedToArray(n,2),e=l[0],t=l[1];return null!==e||""!==t})),Object(cn.a)(!0))}},{key:"fetchUserIfNull",value:function(){var n=this;return Object(_.a)((function(l){var e=_slicedToArray(l,2),t=e[0],i=e[1];null===t&&""===i&&n.store$.dispatch(h.a.GetUserDataFromSignedInUser.Request({request:null}))}))}}]),n}(),bn=e("jL29"),pn=e("iInd"),fn=e("lf9s"),hn=e("Xr7G"),gn=function n(){_classCallCheck(this,n)},mn=function n(){_classCallCheck(this,n)};e.d(l,"MainModuleNgFactory",(function(){return vn}));var vn=t.ob(i,[],(function(n){return t.zb([t.Ab(512,t.j,t.Z,[[8,[u.a,tn]],[3,t.j],t.v]),t.Ab(4608,o.m,o.l,[t.s,[2,o.y]]),t.Ab(4608,dn,dn,[bn.a,pn.k,c.o]),t.Ab(4608,fn.a,fn.a,[hn.a]),t.Ab(1073742336,o.c,o.c,[]),t.Ab(1073742336,pn.l,pn.l,[[2,pn.q],[2,pn.k]]),t.Ab(1073742336,gn,gn,[]),t.Ab(1073742336,N,N,[]),t.Ab(1073742336,mn,mn,[]),t.Ab(1073742336,i,i,[]),t.Ab(1024,pn.i,(function(){return[[{path:"",component:X,canActivate:[dn]}]]}),[])])}))}}]);