(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{XpXM:function(e,t,n){"use strict";n.r(t),n.d(t,"MainModule",function(){return Pe});var i=n("ofXK"),o=n("tyNb"),a=n("zp1y"),s=n("vkgz"),r=n("IzEk"),c=n("lJxs"),l=n("RLuz"),d=n("mnDg"),b=n("fXoL"),p=n("l7P3"),m=n("wHSu"),u=n("6NWb");let g=(()=>{class e{constructor(e){this.store$=e,this.faBars=m.a,this.faUserCircle=m.d}ngOnInit(){}onLogout(){this.store$.dispatch(l.a.SignOutUser())}openSideNav(){this.store$.dispatch(d.a.UpdateSideNavVisibility({visible:!0}))}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(p.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["app-navbar"]],decls:13,vars:2,consts:[[1,"layout"],[1,"menu-button","clickable",3,"click"],[3,"icon"],[1,"filler"],[1,"nav-title"],[1,"account","dropdown"],[1,"clickable"],[1,"dropdown-content"],[1,"clickable",3,"click"]],template:function(e,t){1&e&&(b.Lb(0,"div",0),b.Lb(1,"span",1),b.Sb("click",function(){return t.openSideNav()}),b.Jb(2,"fa-icon",2),b.Kb(),b.Jb(3,"span",3),b.Lb(4,"span",4),b.pc(5,"Launchpad Frame"),b.Kb(),b.Lb(6,"div",5),b.Lb(7,"span",6),b.Jb(8,"fa-icon",2),b.pc(9,"Account"),b.Kb(),b.Lb(10,"div",7),b.Lb(11,"span",8),b.Sb("click",function(){return t.onLogout()}),b.pc(12,"Logout"),b.Kb(),b.Kb(),b.Kb(),b.Kb()),2&e&&(b.yb(2),b.bc("icon",t.faBars),b.yb(6),b.bc("icon",t.faUserCircle))},directives:[u.a],styles:[".layout[_ngcontent-%COMP%]{display:flex;color:#f5f0f6;padding:.75rem;background-color:#2b4162;z-index:1000;justify-content:space-between;box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}@media (max-width:767px){.account[_ngcontent-%COMP%], .menu-button[_ngcontent-%COMP%]{display:block;flex:1}.account[_ngcontent-%COMP%]{text-align:right}.filler[_ngcontent-%COMP%]{display:none}}@media (min-width:768px){.filler[_ngcontent-%COMP%]{display:block}.menu-button[_ngcontent-%COMP%]{display:none}}.account[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{padding-right:.35rem}.dropdown-content[_ngcontent-%COMP%]{display:none;position:absolute;background-color:#f5f0f6;color:#2b4162;box-shadow:0 8px 16px 0 rgba(0,0,0,.2);z-index:1;padding:1rem;right:5px}.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{display:block}"]}),e})();var h=n("twK/");const f=["*"];let v=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Cb({type:e,selectors:[["app-sidenav"]],ngContentSelectors:f,decls:2,vars:0,consts:[[1,"sidenav"]],template:function(e,t){1&e&&(b.ac(),b.Lb(0,"div",0),b.Zb(1),b.Kb())},styles:[".sidenav[_ngcontent-%COMP%]{height:100%;z-index:1000;background-color:#2b624c;color:#f5f0f6;box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}@media (max-width:767px){.sidenav[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:95%}}"]}),e})();const x=function(e){return{"sidenav-item-selected":e}};function C(e,t){if(1&e){const e=b.Mb();b.Lb(0,"div",12),b.Sb("click",function(){b.hc(e);const n=t.$implicit;return b.Wb(2).onFrameSelect(n)}),b.Lb(1,"span"),b.pc(2),b.Kb(),b.Kb()}if(2&e){const e=t.$implicit,n=b.Wb(2);b.bc("ngClass",b.cc(2,x,n.selectedFrameId===e.frameId)),b.yb(2),b.qc(e.name)}}function y(e,t){if(1&e){const e=b.Mb();b.Lb(0,"app-sidenav",10),b.Lb(1,"div",2),b.Lb(2,"div",3),b.Lb(3,"span"),b.pc(4,"Select a Frame"),b.Kb(),b.Lb(5,"span",11),b.Sb("click",function(){return b.hc(e),b.Wb().closeSidenav()}),b.Jb(6,"fa-icon",8),b.Kb(),b.Kb(),b.Lb(7,"div",4),b.nc(8,C,3,4,"div",5),b.Kb(),b.Lb(9,"div",6),b.Lb(10,"div",7),b.Sb("click",function(){return b.hc(e),b.Wb().onOpenCreateFrame()}),b.Jb(11,"fa-icon",8),b.pc(12,"Create"),b.Kb(),b.Lb(13,"div",9),b.Sb("click",function(){return b.hc(e),b.Wb().onOpenJoinFrame()}),b.Jb(14,"fa-icon",8),b.pc(15,"Join"),b.Kb(),b.Kb(),b.Kb(),b.Kb()}if(2&e){const e=b.Wb();b.yb(6),b.bc("icon",e.faTimes),b.yb(2),b.bc("ngForOf",e.userFrames),b.yb(3),b.bc("icon",e.faPlusSquare),b.yb(3),b.bc("icon",e.faPlusSquare)}}function O(e,t){if(1&e){const e=b.Mb();b.Lb(0,"div",12),b.Sb("click",function(){b.hc(e);const n=t.$implicit;return b.Wb().onFrameSelect(n)}),b.Lb(1,"span"),b.pc(2),b.Kb(),b.Kb()}if(2&e){const e=t.$implicit,n=b.Wb();b.bc("ngClass",b.cc(2,x,n.selectedFrameId===e.frameId)),b.yb(2),b.qc(e.name)}}let w=(()=>{class e{constructor(e){this.store$=e,this.openCreateFrame=new b.n,this.openJoinFrame=new b.n,this.frameSelect=new b.n,this.showSidenav$=this.store$.select(d.c.SelectSideNavVisibility),this.faPlusSquare=h.c,this.faTimes=m.c}ngOnInit(){}onOpenCreateFrame(){this.openCreateFrame.emit(!0)}onOpenJoinFrame(){this.openJoinFrame.emit(!0)}onFrameSelect(e){this.frameSelect.emit(e)}closeSidenav(){this.store$.dispatch(d.a.UpdateSideNavVisibility({visible:!1}))}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(p.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["main-frame-sidenav"]],inputs:{userFrames:"userFrames",selectedFrameId:"selectedFrameId"},outputs:{openCreateFrame:"openCreateFrame",openJoinFrame:"openJoinFrame",frameSelect:"frameSelect"},decls:16,vars:6,consts:[["class","mobile-sidenav",4,"ngIf"],[1,"fixed-sidenav"],[1,"layout"],[1,"title-section"],[1,"content-section"],["class","clickable sidenav-item",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"actions-section"],[1,"clickable","create",3,"click"],[3,"icon"],[1,"clickable","join",3,"click"],[1,"mobile-sidenav"],[1,"close-button","clickable",3,"click"],[1,"clickable","sidenav-item",3,"ngClass","click"]],template:function(e,t){1&e&&(b.nc(0,y,16,4,"app-sidenav",0),b.Xb(1,"async"),b.Lb(2,"app-sidenav",1),b.Lb(3,"div",2),b.Lb(4,"div",3),b.Lb(5,"span"),b.pc(6,"Select a Frame"),b.Kb(),b.Kb(),b.Lb(7,"div",4),b.nc(8,O,3,4,"div",5),b.Kb(),b.Lb(9,"div",6),b.Lb(10,"div",7),b.Sb("click",function(){return t.onOpenCreateFrame()}),b.Jb(11,"fa-icon",8),b.pc(12,"Create"),b.Kb(),b.Lb(13,"div",9),b.Sb("click",function(){return t.onOpenJoinFrame()}),b.Jb(14,"fa-icon",8),b.pc(15,"Join"),b.Kb(),b.Kb(),b.Kb(),b.Kb()),2&e&&(b.bc("ngIf",b.Yb(1,4,t.showSidenav$)),b.yb(8),b.bc("ngForOf",t.userFrames),b.yb(3),b.bc("icon",t.faPlusSquare),b.yb(3),b.bc("icon",t.faPlusSquare))},directives:[i.k,v,i.j,u.a,i.i],pipes:[i.b],styles:['.layout[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}.title-section[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:1.5rem;padding:1rem;border-bottom:1px solid #f5f0f6}.content-section[_ngcontent-%COMP%]{flex-grow:1;overflow:auto;display:flex;flex-direction:column;font-size:1.25rem}.sidenav-item[_ngcontent-%COMP%]{padding:.5rem}.sidenav-item-selected[_ngcontent-%COMP%]{font-weight:700;background-color:#6a9181;position:relative}.sidenav-item-selected[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:after{content:"";position:absolute;right:0;top:50%;transform:translateY(-50%);width:0;height:0;border-left-style:solid;border-left-width:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #2b624c}.actions-section[_ngcontent-%COMP%]{display:flex;border-top:1px solid #f5f0f6}.actions-section[_ngcontent-%COMP%]   .create[_ngcontent-%COMP%]{border-right:1px solid #f5f0f6}.actions-section[_ngcontent-%COMP%]   .create[_ngcontent-%COMP%], .actions-section[_ngcontent-%COMP%]   .join[_ngcontent-%COMP%]{padding:.5rem;text-align:center;flex:1}.actions-section[_ngcontent-%COMP%]   fa-icon[_ngcontent-%COMP%]{padding-right:.5rem}@media (max-width:767px){.mobile-sidenav[_ngcontent-%COMP%]{display:block}.fixed-sidenav[_ngcontent-%COMP%]{display:none}}@media (min-width:768px){.mobile-sidenav[_ngcontent-%COMP%]{display:none}.fixed-sidenav[_ngcontent-%COMP%]{display:block;height:100%;position:relative}}']}),e})();var M=n("itXk"),_=n("GyhO"),P=n("HDdC"),F=n("D0XW"),I=n("Y7HM");function L(e=0,t=F.a){return(!Object(I.a)(e)||e<0)&&(e=0),t&&"function"==typeof t.schedule||(t=F.a),new P.a(n=>(n.add(t.schedule(S,e,{subscriber:n,counter:0,period:e})),n))}function S(e){const{subscriber:t,counter:n,period:i}=e;t.next(n),this.schedule({subscriber:t,counter:n+1,period:i},i)}var k=n("xgIS"),K=n("pLZG"),j=n("JYkl"),z=n("jhN1");function $(e,t){if(1&e){const e=b.Mb();b.Lb(0,"ngx-dropzone-remove-badge",1),b.Sb("click",function(t){return b.hc(e),b.Wb()._remove(t)}),b.Kb()}}const D=[[["ngx-dropzone-label"]]],J=["ngx-dropzone-label"],E=["fileInput"];function A(e,t){1&e&&b.Zb(0,2,["*ngIf","!_hasPreviews"])}const W=[[["ngx-dropzone-preview"]],"*",[["ngx-dropzone-label"]]],N=["ngx-dropzone-preview","*","ngx-dropzone-label"];let q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275dir=b.Db({type:e,selectors:[["ngx-dropzone-label"]]}),e})();function T(e){return null!=e&&""+e!="false"}const V={BACKSPACE:8,DELETE:46};V[V.BACKSPACE]="BACKSPACE",V[V.DELETE]="DELETE";let U=(()=>{class e{constructor(e){this.sanitizer=e,this._removable=!1,this.removed=new b.n,this.tabIndex=0}get removable(){return this._removable}set removable(e){this._removable=T(e)}keyEvent(e){switch(e.keyCode){case V.BACKSPACE:case V.DELETE:this.remove()}}get hostStyle(){return this.sanitizer.bypassSecurityTrustStyle("\n\t\t\tdisplay: flex;\n\t\t\theight: 140px;\n\t\t\tmin-height: 140px;\n\t\t\tmin-width: 180px;\n\t\t\tmax-width: 180px;\n\t\t\tjustify-content: center;\n\t\t\talign-items: center;\n\t\t\tpadding: 0 20px;\n\t\t\tmargin: 10px;\n\t\t\tborder-radius: 5px;\n\t\t\tposition: relative;\n\t\t")}_remove(e){e.stopPropagation(),this.remove()}remove(){this._removable&&this.removed.next(this.file)}readFile(){return Object(j.b)(this,void 0,void 0,function*(){return new Promise((e,t)=>{const n=new FileReader;if(n.onload=t=>{e(t.target.result)},n.onerror=e=>{console.error(`FileReader failed on file ${this.file.name}.`),t(e)},!this.file)return t("No file to read. Please provide a file using the [file] Input property.");n.readAsDataURL(this.file)})})}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(z.b))},e.\u0275cmp=b.Cb({type:e,selectors:[["ngx-dropzone-preview"]],hostVars:3,hostBindings:function(e,t){1&e&&b.Sb("keyup",function(e){return t.keyEvent(e)}),2&e&&(b.Ob("tabindex",t.tabIndex),b.lc(t.hostStyle))},inputs:{removable:"removable",file:"file"},outputs:{removed:"removed"},ngContentSelectors:J,decls:2,vars:1,consts:[[3,"click",4,"ngIf"],[3,"click"]],template:function(e,t){1&e&&(b.ac(D),b.Zb(0),b.nc(1,$,1,0,"ngx-dropzone-remove-badge",0)),2&e&&(b.yb(1),b.bc("ngIf",t.removable))},directives:function(){return[i.k,X]},styles:["[_nghost-%COMP%]{background-image:linear-gradient(to top,#ededed,#efefef,#f1f1f1,#f4f4f4,#f6f6f6)}[_nghost-%COMP%]:focus, [_nghost-%COMP%]:hover{background-image:linear-gradient(to top,#e3e3e3,#ebeaea,#e8e7e7,#ebeaea,#f4f4f4);outline:0}[_nghost-%COMP%]:focus   ngx-dropzone-remove-badge[_ngcontent-%COMP%], [_nghost-%COMP%]:hover   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:1}[_nghost-%COMP%]   ngx-dropzone-remove-badge[_ngcontent-%COMP%]{opacity:0}[_nghost-%COMP%]     ngx-dropzone-label{overflow-wrap:break-word}"]}),e})(),R=(()=>{class e{parseFileList(e,t,n,i){const o=[],a=[];for(let s=0;s<e.length;s++){const r=e.item(s);this.isAccepted(r,t)?n&&r.size>n?this.rejectFile(a,r,"size"):!i&&o.length>=1?this.rejectFile(a,r,"no_multiple"):o.push(r):this.rejectFile(a,r,"type")}return{addedFiles:o,rejectedFiles:a}}isAccepted(e,t){if("*"===t)return!0;const n=t.split(",").map(e=>e.toLowerCase().trim()),i=e.type.toLowerCase(),o=e.name.toLowerCase();return!!n.find(e=>e.endsWith("/*")?i.split("/")[0]===e.split("/")[0]:e.startsWith(".")?o.endsWith(e):e==i)}rejectFile(e,t,n){const i=t;i.reason=n,e.push(i)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=b.Eb({token:e,factory:e.\u0275fac}),e})(),B=(()=>{class e{constructor(e){this.service=e,this.change=new b.n,this.accept="*",this._disabled=!1,this._multiple=!0,this._maxFileSize=void 0,this._expandable=!1,this._disableClick=!1,this._isHovered=!1}get _hasPreviews(){return!!this._previewChildren.length}get disabled(){return this._disabled}set disabled(e){this._disabled=T(e),this._isHovered&&(this._isHovered=!1)}get multiple(){return this._multiple}set multiple(e){this._multiple=T(e)}get maxFileSize(){return this._maxFileSize}set maxFileSize(e){this._maxFileSize=function(e){return isNaN(parseFloat(e))||isNaN(Number(e))?null:Number(e)}(e)}get expandable(){return this._expandable}set expandable(e){this._expandable=T(e)}get disableClick(){return this._disableClick}set disableClick(e){this._disableClick=T(e)}_onClick(){this.disableClick||this.showFileSelector()}_onDragOver(e){this.disabled||(this.preventDefault(e),this._isHovered=!0)}_onDragLeave(){this._isHovered=!1}_onDrop(e){this.disabled||(this.preventDefault(e),this._isHovered=!1,this.handleFileDrop(e.dataTransfer.files))}showFileSelector(){this.disabled||this._fileInput.nativeElement.click()}_onFilesSelected(e){this.handleFileDrop(e.target.files),this._fileInput.nativeElement.value="",this.preventDefault(e)}handleFileDrop(e){const t=this.service.parseFileList(e,this.accept,this.maxFileSize,this.multiple);this.change.next({addedFiles:t.addedFiles,rejectedFiles:t.rejectedFiles,source:this})}preventDefault(e){e.preventDefault(),e.stopPropagation()}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(R,2))},e.\u0275cmp=b.Cb({type:e,selectors:[["ngx-dropzone"],["","ngx-dropzone",""]],contentQueries:function(e,t,n){if(1&e&&b.Bb(n,U,!0),2&e){let e;b.ec(e=b.Tb())&&(t._previewChildren=e)}},viewQuery:function(e,t){if(1&e&&b.sc(E,!0),2&e){let e;b.ec(e=b.Tb())&&(t._fileInput=e.first)}},hostVars:8,hostBindings:function(e,t){1&e&&b.Sb("click",function(){return t._onClick()})("dragover",function(e){return t._onDragOver(e)})("dragleave",function(){return t._onDragLeave()})("drop",function(e){return t._onDrop(e)}),2&e&&b.Ab("ngx-dz-hovered",t._isHovered)("ngx-dz-disabled",t.disabled)("expandable",t.expandable)("unclickable",t.disableClick)},inputs:{accept:"accept",disabled:"disabled",multiple:"multiple",maxFileSize:"maxFileSize",expandable:"expandable",disableClick:"disableClick",id:"id",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],ariaDescribedBy:["aria-describedby","ariaDescribedBy"]},outputs:{change:"change"},features:[b.xb([R])],ngContentSelectors:N,decls:5,vars:8,consts:[["type","file",3,"id","multiple","accept","disabled","change"],["fileInput",""],[4,"ngIf"]],template:function(e,t){1&e&&(b.ac(W),b.Lb(0,"input",0,1),b.Sb("change",function(e){return t._onFilesSelected(e)}),b.Kb(),b.nc(2,A,1,0,"ng-content",2),b.Zb(3),b.Zb(4,1)),2&e&&(b.bc("id",t.id)("multiple",t.multiple)("accept",t.accept)("disabled",t.disabled),b.zb("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledby)("aria-describedby",t.ariaDescribedBy),b.yb(2),b.bc("ngIf",!t._hasPreviews))},directives:[i.k],styles:["[_nghost-%COMP%]{display:flex;align-items:center;height:180px;background:#fff;cursor:pointer;color:#717386;border:2px dashed #717386;border-radius:5px;font-size:16px;overflow-x:auto}.ngx-dz-hovered[_nghost-%COMP%]{border-style:solid}.ngx-dz-disabled[_nghost-%COMP%]{opacity:.5;cursor:no-drop;pointer-events:none}.expandable[_nghost-%COMP%]{overflow:hidden;height:unset;min-height:180px;flex-wrap:wrap}.unclickable[_nghost-%COMP%]{cursor:default}[_nghost-%COMP%]     ngx-dropzone-label{text-align:center;z-index:10;margin:10px auto}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:.1px;height:.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus +   ngx-dropzone-label{outline:#000 dotted 1px;outline:-webkit-focus-ring-color auto 5px}"]}),e})(),X=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Cb({type:e,selectors:[["ngx-dropzone-remove-badge"]],decls:3,vars:0,consts:[["x1","0","y1","0","x2","10","y2","10"],["x1","0","y1","10","x2","10","y2","0"]],template:function(e,t){1&e&&(b.Vb(),b.Lb(0,"svg"),b.Jb(1,"line",0),b.Jb(2,"line",1),b.Kb())},styles:["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;height:22px;width:22px;position:absolute;top:5px;right:5px;border-radius:50%;background:#bbb;color:#333;cursor:pointer}[_nghost-%COMP%]:hover{background:#aeaeae}[_nghost-%COMP%] > svg[_ngcontent-%COMP%]{height:10px;width:10px}[_nghost-%COMP%] > svg[_ngcontent-%COMP%] > line[_ngcontent-%COMP%]{stroke-width:2px;stroke:#fff}"]}),e})(),G=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(t){return new(t||e)},imports:[[i.c]]}),e})(),H=(()=>{class e{constructor(e){this.image=e,this.onIntersect=([e],t)=>{e.isIntersecting&&(e.target.src=this.source,t.unobserve(this.image.nativeElement),t.disconnect())}}ngOnInit(){this.registerIntersectionObserver()}registerIntersectionObserver(){this._intersectionObserver=new IntersectionObserver(this.onIntersect,{root:null,rootMargin:"175px",threshold:0}),this._intersectionObserver.observe(this.image.nativeElement)}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(b.l))},e.\u0275dir=b.Db({type:e,selectors:[["","mainImageLazyLoad",""]],inputs:{source:["mainImageLazyLoad","source"]}}),e})();var Y=n("Kqap"),Z=n("JX91");function Q(e,t){if(1&e&&(b.Lb(0,"div",1),b.Jb(1,"img",2),b.Lb(2,"div",3),b.pc(3),b.Kb(),b.Lb(4,"div",4),b.pc(5),b.Kb(),b.Kb()),2&e){const e=t.ngIf,n=b.Wb();b.yb(1),b.bc("src",e.downloadUrl,b.jc),b.yb(2),b.rc(" From: ",e.username," "),b.yb(2),b.rc(" Access Code: ",n.accessCode," ")}}let ee=(()=>{class e{constructor(e){this.store$=e,this.IMAGE_DISPLAY_DURATION=7500,this.currentImages$=this.setCurrentImagesListener(),this.currentImageIndex$=this.setCurrentImageIndexGenerator(),this.liveImage$=this.setLiveImageGenerator(),this.images=[],this.exit=new b.n}onEscapeHandler(e){this.exit.emit(!0)}ngOnInit(){this.store$.dispatch(d.a.LiveImageListenerRequest())}ngOnDestroy(){this.store$.dispatch(d.a.LiveImageListenerStopRequest())}setCurrentImagesListener(){return this.store$.select(d.c.SelectFrameImages).pipe(Object(Y.a)((e,t)=>{const n=t.filter(t=>!e.includes(t));return[...e,...n]},[]))}setCurrentImageIndexGenerator(){return L(this.IMAGE_DISPLAY_DURATION).pipe(Object(Z.a)(0),Object(a.a)(this.currentImages$),Object(c.a)(([e,t])=>t),Object(Y.a)((e,t)=>(e+1)%t.length,0))}setLiveImageGenerator(){return this.currentImageIndex$.pipe(Object(a.a)(this.currentImages$),Object(c.a)(([e,t])=>t[e]))}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(p.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["main-live-view"]],hostBindings:function(e,t){1&e&&b.Sb("keydown.escape",function(e){return t.onEscapeHandler(e)},!1,b.gc)},inputs:{accessCode:"accessCode"},outputs:{exit:"exit"},decls:2,vars:3,consts:[["class","layout",4,"ngIf"],[1,"layout"],[3,"src"],[1,"username-overlay"],[1,"access-code-overlay"]],template:function(e,t){1&e&&(b.nc(0,Q,6,3,"div",0),b.Xb(1,"async")),2&e&&b.bc("ngIf",b.Yb(1,1,t.liveImage$))},directives:[i.k],pipes:[i.b],styles:[".layout[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#000;position:fixed;top:0;left:0;z-index:100;display:flex;justify-content:center;align-items:center}img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.username-overlay[_ngcontent-%COMP%]{top:20px;left:20px}.access-code-overlay[_ngcontent-%COMP%], .username-overlay[_ngcontent-%COMP%]{position:fixed;color:#fff;padding:.5rem;background-color:#000;opacity:.75}.access-code-overlay[_ngcontent-%COMP%]{bottom:20px;right:20px}"]}),e})();function te(e,t){if(1&e&&(b.Lb(0,"div",21),b.Jb(1,"img",22),b.Kb()),2&e){const e=t.$implicit;b.mc("height",e.displayDimensions.height+"px")("width",e.displayDimensions.width+"px"),b.yb(1),b.bc("mainImageLazyLoad",e.image.downloadUrl)}}function ne(e,t){if(1&e&&(b.Lb(0,"div",17),b.Lb(1,"span",18),b.pc(2),b.Kb(),b.Lb(3,"div",19),b.nc(4,te,2,5,"div",20),b.Kb(),b.Kb()),2&e){const e=t.$implicit;b.yb(2),b.rc("",e.displayKey,"'s Images"),b.yb(2),b.bc("ngForOf",e.images)}}function ie(e,t){if(1&e){const e=b.Mb();b.Lb(0,"main-live-view",23),b.Sb("exit",function(){return b.hc(e),b.Wb(2).onExitLiveView()}),b.Kb()}if(2&e){const e=b.Wb().ngIf;b.bc("accessCode",e.accessToken.token)}}function oe(e,t){if(1&e){const e=b.Mb();b.Lb(0,"div",3),b.Lb(1,"div",4),b.Lb(2,"span",5),b.pc(3),b.Kb(),b.Lb(4,"span",6),b.Sb("click",function(){return b.hc(e),b.Wb().onShowLiveView()}),b.pc(5,"Live Mode"),b.Kb(),b.Kb(),b.Lb(6,"div",7),b.Lb(7,"span",8),b.pc(8),b.Kb(),b.Kb(),b.Lb(9,"div",9),b.Lb(10,"ngx-dropzone",10),b.Sb("change",function(t){return b.hc(e),b.Wb().onFilesAdded(t.addedFiles)}),b.Lb(11,"ngx-dropzone-label"),b.pc(12,"Drag Files or Click to Browse"),b.Kb(),b.Kb(),b.Lb(13,"div",11),b.Lb(14,"input",12),b.Sb("change",function(t){return b.hc(e),b.Wb().onFilesAddedMobile(t.target.files)}),b.Kb(),b.Lb(15,"button",13),b.Sb("click",function(){return b.hc(e),b.Wb().onFabClick()}),b.Jb(16,"fa-icon",14),b.Kb(),b.Kb(),b.Kb(),b.nc(17,ne,5,2,"div",15),b.Xb(18,"async"),b.nc(19,ie,1,1,"main-live-view",16),b.Kb()}if(2&e){const e=t.ngIf,n=b.Wb();b.yb(3),b.qc(e.name),b.yb(5),b.rc("- Access Code: ",e.accessToken.token,""),b.yb(6),b.bc("hidden",!0),b.yb(2),b.bc("icon",n.faCamera),b.yb(1),b.bc("ngForOf",b.Yb(18,6,n.groupedImages$)),b.yb(2),b.bc("ngIf",n.showLiveView)}}function ae(e,t){1&e&&b.Jb(0,"div",24),2&e&&b.mc("width",t.ngIf,"%")}function se(e,t){1&e&&b.pc(0," NO FRAME SELECTED!\n")}let re=(()=>{class e{constructor(e){this.store$=e,this.selectedFrame$=this.store$.select(d.c.SelectSelectedFrame),this.uploadPercentage$=this.store$.select(d.c.SelectUploadPercentage),this.groupedImages$=this.setGroupedImagesSelector(),this.showLiveView=!1,this.faCamera=m.b}ngOnInit(){}ngAfterViewInit(){}onFilesAdded(e){this.store$.dispatch(d.a.UploadImagesRequest({Images:e}))}onFilesAddedMobile(e){this.onFilesAdded(Array.from(e))}onFabClick(){document.getElementById("mobileUpload").click()}onShowLiveView(){this.showLiveView=!0}onExitLiveView(){this.showLiveView=!1}setGroupedImagesSelector(){const e=this.getImageViewSizeWatcher();return Object(M.b)(this.selectedFrame$,e).pipe(Object(c.a)(([e,t])=>{const n=[];return[...e.images].map(e=>{const t=Object.assign({},e);return t.dimensions=void 0!==t.dimensions?t.dimensions:{width:500,height:500},t}).forEach(e=>{const t=n.findIndex(t=>t.displayKey===e.username);t>=0?n[t].images.push({image:e,displayDimensions:e.dimensions}):n.push({displayKey:e.username,images:[{image:e,displayDimensions:e.dimensions}]})}),n.length>0?this.resolveBestDimensions(n,t):n}))}getImageViewSizeWatcher(){const e=this.getInitialImageViewWatcher(),t=this.getResizeListener();return Object(_.a)(e,t)}getInitialImageViewWatcher(){return L(100).pipe(Object(K.a)(()=>null!==document.querySelector("#test")),Object(r.a)(1),Object(c.a)(this.getImageViewWidth))}getResizeListener(){return Object(k.a)(window,"resize").pipe(Object(c.a)(this.getImageViewWidth))}resolveBestDimensions(e,t){const n=e.reduce((e,t)=>[...e,...t.images],[]).sort((e,t)=>e.image.dimensions.width-t.image.dimensions.width),i=n[n.length-1],o=t/this.resolveNumberOfImagesPerRow(t)*(i.image.dimensions.height/i.image.dimensions.width);return[...e].map(e=>{const t=Object.assign({},e);return t.images=t.images.map(e=>{const t=Object.assign(Object.assign({},e),{displayDimensions:Object.assign({},e.displayDimensions)});return t.displayDimensions.height=o,t.displayDimensions.width=o*(t.image.dimensions.width/t.image.dimensions.height),t}),t})}resolveNumberOfImagesPerRow(e){return e<=490?1:e<=735?2:4}getImageViewWidth(){const e=window.getComputedStyle(document.querySelector("#test")).width;return parseInt(e.substr(0,e.length-2),10)}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(p.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["main-frame"]],decls:6,vars:7,consts:[["class","layout","id","test",4,"ngIf","ngIfElse"],["class","upload-progress",3,"width",4,"ngIf"],["noFrame",""],["id","test",1,"layout"],[1,"title"],[1,"frame-name"],[1,"live-view","clickable",3,"click"],[1,"subtitle"],[1,"access-code"],[1,"image-upload-section"],[1,"image-upload-zone",3,"change"],[1,"image-upload-camera"],["id","mobileUpload","type","file","accept","image/*","capture","camera",3,"hidden","change"],[1,"fab-image-capture",3,"click"],[3,"icon"],["class","group-image-display-section",4,"ngFor","ngForOf"],[3,"accessCode","exit",4,"ngIf"],[1,"group-image-display-section"],[1,"group-title"],[1,"image-section"],["class","image-container",3,"height","width",4,"ngFor","ngForOf"],[1,"image-container"],[1,"image",3,"mainImageLazyLoad"],[3,"accessCode","exit"],[1,"upload-progress"]],template:function(e,t){if(1&e&&(b.nc(0,oe,20,8,"div",0),b.Xb(1,"async"),b.nc(2,ae,1,2,"div",1),b.Xb(3,"async"),b.nc(4,se,1,0,"ng-template",null,2,b.oc)),2&e){const e=b.fc(5);b.bc("ngIf",b.Yb(1,3,t.selectedFrame$))("ngIfElse",e),b.yb(2),b.bc("ngIf",b.Yb(3,5,t.uploadPercentage$))}},directives:[i.k,B,q,u.a,i.j,H,ee],pipes:[i.b],styles:[".layout[_ngcontent-%COMP%]{padding:1rem;display:flex;flex-direction:column}.title[_ngcontent-%COMP%]{padding-bottom:.5rem;display:flex;justify-content:space-between}.title[_ngcontent-%COMP%]   .frame-name[_ngcontent-%COMP%]{text-decoration:underline;font-size:1.5rem}.title[_ngcontent-%COMP%]   .live-view[_ngcontent-%COMP%]{align-self:center}.subtitle[_ngcontent-%COMP%]{display:flex}.subtitle[_ngcontent-%COMP%]   .access-code[_ngcontent-%COMP%]{padding-left:.75rem}.group-image-display-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:1rem}.group-image-display-section[_ngcontent-%COMP%]   .group-title[_ngcontent-%COMP%]{font-weight:700;padding-bottom:.5rem}.group-image-display-section[_ngcontent-%COMP%]   .image-section[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}.group-image-display-section[_ngcontent-%COMP%]   .image-section[_ngcontent-%COMP%]   .image-container[_ngcontent-%COMP%]{padding-bottom:.3rem}.group-image-display-section[_ngcontent-%COMP%]   .image-section[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{width:100%;height:100%}.image-upload-zone[_ngcontent-%COMP%]{display:flex;opacity:.75;height:100px}.image-upload-camera[_ngcontent-%COMP%]{display:none}@media (max-width:1023px){.image-upload-zone[_ngcontent-%COMP%]{display:none}.image-upload-camera[_ngcontent-%COMP%]{display:block}}.fab-image-capture[_ngcontent-%COMP%]{position:fixed;bottom:50px;right:50px;z-index:10;box-shadow:0 3px 6px rgba(0,0,0,.5);background-color:#624c2b;color:#f5f0f6;width:60px;height:60px;border-radius:100%;border:none;font-size:1.5rem}.upload-progress[_ngcontent-%COMP%]{background-color:#649742;height:10px;width:100%;position:fixed;bottom:0;left:0;z-index:2000}"]}),e})();const ce=["*"];let le=(()=>{class e{constructor(){this.closeModal=new b.n,this.faTimes=m.c}ngOnInit(){}onCloseModal(){this.closeModal.emit(!0)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Cb({type:e,selectors:[["app-modal"]],inputs:{title:"title"},outputs:{closeModal:"closeModal"},ngContentSelectors:ce,decls:9,vars:2,consts:[[1,"modal"],[1,"modal-content"],[1,"header"],[1,"clickable",3,"click"],[3,"icon"],[1,"header-seperator"]],template:function(e,t){1&e&&(b.ac(),b.Lb(0,"div",0),b.Lb(1,"div",1),b.Lb(2,"div",2),b.Lb(3,"span"),b.pc(4),b.Kb(),b.Lb(5,"span",3),b.Sb("click",function(){return t.onCloseModal()}),b.Jb(6,"fa-icon",4),b.Kb(),b.Kb(),b.Jb(7,"hr",5),b.Zb(8),b.Kb(),b.Kb()),2&e&&(b.yb(4),b.qc(t.title),b.yb(2),b.bc("icon",t.faTimes))},directives:[u.a],styles:[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#f5f0f6;margin:15% auto;padding:1rem;border:1px solid #888;width:80%}.header[_ngcontent-%COMP%]{font-size:1.5rem;display:flex;justify-content:space-between;padding-bottom:.25rem}hr.header-seperator[_ngcontent-%COMP%]{padding-bottom:.75rem;border-top:1px solid #000;border-left:none}.body[_ngcontent-%COMP%]{display:flex;flex-direction:column}.footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding-top:.75rem}.input-label[_ngcontent-%COMP%]{padding-bottom:.25rem}.error[_ngcontent-%COMP%]{color:#d8000c}@media (max-width:767px){.modal-content[_ngcontent-%COMP%]{width:80%}}@media (min-width:768px){.modal-content[_ngcontent-%COMP%]{width:50%}}@media (min-width:1024px){.modal-content[_ngcontent-%COMP%]{width:30%}}"]}),e})(),de=(()=>{class e{constructor(){this.closeModal=new b.n,this.createFrame=new b.n,this.errorText=""}ngOnInit(){}onCloseModal(){this.closeModal.emit(!0)}onCreateFrame(e){e&&""!==e?this.createFrame.emit(e):this.errorText="Must enter a name."}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Cb({type:e,selectors:[["main-create-frame"]],outputs:{closeModal:"closeModal",createFrame:"createFrame"},decls:11,vars:2,consts:[[3,"title","closeModal"],[1,"body"],[1,"input-label"],["type","text"],["frameName",""],[1,"error"],[1,"footer"],[1,"btn","btn-primary",3,"click"]],template:function(e,t){if(1&e){const e=b.Mb();b.Lb(0,"app-modal",0),b.Sb("closeModal",function(){return t.onCloseModal()}),b.Lb(1,"div",1),b.Lb(2,"span",2),b.pc(3,"Name:"),b.Kb(),b.Jb(4,"input",3,4),b.Lb(6,"span",5),b.pc(7),b.Kb(),b.Kb(),b.Lb(8,"div",6),b.Lb(9,"button",7),b.Sb("click",function(){b.hc(e);const n=b.fc(5);return t.onCreateFrame(n.value)}),b.pc(10,"CREATE"),b.Kb(),b.Kb(),b.Kb()}2&e&&(b.bc("title","Create a Frame"),b.yb(7),b.qc(t.errorText))},directives:[le],styles:[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#f5f0f6;margin:15% auto;padding:1rem;border:1px solid #888;width:80%}.header[_ngcontent-%COMP%]{font-size:1.5rem;display:flex;justify-content:space-between;padding-bottom:.25rem}hr.header-seperator[_ngcontent-%COMP%]{padding-bottom:.75rem;border-top:1px solid #000;border-left:none}.body[_ngcontent-%COMP%]{display:flex;flex-direction:column}.footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding-top:.75rem}.input-label[_ngcontent-%COMP%]{padding-bottom:.25rem}.error[_ngcontent-%COMP%]{color:#d8000c}@media (max-width:767px){.modal-content[_ngcontent-%COMP%]{width:80%}}@media (min-width:768px){.modal-content[_ngcontent-%COMP%]{width:50%}}@media (min-width:1024px){.modal-content[_ngcontent-%COMP%]{width:30%}}"]}),e})(),be=(()=>{class e{constructor(){this.closeModal=new b.n,this.joinFrame=new b.n,this.errorText=""}ngOnInit(){}onCloseModal(){this.closeModal.emit(!0)}onCreateFrame(e){e&&""!==e?6!==e.length?this.errorText="Value must have 6 characters/numbers.":this.joinFrame.emit(e):this.errorText="Must enter a value."}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Cb({type:e,selectors:[["main-join-frame"]],outputs:{closeModal:"closeModal",joinFrame:"joinFrame"},decls:11,vars:2,consts:[[3,"title","closeModal"],[1,"body"],[1,"input-label"],["type","text"],["accessKey",""],[1,"error"],[1,"footer"],[1,"btn","btn-primary",3,"click"]],template:function(e,t){if(1&e){const e=b.Mb();b.Lb(0,"app-modal",0),b.Sb("closeModal",function(){return t.onCloseModal()}),b.Lb(1,"div",1),b.Lb(2,"span",2),b.pc(3,"Access Key:"),b.Kb(),b.Jb(4,"input",3,4),b.Lb(6,"span",5),b.pc(7),b.Kb(),b.Kb(),b.Lb(8,"div",6),b.Lb(9,"button",7),b.Sb("click",function(){b.hc(e);const n=b.fc(5);return t.onCreateFrame(n.value)}),b.pc(10,"JOIN"),b.Kb(),b.Kb(),b.Kb()}2&e&&(b.bc("title","Join a Frame"),b.yb(7),b.qc(t.errorText))},directives:[le],styles:[".modal[_ngcontent-%COMP%]{position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#f5f0f6;margin:15% auto;padding:1rem;border:1px solid #888;width:80%}.header[_ngcontent-%COMP%]{font-size:1.5rem;display:flex;justify-content:space-between;padding-bottom:.25rem}hr.header-seperator[_ngcontent-%COMP%]{padding-bottom:.75rem;border-top:1px solid #000;border-left:none}.body[_ngcontent-%COMP%]{display:flex;flex-direction:column}.footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding-top:.75rem}.input-label[_ngcontent-%COMP%]{padding-bottom:.25rem}.error[_ngcontent-%COMP%]{color:#d8000c}@media (max-width:767px){.modal-content[_ngcontent-%COMP%]{width:80%}}@media (min-width:768px){.modal-content[_ngcontent-%COMP%]{width:50%}}@media (min-width:1024px){.modal-content[_ngcontent-%COMP%]{width:30%}}"]}),e})();function pe(e,t){if(1&e){const e=b.Mb();b.Lb(0,"main-create-frame",6),b.Sb("closeModal",function(){return b.hc(e),b.Wb().onCloseModal()})("createFrame",function(t){return b.hc(e),b.Wb().onCreateFrame(t)}),b.Kb()}}function me(e,t){if(1&e){const e=b.Mb();b.Lb(0,"main-join-frame",7),b.Sb("closeModal",function(){return b.hc(e),b.Wb().onCloseModal()})("joinFrame",function(t){return b.hc(e),b.Wb().onJoinFrame(t)}),b.Kb()}}let ue=(()=>{class e{constructor(e){this.store$=e,this.user$=this.store$.select(l.b.SelectAuthenticationUser),this.selectedFrameId$=this.setSelectedFrameIdListener(),this.showCreateFrameModal=!1,this.showJoinFrameModal=!1}ngOnInit(){this.selectInitialFrameIfAvailable()}onFrameSelect(e){this.store$.dispatch(d.a.SelectFrame.Request({request:e.frameId})),this.closeSideNav()}openCreateFrame(){this.closeSideNav(),this.showCreateFrameModal=!0}onCloseModal(){this.showCreateFrameModal=!1,this.showJoinFrameModal=!1}onCreateFrame(e){this.store$.dispatch(d.a.NewFrame.Request({request:e})),this.onCloseModal()}openJoinFrame(){this.closeSideNav(),this.showJoinFrameModal=!0}onJoinFrame(e){this.store$.dispatch(d.a.JoinFrame.Request({request:e})),this.onCloseModal()}selectInitialFrameIfAvailable(){this.user$.pipe(Object(a.a)(this.selectedFrameId$),Object(s.a)(([e,t])=>{e.frames.length>0&&!t&&this.store$.dispatch(d.a.SelectFrame.Request({request:e.frames[0].frameId}))}),Object(r.a)(1)).subscribe()}closeSideNav(){this.store$.dispatch(d.a.UpdateSideNavVisibility({visible:!1}))}setSelectedFrameIdListener(){return this.store$.select(d.c.SelectSelectedFrame).pipe(Object(c.a)(e=>e?e.id:""))}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(p.h))},e.\u0275cmp=b.Cb({type:e,selectors:[["app-entry"]],decls:9,vars:8,consts:[[1,"layout"],[1,"component-layout"],[1,"sidenav-space",3,"userFrames","selectedFrameId","openCreateFrame","openJoinFrame","frameSelect"],[1,"frame-space"],[3,"closeModal","createFrame",4,"ngIf"],[3,"closeModal","joinFrame",4,"ngIf"],[3,"closeModal","createFrame"],[3,"closeModal","joinFrame"]],template:function(e,t){1&e&&(b.Lb(0,"div",0),b.Jb(1,"app-navbar"),b.Lb(2,"div",1),b.Lb(3,"main-frame-sidenav",2),b.Sb("openCreateFrame",function(){return t.openCreateFrame()})("openJoinFrame",function(){return t.openJoinFrame()})("frameSelect",function(e){return t.onFrameSelect(e)}),b.Xb(4,"async"),b.Xb(5,"async"),b.Kb(),b.Jb(6,"main-frame",3),b.Kb(),b.Kb(),b.nc(7,pe,1,0,"main-create-frame",4),b.nc(8,me,1,0,"main-join-frame",5)),2&e&&(b.yb(3),b.bc("userFrames",b.Yb(4,4,t.user$).frames)("selectedFrameId",b.Yb(5,6,t.selectedFrameId$)),b.yb(4),b.bc("ngIf",t.showCreateFrameModal),b.yb(1),b.bc("ngIf",t.showJoinFrameModal))},directives:[g,w,re,i.k,de,be],pipes:[i.b],styles:[".layout[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100vh}.layout[_ngcontent-%COMP%]   .component-layout[_ngcontent-%COMP%]{display:flex;flex-grow:1;overflow:hidden}.layout[_ngcontent-%COMP%]   .component-layout[_ngcontent-%COMP%]   .frame-space[_ngcontent-%COMP%]{flex:7;overflow:auto}@media (max-width:767px){.sidenav-space[_ngcontent-%COMP%]{flex:0}}@media (min-width:768px){.sidenav-space[_ngcontent-%COMP%]{flex:3}}"]}),e})();var ge=n("LRne"),he=n("5+tZ"),fe=n("SxV6"),ve=n("CqXF"),xe=n("p26r"),Ce=n("jL29");let ye=(()=>{class e{constructor(e,t,n){this.authenticationService=e,this.router=t,this.store$=n}canActivate(e,t){return this.authenticationService.userIsSignedIn().pipe(Object(he.a)(e=>e?this.ensureUserDataIsInStore():Object(ge.a)(this.router.parseUrl(xe.a.authentication))))}ensureUserDataIsInStore(){const e=this.store$.pipe(Object(p.t)(l.b.SelectAuthenticationUser)),t=this.store$.pipe(Object(p.t)(l.b.SelectLoginErrorMessage));return Object(M.b)(e,t).pipe(this.fetchUserIfNull(),Object(fe.a)(([e,t])=>null!==e||""!==t),Object(ve.a)(!0))}fetchUserIfNull(){return Object(s.a)(([e,t])=>{null===e&&""===t&&this.store$.dispatch(l.a.GetUserDataFromSignedInUser.Request({request:null}))})}}return e.\u0275fac=function(t){return new(t||e)(b.Pb(Ce.a),b.Pb(o.a),b.Pb(p.h))},e.\u0275prov=b.Eb({token:e,factory:e.\u0275fac}),e})();const Oe=[{path:"",component:ue,canActivate:[ye]}];let we=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(t){return new(t||e)},providers:[ye],imports:[[i.c,o.b.forChild(Oe)],o.b]}),e})();var Me=n("lf9s"),_e=n("BHD2");let Pe=(()=>{class e{}return e.\u0275mod=b.Gb({type:e}),e.\u0275inj=b.Fb({factory:function(t){return new(t||e)},providers:[Me.a],imports:[[i.c,we,G,_e.a,u.b]]}),e})()}}]);