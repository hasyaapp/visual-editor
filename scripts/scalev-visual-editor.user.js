// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.32.5
// @updateURL    https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js
// @downloadURL  https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js
// @description  Schema-first Scalev Visual Editor: Template Library, 20-section accordion, realtime preview.
// @match        https://app.scalev.com/pages/*
// @noframes
// @sandbox      raw
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      nikahin.workers.dev
// @connect      api.github.com
// @connect      raw.githubusercontent.com
// @run-at       document-idle
// ==/UserScript==
(()=>{var vf=Object.create;var vn=Object.defineProperty;var kf=Object.getOwnPropertyDescriptor;var Sf=Object.getOwnPropertyNames;var wf=Object.getPrototypeOf,Cf=Object.prototype.hasOwnProperty;var zt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)vn(e,i,{get:t[i],enumerable:!0})},Ef=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Sf(t))!Cf.call(e,l)&&l!==i&&vn(e,l,{get:()=>t[l],enumerable:!(n=kf(t,l))||n.enumerable});return e};var Af=(e,t,i)=>(i=e!=null?vf(wf(e)):{},Ef(t||!e||!e.__esModule?vn(i,"default",{value:e,enumerable:!0}):i,e));var vp=zt(Wo=>{var yp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Wo.encode=function(e){if(0<=e&&e<yp.length)return yp[e];throw new TypeError("Must be between 0 and 63: "+e)};Wo.decode=function(e){var t=65,i=90,n=97,l=122,p=48,d=57,g=43,x=47,b=26,y=52;return t<=e&&e<=i?e-t:n<=e&&e<=l?e-n+b:p<=e&&e<=d?e-p+y:e==g?62:e==x?63:-1}});var Ep=zt(qo=>{var kp=vp(),Go=5,Sp=1<<Go,wp=Sp-1,Cp=Sp;function Mb(e){return e<0?(-e<<1)+1:(e<<1)+0}function Ob(e){var t=(e&1)===1,i=e>>1;return t?-i:i}qo.encode=function(t){var i="",n,l=Mb(t);do n=l&wp,l>>>=Go,l>0&&(n|=Cp),i+=kp.encode(n);while(l>0);return i};qo.decode=function(t,i,n){var l=t.length,p=0,d=0,g,x;do{if(i>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(x=kp.decode(t.charCodeAt(i++)),x===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(x&Cp),x&=wp,p=p+(x<<d),d+=Go}while(g);n.value=Ob(p),n.rest=i}});var jr=zt(de=>{function Db(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}de.getArg=Db;var Ap=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Vb=/^data:.+\,.+$/;function Fi(e){var t=e.match(Ap);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}de.urlParse=Fi;function ii(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}de.urlGenerate=ii;var Bb=32;function jb(e){var t=[];return function(i){for(var n=0;n<t.length;n++)if(t[n].input===i){var l=t[0];return t[0]=t[n],t[n]=l,t[0].result}var p=e(i);return t.unshift({input:i,result:p}),t.length>Bb&&t.pop(),p}}var Ko=jb(function(t){var i=t,n=Fi(t);if(n){if(!n.path)return t;i=n.path}for(var l=de.isAbsolute(i),p=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){p.push(i.slice(d));break}else for(p.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var x,b=0,g=p.length-1;g>=0;g--)x=p[g],x==="."?p.splice(g,1):x===".."?b++:b>0&&(x===""?(p.splice(g+1,b),b=0):(p.splice(g,2),b--));return i=p.join("/"),i===""&&(i=l?"/":"."),n?(n.path=i,ii(n)):i});de.normalize=Ko;function Tp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Fi(t),n=Fi(e);if(n&&(e=n.path||"/"),i&&!i.scheme)return n&&(i.scheme=n.scheme),ii(i);if(i||t.match(Vb))return t;if(n&&!n.host&&!n.path)return n.host=t,ii(n);var l=t.charAt(0)==="/"?t:Ko(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=l,ii(n)):l}de.join=Tp;de.isAbsolute=function(e){return e.charAt(0)==="/"||Ap.test(e)};function Ub(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}de.relative=Ub;var _p=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Ip(e){return e}function Hb(e){return Lp(e)?"$"+e:e}de.toSetString=_p?Ip:Hb;function zb(e){return Lp(e)?e.slice(1):e}de.fromSetString=_p?Ip:zb;function Lp(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function Wb(e,t,i){var n=dt(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:dt(e.name,t.name)}de.compareByOriginalPositions=Wb;function Gb(e,t,i){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:dt(e.name,t.name)}de.compareByOriginalPositionsNoSource=Gb;function qb(e,t,i){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||i)||(n=dt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:dt(e.name,t.name)}de.compareByGeneratedPositionsDeflated=qb;function Kb(e,t,i){var n=e.generatedColumn-t.generatedColumn;return n!==0||i||(n=dt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:dt(e.name,t.name)}de.compareByGeneratedPositionsDeflatedNoLine=Kb;function dt(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Yb(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=dt(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:dt(e.name,t.name)}de.compareByGeneratedPositionsInflated=Yb;function Qb(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}de.parseSourceMapInput=Qb;function Zb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var n=Fi(i);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var l=n.path.lastIndexOf("/");l>=0&&(n.path=n.path.substring(0,l+1))}t=Tp(ii(n),t)}return Ko(t)}de.computeSourceURL=Zb});var Pp=zt($p=>{var Yo=jr(),Qo=Object.prototype.hasOwnProperty,Rt=typeof Map<"u";function ft(){this._array=[],this._set=Rt?new Map:Object.create(null)}ft.fromArray=function(t,i){for(var n=new ft,l=0,p=t.length;l<p;l++)n.add(t[l],i);return n};ft.prototype.size=function(){return Rt?this._set.size:Object.getOwnPropertyNames(this._set).length};ft.prototype.add=function(t,i){var n=Rt?t:Yo.toSetString(t),l=Rt?this.has(t):Qo.call(this._set,n),p=this._array.length;(!l||i)&&this._array.push(t),l||(Rt?this._set.set(t,p):this._set[n]=p)};ft.prototype.has=function(t){if(Rt)return this._set.has(t);var i=Yo.toSetString(t);return Qo.call(this._set,i)};ft.prototype.indexOf=function(t){if(Rt){var i=this._set.get(t);if(i>=0)return i}else{var n=Yo.toSetString(t);if(Qo.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};ft.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};ft.prototype.toArray=function(){return this._array.slice()};$p.ArraySet=ft});var Fp=zt(Rp=>{var Np=jr();function Jb(e,t){var i=e.generatedLine,n=t.generatedLine,l=e.generatedColumn,p=t.generatedColumn;return n>i||n==i&&p>=l||Np.compareByGeneratedPositionsInflated(e,t)<=0}function Ur(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Ur.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Ur.prototype.add=function(t){Jb(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Ur.prototype.toArray=function(){return this._sorted||(this._array.sort(Np.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Rp.MappingList=Ur});var Op=zt(Mp=>{var Mi=Ep(),ae=jr(),Hr=Pp().ArraySet,Xb=Fp().MappingList;function je(e){e||(e={}),this._file=ae.getArg(e,"file",null),this._sourceRoot=ae.getArg(e,"sourceRoot",null),this._skipValidation=ae.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=ae.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Hr,this._names=new Hr,this._mappings=new Xb,this._sourcesContents=null}je.prototype._version=3;je.fromSourceMap=function(t,i){var n=t.sourceRoot,l=new je(Object.assign(i||{},{file:t.file,sourceRoot:n}));return t.eachMapping(function(p){var d={generated:{line:p.generatedLine,column:p.generatedColumn}};p.source!=null&&(d.source=p.source,n!=null&&(d.source=ae.relative(n,d.source)),d.original={line:p.originalLine,column:p.originalColumn},p.name!=null&&(d.name=p.name)),l.addMapping(d)}),t.sources.forEach(function(p){var d=p;n!==null&&(d=ae.relative(n,p)),l._sources.has(d)||l._sources.add(d);var g=t.sourceContentFor(p);g!=null&&l.setSourceContent(p,g)}),l};je.prototype.addMapping=function(t){var i=ae.getArg(t,"generated"),n=ae.getArg(t,"original",null),l=ae.getArg(t,"source",null),p=ae.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,n,l,p)===!1||(l!=null&&(l=String(l),this._sources.has(l)||this._sources.add(l)),p!=null&&(p=String(p),this._names.has(p)||this._names.add(p)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:l,name:p}))};je.prototype.setSourceContent=function(t,i){var n=t;this._sourceRoot!=null&&(n=ae.relative(this._sourceRoot,n)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[ae.toSetString(n)]=i):this._sourcesContents&&(delete this._sourcesContents[ae.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};je.prototype.applySourceMap=function(t,i,n){var l=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);l=t.file}var p=this._sourceRoot;p!=null&&(l=ae.relative(p,l));var d=new Hr,g=new Hr;this._mappings.unsortedForEach(function(x){if(x.source===l&&x.originalLine!=null){var b=t.originalPositionFor({line:x.originalLine,column:x.originalColumn});b.source!=null&&(x.source=b.source,n!=null&&(x.source=ae.join(n,x.source)),p!=null&&(x.source=ae.relative(p,x.source)),x.originalLine=b.line,x.originalColumn=b.column,b.name!=null&&(x.name=b.name))}var y=x.source;y!=null&&!d.has(y)&&d.add(y);var k=x.name;k!=null&&!g.has(k)&&g.add(k)},this),this._sources=d,this._names=g,t.sources.forEach(function(x){var b=t.sourceContentFor(x);b!=null&&(n!=null&&(x=ae.join(n,x)),p!=null&&(x=ae.relative(p,x)),this.setSourceContent(x,b))},this)};je.prototype._validateMapping=function(t,i,n,l){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var p="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!n&&!l)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&n)return;var p="Invalid mapping: "+JSON.stringify({generated:t,source:n,original:i,name:l});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}};je.prototype._serializeMappings=function(){for(var t=0,i=1,n=0,l=0,p=0,d=0,g="",x,b,y,k,C=this._mappings.toArray(),u=0,_=C.length;u<_;u++){if(b=C[u],x="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)x+=";",i++;else if(u>0){if(!ae.compareByGeneratedPositionsInflated(b,C[u-1]))continue;x+=","}x+=Mi.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(k=this._sources.indexOf(b.source),x+=Mi.encode(k-d),d=k,x+=Mi.encode(b.originalLine-1-l),l=b.originalLine-1,x+=Mi.encode(b.originalColumn-n),n=b.originalColumn,b.name!=null&&(y=this._names.indexOf(b.name),x+=Mi.encode(y-p),p=y)),g+=x}return g};je.prototype._generateSourcesContent=function(t,i){return t.map(function(n){if(!this._sourcesContents)return null;i!=null&&(n=ae.relative(i,n));var l=ae.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,l)?this._sourcesContents[l]:null},this)};je.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};je.prototype.toString=function(){return JSON.stringify(this.toJSON())};Mp.SourceMapGenerator=je});var Tf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],xc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],_f="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",yc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",kn={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},Sn="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",If={5:Sn,"5module":Sn+" export import",6:Sn+" const class extends export import super"},vc=/^in(stanceof)?$/,Lf=new RegExp("["+yc+"]"),$f=new RegExp("["+yc+_f+"]");function Cn(e,t){for(var i=65536,n=0;n<t.length;n+=2){if(i+=t[n],i>e)return!1;if(i+=t[n+1],i>=e)return!0}return!1}function et(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Lf.test(String.fromCharCode(e)):t===!1?!1:Cn(e,xc)}function yt(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&$f.test(String.fromCharCode(e)):t===!1?!1:Cn(e,xc)||Cn(e,Tf)}var z=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Fe(e,t){return new z(e,{beforeExpr:!0,binop:t})}var Me={beforeExpr:!0},we={startsExpr:!0},_n={};function U(e,t){return t===void 0&&(t={}),t.keyword=e,_n[e]=new z(e,t)}var f={num:new z("num",we),regexp:new z("regexp",we),string:new z("string",we),name:new z("name",we),privateId:new z("privateId",we),eof:new z("eof"),bracketL:new z("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new z("]"),braceL:new z("{",{beforeExpr:!0,startsExpr:!0}),braceR:new z("}"),parenL:new z("(",{beforeExpr:!0,startsExpr:!0}),parenR:new z(")"),comma:new z(",",Me),semi:new z(";",Me),colon:new z(":",Me),dot:new z("."),question:new z("?",Me),questionDot:new z("?."),arrow:new z("=>",Me),template:new z("template"),invalidTemplate:new z("invalidTemplate"),ellipsis:new z("...",Me),backQuote:new z("`",we),dollarBraceL:new z("${",{beforeExpr:!0,startsExpr:!0}),eq:new z("=",{beforeExpr:!0,isAssign:!0}),assign:new z("_=",{beforeExpr:!0,isAssign:!0}),incDec:new z("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new z("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Fe("||",1),logicalAND:Fe("&&",2),bitwiseOR:Fe("|",3),bitwiseXOR:Fe("^",4),bitwiseAND:Fe("&",5),equality:Fe("==/!=/===/!==",6),relational:Fe("</>/<=/>=",7),bitShift:Fe("<</>>/>>>",8),plusMin:new z("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Fe("%",10),star:Fe("*",10),slash:Fe("/",10),starstar:new z("**",{beforeExpr:!0}),coalesce:Fe("??",1),_break:U("break"),_case:U("case",Me),_catch:U("catch"),_continue:U("continue"),_debugger:U("debugger"),_default:U("default",Me),_do:U("do",{isLoop:!0,beforeExpr:!0}),_else:U("else",Me),_finally:U("finally"),_for:U("for",{isLoop:!0}),_function:U("function",we),_if:U("if"),_return:U("return",Me),_switch:U("switch"),_throw:U("throw",Me),_try:U("try"),_var:U("var"),_const:U("const"),_while:U("while",{isLoop:!0}),_with:U("with"),_new:U("new",{beforeExpr:!0,startsExpr:!0}),_this:U("this",we),_super:U("super",we),_class:U("class",we),_extends:U("extends",Me),_export:U("export"),_import:U("import",we),_null:U("null",we),_true:U("true",we),_false:U("false",we),_in:U("in",{beforeExpr:!0,binop:7}),_instanceof:U("instanceof",{beforeExpr:!0,binop:7}),_typeof:U("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:U("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:U("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Ce=/\r\n?|\n|\u2028|\u2029/,Pf=new RegExp(Ce.source,"g");function Wt(e){return e===10||e===13||e===8232||e===8233}function kc(e,t,i){i===void 0&&(i=e.length);for(var n=t;n<i;n++){var l=e.charCodeAt(n);if(Wt(l))return n<i-1&&l===13&&e.charCodeAt(n+1)===10?n+2:n+1}return-1}var Sc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,pe=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,wc=Object.prototype,Nf=wc.hasOwnProperty,Rf=wc.toString,Gt=Object.hasOwn||(function(e,t){return Nf.call(e,t)}),dc=Array.isArray||(function(e){return Rf.call(e)==="[object Array]"}),fc=Object.create(null);function xt(e){return fc[e]||(fc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function ct(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var Ff=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,Si=function(t,i){this.line=t,this.column=i};Si.prototype.offset=function(t){return new Si(this.line,this.column+t)};var dr=function(t,i,n){this.start=i,this.end=n,t.sourceFile!==null&&(this.source=t.sourceFile)};function Cc(e,t){for(var i=1,n=0;;){var l=kc(e,n,t);if(l<0)return new Si(i,t-n);++i,n=l}}var En={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},mc=!1;function Mf(e){var t={};for(var i in En)t[i]=e&&Gt(e,i)?e[i]:En[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!mc&&typeof console=="object"&&console.warn&&(mc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),dc(t.onToken)){var n=t.onToken;t.onToken=function(l){return n.push(l)}}if(dc(t.onComment)&&(t.onComment=Of(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function Of(e,t){return function(i,n,l,p,d,g){var x={type:i?"Block":"Line",value:n,start:l,end:p};e.locations&&(x.loc=new dr(this,d,g)),e.ranges&&(x.range=[l,p]),t.push(x)}}var Tt=1,_t=2,In=4,Ec=8,Ln=16,Ac=32,fr=64,Tc=128,It=256,wi=512,_c=1024,mr=Tt|_t|It;function $n(e,t){return _t|(e?In:0)|(t?Ec:0)}var cr=0,Pn=1,pt=2,Ic=3,Lc=4,$c=5,ce=function(t,i,n){this.options=t=Mf(t),this.sourceFile=t.sourceFile,this.keywords=xt(If[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var l="";t.allowReserved!==!0&&(l=kn[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(l+=" await")),this.reservedWords=xt(l);var p=(l?l+" ":"")+kn.strict;this.reservedWordsStrict=xt(p),this.reservedWordsStrictBind=xt(p+" "+kn.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=n||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):n?(this.lineStart=this.input.lastIndexOf(`
`,n-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Ce).length)):this.lineStart=0,this.type=f.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?_t:Tt),this.regexpState=null,this.privateNameStack=[]},De={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};ce.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};De.inFunction.get=function(){return(this.currentVarScope().flags&_t)>0};De.inGenerator.get=function(){return(this.currentVarScope().flags&Ec)>0};De.inAsync.get=function(){return(this.currentVarScope().flags&In)>0};De.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(It|wi))return!1;if(i&_t)return(i&In)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};De.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&Tt)};De.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&fr)>0||this.options.allowSuperOutsideMethod};De.allowDirectSuper.get=function(){return(this.currentThisScope().flags&Tc)>0};De.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};De.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(It|wi)||i&_t&&!(i&Ln))return!0}return!1};De.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&_c||!this.inModule&&t&Tt)};De.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&It)>0};ce.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var n=this,l=0;l<t.length;l++)n=t[l](n);return n};ce.parse=function(t,i){return new this(i,t).parse()};ce.parseExpressionAt=function(t,i,n){var l=new this(n,t,i);return l.nextToken(),l.parseExpression()};ce.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(ce.prototype,De);var fe=ce.prototype,Df=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;fe.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){pe.lastIndex=e,e+=pe.exec(this.input)[0].length;var t=Df.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){pe.lastIndex=e+t[0].length;var i=pe.exec(this.input),n=i.index+i[0].length,l=this.input.charAt(n);return l===";"||l==="}"||Ce.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(l)||l==="!"&&this.input.charAt(n+1)==="=")}e+=t[0].length,pe.lastIndex=e,e+=pe.exec(this.input)[0].length,this.input[e]===";"&&e++}};fe.eat=function(e){return this.type===e?(this.next(),!0):!1};fe.isContextual=function(e){return this.type===f.name&&this.value===e&&!this.containsEsc};fe.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};fe.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};fe.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};fe.canInsertSemicolon=function(){return this.type===f.eof||this.type===f.braceR||Ce.test(this.input.slice(this.lastTokEnd,this.start))};fe.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};fe.semicolon=function(){!this.eat(f.semi)&&!this.insertSemicolon()&&this.unexpected()};fe.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};fe.expect=function(e){this.eat(e)||this.unexpected()};fe.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var gr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};fe.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};fe.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,n=e.doubleProto;if(!t)return i>=0||n>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")};fe.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};fe.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var P=ce.prototype;P.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==f.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var n=0,l=Object.keys(this.undefinedExports);n<l.length;n+=1){var p=l[n];this.raiseRecoverable(this.undefinedExports[p].start,"Export '"+p+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Nn={kind:"loop"},Vf={kind:"switch"};P.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;pe.lastIndex=this.pos;var t=pe.exec(this.input),i=this.pos+t[0].length,n=this.fullCharCodeAt(i);if(n===91||n===92)return!0;if(e)return!1;if(n===123)return!0;if(et(n)){var l=i;do i+=n<=65535?1:2;while(yt(n=this.fullCharCodeAt(i)));if(n===92)return!0;var p=this.input.slice(l,i);if(!vc.test(p))return!0}return!1};P.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;pe.lastIndex=this.pos;var e=pe.exec(this.input),t=this.pos+e[0].length,i;return!Ce.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(yt(i=this.fullCharCodeAt(t+8))||i===92))};P.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;pe.lastIndex=this.pos;var i=pe.exec(this.input),n=this.pos+i[0].length;if(Ce.test(this.input.slice(this.pos,n)))return!1;if(e){var l=n+5,p;if(this.input.slice(n,l)!=="using"||l===this.input.length||yt(p=this.fullCharCodeAt(l))||p===92)return!1;pe.lastIndex=l;var d=pe.exec(this.input);if(n=l+d[0].length,d&&Ce.test(this.input.slice(l,n)))return!1}var g=this.fullCharCodeAt(n);if(!et(g)&&g!==92)return!1;var x=n;do n+=g<=65535?1:2;while(yt(g=this.fullCharCodeAt(n)));if(g===92)return!0;var b=this.input.slice(x,n);if(vc.test(b))return!1;if(t&&!e&&b==="of"){pe.lastIndex=n;var y=pe.exec(this.input);if(n=n+y[0].length,this.input.charCodeAt(n)!==61||(g=this.input.charCodeAt(n+1))===61||g===62)return!1}return!0};P.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};P.isUsing=function(e){return this.isUsingKeyword(!1,e)};P.parseStatement=function(e,t,i){var n=this.type,l=this.startNode(),p;switch(this.isLet(e)&&(n=f._var,p="let"),n){case f._break:case f._continue:return this.parseBreakContinueStatement(l,n.keyword);case f._debugger:return this.parseDebuggerStatement(l);case f._do:return this.parseDoStatement(l);case f._for:return this.parseForStatement(l);case f._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(l,!1,!e);case f._class:return e&&this.unexpected(),this.parseClass(l,!0);case f._if:return this.parseIfStatement(l);case f._return:return this.parseReturnStatement(l);case f._switch:return this.parseSwitchStatement(l);case f._throw:return this.parseThrowStatement(l);case f._try:return this.parseTryStatement(l);case f._const:case f._var:return p=p||this.value,e&&p!=="var"&&this.unexpected(),this.parseVarStatement(l,p);case f._while:return this.parseWhileStatement(l);case f._with:return this.parseWithStatement(l);case f.braceL:return this.parseBlock(!0,l);case f.semi:return this.parseEmptyStatement(l);case f._export:case f._import:if(this.options.ecmaVersion>10&&n===f._import){pe.lastIndex=this.pos;var d=pe.exec(this.input),g=this.pos+d[0].length,x=this.input.charCodeAt(g);if(x===40||x===46)return this.parseExpressionStatement(l,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),n===f._import?this.parseImport(l):this.parseExport(l,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(l,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(l,!1,b),this.semicolon(),this.finishNode(l,"VariableDeclaration");var y=this.value,k=this.parseExpression();return n===f.name&&k.type==="Identifier"&&this.eat(f.colon)?this.parseLabeledStatement(l,y,k,e):this.parseExpressionStatement(l,k)}};P.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(f.semi)||this.insertSemicolon()?e.label=null:this.type!==f.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var n=0;n<this.labels.length;++n){var l=this.labels[n];if((e.label==null||l.name===e.label.name)&&(l.kind!=null&&(i||l.kind==="loop")||e.label&&i))break}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};P.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};P.parseDoStatement=function(e){return this.next(),this.labels.push(Nn),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(f._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(f.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};P.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Nn),this.enterScope(0),this.expect(f.parenL),this.type===f.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===f._var||this.type===f._const||i){var n=this.startNode(),l=i?"let":this.value;return this.next(),this.parseVar(n,!0,l),this.finishNode(n,"VariableDeclaration"),this.parseForAfterInit(e,n,t)}var p=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var x=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(x,!0,g),this.finishNode(x,"VariableDeclaration"),this.parseForAfterInit(e,x,t)}var b=this.containsEsc,y=new gr,k=this.start,C=t>-1?this.parseExprSubscripts(y,"await"):this.parseExpression(!0,y);return this.type===f._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===f._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(C.start===k&&!b&&C.type==="Identifier"&&C.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),p&&d&&this.raise(C.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(C,!1,y),this.checkLValPattern(C),this.parseForIn(e,C)):(this.checkExpressionErrors(y,!0),t>-1&&this.unexpected(t),this.parseFor(e,C))};P.parseForAfterInit=function(e,t,i){return(this.type===f._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===f._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};P.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,ki|(i?0:An),!1,t)};P.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(f._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};P.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(f.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};P.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(f.braceL),this.labels.push(Vf),this.enterScope(_c);for(var t,i=!1;this.type!==f.braceR;)if(this.type===f._case||this.type===f._default){var n=this.type===f._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(f.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};P.parseThrowStatement=function(e){return this.next(),Ce.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Bf=[];P.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?Ac:0),this.checkLValPattern(e,t?Lc:pt),this.expect(f.parenR),e};P.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===f._catch){var t=this.startNode();this.next(),this.eat(f.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(f._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};P.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};P.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Nn),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};P.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};P.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};P.parseLabeledStatement=function(e,t,i,n){for(var l=0,p=this.labels;l<p.length;l+=1){var d=p[l];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===f._switch?"switch":null,x=this.labels.length-1;x>=0;x--){var b=this.labels[x];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(n?n.indexOf("label")===-1?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};P.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};P.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(f.braceL),e&&this.enterScope(0);this.type!==f.braceR;){var n=this.parseStatement(null);t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};P.parseFor=function(e,t){return e.init=t,this.expect(f.semi),e.test=this.type===f.semi?null:this.parseExpression(),this.expect(f.semi),e.update=this.type===f.parenR?null:this.parseExpression(),this.expect(f.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};P.parseForIn=function(e,t){var i=this.type===f._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(f.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};P.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var l=this.startNode();if(this.parseVarId(l,i),this.eat(f.eq)?l.init=this.parseMaybeAssign(t):!n&&i==="const"&&!(this.type===f._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!n&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==f._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!n&&l.id.type!=="Identifier"&&!(t&&(this.type===f._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):l.init=null,e.declarations.push(this.finishNode(l,"VariableDeclarator")),!this.eat(f.comma))break}return e};P.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?Pn:pt,!1)};var ki=1,An=2,Pc=4;P.parseFunction=function(e,t,i,n,l){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===f.star&&t&An&&this.unexpected(),e.generator=this.eat(f.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&ki&&(e.id=t&Pc&&this.type!==f.name?null:this.parseIdent(),e.id&&!(t&An)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?Pn:pt:Ic));var p=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope($n(e.async,e.generator)),t&ki||(e.id=this.type===f.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,l),this.yieldPos=p,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&ki?"FunctionDeclaration":"FunctionExpression")};P.parseFunctionParams=function(e){this.expect(f.parenL),e.params=this.parseBindingList(f.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};P.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var n=this.enterClassBody(),l=this.startNode(),p=!1;for(l.body=[],this.expect(f.braceL);this.type!==f.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(l.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(p&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),p=!0):d.key&&d.key.type==="PrivateIdentifier"&&jf(n,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(l,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};P.parseClassElement=function(e){if(this.eat(f.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),n="",l=!1,p=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(f.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===f.star?g=!0:n="static"}if(i.static=g,!n&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===f.star)&&!this.canInsertSemicolon()?p=!0:n="async"),!n&&(t>=9||!p)&&this.eat(f.star)&&(l=!0),!n&&!p&&!l){var x=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=x:n=x)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===f.parenL||d!=="method"||l||p){var b=!i.static&&ur(i,"constructor"),y=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,l,p,y)}else this.parseClassField(i);return i};P.isClassElementNameStart=function(){return this.type===f.name||this.type===f.privateId||this.type===f.num||this.type===f.string||this.type===f.bracketL||this.type.keyword};P.parseClassElementName=function(e){this.type===f.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};P.parseClassMethod=function(e,t,i,n){var l=e.key;e.kind==="constructor"?(t&&this.raise(l.start,"Constructor can't be a generator"),i&&this.raise(l.start,"Constructor can't be an async method")):e.static&&ur(e,"prototype")&&this.raise(l.start,"Classes may not have a static property named prototype");var p=e.value=this.parseMethod(t,i,n);return e.kind==="get"&&p.params.length!==0&&this.raiseRecoverable(p.start,"getter should have no params"),e.kind==="set"&&p.params.length!==1&&this.raiseRecoverable(p.start,"setter should have exactly one param"),e.kind==="set"&&p.params[0].type==="RestElement"&&this.raiseRecoverable(p.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};P.parseClassField=function(e){return ur(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&ur(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(f.eq)?(this.enterScope(wi|fr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};P.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(It|fr);this.type!==f.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};P.parseClassId=function(e,t){this.type===f.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,pt,!1)):(t===!0&&this.unexpected(),e.id=null)};P.parseClassSuper=function(e){e.superClass=this.eat(f._extends)?this.parseExprSubscripts(null,!1):null};P.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};P.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,l=n===0?null:this.privateNameStack[n-1],p=0;p<i.length;++p){var d=i[p];Gt(t,d.name)||(l?l.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function jf(e,t){var i=t.key.name,n=e[i],l="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(l=(t.static?"s":"i")+t.kind),n==="iget"&&l==="iset"||n==="iset"&&l==="iget"||n==="sget"&&l==="sset"||n==="sset"&&l==="sget"?(e[i]="true",!1):n?!0:(e[i]=l,!1)}function ur(e,t){var i=e.computed,n=e.key;return!i&&(n.type==="Identifier"&&n.name===t||n.type==="Literal"&&n.value===t)}P.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==f.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};P.parseExport=function(e,t){if(this.next(),this.eat(f.star))return this.parseExportAllDeclaration(e,t);if(this.eat(f._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==f.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var l=n[i];this.checkUnreserved(l.local),this.checkLocalExport(l.local),l.local.type==="Literal"&&this.raise(l.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};P.parseExportDeclaration=function(e){return this.parseStatement(null)};P.parseExportDefaultDeclaration=function(){var e;if(this.type===f._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,ki|Pc,!1,e)}else if(this.type===f._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var n=this.parseMaybeAssign();return this.semicolon(),n}};P.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),Gt(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};P.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var n=0,l=t.properties;n<l.length;n+=1){var p=l[n];this.checkPatternExport(e,p)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var x=g[d];x&&this.checkPatternExport(e,x)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};P.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var l=n[i];this.checkPatternExport(e,l.id)}};P.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};P.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};P.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(f.braceL);!this.eat(f.braceR);){if(i)i=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;t.push(this.parseExportSpecifier(e))}return t};P.parseImport=function(e){return this.next(),this.type===f.string?(e.specifiers=Bf,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===f.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};P.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,pt),this.finishNode(e,"ImportSpecifier")};P.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,pt),this.finishNode(e,"ImportDefaultSpecifier")};P.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,pt),this.finishNode(e,"ImportNamespaceSpecifier")};P.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===f.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(f.comma)))return e;if(this.type===f.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(f.braceL);!this.eat(f.braceR);){if(t)t=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;e.push(this.parseImportSpecifier())}return e};P.parseWithClause=function(){var e=[];if(!this.eat(f._with))return e;this.expect(f.braceL);for(var t={},i=!0;!this.eat(f.braceR);){if(i)i=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;var n=this.parseImportAttribute(),l=n.key.type==="Identifier"?n.key.name:n.key.value;Gt(t,l)&&this.raiseRecoverable(n.key.start,"Duplicate attribute key '"+l+"'"),t[l]=!0,e.push(n)}return e};P.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===f.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(f.colon),this.type!==f.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};P.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===f.string){var e=this.parseLiteral(this.value);return Ff.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};P.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};P.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var Ve=ce.prototype;Ve.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var n=0,l=e.properties;n<l.length;n+=1){var p=l[n];this.toAssignable(p,t),p.type==="RestElement"&&(p.argument.type==="ArrayPattern"||p.argument.type==="ObjectPattern")&&this.raise(p.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};Ve.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var l=e[n];l&&this.toAssignable(l,t)}if(i){var p=e[i-1];this.options.ecmaVersion===6&&t&&p&&p.type==="RestElement"&&p.argument.type!=="Identifier"&&this.unexpected(p.argument.start)}return e};Ve.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};Ve.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==f.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};Ve.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case f.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(f.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case f.braceL:return this.parseObj(!0)}return this.parseIdent()};Ve.parseBindingList=function(e,t,i,n){for(var l=[],p=!0;!this.eat(e);)if(p?p=!1:this.expect(f.comma),t&&this.type===f.comma)l.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===f.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),l.push(d),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else l.push(this.parseAssignableListItem(n))}return l};Ve.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};Ve.parseBindingListItem=function(e){return e};Ve.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(f.eq))return i;var n=this.startNodeAt(e,t);return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")};Ve.checkLValSimple=function(e,t,i){t===void 0&&(t=cr);var n=t!==cr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(t===pt&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(Gt(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==$c&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}};Ve.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=cr),e.type){case"ObjectPattern":for(var n=0,l=e.properties;n<l.length;n+=1){var p=l[n];this.checkLValInnerPattern(p,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var x=g[d];x&&this.checkLValInnerPattern(x,t,i)}break;default:this.checkLValSimple(e,t,i)}};Ve.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=cr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var Ge=function(t,i,n,l,p){this.token=t,this.isExpr=!!i,this.preserveSpace=!!n,this.override=l,this.generator=!!p},ee={b_stat:new Ge("{",!1),b_expr:new Ge("{",!0),b_tmpl:new Ge("${",!1),p_stat:new Ge("(",!1),p_expr:new Ge("(",!0),q_tmpl:new Ge("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new Ge("function",!1),f_expr:new Ge("function",!0),f_expr_gen:new Ge("function",!0,!1,null,!0),f_gen:new Ge("function",!1,!1,null,!0)},qt=ce.prototype;qt.initialContext=function(){return[ee.b_stat]};qt.curContext=function(){return this.context[this.context.length-1]};qt.braceIsBlock=function(e){var t=this.curContext();return t===ee.f_expr||t===ee.f_stat?!0:e===f.colon&&(t===ee.b_stat||t===ee.b_expr)?!t.isExpr:e===f._return||e===f.name&&this.exprAllowed?Ce.test(this.input.slice(this.lastTokEnd,this.start)):e===f._else||e===f.semi||e===f.eof||e===f.parenR||e===f.arrow?!0:e===f.braceL?t===ee.b_stat:e===f._var||e===f._const||e===f.name?!1:!this.exprAllowed};qt.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};qt.updateContext=function(e){var t,i=this.type;i.keyword&&e===f.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};qt.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};f.parenR.updateContext=f.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===ee.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};f.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?ee.b_stat:ee.b_expr),this.exprAllowed=!0};f.dollarBraceL.updateContext=function(){this.context.push(ee.b_tmpl),this.exprAllowed=!0};f.parenL.updateContext=function(e){var t=e===f._if||e===f._for||e===f._with||e===f._while;this.context.push(t?ee.p_stat:ee.p_expr),this.exprAllowed=!0};f.incDec.updateContext=function(){};f._function.updateContext=f._class.updateContext=function(e){e.beforeExpr&&e!==f._else&&!(e===f.semi&&this.curContext()!==ee.p_stat)&&!(e===f._return&&Ce.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===f.colon||e===f.braceL)&&this.curContext()===ee.b_stat)?this.context.push(ee.f_expr):this.context.push(ee.f_stat),this.exprAllowed=!1};f.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};f.backQuote.updateContext=function(){this.curContext()===ee.q_tmpl?this.context.pop():this.context.push(ee.q_tmpl),this.exprAllowed=!1};f.star.updateContext=function(e){if(e===f._function){var t=this.context.length-1;this.context[t]===ee.f_expr?this.context[t]=ee.f_expr_gen:this.context[t]=ee.f_gen}this.exprAllowed=!0};f.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==f.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var R=ce.prototype;R.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n=e.key,l;switch(n.type){case"Identifier":l=n.name;break;case"Literal":l=String(n.value);break;default:return}var p=e.kind;if(this.options.ecmaVersion>=6){l==="__proto__"&&p==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=n.start):this.raiseRecoverable(n.start,"Redefinition of __proto__ property")),t.proto=!0);return}l="$"+l;var d=t[l];if(d){var g;p==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[p],g&&this.raiseRecoverable(n.start,"Redefinition of property")}else d=t[l]={init:!1,get:!1,set:!1};d[p]=!0}};R.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var n=i.start,l=i.startLoc,p=i.parseMaybeAssign(e,t);if(i.type===f.comma){var d=i.startNodeAt(n,l);for(d.expressions=[p];i.eat(f.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return p})};R.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var n=!1,l=-1,p=-1,d=-1;t?(l=t.parenthesizedAssign,p=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new gr,n=!0);var g=this.start,x=this.startLoc;(this.type===f.parenL||this.type===f.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,x)),this.type.isAssign){var y=this.startNodeAt(g,x);return y.operator=this.value,this.type===f.eq&&(b=this.toAssignable(b,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===f.eq?this.checkLValPattern(b):this.checkLValSimple(b),y.left=b,this.next(),y.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(y,"AssignmentExpression")}else n&&this.checkExpressionErrors(t,!0);return l>-1&&(t.parenthesizedAssign=l),p>-1&&(t.trailingComma=p),b};R.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,l=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return l;if(!(l.type==="ArrowFunctionExpression"&&l.start===i)&&this.eat(f.question)){var p=this.startNodeAt(i,n);return p.test=l,p.consequent=this.parseMaybeAssign(),this.expect(f.colon),p.alternate=this.parseMaybeAssign(e),this.finishNode(p,"ConditionalExpression")}return l};R.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,l=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||l.start===i&&l.type==="ArrowFunctionExpression"?l:this.parseExprOp(l,i,n,-1,e)};R.parseExprOp=function(e,t,i,n,l){var p=this.type.binop;if(p!=null&&(!l||this.type!==f._in)&&p>n){var d=this.type===f.logicalOR||this.type===f.logicalAND,g=this.type===f.coalesce;g&&(p=f.logicalAND.binop);var x=this.value;this.next();var b=this.start,y=this.startLoc,k=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,l),b,y,p,l),C=this.buildBinary(t,i,e,k,x,d||g);return(d&&this.type===f.coalesce||g&&(this.type===f.logicalOR||this.type===f.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(C,t,i,n,l)}return e};R.buildBinary=function(e,t,i,n,l,p){n.type==="PrivateIdentifier"&&this.raise(n.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=l,d.right=n,this.finishNode(d,p?"LogicalExpression":"BinaryExpression")};R.parseMaybeUnary=function(e,t,i,n){var l=this.start,p=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(n),t=!0;else if(this.type.prefix){var g=this.startNode(),x=this.type===f.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,x,n),this.checkExpressionErrors(e,!0),x?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Nc(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&Tn(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,x?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===f.privateId)(n||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==f._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(l,p);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===l)&&this.eat(f.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(l,p,d,this.parseMaybeUnary(null,!1,!1,n),"**",!1);else return d};function Nc(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Nc(e.expression)}function Tn(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&Tn(e.expression)||e.type==="ParenthesizedExpression"&&Tn(e.expression)}R.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,l=this.parseExprAtom(e,t);if(l.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return l;var p=this.parseSubscripts(l,i,n,!1,t);return e&&p.type==="MemberExpression"&&(e.parenthesizedAssign>=p.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=p.start&&(e.parenthesizedBind=-1),e.trailingComma>=p.start&&(e.trailingComma=-1)),p};R.parseSubscripts=function(e,t,i,n,l){for(var p=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,n,p,d,l);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var x=this.startNodeAt(t,i);x.expression=g,g=this.finishNode(x,"ChainExpression")}return g}e=g}};R.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(f.arrow)};R.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)};R.parseSubscript=function(e,t,i,n,l,p,d){var g=this.options.ecmaVersion>=11,x=g&&this.eat(f.questionDot);n&&x&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(f.bracketL);if(b||x&&this.type!==f.parenL&&this.type!==f.backQuote||this.eat(f.dot)){var y=this.startNodeAt(t,i);y.object=e,b?(y.property=this.parseExpression(),this.expect(f.bracketR)):this.type===f.privateId&&e.type!=="Super"?y.property=this.parsePrivateIdent():y.property=this.parseIdent(this.options.allowReserved!=="never"),y.computed=!!b,g&&(y.optional=x),e=this.finishNode(y,"MemberExpression")}else if(!n&&this.eat(f.parenL)){var k=new gr,C=this.yieldPos,u=this.awaitPos,_=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var K=this.parseExprList(f.parenR,this.options.ecmaVersion>=8,!1,k);if(l&&!x&&this.shouldParseAsyncArrow())return this.checkPatternErrors(k,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=C,this.awaitPos=u,this.awaitIdentPos=_,this.parseSubscriptAsyncArrow(t,i,K,d);this.checkExpressionErrors(k,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,this.awaitIdentPos=_||this.awaitIdentPos;var te=this.startNodeAt(t,i);te.callee=e,te.arguments=K,g&&(te.optional=x),e=this.finishNode(te,"CallExpression")}else if(this.type===f.backQuote){(x||p)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var Y=this.startNodeAt(t,i);Y.tag=e,Y.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(Y,"TaggedTemplateExpression")}return e};R.parseExprAtom=function(e,t,i){this.type===f.slash&&this.readRegexp();var n,l=this.potentialArrowAt===this.start;switch(this.type){case f._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type===f.parenL&&!this.allowDirectSuper&&this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==f.dot&&this.type!==f.bracketL&&this.type!==f.parenL&&this.unexpected(),this.finishNode(n,"Super");case f._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression");case f.name:var p=this.start,d=this.startLoc,g=this.containsEsc,x=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&x.name==="async"&&!this.canInsertSemicolon()&&this.eat(f._function))return this.overrideContext(ee.f_expr),this.parseFunction(this.startNodeAt(p,d),0,!1,!0,t);if(l&&!this.canInsertSemicolon()){if(this.eat(f.arrow))return this.parseArrowExpression(this.startNodeAt(p,d),[x],!1,t);if(this.options.ecmaVersion>=8&&x.name==="async"&&this.type===f.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return x=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(f.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(p,d),[x],!0,t)}return x;case f.regexp:var b=this.value;return n=this.parseLiteral(b.value),n.regex={pattern:b.pattern,flags:b.flags},n;case f.num:case f.string:return this.parseLiteral(this.value);case f._null:case f._true:case f._false:return n=this.startNode(),n.value=this.type===f._null?null:this.type===f._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal");case f.parenL:var y=this.start,k=this.parseParenAndDistinguishExpression(l,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(k)&&(e.parenthesizedAssign=y),e.parenthesizedBind<0&&(e.parenthesizedBind=y)),k;case f.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(f.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression");case f.braceL:return this.overrideContext(ee.b_expr),this.parseObj(!1,e);case f._function:return n=this.startNode(),this.next(),this.parseFunction(n,0);case f._class:return this.parseClass(this.startNode(),!1);case f._new:return this.parseNew();case f.backQuote:return this.parseTemplate();case f._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};R.parseExprAtomDefault=function(){this.unexpected()};R.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===f.parenL&&!e)return this.parseDynamicImport(t);if(this.type===f.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};R.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(f.parenR)?e.options=null:(this.expect(f.comma),this.afterTrailingComma(f.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(f.parenR)||(this.expect(f.comma),this.afterTrailingComma(f.parenR)||this.unexpected())));else if(!this.eat(f.parenR)){var t=this.start;this.eat(f.comma)&&this.eat(f.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};R.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};R.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};R.parseParenExpression=function(){this.expect(f.parenL);var e=this.parseExpression();return this.expect(f.parenR),e};R.shouldParseArrow=function(e){return!this.canInsertSemicolon()};R.parseParenAndDistinguishExpression=function(e,t){var i=this.start,n=this.startLoc,l,p=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,x=[],b=!0,y=!1,k=new gr,C=this.yieldPos,u=this.awaitPos,_;for(this.yieldPos=0,this.awaitPos=0;this.type!==f.parenR;)if(b?b=!1:this.expect(f.comma),p&&this.afterTrailingComma(f.parenR,!0)){y=!0;break}else if(this.type===f.ellipsis){_=this.start,x.push(this.parseParenItem(this.parseRestBinding())),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else x.push(this.parseMaybeAssign(!1,k,this.parseParenItem));var K=this.lastTokEnd,te=this.lastTokEndLoc;if(this.expect(f.parenR),e&&this.shouldParseArrow(x)&&this.eat(f.arrow))return this.checkPatternErrors(k,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=C,this.awaitPos=u,this.parseParenArrowList(i,n,x,t);(!x.length||y)&&this.unexpected(this.lastTokStart),_&&this.unexpected(_),this.checkExpressionErrors(k,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,x.length>1?(l=this.startNodeAt(d,g),l.expressions=x,this.finishNodeAt(l,"SequenceExpression",K,te)):l=x[0]}else l=this.parseParenExpression();if(this.options.preserveParens){var Y=this.startNodeAt(i,n);return Y.expression=l,this.finishNode(Y,"ParenthesizedExpression")}else return l};R.parseParenItem=function(e){return e};R.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)};var Uf=[];R.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===f.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,l=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,l,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(n,"Invalid use of 'super'"),this.eat(f.parenL)?e.arguments=this.parseExprList(f.parenR,this.options.ecmaVersion>=8,!1):e.arguments=Uf,this.finishNode(e,"NewExpression")};R.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===f.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===f.backQuote,this.finishNode(i,"TemplateElement")};R.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var n=this.parseTemplateElement({isTagged:t});for(i.quasis=[n];!n.tail;)this.type===f.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(f.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(f.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};R.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===f.name||this.type===f.num||this.type===f.string||this.type===f.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===f.star)&&!Ce.test(this.input.slice(this.lastTokEnd,this.start))};R.parseObj=function(e,t){var i=this.startNode(),n=!0,l={};for(i.properties=[],this.next();!this.eat(f.braceR);){if(n)n=!1;else if(this.expect(f.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(f.braceR))break;var p=this.parseProperty(e,t);e||this.checkPropClash(p,l,t),i.properties.push(p)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};R.parseProperty=function(e,t){var i=this.startNode(),n,l,p,d;if(this.options.ecmaVersion>=9&&this.eat(f.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===f.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(p=this.start,d=this.startLoc),e||(n=this.eat(f.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(i)?(l=!0,n=this.options.ecmaVersion>=9&&this.eat(f.star),this.parsePropertyName(i)):l=!1,this.parsePropertyValue(i,e,n,l,p,d,t,g),this.finishNode(i,"Property")};R.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var n=e.value.start;e.kind==="get"?this.raiseRecoverable(n,"getter should have no params"):this.raiseRecoverable(n,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};R.parsePropertyValue=function(e,t,i,n,l,p,d,g){(i||n)&&this.type===f.colon&&this.unexpected(),this.eat(f.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===f.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,n),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==f.comma&&this.type!==f.braceR&&this.type!==f.eq?((i||n)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=l),t?e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key)):this.type===f.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};R.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(f.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(f.bracketR),e.key;e.computed=!1}return e.key=this.type===f.num||this.type===f.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};R.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};R.parseMethod=function(e,t,i){var n=this.startNode(),l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope($n(t,n.generator)|fr|(i?Tc:0)),this.expect(f.parenL),n.params=this.parseBindingList(f.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(n,"FunctionExpression")};R.parseArrowExpression=function(e,t,i,n){var l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.enterScope($n(i,!1)|Ln),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};R.parseFunctionBody=function(e,t,i,n){var l=t&&this.type!==f.braceL,p=this.strict,d=!1;if(l)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!p||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var x=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!p&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,$c),e.body=this.parseBlock(!1,void 0,d&&!p),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=x}this.exitScope()};R.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var n=i[t];if(n.type!=="Identifier")return!1}return!0};R.checkParams=function(e,t){for(var i=Object.create(null),n=0,l=e.params;n<l.length;n+=1){var p=l[n];this.checkLValInnerPattern(p,Pn,t?null:i)}};R.parseExprList=function(e,t,i,n){for(var l=[],p=!0;!this.eat(e);){if(p)p=!1;else if(this.expect(f.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===f.comma?d=null:this.type===f.ellipsis?(d=this.parseSpread(n),n&&this.type===f.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):d=this.parseMaybeAssign(!1,n),l.push(d)}return l};R.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name;if(this.inGenerator&&n==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&mr)&&n==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(n==="arguments"||n==="await")&&this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var l=this.strict?this.reservedWordsStrict:this.reservedWords;l.test(n)&&(!this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))}};R.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};R.parseIdentNode=function(){var e=this.startNode();return this.type===f.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=f.name):this.unexpected(),e};R.parsePrivateIdent=function(){var e=this.startNode();return this.type===f.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};R.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===f.semi||this.canInsertSemicolon()||this.type!==f.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(f.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};R.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var pr=ce.prototype;pr.raise=function(e,t){var i=Cc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var n=new SyntaxError(t);throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n};pr.raiseRecoverable=pr.raise;pr.curPosition=function(){if(this.options.locations)return new Si(this.curLine,this.pos-this.lineStart)};var vt=ce.prototype,Hf=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};vt.enterScope=function(e){this.scopeStack.push(new Hf(e))};vt.exitScope=function(){this.scopeStack.pop()};vt.treatFunctionsAsVarInScope=function(e){return e.flags&_t||!this.inModule&&e.flags&Tt};vt.declareName=function(e,t,i){var n=!1;if(t===pt){var l=this.currentScope();n=l.lexical.indexOf(e)>-1||l.functions.indexOf(e)>-1||l.var.indexOf(e)>-1,l.lexical.push(e),this.inModule&&l.flags&Tt&&delete this.undefinedExports[e]}else if(t===Lc){var p=this.currentScope();p.lexical.push(e)}else if(t===Ic){var d=this.currentScope();this.treatFunctionsAsVar?n=d.lexical.indexOf(e)>-1:n=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var x=this.scopeStack[g];if(x.lexical.indexOf(e)>-1&&!(x.flags&Ac&&x.lexical[0]===e)||!this.treatFunctionsAsVarInScope(x)&&x.functions.indexOf(e)>-1){n=!0;break}if(x.var.push(e),this.inModule&&x.flags&Tt&&delete this.undefinedExports[e],x.flags&mr)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};vt.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};vt.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};vt.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(mr|wi|It))return t}};vt.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(mr|wi|It)&&!(t.flags&Ln))return t}};var br=function(t,i,n){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new dr(t,n)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},Ci=ce.prototype;Ci.startNode=function(){return new br(this,this.start,this.startLoc)};Ci.startNodeAt=function(e,t){return new br(this,e,t)};function Rc(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}Ci.finishNode=function(e,t){return Rc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};Ci.finishNodeAt=function(e,t,i,n){return Rc.call(this,e,t,i,n)};Ci.copyNode=function(e){var t=new br(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var zf="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Fc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Mc=Fc+" Extended_Pictographic",Oc=Mc,Dc=Oc+" EBase EComp EMod EPres ExtPict",Vc=Dc,Wf=Vc,Gf={9:Fc,10:Mc,11:Oc,12:Dc,13:Vc,14:Wf},qf="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",Kf={9:"",10:"",11:"",12:"",13:"",14:qf},gc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Bc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",jc=Bc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Uc=jc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Hc=Uc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",zc=Hc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Yf=zc+" "+zf,Qf={9:Bc,10:jc,11:Uc,12:Hc,13:zc,14:Yf},Wc={};function Zf(e){var t=Wc[e]={binary:xt(Gf[e]+" "+gc),binaryOfStrings:xt(Kf[e]),nonBinary:{General_Category:xt(gc),Script:xt(Qf[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(lr=0,wn=[9,10,11,12,13,14];lr<wn.length;lr+=1)bc=wn[lr],Zf(bc);var bc,lr,wn,$=ce.prototype,hr=function(t,i){this.parent=t,this.base=i||this};hr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var n=t;n;n=n.parent)if(i.base===n.base&&i!==n)return!0;return!1};hr.prototype.sibling=function(){return new hr(this.parent,this.base)};var tt=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=Wc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};tt.prototype.reset=function(t,i,n){var l=n.indexOf("v")!==-1,p=n.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=n,l&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=p&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=p&&this.parser.options.ecmaVersion>=9)};tt.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};tt.prototype.at=function(t,i){i===void 0&&(i=!1);var n=this.source,l=n.length;if(t>=l)return-1;var p=n.charCodeAt(t);if(!(i||this.switchU)||p<=55295||p>=57344||t+1>=l)return p;var d=n.charCodeAt(t+1);return d>=56320&&d<=57343?(p<<10)+d-56613888:p};tt.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var n=this.source,l=n.length;if(t>=l)return l;var p=n.charCodeAt(t),d;return!(i||this.switchU)||p<=55295||p>=57344||t+1>=l||(d=n.charCodeAt(t+1))<56320||d>57343?t+1:t+2};tt.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};tt.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};tt.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};tt.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};tt.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var n=this.pos,l=0,p=t;l<p.length;l+=1){var d=p[l],g=this.at(n,i);if(g===-1||g!==d)return!1;n=this.nextIndex(n,i)}return this.pos=n,!0};$.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,l=!1,p=0;p<i.length;p++){var d=i.charAt(p);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,p+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(n=!0),d==="v"&&(l=!0)}this.options.ecmaVersion>=15&&n&&l&&this.raise(e.start,"Invalid regular expression flag")};function Jf(e){for(var t in e)return!0;return!1}$.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Jf(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};$.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t];e.groupNames[n]||e.raise("Invalid named capture referenced")}};$.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new hr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};$.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};$.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};$.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};$.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};$.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};$.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var n=0,l=-1;if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(l=e.lastIntValue),e.eat(125)))return l!==-1&&l<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};$.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};$.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};$.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),n=e.eat(45);if(i||n){for(var l=0;l<i.length;l++){var p=i.charAt(l);i.indexOf(p,l+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(n){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var x=d.charAt(g);(d.indexOf(x,g+1)>-1||i.indexOf(x)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};$.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};$.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&Xf(i);)t+=ct(i),e.advance();return t};function Xf(e){return e===105||e===109||e===115}$.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};$.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};$.regexp_eatSyntaxCharacter=function(e){var t=e.current();return Gc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Gc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}$.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!Gc(i);)e.advance();return e.pos!==t};$.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};$.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var n=0,l=i;n<l.length;n+=1){var p=l[n];p.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};$.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};$.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=ct(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=ct(e.lastIntValue);return!0}return!1};$.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),em(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function em(e){return et(e,!0)||e===36||e===95}$.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),tm(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function tm(e){return yt(e,!0)||e===36||e===95||e===8204||e===8205}$.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};$.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};$.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};$.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};$.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};$.regexp_eatZero=function(e){return e.current()===48&&!xr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};$.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};$.regexp_eatControlLetter=function(e){var t=e.current();return qc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function qc(e){return e>=65&&e<=90||e>=97&&e<=122}$.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,n=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var l=e.lastIntValue;if(n&&l>=55296&&l<=56319){var p=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(l-55296)*1024+(d-56320)+65536,!0}e.pos=p,e.lastIntValue=l}return!0}if(n&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&im(e.lastIntValue))return!0;n&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function im(e){return e>=0&&e<=1114111}$.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};$.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var Kc=0,ut=1,Oe=2;$.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(rm(t))return e.lastIntValue=-1,e.advance(),ut;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var n;if(e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&n===Oe&&e.raise("Invalid property name"),n;e.raise("Invalid property name")}return Kc};function rm(e){return e===100||e===68||e===115||e===83||e===119||e===87}$.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),ut}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var l=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,l)}return Kc};$.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){Gt(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};$.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return ut;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return Oe;e.raise("Invalid property name")};$.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";Yc(t=e.current());)e.lastStringValue+=ct(t),e.advance();return e.lastStringValue!==""};function Yc(e){return qc(e)||e===95}$.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";nm(t=e.current());)e.lastStringValue+=ct(t),e.advance();return e.lastStringValue!==""};function nm(e){return Yc(e)||xr(e)}$.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};$.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===Oe&&e.raise("Negated character class may contain strings"),!0}return!1};$.regexp_classContents=function(e){return e.current()===93?ut:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),ut)};$.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};$.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||Jc(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current();return n!==93?(e.lastIntValue=n,e.advance(),!0):!1};$.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};$.regexp_classSetExpression=function(e){var t=ut,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===Oe&&(t=Oe);for(var n=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==Oe&&(t=ut);continue}e.raise("Invalid character in character class")}if(n!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(n!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===Oe&&(t=Oe)}};$.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue;return i!==-1&&n!==-1&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};$.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?ut:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};$.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e);if(e.eat(93))return i&&n===Oe&&e.raise("Negated character class may contain strings"),n;e.pos=t}if(e.eat(92)){var l=this.regexp_eatCharacterClassEscape(e);if(l)return l;e.pos=t}return null};$.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};$.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===Oe&&(t=Oe);return t};$.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?ut:Oe};$.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&am(i)||sm(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function am(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function sm(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}$.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return om(t)?(e.lastIntValue=t,e.advance(),!0):!1};function om(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}$.regexp_eatClassControlLetter=function(e){var t=e.current();return xr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};$.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};$.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;xr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function xr(e){return e>=48&&e<=57}$.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Qc(i=e.current());)e.lastIntValue=16*e.lastIntValue+Zc(i),e.advance();return e.pos!==t};function Qc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Zc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}$.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};$.regexp_eatOctalDigit=function(e){var t=e.current();return Jc(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function Jc(e){return e>=48&&e<=55}$.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var n=0;n<t;++n){var l=e.current();if(!Qc(l))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+Zc(l),e.advance()}return!0};var Rn=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new dr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},V=ce.prototype;V.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Rn(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};V.getToken=function(){return this.next(),new Rn(this)};typeof Symbol<"u"&&(V[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===f.eof,value:t}}}});V.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(f.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};V.readToken=function(e){return et(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};V.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};V.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};V.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,l=t;(n=kc(this.input,l,this.pos))>-1;)++this.curLine,l=this.lineStart=n;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};V.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!Wt(n);)n=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};V.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&Sc.test(String.fromCharCode(e)))++this.pos;else break e}}};V.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};V.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(f.ellipsis)):(++this.pos,this.finishToken(f.dot))};V.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(f.assign,2):this.finishOp(f.slash,1)};V.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=e===42?f.star:f.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,n=f.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(f.assign,i+1):this.finishOp(n,i)};V.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(f.assign,3)}return this.finishOp(e===124?f.logicalOR:f.logicalAND,2)}return t===61?this.finishOp(f.assign,2):this.finishOp(e===124?f.bitwiseOR:f.bitwiseAND,1)};V.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(f.assign,2):this.finishOp(f.bitwiseXOR,1)};V.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Ce.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(f.incDec,2):t===61?this.finishOp(f.assign,2):this.finishOp(f.plusMin,1)};V.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(f.assign,i+1):this.finishOp(f.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(f.relational,i))};V.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(f.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(f.arrow)):this.finishOp(e===61?f.eq:f.prefix,1)};V.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(f.questionDot,2)}if(t===63){if(e>=12){var n=this.input.charCodeAt(this.pos+2);if(n===61)return this.finishOp(f.assign,3)}return this.finishOp(f.coalesce,2)}}return this.finishOp(f.question,1)};V.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),et(t,!0)||t===92))return this.finishToken(f.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+ct(t)+"'")};V.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(f.parenL);case 41:return++this.pos,this.finishToken(f.parenR);case 59:return++this.pos,this.finishToken(f.semi);case 44:return++this.pos,this.finishToken(f.comma);case 91:return++this.pos,this.finishToken(f.bracketL);case 93:return++this.pos,this.finishToken(f.bracketR);case 123:return++this.pos,this.finishToken(f.braceL);case 125:return++this.pos,this.finishToken(f.braceR);case 58:return++this.pos,this.finishToken(f.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(f.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(f.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+ct(e)+"'")};V.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};V.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(Ce.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(n==="[")t=!0;else if(n==="]"&&t)t=!1;else if(n==="/"&&!t)break;e=n==="\\"}++this.pos}var l=this.input.slice(i,this.pos);++this.pos;var p=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(p);var g=this.regexpState||(this.regexpState=new tt(this));g.reset(i,l,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var x=null;try{x=new RegExp(l,d)}catch{}return this.finishToken(f.regexp,{pattern:l,flags:d,value:x})};V.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&t===void 0,l=i&&this.input.charCodeAt(this.pos)===48,p=this.pos,d=0,g=0,x=0,b=t??1/0;x<b;++x,++this.pos){var y=this.input.charCodeAt(this.pos),k=void 0;if(n&&y===95){l&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),x===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=y;continue}if(y>=97?k=y-97+10:y>=65?k=y-65+10:y>=48&&y<=57?k=y-48:k=1/0,k>=e)break;g=y,d=d*e+k}return n&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===p||t!=null&&this.pos-p!==t?null:d};function lm(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function Xc(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}V.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=Xc(this.input.slice(t,this.pos)),++this.pos):et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(f.num,i)};V.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var n=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&n===110){var l=Xc(this.input.slice(t,this.pos));return++this.pos,et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(f.num,l)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),n===46&&!i&&(++this.pos,this.readInt(10),n=this.input.charCodeAt(this.pos)),(n===69||n===101)&&!i&&(n=this.input.charCodeAt(++this.pos),(n===43||n===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var p=lm(this.input.slice(t,this.pos),i);return this.finishToken(f.num,p)};V.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};V.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var n=this.input.charCodeAt(this.pos);if(n===e)break;n===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):n===8232||n===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(Wt(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(f.string,t)};var eu={};V.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===eu)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};V.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw eu;this.raise(e,t)};V.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===f.template||this.type===f.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(f.dollarBraceL)):(++this.pos,this.finishToken(f.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(f.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(Wt(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};V.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(f.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};V.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return ct(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],l=parseInt(n,8);return l>255&&(n=n.slice(0,-1),l=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),(n!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(l)}return Wt(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};V.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};V.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,n=this.options.ecmaVersion>=6;this.pos<this.input.length;){var l=this.fullCharCodeAtPos();if(yt(l,n))this.pos+=l<=65535?1:2;else if(l===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var p=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?et:yt)(d,n)||this.invalidStringToken(p,"Invalid Unicode escape"),e+=ct(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};V.readWord=function(){var e=this.readWord1(),t=f.name;return this.keywords.test(e)&&(t=_n[e]),this.finishToken(t,e)};var cm="8.18.0";ce.acorn={Parser:ce,version:cm,defaultOptions:En,Position:Si,SourceLocation:dr,getLineInfo:Cc,Node:br,TokenType:z,tokTypes:f,keywordTypes:_n,TokContext:Ge,tokContexts:ee,isIdentifierChar:yt,isIdentifierStart:et,Token:Rn,isNewLine:Wt,lineBreak:Ce,lineBreakG:Pf,nonASCIIwhitespace:Sc};function tu(e,t){return ce.parse(e,t)}var Kt=null,Ei=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let n;return Kt!==null?(n=Kt,Kt=Kt.cursor,n.prev=t,n.next=i,n.cursor=this.cursor):n={prev:t,next:i,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=Kt,Kt=t}updateCursors(t,i,n,l){let{cursor:p}=this;for(;p!==null;)p.prev===t&&(p.prev=i),p.next===n&&(p.next=l),p=p.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let n of t){let l=e.createItem(n);i!==null?i.next=l:this.head=l,l.prev=i,i=l}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let l=n.next;n.next=l.next,t.call(i,l.data,l,this)}this.releaseCursor()}forEachRight(t,i=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let l=n.prev;n.prev=l.prev,t.call(i,l.data,l,this)}this.releaseCursor()}reduce(t,i,n=this){let l=this.allocateCursor(null,this.head),p=i,d;for(;l.next!==null;)d=l.next,l.next=d.next,p=t.call(n,p,d.data,d,this);return this.releaseCursor(),p}reduceRight(t,i,n=this){let l=this.allocateCursor(this.tail,null),p=i,d;for(;l.prev!==null;)d=l.prev,l.prev=d.prev,p=t.call(n,p,d.data,d,this);return this.releaseCursor(),p}some(t,i=this){for(let n=this.head;n!==null;n=n.next)if(t.call(i,n.data,n,this))return!0;return!1}map(t,i=this){let n=new e;for(let l=this.head;l!==null;l=l.next)n.appendData(t.call(i,l.data,l,this));return n}filter(t,i=this){let n=new e;for(let l=this.head;l!==null;l=l.next)t.call(i,l.data,l,this)&&n.appendData(l.data);return n}nextUntil(t,i,n=this){if(t===null)return;let l=this.allocateCursor(null,t);for(;l.next!==null;){let p=l.next;if(l.next=p.next,i.call(n,p.data,p,this))break}this.releaseCursor()}prevUntil(t,i,n=this){if(t===null)return;let l=this.allocateCursor(t,null);for(;l.prev!==null;){let p=l.prev;if(l.prev=p.prev,i.call(n,p.data,p,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function iu(e,t){let i=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var Fn=100,ru=60,nu="    ";function au({source:e,line:t,column:i,baseLine:n,baseColumn:l},p){function d(_,K){return b.slice(_,K).map((te,Y)=>String(_+Y+1).padStart(C)+" |"+te).join(`
`)}let g=`
`.repeat(Math.max(n-1,0)),x=" ".repeat(Math.max(l-1,0)),b=(g+x+e).split(/\r\n?|\n|\f/),y=Math.max(1,t-p)-1,k=Math.min(t+p,b.length+1),C=Math.max(4,String(k).length)+1,u=0;i+=(nu.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>Fn&&(u=i-ru+3,i=ru-2);for(let _=y;_<=k;_++)_>=0&&_<b.length&&(b[_]=b[_].replace(/\t/g,nu),b[_]=(u>0&&b[_].length>u?"\u2026":"")+b[_].substr(u,Fn-2)+(b[_].length>u+Fn-1?"\u2026":""));return[d(y,t),new Array(i+C+2).join("-")+"^",d(t,k)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Mn(e,t,i,n,l,p=1,d=1){return Object.assign(iu("SyntaxError",e),{source:t,offset:i,line:n,column:l,sourceFragment(x){return au({source:t,line:n,column:l,baseLine:p,baseColumn:d},isNaN(x)?0:x)},get formattedMessage(){return`Parse error: ${e}
`+au({source:t,line:n,column:l,baseLine:p,baseColumn:d},2)}})}function ye(e){return e>=48&&e<=57}function it(e){return ye(e)||e>=65&&e<=70||e>=97&&e<=102}function vr(e){return e>=65&&e<=90}function um(e){return e>=97&&e<=122}function pm(e){return vr(e)||um(e)}function hm(e){return e>=128}function yr(e){return pm(e)||hm(e)||e===95}function kr(e){return yr(e)||ye(e)||e===45}function dm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function Ai(e){return e===10||e===13||e===12}function rt(e){return Ai(e)||e===32||e===9}function Ee(e,t){return!(e!==92||Ai(t)||t===0)}function Sr(e,t,i){return e===45?yr(t)||t===45||Ee(t,i):yr(e)?!0:e===92?Ee(e,t):!1}function wr(e,t,i){return e===43||e===45?ye(t)?2:t===46&&ye(i)?3:0:e===46?ye(t)?2:0:ye(e)?1:0}function Cr(e){return e===65279||e===65534?1:0}var On=new Array(128),fm=128,Ti=130,Dn=131,Er=132,Vn=133;for(let e=0;e<On.length;e++)On[e]=rt(e)&&Ti||ye(e)&&Dn||yr(e)&&Er||dm(e)&&Vn||e||fm;function Ar(e){return e<128?On[e]:Er}function Yt(e,t){return t<e.length?e.charCodeAt(t):0}function Tr(e,t,i){return i===13&&Yt(e,t+1)===10?2:1}function jn(e,t,i){let n=e.charCodeAt(t);return vr(n)&&(n=n|32),n===i}function Lt(e,t,i,n){if(i-t!==n.length||t<0||i>e.length)return!1;for(let l=t;l<i;l++){let p=n.charCodeAt(l-t),d=e.charCodeAt(l);if(vr(d)&&(d=d|32),d!==p)return!1}return!0}function su(e,t){for(;t>=0&&rt(e.charCodeAt(t));t--);return t+1}function _i(e,t){for(;t<e.length&&rt(e.charCodeAt(t));t++);return t}function Bn(e,t){for(;t<e.length&&ye(e.charCodeAt(t));t++);return t}function ht(e,t){if(t+=2,it(Yt(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&it(Yt(e,t));t++);let i=Yt(e,t);rt(i)&&(t+=Tr(e,t,i))}return t}function Ii(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!kr(i)){if(Ee(i,Yt(e,t+1))){t=ht(e,t)-1;continue}break}}return t}function _r(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),ye(i)&&(t=Bn(e,t+1),i=e.charCodeAt(t)),i===46&&ye(e.charCodeAt(t+1))&&(t+=2,t=Bn(e,t)),jn(e,t,101)){let n=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(n=1,i=e.charCodeAt(t+2)),ye(i)&&(t=Bn(e,t+1+n+1))}return t}function Ir(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Ee(i,Yt(e,t+1))&&(t=ht(e,t))}return t}function Lr(e){if(e.length===1&&!it(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var Qt=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function Zt(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var ou=10,mm=12,lu=13;function cu(e){let t=e.source,i=t.length,n=t.length>0?Cr(t.charCodeAt(0)):0,l=Zt(e.lines,i),p=Zt(e.columns,i),d=e.startLine,g=e.startColumn;for(let x=n;x<i;x++){let b=t.charCodeAt(x);l[x]=d,p[x]=g++,(b===ou||b===lu||b===mm)&&(b===lu&&x+1<i&&t.charCodeAt(x+1)===ou&&(x++,l[x]=d,p[x]=g),d++,g=1)}l[i]=d,p[i]=g,e.lines=l,e.columns=p,e.computed=!0}var $r=class{constructor(t,i,n,l){this.setSource(t,i,n,l),this.lines=null,this.columns=null}setSource(t="",i=0,n=1,l=1){this.source=t,this.startOffset=i,this.startLine=n,this.startColumn=l,this.computed=!1}getLocation(t,i){return this.computed||cu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,n){return this.computed||cu(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var qe=16777215,Ke=24,$i=1,Nr=2,kt=new Uint8Array(32);kt[2]=22;kt[21]=22;kt[19]=20;kt[23]=24;var Ye=new Uint8Array(32);Ye[2]=$i;Ye[21]=$i;Ye[19]=$i;Ye[23]=$i;Ye[22]=Nr;Ye[20]=Nr;Ye[24]=Nr;function uu(e,t,i){return e<t?t:e>i?i:e}var Pr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let n=t.length,l=Zt(this.offsetAndType,t.length+1),p=Zt(this.balance,t.length+1),d=0,g=-1,x=0,b=t.length;this.offsetAndType=null,this.balance=null,p.fill(0),i(t,(y,k,C)=>{let u=d++;if(l[u]=y<<Ke|C,g===-1&&(g=k),p[u]=b,y===x){let _=p[b];p[b]=u,b=_,x=kt[l[_]>>Ke]}else this.isBlockOpenerTokenType(y)&&(b=u,x=kt[y])}),l[d]=0<<Ke|n,p[d]=d;for(let y=0;y<d;y++){let k=p[y];if(k<=y){let C=p[k];C!==y&&(p[y]=C)}else k>d&&(p[y]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=l,this.balance=p,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>Ke:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ke;if(n!==13&&n!==25&&t--===0)return n}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&qe:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ke;if(n!==13&&n!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Lt(this.source,this.offsetAndType[t-1]&qe,this.offsetAndType[t]&qe,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&qe:this.offsetAndType[this.tokenCount]&qe:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[uu(t,0,this.tokenCount)]&qe}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[uu(t,0,this.tokenCount)]>>Ke}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return Ye[t]===$i}isBlockCloserTokenType(t){return Ye[t]===Nr}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(Ye[i]===1){let n=this.balance[t],l=this.getTokenType(n);return kt[i]===l?n:-1}else if(Ye[i]===2){let n=this.balance[t],l=this.getTokenType(n);return kt[l]===i?n:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&qe,i=this.offsetAndType[i],this.tokenType=i>>Ke,this.tokenEnd=i&qe):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>Ke,this.tokenEnd=t&qe):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let n=t,l=0,p=0;e:for(;n<this.tokenCount;n++){if(l=this.balance[n],l<t)break e;switch(p=n>0?this.offsetAndType[n-1]&qe:this.firstCharOffset,i(this.source.charCodeAt(p))){case 1:break e;case 2:n++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[n]>>Ke)&&(n=l)}}this.skip(n-this.tokenIndex)}forEachToken(t){for(let i=0,n=this.firstCharOffset;i<this.tokenCount;i++){let l=n,p=this.offsetAndType[i],d=p&qe,g=p>>Ke;n=d,t(g,l,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,n,l,p)=>{t[p]={idx:p,type:Qt[i],chunk:this.source.substring(n,l),balance:this.balance[p]}}),t}};function Rr(e,t){function i(k){return k<g?e.charCodeAt(k):0}function n(){if(b=_r(e,b),Sr(i(b),i(b+1),i(b+2))){y=12,b=Ii(e,b);return}if(i(b)===37){y=11,b++;return}y=10}function l(){let k=b;if(b=Ii(e,b),Lt(e,k,b,"url")&&i(b)===40){if(b=_i(e,b+1),i(b)===34||i(b)===39){y=2,b=k+4;return}d();return}if(i(b)===40){y=2,b++;return}y=1}function p(k){for(k||(k=i(b++)),y=5;b<e.length;b++){let C=e.charCodeAt(b);switch(Ar(C)){case k:b++;return;case Ti:if(Ai(C)){b+=Tr(e,b,C),y=6;return}break;case 92:if(b===e.length-1)break;let u=i(b+1);Ai(u)?b+=Tr(e,b+1,u):Ee(C,u)&&(b=ht(e,b)-1);break}}}function d(){for(y=7,b=_i(e,b);b<e.length;b++){let k=e.charCodeAt(b);switch(Ar(k)){case 41:b++;return;case Ti:if(b=_i(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Ir(e,b),y=8;return;case 34:case 39:case 40:case Vn:b=Ir(e,b),y=8;return;case 92:if(Ee(k,i(b+1))){b=ht(e,b)-1;break}b=Ir(e,b),y=8;return}}}e=String(e||"");let g=e.length,x=Cr(i(0)),b=x,y;for(;b<g;){let k=e.charCodeAt(b);switch(Ar(k)){case Ti:y=13,b=_i(e,b+1);break;case 34:p();break;case 35:kr(i(b+1))||Ee(i(b+1),i(b+2))?(y=4,b=Ii(e,b+1)):(y=9,b++);break;case 39:p();break;case 40:y=21,b++;break;case 41:y=22,b++;break;case 43:wr(k,i(b+1),i(b+2))?n():(y=9,b++);break;case 44:y=18,b++;break;case 45:wr(k,i(b+1),i(b+2))?n():i(b+1)===45&&i(b+2)===62?(y=15,b=b+3):Sr(k,i(b+1),i(b+2))?l():(y=9,b++);break;case 46:wr(k,i(b+1),i(b+2))?n():(y=9,b++);break;case 47:i(b+1)===42?(y=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(y=9,b++);break;case 58:y=16,b++;break;case 59:y=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(y=14,b=b+4):(y=9,b++);break;case 64:Sr(i(b+1),i(b+2),i(b+3))?(y=3,b=Ii(e,b+1)):(y=9,b++);break;case 91:y=19,b++;break;case 92:Ee(k,i(b+1))?l():(y=9,b++);break;case 93:y=20,b++;break;case 123:y=23,b++;break;case 125:y=24,b++;break;case Dn:n();break;case Er:l();break;default:y=9,b++}t(y,x,x=b)}}function pu(e){let t=this.createList(),i=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let l=e.getNode.call(this,n);if(l===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,l,t,n),i=!1),t.push(l)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var ei=()=>{},gm=33,bm=35,Hn=59,hu=123,du=0,xm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},ym={createList(){return new Ei},createSingleNodeList(e){return new Ei().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function vm(e){return function(){return this[e]()}}function zn(e){let t=Object.create(null);for(let i of Object.keys(e)){let n=e[i],l=n.parse||n;l&&(t[i]=l)}return t}function km(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:zn(e.atrule),pseudo:zn(e.pseudo),node:zn(e.node)};for(let[i,n]of Object.entries(e.parseContext))switch(typeof n){case"function":t.context[i]=n;break;case"string":t.context[i]=vm(n);break}return{config:t,...t,...t.node}}function fu(e){let t="",i="<unknown>",n=!1,l=ei,p=!1,d=new $r,g=Object.assign(new Pr,km(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:pu,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(y){return y===hu?1:0},consumeUntilLeftCurlyBracketOrSemicolon(y){return y===hu||y===Hn?1:0},consumeUntilExclamationMarkOrSemicolon(y){return y===gm||y===Hn?1:0},consumeUntilSemicolonIncluded(y){return y===Hn?2:0},createList:ei,createSingleNodeList:ei,getFirstListNode:ei,getLastListNode:ei,parseWithFallback(y,k){let C=this.tokenIndex;try{return y.call(this)}catch(u){if(p)throw u;this.skip(C-this.tokenIndex);let _=k.call(this);return p=!0,l(u,_),p=!1,_}},lookupNonWSType(y){let k;do if(k=this.lookupType(y++),k!==13&&k!==25)return k;while(k!==du);return du},charCodeAt(y){return y>=0&&y<t.length?t.charCodeAt(y):0},substring(y,k){return t.substring(y,k)},substrToCursor(y){return this.source.substring(y,this.tokenStart)},cmpChar(y,k){return jn(t,y,k)},cmpStr(y,k,C){return Lt(t,y,k,C)},consume(y){let k=this.tokenStart;return this.eat(y),this.substrToCursor(k)},consumeFunctionName(){let y=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),y},consumeNumber(y){let k=t.substring(this.tokenStart,_r(t,this.tokenStart));return this.eat(y),k},eat(y){if(this.tokenType!==y){let k=Qt[y].slice(0,-6).replace(/-/g," ").replace(/^./,_=>_.toUpperCase()),C=`${/[[\](){}]/.test(k)?`"${k}"`:k} is expected`,u=this.tokenStart;switch(y){case 1:this.tokenType===2||this.tokenType===7?(u=this.tokenEnd-1,C="Identifier is expected but function found"):C="Identifier is expected";break;case 4:this.isDelim(bm)&&(this.next(),u++,C="Name is expected");break;case 11:this.tokenType===10&&(u=this.tokenEnd,C="Percent sign is expected");break}this.error(C,u)}this.next()},eatIdent(y){(this.tokenType!==1||this.lookupValue(0,y)===!1)&&this.error(`Identifier "${y}" is expected`),this.next()},eatDelim(y){this.isDelim(y)||this.error(`Delim "${String.fromCharCode(y)}" is expected`),this.next()},getLocation(y,k){return n?d.getLocationRange(y,k,i):null},getLocationFromList(y){if(n){let k=this.getFirstListNode(y),C=this.getLastListNode(y);return d.getLocationRange(k!==null?k.loc.start.offset-d.startOffset:this.tokenStart,C!==null?C.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(y,k){let C=typeof k<"u"&&k<t.length?d.getLocation(k):this.eof?d.getLocation(su(t,t.length-1)):d.getLocation(this.tokenStart);throw new Mn(y||"Unexpected input",t,C.offset,C.line,C.column,d.startLine,d.startColumn)}}),x=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:y=>g.getTokenType(y),getTokenTypeName:y=>Qt[g.getTokenType(y)],getTokenStart:y=>g.getTokenStart(y),getTokenEnd:y=>g.getTokenEnd(y),getTokenValue:y=>g.source.substring(g.getTokenStart(y),g.getTokenEnd(y)),substring:(y,k)=>g.source.substring(y,k),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:y=>g.getBlockTokenPairIndex(y),getLocation:y=>d.getLocation(y,i),getRangeLocation:(y,k)=>d.getLocationRange(y,k,i)});return Object.assign(function(y,k){t=y,k=k||{},g.setSource(t,Rr),d.setSource(t,k.offset,k.line,k.column),i=k.filename||"<unknown>",n=!!k.positions,l=typeof k.onParseError=="function"?k.onParseError:ei,p=!1,g.parseAtrulePrelude="parseAtrulePrelude"in k?!!k.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in k?!!k.parseRulePrelude:!0,g.parseValue="parseValue"in k?!!k.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in k?!!k.parseCustomProperty:!1;let{context:C="default",list:u=!0,onComment:_,onToken:K}=k;if(!(C in g.context))throw new Error("Unknown context `"+C+"`");Object.assign(g,u?ym:xm),Array.isArray(K)?g.forEachToken((Y,ge,se)=>{K.push({type:Y,start:ge,end:se})}):typeof K=="function"&&g.forEachToken(K.bind(x())),typeof _=="function"&&g.forEachToken((Y,ge,se)=>{if(Y===25){let Pe=g.getLocation(ge,se),Ze=Lt(t,se-2,se,"*/")?t.slice(ge+2,se-2):t.slice(ge+2,se);_(Ze,Pe)}});let te=g.context[C].call(g,k);return g.eof||g.error(),te},{SyntaxError:Mn,config:g.config})}var Wn={};N(Wn,{AtrulePrelude:()=>gu,Selector:()=>xu,Value:()=>Su});var Sm=35,wm=42,mu=43,Cm=45,Em=47,Am=117;function Pi(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,Am)&&this.cmpChar(this.tokenStart+1,mu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Em||t===wm||t===mu||t===Cm)return this.Operator();t===Sm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var gu={getNode:Pi};var Tm=35,_m=38,Im=42,Lm=43,$m=47,bu=46,Pm=62,Nm=124,Rm=126;function Fm(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Mm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===bu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case Lm:case Pm:case Rm:case $m:return this.Combinator();case bu:return this.ClassSelector();case Im:case Nm:return this.TypeSelector();case Tm:return this.IdSelector();case _m:return this.NestingSelector()}break}}}var xu={onWhiteSpace:Fm,getNode:Mm};function yu(){return this.createSingleNodeList(this.Raw(null,!1))}function vu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function ku(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var Su={getNode:Pi,onWhiteSpace(e,t){ku(e)&&(e.value=" "+e.value),ku(t.last)&&(t.last.value+=" ")},expression:yu,var:vu};var Om=new Set(["none","and","not","or"]),wu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);Om.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var Cu={parse:{prelude:null,block(){return this.Block(!0)}}};function Gn(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Eu={layer(){this.skipSC();let e=this.createList(),t=Gn.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Gn.call(this,this.Declaration,()=>Gn.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},Au={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Eu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Eu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Tu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var _u={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Iu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Lu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var $u={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Pu={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Nu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Ru={container:wu,"font-face":Cu,import:Au,layer:Tu,media:_u,nest:Iu,page:Lu,scope:$u,"starting-style":Pu,supports:Nu};function Fu(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Pt={parse(){return this.createSingleNodeList(this.SelectorList())}},qn={parse(){return this.createSingleNodeList(this.Selector())}},Dm={parse(){return this.createSingleNodeList(this.Identifier())}},Vm={parse:Fu},Fr={parse(){return this.createSingleNodeList(this.Nth())}},Mu={dir:Dm,has:Pt,lang:Vm,matches:Pt,is:Pt,"-moz-any":Pt,"-webkit-any":Pt,where:Pt,not:Pt,"nth-child":Fr,"nth-last-child":Fr,"nth-last-of-type":Fr,"nth-of-type":Fr,slotted:qn,host:qn,"host-context":qn};var Uo={};N(Uo,{AnPlusB:()=>Yn,Atrule:()=>Jn,AtrulePrelude:()=>ta,AttributeSelector:()=>aa,Block:()=>la,Brackets:()=>pa,CDC:()=>fa,CDO:()=>ba,ClassSelector:()=>va,Combinator:()=>wa,Comment:()=>Aa,Condition:()=>Ia,Declaration:()=>Pa,DeclarationList:()=>Ma,Dimension:()=>Va,Feature:()=>Ua,FeatureFunction:()=>Wa,FeatureRange:()=>Ya,Function:()=>Ja,GeneralEnclosed:()=>ts,Hash:()=>ns,IdSelector:()=>us,Identifier:()=>os,Layer:()=>ds,LayerList:()=>gs,MediaQuery:()=>ys,MediaQueryList:()=>Ss,NestingSelector:()=>Es,Nth:()=>_s,Number:()=>$s,Operator:()=>Rs,Parentheses:()=>Os,Percentage:()=>Bs,PseudoClassSelector:()=>Hs,PseudoElementSelector:()=>Gs,Ratio:()=>Ys,Raw:()=>Js,Rule:()=>to,Scope:()=>no,Selector:()=>oo,SelectorList:()=>uo,String:()=>mo,StyleSheet:()=>xo,SupportsDeclaration:()=>ko,TypeSelector:()=>Eo,UnicodeRange:()=>Io,Url:()=>No,Value:()=>Mo,WhiteSpace:()=>Vo});var Zn={};N(Zn,{generate:()=>Qn,name:()=>jm,parse:()=>Yn,structure:()=>Um});var st=43,$e=45,Mr=110,Nt=!0,Bm=!1;function Or(e,t){let i=this.tokenStart+e,n=this.charCodeAt(i);for((n===st||n===$e)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)ye(this.charCodeAt(i))||this.error("Integer is expected",i)}function ti(e){return Or.call(this,0,e)}function wt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Mr:i="N is expected";break;case $e:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function Kn(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(st,e)||this.isDelim($e,e)){t=this.isDelim(st,e)?st:$e;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),ti.call(this,Nt))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==st&&i!==$e&&this.error("Number sign is expected")),ti.call(this,t!==0),t===$e?"-"+this.consume(10):this.consume(10)}var jm="AnPlusB",Um={a:[String,null],b:[String,null]};function Yn(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)ti.call(this,Bm),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,$e))switch(t="-1",wt.call(this,1,Mr),this.tokenEnd-this.tokenStart){case 2:this.next(),i=Kn.call(this);break;case 3:wt.call(this,2,$e),this.next(),this.skipSC(),ti.call(this,Nt),i="-"+this.consume(10);break;default:wt.call(this,2,$e),Or.call(this,3,Nt),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(st)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(st)&&(n=1,this.next()),wt.call(this,0,Mr),this.tokenEnd-this.tokenStart){case 1:this.next(),i=Kn.call(this);break;case 2:wt.call(this,1,$e),this.next(),this.skipSC(),ti.call(this,Nt),i="-"+this.consume(10);break;default:wt.call(this,1,$e),Or.call(this,2,Nt),this.next(),i=this.substrToCursor(e+n+1)}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),l=n===st||n===$e,p=this.tokenStart+l;for(;p<this.tokenEnd&&ye(this.charCodeAt(p));p++);p===this.tokenStart+l&&this.error("Integer is expected",this.tokenStart+l),wt.call(this,p-this.tokenStart,Mr),t=this.substring(e,p),p+1===this.tokenEnd?(this.next(),i=Kn.call(this)):(wt.call(this,p-this.tokenStart+1,$e),p+2===this.tokenEnd?(this.next(),this.skipSC(),ti.call(this,Nt),i="-"+this.consume(10)):(Or.call(this,p-this.tokenStart+2,Nt),this.next(),i=this.substrToCursor(p+1)))}else this.error();return t!==null&&t.charCodeAt(0)===st&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===st&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function Qn(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var ea={};N(ea,{generate:()=>Xn,name:()=>zm,parse:()=>Jn,structure:()=>Gm,walkContext:()=>Wm});function Ou(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Hm(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var zm="Atrule",Wm="atrule",Gm={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function Jn(e=!1){let t=this.tokenStart,i,n,l=null,p=null;switch(this.eat(3),i=this.substrToCursor(t+1),n=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?l=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Ou):l=Ou.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?p=this.atrule[n].block.call(this,e):p=this.Block(Hm.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:l,block:p}}function Xn(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var ra={};N(ra,{generate:()=>ia,name:()=>qm,parse:()=>ta,structure:()=>Ym,walkContext:()=>Km});var qm="AtrulePrelude",Km="atrulePrelude",Ym={children:[[]]};function ta(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function ia(e){this.children(e)}var oa={};N(oa,{generate:()=>sa,name:()=>tg,parse:()=>aa,structure:()=>ig});var Qm=36,Du=42,Dr=61,Zm=94,na=124,Jm=126;function Xm(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Du)?(t=!0,this.next()):this.isDelim(na)||this.eat(1),this.isDelim(na)?this.charCodeAt(this.tokenStart+1)!==Dr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function eg(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==Dr&&t!==Jm&&t!==Zm&&t!==Qm&&t!==Du&&t!==na&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==Dr&&(this.isDelim(Dr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var tg="AttributeSelector",ig={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function aa(){let e=this.tokenStart,t,i=null,n=null,l=null;return this.eat(19),this.skipSC(),t=Xm.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=eg.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(l=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:n,flags:l}}function sa(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var ua={};N(ua,{generate:()=>ca,name:()=>ag,parse:()=>la,structure:()=>og,walkContext:()=>sg});var rg=38;function ju(){return this.Raw(null,!0)}function Vu(){return this.parseWithFallback(this.Rule,ju)}function Bu(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function ng(){if(this.tokenType===17)return Bu.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Bu);return this.tokenType===17&&this.next(),e}var ag="Block",sg="block",og={children:[["Atrule","Rule","Declaration"]]};function la(e){let t=e?ng:Vu,i=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),ju));break;default:e&&this.isDelim(rg)?n.push(Vu.call(this)):n.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:n}}function ca(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var da={};N(da,{generate:()=>ha,name:()=>lg,parse:()=>pa,structure:()=>cg});var lg="Brackets",cg={children:[[]]};function pa(e,t){let i=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:n}}function ha(e){this.token(9,"["),this.children(e),this.token(9,"]")}var ga={};N(ga,{generate:()=>ma,name:()=>ug,parse:()=>fa,structure:()=>pg});var ug="CDC",pg=[];function fa(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function ma(){this.token(15,"-->")}var ya={};N(ya,{generate:()=>xa,name:()=>hg,parse:()=>ba,structure:()=>dg});var hg="CDO",dg=[];function ba(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function xa(){this.token(14,"<!--")}var Sa={};N(Sa,{generate:()=>ka,name:()=>mg,parse:()=>va,structure:()=>gg});var fg=46,mg="ClassSelector",gg={name:String};function va(){return this.eatDelim(fg),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function ka(e){this.token(9,"."),this.token(1,e.name)}var Ea={};N(Ea,{generate:()=>Ca,name:()=>vg,parse:()=>wa,structure:()=>kg});var bg=43,Uu=47,xg=62,yg=126,vg="Combinator",kg={name:String};function wa(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case xg:case bg:case yg:this.next();break;case Uu:this.next(),this.eatIdent("deep"),this.eatDelim(Uu);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function Ca(e){this.tokenize(e.name)}var _a={};N(_a,{generate:()=>Ta,name:()=>Cg,parse:()=>Aa,structure:()=>Eg});var Sg=42,wg=47,Cg="Comment",Eg={value:String};function Aa(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===Sg&&this.charCodeAt(t-1)===wg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function Ta(e){this.token(25,"/*"+e.value+"*/")}var $a={};N($a,{generate:()=>La,name:()=>Tg,parse:()=>Ia,structure:()=>_g});var Ag=new Set([16,22,0]),Tg="Condition",_g={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Hu(e){return this.lookupTypeNonSC(1)===1&&Ag.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var Ig={media:Hu,container:Hu,supports(){return this.SupportsDeclaration()}};function Ia(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>Ig[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let n=this.Condition(e);return this.eat(22),n},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function La(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var Ra={};N(Ra,{generate:()=>Na,name:()=>Dg,parse:()=>Pa,structure:()=>Bg,walkContext:()=>Vg});var zu=45;function Wu(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===zu&&e.charCodeAt(t+1)===zu}var qu=33,Lg=35,$g=36,Pg=38,Ng=42,Rg=43,Gu=47;function Fg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Mg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Og(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(qu)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Dg="Declaration",Vg="declaration",Bg={important:[Boolean,String],property:String,value:["Value","Raw"]};function Pa(){let e=this.tokenStart,t=this.tokenIndex,i=jg.call(this),n=Wu(i),l=n?this.parseCustomProperty:this.parseValue,p=n?Mg:Fg,d=!1,g;this.skipSC(),this.eat(16);let x=this.tokenIndex;if(n||this.skipSC(),l?g=this.parseWithFallback(Og,p):g=p.call(this,this.tokenIndex),n&&g.type==="Value"&&g.children.isEmpty){for(let b=x-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(qu)&&(d=Ug.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function Na(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function jg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Ng:case $g:case Rg:case Lg:case Pg:this.next();break;case Gu:this.next(),this.isDelim(Gu)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function Ug(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var Da={};N(Da,{generate:()=>Oa,name:()=>zg,parse:()=>Ma,structure:()=>Wg});var Hg=38;function Fa(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var zg="DeclarationList",Wg={children:[["Declaration","Atrule","Rule"]]};function Ma(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Fa));break;default:this.isDelim(Hg)?e.push(this.parseWithFallback(this.Rule,Fa)):e.push(this.parseWithFallback(this.Declaration,Fa))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function Oa(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var ja={};N(ja,{generate:()=>Ba,name:()=>Gg,parse:()=>Va,structure:()=>qg});var Gg="Dimension",qg={value:String,unit:String};function Va(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Ba(e){this.token(12,e.value+e.unit)}var za={};N(za,{generate:()=>Ha,name:()=>Yg,parse:()=>Ua,structure:()=>Qg});var Kg=47,Yg="Feature",Qg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function Ua(e){let t=this.tokenStart,i,n=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?n=this.Ratio():n=this.Number();break;case 12:n=this.Dimension();break;case 1:n=this.Identifier();break;case 2:n=this.parseWithFallback(()=>{let l=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Kg)&&this.error(),l},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:n}}function Ha(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var qa={};N(qa,{generate:()=>Ga,name:()=>Zg,parse:()=>Wa,structure:()=>Jg});var Zg="FeatureFunction",Jg={kind:String,feature:String,value:["Declaration","Selector"]};function Xg(e,t){let n=(this.features[e]||{})[t];return typeof n!="function"&&this.error(`Unknown feature ${t}()`),n}function Wa(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),n=Xg.call(this,e,i.toLowerCase());this.skipSC();let l=this.parseWithFallback(()=>{let p=this.tokenIndex,d=n.call(this);return this.eof===!1&&this.isBalanceEdge(p)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:l}}function Ga(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var Za={};N(Za,{generate:()=>Qa,name:()=>i0,parse:()=>Ya,structure:()=>r0});var Ku=47,e0=60,Yu=61,t0=62,i0="FeatureRange",r0={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function Ka(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(Ku,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Ku)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Qu(e){if(this.skipSC(),this.isDelim(e0)||this.isDelim(t0)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(Yu)?(this.next(),t+"="):t}if(this.isDelim(Yu))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function Ya(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=Ka.call(this),n=Qu.call(this,i.type==="Identifier"),l=Ka.call(this),p=null,d=null;return this.lookupNonWSType(0)!==22&&(p=Qu.call(this),d=Ka.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:n,middle:l,rightComparison:p,right:d}}function Qa(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var es={};N(es,{generate:()=>Xa,name:()=>n0,parse:()=>Ja,structure:()=>s0,walkContext:()=>a0});var n0="Function",a0="function",s0={name:String,children:[[]]};function Ja(e,t){let i=this.tokenStart,n=this.consumeFunctionName(),l=n.toLowerCase(),p;return p=t.hasOwnProperty(l)?t[l].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:n,children:p}}function Xa(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var rs={};N(rs,{generate:()=>is,name:()=>o0,parse:()=>ts,structure:()=>l0});var o0="GeneralEnclosed",l0={kind:String,function:[String,null],children:[[]]};function ts(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let n=this.parseWithFallback(()=>{let l=this.tokenIndex,p=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(l)===!1&&this.error(),p},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:n}}function is(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var ss={};N(ss,{generate:()=>as,name:()=>u0,parse:()=>ns,structure:()=>p0,xxx:()=>c0});var c0="XXX",u0="Hash",p0={value:String};function ns(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function as(e){this.token(4,"#"+e.value)}var cs={};N(cs,{generate:()=>ls,name:()=>h0,parse:()=>os,structure:()=>d0});var h0="Identifier",d0={name:String};function os(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function ls(e){this.token(1,e.name)}var hs={};N(hs,{generate:()=>ps,name:()=>f0,parse:()=>us,structure:()=>m0});var f0="IdSelector",m0={name:String};function us(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function ps(e){this.token(9,"#"+e.name)}var ms={};N(ms,{generate:()=>fs,name:()=>b0,parse:()=>ds,structure:()=>x0});var g0=46,b0="Layer",x0={name:String};function ds(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(g0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function fs(e){this.tokenize(e.name)}var xs={};N(xs,{generate:()=>bs,name:()=>y0,parse:()=>gs,structure:()=>v0});var y0="LayerList",v0={children:[["Layer"]]};function gs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function bs(e){this.children(e,()=>this.token(18,","))}var ks={};N(ks,{generate:()=>vs,name:()=>k0,parse:()=>ys,structure:()=>S0});var k0="MediaQuery",S0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function ys(){let e=this.tokenStart,t=null,i=null,n=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let l=this.consume(1),p=l.toLowerCase();switch(p==="not"||p==="only"?(this.skipSC(),t=p,i=this.consume(1)):i=l,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),n=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{n=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:n}}function vs(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Cs={};N(Cs,{generate:()=>ws,name:()=>w0,parse:()=>Ss,structure:()=>C0});var w0="MediaQueryList",C0={children:[["MediaQuery"]]};function Ss(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function ws(e){this.children(e,()=>this.token(18,","))}var Ts={};N(Ts,{generate:()=>As,name:()=>A0,parse:()=>Es,structure:()=>T0});var E0=38,A0="NestingSelector",T0={};function Es(){let e=this.tokenStart;return this.eatDelim(E0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function As(){this.token(9,"&")}var Ls={};N(Ls,{generate:()=>Is,name:()=>_0,parse:()=>_s,structure:()=>I0});var _0="Nth",I0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function _s(){this.skipSC();let e=this.tokenStart,t=e,i=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:i}}function Is(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Ns={};N(Ns,{generate:()=>Ps,name:()=>L0,parse:()=>$s,structure:()=>$0});var L0="Number",$0={value:String};function $s(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function Ps(e){this.token(10,e.value)}var Ms={};N(Ms,{generate:()=>Fs,name:()=>P0,parse:()=>Rs,structure:()=>N0});var P0="Operator",N0={value:String};function Rs(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Fs(e){this.tokenize(e.value)}var Vs={};N(Vs,{generate:()=>Ds,name:()=>R0,parse:()=>Os,structure:()=>F0});var R0="Parentheses",F0={children:[[]]};function Os(e,t){let i=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:n}}function Ds(e){this.token(21,"("),this.children(e),this.token(22,")")}var Us={};N(Us,{generate:()=>js,name:()=>M0,parse:()=>Bs,structure:()=>O0});var M0="Percentage",O0={value:String};function Bs(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function js(e){this.token(11,e.value+"%")}var Ws={};N(Ws,{generate:()=>zs,name:()=>D0,parse:()=>Hs,structure:()=>B0,walkContext:()=>V0});var D0="PseudoClassSelector",V0="function",B0={name:String,children:[["Raw"],null]};function Hs(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function zs(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Ks={};N(Ks,{generate:()=>qs,name:()=>j0,parse:()=>Gs,structure:()=>H0,walkContext:()=>U0});var j0="PseudoElementSelector",U0="function",H0={name:String,children:[["Raw"],null]};function Gs(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function qs(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Zs={};N(Zs,{generate:()=>Qs,name:()=>z0,parse:()=>Ys,structure:()=>W0});var Zu=47;function Ju(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var z0="Ratio",W0={left:["Number","Function"],right:["Number","Function",null]};function Ys(){let e=this.tokenStart,t=Ju.call(this),i=null;return this.skipSC(),this.isDelim(Zu)&&(this.eatDelim(Zu),i=Ju.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function Qs(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var eo={};N(eo,{generate:()=>Xs,name:()=>q0,parse:()=>Js,structure:()=>K0});function G0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var q0="Raw",K0={value:String};function Js(e,t){let i=this.getTokenStart(this.tokenIndex),n;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?n=G0.call(this):n=this.tokenStart,{type:"Raw",loc:this.getLocation(i,n),value:this.substring(i,n)}}function Xs(e){this.tokenize(e.value)}var ro={};N(ro,{generate:()=>io,name:()=>Q0,parse:()=>to,structure:()=>J0,walkContext:()=>Z0});function Xu(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function Y0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var Q0="Rule",Z0="rule",J0={prelude:["SelectorList","Raw"],block:["Block"]};function to(){let e=this.tokenIndex,t=this.tokenStart,i,n;return this.parseRulePrelude?i=this.parseWithFallback(Y0,Xu):i=Xu.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:n}}function io(e){this.node(e.prelude),this.node(e.block)}var so={};N(so,{generate:()=>ao,name:()=>X0,parse:()=>no,structure:()=>eb});var X0="Scope",eb={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function no(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function ao(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var co={};N(co,{generate:()=>lo,name:()=>tb,parse:()=>oo,structure:()=>ib});var tb="Selector",ib={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function oo(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function lo(e){this.children(e)}var ho={};N(ho,{generate:()=>po,name:()=>rb,parse:()=>uo,structure:()=>ab,walkContext:()=>nb});var rb="SelectorList",nb="selector",ab={children:[["Selector","Raw"]]};function uo(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function po(e){this.children(e,()=>this.token(18,","))}var bo={};N(bo,{generate:()=>go,name:()=>ob,parse:()=>mo,structure:()=>lb});var fo=92,ep=34,tp=39;function Vr(e){let t=e.length,i=e.charCodeAt(0),n=i===ep||i===tp?1:0,l=n===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,p="";for(let d=n;d<=l;d++){let g=e.charCodeAt(d);if(g===fo){if(d===l){d!==t-1&&(p=e.substr(d+1));break}if(g=e.charCodeAt(++d),Ee(fo,g)){let x=d-1,b=ht(e,x);d=b-1,p+=Lr(e.substring(x+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else p+=e[d]}return p}function ip(e,t){let i=t?"'":'"',n=t?tp:ep,l="",p=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){l+="\uFFFD";continue}if(g<=31||g===127){l+="\\"+g.toString(16),p=!0;continue}g===n||g===fo?(l+="\\"+e.charAt(d),p=!1):(p&&(it(g)||rt(g))&&(l+=" "),l+=e.charAt(d),p=!1)}return i+l+i}var ob="String",lb={value:String};function mo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Vr(this.consume(5))}}function go(e){this.token(5,ip(e.value))}var vo={};N(vo,{generate:()=>yo,name:()=>ub,parse:()=>xo,structure:()=>hb,walkContext:()=>pb});var cb=33;function rp(){return this.Raw(null,!1)}var ub="StyleSheet",pb="stylesheet",hb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function xo(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==cb){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,rp);break;default:i=this.parseWithFallback(this.Rule,rp)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function yo(e){this.children(e)}var wo={};N(wo,{generate:()=>So,name:()=>db,parse:()=>ko,structure:()=>fb});var db="SupportsDeclaration",fb={declaration:"Declaration"};function ko(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function So(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var To={};N(To,{generate:()=>Ao,name:()=>gb,parse:()=>Eo,structure:()=>bb});var mb=42,np=124;function Co(){this.tokenType!==1&&this.isDelim(mb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var gb="TypeSelector",bb={name:String};function Eo(){let e=this.tokenStart;return this.isDelim(np)?(this.next(),Co.call(this)):(Co.call(this),this.isDelim(np)&&(this.next(),Co.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Ao(e){this.tokenize(e.name)}var $o={};N($o,{generate:()=>Lo,name:()=>vb,parse:()=>Io,structure:()=>kb});var ap=43,sp=45,_o=63;function Ni(e,t){let i=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let l=this.charCodeAt(n);if(l===sp&&t&&i!==0)return Ni.call(this,e+i+1,!1),-1;it(l)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",n),++i>6&&this.error("Too many hex digits",n)}return this.next(),i}function Br(e){let t=0;for(;this.isDelim(_o);)++t>e&&this.error("Too many question marks"),this.next()}function xb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===ap?"Plus sign":"Hyphen minus")+" is expected")}function yb(){let e=0;switch(this.tokenType){case 10:if(e=Ni.call(this,1,!0),this.isDelim(_o)){Br.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){xb.call(this,sp),Ni.call(this,1,!1);break}break;case 12:e=Ni.call(this,1,!0),e>0&&Br.call(this,6-e);break;default:if(this.eatDelim(ap),this.tokenType===1){e=Ni.call(this,0,!0),e>0&&Br.call(this,6-e);break}if(this.isDelim(_o)){this.next(),Br.call(this,5);break}this.error("Hex digit or question mark is expected")}}var vb="UnicodeRange",kb={value:String};function Io(){let e=this.tokenStart;return this.eatIdent("u"),yb.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Lo(e){this.tokenize(e.value)}var Fo={};N(Fo,{generate:()=>Ro,name:()=>Tb,parse:()=>No,structure:()=>_b});var Sb=32,Po=92,wb=34,Cb=39,Eb=40,op=41;function lp(e){let t=e.length,i=4,n=e.charCodeAt(t-1)===op?t-2:t-1,l="";for(;i<n&&rt(e.charCodeAt(i));)i++;for(;i<n&&rt(e.charCodeAt(n));)n--;for(let p=i;p<=n;p++){let d=e.charCodeAt(p);if(d===Po){if(p===n){p!==t-1&&(l=e.substr(p+1));break}if(d=e.charCodeAt(++p),Ee(Po,d)){let g=p-1,x=ht(e,g);p=x-1,l+=Lr(e.substring(g+1,x))}else d===13&&e.charCodeAt(p+1)===10&&p++}else l+=e[p]}return l}function cp(e){let t="",i=!1;for(let n=0;n<e.length;n++){let l=e.charCodeAt(n);if(l===0){t+="\uFFFD";continue}if(l<=31||l===127){t+="\\"+l.toString(16),i=!0;continue}l===Sb||l===Po||l===wb||l===Cb||l===Eb||l===op?(t+="\\"+e.charAt(n),i=!1):(i&&it(l)&&(t+=" "),t+=e.charAt(n),i=!1)}return"url("+t+")"}var Tb="Url",_b={value:String};function No(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=lp(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Vr(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function Ro(e){this.token(7,cp(e.value))}var Do={};N(Do,{generate:()=>Oo,name:()=>Ib,parse:()=>Mo,structure:()=>Lb});var Ib="Value",Lb={children:[[]]};function Mo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function Oo(e){this.children(e)}var jo={};N(jo,{generate:()=>Bo,name:()=>Pb,parse:()=>Vo,structure:()=>Nb});var $b=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Pb="WhiteSpace",Nb={value:String};function Vo(){return this.eat(13),$b}function Bo(e){this.token(13,e.value)}var up={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Wn,atrule:Ru,pseudo:Mu,node:Uo};var pp=fu(up);var{hasOwnProperty:Ho}=Object.prototype,Ri=function(){};function hp(e){return typeof e=="function"?e:Ri}function dp(e,t){return function(i,n,l){i.type===t&&e.call(this,i,n,l)}}function Rb(e,t){let i=t.structure,n=[];for(let l in i){if(Ho.call(i,l)===!1)continue;let p=i[l],d={name:l,type:!1,nullable:!1};Array.isArray(p)||(p=[p]);for(let g of p)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&n.push(d)}return n.length?{context:t.walkContext,fields:n}:null}function Fb(e){let t={};for(let i in e.node)if(Ho.call(e.node,i)){let n=e.node[i];if(!n.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Rb(i,n)}return t}function fp(e,t){let i=e.fields.slice(),n=e.context,l=typeof n=="string";return t&&i.reverse(),function(p,d,g,x){let b;l&&(b=d[n],d[n]=p);for(let y of i){let k=p[y.name];if(!y.nullable||k){if(y.type==="list"){if(t?k.reduceRight(x,!1):k.reduce(x,!1))return!0}else if(g(k))return!0}}l&&(d[n]=b)}}function mp({StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:l}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:l}}}function gp(e){let t=Fb(e),i={},n={},l=Symbol("break-walk"),p=Symbol("skip-node");for(let b in t)Ho.call(t,b)&&t[b]!==null&&(i[b]=fp(t[b],!1),n[b]=fp(t[b],!0));let d=mp(i),g=mp(n),x=function(b,y){function k(Y,ge,se){let Pe=C.call(te,Y,ge,se);return Pe===l?!0:Pe===p?!1:!!(_.hasOwnProperty(Y.type)&&_[Y.type](Y,te,k,K)||u.call(te,Y,ge,se)===l)}let C=Ri,u=Ri,_=i,K=(Y,ge,se,Pe)=>Y||k(ge,se,Pe),te={break:l,skip:p,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof y=="function")C=y;else if(y&&(C=hp(y.enter),u=hp(y.leave),y.reverse&&(_=n),y.visit)){if(d.hasOwnProperty(y.visit))_=y.reverse?g[y.visit]:d[y.visit];else if(!t.hasOwnProperty(y.visit))throw new Error("Bad value `"+y.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");C=dp(C,y.visit),u=dp(u,y.visit)}if(C===Ri&&u===Ri)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");k(b)};return x.break=l,x.skip=p,x.find=function(b,y){let k=null;return x(b,function(C,u,_){if(y.call(this,C,u,_))return k=C,l}),k},x.findLast=function(b,y){let k=null;return x(b,{reverse:!0,enter(C,u,_){if(y.call(this,C,u,_))return k=C,l}}),k},x.findAll=function(b,y){let k=[];return x(b,function(C,u,_){y.call(this,C,u,_)&&k.push(C)}),k},x}var zo={};N(zo,{AnPlusB:()=>Zn,Atrule:()=>ea,AtrulePrelude:()=>ra,AttributeSelector:()=>oa,Block:()=>ua,Brackets:()=>da,CDC:()=>ga,CDO:()=>ya,ClassSelector:()=>Sa,Combinator:()=>Ea,Comment:()=>_a,Condition:()=>$a,Declaration:()=>Ra,DeclarationList:()=>Da,Dimension:()=>ja,Feature:()=>za,FeatureFunction:()=>qa,FeatureRange:()=>Za,Function:()=>es,GeneralEnclosed:()=>rs,Hash:()=>ss,IdSelector:()=>hs,Identifier:()=>cs,Layer:()=>ms,LayerList:()=>xs,MediaQuery:()=>ks,MediaQueryList:()=>Cs,NestingSelector:()=>Ts,Nth:()=>Ls,Number:()=>Ns,Operator:()=>Ms,Parentheses:()=>Vs,Percentage:()=>Us,PseudoClassSelector:()=>Ws,PseudoElementSelector:()=>Ks,Ratio:()=>Zs,Raw:()=>eo,Rule:()=>ro,Scope:()=>so,Selector:()=>co,SelectorList:()=>ho,String:()=>bo,StyleSheet:()=>vo,SupportsDeclaration:()=>wo,TypeSelector:()=>To,UnicodeRange:()=>$o,Url:()=>Fo,Value:()=>Do,WhiteSpace:()=>jo});var bp={node:zo};var xp=gp(bp);var Vp=Af(Op(),1),Dp=new Set(["Atrule","Selector","Declaration"]);function Bp(e){let t=new Vp.SourceMapGenerator,i={line:1,column:0},n={line:0,column:0},l={line:1,column:0},p={generated:l},d=1,g=0,x=!1,b=e.node;e.node=function(C){if(C.loc&&C.loc.start&&Dp.has(C.type)){let u=C.loc.start.line,_=C.loc.start.column-1;(n.line!==u||n.column!==_)&&(n.line=u,n.column=_,i.line=d,i.column=g,x&&(x=!1,(i.line!==l.line||i.column!==l.column)&&t.addMapping(p)),x=!0,t.addMapping({source:C.loc.source,original:n,generated:i}))}b.call(this,C),x&&Dp.has(C.type)&&(l.line=d,l.column=g)};let y=e.emit;e.emit=function(C,u,_){for(let K=0;K<C.length;K++)C.charCodeAt(K)===10?(d++,g=0):g++;y(C,u,_)};let k=e.result;return e.result=function(){return x&&t.addMapping(p),{css:k(),map:t}},e}var zr={};N(zr,{safe:()=>Jo,spec:()=>rx});var ex=43,tx=45,Zo=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),jp=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],ix=jp.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Up(e){let t=new Set(e.map(([i,n])=>Zo(i)<<16|Zo(n)));return function(i,n,l){let p=Zo(n,l),d=l.charCodeAt(0),g=d===tx&&n!==1&&n!==2&&n!==15||d===ex?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|p);return p|g}}var rx=Up(jp),Jo=Up(ix);var nx=92;function ax(e,t){if(typeof t=="function"){let i=null;e.children.forEach(n=>{i!==null&&t.call(this,i),this.node(n),i=n});return}e.children.forEach(this.node,this)}function Hp(e){let t=new Map;for(let[i,n]of Object.entries(e.node))typeof(n.generate||n)=="function"&&t.set(i,n.generate||n);return function(i,n){let l="",p=0,d={node(x){if(t.has(x.type))t.get(x.type).call(g,x);else throw new Error("Unknown node type: "+x.type)},tokenBefore:Jo,token(x,b,y){p=this.tokenBefore(p,x,b),!y&&p&1&&this.emit(" ",13,!0),this.emit(b,x,!1),x===9&&b.charCodeAt(0)===nx&&this.emit(`
`,13,!0)},emit(x){l+=x},result(){return l}};n&&(typeof n.decorator=="function"&&(d=n.decorator(d)),n.sourceMap&&(d=Bp(d)),n.mode in zr&&(d.tokenBefore=zr[n.mode]));let g={node:x=>d.node(x),children:ax,token:(x,b)=>d.token(x,b),tokenize:x=>Rr(x,(b,y,k)=>{d.token(b,x.slice(y,k),y!==0)})};return d.node(i),d.result()}}var Xo={};N(Xo,{AnPlusB:()=>Qn,Atrule:()=>Xn,AtrulePrelude:()=>ia,AttributeSelector:()=>sa,Block:()=>ca,Brackets:()=>ha,CDC:()=>ma,CDO:()=>xa,ClassSelector:()=>ka,Combinator:()=>Ca,Comment:()=>Ta,Condition:()=>La,Declaration:()=>Na,DeclarationList:()=>Oa,Dimension:()=>Ba,Feature:()=>Ha,FeatureFunction:()=>Ga,FeatureRange:()=>Qa,Function:()=>Xa,GeneralEnclosed:()=>is,Hash:()=>as,IdSelector:()=>ps,Identifier:()=>ls,Layer:()=>fs,LayerList:()=>bs,MediaQuery:()=>vs,MediaQueryList:()=>ws,NestingSelector:()=>As,Nth:()=>Is,Number:()=>Ps,Operator:()=>Fs,Parentheses:()=>Ds,Percentage:()=>js,PseudoClassSelector:()=>zs,PseudoElementSelector:()=>qs,Ratio:()=>Qs,Raw:()=>Xs,Rule:()=>io,Scope:()=>ao,Selector:()=>lo,SelectorList:()=>po,String:()=>go,StyleSheet:()=>yo,SupportsDeclaration:()=>So,TypeSelector:()=>Ao,UnicodeRange:()=>Lo,Url:()=>Ro,Value:()=>Oo,WhiteSpace:()=>Bo});var zp={node:Xo};var el=Hp(zp);var Oi="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),sx=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),Gp=new Set(["__proto__","prototype","constructor"]);function Wr(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(n=>Wr(n,t)):i&&typeof i=="object"&&Wr(i,t)}}function ri(e){return e?e.computed?e.property?.value:e.property?.name:""}function ni(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!ni(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=ni(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(ni);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let n=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||Gp.has(String(n)))throw new Error("Property static tidak aman");t[n]=ni(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function Wp(e,t){let i=null;return Wr(e,n=>{if(i)return;let l=n.type==="VariableDeclarator"&&n.id.name===t,p=n.type==="AssignmentExpression"&&n.left.type==="MemberExpression"&&["window","globalThis"].includes(n.left.object.name)&&ri(n.left)===t;if(l||p)try{i=ni(l?n.init:n.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function ox(e){let t=new WeakMap,i=(l,p,d=null)=>{l&&(l.type==="Identifier"?p.bindings.set(l.name,d):l.type==="RestElement"?i(l.argument,p):l.type==="AssignmentPattern"?i(l.left,p):l.type==="ArrayPattern"?l.elements.forEach(g=>i(g,p)):l.type==="ObjectPattern"&&l.properties.forEach(g=>i(g.value||g.argument,p)))},n=(l,p)=>{if(!l||typeof l!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(l.type);l.type==="FunctionDeclaration"&&i(l.id,p);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(l.type),x=g?{parent:p,bindings:new Map,functionScope:null}:p;g&&(x.functionScope=d||l.type==="Program"?x:p.functionScope),t.set(l,x),d&&(l.id&&i(l.id,x),l.params.forEach(b=>i(b,x))),l.type==="CatchClause"&&i(l.param,x),l.type==="VariableDeclaration"&&l.declarations.forEach(b=>i(b.id,l.kind==="var"?x.functionScope:x,b.init));for(let b of Object.values(l))Array.isArray(b)?b.forEach(y=>n(y,x)):b&&typeof b=="object"&&n(b,x)};return n(e,null),t}function lx(e){let t=[],i=ox(e),n=(g,x=new Set)=>{if(g?.type!=="Identifier"||x.has(g))return g;x.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return n(b.bindings.get(g.name),x);return g},l=g=>(g=n(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&ri(g)==="document"),p=g=>(g=n(g),g?.type==="MemberExpression"?l(g.object)&&ri(g)==="body":g?.type==="CallExpression"&&l(g.callee.object)&&ri(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=n(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||ri(g.callee)==="MutationObserver"));return Wr(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||ri(g.callee)!=="observe"||!d(g.callee.object)||!p(g.arguments[0]))return;let x;try{x=ni(n(g.arguments[1]))}catch{}let b=x?.attributes??(x?.attributeFilter!==void 0||x?.attributeOldValue!==void 0);(!x||b&&(!Array.isArray(x.attributeFilter)||x.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function qp(e){let t=[...e.children],i=t.slice(t.findLastIndex(n=>n.type==="Combinator")+1);return i.some(n=>n.type==="PseudoElementSelector")?[]:i.flatMap(n=>n.type==="TypeSelector"&&["html","body"].includes(n.name.toLowerCase())?[n.name.toLowerCase()]:n.type==="PseudoClassSelector"&&n.name==="root"?["html"]:n.type==="PseudoClassSelector"&&["is","where"].includes(n.name)&&n.children?[...n.children].flatMap(l=>l.type==="SelectorList"?[...l.children].flatMap(qp):[]):[])}function cx(e){let t=[],i;try{i=pp(e)}catch(p){return["CSS tidak terbaca: "+p.message]}let n=[!0],l={html:{},body:{}};return xp(i,{enter(p){if(p.type==="Atrule"){p.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=p.prelude?el(p.prelude):"",x=p.name.toLowerCase()==="media"&&g.split(",").every(b=>{let y=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||y&&Number(y[1])>960});n.push(n.at(-1)&&!x)}if(p.type!=="Rule"||!n.at(-1))return;let d=new Set(p.prelude?.type==="SelectorList"?[...p.prelude.children].flatMap(qp):[]);p.block.children.forEach(g=>{if(g.type!=="Declaration")return;let x=el(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(x)&&(l[b].overflow=!0),g.property==="height"&&x==="100dvh"&&(l[b].height=!0)})},leave(p){p.type==="Atrule"&&n.pop()}}),Object.values(l).some(p=>p.height&&p.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function tl({doc:e,scripts:t=[],css:i="",config:n,schema:l,requireObjects:p=!0}){let d=[],g=[];for(let C of t)try{let u=tu(C,{ecmaVersion:"latest",sourceType:"script"});g.push(u),d.push(...lx(u))}catch(u){d.push("Sintaks JavaScript gagal kompilasi: "+u.message)}n??(n=g.map(C=>Wp(C,"CONFIG")).find(Boolean)),l??(l=g.map(C=>Wp(C,"SVE_SCHEMA")).find(Boolean)),p&&!n&&d.push("CONFIG static tidak terbaca"),p&&!l&&d.push("SVE_SCHEMA static tidak terbaca");let x=l?.template?.type==="custom-page";if(l){Array.isArray(l.sections)||d.push("SVE_SCHEMA.sections wajib array");let C=Array.isArray(l.sections)?l.sections:[],u=C.map(_=>_?.id);new Set(u).size!==u.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),x||(Oi.forEach(_=>{u.includes(_)||d.push("Canonical section hilang: "+_)}),u.forEach(_=>{Oi.includes(_)||d.push("Section bukan canonical: "+_)}));for(let _ of C){if(_?.fields!==void 0&&!Array.isArray(_.fields)){d.push("Section fields wajib array");continue}for(let K of _?.fields||[])if(sx.has(K?.type||"text")||d.push("Field type tidak didukung: "+K?.type),!!["repeater","repeater-image"].includes(K?.type)){if(!Array.isArray(K.fields)){d.push("Repeater tanpa fields[]");continue}for(let te of K.fields)(!te?.key||Gp.has(te.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(te?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(n&&!x){let C=n.sectionOrder;(!Array.isArray(C)||C.length!==Oi.length||!Oi.every(u=>C.includes(u))||C[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let y=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(y)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(y)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(y)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let k=["html","body"].map(C=>`${C}{${e?.querySelector(C)?.getAttribute("style")||""}}`).join("");d.push(...cx(i+k));for(let C of e?.querySelectorAll("audio")||[])C.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let C of e?.querySelectorAll("iframe")||[]){let u="";try{u=new URL(C.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(u)&&C.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:n,schema:l}}var ux="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-background-primary sve-button-text-primary sve-button-background-secondary sve-button-text-secondary".split(" "),px=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function hx(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(n=>n[1]));return i.size?[...ux,...px].filter(n=>i.has(n)&&!new RegExp(`var\\(\\s*--${n}\\s*[,)]`).test(t)).map(n=>`Token ${n} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function dx(e){let t=[];for(let i of e?.querySelectorAll?.("[style]")||[]){if(i.hasAttribute?.("data-sve-literal-color"))continue;let p=(i.getAttribute("style")||"").replace(/var\([^)]*\)/g,"").match(/#[0-9a-f]{3,8}\b/gi);if(!p)continue;let d=i.getAttribute("data-pencil-id"),g=i.getAttribute("data-pencil-name"),x=d?` pada node ${d}${g?" ("+g+")":""}`:"";t.push(`Warna belum tertoken: ${[...new Set(p)].join(", ")}${x}. Panel Color SVE tidak akan mengubahnya`)}return t}function Kp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),n=t(i),l=[...n.querySelectorAll("style")],p=[...n.querySelectorAll("script")],d=tl({doc:n,css:l.map(b=>b.textContent).join(`
`),scripts:p.map(b=>b.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),n.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!n.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!n.body)&&g.push("Elemen body wajib ada"),n.head?.querySelector("title")||g.push("Title wajib ada di head"),n.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(l.length!==1||!n.head?.contains(l[0]))&&g.push("Wajib tepat satu style di head"),(p.length!==1||!n.body?.contains(p[0]))&&g.push("Wajib tepat satu script di body"),p[0]&&p[0]!==n.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),p.some(b=>b.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let b=new Set([...n.querySelectorAll("[data-section-id]")].map(y=>y.getAttribute("data-section-id")));Oi.forEach(y=>{b.has(y)||g.push("Markup section hilang: "+y)})}g.push(...hx(d.html??i));let x=dx(n);return{...d,blockers:[...new Set(g)],warnings:x,html:i}}var fx="sve-config",mx="sve-config-ack";function Yp({document:e,window:t,getConfig:i,syncImages:n,metrics:l}){let p=null,d=null,g=!1,x=null,b=null,y=0,k=null,C=null,u=!1,_=null,K=null;function te(){if(p?.isConnected)return p;let H=[...e.querySelectorAll("iframe")];return p=H.find(Q=>Q.getAttribute("title")==="HTML Mode preview")||H.find(Q=>Q.id==="preview")||H.find(Q=>(Q.getAttribute("srcdoc")||"").length>0)||null,p}function Y(H){if(!H)return null;try{let Q=H.contentWindow;return Q&&typeof Q.SVE_REFRESH=="function"?Q:null}catch{return null}}function ge(){u||(u=!0,t.addEventListener("message",H=>{let Q=H.data;!Q||Q.type!==mx||H.origin!=="null"&&H.origin!==t.location?.origin||k!==null&&Q.id!==k||(k=null,C!==null&&(t.clearTimeout(C),C=null),_===null&&(_=!0),l.previewAckCount=(l.previewAckCount||0)+1,Q.error&&console.warn("[SVE] Preview menolak CONFIG:",Q.error))}))}function se(){if(_===null){_=!1,l.previewUnsupported=!0;try{K?.()}catch(H){console.warn("[SVE] onUnsupported gagal",H)}}}function Pe(H,Q){ge();let Je=JSON.parse(Q),Ne=++y;k=Ne,H.contentWindow.postMessage({type:fx,id:Ne,config:Je},"*"),l.previewMessageCount=(l.previewMessageCount||0)+1,_===null&&C===null&&(C=t.setTimeout(()=>{C=null,k!==null&&se()},400))}function Ze(H,Q,Je){let Ne=JSON.parse(Je);if(Q.CONFIG=Ne,Q.SVE_REFRESH?.(Ne),_=!0,l.previewDirectCount=(l.previewDirectCount||0)+1,g)try{H.contentDocument&&n(H.contentDocument)}catch{}}function ai(){d!==null&&t.cancelAnimationFrame(d),d=null;let H=te(),Q=i();if(!H||!Q)return;let Je=JSON.stringify(Q);if(!(Je===x&&H===b&&!g)){try{let Ne=Y(H);Ne?Ze(H,Ne,Je):Pe(H,Je),x=Je,b=H,l.previewRefreshCount=(l.previewRefreshCount||0)+1}catch(Ne){console.warn("[SVE] Preview refresh gagal",Ne)}g=!1}}return{request({images:H=!1,force:Q=!1}={}){g||(g=H),Q&&(x=null,b=null),d===null&&(d=t.requestAnimationFrame(ai))},document(){try{return te()?.contentDocument||null}catch{return null}},supported(){return _},onUnsupported(H){K=H},invalidate(){p=null,x=null,b=null},flush:ai}}(function(){"use strict";let e="sve77",t="0.32.5",n=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),l="https://nikahin.myscalev.com/home#paket",p="6282175274118",d="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",x=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let k=(r,a=document)=>a.querySelector(r),C=(r,a=document)=>Array.from(a.querySelectorAll(r)),u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let _=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-background-primary","#332a24"],["Button Primary","Text","--sve-button-text-primary","#ffffff"],["Button Secondary","Background","--sve-button-background-secondary","#ffffff"],["Button Secondary","Text","--sve-button-text-secondary","#332a24"]],K=Array.from({length:31},(r,a)=>12+a*2+"px"),te=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],Y=["100","200","300","400","500","600","700","800","900"],ge=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],se=ge.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),Pe=[{target:"heading",variable:"--sve-font-heading"},{target:"body",variable:"--sve-font-body"}],Ze=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],ai=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),H=new Set(["__proto__","prototype","constructor"]),Q=12,Je=240,Ne=1e4;function mt(r){let a=String(r||"").trim();if(!a||a.length>Je||a.includes("..")||a.startsWith(".")||a.endsWith("."))return null;let s=a.split(".");if(!s.length||s.length>Q)return null;for(let o of s){if(!o||H.has(o))return null;if(/^\d+$/.test(o)){let c=Number(o);if(!Number.isSafeInteger(c)||c<0||c>Ne)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let Di=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,il=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,Qp=4096;function Gr(r){return Di.lastIndex=0,Di.test(String(r||""))}function Zp(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;Di.lastIndex=0;let h=0,m=0,v;for(;v=Di.exec(c);){h+=1;let S=v.index+v[0].length,w=S;for(;w<c.length&&/[A-Za-z0-9+/=]/.test(c[w]);)w+=1;m+=w-S}h&&a.push({where:s,count:h,approxKb:Math.max(1,Math.round(m*.75/1024))})}),a}function Jp(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;il.lastIndex=0;let h=0,m=0,v;for(;v=il.exec(c);){let S=v[0].length;S<=Qp||Gr(v[0])||(h+=1,m=Math.max(m,S))}h&&a.push({where:s,count:h,approxKb:Math.max(1,Math.round(m/1024))})}),a}function rl(r){return r.map(a=>a.where+" ("+a.count+"x, \xB1"+a.approxKb+" KB)").join(", ")}let qr=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Xp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},nl=["auto","cover","contain"];function eh(r){return r==="fill"?"cover":r==="fit"?"contain":nl.includes(r)?r:"auto"}function al(r=""){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="${A(r)}"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `}function sl(r){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="section-arrow-icon ${r==="up"?"section-arrow-up":"section-arrow-down"}"
      >
        <path
          d="M10 16L6 12M6 12L10 8M6 12H19"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `}function th(){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="section-drag-icon"
      >
        <circle cx="7" cy="5" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="5" r="1.35" fill="currentColor"></circle>
        <circle cx="7" cy="10" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="10" r="1.35" fill="currentColor"></circle>
        <circle cx="7" cy="15" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="15" r="1.35" fill="currentColor"></circle>
      </svg>
    `}function A(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function si(r,a=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),a)}}function Ft(r,a=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:a}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function ol(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function Xe(r){return!!(r&&r.isConnected)}function ih(r){if(!r)return null;try{if(typeof r.getWrapperElement=="function"){let a=r.getWrapperElement();if(a)return a}if(typeof r.getTextArea=="function"){let a=r.getTextArea();if(a)return a.closest?.(".CodeMirror")||a}}catch{}return null}function ll(r){let a=ih(r);return a?Xe(a):!0}function Mt(){let r=u.nativeCache;Object.keys(r).forEach(a=>{r[a]&&!Xe(r[a])&&(r[a]=null)})}function gt(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Ot(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,a=>a.toUpperCase()).trim()}function gx(){}function B(r,a){if(r==null||!a)return;let s=mt(a);if(!s)return;let o=r;for(let c of s){if(o==null)return;let h=/^\d+$/.test(c)?Number(c):c;if(!Object.prototype.hasOwnProperty.call(o,h))return;o=o[h]}return o}function Ue(r,a,s){let o=mt(a);if(!r||!o)return!1;let c=r;for(let v=0;v<o.length-1;v++){let S=o[v],w=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(c,w)||c[w]===null||c[w]===void 0)&&(c[w]=/^\d+$/.test(o[v+1])?[]:Object.create(null)),typeof c[w]!="object")return!1;c=c[w]}let h=o.at(-1),m=/^\d+$/.test(h)?Number(h):h;return c[m]=s,!0}function Ct(r){let a=String(r||"").trim();if(!a)return"";try{/^https?:\/\//i.test(a)&&(a=new URL(a).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{a=decodeURIComponent(a)}catch{}return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function Kr(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function rh(){let r=C('input[type="text"], input:not([type])').filter(a=>Kr(a));return r.length?r.find(a=>String(a.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function nh(){let r=C("a[href]").filter(a=>!a.closest("#"+e));for(let a of r){let s=a,o="";for(let c=0;c<4&&s;c+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let c=new URL(a.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(c.hostname)&&!/scalev\.(?:com|id)$/i.test(c.hostname))continue;let h=c.pathname.split("/").filter(Boolean),m=Ct(h.at(-1)||"");if(m)return m}catch{}}return""}function Et(){let r=rh(),a=Ct(r?.value);if(a)return u.scalevSlug=a,a;let s=nh();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function Yr(r,a){let s=String(a||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),c=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&c.endsWith("weddingid")||/wedding\s*id/.test(o)}function ah(){let r=new Set;try{ke().forEach(a=>{(a.fields||[]).forEach(s=>{s.type!=="repeater"&&Yr(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&B(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&B(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function Qr(r){C('[data-auto-wedding-id="1"]').forEach(a=>{a.value!==r&&(a.value=r),a.setAttribute("readonly","")})}function oi(r,a={}){let s=Ct(r||Et());if(!s)return!1;u.scalevSlug=s;let o=ah();if(!u.config||!o.length)return u.pendingWeddingIdSlug=s,Qr(s),!1;let c=!1;if(o.forEach(m=>{B(u.config,m)!==s&&(Ue(u.config,m,s),c=!0)}),Qr(s),!c)return u.pendingWeddingIdSlug="",!1;let h=Xr().length>0;return a.commit!==!1&&h&&u.configRange?.editor?(u.pendingWeddingIdSlug="",Te(a.silent?void 0:"Wedding ID mengikuti Slug URL"),Qr(s),!0):(u.pendingWeddingIdSlug=s,!0)}function cl(){let r=Ct(u.pendingWeddingIdSlug||u.scalevSlug||Et());return r?oi(r,{commit:!0,silent:!0}):!1}let sh=si(()=>{let r=Et();r&&oi(r,{commit:!0})},450);function Vi(){if(Mt(),Xe(u.nativeCache.save)||Xe(u.nativeCache.publish))return{save:Xe(u.nativeCache.save)?u.nativeCache.save:null,publish:Xe(u.nativeCache.publish)?u.nativeCache.publish:null};let r=C("button").filter(c=>!c.closest("#"+e)),a=c=>(c.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(c=>{let h=a(c);return h==="simpan"||h==="save"})||null,o=r.find(c=>{let h=a(c);return h.includes("simpan & terbitkan")||h.includes("simpan dan terbitkan")||h==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=o,{save:s,publish:o}}function oh(r,a){if(!r)return a?.parentElement||null;if(!a)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=a;o;){if(s.has(o))return o;o=o.parentElement}return null}function ul(r,a){if(Mt(),Xe(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&a&&r.parentElement===a.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=oh(r,a);if(!s)return r?.parentElement||a?.parentElement||null;let o=s;for(let c=0;c<4&&o;c++,o=o.parentElement){let h=o.getBoundingClientRect?.();if(h&&h.top>=0&&h.top<180&&h.height<110)return u.nativeCache.toolbarHost=o,o}return u.nativeCache.toolbarHost=s,s}function Zr(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let a=!!u.open;r.style.setProperty("display",a?"none":"",a?"important":""),r.setAttribute("aria-hidden",a?"true":"false"),r.tabIndex=a?-1:0}function pl(){let{save:r,publish:a}=Vi(),s=a||r;if(!s)return!1;let o=ul(r,a);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let c=document.getElementById(e+"-toolbar-toggle");return c||(c=s.cloneNode(!1),c.id=e+"-toolbar-toggle",c.type="button",c.disabled=!1,c.removeAttribute("disabled"),c.setAttribute("aria-controls",e+"-dock"),c.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),c.setAttribute("aria-pressed","false"),c.textContent="Visual Editor",c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),u.open?mh():Dt(!0)})),c.parentElement!==o&&(a&&a.parentElement===o?a.insertAdjacentElement("afterend",c):r&&r.parentElement===o?r.insertAdjacentElement("afterend",c):o.appendChild(c)),c.classList.toggle("sve-toolbar-active",u.open),c.setAttribute("aria-pressed",u.open?"true":"false"),Zr(),u.open&&requestAnimationFrame(()=>fl(!0)),!0}function Jr(){let a=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return a||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function lh(){if(Mt(),Xe(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=C("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),c=s.getBoundingClientRect(),h=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&c.top>=-2&&c.top<=4&&c.height>=36&&c.height<=64&&c.width>=window.innerWidth*.7&&h.includes("landing page studio")});if(!r.length)return null;let a=r.sort((s,o)=>{let c=s.getBoundingClientRect(),h=o.getBoundingClientRect();return c.height-h.height||c.top-h.top})[0];return u.nativeCache.globalHeader=a||null,a||null}function Bi(){let r=lh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function ch(){if(Mt(),Xe(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:a}=Vi(),s=a||r;if(!s)return Jr();let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let m=o.getBoundingClientRect();m.top>=36&&m.top<=130&&m.width>=window.innerWidth*.68&&m.height>=window.innerHeight*.62&&(c=o)}o=o.parentElement}let h=c||Jr();return u.nativeCache.workspaceRoot=h||null,h}function uh(){let a=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return a>0?a:Math.min(400,window.innerWidth*.32)}function hl(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function ji(r){let a=document.querySelector('[data-sve77-page-root="1"]'),s=ch();if(a&&a!==s&&hl(a),s)if(r){let o=getComputedStyle(s),c=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",c?"positioned":"flow")}else hl(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>fl(r))}function ph(){if(Mt(),Xe(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:a}=Vi(),s=a||r;if(!s)return null;let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let h=getComputedStyle(o),m=o.getBoundingClientRect();if(h.position==="fixed"&&m.top>=36&&m.top<=70&&m.height>=48&&m.height<=92&&m.width>=Math.min(520,window.innerWidth*.42)){c=o;break}}o=o.parentElement}return u.nativeCache.topToolbar=c||null,c}function dl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function fl(r){let{save:a,publish:s}=Vi(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||ul(a,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let c=document.querySelector('[data-sve77-top-toolbar="1"]'),h=ph();if(c&&c!==h&&dl(c),!h)return;if(!r){dl(h);return}let m=Math.ceil(uh());h.setAttribute("data-sve77-top-toolbar","1"),h.style.setProperty("right",m+"px","important"),h.style.setProperty("box-sizing","border-box","important"),h.style.setProperty("transition","right .16s ease","important")}function ml(){Ft(()=>{if(u.open)try{let r=Et();r&&oi(r,{commit:!0,silent:!0}),cl()}catch{}},1200)}function gl(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=Se())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{le()}catch{}ml()}function hh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{Bi(),ji(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),gl(),performance.mark("sve-panel-paint-end"),fh()}})})}function dh(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){gl();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&Se(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&le()}catch{}performance.mark("sve-prewarm-end"),ml()}function fh(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(a=>String(a.name).startsWith("sve-")).map(a=>({name:a.name,startTime:Math.round(a.startTime*100)/100}))}catch{}}function Ui(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=Ft(dh,1200))}function Dt(r){if(!r&&!xe())return;u.open=!!r;let a=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(a?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),Zr(),u.open){u.prewarmScheduled&&(ol(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),hh();return}requestAnimationFrame(()=>{try{ji(!1)}catch{}}),Ui()}function mh(){Dt(!1)}function Xr(){return[...new Set(C(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Hi(){let r=Xr();if(u.allEditors=r,!r.length)return!1;let a={html:null,css:null,js:null,head:null};return C("label").forEach(s=>{let o=s.querySelector(".CodeMirror")?.CodeMirror;if(!o)return;let c=(s.querySelector(":scope > span")?.textContent||s.querySelector("span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();c==="body html"?a.html=o:c==="css"?a.css=o:c==="javascript"?a.js=o:c.includes("additional head")&&(a.head=o)}),r.forEach(s=>{let o=s.getValue?.()||"";!a.js&&(o.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(o))&&(a.js=s),!a.html&&(o.includes("data-sve-section")||/<section[\s>]/i.test(o))&&(a.html=s),!a.css&&(o.includes("--sve-background-primary")||o.includes("--sve-font-heading"))&&(a.css=s)}),a.html=a.html||r[0]||null,a.css=a.css||r[1]||null,a.js=a.js||r[2]||null,a.head=a.head||r[3]||null,u.editors=a,jh(),!0}function D(r){return u.editors[r]?.getValue?.()||""}function zi(r,a=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(s){s.dispatchEvent(new Event("input",{bubbles:!0})),a&&s.dispatchEvent(new Event("change",{bubbles:!0}));return}let o=r._handlers?.change;if(!Array.isArray(o))return;let c={from:{line:0,ch:0},to:{line:0,ch:0},text:[],removed:[],origin:"sve-wake"};o.forEach(h=>{if(!(typeof h!="function"||h.__sve))try{h(r,c)}catch{}})}catch{}}function gh(r,a,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(a),r.save?.()}),zi(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}Yi(),_l()}}function ot(r,a){gh(u.editors[r],a)}function bh(){return new URL(n.endpoint)}function xh(r,a=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!a&&s.origin!==bh().origin?"":s.href}catch{return""}}function yh(r){if(!r||typeof r!="object")return null;let a=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(a)||!s?null:{id:a,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:xh(r.source_url||r.sourceUrl)}}function vh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(yh).filter(Boolean)}async function kh(r,a={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),n.timeoutMs);try{return await fetch(r,{...a,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function Sh(r,a={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=a.method||"GET";return new Promise((o,c)=>{GM_xmlhttpRequest({method:s,url:r,data:a.body,headers:a.headers||{},timeout:n.timeoutMs,onload:h=>{let m=Number(h.status),v=Number.isInteger(m)&&m>=200&&m<=599?m:200,S=String(h.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),w=String(h.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(h.responseText||"",{status:v,statusText:S,headers:{"Content-Type":w}}))},ontimeout:()=>c(new DOMException("The operation timed out","AbortError")),onerror:()=>c(new TypeError("Userscript request failed"))})})}async function en(r,a={}){if(typeof GM_xmlhttpRequest=="function")try{return await Sh(r,a)}catch{}return await kh(r,a)}async function bl(r=!1){let a=u.templateLibrary;if(!r&&a.status==="ready"&&a.loadedAt&&Date.now()-a.loadedAt<3e5)return a.templates;a.status="loading",a.error="";try{let s=await en(n.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let c=vh(o);if(!c.length)throw new Error("Library belum memiliki template aktif");return a.templates=c,a.loadedAt=Date.now(),a.status="ready",c}catch(s){return a.templates=[],a.status="error",a.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),a.templates}}function wh(){return C('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let a=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="kode"||a==="code"||a.includes("kode html")})||null}async function Ch(){if(Hi()&&u.editors.html)return!0;wh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(a=>window.setTimeout(a,120)),Hi()&&u.editors.html)return!0;return!1}function Eh(r){return Kp(r,a=>new DOMParser().parseFromString(a,"text/html"))}function bx(r,a){let s=String(a||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let c=xl(r,r.indexOf("{",o.index));if(!c)return null;try{return yl(c.text)}catch{return null}}function Ah(){let r=C('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,c="";for(let h=0;h<5&&o;h+=1,o=o.parentElement)c+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(c)})[0]||r[0]||null}function Th(r){let a=Ah();if(!a)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),a.files=s.files,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}))}function Vt(r){let a=["style","audio","compatibility"],s=r||"content",o=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let c=document.getElementById(e);if(C(".tab",c).forEach(h=>{h.classList.toggle("active",h.dataset.tab===r)}),o){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}le()}async function _h(r,a,s){if(!xe())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=u.templateLibrary,c=Eh(await r.text());if(c.blockers.length)throw console.error("[SVE] Template library validation failed",c.blockers),new Error(c.blockers[0]);if(!await Ch())throw new Error("Buka tab Kode terlebih dahulu");let h={html:D("html"),css:D("css"),js:D("js"),head:D("head")};Th(r);let m=Date.now(),v=!1;for(;Date.now()-m<4500;){await new Promise(E=>window.setTimeout(E,140)),Hi();let S=D("html"),w=D("js");if(S!==h.html||w!==h.js){v=!0;break}}if(!v)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=h,o.importedId=a||"local-import",o.importedName=s||r.name||"Template lokal",Se(),He(),Vt("content")}async function Ih(r){let a=u.templateLibrary,s=a.templates.find(c=>c.id===r),o=c=>{a.previousSource=null,a.importedId="",a.importedName="",a.status="error",a.error=c,u.uiPrepared=!1,le()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}a.status="loading",a.error="",u.uiPrepared=!1,le();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let c=await en(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",c.status),!c.ok)throw new Error("HTTP "+c.status);let h=await c.text();console.log("[SVE] Source length:",h.length);let m=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",v=new File([h],m,{type:"text/html"});await _h(v,s.id,s.name),a.error="",a.status="ready",Vt("content")}catch(c){console.error("[SVE] Import gagal:",c),o("Import gagal: "+String(c?.message||"source tidak terbaca"))}}function xx(){let r=u.templateLibrary.previousSource;r&&xe()&&(ot("html",r.html),ot("css",r.css),ot("js",r.js),ot("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",Se(),He(),Vt("library"))}function Lh(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(a=>{ot(a,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,Se(),He(),u.uiPrepared=!1,le()}function xl(r,a){let s=0,o=null,c=!1,h=!1,m=!1;for(let v=a;v<r.length;v++){let S=r[v],w=r[v+1];if(h){S===`
`&&(h=!1);continue}if(m){S==="*"&&w==="/"&&(m=!1,v++);continue}if(o){if(c){c=!1;continue}if(S==="\\"){c=!0;continue}S===o&&(o=null);continue}if(S==="/"&&w==="/"){h=!0,v++;continue}if(S==="/"&&w==="*"){m=!0,v++;continue}if(S==='"'||S==="'"||S==="`"){o=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:a,end:v+1,text:r.slice(a,v+1)}}return null}function yl(r){let a=0,s=T=>{throw new Error(T+" @"+a)};function o(){for(;a<r.length;){let T=r[a],L=r[a+1];if(/\s/.test(T)){a++;continue}if(T==="/"&&L==="/"){for(a+=2;a<r.length&&r[a]!==`
`;)a++;continue}if(T==="/"&&L==="*"){for(a+=2;a<r.length&&!(r[a]==="*"&&r[a+1]==="/");)a++;a+=2;continue}break}}function c(){let T=r[a++],L="";for(;a<r.length;){let G=r[a++];if(G===T)return L;if(G!=="\\"){L+=G;continue}let ue=r[a++],At={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};L+=Object.prototype.hasOwnProperty.call(At,ue)?At[ue]:ue}s("String belum ditutup")}function h(){o();let T=a;for(/[A-Za-z_$]/.test(r[a]||"")||s("Identifier invalid"),a++;a<r.length&&/[A-Za-z0-9_$]/.test(r[a]);)a++;return r.slice(T,a)}function m(){let T=r.slice(a).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return T||s("Number invalid"),a+=T[0].length,Number(T[0])}function v(){let T=[];if(a++,o(),r[a]==="]")return a++,T;for(;a<r.length;)if(T.push(w()),o(),r[a]==="]"||(r[a]!==","&&s("Koma array hilang"),a++,o(),r[a]==="]"))return a++,T;s("Array belum selesai")}function S(){let T=Object.create(null);if(a++,o(),r[a]==="}")return a++,T;for(;a<r.length;){o();let L=['"',"'","`"].includes(r[a])?c():h();if(o(),H.has(L)&&s("Object key terlarang: "+L),Object.prototype.hasOwnProperty.call(T,L)&&s("Duplicate object key: "+L),r[a]!==":"&&s("Titik dua hilang"),a++,T[L]=w(),o(),r[a]==="}"||(r[a]!==","&&s("Koma object hilang"),a++,o(),r[a]==="}"))return a++,T}s("Object belum selesai")}function w(){o();let T=r[a];if(T==="{")return S();if(T==="[")return v();if(['"',"'","`"].includes(T))return c();if(T==="-"||/\d/.test(T||""))return m();let L=h();if(L==="true")return!0;if(L==="false")return!1;if(L==="null")return null;L==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+L)}let E=w();return o(),E}function tn(r){let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+a+"|(?:window|globalThis)\\."+a+")\\s*=\\s*\\{"),o=[];function c(h,m){!h||o.some(v=>v.editor===h)||o.push({editor:h,kind:m})}c(u.editors.js,"js"),c(u.editors.html,"html"),c(u.editors.head,"head"),u.allEditors.forEach(h=>c(h,"unknown"));for(let h of o){let m=h.editor.getValue?.()||"",v=s.exec(m);if(!v)continue;let S=m.indexOf("{",v.index),w=xl(m,S);if(w)try{return{kind:h.kind,editor:h.editor,obj:yl(w.text),start:w.start,end:w.end}}catch(E){console.error("[SVE] parse "+r+" gagal",E)}}return null}function $h(){if(!u.doc)return null;let r=[];return C("[data-sve-section]",u.doc).forEach((a,s)=>{let o=[],c=new Set;C("[data-sve-field]",a).forEach(m=>{let v=m.getAttribute("data-sve-field");!v||c.has(v)||(c.add(v),o.push({type:m.getAttribute("data-sve-type")||"text",label:m.getAttribute("data-sve-label")||Ot(v),path:v}))});let h=a.getAttribute("data-sve-countdown-path");h&&!c.has(h)&&o.push({type:"datetime",label:"Waktu Tujuan",path:h}),r.push({id:a.id||"section-"+s,label:a.getAttribute("data-sve-section")||Ot(a.id)||"Section "+(s+1),visiblePath:a.getAttribute("data-sve-visible-path")||null,canHide:!!a.getAttribute("data-sve-visible-path"),reorderable:(a.getAttribute("data-section-id")||a.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Wi(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=$h(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function ke(){let r=Wi();return Array.isArray(r?.sections)?r.sections:[]}function Z(r){return String(r?.id||"").trim()}function Bt(r){let a=Z(r);return!(!a||a==="cover"||r?.locked===!0||r?.reorderable===!1)}function Gi(){let a=ke().map(Z).filter(Boolean);if(!a.length)return[];let s=new Set(a),o=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(h=>String(h||"").trim()).filter(h=>h&&s.has(h)):[],c=[];return s.has("cover")&&c.push("cover"),o.forEach(h=>{h!=="cover"&&!c.includes(h)&&c.push(h)}),a.forEach(h=>{c.includes(h)||c.push(h)}),c}function li(){let r=ke(),a=new Map(r.map(s=>[Z(s),s]));return Gi().map(s=>a.get(s)).filter(Boolean)}function qi(r,a){let s=String(r||"").trim(),o=ke().find(v=>Z(v)===s);if(!o||!Bt(o))return!1;let c=Gi(),h=c.indexOf(s);if(h<0)return!1;let m=h+a;for(;m>=0&&m<c.length;){let v=c[m],S=ke().find(w=>Z(w)===v);if(v!=="cover"&&!S?.locked)return!0;m+=a}return!1}function vl(r){if(!u.config)return!1;let a=ke(),s=new Set(a.map(Z).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(c=>String(c||"").trim()).filter(c=>c&&s.has(c)&&c!=="cover").forEach(c=>{o.includes(c)||o.push(c)}),a.map(Z).filter(Boolean).forEach(c=>{o.includes(c)||o.push(c)}),u.config.sectionOrder=o,!0}function Ph(r=document){C("[data-section-card]",r).forEach(a=>{let s=a.dataset.sectionCard,o=k("[data-section-up]",a),c=k("[data-section-down]",a);o&&(o.disabled=!qi(s,-1)),c&&(c.disabled=!qi(s,1))})}function Nh(r,a){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",a==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function kl(r,a,s){let o=k("#"+e+"-body");if(!o)return;let c=k(".reset-zone",o),h=new Map(C("[data-section-card]",o).map(m=>[m.dataset.sectionCard,m]));r.forEach(m=>{let v=h.get(m);v&&(c?o.insertBefore(v,c):o.appendChild(v))}),Ph(o),Nh(h.get(a),s)}function Sl(r,a){let s=String(r||"").trim(),o=ke().find(S=>Z(S)===s);if(!o||!Bt(o))return;let c=Gi(),h=c.indexOf(s);if(h<0)return;let m=h+a;for(;m>=0&&m<c.length;){let S=c[m],w=ke().find(E=>Z(E)===S);if(S!=="cover"&&!w?.locked)break;m+=a}if(m<0||m>=c.length||c[m]==="cover")return;let[v]=c.splice(h,1);c.splice(m,0,v),vl(c),Te("Urutan section diperbarui"),kl(c,s,a<0?"up":"down")}function Rh(r,a,s){let o=String(r||"").trim(),c=String(a||"").trim();if(!o||!c||o===c)return;let h=ke(),m=h.find(ue=>Z(ue)===o),v=h.find(ue=>Z(ue)===c);if(!m||!v||!Bt(m))return;let S=s==="after"?"after":"before";if(c==="cover")S="after";else if(!Bt(v))return;let w=Gi(),E=w.indexOf(o);if(E<0)return;w.splice(E,1);let T=w.indexOf(c);if(T<0)return;let L=T+(S==="after"?1:0);w[0]==="cover"&&(L=Math.max(1,L)),L=Math.min(w.length,L),w.splice(L,0,o);let G=w.indexOf(o);vl(w),Te("Urutan section diperbarui"),kl(w,o,G<E?"up":"down")}function wl(){let r=Wi();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function Se(){if(u.contentStateDirty&&!xe())return!1;if(u.lastSerializedConfig="",!Hi())return u.sourceDirty=!0,!1;Ft(()=>{try{gd()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(D("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let a=tn("CONFIG");u.config=a?.obj||null,u.configRange=a||null,u.configSourceText=a?a.editor.getValue().slice(a.start,a.end):"",u.configOwnerSource=a?a.editor.getValue():"";let s=tn("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(ol(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Dh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function Te(r){return ci(r,{deferPreview:!0,syncImages:!0})?(Se(),!0):!1}function Ki(r){return ci(r,{deferPreview:!0,syncImages:!0})}function Fh(r,a){let s=r._handlers?.change;if(!Array.isArray(s))return a();let o=[];s.forEach((c,h)=>{c?.__sve||(o.push([h,c]),s[h]=()=>{})});try{return a()}finally{o.forEach(([c,h])=>{Array.isArray(s)&&(s[c]=h)})}}function ci(r,a={}){if(!u.config||!u.configRange?.editor)return!1;let s=Kd(u.config);if(s.length)return ui(s[0]),!1;let c=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:tn("CONFIG");if(!c||c.editor!==u.configRange.editor)return ui("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let h=c.editor;if(!ll(h)){let E=u.config,T=Se(),L=u.configRange?.editor;return!T||!ll(L)?(ui("Editor Scalev sudah dimuat ulang. Muat ulang panel (tombol Muat ulang source) lalu ulangi perubahan."),!1):(u.config=E,ci(r,a))}let m=h.getValue();if(m.slice(c.start,c.end)!==u.configSourceText)return ui("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let v=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(v===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null,w=a.wakeScalev!==!0&&pi.supported()===!0;try{u.internalEditorWrite+=1;let E=()=>h.operation(()=>{if(typeof h.replaceRange=="function"&&typeof h.posFromIndex=="function")h.replaceRange(v,h.posFromIndex(c.start),h.posFromIndex(c.end));else{let T=h.getValue?.()||"",L=T.slice(0,c.start)+v+T.slice(c.end);h.setValue(L)}h.save?.()});w?Fh(h,E):E(),(a.wakeScalev||!w)&&zi(h,!1)}catch(E){S=E}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{h.getValue()!==m&&h.setValue(m),zi(h,!1)}catch{}finally{u.internalEditorWrite-=1}return ui("Perubahan belum tersimpan: "+S.message),!1}return c.end=c.start+v.length,c.obj=u.config,u.configRange=c,u.configSourceText=v,u.configOwnerSource=h.getValue(),u.lastSerializedConfig=v,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),Yi(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Vh(),a.deferPreview?Zh({syncImages:!!a.syncImages}):He({syncImages:!!a.syncImages}),!0}function ui(r){u.commitError=r,u.contentStateDirty=!0;let a=document.getElementById(e+"-commit-notice");a&&(a.hidden=!1,a.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function Yi(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,D(r)]))}function Cl(){return e+":fresh-default:"+location.origin+location.pathname}function rn(){let r=["html",D("html"),"css",D("css"),"js",D("js"),"head",D("head")].join("\u241E"),a=2166136261;for(let s=0;s<r.length;s++)a^=r.charCodeAt(s),a=Math.imul(a,16777619);return(a>>>0).toString(16).padStart(8,"0")}function Mh(){let r={};return _.forEach(([,,a])=>{let s=be(a);s&&(r[a]=s)}),se.forEach(a=>{r[a.variable]=be(a.variable)||a.fallback}),Pe.forEach(({variable:a})=>{let s=be(a);s&&(r[a]=s)}),{version:t,config:u.config?gt(u.config):null,cssTokens:r,googleFonts:gt(B(u.config,"editorStyle.googleFonts")||{})}}function El(){try{let r=JSON.parse(localStorage.getItem(Cl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function Al(r){try{localStorage.setItem(Cl(),JSON.stringify(r))}catch{}}function Tl(){if(!u.config)return!1;let r=rn(),a=Mh();return u.defaults=a,u.defaultConfig=gt(a.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,Yi(),Al({version:t,defaults:a,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Oh(r){let a=r?.cssTokens;return!a||typeof a!="object"?!1:Pe.every(({variable:s})=>typeof a[s]=="string"&&a[s].trim()!=="")}function Dh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,o])=>D(s)===o))return;let r=rn(),a=El();if(a?.defaults&&a.lastManagedFingerprint===r&&Oh(a.defaults)){u.defaults=a.defaults,u.defaultConfig=gt(a.defaults.config||u.config),u.baselineFingerprint=a.baselineFingerprint||r,u.lastManagedFingerprint=r,Yi();return}Tl()}function _l(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,o])=>D(s)===o))return;let r=rn(),a=El()||{};u.lastManagedFingerprint=r,Al({version:t,defaults:a.defaults||u.defaults,baselineFingerprint:a.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Vh=si(_l,700);function Bh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{Se(),Tl(),u.open?le():Ui()}catch{}},420)}function jh(){u.allEditors.forEach(r=>{if(!r||u.editorChangeBound.has(r)||typeof r.on!="function")return;u.editorChangeBound.add(r);let a=()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Bh())};a.__sve=!0,r.on("change",a)})}function yx(r){u.defaultConfig&&(Ue(u.config,r,gt(B(u.defaultConfig,r))),Te("Berhasil direset"),le())}let Uh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",Hh="https://nikahin.myscalev.com/dashboard",nn="nikahin_team_key";function zh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(nn,"")||"").trim()}catch{return""}}function Wh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(nn,String(r||"").trim()),!0)}catch{return!1}}function Gh(){try{return typeof GM_setValue!="function"?!1:(GM_setValue(nn,""),!0)}catch{return!1}}let qh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function an(){return Ct(u.scalevSlug||Et())||""}async function sn(r){let a=u.dashboardPin;if(a.busy)return;let s=an();if(!s){a.status="error",a.message="Slug URL belum diisi di Pengaturan Scalev.",lt();return}let o=zh();if(!o){a.status="needkey",a.message="",lt();return}if(!(r==="generate"&&a.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){a.busy=!0,a.status="loading",a.message="",lt();try{let h=await(await en(Uh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!h||h.ok!==!0?(a.status="error",a.pin="",a.message=qh[h&&h.error]||"Gagal mengambil PIN."):(a.status="ready",a.slug=s,a.pin=String(h.pin||""),a.version=Number(h.version)||0,a.message=h.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{a.status="error",a.pin="",a.message="Tidak bisa menghubungi server."}a.busy=!1,lt()}}function Kh(){let r=k("#"+e+"-team-key"),a=r?r.value.trim():"",s=u.dashboardPin;if(!a){s.message="Kunci tim belum diisi.",lt();return}if(!Wh(a)){s.message="Tampermonkey menolak menyimpan kunci.",lt();return}s.status="idle",s.message="",sn("peek")}function Yh(){let r=u.dashboardPin;if(!Gh()){r.message="Tampermonkey menolak menghapus kunci.",lt();return}r.status="needkey",r.pin="",r.version=0,r.message="",lt()}async function Qh(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}lt()}}function lt(){let r=document.activeElement?.id,a=k("#"+e+"-pin-panel");a&&(a.innerHTML=Il());let s=k("#"+e+"-pin-pill");s&&(s.outerHTML=jl()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function Il(){let r=u.dashboardPin,a=an(),s=m=>m?`<small class="auto-wedding-id-note">${A(m)}</small>`:"";if(!a)return`
        <input
          class="content-control"
          type="text"
          value=""
          placeholder="Slug URL belum ada"
          data-auto-wedding-id="1"
          readonly
          aria-readonly="true"
        >
        <small class="auto-wedding-id-note">
          Isi Slug URL di Pengaturan Scalev dulu, lalu buka panel ini lagi.
        </small>
      `;if(r.status==="needkey"||r.status==="error")return`
        <div class="pin-ctl">
          <label for="${e}-team-key">Kunci tim</label>
          <div class="pin-ctl-box">
            <input
              id="${e}-team-key"
              type="password"
              autocomplete="off"
              placeholder="Kunci tim"
            >
            <button
              type="button"
              class="pin-ctl-save"
              id="${e}-team-key-save"
            >
              Simpan
            </button>
          </div>
          <small class="auto-wedding-id-note">
            Diketik sekali, lalu diingat di browser ini.
          </small>
          ${s(r.message)}
        </div>
      `;let o=r.status==="ready"&&r.pin&&r.slug===a,c=r.busy||r.status==="loading",h=o?`
          <button type="button" ${c?"disabled":""}
            class="pin-ctl-action${c?" is-busy":""}"
            id="${e}-pin-generate"
          >
            PIN baru
          </button>
        `:`
          <button type="button" ${c?"disabled":""}
            class="pin-ctl-action${c?" is-busy":""}"
            id="${e}-pin-peek"
          >
            ${r.status==="loading"?"Memuat\u2026":"Lihat PIN"}
          </button>
        `;return`
      <div class="pin-ctl">
        <div class="pin-ctl-box">
          <input
            id="${e}-pin-value"
            type="text"
            value="${A(o?r.pin:"")}"
            placeholder="${r.status==="loading"?"Mengambil PIN\u2026":"Belum diambil"}"
            readonly
            aria-readonly="true"
            aria-label="PIN"
            autocomplete="off"
            spellcheck="false"
          >
          ${o?`
                <button
                  type="button"
                  class="pin-ctl-chip"
                  id="${e}-pin-copy"
                  title="Salin PIN"
                  aria-label="Salin PIN"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"></path>
                  </svg>
                  Salin PIN
                </button>
              `:""}
        </div>
        <div class="pin-ctl-foot">
          ${h}
          <button
            type="button"
            class="pin-ctl-link"
            id="${e}-pin-changekey"
          >
            Kunci
          </button>
          <a
            class="pin-ctl-link"
            href="${Hh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function Ll(){u.defaults&&(u.defaults.config&&(u.config=gt(u.defaults.config),Te()),Object.entries(u.defaults.cssTokens||{}).forEach(([r,a])=>{a&&Re(r,a)}),Zl(),Te(),ir(),Se(),le(),He())}function Zh({syncImages:r=!1,delay:a=100}={}){He({syncImages:r})}let pi=Yp({document,window,getConfig:()=>u.config,syncImages:bd,metrics:u.performance});function He({syncImages:r=!1,force:a=!1}={}){pi.request({images:r,force:a})}function Jh(r){if(!r)return"";let a=new Date(r);if(Number.isNaN(a.getTime()))return"";let s=o=>String(o).padStart(2,"0");return a.getFullYear()+"-"+s(a.getMonth()+1)+"-"+s(a.getDate())+"T"+s(a.getHours())+":"+s(a.getMinutes())}function Xh(r){if(!r)return"";let a=new Date(r),s=h=>String(h).padStart(2,"0"),o=-a.getTimezoneOffset(),c=o>=0?"+":"-";return r+":00"+c+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function be(r,a){let s=a?[a]:[on()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let h of s){let m=c.exec(h||"");if(m)return m[1].trim()}return""}function hi(r,a){let s=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function on(){let r=[],a=D("css");return a&&r.push(a),[D("html"),D("head")].forEach(s=>{let o=String(s||""),c=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,h;for(;h=c.exec(o);)h[1]&&r.push(h[1])}),r.join(`
`)}function ed(r){let a=String(r||"").trim(),s=a.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(s){let c=s[1];c.length===3&&(c=c.split("").map(m=>m+m).join(""));let h=parseInt(c,16);return[h>>16&255,h>>8&255,h&255].join(", ")}let o=a.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i);return o?[o[1],o[2],o[3]].join(", "):""}function $l(r,a,s){let o=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(c,"$1"+s+"$3")}function Pl(r,a){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,a),o.body?.style?.setProperty(r,a),o.querySelector("[data-sve-template]")?.style?.setProperty(r,a)}catch{}};C("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function Re(r,a){let s=["css","head","html"],o=null;for(let S of s)if(hi(D(S),r)){o=S;break}if(!o)return!1;let c=D(o),h=$l(c,r,a),m=r+"-rgb",v=ed(a);return v&&hi(c,m)&&(h=$l(h,m,v)),h===c?!1:(ot(o,h),Pl(r,a),v&&hi(c,m)&&Pl(m,v),He(),!0)}function Qi(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function oe(r){let a=String(r?.type||"text").trim().toLowerCase();return a==="datetime-local"?"datetime":a==="checkbox"?"boolean":a}function td(r,a){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||Yr(r,a)}function Nl(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return gt(r.default);let a=oe(r);return a==="boolean"?!1:""}function id(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function rd(r){let a=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&a.push(`${s}="${A(r[s])}"`)}),r?.placeholder&&a.push(`placeholder="${A(r.placeholder)}"`),a.join(" ")}function nd(r){let a=String(r?.help||r?.description||"").trim();return a?`
        <small class="field-help">
          ${A(a)}
        </small>
      `:""}function ad(r,a){let s=B(u.config,a),o=oe(r),c=Yr(r,a),h=td(r,a),m=c?Et()||s||"":s??"",v=`data-field-path="${A(a)}" data-field-type="${A(o)}" aria-label="${A(r?.label||a)}" `+(h?'data-field-readonly="1" ':""),S=rd(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${v}
          ${S}
          ${h?'readonly aria-readonly="true"':""}
        >${A(m)}</textarea>
        ${c?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let E=id(r);return`
        <select
          class="content-control content-control-select"
          ${v}
          ${h?'disabled aria-disabled="true"':""}
        >
          ${r?.placeholder?`
                <option
                  value=""
                  ${String(m??"")===""?"selected":""}
                >
                  ${A(r.placeholder)}
                </option>
              `:""}

          ${E.map(T=>`
              <option
                value="${A(T.value)}"
                ${String(m??"")===T.value?"selected":""}
              >
                ${A(T.label)}
              </option>
            `).join("")}
        </select>
      `}if(o==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${v}
            ${m===!0?"checked":""}
            ${h?'disabled aria-disabled="true"':""}
          >

          <span>
            ${A(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(o==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${v}
          ${S}
          value="${A(Jh(m))}"
          ${h?'readonly aria-readonly="true"':""}
        >
      `;if(o==="url")return`
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${v}
            ${S}
            value="${A(m)}"
            ${h?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let w=["email","tel","number","date","time","color"].includes(o)?o:"text";return`
      <input
        class="content-control content-control-${w}"
        type="${w}"
        ${v}
        ${S}
        ${c?'data-auto-wedding-id="1"':""}
        value="${A(m)}"
        ${h?'readonly aria-readonly="true"':""}
      >
      ${c?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Rl(r,a){let s=a||r.path,o=A(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${ad(r,s)}

        ${nd(r)}
      </div>
    `}function di(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let a=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(a))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function Fl(r){if(!r||typeof r!="object")return[];let a=u.repeaterContentFieldCache.get(r);if(a)return a;let s=(r?.fields||[]).filter(o=>oe(o)!=="repeater"&&oe(o)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function sd(r){if(Ml(r,B(u.config,r.path)))return Nl(r.fields[0]);let a={};return(r.fields||[]).forEach(s=>{s?.key&&(a[s.key]=Nl(s))}),a}function Ml(r,a){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(a)&&a.length?a:B(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function od(r,a,s){let o=String(r?.itemLabelKey||"").trim(),h=[o?a?.[o]:"",a?.title,a?.name,a?.label,a?.event,a?.provider].find(m=>String(m??"").trim());return String(h??"").trim()||(r.label||"Item")+" "+(s+1)}function ld(r){return(r?.fields||[]).some(s=>oe(s)==="repeater"||oe(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function cd(r,a=null){let s=B(u.config,r.path),o=Array.isArray(s)?s:[],c=Number.isFinite(r.max)?r.max:999;return ld(r)+o.map((h,m)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${A(od(r,h,m))}
              </strong>

              ${r.canDelete!==!1&&o.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${A(r.path)}"
                      data-repeat-index="${m}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${Fl(r).map(v=>{let S=Ml(r,o)?r.path+"."+m:r.path+"."+m+"."+v.key;if(di(v)){let w=a?.get(S);return w?dn(w):""}return Rl({...v,type:v.type||"text"},S)}).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&o.length<c?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${A(r.path)}"
            >
              + Tambah
              ${A(r.label||"Item")}
            </button>
          `:"")}function fi(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function ud(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function Zi(r){if(!r||typeof r!="object")return[];let a=u.contentFieldCache.get(r);if(a)return a;let s=(r.fields||[]).filter(o=>!(o.type==="repeater"&&Fl(o).length===0));return u.contentFieldCache.set(r,s),s}function pd(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return li().forEach(a=>{let s=Z(a),o="";try{o=JSON.stringify(a).toLowerCase()}catch{o=[s,a?.label||"",...Zi(a).flatMap(h=>[h?.label||"",h?.path||"",...(h?.fields||[]).flatMap(m=>[m?.label||"",m?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),u.contentSearchIndex=r,r}function Ji(r){r&&u.contentSectionHtmlCache.delete(String(r))}function Xi(r){let a=Z(r);if(!a)return Ol(r);if(u.contentSectionHtmlCache.has(a))return u.contentSectionHtmlCache.get(a);let s=Ol(r);return u.contentSectionHtmlCache.set(a,s),s}function jt(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function ln(r){if(!r)return;let a=C("[data-section-card]",r).filter(o=>k("[data-section-body]",o)?.dataset.loaded==="1"),s=a.length-u.contentMaxMountedSections;s<=0||a.filter(o=>!o.classList.contains("open")).sort((o,c)=>Number(o.dataset.contentUse||0)-Number(c.dataset.contentUse||0)).slice(0,s).forEach(o=>{let c=k("[data-section-body]",o);c&&(c.replaceChildren(),c.dataset.loaded="0")})}function hd(){if(u.contentPrewarmScheduled||!u.config||!Wi())return;let r=li();if(!r.length)return;u.contentPrewarmScheduled=!0;let a=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let o=2;for(;u.contentPrewarmCursor<r.length&&o>0;){let c=r[u.contentPrewarmCursor++],h=Z(c);if(h&&!u.contentSectionHtmlCache.has(h)&&Xi(c),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=Ft(a,1200))};u.contentPrewarmHandle=Ft(a,1200)}function Ol(r){let a=Zi(r),s=new Map(hn(r).map(m=>[m.path,m])),o=[],c="",h=m=>{let v=String(m||"").trim();return!v||v===c?"":(c=v,`
        <div class="sv-category" data-sv-category="${A(v)}">
          ${A(v)}
        </div>
      `)};return a.forEach(m=>{let v=String(m.category||"").trim();if(v||(c=""),di(m)&&oe(m)!=="repeater-image"){let S=s.get(m.path);S&&o.push(h(v)+dn(S));return}if(oe(m)==="repeater-image"){let S=Array.isArray(B(u.config,m.path))?B(u.config,m.path):[],w=Number.isFinite(m.max)?m.max:999,E=[...s.values()].filter(L=>L.rootPath===m.path).map(dn).join(""),T=m.canAdd!==!1&&S.length<w?`
              <button
                type="button"
                class="button full"
                data-repeat-add="${A(m.path)}"
              >
                + Tambah
                ${A(m.label||"Foto")}
              </button>
            `:"";(E||T)&&o.push(h(v)+E+T);return}if(m.type==="repeater"){let S=v?"":`
            <div class="group-title">
              ${A(m.label||"Daftar")}
            </div>
          `;o.push(h(v)+`
            <div class="group">
              ${S}
              <div class="group-body">
                ${cd(m,s)}
              </div>
            </div>
          `);return}o.push(h(v)+`
          <div class="group">
            <div class="group-title">
              ${A(m.label||m.path)}
            </div>

            <div class="group-body">
              ${Rl({...m,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),o.join("")}function Dl(r){return li().find(a=>Z(a)===r)||null}function dd(r){if(!r)return;let a=k("[data-section-body]",r);if(!a||a.dataset.loaded==="1")return;let s=Dl(r.dataset.sectionCard);s&&(a.innerHTML=Xi(s),a.dataset.loaded="1",jt(r),ln(r.closest("#"+e+"-body")))}function cn(r){if(!r)return;let a=r.closest("#"+e+"-body");a&&(C("[data-section-card].open",a).forEach(s=>{s!==r&&(s.classList.remove("open"),k(".chev",s)?.setAttribute("aria-expanded","false"),jt(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),k(".chev",r)?.setAttribute("aria-expanded","true"),dd(r),jt(r),ln(a))}function Vl(r){if(!r)return;let a=k("[data-section-body]",r),s=Dl(r.dataset.sectionCard);!a||!s||(Ji(r.dataset.sectionCard),a.innerHTML=Xi(s),a.dataset.loaded="1",jt(r))}function Bl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let a=u.contentCommitMessage;u.contentCommitMessage="",ci(a||void 0,{validate:!1,deferPreview:!0})},100)}function xe(r=""){let a=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!a&&!r?!0:ci(s||void 0,{validate:!0,deferPreview:!0})}function jl(){let r=u.dashboardPin,a=an(),s=r.status==="ready"&&r.pin&&r.slug===a,o="Belum diambil",c="idle";return a?r.busy||r.status==="loading"?(o="Memuat\u2026",c="loading"):r.status==="needkey"?(o="Perlu kunci",c="warn"):r.status==="error"?(o="Gagal",c="error"):s&&(o="Aktif",c="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${c}">${o}</span>`}function Ul(){if(!u.config)return fi();if(!Wi())return ud();let r=li(),a=pd(),s=r.filter(o=>u.search?(a.get(Z(o))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${jl()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Il()}</div>
      </div>

      ${s.map(o=>{let c=Z(o),h=o.label||c,m=Bt(o),v=!o.visiblePath||B(u.config,o.visiblePath)!==!1,S=Zi(o),w=!u.search&&u.contentOpenSections.has(c);return`
            <article
              class="section ${m?"section-sortable":"section-pinned"}${w?" open":""}"
              data-section-card="${A(c)}"
            >
              <div
                class="section-head"
                title="${m?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${A(h)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${A(c)}"
                    draggable="${m?"true":"false"}"
                    ${m?"":"disabled"}
                    aria-label="Drag ${A(h)}"
                    title="${m?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${th()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${A(c)}"
                    ${qi(c,-1)?"":"disabled"}
                    aria-label="Naikkan ${A(h)}"
                    title="Naik"
                  >
                    ${sl("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${A(c)}"
                    ${qi(c,1)?"":"disabled"}
                    aria-label="Turunkan ${A(h)}"
                    title="Turun"
                  >
                    ${sl("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${A(h)}
                  </strong>

                  <small>
                    ${m?"Drag / \u2191\u2193 \xB7 ":"Pinned \xB7 "}
                    ${S.length}
                    pengaturan
                  </small>
                </div>

                <div class="section-actions">
                  ${o.canHide&&o.visiblePath?`
                        <label class="switch-wrap">
                          <input
                            type="checkbox"
                            data-visible-path="${A(o.visiblePath)}"
                            ${v?"checked":""}
                          >
                          <span class="switch"></span>
                        </label>
                      `:""}
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${A(h)}"
                  aria-expanded="${w?"true":"false"}"
                >
                  ${al("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${A(c)}"
                data-loaded="${w?"1":"0"}"
              >
                ${w?Xi(o):""}
              </div>
            </article>
          `}).join("")}

      <div class="reset-zone">
        <button
          type="button"
          class="button danger full"
          id="${e}-reset-all"
        >
          Reset
        </button>
      </div>
    `}function un(){return ke().flatMap(r=>r.fields||[]).filter(r=>oe(r)==="repeater-image"&&r?.path)}function vx(){return un()[0]||null}function fd(r){let a=String(r||"").trim();return a&&un().find(s=>String(s.path||"").trim()===a)||null}function pn(r){let a=Array.isArray(r?.fields)?r.fields:[];return a.find(s=>s?.key&&di(s))||a.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Hl(r){let a=String(r||"").trim();if(!a)return null;for(let s of un()){let o=String(s.path||"").trim(),c=o+".";if(!o||!a.startsWith(c))continue;let h=a.slice(c.length).split(".");if(h.length!==2)continue;let m=Number(h[0]);if(!Number.isInteger(m)||m<0)continue;let v=pn(s),S=String(v?.key||"src");if(h[1]===S)return{field:s,imageField:v,imageKey:S,rootPath:o,index:m}}return null}function zl(r){return u.doc?!!C('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function hn(r){let a=[],s=new Set;return(r?[r]:ke()).forEach(o=>{(o.fields||[]).forEach(c=>{if(di(c)&&c.type!=="repeater-image"&&c.path&&!s.has(c.path)&&(a.push({label:c.label||Ot(c.path),path:c.path,gallery:!1,wrapped:zl(c.path)}),s.add(c.path)),c.type==="repeater"&&c.path){let h=B(u.config,c.path),m=(c.fields||[]).filter(v=>di(v)&&v.key);Array.isArray(h)&&m.length&&h.forEach((v,S)=>{m.forEach(w=>{let E=c.path+"."+S+"."+w.key;s.has(E)||(a.push({label:(o.label||c.label||Ot(c.path))+" "+(S+1)+" \xB7 "+(w.label||Ot(w.key)),path:E,gallery:!1,wrapped:zl(E)}),s.add(E))})})}if(oe(c)==="repeater-image"&&c.path){let h=B(u.config,c.path),m=pn(c),v=String(m?.key||"src");Array.isArray(h)&&h.forEach((S,w)=>{let E=c.path+"."+w+"."+v;s.has(E)||(a.push({label:(c.label||"Foto Gallery")+" "+(w+1),path:E,gallery:!0,index:w,rootPath:c.path,imageKey:v,wrapped:!0}),s.add(E))})}})}),u.doc&&C('[data-sve-type="image"][data-sve-field]',u.doc).forEach(o=>{let c=o.getAttribute("data-sve-field");if(!c||s.has(c))return;let h=Hl(c),m=!!h;a.push({label:o.getAttribute("data-sve-label")||Ot(c),path:c,gallery:m,index:h?h.index:null,rootPath:h?h.rootPath:null,imageKey:h?h.imageKey:null,wrapped:!!o.closest("[data-sve-image-wrapper]")}),s.add(c)}),a}function Wl(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function Ut(r){let a=u.config?.imageSettings,s=a&&typeof a=="object"?a[r]:null,o=Hl(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:eh(s?.fit),alignPos:qr.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function Ht(r,a){let s=Wl();s[r]={...Ut(r),...a}}function md(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let a=new Set(hn().map(s=>s.path));Object.keys(r).forEach(s=>{a.has(s)||delete r[s]})}function gd(){let r=D("css");if(!r)return;let a=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return a!==r.trim()?(ot("css",a),!0):!1}function bd(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let c=Ut(o),h=s.closest("[data-sve-image-wrapper]"),m=h||s,v=c.align==="left"?"0":"auto",S=c.align==="right"?"0":"auto";h?(h.style.display=c.hidden?"none":"",h.style.width=c.width+"%",h.style.maxWidth="100%",h.style.marginLeft=v,h.style.marginRight=S,s.style.width="100%"):(s.style.display=c.hidden?"none":"",s.style.width=c.width+"%",s.style.maxWidth="100%",s.style.marginLeft=v,s.style.marginRight=S),c.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=c.fit;let w=Xp[c.alignPos]||"";w?s.style.objectPosition=w:s.style.removeProperty("object-position"),s.style.height="100%"})}function kx(){pi.request({images:!0})}function xd(r){let a={"top left":`
        <path d="M5 11V5H11"></path>
        <path d="M5 5L19 19"></path>
      `,"top center":`
        <path d="M8 6L12 2L16 6"></path>
        <path d="M12 2V22"></path>
      `,"top right":`
        <path d="M13 5H19V11"></path>
        <path d="M19 5L5 19"></path>
      `,"center left":`
        <path d="M6 8L2 12L6 16"></path>
        <path d="M2 12H22"></path>
      `,"center center":`
        <path d="M12 2V22"></path>
        <path d="m15 19-3 3-3-3"></path>
        <path d="m19 9 3 3-3 3"></path>
        <path d="M2 12H22"></path>
        <path d="m5 9-3 3 3 3"></path>
        <path d="m9 5 3-3 3 3"></path>
      `,"center right":`
        <path d="M18 8L22 12L18 16"></path>
        <path d="M2 12H22"></path>
      `,"bottom left":`
        <path d="M11 19H5V13"></path>
        <path d="M19 5L5 19"></path>
      `,"bottom center":`
        <path d="M8 18L12 22L16 18"></path>
        <path d="M12 2V22"></path>
      `,"bottom right":`
        <path d="M19 13V19H13"></path>
        <path d="M5 5L19 19"></path>
      `,default:`
        <path d="m2 2 20 20"></path>
        <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"></path>
        <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"></path>
      `};return`
      <svg
        class="advance-pos-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${a[r]||a.default}
      </svg>
    `}function yd(r){let a=Ut(r.path),s=c=>c==="left"?`
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.83203 2.49935C1.83203 2.03911 2.20513 1.66602 2.66536 1.66602H17.6654C18.1256 1.66602 18.4987 2.03911 18.4987 2.49935C18.4987 2.95959 18.1256 3.33268 17.6654 3.33268H2.66536C2.20513 3.33268 1.83203 2.95959 1.83203 2.49935ZM8.4987 6.66602H5.16536C4.70513 6.66602 4.33203 7.03911 4.33203 7.49935V12.4993C4.33203 12.9596 4.70513 13.3327 5.16536 13.3327H8.4987C8.95893 13.3327 9.33203 12.9596 9.33203 12.4993V7.49935C9.33203 7.03911 8.95893 6.66602 8.4987 6.66602ZM5.16536 4.99935C3.78465 4.99935 2.66536 6.11864 2.66536 7.49935V12.4993C2.66536 13.8801 3.78465 14.9993 5.16536 14.9993H8.4987C9.87941 14.9993 10.9987 13.8801 10.9987 12.4993V7.49935C10.9987 6.11864 9.87941 4.99935 8.4987 4.99935H5.16536ZM2.66536 16.666C2.20513 16.666 1.83203 17.0391 1.83203 17.4993C1.83203 17.9596 2.20513 18.3327 2.66536 18.3327H17.6654C18.1256 18.3327 18.4987 17.9596 18.4987 17.4993C18.4987 17.0391 18.1256 16.666 17.6654 16.666H2.66536Z"
              fill="currentColor"
            ></path>
          </svg>
        `:c==="right"?`
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.99805 2.49935C1.99805 2.03911 2.37114 1.66602 2.83138 1.66602H17.8314C18.2916 1.66602 18.6647 2.03911 18.6647 2.49935C18.6647 2.95959 18.2916 3.33268 17.8314 3.33268H2.83138C2.37114 3.33268 1.99805 2.95959 1.99805 2.49935ZM15.3314 6.66602H11.998C11.5378 6.66602 11.1647 7.03911 11.1647 7.49935V12.4993C11.1647 12.9596 11.5378 13.3327 11.998 13.3327H15.3314C15.7916 13.3327 16.1647 12.9596 16.1647 12.4993V7.49935C16.1647 7.03911 15.7916 6.66602 15.3314 6.66602ZM11.998 4.99935C10.6173 4.99935 9.49805 6.11864 9.49805 7.49935V12.4993C9.49805 13.8801 10.6173 14.9993 11.998 14.9993H15.3314C16.7121 14.9993 17.8314 13.8801 17.8314 12.4993V7.49935C17.8314 6.11864 16.7121 4.99935 15.3314 4.99935H11.998ZM2.83138 16.666C2.37114 16.666 1.99805 17.0391 1.99805 17.4993C1.99805 17.9596 2.37114 18.3327 2.83138 18.3327H17.8314C18.2916 18.3327 18.6647 17.9596 18.6647 17.4993C18.6647 17.0391 18.2916 16.666 17.8314 16.666H2.83138Z"
              fill="currentColor"
            ></path>
          </svg>
        `:`
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.16602 2.49935C2.16602 2.03911 2.53911 1.66602 2.99935 1.66602H17.9993C18.4596 1.66602 18.8327 2.03911 18.8327 2.49935C18.8327 2.95959 18.4596 3.33268 17.9993 3.33268H2.99935C2.53911 3.33268 2.16602 2.95959 2.16602 2.49935ZM12.166 6.66602H8.83268C8.37245 6.66602 7.99935 7.03911 7.99935 7.49935V12.4993C7.99935 12.9596 8.37245 13.3327 8.83268 13.3327H12.166C12.6263 13.3327 12.9993 12.9596 12.9993 12.4993V7.49935C12.9993 7.03911 12.6263 6.66602 12.166 6.66602ZM8.83268 4.99935C7.45197 4.99935 6.33268 6.11864 6.33268 7.49935V12.4993C6.33268 13.8801 7.45197 14.9993 8.83268 14.9993H12.166C13.5467 14.9993 14.666 13.8801 14.666 12.4993V7.49935C14.666 6.11864 13.5467 4.99935 12.166 4.99935H8.83268ZM2.99935 16.666C2.53911 16.666 2.16602 17.0391 2.16602 17.4993C2.16602 17.9596 2.53911 18.3327 2.99935 18.3327H17.9993C18.4596 18.3327 18.8327 17.9596 18.8327 17.4993C18.8327 17.0391 18.4596 16.666 17.9993 16.666H2.99935Z"
            fill="currentColor"
          ></path>
        </svg>
      `;return`
      <details class="image-advance">
        <summary class="advance-summary">
          <span>
            Advance
          </span>

          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="advance-chevron"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071L12 11.4142L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929L12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071Z"
              fill="currentColor"
            ></path>
          </svg>
        </summary>

        <div class="advance-body">
          <p class="advance-design-title">
            Desain
          </p>

          <div class="advance-group">
            <p class="advance-label">
              Posisi Gambar
            </p>

            <div class="advance-pos-grid">
              ${qr.filter(c=>c!=="default").map(c=>`
            <button
              type="button"
              class="advance-pos-btn ${a.alignPos===c?"active":""}"
              data-image-alignpos-path="${A(r.path)}"
              data-image-alignpos="${A(c)}"
              title="${A(c)}"
              aria-label="${A("Posisi "+c)}"
            >
              ${xd(c)}
            </button>
          `).join("")}
            </div>

            <button
              type="button"
              class="advance-pos-default ${a.alignPos==="default"?"active":""}"
              data-image-alignpos-path="${A(r.path)}"
              data-image-alignpos="default"
              title="Default \u2014 gunakan posisi dari CSS theme"
              aria-label="Default"
            >
              Default
            </button>
          </div>

          <div class="advance-group">
            <label class="advance-label">
              Lebar Gambar
            </label>

            <div class="range-row">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value="${a.width}"
                data-image-width-path="${A(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${a.width}"
                  data-image-width-number="${A(r.path)}"
                >

                <span>%</span>
              </div>
            </div>
          </div>

          <div class="advance-group">
            <p class="advance-label">
              Penyesuaian Gambar
            </p>

            <div class="advance-fit-grid">
              <button
                type="button"
                class="advance-fit-btn ${a.fit==="auto"?"active":""}"
                data-image-fit-path="${A(r.path)}"
                data-image-fit="auto"
              >
                <span class="advance-fit-preview auto"></span>
                <span class="advance-fit-label">
                  Auto
                </span>
              </button>

              <button
                type="button"
                class="advance-fit-btn ${a.fit==="cover"?"active":""}"
                data-image-fit-path="${A(r.path)}"
                data-image-fit="cover"
              >
                <span class="advance-fit-preview cover"></span>
                <span class="advance-fit-label">
                  Cover
                </span>
              </button>

              <button
                type="button"
                class="advance-fit-btn ${a.fit==="contain"?"active":""}"
                data-image-fit-path="${A(r.path)}"
                data-image-fit="contain"
              >
                <span class="advance-fit-preview contain"></span>
                <span class="advance-fit-label">
                  Contain
                </span>
              </button>
            </div>
          </div>

        </div>
      </details>
    `}function vd(){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M11 14h10"></path>
        <path d="M16 4h2a2 2 0 0 1 2 2v1.344"></path>
        <path d="m17 18 4-4-4-4"></path>
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"></path>
        <rect x="8" y="2" width="8" height="4" rx="1"></rect>
      </svg>
    `}function kd(){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 4C8 2.89544 8.89544 2 10 2H14C15.1046 2 16 2.89545 16 4V6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H19.9311L19.1302 19.2137C19.018 20.7836 17.7117 22 16.1378 22H7.86224C6.28832 22 4.982 20.7837 4.86986 19.2137L4.06888 8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H8V4ZM10 6H14V4H10V6ZM6.07398 8L6.86478 19.0713C6.90216 19.5945 7.3376 20 7.86224 20H16.1378C16.6623 20 17.0978 19.5946 17.1352 19.0713L17.926 8H6.07398ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
          fill="currentColor"
        ></path>
      </svg>
    `}function Gl(){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1 13L5.58579 8.4142C6.36683 7.6332 7.6332 7.6332 8.4142 8.4142L13 13M11 11L12.5858 9.4142C13.3668 8.6332 14.6332 8.6332 15.4142 9.4142L17 11M11 5H11.01M3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `}function Sd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${Gl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function wd(){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.2036 4.55322C13.0246 3.81559 11.9754 3.81559 11.7964 4.55322C11.3612 6.34603 9.30724 7.1967 7.73186 6.23681C7.08363 5.84184 6.34186 6.58365 6.73681 7.23185C7.6967 8.80723 6.846 10.8612 5.05318 11.2964C4.31557 11.4755 4.31559 12.5245 5.05318 12.7036C6.84598 13.1388 7.69671 15.1927 6.73682 16.7681C6.34187 17.4163 7.08358 18.1581 7.73181 17.7633C9.30725 16.8032 11.3612 17.6541 11.7964 19.4468C11.9755 20.1844 13.0246 20.1844 13.2036 19.4468C13.6412 17.6531 15.6937 16.8038 17.2682 17.7633C17.9164 18.1581 18.6581 17.4163 18.2632 16.7681C17.3033 15.1927 18.154 13.1388 19.9468 12.7036C20.6844 12.5245 20.6844 11.4754 19.9468 11.2964C18.154 10.8612 17.3033 8.80723 18.2632 7.23185C18.6581 6.58365 17.9164 5.84184 17.2681 6.23681C15.6938 7.19607 13.6414 6.3471 13.2045 4.55668L13.2036 4.55322ZM10.5 12C10.5 10.8954 11.3954 10 12.5 10C13.6046 10 14.5 10.8954 14.5 12C14.5 13.1046 13.6046 14 12.5 14C11.3954 14 10.5 13.1046 10.5 12ZM12.5 8C10.2908 8 8.5 9.79082 8.5 12C8.5 14.2092 10.2908 16 12.5 16C14.7092 16 16.5 14.2092 16.5 12C16.5 9.79082 14.7092 8 12.5 8Z"
          fill="currentColor"
        ></path>
      </svg>
    `}function Cd(r,a){let s=B(u.config,r);if(!Array.isArray(s)||a<0||a>=s.length)return;let o=fd(r),c=pn(o),h=String(c?.key||"src"),m=Wl(),v={};for(let S=0;S<s.length;S++){let w=r+"."+S+"."+h;Object.prototype.hasOwnProperty.call(m,w)&&(v[S]=gt(m[w]))}s.splice(a,1),Object.keys(m).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+h)&&delete m[S]});for(let S=0;S<s.length;S++){let w=S<a?S:S+1,E=v[w];E&&(m[r+"."+S+"."+h]=E)}md(),Te("Foto gallery dihapus"),le()}function Ed(r){u.config&&(Ue(u.config,r,""),Ht(r,{hidden:!0}),Te("Gambar dihapus"),le())}function dn(r){let a=B(u.config,r.path)||"",s=Ut(r.path),c=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!r.gallery?`data-gallery-delete-index="${A(r.rootPath)}" data-gallery-index="${Number(r.index)}"`:`data-image-delete-path="${A(r.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${kd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${A(r.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${wd()}
              </button>
            </div>
          `;return`
            <div
              class="group image-card ${s.hidden?"image-card-hidden":""}"
              data-image-card-path="${A(r.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${a?`
                        <img
                          class="preview"
                          src="${A(a)}"
                          alt=""
                        >
                      `:Sd(r.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${A(r.label)}">
                    ${A(r.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${A(r.path)}">
                    CONFIG.${A(r.path)}
                  </p>
                </div>

                ${c}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${A(r.path)}"
                  value="${A(a)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${A(r.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${A(r.path)}"
                  title="Paste URL"
                  aria-label="Paste URL ${A(r.label)} dari clipboard"
                >
                  ${vd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${yd(r)}
            </div>
          `}function mi(r,a){let s=r?.closest(".image-card");if(!s)return;let o=k(".image-preview-shell",s);if(!o)return;let c=r.value.trim(),h=Ut(a),m=k(".preview",o);if(c){if(!m||m.tagName!=="IMG"){let v=document.createElement("img");v.className="preview",v.alt="",m?m.replaceWith(v):o.prepend(v),m=v}m.src=c}else{if(!m||m.tagName!=="BUTTON"||!m.classList.contains("image-upload-placeholder")){let v=document.createElement("button");v.type="button",v.className="preview empty image-upload-placeholder",v.dataset.imageFocus=a,v.setAttribute("aria-label","Masukkan URL gambar"),m?m.replaceWith(v):o.prepend(v),m=v}m.innerHTML=`
        <span class="image-upload-icon">
          ${Gl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,m.onclick=()=>{r.focus(),r.select?.()}}m.style.width="100%",m.style.height="100%",m.style.maxWidth="none",m.style.aspectRatio="auto",m.style.objectFit="cover",m.style.marginLeft="0",m.style.marginRight="0",s.classList.toggle("image-card-hidden",h.hidden)}function er(r,a){let s=Ut(a);C(`[data-image-align-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlign===s.align)}),C(`[data-image-fit-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageFit===s.fit)}),C(`[data-image-alignpos-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlignpos===s.alignPos)});let o=k(`[data-image-width-path="${CSS.escape(a)}"]`,r),c=k(`[data-image-width-number="${CSS.escape(a)}"]`,r);o&&(o.value=s.width),c&&(c.value=s.width)}function Ad(r){let a=String(r||"").trim();if(!a||/^var\(/i.test(a))return!1;try{return CSS.supports("color",a)}catch{return/^#[0-9a-f]{3,8}$/i.test(a)}}function gi(r,a="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let c=o[1];return c.length===3&&(c=c.split("").map(h=>h+h).join("")),"#"+c.slice(0,6).toLowerCase()}try{let c=document.createElement("span");if(c.style.color=s,!c.style.color)return a;c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c);let h=getComputedStyle(c).color;c.remove();let m=h.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!m)return a;let v=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+v(m[1])+v(m[2])+v(m[3])}catch{return a}}function Td(){return _.some(([,,r])=>!!be(r))}function _d(r,a){let s=be(a);if(!s)return`
        <div class="field color-row color-row-unset">
          <div
            class="color-unset-swatch"
            aria-hidden="true"
          ></div>

          <div>
            <label>
              ${A(r)}
            </label>

            <input
              type="text"
              value=""
              placeholder="Belum diset"
              disabled
              aria-label="${A(r)} belum tersedia"
            >

            <small>
              ${A(a)}
            </small>
          </div>
        </div>
      `;let o=gi(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${A(a)}"
          value="${A(o)}"
          aria-label="${A(r)}"
        >

        <div>
          <label>
            ${A(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${A(a)}"
            value="${A(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${A(a)}
          </small>
        </div>
      </div>
    `}function Id(){return u.config?Td()?["Background","Body Teks","Button Primary","Button Secondary"].map(a=>`
            <div class="group">
              <div class="group-title">
                ${a}
              </div>

              ${_.filter(s=>s[0]===a).map(([,s,o])=>_d(s,o)).join("")}
            </div>
          `).join("")+`
        <button
          type="button"
          class="button danger full"
          id="${e}-reset-colors"
        >
          Reset
        </button>
      `:`
        <div class="colors-empty" role="status">
          <strong>Belum ada warna</strong>
          <span>Cek menu Status</span>
        </div>
      `:fi()}let Ld={"playwrite brasil guides":"Playwrite BR Guides"};function fn(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function mn(r){let a="";try{a=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{a=String(r||"").replace(/\+/g," ")}return fn(a.split(":")[0].replace(/\s+/g," "))}function bi(r){let a=fn(r);return a?Ld[a.toLowerCase()]||a:""}function $d(r){let a=String(r||"").trim();if(!a)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(a))try{let o=new URL(a),c=o.hostname.toLowerCase();if(c==="fonts.google.com"||c==="www.fonts.google.com"){let h=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(h?.[1])return{family:bi(mn(h[1])),isUrl:!0,valid:!0};let m=o.searchParams.get("family");return m?{family:bi(mn(m)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(c==="fonts.googleapis.com"){let m=o.searchParams.getAll("family")[0]||"";return m?{family:bi(mn(m)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=a.split(",")[0];return{family:bi(fn(s)),isUrl:!1,valid:!0}}function Pd(r,a=""){let s=bi(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),c=String(a||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(c?":wght@"+encodeURIComponent(c):"")+"&display=swap"}function gn(r,a=""){let s=Pd(r,a);return s?new Promise(o=>{let c=e+"-font-validation-link";document.getElementById(c)?.remove();let h=document.createElement("link"),m=!1,v=w=>{m||(m=!0,clearTimeout(S),h.onload=null,h.onerror=null,o(w))},S=setTimeout(()=>{v({ok:!1,reason:"timeout"})},7e3);h.id=c,h.rel="stylesheet",h.href=s,h.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let w=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!w||w.length===0){v({ok:!1,reason:"font-file"});return}}v({ok:!0,reason:"ok",url:s})}catch{v({ok:!1,reason:"font-file"})}},h.onerror=()=>{v({ok:!1,reason:"stylesheet"})},document.head.appendChild(h)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Nd(r,a){let o=tr(a,be(a==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),c=await gn(r,o);return c.ok?{...c,weight:o}:o!=="400"&&(c=await gn(r,"400"),c.ok)?{...c,weight:"400",normalizedWeight:!0}:(c=await gn(r,""),c.ok?{...c,weight:"400",normalizedWeight:o!=="400"}:{...c,weight:o})}function bn(r,a){if(r)try{let s=e+"-preview-font-link",o=r.getElementById(s);if(!a){o?.remove();return}o||(o=r.createElement("link"),o.id=s,o.rel="stylesheet",(r.head||r.documentElement)?.appendChild(o)),o.getAttribute("href")!==a&&o.setAttribute("href",a)}catch{}}function ql(){let r=Ql();C("iframe").forEach(a=>{try{bn(a.contentDocument,r)}catch{}}),requestAnimationFrame(()=>{C("iframe").forEach(a=>{try{bn(a.contentDocument,r)}catch{}})})}function Kl(r){return String(B(u.config,"editorStyle.googleFonts."+r)||"").trim()}function Yl(r){let a=Kl(r);if(a)return a;let o=be(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function Rd(r,a){return a==="heading"?"serif":"sans-serif"}function Fd(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Md(r,a){return Y.includes(String(a))}function Od(r){return Y}function tr(r,a){let s=String(a||"").trim();return Y.includes(s)?s:"400"}function Dd(r,a=!1){let s=k("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",c=k(`[data-style-var="${CSS.escape(o)}"]`,s);if(!c)return;let h=be(o)||"400",m=tr(r,h);a&&m!==h&&Re(o,m),c.innerHTML=nr(m,Y,!1),c.value=m}function Ql(){let r=new Map;["heading","body"].forEach(s=>{let o=Kl(s);if(!o)return;let c=o.trim().toLowerCase();if(!c)return;r.has(c)||r.set(c,{family:o,weights:new Set});let m=tr(s,be(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(c).weights.add(m)});let a=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),c=Array.from(s.weights).sort((h,m)=>Number(h)-Number(m));return"family="+o+":wght@"+c.join(";")});return a.length?"https://fonts.googleapis.com/css2?"+a.join("&")+"&display=swap":""}function ir(){let r=Ql(),a="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r){if(u.editors.head){let m=D("head");o.test(m)&&ot("head",m.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),C("iframe").forEach(m=>{try{bn(m.contentDocument,"")}catch{}});return}let c=`${a}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${r}">
${s}`;if(u.editors.head){let m=D("head");m=o.test(m)?m.replace(o,c):m.trimEnd()+`

`+c+`
`,ot("head",m)}let h=document.getElementById(e+"-font-link");h||(h=document.createElement("link"),h.id=e+"-font-link",h.rel="stylesheet",document.head.appendChild(h)),h.href=r,ql()}async function rr(r){let a=k("#"+e+"-"+r+"-font");if(!a)return;let s=$d(a.value);if(!s.valid||!s.family)return;let o=s.family;a.value=o;let c=await Nd(o,r);if(!c.ok){c.reason==="stylesheet"||c.reason==="font-file"||c.reason;return}let h=r==="heading"?"--sve-font-heading":"--sve-font-body",m=r==="heading"?"--sve-heading-weight":"--sve-body-weight";c.normalizedWeight&&c.weight&&Re(m,c.weight),Ue(u.config,"editorStyle.googleFonts."+r,o),Te(),Re(h,`"${o}", ${Rd(o,r)}`),Dd(r,!1),ir(),ql(),He()}function nr(r,a,s=!0,o=!1){let c=String(r||"").trim(),h=s&&c&&!a.includes(c)?[c,...a]:[...a];return o&&(h=[...new Set(h)].sort((m,v)=>{let S=Number.parseFloat(m),w=Number.parseFloat(v);return Number.isFinite(S)&&Number.isFinite(w)?S-w:String(m).localeCompare(String(v))})),h.map((m,v)=>{let S=a.includes(c)||s?m===c:v===0;return`
            <option
              value="${A(m)}"
              ${S?"selected":""}
            >
              ${A(m)}
            </option>
          `}).join("")}function Vd(r){let a=be(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${nr(a,K,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${nr(a,te,!1)}
        </select>
      `;if(r.type==="weight"){let s=Fd(r.variable),o=s?Od(s):Y,c=s?tr(s,a):a;return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${nr(c,o,!1)}
        </select>
      `}return""}function Zl(){if(!u.config)return!1;let r=u.defaults?.cssTokens||{},a=!1;return Pe.forEach(({target:s,variable:o})=>{let c=typeof r[o]=="string"?r[o].trim():"",h=B(u.config,"editorStyle.googleFonts."+s),m=typeof h=="string"&&h.trim()!=="";c&&(Re(o,c),a=!0),m&&(Ue(u.config,"editorStyle.googleFonts."+s,""),a=!0)}),a}function Bd(){u.config&&(Zl(),se.forEach(r=>{let a=Qi(r.variable)||r.fallback;Re(r.variable,a)}),Te(),ir(),le())}function jd(){return u.config?`
      <div class="group">
        <div class="group-title">
          Font Heading
        </div>

        <div class="field">
          <label>
            Google Font
          </label>

          <input
            id="${e}-heading-font"
            type="text"
            value="${A(Yl("heading"))}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
          >

          <div class="font-manual-help">
            Paste nama font atau link dari Google Fonts.
            Link specimen paling akurat.
          </div>

          <a
            class="font-google-link"
            href="https://fonts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cari di Google Fonts \u2197
          </a>

          <button
            type="button"
            class="button primary full font-apply"
            id="${e}-heading-font-apply"
          >
            Terapkan Heading Font
          </button>
        </div>
      </div>

      <div class="group">
        <div class="group-title">
          Font Body
        </div>

        <div class="field">
          <label>
            Google Font
          </label>

          <input
            id="${e}-body-font"
            type="text"
            value="${A(Yl("body"))}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
          >

          <div class="font-manual-help">
            Paste nama font atau link dari Google Fonts.
            Link specimen paling akurat.
          </div>

          <a
            class="font-google-link"
            href="https://fonts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cari di Google Fonts \u2197
          </a>

          <button
            type="button"
            class="button primary full font-apply"
            id="${e}-body-font-apply"
          >
            Terapkan Body Font
          </button>
        </div>
      </div>

      <details class="group typography-dropdown">
        <summary class="group-title typography-summary">
          <span>
            Typography
          </span>

          ${al("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${ge.map(r=>{let a=se.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${A(r.label)}</div>
                  <div class="typography-control-grid">
                    ${a.map(s=>`
                      <div class="typography-control">
                        <label>${A(s.label)}</label>
                        ${Vd(s)}
                      </div>
                    `).join("")}
                  </div>
                </div>
              `}).join("")}
        </div>
      </details>

      <div class="style-reset-zone">
        <button
          type="button"
          class="button danger full"
          id="${e}-reset-style"
        >
          Reset
        </button>
      </div>
    `:fi()}function ar(r){let a=String(r||"").trim().toLowerCase();if(!a)return 0;if(/^\d+$/.test(a))return Math.max(0,Number(a));let s=a.split(":").map(m=>Number(m));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(a.match(/(\d+)h/)?.[1]||0),c=Number(a.match(/(\d+)m/)?.[1]||0),h=Number(a.match(/(\d+)s/)?.[1]||0);return o||c||h?Math.max(0,o*3600+c*60+h):0}function Jl(r){let a=String(r||"").trim();if(!a)return 0;try{let s=new URL(a,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let c of o){let h=ar(c);if(h>0)return h}}catch{let o=a.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return ar(o?.[1]||"")}return 0}function xn(r){let a=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(a/3600),o=Math.floor(a%3600/60),c=a%60,h=m=>String(m).padStart(2,"0");return s>0?s+":"+h(o)+":"+h(c):o+":"+h(c)}function Ud(r,a){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(a)||0));if(!s)return s;try{let c=new URL(s,location.href);return c.searchParams.delete("start"),o>0?c.searchParams.set("t",String(o)):c.searchParams.delete("t"),c.hash&&/(?:^#|[&#])t=/i.test(c.hash)&&(c.hash=""),c.toString()}catch{let h=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?h:h+(h.includes("?")?"&":"?")+"t="+o}}function Xl(r,a){let s=Jl(a),o=k("#"+e+"-audio-start-enabled",r),c=k("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),c&&(c.disabled=s<=0,c.value=xn(s))}function Hd(){if(!u.config)return fi();let r=wl(),a=r.path||"assets.audio",s=B(u.config,a),o=typeof s=="string"?s:"",c=Jl(o);return`
      <div class="group">
        <div class="group-title">
          ${A(r.label||"Audio Undangan")}
        </div>

        <div class="field audio-field">
          <label>
            URL Audio / YouTube
          </label>

          <input
            type="text"
            id="${e}-audio-url"
            value="${A(o)}"
            placeholder="https://youtu.be/VIDEO_ID"
            autocomplete="off"
          >

          <div class="audio-start-row">
            <input
              type="checkbox"
              id="${e}-audio-start-enabled"
              class="audio-start-check"
              ${c>0?"checked":""}
              aria-label="Aktifkan waktu mulai"
            >

            <label
              class="audio-start-label"
              for="${e}-audio-start-enabled"
            >
              Mulai pada
            </label>

            <input
              type="text"
              inputmode="numeric"
              id="${e}-audio-start-time"
              class="audio-start-time"
              value="${A(xn(c))}"
              placeholder="0:00"
              ${c>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function sr(r,a){(Array.isArray(r)?r:[]).forEach(s=>{a(s),oe(s)==="repeater"&&sr(s.fields,a),oe(s)==="repeater-image"&&sr(s.fields,a)})}function ec(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},a={html:D("html"),css:D("css"),js:D("js"),head:D("head")},s=(S,w)=>{try{let E=new URL(w,location.origin);if(E.protocol!=="https:"&&E.protocol!=="http:")return;let T=E.origin;if(T===location.origin)return;r[S]?.add(T)}catch{}},o=(S,w)=>{let E=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(E)||[]).forEach(T=>s(w,T))};try{let S=new DOMParser().parseFromString(a.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(w=>{s("img_src",w.getAttribute("src")||w.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(w=>s("media_src",w.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(w=>s("frame_src",w.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(w=>s("script_src",w.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(w=>s("style_src",w.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(w=>s("manifest_src",w.getAttribute("href")||""))}catch{}let c=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,h;for(;h=c.exec((a.css||"")+`
`+(a.head||""));){let S=h[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}o(a.head,"style_src");let m=JSON.stringify(u.config||{}),v=B(u.config,"guestbook.endpoint");return v&&s("connect_src",v),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let w=B(u.config,S);w&&s("connect_src",w)}),(m.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(a.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,w])=>[S,Array.from(w).sort()]))}function zd(){return{"Body HTML":D("html"),CSS:D("css"),JavaScript:D("js"),"Additional Head":D("head"),CONFIG:JSON.stringify(u.config||{})}}function tc(r,a,s){let o=zd(),c=Zp(o);c.length?r("Gambar base64 terdeteksi di "+rl(c)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let h=Jp(o);h.length&&a("Data URI berukuran besar di "+rl(h)+"; pertimbangkan pindah ke file hosting")}function Wd(){let r=[],a=[],s=[],o=X=>r.push(X),c=X=>a.push(X),h=X=>s.push(X);if(u.config?h("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),u.schema?h("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),h("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let m=Array.isArray(u.schema?.sections)?u.schema.sections:[],v=m.map(Z).filter(Boolean),S=new Set(v);m.length||o("SVE_SCHEMA custom page belum memiliki section"),v.length!==S.size&&o("SVE_SCHEMA memiliki duplicate section id");let w=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],E=new Set(w);w.length!==E.size&&o("CONFIG.sectionOrder memiliki duplicate id"),v.forEach(X=>{E.has(X)||o("sectionOrder belum memuat: "+X)}),m.forEach(X=>{let ze=Z(X);X.visiblePath&&(mt(X.visiblePath)||o("Unsafe visiblePath pada section "+ze),u.config&&typeof B(u.config,X.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+ze)),sr(X.fields,_e=>{let bt=oe(_e);ai.has(bt)||o("Field type tidak didukung: "+bt+" ("+(_e.path||_e.key||ze)+")"),_e.path&&!mt(_e.path)&&o("Unsafe field path: "+_e.path),(bt==="repeater"||bt==="repeater-image")&&!Array.isArray(_e.fields)&&o("Repeater tanpa fields[]: "+(_e.path||ze)),bt==="repeater"&&(_e.fields||[]).forEach(yi=>{let yn=oe(yi);(yn==="repeater"||yn==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(_e.path||ze)),yi.key||o("Repeater subfield tanpa stable key: "+(_e.path||ze))})})});let T=["html","css","js","head"].map(D).join(`
`);/\beval\s*\(/.test(T)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(T)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(T)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(T)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(T)&&o("Kemungkinan secret/private credential terdeteksi"),tc(o,c,h);let L=on(),G=se.map(X=>X.variable).filter(X=>!hi(L,X));G.length?o("Typography role tokens belum lengkap: "+G.join(", ")):h("Semua typography role tokens tersedia");let ue=ec();return Object.values(ue).reduce((X,ze)=>X+ze.length,0)&&c("External origin terdeteksi; salin CSP manifest ke Scalev Security"),h("Custom page aktif; validasi "+Ze.length+" section wedding dilewati"),{status:r.length?"BLOCKER":a.length?"WARNING":"PASS",blockers:r,warnings:a,passes:s,csp:ue}}let or=null;function ic(){let r=["html","css","js","head"].map(D);if(or&&r.every((o,c)=>o===or.sources[c]))return or.report;let a=new DOMParser().parseFromString(r[0],"text/html");a.head.insertAdjacentHTML("beforeend",r[3]);let s=tl({doc:a,scripts:[r[2],...Array.from(a.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(a.querySelectorAll("style"),o=>o.textContent).join(`
`)});return or={sources:r,report:s},s}function rc(){let r=ic();if(u.schema?.template?.type==="custom-page"){let F=Wd();return F.blockers=[...new Set([...r.blockers,...F.blockers])],F.blockers.length&&(F.status="BLOCKER"),F}let a=[...r.blockers],s=[],o=[],c=F=>a.push(F),h=F=>s.push(F),m=F=>o.push(F);if(u.config?m("CONFIG terbaca sebagai static object"):c("CONFIG tidak terbaca"),u.schema?m("SVE_SCHEMA eksplisit tersedia"):c("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),m("CONFIG JSON-compatible")}catch{c("CONFIG tidak dapat diserialisasi dengan aman")}let v=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=v.map(Z).filter(Boolean),w=new Set(S);S.length!==w.size&&c("SVE_SCHEMA memiliki duplicate section id"),Ze.forEach(F=>{w.has(F)||c("Canonical section hilang: "+F)}),Ze.every(F=>w.has(F))&&m(Ze.length+" canonical sections tersedia");let E=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],T=new Set(E);E.length!==T.size&&c("CONFIG.sectionOrder memiliki duplicate id"),Ze.forEach(F=>{T.has(F)||c("sectionOrder belum memuat: "+F)}),E[0]&&E[0]!=="cover"&&c("Cover wajib menjadi section pertama"),Ze.filter(F=>F!=="cover").forEach(F=>{typeof B(u.config,"sections."+F)!="boolean"&&c("Boolean visibility tidak valid: sections."+F)}),v.forEach(F=>{let Ie=Z(F);Ie==="cover"?(F.locked!==!0||F.canHide!==!1)&&c("Cover harus locked dan canHide:false"):F.visiblePath&&!mt(F.visiblePath)&&c("Unsafe visiblePath pada section "+Ie),sr(F.fields,We=>{let vi=oe(We);ai.has(vi)||c("Field type tidak didukung: "+vi+" ("+(We.path||We.key||Ie)+")"),We.path&&!mt(We.path)&&c("Unsafe field path: "+We.path),(vi==="repeater"||vi==="repeater-image")&&!Array.isArray(We.fields)&&c("Repeater tanpa fields[]: "+(We.path||Ie)),vi==="repeater"&&(We.fields||[]).forEach(pc=>{let hc=oe(pc);(hc==="repeater"||hc==="repeater-image")&&c("Nested repeater tidak diizinkan: "+(We.path||Ie)),pc.key||c("Repeater subfield tanpa stable key: "+(We.path||Ie))})})});let L=["html","css","js","head"].map(D).join(`
`);/\beval\s*\(/.test(L)&&c("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(L)&&c("new Function() terdeteksi"),/javascript\s*:/i.test(L)&&c("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(L)&&c("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(L)&&c("Kemungkinan secret/private credential terdeteksi"),tc(c,h,m);let G=D("js");/\bconst\s+CONFIG\s*=/.test(G)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(G)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let ue=B(u.config,"sections.rsvp")===!0,At=B(u.config,"sections.guestbook")===!0,X=String(B(u.config,"rsvp.endpoint")||""),ze=B(u.config,"rsvp.enabled"),_e=!!X||ze!==void 0;if(ue)if(_e)ze!==!0&&c("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(X)||c("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let F=String(B(u.config,"extensions.rsvpBackend.mode")||"none");if(F!=="none"&&F!=="external"&&c("RSVP backend mode harus none atau external"),F==="external"){let Ie=String(B(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(Ie)||c("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(At){let F=B(u.config,"guestbook.enabled"),Ie=String(B(u.config,"guestbook.endpoint")||"");F!==!0&&c("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(Ie)||c("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let bt=on(),yi=se.map(F=>F.variable).filter(F=>!hi(bt,F));yi.length?c("Typography role tokens belum lengkap: "+yi.join(", ")):m("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(bt)&&h("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let uc=ec();return Object.values(uc).reduce((F,Ie)=>F+Ie.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):m("Tidak ada external origin wajib dari scanner"),{status:a.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:a,warnings:s,passes:o,csp:uc}}function Gd(r){return r==="PASS"?`
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `:r==="WARNING"?`
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.536 4.66667C14.0756 2.00001 17.9246 2.00001 19.4642 4.66667L28.7018 20.6667C30.2414 23.3333 28.3167 26.6667 25.2376 26.6667H6.76244C3.68324 26.6667 1.75873 23.3333 3.29834 20.6667L12.536 4.66667ZM17.1548 6C16.6416 5.11112 15.3586 5.11112 14.8454 6L5.60774 22C5.09455 22.8889 5.73604 24 6.76244 24H25.2376C26.264 24 26.9055 22.8888 26.3924 22L17.1548 6ZM16 10.6667C16.7364 10.6667 17.3333 11.2636 17.3333 12V14.6667C17.3333 15.403 16.7364 16 16 16C15.2636 16 14.6667 15.403 14.6667 14.6667V12C14.6667 11.2636 15.2636 10.6667 16 10.6667ZM14.6667 20C14.6667 19.2636 15.2636 18.6667 16 18.6667H16.0133C16.7497 18.6667 17.3467 19.2636 17.3467 20C17.3467 20.7364 16.7497 21.3333 16.0133 21.3333H16C15.2636 21.3333 14.6667 20.7364 14.6667 20Z" fill="currentColor"></path>
        </svg>
      `:`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
      </svg>
    `}function qd(){if(!u.config)return fi();let r=rc(),a=(c,h)=>c.length?`<ul>${c.map(m=>`<li>${A(m)}</li>`).join("")}</ul>`:`<p class="compat-empty">${A(h)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${Gd(r.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${A(s)}</strong>
            </div>
            <small>${A(o)}</small>
          </div>
        </div>

        <div class="compat-metrics">
          <span class="metric blocker">Masalah <b>${r.blockers.length}</b></span>
          <span class="metric warning">Perlu dicek <b>${r.warnings.length}</b></span>
          <span class="metric pass">Siap <b>${r.passes.length}</b></span>
        </div>

        <details class="compat-detail">
          <summary>
            <span>Detail</span>
            <b>${r.blockers.length+r.warnings.length+r.passes.length}</b>
          </summary>
          <div class="compat-detail-body">
            <div class="compat-detail-group compat-list">
              <strong>Masalah</strong>
              ${a(r.blockers,"Tidak ada masalah.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Perlu dicek</strong>
              ${a(r.warnings,"Tidak ada yang perlu dicek.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Siap</strong>
              ${a(r.passes,"Belum ada hasil.")}
            </div>
            <div class="compat-detail-group">
              <strong>Keamanan</strong>
              <pre class="compat-code">${A(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function Kd(r){let a=[],s=new WeakSet,o=(c,h="CONFIG")=>{if(c!==null){if(typeof c=="object"){if(s.has(c)){a.push("Referensi berulang: "+h);return}s.add(c)}if(Array.isArray(c)){c.forEach((m,v)=>o(m,h+"."+v));return}if(typeof c=="object"){Object.keys(c).forEach(m=>{H.has(m)&&a.push("Forbidden key: "+h+"."+m),o(c[m],h+"."+m)});return}["string","number","boolean"].includes(typeof c)||a.push("Non-static value: "+h),typeof c=="number"&&!Number.isFinite(c)&&a.push("Non-finite number: "+h)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{a.push("CONFIG gagal round-trip JSON")}return a}function Yd(){let r=u.templateLibrary,a=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(h=>a?[h.name].join(" ").toLowerCase().includes(a):!0);r.status==="idle"&&bl().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,le())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${A(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",c=s.map(h=>{let m=!!h.sourceUrl,v=h.id===r.importedId;return`
        <article class="library-card${v?" is-active":""}" role="listitem"${v?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${A(h.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${A(String(h.commissionRate))}%</strong> dari harga paket</span>
                <a href="${l}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${v?"danger":"primary"} library-import-button"
                data-library-import="${A(h.id)}"
                ${m?"":"disabled"}
              >${m?v?"Reset":"Gunakan":"Belum siap"}</button>
            </div>
          </div>
        </article>
      `}).join("");return`
      <div class="template-library-panel">
        <header class="library-header">
          <div class="library-heading">
            <h2>Template</h2>
            <div class="library-summary" role="status" aria-live="polite">
              <strong>${s.length}</strong>
              <span>template</span>
            </div>
          </div>
          <div class="library-header-actions">
            <button type="button" class="button secondary library-refresh-button" data-library-refresh aria-label="Muat ulang template">
                ${r.status==="loading"?"Memuat...":"Muat ulang"}
            </button>
            <button
              type="button"
              class="button danger library-clear-button"
              data-library-clear
              aria-label="Kosongkan editor"
              title="Kosongkan editor"
            >
              Kosongkan
            </button>
          </div>
        </header>

        ${o}

        ${r.status==="loading"&&!r.templates.length?`
            <div class="library-loading" aria-live="polite" aria-label="Memuat template">
              <div class="library-skeleton-card"></div>
              <div class="library-skeleton-card"></div>
              <div class="library-skeleton-card"></div>
            </div>
          `:c?`<div class="library-grid" role="list">${c}</div>`:`
              <div class="library-empty" role="status">
                <strong>Belum ada template yang cocok.</strong>
                <span>${a?"Coba kata pencarian lain.":"Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `}function Qd(){let r=k("#"+e+"-search");if(!r)return;let a=u.tab==="library";r.placeholder=a?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",a?"Cari template":"Cari section atau field")}function le(){let r=performance.now(),a=k("#"+e+"-body");if(!a)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}a.dataset.sveTab=u.tab||"content",u.tab==="library"?a.innerHTML=Yd():u.tab==="content"?a.innerHTML=Ul():u.tab==="colors"?a.innerHTML=Id():u.tab==="style"?a.innerHTML=jd():u.tab==="audio"?a.innerHTML=Hd():u.tab==="compatibility"?a.innerHTML=qd():a.innerHTML=Ul(),rf(a),Qd(),u.tab==="content"&&hd(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function Zd(r,a){return k('[data-image-path="'+CSS.escape(a)+'"]',r)}let Jd="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function nc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(Jd),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function Xd(r,a){let s=Zd(r,a);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):Gr(o)?(nc(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function ef(r){let a=String(r.dataset.fieldType||"text"),s=r.value;return a==="boolean"?s=!!r.checked:a==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):a==="datetime"&&(s=Xh(r.value)),s}function ac(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;Ue(u.config,r.dataset.fieldPath,ef(r));let a=r.closest("[data-section-card]");return Ji(a?.dataset.sectionCard),jt(a),u.contentStateDirty=!0,!0}function sc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let a=()=>{C(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;xe(),Sl(o.dataset.sectionUp,-1);return}let c=s.target.closest("[data-section-down]");if(c){if(s.preventDefault(),s.stopPropagation(),c.disabled)return;xe(),Sl(c.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let h=s.target.closest("[data-repeat-add]");if(h){let w=h.dataset.repeatAdd,E=ke().flatMap(L=>L.fields||[]).find(L=>(L.type==="repeater"||oe(L)==="repeater-image")&&L.path===w),T=B(u.config,w);Array.isArray(T)||(Ue(u.config,w,[]),T=B(u.config,w)),T.push(sd(E||{})),u.contentStateDirty=!0,Ji(h.closest("[data-section-card]")?.dataset.sectionCard),xe("Item ditambahkan"),Vl(h.closest("[data-section-card]"));return}let m=s.target.closest("[data-repeat-delete]");if(m){let w=B(u.config,m.dataset.repeatDelete);if(!Array.isArray(w))return;let E=ke().flatMap(L=>L.fields||[]).find(L=>(L.type==="repeater"||oe(L)==="repeater-image")&&L.path===m.dataset.repeatDelete),T=Number.isFinite(E?.min)?E.min:0;if(w.length<=T){xe("Minimal "+T+" item");return}w.splice(Number(m.dataset.repeatIndex),1),u.contentStateDirty=!0,Ji(m.closest("[data-section-card]")?.dataset.sectionCard),xe("Item dihapus"),Vl(m.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,Ll();return}if(s.target.closest("#"+e+"-team-key-save")){Kh();return}if(s.target.closest("#"+e+"-pin-peek")){sn("peek");return}if(s.target.closest("#"+e+"-pin-generate")){sn("generate");return}if(s.target.closest("#"+e+"-pin-copy")){Qh();return}if(s.target.closest("#"+e+"-pin-changekey")){Yh();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let w=S.closest("[data-section-card]");if(!w)return;let E=!w.classList.contains("open");w.classList.toggle("open",E);let T=w.dataset.sectionCard;E?cn(w):(u.contentOpenSections.delete(T),k(".chev",w)?.setAttribute("aria-expanded","false"),jt(w),ln(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||ac(o)&&Bl())}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){Ue(u.config,o.dataset.visiblePath,o.checked),Bl(o.checked?"Section ditampilkan":"Section disembunyikan");return}ac(o)&&xe("Konten diperbarui")}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}xe();let c=o.closest("[data-section-card]");c&&(c.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",c.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(c,24,24))}),r.addEventListener("dragend",a),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer?.getData("text/plain")||k(".section.dragging",r)?.dataset?.sectionCard||"",h=o.dataset.sectionCard;if(!c||c===h)return;let m=ke().find(w=>Z(w)===h);if(h!=="cover"&&!Bt(m))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let v=o.getBoundingClientRect(),S=s.clientY<v.top+v.height/2?"before":"after";h==="cover"&&(S="after"),C(".section.drag-before, .section.drag-after",r).forEach(w=>{w!==o&&(w.classList.remove("drag-before","drag-after"),delete w.dataset.dropPlacement)}),o.dataset.dropPlacement=S,o.classList.toggle("drag-before",S==="before"),o.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer.getData("text/plain"),h=o.dataset.sectionCard,m=o.dataset.dropPlacement||(h==="cover"?"after":"before");s.preventDefault(),a(),Rh(c,h,m)})}function tf(r){C("[data-library-import]",r).forEach(a=>{a.onclick=()=>{Ih(a.dataset.libraryImport)}}),k("[data-library-clear]",r)?.addEventListener("click",Lh),k("[data-library-refresh]",r)?.addEventListener("click",async()=>{await bl(!0),u.uiPrepared=!1,le()})}function xi(r,a){let s=a+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function rf(r){if(u.tab==="library"){tf(r);return}if(u.tab==="content"){sc(r),nf(r);return}if(u.tab==="colors"){af(r);return}if(u.tab==="style"){sf(r);return}if(u.tab==="audio"){of(r);return}if(u.tab==="compatibility"){lf(r);return}sc(r)}function nf(r){if(!xi(r,"images"))return;r.addEventListener("click",s=>{let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),Xd(r,o.dataset.imagePastePath);return}let c=s.target.closest("[data-image-delete-path]");if(c){Ed(c.dataset.imageDeletePath);return}let h=s.target.closest("[data-image-open-advance]");if(h){let E=h.dataset.imageOpenAdvance,T=k(`[data-image-card-path="${CSS.escape(E)}"]`,r),L=T?k(".image-advance",T):null;if(L){let G=!L.open;L.open=G,h.setAttribute("aria-expanded",String(G)),h.setAttribute("aria-label",G?"Tutup pengaturan gambar":"Buka pengaturan gambar"),h.title=G?"Tutup pengaturan gambar":"Pengaturan gambar",h.classList.toggle("active",G),G?L.scrollIntoView({block:"nearest",behavior:"smooth"}):h.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let m=s.target.closest("[data-image-align-path]");if(m){let E=m.dataset.imageAlignPath,T=["left","center","right"].includes(m.dataset.imageAlign)?m.dataset.imageAlign:"center";Ht(E,{align:T}),Ki(),er(r,E);let L=k(`[data-image-path="${CSS.escape(E)}"]`,r);L&&mi(L,E);return}let v=s.target.closest("[data-image-fit-path]");if(v){let E=v.dataset.imageFitPath,T=nl.includes(v.dataset.imageFit)?v.dataset.imageFit:"auto";Ht(E,{fit:T}),Ki(),er(r,E);let L=k(`[data-image-path="${CSS.escape(E)}"]`,r);L&&mi(L,E);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let E=S.dataset.imageAlignposPath,T=qr.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";Ht(E,{alignPos:T}),Ki(),er(r,E);let L=k(`[data-image-path="${CSS.escape(E)}"]`,r);L&&mi(L,E);return}let w=s.target.closest("[data-gallery-delete-index]");if(w){Cd(w.dataset.galleryDeleteIndex,Number(w.dataset.galleryIndex));return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let h=k(`[data-image-width-number="${CSS.escape(o)}"]`,r);h&&(h.value=s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){let h=Math.max(0,Math.min(100,Number(s.target.value)||0)),m=k(`[data-image-width-path="${CSS.escape(c)}"]`,r);m&&(m.value=h);return}});let a=(s,o)=>{let c=Math.max(0,Math.min(100,Number(o)||0));Ht(s,{width:c}),Ki();let h=k(`[data-image-path="${CSS.escape(s)}"]`,r);h&&mi(h,s),er(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){a(o,s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){a(c,s.target.value);return}let h=s.target.closest("[data-image-path]");if(!h)return;let m=h.dataset.imagePath,v=h.value.trim(),S=String(B(u.config,m)||"");if(v!==S){if(Gr(v)){h.value=S,nc(h);return}Ue(u.config,m,v),v&&Ht(m,{hidden:!1}),Te("Gambar diperbarui"),mi(h,m)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function af(r){if(!xi(r,"colors"))return;let a=(o,c,h)=>{let m=o.value.trim();if(!m||!Ad(m)){if(h){let S=be(c);S&&(o.value=S)}return}Re(c,m);let v=k(`[data-color-var="${CSS.escape(c)}"]`,r);v&&(v.value=gi(m,v.value||"#000000"))},s=o=>{let c=Qi(o);if(!c)return;Re(o,c);let h=k(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),m=k(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let v=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!v.length||v.includes(c))&&(h.value=c)}m&&(m.value=gi(c,m.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){_.forEach(([,,h])=>{let m=be(h);m&&Re(h,Qi(h)||m)}),C("[data-color-token-var]",r).forEach(h=>{let m=h.dataset.colorTokenVar,v=be(m);v&&(h.value=v)}),C("[data-color-var]",r).forEach(h=>{h.value=gi(be(h.dataset.colorVar),h.value)});return}}),r.addEventListener("input",o=>{let c=o.target.dataset.colorTokenVar;if(c!==void 0){a(o.target,c,!1);return}let h=o.target.dataset.colorVar;if(h!==void 0){Re(h,o.target.value);let m=k(`[data-color-token-var="${CSS.escape(h)}"]`,r);m&&(m.value=o.target.value)}}),r.addEventListener("change",o=>{let c=o.target.dataset.colorTokenVar;c!==void 0&&a(o.target,c,!0)})}function sf(r){if(!xi(r,"style"))return;let a=(o,c)=>{let h=String(o.value||"").trim();if(h){if((c==="--sve-heading-weight"||c==="--sve-body-weight")&&!Md(c==="--sve-heading-weight"?"heading":"body",h)){let v=be(c);v&&(o.value=v);return}Re(c,h),(c==="--sve-heading-weight"||c==="--sve-body-weight")&&ir()}},s=o=>{let c=Qi(o);if(!c)return;Re(o,c);let h=k(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),m=k(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let v=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!v.length||v.includes(c))&&(h.value=c)}m&&(m.value=gi(c,m.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){Bd();return}if(o.target.closest("#"+e+"-reset-all")){Ll();return}if(o.target.closest("#"+e+"-heading-font-apply")){rr("heading");return}o.target.closest("#"+e+"-body-font-apply")&&rr("body")}),r.addEventListener("change",o=>{let c=o.target.dataset.styleVar;c!==void 0&&a(o.target,c)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let c=o.target.dataset.styleVar;c!==void 0&&a(o.target,c)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),rr("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),rr("body")))})}function of(r){if(!xi(r,"audio"))return;let s=wl().path||"assets.audio",o=k("#"+e+"-audio-url",r),c=k("#"+e+"-audio-start-enabled",r),h=k("#"+e+"-audio-start-time",r);if(!o)return;let m=()=>{let S=o.value.trim(),w=B(u.config,s);if(typeof w=="string"&&w===S){Xl(r,S);return}Ue(u.config,s,S),Te("Audio diperbarui"),Xl(r,S)},v=()=>{if(!c||!h)return;let S=o.value.trim(),w=c.checked?ar(h.value):0,E=Ud(S,w);o.value=E,h.disabled=!c.checked,c.checked&&(h.value=xn(w)),Ue(u.config,s,E),Te(w>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(m,0)}),o.addEventListener("change",m),c?.addEventListener("change",()=>{h&&(h.disabled=!c.checked,c.checked&&ar(h.value)<=0&&(h.value="0:00",h.focus()),v())}),h?.addEventListener("change",v)}function lf(r){xi(r,"compat")}function oc(){Object.values(u.editors).forEach(r=>{r&&zi(r,!0)})}function cf(){Object.values(u.editors).forEach(r=>{if(r)try{r.save?.();let a=r.getTextArea?.();a?.dispatchEvent(new Event("input",{bubbles:!0})),a?.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}})}function uf(r,a=""){let s=k("#"+e+"-body");if(!s||!xe()||(u.sourceDirty||!u.doc)&&!Se()||(r=String(r||"").trim(),r&&!mt(r)))return!1;let o=r&&hn().find(w=>w.path===r),c=li(),h=w=>Zi(w).some(E=>E.path===r||(E.type==="repeater"||oe(E)==="repeater-image")&&r.startsWith(E.path+".")),m=r&&(c.find(w=>Z(w)===a&&h(w))||c.find(h))||c.find(w=>Z(w)===a);if(!o&&!m)return!1;u.search="";let v=k("#"+e+"-search");v&&(v.value=""),u.open||Dt(!0),Vt("content");let S;if(o){let w=k(`[data-section-card="${CSS.escape(Z(m))}"]`,s);if(!w)return!1;cn(w),S=k(`[data-image-path="${CSS.escape(r)}"]`,w),S||(S=k(".chev",w))}else{let w=k(`[data-section-card="${CSS.escape(Z(m))}"]`,s);if(!w)return!1;cn(w),S=r&&k(`[data-field-path="${CSS.escape(r)}"]`,w),S||(S=k(".chev",w))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let lc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function pf(r,a,s){if(typeof a!="string"||!a||a.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let o=r?.getAttribute("srcdoc")||"";if(!o)return null;let c=u.canvasPickSources.get(r);if(!c||c.source!==o){let S=document.createElement("template");S.innerHTML=o,c={source:o,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:C("script",S.content).map(w=>w.textContent).join(`
`)},u.canvasPickSources.set(r,c)}if(!c.root||!c.scripts.includes(JSON.stringify(s)))return null;let h=c.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(a)}"]`);if(!h)return null;let m=h.matches("[data-sve-field]")?h:h.querySelector("[data-sve-field]")||h.closest("[data-sve-field]"),v=h.closest("[data-section-id], [data-sve-section]");return{path:m?.getAttribute("data-sve-field")||"",sectionHint:v?.getAttribute("data-section-id")||v?.id||v?.getAttribute("data-sve-section")||""}}function hf(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,a=null;window.addEventListener("message",s=>{if(location.href!==r)return;let o=s.data;if(!o||o.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof o.inspectorId!="string"||!o.inspectorId||o.inspectorId.length>256||typeof o.previewId!="string"||o.previewId.length>256)return;let c=C(lc).find(G=>G.contentWindow===s.source);if(!c||!c.sandbox.contains("allow-scripts")||c.sandbox.contains("allow-same-origin"))return;let h=c.getAttribute("srcdoc"),m=location.href,{open:v,tab:S,sourceDirty:w}=u,E=u.performance.configCommitCount,T=D("html"),L=D("js");cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(a=null,location.href!==m||!c.isConnected||!c.matches(lc)||c.contentWindow!==s.source||c.getAttribute("srcdoc")!==h||u.open!==v||u.tab!==S||u.sourceDirty!==w||u.performance.configCommitCount!==E||D("html")!==T||D("js")!==L)return;let G=pf(c,o.inspectorId,o.previewId);G&&(G.path||G.sectionHint)&&uf(G.path,G.sectionHint)})})}function df(){return C("button").find(r=>{if(r.closest("#"+e))return!1;let a=(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="simpan"||a==="save"})||null}function ff(){let r="https://wa.me/"+p+"?text="+encodeURIComponent(d);window.open(r,"_blank","noopener,noreferrer")}function Sx(){if(!xe())return;if(cf(),oc(),Se(),rc().blockers.length){u.tab="compatibility";let s=document.getElementById(e);C(".tab",s).forEach(o=>{o.classList.toggle("active",o.dataset.tab==="compatibility")}),le();return}let a=df();a&&a.click()}function mf(){performance.mark("sve-styles-start"),gf(),performance.mark("sve-styles-critical-done"),Ft(bf,50)}function gf(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
#${e} * {
  box-sizing: border-box;
}

#${e}.sve-lite .tab[data-tab="style"],
#${e}.sve-lite .tab[data-tab="audio"],
#${e}.sve-lite .tab[data-tab="compatibility"] {
  display: none !important;
}

:root {
  --sve77-panel-width: min(400px, 32vw);
  --sve77-global-header-height: 47px;
}

html.sve77-panel-open {
  overflow-x: hidden !important;
}

/*
 * Flow workspace: benar-benar reserve lebar panel baru.
 */
html.sve77-panel-open
[data-sve77-page-root="1"]
[data-sve77-never] {
  display: none;
}

html.sve77-panel-open
[data-sve77-page-root="1"][data-sve77-layout="flow"] {
  width: calc(100% - var(--sve77-panel-width)) !important;
  max-width: calc(100% - var(--sve77-panel-width)) !important;
  margin-right: var(--sve77-panel-width) !important;
  box-sizing: border-box !important;
  transition:
    width .16s ease,
    max-width .16s ease,
    margin-right .16s ease !important;
}

/*
 * Fixed/absolute workspace: gunakan right offset seperti
 * benar-benar ada sidebar kanan baru.
 */
html.sve77-panel-open
[data-sve77-page-root="1"][data-sve77-layout="positioned"] {
  right: var(--sve77-panel-width) !important;
  width: auto !important;
  max-width: none !important;
  box-sizing: border-box !important;
  transition: right .16s ease !important;
}

[data-sve77-top-toolbar="1"] {
  right: var(--sve77-panel-width) !important;
  box-sizing: border-box !important;
}

[data-sve77-toolbar-host="1"] {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  transform: none !important;
}

[data-sve77-toolbar-host="1"] > button {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

#${e}-toolbar-toggle {
  flex: 0 0 auto !important;
  white-space: nowrap;
  margin: 0 !important;
  background: #fff !important;
  border-color: #0899cf !important;
  color: #0899cf !important;
}

#${e}-toolbar-toggle.sve-toolbar-active {
  background: #0899cf !important;
  border-color: #0899cf !important;
  color: #fff !important;
}

#${e} {
  --p: #0899cf;
  --line: #dbdfe5;
  --soft: #f3f6f9;
  --txt: #202c3b;
  --muted: #738092;

  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;

  --color-primary: #0899cf;
  --container-max-width: 1186px;
  --system-font-quill: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  font-family: "Roboto", var(--system-font-quill);
  line-height: inherit;
  color: var(--txt);
}

#${e}-dock {
  position: fixed;

  top:
    var(
      --sve77-global-header-height,
      44px
    );

  right: 0;
  bottom: auto;

  width:
    var(--sve77-panel-width);

  height:
    calc(
      100vh -
      var(
        --sve77-global-header-height,
        44px
      )
    );

  min-height:
    calc(
      100% -
      var(
        --sve77-global-header-height,
        44px
      )
    );

  /*
   * Paint-first layering contract:
   * - global header Scalev stays above SVE (z-50)
   * - SVE shell must be above the native editor toolbar (z-40)
   *   from the very first frame, before deferred push-layout runs.
   * This keeps Konten/Gambar/Warna/Style/Audio/Status visible
   * immediately without putting geometry scans back on the click path.
   */
  z-index: 41;

  display: none;
  flex-direction: column;
  overflow: hidden;

  background-color: rgba(255,255,255,1);

  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  border-left:
    2px solid
    #dbdfe5;

  border-radius: 0;
  box-shadow: none;
}

#${e}.open
#${e}-dock {
  display: flex;
}


/*
 * Menu utama Visual Editor meniru tab native Scalev:
 * relative flex, border bottom 2px, font 12px,
 * active 700 dan indicator 5px.
 */
#${e} .tabs-shell {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  width: 100%;
  align-items: stretch;
  border-top: 0;
  border-bottom: 2px solid var(--line);
  background: #fff;
}

#${e} .tabs {
  position: relative;
  margin-top: 1px;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  list-style: none;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 8px;
  border: 0;
  scrollbar-width: none;
}

#${e} .tabs::-webkit-scrollbar {
  display: none;
}

#${e} .tab {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  cursor: pointer;
  justify-content: center;
  padding: 16px 8px;
  border: 0;
  background: #fff;
  color: #5b6675;
  font-size: 12px;
  line-height: normal;
  font-weight: 500;
  white-space: nowrap;
}

#${e} .tab.active {
  color: #171717;
  font-weight: 700;
}

#${e} .tab.active::after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 5px;
  border-radius: 5px 5px 0 0;
  background: #0899cf;
  pointer-events: none;
}

#${e} .panel-tools {
  display: flex;
  flex: 0 0 auto;
  align-items: stretch;
  background: #fff;
}

#${e} .panel-tool {
  display: inline-flex;
  width: 40px;
  min-width: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 0;
  background: #fff;
  color: #5b6675;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

#${e} .panel-tool:hover {
  background: #f3f6f9;
  color: #202c3b;
}

#${e} .panel-collapse {
  width: 44px;
  min-width: 44px;
  padding: 0 8px;
  font-size: 24px;
  color: #7a8798;
}

#${e} .panel-collapse-icon {
  width: 24px;
  height: 24px;
  display: inline-flex;
  overflow: visible;

  /*
   * Icon native Scalev menghadap kiri untuk sidebar kiri.
   * Karena Visual Editor berada di kanan, icon yang sama
   * dicerminkan agar arah collapse menuju sisi kanan.
   */
  transform: rotate(180deg);
}

#${e} .toolbar {
  padding:
    10px 14px;

  border-bottom:
    1px solid
    var(--line);
}

#${e} .search {
  width: 100%;
  height: 38px;

  padding:
    0 10px;

  border:
    2px solid
    var(--line);

  border-radius: 5px;

  outline: 0;
}

#${e} .search:focus {
  border-color:
    var(--p);
}

#${e} .body {
  flex: 1;

  min-height: 0;

  overflow-y: auto;

  padding:
    12px 14px
    80px;
}

#${e} .notice {
  margin-bottom: 11px;

  padding: 10px;

  border-radius: 5px;

  background:
    var(--soft);

  color:
    var(--muted);

  font-size: 10px;

  line-height: 1.5;
}

#${e} .sve-empty-template {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

#${e} .sve-empty-template strong {
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
}

#${e} .sve-empty-template span {
  color: var(--muted);
  font-size: 11px;
  line-height: 1.4;
}

#${e} code {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;

  font-size: 9px;
}

#${e} .section,
#${e} .group {
  margin-bottom: 10px;

  border:
    2px solid
    var(--line);

  border-radius: 6px;

  overflow: hidden;

  background: #fff;
}

#${e} .section.open {
  border-color:
    var(--p);
}

#${e} .section-head {
  min-height: 50px;

  display: flex;

  align-items: center;

  background:
    var(--soft);

  cursor: pointer;
}

#${e} .section-title {
  flex: 1;

  min-width: 0;

  padding:
    9px 11px;
}

#${e} .section-title strong {
  display: block;

  font-size: 13px;
}

#${e} .section-title small {
  display: block;

  margin-top: 2px;

  color:
    var(--muted);

  font-size: 9px;
}

#${e} .section-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 6px;
}

#${e} .section.dragging {
  opacity: .44;

  transform:
    scale(.985);
}

#${e} .section.drag-before {
  box-shadow:
    0 -4px 0
    var(--p),
    0 -8px 18px
    rgba(
      9,
      175,
      237,
      .18
    );
}

#${e} .section.drag-after {
  box-shadow:
    0 4px 0
    var(--p),
    0 8px 18px
    rgba(
      9,
      175,
      237,
      .18
    );
}

#${e} .section-reordered-up {
  animation:
    sve77-section-up
    .30s ease-out;
}

#${e} .section-reordered-down {
  animation:
    sve77-section-down
    .30s ease-out;
}

@keyframes sve77-section-up {
  0% {
    transform:
      translateY(12px);

    box-shadow:
      0 0 0 2px
      rgba(
        9,
        175,
        237,
        .18
      );
  }

  100% {
    transform:
      translateY(0);

    box-shadow:
      0 0 0 0
      rgba(
        9,
        175,
        237,
        0
      );
  }
}

@keyframes sve77-section-down {
  0% {
    transform:
      translateY(-12px);

    box-shadow:
      0 0 0 2px
      rgba(
        9,
        175,
        237,
        .18
      );
  }

  100% {
    transform:
      translateY(0);

    box-shadow:
      0 0 0 0
      rgba(
        9,
        175,
        237,
        0
      );
  }
}

#${e} .section-move-controls {
  display: flex;
  flex: 0 0 auto;
  align-items: center;

  padding:
    8px 0
    8px 5px;
}

#${e} .section-drag-btn,
#${e} .section-move-btn {
  width: 29px;
  height: 29px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border:
    1px solid
    #c9d0d9;

  background:
    #cbd2dc;

  color:
    #566476;

  line-height: 1;

  cursor: pointer;
}

#${e} .section-drag-btn {
  margin-right: 5px;

  border-radius:
    6px;

  cursor: grab;
}

#${e} .section-drag-btn:active {
  cursor: grabbing;
}

#${e} .section-drag-icon {
  width: 18px;
  height: 18px;

  pointer-events: none;
}

#${e} .section-move-btn {
  font-size: 16px;
}

#${e} .section-move-up {
  border-radius:
    6px 0 0 6px;
}

#${e} .section-move-down {
  margin-left: -1px;

  border-radius:
    0 6px 6px 0;
}

#${e} .section-arrow-icon {
  width: 16px;
  height: 16px;

  pointer-events: none;
}

#${e} .section-arrow-up {
  transform:
    rotate(90deg);
}

#${e} .section-arrow-down {
  transform:
    rotate(270deg);
}

#${e}
.section-drag-btn:hover:not(:disabled),

#${e}
.section-move-btn:hover:not(:disabled) {
  position: relative;
  z-index: 1;

  border-color:
    var(--p);

  background:
    #eefaff;

  color:
    var(--p);
}

#${e}
.section-drag-btn:disabled,

#${e}
.section-move-btn:disabled {
  background:
    transparent;

  border-color:
    transparent;

  color:
    #758294;

  opacity: .52;

  cursor:
    default;
}

#${e} .section-pinned
.section-move-controls {
  opacity: .72;
}

#${e} .chev {
  width: 38px;
  height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 0;

  background:
    transparent;

  color:
    #697689;

  cursor: pointer;
}

#${e} .section-chevron {
  width: 18px;
  height: 18px;

  pointer-events: none;

  transition:
    transform .15s ease;
}

#${e} .section.open
.section-chevron {
  transform:
    rotate(180deg);
}

#${e} .section-body {
  display: none;

  padding: 10px;

  border-top:
    1px solid
    var(--line);
}

#${e} .section.open
.section-body {
  display: block;
}

#${e} .group-title {
  padding:
    9px 10px;

  background:
    var(--soft);

  font-size: 11px;

  font-weight: 700;
}

#${e} .sv-category {
  padding:
    14px 10px 4px;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.09em;

  text-transform: uppercase;

  color: var(--muted);

  line-height: 1.3;
}

#${e} .sv-category:first-child {
  padding-top: 8px;
}

#${e} .sv-category + .group {
  margin-top: 0;
}

#${e} .typography-summary {
  min-height: 42px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  cursor: pointer;

  list-style: none;
  user-select: none;
}

#${e}
.typography-summary::-webkit-details-marker {
  display: none;
}

#${e} .typography-chevron {
  width: 18px;
  height: 18px;

  flex: 0 0 18px;

  color: #697689;

  pointer-events: none;

  transition:
    transform .15s ease;
}

#${e}
.typography-dropdown[open]
.typography-chevron {
  transform:
    rotate(180deg);
}

#${e} .typography-body {
  background: #fff;
}

#${e}
.typography-body
.field:first-child {
  border-top:
    1px solid
    #edf0f3;
}

#${e} .field {
  padding: 10px;

  border-top:
    1px solid
    #edf0f3;
}

#${e} .group-body
.field:first-child {
  border-top: 0;
}

#${e} label {
  display: block;

  margin-bottom: 6px;

  color:
    #586679;

  font-size: 10px;
  font-weight: 650;
}

#${e} .style-select {
  width: 100%;
  height: 38px;

  padding:
    0 30px
    0 9px;

  border:
    2px solid
    var(--line);

  border-radius: 5px;

  outline: 0;

  background: #fff;

  color:
    var(--txt);

  font: inherit;

  font-size: 11px;

  cursor: pointer;
}

#${e} .style-select:focus {
  border-color:
    var(--p);
}

#${e}
input[type="text"],

#${e}
input[type="number"],

#${e}
input[type="datetime-local"],

#${e}
textarea {
  width: 100%;

  border:
    2px solid
    var(--line);

  border-radius: 5px;

  outline: 0;

  font: inherit;

  font-size: 12px;

  background: #fff;
}

#${e}
input[type="text"],

#${e}
input[type="number"],

#${e}
input[type="datetime-local"] {
  height: 39px;

  padding:
    0 9px;
}

#${e} textarea {
  min-height: 74px;

  padding: 9px;

  resize: vertical;
}

#${e} input:focus,
#${e} textarea:focus {
  border-color:
    var(--p);
}

#${e}
input[data-auto-wedding-id="1"] {
  border-color:
    #cfd7e1;

  background:
    #f1f4f7;

  color:
    #536174;

  cursor:
    not-allowed;

  user-select:
    all;
}

#${e}
input[data-auto-wedding-id="1"]:focus {
  border-color:
    #cfd7e1;

  box-shadow:
    none;
}

#${e}
.auto-wedding-id-note {
  display:
    block;

  margin-top:
    6px;

  color:
    #7a8798;

  font-size:
    9px;

  line-height:
    1.35;
}

#${e} select {
  width: 100%;
  min-height: 38px;

  border:
    1px solid
    var(--line);

  border-radius:
    8px;

  background:
    #fff;

  padding:
    8px 10px;

  color:
    #263243;

  font:
    inherit;
}

#${e} select:focus {
  border-color:
    var(--p);

  outline:
    none;
}

#${e}
[data-field-readonly="1"] {
  background:
    #f1f4f7;

  color:
    #536174;

  cursor:
    not-allowed;
}

#${e}
.boolean-field {
  min-height:
    38px;

  display:
    flex;

  align-items:
    center;

  gap:
    9px;

  padding:
    8px 10px;

  border:
    1px solid
    var(--line);

  border-radius:
    8px;

  background:
    #fff;
}

#${e}
.boolean-field input {
  width:
    16px;

  height:
    16px;

  min-height:
    0;

  margin:
    0;

  flex:
    0 0 auto;
}

#${e}
.field-help {
  display:
    block;

  margin-top:
    6px;

  color:
    #7a8798;

  font-size:
    9px;

  line-height:
    1.4;
}

#${e}
.repeater-warning {
  margin-bottom:
    8px;
}

#${e} .compatibility-panel {
  display: grid;
  gap: 10px;
}

#${e} .compat-detail-group + .compat-detail-group {
  margin-top: 12px;
}

#${e} .compat-detail-group > strong {
  display: block;
  margin-bottom: 5px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
}

#${e} .compat-version {
  display: block;
  margin-top: 12px;
  color: var(--muted);
  font-size: 9px;
}

#${e} .compat-status {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--soft);
}

#${e} .compat-status strong {
  font-size: 12px;
}

#${e} .compat-status span {
  font-size: 10px;
  opacity: .72;
}

#${e} .compat-pass {
  border-color: #52a36b;
  background: #edf9f0;
}

#${e} .compat-warning {
  border-color: #c89734;
  background: #fff8e7;
}

#${e} .compat-blocker {
  border-color: #df4d5b;
  background: #fff0f2;
}

#${e} .compat-list ul {
  margin: 0;
  padding-left: 18px;
}

#${e} .compat-list li,
#${e} .compat-empty {
  margin: 0 0 6px;
  font-size: 10px;
  line-height: 1.45;
}

#${e} .compat-code {
  max-height: 250px;
  overflow: auto;
  margin: 0;
  padding: 9px;
  border-radius: 5px;
  background: #111827;
  color: #f9fafb;
  font-size: 9px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
}


#${e} .style-reset-zone {
  padding-top: 10px;
}

#${e} .button {
  min-height: 39px;

  padding:
    0 10px;

  border:
    2px solid
    var(--p);

  border-radius: 5px;

  background: #fff;

  color:
    var(--p);

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

#${e} .button.primary {
  background:
    var(--p);

  color: #fff;
}

#${e} .button.secondary {
  border-color: var(--line);
  background: #fff;
  color: var(--txt);
}

#${e} .button.secondary:hover:not(:disabled) {
  border-color: var(--p);
  color: var(--p);
}

#${e} .save-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 0 0 auto;
}

#${e} .button.support {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  border-color:
    #25D366;

  background:
    #25D366;

  color:
    #fff;
}

#${e} .button.support:hover {
  border-color:
    #1ebe5d;

  background:
    #1ebe5d;
}

#${e} .button.editor-update {
  border-color: var(--p);
  background: #fff;
  color: var(--p);
}

#${e} .button.editor-update:hover {
  border-color: var(--p);
  background: #f2f5f8;
}

#${e} .update-status {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.25;
}

#${e} .update-status:empty {
  display: none;
}

#${e} .support-icon {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
  fill: currentColor;
  pointer-events: none;
}

#${e} .button.danger {
  border-color:
    #e7515e;

  color:
    #e7515e;
}

#${e} .button.full {
  width: 100%;
}

#${e} .button:disabled {
  opacity: .45;

  cursor:
    not-allowed;
}

#${e} .template-library-panel {
  display: grid;
  gap: 12px;
}

#${e} .library-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

#${e} .library-header-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
}

#${e} .library-heading {
  min-width: 0;
  display: grid;
  gap: 4px;
}

#${e} .library-heading h2 {
  margin: 0;
  color: var(--txt);
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
}

#${e} .library-header strong {
  display: block;
  color: var(--txt);
  font-size: 13px;
  line-height: 18px;
}

#${e} .library-header small {
  color: var(--muted);
  font-size: 10px;
  line-height: 14px;
}

#${e} .library-header .button {
  min-height: 32px;
  flex: 0 0 auto;
  padding: 0 9px;
  font-size: 10px;
}

#${e} .library-alert,
#${e} .library-empty {
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: var(--soft);
  color: var(--muted);
  font-size: 10px;
  line-height: 15px;
}

#${e} .library-summary {
  display: flex;
  align-items: baseline;
  gap: 5px;
  color: var(--muted);
  font-size: 10px;
  line-height: 14px;
}

#${e} .library-summary strong {
  color: var(--txt);
  font-size: 12px;
}

#${e} .library-alert-warning {
  border-color: #c89734;
  background: #fff8e7;
  color: #765b16;
}

#${e} .library-alert {
  display: grid;
  gap: 3px;
}

#${e} .library-alert strong {
  color: #5f4811;
  font-size: 11px;
}

#${e} .library-alert-action {
  justify-self: start;
  margin-top: 4px;
  min-height: 30px !important;
}

#${e} .library-card {
  display: block;
  margin-bottom: 16px;
  padding: 12px;
  border: 2px solid var(--line);
  border-radius: 4px;
  background: #fff;
  transition: border-color .16s ease, background-color .16s ease;
}

#${e} .library-card:last-child {
  margin-bottom: 0;
}

#${e} .library-card:hover {
  border-color: var(--p);
  background: #fff;
}

#${e} .library-card.is-active {
  border-color: var(--p);
  background: rgba(8, 153, 207, .05);
}

#${e} .library-card-copy {
  min-width: 0;
  flex: 1 1 auto;
}

#${e} .library-card-row {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 12px;
}

#${e} .library-card-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

#${e} .library-card-heading h3 {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--txt);
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#${e} .library-card-description {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 16px;
}

#${e} .library-commission-note {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px 6px;
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 16px;
}

#${e} .library-commission-note strong {
  color: inherit;
  font-weight: 600;
}

#${e} .library-commission-note a {
  color: var(--p);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

#${e} .library-commission-note a:hover {
  text-decoration: underline;
}

#${e} .library-import-button {
  min-width: 80px;
  min-height: 36px;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

#${e} .library-card-actions {
  flex: 0 0 auto;
}

#${e} .library-loading {
  display: grid;
  gap: 16px;
}

#${e} .library-skeleton-card {
  height: 64px;
  border: 2px solid var(--line);
  border-radius: 4px;
  background: linear-gradient(90deg, #f3f6f9 25%, #e9eef3 50%, #f3f6f9 75%);
  background-size: 200% 100%;
  animation: sve77-library-loading 1.3s ease-in-out infinite;
}

@keyframes sve77-library-loading {
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
}

#${e} .library-empty {
  display: grid;
  gap: 3px;
}

#${e} .library-empty strong {
  color: var(--txt);
  font-size: 11px;
  line-height: 15px;
}

#${e} .library-empty span {
  color: var(--muted);
  font-size: 10px;
  line-height: 14px;
}

#${e} .library-refresh-button {
  white-space: nowrap;
}

#${e} .library-clear-button {
  min-width: 0;
  min-height: 32px;
  padding: 0 9px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  #${e} .library-card,
  #${e} .library-skeleton-card {
    transition: none;
    animation: none;
  }
}

@media (max-width: 980px) {
  #${e} .library-header {
    align-items: stretch;
  }
}

#${e} .mini {
  margin-top: 6px;

  padding: 0;

  border: 0;

  background:
    transparent;

  color:
    #677486;

  font-size: 9px;

  text-decoration:
    underline;

  cursor: pointer;
}

#${e} .font-apply {
  margin-top: 10px !important;
}

#${e} .two {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 8px;

  margin-top: 9px;
}

/* =====================================================
   v0.8.2 \u2014 SCALEV NATIVE MEDIA DENSITY + RIGHT ACTION RAIL
   Thumbnail is clean. Edit/Delete/Setting live in a dedicated
   action rail on the right side of the card main row.
   ===================================================== */

#${e} .image-card {
  display: block;
  margin-bottom: 12px;
  padding: 10px;
  overflow: hidden;
  border: 2px solid #dbdfe5;
  border-radius: 4px;
  background: #fff;
}

#${e} .image-card .image-card-main {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 10px;
}

#${e} .image-card .image-card-meta {
  min-width: 0;
  flex: 1 1 auto;
  padding-top: 1px;
}

#${e} .image-card .image-card-name,
#${e} .image-card .image-card-path {
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#${e} .image-card .image-card-name {
  color: #243244;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .image-card .image-card-path {
  margin-top: 4px;
  color: #697689;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
}

#${e} .image-card .image-preview-shell {
  position: relative;
  width: 68px;
  height: 68px;
  flex: 0 0 68px;
  aspect-ratio: auto;
  margin: 0;
  overflow: hidden;
  border-radius: 4px;
  background: #eef1f4;
}

#${e} .image-card .image-preview-shell .preview {
  width: 100%;
  height: 100%;
  max-width: none;
  min-height: 0;
  max-height: none;
  margin: 0;
  object-fit: cover;
}

#${e} .image-card .image-card-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-left: auto;
  padding-top: 0;
}

#${e} .image-card .image-card-action {
  display: inline-flex;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #dbdfe5;
  border-radius: 4px;
  background: #fff;
  color: #697689;
  cursor: pointer;
}

#${e} .image-card .image-card-action svg {
  width: 14px;
  height: 14px;
}

#${e} .image-card .image-action-delete {
  color: #ef4d5d;
}

#${e} .image-card .image-action-setting {
  color: #697689;
}

#${e} .image-card .image-action-setting.active,
#${e} .image-card .image-action-setting[aria-expanded="true"] {
  border-color: var(--p);
  background: rgba(9,175,237,.08);
  color: var(--p);
}

#${e} .image-card .image-card-action:hover,
#${e} .image-card .image-card-action:focus-visible {
  border-color: currentColor;
  background: #f8fafb;
  outline: 0;
}

#${e} .image-card .image-url-row {
  display: flex;
  min-width: 0;
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
  border: 1px solid #dbdfe5;
  border-radius: 4px;
  background: #f8fafb;
}

#${e} .image-card .image-url-row:focus-within {
  border-color: var(--p);
}

#${e} .image-card .image-url-row input[type="text"] {
  min-width: 0;
  width: 1px;
  flex: 1 1 auto;
  padding: 7px 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #243244;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
}

#${e} .image-card .image-url-row input[type="text"]:focus {
  outline: 0;
}

#${e} .image-card .image-paste-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 7px 8px;
  border: 0;
  border-left: 1px solid #dbdfe5;
  background: #fff;
  color: var(--p);
  font-family: "Roboto", var(--system-font-quill);
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
  cursor: pointer;
}

#${e} .image-card .image-paste-button svg {
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
}

#${e} .image-card .image-paste-button:hover,
#${e} .image-card .image-paste-button:focus-visible {
  background: rgba(9,175,237,.06);
  outline: 0;
}

#${e} .image-card .image-upload-placeholder {
  min-height: 0;
  padding: 0;
}

#${e} .image-card .image-upload-title,
#${e} .image-card .image-upload-note {
  display: none;
}

#${e} .image-card .image-upload-icon {
  margin: 0;
}

#${e} .image-card .image-upload-icon svg {
  width: 20px;
  height: 20px;
}

/* Closed Advance must not add vertical bulk to every media row. */
#${e} .image-card .image-advance:not([open]) {
  display: none;
}

#${e} .image-card .image-advance[open] {
  margin-top: 10px;
  border-top: 1px solid #edf0f3;
}

#${e} .image-card .advance-summary {
  min-height: 36px;
  padding: 0 2px;
  background: #fff;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 345px) {
  #${e} .image-card .image-card-main {
    gap: 8px;
  }

  #${e} .image-card .image-card-actions {
    flex-direction: column;
    gap: 3px;
  }

  #${e} .image-card .image-card-action {
    width: 26px;
    height: 26px;
    flex-basis: 26px;
  }
}

#${e} .image-card-hidden {
  opacity: 1;
}

#${e} .preview {
  display: block;

  width: 100%;
  height: 100%;

  max-width: none;
  min-height: 0;
  max-height: none;

  margin: 0;

  object-fit: cover;

  border:
    1px solid
    var(--line);

  border-radius: 5px;

  background:
    var(--soft);
}

#${e} .preview.empty {
  border:
    2px dashed
    #b8c0ca;

  color:
    #8b97a6;

  background:
    #f6f9fc;
}

#${e} .image-upload-placeholder {
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 18px;

  font: inherit;

  text-align: center;

  cursor: pointer;
}

#${e}
.image-upload-placeholder:hover {
  border-color:
    var(--p);

  background:
    #f7fcfe;
}

#${e} .image-upload-icon {
  display: inline-flex;

  color:
    var(--p);

  font-size: 20px;

  line-height: 1;
}

#${e}
.image-upload-icon svg {
  width: 20px;
  height: 20px;
}

#${e} .image-upload-title {
  color:
    var(--p);

  font-size: 12px;

  font-weight: 500;

  line-height: 20px;
}

#${e}
.image-upload-title b {
  color:
    #ef4d5d;

  font-weight: 600;
}

#${e} .image-upload-note {
  color:
    #6f7c8d;

  font-size: 10px;

  font-weight: 400;

  line-height: 16px;
}

#${e} .image-advance {
  width: 100%;

  margin-top: 10px;

  border: 0;

  border-radius: 4px;

  overflow: hidden;

  background: #fff;
}

#${e} .advance-summary {
  width: 100%;
  min-height: 42px;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 8px;

  padding:
    0 10px
    0 11px;

  background:
    var(--soft);

  color:
    #1f2b3a;

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  list-style: none;

  user-select: none;
}

#${e}
.advance-summary::-webkit-details-marker {
  display: none;
}

#${e} .advance-chevron {
  flex:
    0 0 auto;

  width: 18px;
  height: 18px;

  color:
    #5b6675;

  transition:
    transform .15s ease;
}

#${e}
.image-advance:not([open])
.advance-chevron {
  transform:
    rotate(180deg);
}

#${e} .advance-body {
  width: 100%;

  height: auto;

  padding: 10px;

  background: #fff;
}

#${e} .advance-design-title {
  margin:
    0 0 6px;

  color:
    #243244;

  font-size: 11px;
  font-weight: 700;

  line-height: 16px;
}

#${e} .advance-group {
  padding:
    10px 0 12px;

  border-bottom:
    2px solid
    var(--line);
}

#${e} .advance-group:last-child {
  padding-bottom: 11px;

  border-bottom: 0;
}

#${e} .advance-label {
  display: block;

  margin:
    0 0 10px;

  color:
    #5b6675;

  font-size: 10px;
  font-weight: 650;

  line-height: 15px;
}

#${e} .advance-pos-grid {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap: 8px;
}

#${e} .advance-pos-btn {
  min-width: 0;
  min-height: 42px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding:
    0 4px;

  border:
    2px solid
    #d7dbe0;

  border-radius: 4px;

  background: #fff;

  color:
    #5b6675;

  cursor: pointer;
}

#${e} .advance-pos-btn.active {
  border-color:
    var(--p);
}

#${e} .advance-pos-btn:hover {
  border-color:
    var(--p);
}

#${e} .advance-pos-icon {
  display: block;

  width: 20px;
  height: 20px;

  opacity: .72;
}

#${e}
.advance-pos-btn.active
.advance-pos-icon,
#${e}
.advance-pos-btn:hover
.advance-pos-icon,
#${e}
.advance-pos-default.active
.advance-pos-icon,
#${e}
.advance-pos-default:hover
.advance-pos-icon {
  opacity: 1;
}

#${e} .advance-pos-default {
  width: 100%;
  min-height: 40px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  margin-top: 8px;

  padding:
    0 8px;

  border:
    2px solid
    #d7dbe0;

  border-radius: 4px;

  background: #fff;

  color:
    #414b59;

  font-size: 11px;
  font-weight: 650;

  cursor: pointer;
}

#${e} .advance-pos-default.active,
#${e} .advance-pos-default:hover {
  border-color:
    var(--p);
}

#${e} .range-row {
  display: grid;

  grid-template-columns:
    minmax(
      0,
      1fr
    )
    72px;

  gap: 10px;

  align-items: center;
}

#${e} input[type="range"] {
  width: 100%;

  accent-color:
    var(--p);

  cursor: pointer;
}

#${e} .range-number {
  display: grid;

  grid-template-columns:
    1fr 20px;

  align-items: center;

  border:
    2px solid
    var(--line);

  border-radius: 4px;

  overflow: hidden;

  background:
    var(--soft);
}

#${e} .range-number input {
  height:
    40px !important;

  border:
    0 !important;

  text-align: right;

  padding:
    0 4px !important;

  background:
    transparent !important;
}

#${e} .range-number span {
  font-size: 12px;

  color:
    #1f2b3a;
}

#${e} .advance-fit-grid {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(
        0,
        1fr
      )
    );

  gap: 10px;
}

#${e} .advance-fit-btn {
  min-width: 0;

  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  padding: 10px;

  border:
    2px solid
    #d7dbe0;

  border-radius: 4px;

  background: #fff;

  color:
    #5b6675;

  cursor: pointer;
}

#${e} .advance-fit-btn.active {
  border-color:
    var(--p);
}

#${e} .advance-fit-preview {
  position: relative;

  width: 100%;
  height: 68px;

  display: block;

  overflow: hidden;

  border-radius: 4px;

  background:
    #dfe4ea;
}

#${e} .advance-fit-preview::after {
  content: "";

  position: absolute;

  top: 0;
  bottom: 0;

  background:
    #aeb8c5;
}

#${e}
.advance-fit-preview.auto::after {
  left: 6px;
  right: 6px;
}

#${e}
.advance-fit-preview.cover::after {
  left: 0;
  right: 0;
}

#${e}
.advance-fit-preview.contain::after {
  left: 15px;
  right: 15px;
}

#${e} .advance-fit-label {
  width: 100%;

  margin-top: 10px;

  color:
    #414b59;

  font-size: 11px;
  font-weight: 650;
}

#${e} .audio-field {
  padding:
    12px 10px 10px;
}

#${e} .audio-start-row {
  display: grid;

  grid-template-columns:
    18px
    minmax(0, 1fr)
    72px;

  gap: 8px;

  align-items: center;

  margin-top: 12px;

  padding:
    12px 0 0;

  border-top:
    1px solid
    #edf0f3;
}

#${e} .audio-start-check {
  width: 18px !important;
  height: 18px !important;

  margin: 0 !important;
  padding: 0 !important;

  accent-color:
    var(--p);

  cursor: pointer;
}

#${e} .audio-start-label {
  margin: 0 !important;

  color:
    var(--txt);

  font-size: 11px;
  font-weight: 650;

  cursor: pointer;
}

#${e} .audio-start-time {
  width: 72px !important;
  height: 34px !important;

  padding:
    0 6px !important;

  text-align: center;

  font-size: 11px;

  font-variant-numeric:
    tabular-nums;
}

#${e} .audio-start-time:disabled {
  opacity: .55;

  background:
    var(--soft);
}

#${e} .color-row {
  display: grid;

  grid-template-columns:
    44px 1fr;

  gap: 9px;

  align-items: center;
}


#${e} .colors-empty {
  margin: 0;
  padding: 12px;

  display: flex;
  flex-direction: column;
  gap: 3px;

  border:
    1px solid
    #dbdfe5;

  border-radius: 4px;

  background:
    #f6f9fc;

  color:
    #202c3b;
}

#${e} .colors-empty strong {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .colors-empty span {
  color: #697689;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
}

#${e} .color-unset-swatch {
  width: 44px;
  height: 44px;

  border:
    2px dashed
    #dbdfe5;

  border-radius: 5px;

  background:
    #f6f9fc;
}

#${e} .color-row-unset input:disabled {
  color: #8a95a3;
  background: #f6f9fc;
  cursor: not-allowed;
}

#${e}
input[type="color"] {
  width: 44px;
  height: 44px;

  padding: 2px;

  border:
    2px solid
    var(--line);

  border-radius: 5px;
}

#${e} .color-row small {
  display: block;

  margin-top: 4px;

  color:
    var(--muted);

  font-size: 8px;
}

#${e} .repeat-item {
  margin: 8px;

  border:
    1px solid
    var(--line);

  border-radius: 5px;
}

#${e} .repeat-head {
  display: flex;

  align-items: center;

  padding:
    8px 9px;

  background:
    var(--soft);
}

#${e} .repeat-head strong {
  flex: 1;

  font-size: 10px;
}

#${e} .repeat-head button {
  border: 0;

  background:
    transparent;

  color:
    #df4d5b;

  font-size: 9px;

  cursor: pointer;
}

#${e} .switch-wrap {
  margin-right: 8px;
}

#${e} .switch-wrap input {
  display: none;
}

#${e} .switch {
  display: block;

  position: relative;

  width: 34px;
  height: 19px;

  border-radius: 12px;

  background:
    #bdc6d0;

  cursor: pointer;
}

#${e} .switch::after {
  content: "";

  position: absolute;

  top: 3px;
  left: 3px;

  width: 13px;
  height: 13px;

  border-radius: 50%;

  background: #fff;

  transition: .15s;
}

#${e}
.switch-wrap
input:checked
+ .switch {
  background:
    var(--p);
}

#${e}
.switch-wrap
input:checked
+ .switch::after {
  transform:
    translateX(
      15px
    );
}

#${e} .helper {
  margin:
    7px 0 0;

  color:
    var(--muted);

  font-size: 9px;

  line-height: 1.45;
}

#${e} .reset-zone {
  display: grid;

  gap: 8px;

  margin-top: 20px;
}

#${e} .pin-zone {
  margin: 0 0 14px;
  padding: 0 0 14px;
  border-bottom: 1px solid var(--line);
}

#${e} .pin-zone-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

#${e}-body .pin-zone-title {
  color: #5b6675;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: normal;
  text-transform: none;
}

#${e} .pin-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
}

#${e} .pin-pill::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b9c2cd;
}

#${e} .pin-pill.ok {
  color: #1a7f4b;
}

#${e} .pin-pill.ok::before {
  background: #1a7f4b;
}

#${e} .pin-pill.loading {
  color: var(--p);
}

#${e} .pin-pill.loading::before {
  background: var(--p);
}

#${e} .pin-pill.warn {
  color: #9a6b1f;
}

#${e} .pin-pill.warn::before {
  background: #d9a63a;
}

#${e} .pin-pill.error {
  color: #c0392b;
}

#${e} .pin-pill.error::before {
  background: #c0392b;
}

/* PIN Dashboard \u2014 native Scalev field (label + readonly input + copy chip).
   Mirrors the Scalev "Client ID" control: wrapper border-2 rounded, input
   38px, gray chip copy icon, primary text-link action below. */
#${e}-body .pin-ctl {
  display: block;
  margin: 0;
}

#${e}-body .pin-ctl > label {
  display: block;
  margin: 0 0 10px;
  color: #223548;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

#${e}-body .pin-ctl-box {
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  border-radius: 4px;
  background: #eef1f4;
  transition: border-color .15s ease;
}

#${e}-body .pin-ctl-box:focus-within {
  border-color: #09afed;
}

#${e}-body .pin-ctl-box > input {
  flex: 1 1 auto;
  min-width: 0;
  width: auto;
  margin: 0;
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 12px !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #223548;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px !important;
  font-weight: 400;
  line-height: 20px;
  cursor: default;
}

#${e}-body .pin-ctl-box > input:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

#${e}-body .pin-ctl-box > input::placeholder {
  color: #8a94a3;
  font-weight: 400;
}

#${e}-body .pin-ctl-chip,
#${e}-body .pin-ctl-save {
  flex: 0 0 auto;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border: 0;
  border-radius: 0;
  outline: 0;
  font-family: "Roboto", var(--system-font-quill);
  line-height: 1;
  cursor: pointer;
}

#${e}-body .pin-ctl-chip {
  gap: 4px;
  padding: 0 8px;
  border-left: 1px solid #dbdfe5;
  background: #fff;
  color: #0899cf;
  font-size: 11px;
  font-weight: 600;
}

#${e}-body .pin-ctl-chip:hover {
  background: #f6f9fc;
  color: #0788bb;
}

#${e}-body .pin-ctl-save {
  padding: 0 14px;
  background: #09afed;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

#${e}-body .pin-ctl-save:hover {
  background: #0899cf;
}

#${e}-body .pin-ctl-action {
  display: block;
  margin: 8px 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #006b94;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

#${e}-body .pin-ctl-action:hover {
  text-decoration: underline;
}

#${e} button:focus-visible,
#${e} a:focus-visible {
  outline: 2px solid #006b94;
  outline-offset: 2px;
}

#${e}-body .pin-ctl-action.is-busy {
  color: #8a94a3;
  cursor: default;
  text-decoration: none;
}

#${e}-body .pin-ctl-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 8px;
}

#${e}-body .pin-ctl-foot .pin-ctl-action {
  margin: 0;
}

#${e}-body .pin-ctl-link {
  color: #0899cf;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

/* Pembatas antar tombol: satu garis tipis di kiri setiap tombol kecuali
   yang pertama, jadi jumlah garis selalu satu kurang dari jumlah tombol. */
#${e}-body .pin-ctl-foot .pin-ctl-action + .pin-ctl-link,
#${e}-body .pin-ctl-foot .pin-ctl-link + .pin-ctl-link {
  border-left: 1px solid #dbdfe5;
  padding-left: 8px;
}

#${e}-body .pin-ctl-link:hover {
  text-decoration: underline;
}

#${e} .savebar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 72px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 9px 12px;
  border-top: 2px solid var(--line);
  background: #fff;
}

#${e} .footer-meta {
  min-width: 0;
}

#${e} .footer-meta strong {
  display: block;
  overflow: hidden;
  color: #202c3b;
  font-size: 11px;
  line-height: 1.25;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#${e} .footer-meta small {
  display: block;
  margin-top: 2px;
  overflow: hidden;
  color: #738092;
  font-size: 9px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#${e} .font-manual-help {
  margin-top: 6px;

  color: #738092;

  font-size: 10px;
  line-height: 1.4;
}

#${e} .font-google-link {
  display: inline-flex;

  margin-top: 7px;

  align-items: center;

  color: #0798cf;

  font-size: 11px;
  line-height: 1.3;
  font-weight: 600;

  text-decoration: none;
}

#${e} .font-google-link:hover,
#${e} .font-google-link:focus {
  color: #087da8;

  text-decoration: underline;
}



/* =====================================================
   v0.7.7 \u2014 UNIFIED CONTENT CONTROL SYSTEM
   ===================================================== */

#${e} .section-head {
  min-height: 44px;
}

#${e} .section-title {
  padding: 7px 9px;
}

#${e} .section-title strong {
  font-size: 11px;
  line-height: 1.25;
  font-weight: 700;
}

#${e} .section-title small {
  margin-top: 1px;
  font-size: 8.5px;
  line-height: 1.25;
}

#${e} .section-body {
  padding: 8px;
}

#${e} .group-title {
  padding: 7px 9px;
  font-size: 10px;
  line-height: 1.3;
}

#${e} .field {
  padding: 8px 9px;
}

#${e} label {
  margin-bottom: 5px;
  font-size: 9.5px;
  line-height: 1.3;
  font-weight: 650;
}

#${e} .content-field-label-sr {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

#${e} input.content-control,
#${e} textarea.content-control,
#${e} select.content-control,
#${e} .style-select,
#${e} select[data-field-path] {
  width: 100%;
  height: 38px;
  min-height: 38px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  outline: 0;
  background: #fff;
  color: var(--txt);
  font: inherit;
  font-size: 11px;
  line-height: 1.3;
  box-shadow: none;
}

#${e} textarea.content-control {
  min-height: 78px;
  height: auto;
  padding: 9px 10px;
  line-height: 1.45;
}

#${e} input.content-control:focus,
#${e} textarea.content-control:focus,
#${e} select.content-control:focus,
#${e} .style-select:focus,
#${e} select[data-field-path]:focus,
#${e} .content-url-shell:focus-within {
  border-color: var(--p);
  box-shadow: 0 0 0 2px rgba(9,175,237,.1);
}

#${e} .content-control[type="date"],
#${e} .content-control[type="time"],
#${e} .content-control[type="datetime-local"] {
  appearance: none;
  -webkit-appearance: none;
  color-scheme: light;
  font-size: 11px;
}

#${e} .content-control::-webkit-calendar-picker-indicator {
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 2px;
  opacity: .62;
  cursor: pointer;
}

#${e} .content-url-shell {
  display: grid;
  grid-template-columns: auto minmax(0,1fr);
  align-items: center;
  min-height: 38px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}

#${e} .content-url-badge {
  height: 100%;
  min-width: 43px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-right: 1px solid #e5e9ef;
  background: var(--soft);
  color: #66758a;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .08em;
}

#${e} .content-url-shell .content-control-url {
  height: 36px;
  min-height: 36px;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

#${e} .repeat-item {
  margin: 7px;
  border-radius: 7px;
}

#${e} .repeat-head {
  min-height: 34px;
  padding: 6px 8px;
}

#${e} .repeat-head strong {
  font-size: 9.5px;
  line-height: 1.25;
}

#${e} .repeat-head button {
  font-size: 8.5px;
}

#${e} .typography-summary {
  min-height: 38px;
}

#${e} .typography-role {
  padding: 8px 9px 9px;
  border-top: 1px solid #edf0f3;
}

#${e} .typography-role:first-child {
  border-top: 0;
}

#${e} .typography-role-title {
  margin-bottom: 6px;
  color: #435168;
  font-size: 9.5px;
  font-weight: 750;
}

#${e} .typography-control-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

#${e} .typography-control label {
  margin-bottom: 4px;
  font-size: 8px;
}

#${e} .typography-control .style-select {
  height: 34px;
  min-height: 34px;
  padding: 0 22px 0 7px;
  border-radius: 7px;
  font-size: 9.5px;
}

#${e} .compatibility-panel {
  display: grid;
  gap: 7px;
}

#${e} .compat-status {
  gap: 4px;
  padding: 9px 10px;
  border-radius: 8px;
}

#${e} .compat-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

#${e} .compat-status-row strong {
  font-size: 11px;
}

#${e} .compat-status-row span,
#${e} .compat-status small {
  font-size: 8.5px;
  line-height: 1.35;
}

#${e} .compat-status small {
  display: block;
  opacity: .75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#${e} .compat-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

#${e} .compat-metrics .metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  min-width: 0;
  padding: 6px 7px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: #fff;
  font-size: 8.5px;
}

#${e} .compat-detail {
  margin: 0;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: #fff;
  overflow: hidden;
}

#${e} .compat-detail summary {
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 9px;
  list-style: none;
  cursor: pointer;
  font-size: 9.5px;
  font-weight: 650;
}

#${e} .compat-detail summary::-webkit-details-marker {
  display: none;
}

#${e} .compat-detail summary b {
  min-width: 23px;
  padding: 2px 5px;
  border-radius: 999px;
  background: var(--soft);
  text-align: center;
  font-size: 8px;
}

#${e} .compat-detail-body {
  padding: 7px 9px;
  border-top: 1px solid #edf0f3;
}

#${e} .compat-list li,
#${e} .compat-empty {
  margin-bottom: 4px;
  font-size: 9px;
  line-height: 1.35;
}

#${e} .compat-code {
  max-height: 160px;
  padding: 7px;
  font-size: 8px;
}

/* v0.7.8: status panel must never overflow the editor width. */
#${e} .compatibility-panel,
#${e} .compat-status,
#${e} .compat-status-row,
#${e} .compat-metrics,
#${e} .compat-detail,
#${e} .compat-detail summary,
#${e} .compat-detail-body,
#${e} .compat-list,
#${e} .compat-list ul,
#${e} .compat-list li,
#${e} .compat-empty {
  min-width: 0;
  max-width: 100%;
}

#${e} .compatibility-panel,
#${e} .compat-status,
#${e} .compat-detail {
  width: 100%;
  overflow: hidden;
}

#${e} .compat-status-row > *,
#${e} .compat-detail summary > * {
  min-width: 0;
}

#${e} .compat-status small {
  display: -webkit-box;
  max-width: 100%;
  white-space: normal;
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

#${e} .compat-list ul {
  padding-right: 2px;
}

#${e} .compat-list li,
#${e} .compat-empty,
#${e} .compat-code {
  overflow-wrap: anywhere;
  word-break: break-word;
}
`,document.head.appendChild(r)}function bf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
#${e}-body[data-sve-tab="style"] {
  padding: 16px 16px 80px;
  font-family: "Roboto", var(--system-font-quill);
  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  line-height: inherit;
  color: #202c3b;
}

#${e}-body[data-sve-tab="style"] .group {
  margin-bottom: 16px;
  border: 2px solid #dbdfe5;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}

#${e}-body[data-sve-tab="style"] .group-title {
  min-height: 42px;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #fff;
  color: #202c3b;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] .field {
  padding: 12px;
  border-top: 1px solid #edf0f3;
}

#${e}-body[data-sve-tab="style"] .field > label,
#${e}-body[data-sve-tab="style"] .typography-control > label {
  display: block;
  margin: 0 0 8px;
  color: #4c596a;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] input[type="text"],
#${e}-body[data-sve-tab="style"] input[type="number"],
#${e}-body[data-sve-tab="style"] .style-select {
  width: 100%;
  height: 42px;
  min-height: 42px;
  padding: 0 12px;
  border: 2px solid #dbdfe5;
  border-radius: 4px;
  outline: none;
  background: #fff;
  color: #202c3b;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  word-spacing: 1px;
  box-shadow: none;
}

#${e}-body[data-sve-tab="style"] input[type="text"]::placeholder,
#${e}-body[data-sve-tab="style"] input[type="number"]::placeholder {
  color: #8a95a3;
  opacity: 1;
}

#${e}-body[data-sve-tab="style"] input[type="text"]:focus,
#${e}-body[data-sve-tab="style"] input[type="number"]:focus,
#${e}-body[data-sve-tab="style"] .style-select:focus {
  border-color: #0899cf;
  box-shadow: none;
}

#${e}-body[data-sve-tab="style"] .font-manual-help {
  margin-top: 6px;
  color: #697689;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] .font-google-link {
  margin-top: 8px;
  color: #0899cf;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

#${e}-body[data-sve-tab="style"] .button {
  min-height: 40px;
  padding: 0 16px;
  border: 2px solid #0899cf;
  border-radius: 4px;
  background: #fff;
  color: #0899cf;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] .button.primary {
  background: #0899cf;
  color: #fff;
}

#${e}-body[data-sve-tab="style"] .button.danger {
  border-color: #e7515e;
  color: #e7515e;
}

#${e}-body[data-sve-tab="style"] .font-apply {
  margin-top: 10px !important;
}

#${e}-body[data-sve-tab="style"] .typography-summary {
  min-height: 42px;
  justify-content: space-between;
  cursor: pointer;
}

#${e}-body[data-sve-tab="style"] .typography-role {
  padding: 12px;
  border-top: 1px solid #edf0f3;
}

#${e}-body[data-sve-tab="style"] .typography-role-title {
  margin-bottom: 10px;
  color: #202c3b;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] .typography-control-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

#${e}-body[data-sve-tab="style"] .typography-control > label {
  margin-bottom: 6px;
  font-size: 11px;
  line-height: 16px;
}

#${e}-body[data-sve-tab="style"] .typography-control .style-select {
  height: 40px;
  min-height: 40px;
  padding: 0 28px 0 10px;
  font-size: 13px;
  line-height: 18px;
}

#${e}-body[data-sve-tab="style"] .style-reset-zone {
  padding-top: 0;
  margin-top: 0;
}

@media (max-width: 430px) {
  #${e}-body[data-sve-tab="style"] {
    padding-left: 12px;
    padding-right: 12px;
  }

  #${e}-body[data-sve-tab="style"] .typography-control-grid {
    grid-template-columns: 1fr;
  }
}

@media(
  max-width:900px
) {
  :root {
    --sve77-panel-width: 100vw;
  }

  html.sve77-panel-open [data-sve77-page-root="1"][data-sve77-layout="flow"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: 0 !important;
  }

  html.sve77-panel-open [data-sve77-page-root="1"][data-sve77-layout="positioned"],
  [data-sve77-top-toolbar="1"] { right: 0 !important; }

  #${e}-dock {
    height: calc(100dvh - var(--sve77-global-header-height));
    min-height: 0;
  }

  #${e} .section-head { flex-wrap: wrap; }
  #${e} .section-title { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  #${e} .section-move-controls { flex: 0 0 auto; }
  #${e} .section-drag-btn,
  #${e} .section-move-btn,
  #${e} .chev,
  #${e} .panel-tool { min-width: 44px; min-height: 44px; }
  #${e} .section-move-controls { order: 3; width: 100%; justify-content: flex-start; gap: 8px; }
  #${e} .section-pinned .section-move-controls { display: none; }
  #${e} .pin-ctl-action,
  #${e} .pin-ctl-link { min-height: 44px; display: inline-flex; align-items: center; }
  #${e} .savebar { flex-wrap: wrap; gap: 8px; padding-bottom: max(12px, env(safe-area-inset-bottom)); }
  #${e} .save-actions { flex-wrap: wrap; gap: 8px; }
  #${e} .two { grid-template-columns: minmax(0, 1fr); }
}

/* =====================================================
   v0.8.7 \u2014 Native Scalev image URL row
   Exact density follows HTML Mode > Media URL rows.
   ===================================================== */
#${e} .image-card .image-url-row {
  display: flex;
  min-width: 0;
  width: 100%;
  min-height: 30px;
  margin-top: 10px;
  overflow: hidden;
  border: 1px solid #dbdfe5;
  border-radius: 4px;
  background: #f6f9fc;
}

#${e} .image-card .image-url-row input[type="text"] {
  width: auto;
  min-width: 0;
  height: auto;
  min-height: 0;
  flex: 1 1 0%;
  padding: 7px 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #202c3b;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
  box-shadow: none;
}

#${e} .image-card .image-paste-button {
  min-width: 0;
  min-height: 0;
  height: auto;
  flex: 0 0 auto;
  padding: 7px 8px;
  border: 0;
  border-left: 1px solid #dbdfe5;
  border-radius: 0;
  background: #fff;
  color: #0899cf;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

#${e} .image-card .image-paste-button svg {
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  stroke-width: 2;
}

/* =====================================================
   v0.8.7 \u2014 Status panel adopts native Scalev alert language
   ===================================================== */
#${e}-body[data-sve-tab="compatibility"] {
  font-family: "Roboto", var(--system-font-quill);
  color: #202c3b;
}

#${e} .compatibility-panel {
  gap: 12px;
}

#${e} .compat-status {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  padding: 12px;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(32,44,59,.08);
}

#${e} .compat-status-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 4px;
  color: #fff;
}

#${e} .compat-status-icon svg {
  width: 24px;
  height: 24px;
}

#${e} .compat-status-copy {
  min-width: 0;
  flex: 1 1 auto;
  padding: 0 0 0 16px;
}

#${e} .compat-status-row {
  min-height: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

#${e} .compat-status-row strong {
  color: #202c3b;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

#${e} .compat-status-row span {
  color: #697689;
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
}

#${e} .compat-status small {
  display: -webkit-box;
  margin-top: 4px;
  color: #202c3b;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  opacity: 1;
  white-space: normal;
  overflow: hidden;
  overflow-wrap: anywhere;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

#${e} .compat-blocker {
  border-color: #e5484d;
  background: #fff1f2;
}
#${e} .compat-blocker .compat-status-icon {
  background: #e5484d;
}

#${e} .compat-warning {
  border-color: #e7a319;
  background: #fff8e7;
}
#${e} .compat-warning .compat-status-icon {
  background: #e7a319;
}

#${e} .compat-pass {
  border-color: #2f9e5b;
  background: #edf9f0;
}
#${e} .compat-pass .compat-status-icon {
  background: #2f9e5b;
}

#${e} .compat-metrics .metric,
#${e} .compat-detail {
  border-color: #dbdfe5;
  border-radius: 4px;
}

#${e} .compat-metrics .metric {
  min-height: 34px;
  padding: 8px;
  background: #f6f9fc;
  color: #202c3b;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .compat-detail summary {
  min-height: 38px;
  padding: 8px 10px;
  color: #202c3b;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .compat-detail summary b {
  min-width: 24px;
  padding: 3px 6px;
  border-radius: 4px;
  background: #f6f9fc;
  color: #697689;
  font-size: 10px;
  font-weight: 600;
}

#${e} .compat-detail-body {
  padding: 10px;
  border-top: 1px solid #dbdfe5;
}

#${e} .compat-list li,
#${e} .compat-empty {
  color: #4c596a;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
}


/* =====================================================
   v0.9.0 \u2014 UNIFIED SCALEV-NATIVE PANEL GEOMETRY
   Applies one native UI system to Content / Images / Colors /
   Style / Audio / Status. Functional behavior is unchanged.
   Native reference: Scalev HTML Mode forms + Media list.
   ===================================================== */
#${e} {
  --sve-native-panel-pad: 16px;
  --sve-native-stack-gap: 12px;
  --sve-native-card-pad: 10px;
  --sve-native-field-pad: 12px;
  --sve-native-radius: 4px;
  --sve-native-border: #dbdfe5;
  --sve-native-soft-border: #edf0f3;
  --sve-native-soft-bg: #f6f9fc;
  --sve-native-text: #202c3b;
  --sve-native-muted: #697689;
}

/* Every main tab starts on the same native 16px panel inset. */
#${e}-body[data-sve-tab="content"],
#${e}-body[data-sve-tab="colors"],
#${e}-body[data-sve-tab="style"],
#${e}-body[data-sve-tab="audio"],
#${e}-body[data-sve-tab="compatibility"] {
  padding: 16px 16px 80px;
  font-family: "Roboto", var(--system-font-quill);
  color: var(--sve-native-text);
}

/* Top-level native card rhythm. */
#${e}-body .section,
#${e}-body .group,
#${e}-body .image-card {
  margin: 0 0 var(--sve-native-stack-gap);
  border-width: 2px;
  border-style: solid;
  border-color: var(--sve-native-border);
  border-radius: var(--sve-native-radius);
  background: #fff;
  box-shadow: none;
}

#${e}-body .section:last-child,
#${e}-body .group:last-child,
#${e}-body .image-card:last-child {
  margin-bottom: 0;
}

/* Content accordion shell follows native card geometry. */
#${e}-body[data-sve-tab="content"] .section-head {
  min-height: 42px;
  background: #fff;
}

#${e}-body[data-sve-tab="content"] .section-title {
  padding: 10px 12px;
}

#${e}-body[data-sve-tab="content"] .section-title strong {
  color: var(--sve-native-text);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

#${e}-body[data-sve-tab="content"] .section-title small {
  margin-top: 2px;
  color: var(--sve-native-muted);
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
}

#${e}-body[data-sve-tab="content"] .section-body {
  padding: 0;
  border-top: 1px solid var(--sve-native-soft-border);
  contain: layout style;
}

/* v0.9.5 safe repeater virtualization: keep all controls functional,
   but skip layout/paint work for off-screen repeater items. */
#${e}-body[data-sve-tab="content"] .repeat-item {
  content-visibility: auto;
  contain-intrinsic-size: 120px;
}

#${e}-body .group-title,
#${e}-body[data-sve-tab="style"] .group-title {
  min-height: 42px;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #fff;
  color: var(--sve-native-text);
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

#${e}-body .field,
#${e}-body[data-sve-tab="style"] .field {
  padding: var(--sve-native-field-pad);
  border-top: 1px solid var(--sve-native-soft-border);
}

#${e}-body .group-body > .field:first-child {
  border-top: 0;
}

/* Native label / helper density across all forms. */
#${e}-body .field > label:not(.boolean-field):not(.audio-start-label),
#${e}-body .typography-control > label {
  margin: 0 0 8px;
  color: #4c596a;
  font-family: "Roboto", var(--system-font-quill);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

#${e}-body .field-help,
#${e}-body .helper,
#${e}-body .font-manual-help,
#${e}-body .auto-wedding-id-note {
  margin-top: 6px;
  color: var(--sve-native-muted);
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
}

/* Standard form controls mirror native Scalev form controls. */
#${e}-body input.content-control,
#${e}-body textarea.content-control,
#${e}-body select.content-control,
#${e}-body input[type="text"]:not(.image-url-row input),
#${e}-body input[type="number"],
#${e}-body input[type="date"],
#${e}-body input[type="time"],
#${e}-body input[type="datetime-local"],
#${e}-body select,
#${e}-body .style-select {
  border: 2px solid var(--sve-native-border);
  border-radius: var(--sve-native-radius);
  background: #fff;
  color: var(--sve-native-text);
  font-family: "Roboto", var(--system-font-quill);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  box-shadow: none;
}

#${e}-body input.content-control,
#${e}-body select.content-control,
#${e}-body input[type="text"]:not(.image-url-row input),
#${e}-body input[type="number"],
#${e}-body input[type="date"],
#${e}-body input[type="time"],
#${e}-body input[type="datetime-local"],
#${e}-body select,
#${e}-body .style-select {
  height: 42px;
  min-height: 42px;
  padding: 0 12px;
}

#${e}-body textarea.content-control,
#${e}-body textarea {
  min-height: 82px;
  padding: 10px 12px;
  border-radius: var(--sve-native-radius);
}

#${e}-body input:focus,
#${e}-body textarea:focus,
#${e}-body select:focus,
#${e}-body .style-select:focus,
#${e}-body .content-url-shell:focus-within {
  border-color: #0899cf;
  box-shadow: none;
  outline: none;
}

#${e}-body .content-url-shell {
  min-height: 42px;
  border: 2px solid var(--sve-native-border);
  border-radius: var(--sve-native-radius);
  background: #fff;
}

#${e}-body .content-url-shell .content-control-url {
  height: 38px;
  min-height: 38px;
  border: 0;
}

#${e}-body .content-url-badge {
  min-width: 48px;
  padding: 0 8px;
  border-right: 1px solid var(--sve-native-soft-border);
  background: var(--sve-native-soft-bg);
  font-size: 10px;
  font-weight: 600;
}

#${e}-body .boolean-field {
  min-height: 42px;
  gap: 8px;
  padding: 10px 12px;
  border: 2px solid var(--sve-native-border);
  border-radius: var(--sve-native-radius);
  background: #fff;
}

/* Nested repeaters use a lighter one-pixel native inner border. */
#${e}-body .repeat-item {
  margin: 10px;
  border: 1px solid var(--sve-native-border);
  border-radius: var(--sve-native-radius);
  overflow: hidden;
  background: #fff;
}

#${e}-body .repeat-head {
  min-height: 38px;
  padding: 8px 10px;
  background: var(--sve-native-soft-bg);
}

#${e}-body .repeat-head strong {
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

/* Buttons use native Scalev radius and typography everywhere. */
#${e}-body .button {
  min-height: 40px;
  padding: 0 16px;
  border-width: 2px;
  border-radius: var(--sve-native-radius);
  font-family: "Roboto", var(--system-font-quill);
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
}

#${e}-body .style-reset-zone,
#${e}-body .reset-zone {
  margin-top: 0;
  padding-top: 0;
}

/* Images keep exact native Media list geometry. */
#${e}-body[data-sve-tab="content"] .image-card {
  padding: 10px;
  border-radius: 4px;
}

#${e}-body[data-sve-tab="content"] .image-card .image-card-action,
#${e}-body[data-sve-tab="content"] .advance-pos-btn,
#${e}-body[data-sve-tab="content"] .advance-pos-default,
#${e}-body[data-sve-tab="content"] .advance-fit-btn {
  border-radius: 4px;
}

#${e}-body[data-sve-tab="content"] .image-advance {
  border-radius: 4px;
}

/* Color panel follows the same card/control geometry. */
#${e}-body[data-sve-tab="colors"] input[type="color"],
#${e}-body[data-sve-tab="colors"] .color-unset-swatch {
  border-radius: 4px;
}

#${e}-body[data-sve-tab="colors"] .colors-empty,
#${e}-body .sve-empty-template {
  margin: 0;
  padding: 12px;
  border: 1px solid var(--sve-native-border);
  border-radius: 4px;
  background: var(--sve-native-soft-bg);
}

/* Audio uses the same field padding / separators as native forms. */
#${e}-body[data-sve-tab="audio"] .audio-field {
  padding: 12px;
}

#${e}-body[data-sve-tab="audio"] .audio-start-row {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--sve-native-soft-border);
}

#${e}-body[data-sve-tab="audio"] .audio-start-time {
  height: 38px !important;
  min-height: 38px !important;
  border-radius: 4px !important;
}

/* Status keeps native alert semantics and the same geometry rhythm. */
#${e}-body[data-sve-tab="compatibility"] .compatibility-panel {
  gap: 12px;
}

#${e}-body[data-sve-tab="compatibility"] .compat-status {
  margin: 0;
  padding: 12px;
  border-width: 2px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(32,44,59,.08);
}

#${e}-body[data-sve-tab="compatibility"] .compat-status-icon,
#${e}-body[data-sve-tab="compatibility"] .compat-metrics .metric,
#${e}-body[data-sve-tab="compatibility"] .compat-detail,
#${e}-body[data-sve-tab="compatibility"] .compat-detail summary b {
  border-radius: 4px;
}

#${e}-body[data-sve-tab="compatibility"] .compat-metrics {
  gap: 8px;
}

#${e}-body[data-sve-tab="compatibility"] .compat-metrics .metric {
  min-height: 34px;
  padding: 8px;
  border: 1px solid var(--sve-native-border);
  background: var(--sve-native-soft-bg);
}

#${e}-body[data-sve-tab="compatibility"] .compat-detail {
  border: 1px solid var(--sve-native-border);
}

#${e}-body[data-sve-tab="compatibility"] .compat-detail summary {
  min-height: 38px;
  padding: 8px 10px;
}

#${e}-body[data-sve-tab="compatibility"] .compat-detail-body {
  padding: 10px;
  border-top: 1px solid var(--sve-native-border);
}

/* Preserve the intentionally smaller native Media URL row. */
#${e}-body[data-sve-tab="content"] .image-card .image-url-row {
  min-height: 30px;
  margin-top: 10px;
  border-width: 1px;
  border-radius: 4px;
}

#${e}-body[data-sve-tab="content"] .image-card .image-url-row input[type="text"] {
  height: auto;
  min-height: 0;
  padding: 7px 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  font-size: 10px;
  line-height: 14px;
}

#${e}-body[data-sve-tab="content"] .image-card .image-paste-button {
  min-height: 0;
  height: auto;
  padding: 7px 8px;
  border: 0;
  border-left: 1px solid var(--sve-native-border);
  border-radius: 0;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
}

#${e}-commit-notice:not([hidden]) {
  flex: 0 0 auto;
  max-height: 35%;
  overflow: auto;
  margin: 0;
  padding: 12px 16px;
  border-radius: 0;
  overflow-wrap: anywhere;
}

#${e}-body .pin-ctl-save,
#${e}-body .pin-ctl-save:hover { background: #006b94; }
#${e}-body .pin-ctl-link { color: #006b94; }

@media (max-width: 900px) {
  #${e} button,
  #${e}-body .content-control,
  #${e}-body .style-select,
  #${e}-body select,
  #${e}-body .image-card .image-url-row input[type="text"],
  #${e}-body .image-card .image-paste-button { min-height: 44px; }
  #${e} button { min-width: 44px; }
  #${e} .switch-wrap { min-height: 44px; min-width: 44px; justify-content: center; }
  #${e}-body { scroll-padding: 16px; }
  #${e}-body .pin-ctl-box { flex-wrap: wrap; }
}
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function xf(){mf();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
      <aside id="${e}-dock">
        <div class="tabs-shell">
          <div class="tabs">
            <button
              class="tab"
              data-tab="library"
              title="Template Library"
            >
              Library
            </button>

            <button
              class="tab active"
              data-tab="content"
            >
              Konten
            </button>

            <button
              class="tab"
              data-tab="colors"
            >
              Warna
            </button>

            <button
              class="tab"
              data-tab="style"
            >
              Style
            </button>

            <button
              class="tab"
              data-tab="audio"
            >
              Audio
            </button>

            <button
              class="tab"
              data-tab="compatibility"
              title="Compatibility"
              aria-label="Compatibility"
            >
              Status
            </button>
          </div>

          <div class="panel-tools">
            <button
              type="button"
              class="panel-tool"
              id="${e}-refresh"
              title="Scan ulang"
              aria-label="Scan ulang Visual Editor"
            >
              \u21BB
            </button>

            <button
              type="button"
              class="panel-tool panel-collapse"
              id="${e}-close"
              title="Sembunyikan Visual Editor"
              aria-label="Sembunyikan Visual Editor"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                class="panel-collapse-icon"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2071 6.29289C12.5976 6.68342 12.5976 7.31658 12.2071 7.70711L7.91421 12L12.2071 16.2929C12.5976 16.6834 12.5976 17.3166 12.2071 17.7071C11.8166 18.0976 11.1834 18.0976 10.7929 17.7071L5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929L10.7929 6.29289C11.1834 5.90237 11.8166 5.90237 12.2071 6.29289Z"
                  fill="currentColor"
                ></path>

                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.2071 6.29289C18.5976 6.68342 18.5976 7.31658 18.2071 7.70711L13.9142 12L18.2071 16.2929C18.5976 16.6834 18.5976 17.3166 18.2071 17.7071C17.8166 18.0976 17.1834 18.0976 16.7929 17.7071L11.7929 12.7071C11.4024 12.3166 11.4024 11.6834 11.7929 11.2929L16.7929 6.29289C17.1834 5.90237 17.8166 5.90237 18.2071 6.29289Z"
                  fill="currentColor"
                  opacity=".5"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="toolbar">
          <input
            id="${e}-search"
            class="search"
            type="search"
            placeholder="Cari section / field..."
          >
        </div>

        <div id="${e}-commit-notice" class="notice" role="alert" hidden>
          <p></p>
          <button type="button" id="${e}-reload-source" class="button">Gunakan source terbaru</button>
          <small>Perubahan panel yang belum tersimpan akan dibatalkan.</small>
        </div>

        <div
          id="${e}-body"
          class="body"
        ></div>

        <div class="savebar">
          <div class="footer-meta">
            <strong>Visual Editor \xB7 v${t}</strong>
            <small
              id="${e}-update-status"
              class="update-status"
              aria-live="polite"
            ></small>
          </div>

          <div class="save-actions">
            <button
              id="${e}-support"
              type="button"
              class="button support"
              title="Hubungi Support via WhatsApp"
              aria-label="Hubungi Support via WhatsApp"
            >
              <svg
                class="support-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.14 1.6 5.94L.08 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.46-8.42ZM12.08 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.82 9.82 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
                ></path>
              </svg>

              <span>
                Support
              </span>
            </button>

            <button
              id="${e}-editor-update"
              type="button"
              class="button editor-update"
              title="Cek update Visual Editor"
              aria-label="Cek update Visual Editor"
            >
              Cek Update
            </button>

          </div>
        </div>
      </aside>
    `,document.body.appendChild(r),k("#"+e+"-close").onclick=()=>{Dt(!1)},k("#"+e+"-refresh").onclick=()=>{Se()&&(le(),He({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,Se()&&(le(),He({force:!0,syncImages:!0}))},k("#"+e+"-support").onclick=ff;let a=k("#"+e+"-editor-update"),s=k("#"+e+"-update-status"),o=!1,c=!1,h=0,m=null,v=15e3,S=(E,T,L=!1)=>{a.textContent=E,a.title=T,a.setAttribute("aria-label",T),a.disabled=L},w=()=>{h=Date.now()+v,S("Cek Update","Cek update Visual Editor",!0),clearTimeout(m),m=setTimeout(()=>{h=0,!c&&!o&&S("Cek Update","Cek update Visual Editor")},v)};a.addEventListener("click",()=>{if(o){window.open(g,"_blank","noopener");return}if(c||Date.now()<h){s.textContent="Tunggu sebentar";return}o=!1,c=!0,S("Mengecek...","Sedang mengecek update Visual Editor",!0),s.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${x}?check=${Date.now()}`,onload(E){let T=At=>{o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent=At,w()};if(E.status<200||E.status>=300){T(E.status===403||E.status===429?"Tunggu sebentar":"Gagal cek update");return}let G=(E.responseText||"").match(/@version\s+([^\s]+)/),ue=G&&G[1];if(!ue){T("Gagal cek update");return}ue===t?(o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Sudah terbaru",w()):(o=!0,c=!1,S("Pasang",`Pasang update Visual Editor versi ${ue}`),s.textContent=`Update tersedia: versi ${ue}.`)},onerror(){o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Gagal cek update",w()}})}),k("#"+e+"-search").addEventListener("input",si(E=>{u.search=E.target.value.toLowerCase().trim(),u.uiPrepared=!1,le()},100)),C(".tab",r).forEach(E=>{E.onclick=()=>{xe()&&Vt(E.dataset.tab)}})}function yf(){let r=si(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,Mt(),Bi(),pl();let m=Et();m&&oi(m,{commit:!0,silent:!0}),u.open&&ji(!0);let v=Xr();if(v.length!==u.allEditors.length||v.some((S,w)=>S!==u.allEditors[w])){if(u.sourceDirty=!0,!Se())return;pi.invalidate(),cl(),u.open?le():Ui()}},160),a='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(m=>{m.some(v=>!v.target.closest?.("#"+e)&&[...v.addedNodes,...v.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}),o=null,c=()=>{let m=Jr();m!==o&&(s.disconnect(),o=m,m&&s.observe(m,{childList:!0,subtree:!0}),r())};new MutationObserver(m=>{c(),m.some(v=>[...v.addedNodes,...v.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}).observe(document.body,{childList:!0}),c(),document.addEventListener("load",m=>{m.target instanceof HTMLIFrameElement&&(pi.invalidate(),He({force:!0,syncImages:!0}))},!0),document.addEventListener("click",m=>{let v=m.target.closest?.("button");if(!(!v||v.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(v.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!D("js").includes("SVE_SCHEMA"))){if(!xe()){m.preventDefault(),m.stopImmediatePropagation();return}oc(),ic().blockers.length&&(m.preventDefault(),m.stopImmediatePropagation(),Dt(!0),u.uiPrepared=!1,Vt("compatibility"))}},!0),document.addEventListener("keydown",m=>{m.key==="Escape"&&u.open&&document.getElementById(e)?.contains(m.target)&&(Dt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",m=>{Kr(m.target)&&(u.scalevSlug=Ct(m.target.value),sh())},!0),document.addEventListener("change",m=>{if(Kr(m.target)){let v=Ct(m.target.value);v&&(u.scalevSlug=v,oi(v,{commit:!0}))}},!0),window.addEventListener("resize",si(()=>{Bi(),u.open&&ji(!0)},80))}function cc(){b()&&(xf(),pl(),hf(),yf(),Zr(),requestAnimationFrame(()=>{Bi()}),Ui(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",cc,{once:!0}):cc()})();})();
