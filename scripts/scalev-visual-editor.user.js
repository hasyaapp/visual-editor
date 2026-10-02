// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.40.0
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
(()=>{var Vf=Object.create;var za=Object.defineProperty;var Bf=Object.getOwnPropertyDescriptor;var jf=Object.getOwnPropertyNames;var Uf=Object.getPrototypeOf,zf=Object.prototype.hasOwnProperty;var ci=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},O=(e,t)=>{for(var i in t)za(e,i,{get:t[i],enumerable:!0})},Hf=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of jf(t))!zf.call(e,o)&&o!==i&&za(e,o,{get:()=>t[o],enumerable:!(a=Bf(t,o))||a.enumerable});return e};var Wf=(e,t,i)=>(i=e!=null?Vf(Uf(e)):{},Hf(t||!e||!e.__esModule?za(i,"default",{value:e,enumerable:!0}):i,e));var Vp=ci(ml=>{var Dp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");ml.encode=function(e){if(0<=e&&e<Dp.length)return Dp[e];throw new TypeError("Must be between 0 and 63: "+e)};ml.decode=function(e){var t=65,i=90,a=97,o=122,h=48,d=57,g=43,y=47,b=26,v=52;return t<=e&&e<=i?e-t:a<=e&&e<=o?e-a+b:h<=e&&e<=d?e-h+v:e==g?62:e==y?63:-1}});var Hp=ci(bl=>{var Bp=Vp(),gl=5,jp=1<<gl,Up=jp-1,zp=jp;function tx(e){return e<0?(-e<<1)+1:(e<<1)+0}function ix(e){var t=(e&1)===1,i=e>>1;return t?-i:i}bl.encode=function(t){var i="",a,o=tx(t);do a=o&Up,o>>>=gl,o>0&&(a|=zp),i+=Bp.encode(a);while(o>0);return i};bl.decode=function(t,i,a){var o=t.length,h=0,d=0,g,y;do{if(i>=o)throw new Error("Expected more digits in base 64 VLQ value.");if(y=Bp.decode(t.charCodeAt(i++)),y===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(y&zp),y&=Up,h=h+(y<<d),d+=gl}while(g);a.value=ix(h),a.rest=i}});var la=ci(Ce=>{function rx(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}Ce.getArg=rx;var Wp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,ax=/^data:.+\,.+$/;function Zi(e){var t=e.match(Wp);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}Ce.urlParse=Zi;function ki(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}Ce.urlGenerate=ki;var nx=32;function sx(e){var t=[];return function(i){for(var a=0;a<t.length;a++)if(t[a].input===i){var o=t[0];return t[0]=t[a],t[a]=o,t[0].result}var h=e(i);return t.unshift({input:i,result:h}),t.length>nx&&t.pop(),h}}var xl=sx(function(t){var i=t,a=Zi(t);if(a){if(!a.path)return t;i=a.path}for(var o=Ce.isAbsolute(i),h=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){h.push(i.slice(d));break}else for(h.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var y,b=0,g=h.length-1;g>=0;g--)y=h[g],y==="."?h.splice(g,1):y===".."?b++:b>0&&(y===""?(h.splice(g+1,b),b=0):(h.splice(g,2),b--));return i=h.join("/"),i===""&&(i=o?"/":"."),a?(a.path=i,ki(a)):i});Ce.normalize=xl;function Gp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Zi(t),a=Zi(e);if(a&&(e=a.path||"/"),i&&!i.scheme)return a&&(i.scheme=a.scheme),ki(i);if(i||t.match(ax))return t;if(a&&!a.host&&!a.path)return a.host=t,ki(a);var o=t.charAt(0)==="/"?t:xl(e.replace(/\/+$/,"")+"/"+t);return a?(a.path=o,ki(a)):o}Ce.join=Gp;Ce.isAbsolute=function(e){return e.charAt(0)==="/"||Wp.test(e)};function ox(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var a=e.lastIndexOf("/");if(a<0||(e=e.slice(0,a),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}Ce.relative=ox;var qp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Kp(e){return e}function lx(e){return Yp(e)?"$"+e:e}Ce.toSetString=qp?Kp:lx;function cx(e){return Yp(e)?e.slice(1):e}Ce.fromSetString=qp?Kp:cx;function Yp(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function ux(e,t,i){var a=Lt(e.source,t.source);return a!==0||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:Lt(e.name,t.name)}Ce.compareByOriginalPositions=ux;function px(e,t,i){var a;return a=e.originalLine-t.originalLine,a!==0||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:Lt(e.name,t.name)}Ce.compareByOriginalPositionsNoSource=px;function hx(e,t,i){var a=e.generatedLine-t.generatedLine;return a!==0||(a=e.generatedColumn-t.generatedColumn,a!==0||i)||(a=Lt(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:Lt(e.name,t.name)}Ce.compareByGeneratedPositionsDeflated=hx;function dx(e,t,i){var a=e.generatedColumn-t.generatedColumn;return a!==0||i||(a=Lt(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:Lt(e.name,t.name)}Ce.compareByGeneratedPositionsDeflatedNoLine=dx;function Lt(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function fx(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=Lt(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:Lt(e.name,t.name)}Ce.compareByGeneratedPositionsInflated=fx;function mx(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}Ce.parseSourceMapInput=mx;function gx(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var a=Zi(i);if(!a)throw new Error("sourceMapURL could not be parsed");if(a.path){var o=a.path.lastIndexOf("/");o>=0&&(a.path=a.path.substring(0,o+1))}t=Gp(ki(a),t)}return xl(t)}Ce.computeSourceURL=gx});var Jp=ci(Qp=>{var yl=la(),vl=Object.prototype.hasOwnProperty,Xt=typeof Map<"u";function $t(){this._array=[],this._set=Xt?new Map:Object.create(null)}$t.fromArray=function(t,i){for(var a=new $t,o=0,h=t.length;o<h;o++)a.add(t[o],i);return a};$t.prototype.size=function(){return Xt?this._set.size:Object.getOwnPropertyNames(this._set).length};$t.prototype.add=function(t,i){var a=Xt?t:yl.toSetString(t),o=Xt?this.has(t):vl.call(this._set,a),h=this._array.length;(!o||i)&&this._array.push(t),o||(Xt?this._set.set(t,h):this._set[a]=h)};$t.prototype.has=function(t){if(Xt)return this._set.has(t);var i=yl.toSetString(t);return vl.call(this._set,i)};$t.prototype.indexOf=function(t){if(Xt){var i=this._set.get(t);if(i>=0)return i}else{var a=yl.toSetString(t);if(vl.call(this._set,a))return this._set[a]}throw new Error('"'+t+'" is not in the set.')};$t.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};$t.prototype.toArray=function(){return this._array.slice()};Qp.ArraySet=$t});var eh=ci(Zp=>{var Xp=la();function bx(e,t){var i=e.generatedLine,a=t.generatedLine,o=e.generatedColumn,h=t.generatedColumn;return a>i||a==i&&h>=o||Xp.compareByGeneratedPositionsInflated(e,t)<=0}function ca(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}ca.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};ca.prototype.add=function(t){bx(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};ca.prototype.toArray=function(){return this._sorted||(this._array.sort(Xp.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Zp.MappingList=ca});var ih=ci(th=>{var er=Hp(),he=la(),ua=Jp().ArraySet,xx=eh().MappingList;function ot(e){e||(e={}),this._file=he.getArg(e,"file",null),this._sourceRoot=he.getArg(e,"sourceRoot",null),this._skipValidation=he.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=he.getArg(e,"ignoreInvalidMapping",!1),this._sources=new ua,this._names=new ua,this._mappings=new xx,this._sourcesContents=null}ot.prototype._version=3;ot.fromSourceMap=function(t,i){var a=t.sourceRoot,o=new ot(Object.assign(i||{},{file:t.file,sourceRoot:a}));return t.eachMapping(function(h){var d={generated:{line:h.generatedLine,column:h.generatedColumn}};h.source!=null&&(d.source=h.source,a!=null&&(d.source=he.relative(a,d.source)),d.original={line:h.originalLine,column:h.originalColumn},h.name!=null&&(d.name=h.name)),o.addMapping(d)}),t.sources.forEach(function(h){var d=h;a!==null&&(d=he.relative(a,h)),o._sources.has(d)||o._sources.add(d);var g=t.sourceContentFor(h);g!=null&&o.setSourceContent(h,g)}),o};ot.prototype.addMapping=function(t){var i=he.getArg(t,"generated"),a=he.getArg(t,"original",null),o=he.getArg(t,"source",null),h=he.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,a,o,h)===!1||(o!=null&&(o=String(o),this._sources.has(o)||this._sources.add(o)),h!=null&&(h=String(h),this._names.has(h)||this._names.add(h)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:a!=null&&a.line,originalColumn:a!=null&&a.column,source:o,name:h}))};ot.prototype.setSourceContent=function(t,i){var a=t;this._sourceRoot!=null&&(a=he.relative(this._sourceRoot,a)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[he.toSetString(a)]=i):this._sourcesContents&&(delete this._sourcesContents[he.toSetString(a)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};ot.prototype.applySourceMap=function(t,i,a){var o=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);o=t.file}var h=this._sourceRoot;h!=null&&(o=he.relative(h,o));var d=new ua,g=new ua;this._mappings.unsortedForEach(function(y){if(y.source===o&&y.originalLine!=null){var b=t.originalPositionFor({line:y.originalLine,column:y.originalColumn});b.source!=null&&(y.source=b.source,a!=null&&(y.source=he.join(a,y.source)),h!=null&&(y.source=he.relative(h,y.source)),y.originalLine=b.line,y.originalColumn=b.column,b.name!=null&&(y.name=b.name))}var v=y.source;v!=null&&!d.has(v)&&d.add(v);var C=y.name;C!=null&&!g.has(C)&&g.add(C)},this),this._sources=d,this._names=g,t.sources.forEach(function(y){var b=t.sourceContentFor(y);b!=null&&(a!=null&&(y=he.join(a,y)),h!=null&&(y=he.relative(h,y)),this.setSourceContent(y,b))},this)};ot.prototype._validateMapping=function(t,i,a,o){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var h="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!a&&!o)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&a)return;var h="Invalid mapping: "+JSON.stringify({generated:t,source:a,original:i,name:o});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}};ot.prototype._serializeMappings=function(){for(var t=0,i=1,a=0,o=0,h=0,d=0,g="",y,b,v,C,w=this._mappings.toArray(),E=0,L=w.length;E<L;E++){if(b=w[E],y="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)y+=";",i++;else if(E>0){if(!he.compareByGeneratedPositionsInflated(b,w[E-1]))continue;y+=","}y+=er.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(C=this._sources.indexOf(b.source),y+=er.encode(C-d),d=C,y+=er.encode(b.originalLine-1-o),o=b.originalLine-1,y+=er.encode(b.originalColumn-a),a=b.originalColumn,b.name!=null&&(v=this._names.indexOf(b.name),y+=er.encode(v-h),h=v)),g+=y}return g};ot.prototype._generateSourcesContent=function(t,i){return t.map(function(a){if(!this._sourcesContents)return null;i!=null&&(a=he.relative(i,a));var o=he.toSetString(a);return Object.prototype.hasOwnProperty.call(this._sourcesContents,o)?this._sourcesContents[o]:null},this)};ot.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};ot.prototype.toString=function(){return JSON.stringify(this.toJSON())};th.SourceMapGenerator=ot});var Gf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],Fc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],qf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",Dc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",Ha={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},Wa="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Kf={5:Wa,"5module":Wa+" export import",6:Wa+" const class extends export import super"},Vc=/^in(stanceof)?$/,Yf=new RegExp("["+Dc+"]"),Qf=new RegExp("["+Dc+qf+"]");function qa(e,t){for(var i=65536,a=0;a<t.length;a+=2){if(i+=t[a],i>e)return!1;if(i+=t[a+1],i>=e)return!0}return!1}function bt(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Yf.test(String.fromCharCode(e)):t===!1?!1:qa(e,Fc)}function Ft(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Qf.test(String.fromCharCode(e)):t===!1?!1:qa(e,Fc)||qa(e,Gf)}var X=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function tt(e,t){return new X(e,{beforeExpr:!0,binop:t})}var it={beforeExpr:!0},Ve={startsExpr:!0},Ja={};function Q(e,t){return t===void 0&&(t={}),t.keyword=e,Ja[e]=new X(e,t)}var m={num:new X("num",Ve),regexp:new X("regexp",Ve),string:new X("string",Ve),name:new X("name",Ve),privateId:new X("privateId",Ve),eof:new X("eof"),bracketL:new X("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new X("]"),braceL:new X("{",{beforeExpr:!0,startsExpr:!0}),braceR:new X("}"),parenL:new X("(",{beforeExpr:!0,startsExpr:!0}),parenR:new X(")"),comma:new X(",",it),semi:new X(";",it),colon:new X(":",it),dot:new X("."),question:new X("?",it),questionDot:new X("?."),arrow:new X("=>",it),template:new X("template"),invalidTemplate:new X("invalidTemplate"),ellipsis:new X("...",it),backQuote:new X("`",Ve),dollarBraceL:new X("${",{beforeExpr:!0,startsExpr:!0}),eq:new X("=",{beforeExpr:!0,isAssign:!0}),assign:new X("_=",{beforeExpr:!0,isAssign:!0}),incDec:new X("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new X("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:tt("||",1),logicalAND:tt("&&",2),bitwiseOR:tt("|",3),bitwiseXOR:tt("^",4),bitwiseAND:tt("&",5),equality:tt("==/!=/===/!==",6),relational:tt("</>/<=/>=",7),bitShift:tt("<</>>/>>>",8),plusMin:new X("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:tt("%",10),star:tt("*",10),slash:tt("/",10),starstar:new X("**",{beforeExpr:!0}),coalesce:tt("??",1),_break:Q("break"),_case:Q("case",it),_catch:Q("catch"),_continue:Q("continue"),_debugger:Q("debugger"),_default:Q("default",it),_do:Q("do",{isLoop:!0,beforeExpr:!0}),_else:Q("else",it),_finally:Q("finally"),_for:Q("for",{isLoop:!0}),_function:Q("function",Ve),_if:Q("if"),_return:Q("return",it),_switch:Q("switch"),_throw:Q("throw",it),_try:Q("try"),_var:Q("var"),_const:Q("const"),_while:Q("while",{isLoop:!0}),_with:Q("with"),_new:Q("new",{beforeExpr:!0,startsExpr:!0}),_this:Q("this",Ve),_super:Q("super",Ve),_class:Q("class",Ve),_extends:Q("extends",it),_export:Q("export"),_import:Q("import",Ve),_null:Q("null",Ve),_true:Q("true",Ve),_false:Q("false",Ve),_in:Q("in",{beforeExpr:!0,binop:7}),_instanceof:Q("instanceof",{beforeExpr:!0,binop:7}),_typeof:Q("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:Q("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:Q("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Be=/\r\n?|\n|\u2028|\u2029/,Jf=new RegExp(Be.source,"g");function ui(e){return e===10||e===13||e===8232||e===8233}function Bc(e,t,i){i===void 0&&(i=e.length);for(var a=t;a<i;a++){var o=e.charCodeAt(a);if(ui(o))return a<i-1&&o===13&&e.charCodeAt(a+1)===10?a+2:a+1}return-1}var jc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,Se=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,Uc=Object.prototype,Xf=Uc.hasOwnProperty,Zf=Uc.toString,pi=Object.hasOwn||(function(e,t){return Xf.call(e,t)}),Pc=Array.isArray||(function(e){return Zf.call(e)==="[object Array]"}),Nc=Object.create(null);function Ot(e){return Nc[e]||(Nc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function At(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var em=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,Bi=function(t,i){this.line=t,this.column=i};Bi.prototype.offset=function(t){return new Bi(this.line,this.column+t)};var Rr=function(t,i,a){this.start=i,this.end=a,t.sourceFile!==null&&(this.source=t.sourceFile)};function zc(e,t){for(var i=1,a=0;;){var o=Bc(e,a,t);if(o<0)return new Bi(i,t-a);++i,a=o}}var Ka={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},Rc=!1;function tm(e){var t={};for(var i in Ka)t[i]=e&&pi(e,i)?e[i]:Ka[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!Rc&&typeof console=="object"&&console.warn&&(Rc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),Pc(t.onToken)){var a=t.onToken;t.onToken=function(o){return a.push(o)}}if(Pc(t.onComment)&&(t.onComment=im(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function im(e,t){return function(i,a,o,h,d,g){var y={type:i?"Block":"Line",value:a,start:o,end:h};e.locations&&(y.loc=new Rr(this,d,g)),e.ranges&&(y.range=[o,h]),t.push(y)}}var Wt=1,Gt=2,Xa=4,Hc=8,Za=16,Wc=32,Mr=64,Gc=128,qt=256,ji=512,qc=1024,Or=Wt|Gt|qt;function en(e,t){return Gt|(e?Xa:0)|(t?Hc:0)}var Lr=0,tn=1,_t=2,Kc=3,Yc=4,Qc=5,be=function(t,i,a){this.options=t=tm(t),this.sourceFile=t.sourceFile,this.keywords=Ot(Kf[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var o="";t.allowReserved!==!0&&(o=Ha[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(o+=" await")),this.reservedWords=Ot(o);var h=(o?o+" ":"")+Ha.strict;this.reservedWordsStrict=Ot(h),this.reservedWordsStrictBind=Ot(h+" "+Ha.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=a||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):a?(this.lineStart=this.input.lastIndexOf(`
`,a-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Be).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?Gt:Wt),this.regexpState=null,this.privateNameStack=[]},at={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};be.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};at.inFunction.get=function(){return(this.currentVarScope().flags&Gt)>0};at.inGenerator.get=function(){return(this.currentVarScope().flags&Hc)>0};at.inAsync.get=function(){return(this.currentVarScope().flags&Xa)>0};at.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(qt|ji))return!1;if(i&Gt)return(i&Xa)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};at.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&Wt)};at.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&Mr)>0||this.options.allowSuperOutsideMethod};at.allowDirectSuper.get=function(){return(this.currentThisScope().flags&Gc)>0};at.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};at.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(qt|ji)||i&Gt&&!(i&Za))return!0}return!1};at.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&qc||!this.inModule&&t&Wt)};at.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&qt)>0};be.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var a=this,o=0;o<t.length;o++)a=t[o](a);return a};be.parse=function(t,i){return new this(i,t).parse()};be.parseExpressionAt=function(t,i,a){var o=new this(a,t,i);return o.nextToken(),o.parseExpression()};be.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(be.prototype,at);var Le=be.prototype,rm=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;Le.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){Se.lastIndex=e,e+=Se.exec(this.input)[0].length;var t=rm.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){Se.lastIndex=e+t[0].length;var i=Se.exec(this.input),a=i.index+i[0].length,o=this.input.charAt(a);return o===";"||o==="}"||Be.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(o)||o==="!"&&this.input.charAt(a+1)==="=")}e+=t[0].length,Se.lastIndex=e,e+=Se.exec(this.input)[0].length,this.input[e]===";"&&e++}};Le.eat=function(e){return this.type===e?(this.next(),!0):!1};Le.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};Le.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};Le.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};Le.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};Le.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||Be.test(this.input.slice(this.lastTokEnd,this.start))};Le.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};Le.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};Le.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};Le.expect=function(e){this.eat(e)||this.unexpected()};Le.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var Fr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};Le.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};Le.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,a=e.doubleProto;if(!t)return i>=0||a>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),a>=0&&this.raiseRecoverable(a,"Redefinition of __proto__ property")};Le.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};Le.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var R=be.prototype;R.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var a=0,o=Object.keys(this.undefinedExports);a<o.length;a+=1){var h=o[a];this.raiseRecoverable(this.undefinedExports[h].start,"Export '"+h+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var rn={kind:"loop"},am={kind:"switch"};R.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;Se.lastIndex=this.pos;var t=Se.exec(this.input),i=this.pos+t[0].length,a=this.fullCharCodeAt(i);if(a===91||a===92)return!0;if(e)return!1;if(a===123)return!0;if(bt(a)){var o=i;do i+=a<=65535?1:2;while(Ft(a=this.fullCharCodeAt(i)));if(a===92)return!0;var h=this.input.slice(o,i);if(!Vc.test(h))return!0}return!1};R.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;Se.lastIndex=this.pos;var e=Se.exec(this.input),t=this.pos+e[0].length,i;return!Be.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(Ft(i=this.fullCharCodeAt(t+8))||i===92))};R.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;Se.lastIndex=this.pos;var i=Se.exec(this.input),a=this.pos+i[0].length;if(Be.test(this.input.slice(this.pos,a)))return!1;if(e){var o=a+5,h;if(this.input.slice(a,o)!=="using"||o===this.input.length||Ft(h=this.fullCharCodeAt(o))||h===92)return!1;Se.lastIndex=o;var d=Se.exec(this.input);if(a=o+d[0].length,d&&Be.test(this.input.slice(o,a)))return!1}var g=this.fullCharCodeAt(a);if(!bt(g)&&g!==92)return!1;var y=a;do a+=g<=65535?1:2;while(Ft(g=this.fullCharCodeAt(a)));if(g===92)return!0;var b=this.input.slice(y,a);if(Vc.test(b))return!1;if(t&&!e&&b==="of"){Se.lastIndex=a;var v=Se.exec(this.input);if(a=a+v[0].length,this.input.charCodeAt(a)!==61||(g=this.input.charCodeAt(a+1))===61||g===62)return!1}return!0};R.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};R.isUsing=function(e){return this.isUsingKeyword(!1,e)};R.parseStatement=function(e,t,i){var a=this.type,o=this.startNode(),h;switch(this.isLet(e)&&(a=m._var,h="let"),a){case m._break:case m._continue:return this.parseBreakContinueStatement(o,a.keyword);case m._debugger:return this.parseDebuggerStatement(o);case m._do:return this.parseDoStatement(o);case m._for:return this.parseForStatement(o);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(o,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(o,!0);case m._if:return this.parseIfStatement(o);case m._return:return this.parseReturnStatement(o);case m._switch:return this.parseSwitchStatement(o);case m._throw:return this.parseThrowStatement(o);case m._try:return this.parseTryStatement(o);case m._const:case m._var:return h=h||this.value,e&&h!=="var"&&this.unexpected(),this.parseVarStatement(o,h);case m._while:return this.parseWhileStatement(o);case m._with:return this.parseWithStatement(o);case m.braceL:return this.parseBlock(!0,o);case m.semi:return this.parseEmptyStatement(o);case m._export:case m._import:if(this.options.ecmaVersion>10&&a===m._import){Se.lastIndex=this.pos;var d=Se.exec(this.input),g=this.pos+d[0].length,y=this.input.charCodeAt(g);if(y===40||y===46)return this.parseExpressionStatement(o,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),a===m._import?this.parseImport(o):this.parseExport(o,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(o,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(o,!1,b),this.semicolon(),this.finishNode(o,"VariableDeclaration");var v=this.value,C=this.parseExpression();return a===m.name&&C.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(o,v,C,e):this.parseExpressionStatement(o,C)}};R.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var a=0;a<this.labels.length;++a){var o=this.labels[a];if((e.label==null||o.name===e.label.name)&&(o.kind!=null&&(i||o.kind==="loop")||e.label&&i))break}return a===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};R.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};R.parseDoStatement=function(e){return this.next(),this.labels.push(rn),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};R.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(rn),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var a=this.startNode(),o=i?"let":this.value;return this.next(),this.parseVar(a,!0,o),this.finishNode(a,"VariableDeclaration"),this.parseForAfterInit(e,a,t)}var h=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var y=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(y,!0,g),this.finishNode(y,"VariableDeclaration"),this.parseForAfterInit(e,y,t)}var b=this.containsEsc,v=new Fr,C=this.start,w=t>-1?this.parseExprSubscripts(v,"await"):this.parseExpression(!0,v);return this.type===m._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(w.start===C&&!b&&w.type==="Identifier"&&w.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),h&&d&&this.raise(w.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(w,!1,v),this.checkLValPattern(w),this.parseForIn(e,w)):(this.checkExpressionErrors(v,!0),t>-1&&this.unexpected(t),this.parseFor(e,w))};R.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};R.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,Vi|(i?0:Ya),!1,t)};R.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};R.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};R.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(am),this.enterScope(qc);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var a=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),a?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};R.parseThrowStatement=function(e){return this.next(),Be.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var nm=[];R.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?Wc:0),this.checkLValPattern(e,t?Yc:_t),this.expect(m.parenR),e};R.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};R.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};R.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(rn),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};R.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};R.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};R.parseLabeledStatement=function(e,t,i,a){for(var o=0,h=this.labels;o<h.length;o+=1){var d=h[o];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,y=this.labels.length-1;y>=0;y--){var b=this.labels[y];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(a?a.indexOf("label")===-1?a+"label":a:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};R.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};R.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var a=this.parseStatement(null);t.body.push(a)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};R.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};R.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};R.parseVar=function(e,t,i,a){for(e.declarations=[],e.kind=i;;){var o=this.startNode();if(this.parseVarId(o,i),this.eat(m.eq)?o.init=this.parseMaybeAssign(t):!a&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!a&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!a&&o.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):o.init=null,e.declarations.push(this.finishNode(o,"VariableDeclarator")),!this.eat(m.comma))break}return e};R.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?tn:_t,!1)};var Vi=1,Ya=2,Jc=4;R.parseFunction=function(e,t,i,a,o){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!a)&&(this.type===m.star&&t&Ya&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!a),t&Vi&&(e.id=t&Jc&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&Ya)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?tn:_t:Kc));var h=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(en(e.async,e.generator)),t&Vi||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,o),this.yieldPos=h,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&Vi?"FunctionDeclaration":"FunctionExpression")};R.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};R.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var a=this.enterClassBody(),o=this.startNode(),h=!1;for(o.body=[],this.expect(m.braceL);this.type!==m.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(o.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(h&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),h=!0):d.key&&d.key.type==="PrivateIdentifier"&&sm(a,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(o,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};R.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),a="",o=!1,h=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:a="static"}if(i.static=g,!a&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?h=!0:a="async"),!a&&(t>=9||!h)&&this.eat(m.star)&&(o=!0),!a&&!h&&!o){var y=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=y:a=y)}if(a?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=a,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||d!=="method"||o||h){var b=!i.static&&$r(i,"constructor"),v=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,o,h,v)}else this.parseClassField(i);return i};R.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};R.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};R.parseClassMethod=function(e,t,i,a){var o=e.key;e.kind==="constructor"?(t&&this.raise(o.start,"Constructor can't be a generator"),i&&this.raise(o.start,"Constructor can't be an async method")):e.static&&$r(e,"prototype")&&this.raise(o.start,"Classes may not have a static property named prototype");var h=e.value=this.parseMethod(t,i,a);return e.kind==="get"&&h.params.length!==0&&this.raiseRecoverable(h.start,"getter should have no params"),e.kind==="set"&&h.params.length!==1&&this.raiseRecoverable(h.start,"setter should have exactly one param"),e.kind==="set"&&h.params[0].type==="RestElement"&&this.raiseRecoverable(h.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};R.parseClassField=function(e){return $r(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&$r(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(ji|Mr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};R.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(qt|Mr);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};R.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,_t,!1)):(t===!0&&this.unexpected(),e.id=null)};R.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};R.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};R.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var a=this.privateNameStack.length,o=a===0?null:this.privateNameStack[a-1],h=0;h<i.length;++h){var d=i[h];pi(t,d.name)||(o?o.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function sm(e,t){var i=t.key.name,a=e[i],o="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(o=(t.static?"s":"i")+t.kind),a==="iget"&&o==="iset"||a==="iset"&&o==="iget"||a==="sget"&&o==="sset"||a==="sset"&&o==="sget"?(e[i]="true",!1):a?!0:(e[i]=o,!1)}function $r(e,t){var i=e.computed,a=e.key;return!i&&(a.type==="Identifier"&&a.name===t||a.type==="Literal"&&a.value===t)}R.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};R.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,a=e.specifiers;i<a.length;i+=1){var o=a[i];this.checkUnreserved(o.local),this.checkLocalExport(o.local),o.local.type==="Literal"&&this.raise(o.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};R.parseExportDeclaration=function(e){return this.parseStatement(null)};R.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,Vi|Jc,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var a=this.parseMaybeAssign();return this.semicolon(),a}};R.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),pi(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};R.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var a=0,o=t.properties;a<o.length;a+=1){var h=o[a];this.checkPatternExport(e,h)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var y=g[d];y&&this.checkPatternExport(e,y)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};R.checkVariableExport=function(e,t){if(e)for(var i=0,a=t;i<a.length;i+=1){var o=a[i];this.checkPatternExport(e,o.id)}};R.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};R.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};R.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};R.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=nm,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};R.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,_t),this.finishNode(e,"ImportSpecifier")};R.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,_t),this.finishNode(e,"ImportDefaultSpecifier")};R.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,_t),this.finishNode(e,"ImportNamespaceSpecifier")};R.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};R.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var a=this.parseImportAttribute(),o=a.key.type==="Identifier"?a.key.name:a.key.value;pi(t,o)&&this.raiseRecoverable(a.key.start,"Duplicate attribute key '"+o+"'"),t[o]=!0,e.push(a)}return e};R.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};R.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return em.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};R.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};R.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var nt=be.prototype;nt.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var a=0,o=e.properties;a<o.length;a+=1){var h=o[a];this.toAssignable(h,t),h.type==="RestElement"&&(h.argument.type==="ArrayPattern"||h.argument.type==="ObjectPattern")&&this.raise(h.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};nt.toAssignableList=function(e,t){for(var i=e.length,a=0;a<i;a++){var o=e[a];o&&this.toAssignable(o,t)}if(i){var h=e[i-1];this.options.ecmaVersion===6&&t&&h&&h.type==="RestElement"&&h.argument.type!=="Identifier"&&this.unexpected(h.argument.start)}return e};nt.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};nt.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};nt.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};nt.parseBindingList=function(e,t,i,a){for(var o=[],h=!0;!this.eat(e);)if(h?h=!1:this.expect(m.comma),t&&this.type===m.comma)o.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),o.push(d),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else o.push(this.parseAssignableListItem(a))}return o};nt.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};nt.parseBindingListItem=function(e){return e};nt.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var a=this.startNodeAt(e,t);return a.left=i,a.right=this.parseMaybeAssign(),this.finishNode(a,"AssignmentPattern")};nt.checkLValSimple=function(e,t,i){t===void 0&&(t=Lr);var a=t!==Lr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(a?"Binding ":"Assigning to ")+e.name+" in strict mode"),a&&(t===_t&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(pi(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==Qc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":a&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return a&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(a?"Binding":"Assigning to")+" rvalue")}};nt.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=Lr),e.type){case"ObjectPattern":for(var a=0,o=e.properties;a<o.length;a+=1){var h=o[a];this.checkLValInnerPattern(h,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var y=g[d];y&&this.checkLValInnerPattern(y,t,i)}break;default:this.checkLValSimple(e,t,i)}};nt.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=Lr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var ut=function(t,i,a,o,h){this.token=t,this.isExpr=!!i,this.preserveSpace=!!a,this.override=o,this.generator=!!h},oe={b_stat:new ut("{",!1),b_expr:new ut("{",!0),b_tmpl:new ut("${",!1),p_stat:new ut("(",!1),p_expr:new ut("(",!0),q_tmpl:new ut("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new ut("function",!1),f_expr:new ut("function",!0),f_expr_gen:new ut("function",!0,!1,null,!0),f_gen:new ut("function",!1,!1,null,!0)},hi=be.prototype;hi.initialContext=function(){return[oe.b_stat]};hi.curContext=function(){return this.context[this.context.length-1]};hi.braceIsBlock=function(e){var t=this.curContext();return t===oe.f_expr||t===oe.f_stat?!0:e===m.colon&&(t===oe.b_stat||t===oe.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?Be.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===oe.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};hi.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};hi.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};hi.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===oe.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?oe.b_stat:oe.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(oe.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?oe.p_stat:oe.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==oe.p_stat)&&!(e===m._return&&Be.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===oe.b_stat)?this.context.push(oe.f_expr):this.context.push(oe.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===oe.q_tmpl?this.context.pop():this.context.push(oe.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===oe.f_expr?this.context[t]=oe.f_expr_gen:this.context[t]=oe.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var V=be.prototype;V.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var a=e.key,o;switch(a.type){case"Identifier":o=a.name;break;case"Literal":o=String(a.value);break;default:return}var h=e.kind;if(this.options.ecmaVersion>=6){o==="__proto__"&&h==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=a.start):this.raiseRecoverable(a.start,"Redefinition of __proto__ property")),t.proto=!0);return}o="$"+o;var d=t[o];if(d){var g;h==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[h],g&&this.raiseRecoverable(a.start,"Redefinition of property")}else d=t[o]={init:!1,get:!1,set:!1};d[h]=!0}};V.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var a=i.start,o=i.startLoc,h=i.parseMaybeAssign(e,t);if(i.type===m.comma){var d=i.startNodeAt(a,o);for(d.expressions=[h];i.eat(m.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return h})};V.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var a=!1,o=-1,h=-1,d=-1;t?(o=t.parenthesizedAssign,h=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new Fr,a=!0);var g=this.start,y=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,y)),this.type.isAssign){var v=this.startNodeAt(g,y);return v.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),a||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),v.left=b,this.next(),v.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(v,"AssignmentExpression")}else a&&this.checkExpressionErrors(t,!0);return o>-1&&(t.parenthesizedAssign=o),h>-1&&(t.trailingComma=h),b};V.parseMaybeConditional=function(e,t){var i=this.start,a=this.startLoc,o=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return o;if(!(o.type==="ArrowFunctionExpression"&&o.start===i)&&this.eat(m.question)){var h=this.startNodeAt(i,a);return h.test=o,h.consequent=this.parseMaybeAssign(),this.expect(m.colon),h.alternate=this.parseMaybeAssign(e),this.finishNode(h,"ConditionalExpression")}return o};V.parseExprOps=function(e,t){var i=this.start,a=this.startLoc,o=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||o.start===i&&o.type==="ArrowFunctionExpression"?o:this.parseExprOp(o,i,a,-1,e)};V.parseExprOp=function(e,t,i,a,o){var h=this.type.binop;if(h!=null&&(!o||this.type!==m._in)&&h>a){var d=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(h=m.logicalAND.binop);var y=this.value;this.next();var b=this.start,v=this.startLoc,C=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,o),b,v,h,o),w=this.buildBinary(t,i,e,C,y,d||g);return(d&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(w,t,i,a,o)}return e};V.buildBinary=function(e,t,i,a,o,h){a.type==="PrivateIdentifier"&&this.raise(a.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=o,d.right=a,this.finishNode(d,h?"LogicalExpression":"BinaryExpression")};V.parseMaybeUnary=function(e,t,i,a){var o=this.start,h=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(a),t=!0;else if(this.type.prefix){var g=this.startNode(),y=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,y,a),this.checkExpressionErrors(e,!0),y?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Xc(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&Qa(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,y?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(a||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,a),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(o,h);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===o)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(o,h,d,this.parseMaybeUnary(null,!1,!1,a),"**",!1);else return d};function Xc(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Xc(e.expression)}function Qa(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&Qa(e.expression)||e.type==="ParenthesizedExpression"&&Qa(e.expression)}V.parseExprSubscripts=function(e,t){var i=this.start,a=this.startLoc,o=this.parseExprAtom(e,t);if(o.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return o;var h=this.parseSubscripts(o,i,a,!1,t);return e&&h.type==="MemberExpression"&&(e.parenthesizedAssign>=h.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=h.start&&(e.parenthesizedBind=-1),e.trailingComma>=h.start&&(e.trailingComma=-1)),h};V.parseSubscripts=function(e,t,i,a,o){for(var h=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,a,h,d,o);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var y=this.startNodeAt(t,i);y.expression=g,g=this.finishNode(y,"ChainExpression")}return g}e=g}};V.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};V.parseSubscriptAsyncArrow=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,a)};V.parseSubscript=function(e,t,i,a,o,h,d){var g=this.options.ecmaVersion>=11,y=g&&this.eat(m.questionDot);a&&y&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||y&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var v=this.startNodeAt(t,i);v.object=e,b?(v.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?v.property=this.parsePrivateIdent():v.property=this.parseIdent(this.options.allowReserved!=="never"),v.computed=!!b,g&&(v.optional=y),e=this.finishNode(v,"MemberExpression")}else if(!a&&this.eat(m.parenL)){var C=new Fr,w=this.yieldPos,E=this.awaitPos,L=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var H=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,C);if(o&&!y&&this.shouldParseAsyncArrow())return this.checkPatternErrors(C,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=w,this.awaitPos=E,this.awaitIdentPos=L,this.parseSubscriptAsyncArrow(t,i,H,d);this.checkExpressionErrors(C,!0),this.yieldPos=w||this.yieldPos,this.awaitPos=E||this.awaitPos,this.awaitIdentPos=L||this.awaitIdentPos;var u=this.startNodeAt(t,i);u.callee=e,u.arguments=H,g&&(u.optional=y),e=this.finishNode(u,"CallExpression")}else if(this.type===m.backQuote){(y||h)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var J=this.startNodeAt(t,i);J.tag=e,J.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(J,"TaggedTemplateExpression")}return e};V.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var a,o=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),a=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(a.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(a,"Super");case m._this:return a=this.startNode(),this.next(),this.finishNode(a,"ThisExpression");case m.name:var h=this.start,d=this.startLoc,g=this.containsEsc,y=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&y.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(oe.f_expr),this.parseFunction(this.startNodeAt(h,d),0,!1,!0,t);if(o&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(h,d),[y],!1,t);if(this.options.ecmaVersion>=8&&y.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return y=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(h,d),[y],!0,t)}return y;case m.regexp:var b=this.value;return a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return a=this.startNode(),a.value=this.type===m._null?null:this.type===m._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case m.parenL:var v=this.start,C=this.parseParenAndDistinguishExpression(o,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(C)&&(e.parenthesizedAssign=v),e.parenthesizedBind<0&&(e.parenthesizedBind=v)),C;case m.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(a,"ArrayExpression");case m.braceL:return this.overrideContext(oe.b_expr),this.parseObj(!1,e);case m._function:return a=this.startNode(),this.next(),this.parseFunction(a,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};V.parseExprAtomDefault=function(){this.unexpected()};V.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};V.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};V.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};V.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};V.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};V.shouldParseArrow=function(e){return!this.canInsertSemicolon()};V.parseParenAndDistinguishExpression=function(e,t){var i=this.start,a=this.startLoc,o,h=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,y=[],b=!0,v=!1,C=new Fr,w=this.yieldPos,E=this.awaitPos,L;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),h&&this.afterTrailingComma(m.parenR,!0)){v=!0;break}else if(this.type===m.ellipsis){L=this.start,y.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else y.push(this.parseMaybeAssign(!1,C,this.parseParenItem));var H=this.lastTokEnd,u=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(y)&&this.eat(m.arrow))return this.checkPatternErrors(C,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=w,this.awaitPos=E,this.parseParenArrowList(i,a,y,t);(!y.length||v)&&this.unexpected(this.lastTokStart),L&&this.unexpected(L),this.checkExpressionErrors(C,!0),this.yieldPos=w||this.yieldPos,this.awaitPos=E||this.awaitPos,y.length>1?(o=this.startNodeAt(d,g),o.expressions=y,this.finishNodeAt(o,"SequenceExpression",H,u)):o=y[0]}else o=this.parseParenExpression();if(this.options.preserveParens){var J=this.startNodeAt(i,a);return J.expression=o,this.finishNode(J,"ParenthesizedExpression")}else return o};V.parseParenItem=function(e){return e};V.parseParenArrowList=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,a)};var om=[];V.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var a=this.start,o=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),a,o,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(a,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=om,this.finishNode(e,"NewExpression")};V.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};V.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var a=this.parseTemplateElement({isTagged:t});for(i.quasis=[a];!a.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(a=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};V.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!Be.test(this.input.slice(this.lastTokEnd,this.start))};V.parseObj=function(e,t){var i=this.startNode(),a=!0,o={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(a)a=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var h=this.parseProperty(e,t);e||this.checkPropClash(h,o,t),i.properties.push(h)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};V.parseProperty=function(e,t){var i=this.startNode(),a,o,h,d;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(h=this.start,d=this.startLoc),e||(a=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!a&&this.isAsyncProp(i)?(o=!0,a=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):o=!1,this.parsePropertyValue(i,e,a,o,h,d,t,g),this.finishNode(i,"Property")};V.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var a=e.value.start;e.kind==="get"?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};V.parsePropertyValue=function(e,t,i,a,o,h,d,g){(i||a)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,a),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||a)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||a)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=o),t?e.value=this.parseMaybeDefault(o,h,this.copyNode(e.key)):this.type===m.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(o,h,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};V.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};V.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};V.parseMethod=function(e,t,i){var a=this.startNode(),o=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(a),this.options.ecmaVersion>=6&&(a.generator=e),this.options.ecmaVersion>=8&&(a.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(en(t,a.generator)|Mr|(i?Gc:0)),this.expect(m.parenL),a.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(a,!1,!0,!1),this.yieldPos=o,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(a,"FunctionExpression")};V.parseArrowExpression=function(e,t,i,a){var o=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.enterScope(en(i,!1)|Za),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,a),this.yieldPos=o,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};V.parseFunctionBody=function(e,t,i,a){var o=t&&this.type!==m.braceL,h=this.strict,d=!1;if(o)e.body=this.parseMaybeAssign(a),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!h||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var y=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!h&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,Qc),e.body=this.parseBlock(!1,void 0,d&&!h),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=y}this.exitScope()};V.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var a=i[t];if(a.type!=="Identifier")return!1}return!0};V.checkParams=function(e,t){for(var i=Object.create(null),a=0,o=e.params;a<o.length;a+=1){var h=o[a];this.checkLValInnerPattern(h,tn,t?null:i)}};V.parseExprList=function(e,t,i,a){for(var o=[],h=!0;!this.eat(e);){if(h)h=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===m.comma?d=null:this.type===m.ellipsis?(d=this.parseSpread(a),a&&this.type===m.comma&&a.trailingComma<0&&(a.trailingComma=this.start)):d=this.parseMaybeAssign(!1,a),o.push(d)}return o};V.checkUnreserved=function(e){var t=e.start,i=e.end,a=e.name;if(this.inGenerator&&a==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&Or)&&a==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(a==="arguments"||a==="await")&&this.raise(t,"Cannot use "+a+" in class static initialization block"),this.keywords.test(a)&&this.raise(t,"Unexpected keyword '"+a+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var o=this.strict?this.reservedWordsStrict:this.reservedWords;o.test(a)&&(!this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+a+"' is reserved"))}};V.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};V.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};V.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};V.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};V.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var Pr=be.prototype;Pr.raise=function(e,t){var i=zc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var a=new SyntaxError(t);throw a.pos=e,a.loc=i,a.raisedAt=this.pos,a};Pr.raiseRecoverable=Pr.raise;Pr.curPosition=function(){if(this.options.locations)return new Bi(this.curLine,this.pos-this.lineStart)};var Dt=be.prototype,lm=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};Dt.enterScope=function(e){this.scopeStack.push(new lm(e))};Dt.exitScope=function(){this.scopeStack.pop()};Dt.treatFunctionsAsVarInScope=function(e){return e.flags&Gt||!this.inModule&&e.flags&Wt};Dt.declareName=function(e,t,i){var a=!1;if(t===_t){var o=this.currentScope();a=o.lexical.indexOf(e)>-1||o.functions.indexOf(e)>-1||o.var.indexOf(e)>-1,o.lexical.push(e),this.inModule&&o.flags&Wt&&delete this.undefinedExports[e]}else if(t===Yc){var h=this.currentScope();h.lexical.push(e)}else if(t===Kc){var d=this.currentScope();this.treatFunctionsAsVar?a=d.lexical.indexOf(e)>-1:a=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var y=this.scopeStack[g];if(y.lexical.indexOf(e)>-1&&!(y.flags&Wc&&y.lexical[0]===e)||!this.treatFunctionsAsVarInScope(y)&&y.functions.indexOf(e)>-1){a=!0;break}if(y.var.push(e),this.inModule&&y.flags&Wt&&delete this.undefinedExports[e],y.flags&Or)break}a&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};Dt.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};Dt.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};Dt.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(Or|ji|qt))return t}};Dt.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(Or|ji|qt)&&!(t.flags&Za))return t}};var Dr=function(t,i,a){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new Rr(t,a)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},Ui=be.prototype;Ui.startNode=function(){return new Dr(this,this.start,this.startLoc)};Ui.startNodeAt=function(e,t){return new Dr(this,e,t)};function Zc(e,t,i,a){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=a),this.options.ranges&&(e.range[1]=i),e}Ui.finishNode=function(e,t){return Zc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};Ui.finishNodeAt=function(e,t,i,a){return Zc.call(this,e,t,i,a)};Ui.copyNode=function(e){var t=new Dr(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var cm="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",eu="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",tu=eu+" Extended_Pictographic",iu=tu,ru=iu+" EBase EComp EMod EPres ExtPict",au=ru,um=au,pm={9:eu,10:tu,11:iu,12:ru,13:au,14:um},hm="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",dm={9:"",10:"",11:"",12:"",13:"",14:hm},Mc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",nu="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",su=nu+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",ou=su+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",lu=ou+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",cu=lu+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",fm=cu+" "+cm,mm={9:nu,10:su,11:ou,12:lu,13:cu,14:fm},uu={};function gm(e){var t=uu[e]={binary:Ot(pm[e]+" "+Mc),binaryOfStrings:Ot(dm[e]),nonBinary:{General_Category:Ot(Mc),Script:Ot(mm[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(Ir=0,Ga=[9,10,11,12,13,14];Ir<Ga.length;Ir+=1)Oc=Ga[Ir],gm(Oc);var Oc,Ir,Ga,N=be.prototype,Nr=function(t,i){this.parent=t,this.base=i||this};Nr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var a=t;a;a=a.parent)if(i.base===a.base&&i!==a)return!0;return!1};Nr.prototype.sibling=function(){return new Nr(this.parent,this.base)};var xt=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=uu[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};xt.prototype.reset=function(t,i,a){var o=a.indexOf("v")!==-1,h=a.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=a,o&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=h&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=h&&this.parser.options.ecmaVersion>=9)};xt.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};xt.prototype.at=function(t,i){i===void 0&&(i=!1);var a=this.source,o=a.length;if(t>=o)return-1;var h=a.charCodeAt(t);if(!(i||this.switchU)||h<=55295||h>=57344||t+1>=o)return h;var d=a.charCodeAt(t+1);return d>=56320&&d<=57343?(h<<10)+d-56613888:h};xt.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var a=this.source,o=a.length;if(t>=o)return o;var h=a.charCodeAt(t),d;return!(i||this.switchU)||h<=55295||h>=57344||t+1>=o||(d=a.charCodeAt(t+1))<56320||d>57343?t+1:t+2};xt.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};xt.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};xt.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};xt.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};xt.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var a=this.pos,o=0,h=t;o<h.length;o+=1){var d=h[o],g=this.at(a,i);if(g===-1||g!==d)return!1;a=this.nextIndex(a,i)}return this.pos=a,!0};N.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,a=!1,o=!1,h=0;h<i.length;h++){var d=i.charAt(h);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,h+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(a=!0),d==="v"&&(o=!0)}this.options.ecmaVersion>=15&&a&&o&&this.raise(e.start,"Invalid regular expression flag")};function bm(e){for(var t in e)return!0;return!1}N.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&bm(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};N.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var a=i[t];e.groupNames[a]||e.raise("Invalid named capture referenced")}};N.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new Nr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};N.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};N.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};N.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};N.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};N.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};N.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var a=0,o=-1;if(this.regexp_eatDecimalDigits(e)&&(a=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(o=e.lastIntValue),e.eat(125)))return o!==-1&&o<a&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};N.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};N.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};N.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),a=e.eat(45);if(i||a){for(var o=0;o<i.length;o++){var h=i.charAt(o);i.indexOf(h,o+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(a){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var y=d.charAt(g);(d.indexOf(y,g+1)>-1||i.indexOf(y)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};N.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};N.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&xm(i);)t+=At(i),e.advance();return t};function xm(e){return e===105||e===109||e===115}N.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};N.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};N.regexp_eatSyntaxCharacter=function(e){var t=e.current();return pu(t)?(e.lastIntValue=t,e.advance(),!0):!1};function pu(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}N.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!pu(i);)e.advance();return e.pos!==t};N.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};N.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var a=0,o=i;a<o.length;a+=1){var h=o[a];h.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};N.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};N.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=At(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=At(e.lastIntValue);return!0}return!1};N.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),ym(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function ym(e){return bt(e,!0)||e===36||e===95}N.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),vm(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function vm(e){return Ft(e,!0)||e===36||e===95||e===8204||e===8205}N.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};N.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};N.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};N.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};N.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};N.regexp_eatZero=function(e){return e.current()===48&&!Vr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};N.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};N.regexp_eatControlLetter=function(e){var t=e.current();return hu(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function hu(e){return e>=65&&e<=90||e>=97&&e<=122}N.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,a=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var o=e.lastIntValue;if(a&&o>=55296&&o<=56319){var h=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(o-55296)*1024+(d-56320)+65536,!0}e.pos=h,e.lastIntValue=o}return!0}if(a&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&km(e.lastIntValue))return!0;a&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function km(e){return e>=0&&e<=1114111}N.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};N.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var du=0,Tt=1,rt=2;N.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Sm(t))return e.lastIntValue=-1,e.advance(),Tt;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var a;if(e.eat(123)&&(a=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&a===rt&&e.raise("Invalid property name"),a;e.raise("Invalid property name")}return du};function Sm(e){return e===100||e===68||e===115||e===83||e===119||e===87}N.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var a=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,a),Tt}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var o=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,o)}return du};N.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){pi(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};N.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return Tt;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return rt;e.raise("Invalid property name")};N.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";fu(t=e.current());)e.lastStringValue+=At(t),e.advance();return e.lastStringValue!==""};function fu(e){return hu(e)||e===95}N.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";wm(t=e.current());)e.lastStringValue+=At(t),e.advance();return e.lastStringValue!==""};function wm(e){return fu(e)||Vr(e)}N.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};N.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===rt&&e.raise("Negated character class may contain strings"),!0}return!1};N.regexp_classContents=function(e){return e.current()===93?Tt:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),Tt)};N.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};N.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||bu(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var a=e.current();return a!==93?(e.lastIntValue=a,e.advance(),!0):!1};N.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};N.regexp_classSetExpression=function(e){var t=Tt,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===rt&&(t=rt);for(var a=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==rt&&(t=Tt);continue}e.raise("Invalid character in character class")}if(a!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(a!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===rt&&(t=rt)}};N.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var a=e.lastIntValue;return i!==-1&&a!==-1&&i>a&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};N.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?Tt:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};N.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),a=this.regexp_classContents(e);if(e.eat(93))return i&&a===rt&&e.raise("Negated character class may contain strings"),a;e.pos=t}if(e.eat(92)){var o=this.regexp_eatCharacterClassEscape(e);if(o)return o;e.pos=t}return null};N.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};N.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===rt&&(t=rt);return t};N.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?Tt:rt};N.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&Cm(i)||Em(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function Cm(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function Em(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}N.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return Am(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Am(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}N.regexp_eatClassControlLetter=function(e){var t=e.current();return Vr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};N.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};N.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Vr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function Vr(e){return e>=48&&e<=57}N.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;mu(i=e.current());)e.lastIntValue=16*e.lastIntValue+gu(i),e.advance();return e.pos!==t};function mu(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function gu(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}N.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};N.regexp_eatOctalDigit=function(e){var t=e.current();return bu(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function bu(e){return e>=48&&e<=55}N.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var a=0;a<t;++a){var o=e.current();if(!mu(o))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+gu(o),e.advance()}return!0};var an=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new Rr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},q=be.prototype;q.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new an(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};q.getToken=function(){return this.next(),new an(this)};typeof Symbol<"u"&&(q[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});q.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};q.readToken=function(e){return bt(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};q.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};q.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};q.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var a=void 0,o=t;(a=Bc(this.input,o,this.pos))>-1;)++this.curLine,o=this.lineStart=a;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};q.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),a=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!ui(a);)a=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};q.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&jc.test(String.fromCharCode(e)))++this.pos;else break e}}};q.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};q.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};q.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};q.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,a=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,a=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(a,i)};q.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};q.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};q.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Be.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};q.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};q.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};q.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var a=this.input.charCodeAt(this.pos+2);if(a===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};q.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),bt(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+At(t)+"'")};q.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+At(e)+"'")};q.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};q.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var a=this.input.charAt(this.pos);if(Be.test(a)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(a==="[")t=!0;else if(a==="]"&&t)t=!1;else if(a==="/"&&!t)break;e=a==="\\"}++this.pos}var o=this.input.slice(i,this.pos);++this.pos;var h=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(h);var g=this.regexpState||(this.regexpState=new xt(this));g.reset(i,o,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var y=null;try{y=new RegExp(o,d)}catch{}return this.finishToken(m.regexp,{pattern:o,flags:d,value:y})};q.readInt=function(e,t,i){for(var a=this.options.ecmaVersion>=12&&t===void 0,o=i&&this.input.charCodeAt(this.pos)===48,h=this.pos,d=0,g=0,y=0,b=t??1/0;y<b;++y,++this.pos){var v=this.input.charCodeAt(this.pos),C=void 0;if(a&&v===95){o&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),y===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=v;continue}if(v>=97?C=v-97+10:v>=65?C=v-65+10:v>=48&&v<=57?C=v-48:C=1/0,C>=e)break;g=v,d=d*e+C}return a&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===h||t!=null&&this.pos-h!==t?null:d};function Tm(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function xu(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}q.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=xu(this.input.slice(t,this.pos)),++this.pos):bt(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};q.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var a=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&a===110){var o=xu(this.input.slice(t,this.pos));return++this.pos,bt(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,o)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),a===46&&!i&&(++this.pos,this.readInt(10),a=this.input.charCodeAt(this.pos)),(a===69||a===101)&&!i&&(a=this.input.charCodeAt(++this.pos),(a===43||a===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),bt(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var h=Tm(this.input.slice(t,this.pos),i);return this.finishToken(m.num,h)};q.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};q.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var a=this.input.charCodeAt(this.pos);if(a===e)break;a===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):a===8232||a===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(ui(a)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var yu={};q.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===yu)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};q.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw yu;this.raise(e,t)};q.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(ui(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};q.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};q.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return At(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var a=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],o=parseInt(a,8);return o>255&&(a=a.slice(0,-1),o=parseInt(a,8)),this.pos+=a.length-1,t=this.input.charCodeAt(this.pos),(a!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-a.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(o)}return ui(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};q.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};q.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,a=this.options.ecmaVersion>=6;this.pos<this.input.length;){var o=this.fullCharCodeAtPos();if(Ft(o,a))this.pos+=o<=65535?1:2;else if(o===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var h=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?bt:Ft)(d,a)||this.invalidStringToken(h,"Invalid Unicode escape"),e+=At(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};q.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=Ja[e]),this.finishToken(t,e)};var _m="8.18.0";be.acorn={Parser:be,version:_m,defaultOptions:Ka,Position:Bi,SourceLocation:Rr,getLineInfo:zc,Node:Dr,TokenType:X,tokTypes:m,keywordTypes:Ja,TokContext:ut,tokContexts:oe,isIdentifierChar:Ft,isIdentifierStart:bt,Token:an,isNewLine:ui,lineBreak:Be,lineBreakG:Jf,nonASCIIwhitespace:jc};function vu(e,t){return be.parse(e,t)}var di=null,zi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let a;return di!==null?(a=di,di=di.cursor,a.prev=t,a.next=i,a.cursor=this.cursor):a={prev:t,next:i,cursor:this.cursor},this.cursor=a,a}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=di,di=t}updateCursors(t,i,a,o){let{cursor:h}=this;for(;h!==null;)h.prev===t&&(h.prev=i),h.next===a&&(h.next=o),h=h.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let a of t){let o=e.createItem(a);i!==null?i.next=o:this.head=o,o.prev=i,i=o}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let a=this.allocateCursor(null,this.head);for(;a.next!==null;){let o=a.next;a.next=o.next,t.call(i,o.data,o,this)}this.releaseCursor()}forEachRight(t,i=this){let a=this.allocateCursor(this.tail,null);for(;a.prev!==null;){let o=a.prev;a.prev=o.prev,t.call(i,o.data,o,this)}this.releaseCursor()}reduce(t,i,a=this){let o=this.allocateCursor(null,this.head),h=i,d;for(;o.next!==null;)d=o.next,o.next=d.next,h=t.call(a,h,d.data,d,this);return this.releaseCursor(),h}reduceRight(t,i,a=this){let o=this.allocateCursor(this.tail,null),h=i,d;for(;o.prev!==null;)d=o.prev,o.prev=d.prev,h=t.call(a,h,d.data,d,this);return this.releaseCursor(),h}some(t,i=this){for(let a=this.head;a!==null;a=a.next)if(t.call(i,a.data,a,this))return!0;return!1}map(t,i=this){let a=new e;for(let o=this.head;o!==null;o=o.next)a.appendData(t.call(i,o.data,o,this));return a}filter(t,i=this){let a=new e;for(let o=this.head;o!==null;o=o.next)t.call(i,o.data,o,this)&&a.appendData(o.data);return a}nextUntil(t,i,a=this){if(t===null)return;let o=this.allocateCursor(null,t);for(;o.next!==null;){let h=o.next;if(o.next=h.next,i.call(a,h.data,h,this))break}this.releaseCursor()}prevUntil(t,i,a=this){if(t===null)return;let o=this.allocateCursor(t,null);for(;o.prev!==null;){let h=o.prev;if(o.prev=h.prev,i.call(a,h.data,h,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function ku(e,t){let i=Object.create(SyntaxError.prototype),a=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(a.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var nn=100,Su=60,wu="    ";function Cu({source:e,line:t,column:i,baseLine:a,baseColumn:o},h){function d(L,H){return b.slice(L,H).map((u,J)=>String(L+J+1).padStart(w)+" |"+u).join(`
`)}let g=`
`.repeat(Math.max(a-1,0)),y=" ".repeat(Math.max(o-1,0)),b=(g+y+e).split(/\r\n?|\n|\f/),v=Math.max(1,t-h)-1,C=Math.min(t+h,b.length+1),w=Math.max(4,String(C).length)+1,E=0;i+=(wu.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>nn&&(E=i-Su+3,i=Su-2);for(let L=v;L<=C;L++)L>=0&&L<b.length&&(b[L]=b[L].replace(/\t/g,wu),b[L]=(E>0&&b[L].length>E?"\u2026":"")+b[L].substr(E,nn-2)+(b[L].length>E+nn-1?"\u2026":""));return[d(v,t),new Array(i+w+2).join("-")+"^",d(t,C)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function sn(e,t,i,a,o,h=1,d=1){return Object.assign(ku("SyntaxError",e),{source:t,offset:i,line:a,column:o,sourceFragment(y){return Cu({source:t,line:a,column:o,baseLine:h,baseColumn:d},isNaN(y)?0:y)},get formattedMessage(){return`Parse error: ${e}
`+Cu({source:t,line:a,column:o,baseLine:h,baseColumn:d},2)}})}function Ne(e){return e>=48&&e<=57}function yt(e){return Ne(e)||e>=65&&e<=70||e>=97&&e<=102}function jr(e){return e>=65&&e<=90}function Im(e){return e>=97&&e<=122}function Lm(e){return jr(e)||Im(e)}function $m(e){return e>=128}function Br(e){return Lm(e)||$m(e)||e===95}function Ur(e){return Br(e)||Ne(e)||e===45}function Pm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function Hi(e){return e===10||e===13||e===12}function vt(e){return Hi(e)||e===32||e===9}function je(e,t){return!(e!==92||Hi(t)||t===0)}function zr(e,t,i){return e===45?Br(t)||t===45||je(t,i):Br(e)?!0:e===92?je(e,t):!1}function Hr(e,t,i){return e===43||e===45?Ne(t)?2:t===46&&Ne(i)?3:0:e===46?Ne(t)?2:0:Ne(e)?1:0}function Wr(e){return e===65279||e===65534?1:0}var on=new Array(128),Nm=128,Wi=130,ln=131,Gr=132,cn=133;for(let e=0;e<on.length;e++)on[e]=vt(e)&&Wi||Ne(e)&&ln||Br(e)&&Gr||Pm(e)&&cn||e||Nm;function qr(e){return e<128?on[e]:Gr}function fi(e,t){return t<e.length?e.charCodeAt(t):0}function Kr(e,t,i){return i===13&&fi(e,t+1)===10?2:1}function pn(e,t,i){let a=e.charCodeAt(t);return jr(a)&&(a=a|32),a===i}function Kt(e,t,i,a){if(i-t!==a.length||t<0||i>e.length)return!1;for(let o=t;o<i;o++){let h=a.charCodeAt(o-t),d=e.charCodeAt(o);if(jr(d)&&(d=d|32),d!==h)return!1}return!0}function Eu(e,t){for(;t>=0&&vt(e.charCodeAt(t));t--);return t+1}function Gi(e,t){for(;t<e.length&&vt(e.charCodeAt(t));t++);return t}function un(e,t){for(;t<e.length&&Ne(e.charCodeAt(t));t++);return t}function It(e,t){if(t+=2,yt(fi(e,t-1))){for(let a=Math.min(e.length,t+5);t<a&&yt(fi(e,t));t++);let i=fi(e,t);vt(i)&&(t+=Kr(e,t,i))}return t}function qi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!Ur(i)){if(je(i,fi(e,t+1))){t=It(e,t)-1;continue}break}}return t}function Yr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),Ne(i)&&(t=un(e,t+1),i=e.charCodeAt(t)),i===46&&Ne(e.charCodeAt(t+1))&&(t+=2,t=un(e,t)),pn(e,t,101)){let a=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(a=1,i=e.charCodeAt(t+2)),Ne(i)&&(t=un(e,t+1+a+1))}return t}function Qr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}je(i,fi(e,t+1))&&(t=It(e,t))}return t}function Jr(e){if(e.length===1&&!yt(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var mi=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function gi(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var Au=10,Rm=12,Tu=13;function _u(e){let t=e.source,i=t.length,a=t.length>0?Wr(t.charCodeAt(0)):0,o=gi(e.lines,i),h=gi(e.columns,i),d=e.startLine,g=e.startColumn;for(let y=a;y<i;y++){let b=t.charCodeAt(y);o[y]=d,h[y]=g++,(b===Au||b===Tu||b===Rm)&&(b===Tu&&y+1<i&&t.charCodeAt(y+1)===Au&&(y++,o[y]=d,h[y]=g),d++,g=1)}o[i]=d,h[i]=g,e.lines=o,e.columns=h,e.computed=!0}var Xr=class{constructor(t,i,a,o){this.setSource(t,i,a,o),this.lines=null,this.columns=null}setSource(t="",i=0,a=1,o=1){this.source=t,this.startOffset=i,this.startLine=a,this.startColumn=o,this.computed=!1}getLocation(t,i){return this.computed||_u(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,a){return this.computed||_u(this),{source:a,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var pt=16777215,ht=24,Yi=1,ea=2,Vt=new Uint8Array(32);Vt[2]=22;Vt[21]=22;Vt[19]=20;Vt[23]=24;var dt=new Uint8Array(32);dt[2]=Yi;dt[21]=Yi;dt[19]=Yi;dt[23]=Yi;dt[22]=ea;dt[20]=ea;dt[24]=ea;function Iu(e,t,i){return e<t?t:e>i?i:e}var Zr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let a=t.length,o=gi(this.offsetAndType,t.length+1),h=gi(this.balance,t.length+1),d=0,g=-1,y=0,b=t.length;this.offsetAndType=null,this.balance=null,h.fill(0),i(t,(v,C,w)=>{let E=d++;if(o[E]=v<<ht|w,g===-1&&(g=C),h[E]=b,v===y){let L=h[b];h[b]=E,b=L,y=Vt[o[L]>>ht]}else this.isBlockOpenerTokenType(v)&&(b=E,y=Vt[v])}),o[d]=0<<ht|a,h[d]=d;for(let v=0;v<d;v++){let C=h[v];if(C<=v){let w=h[C];w!==v&&(h[v]=w)}else C>d&&(h[v]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=o,this.balance=h,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>ht:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>ht;if(a!==13&&a!==25&&t--===0)return a}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&pt:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>ht;if(a!==13&&a!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Kt(this.source,this.offsetAndType[t-1]&pt,this.offsetAndType[t]&pt,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&pt:this.offsetAndType[this.tokenCount]&pt:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[Iu(t,0,this.tokenCount)]&pt}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[Iu(t,0,this.tokenCount)]>>ht}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return dt[t]===Yi}isBlockCloserTokenType(t){return dt[t]===ea}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(dt[i]===1){let a=this.balance[t],o=this.getTokenType(a);return Vt[i]===o?a:-1}else if(dt[i]===2){let a=this.balance[t],o=this.getTokenType(a);return Vt[o]===i?a:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&pt,i=this.offsetAndType[i],this.tokenType=i>>ht,this.tokenEnd=i&pt):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>ht,this.tokenEnd=t&pt):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let a=t,o=0,h=0;e:for(;a<this.tokenCount;a++){if(o=this.balance[a],o<t)break e;switch(h=a>0?this.offsetAndType[a-1]&pt:this.firstCharOffset,i(this.source.charCodeAt(h))){case 1:break e;case 2:a++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[a]>>ht)&&(a=o)}}this.skip(a-this.tokenIndex)}forEachToken(t){for(let i=0,a=this.firstCharOffset;i<this.tokenCount;i++){let o=a,h=this.offsetAndType[i],d=h&pt,g=h>>ht;a=d,t(g,o,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,a,o,h)=>{t[h]={idx:h,type:mi[i],chunk:this.source.substring(a,o),balance:this.balance[h]}}),t}};function ta(e,t){function i(C){return C<g?e.charCodeAt(C):0}function a(){if(b=Yr(e,b),zr(i(b),i(b+1),i(b+2))){v=12,b=qi(e,b);return}if(i(b)===37){v=11,b++;return}v=10}function o(){let C=b;if(b=qi(e,b),Kt(e,C,b,"url")&&i(b)===40){if(b=Gi(e,b+1),i(b)===34||i(b)===39){v=2,b=C+4;return}d();return}if(i(b)===40){v=2,b++;return}v=1}function h(C){for(C||(C=i(b++)),v=5;b<e.length;b++){let w=e.charCodeAt(b);switch(qr(w)){case C:b++;return;case Wi:if(Hi(w)){b+=Kr(e,b,w),v=6;return}break;case 92:if(b===e.length-1)break;let E=i(b+1);Hi(E)?b+=Kr(e,b+1,E):je(w,E)&&(b=It(e,b)-1);break}}}function d(){for(v=7,b=Gi(e,b);b<e.length;b++){let C=e.charCodeAt(b);switch(qr(C)){case 41:b++;return;case Wi:if(b=Gi(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Qr(e,b),v=8;return;case 34:case 39:case 40:case cn:b=Qr(e,b),v=8;return;case 92:if(je(C,i(b+1))){b=It(e,b)-1;break}b=Qr(e,b),v=8;return}}}e=String(e||"");let g=e.length,y=Wr(i(0)),b=y,v;for(;b<g;){let C=e.charCodeAt(b);switch(qr(C)){case Wi:v=13,b=Gi(e,b+1);break;case 34:h();break;case 35:Ur(i(b+1))||je(i(b+1),i(b+2))?(v=4,b=qi(e,b+1)):(v=9,b++);break;case 39:h();break;case 40:v=21,b++;break;case 41:v=22,b++;break;case 43:Hr(C,i(b+1),i(b+2))?a():(v=9,b++);break;case 44:v=18,b++;break;case 45:Hr(C,i(b+1),i(b+2))?a():i(b+1)===45&&i(b+2)===62?(v=15,b=b+3):zr(C,i(b+1),i(b+2))?o():(v=9,b++);break;case 46:Hr(C,i(b+1),i(b+2))?a():(v=9,b++);break;case 47:i(b+1)===42?(v=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(v=9,b++);break;case 58:v=16,b++;break;case 59:v=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(v=14,b=b+4):(v=9,b++);break;case 64:zr(i(b+1),i(b+2),i(b+3))?(v=3,b=qi(e,b+1)):(v=9,b++);break;case 91:v=19,b++;break;case 92:je(C,i(b+1))?o():(v=9,b++);break;case 93:v=20,b++;break;case 123:v=23,b++;break;case 125:v=24,b++;break;case ln:a();break;case Gr:o();break;default:v=9,b++}t(v,y,y=b)}}function Lu(e){let t=this.createList(),i=!1,a={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let o=e.getNode.call(this,a);if(o===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,o,t,a),i=!1),t.push(o)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,a),t}var yi=()=>{},Mm=33,Om=35,dn=59,$u=123,Pu=0,Fm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},Dm={createList(){return new zi},createSingleNodeList(e){return new zi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function Vm(e){return function(){return this[e]()}}function fn(e){let t=Object.create(null);for(let i of Object.keys(e)){let a=e[i],o=a.parse||a;o&&(t[i]=o)}return t}function Bm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:fn(e.atrule),pseudo:fn(e.pseudo),node:fn(e.node)};for(let[i,a]of Object.entries(e.parseContext))switch(typeof a){case"function":t.context[i]=a;break;case"string":t.context[i]=Vm(a);break}return{config:t,...t,...t.node}}function Nu(e){let t="",i="<unknown>",a=!1,o=yi,h=!1,d=new Xr,g=Object.assign(new Zr,Bm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Lu,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(v){return v===$u?1:0},consumeUntilLeftCurlyBracketOrSemicolon(v){return v===$u||v===dn?1:0},consumeUntilExclamationMarkOrSemicolon(v){return v===Mm||v===dn?1:0},consumeUntilSemicolonIncluded(v){return v===dn?2:0},createList:yi,createSingleNodeList:yi,getFirstListNode:yi,getLastListNode:yi,parseWithFallback(v,C){let w=this.tokenIndex;try{return v.call(this)}catch(E){if(h)throw E;this.skip(w-this.tokenIndex);let L=C.call(this);return h=!0,o(E,L),h=!1,L}},lookupNonWSType(v){let C;do if(C=this.lookupType(v++),C!==13&&C!==25)return C;while(C!==Pu);return Pu},charCodeAt(v){return v>=0&&v<t.length?t.charCodeAt(v):0},substring(v,C){return t.substring(v,C)},substrToCursor(v){return this.source.substring(v,this.tokenStart)},cmpChar(v,C){return pn(t,v,C)},cmpStr(v,C,w){return Kt(t,v,C,w)},consume(v){let C=this.tokenStart;return this.eat(v),this.substrToCursor(C)},consumeFunctionName(){let v=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),v},consumeNumber(v){let C=t.substring(this.tokenStart,Yr(t,this.tokenStart));return this.eat(v),C},eat(v){if(this.tokenType!==v){let C=mi[v].slice(0,-6).replace(/-/g," ").replace(/^./,L=>L.toUpperCase()),w=`${/[[\](){}]/.test(C)?`"${C}"`:C} is expected`,E=this.tokenStart;switch(v){case 1:this.tokenType===2||this.tokenType===7?(E=this.tokenEnd-1,w="Identifier is expected but function found"):w="Identifier is expected";break;case 4:this.isDelim(Om)&&(this.next(),E++,w="Name is expected");break;case 11:this.tokenType===10&&(E=this.tokenEnd,w="Percent sign is expected");break}this.error(w,E)}this.next()},eatIdent(v){(this.tokenType!==1||this.lookupValue(0,v)===!1)&&this.error(`Identifier "${v}" is expected`),this.next()},eatDelim(v){this.isDelim(v)||this.error(`Delim "${String.fromCharCode(v)}" is expected`),this.next()},getLocation(v,C){return a?d.getLocationRange(v,C,i):null},getLocationFromList(v){if(a){let C=this.getFirstListNode(v),w=this.getLastListNode(v);return d.getLocationRange(C!==null?C.loc.start.offset-d.startOffset:this.tokenStart,w!==null?w.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(v,C){let w=typeof C<"u"&&C<t.length?d.getLocation(C):this.eof?d.getLocation(Eu(t,t.length-1)):d.getLocation(this.tokenStart);throw new sn(v||"Unexpected input",t,w.offset,w.line,w.column,d.startLine,d.startColumn)}}),y=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:v=>g.getTokenType(v),getTokenTypeName:v=>mi[g.getTokenType(v)],getTokenStart:v=>g.getTokenStart(v),getTokenEnd:v=>g.getTokenEnd(v),getTokenValue:v=>g.source.substring(g.getTokenStart(v),g.getTokenEnd(v)),substring:(v,C)=>g.source.substring(v,C),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:v=>g.getBlockTokenPairIndex(v),getLocation:v=>d.getLocation(v,i),getRangeLocation:(v,C)=>d.getLocationRange(v,C,i)});return Object.assign(function(v,C){t=v,C=C||{},g.setSource(t,ta),d.setSource(t,C.offset,C.line,C.column),i=C.filename||"<unknown>",a=!!C.positions,o=typeof C.onParseError=="function"?C.onParseError:yi,h=!1,g.parseAtrulePrelude="parseAtrulePrelude"in C?!!C.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in C?!!C.parseRulePrelude:!0,g.parseValue="parseValue"in C?!!C.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in C?!!C.parseCustomProperty:!1;let{context:w="default",list:E=!0,onComment:L,onToken:H}=C;if(!(w in g.context))throw new Error("Unknown context `"+w+"`");Object.assign(g,E?Dm:Fm),Array.isArray(H)?g.forEachToken((J,ee,re)=>{H.push({type:J,start:ee,end:re})}):typeof H=="function"&&g.forEachToken(H.bind(y())),typeof L=="function"&&g.forEachToken((J,ee,re)=>{if(J===25){let de=g.getLocation(ee,re),Me=Kt(t,re-2,re,"*/")?t.slice(ee+2,re-2):t.slice(ee+2,re);L(Me,de)}});let u=g.context[w].call(g,C);return g.eof||g.error(),u},{SyntaxError:sn,config:g.config})}var mn={};O(mn,{AtrulePrelude:()=>Mu,Selector:()=>Fu,Value:()=>ju});var jm=35,Um=42,Ru=43,zm=45,Hm=47,Wm=117;function Qi(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,Wm)&&this.cmpChar(this.tokenStart+1,Ru)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Hm||t===Um||t===Ru||t===zm)return this.Operator();t===jm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var Mu={getNode:Qi};var Gm=35,qm=38,Km=42,Ym=43,Qm=47,Ou=46,Jm=62,Xm=124,Zm=126;function eg(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function tg(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===Ou&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case Ym:case Jm:case Zm:case Qm:return this.Combinator();case Ou:return this.ClassSelector();case Km:case Xm:return this.TypeSelector();case Gm:return this.IdSelector();case qm:return this.NestingSelector()}break}}}var Fu={onWhiteSpace:eg,getNode:tg};function Du(){return this.createSingleNodeList(this.Raw(null,!1))}function Vu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let a=t-this.tokenIndex;a<=0;a++)if(this.lookupType(a)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function Bu(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var ju={getNode:Qi,onWhiteSpace(e,t){Bu(e)&&(e.value=" "+e.value),Bu(t.last)&&(t.last.value+=" ")},expression:Du,var:Vu};var ig=new Set(["none","and","not","or"]),Uu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);ig.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var zu={parse:{prelude:null,block(){return this.Block(!0)}}};function gn(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Hu={layer(){this.skipSC();let e=this.createList(),t=gn.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=gn.call(this,this.Declaration,()=>gn.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},Wu={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Hu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Hu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Gu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var qu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Ku={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Yu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Qu={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Ju={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Xu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Zu={container:Uu,"font-face":zu,import:Wu,layer:Gu,media:qu,nest:Ku,page:Yu,scope:Qu,"starting-style":Ju,supports:Xu};function ep(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Qt={parse(){return this.createSingleNodeList(this.SelectorList())}},bn={parse(){return this.createSingleNodeList(this.Selector())}},rg={parse(){return this.createSingleNodeList(this.Identifier())}},ag={parse:ep},ia={parse(){return this.createSingleNodeList(this.Nth())}},tp={dir:rg,has:Qt,lang:ag,matches:Qt,is:Qt,"-moz-any":Qt,"-webkit-any":Qt,where:Qt,not:Qt,"nth-child":ia,"nth-last-child":ia,"nth-last-of-type":ia,"nth-of-type":ia,slotted:bn,host:bn,"host-context":bn};var hl={};O(hl,{AnPlusB:()=>yn,Atrule:()=>Sn,AtrulePrelude:()=>En,AttributeSelector:()=>In,Block:()=>Pn,Brackets:()=>Mn,CDC:()=>Dn,CDO:()=>jn,ClassSelector:()=>Hn,Combinator:()=>qn,Comment:()=>Qn,Condition:()=>Zn,Declaration:()=>is,DeclarationList:()=>ss,Dimension:()=>cs,Feature:()=>hs,FeatureFunction:()=>ms,FeatureRange:()=>ys,Function:()=>Ss,GeneralEnclosed:()=>Es,Hash:()=>_s,IdSelector:()=>Rs,Identifier:()=>$s,Layer:()=>Fs,LayerList:()=>Bs,MediaQuery:()=>zs,MediaQueryList:()=>Gs,NestingSelector:()=>Ys,Nth:()=>Xs,Number:()=>to,Operator:()=>ao,Parentheses:()=>oo,Percentage:()=>uo,PseudoClassSelector:()=>fo,PseudoElementSelector:()=>bo,Ratio:()=>vo,Raw:()=>wo,Rule:()=>Ao,Scope:()=>Io,Selector:()=>Po,SelectorList:()=>Mo,String:()=>Vo,StyleSheet:()=>Uo,SupportsDeclaration:()=>Wo,TypeSelector:()=>Yo,UnicodeRange:()=>Zo,Url:()=>rl,Value:()=>sl,WhiteSpace:()=>cl});var kn={};O(kn,{generate:()=>vn,name:()=>sg,parse:()=>yn,structure:()=>og});var wt=43,Ye=45,ra=110,Jt=!0,ng=!1;function aa(e,t){let i=this.tokenStart+e,a=this.charCodeAt(i);for((a===wt||a===Ye)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)Ne(this.charCodeAt(i))||this.error("Integer is expected",i)}function vi(e){return aa.call(this,0,e)}function jt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case ra:i="N is expected";break;case Ye:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function xn(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(wt,e)||this.isDelim(Ye,e)){t=this.isDelim(wt,e)?wt:Ye;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),vi.call(this,Jt))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==wt&&i!==Ye&&this.error("Number sign is expected")),vi.call(this,t!==0),t===Ye?"-"+this.consume(10):this.consume(10)}var sg="AnPlusB",og={a:[String,null],b:[String,null]};function yn(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)vi.call(this,ng),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,Ye))switch(t="-1",jt.call(this,1,ra),this.tokenEnd-this.tokenStart){case 2:this.next(),i=xn.call(this);break;case 3:jt.call(this,2,Ye),this.next(),this.skipSC(),vi.call(this,Jt),i="-"+this.consume(10);break;default:jt.call(this,2,Ye),aa.call(this,3,Jt),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(wt)&&this.lookupType(1)===1){let a=0;switch(t="1",this.isDelim(wt)&&(a=1,this.next()),jt.call(this,0,ra),this.tokenEnd-this.tokenStart){case 1:this.next(),i=xn.call(this);break;case 2:jt.call(this,1,Ye),this.next(),this.skipSC(),vi.call(this,Jt),i="-"+this.consume(10);break;default:jt.call(this,1,Ye),aa.call(this,2,Jt),this.next(),i=this.substrToCursor(e+a+1)}}else if(this.tokenType===12){let a=this.charCodeAt(this.tokenStart),o=a===wt||a===Ye,h=this.tokenStart+o;for(;h<this.tokenEnd&&Ne(this.charCodeAt(h));h++);h===this.tokenStart+o&&this.error("Integer is expected",this.tokenStart+o),jt.call(this,h-this.tokenStart,ra),t=this.substring(e,h),h+1===this.tokenEnd?(this.next(),i=xn.call(this)):(jt.call(this,h-this.tokenStart+1,Ye),h+2===this.tokenEnd?(this.next(),this.skipSC(),vi.call(this,Jt),i="-"+this.consume(10)):(aa.call(this,h-this.tokenStart+2,Jt),this.next(),i=this.substrToCursor(h+1)))}else this.error();return t!==null&&t.charCodeAt(0)===wt&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===wt&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function vn(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var Cn={};O(Cn,{generate:()=>wn,name:()=>cg,parse:()=>Sn,structure:()=>pg,walkContext:()=>ug});function ip(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function lg(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var cg="Atrule",ug="atrule",pg={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function Sn(e=!1){let t=this.tokenStart,i,a,o=null,h=null;switch(this.eat(3),i=this.substrToCursor(t+1),a=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?o=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),ip):o=ip.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,a)&&typeof this.atrule[a].block=="function"?h=this.atrule[a].block.call(this,e):h=this.Block(lg.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:o,block:h}}function wn(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var Tn={};O(Tn,{generate:()=>An,name:()=>hg,parse:()=>En,structure:()=>fg,walkContext:()=>dg});var hg="AtrulePrelude",dg="atrulePrelude",fg={children:[[]]};function En(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function An(e){this.children(e)}var $n={};O($n,{generate:()=>Ln,name:()=>vg,parse:()=>In,structure:()=>kg});var mg=36,rp=42,na=61,gg=94,_n=124,bg=126;function xg(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(rp)?(t=!0,this.next()):this.isDelim(_n)||this.eat(1),this.isDelim(_n)?this.charCodeAt(this.tokenStart+1)!==na?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function yg(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==na&&t!==bg&&t!==gg&&t!==mg&&t!==rp&&t!==_n&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==na&&(this.isDelim(na)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var vg="AttributeSelector",kg={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function In(){let e=this.tokenStart,t,i=null,a=null,o=null;return this.eat(19),this.skipSC(),t=xg.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=yg.call(this),this.skipSC(),a=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(o=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:a,flags:o}}function Ln(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var Rn={};O(Rn,{generate:()=>Nn,name:()=>Cg,parse:()=>Pn,structure:()=>Ag,walkContext:()=>Eg});var Sg=38;function sp(){return this.Raw(null,!0)}function ap(){return this.parseWithFallback(this.Rule,sp)}function np(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function wg(){if(this.tokenType===17)return np.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,np);return this.tokenType===17&&this.next(),e}var Cg="Block",Eg="block",Ag={children:[["Atrule","Rule","Declaration"]]};function Pn(e){let t=e?wg:ap,i=this.tokenStart,a=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:a.push(this.parseWithFallback(this.Atrule.bind(this,e),sp));break;default:e&&this.isDelim(Sg)?a.push(ap.call(this)):a.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:a}}function Nn(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var Fn={};O(Fn,{generate:()=>On,name:()=>Tg,parse:()=>Mn,structure:()=>_g});var Tg="Brackets",_g={children:[[]]};function Mn(e,t){let i=this.tokenStart,a=null;return this.eat(19),a=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:a}}function On(e){this.token(9,"["),this.children(e),this.token(9,"]")}var Bn={};O(Bn,{generate:()=>Vn,name:()=>Ig,parse:()=>Dn,structure:()=>Lg});var Ig="CDC",Lg=[];function Dn(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function Vn(){this.token(15,"-->")}var zn={};O(zn,{generate:()=>Un,name:()=>$g,parse:()=>jn,structure:()=>Pg});var $g="CDO",Pg=[];function jn(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function Un(){this.token(14,"<!--")}var Gn={};O(Gn,{generate:()=>Wn,name:()=>Rg,parse:()=>Hn,structure:()=>Mg});var Ng=46,Rg="ClassSelector",Mg={name:String};function Hn(){return this.eatDelim(Ng),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function Wn(e){this.token(9,"."),this.token(1,e.name)}var Yn={};O(Yn,{generate:()=>Kn,name:()=>Vg,parse:()=>qn,structure:()=>Bg});var Og=43,op=47,Fg=62,Dg=126,Vg="Combinator",Bg={name:String};function qn(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case Fg:case Og:case Dg:this.next();break;case op:this.next(),this.eatIdent("deep"),this.eatDelim(op);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function Kn(e){this.tokenize(e.name)}var Xn={};O(Xn,{generate:()=>Jn,name:()=>zg,parse:()=>Qn,structure:()=>Hg});var jg=42,Ug=47,zg="Comment",Hg={value:String};function Qn(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===jg&&this.charCodeAt(t-1)===Ug&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function Jn(e){this.token(25,"/*"+e.value+"*/")}var ts={};O(ts,{generate:()=>es,name:()=>Gg,parse:()=>Zn,structure:()=>qg});var Wg=new Set([16,22,0]),Gg="Condition",qg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function lp(e){return this.lookupTypeNonSC(1)===1&&Wg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var Kg={media:lp,container:lp,supports(){return this.SupportsDeclaration()}};function Zn(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>Kg[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let a=this.Condition(e);return this.eat(22),a},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function es(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var as={};O(as,{generate:()=>rs,name:()=>rb,parse:()=>is,structure:()=>nb,walkContext:()=>ab});var cp=45;function up(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===cp&&e.charCodeAt(t+1)===cp}var hp=33,Yg=35,Qg=36,Jg=38,Xg=42,Zg=43,pp=47;function eb(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function tb(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function ib(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(hp)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var rb="Declaration",ab="declaration",nb={important:[Boolean,String],property:String,value:["Value","Raw"]};function is(){let e=this.tokenStart,t=this.tokenIndex,i=sb.call(this),a=up(i),o=a?this.parseCustomProperty:this.parseValue,h=a?tb:eb,d=!1,g;this.skipSC(),this.eat(16);let y=this.tokenIndex;if(a||this.skipSC(),o?g=this.parseWithFallback(ib,h):g=h.call(this,this.tokenIndex),a&&g.type==="Value"&&g.children.isEmpty){for(let b=y-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(hp)&&(d=ob.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function rs(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function sb(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Xg:case Qg:case Zg:case Yg:case Jg:this.next();break;case pp:this.next(),this.isDelim(pp)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function ob(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var ls={};O(ls,{generate:()=>os,name:()=>cb,parse:()=>ss,structure:()=>ub});var lb=38;function ns(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var cb="DeclarationList",ub={children:[["Declaration","Atrule","Rule"]]};function ss(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),ns));break;default:this.isDelim(lb)?e.push(this.parseWithFallback(this.Rule,ns)):e.push(this.parseWithFallback(this.Declaration,ns))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function os(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var ps={};O(ps,{generate:()=>us,name:()=>pb,parse:()=>cs,structure:()=>hb});var pb="Dimension",hb={value:String,unit:String};function cs(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function us(e){this.token(12,e.value+e.unit)}var fs={};O(fs,{generate:()=>ds,name:()=>fb,parse:()=>hs,structure:()=>mb});var db=47,fb="Feature",mb={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function hs(e){let t=this.tokenStart,i,a=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?a=this.Ratio():a=this.Number();break;case 12:a=this.Dimension();break;case 1:a=this.Identifier();break;case 2:a=this.parseWithFallback(()=>{let o=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(db)&&this.error(),o},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:a}}function ds(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var bs={};O(bs,{generate:()=>gs,name:()=>gb,parse:()=>ms,structure:()=>bb});var gb="FeatureFunction",bb={kind:String,feature:String,value:["Declaration","Selector"]};function xb(e,t){let a=(this.features[e]||{})[t];return typeof a!="function"&&this.error(`Unknown feature ${t}()`),a}function ms(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),a=xb.call(this,e,i.toLowerCase());this.skipSC();let o=this.parseWithFallback(()=>{let h=this.tokenIndex,d=a.call(this);return this.eof===!1&&this.isBalanceEdge(h)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:o}}function gs(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var ks={};O(ks,{generate:()=>vs,name:()=>kb,parse:()=>ys,structure:()=>Sb});var dp=47,yb=60,fp=61,vb=62,kb="FeatureRange",Sb={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function xs(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(dp,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(dp)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function mp(e){if(this.skipSC(),this.isDelim(yb)||this.isDelim(vb)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(fp)?(this.next(),t+"="):t}if(this.isDelim(fp))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function ys(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=xs.call(this),a=mp.call(this,i.type==="Identifier"),o=xs.call(this),h=null,d=null;return this.lookupNonWSType(0)!==22&&(h=mp.call(this),d=xs.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:a,middle:o,rightComparison:h,right:d}}function vs(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var Cs={};O(Cs,{generate:()=>ws,name:()=>wb,parse:()=>Ss,structure:()=>Eb,walkContext:()=>Cb});var wb="Function",Cb="function",Eb={name:String,children:[[]]};function Ss(e,t){let i=this.tokenStart,a=this.consumeFunctionName(),o=a.toLowerCase(),h;return h=t.hasOwnProperty(o)?t[o].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:a,children:h}}function ws(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var Ts={};O(Ts,{generate:()=>As,name:()=>Ab,parse:()=>Es,structure:()=>Tb});var Ab="GeneralEnclosed",Tb={kind:String,function:[String,null],children:[[]]};function Es(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let a=this.parseWithFallback(()=>{let o=this.tokenIndex,h=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(o)===!1&&this.error(),h},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:a}}function As(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var Ls={};O(Ls,{generate:()=>Is,name:()=>Ib,parse:()=>_s,structure:()=>Lb,xxx:()=>_b});var _b="XXX",Ib="Hash",Lb={value:String};function _s(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function Is(e){this.token(4,"#"+e.value)}var Ns={};O(Ns,{generate:()=>Ps,name:()=>$b,parse:()=>$s,structure:()=>Pb});var $b="Identifier",Pb={name:String};function $s(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function Ps(e){this.token(1,e.name)}var Os={};O(Os,{generate:()=>Ms,name:()=>Nb,parse:()=>Rs,structure:()=>Rb});var Nb="IdSelector",Rb={name:String};function Rs(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function Ms(e){this.token(9,"#"+e.name)}var Vs={};O(Vs,{generate:()=>Ds,name:()=>Ob,parse:()=>Fs,structure:()=>Fb});var Mb=46,Ob="Layer",Fb={name:String};function Fs(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(Mb);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function Ds(e){this.tokenize(e.name)}var Us={};O(Us,{generate:()=>js,name:()=>Db,parse:()=>Bs,structure:()=>Vb});var Db="LayerList",Vb={children:[["Layer"]]};function Bs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function js(e){this.children(e,()=>this.token(18,","))}var Ws={};O(Ws,{generate:()=>Hs,name:()=>Bb,parse:()=>zs,structure:()=>jb});var Bb="MediaQuery",jb={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function zs(){let e=this.tokenStart,t=null,i=null,a=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let o=this.consume(1),h=o.toLowerCase();switch(h==="not"||h==="only"?(this.skipSC(),t=h,i=this.consume(1)):i=o,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),a=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{a=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:a}}function Hs(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Ks={};O(Ks,{generate:()=>qs,name:()=>Ub,parse:()=>Gs,structure:()=>zb});var Ub="MediaQueryList",zb={children:[["MediaQuery"]]};function Gs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function qs(e){this.children(e,()=>this.token(18,","))}var Js={};O(Js,{generate:()=>Qs,name:()=>Wb,parse:()=>Ys,structure:()=>Gb});var Hb=38,Wb="NestingSelector",Gb={};function Ys(){let e=this.tokenStart;return this.eatDelim(Hb),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function Qs(){this.token(9,"&")}var eo={};O(eo,{generate:()=>Zs,name:()=>qb,parse:()=>Xs,structure:()=>Kb});var qb="Nth",Kb={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Xs(){this.skipSC();let e=this.tokenStart,t=e,i=null,a;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?a=this.Identifier():a=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:a,selector:i}}function Zs(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var ro={};O(ro,{generate:()=>io,name:()=>Yb,parse:()=>to,structure:()=>Qb});var Yb="Number",Qb={value:String};function to(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function io(e){this.token(10,e.value)}var so={};O(so,{generate:()=>no,name:()=>Jb,parse:()=>ao,structure:()=>Xb});var Jb="Operator",Xb={value:String};function ao(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function no(e){this.tokenize(e.value)}var co={};O(co,{generate:()=>lo,name:()=>Zb,parse:()=>oo,structure:()=>e0});var Zb="Parentheses",e0={children:[[]]};function oo(e,t){let i=this.tokenStart,a=null;return this.eat(21),a=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:a}}function lo(e){this.token(21,"("),this.children(e),this.token(22,")")}var ho={};O(ho,{generate:()=>po,name:()=>t0,parse:()=>uo,structure:()=>i0});var t0="Percentage",i0={value:String};function uo(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function po(e){this.token(11,e.value+"%")}var go={};O(go,{generate:()=>mo,name:()=>r0,parse:()=>fo,structure:()=>n0,walkContext:()=>a0});var r0="PseudoClassSelector",a0="function",n0={name:String,children:[["Raw"],null]};function fo(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function mo(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var yo={};O(yo,{generate:()=>xo,name:()=>s0,parse:()=>bo,structure:()=>l0,walkContext:()=>o0});var s0="PseudoElementSelector",o0="function",l0={name:String,children:[["Raw"],null]};function bo(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function xo(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var So={};O(So,{generate:()=>ko,name:()=>c0,parse:()=>vo,structure:()=>u0});var gp=47;function bp(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var c0="Ratio",u0={left:["Number","Function"],right:["Number","Function",null]};function vo(){let e=this.tokenStart,t=bp.call(this),i=null;return this.skipSC(),this.isDelim(gp)&&(this.eatDelim(gp),i=bp.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function ko(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var Eo={};O(Eo,{generate:()=>Co,name:()=>h0,parse:()=>wo,structure:()=>d0});function p0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var h0="Raw",d0={value:String};function wo(e,t){let i=this.getTokenStart(this.tokenIndex),a;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?a=p0.call(this):a=this.tokenStart,{type:"Raw",loc:this.getLocation(i,a),value:this.substring(i,a)}}function Co(e){this.tokenize(e.value)}var _o={};O(_o,{generate:()=>To,name:()=>m0,parse:()=>Ao,structure:()=>b0,walkContext:()=>g0});function xp(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function f0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var m0="Rule",g0="rule",b0={prelude:["SelectorList","Raw"],block:["Block"]};function Ao(){let e=this.tokenIndex,t=this.tokenStart,i,a;return this.parseRulePrelude?i=this.parseWithFallback(f0,xp):i=xp.call(this,e),a=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:a}}function To(e){this.node(e.prelude),this.node(e.block)}var $o={};O($o,{generate:()=>Lo,name:()=>x0,parse:()=>Io,structure:()=>y0});var x0="Scope",y0={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function Io(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function Lo(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var Ro={};O(Ro,{generate:()=>No,name:()=>v0,parse:()=>Po,structure:()=>k0});var v0="Selector",k0={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function Po(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function No(e){this.children(e)}var Fo={};O(Fo,{generate:()=>Oo,name:()=>S0,parse:()=>Mo,structure:()=>C0,walkContext:()=>w0});var S0="SelectorList",w0="selector",C0={children:[["Selector","Raw"]]};function Mo(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function Oo(e){this.children(e,()=>this.token(18,","))}var jo={};O(jo,{generate:()=>Bo,name:()=>A0,parse:()=>Vo,structure:()=>T0});var Do=92,yp=34,vp=39;function sa(e){let t=e.length,i=e.charCodeAt(0),a=i===yp||i===vp?1:0,o=a===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,h="";for(let d=a;d<=o;d++){let g=e.charCodeAt(d);if(g===Do){if(d===o){d!==t-1&&(h=e.substr(d+1));break}if(g=e.charCodeAt(++d),je(Do,g)){let y=d-1,b=It(e,y);d=b-1,h+=Jr(e.substring(y+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else h+=e[d]}return h}function kp(e,t){let i=t?"'":'"',a=t?vp:yp,o="",h=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){o+="\uFFFD";continue}if(g<=31||g===127){o+="\\"+g.toString(16),h=!0;continue}g===a||g===Do?(o+="\\"+e.charAt(d),h=!1):(h&&(yt(g)||vt(g))&&(o+=" "),o+=e.charAt(d),h=!1)}return i+o+i}var A0="String",T0={value:String};function Vo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:sa(this.consume(5))}}function Bo(e){this.token(5,kp(e.value))}var Ho={};O(Ho,{generate:()=>zo,name:()=>I0,parse:()=>Uo,structure:()=>$0,walkContext:()=>L0});var _0=33;function Sp(){return this.Raw(null,!1)}var I0="StyleSheet",L0="stylesheet",$0={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function Uo(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==_0){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,Sp);break;default:i=this.parseWithFallback(this.Rule,Sp)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function zo(e){this.children(e)}var qo={};O(qo,{generate:()=>Go,name:()=>P0,parse:()=>Wo,structure:()=>N0});var P0="SupportsDeclaration",N0={declaration:"Declaration"};function Wo(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function Go(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var Jo={};O(Jo,{generate:()=>Qo,name:()=>M0,parse:()=>Yo,structure:()=>O0});var R0=42,wp=124;function Ko(){this.tokenType!==1&&this.isDelim(R0)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var M0="TypeSelector",O0={name:String};function Yo(){let e=this.tokenStart;return this.isDelim(wp)?(this.next(),Ko.call(this)):(Ko.call(this),this.isDelim(wp)&&(this.next(),Ko.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Qo(e){this.tokenize(e.name)}var tl={};O(tl,{generate:()=>el,name:()=>V0,parse:()=>Zo,structure:()=>B0});var Cp=43,Ep=45,Xo=63;function Ji(e,t){let i=0;for(let a=this.tokenStart+e;a<this.tokenEnd;a++){let o=this.charCodeAt(a);if(o===Ep&&t&&i!==0)return Ji.call(this,e+i+1,!1),-1;yt(o)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",a),++i>6&&this.error("Too many hex digits",a)}return this.next(),i}function oa(e){let t=0;for(;this.isDelim(Xo);)++t>e&&this.error("Too many question marks"),this.next()}function F0(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===Cp?"Plus sign":"Hyphen minus")+" is expected")}function D0(){let e=0;switch(this.tokenType){case 10:if(e=Ji.call(this,1,!0),this.isDelim(Xo)){oa.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){F0.call(this,Ep),Ji.call(this,1,!1);break}break;case 12:e=Ji.call(this,1,!0),e>0&&oa.call(this,6-e);break;default:if(this.eatDelim(Cp),this.tokenType===1){e=Ji.call(this,0,!0),e>0&&oa.call(this,6-e);break}if(this.isDelim(Xo)){this.next(),oa.call(this,5);break}this.error("Hex digit or question mark is expected")}}var V0="UnicodeRange",B0={value:String};function Zo(){let e=this.tokenStart;return this.eatIdent("u"),D0.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function el(e){this.tokenize(e.value)}var nl={};O(nl,{generate:()=>al,name:()=>G0,parse:()=>rl,structure:()=>q0});var j0=32,il=92,U0=34,z0=39,H0=40,Ap=41;function Tp(e){let t=e.length,i=4,a=e.charCodeAt(t-1)===Ap?t-2:t-1,o="";for(;i<a&&vt(e.charCodeAt(i));)i++;for(;i<a&&vt(e.charCodeAt(a));)a--;for(let h=i;h<=a;h++){let d=e.charCodeAt(h);if(d===il){if(h===a){h!==t-1&&(o=e.substr(h+1));break}if(d=e.charCodeAt(++h),je(il,d)){let g=h-1,y=It(e,g);h=y-1,o+=Jr(e.substring(g+1,y))}else d===13&&e.charCodeAt(h+1)===10&&h++}else o+=e[h]}return o}function _p(e){let t="",i=!1;for(let a=0;a<e.length;a++){let o=e.charCodeAt(a);if(o===0){t+="\uFFFD";continue}if(o<=31||o===127){t+="\\"+o.toString(16),i=!0;continue}o===j0||o===il||o===U0||o===z0||o===H0||o===Ap?(t+="\\"+e.charAt(a),i=!1):(i&&yt(o)&&(t+=" "),t+=e.charAt(a),i=!1)}return"url("+t+")"}var G0="Url",q0={value:String};function rl(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=Tp(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=sa(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function al(e){this.token(7,_p(e.value))}var ll={};O(ll,{generate:()=>ol,name:()=>K0,parse:()=>sl,structure:()=>Y0});var K0="Value",Y0={children:[[]]};function sl(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function ol(e){this.children(e)}var pl={};O(pl,{generate:()=>ul,name:()=>J0,parse:()=>cl,structure:()=>X0});var Q0=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),J0="WhiteSpace",X0={value:String};function cl(){return this.eat(13),Q0}function ul(e){this.token(13,e.value)}var Ip={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:mn,atrule:Zu,pseudo:tp,node:hl};var Lp=Nu(Ip);var{hasOwnProperty:dl}=Object.prototype,Xi=function(){};function $p(e){return typeof e=="function"?e:Xi}function Pp(e,t){return function(i,a,o){i.type===t&&e.call(this,i,a,o)}}function Z0(e,t){let i=t.structure,a=[];for(let o in i){if(dl.call(i,o)===!1)continue;let h=i[o],d={name:o,type:!1,nullable:!1};Array.isArray(h)||(h=[h]);for(let g of h)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&a.push(d)}return a.length?{context:t.walkContext,fields:a}:null}function ex(e){let t={};for(let i in e.node)if(dl.call(e.node,i)){let a=e.node[i];if(!a.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Z0(i,a)}return t}function Np(e,t){let i=e.fields.slice(),a=e.context,o=typeof a=="string";return t&&i.reverse(),function(h,d,g,y){let b;o&&(b=d[a],d[a]=h);for(let v of i){let C=h[v.name];if(!v.nullable||C){if(v.type==="list"){if(t?C.reduceRight(y,!1):C.reduce(y,!1))return!0}else if(g(C))return!0}}o&&(d[a]=b)}}function Rp({StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:o}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:o}}}function Mp(e){let t=ex(e),i={},a={},o=Symbol("break-walk"),h=Symbol("skip-node");for(let b in t)dl.call(t,b)&&t[b]!==null&&(i[b]=Np(t[b],!1),a[b]=Np(t[b],!0));let d=Rp(i),g=Rp(a),y=function(b,v){function C(J,ee,re){let de=w.call(u,J,ee,re);return de===o?!0:de===h?!1:!!(L.hasOwnProperty(J.type)&&L[J.type](J,u,C,H)||E.call(u,J,ee,re)===o)}let w=Xi,E=Xi,L=i,H=(J,ee,re,de)=>J||C(ee,re,de),u={break:o,skip:h,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof v=="function")w=v;else if(v&&(w=$p(v.enter),E=$p(v.leave),v.reverse&&(L=a),v.visit)){if(d.hasOwnProperty(v.visit))L=v.reverse?g[v.visit]:d[v.visit];else if(!t.hasOwnProperty(v.visit))throw new Error("Bad value `"+v.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");w=Pp(w,v.visit),E=Pp(E,v.visit)}if(w===Xi&&E===Xi)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");C(b)};return y.break=o,y.skip=h,y.find=function(b,v){let C=null;return y(b,function(w,E,L){if(v.call(this,w,E,L))return C=w,o}),C},y.findLast=function(b,v){let C=null;return y(b,{reverse:!0,enter(w,E,L){if(v.call(this,w,E,L))return C=w,o}}),C},y.findAll=function(b,v){let C=[];return y(b,function(w,E,L){v.call(this,w,E,L)&&C.push(w)}),C},y}var fl={};O(fl,{AnPlusB:()=>kn,Atrule:()=>Cn,AtrulePrelude:()=>Tn,AttributeSelector:()=>$n,Block:()=>Rn,Brackets:()=>Fn,CDC:()=>Bn,CDO:()=>zn,ClassSelector:()=>Gn,Combinator:()=>Yn,Comment:()=>Xn,Condition:()=>ts,Declaration:()=>as,DeclarationList:()=>ls,Dimension:()=>ps,Feature:()=>fs,FeatureFunction:()=>bs,FeatureRange:()=>ks,Function:()=>Cs,GeneralEnclosed:()=>Ts,Hash:()=>Ls,IdSelector:()=>Os,Identifier:()=>Ns,Layer:()=>Vs,LayerList:()=>Us,MediaQuery:()=>Ws,MediaQueryList:()=>Ks,NestingSelector:()=>Js,Nth:()=>eo,Number:()=>ro,Operator:()=>so,Parentheses:()=>co,Percentage:()=>ho,PseudoClassSelector:()=>go,PseudoElementSelector:()=>yo,Ratio:()=>So,Raw:()=>Eo,Rule:()=>_o,Scope:()=>$o,Selector:()=>Ro,SelectorList:()=>Fo,String:()=>jo,StyleSheet:()=>Ho,SupportsDeclaration:()=>qo,TypeSelector:()=>Jo,UnicodeRange:()=>tl,Url:()=>nl,Value:()=>ll,WhiteSpace:()=>pl});var Op={node:fl};var Fp=Mp(Op);var ah=Wf(ih(),1),rh=new Set(["Atrule","Selector","Declaration"]);function nh(e){let t=new ah.SourceMapGenerator,i={line:1,column:0},a={line:0,column:0},o={line:1,column:0},h={generated:o},d=1,g=0,y=!1,b=e.node;e.node=function(w){if(w.loc&&w.loc.start&&rh.has(w.type)){let E=w.loc.start.line,L=w.loc.start.column-1;(a.line!==E||a.column!==L)&&(a.line=E,a.column=L,i.line=d,i.column=g,y&&(y=!1,(i.line!==o.line||i.column!==o.column)&&t.addMapping(h)),y=!0,t.addMapping({source:w.loc.source,original:a,generated:i}))}b.call(this,w),y&&rh.has(w.type)&&(o.line=d,o.column=g)};let v=e.emit;e.emit=function(w,E,L){for(let H=0;H<w.length;H++)w.charCodeAt(H)===10?(d++,g=0):g++;v(w,E,L)};let C=e.result;return e.result=function(){return y&&t.addMapping(h),{css:C(),map:t}},e}var pa={};O(pa,{safe:()=>Sl,spec:()=>Sx});var yx=43,vx=45,kl=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),sh=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],kx=sh.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function oh(e){let t=new Set(e.map(([i,a])=>kl(i)<<16|kl(a)));return function(i,a,o){let h=kl(a,o),d=o.charCodeAt(0),g=d===vx&&a!==1&&a!==2&&a!==15||d===yx?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|h);return h|g}}var Sx=oh(sh),Sl=oh(kx);var wx=92;function Cx(e,t){if(typeof t=="function"){let i=null;e.children.forEach(a=>{i!==null&&t.call(this,i),this.node(a),i=a});return}e.children.forEach(this.node,this)}function lh(e){let t=new Map;for(let[i,a]of Object.entries(e.node))typeof(a.generate||a)=="function"&&t.set(i,a.generate||a);return function(i,a){let o="",h=0,d={node(y){if(t.has(y.type))t.get(y.type).call(g,y);else throw new Error("Unknown node type: "+y.type)},tokenBefore:Sl,token(y,b,v){h=this.tokenBefore(h,y,b),!v&&h&1&&this.emit(" ",13,!0),this.emit(b,y,!1),y===9&&b.charCodeAt(0)===wx&&this.emit(`
`,13,!0)},emit(y){o+=y},result(){return o}};a&&(typeof a.decorator=="function"&&(d=a.decorator(d)),a.sourceMap&&(d=nh(d)),a.mode in pa&&(d.tokenBefore=pa[a.mode]));let g={node:y=>d.node(y),children:Cx,token:(y,b)=>d.token(y,b),tokenize:y=>ta(y,(b,v,C)=>{d.token(b,y.slice(v,C),v!==0)})};return d.node(i),d.result()}}var wl={};O(wl,{AnPlusB:()=>vn,Atrule:()=>wn,AtrulePrelude:()=>An,AttributeSelector:()=>Ln,Block:()=>Nn,Brackets:()=>On,CDC:()=>Vn,CDO:()=>Un,ClassSelector:()=>Wn,Combinator:()=>Kn,Comment:()=>Jn,Condition:()=>es,Declaration:()=>rs,DeclarationList:()=>os,Dimension:()=>us,Feature:()=>ds,FeatureFunction:()=>gs,FeatureRange:()=>vs,Function:()=>ws,GeneralEnclosed:()=>As,Hash:()=>Is,IdSelector:()=>Ms,Identifier:()=>Ps,Layer:()=>Ds,LayerList:()=>js,MediaQuery:()=>Hs,MediaQueryList:()=>qs,NestingSelector:()=>Qs,Nth:()=>Zs,Number:()=>io,Operator:()=>no,Parentheses:()=>lo,Percentage:()=>po,PseudoClassSelector:()=>mo,PseudoElementSelector:()=>xo,Ratio:()=>ko,Raw:()=>Co,Rule:()=>To,Scope:()=>Lo,Selector:()=>No,SelectorList:()=>Oo,String:()=>Bo,StyleSheet:()=>zo,SupportsDeclaration:()=>Go,TypeSelector:()=>Qo,UnicodeRange:()=>el,Url:()=>al,Value:()=>ol,WhiteSpace:()=>ul});var ch={node:wl};var Cl=lh(ch);var tr="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),Ex=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),ph=new Set(["__proto__","prototype","constructor"]);function ha(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(a=>ha(a,t)):i&&typeof i=="object"&&ha(i,t)}}function Si(e){return e?e.computed?e.property?.value:e.property?.name:""}function wi(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!wi(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=wi(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(wi);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let a=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||ph.has(String(a)))throw new Error("Property static tidak aman");t[a]=wi(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function uh(e,t){let i=null;return ha(e,a=>{if(i)return;let o=a.type==="VariableDeclarator"&&a.id.name===t,h=a.type==="AssignmentExpression"&&a.left.type==="MemberExpression"&&["window","globalThis"].includes(a.left.object.name)&&Si(a.left)===t;if(o||h)try{i=wi(o?a.init:a.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function Ax(e){let t=new WeakMap,i=(o,h,d=null)=>{o&&(o.type==="Identifier"?h.bindings.set(o.name,d):o.type==="RestElement"?i(o.argument,h):o.type==="AssignmentPattern"?i(o.left,h):o.type==="ArrayPattern"?o.elements.forEach(g=>i(g,h)):o.type==="ObjectPattern"&&o.properties.forEach(g=>i(g.value||g.argument,h)))},a=(o,h)=>{if(!o||typeof o!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(o.type);o.type==="FunctionDeclaration"&&i(o.id,h);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(o.type),y=g?{parent:h,bindings:new Map,functionScope:null}:h;g&&(y.functionScope=d||o.type==="Program"?y:h.functionScope),t.set(o,y),d&&(o.id&&i(o.id,y),o.params.forEach(b=>i(b,y))),o.type==="CatchClause"&&i(o.param,y),o.type==="VariableDeclaration"&&o.declarations.forEach(b=>i(b.id,o.kind==="var"?y.functionScope:y,b.init));for(let b of Object.values(o))Array.isArray(b)?b.forEach(v=>a(v,y)):b&&typeof b=="object"&&a(b,y)};return a(e,null),t}function Tx(e){let t=[],i=Ax(e),a=(g,y=new Set)=>{if(g?.type!=="Identifier"||y.has(g))return g;y.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return a(b.bindings.get(g.name),y);return g},o=g=>(g=a(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&Si(g)==="document"),h=g=>(g=a(g),g?.type==="MemberExpression"?o(g.object)&&Si(g)==="body":g?.type==="CallExpression"&&o(g.callee.object)&&Si(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=a(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||Si(g.callee)==="MutationObserver"));return ha(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||Si(g.callee)!=="observe"||!d(g.callee.object)||!h(g.arguments[0]))return;let y;try{y=wi(a(g.arguments[1]))}catch{}let b=y?.attributes??(y?.attributeFilter!==void 0||y?.attributeOldValue!==void 0);(!y||b&&(!Array.isArray(y.attributeFilter)||y.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function hh(e){let t=[...e.children],i=t.slice(t.findLastIndex(a=>a.type==="Combinator")+1);return i.some(a=>a.type==="PseudoElementSelector")?[]:i.flatMap(a=>a.type==="TypeSelector"&&["html","body"].includes(a.name.toLowerCase())?[a.name.toLowerCase()]:a.type==="PseudoClassSelector"&&a.name==="root"?["html"]:a.type==="PseudoClassSelector"&&["is","where"].includes(a.name)&&a.children?[...a.children].flatMap(o=>o.type==="SelectorList"?[...o.children].flatMap(hh):[]):[])}function _x(e){let t=[],i;try{i=Lp(e)}catch(h){return["CSS tidak terbaca: "+h.message]}let a=[!0],o={html:{},body:{}};return Fp(i,{enter(h){if(h.type==="Atrule"){h.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=h.prelude?Cl(h.prelude):"",y=h.name.toLowerCase()==="media"&&g.split(",").every(b=>{let v=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||v&&Number(v[1])>960});a.push(a.at(-1)&&!y)}if(h.type!=="Rule"||!a.at(-1))return;let d=new Set(h.prelude?.type==="SelectorList"?[...h.prelude.children].flatMap(hh):[]);h.block.children.forEach(g=>{if(g.type!=="Declaration")return;let y=Cl(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(y)&&(o[b].overflow=!0),g.property==="height"&&y==="100dvh"&&(o[b].height=!0)})},leave(h){h.type==="Atrule"&&a.pop()}}),Object.values(o).some(h=>h.height&&h.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function El({doc:e,scripts:t=[],css:i="",config:a,schema:o,requireObjects:h=!0}){let d=[],g=[];for(let w of t)try{let E=vu(w,{ecmaVersion:"latest",sourceType:"script"});g.push(E),d.push(...Tx(E))}catch(E){d.push("Sintaks JavaScript gagal kompilasi: "+E.message)}a??(a=g.map(w=>uh(w,"CONFIG")).find(Boolean)),o??(o=g.map(w=>uh(w,"SVE_SCHEMA")).find(Boolean)),h&&!a&&d.push("CONFIG static tidak terbaca"),h&&!o&&d.push("SVE_SCHEMA static tidak terbaca");let y=o?.template?.type==="custom-page";if(o){Array.isArray(o.sections)||d.push("SVE_SCHEMA.sections wajib array");let w=Array.isArray(o.sections)?o.sections:[],E=w.map(L=>L?.id);new Set(E).size!==E.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),y||(tr.forEach(L=>{E.includes(L)||d.push("Canonical section hilang: "+L)}),E.forEach(L=>{tr.includes(L)||d.push("Section bukan canonical: "+L)}));for(let L of w){if(L?.fields!==void 0&&!Array.isArray(L.fields)){d.push("Section fields wajib array");continue}for(let H of L?.fields||[])if(Ex.has(H?.type||"text")||d.push("Field type tidak didukung: "+H?.type),!!["repeater","repeater-image"].includes(H?.type)){if(!Array.isArray(H.fields)){d.push("Repeater tanpa fields[]");continue}for(let u of H.fields)(!u?.key||ph.has(u.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(u?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(a&&!y){let w=a.sectionOrder;(!Array.isArray(w)||w.length!==tr.length||!tr.every(E=>w.includes(E))||w[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let v=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(v)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(v)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(v)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let C=["html","body"].map(w=>`${w}{${e?.querySelector(w)?.getAttribute("style")||""}}`).join("");d.push(..._x(i+C));for(let w of e?.querySelectorAll("audio")||[])w.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let w of e?.querySelectorAll("iframe")||[]){let E="";try{E=new URL(w.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(E)&&w.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:a,schema:o}}var Ix="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-background-primary sve-button-text-primary sve-button-background-secondary sve-button-text-secondary".split(" "),Lx=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function $x(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(a=>a[1]));return i.size?[...Ix,...Lx].filter(a=>i.has(a)&&!new RegExp(`var\\(\\s*--${a}\\s*[,)]`).test(t)).map(a=>`Token ${a} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function Px(e){let t=[];for(let i of e?.querySelectorAll?.("[style]")||[]){if(i.hasAttribute?.("data-sve-literal-color"))continue;let h=(i.getAttribute("style")||"").replace(/var\([^)]*\)/g,"").match(/#[0-9a-f]{3,8}\b/gi);if(!h)continue;let d=i.getAttribute("data-pencil-id"),g=i.getAttribute("data-pencil-name"),y=d?` pada node ${d}${g?" ("+g+")":""}`:"";t.push(`Warna belum tertoken: ${[...new Set(h)].join(", ")}${y}. Panel Color SVE tidak akan mengubahnya`)}return t}function dh(e,t){let i=String(e||"").replace(/^\uFEFF/,""),a=t(i),o=[...a.querySelectorAll("style")],h=[...a.querySelectorAll("script")],d=El({doc:a,css:o.map(b=>b.textContent).join(`
`),scripts:h.map(b=>b.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),a.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!a.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!a.body)&&g.push("Elemen body wajib ada"),a.head?.querySelector("title")||g.push("Title wajib ada di head"),a.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(o.length!==1||!a.head?.contains(o[0]))&&g.push("Wajib tepat satu style di head"),(h.length!==1||!a.body?.contains(h[0]))&&g.push("Wajib tepat satu script di body"),h[0]&&h[0]!==a.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),h.some(b=>b.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let b=new Set([...a.querySelectorAll("[data-section-id]")].map(v=>v.getAttribute("data-section-id")));tr.forEach(v=>{b.has(v)||g.push("Markup section hilang: "+v)})}g.push(...$x(d.html??i));let y=Px(a);return{...d,blockers:[...new Set(g)],warnings:y,html:i}}var Nx="sve-config",Rx="sve-config-ack",da=["htmlDocument","html_document"];function fh(e){let t=e?.pageDisplayValues;if(!t)return null;let i=null;for(let a of da){let o=t[a];typeof o!="string"||o===""||(i===null||o.length>i.length)&&(i=o)}return i===null||i.length<=2048?null:i}function Mx(e){let t=e?.pageDisplayValues;if(!t)return da[0];for(let i of da)if(typeof t[i]=="string")return i;return da[0]}var Ox="scalev-html-mode-preview-loaded",Fx=400,Dx=2500,Vx=40;function mh({document:e,window:t,getConfig:i,syncImages:a,metrics:o}){let h=null,d=null,g=!1,y=null,b=null,v=0,C=null,w=null,E=null,L=!1,H=null,u=null,J=0,ee=null,re=!1,de=!1;function Me(){if(h?.isConnected)return h;let F=[...e.querySelectorAll("iframe")];return h=F.find(D=>D.getAttribute("title")==="HTML Mode preview")||F.find(D=>D.id==="preview")||F.find(D=>(D.getAttribute("srcdoc")||"").length>0)||null,h}function Qe(F){if(!F)return null;try{let D=F.contentWindow;return D&&typeof D.SVE_REFRESH=="function"?D:null}catch{return null}}function mt(){try{let D=(e.querySelector("section.studio-page")||e.getElementById("__nuxt"))?.__vue__;return!D||!D.pageDisplayValues||fh(D)===null||typeof D.$set!="function"?null:D}catch{return null}}function lt(F,D){F.$set(F.pageDisplayValues,Mx(F),D)}function Oe(){L||(L=!0,t.addEventListener("message",F=>{let D=F.data;if(!(!D||typeof D!="object")){if(D.type===Ox){re&&(re=!1,E!==null&&(t.clearTimeout(E),E=null),H!==!0&&(H=!0,o.previewLoadedCount=(o.previewLoadedCount||0)+1));return}D.type===Rx&&(F.origin!=="null"&&F.origin!==t.location?.origin||C!==null&&D.id!==C||(C=null,w!==null&&(t.clearTimeout(w),w=null),H===null&&(H=!0),o.previewAckCount=(o.previewAckCount||0)+1,D.error&&console.warn("[SVE] Preview menolak CONFIG:",D.error)))}}))}function Ae(){if(H===null){H=!1,o.previewUnsupported=!0;try{u?.()}catch(F){console.warn("[SVE] onUnsupported gagal",F)}}}function Ut(F,D){Oe();let xe=JSON.parse(D),ye=++v;C=ye,F.contentWindow.postMessage({type:Nx,id:ye,config:xe},"*"),o.previewMessageCount=(o.previewMessageCount||0)+1,H===null&&w===null&&(w=t.setTimeout(()=>{w=null,C!==null&&Ae()},Fx))}function Zt(F,D,xe){let ye=JSON.parse(xe);if(D.CONFIG=ye,D.SVE_REFRESH?.(ye),H=!0,o.previewDirectCount=(o.previewDirectCount||0)+1,g)try{F.contentDocument&&a(F.contentDocument)}catch{}}function Ci(F,D){if(de)return o.previewScalevCount=(o.previewScalevCount||0)+1,o.previewScalevMutedCount=(o.previewScalevMutedCount||0)+1,!0;if(!F)return!1;Oe();try{lt(F,D)}catch(xe){return console.warn("[SVE] Payload preview Scalev gagal",xe),!1}return re=!0,E===null&&(E=t.setTimeout(()=>{E=null,re&&(re=!1,ee=!1,o.previewLoadedTimeout=(o.previewLoadedTimeout||0)+1)},Dx)),o.previewScalevCount=(o.previewScalevCount||0)+1,!0}function Te(){d!==null&&t.cancelAnimationFrame(d),d=null;let F=Me(),D=i();if(!F||!D)return;let xe=JSON.stringify(D);if(!(xe===y&&F===b&&!g)){try{let ye=Qe(F);ye?Zt(F,ye,xe):Ut(F,xe),y=xe,b=F,o.previewRefreshCount=(o.previewRefreshCount||0)+1}catch(ye){console.warn("[SVE] Preview refresh gagal",ye)}g=!1}}return{request({images:F=!1,force:D=!1}={}){g||(g=F),D&&(y=null,b=null),d===null&&(d=t.requestAnimationFrame(Te))},fromScalevSource(F){if(typeof F!="string"||!F)return!1;if(de)return o.previewScalevCount=(o.previewScalevCount||0)+1,o.previewScalevMutedCount=(o.previewScalevMutedCount||0)+1,!0;if(ee===!1){if(++J<Vx)return!1;J=0}let D=mt();if(!D)return ee=!1,!1;let xe=Ci(D,F);return xe&&(ee=!0),xe},document(){try{return Me()?.contentDocument||null}catch{return null}},supported(){return H},onUnsupported(F){u=F},setScalevMuted(F){return de=F===!0,de},isScalevMuted(){return de},invalidate(){h=null,y=null,b=null,ee=null},flush:Te,scalevTarget:mt,readDocument:fh}}var Bx="sve-config",jx="sve-config-ack";var Ux='button[aria-label*="preview"]',Al="#builder-canvas-boundary",ir={panel:[{d:"M18 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12z"},{d:"M9 3v18"}],perluas:[{d:"M15 3h6v6"},{d:"m21 3-7 7"},{d:"m3 21 7-7"},{d:"M9 21H3v-6"}],putar:[{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"},{d:"M21 3v5h-5"}],silang:[{d:"M18 6 6 18"},{d:"m6 6 12 12"}]};function rr(e){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e.map(({d:i})=>`<path d="${i}"/>`).join("")}</svg>`}function gh({document:e,window:t,getDocument:i,getConfig:a,metrics:o}){let h=null,d=null,g=null,y=null,b=null,v=1,C=!1,w=!0,E=null,L=1440,H=null,u=null,J=!1,ee=null,re=!1,de=0,Me=new Map,Qe=null,mt=!1,lt=null,Oe=!1,Ae=null,Ut=null,Zt=null;function Ci(){mt||(mt=!0,t.addEventListener("message",P=>{let G=P.data;if(!G||typeof G!="object"||G.type!==jx)return;let fe=Me.get(G.id);fe&&(Me.delete(G.id),fe(G.error?new Error(String(G.error)):null))}))}function Te(P){Oe!==P&&(Oe=P,ti(),Zt?.({stale:Oe,ready:C}))}function F(P,G){if(!g||!C)return Te(!0),Promise.resolve(!1);let fe=JSON.stringify(P);if(!G&&fe===Qe)return Te(!1),Promise.resolve(!0);Ci();let Y=++de;return Te(!0),new Promise(ae=>{let Ee=t.setTimeout(()=>{Me.delete(Y),o.livePreviewError="Balasan template tidak diterima (habis waktu)",ae(!1)},1200);Me.set(Y,le=>{if(t.clearTimeout(Ee),le){o.livePreviewError=String(le.message||le),ae(!1);return}Qe=fe,o.livePreviewCount=(o.livePreviewCount||0)+1,Te(!1),ae(!0)});try{g.contentWindow.postMessage({type:Bx,id:Y,config:P},"*")}catch(le){t.clearTimeout(Ee),Me.delete(Y),o.livePreviewError=String(le.message||le),ae(!1)}})}function D(){if(!w||!d)return;let P=null;try{P=e.querySelector(Al)?.parentElement?.getBoundingClientRect()||null}catch{P=null}if(!P||!P.width||!P.height){d.style.left="",d.style.top="",d.style.right="",d.style.bottom="",d.style.width="",d.style.height="";return}d.style.left=Math.round(P.left)+"px",d.style.top=Math.round(P.top)+"px",d.style.right="auto",d.style.bottom="auto",d.style.width=Math.round(P.width)+"px",d.style.height=Math.round(P.height)+"px"}function xe(){let P=[];try{P=Array.from(e.querySelectorAll("div, section, dialog"))}catch{return null}let G=t.innerWidth||0,fe=t.innerHeight||0;if(!G||!fe)return null;for(let Y of P){if(Y.closest&&Y.closest('#sve77-shadow-host, [id^="sve77"], .sve-live-pane'))continue;let ae=null,Ee=null;try{ae=t.getComputedStyle(Y),Ee=Y.getBoundingClientRect()}catch{continue}if(!ae||!Ee||ae.position!=="fixed"||ae.display==="none"||ae.visibility==="hidden"||Number(ae.opacity)===0||Ee.width<G*.8||Ee.height<fe*.8)continue;let le=Y.querySelector('button, a[href], [role="button"]'),me=(Y.textContent||"").replace(/\s+/g," ").trim();if(!(!le&&me.length<40))return Y}return null}function ye(P){!d||P===J||(J=P,d.classList.toggle("sve-live-pane--tutup-modal",P),P||D())}function ei(){if(!d||d.hidden)return;if(!!!xe()){ee&&(t.clearTimeout(ee),ee=null),ye(!1);return}J||ee||(ee=t.setTimeout(()=>{ee=null,!(!d||d.hidden)&&ye(!!xe())},120))}function ar(){let P=null;try{P=Array.from(e.querySelectorAll(Ux)).filter(ae=>{let Ee=ae.getAttribute("aria-label")||"";return/\d+\s*px/i.test(Ee)})}catch{return null}if(!P.length)return null;let G=P.find(ae=>ae.getAttribute("aria-pressed")==="true"||ae.classList.contains("is-selected"));if(!G)return null;let fe=(G.getAttribute("aria-label")||"").match(/(\d+)\s*px/i);if(!fe)return null;let Y=parseInt(fe[1],10);return!Number.isFinite(Y)||Y<200||Y>4096?null:Y}function nr(){let P=ar();return P===null||P===L?!1:(L=P,!0)}function Je(){if(D(),!y||!g)return;nr();let P=y.clientWidth,G=y.clientHeight;!P||!G||(v=Math.min(1,P/L),g.style.transform=`scale(${v})`,g.style.transformOrigin="top left",g.style.left=fa()+"px",g.style.width=L+"px",g.style.height=Math.round(G/v)+"px")}function fa(){if(!y)return 0;let P=null,G=null;try{P=e.querySelector(Al)?.getBoundingClientRect()||null,G=y.getBoundingClientRect()}catch{return 0}if(!P||!G||!P.width)return 0;let fe=P.left+P.width/2-G.left,Y=L*v/2,ae=Math.round(fe-Y);return ae>0?ae:0}function Pt(){if(re||C)return;let P=i?.();if(typeof P!="string"||!P){b&&(b.textContent="Menunggu template dari Scalev...");return}re=!0,b&&(b.textContent=""),o.livePreviewBootCount=(o.livePreviewBootCount||0)+1,g=e.createElement("iframe"),g.className="sve-live-frame",g.setAttribute("title","SVE live preview"),g.setAttribute("sandbox","allow-scripts allow-same-origin"),g.setAttribute("srcdoc",P),y.replaceChildren(g,b),D();let G=()=>{re=!1,C=!0,Je(),Qe=null,o.livePreviewReady=!0};g.addEventListener("load",G,{once:!0}),t.setTimeout(()=>{C||re===!1||g.contentDocument&&G()},8e3)}function ma(P){if(d)return d;h=P,d=e.createElement("div"),d.className="sve-live-pane",d.id="sve77-live-pane",d.hidden=!0;let G=e.createElement("div");G.className="sve-live-bar";let fe=e.createElement("div");fe.className="sve-live-ident";let Y=e.createElement("span");Y.className="sve-live-mark",Y.setAttribute("aria-hidden","true"),Y.innerHTML=rr(ir.panel);let ae=e.createElement("span");ae.className="sve-live-label",ae.textContent="Preview",Ae=e.createElement("span"),Ae.className="sve-live-badge",Ae.dataset.state="sync",Ae.textContent="Sinkron",Ae.title="Preview menampilkan nilai terbaru dari panel",fe.append(Y,ae,Ae);let Ee=e.createElement("div");Ee.className="sve-live-actions";let le=e.createElement("button");le.type="button",le.className="sve-live-action sve-live-refresh",le.hidden=!0,le.setAttribute("aria-label","Segarkan preview"),le.title="Preview tertinggal dari panel. Klik untuk menyusulkan.",le.innerHTML=rr(ir.putar),le.addEventListener("click",()=>{let M=Ut?.();M&&typeof M.catch=="function"&&M.catch(()=>{})});let me=e.createElement("button");me.type="button",me.className="sve-live-action",me.setAttribute("aria-label","Sesuaikan tampilan preview ke ukuran area"),me.title="Sesuaikan tampilan preview ke ukuran area",me.innerHTML=rr(ir.perluas),me.addEventListener("click",()=>{Je(),me.blur()});let _e=e.createElement("button");_e.type="button",_e.className="sve-live-action",_e.setAttribute("aria-label","Ambil ulang template dari Scalev"),_e.title="Ambil ulang dokumen template dari Scalev lalu bangun ulang preview",_e.innerHTML=rr(ir.putar),_e.addEventListener("click",()=>{if(y){let ve=y.querySelector(".sve-live-frame");ve&&ve.remove()}g=null,C=!1,re=!1,Qe=null,Pt();let M=t.setInterval(()=>{if(!C)return;t.clearInterval(M);let ve=Ut?.();ve&&typeof ve.catch=="function"&&ve.catch(()=>{})},120);t.setTimeout(()=>t.clearInterval(M),9e3),_e.blur()});let Nt=e.createElement("button");if(Nt.type="button",Nt.className="sve-live-close",Nt.setAttribute("aria-label","Tutup preview"),Nt.title="Tutup preview",Nt.innerHTML=rr(ir.silang),Nt.addEventListener("click",()=>{T(),lt?.()}),Ee.append(le,me,_e,Nt),G.append(fe,Ee),y=e.createElement("div"),y.className="sve-live-stage",b=e.createElement("p"),b.className="sve-live-status",y.append(b),d.append(G,y),P.append(d),ti(),t.addEventListener("resize",Je),typeof t.ResizeObserver=="function"){E=new t.ResizeObserver(()=>{Je()});let M=e.querySelector(Al)?.parentElement;M&&E.observe(M)}if(typeof t.MutationObserver=="function"){let M=!1;H=new t.MutationObserver(()=>{M||(M=!0,t.requestAnimationFrame(()=>{M=!1,!(!g||ar()===L)&&Je()}))}),H.observe(e.documentElement,{attributes:!0,attributeFilter:["aria-pressed","class"],subtree:!0})}if(typeof t.MutationObserver=="function"){let M=!1;u=new t.MutationObserver(()=>{M||(M=!0,t.requestAnimationFrame(()=>{M=!1,ei()}))}),u.observe(e.documentElement,{childList:!0,attributes:!0,attributeFilter:["style","class","hidden"],subtree:!0})}return Je(),ei(),d}function sr(){return!!d&&!d.hidden}function ti(){Ae&&(Ae.dataset.state=Oe?"stale":"sync",Ae.textContent=Oe?"Basi":"Sinkron",Ae.title=Oe?"Preview tertinggal dari nilai terbaru di panel":"Preview menampilkan nilai terbaru dari panel");let P=d?.querySelector(".sve-live-refresh");P&&(P.hidden=!Oe)}function ga(){return d?(d.hidden=!1,D(),h?.classList.add("sve-live-on"),ti(),Pt(),Je(),ei(),!0):!1}function T(){d&&(ee&&(t.clearTimeout(ee),ee=null),ye(!1),d.hidden=!0,h?.classList.remove("sve-live-on"))}return{mount:ma,show:ga,hide:T,isVisible:sr,isReady(){return C},onClose(P){lt=P},onRefresh(P){Ut=P},onStateChange(P){Zt=P},isStale(){return Oe},markStale(){Te(!0)},ensure(){!d||d.hidden||Pt()},refresh(P){return!d||d.hidden?Promise.resolve(!1):C?F(P):(Pt(),Promise.resolve(!1))},sync(P){return!d||d.hidden?Promise.resolve(!1):C?F(P,!0):(Pt(),Promise.resolve(!1))},scale(){return v},place(){D()},teardown(){t.removeEventListener("resize",Je),E?.disconnect(),E=null,H?.disconnect(),H=null,u?.disconnect(),u=null,ee&&(t.clearTimeout(ee),ee=null),J=!1,d?.remove(),d=null,g=null,C=!1,re=!1,mt=!1,Me.clear()}}}(function(){"use strict";let e="sve77",t="0.40.0",a=typeof window<"u"&&!!window.__SVE77_DEBUG_SHADOW__,o=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),h="https://nikahin.myscalev.com/home#paket",d="6282175274118",g="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",y="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",b=y;function v(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!v()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let w=(r,n=document)=>n.querySelector(r),E=(r,n=document)=>Array.from(n.querySelectorAll(r));function L(r){return document.getElementById(e+"-shadow-host")?.shadowRoot?.querySelector(r)||null}function H(r){let n=document.getElementById(e+"-shadow-host");return Array.from(n?.shadowRoot?.querySelectorAll(r)||[])}let u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null}};window.__SVE77_PERF=u.performance;let J=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-background-primary","#332a24"],["Button Primary","Text","--sve-button-text-primary","#ffffff"],["Button Secondary","Background","--sve-button-background-secondary","#ffffff"],["Button Secondary","Text","--sve-button-text-secondary","#332a24"]],ee=Array.from({length:31},(r,n)=>12+n*2+"px"),re=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],de=["100","200","300","400","500","600","700","800","900"],Me=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],Qe=Me.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),mt=[{target:"heading",variable:"--sve-font-heading"},{target:"body",variable:"--sve-font-body"}],lt=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],Oe=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),Ae=new Set(["__proto__","prototype","constructor"]),Ut=12,Zt=240,Ci=1e4;function Te(r){let n=String(r||"").trim();if(!n||n.length>Zt||n.includes("..")||n.startsWith(".")||n.endsWith("."))return null;let s=n.split(".");if(!s.length||s.length>Ut)return null;for(let l of s){if(!l||Ae.has(l))return null;if(/^\d+$/.test(l)){let c=Number(l);if(!Number.isSafeInteger(c)||c<0||c>Ci)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(l))return null}return s}let F=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,D=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,xe=4096;function ye(r){return F.lastIndex=0,F.test(String(r||""))}function ei(r){let n=[];return Object.entries(r||{}).forEach(([s,l])=>{let c=String(l||"");if(!c)return;F.lastIndex=0;let p=0,f=0,x;for(;x=F.exec(c);){p+=1;let S=x.index+x[0].length,k=S;for(;k<c.length&&/[A-Za-z0-9+/=]/.test(c[k]);)k+=1;f+=k-S}p&&n.push({where:s,count:p,approxKb:Math.max(1,Math.round(f*.75/1024))})}),n}function ar(r){let n=[];return Object.entries(r||{}).forEach(([s,l])=>{let c=String(l||"");if(!c)return;D.lastIndex=0;let p=0,f=0,x;for(;x=D.exec(c);){let S=x[0].length;S<=xe||ye(x[0])||(p+=1,f=Math.max(f,S))}p&&n.push({where:s,count:p,approxKb:Math.max(1,Math.round(f/1024))})}),n}function nr(r){return r.map(n=>n.where+" ("+n.count+"x, \xB1"+n.approxKb+" KB)").join(", ")}let Je=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],fa={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},Pt=["auto","cover","contain"];function ma(r){return r==="fill"?"cover":r==="fit"?"contain":Pt.includes(r)?r:"auto"}function sr(r=""){return`
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
        class="${T(r)}"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    `}function ti(r){return`
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
        class="section-arrow-icon ${r==="up"?"section-arrow-up":"section-arrow-down"}"
      >
        ${r==="up"?'<path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path>':'<path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path>'}
      </svg>
    `}function ga(){return`
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
        class="section-drag-icon"
      >
        <circle cx="9" cy="12" r="1"></circle>
        <circle cx="9" cy="5" r="1"></circle>
        <circle cx="9" cy="19" r="1"></circle>
        <circle cx="15" cy="12" r="1"></circle>
        <circle cx="15" cy="5" r="1"></circle>
        <circle cx="15" cy="19" r="1"></circle>
      </svg>
    `}function T(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function P(r,n=180){let s;return(...l)=>{clearTimeout(s),s=setTimeout(()=>r(...l),n)}}function G(r,n=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:n}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function fe(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function Y(r){return!!(r&&r.isConnected)}function ae(r){if(!r)return null;try{if(typeof r.getWrapperElement=="function"){let n=r.getWrapperElement();if(n)return n}if(typeof r.getTextArea=="function"){let n=r.getTextArea();if(n)return n.closest?.(".CodeMirror")||n}}catch{}return null}function Ee(r){let n=ae(r);return n?Y(n):!0}function le(){let r=u.nativeCache;Object.keys(r).forEach(n=>{r[n]&&!Y(r[n])&&(r[n]=null)})}function me(r){return r==null?r:JSON.parse(JSON.stringify(r))}function _e(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,n=>n.toUpperCase()).trim()}function Nt(){}function M(r,n){if(r==null||!n)return;let s=Te(n);if(!s)return;let l=r;for(let c of s){if(l==null)return;let p=/^\d+$/.test(c)?Number(c):c;if(!Object.prototype.hasOwnProperty.call(l,p))return;l=l[p]}return l}function ve(r,n,s){let l=Te(n);if(!r||!l)return!1;let c=r;for(let x=0;x<l.length-1;x++){let S=l[x],k=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(c,k)||c[k]===null||c[k]===void 0)&&(c[k]=/^\d+$/.test(l[x+1])?[]:Object.create(null)),typeof c[k]!="object")return!1;c=c[k]}let p=l.at(-1),f=/^\d+$/.test(p)?Number(p):p;return c[f]=s,!0}function zt(r){let n=String(r||"").trim();if(!n)return"";try{/^https?:\/\//i.test(n)&&(n=new URL(n).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{n=decodeURIComponent(n)}catch{}return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function ba(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let l=0;l<5&&s;l+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function bh(){let r=E('input[type="text"], input:not([type])').filter(n=>ba(n));return r.length?r.find(n=>String(n.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function xh(){let r=E("a[href]").filter(n=>!n.closest("#"+e));for(let n of r){let s=n,l="";for(let c=0;c<4&&s;c+=1)l+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(l))try{let c=new URL(n.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(c.hostname)&&!/scalev\.(?:com|id)$/i.test(c.hostname))continue;let p=c.pathname.split("/").filter(Boolean),f=zt(p.at(-1)||"");if(f)return f}catch{}}return""}function Ht(){let r=bh(),n=zt(r?.value);if(n)return u.scalevSlug=n,n;let s=xh();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function xa(r,n){let s=String(n||r?.path||"").trim().toLowerCase(),l=String(r?.label||"").trim().toLowerCase(),c=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&c.endsWith("weddingid")||/wedding\s*id/.test(l)}function yh(){let r=new Set;try{Fe().forEach(n=>{(n.fields||[]).forEach(s=>{s.type!=="repeater"&&xa(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&M(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&M(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function ya(r){E('[data-auto-wedding-id="1"]').forEach(n=>{n.value!==r&&(n.value=r),n.setAttribute("readonly","")})}function Ei(r,n={}){let s=zt(r||Ht());if(!s)return!1;u.scalevSlug=s;let l=yh();if(!u.config||!l.length)return u.pendingWeddingIdSlug=s,ya(s),!1;let c=!1;if(l.forEach(f=>{M(u.config,f)!==s&&(ve(u.config,f,s),c=!0)}),ya(s),!c)return u.pendingWeddingIdSlug="",!1;let p=wa().length>0;return n.commit!==!1&&p&&u.configRange?.editor?(u.pendingWeddingIdSlug="",He(n.silent?void 0:"Wedding ID mengikuti Slug URL"),ya(s),!0):(u.pendingWeddingIdSlug=s,!0)}function Tl(){let r=zt(u.pendingWeddingIdSlug||u.scalevSlug||Ht());return r?Ei(r,{commit:!0,silent:!0}):!1}let vh=P(()=>{let r=Ht();r&&Ei(r,{commit:!0})},450);function va(){if(le(),Y(u.nativeCache.save)||Y(u.nativeCache.publish))return{save:Y(u.nativeCache.save)?u.nativeCache.save:null,publish:Y(u.nativeCache.publish)?u.nativeCache.publish:null};let r=E("button").filter(c=>!c.closest("#"+e)),n=c=>(c.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(c=>{let p=n(c);return p==="simpan"||p==="save"})||null,l=r.find(c=>{let p=n(c);return p.includes("simpan & terbitkan")||p.includes("simpan dan terbitkan")||p==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=l,{save:s,publish:l}}function kh(r,n){if(!r)return n?.parentElement||null;if(!n)return r?.parentElement||null;let s=new Set,l=r;for(;l;)s.add(l),l=l.parentElement;for(l=n;l;){if(s.has(l))return l;l=l.parentElement}return null}function _l(r,n){if(le(),Y(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&n&&r.parentElement===n.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=kh(r,n);if(!s)return r?.parentElement||n?.parentElement||null;let l=s;for(let c=0;c<4&&l;c++,l=l.parentElement){let p=l.getBoundingClientRect?.();if(p&&p.top>=0&&p.top<180&&p.height<110)return u.nativeCache.toolbarHost=l,l}return u.nativeCache.toolbarHost=s,s}function ka(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let n=!!u.open;r.style.setProperty("display",n?"none":"",n?"important":""),r.setAttribute("aria-hidden",n?"true":"false"),r.tabIndex=n?-1:0}function Il(){let{save:r,publish:n}=va(),s=n||r;if(!s)return!1;let l=_l(r,n);if(!l)return!1;l.setAttribute("data-sve77-toolbar-host","1"),l.style.columnGap="8px",l.style.rowGap="8px";let c=document.getElementById(e+"-toolbar-toggle");return c||(c=s.cloneNode(!1),c.id=e+"-toolbar-toggle",c.type="button",c.disabled=!1,c.removeAttribute("disabled"),c.setAttribute("aria-controls",e+"-dock"),c.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),c.setAttribute("aria-pressed","false"),c.textContent="Visual Editor",c.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),u.open?_h():ii(!0)})),c.parentElement!==l&&(n&&n.parentElement===l?n.insertAdjacentElement("afterend",c):r&&r.parentElement===l?r.insertAdjacentElement("afterend",c):l.appendChild(c)),c.classList.toggle("sve-toolbar-active",u.open),c.setAttribute("aria-pressed",u.open?"true":"false"),ka(),u.open&&requestAnimationFrame(()=>$l(!0)),!0}function Sa(){let n=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return n||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function Sh(){if(le(),Y(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=E("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let l=getComputedStyle(s),c=s.getBoundingClientRect(),p=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return l.position==="fixed"&&c.top>=-2&&c.top<=4&&c.height>=36&&c.height<=64&&c.width>=window.innerWidth*.7&&p.includes("landing page studio")});if(!r.length)return null;let n=r.sort((s,l)=>{let c=s.getBoundingClientRect(),p=l.getBoundingClientRect();return c.height-p.height||c.top-p.top})[0];return u.nativeCache.globalHeader=n||null,n||null}function or(){let r=Sh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function wh(){if(le(),Y(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:n}=va(),s=n||r;if(!s)return Sa();let l=s,c=null;for(;l&&l!==document.body;){if(l instanceof HTMLElement){let f=l.getBoundingClientRect();f.top>=36&&f.top<=130&&f.width>=window.innerWidth*.68&&f.height>=window.innerHeight*.62&&(c=l)}l=l.parentElement}let p=c||Sa();return u.nativeCache.workspaceRoot=p||null,p}function zx(){let n=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return n>0?n:Math.min(400,window.innerWidth*.32)}function Ll(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function lr(r){let n=document.querySelector('[data-sve77-page-root="1"]'),s=wh();if(n&&n!==s&&Ll(n),s)if(r){let l=getComputedStyle(s),c=(l.position==="fixed"||l.position==="absolute")&&l.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",c?"positioned":"flow")}else Ll(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>$l(r))}function Ch(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function $l(r){let{save:n,publish:s}=va(),l=document.querySelector('[data-sve77-toolbar-host="1"]')||_l(n,s);l&&(l.setAttribute("data-sve77-toolbar-host","1"),l.style.columnGap="8px",l.style.rowGap="8px",l.style.removeProperty("transform"),l.style.removeProperty("transition")),Ch(document.querySelector('[data-sve77-top-toolbar="1"]'))}function Pl(){G(()=>{if(u.open)try{let r=Ht();r&&Ei(r,{commit:!0,silent:!0}),Tl()}catch{}},1200)}function Nl(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=ze())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{ke()}catch{}Pl()}function Eh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{or(),lr(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),Nl(),performance.mark("sve-panel-paint-end"),Th()}})})}function Ah(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){Nl();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&ze(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&ke()}catch{}performance.mark("sve-prewarm-end"),Pl()}function Th(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(n=>String(n.name).startsWith("sve-")).map(n=>({name:n.name,startTime:Math.round(n.startTime*100)/100}))}catch{}}function cr(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=G(Ah,1200))}function ii(r){if(!r&&!De())return;u.open=!!r;let n=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(n?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),ka(),u.open){u.prewarmScheduled&&(fe(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),Eh();return}requestAnimationFrame(()=>{try{lr(!1)}catch{}}),cr()}function _h(){ii(!1)}function wa(){return[...new Set(E(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function ur(){let r=wa();if(u.allEditors=r,!r.length)return!1;let n={html:null,css:null,js:null,head:null},s=new Set,l=(k,A,_)=>{!A||n[k]||s.has(A)||_(A.getValue?.()||"")&&(n[k]=A,s.add(A))},c=k=>/<!doctype html|<html[\s>]/i.test(k),p=k=>k.includes("--sve-background-primary")||k.includes("--sve-font-heading")||/^\s*[.#:@*\[a-z][^\n]*\{[^}]*\}/m.test(k),f=k=>k.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(k)||/^\s*(?:\(|!|;)?\s*(?:function\b|class\b|import\b|export\b|"use strict"|'use strict')/m.test(k),x=k=>/<meta[\s>]|<link[\s>]|<script[\s>]/i.test(k)&&!c(k);E("label").forEach(k=>{let A=k.querySelector(".CodeMirror")?.CodeMirror;if(!A)return;let I=[...k.querySelectorAll(":scope > span")].map(z=>z.textContent.replace(/\s+/g," ").trim().toLowerCase()).filter(Boolean).pop()||""||(k.querySelector(":scope > span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();I==="body html"?l("html",A,c):I==="css"?l("css",A,p):I==="javascript"?l("js",A,f):I.includes("additional head")?l("head",A,x):I.includes("html document")&&l("html",A,c)}),r.forEach(k=>{l("html",k,c),l("css",k,p),l("js",k,f),l("head",k,x)});let S=r.filter(k=>!s.has(k));if(n.html||(n.html=S.shift()||null),n.css||(n.css=S.shift()||null),!n.js){let k=S.find(A=>!c(A.getValue?.()||""));k&&(n.js=k,S.splice(S.indexOf(k),1))}return n.head||(n.head=S.shift()||null),u.editors=n,ed(),!0}function W(r){return u.editors[r]?.getValue?.()||""}function pr(r,n=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(s){s.dispatchEvent(new Event("input",{bubbles:!0})),n&&s.dispatchEvent(new Event("change",{bubbles:!0}));return}let l=r._handlers?.change;if(!Array.isArray(l))return;let c={from:{line:0,ch:0},to:{line:0,ch:0},text:[],removed:[],origin:"sve-wake"};l.forEach(p=>{if(!(typeof p!="function"||p.__sve))try{p(r,c)}catch{}})}catch{}}function Ih(r,n,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(n),r.save?.()}),pr(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}gr(),Wl()}}function Ct(r,n){Ih(u.editors[r],n)}function Lh(){return new URL(o.endpoint)}function $h(r,n=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!n&&s.origin!==Lh().origin?"":s.href}catch{return""}}function Ph(r){if(!r||typeof r!="object")return null;let n=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(n)||!s?null:{id:n,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:$h(r.source_url||r.sourceUrl)}}function Nh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(Ph).filter(Boolean)}async function Rh(r,n={}){let s=new AbortController,l=window.setTimeout(()=>s.abort(),o.timeoutMs);try{return await fetch(r,{...n,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(l)}}function Mh(r,n={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=n.method||"GET";return new Promise((l,c)=>{GM_xmlhttpRequest({method:s,url:r,data:n.body,headers:n.headers||{},timeout:o.timeoutMs,onload:p=>{let f=Number(p.status),x=Number.isInteger(f)&&f>=200&&f<=599?f:200,S=String(p.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),k=String(p.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";l(new Response(p.responseText||"",{status:x,statusText:S,headers:{"Content-Type":k}}))},ontimeout:()=>c(new DOMException("The operation timed out","AbortError")),onerror:()=>c(new TypeError("Userscript request failed"))})})}async function Ca(r,n={}){if(typeof GM_xmlhttpRequest=="function")try{return await Mh(r,n)}catch{}return await Rh(r,n)}async function Rl(r=!1){let n=u.templateLibrary;if(!r&&n.status==="ready"&&n.loadedAt&&Date.now()-n.loadedAt<3e5)return n.templates;n.status="loading",n.error="";try{let s=await Ca(o.endpoint,{headers:{Accept:"application/json"}}),l=await s.json().catch(()=>null);if(!s.ok)throw new Error(l?.error||"HTTP "+s.status);let c=Nh(l);if(!c.length)throw new Error("Library belum memiliki template aktif");return n.templates=c,n.loadedAt=Date.now(),n.status="ready",c}catch(s){return n.templates=[],n.status="error",n.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),n.templates}}function Oh(){return E('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let n=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return n==="kode"||n==="code"||n.includes("kode html")})||null}async function Fh(){if(ur()&&u.editors.html)return!0;Oh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(n=>window.setTimeout(n,120)),ur()&&u.editors.html)return!0;return!1}function Dh(r){return dh(r,n=>new DOMParser().parseFromString(n,"text/html"))}function Hx(r,n){let s=String(n||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!l)return null;let c=Ml(r,r.indexOf("{",l.index));if(!c)return null;try{return Ol(c.text)}catch{return null}}function Vh(){let r=E('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let l=String(s.getAttribute("accept")||"").toLowerCase();return!(!l.includes("html")&&!l.includes("text/html"))});return r.filter(s=>{let l=s,c="";for(let p=0;p<5&&l;p+=1,l=l.parentElement)c+=" "+String(l.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(c)})[0]||r[0]||null}function Bh(r){let n=Vh();if(!n)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),n.files=s.files,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}function ri(r){let n=["style","audio","compatibility"],s=r||"content",l=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let c=document.getElementById(e);if(E(".tab",c).forEach(p=>{p.classList.toggle("active",p.dataset.tab===r)}),l){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}ke()}async function jh(r,n,s){if(!De())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let l=u.templateLibrary,c=Dh(await r.text());if(c.blockers.length)throw console.error("[SVE] Template library validation failed",c.blockers),new Error(c.blockers[0]);if(!await Fh())throw new Error("Buka tab Kode terlebih dahulu");let p={html:W("html"),css:W("css"),js:W("js"),head:W("head")};Bh(r);let f=Date.now(),x=!1;for(;Date.now()-f<4500;){await new Promise(A=>window.setTimeout(A,140)),ur();let S=W("html"),k=W("js");if(S!==p.html||k!==p.js){x=!0;break}}if(!x)throw new Error("Scalev belum menyelesaikan import file");l.previousSource=p,l.importedId=n||"local-import",l.importedName=s||r.name||"Template lokal",ze(),Ze(),ri("content")}async function Uh(r){let n=u.templateLibrary,s=n.templates.find(c=>c.id===r),l=c=>{n.previousSource=null,n.importedId="",n.importedName="",n.status="error",n.error=c,u.uiPrepared=!1,ke()};if(!s){l("Template tidak ditemukan");return}if(!s.sourceUrl){l("Source template belum tersedia");return}n.status="loading",n.error="",u.uiPrepared=!1,ke();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let c=await Ca(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",c.status),!c.ok)throw new Error("HTTP "+c.status);let p=await c.text();console.log("[SVE] Source length:",p.length);let f=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",x=new File([p],f,{type:"text/html"});await jh(x,s.id,s.name),n.error="",n.status="ready",ri("content")}catch(c){console.error("[SVE] Import gagal:",c),l("Import gagal: "+String(c?.message||"source tidak terbaca"))}}function Wx(){let r=u.templateLibrary.previousSource;r&&De()&&(Ct("html",r.html),Ct("css",r.css),Ct("js",r.js),Ct("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",ze(),Ze(),ri("library"))}function zh(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(n=>{Ct(n,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,ze(),Ze(),u.uiPrepared=!1,ke()}function Ml(r,n){let s=0,l=null,c=!1,p=!1,f=!1;for(let x=n;x<r.length;x++){let S=r[x],k=r[x+1];if(p){S===`
`&&(p=!1);continue}if(f){S==="*"&&k==="/"&&(f=!1,x++);continue}if(l){if(c){c=!1;continue}if(S==="\\"){c=!0;continue}S===l&&(l=null);continue}if(S==="/"&&k==="/"){p=!0,x++;continue}if(S==="/"&&k==="*"){f=!0,x++;continue}if(S==='"'||S==="'"||S==="`"){l=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:n,end:x+1,text:r.slice(n,x+1)}}return null}function Ol(r){let n=0,s=_=>{throw new Error(_+" @"+n)};function l(){for(;n<r.length;){let _=r[n],I=r[n+1];if(/\s/.test(_)){n++;continue}if(_==="/"&&I==="/"){for(n+=2;n<r.length&&r[n]!==`
`;)n++;continue}if(_==="/"&&I==="*"){for(n+=2;n<r.length&&!(r[n]==="*"&&r[n+1]==="/");)n++;n+=2;continue}break}}function c(){let _=r[n++],I="";for(;n<r.length;){let z=r[n++];if(z===_)return I;if(z!=="\\"){I+=z;continue}let Ie=r[n++],Rt={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};I+=Object.prototype.hasOwnProperty.call(Rt,Ie)?Rt[Ie]:Ie}s("String belum ditutup")}function p(){l();let _=n;for(/[A-Za-z_$]/.test(r[n]||"")||s("Identifier invalid"),n++;n<r.length&&/[A-Za-z0-9_$]/.test(r[n]);)n++;return r.slice(_,n)}function f(){let _=r.slice(n).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return _||s("Number invalid"),n+=_[0].length,Number(_[0])}function x(){let _=[];if(n++,l(),r[n]==="]")return n++,_;for(;n<r.length;)if(_.push(k()),l(),r[n]==="]"||(r[n]!==","&&s("Koma array hilang"),n++,l(),r[n]==="]"))return n++,_;s("Array belum selesai")}function S(){let _=Object.create(null);if(n++,l(),r[n]==="}")return n++,_;for(;n<r.length;){l();let I=['"',"'","`"].includes(r[n])?c():p();if(l(),Ae.has(I)&&s("Object key terlarang: "+I),Object.prototype.hasOwnProperty.call(_,I)&&s("Duplicate object key: "+I),r[n]!==":"&&s("Titik dua hilang"),n++,_[I]=k(),l(),r[n]==="}"||(r[n]!==","&&s("Koma object hilang"),n++,l(),r[n]==="}"))return n++,_}s("Object belum selesai")}function k(){l();let _=r[n];if(_==="{")return S();if(_==="[")return x();if(['"',"'","`"].includes(_))return c();if(_==="-"||/\d/.test(_||""))return f();let I=p();if(I==="true")return!0;if(I==="false")return!1;if(I==="null")return null;I==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+I)}let A=k();return l(),A}function Ea(r){let n=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+n+"|(?:window|globalThis)\\."+n+")\\s*=\\s*\\{"),l=[];function c(p,f){!p||l.some(x=>x.editor===p)||l.push({editor:p,kind:f})}c(u.editors.js,"js"),c(u.editors.html,"html"),c(u.editors.head,"head"),u.allEditors.forEach(p=>c(p,"unknown"));for(let p of l){let f=p.editor.getValue?.()||"",x=s.exec(f);if(!x)continue;let S=f.indexOf("{",x.index),k=Ml(f,S);if(k)try{return{kind:p.kind,editor:p.editor,obj:Ol(k.text),start:k.start,end:k.end}}catch(A){console.error("[SVE] parse "+r+" gagal",A)}}return null}function Hh(){if(!u.doc)return null;let r=[];return E("[data-sve-section]",u.doc).forEach((n,s)=>{let l=[],c=new Set;E("[data-sve-field]",n).forEach(f=>{let x=f.getAttribute("data-sve-field");!x||c.has(x)||(c.add(x),l.push({type:f.getAttribute("data-sve-type")||"text",label:f.getAttribute("data-sve-label")||_e(x),path:x}))});let p=n.getAttribute("data-sve-countdown-path");p&&!c.has(p)&&l.push({type:"datetime",label:"Waktu Tujuan",path:p}),r.push({id:n.id||"section-"+s,label:n.getAttribute("data-sve-section")||_e(n.id)||"Section "+(s+1),visiblePath:n.getAttribute("data-sve-visible-path")||null,canHide:!!n.getAttribute("data-sve-visible-path"),reorderable:(n.getAttribute("data-section-id")||n.id||"")!=="cover",locked:!1,fields:l})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function hr(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=Hh(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function Fe(){let r=hr();return Array.isArray(r?.sections)?r.sections:[]}function ne(r){return String(r?.id||"").trim()}function ai(r){let n=ne(r);return!(!n||n==="cover"||r?.locked===!0||r?.reorderable===!1)}function dr(){let n=Fe().map(ne).filter(Boolean);if(!n.length)return[];let s=new Set(n),l=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(p=>String(p||"").trim()).filter(p=>p&&s.has(p)):[],c=[];return s.has("cover")&&c.push("cover"),l.forEach(p=>{p!=="cover"&&!c.includes(p)&&c.push(p)}),n.forEach(p=>{c.includes(p)||c.push(p)}),c}function Ai(){let r=Fe(),n=new Map(r.map(s=>[ne(s),s]));return dr().map(s=>n.get(s)).filter(Boolean)}function fr(r,n){let s=String(r||"").trim(),l=Fe().find(x=>ne(x)===s);if(!l||!ai(l))return!1;let c=dr(),p=c.indexOf(s);if(p<0)return!1;let f=p+n;for(;f>=0&&f<c.length;){let x=c[f],S=Fe().find(k=>ne(k)===x);if(x!=="cover"&&!S?.locked)return!0;f+=n}return!1}function Fl(r){if(!u.config)return!1;let n=Fe(),s=new Set(n.map(ne).filter(Boolean)),l=[];return s.has("cover")&&l.push("cover"),(Array.isArray(r)?r:[]).map(c=>String(c||"").trim()).filter(c=>c&&s.has(c)&&c!=="cover").forEach(c=>{l.includes(c)||l.push(c)}),n.map(ne).filter(Boolean).forEach(c=>{l.includes(c)||l.push(c)}),u.config.sectionOrder=l,!0}function Wh(r=document){E("[data-section-card]",r).forEach(n=>{let s=n.dataset.sectionCard,l=w("[data-section-up]",n),c=w("[data-section-down]",n);l&&(l.disabled=!fr(s,-1)),c&&(c.disabled=!fr(s,1))})}function Gh(r,n){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",n==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function Dl(r,n,s){let l=Oi();if(!l)return;let c=w(".reset-zone",l),p=new Map(E("[data-section-card]",l).map(f=>[f.dataset.sectionCard,f]));r.forEach(f=>{let x=p.get(f);x&&(c?l.insertBefore(x,c):l.appendChild(x))}),Wh(l),Gh(p.get(n),s)}function Vl(r,n){let s=String(r||"").trim(),l=Fe().find(S=>ne(S)===s);if(!l||!ai(l))return;let c=dr(),p=c.indexOf(s);if(p<0)return;let f=p+n;for(;f>=0&&f<c.length;){let S=c[f],k=Fe().find(A=>ne(A)===S);if(S!=="cover"&&!k?.locked)break;f+=n}if(f<0||f>=c.length||c[f]==="cover")return;let[x]=c.splice(p,1);c.splice(f,0,x),Fl(c),He("Urutan section diperbarui"),Dl(c,s,n<0?"up":"down")}function qh(r,n,s){let l=String(r||"").trim(),c=String(n||"").trim();if(!l||!c||l===c)return;let p=Fe(),f=p.find(Ie=>ne(Ie)===l),x=p.find(Ie=>ne(Ie)===c);if(!f||!x||!ai(f))return;let S=s==="after"?"after":"before";if(c==="cover")S="after";else if(!ai(x))return;let k=dr(),A=k.indexOf(l);if(A<0)return;k.splice(A,1);let _=k.indexOf(c);if(_<0)return;let I=_+(S==="after"?1:0);k[0]==="cover"&&(I=Math.max(1,I)),I=Math.min(k.length,I),k.splice(I,0,l);let z=k.indexOf(l);Fl(k),He("Urutan section diperbarui"),Dl(k,l,z<A?"up":"down")}function Bl(){let r=hr();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function ze(){if(u.contentStateDirty&&!De())return!1;if(u.lastSerializedConfig="",!ur())return u.sourceDirty=!0,!1;G(()=>{try{$d()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(W("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let n=Ea("CONFIG");u.config=n?.obj||null,u.configRange=n||null,u.configSourceText=n?n.editor.getValue().slice(n.start,n.end):"",u.configOwnerSource=n?n.editor.getValue():"";let s=Ea("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(fe(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Jh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function He(r){return Ti(r,{deferPreview:!0,syncImages:!0})?(ze(),!0):!1}function mr(r){return Ti(r,{deferPreview:!0,syncImages:!0})}function Kh(r,n){let s=r._handlers?.change;if(!Array.isArray(s))return n();let l=[];s.forEach((c,p)=>{c?.__sve||(l.push([p,c]),s[p]=()=>{})});try{return n()}finally{l.forEach(([c,p])=>{Array.isArray(s)&&(s[c]=p)})}}function Ti(r,n={}){if(!u.config||!u.configRange?.editor)return!1;let s=pf(u.config);if(s.length)return _i(s[0]),!1;let c=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:Ea("CONFIG");if(!c||c.editor!==u.configRange.editor)return _i("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let p=c.editor;if(!Ee(p)){let _=u.config,I=ze(),z=u.configRange?.editor;return!I||!Ee(z)?(_i("Editor Scalev sudah dimuat ulang. Muat ulang panel (tombol Muat ulang source) lalu ulangi perubahan."),!1):(u.config=_,Ti(r,n))}let f=p.getValue();if(f.slice(c.start,c.end)!==u.configSourceText)return _i("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let x=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(x===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null,k=n.wakeScalev!==!0&&gt.supported()===!0;try{u.internalEditorWrite+=1;let _=()=>p.operation(()=>{if(typeof p.replaceRange=="function"&&typeof p.posFromIndex=="function")p.replaceRange(x,p.posFromIndex(c.start),p.posFromIndex(c.end));else{let I=p.getValue?.()||"",z=I.slice(0,c.start)+x+I.slice(c.end);p.setValue(z)}p.save?.()});k?Kh(p,_):_(),(n.wakeScalev||!k)&&pr(p,!1)}catch(_){S=_}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{p.getValue()!==f&&p.setValue(f),pr(p,!1)}catch{}finally{u.internalEditorWrite-=1}return _i("Perubahan belum tersimpan: "+S.message),!1}c.end=c.start+x.length,c.obj=u.config,u.configRange=c,u.configSourceText=x,u.configOwnerSource=p.getValue();let A=gt.fromScalevSource(p.getValue());return u.lastSerializedConfig=x,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),gr(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Xh(),A&&!n.syncImages?u.performance.previewViaScalevCount=(u.performance.previewViaScalevCount||0)+1:n.deferPreview?pd({syncImages:!!n.syncImages}):Ze({syncImages:!!n.syncImages}),!0}function _i(r){u.commitError=r,u.contentStateDirty=!0;let n=document.getElementById(e+"-commit-notice");n&&(n.hidden=!1,n.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function gr(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,W(r)]))}function jl(){return e+":fresh-default:"+location.origin+location.pathname}function Aa(){let r=W("js"),n=u.configRange,s=n&&n.editor&&typeof n.start=="number"&&typeof n.end=="number"&&n.start<=n.end?r.slice(0,n.start)+"\u241F"+r.slice(n.end):r,l=["html",W("html"),"css",W("css"),"js",s,"head",W("head")].join("\u241E"),c=2166136261;for(let p=0;p<l.length;p++)c^=l.charCodeAt(p),c=Math.imul(c,16777619);return(c>>>0).toString(16).padStart(8,"0")}function Yh(){let r={};return J.forEach(([,,n])=>{let s=Pe(n);s&&(r[n]=s)}),Qe.forEach(n=>{r[n.variable]=Pe(n.variable)||n.fallback}),mt.forEach(({variable:n})=>{let s=Pe(n);s&&(r[n]=s)}),{version:t,config:u.config?me(u.config):null,cssTokens:r,googleFonts:me(M(u.config,"editorStyle.googleFonts")||{})}}function Ul(){try{let r=JSON.parse(localStorage.getItem(jl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function zl(r){try{localStorage.setItem(jl(),JSON.stringify(r))}catch{}}function Hl(){if(!u.config)return!1;let r=Aa(),n=Yh();return u.defaults=n,u.defaultConfig=me(n.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,gr(),zl({version:t,defaults:n,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Qh(r){let n=r?.cssTokens;return!n||typeof n!="object"?!1:mt.every(({variable:s})=>typeof n[s]=="string"&&n[s].trim()!=="")}function Jh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,l])=>W(s)===l))return;let r=Aa(),n=Ul();if(n?.defaults&&n.lastManagedFingerprint===r&&Qh(n.defaults)){u.defaults=n.defaults,u.defaultConfig=me(n.defaults.config||u.config),u.baselineFingerprint=n.baselineFingerprint||r,u.lastManagedFingerprint=r,gr();return}Hl()}function Wl(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,l])=>W(s)===l))return;let r=Aa(),n=Ul()||{};u.lastManagedFingerprint=r,zl({version:t,defaults:n.defaults||u.defaults,baselineFingerprint:n.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Xh=P(Wl,700);function Zh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{ze(),Hl(),u.open?ke():cr()}catch{}},420)}function ed(){u.allEditors.forEach(r=>{if(!r||u.editorChangeBound.has(r)||typeof r.on!="function")return;u.editorChangeBound.add(r);let n=()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Zh())};n.__sve=!0,r.on("change",n)})}function Gx(r){u.defaultConfig&&(ve(u.config,r,me(M(u.defaultConfig,r))),He("Berhasil direset"),ke())}let td="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",id="https://nikahin.myscalev.com/dashboard",Ta="nikahin_team_key";function rd(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(Ta,"")||"").trim()}catch{return""}}function ad(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(Ta,String(r||"").trim()),!0)}catch{return!1}}function nd(){try{return typeof GM_setValue!="function"?!1:(GM_setValue(Ta,""),!0)}catch{return!1}}let sd={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function _a(){return zt(u.scalevSlug||Ht())||""}async function Ia(r){let n=u.dashboardPin;if(n.busy)return;let s=_a();if(!s){n.status="error",n.message="Slug URL belum diisi di Pengaturan Scalev.",Et();return}let l=rd();if(!l){n.status="needkey",n.message="",Et();return}if(!(r==="generate"&&n.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){n.busy=!0,n.status="loading",n.message="",Et();try{let p=await(await Ca(td,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":l},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!p||p.ok!==!0?(n.status="error",n.pin="",n.message=sd[p&&p.error]||"Gagal mengambil PIN."):(n.status="ready",n.slug=s,n.pin=String(p.pin||""),n.version=Number(p.version)||0,n.message=p.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{n.status="error",n.pin="",n.message="Tidak bisa menghubungi server."}n.busy=!1,Et()}}function od(){let r=L("#"+e+"-team-key"),n=r?r.value.trim():"",s=u.dashboardPin;if(!n){s.message="Kunci tim belum diisi.",Et();return}if(!ad(n)){s.message="Tampermonkey menolak menyimpan kunci.",Et();return}s.status="idle",s.message="",Ia("peek")}function ld(){let r=u.dashboardPin;if(!nd()){r.message="Tampermonkey menolak menghapus kunci.",Et();return}r.status="needkey",r.pin="",r.version=0,r.message="",Et()}async function cd(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}Et()}}function Et(){let r=(L(":focus")||document.activeElement)?.id,n=L("#"+e+"-pin-panel");n&&(n.innerHTML=Gl());let s=L("#"+e+"-pin-pill");s&&(s.outerHTML=ac()),r?.startsWith(e+"-pin-")&&L("#"+r)?.focus({preventScroll:!0})}let qx={copy:'<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>'};function Gl(){let r=u.dashboardPin,n=_a(),s=S=>S?`<small class="pin-note">${S}</small>`:"";if(!n)return`
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
      `;let l=r.status==="ready"&&r.pin&&r.slug===n,c=r.busy||r.status==="loading",p=l?`
          <button
            type="button"
            class="pin-ctl-btn pin-ctl-primary"
            id="${e}-pin-copy"
          >
            Salin PIN
          </button>
        `:`
          <button
            type="button" ${c?"disabled":""}
            class="pin-ctl-btn pin-ctl-primary"
            id="${e}-pin-peek"
          >
            ${c?"Memuat\u2026":"Lihat PIN"}
          </button>
        `,f=l?`
          <button
            type="button" ${c?"disabled":""}
            class="pin-ctl-btn pin-ctl-ghost pin-ctl-danger"
            id="${e}-pin-generate"
          >
            PIN baru
          </button>
        `:`
          <button
            type="button"
            class="pin-ctl-btn pin-ctl-ghost"
            id="${e}-pin-changekey"
          >
            Kunci
          </button>
        `;return`
      <div class="pin-ctl">
        ${l?`
        <div class="pin-ctl-box">
          <input
            id="${e}-pin-value"
            type="text"
            value="${T(r.pin)}"
            readonly
            aria-readonly="true"
            aria-label="PIN"
            autocomplete="off"
            spellcheck="false"
          >
        </div>
      `:`
        <div class="pin-ctl-empty">
          ${c?"Mengambil PIN\u2026":"PIN belum dibuat"}
        </div>
      `}
        <div class="pin-ctl-foot">
          ${p}
          ${f}
          <a
            class="pin-ctl-link"
            href="${id}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function ud(){let r=u.defaults?.config;if(!r||!u.config)return 0;let n=0,s=(l,c,p)=>{if(!(p>6)){if(Array.isArray(l)||Array.isArray(c)){let f=Array.isArray(l)?l:[],x=Array.isArray(c)?c:[],S=Math.max(f.length,x.length);for(let k=0;k<S;k+=1)s(f[k],x[k],p+1);return}if(l&&c&&typeof l=="object"&&typeof c=="object"){for(let f of new Set([...Object.keys(l),...Object.keys(c)]))s(l[f],c[f],p+1);return}l!==c&&(n+=1)}};return s(u.config,r,0),n}function ql(){u.defaults&&(u.defaults.config&&(u.config=me(u.defaults.config),He()),Object.entries(u.defaults.cssTokens||{}).forEach(([r,n])=>{n&&et(r,n)}),fc(),He(),wr(),ze(),ke(),Ze())}function pd({syncImages:r=!1}={}){Ze({syncImages:r})}let gt=mh({document,window,getConfig:()=>u.config,syncImages:Pd,metrics:u.performance}),Xe=gh({document,window,getConfig:()=>u.config,getDocument:()=>hd(),metrics:u.performance});function hd(){try{let r=gt.scalevTarget?.();return gt.readDocument?.(r)??null}catch{return null}}function Ze({syncImages:r=!1,force:n=!1}={}){gt.request({images:r,force:n})}function dd(r){if(!r)return"";let n=new Date(r);if(Number.isNaN(n.getTime()))return"";let s=l=>String(l).padStart(2,"0");return n.getFullYear()+"-"+s(n.getMonth()+1)+"-"+s(n.getDate())+"T"+s(n.getHours())+":"+s(n.getMinutes())}function fd(r){if(!r)return"";let n=new Date(r),s=p=>String(p).padStart(2,"0"),l=-n.getTimezoneOffset(),c=l>=0?"+":"-";return r+":00"+c+s(Math.floor(Math.abs(l)/60))+":"+s(Math.abs(l)%60)}function Pe(r,n){let s=n?[n]:[La()],l=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(l+"\\s*:\\s*([^;{}]+);");for(let p of s){let f=c.exec(p||"");if(f)return f[1].trim()}return""}function Ii(r,n){let s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function La(){let r=[],n=W("css");return n&&r.push(n),[W("html"),W("head")].forEach(s=>{let l=String(s||""),c=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,p;for(;p=c.exec(l);)p[1]&&r.push(p[1])}),r.join(`
`)}function md(r){let n=String(r||"").trim(),s=n.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(s){let c=s[1];c.length===3&&(c=c.split("").map(f=>f+f).join(""));let p=parseInt(c,16);return[p>>16&255,p>>8&255,p&255].join(", ")}let l=n.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i);return l?[l[1],l[2],l[3]].join(", "):""}function Kl(r,n,s){let l=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp("("+l+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(c,"$1"+s+"$3")}function Yl(r,n){let s=l=>{if(l)try{l.documentElement?.style?.setProperty(r,n),l.body?.style?.setProperty(r,n),l.querySelector("[data-sve-template]")?.style?.setProperty(r,n)}catch{}};E("iframe").forEach(l=>{try{s(l.contentDocument)}catch{}})}function et(r,n){let s=["css","head","html"],l=null;for(let S of s)if(Ii(W(S),r)){l=S;break}if(!l)return!1;let c=W(l),p=Kl(c,r,n),f=r+"-rgb",x=md(n);return x&&Ii(c,f)&&(p=Kl(p,f,x)),p===c?!1:(Ct(l,p),Yl(r,n),x&&Ii(c,f)&&Yl(f,x),Ze(),!0)}function br(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function ge(r){let n=String(r?.type||"text").trim().toLowerCase();return n==="datetime-local"?"datetime":n==="checkbox"?"boolean":n}function gd(r,n){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||xa(r,n)}function Ql(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return me(r.default);let n=ge(r);return n==="boolean"?!1:""}function bd(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let l=s.value??s.id??s.key??"";return{value:String(l),label:String(s.label??s.name??l)}}return{value:String(s??""),label:String(s??"")}})}function xd(r){let n=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&n.push(`${s}="${T(r[s])}"`)}),r?.placeholder&&n.push(`placeholder="${T(r.placeholder)}"`),n.join(" ")}function yd(r){let n=String(r?.help||r?.description||"").trim();return n?`
        <small class="field-help">
          ${T(n)}
        </small>
      `:""}function vd(r,n){let s=M(u.config,n),l=ge(r),c=xa(r,n),p=gd(r,n),f=c?Ht()||s||"":s??"",x=`data-field-path="${T(n)}" data-field-type="${T(l)}" aria-label="${T(r?.label||n)}" `+(p?'data-field-readonly="1" ':""),S=xd(r);if(l==="textarea")return`
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
      `;if(l==="select"){let A=bd(r);return`
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
          value="${T(dd(f))}"
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
    `}function Jl(r,n){let s=n||r.path,l=T(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${l}</span>`:`<label>${l}</label>`}

        ${vd(r,s)}

        ${yd(r)}
      </div>
    `}function Li(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let n=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(n))return!0;let l=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(l)}function Xl(r){if(!r||typeof r!="object")return[];let n=u.repeaterContentFieldCache.get(r);if(n)return n;let s=(r?.fields||[]).filter(l=>ge(l)!=="repeater"&&ge(l)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function kd(r){if(Zl(r,M(u.config,r.path)))return Ql(r.fields[0]);let n={};return(r.fields||[]).forEach(s=>{s?.key&&(n[s.key]=Ql(s))}),n}function Zl(r,n){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(n)&&n.length?n:M(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(l=>typeof l=="string"||typeof l=="number")}function Sd(r,n,s){let l=String(r?.itemLabelKey||"").trim(),p=[l?n?.[l]:"",n?.title,n?.name,n?.label,n?.event,n?.provider].find(f=>String(f??"").trim());return String(p??"").trim()||(r.label||"Item")+" "+(s+1)}function wd(r){return(r?.fields||[]).some(s=>ge(s)==="repeater"||ge(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function Cd(r,n=null){let s=M(u.config,r.path),l=Array.isArray(s)?s:[],c=Number.isFinite(r.max)?r.max:999;return wd(r)+l.map((p,f)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${T(Sd(r,p,f))}
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

            ${Xl(r).map(x=>{let S=Zl(r,l)?r.path+"."+f:r.path+"."+f+"."+x.key;if(Li(x)){let k=n?.get(S);return k?Oa(k):""}return Jl({...x,type:x.type||"text"},S)}).join("")}
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
          `:"")}function $i(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function Ed(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function xr(r){if(!r||typeof r!="object")return[];let n=u.contentFieldCache.get(r);if(n)return n;let s=(r.fields||[]).filter(l=>!(l.type==="repeater"&&Xl(l).length===0));return u.contentFieldCache.set(r,s),s}function Ad(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return Ai().forEach(n=>{let s=ne(n),l="";try{l=JSON.stringify(n).toLowerCase()}catch{l=[s,n?.label||"",...xr(n).flatMap(p=>[p?.label||"",p?.path||"",...(p?.fields||[]).flatMap(f=>[f?.label||"",f?.key||""])])].join(" ").toLowerCase()}r.set(s,l)}),u.contentSearchIndex=r,r}function yr(r){r&&u.contentSectionHtmlCache.delete(String(r))}function vr(r){let n=ne(r);if(!n)return ec(r);if(u.contentSectionHtmlCache.has(n))return u.contentSectionHtmlCache.get(n);let s=ec(r);return u.contentSectionHtmlCache.set(n,s),s}function ni(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function $a(r){if(!r)return;let n=E("[data-section-card]",r).filter(l=>w("[data-section-body]",l)?.dataset.loaded==="1"),s=n.length-u.contentMaxMountedSections;s<=0||n.filter(l=>!l.classList.contains("open")).sort((l,c)=>Number(l.dataset.contentUse||0)-Number(c.dataset.contentUse||0)).slice(0,s).forEach(l=>{let c=w("[data-section-body]",l);c&&(c.replaceChildren(),c.dataset.loaded="0")})}function Td(){if(u.contentPrewarmScheduled||!u.config||!hr())return;let r=Ai();if(!r.length)return;u.contentPrewarmScheduled=!0;let n=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let l=2;for(;u.contentPrewarmCursor<r.length&&l>0;){let c=r[u.contentPrewarmCursor++],p=ne(c);if(p&&!u.contentSectionHtmlCache.has(p)&&vr(c),l-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=G(n,1200))};u.contentPrewarmHandle=G(n,1200)}function ec(r){let n=xr(r),s=new Map(Ma(r).map(f=>[f.path,f])),l=[],c="",p=f=>{let x=String(f||"").trim();return!x||x===c?"":(c=x,`
        <div class="sv-category" data-sv-category="${T(x)}">
          ${T(x)}
        </div>
      `)};return n.forEach(f=>{let x=String(f.category||"").trim();if(x||(c=""),Li(f)&&ge(f)!=="repeater-image"){let S=s.get(f.path);S&&l.push(p(x)+Oa(S));return}if(ge(f)==="repeater-image"){let S=Array.isArray(M(u.config,f.path))?M(u.config,f.path):[],k=Number.isFinite(f.max)?f.max:999,A=[...s.values()].filter(I=>I.rootPath===f.path).map(Oa).join(""),_=f.canAdd!==!1&&S.length<k?`
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
                ${Cd(f,s)}
              </div>
            </div>
          `);return}l.push(p(x)+`
          <div class="group">
            <div class="group-title">
              ${T(f.label||f.path)}
            </div>

            <div class="group-body">
              ${Jl({...f,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),l.join("")}function tc(r){return Ai().find(n=>ne(n)===r)||null}function _d(r){if(!r)return;let n=w("[data-section-body]",r);if(!n||n.dataset.loaded==="1")return;let s=tc(r.dataset.sectionCard);s&&(n.innerHTML=vr(s),n.dataset.loaded="1",ni(r),$a(Oi()))}function Pa(r){if(!r)return;let n=Oi();n&&(E("[data-section-card].open",n).forEach(s=>{s!==r&&(s.classList.remove("open"),w(".chev",s)?.setAttribute("aria-expanded","false"),ni(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),w(".chev",r)?.setAttribute("aria-expanded","true"),_d(r),ni(r),$a(n))}function ic(r){if(!r)return;let n=w("[data-section-body]",r),s=tc(r.dataset.sectionCard);!n||!s||(yr(r.dataset.sectionCard),n.innerHTML=vr(s),n.dataset.loaded="1",ni(r))}function rc(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let n=u.contentCommitMessage;u.contentCommitMessage="",Ti(n||void 0,{validate:!1,deferPreview:!0})},100)}function De(r=""){let n=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!n&&!r?!0:Ti(s||void 0,{validate:!0,deferPreview:!0})}function ac(){let r=u.dashboardPin,n=_a(),s=r.status==="ready"&&r.pin&&r.slug===n,l="Belum diambil",c="idle";return n?r.busy||r.status==="loading"?(l="Memuat\u2026",c="loading"):r.status==="needkey"?(l="Perlu kunci",c="warn"):r.status==="error"?(l="Gagal",c="error"):s&&(l="Aktif",c="ok"):l="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${c}">${l}</span>`}function nc(){if(!u.config)return $i();if(!hr())return Ed();let r=Ai(),n=Ad(),s=r.filter(l=>u.search?(n.get(ne(l))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${ac()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Gl()}</div>
      </div>

      ${s.map(l=>{let c=ne(l),p=l.label||c,f=ai(l),x=!l.visiblePath||M(u.config,l.visiblePath)!==!1,S=xr(l),k=!u.search&&u.contentOpenSections.has(c);return`
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
                    ${ga()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${T(c)}"
                    ${fr(c,-1)?"":"disabled"}
                    aria-label="Naikkan ${T(p)}"
                    title="Naik"
                  >
                    ${ti("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${T(c)}"
                    ${fr(c,1)?"":"disabled"}
                    aria-label="Turunkan ${T(p)}"
                    title="Turun"
                  >
                    ${ti("down")}
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
                  ${sr("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${T(c)}"
                data-loaded="${k?"1":"0"}"
              >
                ${k?vr(l):""}
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
    `}function Na(){return Fe().flatMap(r=>r.fields||[]).filter(r=>ge(r)==="repeater-image"&&r?.path)}function Kx(){return Na()[0]||null}function Id(r){let n=String(r||"").trim();return n&&Na().find(s=>String(s.path||"").trim()===n)||null}function Ra(r){let n=Array.isArray(r?.fields)?r.fields:[];return n.find(s=>s?.key&&Li(s))||n.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function sc(r){let n=String(r||"").trim();if(!n)return null;for(let s of Na()){let l=String(s.path||"").trim(),c=l+".";if(!l||!n.startsWith(c))continue;let p=n.slice(c.length).split(".");if(p.length!==2)continue;let f=Number(p[0]);if(!Number.isInteger(f)||f<0)continue;let x=Ra(s),S=String(x?.key||"src");if(p[1]===S)return{field:s,imageField:x,imageKey:S,rootPath:l,index:f}}return null}function oc(r){return u.doc?!!E('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function Ma(r){let n=[],s=new Set;return(r?[r]:Fe()).forEach(l=>{(l.fields||[]).forEach(c=>{if(Li(c)&&c.type!=="repeater-image"&&c.path&&!s.has(c.path)&&(n.push({label:c.label||_e(c.path),path:c.path,gallery:!1,wrapped:oc(c.path)}),s.add(c.path)),c.type==="repeater"&&c.path){let p=M(u.config,c.path),f=(c.fields||[]).filter(x=>Li(x)&&x.key);Array.isArray(p)&&f.length&&p.forEach((x,S)=>{f.forEach(k=>{let A=c.path+"."+S+"."+k.key;s.has(A)||(n.push({label:(l.label||c.label||_e(c.path))+" "+(S+1)+" \xB7 "+(k.label||_e(k.key)),path:A,gallery:!1,wrapped:oc(A)}),s.add(A))})})}if(ge(c)==="repeater-image"&&c.path){let p=M(u.config,c.path),f=Ra(c),x=String(f?.key||"src");Array.isArray(p)&&p.forEach((S,k)=>{let A=c.path+"."+k+"."+x;s.has(A)||(n.push({label:(c.label||"Foto Gallery")+" "+(k+1),path:A,gallery:!0,index:k,rootPath:c.path,imageKey:x,wrapped:!0}),s.add(A))})}})}),u.doc&&E('[data-sve-type="image"][data-sve-field]',u.doc).forEach(l=>{let c=l.getAttribute("data-sve-field");if(!c||s.has(c))return;let p=sc(c),f=!!p;n.push({label:l.getAttribute("data-sve-label")||_e(c),path:c,gallery:f,index:p?p.index:null,rootPath:p?p.rootPath:null,imageKey:p?p.imageKey:null,wrapped:!!l.closest("[data-sve-image-wrapper]")}),s.add(c)}),n}function lc(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function si(r){let n=u.config?.imageSettings,s=n&&typeof n=="object"?n[r]:null,l=sc(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:ma(s?.fit),alignPos:Je.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function oi(r,n){let s=lc();s[r]={...si(r),...n}}function Ld(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let n=new Set(Ma().map(s=>s.path));Object.keys(r).forEach(s=>{n.has(s)||delete r[s]})}function $d(){let r=W("css");if(!r)return;let n=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return n!==r.trim()?(Ct("css",n),!0):!1}function Pd(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let l=s.getAttribute("data-sve-field");if(!l)return;let c=si(l),p=s.closest("[data-sve-image-wrapper]"),f=p||s,x=c.align==="left"?"0":"auto",S=c.align==="right"?"0":"auto";p?(p.style.display=c.hidden?"none":"",p.style.width=c.width+"%",p.style.maxWidth="100%",p.style.marginLeft=x,p.style.marginRight=S,s.style.width="100%"):(s.style.display=c.hidden?"none":"",s.style.width=c.width+"%",s.style.maxWidth="100%",s.style.marginLeft=x,s.style.marginRight=S),c.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=c.fit;let k=fa[c.alignPos]||"";k?s.style.objectPosition=k:s.style.removeProperty("object-position"),s.style.height="100%"})}function Yx(){gt.request({images:!0})}function Nd(r){let n={"top left":`
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
        ${n[r]||n.default}
      </svg>
    `}function Rd(r){let n=si(r.path),s=c=>{let p={left:["M21 5H3","M15 12H3","M17 19H3"],center:["M21 5H3","M17 12H7","M19 19H5"],right:["M21 5H3","M21 12H9","M21 19H7"]};return`
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
          ${(p[c]||p.center).map(x=>`<path d="${x}"></path>`).join("")}
        </svg>
      `};return`
      <details class="image-advance">
        <summary class="advance-summary">
          <span>
            Advance
          </span>

          <!-- Lucide: chevron-down \u2014 https://lucide.dev/icons/chevron-down -->
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
            class="advance-chevron"
          >
            <path d="m6 9 6 6 6-6"></path>
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
              ${Je.filter(c=>c!=="default").map(c=>`
            <button
              type="button"
              class="advance-pos-btn ${n.alignPos===c?"active":""}"
              data-image-alignpos-path="${T(r.path)}"
              data-image-alignpos="${T(c)}"
              title="${T(c)}"
              aria-label="${T("Posisi "+c)}"
            >
              ${Nd(c)}
            </button>
          `).join("")}
            </div>

            <button
              type="button"
              class="advance-pos-default ${n.alignPos==="default"?"active":""}"
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
                aria-label="Lebar gambar persen"
                value="${n.width}"
                data-image-width-path="${T(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${n.width}"
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
                class="advance-fit-btn ${n.fit==="auto"?"active":""}"
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
                class="advance-fit-btn ${n.fit==="cover"?"active":""}"
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
                class="advance-fit-btn ${n.fit==="contain"?"active":""}"
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
    `}function Md(){return`
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
    `}function Od(){return`
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
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
        <path d="M3 6h18"></path>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    `}function cc(){return`
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
        <path d="M16 5h6"></path>
        <path d="M19 2v6"></path>
        <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        <circle cx="9" cy="9" r="2"></circle>
      </svg>
    `}function Fd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${cc()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function Dd(){return`
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
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `}function Vd(r,n){let s=M(u.config,r);if(!Array.isArray(s)||n<0||n>=s.length)return;let l=Id(r),c=Ra(l),p=String(c?.key||"src"),f=lc(),x={};for(let S=0;S<s.length;S++){let k=r+"."+S+"."+p;Object.prototype.hasOwnProperty.call(f,k)&&(x[S]=me(f[k]))}s.splice(n,1),Object.keys(f).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+p)&&delete f[S]});for(let S=0;S<s.length;S++){let k=S<n?S:S+1,A=x[k];A&&(f[r+"."+S+"."+p]=A)}Ld(),He("Foto gallery dihapus"),ke()}function Bd(r){u.config&&(ve(u.config,r,""),oi(r,{hidden:!0}),He("Gambar dihapus"),ke())}function Oa(r){let n=M(u.config,r.path)||"",s=si(r.path),c=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!r.gallery?`data-gallery-delete-index="${T(r.rootPath)}" data-gallery-index="${Number(r.index)}"`:`data-image-delete-path="${T(r.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${Od()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${T(r.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${Dd()}
              </button>
            </div>
          `;return`
            <div
              class="group image-card ${s.hidden?"image-card-hidden":""}"
              data-image-card-path="${T(r.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${n?`
                        <img
                          class="preview"
                          src="${T(n)}"
                          alt=""
                        >
                      `:Fd(r.path)}
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
                  value="${T(n)}"
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
                  ${Md()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${r.gallery?(()=>{let f=r.path.replace(/\.src$/,".alt"),x=M(u.config,f)||"";return`
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

              ${Rd(r)}
            </div>
          `}function Pi(r,n){let s=r?.closest(".image-card");if(!s)return;let l=w(".image-preview-shell",s);if(!l)return;let c=r.value.trim(),p=si(n),f=w(".preview",l);if(c){if(!f||f.tagName!=="IMG"){let x=document.createElement("img");x.className="preview",x.alt="",f?f.replaceWith(x):l.prepend(x),f=x}f.src=c}else{if(!f||f.tagName!=="BUTTON"||!f.classList.contains("image-upload-placeholder")){let x=document.createElement("button");x.type="button",x.className="preview empty image-upload-placeholder",x.dataset.imageFocus=n,x.setAttribute("aria-label","Masukkan URL gambar"),f?f.replaceWith(x):l.prepend(x),f=x}f.innerHTML=`
        <span class="image-upload-icon">
          ${cc()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,f.onclick=()=>{r.focus(),r.select?.()}}f.style.width="100%",f.style.height="100%",f.style.maxWidth="none",f.style.aspectRatio="auto",f.style.objectFit="cover",f.style.marginLeft="0",f.style.marginRight="0",s.classList.toggle("image-card-hidden",p.hidden)}function kr(r,n){let s=si(n);E(`[data-image-align-path="${CSS.escape(n)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlign===s.align)}),E(`[data-image-fit-path="${CSS.escape(n)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageFit===s.fit)}),E(`[data-image-alignpos-path="${CSS.escape(n)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlignpos===s.alignPos)});let l=w(`[data-image-width-path="${CSS.escape(n)}"]`,r),c=w(`[data-image-width-number="${CSS.escape(n)}"]`,r);l&&(l.value=s.width),c&&(c.value=s.width)}function jd(r){let n=String(r||"").trim();if(!n||/^var\(/i.test(n))return!1;try{return CSS.supports("color",n)}catch{return/^#[0-9a-f]{3,8}$/i.test(n)}}function Ni(r,n="#000000"){let s=String(r||"").trim(),l=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(l){let c=l[1];return c.length===3&&(c=c.split("").map(p=>p+p).join("")),"#"+c.slice(0,6).toLowerCase()}try{let c=document.createElement("span");if(c.style.color=s,!c.style.color)return n;c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c);let p=getComputedStyle(c).color;c.remove();let f=p.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!f)return n;let x=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+x(f[1])+x(f[2])+x(f[3])}catch{return n}}function Ud(){return J.some(([,,r])=>!!Pe(r))}function zd(r,n){let s=Pe(n);if(!s)return`
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
              ${T(n)}
            </small>
          </div>
        </div>
      `;let l=Ni(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${T(n)}"
          value="${T(l)}"
          aria-label="${T(r)}"
        >

        <div>
          <label>
            ${T(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${T(n)}"
            value="${T(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
            aria-label="Nilai warna ${T(r)}"
          >

          <small>
            ${T(n)}
          </small>
        </div>
      </div>
    `}function Hd(){return u.config?Ud()?[...new Set(J.map(n=>n[0]))].map(n=>`
            <div class="group">
              <div class="group-title">
                ${n}
              </div>

              ${J.filter(s=>s[0]===n).map(([,s,l])=>zd(s,l)).join("")}
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
      `:$i()}let Wd={"playwrite brasil guides":"Playwrite BR Guides"};function Fa(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function Da(r){let n="";try{n=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{n=String(r||"").replace(/\+/g," ")}return Fa(n.split(":")[0].replace(/\s+/g," "))}function Ri(r){let n=Fa(r);return n?Wd[n.toLowerCase()]||n:""}function Gd(r){let n=String(r||"").trim();if(!n)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(n))try{let l=new URL(n),c=l.hostname.toLowerCase();if(c==="fonts.google.com"||c==="www.fonts.google.com"){let p=l.pathname.match(/^\/specimen\/([^/?#]+)/);if(p?.[1])return{family:Ri(Da(p[1])),isUrl:!0,valid:!0};let f=l.searchParams.get("family");return f?{family:Ri(Da(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(c==="fonts.googleapis.com"){let f=l.searchParams.getAll("family")[0]||"";return f?{family:Ri(Da(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=n.split(",")[0];return{family:Ri(Fa(s)),isUrl:!1,valid:!0}}function qd(r,n=""){let s=Ri(r);if(!s)return"";let l=encodeURIComponent(s).replace(/%20/g,"+"),c=String(n||"").trim();return"https://fonts.googleapis.com/css2?family="+l+(c?":wght@"+encodeURIComponent(c):"")+"&display=swap"}function Va(r,n=""){let s=qd(r,n);return s?new Promise(l=>{let c=e+"-font-validation-link";document.getElementById(c)?.remove();let p=document.createElement("link"),f=!1,x=k=>{f||(f=!0,clearTimeout(S),p.onload=null,p.onerror=null,l(k))},S=setTimeout(()=>{x({ok:!1,reason:"timeout"})},7e3);p.id=c,p.rel="stylesheet",p.href=s,p.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let k=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!k||k.length===0){x({ok:!1,reason:"font-file"});return}}x({ok:!0,reason:"ok",url:s})}catch{x({ok:!1,reason:"font-file"})}},p.onerror=()=>{x({ok:!1,reason:"stylesheet"})},document.head.appendChild(p)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Kd(r,n){let l=Sr(n,Pe(n==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),c=await Va(r,l);return c.ok?{...c,weight:l}:l!=="400"&&(c=await Va(r,"400"),c.ok)?{...c,weight:"400",normalizedWeight:!0}:(c=await Va(r,""),c.ok?{...c,weight:"400",normalizedWeight:l!=="400"}:{...c,weight:l})}function uc(r,n){if(!r)return;let s=Array.isArray(n)?n.filter(Boolean):n?[n]:[];try{let l=r.head||r.documentElement;if(!l)return;s.forEach((c,p)=>{let f=e+"-preview-font-link-"+p,x=r.getElementById(f);x||(x=r.createElement("link"),x.id=f,x.rel="stylesheet",l.appendChild(x)),x.getAttribute("href")!==c&&x.setAttribute("href",c)}),Array.from(r.querySelectorAll('link[id^="'+e+'-preview-font-link"]')).forEach(c=>{s.includes(c.getAttribute("href"))||c.remove()})}catch{}}function pc(){let r=Ba(),n=()=>E("iframe").forEach(s=>{try{uc(s.contentDocument,r)}catch{}});n(),requestAnimationFrame(n)}function hc(r){return String(M(u.config,"editorStyle.googleFonts."+r)||"").trim()}function dc(r){let n=hc(r);if(n)return n;let l=Pe(r==="heading"?"--sve-font-heading":"--sve-font-body");return l?l.split(",")[0].replace(/["']/g,"").trim():""}function Yd(r,n){return n==="heading"?"serif":"sans-serif"}function Qd(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Jd(r,n){return de.includes(String(n))}function Xd(r){return de}function Sr(r,n){let s=String(n||"").trim();return de.includes(s)?s:"400"}function Zd(r,n=!1){let s=w("#"+e+"-body");if(!s)return;let l=r==="heading"?"--sve-heading-weight":"--sve-body-weight",c=w(`[data-style-var="${CSS.escape(l)}"]`,s);if(!c)return;let p=Pe(l)||"400",f=Sr(r,p);n&&f!==p&&et(l,f),c.innerHTML=Er(f,de,!1),c.value=f}function Ba(){let r=new Map;["heading","body"].forEach(s=>{let l=hc(s);if(!l)return;let c=l.trim().toLowerCase();if(!c)return;r.has(c)||r.set(c,{family:l,weights:new Set});let f=Sr(s,Pe(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(c).weights.add(f)});let n=Array.from(r.values()).map(s=>{let l=encodeURIComponent(s.family).replace(/%20/g,"+"),c=Array.from(s.weights).sort((p,f)=>Number(p)-Number(f));return"family="+l+":wght@"+c.join(";")});return n.length?n.map(s=>"https://fonts.googleapis.com/css2?"+s+"&display=swap"):[]}function Qx(){return Ba().join("|")}function wr(){let r=Ba(),n="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",l=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r.length){if(u.editors.head){let f=W("head");l.test(f)&&Ct("head",f.replace(l,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),E("iframe").forEach(f=>{try{uc(f.contentDocument,[])}catch{}});return}let c=`${n}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${r.map(f=>`<link rel="stylesheet" href="${f}">`).join(`
`)}
${s}`;if(u.editors.head){let f=W("head");f=l.test(f)?f.replace(l,c):f.trimEnd()+`

`+c+`
`,Ct("head",f)}let p=Array.from(document.querySelectorAll('link[id^="'+e+'-font-link"]'));r.forEach((f,x)=>{let S=x===0?e+"-font-link":e+"-font-link-"+x,k=document.getElementById(S);k||(k=document.createElement("link"),k.id=S,k.rel="stylesheet",document.head.appendChild(k)),k.href=f}),p.forEach(f=>{r.includes(f.href)||f.remove()}),pc()}async function Cr(r){let n=w("#"+e+"-"+r+"-font");if(!n)return;let s=Gd(n.value);if(!s.valid||!s.family)return;let l=s.family;n.value=l;let c=await Kd(l,r);if(!c.ok){c.reason==="stylesheet"||c.reason==="font-file"||c.reason;return}let p=r==="heading"?"--sve-font-heading":"--sve-font-body",f=r==="heading"?"--sve-heading-weight":"--sve-body-weight";c.normalizedWeight&&c.weight&&et(f,c.weight),ve(u.config,"editorStyle.googleFonts."+r,l),He(),et(p,`"${l}", ${Yd(l,r)}`),Zd(r,!1),wr(),pc(),Ze()}function Er(r,n,s=!0,l=!1){let c=String(r||"").trim(),p=s&&c&&!n.includes(c)?[c,...n]:[...n];return l&&(p=[...new Set(p)].sort((f,x)=>{let S=Number.parseFloat(f),k=Number.parseFloat(x);return Number.isFinite(S)&&Number.isFinite(k)?S-k:String(f).localeCompare(String(x))})),p.map((f,x)=>{let S=n.includes(c)||s?f===c:x===0;return`
            <option
              value="${T(f)}"
              ${S?"selected":""}
            >
              ${T(f)}
            </option>
          `}).join("")}function ef(r){let n=Pe(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
          aria-label="Ukuran font"
        >
          ${Er(n,ee,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
          aria-label="Tinggi baris"
        >
          ${Er(n,re,!1)}
        </select>
      `;if(r.type==="weight"){let s=Qd(r.variable),l=s?Xd(s):de,c=s?Sr(s,n):n;return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
          aria-label="Ketebalan font"
        >
          ${Er(c,l,!1)}
        </select>
      `}return""}function fc(){if(!u.config)return!1;let r=u.defaults?.cssTokens||{},n=!1;return mt.forEach(({target:s,variable:l})=>{let c=typeof r[l]=="string"?r[l].trim():"",p=M(u.config,"editorStyle.googleFonts."+s),f=typeof p=="string"&&p.trim()!=="";c&&(et(l,c),n=!0),f&&(ve(u.config,"editorStyle.googleFonts."+s,""),n=!0)}),n}function tf(){u.config&&(fc(),Qe.forEach(r=>{let n=br(r.variable)||r.fallback;et(r.variable,n)}),He(),wr(),ke())}function rf(){return u.config?`
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
            value="${T(dc("heading"))}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
            aria-label="Google Font untuk judul"
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
            value="${T(dc("body"))}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
            aria-label="Google Font untuk isi"
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

          ${sr("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${Me.map(r=>{let n=Qe.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${T(r.label)}</div>
                  <div class="typography-control-grid">
                    ${n.map(s=>`
                      <div class="typography-control">
                        <label>${T(s.label)}</label>
                        ${ef(s)}
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
    `:$i()}function Ar(r){let n=String(r||"").trim().toLowerCase();if(!n)return 0;if(/^\d+$/.test(n))return Math.max(0,Number(n));let s=n.split(":").map(f=>Number(f));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let l=Number(n.match(/(\d+)h/)?.[1]||0),c=Number(n.match(/(\d+)m/)?.[1]||0),p=Number(n.match(/(\d+)s/)?.[1]||0);return l||c||p?Math.max(0,l*3600+c*60+p):0}function mc(r){let n=String(r||"").trim();if(!n)return 0;try{let s=new URL(n,location.href),l=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let c of l){let p=Ar(c);if(p>0)return p}}catch{let l=n.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return Ar(l?.[1]||"")}return 0}function ja(r){let n=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(n/3600),l=Math.floor(n%3600/60),c=n%60,p=f=>String(f).padStart(2,"0");return s>0?s+":"+p(l)+":"+p(c):l+":"+p(c)}function af(r,n){let s=String(r||"").trim(),l=Math.max(0,Math.floor(Number(n)||0));if(!s)return s;try{let c=new URL(s,location.href);return c.searchParams.delete("start"),l>0?c.searchParams.set("t",String(l)):c.searchParams.delete("t"),c.hash&&/(?:^#|[&#])t=/i.test(c.hash)&&(c.hash=""),c.toString()}catch{let p=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return l<=0?p:p+(p.includes("?")?"&":"?")+"t="+l}}function gc(r,n){let s=mc(n),l=w("#"+e+"-audio-start-enabled",r),c=w("#"+e+"-audio-start-time",r);l&&(l.checked=s>0),c&&(c.disabled=s<=0,c.value=ja(s))}function nf(){if(!u.config)return $i();let r=Bl(),n=r.path||"assets.audio",s=M(u.config,n),l=typeof s=="string"?s:"",c=mc(l);return`
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
            aria-label="URL Audio atau YouTube"
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
              value="${T(ja(c))}"
              placeholder="0:00"
              ${c>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function Tr(r,n){(Array.isArray(r)?r:[]).forEach(s=>{n(s),ge(s)==="repeater"&&Tr(s.fields,n),ge(s)==="repeater-image"&&Tr(s.fields,n)})}function bc(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},n={html:W("html"),css:W("css"),js:W("js"),head:W("head")},s=(S,k)=>{try{let A=new URL(k,location.origin);if(A.protocol!=="https:"&&A.protocol!=="http:")return;let _=A.origin;if(_===location.origin)return;r[S]?.add(_)}catch{}},l=(S,k)=>{let A=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(A)||[]).forEach(_=>s(k,_))};try{let S=new DOMParser().parseFromString(n.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(k=>{s("img_src",k.getAttribute("src")||k.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(k=>s("media_src",k.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(k=>s("frame_src",k.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(k=>s("script_src",k.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(k=>s("style_src",k.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(k=>s("manifest_src",k.getAttribute("href")||""))}catch{}let c=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,p;for(;p=c.exec((n.css||"")+`
`+(n.head||""));){let S=p[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}l(n.head,"style_src");let f=JSON.stringify(u.config||{}),x=M(u.config,"guestbook.endpoint");return x&&s("connect_src",x),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let k=M(u.config,S);k&&s("connect_src",k)}),(f.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(n.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,k])=>[S,Array.from(k).sort()]))}function sf(){return{"Body HTML":W("html"),CSS:W("css"),JavaScript:W("js"),"Additional Head":W("head"),CONFIG:JSON.stringify(u.config||{})}}function xc(r,n,s){let l=sf(),c=ei(l);c.length?r("Gambar base64 terdeteksi di "+nr(c)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let p=ar(l);p.length&&n("Data URI berukuran besar di "+nr(p)+"; pertimbangkan pindah ke file hosting")}function of(){let r=[],n=[],s=[],l=te=>r.push(te),c=te=>n.push(te),p=te=>s.push(te);if(u.config?p("CONFIG terbaca sebagai static object"):l("CONFIG tidak terbaca"),u.schema?p("SVE_SCHEMA custom page tersedia"):l("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),p("CONFIG JSON-compatible")}catch{l("CONFIG tidak dapat diserialisasi dengan aman")}let f=Array.isArray(u.schema?.sections)?u.schema.sections:[],x=f.map(ne).filter(Boolean),S=new Set(x);f.length||l("SVE_SCHEMA custom page belum memiliki section"),x.length!==S.size&&l("SVE_SCHEMA memiliki duplicate section id");let k=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],A=new Set(k);k.length!==A.size&&l("CONFIG.sectionOrder memiliki duplicate id"),x.forEach(te=>{A.has(te)||l("sectionOrder belum memuat: "+te)}),f.forEach(te=>{let We=ne(te);te.visiblePath&&(Te(te.visiblePath)||l("Unsafe visiblePath pada section "+We),u.config&&typeof M(u.config,te.visiblePath)!="boolean"&&l("Visibility path harus boolean pada section "+We)),Tr(te.fields,Ge=>{let Mt=ge(Ge);Oe.has(Mt)||l("Field type tidak didukung: "+Mt+" ("+(Ge.path||Ge.key||We)+")"),Ge.path&&!Te(Ge.path)&&l("Unsafe field path: "+Ge.path),(Mt==="repeater"||Mt==="repeater-image")&&!Array.isArray(Ge.fields)&&l("Repeater tanpa fields[]: "+(Ge.path||We)),Mt==="repeater"&&(Ge.fields||[]).forEach(Fi=>{let Ua=ge(Fi);(Ua==="repeater"||Ua==="repeater-image")&&l("Nested repeater tidak diizinkan: "+(Ge.path||We)),Fi.key||l("Repeater subfield tanpa stable key: "+(Ge.path||We))})})});let _=["html","css","js","head"].map(W).join(`
`);/\beval\s*\(/.test(_)&&l("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(_)&&l("new Function() terdeteksi"),/javascript\s*:/i.test(_)&&l("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(_)&&l("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(_)&&l("Kemungkinan secret/private credential terdeteksi"),xc(l,c,p);let I=La(),z=Qe.map(te=>te.variable).filter(te=>!Ii(I,te));z.length?l("Typography role tokens belum lengkap: "+z.join(", ")):p("Semua typography role tokens tersedia");let Ie=bc();return Object.values(Ie).reduce((te,We)=>te+We.length,0)&&c("External origin terdeteksi; salin CSP manifest ke Scalev Security"),p("Custom page aktif; validasi "+lt.length+" section wedding dilewati"),{status:r.length?"BLOCKER":n.length?"WARNING":"PASS",blockers:r,warnings:n,passes:s,csp:Ie}}let _r=null;function yc(){let r=["html","css","js","head"].map(W);if(_r&&r.every((l,c)=>l===_r.sources[c]))return _r.report;let n=new DOMParser().parseFromString(r[0],"text/html");n.head.insertAdjacentHTML("beforeend",r[3]);let s=El({doc:n,scripts:[r[2],...Array.from(n.querySelectorAll("script"),l=>l.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(n.querySelectorAll("style"),l=>l.textContent).join(`
`)});return _r={sources:r,report:s},s}function lf(){let r=yc();if(u.schema?.template?.type==="custom-page"){let B=of();return B.blockers=[...new Set([...r.blockers,...B.blockers])],B.blockers.length&&(B.status="BLOCKER"),B}let n=[...r.blockers],s=[],l=[],c=B=>n.push(B),p=B=>s.push(B),f=B=>l.push(B);if(u.config?f("CONFIG terbaca sebagai static object"):c("CONFIG tidak terbaca"),u.schema?f("SVE_SCHEMA eksplisit tersedia"):c("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),f("CONFIG JSON-compatible")}catch{c("CONFIG tidak dapat diserialisasi dengan aman")}let x=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=x.map(ne).filter(Boolean),k=new Set(S);S.length!==k.size&&c("SVE_SCHEMA memiliki duplicate section id"),lt.forEach(B=>{k.has(B)||c("Canonical section hilang: "+B)}),lt.every(B=>k.has(B))&&f(lt.length+" canonical sections tersedia");let A=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],_=new Set(A);A.length!==_.size&&c("CONFIG.sectionOrder memiliki duplicate id"),lt.forEach(B=>{_.has(B)||c("sectionOrder belum memuat: "+B)}),A[0]&&A[0]!=="cover"&&c("Cover wajib menjadi section pertama"),M(u.config,"invitation.isDemo")===!0&&p("Mode Demo AKTIF \u2014 RSVP tamu tidak dikirim ke server. Matikan sebelum dipakai klien."),M(u.config,"invitation.isExclusive")===!0&&p("Undangan Khusus AKTIF \u2014 halaman hanya terbuka dengan link bertoken."),lt.filter(B=>B!=="cover").forEach(B=>{typeof M(u.config,"sections."+B)!="boolean"&&c("Boolean visibility tidak valid: sections."+B)}),x.forEach(B=>{let qe=ne(B);qe==="cover"?(B.locked!==!0||B.canHide!==!1)&&c("Cover harus locked dan canHide:false"):B.visiblePath&&!Te(B.visiblePath)&&c("Unsafe visiblePath pada section "+qe),Tr(B.fields,ct=>{let Di=ge(ct);Oe.has(Di)||c("Field type tidak didukung: "+Di+" ("+(ct.path||ct.key||qe)+")"),ct.path&&!Te(ct.path)&&c("Unsafe field path: "+ct.path),(Di==="repeater"||Di==="repeater-image")&&!Array.isArray(ct.fields)&&c("Repeater tanpa fields[]: "+(ct.path||qe)),Di==="repeater"&&(ct.fields||[]).forEach(Lc=>{let $c=ge(Lc);($c==="repeater"||$c==="repeater-image")&&c("Nested repeater tidak diizinkan: "+(ct.path||qe)),Lc.key||c("Repeater subfield tanpa stable key: "+(ct.path||qe))})})});let I=["html","css","js","head"].map(W).join(`
`);/\beval\s*\(/.test(I)&&c("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(I)&&c("new Function() terdeteksi"),/javascript\s*:/i.test(I)&&c("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(I)&&c("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(I)&&c("Kemungkinan secret/private credential terdeteksi"),xc(c,p,f);let z=W("js");/\bconst\s+CONFIG\s*=/.test(z)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(z)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let Ie=M(u.config,"sections.rsvp")===!0,Rt=M(u.config,"sections.guestbook")===!0,te=String(M(u.config,"rsvp.endpoint")||""),We=M(u.config,"rsvp.enabled"),Ge=!!te||We!==void 0;if(Ie)if(Ge)We!==!0&&c("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(te)||c("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let B=String(M(u.config,"extensions.rsvpBackend.mode")||"none");if(B!=="none"&&B!=="external"&&c("RSVP backend mode harus none atau external"),B==="external"){let qe=String(M(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(qe)||c("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(Rt){let B=M(u.config,"guestbook.enabled"),qe=String(M(u.config,"guestbook.endpoint")||"");B!==!0&&c("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(qe)||c("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let Mt=La(),Fi=Qe.map(B=>B.variable).filter(B=>!Ii(Mt,B));Fi.length?c("Typography role tokens belum lengkap: "+Fi.join(", ")):f("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(Mt)&&p("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let Ic=bc();return Object.values(Ic).reduce((B,qe)=>B+qe.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):f("Tidak ada external origin wajib dari scanner"),{status:n.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:n,warnings:s,passes:l,csp:Ic}}function cf(r){return r==="PASS"?`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      `:r==="WARNING"?`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      `:`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    `}function uf(){if(!u.config)return $i();let r=lf(),n=(c,p)=>c.length?`<ul>${c.map(f=>`<li>${T(f)}</li>`).join("")}</ul>`:`<p class="compat-empty">${T(p)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",l=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${cf(r.status)}
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
              ${n(r.blockers,"Tidak ada masalah.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Perlu dicek</strong>
              ${n(r.warnings,"Tidak ada yang perlu dicek.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Siap</strong>
              ${n(r.passes,"Belum ada hasil.")}
            </div>
            <div class="compat-detail-group">
              <strong>Keamanan</strong>
              <pre class="compat-code">${T(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function pf(r){let n=[],s=new WeakSet,l=(c,p="CONFIG")=>{if(c!==null){if(typeof c=="object"){if(s.has(c)){n.push("Referensi berulang: "+p);return}s.add(c)}if(Array.isArray(c)){c.forEach((f,x)=>l(f,p+"."+x));return}if(typeof c=="object"){Object.keys(c).forEach(f=>{Ae.has(f)&&n.push("Forbidden key: "+p+"."+f),l(c[f],p+"."+f)});return}["string","number","boolean"].includes(typeof c)||n.push("Non-static value: "+p),typeof c=="number"&&!Number.isFinite(c)&&n.push("Non-finite number: "+p)}};l(r);try{JSON.parse(JSON.stringify(r))}catch{n.push("CONFIG gagal round-trip JSON")}return n}function hf(){let r=u.templateLibrary,n=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(p=>n?[p.name].join(" ").toLowerCase().includes(n):!0);r.status==="idle"&&Rl().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,ke())});let l=r.error?`
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
                <span>${n?"Coba kata pencarian lain.":"Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `}function df(){let r=w("#"+e+"-search");if(!r)return;let n=u.tab==="library";r.placeholder=n?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",n?"Cari template":"Cari section atau field")}function ke(){let r=performance.now(),n=Oi();if(!n)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}n.dataset.sveTab=u.tab||"content",u.tab==="library"?n.innerHTML=hf():u.tab==="content"?n.innerHTML=nc():u.tab==="colors"?n.innerHTML=Hd():u.tab==="style"?n.innerHTML=rf():u.tab==="audio"?n.innerHTML=nf():u.tab==="compatibility"?n.innerHTML=uf():n.innerHTML=nc(),yf(n),df(),u.tab==="content"&&Td(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function ff(r,n){return w('[data-image-path="'+CSS.escape(n)+'"]',r)}let mf="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function vc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(mf),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function gf(r,n){let s=ff(r,n);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let l=String(await navigator.clipboard.readText()).trim();return l?l===s.value.trim()?(s.focus({preventScroll:!0}),!0):ye(l)?(vc(s),!1):(s.value=l,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function bf(r){let n=String(r.dataset.fieldType||"text"),s=r.value;return n==="boolean"?s=!!r.checked:n==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):n==="datetime"&&(s=fd(r.value)),s}function kc(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;ve(u.config,r.dataset.fieldPath,bf(r));let n=r.closest("[data-section-card]");return yr(n?.dataset.sectionCard),ni(n),u.contentStateDirty=!0,!0}function Sc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let n=()=>{E(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let l=s.target.closest("[data-section-up]");if(l){if(s.preventDefault(),s.stopPropagation(),l.disabled)return;De(),Vl(l.dataset.sectionUp,-1);return}let c=s.target.closest("[data-section-down]");if(c){if(s.preventDefault(),s.stopPropagation(),c.disabled)return;De(),Vl(c.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let p=s.target.closest("[data-repeat-add]");if(p){let k=p.dataset.repeatAdd,A=Fe().flatMap(I=>I.fields||[]).find(I=>(I.type==="repeater"||ge(I)==="repeater-image")&&I.path===k),_=M(u.config,k);Array.isArray(_)||(ve(u.config,k,[]),_=M(u.config,k)),_.push(kd(A||{})),u.contentStateDirty=!0,yr(p.closest("[data-section-card]")?.dataset.sectionCard),De("Item ditambahkan"),ic(p.closest("[data-section-card]"));return}let f=s.target.closest("[data-repeat-delete]");if(f){let k=M(u.config,f.dataset.repeatDelete);if(!Array.isArray(k))return;let A=Fe().flatMap(I=>I.fields||[]).find(I=>(I.type==="repeater"||ge(I)==="repeater-image")&&I.path===f.dataset.repeatDelete),_=Number.isFinite(A?.min)?A.min:0;if(k.length<=_){De("Minimal "+_+" item");return}k.splice(Number(f.dataset.repeatIndex),1),u.contentStateDirty=!0,yr(f.closest("[data-section-card]")?.dataset.sectionCard),De("Item dihapus"),ic(f.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){let k=ud(),A=k>0?"Kembalikan "+k+` field ke kondisi terakhir halaman ini dimuat?

Perubahan yang Anda buat setelah itu \u2014 nama, tanggal, rekening, foto, warna \u2014 akan hilang dan tidak bisa dibatalkan.`:`Kembalikan semua pengaturan ke kondisi terakhir halaman ini dimuat?

Perubahan Anda akan hilang dan tidak bisa dibatalkan.`;if(!window.confirm(A))return;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,ql();return}if(s.target.closest("#"+e+"-team-key-save")){od();return}if(s.target.closest("#"+e+"-pin-peek")){Ia("peek");return}if(s.target.closest("#"+e+"-pin-generate")){Ia("generate");return}if(s.target.closest("#"+e+"-pin-copy")){cd();return}if(s.target.closest("#"+e+"-pin-changekey")){ld();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let k=S.closest("[data-section-card]");if(!k)return;let A=!k.classList.contains("open");k.classList.toggle("open",A);let _=k.dataset.sectionCard;A?Pa(k):(u.contentOpenSections.delete(_),w(".chev",k)?.setAttribute("aria-expanded","false"),ni(k),$a(r))}}),r.addEventListener("input",s=>{let l=s.target;l instanceof HTMLElement&&l.matches("[data-field-path]")&&(l.tagName==="SELECT"||l.matches('input[type="checkbox"], input[type="radio"]')||kc(l)&&(Xe.refresh(u.config),rc()))}),r.addEventListener("change",s=>{let l=s.target;if(l instanceof HTMLElement){if(l.matches("[data-visible-path]")){ve(u.config,l.dataset.visiblePath,l.checked),rc(l.checked?"Section ditampilkan":"Section disembunyikan");return}kc(l)&&(Xe.refresh(u.config),De("Konten diperbarui"))}}),r.addEventListener("dragstart",s=>{let l=s.target.closest("[data-section-drag]");if(!l)return;if(l.disabled||l.getAttribute("draggable")!=="true"){s.preventDefault();return}De();let c=l.closest("[data-section-card]");c&&(c.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",c.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(c,24,24))}),r.addEventListener("dragend",n),r.addEventListener("dragover",s=>{let l=s.target.closest("[data-section-card]");if(!l)return;let c=s.dataTransfer?.getData("text/plain")||w(".section.dragging",r)?.dataset?.sectionCard||"",p=l.dataset.sectionCard;if(!c||c===p)return;let f=Fe().find(k=>ne(k)===p);if(p!=="cover"&&!ai(f))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let x=l.getBoundingClientRect(),S=s.clientY<x.top+x.height/2?"before":"after";p==="cover"&&(S="after"),E(".section.drag-before, .section.drag-after",r).forEach(k=>{k!==l&&(k.classList.remove("drag-before","drag-after"),delete k.dataset.dropPlacement)}),l.dataset.dropPlacement=S,l.classList.toggle("drag-before",S==="before"),l.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let l=s.target.closest("[data-section-card]");l&&(s.relatedTarget&&l.contains(s.relatedTarget)||(l.classList.remove("drag-before","drag-after"),delete l.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let l=s.target.closest("[data-section-card]");if(!l)return;let c=s.dataTransfer.getData("text/plain"),p=l.dataset.sectionCard,f=l.dataset.dropPlacement||(p==="cover"?"after":"before");s.preventDefault(),n(),qh(c,p,f)})}function xf(r){E("[data-library-import]",r).forEach(n=>{n.onclick=()=>{Uh(n.dataset.libraryImport)}}),w("[data-library-clear]",r)?.addEventListener("click",zh),w("[data-library-refresh]",r)?.addEventListener("click",async()=>{await Rl(!0),u.uiPrepared=!1,ke()})}function Mi(r,n){let s=n+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function yf(r){if(u.tab==="library"){xf(r);return}if(u.tab==="content"){Sc(r),vf(r);return}if(u.tab==="colors"){kf(r);return}if(u.tab==="style"){Sf(r);return}if(u.tab==="audio"){wf(r);return}if(u.tab==="compatibility"){Cf(r);return}Sc(r)}function vf(r){if(!Mi(r,"images"))return;r.addEventListener("click",s=>{let l=s.target.closest("[data-image-paste-path]");if(l){s.preventDefault(),s.stopPropagation(),gf(r,l.dataset.imagePastePath);return}let c=s.target.closest("[data-image-delete-path]");if(c){Bd(c.dataset.imageDeletePath);return}let p=s.target.closest("[data-image-open-advance]");if(p){let A=p.dataset.imageOpenAdvance,_=w(`[data-image-card-path="${CSS.escape(A)}"]`,r),I=_?w(".image-advance",_):null;if(I){let z=!I.open;I.open=z,p.setAttribute("aria-expanded",String(z)),p.setAttribute("aria-label",z?"Tutup pengaturan gambar":"Buka pengaturan gambar"),p.title=z?"Tutup pengaturan gambar":"Pengaturan gambar",p.classList.toggle("active",z),z?I.scrollIntoView({block:"nearest",behavior:"smooth"}):p.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let f=s.target.closest("[data-image-align-path]");if(f){let A=f.dataset.imageAlignPath,_=["left","center","right"].includes(f.dataset.imageAlign)?f.dataset.imageAlign:"center";oi(A,{align:_}),mr(),kr(r,A);let I=w(`[data-image-path="${CSS.escape(A)}"]`,r);I&&Pi(I,A);return}let x=s.target.closest("[data-image-fit-path]");if(x){let A=x.dataset.imageFitPath,_=Pt.includes(x.dataset.imageFit)?x.dataset.imageFit:"auto";oi(A,{fit:_}),mr(),kr(r,A);let I=w(`[data-image-path="${CSS.escape(A)}"]`,r);I&&Pi(I,A);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let A=S.dataset.imageAlignposPath,_=Je.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";oi(A,{alignPos:_}),mr(),kr(r,A);let I=w(`[data-image-path="${CSS.escape(A)}"]`,r);I&&Pi(I,A);return}let k=s.target.closest("[data-gallery-delete-index]");if(k){Vd(k.dataset.galleryDeleteIndex,Number(k.dataset.galleryIndex));return}}),r.addEventListener("input",s=>{let l=s.target.dataset.imageWidthPath;if(l!==void 0){let p=w(`[data-image-width-number="${CSS.escape(l)}"]`,r);p&&(p.value=s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){let p=Math.max(0,Math.min(100,Number(s.target.value)||0)),f=w(`[data-image-width-path="${CSS.escape(c)}"]`,r);f&&(f.value=p);return}});let n=(s,l)=>{let c=Math.max(0,Math.min(100,Number(l)||0));oi(s,{width:c}),mr();let p=w(`[data-image-path="${CSS.escape(s)}"]`,r);p&&Pi(p,s),kr(r,s)};r.addEventListener("change",s=>{let l=s.target.dataset.imageWidthPath;if(l!==void 0){n(l,s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){n(c,s.target.value);return}let p=s.target.closest("[data-image-path]");if(!p)return;let f=p.dataset.imagePath,x=p.value.trim(),S=String(M(u.config,f)||"");if(x!==S){if(ye(x)){p.value=S,vc(p);return}ve(u.config,f,x),x&&oi(f,{hidden:!1}),He("Gambar diperbarui"),Pi(p,f)}}),r.addEventListener("paste",s=>{let l=s.target.closest("[data-image-path]");l&&setTimeout(()=>{l.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function kf(r){if(!Mi(r,"colors"))return;let n=(l,c,p)=>{let f=l.value.trim();if(!f||!jd(f)){if(p){let S=Pe(c);S&&(l.value=S)}return}et(c,f);let x=w(`[data-color-var="${CSS.escape(c)}"]`,r);x&&(x.value=Ni(f,x.value||"#000000"))},s=l=>{let c=br(l);if(!c)return;et(l,c);let p=w(`[data-color-token-var="${CSS.escape(l)}"], [data-style-var="${CSS.escape(l)}"]`,r),f=w(`[data-color-var="${CSS.escape(l)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(c))&&(p.value=c)}f&&(f.value=Ni(c,f.value))};r.addEventListener("click",l=>{let c=l.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(l.target.closest("#"+e+"-reset-colors")){J.forEach(([,,p])=>{let f=Pe(p);f&&et(p,br(p)||f)}),E("[data-color-token-var]",r).forEach(p=>{let f=p.dataset.colorTokenVar,x=Pe(f);x&&(p.value=x)}),E("[data-color-var]",r).forEach(p=>{p.value=Ni(Pe(p.dataset.colorVar),p.value)});return}}),r.addEventListener("input",l=>{let c=l.target.dataset.colorTokenVar;if(c!==void 0){n(l.target,c,!1);return}let p=l.target.dataset.colorVar;if(p!==void 0){et(p,l.target.value);let f=w(`[data-color-token-var="${CSS.escape(p)}"]`,r);f&&(f.value=l.target.value)}}),r.addEventListener("change",l=>{let c=l.target.dataset.colorTokenVar;c!==void 0&&n(l.target,c,!0)})}function Sf(r){if(!Mi(r,"style"))return;let n=(l,c)=>{let p=String(l.value||"").trim();if(p){if((c==="--sve-heading-weight"||c==="--sve-body-weight")&&!Jd(c==="--sve-heading-weight"?"heading":"body",p)){let x=Pe(c);x&&(l.value=x);return}et(c,p),(c==="--sve-heading-weight"||c==="--sve-body-weight")&&wr()}},s=l=>{let c=br(l);if(!c)return;et(l,c);let p=w(`[data-color-token-var="${CSS.escape(l)}"], [data-style-var="${CSS.escape(l)}"]`,r),f=w(`[data-color-var="${CSS.escape(l)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(c))&&(p.value=c)}f&&(f.value=Ni(c,f.value))};r.addEventListener("click",l=>{let c=l.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(l.target.closest("#"+e+"-reset-style")){tf();return}if(l.target.closest("#"+e+"-reset-all")){ql();return}if(l.target.closest("#"+e+"-heading-font-apply")){Cr("heading");return}l.target.closest("#"+e+"-body-font-apply")&&Cr("body")}),r.addEventListener("change",l=>{let c=l.target.dataset.styleVar;c!==void 0&&n(l.target,c)}),r.addEventListener("input",l=>{if(l.target.tagName!=="SELECT")return;let c=l.target.dataset.styleVar;c!==void 0&&n(l.target,c)}),r.addEventListener("keydown",l=>{l.key==="Enter"&&(l.target.id===e+"-heading-font"?(l.preventDefault(),Cr("heading")):l.target.id===e+"-body-font"&&(l.preventDefault(),Cr("body")))})}function wf(r){if(!Mi(r,"audio"))return;let s=Bl().path||"assets.audio",l=w("#"+e+"-audio-url",r),c=w("#"+e+"-audio-start-enabled",r),p=w("#"+e+"-audio-start-time",r);if(!l)return;let f=()=>{let S=l.value.trim(),k=M(u.config,s);if(typeof k=="string"&&k===S){gc(r,S);return}ve(u.config,s,S),He("Audio diperbarui"),gc(r,S)},x=()=>{if(!c||!p)return;let S=l.value.trim(),k=c.checked?Ar(p.value):0,A=af(S,k);l.value=A,p.disabled=!c.checked,c.checked&&(p.value=ja(k)),ve(u.config,s,A),He(k>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};l.addEventListener("paste",()=>{setTimeout(f,0)}),l.addEventListener("change",f),c?.addEventListener("change",()=>{p&&(p.disabled=!c.checked,c.checked&&Ar(p.value)<=0&&(p.value="0:00",p.focus()),x())}),p?.addEventListener("change",x)}function Cf(r){Mi(r,"compat")}function wc(){Object.values(u.editors).forEach(r=>{r&&pr(r,!0)})}function Ef(r,n=""){let s=Oi();if(!s||!De()||(u.sourceDirty||!u.doc)&&!ze()||(r=String(r||"").trim(),r&&!Te(r)))return!1;let l=r&&Ma().find(k=>k.path===r),c=Ai(),p=k=>xr(k).some(A=>A.path===r||(A.type==="repeater"||ge(A)==="repeater-image")&&r.startsWith(A.path+".")),f=r&&(c.find(k=>ne(k)===n&&p(k))||c.find(p))||c.find(k=>ne(k)===n);if(!l&&!f)return!1;u.search="";let x=w("#"+e+"-search");x&&(x.value=""),u.open||ii(!0),ri("content");let S;if(l){let k=w(`[data-section-card="${CSS.escape(ne(f))}"]`,s);if(!k)return!1;Pa(k),S=w(`[data-image-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}else{let k=w(`[data-section-card="${CSS.escape(ne(f))}"]`,s);if(!k)return!1;Pa(k),S=r&&w(`[data-field-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let Cc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function Af(r,n,s){if(typeof n!="string"||!n||n.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let l=r?.getAttribute("srcdoc")||"";if(!l)return null;let c=u.canvasPickSources.get(r);if(!c||c.source!==l){let S=document.createElement("template");S.innerHTML=l,c={source:l,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:E("script",S.content).map(k=>k.textContent).join(`
`)},u.canvasPickSources.set(r,c)}if(!c.root||!c.scripts.includes(JSON.stringify(s)))return null;let p=c.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(n)}"]`);if(!p)return null;let f=p.matches("[data-sve-field]")?p:p.querySelector("[data-sve-field]")||p.closest("[data-sve-field]"),x=p.closest("[data-section-id], [data-sve-section]");return{path:f?.getAttribute("data-sve-field")||"",sectionHint:x?.getAttribute("data-section-id")||x?.id||x?.getAttribute("data-sve-section")||""}}function Tf(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,n=null;window.addEventListener("message",s=>{if(location.href!==r)return;let l=s.data;if(!l||l.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof l.inspectorId!="string"||!l.inspectorId||l.inspectorId.length>256||typeof l.previewId!="string"||l.previewId.length>256)return;let c=E(Cc).find(z=>z.contentWindow===s.source);if(!c||!c.sandbox.contains("allow-scripts")||c.sandbox.contains("allow-same-origin"))return;let p=c.getAttribute("srcdoc"),f=location.href,{open:x,tab:S,sourceDirty:k}=u,A=u.performance.configCommitCount,_=W("html"),I=W("js");cancelAnimationFrame(n),n=requestAnimationFrame(()=>{if(n=null,location.href!==f||!c.isConnected||!c.matches(Cc)||c.contentWindow!==s.source||c.getAttribute("srcdoc")!==p||u.open!==x||u.tab!==S||u.sourceDirty!==k||u.performance.configCommitCount!==A||W("html")!==_||W("js")!==I)return;let z=Af(c,l.inspectorId,l.previewId);z&&(z.path||z.sectionHint)&&Ef(z.path,z.sectionHint)})})}function _f(){let r="https://wa.me/"+d+"?text="+encodeURIComponent(g);window.open(r,"_blank","noopener,noreferrer")}function If(){performance.mark("sve-styles-start"),Lf(),performance.mark("sve-styles-critical-done"),G($f,50)}function Ec(r){let n=document.getElementById(r);n&&n.getAttribute("data-sve-versi")!==String(t)&&n.remove()}function Lf(){let r=e+"-style-critical";if(Ec(r),document.getElementById(r))return;let n=document.createElement("style");n.id=r,n.setAttribute("data-sve-versi",String(t)),n.textContent=`#${e},
#${e} * {
  box-sizing: border-box;
}

#${e}.sve-lite .tab[data-tab="style"],
#${e}.sve-lite .tab[data-tab="audio"],
#${e}.sve-lite .tab[data-tab="compatibility"] {
  display: none !important;
}

::root {
  --sve77-panel-width: min(400px, 32vw);
  --sve77-global-header-height: 47px;
  /*
   * Tinggi toolbar Scalev (48px di md, 64px di lebar kecil). Dipakai untuk
   * memulai dock SVE DI BAWAH toolbar, sehingga dock tidak menutupi tombol
   * aksi Scalev (Simpan / Simpan & Terbitkan) yang tetap melebar ke right:0.
   */
  --sve77-toolbar-height: 48px;
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
  --line: #e5e8ec;
  --soft: #f3f6f9;
  --txt: #223548;
  --muted: rgb(119, 130, 142);

  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;

  --color-primary: #09afed;
  --container-max-width: 1186px;
  --system-font-quill: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  /*
   * Scalev memakai --system-font-quill sebagai font utama, tanpa Roboto di
   * depan. Sebelumnya Roboto didahulukan sehingga seluruh panel terlihat
   * berbeda dari halaman Scalev di sekitarnya.
   */
  font-family: var(--system-font-quill);
  line-height: inherit;
  color: var(--txt);
}

#${e}-dock {
  position: fixed;

  top:
    calc(
      var(
        --sve77-global-header-height,
        44px
      ) +
      var(
        --sve77-toolbar-height,
        48px
      )
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
      ) -
      var(
        --sve77-toolbar-height,
        48px
      )
    );

  min-height:
    calc(
      100% -
      var(
        --sve77-global-header-height,
        44px
      ) -
      var(
        --sve77-toolbar-height,
        48px
      )
    );

  /*
   * Paint-first layering contract:
   * - global header Scalev stays above SVE (z-50)
   * - SVE dock starts di BAWAH toolbar Scalev (lihat variabel
   *   --sve77-toolbar-height pada properti top), sehingga tombol aksi
   *   Scalev (Simpan / Simpan & Terbitkan) tetap dapat diklik.
   *   z-index 41 hanya untuk berjaga bila tinggi toolbar berubah.
   */

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
  /*
   * Warna garis ini disamakan dengan strip Scalev di sebelahnya (border-b-2
   * bawaan Scalev = #dbdfe5). Sebelumnya memakai var(--line) = #e5e8ec yang
   * lebih terang, sehingga garis batas bawah panel SVE terlihat berbeda dari
   * panel kiri Scalev. var(--line) sengaja TIDAK diubah karena dipakai 25 kali
   * di tempat lain.
   */
  border-bottom: 2px solid #dbdfe5;
  background: #fff;
}

#${e} .tabs {
  position: relative;
  /*
   * margin-top 1px dihapus: nilainya membuat tabs-shell menjadi 49px, satu
   * piksel lebih tinggi daripada strip Scalev di sebelahnya (48px), sehingga
   * garis batas bawah kedua panel tidak sejajar. Tanpa margin, tinggi kembali
   * 48px mengikuti isi .tabs dan strip Scalev.
   */
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  list-style: none;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  /*
   * Padding dikecilkan dari 8px ke 4px supaya enam tab (Library, Konten,
   * Warna, Style, Audio, Status) muat tanpa scroll horizontal di panel
   * selebar 400px. Sebelumnya konten tabs 332px sementara ruang hanya 274px,
   * sehingga tab terakhir tertutup tombol .panel-tools dan tidak bisa diklik.
   */
  padding: 0 4px;
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
  /*
   * 4px (bukan 8px) agar enam tab muat di panel 400px. Lihat catatan pada
   * aturan tabs-shell di atas.
   */
  padding: 16px 4px;
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
  /*
   * 38px (bukan 40px) memberi 10px ekstra bagi baris tab supaya tab terakhir
   * tidak tertutup. Masih di atas target sentuh minimum 24px.
   */
  width: 38px;
  min-width: 38px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: 0;
  background: #fff;
  color: #5b6675;
  /*
   * Ikon memakai ukuran 1em, jadi nilai ini menentukan besar ikonnya.
   * Sebelumnya 20px karena tombol masih berisi karakter teks; sekarang
   * disamakan dengan ikon di tempat lain supaya terlihat seimbang.
   */
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

#${e} .panel-tool:hover {
  background: #f3f6f9;
  color: #223548;
}

#${e} .panel-collapse {
  width: 40px;
  min-width: 40px;
  padding: 0 8px;
  /* Sama seperti .panel-tool: menentukan besar ikon 1em di dalamnya. */
  font-size: 16px;
  color: rgb(119, 130, 142);
}

/*
 * Pane preview mandiri. Bawaannya menutupi sisa layar di sebelah kiri dock;
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
  background: #fff;
  border-left: 1px solid #e5e8ec;
  z-index: 2147482000;
}

#${e} .sve-live-pane[hidden] {
  display: none;
}

/*
 * Pane menyingkir saat Scalev membuka dialog yang menutupi layar (mis.
 * "Review HTML Mode issues" sebelum Simpan & Terbitkan).
 *
 * Dialog Scalev dipasang full-screen, jadi pane yang tetap menyala akan
 * menutupi tombol Review / Publish anyway dan user tidak bisa melanjutkan
 * save. Pane disembunyikan lewat visibility, bukan display, supaya iframe di
 * dalamnya tetap hidup: begitu dialog ditutup, preview tampil lagi tanpa
 * perlu dibangun ulang dari awal.
 */
#${e} .sve-live-pane--tutup-modal {
  visibility: hidden;
  pointer-events: none;
}


#${e} .sve-live-bar {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 6px 0 12px;
  /*
   * Bilah memakai warna dan tipografi Scalev supaya terasa satu aplikasi
   * dengan kanvas di bawahnya, bukan panel asing yang menumpuk di atasnya.
   */
  background: #fff;
  border-bottom: 1px solid #e5e8ec;
  flex-shrink: 0;
  font-family: var(--system-font-quill, "Source Sans Pro", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
}

#${e} .sve-live-ident {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
}

/*
 * Penanda bilah mengikuti ukuran tombol tampilan Scalev: ikon 1em tanpa
 * kotak berwarna, supaya tidak ada bentuk yang tidak dikenal di Scalev.
 */
#${e} .sve-live-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #0899cf;
  flex-shrink: 0;
}

#${e} .sve-live-mark svg {
  width: 1em;
  height: 1em;
  display: block;
}

#${e} .sve-live-label {
  font-size: 13px;
  font-weight: 600;
  color: #223548;
  white-space: nowrap;
}

/*
 * Lencana status memakai ukuran teks terkecil yang dipakai Scalev (10px/11px)
 * dan sudut 4px, sama seperti label kecil di Scalev.
 */
#${e} .sve-live-badge {
  display: inline-flex;
  height: 18px;
  align-items: center;
  padding: 0 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

#${e} .sve-live-badge[data-state="sync"] {
  background: #e6f6ee;
  color: #0f766e;
}

#${e} .sve-live-badge[data-state="stale"] {
  background: #fdf0e3;
  color: #8a5200;
}

#${e} .sve-live-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

/*
 * Tombol bilah meniru tombol tampilan alat Scalev: kotak 28x28, sudut 6px,
 * ikon 16px, warna abu rgb(123,141,164). Keadaan aktif memakai aksen Scalev
 * #0899cf di atas latar putih, persis tombol device yang sedang terpilih.
 */
#${e} .sve-live-action {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: rgb(123, 141, 164);
  font-size: 16px;
  cursor: pointer;
}

#${e} .sve-live-action svg {
  width: 1em;
  height: 1em;
  display: block;
}

#${e} .sve-live-action:hover {
  background: #f3f6f9;
  color: #223548;
}

#${e} .sve-live-action[hidden] {
  display: none;
}

/*
 * Tombol Segarkan menandai preview yang tertinggal, jadi ia memakai aksen
 * Scalev agar menonjol tanpa memperkenalkan warna baru.
 */
#${e} .sve-live-refresh {
  background: #e8f6fd;
  color: #0899cf;
}

#${e} .sve-live-refresh:hover {
  background: #d7eefa;
  color: #0a7fa8;
}

#${e} .sve-live-close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: rgb(123, 141, 164);
  font-size: 16px;
  cursor: pointer;
}

#${e} .sve-live-close svg {
  width: 1em;
  height: 1em;
  display: block;
}

#${e} .sve-live-close:hover {
  background: #f3f6f9;
  color: #223548;
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
  color: rgb(119, 130, 142);
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
  /*
   * Ikut .panel-tool: besar ikon ditentukan font-size tombolnya,
   * supaya tidak lebih besar daripada dua ikon di sebelahnya.
   */
  width: 1em;
  height: 1em;
  display: inline-flex;
  overflow: visible;

  /*
   * Tidak diputar. Ikon sebelumnya berasal dari Scalev dan menghadap kiri,
   * jadi dulu dicerminkan agar mengarah ke kanan. Ikon Lucide
   * panel-left-close sudah digambar menghadap kanan, sehingga memutarnya
   * akan membalik arah panahnya.
   */
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

  border-radius: 4px;

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

  border-radius: 4px;

  background:
    var(--soft);

  color:
    var(--muted);

  font-size: 11px;

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

  font-size: 11px;
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

  font-size: 11px;
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
  /*
   * 36px (dari 29px) supaya lebih dekat ke target sentuh minimum 44px dan
   * lebih mudah ditekan, tanpa membuat baris judul section terlalu tinggi.
   */
  width: 36px;
  height: 36px;

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
  width: 18px;
  height: 18px;

  pointer-events: none;
}

/*
 * Tidak ada rotasi.
 *
 * Ikon lama Scalev berbentuk panah mendatar, jadi dulu perlu diputar agar
 * terlihat naik-turun. Sekarang panahnya sudah digambar tegak sesuai arah
 * masing-masing tombol, sehingga putaran itu justru membuat arahnya salah.
 */

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

  font-size: 11px;

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

  font-size: 11px;
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

  border-radius: 4px;

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

  border-radius: 4px;

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
    rgb(119, 130, 142);

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
    rgb(119, 130, 142);

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
  font-size: 11px;
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
  font-size: 11px;
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
  font-size: 11px;
  line-height: 1.45;
}

#${e} .compat-code {
  max-height: 250px;
  overflow: auto;
  margin: 0;
  padding: 9px;
  border-radius: 4px;
  background: #111827;
  color: #f9fafb;
  font-size: 11px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
}


#${e} .style-reset-zone {
  padding-top: 10px;
}

#${e} .button {
  /*
   * Metrik tombol Scalev ("Simpan" / "Simpan & Terbitkan"): tinggi 34px,
   * sudut 4px, garis 1px, teks 13px berbobot 600. Sebelumnya 39px dengan
   * garis 2px dan teks 11px, sehingga tombol panel tampak lebih berat dan
   * berbeda dari tombol Scalev di sekitarnya.
   */
  min-height: 34px;

  padding:
    0 12px;

  border:
    1px solid
    var(--p);

  border-radius: 4px;

  background: #fff;

  color:
    var(--p);

  font-size: 13px;
  font-weight: 600;

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

/*
 * Teks tombol ini 13px/600 di atas latar putih, jadi ambang WCAG AA 4.5
 * berlaku. Aksen panel #0899cf hanya mencapai rasio 3.25 dan gagal ambang
 * itu, maka teks memakai #0077a8 yang mencapai 5.0. Garis tepi tetap aksen
 * supaya tombol masih terbaca sebagai aksi sekunder milik panel.
 */
#${e} .button.editor-update {
  border-color: var(--p);
  background: #fff;
  color: #0077a8;
}

#${e} .button.editor-update:hover {
  border-color: var(--p);
  background: #f2f5f8;
}

#${e} .update-status {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 11px;
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
  font-size: 11px;
  line-height: 14px;
}

/*
 * Tombol di header library disamakan dengan metrik tombol panel lainnya.
 * Sebelumnya 32px dengan teks 10px sehingga jauh lebih pendek dan lebih
 * kecil daripada tombol di tab lain.
 */
#${e} .library-header .button {
  min-height: 42px;
  flex: 0 0 auto;
  padding: 0 9px;
  font-size: 13px;
}

#${e} .library-alert,
#${e} .library-empty {
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--soft);
  color: var(--muted);
  font-size: 11px;
  line-height: 15px;
}

#${e} .library-summary {
  display: flex;
  align-items: baseline;
  gap: 5px;
  color: var(--muted);
  font-size: 11px;
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
  min-height: 42px !important;
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
  font-size: 11px;
  line-height: 14px;
}

#${e} .library-refresh-button {
  white-space: nowrap;
}

#${e} .library-clear-button {
  min-width: 0;
  min-height: 42px;
  padding: 0 9px;
  font-size: 13px;
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

  font-size: 11px;

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
  font-family: var(--system-font-quill);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .image-card .image-card-path {
  margin-top: 4px;
  color: #697689;
  font-family: var(--system-font-quill);
  font-size: 11px;
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
  font-family: var(--system-font-quill);
  font-size: 11px;
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
  font-family: var(--system-font-quill);
  font-size: 11px;
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
  font-family: var(--system-font-quill);
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

  border-radius: 4px;

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

  font-size: 11px;

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

  font-size: 11px;
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
  min-height: 42px;

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
  /* 24px (dari 18px): target ketuk lebih nyaman, tetap rapi di baris audio. */
  width: 24px !important;
  height: 24px !important;

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
  height: 42px !important;

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

  gap: 8px;

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
    #223548;
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

  border-radius: 4px;

  background:
    #f6f9fc;
}

#${e} .color-row-unset input:disabled {
  color: #8a95a3;
  background: #f6f9fc;
  cursor: not-allowed;
}

/*
 * Kotak warna disamakan dengan tinggi kontrol form lain di panel. Lebarnya
 * ikut 42px supaya tetap persegi.
 */
#${e}
input[type="color"] {
  width: 42px;
  height: 42px;

  padding: 2px;

  border:
    2px solid
    var(--line);

  border-radius: 4px;
}

#${e} .color-row small {
  display: block;

  margin-top: 4px;

  color:
    var(--muted);

  font-size: 11px;
}

#${e} .repeat-item {
  margin: 8px;

  border:
    1px solid
    var(--line);

  border-radius: 4px;
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

  font-size: 11px;
}

#${e} .repeat-head button {
  border: 0;

  background:
    transparent;

  color:
    #df4d5b;

  font-size: 11px;

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
    #cfd6dd;

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

  font-size: 11px;

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
  font-family: var(--system-font-quill);
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
  font-size: 11px;
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

/* PIN Dashboard \u2014 minimalis, bahasa native Scalev.
   Nilai tombol disalin dari tombol utama Scalev yang terukur di
   /products: bg rgb(8,153,207), radius 4px, 16px/500, pad 10px 16px,
   tinggi 44px. Kotak PIN tetap meniru kontrol "Client ID" Scalev
   (border 2px, radius 4px, latar abu). */

/* Kolom kunci tim (keadaan perlu kunci / galat) */
#${e}-body .pin-ctl > label {
  display: block;
  margin: 0 0 10px;
  color: #223548;
  font-family: var(--system-font-quill);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

#${e}-body .pin-ctl {
  display: block;
  margin: 0;
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
  border-color: #0899cf;
}

#${e}-body .pin-ctl-box > input {
  flex: 1 1 auto;
  min-width: 0;
  width: auto;
  margin: 0;
  height: 42px !important;
  min-height: 42px !important;
  padding: 0 12px !important;
  border: 0 !important;
  border-radius: 0 !important;
  outline: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #223548;
  font-family: var(--system-font-quill);
  font-size: 15px !important;
  font-weight: 700;
  letter-spacing: 1.5px;
  line-height: 22px;
  cursor: default;
}

#${e}-body .pin-ctl-box > input:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

#${e}-body .pin-ctl-box > input::placeholder {
  color: #8a94a3;
  font-weight: 400;
  letter-spacing: normal;
}

/* Keadaan kosong: tidak ada kotak input kosong yang membingungkan. */
#${e}-body .pin-ctl-empty {
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 12px;
  border: 1px dashed #d7dde5;
  border-radius: 4px;
  background: #f2f5fa;
  color: #8d97a3;
  font-family: var(--system-font-quill);
  font-size: 13px;
  line-height: 20px;
}

#${e}-body .pin-ctl-save {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 0;
  outline: 0;
  background: #0899cf;
  color: #fff;
  font-family: var(--system-font-quill);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}

#${e}-body .pin-ctl-save:hover {
  background: #0788bb;
}

/* Baris aksi: satu tombol utama + satu tombol sekunder + tautan. */
#${e}-body .pin-ctl-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

#${e}-body .pin-ctl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 10px 16px;
  border: 0;
  border-radius: 4px;
  font-family: var(--system-font-quill);
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

#${e}-body .pin-ctl-primary {
  flex: 1 1 auto;
  min-width: 0;
  background: #0899cf;
  color: #fff;
}

#${e}-body .pin-ctl-primary:hover:not(:disabled) {
  background: #0788bb;
}

#${e}-body .pin-ctl-primary:disabled {
  background: #b9dff2;
  cursor: default;
}

#${e}-body .pin-ctl-ghost {
  flex: 0 0 auto;
  border: 1px solid #eaeaeb;
  background: #f6f9fc;
  color: #223548;
  font-size: 14px;
}

#${e}-body .pin-ctl-ghost:hover:not(:disabled) {
  background: #f2f5fa;
}

#${e}-body .pin-ctl-ghost:disabled {
  color: #8d97a3;
  cursor: default;
}

/* Destruktif, jadi diberi warna berbeda \u2014 bukan merah menakutkan,
   karena PIN baru toh kadang memang perlu dibuat. */
#${e}-body .pin-ctl-danger {
  color: #b45309;
}

#${e}-body .pin-ctl-link {
  margin-left: auto;
  color: #0899cf;
  font-family: var(--system-font-quill);
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

#${e}-body .pin-ctl-link:hover {
  text-decoration: underline;
}

#${e} button:focus-visible,
#${e} a:focus-visible {
  outline: 2px solid #006b94;
  outline-offset: 2px;
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
  color: #223548;
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
  color: rgb(119, 130, 142);
  font-size: 11px;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#${e} .font-manual-help {
  margin-top: 6px;

  color: rgb(119, 130, 142);

  font-size: 11px;
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
  font-size: 11px;
  line-height: 1.25;
}

#${e} .section-body {
  padding: 8px;
}

#${e} .group-title {
  padding: 7px 9px;
  font-size: 11px;
  line-height: 1.3;
}

#${e} .field {
  padding: 8px 9px;
}

#${e} label {
  margin-bottom: 5px;
  font-size: 11px;
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
  border-radius: 4px;
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
  border-radius: 4px;
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
  font-size: 11px;
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
  font-size: 11px;
  line-height: 1.25;
}

#${e} .repeat-head button {
  font-size: 11px;
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
  font-size: 11px;
  font-weight: 750;
}

#${e} .typography-control-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

#${e} .typography-control label {
  margin-bottom: 4px;
  font-size: 11px;
}

#${e} .typography-control .style-select {
  height: 34px;
  min-height: 34px;
  padding: 0 22px 0 7px;
  border-radius: 7px;
  font-size: 11px;
}

#${e} .compatibility-panel {
  display: grid;
  gap: 7px;
}

#${e} .compat-status {
  gap: 4px;
  padding: 9px 10px;
  border-radius: 4px;
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
  font-size: 11px;
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
  font-size: 11px;
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
  font-size: 11px;
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
  font-size: 11px;
}

#${e} .compat-detail-body {
  padding: 7px 9px;
  border-top: 1px solid #edf0f3;
}

#${e} .compat-list li,
#${e} .compat-empty {
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 1.35;
}

#${e} .compat-code {
  max-height: 160px;
  padding: 7px;
  font-size: 11px;
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
`,document.head.appendChild(n)}function $f(){let r=e+"-style-deferred";if(Ec(r),document.getElementById(r))return;let n=document.createElement("style");n.id=r,n.setAttribute("data-sve-versi",String(t)),n.textContent=`
#${e}-body[data-sve-tab="style"] {
  padding: 16px 16px 80px;
  font-family: var(--system-font-quill);
  font-feature-settings: normal;
  font-variation-settings: normal;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  line-height: inherit;
  color: #223548;
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
  color: #223548;
  font-family: var(--system-font-quill);
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
  font-family: var(--system-font-quill);
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
  color: #223548;
  font-family: var(--system-font-quill);
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
  font-family: var(--system-font-quill);
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  word-spacing: 1px;
}

#${e}-body[data-sve-tab="style"] .font-google-link {
  margin-top: 8px;
  color: #0899cf;
  font-family: var(--system-font-quill);
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

#${e}-body[data-sve-tab="style"] .button {
  min-height: 42px;
  padding: 0 16px;
  border: 2px solid #0899cf;
  border-radius: 4px;
  background: #fff;
  color: #0899cf;
  font-family: var(--system-font-quill);
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
  color: #223548;
  font-family: var(--system-font-quill);
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

/*
 * Dropdown ini duduk di baris yang sama dengan input teks 42px. Sebelumnya
 * 40px dengan teks 13px, sehingga tepinya tidak sejajar dan teksnya lebih
 * kecil dari input di sebelahnya. Disamakan ke metrik kontrol form panel.
 */
#${e}-body[data-sve-tab="style"] .typography-control .style-select {
  height: 42px;
  min-height: 42px;
  padding: 0 28px 0 12px;
  font-size: 14px;
  line-height: 20px;
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
    /* Scalev memakai toolbar 64px di lebar kecil (kelas md:h-[48px] tidak aktif). */
    --sve77-toolbar-height: 64px;
  }

  html.sve77-panel-open [data-sve77-page-root="1"][data-sve77-layout="flow"] {
    width: 100% !important;
    max-width: 100% !important;
    margin-right: 0 !important;
  }

  html.sve77-panel-open [data-sve77-page-root="1"][data-sve77-layout="positioned"] {
    right: 0 !important;
  }

  #${e}-dock {
    height: calc(
      100dvh -
      var(--sve77-global-header-height) -
      var(--sve77-toolbar-height)
    );
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
  #${e} .pin-ctl-btn { min-height: 48px; }
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
  color: #223548;
  font-family: var(--system-font-quill);
  font-size: 11px;
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
  font-family: var(--system-font-quill);
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
  font-family: var(--system-font-quill);
  color: #223548;
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
  color: #223548;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

#${e} .compat-status-row span {
  color: #697689;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
}

#${e} .compat-status small {
  display: -webkit-box;
  margin-top: 4px;
  color: #223548;
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
  color: #223548;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
}

#${e} .compat-detail summary {
  min-height: 38px;
  padding: 8px 10px;
  color: #223548;
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
  font-size: 11px;
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
  --sve-native-border: #e5e8ec;
  --sve-native-soft-border: #edf0f3;
  --sve-native-soft-bg: #f6f9fc;
  --sve-native-text: #223548;
  --sve-native-muted: rgb(119, 130, 142);
}

/* Every main tab starts on the same native 16px panel inset. */
#${e}-body[data-sve-tab="content"],
#${e}-body[data-sve-tab="colors"],
#${e}-body[data-sve-tab="style"],
#${e}-body[data-sve-tab="audio"],
#${e}-body[data-sve-tab="compatibility"] {
  padding: 16px 16px 80px;
  font-family: var(--system-font-quill);
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
  font-size: 11px;
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
  font-family: var(--system-font-quill);
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
  font-family: var(--system-font-quill);
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
  font-size: 11px;
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

/*
 * Tombol memakai metrik yang sama dengan kontrol form lain di panel: 42px.
 * Sebelumnya 40px, sehingga tombol dan input di baris yang sama tidak
 * sejajar tepinya.
 */
/* Buttons use native Scalev radius and typography everywhere. */
#${e}-body .button {
  min-height: 42px;
  padding: 0 16px;
  border-width: 2px;
  border-radius: var(--sve-native-radius);
  font-family: var(--system-font-quill);
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
  height: 42px !important;
  min-height: 42px !important;
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
  font-size: 11px;
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

/*
 * Blok ini dulu memaksa "Simpan" dan tautan PIN ke biru tua #006b94.
 * Setelah blok PIN disamakan dengan tombol Scalev (#0899cf), paksaan itu
 * membuat dua biru berbeda muncul berdampingan di satu panel. Aturannya
 * dihapus; warna aslinya sudah ditetapkan di blok CSS PIN.
 */

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
  /* Kotak PIN tetap satu baris; tinggi input dikunci gaya dasar. */
  #${e}-body .pin-ctl-box { flex-wrap: nowrap; }
  /* Tombol PIN tetap sejajar; kalau sempit, tautan Dashboard turun sendiri. */
  #${e}-body .pin-ctl-foot { flex-wrap: wrap; }
  #${e}-body .pin-ctl-link { margin-left: 0; }
  #${e}-body .pin-ctl-primary { flex-basis: 100%; }
}
`,document.head.appendChild(n),Ac(),performance.mark("sve-styles-all-done")}function Pf(r){return r.replace(/#sve77-body(?=[\s>+~,.#:[@]|$)/g,":host > :where(div.body)").replace(/#sve77-body/g,":host > :where(div.body)").replace(/#sve77\b/g,":host")}function Nf(){let r=document.getElementById(e);if(!r)return"";let n=new Set(Array.from(r.querySelectorAll("*"),f=>f.tagName.toLowerCase())),s=[],l=f=>/#sve77(?![\w-])|#sve77-body/.test(f)?!0:f.split(",").some(S=>{let _=(S.trim().split(/[\s>+~]+/).pop()||"").replace(/\.[\w-]+/g,"").replace(/#[\w-]+/g,"").replace(/\[[^\]]*\]/g,"").replace(/::?[\w-]+(\([^)]*\))?/g,"").split(/[.#:[]/)[0].trim().toLowerCase();return _&&(n.has(_)||_==="html"||_==="body")})||/^\*/.test(f)||/^html\b|^body\b/.test(f),c=f=>/^html\b|^:root\b|\[data-sve77-page-root|\[data-sve77-top-toolbar|\[data-sve77-toolbar-host/.test(f.trim()),p=f=>{for(let x of f){if(!x.selectorText){if(x.cssRules)if(x.conditionText){let k=s.length;s.push(null),p(x.cssRules);let A=s.splice(k+1).join(`
`);s[k]=x.cssText.slice(0,x.cssText.indexOf("{"))+`{
`+A+`
}`}else p(x.cssRules);continue}let S=x.selectorText;c(S)||l(S)&&s.push(Pf(S)+"{"+x.style.cssText+"}")}};for(let f of Array.from(document.styleSheets)){let x;try{x=f.cssRules}catch{continue}x&&p(x)}return s.join(`
`)}function Rf(){let r=document.getElementById(e);if(!r)return"";let n=[],s=r;for(;s&&s!==document.documentElement;){let l=getComputedStyle(s);for(let c of Array.from(l)){if(!c.startsWith("--"))continue;let p=l.getPropertyValue(c).trim();p&&n.push(c+":"+p)}s=s.parentElement}return n.length?":host{"+n.join(";")+"}":""}function Ac(){if(!li)return;let r=li.querySelector("style[data-sve-shadow-style]");if(!r)return;let n=Rf()+`
`+Nf();r.textContent=n}let li=null,Tc=null;function Oi(){if(li){let r=li.querySelector(".body");if(r)return r}return document.getElementById(e+"-body")}function Mf(){if(li)return Tc;let r=document.getElementById(e+"-body");if(!r)return null;let n=document.createElement("div");n.id=e+"-shadow-host",n.style.cssText="display:contents",r.parentNode.insertBefore(n,r);let s=n.attachShadow({mode:"open"});return s.appendChild(Of()),s.appendChild(r),li=s,Tc=n,Ac(),n}function Of(){let r=document.createElement("style");return r.id=e+"-shadow-style",r.dataset.sveShadowStyle="1",r.textContent="",r}function Ff(){If();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
              <!-- Lucide: panel-left \u2014 https://lucide.dev/icons/panel-left -->
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="panel-tool-icon" aria-hidden="true">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
              </svg>
            </button>

            <button
              type="button"
              class="panel-tool"
              id="${e}-refresh"
              title="Scan ulang"
              aria-label="Scan ulang Visual Editor"
            >
              <!-- Lucide: refresh-cw \u2014 https://lucide.dev/icons/refresh-cw -->
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" class="panel-tool-icon" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
              </svg>
            </button>

            <button
              type="button"
              class="panel-tool panel-collapse"
              id="${e}-close"
              title="Sembunyikan Visual Editor"
              aria-label="Sembunyikan Visual Editor"
            >
              <!-- Lucide: panel-left-close \u2014 https://lucide.dev/icons/panel-left-close -->
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
                preserveAspectRatio="xMidYMid meet"
                class="panel-collapse-icon"
                aria-hidden="true"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M9 3v18"></path>
                <path d="m16 15-3-3 3-3"></path>
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
    `,document.body.appendChild(r),Mf(),Xe.mount(r);let n=I=>{let z=gt.isScalevMuted?.()===!0;gt.setScalevMuted?.(I),z&&!I&&wc()},s=w("#"+e+"-live");s.onclick=()=>{if(Xe.isVisible()){Xe.hide(),s.classList.remove("active"),n(!1),Xe.markStale();return}Xe.show()&&(s.classList.add("active"),n(!0),Xe.sync(u.config)||(Ze({force:!0}),window.setTimeout(()=>Xe.ensure(),600)))},Xe.onClose(()=>{s.classList.remove("active"),n(!1)}),Xe.onRefresh(()=>Xe.sync(u.config)),w("#"+e+"-close").onclick=()=>{ii(!1)},w("#"+e+"-refresh").onclick=()=>{ze()&&(ke(),Ze({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,ze()&&(ke(),Ze({force:!0,syncImages:!0}))},w("#"+e+"-support").onclick=_f;let l=w("#"+e+"-editor-update"),c=w("#"+e+"-update-status"),p=!1,f=!1,x=0,S=null,k=15e3,A=(I,z,Ie=!1)=>{l.textContent=I,l.title=z,l.setAttribute("aria-label",z),l.disabled=Ie},_=()=>{x=Date.now()+k,A("Cek Update","Cek update Visual Editor",!0),clearTimeout(S),S=setTimeout(()=>{x=0,!f&&!p&&A("Cek Update","Cek update Visual Editor")},k)};l.addEventListener("click",()=>{if(p){window.open(y,"_blank","noopener");return}if(f||Date.now()<x){c.textContent="Tunggu sebentar";return}p=!1,f=!0,A("Mengecek...","Sedang mengecek update Visual Editor",!0),c.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${b}?check=${Date.now()}`,onload(I){let z=We=>{p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent=We,_()};if(I.status<200||I.status>=300){z(I.status===403||I.status===429?"Tunggu sebentar":"Gagal cek update");return}let Rt=(I.responseText||"").match(/@version\s+([^\s]+)/),te=Rt&&Rt[1];if(!te){z("Gagal cek update");return}te===t?(p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent="Sudah terbaru",_()):(p=!0,f=!1,A("Pasang",`Pasang update Visual Editor versi ${te}`),c.textContent=`Update tersedia: versi ${te}.`)},onerror(){p=!1,f=!1,A("Cek Update","Cek update Visual Editor"),c.textContent="Gagal cek update",_()}})}),w("#"+e+"-search").addEventListener("input",P(I=>{u.search=I.target.value.toLowerCase().trim(),u.uiPrepared=!1,ke()},100)),E(".tab",r).forEach(I=>{I.onclick=()=>{De()&&ri(I.dataset.tab)}})}function Df(){let r=P(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,le(),or(),Il();let f=Ht();f&&Ei(f,{commit:!0,silent:!0}),u.open&&lr(!0);let x=wa();if(x.length!==u.allEditors.length||x.some((S,k)=>S!==u.allEditors[k])){if(u.sourceDirty=!0,!ze())return;gt.invalidate(),Tl(),u.open?ke():cr()}},160),n='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(f=>{f.some(x=>!x.target.closest?.("#"+e)&&[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}),l=null,c=()=>{let f=Sa();f!==l&&(s.disconnect(),l=f,f&&s.observe(f,{childList:!0,subtree:!0}),r())};new MutationObserver(f=>{c(),f.some(x=>[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}).observe(document.body,{childList:!0}),c(),document.addEventListener("load",f=>{f.target instanceof HTMLIFrameElement&&(gt.invalidate(),Ze({force:!0,syncImages:!0}))},!0),document.addEventListener("click",f=>{let x=f.target.closest?.("button");if(!(!x||x.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(x.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!W("js").includes("SVE_SCHEMA"))){if(!De()){f.preventDefault(),f.stopImmediatePropagation();return}wc(),yc().blockers.length&&(f.preventDefault(),f.stopImmediatePropagation(),ii(!0),u.uiPrepared=!1,ri("compatibility"))}},!0),document.addEventListener("keydown",f=>{f.key==="Escape"&&u.open&&document.getElementById(e)?.contains(f.target)&&(ii(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",f=>{ba(f.target)&&(u.scalevSlug=zt(f.target.value),vh())},!0),document.addEventListener("change",f=>{if(ba(f.target)){let x=zt(f.target.value);x&&(u.scalevSlug=x,Ei(x,{commit:!0}))}},!0),window.addEventListener("resize",P(()=>{or(),u.open&&lr(!0)},80))}function _c(){v()&&(Ff(),Il(),Tf(),Df(),ka(),requestAnimationFrame(()=>{or()}),cr(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_c,{once:!0}):_c()})();})();
