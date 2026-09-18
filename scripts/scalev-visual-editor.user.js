// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.28.0
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
(()=>{var df=Object.create;var fn=Object.defineProperty;var ff=Object.getOwnPropertyDescriptor;var mf=Object.getOwnPropertyNames;var gf=Object.getPrototypeOf,bf=Object.prototype.hasOwnProperty;var Bt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)fn(e,i,{get:t[i],enumerable:!0})},xf=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of mf(t))!bf.call(e,l)&&l!==i&&fn(e,l,{get:()=>t[l],enumerable:!(n=ff(t,l))||n.enumerable});return e};var yf=(e,t,i)=>(i=e!=null?df(gf(e)):{},xf(t||!e||!e.__esModule?fn(i,"default",{value:e,enumerable:!0}):i,e));var mp=Bt(Vo=>{var fp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Vo.encode=function(e){if(0<=e&&e<fp.length)return fp[e];throw new TypeError("Must be between 0 and 63: "+e)};Vo.decode=function(e){var t=65,i=90,n=97,l=122,p=48,d=57,g=43,x=47,b=26,y=52;return t<=e&&e<=i?e-t:n<=e&&e<=l?e-n+b:p<=e&&e<=d?e-p+y:e==g?62:e==x?63:-1}});var vp=Bt(jo=>{var gp=mp(),Bo=5,bp=1<<Bo,xp=bp-1,yp=bp;function Ib(e){return e<0?(-e<<1)+1:(e<<1)+0}function Lb(e){var t=(e&1)===1,i=e>>1;return t?-i:i}jo.encode=function(t){var i="",n,l=Ib(t);do n=l&xp,l>>>=Bo,l>0&&(n|=yp),i+=gp.encode(n);while(l>0);return i};jo.decode=function(t,i,n){var l=t.length,p=0,d=0,g,x;do{if(i>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(x=gp.decode(t.charCodeAt(i++)),x===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(x&yp),x&=xp,p=p+(x<<d),d+=Bo}while(g);n.value=Lb(p),n.rest=i}});var Or=Bt(ue=>{function $b(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}ue.getArg=$b;var kp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Pb=/^data:.+\,.+$/;function Ei(e){var t=e.match(kp);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}ue.urlParse=Ei;function Jt(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}ue.urlGenerate=Jt;var Nb=32;function Rb(e){var t=[];return function(i){for(var n=0;n<t.length;n++)if(t[n].input===i){var l=t[0];return t[0]=t[n],t[n]=l,t[0].result}var p=e(i);return t.unshift({input:i,result:p}),t.length>Nb&&t.pop(),p}}var Uo=Rb(function(t){var i=t,n=Ei(t);if(n){if(!n.path)return t;i=n.path}for(var l=ue.isAbsolute(i),p=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){p.push(i.slice(d));break}else for(p.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var x,b=0,g=p.length-1;g>=0;g--)x=p[g],x==="."?p.splice(g,1):x===".."?b++:b>0&&(x===""?(p.splice(g+1,b),b=0):(p.splice(g,2),b--));return i=p.join("/"),i===""&&(i=l?"/":"."),n?(n.path=i,Jt(n)):i});ue.normalize=Uo;function Sp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Ei(t),n=Ei(e);if(n&&(e=n.path||"/"),i&&!i.scheme)return n&&(i.scheme=n.scheme),Jt(i);if(i||t.match(Pb))return t;if(n&&!n.host&&!n.path)return n.host=t,Jt(n);var l=t.charAt(0)==="/"?t:Uo(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=l,Jt(n)):l}ue.join=Sp;ue.isAbsolute=function(e){return e.charAt(0)==="/"||kp.test(e)};function Fb(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}ue.relative=Fb;var wp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Cp(e){return e}function Ob(e){return Ep(e)?"$"+e:e}ue.toSetString=wp?Cp:Ob;function Mb(e){return Ep(e)?e.slice(1):e}ue.fromSetString=wp?Cp:Mb;function Ep(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function Db(e,t,i){var n=ct(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:ct(e.name,t.name)}ue.compareByOriginalPositions=Db;function Vb(e,t,i){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:ct(e.name,t.name)}ue.compareByOriginalPositionsNoSource=Vb;function Bb(e,t,i){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||i)||(n=ct(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:ct(e.name,t.name)}ue.compareByGeneratedPositionsDeflated=Bb;function jb(e,t,i){var n=e.generatedColumn-t.generatedColumn;return n!==0||i||(n=ct(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:ct(e.name,t.name)}ue.compareByGeneratedPositionsDeflatedNoLine=jb;function ct(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Ub(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=ct(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:ct(e.name,t.name)}ue.compareByGeneratedPositionsInflated=Ub;function Hb(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}ue.parseSourceMapInput=Hb;function zb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var n=Ei(i);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var l=n.path.lastIndexOf("/");l>=0&&(n.path=n.path.substring(0,l+1))}t=Sp(Jt(n),t)}return Uo(t)}ue.computeSourceURL=zb});var Tp=Bt(Ap=>{var Ho=Or(),zo=Object.prototype.hasOwnProperty,It=typeof Map<"u";function ut(){this._array=[],this._set=It?new Map:Object.create(null)}ut.fromArray=function(t,i){for(var n=new ut,l=0,p=t.length;l<p;l++)n.add(t[l],i);return n};ut.prototype.size=function(){return It?this._set.size:Object.getOwnPropertyNames(this._set).length};ut.prototype.add=function(t,i){var n=It?t:Ho.toSetString(t),l=It?this.has(t):zo.call(this._set,n),p=this._array.length;(!l||i)&&this._array.push(t),l||(It?this._set.set(t,p):this._set[n]=p)};ut.prototype.has=function(t){if(It)return this._set.has(t);var i=Ho.toSetString(t);return zo.call(this._set,i)};ut.prototype.indexOf=function(t){if(It){var i=this._set.get(t);if(i>=0)return i}else{var n=Ho.toSetString(t);if(zo.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};ut.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};ut.prototype.toArray=function(){return this._array.slice()};Ap.ArraySet=ut});var Lp=Bt(Ip=>{var _p=Or();function Wb(e,t){var i=e.generatedLine,n=t.generatedLine,l=e.generatedColumn,p=t.generatedColumn;return n>i||n==i&&p>=l||_p.compareByGeneratedPositionsInflated(e,t)<=0}function Mr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Mr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Mr.prototype.add=function(t){Wb(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Mr.prototype.toArray=function(){return this._sorted||(this._array.sort(_p.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Ip.MappingList=Mr});var Pp=Bt($p=>{var Ai=vp(),ae=Or(),Dr=Tp().ArraySet,Gb=Lp().MappingList;function Be(e){e||(e={}),this._file=ae.getArg(e,"file",null),this._sourceRoot=ae.getArg(e,"sourceRoot",null),this._skipValidation=ae.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=ae.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Dr,this._names=new Dr,this._mappings=new Gb,this._sourcesContents=null}Be.prototype._version=3;Be.fromSourceMap=function(t,i){var n=t.sourceRoot,l=new Be(Object.assign(i||{},{file:t.file,sourceRoot:n}));return t.eachMapping(function(p){var d={generated:{line:p.generatedLine,column:p.generatedColumn}};p.source!=null&&(d.source=p.source,n!=null&&(d.source=ae.relative(n,d.source)),d.original={line:p.originalLine,column:p.originalColumn},p.name!=null&&(d.name=p.name)),l.addMapping(d)}),t.sources.forEach(function(p){var d=p;n!==null&&(d=ae.relative(n,p)),l._sources.has(d)||l._sources.add(d);var g=t.sourceContentFor(p);g!=null&&l.setSourceContent(p,g)}),l};Be.prototype.addMapping=function(t){var i=ae.getArg(t,"generated"),n=ae.getArg(t,"original",null),l=ae.getArg(t,"source",null),p=ae.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,n,l,p)===!1||(l!=null&&(l=String(l),this._sources.has(l)||this._sources.add(l)),p!=null&&(p=String(p),this._names.has(p)||this._names.add(p)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:l,name:p}))};Be.prototype.setSourceContent=function(t,i){var n=t;this._sourceRoot!=null&&(n=ae.relative(this._sourceRoot,n)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[ae.toSetString(n)]=i):this._sourcesContents&&(delete this._sourcesContents[ae.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};Be.prototype.applySourceMap=function(t,i,n){var l=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);l=t.file}var p=this._sourceRoot;p!=null&&(l=ae.relative(p,l));var d=new Dr,g=new Dr;this._mappings.unsortedForEach(function(x){if(x.source===l&&x.originalLine!=null){var b=t.originalPositionFor({line:x.originalLine,column:x.originalColumn});b.source!=null&&(x.source=b.source,n!=null&&(x.source=ae.join(n,x.source)),p!=null&&(x.source=ae.relative(p,x.source)),x.originalLine=b.line,x.originalColumn=b.column,b.name!=null&&(x.name=b.name))}var y=x.source;y!=null&&!d.has(y)&&d.add(y);var v=x.name;v!=null&&!g.has(v)&&g.add(v)},this),this._sources=d,this._names=g,t.sources.forEach(function(x){var b=t.sourceContentFor(x);b!=null&&(n!=null&&(x=ae.join(n,x)),p!=null&&(x=ae.relative(p,x)),this.setSourceContent(x,b))},this)};Be.prototype._validateMapping=function(t,i,n,l){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var p="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!n&&!l)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&n)return;var p="Invalid mapping: "+JSON.stringify({generated:t,source:n,original:i,name:l});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}};Be.prototype._serializeMappings=function(){for(var t=0,i=1,n=0,l=0,p=0,d=0,g="",x,b,y,v,C=this._mappings.toArray(),u=0,_=C.length;u<_;u++){if(b=C[u],x="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)x+=";",i++;else if(u>0){if(!ae.compareByGeneratedPositionsInflated(b,C[u-1]))continue;x+=","}x+=Ai.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(v=this._sources.indexOf(b.source),x+=Ai.encode(v-d),d=v,x+=Ai.encode(b.originalLine-1-l),l=b.originalLine-1,x+=Ai.encode(b.originalColumn-n),n=b.originalColumn,b.name!=null&&(y=this._names.indexOf(b.name),x+=Ai.encode(y-p),p=y)),g+=x}return g};Be.prototype._generateSourcesContent=function(t,i){return t.map(function(n){if(!this._sourcesContents)return null;i!=null&&(n=ae.relative(i,n));var l=ae.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,l)?this._sourcesContents[l]:null},this)};Be.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};Be.prototype.toString=function(){return JSON.stringify(this.toJSON())};$p.SourceMapGenerator=Be});var vf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],dc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],kf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",fc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",mn={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},gn="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Sf={5:gn,"5module":gn+" export import",6:gn+" const class extends export import super"},mc=/^in(stanceof)?$/,wf=new RegExp("["+fc+"]"),Cf=new RegExp("["+fc+kf+"]");function xn(e,t){for(var i=65536,n=0;n<t.length;n+=2){if(i+=t[n],i>e)return!1;if(i+=t[n+1],i>=e)return!0}return!1}function Qe(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&wf.test(String.fromCharCode(e)):t===!1?!1:xn(e,dc)}function dt(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Cf.test(String.fromCharCode(e)):t===!1?!1:xn(e,dc)||xn(e,vf)}var z=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Re(e,t){return new z(e,{beforeExpr:!0,binop:t})}var Fe={beforeExpr:!0},Se={startsExpr:!0},Sn={};function H(e,t){return t===void 0&&(t={}),t.keyword=e,Sn[e]=new z(e,t)}var m={num:new z("num",Se),regexp:new z("regexp",Se),string:new z("string",Se),name:new z("name",Se),privateId:new z("privateId",Se),eof:new z("eof"),bracketL:new z("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new z("]"),braceL:new z("{",{beforeExpr:!0,startsExpr:!0}),braceR:new z("}"),parenL:new z("(",{beforeExpr:!0,startsExpr:!0}),parenR:new z(")"),comma:new z(",",Fe),semi:new z(";",Fe),colon:new z(":",Fe),dot:new z("."),question:new z("?",Fe),questionDot:new z("?."),arrow:new z("=>",Fe),template:new z("template"),invalidTemplate:new z("invalidTemplate"),ellipsis:new z("...",Fe),backQuote:new z("`",Se),dollarBraceL:new z("${",{beforeExpr:!0,startsExpr:!0}),eq:new z("=",{beforeExpr:!0,isAssign:!0}),assign:new z("_=",{beforeExpr:!0,isAssign:!0}),incDec:new z("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new z("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Re("||",1),logicalAND:Re("&&",2),bitwiseOR:Re("|",3),bitwiseXOR:Re("^",4),bitwiseAND:Re("&",5),equality:Re("==/!=/===/!==",6),relational:Re("</>/<=/>=",7),bitShift:Re("<</>>/>>>",8),plusMin:new z("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Re("%",10),star:Re("*",10),slash:Re("/",10),starstar:new z("**",{beforeExpr:!0}),coalesce:Re("??",1),_break:H("break"),_case:H("case",Fe),_catch:H("catch"),_continue:H("continue"),_debugger:H("debugger"),_default:H("default",Fe),_do:H("do",{isLoop:!0,beforeExpr:!0}),_else:H("else",Fe),_finally:H("finally"),_for:H("for",{isLoop:!0}),_function:H("function",Se),_if:H("if"),_return:H("return",Fe),_switch:H("switch"),_throw:H("throw",Fe),_try:H("try"),_var:H("var"),_const:H("const"),_while:H("while",{isLoop:!0}),_with:H("with"),_new:H("new",{beforeExpr:!0,startsExpr:!0}),_this:H("this",Se),_super:H("super",Se),_class:H("class",Se),_extends:H("extends",Fe),_export:H("export"),_import:H("import",Se),_null:H("null",Se),_true:H("true",Se),_false:H("false",Se),_in:H("in",{beforeExpr:!0,binop:7}),_instanceof:H("instanceof",{beforeExpr:!0,binop:7}),_typeof:H("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:H("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:H("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},we=/\r\n?|\n|\u2028|\u2029/,Ef=new RegExp(we.source,"g");function jt(e){return e===10||e===13||e===8232||e===8233}function gc(e,t,i){i===void 0&&(i=e.length);for(var n=t;n<i;n++){var l=e.charCodeAt(n);if(jt(l))return n<i-1&&l===13&&e.charCodeAt(n+1)===10?n+2:n+1}return-1}var bc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,le=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,xc=Object.prototype,Af=xc.hasOwnProperty,Tf=xc.toString,Ut=Object.hasOwn||(function(e,t){return Af.call(e,t)}),lc=Array.isArray||(function(e){return Tf.call(e)==="[object Array]"}),cc=Object.create(null);function ht(e){return cc[e]||(cc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function at(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var _f=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,hi=function(t,i){this.line=t,this.column=i};hi.prototype.offset=function(t){return new hi(this.line,this.column+t)};var lr=function(t,i,n){this.start=i,this.end=n,t.sourceFile!==null&&(this.source=t.sourceFile)};function yc(e,t){for(var i=1,n=0;;){var l=gc(e,n,t);if(l<0)return new hi(i,t-n);++i,n=l}}var yn={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},uc=!1;function If(e){var t={};for(var i in yn)t[i]=e&&Ut(e,i)?e[i]:yn[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!uc&&typeof console=="object"&&console.warn&&(uc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),lc(t.onToken)){var n=t.onToken;t.onToken=function(l){return n.push(l)}}if(lc(t.onComment)&&(t.onComment=Lf(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function Lf(e,t){return function(i,n,l,p,d,g){var x={type:i?"Block":"Line",value:n,start:l,end:p};e.locations&&(x.loc=new lr(this,d,g)),e.ranges&&(x.range=[l,p]),t.push(x)}}var St=1,wt=2,wn=4,vc=8,Cn=16,kc=32,cr=64,Sc=128,Ct=256,di=512,wc=1024,ur=St|wt|Ct;function En(e,t){return wt|(e?wn:0)|(t?vc:0)}var nr=0,An=1,ot=2,Cc=3,Ec=4,Ac=5,se=function(t,i,n){this.options=t=If(t),this.sourceFile=t.sourceFile,this.keywords=ht(Sf[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var l="";t.allowReserved!==!0&&(l=mn[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(l+=" await")),this.reservedWords=ht(l);var p=(l?l+" ":"")+mn.strict;this.reservedWordsStrict=ht(p),this.reservedWordsStrictBind=ht(p+" "+mn.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=n||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):n?(this.lineStart=this.input.lastIndexOf(`
`,n-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(we).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?wt:St),this.regexpState=null,this.privateNameStack=[]},Me={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};se.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};Me.inFunction.get=function(){return(this.currentVarScope().flags&wt)>0};Me.inGenerator.get=function(){return(this.currentVarScope().flags&vc)>0};Me.inAsync.get=function(){return(this.currentVarScope().flags&wn)>0};Me.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ct|di))return!1;if(i&wt)return(i&wn)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};Me.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&St)};Me.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&cr)>0||this.options.allowSuperOutsideMethod};Me.allowDirectSuper.get=function(){return(this.currentThisScope().flags&Sc)>0};Me.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};Me.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ct|di)||i&wt&&!(i&Cn))return!0}return!1};Me.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&wc||!this.inModule&&t&St)};Me.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Ct)>0};se.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var n=this,l=0;l<t.length;l++)n=t[l](n);return n};se.parse=function(t,i){return new this(i,t).parse()};se.parseExpressionAt=function(t,i,n){var l=new this(n,t,i);return l.nextToken(),l.parseExpression()};se.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(se.prototype,Me);var he=se.prototype,$f=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;he.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){le.lastIndex=e,e+=le.exec(this.input)[0].length;var t=$f.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){le.lastIndex=e+t[0].length;var i=le.exec(this.input),n=i.index+i[0].length,l=this.input.charAt(n);return l===";"||l==="}"||we.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(l)||l==="!"&&this.input.charAt(n+1)==="=")}e+=t[0].length,le.lastIndex=e,e+=le.exec(this.input)[0].length,this.input[e]===";"&&e++}};he.eat=function(e){return this.type===e?(this.next(),!0):!1};he.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};he.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};he.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};he.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};he.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||we.test(this.input.slice(this.lastTokEnd,this.start))};he.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};he.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};he.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};he.expect=function(e){this.eat(e)||this.unexpected()};he.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var pr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};he.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};he.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,n=e.doubleProto;if(!t)return i>=0||n>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")};he.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};he.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var $=se.prototype;$.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var n=0,l=Object.keys(this.undefinedExports);n<l.length;n+=1){var p=l[n];this.raiseRecoverable(this.undefinedExports[p].start,"Export '"+p+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Tn={kind:"loop"},Pf={kind:"switch"};$.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;le.lastIndex=this.pos;var t=le.exec(this.input),i=this.pos+t[0].length,n=this.fullCharCodeAt(i);if(n===91||n===92)return!0;if(e)return!1;if(n===123)return!0;if(Qe(n)){var l=i;do i+=n<=65535?1:2;while(dt(n=this.fullCharCodeAt(i)));if(n===92)return!0;var p=this.input.slice(l,i);if(!mc.test(p))return!0}return!1};$.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;le.lastIndex=this.pos;var e=le.exec(this.input),t=this.pos+e[0].length,i;return!we.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(dt(i=this.fullCharCodeAt(t+8))||i===92))};$.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;le.lastIndex=this.pos;var i=le.exec(this.input),n=this.pos+i[0].length;if(we.test(this.input.slice(this.pos,n)))return!1;if(e){var l=n+5,p;if(this.input.slice(n,l)!=="using"||l===this.input.length||dt(p=this.fullCharCodeAt(l))||p===92)return!1;le.lastIndex=l;var d=le.exec(this.input);if(n=l+d[0].length,d&&we.test(this.input.slice(l,n)))return!1}var g=this.fullCharCodeAt(n);if(!Qe(g)&&g!==92)return!1;var x=n;do n+=g<=65535?1:2;while(dt(g=this.fullCharCodeAt(n)));if(g===92)return!0;var b=this.input.slice(x,n);if(mc.test(b))return!1;if(t&&!e&&b==="of"){le.lastIndex=n;var y=le.exec(this.input);if(n=n+y[0].length,this.input.charCodeAt(n)!==61||(g=this.input.charCodeAt(n+1))===61||g===62)return!1}return!0};$.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};$.isUsing=function(e){return this.isUsingKeyword(!1,e)};$.parseStatement=function(e,t,i){var n=this.type,l=this.startNode(),p;switch(this.isLet(e)&&(n=m._var,p="let"),n){case m._break:case m._continue:return this.parseBreakContinueStatement(l,n.keyword);case m._debugger:return this.parseDebuggerStatement(l);case m._do:return this.parseDoStatement(l);case m._for:return this.parseForStatement(l);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(l,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(l,!0);case m._if:return this.parseIfStatement(l);case m._return:return this.parseReturnStatement(l);case m._switch:return this.parseSwitchStatement(l);case m._throw:return this.parseThrowStatement(l);case m._try:return this.parseTryStatement(l);case m._const:case m._var:return p=p||this.value,e&&p!=="var"&&this.unexpected(),this.parseVarStatement(l,p);case m._while:return this.parseWhileStatement(l);case m._with:return this.parseWithStatement(l);case m.braceL:return this.parseBlock(!0,l);case m.semi:return this.parseEmptyStatement(l);case m._export:case m._import:if(this.options.ecmaVersion>10&&n===m._import){le.lastIndex=this.pos;var d=le.exec(this.input),g=this.pos+d[0].length,x=this.input.charCodeAt(g);if(x===40||x===46)return this.parseExpressionStatement(l,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),n===m._import?this.parseImport(l):this.parseExport(l,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(l,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(l,!1,b),this.semicolon(),this.finishNode(l,"VariableDeclaration");var y=this.value,v=this.parseExpression();return n===m.name&&v.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(l,y,v,e):this.parseExpressionStatement(l,v)}};$.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var n=0;n<this.labels.length;++n){var l=this.labels[n];if((e.label==null||l.name===e.label.name)&&(l.kind!=null&&(i||l.kind==="loop")||e.label&&i))break}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};$.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};$.parseDoStatement=function(e){return this.next(),this.labels.push(Tn),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};$.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Tn),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var n=this.startNode(),l=i?"let":this.value;return this.next(),this.parseVar(n,!0,l),this.finishNode(n,"VariableDeclaration"),this.parseForAfterInit(e,n,t)}var p=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var x=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(x,!0,g),this.finishNode(x,"VariableDeclaration"),this.parseForAfterInit(e,x,t)}var b=this.containsEsc,y=new pr,v=this.start,C=t>-1?this.parseExprSubscripts(y,"await"):this.parseExpression(!0,y);return this.type===m._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(C.start===v&&!b&&C.type==="Identifier"&&C.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),p&&d&&this.raise(C.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(C,!1,y),this.checkLValPattern(C),this.parseForIn(e,C)):(this.checkExpressionErrors(y,!0),t>-1&&this.unexpected(t),this.parseFor(e,C))};$.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};$.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,pi|(i?0:vn),!1,t)};$.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};$.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};$.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(Pf),this.enterScope(wc);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var n=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};$.parseThrowStatement=function(e){return this.next(),we.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Nf=[];$.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?kc:0),this.checkLValPattern(e,t?Ec:ot),this.expect(m.parenR),e};$.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};$.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};$.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Tn),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};$.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};$.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};$.parseLabeledStatement=function(e,t,i,n){for(var l=0,p=this.labels;l<p.length;l+=1){var d=p[l];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,x=this.labels.length-1;x>=0;x--){var b=this.labels[x];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(n?n.indexOf("label")===-1?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};$.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};$.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var n=this.parseStatement(null);t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};$.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};$.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};$.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var l=this.startNode();if(this.parseVarId(l,i),this.eat(m.eq)?l.init=this.parseMaybeAssign(t):!n&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!n&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!n&&l.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):l.init=null,e.declarations.push(this.finishNode(l,"VariableDeclarator")),!this.eat(m.comma))break}return e};$.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?An:ot,!1)};var pi=1,vn=2,Tc=4;$.parseFunction=function(e,t,i,n,l){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===m.star&&t&vn&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&pi&&(e.id=t&Tc&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&vn)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?An:ot:Cc));var p=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(En(e.async,e.generator)),t&pi||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,l),this.yieldPos=p,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&pi?"FunctionDeclaration":"FunctionExpression")};$.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};$.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var n=this.enterClassBody(),l=this.startNode(),p=!1;for(l.body=[],this.expect(m.braceL);this.type!==m.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(l.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(p&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),p=!0):d.key&&d.key.type==="PrivateIdentifier"&&Rf(n,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(l,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};$.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),n="",l=!1,p=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:n="static"}if(i.static=g,!n&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?p=!0:n="async"),!n&&(t>=9||!p)&&this.eat(m.star)&&(l=!0),!n&&!p&&!l){var x=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=x:n=x)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||d!=="method"||l||p){var b=!i.static&&ar(i,"constructor"),y=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,l,p,y)}else this.parseClassField(i);return i};$.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};$.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};$.parseClassMethod=function(e,t,i,n){var l=e.key;e.kind==="constructor"?(t&&this.raise(l.start,"Constructor can't be a generator"),i&&this.raise(l.start,"Constructor can't be an async method")):e.static&&ar(e,"prototype")&&this.raise(l.start,"Classes may not have a static property named prototype");var p=e.value=this.parseMethod(t,i,n);return e.kind==="get"&&p.params.length!==0&&this.raiseRecoverable(p.start,"getter should have no params"),e.kind==="set"&&p.params.length!==1&&this.raiseRecoverable(p.start,"setter should have exactly one param"),e.kind==="set"&&p.params[0].type==="RestElement"&&this.raiseRecoverable(p.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};$.parseClassField=function(e){return ar(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&ar(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(di|cr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};$.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Ct|cr);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};$.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,ot,!1)):(t===!0&&this.unexpected(),e.id=null)};$.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};$.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};$.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,l=n===0?null:this.privateNameStack[n-1],p=0;p<i.length;++p){var d=i[p];Ut(t,d.name)||(l?l.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function Rf(e,t){var i=t.key.name,n=e[i],l="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(l=(t.static?"s":"i")+t.kind),n==="iget"&&l==="iset"||n==="iset"&&l==="iget"||n==="sget"&&l==="sset"||n==="sset"&&l==="sget"?(e[i]="true",!1):n?!0:(e[i]=l,!1)}function ar(e,t){var i=e.computed,n=e.key;return!i&&(n.type==="Identifier"&&n.name===t||n.type==="Literal"&&n.value===t)}$.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};$.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var l=n[i];this.checkUnreserved(l.local),this.checkLocalExport(l.local),l.local.type==="Literal"&&this.raise(l.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};$.parseExportDeclaration=function(e){return this.parseStatement(null)};$.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,pi|Tc,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var n=this.parseMaybeAssign();return this.semicolon(),n}};$.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),Ut(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};$.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var n=0,l=t.properties;n<l.length;n+=1){var p=l[n];this.checkPatternExport(e,p)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var x=g[d];x&&this.checkPatternExport(e,x)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};$.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var l=n[i];this.checkPatternExport(e,l.id)}};$.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};$.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};$.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};$.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=Nf,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};$.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportSpecifier")};$.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportDefaultSpecifier")};$.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportNamespaceSpecifier")};$.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};$.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var n=this.parseImportAttribute(),l=n.key.type==="Identifier"?n.key.name:n.key.value;Ut(t,l)&&this.raiseRecoverable(n.key.start,"Duplicate attribute key '"+l+"'"),t[l]=!0,e.push(n)}return e};$.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};$.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return _f.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};$.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};$.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var De=se.prototype;De.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var n=0,l=e.properties;n<l.length;n+=1){var p=l[n];this.toAssignable(p,t),p.type==="RestElement"&&(p.argument.type==="ArrayPattern"||p.argument.type==="ObjectPattern")&&this.raise(p.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};De.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var l=e[n];l&&this.toAssignable(l,t)}if(i){var p=e[i-1];this.options.ecmaVersion===6&&t&&p&&p.type==="RestElement"&&p.argument.type!=="Identifier"&&this.unexpected(p.argument.start)}return e};De.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};De.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};De.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};De.parseBindingList=function(e,t,i,n){for(var l=[],p=!0;!this.eat(e);)if(p?p=!1:this.expect(m.comma),t&&this.type===m.comma)l.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),l.push(d),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else l.push(this.parseAssignableListItem(n))}return l};De.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};De.parseBindingListItem=function(e){return e};De.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var n=this.startNodeAt(e,t);return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")};De.checkLValSimple=function(e,t,i){t===void 0&&(t=nr);var n=t!==nr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(t===ot&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(Ut(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==Ac&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}};De.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=nr),e.type){case"ObjectPattern":for(var n=0,l=e.properties;n<l.length;n+=1){var p=l[n];this.checkLValInnerPattern(p,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var x=g[d];x&&this.checkLValInnerPattern(x,t,i)}break;default:this.checkLValSimple(e,t,i)}};De.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=nr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var ze=function(t,i,n,l,p){this.token=t,this.isExpr=!!i,this.preserveSpace=!!n,this.override=l,this.generator=!!p},ee={b_stat:new ze("{",!1),b_expr:new ze("{",!0),b_tmpl:new ze("${",!1),p_stat:new ze("(",!1),p_expr:new ze("(",!0),q_tmpl:new ze("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new ze("function",!1),f_expr:new ze("function",!0),f_expr_gen:new ze("function",!0,!1,null,!0),f_gen:new ze("function",!1,!1,null,!0)},Ht=se.prototype;Ht.initialContext=function(){return[ee.b_stat]};Ht.curContext=function(){return this.context[this.context.length-1]};Ht.braceIsBlock=function(e){var t=this.curContext();return t===ee.f_expr||t===ee.f_stat?!0:e===m.colon&&(t===ee.b_stat||t===ee.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?we.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===ee.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};Ht.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};Ht.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};Ht.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===ee.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?ee.b_stat:ee.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(ee.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?ee.p_stat:ee.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==ee.p_stat)&&!(e===m._return&&we.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===ee.b_stat)?this.context.push(ee.f_expr):this.context.push(ee.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===ee.q_tmpl?this.context.pop():this.context.push(ee.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===ee.f_expr?this.context[t]=ee.f_expr_gen:this.context[t]=ee.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var R=se.prototype;R.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n=e.key,l;switch(n.type){case"Identifier":l=n.name;break;case"Literal":l=String(n.value);break;default:return}var p=e.kind;if(this.options.ecmaVersion>=6){l==="__proto__"&&p==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=n.start):this.raiseRecoverable(n.start,"Redefinition of __proto__ property")),t.proto=!0);return}l="$"+l;var d=t[l];if(d){var g;p==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[p],g&&this.raiseRecoverable(n.start,"Redefinition of property")}else d=t[l]={init:!1,get:!1,set:!1};d[p]=!0}};R.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var n=i.start,l=i.startLoc,p=i.parseMaybeAssign(e,t);if(i.type===m.comma){var d=i.startNodeAt(n,l);for(d.expressions=[p];i.eat(m.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return p})};R.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var n=!1,l=-1,p=-1,d=-1;t?(l=t.parenthesizedAssign,p=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new pr,n=!0);var g=this.start,x=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,x)),this.type.isAssign){var y=this.startNodeAt(g,x);return y.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),y.left=b,this.next(),y.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(y,"AssignmentExpression")}else n&&this.checkExpressionErrors(t,!0);return l>-1&&(t.parenthesizedAssign=l),p>-1&&(t.trailingComma=p),b};R.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,l=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return l;if(!(l.type==="ArrowFunctionExpression"&&l.start===i)&&this.eat(m.question)){var p=this.startNodeAt(i,n);return p.test=l,p.consequent=this.parseMaybeAssign(),this.expect(m.colon),p.alternate=this.parseMaybeAssign(e),this.finishNode(p,"ConditionalExpression")}return l};R.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,l=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||l.start===i&&l.type==="ArrowFunctionExpression"?l:this.parseExprOp(l,i,n,-1,e)};R.parseExprOp=function(e,t,i,n,l){var p=this.type.binop;if(p!=null&&(!l||this.type!==m._in)&&p>n){var d=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(p=m.logicalAND.binop);var x=this.value;this.next();var b=this.start,y=this.startLoc,v=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,l),b,y,p,l),C=this.buildBinary(t,i,e,v,x,d||g);return(d&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(C,t,i,n,l)}return e};R.buildBinary=function(e,t,i,n,l,p){n.type==="PrivateIdentifier"&&this.raise(n.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=l,d.right=n,this.finishNode(d,p?"LogicalExpression":"BinaryExpression")};R.parseMaybeUnary=function(e,t,i,n){var l=this.start,p=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(n),t=!0;else if(this.type.prefix){var g=this.startNode(),x=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,x,n),this.checkExpressionErrors(e,!0),x?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&_c(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&kn(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,x?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(n||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(l,p);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===l)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(l,p,d,this.parseMaybeUnary(null,!1,!1,n),"**",!1);else return d};function _c(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&_c(e.expression)}function kn(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&kn(e.expression)||e.type==="ParenthesizedExpression"&&kn(e.expression)}R.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,l=this.parseExprAtom(e,t);if(l.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return l;var p=this.parseSubscripts(l,i,n,!1,t);return e&&p.type==="MemberExpression"&&(e.parenthesizedAssign>=p.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=p.start&&(e.parenthesizedBind=-1),e.trailingComma>=p.start&&(e.trailingComma=-1)),p};R.parseSubscripts=function(e,t,i,n,l){for(var p=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,n,p,d,l);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var x=this.startNodeAt(t,i);x.expression=g,g=this.finishNode(x,"ChainExpression")}return g}e=g}};R.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};R.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)};R.parseSubscript=function(e,t,i,n,l,p,d){var g=this.options.ecmaVersion>=11,x=g&&this.eat(m.questionDot);n&&x&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||x&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var y=this.startNodeAt(t,i);y.object=e,b?(y.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?y.property=this.parsePrivateIdent():y.property=this.parseIdent(this.options.allowReserved!=="never"),y.computed=!!b,g&&(y.optional=x),e=this.finishNode(y,"MemberExpression")}else if(!n&&this.eat(m.parenL)){var v=new pr,C=this.yieldPos,u=this.awaitPos,_=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var G=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,v);if(l&&!x&&this.shouldParseAsyncArrow())return this.checkPatternErrors(v,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=C,this.awaitPos=u,this.awaitIdentPos=_,this.parseSubscriptAsyncArrow(t,i,G,d);this.checkExpressionErrors(v,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,this.awaitIdentPos=_||this.awaitIdentPos;var Z=this.startNodeAt(t,i);Z.callee=e,Z.arguments=G,g&&(Z.optional=x),e=this.finishNode(Z,"CallExpression")}else if(this.type===m.backQuote){(x||p)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var Q=this.startNodeAt(t,i);Q.tag=e,Q.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(Q,"TaggedTemplateExpression")}return e};R.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var n,l=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(n,"Super");case m._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression");case m.name:var p=this.start,d=this.startLoc,g=this.containsEsc,x=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&x.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(ee.f_expr),this.parseFunction(this.startNodeAt(p,d),0,!1,!0,t);if(l&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(p,d),[x],!1,t);if(this.options.ecmaVersion>=8&&x.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return x=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(p,d),[x],!0,t)}return x;case m.regexp:var b=this.value;return n=this.parseLiteral(b.value),n.regex={pattern:b.pattern,flags:b.flags},n;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return n=this.startNode(),n.value=this.type===m._null?null:this.type===m._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal");case m.parenL:var y=this.start,v=this.parseParenAndDistinguishExpression(l,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(v)&&(e.parenthesizedAssign=y),e.parenthesizedBind<0&&(e.parenthesizedBind=y)),v;case m.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression");case m.braceL:return this.overrideContext(ee.b_expr),this.parseObj(!1,e);case m._function:return n=this.startNode(),this.next(),this.parseFunction(n,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};R.parseExprAtomDefault=function(){this.unexpected()};R.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};R.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};R.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};R.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};R.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};R.shouldParseArrow=function(e){return!this.canInsertSemicolon()};R.parseParenAndDistinguishExpression=function(e,t){var i=this.start,n=this.startLoc,l,p=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,x=[],b=!0,y=!1,v=new pr,C=this.yieldPos,u=this.awaitPos,_;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),p&&this.afterTrailingComma(m.parenR,!0)){y=!0;break}else if(this.type===m.ellipsis){_=this.start,x.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else x.push(this.parseMaybeAssign(!1,v,this.parseParenItem));var G=this.lastTokEnd,Z=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(x)&&this.eat(m.arrow))return this.checkPatternErrors(v,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=C,this.awaitPos=u,this.parseParenArrowList(i,n,x,t);(!x.length||y)&&this.unexpected(this.lastTokStart),_&&this.unexpected(_),this.checkExpressionErrors(v,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,x.length>1?(l=this.startNodeAt(d,g),l.expressions=x,this.finishNodeAt(l,"SequenceExpression",G,Z)):l=x[0]}else l=this.parseParenExpression();if(this.options.preserveParens){var Q=this.startNodeAt(i,n);return Q.expression=l,this.finishNode(Q,"ParenthesizedExpression")}else return l};R.parseParenItem=function(e){return e};R.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)};var Ff=[];R.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,l=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,l,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(n,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=Ff,this.finishNode(e,"NewExpression")};R.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};R.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var n=this.parseTemplateElement({isTagged:t});for(i.quasis=[n];!n.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};R.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!we.test(this.input.slice(this.lastTokEnd,this.start))};R.parseObj=function(e,t){var i=this.startNode(),n=!0,l={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(n)n=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var p=this.parseProperty(e,t);e||this.checkPropClash(p,l,t),i.properties.push(p)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};R.parseProperty=function(e,t){var i=this.startNode(),n,l,p,d;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(p=this.start,d=this.startLoc),e||(n=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(i)?(l=!0,n=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):l=!1,this.parsePropertyValue(i,e,n,l,p,d,t,g),this.finishNode(i,"Property")};R.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var n=e.value.start;e.kind==="get"?this.raiseRecoverable(n,"getter should have no params"):this.raiseRecoverable(n,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};R.parsePropertyValue=function(e,t,i,n,l,p,d,g){(i||n)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,n),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||n)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=l),t?e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key)):this.type===m.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};R.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};R.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};R.parseMethod=function(e,t,i){var n=this.startNode(),l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(En(t,n.generator)|cr|(i?Sc:0)),this.expect(m.parenL),n.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(n,"FunctionExpression")};R.parseArrowExpression=function(e,t,i,n){var l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.enterScope(En(i,!1)|Cn),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};R.parseFunctionBody=function(e,t,i,n){var l=t&&this.type!==m.braceL,p=this.strict,d=!1;if(l)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!p||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var x=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!p&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,Ac),e.body=this.parseBlock(!1,void 0,d&&!p),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=x}this.exitScope()};R.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var n=i[t];if(n.type!=="Identifier")return!1}return!0};R.checkParams=function(e,t){for(var i=Object.create(null),n=0,l=e.params;n<l.length;n+=1){var p=l[n];this.checkLValInnerPattern(p,An,t?null:i)}};R.parseExprList=function(e,t,i,n){for(var l=[],p=!0;!this.eat(e);){if(p)p=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===m.comma?d=null:this.type===m.ellipsis?(d=this.parseSpread(n),n&&this.type===m.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):d=this.parseMaybeAssign(!1,n),l.push(d)}return l};R.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name;if(this.inGenerator&&n==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&ur)&&n==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(n==="arguments"||n==="await")&&this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var l=this.strict?this.reservedWordsStrict:this.reservedWords;l.test(n)&&(!this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))}};R.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};R.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};R.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};R.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};R.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var sr=se.prototype;sr.raise=function(e,t){var i=yc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var n=new SyntaxError(t);throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n};sr.raiseRecoverable=sr.raise;sr.curPosition=function(){if(this.options.locations)return new hi(this.curLine,this.pos-this.lineStart)};var ft=se.prototype,Of=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};ft.enterScope=function(e){this.scopeStack.push(new Of(e))};ft.exitScope=function(){this.scopeStack.pop()};ft.treatFunctionsAsVarInScope=function(e){return e.flags&wt||!this.inModule&&e.flags&St};ft.declareName=function(e,t,i){var n=!1;if(t===ot){var l=this.currentScope();n=l.lexical.indexOf(e)>-1||l.functions.indexOf(e)>-1||l.var.indexOf(e)>-1,l.lexical.push(e),this.inModule&&l.flags&St&&delete this.undefinedExports[e]}else if(t===Ec){var p=this.currentScope();p.lexical.push(e)}else if(t===Cc){var d=this.currentScope();this.treatFunctionsAsVar?n=d.lexical.indexOf(e)>-1:n=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var x=this.scopeStack[g];if(x.lexical.indexOf(e)>-1&&!(x.flags&kc&&x.lexical[0]===e)||!this.treatFunctionsAsVarInScope(x)&&x.functions.indexOf(e)>-1){n=!0;break}if(x.var.push(e),this.inModule&&x.flags&St&&delete this.undefinedExports[e],x.flags&ur)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};ft.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};ft.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};ft.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(ur|di|Ct))return t}};ft.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(ur|di|Ct)&&!(t.flags&Cn))return t}};var hr=function(t,i,n){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new lr(t,n)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},fi=se.prototype;fi.startNode=function(){return new hr(this,this.start,this.startLoc)};fi.startNodeAt=function(e,t){return new hr(this,e,t)};function Ic(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}fi.finishNode=function(e,t){return Ic.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};fi.finishNodeAt=function(e,t,i,n){return Ic.call(this,e,t,i,n)};fi.copyNode=function(e){var t=new hr(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Mf="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Lc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",$c=Lc+" Extended_Pictographic",Pc=$c,Nc=Pc+" EBase EComp EMod EPres ExtPict",Rc=Nc,Df=Rc,Vf={9:Lc,10:$c,11:Pc,12:Nc,13:Rc,14:Df},Bf="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",jf={9:"",10:"",11:"",12:"",13:"",14:Bf},pc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Fc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Oc=Fc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Mc=Oc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Dc=Mc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Vc=Dc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Uf=Vc+" "+Mf,Hf={9:Fc,10:Oc,11:Mc,12:Dc,13:Vc,14:Uf},Bc={};function zf(e){var t=Bc[e]={binary:ht(Vf[e]+" "+pc),binaryOfStrings:ht(jf[e]),nonBinary:{General_Category:ht(pc),Script:ht(Hf[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(rr=0,bn=[9,10,11,12,13,14];rr<bn.length;rr+=1)hc=bn[rr],zf(hc);var hc,rr,bn,L=se.prototype,or=function(t,i){this.parent=t,this.base=i||this};or.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var n=t;n;n=n.parent)if(i.base===n.base&&i!==n)return!0;return!1};or.prototype.sibling=function(){return new or(this.parent,this.base)};var Ze=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=Bc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};Ze.prototype.reset=function(t,i,n){var l=n.indexOf("v")!==-1,p=n.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=n,l&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=p&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=p&&this.parser.options.ecmaVersion>=9)};Ze.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};Ze.prototype.at=function(t,i){i===void 0&&(i=!1);var n=this.source,l=n.length;if(t>=l)return-1;var p=n.charCodeAt(t);if(!(i||this.switchU)||p<=55295||p>=57344||t+1>=l)return p;var d=n.charCodeAt(t+1);return d>=56320&&d<=57343?(p<<10)+d-56613888:p};Ze.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var n=this.source,l=n.length;if(t>=l)return l;var p=n.charCodeAt(t),d;return!(i||this.switchU)||p<=55295||p>=57344||t+1>=l||(d=n.charCodeAt(t+1))<56320||d>57343?t+1:t+2};Ze.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};Ze.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};Ze.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};Ze.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};Ze.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var n=this.pos,l=0,p=t;l<p.length;l+=1){var d=p[l],g=this.at(n,i);if(g===-1||g!==d)return!1;n=this.nextIndex(n,i)}return this.pos=n,!0};L.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,l=!1,p=0;p<i.length;p++){var d=i.charAt(p);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,p+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(n=!0),d==="v"&&(l=!0)}this.options.ecmaVersion>=15&&n&&l&&this.raise(e.start,"Invalid regular expression flag")};function Wf(e){for(var t in e)return!0;return!1}L.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Wf(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};L.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t];e.groupNames[n]||e.raise("Invalid named capture referenced")}};L.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new or(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};L.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};L.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};L.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};L.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};L.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};L.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var n=0,l=-1;if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(l=e.lastIntValue),e.eat(125)))return l!==-1&&l<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};L.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};L.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};L.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),n=e.eat(45);if(i||n){for(var l=0;l<i.length;l++){var p=i.charAt(l);i.indexOf(p,l+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(n){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var x=d.charAt(g);(d.indexOf(x,g+1)>-1||i.indexOf(x)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};L.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};L.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&Gf(i);)t+=at(i),e.advance();return t};function Gf(e){return e===105||e===109||e===115}L.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};L.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};L.regexp_eatSyntaxCharacter=function(e){var t=e.current();return jc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function jc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}L.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!jc(i);)e.advance();return e.pos!==t};L.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};L.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var n=0,l=i;n<l.length;n+=1){var p=l[n];p.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};L.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};L.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=at(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=at(e.lastIntValue);return!0}return!1};L.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),qf(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function qf(e){return Qe(e,!0)||e===36||e===95}L.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),Kf(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function Kf(e){return dt(e,!0)||e===36||e===95||e===8204||e===8205}L.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};L.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};L.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};L.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};L.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};L.regexp_eatZero=function(e){return e.current()===48&&!dr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};L.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};L.regexp_eatControlLetter=function(e){var t=e.current();return Uc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function Uc(e){return e>=65&&e<=90||e>=97&&e<=122}L.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,n=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var l=e.lastIntValue;if(n&&l>=55296&&l<=56319){var p=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(l-55296)*1024+(d-56320)+65536,!0}e.pos=p,e.lastIntValue=l}return!0}if(n&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&Yf(e.lastIntValue))return!0;n&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function Yf(e){return e>=0&&e<=1114111}L.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};L.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var Hc=0,st=1,Oe=2;L.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Qf(t))return e.lastIntValue=-1,e.advance(),st;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var n;if(e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&n===Oe&&e.raise("Invalid property name"),n;e.raise("Invalid property name")}return Hc};function Qf(e){return e===100||e===68||e===115||e===83||e===119||e===87}L.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),st}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var l=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,l)}return Hc};L.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){Ut(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};L.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return st;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return Oe;e.raise("Invalid property name")};L.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";zc(t=e.current());)e.lastStringValue+=at(t),e.advance();return e.lastStringValue!==""};function zc(e){return Uc(e)||e===95}L.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";Zf(t=e.current());)e.lastStringValue+=at(t),e.advance();return e.lastStringValue!==""};function Zf(e){return zc(e)||dr(e)}L.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};L.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===Oe&&e.raise("Negated character class may contain strings"),!0}return!1};L.regexp_classContents=function(e){return e.current()===93?st:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),st)};L.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};L.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||qc(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current();return n!==93?(e.lastIntValue=n,e.advance(),!0):!1};L.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};L.regexp_classSetExpression=function(e){var t=st,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===Oe&&(t=Oe);for(var n=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==Oe&&(t=st);continue}e.raise("Invalid character in character class")}if(n!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(n!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===Oe&&(t=Oe)}};L.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue;return i!==-1&&n!==-1&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};L.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?st:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};L.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e);if(e.eat(93))return i&&n===Oe&&e.raise("Negated character class may contain strings"),n;e.pos=t}if(e.eat(92)){var l=this.regexp_eatCharacterClassEscape(e);if(l)return l;e.pos=t}return null};L.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};L.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===Oe&&(t=Oe);return t};L.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?st:Oe};L.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&Jf(i)||Xf(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function Jf(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function Xf(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}L.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return em(t)?(e.lastIntValue=t,e.advance(),!0):!1};function em(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}L.regexp_eatClassControlLetter=function(e){var t=e.current();return dr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};L.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};L.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;dr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function dr(e){return e>=48&&e<=57}L.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Wc(i=e.current());)e.lastIntValue=16*e.lastIntValue+Gc(i),e.advance();return e.pos!==t};function Wc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Gc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}L.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};L.regexp_eatOctalDigit=function(e){var t=e.current();return qc(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function qc(e){return e>=48&&e<=55}L.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var n=0;n<t;++n){var l=e.current();if(!Wc(l))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+Gc(l),e.advance()}return!0};var _n=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new lr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},j=se.prototype;j.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new _n(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};j.getToken=function(){return this.next(),new _n(this)};typeof Symbol<"u"&&(j[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});j.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};j.readToken=function(e){return Qe(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};j.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};j.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};j.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,l=t;(n=gc(this.input,l,this.pos))>-1;)++this.curLine,l=this.lineStart=n;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};j.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!jt(n);)n=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};j.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&bc.test(String.fromCharCode(e)))++this.pos;else break e}}};j.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};j.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};j.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};j.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,n=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(n,i)};j.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};j.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};j.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||we.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};j.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};j.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};j.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var n=this.input.charCodeAt(this.pos+2);if(n===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};j.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),Qe(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+at(t)+"'")};j.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+at(e)+"'")};j.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};j.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(we.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(n==="[")t=!0;else if(n==="]"&&t)t=!1;else if(n==="/"&&!t)break;e=n==="\\"}++this.pos}var l=this.input.slice(i,this.pos);++this.pos;var p=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(p);var g=this.regexpState||(this.regexpState=new Ze(this));g.reset(i,l,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var x=null;try{x=new RegExp(l,d)}catch{}return this.finishToken(m.regexp,{pattern:l,flags:d,value:x})};j.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&t===void 0,l=i&&this.input.charCodeAt(this.pos)===48,p=this.pos,d=0,g=0,x=0,b=t??1/0;x<b;++x,++this.pos){var y=this.input.charCodeAt(this.pos),v=void 0;if(n&&y===95){l&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),x===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=y;continue}if(y>=97?v=y-97+10:y>=65?v=y-65+10:y>=48&&y<=57?v=y-48:v=1/0,v>=e)break;g=y,d=d*e+v}return n&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===p||t!=null&&this.pos-p!==t?null:d};function tm(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function Kc(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}j.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=Kc(this.input.slice(t,this.pos)),++this.pos):Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};j.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var n=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&n===110){var l=Kc(this.input.slice(t,this.pos));return++this.pos,Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,l)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),n===46&&!i&&(++this.pos,this.readInt(10),n=this.input.charCodeAt(this.pos)),(n===69||n===101)&&!i&&(n=this.input.charCodeAt(++this.pos),(n===43||n===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),Qe(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var p=tm(this.input.slice(t,this.pos),i);return this.finishToken(m.num,p)};j.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};j.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var n=this.input.charCodeAt(this.pos);if(n===e)break;n===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):n===8232||n===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(jt(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var Yc={};j.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===Yc)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};j.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw Yc;this.raise(e,t)};j.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(jt(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};j.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};j.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return at(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],l=parseInt(n,8);return l>255&&(n=n.slice(0,-1),l=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),(n!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(l)}return jt(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};j.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};j.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,n=this.options.ecmaVersion>=6;this.pos<this.input.length;){var l=this.fullCharCodeAtPos();if(dt(l,n))this.pos+=l<=65535?1:2;else if(l===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var p=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?Qe:dt)(d,n)||this.invalidStringToken(p,"Invalid Unicode escape"),e+=at(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};j.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=Sn[e]),this.finishToken(t,e)};var im="8.18.0";se.acorn={Parser:se,version:im,defaultOptions:yn,Position:hi,SourceLocation:lr,getLineInfo:yc,Node:hr,TokenType:z,tokTypes:m,keywordTypes:Sn,TokContext:ze,tokContexts:ee,isIdentifierChar:dt,isIdentifierStart:Qe,Token:_n,isNewLine:jt,lineBreak:we,lineBreakG:Ef,nonASCIIwhitespace:bc};function Qc(e,t){return se.parse(e,t)}var zt=null,mi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let n;return zt!==null?(n=zt,zt=zt.cursor,n.prev=t,n.next=i,n.cursor=this.cursor):n={prev:t,next:i,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=zt,zt=t}updateCursors(t,i,n,l){let{cursor:p}=this;for(;p!==null;)p.prev===t&&(p.prev=i),p.next===n&&(p.next=l),p=p.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let n of t){let l=e.createItem(n);i!==null?i.next=l:this.head=l,l.prev=i,i=l}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let l=n.next;n.next=l.next,t.call(i,l.data,l,this)}this.releaseCursor()}forEachRight(t,i=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let l=n.prev;n.prev=l.prev,t.call(i,l.data,l,this)}this.releaseCursor()}reduce(t,i,n=this){let l=this.allocateCursor(null,this.head),p=i,d;for(;l.next!==null;)d=l.next,l.next=d.next,p=t.call(n,p,d.data,d,this);return this.releaseCursor(),p}reduceRight(t,i,n=this){let l=this.allocateCursor(this.tail,null),p=i,d;for(;l.prev!==null;)d=l.prev,l.prev=d.prev,p=t.call(n,p,d.data,d,this);return this.releaseCursor(),p}some(t,i=this){for(let n=this.head;n!==null;n=n.next)if(t.call(i,n.data,n,this))return!0;return!1}map(t,i=this){let n=new e;for(let l=this.head;l!==null;l=l.next)n.appendData(t.call(i,l.data,l,this));return n}filter(t,i=this){let n=new e;for(let l=this.head;l!==null;l=l.next)t.call(i,l.data,l,this)&&n.appendData(l.data);return n}nextUntil(t,i,n=this){if(t===null)return;let l=this.allocateCursor(null,t);for(;l.next!==null;){let p=l.next;if(l.next=p.next,i.call(n,p.data,p,this))break}this.releaseCursor()}prevUntil(t,i,n=this){if(t===null)return;let l=this.allocateCursor(t,null);for(;l.prev!==null;){let p=l.prev;if(l.prev=p.prev,i.call(n,p.data,p,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function Zc(e,t){let i=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var In=100,Jc=60,Xc="    ";function eu({source:e,line:t,column:i,baseLine:n,baseColumn:l},p){function d(_,G){return b.slice(_,G).map((Z,Q)=>String(_+Q+1).padStart(C)+" |"+Z).join(`
`)}let g=`
`.repeat(Math.max(n-1,0)),x=" ".repeat(Math.max(l-1,0)),b=(g+x+e).split(/\r\n?|\n|\f/),y=Math.max(1,t-p)-1,v=Math.min(t+p,b.length+1),C=Math.max(4,String(v).length)+1,u=0;i+=(Xc.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>In&&(u=i-Jc+3,i=Jc-2);for(let _=y;_<=v;_++)_>=0&&_<b.length&&(b[_]=b[_].replace(/\t/g,Xc),b[_]=(u>0&&b[_].length>u?"\u2026":"")+b[_].substr(u,In-2)+(b[_].length>u+In-1?"\u2026":""));return[d(y,t),new Array(i+C+2).join("-")+"^",d(t,v)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Ln(e,t,i,n,l,p=1,d=1){return Object.assign(Zc("SyntaxError",e),{source:t,offset:i,line:n,column:l,sourceFragment(x){return eu({source:t,line:n,column:l,baseLine:p,baseColumn:d},isNaN(x)?0:x)},get formattedMessage(){return`Parse error: ${e}
`+eu({source:t,line:n,column:l,baseLine:p,baseColumn:d},2)}})}function be(e){return e>=48&&e<=57}function Je(e){return be(e)||e>=65&&e<=70||e>=97&&e<=102}function mr(e){return e>=65&&e<=90}function rm(e){return e>=97&&e<=122}function nm(e){return mr(e)||rm(e)}function am(e){return e>=128}function fr(e){return nm(e)||am(e)||e===95}function gr(e){return fr(e)||be(e)||e===45}function sm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function gi(e){return e===10||e===13||e===12}function Xe(e){return gi(e)||e===32||e===9}function Ce(e,t){return!(e!==92||gi(t)||t===0)}function br(e,t,i){return e===45?fr(t)||t===45||Ce(t,i):fr(e)?!0:e===92?Ce(e,t):!1}function xr(e,t,i){return e===43||e===45?be(t)?2:t===46&&be(i)?3:0:e===46?be(t)?2:0:be(e)?1:0}function yr(e){return e===65279||e===65534?1:0}var $n=new Array(128),om=128,bi=130,Pn=131,vr=132,Nn=133;for(let e=0;e<$n.length;e++)$n[e]=Xe(e)&&bi||be(e)&&Pn||fr(e)&&vr||sm(e)&&Nn||e||om;function kr(e){return e<128?$n[e]:vr}function Wt(e,t){return t<e.length?e.charCodeAt(t):0}function Sr(e,t,i){return i===13&&Wt(e,t+1)===10?2:1}function Fn(e,t,i){let n=e.charCodeAt(t);return mr(n)&&(n=n|32),n===i}function Et(e,t,i,n){if(i-t!==n.length||t<0||i>e.length)return!1;for(let l=t;l<i;l++){let p=n.charCodeAt(l-t),d=e.charCodeAt(l);if(mr(d)&&(d=d|32),d!==p)return!1}return!0}function tu(e,t){for(;t>=0&&Xe(e.charCodeAt(t));t--);return t+1}function xi(e,t){for(;t<e.length&&Xe(e.charCodeAt(t));t++);return t}function Rn(e,t){for(;t<e.length&&be(e.charCodeAt(t));t++);return t}function lt(e,t){if(t+=2,Je(Wt(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&Je(Wt(e,t));t++);let i=Wt(e,t);Xe(i)&&(t+=Sr(e,t,i))}return t}function yi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!gr(i)){if(Ce(i,Wt(e,t+1))){t=lt(e,t)-1;continue}break}}return t}function wr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),be(i)&&(t=Rn(e,t+1),i=e.charCodeAt(t)),i===46&&be(e.charCodeAt(t+1))&&(t+=2,t=Rn(e,t)),Fn(e,t,101)){let n=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(n=1,i=e.charCodeAt(t+2)),be(i)&&(t=Rn(e,t+1+n+1))}return t}function Cr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Ce(i,Wt(e,t+1))&&(t=lt(e,t))}return t}function Er(e){if(e.length===1&&!Je(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var Gt=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function qt(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var iu=10,lm=12,ru=13;function nu(e){let t=e.source,i=t.length,n=t.length>0?yr(t.charCodeAt(0)):0,l=qt(e.lines,i),p=qt(e.columns,i),d=e.startLine,g=e.startColumn;for(let x=n;x<i;x++){let b=t.charCodeAt(x);l[x]=d,p[x]=g++,(b===iu||b===ru||b===lm)&&(b===ru&&x+1<i&&t.charCodeAt(x+1)===iu&&(x++,l[x]=d,p[x]=g),d++,g=1)}l[i]=d,p[i]=g,e.lines=l,e.columns=p,e.computed=!0}var Ar=class{constructor(t,i,n,l){this.setSource(t,i,n,l),this.lines=null,this.columns=null}setSource(t="",i=0,n=1,l=1){this.source=t,this.startOffset=i,this.startLine=n,this.startColumn=l,this.computed=!1}getLocation(t,i){return this.computed||nu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,n){return this.computed||nu(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var We=16777215,Ge=24,ki=1,_r=2,mt=new Uint8Array(32);mt[2]=22;mt[21]=22;mt[19]=20;mt[23]=24;var qe=new Uint8Array(32);qe[2]=ki;qe[21]=ki;qe[19]=ki;qe[23]=ki;qe[22]=_r;qe[20]=_r;qe[24]=_r;function au(e,t,i){return e<t?t:e>i?i:e}var Tr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let n=t.length,l=qt(this.offsetAndType,t.length+1),p=qt(this.balance,t.length+1),d=0,g=-1,x=0,b=t.length;this.offsetAndType=null,this.balance=null,p.fill(0),i(t,(y,v,C)=>{let u=d++;if(l[u]=y<<Ge|C,g===-1&&(g=v),p[u]=b,y===x){let _=p[b];p[b]=u,b=_,x=mt[l[_]>>Ge]}else this.isBlockOpenerTokenType(y)&&(b=u,x=mt[y])}),l[d]=0<<Ge|n,p[d]=d;for(let y=0;y<d;y++){let v=p[y];if(v<=y){let C=p[v];C!==y&&(p[y]=C)}else v>d&&(p[y]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=l,this.balance=p,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>Ge:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ge;if(n!==13&&n!==25&&t--===0)return n}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&We:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ge;if(n!==13&&n!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Et(this.source,this.offsetAndType[t-1]&We,this.offsetAndType[t]&We,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&We:this.offsetAndType[this.tokenCount]&We:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[au(t,0,this.tokenCount)]&We}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[au(t,0,this.tokenCount)]>>Ge}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return qe[t]===ki}isBlockCloserTokenType(t){return qe[t]===_r}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(qe[i]===1){let n=this.balance[t],l=this.getTokenType(n);return mt[i]===l?n:-1}else if(qe[i]===2){let n=this.balance[t],l=this.getTokenType(n);return mt[l]===i?n:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&We,i=this.offsetAndType[i],this.tokenType=i>>Ge,this.tokenEnd=i&We):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>Ge,this.tokenEnd=t&We):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let n=t,l=0,p=0;e:for(;n<this.tokenCount;n++){if(l=this.balance[n],l<t)break e;switch(p=n>0?this.offsetAndType[n-1]&We:this.firstCharOffset,i(this.source.charCodeAt(p))){case 1:break e;case 2:n++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[n]>>Ge)&&(n=l)}}this.skip(n-this.tokenIndex)}forEachToken(t){for(let i=0,n=this.firstCharOffset;i<this.tokenCount;i++){let l=n,p=this.offsetAndType[i],d=p&We,g=p>>Ge;n=d,t(g,l,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,n,l,p)=>{t[p]={idx:p,type:Gt[i],chunk:this.source.substring(n,l),balance:this.balance[p]}}),t}};function Ir(e,t){function i(v){return v<g?e.charCodeAt(v):0}function n(){if(b=wr(e,b),br(i(b),i(b+1),i(b+2))){y=12,b=yi(e,b);return}if(i(b)===37){y=11,b++;return}y=10}function l(){let v=b;if(b=yi(e,b),Et(e,v,b,"url")&&i(b)===40){if(b=xi(e,b+1),i(b)===34||i(b)===39){y=2,b=v+4;return}d();return}if(i(b)===40){y=2,b++;return}y=1}function p(v){for(v||(v=i(b++)),y=5;b<e.length;b++){let C=e.charCodeAt(b);switch(kr(C)){case v:b++;return;case bi:if(gi(C)){b+=Sr(e,b,C),y=6;return}break;case 92:if(b===e.length-1)break;let u=i(b+1);gi(u)?b+=Sr(e,b+1,u):Ce(C,u)&&(b=lt(e,b)-1);break}}}function d(){for(y=7,b=xi(e,b);b<e.length;b++){let v=e.charCodeAt(b);switch(kr(v)){case 41:b++;return;case bi:if(b=xi(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Cr(e,b),y=8;return;case 34:case 39:case 40:case Nn:b=Cr(e,b),y=8;return;case 92:if(Ce(v,i(b+1))){b=lt(e,b)-1;break}b=Cr(e,b),y=8;return}}}e=String(e||"");let g=e.length,x=yr(i(0)),b=x,y;for(;b<g;){let v=e.charCodeAt(b);switch(kr(v)){case bi:y=13,b=xi(e,b+1);break;case 34:p();break;case 35:gr(i(b+1))||Ce(i(b+1),i(b+2))?(y=4,b=yi(e,b+1)):(y=9,b++);break;case 39:p();break;case 40:y=21,b++;break;case 41:y=22,b++;break;case 43:xr(v,i(b+1),i(b+2))?n():(y=9,b++);break;case 44:y=18,b++;break;case 45:xr(v,i(b+1),i(b+2))?n():i(b+1)===45&&i(b+2)===62?(y=15,b=b+3):br(v,i(b+1),i(b+2))?l():(y=9,b++);break;case 46:xr(v,i(b+1),i(b+2))?n():(y=9,b++);break;case 47:i(b+1)===42?(y=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(y=9,b++);break;case 58:y=16,b++;break;case 59:y=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(y=14,b=b+4):(y=9,b++);break;case 64:br(i(b+1),i(b+2),i(b+3))?(y=3,b=yi(e,b+1)):(y=9,b++);break;case 91:y=19,b++;break;case 92:Ce(v,i(b+1))?l():(y=9,b++);break;case 93:y=20,b++;break;case 123:y=23,b++;break;case 125:y=24,b++;break;case Pn:n();break;case vr:l();break;default:y=9,b++}t(y,x,x=b)}}function su(e){let t=this.createList(),i=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let l=e.getNode.call(this,n);if(l===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,l,t,n),i=!1),t.push(l)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var Qt=()=>{},cm=33,um=35,Mn=59,ou=123,lu=0,pm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},hm={createList(){return new mi},createSingleNodeList(e){return new mi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function dm(e){return function(){return this[e]()}}function Dn(e){let t=Object.create(null);for(let i of Object.keys(e)){let n=e[i],l=n.parse||n;l&&(t[i]=l)}return t}function fm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Dn(e.atrule),pseudo:Dn(e.pseudo),node:Dn(e.node)};for(let[i,n]of Object.entries(e.parseContext))switch(typeof n){case"function":t.context[i]=n;break;case"string":t.context[i]=dm(n);break}return{config:t,...t,...t.node}}function cu(e){let t="",i="<unknown>",n=!1,l=Qt,p=!1,d=new Ar,g=Object.assign(new Tr,fm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:su,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(y){return y===ou?1:0},consumeUntilLeftCurlyBracketOrSemicolon(y){return y===ou||y===Mn?1:0},consumeUntilExclamationMarkOrSemicolon(y){return y===cm||y===Mn?1:0},consumeUntilSemicolonIncluded(y){return y===Mn?2:0},createList:Qt,createSingleNodeList:Qt,getFirstListNode:Qt,getLastListNode:Qt,parseWithFallback(y,v){let C=this.tokenIndex;try{return y.call(this)}catch(u){if(p)throw u;this.skip(C-this.tokenIndex);let _=v.call(this);return p=!0,l(u,_),p=!1,_}},lookupNonWSType(y){let v;do if(v=this.lookupType(y++),v!==13&&v!==25)return v;while(v!==lu);return lu},charCodeAt(y){return y>=0&&y<t.length?t.charCodeAt(y):0},substring(y,v){return t.substring(y,v)},substrToCursor(y){return this.source.substring(y,this.tokenStart)},cmpChar(y,v){return Fn(t,y,v)},cmpStr(y,v,C){return Et(t,y,v,C)},consume(y){let v=this.tokenStart;return this.eat(y),this.substrToCursor(v)},consumeFunctionName(){let y=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),y},consumeNumber(y){let v=t.substring(this.tokenStart,wr(t,this.tokenStart));return this.eat(y),v},eat(y){if(this.tokenType!==y){let v=Gt[y].slice(0,-6).replace(/-/g," ").replace(/^./,_=>_.toUpperCase()),C=`${/[[\](){}]/.test(v)?`"${v}"`:v} is expected`,u=this.tokenStart;switch(y){case 1:this.tokenType===2||this.tokenType===7?(u=this.tokenEnd-1,C="Identifier is expected but function found"):C="Identifier is expected";break;case 4:this.isDelim(um)&&(this.next(),u++,C="Name is expected");break;case 11:this.tokenType===10&&(u=this.tokenEnd,C="Percent sign is expected");break}this.error(C,u)}this.next()},eatIdent(y){(this.tokenType!==1||this.lookupValue(0,y)===!1)&&this.error(`Identifier "${y}" is expected`),this.next()},eatDelim(y){this.isDelim(y)||this.error(`Delim "${String.fromCharCode(y)}" is expected`),this.next()},getLocation(y,v){return n?d.getLocationRange(y,v,i):null},getLocationFromList(y){if(n){let v=this.getFirstListNode(y),C=this.getLastListNode(y);return d.getLocationRange(v!==null?v.loc.start.offset-d.startOffset:this.tokenStart,C!==null?C.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(y,v){let C=typeof v<"u"&&v<t.length?d.getLocation(v):this.eof?d.getLocation(tu(t,t.length-1)):d.getLocation(this.tokenStart);throw new Ln(y||"Unexpected input",t,C.offset,C.line,C.column,d.startLine,d.startColumn)}}),x=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:y=>g.getTokenType(y),getTokenTypeName:y=>Gt[g.getTokenType(y)],getTokenStart:y=>g.getTokenStart(y),getTokenEnd:y=>g.getTokenEnd(y),getTokenValue:y=>g.source.substring(g.getTokenStart(y),g.getTokenEnd(y)),substring:(y,v)=>g.source.substring(y,v),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:y=>g.getBlockTokenPairIndex(y),getLocation:y=>d.getLocation(y,i),getRangeLocation:(y,v)=>d.getLocationRange(y,v,i)});return Object.assign(function(y,v){t=y,v=v||{},g.setSource(t,Ir),d.setSource(t,v.offset,v.line,v.column),i=v.filename||"<unknown>",n=!!v.positions,l=typeof v.onParseError=="function"?v.onParseError:Qt,p=!1,g.parseAtrulePrelude="parseAtrulePrelude"in v?!!v.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in v?!!v.parseRulePrelude:!0,g.parseValue="parseValue"in v?!!v.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in v?!!v.parseCustomProperty:!1;let{context:C="default",list:u=!0,onComment:_,onToken:G}=v;if(!(C in g.context))throw new Error("Unknown context `"+C+"`");Object.assign(g,u?hm:pm),Array.isArray(G)?g.forEachToken((Q,Ae,oe)=>{G.push({type:Q,start:Ae,end:oe})}):typeof G=="function"&&g.forEachToken(G.bind(x())),typeof _=="function"&&g.forEachToken((Q,Ae,oe)=>{if(Q===25){let Te=g.getLocation(Ae,oe),_i=Et(t,oe-2,oe,"*/")?t.slice(Ae+2,oe-2):t.slice(Ae+2,oe);_(_i,Te)}});let Z=g.context[C].call(g,v);return g.eof||g.error(),Z},{SyntaxError:Ln,config:g.config})}var Vn={};N(Vn,{AtrulePrelude:()=>pu,Selector:()=>du,Value:()=>bu});var mm=35,gm=42,uu=43,bm=45,xm=47,ym=117;function Si(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,ym)&&this.cmpChar(this.tokenStart+1,uu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===xm||t===gm||t===uu||t===bm)return this.Operator();t===mm&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var pu={getNode:Si};var vm=35,km=38,Sm=42,wm=43,Cm=47,hu=46,Em=62,Am=124,Tm=126;function _m(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Im(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===hu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case wm:case Em:case Tm:case Cm:return this.Combinator();case hu:return this.ClassSelector();case Sm:case Am:return this.TypeSelector();case vm:return this.IdSelector();case km:return this.NestingSelector()}break}}}var du={onWhiteSpace:_m,getNode:Im};function fu(){return this.createSingleNodeList(this.Raw(null,!1))}function mu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function gu(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var bu={getNode:Si,onWhiteSpace(e,t){gu(e)&&(e.value=" "+e.value),gu(t.last)&&(t.last.value+=" ")},expression:fu,var:mu};var Lm=new Set(["none","and","not","or"]),xu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);Lm.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var yu={parse:{prelude:null,block(){return this.Block(!0)}}};function Bn(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var vu={layer(){this.skipSC();let e=this.createList(),t=Bn.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Bn.call(this,this.Declaration,()=>Bn.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},ku={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,vu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,vu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var Su={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var wu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Cu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Eu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Au={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Tu={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var _u={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Iu={container:xu,"font-face":yu,import:ku,layer:Su,media:wu,nest:Cu,page:Eu,scope:Au,"starting-style":Tu,supports:_u};function Lu(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Tt={parse(){return this.createSingleNodeList(this.SelectorList())}},jn={parse(){return this.createSingleNodeList(this.Selector())}},$m={parse(){return this.createSingleNodeList(this.Identifier())}},Pm={parse:Lu},Lr={parse(){return this.createSingleNodeList(this.Nth())}},$u={dir:$m,has:Tt,lang:Pm,matches:Tt,is:Tt,"-moz-any":Tt,"-webkit-any":Tt,where:Tt,not:Tt,"nth-child":Lr,"nth-last-child":Lr,"nth-last-of-type":Lr,"nth-of-type":Lr,slotted:jn,host:jn,"host-context":jn};var Oo={};N(Oo,{AnPlusB:()=>Hn,Atrule:()=>Gn,AtrulePrelude:()=>Yn,AttributeSelector:()=>Xn,Block:()=>ia,Brackets:()=>aa,CDC:()=>la,CDO:()=>pa,ClassSelector:()=>fa,Combinator:()=>ba,Comment:()=>va,Condition:()=>wa,Declaration:()=>Aa,DeclarationList:()=>La,Dimension:()=>Na,Feature:()=>Oa,FeatureFunction:()=>Va,FeatureRange:()=>Ha,Function:()=>Ga,GeneralEnclosed:()=>Ya,Hash:()=>Ja,IdSelector:()=>ns,Identifier:()=>ts,Layer:()=>os,LayerList:()=>us,MediaQuery:()=>ds,MediaQueryList:()=>gs,NestingSelector:()=>ys,Nth:()=>Ss,Number:()=>Es,Operator:()=>_s,Parentheses:()=>$s,Percentage:()=>Rs,PseudoClassSelector:()=>Ms,PseudoElementSelector:()=>Bs,Ratio:()=>Hs,Raw:()=>Gs,Rule:()=>Ys,Scope:()=>Js,Selector:()=>to,SelectorList:()=>no,String:()=>lo,StyleSheet:()=>po,SupportsDeclaration:()=>mo,TypeSelector:()=>yo,UnicodeRange:()=>wo,Url:()=>To,Value:()=>Lo,WhiteSpace:()=>No});var Wn={};N(Wn,{generate:()=>zn,name:()=>Rm,parse:()=>Hn,structure:()=>Fm});var it=43,Pe=45,$r=110,_t=!0,Nm=!1;function Pr(e,t){let i=this.tokenStart+e,n=this.charCodeAt(i);for((n===it||n===Pe)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)be(this.charCodeAt(i))||this.error("Integer is expected",i)}function Zt(e){return Pr.call(this,0,e)}function bt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case $r:i="N is expected";break;case Pe:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function Un(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(it,e)||this.isDelim(Pe,e)){t=this.isDelim(it,e)?it:Pe;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),Zt.call(this,_t))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==it&&i!==Pe&&this.error("Number sign is expected")),Zt.call(this,t!==0),t===Pe?"-"+this.consume(10):this.consume(10)}var Rm="AnPlusB",Fm={a:[String,null],b:[String,null]};function Hn(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)Zt.call(this,Nm),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,Pe))switch(t="-1",bt.call(this,1,$r),this.tokenEnd-this.tokenStart){case 2:this.next(),i=Un.call(this);break;case 3:bt.call(this,2,Pe),this.next(),this.skipSC(),Zt.call(this,_t),i="-"+this.consume(10);break;default:bt.call(this,2,Pe),Pr.call(this,3,_t),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(it)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(it)&&(n=1,this.next()),bt.call(this,0,$r),this.tokenEnd-this.tokenStart){case 1:this.next(),i=Un.call(this);break;case 2:bt.call(this,1,Pe),this.next(),this.skipSC(),Zt.call(this,_t),i="-"+this.consume(10);break;default:bt.call(this,1,Pe),Pr.call(this,2,_t),this.next(),i=this.substrToCursor(e+n+1)}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),l=n===it||n===Pe,p=this.tokenStart+l;for(;p<this.tokenEnd&&be(this.charCodeAt(p));p++);p===this.tokenStart+l&&this.error("Integer is expected",this.tokenStart+l),bt.call(this,p-this.tokenStart,$r),t=this.substring(e,p),p+1===this.tokenEnd?(this.next(),i=Un.call(this)):(bt.call(this,p-this.tokenStart+1,Pe),p+2===this.tokenEnd?(this.next(),this.skipSC(),Zt.call(this,_t),i="-"+this.consume(10)):(Pr.call(this,p-this.tokenStart+2,_t),this.next(),i=this.substrToCursor(p+1)))}else this.error();return t!==null&&t.charCodeAt(0)===it&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===it&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function zn(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var Kn={};N(Kn,{generate:()=>qn,name:()=>Mm,parse:()=>Gn,structure:()=>Vm,walkContext:()=>Dm});function Pu(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Om(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Mm="Atrule",Dm="atrule",Vm={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function Gn(e=!1){let t=this.tokenStart,i,n,l=null,p=null;switch(this.eat(3),i=this.substrToCursor(t+1),n=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?l=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Pu):l=Pu.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?p=this.atrule[n].block.call(this,e):p=this.Block(Om.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:l,block:p}}function qn(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var Zn={};N(Zn,{generate:()=>Qn,name:()=>Bm,parse:()=>Yn,structure:()=>Um,walkContext:()=>jm});var Bm="AtrulePrelude",jm="atrulePrelude",Um={children:[[]]};function Yn(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function Qn(e){this.children(e)}var ta={};N(ta,{generate:()=>ea,name:()=>Km,parse:()=>Xn,structure:()=>Ym});var Hm=36,Nu=42,Nr=61,zm=94,Jn=124,Wm=126;function Gm(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Nu)?(t=!0,this.next()):this.isDelim(Jn)||this.eat(1),this.isDelim(Jn)?this.charCodeAt(this.tokenStart+1)!==Nr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function qm(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==Nr&&t!==Wm&&t!==zm&&t!==Hm&&t!==Nu&&t!==Jn&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==Nr&&(this.isDelim(Nr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var Km="AttributeSelector",Ym={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function Xn(){let e=this.tokenStart,t,i=null,n=null,l=null;return this.eat(19),this.skipSC(),t=Gm.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=qm.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(l=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:n,flags:l}}function ea(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var na={};N(na,{generate:()=>ra,name:()=>Jm,parse:()=>ia,structure:()=>eg,walkContext:()=>Xm});var Qm=38;function Ou(){return this.Raw(null,!0)}function Ru(){return this.parseWithFallback(this.Rule,Ou)}function Fu(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Zm(){if(this.tokenType===17)return Fu.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Fu);return this.tokenType===17&&this.next(),e}var Jm="Block",Xm="block",eg={children:[["Atrule","Rule","Declaration"]]};function ia(e){let t=e?Zm:Ru,i=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),Ou));break;default:e&&this.isDelim(Qm)?n.push(Ru.call(this)):n.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:n}}function ra(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var oa={};N(oa,{generate:()=>sa,name:()=>tg,parse:()=>aa,structure:()=>ig});var tg="Brackets",ig={children:[[]]};function aa(e,t){let i=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:n}}function sa(e){this.token(9,"["),this.children(e),this.token(9,"]")}var ua={};N(ua,{generate:()=>ca,name:()=>rg,parse:()=>la,structure:()=>ng});var rg="CDC",ng=[];function la(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function ca(){this.token(15,"-->")}var da={};N(da,{generate:()=>ha,name:()=>ag,parse:()=>pa,structure:()=>sg});var ag="CDO",sg=[];function pa(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function ha(){this.token(14,"<!--")}var ga={};N(ga,{generate:()=>ma,name:()=>lg,parse:()=>fa,structure:()=>cg});var og=46,lg="ClassSelector",cg={name:String};function fa(){return this.eatDelim(og),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function ma(e){this.token(9,"."),this.token(1,e.name)}var ya={};N(ya,{generate:()=>xa,name:()=>dg,parse:()=>ba,structure:()=>fg});var ug=43,Mu=47,pg=62,hg=126,dg="Combinator",fg={name:String};function ba(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case pg:case ug:case hg:this.next();break;case Mu:this.next(),this.eatIdent("deep"),this.eatDelim(Mu);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function xa(e){this.tokenize(e.name)}var Sa={};N(Sa,{generate:()=>ka,name:()=>bg,parse:()=>va,structure:()=>xg});var mg=42,gg=47,bg="Comment",xg={value:String};function va(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===mg&&this.charCodeAt(t-1)===gg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function ka(e){this.token(25,"/*"+e.value+"*/")}var Ea={};N(Ea,{generate:()=>Ca,name:()=>vg,parse:()=>wa,structure:()=>kg});var yg=new Set([16,22,0]),vg="Condition",kg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Du(e){return this.lookupTypeNonSC(1)===1&&yg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var Sg={media:Du,container:Du,supports(){return this.SupportsDeclaration()}};function wa(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>Sg[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let n=this.Condition(e);return this.eat(22),n},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function Ca(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var _a={};N(_a,{generate:()=>Ta,name:()=>$g,parse:()=>Aa,structure:()=>Ng,walkContext:()=>Pg});var Vu=45;function Bu(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Vu&&e.charCodeAt(t+1)===Vu}var Uu=33,wg=35,Cg=36,Eg=38,Ag=42,Tg=43,ju=47;function _g(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Ig(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Lg(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Uu)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var $g="Declaration",Pg="declaration",Ng={important:[Boolean,String],property:String,value:["Value","Raw"]};function Aa(){let e=this.tokenStart,t=this.tokenIndex,i=Rg.call(this),n=Bu(i),l=n?this.parseCustomProperty:this.parseValue,p=n?Ig:_g,d=!1,g;this.skipSC(),this.eat(16);let x=this.tokenIndex;if(n||this.skipSC(),l?g=this.parseWithFallback(Lg,p):g=p.call(this,this.tokenIndex),n&&g.type==="Value"&&g.children.isEmpty){for(let b=x-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Uu)&&(d=Fg.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function Ta(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function Rg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Ag:case Cg:case Tg:case wg:case Eg:this.next();break;case ju:this.next(),this.isDelim(ju)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function Fg(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var Pa={};N(Pa,{generate:()=>$a,name:()=>Mg,parse:()=>La,structure:()=>Dg});var Og=38;function Ia(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var Mg="DeclarationList",Dg={children:[["Declaration","Atrule","Rule"]]};function La(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Ia));break;default:this.isDelim(Og)?e.push(this.parseWithFallback(this.Rule,Ia)):e.push(this.parseWithFallback(this.Declaration,Ia))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function $a(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var Fa={};N(Fa,{generate:()=>Ra,name:()=>Vg,parse:()=>Na,structure:()=>Bg});var Vg="Dimension",Bg={value:String,unit:String};function Na(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Ra(e){this.token(12,e.value+e.unit)}var Da={};N(Da,{generate:()=>Ma,name:()=>Ug,parse:()=>Oa,structure:()=>Hg});var jg=47,Ug="Feature",Hg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function Oa(e){let t=this.tokenStart,i,n=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?n=this.Ratio():n=this.Number();break;case 12:n=this.Dimension();break;case 1:n=this.Identifier();break;case 2:n=this.parseWithFallback(()=>{let l=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(jg)&&this.error(),l},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:n}}function Ma(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var ja={};N(ja,{generate:()=>Ba,name:()=>zg,parse:()=>Va,structure:()=>Wg});var zg="FeatureFunction",Wg={kind:String,feature:String,value:["Declaration","Selector"]};function Gg(e,t){let n=(this.features[e]||{})[t];return typeof n!="function"&&this.error(`Unknown feature ${t}()`),n}function Va(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),n=Gg.call(this,e,i.toLowerCase());this.skipSC();let l=this.parseWithFallback(()=>{let p=this.tokenIndex,d=n.call(this);return this.eof===!1&&this.isBalanceEdge(p)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:l}}function Ba(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var Wa={};N(Wa,{generate:()=>za,name:()=>Yg,parse:()=>Ha,structure:()=>Qg});var Hu=47,qg=60,zu=61,Kg=62,Yg="FeatureRange",Qg={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function Ua(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(Hu,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Hu)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Wu(e){if(this.skipSC(),this.isDelim(qg)||this.isDelim(Kg)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(zu)?(this.next(),t+"="):t}if(this.isDelim(zu))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function Ha(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=Ua.call(this),n=Wu.call(this,i.type==="Identifier"),l=Ua.call(this),p=null,d=null;return this.lookupNonWSType(0)!==22&&(p=Wu.call(this),d=Ua.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:n,middle:l,rightComparison:p,right:d}}function za(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var Ka={};N(Ka,{generate:()=>qa,name:()=>Zg,parse:()=>Ga,structure:()=>Xg,walkContext:()=>Jg});var Zg="Function",Jg="function",Xg={name:String,children:[[]]};function Ga(e,t){let i=this.tokenStart,n=this.consumeFunctionName(),l=n.toLowerCase(),p;return p=t.hasOwnProperty(l)?t[l].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:n,children:p}}function qa(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var Za={};N(Za,{generate:()=>Qa,name:()=>e0,parse:()=>Ya,structure:()=>t0});var e0="GeneralEnclosed",t0={kind:String,function:[String,null],children:[[]]};function Ya(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let n=this.parseWithFallback(()=>{let l=this.tokenIndex,p=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(l)===!1&&this.error(),p},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:n}}function Qa(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var es={};N(es,{generate:()=>Xa,name:()=>r0,parse:()=>Ja,structure:()=>n0,xxx:()=>i0});var i0="XXX",r0="Hash",n0={value:String};function Ja(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function Xa(e){this.token(4,"#"+e.value)}var rs={};N(rs,{generate:()=>is,name:()=>a0,parse:()=>ts,structure:()=>s0});var a0="Identifier",s0={name:String};function ts(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function is(e){this.token(1,e.name)}var ss={};N(ss,{generate:()=>as,name:()=>o0,parse:()=>ns,structure:()=>l0});var o0="IdSelector",l0={name:String};function ns(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function as(e){this.token(9,"#"+e.name)}var cs={};N(cs,{generate:()=>ls,name:()=>u0,parse:()=>os,structure:()=>p0});var c0=46,u0="Layer",p0={name:String};function os(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(c0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function ls(e){this.tokenize(e.name)}var hs={};N(hs,{generate:()=>ps,name:()=>h0,parse:()=>us,structure:()=>d0});var h0="LayerList",d0={children:[["Layer"]]};function us(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function ps(e){this.children(e,()=>this.token(18,","))}var ms={};N(ms,{generate:()=>fs,name:()=>f0,parse:()=>ds,structure:()=>m0});var f0="MediaQuery",m0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function ds(){let e=this.tokenStart,t=null,i=null,n=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let l=this.consume(1),p=l.toLowerCase();switch(p==="not"||p==="only"?(this.skipSC(),t=p,i=this.consume(1)):i=l,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),n=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{n=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:n}}function fs(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var xs={};N(xs,{generate:()=>bs,name:()=>g0,parse:()=>gs,structure:()=>b0});var g0="MediaQueryList",b0={children:[["MediaQuery"]]};function gs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function bs(e){this.children(e,()=>this.token(18,","))}var ks={};N(ks,{generate:()=>vs,name:()=>y0,parse:()=>ys,structure:()=>v0});var x0=38,y0="NestingSelector",v0={};function ys(){let e=this.tokenStart;return this.eatDelim(x0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function vs(){this.token(9,"&")}var Cs={};N(Cs,{generate:()=>ws,name:()=>k0,parse:()=>Ss,structure:()=>S0});var k0="Nth",S0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Ss(){this.skipSC();let e=this.tokenStart,t=e,i=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:i}}function ws(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Ts={};N(Ts,{generate:()=>As,name:()=>w0,parse:()=>Es,structure:()=>C0});var w0="Number",C0={value:String};function Es(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function As(e){this.token(10,e.value)}var Ls={};N(Ls,{generate:()=>Is,name:()=>E0,parse:()=>_s,structure:()=>A0});var E0="Operator",A0={value:String};function _s(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Is(e){this.tokenize(e.value)}var Ns={};N(Ns,{generate:()=>Ps,name:()=>T0,parse:()=>$s,structure:()=>_0});var T0="Parentheses",_0={children:[[]]};function $s(e,t){let i=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:n}}function Ps(e){this.token(21,"("),this.children(e),this.token(22,")")}var Os={};N(Os,{generate:()=>Fs,name:()=>I0,parse:()=>Rs,structure:()=>L0});var I0="Percentage",L0={value:String};function Rs(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Fs(e){this.token(11,e.value+"%")}var Vs={};N(Vs,{generate:()=>Ds,name:()=>$0,parse:()=>Ms,structure:()=>N0,walkContext:()=>P0});var $0="PseudoClassSelector",P0="function",N0={name:String,children:[["Raw"],null]};function Ms(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Ds(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Us={};N(Us,{generate:()=>js,name:()=>R0,parse:()=>Bs,structure:()=>O0,walkContext:()=>F0});var R0="PseudoElementSelector",F0="function",O0={name:String,children:[["Raw"],null]};function Bs(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function js(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Ws={};N(Ws,{generate:()=>zs,name:()=>M0,parse:()=>Hs,structure:()=>D0});var Gu=47;function qu(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var M0="Ratio",D0={left:["Number","Function"],right:["Number","Function",null]};function Hs(){let e=this.tokenStart,t=qu.call(this),i=null;return this.skipSC(),this.isDelim(Gu)&&(this.eatDelim(Gu),i=qu.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function zs(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var Ks={};N(Ks,{generate:()=>qs,name:()=>B0,parse:()=>Gs,structure:()=>j0});function V0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var B0="Raw",j0={value:String};function Gs(e,t){let i=this.getTokenStart(this.tokenIndex),n;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?n=V0.call(this):n=this.tokenStart,{type:"Raw",loc:this.getLocation(i,n),value:this.substring(i,n)}}function qs(e){this.tokenize(e.value)}var Zs={};N(Zs,{generate:()=>Qs,name:()=>H0,parse:()=>Ys,structure:()=>W0,walkContext:()=>z0});function Ku(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function U0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var H0="Rule",z0="rule",W0={prelude:["SelectorList","Raw"],block:["Block"]};function Ys(){let e=this.tokenIndex,t=this.tokenStart,i,n;return this.parseRulePrelude?i=this.parseWithFallback(U0,Ku):i=Ku.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:n}}function Qs(e){this.node(e.prelude),this.node(e.block)}var eo={};N(eo,{generate:()=>Xs,name:()=>G0,parse:()=>Js,structure:()=>q0});var G0="Scope",q0={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function Js(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function Xs(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var ro={};N(ro,{generate:()=>io,name:()=>K0,parse:()=>to,structure:()=>Y0});var K0="Selector",Y0={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function to(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function io(e){this.children(e)}var so={};N(so,{generate:()=>ao,name:()=>Q0,parse:()=>no,structure:()=>J0,walkContext:()=>Z0});var Q0="SelectorList",Z0="selector",J0={children:[["Selector","Raw"]]};function no(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function ao(e){this.children(e,()=>this.token(18,","))}var uo={};N(uo,{generate:()=>co,name:()=>eb,parse:()=>lo,structure:()=>tb});var oo=92,Yu=34,Qu=39;function Rr(e){let t=e.length,i=e.charCodeAt(0),n=i===Yu||i===Qu?1:0,l=n===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,p="";for(let d=n;d<=l;d++){let g=e.charCodeAt(d);if(g===oo){if(d===l){d!==t-1&&(p=e.substr(d+1));break}if(g=e.charCodeAt(++d),Ce(oo,g)){let x=d-1,b=lt(e,x);d=b-1,p+=Er(e.substring(x+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else p+=e[d]}return p}function Zu(e,t){let i=t?"'":'"',n=t?Qu:Yu,l="",p=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){l+="\uFFFD";continue}if(g<=31||g===127){l+="\\"+g.toString(16),p=!0;continue}g===n||g===oo?(l+="\\"+e.charAt(d),p=!1):(p&&(Je(g)||Xe(g))&&(l+=" "),l+=e.charAt(d),p=!1)}return i+l+i}var eb="String",tb={value:String};function lo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Rr(this.consume(5))}}function co(e){this.token(5,Zu(e.value))}var fo={};N(fo,{generate:()=>ho,name:()=>rb,parse:()=>po,structure:()=>ab,walkContext:()=>nb});var ib=33;function Ju(){return this.Raw(null,!1)}var rb="StyleSheet",nb="stylesheet",ab={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function po(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==ib){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,Ju);break;default:i=this.parseWithFallback(this.Rule,Ju)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function ho(e){this.children(e)}var bo={};N(bo,{generate:()=>go,name:()=>sb,parse:()=>mo,structure:()=>ob});var sb="SupportsDeclaration",ob={declaration:"Declaration"};function mo(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function go(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var ko={};N(ko,{generate:()=>vo,name:()=>cb,parse:()=>yo,structure:()=>ub});var lb=42,Xu=124;function xo(){this.tokenType!==1&&this.isDelim(lb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var cb="TypeSelector",ub={name:String};function yo(){let e=this.tokenStart;return this.isDelim(Xu)?(this.next(),xo.call(this)):(xo.call(this),this.isDelim(Xu)&&(this.next(),xo.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function vo(e){this.tokenize(e.name)}var Eo={};N(Eo,{generate:()=>Co,name:()=>db,parse:()=>wo,structure:()=>fb});var ep=43,tp=45,So=63;function wi(e,t){let i=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let l=this.charCodeAt(n);if(l===tp&&t&&i!==0)return wi.call(this,e+i+1,!1),-1;Je(l)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",n),++i>6&&this.error("Too many hex digits",n)}return this.next(),i}function Fr(e){let t=0;for(;this.isDelim(So);)++t>e&&this.error("Too many question marks"),this.next()}function pb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===ep?"Plus sign":"Hyphen minus")+" is expected")}function hb(){let e=0;switch(this.tokenType){case 10:if(e=wi.call(this,1,!0),this.isDelim(So)){Fr.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){pb.call(this,tp),wi.call(this,1,!1);break}break;case 12:e=wi.call(this,1,!0),e>0&&Fr.call(this,6-e);break;default:if(this.eatDelim(ep),this.tokenType===1){e=wi.call(this,0,!0),e>0&&Fr.call(this,6-e);break}if(this.isDelim(So)){this.next(),Fr.call(this,5);break}this.error("Hex digit or question mark is expected")}}var db="UnicodeRange",fb={value:String};function wo(){let e=this.tokenStart;return this.eatIdent("u"),hb.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Co(e){this.tokenize(e.value)}var Io={};N(Io,{generate:()=>_o,name:()=>vb,parse:()=>To,structure:()=>kb});var mb=32,Ao=92,gb=34,bb=39,xb=40,ip=41;function rp(e){let t=e.length,i=4,n=e.charCodeAt(t-1)===ip?t-2:t-1,l="";for(;i<n&&Xe(e.charCodeAt(i));)i++;for(;i<n&&Xe(e.charCodeAt(n));)n--;for(let p=i;p<=n;p++){let d=e.charCodeAt(p);if(d===Ao){if(p===n){p!==t-1&&(l=e.substr(p+1));break}if(d=e.charCodeAt(++p),Ce(Ao,d)){let g=p-1,x=lt(e,g);p=x-1,l+=Er(e.substring(g+1,x))}else d===13&&e.charCodeAt(p+1)===10&&p++}else l+=e[p]}return l}function np(e){let t="",i=!1;for(let n=0;n<e.length;n++){let l=e.charCodeAt(n);if(l===0){t+="\uFFFD";continue}if(l<=31||l===127){t+="\\"+l.toString(16),i=!0;continue}l===mb||l===Ao||l===gb||l===bb||l===xb||l===ip?(t+="\\"+e.charAt(n),i=!1):(i&&Je(l)&&(t+=" "),t+=e.charAt(n),i=!1)}return"url("+t+")"}var vb="Url",kb={value:String};function To(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=rp(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Rr(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function _o(e){this.token(7,np(e.value))}var Po={};N(Po,{generate:()=>$o,name:()=>Sb,parse:()=>Lo,structure:()=>wb});var Sb="Value",wb={children:[[]]};function Lo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function $o(e){this.children(e)}var Fo={};N(Fo,{generate:()=>Ro,name:()=>Eb,parse:()=>No,structure:()=>Ab});var Cb=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Eb="WhiteSpace",Ab={value:String};function No(){return this.eat(13),Cb}function Ro(e){this.token(13,e.value)}var ap={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Vn,atrule:Iu,pseudo:$u,node:Oo};var sp=cu(ap);var{hasOwnProperty:Mo}=Object.prototype,Ci=function(){};function op(e){return typeof e=="function"?e:Ci}function lp(e,t){return function(i,n,l){i.type===t&&e.call(this,i,n,l)}}function Tb(e,t){let i=t.structure,n=[];for(let l in i){if(Mo.call(i,l)===!1)continue;let p=i[l],d={name:l,type:!1,nullable:!1};Array.isArray(p)||(p=[p]);for(let g of p)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&n.push(d)}return n.length?{context:t.walkContext,fields:n}:null}function _b(e){let t={};for(let i in e.node)if(Mo.call(e.node,i)){let n=e.node[i];if(!n.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Tb(i,n)}return t}function cp(e,t){let i=e.fields.slice(),n=e.context,l=typeof n=="string";return t&&i.reverse(),function(p,d,g,x){let b;l&&(b=d[n],d[n]=p);for(let y of i){let v=p[y.name];if(!y.nullable||v){if(y.type==="list"){if(t?v.reduceRight(x,!1):v.reduce(x,!1))return!0}else if(g(v))return!0}}l&&(d[n]=b)}}function up({StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:l}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:l}}}function pp(e){let t=_b(e),i={},n={},l=Symbol("break-walk"),p=Symbol("skip-node");for(let b in t)Mo.call(t,b)&&t[b]!==null&&(i[b]=cp(t[b],!1),n[b]=cp(t[b],!0));let d=up(i),g=up(n),x=function(b,y){function v(Q,Ae,oe){let Te=C.call(Z,Q,Ae,oe);return Te===l?!0:Te===p?!1:!!(_.hasOwnProperty(Q.type)&&_[Q.type](Q,Z,v,G)||u.call(Z,Q,Ae,oe)===l)}let C=Ci,u=Ci,_=i,G=(Q,Ae,oe,Te)=>Q||v(Ae,oe,Te),Z={break:l,skip:p,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof y=="function")C=y;else if(y&&(C=op(y.enter),u=op(y.leave),y.reverse&&(_=n),y.visit)){if(d.hasOwnProperty(y.visit))_=y.reverse?g[y.visit]:d[y.visit];else if(!t.hasOwnProperty(y.visit))throw new Error("Bad value `"+y.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");C=lp(C,y.visit),u=lp(u,y.visit)}if(C===Ci&&u===Ci)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");v(b)};return x.break=l,x.skip=p,x.find=function(b,y){let v=null;return x(b,function(C,u,_){if(y.call(this,C,u,_))return v=C,l}),v},x.findLast=function(b,y){let v=null;return x(b,{reverse:!0,enter(C,u,_){if(y.call(this,C,u,_))return v=C,l}}),v},x.findAll=function(b,y){let v=[];return x(b,function(C,u,_){y.call(this,C,u,_)&&v.push(C)}),v},x}var Do={};N(Do,{AnPlusB:()=>Wn,Atrule:()=>Kn,AtrulePrelude:()=>Zn,AttributeSelector:()=>ta,Block:()=>na,Brackets:()=>oa,CDC:()=>ua,CDO:()=>da,ClassSelector:()=>ga,Combinator:()=>ya,Comment:()=>Sa,Condition:()=>Ea,Declaration:()=>_a,DeclarationList:()=>Pa,Dimension:()=>Fa,Feature:()=>Da,FeatureFunction:()=>ja,FeatureRange:()=>Wa,Function:()=>Ka,GeneralEnclosed:()=>Za,Hash:()=>es,IdSelector:()=>ss,Identifier:()=>rs,Layer:()=>cs,LayerList:()=>hs,MediaQuery:()=>ms,MediaQueryList:()=>xs,NestingSelector:()=>ks,Nth:()=>Cs,Number:()=>Ts,Operator:()=>Ls,Parentheses:()=>Ns,Percentage:()=>Os,PseudoClassSelector:()=>Vs,PseudoElementSelector:()=>Us,Ratio:()=>Ws,Raw:()=>Ks,Rule:()=>Zs,Scope:()=>eo,Selector:()=>ro,SelectorList:()=>so,String:()=>uo,StyleSheet:()=>fo,SupportsDeclaration:()=>bo,TypeSelector:()=>ko,UnicodeRange:()=>Eo,Url:()=>Io,Value:()=>Po,WhiteSpace:()=>Fo});var hp={node:Do};var dp=pp(hp);var Rp=yf(Pp(),1),Np=new Set(["Atrule","Selector","Declaration"]);function Fp(e){let t=new Rp.SourceMapGenerator,i={line:1,column:0},n={line:0,column:0},l={line:1,column:0},p={generated:l},d=1,g=0,x=!1,b=e.node;e.node=function(C){if(C.loc&&C.loc.start&&Np.has(C.type)){let u=C.loc.start.line,_=C.loc.start.column-1;(n.line!==u||n.column!==_)&&(n.line=u,n.column=_,i.line=d,i.column=g,x&&(x=!1,(i.line!==l.line||i.column!==l.column)&&t.addMapping(p)),x=!0,t.addMapping({source:C.loc.source,original:n,generated:i}))}b.call(this,C),x&&Np.has(C.type)&&(l.line=d,l.column=g)};let y=e.emit;e.emit=function(C,u,_){for(let G=0;G<C.length;G++)C.charCodeAt(G)===10?(d++,g=0):g++;y(C,u,_)};let v=e.result;return e.result=function(){return x&&t.addMapping(p),{css:v(),map:t}},e}var Vr={};N(Vr,{safe:()=>Go,spec:()=>Qb});var qb=43,Kb=45,Wo=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Op=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],Yb=Op.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Mp(e){let t=new Set(e.map(([i,n])=>Wo(i)<<16|Wo(n)));return function(i,n,l){let p=Wo(n,l),d=l.charCodeAt(0),g=d===Kb&&n!==1&&n!==2&&n!==15||d===qb?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|p);return p|g}}var Qb=Mp(Op),Go=Mp(Yb);var Zb=92;function Jb(e,t){if(typeof t=="function"){let i=null;e.children.forEach(n=>{i!==null&&t.call(this,i),this.node(n),i=n});return}e.children.forEach(this.node,this)}function Dp(e){let t=new Map;for(let[i,n]of Object.entries(e.node))typeof(n.generate||n)=="function"&&t.set(i,n.generate||n);return function(i,n){let l="",p=0,d={node(x){if(t.has(x.type))t.get(x.type).call(g,x);else throw new Error("Unknown node type: "+x.type)},tokenBefore:Go,token(x,b,y){p=this.tokenBefore(p,x,b),!y&&p&1&&this.emit(" ",13,!0),this.emit(b,x,!1),x===9&&b.charCodeAt(0)===Zb&&this.emit(`
`,13,!0)},emit(x){l+=x},result(){return l}};n&&(typeof n.decorator=="function"&&(d=n.decorator(d)),n.sourceMap&&(d=Fp(d)),n.mode in Vr&&(d.tokenBefore=Vr[n.mode]));let g={node:x=>d.node(x),children:Jb,token:(x,b)=>d.token(x,b),tokenize:x=>Ir(x,(b,y,v)=>{d.token(b,x.slice(y,v),y!==0)})};return d.node(i),d.result()}}var qo={};N(qo,{AnPlusB:()=>zn,Atrule:()=>qn,AtrulePrelude:()=>Qn,AttributeSelector:()=>ea,Block:()=>ra,Brackets:()=>sa,CDC:()=>ca,CDO:()=>ha,ClassSelector:()=>ma,Combinator:()=>xa,Comment:()=>ka,Condition:()=>Ca,Declaration:()=>Ta,DeclarationList:()=>$a,Dimension:()=>Ra,Feature:()=>Ma,FeatureFunction:()=>Ba,FeatureRange:()=>za,Function:()=>qa,GeneralEnclosed:()=>Qa,Hash:()=>Xa,IdSelector:()=>as,Identifier:()=>is,Layer:()=>ls,LayerList:()=>ps,MediaQuery:()=>fs,MediaQueryList:()=>bs,NestingSelector:()=>vs,Nth:()=>ws,Number:()=>As,Operator:()=>Is,Parentheses:()=>Ps,Percentage:()=>Fs,PseudoClassSelector:()=>Ds,PseudoElementSelector:()=>js,Ratio:()=>zs,Raw:()=>qs,Rule:()=>Qs,Scope:()=>Xs,Selector:()=>io,SelectorList:()=>ao,String:()=>co,StyleSheet:()=>ho,SupportsDeclaration:()=>go,TypeSelector:()=>vo,UnicodeRange:()=>Co,Url:()=>_o,Value:()=>$o,WhiteSpace:()=>Ro});var Vp={node:qo};var Ko=Dp(Vp);var Ti="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),Xb=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),jp=new Set(["__proto__","prototype","constructor"]);function Br(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(n=>Br(n,t)):i&&typeof i=="object"&&Br(i,t)}}function Xt(e){return e?e.computed?e.property?.value:e.property?.name:""}function ei(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!ei(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=ei(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(ei);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let n=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||jp.has(String(n)))throw new Error("Property static tidak aman");t[n]=ei(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function Bp(e,t){let i=null;return Br(e,n=>{if(i)return;let l=n.type==="VariableDeclarator"&&n.id.name===t,p=n.type==="AssignmentExpression"&&n.left.type==="MemberExpression"&&["window","globalThis"].includes(n.left.object.name)&&Xt(n.left)===t;if(l||p)try{i=ei(l?n.init:n.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function ex(e){let t=new WeakMap,i=(l,p,d=null)=>{l&&(l.type==="Identifier"?p.bindings.set(l.name,d):l.type==="RestElement"?i(l.argument,p):l.type==="AssignmentPattern"?i(l.left,p):l.type==="ArrayPattern"?l.elements.forEach(g=>i(g,p)):l.type==="ObjectPattern"&&l.properties.forEach(g=>i(g.value||g.argument,p)))},n=(l,p)=>{if(!l||typeof l!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(l.type);l.type==="FunctionDeclaration"&&i(l.id,p);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(l.type),x=g?{parent:p,bindings:new Map,functionScope:null}:p;g&&(x.functionScope=d||l.type==="Program"?x:p.functionScope),t.set(l,x),d&&(l.id&&i(l.id,x),l.params.forEach(b=>i(b,x))),l.type==="CatchClause"&&i(l.param,x),l.type==="VariableDeclaration"&&l.declarations.forEach(b=>i(b.id,l.kind==="var"?x.functionScope:x,b.init));for(let b of Object.values(l))Array.isArray(b)?b.forEach(y=>n(y,x)):b&&typeof b=="object"&&n(b,x)};return n(e,null),t}function tx(e){let t=[],i=ex(e),n=(g,x=new Set)=>{if(g?.type!=="Identifier"||x.has(g))return g;x.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return n(b.bindings.get(g.name),x);return g},l=g=>(g=n(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&Xt(g)==="document"),p=g=>(g=n(g),g?.type==="MemberExpression"?l(g.object)&&Xt(g)==="body":g?.type==="CallExpression"&&l(g.callee.object)&&Xt(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=n(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||Xt(g.callee)==="MutationObserver"));return Br(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||Xt(g.callee)!=="observe"||!d(g.callee.object)||!p(g.arguments[0]))return;let x;try{x=ei(n(g.arguments[1]))}catch{}let b=x?.attributes??(x?.attributeFilter!==void 0||x?.attributeOldValue!==void 0);(!x||b&&(!Array.isArray(x.attributeFilter)||x.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function Up(e){let t=[...e.children],i=t.slice(t.findLastIndex(n=>n.type==="Combinator")+1);return i.some(n=>n.type==="PseudoElementSelector")?[]:i.flatMap(n=>n.type==="TypeSelector"&&["html","body"].includes(n.name.toLowerCase())?[n.name.toLowerCase()]:n.type==="PseudoClassSelector"&&n.name==="root"?["html"]:n.type==="PseudoClassSelector"&&["is","where"].includes(n.name)&&n.children?[...n.children].flatMap(l=>l.type==="SelectorList"?[...l.children].flatMap(Up):[]):[])}function ix(e){let t=[],i;try{i=sp(e)}catch(p){return["CSS tidak terbaca: "+p.message]}let n=[!0],l={html:{},body:{}};return dp(i,{enter(p){if(p.type==="Atrule"){p.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=p.prelude?Ko(p.prelude):"",x=p.name.toLowerCase()==="media"&&g.split(",").every(b=>{let y=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||y&&Number(y[1])>960});n.push(n.at(-1)&&!x)}if(p.type!=="Rule"||!n.at(-1))return;let d=new Set(p.prelude?.type==="SelectorList"?[...p.prelude.children].flatMap(Up):[]);p.block.children.forEach(g=>{if(g.type!=="Declaration")return;let x=Ko(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(x)&&(l[b].overflow=!0),g.property==="height"&&x==="100dvh"&&(l[b].height=!0)})},leave(p){p.type==="Atrule"&&n.pop()}}),Object.values(l).some(p=>p.height&&p.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function Yo({doc:e,scripts:t=[],css:i="",config:n,schema:l,requireObjects:p=!0}){let d=[],g=[];for(let C of t)try{let u=Qc(C,{ecmaVersion:"latest",sourceType:"script"});g.push(u),d.push(...tx(u))}catch(u){d.push("Sintaks JavaScript gagal kompilasi: "+u.message)}n??(n=g.map(C=>Bp(C,"CONFIG")).find(Boolean)),l??(l=g.map(C=>Bp(C,"SVE_SCHEMA")).find(Boolean)),p&&!n&&d.push("CONFIG static tidak terbaca"),p&&!l&&d.push("SVE_SCHEMA static tidak terbaca");let x=l?.template?.type==="custom-page";if(l){Array.isArray(l.sections)||d.push("SVE_SCHEMA.sections wajib array");let C=Array.isArray(l.sections)?l.sections:[],u=C.map(_=>_?.id);new Set(u).size!==u.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),x||(Ti.forEach(_=>{u.includes(_)||d.push("Canonical section hilang: "+_)}),u.forEach(_=>{Ti.includes(_)||d.push("Section bukan canonical: "+_)}));for(let _ of C){if(_?.fields!==void 0&&!Array.isArray(_.fields)){d.push("Section fields wajib array");continue}for(let G of _?.fields||[])if(Xb.has(G?.type||"text")||d.push("Field type tidak didukung: "+G?.type),!!["repeater","repeater-image"].includes(G?.type)){if(!Array.isArray(G.fields)){d.push("Repeater tanpa fields[]");continue}for(let Z of G.fields)(!Z?.key||jp.has(Z.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(Z?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(n&&!x){let C=n.sectionOrder;(!Array.isArray(C)||C.length!==Ti.length||!Ti.every(u=>C.includes(u))||C[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let y=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(y)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(y)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(y)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let v=["html","body"].map(C=>`${C}{${e?.querySelector(C)?.getAttribute("style")||""}}`).join("");d.push(...ix(i+v));for(let C of e?.querySelectorAll("audio")||[])C.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let C of e?.querySelectorAll("iframe")||[]){let u="";try{u=new URL(C.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(u)&&C.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:n,schema:l}}var rx="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-primary-bg sve-button-primary-text sve-button-secondary-bg sve-button-secondary-text".split(" "),nx=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function ax(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(n=>n[1]));return i.size?[...rx,...nx].filter(n=>i.has(n)&&!new RegExp(`var\\(\\s*--${n}\\s*[,)]`).test(t)).map(n=>`Token ${n} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function Hp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),n=t(i),l=[...n.querySelectorAll("style")],p=[...n.querySelectorAll("script")],d=Yo({doc:n,css:l.map(x=>x.textContent).join(`
`),scripts:p.map(x=>x.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),n.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!n.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!n.body)&&g.push("Elemen body wajib ada"),n.head?.querySelector("title")||g.push("Title wajib ada di head"),n.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(l.length!==1||!n.head?.contains(l[0]))&&g.push("Wajib tepat satu style di head"),(p.length!==1||!n.body?.contains(p[0]))&&g.push("Wajib tepat satu script di body"),p[0]&&p[0]!==n.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),p.some(x=>x.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let x=new Set([...n.querySelectorAll("[data-section-id]")].map(b=>b.getAttribute("data-section-id")));Ti.forEach(b=>{x.has(b)||g.push("Markup section hilang: "+b)})}return g.push(...ax(d.html??i)),{...d,blockers:[...new Set(g)],html:i}}function zp({document:e,window:t,getConfig:i,syncImages:n,metrics:l}){let p=null,d=null,g=!1,x=null,b=null;function y(){return p?.isConnected||(p=[...e.querySelectorAll("iframe")].find(C=>{try{return typeof C.contentWindow?.SVE_REFRESH=="function"||!!C.contentDocument?.querySelector("[data-sve-template]")}catch{return!1}})||null),p}function v(){d!==null&&t.cancelAnimationFrame(d),d=null;let C=y(),u;try{u=C?.contentWindow||(typeof t.SVE_REFRESH=="function"?t:null)}catch{}let _=i();if(u&&_){let G=JSON.stringify(_);if(G!==x||u!==b||g)try{let Z=JSON.parse(G);u.CONFIG=Z,u.SVE_REFRESH?.(Z),x=G,b=u,l.previewRefreshCount=(l.previewRefreshCount||0)+1}catch(Z){console.warn("[SVE] Preview refresh gagal",Z)}}if(g){try{C?.contentDocument&&n(C.contentDocument)}catch{}g=!1}}return{request({images:C=!1,force:u=!1}={}){g||(g=C),u&&(x=null,b=null),d===null&&(d=t.requestAnimationFrame(v))},document(){try{return y()?.contentDocument||null}catch{return null}},invalidate(){p=null,x=null,b=null},flush:v}}(function(){"use strict";let e="sve77",t="0.28.0",n=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),l="https://nikahin.myscalev.com/home#paket",p="6282175274118",d="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",x=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let v=(r,a=document)=>a.querySelector(r),C=(r,a=document)=>Array.from(a.querySelectorAll(r)),u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let _=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-primary-bg","#332a24"],["Button Primary","Text","--sve-button-primary-text","#ffffff"],["Button Secondary","Background","--sve-button-secondary-bg","#ffffff"],["Button Secondary","Text","--sve-button-secondary-text","#332a24"]],G=Array.from({length:31},(r,a)=>12+a*2+"px"),Z=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],Q=["100","200","300","400","500","600","700","800","900"],Ae=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],oe=Ae.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),Te=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],_i=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),jr=new Set(["__proto__","prototype","constructor"]),Wp=12,Gp=240,qp=1e4;function xt(r){let a=String(r||"").trim();if(!a||a.length>Gp||a.includes("..")||a.startsWith(".")||a.endsWith("."))return null;let s=a.split(".");if(!s.length||s.length>Wp)return null;for(let o of s){if(!o||jr.has(o))return null;if(/^\d+$/.test(o)){let c=Number(o);if(!Number.isSafeInteger(c)||c<0||c>qp)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let Ii=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,Qo=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,Kp=4096;function Ur(r){return Ii.lastIndex=0,Ii.test(String(r||""))}function Yp(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;Ii.lastIndex=0;let h=0,f=0,k;for(;k=Ii.exec(c);){h+=1;let S=k.index+k[0].length,w=S;for(;w<c.length&&/[A-Za-z0-9+/=]/.test(c[w]);)w+=1;f+=w-S}h&&a.push({where:s,count:h,approxKb:Math.max(1,Math.round(f*.75/1024))})}),a}function Qp(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let c=String(o||"");if(!c)return;Qo.lastIndex=0;let h=0,f=0,k;for(;k=Qo.exec(c);){let S=k[0].length;S<=Kp||Ur(k[0])||(h+=1,f=Math.max(f,S))}h&&a.push({where:s,count:h,approxKb:Math.max(1,Math.round(f/1024))})}),a}function Zo(r){return r.map(a=>a.where+" ("+a.count+"x, \xB1"+a.approxKb+" KB)").join(", ")}let Hr=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Zp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},Jo=["auto","cover","contain"];function Jp(r){return r==="fill"?"cover":r==="fit"?"contain":Jo.includes(r)?r:"auto"}function Xo(r=""){return`
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
    `}function el(r){return`
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
    `}function Xp(){return`
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
    `}function E(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ti(r,a=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),a)}}function Lt(r,a=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:a}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function tl(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function rt(r){return!!(r&&r.isConnected)}function $t(){let r=u.nativeCache;Object.keys(r).forEach(a=>{r[a]&&!rt(r[a])&&(r[a]=null)})}function Ne(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Pt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,a=>a.toUpperCase()).trim()}function sx(){}function D(r,a){if(r==null||!a)return;let s=xt(a);if(!s)return;let o=r;for(let c of s){if(o==null)return;let h=/^\d+$/.test(c)?Number(c):c;if(!Object.prototype.hasOwnProperty.call(o,h))return;o=o[h]}return o}function pe(r,a,s){let o=xt(a);if(!r||!o)return!1;let c=r;for(let k=0;k<o.length-1;k++){let S=o[k],w=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(c,w)||c[w]===null||c[w]===void 0)&&(c[w]=/^\d+$/.test(o[k+1])?[]:Object.create(null)),typeof c[w]!="object")return!1;c=c[w]}let h=o.at(-1),f=/^\d+$/.test(h)?Number(h):h;return c[f]=s,!0}function yt(r){let a=String(r||"").trim();if(!a)return"";try{/^https?:\/\//i.test(a)&&(a=new URL(a).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{a=decodeURIComponent(a)}catch{}return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function zr(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function eh(){let r=C('input[type="text"], input:not([type])').filter(a=>zr(a));return r.length?r.find(a=>String(a.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function th(){let r=C("a[href]").filter(a=>!a.closest("#"+e));for(let a of r){let s=a,o="";for(let c=0;c<4&&s;c+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let c=new URL(a.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(c.hostname)&&!/scalev\.(?:com|id)$/i.test(c.hostname))continue;let h=c.pathname.split("/").filter(Boolean),f=yt(h.at(-1)||"");if(f)return f}catch{}}return""}function vt(){let r=eh(),a=yt(r?.value);if(a)return u.scalevSlug=a,a;let s=th();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function Wr(r,a){let s=String(a||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),c=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&c.endsWith("weddingid")||/wedding\s*id/.test(o)}function ih(){let r=new Set;try{ye().forEach(a=>{(a.fields||[]).forEach(s=>{s.type!=="repeater"&&Wr(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&D(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&D(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function Gr(r){C('[data-auto-wedding-id="1"]').forEach(a=>{a.value!==r&&(a.value=r),a.setAttribute("readonly","")})}function ii(r,a={}){let s=yt(r||vt());if(!s)return!1;u.scalevSlug=s;let o=ih();if(!u.config||!o.length)return u.pendingWeddingIdSlug=s,Gr(s),!1;let c=!1;if(o.forEach(f=>{D(u.config,f)!==s&&(pe(u.config,f,s),c=!0)}),Gr(s),!c)return u.pendingWeddingIdSlug="",!1;let h=Yr().length>0;return a.commit!==!1&&h&&u.configRange?.editor?(u.pendingWeddingIdSlug="",fe(a.silent?void 0:"Wedding ID mengikuti Slug URL"),Gr(s),!0):(u.pendingWeddingIdSlug=s,!0)}function il(){let r=yt(u.pendingWeddingIdSlug||u.scalevSlug||vt());return r?ii(r,{commit:!0,silent:!0}):!1}let rh=ti(()=>{let r=vt();r&&ii(r,{commit:!0})},450);function Li(){if($t(),rt(u.nativeCache.save)||rt(u.nativeCache.publish))return{save:rt(u.nativeCache.save)?u.nativeCache.save:null,publish:rt(u.nativeCache.publish)?u.nativeCache.publish:null};let r=C("button").filter(c=>!c.closest("#"+e)),a=c=>(c.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(c=>{let h=a(c);return h==="simpan"||h==="save"})||null,o=r.find(c=>{let h=a(c);return h.includes("simpan & terbitkan")||h.includes("simpan dan terbitkan")||h==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=o,{save:s,publish:o}}function nh(r,a){if(!r)return a?.parentElement||null;if(!a)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=a;o;){if(s.has(o))return o;o=o.parentElement}return null}function rl(r,a){if($t(),rt(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&a&&r.parentElement===a.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=nh(r,a);if(!s)return r?.parentElement||a?.parentElement||null;let o=s;for(let c=0;c<4&&o;c++,o=o.parentElement){let h=o.getBoundingClientRect?.();if(h&&h.top>=0&&h.top<180&&h.height<110)return u.nativeCache.toolbarHost=o,o}return u.nativeCache.toolbarHost=s,s}function qr(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let a=!!u.open;r.style.setProperty("display",a?"none":"",a?"important":""),r.setAttribute("aria-hidden",a?"true":"false"),r.tabIndex=a?-1:0}function nl(){let{save:r,publish:a}=Li(),s=a||r;if(!s)return!1;let o=rl(r,a);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let c=document.getElementById(e+"-toolbar-toggle");return c||(c=s.cloneNode(!1),c.id=e+"-toolbar-toggle",c.type="button",c.disabled=!1,c.removeAttribute("disabled"),c.setAttribute("aria-controls",e+"-dock"),c.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),c.setAttribute("aria-pressed","false"),c.textContent="Visual Editor",c.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),u.open?hh():Nt(!0)})),c.parentElement!==o&&(a&&a.parentElement===o?a.insertAdjacentElement("afterend",c):r&&r.parentElement===o?r.insertAdjacentElement("afterend",c):o.appendChild(c)),c.classList.toggle("sve-toolbar-active",u.open),c.setAttribute("aria-pressed",u.open?"true":"false"),qr(),u.open&&requestAnimationFrame(()=>ol(!0)),!0}function Kr(){let a=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return a||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function ah(){if($t(),rt(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=C("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),c=s.getBoundingClientRect(),h=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&c.top>=-2&&c.top<=4&&c.height>=36&&c.height<=64&&c.width>=window.innerWidth*.7&&h.includes("landing page studio")});if(!r.length)return null;let a=r.sort((s,o)=>{let c=s.getBoundingClientRect(),h=o.getBoundingClientRect();return c.height-h.height||c.top-h.top})[0];return u.nativeCache.globalHeader=a||null,a||null}function $i(){let r=ah(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function sh(){if($t(),rt(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:a}=Li(),s=a||r;if(!s)return Kr();let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let f=o.getBoundingClientRect();f.top>=36&&f.top<=130&&f.width>=window.innerWidth*.68&&f.height>=window.innerHeight*.62&&(c=o)}o=o.parentElement}let h=c||Kr();return u.nativeCache.workspaceRoot=h||null,h}function oh(){let a=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return a>0?a:Math.min(400,window.innerWidth*.32)}function al(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function Pi(r){let a=document.querySelector('[data-sve77-page-root="1"]'),s=sh();if(a&&a!==s&&al(a),s)if(r){let o=getComputedStyle(s),c=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",c?"positioned":"flow")}else al(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>ol(r))}function lh(){if($t(),rt(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:a}=Li(),s=a||r;if(!s)return null;let o=s,c=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let h=getComputedStyle(o),f=o.getBoundingClientRect();if(h.position==="fixed"&&f.top>=36&&f.top<=70&&f.height>=48&&f.height<=92&&f.width>=Math.min(520,window.innerWidth*.42)){c=o;break}}o=o.parentElement}return u.nativeCache.topToolbar=c||null,c}function sl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function ol(r){let{save:a,publish:s}=Li(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||rl(a,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let c=document.querySelector('[data-sve77-top-toolbar="1"]'),h=lh();if(c&&c!==h&&sl(c),!h)return;if(!r){sl(h);return}let f=Math.ceil(oh());h.setAttribute("data-sve77-top-toolbar","1"),h.style.setProperty("right",f+"px","important"),h.style.setProperty("box-sizing","border-box","important"),h.style.setProperty("transition","right .16s ease","important")}function ll(){Lt(()=>{if(u.open)try{let r=vt();r&&ii(r,{commit:!0,silent:!0}),il()}catch{}},1200)}function cl(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=_e())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{re()}catch{}ll()}function ch(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{$i(),Pi(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),cl(),performance.mark("sve-panel-paint-end"),ph()}})})}function uh(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){cl();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&_e(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&re()}catch{}performance.mark("sve-prewarm-end"),ll()}function ph(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(a=>String(a.name).startsWith("sve-")).map(a=>({name:a.name,startTime:Math.round(a.startTime*100)/100}))}catch{}}function Ni(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=Lt(uh,1200))}function Nt(r){if(!r&&!me())return;u.open=!!r;let a=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(a?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),qr(),u.open){u.prewarmScheduled&&(tl(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),ch();return}requestAnimationFrame(()=>{try{Pi(!1)}catch{}}),Ni()}function hh(){Nt(!1)}function Yr(){return[...new Set(C(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Ri(){let r=Yr();if(u.allEditors=r,!r.length)return!1;let a={html:null,css:null,js:null,head:null};return C("label").forEach(s=>{let o=s.querySelector(".CodeMirror")?.CodeMirror;if(!o)return;let c=(s.querySelector(":scope > span")?.textContent||s.querySelector("span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();c==="body html"?a.html=o:c==="css"?a.css=o:c==="javascript"?a.js=o:c.includes("additional head")&&(a.head=o)}),r.forEach(s=>{let o=s.getValue?.()||"";!a.js&&(o.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(o))&&(a.js=s),!a.html&&(o.includes("data-sve-section")||/<section[\s>]/i.test(o))&&(a.html=s),!a.css&&(o.includes("--sve-background-primary")||o.includes("--sve-font-heading"))&&(a.css=s)}),a.html=a.html||r[0]||null,a.css=a.css||r[1]||null,a.js=a.js||r[2]||null,a.head=a.head||r[3]||null,u.editors=a,Oh(),!0}function V(r){return u.editors[r]?.getValue?.()||""}function Qr(r,a=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(!s)return;s.dispatchEvent(new Event("input",{bubbles:!0})),a&&s.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function dh(r,a,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(a),r.save?.()}),Qr(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}ji(),kl()}}function nt(r,a){dh(u.editors[r],a)}function fh(){return new URL(n.endpoint)}function mh(r,a=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!a&&s.origin!==fh().origin?"":s.href}catch{return""}}function gh(r){if(!r||typeof r!="object")return null;let a=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(a)||!s?null:{id:a,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:mh(r.source_url||r.sourceUrl)}}function bh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(gh).filter(Boolean)}async function xh(r,a={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),n.timeoutMs);try{return await fetch(r,{...a,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function yh(r,a={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=a.method||"GET";return new Promise((o,c)=>{GM_xmlhttpRequest({method:s,url:r,data:a.body,headers:a.headers||{},timeout:n.timeoutMs,onload:h=>{let f=Number(h.status),k=Number.isInteger(f)&&f>=200&&f<=599?f:200,S=String(h.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),w=String(h.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(h.responseText||"",{status:k,statusText:S,headers:{"Content-Type":w}}))},ontimeout:()=>c(new DOMException("The operation timed out","AbortError")),onerror:()=>c(new TypeError("Userscript request failed"))})})}async function Zr(r,a={}){if(typeof GM_xmlhttpRequest=="function")try{return await yh(r,a)}catch{}return await xh(r,a)}async function ul(r=!1){let a=u.templateLibrary;if(!r&&a.status==="ready"&&a.loadedAt&&Date.now()-a.loadedAt<3e5)return a.templates;a.status="loading",a.error="";try{let s=await Zr(n.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let c=bh(o);if(!c.length)throw new Error("Library belum memiliki template aktif");return a.templates=c,a.loadedAt=Date.now(),a.status="ready",c}catch(s){return a.templates=[],a.status="error",a.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),a.templates}}function vh(){return C('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let a=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="kode"||a==="code"||a.includes("kode html")})||null}async function kh(){if(Ri()&&u.editors.html)return!0;vh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(a=>window.setTimeout(a,120)),Ri()&&u.editors.html)return!0;return!1}function Sh(r){return Hp(r,a=>new DOMParser().parseFromString(a,"text/html"))}function ox(r,a){let s=String(a||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let c=pl(r,r.indexOf("{",o.index));if(!c)return null;try{return hl(c.text)}catch{return null}}function wh(){let r=C('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,c="";for(let h=0;h<5&&o;h+=1,o=o.parentElement)c+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(c)})[0]||r[0]||null}function Ch(r){let a=wh();if(!a)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),a.files=s.files,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}))}function Rt(r){let a=["style","audio","compatibility"],s=r||"content",o=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let c=document.getElementById(e);if(C(".tab",c).forEach(h=>{h.classList.toggle("active",h.dataset.tab===r)}),o){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}re()}async function Eh(r,a,s){if(!me())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=u.templateLibrary,c=Sh(await r.text());if(c.blockers.length)throw console.error("[SVE] Template library validation failed",c.blockers),new Error(c.blockers[0]);if(!await kh())throw new Error("Buka tab Kode terlebih dahulu");let h={html:V("html"),css:V("css"),js:V("js"),head:V("head")};Ch(r);let f=Date.now(),k=!1;for(;Date.now()-f<4500;){await new Promise(I=>window.setTimeout(I,140)),Ri();let S=V("html"),w=V("js");if(S!==h.html||w!==h.js){k=!0;break}}if(!k)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=h,o.importedId=a||"local-import",o.importedName=s||r.name||"Template lokal",_e(),je(),Rt("content")}async function Ah(r){let a=u.templateLibrary,s=a.templates.find(c=>c.id===r),o=c=>{a.previousSource=null,a.importedId="",a.importedName="",a.status="error",a.error=c,u.uiPrepared=!1,re()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}a.status="loading",a.error="",u.uiPrepared=!1,re();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let c=await Zr(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",c.status),!c.ok)throw new Error("HTTP "+c.status);let h=await c.text();console.log("[SVE] Source length:",h.length);let f=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",k=new File([h],f,{type:"text/html"});await Eh(k,s.id,s.name),a.error="",a.status="ready",Rt("content")}catch(c){console.error("[SVE] Import gagal:",c),o("Import gagal: "+String(c?.message||"source tidak terbaca"))}}function lx(){let r=u.templateLibrary.previousSource;r&&me()&&(nt("html",r.html),nt("css",r.css),nt("js",r.js),nt("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",_e(),je(),Rt("library"))}function Th(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(a=>{nt(a,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,_e(),je(),u.uiPrepared=!1,re()}function pl(r,a){let s=0,o=null,c=!1,h=!1,f=!1;for(let k=a;k<r.length;k++){let S=r[k],w=r[k+1];if(h){S===`
`&&(h=!1);continue}if(f){S==="*"&&w==="/"&&(f=!1,k++);continue}if(o){if(c){c=!1;continue}if(S==="\\"){c=!0;continue}S===o&&(o=null);continue}if(S==="/"&&w==="/"){h=!0,k++;continue}if(S==="/"&&w==="*"){f=!0,k++;continue}if(S==='"'||S==="'"||S==="`"){o=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:a,end:k+1,text:r.slice(a,k+1)}}return null}function hl(r){let a=0,s=A=>{throw new Error(A+" @"+a)};function o(){for(;a<r.length;){let A=r[a],P=r[a+1];if(/\s/.test(A)){a++;continue}if(A==="/"&&P==="/"){for(a+=2;a<r.length&&r[a]!==`
`;)a++;continue}if(A==="/"&&P==="*"){for(a+=2;a<r.length&&!(r[a]==="*"&&r[a+1]==="/");)a++;a+=2;continue}break}}function c(){let A=r[a++],P="";for(;a<r.length;){let B=r[a++];if(B===A)return P;if(B!=="\\"){P+=B;continue}let K=r[a++],Ye={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};P+=Object.prototype.hasOwnProperty.call(Ye,K)?Ye[K]:K}s("String belum ditutup")}function h(){o();let A=a;for(/[A-Za-z_$]/.test(r[a]||"")||s("Identifier invalid"),a++;a<r.length&&/[A-Za-z0-9_$]/.test(r[a]);)a++;return r.slice(A,a)}function f(){let A=r.slice(a).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return A||s("Number invalid"),a+=A[0].length,Number(A[0])}function k(){let A=[];if(a++,o(),r[a]==="]")return a++,A;for(;a<r.length;)if(A.push(w()),o(),r[a]==="]"||(r[a]!==","&&s("Koma array hilang"),a++,o(),r[a]==="]"))return a++,A;s("Array belum selesai")}function S(){let A=Object.create(null);if(a++,o(),r[a]==="}")return a++,A;for(;a<r.length;){o();let P=['"',"'","`"].includes(r[a])?c():h();if(o(),jr.has(P)&&s("Object key terlarang: "+P),Object.prototype.hasOwnProperty.call(A,P)&&s("Duplicate object key: "+P),r[a]!==":"&&s("Titik dua hilang"),a++,A[P]=w(),o(),r[a]==="}"||(r[a]!==","&&s("Koma object hilang"),a++,o(),r[a]==="}"))return a++,A}s("Object belum selesai")}function w(){o();let A=r[a];if(A==="{")return S();if(A==="[")return k();if(['"',"'","`"].includes(A))return c();if(A==="-"||/\d/.test(A||""))return f();let P=h();if(P==="true")return!0;if(P==="false")return!1;if(P==="null")return null;P==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+P)}let I=w();return o(),I}function Jr(r){let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+a+"|(?:window|globalThis)\\."+a+")\\s*=\\s*\\{"),o=[];function c(h,f){!h||o.some(k=>k.editor===h)||o.push({editor:h,kind:f})}c(u.editors.js,"js"),c(u.editors.html,"html"),c(u.editors.head,"head"),u.allEditors.forEach(h=>c(h,"unknown"));for(let h of o){let f=h.editor.getValue?.()||"",k=s.exec(f);if(!k)continue;let S=f.indexOf("{",k.index),w=pl(f,S);if(w)try{return{kind:h.kind,editor:h.editor,obj:hl(w.text),start:w.start,end:w.end}}catch(I){console.error("[SVE] parse "+r+" gagal",I)}}return null}function _h(){if(!u.doc)return null;let r=[];return C("[data-sve-section]",u.doc).forEach((a,s)=>{let o=[],c=new Set;C("[data-sve-field]",a).forEach(f=>{let k=f.getAttribute("data-sve-field");!k||c.has(k)||(c.add(k),o.push({type:f.getAttribute("data-sve-type")||"text",label:f.getAttribute("data-sve-label")||Pt(k),path:k}))});let h=a.getAttribute("data-sve-countdown-path");h&&!c.has(h)&&o.push({type:"datetime",label:"Waktu Tujuan",path:h}),r.push({id:a.id||"section-"+s,label:a.getAttribute("data-sve-section")||Pt(a.id)||"Section "+(s+1),visiblePath:a.getAttribute("data-sve-visible-path")||null,canHide:!!a.getAttribute("data-sve-visible-path"),reorderable:(a.getAttribute("data-section-id")||a.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Fi(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=_h(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function ye(){let r=Fi();return Array.isArray(r?.sections)?r.sections:[]}function J(r){return String(r?.id||"").trim()}function Ft(r){let a=J(r);return!(!a||a==="cover"||r?.locked===!0||r?.reorderable===!1)}function Oi(){let a=ye().map(J).filter(Boolean);if(!a.length)return[];let s=new Set(a),o=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(h=>String(h||"").trim()).filter(h=>h&&s.has(h)):[],c=[];return s.has("cover")&&c.push("cover"),o.forEach(h=>{h!=="cover"&&!c.includes(h)&&c.push(h)}),a.forEach(h=>{c.includes(h)||c.push(h)}),c}function ri(){let r=ye(),a=new Map(r.map(s=>[J(s),s]));return Oi().map(s=>a.get(s)).filter(Boolean)}function Mi(r,a){let s=String(r||"").trim(),o=ye().find(k=>J(k)===s);if(!o||!Ft(o))return!1;let c=Oi(),h=c.indexOf(s);if(h<0)return!1;let f=h+a;for(;f>=0&&f<c.length;){let k=c[f],S=ye().find(w=>J(w)===k);if(k!=="cover"&&!S?.locked)return!0;f+=a}return!1}function dl(r){if(!u.config)return!1;let a=ye(),s=new Set(a.map(J).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(c=>String(c||"").trim()).filter(c=>c&&s.has(c)&&c!=="cover").forEach(c=>{o.includes(c)||o.push(c)}),a.map(J).filter(Boolean).forEach(c=>{o.includes(c)||o.push(c)}),u.config.sectionOrder=o,!0}function Ih(r=document){C("[data-section-card]",r).forEach(a=>{let s=a.dataset.sectionCard,o=v("[data-section-up]",a),c=v("[data-section-down]",a);o&&(o.disabled=!Mi(s,-1)),c&&(c.disabled=!Mi(s,1))})}function Lh(r,a){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",a==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function fl(r,a,s){let o=v("#"+e+"-body");if(!o)return;let c=v(".reset-zone",o),h=new Map(C("[data-section-card]",o).map(f=>[f.dataset.sectionCard,f]));r.forEach(f=>{let k=h.get(f);k&&(c?o.insertBefore(k,c):o.appendChild(k))}),Ih(o),Lh(h.get(a),s)}function ml(r,a){let s=String(r||"").trim(),o=ye().find(S=>J(S)===s);if(!o||!Ft(o))return;let c=Oi(),h=c.indexOf(s);if(h<0)return;let f=h+a;for(;f>=0&&f<c.length;){let S=c[f],w=ye().find(I=>J(I)===S);if(S!=="cover"&&!w?.locked)break;f+=a}if(f<0||f>=c.length||c[f]==="cover")return;let[k]=c.splice(h,1);c.splice(f,0,k),dl(c),fe("Urutan section diperbarui"),fl(c,s,a<0?"up":"down")}function $h(r,a,s){let o=String(r||"").trim(),c=String(a||"").trim();if(!o||!c||o===c)return;let h=ye(),f=h.find(K=>J(K)===o),k=h.find(K=>J(K)===c);if(!f||!k||!Ft(f))return;let S=s==="after"?"after":"before";if(c==="cover")S="after";else if(!Ft(k))return;let w=Oi(),I=w.indexOf(o);if(I<0)return;w.splice(I,1);let A=w.indexOf(c);if(A<0)return;let P=A+(S==="after"?1:0);w[0]==="cover"&&(P=Math.max(1,P)),P=Math.min(w.length,P),w.splice(P,0,o);let B=w.indexOf(o);dl(w),fe("Urutan section diperbarui"),fl(w,o,B<I?"up":"down")}function gl(){let r=Fi();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function _e(){if(u.contentStateDirty&&!me())return!1;if(u.lastSerializedConfig="",!Ri())return u.sourceDirty=!0,!1;Lt(()=>{try{ld()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(V("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let a=Jr("CONFIG");u.config=a?.obj||null,u.configRange=a||null,u.configSourceText=a?a.editor.getValue().slice(a.start,a.end):"",u.configOwnerSource=a?a.editor.getValue():"";let s=Jr("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(tl(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Nh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function fe(r){return Vi(r,{deferPreview:!0,syncImages:!0})?(_e(),!0):!1}function Di(r){return Vi(r,{deferPreview:!0,syncImages:!0})}function Vi(r,a={}){if(!u.config||!u.configRange?.editor)return!1;let s=Ud(u.config);if(s.length)return Bi(s[0]),!1;let c=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:Jr("CONFIG");if(!c||c.editor!==u.configRange.editor)return Bi("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let h=c.editor,f=h.getValue();if(f.slice(c.start,c.end)!==u.configSourceText)return Bi("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let k=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(k===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null;try{u.internalEditorWrite+=1,h.operation(()=>{if(typeof h.replaceRange=="function"&&typeof h.posFromIndex=="function")h.replaceRange(k,h.posFromIndex(c.start),h.posFromIndex(c.end));else{let w=h.getValue?.()||"",I=w.slice(0,c.start)+k+w.slice(c.end);h.setValue(I)}h.save?.()}),Qr(h,!1)}catch(w){S=w}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{h.getValue()!==f&&h.setValue(f),Qr(h,!1)}catch{}finally{u.internalEditorWrite-=1}return Bi("Perubahan belum tersimpan: "+S.message),!1}return c.end=c.start+k.length,c.obj=u.config,u.configRange=c,u.configSourceText=k,u.configOwnerSource=h.getValue(),u.lastSerializedConfig=k,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),ji(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Rh(),a.deferPreview?zh({syncImages:!!a.syncImages}):je({syncImages:!!a.syncImages}),!0}function Bi(r){u.commitError=r,u.contentStateDirty=!0;let a=document.getElementById(e+"-commit-notice");a&&(a.hidden=!1,a.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function ji(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,V(r)]))}function bl(){return e+":fresh-default:"+location.origin+location.pathname}function Xr(){let r=["html",V("html"),"css",V("css"),"js",V("js"),"head",V("head")].join("\u241E"),a=2166136261;for(let s=0;s<r.length;s++)a^=r.charCodeAt(s),a=Math.imul(a,16777619);return(a>>>0).toString(16).padStart(8,"0")}function Ph(){let r={};return _.forEach(([,,a])=>{let s=ve(a);s&&(r[a]=s)}),oe.forEach(a=>{r[a.variable]=ve(a.variable)||a.fallback}),{version:t,config:u.config?Ne(u.config):null,cssTokens:r,googleFonts:Ne(D(u.config,"editorStyle.googleFonts")||{})}}function xl(){try{let r=JSON.parse(localStorage.getItem(bl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function yl(r){try{localStorage.setItem(bl(),JSON.stringify(r))}catch{}}function vl(){if(!u.config)return!1;let r=Xr(),a=Ph();return u.defaults=a,u.defaultConfig=Ne(a.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,ji(),yl({version:t,defaults:a,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Nh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,o])=>V(s)===o))return;let r=Xr(),a=xl();if(a?.defaults&&a.lastManagedFingerprint===r){u.defaults=a.defaults,u.defaultConfig=Ne(a.defaults.config||u.config),u.baselineFingerprint=a.baselineFingerprint||r,u.lastManagedFingerprint=r,ji();return}vl()}function kl(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,o])=>V(s)===o))return;let r=Xr(),a=xl()||{};u.lastManagedFingerprint=r,yl({version:t,defaults:a.defaults||u.defaults,baselineFingerprint:a.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Rh=ti(kl,700);function Fh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{_e(),vl(),u.open?re():Ni()}catch{}},420)}function Oh(){u.allEditors.forEach(r=>{!r||u.editorChangeBound.has(r)||typeof r.on!="function"||(u.editorChangeBound.add(r),r.on("change",()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Fh())}))})}function cx(r){u.defaultConfig&&(pe(u.config,r,Ne(D(u.defaultConfig,r))),fe("Berhasil direset"),re())}let Mh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",Dh="https://nikahin.myscalev.com/dashboard",Sl="nikahin_team_key";function Vh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(Sl,"")||"").trim()}catch{return""}}function Bh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(Sl,String(r||"").trim()),!0)}catch{return!1}}let jh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function en(){return yt(u.scalevSlug||vt())||""}async function tn(r){let a=u.dashboardPin;if(a.busy)return;let s=en();if(!s){a.status="error",a.message="Slug URL belum diisi di Pengaturan Scalev.",kt();return}let o=Vh();if(!o){a.status="needkey",a.message="",kt();return}if(!(r==="generate"&&a.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){a.busy=!0,a.status="loading",a.message="",kt();try{let h=await(await Zr(Mh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!h||h.ok!==!0?(a.status="error",a.pin="",a.message=jh[h&&h.error]||"Gagal mengambil PIN."):(a.status="ready",a.slug=s,a.pin=String(h.pin||""),a.version=Number(h.version)||0,a.message=h.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{a.status="error",a.pin="",a.message="Tidak bisa menghubungi server."}a.busy=!1,kt()}}function Uh(){let r=v("#"+e+"-team-key"),a=r?r.value.trim():"",s=u.dashboardPin;if(!a){s.message="Kunci tim belum diisi.",kt();return}if(!Bh(a)){s.message="Tampermonkey menolak menyimpan kunci.",kt();return}s.status="idle",s.message="",tn("peek")}async function Hh(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}kt()}}function kt(){let r=document.activeElement?.id,a=v("#"+e+"-pin-panel");a&&(a.innerHTML=wl());let s=v("#"+e+"-pin-pill");s&&(s.outerHTML=Fl()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function wl(){let r=u.dashboardPin,a=en(),s=f=>f?`<small class="auto-wedding-id-note">${E(f)}</small>`:"";if(!a)return`
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
      `;let o=r.status==="ready"&&r.pin&&r.slug===a,c=r.busy||r.status==="loading",h=o?`
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
            href="${Dh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard \u2197
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function Cl(){if(!u.defaults)return;u.defaults.config&&(u.config=Ne(u.defaults.config),fe()),Object.entries(u.defaults.cssTokens||{}).forEach(([a,s])=>{s&&Ue(a,s)});let r=u.defaults.googleFonts||{};u.config&&D(u.config,"editorStyle.googleFonts")!==void 0&&(pe(u.config,"editorStyle.googleFonts",Ne(r)),fe(),Zi()),_e(),re(),je()}function zh({syncImages:r=!1,delay:a=100}={}){je({syncImages:r})}let Ui=zp({document,window,getConfig:()=>u.config,syncImages:cd,metrics:u.performance});function je({syncImages:r=!1,force:a=!1}={}){Ui.request({images:r,force:a})}function Wh(r){if(!r)return"";let a=new Date(r);if(Number.isNaN(a.getTime()))return"";let s=o=>String(o).padStart(2,"0");return a.getFullYear()+"-"+s(a.getMonth()+1)+"-"+s(a.getDate())+"T"+s(a.getHours())+":"+s(a.getMinutes())}function Gh(r){if(!r)return"";let a=new Date(r),s=h=>String(h).padStart(2,"0"),o=-a.getTimezoneOffset(),c=o>=0?"+":"-";return r+":00"+c+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function ve(r,a){let s=a?[a]:[nn()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let h of s){let f=c.exec(h||"");if(f)return f[1].trim()}return""}function rn(r,a){let s=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function nn(){let r=[],a=V("css");return a&&r.push(a),[V("html"),V("head")].forEach(s=>{let o=String(s||""),c=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,h;for(;h=c.exec(o);)h[1]&&r.push(h[1])}),r.join(`
`)}function qh(r,a,s){let o=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),c=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(c,"$1"+s+"$3")}function Kh(r,a){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,a),o.body?.style?.setProperty(r,a),o.querySelector("[data-sve-template]")?.style?.setProperty(r,a)}catch{}};C("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function Ue(r,a){let s=["css","head","html"],o=null;for(let f of s)if(rn(V(f),r)){o=f;break}if(!o)return!1;let c=V(o),h=qh(c,r,a);return h===c?!1:(nt(o,h),Kh(r,a),je(),!0)}function Hi(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function ke(r){let a=String(r?.type||"text").trim().toLowerCase();return a==="datetime-local"?"datetime":a==="checkbox"?"boolean":a}function Yh(r,a){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||Wr(r,a)}function El(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return Ne(r.default);let a=ke(r);return a==="boolean"?!1:""}function Qh(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function Zh(r){let a=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&a.push(`${s}="${E(r[s])}"`)}),r?.placeholder&&a.push(`placeholder="${E(r.placeholder)}"`),a.join(" ")}function Jh(r){let a=String(r?.help||r?.description||"").trim();return a?`
        <small class="field-help">
          ${E(a)}
        </small>
      `:""}function Xh(r,a){let s=D(u.config,a),o=ke(r),c=Wr(r,a),h=Yh(r,a),f=c?vt()||s||"":s??"",k=`data-field-path="${E(a)}" data-field-type="${E(o)}" aria-label="${E(r?.label||a)}" `+(h?'data-field-readonly="1" ':""),S=Zh(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${k}
          ${S}
          ${h?'readonly aria-readonly="true"':""}
        >${E(f)}</textarea>
        ${c?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let I=Qh(r);return`
        <select
          class="content-control content-control-select"
          ${k}
          ${h?'disabled aria-disabled="true"':""}
        >
          ${r?.placeholder?`
                <option
                  value=""
                  ${String(f??"")===""?"selected":""}
                >
                  ${E(r.placeholder)}
                </option>
              `:""}

          ${I.map(A=>`
              <option
                value="${E(A.value)}"
                ${String(f??"")===A.value?"selected":""}
              >
                ${E(A.label)}
              </option>
            `).join("")}
        </select>
      `}if(o==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${k}
            ${f===!0?"checked":""}
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
          value="${E(Wh(f))}"
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
            value="${E(f)}"
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
        value="${E(f)}"
        ${h?'readonly aria-readonly="true"':""}
      >
      ${c?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Al(r,a){let s=a||r.path,o=E(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${Xh(r,s)}

        ${Jh(r)}
      </div>
    `}function ni(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let a=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(a))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function Tl(r){if(!r||typeof r!="object")return[];let a=u.repeaterContentFieldCache.get(r);if(a)return a;let s=(r?.fields||[]).filter(o=>!ni(o)&&ke(o)!=="repeater"&&ke(o)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function _l(r){if(Il(r,D(u.config,r.path)))return El(r.fields[0]);let a={};return(r.fields||[]).forEach(s=>{s?.key&&(a[s.key]=El(s))}),a}function Il(r,a){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(a)&&a.length?a:D(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function ed(r,a,s){let o=String(r?.itemLabelKey||"").trim(),h=[o?a?.[o]:"",a?.title,a?.name,a?.label,a?.event,a?.provider].find(f=>String(f??"").trim());return String(h??"").trim()||(r.label||"Item")+" "+(s+1)}function td(r){return(r?.fields||[]).some(s=>ke(s)==="repeater"||ke(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function id(r){let a=D(u.config,r.path),s=Array.isArray(a)?a:[],o=Number.isFinite(r.max)?r.max:999;return td(r)+s.map((c,h)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${E(ed(r,c,h))}
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

            ${Tl(r).map(f=>Al({...f,type:f.type||"text"},Il(r,s)?r.path+"."+h:r.path+"."+h+"."+f.key)).join("")}
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
          `:"")}function Ot(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function rd(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function zi(r){if(!r||typeof r!="object")return[];let a=u.contentFieldCache.get(r);if(a)return a;let s=(r.fields||[]).filter(o=>!(ni(o)||o.type==="repeater"&&Tl(o).length===0));return u.contentFieldCache.set(r,s),s}function nd(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return ri().forEach(a=>{let s=J(a),o="";try{o=JSON.stringify(a).toLowerCase()}catch{o=[s,a?.label||"",...zi(a).flatMap(h=>[h?.label||"",h?.path||"",...(h?.fields||[]).flatMap(f=>[f?.label||"",f?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),u.contentSearchIndex=r,r}function Wi(r){r&&u.contentSectionHtmlCache.delete(String(r))}function Gi(r){let a=J(r);if(!a)return Ll(r);if(u.contentSectionHtmlCache.has(a))return u.contentSectionHtmlCache.get(a);let s=Ll(r);return u.contentSectionHtmlCache.set(a,s),s}function Mt(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function an(r){if(!r)return;let a=C("[data-section-card]",r).filter(o=>v("[data-section-body]",o)?.dataset.loaded==="1"),s=a.length-u.contentMaxMountedSections;s<=0||a.filter(o=>!o.classList.contains("open")).sort((o,c)=>Number(o.dataset.contentUse||0)-Number(c.dataset.contentUse||0)).slice(0,s).forEach(o=>{let c=v("[data-section-body]",o);c&&(c.replaceChildren(),c.dataset.loaded="0")})}function ad(){if(u.contentPrewarmScheduled||!u.config||!Fi())return;let r=ri();if(!r.length)return;u.contentPrewarmScheduled=!0;let a=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let o=2;for(;u.contentPrewarmCursor<r.length&&o>0;){let c=r[u.contentPrewarmCursor++],h=J(c);if(h&&!u.contentSectionHtmlCache.has(h)&&Gi(c),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=Lt(a,1200))};u.contentPrewarmHandle=Lt(a,1200)}function Ll(r){let a=zi(r),s=[],o="",c=h=>{let f=String(h||"").trim();return!f||f===o?"":(o=f,`
        <div class="sv-category" data-sv-category="${E(f)}">
          ${E(f)}
        </div>
      `)};return a.forEach(h=>{let f=String(h.category||"").trim();if(f||(o=""),h.type==="repeater"){let k=f?"":`
            <div class="group-title">
              ${E(h.label||"Daftar")}
            </div>
          `;s.push(c(f)+`
            <div class="group">
              ${k}
              <div class="group-body">
                ${id(h)}
              </div>
            </div>
          `);return}s.push(c(f)+`
          <div class="group">
            <div class="group-title">
              ${E(h.label||h.path)}
            </div>

            <div class="group-body">
              ${Al({...h,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),s.join("")}function $l(r){return ri().find(a=>J(a)===r)||null}function sd(r){if(!r)return;let a=v("[data-section-body]",r);if(!a||a.dataset.loaded==="1")return;let s=$l(r.dataset.sectionCard);s&&(a.innerHTML=Gi(s),a.dataset.loaded="1",Mt(r),an(r.closest("#"+e+"-body")))}function Pl(r){if(!r)return;let a=r.closest("#"+e+"-body");a&&(C("[data-section-card].open",a).forEach(s=>{s!==r&&(s.classList.remove("open"),v(".chev",s)?.setAttribute("aria-expanded","false"),Mt(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),v(".chev",r)?.setAttribute("aria-expanded","true"),sd(r),Mt(r),an(a))}function Nl(r){if(!r)return;let a=v("[data-section-body]",r),s=$l(r.dataset.sectionCard);!a||!s||(Wi(r.dataset.sectionCard),a.innerHTML=Gi(s),a.dataset.loaded="1",Mt(r))}function Rl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let a=u.contentCommitMessage;u.contentCommitMessage="",Vi(a||void 0,{validate:!1,deferPreview:!0})},100)}function me(r=""){let a=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!a&&!r?!0:Vi(s||void 0,{validate:!0,deferPreview:!0})}function Fl(){let r=u.dashboardPin,a=en(),s=r.status==="ready"&&r.pin&&r.slug===a,o="Belum diambil",c="idle";return a?r.busy||r.status==="loading"?(o="Memuat\u2026",c="loading"):r.status==="needkey"?(o="Perlu kunci",c="warn"):r.status==="error"?(o="Gagal",c="error"):s&&(o="Aktif",c="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${c}">${o}</span>`}function Ol(){if(!u.config)return Ot();if(!Fi())return rd();let r=ri(),a=nd(),s=r.filter(o=>u.search?(a.get(J(o))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${Fl()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${wl()}</div>
      </div>

      ${s.map(o=>{let c=J(o),h=o.label||c,f=Ft(o),k=!o.visiblePath||D(u.config,o.visiblePath)!==!1,S=zi(o),w=!u.search&&u.contentOpenSections.has(c);return`
            <article
              class="section ${f?"section-sortable":"section-pinned"}${w?" open":""}"
              data-section-card="${E(c)}"
            >
              <div
                class="section-head"
                title="${f?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${E(h)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${E(c)}"
                    draggable="${f?"true":"false"}"
                    ${f?"":"disabled"}
                    aria-label="Drag ${E(h)}"
                    title="${f?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${Xp()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${E(c)}"
                    ${Mi(c,-1)?"":"disabled"}
                    aria-label="Naikkan ${E(h)}"
                    title="Naik"
                  >
                    ${el("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${E(c)}"
                    ${Mi(c,1)?"":"disabled"}
                    aria-label="Turunkan ${E(h)}"
                    title="Turun"
                  >
                    ${el("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${E(h)}
                  </strong>

                  <small>
                    ${f?"Drag / \u2191\u2193 \xB7 ":"Pinned \xB7 "}
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
                  ${Xo("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${E(c)}"
                data-loaded="${w?"1":"0"}"
              >
                ${w?Gi(o):""}
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
    `}function sn(){return ye().flatMap(r=>r.fields||[]).filter(r=>ke(r)==="repeater-image"&&r?.path)}function Ml(){return sn()[0]||null}function Dl(r){let a=String(r||"").trim();return a&&sn().find(s=>String(s.path||"").trim()===a)||null}function qi(r){let a=Array.isArray(r?.fields)?r.fields:[];return a.find(s=>s?.key&&ni(s))||a.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Vl(r){let a=String(r||"").trim();if(!a)return null;for(let s of sn()){let o=String(s.path||"").trim(),c=o+".";if(!o||!a.startsWith(c))continue;let h=a.slice(c.length).split(".");if(h.length!==2)continue;let f=Number(h[0]);if(!Number.isInteger(f)||f<0)continue;let k=qi(s),S=String(k?.key||"src");if(h[1]===S)return{field:s,imageField:k,imageKey:S,rootPath:o,index:f}}return null}function Bl(r){return u.doc?!!C('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function Ki(){let r=[],a=new Set;return ye().forEach(s=>{(s.fields||[]).forEach(o=>{if(ni(o)&&o.type!=="repeater-image"&&o.path&&!a.has(o.path)&&(r.push({label:o.label||Pt(o.path),path:o.path,gallery:!1,wrapped:Bl(o.path)}),a.add(o.path)),o.type==="repeater"&&o.path){let c=D(u.config,o.path),h=(o.fields||[]).filter(f=>ni(f)&&f.key);Array.isArray(c)&&h.length&&c.forEach((f,k)=>{h.forEach(S=>{let w=o.path+"."+k+"."+S.key;a.has(w)||(r.push({label:(s.label||o.label||Pt(o.path))+" "+(k+1)+" \xB7 "+(S.label||Pt(S.key)),path:w,gallery:!1,wrapped:Bl(w)}),a.add(w))})})}if(ke(o)==="repeater-image"&&o.path){let c=D(u.config,o.path),h=qi(o),f=String(h?.key||"src");Array.isArray(c)&&c.forEach((k,S)=>{let w=o.path+"."+S+"."+f;a.has(w)||(r.push({label:(o.label||"Foto Gallery")+" "+(S+1),path:w,gallery:!0,index:S,rootPath:o.path,imageKey:f,wrapped:!0}),a.add(w))})}})}),u.doc&&C('[data-sve-type="image"][data-sve-field]',u.doc).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o||a.has(o))return;let c=Vl(o),h=!!c;r.push({label:s.getAttribute("data-sve-label")||Pt(o),path:o,gallery:h,index:c?c.index:null,rootPath:c?c.rootPath:null,imageKey:c?c.imageKey:null,wrapped:!!s.closest("[data-sve-image-wrapper]")}),a.add(o)}),r}function on(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function Dt(r){let a=u.config?.imageSettings,s=a&&typeof a=="object"?a[r]:null,o=Vl(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:Jp(s?.fit),alignPos:Hr.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function Vt(r,a){let s=on();s[r]={...Dt(r),...a}}function od(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let a=new Set(Ki().map(s=>s.path));Object.keys(r).forEach(s=>{a.has(s)||delete r[s]})}function ld(){let r=V("css");if(!r)return;let a=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return a!==r.trim()?(nt("css",a),!0):!1}function cd(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let c=Dt(o),h=s.closest("[data-sve-image-wrapper]"),f=h||s,k=c.align==="left"?"0":"auto",S=c.align==="right"?"0":"auto";h?(h.style.display=c.hidden?"none":"",h.style.width=c.width+"%",h.style.maxWidth="100%",h.style.marginLeft=k,h.style.marginRight=S,s.style.width="100%"):(s.style.display=c.hidden?"none":"",s.style.width=c.width+"%",s.style.maxWidth="100%",s.style.marginLeft=k,s.style.marginRight=S),c.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=c.fit;let w=Zp[c.alignPos]||"";w?s.style.objectPosition=w:s.style.removeProperty("object-position"),s.style.height="100%"})}function ux(){Ui.request({images:!0})}function ud(r){let a={"top left":`
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
    `}function pd(r){let a=Dt(r.path),s=c=>c==="left"?`
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
              ${Hr.filter(c=>c!=="default").map(c=>`
            <button
              type="button"
              class="advance-pos-btn ${a.alignPos===c?"active":""}"
              data-image-alignpos-path="${E(r.path)}"
              data-image-alignpos="${E(c)}"
              title="${E(c)}"
              aria-label="${E("Posisi "+c)}"
            >
              ${ud(c)}
            </button>
          `).join("")}
            </div>

            <button
              type="button"
              class="advance-pos-default ${a.alignPos==="default"?"active":""}"
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
                value="${a.width}"
                data-image-width-path="${E(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${a.width}"
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
                class="advance-fit-btn ${a.fit==="auto"?"active":""}"
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
                class="advance-fit-btn ${a.fit==="cover"?"active":""}"
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
                class="advance-fit-btn ${a.fit==="contain"?"active":""}"
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

        </div>
      </details>
    `}function hd(){return`
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
    `}function dd(){return`
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
    `}function jl(){return`
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
    `}function fd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${jl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function md(){return`
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
    `}function Ul(r){return r?`
      <div class="gallery-add-wrap">
        <button
          type="button"
          class="gallery-add-button"
          data-gallery-add="${E(r.path)}"
        >
          + Tambah Foto
        </button>
      </div>
    `:""}function gd(r,a){let s=D(u.config,r);if(!Array.isArray(s)||a<0||a>=s.length)return;let o=Dl(r),c=qi(o),h=String(c?.key||"src"),f=on(),k={};for(let S=0;S<s.length;S++){let w=r+"."+S+"."+h;Object.prototype.hasOwnProperty.call(f,w)&&(k[S]=Ne(f[w]))}s.splice(a,1),Object.keys(f).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+h)&&delete f[S]});for(let S=0;S<s.length;S++){let w=S<a?S:S+1,I=k[w];I&&(f[r+"."+S+"."+h]=I)}od(),fe("Foto gallery dihapus"),re()}function bd(r){u.config&&(pe(u.config,r,""),Vt(r,{hidden:!0}),fe("Gambar dihapus"),re())}function xd(){if(!u.config||!u.defaultConfig)return;let r=Ml();r&&pe(u.config,r.path,Ne(D(u.defaultConfig,r.path)||[])),Ki().filter(a=>!a.gallery).forEach(a=>{pe(u.config,a.path,Ne(D(u.defaultConfig,a.path))??"")}),u.config.imageSettings=Ne(u.defaultConfig.imageSettings||{}),fe(),re()}function yd(){if(!u.config)return Ot();let r=Ki().filter(f=>u.search?(f.label+" "+f.path).toLowerCase().includes(u.search):!0),a=Ml(),s=a?r.filter(f=>f.gallery&&f.rootPath===a.path):[],o=s.length?s[s.length-1].path:"",c=r.map(f=>{let k=D(u.config,f.path)||"",S=Dt(f.path),I=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!f.gallery?`data-gallery-delete-index="${E(f.rootPath)}" data-gallery-index="${Number(f.index)}"`:`data-image-delete-path="${E(f.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${dd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${E(f.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${md()}
              </button>
            </div>
          `,A=`
            <div
              class="group image-card ${S.hidden?"image-card-hidden":""}"
              data-image-card-path="${E(f.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${k?`
                        <img
                          class="preview"
                          src="${E(k)}"
                          alt=""
                        >
                      `:fd(f.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${E(f.label)}">
                    ${E(f.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${E(f.path)}">
                    CONFIG.${E(f.path)}
                  </p>
                </div>

                ${I}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${E(f.path)}"
                  value="${E(k)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${E(f.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${E(f.path)}"
                  title="Paste URL"
                  aria-label="Paste URL ${E(f.label)} dari clipboard"
                >
                  ${hd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${pd(f)}
            </div>
          `;return a&&f.path===o?A+Ul(a):A}).join(""),h=a&&!s.length&&!u.search?Ul(a):"";return c+h+`
        <div class="image-global-reset">
          <button
            type="button"
            class="button danger full"
            id="${e}-reset-images"
          >
            Reset
          </button>
        </div>
      `}function ai(r,a){let s=r?.closest(".image-card");if(!s)return;let o=v(".image-preview-shell",s);if(!o)return;let c=r.value.trim(),h=Dt(a),f=v(".preview",o);if(c){if(!f||f.tagName!=="IMG"){let k=document.createElement("img");k.className="preview",k.alt="",f?f.replaceWith(k):o.prepend(k),f=k}f.src=c}else{if(!f||f.tagName!=="BUTTON"||!f.classList.contains("image-upload-placeholder")){let k=document.createElement("button");k.type="button",k.className="preview empty image-upload-placeholder",k.dataset.imageFocus=a,k.setAttribute("aria-label","Masukkan URL gambar"),f?f.replaceWith(k):o.prepend(k),f=k}f.innerHTML=`
        <span class="image-upload-icon">
          ${jl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,f.onclick=()=>{r.focus(),r.select?.()}}f.style.width="100%",f.style.height="100%",f.style.maxWidth="none",f.style.aspectRatio="auto",f.style.objectFit="cover",f.style.marginLeft="0",f.style.marginRight="0",s.classList.toggle("image-card-hidden",h.hidden)}function Yi(r,a){let s=Dt(a);C(`[data-image-align-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlign===s.align)}),C(`[data-image-fit-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageFit===s.fit)}),C(`[data-image-alignpos-path="${CSS.escape(a)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlignpos===s.alignPos)});let o=v(`[data-image-width-path="${CSS.escape(a)}"]`,r),c=v(`[data-image-width-number="${CSS.escape(a)}"]`,r);o&&(o.value=s.width),c&&(c.value=s.width)}function vd(r){let a=String(r||"").trim();if(!a||/^var\(/i.test(a))return!1;try{return CSS.supports("color",a)}catch{return/^#[0-9a-f]{3,8}$/i.test(a)}}function si(r,a="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let c=o[1];return c.length===3&&(c=c.split("").map(h=>h+h).join("")),"#"+c.slice(0,6).toLowerCase()}try{let c=document.createElement("span");if(c.style.color=s,!c.style.color)return a;c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c);let h=getComputedStyle(c).color;c.remove();let f=h.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!f)return a;let k=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+k(f[1])+k(f[2])+k(f[3])}catch{return a}}function kd(){return _.some(([,,r])=>!!ve(r))}function Sd(r,a){let s=ve(a);if(!s)return`
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
              ${E(a)}
            </small>
          </div>
        </div>
      `;let o=si(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${E(a)}"
          value="${E(o)}"
          aria-label="${E(r)}"
        >

        <div>
          <label>
            ${E(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${E(a)}"
            value="${E(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${E(a)}
          </small>
        </div>
      </div>
    `}function wd(){return u.config?kd()?["Background","Body Teks","Button Primary","Button Secondary"].map(a=>`
            <div class="group">
              <div class="group-title">
                ${a}
              </div>

              ${_.filter(s=>s[0]===a).map(([,s,o])=>Sd(s,o)).join("")}
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
      `:Ot()}let Cd={"playwrite brasil guides":"Playwrite BR Guides"};function ln(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function cn(r){let a="";try{a=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{a=String(r||"").replace(/\+/g," ")}return ln(a.split(":")[0].replace(/\s+/g," "))}function oi(r){let a=ln(r);return a?Cd[a.toLowerCase()]||a:""}function Ed(r){let a=String(r||"").trim();if(!a)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(a))try{let o=new URL(a),c=o.hostname.toLowerCase();if(c==="fonts.google.com"||c==="www.fonts.google.com"){let h=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(h?.[1])return{family:oi(cn(h[1])),isUrl:!0,valid:!0};let f=o.searchParams.get("family");return f?{family:oi(cn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(c==="fonts.googleapis.com"){let f=o.searchParams.getAll("family")[0]||"";return f?{family:oi(cn(f)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=a.split(",")[0];return{family:oi(ln(s)),isUrl:!1,valid:!0}}function Ad(r,a=""){let s=oi(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),c=String(a||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(c?":wght@"+encodeURIComponent(c):"")+"&display=swap"}function un(r,a=""){let s=Ad(r,a);return s?new Promise(o=>{let c=e+"-font-validation-link";document.getElementById(c)?.remove();let h=document.createElement("link"),f=!1,k=w=>{f||(f=!0,clearTimeout(S),h.onload=null,h.onerror=null,o(w))},S=setTimeout(()=>{k({ok:!1,reason:"timeout"})},7e3);h.id=c,h.rel="stylesheet",h.href=s,h.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let w=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!w||w.length===0){k({ok:!1,reason:"font-file"});return}}k({ok:!0,reason:"ok",url:s})}catch{k({ok:!1,reason:"font-file"})}},h.onerror=()=>{k({ok:!1,reason:"stylesheet"})},document.head.appendChild(h)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Td(r,a){let o=Qi(a,ve(a==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),c=await un(r,o);return c.ok?{...c,weight:o}:o!=="400"&&(c=await un(r,"400"),c.ok)?{...c,weight:"400",normalizedWeight:!0}:(c=await un(r,""),c.ok?{...c,weight:"400",normalizedWeight:o!=="400"}:{...c,weight:o})}function pn(r,a){if(r)try{let s=e+"-preview-font-link",o=r.getElementById(s);if(!a){o?.remove();return}o||(o=r.createElement("link"),o.id=s,o.rel="stylesheet",(r.head||r.documentElement)?.appendChild(o)),o.getAttribute("href")!==a&&o.setAttribute("href",a)}catch{}}function Hl(){let r=Gl();C("iframe").forEach(a=>{try{pn(a.contentDocument,r)}catch{}}),requestAnimationFrame(()=>{C("iframe").forEach(a=>{try{pn(a.contentDocument,r)}catch{}})})}function zl(r){return String(D(u.config,"editorStyle.googleFonts."+r)||"").trim()}function Wl(r){let a=zl(r);if(a)return a;let o=ve(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function _d(r,a){return a==="heading"?"serif":"sans-serif"}function Id(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Ld(r,a){return Q.includes(String(a))}function $d(r){return Q}function Qi(r,a){let s=String(a||"").trim();return Q.includes(s)?s:"400"}function Pd(r,a=!1){let s=v("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",c=v(`[data-style-var="${CSS.escape(o)}"]`,s);if(!c)return;let h=ve(o)||"400",f=Qi(r,h);a&&f!==h&&Ue(o,f),c.innerHTML=Xi(f,Q,!1),c.value=f}function Gl(){let r=new Map;["heading","body"].forEach(s=>{let o=zl(s);if(!o)return;let c=o.trim().toLowerCase();if(!c)return;r.has(c)||r.set(c,{family:o,weights:new Set});let f=Qi(s,ve(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(c).weights.add(f)});let a=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),c=Array.from(s.weights).sort((h,f)=>Number(h)-Number(f));return"family="+o+":wght@"+c.join(";")});return a.length?"https://fonts.googleapis.com/css2?"+a.join("&")+"&display=swap":""}function Zi(){let r=Gl(),a="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r){if(u.editors.head){let f=V("head");o.test(f)&&nt("head",f.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),C("iframe").forEach(f=>{try{pn(f.contentDocument,"")}catch{}});return}let c=`${a}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${r}">
${s}`;if(u.editors.head){let f=V("head");f=o.test(f)?f.replace(o,c):f.trimEnd()+`

`+c+`
`,nt("head",f)}let h=document.getElementById(e+"-font-link");h||(h=document.createElement("link"),h.id=e+"-font-link",h.rel="stylesheet",document.head.appendChild(h)),h.href=r,Hl()}async function Ji(r){let a=v("#"+e+"-"+r+"-font");if(!a)return;let s=Ed(a.value);if(!s.valid||!s.family)return;let o=s.family;a.value=o;let c=await Td(o,r);if(!c.ok){c.reason==="stylesheet"||c.reason==="font-file"||c.reason;return}let h=r==="heading"?"--sve-font-heading":"--sve-font-body",f=r==="heading"?"--sve-heading-weight":"--sve-body-weight";c.normalizedWeight&&c.weight&&Ue(f,c.weight),pe(u.config,"editorStyle.googleFonts."+r,o),fe(),Ue(h,`"${o}", ${_d(o,r)}`),Pd(r,!1),Zi(),Hl(),je()}function Xi(r,a,s=!0,o=!1){let c=String(r||"").trim(),h=s&&c&&!a.includes(c)?[c,...a]:[...a];return o&&(h=[...new Set(h)].sort((f,k)=>{let S=Number.parseFloat(f),w=Number.parseFloat(k);return Number.isFinite(S)&&Number.isFinite(w)?S-w:String(f).localeCompare(String(k))})),h.map((f,k)=>{let S=a.includes(c)||s?f===c:k===0;return`
            <option
              value="${E(f)}"
              ${S?"selected":""}
            >
              ${E(f)}
            </option>
          `}).join("")}function Nd(r){let a=ve(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Xi(a,G,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Xi(a,Z,!1)}
        </select>
      `;if(r.type==="weight"){let s=Id(r.variable),o=s?$d(s):Q,c=s?Qi(s,a):a;return`
        <select
          class="style-select"
          data-style-var="${E(r.variable)}"
        >
          ${Xi(c,o,!1)}
        </select>
      `}return""}function Rd(){if(!u.config)return;let r=u.defaultConfig||{},a=D(r,"editorStyle.googleFonts.heading"),s=D(r,"editorStyle.googleFonts.body");typeof a=="string"&&pe(u.config,"editorStyle.googleFonts.heading",a),typeof s=="string"&&pe(u.config,"editorStyle.googleFonts.body",s),oe.forEach(o=>{let c=Hi(o.variable)||o.fallback;Ue(o.variable,c)}),fe(),Zi(),re()}function Fd(){return u.config?`
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
            value="${E(Wl("heading"))}"
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
            value="${E(Wl("body"))}"
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

          ${Xo("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${Ae.map(r=>{let a=oe.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${E(r.label)}</div>
                  <div class="typography-control-grid">
                    ${a.map(s=>`
                      <div class="typography-control">
                        <label>${E(s.label)}</label>
                        ${Nd(s)}
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
    `:Ot()}function er(r){let a=String(r||"").trim().toLowerCase();if(!a)return 0;if(/^\d+$/.test(a))return Math.max(0,Number(a));let s=a.split(":").map(f=>Number(f));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(a.match(/(\d+)h/)?.[1]||0),c=Number(a.match(/(\d+)m/)?.[1]||0),h=Number(a.match(/(\d+)s/)?.[1]||0);return o||c||h?Math.max(0,o*3600+c*60+h):0}function ql(r){let a=String(r||"").trim();if(!a)return 0;try{let s=new URL(a,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let c of o){let h=er(c);if(h>0)return h}}catch{let o=a.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return er(o?.[1]||"")}return 0}function hn(r){let a=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(a/3600),o=Math.floor(a%3600/60),c=a%60,h=f=>String(f).padStart(2,"0");return s>0?s+":"+h(o)+":"+h(c):o+":"+h(c)}function Od(r,a){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(a)||0));if(!s)return s;try{let c=new URL(s,location.href);return c.searchParams.delete("start"),o>0?c.searchParams.set("t",String(o)):c.searchParams.delete("t"),c.hash&&/(?:^#|[&#])t=/i.test(c.hash)&&(c.hash=""),c.toString()}catch{let h=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?h:h+(h.includes("?")?"&":"?")+"t="+o}}function Kl(r,a){let s=ql(a),o=v("#"+e+"-audio-start-enabled",r),c=v("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),c&&(c.disabled=s<=0,c.value=hn(s))}function Md(){if(!u.config)return Ot();let r=gl(),a=r.path||"assets.audio",s=D(u.config,a),o=typeof s=="string"?s:"",c=ql(o);return`
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
              value="${E(hn(c))}"
              placeholder="0:00"
              ${c>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function tr(r,a){(Array.isArray(r)?r:[]).forEach(s=>{a(s),ke(s)==="repeater"&&tr(s.fields,a),ke(s)==="repeater-image"&&tr(s.fields,a)})}function Yl(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},a={html:V("html"),css:V("css"),js:V("js"),head:V("head")},s=(S,w)=>{try{let I=new URL(w,location.origin);if(I.protocol!=="https:"&&I.protocol!=="http:")return;let A=I.origin;if(A===location.origin)return;r[S]?.add(A)}catch{}},o=(S,w)=>{let I=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(I)||[]).forEach(A=>s(w,A))};try{let S=new DOMParser().parseFromString(a.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(w=>{s("img_src",w.getAttribute("src")||w.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(w=>s("media_src",w.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(w=>s("frame_src",w.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(w=>s("script_src",w.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(w=>s("style_src",w.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(w=>s("manifest_src",w.getAttribute("href")||""))}catch{}let c=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,h;for(;h=c.exec((a.css||"")+`
`+(a.head||""));){let S=h[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}o(a.head,"style_src");let f=JSON.stringify(u.config||{}),k=D(u.config,"guestbook.endpoint");return k&&s("connect_src",k),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let w=D(u.config,S);w&&s("connect_src",w)}),(f.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(a.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,w])=>[S,Array.from(w).sort()]))}function Dd(){return{"Body HTML":V("html"),CSS:V("css"),JavaScript:V("js"),"Additional Head":V("head"),CONFIG:JSON.stringify(u.config||{})}}function Ql(r,a,s){let o=Dd(),c=Yp(o);c.length?r("Gambar base64 terdeteksi di "+Zo(c)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let h=Qp(o);h.length&&a("Data URI berukuran besar di "+Zo(h)+"; pertimbangkan pindah ke file hosting")}function Vd(){let r=[],a=[],s=[],o=Y=>r.push(Y),c=Y=>a.push(Y),h=Y=>s.push(Y);if(u.config?h("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),u.schema?h("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),h("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let f=Array.isArray(u.schema?.sections)?u.schema.sections:[],k=f.map(J).filter(Boolean),S=new Set(k);f.length||o("SVE_SCHEMA custom page belum memiliki section"),k.length!==S.size&&o("SVE_SCHEMA memiliki duplicate section id");let w=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],I=new Set(w);w.length!==I.size&&o("CONFIG.sectionOrder memiliki duplicate id"),k.forEach(Y=>{I.has(Y)||o("sectionOrder belum memuat: "+Y)}),f.forEach(Y=>{let ge=J(Y);Y.visiblePath&&(xt(Y.visiblePath)||o("Unsafe visiblePath pada section "+ge),u.config&&typeof D(u.config,Y.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+ge)),tr(Y.fields,Ie=>{let pt=ke(Ie);_i.has(pt)||o("Field type tidak didukung: "+pt+" ("+(Ie.path||Ie.key||ge)+")"),Ie.path&&!xt(Ie.path)&&o("Unsafe field path: "+Ie.path),(pt==="repeater"||pt==="repeater-image")&&!Array.isArray(Ie.fields)&&o("Repeater tanpa fields[]: "+(Ie.path||ge)),pt==="repeater"&&(Ie.fields||[]).forEach(ci=>{let dn=ke(ci);(dn==="repeater"||dn==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(Ie.path||ge)),ci.key||o("Repeater subfield tanpa stable key: "+(Ie.path||ge))})})});let A=["html","css","js","head"].map(V).join(`
`);/\beval\s*\(/.test(A)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(A)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(A)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(A)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(A)&&o("Kemungkinan secret/private credential terdeteksi"),Ql(o,c,h);let P=nn(),B=oe.map(Y=>Y.variable).filter(Y=>!rn(P,Y));B.length?o("Typography role tokens belum lengkap: "+B.join(", ")):h("Semua typography role tokens tersedia");let K=Yl();return Object.values(K).reduce((Y,ge)=>Y+ge.length,0)&&c("External origin terdeteksi; salin CSP manifest ke Scalev Security"),h("Custom page aktif; validasi "+Te.length+" section wedding dilewati"),{status:r.length?"BLOCKER":a.length?"WARNING":"PASS",blockers:r,warnings:a,passes:s,csp:K}}let ir=null;function Zl(){let r=["html","css","js","head"].map(V);if(ir&&r.every((o,c)=>o===ir.sources[c]))return ir.report;let a=new DOMParser().parseFromString(r[0],"text/html");a.head.insertAdjacentHTML("beforeend",r[3]);let s=Yo({doc:a,scripts:[r[2],...Array.from(a.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(a.querySelectorAll("style"),o=>o.textContent).join(`
`)});return ir={sources:r,report:s},s}function Jl(){let r=Zl();if(u.schema?.template?.type==="custom-page"){let F=Vd();return F.blockers=[...new Set([...r.blockers,...F.blockers])],F.blockers.length&&(F.status="BLOCKER"),F}let a=[...r.blockers],s=[],o=[],c=F=>a.push(F),h=F=>s.push(F),f=F=>o.push(F);if(u.config?f("CONFIG terbaca sebagai static object"):c("CONFIG tidak terbaca"),u.schema?f("SVE_SCHEMA eksplisit tersedia"):c("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),f("CONFIG JSON-compatible")}catch{c("CONFIG tidak dapat diserialisasi dengan aman")}let k=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=k.map(J).filter(Boolean),w=new Set(S);S.length!==w.size&&c("SVE_SCHEMA memiliki duplicate section id"),Te.forEach(F=>{w.has(F)||c("Canonical section hilang: "+F)}),Te.every(F=>w.has(F))&&f(Te.length+" canonical sections tersedia");let I=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],A=new Set(I);I.length!==A.size&&c("CONFIG.sectionOrder memiliki duplicate id"),Te.forEach(F=>{A.has(F)||c("sectionOrder belum memuat: "+F)}),I[0]&&I[0]!=="cover"&&c("Cover wajib menjadi section pertama"),Te.filter(F=>F!=="cover").forEach(F=>{typeof D(u.config,"sections."+F)!="boolean"&&c("Boolean visibility tidak valid: sections."+F)}),k.forEach(F=>{let Le=J(F);Le==="cover"?(F.locked!==!0||F.canHide!==!1)&&c("Cover harus locked dan canHide:false"):F.visiblePath&&!xt(F.visiblePath)&&c("Unsafe visiblePath pada section "+Le),tr(F.fields,He=>{let ui=ke(He);_i.has(ui)||c("Field type tidak didukung: "+ui+" ("+(He.path||He.key||Le)+")"),He.path&&!xt(He.path)&&c("Unsafe field path: "+He.path),(ui==="repeater"||ui==="repeater-image")&&!Array.isArray(He.fields)&&c("Repeater tanpa fields[]: "+(He.path||Le)),ui==="repeater"&&(He.fields||[]).forEach(sc=>{let oc=ke(sc);(oc==="repeater"||oc==="repeater-image")&&c("Nested repeater tidak diizinkan: "+(He.path||Le)),sc.key||c("Repeater subfield tanpa stable key: "+(He.path||Le))})})});let P=["html","css","js","head"].map(V).join(`
`);/\beval\s*\(/.test(P)&&c("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(P)&&c("new Function() terdeteksi"),/javascript\s*:/i.test(P)&&c("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(P)&&c("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(P)&&c("Kemungkinan secret/private credential terdeteksi"),Ql(c,h,f);let B=V("js");/\bconst\s+CONFIG\s*=/.test(B)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(B)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let K=D(u.config,"sections.rsvp")===!0,Ye=D(u.config,"sections.guestbook")===!0,Y=String(D(u.config,"rsvp.endpoint")||""),ge=D(u.config,"rsvp.enabled"),Ie=!!Y||ge!==void 0;if(K)if(Ie)ge!==!0&&c("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(Y)||c("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let F=String(D(u.config,"extensions.rsvpBackend.mode")||"none");if(F!=="none"&&F!=="external"&&c("RSVP backend mode harus none atau external"),F==="external"){let Le=String(D(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(Le)||c("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(Ye){let F=D(u.config,"guestbook.enabled"),Le=String(D(u.config,"guestbook.endpoint")||"");F!==!0&&c("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(Le)||c("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let pt=nn(),ci=oe.map(F=>F.variable).filter(F=>!rn(pt,F));ci.length?c("Typography role tokens belum lengkap: "+ci.join(", ")):f("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(pt)&&h("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let ac=Yl();return Object.values(ac).reduce((F,Le)=>F+Le.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):f("Tidak ada external origin wajib dari scanner"),{status:a.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:a,warnings:s,passes:o,csp:ac}}function Bd(r){return r==="PASS"?`
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
    `}function jd(){if(!u.config)return Ot();let r=Jl(),a=(c,h)=>c.length?`<ul>${c.map(f=>`<li>${E(f)}</li>`).join("")}</ul>`:`<p class="compat-empty">${E(h)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${Bd(r.status)}
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
              <pre class="compat-code">${E(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function Ud(r){let a=[],s=new WeakSet,o=(c,h="CONFIG")=>{if(c!==null){if(typeof c=="object"){if(s.has(c)){a.push("Referensi berulang: "+h);return}s.add(c)}if(Array.isArray(c)){c.forEach((f,k)=>o(f,h+"."+k));return}if(typeof c=="object"){Object.keys(c).forEach(f=>{jr.has(f)&&a.push("Forbidden key: "+h+"."+f),o(c[f],h+"."+f)});return}["string","number","boolean"].includes(typeof c)||a.push("Non-static value: "+h),typeof c=="number"&&!Number.isFinite(c)&&a.push("Non-finite number: "+h)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{a.push("CONFIG gagal round-trip JSON")}return a}function Hd(){let r=u.templateLibrary,a=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(h=>a?[h.name].join(" ").toLowerCase().includes(a):!0);r.status==="idle"&&ul().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,re())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${E(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",c=s.map(h=>{let f=!!h.sourceUrl,k=h.id===r.importedId;return`
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
                ${f?"":"disabled"}
              >${f?k?"Reset":"Gunakan":"Belum siap"}</button>
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
    `}function zd(){let r=v("#"+e+"-search");if(!r)return;let a=u.tab==="library";r.placeholder=a?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",a?"Cari template":"Cari section atau field")}function re(){let r=performance.now(),a=v("#"+e+"-body");if(!a)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}a.dataset.sveTab=u.tab||"content",u.tab==="library"?a.innerHTML=Hd():u.tab==="content"?a.innerHTML=Ol():u.tab==="images"?a.innerHTML=yd():u.tab==="colors"?a.innerHTML=wd():u.tab==="style"?a.innerHTML=Fd():u.tab==="audio"?a.innerHTML=Md():u.tab==="compatibility"?a.innerHTML=jd():a.innerHTML=Ol(),Yd(a),zd(),u.tab==="content"&&ad(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function Xl(r,a){return v('[data-image-path="'+CSS.escape(a)+'"]',r)}let Wd="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function ec(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(Wd),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function Gd(r,a){let s=Xl(r,a);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):Ur(o)?(ec(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function qd(r){let a=String(r.dataset.fieldType||"text"),s=r.value;return a==="boolean"?s=!!r.checked:a==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):a==="datetime"&&(s=Gh(r.value)),s}function tc(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;pe(u.config,r.dataset.fieldPath,qd(r));let a=r.closest("[data-section-card]");return Wi(a?.dataset.sectionCard),Mt(a),u.contentStateDirty=!0,!0}function ic(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let a=()=>{C(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;me(),ml(o.dataset.sectionUp,-1);return}let c=s.target.closest("[data-section-down]");if(c){if(s.preventDefault(),s.stopPropagation(),c.disabled)return;me(),ml(c.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let h=s.target.closest("[data-repeat-add]");if(h){let w=h.dataset.repeatAdd,I=ye().flatMap(P=>P.fields||[]).find(P=>P.type==="repeater"&&P.path===w),A=D(u.config,w);Array.isArray(A)||(pe(u.config,w,[]),A=D(u.config,w)),A.push(_l(I||{})),u.contentStateDirty=!0,Wi(h.closest("[data-section-card]")?.dataset.sectionCard),me("Item ditambahkan"),Nl(h.closest("[data-section-card]"));return}let f=s.target.closest("[data-repeat-delete]");if(f){let w=D(u.config,f.dataset.repeatDelete);if(!Array.isArray(w))return;let I=ye().flatMap(P=>P.fields||[]).find(P=>P.type==="repeater"&&P.path===f.dataset.repeatDelete),A=Number.isFinite(I?.min)?I.min:0;if(w.length<=A){me("Minimal "+A+" item");return}w.splice(Number(f.dataset.repeatIndex),1),u.contentStateDirty=!0,Wi(f.closest("[data-section-card]")?.dataset.sectionCard),me("Item dihapus"),Nl(f.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,Cl();return}if(s.target.closest("#"+e+"-team-key-save")){Uh();return}if(s.target.closest("#"+e+"-pin-peek")){tn("peek");return}if(s.target.closest("#"+e+"-pin-generate")){tn("generate");return}if(s.target.closest("#"+e+"-pin-copy")){Hh();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let w=S.closest("[data-section-card]");if(!w)return;let I=!w.classList.contains("open");w.classList.toggle("open",I);let A=w.dataset.sectionCard;I?Pl(w):(u.contentOpenSections.delete(A),v(".chev",w)?.setAttribute("aria-expanded","false"),Mt(w),an(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||tc(o)&&Rl())}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){pe(u.config,o.dataset.visiblePath,o.checked),Rl(o.checked?"Section ditampilkan":"Section disembunyikan");return}tc(o)&&me("Konten diperbarui")}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}me();let c=o.closest("[data-section-card]");c&&(c.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",c.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(c,24,24))}),r.addEventListener("dragend",a),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer?.getData("text/plain")||v(".section.dragging",r)?.dataset?.sectionCard||"",h=o.dataset.sectionCard;if(!c||c===h)return;let f=ye().find(w=>J(w)===h);if(h!=="cover"&&!Ft(f))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let k=o.getBoundingClientRect(),S=s.clientY<k.top+k.height/2?"before":"after";h==="cover"&&(S="after"),C(".section.drag-before, .section.drag-after",r).forEach(w=>{w!==o&&(w.classList.remove("drag-before","drag-after"),delete w.dataset.dropPlacement)}),o.dataset.dropPlacement=S,o.classList.toggle("drag-before",S==="before"),o.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let c=s.dataTransfer.getData("text/plain"),h=o.dataset.sectionCard,f=o.dataset.dropPlacement||(h==="cover"?"after":"before");s.preventDefault(),a(),$h(c,h,f)})}function Kd(r){C("[data-library-import]",r).forEach(a=>{a.onclick=()=>{Ah(a.dataset.libraryImport)}}),v("[data-library-clear]",r)?.addEventListener("click",Th),v("[data-library-refresh]",r)?.addEventListener("click",async()=>{await ul(!0),u.uiPrepared=!1,re()})}function li(r,a){let s=a+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function Yd(r){if(u.tab==="library"){Kd(r);return}if(u.tab==="content"){ic(r);return}if(u.tab==="images"){Qd(r);return}if(u.tab==="colors"){Zd(r);return}if(u.tab==="style"){Jd(r);return}if(u.tab==="audio"){Xd(r);return}if(u.tab==="compatibility"){ef(r);return}ic(r)}function Qd(r){if(!li(r,"images"))return;r.addEventListener("click",s=>{if(s.target.closest("#"+e+"-reset-images")){xd();return}let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),Gd(r,o.dataset.imagePastePath);return}let c=s.target.closest("[data-image-delete-path]");if(c){bd(c.dataset.imageDeletePath);return}let h=s.target.closest("[data-image-open-advance]");if(h){let A=h.dataset.imageOpenAdvance,P=v(`[data-image-card-path="${CSS.escape(A)}"]`,r),B=P?v(".image-advance",P):null;if(B){let K=!B.open;B.open=K,h.setAttribute("aria-expanded",String(K)),h.setAttribute("aria-label",K?"Tutup pengaturan gambar":"Buka pengaturan gambar"),h.title=K?"Tutup pengaturan gambar":"Pengaturan gambar",h.classList.toggle("active",K),K?B.scrollIntoView({block:"nearest",behavior:"smooth"}):h.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let f=s.target.closest("[data-image-align-path]");if(f){let A=f.dataset.imageAlignPath,P=["left","center","right"].includes(f.dataset.imageAlign)?f.dataset.imageAlign:"center";Vt(A,{align:P}),Di(),Yi(r,A);let B=v(`[data-image-path="${CSS.escape(A)}"]`,r);B&&ai(B,A);return}let k=s.target.closest("[data-image-fit-path]");if(k){let A=k.dataset.imageFitPath,P=Jo.includes(k.dataset.imageFit)?k.dataset.imageFit:"auto";Vt(A,{fit:P}),Di(),Yi(r,A);let B=v(`[data-image-path="${CSS.escape(A)}"]`,r);B&&ai(B,A);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let A=S.dataset.imageAlignposPath,P=Hr.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";Vt(A,{alignPos:P}),Di(),Yi(r,A);let B=v(`[data-image-path="${CSS.escape(A)}"]`,r);B&&ai(B,A);return}let w=s.target.closest("[data-gallery-delete-index]");if(w){gd(w.dataset.galleryDeleteIndex,Number(w.dataset.galleryIndex));return}let I=s.target.closest("[data-gallery-add]");if(I){let A=I.dataset.galleryAdd,P=D(u.config,A);Array.isArray(P)||(pe(u.config,A,[]),P=D(u.config,A));let B=P.length,K=Dl(A),Ye=qi(K),Y=String(Ye?.key||"src"),ge=K?_l(K):{};Object.prototype.hasOwnProperty.call(ge,Y)||(ge[Y]=""),P.push(ge),on()[A+"."+B+"."+Y]={width:100,align:"center",alignPos:"default",fit:"auto"},fe("Foto gallery ditambah"),re();return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let h=v(`[data-image-width-number="${CSS.escape(o)}"]`,r);h&&(h.value=s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){let h=Math.max(0,Math.min(100,Number(s.target.value)||0)),f=v(`[data-image-width-path="${CSS.escape(c)}"]`,r);f&&(f.value=h);return}});let a=(s,o)=>{let c=Math.max(0,Math.min(100,Number(o)||0));Vt(s,{width:c}),Di();let h=v(`[data-image-path="${CSS.escape(s)}"]`,r);h&&ai(h,s),Yi(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){a(o,s.target.value);return}let c=s.target.dataset.imageWidthNumber;if(c!==void 0){a(c,s.target.value);return}let h=s.target.closest("[data-image-path]");if(!h)return;let f=h.dataset.imagePath,k=h.value.trim(),S=String(D(u.config,f)||"");if(k!==S){if(Ur(k)){h.value=S,ec(h);return}pe(u.config,f,k),k&&Vt(f,{hidden:!1}),fe("Gambar diperbarui"),ai(h,f)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function Zd(r){if(!li(r,"colors"))return;let a=(o,c,h)=>{let f=o.value.trim();if(!f||!vd(f)){if(h){let S=ve(c);S&&(o.value=S)}return}Ue(c,f);let k=v(`[data-color-var="${CSS.escape(c)}"]`,r);k&&(k.value=si(f,k.value||"#000000"))},s=o=>{let c=Hi(o);if(!c)return;Ue(o,c);let h=v(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),f=v(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let k=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!k.length||k.includes(c))&&(h.value=c)}f&&(f.value=si(c,f.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){_.forEach(([,,h])=>{let f=ve(h);f&&Ue(h,Hi(h)||f)}),C("[data-color-token-var]",r).forEach(h=>{let f=h.dataset.colorTokenVar,k=ve(f);k&&(h.value=k)}),C("[data-color-var]",r).forEach(h=>{h.value=si(ve(h.dataset.colorVar),h.value)});return}}),r.addEventListener("input",o=>{let c=o.target.dataset.colorTokenVar;if(c!==void 0){a(o.target,c,!1);return}let h=o.target.dataset.colorVar;if(h!==void 0){Ue(h,o.target.value);let f=v(`[data-color-token-var="${CSS.escape(h)}"]`,r);f&&(f.value=o.target.value)}}),r.addEventListener("change",o=>{let c=o.target.dataset.colorTokenVar;c!==void 0&&a(o.target,c,!0)})}function Jd(r){if(!li(r,"style"))return;let a=(o,c)=>{let h=String(o.value||"").trim();if(h){if((c==="--sve-heading-weight"||c==="--sve-body-weight")&&!Ld(c==="--sve-heading-weight"?"heading":"body",h)){let k=ve(c);k&&(o.value=k);return}Ue(c,h),(c==="--sve-heading-weight"||c==="--sve-body-weight")&&Zi()}},s=o=>{let c=Hi(o);if(!c)return;Ue(o,c);let h=v(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),f=v(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let k=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!k.length||k.includes(c))&&(h.value=c)}f&&(f.value=si(c,f.value))};r.addEventListener("click",o=>{let c=o.target.closest("[data-reset-token]");if(c){s(c.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){Rd();return}if(o.target.closest("#"+e+"-reset-all")){Cl();return}if(o.target.closest("#"+e+"-heading-font-apply")){Ji("heading");return}o.target.closest("#"+e+"-body-font-apply")&&Ji("body")}),r.addEventListener("change",o=>{let c=o.target.dataset.styleVar;c!==void 0&&a(o.target,c)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let c=o.target.dataset.styleVar;c!==void 0&&a(o.target,c)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),Ji("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),Ji("body")))})}function Xd(r){if(!li(r,"audio"))return;let s=gl().path||"assets.audio",o=v("#"+e+"-audio-url",r),c=v("#"+e+"-audio-start-enabled",r),h=v("#"+e+"-audio-start-time",r);if(!o)return;let f=()=>{let S=o.value.trim(),w=D(u.config,s);if(typeof w=="string"&&w===S){Kl(r,S);return}pe(u.config,s,S),fe("Audio diperbarui"),Kl(r,S)},k=()=>{if(!c||!h)return;let S=o.value.trim(),w=c.checked?er(h.value):0,I=Od(S,w);o.value=I,h.disabled=!c.checked,c.checked&&(h.value=hn(w)),pe(u.config,s,I),fe(w>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(f,0)}),o.addEventListener("change",f),c?.addEventListener("change",()=>{h&&(h.disabled=!c.checked,c.checked&&er(h.value)<=0&&(h.value="0:00",h.focus()),k())}),h?.addEventListener("change",k)}function ef(r){li(r,"compat")}function tf(){Object.values(u.editors).forEach(r=>{if(r)try{r.save?.();let a=r.getTextArea?.();a?.dispatchEvent(new Event("input",{bubbles:!0})),a?.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}})}function rf(r,a=""){let s=v("#"+e+"-body");if(!s||!me()||(u.sourceDirty||!u.doc)&&!_e()||(r=String(r||"").trim(),r&&!xt(r)))return!1;let o=r&&Ki().find(w=>w.path===r),c=ri(),h=w=>zi(w).some(I=>I.path===r||I.type==="repeater"&&r.startsWith(I.path+".")),f=r&&(c.find(w=>J(w)===a&&h(w))||c.find(h))||c.find(w=>J(w)===a);if(!o&&!f)return!1;u.search="";let k=v("#"+e+"-search");k&&(k.value=""),u.open||Nt(!0),Rt(o?"images":"content");let S;if(o)S=Xl(s,r);else{let w=v(`[data-section-card="${CSS.escape(J(f))}"]`,s);if(!w)return!1;Pl(w),S=r&&v(`[data-field-path="${CSS.escape(r)}"]`,w),S||(S=v(".chev",w))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let rc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function nf(r,a,s){if(typeof a!="string"||!a||a.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let o=r?.getAttribute("srcdoc")||"";if(!o)return null;let c=u.canvasPickSources.get(r);if(!c||c.source!==o){let S=document.createElement("template");S.innerHTML=o,c={source:o,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:C("script",S.content).map(w=>w.textContent).join(`
`)},u.canvasPickSources.set(r,c)}if(!c.root||!c.scripts.includes(JSON.stringify(s)))return null;let h=c.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(a)}"]`);if(!h)return null;let f=h.matches("[data-sve-field]")?h:h.querySelector("[data-sve-field]")||h.closest("[data-sve-field]"),k=h.closest("[data-section-id], [data-sve-section]");return{path:f?.getAttribute("data-sve-field")||"",sectionHint:k?.getAttribute("data-section-id")||k?.id||k?.getAttribute("data-sve-section")||""}}function af(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,a=null;window.addEventListener("message",s=>{if(location.href!==r)return;let o=s.data;if(!o||o.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof o.inspectorId!="string"||!o.inspectorId||o.inspectorId.length>256||typeof o.previewId!="string"||o.previewId.length>256)return;let c=C(rc).find(B=>B.contentWindow===s.source);if(!c||!c.sandbox.contains("allow-scripts")||c.sandbox.contains("allow-same-origin"))return;let h=c.getAttribute("srcdoc"),f=location.href,{open:k,tab:S,sourceDirty:w}=u,I=u.performance.configCommitCount,A=V("html"),P=V("js");cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(a=null,location.href!==f||!c.isConnected||!c.matches(rc)||c.contentWindow!==s.source||c.getAttribute("srcdoc")!==h||u.open!==k||u.tab!==S||u.sourceDirty!==w||u.performance.configCommitCount!==I||V("html")!==A||V("js")!==P)return;let B=nf(c,o.inspectorId,o.previewId);B&&(B.path||B.sectionHint)&&rf(B.path,B.sectionHint)})})}function sf(){return C("button").find(r=>{if(r.closest("#"+e))return!1;let a=(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="simpan"||a==="save"})||null}function of(){let r="https://wa.me/"+p+"?text="+encodeURIComponent(d);window.open(r,"_blank","noopener,noreferrer")}function px(){if(!me())return;if(tf(),_e(),Jl().blockers.length){u.tab="compatibility";let s=document.getElementById(e);C(".tab",s).forEach(o=>{o.classList.toggle("active",o.dataset.tab==="compatibility")}),re();return}let a=sf();a&&a.click()}function lf(){performance.mark("sve-styles-start"),cf(),performance.mark("sve-styles-critical-done"),Lt(uf,50)}function cf(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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
`,document.head.appendChild(r)}function uf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
#${e}-body[data-sve-tab="images"] .advance-fit-btn {
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
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function pf(){lf();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
    `,document.body.appendChild(r),v("#"+e+"-close").onclick=()=>{Nt(!1)},v("#"+e+"-refresh").onclick=()=>{_e()&&(re(),je({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,_e()&&(re(),je({force:!0,syncImages:!0}))},v("#"+e+"-support").onclick=of;let a=v("#"+e+"-editor-update"),s=v("#"+e+"-update-status"),o=!1,c=!1,h=0,f=null,k=15e3,S=(I,A,P=!1)=>{a.textContent=I,a.title=A,a.setAttribute("aria-label",A),a.disabled=P},w=()=>{h=Date.now()+k,S("Cek Update","Cek update Visual Editor",!0),clearTimeout(f),f=setTimeout(()=>{h=0,!c&&!o&&S("Cek Update","Cek update Visual Editor")},k)};a.addEventListener("click",()=>{if(o){window.open(g,"_blank","noopener");return}if(c||Date.now()<h){s.textContent="Tunggu sebentar";return}o=!1,c=!0,S("Mengecek...","Sedang mengecek update Visual Editor",!0),s.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${x}?check=${Date.now()}`,onload(I){let A=Ye=>{o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent=Ye,w()};if(I.status<200||I.status>=300){A(I.status===403||I.status===429?"Tunggu sebentar":"Gagal cek update");return}let B=(I.responseText||"").match(/@version\s+([^\s]+)/),K=B&&B[1];if(!K){A("Gagal cek update");return}K===t?(o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Sudah terbaru",w()):(o=!0,c=!1,S("Pasang",`Pasang update Visual Editor versi ${K}`),s.textContent=`Update tersedia: versi ${K}.`)},onerror(){o=!1,c=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Gagal cek update",w()}})}),v("#"+e+"-search").addEventListener("input",ti(I=>{u.search=I.target.value.toLowerCase().trim(),u.uiPrepared=!1,re()},100)),C(".tab",r).forEach(I=>{I.onclick=()=>{me()&&Rt(I.dataset.tab)}})}function hf(){let r=ti(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,$t(),$i(),nl();let f=vt();f&&ii(f,{commit:!0,silent:!0}),u.open&&Pi(!0);let k=Yr();if(k.length!==u.allEditors.length||k.some((S,w)=>S!==u.allEditors[w])){if(u.sourceDirty=!0,!_e())return;Ui.invalidate(),il(),u.open?re():Ni()}},160),a='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(f=>{f.some(k=>!k.target.closest?.("#"+e)&&[...k.addedNodes,...k.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}),o=null,c=()=>{let f=Kr();f!==o&&(s.disconnect(),o=f,f&&s.observe(f,{childList:!0,subtree:!0}),r())};new MutationObserver(f=>{c(),f.some(k=>[...k.addedNodes,...k.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}).observe(document.body,{childList:!0}),c(),document.addEventListener("load",f=>{f.target instanceof HTMLIFrameElement&&(Ui.invalidate(),je({force:!0,syncImages:!0}))},!0),document.addEventListener("click",f=>{let k=f.target.closest?.("button");if(!(!k||k.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(k.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!V("js").includes("SVE_SCHEMA"))){if(!me()){f.preventDefault(),f.stopImmediatePropagation();return}Zl().blockers.length&&(f.preventDefault(),f.stopImmediatePropagation(),Nt(!0),u.uiPrepared=!1,Rt("compatibility"))}},!0),document.addEventListener("keydown",f=>{f.key==="Escape"&&u.open&&document.getElementById(e)?.contains(f.target)&&(Nt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",f=>{zr(f.target)&&(u.scalevSlug=yt(f.target.value),rh())},!0),document.addEventListener("change",f=>{if(zr(f.target)){let k=yt(f.target.value);k&&(u.scalevSlug=k,ii(k,{commit:!0}))}},!0),window.addEventListener("resize",ti(()=>{$i(),u.open&&Pi(!0)},80))}function nc(){b()&&(pf(),nl(),af(),hf(),qr(),requestAnimationFrame(()=>{$i()}),Ni(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",nc,{once:!0}):nc()})();})();
