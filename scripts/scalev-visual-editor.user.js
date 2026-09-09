// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.26.9
// @updateURL    https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js
// @downloadURL  https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js
// @description  Schema-first Scalev Visual Editor: Template Library, 20-section accordion, realtime preview.
// @match        https://app.scalev.com/pages/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      nikahin.workers.dev
// @connect      api.github.com
// @connect      raw.githubusercontent.com
// @run-at       document-idle
// ==/UserScript==
(()=>{var lf=Object.create;var ha=Object.defineProperty;var cf=Object.getOwnPropertyDescriptor;var uf=Object.getOwnPropertyNames;var pf=Object.getPrototypeOf,hf=Object.prototype.hasOwnProperty;var Dt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)ha(e,i,{get:t[i],enumerable:!0})},df=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of uf(t))!hf.call(e,l)&&l!==i&&ha(e,l,{get:()=>t[l],enumerable:!(a=cf(t,l))||a.enumerable});return e};var ff=(e,t,i)=>(i=e!=null?lf(pf(e)):{},df(t||!e||!e.__esModule?ha(i,"default",{value:e,enumerable:!0}):i,e));var hp=Dt(Do=>{var pp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Do.encode=function(e){if(0<=e&&e<pp.length)return pp[e];throw new TypeError("Must be between 0 and 63: "+e)};Do.decode=function(e){var t=65,i=90,a=97,l=122,p=48,d=57,g=43,y=47,b=26,x=52;return t<=e&&e<=i?e-t:a<=e&&e<=l?e-a+b:p<=e&&e<=d?e-p+x:e==g?62:e==y?63:-1}});var bp=Dt(Bo=>{var dp=hp(),Vo=5,fp=1<<Vo,mp=fp-1,gp=fp;function Cb(e){return e<0?(-e<<1)+1:(e<<1)+0}function Eb(e){var t=(e&1)===1,i=e>>1;return t?-i:i}Bo.encode=function(t){var i="",a,l=Cb(t);do a=l&mp,l>>>=Vo,l>0&&(a|=gp),i+=dp.encode(a);while(l>0);return i};Bo.decode=function(t,i,a){var l=t.length,p=0,d=0,g,y;do{if(i>=l)throw new Error("Expected more digits in base 64 VLQ value.");if(y=dp.decode(t.charCodeAt(i++)),y===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(y&gp),y&=mp,p=p+(y<<d),d+=Vo}while(g);a.value=Eb(p),a.rest=i}});var Pr=Dt(he=>{function Ab(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}he.getArg=Ab;var xp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Tb=/^data:.+\,.+$/;function Ai(e){var t=e.match(xp);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}he.urlParse=Ai;function Qt(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}he.urlGenerate=Qt;var Ib=32;function Lb(e){var t=[];return function(i){for(var a=0;a<t.length;a++)if(t[a].input===i){var l=t[0];return t[0]=t[a],t[a]=l,t[0].result}var p=e(i);return t.unshift({input:i,result:p}),t.length>Ib&&t.pop(),p}}var jo=Lb(function(t){var i=t,a=Ai(t);if(a){if(!a.path)return t;i=a.path}for(var l=he.isAbsolute(i),p=[],d=0,g=0;;)if(d=g,g=i.indexOf("/",d),g===-1){p.push(i.slice(d));break}else for(p.push(i.slice(d,g));g<i.length&&i[g]==="/";)g++;for(var y,b=0,g=p.length-1;g>=0;g--)y=p[g],y==="."?p.splice(g,1):y===".."?b++:b>0&&(y===""?(p.splice(g+1,b),b=0):(p.splice(g,2),b--));return i=p.join("/"),i===""&&(i=l?"/":"."),a?(a.path=i,Qt(a)):i});he.normalize=jo;function yp(e,t){e===""&&(e="."),t===""&&(t=".");var i=Ai(t),a=Ai(e);if(a&&(e=a.path||"/"),i&&!i.scheme)return a&&(i.scheme=a.scheme),Qt(i);if(i||t.match(Tb))return t;if(a&&!a.host&&!a.path)return a.host=t,Qt(a);var l=t.charAt(0)==="/"?t:jo(e.replace(/\/+$/,"")+"/"+t);return a?(a.path=l,Qt(a)):l}he.join=yp;he.isAbsolute=function(e){return e.charAt(0)==="/"||xp.test(e)};function _b(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var a=e.lastIndexOf("/");if(a<0||(e=e.slice(0,a),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}he.relative=_b;var vp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function kp(e){return e}function $b(e){return Sp(e)?"$"+e:e}he.toSetString=vp?kp:$b;function Pb(e){return Sp(e)?e.slice(1):e}he.fromSetString=vp?kp:Pb;function Sp(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function Nb(e,t,i){var a=ct(e.source,t.source);return a!==0||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:ct(e.name,t.name)}he.compareByOriginalPositions=Nb;function Rb(e,t,i){var a;return a=e.originalLine-t.originalLine,a!==0||(a=e.originalColumn-t.originalColumn,a!==0||i)||(a=e.generatedColumn-t.generatedColumn,a!==0)||(a=e.generatedLine-t.generatedLine,a!==0)?a:ct(e.name,t.name)}he.compareByOriginalPositionsNoSource=Rb;function Fb(e,t,i){var a=e.generatedLine-t.generatedLine;return a!==0||(a=e.generatedColumn-t.generatedColumn,a!==0||i)||(a=ct(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:ct(e.name,t.name)}he.compareByGeneratedPositionsDeflated=Fb;function Ob(e,t,i){var a=e.generatedColumn-t.generatedColumn;return a!==0||i||(a=ct(e.source,t.source),a!==0)||(a=e.originalLine-t.originalLine,a!==0)||(a=e.originalColumn-t.originalColumn,a!==0)?a:ct(e.name,t.name)}he.compareByGeneratedPositionsDeflatedNoLine=Ob;function ct(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Mb(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=ct(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:ct(e.name,t.name)}he.compareByGeneratedPositionsInflated=Mb;function Db(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}he.parseSourceMapInput=Db;function Vb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var a=Ai(i);if(!a)throw new Error("sourceMapURL could not be parsed");if(a.path){var l=a.path.lastIndexOf("/");l>=0&&(a.path=a.path.substring(0,l+1))}t=yp(Qt(a),t)}return jo(t)}he.computeSourceURL=Vb});var Cp=Dt(wp=>{var Uo=Pr(),Ho=Object.prototype.hasOwnProperty,Lt=typeof Map<"u";function ut(){this._array=[],this._set=Lt?new Map:Object.create(null)}ut.fromArray=function(t,i){for(var a=new ut,l=0,p=t.length;l<p;l++)a.add(t[l],i);return a};ut.prototype.size=function(){return Lt?this._set.size:Object.getOwnPropertyNames(this._set).length};ut.prototype.add=function(t,i){var a=Lt?t:Uo.toSetString(t),l=Lt?this.has(t):Ho.call(this._set,a),p=this._array.length;(!l||i)&&this._array.push(t),l||(Lt?this._set.set(t,p):this._set[a]=p)};ut.prototype.has=function(t){if(Lt)return this._set.has(t);var i=Uo.toSetString(t);return Ho.call(this._set,i)};ut.prototype.indexOf=function(t){if(Lt){var i=this._set.get(t);if(i>=0)return i}else{var a=Uo.toSetString(t);if(Ho.call(this._set,a))return this._set[a]}throw new Error('"'+t+'" is not in the set.')};ut.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};ut.prototype.toArray=function(){return this._array.slice()};wp.ArraySet=ut});var Tp=Dt(Ap=>{var Ep=Pr();function Bb(e,t){var i=e.generatedLine,a=t.generatedLine,l=e.generatedColumn,p=t.generatedColumn;return a>i||a==i&&p>=l||Ep.compareByGeneratedPositionsInflated(e,t)<=0}function Nr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Nr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Nr.prototype.add=function(t){Bb(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Nr.prototype.toArray=function(){return this._sorted||(this._array.sort(Ep.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Ap.MappingList=Nr});var Lp=Dt(Ip=>{var Ti=bp(),ne=Pr(),Rr=Cp().ArraySet,jb=Tp().MappingList;function Be(e){e||(e={}),this._file=ne.getArg(e,"file",null),this._sourceRoot=ne.getArg(e,"sourceRoot",null),this._skipValidation=ne.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=ne.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Rr,this._names=new Rr,this._mappings=new jb,this._sourcesContents=null}Be.prototype._version=3;Be.fromSourceMap=function(t,i){var a=t.sourceRoot,l=new Be(Object.assign(i||{},{file:t.file,sourceRoot:a}));return t.eachMapping(function(p){var d={generated:{line:p.generatedLine,column:p.generatedColumn}};p.source!=null&&(d.source=p.source,a!=null&&(d.source=ne.relative(a,d.source)),d.original={line:p.originalLine,column:p.originalColumn},p.name!=null&&(d.name=p.name)),l.addMapping(d)}),t.sources.forEach(function(p){var d=p;a!==null&&(d=ne.relative(a,p)),l._sources.has(d)||l._sources.add(d);var g=t.sourceContentFor(p);g!=null&&l.setSourceContent(p,g)}),l};Be.prototype.addMapping=function(t){var i=ne.getArg(t,"generated"),a=ne.getArg(t,"original",null),l=ne.getArg(t,"source",null),p=ne.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,a,l,p)===!1||(l!=null&&(l=String(l),this._sources.has(l)||this._sources.add(l)),p!=null&&(p=String(p),this._names.has(p)||this._names.add(p)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:a!=null&&a.line,originalColumn:a!=null&&a.column,source:l,name:p}))};Be.prototype.setSourceContent=function(t,i){var a=t;this._sourceRoot!=null&&(a=ne.relative(this._sourceRoot,a)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[ne.toSetString(a)]=i):this._sourcesContents&&(delete this._sourcesContents[ne.toSetString(a)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};Be.prototype.applySourceMap=function(t,i,a){var l=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);l=t.file}var p=this._sourceRoot;p!=null&&(l=ne.relative(p,l));var d=new Rr,g=new Rr;this._mappings.unsortedForEach(function(y){if(y.source===l&&y.originalLine!=null){var b=t.originalPositionFor({line:y.originalLine,column:y.originalColumn});b.source!=null&&(y.source=b.source,a!=null&&(y.source=ne.join(a,y.source)),p!=null&&(y.source=ne.relative(p,y.source)),y.originalLine=b.line,y.originalColumn=b.column,b.name!=null&&(y.name=b.name))}var x=y.source;x!=null&&!d.has(x)&&d.add(x);var k=y.name;k!=null&&!g.has(k)&&g.add(k)},this),this._sources=d,this._names=g,t.sources.forEach(function(y){var b=t.sourceContentFor(y);b!=null&&(a!=null&&(y=ne.join(a,y)),p!=null&&(y=ne.relative(p,y)),this.setSourceContent(y,b))},this)};Be.prototype._validateMapping=function(t,i,a,l){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var p="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!a&&!l)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&a)return;var p="Invalid mapping: "+JSON.stringify({generated:t,source:a,original:i,name:l});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(p),!1;throw new Error(p)}};Be.prototype._serializeMappings=function(){for(var t=0,i=1,a=0,l=0,p=0,d=0,g="",y,b,x,k,c=this._mappings.toArray(),E=0,L=c.length;E<L;E++){if(b=c[E],y="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)y+=";",i++;else if(E>0){if(!ne.compareByGeneratedPositionsInflated(b,c[E-1]))continue;y+=","}y+=Ti.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(k=this._sources.indexOf(b.source),y+=Ti.encode(k-d),d=k,y+=Ti.encode(b.originalLine-1-l),l=b.originalLine-1,y+=Ti.encode(b.originalColumn-a),a=b.originalColumn,b.name!=null&&(x=this._names.indexOf(b.name),y+=Ti.encode(x-p),p=x)),g+=y}return g};Be.prototype._generateSourcesContent=function(t,i){return t.map(function(a){if(!this._sourcesContents)return null;i!=null&&(a=ne.relative(i,a));var l=ne.toSetString(a);return Object.prototype.hasOwnProperty.call(this._sourcesContents,l)?this._sourcesContents[l]:null},this)};Be.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};Be.prototype.toString=function(){return JSON.stringify(this.toJSON())};Ip.SourceMapGenerator=Be});var mf=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],uc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],gf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",pc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",da={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},fa="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",bf={5:fa,"5module":fa+" export import",6:fa+" const class extends export import super"},hc=/^in(stanceof)?$/,xf=new RegExp("["+pc+"]"),yf=new RegExp("["+pc+gf+"]");function ga(e,t){for(var i=65536,a=0;a<t.length;a+=2){if(i+=t[a],i>e)return!1;if(i+=t[a+1],i>=e)return!0}return!1}function Ye(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&xf.test(String.fromCharCode(e)):t===!1?!1:ga(e,uc)}function dt(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&yf.test(String.fromCharCode(e)):t===!1?!1:ga(e,uc)||ga(e,mf)}var G=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Re(e,t){return new G(e,{beforeExpr:!0,binop:t})}var Fe={beforeExpr:!0},Ee={startsExpr:!0},va={};function H(e,t){return t===void 0&&(t={}),t.keyword=e,va[e]=new G(e,t)}var f={num:new G("num",Ee),regexp:new G("regexp",Ee),string:new G("string",Ee),name:new G("name",Ee),privateId:new G("privateId",Ee),eof:new G("eof"),bracketL:new G("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new G("]"),braceL:new G("{",{beforeExpr:!0,startsExpr:!0}),braceR:new G("}"),parenL:new G("(",{beforeExpr:!0,startsExpr:!0}),parenR:new G(")"),comma:new G(",",Fe),semi:new G(";",Fe),colon:new G(":",Fe),dot:new G("."),question:new G("?",Fe),questionDot:new G("?."),arrow:new G("=>",Fe),template:new G("template"),invalidTemplate:new G("invalidTemplate"),ellipsis:new G("...",Fe),backQuote:new G("`",Ee),dollarBraceL:new G("${",{beforeExpr:!0,startsExpr:!0}),eq:new G("=",{beforeExpr:!0,isAssign:!0}),assign:new G("_=",{beforeExpr:!0,isAssign:!0}),incDec:new G("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new G("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Re("||",1),logicalAND:Re("&&",2),bitwiseOR:Re("|",3),bitwiseXOR:Re("^",4),bitwiseAND:Re("&",5),equality:Re("==/!=/===/!==",6),relational:Re("</>/<=/>=",7),bitShift:Re("<</>>/>>>",8),plusMin:new G("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Re("%",10),star:Re("*",10),slash:Re("/",10),starstar:new G("**",{beforeExpr:!0}),coalesce:Re("??",1),_break:H("break"),_case:H("case",Fe),_catch:H("catch"),_continue:H("continue"),_debugger:H("debugger"),_default:H("default",Fe),_do:H("do",{isLoop:!0,beforeExpr:!0}),_else:H("else",Fe),_finally:H("finally"),_for:H("for",{isLoop:!0}),_function:H("function",Ee),_if:H("if"),_return:H("return",Fe),_switch:H("switch"),_throw:H("throw",Fe),_try:H("try"),_var:H("var"),_const:H("const"),_while:H("while",{isLoop:!0}),_with:H("with"),_new:H("new",{beforeExpr:!0,startsExpr:!0}),_this:H("this",Ee),_super:H("super",Ee),_class:H("class",Ee),_extends:H("extends",Fe),_export:H("export"),_import:H("import",Ee),_null:H("null",Ee),_true:H("true",Ee),_false:H("false",Ee),_in:H("in",{beforeExpr:!0,binop:7}),_instanceof:H("instanceof",{beforeExpr:!0,binop:7}),_typeof:H("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:H("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:H("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Ae=/\r\n?|\n|\u2028|\u2029/,vf=new RegExp(Ae.source,"g");function Vt(e){return e===10||e===13||e===8232||e===8233}function dc(e,t,i){i===void 0&&(i=e.length);for(var a=t;a<i;a++){var l=e.charCodeAt(a);if(Vt(l))return a<i-1&&l===13&&e.charCodeAt(a+1)===10?a+2:a+1}return-1}var fc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,ue=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,mc=Object.prototype,kf=mc.hasOwnProperty,Sf=mc.toString,Bt=Object.hasOwn||(function(e,t){return kf.call(e,t)}),nc=Array.isArray||(function(e){return Sf.call(e)==="[object Array]"}),sc=Object.create(null);function ht(e){return sc[e]||(sc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function nt(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var wf=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,di=function(t,i){this.line=t,this.column=i};di.prototype.offset=function(t){return new di(this.line,this.column+t)};var ar=function(t,i,a){this.start=i,this.end=a,t.sourceFile!==null&&(this.source=t.sourceFile)};function gc(e,t){for(var i=1,a=0;;){var l=dc(e,a,t);if(l<0)return new di(i,t-a);++i,a=l}}var ba={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},oc=!1;function Cf(e){var t={};for(var i in ba)t[i]=e&&Bt(e,i)?e[i]:ba[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!oc&&typeof console=="object"&&console.warn&&(oc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),nc(t.onToken)){var a=t.onToken;t.onToken=function(l){return a.push(l)}}if(nc(t.onComment)&&(t.onComment=Ef(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function Ef(e,t){return function(i,a,l,p,d,g){var y={type:i?"Block":"Line",value:a,start:l,end:p};e.locations&&(y.loc=new ar(this,d,g)),e.ranges&&(y.range=[l,p]),t.push(y)}}var St=1,wt=2,ka=4,bc=8,Sa=16,xc=32,nr=64,yc=128,Ct=256,fi=512,vc=1024,sr=St|wt|Ct;function wa(e,t){return wt|(e?ka:0)|(t?bc:0)}var er=0,Ca=1,ot=2,kc=3,Sc=4,wc=5,le=function(t,i,a){this.options=t=Cf(t),this.sourceFile=t.sourceFile,this.keywords=ht(bf[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var l="";t.allowReserved!==!0&&(l=da[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(l+=" await")),this.reservedWords=ht(l);var p=(l?l+" ":"")+da.strict;this.reservedWordsStrict=ht(p),this.reservedWordsStrictBind=ht(p+" "+da.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=a||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):a?(this.lineStart=this.input.lastIndexOf(`
`,a-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Ae).length)):this.lineStart=0,this.type=f.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?wt:St),this.regexpState=null,this.privateNameStack=[]},Me={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};le.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};Me.inFunction.get=function(){return(this.currentVarScope().flags&wt)>0};Me.inGenerator.get=function(){return(this.currentVarScope().flags&bc)>0};Me.inAsync.get=function(){return(this.currentVarScope().flags&ka)>0};Me.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ct|fi))return!1;if(i&wt)return(i&ka)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};Me.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&St)};Me.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&nr)>0||this.options.allowSuperOutsideMethod};Me.allowDirectSuper.get=function(){return(this.currentThisScope().flags&yc)>0};Me.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};Me.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Ct|fi)||i&wt&&!(i&Sa))return!0}return!1};Me.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&vc||!this.inModule&&t&St)};Me.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Ct)>0};le.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var a=this,l=0;l<t.length;l++)a=t[l](a);return a};le.parse=function(t,i){return new this(i,t).parse()};le.parseExpressionAt=function(t,i,a){var l=new this(a,t,i);return l.nextToken(),l.parseExpression()};le.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(le.prototype,Me);var ge=le.prototype,Af=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;ge.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){ue.lastIndex=e,e+=ue.exec(this.input)[0].length;var t=Af.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){ue.lastIndex=e+t[0].length;var i=ue.exec(this.input),a=i.index+i[0].length,l=this.input.charAt(a);return l===";"||l==="}"||Ae.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(l)||l==="!"&&this.input.charAt(a+1)==="=")}e+=t[0].length,ue.lastIndex=e,e+=ue.exec(this.input)[0].length,this.input[e]===";"&&e++}};ge.eat=function(e){return this.type===e?(this.next(),!0):!1};ge.isContextual=function(e){return this.type===f.name&&this.value===e&&!this.containsEsc};ge.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};ge.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};ge.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};ge.canInsertSemicolon=function(){return this.type===f.eof||this.type===f.braceR||Ae.test(this.input.slice(this.lastTokEnd,this.start))};ge.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};ge.semicolon=function(){!this.eat(f.semi)&&!this.insertSemicolon()&&this.unexpected()};ge.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};ge.expect=function(e){this.eat(e)||this.unexpected()};ge.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var or=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};ge.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};ge.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,a=e.doubleProto;if(!t)return i>=0||a>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),a>=0&&this.raiseRecoverable(a,"Redefinition of __proto__ property")};ge.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};ge.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var P=le.prototype;P.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==f.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var a=0,l=Object.keys(this.undefinedExports);a<l.length;a+=1){var p=l[a];this.raiseRecoverable(this.undefinedExports[p].start,"Export '"+p+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Ea={kind:"loop"},Tf={kind:"switch"};P.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;ue.lastIndex=this.pos;var t=ue.exec(this.input),i=this.pos+t[0].length,a=this.fullCharCodeAt(i);if(a===91||a===92)return!0;if(e)return!1;if(a===123)return!0;if(Ye(a)){var l=i;do i+=a<=65535?1:2;while(dt(a=this.fullCharCodeAt(i)));if(a===92)return!0;var p=this.input.slice(l,i);if(!hc.test(p))return!0}return!1};P.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;ue.lastIndex=this.pos;var e=ue.exec(this.input),t=this.pos+e[0].length,i;return!Ae.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(dt(i=this.fullCharCodeAt(t+8))||i===92))};P.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;ue.lastIndex=this.pos;var i=ue.exec(this.input),a=this.pos+i[0].length;if(Ae.test(this.input.slice(this.pos,a)))return!1;if(e){var l=a+5,p;if(this.input.slice(a,l)!=="using"||l===this.input.length||dt(p=this.fullCharCodeAt(l))||p===92)return!1;ue.lastIndex=l;var d=ue.exec(this.input);if(a=l+d[0].length,d&&Ae.test(this.input.slice(l,a)))return!1}var g=this.fullCharCodeAt(a);if(!Ye(g)&&g!==92)return!1;var y=a;do a+=g<=65535?1:2;while(dt(g=this.fullCharCodeAt(a)));if(g===92)return!0;var b=this.input.slice(y,a);if(hc.test(b))return!1;if(t&&!e&&b==="of"){ue.lastIndex=a;var x=ue.exec(this.input);if(a=a+x[0].length,this.input.charCodeAt(a)!==61||(g=this.input.charCodeAt(a+1))===61||g===62)return!1}return!0};P.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};P.isUsing=function(e){return this.isUsingKeyword(!1,e)};P.parseStatement=function(e,t,i){var a=this.type,l=this.startNode(),p;switch(this.isLet(e)&&(a=f._var,p="let"),a){case f._break:case f._continue:return this.parseBreakContinueStatement(l,a.keyword);case f._debugger:return this.parseDebuggerStatement(l);case f._do:return this.parseDoStatement(l);case f._for:return this.parseForStatement(l);case f._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(l,!1,!e);case f._class:return e&&this.unexpected(),this.parseClass(l,!0);case f._if:return this.parseIfStatement(l);case f._return:return this.parseReturnStatement(l);case f._switch:return this.parseSwitchStatement(l);case f._throw:return this.parseThrowStatement(l);case f._try:return this.parseTryStatement(l);case f._const:case f._var:return p=p||this.value,e&&p!=="var"&&this.unexpected(),this.parseVarStatement(l,p);case f._while:return this.parseWhileStatement(l);case f._with:return this.parseWithStatement(l);case f.braceL:return this.parseBlock(!0,l);case f.semi:return this.parseEmptyStatement(l);case f._export:case f._import:if(this.options.ecmaVersion>10&&a===f._import){ue.lastIndex=this.pos;var d=ue.exec(this.input),g=this.pos+d[0].length,y=this.input.charCodeAt(g);if(y===40||y===46)return this.parseExpressionStatement(l,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),a===f._import?this.parseImport(l):this.parseExport(l,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(l,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(l,!1,b),this.semicolon(),this.finishNode(l,"VariableDeclaration");var x=this.value,k=this.parseExpression();return a===f.name&&k.type==="Identifier"&&this.eat(f.colon)?this.parseLabeledStatement(l,x,k,e):this.parseExpressionStatement(l,k)}};P.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(f.semi)||this.insertSemicolon()?e.label=null:this.type!==f.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var a=0;a<this.labels.length;++a){var l=this.labels[a];if((e.label==null||l.name===e.label.name)&&(l.kind!=null&&(i||l.kind==="loop")||e.label&&i))break}return a===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};P.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};P.parseDoStatement=function(e){return this.next(),this.labels.push(Ea),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(f._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(f.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};P.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Ea),this.enterScope(0),this.expect(f.parenL),this.type===f.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===f._var||this.type===f._const||i){var a=this.startNode(),l=i?"let":this.value;return this.next(),this.parseVar(a,!0,l),this.finishNode(a,"VariableDeclaration"),this.parseForAfterInit(e,a,t)}var p=this.isContextual("let"),d=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var y=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(y,!0,g),this.finishNode(y,"VariableDeclaration"),this.parseForAfterInit(e,y,t)}var b=this.containsEsc,x=new or,k=this.start,c=t>-1?this.parseExprSubscripts(x,"await"):this.parseExpression(!0,x);return this.type===f._in||(d=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===f._in&&this.unexpected(t),e.await=!0):d&&this.options.ecmaVersion>=8&&(c.start===k&&!b&&c.type==="Identifier"&&c.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),p&&d&&this.raise(c.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(c,!1,x),this.checkLValPattern(c),this.parseForIn(e,c)):(this.checkExpressionErrors(x,!0),t>-1&&this.unexpected(t),this.parseFor(e,c))};P.parseForAfterInit=function(e,t,i){return(this.type===f._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===f._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};P.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,hi|(i?0:xa),!1,t)};P.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(f._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};P.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(f.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};P.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(f.braceL),this.labels.push(Tf),this.enterScope(vc);for(var t,i=!1;this.type!==f.braceR;)if(this.type===f._case||this.type===f._default){var a=this.type===f._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),a?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(f.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};P.parseThrowStatement=function(e){return this.next(),Ae.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var If=[];P.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?xc:0),this.checkLValPattern(e,t?Sc:ot),this.expect(f.parenR),e};P.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===f._catch){var t=this.startNode();this.next(),this.eat(f.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(f._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};P.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};P.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Ea),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};P.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};P.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};P.parseLabeledStatement=function(e,t,i,a){for(var l=0,p=this.labels;l<p.length;l+=1){var d=p[l];d.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===f._switch?"switch":null,y=this.labels.length-1;y>=0;y--){var b=this.labels[y];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(a?a.indexOf("label")===-1?a+"label":a:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};P.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};P.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(f.braceL),e&&this.enterScope(0);this.type!==f.braceR;){var a=this.parseStatement(null);t.body.push(a)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};P.parseFor=function(e,t){return e.init=t,this.expect(f.semi),e.test=this.type===f.semi?null:this.parseExpression(),this.expect(f.semi),e.update=this.type===f.parenR?null:this.parseExpression(),this.expect(f.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};P.parseForIn=function(e,t){var i=this.type===f._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(f.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};P.parseVar=function(e,t,i,a){for(e.declarations=[],e.kind=i;;){var l=this.startNode();if(this.parseVarId(l,i),this.eat(f.eq)?l.init=this.parseMaybeAssign(t):!a&&i==="const"&&!(this.type===f._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!a&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==f._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!a&&l.id.type!=="Identifier"&&!(t&&(this.type===f._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):l.init=null,e.declarations.push(this.finishNode(l,"VariableDeclarator")),!this.eat(f.comma))break}return e};P.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?Ca:ot,!1)};var hi=1,xa=2,Cc=4;P.parseFunction=function(e,t,i,a,l){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!a)&&(this.type===f.star&&t&xa&&this.unexpected(),e.generator=this.eat(f.star)),this.options.ecmaVersion>=8&&(e.async=!!a),t&hi&&(e.id=t&Cc&&this.type!==f.name?null:this.parseIdent(),e.id&&!(t&xa)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?Ca:ot:kc));var p=this.yieldPos,d=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(wa(e.async,e.generator)),t&hi||(e.id=this.type===f.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,l),this.yieldPos=p,this.awaitPos=d,this.awaitIdentPos=g,this.finishNode(e,t&hi?"FunctionDeclaration":"FunctionExpression")};P.parseFunctionParams=function(e){this.expect(f.parenL),e.params=this.parseBindingList(f.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};P.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var a=this.enterClassBody(),l=this.startNode(),p=!1;for(l.body=[],this.expect(f.braceL);this.type!==f.braceR;){var d=this.parseClassElement(e.superClass!==null);d&&(l.body.push(d),d.type==="MethodDefinition"&&d.kind==="constructor"?(p&&this.raiseRecoverable(d.start,"Duplicate constructor in the same class"),p=!0):d.key&&d.key.type==="PrivateIdentifier"&&Lf(a,d)&&this.raiseRecoverable(d.key.start,"Identifier '#"+d.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(l,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};P.parseClassElement=function(e){if(this.eat(f.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),a="",l=!1,p=!1,d="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(f.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===f.star?g=!0:a="static"}if(i.static=g,!a&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===f.star)&&!this.canInsertSemicolon()?p=!0:a="async"),!a&&(t>=9||!p)&&this.eat(f.star)&&(l=!0),!a&&!p&&!l){var y=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?d=y:a=y)}if(a?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=a,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===f.parenL||d!=="method"||l||p){var b=!i.static&&tr(i,"constructor"),x=b&&e;b&&d!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":d,this.parseClassMethod(i,l,p,x)}else this.parseClassField(i);return i};P.isClassElementNameStart=function(){return this.type===f.name||this.type===f.privateId||this.type===f.num||this.type===f.string||this.type===f.bracketL||this.type.keyword};P.parseClassElementName=function(e){this.type===f.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};P.parseClassMethod=function(e,t,i,a){var l=e.key;e.kind==="constructor"?(t&&this.raise(l.start,"Constructor can't be a generator"),i&&this.raise(l.start,"Constructor can't be an async method")):e.static&&tr(e,"prototype")&&this.raise(l.start,"Classes may not have a static property named prototype");var p=e.value=this.parseMethod(t,i,a);return e.kind==="get"&&p.params.length!==0&&this.raiseRecoverable(p.start,"getter should have no params"),e.kind==="set"&&p.params.length!==1&&this.raiseRecoverable(p.start,"setter should have exactly one param"),e.kind==="set"&&p.params[0].type==="RestElement"&&this.raiseRecoverable(p.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};P.parseClassField=function(e){return tr(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&tr(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(f.eq)?(this.enterScope(fi|nr),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};P.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Ct|nr);this.type!==f.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};P.parseClassId=function(e,t){this.type===f.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,ot,!1)):(t===!0&&this.unexpected(),e.id=null)};P.parseClassSuper=function(e){e.superClass=this.eat(f._extends)?this.parseExprSubscripts(null,!1):null};P.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};P.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var a=this.privateNameStack.length,l=a===0?null:this.privateNameStack[a-1],p=0;p<i.length;++p){var d=i[p];Bt(t,d.name)||(l?l.used.push(d):this.raiseRecoverable(d.start,"Private field '#"+d.name+"' must be declared in an enclosing class"))}};function Lf(e,t){var i=t.key.name,a=e[i],l="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(l=(t.static?"s":"i")+t.kind),a==="iget"&&l==="iset"||a==="iset"&&l==="iget"||a==="sget"&&l==="sset"||a==="sset"&&l==="sget"?(e[i]="true",!1):a?!0:(e[i]=l,!1)}function tr(e,t){var i=e.computed,a=e.key;return!i&&(a.type==="Identifier"&&a.name===t||a.type==="Literal"&&a.value===t)}P.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==f.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};P.parseExport=function(e,t){if(this.next(),this.eat(f.star))return this.parseExportAllDeclaration(e,t);if(this.eat(f._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==f.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,a=e.specifiers;i<a.length;i+=1){var l=a[i];this.checkUnreserved(l.local),this.checkLocalExport(l.local),l.local.type==="Literal"&&this.raise(l.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};P.parseExportDeclaration=function(e){return this.parseStatement(null)};P.parseExportDefaultDeclaration=function(){var e;if(this.type===f._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,hi|Cc,!1,e)}else if(this.type===f._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var a=this.parseMaybeAssign();return this.semicolon(),a}};P.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),Bt(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};P.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var a=0,l=t.properties;a<l.length;a+=1){var p=l[a];this.checkPatternExport(e,p)}else if(i==="ArrayPattern")for(var d=0,g=t.elements;d<g.length;d+=1){var y=g[d];y&&this.checkPatternExport(e,y)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};P.checkVariableExport=function(e,t){if(e)for(var i=0,a=t;i<a.length;i+=1){var l=a[i];this.checkPatternExport(e,l.id)}};P.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};P.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};P.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(f.braceL);!this.eat(f.braceR);){if(i)i=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;t.push(this.parseExportSpecifier(e))}return t};P.parseImport=function(e){return this.next(),this.type===f.string?(e.specifiers=If,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===f.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};P.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportSpecifier")};P.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportDefaultSpecifier")};P.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,ot),this.finishNode(e,"ImportNamespaceSpecifier")};P.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===f.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(f.comma)))return e;if(this.type===f.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(f.braceL);!this.eat(f.braceR);){if(t)t=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;e.push(this.parseImportSpecifier())}return e};P.parseWithClause=function(){var e=[];if(!this.eat(f._with))return e;this.expect(f.braceL);for(var t={},i=!0;!this.eat(f.braceR);){if(i)i=!1;else if(this.expect(f.comma),this.afterTrailingComma(f.braceR))break;var a=this.parseImportAttribute(),l=a.key.type==="Identifier"?a.key.name:a.key.value;Bt(t,l)&&this.raiseRecoverable(a.key.start,"Duplicate attribute key '"+l+"'"),t[l]=!0,e.push(a)}return e};P.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===f.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(f.colon),this.type!==f.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};P.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===f.string){var e=this.parseLiteral(this.value);return wf.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};P.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};P.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var De=le.prototype;De.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var a=0,l=e.properties;a<l.length;a+=1){var p=l[a];this.toAssignable(p,t),p.type==="RestElement"&&(p.argument.type==="ArrayPattern"||p.argument.type==="ObjectPattern")&&this.raise(p.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};De.toAssignableList=function(e,t){for(var i=e.length,a=0;a<i;a++){var l=e[a];l&&this.toAssignable(l,t)}if(i){var p=e[i-1];this.options.ecmaVersion===6&&t&&p&&p.type==="RestElement"&&p.argument.type!=="Identifier"&&this.unexpected(p.argument.start)}return e};De.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};De.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==f.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};De.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case f.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(f.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case f.braceL:return this.parseObj(!0)}return this.parseIdent()};De.parseBindingList=function(e,t,i,a){for(var l=[],p=!0;!this.eat(e);)if(p?p=!1:this.expect(f.comma),t&&this.type===f.comma)l.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===f.ellipsis){var d=this.parseRestBinding();this.parseBindingListItem(d),l.push(d),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else l.push(this.parseAssignableListItem(a))}return l};De.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};De.parseBindingListItem=function(e){return e};De.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(f.eq))return i;var a=this.startNodeAt(e,t);return a.left=i,a.right=this.parseMaybeAssign(),this.finishNode(a,"AssignmentPattern")};De.checkLValSimple=function(e,t,i){t===void 0&&(t=er);var a=t!==er;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(a?"Binding ":"Assigning to ")+e.name+" in strict mode"),a&&(t===ot&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(Bt(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==wc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":a&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return a&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(a?"Binding":"Assigning to")+" rvalue")}};De.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=er),e.type){case"ObjectPattern":for(var a=0,l=e.properties;a<l.length;a+=1){var p=l[a];this.checkLValInnerPattern(p,t,i)}break;case"ArrayPattern":for(var d=0,g=e.elements;d<g.length;d+=1){var y=g[d];y&&this.checkLValInnerPattern(y,t,i)}break;default:this.checkLValSimple(e,t,i)}};De.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=er),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var ze=function(t,i,a,l,p){this.token=t,this.isExpr=!!i,this.preserveSpace=!!a,this.override=l,this.generator=!!p},J={b_stat:new ze("{",!1),b_expr:new ze("{",!0),b_tmpl:new ze("${",!1),p_stat:new ze("(",!1),p_expr:new ze("(",!0),q_tmpl:new ze("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new ze("function",!1),f_expr:new ze("function",!0),f_expr_gen:new ze("function",!0,!1,null,!0),f_gen:new ze("function",!1,!1,null,!0)},jt=le.prototype;jt.initialContext=function(){return[J.b_stat]};jt.curContext=function(){return this.context[this.context.length-1]};jt.braceIsBlock=function(e){var t=this.curContext();return t===J.f_expr||t===J.f_stat?!0:e===f.colon&&(t===J.b_stat||t===J.b_expr)?!t.isExpr:e===f._return||e===f.name&&this.exprAllowed?Ae.test(this.input.slice(this.lastTokEnd,this.start)):e===f._else||e===f.semi||e===f.eof||e===f.parenR||e===f.arrow?!0:e===f.braceL?t===J.b_stat:e===f._var||e===f._const||e===f.name?!1:!this.exprAllowed};jt.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};jt.updateContext=function(e){var t,i=this.type;i.keyword&&e===f.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};jt.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};f.parenR.updateContext=f.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===J.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};f.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?J.b_stat:J.b_expr),this.exprAllowed=!0};f.dollarBraceL.updateContext=function(){this.context.push(J.b_tmpl),this.exprAllowed=!0};f.parenL.updateContext=function(e){var t=e===f._if||e===f._for||e===f._with||e===f._while;this.context.push(t?J.p_stat:J.p_expr),this.exprAllowed=!0};f.incDec.updateContext=function(){};f._function.updateContext=f._class.updateContext=function(e){e.beforeExpr&&e!==f._else&&!(e===f.semi&&this.curContext()!==J.p_stat)&&!(e===f._return&&Ae.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===f.colon||e===f.braceL)&&this.curContext()===J.b_stat)?this.context.push(J.f_expr):this.context.push(J.f_stat),this.exprAllowed=!1};f.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};f.backQuote.updateContext=function(){this.curContext()===J.q_tmpl?this.context.pop():this.context.push(J.q_tmpl),this.exprAllowed=!1};f.star.updateContext=function(e){if(e===f._function){var t=this.context.length-1;this.context[t]===J.f_expr?this.context[t]=J.f_expr_gen:this.context[t]=J.f_gen}this.exprAllowed=!0};f.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==f.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var R=le.prototype;R.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var a=e.key,l;switch(a.type){case"Identifier":l=a.name;break;case"Literal":l=String(a.value);break;default:return}var p=e.kind;if(this.options.ecmaVersion>=6){l==="__proto__"&&p==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=a.start):this.raiseRecoverable(a.start,"Redefinition of __proto__ property")),t.proto=!0);return}l="$"+l;var d=t[l];if(d){var g;p==="init"?g=this.strict&&d.init||d.get||d.set:g=d.init||d[p],g&&this.raiseRecoverable(a.start,"Redefinition of property")}else d=t[l]={init:!1,get:!1,set:!1};d[p]=!0}};R.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var a=i.start,l=i.startLoc,p=i.parseMaybeAssign(e,t);if(i.type===f.comma){var d=i.startNodeAt(a,l);for(d.expressions=[p];i.eat(f.comma);)d.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(d,"SequenceExpression")}return p})};R.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var a=!1,l=-1,p=-1,d=-1;t?(l=t.parenthesizedAssign,p=t.trailingComma,d=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new or,a=!0);var g=this.start,y=this.startLoc;(this.type===f.parenL||this.type===f.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,y)),this.type.isAssign){var x=this.startNodeAt(g,y);return x.operator=this.value,this.type===f.eq&&(b=this.toAssignable(b,!1,t)),a||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===f.eq?this.checkLValPattern(b):this.checkLValSimple(b),x.left=b,this.next(),x.right=this.parseMaybeAssign(e),d>-1&&(t.doubleProto=d),this.finishNode(x,"AssignmentExpression")}else a&&this.checkExpressionErrors(t,!0);return l>-1&&(t.parenthesizedAssign=l),p>-1&&(t.trailingComma=p),b};R.parseMaybeConditional=function(e,t){var i=this.start,a=this.startLoc,l=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return l;if(!(l.type==="ArrowFunctionExpression"&&l.start===i)&&this.eat(f.question)){var p=this.startNodeAt(i,a);return p.test=l,p.consequent=this.parseMaybeAssign(),this.expect(f.colon),p.alternate=this.parseMaybeAssign(e),this.finishNode(p,"ConditionalExpression")}return l};R.parseExprOps=function(e,t){var i=this.start,a=this.startLoc,l=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||l.start===i&&l.type==="ArrowFunctionExpression"?l:this.parseExprOp(l,i,a,-1,e)};R.parseExprOp=function(e,t,i,a,l){var p=this.type.binop;if(p!=null&&(!l||this.type!==f._in)&&p>a){var d=this.type===f.logicalOR||this.type===f.logicalAND,g=this.type===f.coalesce;g&&(p=f.logicalAND.binop);var y=this.value;this.next();var b=this.start,x=this.startLoc,k=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,l),b,x,p,l),c=this.buildBinary(t,i,e,k,y,d||g);return(d&&this.type===f.coalesce||g&&(this.type===f.logicalOR||this.type===f.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(c,t,i,a,l)}return e};R.buildBinary=function(e,t,i,a,l,p){a.type==="PrivateIdentifier"&&this.raise(a.start,"Private identifier can only be left side of binary expression");var d=this.startNodeAt(e,t);return d.left=i,d.operator=l,d.right=a,this.finishNode(d,p?"LogicalExpression":"BinaryExpression")};R.parseMaybeUnary=function(e,t,i,a){var l=this.start,p=this.startLoc,d;if(this.isContextual("await")&&this.canAwait)d=this.parseAwait(a),t=!0;else if(this.type.prefix){var g=this.startNode(),y=this.type===f.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,y,a),this.checkExpressionErrors(e,!0),y?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Ec(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&ya(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,d=this.finishNode(g,y?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===f.privateId)(a||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),d=this.parsePrivateIdent(),this.type!==f._in&&this.unexpected();else{if(d=this.parseExprSubscripts(e,a),this.checkExpressionErrors(e))return d;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(l,p);b.operator=this.value,b.prefix=!1,b.argument=d,this.checkLValSimple(d),this.next(),d=this.finishNode(b,"UpdateExpression")}}if(!i&&!(d.type==="ArrowFunctionExpression"&&d.start===l)&&this.eat(f.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(l,p,d,this.parseMaybeUnary(null,!1,!1,a),"**",!1);else return d};function Ec(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Ec(e.expression)}function ya(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&ya(e.expression)||e.type==="ParenthesizedExpression"&&ya(e.expression)}R.parseExprSubscripts=function(e,t){var i=this.start,a=this.startLoc,l=this.parseExprAtom(e,t);if(l.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return l;var p=this.parseSubscripts(l,i,a,!1,t);return e&&p.type==="MemberExpression"&&(e.parenthesizedAssign>=p.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=p.start&&(e.parenthesizedBind=-1),e.trailingComma>=p.start&&(e.trailingComma=-1)),p};R.parseSubscripts=function(e,t,i,a,l){for(var p=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,d=!1;;){var g=this.parseSubscript(e,t,i,a,p,d,l);if(g.optional&&(d=!0),g===e||g.type==="ArrowFunctionExpression"){if(d){var y=this.startNodeAt(t,i);y.expression=g,g=this.finishNode(y,"ChainExpression")}return g}e=g}};R.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(f.arrow)};R.parseSubscriptAsyncArrow=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,a)};R.parseSubscript=function(e,t,i,a,l,p,d){var g=this.options.ecmaVersion>=11,y=g&&this.eat(f.questionDot);a&&y&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(f.bracketL);if(b||y&&this.type!==f.parenL&&this.type!==f.backQuote||this.eat(f.dot)){var x=this.startNodeAt(t,i);x.object=e,b?(x.property=this.parseExpression(),this.expect(f.bracketR)):this.type===f.privateId&&e.type!=="Super"?x.property=this.parsePrivateIdent():x.property=this.parseIdent(this.options.allowReserved!=="never"),x.computed=!!b,g&&(x.optional=y),e=this.finishNode(x,"MemberExpression")}else if(!a&&this.eat(f.parenL)){var k=new or,c=this.yieldPos,E=this.awaitPos,L=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var q=this.parseExprList(f.parenR,this.options.ecmaVersion>=8,!1,k);if(l&&!y&&this.shouldParseAsyncArrow())return this.checkPatternErrors(k,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=c,this.awaitPos=E,this.awaitIdentPos=L,this.parseSubscriptAsyncArrow(t,i,q,d);this.checkExpressionErrors(k,!0),this.yieldPos=c||this.yieldPos,this.awaitPos=E||this.awaitPos,this.awaitIdentPos=L||this.awaitIdentPos;var K=this.startNodeAt(t,i);K.callee=e,K.arguments=q,g&&(K.optional=y),e=this.finishNode(K,"CallExpression")}else if(this.type===f.backQuote){(y||p)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var X=this.startNodeAt(t,i);X.tag=e,X.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(X,"TaggedTemplateExpression")}return e};R.parseExprAtom=function(e,t,i){this.type===f.slash&&this.readRegexp();var a,l=this.potentialArrowAt===this.start;switch(this.type){case f._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),a=this.startNode(),this.next(),this.type===f.parenL&&!this.allowDirectSuper&&this.raise(a.start,"super() call outside constructor of a subclass"),this.type!==f.dot&&this.type!==f.bracketL&&this.type!==f.parenL&&this.unexpected(),this.finishNode(a,"Super");case f._this:return a=this.startNode(),this.next(),this.finishNode(a,"ThisExpression");case f.name:var p=this.start,d=this.startLoc,g=this.containsEsc,y=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&y.name==="async"&&!this.canInsertSemicolon()&&this.eat(f._function))return this.overrideContext(J.f_expr),this.parseFunction(this.startNodeAt(p,d),0,!1,!0,t);if(l&&!this.canInsertSemicolon()){if(this.eat(f.arrow))return this.parseArrowExpression(this.startNodeAt(p,d),[y],!1,t);if(this.options.ecmaVersion>=8&&y.name==="async"&&this.type===f.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return y=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(f.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(p,d),[y],!0,t)}return y;case f.regexp:var b=this.value;return a=this.parseLiteral(b.value),a.regex={pattern:b.pattern,flags:b.flags},a;case f.num:case f.string:return this.parseLiteral(this.value);case f._null:case f._true:case f._false:return a=this.startNode(),a.value=this.type===f._null?null:this.type===f._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case f.parenL:var x=this.start,k=this.parseParenAndDistinguishExpression(l,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(k)&&(e.parenthesizedAssign=x),e.parenthesizedBind<0&&(e.parenthesizedBind=x)),k;case f.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(f.bracketR,!0,!0,e),this.finishNode(a,"ArrayExpression");case f.braceL:return this.overrideContext(J.b_expr),this.parseObj(!1,e);case f._function:return a=this.startNode(),this.next(),this.parseFunction(a,0);case f._class:return this.parseClass(this.startNode(),!1);case f._new:return this.parseNew();case f.backQuote:return this.parseTemplate();case f._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};R.parseExprAtomDefault=function(){this.unexpected()};R.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===f.parenL&&!e)return this.parseDynamicImport(t);if(this.type===f.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};R.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(f.parenR)?e.options=null:(this.expect(f.comma),this.afterTrailingComma(f.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(f.parenR)||(this.expect(f.comma),this.afterTrailingComma(f.parenR)||this.unexpected())));else if(!this.eat(f.parenR)){var t=this.start;this.eat(f.comma)&&this.eat(f.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};R.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};R.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};R.parseParenExpression=function(){this.expect(f.parenL);var e=this.parseExpression();return this.expect(f.parenR),e};R.shouldParseArrow=function(e){return!this.canInsertSemicolon()};R.parseParenAndDistinguishExpression=function(e,t){var i=this.start,a=this.startLoc,l,p=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var d=this.start,g=this.startLoc,y=[],b=!0,x=!1,k=new or,c=this.yieldPos,E=this.awaitPos,L;for(this.yieldPos=0,this.awaitPos=0;this.type!==f.parenR;)if(b?b=!1:this.expect(f.comma),p&&this.afterTrailingComma(f.parenR,!0)){x=!0;break}else if(this.type===f.ellipsis){L=this.start,y.push(this.parseParenItem(this.parseRestBinding())),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else y.push(this.parseMaybeAssign(!1,k,this.parseParenItem));var q=this.lastTokEnd,K=this.lastTokEndLoc;if(this.expect(f.parenR),e&&this.shouldParseArrow(y)&&this.eat(f.arrow))return this.checkPatternErrors(k,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=c,this.awaitPos=E,this.parseParenArrowList(i,a,y,t);(!y.length||x)&&this.unexpected(this.lastTokStart),L&&this.unexpected(L),this.checkExpressionErrors(k,!0),this.yieldPos=c||this.yieldPos,this.awaitPos=E||this.awaitPos,y.length>1?(l=this.startNodeAt(d,g),l.expressions=y,this.finishNodeAt(l,"SequenceExpression",q,K)):l=y[0]}else l=this.parseParenExpression();if(this.options.preserveParens){var X=this.startNodeAt(i,a);return X.expression=l,this.finishNode(X,"ParenthesizedExpression")}else return l};R.parseParenItem=function(e){return e};R.parseParenArrowList=function(e,t,i,a){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,a)};var _f=[];R.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===f.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var a=this.start,l=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),a,l,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(a,"Invalid use of 'super'"),this.eat(f.parenL)?e.arguments=this.parseExprList(f.parenR,this.options.ecmaVersion>=8,!1):e.arguments=_f,this.finishNode(e,"NewExpression")};R.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===f.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===f.backQuote,this.finishNode(i,"TemplateElement")};R.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var a=this.parseTemplateElement({isTagged:t});for(i.quasis=[a];!a.tail;)this.type===f.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(f.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(f.braceR),i.quasis.push(a=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};R.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===f.name||this.type===f.num||this.type===f.string||this.type===f.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===f.star)&&!Ae.test(this.input.slice(this.lastTokEnd,this.start))};R.parseObj=function(e,t){var i=this.startNode(),a=!0,l={};for(i.properties=[],this.next();!this.eat(f.braceR);){if(a)a=!1;else if(this.expect(f.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(f.braceR))break;var p=this.parseProperty(e,t);e||this.checkPropClash(p,l,t),i.properties.push(p)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};R.parseProperty=function(e,t){var i=this.startNode(),a,l,p,d;if(this.options.ecmaVersion>=9&&this.eat(f.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===f.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===f.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(p=this.start,d=this.startLoc),e||(a=this.eat(f.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!a&&this.isAsyncProp(i)?(l=!0,a=this.options.ecmaVersion>=9&&this.eat(f.star),this.parsePropertyName(i)):l=!1,this.parsePropertyValue(i,e,a,l,p,d,t,g),this.finishNode(i,"Property")};R.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var a=e.value.start;e.kind==="get"?this.raiseRecoverable(a,"getter should have no params"):this.raiseRecoverable(a,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};R.parsePropertyValue=function(e,t,i,a,l,p,d,g){(i||a)&&this.type===f.colon&&this.unexpected(),this.eat(f.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,d),e.kind="init"):this.options.ecmaVersion>=6&&this.type===f.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,a),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==f.comma&&this.type!==f.braceR&&this.type!==f.eq?((i||a)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||a)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=l),t?e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key)):this.type===f.eq&&d?(d.shorthandAssign<0&&(d.shorthandAssign=this.start),e.value=this.parseMaybeDefault(l,p,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};R.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(f.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(f.bracketR),e.key;e.computed=!1}return e.key=this.type===f.num||this.type===f.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};R.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};R.parseMethod=function(e,t,i){var a=this.startNode(),l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.initFunction(a),this.options.ecmaVersion>=6&&(a.generator=e),this.options.ecmaVersion>=8&&(a.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(wa(t,a.generator)|nr|(i?yc:0)),this.expect(f.parenL),a.params=this.parseBindingList(f.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(a,!1,!0,!1),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(a,"FunctionExpression")};R.parseArrowExpression=function(e,t,i,a){var l=this.yieldPos,p=this.awaitPos,d=this.awaitIdentPos;return this.enterScope(wa(i,!1)|Sa),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,a),this.yieldPos=l,this.awaitPos=p,this.awaitIdentPos=d,this.finishNode(e,"ArrowFunctionExpression")};R.parseFunctionBody=function(e,t,i,a){var l=t&&this.type!==f.braceL,p=this.strict,d=!1;if(l)e.body=this.parseMaybeAssign(a),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!p||g)&&(d=this.strictDirective(this.end),d&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var y=this.labels;this.labels=[],d&&(this.strict=!0),this.checkParams(e,!p&&!d&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,wc),e.body=this.parseBlock(!1,void 0,d&&!p),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=y}this.exitScope()};R.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var a=i[t];if(a.type!=="Identifier")return!1}return!0};R.checkParams=function(e,t){for(var i=Object.create(null),a=0,l=e.params;a<l.length;a+=1){var p=l[a];this.checkLValInnerPattern(p,Ca,t?null:i)}};R.parseExprList=function(e,t,i,a){for(var l=[],p=!0;!this.eat(e);){if(p)p=!1;else if(this.expect(f.comma),t&&this.afterTrailingComma(e))break;var d=void 0;i&&this.type===f.comma?d=null:this.type===f.ellipsis?(d=this.parseSpread(a),a&&this.type===f.comma&&a.trailingComma<0&&(a.trailingComma=this.start)):d=this.parseMaybeAssign(!1,a),l.push(d)}return l};R.checkUnreserved=function(e){var t=e.start,i=e.end,a=e.name;if(this.inGenerator&&a==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&sr)&&a==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(a==="arguments"||a==="await")&&this.raise(t,"Cannot use "+a+" in class static initialization block"),this.keywords.test(a)&&this.raise(t,"Unexpected keyword '"+a+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var l=this.strict?this.reservedWordsStrict:this.reservedWords;l.test(a)&&(!this.inAsync&&a==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+a+"' is reserved"))}};R.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};R.parseIdentNode=function(){var e=this.startNode();return this.type===f.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=f.name):this.unexpected(),e};R.parsePrivateIdent=function(){var e=this.startNode();return this.type===f.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};R.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===f.semi||this.canInsertSemicolon()||this.type!==f.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(f.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};R.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var ir=le.prototype;ir.raise=function(e,t){var i=gc(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var a=new SyntaxError(t);throw a.pos=e,a.loc=i,a.raisedAt=this.pos,a};ir.raiseRecoverable=ir.raise;ir.curPosition=function(){if(this.options.locations)return new di(this.curLine,this.pos-this.lineStart)};var ft=le.prototype,$f=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};ft.enterScope=function(e){this.scopeStack.push(new $f(e))};ft.exitScope=function(){this.scopeStack.pop()};ft.treatFunctionsAsVarInScope=function(e){return e.flags&wt||!this.inModule&&e.flags&St};ft.declareName=function(e,t,i){var a=!1;if(t===ot){var l=this.currentScope();a=l.lexical.indexOf(e)>-1||l.functions.indexOf(e)>-1||l.var.indexOf(e)>-1,l.lexical.push(e),this.inModule&&l.flags&St&&delete this.undefinedExports[e]}else if(t===Sc){var p=this.currentScope();p.lexical.push(e)}else if(t===kc){var d=this.currentScope();this.treatFunctionsAsVar?a=d.lexical.indexOf(e)>-1:a=d.lexical.indexOf(e)>-1||d.var.indexOf(e)>-1,d.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var y=this.scopeStack[g];if(y.lexical.indexOf(e)>-1&&!(y.flags&xc&&y.lexical[0]===e)||!this.treatFunctionsAsVarInScope(y)&&y.functions.indexOf(e)>-1){a=!0;break}if(y.var.push(e),this.inModule&&y.flags&St&&delete this.undefinedExports[e],y.flags&sr)break}a&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};ft.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};ft.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};ft.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(sr|fi|Ct))return t}};ft.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(sr|fi|Ct)&&!(t.flags&Sa))return t}};var lr=function(t,i,a){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new ar(t,a)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},mi=le.prototype;mi.startNode=function(){return new lr(this,this.start,this.startLoc)};mi.startNodeAt=function(e,t){return new lr(this,e,t)};function Ac(e,t,i,a){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=a),this.options.ranges&&(e.range[1]=i),e}mi.finishNode=function(e,t){return Ac.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};mi.finishNodeAt=function(e,t,i,a){return Ac.call(this,e,t,i,a)};mi.copyNode=function(e){var t=new lr(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Pf="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Tc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Ic=Tc+" Extended_Pictographic",Lc=Ic,_c=Lc+" EBase EComp EMod EPres ExtPict",$c=_c,Nf=$c,Rf={9:Tc,10:Ic,11:Lc,12:_c,13:$c,14:Nf},Ff="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",Of={9:"",10:"",11:"",12:"",13:"",14:Ff},lc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",Pc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Nc=Pc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Rc=Nc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",Fc=Rc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Oc=Fc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Mf=Oc+" "+Pf,Df={9:Pc,10:Nc,11:Rc,12:Fc,13:Oc,14:Mf},Mc={};function Vf(e){var t=Mc[e]={binary:ht(Rf[e]+" "+lc),binaryOfStrings:ht(Of[e]),nonBinary:{General_Category:ht(lc),Script:ht(Df[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(Xi=0,ma=[9,10,11,12,13,14];Xi<ma.length;Xi+=1)cc=ma[Xi],Vf(cc);var cc,Xi,ma,$=le.prototype,rr=function(t,i){this.parent=t,this.base=i||this};rr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var a=t;a;a=a.parent)if(i.base===a.base&&i!==a)return!0;return!1};rr.prototype.sibling=function(){return new rr(this.parent,this.base)};var Qe=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=Mc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};Qe.prototype.reset=function(t,i,a){var l=a.indexOf("v")!==-1,p=a.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=a,l&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=p&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=p&&this.parser.options.ecmaVersion>=9)};Qe.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};Qe.prototype.at=function(t,i){i===void 0&&(i=!1);var a=this.source,l=a.length;if(t>=l)return-1;var p=a.charCodeAt(t);if(!(i||this.switchU)||p<=55295||p>=57344||t+1>=l)return p;var d=a.charCodeAt(t+1);return d>=56320&&d<=57343?(p<<10)+d-56613888:p};Qe.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var a=this.source,l=a.length;if(t>=l)return l;var p=a.charCodeAt(t),d;return!(i||this.switchU)||p<=55295||p>=57344||t+1>=l||(d=a.charCodeAt(t+1))<56320||d>57343?t+1:t+2};Qe.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};Qe.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};Qe.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};Qe.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};Qe.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var a=this.pos,l=0,p=t;l<p.length;l+=1){var d=p[l],g=this.at(a,i);if(g===-1||g!==d)return!1;a=this.nextIndex(a,i)}return this.pos=a,!0};$.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,a=!1,l=!1,p=0;p<i.length;p++){var d=i.charAt(p);t.indexOf(d)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(d,p+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),d==="u"&&(a=!0),d==="v"&&(l=!0)}this.options.ecmaVersion>=15&&a&&l&&this.raise(e.start,"Invalid regular expression flag")};function Bf(e){for(var t in e)return!0;return!1}$.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Bf(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};$.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var a=i[t];e.groupNames[a]||e.raise("Invalid named capture referenced")}};$.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new rr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};$.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};$.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};$.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};$.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};$.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};$.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var a=0,l=-1;if(this.regexp_eatDecimalDigits(e)&&(a=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(l=e.lastIntValue),e.eat(125)))return l!==-1&&l<a&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};$.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};$.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};$.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),a=e.eat(45);if(i||a){for(var l=0;l<i.length;l++){var p=i.charAt(l);i.indexOf(p,l+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(a){var d=this.regexp_eatModifiers(e);!i&&!d&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<d.length;g++){var y=d.charAt(g);(d.indexOf(y,g+1)>-1||i.indexOf(y)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};$.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};$.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&jf(i);)t+=nt(i),e.advance();return t};function jf(e){return e===105||e===109||e===115}$.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};$.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};$.regexp_eatSyntaxCharacter=function(e){var t=e.current();return Dc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Dc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}$.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!Dc(i);)e.advance();return e.pos!==t};$.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};$.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var a=0,l=i;a<l.length;a+=1){var p=l[a];p.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};$.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};$.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=nt(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=nt(e.lastIntValue);return!0}return!1};$.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),Uf(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function Uf(e){return Ye(e,!0)||e===36||e===95}$.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,a=e.current(i);return e.advance(i),a===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(a=e.lastIntValue),Hf(a)?(e.lastIntValue=a,!0):(e.pos=t,!1)};function Hf(e){return dt(e,!0)||e===36||e===95||e===8204||e===8205}$.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};$.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};$.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};$.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};$.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};$.regexp_eatZero=function(e){return e.current()===48&&!cr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};$.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};$.regexp_eatControlLetter=function(e){var t=e.current();return Vc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function Vc(e){return e>=65&&e<=90||e>=97&&e<=122}$.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,a=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var l=e.lastIntValue;if(a&&l>=55296&&l<=56319){var p=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var d=e.lastIntValue;if(d>=56320&&d<=57343)return e.lastIntValue=(l-55296)*1024+(d-56320)+65536,!0}e.pos=p,e.lastIntValue=l}return!0}if(a&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&zf(e.lastIntValue))return!0;a&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function zf(e){return e>=0&&e<=1114111}$.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};$.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var Bc=0,st=1,Oe=2;$.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(Gf(t))return e.lastIntValue=-1,e.advance(),st;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var a;if(e.eat(123)&&(a=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&a===Oe&&e.raise("Invalid property name"),a;e.raise("Invalid property name")}return Bc};function Gf(e){return e===100||e===68||e===115||e===83||e===119||e===87}$.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var a=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,a),st}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var l=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,l)}return Bc};$.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){Bt(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};$.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return st;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return Oe;e.raise("Invalid property name")};$.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";jc(t=e.current());)e.lastStringValue+=nt(t),e.advance();return e.lastStringValue!==""};function jc(e){return Vc(e)||e===95}$.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";Wf(t=e.current());)e.lastStringValue+=nt(t),e.advance();return e.lastStringValue!==""};function Wf(e){return jc(e)||cr(e)}$.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};$.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===Oe&&e.raise("Negated character class may contain strings"),!0}return!1};$.regexp_classContents=function(e){return e.current()===93?st:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),st)};$.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};$.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||zc(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var a=e.current();return a!==93?(e.lastIntValue=a,e.advance(),!0):!1};$.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};$.regexp_classSetExpression=function(e){var t=st,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===Oe&&(t=Oe);for(var a=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==Oe&&(t=st);continue}e.raise("Invalid character in character class")}if(a!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(a!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===Oe&&(t=Oe)}};$.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var a=e.lastIntValue;return i!==-1&&a!==-1&&i>a&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};$.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?st:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};$.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),a=this.regexp_classContents(e);if(e.eat(93))return i&&a===Oe&&e.raise("Negated character class may contain strings"),a;e.pos=t}if(e.eat(92)){var l=this.regexp_eatCharacterClassEscape(e);if(l)return l;e.pos=t}return null};$.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};$.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===Oe&&(t=Oe);return t};$.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?st:Oe};$.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&qf(i)||Kf(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function qf(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function Kf(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}$.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return Yf(t)?(e.lastIntValue=t,e.advance(),!0):!1};function Yf(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}$.regexp_eatClassControlLetter=function(e){var t=e.current();return cr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};$.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};$.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;cr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function cr(e){return e>=48&&e<=57}$.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Uc(i=e.current());)e.lastIntValue=16*e.lastIntValue+Hc(i),e.advance();return e.pos!==t};function Uc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Hc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}$.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};$.regexp_eatOctalDigit=function(e){var t=e.current();return zc(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function zc(e){return e>=48&&e<=55}$.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var a=0;a<t;++a){var l=e.current();if(!Uc(l))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+Hc(l),e.advance()}return!0};var Aa=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new ar(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},V=le.prototype;V.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Aa(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};V.getToken=function(){return this.next(),new Aa(this)};typeof Symbol<"u"&&(V[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===f.eof,value:t}}}});V.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(f.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};V.readToken=function(e){return Ye(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};V.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};V.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};V.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var a=void 0,l=t;(a=dc(this.input,l,this.pos))>-1;)++this.curLine,l=this.lineStart=a;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};V.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),a=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!Vt(a);)a=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};V.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&fc.test(String.fromCharCode(e)))++this.pos;else break e}}};V.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};V.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(f.ellipsis)):(++this.pos,this.finishToken(f.dot))};V.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(f.assign,2):this.finishOp(f.slash,1)};V.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,a=e===42?f.star:f.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,a=f.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(f.assign,i+1):this.finishOp(a,i)};V.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(f.assign,3)}return this.finishOp(e===124?f.logicalOR:f.logicalAND,2)}return t===61?this.finishOp(f.assign,2):this.finishOp(e===124?f.bitwiseOR:f.bitwiseAND,1)};V.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(f.assign,2):this.finishOp(f.bitwiseXOR,1)};V.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Ae.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(f.incDec,2):t===61?this.finishOp(f.assign,2):this.finishOp(f.plusMin,1)};V.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(f.assign,i+1):this.finishOp(f.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(f.relational,i))};V.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(f.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(f.arrow)):this.finishOp(e===61?f.eq:f.prefix,1)};V.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(f.questionDot,2)}if(t===63){if(e>=12){var a=this.input.charCodeAt(this.pos+2);if(a===61)return this.finishOp(f.assign,3)}return this.finishOp(f.coalesce,2)}}return this.finishOp(f.question,1)};V.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),Ye(t,!0)||t===92))return this.finishToken(f.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+nt(t)+"'")};V.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(f.parenL);case 41:return++this.pos,this.finishToken(f.parenR);case 59:return++this.pos,this.finishToken(f.semi);case 44:return++this.pos,this.finishToken(f.comma);case 91:return++this.pos,this.finishToken(f.bracketL);case 93:return++this.pos,this.finishToken(f.bracketR);case 123:return++this.pos,this.finishToken(f.braceL);case 125:return++this.pos,this.finishToken(f.braceR);case 58:return++this.pos,this.finishToken(f.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(f.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(f.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+nt(e)+"'")};V.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};V.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var a=this.input.charAt(this.pos);if(Ae.test(a)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(a==="[")t=!0;else if(a==="]"&&t)t=!1;else if(a==="/"&&!t)break;e=a==="\\"}++this.pos}var l=this.input.slice(i,this.pos);++this.pos;var p=this.pos,d=this.readWord1();this.containsEsc&&this.unexpected(p);var g=this.regexpState||(this.regexpState=new Qe(this));g.reset(i,l,d),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var y=null;try{y=new RegExp(l,d)}catch{}return this.finishToken(f.regexp,{pattern:l,flags:d,value:y})};V.readInt=function(e,t,i){for(var a=this.options.ecmaVersion>=12&&t===void 0,l=i&&this.input.charCodeAt(this.pos)===48,p=this.pos,d=0,g=0,y=0,b=t??1/0;y<b;++y,++this.pos){var x=this.input.charCodeAt(this.pos),k=void 0;if(a&&x===95){l&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),y===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=x;continue}if(x>=97?k=x-97+10:x>=65?k=x-65+10:x>=48&&x<=57?k=x-48:k=1/0,k>=e)break;g=x,d=d*e+k}return a&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===p||t!=null&&this.pos-p!==t?null:d};function Qf(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function Gc(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}V.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=Gc(this.input.slice(t,this.pos)),++this.pos):Ye(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(f.num,i)};V.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var a=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&a===110){var l=Gc(this.input.slice(t,this.pos));return++this.pos,Ye(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(f.num,l)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),a===46&&!i&&(++this.pos,this.readInt(10),a=this.input.charCodeAt(this.pos)),(a===69||a===101)&&!i&&(a=this.input.charCodeAt(++this.pos),(a===43||a===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),Ye(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var p=Qf(this.input.slice(t,this.pos),i);return this.finishToken(f.num,p)};V.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};V.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var a=this.input.charCodeAt(this.pos);if(a===e)break;a===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):a===8232||a===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(Vt(a)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(f.string,t)};var Wc={};V.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===Wc)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};V.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw Wc;this.raise(e,t)};V.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===f.template||this.type===f.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(f.dollarBraceL)):(++this.pos,this.finishToken(f.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(f.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(Vt(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};V.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(f.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};V.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return nt(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var a=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],l=parseInt(a,8);return l>255&&(a=a.slice(0,-1),l=parseInt(a,8)),this.pos+=a.length-1,t=this.input.charCodeAt(this.pos),(a!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-a.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(l)}return Vt(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};V.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};V.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,a=this.options.ecmaVersion>=6;this.pos<this.input.length;){var l=this.fullCharCodeAtPos();if(dt(l,a))this.pos+=l<=65535?1:2;else if(l===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var p=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var d=this.readCodePoint();(t?Ye:dt)(d,a)||this.invalidStringToken(p,"Invalid Unicode escape"),e+=nt(d),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};V.readWord=function(){var e=this.readWord1(),t=f.name;return this.keywords.test(e)&&(t=va[e]),this.finishToken(t,e)};var Zf="8.18.0";le.acorn={Parser:le,version:Zf,defaultOptions:ba,Position:di,SourceLocation:ar,getLineInfo:gc,Node:lr,TokenType:G,tokTypes:f,keywordTypes:va,TokContext:ze,tokContexts:J,isIdentifierChar:dt,isIdentifierStart:Ye,Token:Aa,isNewLine:Vt,lineBreak:Ae,lineBreakG:vf,nonASCIIwhitespace:fc};function qc(e,t){return le.parse(e,t)}var Ut=null,gi=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let a;return Ut!==null?(a=Ut,Ut=Ut.cursor,a.prev=t,a.next=i,a.cursor=this.cursor):a={prev:t,next:i,cursor:this.cursor},this.cursor=a,a}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=Ut,Ut=t}updateCursors(t,i,a,l){let{cursor:p}=this;for(;p!==null;)p.prev===t&&(p.prev=i),p.next===a&&(p.next=l),p=p.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let a of t){let l=e.createItem(a);i!==null?i.next=l:this.head=l,l.prev=i,i=l}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let a=this.allocateCursor(null,this.head);for(;a.next!==null;){let l=a.next;a.next=l.next,t.call(i,l.data,l,this)}this.releaseCursor()}forEachRight(t,i=this){let a=this.allocateCursor(this.tail,null);for(;a.prev!==null;){let l=a.prev;a.prev=l.prev,t.call(i,l.data,l,this)}this.releaseCursor()}reduce(t,i,a=this){let l=this.allocateCursor(null,this.head),p=i,d;for(;l.next!==null;)d=l.next,l.next=d.next,p=t.call(a,p,d.data,d,this);return this.releaseCursor(),p}reduceRight(t,i,a=this){let l=this.allocateCursor(this.tail,null),p=i,d;for(;l.prev!==null;)d=l.prev,l.prev=d.prev,p=t.call(a,p,d.data,d,this);return this.releaseCursor(),p}some(t,i=this){for(let a=this.head;a!==null;a=a.next)if(t.call(i,a.data,a,this))return!0;return!1}map(t,i=this){let a=new e;for(let l=this.head;l!==null;l=l.next)a.appendData(t.call(i,l.data,l,this));return a}filter(t,i=this){let a=new e;for(let l=this.head;l!==null;l=l.next)t.call(i,l.data,l,this)&&a.appendData(l.data);return a}nextUntil(t,i,a=this){if(t===null)return;let l=this.allocateCursor(null,t);for(;l.next!==null;){let p=l.next;if(l.next=p.next,i.call(a,p.data,p,this))break}this.releaseCursor()}prevUntil(t,i,a=this){if(t===null)return;let l=this.allocateCursor(t,null);for(;l.prev!==null;){let p=l.prev;if(l.prev=p.prev,i.call(a,p.data,p,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function Kc(e,t){let i=Object.create(SyntaxError.prototype),a=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(a.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var Ta=100,Yc=60,Qc="    ";function Zc({source:e,line:t,column:i,baseLine:a,baseColumn:l},p){function d(L,q){return b.slice(L,q).map((K,X)=>String(L+X+1).padStart(c)+" |"+K).join(`
`)}let g=`
`.repeat(Math.max(a-1,0)),y=" ".repeat(Math.max(l-1,0)),b=(g+y+e).split(/\r\n?|\n|\f/),x=Math.max(1,t-p)-1,k=Math.min(t+p,b.length+1),c=Math.max(4,String(k).length)+1,E=0;i+=(Qc.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>Ta&&(E=i-Yc+3,i=Yc-2);for(let L=x;L<=k;L++)L>=0&&L<b.length&&(b[L]=b[L].replace(/\t/g,Qc),b[L]=(E>0&&b[L].length>E?"\u2026":"")+b[L].substr(E,Ta-2)+(b[L].length>E+Ta-1?"\u2026":""));return[d(x,t),new Array(i+c+2).join("-")+"^",d(t,k)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Ia(e,t,i,a,l,p=1,d=1){return Object.assign(Kc("SyntaxError",e),{source:t,offset:i,line:a,column:l,sourceFragment(y){return Zc({source:t,line:a,column:l,baseLine:p,baseColumn:d},isNaN(y)?0:y)},get formattedMessage(){return`Parse error: ${e}
`+Zc({source:t,line:a,column:l,baseLine:p,baseColumn:d},2)}})}function ye(e){return e>=48&&e<=57}function Ze(e){return ye(e)||e>=65&&e<=70||e>=97&&e<=102}function pr(e){return e>=65&&e<=90}function Jf(e){return e>=97&&e<=122}function Xf(e){return pr(e)||Jf(e)}function em(e){return e>=128}function ur(e){return Xf(e)||em(e)||e===95}function hr(e){return ur(e)||ye(e)||e===45}function tm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function bi(e){return e===10||e===13||e===12}function Je(e){return bi(e)||e===32||e===9}function Te(e,t){return!(e!==92||bi(t)||t===0)}function dr(e,t,i){return e===45?ur(t)||t===45||Te(t,i):ur(e)?!0:e===92?Te(e,t):!1}function fr(e,t,i){return e===43||e===45?ye(t)?2:t===46&&ye(i)?3:0:e===46?ye(t)?2:0:ye(e)?1:0}function mr(e){return e===65279||e===65534?1:0}var La=new Array(128),im=128,xi=130,_a=131,gr=132,$a=133;for(let e=0;e<La.length;e++)La[e]=Je(e)&&xi||ye(e)&&_a||ur(e)&&gr||tm(e)&&$a||e||im;function br(e){return e<128?La[e]:gr}function Ht(e,t){return t<e.length?e.charCodeAt(t):0}function xr(e,t,i){return i===13&&Ht(e,t+1)===10?2:1}function Na(e,t,i){let a=e.charCodeAt(t);return pr(a)&&(a=a|32),a===i}function Et(e,t,i,a){if(i-t!==a.length||t<0||i>e.length)return!1;for(let l=t;l<i;l++){let p=a.charCodeAt(l-t),d=e.charCodeAt(l);if(pr(d)&&(d=d|32),d!==p)return!1}return!0}function Jc(e,t){for(;t>=0&&Je(e.charCodeAt(t));t--);return t+1}function yi(e,t){for(;t<e.length&&Je(e.charCodeAt(t));t++);return t}function Pa(e,t){for(;t<e.length&&ye(e.charCodeAt(t));t++);return t}function lt(e,t){if(t+=2,Ze(Ht(e,t-1))){for(let a=Math.min(e.length,t+5);t<a&&Ze(Ht(e,t));t++);let i=Ht(e,t);Je(i)&&(t+=xr(e,t,i))}return t}function vi(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!hr(i)){if(Te(i,Ht(e,t+1))){t=lt(e,t)-1;continue}break}}return t}function yr(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),ye(i)&&(t=Pa(e,t+1),i=e.charCodeAt(t)),i===46&&ye(e.charCodeAt(t+1))&&(t+=2,t=Pa(e,t)),Na(e,t,101)){let a=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(a=1,i=e.charCodeAt(t+2)),ye(i)&&(t=Pa(e,t+1+a+1))}return t}function vr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Te(i,Ht(e,t+1))&&(t=lt(e,t))}return t}function kr(e){if(e.length===1&&!Ze(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var zt=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function Gt(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var Xc=10,rm=12,eu=13;function tu(e){let t=e.source,i=t.length,a=t.length>0?mr(t.charCodeAt(0)):0,l=Gt(e.lines,i),p=Gt(e.columns,i),d=e.startLine,g=e.startColumn;for(let y=a;y<i;y++){let b=t.charCodeAt(y);l[y]=d,p[y]=g++,(b===Xc||b===eu||b===rm)&&(b===eu&&y+1<i&&t.charCodeAt(y+1)===Xc&&(y++,l[y]=d,p[y]=g),d++,g=1)}l[i]=d,p[i]=g,e.lines=l,e.columns=p,e.computed=!0}var Sr=class{constructor(t,i,a,l){this.setSource(t,i,a,l),this.lines=null,this.columns=null}setSource(t="",i=0,a=1,l=1){this.source=t,this.startOffset=i,this.startLine=a,this.startColumn=l,this.computed=!1}getLocation(t,i){return this.computed||tu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,a){return this.computed||tu(this),{source:a,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var Ge=16777215,We=24,Si=1,Cr=2,mt=new Uint8Array(32);mt[2]=22;mt[21]=22;mt[19]=20;mt[23]=24;var qe=new Uint8Array(32);qe[2]=Si;qe[21]=Si;qe[19]=Si;qe[23]=Si;qe[22]=Cr;qe[20]=Cr;qe[24]=Cr;function iu(e,t,i){return e<t?t:e>i?i:e}var wr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let a=t.length,l=Gt(this.offsetAndType,t.length+1),p=Gt(this.balance,t.length+1),d=0,g=-1,y=0,b=t.length;this.offsetAndType=null,this.balance=null,p.fill(0),i(t,(x,k,c)=>{let E=d++;if(l[E]=x<<We|c,g===-1&&(g=k),p[E]=b,x===y){let L=p[b];p[b]=E,b=L,y=mt[l[L]>>We]}else this.isBlockOpenerTokenType(x)&&(b=E,y=mt[x])}),l[d]=0<<We|a,p[d]=d;for(let x=0;x<d;x++){let k=p[x];if(k<=x){let c=p[k];c!==x&&(p[x]=c)}else k>d&&(p[x]=d)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=d,this.offsetAndType=l,this.balance=p,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>We:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>We;if(a!==13&&a!==25&&t--===0)return a}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Ge:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let a=this.offsetAndType[i]>>We;if(a!==13&&a!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?Et(this.source,this.offsetAndType[t-1]&Ge,this.offsetAndType[t]&Ge,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Ge:this.offsetAndType[this.tokenCount]&Ge:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[iu(t,0,this.tokenCount)]&Ge}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[iu(t,0,this.tokenCount)]>>We}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return qe[t]===Si}isBlockCloserTokenType(t){return qe[t]===Cr}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(qe[i]===1){let a=this.balance[t],l=this.getTokenType(a);return mt[i]===l?a:-1}else if(qe[i]===2){let a=this.balance[t],l=this.getTokenType(a);return mt[l]===i?a:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&Ge,i=this.offsetAndType[i],this.tokenType=i>>We,this.tokenEnd=i&Ge):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>We,this.tokenEnd=t&Ge):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let a=t,l=0,p=0;e:for(;a<this.tokenCount;a++){if(l=this.balance[a],l<t)break e;switch(p=a>0?this.offsetAndType[a-1]&Ge:this.firstCharOffset,i(this.source.charCodeAt(p))){case 1:break e;case 2:a++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[a]>>We)&&(a=l)}}this.skip(a-this.tokenIndex)}forEachToken(t){for(let i=0,a=this.firstCharOffset;i<this.tokenCount;i++){let l=a,p=this.offsetAndType[i],d=p&Ge,g=p>>We;a=d,t(g,l,d,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,a,l,p)=>{t[p]={idx:p,type:zt[i],chunk:this.source.substring(a,l),balance:this.balance[p]}}),t}};function Er(e,t){function i(k){return k<g?e.charCodeAt(k):0}function a(){if(b=yr(e,b),dr(i(b),i(b+1),i(b+2))){x=12,b=vi(e,b);return}if(i(b)===37){x=11,b++;return}x=10}function l(){let k=b;if(b=vi(e,b),Et(e,k,b,"url")&&i(b)===40){if(b=yi(e,b+1),i(b)===34||i(b)===39){x=2,b=k+4;return}d();return}if(i(b)===40){x=2,b++;return}x=1}function p(k){for(k||(k=i(b++)),x=5;b<e.length;b++){let c=e.charCodeAt(b);switch(br(c)){case k:b++;return;case xi:if(bi(c)){b+=xr(e,b,c),x=6;return}break;case 92:if(b===e.length-1)break;let E=i(b+1);bi(E)?b+=xr(e,b+1,E):Te(c,E)&&(b=lt(e,b)-1);break}}}function d(){for(x=7,b=yi(e,b);b<e.length;b++){let k=e.charCodeAt(b);switch(br(k)){case 41:b++;return;case xi:if(b=yi(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=vr(e,b),x=8;return;case 34:case 39:case 40:case $a:b=vr(e,b),x=8;return;case 92:if(Te(k,i(b+1))){b=lt(e,b)-1;break}b=vr(e,b),x=8;return}}}e=String(e||"");let g=e.length,y=mr(i(0)),b=y,x;for(;b<g;){let k=e.charCodeAt(b);switch(br(k)){case xi:x=13,b=yi(e,b+1);break;case 34:p();break;case 35:hr(i(b+1))||Te(i(b+1),i(b+2))?(x=4,b=vi(e,b+1)):(x=9,b++);break;case 39:p();break;case 40:x=21,b++;break;case 41:x=22,b++;break;case 43:fr(k,i(b+1),i(b+2))?a():(x=9,b++);break;case 44:x=18,b++;break;case 45:fr(k,i(b+1),i(b+2))?a():i(b+1)===45&&i(b+2)===62?(x=15,b=b+3):dr(k,i(b+1),i(b+2))?l():(x=9,b++);break;case 46:fr(k,i(b+1),i(b+2))?a():(x=9,b++);break;case 47:i(b+1)===42?(x=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(x=9,b++);break;case 58:x=16,b++;break;case 59:x=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(x=14,b=b+4):(x=9,b++);break;case 64:dr(i(b+1),i(b+2),i(b+3))?(x=3,b=vi(e,b+1)):(x=9,b++);break;case 91:x=19,b++;break;case 92:Te(k,i(b+1))?l():(x=9,b++);break;case 93:x=20,b++;break;case 123:x=23,b++;break;case 125:x=24,b++;break;case _a:a();break;case gr:l();break;default:x=9,b++}t(x,y,y=b)}}function ru(e){let t=this.createList(),i=!1,a={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let l=e.getNode.call(this,a);if(l===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,l,t,a),i=!1),t.push(l)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,a),t}var Kt=()=>{},am=33,nm=35,Fa=59,au=123,nu=0,sm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},om={createList(){return new gi},createSingleNodeList(e){return new gi().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function lm(e){return function(){return this[e]()}}function Oa(e){let t=Object.create(null);for(let i of Object.keys(e)){let a=e[i],l=a.parse||a;l&&(t[i]=l)}return t}function cm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Oa(e.atrule),pseudo:Oa(e.pseudo),node:Oa(e.node)};for(let[i,a]of Object.entries(e.parseContext))switch(typeof a){case"function":t.context[i]=a;break;case"string":t.context[i]=lm(a);break}return{config:t,...t,...t.node}}function su(e){let t="",i="<unknown>",a=!1,l=Kt,p=!1,d=new Sr,g=Object.assign(new wr,cm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:ru,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(x){return x===au?1:0},consumeUntilLeftCurlyBracketOrSemicolon(x){return x===au||x===Fa?1:0},consumeUntilExclamationMarkOrSemicolon(x){return x===am||x===Fa?1:0},consumeUntilSemicolonIncluded(x){return x===Fa?2:0},createList:Kt,createSingleNodeList:Kt,getFirstListNode:Kt,getLastListNode:Kt,parseWithFallback(x,k){let c=this.tokenIndex;try{return x.call(this)}catch(E){if(p)throw E;this.skip(c-this.tokenIndex);let L=k.call(this);return p=!0,l(E,L),p=!1,L}},lookupNonWSType(x){let k;do if(k=this.lookupType(x++),k!==13&&k!==25)return k;while(k!==nu);return nu},charCodeAt(x){return x>=0&&x<t.length?t.charCodeAt(x):0},substring(x,k){return t.substring(x,k)},substrToCursor(x){return this.source.substring(x,this.tokenStart)},cmpChar(x,k){return Na(t,x,k)},cmpStr(x,k,c){return Et(t,x,k,c)},consume(x){let k=this.tokenStart;return this.eat(x),this.substrToCursor(k)},consumeFunctionName(){let x=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),x},consumeNumber(x){let k=t.substring(this.tokenStart,yr(t,this.tokenStart));return this.eat(x),k},eat(x){if(this.tokenType!==x){let k=zt[x].slice(0,-6).replace(/-/g," ").replace(/^./,L=>L.toUpperCase()),c=`${/[[\](){}]/.test(k)?`"${k}"`:k} is expected`,E=this.tokenStart;switch(x){case 1:this.tokenType===2||this.tokenType===7?(E=this.tokenEnd-1,c="Identifier is expected but function found"):c="Identifier is expected";break;case 4:this.isDelim(nm)&&(this.next(),E++,c="Name is expected");break;case 11:this.tokenType===10&&(E=this.tokenEnd,c="Percent sign is expected");break}this.error(c,E)}this.next()},eatIdent(x){(this.tokenType!==1||this.lookupValue(0,x)===!1)&&this.error(`Identifier "${x}" is expected`),this.next()},eatDelim(x){this.isDelim(x)||this.error(`Delim "${String.fromCharCode(x)}" is expected`),this.next()},getLocation(x,k){return a?d.getLocationRange(x,k,i):null},getLocationFromList(x){if(a){let k=this.getFirstListNode(x),c=this.getLastListNode(x);return d.getLocationRange(k!==null?k.loc.start.offset-d.startOffset:this.tokenStart,c!==null?c.loc.end.offset-d.startOffset:this.tokenStart,i)}return null},error(x,k){let c=typeof k<"u"&&k<t.length?d.getLocation(k):this.eof?d.getLocation(Jc(t,t.length-1)):d.getLocation(this.tokenStart);throw new Ia(x||"Unexpected input",t,c.offset,c.line,c.column,d.startLine,d.startColumn)}}),y=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:x=>g.getTokenType(x),getTokenTypeName:x=>zt[g.getTokenType(x)],getTokenStart:x=>g.getTokenStart(x),getTokenEnd:x=>g.getTokenEnd(x),getTokenValue:x=>g.source.substring(g.getTokenStart(x),g.getTokenEnd(x)),substring:(x,k)=>g.source.substring(x,k),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:x=>g.getBlockTokenPairIndex(x),getLocation:x=>d.getLocation(x,i),getRangeLocation:(x,k)=>d.getLocationRange(x,k,i)});return Object.assign(function(x,k){t=x,k=k||{},g.setSource(t,Er),d.setSource(t,k.offset,k.line,k.column),i=k.filename||"<unknown>",a=!!k.positions,l=typeof k.onParseError=="function"?k.onParseError:Kt,p=!1,g.parseAtrulePrelude="parseAtrulePrelude"in k?!!k.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in k?!!k.parseRulePrelude:!0,g.parseValue="parseValue"in k?!!k.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in k?!!k.parseCustomProperty:!1;let{context:c="default",list:E=!0,onComment:L,onToken:q}=k;if(!(c in g.context))throw new Error("Unknown context `"+c+"`");Object.assign(g,E?om:sm),Array.isArray(q)?g.forEachToken((X,fe,oe)=>{q.push({type:X,start:fe,end:oe})}):typeof q=="function"&&g.forEachToken(q.bind(y())),typeof L=="function"&&g.forEachToken((X,fe,oe)=>{if(X===25){let it=g.getLocation(fe,oe),Xt=Et(t,oe-2,oe,"*/")?t.slice(fe+2,oe-2):t.slice(fe+2,oe);L(Xt,it)}});let K=g.context[c].call(g,k);return g.eof||g.error(),K},{SyntaxError:Ia,config:g.config})}var Ma={};N(Ma,{AtrulePrelude:()=>lu,Selector:()=>uu,Value:()=>fu});var um=35,pm=42,ou=43,hm=45,dm=47,fm=117;function wi(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,fm)&&this.cmpChar(this.tokenStart+1,ou)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===dm||t===pm||t===ou||t===hm)return this.Operator();t===um&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var lu={getNode:wi};var mm=35,gm=38,bm=42,xm=43,ym=47,cu=46,vm=62,km=124,Sm=126;function wm(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Cm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===cu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case xm:case vm:case Sm:case ym:return this.Combinator();case cu:return this.ClassSelector();case bm:case km:return this.TypeSelector();case mm:return this.IdSelector();case gm:return this.NestingSelector()}break}}}var uu={onWhiteSpace:wm,getNode:Cm};function pu(){return this.createSingleNodeList(this.Raw(null,!1))}function hu(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let a=t-this.tokenIndex;a<=0;a++)if(this.lookupType(a)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function du(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var fu={getNode:wi,onWhiteSpace(e,t){du(e)&&(e.value=" "+e.value),du(t.last)&&(t.last.value+=" ")},expression:pu,var:hu};var Em=new Set(["none","and","not","or"]),mu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);Em.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var gu={parse:{prelude:null,block(){return this.Block(!0)}}};function Da(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var bu={layer(){this.skipSC();let e=this.createList(),t=Da.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Da.call(this,this.Declaration,()=>Da.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},xu={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,bu)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,bu)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var yu={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var vu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var ku={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Su={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var wu={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Cu={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Eu={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Au={container:mu,"font-face":gu,import:xu,layer:yu,media:vu,nest:ku,page:Su,scope:wu,"starting-style":Cu,supports:Eu};function Tu(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Tt={parse(){return this.createSingleNodeList(this.SelectorList())}},Va={parse(){return this.createSingleNodeList(this.Selector())}},Am={parse(){return this.createSingleNodeList(this.Identifier())}},Tm={parse:Tu},Ar={parse(){return this.createSingleNodeList(this.Nth())}},Iu={dir:Am,has:Tt,lang:Tm,matches:Tt,is:Tt,"-moz-any":Tt,"-webkit-any":Tt,where:Tt,not:Tt,"nth-child":Ar,"nth-last-child":Ar,"nth-last-of-type":Ar,"nth-of-type":Ar,slotted:Va,host:Va,"host-context":Va};var Fo={};N(Fo,{AnPlusB:()=>ja,Atrule:()=>za,AtrulePrelude:()=>qa,AttributeSelector:()=>Za,Block:()=>en,Brackets:()=>an,CDC:()=>on,CDO:()=>un,ClassSelector:()=>dn,Combinator:()=>gn,Comment:()=>yn,Condition:()=>Sn,Declaration:()=>En,DeclarationList:()=>Ln,Dimension:()=>Pn,Feature:()=>Fn,FeatureFunction:()=>Dn,FeatureRange:()=>Un,Function:()=>Gn,GeneralEnclosed:()=>Kn,Hash:()=>Zn,IdSelector:()=>rs,Identifier:()=>es,Layer:()=>ss,LayerList:()=>cs,MediaQuery:()=>hs,MediaQueryList:()=>ms,NestingSelector:()=>xs,Nth:()=>ks,Number:()=>Cs,Operator:()=>Ts,Parentheses:()=>_s,Percentage:()=>Ns,PseudoClassSelector:()=>Os,PseudoElementSelector:()=>Vs,Ratio:()=>Us,Raw:()=>Gs,Rule:()=>Ks,Scope:()=>Zs,Selector:()=>eo,SelectorList:()=>ro,String:()=>oo,StyleSheet:()=>uo,SupportsDeclaration:()=>fo,TypeSelector:()=>xo,UnicodeRange:()=>So,Url:()=>Ao,Value:()=>Lo,WhiteSpace:()=>Po});var Ha={};N(Ha,{generate:()=>Ua,name:()=>Lm,parse:()=>ja,structure:()=>_m});var tt=43,$e=45,Tr=110,It=!0,Im=!1;function Ir(e,t){let i=this.tokenStart+e,a=this.charCodeAt(i);for((a===tt||a===$e)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)ye(this.charCodeAt(i))||this.error("Integer is expected",i)}function Yt(e){return Ir.call(this,0,e)}function bt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Tr:i="N is expected";break;case $e:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function Ba(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(tt,e)||this.isDelim($e,e)){t=this.isDelim(tt,e)?tt:$e;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),Yt.call(this,It))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==tt&&i!==$e&&this.error("Number sign is expected")),Yt.call(this,t!==0),t===$e?"-"+this.consume(10):this.consume(10)}var Lm="AnPlusB",_m={a:[String,null],b:[String,null]};function ja(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)Yt.call(this,Im),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,$e))switch(t="-1",bt.call(this,1,Tr),this.tokenEnd-this.tokenStart){case 2:this.next(),i=Ba.call(this);break;case 3:bt.call(this,2,$e),this.next(),this.skipSC(),Yt.call(this,It),i="-"+this.consume(10);break;default:bt.call(this,2,$e),Ir.call(this,3,It),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(tt)&&this.lookupType(1)===1){let a=0;switch(t="1",this.isDelim(tt)&&(a=1,this.next()),bt.call(this,0,Tr),this.tokenEnd-this.tokenStart){case 1:this.next(),i=Ba.call(this);break;case 2:bt.call(this,1,$e),this.next(),this.skipSC(),Yt.call(this,It),i="-"+this.consume(10);break;default:bt.call(this,1,$e),Ir.call(this,2,It),this.next(),i=this.substrToCursor(e+a+1)}}else if(this.tokenType===12){let a=this.charCodeAt(this.tokenStart),l=a===tt||a===$e,p=this.tokenStart+l;for(;p<this.tokenEnd&&ye(this.charCodeAt(p));p++);p===this.tokenStart+l&&this.error("Integer is expected",this.tokenStart+l),bt.call(this,p-this.tokenStart,Tr),t=this.substring(e,p),p+1===this.tokenEnd?(this.next(),i=Ba.call(this)):(bt.call(this,p-this.tokenStart+1,$e),p+2===this.tokenEnd?(this.next(),this.skipSC(),Yt.call(this,It),i="-"+this.consume(10)):(Ir.call(this,p-this.tokenStart+2,It),this.next(),i=this.substrToCursor(p+1)))}else this.error();return t!==null&&t.charCodeAt(0)===tt&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===tt&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function Ua(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var Wa={};N(Wa,{generate:()=>Ga,name:()=>Pm,parse:()=>za,structure:()=>Rm,walkContext:()=>Nm});function Lu(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function $m(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Pm="Atrule",Nm="atrule",Rm={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function za(e=!1){let t=this.tokenStart,i,a,l=null,p=null;switch(this.eat(3),i=this.substrToCursor(t+1),a=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?l=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Lu):l=Lu.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,a)&&typeof this.atrule[a].block=="function"?p=this.atrule[a].block.call(this,e):p=this.Block($m.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:l,block:p}}function Ga(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var Ya={};N(Ya,{generate:()=>Ka,name:()=>Fm,parse:()=>qa,structure:()=>Mm,walkContext:()=>Om});var Fm="AtrulePrelude",Om="atrulePrelude",Mm={children:[[]]};function qa(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function Ka(e){this.children(e)}var Xa={};N(Xa,{generate:()=>Ja,name:()=>Hm,parse:()=>Za,structure:()=>zm});var Dm=36,_u=42,Lr=61,Vm=94,Qa=124,Bm=126;function jm(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(_u)?(t=!0,this.next()):this.isDelim(Qa)||this.eat(1),this.isDelim(Qa)?this.charCodeAt(this.tokenStart+1)!==Lr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Um(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==Lr&&t!==Bm&&t!==Vm&&t!==Dm&&t!==_u&&t!==Qa&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==Lr&&(this.isDelim(Lr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var Hm="AttributeSelector",zm={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function Za(){let e=this.tokenStart,t,i=null,a=null,l=null;return this.eat(19),this.skipSC(),t=jm.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=Um.call(this),this.skipSC(),a=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(l=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:a,flags:l}}function Ja(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var rn={};N(rn,{generate:()=>tn,name:()=>qm,parse:()=>en,structure:()=>Ym,walkContext:()=>Km});var Gm=38;function Nu(){return this.Raw(null,!0)}function $u(){return this.parseWithFallback(this.Rule,Nu)}function Pu(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Wm(){if(this.tokenType===17)return Pu.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,Pu);return this.tokenType===17&&this.next(),e}var qm="Block",Km="block",Ym={children:[["Atrule","Rule","Declaration"]]};function en(e){let t=e?Wm:$u,i=this.tokenStart,a=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:a.push(this.parseWithFallback(this.Atrule.bind(this,e),Nu));break;default:e&&this.isDelim(Gm)?a.push($u.call(this)):a.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:a}}function tn(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var sn={};N(sn,{generate:()=>nn,name:()=>Qm,parse:()=>an,structure:()=>Zm});var Qm="Brackets",Zm={children:[[]]};function an(e,t){let i=this.tokenStart,a=null;return this.eat(19),a=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:a}}function nn(e){this.token(9,"["),this.children(e),this.token(9,"]")}var cn={};N(cn,{generate:()=>ln,name:()=>Jm,parse:()=>on,structure:()=>Xm});var Jm="CDC",Xm=[];function on(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function ln(){this.token(15,"-->")}var hn={};N(hn,{generate:()=>pn,name:()=>eg,parse:()=>un,structure:()=>tg});var eg="CDO",tg=[];function un(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function pn(){this.token(14,"<!--")}var mn={};N(mn,{generate:()=>fn,name:()=>rg,parse:()=>dn,structure:()=>ag});var ig=46,rg="ClassSelector",ag={name:String};function dn(){return this.eatDelim(ig),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function fn(e){this.token(9,"."),this.token(1,e.name)}var xn={};N(xn,{generate:()=>bn,name:()=>lg,parse:()=>gn,structure:()=>cg});var ng=43,Ru=47,sg=62,og=126,lg="Combinator",cg={name:String};function gn(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case sg:case ng:case og:this.next();break;case Ru:this.next(),this.eatIdent("deep"),this.eatDelim(Ru);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function bn(e){this.tokenize(e.name)}var kn={};N(kn,{generate:()=>vn,name:()=>hg,parse:()=>yn,structure:()=>dg});var ug=42,pg=47,hg="Comment",dg={value:String};function yn(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===ug&&this.charCodeAt(t-1)===pg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function vn(e){this.token(25,"/*"+e.value+"*/")}var Cn={};N(Cn,{generate:()=>wn,name:()=>mg,parse:()=>Sn,structure:()=>gg});var fg=new Set([16,22,0]),mg="Condition",gg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function Fu(e){return this.lookupTypeNonSC(1)===1&&fg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var bg={media:Fu,container:Fu,supports(){return this.SupportsDeclaration()}};function Sn(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>bg[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let a=this.Condition(e);return this.eat(22),a},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function wn(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var Tn={};N(Tn,{generate:()=>An,name:()=>Ag,parse:()=>En,structure:()=>Ig,walkContext:()=>Tg});var Ou=45;function Mu(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Ou&&e.charCodeAt(t+1)===Ou}var Vu=33,xg=35,yg=36,vg=38,kg=42,Sg=43,Du=47;function wg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Cg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Eg(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Vu)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Ag="Declaration",Tg="declaration",Ig={important:[Boolean,String],property:String,value:["Value","Raw"]};function En(){let e=this.tokenStart,t=this.tokenIndex,i=Lg.call(this),a=Mu(i),l=a?this.parseCustomProperty:this.parseValue,p=a?Cg:wg,d=!1,g;this.skipSC(),this.eat(16);let y=this.tokenIndex;if(a||this.skipSC(),l?g=this.parseWithFallback(Eg,p):g=p.call(this,this.tokenIndex),a&&g.type==="Value"&&g.children.isEmpty){for(let b=y-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Vu)&&(d=_g.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:d,property:i,value:g}}function An(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function Lg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case kg:case yg:case Sg:case xg:case vg:this.next();break;case Du:this.next(),this.isDelim(Du)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function _g(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var $n={};N($n,{generate:()=>_n,name:()=>Pg,parse:()=>Ln,structure:()=>Ng});var $g=38;function In(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var Pg="DeclarationList",Ng={children:[["Declaration","Atrule","Rule"]]};function Ln(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),In));break;default:this.isDelim($g)?e.push(this.parseWithFallback(this.Rule,In)):e.push(this.parseWithFallback(this.Declaration,In))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function _n(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var Rn={};N(Rn,{generate:()=>Nn,name:()=>Rg,parse:()=>Pn,structure:()=>Fg});var Rg="Dimension",Fg={value:String,unit:String};function Pn(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Nn(e){this.token(12,e.value+e.unit)}var Mn={};N(Mn,{generate:()=>On,name:()=>Mg,parse:()=>Fn,structure:()=>Dg});var Og=47,Mg="Feature",Dg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function Fn(e){let t=this.tokenStart,i,a=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?a=this.Ratio():a=this.Number();break;case 12:a=this.Dimension();break;case 1:a=this.Identifier();break;case 2:a=this.parseWithFallback(()=>{let l=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Og)&&this.error(),l},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:a}}function On(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var Bn={};N(Bn,{generate:()=>Vn,name:()=>Vg,parse:()=>Dn,structure:()=>Bg});var Vg="FeatureFunction",Bg={kind:String,feature:String,value:["Declaration","Selector"]};function jg(e,t){let a=(this.features[e]||{})[t];return typeof a!="function"&&this.error(`Unknown feature ${t}()`),a}function Dn(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),a=jg.call(this,e,i.toLowerCase());this.skipSC();let l=this.parseWithFallback(()=>{let p=this.tokenIndex,d=a.call(this);return this.eof===!1&&this.isBalanceEdge(p)===!1&&this.error(),d},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:l}}function Vn(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var zn={};N(zn,{generate:()=>Hn,name:()=>zg,parse:()=>Un,structure:()=>Gg});var Bu=47,Ug=60,ju=61,Hg=62,zg="FeatureRange",Gg={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function jn(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(Bu,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Bu)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Uu(e){if(this.skipSC(),this.isDelim(Ug)||this.isDelim(Hg)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(ju)?(this.next(),t+"="):t}if(this.isDelim(ju))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function Un(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=jn.call(this),a=Uu.call(this,i.type==="Identifier"),l=jn.call(this),p=null,d=null;return this.lookupNonWSType(0)!==22&&(p=Uu.call(this),d=jn.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:a,middle:l,rightComparison:p,right:d}}function Hn(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var qn={};N(qn,{generate:()=>Wn,name:()=>Wg,parse:()=>Gn,structure:()=>Kg,walkContext:()=>qg});var Wg="Function",qg="function",Kg={name:String,children:[[]]};function Gn(e,t){let i=this.tokenStart,a=this.consumeFunctionName(),l=a.toLowerCase(),p;return p=t.hasOwnProperty(l)?t[l].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:a,children:p}}function Wn(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var Qn={};N(Qn,{generate:()=>Yn,name:()=>Yg,parse:()=>Kn,structure:()=>Qg});var Yg="GeneralEnclosed",Qg={kind:String,function:[String,null],children:[[]]};function Kn(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let a=this.parseWithFallback(()=>{let l=this.tokenIndex,p=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(l)===!1&&this.error(),p},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:a}}function Yn(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var Xn={};N(Xn,{generate:()=>Jn,name:()=>Jg,parse:()=>Zn,structure:()=>Xg,xxx:()=>Zg});var Zg="XXX",Jg="Hash",Xg={value:String};function Zn(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function Jn(e){this.token(4,"#"+e.value)}var is={};N(is,{generate:()=>ts,name:()=>e0,parse:()=>es,structure:()=>t0});var e0="Identifier",t0={name:String};function es(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function ts(e){this.token(1,e.name)}var ns={};N(ns,{generate:()=>as,name:()=>i0,parse:()=>rs,structure:()=>r0});var i0="IdSelector",r0={name:String};function rs(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function as(e){this.token(9,"#"+e.name)}var ls={};N(ls,{generate:()=>os,name:()=>n0,parse:()=>ss,structure:()=>s0});var a0=46,n0="Layer",s0={name:String};function ss(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(a0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function os(e){this.tokenize(e.name)}var ps={};N(ps,{generate:()=>us,name:()=>o0,parse:()=>cs,structure:()=>l0});var o0="LayerList",l0={children:[["Layer"]]};function cs(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function us(e){this.children(e,()=>this.token(18,","))}var fs={};N(fs,{generate:()=>ds,name:()=>c0,parse:()=>hs,structure:()=>u0});var c0="MediaQuery",u0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function hs(){let e=this.tokenStart,t=null,i=null,a=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let l=this.consume(1),p=l.toLowerCase();switch(p==="not"||p==="only"?(this.skipSC(),t=p,i=this.consume(1)):i=l,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),a=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{a=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:a}}function ds(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var bs={};N(bs,{generate:()=>gs,name:()=>p0,parse:()=>ms,structure:()=>h0});var p0="MediaQueryList",h0={children:[["MediaQuery"]]};function ms(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function gs(e){this.children(e,()=>this.token(18,","))}var vs={};N(vs,{generate:()=>ys,name:()=>f0,parse:()=>xs,structure:()=>m0});var d0=38,f0="NestingSelector",m0={};function xs(){let e=this.tokenStart;return this.eatDelim(d0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function ys(){this.token(9,"&")}var ws={};N(ws,{generate:()=>Ss,name:()=>g0,parse:()=>ks,structure:()=>b0});var g0="Nth",b0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function ks(){this.skipSC();let e=this.tokenStart,t=e,i=null,a;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?a=this.Identifier():a=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:a,selector:i}}function Ss(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var As={};N(As,{generate:()=>Es,name:()=>x0,parse:()=>Cs,structure:()=>y0});var x0="Number",y0={value:String};function Cs(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function Es(e){this.token(10,e.value)}var Ls={};N(Ls,{generate:()=>Is,name:()=>v0,parse:()=>Ts,structure:()=>k0});var v0="Operator",k0={value:String};function Ts(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Is(e){this.tokenize(e.value)}var Ps={};N(Ps,{generate:()=>$s,name:()=>S0,parse:()=>_s,structure:()=>w0});var S0="Parentheses",w0={children:[[]]};function _s(e,t){let i=this.tokenStart,a=null;return this.eat(21),a=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:a}}function $s(e){this.token(21,"("),this.children(e),this.token(22,")")}var Fs={};N(Fs,{generate:()=>Rs,name:()=>C0,parse:()=>Ns,structure:()=>E0});var C0="Percentage",E0={value:String};function Ns(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Rs(e){this.token(11,e.value+"%")}var Ds={};N(Ds,{generate:()=>Ms,name:()=>A0,parse:()=>Os,structure:()=>I0,walkContext:()=>T0});var A0="PseudoClassSelector",T0="function",I0={name:String,children:[["Raw"],null]};function Os(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Ms(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var js={};N(js,{generate:()=>Bs,name:()=>L0,parse:()=>Vs,structure:()=>$0,walkContext:()=>_0});var L0="PseudoElementSelector",_0="function",$0={name:String,children:[["Raw"],null]};function Vs(){let e=this.tokenStart,t=null,i,a;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),a=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,a)?(this.skipSC(),t=this.pseudo[a].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Bs(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var zs={};N(zs,{generate:()=>Hs,name:()=>P0,parse:()=>Us,structure:()=>N0});var Hu=47;function zu(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var P0="Ratio",N0={left:["Number","Function"],right:["Number","Function",null]};function Us(){let e=this.tokenStart,t=zu.call(this),i=null;return this.skipSC(),this.isDelim(Hu)&&(this.eatDelim(Hu),i=zu.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function Hs(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var qs={};N(qs,{generate:()=>Ws,name:()=>F0,parse:()=>Gs,structure:()=>O0});function R0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var F0="Raw",O0={value:String};function Gs(e,t){let i=this.getTokenStart(this.tokenIndex),a;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?a=R0.call(this):a=this.tokenStart,{type:"Raw",loc:this.getLocation(i,a),value:this.substring(i,a)}}function Ws(e){this.tokenize(e.value)}var Qs={};N(Qs,{generate:()=>Ys,name:()=>D0,parse:()=>Ks,structure:()=>B0,walkContext:()=>V0});function Gu(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function M0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var D0="Rule",V0="rule",B0={prelude:["SelectorList","Raw"],block:["Block"]};function Ks(){let e=this.tokenIndex,t=this.tokenStart,i,a;return this.parseRulePrelude?i=this.parseWithFallback(M0,Gu):i=Gu.call(this,e),a=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:a}}function Ys(e){this.node(e.prelude),this.node(e.block)}var Xs={};N(Xs,{generate:()=>Js,name:()=>j0,parse:()=>Zs,structure:()=>U0});var j0="Scope",U0={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function Zs(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function Js(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var io={};N(io,{generate:()=>to,name:()=>H0,parse:()=>eo,structure:()=>z0});var H0="Selector",z0={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function eo(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function to(e){this.children(e)}var no={};N(no,{generate:()=>ao,name:()=>G0,parse:()=>ro,structure:()=>q0,walkContext:()=>W0});var G0="SelectorList",W0="selector",q0={children:[["Selector","Raw"]]};function ro(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function ao(e){this.children(e,()=>this.token(18,","))}var co={};N(co,{generate:()=>lo,name:()=>Y0,parse:()=>oo,structure:()=>Q0});var so=92,Wu=34,qu=39;function _r(e){let t=e.length,i=e.charCodeAt(0),a=i===Wu||i===qu?1:0,l=a===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,p="";for(let d=a;d<=l;d++){let g=e.charCodeAt(d);if(g===so){if(d===l){d!==t-1&&(p=e.substr(d+1));break}if(g=e.charCodeAt(++d),Te(so,g)){let y=d-1,b=lt(e,y);d=b-1,p+=kr(e.substring(y+1,b))}else g===13&&e.charCodeAt(d+1)===10&&d++}else p+=e[d]}return p}function Ku(e,t){let i=t?"'":'"',a=t?qu:Wu,l="",p=!1;for(let d=0;d<e.length;d++){let g=e.charCodeAt(d);if(g===0){l+="\uFFFD";continue}if(g<=31||g===127){l+="\\"+g.toString(16),p=!0;continue}g===a||g===so?(l+="\\"+e.charAt(d),p=!1):(p&&(Ze(g)||Je(g))&&(l+=" "),l+=e.charAt(d),p=!1)}return i+l+i}var Y0="String",Q0={value:String};function oo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:_r(this.consume(5))}}function lo(e){this.token(5,Ku(e.value))}var ho={};N(ho,{generate:()=>po,name:()=>J0,parse:()=>uo,structure:()=>eb,walkContext:()=>X0});var Z0=33;function Yu(){return this.Raw(null,!1)}var J0="StyleSheet",X0="stylesheet",eb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function uo(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==Z0){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,Yu);break;default:i=this.parseWithFallback(this.Rule,Yu)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function po(e){this.children(e)}var go={};N(go,{generate:()=>mo,name:()=>tb,parse:()=>fo,structure:()=>ib});var tb="SupportsDeclaration",ib={declaration:"Declaration"};function fo(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function mo(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var vo={};N(vo,{generate:()=>yo,name:()=>ab,parse:()=>xo,structure:()=>nb});var rb=42,Qu=124;function bo(){this.tokenType!==1&&this.isDelim(rb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var ab="TypeSelector",nb={name:String};function xo(){let e=this.tokenStart;return this.isDelim(Qu)?(this.next(),bo.call(this)):(bo.call(this),this.isDelim(Qu)&&(this.next(),bo.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function yo(e){this.tokenize(e.name)}var Co={};N(Co,{generate:()=>wo,name:()=>lb,parse:()=>So,structure:()=>cb});var Zu=43,Ju=45,ko=63;function Ci(e,t){let i=0;for(let a=this.tokenStart+e;a<this.tokenEnd;a++){let l=this.charCodeAt(a);if(l===Ju&&t&&i!==0)return Ci.call(this,e+i+1,!1),-1;Ze(l)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",a),++i>6&&this.error("Too many hex digits",a)}return this.next(),i}function $r(e){let t=0;for(;this.isDelim(ko);)++t>e&&this.error("Too many question marks"),this.next()}function sb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===Zu?"Plus sign":"Hyphen minus")+" is expected")}function ob(){let e=0;switch(this.tokenType){case 10:if(e=Ci.call(this,1,!0),this.isDelim(ko)){$r.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){sb.call(this,Ju),Ci.call(this,1,!1);break}break;case 12:e=Ci.call(this,1,!0),e>0&&$r.call(this,6-e);break;default:if(this.eatDelim(Zu),this.tokenType===1){e=Ci.call(this,0,!0),e>0&&$r.call(this,6-e);break}if(this.isDelim(ko)){this.next(),$r.call(this,5);break}this.error("Hex digit or question mark is expected")}}var lb="UnicodeRange",cb={value:String};function So(){let e=this.tokenStart;return this.eatIdent("u"),ob.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function wo(e){this.tokenize(e.value)}var Io={};N(Io,{generate:()=>To,name:()=>mb,parse:()=>Ao,structure:()=>gb});var ub=32,Eo=92,pb=34,hb=39,db=40,Xu=41;function ep(e){let t=e.length,i=4,a=e.charCodeAt(t-1)===Xu?t-2:t-1,l="";for(;i<a&&Je(e.charCodeAt(i));)i++;for(;i<a&&Je(e.charCodeAt(a));)a--;for(let p=i;p<=a;p++){let d=e.charCodeAt(p);if(d===Eo){if(p===a){p!==t-1&&(l=e.substr(p+1));break}if(d=e.charCodeAt(++p),Te(Eo,d)){let g=p-1,y=lt(e,g);p=y-1,l+=kr(e.substring(g+1,y))}else d===13&&e.charCodeAt(p+1)===10&&p++}else l+=e[p]}return l}function tp(e){let t="",i=!1;for(let a=0;a<e.length;a++){let l=e.charCodeAt(a);if(l===0){t+="\uFFFD";continue}if(l<=31||l===127){t+="\\"+l.toString(16),i=!0;continue}l===ub||l===Eo||l===pb||l===hb||l===db||l===Xu?(t+="\\"+e.charAt(a),i=!1):(i&&Ze(l)&&(t+=" "),t+=e.charAt(a),i=!1)}return"url("+t+")"}var mb="Url",gb={value:String};function Ao(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=ep(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=_r(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function To(e){this.token(7,tp(e.value))}var $o={};N($o,{generate:()=>_o,name:()=>bb,parse:()=>Lo,structure:()=>xb});var bb="Value",xb={children:[[]]};function Lo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function _o(e){this.children(e)}var Ro={};N(Ro,{generate:()=>No,name:()=>vb,parse:()=>Po,structure:()=>kb});var yb=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),vb="WhiteSpace",kb={value:String};function Po(){return this.eat(13),yb}function No(e){this.token(13,e.value)}var ip={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Ma,atrule:Au,pseudo:Iu,node:Fo};var rp=su(ip);var{hasOwnProperty:Oo}=Object.prototype,Ei=function(){};function ap(e){return typeof e=="function"?e:Ei}function np(e,t){return function(i,a,l){i.type===t&&e.call(this,i,a,l)}}function Sb(e,t){let i=t.structure,a=[];for(let l in i){if(Oo.call(i,l)===!1)continue;let p=i[l],d={name:l,type:!1,nullable:!1};Array.isArray(p)||(p=[p]);for(let g of p)g===null?d.nullable=!0:typeof g=="string"?d.type="node":Array.isArray(g)&&(d.type="list");d.type&&a.push(d)}return a.length?{context:t.walkContext,fields:a}:null}function wb(e){let t={};for(let i in e.node)if(Oo.call(e.node,i)){let a=e.node[i];if(!a.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Sb(i,a)}return t}function sp(e,t){let i=e.fields.slice(),a=e.context,l=typeof a=="string";return t&&i.reverse(),function(p,d,g,y){let b;l&&(b=d[a],d[a]=p);for(let x of i){let k=p[x.name];if(!x.nullable||k){if(x.type==="list"){if(t?k.reduceRight(y,!1):k.reduce(y,!1))return!0}else if(g(k))return!0}}l&&(d[a]=b)}}function op({StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:l}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:a},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:a,DeclarationList:l}}}function lp(e){let t=wb(e),i={},a={},l=Symbol("break-walk"),p=Symbol("skip-node");for(let b in t)Oo.call(t,b)&&t[b]!==null&&(i[b]=sp(t[b],!1),a[b]=sp(t[b],!0));let d=op(i),g=op(a),y=function(b,x){function k(X,fe,oe){let it=c.call(K,X,fe,oe);return it===l?!0:it===p?!1:!!(L.hasOwnProperty(X.type)&&L[X.type](X,K,k,q)||E.call(K,X,fe,oe)===l)}let c=Ei,E=Ei,L=i,q=(X,fe,oe,it)=>X||k(fe,oe,it),K={break:l,skip:p,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof x=="function")c=x;else if(x&&(c=ap(x.enter),E=ap(x.leave),x.reverse&&(L=a),x.visit)){if(d.hasOwnProperty(x.visit))L=x.reverse?g[x.visit]:d[x.visit];else if(!t.hasOwnProperty(x.visit))throw new Error("Bad value `"+x.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");c=np(c,x.visit),E=np(E,x.visit)}if(c===Ei&&E===Ei)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");k(b)};return y.break=l,y.skip=p,y.find=function(b,x){let k=null;return y(b,function(c,E,L){if(x.call(this,c,E,L))return k=c,l}),k},y.findLast=function(b,x){let k=null;return y(b,{reverse:!0,enter(c,E,L){if(x.call(this,c,E,L))return k=c,l}}),k},y.findAll=function(b,x){let k=[];return y(b,function(c,E,L){x.call(this,c,E,L)&&k.push(c)}),k},y}var Mo={};N(Mo,{AnPlusB:()=>Ha,Atrule:()=>Wa,AtrulePrelude:()=>Ya,AttributeSelector:()=>Xa,Block:()=>rn,Brackets:()=>sn,CDC:()=>cn,CDO:()=>hn,ClassSelector:()=>mn,Combinator:()=>xn,Comment:()=>kn,Condition:()=>Cn,Declaration:()=>Tn,DeclarationList:()=>$n,Dimension:()=>Rn,Feature:()=>Mn,FeatureFunction:()=>Bn,FeatureRange:()=>zn,Function:()=>qn,GeneralEnclosed:()=>Qn,Hash:()=>Xn,IdSelector:()=>ns,Identifier:()=>is,Layer:()=>ls,LayerList:()=>ps,MediaQuery:()=>fs,MediaQueryList:()=>bs,NestingSelector:()=>vs,Nth:()=>ws,Number:()=>As,Operator:()=>Ls,Parentheses:()=>Ps,Percentage:()=>Fs,PseudoClassSelector:()=>Ds,PseudoElementSelector:()=>js,Ratio:()=>zs,Raw:()=>qs,Rule:()=>Qs,Scope:()=>Xs,Selector:()=>io,SelectorList:()=>no,String:()=>co,StyleSheet:()=>ho,SupportsDeclaration:()=>go,TypeSelector:()=>vo,UnicodeRange:()=>Co,Url:()=>Io,Value:()=>$o,WhiteSpace:()=>Ro});var cp={node:Mo};var up=lp(cp);var $p=ff(Lp(),1),_p=new Set(["Atrule","Selector","Declaration"]);function Pp(e){let t=new $p.SourceMapGenerator,i={line:1,column:0},a={line:0,column:0},l={line:1,column:0},p={generated:l},d=1,g=0,y=!1,b=e.node;e.node=function(c){if(c.loc&&c.loc.start&&_p.has(c.type)){let E=c.loc.start.line,L=c.loc.start.column-1;(a.line!==E||a.column!==L)&&(a.line=E,a.column=L,i.line=d,i.column=g,y&&(y=!1,(i.line!==l.line||i.column!==l.column)&&t.addMapping(p)),y=!0,t.addMapping({source:c.loc.source,original:a,generated:i}))}b.call(this,c),y&&_p.has(c.type)&&(l.line=d,l.column=g)};let x=e.emit;e.emit=function(c,E,L){for(let q=0;q<c.length;q++)c.charCodeAt(q)===10?(d++,g=0):g++;x(c,E,L)};let k=e.result;return e.result=function(){return y&&t.addMapping(p),{css:k(),map:t}},e}var Fr={};N(Fr,{safe:()=>Go,spec:()=>Gb});var Ub=43,Hb=45,zo=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Np=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],zb=Np.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Rp(e){let t=new Set(e.map(([i,a])=>zo(i)<<16|zo(a)));return function(i,a,l){let p=zo(a,l),d=l.charCodeAt(0),g=d===Hb&&a!==1&&a!==2&&a!==15||d===Ub?t.has((i&65534)<<16|d<<7):t.has((i&65534)<<16|p);return p|g}}var Gb=Rp(Np),Go=Rp(zb);var Wb=92;function qb(e,t){if(typeof t=="function"){let i=null;e.children.forEach(a=>{i!==null&&t.call(this,i),this.node(a),i=a});return}e.children.forEach(this.node,this)}function Fp(e){let t=new Map;for(let[i,a]of Object.entries(e.node))typeof(a.generate||a)=="function"&&t.set(i,a.generate||a);return function(i,a){let l="",p=0,d={node(y){if(t.has(y.type))t.get(y.type).call(g,y);else throw new Error("Unknown node type: "+y.type)},tokenBefore:Go,token(y,b,x){p=this.tokenBefore(p,y,b),!x&&p&1&&this.emit(" ",13,!0),this.emit(b,y,!1),y===9&&b.charCodeAt(0)===Wb&&this.emit(`
`,13,!0)},emit(y){l+=y},result(){return l}};a&&(typeof a.decorator=="function"&&(d=a.decorator(d)),a.sourceMap&&(d=Pp(d)),a.mode in Fr&&(d.tokenBefore=Fr[a.mode]));let g={node:y=>d.node(y),children:qb,token:(y,b)=>d.token(y,b),tokenize:y=>Er(y,(b,x,k)=>{d.token(b,y.slice(x,k),x!==0)})};return d.node(i),d.result()}}var Wo={};N(Wo,{AnPlusB:()=>Ua,Atrule:()=>Ga,AtrulePrelude:()=>Ka,AttributeSelector:()=>Ja,Block:()=>tn,Brackets:()=>nn,CDC:()=>ln,CDO:()=>pn,ClassSelector:()=>fn,Combinator:()=>bn,Comment:()=>vn,Condition:()=>wn,Declaration:()=>An,DeclarationList:()=>_n,Dimension:()=>Nn,Feature:()=>On,FeatureFunction:()=>Vn,FeatureRange:()=>Hn,Function:()=>Wn,GeneralEnclosed:()=>Yn,Hash:()=>Jn,IdSelector:()=>as,Identifier:()=>ts,Layer:()=>os,LayerList:()=>us,MediaQuery:()=>ds,MediaQueryList:()=>gs,NestingSelector:()=>ys,Nth:()=>Ss,Number:()=>Es,Operator:()=>Is,Parentheses:()=>$s,Percentage:()=>Rs,PseudoClassSelector:()=>Ms,PseudoElementSelector:()=>Bs,Ratio:()=>Hs,Raw:()=>Ws,Rule:()=>Ys,Scope:()=>Js,Selector:()=>to,SelectorList:()=>ao,String:()=>lo,StyleSheet:()=>po,SupportsDeclaration:()=>mo,TypeSelector:()=>yo,UnicodeRange:()=>wo,Url:()=>To,Value:()=>_o,WhiteSpace:()=>No});var Op={node:Wo};var qo=Fp(Op);var Ii="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),Kb=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),Dp=new Set(["__proto__","prototype","constructor"]);function Or(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(a=>Or(a,t)):i&&typeof i=="object"&&Or(i,t)}}function Zt(e){return e?e.computed?e.property?.value:e.property?.name:""}function Jt(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!Jt(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=Jt(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(Jt);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let a=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||Dp.has(String(a)))throw new Error("Property static tidak aman");t[a]=Jt(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function Mp(e,t){let i=null;return Or(e,a=>{if(i)return;let l=a.type==="VariableDeclarator"&&a.id.name===t,p=a.type==="AssignmentExpression"&&a.left.type==="MemberExpression"&&["window","globalThis"].includes(a.left.object.name)&&Zt(a.left)===t;if(l||p)try{i=Jt(l?a.init:a.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function Yb(e){let t=new WeakMap,i=(l,p,d=null)=>{l&&(l.type==="Identifier"?p.bindings.set(l.name,d):l.type==="RestElement"?i(l.argument,p):l.type==="AssignmentPattern"?i(l.left,p):l.type==="ArrayPattern"?l.elements.forEach(g=>i(g,p)):l.type==="ObjectPattern"&&l.properties.forEach(g=>i(g.value||g.argument,p)))},a=(l,p)=>{if(!l||typeof l!="object")return;let d=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(l.type);l.type==="FunctionDeclaration"&&i(l.id,p);let g=d||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(l.type),y=g?{parent:p,bindings:new Map,functionScope:null}:p;g&&(y.functionScope=d||l.type==="Program"?y:p.functionScope),t.set(l,y),d&&(l.id&&i(l.id,y),l.params.forEach(b=>i(b,y))),l.type==="CatchClause"&&i(l.param,y),l.type==="VariableDeclaration"&&l.declarations.forEach(b=>i(b.id,l.kind==="var"?y.functionScope:y,b.init));for(let b of Object.values(l))Array.isArray(b)?b.forEach(x=>a(x,y)):b&&typeof b=="object"&&a(b,y)};return a(e,null),t}function Qb(e){let t=[],i=Yb(e),a=(g,y=new Set)=>{if(g?.type!=="Identifier"||y.has(g))return g;y.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return a(b.bindings.get(g.name),y);return g},l=g=>(g=a(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&Zt(g)==="document"),p=g=>(g=a(g),g?.type==="MemberExpression"?l(g.object)&&Zt(g)==="body":g?.type==="CallExpression"&&l(g.callee.object)&&Zt(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),d=g=>(g=a(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||Zt(g.callee)==="MutationObserver"));return Or(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||Zt(g.callee)!=="observe"||!d(g.callee.object)||!p(g.arguments[0]))return;let y;try{y=Jt(a(g.arguments[1]))}catch{}let b=y?.attributes??(y?.attributeFilter!==void 0||y?.attributeOldValue!==void 0);(!y||b&&(!Array.isArray(y.attributeFilter)||y.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function Vp(e){let t=[...e.children],i=t.slice(t.findLastIndex(a=>a.type==="Combinator")+1);return i.some(a=>a.type==="PseudoElementSelector")?[]:i.flatMap(a=>a.type==="TypeSelector"&&["html","body"].includes(a.name.toLowerCase())?[a.name.toLowerCase()]:a.type==="PseudoClassSelector"&&a.name==="root"?["html"]:a.type==="PseudoClassSelector"&&["is","where"].includes(a.name)&&a.children?[...a.children].flatMap(l=>l.type==="SelectorList"?[...l.children].flatMap(Vp):[]):[])}function Zb(e){let t=[],i;try{i=rp(e)}catch(p){return["CSS tidak terbaca: "+p.message]}let a=[!0],l={html:{},body:{}};return up(i,{enter(p){if(p.type==="Atrule"){p.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=p.prelude?qo(p.prelude):"",y=p.name.toLowerCase()==="media"&&g.split(",").every(b=>{let x=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||x&&Number(x[1])>960});a.push(a.at(-1)&&!y)}if(p.type!=="Rule"||!a.at(-1))return;let d=new Set(p.prelude?.type==="SelectorList"?[...p.prelude.children].flatMap(Vp):[]);p.block.children.forEach(g=>{if(g.type!=="Declaration")return;let y=qo(g.value).trim().toLowerCase();for(let b of d)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(y)&&(l[b].overflow=!0),g.property==="height"&&y==="100dvh"&&(l[b].height=!0)})},leave(p){p.type==="Atrule"&&a.pop()}}),Object.values(l).some(p=>p.height&&p.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function Ko({doc:e,scripts:t=[],css:i="",config:a,schema:l,requireObjects:p=!0}){let d=[],g=[];for(let c of t)try{let E=qc(c,{ecmaVersion:"latest",sourceType:"script"});g.push(E),d.push(...Qb(E))}catch(E){d.push("Sintaks JavaScript gagal kompilasi: "+E.message)}a??(a=g.map(c=>Mp(c,"CONFIG")).find(Boolean)),l??(l=g.map(c=>Mp(c,"SVE_SCHEMA")).find(Boolean)),p&&!a&&d.push("CONFIG static tidak terbaca"),p&&!l&&d.push("SVE_SCHEMA static tidak terbaca");let y=l?.template?.type==="custom-page";if(l){Array.isArray(l.sections)||d.push("SVE_SCHEMA.sections wajib array");let c=Array.isArray(l.sections)?l.sections:[],E=c.map(L=>L?.id);new Set(E).size!==E.length&&d.push("SVE_SCHEMA memiliki duplicate section id"),y||(Ii.forEach(L=>{E.includes(L)||d.push("Canonical section hilang: "+L)}),E.forEach(L=>{Ii.includes(L)||d.push("Section bukan canonical: "+L)}));for(let L of c){if(L?.fields!==void 0&&!Array.isArray(L.fields)){d.push("Section fields wajib array");continue}for(let q of L?.fields||[])if(Kb.has(q?.type||"text")||d.push("Field type tidak didukung: "+q?.type),!!["repeater","repeater-image"].includes(q?.type)){if(!Array.isArray(q.fields)){d.push("Repeater tanpa fields[]");continue}for(let K of q.fields)(!K?.key||Dp.has(K.key))&&d.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(K?.type)&&d.push("Nested repeater tidak diizinkan")}}}if(a&&!y){let c=a.sectionOrder;(!Array.isArray(c)||c.length!==Ii.length||!Ii.every(E=>c.includes(E))||c[0]!=="cover")&&d.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let x=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(x)&&d.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(x)&&d.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(x)&&d.push("Gambar base64 terdeteksi; gunakan URL https");let k=["html","body"].map(c=>`${c}{${e?.querySelector(c)?.getAttribute("style")||""}}`).join("");d.push(...Zb(i+k));for(let c of e?.querySelectorAll("audio")||[])c.getAttribute("preload")?.toLowerCase()!=="none"&&d.push('Audio wajib menggunakan preload="none"');for(let c of e?.querySelectorAll("iframe")||[]){let E="";try{E=new URL(c.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(E)&&c.getAttribute("loading")?.toLowerCase()!=="lazy"&&d.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&d.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(d)],config:a,schema:l}}function Bp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),a=t(i),l=[...a.querySelectorAll("style")],p=[...a.querySelectorAll("script")],d=Ko({doc:a,css:l.map(y=>y.textContent).join(`
`),scripts:p.map(y=>y.textContent)}),g=d.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),a.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!a.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!a.body)&&g.push("Elemen body wajib ada"),a.head?.querySelector("title")||g.push("Title wajib ada di head"),a.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(l.length!==1||!a.head?.contains(l[0]))&&g.push("Wajib tepat satu style di head"),(p.length!==1||!a.body?.contains(p[0]))&&g.push("Wajib tepat satu script di body"),p[0]&&p[0]!==a.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),p.some(y=>y.hasAttribute("src"))&&g.push("Script template harus inline"),d.schema?.template?.type!=="custom-page"){let y=new Set([...a.querySelectorAll("[data-section-id]")].map(b=>b.getAttribute("data-section-id")));Ii.forEach(b=>{y.has(b)||g.push("Markup section hilang: "+b)})}return{...d,blockers:[...new Set(g)],html:i}}function jp({document:e,window:t,getConfig:i,syncImages:a,metrics:l}){let p=null,d=null,g=!1,y=null,b=null;function x(){return p?.isConnected||(p=[...e.querySelectorAll("iframe")].find(c=>{try{return typeof c.contentWindow?.SVE_REFRESH=="function"||!!c.contentDocument?.querySelector("[data-sve-template]")}catch{return!1}})||null),p}function k(){d!==null&&t.cancelAnimationFrame(d),d=null;let c=x(),E;try{E=c?.contentWindow||(typeof t.SVE_REFRESH=="function"?t:null)}catch{}let L=i();if(E&&L){let q=JSON.stringify(L);if(q!==y||E!==b||g)try{let K=JSON.parse(q);E.CONFIG=K,E.SVE_REFRESH?.(K),y=q,b=E,l.previewRefreshCount=(l.previewRefreshCount||0)+1}catch(K){console.warn("[SVE] Preview refresh gagal",K)}}if(g){try{c?.contentDocument&&a(c.contentDocument)}catch{}g=!1}}return{request({images:c=!1,force:E=!1}={}){g||(g=c),E&&(y=null,b=null),d===null&&(d=t.requestAnimationFrame(k))},document(){try{return x()?.contentDocument||null}catch{return null}},invalidate(){p=null,y=null,b=null},flush:k}}(function(){"use strict";let e="sve77",t="0.26.9",a=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),l="https://nikahin.myscalev.com/home#paket",p="6282175274118",d="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",y=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||document.getElementById(e))return;let x=(r,n=document)=>n.querySelector(r),k=(r,n=document)=>Array.from(n.querySelectorAll(r)),c={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=c.performance;let E=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-primary-bg","#332a24"],["Button Primary","Text","--sve-button-primary-text","#ffffff"],["Button Secondary","Background","--sve-button-secondary-bg","#ffffff"],["Button Secondary","Text","--sve-button-secondary-text","#332a24"]],L=Array.from({length:31},(r,n)=>12+n*2+"px"),q=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],K=["100","200","300","400","500","600","700","800","900"],X=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],fe=X.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),oe=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],it=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),Xt=new Set(["__proto__","prototype","constructor"]),Up=12,Hp=240,zp=1e4;function _t(r){let n=String(r||"").trim();if(!n||n.length>Hp||n.includes("..")||n.startsWith(".")||n.endsWith("."))return null;let s=n.split(".");if(!s.length||s.length>Up)return null;for(let o of s){if(!o||Xt.has(o))return null;if(/^\d+$/.test(o)){let u=Number(o);if(!Number.isSafeInteger(u)||u<0||u>zp)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let Li=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,Yo=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,Gp=4096;function Mr(r){return Li.lastIndex=0,Li.test(String(r||""))}function Wp(r){let n=[];return Object.entries(r||{}).forEach(([s,o])=>{let u=String(o||"");if(!u)return;Li.lastIndex=0;let h=0,m=0,v;for(;v=Li.exec(u);){h+=1;let S=v.index+v[0].length,w=S;for(;w<u.length&&/[A-Za-z0-9+/=]/.test(u[w]);)w+=1;m+=w-S}h&&n.push({where:s,count:h,approxKb:Math.max(1,Math.round(m*.75/1024))})}),n}function qp(r){let n=[];return Object.entries(r||{}).forEach(([s,o])=>{let u=String(o||"");if(!u)return;Yo.lastIndex=0;let h=0,m=0,v;for(;v=Yo.exec(u);){let S=v[0].length;S<=Gp||Mr(v[0])||(h+=1,m=Math.max(m,S))}h&&n.push({where:s,count:h,approxKb:Math.max(1,Math.round(m/1024))})}),n}function Qo(r){return r.map(n=>n.where+" ("+n.count+"x, \xB1"+n.approxKb+" KB)").join(", ")}let Zo={"16:9":"16 / 9","4:3":"4 / 3","1:1":"1 / 1","4:5":"4 / 5","9:16":"9 / 16"},Dr=["16:9","4:3","1:1","4:5","9:16"],Vr=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Kp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},Jo=["auto","cover","contain"];function Yp(r){return r==="fill"?"cover":r==="fit"?"contain":Jo.includes(r)?r:"auto"}function Xo(r=""){return`
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="${C(r)}"
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
    `}function Qp(){return`
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
    `}function C(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ei(r,n=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),n)}}function $t(r,n=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:n}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function tl(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function rt(r){return!!(r&&r.isConnected)}function Pt(){let r=c.nativeCache;Object.keys(r).forEach(n=>{r[n]&&!rt(r[n])&&(r[n]=null)})}function Pe(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Nt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,n=>n.toUpperCase()).trim()}function Jb(){}function D(r,n){if(r==null||!n)return;let s=_t(n);if(!s)return;let o=r;for(let u of s){if(o==null)return;let h=/^\d+$/.test(u)?Number(u):u;if(!Object.prototype.hasOwnProperty.call(o,h))return;o=o[h]}return o}function me(r,n,s){let o=_t(n);if(!r||!o)return!1;let u=r;for(let v=0;v<o.length-1;v++){let S=o[v],w=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(u,w)||u[w]===null||u[w]===void 0)&&(u[w]=/^\d+$/.test(o[v+1])?[]:Object.create(null)),typeof u[w]!="object")return!1;u=u[w]}let h=o.at(-1),m=/^\d+$/.test(h)?Number(h):h;return u[m]=s,!0}function xt(r){let n=String(r||"").trim();if(!n)return"";try{/^https?:\/\//i.test(n)&&(n=new URL(n).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{n=decodeURIComponent(n)}catch{}return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function Br(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function Zp(){let r=k('input[type="text"], input:not([type])').filter(n=>Br(n));return r.length?r.find(n=>String(n.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function Jp(){let r=k("a[href]").filter(n=>!n.closest("#"+e));for(let n of r){let s=n,o="";for(let u=0;u<4&&s;u+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let u=new URL(n.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(u.hostname)&&!/scalev\.(?:com|id)$/i.test(u.hostname))continue;let h=u.pathname.split("/").filter(Boolean),m=xt(h.at(-1)||"");if(m)return m}catch{}}return""}function yt(){let r=Zp(),n=xt(r?.value);if(n)return c.scalevSlug=n,n;let s=Jp();return s?(c.scalevSlug=s,s):c.scalevSlug||""}function jr(r,n){let s=String(n||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),u=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&u.endsWith("weddingid")||/wedding\s*id/.test(o)}function Xp(){let r=new Set;try{ke().forEach(n=>{(n.fields||[]).forEach(s=>{s.type!=="repeater"&&jr(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return c.config&&D(c.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),c.config&&D(c.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function Ur(r){k('[data-auto-wedding-id="1"]').forEach(n=>{n.value!==r&&(n.value=r),n.setAttribute("readonly","")})}function ti(r,n={}){let s=xt(r||yt());if(!s)return!1;c.scalevSlug=s;let o=Xp();if(!c.config||!o.length)return c.pendingWeddingIdSlug=s,Ur(s),!1;let u=!1;if(o.forEach(m=>{D(c.config,m)!==s&&(me(c.config,m,s),u=!0)}),Ur(s),!u)return c.pendingWeddingIdSlug="",!1;let h=Gr().length>0;return n.commit!==!1&&h&&c.configRange?.editor?(c.pendingWeddingIdSlug="",se(n.silent?void 0:"Wedding ID mengikuti Slug URL"),Ur(s),!0):(c.pendingWeddingIdSlug=s,!0)}function il(){let r=xt(c.pendingWeddingIdSlug||c.scalevSlug||yt());return r?ti(r,{commit:!0,silent:!0}):!1}let eh=ei(()=>{let r=yt();r&&ti(r,{commit:!0})},450);function _i(){if(Pt(),rt(c.nativeCache.save)||rt(c.nativeCache.publish))return{save:rt(c.nativeCache.save)?c.nativeCache.save:null,publish:rt(c.nativeCache.publish)?c.nativeCache.publish:null};let r=k("button").filter(u=>!u.closest("#"+e)),n=u=>(u.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(u=>{let h=n(u);return h==="simpan"||h==="save"})||null,o=r.find(u=>{let h=n(u);return h.includes("simpan & terbitkan")||h.includes("simpan dan terbitkan")||h==="publish"})||null;return c.nativeCache.save=s,c.nativeCache.publish=o,{save:s,publish:o}}function th(r,n){if(!r)return n?.parentElement||null;if(!n)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=n;o;){if(s.has(o))return o;o=o.parentElement}return null}function rl(r,n){if(Pt(),rt(c.nativeCache.toolbarHost))return c.nativeCache.toolbarHost;if(r&&n&&r.parentElement===n.parentElement)return c.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=th(r,n);if(!s)return r?.parentElement||n?.parentElement||null;let o=s;for(let u=0;u<4&&o;u++,o=o.parentElement){let h=o.getBoundingClientRect?.();if(h&&h.top>=0&&h.top<180&&h.height<110)return c.nativeCache.toolbarHost=o,o}return c.nativeCache.toolbarHost=s,s}function Hr(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let n=!!c.open;r.style.setProperty("display",n?"none":"",n?"important":""),r.setAttribute("aria-hidden",n?"true":"false"),r.tabIndex=n?-1:0}function al(){let{save:r,publish:n}=_i(),s=n||r;if(!s)return!1;let o=rl(r,n);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let u=document.getElementById(e+"-toolbar-toggle");return u||(u=s.cloneNode(!1),u.id=e+"-toolbar-toggle",u.type="button",u.disabled=!1,u.removeAttribute("disabled"),u.setAttribute("aria-controls",e+"-dock"),u.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),u.setAttribute("aria-pressed","false"),u.textContent="Visual Editor",u.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),c.open?ch():ii(!0)})),u.parentElement!==o&&(n&&n.parentElement===o?n.insertAdjacentElement("afterend",u):r&&r.parentElement===o?r.insertAdjacentElement("afterend",u):o.appendChild(u)),u.classList.toggle("sve-toolbar-active",c.open),u.setAttribute("aria-pressed",c.open?"true":"false"),Hr(),c.open&&requestAnimationFrame(()=>ol(!0)),!0}function zr(){let n=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return n||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function ih(){if(Pt(),rt(c.nativeCache.globalHeader))return c.nativeCache.globalHeader;let r=k("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),u=s.getBoundingClientRect(),h=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&u.top>=-2&&u.top<=4&&u.height>=36&&u.height<=64&&u.width>=window.innerWidth*.7&&h.includes("landing page studio")});if(!r.length)return null;let n=r.sort((s,o)=>{let u=s.getBoundingClientRect(),h=o.getBoundingClientRect();return u.height-h.height||u.top-h.top})[0];return c.nativeCache.globalHeader=n||null,n||null}function $i(){let r=ih(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function rh(){if(Pt(),rt(c.nativeCache.workspaceRoot))return c.nativeCache.workspaceRoot;let{save:r,publish:n}=_i(),s=n||r;if(!s)return zr();let o=s,u=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let m=o.getBoundingClientRect();m.top>=36&&m.top<=130&&m.width>=window.innerWidth*.68&&m.height>=window.innerHeight*.62&&(u=o)}o=o.parentElement}let h=u||zr();return c.nativeCache.workspaceRoot=h||null,h}function ah(){let n=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return n>0?n:Math.min(400,window.innerWidth*.32)}function nl(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function Pi(r){let n=document.querySelector('[data-sve77-page-root="1"]'),s=rh();if(n&&n!==s&&nl(n),s)if(r){let o=getComputedStyle(s),u=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",u?"positioned":"flow")}else nl(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>ol(r))}function nh(){if(Pt(),rt(c.nativeCache.topToolbar))return c.nativeCache.topToolbar;let{save:r,publish:n}=_i(),s=n||r;if(!s)return null;let o=s,u=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let h=getComputedStyle(o),m=o.getBoundingClientRect();if(h.position==="fixed"&&m.top>=36&&m.top<=70&&m.height>=48&&m.height<=92&&m.width>=Math.min(520,window.innerWidth*.42)){u=o;break}}o=o.parentElement}return c.nativeCache.topToolbar=u||null,u}function sl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function ol(r){let{save:n,publish:s}=_i(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||rl(n,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let u=document.querySelector('[data-sve77-top-toolbar="1"]'),h=nh();if(u&&u!==h&&sl(u),!h)return;if(!r){sl(h);return}let m=Math.ceil(ah());h.setAttribute("data-sve77-top-toolbar","1"),h.style.setProperty("right",m+"px","important"),h.style.setProperty("box-sizing","border-box","important"),h.style.setProperty("transition","right .16s ease","important")}function ll(){$t(()=>{if(c.open)try{let r=yt();r&&ti(r,{commit:!0,silent:!0}),il()}catch{}},1200)}function cl(){let r=!1;try{(c.sourceDirty||!c.doc)&&(r=Ne())}catch{}if(!(c.uiPrepared&&c.renderedTab===(c.tab||"content")&&c.renderedSearch===(c.search||""))||r)try{re()}catch{}ll()}function sh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(c.open){try{$i(),Pi(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),cl(),performance.mark("sve-panel-paint-end"),lh()}})})}function oh(){if(c.prewarmScheduled=!1,c.prewarmHandle=null,c.open){cl();return}performance.mark("sve-prewarm-start");try{(c.sourceDirty||!c.doc)&&Ne(),!(c.uiPrepared&&c.renderedTab===(c.tab||"content")&&c.renderedSearch===(c.search||""))&&c.doc&&re()}catch{}performance.mark("sve-prewarm-end"),ll()}function lh(){try{let r=performance.getEntriesByType("mark");c.performance.firstPaintMarks=r.filter(n=>String(n.name).startsWith("sve-")).map(n=>({name:n.name,startTime:Math.round(n.startTime*100)/100}))}catch{}}function Ni(){c.prewarmScheduled||(c.prewarmScheduled=!0,c.prewarmHandle=$t(oh,1200))}function ii(r){if(!r&&!Ce())return;c.open=!!r;let n=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(n?.classList.toggle("open",c.open),s?.classList.toggle("sve-toolbar-active",c.open),s?.setAttribute("aria-pressed",c.open?"true":"false"),Hr(),c.open){c.prewarmScheduled&&(tl(c.prewarmHandle),c.prewarmScheduled=!1,c.prewarmHandle=null),sh();return}requestAnimationFrame(()=>{try{Pi(!1)}catch{}}),Ni()}function ch(){ii(!1)}function Gr(){return[...new Set(k(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Ri(){let r=Gr();if(c.allEditors=r,!r.length)return!1;let n={html:null,css:null,js:null,head:null};return k("label").forEach(s=>{let o=s.querySelector(".CodeMirror")?.CodeMirror;if(!o)return;let u=(s.querySelector(":scope > span")?.textContent||s.querySelector("span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();u==="body html"?n.html=o:u==="css"?n.css=o:u==="javascript"?n.js=o:u.includes("additional head")&&(n.head=o)}),r.forEach(s=>{let o=s.getValue?.()||"";!n.js&&(o.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(o))&&(n.js=s),!n.html&&(o.includes("data-sve-section")||/<section[\s>]/i.test(o))&&(n.html=s),!n.css&&(o.includes("--sve-background-primary")||o.includes("--sve-font-heading"))&&(n.css=s)}),n.html=n.html||r[0]||null,n.css=n.css||r[1]||null,n.js=n.js||r[2]||null,n.head=n.head||r[3]||null,c.editors=n,Nh(),!0}function U(r){return c.editors[r]?.getValue?.()||""}function Wr(r,n=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(!s)return;s.dispatchEvent(new Event("input",{bubbles:!0})),n&&s.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}}function uh(r,n,s=!1){if(r){c.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(n),r.save?.()}),Wr(r,s),r.refresh?.()}finally{c.internalEditorWrite=Math.max(0,c.internalEditorWrite-1)}Bi(),kl()}}function at(r,n){uh(c.editors[r],n)}function ph(){return new URL(a.endpoint)}function hh(r,n=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!n&&s.origin!==ph().origin?"":s.href}catch{return""}}function dh(r){if(!r||typeof r!="object")return null;let n=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(n)||!s?null:{id:n,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:hh(r.source_url||r.sourceUrl)}}function fh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(dh).filter(Boolean)}async function mh(r,n={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),a.timeoutMs);try{return await fetch(r,{...n,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function gh(r,n={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=n.method||"GET";return new Promise((o,u)=>{GM_xmlhttpRequest({method:s,url:r,data:n.body,headers:n.headers||{},timeout:a.timeoutMs,onload:h=>{let m=Number(h.status),v=Number.isInteger(m)&&m>=200&&m<=599?m:200,S=String(h.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),w=String(h.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(h.responseText||"",{status:v,statusText:S,headers:{"Content-Type":w}}))},ontimeout:()=>u(new DOMException("The operation timed out","AbortError")),onerror:()=>u(new TypeError("Userscript request failed"))})})}async function qr(r,n={}){if(typeof GM_xmlhttpRequest=="function")try{return await gh(r,n)}catch{}return await mh(r,n)}async function ul(r=!1){let n=c.templateLibrary;if(!r&&n.status==="ready"&&n.loadedAt&&Date.now()-n.loadedAt<3e5)return n.templates;n.status="loading",n.error="";try{let s=await qr(a.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let u=fh(o);if(!u.length)throw new Error("Library belum memiliki template aktif");return n.templates=u,n.loadedAt=Date.now(),n.status="ready",u}catch(s){return n.templates=[],n.status="error",n.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),n.templates}}function bh(){return k('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let n=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return n==="kode"||n==="code"||n.includes("kode html")})||null}async function xh(){if(Ri()&&c.editors.html)return!0;bh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(n=>window.setTimeout(n,120)),Ri()&&c.editors.html)return!0;return!1}function yh(r){return Bp(r,n=>new DOMParser().parseFromString(n,"text/html"))}function Xb(r,n){let s=String(n||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let u=pl(r,r.indexOf("{",o.index));if(!u)return null;try{return hl(u.text)}catch{return null}}function vh(){let r=k('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,u="";for(let h=0;h<5&&o;h+=1,o=o.parentElement)u+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(u)})[0]||r[0]||null}function kh(r){let n=vh();if(!n)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),n.files=s.files,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}function ri(r){let n=["style","audio","compatibility"],s=r||"content",o=c.uiPrepared&&c.tab===s&&c.renderedSearch===(c.search||"");c.tab=s,c.uiPrepared=!1;let u=document.getElementById(e);if(k(".tab",u).forEach(h=>{h.classList.toggle("active",h.dataset.tab===r)}),o){c.uiPrepared=!0,c.performance.skippedTabRenders+=1;return}re()}async function Sh(r,n,s){if(!Ce())throw new Error(c.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=c.templateLibrary,u=yh(await r.text());if(u.blockers.length)throw console.error("[SVE] Template library validation failed",u.blockers),new Error(u.blockers[0]);if(!await xh())throw new Error("Buka tab Kode terlebih dahulu");let h={html:U("html"),css:U("css"),js:U("js"),head:U("head")};kh(r);let m=Date.now(),v=!1;for(;Date.now()-m<4500;){await new Promise(_=>window.setTimeout(_,140)),Ri();let S=U("html"),w=U("js");if(S!==h.html||w!==h.js){v=!0;break}}if(!v)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=h,o.importedId=n||"local-import",o.importedName=s||r.name||"Template lokal",Ne(),je(),ri("content")}async function wh(r){let n=c.templateLibrary,s=n.templates.find(u=>u.id===r),o=u=>{n.previousSource=null,n.importedId="",n.importedName="",n.status="error",n.error=u,c.uiPrepared=!1,re()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}n.status="loading",n.error="",c.uiPrepared=!1,re();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let u=await qr(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",u.status),!u.ok)throw new Error("HTTP "+u.status);let h=await u.text();console.log("[SVE] Source length:",h.length);let m=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",v=new File([h],m,{type:"text/html"});await Sh(v,s.id,s.name),n.error="",n.status="ready",ri("content")}catch(u){console.error("[SVE] Import gagal:",u),o("Import gagal: "+String(u?.message||"source tidak terbaca"))}}function ex(){let r=c.templateLibrary.previousSource;r&&Ce()&&(at("html",r.html),at("css",r.css),at("js",r.js),at("head",r.head),c.templateLibrary.previousSource=null,c.templateLibrary.importedId="",c.templateLibrary.importedName="",Ne(),je(),ri("library"))}function Ch(){let r=c.templateLibrary;clearTimeout(c.contentCommitTimer),c.contentCommitTimer=null,c.contentStateDirty=!1,["html","css","js","head"].forEach(n=>{at(n,"")}),r.previousSource=null,r.importedId="",r.importedName="",c.sourceDirty=!0,Ne(),je(),c.uiPrepared=!1,re()}function pl(r,n){let s=0,o=null,u=!1,h=!1,m=!1;for(let v=n;v<r.length;v++){let S=r[v],w=r[v+1];if(h){S===`
`&&(h=!1);continue}if(m){S==="*"&&w==="/"&&(m=!1,v++);continue}if(o){if(u){u=!1;continue}if(S==="\\"){u=!0;continue}S===o&&(o=null);continue}if(S==="/"&&w==="/"){h=!0,v++;continue}if(S==="/"&&w==="*"){m=!0,v++;continue}if(S==='"'||S==="'"||S==="`"){o=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:n,end:v+1,text:r.slice(n,v+1)}}return null}function hl(r){let n=0,s=I=>{throw new Error(I+" @"+n)};function o(){for(;n<r.length;){let I=r[n],A=r[n+1];if(/\s/.test(I)){n++;continue}if(I==="/"&&A==="/"){for(n+=2;n<r.length&&r[n]!==`
`;)n++;continue}if(I==="/"&&A==="*"){for(n+=2;n<r.length&&!(r[n]==="*"&&r[n+1]==="/");)n++;n+=2;continue}break}}function u(){let I=r[n++],A="";for(;n<r.length;){let z=r[n++];if(z===I)return A;if(z!=="\\"){A+=z;continue}let B=r[n++],ce={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};A+=Object.prototype.hasOwnProperty.call(ce,B)?ce[B]:B}s("String belum ditutup")}function h(){o();let I=n;for(/[A-Za-z_$]/.test(r[n]||"")||s("Identifier invalid"),n++;n<r.length&&/[A-Za-z0-9_$]/.test(r[n]);)n++;return r.slice(I,n)}function m(){let I=r.slice(n).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return I||s("Number invalid"),n+=I[0].length,Number(I[0])}function v(){let I=[];if(n++,o(),r[n]==="]")return n++,I;for(;n<r.length;)if(I.push(w()),o(),r[n]==="]"||(r[n]!==","&&s("Koma array hilang"),n++,o(),r[n]==="]"))return n++,I;s("Array belum selesai")}function S(){let I=Object.create(null);if(n++,o(),r[n]==="}")return n++,I;for(;n<r.length;){o();let A=['"',"'","`"].includes(r[n])?u():h();if(o(),Xt.has(A)&&s("Object key terlarang: "+A),Object.prototype.hasOwnProperty.call(I,A)&&s("Duplicate object key: "+A),r[n]!==":"&&s("Titik dua hilang"),n++,I[A]=w(),o(),r[n]==="}"||(r[n]!==","&&s("Koma object hilang"),n++,o(),r[n]==="}"))return n++,I}s("Object belum selesai")}function w(){o();let I=r[n];if(I==="{")return S();if(I==="[")return v();if(['"',"'","`"].includes(I))return u();if(I==="-"||/\d/.test(I||""))return m();let A=h();if(A==="true")return!0;if(A==="false")return!1;if(A==="null")return null;A==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+A)}let _=w();return o(),_}function Kr(r){let n=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+n+"|(?:window|globalThis)\\."+n+")\\s*=\\s*\\{"),o=[];function u(h,m){!h||o.some(v=>v.editor===h)||o.push({editor:h,kind:m})}u(c.editors.js,"js"),u(c.editors.html,"html"),u(c.editors.head,"head"),c.allEditors.forEach(h=>u(h,"unknown"));for(let h of o){let m=h.editor.getValue?.()||"",v=s.exec(m);if(!v)continue;let S=m.indexOf("{",v.index),w=pl(m,S);if(w)try{return{kind:h.kind,editor:h.editor,obj:hl(w.text),start:w.start,end:w.end}}catch(_){console.error("[SVE] parse "+r+" gagal",_)}}return null}function Eh(){if(!c.doc)return null;let r=[];return k("[data-sve-section]",c.doc).forEach((n,s)=>{let o=[],u=new Set;k("[data-sve-field]",n).forEach(m=>{let v=m.getAttribute("data-sve-field");!v||u.has(v)||(u.add(v),o.push({type:m.getAttribute("data-sve-type")||"text",label:m.getAttribute("data-sve-label")||Nt(v),path:v}))});let h=n.getAttribute("data-sve-countdown-path");h&&!u.has(h)&&o.push({type:"datetime",label:"Waktu Tujuan",path:h}),r.push({id:n.id||"section-"+s,label:n.getAttribute("data-sve-section")||Nt(n.id)||"Section "+(s+1),visiblePath:n.getAttribute("data-sve-visible-path")||null,canHide:!!n.getAttribute("data-sve-visible-path"),reorderable:(n.getAttribute("data-section-id")||n.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Fi(){return c.schema?c.schema:(c.fallbackSchemaReady||(c.fallbackSchemaCache=Eh(),c.fallbackSchemaReady=!0),c.fallbackSchemaCache)}function ke(){let r=Fi();return Array.isArray(r?.sections)?r.sections:[]}function te(r){return String(r?.id||"").trim()}function Rt(r){let n=te(r);return!(!n||n==="cover"||r?.locked===!0||r?.reorderable===!1)}function Oi(){let n=ke().map(te).filter(Boolean);if(!n.length)return[];let s=new Set(n),o=Array.isArray(c.config?.sectionOrder)?c.config.sectionOrder.map(h=>String(h||"").trim()).filter(h=>h&&s.has(h)):[],u=[];return s.has("cover")&&u.push("cover"),o.forEach(h=>{h!=="cover"&&!u.includes(h)&&u.push(h)}),n.forEach(h=>{u.includes(h)||u.push(h)}),u}function Mi(){let r=ke(),n=new Map(r.map(s=>[te(s),s]));return Oi().map(s=>n.get(s)).filter(Boolean)}function Di(r,n){let s=String(r||"").trim(),o=ke().find(v=>te(v)===s);if(!o||!Rt(o))return!1;let u=Oi(),h=u.indexOf(s);if(h<0)return!1;let m=h+n;for(;m>=0&&m<u.length;){let v=u[m],S=ke().find(w=>te(w)===v);if(v!=="cover"&&!S?.locked)return!0;m+=n}return!1}function dl(r){if(!c.config)return!1;let n=ke(),s=new Set(n.map(te).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(u=>String(u||"").trim()).filter(u=>u&&s.has(u)&&u!=="cover").forEach(u=>{o.includes(u)||o.push(u)}),n.map(te).filter(Boolean).forEach(u=>{o.includes(u)||o.push(u)}),c.config.sectionOrder=o,!0}function Ah(r=document){k("[data-section-card]",r).forEach(n=>{let s=n.dataset.sectionCard,o=x("[data-section-up]",n),u=x("[data-section-down]",n);o&&(o.disabled=!Di(s,-1)),u&&(u.disabled=!Di(s,1))})}function Th(r,n){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",n==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function fl(r,n,s){let o=x("#"+e+"-body");if(!o)return;let u=x(".reset-zone",o),h=new Map(k("[data-section-card]",o).map(m=>[m.dataset.sectionCard,m]));r.forEach(m=>{let v=h.get(m);v&&(u?o.insertBefore(v,u):o.appendChild(v))}),Ah(o),Th(h.get(n),s)}function ml(r,n){let s=String(r||"").trim(),o=ke().find(S=>te(S)===s);if(!o||!Rt(o))return;let u=Oi(),h=u.indexOf(s);if(h<0)return;let m=h+n;for(;m>=0&&m<u.length;){let S=u[m],w=ke().find(_=>te(_)===S);if(S!=="cover"&&!w?.locked)break;m+=n}if(m<0||m>=u.length||u[m]==="cover")return;let[v]=u.splice(h,1);u.splice(m,0,v),dl(u),se("Urutan section diperbarui"),fl(u,s,n<0?"up":"down")}function Ih(r,n,s){let o=String(r||"").trim(),u=String(n||"").trim();if(!o||!u||o===u)return;let h=ke(),m=h.find(B=>te(B)===o),v=h.find(B=>te(B)===u);if(!m||!v||!Rt(m))return;let S=s==="after"?"after":"before";if(u==="cover")S="after";else if(!Rt(v))return;let w=Oi(),_=w.indexOf(o);if(_<0)return;w.splice(_,1);let I=w.indexOf(u);if(I<0)return;let A=I+(S==="after"?1:0);w[0]==="cover"&&(A=Math.max(1,A)),A=Math.min(w.length,A),w.splice(A,0,o);let z=w.indexOf(o);dl(w),se("Urutan section diperbarui"),fl(w,o,z<_?"up":"down")}function gl(){let r=Fi();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function Ne(){if(c.contentStateDirty&&!Ce())return!1;if(c.lastSerializedConfig="",!Ri())return c.sourceDirty=!0,!1;$t(()=>{try{nd(),c.sourceDirty=!0}catch{}},200),c.doc=new DOMParser().parseFromString(U("html"),"text/html");let r=c.doc.querySelector("[data-sve-template]")||c.doc.querySelector("main[id]")||c.doc.body.firstElementChild;c.rootSelector=r?.id?"#"+r.id:":root";let n=Kr("CONFIG");c.config=n?.obj||null,c.configRange=n||null,c.configSourceText=n?n.editor.getValue().slice(n.start,n.end):"",c.configOwnerSource=n?n.editor.getValue():"";let s=Kr("SVE_SCHEMA");return c.schema=s?.obj||null,c.contentSearchIndex=null,c.contentFieldCache=new WeakMap,c.repeaterContentFieldCache=new WeakMap,c.fallbackSchemaCache=null,c.fallbackSchemaReady=!1,c.contentSectionHtmlCache.clear(),c.contentPrewarmCursor=0,c.contentPrewarmScheduled&&(tl(c.contentPrewarmHandle),c.contentPrewarmScheduled=!1,c.contentPrewarmHandle=null),_h(),c.sourceDirty=!1,c.uiPrepared=!1,!0}function se(r){return Yr(r,{deferPreview:!0,syncImages:!0})?(Ne(),!0):!1}function Yr(r,n={}){if(!c.config||!c.configRange?.editor)return!1;let s=Vd(c.config);if(s.length)return Vi(s[0]),!1;let u=c.configRange.editor.getValue()===c.configOwnerSource?c.configRange:Kr("CONFIG");if(!u||u.editor!==c.configRange.editor)return Vi("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let h=u.editor,m=h.getValue();if(m.slice(u.start,u.end)!==c.configSourceText)return Vi("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let v=JSON.stringify(c.config,null,2).replace(/</g,"\\u003c");if(v===c.configSourceText)return c.contentStateDirty=!1,c.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null;try{c.internalEditorWrite+=1,h.operation(()=>{if(typeof h.replaceRange=="function"&&typeof h.posFromIndex=="function")h.replaceRange(v,h.posFromIndex(u.start),h.posFromIndex(u.end));else{let w=h.getValue?.()||"",_=w.slice(0,u.start)+v+w.slice(u.end);h.setValue(_)}h.save?.()}),Wr(h,!1)}catch(w){S=w}finally{c.internalEditorWrite=Math.max(0,c.internalEditorWrite-1)}if(S){c.internalEditorWrite+=1;try{h.getValue()!==m&&h.setValue(m),Wr(h,!1)}catch{}finally{c.internalEditorWrite-=1}return Vi("Perubahan belum tersimpan: "+S.message),!1}return u.end=u.start+v.length,u.obj=c.config,c.configRange=u,c.configSourceText=v,c.configOwnerSource=h.getValue(),c.lastSerializedConfig=v,c.sourceDirty=!1,c.contentStateDirty=!1,c.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),Bi(),c.performance.configCommitCount=(c.performance.configCommitCount||0)+1,$h(),n.deferPreview?jh({syncImages:!!n.syncImages}):je({syncImages:!!n.syncImages}),!0}function Vi(r){c.commitError=r,c.contentStateDirty=!0;let n=document.getElementById(e+"-commit-notice");n&&(n.hidden=!1,n.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function Bi(){c.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,U(r)]))}function bl(){return"sve77:fresh-default:"+location.origin+location.pathname}function Qr(){let r=["html",U("html"),"css",U("css"),"js",U("js"),"head",U("head")].join("\u241E"),n=2166136261;for(let s=0;s<r.length;s++)n^=r.charCodeAt(s),n=Math.imul(n,16777619);return(n>>>0).toString(16).padStart(8,"0")}function Lh(){let r={};return E.forEach(([,,n])=>{let s=Se(n);s&&(r[n]=s)}),fe.forEach(n=>{r[n.variable]=Se(n.variable)||n.fallback}),{version:t,config:c.config?Pe(c.config):null,cssTokens:r,googleFonts:Pe(D(c.config,"editorStyle.googleFonts")||{})}}function xl(){try{let r=JSON.parse(localStorage.getItem(bl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function yl(r){try{localStorage.setItem(bl(),JSON.stringify(r))}catch{}}function vl(){if(!c.config)return!1;let r=Qr(),n=Lh();return c.defaults=n,c.defaultConfig=Pe(n.config||c.config),c.baselineFingerprint=r,c.lastManagedFingerprint=r,Bi(),yl({version:t,defaults:n,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function _h(){if(!c.config||c.defaults&&c.managedSources&&Object.entries(c.managedSources).every(([s,o])=>U(s)===o))return;let r=Qr(),n=xl();if(n?.defaults&&n.lastManagedFingerprint===r){c.defaults=n.defaults,c.defaultConfig=Pe(n.defaults.config||c.config),c.baselineFingerprint=n.baselineFingerprint||r,c.lastManagedFingerprint=r,Bi();return}vl()}function kl(){if(!c.defaults||c.managedSources&&!Object.entries(c.managedSources).every(([s,o])=>U(s)===o))return;let r=Qr(),n=xl()||{};c.lastManagedFingerprint=r,yl({version:t,defaults:n.defaults||c.defaults,baselineFingerprint:n.baselineFingerprint||c.baselineFingerprint||r,lastManagedFingerprint:r})}let $h=ei(kl,700);function Ph(){clearTimeout(c.freshBaselineTimer),c.freshBaselineTimer=setTimeout(()=>{if(!c.internalEditorWrite)try{Ne(),vl(),c.open?re():Ni()}catch{}},420)}function Nh(){c.allEditors.forEach(r=>{!r||c.editorChangeBound.has(r)||typeof r.on!="function"||(c.editorChangeBound.add(r),r.on("change",()=>{c.internalEditorWrite||(c.sourceDirty=!0,c.uiPrepared=!1,Ph())}))})}function tx(r){c.defaultConfig&&(me(c.config,r,Pe(D(c.defaultConfig,r))),se("Berhasil direset"),re())}let Rh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",Fh="https://nikahin.myscalev.com/dashboard",Sl="nikahin_team_key";function Oh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(Sl,"")||"").trim()}catch{return""}}function Mh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(Sl,String(r||"").trim()),!0)}catch{return!1}}let Dh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function Zr(){return xt(c.scalevSlug||yt())||""}async function Jr(r){let n=c.dashboardPin;if(n.busy)return;let s=Zr();if(!s){n.status="error",n.message="Slug URL belum diisi di Pengaturan Scalev.",vt();return}let o=Oh();if(!o){n.status="needkey",n.message="",vt();return}if(!(r==="generate"&&n.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){n.busy=!0,n.status="loading",n.message="",vt();try{let h=await(await qr(Rh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!h||h.ok!==!0?(n.status="error",n.pin="",n.message=Dh[h&&h.error]||"Gagal mengambil PIN."):(n.status="ready",n.slug=s,n.pin=String(h.pin||""),n.version=Number(h.version)||0,n.message=h.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{n.status="error",n.pin="",n.message="Tidak bisa menghubungi server."}n.busy=!1,vt()}}function Vh(){let r=x("#"+e+"-team-key"),n=r?r.value.trim():"",s=c.dashboardPin;if(!n){s.message="Kunci tim belum diisi.",vt();return}if(!Mh(n)){s.message="Tampermonkey menolak menyimpan kunci.",vt();return}s.status="idle",s.message="",Jr("peek")}async function Bh(){let r=c.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}vt()}}function vt(){let r=document.activeElement?.id,n=x("#"+e+"-pin-panel");n&&(n.innerHTML=wl());let s=x("#"+e+"-pin-pill");s&&(s.outerHTML=Rl()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function wl(){let r=c.dashboardPin,n=Zr(),s=m=>m?`<small class="auto-wedding-id-note">${C(m)}</small>`:"";if(!n)return`
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
      `;let o=r.status==="ready"&&r.pin&&r.slug===n,u=r.busy||r.status==="loading",h=o?`
          <button type="button" ${u?"disabled":""}
            class="pin-ctl-action${u?" is-busy":""}"
            id="${e}-pin-generate"
          >
            Buat PIN baru
          </button>
        `:`
          <button type="button" ${u?"disabled":""}
            class="pin-ctl-action${u?" is-busy":""}"
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
            value="${C(o?r.pin:"")}"
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
            href="${Fh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard \u2197
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function Cl(){if(!c.defaults)return;c.defaults.config&&(c.config=Pe(c.defaults.config),se()),Object.entries(c.defaults.cssTokens||{}).forEach(([n,s])=>{s&&Ue(n,s)});let r=c.defaults.googleFonts||{};c.config&&D(c.config,"editorStyle.googleFonts")!==void 0&&(me(c.config,"editorStyle.googleFonts",Pe(r)),se(),qi()),Ne(),re(),je()}function jh({syncImages:r=!1,delay:n=100}={}){je({syncImages:r})}let ji=jp({document,window,getConfig:()=>c.config,syncImages:sd,metrics:c.performance});function je({syncImages:r=!1,force:n=!1}={}){ji.request({images:r,force:n})}function Uh(r){if(!r)return"";let n=new Date(r);if(Number.isNaN(n.getTime()))return"";let s=o=>String(o).padStart(2,"0");return n.getFullYear()+"-"+s(n.getMonth()+1)+"-"+s(n.getDate())+"T"+s(n.getHours())+":"+s(n.getMinutes())}function Hh(r){if(!r)return"";let n=new Date(r),s=h=>String(h).padStart(2,"0"),o=-n.getTimezoneOffset(),u=o>=0?"+":"-";return r+":00"+u+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function Se(r,n){let s=n?[n]:[ea()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),u=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let h of s){let m=u.exec(h||"");if(m)return m[1].trim()}return""}function Xr(r,n){let s=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function ea(){let r=[],n=U("css");return n&&r.push(n),[U("html"),U("head")].forEach(s=>{let o=String(s||""),u=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,h;for(;h=u.exec(o);)h[1]&&r.push(h[1])}),r.join(`
`)}function zh(r,n,s){let o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),u=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(u,"$1"+s+"$3")}function Gh(r,n){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,n),o.body?.style?.setProperty(r,n),o.querySelector("[data-sve-template]")?.style?.setProperty(r,n)}catch{}};k("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function Ue(r,n){let s=["css","head","html"],o=null;for(let m of s)if(Xr(U(m),r)){o=m;break}if(!o)return!1;let u=U(o),h=zh(u,r,n);return h===u?!1:(at(o,h),Gh(r,n),je(),!0)}function Ui(r){return String(c.defaults?.cssTokens?.[r]||"").trim()}function we(r){let n=String(r?.type||"text").trim().toLowerCase();return n==="datetime-local"?"datetime":n==="checkbox"?"boolean":n}function Wh(r,n){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||jr(r,n)}function El(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return Pe(r.default);let n=we(r);return n==="boolean"?!1:""}function qh(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function Kh(r){let n=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&n.push(`${s}="${C(r[s])}"`)}),r?.placeholder&&n.push(`placeholder="${C(r.placeholder)}"`),n.join(" ")}function Yh(r){let n=String(r?.help||r?.description||"").trim();return n?`
        <small class="field-help">
          ${C(n)}
        </small>
      `:""}function Qh(r,n){let s=D(c.config,n),o=we(r),u=jr(r,n),h=Wh(r,n),m=u?yt()||s||"":s??"",v=`data-field-path="${C(n)}" data-field-type="${C(o)}" aria-label="${C(r?.label||n)}" `+(h?'data-field-readonly="1" ':""),S=Kh(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${v}
          ${S}
          ${h?'readonly aria-readonly="true"':""}
        >${C(m)}</textarea>
        ${u?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let _=qh(r);return`
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
                  ${C(r.placeholder)}
                </option>
              `:""}

          ${_.map(I=>`
              <option
                value="${C(I.value)}"
                ${String(m??"")===I.value?"selected":""}
              >
                ${C(I.label)}
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
            ${C(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(o==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${v}
          ${S}
          value="${C(Uh(m))}"
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
            value="${C(m)}"
            ${h?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let w=["email","tel","number","date","time","color"].includes(o)?o:"text";return`
      <input
        class="content-control content-control-${w}"
        type="${w}"
        ${v}
        ${S}
        ${u?'data-auto-wedding-id="1"':""}
        value="${C(m)}"
        ${h?'readonly aria-readonly="true"':""}
      >
      ${u?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Al(r,n){let s=n||r.path,o=C(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${Qh(r,s)}

        ${Yh(r)}
      </div>
    `}function ai(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let n=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(n))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function Tl(r){if(!r||typeof r!="object")return[];let n=c.repeaterContentFieldCache.get(r);if(n)return n;let s=(r?.fields||[]).filter(o=>!ai(o)&&we(o)!=="repeater"&&we(o)!=="repeater-image");return c.repeaterContentFieldCache.set(r,s),s}function Il(r){if(Ll(r,D(c.config,r.path)))return El(r.fields[0]);let n={};return(r.fields||[]).forEach(s=>{s?.key&&(n[s.key]=El(s))}),n}function Ll(r,n){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(n)&&n.length?n:D(c.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function Zh(r,n,s){let o=String(r?.itemLabelKey||"").trim(),h=[o?n?.[o]:"",n?.title,n?.name,n?.label,n?.event,n?.provider].find(m=>String(m??"").trim());return String(h??"").trim()||(r.label||"Item")+" "+(s+1)}function Jh(r){return(r?.fields||[]).some(s=>we(s)==="repeater"||we(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function Xh(r){let n=D(c.config,r.path),s=Array.isArray(n)?n:[],o=Number.isFinite(r.max)?r.max:999;return Jh(r)+s.map((u,h)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${C(Zh(r,u,h))}
              </strong>

              ${r.canDelete!==!1&&s.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${C(r.path)}"
                      data-repeat-index="${h}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${Tl(r).map(m=>Al({...m,type:m.type||"text"},Ll(r,s)?r.path+"."+h:r.path+"."+h+"."+m.key)).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&s.length<o?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${C(r.path)}"
            >
              + Tambah
              ${C(r.label||"Item")}
            </button>
          `:"")}function Ft(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function ed(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function ta(r){if(!r||typeof r!="object")return[];let n=c.contentFieldCache.get(r);if(n)return n;let s=(r.fields||[]).filter(o=>!(ai(o)||o.type==="repeater"&&Tl(o).length===0));return c.contentFieldCache.set(r,s),s}function td(){if(c.contentSearchIndex)return c.contentSearchIndex;let r=new Map;return Mi().forEach(n=>{let s=te(n),o="";try{o=JSON.stringify(n).toLowerCase()}catch{o=[s,n?.label||"",...ta(n).flatMap(h=>[h?.label||"",h?.path||"",...(h?.fields||[]).flatMap(m=>[m?.label||"",m?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),c.contentSearchIndex=r,r}function Hi(r){r&&c.contentSectionHtmlCache.delete(String(r))}function zi(r){let n=te(r);if(!n)return _l(r);if(c.contentSectionHtmlCache.has(n))return c.contentSectionHtmlCache.get(n);let s=_l(r);return c.contentSectionHtmlCache.set(n,s),s}function ni(r){r&&(c.contentSectionUseTick+=1,r.dataset.contentUse=String(c.contentSectionUseTick))}function ia(r){if(!r)return;let n=k("[data-section-card]",r).filter(o=>x("[data-section-body]",o)?.dataset.loaded==="1"),s=n.length-c.contentMaxMountedSections;s<=0||n.filter(o=>!o.classList.contains("open")).sort((o,u)=>Number(o.dataset.contentUse||0)-Number(u.dataset.contentUse||0)).slice(0,s).forEach(o=>{let u=x("[data-section-body]",o);u&&(u.replaceChildren(),u.dataset.loaded="0")})}function id(){if(c.contentPrewarmScheduled||!c.config||!Fi())return;let r=Mi();if(!r.length)return;c.contentPrewarmScheduled=!0;let n=s=>{c.contentPrewarmScheduled=!1,c.contentPrewarmHandle=null;let o=2;for(;c.contentPrewarmCursor<r.length&&o>0;){let u=r[c.contentPrewarmCursor++],h=te(u);if(h&&!c.contentSectionHtmlCache.has(h)&&zi(u),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}c.contentPrewarmCursor<r.length&&(c.contentPrewarmScheduled=!0,c.contentPrewarmHandle=$t(n,1200))};c.contentPrewarmHandle=$t(n,1200)}function _l(r){let n=ta(r),s=[],o="",u=h=>{let m=String(h||"").trim();return!m||m===o?"":(o=m,`
        <div class="sv-category" data-sv-category="${C(m)}">
          ${C(m)}
        </div>
      `)};return n.forEach(h=>{let m=String(h.category||"").trim();if(m||(o=""),h.type==="repeater"){let v=m?"":`
            <div class="group-title">
              ${C(h.label||"Daftar")}
            </div>
          `;s.push(u(m)+`
            <div class="group">
              ${v}
              <div class="group-body">
                ${Xh(h)}
              </div>
            </div>
          `);return}s.push(u(m)+`
          <div class="group">
            <div class="group-title">
              ${C(h.label||h.path)}
            </div>

            <div class="group-body">
              ${Al({...h,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),s.join("")}function $l(r){return Mi().find(n=>te(n)===r)||null}function rd(r){if(!r)return;let n=x("[data-section-body]",r);if(!n||n.dataset.loaded==="1")return;let s=$l(r.dataset.sectionCard);s&&(n.innerHTML=zi(s),n.dataset.loaded="1",ni(r),ia(r.closest("#"+e+"-body")))}function Pl(r){if(!r)return;let n=x("[data-section-body]",r),s=$l(r.dataset.sectionCard);!n||!s||(Hi(r.dataset.sectionCard),n.innerHTML=zi(s),n.dataset.loaded="1",ni(r))}function Nl(r=""){c.contentStateDirty=!0,r&&(c.contentCommitMessage=r),clearTimeout(c.contentCommitTimer),c.contentCommitTimer=setTimeout(()=>{c.contentCommitTimer=null;let n=c.contentCommitMessage;c.contentCommitMessage="",Yr(n||void 0,{validate:!1,deferPreview:!0})},100)}function Ce(r=""){let n=!!c.contentCommitTimer||!!c.contentCommitMessage||c.contentStateDirty;clearTimeout(c.contentCommitTimer),c.contentCommitTimer=null;let s=r||c.contentCommitMessage;return c.contentCommitMessage="",!n&&!r?!0:Yr(s||void 0,{validate:!0,deferPreview:!0})}function Rl(){let r=c.dashboardPin,n=Zr(),s=r.status==="ready"&&r.pin&&r.slug===n,o="Belum diambil",u="idle";return n?r.busy||r.status==="loading"?(o="Memuat\u2026",u="loading"):r.status==="needkey"?(o="Perlu kunci",u="warn"):r.status==="error"?(o="Gagal",u="error"):s&&(o="Aktif",u="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${u}">${o}</span>`}function Fl(){if(!c.config)return Ft();if(!Fi())return ed();let r=Mi(),n=td(),s=r.filter(o=>c.search?(n.get(te(o))||"").includes(c.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${Rl()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${wl()}</div>
      </div>

      ${s.map(o=>{let u=te(o),h=o.label||u,m=Rt(o),v=!o.visiblePath||D(c.config,o.visiblePath)!==!1,S=ta(o),w=!c.search&&c.contentOpenSections.has(u);return`
            <article
              class="section ${m?"section-sortable":"section-pinned"}${w?" open":""}"
              data-section-card="${C(u)}"
            >
              <div
                class="section-head"
                title="${m?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${C(h)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${C(u)}"
                    draggable="${m?"true":"false"}"
                    ${m?"":"disabled"}
                    aria-label="Drag ${C(h)}"
                    title="${m?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${Qp()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${C(u)}"
                    ${Di(u,-1)?"":"disabled"}
                    aria-label="Naikkan ${C(h)}"
                    title="Naik"
                  >
                    ${el("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${C(u)}"
                    ${Di(u,1)?"":"disabled"}
                    aria-label="Turunkan ${C(h)}"
                    title="Turun"
                  >
                    ${el("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${C(h)}
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
                            data-visible-path="${C(o.visiblePath)}"
                            ${v?"checked":""}
                          >
                          <span class="switch"></span>
                        </label>
                      `:""}
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${C(h)}"
                >
                  ${Xo("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${C(u)}"
                data-loaded="${w?"1":"0"}"
              >
                ${w?zi(o):""}
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
    `}function ra(){return ke().flatMap(r=>r.fields||[]).filter(r=>we(r)==="repeater-image"&&r?.path)}function Ol(){return ra()[0]||null}function Ml(r){let n=String(r||"").trim();return n&&ra().find(s=>String(s.path||"").trim()===n)||null}function Gi(r){let n=Array.isArray(r?.fields)?r.fields:[];return n.find(s=>s?.key&&ai(s))||n.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Dl(r){let n=String(r||"").trim();if(!n)return null;for(let s of ra()){let o=String(s.path||"").trim(),u=o+".";if(!o||!n.startsWith(u))continue;let h=n.slice(u.length).split(".");if(h.length!==2)continue;let m=Number(h[0]);if(!Number.isInteger(m)||m<0)continue;let v=Gi(s),S=String(v?.key||"src");if(h[1]===S)return{field:s,imageField:v,imageKey:S,rootPath:o,index:m}}return null}function Vl(r){return c.doc?!!k('[data-sve-type="image"][data-sve-field]',c.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function aa(){let r=[],n=new Set;return ke().forEach(s=>{(s.fields||[]).forEach(o=>{if(ai(o)&&o.type!=="repeater-image"&&o.path&&!n.has(o.path)&&(r.push({label:o.label||Nt(o.path),path:o.path,gallery:!1,wrapped:Vl(o.path)}),n.add(o.path)),o.type==="repeater"&&o.path){let u=D(c.config,o.path),h=(o.fields||[]).filter(m=>ai(m)&&m.key);Array.isArray(u)&&h.length&&u.forEach((m,v)=>{h.forEach(S=>{let w=o.path+"."+v+"."+S.key;n.has(w)||(r.push({label:(s.label||o.label||Nt(o.path))+" "+(v+1)+" \xB7 "+(S.label||Nt(S.key)),path:w,gallery:!1,wrapped:Vl(w)}),n.add(w))})})}if(we(o)==="repeater-image"&&o.path){let u=D(c.config,o.path),h=Gi(o),m=String(h?.key||"src");Array.isArray(u)&&u.forEach((v,S)=>{let w=o.path+"."+S+"."+m;n.has(w)||(r.push({label:(o.label||"Foto Gallery")+" "+(S+1),path:w,gallery:!0,index:S,rootPath:o.path,imageKey:m,wrapped:!0}),n.add(w))})}})}),c.doc&&k('[data-sve-type="image"][data-sve-field]',c.doc).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o||n.has(o))return;let u=Dl(o),h=!!u;r.push({label:s.getAttribute("data-sve-label")||Nt(o),path:o,gallery:h,index:u?u.index:null,rootPath:u?u.rootPath:null,imageKey:u?u.imageKey:null,wrapped:!!s.closest("[data-sve-image-wrapper]")}),n.add(o)}),r}function na(){return(!c.config.imageSettings||typeof c.config.imageSettings!="object"||Array.isArray(c.config.imageSettings))&&(c.config.imageSettings={}),c.config.imageSettings}function Ot(r){let n=c.config?.imageSettings,s=n&&typeof n=="object"?n[r]:null,u=Dl(r)?"1:1":"16:9";return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:Yp(s?.fit),alignPos:Vr.includes(s?.alignPos)?s.alignPos:"default",ratio:Dr.includes(s?.ratio)?s.ratio:u,hidden:s?.hidden===!0}}function kt(r,n){let s=na();s[r]={...Ot(r),...n}}function ad(){let r=c.config?.imageSettings;if(!r||typeof r!="object")return;let n=new Set(aa().map(s=>s.path));Object.keys(r).forEach(s=>{n.has(s)||delete r[s]})}function nd(){let r=U("css");if(!r)return;let n=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();n!==r.trim()&&at("css",n)}function sd(r){if(!r||!c.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let u=Ot(o),h=s.closest("[data-sve-image-wrapper]"),m=h||s,v=Zo[u.ratio]||Zo["16:9"],S=u.align==="left"?"0":"auto",w=u.align==="right"?"0":"auto";h?(h.style.display=u.hidden?"none":"",h.style.width=u.width+"%",h.style.maxWidth="100%",h.style.marginLeft=S,h.style.marginRight=w,h.style.aspectRatio=v,s.style.width="100%"):(s.style.display=u.hidden?"none":"",s.style.width=u.width+"%",s.style.maxWidth="100%",s.style.marginLeft=S,s.style.marginRight=w,s.style.aspectRatio=v),u.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=u.fit;let _=Kp[u.alignPos]||"";_?s.style.objectPosition=_:s.style.removeProperty("object-position"),s.style.height="100%"})}function ix(){ji.request({images:!0})}function od(r){let n={"top left":`
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
    `}function ld(r){let n=Ot(r.path),s=h=>h==="left"?`
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
      `,o=Vr.filter(h=>h!=="default").map(h=>`
            <button
              type="button"
              class="advance-pos-btn ${n.alignPos===h?"active":""}"
              data-image-alignpos-path="${C(r.path)}"
              data-image-alignpos="${C(h)}"
              title="${C(h)}"
              aria-label="${C("Posisi "+h)}"
            >
              ${od(h)}
            </button>
          `).join(""),u=Dr.map(h=>`
            <button
              type="button"
              class="advance-ratio-btn ${n.ratio===h?"active":""}"
              data-image-ratio-path="${C(r.path)}"
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
              data-image-alignpos-path="${C(r.path)}"
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
                data-image-width-path="${C(r.path)}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${n.width}"
                  data-image-width-number="${C(r.path)}"
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
                data-image-fit-path="${C(r.path)}"
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
                data-image-fit-path="${C(r.path)}"
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
                data-image-fit-path="${C(r.path)}"
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
              ${u}
            </div>
          </div>

        </div>
      </details>
    `}function cd(){return`
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
    `}function ud(){return`
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
    `}function Bl(){return`
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
    `}function pd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${Bl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function hd(){return`
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
    `}function jl(r){return r?`
      <div class="gallery-add-wrap">
        <button
          type="button"
          class="gallery-add-button"
          data-gallery-add="${C(r.path)}"
        >
          + Tambah Foto
        </button>
      </div>
    `:""}function dd(r,n){let s=D(c.config,r);if(!Array.isArray(s)||n<0||n>=s.length)return;let o=Ml(r),u=Gi(o),h=String(u?.key||"src"),m=na(),v={};for(let S=0;S<s.length;S++){let w=r+"."+S+"."+h;Object.prototype.hasOwnProperty.call(m,w)&&(v[S]=Pe(m[w]))}s.splice(n,1),Object.keys(m).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+h)&&delete m[S]});for(let S=0;S<s.length;S++){let w=S<n?S:S+1,_=v[w];_&&(m[r+"."+S+"."+h]=_)}ad(),se("Foto gallery dihapus"),re()}function fd(r){c.config&&(me(c.config,r,""),kt(r,{hidden:!0}),se("Gambar dihapus"),re())}function md(){if(!c.config||!c.defaultConfig)return;let r=Ol();r&&me(c.config,r.path,Pe(D(c.defaultConfig,r.path)||[])),aa().filter(n=>!n.gallery).forEach(n=>{me(c.config,n.path,Pe(D(c.defaultConfig,n.path))??"")}),c.config.imageSettings=Pe(c.defaultConfig.imageSettings||{}),se(),re()}function gd(){if(!c.config)return Ft();let r=aa().filter(m=>c.search?(m.label+" "+m.path).toLowerCase().includes(c.search):!0),n=Ol(),s=n?r.filter(m=>m.gallery&&m.rootPath===n.path):[],o=s.length?s[s.length-1].path:"",u=r.map(m=>{let v=D(c.config,m.path)||"",S=Ot(m.path),_=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!m.gallery?`data-gallery-delete-index="${C(m.rootPath)}" data-gallery-index="${Number(m.index)}"`:`data-image-delete-path="${C(m.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${ud()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${C(m.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${hd()}
              </button>
            </div>
          `,I=`
            <div
              class="group image-card ${S.hidden?"image-card-hidden":""}"
              data-image-card-path="${C(m.path)}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${v?`
                        <img
                          class="preview"
                          src="${C(v)}"
                          alt=""
                        >
                      `:pd(m.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${C(m.label)}">
                    ${C(m.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${C(m.path)}">
                    CONFIG.${C(m.path)}
                  </p>
                </div>

                ${_}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${C(m.path)}"
                  value="${C(v)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${C(m.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${C(m.path)}"
                  title="Paste URL"
                  aria-label="Paste URL ${C(m.label)} dari clipboard"
                >
                  ${cd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${ld(m)}
            </div>
          `;return n&&m.path===o?I+jl(n):I}).join(""),h=n&&!s.length&&!c.search?jl(n):"";return u+h+`
        <div class="image-global-reset">
          <button
            type="button"
            class="button danger full"
            id="${e}-reset-images"
          >
            Reset
          </button>
        </div>
      `}function Mt(r,n){let s=r?.closest(".image-card");if(!s)return;let o=x(".image-preview-shell",s);if(!o)return;let u=r.value.trim(),h=Ot(n),m=x(".preview",o);if(u){if(!m||m.tagName!=="IMG"){let v=document.createElement("img");v.className="preview",v.alt="",m?m.replaceWith(v):o.prepend(v),m=v}m.src=u}else{if(!m||m.tagName!=="BUTTON"||!m.classList.contains("image-upload-placeholder")){let v=document.createElement("button");v.type="button",v.className="preview empty image-upload-placeholder",v.dataset.imageFocus=n,v.setAttribute("aria-label","Masukkan URL gambar"),m?m.replaceWith(v):o.prepend(v),m=v}m.innerHTML=`
        <span class="image-upload-icon">
          ${Bl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,m.onclick=()=>{r.focus(),r.select?.()}}m.style.width="100%",m.style.height="100%",m.style.maxWidth="none",m.style.aspectRatio="auto",m.style.objectFit="cover",m.style.marginLeft="0",m.style.marginRight="0",s.classList.toggle("image-card-hidden",h.hidden)}function si(r,n){let s=Ot(n);k(`[data-image-align-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlign===s.align)}),k(`[data-image-fit-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageFit===s.fit)}),k(`[data-image-alignpos-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageAlignpos===s.alignPos)}),k(`[data-image-ratio-path="${CSS.escape(n)}"]`,r).forEach(h=>{h.classList.toggle("active",h.dataset.imageRatio===s.ratio)});let o=x(`[data-image-width-path="${CSS.escape(n)}"]`,r),u=x(`[data-image-width-number="${CSS.escape(n)}"]`,r);o&&(o.value=s.width),u&&(u.value=s.width)}function bd(r){let n=String(r||"").trim();if(!n||/^var\(/i.test(n))return!1;try{return CSS.supports("color",n)}catch{return/^#[0-9a-f]{3,8}$/i.test(n)}}function oi(r,n="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let u=o[1];return u.length===3&&(u=u.split("").map(h=>h+h).join("")),"#"+u.slice(0,6).toLowerCase()}try{let u=document.createElement("span");if(u.style.color=s,!u.style.color)return n;u.style.position="fixed",u.style.left="-9999px",document.body.appendChild(u);let h=getComputedStyle(u).color;u.remove();let m=h.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!m)return n;let v=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+v(m[1])+v(m[2])+v(m[3])}catch{return n}}function xd(){return E.some(([,,r])=>!!Se(r))}function yd(r,n){let s=Se(n);if(!s)return`
        <div class="field color-row color-row-unset">
          <div
            class="color-unset-swatch"
            aria-hidden="true"
          ></div>

          <div>
            <label>
              ${C(r)}
            </label>

            <input
              type="text"
              value=""
              placeholder="Belum diset"
              disabled
              aria-label="${C(r)} belum tersedia"
            >

            <small>
              ${C(n)}
            </small>
          </div>
        </div>
      `;let o=oi(s,"#ffffff");return`
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${C(n)}"
          value="${C(o)}"
          aria-label="${C(r)}"
        >

        <div>
          <label>
            ${C(r)}
          </label>

          <input
            type="text"
            data-color-token-var="${C(n)}"
            value="${C(s)}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${C(n)}
          </small>
        </div>
      </div>
    `}function vd(){return c.config?xd()?["Background","Body Teks","Button Primary","Button Secondary"].map(n=>`
            <div class="group">
              <div class="group-title">
                ${n}
              </div>

              ${E.filter(s=>s[0]===n).map(([,s,o])=>yd(s,o)).join("")}
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
      `:Ft()}let kd={"playwrite brasil guides":"Playwrite BR Guides"};function sa(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function oa(r){let n="";try{n=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{n=String(r||"").replace(/\+/g," ")}return sa(n.split(":")[0].replace(/\s+/g," "))}function li(r){let n=sa(r);return n?kd[n.toLowerCase()]||n:""}function Sd(r){let n=String(r||"").trim();if(!n)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(n))try{let o=new URL(n),u=o.hostname.toLowerCase();if(u==="fonts.google.com"||u==="www.fonts.google.com"){let h=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(h?.[1])return{family:li(oa(h[1])),isUrl:!0,valid:!0};let m=o.searchParams.get("family");return m?{family:li(oa(m)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(u==="fonts.googleapis.com"){let m=o.searchParams.getAll("family")[0]||"";return m?{family:li(oa(m)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=n.split(",")[0];return{family:li(sa(s)),isUrl:!1,valid:!0}}function wd(r,n=""){let s=li(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),u=String(n||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(u?":wght@"+encodeURIComponent(u):"")+"&display=swap"}function la(r,n=""){let s=wd(r,n);return s?new Promise(o=>{let u=e+"-font-validation-link";document.getElementById(u)?.remove();let h=document.createElement("link"),m=!1,v=w=>{m||(m=!0,clearTimeout(S),h.onload=null,h.onerror=null,o(w))},S=setTimeout(()=>{v({ok:!1,reason:"timeout"})},7e3);h.id=u,h.rel="stylesheet",h.href=s,h.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let w=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!w||w.length===0){v({ok:!1,reason:"font-file"});return}}v({ok:!0,reason:"ok",url:s})}catch{v({ok:!1,reason:"font-file"})}},h.onerror=()=>{v({ok:!1,reason:"stylesheet"})},document.head.appendChild(h)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Cd(r,n){let o=Wi(n,Se(n==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),u=await la(r,o);return u.ok?{...u,weight:o}:o!=="400"&&(u=await la(r,"400"),u.ok)?{...u,weight:"400",normalizedWeight:!0}:(u=await la(r,""),u.ok?{...u,weight:"400",normalizedWeight:o!=="400"}:{...u,weight:o})}function ca(r,n){if(r)try{let s=e+"-preview-font-link",o=r.getElementById(s);if(!n){o?.remove();return}o||(o=r.createElement("link"),o.id=s,o.rel="stylesheet",(r.head||r.documentElement)?.appendChild(o)),o.getAttribute("href")!==n&&o.setAttribute("href",n)}catch{}}function Ul(){let r=Gl();k("iframe").forEach(n=>{try{ca(n.contentDocument,r)}catch{}}),requestAnimationFrame(()=>{k("iframe").forEach(n=>{try{ca(n.contentDocument,r)}catch{}})})}function Hl(r){return String(D(c.config,"editorStyle.googleFonts."+r)||"").trim()}function zl(r){let n=Hl(r);if(n)return n;let o=Se(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function Ed(r,n){return n==="heading"?"serif":"sans-serif"}function Ad(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Td(r,n){return K.includes(String(n))}function Id(r){return K}function Wi(r,n){let s=String(n||"").trim();return K.includes(s)?s:"400"}function Ld(r,n=!1){let s=x("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",u=x(`[data-style-var="${CSS.escape(o)}"]`,s);if(!u)return;let h=Se(o)||"400",m=Wi(r,h);n&&m!==h&&Ue(o,m),u.innerHTML=Yi(m,K,!1),u.value=m}function Gl(){let r=new Map;["heading","body"].forEach(s=>{let o=Hl(s);if(!o)return;let u=o.trim().toLowerCase();if(!u)return;r.has(u)||r.set(u,{family:o,weights:new Set});let m=Wi(s,Se(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(u).weights.add(m)});let n=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),u=Array.from(s.weights).sort((h,m)=>Number(h)-Number(m));return"family="+o+":wght@"+u.join(";")});return n.length?"https://fonts.googleapis.com/css2?"+n.join("&")+"&display=swap":""}function qi(){let r=Gl(),n="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r){if(c.editors.head){let m=U("head");o.test(m)&&at("head",m.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),k("iframe").forEach(m=>{try{ca(m.contentDocument,"")}catch{}});return}let u=`${n}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${r}">
${s}`;if(c.editors.head){let m=U("head");m=o.test(m)?m.replace(o,u):m.trimEnd()+`

`+u+`
`,at("head",m)}let h=document.getElementById(e+"-font-link");h||(h=document.createElement("link"),h.id=e+"-font-link",h.rel="stylesheet",document.head.appendChild(h)),h.href=r,Ul()}async function Ki(r){let n=x("#"+e+"-"+r+"-font");if(!n)return;let s=Sd(n.value);if(!s.valid||!s.family)return;let o=s.family;n.value=o;let u=await Cd(o,r);if(!u.ok){u.reason==="stylesheet"||u.reason==="font-file"||u.reason;return}let h=r==="heading"?"--sve-font-heading":"--sve-font-body",m=r==="heading"?"--sve-heading-weight":"--sve-body-weight";u.normalizedWeight&&u.weight&&Ue(m,u.weight),me(c.config,"editorStyle.googleFonts."+r,o),se(),Ue(h,`"${o}", ${Ed(o,r)}`),Ld(r,!1),qi(),Ul(),je()}function Yi(r,n,s=!0,o=!1){let u=String(r||"").trim(),h=s&&u&&!n.includes(u)?[u,...n]:[...n];return o&&(h=[...new Set(h)].sort((m,v)=>{let S=Number.parseFloat(m),w=Number.parseFloat(v);return Number.isFinite(S)&&Number.isFinite(w)?S-w:String(m).localeCompare(String(v))})),h.map((m,v)=>{let S=n.includes(u)||s?m===u:v===0;return`
            <option
              value="${C(m)}"
              ${S?"selected":""}
            >
              ${C(m)}
            </option>
          `}).join("")}function _d(r){let n=Se(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${C(r.variable)}"
        >
          ${Yi(n,L,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${C(r.variable)}"
        >
          ${Yi(n,q,!1)}
        </select>
      `;if(r.type==="weight"){let s=Ad(r.variable),o=s?Id(s):K,u=s?Wi(s,n):n;return`
        <select
          class="style-select"
          data-style-var="${C(r.variable)}"
        >
          ${Yi(u,o,!1)}
        </select>
      `}return""}function $d(){if(!c.config)return;let r=c.defaultConfig||{},n=D(r,"editorStyle.googleFonts.heading"),s=D(r,"editorStyle.googleFonts.body");typeof n=="string"&&me(c.config,"editorStyle.googleFonts.heading",n),typeof s=="string"&&me(c.config,"editorStyle.googleFonts.body",s),fe.forEach(o=>{let u=Ui(o.variable)||o.fallback;Ue(o.variable,u)}),se(),qi(),re()}function Pd(){return c.config?`
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
            value="${C(zl("heading"))}"
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
            value="${C(zl("body"))}"
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
          ${X.map(r=>{let n=fe.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${C(r.label)}</div>
                  <div class="typography-control-grid">
                    ${n.map(s=>`
                      <div class="typography-control">
                        <label>${C(s.label)}</label>
                        ${_d(s)}
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
    `:Ft()}function Qi(r){let n=String(r||"").trim().toLowerCase();if(!n)return 0;if(/^\d+$/.test(n))return Math.max(0,Number(n));let s=n.split(":").map(m=>Number(m));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(n.match(/(\d+)h/)?.[1]||0),u=Number(n.match(/(\d+)m/)?.[1]||0),h=Number(n.match(/(\d+)s/)?.[1]||0);return o||u||h?Math.max(0,o*3600+u*60+h):0}function Wl(r){let n=String(r||"").trim();if(!n)return 0;try{let s=new URL(n,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let u of o){let h=Qi(u);if(h>0)return h}}catch{let o=n.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return Qi(o?.[1]||"")}return 0}function ua(r){let n=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(n/3600),o=Math.floor(n%3600/60),u=n%60,h=m=>String(m).padStart(2,"0");return s>0?s+":"+h(o)+":"+h(u):o+":"+h(u)}function Nd(r,n){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(n)||0));if(!s)return s;try{let u=new URL(s,location.href);return u.searchParams.delete("start"),o>0?u.searchParams.set("t",String(o)):u.searchParams.delete("t"),u.hash&&/(?:^#|[&#])t=/i.test(u.hash)&&(u.hash=""),u.toString()}catch{let h=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?h:h+(h.includes("?")?"&":"?")+"t="+o}}function ql(r,n){let s=Wl(n),o=x("#"+e+"-audio-start-enabled",r),u=x("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),u&&(u.disabled=s<=0,u.value=ua(s))}function Rd(){if(!c.config)return Ft();let r=gl(),n=r.path||"assets.audio",s=D(c.config,n),o=typeof s=="string"?s:"",u=Wl(o);return`
      <div class="group">
        <div class="group-title">
          ${C(r.label||"Audio Undangan")}
        </div>

        <div class="field audio-field">
          <label>
            URL Audio / YouTube
          </label>

          <input
            type="text"
            id="${e}-audio-url"
            value="${C(o)}"
            placeholder="https://youtu.be/VIDEO_ID"
            autocomplete="off"
          >

          <div class="audio-start-row">
            <input
              type="checkbox"
              id="${e}-audio-start-enabled"
              class="audio-start-check"
              ${u>0?"checked":""}
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
              value="${C(ua(u))}"
              placeholder="0:00"
              ${u>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function Zi(r,n){(Array.isArray(r)?r:[]).forEach(s=>{n(s),we(s)==="repeater"&&Zi(s.fields,n),we(s)==="repeater-image"&&Zi(s.fields,n)})}function Kl(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},n={html:U("html"),css:U("css"),js:U("js"),head:U("head")},s=(S,w)=>{try{let _=new URL(w,location.origin);if(_.protocol!=="https:"&&_.protocol!=="http:")return;let I=_.origin;if(I===location.origin)return;r[S]?.add(I)}catch{}},o=(S,w)=>{let _=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(_)||[]).forEach(I=>s(w,I))};try{let S=new DOMParser().parseFromString(n.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(w=>{s("img_src",w.getAttribute("src")||w.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(w=>s("media_src",w.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(w=>s("frame_src",w.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(w=>s("script_src",w.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(w=>s("style_src",w.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(w=>s("manifest_src",w.getAttribute("href")||""))}catch{}let u=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,h;for(;h=u.exec((n.css||"")+`
`+(n.head||""));){let S=h[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}o(n.head,"style_src");let m=JSON.stringify(c.config||{}),v=D(c.config,"guestbook.endpoint");return v&&s("connect_src",v),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let w=D(c.config,S);w&&s("connect_src",w)}),(m.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(n.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,w])=>[S,Array.from(w).sort()]))}function Fd(){return{"Body HTML":U("html"),CSS:U("css"),JavaScript:U("js"),"Additional Head":U("head"),CONFIG:JSON.stringify(c.config||{})}}function Yl(r,n,s){let o=Fd(),u=Wp(o);u.length?r("Gambar base64 terdeteksi di "+Qo(u)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let h=qp(o);h.length&&n("Data URI berukuran besar di "+Qo(h)+"; pertimbangkan pindah ke file hosting")}function Od(){let r=[],n=[],s=[],o=Q=>r.push(Q),u=Q=>n.push(Q),h=Q=>s.push(Q);if(c.config?h("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),c.schema?h("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),c.config)try{JSON.stringify(c.config),h("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let m=Array.isArray(c.schema?.sections)?c.schema.sections:[],v=m.map(te).filter(Boolean),S=new Set(v);m.length||o("SVE_SCHEMA custom page belum memiliki section"),v.length!==S.size&&o("SVE_SCHEMA memiliki duplicate section id");let w=Array.isArray(c.config?.sectionOrder)?c.config.sectionOrder:[],_=new Set(w);w.length!==_.size&&o("CONFIG.sectionOrder memiliki duplicate id"),v.forEach(Q=>{_.has(Q)||o("sectionOrder belum memuat: "+Q)}),m.forEach(Q=>{let xe=te(Q);Q.visiblePath&&(_t(Q.visiblePath)||o("Unsafe visiblePath pada section "+xe),c.config&&typeof D(c.config,Q.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+xe)),Zi(Q.fields,de=>{let pt=we(de);it.has(pt)||o("Field type tidak didukung: "+pt+" ("+(de.path||de.key||xe)+")"),de.path&&!_t(de.path)&&o("Unsafe field path: "+de.path),(pt==="repeater"||pt==="repeater-image")&&!Array.isArray(de.fields)&&o("Repeater tanpa fields[]: "+(de.path||xe)),pt==="repeater"&&(de.fields||[]).forEach(ui=>{let pa=we(ui);(pa==="repeater"||pa==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(de.path||xe)),ui.key||o("Repeater subfield tanpa stable key: "+(de.path||xe))})})});let I=["html","css","js","head"].map(U).join(`
`);/\beval\s*\(/.test(I)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(I)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(I)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(I)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(I)&&o("Kemungkinan secret/private credential terdeteksi"),Yl(o,u,h);let A=ea(),z=fe.map(Q=>Q.variable).filter(Q=>!Xr(A,Q));z.length?o("Typography role tokens belum lengkap: "+z.join(", ")):h("Semua typography role tokens tersedia");let B=Kl();return Object.values(B).reduce((Q,xe)=>Q+xe.length,0)&&u("External origin terdeteksi; salin CSP manifest ke Scalev Security"),h("Custom page aktif; validasi "+oe.length+" section wedding dilewati"),{status:r.length?"BLOCKER":n.length?"WARNING":"PASS",blockers:r,warnings:n,passes:s,csp:B}}let Ji=null;function Ql(){let r=["html","css","js","head"].map(U);if(Ji&&r.every((o,u)=>o===Ji.sources[u]))return Ji.report;let n=new DOMParser().parseFromString(r[0],"text/html");n.head.insertAdjacentHTML("beforeend",r[3]);let s=Ko({doc:n,scripts:[r[2],...Array.from(n.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(n.querySelectorAll("style"),o=>o.textContent).join(`
`)});return Ji={sources:r,report:s},s}function Zl(){let r=Ql();if(c.schema?.template?.type==="custom-page"){let F=Od();return F.blockers=[...new Set([...r.blockers,...F.blockers])],F.blockers.length&&(F.status="BLOCKER"),F}let n=[...r.blockers],s=[],o=[],u=F=>n.push(F),h=F=>s.push(F),m=F=>o.push(F);if(c.config?m("CONFIG terbaca sebagai static object"):u("CONFIG tidak terbaca"),c.schema?m("SVE_SCHEMA eksplisit tersedia"):u("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),c.config)try{JSON.stringify(c.config),m("CONFIG JSON-compatible")}catch{u("CONFIG tidak dapat diserialisasi dengan aman")}let v=Array.isArray(c.schema?.sections)?c.schema.sections:[],S=v.map(te).filter(Boolean),w=new Set(S);S.length!==w.size&&u("SVE_SCHEMA memiliki duplicate section id"),oe.forEach(F=>{w.has(F)||u("Canonical section hilang: "+F)}),oe.every(F=>w.has(F))&&m(oe.length+" canonical sections tersedia");let _=Array.isArray(c.config?.sectionOrder)?c.config.sectionOrder:[],I=new Set(_);_.length!==I.size&&u("CONFIG.sectionOrder memiliki duplicate id"),oe.forEach(F=>{I.has(F)||u("sectionOrder belum memuat: "+F)}),_[0]&&_[0]!=="cover"&&u("Cover wajib menjadi section pertama"),oe.filter(F=>F!=="cover").forEach(F=>{typeof D(c.config,"sections."+F)!="boolean"&&u("Boolean visibility tidak valid: sections."+F)}),v.forEach(F=>{let Le=te(F);Le==="cover"?(F.locked!==!0||F.canHide!==!1)&&u("Cover harus locked dan canHide:false"):F.visiblePath&&!_t(F.visiblePath)&&u("Unsafe visiblePath pada section "+Le),Zi(F.fields,He=>{let pi=we(He);it.has(pi)||u("Field type tidak didukung: "+pi+" ("+(He.path||He.key||Le)+")"),He.path&&!_t(He.path)&&u("Unsafe field path: "+He.path),(pi==="repeater"||pi==="repeater-image")&&!Array.isArray(He.fields)&&u("Repeater tanpa fields[]: "+(He.path||Le)),pi==="repeater"&&(He.fields||[]).forEach(rc=>{let ac=we(rc);(ac==="repeater"||ac==="repeater-image")&&u("Nested repeater tidak diizinkan: "+(He.path||Le)),rc.key||u("Repeater subfield tanpa stable key: "+(He.path||Le))})})});let A=["html","css","js","head"].map(U).join(`
`);/\beval\s*\(/.test(A)&&u("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(A)&&u("new Function() terdeteksi"),/javascript\s*:/i.test(A)&&u("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(A)&&u("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(A)&&u("Kemungkinan secret/private credential terdeteksi"),Yl(u,h,m);let z=U("js");/\bconst\s+CONFIG\s*=/.test(z)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(z)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let B=D(c.config,"sections.rsvp")===!0,ce=D(c.config,"sections.guestbook")===!0,Q=String(D(c.config,"rsvp.endpoint")||""),xe=D(c.config,"rsvp.enabled"),de=!!Q||xe!==void 0;if(B)if(de)xe!==!0&&u("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(Q)||u("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let F=String(D(c.config,"extensions.rsvpBackend.mode")||"none");if(F!=="none"&&F!=="external"&&u("RSVP backend mode harus none atau external"),F==="external"){let Le=String(D(c.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test(Le)||u("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(ce){let F=D(c.config,"guestbook.enabled"),Le=String(D(c.config,"guestbook.endpoint")||"");F!==!0&&u("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test(Le)||u("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let pt=ea(),ui=fe.map(F=>F.variable).filter(F=>!Xr(pt,F));ui.length?u("Typography role tokens belum lengkap: "+ui.join(", ")):m("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(pt)&&h("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let ic=Kl();return Object.values(ic).reduce((F,Le)=>F+Le.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):m("Tidak ada external origin wajib dari scanner"),{status:n.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:n,warnings:s,passes:o,csp:ic}}function Md(r){return r==="PASS"?`
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
    `}function Dd(){if(!c.config)return Ft();let r=Zl(),n=(u,h)=>u.length?`<ul>${u.map(m=>`<li>${C(m)}</li>`).join("")}</ul>`:`<p class="compat-empty">${C(h)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
      <div class="compatibility-panel">
        <div class="compat-status compat-${r.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${Md(r.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${C(s)}</strong>
            </div>
            <small>${C(o)}</small>
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
              <pre class="compat-code">${C(JSON.stringify(r.csp,null,2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 \xB7 VE v${t}</small>
          </div>
        </details>
      </div>
    `}function Vd(r){let n=[],s=new WeakSet,o=(u,h="CONFIG")=>{if(u!==null){if(typeof u=="object"){if(s.has(u)){n.push("Referensi berulang: "+h);return}s.add(u)}if(Array.isArray(u)){u.forEach((m,v)=>o(m,h+"."+v));return}if(typeof u=="object"){Object.keys(u).forEach(m=>{Xt.has(m)&&n.push("Forbidden key: "+h+"."+m),o(u[m],h+"."+m)});return}["string","number","boolean"].includes(typeof u)||n.push("Non-static value: "+h),typeof u=="number"&&!Number.isFinite(u)&&n.push("Non-finite number: "+h)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{n.push("CONFIG gagal round-trip JSON")}return n}function Bd(){let r=c.templateLibrary,n=String(c.search||"").trim().toLowerCase(),s=r.templates.filter(h=>n?[h.name].join(" ").toLowerCase().includes(n):!0);r.status==="idle"&&ul().then(()=>{c.tab==="library"&&(c.uiPrepared=!1,re())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${C(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",u=s.map(h=>{let m=!!h.sourceUrl,v=h.id===r.importedId;return`
        <article class="library-card${v?" is-active":""}" role="listitem"${v?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${C(h.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${C(String(h.commissionRate))}%</strong> dari harga paket</span>
                <a href="${l}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${v?"danger":"primary"} library-import-button"
                data-library-import="${C(h.id)}"
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
          `:u?`<div class="library-grid" role="list">${u}</div>`:`
              <div class="library-empty" role="status">
                <strong>Belum ada template yang cocok.</strong>
                <span>${n?"Coba kata pencarian lain.":"Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `}function jd(){let r=x("#"+e+"-search");if(!r)return;let n=c.tab==="library";r.placeholder=n?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",n?"Cari template":"Cari section atau field")}function re(){let r=performance.now(),n=x("#"+e+"-body");if(!n)return;if(c.uiPrepared&&c.renderedTab===c.tab&&c.renderedSearch===c.search){c.performance.skippedTabRenders+=1;return}n.dataset.sveTab=c.tab||"content",c.tab==="library"?n.innerHTML=Bd():c.tab==="content"?n.innerHTML=Fl():c.tab==="images"?n.innerHTML=gd():c.tab==="colors"?n.innerHTML=vd():c.tab==="style"?n.innerHTML=Pd():c.tab==="audio"?n.innerHTML=Rd():c.tab==="compatibility"?n.innerHTML=Dd():n.innerHTML=Fl(),qd(n),jd(),c.tab==="content"&&id(),c.uiPrepared=!0,c.renderedTab=c.tab||"content",c.renderedSearch=c.search||"";let s=performance.now()-r;c.performance.renderCount+=1,c.performance.lastRenderMs=Math.round(s*100)/100,c.performance.lastRenderTab=c.renderedTab,s>50&&(c.performance.slowRenders+=1)}function Ud(r,n){return x('[data-image-path="'+CSS.escape(n)+'"]',r)}let Hd="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function Jl(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(Hd),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function zd(r,n){let s=Ud(r,n);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):Mr(o)?(Jl(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function Gd(r){let n=String(r.dataset.fieldType||"text"),s=r.value;return n==="boolean"?s=!!r.checked:n==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):n==="datetime"&&(s=Hh(r.value)),s}function Xl(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;me(c.config,r.dataset.fieldPath,Gd(r));let n=r.closest("[data-section-card]");return Hi(n?.dataset.sectionCard),ni(n),c.contentStateDirty=!0,!0}function ec(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let n=()=>{k(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;Ce(),ml(o.dataset.sectionUp,-1);return}let u=s.target.closest("[data-section-down]");if(u){if(s.preventDefault(),s.stopPropagation(),u.disabled)return;Ce(),ml(u.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let h=s.target.closest("[data-repeat-add]");if(h){let w=h.dataset.repeatAdd,_=ke().flatMap(A=>A.fields||[]).find(A=>A.type==="repeater"&&A.path===w),I=D(c.config,w);Array.isArray(I)||(me(c.config,w,[]),I=D(c.config,w)),I.push(Il(_||{})),c.contentStateDirty=!0,Hi(h.closest("[data-section-card]")?.dataset.sectionCard),Ce("Item ditambahkan"),Pl(h.closest("[data-section-card]"));return}let m=s.target.closest("[data-repeat-delete]");if(m){let w=D(c.config,m.dataset.repeatDelete);if(!Array.isArray(w))return;let _=ke().flatMap(A=>A.fields||[]).find(A=>A.type==="repeater"&&A.path===m.dataset.repeatDelete),I=Number.isFinite(_?.min)?_.min:0;if(w.length<=I){Ce("Minimal "+I+" item");return}w.splice(Number(m.dataset.repeatIndex),1),c.contentStateDirty=!0,Hi(m.closest("[data-section-card]")?.dataset.sectionCard),Ce("Item dihapus"),Pl(m.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){clearTimeout(c.contentCommitTimer),c.contentCommitTimer=null,c.contentCommitMessage="",c.contentStateDirty=!1,Cl();return}if(s.target.closest("#"+e+"-team-key-save")){Vh();return}if(s.target.closest("#"+e+"-pin-peek")){Jr("peek");return}if(s.target.closest("#"+e+"-pin-generate")){Jr("generate");return}if(s.target.closest("#"+e+"-pin-copy")){Bh();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let w=S.closest("[data-section-card]");if(!w)return;let _=!w.classList.contains("open");w.classList.toggle("open",_);let I=w.dataset.sectionCard;_?(k("[data-section-card].open",r).forEach(A=>{if(A===w)return;A.classList.remove("open");let z=A.dataset.sectionCard;z&&c.contentOpenSections.delete(z),ni(A)}),ia(r),c.contentOpenSections.add(I),rd(w)):(c.contentOpenSections.delete(I),ni(w),ia(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||Xl(o)&&Nl())}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){me(c.config,o.dataset.visiblePath,o.checked),Nl(o.checked?"Section ditampilkan":"Section disembunyikan");return}Xl(o)&&Ce("Konten diperbarui")}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}Ce();let u=o.closest("[data-section-card]");u&&(u.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",u.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(u,24,24))}),r.addEventListener("dragend",n),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let u=s.dataTransfer?.getData("text/plain")||x(".section.dragging",r)?.dataset?.sectionCard||"",h=o.dataset.sectionCard;if(!u||u===h)return;let m=ke().find(w=>te(w)===h);if(h!=="cover"&&!Rt(m))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let v=o.getBoundingClientRect(),S=s.clientY<v.top+v.height/2?"before":"after";h==="cover"&&(S="after"),k(".section.drag-before, .section.drag-after",r).forEach(w=>{w!==o&&(w.classList.remove("drag-before","drag-after"),delete w.dataset.dropPlacement)}),o.dataset.dropPlacement=S,o.classList.toggle("drag-before",S==="before"),o.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let u=s.dataTransfer.getData("text/plain"),h=o.dataset.sectionCard,m=o.dataset.dropPlacement||(h==="cover"?"after":"before");s.preventDefault(),n(),Ih(u,h,m)})}function Wd(r){k("[data-library-import]",r).forEach(n=>{n.onclick=()=>{wh(n.dataset.libraryImport)}}),x("[data-library-clear]",r)?.addEventListener("click",Ch),x("[data-library-refresh]",r)?.addEventListener("click",async()=>{await ul(!0),c.uiPrepared=!1,re()})}function ci(r,n){let s=n+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function qd(r){if(c.tab==="library"){Wd(r);return}if(c.tab==="content"){ec(r);return}if(c.tab==="images"){Kd(r);return}if(c.tab==="colors"){Yd(r);return}if(c.tab==="style"){Qd(r);return}if(c.tab==="audio"){Zd(r);return}if(c.tab==="compatibility"){Jd(r);return}ec(r)}function Kd(r){if(!ci(r,"images"))return;r.addEventListener("click",s=>{if(s.target.closest("#"+e+"-reset-images")){md();return}let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),zd(r,o.dataset.imagePastePath);return}let u=s.target.closest("[data-image-delete-path]");if(u){fd(u.dataset.imageDeletePath);return}let h=s.target.closest("[data-image-open-advance]");if(h){let A=h.dataset.imageOpenAdvance,z=x(`[data-image-card-path="${CSS.escape(A)}"]`,r),B=z?x(".image-advance",z):null;if(B){let ce=!B.open;B.open=ce,h.setAttribute("aria-expanded",String(ce)),h.setAttribute("aria-label",ce?"Tutup pengaturan gambar":"Buka pengaturan gambar"),h.title=ce?"Tutup pengaturan gambar":"Pengaturan gambar",h.classList.toggle("active",ce),ce?B.scrollIntoView({block:"nearest",behavior:"smooth"}):h.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let m=s.target.closest("[data-image-align-path]");if(m){let A=m.dataset.imageAlignPath,z=["left","center","right"].includes(m.dataset.imageAlign)?m.dataset.imageAlign:"center";kt(A,{align:z}),se(),si(r,A);let B=x(`[data-image-path="${CSS.escape(A)}"]`,r);B&&Mt(B,A);return}let v=s.target.closest("[data-image-fit-path]");if(v){let A=v.dataset.imageFitPath,z=Jo.includes(v.dataset.imageFit)?v.dataset.imageFit:"auto";kt(A,{fit:z}),se(),si(r,A);let B=x(`[data-image-path="${CSS.escape(A)}"]`,r);B&&Mt(B,A);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let A=S.dataset.imageAlignposPath,z=Vr.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";kt(A,{alignPos:z}),se(),si(r,A);let B=x(`[data-image-path="${CSS.escape(A)}"]`,r);B&&Mt(B,A);return}let w=s.target.closest("[data-image-ratio-path]");if(w){let A=w.dataset.imageRatioPath,z=Dr.includes(w.dataset.imageRatio)?w.dataset.imageRatio:"16:9";kt(A,{ratio:z}),se(),si(r,A);let B=x(`[data-image-path="${CSS.escape(A)}"]`,r);B&&Mt(B,A);return}let _=s.target.closest("[data-gallery-delete-index]");if(_){dd(_.dataset.galleryDeleteIndex,Number(_.dataset.galleryIndex));return}let I=s.target.closest("[data-gallery-add]");if(I){let A=I.dataset.galleryAdd,z=D(c.config,A);Array.isArray(z)||(me(c.config,A,[]),z=D(c.config,A));let B=z.length,ce=Ml(A),Q=Gi(ce),xe=String(Q?.key||"src"),de=ce?Il(ce):{};Object.prototype.hasOwnProperty.call(de,xe)||(de[xe]=""),z.push(de),na()[A+"."+B+"."+xe]={width:100,align:"center",alignPos:"default",fit:"auto",ratio:"1:1"},se("Foto gallery ditambah"),re();return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let h=x(`[data-image-width-number="${CSS.escape(o)}"]`,r);h&&(h.value=s.target.value);return}let u=s.target.dataset.imageWidthNumber;if(u!==void 0){let h=Math.max(0,Math.min(100,Number(s.target.value)||0)),m=x(`[data-image-width-path="${CSS.escape(u)}"]`,r);m&&(m.value=h);return}});let n=(s,o)=>{let u=Math.max(0,Math.min(100,Number(o)||0));kt(s,{width:u}),se();let h=x(`[data-image-path="${CSS.escape(s)}"]`,r);h&&Mt(h,s),si(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){n(o,s.target.value);return}let u=s.target.dataset.imageWidthNumber;if(u!==void 0){n(u,s.target.value);return}let h=s.target.closest("[data-image-path]");if(!h)return;let m=h.dataset.imagePath,v=h.value.trim(),S=String(D(c.config,m)||"");if(v!==S){if(Mr(v)){h.value=S,Jl(h);return}me(c.config,m,v),v&&kt(m,{hidden:!1}),se("Gambar diperbarui"),Mt(h,m)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function Yd(r){if(!ci(r,"colors"))return;let n=(o,u,h)=>{let m=o.value.trim();if(!m||!bd(m)){if(h){let S=Se(u);S&&(o.value=S)}return}Ue(u,m);let v=x(`[data-color-var="${CSS.escape(u)}"]`,r);v&&(v.value=oi(m,v.value||"#000000"))},s=o=>{let u=Ui(o);if(!u)return;Ue(o,u);let h=x(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),m=x(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let v=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!v.length||v.includes(u))&&(h.value=u)}m&&(m.value=oi(u,m.value))};r.addEventListener("click",o=>{let u=o.target.closest("[data-reset-token]");if(u){s(u.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){E.forEach(([,,h])=>{let m=Se(h);m&&Ue(h,Ui(h)||m)}),k("[data-color-token-var]",r).forEach(h=>{let m=h.dataset.colorTokenVar,v=Se(m);v&&(h.value=v)}),k("[data-color-var]",r).forEach(h=>{h.value=oi(Se(h.dataset.colorVar),h.value)});return}}),r.addEventListener("input",o=>{let u=o.target.dataset.colorTokenVar;if(u!==void 0){n(o.target,u,!1);return}let h=o.target.dataset.colorVar;if(h!==void 0){Ue(h,o.target.value);let m=x(`[data-color-token-var="${CSS.escape(h)}"]`,r);m&&(m.value=o.target.value)}}),r.addEventListener("change",o=>{let u=o.target.dataset.colorTokenVar;u!==void 0&&n(o.target,u,!0)})}function Qd(r){if(!ci(r,"style"))return;let n=(o,u)=>{let h=String(o.value||"").trim();if(h){if((u==="--sve-heading-weight"||u==="--sve-body-weight")&&!Td(u==="--sve-heading-weight"?"heading":"body",h)){let v=Se(u);v&&(o.value=v);return}Ue(u,h),(u==="--sve-heading-weight"||u==="--sve-body-weight")&&qi()}},s=o=>{let u=Ui(o);if(!u)return;Ue(o,u);let h=x(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),m=x(`[data-color-var="${CSS.escape(o)}"]`,r);if(h){let v=h.tagName==="SELECT"?Array.from(h.options).map(S=>S.value):[];(!v.length||v.includes(u))&&(h.value=u)}m&&(m.value=oi(u,m.value))};r.addEventListener("click",o=>{let u=o.target.closest("[data-reset-token]");if(u){s(u.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){$d();return}if(o.target.closest("#"+e+"-reset-all")){Cl();return}if(o.target.closest("#"+e+"-heading-font-apply")){Ki("heading");return}o.target.closest("#"+e+"-body-font-apply")&&Ki("body")}),r.addEventListener("change",o=>{let u=o.target.dataset.styleVar;u!==void 0&&n(o.target,u)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let u=o.target.dataset.styleVar;u!==void 0&&n(o.target,u)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),Ki("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),Ki("body")))})}function Zd(r){if(!ci(r,"audio"))return;let s=gl().path||"assets.audio",o=x("#"+e+"-audio-url",r),u=x("#"+e+"-audio-start-enabled",r),h=x("#"+e+"-audio-start-time",r);if(!o)return;let m=()=>{let S=o.value.trim(),w=D(c.config,s);if(typeof w=="string"&&w===S){ql(r,S);return}me(c.config,s,S),se("Audio diperbarui"),ql(r,S)},v=()=>{if(!u||!h)return;let S=o.value.trim(),w=u.checked?Qi(h.value):0,_=Nd(S,w);o.value=_,h.disabled=!u.checked,u.checked&&(h.value=ua(w)),me(c.config,s,_),se(w>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(m,0)}),o.addEventListener("change",m),u?.addEventListener("change",()=>{h&&(h.disabled=!u.checked,u.checked&&Qi(h.value)<=0&&(h.value="0:00",h.focus()),v())}),h?.addEventListener("change",v)}function Jd(r){ci(r,"compat")}function Xd(){Object.values(c.editors).forEach(r=>{if(r)try{r.save?.();let n=r.getTextArea?.();n?.dispatchEvent(new Event("input",{bubbles:!0})),n?.dispatchEvent(new Event("change",{bubbles:!0}))}catch{}})}function ef(){return k("button").find(r=>{if(r.closest("#"+e))return!1;let n=(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return n==="simpan"||n==="save"})||null}function tf(){let r="https://wa.me/"+p+"?text="+encodeURIComponent(d);window.open(r,"_blank","noopener,noreferrer")}function rx(){if(!Ce())return;if(Xd(),Ne(),Zl().blockers.length){c.tab="compatibility";let s=document.getElementById(e);k(".tab",s).forEach(o=>{o.classList.toggle("active",o.dataset.tab==="compatibility")}),re();return}let n=ef();n&&n.click()}function rf(){performance.mark("sve-styles-start"),af(),performance.mark("sve-styles-critical-done"),$t(nf,50)}function af(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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
`,document.head.appendChild(r)}function nf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function sf(){rf();let r=document.createElement("div");r.id=e,r.innerHTML=`
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
    `,document.body.appendChild(r),x("#"+e+"-close").onclick=()=>{ii(!1)},x("#"+e+"-refresh").onclick=()=>{Ne()&&(re(),je({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(c.contentCommitTimer),c.contentCommitTimer=null,c.contentCommitMessage="",c.contentStateDirty=!1,c.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,Ne()&&(re(),je({force:!0,syncImages:!0}))},x("#"+e+"-support").onclick=tf;let n=x("#"+e+"-editor-update"),s=x("#"+e+"-update-status"),o=!1,u=!1,h=0,m=null,v=15e3,S=(_,I,A=!1)=>{n.textContent=_,n.title=I,n.setAttribute("aria-label",I),n.disabled=A},w=()=>{h=Date.now()+v,S("Cek Update","Cek update Visual Editor",!0),clearTimeout(m),m=setTimeout(()=>{h=0,!u&&!o&&S("Cek Update","Cek update Visual Editor")},v)};n.addEventListener("click",()=>{if(o){window.open(g,"_blank","noopener");return}if(u||Date.now()<h){s.textContent="Tunggu sebentar";return}o=!1,u=!0,S("Mengecek...","Sedang mengecek update Visual Editor",!0),s.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${y}?check=${Date.now()}`,onload(_){let I=ce=>{o=!1,u=!1,S("Cek Update","Cek update Visual Editor"),s.textContent=ce,w()};if(_.status<200||_.status>=300){I(_.status===403||_.status===429?"Tunggu sebentar":"Gagal cek update");return}let z=(_.responseText||"").match(/@version\s+([^\s]+)/),B=z&&z[1];if(!B){I("Gagal cek update");return}B===t?(o=!1,u=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Sudah terbaru",w()):(o=!0,u=!1,S("Pasang",`Pasang update Visual Editor versi ${B}`),s.textContent=`Update tersedia: versi ${B}.`)},onerror(){o=!1,u=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Gagal cek update",w()}})}),x("#"+e+"-search").addEventListener("input",ei(_=>{c.search=_.target.value.toLowerCase().trim(),c.uiPrepared=!1,re()},100)),k(".tab",r).forEach(_=>{_.onclick=()=>{Ce()&&ri(_.dataset.tab)}})}function of(){let r=ei(()=>{c.performance.editorScanCount=(c.performance.editorScanCount||0)+1,Pt(),$i(),al();let m=yt();m&&ti(m,{commit:!0,silent:!0}),c.open&&Pi(!0);let v=Gr();if(v.length!==c.allEditors.length||v.some((S,w)=>S!==c.allEditors[w])){if(c.sourceDirty=!0,!Ne())return;ji.invalidate(),il(),c.open?re():Ni()}},160),n='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(m=>{m.some(v=>!v.target.closest?.("#"+e)&&[...v.addedNodes,...v.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}),o=null,u=()=>{let m=zr();m!==o&&(s.disconnect(),o=m,m&&s.observe(m,{childList:!0,subtree:!0}),r())};new MutationObserver(m=>{u(),m.some(v=>[...v.addedNodes,...v.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(n)||S.querySelector(n))))&&r()}).observe(document.body,{childList:!0}),u(),document.addEventListener("load",m=>{m.target instanceof HTMLIFrameElement&&(ji.invalidate(),je({force:!0,syncImages:!0}))},!0),document.addEventListener("click",m=>{let v=m.target.closest?.("button");if(!(!v||v.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(v.textContent.trim()))&&!(!c.config&&!c.doc?.querySelector("[data-sve-template]")&&!U("js").includes("SVE_SCHEMA"))){if(!Ce()){m.preventDefault(),m.stopImmediatePropagation();return}Ql().blockers.length&&(m.preventDefault(),m.stopImmediatePropagation(),ii(!0),c.uiPrepared=!1,ri("compatibility"))}},!0),document.addEventListener("keydown",m=>{m.key==="Escape"&&c.open&&document.getElementById(e)?.contains(m.target)&&(ii(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",m=>{Br(m.target)&&(c.scalevSlug=xt(m.target.value),eh())},!0),document.addEventListener("change",m=>{if(Br(m.target)){let v=xt(m.target.value);v&&(c.scalevSlug=v,ti(v,{commit:!0}))}},!0),window.addEventListener("resize",ei(()=>{$i(),c.open&&Pi(!0)},80))}function tc(){b()&&(sf(),al(),of(),Hr(),requestAnimationFrame(()=>{$i()}),Ni(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",tc,{once:!0}):tc()})();})();
