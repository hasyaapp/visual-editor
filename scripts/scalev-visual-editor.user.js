// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.34.5
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
(()=>{var Ff=Object.create;var Ln=Object.defineProperty;var Df=Object.getOwnPropertyDescriptor;var Vf=Object.getOwnPropertyNames;var Bf=Object.getPrototypeOf,jf=Object.prototype.hasOwnProperty;var ei=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},O=(e,t)=>{for(var i in t)Ln(e,i,{get:t[i],enumerable:!0})},Uf=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Vf(t))!jf.call(e,o)&&o!==i&&Ln(e,o,{get:()=>t[o],enumerable:!(n=Df(t,o))||n.enumerable});return e};var Hf=(e,t,i)=>(i=e!=null?Ff(Bf(e)):{},Uf(t||!e||!e.__esModule?Ln(i,"default",{value:e,enumerable:!0}):i,e));var Ip=ei(el=>{var Lp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");el.encode=function(e){if(0<=e&&e<Lp.length)return Lp[e];throw new TypeError("Must be between 0 and 63: "+e)};el.decode=function(e){var t=65,i=90,n=97,o=122,h=48,d=57,g=43,y=47,b=26,v=52;return t<=e&&e<=i?e-t:n<=e&&e<=o?e-n+b:h<=e&&e<=d?e-h+v:e==g?62:e==y?63:-1}});var Mp=ei(il=>{var $p=Ip(),tl=5,Pp=1<<tl,Np=Pp-1,Rp=Pp;function Xb(e){return e<0?(-e<<1)+1:(e<<1)+0}function ex(e){var t=(e&1)===1,i=e>>1;return t?-i:i}il.encode=function(t){var i="",n,o=Xb(t);do n=o&Np,o>>>=tl,o>0&&(n|=Rp),i+=$p.encode(n);while(o>0);return i};il.decode=function(t,i,n){var o=t.length,h=0,d=0,g,y;do{if(i>=o)throw new Error("Expected more digits in base 64 VLQ value.");if(y=$p.decode(t.charCodeAt(i++)),y===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(y&Rp),y&=Np,h=h+(y<<d),d+=tl}while(g);n.value=ex(h),n.rest=i}});var Qr=ei(xe=>{function tx(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}xe.getArg=tx;var Op=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,ix=/^data:.+\,.+$/;function Wi(e){var t=e.match(Op);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}xe.urlParse=Wi;function hi(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}xe.urlGenerate=hi;var rx=32;function nx(e){var t=[];return function(i){for(var n=0;n<t.length;n++)if(t[n].input===i){var o=t[0];return t[0]=t[n],t[n]=o,t[0].result}var h=e(i);return t.unshift({input:i,result:h}),t.length>rx&&t.pop(),h}}var rl=nx(function(t){var i=t,n=Wi(t);if(n){if(!n.path)return t;i=n.path}for(var o=xe.isAbsolute(i),h=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){h.push(i.slice(d));break}else for(h.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var y,b=0,g=h.length-1;g>=0;g--)y=h[g],y==="."?h.splice(g,1):y===".."?b++:b>0&&(y===""?(h.splice(g+1,b),b=0):(h.splice(g,2),b--));return i=h.join("/"),i===""&&(i=o?"/":"."),n?(n.path=i,hi(n)):i});xe.normalize=rl;function Fp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Wi(t),n=Wi(e);if(n&&(e=n.path||"/"),i&&!i.scheme)return n&&(i.scheme=n.scheme),hi(i);if(i||t.match(ix))return t;if(n&&!n.host&&!n.path)return n.host=t,hi(n);var o=t.charAt(0)==="/"?t:rl(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=o,hi(n)):o}xe.join=Fp;xe.isAbsolute=function(e){return e.charAt(0)==="/"||Op.test(e)};function ax(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}xe.relative=ax;var Dp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Vp(e){return e}function sx(e){return Bp(e)?"$"+e:e}xe.toSetString=Dp?Vp:sx;function ox(e){return Bp(e)?e.slice(1):e}xe.fromSetString=Dp?Vp:ox;function Bp(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function lx(e,t,i){var n=vt(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:vt(e.name,t.name)}xe.compareByOriginalPositions=lx;function cx(e,t,i){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:vt(e.name,t.name)}xe.compareByOriginalPositionsNoSource=cx;function ux(e,t,i){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||i)||(n=vt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:vt(e.name,t.name)}xe.compareByGeneratedPositionsDeflated=ux;function px(e,t,i){var n=e.generatedColumn-t.generatedColumn;return n!==0||i||(n=vt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:vt(e.name,t.name)}xe.compareByGeneratedPositionsDeflatedNoLine=px;function vt(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function hx(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=vt(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:vt(e.name,t.name)}xe.compareByGeneratedPositionsInflated=hx;function dx(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}xe.parseSourceMapInput=dx;function fx(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var n=Wi(i);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var o=n.path.lastIndexOf("/");o>=0&&(n.path=n.path.substring(0,o+1))}t=Fp(hi(n),t)}return rl(t)}xe.computeSourceURL=fx});var Up=ei(jp=>{var nl=Qr(),al=Object.prototype.hasOwnProperty,Ut=typeof Map<"u";function kt(){this._array=[],this._set=Ut?new Map:Object.create(null)}kt.fromArray=function(t,i){for(var n=new kt,o=0,h=t.length;o<h;o++)n.add(t[o],i);return n};kt.prototype.size=function(){return Ut?this._set.size:Object.getOwnPropertyNames(this._set).length};kt.prototype.add=function(t,i){var n=Ut?t:nl.toSetString(t),o=Ut?this.has(t):al.call(this._set,n),h=this._array.length;(!o||i)&&this._array.push(t),o||(Ut?this._set.set(t,h):this._set[n]=h)};kt.prototype.has=function(t){if(Ut)return this._set.has(t);var i=nl.toSetString(t);return al.call(this._set,i)};kt.prototype.indexOf=function(t){if(Ut){var i=this._set.get(t);if(i>=0)return i}else{var n=nl.toSetString(t);if(al.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};kt.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};kt.prototype.toArray=function(){return this._array.slice()};jp.ArraySet=kt});var Wp=ei(zp=>{var Hp=Qr();function mx(e,t){var i=e.generatedLine,n=t.generatedLine,o=e.generatedColumn,h=t.generatedColumn;return n>i||n==i&&h>=o||Hp.compareByGeneratedPositionsInflated(e,t)<=0}function Zr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Zr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Zr.prototype.add=function(t){mx(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Zr.prototype.toArray=function(){return this._sorted||(this._array.sort(Hp.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};zp.MappingList=Zr});var qp=ei(Gp=>{var Gi=Mp(),pe=Qr(),Jr=Up().ArraySet,gx=Wp().MappingList;function Ke(e){e||(e={}),this._file=pe.getArg(e,"file",null),this._sourceRoot=pe.getArg(e,"sourceRoot",null),this._skipValidation=pe.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=pe.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Jr,this._names=new Jr,this._mappings=new gx,this._sourcesContents=null}Ke.prototype._version=3;Ke.fromSourceMap=function(t,i){var n=t.sourceRoot,o=new Ke(Object.assign(i||{},{file:t.file,sourceRoot:n}));return t.eachMapping(function(h){var d={generated:{line:h.generatedLine,column:h.generatedColumn}};h.source!=null&&(d.source=h.source,n!=null&&(d.source=pe.relative(n,d.source)),d.original={line:h.originalLine,column:h.originalColumn},h.name!=null&&(d.name=h.name)),o.addMapping(d)}),t.sources.forEach(function(h){var d=h;n!==null&&(d=pe.relative(n,h)),o._sources.has(d)||o._sources.add(d);var g=t.sourceContentFor(h);g!=null&&o.setSourceContent(h,g)}),o};Ke.prototype.addMapping=function(t){var i=pe.getArg(t,"generated"),n=pe.getArg(t,"original",null),o=pe.getArg(t,"source",null),h=pe.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,n,o,h)===!1||(o!=null&&(o=String(o),this._sources.has(o)||this._sources.add(o)),h!=null&&(h=String(h),this._names.has(h)||this._names.add(h)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:o,name:h}))};Ke.prototype.setSourceContent=function(t,i){var n=t;this._sourceRoot!=null&&(n=pe.relative(this._sourceRoot,n)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[pe.toSetString(n)]=i):this._sourcesContents&&(delete this._sourcesContents[pe.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};Ke.prototype.applySourceMap=function(t,i,n){var o=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);o=t.file}var h=this._sourceRoot;h!=null&&(o=pe.relative(h,o));var d=new Jr,g=new Jr;this._mappings.unsortedForEach(function(y){if(y.source===o&&y.originalLine!=null){var b=t.originalPositionFor({line:y.originalLine,column:y.originalColumn});b.source!=null&&(y.source=b.source,n!=null&&(y.source=pe.join(n,y.source)),h!=null&&(y.source=pe.relative(h,y.source)),y.originalLine=b.line,y.originalColumn=b.column,b.name!=null&&(y.name=b.name))}var v=y.source;v!=null&&!d.has(v)&&d.add(v);var C=y.name;C!=null&&!g.has(C)&&g.add(C)},this),this._sources=d,this._names=g,t.sources.forEach(function(y){var b=t.sourceContentFor(y);b!=null&&(n!=null&&(y=pe.join(n,y)),h!=null&&(y=pe.relative(h,y)),this.setSourceContent(y,b))},this)};Ke.prototype._validateMapping=function(t,i,n,o){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var h="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!n&&!o)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&n)return;var h="Invalid mapping: "+JSON.stringify({generated:t,source:n,original:i,name:o});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}};Ke.prototype._serializeMappings=function(){for(var t=0,i=1,n=0,o=0,h=0,d=0,g="",y,b,v,C,w=this._mappings.toArray(),E=0,I=w.length;E<I;E++){if(b=w[E],y="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)y+=";",i++;else if(E>0){if(!pe.compareByGeneratedPositionsInflated(b,w[E-1]))continue;y+=","}y+=Gi.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(C=this._sources.indexOf(b.source),y+=Gi.encode(C-d),d=C,y+=Gi.encode(b.originalLine-1-o),o=b.originalLine-1,y+=Gi.encode(b.originalColumn-n),n=b.originalColumn,b.name!=null&&(v=this._names.indexOf(b.name),y+=Gi.encode(v-h),h=v)),g+=y}return g};Ke.prototype._generateSourcesContent=function(t,i){return t.map(function(n){if(!this._sourcesContents)return null;i!=null&&(n=pe.relative(i,n));var o=pe.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,o)?this._sourcesContents[o]:null},this)};Ke.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};Ke.prototype.toString=function(){return JSON.stringify(this.toJSON())};Gp.SourceMapGenerator=Ke});var zf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],_c=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],Wf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",Lc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",In={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},$n="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Gf={5:$n,"5module":$n+" export import",6:$n+" const class extends export import super"},Ic=/^in(stanceof)?$/,qf=new RegExp("["+Lc+"]"),Kf=new RegExp("["+Lc+Wf+"]");function Nn(e,t){for(var i=65536,n=0;n<t.length;n+=2){if(i+=t[n],i>e)return!1;if(i+=t[n+1],i>=e)return!0}return!1}function at(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&qf.test(String.fromCharCode(e)):t===!1?!1:Nn(e,_c)}function At(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Kf.test(String.fromCharCode(e)):t===!1?!1:Nn(e,_c)||Nn(e,zf)}var Y=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Ue(e,t){return new Y(e,{beforeExpr:!0,binop:t})}var He={beforeExpr:!0},Te={startsExpr:!0},Fn={};function q(e,t){return t===void 0&&(t={}),t.keyword=e,Fn[e]=new Y(e,t)}var m={num:new Y("num",Te),regexp:new Y("regexp",Te),string:new Y("string",Te),name:new Y("name",Te),privateId:new Y("privateId",Te),eof:new Y("eof"),bracketL:new Y("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new Y("]"),braceL:new Y("{",{beforeExpr:!0,startsExpr:!0}),braceR:new Y("}"),parenL:new Y("(",{beforeExpr:!0,startsExpr:!0}),parenR:new Y(")"),comma:new Y(",",He),semi:new Y(";",He),colon:new Y(":",He),dot:new Y("."),question:new Y("?",He),questionDot:new Y("?."),arrow:new Y("=>",He),template:new Y("template"),invalidTemplate:new Y("invalidTemplate"),ellipsis:new Y("...",He),backQuote:new Y("`",Te),dollarBraceL:new Y("${",{beforeExpr:!0,startsExpr:!0}),eq:new Y("=",{beforeExpr:!0,isAssign:!0}),assign:new Y("_=",{beforeExpr:!0,isAssign:!0}),incDec:new Y("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new Y("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Ue("||",1),logicalAND:Ue("&&",2),bitwiseOR:Ue("|",3),bitwiseXOR:Ue("^",4),bitwiseAND:Ue("&",5),equality:Ue("==/!=/===/!==",6),relational:Ue("</>/<=/>=",7),bitShift:Ue("<</>>/>>>",8),plusMin:new Y("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Ue("%",10),star:Ue("*",10),slash:Ue("/",10),starstar:new Y("**",{beforeExpr:!0}),coalesce:Ue("??",1),_break:q("break"),_case:q("case",He),_catch:q("catch"),_continue:q("continue"),_debugger:q("debugger"),_default:q("default",He),_do:q("do",{isLoop:!0,beforeExpr:!0}),_else:q("else",He),_finally:q("finally"),_for:q("for",{isLoop:!0}),_function:q("function",Te),_if:q("if"),_return:q("return",He),_switch:q("switch"),_throw:q("throw",He),_try:q("try"),_var:q("var"),_const:q("const"),_while:q("while",{isLoop:!0}),_with:q("with"),_new:q("new",{beforeExpr:!0,startsExpr:!0}),_this:q("this",Te),_super:q("super",Te),_class:q("class",Te),_extends:q("extends",He),_export:q("export"),_import:q("import",Te),_null:q("null",Te),_true:q("true",Te),_false:q("false",Te),_in:q("in",{beforeExpr:!0,binop:7}),_instanceof:q("instanceof",{beforeExpr:!0,binop:7}),_typeof:q("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:q("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:q("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},_e=/\r\n?|\n|\u2028|\u2029/,Yf=new RegExp(_e.source,"g");function ti(e){return e===10||e===13||e===8232||e===8233}function $c(e,t,i){i===void 0&&(i=e.length);for(var n=t;n<i;n++){var o=e.charCodeAt(n);if(ti(o))return n<i-1&&o===13&&e.charCodeAt(n+1)===10?n+2:n+1}return-1}var Pc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,ge=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,Nc=Object.prototype,Qf=Nc.hasOwnProperty,Zf=Nc.toString,ii=Object.hasOwn||(function(e,t){return Qf.call(e,t)}),wc=Array.isArray||(function(e){return Zf.call(e)==="[object Array]"}),Cc=Object.create(null);function Et(e){return Cc[e]||(Cc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function gt(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var Jf=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,Pi=function(t,i){this.line=t,this.column=i};Pi.prototype.offset=function(t){return new Pi(this.line,this.column+t)};var Sr=function(t,i,n){this.start=i,this.end=n,t.sourceFile!==null&&(this.source=t.sourceFile)};function Rc(e,t){for(var i=1,n=0;;){var o=$c(e,n,t);if(o<0)return new Pi(i,t-n);++i,n=o}}var Rn={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},Ec=!1;function Xf(e){var t={};for(var i in Rn)t[i]=e&&ii(e,i)?e[i]:Rn[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!Ec&&typeof console=="object"&&console.warn&&(Ec=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),wc(t.onToken)){var n=t.onToken;t.onToken=function(o){return n.push(o)}}if(wc(t.onComment)&&(t.onComment=em(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function em(e,t){return function(i,n,o,h,d,g){var y={type:i?"Block":"Line",value:n,start:o,end:h};e.locations&&(y.loc=new Sr(this,d,g)),e.ranges&&(y.range=[o,h]),t.push(y)}}var Mt=1,Ot=2,Dn=4,Mc=8,Vn=16,Oc=32,wr=64,Fc=128,Ft=256,Ni=512,Dc=1024,Cr=Mt|Ot|Ft;function Bn(e,t){return Ot|(e?Dn:0)|(t?Mc:0)}var xr=0,jn=1,xt=2,Vc=3,Bc=4,jc=5,fe=function(t,i,n){this.options=t=Xf(t),this.sourceFile=t.sourceFile,this.keywords=Et(Gf[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var o="";t.allowReserved!==!0&&(o=In[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(o+=" await")),this.reservedWords=Et(o);var h=(o?o+" ":"")+In.strict;this.reservedWordsStrict=Et(h),this.reservedWordsStrictBind=Et(h+" "+In.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=n||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):n?(this.lineStart=this.input.lastIndexOf(`
`,n-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(_e).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?Ot:Mt),this.regexpState=null,this.privateNameStack=[]},We={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};fe.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};We.inFunction.get=function(){return(this.currentVarScope().flags&Ot)>0};We.inGenerator.get=function(){return(this.currentVarScope().flags&Mc)>0};We.inAsync.get=function(){return(this.currentVarScope().flags&Dn)>0};We.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ft|Ni))return!1;if(i&Ot)return(i&Dn)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};We.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&Mt)};We.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&wr)>0||this.options.allowSuperOutsideMethod};We.allowDirectSuper.get=function(){return(this.currentThisScope().flags&Fc)>0};We.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};We.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ft|Ni)||i&Ot&&!(i&Vn))return!0}return!1};We.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&Dc||!this.inModule&&t&Mt)};We.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Ft)>0};fe.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var n=this,o=0;o<t.length;o++)n=t[o](n);return n};fe.parse=function(t,i){return new this(i,t).parse()};fe.parseExpressionAt=function(t,i,n){var o=new this(n,t,i);return o.nextToken(),o.parseExpression()};fe.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(fe.prototype,We);var ve=fe.prototype,tm=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;ve.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){ge.lastIndex=e,e+=ge.exec(this.input)[0].length;var t=tm.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){ge.lastIndex=e+t[0].length;var i=ge.exec(this.input),n=i.index+i[0].length,o=this.input.charAt(n);return o===";"||o==="}"||_e.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(o)||o==="!"&&this.input.charAt(n+1)==="=")}e+=t[0].length,ge.lastIndex=e,e+=ge.exec(this.input)[0].length,this.input[e]===";"&&e++}};ve.eat=function(e){return this.type===e?(this.next(),!0):!1};ve.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};ve.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};ve.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};ve.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};ve.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||_e.test(this.input.slice(this.lastTokEnd,this.start))};ve.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};ve.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};ve.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};ve.expect=function(e){this.eat(e)||this.unexpected()};ve.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var Er=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};ve.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};ve.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,n=e.doubleProto;if(!t)return i>=0||n>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")};ve.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};ve.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var N=fe.prototype;N.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var n=0,o=Object.keys(this.undefinedExports);n<o.length;n+=1){var h=o[n];this.raiseRecoverable(this.undefinedExports[h].start,"Export '"+h+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Un={kind:"loop"},im={kind:"switch"};N.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;ge.lastIndex=this.pos;var t=ge.exec(this.input),i=this.pos+t[0].length,n=this.fullCharCodeAt(i);if(n===91||n===92)return!0;if(e)return!1;if(n===123)return!0;if(at(n)){var o=i;do i+=n<=65535?1:2;while(At(n=this.fullCharCodeAt(i)));if(n===92)return!0;var h=this.input.slice(o,i);if(!Ic.test(h))return!0}return!1};N.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;ge.lastIndex=this.pos;var e=ge.exec(this.input),t=this.pos+e[0].length,i;return!_e.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(At(i=this.fullCharCodeAt(t+8))||i===92))};N.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;ge.lastIndex=this.pos;var i=ge.exec(this.input),n=this.pos+i[0].length;if(_e.test(this.input.slice(this.pos,n)))return!1;if(e){var o=n+5,h;if(this.input.slice(n,o)!=="using"||o===this.input.length||At(h=this.fullCharCodeAt(o))||h===92)return!1;ge.lastIndex=o;var d=ge.exec(this.input);if(n=o+d[0].length,d&&_e.test(this.input.slice(o,n)))return!1}var g=this.fullCharCodeAt(n);if(!at(g)&&g!==92)return!1;var y=n;do n+=g<=65535?1:2;while(At(g=this.fullCharCodeAt(n)));if(g===92)return!0;var b=this.input.slice(y,n);if(Ic.test(b))return!1;if(t&&!e&&b==="of"){ge.lastIndex=n;var v=ge.exec(this.input);if(n=n+v[0].length,this.input.charCodeAt(n)!==61||(g=this.input.charCodeAt(n+1))===61||g===62)return!1}return!0};N.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};N.isUsing=function(e){return this.isUsingKeyword(!1,e)};N.parseStatement=function(e,t,i){var n=this.type,o=this.startNode(),h;switch(this.isLet(e)&&(n=m._var,h="let"),n){case m._break:case m._continue:return this.parseBreakContinueStatement(o,n.keyword);case m._debugger:return this.parseDebuggerStatement(o);case m._do:return this.parseDoStatement(o);case m._for:return this.parseForStatement(o);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(o,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(o,!0);case m._if:return this.parseIfStatement(o);case m._return:return this.parseReturnStatement(o);case m._switch:return this.parseSwitchStatement(o);case m._throw:return this.parseThrowStatement(o);case m._try:return this.parseTryStatement(o);case m._const:case m._var:return h=h||this.value,e&&h!=="var"&&this.unexpected(),this.parseVarStatement(o,h);case m._while:return this.parseWhileStatement(o);case m._with:return this.parseWithStatement(o);case m.braceL:return this.parseBlock(!0,o);case m.semi:return this.parseEmptyStatement(o);case m._export:case m._import:if(this.options.ecmaVersion>10&&n===m._import){ge.lastIndex=this.pos;var d=ge.exec(this.input),g=this.pos+d[0].length,y=this.input.charCodeAt(g);if(y===40||y===46)return this.parseExpressionStatement(o,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),n===m._import?this.parseImport(o):this.parseExport(o,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(o,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(o,!1,b),this.semicolon(),this.finishNode(o,"VariableDeclaration");var v=this.value,C=this.parseExpression();return n===m.name&&C.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(o,v,C,e):this.parseExpressionStatement(o,C)}};N.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var n=0;n<this.labels.length;++n){var o=this.labels[n];if((e.label==null||o.name===e.label.name)&&(o.kind!=null&&(i||o.kind==="loop")||e.label&&i))break}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};N.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};N.parseDoStatement=function(e){return this.next(),this.labels.push(Un),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};N.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Un),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var n=this.startNode(),o=i?"let":this.value;return this.next(),this.parseVar(n,!0,o),this.finishNode(n,"VariableDeclaration"),this.parseForAfterInit(e,n,t)}var h=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var y=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(y,!0,g),this.finishNode(y,"VariableDeclaration"),this.parseForAfterInit(e,y,t)}var b=this.containsEsc,v=new Er,C=this.start,w=t>-1?this.parseExprSubscripts(v,"await"):this.parseExpression(!0,v);return this.type===m._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(w.start===C&&!b&&w.type==="Identifier"&&w.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),h&&d&&this.raise(w.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(w,!1,v),this.checkLValPattern(w),this.parseForIn(e,w)):(this.checkExpressionErrors(v,!0),t>-1&&this.unexpected(t),this.parseFor(e,w))};N.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};N.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,$i|(i?0:Mn),!1,t)};N.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};N.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};N.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(im),this.enterScope(Dc);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var n=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};N.parseThrowStatement=function(e){return this.next(),_e.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var rm=[];N.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?Oc:0),this.checkLValPattern(e,t?Bc:xt),this.expect(m.parenR),e};N.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};N.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};N.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Un),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};N.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};N.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};N.parseLabeledStatement=function(e,t,i,n){for(var o=0,h=this.labels;o<h.length;o+=1){var d=h[o];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,y=this.labels.length-1;y>=0;y--){var b=this.labels[y];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(n?n.indexOf("label")===-1?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};N.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};N.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var n=this.parseStatement(null);t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};N.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};N.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};N.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var o=this.startNode();if(this.parseVarId(o,i),this.eat(m.eq)?o.init=this.parseMaybeAssign(t):!n&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!n&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!n&&o.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):o.init=null,e.declarations.push(this.finishNode(o,"VariableDeclarator")),!this.eat(m.comma))break}return e};N.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?jn:xt,!1)};var $i=1,Mn=2,Uc=4;N.parseFunction=function(e,t,i,n,o){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===m.star&&t&Mn&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&$i&&(e.id=t&Uc&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&Mn)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?jn:xt:Vc));var h=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Bn(e.async,e.generator)),t&$i||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,o),this.yieldPos=h,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&$i?"FunctionDeclaration":"FunctionExpression")};N.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};N.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var n=this.enterClassBody(),o=this.startNode(),h=!1;for(o.body=[],this.expect(m.braceL);this.type!==m.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(o.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(h&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),h=!0):d.key&&d.key.type==="PrivateIdentifier"&&nm(n,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(o,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};N.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),n="",o=!1,h=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:n="static"}if(i.static=g,!n&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?h=!0:n="async"),!n&&(t>=9||!h)&&this.eat(m.star)&&(o=!0),!n&&!h&&!o){var y=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=y:n=y)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||d!=="method"||o||h){var b=!i.static&&yr(i,"constructor"),v=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,o,h,v)}else this.parseClassField(i);return i};N.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};N.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};N.parseClassMethod=function(e,t,i,n){var o=e.key;e.kind==="constructor"?(t&&this.raise(o.start,"Constructor can't be a generator"),i&&this.raise(o.start,"Constructor can't be an async method")):e.static&&yr(e,"prototype")&&this.raise(o.start,"Classes may not have a static property named prototype");var h=e.value=this.parseMethod(t,i,n);return e.kind==="get"&&h.params.length!==0&&this.raiseRecoverable(h.start,"getter should have no params"),e.kind==="set"&&h.params.length!==1&&this.raiseRecoverable(h.start,"setter should have exactly one param"),e.kind==="set"&&h.params[0].type==="RestElement"&&this.raiseRecoverable(h.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};N.parseClassField=function(e){return yr(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&yr(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(Ni|wr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};N.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Ft|wr);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};N.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,xt,!1)):(t===!0&&this.unexpected(),e.id=null)};N.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};N.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};N.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,o=n===0?null:this.privateNameStack[n-1],h=0;h<i.length;++h){var d=i[h];ii(t,d.name)||(o?o.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function nm(e,t){var i=t.key.name,n=e[i],o="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(o=(t.static?"s":"i")+t.kind),n==="iget"&&o==="iset"||n==="iset"&&o==="iget"||n==="sget"&&o==="sset"||n==="sset"&&o==="sget"?(e[i]="true",!1):n?!0:(e[i]=o,!1)}function yr(e,t){var i=e.computed,n=e.key;return!i&&(n.type==="Identifier"&&n.name===t||n.type==="Literal"&&n.value===t)}N.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};N.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var o=n[i];this.checkUnreserved(o.local),this.checkLocalExport(o.local),o.local.type==="Literal"&&this.raise(o.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};N.parseExportDeclaration=function(e){return this.parseStatement(null)};N.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,$i|Uc,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var n=this.parseMaybeAssign();return this.semicolon(),n}};N.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),ii(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};N.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var n=0,o=t.properties;n<o.length;n+=1){var h=o[n];this.checkPatternExport(e,h)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var y=g[d];y&&this.checkPatternExport(e,y)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};N.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var o=n[i];this.checkPatternExport(e,o.id)}};N.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};N.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};N.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};N.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=rm,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};N.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,xt),this.finishNode(e,"ImportSpecifier")};N.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,xt),this.finishNode(e,"ImportDefaultSpecifier")};N.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,xt),this.finishNode(e,"ImportNamespaceSpecifier")};N.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};N.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var n=this.parseImportAttribute(),o=n.key.type==="Identifier"?n.key.name:n.key.value;ii(t,o)&&this.raiseRecoverable(n.key.start,"Duplicate attribute key '"+o+"'"),t[o]=!0,e.push(n)}return e};N.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};N.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return Jf.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};N.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};N.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var Ge=fe.prototype;Ge.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var n=0,o=e.properties;n<o.length;n+=1){var h=o[n];this.toAssignable(h,t),h.type==="RestElement"&&(h.argument.type==="ArrayPattern"||h.argument.type==="ObjectPattern")&&this.raise(h.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};Ge.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var o=e[n];o&&this.toAssignable(o,t)}if(i){var h=e[i-1];this.options.ecmaVersion===6&&t&&h&&h.type==="RestElement"&&h.argument.type!=="Identifier"&&this.unexpected(h.argument.start)}return e};Ge.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};Ge.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};Ge.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};Ge.parseBindingList=function(e,t,i,n){for(var o=[],h=!0;!this.eat(e);)if(h?h=!1:this.expect(m.comma),t&&this.type===m.comma)o.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),o.push(d),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else o.push(this.parseAssignableListItem(n))}return o};Ge.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};Ge.parseBindingListItem=function(e){return e};Ge.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var n=this.startNodeAt(e,t);return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")};Ge.checkLValSimple=function(e,t,i){t===void 0&&(t=xr);var n=t!==xr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(t===xt&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(ii(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==jc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}};Ge.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=xr),e.type){case"ObjectPattern":for(var n=0,o=e.properties;n<o.length;n+=1){var h=o[n];this.checkLValInnerPattern(h,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var y=g[d];y&&this.checkLValInnerPattern(y,t,i)}break;default:this.checkLValSimple(e,t,i)}};Ge.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=xr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var Je=function(t,i,n,o,h){this.token=t,this.isExpr=!!i,this.preserveSpace=!!n,this.override=o,this.generator=!!h},re={b_stat:new Je("{",!1),b_expr:new Je("{",!0),b_tmpl:new Je("${",!1),p_stat:new Je("(",!1),p_expr:new Je("(",!0),q_tmpl:new Je("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new Je("function",!1),f_expr:new Je("function",!0),f_expr_gen:new Je("function",!0,!1,null,!0),f_gen:new Je("function",!1,!1,null,!0)},ri=fe.prototype;ri.initialContext=function(){return[re.b_stat]};ri.curContext=function(){return this.context[this.context.length-1]};ri.braceIsBlock=function(e){var t=this.curContext();return t===re.f_expr||t===re.f_stat?!0:e===m.colon&&(t===re.b_stat||t===re.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?_e.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===re.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};ri.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};ri.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};ri.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===re.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?re.b_stat:re.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(re.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?re.p_stat:re.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==re.p_stat)&&!(e===m._return&&_e.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===re.b_stat)?this.context.push(re.f_expr):this.context.push(re.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===re.q_tmpl?this.context.pop():this.context.push(re.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===re.f_expr?this.context[t]=re.f_expr_gen:this.context[t]=re.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var F=fe.prototype;F.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n=e.key,o;switch(n.type){case"Identifier":o=n.name;break;case"Literal":o=String(n.value);break;default:return}var h=e.kind;if(this.options.ecmaVersion>=6){o==="__proto__"&&h==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=n.start):this.raiseRecoverable(n.start,"Redefinition of __proto__ property")),t.proto=!0);return}o="$"+o;var d=t[o];if(d){var g;h==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[h],g&&this.raiseRecoverable(n.start,"Redefinition of property")}else d=t[o]={init:!1,get:!1,set:!1};d[h]=!0}};F.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var n=i.start,o=i.startLoc,h=i.parseMaybeAssign(e,t);if(i.type===m.comma){var d=i.startNodeAt(n,o);for(d.expressions=[h];i.eat(m.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return h})};F.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var n=!1,o=-1,h=-1,d=-1;t?(o=t.parenthesizedAssign,h=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new Er,n=!0);var g=this.start,y=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,y)),this.type.isAssign){var v=this.startNodeAt(g,y);return v.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),v.left=b,this.next(),v.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(v,"AssignmentExpression")}else n&&this.checkExpressionErrors(t,!0);return o>-1&&(t.parenthesizedAssign=o),h>-1&&(t.trailingComma=h),b};F.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,o=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return o;if(!(o.type==="ArrowFunctionExpression"&&o.start===i)&&this.eat(m.question)){var h=this.startNodeAt(i,n);return h.test=o,h.consequent=this.parseMaybeAssign(),this.expect(m.colon),h.alternate=this.parseMaybeAssign(e),this.finishNode(h,"ConditionalExpression")}return o};F.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,o=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||o.start===i&&o.type==="ArrowFunctionExpression"?o:this.parseExprOp(o,i,n,-1,e)};F.parseExprOp=function(e,t,i,n,o){var h=this.type.binop;if(h!=null&&(!o||this.type!==m._in)&&h>n){var d=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(h=m.logicalAND.binop);var y=this.value;this.next();var b=this.start,v=this.startLoc,C=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,o),b,v,h,o),w=this.buildBinary(t,i,e,C,y,d||g);return(d&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(w,t,i,n,o)}return e};F.buildBinary=function(e,t,i,n,o,h){n.type==="PrivateIdentifier"&&this.raise(n.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=o,d.right=n,this.finishNode(d,h?"LogicalExpression":"BinaryExpression")};F.parseMaybeUnary=function(e,t,i,n){var o=this.start,h=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(n),t=!0;else if(this.type.prefix){var g=this.startNode(),y=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,y,n),this.checkExpressionErrors(e,!0),y?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Hc(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&On(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,y?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(n||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(o,h);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===o)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(o,h,d,this.parseMaybeUnary(null,!1,!1,n),"**",!1);else return d};function Hc(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Hc(e.expression)}function On(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&On(e.expression)||e.type==="ParenthesizedExpression"&&On(e.expression)}F.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,o=this.parseExprAtom(e,t);if(o.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return o;var h=this.parseSubscripts(o,i,n,!1,t);return e&&h.type==="MemberExpression"&&(e.parenthesizedAssign>=h.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=h.start&&(e.parenthesizedBind=-1),e.trailingComma>=h.start&&(e.trailingComma=-1)),h};F.parseSubscripts=function(e,t,i,n,o){for(var h=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,n,h,d,o);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var y=this.startNodeAt(t,i);y.expression=g,g=this.finishNode(y,"ChainExpression")}return g}e=g}};F.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};F.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)};F.parseSubscript=function(e,t,i,n,o,h,d){var g=this.options.ecmaVersion>=11,y=g&&this.eat(m.questionDot);n&&y&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||y&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var v=this.startNodeAt(t,i);v.object=e,b?(v.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?v.property=this.parsePrivateIdent():v.property=this.parseIdent(this.options.allowReserved!=="never"),v.computed=!!b,g&&(v.optional=y),e=this.finishNode(v,"MemberExpression")}else if(!n&&this.eat(m.parenL)){var C=new Er,w=this.yieldPos,E=this.awaitPos,I=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var W=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,C);if(o&&!y&&this.shouldParseAsyncArrow())return this.checkPatternErrors(C,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=w,this.awaitPos=E,this.awaitIdentPos=I,this.parseSubscriptAsyncArrow(t,i,W,d);this.checkExpressionErrors(C,!0),this.yieldPos=w||this.yieldPos,this.awaitPos=E||this.awaitPos,this.awaitIdentPos=I||this.awaitIdentPos;var u=this.startNodeAt(t,i);u.callee=e,u.arguments=W,g&&(u.optional=y),e=this.finishNode(u,"CallExpression")}else if(this.type===m.backQuote){(y||h)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var K=this.startNodeAt(t,i);K.tag=e,K.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(K,"TaggedTemplateExpression")}return e};F.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var n,o=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(n,"Super");case m._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression");case m.name:var h=this.start,d=this.startLoc,g=this.containsEsc,y=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&y.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(re.f_expr),this.parseFunction(this.startNodeAt(h,d),0,!1,!0,t);if(o&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(h,d),[y],!1,t);if(this.options.ecmaVersion>=8&&y.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return y=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(h,d),[y],!0,t)}return y;case m.regexp:var b=this.value;return n=this.parseLiteral(b.value),n.regex={pattern:b.pattern,flags:b.flags},n;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return n=this.startNode(),n.value=this.type===m._null?null:this.type===m._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal");case m.parenL:var v=this.start,C=this.parseParenAndDistinguishExpression(o,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(C)&&(e.parenthesizedAssign=v),e.parenthesizedBind<0&&(e.parenthesizedBind=v)),C;case m.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression");case m.braceL:return this.overrideContext(re.b_expr),this.parseObj(!1,e);case m._function:return n=this.startNode(),this.next(),this.parseFunction(n,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};F.parseExprAtomDefault=function(){this.unexpected()};F.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};F.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};F.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};F.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};F.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};F.shouldParseArrow=function(e){return!this.canInsertSemicolon()};F.parseParenAndDistinguishExpression=function(e,t){var i=this.start,n=this.startLoc,o,h=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,y=[],b=!0,v=!1,C=new Er,w=this.yieldPos,E=this.awaitPos,I;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),h&&this.afterTrailingComma(m.parenR,!0)){v=!0;break}else if(this.type===m.ellipsis){I=this.start,y.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else y.push(this.parseMaybeAssign(!1,C,this.parseParenItem));var W=this.lastTokEnd,u=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(y)&&this.eat(m.arrow))return this.checkPatternErrors(C,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=w,this.awaitPos=E,this.parseParenArrowList(i,n,y,t);(!y.length||v)&&this.unexpected(this.lastTokStart),I&&this.unexpected(I),this.checkExpressionErrors(C,!0),this.yieldPos=w||this.yieldPos,this.awaitPos=E||this.awaitPos,y.length>1?(o=this.startNodeAt(d,g),o.expressions=y,this.finishNodeAt(o,"SequenceExpression",W,u)):o=y[0]}else o=this.parseParenExpression();if(this.options.preserveParens){var K=this.startNodeAt(i,n);return K.expression=o,this.finishNode(K,"ParenthesizedExpression")}else return o};F.parseParenItem=function(e){return e};F.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)};var am=[];F.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,o=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,o,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(n,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=am,this.finishNode(e,"NewExpression")};F.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};F.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var n=this.parseTemplateElement({isTagged:t});for(i.quasis=[n];!n.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};F.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!_e.test(this.input.slice(this.lastTokEnd,this.start))};F.parseObj=function(e,t){var i=this.startNode(),n=!0,o={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(n)n=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var h=this.parseProperty(e,t);e||this.checkPropClash(h,o,t),i.properties.push(h)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};F.parseProperty=function(e,t){var i=this.startNode(),n,o,h,d;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(h=this.start,d=this.startLoc),e||(n=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(i)?(o=!0,n=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):o=!1,this.parsePropertyValue(i,e,n,o,h,d,t,g),this.finishNode(i,"Property")};F.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var n=e.value.start;e.kind==="get"?this.raiseRecoverable(n,"getter should have no params"):this.raiseRecoverable(n,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};F.parsePropertyValue=function(e,t,i,n,o,h,d,g){(i||n)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,n),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||n)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=o),t?e.value=this.parseMaybeDefault(o,h,this.copyNode(e.key)):this.type===m.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(o,h,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};F.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};F.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};F.parseMethod=function(e,t,i){var n=this.startNode(),o=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Bn(t,n.generator)|wr|(i?Fc:0)),this.expect(m.parenL),n.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=o,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(n,"FunctionExpression")};F.parseArrowExpression=function(e,t,i,n){var o=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.enterScope(Bn(i,!1)|Vn),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=o,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};F.parseFunctionBody=function(e,t,i,n){var o=t&&this.type!==m.braceL,h=this.strict,d=!1;if(o)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!h||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var y=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!h&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,jc),e.body=this.parseBlock(!1,void 0,d&&!h),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=y}this.exitScope()};F.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var n=i[t];if(n.type!=="Identifier")return!1}return!0};F.checkParams=function(e,t){for(var i=Object.create(null),n=0,o=e.params;n<o.length;n+=1){var h=o[n];this.checkLValInnerPattern(h,jn,t?null:i)}};F.parseExprList=function(e,t,i,n){for(var o=[],h=!0;!this.eat(e);){if(h)h=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===m.comma?d=null:this.type===m.ellipsis?(d=this.parseSpread(n),n&&this.type===m.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):d=this.parseMaybeAssign(!1,n),o.push(d)}return o};F.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name;if(this.inGenerator&&n==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&Cr)&&n==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(n==="arguments"||n==="await")&&this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var o=this.strict?this.reservedWordsStrict:this.reservedWords;o.test(n)&&(!this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))}};F.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};F.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};F.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};F.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};F.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var vr=fe.prototype;vr.raise=function(e,t){var i=Rc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var n=new SyntaxError(t);throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n};vr.raiseRecoverable=vr.raise;vr.curPosition=function(){if(this.options.locations)return new Pi(this.curLine,this.pos-this.lineStart)};var Tt=fe.prototype,sm=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};Tt.enterScope=function(e){this.scopeStack.push(new sm(e))};Tt.exitScope=function(){this.scopeStack.pop()};Tt.treatFunctionsAsVarInScope=function(e){return e.flags&Ot||!this.inModule&&e.flags&Mt};Tt.declareName=function(e,t,i){var n=!1;if(t===xt){var o=this.currentScope();n=o.lexical.indexOf(e)>-1||o.functions.indexOf(e)>-1||o.var.indexOf(e)>-1,o.lexical.push(e),this.inModule&&o.flags&Mt&&delete this.undefinedExports[e]}else if(t===Bc){var h=this.currentScope();h.lexical.push(e)}else if(t===Vc){var d=this.currentScope();this.treatFunctionsAsVar?n=d.lexical.indexOf(e)>-1:n=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var y=this.scopeStack[g];if(y.lexical.indexOf(e)>-1&&!(y.flags&Oc&&y.lexical[0]===e)||!this.treatFunctionsAsVarInScope(y)&&y.functions.indexOf(e)>-1){n=!0;break}if(y.var.push(e),this.inModule&&y.flags&Mt&&delete this.undefinedExports[e],y.flags&Cr)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};Tt.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};Tt.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};Tt.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(Cr|Ni|Ft))return t}};Tt.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(Cr|Ni|Ft)&&!(t.flags&Vn))return t}};var Ar=function(t,i,n){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new Sr(t,n)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},Ri=fe.prototype;Ri.startNode=function(){return new Ar(this,this.start,this.startLoc)};Ri.startNodeAt=function(e,t){return new Ar(this,e,t)};function zc(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}Ri.finishNode=function(e,t){return zc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};Ri.finishNodeAt=function(e,t,i,n){return zc.call(this,e,t,i,n)};Ri.copyNode=function(e){var t=new Ar(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var om="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Wc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Gc=Wc+" Extended_Pictographic",qc=Gc,Kc=qc+" EBase EComp EMod EPres ExtPict",Yc=Kc,lm=Yc,cm={9:Wc,10:Gc,11:qc,12:Kc,13:Yc,14:lm},um="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",pm={9:"",10:"",11:"",12:"",13:"",14:um},Ac="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Qc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Zc=Qc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Jc=Zc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Xc=Jc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",eu=Xc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",hm=eu+" "+om,dm={9:Qc,10:Zc,11:Jc,12:Xc,13:eu,14:hm},tu={};function fm(e){var t=tu[e]={binary:Et(cm[e]+" "+Ac),binaryOfStrings:Et(pm[e]),nonBinary:{General_Category:Et(Ac),Script:Et(dm[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(br=0,Pn=[9,10,11,12,13,14];br<Pn.length;br+=1)Tc=Pn[br],fm(Tc);var Tc,br,Pn,P=fe.prototype,kr=function(t,i){this.parent=t,this.base=i||this};kr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var n=t;n;n=n.parent)if(i.base===n.base&&i!==n)return!0;return!1};kr.prototype.sibling=function(){return new kr(this.parent,this.base)};var st=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=tu[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};st.prototype.reset=function(t,i,n){var o=n.indexOf("v")!==-1,h=n.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=n,o&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=h&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=h&&this.parser.options.ecmaVersion>=9)};st.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};st.prototype.at=function(t,i){i===void 0&&(i=!1);var n=this.source,o=n.length;if(t>=o)return-1;var h=n.charCodeAt(t);if(!(i||this.switchU)||h<=55295||h>=57344||t+1>=o)return h;var d=n.charCodeAt(t+1);return d>=56320&&d<=57343?(h<<10)+d-56613888:h};st.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var n=this.source,o=n.length;if(t>=o)return o;var h=n.charCodeAt(t),d;return!(i||this.switchU)||h<=55295||h>=57344||t+1>=o||(d=n.charCodeAt(t+1))<56320||d>57343?t+1:t+2};st.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};st.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};st.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};st.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};st.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var n=this.pos,o=0,h=t;o<h.length;o+=1){var d=h[o],g=this.at(n,i);if(g===-1||g!==d)return!1;n=this.nextIndex(n,i)}return this.pos=n,!0};P.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,o=!1,h=0;h<i.length;h++){var d=i.charAt(h);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,h+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(n=!0),d==="v"&&(o=!0)}this.options.ecmaVersion>=15&&n&&o&&this.raise(e.start,"Invalid regular expression flag")};function mm(e){for(var t in e)return!0;return!1}P.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&mm(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};P.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t];e.groupNames[n]||e.raise("Invalid named capture referenced")}};P.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new kr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};P.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};P.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};P.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};P.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};P.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};P.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var n=0,o=-1;if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(o=e.lastIntValue),e.eat(125)))return o!==-1&&o<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};P.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};P.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};P.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),n=e.eat(45);if(i||n){for(var o=0;o<i.length;o++){var h=i.charAt(o);i.indexOf(h,o+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(n){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var y=d.charAt(g);(d.indexOf(y,g+1)>-1||i.indexOf(y)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};P.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};P.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&gm(i);)t+=gt(i),e.advance();return t};function gm(e){return e===105||e===109||e===115}P.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};P.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};P.regexp_eatSyntaxCharacter=function(e){var t=e.current();return iu(t)?(e.lastIntValue=t,e.advance(),!0):!1};function iu(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}P.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!iu(i);)e.advance();return e.pos!==t};P.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};P.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var n=0,o=i;n<o.length;n+=1){var h=o[n];h.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};P.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};P.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=gt(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=gt(e.lastIntValue);return!0}return!1};P.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),bm(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function bm(e){return at(e,!0)||e===36||e===95}P.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),xm(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function xm(e){return At(e,!0)||e===36||e===95||e===8204||e===8205}P.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};P.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};P.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};P.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};P.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};P.regexp_eatZero=function(e){return e.current()===48&&!Tr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};P.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};P.regexp_eatControlLetter=function(e){var t=e.current();return ru(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function ru(e){return e>=65&&e<=90||e>=97&&e<=122}P.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,n=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var o=e.lastIntValue;if(n&&o>=55296&&o<=56319){var h=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(o-55296)*1024+(d-56320)+65536,!0}e.pos=h,e.lastIntValue=o}return!0}if(n&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&ym(e.lastIntValue))return!0;n&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function ym(e){return e>=0&&e<=1114111}P.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};P.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var nu=0,bt=1,ze=2;P.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(vm(t))return e.lastIntValue=-1,e.advance(),bt;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var n;if(e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&n===ze&&e.raise("Invalid property name"),n;e.raise("Invalid property name")}return nu};function vm(e){return e===100||e===68||e===115||e===83||e===119||e===87}P.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),bt}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var o=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,o)}return nu};P.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){ii(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};P.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return bt;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return ze;e.raise("Invalid property name")};P.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";au(t=e.current());)e.lastStringValue+=gt(t),e.advance();return e.lastStringValue!==""};function au(e){return ru(e)||e===95}P.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";km(t=e.current());)e.lastStringValue+=gt(t),e.advance();return e.lastStringValue!==""};function km(e){return au(e)||Tr(e)}P.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};P.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===ze&&e.raise("Negated character class may contain strings"),!0}return!1};P.regexp_classContents=function(e){return e.current()===93?bt:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),bt)};P.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};P.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||lu(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current();return n!==93?(e.lastIntValue=n,e.advance(),!0):!1};P.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};P.regexp_classSetExpression=function(e){var t=bt,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===ze&&(t=ze);for(var n=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==ze&&(t=bt);continue}e.raise("Invalid character in character class")}if(n!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(n!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===ze&&(t=ze)}};P.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue;return i!==-1&&n!==-1&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};P.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?bt:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};P.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e);if(e.eat(93))return i&&n===ze&&e.raise("Negated character class may contain strings"),n;e.pos=t}if(e.eat(92)){var o=this.regexp_eatCharacterClassEscape(e);if(o)return o;e.pos=t}return null};P.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};P.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===ze&&(t=ze);return t};P.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?bt:ze};P.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&Sm(i)||wm(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function Sm(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function wm(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}P.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return Cm(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Cm(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}P.regexp_eatClassControlLetter=function(e){var t=e.current();return Tr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};P.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};P.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Tr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function Tr(e){return e>=48&&e<=57}P.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;su(i=e.current());)e.lastIntValue=16*e.lastIntValue+ou(i),e.advance();return e.pos!==t};function su(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function ou(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}P.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};P.regexp_eatOctalDigit=function(e){var t=e.current();return lu(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function lu(e){return e>=48&&e<=55}P.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var n=0;n<t;++n){var o=e.current();if(!su(o))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+ou(o),e.advance()}return!0};var Hn=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new Sr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},z=fe.prototype;z.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Hn(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};z.getToken=function(){return this.next(),new Hn(this)};typeof Symbol<"u"&&(z[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});z.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};z.readToken=function(e){return at(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};z.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};z.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};z.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,o=t;(n=$c(this.input,o,this.pos))>-1;)++this.curLine,o=this.lineStart=n;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};z.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!ti(n);)n=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};z.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&Pc.test(String.fromCharCode(e)))++this.pos;else break e}}};z.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};z.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};z.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};z.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,n=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(n,i)};z.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};z.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};z.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||_e.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};z.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};z.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};z.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var n=this.input.charCodeAt(this.pos+2);if(n===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};z.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),at(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+gt(t)+"'")};z.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+gt(e)+"'")};z.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};z.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(_e.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(n==="[")t=!0;else if(n==="]"&&t)t=!1;else if(n==="/"&&!t)break;e=n==="\\"}++this.pos}var o=this.input.slice(i,this.pos);++this.pos;var h=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(h);var g=this.regexpState||(this.regexpState=new st(this));g.reset(i,o,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var y=null;try{y=new RegExp(o,d)}catch{}return this.finishToken(m.regexp,{pattern:o,flags:d,value:y})};z.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&t===void 0,o=i&&this.input.charCodeAt(this.pos)===48,h=this.pos,d=0,g=0,y=0,b=t??1/0;y<b;++y,++this.pos){var v=this.input.charCodeAt(this.pos),C=void 0;if(n&&v===95){o&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),y===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=v;continue}if(v>=97?C=v-97+10:v>=65?C=v-65+10:v>=48&&v<=57?C=v-48:C=1/0,C>=e)break;g=v,d=d*e+C}return n&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===h||t!=null&&this.pos-h!==t?null:d};function Em(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function cu(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}z.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=cu(this.input.slice(t,this.pos)),++this.pos):at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};z.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var n=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&n===110){var o=cu(this.input.slice(t,this.pos));return++this.pos,at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,o)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),n===46&&!i&&(++this.pos,this.readInt(10),n=this.input.charCodeAt(this.pos)),(n===69||n===101)&&!i&&(n=this.input.charCodeAt(++this.pos),(n===43||n===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var h=Em(this.input.slice(t,this.pos),i);return this.finishToken(m.num,h)};z.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};z.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var n=this.input.charCodeAt(this.pos);if(n===e)break;n===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):n===8232||n===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(ti(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var uu={};z.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===uu)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};z.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw uu;this.raise(e,t)};z.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(ti(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};z.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};z.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return gt(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],o=parseInt(n,8);return o>255&&(n=n.slice(0,-1),o=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),(n!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(o)}return ti(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};z.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};z.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,n=this.options.ecmaVersion>=6;this.pos<this.input.length;){var o=this.fullCharCodeAtPos();if(At(o,n))this.pos+=o<=65535?1:2;else if(o===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var h=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?at:At)(d,n)||this.invalidStringToken(h,"Invalid Unicode escape"),e+=gt(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};z.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=Fn[e]),this.finishToken(t,e)};var Am="8.18.0";fe.acorn={Parser:fe,version:Am,defaultOptions:Rn,Position:Pi,SourceLocation:Sr,getLineInfo:Rc,Node:Ar,TokenType:Y,tokTypes:m,keywordTypes:Fn,TokContext:Je,tokContexts:re,isIdentifierChar:At,isIdentifierStart:at,Token:Hn,isNewLine:ti,lineBreak:_e,lineBreakG:Yf,nonASCIIwhitespace:Pc};function pu(e,t){return fe.parse(e,t)}var ni=null,Mi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let n;return ni!==null?(n=ni,ni=ni.cursor,n.prev=t,n.next=i,n.cursor=this.cursor):n={prev:t,next:i,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=ni,ni=t}updateCursors(t,i,n,o){let{cursor:h}=this;for(;h!==null;)h.prev===t&&(h.prev=i),h.next===n&&(h.next=o),h=h.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let n of t){let o=e.createItem(n);i!==null?i.next=o:this.head=o,o.prev=i,i=o}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let o=n.next;n.next=o.next,t.call(i,o.data,o,this)}this.releaseCursor()}forEachRight(t,i=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let o=n.prev;n.prev=o.prev,t.call(i,o.data,o,this)}this.releaseCursor()}reduce(t,i,n=this){let o=this.allocateCursor(null,this.head),h=i,d;for(;o.next!==null;)d=o.next,o.next=d.next,h=t.call(n,h,d.data,d,this);return this.releaseCursor(),h}reduceRight(t,i,n=this){let o=this.allocateCursor(this.tail,null),h=i,d;for(;o.prev!==null;)d=o.prev,o.prev=d.prev,h=t.call(n,h,d.data,d,this);return this.releaseCursor(),h}some(t,i=this){for(let n=this.head;n!==null;n=n.next)if(t.call(i,n.data,n,this))return!0;return!1}map(t,i=this){let n=new e;for(let o=this.head;o!==null;o=o.next)n.appendData(t.call(i,o.data,o,this));return n}filter(t,i=this){let n=new e;for(let o=this.head;o!==null;o=o.next)t.call(i,o.data,o,this)&&n.appendData(o.data);return n}nextUntil(t,i,n=this){if(t===null)return;let o=this.allocateCursor(null,t);for(;o.next!==null;){let h=o.next;if(o.next=h.next,i.call(n,h.data,h,this))break}this.releaseCursor()}prevUntil(t,i,n=this){if(t===null)return;let o=this.allocateCursor(t,null);for(;o.prev!==null;){let h=o.prev;if(o.prev=h.prev,i.call(n,h.data,h,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function hu(e,t){let i=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var zn=100,du=60,fu="    ";function mu({source:e,line:t,column:i,baseLine:n,baseColumn:o},h){function d(I,W){return b.slice(I,W).map((u,K)=>String(I+K+1).padStart(w)+" |"+u).join(`
`)}let g=`
`.repeat(Math.max(n-1,0)),y=" ".repeat(Math.max(o-1,0)),b=(g+y+e).split(/\r\n?|\n|\f/),v=Math.max(1,t-h)-1,C=Math.min(t+h,b.length+1),w=Math.max(4,String(C).length)+1,E=0;i+=(fu.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>zn&&(E=i-du+3,i=du-2);for(let I=v;I<=C;I++)I>=0&&I<b.length&&(b[I]=b[I].replace(/\t/g,fu),b[I]=(E>0&&b[I].length>E?"\u2026":"")+b[I].substr(E,zn-2)+(b[I].length>E+zn-1?"\u2026":""));return[d(v,t),new Array(i+w+2).join("-")+"^",d(t,C)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Wn(e,t,i,n,o,h=1,d=1){return Object.assign(hu("SyntaxError",e),{source:t,offset:i,line:n,column:o,sourceFragment(y){return mu({source:t,line:n,column:o,baseLine:h,baseColumn:d},isNaN(y)?0:y)},get formattedMessage(){return`Parse error: ${e}
`+mu({source:t,line:n,column:o,baseLine:h,baseColumn:d},2)}})}function we(e){return e>=48&&e<=57}function ot(e){return we(e)||e>=65&&e<=70||e>=97&&e<=102}function Lr(e){return e>=65&&e<=90}function Tm(e){return e>=97&&e<=122}function _m(e){return Lr(e)||Tm(e)}function Lm(e){return e>=128}function _r(e){return _m(e)||Lm(e)||e===95}function Ir(e){return _r(e)||we(e)||e===45}function Im(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function Oi(e){return e===10||e===13||e===12}function lt(e){return Oi(e)||e===32||e===9}function Le(e,t){return!(e!==92||Oi(t)||t===0)}function $r(e,t,i){return e===45?_r(t)||t===45||Le(t,i):_r(e)?!0:e===92?Le(e,t):!1}function Pr(e,t,i){return e===43||e===45?we(t)?2:t===46&&we(i)?3:0:e===46?we(t)?2:0:we(e)?1:0}function Nr(e){return e===65279||e===65534?1:0}var Gn=new Array(128),$m=128,Fi=130,qn=131,Rr=132,Kn=133;for(let e=0;e<Gn.length;e++)Gn[e]=lt(e)&&Fi||we(e)&&qn||_r(e)&&Rr||Im(e)&&Kn||e||$m;function Mr(e){return e<128?Gn[e]:Rr}function ai(e,t){return t<e.length?e.charCodeAt(t):0}function Or(e,t,i){return i===13&&ai(e,t+1)===10?2:1}function Qn(e,t,i){let n=e.charCodeAt(t);return Lr(n)&&(n=n|32),n===i}function Dt(e,t,i,n){if(i-t!==n.length||t<0||i>e.length)return!1;for(let o=t;o<i;o++){let h=n.charCodeAt(o-t),d=e.charCodeAt(o);if(Lr(d)&&(d=d|32),d!==h)return!1}return!0}function gu(e,t){for(;t>=0&&lt(e.charCodeAt(t));t--);return t+1}function Di(e,t){for(;t<e.length&&lt(e.charCodeAt(t));t++);return t}function Yn(e,t){for(;t<e.length&&we(e.charCodeAt(t));t++);return t}function yt(e,t){if(t+=2,ot(ai(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&ot(ai(e,t));t++);let i=ai(e,t);lt(i)&&(t+=Or(e,t,i))}return t}function Vi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!Ir(i)){if(Le(i,ai(e,t+1))){t=yt(e,t)-1;continue}break}}return t}function Fr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),we(i)&&(t=Yn(e,t+1),i=e.charCodeAt(t)),i===46&&we(e.charCodeAt(t+1))&&(t+=2,t=Yn(e,t)),Qn(e,t,101)){let n=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(n=1,i=e.charCodeAt(t+2)),we(i)&&(t=Yn(e,t+1+n+1))}return t}function Dr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Le(i,ai(e,t+1))&&(t=yt(e,t))}return t}function Vr(e){if(e.length===1&&!ot(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var si=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function oi(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var bu=10,Pm=12,xu=13;function yu(e){let t=e.source,i=t.length,n=t.length>0?Nr(t.charCodeAt(0)):0,o=oi(e.lines,i),h=oi(e.columns,i),d=e.startLine,g=e.startColumn;for(let y=n;y<i;y++){let b=t.charCodeAt(y);o[y]=d,h[y]=g++,(b===bu||b===xu||b===Pm)&&(b===xu&&y+1<i&&t.charCodeAt(y+1)===bu&&(y++,o[y]=d,h[y]=g),d++,g=1)}o[i]=d,h[i]=g,e.lines=o,e.columns=h,e.computed=!0}var Br=class{constructor(t,i,n,o){this.setSource(t,i,n,o),this.lines=null,this.columns=null}setSource(t="",i=0,n=1,o=1){this.source=t,this.startOffset=i,this.startLine=n,this.startColumn=o,this.computed=!1}getLocation(t,i){return this.computed||yu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,n){return this.computed||yu(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var Xe=16777215,et=24,ji=1,Ur=2,_t=new Uint8Array(32);_t[2]=22;_t[21]=22;_t[19]=20;_t[23]=24;var tt=new Uint8Array(32);tt[2]=ji;tt[21]=ji;tt[19]=ji;tt[23]=ji;tt[22]=Ur;tt[20]=Ur;tt[24]=Ur;function vu(e,t,i){return e<t?t:e>i?i:e}var jr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let n=t.length,o=oi(this.offsetAndType,t.length+1),h=oi(this.balance,t.length+1),d=0,g=-1,y=0,b=t.length;this.offsetAndType=null,this.balance=null,h.fill(0),i(t,(v,C,w)=>{let E=d++;if(o[E]=v<<et|w,g===-1&&(g=C),h[E]=b,v===y){let I=h[b];h[b]=E,b=I,y=_t[o[I]>>et]}else this.isBlockOpenerTokenType(v)&&(b=E,y=_t[v])}),o[d]=0<<et|n,h[d]=d;for(let v=0;v<d;v++){let C=h[v];if(C<=v){let w=h[C];w!==v&&(h[v]=w)}else C>d&&(h[v]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=o,this.balance=h,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>et:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>et;if(n!==13&&n!==25&&t--===0)return n}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Xe:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>et;if(n!==13&&n!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Dt(this.source,this.offsetAndType[t-1]&Xe,this.offsetAndType[t]&Xe,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Xe:this.offsetAndType[this.tokenCount]&Xe:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[vu(t,0,this.tokenCount)]&Xe}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[vu(t,0,this.tokenCount)]>>et}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return tt[t]===ji}isBlockCloserTokenType(t){return tt[t]===Ur}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(tt[i]===1){let n=this.balance[t],o=this.getTokenType(n);return _t[i]===o?n:-1}else if(tt[i]===2){let n=this.balance[t],o=this.getTokenType(n);return _t[o]===i?n:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&Xe,i=this.offsetAndType[i],this.tokenType=i>>et,this.tokenEnd=i&Xe):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>et,this.tokenEnd=t&Xe):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let n=t,o=0,h=0;e:for(;n<this.tokenCount;n++){if(o=this.balance[n],o<t)break e;switch(h=n>0?this.offsetAndType[n-1]&Xe:this.firstCharOffset,i(this.source.charCodeAt(h))){case 1:break e;case 2:n++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[n]>>et)&&(n=o)}}this.skip(n-this.tokenIndex)}forEachToken(t){for(let i=0,n=this.firstCharOffset;i<this.tokenCount;i++){let o=n,h=this.offsetAndType[i],d=h&Xe,g=h>>et;n=d,t(g,o,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,n,o,h)=>{t[h]={idx:h,type:si[i],chunk:this.source.substring(n,o),balance:this.balance[h]}}),t}};function Hr(e,t){function i(C){return C<g?e.charCodeAt(C):0}function n(){if(b=Fr(e,b),$r(i(b),i(b+1),i(b+2))){v=12,b=Vi(e,b);return}if(i(b)===37){v=11,b++;return}v=10}function o(){let C=b;if(b=Vi(e,b),Dt(e,C,b,"url")&&i(b)===40){if(b=Di(e,b+1),i(b)===34||i(b)===39){v=2,b=C+4;return}d();return}if(i(b)===40){v=2,b++;return}v=1}function h(C){for(C||(C=i(b++)),v=5;b<e.length;b++){let w=e.charCodeAt(b);switch(Mr(w)){case C:b++;return;case Fi:if(Oi(w)){b+=Or(e,b,w),v=6;return}break;case 92:if(b===e.length-1)break;let E=i(b+1);Oi(E)?b+=Or(e,b+1,E):Le(w,E)&&(b=yt(e,b)-1);break}}}function d(){for(v=7,b=Di(e,b);b<e.length;b++){let C=e.charCodeAt(b);switch(Mr(C)){case 41:b++;return;case Fi:if(b=Di(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Dr(e,b),v=8;return;case 34:case 39:case 40:case Kn:b=Dr(e,b),v=8;return;case 92:if(Le(C,i(b+1))){b=yt(e,b)-1;break}b=Dr(e,b),v=8;return}}}e=String(e||"");let g=e.length,y=Nr(i(0)),b=y,v;for(;b<g;){let C=e.charCodeAt(b);switch(Mr(C)){case Fi:v=13,b=Di(e,b+1);break;case 34:h();break;case 35:Ir(i(b+1))||Le(i(b+1),i(b+2))?(v=4,b=Vi(e,b+1)):(v=9,b++);break;case 39:h();break;case 40:v=21,b++;break;case 41:v=22,b++;break;case 43:Pr(C,i(b+1),i(b+2))?n():(v=9,b++);break;case 44:v=18,b++;break;case 45:Pr(C,i(b+1),i(b+2))?n():i(b+1)===45&&i(b+2)===62?(v=15,b=b+3):$r(C,i(b+1),i(b+2))?o():(v=9,b++);break;case 46:Pr(C,i(b+1),i(b+2))?n():(v=9,b++);break;case 47:i(b+1)===42?(v=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(v=9,b++);break;case 58:v=16,b++;break;case 59:v=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(v=14,b=b+4):(v=9,b++);break;case 64:$r(i(b+1),i(b+2),i(b+3))?(v=3,b=Vi(e,b+1)):(v=9,b++);break;case 91:v=19,b++;break;case 92:Le(C,i(b+1))?o():(v=9,b++);break;case 93:v=20,b++;break;case 123:v=23,b++;break;case 125:v=24,b++;break;case qn:n();break;case Rr:o();break;default:v=9,b++}t(v,y,y=b)}}function ku(e){let t=this.createList(),i=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let o=e.getNode.call(this,n);if(o===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,o,t,n),i=!1),t.push(o)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var ui=()=>{},Nm=33,Rm=35,Jn=59,Su=123,wu=0,Mm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},Om={createList(){return new Mi},createSingleNodeList(e){return new Mi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function Fm(e){return function(){return this[e]()}}function Xn(e){let t=Object.create(null);for(let i of Object.keys(e)){let n=e[i],o=n.parse||n;o&&(t[i]=o)}return t}function Dm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Xn(e.atrule),pseudo:Xn(e.pseudo),node:Xn(e.node)};for(let[i,n]of Object.entries(e.parseContext))switch(typeof n){case"function":t.context[i]=n;break;case"string":t.context[i]=Fm(n);break}return{config:t,...t,...t.node}}function Cu(e){let t="",i="<unknown>",n=!1,o=ui,h=!1,d=new Br,g=Object.assign(new jr,Dm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:ku,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(v){return v===Su?1:0},consumeUntilLeftCurlyBracketOrSemicolon(v){return v===Su||v===Jn?1:0},consumeUntilExclamationMarkOrSemicolon(v){return v===Nm||v===Jn?1:0},consumeUntilSemicolonIncluded(v){return v===Jn?2:0},createList:ui,createSingleNodeList:ui,getFirstListNode:ui,getLastListNode:ui,parseWithFallback(v,C){let w=this.tokenIndex;try{return v.call(this)}catch(E){if(h)throw E;this.skip(w-this.tokenIndex);let I=C.call(this);return h=!0,o(E,I),h=!1,I}},lookupNonWSType(v){let C;do if(C=this.lookupType(v++),C!==13&&C!==25)return C;while(C!==wu);return wu},charCodeAt(v){return v>=0&&v<t.length?t.charCodeAt(v):0},substring(v,C){return t.substring(v,C)},substrToCursor(v){return this.source.substring(v,this.tokenStart)},cmpChar(v,C){return Qn(t,v,C)},cmpStr(v,C,w){return Dt(t,v,C,w)},consume(v){let C=this.tokenStart;return this.eat(v),this.substrToCursor(C)},consumeFunctionName(){let v=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),v},consumeNumber(v){let C=t.substring(this.tokenStart,Fr(t,this.tokenStart));return this.eat(v),C},eat(v){if(this.tokenType!==v){let C=si[v].slice(0,-6).replace(/-/g," ").replace(/^./,I=>I.toUpperCase()),w=`${/[[\](){}]/.test(C)?`"${C}"`:C} is expected`,E=this.tokenStart;switch(v){case 1:this.tokenType===2||this.tokenType===7?(E=this.tokenEnd-1,w="Identifier is expected but function found"):w="Identifier is expected";break;case 4:this.isDelim(Rm)&&(this.next(),E++,w="Name is expected");break;case 11:this.tokenType===10&&(E=this.tokenEnd,w="Percent sign is expected");break}this.error(w,E)}this.next()},eatIdent(v){(this.tokenType!==1||this.lookupValue(0,v)===!1)&&this.error(`Identifier "${v}" is expected`),this.next()},eatDelim(v){this.isDelim(v)||this.error(`Delim "${String.fromCharCode(v)}" is expected`),this.next()},getLocation(v,C){return n?d.getLocationRange(v,C,i):null},getLocationFromList(v){if(n){let C=this.getFirstListNode(v),w=this.getLastListNode(v);return d.getLocationRange(C!==null?C.loc.start.offset-d.startOffset:this.tokenStart,w!==null?w.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(v,C){let w=typeof C<"u"&&C<t.length?d.getLocation(C):this.eof?d.getLocation(gu(t,t.length-1)):d.getLocation(this.tokenStart);throw new Wn(v||"Unexpected input",t,w.offset,w.line,w.column,d.startLine,d.startColumn)}}),y=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:v=>g.getTokenType(v),getTokenTypeName:v=>si[g.getTokenType(v)],getTokenStart:v=>g.getTokenStart(v),getTokenEnd:v=>g.getTokenEnd(v),getTokenValue:v=>g.source.substring(g.getTokenStart(v),g.getTokenEnd(v)),substring:(v,C)=>g.source.substring(v,C),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:v=>g.getBlockTokenPairIndex(v),getLocation:v=>d.getLocation(v,i),getRangeLocation:(v,C)=>d.getLocationRange(v,C,i)});return Object.assign(function(v,C){t=v,C=C||{},g.setSource(t,Hr),d.setSource(t,C.offset,C.line,C.column),i=C.filename||"<unknown>",n=!!C.positions,o=typeof C.onParseError=="function"?C.onParseError:ui,h=!1,g.parseAtrulePrelude="parseAtrulePrelude"in C?!!C.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in C?!!C.parseRulePrelude:!0,g.parseValue="parseValue"in C?!!C.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in C?!!C.parseCustomProperty:!1;let{context:w="default",list:E=!0,onComment:I,onToken:W}=C;if(!(w in g.context))throw new Error("Unknown context `"+w+"`");Object.assign(g,E?Om:Mm),Array.isArray(W)?g.forEachToken((K,se,ne)=>{W.push({type:K,start:se,end:ne})}):typeof W=="function"&&g.forEachToken(W.bind(y())),typeof I=="function"&&g.forEachToken((K,se,ne)=>{if(K===25){let he=g.getLocation(se,ne),ht=Dt(t,ne-2,ne,"*/")?t.slice(se+2,ne-2):t.slice(se+2,ne);I(ht,he)}});let u=g.context[w].call(g,C);return g.eof||g.error(),u},{SyntaxError:Wn,config:g.config})}var ea={};O(ea,{AtrulePrelude:()=>Au,Selector:()=>_u,Value:()=>Pu});var Vm=35,Bm=42,Eu=43,jm=45,Um=47,Hm=117;function Ui(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,Hm)&&this.cmpChar(this.tokenStart+1,Eu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Um||t===Bm||t===Eu||t===jm)return this.Operator();t===Vm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var Au={getNode:Ui};var zm=35,Wm=38,Gm=42,qm=43,Km=47,Tu=46,Ym=62,Qm=124,Zm=126;function Jm(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Xm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===Tu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case qm:case Ym:case Zm:case Km:return this.Combinator();case Tu:return this.ClassSelector();case Gm:case Qm:return this.TypeSelector();case zm:return this.IdSelector();case Wm:return this.NestingSelector()}break}}}var _u={onWhiteSpace:Jm,getNode:Xm};function Lu(){return this.createSingleNodeList(this.Raw(null,!1))}function Iu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function $u(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var Pu={getNode:Ui,onWhiteSpace(e,t){$u(e)&&(e.value=" "+e.value),$u(t.last)&&(t.last.value+=" ")},expression:Lu,var:Iu};var eg=new Set(["none","and","not","or"]),Nu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);eg.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var Ru={parse:{prelude:null,block(){return this.Block(!0)}}};function ta(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Mu={layer(){this.skipSC();let e=this.createList(),t=ta.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=ta.call(this,this.Declaration,()=>ta.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},Ou={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Mu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Mu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Fu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var Du={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Vu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Bu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var ju={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Uu={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Hu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var zu={container:Nu,"font-face":Ru,import:Ou,layer:Fu,media:Du,nest:Vu,page:Bu,scope:ju,"starting-style":Uu,supports:Hu};function Wu(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Bt={parse(){return this.createSingleNodeList(this.SelectorList())}},ia={parse(){return this.createSingleNodeList(this.Selector())}},tg={parse(){return this.createSingleNodeList(this.Identifier())}},ig={parse:Wu},zr={parse(){return this.createSingleNodeList(this.Nth())}},Gu={dir:tg,has:Bt,lang:ig,matches:Bt,is:Bt,"-moz-any":Bt,"-webkit-any":Bt,where:Bt,not:Bt,"nth-child":zr,"nth-last-child":zr,"nth-last-of-type":zr,"nth-of-type":zr,slotted:ia,host:ia,"host-context":ia};var Zo={};O(Zo,{AnPlusB:()=>na,Atrule:()=>oa,AtrulePrelude:()=>ua,AttributeSelector:()=>fa,Block:()=>ba,Brackets:()=>va,CDC:()=>wa,CDO:()=>Aa,ClassSelector:()=>La,Combinator:()=>Pa,Comment:()=>Ma,Condition:()=>Da,Declaration:()=>ja,DeclarationList:()=>Wa,Dimension:()=>Ka,Feature:()=>Za,FeatureFunction:()=>es,FeatureRange:()=>ns,Function:()=>os,GeneralEnclosed:()=>us,Hash:()=>ds,IdSelector:()=>ys,Identifier:()=>gs,Layer:()=>Ss,LayerList:()=>Es,MediaQuery:()=>_s,MediaQueryList:()=>$s,NestingSelector:()=>Rs,Nth:()=>Fs,Number:()=>Bs,Operator:()=>Hs,Parentheses:()=>Gs,Percentage:()=>Ys,PseudoClassSelector:()=>Js,PseudoElementSelector:()=>to,Ratio:()=>no,Raw:()=>oo,Rule:()=>uo,Scope:()=>fo,Selector:()=>bo,SelectorList:()=>vo,String:()=>Co,StyleSheet:()=>To,SupportsDeclaration:()=>Io,TypeSelector:()=>Ro,UnicodeRange:()=>Do,Url:()=>Uo,Value:()=>Wo,WhiteSpace:()=>Ko});var sa={};O(sa,{generate:()=>aa,name:()=>ng,parse:()=>na,structure:()=>ag});var pt=43,De=45,Wr=110,jt=!0,rg=!1;function Gr(e,t){let i=this.tokenStart+e,n=this.charCodeAt(i);for((n===pt||n===De)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)we(this.charCodeAt(i))||this.error("Integer is expected",i)}function pi(e){return Gr.call(this,0,e)}function It(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Wr:i="N is expected";break;case De:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function ra(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(pt,e)||this.isDelim(De,e)){t=this.isDelim(pt,e)?pt:De;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),pi.call(this,jt))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==pt&&i!==De&&this.error("Number sign is expected")),pi.call(this,t!==0),t===De?"-"+this.consume(10):this.consume(10)}var ng="AnPlusB",ag={a:[String,null],b:[String,null]};function na(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)pi.call(this,rg),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,De))switch(t="-1",It.call(this,1,Wr),this.tokenEnd-this.tokenStart){case 2:this.next(),i=ra.call(this);break;case 3:It.call(this,2,De),this.next(),this.skipSC(),pi.call(this,jt),i="-"+this.consume(10);break;default:It.call(this,2,De),Gr.call(this,3,jt),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(pt)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(pt)&&(n=1,this.next()),It.call(this,0,Wr),this.tokenEnd-this.tokenStart){case 1:this.next(),i=ra.call(this);break;case 2:It.call(this,1,De),this.next(),this.skipSC(),pi.call(this,jt),i="-"+this.consume(10);break;default:It.call(this,1,De),Gr.call(this,2,jt),this.next(),i=this.substrToCursor(e+n+1)}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),o=n===pt||n===De,h=this.tokenStart+o;for(;h<this.tokenEnd&&we(this.charCodeAt(h));h++);h===this.tokenStart+o&&this.error("Integer is expected",this.tokenStart+o),It.call(this,h-this.tokenStart,Wr),t=this.substring(e,h),h+1===this.tokenEnd?(this.next(),i=ra.call(this)):(It.call(this,h-this.tokenStart+1,De),h+2===this.tokenEnd?(this.next(),this.skipSC(),pi.call(this,jt),i="-"+this.consume(10)):(Gr.call(this,h-this.tokenStart+2,jt),this.next(),i=this.substrToCursor(h+1)))}else this.error();return t!==null&&t.charCodeAt(0)===pt&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===pt&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function aa(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var ca={};O(ca,{generate:()=>la,name:()=>og,parse:()=>oa,structure:()=>cg,walkContext:()=>lg});function qu(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function sg(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var og="Atrule",lg="atrule",cg={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function oa(e=!1){let t=this.tokenStart,i,n,o=null,h=null;switch(this.eat(3),i=this.substrToCursor(t+1),n=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?o=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),qu):o=qu.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?h=this.atrule[n].block.call(this,e):h=this.Block(sg.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:o,block:h}}function la(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var ha={};O(ha,{generate:()=>pa,name:()=>ug,parse:()=>ua,structure:()=>hg,walkContext:()=>pg});var ug="AtrulePrelude",pg="atrulePrelude",hg={children:[[]]};function ua(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function pa(e){this.children(e)}var ga={};O(ga,{generate:()=>ma,name:()=>xg,parse:()=>fa,structure:()=>yg});var dg=36,Ku=42,qr=61,fg=94,da=124,mg=126;function gg(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Ku)?(t=!0,this.next()):this.isDelim(da)||this.eat(1),this.isDelim(da)?this.charCodeAt(this.tokenStart+1)!==qr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function bg(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==qr&&t!==mg&&t!==fg&&t!==dg&&t!==Ku&&t!==da&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==qr&&(this.isDelim(qr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var xg="AttributeSelector",yg={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function fa(){let e=this.tokenStart,t,i=null,n=null,o=null;return this.eat(19),this.skipSC(),t=gg.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=bg.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(o=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:n,flags:o}}function ma(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var ya={};O(ya,{generate:()=>xa,name:()=>Sg,parse:()=>ba,structure:()=>Cg,walkContext:()=>wg});var vg=38;function Zu(){return this.Raw(null,!0)}function Yu(){return this.parseWithFallback(this.Rule,Zu)}function Qu(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function kg(){if(this.tokenType===17)return Qu.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Qu);return this.tokenType===17&&this.next(),e}var Sg="Block",wg="block",Cg={children:[["Atrule","Rule","Declaration"]]};function ba(e){let t=e?kg:Yu,i=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),Zu));break;default:e&&this.isDelim(vg)?n.push(Yu.call(this)):n.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:n}}function xa(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var Sa={};O(Sa,{generate:()=>ka,name:()=>Eg,parse:()=>va,structure:()=>Ag});var Eg="Brackets",Ag={children:[[]]};function va(e,t){let i=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:n}}function ka(e){this.token(9,"["),this.children(e),this.token(9,"]")}var Ea={};O(Ea,{generate:()=>Ca,name:()=>Tg,parse:()=>wa,structure:()=>_g});var Tg="CDC",_g=[];function wa(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function Ca(){this.token(15,"-->")}var _a={};O(_a,{generate:()=>Ta,name:()=>Lg,parse:()=>Aa,structure:()=>Ig});var Lg="CDO",Ig=[];function Aa(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function Ta(){this.token(14,"<!--")}var $a={};O($a,{generate:()=>Ia,name:()=>Pg,parse:()=>La,structure:()=>Ng});var $g=46,Pg="ClassSelector",Ng={name:String};function La(){return this.eatDelim($g),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function Ia(e){this.token(9,"."),this.token(1,e.name)}var Ra={};O(Ra,{generate:()=>Na,name:()=>Fg,parse:()=>Pa,structure:()=>Dg});var Rg=43,Ju=47,Mg=62,Og=126,Fg="Combinator",Dg={name:String};function Pa(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case Mg:case Rg:case Og:this.next();break;case Ju:this.next(),this.eatIdent("deep"),this.eatDelim(Ju);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function Na(e){this.tokenize(e.name)}var Fa={};O(Fa,{generate:()=>Oa,name:()=>jg,parse:()=>Ma,structure:()=>Ug});var Vg=42,Bg=47,jg="Comment",Ug={value:String};function Ma(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===Vg&&this.charCodeAt(t-1)===Bg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function Oa(e){this.token(25,"/*"+e.value+"*/")}var Ba={};O(Ba,{generate:()=>Va,name:()=>zg,parse:()=>Da,structure:()=>Wg});var Hg=new Set([16,22,0]),zg="Condition",Wg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Xu(e){return this.lookupTypeNonSC(1)===1&&Hg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var Gg={media:Xu,container:Xu,supports(){return this.SupportsDeclaration()}};function Da(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>Gg[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let n=this.Condition(e);return this.eat(22),n},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function Va(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var Ha={};O(Ha,{generate:()=>Ua,name:()=>t0,parse:()=>ja,structure:()=>r0,walkContext:()=>i0});var ep=45;function tp(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===ep&&e.charCodeAt(t+1)===ep}var rp=33,qg=35,Kg=36,Yg=38,Qg=42,Zg=43,ip=47;function Jg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Xg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function e0(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(rp)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var t0="Declaration",i0="declaration",r0={important:[Boolean,String],property:String,value:["Value","Raw"]};function ja(){let e=this.tokenStart,t=this.tokenIndex,i=n0.call(this),n=tp(i),o=n?this.parseCustomProperty:this.parseValue,h=n?Xg:Jg,d=!1,g;this.skipSC(),this.eat(16);let y=this.tokenIndex;if(n||this.skipSC(),o?g=this.parseWithFallback(e0,h):g=h.call(this,this.tokenIndex),n&&g.type==="Value"&&g.children.isEmpty){for(let b=y-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(rp)&&(d=a0.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function Ua(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function n0(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Qg:case Kg:case Zg:case qg:case Yg:this.next();break;case ip:this.next(),this.isDelim(ip)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function a0(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var qa={};O(qa,{generate:()=>Ga,name:()=>o0,parse:()=>Wa,structure:()=>l0});var s0=38;function za(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var o0="DeclarationList",l0={children:[["Declaration","Atrule","Rule"]]};function Wa(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),za));break;default:this.isDelim(s0)?e.push(this.parseWithFallback(this.Rule,za)):e.push(this.parseWithFallback(this.Declaration,za))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function Ga(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var Qa={};O(Qa,{generate:()=>Ya,name:()=>c0,parse:()=>Ka,structure:()=>u0});var c0="Dimension",u0={value:String,unit:String};function Ka(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Ya(e){this.token(12,e.value+e.unit)}var Xa={};O(Xa,{generate:()=>Ja,name:()=>h0,parse:()=>Za,structure:()=>d0});var p0=47,h0="Feature",d0={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function Za(e){let t=this.tokenStart,i,n=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?n=this.Ratio():n=this.Number();break;case 12:n=this.Dimension();break;case 1:n=this.Identifier();break;case 2:n=this.parseWithFallback(()=>{let o=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(p0)&&this.error(),o},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:n}}function Ja(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var is={};O(is,{generate:()=>ts,name:()=>f0,parse:()=>es,structure:()=>m0});var f0="FeatureFunction",m0={kind:String,feature:String,value:["Declaration","Selector"]};function g0(e,t){let n=(this.features[e]||{})[t];return typeof n!="function"&&this.error(`Unknown feature ${t}()`),n}function es(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),n=g0.call(this,e,i.toLowerCase());this.skipSC();let o=this.parseWithFallback(()=>{let h=this.tokenIndex,d=n.call(this);return this.eof===!1&&this.isBalanceEdge(h)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:o}}function ts(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var ss={};O(ss,{generate:()=>as,name:()=>y0,parse:()=>ns,structure:()=>v0});var np=47,b0=60,ap=61,x0=62,y0="FeatureRange",v0={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function rs(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(np,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(np)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function sp(e){if(this.skipSC(),this.isDelim(b0)||this.isDelim(x0)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(ap)?(this.next(),t+"="):t}if(this.isDelim(ap))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function ns(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=rs.call(this),n=sp.call(this,i.type==="Identifier"),o=rs.call(this),h=null,d=null;return this.lookupNonWSType(0)!==22&&(h=sp.call(this),d=rs.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:n,middle:o,rightComparison:h,right:d}}function as(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var cs={};O(cs,{generate:()=>ls,name:()=>k0,parse:()=>os,structure:()=>w0,walkContext:()=>S0});var k0="Function",S0="function",w0={name:String,children:[[]]};function os(e,t){let i=this.tokenStart,n=this.consumeFunctionName(),o=n.toLowerCase(),h;return h=t.hasOwnProperty(o)?t[o].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:n,children:h}}function ls(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var hs={};O(hs,{generate:()=>ps,name:()=>C0,parse:()=>us,structure:()=>E0});var C0="GeneralEnclosed",E0={kind:String,function:[String,null],children:[[]]};function us(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let n=this.parseWithFallback(()=>{let o=this.tokenIndex,h=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(o)===!1&&this.error(),h},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:n}}function ps(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var ms={};O(ms,{generate:()=>fs,name:()=>T0,parse:()=>ds,structure:()=>_0,xxx:()=>A0});var A0="XXX",T0="Hash",_0={value:String};function ds(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function fs(e){this.token(4,"#"+e.value)}var xs={};O(xs,{generate:()=>bs,name:()=>L0,parse:()=>gs,structure:()=>I0});var L0="Identifier",I0={name:String};function gs(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function bs(e){this.token(1,e.name)}var ks={};O(ks,{generate:()=>vs,name:()=>$0,parse:()=>ys,structure:()=>P0});var $0="IdSelector",P0={name:String};function ys(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function vs(e){this.token(9,"#"+e.name)}var Cs={};O(Cs,{generate:()=>ws,name:()=>R0,parse:()=>Ss,structure:()=>M0});var N0=46,R0="Layer",M0={name:String};function Ss(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(N0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function ws(e){this.tokenize(e.name)}var Ts={};O(Ts,{generate:()=>As,name:()=>O0,parse:()=>Es,structure:()=>F0});var O0="LayerList",F0={children:[["Layer"]]};function Es(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function As(e){this.children(e,()=>this.token(18,","))}var Is={};O(Is,{generate:()=>Ls,name:()=>D0,parse:()=>_s,structure:()=>V0});var D0="MediaQuery",V0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function _s(){let e=this.tokenStart,t=null,i=null,n=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let o=this.consume(1),h=o.toLowerCase();switch(h==="not"||h==="only"?(this.skipSC(),t=h,i=this.consume(1)):i=o,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),n=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{n=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:n}}function Ls(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Ns={};O(Ns,{generate:()=>Ps,name:()=>B0,parse:()=>$s,structure:()=>j0});var B0="MediaQueryList",j0={children:[["MediaQuery"]]};function $s(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function Ps(e){this.children(e,()=>this.token(18,","))}var Os={};O(Os,{generate:()=>Ms,name:()=>H0,parse:()=>Rs,structure:()=>z0});var U0=38,H0="NestingSelector",z0={};function Rs(){let e=this.tokenStart;return this.eatDelim(U0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function Ms(){this.token(9,"&")}var Vs={};O(Vs,{generate:()=>Ds,name:()=>W0,parse:()=>Fs,structure:()=>G0});var W0="Nth",G0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Fs(){this.skipSC();let e=this.tokenStart,t=e,i=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:i}}function Ds(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Us={};O(Us,{generate:()=>js,name:()=>q0,parse:()=>Bs,structure:()=>K0});var q0="Number",K0={value:String};function Bs(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function js(e){this.token(10,e.value)}var Ws={};O(Ws,{generate:()=>zs,name:()=>Y0,parse:()=>Hs,structure:()=>Q0});var Y0="Operator",Q0={value:String};function Hs(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function zs(e){this.tokenize(e.value)}var Ks={};O(Ks,{generate:()=>qs,name:()=>Z0,parse:()=>Gs,structure:()=>J0});var Z0="Parentheses",J0={children:[[]]};function Gs(e,t){let i=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:n}}function qs(e){this.token(21,"("),this.children(e),this.token(22,")")}var Zs={};O(Zs,{generate:()=>Qs,name:()=>X0,parse:()=>Ys,structure:()=>eb});var X0="Percentage",eb={value:String};function Ys(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Qs(e){this.token(11,e.value+"%")}var eo={};O(eo,{generate:()=>Xs,name:()=>tb,parse:()=>Js,structure:()=>rb,walkContext:()=>ib});var tb="PseudoClassSelector",ib="function",rb={name:String,children:[["Raw"],null]};function Js(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Xs(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var ro={};O(ro,{generate:()=>io,name:()=>nb,parse:()=>to,structure:()=>sb,walkContext:()=>ab});var nb="PseudoElementSelector",ab="function",sb={name:String,children:[["Raw"],null]};function to(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function io(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var so={};O(so,{generate:()=>ao,name:()=>ob,parse:()=>no,structure:()=>lb});var op=47;function lp(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var ob="Ratio",lb={left:["Number","Function"],right:["Number","Function",null]};function no(){let e=this.tokenStart,t=lp.call(this),i=null;return this.skipSC(),this.isDelim(op)&&(this.eatDelim(op),i=lp.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function ao(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var co={};O(co,{generate:()=>lo,name:()=>ub,parse:()=>oo,structure:()=>pb});function cb(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var ub="Raw",pb={value:String};function oo(e,t){let i=this.getTokenStart(this.tokenIndex),n;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?n=cb.call(this):n=this.tokenStart,{type:"Raw",loc:this.getLocation(i,n),value:this.substring(i,n)}}function lo(e){this.tokenize(e.value)}var ho={};O(ho,{generate:()=>po,name:()=>db,parse:()=>uo,structure:()=>mb,walkContext:()=>fb});function cp(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function hb(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var db="Rule",fb="rule",mb={prelude:["SelectorList","Raw"],block:["Block"]};function uo(){let e=this.tokenIndex,t=this.tokenStart,i,n;return this.parseRulePrelude?i=this.parseWithFallback(hb,cp):i=cp.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:n}}function po(e){this.node(e.prelude),this.node(e.block)}var go={};O(go,{generate:()=>mo,name:()=>gb,parse:()=>fo,structure:()=>bb});var gb="Scope",bb={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function fo(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function mo(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var yo={};O(yo,{generate:()=>xo,name:()=>xb,parse:()=>bo,structure:()=>yb});var xb="Selector",yb={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function bo(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function xo(e){this.children(e)}var So={};O(So,{generate:()=>ko,name:()=>vb,parse:()=>vo,structure:()=>Sb,walkContext:()=>kb});var vb="SelectorList",kb="selector",Sb={children:[["Selector","Raw"]]};function vo(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function ko(e){this.children(e,()=>this.token(18,","))}var Ao={};O(Ao,{generate:()=>Eo,name:()=>Cb,parse:()=>Co,structure:()=>Eb});var wo=92,up=34,pp=39;function Kr(e){let t=e.length,i=e.charCodeAt(0),n=i===up||i===pp?1:0,o=n===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,h="";for(let d=n;d<=o;d++){let g=e.charCodeAt(d);if(g===wo){if(d===o){d!==t-1&&(h=e.substr(d+1));break}if(g=e.charCodeAt(++d),Le(wo,g)){let y=d-1,b=yt(e,y);d=b-1,h+=Vr(e.substring(y+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else h+=e[d]}return h}function hp(e,t){let i=t?"'":'"',n=t?pp:up,o="",h=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){o+="\uFFFD";continue}if(g<=31||g===127){o+="\\"+g.toString(16),h=!0;continue}g===n||g===wo?(o+="\\"+e.charAt(d),h=!1):(h&&(ot(g)||lt(g))&&(o+=" "),o+=e.charAt(d),h=!1)}return i+o+i}var Cb="String",Eb={value:String};function Co(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Kr(this.consume(5))}}function Eo(e){this.token(5,hp(e.value))}var Lo={};O(Lo,{generate:()=>_o,name:()=>Tb,parse:()=>To,structure:()=>Lb,walkContext:()=>_b});var Ab=33;function dp(){return this.Raw(null,!1)}var Tb="StyleSheet",_b="stylesheet",Lb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function To(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==Ab){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,dp);break;default:i=this.parseWithFallback(this.Rule,dp)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function _o(e){this.children(e)}var Po={};O(Po,{generate:()=>$o,name:()=>Ib,parse:()=>Io,structure:()=>$b});var Ib="SupportsDeclaration",$b={declaration:"Declaration"};function Io(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function $o(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var Oo={};O(Oo,{generate:()=>Mo,name:()=>Nb,parse:()=>Ro,structure:()=>Rb});var Pb=42,fp=124;function No(){this.tokenType!==1&&this.isDelim(Pb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var Nb="TypeSelector",Rb={name:String};function Ro(){let e=this.tokenStart;return this.isDelim(fp)?(this.next(),No.call(this)):(No.call(this),this.isDelim(fp)&&(this.next(),No.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Mo(e){this.tokenize(e.name)}var Bo={};O(Bo,{generate:()=>Vo,name:()=>Fb,parse:()=>Do,structure:()=>Db});var mp=43,gp=45,Fo=63;function Hi(e,t){let i=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let o=this.charCodeAt(n);if(o===gp&&t&&i!==0)return Hi.call(this,e+i+1,!1),-1;ot(o)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",n),++i>6&&this.error("Too many hex digits",n)}return this.next(),i}function Yr(e){let t=0;for(;this.isDelim(Fo);)++t>e&&this.error("Too many question marks"),this.next()}function Mb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===mp?"Plus sign":"Hyphen minus")+" is expected")}function Ob(){let e=0;switch(this.tokenType){case 10:if(e=Hi.call(this,1,!0),this.isDelim(Fo)){Yr.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){Mb.call(this,gp),Hi.call(this,1,!1);break}break;case 12:e=Hi.call(this,1,!0),e>0&&Yr.call(this,6-e);break;default:if(this.eatDelim(mp),this.tokenType===1){e=Hi.call(this,0,!0),e>0&&Yr.call(this,6-e);break}if(this.isDelim(Fo)){this.next(),Yr.call(this,5);break}this.error("Hex digit or question mark is expected")}}var Fb="UnicodeRange",Db={value:String};function Do(){let e=this.tokenStart;return this.eatIdent("u"),Ob.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Vo(e){this.tokenize(e.value)}var zo={};O(zo,{generate:()=>Ho,name:()=>zb,parse:()=>Uo,structure:()=>Wb});var Vb=32,jo=92,Bb=34,jb=39,Ub=40,bp=41;function xp(e){let t=e.length,i=4,n=e.charCodeAt(t-1)===bp?t-2:t-1,o="";for(;i<n&&lt(e.charCodeAt(i));)i++;for(;i<n&&lt(e.charCodeAt(n));)n--;for(let h=i;h<=n;h++){let d=e.charCodeAt(h);if(d===jo){if(h===n){h!==t-1&&(o=e.substr(h+1));break}if(d=e.charCodeAt(++h),Le(jo,d)){let g=h-1,y=yt(e,g);h=y-1,o+=Vr(e.substring(g+1,y))}else d===13&&e.charCodeAt(h+1)===10&&h++}else o+=e[h]}return o}function yp(e){let t="",i=!1;for(let n=0;n<e.length;n++){let o=e.charCodeAt(n);if(o===0){t+="\uFFFD";continue}if(o<=31||o===127){t+="\\"+o.toString(16),i=!0;continue}o===Vb||o===jo||o===Bb||o===jb||o===Ub||o===bp?(t+="\\"+e.charAt(n),i=!1):(i&&ot(o)&&(t+=" "),t+=e.charAt(n),i=!1)}return"url("+t+")"}var zb="Url",Wb={value:String};function Uo(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=xp(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Kr(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function Ho(e){this.token(7,yp(e.value))}var qo={};O(qo,{generate:()=>Go,name:()=>Gb,parse:()=>Wo,structure:()=>qb});var Gb="Value",qb={children:[[]]};function Wo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function Go(e){this.children(e)}var Qo={};O(Qo,{generate:()=>Yo,name:()=>Yb,parse:()=>Ko,structure:()=>Qb});var Kb=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Yb="WhiteSpace",Qb={value:String};function Ko(){return this.eat(13),Kb}function Yo(e){this.token(13,e.value)}var vp={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:ea,atrule:zu,pseudo:Gu,node:Zo};var kp=Cu(vp);var{hasOwnProperty:Jo}=Object.prototype,zi=function(){};function Sp(e){return typeof e=="function"?e:zi}function wp(e,t){return function(i,n,o){i.type===t&&e.call(this,i,n,o)}}function Zb(e,t){let i=t.structure,n=[];for(let o in i){if(Jo.call(i,o)===!1)continue;let h=i[o],d={name:o,type:!1,nullable:!1};Array.isArray(h)||(h=[h]);for(let g of h)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&n.push(d)}return n.length?{context:t.walkContext,fields:n}:null}function Jb(e){let t={};for(let i in e.node)if(Jo.call(e.node,i)){let n=e.node[i];if(!n.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Zb(i,n)}return t}function Cp(e,t){let i=e.fields.slice(),n=e.context,o=typeof n=="string";return t&&i.reverse(),function(h,d,g,y){let b;o&&(b=d[n],d[n]=h);for(let v of i){let C=h[v.name];if(!v.nullable||C){if(v.type==="list"){if(t?C.reduceRight(y,!1):C.reduce(y,!1))return!0}else if(g(C))return!0}}o&&(d[n]=b)}}function Ep({StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:o}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:o}}}function Ap(e){let t=Jb(e),i={},n={},o=Symbol("break-walk"),h=Symbol("skip-node");for(let b in t)Jo.call(t,b)&&t[b]!==null&&(i[b]=Cp(t[b],!1),n[b]=Cp(t[b],!0));let d=Ep(i),g=Ep(n),y=function(b,v){function C(K,se,ne){let he=w.call(u,K,se,ne);return he===o?!0:he===h?!1:!!(I.hasOwnProperty(K.type)&&I[K.type](K,u,C,W)||E.call(u,K,se,ne)===o)}let w=zi,E=zi,I=i,W=(K,se,ne,he)=>K||C(se,ne,he),u={break:o,skip:h,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof v=="function")w=v;else if(v&&(w=Sp(v.enter),E=Sp(v.leave),v.reverse&&(I=n),v.visit)){if(d.hasOwnProperty(v.visit))I=v.reverse?g[v.visit]:d[v.visit];else if(!t.hasOwnProperty(v.visit))throw new Error("Bad value `"+v.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");w=wp(w,v.visit),E=wp(E,v.visit)}if(w===zi&&E===zi)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");C(b)};return y.break=o,y.skip=h,y.find=function(b,v){let C=null;return y(b,function(w,E,I){if(v.call(this,w,E,I))return C=w,o}),C},y.findLast=function(b,v){let C=null;return y(b,{reverse:!0,enter(w,E,I){if(v.call(this,w,E,I))return C=w,o}}),C},y.findAll=function(b,v){let C=[];return y(b,function(w,E,I){v.call(this,w,E,I)&&C.push(w)}),C},y}var Xo={};O(Xo,{AnPlusB:()=>sa,Atrule:()=>ca,AtrulePrelude:()=>ha,AttributeSelector:()=>ga,Block:()=>ya,Brackets:()=>Sa,CDC:()=>Ea,CDO:()=>_a,ClassSelector:()=>$a,Combinator:()=>Ra,Comment:()=>Fa,Condition:()=>Ba,Declaration:()=>Ha,DeclarationList:()=>qa,Dimension:()=>Qa,Feature:()=>Xa,FeatureFunction:()=>is,FeatureRange:()=>ss,Function:()=>cs,GeneralEnclosed:()=>hs,Hash:()=>ms,IdSelector:()=>ks,Identifier:()=>xs,Layer:()=>Cs,LayerList:()=>Ts,MediaQuery:()=>Is,MediaQueryList:()=>Ns,NestingSelector:()=>Os,Nth:()=>Vs,Number:()=>Us,Operator:()=>Ws,Parentheses:()=>Ks,Percentage:()=>Zs,PseudoClassSelector:()=>eo,PseudoElementSelector:()=>ro,Ratio:()=>so,Raw:()=>co,Rule:()=>ho,Scope:()=>go,Selector:()=>yo,SelectorList:()=>So,String:()=>Ao,StyleSheet:()=>Lo,SupportsDeclaration:()=>Po,TypeSelector:()=>Oo,UnicodeRange:()=>Bo,Url:()=>zo,Value:()=>qo,WhiteSpace:()=>Qo});var Tp={node:Xo};var _p=Ap(Tp);var Yp=Hf(qp(),1),Kp=new Set(["Atrule","Selector","Declaration"]);function Qp(e){let t=new Yp.SourceMapGenerator,i={line:1,column:0},n={line:0,column:0},o={line:1,column:0},h={generated:o},d=1,g=0,y=!1,b=e.node;e.node=function(w){if(w.loc&&w.loc.start&&Kp.has(w.type)){let E=w.loc.start.line,I=w.loc.start.column-1;(n.line!==E||n.column!==I)&&(n.line=E,n.column=I,i.line=d,i.column=g,y&&(y=!1,(i.line!==o.line||i.column!==o.column)&&t.addMapping(h)),y=!0,t.addMapping({source:w.loc.source,original:n,generated:i}))}b.call(this,w),y&&Kp.has(w.type)&&(o.line=d,o.column=g)};let v=e.emit;e.emit=function(w,E,I){for(let W=0;W<w.length;W++)w.charCodeAt(W)===10?(d++,g=0):g++;v(w,E,I)};let C=e.result;return e.result=function(){return y&&t.addMapping(h),{css:C(),map:t}},e}var Xr={};O(Xr,{safe:()=>ol,spec:()=>vx});var bx=43,xx=45,sl=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Zp=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],yx=Zp.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Jp(e){let t=new Set(e.map(([i,n])=>sl(i)<<16|sl(n)));return function(i,n,o){let h=sl(n,o),d=o.charCodeAt(0),g=d===xx&&n!==1&&n!==2&&n!==15||d===bx?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|h);return h|g}}var vx=Jp(Zp),ol=Jp(yx);var kx=92;function Sx(e,t){if(typeof t=="function"){let i=null;e.children.forEach(n=>{i!==null&&t.call(this,i),this.node(n),i=n});return}e.children.forEach(this.node,this)}function Xp(e){let t=new Map;for(let[i,n]of Object.entries(e.node))typeof(n.generate||n)=="function"&&t.set(i,n.generate||n);return function(i,n){let o="",h=0,d={node(y){if(t.has(y.type))t.get(y.type).call(g,y);else throw new Error("Unknown node type: "+y.type)},tokenBefore:ol,token(y,b,v){h=this.tokenBefore(h,y,b),!v&&h&1&&this.emit(" ",13,!0),this.emit(b,y,!1),y===9&&b.charCodeAt(0)===kx&&this.emit(`
`,13,!0)},emit(y){o+=y},result(){return o}};n&&(typeof n.decorator=="function"&&(d=n.decorator(d)),n.sourceMap&&(d=Qp(d)),n.mode in Xr&&(d.tokenBefore=Xr[n.mode]));let g={node:y=>d.node(y),children:Sx,token:(y,b)=>d.token(y,b),tokenize:y=>Hr(y,(b,v,C)=>{d.token(b,y.slice(v,C),v!==0)})};return d.node(i),d.result()}}var ll={};O(ll,{AnPlusB:()=>aa,Atrule:()=>la,AtrulePrelude:()=>pa,AttributeSelector:()=>ma,Block:()=>xa,Brackets:()=>ka,CDC:()=>Ca,CDO:()=>Ta,ClassSelector:()=>Ia,Combinator:()=>Na,Comment:()=>Oa,Condition:()=>Va,Declaration:()=>Ua,DeclarationList:()=>Ga,Dimension:()=>Ya,Feature:()=>Ja,FeatureFunction:()=>ts,FeatureRange:()=>as,Function:()=>ls,GeneralEnclosed:()=>ps,Hash:()=>fs,IdSelector:()=>vs,Identifier:()=>bs,Layer:()=>ws,LayerList:()=>As,MediaQuery:()=>Ls,MediaQueryList:()=>Ps,NestingSelector:()=>Ms,Nth:()=>Ds,Number:()=>js,Operator:()=>zs,Parentheses:()=>qs,Percentage:()=>Qs,PseudoClassSelector:()=>Xs,PseudoElementSelector:()=>io,Ratio:()=>ao,Raw:()=>lo,Rule:()=>po,Scope:()=>mo,Selector:()=>xo,SelectorList:()=>ko,String:()=>Eo,StyleSheet:()=>_o,SupportsDeclaration:()=>$o,TypeSelector:()=>Mo,UnicodeRange:()=>Vo,Url:()=>Ho,Value:()=>Go,WhiteSpace:()=>Yo});var eh={node:ll};var cl=Xp(eh);var qi="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),wx=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),ih=new Set(["__proto__","prototype","constructor"]);function en(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(n=>en(n,t)):i&&typeof i=="object"&&en(i,t)}}function di(e){return e?e.computed?e.property?.value:e.property?.name:""}function fi(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!fi(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=fi(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(fi);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let n=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||ih.has(String(n)))throw new Error("Property static tidak aman");t[n]=fi(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function th(e,t){let i=null;return en(e,n=>{if(i)return;let o=n.type==="VariableDeclarator"&&n.id.name===t,h=n.type==="AssignmentExpression"&&n.left.type==="MemberExpression"&&["window","globalThis"].includes(n.left.object.name)&&di(n.left)===t;if(o||h)try{i=fi(o?n.init:n.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function Cx(e){let t=new WeakMap,i=(o,h,d=null)=>{o&&(o.type==="Identifier"?h.bindings.set(o.name,d):o.type==="RestElement"?i(o.argument,h):o.type==="AssignmentPattern"?i(o.left,h):o.type==="ArrayPattern"?o.elements.forEach(g=>i(g,h)):o.type==="ObjectPattern"&&o.properties.forEach(g=>i(g.value||g.argument,h)))},n=(o,h)=>{if(!o||typeof o!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(o.type);o.type==="FunctionDeclaration"&&i(o.id,h);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(o.type),y=g?{parent:h,bindings:new Map,functionScope:null}:h;g&&(y.functionScope=d||o.type==="Program"?y:h.functionScope),t.set(o,y),d&&(o.id&&i(o.id,y),o.params.forEach(b=>i(b,y))),o.type==="CatchClause"&&i(o.param,y),o.type==="VariableDeclaration"&&o.declarations.forEach(b=>i(b.id,o.kind==="var"?y.functionScope:y,b.init));for(let b of Object.values(o))Array.isArray(b)?b.forEach(v=>n(v,y)):b&&typeof b=="object"&&n(b,y)};return n(e,null),t}function Ex(e){let t=[],i=Cx(e),n=(g,y=new Set)=>{if(g?.type!=="Identifier"||y.has(g))return g;y.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return n(b.bindings.get(g.name),y);return g},o=g=>(g=n(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&di(g)==="document"),h=g=>(g=n(g),g?.type==="MemberExpression"?o(g.object)&&di(g)==="body":g?.type==="CallExpression"&&o(g.callee.object)&&di(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=n(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||di(g.callee)==="MutationObserver"));return en(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||di(g.callee)!=="observe"||!d(g.callee.object)||!h(g.arguments[0]))return;let y;try{y=fi(n(g.arguments[1]))}catch{}let b=y?.attributes??(y?.attributeFilter!==void 0||y?.attributeOldValue!==void 0);(!y||b&&(!Array.isArray(y.attributeFilter)||y.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function rh(e){let t=[...e.children],i=t.slice(t.findLastIndex(n=>n.type==="Combinator")+1);return i.some(n=>n.type==="PseudoElementSelector")?[]:i.flatMap(n=>n.type==="TypeSelector"&&["html","body"].includes(n.name.toLowerCase())?[n.name.toLowerCase()]:n.type==="PseudoClassSelector"&&n.name==="root"?["html"]:n.type==="PseudoClassSelector"&&["is","where"].includes(n.name)&&n.children?[...n.children].flatMap(o=>o.type==="SelectorList"?[...o.children].flatMap(rh):[]):[])}function Ax(e){let t=[],i;try{i=kp(e)}catch(h){return["CSS tidak terbaca: "+h.message]}let n=[!0],o={html:{},body:{}};return _p(i,{enter(h){if(h.type==="Atrule"){h.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=h.prelude?cl(h.prelude):"",y=h.name.toLowerCase()==="media"&&g.split(",").every(b=>{let v=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||v&&Number(v[1])>960});n.push(n.at(-1)&&!y)}if(h.type!=="Rule"||!n.at(-1))return;let d=new Set(h.prelude?.type==="SelectorList"?[...h.prelude.children].flatMap(rh):[]);h.block.children.forEach(g=>{if(g.type!=="Declaration")return;let y=cl(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(y)&&(o[b].overflow=!0),g.property==="height"&&y==="100dvh"&&(o[b].height=!0)})},leave(h){h.type==="Atrule"&&n.pop()}}),Object.values(o).some(h=>h.height&&h.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function ul({doc:e,scripts:t=[],css:i="",config:n,schema:o,requireObjects:h=!0}){let d=[],g=[];for(let w of t)try{let E=pu(w,{ecmaVersion:"latest",sourceType:"script"});g.push(E),d.push(...Ex(E))}catch(E){d.push("Sintaks JavaScript gagal kompilasi: "+E.message)}n??(n=g.map(w=>th(w,"CONFIG")).find(Boolean)),o??(o=g.map(w=>th(w,"SVE_SCHEMA")).find(Boolean)),h&&!n&&d.push("CONFIG static tidak terbaca"),h&&!o&&d.push("SVE_SCHEMA static tidak terbaca");let y=o?.template?.type==="custom-page";if(o){Array.isArray(o.sections)||d.push("SVE_SCHEMA.sections wajib array");let w=Array.isArray(o.sections)?o.sections:[],E=w.map(I=>I?.id);new Set(E).size!==E.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),y||(qi.forEach(I=>{E.includes(I)||d.push("Canonical section hilang: "+I)}),E.forEach(I=>{qi.includes(I)||d.push("Section bukan canonical: "+I)}));for(let I of w){if(I?.fields!==void 0&&!Array.isArray(I.fields)){d.push("Section fields wajib array");continue}for(let W of I?.fields||[])if(wx.has(W?.type||"text")||d.push("Field type tidak didukung: "+W?.type),!!["repeater","repeater-image"].includes(W?.type)){if(!Array.isArray(W.fields)){d.push("Repeater tanpa fields[]");continue}for(let u of W.fields)(!u?.key||ih.has(u.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(u?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(n&&!y){let w=n.sectionOrder;(!Array.isArray(w)||w.length!==qi.length||!qi.every(E=>w.includes(E))||w[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let v=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(v)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(v)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(v)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let C=["html","body"].map(w=>`${w}{${e?.querySelector(w)?.getAttribute("style")||""}}`).join("");d.push(...Ax(i+C));for(let w of e?.querySelectorAll("audio")||[])w.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let w of e?.querySelectorAll("iframe")||[]){let E="";try{E=new URL(w.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(E)&&w.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:n,schema:o}}var Tx="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-background-primary sve-button-text-primary sve-button-background-secondary sve-button-text-secondary".split(" "),_x=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function Lx(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(n=>n[1]));return i.size?[...Tx,..._x].filter(n=>i.has(n)&&!new RegExp(`var\\(\\s*--${n}\\s*[,)]`).test(t)).map(n=>`Token ${n} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function Ix(e){let t=[];for(let i of e?.querySelectorAll?.("[style]")||[]){if(i.hasAttribute?.("data-sve-literal-color"))continue;let h=(i.getAttribute("style")||"").replace(/var\([^)]*\)/g,"").match(/#[0-9a-f]{3,8}\b/gi);if(!h)continue;let d=i.getAttribute("data-pencil-id"),g=i.getAttribute("data-pencil-name"),y=d?` pada node ${d}${g?" ("+g+")":""}`:"";t.push(`Warna belum tertoken: ${[...new Set(h)].join(", ")}${y}. Panel Color SVE tidak akan mengubahnya`)}return t}function nh(e,t){let i=String(e||"").replace(/^\uFEFF/,""),n=t(i),o=[...n.querySelectorAll("style")],h=[...n.querySelectorAll("script")],d=ul({doc:n,css:o.map(b=>b.textContent).join(`
`),scripts:h.map(b=>b.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),n.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!n.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!n.body)&&g.push("Elemen body wajib ada"),n.head?.querySelector("title")||g.push("Title wajib ada di head"),n.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(o.length!==1||!n.head?.contains(o[0]))&&g.push("Wajib tepat satu style di head"),(h.length!==1||!n.body?.contains(h[0]))&&g.push("Wajib tepat satu script di body"),h[0]&&h[0]!==n.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),h.some(b=>b.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let b=new Set([...n.querySelectorAll("[data-section-id]")].map(v=>v.getAttribute("data-section-id")));qi.forEach(v=>{b.has(v)||g.push("Markup section hilang: "+v)})}g.push(...Lx(d.html??i));let y=Ix(n);return{...d,blockers:[...new Set(g)],warnings:y,html:i}}var $x="sve-config",Px="sve-config-ack",tn=["htmlDocument","html_document"];function ah(e){let t=e?.pageDisplayValues;if(!t)return null;let i=null;for(let n of tn){let o=t[n];typeof o!="string"||o===""||(i===null||o.length>i.length)&&(i=o)}return i===null||i.length<=2048?null:i}function Nx(e){let t=e?.pageDisplayValues;if(!t)return tn[0];for(let i of tn)if(typeof t[i]=="string")return i;return tn[0]}var Rx="scalev-html-mode-preview-loaded",Mx=400,Ox=2500,Fx=40;function sh({document:e,window:t,getConfig:i,syncImages:n,metrics:o}){let h=null,d=null,g=!1,y=null,b=null,v=0,C=null,w=null,E=null,I=!1,W=null,u=null,K=0,se=null,ne=!1,he=!1;function ht(){if(h?.isConnected)return h;let R=[...e.querySelectorAll("iframe")];return h=R.find(M=>M.getAttribute("title")==="HTML Mode preview")||R.find(M=>M.id==="preview")||R.find(M=>(M.getAttribute("srcdoc")||"").length>0)||null,h}function $e(R){if(!R)return null;try{let M=R.contentWindow;return M&&typeof M.SVE_REFRESH=="function"?M:null}catch{return null}}function Ye(){try{let M=(e.querySelector("section.studio-page")||e.getElementById("__nuxt"))?.__vue__;return!M||!M.pageDisplayValues||ah(M)===null||typeof M.$set!="function"?null:M}catch{return null}}function Ve(R,M){R.$set(R.pageDisplayValues,Nx(R),M)}function $t(){I||(I=!0,t.addEventListener("message",R=>{let M=R.data;if(!(!M||typeof M!="object")){if(M.type===Rx){ne&&(ne=!1,E!==null&&(t.clearTimeout(E),E=null),W!==!0&&(W=!0,o.previewLoadedCount=(o.previewLoadedCount||0)+1));return}M.type===Px&&(R.origin!=="null"&&R.origin!==t.location?.origin||C!==null&&M.id!==C||(C=null,w!==null&&(t.clearTimeout(w),w=null),W===null&&(W=!0),o.previewAckCount=(o.previewAckCount||0)+1,M.error&&console.warn("[SVE] Preview menolak CONFIG:",M.error)))}}))}function Pt(){if(W===null){W=!1,o.previewUnsupported=!0;try{u?.()}catch(R){console.warn("[SVE] onUnsupported gagal",R)}}}function Ht(R,M){$t();let le=JSON.parse(M),ce=++v;C=ce,R.contentWindow.postMessage({type:$x,id:ce,config:le},"*"),o.previewMessageCount=(o.previewMessageCount||0)+1,W===null&&w===null&&(w=t.setTimeout(()=>{w=null,C!==null&&Pt()},Mx))}function mi(R,M,le){let ce=JSON.parse(le);if(M.CONFIG=ce,M.SVE_REFRESH?.(ce),W=!0,o.previewDirectCount=(o.previewDirectCount||0)+1,g)try{R.contentDocument&&n(R.contentDocument)}catch{}}function Q(R,M){if(he)return o.previewScalevCount=(o.previewScalevCount||0)+1,o.previewScalevMutedCount=(o.previewScalevMutedCount||0)+1,!0;if(!R)return!1;$t();try{Ve(R,M)}catch(le){return console.warn("[SVE] Payload preview Scalev gagal",le),!1}return ne=!0,E===null&&(E=t.setTimeout(()=>{E=null,ne&&(ne=!1,se=!1,o.previewLoadedTimeout=(o.previewLoadedTimeout||0)+1)},Ox)),o.previewScalevCount=(o.previewScalevCount||0)+1,!0}function Z(){d!==null&&t.cancelAnimationFrame(d),d=null;let R=ht(),M=i();if(!R||!M)return;let le=JSON.stringify(M);if(!(le===y&&R===b&&!g)){try{let ce=$e(R);ce?mi(R,ce,le):Ht(R,le),y=le,b=R,o.previewRefreshCount=(o.previewRefreshCount||0)+1}catch(ce){console.warn("[SVE] Preview refresh gagal",ce)}g=!1}}return{request({images:R=!1,force:M=!1}={}){g||(g=R),M&&(y=null,b=null),d===null&&(d=t.requestAnimationFrame(Z))},fromScalevSource(R){if(typeof R!="string"||!R)return!1;if(he)return o.previewScalevCount=(o.previewScalevCount||0)+1,o.previewScalevMutedCount=(o.previewScalevMutedCount||0)+1,!0;if(se===!1){if(++K<Fx)return!1;K=0}let M=Ye();if(!M)return se=!1,!1;let le=Q(M,R);return le&&(se=!0),le},document(){try{return ht()?.contentDocument||null}catch{return null}},supported(){return W},onUnsupported(R){u=R},setScalevMuted(R){return he=R===!0,he},isScalevMuted(){return he},invalidate(){h=null,y=null,b=null,se=null},flush:Z,scalevTarget:Ye,readDocument:ah}}var Dx="sve-config",Vx="sve-config-ack";var oh="#builder-canvas-boundary";function lh({document:e,window:t,getDocument:i,getConfig:n,metrics:o}){let h=null,d=null,g=null,y=null,b=null,v=1,C=!1,w=!0,E=null,I=!1,W=0,u=new Map,K=null,se=!1,ne=null;function he(){se||(se=!0,t.addEventListener("message",Q=>{let Z=Q.data;if(!Z||typeof Z!="object"||Z.type!==Vx)return;let R=u.get(Z.id);R&&(u.delete(Z.id),R(Z.error?new Error(String(Z.error)):null))}))}function ht(Q){if(!g||!C)return Promise.resolve(!1);let Z=JSON.stringify(Q);if(Z===K)return Promise.resolve(!0);he();let R=++W;return new Promise(M=>{let le=t.setTimeout(()=>{u.delete(R),M(!1)},1200);u.set(R,ce=>{if(t.clearTimeout(le),ce){o.livePreviewError=String(ce.message||ce),M(!1);return}K=Z,o.livePreviewCount=(o.livePreviewCount||0)+1,M(!0)});try{g.contentWindow.postMessage({type:Dx,id:R,config:Q},"*")}catch(ce){t.clearTimeout(le),u.delete(R),o.livePreviewError=String(ce.message||ce),M(!1)}})}function $e(){if(!w||!d)return;let Q=null;try{Q=e.querySelector(oh)?.parentElement?.getBoundingClientRect()||null}catch{Q=null}if(!Q||!Q.width||!Q.height){d.style.left="",d.style.top="",d.style.right="",d.style.bottom="",d.style.width="",d.style.height="";return}d.style.left=Math.round(Q.left)+"px",d.style.top=Math.round(Q.top)+"px",d.style.right="auto",d.style.bottom="auto",d.style.width=Math.round(Q.width)+"px",d.style.height=Math.round(Q.height)+"px"}function Ye(){if($e(),!y||!g)return;let Q=y.clientWidth,Z=y.clientHeight;!Q||!Z||(v=Math.min(1,Q/1440),g.style.transform=`scale(${v})`,g.style.transformOrigin="top left",g.style.width="1440px",g.style.height=Math.round(Z/v)+"px")}function Ve(){if(I||C)return;let Q=i?.();if(typeof Q!="string"||!Q){b&&(b.textContent="Menunggu template dari Scalev...");return}I=!0,b&&(b.textContent=""),o.livePreviewBootCount=(o.livePreviewBootCount||0)+1,g=e.createElement("iframe"),g.className="sve-live-frame",g.setAttribute("title","SVE live preview"),g.setAttribute("sandbox","allow-scripts allow-same-origin"),g.setAttribute("srcdoc",Q),y.replaceChildren(g,b),$e();let Z=()=>{I=!1,C=!0,Ye(),K=null,o.livePreviewReady=!0};g.addEventListener("load",Z,{once:!0}),t.setTimeout(()=>{C||I===!1||g.contentDocument&&Z()},8e3)}function $t(Q){if(d)return d;h=Q,d=e.createElement("div"),d.className="sve-live-pane",d.id="sve77-live-pane",d.hidden=!0;let Z=e.createElement("div");Z.className="sve-live-bar";let R=e.createElement("span");R.className="sve-live-label",R.textContent="Preview";let M=e.createElement("button");if(M.type="button",M.className="sve-live-close",M.setAttribute("aria-label","Tutup preview"),M.title="Tutup preview",M.textContent="\xD7",M.addEventListener("click",()=>{Ht(),ne?.()}),Z.append(R,M),y=e.createElement("div"),y.className="sve-live-stage",b=e.createElement("p"),b.className="sve-live-status",y.append(b),d.append(Z,y),Q.append(d),t.addEventListener("resize",Ye),typeof t.ResizeObserver=="function"){E=new t.ResizeObserver(()=>$e());let le=e.querySelector(oh)?.parentElement;le&&E.observe(le)}return d}function Pt(){return d?(d.hidden=!1,$e(),h?.classList.add("sve-live-on"),Ve(),Ye(),!0):!1}function Ht(){d&&(d.hidden=!0,h?.classList.remove("sve-live-on"))}function mi(){return!!d&&!d.hidden}return{mount:$t,show:Pt,hide:Ht,isVisible:mi,isReady(){return C},onClose(Q){ne=Q},ensure(){!d||d.hidden||Ve()},refresh(Q){return!d||d.hidden?Promise.resolve(!1):C?ht(Q):(Ve(),Promise.resolve(!1))},scale(){return v},place(){$e()},teardown(){t.removeEventListener("resize",Ye),E?.disconnect(),E=null,d?.remove(),d=null,g=null,C=!1,I=!1,se=!1,u.clear()}}}(function(){"use strict";let e="sve77",t="0.34.5",n=typeof window<"u"&&!!window.__SVE77_DEBUG_SHADOW__,o=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),h="https://nikahin.myscalev.com/home#paket",d="6282175274118",g="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",y="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",b=y;function v(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!v()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let w=(r,a=document)=>a.querySelector(r),E=(r,a=document)=>Array.from(a.querySelectorAll(r));function I(r){return document.getElementById(e+"-shadow-host")?.shadowRoot?.querySelector(r)||null}function W(r){let a=document.getElementById(e+"-shadow-host");return Array.from(a?.shadowRoot?.querySelectorAll(r)||[])}let u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let K=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-background-primary","#332a24"],["Button Primary","Text","--sve-button-text-primary","#ffffff"],["Button Secondary","Background","--sve-button-background-secondary","#ffffff"],["Button Secondary","Text","--sve-button-text-secondary","#332a24"]],se=Array.from({length:31},(r,a)=>12+a*2+"px"),ne=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],he=["100","200","300","400","500","600","700","800","900"],ht=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],$e=ht.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),Ye=[{target:"heading",variable:"--sve-font-heading"},{target:"body",variable:"--sve-font-body"}],Ve=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],$t=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),Pt=new Set(["__proto__","prototype","constructor"]),Ht=12,mi=240,Q=1e4;function Z(r){let a=String(r||"").trim();if(!a||a.length>mi||a.includes("..")||a.startsWith(".")||a.endsWith("."))return null;let s=a.split(".");if(!s.length||s.length>Ht)return null;for(let l of s){if(!l||Pt.has(l))return null;if(/^\d+$/.test(l)){let c=Number(l);if(!Number.isSafeInteger(c)||c<0||c>Q)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(l))return null}return s}let R=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,M=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,le=4096;function ce(r){return R.lastIndex=0,R.test(String(r||""))}function pl(r){let a=[];return Object.entries(r||{}).forEach(([s,l])=>{let c=String(l||"");if(!c)return;R.lastIndex=0;let p=0,f=0,x;for(;x=R.exec(c);){p+=1;let S=x.index+x[0].length,k=S;for(;k<c.length&&/[A-Za-z0-9+/=]/.test(c[k]);)k+=1;f+=k-S}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(f*.75/1024))})}),a}function ch(r){let a=[];return Object.entries(r||{}).forEach(([s,l])=>{let c=String(l||"");if(!c)return;M.lastIndex=0;let p=0,f=0,x;for(;x=M.exec(c);){let S=x[0].length;S<=le||ce(x[0])||(p+=1,f=Math.max(f,S))}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(f/1024))})}),a}function hl(r){return r.map(a=>a.where+" ("+a.count+"x, \xB1"+a.approxKb+" KB)").join(", ")}let rn=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],uh={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},dl=["auto","cover","contain"];function ph(r){return r==="fill"?"cover":r==="fit"?"contain":dl.includes(r)?r:"auto"}function fl(r=""){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="${T(r)}"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `}function ml(r){return`
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
    `}function hh(){return`
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
    `}function T(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function gi(r,a=180){let s;return(...l)=>{clearTimeout(s),s=setTimeout(()=>r(...l),a)}}function zt(r,a=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:a}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function gl(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function rt(r){return!!(r&&r.isConnected)}function dh(r){if(!r)return null;try{if(typeof r.getWrapperElement=="function"){let a=r.getWrapperElement();if(a)return a}if(typeof r.getTextArea=="function"){let a=r.getTextArea();if(a)return a.closest?.(".CodeMirror")||a}}catch{}return null}function bl(r){let a=dh(r);return a?rt(a):!0}function Wt(){let r=u.nativeCache;Object.keys(r).forEach(a=>{r[a]&&!rt(r[a])&&(r[a]=null)})}function St(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Gt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,a=>a.toUpperCase()).trim()}function Bx(){}function U(r,a){if(r==null||!a)return;let s=Z(a);if(!s)return;let l=r;for(let c of s){if(l==null)return;let p=/^\d+$/.test(c)?Number(c):c;if(!Object.prototype.hasOwnProperty.call(l,p))return;l=l[p]}return l}function Qe(r,a,s){let l=Z(a);if(!r||!l)return!1;let c=r;for(let x=0;x<l.length-1;x++){let S=l[x],k=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(c,k)||c[k]===null||c[k]===void 0)&&(c[k]=/^\d+$/.test(l[x+1])?[]:Object.create(null)),typeof c[k]!="object")return!1;c=c[k]}let p=l.at(-1),f=/^\d+$/.test(p)?Number(p):p;return c[f]=s,!0}function Nt(r){let a=String(r||"").trim();if(!a)return"";try{/^https?:\/\//i.test(a)&&(a=new URL(a).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{a=decodeURIComponent(a)}catch{}return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function nn(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let l=0;l<5&&s;l+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function fh(){let r=E('input[type="text"], input:not([type])').filter(a=>nn(a));return r.length?r.find(a=>String(a.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function mh(){let r=E("a[href]").filter(a=>!a.closest("#"+e));for(let a of r){let s=a,l="";for(let c=0;c<4&&s;c+=1)l+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(l))try{let c=new URL(a.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(c.hostname)&&!/scalev\.(?:com|id)$/i.test(c.hostname))continue;let p=c.pathname.split("/").filter(Boolean),f=Nt(p.at(-1)||"");if(f)return f}catch{}}return""}function Rt(){let r=fh(),a=Nt(r?.value);if(a)return u.scalevSlug=a,a;let s=mh();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function an(r,a){let s=String(a||r?.path||"").trim().toLowerCase(),l=String(r?.label||"").trim().toLowerCase(),c=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&c.endsWith("weddingid")||/wedding\s*id/.test(l)}function gh(){let r=new Set;try{Ee().forEach(a=>{(a.fields||[]).forEach(s=>{s.type!=="repeater"&&an(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&U(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&U(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function sn(r){E('[data-auto-wedding-id="1"]').forEach(a=>{a.value!==r&&(a.value=r),a.setAttribute("readonly","")})}function bi(r,a={}){let s=Nt(r||Rt());if(!s)return!1;u.scalevSlug=s;let l=gh();if(!u.config||!l.length)return u.pendingWeddingIdSlug=s,sn(s),!1;let c=!1;if(l.forEach(f=>{U(u.config,f)!==s&&(Qe(u.config,f,s),c=!0)}),sn(s),!c)return u.pendingWeddingIdSlug="",!1;let p=cn().length>0;return a.commit!==!1&&p&&u.configRange?.editor?(u.pendingWeddingIdSlug="",Ne(a.silent?void 0:"Wedding ID mengikuti Slug URL"),sn(s),!0):(u.pendingWeddingIdSlug=s,!0)}function xl(){let r=Nt(u.pendingWeddingIdSlug||u.scalevSlug||Rt());return r?bi(r,{commit:!0,silent:!0}):!1}let bh=gi(()=>{let r=Rt();r&&bi(r,{commit:!0})},450);function Ki(){if(Wt(),rt(u.nativeCache.save)||rt(u.nativeCache.publish))return{save:rt(u.nativeCache.save)?u.nativeCache.save:null,publish:rt(u.nativeCache.publish)?u.nativeCache.publish:null};let r=E("button").filter(c=>!c.closest("#"+e)),a=c=>(c.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(c=>{let p=a(c);return p==="simpan"||p==="save"})||null,l=r.find(c=>{let p=a(c);return p.includes("simpan & terbitkan")||p.includes("simpan dan terbitkan")||p==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=l,{save:s,publish:l}}function xh(r,a){if(!r)return a?.parentElement||null;if(!a)return r?.parentElement||null;let s=new Set,l=r;for(;l;)s.add(l),l=l.parentElement;for(l=a;l;){if(s.has(l))return l;l=l.parentElement}return null}function yl(r,a){if(Wt(),rt(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&a&&r.parentElement===a.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=xh(r,a);if(!s)return r?.parentElement||a?.parentElement||null;let l=s;for(let c=0;c<4&&l;c++,l=l.parentElement){let p=l.getBoundingClientRect?.();if(p&&p.top>=0&&p.top<180&&p.height<110)return u.nativeCache.toolbarHost=l,l}return u.nativeCache.toolbarHost=s,s}function on(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let a=!!u.open;r.style.setProperty("display",a?"none":"",a?"important":""),r.setAttribute("aria-hidden",a?"true":"false"),r.tabIndex=a?-1:0}function vl(){let{save:r,publish:a}=Ki(),s=a||r;if(!s)return!1;let l=yl(r,a);if(!l)return!1;l.setAttribute("data-sve77-toolbar-host","1"),l.style.columnGap="8px",l.style.rowGap="8px";let c=document.getElementById(e+"-toolbar-toggle");return c||(c=s.cloneNode(!1),c.id=e+"-toolbar-toggle",c.type="button",c.disabled=!1,c.removeAttribute("disabled"),c.setAttribute("aria-controls",e+"-dock"),c.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),c.setAttribute("aria-pressed","false"),c.textContent="Visual Editor",c.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),u.open?Ah():qt(!0)})),c.parentElement!==l&&(a&&a.parentElement===l?a.insertAdjacentElement("afterend",c):r&&r.parentElement===l?r.insertAdjacentElement("afterend",c):l.appendChild(c)),c.classList.toggle("sve-toolbar-active",u.open),c.setAttribute("aria-pressed",u.open?"true":"false"),on(),u.open&&requestAnimationFrame(()=>wl(!0)),!0}function ln(){let a=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return a||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function yh(){if(Wt(),rt(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=E("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let l=getComputedStyle(s),c=s.getBoundingClientRect(),p=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return l.position==="fixed"&&c.top>=-2&&c.top<=4&&c.height>=36&&c.height<=64&&c.width>=window.innerWidth*.7&&p.includes("landing page studio")});if(!r.length)return null;let a=r.sort((s,l)=>{let c=s.getBoundingClientRect(),p=l.getBoundingClientRect();return c.height-p.height||c.top-p.top})[0];return u.nativeCache.globalHeader=a||null,a||null}function Yi(){let r=yh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function vh(){if(Wt(),rt(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:a}=Ki(),s=a||r;if(!s)return ln();let l=s,c=null;for(;l&&l!==document.body;){if(l instanceof HTMLElement){let f=l.getBoundingClientRect();f.top>=36&&f.top<=130&&f.width>=window.innerWidth*.68&&f.height>=window.innerHeight*.62&&(c=l)}l=l.parentElement}let p=c||ln();return u.nativeCache.workspaceRoot=p||null,p}function kh(){let a=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return a>0?a:Math.min(400,window.innerWidth*.32)}function kl(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function Qi(r){let a=document.querySelector('[data-sve77-page-root="1"]'),s=vh();if(a&&a!==s&&kl(a),s)if(r){let l=getComputedStyle(s),c=(l.position==="fixed"||l.position==="absolute")&&l.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",c?"positioned":"flow")}else kl(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>wl(r))}function Sh(){if(Wt(),rt(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:a}=Ki(),s=a||r;if(!s)return null;let l=s,c=null;for(;l&&l!==document.body;){if(l instanceof HTMLElement){let p=getComputedStyle(l),f=l.getBoundingClientRect();if(p.position==="fixed"&&f.top>=36&&f.top<=70&&f.height>=48&&f.height<=92&&f.width>=Math.min(520,window.innerWidth*.42)){c=l;break}}l=l.parentElement}return u.nativeCache.topToolbar=c||null,c}function Sl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function wl(r){let{save:a,publish:s}=Ki(),l=document.querySelector('[data-sve77-toolbar-host="1"]')||yl(a,s);l&&(l.setAttribute("data-sve77-toolbar-host","1"),l.style.columnGap="8px",l.style.rowGap="8px",l.style.removeProperty("transform"),l.style.removeProperty("transition"));let c=document.querySelector('[data-sve77-top-toolbar="1"]'),p=Sh();if(c&&c!==p&&Sl(c),!p)return;if(!r){Sl(p);return}let f=Math.ceil(kh());p.setAttribute("data-sve77-top-toolbar","1"),p.style.setProperty("right",f+"px","important"),p.style.setProperty("box-sizing","border-box","important"),p.style.setProperty("transition","right .16s ease","important")}function Cl(){zt(()=>{if(u.open)try{let r=Rt();r&&bi(r,{commit:!0,silent:!0}),xl()}catch{}},1200)}function El(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=Pe())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{me()}catch{}Cl()}function wh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{Yi(),Qi(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),El(),performance.mark("sve-panel-paint-end"),Eh()}})})}function Ch(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){El();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&Pe(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&me()}catch{}performance.mark("sve-prewarm-end"),Cl()}function Eh(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(a=>String(a.name).startsWith("sve-")).map(a=>({name:a.name,startTime:Math.round(a.startTime*100)/100}))}catch{}}function Zi(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=zt(Ch,1200))}function qt(r){if(!r&&!Ae())return;u.open=!!r;let a=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(a?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),on(),u.open){u.prewarmScheduled&&(gl(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),wh();return}requestAnimationFrame(()=>{try{Qi(!1)}catch{}}),Zi()}function Ah(){qt(!1)}function cn(){return[...new Set(E(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Ji(){let r=cn();if(u.allEditors=r,!r.length)return!1;let a={html:null,css:null,js:null,head:null},s=new Set,l=(k,A,_)=>{!A||a[k]||s.has(A)||_(A.getValue?.()||"")&&(a[k]=A,s.add(A))},c=k=>/<!doctype html|<html[\s>]/i.test(k),p=k=>k.includes("--sve-background-primary")||k.includes("--sve-font-heading")||/^\s*[.#:@*\[a-z][^\n]*\{[^}]*\}/m.test(k),f=k=>k.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(k)||/^\s*(?:\(|!|;)?\s*(?:function\b|class\b|import\b|export\b|"use strict"|'use strict')/m.test(k),x=k=>/<meta[\s>]|<link[\s>]|<script[\s>]/i.test(k)&&!c(k);E("label").forEach(k=>{let A=k.querySelector(".CodeMirror")?.CodeMirror;if(!A)return;let L=[...k.querySelectorAll(":scope > span")].map(j=>j.textContent.replace(/\s+/g," ").trim().toLowerCase()).filter(Boolean).pop()||""||(k.querySelector(":scope > span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();L==="body html"?l("html",A,c):L==="css"?l("css",A,p):L==="javascript"?l("js",A,f):L.includes("additional head")?l("head",A,x):L.includes("html document")&&l("html",A,c)}),r.forEach(k=>{l("html",k,c),l("css",k,p),l("js",k,f),l("head",k,x)});let S=r.filter(k=>!s.has(k));if(a.html||(a.html=S.shift()||null),a.css||(a.css=S.shift()||null),!a.js){let k=S.find(A=>!c(A.getValue?.()||""));k&&(a.js=k,S.splice(S.indexOf(k),1))}return a.head||(a.head=S.shift()||null),u.editors=a,Jh(),!0}function H(r){return u.editors[r]?.getValue?.()||""}function Xi(r,a=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(s){s.dispatchEvent(new Event("input",{bubbles:!0})),a&&s.dispatchEvent(new Event("change",{bubbles:!0}));return}let l=r._handlers?.change;if(!Array.isArray(l))return;let c={from:{line:0,ch:0},to:{line:0,ch:0},text:[],removed:[],origin:"sve-wake"};l.forEach(p=>{if(!(typeof p!="function"||p.__sve))try{p(r,c)}catch{}})}catch{}}function Th(r,a,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(a),r.save?.()}),Xi(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}nr(),Fl()}}function dt(r,a){Th(u.editors[r],a)}function _h(){return new URL(o.endpoint)}function Lh(r,a=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!a&&s.origin!==_h().origin?"":s.href}catch{return""}}function Ih(r){if(!r||typeof r!="object")return null;let a=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(a)||!s?null:{id:a,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:Lh(r.source_url||r.sourceUrl)}}function $h(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(Ih).filter(Boolean)}async function Ph(r,a={}){let s=new AbortController,l=window.setTimeout(()=>s.abort(),o.timeoutMs);try{return await fetch(r,{...a,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(l)}}function Nh(r,a={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=a.method||"GET";return new Promise((l,c)=>{GM_xmlhttpRequest({method:s,url:r,data:a.body,headers:a.headers||{},timeout:o.timeoutMs,onload:p=>{let f=Number(p.status),x=Number.isInteger(f)&&f>=200&&f<=599?f:200,S=String(p.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),k=String(p.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";l(new Response(p.responseText||"",{status:x,statusText:S,headers:{"Content-Type":k}}))},ontimeout:()=>c(new DOMException("The operation timed out","AbortError")),onerror:()=>c(new TypeError("Userscript request failed"))})})}async function un(r,a={}){if(typeof GM_xmlhttpRequest=="function")try{return await Nh(r,a)}catch{}return await Ph(r,a)}async function Al(r=!1){let a=u.templateLibrary;if(!r&&a.status==="ready"&&a.loadedAt&&Date.now()-a.loadedAt<3e5)return a.templates;a.status="loading",a.error="";try{let s=await un(o.endpoint,{headers:{Accept:"application/json"}}),l=await s.json().catch(()=>null);if(!s.ok)throw new Error(l?.error||"HTTP "+s.status);let c=$h(l);if(!c.length)throw new Error("Library belum memiliki template aktif");return a.templates=c,a.loadedAt=Date.now(),a.status="ready",c}catch(s){return a.templates=[],a.status="error",a.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),a.templates}}function Rh(){return E('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let a=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="kode"||a==="code"||a.includes("kode html")})||null}async function Mh(){if(Ji()&&u.editors.html)return!0;Rh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(a=>window.setTimeout(a,120)),Ji()&&u.editors.html)return!0;return!1}function Oh(r){return nh(r,a=>new DOMParser().parseFromString(a,"text/html"))}function jx(r,a){let s=String(a||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!l)return null;let c=Tl(r,r.indexOf("{",l.index));if(!c)return null;try{return _l(c.text)}catch{return null}}function Fh(){let r=E('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let l=String(s.getAttribute("accept")||"").toLowerCase();return!(!l.includes("html")&&!l.includes("text/html"))});return r.filter(s=>{let l=s,c="";for(let p=0;p<5&&l;p+=1,l=l.parentElement)c+=" "+String(l.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(c)})[0]||r[0]||null}function Dh(r){let a=Fh();if(!a)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),a.files=s.files,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}))}function Kt(r){let a=["style","audio","compatibility"],s=r||"content",l=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let c=document.getElementById(e);if(E(".tab",c).forEach(p=>{p.classList.toggle("active",p.dataset.tab===r)}),l){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}me()}async function Vh(r,a,s){if(!Ae())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let l=u.templateLibrary,c=Oh(await r.text());if(c.blockers.length)throw console.error("[SVE] Template library validation failed",c.blockers),new Error(c.blockers[0]);if(!await Mh())throw new Error("Buka tab Kode terlebih dahulu");let p={html:H("html"),css:H("css"),js:H("js"),head:H("head")};Dh(r);let f=Date.now(),x=!1;for(;Date.now()-f<4500;){await new Promise(A=>window.setTimeout(A,140)),Ji();let S=H("html"),k=H("js");if(S!==p.html||k!==p.js){x=!0;break}}if(!x)throw new Error("Scalev belum menyelesaikan import file");l.previousSource=p,l.importedId=a||"local-import",l.importedName=s||r.name||"Template lokal",Pe(),Be(),Kt("content")}async function Bh(r){let a=u.templateLibrary,s=a.templates.find(c=>c.id===r),l=c=>{a.previousSource=null,a.importedId="",a.importedName="",a.status="error",a.error=c,u.uiPrepared=!1,me()};if(!s){l("Template tidak ditemukan");return}if(!s.sourceUrl){l("Source template belum tersedia");return}a.status="loading",a.error="",u.uiPrepared=!1,me();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let c=await un(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",c.status),!c.ok)throw new Error("HTTP "+c.status);let p=await c.text();console.log("[SVE] Source length:",p.length);let f=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",x=new File([p],f,{type:"text/html"});await Vh(x,s.id,s.name),a.error="",a.status="ready",Kt("content")}catch(c){console.error("[SVE] Import gagal:",c),l("Import gagal: "+String(c?.message||"source tidak terbaca"))}}function Ux(){let r=u.templateLibrary.previousSource;r&&Ae()&&(dt("html",r.html),dt("css",r.css),dt("js",r.js),dt("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",Pe(),Be(),Kt("library"))}function jh(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(a=>{dt(a,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,Pe(),Be(),u.uiPrepared=!1,me()}function Tl(r,a){let s=0,l=null,c=!1,p=!1,f=!1;for(let x=a;x<r.length;x++){let S=r[x],k=r[x+1];if(p){S===`
`&&(p=!1);continue}if(f){S==="*"&&k==="/"&&(f=!1,x++);continue}if(l){if(c){c=!1;continue}if(S==="\\"){c=!0;continue}S===l&&(l=null);continue}if(S==="/"&&k==="/"){p=!0,x++;continue}if(S==="/"&&k==="*"){f=!0,x++;continue}if(S==='"'||S==="'"||S==="`"){l=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:a,end:x+1,text:r.slice(a,x+1)}}return null}function _l(r){let a=0,s=_=>{throw new Error(_+" @"+a)};function l(){for(;a<r.length;){let _=r[a],L=r[a+1];if(/\s/.test(_)){a++;continue}if(_==="/"&&L==="/"){for(a+=2;a<r.length&&r[a]!==`
`;)a++;continue}if(_==="/"&&L==="*"){for(a+=2;a<r.length&&!(r[a]==="*"&&r[a+1]==="/");)a++;a+=2;continue}break}}function c(){let _=r[a++],L="";for(;a<r.length;){let j=r[a++];if(j===_)return L;if(j!=="\\"){L+=j;continue}let ye=r[a++],wt={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};L+=Object.prototype.hasOwnProperty.call(wt,ye)?wt[ye]:ye}s("String belum ditutup")}function p(){l();let _=a;for(/[A-Za-z_$]/.test(r[a]||"")||s("Identifier invalid"),a++;a<r.length&&/[A-Za-z0-9_$]/.test(r[a]);)a++;return r.slice(_,a)}function f(){let _=r.slice(a).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return _||s("Number invalid"),a+=_[0].length,Number(_[0])}function x(){let _=[];if(a++,l(),r[a]==="]")return a++,_;for(;a<r.length;)if(_.push(k()),l(),r[a]==="]"||(r[a]!==","&&s("Koma array hilang"),a++,l(),r[a]==="]"))return a++,_;s("Array belum selesai")}function S(){let _=Object.create(null);if(a++,l(),r[a]==="}")return a++,_;for(;a<r.length;){l();let L=['"',"'","`"].includes(r[a])?c():p();if(l(),Pt.has(L)&&s("Object key terlarang: "+L),Object.prototype.hasOwnProperty.call(_,L)&&s("Duplicate object key: "+L),r[a]!==":"&&s("Titik dua hilang"),a++,_[L]=k(),l(),r[a]==="}"||(r[a]!==","&&s("Koma object hilang"),a++,l(),r[a]==="}"))return a++,_}s("Object belum selesai")}function k(){l();let _=r[a];if(_==="{")return S();if(_==="[")return x();if(['"',"'","`"].includes(_))return c();if(_==="-"||/\d/.test(_||""))return f();let L=p();if(L==="true")return!0;if(L==="false")return!1;if(L==="null")return null;L==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+L)}let A=k();return l(),A}function pn(r){let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+a+"|(?:window|globalThis)\\."+a+")\\s*=\\s*\\{"),l=[];function c(p,f){!p||l.some(x=>x.editor===p)||l.push({editor:p,kind:f})}c(u.editors.js,"js"),c(u.editors.html,"html"),c(u.editors.head,"head"),u.allEditors.forEach(p=>c(p,"unknown"));for(let p of l){let f=p.editor.getValue?.()||"",x=s.exec(f);if(!x)continue;let S=f.indexOf("{",x.index),k=Tl(f,S);if(k)try{return{kind:p.kind,editor:p.editor,obj:_l(k.text),start:k.start,end:k.end}}catch(A){console.error("[SVE] parse "+r+" gagal",A)}}return null}function Uh(){if(!u.doc)return null;let r=[];return E("[data-sve-section]",u.doc).forEach((a,s)=>{let l=[],c=new Set;E("[data-sve-field]",a).forEach(f=>{let x=f.getAttribute("data-sve-field");!x||c.has(x)||(c.add(x),l.push({type:f.getAttribute("data-sve-type")||"text",label:f.getAttribute("data-sve-label")||Gt(x),path:x}))});let p=a.getAttribute("data-sve-countdown-path");p&&!c.has(p)&&l.push({type:"datetime",label:"Waktu Tujuan",path:p}),r.push({id:a.id||"section-"+s,label:a.getAttribute("data-sve-section")||Gt(a.id)||"Section "+(s+1),visiblePath:a.getAttribute("data-sve-visible-path")||null,canHide:!!a.getAttribute("data-sve-visible-path"),reorderable:(a.getAttribute("data-section-id")||a.id||"")!=="cover",locked:!1,fields:l})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function er(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=Uh(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function Ee(){let r=er();return Array.isArray(r?.sections)?r.sections:[]}function te(r){return String(r?.id||"").trim()}function Yt(r){let a=te(r);return!(!a||a==="cover"||r?.locked===!0||r?.reorderable===!1)}function tr(){let a=Ee().map(te).filter(Boolean);if(!a.length)return[];let s=new Set(a),l=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(p=>String(p||"").trim()).filter(p=>p&&s.has(p)):[],c=[];return s.has("cover")&&c.push("cover"),l.forEach(p=>{p!=="cover"&&!c.includes(p)&&c.push(p)}),a.forEach(p=>{c.includes(p)||c.push(p)}),c}function xi(){let r=Ee(),a=new Map(r.map(s=>[te(s),s]));return tr().map(s=>a.get(s)).filter(Boolean)}function ir(r,a){let s=String(r||"").trim(),l=Ee().find(x=>te(x)===s);if(!l||!Yt(l))return!1;let c=tr(),p=c.indexOf(s);if(p<0)return!1;let f=p+a;for(;f>=0&&f<c.length;){let x=c[f],S=Ee().find(k=>te(k)===x);if(x!=="cover"&&!S?.locked)return!0;f+=a}return!1}function Ll(r){if(!u.config)return!1;let a=Ee(),s=new Set(a.map(te).filter(Boolean)),l=[];return s.has("cover")&&l.push("cover"),(Array.isArray(r)?r:[]).map(c=>String(c||"").trim()).filter(c=>c&&s.has(c)&&c!=="cover").forEach(c=>{l.includes(c)||l.push(c)}),a.map(te).filter(Boolean).forEach(c=>{l.includes(c)||l.push(c)}),u.config.sectionOrder=l,!0}function Hh(r=document){E("[data-section-card]",r).forEach(a=>{let s=a.dataset.sectionCard,l=w("[data-section-up]",a),c=w("[data-section-down]",a);l&&(l.disabled=!ir(s,-1)),c&&(c.disabled=!ir(s,1))})}function zh(r,a){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",a==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function Il(r,a,s){let l=_i();if(!l)return;let c=w(".reset-zone",l),p=new Map(E("[data-section-card]",l).map(f=>[f.dataset.sectionCard,f]));r.forEach(f=>{let x=p.get(f);x&&(c?l.insertBefore(x,c):l.appendChild(x))}),Hh(l),zh(p.get(a),s)}function $l(r,a){let s=String(r||"").trim(),l=Ee().find(S=>te(S)===s);if(!l||!Yt(l))return;let c=tr(),p=c.indexOf(s);if(p<0)return;let f=p+a;for(;f>=0&&f<c.length;){let S=c[f],k=Ee().find(A=>te(A)===S);if(S!=="cover"&&!k?.locked)break;f+=a}if(f<0||f>=c.length||c[f]==="cover")return;let[x]=c.splice(p,1);c.splice(f,0,x),Ll(c),Ne("Urutan section diperbarui"),Il(c,s,a<0?"up":"down")}function Wh(r,a,s){let l=String(r||"").trim(),c=String(a||"").trim();if(!l||!c||l===c)return;let p=Ee(),f=p.find(ye=>te(ye)===l),x=p.find(ye=>te(ye)===c);if(!f||!x||!Yt(f))return;let S=s==="after"?"after":"before";if(c==="cover")S="after";else if(!Yt(x))return;let k=tr(),A=k.indexOf(l);if(A<0)return;k.splice(A,1);let _=k.indexOf(c);if(_<0)return;let L=_+(S==="after"?1:0);k[0]==="cover"&&(L=Math.max(1,L)),L=Math.min(k.length,L),k.splice(L,0,l);let j=k.indexOf(l);Ll(k),Ne("Urutan section diperbarui"),Il(k,l,j<A?"up":"down")}function Pl(){let r=er();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function Pe(){if(u.contentStateDirty&&!Ae())return!1;if(u.lastSerializedConfig="",!Ji())return u.sourceDirty=!0,!1;zt(()=>{try{Ld()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(H("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let a=pn("CONFIG");u.config=a?.obj||null,u.configRange=a||null,u.configSourceText=a?a.editor.getValue().slice(a.start,a.end):"",u.configOwnerSource=a?a.editor.getValue():"";let s=pn("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(gl(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Yh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function Ne(r){return yi(r,{deferPreview:!0,syncImages:!0})?(Pe(),!0):!1}function rr(r){return yi(r,{deferPreview:!0,syncImages:!0})}function Gh(r,a){let s=r._handlers?.change;if(!Array.isArray(s))return a();let l=[];s.forEach((c,p)=>{c?.__sve||(l.push([p,c]),s[p]=()=>{})});try{return a()}finally{l.forEach(([c,p])=>{Array.isArray(s)&&(s[c]=p)})}}function yi(r,a={}){if(!u.config||!u.configRange?.editor)return!1;let s=cf(u.config);if(s.length)return vi(s[0]),!1;let c=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:pn("CONFIG");if(!c||c.editor!==u.configRange.editor)return vi("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let p=c.editor;if(!bl(p)){let _=u.config,L=Pe(),j=u.configRange?.editor;return!L||!bl(j)?(vi("Editor Scalev sudah dimuat ulang. Muat ulang panel (tombol Muat ulang source) lalu ulangi perubahan."),!1):(u.config=_,yi(r,a))}let f=p.getValue();if(f.slice(c.start,c.end)!==u.configSourceText)return vi("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let x=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(x===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null,k=a.wakeScalev!==!0&&nt.supported()===!0;try{u.internalEditorWrite+=1;let _=()=>p.operation(()=>{if(typeof p.replaceRange=="function"&&typeof p.posFromIndex=="function")p.replaceRange(x,p.posFromIndex(c.start),p.posFromIndex(c.end));else{let L=p.getValue?.()||"",j=L.slice(0,c.start)+x+L.slice(c.end);p.setValue(j)}p.save?.()});k?Gh(p,_):_(),(a.wakeScalev||!k)&&Xi(p,!1)}catch(_){S=_}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{p.getValue()!==f&&p.setValue(f),Xi(p,!1)}catch{}finally{u.internalEditorWrite-=1}return vi("Perubahan belum tersimpan: "+S.message),!1}c.end=c.start+x.length,c.obj=u.config,u.configRange=c,u.configSourceText=x,u.configOwnerSource=p.getValue();let A=nt.fromScalevSource(p.getValue());return u.lastSerializedConfig=x,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),nr(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Qh(),A&&!a.syncImages?u.performance.previewViaScalevCount=(u.performance.previewViaScalevCount||0)+1:a.deferPreview?cd({syncImages:!!a.syncImages}):Be({syncImages:!!a.syncImages}),!0}function vi(r){u.commitError=r,u.contentStateDirty=!0;let a=document.getElementById(e+"-commit-notice");a&&(a.hidden=!1,a.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function nr(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,H(r)]))}function Nl(){return e+":fresh-default:"+location.origin+location.pathname}function hn(){let r=H("js"),a=u.configRange,s=a&&a.editor&&typeof a.start=="number"&&typeof a.end=="number"&&a.start<=a.end?r.slice(0,a.start)+"\u241F"+r.slice(a.end):r,l=["html",H("html"),"css",H("css"),"js",s,"head",H("head")].join("\u241E"),c=2166136261;for(let p=0;p<l.length;p++)c^=l.charCodeAt(p),c=Math.imul(c,16777619);return(c>>>0).toString(16).padStart(8,"0")}function qh(){let r={};return K.forEach(([,,a])=>{let s=Se(a);s&&(r[a]=s)}),$e.forEach(a=>{r[a.variable]=Se(a.variable)||a.fallback}),Ye.forEach(({variable:a})=>{let s=Se(a);s&&(r[a]=s)}),{version:t,config:u.config?St(u.config):null,cssTokens:r,googleFonts:St(U(u.config,"editorStyle.googleFonts")||{})}}function Rl(){try{let r=JSON.parse(localStorage.getItem(Nl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function Ml(r){try{localStorage.setItem(Nl(),JSON.stringify(r))}catch{}}function Ol(){if(!u.config)return!1;let r=hn(),a=qh();return u.defaults=a,u.defaultConfig=St(a.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,nr(),Ml({version:t,defaults:a,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Kh(r){let a=r?.cssTokens;return!a||typeof a!="object"?!1:Ye.every(({variable:s})=>typeof a[s]=="string"&&a[s].trim()!=="")}function Yh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,l])=>H(s)===l))return;let r=hn(),a=Rl();if(a?.defaults&&a.lastManagedFingerprint===r&&Kh(a.defaults)){u.defaults=a.defaults,u.defaultConfig=St(a.defaults.config||u.config),u.baselineFingerprint=a.baselineFingerprint||r,u.lastManagedFingerprint=r,nr();return}Ol()}function Fl(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,l])=>H(s)===l))return;let r=hn(),a=Rl()||{};u.lastManagedFingerprint=r,Ml({version:t,defaults:a.defaults||u.defaults,baselineFingerprint:a.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Qh=gi(Fl,700);function Zh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{Pe(),Ol(),u.open?me():Zi()}catch{}},420)}function Jh(){u.allEditors.forEach(r=>{if(!r||u.editorChangeBound.has(r)||typeof r.on!="function")return;u.editorChangeBound.add(r);let a=()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Zh())};a.__sve=!0,r.on("change",a)})}function Hx(r){u.defaultConfig&&(Qe(u.config,r,St(U(u.defaultConfig,r))),Ne("Berhasil direset"),me())}let Xh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",ed="https://nikahin.myscalev.com/dashboard",dn="nikahin_team_key";function td(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(dn,"")||"").trim()}catch{return""}}function id(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(dn,String(r||"").trim()),!0)}catch{return!1}}function rd(){try{return typeof GM_setValue!="function"?!1:(GM_setValue(dn,""),!0)}catch{return!1}}let nd={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function fn(){return Nt(u.scalevSlug||Rt())||""}async function mn(r){let a=u.dashboardPin;if(a.busy)return;let s=fn();if(!s){a.status="error",a.message="Slug URL belum diisi di Pengaturan Scalev.",ft();return}let l=td();if(!l){a.status="needkey",a.message="",ft();return}if(!(r==="generate"&&a.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){a.busy=!0,a.status="loading",a.message="",ft();try{let p=await(await un(Xh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":l},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!p||p.ok!==!0?(a.status="error",a.pin="",a.message=nd[p&&p.error]||"Gagal mengambil PIN."):(a.status="ready",a.slug=s,a.pin=String(p.pin||""),a.version=Number(p.version)||0,a.message=p.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{a.status="error",a.pin="",a.message="Tidak bisa menghubungi server."}a.busy=!1,ft()}}function ad(){let r=I("#"+e+"-team-key"),a=r?r.value.trim():"",s=u.dashboardPin;if(!a){s.message="Kunci tim belum diisi.",ft();return}if(!id(a)){s.message="Tampermonkey menolak menyimpan kunci.",ft();return}s.status="idle",s.message="",mn("peek")}function sd(){let r=u.dashboardPin;if(!rd()){r.message="Tampermonkey menolak menghapus kunci.",ft();return}r.status="needkey",r.pin="",r.version=0,r.message="",ft()}async function od(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}ft()}}function ft(){let r=(I(":focus")||document.activeElement)?.id,a=I("#"+e+"-pin-panel");a&&(a.innerHTML=Dl());let s=I("#"+e+"-pin-pill");s&&(s.outerHTML=Ql()),r?.startsWith(e+"-pin-")&&I("#"+r)?.focus({preventScroll:!0})}function Dl(){let r=u.dashboardPin,a=fn(),s=f=>f?`<small class="pin-note">${f}</small>`:"";if(!a)return`
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
      `;let l=r.status==="ready"&&r.pin&&r.slug===a,c=r.busy||r.status==="loading",p=l?`
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
            value="${T(l?r.pin:"")}"
            placeholder="${r.status==="loading"?"Mengambil PIN\u2026":"Belum diambil"}"
            readonly
            aria-readonly="true"
            aria-label="PIN"
            autocomplete="off"
            spellcheck="false"
          >
          ${l?`
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
          ${p}
          <button
            type="button"
            class="pin-ctl-link"
            id="${e}-pin-changekey"
          >
            Kunci
          </button>
          <a
            class="pin-ctl-link"
            href="${ed}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function ld(){let r=u.defaults?.config;if(!r||!u.config)return 0;let a=0,s=(l,c,p)=>{if(!(p>6)){if(Array.isArray(l)||Array.isArray(c)){let f=Array.isArray(l)?l:[],x=Array.isArray(c)?c:[],S=Math.max(f.length,x.length);for(let k=0;k<S;k+=1)s(f[k],x[k],p+1);return}if(l&&c&&typeof l=="object"&&typeof c=="object"){for(let f of new Set([...Object.keys(l),...Object.keys(c)]))s(l[f],c[f],p+1);return}l!==c&&(a+=1)}};return s(u.config,r,0),a}function Vl(){u.defaults&&(u.defaults.config&&(u.config=St(u.defaults.config),Ne()),Object.entries(u.defaults.cssTokens||{}).forEach(([r,a])=>{a&&je(r,a)}),sc(),Ne(),pr(),Pe(),me(),Be())}function cd({syncImages:r=!1}={}){Be({syncImages:r})}let nt=sh({document,window,getConfig:()=>u.config,syncImages:Id,metrics:u.performance}),mt=lh({document,window,getConfig:()=>u.config,getDocument:()=>ud(),metrics:u.performance});function ud(){try{let r=nt.scalevTarget?.();return nt.readDocument?.(r)??null}catch{return null}}function Be({syncImages:r=!1,force:a=!1}={}){nt.request({images:r,force:a})}function pd(r){if(!r)return"";let a=new Date(r);if(Number.isNaN(a.getTime()))return"";let s=l=>String(l).padStart(2,"0");return a.getFullYear()+"-"+s(a.getMonth()+1)+"-"+s(a.getDate())+"T"+s(a.getHours())+":"+s(a.getMinutes())}function hd(r){if(!r)return"";let a=new Date(r),s=p=>String(p).padStart(2,"0"),l=-a.getTimezoneOffset(),c=l>=0?"+":"-";return r+":00"+c+s(Math.floor(Math.abs(l)/60))+":"+s(Math.abs(l)%60)}function Se(r,a){let s=a?[a]:[gn()],l=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(l+"\\s*:\\s*([^;{}]+);");for(let p of s){let f=c.exec(p||"");if(f)return f[1].trim()}return""}function ki(r,a){let s=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function gn(){let r=[],a=H("css");return a&&r.push(a),[H("html"),H("head")].forEach(s=>{let l=String(s||""),c=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,p;for(;p=c.exec(l);)p[1]&&r.push(p[1])}),r.join(`
`)}function dd(r){let a=String(r||"").trim(),s=a.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(s){let c=s[1];c.length===3&&(c=c.split("").map(f=>f+f).join(""));let p=parseInt(c,16);return[p>>16&255,p>>8&255,p&255].join(", ")}let l=a.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i);return l?[l[1],l[2],l[3]].join(", "):""}function Bl(r,a,s){let l=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp("("+l+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(c,"$1"+s+"$3")}function jl(r,a){let s=l=>{if(l)try{l.documentElement?.style?.setProperty(r,a),l.body?.style?.setProperty(r,a),l.querySelector("[data-sve-template]")?.style?.setProperty(r,a)}catch{}};E("iframe").forEach(l=>{try{s(l.contentDocument)}catch{}})}function je(r,a){let s=["css","head","html"],l=null;for(let S of s)if(ki(H(S),r)){l=S;break}if(!l)return!1;let c=H(l),p=Bl(c,r,a),f=r+"-rgb",x=dd(a);return x&&ki(c,f)&&(p=Bl(p,f,x)),p===c?!1:(dt(l,p),jl(r,a),x&&ki(c,f)&&jl(f,x),Be(),!0)}function ar(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function de(r){let a=String(r?.type||"text").trim().toLowerCase();return a==="datetime-local"?"datetime":a==="checkbox"?"boolean":a}function fd(r,a){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||an(r,a)}function Ul(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return St(r.default);let a=de(r);return a==="boolean"?!1:""}function md(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let l=s.value??s.id??s.key??"";return{value:String(l),label:String(s.label??s.name??l)}}return{value:String(s??""),label:String(s??"")}})}function gd(r){let a=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&a.push(`${s}="${T(r[s])}"`)}),r?.placeholder&&a.push(`placeholder="${T(r.placeholder)}"`),a.join(" ")}function bd(r){let a=String(r?.help||r?.description||"").trim();return a?`
        <small class="field-help">
          ${T(a)}
        </small>
      `:""}function xd(r,a){let s=U(u.config,a),l=de(r),c=an(r,a),p=fd(r,a),f=c?Rt()||s||"":s??"",x=`data-field-path="${T(a)}" data-field-type="${T(l)}" aria-label="${T(r?.label||a)}" `+(p?'data-field-readonly="1" ':""),S=gd(r);if(l==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${x}
          ${S}
          ${p?'readonly aria-readonly="true"':""}
        >${T(f)}</textarea>
        ${c?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(l==="select"){let A=md(r);return`
        <select
          class="content-control content-control-select"
          ${x}
          ${p?'disabled aria-disabled="true"':""}
        >
          ${r?.placeholder?`
                <option
                  value=""
                  ${String(f??"")===""?"selected":""}
                >
                  ${T(r.placeholder)}
                </option>
              `:""}

          ${A.map(_=>`
              <option
                value="${T(_.value)}"
                ${String(f??"")===_.value?"selected":""}
              >
                ${T(_.label)}
              </option>
            `).join("")}
        </select>
      `}if(l==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${x}
            ${f===!0?"checked":""}
            ${p?'disabled aria-disabled="true"':""}
          >

          <span>
            ${T(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(l==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${x}
          ${S}
          value="${T(pd(f))}"
          ${p?'readonly aria-readonly="true"':""}
        >
      `;if(l==="url")return`
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${x}
            ${S}
            value="${T(f)}"
            ${p?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let k=["email","tel","number","date","time","color"].includes(l)?l:"text";return`
      <input
        class="content-control content-control-${k}"
        type="${k}"
        ${x}
        ${S}
        ${c?'data-auto-wedding-id="1"':""}
        value="${T(f)}"
        ${p?'readonly aria-readonly="true"':""}
      >
      ${c?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Hl(r,a){let s=a||r.path,l=T(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${l}</span>`:`<label>${l}</label>`}

        ${xd(r,s)}

        ${bd(r)}
      </div>
    `}function Si(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let a=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(a))return!0;let l=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(l)}function zl(r){if(!r||typeof r!="object")return[];let a=u.repeaterContentFieldCache.get(r);if(a)return a;let s=(r?.fields||[]).filter(l=>de(l)!=="repeater"&&de(l)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function yd(r){if(Wl(r,U(u.config,r.path)))return Ul(r.fields[0]);let a={};return(r.fields||[]).forEach(s=>{s?.key&&(a[s.key]=Ul(s))}),a}function Wl(r,a){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(a)&&a.length?a:U(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(l=>typeof l=="string"||typeof l=="number")}function vd(r,a,s){let l=String(r?.itemLabelKey||"").trim(),p=[l?a?.[l]:"",a?.title,a?.name,a?.label,a?.event,a?.provider].find(f=>String(f??"").trim());return String(p??"").trim()||(r.label||"Item")+" "+(s+1)}function kd(r){return(r?.fields||[]).some(s=>de(s)==="repeater"||de(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function Sd(r,a=null){let s=U(u.config,r.path),l=Array.isArray(s)?s:[],c=Number.isFinite(r.max)?r.max:999;return kd(r)+l.map((p,f)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${T(vd(r,p,f))}
              </strong>

              ${r.canDelete!==!1&&l.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${T(r.path)}"
                      data-repeat-index="${f}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${zl(r).map(x=>{let S=Wl(r,l)?r.path+"."+f:r.path+"."+f+"."+x.key;if(Si(x)){let k=a?.get(S);return k?Sn(k):""}return Hl({...x,type:x.type||"text"},S)}).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&l.length<c?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${T(r.path)}"
            >
              + Tambah
              ${T(r.label||"Item")}
            </button>
          `:"")}function wi(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function wd(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function sr(r){if(!r||typeof r!="object")return[];let a=u.contentFieldCache.get(r);if(a)return a;let s=(r.fields||[]).filter(l=>!(l.type==="repeater"&&zl(l).length===0));return u.contentFieldCache.set(r,s),s}function Cd(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return xi().forEach(a=>{let s=te(a),l="";try{l=JSON.stringify(a).toLowerCase()}catch{l=[s,a?.label||"",...sr(a).flatMap(p=>[p?.label||"",p?.path||"",...(p?.fields||[]).flatMap(f=>[f?.label||"",f?.key||""])])].join(" ").toLowerCase()}r.set(s,l)}),u.contentSearchIndex=r,r}function or(r){r&&u.contentSectionHtmlCache.delete(String(r))}function lr(r){let a=te(r);if(!a)return Gl(r);if(u.contentSectionHtmlCache.has(a))return u.contentSectionHtmlCache.get(a);let s=Gl(r);return u.contentSectionHtmlCache.set(a,s),s}function Qt(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function bn(r){if(!r)return;let a=E("[data-section-card]",r).filter(l=>w("[data-section-body]",l)?.dataset.loaded==="1"),s=a.length-u.contentMaxMountedSections;s<=0||a.filter(l=>!l.classList.contains("open")).sort((l,c)=>Number(l.dataset.contentUse||0)-Number(c.dataset.contentUse||0)).slice(0,s).forEach(l=>{let c=w("[data-section-body]",l);c&&(c.replaceChildren(),c.dataset.loaded="0")})}function Ed(){if(u.contentPrewarmScheduled||!u.config||!er())return;let r=xi();if(!r.length)return;u.contentPrewarmScheduled=!0;let a=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let l=2;for(;u.contentPrewarmCursor<r.length&&l>0;){let c=r[u.contentPrewarmCursor++],p=te(c);if(p&&!u.contentSectionHtmlCache.has(p)&&lr(c),l-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=zt(a,1200))};u.contentPrewarmHandle=zt(a,1200)}function Gl(r){let a=sr(r),s=new Map(kn(r).map(f=>[f.path,f])),l=[],c="",p=f=>{let x=String(f||"").trim();return!x||x===c?"":(c=x,`
        <div class="sv-category" data-sv-category="${T(x)}">
          ${T(x)}
        </div>
      `)};return a.forEach(f=>{let x=String(f.category||"").trim();if(x||(c=""),Si(f)&&de(f)!=="repeater-image"){let S=s.get(f.path);S&&l.push(p(x)+Sn(S));return}if(de(f)==="repeater-image"){let S=Array.isArray(U(u.config,f.path))?U(u.config,f.path):[],k=Number.isFinite(f.max)?f.max:999,A=[...s.values()].filter(L=>L.rootPath===f.path).map(Sn).join(""),_=f.canAdd!==!1&&S.length<k?`
              <button
                type="button"
                class="button full"
                data-repeat-add="${T(f.path)}"
              >
                + Tambah
                ${T(f.label||"Foto")}
              </button>
            `:"";(A||_)&&l.push(p(x)+A+_);return}if(f.type==="repeater"){let S=x?"":`
            <div class="group-title">
              ${T(f.label||"Daftar")}
            </div>
          `;l.push(p(x)+`
            <div class="group">
              ${S}
              <div class="group-body">
                ${Sd(f,s)}
              </div>
            </div>
          `);return}l.push(p(x)+`
          <div class="group">
            <div class="group-title">
              ${T(f.label||f.path)}
            </div>

            <div class="group-body">
              ${Hl({...f,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),l.join("")}function ql(r){return xi().find(a=>te(a)===r)||null}function Ad(r){if(!r)return;let a=w("[data-section-body]",r);if(!a||a.dataset.loaded==="1")return;let s=ql(r.dataset.sectionCard);s&&(a.innerHTML=lr(s),a.dataset.loaded="1",Qt(r),bn(_i()))}function xn(r){if(!r)return;let a=_i();a&&(E("[data-section-card].open",a).forEach(s=>{s!==r&&(s.classList.remove("open"),w(".chev",s)?.setAttribute("aria-expanded","false"),Qt(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),w(".chev",r)?.setAttribute("aria-expanded","true"),Ad(r),Qt(r),bn(a))}function Kl(r){if(!r)return;let a=w("[data-section-body]",r),s=ql(r.dataset.sectionCard);!a||!s||(or(r.dataset.sectionCard),a.innerHTML=lr(s),a.dataset.loaded="1",Qt(r))}function Yl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let a=u.contentCommitMessage;u.contentCommitMessage="",yi(a||void 0,{validate:!1,deferPreview:!0})},100)}function Ae(r=""){let a=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!a&&!r?!0:yi(s||void 0,{validate:!0,deferPreview:!0})}function Ql(){let r=u.dashboardPin,a=fn(),s=r.status==="ready"&&r.pin&&r.slug===a,l="Belum diambil",c="idle";return a?r.busy||r.status==="loading"?(l="Memuat\u2026",c="loading"):r.status==="needkey"?(l="Perlu kunci",c="warn"):r.status==="error"?(l="Gagal",c="error"):s&&(l="Aktif",c="ok"):l="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${c}">${l}</span>`}function Zl(){if(!u.config)return wi();if(!er())return wd();let r=xi(),a=Cd(),s=r.filter(l=>u.search?(a.get(te(l))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${Ql()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Dl()}</div>
      </div>

      ${s.map(l=>{let c=te(l),p=l.label||c,f=Yt(l),x=!l.visiblePath||U(u.config,l.visiblePath)!==!1,S=sr(l),k=!u.search&&u.contentOpenSections.has(c);return`
            <article
              class="section ${f?"section-sortable":"section-pinned"}${k?" open":""}"
              data-section-card="${T(c)}"
            >
              <div
                class="section-head"
                title="${f?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${T(p)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${T(c)}"
                    draggable="${f?"true":"false"}"
                    ${f?"":"disabled"}
                    aria-label="Drag ${T(p)}"
                    title="${f?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${hh()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${T(c)}"
                    ${ir(c,-1)?"":"disabled"}
                    aria-label="Naikkan ${T(p)}"
                    title="Naik"
                  >
                    ${ml("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${T(c)}"
                    ${ir(c,1)?"":"disabled"}
                    aria-label="Turunkan ${T(p)}"
                    title="Turun"
                  >
                    ${ml("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${T(p)}
                  </strong>

                  <small>
                    ${f?"Drag / \u2191\u2193 \xB7 ":"Pinned \xB7 "}
                    ${S.length}
                    pengaturan
                  </small>
                </div>

                <div class="section-actions">
                  ${l.canHide&&l.visiblePath?`
                        <label class="switch-wrap">
                          <input
                            type="checkbox"
                            data-visible-path="${T(l.visiblePath)}"
                            ${x?"checked":""}
                          >
                          <span class="switch"></span>
                        </label>
                      `:""}
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${T(p)}"
                  aria-expanded="${k?"true":"false"}"
                >
                  ${fl("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${T(c)}"
                data-loaded="${k?"1":"0"}"
              >
                ${k?lr(l):""}
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
    `}function yn(){return Ee().flatMap(r=>r.fields||[]).filter(r=>de(r)==="repeater-image"&&r?.path)}function zx(){return yn()[0]||null}function Td(r){let a=String(r||"").trim();return a&&yn().find(s=>String(s.path||"").trim()===a)||null}function vn(r){let a=Array.isArray(r?.fields)?r.fields:[];return a.find(s=>s?.key&&Si(s))||a.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Jl(r){let a=String(r||"").trim();if(!a)return null;for(let s of yn()){let l=String(s.path||"").trim(),c=l+".";if(!l||!a.startsWith(c))continue;let p=a.slice(c.length).split(".");if(p.length!==2)continue;let f=Number(p[0]);if(!Number.isInteger(f)||f<0)continue;let x=vn(s),S=String(x?.key||"src");if(p[1]===S)return{field:s,imageField:x,imageKey:S,rootPath:l,index:f}}return null}function Xl(r){return u.doc?!!E('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function kn(r){let a=[],s=new Set;return(r?[r]:Ee()).forEach(l=>{(l.fields||[]).forEach(c=>{if(Si(c)&&c.type!=="repeater-image"&&c.path&&!s.has(c.path)&&(a.push({label:c.label||Gt(c.path),path:c.path,gallery:!1,wrapped:Xl(c.path)}),s.add(c.path)),c.type==="repeater"&&c.path){let p=U(u.config,c.path),f=(c.fields||[]).filter(x=>Si(x)&&x.key);Array.isArray(p)&&f.length&&p.forEach((x,S)=>{f.forEach(k=>{let A=c.path+"."+S+"."+k.key;s.has(A)||(a.push({label:(l.label||c.label||Gt(c.path))+" "+(S+1)+" \xB7 "+(k.label||Gt(k.key)),path:A,gallery:!1,wrapped:Xl(A)}),s.add(A))})})}if(de(c)==="repeater-image"&&c.path){let p=U(u.config,c.path),f=vn(c),x=String(f?.key||"src");Array.isArray(p)&&p.forEach((S,k)=>{let A=c.path+"."+k+"."+x;s.has(A)||(a.push({label:(c.label||"Foto Gallery")+" "+(k+1),path:A,gallery:!0,index:k,rootPath:c.path,imageKey:x,wrapped:!0}),s.add(A))})}})}),u.doc&&E('[data-sve-type="image"][data-sve-field]',u.doc).forEach(l=>{let c=l.getAttribute("data-sve-field");if(!c||s.has(c))return;let p=Jl(c),f=!!p;a.push({label:l.getAttribute("data-sve-label")||Gt(c),path:c,gallery:f,index:p?p.index:null,rootPath:p?p.rootPath:null,imageKey:p?p.imageKey:null,wrapped:!!l.closest("[data-sve-image-wrapper]")}),s.add(c)}),a}function ec(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function Zt(r){let a=u.config?.imageSettings,s=a&&typeof a=="object"?a[r]:null,l=Jl(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:ph(s?.fit),alignPos:rn.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function Jt(r,a){let s=ec();s[r]={...Zt(r),...a}}function _d(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let a=new Set(kn().map(s=>s.path));Object.keys(r).forEach(s=>{a.has(s)||delete r[s]})}function Ld(){let r=H("css");if(!r)return;let a=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return a!==r.trim()?(dt("css",a),!0):!1}function Id(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let l=s.getAttribute("data-sve-field");if(!l)return;let c=Zt(l),p=s.closest("[data-sve-image-wrapper]"),f=p||s,x=c.align==="left"?"0":"auto",S=c.align==="right"?"0":"auto";p?(p.style.display=c.hidden?"none":"",p.style.width=c.width+"%",p.style.maxWidth="100%",p.style.marginLeft=x,p.style.marginRight=S,s.style.width="100%"):(s.style.display=c.hidden?"none":"",s.style.width=c.width+"%",s.style.maxWidth="100%",s.style.marginLeft=x,s.style.marginRight=S),c.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=c.fit;let k=uh[c.alignPos]||"";k?s.style.objectPosition=k:s.style.removeProperty("object-position"),s.style.height="100%"})}function Wx(){nt.request({images:!0})}function $d(r){let a={"top left":`
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
    `}function Pd(r){let a=Zt(r.path),s=c=>c==="left"?`
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
              ${rn.filter(c=>c!=="default").map(c=>`
            <button
              type="button"
              class="advance-pos-btn ${a.alignPos===c?"active":""}"
              data-image-alignpos-path="${T(r.path)}"
              data-image-alignpos="${T(c)}"
              title="${T(c)}"
              aria-label="${T("Posisi "+c)}"
            >
              ${$d(c)}
            </button>
          `).join("")}
            </div>

            <button
              type="button"
              class="advance-pos-default ${a.alignPos==="default"?"active":""}"
              data-image-alignpos-path="${T(r.path)}"
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
                data-image-width-path="${T(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${a.width}"
                  data-image-width-number="${T(r.path)}"
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
                data-image-fit-path="${T(r.path)}"
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
                data-image-fit-path="${T(r.path)}"
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
                data-image-fit-path="${T(r.path)}"
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
    `}function Nd(){return`
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
    `}function Rd(){return`
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
    `}function tc(){return`
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
    `}function Md(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${tc()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function Od(){return`
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
    `}function Fd(r,a){let s=U(u.config,r);if(!Array.isArray(s)||a<0||a>=s.length)return;let l=Td(r),c=vn(l),p=String(c?.key||"src"),f=ec(),x={};for(let S=0;S<s.length;S++){let k=r+"."+S+"."+p;Object.prototype.hasOwnProperty.call(f,k)&&(x[S]=St(f[k]))}s.splice(a,1),Object.keys(f).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+p)&&delete f[S]});for(let S=0;S<s.length;S++){let k=S<a?S:S+1,A=x[k];A&&(f[r+"."+S+"."+p]=A)}_d(),Ne("Foto gallery dihapus"),me()}function Dd(r){u.config&&(Qe(u.config,r,""),Jt(r,{hidden:!0}),Ne("Gambar dihapus"),me())}function Sn(r){let a=U(u.config,r.path)||"",s=Zt(r.path),c=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!r.gallery?`data-gallery-delete-index="${T(r.rootPath)}" data-gallery-index="${Number(r.index)}"`:`data-image-delete-path="${T(r.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${Rd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${T(r.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${Od()}
              </button>
            </div>
          `;return`
            <div
              class="group image-card ${s.hidden?"image-card-hidden":""}"
              data-image-card-path="${T(r.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${a?`
                        <img
                          class="preview"
                          src="${T(a)}"
                          alt=""
                        >
                      `:Md(r.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${T(r.label)}">
                    ${T(r.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${T(r.path)}">
                    CONFIG.${T(r.path)}
                  </p>
                </div>

                ${c}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${T(r.path)}"
                  value="${T(a)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${T(r.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${T(r.path)}"
                  title="Paste URL"
                  aria-label="Paste URL ${T(r.label)} dari clipboard"
                >
                  ${Nd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${r.gallery?(()=>{let f=r.path.replace(/\.src$/,".alt"),x=U(u.config,f)||"";return`
                        <div class="image-alt-row">
                          <input
                            type="text"
                            data-field-path="${T(f)}"
                            data-field-type="text"
                            value="${T(x)}"
                            placeholder="Deskripsi foto (alt)"
                            aria-label="Deskripsi foto ${Number(r.index)+1}"
                          >
                        </div>
                      `})():""}

              ${Pd(r)}
            </div>
          `}function Ci(r,a){let s=r?.closest(".image-card");if(!s)return;let l=w(".image-preview-shell",s);if(!l)return;let c=r.value.trim(),p=Zt(a),f=w(".preview",l);if(c){if(!f||f.tagName!=="IMG"){let x=document.createElement("img");x.className="preview",x.alt="",f?f.replaceWith(x):l.prepend(x),f=x}f.src=c}else{if(!f||f.tagName!=="BUTTON"||!f.classList.contains("image-upload-placeholder")){let x=document.createElement("button");x.type="button",x.className="preview empty image-upload-placeholder",x.dataset.imageFocus=a,x.setAttribute("aria-label","Masukkan URL gambar"),f?f.replaceWith(x):l.prepend(x),f=x}f.innerHTML=`
        <span class="image-upload-icon">
          ${tc()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,f.onclick=()=>{r.focus(),r.select?.()}}f.style.width="100%",f.style.height="100%",f.style.maxWidth="none",f.style.aspectRatio="auto",f.style.objectFit="cover",f.style.marginLeft="0",f.style.marginRight="0",s.classList.toggle("image-card-hidden",p.hidden)}function cr(r,a){let s=Zt(a);E(`[data-image-align-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlign===s.align)}),E(`[data-image-fit-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageFit===s.fit)}),E(`[data-image-alignpos-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlignpos===s.alignPos)});let l=w(`[data-image-width-path="${CSS.escape(a)}"]`,r),c=w(`[data-image-width-number="${CSS.escape(a)}"]`,r);l&&(l.value=s.width),c&&(c.value=s.width)}function Vd(r){let a=String(r||"").trim();if(!a||/^var\(/i.test(a))return!1;try{return CSS.supports("color",a)}catch{return/^#[0-9a-f]{3,8}$/i.test(a)}}function Ei(r,a="#000000"){let s=String(r||"").trim(),l=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(l){let c=l[1];return c.length===3&&(c=c.split("").map(p=>p+p).join("")),"#"+c.slice(0,6).toLowerCase()}try{let c=document.createElement("span");if(c.style.color=s,!c.style.color)return a;c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c);let p=getComputedStyle(c).color;c.remove();let f=p.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!f)return a;let x=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+x(f[1])+x(f[2])+x(f[3])}catch{return a}}function Bd(){return K.some(([,,r])=>!!Se(r))}function jd(r,a){let s=Se(a);if(!s)return`
        <div class="field color-row color-row-unset">
          <div
            class="color-unset-swatch"
            aria-hidden="true"
          ></div>

          <div>
            <label>
              ${T(r)}
            </label>

            <input
              type="text"
              value=""
              placeholder="Belum diset"
              disabled
              aria-label="${T(r)} belum tersedia"
            >

            <small>
              ${T(a)}
            </small>
          </div>
        </div>
      `;let l=Ei(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${T(a)}"
          value="${T(l)}"
          aria-label="${T(r)}"
        >

        <div>
          <label>
            ${T(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${T(a)}"
            value="${T(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${T(a)}
          </small>
        </div>
      </div>
    `}function Ud(){return u.config?Bd()?[...new Set(K.map(a=>a[0]))].map(a=>`
            <div class="group">
              <div class="group-title">
                ${a}
              </div>

              ${K.filter(s=>s[0]===a).map(([,s,l])=>jd(s,l)).join("")}
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
      `:wi()}let Hd={"playwrite brasil guides":"Playwrite BR Guides"};function wn(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function Cn(r){let a="";try{a=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{a=String(r||"").replace(/\+/g," ")}return wn(a.split(":")[0].replace(/\s+/g," "))}function Ai(r){let a=wn(r);return a?Hd[a.toLowerCase()]||a:""}function zd(r){let a=String(r||"").trim();if(!a)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(a))try{let l=new URL(a),c=l.hostname.toLowerCase();if(c==="fonts.google.com"||c==="www.fonts.google.com"){let p=l.pathname.match(/^\/specimen\/([^/?#]+)/);if(p?.[1])return{family:Ai(Cn(p[1])),isUrl:!0,valid:!0};let f=l.searchParams.get("family");return f?{family:Ai(Cn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(c==="fonts.googleapis.com"){let f=l.searchParams.getAll("family")[0]||"";return f?{family:Ai(Cn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=a.split(",")[0];return{family:Ai(wn(s)),isUrl:!1,valid:!0}}function Wd(r,a=""){let s=Ai(r);if(!s)return"";let l=encodeURIComponent(s).replace(/%20/g,"+"),c=String(a||"").trim();return"https://fonts.googleapis.com/css2?family="+l+(c?":wght@"+encodeURIComponent(c):"")+"&display=swap"}function En(r,a=""){let s=Wd(r,a);return s?new Promise(l=>{let c=e+"-font-validation-link";document.getElementById(c)?.remove();let p=document.createElement("link"),f=!1,x=k=>{f||(f=!0,clearTimeout(S),p.onload=null,p.onerror=null,l(k))},S=setTimeout(()=>{x({ok:!1,reason:"timeout"})},7e3);p.id=c,p.rel="stylesheet",p.href=s,p.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let k=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!k||k.length===0){x({ok:!1,reason:"font-file"});return}}x({ok:!0,reason:"ok",url:s})}catch{x({ok:!1,reason:"font-file"})}},p.onerror=()=>{x({ok:!1,reason:"stylesheet"})},document.head.appendChild(p)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Gd(r,a){let l=ur(a,Se(a==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),c=await En(r,l);return c.ok?{...c,weight:l}:l!=="400"&&(c=await En(r,"400"),c.ok)?{...c,weight:"400",normalizedWeight:!0}:(c=await En(r,""),c.ok?{...c,weight:"400",normalizedWeight:l!=="400"}:{...c,weight:l})}function ic(r,a){if(!r)return;let s=Array.isArray(a)?a.filter(Boolean):a?[a]:[];try{let l=r.head||r.documentElement;if(!l)return;s.forEach((c,p)=>{let f=e+"-preview-font-link-"+p,x=r.getElementById(f);x||(x=r.createElement("link"),x.id=f,x.rel="stylesheet",l.appendChild(x)),x.getAttribute("href")!==c&&x.setAttribute("href",c)}),Array.from(r.querySelectorAll('link[id^="'+e+'-preview-font-link"]')).forEach(c=>{s.includes(c.getAttribute("href"))||c.remove()})}catch{}}function rc(){let r=An(),a=()=>E("iframe").forEach(s=>{try{ic(s.contentDocument,r)}catch{}});a(),requestAnimationFrame(a)}function nc(r){return String(U(u.config,"editorStyle.googleFonts."+r)||"").trim()}function ac(r){let a=nc(r);if(a)return a;let l=Se(r==="heading"?"--sve-font-heading":"--sve-font-body");return l?l.split(",")[0].replace(/["']/g,"").trim():""}function qd(r,a){return a==="heading"?"serif":"sans-serif"}function Kd(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Yd(r,a){return he.includes(String(a))}function Qd(r){return he}function ur(r,a){let s=String(a||"").trim();return he.includes(s)?s:"400"}function Zd(r,a=!1){let s=w("#"+e+"-body");if(!s)return;let l=r==="heading"?"--sve-heading-weight":"--sve-body-weight",c=w(`[data-style-var="${CSS.escape(l)}"]`,s);if(!c)return;let p=Se(l)||"400",f=ur(r,p);a&&f!==p&&je(l,f),c.innerHTML=dr(f,he,!1),c.value=f}function An(){let r=new Map;["heading","body"].forEach(s=>{let l=nc(s);if(!l)return;let c=l.trim().toLowerCase();if(!c)return;r.has(c)||r.set(c,{family:l,weights:new Set});let f=ur(s,Se(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(c).weights.add(f)});let a=Array.from(r.values()).map(s=>{let l=encodeURIComponent(s.family).replace(/%20/g,"+"),c=Array.from(s.weights).sort((p,f)=>Number(p)-Number(f));return"family="+l+":wght@"+c.join(";")});return a.length?a.map(s=>"https://fonts.googleapis.com/css2?"+s+"&display=swap"):[]}function Gx(){return An().join("|")}function pr(){let r=An(),a="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",l=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r.length){if(u.editors.head){let f=H("head");l.test(f)&&dt("head",f.replace(l,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),E("iframe").forEach(f=>{try{ic(f.contentDocument,[])}catch{}});return}let c=`${a}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${r.map(f=>`<link rel="stylesheet" href="${f}">`).join(`
`)}
${s}`;if(u.editors.head){let f=H("head");f=l.test(f)?f.replace(l,c):f.trimEnd()+`

`+c+`
`,dt("head",f)}let p=Array.from(document.querySelectorAll('link[id^="'+e+'-font-link"]'));r.forEach((f,x)=>{let S=x===0?e+"-font-link":e+"-font-link-"+x,k=document.getElementById(S);k||(k=document.createElement("link"),k.id=S,k.rel="stylesheet",document.head.appendChild(k)),k.href=f}),p.forEach(f=>{r.includes(f.href)||f.remove()}),rc()}async function hr(r){let a=w("#"+e+"-"+r+"-font");if(!a)return;let s=zd(a.value);if(!s.valid||!s.family)return;let l=s.family;a.value=l;let c=await Gd(l,r);if(!c.ok){c.reason==="stylesheet"||c.reason==="font-file"||c.reason;return}let p=r==="heading"?"--sve-font-heading":"--sve-font-body",f=r==="heading"?"--sve-heading-weight":"--sve-body-weight";c.normalizedWeight&&c.weight&&je(f,c.weight),Qe(u.config,"editorStyle.googleFonts."+r,l),Ne(),je(p,`"${l}", ${qd(l,r)}`),Zd(r,!1),pr(),rc(),Be()}function dr(r,a,s=!0,l=!1){let c=String(r||"").trim(),p=s&&c&&!a.includes(c)?[c,...a]:[...a];return l&&(p=[...new Set(p)].sort((f,x)=>{let S=Number.parseFloat(f),k=Number.parseFloat(x);return Number.isFinite(S)&&Number.isFinite(k)?S-k:String(f).localeCompare(String(x))})),p.map((f,x)=>{let S=a.includes(c)||s?f===c:x===0;return`
            <option
              value="${T(f)}"
              ${S?"selected":""}
            >
              ${T(f)}
            </option>
          `}).join("")}function Jd(r){let a=Se(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${dr(a,se,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${dr(a,ne,!1)}
        </select>
      `;if(r.type==="weight"){let s=Kd(r.variable),l=s?Qd(s):he,c=s?ur(s,a):a;return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${dr(c,l,!1)}
        </select>
      `}return""}function sc(){if(!u.config)return!1;let r=u.defaults?.cssTokens||{},a=!1;return Ye.forEach(({target:s,variable:l})=>{let c=typeof r[l]=="string"?r[l].trim():"",p=U(u.config,"editorStyle.googleFonts."+s),f=typeof p=="string"&&p.trim()!=="";c&&(je(l,c),a=!0),f&&(Qe(u.config,"editorStyle.googleFonts."+s,""),a=!0)}),a}function Xd(){u.config&&(sc(),$e.forEach(r=>{let a=ar(r.variable)||r.fallback;je(r.variable,a)}),Ne(),pr(),me())}function ef(){return u.config?`
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
            value="${T(ac("heading"))}"
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
            value="${T(ac("body"))}"
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

          ${fl("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${ht.map(r=>{let a=$e.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${T(r.label)}</div>
                  <div class="typography-control-grid">
                    ${a.map(s=>`
                      <div class="typography-control">
                        <label>${T(s.label)}</label>
                        ${Jd(s)}
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
    `:wi()}function fr(r){let a=String(r||"").trim().toLowerCase();if(!a)return 0;if(/^\d+$/.test(a))return Math.max(0,Number(a));let s=a.split(":").map(f=>Number(f));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let l=Number(a.match(/(\d+)h/)?.[1]||0),c=Number(a.match(/(\d+)m/)?.[1]||0),p=Number(a.match(/(\d+)s/)?.[1]||0);return l||c||p?Math.max(0,l*3600+c*60+p):0}function oc(r){let a=String(r||"").trim();if(!a)return 0;try{let s=new URL(a,location.href),l=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let c of l){let p=fr(c);if(p>0)return p}}catch{let l=a.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return fr(l?.[1]||"")}return 0}function Tn(r){let a=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(a/3600),l=Math.floor(a%3600/60),c=a%60,p=f=>String(f).padStart(2,"0");return s>0?s+":"+p(l)+":"+p(c):l+":"+p(c)}function tf(r,a){let s=String(r||"").trim(),l=Math.max(0,Math.floor(Number(a)||0));if(!s)return s;try{let c=new URL(s,location.href);return c.searchParams.delete("start"),l>0?c.searchParams.set("t",String(l)):c.searchParams.delete("t"),c.hash&&/(?:^#|[&#])t=/i.test(c.hash)&&(c.hash=""),c.toString()}catch{let p=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return l<=0?p:p+(p.includes("?")?"&":"?")+"t="+l}}function lc(r,a){let s=oc(a),l=w("#"+e+"-audio-start-enabled",r),c=w("#"+e+"-audio-start-time",r);l&&(l.checked=s>0),c&&(c.disabled=s<=0,c.value=Tn(s))}function rf(){if(!u.config)return wi();let r=Pl(),a=r.path||"assets.audio",s=U(u.config,a),l=typeof s=="string"?s:"",c=oc(l);return`
      <div class="group">
        <div class="group-title">
          ${T(r.label||"Audio Undangan")}
        </div>

        <div class="field audio-field">
          <label>
            URL Audio / YouTube
          </label>

          <input
            type="text"
            id="${e}-audio-url"
            value="${T(l)}"
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
              value="${T(Tn(c))}"
              placeholder="0:00"
              ${c>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function mr(r,a){(Array.isArray(r)?r:[]).forEach(s=>{a(s),de(s)==="repeater"&&mr(s.fields,a),de(s)==="repeater-image"&&mr(s.fields,a)})}function cc(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},a={html:H("html"),css:H("css"),js:H("js"),head:H("head")},s=(S,k)=>{try{let A=new URL(k,location.origin);if(A.protocol!=="https:"&&A.protocol!=="http:")return;let _=A.origin;if(_===location.origin)return;r[S]?.add(_)}catch{}},l=(S,k)=>{let A=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(A)||[]).forEach(_=>s(k,_))};try{let S=new DOMParser().parseFromString(a.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(k=>{s("img_src",k.getAttribute("src")||k.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(k=>s("media_src",k.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(k=>s("frame_src",k.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(k=>s("script_src",k.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(k=>s("style_src",k.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(k=>s("manifest_src",k.getAttribute("href")||""))}catch{}let c=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,p;for(;p=c.exec((a.css||"")+`
`+(a.head||""));){let S=p[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}l(a.head,"style_src");let f=JSON.stringify(u.config||{}),x=U(u.config,"guestbook.endpoint");return x&&s("connect_src",x),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let k=U(u.config,S);k&&s("connect_src",k)}),(f.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(a.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,k])=>[S,Array.from(k).sort()]))}function nf(){return{"Body HTML":H("html"),CSS:H("css"),JavaScript:H("js"),"Additional Head":H("head"),CONFIG:JSON.stringify(u.config||{})}}function uc(r,a,s){let l=nf(),c=pl(l);c.length?r("Gambar base64 terdeteksi di "+hl(c)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let p=ch(l);p.length&&a("Data URI berukuran besar di "+hl(p)+"; pertimbangkan pindah ke file hosting")}function af(){let r=[],a=[],s=[],l=X=>r.push(X),c=X=>a.push(X),p=X=>s.push(X);if(u.config?p("CONFIG terbaca sebagai static object"):l("CONFIG tidak terbaca"),u.schema?p("SVE_SCHEMA custom page tersedia"):l("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),p("CONFIG JSON-compatible")}catch{l("CONFIG tidak dapat diserialisasi dengan aman")}let f=Array.isArray(u.schema?.sections)?u.schema.sections:[],x=f.map(te).filter(Boolean),S=new Set(x);f.length||l("SVE_SCHEMA custom page belum memiliki section"),x.length!==S.size&&l("SVE_SCHEMA memiliki duplicate section id");let k=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],A=new Set(k);k.length!==A.size&&l("CONFIG.sectionOrder memiliki duplicate id"),x.forEach(X=>{A.has(X)||l("sectionOrder belum memuat: "+X)}),f.forEach(X=>{let Re=te(X);X.visiblePath&&(Z(X.visiblePath)||l("Unsafe visiblePath pada section "+Re),u.config&&typeof U(u.config,X.visiblePath)!="boolean"&&l("Visibility path harus boolean pada section "+Re)),mr(X.fields,Me=>{let Ct=de(Me);$t.has(Ct)||l("Field type tidak didukung: "+Ct+" ("+(Me.path||Me.key||Re)+")"),Me.path&&!Z(Me.path)&&l("Unsafe field path: "+Me.path),(Ct==="repeater"||Ct==="repeater-image")&&!Array.isArray(Me.fields)&&l("Repeater tanpa fields[]: "+(Me.path||Re)),Ct==="repeater"&&(Me.fields||[]).forEach(Li=>{let _n=de(Li);(_n==="repeater"||_n==="repeater-image")&&l("Nested repeater tidak diizinkan: "+(Me.path||Re)),Li.key||l("Repeater subfield tanpa stable key: "+(Me.path||Re))})})});let _=["html","css","js","head"].map(H).join(`
`);/\beval\s*\(/.test(_)&&l("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(_)&&l("new Function() terdeteksi"),/javascript\s*:/i.test(_)&&l("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(_)&&l("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(_)&&l("Kemungkinan secret/private credential terdeteksi"),uc(l,c,p);let L=gn(),j=$e.map(X=>X.variable).filter(X=>!ki(L,X));j.length?l("Typography role tokens belum lengkap: "+j.join(", ")):p("Semua typography role tokens tersedia");let ye=cc();return Object.values(ye).reduce((X,Re)=>X+Re.length,0)&&c("External origin terdeteksi; salin CSP manifest ke Scalev Security"),p("Custom page aktif; validasi "+Ve.length+" section wedding dilewati"),{status:r.length?"BLOCKER":a.length?"WARNING":"PASS",blockers:r,warnings:a,passes:s,csp:ye}}let gr=null;function pc(){let r=["html","css","js","head"].map(H);if(gr&&r.every((l,c)=>l===gr.sources[c]))return gr.report;let a=new DOMParser().parseFromString(r[0],"text/html");a.head.insertAdjacentHTML("beforeend",r[3]);let s=ul({doc:a,scripts:[r[2],...Array.from(a.querySelectorAll("script"),l=>l.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(a.querySelectorAll("style"),l=>l.textContent).join(`
`)});return gr={sources:r,report:s},s}function sf(){let r=pc();if(u.schema?.template?.type==="custom-page"){let D=af();return D.blockers=[...new Set([...r.blockers,...D.blockers])],D.blockers.length&&(D.status="BLOCKER"),D}let a=[...r.blockers],s=[],l=[],c=D=>a.push(D),p=D=>s.push(D),f=D=>l.push(D);if(u.config?f("CONFIG terbaca sebagai static object"):c("CONFIG tidak terbaca"),u.schema?f("SVE_SCHEMA eksplisit tersedia"):c("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),f("CONFIG JSON-compatible")}catch{c("CONFIG tidak dapat diserialisasi dengan aman")}let x=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=x.map(te).filter(Boolean),k=new Set(S);S.length!==k.size&&c("SVE_SCHEMA memiliki duplicate section id"),Ve.forEach(D=>{k.has(D)||c("Canonical section hilang: "+D)}),Ve.every(D=>k.has(D))&&f(Ve.length+" canonical sections tersedia");let A=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],_=new Set(A);A.length!==_.size&&c("CONFIG.sectionOrder memiliki duplicate id"),Ve.forEach(D=>{_.has(D)||c("sectionOrder belum memuat: "+D)}),A[0]&&A[0]!=="cover"&&c("Cover wajib menjadi section pertama"),U(u.config,"invitation.isDemo")===!0&&p("Mode Demo AKTIF \u2014 RSVP tamu tidak dikirim ke server. Matikan sebelum dipakai klien."),U(u.config,"invitation.isExclusive")===!0&&p("Undangan Khusus AKTIF \u2014 halaman hanya terbuka dengan link bertoken."),Ve.filter(D=>D!=="cover").forEach(D=>{typeof U(u.config,"sections."+D)!="boolean"&&c("Boolean visibility tidak valid: sections."+D)}),x.forEach(D=>{let Oe=te(D);Oe==="cover"?(D.locked!==!0||D.canHide!==!1)&&c("Cover harus locked dan canHide:false"):D.visiblePath&&!Z(D.visiblePath)&&c("Unsafe visiblePath pada section "+Oe),mr(D.fields,Ze=>{let Ii=de(Ze);$t.has(Ii)||c("Field type tidak didukung: "+Ii+" ("+(Ze.path||Ze.key||Oe)+")"),Ze.path&&!Z(Ze.path)&&c("Unsafe field path: "+Ze.path),(Ii==="repeater"||Ii==="repeater-image")&&!Array.isArray(Ze.fields)&&c("Repeater tanpa fields[]: "+(Ze.path||Oe)),Ii==="repeater"&&(Ze.fields||[]).forEach(kc=>{let Sc=de(kc);(Sc==="repeater"||Sc==="repeater-image")&&c("Nested repeater tidak diizinkan: "+(Ze.path||Oe)),kc.key||c("Repeater subfield tanpa stable key: "+(Ze.path||Oe))})})});let L=["html","css","js","head"].map(H).join(`
`);/\beval\s*\(/.test(L)&&c("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(L)&&c("new Function() terdeteksi"),/javascript\s*:/i.test(L)&&c("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(L)&&c("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(L)&&c("Kemungkinan secret/private credential terdeteksi"),uc(c,p,f);let j=H("js");/\bconst\s+CONFIG\s*=/.test(j)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(j)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let ye=U(u.config,"sections.rsvp")===!0,wt=U(u.config,"sections.guestbook")===!0,X=String(U(u.config,"rsvp.endpoint")||""),Re=U(u.config,"rsvp.enabled"),Me=!!X||Re!==void 0;if(ye)if(Me)Re!==!0&&c("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(X)||c("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let D=String(U(u.config,"extensions.rsvpBackend.mode")||"none");if(D!=="none"&&D!=="external"&&c("RSVP backend mode harus none atau external"),D==="external"){let Oe=String(U(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(Oe)||c("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(wt){let D=U(u.config,"guestbook.enabled"),Oe=String(U(u.config,"guestbook.endpoint")||"");D!==!0&&c("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(Oe)||c("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let Ct=gn(),Li=$e.map(D=>D.variable).filter(D=>!ki(Ct,D));Li.length?c("Typography role tokens belum lengkap: "+Li.join(", ")):f("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(Ct)&&p("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let vc=cc();return Object.values(vc).reduce((D,Oe)=>D+Oe.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):f("Tidak ada external origin wajib dari scanner"),{status:a.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:a,warnings:s,passes:l,csp:vc}}function of(r){return r==="PASS"?`
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
    `}function lf(){if(!u.config)return wi();let r=sf(),a=(c,p)=>c.length?`<ul>${c.map(f=>`<li>${T(f)}</li>`).join("")}</ul>`:`<p class="compat-empty">${T(p)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",l=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${of(r.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${T(s)}</strong>
            </div>
            <small>${T(l)}</small>
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
              <pre class="compat-code">${T(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function cf(r){let a=[],s=new WeakSet,l=(c,p="CONFIG")=>{if(c!==null){if(typeof c=="object"){if(s.has(c)){a.push("Referensi berulang: "+p);return}s.add(c)}if(Array.isArray(c)){c.forEach((f,x)=>l(f,p+"."+x));return}if(typeof c=="object"){Object.keys(c).forEach(f=>{Pt.has(f)&&a.push("Forbidden key: "+p+"."+f),l(c[f],p+"."+f)});return}["string","number","boolean"].includes(typeof c)||a.push("Non-static value: "+p),typeof c=="number"&&!Number.isFinite(c)&&a.push("Non-finite number: "+p)}};l(r);try{JSON.parse(JSON.stringify(r))}catch{a.push("CONFIG gagal round-trip JSON")}return a}function uf(){let r=u.templateLibrary,a=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(p=>a?[p.name].join(" ").toLowerCase().includes(a):!0);r.status==="idle"&&Al().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,me())});let l=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${T(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",c=s.map(p=>{let f=!!p.sourceUrl,x=p.id===r.importedId;return`
        <article class="library-card${x?" is-active":""}" role="listitem"${x?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${T(p.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${T(String(p.commissionRate))}%</strong> dari harga paket</span>
                <a href="${h}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${x?"danger":"primary"} library-import-button"
                data-library-import="${T(p.id)}"
                ${f?"":"disabled"}
              >${f?x?"Reset":"Gunakan":"Belum siap"}</button>
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

        ${l}

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
    `}function pf(){let r=w("#"+e+"-search");if(!r)return;let a=u.tab==="library";r.placeholder=a?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",a?"Cari template":"Cari section atau field")}function me(){let r=performance.now(),a=_i();if(!a)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}a.dataset.sveTab=u.tab||"content",u.tab==="library"?a.innerHTML=uf():u.tab==="content"?a.innerHTML=Zl():u.tab==="colors"?a.innerHTML=Ud():u.tab==="style"?a.innerHTML=ef():u.tab==="audio"?a.innerHTML=rf():u.tab==="compatibility"?a.innerHTML=lf():a.innerHTML=Zl(),bf(a),pf(),u.tab==="content"&&Ed(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function hf(r,a){return w('[data-image-path="'+CSS.escape(a)+'"]',r)}let df="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function hc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(df),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function ff(r,a){let s=hf(r,a);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let l=String(await navigator.clipboard.readText()).trim();return l?l===s.value.trim()?(s.focus({preventScroll:!0}),!0):ce(l)?(hc(s),!1):(s.value=l,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function mf(r){let a=String(r.dataset.fieldType||"text"),s=r.value;return a==="boolean"?s=!!r.checked:a==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):a==="datetime"&&(s=hd(r.value)),s}function dc(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;Qe(u.config,r.dataset.fieldPath,mf(r));let a=r.closest("[data-section-card]");return or(a?.dataset.sectionCard),Qt(a),u.contentStateDirty=!0,!0}function fc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let a=()=>{E(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let l=s.target.closest("[data-section-up]");if(l){if(s.preventDefault(),s.stopPropagation(),l.disabled)return;Ae(),$l(l.dataset.sectionUp,-1);return}let c=s.target.closest("[data-section-down]");if(c){if(s.preventDefault(),s.stopPropagation(),c.disabled)return;Ae(),$l(c.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let p=s.target.closest("[data-repeat-add]");if(p){let k=p.dataset.repeatAdd,A=Ee().flatMap(L=>L.fields||[]).find(L=>(L.type==="repeater"||de(L)==="repeater-image")&&L.path===k),_=U(u.config,k);Array.isArray(_)||(Qe(u.config,k,[]),_=U(u.config,k)),_.push(yd(A||{})),u.contentStateDirty=!0,or(p.closest("[data-section-card]")?.dataset.sectionCard),Ae("Item ditambahkan"),Kl(p.closest("[data-section-card]"));return}let f=s.target.closest("[data-repeat-delete]");if(f){let k=U(u.config,f.dataset.repeatDelete);if(!Array.isArray(k))return;let A=Ee().flatMap(L=>L.fields||[]).find(L=>(L.type==="repeater"||de(L)==="repeater-image")&&L.path===f.dataset.repeatDelete),_=Number.isFinite(A?.min)?A.min:0;if(k.length<=_){Ae("Minimal "+_+" item");return}k.splice(Number(f.dataset.repeatIndex),1),u.contentStateDirty=!0,or(f.closest("[data-section-card]")?.dataset.sectionCard),Ae("Item dihapus"),Kl(f.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){let k=ld(),A=k>0?"Kembalikan "+k+` field ke kondisi terakhir halaman ini dimuat?

Perubahan yang Anda buat setelah itu \u2014 nama, tanggal, rekening, foto, warna \u2014 akan hilang dan tidak bisa dibatalkan.`:`Kembalikan semua pengaturan ke kondisi terakhir halaman ini dimuat?

Perubahan Anda akan hilang dan tidak bisa dibatalkan.`;if(!window.confirm(A))return;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,Vl();return}if(s.target.closest("#"+e+"-team-key-save")){ad();return}if(s.target.closest("#"+e+"-pin-peek")){mn("peek");return}if(s.target.closest("#"+e+"-pin-generate")){mn("generate");return}if(s.target.closest("#"+e+"-pin-copy")){od();return}if(s.target.closest("#"+e+"-pin-changekey")){sd();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let k=S.closest("[data-section-card]");if(!k)return;let A=!k.classList.contains("open");k.classList.toggle("open",A);let _=k.dataset.sectionCard;A?xn(k):(u.contentOpenSections.delete(_),w(".chev",k)?.setAttribute("aria-expanded","false"),Qt(k),bn(r))}}),r.addEventListener("input",s=>{let l=s.target;l instanceof HTMLElement&&l.matches("[data-field-path]")&&(l.tagName==="SELECT"||l.matches('input[type="checkbox"], input[type="radio"]')||dc(l)&&(mt.refresh(u.config),Yl()))}),r.addEventListener("change",s=>{let l=s.target;if(l instanceof HTMLElement){if(l.matches("[data-visible-path]")){Qe(u.config,l.dataset.visiblePath,l.checked),Yl(l.checked?"Section ditampilkan":"Section disembunyikan");return}dc(l)&&(mt.refresh(u.config),Ae("Konten diperbarui"))}}),r.addEventListener("dragstart",s=>{let l=s.target.closest("[data-section-drag]");if(!l)return;if(l.disabled||l.getAttribute("draggable")!=="true"){s.preventDefault();return}Ae();let c=l.closest("[data-section-card]");c&&(c.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",c.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(c,24,24))}),r.addEventListener("dragend",a),r.addEventListener("dragover",s=>{let l=s.target.closest("[data-section-card]");if(!l)return;let c=s.dataTransfer?.getData("text/plain")||w(".section.dragging",r)?.dataset?.sectionCard||"",p=l.dataset.sectionCard;if(!c||c===p)return;let f=Ee().find(k=>te(k)===p);if(p!=="cover"&&!Yt(f))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let x=l.getBoundingClientRect(),S=s.clientY<x.top+x.height/2?"before":"after";p==="cover"&&(S="after"),E(".section.drag-before, .section.drag-after",r).forEach(k=>{k!==l&&(k.classList.remove("drag-before","drag-after"),delete k.dataset.dropPlacement)}),l.dataset.dropPlacement=S,l.classList.toggle("drag-before",S==="before"),l.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let l=s.target.closest("[data-section-card]");l&&(s.relatedTarget&&l.contains(s.relatedTarget)||(l.classList.remove("drag-before","drag-after"),delete l.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let l=s.target.closest("[data-section-card]");if(!l)return;let c=s.dataTransfer.getData("text/plain"),p=l.dataset.sectionCard,f=l.dataset.dropPlacement||(p==="cover"?"after":"before");s.preventDefault(),a(),Wh(c,p,f)})}function gf(r){E("[data-library-import]",r).forEach(a=>{a.onclick=()=>{Bh(a.dataset.libraryImport)}}),w("[data-library-clear]",r)?.addEventListener("click",jh),w("[data-library-refresh]",r)?.addEventListener("click",async()=>{await Al(!0),u.uiPrepared=!1,me()})}function Ti(r,a){let s=a+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function bf(r){if(u.tab==="library"){gf(r);return}if(u.tab==="content"){fc(r),xf(r);return}if(u.tab==="colors"){yf(r);return}if(u.tab==="style"){vf(r);return}if(u.tab==="audio"){kf(r);return}if(u.tab==="compatibility"){Sf(r);return}fc(r)}function xf(r){if(!Ti(r,"images"))return;r.addEventListener("click",s=>{let l=s.target.closest("[data-image-paste-path]");if(l){s.preventDefault(),s.stopPropagation(),ff(r,l.dataset.imagePastePath);return}let c=s.target.closest("[data-image-delete-path]");if(c){Dd(c.dataset.imageDeletePath);return}let p=s.target.closest("[data-image-open-advance]");if(p){let A=p.dataset.imageOpenAdvance,_=w(`[data-image-card-path="${CSS.escape(A)}"]`,r),L=_?w(".image-advance",_):null;if(L){let j=!L.open;L.open=j,p.setAttribute("aria-expanded",String(j)),p.setAttribute("aria-label",j?"Tutup pengaturan gambar":"Buka pengaturan gambar"),p.title=j?"Tutup pengaturan gambar":"Pengaturan gambar",p.classList.toggle("active",j),j?L.scrollIntoView({block:"nearest",behavior:"smooth"}):p.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let f=s.target.closest("[data-image-align-path]");if(f){let A=f.dataset.imageAlignPath,_=["left","center","right"].includes(f.dataset.imageAlign)?f.dataset.imageAlign:"center";Jt(A,{align:_}),rr(),cr(r,A);let L=w(`[data-image-path="${CSS.escape(A)}"]`,r);L&&Ci(L,A);return}let x=s.target.closest("[data-image-fit-path]");if(x){let A=x.dataset.imageFitPath,_=dl.includes(x.dataset.imageFit)?x.dataset.imageFit:"auto";Jt(A,{fit:_}),rr(),cr(r,A);let L=w(`[data-image-path="${CSS.escape(A)}"]`,r);L&&Ci(L,A);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let A=S.dataset.imageAlignposPath,_=rn.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";Jt(A,{alignPos:_}),rr(),cr(r,A);let L=w(`[data-image-path="${CSS.escape(A)}"]`,r);L&&Ci(L,A);return}let k=s.target.closest("[data-gallery-delete-index]");if(k){Fd(k.dataset.galleryDeleteIndex,Number(k.dataset.galleryIndex));return}}),r.addEventListener("input",s=>{let l=s.target.dataset.imageWidthPath;if(l!==void 0){let p=w(`[data-image-width-number="${CSS.escape(l)}"]`,r);p&&(p.value=s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){let p=Math.max(0,Math.min(100,Number(s.target.value)||0)),f=w(`[data-image-width-path="${CSS.escape(c)}"]`,r);f&&(f.value=p);return}});let a=(s,l)=>{let c=Math.max(0,Math.min(100,Number(l)||0));Jt(s,{width:c}),rr();let p=w(`[data-image-path="${CSS.escape(s)}"]`,r);p&&Ci(p,s),cr(r,s)};r.addEventListener("change",s=>{let l=s.target.dataset.imageWidthPath;if(l!==void 0){a(l,s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){a(c,s.target.value);return}let p=s.target.closest("[data-image-path]");if(!p)return;let f=p.dataset.imagePath,x=p.value.trim(),S=String(U(u.config,f)||"");if(x!==S){if(ce(x)){p.value=S,hc(p);return}Qe(u.config,f,x),x&&Jt(f,{hidden:!1}),Ne("Gambar diperbarui"),Ci(p,f)}}),r.addEventListener("paste",s=>{let l=s.target.closest("[data-image-path]");l&&setTimeout(()=>{l.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function yf(r){if(!Ti(r,"colors"))return;let a=(l,c,p)=>{let f=l.value.trim();if(!f||!Vd(f)){if(p){let S=Se(c);S&&(l.value=S)}return}je(c,f);let x=w(`[data-color-var="${CSS.escape(c)}"]`,r);x&&(x.value=Ei(f,x.value||"#000000"))},s=l=>{let c=ar(l);if(!c)return;je(l,c);let p=w(`[data-color-token-var="${CSS.escape(l)}"], [data-style-var="${CSS.escape(l)}"]`,r),f=w(`[data-color-var="${CSS.escape(l)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(c))&&(p.value=c)}f&&(f.value=Ei(c,f.value))};r.addEventListener("click",l=>{let c=l.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(l.target.closest("#"+e+"-reset-colors")){K.forEach(([,,p])=>{let f=Se(p);f&&je(p,ar(p)||f)}),E("[data-color-token-var]",r).forEach(p=>{let f=p.dataset.colorTokenVar,x=Se(f);x&&(p.value=x)}),E("[data-color-var]",r).forEach(p=>{p.value=Ei(Se(p.dataset.colorVar),p.value)});return}}),r.addEventListener("input",l=>{let c=l.target.dataset.colorTokenVar;if(c!==void 0){a(l.target,c,!1);return}let p=l.target.dataset.colorVar;if(p!==void 0){je(p,l.target.value);let f=w(`[data-color-token-var="${CSS.escape(p)}"]`,r);f&&(f.value=l.target.value)}}),r.addEventListener("change",l=>{let c=l.target.dataset.colorTokenVar;c!==void 0&&a(l.target,c,!0)})}function vf(r){if(!Ti(r,"style"))return;let a=(l,c)=>{let p=String(l.value||"").trim();if(p){if((c==="--sve-heading-weight"||c==="--sve-body-weight")&&!Yd(c==="--sve-heading-weight"?"heading":"body",p)){let x=Se(c);x&&(l.value=x);return}je(c,p),(c==="--sve-heading-weight"||c==="--sve-body-weight")&&pr()}},s=l=>{let c=ar(l);if(!c)return;je(l,c);let p=w(`[data-color-token-var="${CSS.escape(l)}"], [data-style-var="${CSS.escape(l)}"]`,r),f=w(`[data-color-var="${CSS.escape(l)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(c))&&(p.value=c)}f&&(f.value=Ei(c,f.value))};r.addEventListener("click",l=>{let c=l.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(l.target.closest("#"+e+"-reset-style")){Xd();return}if(l.target.closest("#"+e+"-reset-all")){Vl();return}if(l.target.closest("#"+e+"-heading-font-apply")){hr("heading");return}l.target.closest("#"+e+"-body-font-apply")&&hr("body")}),r.addEventListener("change",l=>{let c=l.target.dataset.styleVar;c!==void 0&&a(l.target,c)}),r.addEventListener("input",l=>{if(l.target.tagName!=="SELECT")return;let c=l.target.dataset.styleVar;c!==void 0&&a(l.target,c)}),r.addEventListener("keydown",l=>{l.key==="Enter"&&(l.target.id===e+"-heading-font"?(l.preventDefault(),hr("heading")):l.target.id===e+"-body-font"&&(l.preventDefault(),hr("body")))})}function kf(r){if(!Ti(r,"audio"))return;let s=Pl().path||"assets.audio",l=w("#"+e+"-audio-url",r),c=w("#"+e+"-audio-start-enabled",r),p=w("#"+e+"-audio-start-time",r);if(!l)return;let f=()=>{let S=l.value.trim(),k=U(u.config,s);if(typeof k=="string"&&k===S){lc(r,S);return}Qe(u.config,s,S),Ne("Audio diperbarui"),lc(r,S)},x=()=>{if(!c||!p)return;let S=l.value.trim(),k=c.checked?fr(p.value):0,A=tf(S,k);l.value=A,p.disabled=!c.checked,c.checked&&(p.value=Tn(k)),Qe(u.config,s,A),Ne(k>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};l.addEventListener("paste",()=>{setTimeout(f,0)}),l.addEventListener("change",f),c?.addEventListener("change",()=>{p&&(p.disabled=!c.checked,c.checked&&fr(p.value)<=0&&(p.value="0:00",p.focus()),x())}),p?.addEventListener("change",x)}function Sf(r){Ti(r,"compat")}function mc(){Object.values(u.editors).forEach(r=>{r&&Xi(r,!0)})}function wf(r,a=""){let s=_i();if(!s||!Ae()||(u.sourceDirty||!u.doc)&&!Pe()||(r=String(r||"").trim(),r&&!Z(r)))return!1;let l=r&&kn().find(k=>k.path===r),c=xi(),p=k=>sr(k).some(A=>A.path===r||(A.type==="repeater"||de(A)==="repeater-image")&&r.startsWith(A.path+".")),f=r&&(c.find(k=>te(k)===a&&p(k))||c.find(p))||c.find(k=>te(k)===a);if(!l&&!f)return!1;u.search="";let x=w("#"+e+"-search");x&&(x.value=""),u.open||qt(!0),Kt("content");let S;if(l){let k=w(`[data-section-card="${CSS.escape(te(f))}"]`,s);if(!k)return!1;xn(k),S=w(`[data-image-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}else{let k=w(`[data-section-card="${CSS.escape(te(f))}"]`,s);if(!k)return!1;xn(k),S=r&&w(`[data-field-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let gc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function Cf(r,a,s){if(typeof a!="string"||!a||a.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let l=r?.getAttribute("srcdoc")||"";if(!l)return null;let c=u.canvasPickSources.get(r);if(!c||c.source!==l){let S=document.createElement("template");S.innerHTML=l,c={source:l,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:E("script",S.content).map(k=>k.textContent).join(`
`)},u.canvasPickSources.set(r,c)}if(!c.root||!c.scripts.includes(JSON.stringify(s)))return null;let p=c.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(a)}"]`);if(!p)return null;let f=p.matches("[data-sve-field]")?p:p.querySelector("[data-sve-field]")||p.closest("[data-sve-field]"),x=p.closest("[data-section-id], [data-sve-section]");return{path:f?.getAttribute("data-sve-field")||"",sectionHint:x?.getAttribute("data-section-id")||x?.id||x?.getAttribute("data-sve-section")||""}}function Ef(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,a=null;window.addEventListener("message",s=>{if(location.href!==r)return;let l=s.data;if(!l||l.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof l.inspectorId!="string"||!l.inspectorId||l.inspectorId.length>256||typeof l.previewId!="string"||l.previewId.length>256)return;let c=E(gc).find(j=>j.contentWindow===s.source);if(!c||!c.sandbox.contains("allow-scripts")||c.sandbox.contains("allow-same-origin"))return;let p=c.getAttribute("srcdoc"),f=location.href,{open:x,tab:S,sourceDirty:k}=u,A=u.performance.configCommitCount,_=H("html"),L=H("js");cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(a=null,location.href!==f||!c.isConnected||!c.matches(gc)||c.contentWindow!==s.source||c.getAttribute("srcdoc")!==p||u.open!==x||u.tab!==S||u.sourceDirty!==k||u.performance.configCommitCount!==A||H("html")!==_||H("js")!==L)return;let j=Cf(c,l.inspectorId,l.previewId);j&&(j.path||j.sectionHint)&&wf(j.path,j.sectionHint)})})}function Af(){let r="https://wa.me/"+d+"?text="+encodeURIComponent(g);window.open(r,"_blank","noopener,noreferrer")}function Tf(){performance.mark("sve-styles-start"),_f(),performance.mark("sve-styles-critical-done"),zt(Lf,50)}function _f(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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

/*
 * Pane preview mandiri. Bawaannya menutupi sisa layar di sebelah kiri dock;
 * saat modul preview memakai mode tumpuk, posisi dan ukurannya disalin dari
 * area pratinjau Scalev lewat gaya inline, jadi nilai di bawah hanya cadangan.
 */
#${e} .sve-live-pane {
  position: fixed;
  top: var(--sve77-global-header-height, 44px);
  right: var(--sve77-panel-width);
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: #f4f5f7;
  border-left: 1px solid #dfe3e8;
  z-index: 2147482000;
}

#${e} .sve-live-pane[hidden] {
  display: none;
}

#${e} .sve-live-bar {
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px 0 12px;
  background: #fff;
  border-bottom: 1px solid #dfe3e8;
  flex-shrink: 0;
}

#${e} .sve-live-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: #7a8798;
}

#${e} .sve-live-close {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #7a8798;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

#${e} .sve-live-close:hover {
  background: #f3f6f9;
  color: #202c3b;
}

#${e} .sve-live-stage {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
}

#${e} .sve-live-frame {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  background: #fff;
}

#${e} .sve-live-status {
  position: absolute;
  inset: 0;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #7a8798;
  font-size: 13px;
  text-align: center;
}

#${e} .sve-live-status:empty {
  display: none;
}

#${e} .sve-live-pane:has(.sve-live-frame) .sve-live-status {
  display: none;
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

/*
 * Baris deskripsi foto (alt) pada item galeri. Dibuat sejajar dengan baris URL di
 * atasnya supaya terbaca sebagai satu pasangan: URL di atas, deskripsi di bawah.
 * Ukuran dan warnanya sengaja sama dengan input URL \u2014 dua kotak dengan tinggi
 * berbeda dalam satu kartu terbaca sebagai dua kontrol yang tidak berhubungan.
 */
#${e} .image-card .image-alt-row {
  display: flex;
  min-width: 0;
  width: 100%;
  margin-top: 6px;
  overflow: hidden;
  border: 1px solid #dbdfe5;
  border-radius: 4px;
  background: #f8fafb;
}

#${e} .image-card .image-alt-row:focus-within {
  border-color: var(--p);
}

#${e} .image-card .image-alt-row input[type="text"] {
  min-width: 0;
  width: 100%;
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

#${e} .image-card .image-alt-row input[type="text"]:focus {
  outline: 0;
}

#${e} .image-card .image-alt-row input[type="text"]::placeholder {
  color: #8a94a3;
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
`,document.head.appendChild(r)}function Lf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
`,document.head.appendChild(r),bc(),performance.mark("sve-styles-all-done")}function If(r){return r.replace(/#sve77-body(?=[\s>+~,.#:[@]|$)/g,":host > :where(div.body)").replace(/#sve77-body/g,":host > :where(div.body)").replace(/#sve77\b/g,":host")}function $f(){let r=document.getElementById(e);if(!r)return"";let a=new Set(Array.from(r.querySelectorAll("*"),f=>f.tagName.toLowerCase())),s=[],l=f=>/#sve77(?![\w-])|#sve77-body/.test(f)?!0:f.split(",").some(S=>{let _=(S.trim().split(/[\s>+~]+/).pop()||"").replace(/\.[\w-]+/g,"").replace(/#[\w-]+/g,"").replace(/\[[^\]]*\]/g,"").replace(/::?[\w-]+(\([^)]*\))?/g,"").split(/[.#:[]/)[0].trim().toLowerCase();return _&&(a.has(_)||_==="html"||_==="body")})||/^\*/.test(f)||/^html\b|^body\b/.test(f),c=f=>/^html\b|^:root\b|\[data-sve77-page-root|\[data-sve77-top-toolbar|\[data-sve77-toolbar-host/.test(f.trim()),p=f=>{for(let x of f){if(!x.selectorText){if(x.cssRules)if(x.conditionText){let k=s.length;s.push(null),p(x.cssRules);let A=s.splice(k+1).join(`
`);s[k]=x.cssText.slice(0,x.cssText.indexOf("{"))+`{
`+A+`
}`}else p(x.cssRules);continue}let S=x.selectorText;c(S)||l(S)&&s.push(If(S)+"{"+x.style.cssText+"}")}};for(let f of Array.from(document.styleSheets)){let x;try{x=f.cssRules}catch{continue}x&&p(x)}return s.join(`
`)}function Pf(){let r=document.getElementById(e);if(!r)return"";let a=[],s=r;for(;s&&s!==document.documentElement;){let l=getComputedStyle(s);for(let c of Array.from(l)){if(!c.startsWith("--"))continue;let p=l.getPropertyValue(c).trim();p&&a.push(c+":"+p)}s=s.parentElement}return a.length?":host{"+a.join(";")+"}":""}function bc(){if(!Xt)return;let r=Xt.querySelector("style[data-sve-shadow-style]");if(!r)return;let a=Pf()+`
`+$f();r.textContent=a}let Xt=null,xc=null;function _i(){if(Xt){let r=Xt.querySelector(".body");if(r)return r}return document.getElementById(e+"-body")}function Nf(){if(Xt)return xc;let r=document.getElementById(e+"-body");if(!r)return null;let a=document.createElement("div");a.id=e+"-shadow-host",a.style.cssText="display:contents",r.parentNode.insertBefore(a,r);let s=a.attachShadow({mode:"open"});return s.appendChild(Rf()),s.appendChild(r),Xt=s,xc=a,bc(),a}function Rf(){let r=document.createElement("style");return r.id=e+"-shadow-style",r.dataset.sveShadowStyle="1",r.textContent="",r}function Mf(){Tf();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
              id="${e}-live"
              title="Preview cepat"
              aria-label="Buka preview cepat"
            >
              \u25E8
            </button>

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
    `,document.body.appendChild(r),Nf(),mt.mount(r);let a=L=>{let j=nt.isScalevMuted?.()===!0;nt.setScalevMuted?.(L),j&&!L&&mc()},s=w("#"+e+"-live");s.onclick=()=>{if(mt.isVisible()){mt.hide(),s.classList.remove("active"),a(!1);return}mt.show()&&(s.classList.add("active"),a(!0),mt.isReady()||(Be({force:!0}),window.setTimeout(()=>mt.ensure(),600)))},mt.onClose(()=>{s.classList.remove("active"),a(!1)}),w("#"+e+"-close").onclick=()=>{qt(!1)},w("#"+e+"-refresh").onclick=()=>{Pe()&&(me(),Be({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,Pe()&&(me(),Be({force:!0,syncImages:!0}))},w("#"+e+"-support").onclick=Af;let l=w("#"+e+"-editor-update"),c=w("#"+e+"-update-status"),p=!1,f=!1,x=0,S=null,k=15e3,A=(L,j,ye=!1)=>{l.textContent=L,l.title=j,l.setAttribute("aria-label",j),l.disabled=ye},_=()=>{x=Date.now()+k,A("Cek Update","Cek update Visual Editor",!0),clearTimeout(S),S=setTimeout(()=>{x=0,!f&&!p&&A("Cek Update","Cek update Visual Editor")},k)};l.addEventListener("click",()=>{if(p){window.open(y,"_blank","noopener");return}if(f||Date.now()<x){c.textContent="Tunggu sebentar";return}p=!1,f=!0,A("Mengecek...","Sedang mengecek update Visual Editor",!0),c.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${b}?check=${Date.now()}`,onload(L){let j=Re=>{p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent=Re,_()};if(L.status<200||L.status>=300){j(L.status===403||L.status===429?"Tunggu sebentar":"Gagal cek update");return}let wt=(L.responseText||"").match(/@version\s+([^\s]+)/),X=wt&&wt[1];if(!X){j("Gagal cek update");return}X===t?(p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent="Sudah terbaru",_()):(p=!0,f=!1,A("Pasang",`Pasang update Visual Editor versi ${X}`),c.textContent=`Update tersedia: versi ${X}.`)},onerror(){p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent="Gagal cek update",_()}})}),w("#"+e+"-search").addEventListener("input",gi(L=>{u.search=L.target.value.toLowerCase().trim(),u.uiPrepared=!1,me()},100)),E(".tab",r).forEach(L=>{L.onclick=()=>{Ae()&&Kt(L.dataset.tab)}})}function Of(){let r=gi(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,Wt(),Yi(),vl();let f=Rt();f&&bi(f,{commit:!0,silent:!0}),u.open&&Qi(!0);let x=cn();if(x.length!==u.allEditors.length||x.some((S,k)=>S!==u.allEditors[k])){if(u.sourceDirty=!0,!Pe())return;nt.invalidate(),xl(),u.open?me():Zi()}},160),a='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(f=>{f.some(x=>!x.target.closest?.("#"+e)&&[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}),l=null,c=()=>{let f=ln();f!==l&&(s.disconnect(),l=f,f&&s.observe(f,{childList:!0,subtree:!0}),r())};new MutationObserver(f=>{c(),f.some(x=>[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}).observe(document.body,{childList:!0}),c(),document.addEventListener("load",f=>{f.target instanceof HTMLIFrameElement&&(nt.invalidate(),Be({force:!0,syncImages:!0}))},!0),document.addEventListener("click",f=>{let x=f.target.closest?.("button");if(!(!x||x.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(x.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!H("js").includes("SVE_SCHEMA"))){if(!Ae()){f.preventDefault(),f.stopImmediatePropagation();return}mc(),pc().blockers.length&&(f.preventDefault(),f.stopImmediatePropagation(),qt(!0),u.uiPrepared=!1,Kt("compatibility"))}},!0),document.addEventListener("keydown",f=>{f.key==="Escape"&&u.open&&document.getElementById(e)?.contains(f.target)&&(qt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",f=>{nn(f.target)&&(u.scalevSlug=Nt(f.target.value),bh())},!0),document.addEventListener("change",f=>{if(nn(f.target)){let x=Nt(f.target.value);x&&(u.scalevSlug=x,bi(x,{commit:!0}))}},!0),window.addEventListener("resize",gi(()=>{Yi(),u.open&&Qi(!0)},80))}function yc(){v()&&(Mf(),vl(),Ef(),Of(),on(),requestAnimationFrame(()=>{Yi()}),Zi(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",yc,{once:!0}):yc()})();})();
