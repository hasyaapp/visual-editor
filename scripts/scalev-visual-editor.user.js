// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.34.0
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
(()=>{var Sf=Object.create;var An=Object.defineProperty;var wf=Object.getOwnPropertyDescriptor;var Cf=Object.getOwnPropertyNames;var Ef=Object.getPrototypeOf,Af=Object.prototype.hasOwnProperty;var Xt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)An(e,i,{get:t[i],enumerable:!0})},Tf=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of Cf(t))!Af.call(e,c)&&c!==i&&An(e,c,{get:()=>t[c],enumerable:!(n=wf(t,c))||n.enumerable});return e};var _f=(e,t,i)=>(i=e!=null?Sf(Ef(e)):{},Tf(t||!e||!e.__esModule?An(i,"default",{value:e,enumerable:!0}):i,e));var Sp=Xt(Zo=>{var kp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Zo.encode=function(e){if(0<=e&&e<kp.length)return kp[e];throw new TypeError("Must be between 0 and 63: "+e)};Zo.decode=function(e){var t=65,i=90,n=97,c=122,h=48,d=57,g=43,x=47,b=26,v=52;return t<=e&&e<=i?e-t:n<=e&&e<=c?e-n+b:h<=e&&e<=d?e-h+v:e==g?62:e==x?63:-1}});var Tp=Xt(Xo=>{var wp=Sp(),Jo=5,Cp=1<<Jo,Ep=Cp-1,Ap=Cp;function Db(e){return e<0?(-e<<1)+1:(e<<1)+0}function Vb(e){var t=(e&1)===1,i=e>>1;return t?-i:i}Xo.encode=function(t){var i="",n,c=Db(t);do n=c&Ep,c>>>=Jo,c>0&&(n|=Ap),i+=wp.encode(n);while(c>0);return i};Xo.decode=function(t,i,n){var c=t.length,h=0,d=0,g,x;do{if(i>=c)throw new Error("Expected more digits in base 64 VLQ value.");if(x=wp.decode(t.charCodeAt(i++)),x===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(x&Ap),x&=Ep,h=h+(x<<d),d+=Jo}while(g);n.value=Vb(h),n.rest=i}});var qr=Xt(be=>{function Bb(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}be.getArg=Bb;var _p=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,jb=/^data:.+\,.+$/;function Ui(e){var t=e.match(_p);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}be.urlParse=Ui;function pi(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}be.urlGenerate=pi;var Ub=32;function Hb(e){var t=[];return function(i){for(var n=0;n<t.length;n++)if(t[n].input===i){var c=t[0];return t[0]=t[n],t[n]=c,t[0].result}var h=e(i);return t.unshift({input:i,result:h}),t.length>Ub&&t.pop(),h}}var el=Hb(function(t){var i=t,n=Ui(t);if(n){if(!n.path)return t;i=n.path}for(var c=be.isAbsolute(i),h=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){h.push(i.slice(d));break}else for(h.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var x,b=0,g=h.length-1;g>=0;g--)x=h[g],x==="."?h.splice(g,1):x===".."?b++:b>0&&(x===""?(h.splice(g+1,b),b=0):(h.splice(g,2),b--));return i=h.join("/"),i===""&&(i=c?"/":"."),n?(n.path=i,pi(n)):i});be.normalize=el;function Lp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Ui(t),n=Ui(e);if(n&&(e=n.path||"/"),i&&!i.scheme)return n&&(i.scheme=n.scheme),pi(i);if(i||t.match(jb))return t;if(n&&!n.host&&!n.path)return n.host=t,pi(n);var c=t.charAt(0)==="/"?t:el(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=c,pi(n)):c}be.join=Lp;be.isAbsolute=function(e){return e.charAt(0)==="/"||_p.test(e)};function zb(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}be.relative=zb;var Ip=(function(){var e=Object.create(null);return!("__proto__"in e)})();function $p(e){return e}function Wb(e){return Pp(e)?"$"+e:e}be.toSetString=Ip?$p:Wb;function Gb(e){return Pp(e)?e.slice(1):e}be.fromSetString=Ip?$p:Gb;function Pp(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function qb(e,t,i){var n=yt(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:yt(e.name,t.name)}be.compareByOriginalPositions=qb;function Kb(e,t,i){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:yt(e.name,t.name)}be.compareByOriginalPositionsNoSource=Kb;function Yb(e,t,i){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||i)||(n=yt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:yt(e.name,t.name)}be.compareByGeneratedPositionsDeflated=Yb;function Qb(e,t,i){var n=e.generatedColumn-t.generatedColumn;return n!==0||i||(n=yt(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:yt(e.name,t.name)}be.compareByGeneratedPositionsDeflatedNoLine=Qb;function yt(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Zb(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=yt(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:yt(e.name,t.name)}be.compareByGeneratedPositionsInflated=Zb;function Jb(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}be.parseSourceMapInput=Jb;function Xb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var n=Ui(i);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var c=n.path.lastIndexOf("/");c>=0&&(n.path=n.path.substring(0,c+1))}t=Lp(pi(n),t)}return el(t)}be.computeSourceURL=Xb});var Rp=Xt(Np=>{var tl=qr(),il=Object.prototype.hasOwnProperty,Ut=typeof Map<"u";function vt(){this._array=[],this._set=Ut?new Map:Object.create(null)}vt.fromArray=function(t,i){for(var n=new vt,c=0,h=t.length;c<h;c++)n.add(t[c],i);return n};vt.prototype.size=function(){return Ut?this._set.size:Object.getOwnPropertyNames(this._set).length};vt.prototype.add=function(t,i){var n=Ut?t:tl.toSetString(t),c=Ut?this.has(t):il.call(this._set,n),h=this._array.length;(!c||i)&&this._array.push(t),c||(Ut?this._set.set(t,h):this._set[n]=h)};vt.prototype.has=function(t){if(Ut)return this._set.has(t);var i=tl.toSetString(t);return il.call(this._set,i)};vt.prototype.indexOf=function(t){if(Ut){var i=this._set.get(t);if(i>=0)return i}else{var n=tl.toSetString(t);if(il.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};vt.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};vt.prototype.toArray=function(){return this._array.slice()};Np.ArraySet=vt});var Op=Xt(Fp=>{var Mp=qr();function ex(e,t){var i=e.generatedLine,n=t.generatedLine,c=e.generatedColumn,h=t.generatedColumn;return n>i||n==i&&h>=c||Mp.compareByGeneratedPositionsInflated(e,t)<=0}function Kr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Kr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Kr.prototype.add=function(t){ex(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Kr.prototype.toArray=function(){return this._sorted||(this._array.sort(Mp.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Fp.MappingList=Kr});var Vp=Xt(Dp=>{var Hi=Tp(),ue=qr(),Yr=Rp().ArraySet,tx=Op().MappingList;function Ke(e){e||(e={}),this._file=ue.getArg(e,"file",null),this._sourceRoot=ue.getArg(e,"sourceRoot",null),this._skipValidation=ue.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=ue.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Yr,this._names=new Yr,this._mappings=new tx,this._sourcesContents=null}Ke.prototype._version=3;Ke.fromSourceMap=function(t,i){var n=t.sourceRoot,c=new Ke(Object.assign(i||{},{file:t.file,sourceRoot:n}));return t.eachMapping(function(h){var d={generated:{line:h.generatedLine,column:h.generatedColumn}};h.source!=null&&(d.source=h.source,n!=null&&(d.source=ue.relative(n,d.source)),d.original={line:h.originalLine,column:h.originalColumn},h.name!=null&&(d.name=h.name)),c.addMapping(d)}),t.sources.forEach(function(h){var d=h;n!==null&&(d=ue.relative(n,h)),c._sources.has(d)||c._sources.add(d);var g=t.sourceContentFor(h);g!=null&&c.setSourceContent(h,g)}),c};Ke.prototype.addMapping=function(t){var i=ue.getArg(t,"generated"),n=ue.getArg(t,"original",null),c=ue.getArg(t,"source",null),h=ue.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,n,c,h)===!1||(c!=null&&(c=String(c),this._sources.has(c)||this._sources.add(c)),h!=null&&(h=String(h),this._names.has(h)||this._names.add(h)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:c,name:h}))};Ke.prototype.setSourceContent=function(t,i){var n=t;this._sourceRoot!=null&&(n=ue.relative(this._sourceRoot,n)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[ue.toSetString(n)]=i):this._sourcesContents&&(delete this._sourcesContents[ue.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};Ke.prototype.applySourceMap=function(t,i,n){var c=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);c=t.file}var h=this._sourceRoot;h!=null&&(c=ue.relative(h,c));var d=new Yr,g=new Yr;this._mappings.unsortedForEach(function(x){if(x.source===c&&x.originalLine!=null){var b=t.originalPositionFor({line:x.originalLine,column:x.originalColumn});b.source!=null&&(x.source=b.source,n!=null&&(x.source=ue.join(n,x.source)),h!=null&&(x.source=ue.relative(h,x.source)),x.originalLine=b.line,x.originalColumn=b.column,b.name!=null&&(x.name=b.name))}var v=x.source;v!=null&&!d.has(v)&&d.add(v);var S=x.name;S!=null&&!g.has(S)&&g.add(S)},this),this._sources=d,this._names=g,t.sources.forEach(function(x){var b=t.sourceContentFor(x);b!=null&&(n!=null&&(x=ue.join(n,x)),h!=null&&(x=ue.relative(h,x)),this.setSourceContent(x,b))},this)};Ke.prototype._validateMapping=function(t,i,n,c){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var h="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!n&&!c)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&n)return;var h="Invalid mapping: "+JSON.stringify({generated:t,source:n,original:i,name:c});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}};Ke.prototype._serializeMappings=function(){for(var t=0,i=1,n=0,c=0,h=0,d=0,g="",x,b,v,S,C=this._mappings.toArray(),u=0,L=C.length;u<L;u++){if(b=C[u],x="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)x+=";",i++;else if(u>0){if(!ue.compareByGeneratedPositionsInflated(b,C[u-1]))continue;x+=","}x+=Hi.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(S=this._sources.indexOf(b.source),x+=Hi.encode(S-d),d=S,x+=Hi.encode(b.originalLine-1-c),c=b.originalLine-1,x+=Hi.encode(b.originalColumn-n),n=b.originalColumn,b.name!=null&&(v=this._names.indexOf(b.name),x+=Hi.encode(v-h),h=v)),g+=x}return g};Ke.prototype._generateSourcesContent=function(t,i){return t.map(function(n){if(!this._sourcesContents)return null;i!=null&&(n=ue.relative(i,n));var c=ue.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,c)?this._sourcesContents[c]:null},this)};Ke.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};Ke.prototype.toString=function(){return JSON.stringify(this.toJSON())};Dp.SourceMapGenerator=Ke});var Lf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],vc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],If="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",kc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",Tn={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},_n="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",$f={5:_n,"5module":_n+" export import",6:_n+" const class extends export import super"},Sc=/^in(stanceof)?$/,Pf=new RegExp("["+kc+"]"),Nf=new RegExp("["+kc+If+"]");function In(e,t){for(var i=65536,n=0;n<t.length;n+=2){if(i+=t[n],i>e)return!1;if(i+=t[n+1],i>=e)return!0}return!1}function at(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Pf.test(String.fromCharCode(e)):t===!1?!1:In(e,vc)}function At(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Nf.test(String.fromCharCode(e)):t===!1?!1:In(e,vc)||In(e,Lf)}var q=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Ue(e,t){return new q(e,{beforeExpr:!0,binop:t})}var He={beforeExpr:!0},_e={startsExpr:!0},Rn={};function G(e,t){return t===void 0&&(t={}),t.keyword=e,Rn[e]=new q(e,t)}var m={num:new q("num",_e),regexp:new q("regexp",_e),string:new q("string",_e),name:new q("name",_e),privateId:new q("privateId",_e),eof:new q("eof"),bracketL:new q("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new q("]"),braceL:new q("{",{beforeExpr:!0,startsExpr:!0}),braceR:new q("}"),parenL:new q("(",{beforeExpr:!0,startsExpr:!0}),parenR:new q(")"),comma:new q(",",He),semi:new q(";",He),colon:new q(":",He),dot:new q("."),question:new q("?",He),questionDot:new q("?."),arrow:new q("=>",He),template:new q("template"),invalidTemplate:new q("invalidTemplate"),ellipsis:new q("...",He),backQuote:new q("`",_e),dollarBraceL:new q("${",{beforeExpr:!0,startsExpr:!0}),eq:new q("=",{beforeExpr:!0,isAssign:!0}),assign:new q("_=",{beforeExpr:!0,isAssign:!0}),incDec:new q("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new q("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Ue("||",1),logicalAND:Ue("&&",2),bitwiseOR:Ue("|",3),bitwiseXOR:Ue("^",4),bitwiseAND:Ue("&",5),equality:Ue("==/!=/===/!==",6),relational:Ue("</>/<=/>=",7),bitShift:Ue("<</>>/>>>",8),plusMin:new q("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Ue("%",10),star:Ue("*",10),slash:Ue("/",10),starstar:new q("**",{beforeExpr:!0}),coalesce:Ue("??",1),_break:G("break"),_case:G("case",He),_catch:G("catch"),_continue:G("continue"),_debugger:G("debugger"),_default:G("default",He),_do:G("do",{isLoop:!0,beforeExpr:!0}),_else:G("else",He),_finally:G("finally"),_for:G("for",{isLoop:!0}),_function:G("function",_e),_if:G("if"),_return:G("return",He),_switch:G("switch"),_throw:G("throw",He),_try:G("try"),_var:G("var"),_const:G("const"),_while:G("while",{isLoop:!0}),_with:G("with"),_new:G("new",{beforeExpr:!0,startsExpr:!0}),_this:G("this",_e),_super:G("super",_e),_class:G("class",_e),_extends:G("extends",He),_export:G("export"),_import:G("import",_e),_null:G("null",_e),_true:G("true",_e),_false:G("false",_e),_in:G("in",{beforeExpr:!0,binop:7}),_instanceof:G("instanceof",{beforeExpr:!0,binop:7}),_typeof:G("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:G("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:G("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Le=/\r\n?|\n|\u2028|\u2029/,Rf=new RegExp(Le.source,"g");function ei(e){return e===10||e===13||e===8232||e===8233}function wc(e,t,i){i===void 0&&(i=e.length);for(var n=t;n<i;n++){var c=e.charCodeAt(n);if(ei(c))return n<i-1&&c===13&&e.charCodeAt(n+1)===10?n+2:n+1}return-1}var Cc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,me=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,Ec=Object.prototype,Mf=Ec.hasOwnProperty,Ff=Ec.toString,ti=Object.hasOwn||(function(e,t){return Mf.call(e,t)}),mc=Array.isArray||(function(e){return Ff.call(e)==="[object Array]"}),gc=Object.create(null);function Et(e){return gc[e]||(gc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function mt(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var Of=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,Li=function(t,i){this.line=t,this.column=i};Li.prototype.offset=function(t){return new Li(this.line,this.column+t)};var yr=function(t,i,n){this.start=i,this.end=n,t.sourceFile!==null&&(this.source=t.sourceFile)};function Ac(e,t){for(var i=1,n=0;;){var c=wc(e,n,t);if(c<0)return new Li(i,t-n);++i,n=c}}var $n={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},bc=!1;function Df(e){var t={};for(var i in $n)t[i]=e&&ti(e,i)?e[i]:$n[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!bc&&typeof console=="object"&&console.warn&&(bc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),mc(t.onToken)){var n=t.onToken;t.onToken=function(c){return n.push(c)}}if(mc(t.onComment)&&(t.onComment=Vf(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function Vf(e,t){return function(i,n,c,h,d,g){var x={type:i?"Block":"Line",value:n,start:c,end:h};e.locations&&(x.loc=new yr(this,d,g)),e.ranges&&(x.range=[c,h]),t.push(x)}}var Mt=1,Ft=2,Mn=4,Tc=8,Fn=16,_c=32,vr=64,Lc=128,Ot=256,Ii=512,Ic=1024,kr=Mt|Ft|Ot;function On(e,t){return Ft|(e?Mn:0)|(t?Tc:0)}var mr=0,Dn=1,bt=2,$c=3,Pc=4,Nc=5,de=function(t,i,n){this.options=t=Df(t),this.sourceFile=t.sourceFile,this.keywords=Et($f[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var c="";t.allowReserved!==!0&&(c=Tn[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(c+=" await")),this.reservedWords=Et(c);var h=(c?c+" ":"")+Tn.strict;this.reservedWordsStrict=Et(h),this.reservedWordsStrictBind=Et(h+" "+Tn.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=n||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):n?(this.lineStart=this.input.lastIndexOf(`
`,n-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Le).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?Ft:Mt),this.regexpState=null,this.privateNameStack=[]},We={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};de.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};We.inFunction.get=function(){return(this.currentVarScope().flags&Ft)>0};We.inGenerator.get=function(){return(this.currentVarScope().flags&Tc)>0};We.inAsync.get=function(){return(this.currentVarScope().flags&Mn)>0};We.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ot|Ii))return!1;if(i&Ft)return(i&Mn)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};We.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&Mt)};We.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&vr)>0||this.options.allowSuperOutsideMethod};We.allowDirectSuper.get=function(){return(this.currentThisScope().flags&Lc)>0};We.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};We.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ot|Ii)||i&Ft&&!(i&Fn))return!0}return!1};We.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&Ic||!this.inModule&&t&Mt)};We.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Ot)>0};de.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var n=this,c=0;c<t.length;c++)n=t[c](n);return n};de.parse=function(t,i){return new this(i,t).parse()};de.parseExpressionAt=function(t,i,n){var c=new this(n,t,i);return c.nextToken(),c.parseExpression()};de.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(de.prototype,We);var ve=de.prototype,Bf=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;ve.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){me.lastIndex=e,e+=me.exec(this.input)[0].length;var t=Bf.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){me.lastIndex=e+t[0].length;var i=me.exec(this.input),n=i.index+i[0].length,c=this.input.charAt(n);return c===";"||c==="}"||Le.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(c)||c==="!"&&this.input.charAt(n+1)==="=")}e+=t[0].length,me.lastIndex=e,e+=me.exec(this.input)[0].length,this.input[e]===";"&&e++}};ve.eat=function(e){return this.type===e?(this.next(),!0):!1};ve.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};ve.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};ve.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};ve.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};ve.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||Le.test(this.input.slice(this.lastTokEnd,this.start))};ve.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};ve.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};ve.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};ve.expect=function(e){this.eat(e)||this.unexpected()};ve.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var Sr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};ve.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};ve.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,n=e.doubleProto;if(!t)return i>=0||n>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")};ve.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};ve.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var P=de.prototype;P.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var n=0,c=Object.keys(this.undefinedExports);n<c.length;n+=1){var h=c[n];this.raiseRecoverable(this.undefinedExports[h].start,"Export '"+h+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Vn={kind:"loop"},jf={kind:"switch"};P.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;me.lastIndex=this.pos;var t=me.exec(this.input),i=this.pos+t[0].length,n=this.fullCharCodeAt(i);if(n===91||n===92)return!0;if(e)return!1;if(n===123)return!0;if(at(n)){var c=i;do i+=n<=65535?1:2;while(At(n=this.fullCharCodeAt(i)));if(n===92)return!0;var h=this.input.slice(c,i);if(!Sc.test(h))return!0}return!1};P.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;me.lastIndex=this.pos;var e=me.exec(this.input),t=this.pos+e[0].length,i;return!Le.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(At(i=this.fullCharCodeAt(t+8))||i===92))};P.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;me.lastIndex=this.pos;var i=me.exec(this.input),n=this.pos+i[0].length;if(Le.test(this.input.slice(this.pos,n)))return!1;if(e){var c=n+5,h;if(this.input.slice(n,c)!=="using"||c===this.input.length||At(h=this.fullCharCodeAt(c))||h===92)return!1;me.lastIndex=c;var d=me.exec(this.input);if(n=c+d[0].length,d&&Le.test(this.input.slice(c,n)))return!1}var g=this.fullCharCodeAt(n);if(!at(g)&&g!==92)return!1;var x=n;do n+=g<=65535?1:2;while(At(g=this.fullCharCodeAt(n)));if(g===92)return!0;var b=this.input.slice(x,n);if(Sc.test(b))return!1;if(t&&!e&&b==="of"){me.lastIndex=n;var v=me.exec(this.input);if(n=n+v[0].length,this.input.charCodeAt(n)!==61||(g=this.input.charCodeAt(n+1))===61||g===62)return!1}return!0};P.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};P.isUsing=function(e){return this.isUsingKeyword(!1,e)};P.parseStatement=function(e,t,i){var n=this.type,c=this.startNode(),h;switch(this.isLet(e)&&(n=m._var,h="let"),n){case m._break:case m._continue:return this.parseBreakContinueStatement(c,n.keyword);case m._debugger:return this.parseDebuggerStatement(c);case m._do:return this.parseDoStatement(c);case m._for:return this.parseForStatement(c);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(c,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(c,!0);case m._if:return this.parseIfStatement(c);case m._return:return this.parseReturnStatement(c);case m._switch:return this.parseSwitchStatement(c);case m._throw:return this.parseThrowStatement(c);case m._try:return this.parseTryStatement(c);case m._const:case m._var:return h=h||this.value,e&&h!=="var"&&this.unexpected(),this.parseVarStatement(c,h);case m._while:return this.parseWhileStatement(c);case m._with:return this.parseWithStatement(c);case m.braceL:return this.parseBlock(!0,c);case m.semi:return this.parseEmptyStatement(c);case m._export:case m._import:if(this.options.ecmaVersion>10&&n===m._import){me.lastIndex=this.pos;var d=me.exec(this.input),g=this.pos+d[0].length,x=this.input.charCodeAt(g);if(x===40||x===46)return this.parseExpressionStatement(c,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),n===m._import?this.parseImport(c):this.parseExport(c,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(c,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(c,!1,b),this.semicolon(),this.finishNode(c,"VariableDeclaration");var v=this.value,S=this.parseExpression();return n===m.name&&S.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(c,v,S,e):this.parseExpressionStatement(c,S)}};P.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var n=0;n<this.labels.length;++n){var c=this.labels[n];if((e.label==null||c.name===e.label.name)&&(c.kind!=null&&(i||c.kind==="loop")||e.label&&i))break}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};P.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};P.parseDoStatement=function(e){return this.next(),this.labels.push(Vn),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};P.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Vn),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var n=this.startNode(),c=i?"let":this.value;return this.next(),this.parseVar(n,!0,c),this.finishNode(n,"VariableDeclaration"),this.parseForAfterInit(e,n,t)}var h=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var x=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(x,!0,g),this.finishNode(x,"VariableDeclaration"),this.parseForAfterInit(e,x,t)}var b=this.containsEsc,v=new Sr,S=this.start,C=t>-1?this.parseExprSubscripts(v,"await"):this.parseExpression(!0,v);return this.type===m._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(C.start===S&&!b&&C.type==="Identifier"&&C.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),h&&d&&this.raise(C.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(C,!1,v),this.checkLValPattern(C),this.parseForIn(e,C)):(this.checkExpressionErrors(v,!0),t>-1&&this.unexpected(t),this.parseFor(e,C))};P.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};P.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,_i|(i?0:Pn),!1,t)};P.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};P.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};P.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(jf),this.enterScope(Ic);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var n=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};P.parseThrowStatement=function(e){return this.next(),Le.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Uf=[];P.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?_c:0),this.checkLValPattern(e,t?Pc:bt),this.expect(m.parenR),e};P.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};P.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};P.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Vn),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};P.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};P.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};P.parseLabeledStatement=function(e,t,i,n){for(var c=0,h=this.labels;c<h.length;c+=1){var d=h[c];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,x=this.labels.length-1;x>=0;x--){var b=this.labels[x];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(n?n.indexOf("label")===-1?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};P.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};P.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var n=this.parseStatement(null);t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};P.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};P.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};P.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var c=this.startNode();if(this.parseVarId(c,i),this.eat(m.eq)?c.init=this.parseMaybeAssign(t):!n&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!n&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!n&&c.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):c.init=null,e.declarations.push(this.finishNode(c,"VariableDeclarator")),!this.eat(m.comma))break}return e};P.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?Dn:bt,!1)};var _i=1,Pn=2,Rc=4;P.parseFunction=function(e,t,i,n,c){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===m.star&&t&Pn&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&_i&&(e.id=t&Rc&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&Pn)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?Dn:bt:$c));var h=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(On(e.async,e.generator)),t&_i||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,c),this.yieldPos=h,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&_i?"FunctionDeclaration":"FunctionExpression")};P.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};P.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var n=this.enterClassBody(),c=this.startNode(),h=!1;for(c.body=[],this.expect(m.braceL);this.type!==m.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(c.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(h&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),h=!0):d.key&&d.key.type==="PrivateIdentifier"&&Hf(n,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(c,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};P.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),n="",c=!1,h=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:n="static"}if(i.static=g,!n&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?h=!0:n="async"),!n&&(t>=9||!h)&&this.eat(m.star)&&(c=!0),!n&&!h&&!c){var x=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=x:n=x)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||d!=="method"||c||h){var b=!i.static&&gr(i,"constructor"),v=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,c,h,v)}else this.parseClassField(i);return i};P.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};P.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};P.parseClassMethod=function(e,t,i,n){var c=e.key;e.kind==="constructor"?(t&&this.raise(c.start,"Constructor can't be a generator"),i&&this.raise(c.start,"Constructor can't be an async method")):e.static&&gr(e,"prototype")&&this.raise(c.start,"Classes may not have a static property named prototype");var h=e.value=this.parseMethod(t,i,n);return e.kind==="get"&&h.params.length!==0&&this.raiseRecoverable(h.start,"getter should have no params"),e.kind==="set"&&h.params.length!==1&&this.raiseRecoverable(h.start,"setter should have exactly one param"),e.kind==="set"&&h.params[0].type==="RestElement"&&this.raiseRecoverable(h.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};P.parseClassField=function(e){return gr(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&gr(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(Ii|vr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};P.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Ot|vr);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};P.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,bt,!1)):(t===!0&&this.unexpected(),e.id=null)};P.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};P.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};P.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,c=n===0?null:this.privateNameStack[n-1],h=0;h<i.length;++h){var d=i[h];ti(t,d.name)||(c?c.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function Hf(e,t){var i=t.key.name,n=e[i],c="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(c=(t.static?"s":"i")+t.kind),n==="iget"&&c==="iset"||n==="iset"&&c==="iget"||n==="sget"&&c==="sset"||n==="sset"&&c==="sget"?(e[i]="true",!1):n?!0:(e[i]=c,!1)}function gr(e,t){var i=e.computed,n=e.key;return!i&&(n.type==="Identifier"&&n.name===t||n.type==="Literal"&&n.value===t)}P.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};P.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var c=n[i];this.checkUnreserved(c.local),this.checkLocalExport(c.local),c.local.type==="Literal"&&this.raise(c.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};P.parseExportDeclaration=function(e){return this.parseStatement(null)};P.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,_i|Rc,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var n=this.parseMaybeAssign();return this.semicolon(),n}};P.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),ti(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};P.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var n=0,c=t.properties;n<c.length;n+=1){var h=c[n];this.checkPatternExport(e,h)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var x=g[d];x&&this.checkPatternExport(e,x)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};P.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var c=n[i];this.checkPatternExport(e,c.id)}};P.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};P.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};P.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};P.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=Uf,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};P.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,bt),this.finishNode(e,"ImportSpecifier")};P.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,bt),this.finishNode(e,"ImportDefaultSpecifier")};P.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,bt),this.finishNode(e,"ImportNamespaceSpecifier")};P.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};P.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var n=this.parseImportAttribute(),c=n.key.type==="Identifier"?n.key.name:n.key.value;ti(t,c)&&this.raiseRecoverable(n.key.start,"Duplicate attribute key '"+c+"'"),t[c]=!0,e.push(n)}return e};P.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};P.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return Of.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};P.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};P.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var Ge=de.prototype;Ge.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var n=0,c=e.properties;n<c.length;n+=1){var h=c[n];this.toAssignable(h,t),h.type==="RestElement"&&(h.argument.type==="ArrayPattern"||h.argument.type==="ObjectPattern")&&this.raise(h.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};Ge.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var c=e[n];c&&this.toAssignable(c,t)}if(i){var h=e[i-1];this.options.ecmaVersion===6&&t&&h&&h.type==="RestElement"&&h.argument.type!=="Identifier"&&this.unexpected(h.argument.start)}return e};Ge.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};Ge.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};Ge.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};Ge.parseBindingList=function(e,t,i,n){for(var c=[],h=!0;!this.eat(e);)if(h?h=!1:this.expect(m.comma),t&&this.type===m.comma)c.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),c.push(d),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else c.push(this.parseAssignableListItem(n))}return c};Ge.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};Ge.parseBindingListItem=function(e){return e};Ge.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var n=this.startNodeAt(e,t);return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")};Ge.checkLValSimple=function(e,t,i){t===void 0&&(t=mr);var n=t!==mr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(t===bt&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(ti(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==Nc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}};Ge.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=mr),e.type){case"ObjectPattern":for(var n=0,c=e.properties;n<c.length;n+=1){var h=c[n];this.checkLValInnerPattern(h,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var x=g[d];x&&this.checkLValInnerPattern(x,t,i)}break;default:this.checkLValSimple(e,t,i)}};Ge.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=mr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var Je=function(t,i,n,c,h){this.token=t,this.isExpr=!!i,this.preserveSpace=!!n,this.override=c,this.generator=!!h},re={b_stat:new Je("{",!1),b_expr:new Je("{",!0),b_tmpl:new Je("${",!1),p_stat:new Je("(",!1),p_expr:new Je("(",!0),q_tmpl:new Je("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new Je("function",!1),f_expr:new Je("function",!0),f_expr_gen:new Je("function",!0,!1,null,!0),f_gen:new Je("function",!1,!1,null,!0)},ii=de.prototype;ii.initialContext=function(){return[re.b_stat]};ii.curContext=function(){return this.context[this.context.length-1]};ii.braceIsBlock=function(e){var t=this.curContext();return t===re.f_expr||t===re.f_stat?!0:e===m.colon&&(t===re.b_stat||t===re.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?Le.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===re.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};ii.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};ii.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};ii.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===re.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?re.b_stat:re.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(re.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?re.p_stat:re.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==re.p_stat)&&!(e===m._return&&Le.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===re.b_stat)?this.context.push(re.f_expr):this.context.push(re.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===re.q_tmpl?this.context.pop():this.context.push(re.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===re.f_expr?this.context[t]=re.f_expr_gen:this.context[t]=re.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var M=de.prototype;M.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n=e.key,c;switch(n.type){case"Identifier":c=n.name;break;case"Literal":c=String(n.value);break;default:return}var h=e.kind;if(this.options.ecmaVersion>=6){c==="__proto__"&&h==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=n.start):this.raiseRecoverable(n.start,"Redefinition of __proto__ property")),t.proto=!0);return}c="$"+c;var d=t[c];if(d){var g;h==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[h],g&&this.raiseRecoverable(n.start,"Redefinition of property")}else d=t[c]={init:!1,get:!1,set:!1};d[h]=!0}};M.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var n=i.start,c=i.startLoc,h=i.parseMaybeAssign(e,t);if(i.type===m.comma){var d=i.startNodeAt(n,c);for(d.expressions=[h];i.eat(m.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return h})};M.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var n=!1,c=-1,h=-1,d=-1;t?(c=t.parenthesizedAssign,h=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new Sr,n=!0);var g=this.start,x=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,x)),this.type.isAssign){var v=this.startNodeAt(g,x);return v.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),v.left=b,this.next(),v.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(v,"AssignmentExpression")}else n&&this.checkExpressionErrors(t,!0);return c>-1&&(t.parenthesizedAssign=c),h>-1&&(t.trailingComma=h),b};M.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,c=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return c;if(!(c.type==="ArrowFunctionExpression"&&c.start===i)&&this.eat(m.question)){var h=this.startNodeAt(i,n);return h.test=c,h.consequent=this.parseMaybeAssign(),this.expect(m.colon),h.alternate=this.parseMaybeAssign(e),this.finishNode(h,"ConditionalExpression")}return c};M.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,c=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||c.start===i&&c.type==="ArrowFunctionExpression"?c:this.parseExprOp(c,i,n,-1,e)};M.parseExprOp=function(e,t,i,n,c){var h=this.type.binop;if(h!=null&&(!c||this.type!==m._in)&&h>n){var d=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(h=m.logicalAND.binop);var x=this.value;this.next();var b=this.start,v=this.startLoc,S=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,c),b,v,h,c),C=this.buildBinary(t,i,e,S,x,d||g);return(d&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(C,t,i,n,c)}return e};M.buildBinary=function(e,t,i,n,c,h){n.type==="PrivateIdentifier"&&this.raise(n.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=c,d.right=n,this.finishNode(d,h?"LogicalExpression":"BinaryExpression")};M.parseMaybeUnary=function(e,t,i,n){var c=this.start,h=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(n),t=!0;else if(this.type.prefix){var g=this.startNode(),x=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,x,n),this.checkExpressionErrors(e,!0),x?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Mc(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&Nn(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,x?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(n||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(c,h);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===c)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(c,h,d,this.parseMaybeUnary(null,!1,!1,n),"**",!1);else return d};function Mc(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Mc(e.expression)}function Nn(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&Nn(e.expression)||e.type==="ParenthesizedExpression"&&Nn(e.expression)}M.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,c=this.parseExprAtom(e,t);if(c.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return c;var h=this.parseSubscripts(c,i,n,!1,t);return e&&h.type==="MemberExpression"&&(e.parenthesizedAssign>=h.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=h.start&&(e.parenthesizedBind=-1),e.trailingComma>=h.start&&(e.trailingComma=-1)),h};M.parseSubscripts=function(e,t,i,n,c){for(var h=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,n,h,d,c);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var x=this.startNodeAt(t,i);x.expression=g,g=this.finishNode(x,"ChainExpression")}return g}e=g}};M.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};M.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)};M.parseSubscript=function(e,t,i,n,c,h,d){var g=this.options.ecmaVersion>=11,x=g&&this.eat(m.questionDot);n&&x&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||x&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var v=this.startNodeAt(t,i);v.object=e,b?(v.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?v.property=this.parsePrivateIdent():v.property=this.parseIdent(this.options.allowReserved!=="never"),v.computed=!!b,g&&(v.optional=x),e=this.finishNode(v,"MemberExpression")}else if(!n&&this.eat(m.parenL)){var S=new Sr,C=this.yieldPos,u=this.awaitPos,L=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var B=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,S);if(c&&!x&&this.shouldParseAsyncArrow())return this.checkPatternErrors(S,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=C,this.awaitPos=u,this.awaitIdentPos=L,this.parseSubscriptAsyncArrow(t,i,B,d);this.checkExpressionErrors(S,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,this.awaitIdentPos=L||this.awaitIdentPos;var J=this.startNodeAt(t,i);J.callee=e,J.arguments=B,g&&(J.optional=x),e=this.finishNode(J,"CallExpression")}else if(this.type===m.backQuote){(x||h)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var Y=this.startNodeAt(t,i);Y.tag=e,Y.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(Y,"TaggedTemplateExpression")}return e};M.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var n,c=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(n,"Super");case m._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression");case m.name:var h=this.start,d=this.startLoc,g=this.containsEsc,x=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&x.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(re.f_expr),this.parseFunction(this.startNodeAt(h,d),0,!1,!0,t);if(c&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(h,d),[x],!1,t);if(this.options.ecmaVersion>=8&&x.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return x=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(h,d),[x],!0,t)}return x;case m.regexp:var b=this.value;return n=this.parseLiteral(b.value),n.regex={pattern:b.pattern,flags:b.flags},n;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return n=this.startNode(),n.value=this.type===m._null?null:this.type===m._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal");case m.parenL:var v=this.start,S=this.parseParenAndDistinguishExpression(c,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(S)&&(e.parenthesizedAssign=v),e.parenthesizedBind<0&&(e.parenthesizedBind=v)),S;case m.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression");case m.braceL:return this.overrideContext(re.b_expr),this.parseObj(!1,e);case m._function:return n=this.startNode(),this.next(),this.parseFunction(n,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};M.parseExprAtomDefault=function(){this.unexpected()};M.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};M.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};M.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};M.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};M.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};M.shouldParseArrow=function(e){return!this.canInsertSemicolon()};M.parseParenAndDistinguishExpression=function(e,t){var i=this.start,n=this.startLoc,c,h=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,x=[],b=!0,v=!1,S=new Sr,C=this.yieldPos,u=this.awaitPos,L;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),h&&this.afterTrailingComma(m.parenR,!0)){v=!0;break}else if(this.type===m.ellipsis){L=this.start,x.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else x.push(this.parseMaybeAssign(!1,S,this.parseParenItem));var B=this.lastTokEnd,J=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(x)&&this.eat(m.arrow))return this.checkPatternErrors(S,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=C,this.awaitPos=u,this.parseParenArrowList(i,n,x,t);(!x.length||v)&&this.unexpected(this.lastTokStart),L&&this.unexpected(L),this.checkExpressionErrors(S,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,x.length>1?(c=this.startNodeAt(d,g),c.expressions=x,this.finishNodeAt(c,"SequenceExpression",B,J)):c=x[0]}else c=this.parseParenExpression();if(this.options.preserveParens){var Y=this.startNodeAt(i,n);return Y.expression=c,this.finishNode(Y,"ParenthesizedExpression")}else return c};M.parseParenItem=function(e){return e};M.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)};var zf=[];M.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,c=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,c,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(n,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=zf,this.finishNode(e,"NewExpression")};M.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};M.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var n=this.parseTemplateElement({isTagged:t});for(i.quasis=[n];!n.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};M.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!Le.test(this.input.slice(this.lastTokEnd,this.start))};M.parseObj=function(e,t){var i=this.startNode(),n=!0,c={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(n)n=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var h=this.parseProperty(e,t);e||this.checkPropClash(h,c,t),i.properties.push(h)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};M.parseProperty=function(e,t){var i=this.startNode(),n,c,h,d;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(h=this.start,d=this.startLoc),e||(n=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(i)?(c=!0,n=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):c=!1,this.parsePropertyValue(i,e,n,c,h,d,t,g),this.finishNode(i,"Property")};M.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var n=e.value.start;e.kind==="get"?this.raiseRecoverable(n,"getter should have no params"):this.raiseRecoverable(n,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};M.parsePropertyValue=function(e,t,i,n,c,h,d,g){(i||n)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,n),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||n)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=c),t?e.value=this.parseMaybeDefault(c,h,this.copyNode(e.key)):this.type===m.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(c,h,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};M.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};M.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};M.parseMethod=function(e,t,i){var n=this.startNode(),c=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(On(t,n.generator)|vr|(i?Lc:0)),this.expect(m.parenL),n.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=c,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(n,"FunctionExpression")};M.parseArrowExpression=function(e,t,i,n){var c=this.yieldPos,h=this.awaitPos,d=this.awaitIdentPos;return this.enterScope(On(i,!1)|Fn),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=c,this.awaitPos=h,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};M.parseFunctionBody=function(e,t,i,n){var c=t&&this.type!==m.braceL,h=this.strict,d=!1;if(c)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!h||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var x=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!h&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,Nc),e.body=this.parseBlock(!1,void 0,d&&!h),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=x}this.exitScope()};M.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var n=i[t];if(n.type!=="Identifier")return!1}return!0};M.checkParams=function(e,t){for(var i=Object.create(null),n=0,c=e.params;n<c.length;n+=1){var h=c[n];this.checkLValInnerPattern(h,Dn,t?null:i)}};M.parseExprList=function(e,t,i,n){for(var c=[],h=!0;!this.eat(e);){if(h)h=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===m.comma?d=null:this.type===m.ellipsis?(d=this.parseSpread(n),n&&this.type===m.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):d=this.parseMaybeAssign(!1,n),c.push(d)}return c};M.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name;if(this.inGenerator&&n==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&kr)&&n==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(n==="arguments"||n==="await")&&this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var c=this.strict?this.reservedWordsStrict:this.reservedWords;c.test(n)&&(!this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))}};M.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};M.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};M.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};M.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};M.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var br=de.prototype;br.raise=function(e,t){var i=Ac(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var n=new SyntaxError(t);throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n};br.raiseRecoverable=br.raise;br.curPosition=function(){if(this.options.locations)return new Li(this.curLine,this.pos-this.lineStart)};var Tt=de.prototype,Wf=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};Tt.enterScope=function(e){this.scopeStack.push(new Wf(e))};Tt.exitScope=function(){this.scopeStack.pop()};Tt.treatFunctionsAsVarInScope=function(e){return e.flags&Ft||!this.inModule&&e.flags&Mt};Tt.declareName=function(e,t,i){var n=!1;if(t===bt){var c=this.currentScope();n=c.lexical.indexOf(e)>-1||c.functions.indexOf(e)>-1||c.var.indexOf(e)>-1,c.lexical.push(e),this.inModule&&c.flags&Mt&&delete this.undefinedExports[e]}else if(t===Pc){var h=this.currentScope();h.lexical.push(e)}else if(t===$c){var d=this.currentScope();this.treatFunctionsAsVar?n=d.lexical.indexOf(e)>-1:n=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var x=this.scopeStack[g];if(x.lexical.indexOf(e)>-1&&!(x.flags&_c&&x.lexical[0]===e)||!this.treatFunctionsAsVarInScope(x)&&x.functions.indexOf(e)>-1){n=!0;break}if(x.var.push(e),this.inModule&&x.flags&Mt&&delete this.undefinedExports[e],x.flags&kr)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};Tt.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};Tt.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};Tt.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(kr|Ii|Ot))return t}};Tt.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(kr|Ii|Ot)&&!(t.flags&Fn))return t}};var wr=function(t,i,n){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new yr(t,n)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},$i=de.prototype;$i.startNode=function(){return new wr(this,this.start,this.startLoc)};$i.startNodeAt=function(e,t){return new wr(this,e,t)};function Fc(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}$i.finishNode=function(e,t){return Fc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};$i.finishNodeAt=function(e,t,i,n){return Fc.call(this,e,t,i,n)};$i.copyNode=function(e){var t=new wr(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Gf="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Oc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Dc=Oc+" Extended_Pictographic",Vc=Dc,Bc=Vc+" EBase EComp EMod EPres ExtPict",jc=Bc,qf=jc,Kf={9:Oc,10:Dc,11:Vc,12:Bc,13:jc,14:qf},Yf="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",Qf={9:"",10:"",11:"",12:"",13:"",14:Yf},xc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Uc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Hc=Uc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",zc=Hc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Wc=zc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Gc=Wc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Zf=Gc+" "+Gf,Jf={9:Uc,10:Hc,11:zc,12:Wc,13:Gc,14:Zf},qc={};function Xf(e){var t=qc[e]={binary:Et(Kf[e]+" "+xc),binaryOfStrings:Et(Qf[e]),nonBinary:{General_Category:Et(xc),Script:Et(Jf[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(fr=0,Ln=[9,10,11,12,13,14];fr<Ln.length;fr+=1)yc=Ln[fr],Xf(yc);var yc,fr,Ln,$=de.prototype,xr=function(t,i){this.parent=t,this.base=i||this};xr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var n=t;n;n=n.parent)if(i.base===n.base&&i!==n)return!0;return!1};xr.prototype.sibling=function(){return new xr(this.parent,this.base)};var st=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=qc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};st.prototype.reset=function(t,i,n){var c=n.indexOf("v")!==-1,h=n.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=n,c&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=h&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=h&&this.parser.options.ecmaVersion>=9)};st.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};st.prototype.at=function(t,i){i===void 0&&(i=!1);var n=this.source,c=n.length;if(t>=c)return-1;var h=n.charCodeAt(t);if(!(i||this.switchU)||h<=55295||h>=57344||t+1>=c)return h;var d=n.charCodeAt(t+1);return d>=56320&&d<=57343?(h<<10)+d-56613888:h};st.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var n=this.source,c=n.length;if(t>=c)return c;var h=n.charCodeAt(t),d;return!(i||this.switchU)||h<=55295||h>=57344||t+1>=c||(d=n.charCodeAt(t+1))<56320||d>57343?t+1:t+2};st.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};st.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};st.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};st.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};st.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var n=this.pos,c=0,h=t;c<h.length;c+=1){var d=h[c],g=this.at(n,i);if(g===-1||g!==d)return!1;n=this.nextIndex(n,i)}return this.pos=n,!0};$.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,c=!1,h=0;h<i.length;h++){var d=i.charAt(h);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,h+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(n=!0),d==="v"&&(c=!0)}this.options.ecmaVersion>=15&&n&&c&&this.raise(e.start,"Invalid regular expression flag")};function em(e){for(var t in e)return!0;return!1}$.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&em(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};$.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t];e.groupNames[n]||e.raise("Invalid named capture referenced")}};$.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new xr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};$.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};$.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};$.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};$.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};$.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};$.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var n=0,c=-1;if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(c=e.lastIntValue),e.eat(125)))return c!==-1&&c<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};$.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};$.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};$.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),n=e.eat(45);if(i||n){for(var c=0;c<i.length;c++){var h=i.charAt(c);i.indexOf(h,c+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(n){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var x=d.charAt(g);(d.indexOf(x,g+1)>-1||i.indexOf(x)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};$.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};$.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&tm(i);)t+=mt(i),e.advance();return t};function tm(e){return e===105||e===109||e===115}$.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};$.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};$.regexp_eatSyntaxCharacter=function(e){var t=e.current();return Kc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Kc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}$.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!Kc(i);)e.advance();return e.pos!==t};$.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};$.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var n=0,c=i;n<c.length;n+=1){var h=c[n];h.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};$.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};$.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=mt(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=mt(e.lastIntValue);return!0}return!1};$.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),im(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function im(e){return at(e,!0)||e===36||e===95}$.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),rm(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function rm(e){return At(e,!0)||e===36||e===95||e===8204||e===8205}$.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};$.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};$.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};$.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};$.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};$.regexp_eatZero=function(e){return e.current()===48&&!Cr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};$.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};$.regexp_eatControlLetter=function(e){var t=e.current();return Yc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function Yc(e){return e>=65&&e<=90||e>=97&&e<=122}$.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,n=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var c=e.lastIntValue;if(n&&c>=55296&&c<=56319){var h=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(c-55296)*1024+(d-56320)+65536,!0}e.pos=h,e.lastIntValue=c}return!0}if(n&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&nm(e.lastIntValue))return!0;n&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function nm(e){return e>=0&&e<=1114111}$.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};$.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var Qc=0,gt=1,ze=2;$.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(am(t))return e.lastIntValue=-1,e.advance(),gt;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var n;if(e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&n===ze&&e.raise("Invalid property name"),n;e.raise("Invalid property name")}return Qc};function am(e){return e===100||e===68||e===115||e===83||e===119||e===87}$.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),gt}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var c=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,c)}return Qc};$.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){ti(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};$.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return gt;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return ze;e.raise("Invalid property name")};$.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";Zc(t=e.current());)e.lastStringValue+=mt(t),e.advance();return e.lastStringValue!==""};function Zc(e){return Yc(e)||e===95}$.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";sm(t=e.current());)e.lastStringValue+=mt(t),e.advance();return e.lastStringValue!==""};function sm(e){return Zc(e)||Cr(e)}$.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};$.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===ze&&e.raise("Negated character class may contain strings"),!0}return!1};$.regexp_classContents=function(e){return e.current()===93?gt:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),gt)};$.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};$.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||eu(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current();return n!==93?(e.lastIntValue=n,e.advance(),!0):!1};$.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};$.regexp_classSetExpression=function(e){var t=gt,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===ze&&(t=ze);for(var n=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==ze&&(t=gt);continue}e.raise("Invalid character in character class")}if(n!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(n!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===ze&&(t=ze)}};$.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue;return i!==-1&&n!==-1&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};$.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?gt:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};$.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e);if(e.eat(93))return i&&n===ze&&e.raise("Negated character class may contain strings"),n;e.pos=t}if(e.eat(92)){var c=this.regexp_eatCharacterClassEscape(e);if(c)return c;e.pos=t}return null};$.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};$.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===ze&&(t=ze);return t};$.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?gt:ze};$.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&om(i)||lm(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function om(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function lm(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}$.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return cm(t)?(e.lastIntValue=t,e.advance(),!0):!1};function cm(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}$.regexp_eatClassControlLetter=function(e){var t=e.current();return Cr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};$.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};$.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Cr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function Cr(e){return e>=48&&e<=57}$.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Jc(i=e.current());)e.lastIntValue=16*e.lastIntValue+Xc(i),e.advance();return e.pos!==t};function Jc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Xc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}$.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};$.regexp_eatOctalDigit=function(e){var t=e.current();return eu(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function eu(e){return e>=48&&e<=55}$.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var n=0;n<t;++n){var c=e.current();if(!Jc(c))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+Xc(c),e.advance()}return!0};var Bn=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new yr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},H=de.prototype;H.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Bn(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};H.getToken=function(){return this.next(),new Bn(this)};typeof Symbol<"u"&&(H[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});H.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};H.readToken=function(e){return at(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};H.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};H.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};H.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,c=t;(n=wc(this.input,c,this.pos))>-1;)++this.curLine,c=this.lineStart=n;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};H.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!ei(n);)n=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};H.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&Cc.test(String.fromCharCode(e)))++this.pos;else break e}}};H.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};H.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};H.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};H.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,n=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(n,i)};H.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};H.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};H.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Le.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};H.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};H.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};H.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var n=this.input.charCodeAt(this.pos+2);if(n===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};H.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),at(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+mt(t)+"'")};H.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+mt(e)+"'")};H.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};H.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(Le.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(n==="[")t=!0;else if(n==="]"&&t)t=!1;else if(n==="/"&&!t)break;e=n==="\\"}++this.pos}var c=this.input.slice(i,this.pos);++this.pos;var h=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(h);var g=this.regexpState||(this.regexpState=new st(this));g.reset(i,c,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var x=null;try{x=new RegExp(c,d)}catch{}return this.finishToken(m.regexp,{pattern:c,flags:d,value:x})};H.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&t===void 0,c=i&&this.input.charCodeAt(this.pos)===48,h=this.pos,d=0,g=0,x=0,b=t??1/0;x<b;++x,++this.pos){var v=this.input.charCodeAt(this.pos),S=void 0;if(n&&v===95){c&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),x===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=v;continue}if(v>=97?S=v-97+10:v>=65?S=v-65+10:v>=48&&v<=57?S=v-48:S=1/0,S>=e)break;g=v,d=d*e+S}return n&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===h||t!=null&&this.pos-h!==t?null:d};function um(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function tu(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}H.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=tu(this.input.slice(t,this.pos)),++this.pos):at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};H.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var n=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&n===110){var c=tu(this.input.slice(t,this.pos));return++this.pos,at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,c)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),n===46&&!i&&(++this.pos,this.readInt(10),n=this.input.charCodeAt(this.pos)),(n===69||n===101)&&!i&&(n=this.input.charCodeAt(++this.pos),(n===43||n===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),at(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var h=um(this.input.slice(t,this.pos),i);return this.finishToken(m.num,h)};H.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};H.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var n=this.input.charCodeAt(this.pos);if(n===e)break;n===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):n===8232||n===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(ei(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var iu={};H.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===iu)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};H.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw iu;this.raise(e,t)};H.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(ei(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};H.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};H.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return mt(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],c=parseInt(n,8);return c>255&&(n=n.slice(0,-1),c=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),(n!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(c)}return ei(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};H.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};H.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,n=this.options.ecmaVersion>=6;this.pos<this.input.length;){var c=this.fullCharCodeAtPos();if(At(c,n))this.pos+=c<=65535?1:2;else if(c===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var h=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?at:At)(d,n)||this.invalidStringToken(h,"Invalid Unicode escape"),e+=mt(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};H.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=Rn[e]),this.finishToken(t,e)};var pm="8.18.0";de.acorn={Parser:de,version:pm,defaultOptions:$n,Position:Li,SourceLocation:yr,getLineInfo:Ac,Node:wr,TokenType:q,tokTypes:m,keywordTypes:Rn,TokContext:Je,tokContexts:re,isIdentifierChar:At,isIdentifierStart:at,Token:Bn,isNewLine:ei,lineBreak:Le,lineBreakG:Rf,nonASCIIwhitespace:Cc};function ru(e,t){return de.parse(e,t)}var ri=null,Pi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let n;return ri!==null?(n=ri,ri=ri.cursor,n.prev=t,n.next=i,n.cursor=this.cursor):n={prev:t,next:i,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=ri,ri=t}updateCursors(t,i,n,c){let{cursor:h}=this;for(;h!==null;)h.prev===t&&(h.prev=i),h.next===n&&(h.next=c),h=h.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let n of t){let c=e.createItem(n);i!==null?i.next=c:this.head=c,c.prev=i,i=c}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let c=n.next;n.next=c.next,t.call(i,c.data,c,this)}this.releaseCursor()}forEachRight(t,i=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let c=n.prev;n.prev=c.prev,t.call(i,c.data,c,this)}this.releaseCursor()}reduce(t,i,n=this){let c=this.allocateCursor(null,this.head),h=i,d;for(;c.next!==null;)d=c.next,c.next=d.next,h=t.call(n,h,d.data,d,this);return this.releaseCursor(),h}reduceRight(t,i,n=this){let c=this.allocateCursor(this.tail,null),h=i,d;for(;c.prev!==null;)d=c.prev,c.prev=d.prev,h=t.call(n,h,d.data,d,this);return this.releaseCursor(),h}some(t,i=this){for(let n=this.head;n!==null;n=n.next)if(t.call(i,n.data,n,this))return!0;return!1}map(t,i=this){let n=new e;for(let c=this.head;c!==null;c=c.next)n.appendData(t.call(i,c.data,c,this));return n}filter(t,i=this){let n=new e;for(let c=this.head;c!==null;c=c.next)t.call(i,c.data,c,this)&&n.appendData(c.data);return n}nextUntil(t,i,n=this){if(t===null)return;let c=this.allocateCursor(null,t);for(;c.next!==null;){let h=c.next;if(c.next=h.next,i.call(n,h.data,h,this))break}this.releaseCursor()}prevUntil(t,i,n=this){if(t===null)return;let c=this.allocateCursor(t,null);for(;c.prev!==null;){let h=c.prev;if(c.prev=h.prev,i.call(n,h.data,h,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function nu(e,t){let i=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var jn=100,au=60,su="    ";function ou({source:e,line:t,column:i,baseLine:n,baseColumn:c},h){function d(L,B){return b.slice(L,B).map((J,Y)=>String(L+Y+1).padStart(C)+" |"+J).join(`
`)}let g=`
`.repeat(Math.max(n-1,0)),x=" ".repeat(Math.max(c-1,0)),b=(g+x+e).split(/\r\n?|\n|\f/),v=Math.max(1,t-h)-1,S=Math.min(t+h,b.length+1),C=Math.max(4,String(S).length)+1,u=0;i+=(su.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>jn&&(u=i-au+3,i=au-2);for(let L=v;L<=S;L++)L>=0&&L<b.length&&(b[L]=b[L].replace(/\t/g,su),b[L]=(u>0&&b[L].length>u?"\u2026":"")+b[L].substr(u,jn-2)+(b[L].length>u+jn-1?"\u2026":""));return[d(v,t),new Array(i+C+2).join("-")+"^",d(t,S)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Un(e,t,i,n,c,h=1,d=1){return Object.assign(nu("SyntaxError",e),{source:t,offset:i,line:n,column:c,sourceFragment(x){return ou({source:t,line:n,column:c,baseLine:h,baseColumn:d},isNaN(x)?0:x)},get formattedMessage(){return`Parse error: ${e}
`+ou({source:t,line:n,column:c,baseLine:h,baseColumn:d},2)}})}function Ce(e){return e>=48&&e<=57}function ot(e){return Ce(e)||e>=65&&e<=70||e>=97&&e<=102}function Ar(e){return e>=65&&e<=90}function hm(e){return e>=97&&e<=122}function dm(e){return Ar(e)||hm(e)}function fm(e){return e>=128}function Er(e){return dm(e)||fm(e)||e===95}function Tr(e){return Er(e)||Ce(e)||e===45}function mm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function Ni(e){return e===10||e===13||e===12}function lt(e){return Ni(e)||e===32||e===9}function Ie(e,t){return!(e!==92||Ni(t)||t===0)}function _r(e,t,i){return e===45?Er(t)||t===45||Ie(t,i):Er(e)?!0:e===92?Ie(e,t):!1}function Lr(e,t,i){return e===43||e===45?Ce(t)?2:t===46&&Ce(i)?3:0:e===46?Ce(t)?2:0:Ce(e)?1:0}function Ir(e){return e===65279||e===65534?1:0}var Hn=new Array(128),gm=128,Ri=130,zn=131,$r=132,Wn=133;for(let e=0;e<Hn.length;e++)Hn[e]=lt(e)&&Ri||Ce(e)&&zn||Er(e)&&$r||mm(e)&&Wn||e||gm;function Pr(e){return e<128?Hn[e]:$r}function ni(e,t){return t<e.length?e.charCodeAt(t):0}function Nr(e,t,i){return i===13&&ni(e,t+1)===10?2:1}function qn(e,t,i){let n=e.charCodeAt(t);return Ar(n)&&(n=n|32),n===i}function Dt(e,t,i,n){if(i-t!==n.length||t<0||i>e.length)return!1;for(let c=t;c<i;c++){let h=n.charCodeAt(c-t),d=e.charCodeAt(c);if(Ar(d)&&(d=d|32),d!==h)return!1}return!0}function lu(e,t){for(;t>=0&&lt(e.charCodeAt(t));t--);return t+1}function Mi(e,t){for(;t<e.length&&lt(e.charCodeAt(t));t++);return t}function Gn(e,t){for(;t<e.length&&Ce(e.charCodeAt(t));t++);return t}function xt(e,t){if(t+=2,ot(ni(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&ot(ni(e,t));t++);let i=ni(e,t);lt(i)&&(t+=Nr(e,t,i))}return t}function Fi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!Tr(i)){if(Ie(i,ni(e,t+1))){t=xt(e,t)-1;continue}break}}return t}function Rr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),Ce(i)&&(t=Gn(e,t+1),i=e.charCodeAt(t)),i===46&&Ce(e.charCodeAt(t+1))&&(t+=2,t=Gn(e,t)),qn(e,t,101)){let n=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(n=1,i=e.charCodeAt(t+2)),Ce(i)&&(t=Gn(e,t+1+n+1))}return t}function Mr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Ie(i,ni(e,t+1))&&(t=xt(e,t))}return t}function Fr(e){if(e.length===1&&!ot(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var ai=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function si(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var cu=10,bm=12,uu=13;function pu(e){let t=e.source,i=t.length,n=t.length>0?Ir(t.charCodeAt(0)):0,c=si(e.lines,i),h=si(e.columns,i),d=e.startLine,g=e.startColumn;for(let x=n;x<i;x++){let b=t.charCodeAt(x);c[x]=d,h[x]=g++,(b===cu||b===uu||b===bm)&&(b===uu&&x+1<i&&t.charCodeAt(x+1)===cu&&(x++,c[x]=d,h[x]=g),d++,g=1)}c[i]=d,h[i]=g,e.lines=c,e.columns=h,e.computed=!0}var Or=class{constructor(t,i,n,c){this.setSource(t,i,n,c),this.lines=null,this.columns=null}setSource(t="",i=0,n=1,c=1){this.source=t,this.startOffset=i,this.startLine=n,this.startColumn=c,this.computed=!1}getLocation(t,i){return this.computed||pu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,n){return this.computed||pu(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var Xe=16777215,et=24,Di=1,Vr=2,_t=new Uint8Array(32);_t[2]=22;_t[21]=22;_t[19]=20;_t[23]=24;var tt=new Uint8Array(32);tt[2]=Di;tt[21]=Di;tt[19]=Di;tt[23]=Di;tt[22]=Vr;tt[20]=Vr;tt[24]=Vr;function hu(e,t,i){return e<t?t:e>i?i:e}var Dr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let n=t.length,c=si(this.offsetAndType,t.length+1),h=si(this.balance,t.length+1),d=0,g=-1,x=0,b=t.length;this.offsetAndType=null,this.balance=null,h.fill(0),i(t,(v,S,C)=>{let u=d++;if(c[u]=v<<et|C,g===-1&&(g=S),h[u]=b,v===x){let L=h[b];h[b]=u,b=L,x=_t[c[L]>>et]}else this.isBlockOpenerTokenType(v)&&(b=u,x=_t[v])}),c[d]=0<<et|n,h[d]=d;for(let v=0;v<d;v++){let S=h[v];if(S<=v){let C=h[S];C!==v&&(h[v]=C)}else S>d&&(h[v]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=c,this.balance=h,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>et:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>et;if(n!==13&&n!==25&&t--===0)return n}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Xe:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>et;if(n!==13&&n!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Dt(this.source,this.offsetAndType[t-1]&Xe,this.offsetAndType[t]&Xe,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Xe:this.offsetAndType[this.tokenCount]&Xe:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[hu(t,0,this.tokenCount)]&Xe}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[hu(t,0,this.tokenCount)]>>et}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return tt[t]===Di}isBlockCloserTokenType(t){return tt[t]===Vr}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(tt[i]===1){let n=this.balance[t],c=this.getTokenType(n);return _t[i]===c?n:-1}else if(tt[i]===2){let n=this.balance[t],c=this.getTokenType(n);return _t[c]===i?n:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&Xe,i=this.offsetAndType[i],this.tokenType=i>>et,this.tokenEnd=i&Xe):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>et,this.tokenEnd=t&Xe):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let n=t,c=0,h=0;e:for(;n<this.tokenCount;n++){if(c=this.balance[n],c<t)break e;switch(h=n>0?this.offsetAndType[n-1]&Xe:this.firstCharOffset,i(this.source.charCodeAt(h))){case 1:break e;case 2:n++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[n]>>et)&&(n=c)}}this.skip(n-this.tokenIndex)}forEachToken(t){for(let i=0,n=this.firstCharOffset;i<this.tokenCount;i++){let c=n,h=this.offsetAndType[i],d=h&Xe,g=h>>et;n=d,t(g,c,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,n,c,h)=>{t[h]={idx:h,type:ai[i],chunk:this.source.substring(n,c),balance:this.balance[h]}}),t}};function Br(e,t){function i(S){return S<g?e.charCodeAt(S):0}function n(){if(b=Rr(e,b),_r(i(b),i(b+1),i(b+2))){v=12,b=Fi(e,b);return}if(i(b)===37){v=11,b++;return}v=10}function c(){let S=b;if(b=Fi(e,b),Dt(e,S,b,"url")&&i(b)===40){if(b=Mi(e,b+1),i(b)===34||i(b)===39){v=2,b=S+4;return}d();return}if(i(b)===40){v=2,b++;return}v=1}function h(S){for(S||(S=i(b++)),v=5;b<e.length;b++){let C=e.charCodeAt(b);switch(Pr(C)){case S:b++;return;case Ri:if(Ni(C)){b+=Nr(e,b,C),v=6;return}break;case 92:if(b===e.length-1)break;let u=i(b+1);Ni(u)?b+=Nr(e,b+1,u):Ie(C,u)&&(b=xt(e,b)-1);break}}}function d(){for(v=7,b=Mi(e,b);b<e.length;b++){let S=e.charCodeAt(b);switch(Pr(S)){case 41:b++;return;case Ri:if(b=Mi(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Mr(e,b),v=8;return;case 34:case 39:case 40:case Wn:b=Mr(e,b),v=8;return;case 92:if(Ie(S,i(b+1))){b=xt(e,b)-1;break}b=Mr(e,b),v=8;return}}}e=String(e||"");let g=e.length,x=Ir(i(0)),b=x,v;for(;b<g;){let S=e.charCodeAt(b);switch(Pr(S)){case Ri:v=13,b=Mi(e,b+1);break;case 34:h();break;case 35:Tr(i(b+1))||Ie(i(b+1),i(b+2))?(v=4,b=Fi(e,b+1)):(v=9,b++);break;case 39:h();break;case 40:v=21,b++;break;case 41:v=22,b++;break;case 43:Lr(S,i(b+1),i(b+2))?n():(v=9,b++);break;case 44:v=18,b++;break;case 45:Lr(S,i(b+1),i(b+2))?n():i(b+1)===45&&i(b+2)===62?(v=15,b=b+3):_r(S,i(b+1),i(b+2))?c():(v=9,b++);break;case 46:Lr(S,i(b+1),i(b+2))?n():(v=9,b++);break;case 47:i(b+1)===42?(v=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(v=9,b++);break;case 58:v=16,b++;break;case 59:v=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(v=14,b=b+4):(v=9,b++);break;case 64:_r(i(b+1),i(b+2),i(b+3))?(v=3,b=Fi(e,b+1)):(v=9,b++);break;case 91:v=19,b++;break;case 92:Ie(S,i(b+1))?c():(v=9,b++);break;case 93:v=20,b++;break;case 123:v=23,b++;break;case 125:v=24,b++;break;case zn:n();break;case $r:c();break;default:v=9,b++}t(v,x,x=b)}}function du(e){let t=this.createList(),i=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let c=e.getNode.call(this,n);if(c===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,c,t,n),i=!1),t.push(c)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var ci=()=>{},xm=33,ym=35,Yn=59,fu=123,mu=0,vm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},km={createList(){return new Pi},createSingleNodeList(e){return new Pi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function Sm(e){return function(){return this[e]()}}function Qn(e){let t=Object.create(null);for(let i of Object.keys(e)){let n=e[i],c=n.parse||n;c&&(t[i]=c)}return t}function wm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Qn(e.atrule),pseudo:Qn(e.pseudo),node:Qn(e.node)};for(let[i,n]of Object.entries(e.parseContext))switch(typeof n){case"function":t.context[i]=n;break;case"string":t.context[i]=Sm(n);break}return{config:t,...t,...t.node}}function gu(e){let t="",i="<unknown>",n=!1,c=ci,h=!1,d=new Or,g=Object.assign(new Dr,wm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:du,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(v){return v===fu?1:0},consumeUntilLeftCurlyBracketOrSemicolon(v){return v===fu||v===Yn?1:0},consumeUntilExclamationMarkOrSemicolon(v){return v===xm||v===Yn?1:0},consumeUntilSemicolonIncluded(v){return v===Yn?2:0},createList:ci,createSingleNodeList:ci,getFirstListNode:ci,getLastListNode:ci,parseWithFallback(v,S){let C=this.tokenIndex;try{return v.call(this)}catch(u){if(h)throw u;this.skip(C-this.tokenIndex);let L=S.call(this);return h=!0,c(u,L),h=!1,L}},lookupNonWSType(v){let S;do if(S=this.lookupType(v++),S!==13&&S!==25)return S;while(S!==mu);return mu},charCodeAt(v){return v>=0&&v<t.length?t.charCodeAt(v):0},substring(v,S){return t.substring(v,S)},substrToCursor(v){return this.source.substring(v,this.tokenStart)},cmpChar(v,S){return qn(t,v,S)},cmpStr(v,S,C){return Dt(t,v,S,C)},consume(v){let S=this.tokenStart;return this.eat(v),this.substrToCursor(S)},consumeFunctionName(){let v=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),v},consumeNumber(v){let S=t.substring(this.tokenStart,Rr(t,this.tokenStart));return this.eat(v),S},eat(v){if(this.tokenType!==v){let S=ai[v].slice(0,-6).replace(/-/g," ").replace(/^./,L=>L.toUpperCase()),C=`${/[[\](){}]/.test(S)?`"${S}"`:S} is expected`,u=this.tokenStart;switch(v){case 1:this.tokenType===2||this.tokenType===7?(u=this.tokenEnd-1,C="Identifier is expected but function found"):C="Identifier is expected";break;case 4:this.isDelim(ym)&&(this.next(),u++,C="Name is expected");break;case 11:this.tokenType===10&&(u=this.tokenEnd,C="Percent sign is expected");break}this.error(C,u)}this.next()},eatIdent(v){(this.tokenType!==1||this.lookupValue(0,v)===!1)&&this.error(`Identifier "${v}" is expected`),this.next()},eatDelim(v){this.isDelim(v)||this.error(`Delim "${String.fromCharCode(v)}" is expected`),this.next()},getLocation(v,S){return n?d.getLocationRange(v,S,i):null},getLocationFromList(v){if(n){let S=this.getFirstListNode(v),C=this.getLastListNode(v);return d.getLocationRange(S!==null?S.loc.start.offset-d.startOffset:this.tokenStart,C!==null?C.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(v,S){let C=typeof S<"u"&&S<t.length?d.getLocation(S):this.eof?d.getLocation(lu(t,t.length-1)):d.getLocation(this.tokenStart);throw new Un(v||"Unexpected input",t,C.offset,C.line,C.column,d.startLine,d.startColumn)}}),x=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:v=>g.getTokenType(v),getTokenTypeName:v=>ai[g.getTokenType(v)],getTokenStart:v=>g.getTokenStart(v),getTokenEnd:v=>g.getTokenEnd(v),getTokenValue:v=>g.source.substring(g.getTokenStart(v),g.getTokenEnd(v)),substring:(v,S)=>g.source.substring(v,S),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:v=>g.getBlockTokenPairIndex(v),getLocation:v=>d.getLocation(v,i),getRangeLocation:(v,S)=>d.getLocationRange(v,S,i)});return Object.assign(function(v,S){t=v,S=S||{},g.setSource(t,Br),d.setSource(t,S.offset,S.line,S.column),i=S.filename||"<unknown>",n=!!S.positions,c=typeof S.onParseError=="function"?S.onParseError:ci,h=!1,g.parseAtrulePrelude="parseAtrulePrelude"in S?!!S.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in S?!!S.parseRulePrelude:!0,g.parseValue="parseValue"in S?!!S.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in S?!!S.parseCustomProperty:!1;let{context:C="default",list:u=!0,onComment:L,onToken:B}=S;if(!(C in g.context))throw new Error("Unknown context `"+C+"`");Object.assign(g,u?km:vm),Array.isArray(B)?g.forEachToken((Y,oe,Q)=>{B.push({type:Y,start:oe,end:Q})}):typeof B=="function"&&g.forEachToken(B.bind(x())),typeof L=="function"&&g.forEachToken((Y,oe,Q)=>{if(Y===25){let xe=g.getLocation(oe,Q),De=Dt(t,Q-2,Q,"*/")?t.slice(oe+2,Q-2):t.slice(oe+2,Q);L(De,xe)}});let J=g.context[C].call(g,S);return g.eof||g.error(),J},{SyntaxError:Un,config:g.config})}var Zn={};N(Zn,{AtrulePrelude:()=>xu,Selector:()=>vu,Value:()=>Cu});var Cm=35,Em=42,bu=43,Am=45,Tm=47,_m=117;function Vi(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,_m)&&this.cmpChar(this.tokenStart+1,bu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Tm||t===Em||t===bu||t===Am)return this.Operator();t===Cm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var xu={getNode:Vi};var Lm=35,Im=38,$m=42,Pm=43,Nm=47,yu=46,Rm=62,Mm=124,Fm=126;function Om(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Dm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===yu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case Pm:case Rm:case Fm:case Nm:return this.Combinator();case yu:return this.ClassSelector();case $m:case Mm:return this.TypeSelector();case Lm:return this.IdSelector();case Im:return this.NestingSelector()}break}}}var vu={onWhiteSpace:Om,getNode:Dm};function ku(){return this.createSingleNodeList(this.Raw(null,!1))}function Su(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function wu(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var Cu={getNode:Vi,onWhiteSpace(e,t){wu(e)&&(e.value=" "+e.value),wu(t.last)&&(t.last.value+=" ")},expression:ku,var:Su};var Vm=new Set(["none","and","not","or"]),Eu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);Vm.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var Au={parse:{prelude:null,block(){return this.Block(!0)}}};function Jn(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Tu={layer(){this.skipSC();let e=this.createList(),t=Jn.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Jn.call(this,this.Declaration,()=>Jn.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},_u={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Tu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Tu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Lu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var Iu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var $u={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Pu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Nu={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Ru={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Mu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Fu={container:Eu,"font-face":Au,import:_u,layer:Lu,media:Iu,nest:$u,page:Pu,scope:Nu,"starting-style":Ru,supports:Mu};function Ou(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Bt={parse(){return this.createSingleNodeList(this.SelectorList())}},Xn={parse(){return this.createSingleNodeList(this.Selector())}},Bm={parse(){return this.createSingleNodeList(this.Identifier())}},jm={parse:Ou},jr={parse(){return this.createSingleNodeList(this.Nth())}},Du={dir:Bm,has:Bt,lang:jm,matches:Bt,is:Bt,"-moz-any":Bt,"-webkit-any":Bt,where:Bt,not:Bt,"nth-child":jr,"nth-last-child":jr,"nth-last-of-type":jr,"nth-of-type":jr,slotted:Xn,host:Xn,"host-context":Xn};var Ko={};N(Ko,{AnPlusB:()=>ta,Atrule:()=>na,AtrulePrelude:()=>oa,AttributeSelector:()=>pa,Block:()=>fa,Brackets:()=>ba,CDC:()=>va,CDO:()=>wa,ClassSelector:()=>Aa,Combinator:()=>La,Comment:()=>Pa,Condition:()=>Ma,Declaration:()=>Da,DeclarationList:()=>Ua,Dimension:()=>Wa,Feature:()=>Ka,FeatureFunction:()=>Za,FeatureRange:()=>ts,Function:()=>ns,GeneralEnclosed:()=>os,Hash:()=>us,IdSelector:()=>gs,Identifier:()=>ds,Layer:()=>ys,LayerList:()=>Ss,MediaQuery:()=>Es,MediaQueryList:()=>_s,NestingSelector:()=>$s,Nth:()=>Rs,Number:()=>Os,Operator:()=>Bs,Parentheses:()=>Hs,Percentage:()=>Gs,PseudoClassSelector:()=>Ys,PseudoElementSelector:()=>Js,Ratio:()=>to,Raw:()=>no,Rule:()=>oo,Scope:()=>uo,Selector:()=>fo,SelectorList:()=>bo,String:()=>ko,StyleSheet:()=>Co,SupportsDeclaration:()=>To,TypeSelector:()=>$o,UnicodeRange:()=>Mo,Url:()=>Vo,Value:()=>Uo,WhiteSpace:()=>Wo});var ra={};N(ra,{generate:()=>ia,name:()=>Hm,parse:()=>ta,structure:()=>zm});var pt=43,Oe=45,Ur=110,jt=!0,Um=!1;function Hr(e,t){let i=this.tokenStart+e,n=this.charCodeAt(i);for((n===pt||n===Oe)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)Ce(this.charCodeAt(i))||this.error("Integer is expected",i)}function ui(e){return Hr.call(this,0,e)}function It(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Ur:i="N is expected";break;case Oe:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function ea(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(pt,e)||this.isDelim(Oe,e)){t=this.isDelim(pt,e)?pt:Oe;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),ui.call(this,jt))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==pt&&i!==Oe&&this.error("Number sign is expected")),ui.call(this,t!==0),t===Oe?"-"+this.consume(10):this.consume(10)}var Hm="AnPlusB",zm={a:[String,null],b:[String,null]};function ta(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)ui.call(this,Um),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,Oe))switch(t="-1",It.call(this,1,Ur),this.tokenEnd-this.tokenStart){case 2:this.next(),i=ea.call(this);break;case 3:It.call(this,2,Oe),this.next(),this.skipSC(),ui.call(this,jt),i="-"+this.consume(10);break;default:It.call(this,2,Oe),Hr.call(this,3,jt),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(pt)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(pt)&&(n=1,this.next()),It.call(this,0,Ur),this.tokenEnd-this.tokenStart){case 1:this.next(),i=ea.call(this);break;case 2:It.call(this,1,Oe),this.next(),this.skipSC(),ui.call(this,jt),i="-"+this.consume(10);break;default:It.call(this,1,Oe),Hr.call(this,2,jt),this.next(),i=this.substrToCursor(e+n+1)}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),c=n===pt||n===Oe,h=this.tokenStart+c;for(;h<this.tokenEnd&&Ce(this.charCodeAt(h));h++);h===this.tokenStart+c&&this.error("Integer is expected",this.tokenStart+c),It.call(this,h-this.tokenStart,Ur),t=this.substring(e,h),h+1===this.tokenEnd?(this.next(),i=ea.call(this)):(It.call(this,h-this.tokenStart+1,Oe),h+2===this.tokenEnd?(this.next(),this.skipSC(),ui.call(this,jt),i="-"+this.consume(10)):(Hr.call(this,h-this.tokenStart+2,jt),this.next(),i=this.substrToCursor(h+1)))}else this.error();return t!==null&&t.charCodeAt(0)===pt&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===pt&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function ia(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var sa={};N(sa,{generate:()=>aa,name:()=>Gm,parse:()=>na,structure:()=>Km,walkContext:()=>qm});function Vu(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Wm(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Gm="Atrule",qm="atrule",Km={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function na(e=!1){let t=this.tokenStart,i,n,c=null,h=null;switch(this.eat(3),i=this.substrToCursor(t+1),n=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?c=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Vu):c=Vu.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?h=this.atrule[n].block.call(this,e):h=this.Block(Wm.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:c,block:h}}function aa(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var ca={};N(ca,{generate:()=>la,name:()=>Ym,parse:()=>oa,structure:()=>Zm,walkContext:()=>Qm});var Ym="AtrulePrelude",Qm="atrulePrelude",Zm={children:[[]]};function oa(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function la(e){this.children(e)}var da={};N(da,{generate:()=>ha,name:()=>rg,parse:()=>pa,structure:()=>ng});var Jm=36,Bu=42,zr=61,Xm=94,ua=124,eg=126;function tg(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Bu)?(t=!0,this.next()):this.isDelim(ua)||this.eat(1),this.isDelim(ua)?this.charCodeAt(this.tokenStart+1)!==zr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function ig(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==zr&&t!==eg&&t!==Xm&&t!==Jm&&t!==Bu&&t!==ua&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==zr&&(this.isDelim(zr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var rg="AttributeSelector",ng={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function pa(){let e=this.tokenStart,t,i=null,n=null,c=null;return this.eat(19),this.skipSC(),t=tg.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=ig.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(c=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:n,flags:c}}function ha(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var ga={};N(ga,{generate:()=>ma,name:()=>og,parse:()=>fa,structure:()=>cg,walkContext:()=>lg});var ag=38;function Hu(){return this.Raw(null,!0)}function ju(){return this.parseWithFallback(this.Rule,Hu)}function Uu(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function sg(){if(this.tokenType===17)return Uu.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Uu);return this.tokenType===17&&this.next(),e}var og="Block",lg="block",cg={children:[["Atrule","Rule","Declaration"]]};function fa(e){let t=e?sg:ju,i=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),Hu));break;default:e&&this.isDelim(ag)?n.push(ju.call(this)):n.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:n}}function ma(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var ya={};N(ya,{generate:()=>xa,name:()=>ug,parse:()=>ba,structure:()=>pg});var ug="Brackets",pg={children:[[]]};function ba(e,t){let i=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:n}}function xa(e){this.token(9,"["),this.children(e),this.token(9,"]")}var Sa={};N(Sa,{generate:()=>ka,name:()=>hg,parse:()=>va,structure:()=>dg});var hg="CDC",dg=[];function va(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function ka(){this.token(15,"-->")}var Ea={};N(Ea,{generate:()=>Ca,name:()=>fg,parse:()=>wa,structure:()=>mg});var fg="CDO",mg=[];function wa(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function Ca(){this.token(14,"<!--")}var _a={};N(_a,{generate:()=>Ta,name:()=>bg,parse:()=>Aa,structure:()=>xg});var gg=46,bg="ClassSelector",xg={name:String};function Aa(){return this.eatDelim(gg),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function Ta(e){this.token(9,"."),this.token(1,e.name)}var $a={};N($a,{generate:()=>Ia,name:()=>Sg,parse:()=>La,structure:()=>wg});var yg=43,zu=47,vg=62,kg=126,Sg="Combinator",wg={name:String};function La(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case vg:case yg:case kg:this.next();break;case zu:this.next(),this.eatIdent("deep"),this.eatDelim(zu);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function Ia(e){this.tokenize(e.name)}var Ra={};N(Ra,{generate:()=>Na,name:()=>Ag,parse:()=>Pa,structure:()=>Tg});var Cg=42,Eg=47,Ag="Comment",Tg={value:String};function Pa(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===Cg&&this.charCodeAt(t-1)===Eg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function Na(e){this.token(25,"/*"+e.value+"*/")}var Oa={};N(Oa,{generate:()=>Fa,name:()=>Lg,parse:()=>Ma,structure:()=>Ig});var _g=new Set([16,22,0]),Lg="Condition",Ig={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Wu(e){return this.lookupTypeNonSC(1)===1&&_g.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var $g={media:Wu,container:Wu,supports(){return this.SupportsDeclaration()}};function Ma(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>$g[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let n=this.Condition(e);return this.eat(22),n},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function Fa(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var Ba={};N(Ba,{generate:()=>Va,name:()=>Bg,parse:()=>Da,structure:()=>Ug,walkContext:()=>jg});var Gu=45;function qu(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Gu&&e.charCodeAt(t+1)===Gu}var Yu=33,Pg=35,Ng=36,Rg=38,Mg=42,Fg=43,Ku=47;function Og(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Dg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Vg(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Yu)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Bg="Declaration",jg="declaration",Ug={important:[Boolean,String],property:String,value:["Value","Raw"]};function Da(){let e=this.tokenStart,t=this.tokenIndex,i=Hg.call(this),n=qu(i),c=n?this.parseCustomProperty:this.parseValue,h=n?Dg:Og,d=!1,g;this.skipSC(),this.eat(16);let x=this.tokenIndex;if(n||this.skipSC(),c?g=this.parseWithFallback(Vg,h):g=h.call(this,this.tokenIndex),n&&g.type==="Value"&&g.children.isEmpty){for(let b=x-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Yu)&&(d=zg.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function Va(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function Hg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Mg:case Ng:case Fg:case Pg:case Rg:this.next();break;case Ku:this.next(),this.isDelim(Ku)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function zg(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var za={};N(za,{generate:()=>Ha,name:()=>Gg,parse:()=>Ua,structure:()=>qg});var Wg=38;function ja(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var Gg="DeclarationList",qg={children:[["Declaration","Atrule","Rule"]]};function Ua(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),ja));break;default:this.isDelim(Wg)?e.push(this.parseWithFallback(this.Rule,ja)):e.push(this.parseWithFallback(this.Declaration,ja))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function Ha(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var qa={};N(qa,{generate:()=>Ga,name:()=>Kg,parse:()=>Wa,structure:()=>Yg});var Kg="Dimension",Yg={value:String,unit:String};function Wa(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Ga(e){this.token(12,e.value+e.unit)}var Qa={};N(Qa,{generate:()=>Ya,name:()=>Zg,parse:()=>Ka,structure:()=>Jg});var Qg=47,Zg="Feature",Jg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function Ka(e){let t=this.tokenStart,i,n=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?n=this.Ratio():n=this.Number();break;case 12:n=this.Dimension();break;case 1:n=this.Identifier();break;case 2:n=this.parseWithFallback(()=>{let c=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Qg)&&this.error(),c},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:n}}function Ya(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var Xa={};N(Xa,{generate:()=>Ja,name:()=>Xg,parse:()=>Za,structure:()=>e0});var Xg="FeatureFunction",e0={kind:String,feature:String,value:["Declaration","Selector"]};function t0(e,t){let n=(this.features[e]||{})[t];return typeof n!="function"&&this.error(`Unknown feature ${t}()`),n}function Za(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),n=t0.call(this,e,i.toLowerCase());this.skipSC();let c=this.parseWithFallback(()=>{let h=this.tokenIndex,d=n.call(this);return this.eof===!1&&this.isBalanceEdge(h)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:c}}function Ja(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var rs={};N(rs,{generate:()=>is,name:()=>n0,parse:()=>ts,structure:()=>a0});var Qu=47,i0=60,Zu=61,r0=62,n0="FeatureRange",a0={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function es(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(Qu,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Qu)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Ju(e){if(this.skipSC(),this.isDelim(i0)||this.isDelim(r0)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(Zu)?(this.next(),t+"="):t}if(this.isDelim(Zu))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function ts(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=es.call(this),n=Ju.call(this,i.type==="Identifier"),c=es.call(this),h=null,d=null;return this.lookupNonWSType(0)!==22&&(h=Ju.call(this),d=es.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:n,middle:c,rightComparison:h,right:d}}function is(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var ss={};N(ss,{generate:()=>as,name:()=>s0,parse:()=>ns,structure:()=>l0,walkContext:()=>o0});var s0="Function",o0="function",l0={name:String,children:[[]]};function ns(e,t){let i=this.tokenStart,n=this.consumeFunctionName(),c=n.toLowerCase(),h;return h=t.hasOwnProperty(c)?t[c].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:n,children:h}}function as(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var cs={};N(cs,{generate:()=>ls,name:()=>c0,parse:()=>os,structure:()=>u0});var c0="GeneralEnclosed",u0={kind:String,function:[String,null],children:[[]]};function os(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let n=this.parseWithFallback(()=>{let c=this.tokenIndex,h=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(c)===!1&&this.error(),h},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:n}}function ls(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var hs={};N(hs,{generate:()=>ps,name:()=>h0,parse:()=>us,structure:()=>d0,xxx:()=>p0});var p0="XXX",h0="Hash",d0={value:String};function us(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function ps(e){this.token(4,"#"+e.value)}var ms={};N(ms,{generate:()=>fs,name:()=>f0,parse:()=>ds,structure:()=>m0});var f0="Identifier",m0={name:String};function ds(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function fs(e){this.token(1,e.name)}var xs={};N(xs,{generate:()=>bs,name:()=>g0,parse:()=>gs,structure:()=>b0});var g0="IdSelector",b0={name:String};function gs(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function bs(e){this.token(9,"#"+e.name)}var ks={};N(ks,{generate:()=>vs,name:()=>y0,parse:()=>ys,structure:()=>v0});var x0=46,y0="Layer",v0={name:String};function ys(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(x0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function vs(e){this.tokenize(e.name)}var Cs={};N(Cs,{generate:()=>ws,name:()=>k0,parse:()=>Ss,structure:()=>S0});var k0="LayerList",S0={children:[["Layer"]]};function Ss(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function ws(e){this.children(e,()=>this.token(18,","))}var Ts={};N(Ts,{generate:()=>As,name:()=>w0,parse:()=>Es,structure:()=>C0});var w0="MediaQuery",C0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function Es(){let e=this.tokenStart,t=null,i=null,n=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let c=this.consume(1),h=c.toLowerCase();switch(h==="not"||h==="only"?(this.skipSC(),t=h,i=this.consume(1)):i=c,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),n=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{n=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:n}}function As(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Is={};N(Is,{generate:()=>Ls,name:()=>E0,parse:()=>_s,structure:()=>A0});var E0="MediaQueryList",A0={children:[["MediaQuery"]]};function _s(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function Ls(e){this.children(e,()=>this.token(18,","))}var Ns={};N(Ns,{generate:()=>Ps,name:()=>_0,parse:()=>$s,structure:()=>L0});var T0=38,_0="NestingSelector",L0={};function $s(){let e=this.tokenStart;return this.eatDelim(T0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function Ps(){this.token(9,"&")}var Fs={};N(Fs,{generate:()=>Ms,name:()=>I0,parse:()=>Rs,structure:()=>$0});var I0="Nth",$0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Rs(){this.skipSC();let e=this.tokenStart,t=e,i=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:i}}function Ms(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Vs={};N(Vs,{generate:()=>Ds,name:()=>P0,parse:()=>Os,structure:()=>N0});var P0="Number",N0={value:String};function Os(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function Ds(e){this.token(10,e.value)}var Us={};N(Us,{generate:()=>js,name:()=>R0,parse:()=>Bs,structure:()=>M0});var R0="Operator",M0={value:String};function Bs(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function js(e){this.tokenize(e.value)}var Ws={};N(Ws,{generate:()=>zs,name:()=>F0,parse:()=>Hs,structure:()=>O0});var F0="Parentheses",O0={children:[[]]};function Hs(e,t){let i=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:n}}function zs(e){this.token(21,"("),this.children(e),this.token(22,")")}var Ks={};N(Ks,{generate:()=>qs,name:()=>D0,parse:()=>Gs,structure:()=>V0});var D0="Percentage",V0={value:String};function Gs(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function qs(e){this.token(11,e.value+"%")}var Zs={};N(Zs,{generate:()=>Qs,name:()=>B0,parse:()=>Ys,structure:()=>U0,walkContext:()=>j0});var B0="PseudoClassSelector",j0="function",U0={name:String,children:[["Raw"],null]};function Ys(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Qs(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var eo={};N(eo,{generate:()=>Xs,name:()=>H0,parse:()=>Js,structure:()=>W0,walkContext:()=>z0});var H0="PseudoElementSelector",z0="function",W0={name:String,children:[["Raw"],null]};function Js(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Xs(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var ro={};N(ro,{generate:()=>io,name:()=>G0,parse:()=>to,structure:()=>q0});var Xu=47;function ep(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var G0="Ratio",q0={left:["Number","Function"],right:["Number","Function",null]};function to(){let e=this.tokenStart,t=ep.call(this),i=null;return this.skipSC(),this.isDelim(Xu)&&(this.eatDelim(Xu),i=ep.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function io(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var so={};N(so,{generate:()=>ao,name:()=>Y0,parse:()=>no,structure:()=>Q0});function K0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var Y0="Raw",Q0={value:String};function no(e,t){let i=this.getTokenStart(this.tokenIndex),n;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?n=K0.call(this):n=this.tokenStart,{type:"Raw",loc:this.getLocation(i,n),value:this.substring(i,n)}}function ao(e){this.tokenize(e.value)}var co={};N(co,{generate:()=>lo,name:()=>J0,parse:()=>oo,structure:()=>eb,walkContext:()=>X0});function tp(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function Z0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var J0="Rule",X0="rule",eb={prelude:["SelectorList","Raw"],block:["Block"]};function oo(){let e=this.tokenIndex,t=this.tokenStart,i,n;return this.parseRulePrelude?i=this.parseWithFallback(Z0,tp):i=tp.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:n}}function lo(e){this.node(e.prelude),this.node(e.block)}var ho={};N(ho,{generate:()=>po,name:()=>tb,parse:()=>uo,structure:()=>ib});var tb="Scope",ib={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function uo(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function po(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var go={};N(go,{generate:()=>mo,name:()=>rb,parse:()=>fo,structure:()=>nb});var rb="Selector",nb={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function fo(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function mo(e){this.children(e)}var yo={};N(yo,{generate:()=>xo,name:()=>ab,parse:()=>bo,structure:()=>ob,walkContext:()=>sb});var ab="SelectorList",sb="selector",ob={children:[["Selector","Raw"]]};function bo(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function xo(e){this.children(e,()=>this.token(18,","))}var wo={};N(wo,{generate:()=>So,name:()=>cb,parse:()=>ko,structure:()=>ub});var vo=92,ip=34,rp=39;function Wr(e){let t=e.length,i=e.charCodeAt(0),n=i===ip||i===rp?1:0,c=n===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,h="";for(let d=n;d<=c;d++){let g=e.charCodeAt(d);if(g===vo){if(d===c){d!==t-1&&(h=e.substr(d+1));break}if(g=e.charCodeAt(++d),Ie(vo,g)){let x=d-1,b=xt(e,x);d=b-1,h+=Fr(e.substring(x+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else h+=e[d]}return h}function np(e,t){let i=t?"'":'"',n=t?rp:ip,c="",h=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){c+="\uFFFD";continue}if(g<=31||g===127){c+="\\"+g.toString(16),h=!0;continue}g===n||g===vo?(c+="\\"+e.charAt(d),h=!1):(h&&(ot(g)||lt(g))&&(c+=" "),c+=e.charAt(d),h=!1)}return i+c+i}var cb="String",ub={value:String};function ko(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Wr(this.consume(5))}}function So(e){this.token(5,np(e.value))}var Ao={};N(Ao,{generate:()=>Eo,name:()=>hb,parse:()=>Co,structure:()=>fb,walkContext:()=>db});var pb=33;function ap(){return this.Raw(null,!1)}var hb="StyleSheet",db="stylesheet",fb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function Co(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==pb){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,ap);break;default:i=this.parseWithFallback(this.Rule,ap)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function Eo(e){this.children(e)}var Lo={};N(Lo,{generate:()=>_o,name:()=>mb,parse:()=>To,structure:()=>gb});var mb="SupportsDeclaration",gb={declaration:"Declaration"};function To(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function _o(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var No={};N(No,{generate:()=>Po,name:()=>xb,parse:()=>$o,structure:()=>yb});var bb=42,sp=124;function Io(){this.tokenType!==1&&this.isDelim(bb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var xb="TypeSelector",yb={name:String};function $o(){let e=this.tokenStart;return this.isDelim(sp)?(this.next(),Io.call(this)):(Io.call(this),this.isDelim(sp)&&(this.next(),Io.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Po(e){this.tokenize(e.name)}var Oo={};N(Oo,{generate:()=>Fo,name:()=>Sb,parse:()=>Mo,structure:()=>wb});var op=43,lp=45,Ro=63;function Bi(e,t){let i=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let c=this.charCodeAt(n);if(c===lp&&t&&i!==0)return Bi.call(this,e+i+1,!1),-1;ot(c)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",n),++i>6&&this.error("Too many hex digits",n)}return this.next(),i}function Gr(e){let t=0;for(;this.isDelim(Ro);)++t>e&&this.error("Too many question marks"),this.next()}function vb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===op?"Plus sign":"Hyphen minus")+" is expected")}function kb(){let e=0;switch(this.tokenType){case 10:if(e=Bi.call(this,1,!0),this.isDelim(Ro)){Gr.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){vb.call(this,lp),Bi.call(this,1,!1);break}break;case 12:e=Bi.call(this,1,!0),e>0&&Gr.call(this,6-e);break;default:if(this.eatDelim(op),this.tokenType===1){e=Bi.call(this,0,!0),e>0&&Gr.call(this,6-e);break}if(this.isDelim(Ro)){this.next(),Gr.call(this,5);break}this.error("Hex digit or question mark is expected")}}var Sb="UnicodeRange",wb={value:String};function Mo(){let e=this.tokenStart;return this.eatIdent("u"),kb.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Fo(e){this.tokenize(e.value)}var jo={};N(jo,{generate:()=>Bo,name:()=>Lb,parse:()=>Vo,structure:()=>Ib});var Cb=32,Do=92,Eb=34,Ab=39,Tb=40,cp=41;function up(e){let t=e.length,i=4,n=e.charCodeAt(t-1)===cp?t-2:t-1,c="";for(;i<n&&lt(e.charCodeAt(i));)i++;for(;i<n&&lt(e.charCodeAt(n));)n--;for(let h=i;h<=n;h++){let d=e.charCodeAt(h);if(d===Do){if(h===n){h!==t-1&&(c=e.substr(h+1));break}if(d=e.charCodeAt(++h),Ie(Do,d)){let g=h-1,x=xt(e,g);h=x-1,c+=Fr(e.substring(g+1,x))}else d===13&&e.charCodeAt(h+1)===10&&h++}else c+=e[h]}return c}function pp(e){let t="",i=!1;for(let n=0;n<e.length;n++){let c=e.charCodeAt(n);if(c===0){t+="\uFFFD";continue}if(c<=31||c===127){t+="\\"+c.toString(16),i=!0;continue}c===Cb||c===Do||c===Eb||c===Ab||c===Tb||c===cp?(t+="\\"+e.charAt(n),i=!1):(i&&ot(c)&&(t+=" "),t+=e.charAt(n),i=!1)}return"url("+t+")"}var Lb="Url",Ib={value:String};function Vo(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=up(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Wr(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function Bo(e){this.token(7,pp(e.value))}var zo={};N(zo,{generate:()=>Ho,name:()=>$b,parse:()=>Uo,structure:()=>Pb});var $b="Value",Pb={children:[[]]};function Uo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function Ho(e){this.children(e)}var qo={};N(qo,{generate:()=>Go,name:()=>Rb,parse:()=>Wo,structure:()=>Mb});var Nb=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Rb="WhiteSpace",Mb={value:String};function Wo(){return this.eat(13),Nb}function Go(e){this.token(13,e.value)}var hp={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Zn,atrule:Fu,pseudo:Du,node:Ko};var dp=gu(hp);var{hasOwnProperty:Yo}=Object.prototype,ji=function(){};function fp(e){return typeof e=="function"?e:ji}function mp(e,t){return function(i,n,c){i.type===t&&e.call(this,i,n,c)}}function Fb(e,t){let i=t.structure,n=[];for(let c in i){if(Yo.call(i,c)===!1)continue;let h=i[c],d={name:c,type:!1,nullable:!1};Array.isArray(h)||(h=[h]);for(let g of h)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&n.push(d)}return n.length?{context:t.walkContext,fields:n}:null}function Ob(e){let t={};for(let i in e.node)if(Yo.call(e.node,i)){let n=e.node[i];if(!n.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Fb(i,n)}return t}function gp(e,t){let i=e.fields.slice(),n=e.context,c=typeof n=="string";return t&&i.reverse(),function(h,d,g,x){let b;c&&(b=d[n],d[n]=h);for(let v of i){let S=h[v.name];if(!v.nullable||S){if(v.type==="list"){if(t?S.reduceRight(x,!1):S.reduce(x,!1))return!0}else if(g(S))return!0}}c&&(d[n]=b)}}function bp({StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:c}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:c}}}function xp(e){let t=Ob(e),i={},n={},c=Symbol("break-walk"),h=Symbol("skip-node");for(let b in t)Yo.call(t,b)&&t[b]!==null&&(i[b]=gp(t[b],!1),n[b]=gp(t[b],!0));let d=bp(i),g=bp(n),x=function(b,v){function S(Y,oe,Q){let xe=C.call(J,Y,oe,Q);return xe===c?!0:xe===h?!1:!!(L.hasOwnProperty(Y.type)&&L[Y.type](Y,J,S,B)||u.call(J,Y,oe,Q)===c)}let C=ji,u=ji,L=i,B=(Y,oe,Q,xe)=>Y||S(oe,Q,xe),J={break:c,skip:h,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof v=="function")C=v;else if(v&&(C=fp(v.enter),u=fp(v.leave),v.reverse&&(L=n),v.visit)){if(d.hasOwnProperty(v.visit))L=v.reverse?g[v.visit]:d[v.visit];else if(!t.hasOwnProperty(v.visit))throw new Error("Bad value `"+v.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");C=mp(C,v.visit),u=mp(u,v.visit)}if(C===ji&&u===ji)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");S(b)};return x.break=c,x.skip=h,x.find=function(b,v){let S=null;return x(b,function(C,u,L){if(v.call(this,C,u,L))return S=C,c}),S},x.findLast=function(b,v){let S=null;return x(b,{reverse:!0,enter(C,u,L){if(v.call(this,C,u,L))return S=C,c}}),S},x.findAll=function(b,v){let S=[];return x(b,function(C,u,L){v.call(this,C,u,L)&&S.push(C)}),S},x}var Qo={};N(Qo,{AnPlusB:()=>ra,Atrule:()=>sa,AtrulePrelude:()=>ca,AttributeSelector:()=>da,Block:()=>ga,Brackets:()=>ya,CDC:()=>Sa,CDO:()=>Ea,ClassSelector:()=>_a,Combinator:()=>$a,Comment:()=>Ra,Condition:()=>Oa,Declaration:()=>Ba,DeclarationList:()=>za,Dimension:()=>qa,Feature:()=>Qa,FeatureFunction:()=>Xa,FeatureRange:()=>rs,Function:()=>ss,GeneralEnclosed:()=>cs,Hash:()=>hs,IdSelector:()=>xs,Identifier:()=>ms,Layer:()=>ks,LayerList:()=>Cs,MediaQuery:()=>Ts,MediaQueryList:()=>Is,NestingSelector:()=>Ns,Nth:()=>Fs,Number:()=>Vs,Operator:()=>Us,Parentheses:()=>Ws,Percentage:()=>Ks,PseudoClassSelector:()=>Zs,PseudoElementSelector:()=>eo,Ratio:()=>ro,Raw:()=>so,Rule:()=>co,Scope:()=>ho,Selector:()=>go,SelectorList:()=>yo,String:()=>wo,StyleSheet:()=>Ao,SupportsDeclaration:()=>Lo,TypeSelector:()=>No,UnicodeRange:()=>Oo,Url:()=>jo,Value:()=>zo,WhiteSpace:()=>qo});var yp={node:Qo};var vp=xp(yp);var jp=_f(Vp(),1),Bp=new Set(["Atrule","Selector","Declaration"]);function Up(e){let t=new jp.SourceMapGenerator,i={line:1,column:0},n={line:0,column:0},c={line:1,column:0},h={generated:c},d=1,g=0,x=!1,b=e.node;e.node=function(C){if(C.loc&&C.loc.start&&Bp.has(C.type)){let u=C.loc.start.line,L=C.loc.start.column-1;(n.line!==u||n.column!==L)&&(n.line=u,n.column=L,i.line=d,i.column=g,x&&(x=!1,(i.line!==c.line||i.column!==c.column)&&t.addMapping(h)),x=!0,t.addMapping({source:C.loc.source,original:n,generated:i}))}b.call(this,C),x&&Bp.has(C.type)&&(c.line=d,c.column=g)};let v=e.emit;e.emit=function(C,u,L){for(let B=0;B<C.length;B++)C.charCodeAt(B)===10?(d++,g=0):g++;v(C,u,L)};let S=e.result;return e.result=function(){return x&&t.addMapping(h),{css:S(),map:t}},e}var Qr={};N(Qr,{safe:()=>nl,spec:()=>ax});var ix=43,rx=45,rl=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Hp=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],nx=Hp.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function zp(e){let t=new Set(e.map(([i,n])=>rl(i)<<16|rl(n)));return function(i,n,c){let h=rl(n,c),d=c.charCodeAt(0),g=d===rx&&n!==1&&n!==2&&n!==15||d===ix?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|h);return h|g}}var ax=zp(Hp),nl=zp(nx);var sx=92;function ox(e,t){if(typeof t=="function"){let i=null;e.children.forEach(n=>{i!==null&&t.call(this,i),this.node(n),i=n});return}e.children.forEach(this.node,this)}function Wp(e){let t=new Map;for(let[i,n]of Object.entries(e.node))typeof(n.generate||n)=="function"&&t.set(i,n.generate||n);return function(i,n){let c="",h=0,d={node(x){if(t.has(x.type))t.get(x.type).call(g,x);else throw new Error("Unknown node type: "+x.type)},tokenBefore:nl,token(x,b,v){h=this.tokenBefore(h,x,b),!v&&h&1&&this.emit(" ",13,!0),this.emit(b,x,!1),x===9&&b.charCodeAt(0)===sx&&this.emit(`
`,13,!0)},emit(x){c+=x},result(){return c}};n&&(typeof n.decorator=="function"&&(d=n.decorator(d)),n.sourceMap&&(d=Up(d)),n.mode in Qr&&(d.tokenBefore=Qr[n.mode]));let g={node:x=>d.node(x),children:ox,token:(x,b)=>d.token(x,b),tokenize:x=>Br(x,(b,v,S)=>{d.token(b,x.slice(v,S),v!==0)})};return d.node(i),d.result()}}var al={};N(al,{AnPlusB:()=>ia,Atrule:()=>aa,AtrulePrelude:()=>la,AttributeSelector:()=>ha,Block:()=>ma,Brackets:()=>xa,CDC:()=>ka,CDO:()=>Ca,ClassSelector:()=>Ta,Combinator:()=>Ia,Comment:()=>Na,Condition:()=>Fa,Declaration:()=>Va,DeclarationList:()=>Ha,Dimension:()=>Ga,Feature:()=>Ya,FeatureFunction:()=>Ja,FeatureRange:()=>is,Function:()=>as,GeneralEnclosed:()=>ls,Hash:()=>ps,IdSelector:()=>bs,Identifier:()=>fs,Layer:()=>vs,LayerList:()=>ws,MediaQuery:()=>As,MediaQueryList:()=>Ls,NestingSelector:()=>Ps,Nth:()=>Ms,Number:()=>Ds,Operator:()=>js,Parentheses:()=>zs,Percentage:()=>qs,PseudoClassSelector:()=>Qs,PseudoElementSelector:()=>Xs,Ratio:()=>io,Raw:()=>ao,Rule:()=>lo,Scope:()=>po,Selector:()=>mo,SelectorList:()=>xo,String:()=>So,StyleSheet:()=>Eo,SupportsDeclaration:()=>_o,TypeSelector:()=>Po,UnicodeRange:()=>Fo,Url:()=>Bo,Value:()=>Ho,WhiteSpace:()=>Go});var Gp={node:al};var sl=Wp(Gp);var zi="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),lx=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),Kp=new Set(["__proto__","prototype","constructor"]);function Zr(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(n=>Zr(n,t)):i&&typeof i=="object"&&Zr(i,t)}}function hi(e){return e?e.computed?e.property?.value:e.property?.name:""}function di(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!di(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=di(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(di);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let n=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||Kp.has(String(n)))throw new Error("Property static tidak aman");t[n]=di(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function qp(e,t){let i=null;return Zr(e,n=>{if(i)return;let c=n.type==="VariableDeclarator"&&n.id.name===t,h=n.type==="AssignmentExpression"&&n.left.type==="MemberExpression"&&["window","globalThis"].includes(n.left.object.name)&&hi(n.left)===t;if(c||h)try{i=di(c?n.init:n.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function cx(e){let t=new WeakMap,i=(c,h,d=null)=>{c&&(c.type==="Identifier"?h.bindings.set(c.name,d):c.type==="RestElement"?i(c.argument,h):c.type==="AssignmentPattern"?i(c.left,h):c.type==="ArrayPattern"?c.elements.forEach(g=>i(g,h)):c.type==="ObjectPattern"&&c.properties.forEach(g=>i(g.value||g.argument,h)))},n=(c,h)=>{if(!c||typeof c!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(c.type);c.type==="FunctionDeclaration"&&i(c.id,h);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(c.type),x=g?{parent:h,bindings:new Map,functionScope:null}:h;g&&(x.functionScope=d||c.type==="Program"?x:h.functionScope),t.set(c,x),d&&(c.id&&i(c.id,x),c.params.forEach(b=>i(b,x))),c.type==="CatchClause"&&i(c.param,x),c.type==="VariableDeclaration"&&c.declarations.forEach(b=>i(b.id,c.kind==="var"?x.functionScope:x,b.init));for(let b of Object.values(c))Array.isArray(b)?b.forEach(v=>n(v,x)):b&&typeof b=="object"&&n(b,x)};return n(e,null),t}function ux(e){let t=[],i=cx(e),n=(g,x=new Set)=>{if(g?.type!=="Identifier"||x.has(g))return g;x.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return n(b.bindings.get(g.name),x);return g},c=g=>(g=n(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&hi(g)==="document"),h=g=>(g=n(g),g?.type==="MemberExpression"?c(g.object)&&hi(g)==="body":g?.type==="CallExpression"&&c(g.callee.object)&&hi(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=n(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||hi(g.callee)==="MutationObserver"));return Zr(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||hi(g.callee)!=="observe"||!d(g.callee.object)||!h(g.arguments[0]))return;let x;try{x=di(n(g.arguments[1]))}catch{}let b=x?.attributes??(x?.attributeFilter!==void 0||x?.attributeOldValue!==void 0);(!x||b&&(!Array.isArray(x.attributeFilter)||x.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function Yp(e){let t=[...e.children],i=t.slice(t.findLastIndex(n=>n.type==="Combinator")+1);return i.some(n=>n.type==="PseudoElementSelector")?[]:i.flatMap(n=>n.type==="TypeSelector"&&["html","body"].includes(n.name.toLowerCase())?[n.name.toLowerCase()]:n.type==="PseudoClassSelector"&&n.name==="root"?["html"]:n.type==="PseudoClassSelector"&&["is","where"].includes(n.name)&&n.children?[...n.children].flatMap(c=>c.type==="SelectorList"?[...c.children].flatMap(Yp):[]):[])}function px(e){let t=[],i;try{i=dp(e)}catch(h){return["CSS tidak terbaca: "+h.message]}let n=[!0],c={html:{},body:{}};return vp(i,{enter(h){if(h.type==="Atrule"){h.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=h.prelude?sl(h.prelude):"",x=h.name.toLowerCase()==="media"&&g.split(",").every(b=>{let v=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||v&&Number(v[1])>960});n.push(n.at(-1)&&!x)}if(h.type!=="Rule"||!n.at(-1))return;let d=new Set(h.prelude?.type==="SelectorList"?[...h.prelude.children].flatMap(Yp):[]);h.block.children.forEach(g=>{if(g.type!=="Declaration")return;let x=sl(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(x)&&(c[b].overflow=!0),g.property==="height"&&x==="100dvh"&&(c[b].height=!0)})},leave(h){h.type==="Atrule"&&n.pop()}}),Object.values(c).some(h=>h.height&&h.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function ol({doc:e,scripts:t=[],css:i="",config:n,schema:c,requireObjects:h=!0}){let d=[],g=[];for(let C of t)try{let u=ru(C,{ecmaVersion:"latest",sourceType:"script"});g.push(u),d.push(...ux(u))}catch(u){d.push("Sintaks JavaScript gagal kompilasi: "+u.message)}n??(n=g.map(C=>qp(C,"CONFIG")).find(Boolean)),c??(c=g.map(C=>qp(C,"SVE_SCHEMA")).find(Boolean)),h&&!n&&d.push("CONFIG static tidak terbaca"),h&&!c&&d.push("SVE_SCHEMA static tidak terbaca");let x=c?.template?.type==="custom-page";if(c){Array.isArray(c.sections)||d.push("SVE_SCHEMA.sections wajib array");let C=Array.isArray(c.sections)?c.sections:[],u=C.map(L=>L?.id);new Set(u).size!==u.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),x||(zi.forEach(L=>{u.includes(L)||d.push("Canonical section hilang: "+L)}),u.forEach(L=>{zi.includes(L)||d.push("Section bukan canonical: "+L)}));for(let L of C){if(L?.fields!==void 0&&!Array.isArray(L.fields)){d.push("Section fields wajib array");continue}for(let B of L?.fields||[])if(lx.has(B?.type||"text")||d.push("Field type tidak didukung: "+B?.type),!!["repeater","repeater-image"].includes(B?.type)){if(!Array.isArray(B.fields)){d.push("Repeater tanpa fields[]");continue}for(let J of B.fields)(!J?.key||Kp.has(J.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(J?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(n&&!x){let C=n.sectionOrder;(!Array.isArray(C)||C.length!==zi.length||!zi.every(u=>C.includes(u))||C[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let v=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(v)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(v)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(v)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let S=["html","body"].map(C=>`${C}{${e?.querySelector(C)?.getAttribute("style")||""}}`).join("");d.push(...px(i+S));for(let C of e?.querySelectorAll("audio")||[])C.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let C of e?.querySelectorAll("iframe")||[]){let u="";try{u=new URL(C.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(u)&&C.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:n,schema:c}}var hx="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-background-primary sve-button-text-primary sve-button-background-secondary sve-button-text-secondary".split(" "),dx=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function fx(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(n=>n[1]));return i.size?[...hx,...dx].filter(n=>i.has(n)&&!new RegExp(`var\\(\\s*--${n}\\s*[,)]`).test(t)).map(n=>`Token ${n} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function mx(e){let t=[];for(let i of e?.querySelectorAll?.("[style]")||[]){if(i.hasAttribute?.("data-sve-literal-color"))continue;let h=(i.getAttribute("style")||"").replace(/var\([^)]*\)/g,"").match(/#[0-9a-f]{3,8}\b/gi);if(!h)continue;let d=i.getAttribute("data-pencil-id"),g=i.getAttribute("data-pencil-name"),x=d?` pada node ${d}${g?" ("+g+")":""}`:"";t.push(`Warna belum tertoken: ${[...new Set(h)].join(", ")}${x}. Panel Color SVE tidak akan mengubahnya`)}return t}function Qp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),n=t(i),c=[...n.querySelectorAll("style")],h=[...n.querySelectorAll("script")],d=ol({doc:n,css:c.map(b=>b.textContent).join(`
`),scripts:h.map(b=>b.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),n.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!n.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!n.body)&&g.push("Elemen body wajib ada"),n.head?.querySelector("title")||g.push("Title wajib ada di head"),n.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(c.length!==1||!n.head?.contains(c[0]))&&g.push("Wajib tepat satu style di head"),(h.length!==1||!n.body?.contains(h[0]))&&g.push("Wajib tepat satu script di body"),h[0]&&h[0]!==n.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),h.some(b=>b.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let b=new Set([...n.querySelectorAll("[data-section-id]")].map(v=>v.getAttribute("data-section-id")));zi.forEach(v=>{b.has(v)||g.push("Markup section hilang: "+v)})}g.push(...fx(d.html??i));let x=mx(n);return{...d,blockers:[...new Set(g)],warnings:x,html:i}}var gx="sve-config",bx="sve-config-ack",xx="scalev-html-mode-preview-loaded";function Zp({document:e,window:t,getConfig:i,syncImages:n,metrics:c}){let h=null,d=null,g=!1,x=null,b=null,v=0,S=null,C=null,u=null,L=!1,B=null,J=null,Y=0,oe=null,Q=!1;function xe(){if(h?.isConnected)return h;let R=[...e.querySelectorAll("iframe")];return h=R.find(F=>F.getAttribute("title")==="HTML Mode preview")||R.find(F=>F.id==="preview")||R.find(F=>(F.getAttribute("srcdoc")||"").length>0)||null,h}function De(R){if(!R)return null;try{let F=R.contentWindow;return F&&typeof F.SVE_REFRESH=="function"?F:null}catch{return null}}function $t(){try{let F=(e.querySelector("section.studio-page")||e.getElementById("__nuxt"))?.__vue__;return!F||!F.pageDisplayValues||typeof F.pageDisplayValues.htmlDocument!="string"||typeof F.$set!="function"?null:F}catch{return null}}function kt(R,F){R.$set(R.pageDisplayValues,"htmlDocument",F)}function Ht(){L||(L=!0,t.addEventListener("message",R=>{let F=R.data;if(!(!F||typeof F!="object")){if(F.type===xx){Q&&(Q=!1,u!==null&&(t.clearTimeout(u),u=null),B!==!0&&(B=!0,c.previewLoadedCount=(c.previewLoadedCount||0)+1));return}F.type===bx&&(R.origin!=="null"&&R.origin!==t.location?.origin||S!==null&&F.id!==S||(S=null,C!==null&&(t.clearTimeout(C),C=null),B===null&&(B=!0),c.previewAckCount=(c.previewAckCount||0)+1,F.error&&console.warn("[SVE] Preview menolak CONFIG:",F.error)))}}))}function ae(){if(B===null){B=!1,c.previewUnsupported=!0;try{J?.()}catch(R){console.warn("[SVE] onUnsupported gagal",R)}}}function ie(R,F){Ht();let Se=JSON.parse(F),Ve=++v;S=Ve,R.contentWindow.postMessage({type:gx,id:Ve,config:Se},"*"),c.previewMessageCount=(c.previewMessageCount||0)+1,B===null&&C===null&&(C=t.setTimeout(()=>{C=null,S!==null&&ae()},400))}function le(R,F,Se){let Ve=JSON.parse(Se);if(F.CONFIG=Ve,F.SVE_REFRESH?.(Ve),B=!0,c.previewDirectCount=(c.previewDirectCount||0)+1,g)try{R.contentDocument&&n(R.contentDocument)}catch{}}function pe(R,F){Ht();try{kt(R,F)}catch(Se){return console.warn("[SVE] Payload preview Scalev gagal",Se),!1}return Q=!0,u===null&&(u=t.setTimeout(()=>{u=null,Q&&(Q=!1,oe=!1,c.previewLoadedTimeout=(c.previewLoadedTimeout||0)+1)},2500)),c.previewScalevCount=(c.previewScalevCount||0)+1,!0}function St(){d!==null&&t.cancelAnimationFrame(d),d=null;let R=xe(),F=i();if(!R||!F)return;let Se=JSON.stringify(F);if(!(Se===x&&R===b&&!g)){try{let Ve=De(R);Ve?le(R,Ve,Se):ie(R,Se),x=Se,b=R,c.previewRefreshCount=(c.previewRefreshCount||0)+1}catch(Ve){console.warn("[SVE] Preview refresh gagal",Ve)}g=!1}}return{request({images:R=!1,force:F=!1}={}){g||(g=R),F&&(x=null,b=null),d===null&&(d=t.requestAnimationFrame(St))},fromScalevSource(R){if(typeof R!="string"||!R)return!1;if(oe===!1){if(++Y<40)return!1;Y=0}let F=$t();if(!F)return oe=!1,!1;let Se=pe(F,R);return Se&&(oe=!0),Se},document(){try{return xe()?.contentDocument||null}catch{return null}},supported(){return B},onUnsupported(R){J=R},invalidate(){h=null,x=null,b=null,oe=null},flush:St,scalevTarget:$t}}var yx="sve-config",vx="sve-config-ack";function Jp({document:e,window:t,getDocument:i,getConfig:n,metrics:c}){let h=null,d=null,g=null,x=null,b=1,v=!1,S=!1,C=0,u=new Map,L=null,B=!1,J=null;function Y(){B||(B=!0,t.addEventListener("message",ae=>{let ie=ae.data;if(!ie||typeof ie!="object"||ie.type!==vx)return;let le=u.get(ie.id);le&&(u.delete(ie.id),le(ie.error?new Error(String(ie.error)):null))}))}function oe(ae){if(!g||!v)return Promise.resolve(!1);let ie=JSON.stringify(ae);if(ie===L)return Promise.resolve(!0);Y();let le=++C;return new Promise(pe=>{let St=t.setTimeout(()=>{u.delete(le),pe(!1)},1200);u.set(le,R=>{if(t.clearTimeout(St),R){c.livePreviewError=String(R.message||R),pe(!1);return}L=ie,c.livePreviewCount=(c.livePreviewCount||0)+1,pe(!0)});try{g.contentWindow.postMessage({type:yx,id:le,config:ae},"*")}catch(R){t.clearTimeout(St),u.delete(le),c.livePreviewError=String(R.message||R),pe(!1)}})}function Q(){if(!x||!g)return;let ae=x.clientWidth,ie=x.clientHeight;!ae||!ie||(b=Math.min(1,ae/1440),g.style.transform=`scale(${b})`,g.style.transformOrigin="top left",g.style.width="1440px",g.style.height=Math.round(ie/b)+"px")}function xe(){if(S||v)return;let ae=i?.();if(typeof ae!="string"||!ae)return;S=!0,c.livePreviewBootCount=(c.livePreviewBootCount||0)+1,g=e.createElement("iframe"),g.className="sve-live-frame",g.setAttribute("title","SVE live preview"),g.setAttribute("sandbox","allow-scripts allow-same-origin"),g.setAttribute("srcdoc",ae),x.replaceChildren(g);let ie=()=>{S=!1,v=!0,Q(),L=null,c.livePreviewReady=!0};g.addEventListener("load",ie,{once:!0}),t.setTimeout(()=>{v||S===!1||g.contentDocument&&ie()},8e3)}function De(ae){if(d)return d;h=ae,d=e.createElement("div"),d.className="sve-live-pane",d.id="sve77-live",d.hidden=!0;let ie=e.createElement("div");ie.className="sve-live-bar";let le=e.createElement("span");le.className="sve-live-label",le.textContent="Preview";let pe=e.createElement("button");return pe.type="button",pe.className="sve-live-close",pe.setAttribute("aria-label","Tutup preview"),pe.title="Tutup preview",pe.textContent="\xD7",pe.addEventListener("click",()=>{kt(),J?.()}),ie.append(le,pe),x=e.createElement("div"),x.className="sve-live-stage",d.append(ie,x),ae.append(d),t.addEventListener("resize",Q),d}function $t(){return d?(d.hidden=!1,h?.classList.add("sve-live-on"),xe(),Q(),!0):!1}function kt(){d&&(d.hidden=!0,h?.classList.remove("sve-live-on"))}function Ht(){return!!d&&!d.hidden}return{mount:De,show:$t,hide:kt,isVisible:Ht,isReady(){return v},onClose(ae){J=ae},ensure(){!d||d.hidden||xe()},refresh(ae){return!d||d.hidden?Promise.resolve(!1):v?oe(ae):(xe(),Promise.resolve(!1))},scale(){return b},teardown(){t.removeEventListener("resize",Q),d?.remove(),d=null,g=null,v=!1,S=!1,B=!1,u.clear()}}}(function(){"use strict";let e="sve77",t="0.34.0",n=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),c="https://nikahin.myscalev.com/home#paket",h="6282175274118",d="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",x=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let S=(r,a=document)=>a.querySelector(r),C=(r,a=document)=>Array.from(a.querySelectorAll(r)),u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let L=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-background-primary","#332a24"],["Button Primary","Text","--sve-button-text-primary","#ffffff"],["Button Secondary","Background","--sve-button-background-secondary","#ffffff"],["Button Secondary","Text","--sve-button-text-secondary","#332a24"]],B=Array.from({length:31},(r,a)=>12+a*2+"px"),J=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],Y=["100","200","300","400","500","600","700","800","900"],oe=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],Q=oe.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),xe=[{target:"heading",variable:"--sve-font-heading"},{target:"body",variable:"--sve-font-body"}],De=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],$t=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),kt=new Set(["__proto__","prototype","constructor"]),Ht=12,ae=240,ie=1e4;function le(r){let a=String(r||"").trim();if(!a||a.length>ae||a.includes("..")||a.startsWith(".")||a.endsWith("."))return null;let s=a.split(".");if(!s.length||s.length>Ht)return null;for(let o of s){if(!o||kt.has(o))return null;if(/^\d+$/.test(o)){let l=Number(o);if(!Number.isSafeInteger(l)||l<0||l>ie)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let pe=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,St=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,R=4096;function F(r){return pe.lastIndex=0,pe.test(String(r||""))}function Se(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let l=String(o||"");if(!l)return;pe.lastIndex=0;let p=0,f=0,y;for(;y=pe.exec(l);){p+=1;let w=y.index+y[0].length,k=w;for(;k<l.length&&/[A-Za-z0-9+/=]/.test(l[k]);)k+=1;f+=k-w}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(f*.75/1024))})}),a}function Ve(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let l=String(o||"");if(!l)return;St.lastIndex=0;let p=0,f=0,y;for(;y=St.exec(l);){let w=y[0].length;w<=R||F(y[0])||(p+=1,f=Math.max(f,w))}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(f/1024))})}),a}function Jr(r){return r.map(a=>a.where+" ("+a.count+"x, \xB1"+a.approxKb+" KB)").join(", ")}let Xr=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Xp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},ll=["auto","cover","contain"];function eh(r){return r==="fill"?"cover":r==="fit"?"contain":ll.includes(r)?r:"auto"}function cl(r=""){return`
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
    `}function ul(r){return`
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
    `}function T(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fi(r,a=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),a)}}function zt(r,a=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:a}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function pl(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function rt(r){return!!(r&&r.isConnected)}function ih(r){if(!r)return null;try{if(typeof r.getWrapperElement=="function"){let a=r.getWrapperElement();if(a)return a}if(typeof r.getTextArea=="function"){let a=r.getTextArea();if(a)return a.closest?.(".CodeMirror")||a}}catch{}return null}function hl(r){let a=ih(r);return a?rt(a):!0}function Wt(){let r=u.nativeCache;Object.keys(r).forEach(a=>{r[a]&&!rt(r[a])&&(r[a]=null)})}function wt(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Gt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,a=>a.toUpperCase()).trim()}function kx(){}function j(r,a){if(r==null||!a)return;let s=le(a);if(!s)return;let o=r;for(let l of s){if(o==null)return;let p=/^\d+$/.test(l)?Number(l):l;if(!Object.prototype.hasOwnProperty.call(o,p))return;o=o[p]}return o}function Ye(r,a,s){let o=le(a);if(!r||!o)return!1;let l=r;for(let y=0;y<o.length-1;y++){let w=o[y],k=/^\d+$/.test(w)?Number(w):w;if((!Object.prototype.hasOwnProperty.call(l,k)||l[k]===null||l[k]===void 0)&&(l[k]=/^\d+$/.test(o[y+1])?[]:Object.create(null)),typeof l[k]!="object")return!1;l=l[k]}let p=o.at(-1),f=/^\d+$/.test(p)?Number(p):p;return l[f]=s,!0}function Pt(r){let a=String(r||"").trim();if(!a)return"";try{/^https?:\/\//i.test(a)&&(a=new URL(a).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{a=decodeURIComponent(a)}catch{}return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function en(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function rh(){let r=C('input[type="text"], input:not([type])').filter(a=>en(a));return r.length?r.find(a=>String(a.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function nh(){let r=C("a[href]").filter(a=>!a.closest("#"+e));for(let a of r){let s=a,o="";for(let l=0;l<4&&s;l+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let l=new URL(a.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(l.hostname)&&!/scalev\.(?:com|id)$/i.test(l.hostname))continue;let p=l.pathname.split("/").filter(Boolean),f=Pt(p.at(-1)||"");if(f)return f}catch{}}return""}function Nt(){let r=rh(),a=Pt(r?.value);if(a)return u.scalevSlug=a,a;let s=nh();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function tn(r,a){let s=String(a||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),l=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&l.endsWith("weddingid")||/wedding\s*id/.test(o)}function ah(){let r=new Set;try{Ae().forEach(a=>{(a.fields||[]).forEach(s=>{s.type!=="repeater"&&tn(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&j(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&j(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function rn(r){C('[data-auto-wedding-id="1"]').forEach(a=>{a.value!==r&&(a.value=r),a.setAttribute("readonly","")})}function mi(r,a={}){let s=Pt(r||Nt());if(!s)return!1;u.scalevSlug=s;let o=ah();if(!u.config||!o.length)return u.pendingWeddingIdSlug=s,rn(s),!1;let l=!1;if(o.forEach(f=>{j(u.config,f)!==s&&(Ye(u.config,f,s),l=!0)}),rn(s),!l)return u.pendingWeddingIdSlug="",!1;let p=sn().length>0;return a.commit!==!1&&p&&u.configRange?.editor?(u.pendingWeddingIdSlug="",Ne(a.silent?void 0:"Wedding ID mengikuti Slug URL"),rn(s),!0):(u.pendingWeddingIdSlug=s,!0)}function dl(){let r=Pt(u.pendingWeddingIdSlug||u.scalevSlug||Nt());return r?mi(r,{commit:!0,silent:!0}):!1}let sh=fi(()=>{let r=Nt();r&&mi(r,{commit:!0})},450);function Wi(){if(Wt(),rt(u.nativeCache.save)||rt(u.nativeCache.publish))return{save:rt(u.nativeCache.save)?u.nativeCache.save:null,publish:rt(u.nativeCache.publish)?u.nativeCache.publish:null};let r=C("button").filter(l=>!l.closest("#"+e)),a=l=>(l.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(l=>{let p=a(l);return p==="simpan"||p==="save"})||null,o=r.find(l=>{let p=a(l);return p.includes("simpan & terbitkan")||p.includes("simpan dan terbitkan")||p==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=o,{save:s,publish:o}}function oh(r,a){if(!r)return a?.parentElement||null;if(!a)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=a;o;){if(s.has(o))return o;o=o.parentElement}return null}function fl(r,a){if(Wt(),rt(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&a&&r.parentElement===a.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=oh(r,a);if(!s)return r?.parentElement||a?.parentElement||null;let o=s;for(let l=0;l<4&&o;l++,o=o.parentElement){let p=o.getBoundingClientRect?.();if(p&&p.top>=0&&p.top<180&&p.height<110)return u.nativeCache.toolbarHost=o,o}return u.nativeCache.toolbarHost=s,s}function nn(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let a=!!u.open;r.style.setProperty("display",a?"none":"",a?"important":""),r.setAttribute("aria-hidden",a?"true":"false"),r.tabIndex=a?-1:0}function ml(){let{save:r,publish:a}=Wi(),s=a||r;if(!s)return!1;let o=fl(r,a);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let l=document.getElementById(e+"-toolbar-toggle");return l||(l=s.cloneNode(!1),l.id=e+"-toolbar-toggle",l.type="button",l.disabled=!1,l.removeAttribute("disabled"),l.setAttribute("aria-controls",e+"-dock"),l.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),l.setAttribute("aria-pressed","false"),l.textContent="Visual Editor",l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),u.open?mh():qt(!0)})),l.parentElement!==o&&(a&&a.parentElement===o?a.insertAdjacentElement("afterend",l):r&&r.parentElement===o?r.insertAdjacentElement("afterend",l):o.appendChild(l)),l.classList.toggle("sve-toolbar-active",u.open),l.setAttribute("aria-pressed",u.open?"true":"false"),nn(),u.open&&requestAnimationFrame(()=>xl(!0)),!0}function an(){let a=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return a||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function lh(){if(Wt(),rt(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=C("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),l=s.getBoundingClientRect(),p=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&l.top>=-2&&l.top<=4&&l.height>=36&&l.height<=64&&l.width>=window.innerWidth*.7&&p.includes("landing page studio")});if(!r.length)return null;let a=r.sort((s,o)=>{let l=s.getBoundingClientRect(),p=o.getBoundingClientRect();return l.height-p.height||l.top-p.top})[0];return u.nativeCache.globalHeader=a||null,a||null}function Gi(){let r=lh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function ch(){if(Wt(),rt(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:a}=Wi(),s=a||r;if(!s)return an();let o=s,l=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let f=o.getBoundingClientRect();f.top>=36&&f.top<=130&&f.width>=window.innerWidth*.68&&f.height>=window.innerHeight*.62&&(l=o)}o=o.parentElement}let p=l||an();return u.nativeCache.workspaceRoot=p||null,p}function uh(){let a=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return a>0?a:Math.min(400,window.innerWidth*.32)}function gl(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function qi(r){let a=document.querySelector('[data-sve77-page-root="1"]'),s=ch();if(a&&a!==s&&gl(a),s)if(r){let o=getComputedStyle(s),l=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",l?"positioned":"flow")}else gl(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>xl(r))}function ph(){if(Wt(),rt(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:a}=Wi(),s=a||r;if(!s)return null;let o=s,l=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let p=getComputedStyle(o),f=o.getBoundingClientRect();if(p.position==="fixed"&&f.top>=36&&f.top<=70&&f.height>=48&&f.height<=92&&f.width>=Math.min(520,window.innerWidth*.42)){l=o;break}}o=o.parentElement}return u.nativeCache.topToolbar=l||null,l}function bl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function xl(r){let{save:a,publish:s}=Wi(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||fl(a,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let l=document.querySelector('[data-sve77-top-toolbar="1"]'),p=ph();if(l&&l!==p&&bl(l),!p)return;if(!r){bl(p);return}let f=Math.ceil(uh());p.setAttribute("data-sve77-top-toolbar","1"),p.style.setProperty("right",f+"px","important"),p.style.setProperty("box-sizing","border-box","important"),p.style.setProperty("transition","right .16s ease","important")}function yl(){zt(()=>{if(u.open)try{let r=Nt();r&&mi(r,{commit:!0,silent:!0}),dl()}catch{}},1200)}function vl(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=Pe())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{fe()}catch{}yl()}function hh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{Gi(),qi(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),vl(),performance.mark("sve-panel-paint-end"),fh()}})})}function dh(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){vl();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&Pe(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&fe()}catch{}performance.mark("sve-prewarm-end"),yl()}function fh(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(a=>String(a.name).startsWith("sve-")).map(a=>({name:a.name,startTime:Math.round(a.startTime*100)/100}))}catch{}}function Ki(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=zt(dh,1200))}function qt(r){if(!r&&!Te())return;u.open=!!r;let a=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(a?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),nn(),u.open){u.prewarmScheduled&&(pl(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),hh();return}requestAnimationFrame(()=>{try{qi(!1)}catch{}}),Ki()}function mh(){qt(!1)}function sn(){return[...new Set(C(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Yi(){let r=sn();if(u.allEditors=r,!r.length)return!1;let a={html:null,css:null,js:null,head:null},s=new Set,o=(k,E,A)=>{!E||a[k]||s.has(E)||A(E.getValue?.()||"")&&(a[k]=E,s.add(E))},l=k=>/<!doctype html|<html[\s>]/i.test(k),p=k=>k.includes("--sve-background-primary")||k.includes("--sve-font-heading")||/^\s*[.#:@*\[a-z][^\n]*\{[^}]*\}/m.test(k),f=k=>k.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(k)||/^\s*(?:\(|!|;)?\s*(?:function\b|class\b|import\b|export\b|"use strict"|'use strict')/m.test(k),y=k=>/<meta[\s>]|<link[\s>]|<script[\s>]/i.test(k)&&!l(k);C("label").forEach(k=>{let E=k.querySelector(".CodeMirror")?.CodeMirror;if(!E)return;let _=[...k.querySelectorAll(":scope > span")].map(W=>W.textContent.replace(/\s+/g," ").trim().toLowerCase()).filter(Boolean).pop()||""||(k.querySelector(":scope > span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();_==="body html"?o("html",E,l):_==="css"?o("css",E,p):_==="javascript"?o("js",E,f):_.includes("additional head")?o("head",E,y):_.includes("html document")&&o("html",E,l)}),r.forEach(k=>{o("html",k,l),o("css",k,p),o("js",k,f),o("head",k,y)});let w=r.filter(k=>!s.has(k));if(a.html||(a.html=w.shift()||null),a.css||(a.css=w.shift()||null),!a.js){let k=w.find(E=>!l(E.getValue?.()||""));k&&(a.js=k,w.splice(w.indexOf(k),1))}return a.head||(a.head=w.shift()||null),u.editors=a,jh(),!0}function U(r){return u.editors[r]?.getValue?.()||""}function Qi(r,a=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(s){s.dispatchEvent(new Event("input",{bubbles:!0})),a&&s.dispatchEvent(new Event("change",{bubbles:!0}));return}let o=r._handlers?.change;if(!Array.isArray(o))return;let l={from:{line:0,ch:0},to:{line:0,ch:0},text:[],removed:[],origin:"sve-wake"};o.forEach(p=>{if(!(typeof p!="function"||p.__sve))try{p(r,l)}catch{}})}catch{}}function gh(r,a,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(a),r.save?.()}),Qi(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}tr(),Pl()}}function ht(r,a){gh(u.editors[r],a)}function bh(){return new URL(n.endpoint)}function xh(r,a=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!a&&s.origin!==bh().origin?"":s.href}catch{return""}}function yh(r){if(!r||typeof r!="object")return null;let a=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(a)||!s?null:{id:a,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:xh(r.source_url||r.sourceUrl)}}function vh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(yh).filter(Boolean)}async function kh(r,a={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),n.timeoutMs);try{return await fetch(r,{...a,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function Sh(r,a={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=a.method||"GET";return new Promise((o,l)=>{GM_xmlhttpRequest({method:s,url:r,data:a.body,headers:a.headers||{},timeout:n.timeoutMs,onload:p=>{let f=Number(p.status),y=Number.isInteger(f)&&f>=200&&f<=599?f:200,w=String(p.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),k=String(p.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(p.responseText||"",{status:y,statusText:w,headers:{"Content-Type":k}}))},ontimeout:()=>l(new DOMException("The operation timed out","AbortError")),onerror:()=>l(new TypeError("Userscript request failed"))})})}async function on(r,a={}){if(typeof GM_xmlhttpRequest=="function")try{return await Sh(r,a)}catch{}return await kh(r,a)}async function kl(r=!1){let a=u.templateLibrary;if(!r&&a.status==="ready"&&a.loadedAt&&Date.now()-a.loadedAt<3e5)return a.templates;a.status="loading",a.error="";try{let s=await on(n.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let l=vh(o);if(!l.length)throw new Error("Library belum memiliki template aktif");return a.templates=l,a.loadedAt=Date.now(),a.status="ready",l}catch(s){return a.templates=[],a.status="error",a.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),a.templates}}function wh(){return C('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let a=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="kode"||a==="code"||a.includes("kode html")})||null}async function Ch(){if(Yi()&&u.editors.html)return!0;wh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(a=>window.setTimeout(a,120)),Yi()&&u.editors.html)return!0;return!1}function Eh(r){return Qp(r,a=>new DOMParser().parseFromString(a,"text/html"))}function Sx(r,a){let s=String(a||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let l=Sl(r,r.indexOf("{",o.index));if(!l)return null;try{return wl(l.text)}catch{return null}}function Ah(){let r=C('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,l="";for(let p=0;p<5&&o;p+=1,o=o.parentElement)l+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(l)})[0]||r[0]||null}function Th(r){let a=Ah();if(!a)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),a.files=s.files,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}))}function Kt(r){let a=["style","audio","compatibility"],s=r||"content",o=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let l=document.getElementById(e);if(C(".tab",l).forEach(p=>{p.classList.toggle("active",p.dataset.tab===r)}),o){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}fe()}async function _h(r,a,s){if(!Te())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=u.templateLibrary,l=Eh(await r.text());if(l.blockers.length)throw console.error("[SVE] Template library validation failed",l.blockers),new Error(l.blockers[0]);if(!await Ch())throw new Error("Buka tab Kode terlebih dahulu");let p={html:U("html"),css:U("css"),js:U("js"),head:U("head")};Th(r);let f=Date.now(),y=!1;for(;Date.now()-f<4500;){await new Promise(E=>window.setTimeout(E,140)),Yi();let w=U("html"),k=U("js");if(w!==p.html||k!==p.js){y=!0;break}}if(!y)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=p,o.importedId=a||"local-import",o.importedName=s||r.name||"Template lokal",Pe(),Be(),Kt("content")}async function Lh(r){let a=u.templateLibrary,s=a.templates.find(l=>l.id===r),o=l=>{a.previousSource=null,a.importedId="",a.importedName="",a.status="error",a.error=l,u.uiPrepared=!1,fe()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}a.status="loading",a.error="",u.uiPrepared=!1,fe();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let l=await on(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",l.status),!l.ok)throw new Error("HTTP "+l.status);let p=await l.text();console.log("[SVE] Source length:",p.length);let f=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",y=new File([p],f,{type:"text/html"});await _h(y,s.id,s.name),a.error="",a.status="ready",Kt("content")}catch(l){console.error("[SVE] Import gagal:",l),o("Import gagal: "+String(l?.message||"source tidak terbaca"))}}function wx(){let r=u.templateLibrary.previousSource;r&&Te()&&(ht("html",r.html),ht("css",r.css),ht("js",r.js),ht("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",Pe(),Be(),Kt("library"))}function Ih(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(a=>{ht(a,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,Pe(),Be(),u.uiPrepared=!1,fe()}function Sl(r,a){let s=0,o=null,l=!1,p=!1,f=!1;for(let y=a;y<r.length;y++){let w=r[y],k=r[y+1];if(p){w===`
`&&(p=!1);continue}if(f){w==="*"&&k==="/"&&(f=!1,y++);continue}if(o){if(l){l=!1;continue}if(w==="\\"){l=!0;continue}w===o&&(o=null);continue}if(w==="/"&&k==="/"){p=!0,y++;continue}if(w==="/"&&k==="*"){f=!0,y++;continue}if(w==='"'||w==="'"||w==="`"){o=w;continue}if(w==="{")s++;else if(w==="}"&&(s--,s===0))return{start:a,end:y+1,text:r.slice(a,y+1)}}return null}function wl(r){let a=0,s=A=>{throw new Error(A+" @"+a)};function o(){for(;a<r.length;){let A=r[a],_=r[a+1];if(/\s/.test(A)){a++;continue}if(A==="/"&&_==="/"){for(a+=2;a<r.length&&r[a]!==`
`;)a++;continue}if(A==="/"&&_==="*"){for(a+=2;a<r.length&&!(r[a]==="*"&&r[a+1]==="/");)a++;a+=2;continue}break}}function l(){let A=r[a++],_="";for(;a<r.length;){let W=r[a++];if(W===A)return _;if(W!=="\\"){_+=W;continue}let ye=r[a++],nt={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};_+=Object.prototype.hasOwnProperty.call(nt,ye)?nt[ye]:ye}s("String belum ditutup")}function p(){o();let A=a;for(/[A-Za-z_$]/.test(r[a]||"")||s("Identifier invalid"),a++;a<r.length&&/[A-Za-z0-9_$]/.test(r[a]);)a++;return r.slice(A,a)}function f(){let A=r.slice(a).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return A||s("Number invalid"),a+=A[0].length,Number(A[0])}function y(){let A=[];if(a++,o(),r[a]==="]")return a++,A;for(;a<r.length;)if(A.push(k()),o(),r[a]==="]"||(r[a]!==","&&s("Koma array hilang"),a++,o(),r[a]==="]"))return a++,A;s("Array belum selesai")}function w(){let A=Object.create(null);if(a++,o(),r[a]==="}")return a++,A;for(;a<r.length;){o();let _=['"',"'","`"].includes(r[a])?l():p();if(o(),kt.has(_)&&s("Object key terlarang: "+_),Object.prototype.hasOwnProperty.call(A,_)&&s("Duplicate object key: "+_),r[a]!==":"&&s("Titik dua hilang"),a++,A[_]=k(),o(),r[a]==="}"||(r[a]!==","&&s("Koma object hilang"),a++,o(),r[a]==="}"))return a++,A}s("Object belum selesai")}function k(){o();let A=r[a];if(A==="{")return w();if(A==="[")return y();if(['"',"'","`"].includes(A))return l();if(A==="-"||/\d/.test(A||""))return f();let _=p();if(_==="true")return!0;if(_==="false")return!1;if(_==="null")return null;_==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+_)}let E=k();return o(),E}function ln(r){let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+a+"|(?:window|globalThis)\\."+a+")\\s*=\\s*\\{"),o=[];function l(p,f){!p||o.some(y=>y.editor===p)||o.push({editor:p,kind:f})}l(u.editors.js,"js"),l(u.editors.html,"html"),l(u.editors.head,"head"),u.allEditors.forEach(p=>l(p,"unknown"));for(let p of o){let f=p.editor.getValue?.()||"",y=s.exec(f);if(!y)continue;let w=f.indexOf("{",y.index),k=Sl(f,w);if(k)try{return{kind:p.kind,editor:p.editor,obj:wl(k.text),start:k.start,end:k.end}}catch(E){console.error("[SVE] parse "+r+" gagal",E)}}return null}function $h(){if(!u.doc)return null;let r=[];return C("[data-sve-section]",u.doc).forEach((a,s)=>{let o=[],l=new Set;C("[data-sve-field]",a).forEach(f=>{let y=f.getAttribute("data-sve-field");!y||l.has(y)||(l.add(y),o.push({type:f.getAttribute("data-sve-type")||"text",label:f.getAttribute("data-sve-label")||Gt(y),path:y}))});let p=a.getAttribute("data-sve-countdown-path");p&&!l.has(p)&&o.push({type:"datetime",label:"Waktu Tujuan",path:p}),r.push({id:a.id||"section-"+s,label:a.getAttribute("data-sve-section")||Gt(a.id)||"Section "+(s+1),visiblePath:a.getAttribute("data-sve-visible-path")||null,canHide:!!a.getAttribute("data-sve-visible-path"),reorderable:(a.getAttribute("data-section-id")||a.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Zi(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=$h(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function Ae(){let r=Zi();return Array.isArray(r?.sections)?r.sections:[]}function X(r){return String(r?.id||"").trim()}function Yt(r){let a=X(r);return!(!a||a==="cover"||r?.locked===!0||r?.reorderable===!1)}function Ji(){let a=Ae().map(X).filter(Boolean);if(!a.length)return[];let s=new Set(a),o=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(p=>String(p||"").trim()).filter(p=>p&&s.has(p)):[],l=[];return s.has("cover")&&l.push("cover"),o.forEach(p=>{p!=="cover"&&!l.includes(p)&&l.push(p)}),a.forEach(p=>{l.includes(p)||l.push(p)}),l}function gi(){let r=Ae(),a=new Map(r.map(s=>[X(s),s]));return Ji().map(s=>a.get(s)).filter(Boolean)}function Xi(r,a){let s=String(r||"").trim(),o=Ae().find(y=>X(y)===s);if(!o||!Yt(o))return!1;let l=Ji(),p=l.indexOf(s);if(p<0)return!1;let f=p+a;for(;f>=0&&f<l.length;){let y=l[f],w=Ae().find(k=>X(k)===y);if(y!=="cover"&&!w?.locked)return!0;f+=a}return!1}function Cl(r){if(!u.config)return!1;let a=Ae(),s=new Set(a.map(X).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(l=>String(l||"").trim()).filter(l=>l&&s.has(l)&&l!=="cover").forEach(l=>{o.includes(l)||o.push(l)}),a.map(X).filter(Boolean).forEach(l=>{o.includes(l)||o.push(l)}),u.config.sectionOrder=o,!0}function Ph(r=document){C("[data-section-card]",r).forEach(a=>{let s=a.dataset.sectionCard,o=S("[data-section-up]",a),l=S("[data-section-down]",a);o&&(o.disabled=!Xi(s,-1)),l&&(l.disabled=!Xi(s,1))})}function Nh(r,a){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",a==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function El(r,a,s){let o=S("#"+e+"-body");if(!o)return;let l=S(".reset-zone",o),p=new Map(C("[data-section-card]",o).map(f=>[f.dataset.sectionCard,f]));r.forEach(f=>{let y=p.get(f);y&&(l?o.insertBefore(y,l):o.appendChild(y))}),Ph(o),Nh(p.get(a),s)}function Al(r,a){let s=String(r||"").trim(),o=Ae().find(w=>X(w)===s);if(!o||!Yt(o))return;let l=Ji(),p=l.indexOf(s);if(p<0)return;let f=p+a;for(;f>=0&&f<l.length;){let w=l[f],k=Ae().find(E=>X(E)===w);if(w!=="cover"&&!k?.locked)break;f+=a}if(f<0||f>=l.length||l[f]==="cover")return;let[y]=l.splice(p,1);l.splice(f,0,y),Cl(l),Ne("Urutan section diperbarui"),El(l,s,a<0?"up":"down")}function Rh(r,a,s){let o=String(r||"").trim(),l=String(a||"").trim();if(!o||!l||o===l)return;let p=Ae(),f=p.find(ye=>X(ye)===o),y=p.find(ye=>X(ye)===l);if(!f||!y||!Yt(f))return;let w=s==="after"?"after":"before";if(l==="cover")w="after";else if(!Yt(y))return;let k=Ji(),E=k.indexOf(o);if(E<0)return;k.splice(E,1);let A=k.indexOf(l);if(A<0)return;let _=A+(w==="after"?1:0);k[0]==="cover"&&(_=Math.max(1,_)),_=Math.min(k.length,_),k.splice(_,0,o);let W=k.indexOf(o);Cl(k),Ne("Urutan section diperbarui"),El(k,o,W<E?"up":"down")}function Tl(){let r=Zi();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function Pe(){if(u.contentStateDirty&&!Te())return!1;if(u.lastSerializedConfig="",!Yi())return u.sourceDirty=!0,!1;zt(()=>{try{xd()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(U("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let a=ln("CONFIG");u.config=a?.obj||null,u.configRange=a||null,u.configSourceText=a?a.editor.getValue().slice(a.start,a.end):"",u.configOwnerSource=a?a.editor.getValue():"";let s=ln("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(pl(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Dh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function Ne(r){return bi(r,{deferPreview:!0,syncImages:!0})?(Pe(),!0):!1}function er(r){return bi(r,{deferPreview:!0,syncImages:!0})}function Mh(r,a){let s=r._handlers?.change;if(!Array.isArray(s))return a();let o=[];s.forEach((l,p)=>{l?.__sve||(o.push([p,l]),s[p]=()=>{})});try{return a()}finally{o.forEach(([l,p])=>{Array.isArray(s)&&(s[l]=p)})}}function bi(r,a={}){if(!u.config||!u.configRange?.editor)return!1;let s=Zd(u.config);if(s.length)return xi(s[0]),!1;let l=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:ln("CONFIG");if(!l||l.editor!==u.configRange.editor)return xi("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let p=l.editor;if(!hl(p)){let A=u.config,_=Pe(),W=u.configRange?.editor;return!_||!hl(W)?(xi("Editor Scalev sudah dimuat ulang. Muat ulang panel (tombol Muat ulang source) lalu ulangi perubahan."),!1):(u.config=A,bi(r,a))}let f=p.getValue();if(f.slice(l.start,l.end)!==u.configSourceText)return xi("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let y=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(y===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let w=null,k=a.wakeScalev!==!0&&Rt.supported()===!0;try{u.internalEditorWrite+=1;let A=()=>p.operation(()=>{if(typeof p.replaceRange=="function"&&typeof p.posFromIndex=="function")p.replaceRange(y,p.posFromIndex(l.start),p.posFromIndex(l.end));else{let _=p.getValue?.()||"",W=_.slice(0,l.start)+y+_.slice(l.end);p.setValue(W)}p.save?.()});k?Mh(p,A):A(),(a.wakeScalev||!k)&&Qi(p,!1)}catch(A){w=A}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(w){u.internalEditorWrite+=1;try{p.getValue()!==f&&p.setValue(f),Qi(p,!1)}catch{}finally{u.internalEditorWrite-=1}return xi("Perubahan belum tersimpan: "+w.message),!1}l.end=l.start+y.length,l.obj=u.config,u.configRange=l,u.configSourceText=y,u.configOwnerSource=p.getValue();let E=Rt.fromScalevSource(p.getValue());return u.lastSerializedConfig=y,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),tr(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Vh(),E&&!a.syncImages?u.performance.previewViaScalevCount=(u.performance.previewViaScalevCount||0)+1:a.deferPreview?Jh({syncImages:!!a.syncImages}):Be({syncImages:!!a.syncImages}),!0}function xi(r){u.commitError=r,u.contentStateDirty=!0;let a=document.getElementById(e+"-commit-notice");a&&(a.hidden=!1,a.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function tr(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,U(r)]))}function _l(){return e+":fresh-default:"+location.origin+location.pathname}function cn(){let r=U("js"),a=u.configRange,s=a&&a.editor&&typeof a.start=="number"&&typeof a.end=="number"&&a.start<=a.end?r.slice(0,a.start)+"\u241F"+r.slice(a.end):r,o=["html",U("html"),"css",U("css"),"js",s,"head",U("head")].join("\u241E"),l=2166136261;for(let p=0;p<o.length;p++)l^=o.charCodeAt(p),l=Math.imul(l,16777619);return(l>>>0).toString(16).padStart(8,"0")}function Fh(){let r={};return L.forEach(([,,a])=>{let s=we(a);s&&(r[a]=s)}),Q.forEach(a=>{r[a.variable]=we(a.variable)||a.fallback}),xe.forEach(({variable:a})=>{let s=we(a);s&&(r[a]=s)}),{version:t,config:u.config?wt(u.config):null,cssTokens:r,googleFonts:wt(j(u.config,"editorStyle.googleFonts")||{})}}function Ll(){try{let r=JSON.parse(localStorage.getItem(_l())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function Il(r){try{localStorage.setItem(_l(),JSON.stringify(r))}catch{}}function $l(){if(!u.config)return!1;let r=cn(),a=Fh();return u.defaults=a,u.defaultConfig=wt(a.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,tr(),Il({version:t,defaults:a,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Oh(r){let a=r?.cssTokens;return!a||typeof a!="object"?!1:xe.every(({variable:s})=>typeof a[s]=="string"&&a[s].trim()!=="")}function Dh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,o])=>U(s)===o))return;let r=cn(),a=Ll();if(a?.defaults&&a.lastManagedFingerprint===r&&Oh(a.defaults)){u.defaults=a.defaults,u.defaultConfig=wt(a.defaults.config||u.config),u.baselineFingerprint=a.baselineFingerprint||r,u.lastManagedFingerprint=r,tr();return}$l()}function Pl(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,o])=>U(s)===o))return;let r=cn(),a=Ll()||{};u.lastManagedFingerprint=r,Il({version:t,defaults:a.defaults||u.defaults,baselineFingerprint:a.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Vh=fi(Pl,700);function Bh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{Pe(),$l(),u.open?fe():Ki()}catch{}},420)}function jh(){u.allEditors.forEach(r=>{if(!r||u.editorChangeBound.has(r)||typeof r.on!="function")return;u.editorChangeBound.add(r);let a=()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Bh())};a.__sve=!0,r.on("change",a)})}function Cx(r){u.defaultConfig&&(Ye(u.config,r,wt(j(u.defaultConfig,r))),Ne("Berhasil direset"),fe())}let Uh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",Hh="https://nikahin.myscalev.com/dashboard",un="nikahin_team_key";function zh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(un,"")||"").trim()}catch{return""}}function Wh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(un,String(r||"").trim()),!0)}catch{return!1}}function Gh(){try{return typeof GM_setValue!="function"?!1:(GM_setValue(un,""),!0)}catch{return!1}}let qh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function pn(){return Pt(u.scalevSlug||Nt())||""}async function hn(r){let a=u.dashboardPin;if(a.busy)return;let s=pn();if(!s){a.status="error",a.message="Slug URL belum diisi di Pengaturan Scalev.",dt();return}let o=zh();if(!o){a.status="needkey",a.message="",dt();return}if(!(r==="generate"&&a.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){a.busy=!0,a.status="loading",a.message="",dt();try{let p=await(await on(Uh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!p||p.ok!==!0?(a.status="error",a.pin="",a.message=qh[p&&p.error]||"Gagal mengambil PIN."):(a.status="ready",a.slug=s,a.pin=String(p.pin||""),a.version=Number(p.version)||0,a.message=p.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{a.status="error",a.pin="",a.message="Tidak bisa menghubungi server."}a.busy=!1,dt()}}function Kh(){let r=S("#"+e+"-team-key"),a=r?r.value.trim():"",s=u.dashboardPin;if(!a){s.message="Kunci tim belum diisi.",dt();return}if(!Wh(a)){s.message="Tampermonkey menolak menyimpan kunci.",dt();return}s.status="idle",s.message="",hn("peek")}function Yh(){let r=u.dashboardPin;if(!Gh()){r.message="Tampermonkey menolak menghapus kunci.",dt();return}r.status="needkey",r.pin="",r.version=0,r.message="",dt()}async function Qh(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}dt()}}function dt(){let r=document.activeElement?.id,a=S("#"+e+"-pin-panel");a&&(a.innerHTML=Nl());let s=S("#"+e+"-pin-pill");s&&(s.outerHTML=Wl()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function Nl(){let r=u.dashboardPin,a=pn(),s=f=>f?`<small class="auto-wedding-id-note">${T(f)}</small>`:"";if(!a)return`
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
      `;let o=r.status==="ready"&&r.pin&&r.slug===a,l=r.busy||r.status==="loading",p=o?`
          <button type="button" ${l?"disabled":""}
            class="pin-ctl-action${l?" is-busy":""}"
            id="${e}-pin-generate"
          >
            PIN baru
          </button>
        `:`
          <button type="button" ${l?"disabled":""}
            class="pin-ctl-action${l?" is-busy":""}"
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
            value="${T(o?r.pin:"")}"
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
            href="${Hh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function Zh(){let r=u.defaults?.config;if(!r||!u.config)return 0;let a=0,s=(o,l,p)=>{if(!(p>6)){if(Array.isArray(o)||Array.isArray(l)){let f=Array.isArray(o)?o:[],y=Array.isArray(l)?l:[],w=Math.max(f.length,y.length);for(let k=0;k<w;k+=1)s(f[k],y[k],p+1);return}if(o&&l&&typeof o=="object"&&typeof l=="object"){for(let f of new Set([...Object.keys(o),...Object.keys(l)]))s(o[f],l[f],p+1);return}o!==l&&(a+=1)}};return s(u.config,r,0),a}function Rl(){u.defaults&&(u.defaults.config&&(u.config=wt(u.defaults.config),Ne()),Object.entries(u.defaults.cssTokens||{}).forEach(([r,a])=>{a&&je(r,a)}),tc(),Ne(),lr(),Pe(),fe(),Be())}function Jh({syncImages:r=!1}={}){Be({syncImages:r})}let Rt=Zp({document,window,getConfig:()=>u.config,syncImages:yd,metrics:u.performance}),ft=Jp({document,window,getConfig:()=>u.config,getDocument:()=>Xh(),metrics:u.performance});function Xh(){try{let a=Rt.scalevTarget?.()?.pageDisplayValues?.htmlDocument;if(typeof a=="string"&&a.length>1e3)return a}catch{}return null}function Be({syncImages:r=!1,force:a=!1}={}){Rt.request({images:r,force:a})}function ed(r){if(!r)return"";let a=new Date(r);if(Number.isNaN(a.getTime()))return"";let s=o=>String(o).padStart(2,"0");return a.getFullYear()+"-"+s(a.getMonth()+1)+"-"+s(a.getDate())+"T"+s(a.getHours())+":"+s(a.getMinutes())}function td(r){if(!r)return"";let a=new Date(r),s=p=>String(p).padStart(2,"0"),o=-a.getTimezoneOffset(),l=o>=0?"+":"-";return r+":00"+l+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function we(r,a){let s=a?[a]:[dn()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let p of s){let f=l.exec(p||"");if(f)return f[1].trim()}return""}function yi(r,a){let s=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function dn(){let r=[],a=U("css");return a&&r.push(a),[U("html"),U("head")].forEach(s=>{let o=String(s||""),l=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,p;for(;p=l.exec(o);)p[1]&&r.push(p[1])}),r.join(`
`)}function id(r){let a=String(r||"").trim(),s=a.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(s){let l=s[1];l.length===3&&(l=l.split("").map(f=>f+f).join(""));let p=parseInt(l,16);return[p>>16&255,p>>8&255,p&255].join(", ")}let o=a.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i);return o?[o[1],o[2],o[3]].join(", "):""}function Ml(r,a,s){let o=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(l,"$1"+s+"$3")}function Fl(r,a){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,a),o.body?.style?.setProperty(r,a),o.querySelector("[data-sve-template]")?.style?.setProperty(r,a)}catch{}};C("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function je(r,a){let s=["css","head","html"],o=null;for(let w of s)if(yi(U(w),r)){o=w;break}if(!o)return!1;let l=U(o),p=Ml(l,r,a),f=r+"-rgb",y=id(a);return y&&yi(l,f)&&(p=Ml(p,f,y)),p===l?!1:(ht(o,p),Fl(r,a),y&&yi(l,f)&&Fl(f,y),Be(),!0)}function ir(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function he(r){let a=String(r?.type||"text").trim().toLowerCase();return a==="datetime-local"?"datetime":a==="checkbox"?"boolean":a}function rd(r,a){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||tn(r,a)}function Ol(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return wt(r.default);let a=he(r);return a==="boolean"?!1:""}function nd(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function ad(r){let a=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&a.push(`${s}="${T(r[s])}"`)}),r?.placeholder&&a.push(`placeholder="${T(r.placeholder)}"`),a.join(" ")}function sd(r){let a=String(r?.help||r?.description||"").trim();return a?`
        <small class="field-help">
          ${T(a)}
        </small>
      `:""}function od(r,a){let s=j(u.config,a),o=he(r),l=tn(r,a),p=rd(r,a),f=l?Nt()||s||"":s??"",y=`data-field-path="${T(a)}" data-field-type="${T(o)}" aria-label="${T(r?.label||a)}" `+(p?'data-field-readonly="1" ':""),w=ad(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${y}
          ${w}
          ${p?'readonly aria-readonly="true"':""}
        >${T(f)}</textarea>
        ${l?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let E=nd(r);return`
        <select
          class="content-control content-control-select"
          ${y}
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

          ${E.map(A=>`
              <option
                value="${T(A.value)}"
                ${String(f??"")===A.value?"selected":""}
              >
                ${T(A.label)}
              </option>
            `).join("")}
        </select>
      `}if(o==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${y}
            ${f===!0?"checked":""}
            ${p?'disabled aria-disabled="true"':""}
          >

          <span>
            ${T(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(o==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${y}
          ${w}
          value="${T(ed(f))}"
          ${p?'readonly aria-readonly="true"':""}
        >
      `;if(o==="url")return`
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${y}
            ${w}
            value="${T(f)}"
            ${p?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let k=["email","tel","number","date","time","color"].includes(o)?o:"text";return`
      <input
        class="content-control content-control-${k}"
        type="${k}"
        ${y}
        ${w}
        ${l?'data-auto-wedding-id="1"':""}
        value="${T(f)}"
        ${p?'readonly aria-readonly="true"':""}
      >
      ${l?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Dl(r,a){let s=a||r.path,o=T(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${od(r,s)}

        ${sd(r)}
      </div>
    `}function vi(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let a=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(a))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function Vl(r){if(!r||typeof r!="object")return[];let a=u.repeaterContentFieldCache.get(r);if(a)return a;let s=(r?.fields||[]).filter(o=>he(o)!=="repeater"&&he(o)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function ld(r){if(Bl(r,j(u.config,r.path)))return Ol(r.fields[0]);let a={};return(r.fields||[]).forEach(s=>{s?.key&&(a[s.key]=Ol(s))}),a}function Bl(r,a){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(a)&&a.length?a:j(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function cd(r,a,s){let o=String(r?.itemLabelKey||"").trim(),p=[o?a?.[o]:"",a?.title,a?.name,a?.label,a?.event,a?.provider].find(f=>String(f??"").trim());return String(p??"").trim()||(r.label||"Item")+" "+(s+1)}function ud(r){return(r?.fields||[]).some(s=>he(s)==="repeater"||he(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function pd(r,a=null){let s=j(u.config,r.path),o=Array.isArray(s)?s:[],l=Number.isFinite(r.max)?r.max:999;return ud(r)+o.map((p,f)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${T(cd(r,p,f))}
              </strong>

              ${r.canDelete!==!1&&o.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${T(r.path)}"
                      data-repeat-index="${f}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${Vl(r).map(y=>{let w=Bl(r,o)?r.path+"."+f:r.path+"."+f+"."+y.key;if(vi(y)){let k=a?.get(w);return k?yn(k):""}return Dl({...y,type:y.type||"text"},w)}).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&o.length<l?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${T(r.path)}"
            >
              + Tambah
              ${T(r.label||"Item")}
            </button>
          `:"")}function ki(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function hd(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function rr(r){if(!r||typeof r!="object")return[];let a=u.contentFieldCache.get(r);if(a)return a;let s=(r.fields||[]).filter(o=>!(o.type==="repeater"&&Vl(o).length===0));return u.contentFieldCache.set(r,s),s}function dd(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return gi().forEach(a=>{let s=X(a),o="";try{o=JSON.stringify(a).toLowerCase()}catch{o=[s,a?.label||"",...rr(a).flatMap(p=>[p?.label||"",p?.path||"",...(p?.fields||[]).flatMap(f=>[f?.label||"",f?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),u.contentSearchIndex=r,r}function nr(r){r&&u.contentSectionHtmlCache.delete(String(r))}function ar(r){let a=X(r);if(!a)return jl(r);if(u.contentSectionHtmlCache.has(a))return u.contentSectionHtmlCache.get(a);let s=jl(r);return u.contentSectionHtmlCache.set(a,s),s}function Qt(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function fn(r){if(!r)return;let a=C("[data-section-card]",r).filter(o=>S("[data-section-body]",o)?.dataset.loaded==="1"),s=a.length-u.contentMaxMountedSections;s<=0||a.filter(o=>!o.classList.contains("open")).sort((o,l)=>Number(o.dataset.contentUse||0)-Number(l.dataset.contentUse||0)).slice(0,s).forEach(o=>{let l=S("[data-section-body]",o);l&&(l.replaceChildren(),l.dataset.loaded="0")})}function fd(){if(u.contentPrewarmScheduled||!u.config||!Zi())return;let r=gi();if(!r.length)return;u.contentPrewarmScheduled=!0;let a=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let o=2;for(;u.contentPrewarmCursor<r.length&&o>0;){let l=r[u.contentPrewarmCursor++],p=X(l);if(p&&!u.contentSectionHtmlCache.has(p)&&ar(l),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=zt(a,1200))};u.contentPrewarmHandle=zt(a,1200)}function jl(r){let a=rr(r),s=new Map(xn(r).map(f=>[f.path,f])),o=[],l="",p=f=>{let y=String(f||"").trim();return!y||y===l?"":(l=y,`
        <div class="sv-category" data-sv-category="${T(y)}">
          ${T(y)}
        </div>
      `)};return a.forEach(f=>{let y=String(f.category||"").trim();if(y||(l=""),vi(f)&&he(f)!=="repeater-image"){let w=s.get(f.path);w&&o.push(p(y)+yn(w));return}if(he(f)==="repeater-image"){let w=Array.isArray(j(u.config,f.path))?j(u.config,f.path):[],k=Number.isFinite(f.max)?f.max:999,E=[...s.values()].filter(_=>_.rootPath===f.path).map(yn).join(""),A=f.canAdd!==!1&&w.length<k?`
              <button
                type="button"
                class="button full"
                data-repeat-add="${T(f.path)}"
              >
                + Tambah
                ${T(f.label||"Foto")}
              </button>
            `:"";(E||A)&&o.push(p(y)+E+A);return}if(f.type==="repeater"){let w=y?"":`
            <div class="group-title">
              ${T(f.label||"Daftar")}
            </div>
          `;o.push(p(y)+`
            <div class="group">
              ${w}
              <div class="group-body">
                ${pd(f,s)}
              </div>
            </div>
          `);return}o.push(p(y)+`
          <div class="group">
            <div class="group-title">
              ${T(f.label||f.path)}
            </div>

            <div class="group-body">
              ${Dl({...f,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),o.join("")}function Ul(r){return gi().find(a=>X(a)===r)||null}function md(r){if(!r)return;let a=S("[data-section-body]",r);if(!a||a.dataset.loaded==="1")return;let s=Ul(r.dataset.sectionCard);s&&(a.innerHTML=ar(s),a.dataset.loaded="1",Qt(r),fn(r.closest("#"+e+"-body")))}function mn(r){if(!r)return;let a=r.closest("#"+e+"-body");a&&(C("[data-section-card].open",a).forEach(s=>{s!==r&&(s.classList.remove("open"),S(".chev",s)?.setAttribute("aria-expanded","false"),Qt(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),S(".chev",r)?.setAttribute("aria-expanded","true"),md(r),Qt(r),fn(a))}function Hl(r){if(!r)return;let a=S("[data-section-body]",r),s=Ul(r.dataset.sectionCard);!a||!s||(nr(r.dataset.sectionCard),a.innerHTML=ar(s),a.dataset.loaded="1",Qt(r))}function zl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let a=u.contentCommitMessage;u.contentCommitMessage="",bi(a||void 0,{validate:!1,deferPreview:!0})},100)}function Te(r=""){let a=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!a&&!r?!0:bi(s||void 0,{validate:!0,deferPreview:!0})}function Wl(){let r=u.dashboardPin,a=pn(),s=r.status==="ready"&&r.pin&&r.slug===a,o="Belum diambil",l="idle";return a?r.busy||r.status==="loading"?(o="Memuat\u2026",l="loading"):r.status==="needkey"?(o="Perlu kunci",l="warn"):r.status==="error"?(o="Gagal",l="error"):s&&(o="Aktif",l="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${l}">${o}</span>`}function Gl(){if(!u.config)return ki();if(!Zi())return hd();let r=gi(),a=dd(),s=r.filter(o=>u.search?(a.get(X(o))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${Wl()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Nl()}</div>
      </div>

      ${s.map(o=>{let l=X(o),p=o.label||l,f=Yt(o),y=!o.visiblePath||j(u.config,o.visiblePath)!==!1,w=rr(o),k=!u.search&&u.contentOpenSections.has(l);return`
            <article
              class="section ${f?"section-sortable":"section-pinned"}${k?" open":""}"
              data-section-card="${T(l)}"
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
                    data-section-drag="${T(l)}"
                    draggable="${f?"true":"false"}"
                    ${f?"":"disabled"}
                    aria-label="Drag ${T(p)}"
                    title="${f?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${th()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${T(l)}"
                    ${Xi(l,-1)?"":"disabled"}
                    aria-label="Naikkan ${T(p)}"
                    title="Naik"
                  >
                    ${ul("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${T(l)}"
                    ${Xi(l,1)?"":"disabled"}
                    aria-label="Turunkan ${T(p)}"
                    title="Turun"
                  >
                    ${ul("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${T(p)}
                  </strong>

                  <small>
                    ${f?"Drag / \u2191\u2193 \xB7 ":"Pinned \xB7 "}
                    ${w.length}
                    pengaturan
                  </small>
                </div>

                <div class="section-actions">
                  ${o.canHide&&o.visiblePath?`
                        <label class="switch-wrap">
                          <input
                            type="checkbox"
                            data-visible-path="${T(o.visiblePath)}"
                            ${y?"checked":""}
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
                  ${cl("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${T(l)}"
                data-loaded="${k?"1":"0"}"
              >
                ${k?ar(o):""}
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
    `}function gn(){return Ae().flatMap(r=>r.fields||[]).filter(r=>he(r)==="repeater-image"&&r?.path)}function Ex(){return gn()[0]||null}function gd(r){let a=String(r||"").trim();return a&&gn().find(s=>String(s.path||"").trim()===a)||null}function bn(r){let a=Array.isArray(r?.fields)?r.fields:[];return a.find(s=>s?.key&&vi(s))||a.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function ql(r){let a=String(r||"").trim();if(!a)return null;for(let s of gn()){let o=String(s.path||"").trim(),l=o+".";if(!o||!a.startsWith(l))continue;let p=a.slice(l.length).split(".");if(p.length!==2)continue;let f=Number(p[0]);if(!Number.isInteger(f)||f<0)continue;let y=bn(s),w=String(y?.key||"src");if(p[1]===w)return{field:s,imageField:y,imageKey:w,rootPath:o,index:f}}return null}function Kl(r){return u.doc?!!C('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function xn(r){let a=[],s=new Set;return(r?[r]:Ae()).forEach(o=>{(o.fields||[]).forEach(l=>{if(vi(l)&&l.type!=="repeater-image"&&l.path&&!s.has(l.path)&&(a.push({label:l.label||Gt(l.path),path:l.path,gallery:!1,wrapped:Kl(l.path)}),s.add(l.path)),l.type==="repeater"&&l.path){let p=j(u.config,l.path),f=(l.fields||[]).filter(y=>vi(y)&&y.key);Array.isArray(p)&&f.length&&p.forEach((y,w)=>{f.forEach(k=>{let E=l.path+"."+w+"."+k.key;s.has(E)||(a.push({label:(o.label||l.label||Gt(l.path))+" "+(w+1)+" \xB7 "+(k.label||Gt(k.key)),path:E,gallery:!1,wrapped:Kl(E)}),s.add(E))})})}if(he(l)==="repeater-image"&&l.path){let p=j(u.config,l.path),f=bn(l),y=String(f?.key||"src");Array.isArray(p)&&p.forEach((w,k)=>{let E=l.path+"."+k+"."+y;s.has(E)||(a.push({label:(l.label||"Foto Gallery")+" "+(k+1),path:E,gallery:!0,index:k,rootPath:l.path,imageKey:y,wrapped:!0}),s.add(E))})}})}),u.doc&&C('[data-sve-type="image"][data-sve-field]',u.doc).forEach(o=>{let l=o.getAttribute("data-sve-field");if(!l||s.has(l))return;let p=ql(l),f=!!p;a.push({label:o.getAttribute("data-sve-label")||Gt(l),path:l,gallery:f,index:p?p.index:null,rootPath:p?p.rootPath:null,imageKey:p?p.imageKey:null,wrapped:!!o.closest("[data-sve-image-wrapper]")}),s.add(l)}),a}function Yl(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function Zt(r){let a=u.config?.imageSettings,s=a&&typeof a=="object"?a[r]:null,o=ql(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:eh(s?.fit),alignPos:Xr.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function Jt(r,a){let s=Yl();s[r]={...Zt(r),...a}}function bd(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let a=new Set(xn().map(s=>s.path));Object.keys(r).forEach(s=>{a.has(s)||delete r[s]})}function xd(){let r=U("css");if(!r)return;let a=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return a!==r.trim()?(ht("css",a),!0):!1}function yd(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let l=Zt(o),p=s.closest("[data-sve-image-wrapper]"),f=p||s,y=l.align==="left"?"0":"auto",w=l.align==="right"?"0":"auto";p?(p.style.display=l.hidden?"none":"",p.style.width=l.width+"%",p.style.maxWidth="100%",p.style.marginLeft=y,p.style.marginRight=w,s.style.width="100%"):(s.style.display=l.hidden?"none":"",s.style.width=l.width+"%",s.style.maxWidth="100%",s.style.marginLeft=y,s.style.marginRight=w),l.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=l.fit;let k=Xp[l.alignPos]||"";k?s.style.objectPosition=k:s.style.removeProperty("object-position"),s.style.height="100%"})}function Ax(){Rt.request({images:!0})}function vd(r){let a={"top left":`
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
    `}function kd(r){let a=Zt(r.path),s=l=>l==="left"?`
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
        `:l==="right"?`
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
              ${Xr.filter(l=>l!=="default").map(l=>`
            <button
              type="button"
              class="advance-pos-btn ${a.alignPos===l?"active":""}"
              data-image-alignpos-path="${T(r.path)}"
              data-image-alignpos="${T(l)}"
              title="${T(l)}"
              aria-label="${T("Posisi "+l)}"
            >
              ${vd(l)}
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
    `}function Sd(){return`
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
    `}function wd(){return`
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
    `}function Ql(){return`
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
    `}function Cd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${Ql()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function Ed(){return`
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
    `}function Ad(r,a){let s=j(u.config,r);if(!Array.isArray(s)||a<0||a>=s.length)return;let o=gd(r),l=bn(o),p=String(l?.key||"src"),f=Yl(),y={};for(let w=0;w<s.length;w++){let k=r+"."+w+"."+p;Object.prototype.hasOwnProperty.call(f,k)&&(y[w]=wt(f[k]))}s.splice(a,1),Object.keys(f).forEach(w=>{w.startsWith(r+".")&&w.endsWith("."+p)&&delete f[w]});for(let w=0;w<s.length;w++){let k=w<a?w:w+1,E=y[k];E&&(f[r+"."+w+"."+p]=E)}bd(),Ne("Foto gallery dihapus"),fe()}function Td(r){u.config&&(Ye(u.config,r,""),Jt(r,{hidden:!0}),Ne("Gambar dihapus"),fe())}function yn(r){let a=j(u.config,r.path)||"",s=Zt(r.path),l=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!r.gallery?`data-gallery-delete-index="${T(r.rootPath)}" data-gallery-index="${Number(r.index)}"`:`data-image-delete-path="${T(r.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${wd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${T(r.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${Ed()}
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
                      `:Cd(r.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${T(r.label)}">
                    ${T(r.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${T(r.path)}">
                    CONFIG.${T(r.path)}
                  </p>
                </div>

                ${l}
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
                  ${Sd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${r.gallery?(()=>{let f=r.path.replace(/\.src$/,".alt"),y=j(u.config,f)||"";return`
                        <div class="image-alt-row">
                          <input
                            type="text"
                            data-field-path="${T(f)}"
                            data-field-type="text"
                            value="${T(y)}"
                            placeholder="Deskripsi foto (alt)"
                            aria-label="Deskripsi foto ${Number(r.index)+1}"
                          >
                        </div>
                      `})():""}

              ${kd(r)}
            </div>
          `}function Si(r,a){let s=r?.closest(".image-card");if(!s)return;let o=S(".image-preview-shell",s);if(!o)return;let l=r.value.trim(),p=Zt(a),f=S(".preview",o);if(l){if(!f||f.tagName!=="IMG"){let y=document.createElement("img");y.className="preview",y.alt="",f?f.replaceWith(y):o.prepend(y),f=y}f.src=l}else{if(!f||f.tagName!=="BUTTON"||!f.classList.contains("image-upload-placeholder")){let y=document.createElement("button");y.type="button",y.className="preview empty image-upload-placeholder",y.dataset.imageFocus=a,y.setAttribute("aria-label","Masukkan URL gambar"),f?f.replaceWith(y):o.prepend(y),f=y}f.innerHTML=`
        <span class="image-upload-icon">
          ${Ql()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,f.onclick=()=>{r.focus(),r.select?.()}}f.style.width="100%",f.style.height="100%",f.style.maxWidth="none",f.style.aspectRatio="auto",f.style.objectFit="cover",f.style.marginLeft="0",f.style.marginRight="0",s.classList.toggle("image-card-hidden",p.hidden)}function sr(r,a){let s=Zt(a);C(`[data-image-align-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlign===s.align)}),C(`[data-image-fit-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageFit===s.fit)}),C(`[data-image-alignpos-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlignpos===s.alignPos)});let o=S(`[data-image-width-path="${CSS.escape(a)}"]`,r),l=S(`[data-image-width-number="${CSS.escape(a)}"]`,r);o&&(o.value=s.width),l&&(l.value=s.width)}function _d(r){let a=String(r||"").trim();if(!a||/^var\(/i.test(a))return!1;try{return CSS.supports("color",a)}catch{return/^#[0-9a-f]{3,8}$/i.test(a)}}function wi(r,a="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let l=o[1];return l.length===3&&(l=l.split("").map(p=>p+p).join("")),"#"+l.slice(0,6).toLowerCase()}try{let l=document.createElement("span");if(l.style.color=s,!l.style.color)return a;l.style.position="fixed",l.style.left="-9999px",document.body.appendChild(l);let p=getComputedStyle(l).color;l.remove();let f=p.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!f)return a;let y=w=>Math.max(0,Math.min(255,Math.round(Number(w)))).toString(16).padStart(2,"0");return"#"+y(f[1])+y(f[2])+y(f[3])}catch{return a}}function Ld(){return L.some(([,,r])=>!!we(r))}function Id(r,a){let s=we(a);if(!s)return`
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
      `;let o=wi(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${T(a)}"
          value="${T(o)}"
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
    `}function $d(){return u.config?Ld()?[...new Set(L.map(a=>a[0]))].map(a=>`
            <div class="group">
              <div class="group-title">
                ${a}
              </div>

              ${L.filter(s=>s[0]===a).map(([,s,o])=>Id(s,o)).join("")}
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
      `:ki()}let Pd={"playwrite brasil guides":"Playwrite BR Guides"};function vn(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function kn(r){let a="";try{a=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{a=String(r||"").replace(/\+/g," ")}return vn(a.split(":")[0].replace(/\s+/g," "))}function Ci(r){let a=vn(r);return a?Pd[a.toLowerCase()]||a:""}function Nd(r){let a=String(r||"").trim();if(!a)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(a))try{let o=new URL(a),l=o.hostname.toLowerCase();if(l==="fonts.google.com"||l==="www.fonts.google.com"){let p=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(p?.[1])return{family:Ci(kn(p[1])),isUrl:!0,valid:!0};let f=o.searchParams.get("family");return f?{family:Ci(kn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(l==="fonts.googleapis.com"){let f=o.searchParams.getAll("family")[0]||"";return f?{family:Ci(kn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=a.split(",")[0];return{family:Ci(vn(s)),isUrl:!1,valid:!0}}function Rd(r,a=""){let s=Ci(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),l=String(a||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(l?":wght@"+encodeURIComponent(l):"")+"&display=swap"}function Sn(r,a=""){let s=Rd(r,a);return s?new Promise(o=>{let l=e+"-font-validation-link";document.getElementById(l)?.remove();let p=document.createElement("link"),f=!1,y=k=>{f||(f=!0,clearTimeout(w),p.onload=null,p.onerror=null,o(k))},w=setTimeout(()=>{y({ok:!1,reason:"timeout"})},7e3);p.id=l,p.rel="stylesheet",p.href=s,p.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let k=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!k||k.length===0){y({ok:!1,reason:"font-file"});return}}y({ok:!0,reason:"ok",url:s})}catch{y({ok:!1,reason:"font-file"})}},p.onerror=()=>{y({ok:!1,reason:"stylesheet"})},document.head.appendChild(p)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Md(r,a){let o=or(a,we(a==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),l=await Sn(r,o);return l.ok?{...l,weight:o}:o!=="400"&&(l=await Sn(r,"400"),l.ok)?{...l,weight:"400",normalizedWeight:!0}:(l=await Sn(r,""),l.ok?{...l,weight:"400",normalizedWeight:o!=="400"}:{...l,weight:o})}function Zl(r,a){if(!r)return;let s=Array.isArray(a)?a.filter(Boolean):a?[a]:[];try{let o=r.head||r.documentElement;if(!o)return;s.forEach((l,p)=>{let f=e+"-preview-font-link-"+p,y=r.getElementById(f);y||(y=r.createElement("link"),y.id=f,y.rel="stylesheet",o.appendChild(y)),y.getAttribute("href")!==l&&y.setAttribute("href",l)}),Array.from(r.querySelectorAll('link[id^="'+e+'-preview-font-link"]')).forEach(l=>{s.includes(l.getAttribute("href"))||l.remove()})}catch{}}function Jl(){let r=wn(),a=()=>C("iframe").forEach(s=>{try{Zl(s.contentDocument,r)}catch{}});a(),requestAnimationFrame(a)}function Xl(r){return String(j(u.config,"editorStyle.googleFonts."+r)||"").trim()}function ec(r){let a=Xl(r);if(a)return a;let o=we(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function Fd(r,a){return a==="heading"?"serif":"sans-serif"}function Od(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Dd(r,a){return Y.includes(String(a))}function Vd(r){return Y}function or(r,a){let s=String(a||"").trim();return Y.includes(s)?s:"400"}function Bd(r,a=!1){let s=S("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",l=S(`[data-style-var="${CSS.escape(o)}"]`,s);if(!l)return;let p=we(o)||"400",f=or(r,p);a&&f!==p&&je(o,f),l.innerHTML=ur(f,Y,!1),l.value=f}function wn(){let r=new Map;["heading","body"].forEach(s=>{let o=Xl(s);if(!o)return;let l=o.trim().toLowerCase();if(!l)return;r.has(l)||r.set(l,{family:o,weights:new Set});let f=or(s,we(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(l).weights.add(f)});let a=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),l=Array.from(s.weights).sort((p,f)=>Number(p)-Number(f));return"family="+o+":wght@"+l.join(";")});return a.length?a.map(s=>"https://fonts.googleapis.com/css2?"+s+"&display=swap"):[]}function Tx(){return wn().join("|")}function lr(){let r=wn(),a="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r.length){if(u.editors.head){let f=U("head");o.test(f)&&ht("head",f.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),C("iframe").forEach(f=>{try{Zl(f.contentDocument,[])}catch{}});return}let l=`${a}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${r.map(f=>`<link rel="stylesheet" href="${f}">`).join(`
`)}
${s}`;if(u.editors.head){let f=U("head");f=o.test(f)?f.replace(o,l):f.trimEnd()+`

`+l+`
`,ht("head",f)}let p=Array.from(document.querySelectorAll('link[id^="'+e+'-font-link"]'));r.forEach((f,y)=>{let w=y===0?e+"-font-link":e+"-font-link-"+y,k=document.getElementById(w);k||(k=document.createElement("link"),k.id=w,k.rel="stylesheet",document.head.appendChild(k)),k.href=f}),p.forEach(f=>{r.includes(f.href)||f.remove()}),Jl()}async function cr(r){let a=S("#"+e+"-"+r+"-font");if(!a)return;let s=Nd(a.value);if(!s.valid||!s.family)return;let o=s.family;a.value=o;let l=await Md(o,r);if(!l.ok){l.reason==="stylesheet"||l.reason==="font-file"||l.reason;return}let p=r==="heading"?"--sve-font-heading":"--sve-font-body",f=r==="heading"?"--sve-heading-weight":"--sve-body-weight";l.normalizedWeight&&l.weight&&je(f,l.weight),Ye(u.config,"editorStyle.googleFonts."+r,o),Ne(),je(p,`"${o}", ${Fd(o,r)}`),Bd(r,!1),lr(),Jl(),Be()}function ur(r,a,s=!0,o=!1){let l=String(r||"").trim(),p=s&&l&&!a.includes(l)?[l,...a]:[...a];return o&&(p=[...new Set(p)].sort((f,y)=>{let w=Number.parseFloat(f),k=Number.parseFloat(y);return Number.isFinite(w)&&Number.isFinite(k)?w-k:String(f).localeCompare(String(y))})),p.map((f,y)=>{let w=a.includes(l)||s?f===l:y===0;return`
            <option
              value="${T(f)}"
              ${w?"selected":""}
            >
              ${T(f)}
            </option>
          `}).join("")}function jd(r){let a=we(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${ur(a,B,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${ur(a,J,!1)}
        </select>
      `;if(r.type==="weight"){let s=Od(r.variable),o=s?Vd(s):Y,l=s?or(s,a):a;return`
        <select
          class="style-select"
          data-style-var="${T(r.variable)}"
        >
          ${ur(l,o,!1)}
        </select>
      `}return""}function tc(){if(!u.config)return!1;let r=u.defaults?.cssTokens||{},a=!1;return xe.forEach(({target:s,variable:o})=>{let l=typeof r[o]=="string"?r[o].trim():"",p=j(u.config,"editorStyle.googleFonts."+s),f=typeof p=="string"&&p.trim()!=="";l&&(je(o,l),a=!0),f&&(Ye(u.config,"editorStyle.googleFonts."+s,""),a=!0)}),a}function Ud(){u.config&&(tc(),Q.forEach(r=>{let a=ir(r.variable)||r.fallback;je(r.variable,a)}),Ne(),lr(),fe())}function Hd(){return u.config?`
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
            value="${T(ec("heading"))}"
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
            value="${T(ec("body"))}"
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

          ${cl("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${oe.map(r=>{let a=Q.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${T(r.label)}</div>
                  <div class="typography-control-grid">
                    ${a.map(s=>`
                      <div class="typography-control">
                        <label>${T(s.label)}</label>
                        ${jd(s)}
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
    `:ki()}function pr(r){let a=String(r||"").trim().toLowerCase();if(!a)return 0;if(/^\d+$/.test(a))return Math.max(0,Number(a));let s=a.split(":").map(f=>Number(f));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(a.match(/(\d+)h/)?.[1]||0),l=Number(a.match(/(\d+)m/)?.[1]||0),p=Number(a.match(/(\d+)s/)?.[1]||0);return o||l||p?Math.max(0,o*3600+l*60+p):0}function ic(r){let a=String(r||"").trim();if(!a)return 0;try{let s=new URL(a,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let l of o){let p=pr(l);if(p>0)return p}}catch{let o=a.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return pr(o?.[1]||"")}return 0}function Cn(r){let a=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(a/3600),o=Math.floor(a%3600/60),l=a%60,p=f=>String(f).padStart(2,"0");return s>0?s+":"+p(o)+":"+p(l):o+":"+p(l)}function zd(r,a){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(a)||0));if(!s)return s;try{let l=new URL(s,location.href);return l.searchParams.delete("start"),o>0?l.searchParams.set("t",String(o)):l.searchParams.delete("t"),l.hash&&/(?:^#|[&#])t=/i.test(l.hash)&&(l.hash=""),l.toString()}catch{let p=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?p:p+(p.includes("?")?"&":"?")+"t="+o}}function rc(r,a){let s=ic(a),o=S("#"+e+"-audio-start-enabled",r),l=S("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),l&&(l.disabled=s<=0,l.value=Cn(s))}function Wd(){if(!u.config)return ki();let r=Tl(),a=r.path||"assets.audio",s=j(u.config,a),o=typeof s=="string"?s:"",l=ic(o);return`
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
            value="${T(o)}"
            placeholder="https://youtu.be/VIDEO_ID"
            autocomplete="off"
          >

          <div class="audio-start-row">
            <input
              type="checkbox"
              id="${e}-audio-start-enabled"
              class="audio-start-check"
              ${l>0?"checked":""}
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
              value="${T(Cn(l))}"
              placeholder="0:00"
              ${l>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function hr(r,a){(Array.isArray(r)?r:[]).forEach(s=>{a(s),he(s)==="repeater"&&hr(s.fields,a),he(s)==="repeater-image"&&hr(s.fields,a)})}function nc(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},a={html:U("html"),css:U("css"),js:U("js"),head:U("head")},s=(w,k)=>{try{let E=new URL(k,location.origin);if(E.protocol!=="https:"&&E.protocol!=="http:")return;let A=E.origin;if(A===location.origin)return;r[w]?.add(A)}catch{}},o=(w,k)=>{let E=/https?:\/\/[^\s"'<>`)\\]+/g;(String(w||"").match(E)||[]).forEach(A=>s(k,A))};try{let w=new DOMParser().parseFromString(a.html||"","text/html");w.querySelectorAll("img[src], source[src], source[srcset]").forEach(k=>{s("img_src",k.getAttribute("src")||k.getAttribute("srcset")||"")}),w.querySelectorAll("audio[src], video[src]").forEach(k=>s("media_src",k.getAttribute("src")||"")),w.querySelectorAll("iframe[src]").forEach(k=>s("frame_src",k.getAttribute("src")||"")),w.querySelectorAll("script[src]").forEach(k=>s("script_src",k.getAttribute("src")||"")),w.querySelectorAll('link[rel="stylesheet"][href]').forEach(k=>s("style_src",k.getAttribute("href")||"")),w.querySelectorAll('link[rel="manifest"][href]').forEach(k=>s("manifest_src",k.getAttribute("href")||""))}catch{}let l=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,p;for(;p=l.exec((a.css||"")+`
`+(a.head||""));){let w=p[1];/fonts\.gstatic\.com/i.test(w)?s("font_src",w):s("img_src",w)}o(a.head,"style_src");let f=JSON.stringify(u.config||{}),y=j(u.config,"guestbook.endpoint");return y&&s("connect_src",y),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(w=>{let k=j(u.config,w);k&&s("connect_src",k)}),(f.match(/https?:\/\/[^"\\]+/g)||[]).forEach(w=>{/youtube\.com|youtu\.be/i.test(w)?s("frame_src",w):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(w)?s("media_src",w):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(w)?s("font_src",w):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(w)&&s("img_src",w)}),/fonts\.googleapis\.com/i.test(a.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([w,k])=>[w,Array.from(k).sort()]))}function Gd(){return{"Body HTML":U("html"),CSS:U("css"),JavaScript:U("js"),"Additional Head":U("head"),CONFIG:JSON.stringify(u.config||{})}}function ac(r,a,s){let o=Gd(),l=Se(o);l.length?r("Gambar base64 terdeteksi di "+Jr(l)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let p=Ve(o);p.length&&a("Data URI berukuran besar di "+Jr(p)+"; pertimbangkan pindah ke file hosting")}function qd(){let r=[],a=[],s=[],o=ee=>r.push(ee),l=ee=>a.push(ee),p=ee=>s.push(ee);if(u.config?p("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),u.schema?p("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),p("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let f=Array.isArray(u.schema?.sections)?u.schema.sections:[],y=f.map(X).filter(Boolean),w=new Set(y);f.length||o("SVE_SCHEMA custom page belum memiliki section"),y.length!==w.size&&o("SVE_SCHEMA memiliki duplicate section id");let k=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],E=new Set(k);k.length!==E.size&&o("CONFIG.sectionOrder memiliki duplicate id"),y.forEach(ee=>{E.has(ee)||o("sectionOrder belum memuat: "+ee)}),f.forEach(ee=>{let Qe=X(ee);ee.visiblePath&&(le(ee.visiblePath)||o("Unsafe visiblePath pada section "+Qe),u.config&&typeof j(u.config,ee.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+Qe)),hr(ee.fields,Re=>{let Ct=he(Re);$t.has(Ct)||o("Field type tidak didukung: "+Ct+" ("+(Re.path||Re.key||Qe)+")"),Re.path&&!le(Re.path)&&o("Unsafe field path: "+Re.path),(Ct==="repeater"||Ct==="repeater-image")&&!Array.isArray(Re.fields)&&o("Repeater tanpa fields[]: "+(Re.path||Qe)),Ct==="repeater"&&(Re.fields||[]).forEach(Ai=>{let En=he(Ai);(En==="repeater"||En==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(Re.path||Qe)),Ai.key||o("Repeater subfield tanpa stable key: "+(Re.path||Qe))})})});let A=["html","css","js","head"].map(U).join(`
`);/\beval\s*\(/.test(A)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(A)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(A)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(A)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(A)&&o("Kemungkinan secret/private credential terdeteksi"),ac(o,l,p);let _=dn(),W=Q.map(ee=>ee.variable).filter(ee=>!yi(_,ee));W.length?o("Typography role tokens belum lengkap: "+W.join(", ")):p("Semua typography role tokens tersedia");let ye=nc();return Object.values(ye).reduce((ee,Qe)=>ee+Qe.length,0)&&l("External origin terdeteksi; salin CSP manifest ke Scalev Security"),p("Custom page aktif; validasi "+De.length+" section wedding dilewati"),{status:r.length?"BLOCKER":a.length?"WARNING":"PASS",blockers:r,warnings:a,passes:s,csp:ye}}let dr=null;function sc(){let r=["html","css","js","head"].map(U);if(dr&&r.every((o,l)=>o===dr.sources[l]))return dr.report;let a=new DOMParser().parseFromString(r[0],"text/html");a.head.insertAdjacentHTML("beforeend",r[3]);let s=ol({doc:a,scripts:[r[2],...Array.from(a.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(a.querySelectorAll("style"),o=>o.textContent).join(`
`)});return dr={sources:r,report:s},s}function Kd(){let r=sc();if(u.schema?.template?.type==="custom-page"){let O=qd();return O.blockers=[...new Set([...r.blockers,...O.blockers])],O.blockers.length&&(O.status="BLOCKER"),O}let a=[...r.blockers],s=[],o=[],l=O=>a.push(O),p=O=>s.push(O),f=O=>o.push(O);if(u.config?f("CONFIG terbaca sebagai static object"):l("CONFIG tidak terbaca"),u.schema?f("SVE_SCHEMA eksplisit tersedia"):l("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),f("CONFIG JSON-compatible")}catch{l("CONFIG tidak dapat diserialisasi dengan aman")}let y=Array.isArray(u.schema?.sections)?u.schema.sections:[],w=y.map(X).filter(Boolean),k=new Set(w);w.length!==k.size&&l("SVE_SCHEMA memiliki duplicate section id"),De.forEach(O=>{k.has(O)||l("Canonical section hilang: "+O)}),De.every(O=>k.has(O))&&f(De.length+" canonical sections tersedia");let E=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],A=new Set(E);E.length!==A.size&&l("CONFIG.sectionOrder memiliki duplicate id"),De.forEach(O=>{A.has(O)||l("sectionOrder belum memuat: "+O)}),E[0]&&E[0]!=="cover"&&l("Cover wajib menjadi section pertama"),j(u.config,"invitation.isDemo")===!0&&p("Mode Demo AKTIF \u2014 RSVP tamu tidak dikirim ke server. Matikan sebelum dipakai klien."),j(u.config,"invitation.isExclusive")===!0&&p("Undangan Khusus AKTIF \u2014 halaman hanya terbuka dengan link bertoken."),De.filter(O=>O!=="cover").forEach(O=>{typeof j(u.config,"sections."+O)!="boolean"&&l("Boolean visibility tidak valid: sections."+O)}),y.forEach(O=>{let Me=X(O);Me==="cover"?(O.locked!==!0||O.canHide!==!1)&&l("Cover harus locked dan canHide:false"):O.visiblePath&&!le(O.visiblePath)&&l("Unsafe visiblePath pada section "+Me),hr(O.fields,Ze=>{let Ti=he(Ze);$t.has(Ti)||l("Field type tidak didukung: "+Ti+" ("+(Ze.path||Ze.key||Me)+")"),Ze.path&&!le(Ze.path)&&l("Unsafe field path: "+Ze.path),(Ti==="repeater"||Ti==="repeater-image")&&!Array.isArray(Ze.fields)&&l("Repeater tanpa fields[]: "+(Ze.path||Me)),Ti==="repeater"&&(Ze.fields||[]).forEach(dc=>{let fc=he(dc);(fc==="repeater"||fc==="repeater-image")&&l("Nested repeater tidak diizinkan: "+(Ze.path||Me)),dc.key||l("Repeater subfield tanpa stable key: "+(Ze.path||Me))})})});let _=["html","css","js","head"].map(U).join(`
`);/\beval\s*\(/.test(_)&&l("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(_)&&l("new Function() terdeteksi"),/javascript\s*:/i.test(_)&&l("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(_)&&l("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(_)&&l("Kemungkinan secret/private credential terdeteksi"),ac(l,p,f);let W=U("js");/\bconst\s+CONFIG\s*=/.test(W)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(W)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let ye=j(u.config,"sections.rsvp")===!0,nt=j(u.config,"sections.guestbook")===!0,ee=String(j(u.config,"rsvp.endpoint")||""),Qe=j(u.config,"rsvp.enabled"),Re=!!ee||Qe!==void 0;if(ye)if(Re)Qe!==!0&&l("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(ee)||l("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let O=String(j(u.config,"extensions.rsvpBackend.mode")||"none");if(O!=="none"&&O!=="external"&&l("RSVP backend mode harus none atau external"),O==="external"){let Me=String(j(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(Me)||l("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(nt){let O=j(u.config,"guestbook.enabled"),Me=String(j(u.config,"guestbook.endpoint")||"");O!==!0&&l("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(Me)||l("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let Ct=dn(),Ai=Q.map(O=>O.variable).filter(O=>!yi(Ct,O));Ai.length?l("Typography role tokens belum lengkap: "+Ai.join(", ")):f("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(Ct)&&p("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let hc=nc();return Object.values(hc).reduce((O,Me)=>O+Me.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):f("Tidak ada external origin wajib dari scanner"),{status:a.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:a,warnings:s,passes:o,csp:hc}}function Yd(r){return r==="PASS"?`
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
    `}function Qd(){if(!u.config)return ki();let r=Kd(),a=(l,p)=>l.length?`<ul>${l.map(f=>`<li>${T(f)}</li>`).join("")}</ul>`:`<p class="compat-empty">${T(p)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${Yd(r.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${T(s)}</strong>
            </div>
            <small>${T(o)}</small>
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
    `}function Zd(r){let a=[],s=new WeakSet,o=(l,p="CONFIG")=>{if(l!==null){if(typeof l=="object"){if(s.has(l)){a.push("Referensi berulang: "+p);return}s.add(l)}if(Array.isArray(l)){l.forEach((f,y)=>o(f,p+"."+y));return}if(typeof l=="object"){Object.keys(l).forEach(f=>{kt.has(f)&&a.push("Forbidden key: "+p+"."+f),o(l[f],p+"."+f)});return}["string","number","boolean"].includes(typeof l)||a.push("Non-static value: "+p),typeof l=="number"&&!Number.isFinite(l)&&a.push("Non-finite number: "+p)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{a.push("CONFIG gagal round-trip JSON")}return a}function Jd(){let r=u.templateLibrary,a=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(p=>a?[p.name].join(" ").toLowerCase().includes(a):!0);r.status==="idle"&&kl().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,fe())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${T(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",l=s.map(p=>{let f=!!p.sourceUrl,y=p.id===r.importedId;return`
        <article class="library-card${y?" is-active":""}" role="listitem"${y?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${T(p.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${T(String(p.commissionRate))}%</strong> dari harga paket</span>
                <a href="${c}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${y?"danger":"primary"} library-import-button"
                data-library-import="${T(p.id)}"
                ${f?"":"disabled"}
              >${f?y?"Reset":"Gunakan":"Belum siap"}</button>
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
          `:l?`<div class="library-grid" role="list">${l}</div>`:`
              <div class="library-empty" role="status">
                <strong>Belum ada template yang cocok.</strong>
                <span>${a?"Coba kata pencarian lain.":"Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `}function Xd(){let r=S("#"+e+"-search");if(!r)return;let a=u.tab==="library";r.placeholder=a?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",a?"Cari template":"Cari section atau field")}function fe(){let r=performance.now(),a=S("#"+e+"-body");if(!a)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}a.dataset.sveTab=u.tab||"content",u.tab==="library"?a.innerHTML=Jd():u.tab==="content"?a.innerHTML=Gl():u.tab==="colors"?a.innerHTML=$d():u.tab==="style"?a.innerHTML=Hd():u.tab==="audio"?a.innerHTML=Wd():u.tab==="compatibility"?a.innerHTML=Qd():a.innerHTML=Gl(),sf(a),Xd(),u.tab==="content"&&fd(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function ef(r,a){return S('[data-image-path="'+CSS.escape(a)+'"]',r)}let tf="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function oc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(tf),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function rf(r,a){let s=ef(r,a);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):F(o)?(oc(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function nf(r){let a=String(r.dataset.fieldType||"text"),s=r.value;return a==="boolean"?s=!!r.checked:a==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):a==="datetime"&&(s=td(r.value)),s}function lc(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;Ye(u.config,r.dataset.fieldPath,nf(r));let a=r.closest("[data-section-card]");return nr(a?.dataset.sectionCard),Qt(a),u.contentStateDirty=!0,!0}function cc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let a=()=>{C(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;Te(),Al(o.dataset.sectionUp,-1);return}let l=s.target.closest("[data-section-down]");if(l){if(s.preventDefault(),s.stopPropagation(),l.disabled)return;Te(),Al(l.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let p=s.target.closest("[data-repeat-add]");if(p){let k=p.dataset.repeatAdd,E=Ae().flatMap(_=>_.fields||[]).find(_=>(_.type==="repeater"||he(_)==="repeater-image")&&_.path===k),A=j(u.config,k);Array.isArray(A)||(Ye(u.config,k,[]),A=j(u.config,k)),A.push(ld(E||{})),u.contentStateDirty=!0,nr(p.closest("[data-section-card]")?.dataset.sectionCard),Te("Item ditambahkan"),Hl(p.closest("[data-section-card]"));return}let f=s.target.closest("[data-repeat-delete]");if(f){let k=j(u.config,f.dataset.repeatDelete);if(!Array.isArray(k))return;let E=Ae().flatMap(_=>_.fields||[]).find(_=>(_.type==="repeater"||he(_)==="repeater-image")&&_.path===f.dataset.repeatDelete),A=Number.isFinite(E?.min)?E.min:0;if(k.length<=A){Te("Minimal "+A+" item");return}k.splice(Number(f.dataset.repeatIndex),1),u.contentStateDirty=!0,nr(f.closest("[data-section-card]")?.dataset.sectionCard),Te("Item dihapus"),Hl(f.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){let k=Zh(),E=k>0?"Kembalikan "+k+` field ke kondisi terakhir halaman ini dimuat?

Perubahan yang Anda buat setelah itu \u2014 nama, tanggal, rekening, foto, warna \u2014 akan hilang dan tidak bisa dibatalkan.`:`Kembalikan semua pengaturan ke kondisi terakhir halaman ini dimuat?

Perubahan Anda akan hilang dan tidak bisa dibatalkan.`;if(!window.confirm(E))return;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,Rl();return}if(s.target.closest("#"+e+"-team-key-save")){Kh();return}if(s.target.closest("#"+e+"-pin-peek")){hn("peek");return}if(s.target.closest("#"+e+"-pin-generate")){hn("generate");return}if(s.target.closest("#"+e+"-pin-copy")){Qh();return}if(s.target.closest("#"+e+"-pin-changekey")){Yh();return}let w=s.target.closest(".section-head");if(w&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let k=w.closest("[data-section-card]");if(!k)return;let E=!k.classList.contains("open");k.classList.toggle("open",E);let A=k.dataset.sectionCard;E?mn(k):(u.contentOpenSections.delete(A),S(".chev",k)?.setAttribute("aria-expanded","false"),Qt(k),fn(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||lc(o)&&(ft.refresh(u.config),zl()))}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){Ye(u.config,o.dataset.visiblePath,o.checked),zl(o.checked?"Section ditampilkan":"Section disembunyikan");return}lc(o)&&(ft.refresh(u.config),Te("Konten diperbarui"))}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}Te();let l=o.closest("[data-section-card]");l&&(l.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",l.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(l,24,24))}),r.addEventListener("dragend",a),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let l=s.dataTransfer?.getData("text/plain")||S(".section.dragging",r)?.dataset?.sectionCard||"",p=o.dataset.sectionCard;if(!l||l===p)return;let f=Ae().find(k=>X(k)===p);if(p!=="cover"&&!Yt(f))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let y=o.getBoundingClientRect(),w=s.clientY<y.top+y.height/2?"before":"after";p==="cover"&&(w="after"),C(".section.drag-before, .section.drag-after",r).forEach(k=>{k!==o&&(k.classList.remove("drag-before","drag-after"),delete k.dataset.dropPlacement)}),o.dataset.dropPlacement=w,o.classList.toggle("drag-before",w==="before"),o.classList.toggle("drag-after",w==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let l=s.dataTransfer.getData("text/plain"),p=o.dataset.sectionCard,f=o.dataset.dropPlacement||(p==="cover"?"after":"before");s.preventDefault(),a(),Rh(l,p,f)})}function af(r){C("[data-library-import]",r).forEach(a=>{a.onclick=()=>{Lh(a.dataset.libraryImport)}}),S("[data-library-clear]",r)?.addEventListener("click",Ih),S("[data-library-refresh]",r)?.addEventListener("click",async()=>{await kl(!0),u.uiPrepared=!1,fe()})}function Ei(r,a){let s=a+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function sf(r){if(u.tab==="library"){af(r);return}if(u.tab==="content"){cc(r),of(r);return}if(u.tab==="colors"){lf(r);return}if(u.tab==="style"){cf(r);return}if(u.tab==="audio"){uf(r);return}if(u.tab==="compatibility"){pf(r);return}cc(r)}function of(r){if(!Ei(r,"images"))return;r.addEventListener("click",s=>{let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),rf(r,o.dataset.imagePastePath);return}let l=s.target.closest("[data-image-delete-path]");if(l){Td(l.dataset.imageDeletePath);return}let p=s.target.closest("[data-image-open-advance]");if(p){let E=p.dataset.imageOpenAdvance,A=S(`[data-image-card-path="${CSS.escape(E)}"]`,r),_=A?S(".image-advance",A):null;if(_){let W=!_.open;_.open=W,p.setAttribute("aria-expanded",String(W)),p.setAttribute("aria-label",W?"Tutup pengaturan gambar":"Buka pengaturan gambar"),p.title=W?"Tutup pengaturan gambar":"Pengaturan gambar",p.classList.toggle("active",W),W?_.scrollIntoView({block:"nearest",behavior:"smooth"}):p.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let f=s.target.closest("[data-image-align-path]");if(f){let E=f.dataset.imageAlignPath,A=["left","center","right"].includes(f.dataset.imageAlign)?f.dataset.imageAlign:"center";Jt(E,{align:A}),er(),sr(r,E);let _=S(`[data-image-path="${CSS.escape(E)}"]`,r);_&&Si(_,E);return}let y=s.target.closest("[data-image-fit-path]");if(y){let E=y.dataset.imageFitPath,A=ll.includes(y.dataset.imageFit)?y.dataset.imageFit:"auto";Jt(E,{fit:A}),er(),sr(r,E);let _=S(`[data-image-path="${CSS.escape(E)}"]`,r);_&&Si(_,E);return}let w=s.target.closest("[data-image-alignpos-path]");if(w){let E=w.dataset.imageAlignposPath,A=Xr.includes(w.dataset.imageAlignpos)?w.dataset.imageAlignpos:"default";Jt(E,{alignPos:A}),er(),sr(r,E);let _=S(`[data-image-path="${CSS.escape(E)}"]`,r);_&&Si(_,E);return}let k=s.target.closest("[data-gallery-delete-index]");if(k){Ad(k.dataset.galleryDeleteIndex,Number(k.dataset.galleryIndex));return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let p=S(`[data-image-width-number="${CSS.escape(o)}"]`,r);p&&(p.value=s.target.value);return}let l=s.target.dataset.imageWidthNumber;if(l!==void 0){let p=Math.max(0,Math.min(100,Number(s.target.value)||0)),f=S(`[data-image-width-path="${CSS.escape(l)}"]`,r);f&&(f.value=p);return}});let a=(s,o)=>{let l=Math.max(0,Math.min(100,Number(o)||0));Jt(s,{width:l}),er();let p=S(`[data-image-path="${CSS.escape(s)}"]`,r);p&&Si(p,s),sr(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){a(o,s.target.value);return}let l=s.target.dataset.imageWidthNumber;if(l!==void 0){a(l,s.target.value);return}let p=s.target.closest("[data-image-path]");if(!p)return;let f=p.dataset.imagePath,y=p.value.trim(),w=String(j(u.config,f)||"");if(y!==w){if(F(y)){p.value=w,oc(p);return}Ye(u.config,f,y),y&&Jt(f,{hidden:!1}),Ne("Gambar diperbarui"),Si(p,f)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function lf(r){if(!Ei(r,"colors"))return;let a=(o,l,p)=>{let f=o.value.trim();if(!f||!_d(f)){if(p){let w=we(l);w&&(o.value=w)}return}je(l,f);let y=S(`[data-color-var="${CSS.escape(l)}"]`,r);y&&(y.value=wi(f,y.value||"#000000"))},s=o=>{let l=ir(o);if(!l)return;je(o,l);let p=S(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),f=S(`[data-color-var="${CSS.escape(o)}"]`,r);if(p){let y=p.tagName==="SELECT"?Array.from(p.options).map(w=>w.value):[];(!y.length||y.includes(l))&&(p.value=l)}f&&(f.value=wi(l,f.value))};r.addEventListener("click",o=>{let l=o.target.closest("[data-reset-token]");if(l){s(l.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){L.forEach(([,,p])=>{let f=we(p);f&&je(p,ir(p)||f)}),C("[data-color-token-var]",r).forEach(p=>{let f=p.dataset.colorTokenVar,y=we(f);y&&(p.value=y)}),C("[data-color-var]",r).forEach(p=>{p.value=wi(we(p.dataset.colorVar),p.value)});return}}),r.addEventListener("input",o=>{let l=o.target.dataset.colorTokenVar;if(l!==void 0){a(o.target,l,!1);return}let p=o.target.dataset.colorVar;if(p!==void 0){je(p,o.target.value);let f=S(`[data-color-token-var="${CSS.escape(p)}"]`,r);f&&(f.value=o.target.value)}}),r.addEventListener("change",o=>{let l=o.target.dataset.colorTokenVar;l!==void 0&&a(o.target,l,!0)})}function cf(r){if(!Ei(r,"style"))return;let a=(o,l)=>{let p=String(o.value||"").trim();if(p){if((l==="--sve-heading-weight"||l==="--sve-body-weight")&&!Dd(l==="--sve-heading-weight"?"heading":"body",p)){let y=we(l);y&&(o.value=y);return}je(l,p),(l==="--sve-heading-weight"||l==="--sve-body-weight")&&lr()}},s=o=>{let l=ir(o);if(!l)return;je(o,l);let p=S(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),f=S(`[data-color-var="${CSS.escape(o)}"]`,r);if(p){let y=p.tagName==="SELECT"?Array.from(p.options).map(w=>w.value):[];(!y.length||y.includes(l))&&(p.value=l)}f&&(f.value=wi(l,f.value))};r.addEventListener("click",o=>{let l=o.target.closest("[data-reset-token]");if(l){s(l.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){Ud();return}if(o.target.closest("#"+e+"-reset-all")){Rl();return}if(o.target.closest("#"+e+"-heading-font-apply")){cr("heading");return}o.target.closest("#"+e+"-body-font-apply")&&cr("body")}),r.addEventListener("change",o=>{let l=o.target.dataset.styleVar;l!==void 0&&a(o.target,l)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let l=o.target.dataset.styleVar;l!==void 0&&a(o.target,l)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),cr("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),cr("body")))})}function uf(r){if(!Ei(r,"audio"))return;let s=Tl().path||"assets.audio",o=S("#"+e+"-audio-url",r),l=S("#"+e+"-audio-start-enabled",r),p=S("#"+e+"-audio-start-time",r);if(!o)return;let f=()=>{let w=o.value.trim(),k=j(u.config,s);if(typeof k=="string"&&k===w){rc(r,w);return}Ye(u.config,s,w),Ne("Audio diperbarui"),rc(r,w)},y=()=>{if(!l||!p)return;let w=o.value.trim(),k=l.checked?pr(p.value):0,E=zd(w,k);o.value=E,p.disabled=!l.checked,l.checked&&(p.value=Cn(k)),Ye(u.config,s,E),Ne(k>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(f,0)}),o.addEventListener("change",f),l?.addEventListener("change",()=>{p&&(p.disabled=!l.checked,l.checked&&pr(p.value)<=0&&(p.value="0:00",p.focus()),y())}),p?.addEventListener("change",y)}function pf(r){Ei(r,"compat")}function hf(){Object.values(u.editors).forEach(r=>{r&&Qi(r,!0)})}function df(r,a=""){let s=S("#"+e+"-body");if(!s||!Te()||(u.sourceDirty||!u.doc)&&!Pe()||(r=String(r||"").trim(),r&&!le(r)))return!1;let o=r&&xn().find(k=>k.path===r),l=gi(),p=k=>rr(k).some(E=>E.path===r||(E.type==="repeater"||he(E)==="repeater-image")&&r.startsWith(E.path+".")),f=r&&(l.find(k=>X(k)===a&&p(k))||l.find(p))||l.find(k=>X(k)===a);if(!o&&!f)return!1;u.search="";let y=S("#"+e+"-search");y&&(y.value=""),u.open||qt(!0),Kt("content");let w;if(o){let k=S(`[data-section-card="${CSS.escape(X(f))}"]`,s);if(!k)return!1;mn(k),w=S(`[data-image-path="${CSS.escape(r)}"]`,k),w||(w=S(".chev",k))}else{let k=S(`[data-section-card="${CSS.escape(X(f))}"]`,s);if(!k)return!1;mn(k),w=r&&S(`[data-field-path="${CSS.escape(r)}"]`,k),w||(w=S(".chev",k))}return w?(w.focus({preventScroll:!0}),w.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let uc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function ff(r,a,s){if(typeof a!="string"||!a||a.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let o=r?.getAttribute("srcdoc")||"";if(!o)return null;let l=u.canvasPickSources.get(r);if(!l||l.source!==o){let w=document.createElement("template");w.innerHTML=o,l={source:o,root:w.content.querySelector("#scalev-html-mode-preview-root"),scripts:C("script",w.content).map(k=>k.textContent).join(`
`)},u.canvasPickSources.set(r,l)}if(!l.root||!l.scripts.includes(JSON.stringify(s)))return null;let p=l.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(a)}"]`);if(!p)return null;let f=p.matches("[data-sve-field]")?p:p.querySelector("[data-sve-field]")||p.closest("[data-sve-field]"),y=p.closest("[data-section-id], [data-sve-section]");return{path:f?.getAttribute("data-sve-field")||"",sectionHint:y?.getAttribute("data-section-id")||y?.id||y?.getAttribute("data-sve-section")||""}}function mf(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,a=null;window.addEventListener("message",s=>{if(location.href!==r)return;let o=s.data;if(!o||o.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof o.inspectorId!="string"||!o.inspectorId||o.inspectorId.length>256||typeof o.previewId!="string"||o.previewId.length>256)return;let l=C(uc).find(W=>W.contentWindow===s.source);if(!l||!l.sandbox.contains("allow-scripts")||l.sandbox.contains("allow-same-origin"))return;let p=l.getAttribute("srcdoc"),f=location.href,{open:y,tab:w,sourceDirty:k}=u,E=u.performance.configCommitCount,A=U("html"),_=U("js");cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(a=null,location.href!==f||!l.isConnected||!l.matches(uc)||l.contentWindow!==s.source||l.getAttribute("srcdoc")!==p||u.open!==y||u.tab!==w||u.sourceDirty!==k||u.performance.configCommitCount!==E||U("html")!==A||U("js")!==_)return;let W=ff(l,o.inspectorId,o.previewId);W&&(W.path||W.sectionHint)&&df(W.path,W.sectionHint)})})}function gf(){let r="https://wa.me/"+h+"?text="+encodeURIComponent(d);window.open(r,"_blank","noopener,noreferrer")}function bf(){performance.mark("sve-styles-start"),xf(),performance.mark("sve-styles-critical-done"),zt(yf,50)}function xf(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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
 * Pane preview mandiri. Muncul di sebelah kiri dock, mengisi sisa layar, dan
 * hanya saat tombol preview dinyalakan.
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
`,document.head.appendChild(r)}function yf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function vf(){bf();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
    `,document.body.appendChild(r),ft.mount(r);let a=S("#"+e+"-live");a.onclick=()=>{if(ft.isVisible()){ft.hide(),a.classList.remove("active");return}ft.show()&&(a.classList.add("active"),ft.isReady()||(Be({force:!0}),window.setTimeout(()=>ft.ensure(),600)))},ft.onClose(()=>{a.classList.remove("active")}),S("#"+e+"-close").onclick=()=>{qt(!1)},S("#"+e+"-refresh").onclick=()=>{Pe()&&(fe(),Be({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,Pe()&&(fe(),Be({force:!0,syncImages:!0}))},S("#"+e+"-support").onclick=gf;let s=S("#"+e+"-editor-update"),o=S("#"+e+"-update-status"),l=!1,p=!1,f=0,y=null,w=15e3,k=(A,_,W=!1)=>{s.textContent=A,s.title=_,s.setAttribute("aria-label",_),s.disabled=W},E=()=>{f=Date.now()+w,k("Cek Update","Cek update Visual Editor",!0),clearTimeout(y),y=setTimeout(()=>{f=0,!p&&!l&&k("Cek Update","Cek update Visual Editor")},w)};s.addEventListener("click",()=>{if(l){window.open(g,"_blank","noopener");return}if(p||Date.now()<f){o.textContent="Tunggu sebentar";return}l=!1,p=!0,k("Mengecek...","Sedang mengecek update Visual Editor",!0),o.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${x}?check=${Date.now()}`,onload(A){let _=ee=>{l=!1,p=!1,k("Cek Update","Cek update Visual Editor"),o.textContent=ee,E()};if(A.status<200||A.status>=300){_(A.status===403||A.status===429?"Tunggu sebentar":"Gagal cek update");return}let ye=(A.responseText||"").match(/@version\s+([^\s]+)/),nt=ye&&ye[1];if(!nt){_("Gagal cek update");return}nt===t?(l=!1,p=!1,k("Cek Update","Cek update Visual Editor"),o.textContent="Sudah terbaru",E()):(l=!0,p=!1,k("Pasang",`Pasang update Visual Editor versi ${nt}`),o.textContent=`Update tersedia: versi ${nt}.`)},onerror(){l=!1,p=!1,k("Cek Update","Cek update Visual Editor"),o.textContent="Gagal cek update",E()}})}),S("#"+e+"-search").addEventListener("input",fi(A=>{u.search=A.target.value.toLowerCase().trim(),u.uiPrepared=!1,fe()},100)),C(".tab",r).forEach(A=>{A.onclick=()=>{Te()&&Kt(A.dataset.tab)}})}function kf(){let r=fi(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,Wt(),Gi(),ml();let f=Nt();f&&mi(f,{commit:!0,silent:!0}),u.open&&qi(!0);let y=sn();if(y.length!==u.allEditors.length||y.some((w,k)=>w!==u.allEditors[k])){if(u.sourceDirty=!0,!Pe())return;Rt.invalidate(),dl(),u.open?fe():Ki()}},160),a='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(f=>{f.some(y=>!y.target.closest?.("#"+e)&&[...y.addedNodes,...y.removedNodes].some(w=>w instanceof Element&&!w.closest("#"+e)&&(w.matches(a)||w.querySelector(a))))&&r()}),o=null,l=()=>{let f=an();f!==o&&(s.disconnect(),o=f,f&&s.observe(f,{childList:!0,subtree:!0}),r())};new MutationObserver(f=>{l(),f.some(y=>[...y.addedNodes,...y.removedNodes].some(w=>w instanceof Element&&w.id!==e&&!w.closest("#"+e)&&(w.matches(a)||w.querySelector(a))))&&r()}).observe(document.body,{childList:!0}),l(),document.addEventListener("load",f=>{f.target instanceof HTMLIFrameElement&&(Rt.invalidate(),Be({force:!0,syncImages:!0}))},!0),document.addEventListener("click",f=>{let y=f.target.closest?.("button");if(!(!y||y.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(y.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!U("js").includes("SVE_SCHEMA"))){if(!Te()){f.preventDefault(),f.stopImmediatePropagation();return}hf(),sc().blockers.length&&(f.preventDefault(),f.stopImmediatePropagation(),qt(!0),u.uiPrepared=!1,Kt("compatibility"))}},!0),document.addEventListener("keydown",f=>{f.key==="Escape"&&u.open&&document.getElementById(e)?.contains(f.target)&&(qt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",f=>{en(f.target)&&(u.scalevSlug=Pt(f.target.value),sh())},!0),document.addEventListener("change",f=>{if(en(f.target)){let y=Pt(f.target.value);y&&(u.scalevSlug=y,mi(y,{commit:!0}))}},!0),window.addEventListener("resize",fi(()=>{Gi(),u.open&&qi(!0)},80))}function pc(){b()&&(vf(),ml(),mf(),kf(),nn(),requestAnimationFrame(()=>{Gi()}),Ki(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",pc,{once:!0}):pc()})();})();
