// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.27.0
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
(()=>{var ff=Object.create;var da=Object.defineProperty;var mf=Object.getOwnPropertyDescriptor;var gf=Object.getOwnPropertyNames;var bf=Object.getPrototypeOf,xf=Object.prototype.hasOwnProperty;var jt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)da(e,i,{get:t[i],enumerable:!0})},yf=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of gf(t))!xf.call(e,l)&&l!==i&&da(e,l,{get:()=>t[l],enumerable:!(a=mf(t,l))||a.enumerable});return e};var vf=(e,t,i)=>(i=e!=null?ff(bf(e)):{},yf(t||!e||!e.__esModule?da(i,"default",{value:e,enumerable:!0}):i,e));var gp=jt(Vo=>{var mp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Vo.encode=function(e){if(0<=e&&e<mp.length)return mp[e];throw new TypeError("Must be between 0 and 63: "+e)};Vo.decode=function(e){var t=65,i=90,a=97,l=122,p=48,f=57,g=43,x=47,b=26,y=52;return t<=e&&e<=i?e-t:a<=e&&e<=l?e-a+b:p<=e&&e<=f?e-p+y:e==g?62:e==x?63:-1}});var kp=jt(jo=>{var bp=gp(),Bo=5,xp=1<<Bo,yp=xp-1,vp=xp;function Lb(e){return e<0?(-e<<1)+1:(e<<1)+0}function $b(e){var t=(e&1)===1,i=e>>1;return t?-i:i}jo.encode=function(t){var i="",a,l=Lb(t);do a=l&yp,l>>>=Bo,l>0&&(a|=vp),i+=bp.encode(a);while(l>0);return i};jo.decode=function(t,i,a){var l=t.length,p=0,f=0,g,x;do{if(i>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(x=bp.decode(t.charCodeAt(i++)),x===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(x&vp),x&=yp,p=p+(x<<f),f+=Bo}while(g);a.value=$b(p),a.rest=i}});var Rr=jt(he=>{function Pb(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}he.getArg=Pb;var Sp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Nb=/^data:.+\,.+$/;function Ai(e){var t=e.match(Sp);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}he.urlParse=Ai;function Xt(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}he.urlGenerate=Xt;var Rb=32;function Fb(e){var t=[];return function(i){for(var a=0;a<t.length;a++)if(t[a].input===i){var l=t[0];return t[0]=t[a],t[a]=l,t[0].result}var p=e(i);return t.unshift({input:i,result:p}),t.length>Rb&&t.pop(),p}}var Uo=Fb(function(t){var i=t,a=Ai(t);if(a){if(!a.path)return t;i=a.path}for(var l=he.isAbsolute(i),p=[],f=0,g=0;;)if(f=g,g=i.indexOf("/",f),g===-1){p.push(i.slice(f));break}else for(p.push(i.slice(f,g));g<i.length&&i[g]==="/";)g++;for(var x,b=0,g=p.length-1;g>=0;g--)x=p[g],x==="."?p.splice(g,1):x===".."?b++:b>0&&(x===""?(p.splice(g+1,b),b=0):(p.splice(g,2),b--));return i=p.join("/"),i===""&&(i=l?"/":"."),a?(a.path=i,Xt(a)):i});he.normalize=Uo;function wp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Ai(t),a=Ai(e);if(a&&(e=a.path||"/"),i&&!i.scheme)return a&&(i.scheme=a.scheme),Xt(i);if(i||t.match(Nb))return t;if(a&&!a.host&&!a.path)return a.host=t,Xt(a);var l=t.charAt(0)==="/"?t:Uo(e.replace(/\/+$/,"")+"/"+t);return a?(a.path=l,Xt(a)):l}he.join=wp;he.isAbsolute=function(e){return e.charAt(0)==="/"||Sp.test(e)};function Ob(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var a=e.lastIndexOf("/");if(a<0||(e=e.slice(0,a),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}he.relative=Ob;var Cp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Ep(e){return e}function Mb(e){return Ap(e)?"$"+e:e}he.toSetString=Cp?Ep:Mb;function Db(e){return Ap(e)?e.slice(1):e}he.fromSetString=Cp?Ep:Db;function Ap(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function Vb(e,t,i){var a=ct(e.source,t.source);return a!==0||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:ct(e.name,t.name)}he.compareByOriginalPositions=Vb;function Bb(e,t,i){var a;return a=e.originalLine-t.originalLine,a!==0||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:ct(e.name,t.name)}he.compareByOriginalPositionsNoSource=Bb;function jb(e,t,i){var a=e.generatedLine-t.generatedLine;return a!==0||(a=e.generatedColumn-t.generatedColumn,a!==0||i)||(a=ct(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:ct(e.name,t.name)}he.compareByGeneratedPositionsDeflated=jb;function Ub(e,t,i){var a=e.generatedColumn-t.generatedColumn;return a!==0||i||(a=ct(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:ct(e.name,t.name)}he.compareByGeneratedPositionsDeflatedNoLine=Ub;function ct(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Hb(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=ct(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:ct(e.name,t.name)}he.compareByGeneratedPositionsInflated=Hb;function zb(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}he.parseSourceMapInput=zb;function Wb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var a=Ai(i);if(!a)throw new Error("sourceMapURL could not be parsed");if(a.path){var l=a.path.lastIndexOf("/");l>=0&&(a.path=a.path.substring(0,l+1))}t=wp(Xt(a),t)}return Uo(t)}he.computeSourceURL=Wb});var _p=jt(Tp=>{var Ho=Rr(),zo=Object.prototype.hasOwnProperty,Lt=typeof Map<"u";function ut(){this._array=[],this._set=Lt?new Map:Object.create(null)}ut.fromArray=function(t,i){for(var a=new ut,l=0,p=t.length;l<p;l++)a.add(t[l],i);return a};ut.prototype.size=function(){return Lt?this._set.size:Object.getOwnPropertyNames(this._set).length};ut.prototype.add=function(t,i){var a=Lt?t:Ho.toSetString(t),l=Lt?this.has(t):zo.call(this._set,a),p=this._array.length;(!l||i)&&this._array.push(t),l||(Lt?this._set.set(t,p):this._set[a]=p)};ut.prototype.has=function(t){if(Lt)return this._set.has(t);var i=Ho.toSetString(t);return zo.call(this._set,i)};ut.prototype.indexOf=function(t){if(Lt){var i=this._set.get(t);if(i>=0)return i}else{var a=Ho.toSetString(t);if(zo.call(this._set,a))return this._set[a]}throw new Error('"'+t+'" is not in the set.')};ut.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};ut.prototype.toArray=function(){return this._array.slice()};Tp.ArraySet=ut});var $p=jt(Lp=>{var Ip=Rr();function Gb(e,t){var i=e.generatedLine,a=t.generatedLine,l=e.generatedColumn,p=t.generatedColumn;return a>i||a==i&&p>=l||Ip.compareByGeneratedPositionsInflated(e,t)<=0}function Fr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Fr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Fr.prototype.add=function(t){Gb(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Fr.prototype.toArray=function(){return this._sorted||(this._array.sort(Ip.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Lp.MappingList=Fr});var Np=jt(Pp=>{var Ti=kp(),ne=Rr(),Or=_p().ArraySet,qb=$p().MappingList;function je(e){e||(e={}),this._file=ne.getArg(e,"file",null),this._sourceRoot=ne.getArg(e,"sourceRoot",null),this._skipValidation=ne.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=ne.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Or,this._names=new Or,this._mappings=new qb,this._sourcesContents=null}je.prototype._version=3;je.fromSourceMap=function(t,i){var a=t.sourceRoot,l=new je(Object.assign(i||{},{file:t.file,sourceRoot:a}));return t.eachMapping(function(p){var f={generated:{line:p.generatedLine,column:p.generatedColumn}};p.source!=null&&(f.source=p.source,a!=null&&(f.source=ne.relative(a,f.source)),f.original={line:p.originalLine,column:p.originalColumn},p.name!=null&&(f.name=p.name)),l.addMapping(f)}),t.sources.forEach(function(p){var f=p;a!==null&&(f=ne.relative(a,p)),l._sources.has(f)||l._sources.add(f);var g=t.sourceContentFor(p);g!=null&&l.setSourceContent(p,g)}),l};je.prototype.addMapping=function(t){var i=ne.getArg(t,"generated"),a=ne.getArg(t,"original",null),l=ne.getArg(t,"source",null),p=ne.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,a,l,p)===!1||(l!=null&&(l=String(l),this._sources.has(l)||this._sources.add(l)),p!=null&&(p=String(p),this._names.has(p)||this._names.add(p)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:a!=null&&a.line,originalColumn:a!=null&&a.column,source:l,name:p}))};je.prototype.setSourceContent=function(t,i){var a=t;this._sourceRoot!=null&&(a=ne.relative(this._sourceRoot,a)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[ne.toSetString(a)]=i):this._sourcesContents&&(delete this._sourcesContents[ne.toSetString(a)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};je.prototype.applySourceMap=function(t,i,a){var l=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);l=t.file}var p=this._sourceRoot;p!=null&&(l=ne.relative(p,l));var f=new Or,g=new Or;this._mappings.unsortedForEach(function(x){if(x.source===l&&x.originalLine!=null){var b=t.originalPositionFor({line:x.originalLine,column:x.originalColumn});b.source!=null&&(x.source=b.source,a!=null&&(x.source=ne.join(a,x.source)),p!=null&&(x.source=ne.relative(p,x.source)),x.originalLine=b.line,x.originalColumn=b.column,b.name!=null&&(x.name=b.name))}var y=x.source;y!=null&&!f.has(y)&&f.add(y);var v=x.name;v!=null&&!g.has(v)&&g.add(v)},this),this._sources=f,this._names=g,t.sources.forEach(function(x){var b=t.sourceContentFor(x);b!=null&&(a!=null&&(x=ne.join(a,x)),p!=null&&(x=ne.relative(p,x)),this.setSourceContent(x,b))},this)};je.prototype._validateMapping=function(t,i,a,l){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var p="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!a&&!l)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&a)return;var p="Invalid mapping: "+JSON.stringify({generated:t,source:a,original:i,name:l});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}};je.prototype._serializeMappings=function(){for(var t=0,i=1,a=0,l=0,p=0,f=0,g="",x,b,y,v,C=this._mappings.toArray(),u=0,L=C.length;u<L;u++){if(b=C[u],x="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)x+=";",i++;else if(u>0){if(!ne.compareByGeneratedPositionsInflated(b,C[u-1]))continue;x+=","}x+=Ti.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(v=this._sources.indexOf(b.source),x+=Ti.encode(v-f),f=v,x+=Ti.encode(b.originalLine-1-l),l=b.originalLine-1,x+=Ti.encode(b.originalColumn-a),a=b.originalColumn,b.name!=null&&(y=this._names.indexOf(b.name),x+=Ti.encode(y-p),p=y)),g+=x}return g};je.prototype._generateSourcesContent=function(t,i){return t.map(function(a){if(!this._sourcesContents)return null;i!=null&&(a=ne.relative(i,a));var l=ne.toSetString(a);return Object.prototype.hasOwnProperty.call(this._sourcesContents,l)?this._sourcesContents[l]:null},this)};je.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};je.prototype.toString=function(){return JSON.stringify(this.toJSON())};Pp.SourceMapGenerator=je});var kf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],fc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],Sf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",mc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",fa={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},ma="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",wf={5:ma,"5module":ma+" export import",6:ma+" const class extends export import super"},gc=/^in(stanceof)?$/,Cf=new RegExp("["+mc+"]"),Ef=new RegExp("["+mc+Sf+"]");function ba(e,t){for(var i=65536,a=0;a<t.length;a+=2){if(i+=t[a],i>e)return!1;if(i+=t[a+1],i>=e)return!0}return!1}function Qe(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Cf.test(String.fromCharCode(e)):t===!1?!1:ba(e,fc)}function dt(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Ef.test(String.fromCharCode(e)):t===!1?!1:ba(e,fc)||ba(e,kf)}var W=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Fe(e,t){return new W(e,{beforeExpr:!0,binop:t})}var Oe={beforeExpr:!0},Ce={startsExpr:!0},ka={};function z(e,t){return t===void 0&&(t={}),t.keyword=e,ka[e]=new W(e,t)}var m={num:new W("num",Ce),regexp:new W("regexp",Ce),string:new W("string",Ce),name:new W("name",Ce),privateId:new W("privateId",Ce),eof:new W("eof"),bracketL:new W("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new W("]"),braceL:new W("{",{beforeExpr:!0,startsExpr:!0}),braceR:new W("}"),parenL:new W("(",{beforeExpr:!0,startsExpr:!0}),parenR:new W(")"),comma:new W(",",Oe),semi:new W(";",Oe),colon:new W(":",Oe),dot:new W("."),question:new W("?",Oe),questionDot:new W("?."),arrow:new W("=>",Oe),template:new W("template"),invalidTemplate:new W("invalidTemplate"),ellipsis:new W("...",Oe),backQuote:new W("`",Ce),dollarBraceL:new W("${",{beforeExpr:!0,startsExpr:!0}),eq:new W("=",{beforeExpr:!0,isAssign:!0}),assign:new W("_=",{beforeExpr:!0,isAssign:!0}),incDec:new W("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new W("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Fe("||",1),logicalAND:Fe("&&",2),bitwiseOR:Fe("|",3),bitwiseXOR:Fe("^",4),bitwiseAND:Fe("&",5),equality:Fe("==/!=/===/!==",6),relational:Fe("</>/<=/>=",7),bitShift:Fe("<</>>/>>>",8),plusMin:new W("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Fe("%",10),star:Fe("*",10),slash:Fe("/",10),starstar:new W("**",{beforeExpr:!0}),coalesce:Fe("??",1),_break:z("break"),_case:z("case",Oe),_catch:z("catch"),_continue:z("continue"),_debugger:z("debugger"),_default:z("default",Oe),_do:z("do",{isLoop:!0,beforeExpr:!0}),_else:z("else",Oe),_finally:z("finally"),_for:z("for",{isLoop:!0}),_function:z("function",Ce),_if:z("if"),_return:z("return",Oe),_switch:z("switch"),_throw:z("throw",Oe),_try:z("try"),_var:z("var"),_const:z("const"),_while:z("while",{isLoop:!0}),_with:z("with"),_new:z("new",{beforeExpr:!0,startsExpr:!0}),_this:z("this",Ce),_super:z("super",Ce),_class:z("class",Ce),_extends:z("extends",Oe),_export:z("export"),_import:z("import",Ce),_null:z("null",Ce),_true:z("true",Ce),_false:z("false",Ce),_in:z("in",{beforeExpr:!0,binop:7}),_instanceof:z("instanceof",{beforeExpr:!0,binop:7}),_typeof:z("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:z("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:z("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Ee=/\r\n?|\n|\u2028|\u2029/,Af=new RegExp(Ee.source,"g");function Ut(e){return e===10||e===13||e===8232||e===8233}function bc(e,t,i){i===void 0&&(i=e.length);for(var a=t;a<i;a++){var l=e.charCodeAt(a);if(Ut(l))return a<i-1&&l===13&&e.charCodeAt(a+1)===10?a+2:a+1}return-1}var xc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,ue=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,yc=Object.prototype,Tf=yc.hasOwnProperty,_f=yc.toString,Ht=Object.hasOwn||(function(e,t){return Tf.call(e,t)}),cc=Array.isArray||(function(e){return _f.call(e)==="[object Array]"}),uc=Object.create(null);function ht(e){return uc[e]||(uc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function nt(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var If=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,di=function(t,i){this.line=t,this.column=i};di.prototype.offset=function(t){return new di(this.line,this.column+t)};var sr=function(t,i,a){this.start=i,this.end=a,t.sourceFile!==null&&(this.source=t.sourceFile)};function vc(e,t){for(var i=1,a=0;;){var l=bc(e,a,t);if(l<0)return new di(i,t-a);++i,a=l}}var xa={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},pc=!1;function Lf(e){var t={};for(var i in xa)t[i]=e&&Ht(e,i)?e[i]:xa[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!pc&&typeof console=="object"&&console.warn&&(pc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),cc(t.onToken)){var a=t.onToken;t.onToken=function(l){return a.push(l)}}if(cc(t.onComment)&&(t.onComment=$f(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function $f(e,t){return function(i,a,l,p,f,g){var x={type:i?"Block":"Line",value:a,start:l,end:p};e.locations&&(x.loc=new sr(this,f,g)),e.ranges&&(x.range=[l,p]),t.push(x)}}var wt=1,Ct=2,Sa=4,kc=8,wa=16,Sc=32,or=64,wc=128,Et=256,fi=512,Cc=1024,lr=wt|Ct|Et;function Ca(e,t){return Ct|(e?Sa:0)|(t?kc:0)}var ir=0,Ea=1,ot=2,Ec=3,Ac=4,Tc=5,oe=function(t,i,a){this.options=t=Lf(t),this.sourceFile=t.sourceFile,this.keywords=ht(wf[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var l="";t.allowReserved!==!0&&(l=fa[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(l+=" await")),this.reservedWords=ht(l);var p=(l?l+" ":"")+fa.strict;this.reservedWordsStrict=ht(p),this.reservedWordsStrictBind=ht(p+" "+fa.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=a||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):a?(this.lineStart=this.input.lastIndexOf(`
`,a-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Ee).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?Ct:wt),this.regexpState=null,this.privateNameStack=[]},De={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};oe.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};De.inFunction.get=function(){return(this.currentVarScope().flags&Ct)>0};De.inGenerator.get=function(){return(this.currentVarScope().flags&kc)>0};De.inAsync.get=function(){return(this.currentVarScope().flags&Sa)>0};De.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Et|fi))return!1;if(i&Ct)return(i&Sa)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};De.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&wt)};De.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&or)>0||this.options.allowSuperOutsideMethod};De.allowDirectSuper.get=function(){return(this.currentThisScope().flags&wc)>0};De.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};De.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Et|fi)||i&Ct&&!(i&wa))return!0}return!1};De.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&Cc||!this.inModule&&t&wt)};De.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Et)>0};oe.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var a=this,l=0;l<t.length;l++)a=t[l](a);return a};oe.parse=function(t,i){return new this(i,t).parse()};oe.parseExpressionAt=function(t,i,a){var l=new this(a,t,i);return l.nextToken(),l.parseExpression()};oe.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(oe.prototype,De);var me=oe.prototype,Pf=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;me.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){ue.lastIndex=e,e+=ue.exec(this.input)[0].length;var t=Pf.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){ue.lastIndex=e+t[0].length;var i=ue.exec(this.input),a=i.index+i[0].length,l=this.input.charAt(a);return l===";"||l==="}"||Ee.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(l)||l==="!"&&this.input.charAt(a+1)==="=")}e+=t[0].length,ue.lastIndex=e,e+=ue.exec(this.input)[0].length,this.input[e]===";"&&e++}};me.eat=function(e){return this.type===e?(this.next(),!0):!1};me.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};me.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};me.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};me.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};me.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||Ee.test(this.input.slice(this.lastTokEnd,this.start))};me.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};me.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};me.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};me.expect=function(e){this.eat(e)||this.unexpected()};me.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var cr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};me.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};me.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,a=e.doubleProto;if(!t)return i>=0||a>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),a>=0&&this.raiseRecoverable(a,"Redefinition of __proto__ property")};me.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};me.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var P=oe.prototype;P.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var a=0,l=Object.keys(this.undefinedExports);a<l.length;a+=1){var p=l[a];this.raiseRecoverable(this.undefinedExports[p].start,"Export '"+p+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Aa={kind:"loop"},Nf={kind:"switch"};P.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;ue.lastIndex=this.pos;var t=ue.exec(this.input),i=this.pos+t[0].length,a=this.fullCharCodeAt(i);if(a===91||a===92)return!0;if(e)return!1;if(a===123)return!0;if(Qe(a)){var l=i;do i+=a<=65535?1:2;while(dt(a=this.fullCharCodeAt(i)));if(a===92)return!0;var p=this.input.slice(l,i);if(!gc.test(p))return!0}return!1};P.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;ue.lastIndex=this.pos;var e=ue.exec(this.input),t=this.pos+e[0].length,i;return!Ee.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(dt(i=this.fullCharCodeAt(t+8))||i===92))};P.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;ue.lastIndex=this.pos;var i=ue.exec(this.input),a=this.pos+i[0].length;if(Ee.test(this.input.slice(this.pos,a)))return!1;if(e){var l=a+5,p;if(this.input.slice(a,l)!=="using"||l===this.input.length||dt(p=this.fullCharCodeAt(l))||p===92)return!1;ue.lastIndex=l;var f=ue.exec(this.input);if(a=l+f[0].length,f&&Ee.test(this.input.slice(l,a)))return!1}var g=this.fullCharCodeAt(a);if(!Qe(g)&&g!==92)return!1;var x=a;do a+=g<=65535?1:2;while(dt(g=this.fullCharCodeAt(a)));if(g===92)return!0;var b=this.input.slice(x,a);if(gc.test(b))return!1;if(t&&!e&&b==="of"){ue.lastIndex=a;var y=ue.exec(this.input);if(a=a+y[0].length,this.input.charCodeAt(a)!==61||(g=this.input.charCodeAt(a+1))===61||g===62)return!1}return!0};P.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};P.isUsing=function(e){return this.isUsingKeyword(!1,e)};P.parseStatement=function(e,t,i){var a=this.type,l=this.startNode(),p;switch(this.isLet(e)&&(a=m._var,p="let"),a){case m._break:case m._continue:return this.parseBreakContinueStatement(l,a.keyword);case m._debugger:return this.parseDebuggerStatement(l);case m._do:return this.parseDoStatement(l);case m._for:return this.parseForStatement(l);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(l,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(l,!0);case m._if:return this.parseIfStatement(l);case m._return:return this.parseReturnStatement(l);case m._switch:return this.parseSwitchStatement(l);case m._throw:return this.parseThrowStatement(l);case m._try:return this.parseTryStatement(l);case m._const:case m._var:return p=p||this.value,e&&p!=="var"&&this.unexpected(),this.parseVarStatement(l,p);case m._while:return this.parseWhileStatement(l);case m._with:return this.parseWithStatement(l);case m.braceL:return this.parseBlock(!0,l);case m.semi:return this.parseEmptyStatement(l);case m._export:case m._import:if(this.options.ecmaVersion>10&&a===m._import){ue.lastIndex=this.pos;var f=ue.exec(this.input),g=this.pos+f[0].length,x=this.input.charCodeAt(g);if(x===40||x===46)return this.parseExpressionStatement(l,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),a===m._import?this.parseImport(l):this.parseExport(l,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(l,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(l,!1,b),this.semicolon(),this.finishNode(l,"VariableDeclaration");var y=this.value,v=this.parseExpression();return a===m.name&&v.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(l,y,v,e):this.parseExpressionStatement(l,v)}};P.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var a=0;a<this.labels.length;++a){var l=this.labels[a];if((e.label==null||l.name===e.label.name)&&(l.kind!=null&&(i||l.kind==="loop")||e.label&&i))break}return a===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};P.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};P.parseDoStatement=function(e){return this.next(),this.labels.push(Aa),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};P.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Aa),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var a=this.startNode(),l=i?"let":this.value;return this.next(),this.parseVar(a,!0,l),this.finishNode(a,"VariableDeclaration"),this.parseForAfterInit(e,a,t)}var p=this.isContextual("let"),f=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var x=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(x,!0,g),this.finishNode(x,"VariableDeclaration"),this.parseForAfterInit(e,x,t)}var b=this.containsEsc,y=new cr,v=this.start,C=t>-1?this.parseExprSubscripts(y,"await"):this.parseExpression(!0,y);return this.type===m._in||(f=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):f&&this.options.ecmaVersion>=8&&(C.start===v&&!b&&C.type==="Identifier"&&C.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),p&&f&&this.raise(C.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(C,!1,y),this.checkLValPattern(C),this.parseForIn(e,C)):(this.checkExpressionErrors(y,!0),t>-1&&this.unexpected(t),this.parseFor(e,C))};P.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};P.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,hi|(i?0:ya),!1,t)};P.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};P.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};P.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(Nf),this.enterScope(Cc);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var a=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),a?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};P.parseThrowStatement=function(e){return this.next(),Ee.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Rf=[];P.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?Sc:0),this.checkLValPattern(e,t?Ac:ot),this.expect(m.parenR),e};P.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};P.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};P.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Aa),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};P.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};P.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};P.parseLabeledStatement=function(e,t,i,a){for(var l=0,p=this.labels;l<p.length;l+=1){var f=p[l];f.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,x=this.labels.length-1;x>=0;x--){var b=this.labels[x];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(a?a.indexOf("label")===-1?a+"label":a:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};P.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};P.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var a=this.parseStatement(null);t.body.push(a)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};P.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};P.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};P.parseVar=function(e,t,i,a){for(e.declarations=[],e.kind=i;;){var l=this.startNode();if(this.parseVarId(l,i),this.eat(m.eq)?l.init=this.parseMaybeAssign(t):!a&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!a&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!a&&l.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):l.init=null,e.declarations.push(this.finishNode(l,"VariableDeclarator")),!this.eat(m.comma))break}return e};P.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?Ea:ot,!1)};var hi=1,ya=2,_c=4;P.parseFunction=function(e,t,i,a,l){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!a)&&(this.type===m.star&&t&ya&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!a),t&hi&&(e.id=t&_c&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&ya)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?Ea:ot:Ec));var p=this.yieldPos,f=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Ca(e.async,e.generator)),t&hi||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,l),this.yieldPos=p,this.awaitPos=f,this.awaitIdentPos=g,this.finishNode(e,t&hi?"FunctionDeclaration":"FunctionExpression")};P.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};P.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var a=this.enterClassBody(),l=this.startNode(),p=!1;for(l.body=[],this.expect(m.braceL);this.type!==m.braceR;){var f=this.parseClassElement(e.superClass!==null);f&&(l.body.push(f),f.type==="MethodDefinition"&&f.kind==="constructor"?(p&&this.raiseRecoverable(f.start,"Duplicate constructor in the same class"),p=!0):f.key&&f.key.type==="PrivateIdentifier"&&Ff(a,f)&&this.raiseRecoverable(f.key.start,"Identifier '#"+f.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(l,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};P.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),a="",l=!1,p=!1,f="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:a="static"}if(i.static=g,!a&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?p=!0:a="async"),!a&&(t>=9||!p)&&this.eat(m.star)&&(l=!0),!a&&!p&&!l){var x=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?f=x:a=x)}if(a?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=a,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||f!=="method"||l||p){var b=!i.static&&rr(i,"constructor"),y=b&&e;b&&f!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":f,this.parseClassMethod(i,l,p,y)}else this.parseClassField(i);return i};P.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};P.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};P.parseClassMethod=function(e,t,i,a){var l=e.key;e.kind==="constructor"?(t&&this.raise(l.start,"Constructor can't be a generator"),i&&this.raise(l.start,"Constructor can't be an async method")):e.static&&rr(e,"prototype")&&this.raise(l.start,"Classes may not have a static property named prototype");var p=e.value=this.parseMethod(t,i,a);return e.kind==="get"&&p.params.length!==0&&this.raiseRecoverable(p.start,"getter should have no params"),e.kind==="set"&&p.params.length!==1&&this.raiseRecoverable(p.start,"setter should have exactly one param"),e.kind==="set"&&p.params[0].type==="RestElement"&&this.raiseRecoverable(p.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};P.parseClassField=function(e){return rr(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&rr(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(fi|or),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};P.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Et|or);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};P.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,ot,!1)):(t===!0&&this.unexpected(),e.id=null)};P.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};P.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};P.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var a=this.privateNameStack.length,l=a===0?null:this.privateNameStack[a-1],p=0;p<i.length;++p){var f=i[p];Ht(t,f.name)||(l?l.used.push(f):this.raiseRecoverable(f.start,"Private field '#"+f.name+"' must be declared in an enclosing class"))}};function Ff(e,t){var i=t.key.name,a=e[i],l="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(l=(t.static?"s":"i")+t.kind),a==="iget"&&l==="iset"||a==="iset"&&l==="iget"||a==="sget"&&l==="sset"||a==="sset"&&l==="sget"?(e[i]="true",!1):a?!0:(e[i]=l,!1)}function rr(e,t){var i=e.computed,a=e.key;return!i&&(a.type==="Identifier"&&a.name===t||a.type==="Literal"&&a.value===t)}P.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};P.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,a=e.specifiers;i<a.length;i+=1){var l=a[i];this.checkUnreserved(l.local),this.checkLocalExport(l.local),l.local.type==="Literal"&&this.raise(l.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};P.parseExportDeclaration=function(e){return this.parseStatement(null)};P.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,hi|_c,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var a=this.parseMaybeAssign();return this.semicolon(),a}};P.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),Ht(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};P.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var a=0,l=t.properties;a<l.length;a+=1){var p=l[a];this.checkPatternExport(e,p)}else if(i==="ArrayPattern")for(var f=0,g=t.elements;f<g.length;f+=1){var x=g[f];x&&this.checkPatternExport(e,x)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};P.checkVariableExport=function(e,t){if(e)for(var i=0,a=t;i<a.length;i+=1){var l=a[i];this.checkPatternExport(e,l.id)}};P.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};P.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};P.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};P.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=Rf,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};P.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportSpecifier")};P.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportDefaultSpecifier")};P.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportNamespaceSpecifier")};P.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};P.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var a=this.parseImportAttribute(),l=a.key.type==="Identifier"?a.key.name:a.key.value;Ht(t,l)&&this.raiseRecoverable(a.key.start,"Duplicate attribute key '"+l+"'"),t[l]=!0,e.push(a)}return e};P.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};P.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return If.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};P.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};P.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var Ve=oe.prototype;Ve.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var a=0,l=e.properties;a<l.length;a+=1){var p=l[a];this.toAssignable(p,t),p.type==="RestElement"&&(p.argument.type==="ArrayPattern"||p.argument.type==="ObjectPattern")&&this.raise(p.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};Ve.toAssignableList=function(e,t){for(var i=e.length,a=0;a<i;a++){var l=e[a];l&&this.toAssignable(l,t)}if(i){var p=e[i-1];this.options.ecmaVersion===6&&t&&p&&p.type==="RestElement"&&p.argument.type!=="Identifier"&&this.unexpected(p.argument.start)}return e};Ve.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};Ve.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};Ve.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};Ve.parseBindingList=function(e,t,i,a){for(var l=[],p=!0;!this.eat(e);)if(p?p=!1:this.expect(m.comma),t&&this.type===m.comma)l.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var f=this.parseRestBinding();this.parseBindingListItem(f),l.push(f),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else l.push(this.parseAssignableListItem(a))}return l};Ve.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};Ve.parseBindingListItem=function(e){return e};Ve.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var a=this.startNodeAt(e,t);return a.left=i,a.right=this.parseMaybeAssign(),this.finishNode(a,"AssignmentPattern")};Ve.checkLValSimple=function(e,t,i){t===void 0&&(t=ir);var a=t!==ir;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(a?"Binding ":"Assigning to ")+e.name+" in strict mode"),a&&(t===ot&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(Ht(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==Tc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":a&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return a&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(a?"Binding":"Assigning to")+" rvalue")}};Ve.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=ir),e.type){case"ObjectPattern":for(var a=0,l=e.properties;a<l.length;a+=1){var p=l[a];this.checkLValInnerPattern(p,t,i)}break;case"ArrayPattern":for(var f=0,g=e.elements;f<g.length;f+=1){var x=g[f];x&&this.checkLValInnerPattern(x,t,i)}break;default:this.checkLValSimple(e,t,i)}};Ve.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=ir),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var We=function(t,i,a,l,p){this.token=t,this.isExpr=!!i,this.preserveSpace=!!a,this.override=l,this.generator=!!p},ee={b_stat:new We("{",!1),b_expr:new We("{",!0),b_tmpl:new We("${",!1),p_stat:new We("(",!1),p_expr:new We("(",!0),q_tmpl:new We("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new We("function",!1),f_expr:new We("function",!0),f_expr_gen:new We("function",!0,!1,null,!0),f_gen:new We("function",!1,!1,null,!0)},zt=oe.prototype;zt.initialContext=function(){return[ee.b_stat]};zt.curContext=function(){return this.context[this.context.length-1]};zt.braceIsBlock=function(e){var t=this.curContext();return t===ee.f_expr||t===ee.f_stat?!0:e===m.colon&&(t===ee.b_stat||t===ee.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?Ee.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===ee.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};zt.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};zt.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};zt.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===ee.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?ee.b_stat:ee.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(ee.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?ee.p_stat:ee.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==ee.p_stat)&&!(e===m._return&&Ee.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===ee.b_stat)?this.context.push(ee.f_expr):this.context.push(ee.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===ee.q_tmpl?this.context.pop():this.context.push(ee.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===ee.f_expr?this.context[t]=ee.f_expr_gen:this.context[t]=ee.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var R=oe.prototype;R.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var a=e.key,l;switch(a.type){case"Identifier":l=a.name;break;case"Literal":l=String(a.value);break;default:return}var p=e.kind;if(this.options.ecmaVersion>=6){l==="__proto__"&&p==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=a.start):this.raiseRecoverable(a.start,"Redefinition of __proto__ property")),t.proto=!0);return}l="$"+l;var f=t[l];if(f){var g;p==="init"?g=this.strict&&f.init||f.get||f.set:g=f.init||f[p],g&&this.raiseRecoverable(a.start,"Redefinition of property")}else f=t[l]={init:!1,get:!1,set:!1};f[p]=!0}};R.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var a=i.start,l=i.startLoc,p=i.parseMaybeAssign(e,t);if(i.type===m.comma){var f=i.startNodeAt(a,l);for(f.expressions=[p];i.eat(m.comma);)f.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(f,"SequenceExpression")}return p})};R.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var a=!1,l=-1,p=-1,f=-1;t?(l=t.parenthesizedAssign,p=t.trailingComma,f=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new cr,a=!0);var g=this.start,x=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,x)),this.type.isAssign){var y=this.startNodeAt(g,x);return y.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),a||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),y.left=b,this.next(),y.right=this.parseMaybeAssign(e),f>-1&&(t.doubleProto=f),this.finishNode(y,"AssignmentExpression")}else a&&this.checkExpressionErrors(t,!0);return l>-1&&(t.parenthesizedAssign=l),p>-1&&(t.trailingComma=p),b};R.parseMaybeConditional=function(e,t){var i=this.start,a=this.startLoc,l=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return l;if(!(l.type==="ArrowFunctionExpression"&&l.start===i)&&this.eat(m.question)){var p=this.startNodeAt(i,a);return p.test=l,p.consequent=this.parseMaybeAssign(),this.expect(m.colon),p.alternate=this.parseMaybeAssign(e),this.finishNode(p,"ConditionalExpression")}return l};R.parseExprOps=function(e,t){var i=this.start,a=this.startLoc,l=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||l.start===i&&l.type==="ArrowFunctionExpression"?l:this.parseExprOp(l,i,a,-1,e)};R.parseExprOp=function(e,t,i,a,l){var p=this.type.binop;if(p!=null&&(!l||this.type!==m._in)&&p>a){var f=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(p=m.logicalAND.binop);var x=this.value;this.next();var b=this.start,y=this.startLoc,v=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,l),b,y,p,l),C=this.buildBinary(t,i,e,v,x,f||g);return(f&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(C,t,i,a,l)}return e};R.buildBinary=function(e,t,i,a,l,p){a.type==="PrivateIdentifier"&&this.raise(a.start,"Private identifier can only be left side of binary expression");var f=this.startNodeAt(e,t);return f.left=i,f.operator=l,f.right=a,this.finishNode(f,p?"LogicalExpression":"BinaryExpression")};R.parseMaybeUnary=function(e,t,i,a){var l=this.start,p=this.startLoc,f;if(this.isContextual("await")&&this.canAwait)f=this.parseAwait(a),t=!0;else if(this.type.prefix){var g=this.startNode(),x=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,x,a),this.checkExpressionErrors(e,!0),x?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Ic(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&va(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,f=this.finishNode(g,x?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(a||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),f=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(f=this.parseExprSubscripts(e,a),this.checkExpressionErrors(e))return f;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(l,p);b.operator=this.value,b.prefix=!1,b.argument=f,this.checkLValSimple(f),this.next(),f=this.finishNode(b,"UpdateExpression")}}if(!i&&!(f.type==="ArrowFunctionExpression"&&f.start===l)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(l,p,f,this.parseMaybeUnary(null,!1,!1,a),"**",!1);else return f};function Ic(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Ic(e.expression)}function va(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&va(e.expression)||e.type==="ParenthesizedExpression"&&va(e.expression)}R.parseExprSubscripts=function(e,t){var i=this.start,a=this.startLoc,l=this.parseExprAtom(e,t);if(l.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return l;var p=this.parseSubscripts(l,i,a,!1,t);return e&&p.type==="MemberExpression"&&(e.parenthesizedAssign>=p.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=p.start&&(e.parenthesizedBind=-1),e.trailingComma>=p.start&&(e.trailingComma=-1)),p};R.parseSubscripts=function(e,t,i,a,l){for(var p=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,f=!1;;){var g=this.parseSubscript(e,t,i,a,p,f,l);if(g.optional&&(f=!0),g===e||g.type==="ArrowFunctionExpression"){if(f){var x=this.startNodeAt(t,i);x.expression=g,g=this.finishNode(x,"ChainExpression")}return g}e=g}};R.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};R.parseSubscriptAsyncArrow=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,a)};R.parseSubscript=function(e,t,i,a,l,p,f){var g=this.options.ecmaVersion>=11,x=g&&this.eat(m.questionDot);a&&x&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||x&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var y=this.startNodeAt(t,i);y.object=e,b?(y.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?y.property=this.parsePrivateIdent():y.property=this.parseIdent(this.options.allowReserved!=="never"),y.computed=!!b,g&&(y.optional=x),e=this.finishNode(y,"MemberExpression")}else if(!a&&this.eat(m.parenL)){var v=new cr,C=this.yieldPos,u=this.awaitPos,L=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var q=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,v);if(l&&!x&&this.shouldParseAsyncArrow())return this.checkPatternErrors(v,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=C,this.awaitPos=u,this.awaitIdentPos=L,this.parseSubscriptAsyncArrow(t,i,q,f);this.checkExpressionErrors(v,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,this.awaitIdentPos=L||this.awaitIdentPos;var Z=this.startNodeAt(t,i);Z.callee=e,Z.arguments=q,g&&(Z.optional=x),e=this.finishNode(Z,"CallExpression")}else if(this.type===m.backQuote){(x||p)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var Q=this.startNodeAt(t,i);Q.tag=e,Q.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(Q,"TaggedTemplateExpression")}return e};R.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var a,l=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),a=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(a.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(a,"Super");case m._this:return a=this.startNode(),this.next(),this.finishNode(a,"ThisExpression");case m.name:var p=this.start,f=this.startLoc,g=this.containsEsc,x=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&x.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(ee.f_expr),this.parseFunction(this.startNodeAt(p,f),0,!1,!0,t);if(l&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(p,f),[x],!1,t);if(this.options.ecmaVersion>=8&&x.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return x=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(p,f),[x],!0,t)}return x;case m.regexp:var b=this.value;return a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return a=this.startNode(),a.value=this.type===m._null?null:this.type===m._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case m.parenL:var y=this.start,v=this.parseParenAndDistinguishExpression(l,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(v)&&(e.parenthesizedAssign=y),e.parenthesizedBind<0&&(e.parenthesizedBind=y)),v;case m.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(a,"ArrayExpression");case m.braceL:return this.overrideContext(ee.b_expr),this.parseObj(!1,e);case m._function:return a=this.startNode(),this.next(),this.parseFunction(a,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};R.parseExprAtomDefault=function(){this.unexpected()};R.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};R.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};R.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};R.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};R.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};R.shouldParseArrow=function(e){return!this.canInsertSemicolon()};R.parseParenAndDistinguishExpression=function(e,t){var i=this.start,a=this.startLoc,l,p=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var f=this.start,g=this.startLoc,x=[],b=!0,y=!1,v=new cr,C=this.yieldPos,u=this.awaitPos,L;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),p&&this.afterTrailingComma(m.parenR,!0)){y=!0;break}else if(this.type===m.ellipsis){L=this.start,x.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else x.push(this.parseMaybeAssign(!1,v,this.parseParenItem));var q=this.lastTokEnd,Z=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(x)&&this.eat(m.arrow))return this.checkPatternErrors(v,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=C,this.awaitPos=u,this.parseParenArrowList(i,a,x,t);(!x.length||y)&&this.unexpected(this.lastTokStart),L&&this.unexpected(L),this.checkExpressionErrors(v,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,x.length>1?(l=this.startNodeAt(f,g),l.expressions=x,this.finishNodeAt(l,"SequenceExpression",q,Z)):l=x[0]}else l=this.parseParenExpression();if(this.options.preserveParens){var Q=this.startNodeAt(i,a);return Q.expression=l,this.finishNode(Q,"ParenthesizedExpression")}else return l};R.parseParenItem=function(e){return e};R.parseParenArrowList=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,a)};var Of=[];R.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var a=this.start,l=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),a,l,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(a,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=Of,this.finishNode(e,"NewExpression")};R.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};R.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var a=this.parseTemplateElement({isTagged:t});for(i.quasis=[a];!a.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(a=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};R.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!Ee.test(this.input.slice(this.lastTokEnd,this.start))};R.parseObj=function(e,t){var i=this.startNode(),a=!0,l={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(a)a=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var p=this.parseProperty(e,t);e||this.checkPropClash(p,l,t),i.properties.push(p)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};R.parseProperty=function(e,t){var i=this.startNode(),a,l,p,f;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(p=this.start,f=this.startLoc),e||(a=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!a&&this.isAsyncProp(i)?(l=!0,a=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):l=!1,this.parsePropertyValue(i,e,a,l,p,f,t,g),this.finishNode(i,"Property")};R.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var a=e.value.start;e.kind==="get"?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};R.parsePropertyValue=function(e,t,i,a,l,p,f,g){(i||a)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,f),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,a),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||a)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||a)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=l),t?e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key)):this.type===m.eq&&f?(f.shorthandAssign<0&&(f.shorthandAssign=this.start),e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};R.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};R.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};R.parseMethod=function(e,t,i){var a=this.startNode(),l=this.yieldPos,p=this.awaitPos,f=this.awaitIdentPos;return this.initFunction(a),this.options.ecmaVersion>=6&&(a.generator=e),this.options.ecmaVersion>=8&&(a.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Ca(t,a.generator)|or|(i?wc:0)),this.expect(m.parenL),a.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(a,!1,!0,!1),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=f,this.finishNode(a,"FunctionExpression")};R.parseArrowExpression=function(e,t,i,a){var l=this.yieldPos,p=this.awaitPos,f=this.awaitIdentPos;return this.enterScope(Ca(i,!1)|wa),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,a),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=f,this.finishNode(e,"ArrowFunctionExpression")};R.parseFunctionBody=function(e,t,i,a){var l=t&&this.type!==m.braceL,p=this.strict,f=!1;if(l)e.body=this.parseMaybeAssign(a),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!p||g)&&(f=this.strictDirective(this.end),f&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var x=this.labels;this.labels=[],f&&(this.strict=!0),this.checkParams(e,!p&&!f&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,Tc),e.body=this.parseBlock(!1,void 0,f&&!p),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=x}this.exitScope()};R.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var a=i[t];if(a.type!=="Identifier")return!1}return!0};R.checkParams=function(e,t){for(var i=Object.create(null),a=0,l=e.params;a<l.length;a+=1){var p=l[a];this.checkLValInnerPattern(p,Ea,t?null:i)}};R.parseExprList=function(e,t,i,a){for(var l=[],p=!0;!this.eat(e);){if(p)p=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var f=void 0;i&&this.type===m.comma?f=null:this.type===m.ellipsis?(f=this.parseSpread(a),a&&this.type===m.comma&&a.trailingComma<0&&(a.trailingComma=this.start)):f=this.parseMaybeAssign(!1,a),l.push(f)}return l};R.checkUnreserved=function(e){var t=e.start,i=e.end,a=e.name;if(this.inGenerator&&a==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&lr)&&a==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(a==="arguments"||a==="await")&&this.raise(t,"Cannot use "+a+" in class static initialization block"),this.keywords.test(a)&&this.raise(t,"Unexpected keyword '"+a+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var l=this.strict?this.reservedWordsStrict:this.reservedWords;l.test(a)&&(!this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+a+"' is reserved"))}};R.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};R.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};R.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};R.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};R.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var ar=oe.prototype;ar.raise=function(e,t){var i=vc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var a=new SyntaxError(t);throw a.pos=e,a.loc=i,a.raisedAt=this.pos,a};ar.raiseRecoverable=ar.raise;ar.curPosition=function(){if(this.options.locations)return new di(this.curLine,this.pos-this.lineStart)};var ft=oe.prototype,Mf=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};ft.enterScope=function(e){this.scopeStack.push(new Mf(e))};ft.exitScope=function(){this.scopeStack.pop()};ft.treatFunctionsAsVarInScope=function(e){return e.flags&Ct||!this.inModule&&e.flags&wt};ft.declareName=function(e,t,i){var a=!1;if(t===ot){var l=this.currentScope();a=l.lexical.indexOf(e)>-1||l.functions.indexOf(e)>-1||l.var.indexOf(e)>-1,l.lexical.push(e),this.inModule&&l.flags&wt&&delete this.undefinedExports[e]}else if(t===Ac){var p=this.currentScope();p.lexical.push(e)}else if(t===Ec){var f=this.currentScope();this.treatFunctionsAsVar?a=f.lexical.indexOf(e)>-1:a=f.lexical.indexOf(e)>-1||f.var.indexOf(e)>-1,f.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var x=this.scopeStack[g];if(x.lexical.indexOf(e)>-1&&!(x.flags&Sc&&x.lexical[0]===e)||!this.treatFunctionsAsVarInScope(x)&&x.functions.indexOf(e)>-1){a=!0;break}if(x.var.push(e),this.inModule&&x.flags&wt&&delete this.undefinedExports[e],x.flags&lr)break}a&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};ft.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};ft.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};ft.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(lr|fi|Et))return t}};ft.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(lr|fi|Et)&&!(t.flags&wa))return t}};var ur=function(t,i,a){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new sr(t,a)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},mi=oe.prototype;mi.startNode=function(){return new ur(this,this.start,this.startLoc)};mi.startNodeAt=function(e,t){return new ur(this,e,t)};function Lc(e,t,i,a){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=a),this.options.ranges&&(e.range[1]=i),e}mi.finishNode=function(e,t){return Lc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};mi.finishNodeAt=function(e,t,i,a){return Lc.call(this,e,t,i,a)};mi.copyNode=function(e){var t=new ur(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Df="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",$c="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Pc=$c+" Extended_Pictographic",Nc=Pc,Rc=Nc+" EBase EComp EMod EPres ExtPict",Fc=Rc,Vf=Fc,Bf={9:$c,10:Pc,11:Nc,12:Rc,13:Fc,14:Vf},jf="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",Uf={9:"",10:"",11:"",12:"",13:"",14:jf},hc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Oc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Mc=Oc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Dc=Mc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Vc=Dc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Bc=Vc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Hf=Bc+" "+Df,zf={9:Oc,10:Mc,11:Dc,12:Vc,13:Bc,14:Hf},jc={};function Wf(e){var t=jc[e]={binary:ht(Bf[e]+" "+hc),binaryOfStrings:ht(Uf[e]),nonBinary:{General_Category:ht(hc),Script:ht(zf[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(tr=0,ga=[9,10,11,12,13,14];tr<ga.length;tr+=1)dc=ga[tr],Wf(dc);var dc,tr,ga,$=oe.prototype,nr=function(t,i){this.parent=t,this.base=i||this};nr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var a=t;a;a=a.parent)if(i.base===a.base&&i!==a)return!0;return!1};nr.prototype.sibling=function(){return new nr(this.parent,this.base)};var Ze=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=jc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};Ze.prototype.reset=function(t,i,a){var l=a.indexOf("v")!==-1,p=a.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=a,l&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=p&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=p&&this.parser.options.ecmaVersion>=9)};Ze.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};Ze.prototype.at=function(t,i){i===void 0&&(i=!1);var a=this.source,l=a.length;if(t>=l)return-1;var p=a.charCodeAt(t);if(!(i||this.switchU)||p<=55295||p>=57344||t+1>=l)return p;var f=a.charCodeAt(t+1);return f>=56320&&f<=57343?(p<<10)+f-56613888:p};Ze.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var a=this.source,l=a.length;if(t>=l)return l;var p=a.charCodeAt(t),f;return!(i||this.switchU)||p<=55295||p>=57344||t+1>=l||(f=a.charCodeAt(t+1))<56320||f>57343?t+1:t+2};Ze.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};Ze.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};Ze.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};Ze.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};Ze.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var a=this.pos,l=0,p=t;l<p.length;l+=1){var f=p[l],g=this.at(a,i);if(g===-1||g!==f)return!1;a=this.nextIndex(a,i)}return this.pos=a,!0};$.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,a=!1,l=!1,p=0;p<i.length;p++){var f=i.charAt(p);t.indexOf(f)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(f,p+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),f==="u"&&(a=!0),f==="v"&&(l=!0)}this.options.ecmaVersion>=15&&a&&l&&this.raise(e.start,"Invalid regular expression flag")};function Gf(e){for(var t in e)return!0;return!1}$.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Gf(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};$.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var a=i[t];e.groupNames[a]||e.raise("Invalid named capture referenced")}};$.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new nr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};$.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};$.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};$.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};$.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};$.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};$.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var a=0,l=-1;if(this.regexp_eatDecimalDigits(e)&&(a=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(l=e.lastIntValue),e.eat(125)))return l!==-1&&l<a&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};$.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};$.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};$.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),a=e.eat(45);if(i||a){for(var l=0;l<i.length;l++){var p=i.charAt(l);i.indexOf(p,l+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(a){var f=this.regexp_eatModifiers(e);!i&&!f&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<f.length;g++){var x=f.charAt(g);(f.indexOf(x,g+1)>-1||i.indexOf(x)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};$.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};$.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&qf(i);)t+=nt(i),e.advance();return t};function qf(e){return e===105||e===109||e===115}$.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};$.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};$.regexp_eatSyntaxCharacter=function(e){var t=e.current();return Uc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Uc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}$.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!Uc(i);)e.advance();return e.pos!==t};$.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};$.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var a=0,l=i;a<l.length;a+=1){var p=l[a];p.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};$.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};$.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=nt(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=nt(e.lastIntValue);return!0}return!1};$.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),Kf(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function Kf(e){return Qe(e,!0)||e===36||e===95}$.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),Yf(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function Yf(e){return dt(e,!0)||e===36||e===95||e===8204||e===8205}$.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};$.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};$.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};$.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};$.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};$.regexp_eatZero=function(e){return e.current()===48&&!pr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};$.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};$.regexp_eatControlLetter=function(e){var t=e.current();return Hc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function Hc(e){return e>=65&&e<=90||e>=97&&e<=122}$.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,a=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var l=e.lastIntValue;if(a&&l>=55296&&l<=56319){var p=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var f=e.lastIntValue;if(f>=56320&&f<=57343)return e.lastIntValue=(l-55296)*1024+(f-56320)+65536,!0}e.pos=p,e.lastIntValue=l}return!0}if(a&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&Qf(e.lastIntValue))return!0;a&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function Qf(e){return e>=0&&e<=1114111}$.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};$.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var zc=0,st=1,Me=2;$.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Zf(t))return e.lastIntValue=-1,e.advance(),st;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var a;if(e.eat(123)&&(a=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&a===Me&&e.raise("Invalid property name"),a;e.raise("Invalid property name")}return zc};function Zf(e){return e===100||e===68||e===115||e===83||e===119||e===87}$.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var a=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,a),st}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var l=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,l)}return zc};$.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){Ht(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};$.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return st;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return Me;e.raise("Invalid property name")};$.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";Wc(t=e.current());)e.lastStringValue+=nt(t),e.advance();return e.lastStringValue!==""};function Wc(e){return Hc(e)||e===95}$.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";Jf(t=e.current());)e.lastStringValue+=nt(t),e.advance();return e.lastStringValue!==""};function Jf(e){return Wc(e)||pr(e)}$.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};$.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===Me&&e.raise("Negated character class may contain strings"),!0}return!1};$.regexp_classContents=function(e){return e.current()===93?st:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),st)};$.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};$.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||Kc(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var a=e.current();return a!==93?(e.lastIntValue=a,e.advance(),!0):!1};$.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};$.regexp_classSetExpression=function(e){var t=st,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===Me&&(t=Me);for(var a=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==Me&&(t=st);continue}e.raise("Invalid character in character class")}if(a!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(a!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===Me&&(t=Me)}};$.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var a=e.lastIntValue;return i!==-1&&a!==-1&&i>a&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};$.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?st:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};$.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),a=this.regexp_classContents(e);if(e.eat(93))return i&&a===Me&&e.raise("Negated character class may contain strings"),a;e.pos=t}if(e.eat(92)){var l=this.regexp_eatCharacterClassEscape(e);if(l)return l;e.pos=t}return null};$.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};$.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===Me&&(t=Me);return t};$.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?st:Me};$.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&Xf(i)||em(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function Xf(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function em(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}$.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return tm(t)?(e.lastIntValue=t,e.advance(),!0):!1};function tm(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}$.regexp_eatClassControlLetter=function(e){var t=e.current();return pr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};$.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};$.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;pr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function pr(e){return e>=48&&e<=57}$.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Gc(i=e.current());)e.lastIntValue=16*e.lastIntValue+qc(i),e.advance();return e.pos!==t};function Gc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function qc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}$.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};$.regexp_eatOctalDigit=function(e){var t=e.current();return Kc(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function Kc(e){return e>=48&&e<=55}$.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var a=0;a<t;++a){var l=e.current();if(!Gc(l))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+qc(l),e.advance()}return!0};var Ta=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new sr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},j=oe.prototype;j.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Ta(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};j.getToken=function(){return this.next(),new Ta(this)};typeof Symbol<"u"&&(j[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});j.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};j.readToken=function(e){return Qe(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};j.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};j.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};j.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var a=void 0,l=t;(a=bc(this.input,l,this.pos))>-1;)++this.curLine,l=this.lineStart=a;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};j.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),a=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!Ut(a);)a=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};j.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&xc.test(String.fromCharCode(e)))++this.pos;else break e}}};j.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};j.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};j.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};j.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,a=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,a=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(a,i)};j.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};j.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};j.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Ee.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};j.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};j.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};j.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var a=this.input.charCodeAt(this.pos+2);if(a===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};j.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),Qe(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+nt(t)+"'")};j.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+nt(e)+"'")};j.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};j.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var a=this.input.charAt(this.pos);if(Ee.test(a)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(a==="[")t=!0;else if(a==="]"&&t)t=!1;else if(a==="/"&&!t)break;e=a==="\\"}++this.pos}var l=this.input.slice(i,this.pos);++this.pos;var p=this.pos,f=this.readWord1();this.containsEsc&&this.unexpected(p);var g=this.regexpState||(this.regexpState=new Ze(this));g.reset(i,l,f),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var x=null;try{x=new RegExp(l,f)}catch{}return this.finishToken(m.regexp,{pattern:l,flags:f,value:x})};j.readInt=function(e,t,i){for(var a=this.options.ecmaVersion>=12&&t===void 0,l=i&&this.input.charCodeAt(this.pos)===48,p=this.pos,f=0,g=0,x=0,b=t??1/0;x<b;++x,++this.pos){var y=this.input.charCodeAt(this.pos),v=void 0;if(a&&y===95){l&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),x===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=y;continue}if(y>=97?v=y-97+10:y>=65?v=y-65+10:y>=48&&y<=57?v=y-48:v=1/0,v>=e)break;g=y,f=f*e+v}return a&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===p||t!=null&&this.pos-p!==t?null:f};function im(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function Yc(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}j.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=Yc(this.input.slice(t,this.pos)),++this.pos):Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};j.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var a=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&a===110){var l=Yc(this.input.slice(t,this.pos));return++this.pos,Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,l)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),a===46&&!i&&(++this.pos,this.readInt(10),a=this.input.charCodeAt(this.pos)),(a===69||a===101)&&!i&&(a=this.input.charCodeAt(++this.pos),(a===43||a===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var p=im(this.input.slice(t,this.pos),i);return this.finishToken(m.num,p)};j.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};j.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var a=this.input.charCodeAt(this.pos);if(a===e)break;a===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):a===8232||a===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(Ut(a)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var Qc={};j.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===Qc)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};j.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw Qc;this.raise(e,t)};j.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(Ut(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};j.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};j.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return nt(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var a=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],l=parseInt(a,8);return l>255&&(a=a.slice(0,-1),l=parseInt(a,8)),this.pos+=a.length-1,t=this.input.charCodeAt(this.pos),(a!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-a.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(l)}return Ut(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};j.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};j.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,a=this.options.ecmaVersion>=6;this.pos<this.input.length;){var l=this.fullCharCodeAtPos();if(dt(l,a))this.pos+=l<=65535?1:2;else if(l===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var p=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var f=this.readCodePoint();(t?Qe:dt)(f,a)||this.invalidStringToken(p,"Invalid Unicode escape"),e+=nt(f),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};j.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=ka[e]),this.finishToken(t,e)};var rm="8.18.0";oe.acorn={Parser:oe,version:rm,defaultOptions:xa,Position:di,SourceLocation:sr,getLineInfo:vc,Node:ur,TokenType:W,tokTypes:m,keywordTypes:ka,TokContext:We,tokContexts:ee,isIdentifierChar:dt,isIdentifierStart:Qe,Token:Ta,isNewLine:Ut,lineBreak:Ee,lineBreakG:Af,nonASCIIwhitespace:xc};function Zc(e,t){return oe.parse(e,t)}var Wt=null,gi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let a;return Wt!==null?(a=Wt,Wt=Wt.cursor,a.prev=t,a.next=i,a.cursor=this.cursor):a={prev:t,next:i,cursor:this.cursor},this.cursor=a,a}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=Wt,Wt=t}updateCursors(t,i,a,l){let{cursor:p}=this;for(;p!==null;)p.prev===t&&(p.prev=i),p.next===a&&(p.next=l),p=p.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let a of t){let l=e.createItem(a);i!==null?i.next=l:this.head=l,l.prev=i,i=l}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let a=this.allocateCursor(null,this.head);for(;a.next!==null;){let l=a.next;a.next=l.next,t.call(i,l.data,l,this)}this.releaseCursor()}forEachRight(t,i=this){let a=this.allocateCursor(this.tail,null);for(;a.prev!==null;){let l=a.prev;a.prev=l.prev,t.call(i,l.data,l,this)}this.releaseCursor()}reduce(t,i,a=this){let l=this.allocateCursor(null,this.head),p=i,f;for(;l.next!==null;)f=l.next,l.next=f.next,p=t.call(a,p,f.data,f,this);return this.releaseCursor(),p}reduceRight(t,i,a=this){let l=this.allocateCursor(this.tail,null),p=i,f;for(;l.prev!==null;)f=l.prev,l.prev=f.prev,p=t.call(a,p,f.data,f,this);return this.releaseCursor(),p}some(t,i=this){for(let a=this.head;a!==null;a=a.next)if(t.call(i,a.data,a,this))return!0;return!1}map(t,i=this){let a=new e;for(let l=this.head;l!==null;l=l.next)a.appendData(t.call(i,l.data,l,this));return a}filter(t,i=this){let a=new e;for(let l=this.head;l!==null;l=l.next)t.call(i,l.data,l,this)&&a.appendData(l.data);return a}nextUntil(t,i,a=this){if(t===null)return;let l=this.allocateCursor(null,t);for(;l.next!==null;){let p=l.next;if(l.next=p.next,i.call(a,p.data,p,this))break}this.releaseCursor()}prevUntil(t,i,a=this){if(t===null)return;let l=this.allocateCursor(t,null);for(;l.prev!==null;){let p=l.prev;if(l.prev=p.prev,i.call(a,p.data,p,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function Jc(e,t){let i=Object.create(SyntaxError.prototype),a=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(a.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var _a=100,Xc=60,eu="    ";function tu({source:e,line:t,column:i,baseLine:a,baseColumn:l},p){function f(L,q){return b.slice(L,q).map((Z,Q)=>String(L+Q+1).padStart(C)+" |"+Z).join(`
`)}let g=`
`.repeat(Math.max(a-1,0)),x=" ".repeat(Math.max(l-1,0)),b=(g+x+e).split(/\r\n?|\n|\f/),y=Math.max(1,t-p)-1,v=Math.min(t+p,b.length+1),C=Math.max(4,String(v).length)+1,u=0;i+=(eu.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>_a&&(u=i-Xc+3,i=Xc-2);for(let L=y;L<=v;L++)L>=0&&L<b.length&&(b[L]=b[L].replace(/\t/g,eu),b[L]=(u>0&&b[L].length>u?"\u2026":"")+b[L].substr(u,_a-2)+(b[L].length>u+_a-1?"\u2026":""));return[f(y,t),new Array(i+C+2).join("-")+"^",f(t,v)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Ia(e,t,i,a,l,p=1,f=1){return Object.assign(Jc("SyntaxError",e),{source:t,offset:i,line:a,column:l,sourceFragment(x){return tu({source:t,line:a,column:l,baseLine:p,baseColumn:f},isNaN(x)?0:x)},get formattedMessage(){return`Parse error: ${e}
`+tu({source:t,line:a,column:l,baseLine:p,baseColumn:f},2)}})}function ye(e){return e>=48&&e<=57}function Je(e){return ye(e)||e>=65&&e<=70||e>=97&&e<=102}function dr(e){return e>=65&&e<=90}function am(e){return e>=97&&e<=122}function nm(e){return dr(e)||am(e)}function sm(e){return e>=128}function hr(e){return nm(e)||sm(e)||e===95}function fr(e){return hr(e)||ye(e)||e===45}function om(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function bi(e){return e===10||e===13||e===12}function Xe(e){return bi(e)||e===32||e===9}function Ae(e,t){return!(e!==92||bi(t)||t===0)}function mr(e,t,i){return e===45?hr(t)||t===45||Ae(t,i):hr(e)?!0:e===92?Ae(e,t):!1}function gr(e,t,i){return e===43||e===45?ye(t)?2:t===46&&ye(i)?3:0:e===46?ye(t)?2:0:ye(e)?1:0}function br(e){return e===65279||e===65534?1:0}var La=new Array(128),lm=128,xi=130,$a=131,xr=132,Pa=133;for(let e=0;e<La.length;e++)La[e]=Xe(e)&&xi||ye(e)&&$a||hr(e)&&xr||om(e)&&Pa||e||lm;function yr(e){return e<128?La[e]:xr}function Gt(e,t){return t<e.length?e.charCodeAt(t):0}function vr(e,t,i){return i===13&&Gt(e,t+1)===10?2:1}function Ra(e,t,i){let a=e.charCodeAt(t);return dr(a)&&(a=a|32),a===i}function At(e,t,i,a){if(i-t!==a.length||t<0||i>e.length)return!1;for(let l=t;l<i;l++){let p=a.charCodeAt(l-t),f=e.charCodeAt(l);if(dr(f)&&(f=f|32),f!==p)return!1}return!0}function iu(e,t){for(;t>=0&&Xe(e.charCodeAt(t));t--);return t+1}function yi(e,t){for(;t<e.length&&Xe(e.charCodeAt(t));t++);return t}function Na(e,t){for(;t<e.length&&ye(e.charCodeAt(t));t++);return t}function lt(e,t){if(t+=2,Je(Gt(e,t-1))){for(let a=Math.min(e.length,t+5);t<a&&Je(Gt(e,t));t++);let i=Gt(e,t);Xe(i)&&(t+=vr(e,t,i))}return t}function vi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!fr(i)){if(Ae(i,Gt(e,t+1))){t=lt(e,t)-1;continue}break}}return t}function kr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),ye(i)&&(t=Na(e,t+1),i=e.charCodeAt(t)),i===46&&ye(e.charCodeAt(t+1))&&(t+=2,t=Na(e,t)),Ra(e,t,101)){let a=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(a=1,i=e.charCodeAt(t+2)),ye(i)&&(t=Na(e,t+1+a+1))}return t}function Sr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Ae(i,Gt(e,t+1))&&(t=lt(e,t))}return t}function wr(e){if(e.length===1&&!Je(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var qt=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function Kt(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var ru=10,cm=12,au=13;function nu(e){let t=e.source,i=t.length,a=t.length>0?br(t.charCodeAt(0)):0,l=Kt(e.lines,i),p=Kt(e.columns,i),f=e.startLine,g=e.startColumn;for(let x=a;x<i;x++){let b=t.charCodeAt(x);l[x]=f,p[x]=g++,(b===ru||b===au||b===cm)&&(b===au&&x+1<i&&t.charCodeAt(x+1)===ru&&(x++,l[x]=f,p[x]=g),f++,g=1)}l[i]=f,p[i]=g,e.lines=l,e.columns=p,e.computed=!0}var Cr=class{constructor(t,i,a,l){this.setSource(t,i,a,l),this.lines=null,this.columns=null}setSource(t="",i=0,a=1,l=1){this.source=t,this.startOffset=i,this.startLine=a,this.startColumn=l,this.computed=!1}getLocation(t,i){return this.computed||nu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,a){return this.computed||nu(this),{source:a,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var Ge=16777215,qe=24,Si=1,Ar=2,mt=new Uint8Array(32);mt[2]=22;mt[21]=22;mt[19]=20;mt[23]=24;var Ke=new Uint8Array(32);Ke[2]=Si;Ke[21]=Si;Ke[19]=Si;Ke[23]=Si;Ke[22]=Ar;Ke[20]=Ar;Ke[24]=Ar;function su(e,t,i){return e<t?t:e>i?i:e}var Er=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let a=t.length,l=Kt(this.offsetAndType,t.length+1),p=Kt(this.balance,t.length+1),f=0,g=-1,x=0,b=t.length;this.offsetAndType=null,this.balance=null,p.fill(0),i(t,(y,v,C)=>{let u=f++;if(l[u]=y<<qe|C,g===-1&&(g=v),p[u]=b,y===x){let L=p[b];p[b]=u,b=L,x=mt[l[L]>>qe]}else this.isBlockOpenerTokenType(y)&&(b=u,x=mt[y])}),l[f]=0<<qe|a,p[f]=f;for(let y=0;y<f;y++){let v=p[y];if(v<=y){let C=p[v];C!==y&&(p[y]=C)}else v>f&&(p[y]=f)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=f,this.offsetAndType=l,this.balance=p,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>qe:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>qe;if(a!==13&&a!==25&&t--===0)return a}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Ge:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>qe;if(a!==13&&a!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?At(this.source,this.offsetAndType[t-1]&Ge,this.offsetAndType[t]&Ge,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Ge:this.offsetAndType[this.tokenCount]&Ge:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[su(t,0,this.tokenCount)]&Ge}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[su(t,0,this.tokenCount)]>>qe}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return Ke[t]===Si}isBlockCloserTokenType(t){return Ke[t]===Ar}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(Ke[i]===1){let a=this.balance[t],l=this.getTokenType(a);return mt[i]===l?a:-1}else if(Ke[i]===2){let a=this.balance[t],l=this.getTokenType(a);return mt[l]===i?a:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&Ge,i=this.offsetAndType[i],this.tokenType=i>>qe,this.tokenEnd=i&Ge):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>qe,this.tokenEnd=t&Ge):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let a=t,l=0,p=0;e:for(;a<this.tokenCount;a++){if(l=this.balance[a],l<t)break e;switch(p=a>0?this.offsetAndType[a-1]&Ge:this.firstCharOffset,i(this.source.charCodeAt(p))){case 1:break e;case 2:a++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[a]>>qe)&&(a=l)}}this.skip(a-this.tokenIndex)}forEachToken(t){for(let i=0,a=this.firstCharOffset;i<this.tokenCount;i++){let l=a,p=this.offsetAndType[i],f=p&Ge,g=p>>qe;a=f,t(g,l,f,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,a,l,p)=>{t[p]={idx:p,type:qt[i],chunk:this.source.substring(a,l),balance:this.balance[p]}}),t}};function Tr(e,t){function i(v){return v<g?e.charCodeAt(v):0}function a(){if(b=kr(e,b),mr(i(b),i(b+1),i(b+2))){y=12,b=vi(e,b);return}if(i(b)===37){y=11,b++;return}y=10}function l(){let v=b;if(b=vi(e,b),At(e,v,b,"url")&&i(b)===40){if(b=yi(e,b+1),i(b)===34||i(b)===39){y=2,b=v+4;return}f();return}if(i(b)===40){y=2,b++;return}y=1}function p(v){for(v||(v=i(b++)),y=5;b<e.length;b++){let C=e.charCodeAt(b);switch(yr(C)){case v:b++;return;case xi:if(bi(C)){b+=vr(e,b,C),y=6;return}break;case 92:if(b===e.length-1)break;let u=i(b+1);bi(u)?b+=vr(e,b+1,u):Ae(C,u)&&(b=lt(e,b)-1);break}}}function f(){for(y=7,b=yi(e,b);b<e.length;b++){let v=e.charCodeAt(b);switch(yr(v)){case 41:b++;return;case xi:if(b=yi(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Sr(e,b),y=8;return;case 34:case 39:case 40:case Pa:b=Sr(e,b),y=8;return;case 92:if(Ae(v,i(b+1))){b=lt(e,b)-1;break}b=Sr(e,b),y=8;return}}}e=String(e||"");let g=e.length,x=br(i(0)),b=x,y;for(;b<g;){let v=e.charCodeAt(b);switch(yr(v)){case xi:y=13,b=yi(e,b+1);break;case 34:p();break;case 35:fr(i(b+1))||Ae(i(b+1),i(b+2))?(y=4,b=vi(e,b+1)):(y=9,b++);break;case 39:p();break;case 40:y=21,b++;break;case 41:y=22,b++;break;case 43:gr(v,i(b+1),i(b+2))?a():(y=9,b++);break;case 44:y=18,b++;break;case 45:gr(v,i(b+1),i(b+2))?a():i(b+1)===45&&i(b+2)===62?(y=15,b=b+3):mr(v,i(b+1),i(b+2))?l():(y=9,b++);break;case 46:gr(v,i(b+1),i(b+2))?a():(y=9,b++);break;case 47:i(b+1)===42?(y=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(y=9,b++);break;case 58:y=16,b++;break;case 59:y=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(y=14,b=b+4):(y=9,b++);break;case 64:mr(i(b+1),i(b+2),i(b+3))?(y=3,b=vi(e,b+1)):(y=9,b++);break;case 91:y=19,b++;break;case 92:Ae(v,i(b+1))?l():(y=9,b++);break;case 93:y=20,b++;break;case 123:y=23,b++;break;case 125:y=24,b++;break;case $a:a();break;case xr:l();break;default:y=9,b++}t(y,x,x=b)}}function ou(e){let t=this.createList(),i=!1,a={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let l=e.getNode.call(this,a);if(l===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,l,t,a),i=!1),t.push(l)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,a),t}var Zt=()=>{},um=33,pm=35,Oa=59,lu=123,cu=0,hm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},dm={createList(){return new gi},createSingleNodeList(e){return new gi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function fm(e){return function(){return this[e]()}}function Ma(e){let t=Object.create(null);for(let i of Object.keys(e)){let a=e[i],l=a.parse||a;l&&(t[i]=l)}return t}function mm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Ma(e.atrule),pseudo:Ma(e.pseudo),node:Ma(e.node)};for(let[i,a]of Object.entries(e.parseContext))switch(typeof a){case"function":t.context[i]=a;break;case"string":t.context[i]=fm(a);break}return{config:t,...t,...t.node}}function uu(e){let t="",i="<unknown>",a=!1,l=Zt,p=!1,f=new Cr,g=Object.assign(new Er,mm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:ou,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(y){return y===lu?1:0},consumeUntilLeftCurlyBracketOrSemicolon(y){return y===lu||y===Oa?1:0},consumeUntilExclamationMarkOrSemicolon(y){return y===um||y===Oa?1:0},consumeUntilSemicolonIncluded(y){return y===Oa?2:0},createList:Zt,createSingleNodeList:Zt,getFirstListNode:Zt,getLastListNode:Zt,parseWithFallback(y,v){let C=this.tokenIndex;try{return y.call(this)}catch(u){if(p)throw u;this.skip(C-this.tokenIndex);let L=v.call(this);return p=!0,l(u,L),p=!1,L}},lookupNonWSType(y){let v;do if(v=this.lookupType(y++),v!==13&&v!==25)return v;while(v!==cu);return cu},charCodeAt(y){return y>=0&&y<t.length?t.charCodeAt(y):0},substring(y,v){return t.substring(y,v)},substrToCursor(y){return this.source.substring(y,this.tokenStart)},cmpChar(y,v){return Ra(t,y,v)},cmpStr(y,v,C){return At(t,y,v,C)},consume(y){let v=this.tokenStart;return this.eat(y),this.substrToCursor(v)},consumeFunctionName(){let y=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),y},consumeNumber(y){let v=t.substring(this.tokenStart,kr(t,this.tokenStart));return this.eat(y),v},eat(y){if(this.tokenType!==y){let v=qt[y].slice(0,-6).replace(/-/g," ").replace(/^./,L=>L.toUpperCase()),C=`${/[[\](){}]/.test(v)?`"${v}"`:v} is expected`,u=this.tokenStart;switch(y){case 1:this.tokenType===2||this.tokenType===7?(u=this.tokenEnd-1,C="Identifier is expected but function found"):C="Identifier is expected";break;case 4:this.isDelim(pm)&&(this.next(),u++,C="Name is expected");break;case 11:this.tokenType===10&&(u=this.tokenEnd,C="Percent sign is expected");break}this.error(C,u)}this.next()},eatIdent(y){(this.tokenType!==1||this.lookupValue(0,y)===!1)&&this.error(`Identifier "${y}" is expected`),this.next()},eatDelim(y){this.isDelim(y)||this.error(`Delim "${String.fromCharCode(y)}" is expected`),this.next()},getLocation(y,v){return a?f.getLocationRange(y,v,i):null},getLocationFromList(y){if(a){let v=this.getFirstListNode(y),C=this.getLastListNode(y);return f.getLocationRange(v!==null?v.loc.start.offset-f.startOffset:this.tokenStart,C!==null?C.loc.end.offset-f.startOffset:this.tokenStart,i)}return null},error(y,v){let C=typeof v<"u"&&v<t.length?f.getLocation(v):this.eof?f.getLocation(iu(t,t.length-1)):f.getLocation(this.tokenStart);throw new Ia(y||"Unexpected input",t,C.offset,C.line,C.column,f.startLine,f.startColumn)}}),x=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:y=>g.getTokenType(y),getTokenTypeName:y=>qt[g.getTokenType(y)],getTokenStart:y=>g.getTokenStart(y),getTokenEnd:y=>g.getTokenEnd(y),getTokenValue:y=>g.source.substring(g.getTokenStart(y),g.getTokenEnd(y)),substring:(y,v)=>g.source.substring(y,v),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:y=>g.getBlockTokenPairIndex(y),getLocation:y=>f.getLocation(y,i),getRangeLocation:(y,v)=>f.getLocationRange(y,v,i)});return Object.assign(function(y,v){t=y,v=v||{},g.setSource(t,Tr),f.setSource(t,v.offset,v.line,v.column),i=v.filename||"<unknown>",a=!!v.positions,l=typeof v.onParseError=="function"?v.onParseError:Zt,p=!1,g.parseAtrulePrelude="parseAtrulePrelude"in v?!!v.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in v?!!v.parseRulePrelude:!0,g.parseValue="parseValue"in v?!!v.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in v?!!v.parseCustomProperty:!1;let{context:C="default",list:u=!0,onComment:L,onToken:q}=v;if(!(C in g.context))throw new Error("Unknown context `"+C+"`");Object.assign(g,u?dm:hm),Array.isArray(q)?g.forEachToken((Q,_e,le)=>{q.push({type:Q,start:_e,end:le})}):typeof q=="function"&&g.forEachToken(q.bind(x())),typeof L=="function"&&g.forEachToken((Q,_e,le)=>{if(Q===25){let Ie=g.getLocation(_e,le),Ii=At(t,le-2,le,"*/")?t.slice(_e+2,le-2):t.slice(_e+2,le);L(Ii,Ie)}});let Z=g.context[C].call(g,v);return g.eof||g.error(),Z},{SyntaxError:Ia,config:g.config})}var Da={};N(Da,{AtrulePrelude:()=>hu,Selector:()=>fu,Value:()=>xu});var gm=35,bm=42,pu=43,xm=45,ym=47,vm=117;function wi(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,vm)&&this.cmpChar(this.tokenStart+1,pu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===ym||t===bm||t===pu||t===xm)return this.Operator();t===gm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var hu={getNode:wi};var km=35,Sm=38,wm=42,Cm=43,Em=47,du=46,Am=62,Tm=124,_m=126;function Im(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Lm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===du&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case Cm:case Am:case _m:case Em:return this.Combinator();case du:return this.ClassSelector();case wm:case Tm:return this.TypeSelector();case km:return this.IdSelector();case Sm:return this.NestingSelector()}break}}}var fu={onWhiteSpace:Im,getNode:Lm};function mu(){return this.createSingleNodeList(this.Raw(null,!1))}function gu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let a=t-this.tokenIndex;a<=0;a++)if(this.lookupType(a)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function bu(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var xu={getNode:wi,onWhiteSpace(e,t){bu(e)&&(e.value=" "+e.value),bu(t.last)&&(t.last.value+=" ")},expression:mu,var:gu};var $m=new Set(["none","and","not","or"]),yu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);$m.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var vu={parse:{prelude:null,block(){return this.Block(!0)}}};function Va(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var ku={layer(){this.skipSC();let e=this.createList(),t=Va.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Va.call(this,this.Declaration,()=>Va.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},Su={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,ku)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,ku)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var wu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var Cu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Eu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Au={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Tu={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var _u={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Iu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Lu={container:yu,"font-face":vu,import:Su,layer:wu,media:Cu,nest:Eu,page:Au,scope:Tu,"starting-style":_u,supports:Iu};function $u(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var _t={parse(){return this.createSingleNodeList(this.SelectorList())}},Ba={parse(){return this.createSingleNodeList(this.Selector())}},Pm={parse(){return this.createSingleNodeList(this.Identifier())}},Nm={parse:$u},_r={parse(){return this.createSingleNodeList(this.Nth())}},Pu={dir:Pm,has:_t,lang:Nm,matches:_t,is:_t,"-moz-any":_t,"-webkit-any":_t,where:_t,not:_t,"nth-child":_r,"nth-last-child":_r,"nth-last-of-type":_r,"nth-of-type":_r,slotted:Ba,host:Ba,"host-context":Ba};var Oo={};N(Oo,{AnPlusB:()=>Ua,Atrule:()=>Wa,AtrulePrelude:()=>Ka,AttributeSelector:()=>Ja,Block:()=>tn,Brackets:()=>nn,CDC:()=>ln,CDO:()=>pn,ClassSelector:()=>fn,Combinator:()=>bn,Comment:()=>vn,Condition:()=>wn,Declaration:()=>An,DeclarationList:()=>Ln,Dimension:()=>Nn,Feature:()=>On,FeatureFunction:()=>Vn,FeatureRange:()=>Hn,Function:()=>Gn,GeneralEnclosed:()=>Yn,Hash:()=>Jn,IdSelector:()=>as,Identifier:()=>ts,Layer:()=>os,LayerList:()=>us,MediaQuery:()=>ds,MediaQueryList:()=>gs,NestingSelector:()=>ys,Nth:()=>Ss,Number:()=>Es,Operator:()=>_s,Parentheses:()=>$s,Percentage:()=>Rs,PseudoClassSelector:()=>Ms,PseudoElementSelector:()=>Bs,Ratio:()=>Hs,Raw:()=>Gs,Rule:()=>Ys,Scope:()=>Js,Selector:()=>to,SelectorList:()=>ao,String:()=>lo,StyleSheet:()=>po,SupportsDeclaration:()=>mo,TypeSelector:()=>yo,UnicodeRange:()=>wo,Url:()=>To,Value:()=>Lo,WhiteSpace:()=>No});var za={};N(za,{generate:()=>Ha,name:()=>Fm,parse:()=>Ua,structure:()=>Om});var it=43,Ne=45,Ir=110,It=!0,Rm=!1;function Lr(e,t){let i=this.tokenStart+e,a=this.charCodeAt(i);for((a===it||a===Ne)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)ye(this.charCodeAt(i))||this.error("Integer is expected",i)}function Jt(e){return Lr.call(this,0,e)}function bt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Ir:i="N is expected";break;case Ne:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function ja(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(it,e)||this.isDelim(Ne,e)){t=this.isDelim(it,e)?it:Ne;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),Jt.call(this,It))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==it&&i!==Ne&&this.error("Number sign is expected")),Jt.call(this,t!==0),t===Ne?"-"+this.consume(10):this.consume(10)}var Fm="AnPlusB",Om={a:[String,null],b:[String,null]};function Ua(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)Jt.call(this,Rm),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,Ne))switch(t="-1",bt.call(this,1,Ir),this.tokenEnd-this.tokenStart){case 2:this.next(),i=ja.call(this);break;case 3:bt.call(this,2,Ne),this.next(),this.skipSC(),Jt.call(this,It),i="-"+this.consume(10);break;default:bt.call(this,2,Ne),Lr.call(this,3,It),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(it)&&this.lookupType(1)===1){let a=0;switch(t="1",this.isDelim(it)&&(a=1,this.next()),bt.call(this,0,Ir),this.tokenEnd-this.tokenStart){case 1:this.next(),i=ja.call(this);break;case 2:bt.call(this,1,Ne),this.next(),this.skipSC(),Jt.call(this,It),i="-"+this.consume(10);break;default:bt.call(this,1,Ne),Lr.call(this,2,It),this.next(),i=this.substrToCursor(e+a+1)}}else if(this.tokenType===12){let a=this.charCodeAt(this.tokenStart),l=a===it||a===Ne,p=this.tokenStart+l;for(;p<this.tokenEnd&&ye(this.charCodeAt(p));p++);p===this.tokenStart+l&&this.error("Integer is expected",this.tokenStart+l),bt.call(this,p-this.tokenStart,Ir),t=this.substring(e,p),p+1===this.tokenEnd?(this.next(),i=ja.call(this)):(bt.call(this,p-this.tokenStart+1,Ne),p+2===this.tokenEnd?(this.next(),this.skipSC(),Jt.call(this,It),i="-"+this.consume(10)):(Lr.call(this,p-this.tokenStart+2,It),this.next(),i=this.substrToCursor(p+1)))}else this.error();return t!==null&&t.charCodeAt(0)===it&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===it&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function Ha(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var qa={};N(qa,{generate:()=>Ga,name:()=>Dm,parse:()=>Wa,structure:()=>Bm,walkContext:()=>Vm});function Nu(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Mm(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Dm="Atrule",Vm="atrule",Bm={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function Wa(e=!1){let t=this.tokenStart,i,a,l=null,p=null;switch(this.eat(3),i=this.substrToCursor(t+1),a=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?l=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Nu):l=Nu.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,a)&&typeof this.atrule[a].block=="function"?p=this.atrule[a].block.call(this,e):p=this.Block(Mm.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:l,block:p}}function Ga(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var Qa={};N(Qa,{generate:()=>Ya,name:()=>jm,parse:()=>Ka,structure:()=>Hm,walkContext:()=>Um});var jm="AtrulePrelude",Um="atrulePrelude",Hm={children:[[]]};function Ka(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function Ya(e){this.children(e)}var en={};N(en,{generate:()=>Xa,name:()=>Ym,parse:()=>Ja,structure:()=>Qm});var zm=36,Ru=42,$r=61,Wm=94,Za=124,Gm=126;function qm(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Ru)?(t=!0,this.next()):this.isDelim(Za)||this.eat(1),this.isDelim(Za)?this.charCodeAt(this.tokenStart+1)!==$r?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Km(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==$r&&t!==Gm&&t!==Wm&&t!==zm&&t!==Ru&&t!==Za&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==$r&&(this.isDelim($r)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var Ym="AttributeSelector",Qm={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function Ja(){let e=this.tokenStart,t,i=null,a=null,l=null;return this.eat(19),this.skipSC(),t=qm.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=Km.call(this),this.skipSC(),a=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(l=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:a,flags:l}}function Xa(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var an={};N(an,{generate:()=>rn,name:()=>Xm,parse:()=>tn,structure:()=>tg,walkContext:()=>eg});var Zm=38;function Mu(){return this.Raw(null,!0)}function Fu(){return this.parseWithFallback(this.Rule,Mu)}function Ou(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Jm(){if(this.tokenType===17)return Ou.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Ou);return this.tokenType===17&&this.next(),e}var Xm="Block",eg="block",tg={children:[["Atrule","Rule","Declaration"]]};function tn(e){let t=e?Jm:Fu,i=this.tokenStart,a=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:a.push(this.parseWithFallback(this.Atrule.bind(this,e),Mu));break;default:e&&this.isDelim(Zm)?a.push(Fu.call(this)):a.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:a}}function rn(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var on={};N(on,{generate:()=>sn,name:()=>ig,parse:()=>nn,structure:()=>rg});var ig="Brackets",rg={children:[[]]};function nn(e,t){let i=this.tokenStart,a=null;return this.eat(19),a=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:a}}function sn(e){this.token(9,"["),this.children(e),this.token(9,"]")}var un={};N(un,{generate:()=>cn,name:()=>ag,parse:()=>ln,structure:()=>ng});var ag="CDC",ng=[];function ln(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function cn(){this.token(15,"-->")}var dn={};N(dn,{generate:()=>hn,name:()=>sg,parse:()=>pn,structure:()=>og});var sg="CDO",og=[];function pn(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function hn(){this.token(14,"<!--")}var gn={};N(gn,{generate:()=>mn,name:()=>cg,parse:()=>fn,structure:()=>ug});var lg=46,cg="ClassSelector",ug={name:String};function fn(){return this.eatDelim(lg),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function mn(e){this.token(9,"."),this.token(1,e.name)}var yn={};N(yn,{generate:()=>xn,name:()=>fg,parse:()=>bn,structure:()=>mg});var pg=43,Du=47,hg=62,dg=126,fg="Combinator",mg={name:String};function bn(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case hg:case pg:case dg:this.next();break;case Du:this.next(),this.eatIdent("deep"),this.eatDelim(Du);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function xn(e){this.tokenize(e.name)}var Sn={};N(Sn,{generate:()=>kn,name:()=>xg,parse:()=>vn,structure:()=>yg});var gg=42,bg=47,xg="Comment",yg={value:String};function vn(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===gg&&this.charCodeAt(t-1)===bg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function kn(e){this.token(25,"/*"+e.value+"*/")}var En={};N(En,{generate:()=>Cn,name:()=>kg,parse:()=>wn,structure:()=>Sg});var vg=new Set([16,22,0]),kg="Condition",Sg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Vu(e){return this.lookupTypeNonSC(1)===1&&vg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var wg={media:Vu,container:Vu,supports(){return this.SupportsDeclaration()}};function wn(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>wg[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let a=this.Condition(e);return this.eat(22),a},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function Cn(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var _n={};N(_n,{generate:()=>Tn,name:()=>Pg,parse:()=>An,structure:()=>Rg,walkContext:()=>Ng});var Bu=45;function ju(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Bu&&e.charCodeAt(t+1)===Bu}var Hu=33,Cg=35,Eg=36,Ag=38,Tg=42,_g=43,Uu=47;function Ig(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Lg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function $g(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Hu)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Pg="Declaration",Ng="declaration",Rg={important:[Boolean,String],property:String,value:["Value","Raw"]};function An(){let e=this.tokenStart,t=this.tokenIndex,i=Fg.call(this),a=ju(i),l=a?this.parseCustomProperty:this.parseValue,p=a?Lg:Ig,f=!1,g;this.skipSC(),this.eat(16);let x=this.tokenIndex;if(a||this.skipSC(),l?g=this.parseWithFallback($g,p):g=p.call(this,this.tokenIndex),a&&g.type==="Value"&&g.children.isEmpty){for(let b=x-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Hu)&&(f=Og.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:f,property:i,value:g}}function Tn(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function Fg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Tg:case Eg:case _g:case Cg:case Ag:this.next();break;case Uu:this.next(),this.isDelim(Uu)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function Og(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var Pn={};N(Pn,{generate:()=>$n,name:()=>Dg,parse:()=>Ln,structure:()=>Vg});var Mg=38;function In(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var Dg="DeclarationList",Vg={children:[["Declaration","Atrule","Rule"]]};function Ln(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),In));break;default:this.isDelim(Mg)?e.push(this.parseWithFallback(this.Rule,In)):e.push(this.parseWithFallback(this.Declaration,In))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function $n(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var Fn={};N(Fn,{generate:()=>Rn,name:()=>Bg,parse:()=>Nn,structure:()=>jg});var Bg="Dimension",jg={value:String,unit:String};function Nn(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Rn(e){this.token(12,e.value+e.unit)}var Dn={};N(Dn,{generate:()=>Mn,name:()=>Hg,parse:()=>On,structure:()=>zg});var Ug=47,Hg="Feature",zg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function On(e){let t=this.tokenStart,i,a=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?a=this.Ratio():a=this.Number();break;case 12:a=this.Dimension();break;case 1:a=this.Identifier();break;case 2:a=this.parseWithFallback(()=>{let l=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Ug)&&this.error(),l},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:a}}function Mn(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var jn={};N(jn,{generate:()=>Bn,name:()=>Wg,parse:()=>Vn,structure:()=>Gg});var Wg="FeatureFunction",Gg={kind:String,feature:String,value:["Declaration","Selector"]};function qg(e,t){let a=(this.features[e]||{})[t];return typeof a!="function"&&this.error(`Unknown feature ${t}()`),a}function Vn(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),a=qg.call(this,e,i.toLowerCase());this.skipSC();let l=this.parseWithFallback(()=>{let p=this.tokenIndex,f=a.call(this);return this.eof===!1&&this.isBalanceEdge(p)===!1&&this.error(),f},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:l}}function Bn(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var Wn={};N(Wn,{generate:()=>zn,name:()=>Qg,parse:()=>Hn,structure:()=>Zg});var zu=47,Kg=60,Wu=61,Yg=62,Qg="FeatureRange",Zg={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function Un(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(zu,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(zu)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Gu(e){if(this.skipSC(),this.isDelim(Kg)||this.isDelim(Yg)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(Wu)?(this.next(),t+"="):t}if(this.isDelim(Wu))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function Hn(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=Un.call(this),a=Gu.call(this,i.type==="Identifier"),l=Un.call(this),p=null,f=null;return this.lookupNonWSType(0)!==22&&(p=Gu.call(this),f=Un.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:a,middle:l,rightComparison:p,right:f}}function zn(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var Kn={};N(Kn,{generate:()=>qn,name:()=>Jg,parse:()=>Gn,structure:()=>e0,walkContext:()=>Xg});var Jg="Function",Xg="function",e0={name:String,children:[[]]};function Gn(e,t){let i=this.tokenStart,a=this.consumeFunctionName(),l=a.toLowerCase(),p;return p=t.hasOwnProperty(l)?t[l].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:a,children:p}}function qn(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var Zn={};N(Zn,{generate:()=>Qn,name:()=>t0,parse:()=>Yn,structure:()=>i0});var t0="GeneralEnclosed",i0={kind:String,function:[String,null],children:[[]]};function Yn(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let a=this.parseWithFallback(()=>{let l=this.tokenIndex,p=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(l)===!1&&this.error(),p},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:a}}function Qn(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var es={};N(es,{generate:()=>Xn,name:()=>a0,parse:()=>Jn,structure:()=>n0,xxx:()=>r0});var r0="XXX",a0="Hash",n0={value:String};function Jn(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function Xn(e){this.token(4,"#"+e.value)}var rs={};N(rs,{generate:()=>is,name:()=>s0,parse:()=>ts,structure:()=>o0});var s0="Identifier",o0={name:String};function ts(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function is(e){this.token(1,e.name)}var ss={};N(ss,{generate:()=>ns,name:()=>l0,parse:()=>as,structure:()=>c0});var l0="IdSelector",c0={name:String};function as(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function ns(e){this.token(9,"#"+e.name)}var cs={};N(cs,{generate:()=>ls,name:()=>p0,parse:()=>os,structure:()=>h0});var u0=46,p0="Layer",h0={name:String};function os(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(u0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function ls(e){this.tokenize(e.name)}var hs={};N(hs,{generate:()=>ps,name:()=>d0,parse:()=>us,structure:()=>f0});var d0="LayerList",f0={children:[["Layer"]]};function us(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function ps(e){this.children(e,()=>this.token(18,","))}var ms={};N(ms,{generate:()=>fs,name:()=>m0,parse:()=>ds,structure:()=>g0});var m0="MediaQuery",g0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function ds(){let e=this.tokenStart,t=null,i=null,a=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let l=this.consume(1),p=l.toLowerCase();switch(p==="not"||p==="only"?(this.skipSC(),t=p,i=this.consume(1)):i=l,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),a=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{a=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:a}}function fs(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var xs={};N(xs,{generate:()=>bs,name:()=>b0,parse:()=>gs,structure:()=>x0});var b0="MediaQueryList",x0={children:[["MediaQuery"]]};function gs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function bs(e){this.children(e,()=>this.token(18,","))}var ks={};N(ks,{generate:()=>vs,name:()=>v0,parse:()=>ys,structure:()=>k0});var y0=38,v0="NestingSelector",k0={};function ys(){let e=this.tokenStart;return this.eatDelim(y0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function vs(){this.token(9,"&")}var Cs={};N(Cs,{generate:()=>ws,name:()=>S0,parse:()=>Ss,structure:()=>w0});var S0="Nth",w0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Ss(){this.skipSC();let e=this.tokenStart,t=e,i=null,a;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?a=this.Identifier():a=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:a,selector:i}}function ws(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Ts={};N(Ts,{generate:()=>As,name:()=>C0,parse:()=>Es,structure:()=>E0});var C0="Number",E0={value:String};function Es(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function As(e){this.token(10,e.value)}var Ls={};N(Ls,{generate:()=>Is,name:()=>A0,parse:()=>_s,structure:()=>T0});var A0="Operator",T0={value:String};function _s(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Is(e){this.tokenize(e.value)}var Ns={};N(Ns,{generate:()=>Ps,name:()=>_0,parse:()=>$s,structure:()=>I0});var _0="Parentheses",I0={children:[[]]};function $s(e,t){let i=this.tokenStart,a=null;return this.eat(21),a=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:a}}function Ps(e){this.token(21,"("),this.children(e),this.token(22,")")}var Os={};N(Os,{generate:()=>Fs,name:()=>L0,parse:()=>Rs,structure:()=>$0});var L0="Percentage",$0={value:String};function Rs(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Fs(e){this.token(11,e.value+"%")}var Vs={};N(Vs,{generate:()=>Ds,name:()=>P0,parse:()=>Ms,structure:()=>R0,walkContext:()=>N0});var P0="PseudoClassSelector",N0="function",R0={name:String,children:[["Raw"],null]};function Ms(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Ds(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Us={};N(Us,{generate:()=>js,name:()=>F0,parse:()=>Bs,structure:()=>M0,walkContext:()=>O0});var F0="PseudoElementSelector",O0="function",M0={name:String,children:[["Raw"],null]};function Bs(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function js(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Ws={};N(Ws,{generate:()=>zs,name:()=>D0,parse:()=>Hs,structure:()=>V0});var qu=47;function Ku(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var D0="Ratio",V0={left:["Number","Function"],right:["Number","Function",null]};function Hs(){let e=this.tokenStart,t=Ku.call(this),i=null;return this.skipSC(),this.isDelim(qu)&&(this.eatDelim(qu),i=Ku.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function zs(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var Ks={};N(Ks,{generate:()=>qs,name:()=>j0,parse:()=>Gs,structure:()=>U0});function B0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var j0="Raw",U0={value:String};function Gs(e,t){let i=this.getTokenStart(this.tokenIndex),a;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?a=B0.call(this):a=this.tokenStart,{type:"Raw",loc:this.getLocation(i,a),value:this.substring(i,a)}}function qs(e){this.tokenize(e.value)}var Zs={};N(Zs,{generate:()=>Qs,name:()=>z0,parse:()=>Ys,structure:()=>G0,walkContext:()=>W0});function Yu(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function H0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var z0="Rule",W0="rule",G0={prelude:["SelectorList","Raw"],block:["Block"]};function Ys(){let e=this.tokenIndex,t=this.tokenStart,i,a;return this.parseRulePrelude?i=this.parseWithFallback(H0,Yu):i=Yu.call(this,e),a=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:a}}function Qs(e){this.node(e.prelude),this.node(e.block)}var eo={};N(eo,{generate:()=>Xs,name:()=>q0,parse:()=>Js,structure:()=>K0});var q0="Scope",K0={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function Js(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function Xs(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var ro={};N(ro,{generate:()=>io,name:()=>Y0,parse:()=>to,structure:()=>Q0});var Y0="Selector",Q0={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function to(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function io(e){this.children(e)}var so={};N(so,{generate:()=>no,name:()=>Z0,parse:()=>ao,structure:()=>X0,walkContext:()=>J0});var Z0="SelectorList",J0="selector",X0={children:[["Selector","Raw"]]};function ao(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function no(e){this.children(e,()=>this.token(18,","))}var uo={};N(uo,{generate:()=>co,name:()=>tb,parse:()=>lo,structure:()=>ib});var oo=92,Qu=34,Zu=39;function Pr(e){let t=e.length,i=e.charCodeAt(0),a=i===Qu||i===Zu?1:0,l=a===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,p="";for(let f=a;f<=l;f++){let g=e.charCodeAt(f);if(g===oo){if(f===l){f!==t-1&&(p=e.substr(f+1));break}if(g=e.charCodeAt(++f),Ae(oo,g)){let x=f-1,b=lt(e,x);f=b-1,p+=wr(e.substring(x+1,b))}else g===13&&e.charCodeAt(f+1)===10&&f++}else p+=e[f]}return p}function Ju(e,t){let i=t?"'":'"',a=t?Zu:Qu,l="",p=!1;for(let f=0;f<e.length;f++){let g=e.charCodeAt(f);if(g===0){l+="\uFFFD";continue}if(g<=31||g===127){l+="\\"+g.toString(16),p=!0;continue}g===a||g===oo?(l+="\\"+e.charAt(f),p=!1):(p&&(Je(g)||Xe(g))&&(l+=" "),l+=e.charAt(f),p=!1)}return i+l+i}var tb="String",ib={value:String};function lo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Pr(this.consume(5))}}function co(e){this.token(5,Ju(e.value))}var fo={};N(fo,{generate:()=>ho,name:()=>ab,parse:()=>po,structure:()=>sb,walkContext:()=>nb});var rb=33;function Xu(){return this.Raw(null,!1)}var ab="StyleSheet",nb="stylesheet",sb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function po(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==rb){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,Xu);break;default:i=this.parseWithFallback(this.Rule,Xu)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function ho(e){this.children(e)}var bo={};N(bo,{generate:()=>go,name:()=>ob,parse:()=>mo,structure:()=>lb});var ob="SupportsDeclaration",lb={declaration:"Declaration"};function mo(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function go(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var ko={};N(ko,{generate:()=>vo,name:()=>ub,parse:()=>yo,structure:()=>pb});var cb=42,ep=124;function xo(){this.tokenType!==1&&this.isDelim(cb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var ub="TypeSelector",pb={name:String};function yo(){let e=this.tokenStart;return this.isDelim(ep)?(this.next(),xo.call(this)):(xo.call(this),this.isDelim(ep)&&(this.next(),xo.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function vo(e){this.tokenize(e.name)}var Eo={};N(Eo,{generate:()=>Co,name:()=>fb,parse:()=>wo,structure:()=>mb});var tp=43,ip=45,So=63;function Ci(e,t){let i=0;for(let a=this.tokenStart+e;a<this.tokenEnd;a++){let l=this.charCodeAt(a);if(l===ip&&t&&i!==0)return Ci.call(this,e+i+1,!1),-1;Je(l)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",a),++i>6&&this.error("Too many hex digits",a)}return this.next(),i}function Nr(e){let t=0;for(;this.isDelim(So);)++t>e&&this.error("Too many question marks"),this.next()}function hb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===tp?"Plus sign":"Hyphen minus")+" is expected")}function db(){let e=0;switch(this.tokenType){case 10:if(e=Ci.call(this,1,!0),this.isDelim(So)){Nr.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){hb.call(this,ip),Ci.call(this,1,!1);break}break;case 12:e=Ci.call(this,1,!0),e>0&&Nr.call(this,6-e);break;default:if(this.eatDelim(tp),this.tokenType===1){e=Ci.call(this,0,!0),e>0&&Nr.call(this,6-e);break}if(this.isDelim(So)){this.next(),Nr.call(this,5);break}this.error("Hex digit or question mark is expected")}}var fb="UnicodeRange",mb={value:String};function wo(){let e=this.tokenStart;return this.eatIdent("u"),db.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Co(e){this.tokenize(e.value)}var Io={};N(Io,{generate:()=>_o,name:()=>kb,parse:()=>To,structure:()=>Sb});var gb=32,Ao=92,bb=34,xb=39,yb=40,rp=41;function ap(e){let t=e.length,i=4,a=e.charCodeAt(t-1)===rp?t-2:t-1,l="";for(;i<a&&Xe(e.charCodeAt(i));)i++;for(;i<a&&Xe(e.charCodeAt(a));)a--;for(let p=i;p<=a;p++){let f=e.charCodeAt(p);if(f===Ao){if(p===a){p!==t-1&&(l=e.substr(p+1));break}if(f=e.charCodeAt(++p),Ae(Ao,f)){let g=p-1,x=lt(e,g);p=x-1,l+=wr(e.substring(g+1,x))}else f===13&&e.charCodeAt(p+1)===10&&p++}else l+=e[p]}return l}function np(e){let t="",i=!1;for(let a=0;a<e.length;a++){let l=e.charCodeAt(a);if(l===0){t+="\uFFFD";continue}if(l<=31||l===127){t+="\\"+l.toString(16),i=!0;continue}l===gb||l===Ao||l===bb||l===xb||l===yb||l===rp?(t+="\\"+e.charAt(a),i=!1):(i&&Je(l)&&(t+=" "),t+=e.charAt(a),i=!1)}return"url("+t+")"}var kb="Url",Sb={value:String};function To(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=ap(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Pr(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function _o(e){this.token(7,np(e.value))}var Po={};N(Po,{generate:()=>$o,name:()=>wb,parse:()=>Lo,structure:()=>Cb});var wb="Value",Cb={children:[[]]};function Lo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function $o(e){this.children(e)}var Fo={};N(Fo,{generate:()=>Ro,name:()=>Ab,parse:()=>No,structure:()=>Tb});var Eb=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Ab="WhiteSpace",Tb={value:String};function No(){return this.eat(13),Eb}function Ro(e){this.token(13,e.value)}var sp={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Da,atrule:Lu,pseudo:Pu,node:Oo};var op=uu(sp);var{hasOwnProperty:Mo}=Object.prototype,Ei=function(){};function lp(e){return typeof e=="function"?e:Ei}function cp(e,t){return function(i,a,l){i.type===t&&e.call(this,i,a,l)}}function _b(e,t){let i=t.structure,a=[];for(let l in i){if(Mo.call(i,l)===!1)continue;let p=i[l],f={name:l,type:!1,nullable:!1};Array.isArray(p)||(p=[p]);for(let g of p)g===null?f.nullable=!0:typeof g=="string"?f.type="node":Array.isArray(g)&&(f.type="list");f.type&&a.push(f)}return a.length?{context:t.walkContext,fields:a}:null}function Ib(e){let t={};for(let i in e.node)if(Mo.call(e.node,i)){let a=e.node[i];if(!a.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=_b(i,a)}return t}function up(e,t){let i=e.fields.slice(),a=e.context,l=typeof a=="string";return t&&i.reverse(),function(p,f,g,x){let b;l&&(b=f[a],f[a]=p);for(let y of i){let v=p[y.name];if(!y.nullable||v){if(y.type==="list"){if(t?v.reduceRight(x,!1):v.reduce(x,!1))return!0}else if(g(v))return!0}}l&&(f[a]=b)}}function pp({StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:l}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:l}}}function hp(e){let t=Ib(e),i={},a={},l=Symbol("break-walk"),p=Symbol("skip-node");for(let b in t)Mo.call(t,b)&&t[b]!==null&&(i[b]=up(t[b],!1),a[b]=up(t[b],!0));let f=pp(i),g=pp(a),x=function(b,y){function v(Q,_e,le){let Ie=C.call(Z,Q,_e,le);return Ie===l?!0:Ie===p?!1:!!(L.hasOwnProperty(Q.type)&&L[Q.type](Q,Z,v,q)||u.call(Z,Q,_e,le)===l)}let C=Ei,u=Ei,L=i,q=(Q,_e,le,Ie)=>Q||v(_e,le,Ie),Z={break:l,skip:p,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof y=="function")C=y;else if(y&&(C=lp(y.enter),u=lp(y.leave),y.reverse&&(L=a),y.visit)){if(f.hasOwnProperty(y.visit))L=y.reverse?g[y.visit]:f[y.visit];else if(!t.hasOwnProperty(y.visit))throw new Error("Bad value `"+y.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");C=cp(C,y.visit),u=cp(u,y.visit)}if(C===Ei&&u===Ei)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");v(b)};return x.break=l,x.skip=p,x.find=function(b,y){let v=null;return x(b,function(C,u,L){if(y.call(this,C,u,L))return v=C,l}),v},x.findLast=function(b,y){let v=null;return x(b,{reverse:!0,enter(C,u,L){if(y.call(this,C,u,L))return v=C,l}}),v},x.findAll=function(b,y){let v=[];return x(b,function(C,u,L){y.call(this,C,u,L)&&v.push(C)}),v},x}var Do={};N(Do,{AnPlusB:()=>za,Atrule:()=>qa,AtrulePrelude:()=>Qa,AttributeSelector:()=>en,Block:()=>an,Brackets:()=>on,CDC:()=>un,CDO:()=>dn,ClassSelector:()=>gn,Combinator:()=>yn,Comment:()=>Sn,Condition:()=>En,Declaration:()=>_n,DeclarationList:()=>Pn,Dimension:()=>Fn,Feature:()=>Dn,FeatureFunction:()=>jn,FeatureRange:()=>Wn,Function:()=>Kn,GeneralEnclosed:()=>Zn,Hash:()=>es,IdSelector:()=>ss,Identifier:()=>rs,Layer:()=>cs,LayerList:()=>hs,MediaQuery:()=>ms,MediaQueryList:()=>xs,NestingSelector:()=>ks,Nth:()=>Cs,Number:()=>Ts,Operator:()=>Ls,Parentheses:()=>Ns,Percentage:()=>Os,PseudoClassSelector:()=>Vs,PseudoElementSelector:()=>Us,Ratio:()=>Ws,Raw:()=>Ks,Rule:()=>Zs,Scope:()=>eo,Selector:()=>ro,SelectorList:()=>so,String:()=>uo,StyleSheet:()=>fo,SupportsDeclaration:()=>bo,TypeSelector:()=>ko,UnicodeRange:()=>Eo,Url:()=>Io,Value:()=>Po,WhiteSpace:()=>Fo});var dp={node:Do};var fp=hp(dp);var Fp=vf(Np(),1),Rp=new Set(["Atrule","Selector","Declaration"]);function Op(e){let t=new Fp.SourceMapGenerator,i={line:1,column:0},a={line:0,column:0},l={line:1,column:0},p={generated:l},f=1,g=0,x=!1,b=e.node;e.node=function(C){if(C.loc&&C.loc.start&&Rp.has(C.type)){let u=C.loc.start.line,L=C.loc.start.column-1;(a.line!==u||a.column!==L)&&(a.line=u,a.column=L,i.line=f,i.column=g,x&&(x=!1,(i.line!==l.line||i.column!==l.column)&&t.addMapping(p)),x=!0,t.addMapping({source:C.loc.source,original:a,generated:i}))}b.call(this,C),x&&Rp.has(C.type)&&(l.line=f,l.column=g)};let y=e.emit;e.emit=function(C,u,L){for(let q=0;q<C.length;q++)C.charCodeAt(q)===10?(f++,g=0):g++;y(C,u,L)};let v=e.result;return e.result=function(){return x&&t.addMapping(p),{css:v(),map:t}},e}var Mr={};N(Mr,{safe:()=>Go,spec:()=>Zb});var Kb=43,Yb=45,Wo=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Mp=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],Qb=Mp.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Dp(e){let t=new Set(e.map(([i,a])=>Wo(i)<<16|Wo(a)));return function(i,a,l){let p=Wo(a,l),f=l.charCodeAt(0),g=f===Yb&&a!==1&&a!==2&&a!==15||f===Kb?t.has((i&65534)<<16|f<<7):t.has((i&65534)<<16|p);return p|g}}var Zb=Dp(Mp),Go=Dp(Qb);var Jb=92;function Xb(e,t){if(typeof t=="function"){let i=null;e.children.forEach(a=>{i!==null&&t.call(this,i),this.node(a),i=a});return}e.children.forEach(this.node,this)}function Vp(e){let t=new Map;for(let[i,a]of Object.entries(e.node))typeof(a.generate||a)=="function"&&t.set(i,a.generate||a);return function(i,a){let l="",p=0,f={node(x){if(t.has(x.type))t.get(x.type).call(g,x);else throw new Error("Unknown node type: "+x.type)},tokenBefore:Go,token(x,b,y){p=this.tokenBefore(p,x,b),!y&&p&1&&this.emit(" ",13,!0),this.emit(b,x,!1),x===9&&b.charCodeAt(0)===Jb&&this.emit(`
`,13,!0)},emit(x){l+=x},result(){return l}};a&&(typeof a.decorator=="function"&&(f=a.decorator(f)),a.sourceMap&&(f=Op(f)),a.mode in Mr&&(f.tokenBefore=Mr[a.mode]));let g={node:x=>f.node(x),children:Xb,token:(x,b)=>f.token(x,b),tokenize:x=>Tr(x,(b,y,v)=>{f.token(b,x.slice(y,v),y!==0)})};return f.node(i),f.result()}}var qo={};N(qo,{AnPlusB:()=>Ha,Atrule:()=>Ga,AtrulePrelude:()=>Ya,AttributeSelector:()=>Xa,Block:()=>rn,Brackets:()=>sn,CDC:()=>cn,CDO:()=>hn,ClassSelector:()=>mn,Combinator:()=>xn,Comment:()=>kn,Condition:()=>Cn,Declaration:()=>Tn,DeclarationList:()=>$n,Dimension:()=>Rn,Feature:()=>Mn,FeatureFunction:()=>Bn,FeatureRange:()=>zn,Function:()=>qn,GeneralEnclosed:()=>Qn,Hash:()=>Xn,IdSelector:()=>ns,Identifier:()=>is,Layer:()=>ls,LayerList:()=>ps,MediaQuery:()=>fs,MediaQueryList:()=>bs,NestingSelector:()=>vs,Nth:()=>ws,Number:()=>As,Operator:()=>Is,Parentheses:()=>Ps,Percentage:()=>Fs,PseudoClassSelector:()=>Ds,PseudoElementSelector:()=>js,Ratio:()=>zs,Raw:()=>qs,Rule:()=>Qs,Scope:()=>Xs,Selector:()=>io,SelectorList:()=>no,String:()=>co,StyleSheet:()=>ho,SupportsDeclaration:()=>go,TypeSelector:()=>vo,UnicodeRange:()=>Co,Url:()=>_o,Value:()=>$o,WhiteSpace:()=>Ro});var Bp={node:qo};var Ko=Vp(Bp);var _i="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),ex=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),Up=new Set(["__proto__","prototype","constructor"]);function Dr(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(a=>Dr(a,t)):i&&typeof i=="object"&&Dr(i,t)}}function ei(e){return e?e.computed?e.property?.value:e.property?.name:""}function ti(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!ti(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=ti(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(ti);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let a=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||Up.has(String(a)))throw new Error("Property static tidak aman");t[a]=ti(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function jp(e,t){let i=null;return Dr(e,a=>{if(i)return;let l=a.type==="VariableDeclarator"&&a.id.name===t,p=a.type==="AssignmentExpression"&&a.left.type==="MemberExpression"&&["window","globalThis"].includes(a.left.object.name)&&ei(a.left)===t;if(l||p)try{i=ti(l?a.init:a.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function tx(e){let t=new WeakMap,i=(l,p,f=null)=>{l&&(l.type==="Identifier"?p.bindings.set(l.name,f):l.type==="RestElement"?i(l.argument,p):l.type==="AssignmentPattern"?i(l.left,p):l.type==="ArrayPattern"?l.elements.forEach(g=>i(g,p)):l.type==="ObjectPattern"&&l.properties.forEach(g=>i(g.value||g.argument,p)))},a=(l,p)=>{if(!l||typeof l!="object")return;let f=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(l.type);l.type==="FunctionDeclaration"&&i(l.id,p);let g=f||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(l.type),x=g?{parent:p,bindings:new Map,functionScope:null}:p;g&&(x.functionScope=f||l.type==="Program"?x:p.functionScope),t.set(l,x),f&&(l.id&&i(l.id,x),l.params.forEach(b=>i(b,x))),l.type==="CatchClause"&&i(l.param,x),l.type==="VariableDeclaration"&&l.declarations.forEach(b=>i(b.id,l.kind==="var"?x.functionScope:x,b.init));for(let b of Object.values(l))Array.isArray(b)?b.forEach(y=>a(y,x)):b&&typeof b=="object"&&a(b,x)};return a(e,null),t}function ix(e){let t=[],i=tx(e),a=(g,x=new Set)=>{if(g?.type!=="Identifier"||x.has(g))return g;x.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return a(b.bindings.get(g.name),x);return g},l=g=>(g=a(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&ei(g)==="document"),p=g=>(g=a(g),g?.type==="MemberExpression"?l(g.object)&&ei(g)==="body":g?.type==="CallExpression"&&l(g.callee.object)&&ei(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),f=g=>(g=a(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||ei(g.callee)==="MutationObserver"));return Dr(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||ei(g.callee)!=="observe"||!f(g.callee.object)||!p(g.arguments[0]))return;let x;try{x=ti(a(g.arguments[1]))}catch{}let b=x?.attributes??(x?.attributeFilter!==void 0||x?.attributeOldValue!==void 0);(!x||b&&(!Array.isArray(x.attributeFilter)||x.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function Hp(e){let t=[...e.children],i=t.slice(t.findLastIndex(a=>a.type==="Combinator")+1);return i.some(a=>a.type==="PseudoElementSelector")?[]:i.flatMap(a=>a.type==="TypeSelector"&&["html","body"].includes(a.name.toLowerCase())?[a.name.toLowerCase()]:a.type==="PseudoClassSelector"&&a.name==="root"?["html"]:a.type==="PseudoClassSelector"&&["is","where"].includes(a.name)&&a.children?[...a.children].flatMap(l=>l.type==="SelectorList"?[...l.children].flatMap(Hp):[]):[])}function rx(e){let t=[],i;try{i=op(e)}catch(p){return["CSS tidak terbaca: "+p.message]}let a=[!0],l={html:{},body:{}};return fp(i,{enter(p){if(p.type==="Atrule"){p.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=p.prelude?Ko(p.prelude):"",x=p.name.toLowerCase()==="media"&&g.split(",").every(b=>{let y=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||y&&Number(y[1])>960});a.push(a.at(-1)&&!x)}if(p.type!=="Rule"||!a.at(-1))return;let f=new Set(p.prelude?.type==="SelectorList"?[...p.prelude.children].flatMap(Hp):[]);p.block.children.forEach(g=>{if(g.type!=="Declaration")return;let x=Ko(g.value).trim().toLowerCase();for(let b of f)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(x)&&(l[b].overflow=!0),g.property==="height"&&x==="100dvh"&&(l[b].height=!0)})},leave(p){p.type==="Atrule"&&a.pop()}}),Object.values(l).some(p=>p.height&&p.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function Yo({doc:e,scripts:t=[],css:i="",config:a,schema:l,requireObjects:p=!0}){let f=[],g=[];for(let C of t)try{let u=Zc(C,{ecmaVersion:"latest",sourceType:"script"});g.push(u),f.push(...ix(u))}catch(u){f.push("Sintaks JavaScript gagal kompilasi: "+u.message)}a??(a=g.map(C=>jp(C,"CONFIG")).find(Boolean)),l??(l=g.map(C=>jp(C,"SVE_SCHEMA")).find(Boolean)),p&&!a&&f.push("CONFIG static tidak terbaca"),p&&!l&&f.push("SVE_SCHEMA static tidak terbaca");let x=l?.template?.type==="custom-page";if(l){Array.isArray(l.sections)||f.push("SVE_SCHEMA.sections wajib array");let C=Array.isArray(l.sections)?l.sections:[],u=C.map(L=>L?.id);new Set(u).size!==u.length&&f.push("SVE_SCHEMA memiliki duplicate section id"),x||(_i.forEach(L=>{u.includes(L)||f.push("Canonical section hilang: "+L)}),u.forEach(L=>{_i.includes(L)||f.push("Section bukan canonical: "+L)}));for(let L of C){if(L?.fields!==void 0&&!Array.isArray(L.fields)){f.push("Section fields wajib array");continue}for(let q of L?.fields||[])if(ex.has(q?.type||"text")||f.push("Field type tidak didukung: "+q?.type),!!["repeater","repeater-image"].includes(q?.type)){if(!Array.isArray(q.fields)){f.push("Repeater tanpa fields[]");continue}for(let Z of q.fields)(!Z?.key||Up.has(Z.key))&&f.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(Z?.type)&&f.push("Nested repeater tidak diizinkan")}}}if(a&&!x){let C=a.sectionOrder;(!Array.isArray(C)||C.length!==_i.length||!_i.every(u=>C.includes(u))||C[0]!=="cover")&&f.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let y=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(y)&&f.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(y)&&f.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(y)&&f.push("Gambar base64 terdeteksi; gunakan URL https");let v=["html","body"].map(C=>`${C}{${e?.querySelector(C)?.getAttribute("style")||""}}`).join("");f.push(...rx(i+v));for(let C of e?.querySelectorAll("audio")||[])C.getAttribute("preload")?.toLowerCase()!=="none"&&f.push('Audio wajib menggunakan preload="none"');for(let C of e?.querySelectorAll("iframe")||[]){let u="";try{u=new URL(C.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(u)&&C.getAttribute("loading")?.toLowerCase()!=="lazy"&&f.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&f.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(f)],config:a,schema:l}}function zp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),a=t(i),l=[...a.querySelectorAll("style")],p=[...a.querySelectorAll("script")],f=Yo({doc:a,css:l.map(x=>x.textContent).join(`
`),scripts:p.map(x=>x.textContent)}),g=f.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),a.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!a.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!a.body)&&g.push("Elemen body wajib ada"),a.head?.querySelector("title")||g.push("Title wajib ada di head"),a.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(l.length!==1||!a.head?.contains(l[0]))&&g.push("Wajib tepat satu style di head"),(p.length!==1||!a.body?.contains(p[0]))&&g.push("Wajib tepat satu script di body"),p[0]&&p[0]!==a.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),p.some(x=>x.hasAttribute("src"))&&g.push("Script template harus inline"),f.schema?.template?.type!=="custom-page"){let x=new Set([...a.querySelectorAll("[data-section-id]")].map(b=>b.getAttribute("data-section-id")));_i.forEach(b=>{x.has(b)||g.push("Markup section hilang: "+b)})}return{...f,blockers:[...new Set(g)],html:i}}function Wp({document:e,window:t,getConfig:i,syncImages:a,metrics:l}){let p=null,f=null,g=!1,x=null,b=null;function y(){return p?.isConnected||(p=[...e.querySelectorAll("iframe")].find(C=>{try{return typeof C.contentWindow?.SVE_REFRESH=="function"||!!C.contentDocument?.querySelector("[data-sve-template]")}catch{return!1}})||null),p}function v(){f!==null&&t.cancelAnimationFrame(f),f=null;let C=y(),u;try{u=C?.contentWindow||(typeof t.SVE_REFRESH=="function"?t:null)}catch{}let L=i();if(u&&L){let q=JSON.stringify(L);if(q!==x||u!==b||g)try{let Z=JSON.parse(q);u.CONFIG=Z,u.SVE_REFRESH?.(Z),x=q,b=u,l.previewRefreshCount=(l.previewRefreshCount||0)+1}catch(Z){console.warn("[SVE] Preview refresh gagal",Z)}}if(g){try{C?.contentDocument&&a(C.contentDocument)}catch{}g=!1}}return{request({images:C=!1,force:u=!1}={}){g||(g=C),u&&(x=null,b=null),f===null&&(f=t.requestAnimationFrame(v))},document(){try{return y()?.contentDocument||null}catch{return null}},invalidate(){p=null,x=null,b=null},flush:v}}(function(){"use strict";let e="sve77",t="0.27.0",a=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),l="https://nikahin.myscalev.com/home#paket",p="6282175274118",f="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",x=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let v=(r,n=document)=>n.querySelector(r),C=(r,n=document)=>Array.from(n.querySelectorAll(r)),u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let L=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-primary-bg","#332a24"],["Button Primary","Text","--sve-button-primary-text","#ffffff"],["Button Secondary","Background","--sve-button-secondary-bg","#ffffff"],["Button Secondary","Text","--sve-button-secondary-text","#332a24"]],q=Array.from({length:31},(r,n)=>12+n*2+"px"),Z=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],Q=["100","200","300","400","500","600","700","800","900"],_e=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],le=_e.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),Ie=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],Ii=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),Vr=new Set(["__proto__","prototype","constructor"]),Gp=12,qp=240,Kp=1e4;function xt(r){let n=String(r||"").trim();if(!n||n.length>qp||n.includes("..")||n.startsWith(".")||n.endsWith("."))return null;let s=n.split(".");if(!s.length||s.length>Gp)return null;for(let o of s){if(!o||Vr.has(o))return null;if(/^\d+$/.test(o)){let c=Number(o);if(!Number.isSafeInteger(c)||c<0||c>Kp)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let Li=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,Qo=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,Yp=4096;function Br(r){return Li.lastIndex=0,Li.test(String(r||""))}function Qp(r){let n=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;Li.lastIndex=0;let h=0,d=0,k;for(;k=Li.exec(c);){h+=1;let S=k.index+k[0].length,w=S;for(;w<c.length&&/[A-Za-z0-9+/=]/.test(c[w]);)w+=1;d+=w-S}h&&n.push({where:s,count:h,approxKb:Math.max(1,Math.round(d*.75/1024))})}),n}function Zp(r){let n=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;Qo.lastIndex=0;let h=0,d=0,k;for(;k=Qo.exec(c);){let S=k[0].length;S<=Yp||Br(k[0])||(h+=1,d=Math.max(d,S))}h&&n.push({where:s,count:h,approxKb:Math.max(1,Math.round(d/1024))})}),n}function Zo(r){return r.map(n=>n.where+" ("+n.count+"x, \xB1"+n.approxKb+" KB)").join(", ")}let Jo={"16:9":"16 / 9","4:3":"4 / 3","1:1":"1 / 1","4:5":"4 / 5","9:16":"9 / 16"},jr=["16:9","4:3","1:1","4:5","9:16"],Ur=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Jp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},Xo=["auto","cover","contain"];function Xp(r){return r==="fill"?"cover":r==="fit"?"contain":Xo.includes(r)?r:"auto"}function el(r=""){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="${E(r)}"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `}function tl(r){return`
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
    `}function eh(){return`
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
    `}function E(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ii(r,n=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),n)}}function $t(r,n=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:n}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function il(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function rt(r){return!!(r&&r.isConnected)}function Pt(){let r=u.nativeCache;Object.keys(r).forEach(n=>{r[n]&&!rt(r[n])&&(r[n]=null)})}function Re(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Nt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,n=>n.toUpperCase()).trim()}function ax(){}function D(r,n){if(r==null||!n)return;let s=xt(n);if(!s)return;let o=r;for(let c of s){if(o==null)return;let h=/^\d+$/.test(c)?Number(c):c;if(!Object.prototype.hasOwnProperty.call(o,h))return;o=o[h]}return o}function fe(r,n,s){let o=xt(n);if(!r||!o)return!1;let c=r;for(let k=0;k<o.length-1;k++){let S=o[k],w=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(c,w)||c[w]===null||c[w]===void 0)&&(c[w]=/^\d+$/.test(o[k+1])?[]:Object.create(null)),typeof c[w]!="object")return!1;c=c[w]}let h=o.at(-1),d=/^\d+$/.test(h)?Number(h):h;return c[d]=s,!0}function yt(r){let n=String(r||"").trim();if(!n)return"";try{/^https?:\/\//i.test(n)&&(n=new URL(n).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{n=decodeURIComponent(n)}catch{}return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function Hr(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function th(){let r=C('input[type="text"], input:not([type])').filter(n=>Hr(n));return r.length?r.find(n=>String(n.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function ih(){let r=C("a[href]").filter(n=>!n.closest("#"+e));for(let n of r){let s=n,o="";for(let c=0;c<4&&s;c+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let c=new URL(n.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(c.hostname)&&!/scalev\.(?:com|id)$/i.test(c.hostname))continue;let h=c.pathname.split("/").filter(Boolean),d=yt(h.at(-1)||"");if(d)return d}catch{}}return""}function vt(){let r=th(),n=yt(r?.value);if(n)return u.scalevSlug=n,n;let s=ih();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function zr(r,n){let s=String(n||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),c=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&c.endsWith("weddingid")||/wedding\s*id/.test(o)}function rh(){let r=new Set;try{ke().forEach(n=>{(n.fields||[]).forEach(s=>{s.type!=="repeater"&&zr(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&D(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&D(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function Wr(r){C('[data-auto-wedding-id="1"]').forEach(n=>{n.value!==r&&(n.value=r),n.setAttribute("readonly","")})}function ri(r,n={}){let s=yt(r||vt());if(!s)return!1;u.scalevSlug=s;let o=rh();if(!u.config||!o.length)return u.pendingWeddingIdSlug=s,Wr(s),!1;let c=!1;if(o.forEach(d=>{D(u.config,d)!==s&&(fe(u.config,d,s),c=!0)}),Wr(s),!c)return u.pendingWeddingIdSlug="",!1;let h=Kr().length>0;return n.commit!==!1&&h&&u.configRange?.editor?(u.pendingWeddingIdSlug="",se(n.silent?void 0:"Wedding ID mengikuti Slug URL"),Wr(s),!0):(u.pendingWeddingIdSlug=s,!0)}function rl(){let r=yt(u.pendingWeddingIdSlug||u.scalevSlug||vt());return r?ri(r,{commit:!0,silent:!0}):!1}let ah=ii(()=>{let r=vt();r&&ri(r,{commit:!0})},450);function $i(){if(Pt(),rt(u.nativeCache.save)||rt(u.nativeCache.publish))return{save:rt(u.nativeCache.save)?u.nativeCache.save:null,publish:rt(u.nativeCache.publish)?u.nativeCache.publish:null};let r=C("button").filter(c=>!c.closest("#"+e)),n=c=>(c.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(c=>{let h=n(c);return h==="simpan"||h==="save"})||null,o=r.find(c=>{let h=n(c);return h.includes("simpan & terbitkan")||h.includes("simpan dan terbitkan")||h==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=o,{save:s,publish:o}}function nh(r,n){if(!r)return n?.parentElement||null;if(!n)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=n;o;){if(s.has(o))return o;o=o.parentElement}return null}function al(r,n){if(Pt(),rt(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&n&&r.parentElement===n.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=nh(r,n);if(!s)return r?.parentElement||n?.parentElement||null;let o=s;for(let c=0;c<4&&o;c++,o=o.parentElement){let h=o.getBoundingClientRect?.();if(h&&h.top>=0&&h.top<180&&h.height<110)return u.nativeCache.toolbarHost=o,o}return u.nativeCache.toolbarHost=s,s}function Gr(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let n=!!u.open;r.style.setProperty("display",n?"none":"",n?"important":""),r.setAttribute("aria-hidden",n?"true":"false"),r.tabIndex=n?-1:0}function nl(){let{save:r,publish:n}=$i(),s=n||r;if(!s)return!1;let o=al(r,n);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let c=document.getElementById(e+"-toolbar-toggle");return c||(c=s.cloneNode(!1),c.id=e+"-toolbar-toggle",c.type="button",c.disabled=!1,c.removeAttribute("disabled"),c.setAttribute("aria-controls",e+"-dock"),c.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),c.setAttribute("aria-pressed","false"),c.textContent="Visual Editor",c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),u.open?dh():Rt(!0)})),c.parentElement!==o&&(n&&n.parentElement===o?n.insertAdjacentElement("afterend",c):r&&r.parentElement===o?r.insertAdjacentElement("afterend",c):o.appendChild(c)),c.classList.toggle("sve-toolbar-active",u.open),c.setAttribute("aria-pressed",u.open?"true":"false"),Gr(),u.open&&requestAnimationFrame(()=>ll(!0)),!0}function qr(){let n=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return n||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function sh(){if(Pt(),rt(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=C("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),c=s.getBoundingClientRect(),h=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&c.top>=-2&&c.top<=4&&c.height>=36&&c.height<=64&&c.width>=window.innerWidth*.7&&h.includes("landing page studio")});if(!r.length)return null;let n=r.sort((s,o)=>{let c=s.getBoundingClientRect(),h=o.getBoundingClientRect();return c.height-h.height||c.top-h.top})[0];return u.nativeCache.globalHeader=n||null,n||null}function Pi(){let r=sh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function oh(){if(Pt(),rt(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:n}=$i(),s=n||r;if(!s)return qr();let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let d=o.getBoundingClientRect();d.top>=36&&d.top<=130&&d.width>=window.innerWidth*.68&&d.height>=window.innerHeight*.62&&(c=o)}o=o.parentElement}let h=c||qr();return u.nativeCache.workspaceRoot=h||null,h}function lh(){let n=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return n>0?n:Math.min(400,window.innerWidth*.32)}function sl(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function Ni(r){let n=document.querySelector('[data-sve77-page-root="1"]'),s=oh();if(n&&n!==s&&sl(n),s)if(r){let o=getComputedStyle(s),c=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",c?"positioned":"flow")}else sl(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>ll(r))}function ch(){if(Pt(),rt(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:n}=$i(),s=n||r;if(!s)return null;let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let h=getComputedStyle(o),d=o.getBoundingClientRect();if(h.position==="fixed"&&d.top>=36&&d.top<=70&&d.height>=48&&d.height<=92&&d.width>=Math.min(520,window.innerWidth*.42)){c=o;break}}o=o.parentElement}return u.nativeCache.topToolbar=c||null,c}function ol(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function ll(r){let{save:n,publish:s}=$i(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||al(n,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let c=document.querySelector('[data-sve77-top-toolbar="1"]'),h=ch();if(c&&c!==h&&ol(c),!h)return;if(!r){ol(h);return}let d=Math.ceil(lh());h.setAttribute("data-sve77-top-toolbar","1"),h.style.setProperty("right",d+"px","important"),h.style.setProperty("box-sizing","border-box","important"),h.style.setProperty("transition","right .16s ease","important")}function cl(){$t(()=>{if(u.open)try{let r=vt();r&&ri(r,{commit:!0,silent:!0}),rl()}catch{}},1200)}function ul(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=Le())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{re()}catch{}cl()}function uh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{Pi(),Ni(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),ul(),performance.mark("sve-panel-paint-end"),hh()}})})}function ph(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){ul();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&Le(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&re()}catch{}performance.mark("sve-prewarm-end"),cl()}function hh(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(n=>String(n.name).startsWith("sve-")).map(n=>({name:n.name,startTime:Math.round(n.startTime*100)/100}))}catch{}}function Ri(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=$t(ph,1200))}function Rt(r){if(!r&&!be())return;u.open=!!r;let n=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(n?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),Gr(),u.open){u.prewarmScheduled&&(il(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),uh();return}requestAnimationFrame(()=>{try{Ni(!1)}catch{}}),Ri()}function dh(){Rt(!1)}function Kr(){return[...new Set(C(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Fi(){let r=Kr();if(u.allEditors=r,!r.length)return!1;let n={html:null,css:null,js:null,head:null};return C("label").forEach(s=>{let o=s.querySelector(".CodeMirror")?.CodeMirror;if(!o)return;let c=(s.querySelector(":scope > span")?.textContent||s.querySelector("span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();c==="body html"?n.html=o:c==="css"?n.css=o:c==="javascript"?n.js=o:c.includes("additional head")&&(n.head=o)}),r.forEach(s=>{let o=s.getValue?.()||"";!n.js&&(o.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(o))&&(n.js=s),!n.html&&(o.includes("data-sve-section")||/<section[\s>]/i.test(o))&&(n.html=s),!n.css&&(o.includes("--sve-background-primary")||o.includes("--sve-font-heading"))&&(n.css=s)}),n.html=n.html||r[0]||null,n.css=n.css||r[1]||null,n.js=n.js||r[2]||null,n.head=n.head||r[3]||null,u.editors=n,Mh(),!0}function V(r){return u.editors[r]?.getValue?.()||""}function Yr(r,n=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(!s)return;s.dispatchEvent(new Event("input",{bubbles:!0})),n&&s.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function fh(r,n,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(n),r.save?.()}),Yr(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}Bi(),Sl()}}function at(r,n){fh(u.editors[r],n)}function mh(){return new URL(a.endpoint)}function gh(r,n=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!n&&s.origin!==mh().origin?"":s.href}catch{return""}}function bh(r){if(!r||typeof r!="object")return null;let n=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(n)||!s?null:{id:n,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:gh(r.source_url||r.sourceUrl)}}function xh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(bh).filter(Boolean)}async function yh(r,n={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),a.timeoutMs);try{return await fetch(r,{...n,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function vh(r,n={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=n.method||"GET";return new Promise((o,c)=>{GM_xmlhttpRequest({method:s,url:r,data:n.body,headers:n.headers||{},timeout:a.timeoutMs,onload:h=>{let d=Number(h.status),k=Number.isInteger(d)&&d>=200&&d<=599?d:200,S=String(h.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),w=String(h.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(h.responseText||"",{status:k,statusText:S,headers:{"Content-Type":w}}))},ontimeout:()=>c(new DOMException("The operation timed out","AbortError")),onerror:()=>c(new TypeError("Userscript request failed"))})})}async function Qr(r,n={}){if(typeof GM_xmlhttpRequest=="function")try{return await vh(r,n)}catch{}return await yh(r,n)}async function pl(r=!1){let n=u.templateLibrary;if(!r&&n.status==="ready"&&n.loadedAt&&Date.now()-n.loadedAt<3e5)return n.templates;n.status="loading",n.error="";try{let s=await Qr(a.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let c=xh(o);if(!c.length)throw new Error("Library belum memiliki template aktif");return n.templates=c,n.loadedAt=Date.now(),n.status="ready",c}catch(s){return n.templates=[],n.status="error",n.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),n.templates}}function kh(){return C('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let n=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return n==="kode"||n==="code"||n.includes("kode html")})||null}async function Sh(){if(Fi()&&u.editors.html)return!0;kh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(n=>window.setTimeout(n,120)),Fi()&&u.editors.html)return!0;return!1}function wh(r){return zp(r,n=>new DOMParser().parseFromString(n,"text/html"))}function nx(r,n){let s=String(n||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let c=hl(r,r.indexOf("{",o.index));if(!c)return null;try{return dl(c.text)}catch{return null}}function Ch(){let r=C('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,c="";for(let h=0;h<5&&o;h+=1,o=o.parentElement)c+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(c)})[0]||r[0]||null}function Eh(r){let n=Ch();if(!n)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),n.files=s.files,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}function Ft(r){let n=["style","audio","compatibility"],s=r||"content",o=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let c=document.getElementById(e);if(C(".tab",c).forEach(h=>{h.classList.toggle("active",h.dataset.tab===r)}),o){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}re()}async function Ah(r,n,s){if(!be())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=u.templateLibrary,c=wh(await r.text());if(c.blockers.length)throw console.error("[SVE] Template library validation failed",c.blockers),new Error(c.blockers[0]);if(!await Sh())throw new Error("Buka tab Kode terlebih dahulu");let h={html:V("html"),css:V("css"),js:V("js"),head:V("head")};Eh(r);let d=Date.now(),k=!1;for(;Date.now()-d<4500;){await new Promise(I=>window.setTimeout(I,140)),Fi();let S=V("html"),w=V("js");if(S!==h.html||w!==h.js){k=!0;break}}if(!k)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=h,o.importedId=n||"local-import",o.importedName=s||r.name||"Template lokal",Le(),Ue(),Ft("content")}async function Th(r){let n=u.templateLibrary,s=n.templates.find(c=>c.id===r),o=c=>{n.previousSource=null,n.importedId="",n.importedName="",n.status="error",n.error=c,u.uiPrepared=!1,re()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}n.status="loading",n.error="",u.uiPrepared=!1,re();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let c=await Qr(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",c.status),!c.ok)throw new Error("HTTP "+c.status);let h=await c.text();console.log("[SVE] Source length:",h.length);let d=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",k=new File([h],d,{type:"text/html"});await Ah(k,s.id,s.name),n.error="",n.status="ready",Ft("content")}catch(c){console.error("[SVE] Import gagal:",c),o("Import gagal: "+String(c?.message||"source tidak terbaca"))}}function sx(){let r=u.templateLibrary.previousSource;r&&be()&&(at("html",r.html),at("css",r.css),at("js",r.js),at("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",Le(),Ue(),Ft("library"))}function _h(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(n=>{at(n,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,Le(),Ue(),u.uiPrepared=!1,re()}function hl(r,n){let s=0,o=null,c=!1,h=!1,d=!1;for(let k=n;k<r.length;k++){let S=r[k],w=r[k+1];if(h){S===`
`&&(h=!1);continue}if(d){S==="*"&&w==="/"&&(d=!1,k++);continue}if(o){if(c){c=!1;continue}if(S==="\\"){c=!0;continue}S===o&&(o=null);continue}if(S==="/"&&w==="/"){h=!0,k++;continue}if(S==="/"&&w==="*"){d=!0,k++;continue}if(S==='"'||S==="'"||S==="`"){o=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:n,end:k+1,text:r.slice(n,k+1)}}return null}function dl(r){let n=0,s=T=>{throw new Error(T+" @"+n)};function o(){for(;n<r.length;){let T=r[n],A=r[n+1];if(/\s/.test(T)){n++;continue}if(T==="/"&&A==="/"){for(n+=2;n<r.length&&r[n]!==`
`;)n++;continue}if(T==="/"&&A==="*"){for(n+=2;n<r.length&&!(r[n]==="*"&&r[n+1]==="/");)n++;n+=2;continue}break}}function c(){let T=r[n++],A="";for(;n<r.length;){let B=r[n++];if(B===T)return A;if(B!=="\\"){A+=B;continue}let U=r[n++],ce={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};A+=Object.prototype.hasOwnProperty.call(ce,U)?ce[U]:U}s("String belum ditutup")}function h(){o();let T=n;for(/[A-Za-z_$]/.test(r[n]||"")||s("Identifier invalid"),n++;n<r.length&&/[A-Za-z0-9_$]/.test(r[n]);)n++;return r.slice(T,n)}function d(){let T=r.slice(n).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return T||s("Number invalid"),n+=T[0].length,Number(T[0])}function k(){let T=[];if(n++,o(),r[n]==="]")return n++,T;for(;n<r.length;)if(T.push(w()),o(),r[n]==="]"||(r[n]!==","&&s("Koma array hilang"),n++,o(),r[n]==="]"))return n++,T;s("Array belum selesai")}function S(){let T=Object.create(null);if(n++,o(),r[n]==="}")return n++,T;for(;n<r.length;){o();let A=['"',"'","`"].includes(r[n])?c():h();if(o(),Vr.has(A)&&s("Object key terlarang: "+A),Object.prototype.hasOwnProperty.call(T,A)&&s("Duplicate object key: "+A),r[n]!==":"&&s("Titik dua hilang"),n++,T[A]=w(),o(),r[n]==="}"||(r[n]!==","&&s("Koma object hilang"),n++,o(),r[n]==="}"))return n++,T}s("Object belum selesai")}function w(){o();let T=r[n];if(T==="{")return S();if(T==="[")return k();if(['"',"'","`"].includes(T))return c();if(T==="-"||/\d/.test(T||""))return d();let A=h();if(A==="true")return!0;if(A==="false")return!1;if(A==="null")return null;A==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+A)}let I=w();return o(),I}function Zr(r){let n=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+n+"|(?:window|globalThis)\\."+n+")\\s*=\\s*\\{"),o=[];function c(h,d){!h||o.some(k=>k.editor===h)||o.push({editor:h,kind:d})}c(u.editors.js,"js"),c(u.editors.html,"html"),c(u.editors.head,"head"),u.allEditors.forEach(h=>c(h,"unknown"));for(let h of o){let d=h.editor.getValue?.()||"",k=s.exec(d);if(!k)continue;let S=d.indexOf("{",k.index),w=hl(d,S);if(w)try{return{kind:h.kind,editor:h.editor,obj:dl(w.text),start:w.start,end:w.end}}catch(I){console.error("[SVE] parse "+r+" gagal",I)}}return null}function Ih(){if(!u.doc)return null;let r=[];return C("[data-sve-section]",u.doc).forEach((n,s)=>{let o=[],c=new Set;C("[data-sve-field]",n).forEach(d=>{let k=d.getAttribute("data-sve-field");!k||c.has(k)||(c.add(k),o.push({type:d.getAttribute("data-sve-type")||"text",label:d.getAttribute("data-sve-label")||Nt(k),path:k}))});let h=n.getAttribute("data-sve-countdown-path");h&&!c.has(h)&&o.push({type:"datetime",label:"Waktu Tujuan",path:h}),r.push({id:n.id||"section-"+s,label:n.getAttribute("data-sve-section")||Nt(n.id)||"Section "+(s+1),visiblePath:n.getAttribute("data-sve-visible-path")||null,canHide:!!n.getAttribute("data-sve-visible-path"),reorderable:(n.getAttribute("data-section-id")||n.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Oi(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=Ih(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function ke(){let r=Oi();return Array.isArray(r?.sections)?r.sections:[]}function J(r){return String(r?.id||"").trim()}function Ot(r){let n=J(r);return!(!n||n==="cover"||r?.locked===!0||r?.reorderable===!1)}function Mi(){let n=ke().map(J).filter(Boolean);if(!n.length)return[];let s=new Set(n),o=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(h=>String(h||"").trim()).filter(h=>h&&s.has(h)):[],c=[];return s.has("cover")&&c.push("cover"),o.forEach(h=>{h!=="cover"&&!c.includes(h)&&c.push(h)}),n.forEach(h=>{c.includes(h)||c.push(h)}),c}function ai(){let r=ke(),n=new Map(r.map(s=>[J(s),s]));return Mi().map(s=>n.get(s)).filter(Boolean)}function Di(r,n){let s=String(r||"").trim(),o=ke().find(k=>J(k)===s);if(!o||!Ot(o))return!1;let c=Mi(),h=c.indexOf(s);if(h<0)return!1;let d=h+n;for(;d>=0&&d<c.length;){let k=c[d],S=ke().find(w=>J(w)===k);if(k!=="cover"&&!S?.locked)return!0;d+=n}return!1}function fl(r){if(!u.config)return!1;let n=ke(),s=new Set(n.map(J).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(c=>String(c||"").trim()).filter(c=>c&&s.has(c)&&c!=="cover").forEach(c=>{o.includes(c)||o.push(c)}),n.map(J).filter(Boolean).forEach(c=>{o.includes(c)||o.push(c)}),u.config.sectionOrder=o,!0}function Lh(r=document){C("[data-section-card]",r).forEach(n=>{let s=n.dataset.sectionCard,o=v("[data-section-up]",n),c=v("[data-section-down]",n);o&&(o.disabled=!Di(s,-1)),c&&(c.disabled=!Di(s,1))})}function $h(r,n){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",n==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function ml(r,n,s){let o=v("#"+e+"-body");if(!o)return;let c=v(".reset-zone",o),h=new Map(C("[data-section-card]",o).map(d=>[d.dataset.sectionCard,d]));r.forEach(d=>{let k=h.get(d);k&&(c?o.insertBefore(k,c):o.appendChild(k))}),Lh(o),$h(h.get(n),s)}function gl(r,n){let s=String(r||"").trim(),o=ke().find(S=>J(S)===s);if(!o||!Ot(o))return;let c=Mi(),h=c.indexOf(s);if(h<0)return;let d=h+n;for(;d>=0&&d<c.length;){let S=c[d],w=ke().find(I=>J(I)===S);if(S!=="cover"&&!w?.locked)break;d+=n}if(d<0||d>=c.length||c[d]==="cover")return;let[k]=c.splice(h,1);c.splice(d,0,k),fl(c),se("Urutan section diperbarui"),ml(c,s,n<0?"up":"down")}function Ph(r,n,s){let o=String(r||"").trim(),c=String(n||"").trim();if(!o||!c||o===c)return;let h=ke(),d=h.find(U=>J(U)===o),k=h.find(U=>J(U)===c);if(!d||!k||!Ot(d))return;let S=s==="after"?"after":"before";if(c==="cover")S="after";else if(!Ot(k))return;let w=Mi(),I=w.indexOf(o);if(I<0)return;w.splice(I,1);let T=w.indexOf(c);if(T<0)return;let A=T+(S==="after"?1:0);w[0]==="cover"&&(A=Math.max(1,A)),A=Math.min(w.length,A),w.splice(A,0,o);let B=w.indexOf(o);fl(w),se("Urutan section diperbarui"),ml(w,o,B<I?"up":"down")}function bl(){let r=Oi();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function Le(){if(u.contentStateDirty&&!be())return!1;if(u.lastSerializedConfig="",!Fi())return u.sourceDirty=!0,!1;$t(()=>{try{cd()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(V("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let n=Zr("CONFIG");u.config=n?.obj||null,u.configRange=n||null,u.configSourceText=n?n.editor.getValue().slice(n.start,n.end):"",u.configOwnerSource=n?n.editor.getValue():"";let s=Zr("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(il(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Rh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function se(r){return Jr(r,{deferPreview:!0,syncImages:!0})?(Le(),!0):!1}function Jr(r,n={}){if(!u.config||!u.configRange?.editor)return!1;let s=Hd(u.config);if(s.length)return Vi(s[0]),!1;let c=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:Zr("CONFIG");if(!c||c.editor!==u.configRange.editor)return Vi("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let h=c.editor,d=h.getValue();if(d.slice(c.start,c.end)!==u.configSourceText)return Vi("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let k=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(k===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null;try{u.internalEditorWrite+=1,h.operation(()=>{if(typeof h.replaceRange=="function"&&typeof h.posFromIndex=="function")h.replaceRange(k,h.posFromIndex(c.start),h.posFromIndex(c.end));else{let w=h.getValue?.()||"",I=w.slice(0,c.start)+k+w.slice(c.end);h.setValue(I)}h.save?.()}),Yr(h,!1)}catch(w){S=w}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{h.getValue()!==d&&h.setValue(d),Yr(h,!1)}catch{}finally{u.internalEditorWrite-=1}return Vi("Perubahan belum tersimpan: "+S.message),!1}return c.end=c.start+k.length,c.obj=u.config,u.configRange=c,u.configSourceText=k,u.configOwnerSource=h.getValue(),u.lastSerializedConfig=k,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),Bi(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Fh(),n.deferPreview?Wh({syncImages:!!n.syncImages}):Ue({syncImages:!!n.syncImages}),!0}function Vi(r){u.commitError=r,u.contentStateDirty=!0;let n=document.getElementById(e+"-commit-notice");n&&(n.hidden=!1,n.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function Bi(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,V(r)]))}function xl(){return e+":fresh-default:"+location.origin+location.pathname}function Xr(){let r=["html",V("html"),"css",V("css"),"js",V("js"),"head",V("head")].join("\u241E"),n=2166136261;for(let s=0;s<r.length;s++)n^=r.charCodeAt(s),n=Math.imul(n,16777619);return(n>>>0).toString(16).padStart(8,"0")}function Nh(){let r={};return L.forEach(([,,n])=>{let s=Se(n);s&&(r[n]=s)}),le.forEach(n=>{r[n.variable]=Se(n.variable)||n.fallback}),{version:t,config:u.config?Re(u.config):null,cssTokens:r,googleFonts:Re(D(u.config,"editorStyle.googleFonts")||{})}}function yl(){try{let r=JSON.parse(localStorage.getItem(xl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function vl(r){try{localStorage.setItem(xl(),JSON.stringify(r))}catch{}}function kl(){if(!u.config)return!1;let r=Xr(),n=Nh();return u.defaults=n,u.defaultConfig=Re(n.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,Bi(),vl({version:t,defaults:n,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Rh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,o])=>V(s)===o))return;let r=Xr(),n=yl();if(n?.defaults&&n.lastManagedFingerprint===r){u.defaults=n.defaults,u.defaultConfig=Re(n.defaults.config||u.config),u.baselineFingerprint=n.baselineFingerprint||r,u.lastManagedFingerprint=r,Bi();return}kl()}function Sl(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,o])=>V(s)===o))return;let r=Xr(),n=yl()||{};u.lastManagedFingerprint=r,vl({version:t,defaults:n.defaults||u.defaults,baselineFingerprint:n.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Fh=ii(Sl,700);function Oh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{Le(),kl(),u.open?re():Ri()}catch{}},420)}function Mh(){u.allEditors.forEach(r=>{!r||u.editorChangeBound.has(r)||typeof r.on!="function"||(u.editorChangeBound.add(r),r.on("change",()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Oh())}))})}function ox(r){u.defaultConfig&&(fe(u.config,r,Re(D(u.defaultConfig,r))),se("Berhasil direset"),re())}let Dh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",Vh="https://nikahin.myscalev.com/dashboard",wl="nikahin_team_key";function Bh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(wl,"")||"").trim()}catch{return""}}function jh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(wl,String(r||"").trim()),!0)}catch{return!1}}let Uh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function ea(){return yt(u.scalevSlug||vt())||""}async function ta(r){let n=u.dashboardPin;if(n.busy)return;let s=ea();if(!s){n.status="error",n.message="Slug URL belum diisi di Pengaturan Scalev.",kt();return}let o=Bh();if(!o){n.status="needkey",n.message="",kt();return}if(!(r==="generate"&&n.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){n.busy=!0,n.status="loading",n.message="",kt();try{let h=await(await Qr(Dh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!h||h.ok!==!0?(n.status="error",n.pin="",n.message=Uh[h&&h.error]||"Gagal mengambil PIN."):(n.status="ready",n.slug=s,n.pin=String(h.pin||""),n.version=Number(h.version)||0,n.message=h.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{n.status="error",n.pin="",n.message="Tidak bisa menghubungi server."}n.busy=!1,kt()}}function Hh(){let r=v("#"+e+"-team-key"),n=r?r.value.trim():"",s=u.dashboardPin;if(!n){s.message="Kunci tim belum diisi.",kt();return}if(!jh(n)){s.message="Tampermonkey menolak menyimpan kunci.",kt();return}s.status="idle",s.message="",ta("peek")}async function zh(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}kt()}}function kt(){let r=document.activeElement?.id,n=v("#"+e+"-pin-panel");n&&(n.innerHTML=Cl());let s=v("#"+e+"-pin-pill");s&&(s.outerHTML=Ol()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function Cl(){let r=u.dashboardPin,n=ea(),s=d=>d?`<small class="auto-wedding-id-note">${E(d)}</small>`:"";if(!n)return`
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
      `;if(r.status==="needkey")return`
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
      `;let o=r.status==="ready"&&r.pin&&r.slug===n,c=r.busy||r.status==="loading",h=o?`
          <button type="button" ${c?"disabled":""}
            class="pin-ctl-action${c?" is-busy":""}"
            id="${e}-pin-generate"
          >
            Buat PIN baru
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
            value="${E(o?r.pin:"")}"
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
          <a
            class="pin-ctl-link"
            href="${Vh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard \u2197
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function El(){if(!u.defaults)return;u.defaults.config&&(u.config=Re(u.defaults.config),se()),Object.entries(u.defaults.cssTokens||{}).forEach(([n,s])=>{s&&He(n,s)});let r=u.defaults.googleFonts||{};u.config&&D(u.config,"editorStyle.googleFonts")!==void 0&&(fe(u.config,"editorStyle.googleFonts",Re(r)),se(),Yi()),Le(),re(),Ue()}function Wh({syncImages:r=!1,delay:n=100}={}){Ue({syncImages:r})}let ji=Wp({document,window,getConfig:()=>u.config,syncImages:ud,metrics:u.performance});function Ue({syncImages:r=!1,force:n=!1}={}){ji.request({images:r,force:n})}function Gh(r){if(!r)return"";let n=new Date(r);if(Number.isNaN(n.getTime()))return"";let s=o=>String(o).padStart(2,"0");return n.getFullYear()+"-"+s(n.getMonth()+1)+"-"+s(n.getDate())+"T"+s(n.getHours())+":"+s(n.getMinutes())}function qh(r){if(!r)return"";let n=new Date(r),s=h=>String(h).padStart(2,"0"),o=-n.getTimezoneOffset(),c=o>=0?"+":"-";return r+":00"+c+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function Se(r,n){let s=n?[n]:[ra()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let h of s){let d=c.exec(h||"");if(d)return d[1].trim()}return""}function ia(r,n){let s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function ra(){let r=[],n=V("css");return n&&r.push(n),[V("html"),V("head")].forEach(s=>{let o=String(s||""),c=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,h;for(;h=c.exec(o);)h[1]&&r.push(h[1])}),r.join(`
`)}function Kh(r,n,s){let o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(c,"$1"+s+"$3")}function Yh(r,n){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,n),o.body?.style?.setProperty(r,n),o.querySelector("[data-sve-template]")?.style?.setProperty(r,n)}catch{}};C("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function He(r,n){let s=["css","head","html"],o=null;for(let d of s)if(ia(V(d),r)){o=d;break}if(!o)return!1;let c=V(o),h=Kh(c,r,n);return h===c?!1:(at(o,h),Yh(r,n),Ue(),!0)}function Ui(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function we(r){let n=String(r?.type||"text").trim().toLowerCase();return n==="datetime-local"?"datetime":n==="checkbox"?"boolean":n}function Qh(r,n){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||zr(r,n)}function Al(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return Re(r.default);let n=we(r);return n==="boolean"?!1:""}function Zh(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function Jh(r){let n=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&n.push(`${s}="${E(r[s])}"`)}),r?.placeholder&&n.push(`placeholder="${E(r.placeholder)}"`),n.join(" ")}function Xh(r){let n=String(r?.help||r?.description||"").trim();return n?`
        <small class="field-help">
          ${E(n)}
        </small>
      `:""}function ed(r,n){let s=D(u.config,n),o=we(r),c=zr(r,n),h=Qh(r,n),d=c?vt()||s||"":s??"",k=`data-field-path="${E(n)}" data-field-type="${E(o)}" aria-label="${E(r?.label||n)}" `+(h?'data-field-readonly="1" ':""),S=Jh(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${k}
          ${S}
          ${h?'readonly aria-readonly="true"':""}
        >${E(d)}</textarea>
        ${c?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let I=Zh(r);return`
        <select
          class="content-control content-control-select"
          ${k}
          ${h?'disabled aria-disabled="true"':""}
        >
          ${r?.placeholder?`
                <option
                  value=""
                  ${String(d??"")===""?"selected":""}
                >
                  ${E(r.placeholder)}
                </option>
              `:""}

          ${I.map(T=>`
              <option
                value="${E(T.value)}"
                ${String(d??"")===T.value?"selected":""}
              >
                ${E(T.label)}
              </option>
            `).join("")}
        </select>
      `}if(o==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${k}
            ${d===!0?"checked":""}
            ${h?'disabled aria-disabled="true"':""}
          >

          <span>
            ${E(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(o==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${k}
          ${S}
          value="${E(Gh(d))}"
          ${h?'readonly aria-readonly="true"':""}
        >
      `;if(o==="url")return`
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${k}
            ${S}
            value="${E(d)}"
            ${h?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let w=["email","tel","number","date","time","color"].includes(o)?o:"text";return`
      <input
        class="content-control content-control-${w}"
        type="${w}"
        ${k}
        ${S}
        ${c?'data-auto-wedding-id="1"':""}
        value="${E(d)}"
        ${h?'readonly aria-readonly="true"':""}
      >
      ${c?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Tl(r,n){let s=n||r.path,o=E(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${ed(r,s)}

        ${Xh(r)}
      </div>
    `}function ni(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let n=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(n))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function _l(r){if(!r||typeof r!="object")return[];let n=u.repeaterContentFieldCache.get(r);if(n)return n;let s=(r?.fields||[]).filter(o=>!ni(o)&&we(o)!=="repeater"&&we(o)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function Il(r){if(Ll(r,D(u.config,r.path)))return Al(r.fields[0]);let n={};return(r.fields||[]).forEach(s=>{s?.key&&(n[s.key]=Al(s))}),n}function Ll(r,n){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(n)&&n.length?n:D(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function td(r,n,s){let o=String(r?.itemLabelKey||"").trim(),h=[o?n?.[o]:"",n?.title,n?.name,n?.label,n?.event,n?.provider].find(d=>String(d??"").trim());return String(h??"").trim()||(r.label||"Item")+" "+(s+1)}function id(r){return(r?.fields||[]).some(s=>we(s)==="repeater"||we(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function rd(r){let n=D(u.config,r.path),s=Array.isArray(n)?n:[],o=Number.isFinite(r.max)?r.max:999;return id(r)+s.map((c,h)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${E(td(r,c,h))}
              </strong>

              ${r.canDelete!==!1&&s.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${E(r.path)}"
                      data-repeat-index="${h}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${_l(r).map(d=>Tl({...d,type:d.type||"text"},Ll(r,s)?r.path+"."+h:r.path+"."+h+"."+d.key)).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&s.length<o?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${E(r.path)}"
            >
              + Tambah
              ${E(r.label||"Item")}
            </button>
          `:"")}function Mt(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function ad(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function Hi(r){if(!r||typeof r!="object")return[];let n=u.contentFieldCache.get(r);if(n)return n;let s=(r.fields||[]).filter(o=>!(ni(o)||o.type==="repeater"&&_l(o).length===0));return u.contentFieldCache.set(r,s),s}function nd(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return ai().forEach(n=>{let s=J(n),o="";try{o=JSON.stringify(n).toLowerCase()}catch{o=[s,n?.label||"",...Hi(n).flatMap(h=>[h?.label||"",h?.path||"",...(h?.fields||[]).flatMap(d=>[d?.label||"",d?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),u.contentSearchIndex=r,r}function zi(r){r&&u.contentSectionHtmlCache.delete(String(r))}function Wi(r){let n=J(r);if(!n)return $l(r);if(u.contentSectionHtmlCache.has(n))return u.contentSectionHtmlCache.get(n);let s=$l(r);return u.contentSectionHtmlCache.set(n,s),s}function Dt(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function aa(r){if(!r)return;let n=C("[data-section-card]",r).filter(o=>v("[data-section-body]",o)?.dataset.loaded==="1"),s=n.length-u.contentMaxMountedSections;s<=0||n.filter(o=>!o.classList.contains("open")).sort((o,c)=>Number(o.dataset.contentUse||0)-Number(c.dataset.contentUse||0)).slice(0,s).forEach(o=>{let c=v("[data-section-body]",o);c&&(c.replaceChildren(),c.dataset.loaded="0")})}function sd(){if(u.contentPrewarmScheduled||!u.config||!Oi())return;let r=ai();if(!r.length)return;u.contentPrewarmScheduled=!0;let n=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let o=2;for(;u.contentPrewarmCursor<r.length&&o>0;){let c=r[u.contentPrewarmCursor++],h=J(c);if(h&&!u.contentSectionHtmlCache.has(h)&&Wi(c),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=$t(n,1200))};u.contentPrewarmHandle=$t(n,1200)}function $l(r){let n=Hi(r),s=[],o="",c=h=>{let d=String(h||"").trim();return!d||d===o?"":(o=d,`
        <div class="sv-category" data-sv-category="${E(d)}">
          ${E(d)}
        </div>
      `)};return n.forEach(h=>{let d=String(h.category||"").trim();if(d||(o=""),h.type==="repeater"){let k=d?"":`
            <div class="group-title">
              ${E(h.label||"Daftar")}
            </div>
          `;s.push(c(d)+`
            <div class="group">
              ${k}
              <div class="group-body">
                ${rd(h)}
              </div>
            </div>
          `);return}s.push(c(d)+`
          <div class="group">
            <div class="group-title">
              ${E(h.label||h.path)}
            </div>

            <div class="group-body">
              ${Tl({...h,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),s.join("")}function Pl(r){return ai().find(n=>J(n)===r)||null}function od(r){if(!r)return;let n=v("[data-section-body]",r);if(!n||n.dataset.loaded==="1")return;let s=Pl(r.dataset.sectionCard);s&&(n.innerHTML=Wi(s),n.dataset.loaded="1",Dt(r),aa(r.closest("#"+e+"-body")))}function Nl(r){if(!r)return;let n=r.closest("#"+e+"-body");n&&(C("[data-section-card].open",n).forEach(s=>{s!==r&&(s.classList.remove("open"),v(".chev",s)?.setAttribute("aria-expanded","false"),Dt(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),v(".chev",r)?.setAttribute("aria-expanded","true"),od(r),Dt(r),aa(n))}function Rl(r){if(!r)return;let n=v("[data-section-body]",r),s=Pl(r.dataset.sectionCard);!n||!s||(zi(r.dataset.sectionCard),n.innerHTML=Wi(s),n.dataset.loaded="1",Dt(r))}function Fl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let n=u.contentCommitMessage;u.contentCommitMessage="",Jr(n||void 0,{validate:!1,deferPreview:!0})},100)}function be(r=""){let n=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!n&&!r?!0:Jr(s||void 0,{validate:!0,deferPreview:!0})}function Ol(){let r=u.dashboardPin,n=ea(),s=r.status==="ready"&&r.pin&&r.slug===n,o="Belum diambil",c="idle";return n?r.busy||r.status==="loading"?(o="Memuat\u2026",c="loading"):r.status==="needkey"?(o="Perlu kunci",c="warn"):r.status==="error"?(o="Gagal",c="error"):s&&(o="Aktif",c="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${c}">${o}</span>`}function Ml(){if(!u.config)return Mt();if(!Oi())return ad();let r=ai(),n=nd(),s=r.filter(o=>u.search?(n.get(J(o))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${Ol()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Cl()}</div>
      </div>

      ${s.map(o=>{let c=J(o),h=o.label||c,d=Ot(o),k=!o.visiblePath||D(u.config,o.visiblePath)!==!1,S=Hi(o),w=!u.search&&u.contentOpenSections.has(c);return`
            <article
              class="section ${d?"section-sortable":"section-pinned"}${w?" open":""}"
              data-section-card="${E(c)}"
            >
              <div
                class="section-head"
                title="${d?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${E(h)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${E(c)}"
                    draggable="${d?"true":"false"}"
                    ${d?"":"disabled"}
                    aria-label="Drag ${E(h)}"
                    title="${d?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${eh()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${E(c)}"
                    ${Di(c,-1)?"":"disabled"}
                    aria-label="Naikkan ${E(h)}"
                    title="Naik"
                  >
                    ${tl("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${E(c)}"
                    ${Di(c,1)?"":"disabled"}
                    aria-label="Turunkan ${E(h)}"
                    title="Turun"
                  >
                    ${tl("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${E(h)}
                  </strong>

                  <small>
                    ${d?"Drag / \u2191\u2193 \xB7 ":"Pinned \xB7 "}
                    ${S.length}
                    pengaturan
                  </small>
                </div>

                <div class="section-actions">
                  ${o.canHide&&o.visiblePath?`
                        <label class="switch-wrap">
                          <input
                            type="checkbox"
                            data-visible-path="${E(o.visiblePath)}"
                            ${k?"checked":""}
                          >
                          <span class="switch"></span>
                        </label>
                      `:""}
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${E(h)}"
                  aria-expanded="${w?"true":"false"}"
                >
                  ${el("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${E(c)}"
                data-loaded="${w?"1":"0"}"
              >
                ${w?Wi(o):""}
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
    `}function na(){return ke().flatMap(r=>r.fields||[]).filter(r=>we(r)==="repeater-image"&&r?.path)}function Dl(){return na()[0]||null}function Vl(r){let n=String(r||"").trim();return n&&na().find(s=>String(s.path||"").trim()===n)||null}function Gi(r){let n=Array.isArray(r?.fields)?r.fields:[];return n.find(s=>s?.key&&ni(s))||n.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Bl(r){let n=String(r||"").trim();if(!n)return null;for(let s of na()){let o=String(s.path||"").trim(),c=o+".";if(!o||!n.startsWith(c))continue;let h=n.slice(c.length).split(".");if(h.length!==2)continue;let d=Number(h[0]);if(!Number.isInteger(d)||d<0)continue;let k=Gi(s),S=String(k?.key||"src");if(h[1]===S)return{field:s,imageField:k,imageKey:S,rootPath:o,index:d}}return null}function jl(r){return u.doc?!!C('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function qi(){let r=[],n=new Set;return ke().forEach(s=>{(s.fields||[]).forEach(o=>{if(ni(o)&&o.type!=="repeater-image"&&o.path&&!n.has(o.path)&&(r.push({label:o.label||Nt(o.path),path:o.path,gallery:!1,wrapped:jl(o.path)}),n.add(o.path)),o.type==="repeater"&&o.path){let c=D(u.config,o.path),h=(o.fields||[]).filter(d=>ni(d)&&d.key);Array.isArray(c)&&h.length&&c.forEach((d,k)=>{h.forEach(S=>{let w=o.path+"."+k+"."+S.key;n.has(w)||(r.push({label:(s.label||o.label||Nt(o.path))+" "+(k+1)+" \xB7 "+(S.label||Nt(S.key)),path:w,gallery:!1,wrapped:jl(w)}),n.add(w))})})}if(we(o)==="repeater-image"&&o.path){let c=D(u.config,o.path),h=Gi(o),d=String(h?.key||"src");Array.isArray(c)&&c.forEach((k,S)=>{let w=o.path+"."+S+"."+d;n.has(w)||(r.push({label:(o.label||"Foto Gallery")+" "+(S+1),path:w,gallery:!0,index:S,rootPath:o.path,imageKey:d,wrapped:!0}),n.add(w))})}})}),u.doc&&C('[data-sve-type="image"][data-sve-field]',u.doc).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o||n.has(o))return;let c=Bl(o),h=!!c;r.push({label:s.getAttribute("data-sve-label")||Nt(o),path:o,gallery:h,index:c?c.index:null,rootPath:c?c.rootPath:null,imageKey:c?c.imageKey:null,wrapped:!!s.closest("[data-sve-image-wrapper]")}),n.add(o)}),r}function sa(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function Vt(r){let n=u.config?.imageSettings,s=n&&typeof n=="object"?n[r]:null,c=Bl(r)?"1:1":"16:9";return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:Xp(s?.fit),alignPos:Ur.includes(s?.alignPos)?s.alignPos:"default",ratio:jr.includes(s?.ratio)?s.ratio:c,hidden:s?.hidden===!0}}function St(r,n){let s=sa();s[r]={...Vt(r),...n}}function ld(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let n=new Set(qi().map(s=>s.path));Object.keys(r).forEach(s=>{n.has(s)||delete r[s]})}function cd(){let r=V("css");if(!r)return;let n=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return n!==r.trim()?(at("css",n),!0):!1}function ud(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let c=Vt(o),h=s.closest("[data-sve-image-wrapper]"),d=h||s,k=Jo[c.ratio]||Jo["16:9"],S=c.align==="left"?"0":"auto",w=c.align==="right"?"0":"auto";h?(h.style.display=c.hidden?"none":"",h.style.width=c.width+"%",h.style.maxWidth="100%",h.style.marginLeft=S,h.style.marginRight=w,h.style.aspectRatio=k,s.style.width="100%"):(s.style.display=c.hidden?"none":"",s.style.width=c.width+"%",s.style.maxWidth="100%",s.style.marginLeft=S,s.style.marginRight=w,s.style.aspectRatio=k),c.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=c.fit;let I=Jp[c.alignPos]||"";I?s.style.objectPosition=I:s.style.removeProperty("object-position"),s.style.height="100%"})}function lx(){ji.request({images:!0})}function pd(r){let n={"top left":`
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
        ${n[r]||n.default}
      </svg>
    `}function hd(r){let n=Vt(r.path),s=h=>h==="left"?`
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
        `:h==="right"?`
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
      `,o=Ur.filter(h=>h!=="default").map(h=>`
            <button
              type="button"
              class="advance-pos-btn ${n.alignPos===h?"active":""}"
              data-image-alignpos-path="${E(r.path)}"
              data-image-alignpos="${E(h)}"
              title="${E(h)}"
              aria-label="${E("Posisi "+h)}"
            >
              ${pd(h)}
            </button>
          `).join(""),c=jr.map(h=>`
            <button
              type="button"
              class="advance-ratio-btn ${n.ratio===h?"active":""}"
              data-image-ratio-path="${E(r.path)}"
              data-image-ratio="${h}"
            >
              ${h}
            </button>
          `).join("");return`
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
              ${o}
            </div>

            <button
              type="button"
              class="advance-pos-default ${n.alignPos==="default"?"active":""}"
              data-image-alignpos-path="${E(r.path)}"
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
                value="${n.width}"
                data-image-width-path="${E(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${n.width}"
                  data-image-width-number="${E(r.path)}"
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
                data-image-fit-path="${E(r.path)}"
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
                data-image-fit-path="${E(r.path)}"
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
                data-image-fit-path="${E(r.path)}"
                data-image-fit="contain"
              >
                <span class="advance-fit-preview contain"></span>
                <span class="advance-fit-label">
                  Contain
                </span>
              </button>
            </div>
          </div>

          <div class="advance-group advance-group-last">
            <p class="advance-label">
              Aspect Ratio
            </p>

            <div class="advance-ratio-grid">
              ${c}
            </div>
          </div>

        </div>
      </details>
    `}function dd(){return`
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
    `}function fd(){return`
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
    `}function Ul(){return`
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
    `}function md(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${Ul()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function gd(){return`
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
    `}function Hl(r){return r?`
      <div class="gallery-add-wrap">
        <button
          type="button"
          class="gallery-add-button"
          data-gallery-add="${E(r.path)}"
        >
          + Tambah Foto
        </button>
      </div>
    `:""}function bd(r,n){let s=D(u.config,r);if(!Array.isArray(s)||n<0||n>=s.length)return;let o=Vl(r),c=Gi(o),h=String(c?.key||"src"),d=sa(),k={};for(let S=0;S<s.length;S++){let w=r+"."+S+"."+h;Object.prototype.hasOwnProperty.call(d,w)&&(k[S]=Re(d[w]))}s.splice(n,1),Object.keys(d).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+h)&&delete d[S]});for(let S=0;S<s.length;S++){let w=S<n?S:S+1,I=k[w];I&&(d[r+"."+S+"."+h]=I)}ld(),se("Foto gallery dihapus"),re()}function xd(r){u.config&&(fe(u.config,r,""),St(r,{hidden:!0}),se("Gambar dihapus"),re())}function yd(){if(!u.config||!u.defaultConfig)return;let r=Dl();r&&fe(u.config,r.path,Re(D(u.defaultConfig,r.path)||[])),qi().filter(n=>!n.gallery).forEach(n=>{fe(u.config,n.path,Re(D(u.defaultConfig,n.path))??"")}),u.config.imageSettings=Re(u.defaultConfig.imageSettings||{}),se(),re()}function vd(){if(!u.config)return Mt();let r=qi().filter(d=>u.search?(d.label+" "+d.path).toLowerCase().includes(u.search):!0),n=Dl(),s=n?r.filter(d=>d.gallery&&d.rootPath===n.path):[],o=s.length?s[s.length-1].path:"",c=r.map(d=>{let k=D(u.config,d.path)||"",S=Vt(d.path),I=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!d.gallery?`data-gallery-delete-index="${E(d.rootPath)}" data-gallery-index="${Number(d.index)}"`:`data-image-delete-path="${E(d.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${fd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${E(d.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${gd()}
              </button>
            </div>
          `,T=`
            <div
              class="group image-card ${S.hidden?"image-card-hidden":""}"
              data-image-card-path="${E(d.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${k?`
                        <img
                          class="preview"
                          src="${E(k)}"
                          alt=""
                        >
                      `:md(d.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${E(d.label)}">
                    ${E(d.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${E(d.path)}">
                    CONFIG.${E(d.path)}
                  </p>
                </div>

                ${I}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${E(d.path)}"
                  value="${E(k)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${E(d.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${E(d.path)}"
                  title="Paste URL"
                  aria-label="Paste URL ${E(d.label)} dari clipboard"
                >
                  ${dd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${hd(d)}
            </div>
          `;return n&&d.path===o?T+Hl(n):T}).join(""),h=n&&!s.length&&!u.search?Hl(n):"";return c+h+`
        <div class="image-global-reset">
          <button
            type="button"
            class="button danger full"
            id="${e}-reset-images"
          >
            Reset
          </button>
        </div>
      `}function Bt(r,n){let s=r?.closest(".image-card");if(!s)return;let o=v(".image-preview-shell",s);if(!o)return;let c=r.value.trim(),h=Vt(n),d=v(".preview",o);if(c){if(!d||d.tagName!=="IMG"){let k=document.createElement("img");k.className="preview",k.alt="",d?d.replaceWith(k):o.prepend(k),d=k}d.src=c}else{if(!d||d.tagName!=="BUTTON"||!d.classList.contains("image-upload-placeholder")){let k=document.createElement("button");k.type="button",k.className="preview empty image-upload-placeholder",k.dataset.imageFocus=n,k.setAttribute("aria-label","Masukkan URL gambar"),d?d.replaceWith(k):o.prepend(k),d=k}d.innerHTML=`
        <span class="image-upload-icon">
          ${Ul()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,d.onclick=()=>{r.focus(),r.select?.()}}d.style.width="100%",d.style.height="100%",d.style.maxWidth="none",d.style.aspectRatio="auto",d.style.objectFit="cover",d.style.marginLeft="0",d.style.marginRight="0",s.classList.toggle("image-card-hidden",h.hidden)}function si(r,n){let s=Vt(n);C(`[data-image-align-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlign===s.align)}),C(`[data-image-fit-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageFit===s.fit)}),C(`[data-image-alignpos-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlignpos===s.alignPos)}),C(`[data-image-ratio-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageRatio===s.ratio)});let o=v(`[data-image-width-path="${CSS.escape(n)}"]`,r),c=v(`[data-image-width-number="${CSS.escape(n)}"]`,r);o&&(o.value=s.width),c&&(c.value=s.width)}function kd(r){let n=String(r||"").trim();if(!n||/^var\(/i.test(n))return!1;try{return CSS.supports("color",n)}catch{return/^#[0-9a-f]{3,8}$/i.test(n)}}function oi(r,n="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let c=o[1];return c.length===3&&(c=c.split("").map(h=>h+h).join("")),"#"+c.slice(0,6).toLowerCase()}try{let c=document.createElement("span");if(c.style.color=s,!c.style.color)return n;c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c);let h=getComputedStyle(c).color;c.remove();let d=h.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!d)return n;let k=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+k(d[1])+k(d[2])+k(d[3])}catch{return n}}function Sd(){return L.some(([,,r])=>!!Se(r))}function wd(r,n){let s=Se(n);if(!s)return`
        <div class="field color-row color-row-unset">
          <div
            class="color-unset-swatch"
            aria-hidden="true"
          ></div>

          <div>
            <label>
              ${E(r)}
            </label>

            <input
              type="text"
              value=""
              placeholder="Belum diset"
              disabled
              aria-label="${E(r)} belum tersedia"
            >

            <small>
              ${E(n)}
            </small>
          </div>
        </div>
      `;let o=oi(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${E(n)}"
          value="${E(o)}"
          aria-label="${E(r)}"
        >

        <div>
          <label>
            ${E(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${E(n)}"
            value="${E(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${E(n)}
          </small>
        </div>
      </div>
    `}function Cd(){return u.config?Sd()?["Background","Body Teks","Button Primary","Button Secondary"].map(n=>`
            <div class="group">
              <div class="group-title">
                ${n}
              </div>

              ${L.filter(s=>s[0]===n).map(([,s,o])=>wd(s,o)).join("")}
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
      `:Mt()}let Ed={"playwrite brasil guides":"Playwrite BR Guides"};function oa(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function la(r){let n="";try{n=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{n=String(r||"").replace(/\+/g," ")}return oa(n.split(":")[0].replace(/\s+/g," "))}function li(r){let n=oa(r);return n?Ed[n.toLowerCase()]||n:""}function Ad(r){let n=String(r||"").trim();if(!n)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(n))try{let o=new URL(n),c=o.hostname.toLowerCase();if(c==="fonts.google.com"||c==="www.fonts.google.com"){let h=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(h?.[1])return{family:li(la(h[1])),isUrl:!0,valid:!0};let d=o.searchParams.get("family");return d?{family:li(la(d)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(c==="fonts.googleapis.com"){let d=o.searchParams.getAll("family")[0]||"";return d?{family:li(la(d)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=n.split(",")[0];return{family:li(oa(s)),isUrl:!1,valid:!0}}function Td(r,n=""){let s=li(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),c=String(n||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(c?":wght@"+encodeURIComponent(c):"")+"&display=swap"}function ca(r,n=""){let s=Td(r,n);return s?new Promise(o=>{let c=e+"-font-validation-link";document.getElementById(c)?.remove();let h=document.createElement("link"),d=!1,k=w=>{d||(d=!0,clearTimeout(S),h.onload=null,h.onerror=null,o(w))},S=setTimeout(()=>{k({ok:!1,reason:"timeout"})},7e3);h.id=c,h.rel="stylesheet",h.href=s,h.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let w=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!w||w.length===0){k({ok:!1,reason:"font-file"});return}}k({ok:!0,reason:"ok",url:s})}catch{k({ok:!1,reason:"font-file"})}},h.onerror=()=>{k({ok:!1,reason:"stylesheet"})},document.head.appendChild(h)}):Promise.resolve({ok:!1,reason:"invalid"})}async function _d(r,n){let o=Ki(n,Se(n==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),c=await ca(r,o);return c.ok?{...c,weight:o}:o!=="400"&&(c=await ca(r,"400"),c.ok)?{...c,weight:"400",normalizedWeight:!0}:(c=await ca(r,""),c.ok?{...c,weight:"400",normalizedWeight:o!=="400"}:{...c,weight:o})}function ua(r,n){if(r)try{let s=e+"-preview-font-link",o=r.getElementById(s);if(!n){o?.remove();return}o||(o=r.createElement("link"),o.id=s,o.rel="stylesheet",(r.head||r.documentElement)?.appendChild(o)),o.getAttribute("href")!==n&&o.setAttribute("href",n)}catch{}}function zl(){let r=ql();C("iframe").forEach(n=>{try{ua(n.contentDocument,r)}catch{}}),requestAnimationFrame(()=>{C("iframe").forEach(n=>{try{ua(n.contentDocument,r)}catch{}})})}function Wl(r){return String(D(u.config,"editorStyle.googleFonts."+r)||"").trim()}function Gl(r){let n=Wl(r);if(n)return n;let o=Se(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function Id(r,n){return n==="heading"?"serif":"sans-serif"}function Ld(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function $d(r,n){return Q.includes(String(n))}function Pd(r){return Q}function Ki(r,n){let s=String(n||"").trim();return Q.includes(s)?s:"400"}function Nd(r,n=!1){let s=v("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",c=v(`[data-style-var="${CSS.escape(o)}"]`,s);if(!c)return;let h=Se(o)||"400",d=Ki(r,h);n&&d!==h&&He(o,d),c.innerHTML=Zi(d,Q,!1),c.value=d}function ql(){let r=new Map;["heading","body"].forEach(s=>{let o=Wl(s);if(!o)return;let c=o.trim().toLowerCase();if(!c)return;r.has(c)||r.set(c,{family:o,weights:new Set});let d=Ki(s,Se(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(c).weights.add(d)});let n=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),c=Array.from(s.weights).sort((h,d)=>Number(h)-Number(d));return"family="+o+":wght@"+c.join(";")});return n.length?"https://fonts.googleapis.com/css2?"+n.join("&")+"&display=swap":""}function Yi(){let r=ql(),n="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r){if(u.editors.head){let d=V("head");o.test(d)&&at("head",d.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),C("iframe").forEach(d=>{try{ua(d.contentDocument,"")}catch{}});return}let c=`${n}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${r}">
${s}`;if(u.editors.head){let d=V("head");d=o.test(d)?d.replace(o,c):d.trimEnd()+`

`+c+`
`,at("head",d)}let h=document.getElementById(e+"-font-link");h||(h=document.createElement("link"),h.id=e+"-font-link",h.rel="stylesheet",document.head.appendChild(h)),h.href=r,zl()}async function Qi(r){let n=v("#"+e+"-"+r+"-font");if(!n)return;let s=Ad(n.value);if(!s.valid||!s.family)return;let o=s.family;n.value=o;let c=await _d(o,r);if(!c.ok){c.reason==="stylesheet"||c.reason==="font-file"||c.reason;return}let h=r==="heading"?"--sve-font-heading":"--sve-font-body",d=r==="heading"?"--sve-heading-weight":"--sve-body-weight";c.normalizedWeight&&c.weight&&He(d,c.weight),fe(u.config,"editorStyle.googleFonts."+r,o),se(),He(h,`"${o}", ${Id(o,r)}`),Nd(r,!1),Yi(),zl(),Ue()}function Zi(r,n,s=!0,o=!1){let c=String(r||"").trim(),h=s&&c&&!n.includes(c)?[c,...n]:[...n];return o&&(h=[...new Set(h)].sort((d,k)=>{let S=Number.parseFloat(d),w=Number.parseFloat(k);return Number.isFinite(S)&&Number.isFinite(w)?S-w:String(d).localeCompare(String(k))})),h.map((d,k)=>{let S=n.includes(c)||s?d===c:k===0;return`
            <option
              value="${E(d)}"
              ${S?"selected":""}
            >
              ${E(d)}
            </option>
          `}).join("")}function Rd(r){let n=Se(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Zi(n,q,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Zi(n,Z,!1)}
        </select>
      `;if(r.type==="weight"){let s=Ld(r.variable),o=s?Pd(s):Q,c=s?Ki(s,n):n;return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Zi(c,o,!1)}
        </select>
      `}return""}function Fd(){if(!u.config)return;let r=u.defaultConfig||{},n=D(r,"editorStyle.googleFonts.heading"),s=D(r,"editorStyle.googleFonts.body");typeof n=="string"&&fe(u.config,"editorStyle.googleFonts.heading",n),typeof s=="string"&&fe(u.config,"editorStyle.googleFonts.body",s),le.forEach(o=>{let c=Ui(o.variable)||o.fallback;He(o.variable,c)}),se(),Yi(),re()}function Od(){return u.config?`
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
            value="${E(Gl("heading"))}"
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
            value="${E(Gl("body"))}"
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

          ${el("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${_e.map(r=>{let n=le.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${E(r.label)}</div>
                  <div class="typography-control-grid">
                    ${n.map(s=>`
                      <div class="typography-control">
                        <label>${E(s.label)}</label>
                        ${Rd(s)}
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
    `:Mt()}function Ji(r){let n=String(r||"").trim().toLowerCase();if(!n)return 0;if(/^\d+$/.test(n))return Math.max(0,Number(n));let s=n.split(":").map(d=>Number(d));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(n.match(/(\d+)h/)?.[1]||0),c=Number(n.match(/(\d+)m/)?.[1]||0),h=Number(n.match(/(\d+)s/)?.[1]||0);return o||c||h?Math.max(0,o*3600+c*60+h):0}function Kl(r){let n=String(r||"").trim();if(!n)return 0;try{let s=new URL(n,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let c of o){let h=Ji(c);if(h>0)return h}}catch{let o=n.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return Ji(o?.[1]||"")}return 0}function pa(r){let n=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(n/3600),o=Math.floor(n%3600/60),c=n%60,h=d=>String(d).padStart(2,"0");return s>0?s+":"+h(o)+":"+h(c):o+":"+h(c)}function Md(r,n){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(n)||0));if(!s)return s;try{let c=new URL(s,location.href);return c.searchParams.delete("start"),o>0?c.searchParams.set("t",String(o)):c.searchParams.delete("t"),c.hash&&/(?:^#|[&#])t=/i.test(c.hash)&&(c.hash=""),c.toString()}catch{let h=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?h:h+(h.includes("?")?"&":"?")+"t="+o}}function Yl(r,n){let s=Kl(n),o=v("#"+e+"-audio-start-enabled",r),c=v("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),c&&(c.disabled=s<=0,c.value=pa(s))}function Dd(){if(!u.config)return Mt();let r=bl(),n=r.path||"assets.audio",s=D(u.config,n),o=typeof s=="string"?s:"",c=Kl(o);return`
      <div class="group">
        <div class="group-title">
          ${E(r.label||"Audio Undangan")}
        </div>

        <div class="field audio-field">
          <label>
            URL Audio / YouTube
          </label>

          <input
            type="text"
            id="${e}-audio-url"
            value="${E(o)}"
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
              value="${E(pa(c))}"
              placeholder="0:00"
              ${c>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function Xi(r,n){(Array.isArray(r)?r:[]).forEach(s=>{n(s),we(s)==="repeater"&&Xi(s.fields,n),we(s)==="repeater-image"&&Xi(s.fields,n)})}function Ql(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},n={html:V("html"),css:V("css"),js:V("js"),head:V("head")},s=(S,w)=>{try{let I=new URL(w,location.origin);if(I.protocol!=="https:"&&I.protocol!=="http:")return;let T=I.origin;if(T===location.origin)return;r[S]?.add(T)}catch{}},o=(S,w)=>{let I=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(I)||[]).forEach(T=>s(w,T))};try{let S=new DOMParser().parseFromString(n.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(w=>{s("img_src",w.getAttribute("src")||w.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(w=>s("media_src",w.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(w=>s("frame_src",w.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(w=>s("script_src",w.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(w=>s("style_src",w.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(w=>s("manifest_src",w.getAttribute("href")||""))}catch{}let c=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,h;for(;h=c.exec((n.css||"")+`
`+(n.head||""));){let S=h[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}o(n.head,"style_src");let d=JSON.stringify(u.config||{}),k=D(u.config,"guestbook.endpoint");return k&&s("connect_src",k),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let w=D(u.config,S);w&&s("connect_src",w)}),(d.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(n.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,w])=>[S,Array.from(w).sort()]))}function Vd(){return{"Body HTML":V("html"),CSS:V("css"),JavaScript:V("js"),"Additional Head":V("head"),CONFIG:JSON.stringify(u.config||{})}}function Zl(r,n,s){let o=Vd(),c=Qp(o);c.length?r("Gambar base64 terdeteksi di "+Zo(c)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let h=Zp(o);h.length&&n("Data URI berukuran besar di "+Zo(h)+"; pertimbangkan pindah ke file hosting")}function Bd(){let r=[],n=[],s=[],o=Y=>r.push(Y),c=Y=>n.push(Y),h=Y=>s.push(Y);if(u.config?h("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),u.schema?h("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),h("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let d=Array.isArray(u.schema?.sections)?u.schema.sections:[],k=d.map(J).filter(Boolean),S=new Set(k);d.length||o("SVE_SCHEMA custom page belum memiliki section"),k.length!==S.size&&o("SVE_SCHEMA memiliki duplicate section id");let w=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],I=new Set(w);w.length!==I.size&&o("CONFIG.sectionOrder memiliki duplicate id"),k.forEach(Y=>{I.has(Y)||o("sectionOrder belum memuat: "+Y)}),d.forEach(Y=>{let xe=J(Y);Y.visiblePath&&(xt(Y.visiblePath)||o("Unsafe visiblePath pada section "+xe),u.config&&typeof D(u.config,Y.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+xe)),Xi(Y.fields,de=>{let pt=we(de);Ii.has(pt)||o("Field type tidak didukung: "+pt+" ("+(de.path||de.key||xe)+")"),de.path&&!xt(de.path)&&o("Unsafe field path: "+de.path),(pt==="repeater"||pt==="repeater-image")&&!Array.isArray(de.fields)&&o("Repeater tanpa fields[]: "+(de.path||xe)),pt==="repeater"&&(de.fields||[]).forEach(ui=>{let ha=we(ui);(ha==="repeater"||ha==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(de.path||xe)),ui.key||o("Repeater subfield tanpa stable key: "+(de.path||xe))})})});let T=["html","css","js","head"].map(V).join(`
`);/\beval\s*\(/.test(T)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(T)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(T)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(T)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(T)&&o("Kemungkinan secret/private credential terdeteksi"),Zl(o,c,h);let A=ra(),B=le.map(Y=>Y.variable).filter(Y=>!ia(A,Y));B.length?o("Typography role tokens belum lengkap: "+B.join(", ")):h("Semua typography role tokens tersedia");let U=Ql();return Object.values(U).reduce((Y,xe)=>Y+xe.length,0)&&c("External origin terdeteksi; salin CSP manifest ke Scalev Security"),h("Custom page aktif; validasi "+Ie.length+" section wedding dilewati"),{status:r.length?"BLOCKER":n.length?"WARNING":"PASS",blockers:r,warnings:n,passes:s,csp:U}}let er=null;function Jl(){let r=["html","css","js","head"].map(V);if(er&&r.every((o,c)=>o===er.sources[c]))return er.report;let n=new DOMParser().parseFromString(r[0],"text/html");n.head.insertAdjacentHTML("beforeend",r[3]);let s=Yo({doc:n,scripts:[r[2],...Array.from(n.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(n.querySelectorAll("style"),o=>o.textContent).join(`
`)});return er={sources:r,report:s},s}function Xl(){let r=Jl();if(u.schema?.template?.type==="custom-page"){let F=Bd();return F.blockers=[...new Set([...r.blockers,...F.blockers])],F.blockers.length&&(F.status="BLOCKER"),F}let n=[...r.blockers],s=[],o=[],c=F=>n.push(F),h=F=>s.push(F),d=F=>o.push(F);if(u.config?d("CONFIG terbaca sebagai static object"):c("CONFIG tidak terbaca"),u.schema?d("SVE_SCHEMA eksplisit tersedia"):c("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),d("CONFIG JSON-compatible")}catch{c("CONFIG tidak dapat diserialisasi dengan aman")}let k=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=k.map(J).filter(Boolean),w=new Set(S);S.length!==w.size&&c("SVE_SCHEMA memiliki duplicate section id"),Ie.forEach(F=>{w.has(F)||c("Canonical section hilang: "+F)}),Ie.every(F=>w.has(F))&&d(Ie.length+" canonical sections tersedia");let I=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],T=new Set(I);I.length!==T.size&&c("CONFIG.sectionOrder memiliki duplicate id"),Ie.forEach(F=>{T.has(F)||c("sectionOrder belum memuat: "+F)}),I[0]&&I[0]!=="cover"&&c("Cover wajib menjadi section pertama"),Ie.filter(F=>F!=="cover").forEach(F=>{typeof D(u.config,"sections."+F)!="boolean"&&c("Boolean visibility tidak valid: sections."+F)}),k.forEach(F=>{let $e=J(F);$e==="cover"?(F.locked!==!0||F.canHide!==!1)&&c("Cover harus locked dan canHide:false"):F.visiblePath&&!xt(F.visiblePath)&&c("Unsafe visiblePath pada section "+$e),Xi(F.fields,ze=>{let pi=we(ze);Ii.has(pi)||c("Field type tidak didukung: "+pi+" ("+(ze.path||ze.key||$e)+")"),ze.path&&!xt(ze.path)&&c("Unsafe field path: "+ze.path),(pi==="repeater"||pi==="repeater-image")&&!Array.isArray(ze.fields)&&c("Repeater tanpa fields[]: "+(ze.path||$e)),pi==="repeater"&&(ze.fields||[]).forEach(oc=>{let lc=we(oc);(lc==="repeater"||lc==="repeater-image")&&c("Nested repeater tidak diizinkan: "+(ze.path||$e)),oc.key||c("Repeater subfield tanpa stable key: "+(ze.path||$e))})})});let A=["html","css","js","head"].map(V).join(`
`);/\beval\s*\(/.test(A)&&c("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(A)&&c("new Function() terdeteksi"),/javascript\s*:/i.test(A)&&c("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(A)&&c("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(A)&&c("Kemungkinan secret/private credential terdeteksi"),Zl(c,h,d);let B=V("js");/\bconst\s+CONFIG\s*=/.test(B)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(B)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let U=D(u.config,"sections.rsvp")===!0,ce=D(u.config,"sections.guestbook")===!0,Y=String(D(u.config,"rsvp.endpoint")||""),xe=D(u.config,"rsvp.enabled"),de=!!Y||xe!==void 0;if(U)if(de)xe!==!0&&c("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(Y)||c("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let F=String(D(u.config,"extensions.rsvpBackend.mode")||"none");if(F!=="none"&&F!=="external"&&c("RSVP backend mode harus none atau external"),F==="external"){let $e=String(D(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test($e)||c("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(ce){let F=D(u.config,"guestbook.enabled"),$e=String(D(u.config,"guestbook.endpoint")||"");F!==!0&&c("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test($e)||c("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let pt=ra(),ui=le.map(F=>F.variable).filter(F=>!ia(pt,F));ui.length?c("Typography role tokens belum lengkap: "+ui.join(", ")):d("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(pt)&&h("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let sc=Ql();return Object.values(sc).reduce((F,$e)=>F+$e.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):d("Tidak ada external origin wajib dari scanner"),{status:n.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:n,warnings:s,passes:o,csp:sc}}function jd(r){return r==="PASS"?`
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
    `}function Ud(){if(!u.config)return Mt();let r=Xl(),n=(c,h)=>c.length?`<ul>${c.map(d=>`<li>${E(d)}</li>`).join("")}</ul>`:`<p class="compat-empty">${E(h)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${jd(r.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${E(s)}</strong>
            </div>
            <small>${E(o)}</small>
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
              <pre class="compat-code">${E(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function Hd(r){let n=[],s=new WeakSet,o=(c,h="CONFIG")=>{if(c!==null){if(typeof c=="object"){if(s.has(c)){n.push("Referensi berulang: "+h);return}s.add(c)}if(Array.isArray(c)){c.forEach((d,k)=>o(d,h+"."+k));return}if(typeof c=="object"){Object.keys(c).forEach(d=>{Vr.has(d)&&n.push("Forbidden key: "+h+"."+d),o(c[d],h+"."+d)});return}["string","number","boolean"].includes(typeof c)||n.push("Non-static value: "+h),typeof c=="number"&&!Number.isFinite(c)&&n.push("Non-finite number: "+h)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{n.push("CONFIG gagal round-trip JSON")}return n}function zd(){let r=u.templateLibrary,n=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(h=>n?[h.name].join(" ").toLowerCase().includes(n):!0);r.status==="idle"&&pl().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,re())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${E(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",c=s.map(h=>{let d=!!h.sourceUrl,k=h.id===r.importedId;return`
        <article class="library-card${k?" is-active":""}" role="listitem"${k?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${E(h.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${E(String(h.commissionRate))}%</strong> dari harga paket</span>
                <a href="${l}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${k?"danger":"primary"} library-import-button"
                data-library-import="${E(h.id)}"
                ${d?"":"disabled"}
              >${d?k?"Reset":"Gunakan":"Belum siap"}</button>
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
                <span>${n?"Coba kata pencarian lain.":"Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `}function Wd(){let r=v("#"+e+"-search");if(!r)return;let n=u.tab==="library";r.placeholder=n?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",n?"Cari template":"Cari section atau field")}function re(){let r=performance.now(),n=v("#"+e+"-body");if(!n)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}n.dataset.sveTab=u.tab||"content",u.tab==="library"?n.innerHTML=zd():u.tab==="content"?n.innerHTML=Ml():u.tab==="images"?n.innerHTML=vd():u.tab==="colors"?n.innerHTML=Cd():u.tab==="style"?n.innerHTML=Od():u.tab==="audio"?n.innerHTML=Dd():u.tab==="compatibility"?n.innerHTML=Ud():n.innerHTML=Ml(),Qd(n),Wd(),u.tab==="content"&&sd(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function ec(r,n){return v('[data-image-path="'+CSS.escape(n)+'"]',r)}let Gd="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function tc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(Gd),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function qd(r,n){let s=ec(r,n);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):Br(o)?(tc(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function Kd(r){let n=String(r.dataset.fieldType||"text"),s=r.value;return n==="boolean"?s=!!r.checked:n==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):n==="datetime"&&(s=qh(r.value)),s}function ic(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;fe(u.config,r.dataset.fieldPath,Kd(r));let n=r.closest("[data-section-card]");return zi(n?.dataset.sectionCard),Dt(n),u.contentStateDirty=!0,!0}function rc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let n=()=>{C(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;be(),gl(o.dataset.sectionUp,-1);return}let c=s.target.closest("[data-section-down]");if(c){if(s.preventDefault(),s.stopPropagation(),c.disabled)return;be(),gl(c.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let h=s.target.closest("[data-repeat-add]");if(h){let w=h.dataset.repeatAdd,I=ke().flatMap(A=>A.fields||[]).find(A=>A.type==="repeater"&&A.path===w),T=D(u.config,w);Array.isArray(T)||(fe(u.config,w,[]),T=D(u.config,w)),T.push(Il(I||{})),u.contentStateDirty=!0,zi(h.closest("[data-section-card]")?.dataset.sectionCard),be("Item ditambahkan"),Rl(h.closest("[data-section-card]"));return}let d=s.target.closest("[data-repeat-delete]");if(d){let w=D(u.config,d.dataset.repeatDelete);if(!Array.isArray(w))return;let I=ke().flatMap(A=>A.fields||[]).find(A=>A.type==="repeater"&&A.path===d.dataset.repeatDelete),T=Number.isFinite(I?.min)?I.min:0;if(w.length<=T){be("Minimal "+T+" item");return}w.splice(Number(d.dataset.repeatIndex),1),u.contentStateDirty=!0,zi(d.closest("[data-section-card]")?.dataset.sectionCard),be("Item dihapus"),Rl(d.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,El();return}if(s.target.closest("#"+e+"-team-key-save")){Hh();return}if(s.target.closest("#"+e+"-pin-peek")){ta("peek");return}if(s.target.closest("#"+e+"-pin-generate")){ta("generate");return}if(s.target.closest("#"+e+"-pin-copy")){zh();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let w=S.closest("[data-section-card]");if(!w)return;let I=!w.classList.contains("open");w.classList.toggle("open",I);let T=w.dataset.sectionCard;I?Nl(w):(u.contentOpenSections.delete(T),v(".chev",w)?.setAttribute("aria-expanded","false"),Dt(w),aa(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||ic(o)&&Fl())}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){fe(u.config,o.dataset.visiblePath,o.checked),Fl(o.checked?"Section ditampilkan":"Section disembunyikan");return}ic(o)&&be("Konten diperbarui")}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}be();let c=o.closest("[data-section-card]");c&&(c.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",c.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(c,24,24))}),r.addEventListener("dragend",n),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer?.getData("text/plain")||v(".section.dragging",r)?.dataset?.sectionCard||"",h=o.dataset.sectionCard;if(!c||c===h)return;let d=ke().find(w=>J(w)===h);if(h!=="cover"&&!Ot(d))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let k=o.getBoundingClientRect(),S=s.clientY<k.top+k.height/2?"before":"after";h==="cover"&&(S="after"),C(".section.drag-before, .section.drag-after",r).forEach(w=>{w!==o&&(w.classList.remove("drag-before","drag-after"),delete w.dataset.dropPlacement)}),o.dataset.dropPlacement=S,o.classList.toggle("drag-before",S==="before"),o.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer.getData("text/plain"),h=o.dataset.sectionCard,d=o.dataset.dropPlacement||(h==="cover"?"after":"before");s.preventDefault(),n(),Ph(c,h,d)})}function Yd(r){C("[data-library-import]",r).forEach(n=>{n.onclick=()=>{Th(n.dataset.libraryImport)}}),v("[data-library-clear]",r)?.addEventListener("click",_h),v("[data-library-refresh]",r)?.addEventListener("click",async()=>{await pl(!0),u.uiPrepared=!1,re()})}function ci(r,n){let s=n+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function Qd(r){if(u.tab==="library"){Yd(r);return}if(u.tab==="content"){rc(r);return}if(u.tab==="images"){Zd(r);return}if(u.tab==="colors"){Jd(r);return}if(u.tab==="style"){Xd(r);return}if(u.tab==="audio"){ef(r);return}if(u.tab==="compatibility"){tf(r);return}rc(r)}function Zd(r){if(!ci(r,"images"))return;r.addEventListener("click",s=>{if(s.target.closest("#"+e+"-reset-images")){yd();return}let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),qd(r,o.dataset.imagePastePath);return}let c=s.target.closest("[data-image-delete-path]");if(c){xd(c.dataset.imageDeletePath);return}let h=s.target.closest("[data-image-open-advance]");if(h){let A=h.dataset.imageOpenAdvance,B=v(`[data-image-card-path="${CSS.escape(A)}"]`,r),U=B?v(".image-advance",B):null;if(U){let ce=!U.open;U.open=ce,h.setAttribute("aria-expanded",String(ce)),h.setAttribute("aria-label",ce?"Tutup pengaturan gambar":"Buka pengaturan gambar"),h.title=ce?"Tutup pengaturan gambar":"Pengaturan gambar",h.classList.toggle("active",ce),ce?U.scrollIntoView({block:"nearest",behavior:"smooth"}):h.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let d=s.target.closest("[data-image-align-path]");if(d){let A=d.dataset.imageAlignPath,B=["left","center","right"].includes(d.dataset.imageAlign)?d.dataset.imageAlign:"center";St(A,{align:B}),se(),si(r,A);let U=v(`[data-image-path="${CSS.escape(A)}"]`,r);U&&Bt(U,A);return}let k=s.target.closest("[data-image-fit-path]");if(k){let A=k.dataset.imageFitPath,B=Xo.includes(k.dataset.imageFit)?k.dataset.imageFit:"auto";St(A,{fit:B}),se(),si(r,A);let U=v(`[data-image-path="${CSS.escape(A)}"]`,r);U&&Bt(U,A);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let A=S.dataset.imageAlignposPath,B=Ur.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";St(A,{alignPos:B}),se(),si(r,A);let U=v(`[data-image-path="${CSS.escape(A)}"]`,r);U&&Bt(U,A);return}let w=s.target.closest("[data-image-ratio-path]");if(w){let A=w.dataset.imageRatioPath,B=jr.includes(w.dataset.imageRatio)?w.dataset.imageRatio:"16:9";St(A,{ratio:B}),se(),si(r,A);let U=v(`[data-image-path="${CSS.escape(A)}"]`,r);U&&Bt(U,A);return}let I=s.target.closest("[data-gallery-delete-index]");if(I){bd(I.dataset.galleryDeleteIndex,Number(I.dataset.galleryIndex));return}let T=s.target.closest("[data-gallery-add]");if(T){let A=T.dataset.galleryAdd,B=D(u.config,A);Array.isArray(B)||(fe(u.config,A,[]),B=D(u.config,A));let U=B.length,ce=Vl(A),Y=Gi(ce),xe=String(Y?.key||"src"),de=ce?Il(ce):{};Object.prototype.hasOwnProperty.call(de,xe)||(de[xe]=""),B.push(de),sa()[A+"."+U+"."+xe]={width:100,align:"center",alignPos:"default",fit:"auto",ratio:"1:1"},se("Foto gallery ditambah"),re();return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let h=v(`[data-image-width-number="${CSS.escape(o)}"]`,r);h&&(h.value=s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){let h=Math.max(0,Math.min(100,Number(s.target.value)||0)),d=v(`[data-image-width-path="${CSS.escape(c)}"]`,r);d&&(d.value=h);return}});let n=(s,o)=>{let c=Math.max(0,Math.min(100,Number(o)||0));St(s,{width:c}),se();let h=v(`[data-image-path="${CSS.escape(s)}"]`,r);h&&Bt(h,s),si(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){n(o,s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){n(c,s.target.value);return}let h=s.target.closest("[data-image-path]");if(!h)return;let d=h.dataset.imagePath,k=h.value.trim(),S=String(D(u.config,d)||"");if(k!==S){if(Br(k)){h.value=S,tc(h);return}fe(u.config,d,k),k&&St(d,{hidden:!1}),se("Gambar diperbarui"),Bt(h,d)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function Jd(r){if(!ci(r,"colors"))return;let n=(o,c,h)=>{let d=o.value.trim();if(!d||!kd(d)){if(h){let S=Se(c);S&&(o.value=S)}return}He(c,d);let k=v(`[data-color-var="${CSS.escape(c)}"]`,r);k&&(k.value=oi(d,k.value||"#000000"))},s=o=>{let c=Ui(o);if(!c)return;He(o,c);let h=v(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),d=v(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let k=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!k.length||k.includes(c))&&(h.value=c)}d&&(d.value=oi(c,d.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){L.forEach(([,,h])=>{let d=Se(h);d&&He(h,Ui(h)||d)}),C("[data-color-token-var]",r).forEach(h=>{let d=h.dataset.colorTokenVar,k=Se(d);k&&(h.value=k)}),C("[data-color-var]",r).forEach(h=>{h.value=oi(Se(h.dataset.colorVar),h.value)});return}}),r.addEventListener("input",o=>{let c=o.target.dataset.colorTokenVar;if(c!==void 0){n(o.target,c,!1);return}let h=o.target.dataset.colorVar;if(h!==void 0){He(h,o.target.value);let d=v(`[data-color-token-var="${CSS.escape(h)}"]`,r);d&&(d.value=o.target.value)}}),r.addEventListener("change",o=>{let c=o.target.dataset.colorTokenVar;c!==void 0&&n(o.target,c,!0)})}function Xd(r){if(!ci(r,"style"))return;let n=(o,c)=>{let h=String(o.value||"").trim();if(h){if((c==="--sve-heading-weight"||c==="--sve-body-weight")&&!$d(c==="--sve-heading-weight"?"heading":"body",h)){let k=Se(c);k&&(o.value=k);return}He(c,h),(c==="--sve-heading-weight"||c==="--sve-body-weight")&&Yi()}},s=o=>{let c=Ui(o);if(!c)return;He(o,c);let h=v(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),d=v(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let k=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!k.length||k.includes(c))&&(h.value=c)}d&&(d.value=oi(c,d.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){Fd();return}if(o.target.closest("#"+e+"-reset-all")){El();return}if(o.target.closest("#"+e+"-heading-font-apply")){Qi("heading");return}o.target.closest("#"+e+"-body-font-apply")&&Qi("body")}),r.addEventListener("change",o=>{let c=o.target.dataset.styleVar;c!==void 0&&n(o.target,c)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let c=o.target.dataset.styleVar;c!==void 0&&n(o.target,c)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),Qi("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),Qi("body")))})}function ef(r){if(!ci(r,"audio"))return;let s=bl().path||"assets.audio",o=v("#"+e+"-audio-url",r),c=v("#"+e+"-audio-start-enabled",r),h=v("#"+e+"-audio-start-time",r);if(!o)return;let d=()=>{let S=o.value.trim(),w=D(u.config,s);if(typeof w=="string"&&w===S){Yl(r,S);return}fe(u.config,s,S),se("Audio diperbarui"),Yl(r,S)},k=()=>{if(!c||!h)return;let S=o.value.trim(),w=c.checked?Ji(h.value):0,I=Md(S,w);o.value=I,h.disabled=!c.checked,c.checked&&(h.value=pa(w)),fe(u.config,s,I),se(w>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(d,0)}),o.addEventListener("change",d),c?.addEventListener("change",()=>{h&&(h.disabled=!c.checked,c.checked&&Ji(h.value)<=0&&(h.value="0:00",h.focus()),k())}),h?.addEventListener("change",k)}function tf(r){ci(r,"compat")}function rf(){Object.values(u.editors).forEach(r=>{if(r)try{r.save?.();let n=r.getTextArea?.();n?.dispatchEvent(new Event("input",{bubbles:!0})),n?.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}})}function af(r,n=""){let s=v("#"+e+"-body");if(!s||!be()||(u.sourceDirty||!u.doc)&&!Le()||(r=String(r||"").trim(),r&&!xt(r)))return!1;let o=r&&qi().find(w=>w.path===r),c=ai(),h=w=>Hi(w).some(I=>I.path===r||I.type==="repeater"&&r.startsWith(I.path+".")),d=r&&(c.find(w=>J(w)===n&&h(w))||c.find(h))||c.find(w=>J(w)===n);if(!o&&!d)return!1;u.search="";let k=v("#"+e+"-search");k&&(k.value=""),u.open||Rt(!0),Ft(o?"images":"content");let S;if(o)S=ec(s,r);else{let w=v(`[data-section-card="${CSS.escape(J(d))}"]`,s);if(!w)return!1;Nl(w),S=r&&v(`[data-field-path="${CSS.escape(r)}"]`,w),S||(S=v(".chev",w))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let ac='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function nf(r,n,s){if(typeof n!="string"||!n||n.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let o=r?.getAttribute("srcdoc")||"";if(!o)return null;let c=u.canvasPickSources.get(r);if(!c||c.source!==o){let S=document.createElement("template");S.innerHTML=o,c={source:o,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:C("script",S.content).map(w=>w.textContent).join(`
`)},u.canvasPickSources.set(r,c)}if(!c.root||!c.scripts.includes(JSON.stringify(s)))return null;let h=c.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(n)}"]`);if(!h)return null;let d=h.matches("[data-sve-field]")?h:h.querySelector("[data-sve-field]")||h.closest("[data-sve-field]"),k=h.closest("[data-section-id], [data-sve-section]");return{path:d?.getAttribute("data-sve-field")||"",sectionHint:k?.getAttribute("data-section-id")||k?.id||k?.getAttribute("data-sve-section")||""}}function sf(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,n=null;window.addEventListener("message",s=>{if(location.href!==r)return;let o=s.data;if(!o||o.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof o.inspectorId!="string"||!o.inspectorId||o.inspectorId.length>256||typeof o.previewId!="string"||o.previewId.length>256)return;let c=C(ac).find(B=>B.contentWindow===s.source);if(!c||!c.sandbox.contains("allow-scripts")||c.sandbox.contains("allow-same-origin"))return;let h=c.getAttribute("srcdoc"),d=location.href,{open:k,tab:S,sourceDirty:w}=u,I=u.performance.configCommitCount,T=V("html"),A=V("js");cancelAnimationFrame(n),n=requestAnimationFrame(()=>{if(n=null,location.href!==d||!c.isConnected||!c.matches(ac)||c.contentWindow!==s.source||c.getAttribute("srcdoc")!==h||u.open!==k||u.tab!==S||u.sourceDirty!==w||u.performance.configCommitCount!==I||V("html")!==T||V("js")!==A)return;let B=nf(c,o.inspectorId,o.previewId);B&&(B.path||B.sectionHint)&&af(B.path,B.sectionHint)})})}function of(){return C("button").find(r=>{if(r.closest("#"+e))return!1;let n=(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return n==="simpan"||n==="save"})||null}function lf(){let r="https://wa.me/"+p+"?text="+encodeURIComponent(f);window.open(r,"_blank","noopener,noreferrer")}function cx(){if(!be())return;if(rf(),Le(),Xl().blockers.length){u.tab="compatibility";let s=document.getElementById(e);C(".tab",s).forEach(o=>{o.classList.toggle("active",o.dataset.tab==="compatibility")}),re();return}let n=of();n&&n.click()}function cf(){performance.mark("sve-styles-start"),uf(),performance.mark("sve-styles-critical-done"),$t(pf,50)}function uf(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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

#${e} .image-global-reset {
  margin:
    4px 0 16px;
}

#${e} .gallery-add-wrap {
  margin:
    0 0 16px;
}

#${e} .gallery-add-button {
  width: 100%;

  min-height: 46px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding:
    12px 14px;

  border:
    2px solid
    var(--p);

  border-radius: 4px;

  background: #fff;

  color:
    var(--p);

  font: inherit;

  font-size: 12px;
  font-weight: 500;

  line-height: 19.6px;

  cursor: pointer;
}

#${e} .gallery-add-button:hover {
  background:
    #f7fcfe;
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

#${e} .advance-group-last {
  padding-bottom: 11px;
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

#${e} .advance-ratio-grid {
  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(
        0,
        1fr
      )
    );

  gap: 10px 8px;
}

#${e} .advance-ratio-btn {
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
    #414b59;

  font-size: 10px;
  font-weight: 650;

  cursor: pointer;
}

#${e} .advance-ratio-btn.active,
#${e} .advance-ratio-btn:hover {
  border-color:
    var(--p);
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
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
`,document.head.appendChild(r)}function pf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
#${e}-body[data-sve-tab="images"],
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
#${e}-body[data-sve-tab="images"] .image-card {
  padding: 10px;
  border-radius: 4px;
}

#${e}-body[data-sve-tab="images"] .image-card .image-card-action,
#${e}-body[data-sve-tab="images"] .advance-pos-btn,
#${e}-body[data-sve-tab="images"] .advance-pos-default,
#${e}-body[data-sve-tab="images"] .advance-fit-btn,
#${e}-body[data-sve-tab="images"] .advance-ratio-btn {
  border-radius: 4px;
}

#${e}-body[data-sve-tab="images"] .image-advance {
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
#${e}-body[data-sve-tab="images"] .image-card .image-url-row {
  min-height: 30px;
  margin-top: 10px;
  border-width: 1px;
  border-radius: 4px;
}

#${e}-body[data-sve-tab="images"] .image-card .image-url-row input[type="text"] {
  height: auto;
  min-height: 0;
  padding: 7px 8px;
  border: 0;
  border-radius: 0;
  background: transparent;
  font-size: 10px;
  line-height: 14px;
}

#${e}-body[data-sve-tab="images"] .image-card .image-paste-button {
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
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function hf(){cf();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
              data-tab="images"
            >
              Gambar
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
    `,document.body.appendChild(r),v("#"+e+"-close").onclick=()=>{Rt(!1)},v("#"+e+"-refresh").onclick=()=>{Le()&&(re(),Ue({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,Le()&&(re(),Ue({force:!0,syncImages:!0}))},v("#"+e+"-support").onclick=lf;let n=v("#"+e+"-editor-update"),s=v("#"+e+"-update-status"),o=!1,c=!1,h=0,d=null,k=15e3,S=(I,T,A=!1)=>{n.textContent=I,n.title=T,n.setAttribute("aria-label",T),n.disabled=A},w=()=>{h=Date.now()+k,S("Cek Update","Cek update Visual Editor",!0),clearTimeout(d),d=setTimeout(()=>{h=0,!c&&!o&&S("Cek Update","Cek update Visual Editor")},k)};n.addEventListener("click",()=>{if(o){window.open(g,"_blank","noopener");return}if(c||Date.now()<h){s.textContent="Tunggu sebentar";return}o=!1,c=!0,S("Mengecek...","Sedang mengecek update Visual Editor",!0),s.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${x}?check=${Date.now()}`,onload(I){let T=ce=>{o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent=ce,w()};if(I.status<200||I.status>=300){T(I.status===403||I.status===429?"Tunggu sebentar":"Gagal cek update");return}let B=(I.responseText||"").match(/@version\s+([^\s]+)/),U=B&&B[1];if(!U){T("Gagal cek update");return}U===t?(o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Sudah terbaru",w()):(o=!0,c=!1,S("Pasang",`Pasang update Visual Editor versi ${U}`),s.textContent=`Update tersedia: versi ${U}.`)},onerror(){o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Gagal cek update",w()}})}),v("#"+e+"-search").addEventListener("input",ii(I=>{u.search=I.target.value.toLowerCase().trim(),u.uiPrepared=!1,re()},100)),C(".tab",r).forEach(I=>{I.onclick=()=>{be()&&Ft(I.dataset.tab)}})}function df(){let r=ii(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,Pt(),Pi(),nl();let d=vt();d&&ri(d,{commit:!0,silent:!0}),u.open&&Ni(!0);let k=Kr();if(k.length!==u.allEditors.length||k.some((S,w)=>S!==u.allEditors[w])){if(u.sourceDirty=!0,!Le())return;ji.invalidate(),rl(),u.open?re():Ri()}},160),n='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(d=>{d.some(k=>!k.target.closest?.("#"+e)&&[...k.addedNodes,...k.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}),o=null,c=()=>{let d=qr();d!==o&&(s.disconnect(),o=d,d&&s.observe(d,{childList:!0,subtree:!0}),r())};new MutationObserver(d=>{c(),d.some(k=>[...k.addedNodes,...k.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}).observe(document.body,{childList:!0}),c(),document.addEventListener("load",d=>{d.target instanceof HTMLIFrameElement&&(ji.invalidate(),Ue({force:!0,syncImages:!0}))},!0),document.addEventListener("click",d=>{let k=d.target.closest?.("button");if(!(!k||k.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(k.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!V("js").includes("SVE_SCHEMA"))){if(!be()){d.preventDefault(),d.stopImmediatePropagation();return}Jl().blockers.length&&(d.preventDefault(),d.stopImmediatePropagation(),Rt(!0),u.uiPrepared=!1,Ft("compatibility"))}},!0),document.addEventListener("keydown",d=>{d.key==="Escape"&&u.open&&document.getElementById(e)?.contains(d.target)&&(Rt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",d=>{Hr(d.target)&&(u.scalevSlug=yt(d.target.value),ah())},!0),document.addEventListener("change",d=>{if(Hr(d.target)){let k=yt(d.target.value);k&&(u.scalevSlug=k,ri(k,{commit:!0}))}},!0),window.addEventListener("resize",ii(()=>{Pi(),u.open&&Ni(!0)},80))}function nc(){b()&&(hf(),nl(),sf(),df(),Gr(),requestAnimationFrame(()=>{Pi()}),Ri(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",nc,{once:!0}):nc()})();})();
