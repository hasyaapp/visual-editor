// ==UserScript==
// @name         Scalev Visual Editor - Schema First
// @namespace    wedding-scalev
// @version      0.33.3
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
(()=>{var yf=Object.create;var En=Object.defineProperty;var vf=Object.getOwnPropertyDescriptor;var kf=Object.getOwnPropertyNames;var Sf=Object.getPrototypeOf,wf=Object.prototype.hasOwnProperty;var Gt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(i){throw t=0,i}},N=(e,t)=>{for(var i in t)En(e,i,{get:t[i],enumerable:!0})},Cf=(e,t,i,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of kf(t))!wf.call(e,c)&&c!==i&&En(e,c,{get:()=>t[c],enumerable:!(n=vf(t,c))||n.enumerable});return e};var Ef=(e,t,i)=>(i=e!=null?yf(Sf(e)):{},Cf(t||!e||!e.__esModule?En(i,"default",{value:e,enumerable:!0}):i,e));var kp=Gt(Qo=>{var vp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");Qo.encode=function(e){if(0<=e&&e<vp.length)return vp[e];throw new TypeError("Must be between 0 and 63: "+e)};Qo.decode=function(e){var t=65,i=90,n=97,c=122,h=48,f=57,g=43,y=47,b=26,v=52;return t<=e&&e<=i?e-t:n<=e&&e<=c?e-n+b:h<=e&&e<=f?e-h+v:e==g?62:e==y?63:-1}});var Ap=Gt(Jo=>{var Sp=kp(),Zo=5,wp=1<<Zo,Cp=wp-1,Ep=wp;function Fb(e){return e<0?(-e<<1)+1:(e<<1)+0}function Mb(e){var t=(e&1)===1,i=e>>1;return t?-i:i}Jo.encode=function(t){var i="",n,c=Fb(t);do n=c&Cp,c>>>=Zo,c>0&&(n|=Ep),i+=Sp.encode(n);while(c>0);return i};Jo.decode=function(t,i,n){var c=t.length,h=0,f=0,g,y;do{if(i>=c)throw new Error("Expected more digits in base 64 VLQ value.");if(y=Sp.decode(t.charCodeAt(i++)),y===-1)throw new Error("Invalid base64 digit: "+t.charAt(i-1));g=!!(y&Ep),y&=Cp,h=h+(y<<f),f+=Zo}while(g);n.value=Mb(h),n.rest=i}});var zr=Gt(fe=>{function Ob(e,t,i){if(t in e)return e[t];if(arguments.length===3)return i;throw new Error('"'+t+'" is a required argument.')}fe.getArg=Ob;var Tp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Db=/^data:.+\,.+$/;function Oi(e){var t=e.match(Tp);return t?{scheme:t[1],auth:t[2],host:t[3],port:t[4],path:t[5]}:null}fe.urlParse=Oi;function ni(e){var t="";return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}fe.urlGenerate=ni;var Vb=32;function Bb(e){var t=[];return function(i){for(var n=0;n<t.length;n++)if(t[n].input===i){var c=t[0];return t[0]=t[n],t[n]=c,t[0].result}var h=e(i);return t.unshift({input:i,result:h}),t.length>Vb&&t.pop(),h}}var Xo=Bb(function(t){var i=t,n=Oi(t);if(n){if(!n.path)return t;i=n.path}for(var c=fe.isAbsolute(i),h=[],f=0,g=0;;)if(f=g,g=i.indexOf("/",f),g===-1){h.push(i.slice(f));break}else for(h.push(i.slice(f,g));g<i.length&&i[g]==="/";)g++;for(var y,b=0,g=h.length-1;g>=0;g--)y=h[g],y==="."?h.splice(g,1):y===".."?b++:b>0&&(y===""?(h.splice(g+1,b),b=0):(h.splice(g,2),b--));return i=h.join("/"),i===""&&(i=c?"/":"."),n?(n.path=i,ni(n)):i});fe.normalize=Xo;function _p(e,t){e===""&&(e="."),t===""&&(t=".");var i=Oi(t),n=Oi(e);if(n&&(e=n.path||"/"),i&&!i.scheme)return n&&(i.scheme=n.scheme),ni(i);if(i||t.match(Db))return t;if(n&&!n.host&&!n.path)return n.host=t,ni(n);var c=t.charAt(0)==="/"?t:Xo(e.replace(/\/+$/,"")+"/"+t);return n?(n.path=c,ni(n)):c}fe.join=_p;fe.isAbsolute=function(e){return e.charAt(0)==="/"||Tp.test(e)};function jb(e,t){e===""&&(e="."),e=e.replace(/\/$/,"");for(var i=0;t.indexOf(e+"/")!==0;){var n=e.lastIndexOf("/");if(n<0||(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/)))return t;++i}return Array(i+1).join("../")+t.substr(e.length+1)}fe.relative=jb;var Lp=(function(){var e=Object.create(null);return!("__proto__"in e)})();function Ip(e){return e}function Ub(e){return $p(e)?"$"+e:e}fe.toSetString=Lp?Ip:Ub;function Hb(e){return $p(e)?e.slice(1):e}fe.fromSetString=Lp?Ip:Hb;function $p(e){if(!e)return!1;var t=e.length;if(t<9||e.charCodeAt(t-1)!==95||e.charCodeAt(t-2)!==95||e.charCodeAt(t-3)!==111||e.charCodeAt(t-4)!==116||e.charCodeAt(t-5)!==111||e.charCodeAt(t-6)!==114||e.charCodeAt(t-7)!==112||e.charCodeAt(t-8)!==95||e.charCodeAt(t-9)!==95)return!1;for(var i=t-10;i>=0;i--)if(e.charCodeAt(i)!==36)return!1;return!0}function zb(e,t,i){var n=ft(e.source,t.source);return n!==0||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:ft(e.name,t.name)}fe.compareByOriginalPositions=zb;function Wb(e,t,i){var n;return n=e.originalLine-t.originalLine,n!==0||(n=e.originalColumn-t.originalColumn,n!==0||i)||(n=e.generatedColumn-t.generatedColumn,n!==0)||(n=e.generatedLine-t.generatedLine,n!==0)?n:ft(e.name,t.name)}fe.compareByOriginalPositionsNoSource=Wb;function Gb(e,t,i){var n=e.generatedLine-t.generatedLine;return n!==0||(n=e.generatedColumn-t.generatedColumn,n!==0||i)||(n=ft(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:ft(e.name,t.name)}fe.compareByGeneratedPositionsDeflated=Gb;function qb(e,t,i){var n=e.generatedColumn-t.generatedColumn;return n!==0||i||(n=ft(e.source,t.source),n!==0)||(n=e.originalLine-t.originalLine,n!==0)||(n=e.originalColumn-t.originalColumn,n!==0)?n:ft(e.name,t.name)}fe.compareByGeneratedPositionsDeflatedNoLine=qb;function ft(e,t){return e===t?0:e===null?1:t===null?-1:e>t?1:-1}function Kb(e,t){var i=e.generatedLine-t.generatedLine;return i!==0||(i=e.generatedColumn-t.generatedColumn,i!==0)||(i=ft(e.source,t.source),i!==0)||(i=e.originalLine-t.originalLine,i!==0)||(i=e.originalColumn-t.originalColumn,i!==0)?i:ft(e.name,t.name)}fe.compareByGeneratedPositionsInflated=Kb;function Yb(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))}fe.parseSourceMapInput=Yb;function Qb(e,t,i){if(t=t||"",e&&(e[e.length-1]!=="/"&&t[0]!=="/"&&(e+="/"),t=e+t),i){var n=Oi(i);if(!n)throw new Error("sourceMapURL could not be parsed");if(n.path){var c=n.path.lastIndexOf("/");c>=0&&(n.path=n.path.substring(0,c+1))}t=_p(ni(n),t)}return Xo(t)}fe.computeSourceURL=Qb});var Np=Gt(Pp=>{var el=zr(),tl=Object.prototype.hasOwnProperty,Rt=typeof Map<"u";function mt(){this._array=[],this._set=Rt?new Map:Object.create(null)}mt.fromArray=function(t,i){for(var n=new mt,c=0,h=t.length;c<h;c++)n.add(t[c],i);return n};mt.prototype.size=function(){return Rt?this._set.size:Object.getOwnPropertyNames(this._set).length};mt.prototype.add=function(t,i){var n=Rt?t:el.toSetString(t),c=Rt?this.has(t):tl.call(this._set,n),h=this._array.length;(!c||i)&&this._array.push(t),c||(Rt?this._set.set(t,h):this._set[n]=h)};mt.prototype.has=function(t){if(Rt)return this._set.has(t);var i=el.toSetString(t);return tl.call(this._set,i)};mt.prototype.indexOf=function(t){if(Rt){var i=this._set.get(t);if(i>=0)return i}else{var n=el.toSetString(t);if(tl.call(this._set,n))return this._set[n]}throw new Error('"'+t+'" is not in the set.')};mt.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)};mt.prototype.toArray=function(){return this._array.slice()};Pp.ArraySet=mt});var Mp=Gt(Fp=>{var Rp=zr();function Zb(e,t){var i=e.generatedLine,n=t.generatedLine,c=e.generatedColumn,h=t.generatedColumn;return n>i||n==i&&h>=c||Rp.compareByGeneratedPositionsInflated(e,t)<=0}function Wr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Wr.prototype.unsortedForEach=function(t,i){this._array.forEach(t,i)};Wr.prototype.add=function(t){Zb(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))};Wr.prototype.toArray=function(){return this._sorted||(this._array.sort(Rp.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};Fp.MappingList=Wr});var Dp=Gt(Op=>{var Di=Ap(),se=zr(),Gr=Np().ArraySet,Jb=Mp().MappingList;function Ue(e){e||(e={}),this._file=se.getArg(e,"file",null),this._sourceRoot=se.getArg(e,"sourceRoot",null),this._skipValidation=se.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=se.getArg(e,"ignoreInvalidMapping",!1),this._sources=new Gr,this._names=new Gr,this._mappings=new Jb,this._sourcesContents=null}Ue.prototype._version=3;Ue.fromSourceMap=function(t,i){var n=t.sourceRoot,c=new Ue(Object.assign(i||{},{file:t.file,sourceRoot:n}));return t.eachMapping(function(h){var f={generated:{line:h.generatedLine,column:h.generatedColumn}};h.source!=null&&(f.source=h.source,n!=null&&(f.source=se.relative(n,f.source)),f.original={line:h.originalLine,column:h.originalColumn},h.name!=null&&(f.name=h.name)),c.addMapping(f)}),t.sources.forEach(function(h){var f=h;n!==null&&(f=se.relative(n,h)),c._sources.has(f)||c._sources.add(f);var g=t.sourceContentFor(h);g!=null&&c.setSourceContent(h,g)}),c};Ue.prototype.addMapping=function(t){var i=se.getArg(t,"generated"),n=se.getArg(t,"original",null),c=se.getArg(t,"source",null),h=se.getArg(t,"name",null);!this._skipValidation&&this._validateMapping(i,n,c,h)===!1||(c!=null&&(c=String(c),this._sources.has(c)||this._sources.add(c)),h!=null&&(h=String(h),this._names.has(h)||this._names.add(h)),this._mappings.add({generatedLine:i.line,generatedColumn:i.column,originalLine:n!=null&&n.line,originalColumn:n!=null&&n.column,source:c,name:h}))};Ue.prototype.setSourceContent=function(t,i){var n=t;this._sourceRoot!=null&&(n=se.relative(this._sourceRoot,n)),i!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[se.toSetString(n)]=i):this._sourcesContents&&(delete this._sourcesContents[se.toSetString(n)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};Ue.prototype.applySourceMap=function(t,i,n){var c=i;if(i==null){if(t.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);c=t.file}var h=this._sourceRoot;h!=null&&(c=se.relative(h,c));var f=new Gr,g=new Gr;this._mappings.unsortedForEach(function(y){if(y.source===c&&y.originalLine!=null){var b=t.originalPositionFor({line:y.originalLine,column:y.originalColumn});b.source!=null&&(y.source=b.source,n!=null&&(y.source=se.join(n,y.source)),h!=null&&(y.source=se.relative(h,y.source)),y.originalLine=b.line,y.originalColumn=b.column,b.name!=null&&(y.name=b.name))}var v=y.source;v!=null&&!f.has(v)&&f.add(v);var w=y.name;w!=null&&!g.has(w)&&g.add(w)},this),this._sources=f,this._names=g,t.sources.forEach(function(y){var b=t.sourceContentFor(y);b!=null&&(n!=null&&(y=se.join(n,y)),h!=null&&(y=se.relative(h,y)),this.setSourceContent(y,b))},this)};Ue.prototype._validateMapping=function(t,i,n,c){if(i&&typeof i.line!="number"&&typeof i.column!="number"){var h="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}if(!(t&&"line"in t&&"column"in t&&t.line>0&&t.column>=0&&!i&&!n&&!c)){if(t&&"line"in t&&"column"in t&&i&&"line"in i&&"column"in i&&t.line>0&&t.column>=0&&i.line>0&&i.column>=0&&n)return;var h="Invalid mapping: "+JSON.stringify({generated:t,source:n,original:i,name:c});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(h),!1;throw new Error(h)}};Ue.prototype._serializeMappings=function(){for(var t=0,i=1,n=0,c=0,h=0,f=0,g="",y,b,v,w,C=this._mappings.toArray(),u=0,I=C.length;u<I;u++){if(b=C[u],y="",b.generatedLine!==i)for(t=0;b.generatedLine!==i;)y+=";",i++;else if(u>0){if(!se.compareByGeneratedPositionsInflated(b,C[u-1]))continue;y+=","}y+=Di.encode(b.generatedColumn-t),t=b.generatedColumn,b.source!=null&&(w=this._sources.indexOf(b.source),y+=Di.encode(w-f),f=w,y+=Di.encode(b.originalLine-1-c),c=b.originalLine-1,y+=Di.encode(b.originalColumn-n),n=b.originalColumn,b.name!=null&&(v=this._names.indexOf(b.name),y+=Di.encode(v-h),h=v)),g+=y}return g};Ue.prototype._generateSourcesContent=function(t,i){return t.map(function(n){if(!this._sourcesContents)return null;i!=null&&(n=se.relative(i,n));var c=se.toSetString(n);return Object.prototype.hasOwnProperty.call(this._sourcesContents,c)?this._sourcesContents[c]:null},this)};Ue.prototype.toJSON=function(){var t={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(t.file=this._file),this._sourceRoot!=null&&(t.sourceRoot=this._sourceRoot),this._sourcesContents&&(t.sourcesContent=this._generateSourcesContent(t.sources,t.sourceRoot)),t};Ue.prototype.toString=function(){return JSON.stringify(this.toJSON())};Op.SourceMapGenerator=Ue});var Af=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,7,9,32,4,318,1,78,5,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,68,8,2,0,3,0,2,3,2,4,2,0,15,1,83,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,7,19,58,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,199,7,137,9,54,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,55,9,266,3,10,1,2,0,49,6,4,4,14,10,5350,0,7,14,11465,27,2343,9,87,9,39,4,60,6,26,9,535,9,470,0,2,54,8,3,82,0,12,1,19628,1,4178,9,519,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,245,1,2,9,233,0,3,0,8,1,6,0,475,6,110,6,6,9,4759,9,787719,239],yc=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,4,51,13,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,7,25,39,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,39,27,10,22,251,41,7,1,17,5,57,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,31,9,2,0,3,0,2,37,2,0,26,0,2,0,45,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,200,32,32,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,24,43,261,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,26,3994,6,582,6842,29,1763,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,433,44,212,63,33,24,3,24,45,74,6,0,67,12,65,1,2,0,15,4,10,7381,42,31,98,114,8702,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,229,29,3,0,208,30,2,2,2,1,2,6,3,4,10,1,225,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4381,3,5773,3,7472,16,621,2467,541,1507,4938,6,8489],Tf="\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",vc="\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",An={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},Tn="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",_f={5:Tn,"5module":Tn+" export import",6:Tn+" const class extends export import super"},kc=/^in(stanceof)?$/,Lf=new RegExp("["+vc+"]"),If=new RegExp("["+vc+Tf+"]");function Ln(e,t){for(var i=65536,n=0;n<t.length;n+=2){if(i+=t[n],i>e)return!1;if(i+=t[n+1],i>=e)return!0}return!1}function et(e,t){return e<65?e===36:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&Lf.test(String.fromCharCode(e)):t===!1?!1:Ln(e,yc)}function yt(e,t){return e<48?e===36:e<58?!0:e<65?!1:e<91?!0:e<97?e===95:e<123?!0:e<=65535?e>=170&&If.test(String.fromCharCode(e)):t===!1?!1:Ln(e,yc)||Ln(e,Af)}var q=function(t,i){i===void 0&&(i={}),this.label=t,this.keyword=i.keyword,this.beforeExpr=!!i.beforeExpr,this.startsExpr=!!i.startsExpr,this.isLoop=!!i.isLoop,this.isAssign=!!i.isAssign,this.prefix=!!i.prefix,this.postfix=!!i.postfix,this.binop=i.binop||null,this.updateContext=null};function Me(e,t){return new q(e,{beforeExpr:!0,binop:t})}var Oe={beforeExpr:!0},we={startsExpr:!0},Nn={};function G(e,t){return t===void 0&&(t={}),t.keyword=e,Nn[e]=new q(e,t)}var m={num:new q("num",we),regexp:new q("regexp",we),string:new q("string",we),name:new q("name",we),privateId:new q("privateId",we),eof:new q("eof"),bracketL:new q("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new q("]"),braceL:new q("{",{beforeExpr:!0,startsExpr:!0}),braceR:new q("}"),parenL:new q("(",{beforeExpr:!0,startsExpr:!0}),parenR:new q(")"),comma:new q(",",Oe),semi:new q(";",Oe),colon:new q(":",Oe),dot:new q("."),question:new q("?",Oe),questionDot:new q("?."),arrow:new q("=>",Oe),template:new q("template"),invalidTemplate:new q("invalidTemplate"),ellipsis:new q("...",Oe),backQuote:new q("`",we),dollarBraceL:new q("${",{beforeExpr:!0,startsExpr:!0}),eq:new q("=",{beforeExpr:!0,isAssign:!0}),assign:new q("_=",{beforeExpr:!0,isAssign:!0}),incDec:new q("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new q("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:Me("||",1),logicalAND:Me("&&",2),bitwiseOR:Me("|",3),bitwiseXOR:Me("^",4),bitwiseAND:Me("&",5),equality:Me("==/!=/===/!==",6),relational:Me("</>/<=/>=",7),bitShift:Me("<</>>/>>>",8),plusMin:new q("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:Me("%",10),star:Me("*",10),slash:Me("/",10),starstar:new q("**",{beforeExpr:!0}),coalesce:Me("??",1),_break:G("break"),_case:G("case",Oe),_catch:G("catch"),_continue:G("continue"),_debugger:G("debugger"),_default:G("default",Oe),_do:G("do",{isLoop:!0,beforeExpr:!0}),_else:G("else",Oe),_finally:G("finally"),_for:G("for",{isLoop:!0}),_function:G("function",we),_if:G("if"),_return:G("return",Oe),_switch:G("switch"),_throw:G("throw",Oe),_try:G("try"),_var:G("var"),_const:G("const"),_while:G("while",{isLoop:!0}),_with:G("with"),_new:G("new",{beforeExpr:!0,startsExpr:!0}),_this:G("this",we),_super:G("super",we),_class:G("class",we),_extends:G("extends",Oe),_export:G("export"),_import:G("import",we),_null:G("null",we),_true:G("true",we),_false:G("false",we),_in:G("in",{beforeExpr:!0,binop:7}),_instanceof:G("instanceof",{beforeExpr:!0,binop:7}),_typeof:G("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:G("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:G("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},Ce=/\r\n?|\n|\u2028|\u2029/,$f=new RegExp(Ce.source,"g");function qt(e){return e===10||e===13||e===8232||e===8233}function Sc(e,t,i){i===void 0&&(i=e.length);for(var n=t;n<i;n++){var c=e.charCodeAt(n);if(qt(c))return n<i-1&&c===13&&e.charCodeAt(n+1)===10?n+2:n+1}return-1}var wc=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,he=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,Cc=Object.prototype,Pf=Cc.hasOwnProperty,Nf=Cc.toString,Kt=Object.hasOwn||(function(e,t){return Pf.call(e,t)}),fc=Array.isArray||(function(e){return Nf.call(e)==="[object Array]"}),mc=Object.create(null);function xt(e){return mc[e]||(mc[e]=new RegExp("^(?:"+e.replace(/ /g,"|")+")$"))}function ut(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10)+55296,(e&1023)+56320))}var Rf=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,Ci=function(t,i){this.line=t,this.column=i};Ci.prototype.offset=function(t){return new Ci(this.line,this.column+t)};var gr=function(t,i,n){this.start=i,this.end=n,t.sourceFile!==null&&(this.source=t.sourceFile)};function Ec(e,t){for(var i=1,n=0;;){var c=Sc(e,n,t);if(c<0)return new Ci(i,t-n);++i,n=c}}var In={ecmaVersion:null,sourceType:"script",strict:!1,onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,checkPrivateFields:!0,locations:!1,startLocation:null,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},gc=!1;function Ff(e){var t={};for(var i in In)t[i]=e&&Kt(e,i)?e[i]:In[i];if(t.ecmaVersion==="latest"?t.ecmaVersion=1e8:t.ecmaVersion==null?(!gc&&typeof console=="object"&&console.warn&&(gc=!0,console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),t.ecmaVersion=11):t.ecmaVersion>=2015&&(t.ecmaVersion-=2009),t.allowReserved==null&&(t.allowReserved=t.ecmaVersion<5),(!e||e.allowHashBang==null)&&(t.allowHashBang=t.ecmaVersion>=14),fc(t.onToken)){var n=t.onToken;t.onToken=function(c){return n.push(c)}}if(fc(t.onComment)&&(t.onComment=Mf(t,t.onComment)),t.sourceType==="commonjs"&&t.allowAwaitOutsideFunction)throw new Error("Cannot use allowAwaitOutsideFunction with sourceType: commonjs");return t}function Mf(e,t){return function(i,n,c,h,f,g){var y={type:i?"Block":"Line",value:n,start:c,end:h};e.locations&&(y.loc=new gr(this,f,g)),e.ranges&&(y.range=[c,h]),t.push(y)}}var Tt=1,_t=2,Rn=4,Ac=8,Fn=16,Tc=32,br=64,_c=128,Lt=256,Ei=512,Lc=1024,xr=Tt|_t|Lt;function Mn(e,t){return _t|(e?Rn:0)|(t?Ac:0)}var hr=0,On=1,ht=2,Ic=3,$c=4,Pc=5,ce=function(t,i,n){this.options=t=Ff(t),this.sourceFile=t.sourceFile,this.keywords=xt(_f[t.ecmaVersion>=6?6:t.sourceType==="module"?"5module":5]);var c="";t.allowReserved!==!0&&(c=An[t.ecmaVersion>=6?6:t.ecmaVersion===5?5:3],t.sourceType==="module"&&(c+=" await")),this.reservedWords=xt(c);var h=(c?c+" ":"")+An.strict;this.reservedWordsStrict=xt(h),this.reservedWordsStrictBind=xt(h+" "+An.strictBind),this.input=String(i),this.containsEsc=!1,this.pos=n||0,this.curLine=1,t.startLocation?(this.lineStart=this.pos-t.startLocation.column,this.curLine=t.startLocation.line):n?(this.lineStart=this.input.lastIndexOf(`
`,n-1)+1,this.options.locations&&(this.curLine=this.input.slice(0,this.lineStart).split(Ce).length)):this.lineStart=0,this.type=m.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule=t.sourceType==="module",this.strict=this.inModule||t.strict===!0||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),this.pos===0&&t.allowHashBang&&this.input.slice(0,2)==="#!"&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(this.options.sourceType==="commonjs"?_t:Tt),this.regexpState=null,this.privateNameStack=[]},Ve={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowReturn:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},allowUsing:{configurable:!0},inClassStaticBlock:{configurable:!0}};ce.prototype.parse=function(){var t=this,i=this.options.program||this.startNode();return this.nextToken(),this.catchStackOverflow(function(){return t.parseTopLevel(i)})};Ve.inFunction.get=function(){return(this.currentVarScope().flags&_t)>0};Ve.inGenerator.get=function(){return(this.currentVarScope().flags&Ac)>0};Ve.inAsync.get=function(){return(this.currentVarScope().flags&Rn)>0};Ve.canAwait.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Lt|Ei))return!1;if(i&_t)return(i&Rn)>0}return this.inModule&&this.options.ecmaVersion>=13||this.options.allowAwaitOutsideFunction};Ve.allowReturn.get=function(){return!!(this.inFunction||this.options.allowReturnOutsideFunction&&this.currentVarScope().flags&Tt)};Ve.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags;return(t&br)>0||this.options.allowSuperOutsideMethod};Ve.allowDirectSuper.get=function(){return(this.currentThisScope().flags&_c)>0};Ve.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())};Ve.allowNewDotTarget.get=function(){for(var e=this.scopeStack.length-1;e>=0;e--){var t=this.scopeStack[e],i=t.flags;if(i&(Lt|Ei)||i&_t&&!(i&Fn))return!0}return!1};Ve.allowUsing.get=function(){var e=this.currentScope(),t=e.flags;return!(t&Lc||!this.inModule&&t&Tt)};Ve.inClassStaticBlock.get=function(){return(this.currentVarScope().flags&Lt)>0};ce.extend=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];for(var n=this,c=0;c<t.length;c++)n=t[c](n);return n};ce.parse=function(t,i){return new this(i,t).parse()};ce.parseExpressionAt=function(t,i,n){var c=new this(n,t,i);return c.nextToken(),c.parseExpression()};ce.tokenizer=function(t,i){return new this(i,t)};Object.defineProperties(ce.prototype,Ve);var me=ce.prototype,Of=/^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;me.strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){he.lastIndex=e,e+=he.exec(this.input)[0].length;var t=Of.exec(this.input.slice(e));if(!t)return!1;if((t[1]||t[2])==="use strict"){he.lastIndex=e+t[0].length;var i=he.exec(this.input),n=i.index+i[0].length,c=this.input.charAt(n);return c===";"||c==="}"||Ce.test(i[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(c)||c==="!"&&this.input.charAt(n+1)==="=")}e+=t[0].length,he.lastIndex=e,e+=he.exec(this.input)[0].length,this.input[e]===";"&&e++}};me.eat=function(e){return this.type===e?(this.next(),!0):!1};me.isContextual=function(e){return this.type===m.name&&this.value===e&&!this.containsEsc};me.eatContextual=function(e){return this.isContextual(e)?(this.next(),!0):!1};me.catchStackOverflow=function(e){try{return e()}catch(t){if(t instanceof Error&&(/\bstack\b.*\b(exceeded|overflow)\b/i.test(t.message)||/\btoo much recursion\b/i.test(t.message)))this.raise(this.start,"Not enough stack space to parse input");else throw t}};me.expectContextual=function(e){this.eatContextual(e)||this.unexpected()};me.canInsertSemicolon=function(){return this.type===m.eof||this.type===m.braceR||Ce.test(this.input.slice(this.lastTokEnd,this.start))};me.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0};me.semicolon=function(){!this.eat(m.semi)&&!this.insertSemicolon()&&this.unexpected()};me.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0};me.expect=function(e){this.eat(e)||this.unexpected()};me.unexpected=function(e){this.raise(e??this.start,"Unexpected token")};var yr=function(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1};me.checkPatternErrors=function(e,t){if(e){e.trailingComma>-1&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element");var i=t?e.parenthesizedAssign:e.parenthesizedBind;i>-1&&this.raiseRecoverable(i,t?"Assigning to rvalue":"Parenthesized pattern")}};me.checkExpressionErrors=function(e,t){if(!e)return!1;var i=e.shorthandAssign,n=e.doubleProto;if(!t)return i>=0||n>=0;i>=0&&this.raise(i,"Shorthand property assignments are valid only in destructuring patterns"),n>=0&&this.raiseRecoverable(n,"Redefinition of __proto__ property")};me.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")};me.isSimpleAssignTarget=function(e){return e.type==="ParenthesizedExpression"?this.isSimpleAssignTarget(e.expression):e.type==="Identifier"||e.type==="MemberExpression"};var P=ce.prototype;P.parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==m.eof;){var i=this.parseStatement(null,!0,t);e.body.push(i)}if(this.inModule)for(var n=0,c=Object.keys(this.undefinedExports);n<c.length;n+=1){var h=c[n];this.raiseRecoverable(this.undefinedExports[h].start,"Export '"+h+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType==="commonjs"?"script":this.options.sourceType,this.finishNode(e,"Program")};var Dn={kind:"loop"},Df={kind:"switch"};P.isLet=function(e){if(this.options.ecmaVersion<6||!this.isContextual("let"))return!1;he.lastIndex=this.pos;var t=he.exec(this.input),i=this.pos+t[0].length,n=this.fullCharCodeAt(i);if(n===91||n===92)return!0;if(e)return!1;if(n===123)return!0;if(et(n)){var c=i;do i+=n<=65535?1:2;while(yt(n=this.fullCharCodeAt(i)));if(n===92)return!0;var h=this.input.slice(c,i);if(!kc.test(h))return!0}return!1};P.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;he.lastIndex=this.pos;var e=he.exec(this.input),t=this.pos+e[0].length,i;return!Ce.test(this.input.slice(this.pos,t))&&this.input.slice(t,t+8)==="function"&&(t+8===this.input.length||!(yt(i=this.fullCharCodeAt(t+8))||i===92))};P.isUsingKeyword=function(e,t){if(this.options.ecmaVersion<17||!this.isContextual(e?"await":"using"))return!1;he.lastIndex=this.pos;var i=he.exec(this.input),n=this.pos+i[0].length;if(Ce.test(this.input.slice(this.pos,n)))return!1;if(e){var c=n+5,h;if(this.input.slice(n,c)!=="using"||c===this.input.length||yt(h=this.fullCharCodeAt(c))||h===92)return!1;he.lastIndex=c;var f=he.exec(this.input);if(n=c+f[0].length,f&&Ce.test(this.input.slice(c,n)))return!1}var g=this.fullCharCodeAt(n);if(!et(g)&&g!==92)return!1;var y=n;do n+=g<=65535?1:2;while(yt(g=this.fullCharCodeAt(n)));if(g===92)return!0;var b=this.input.slice(y,n);if(kc.test(b))return!1;if(t&&!e&&b==="of"){he.lastIndex=n;var v=he.exec(this.input);if(n=n+v[0].length,this.input.charCodeAt(n)!==61||(g=this.input.charCodeAt(n+1))===61||g===62)return!1}return!0};P.isAwaitUsing=function(e){return this.isUsingKeyword(!0,e)};P.isUsing=function(e){return this.isUsingKeyword(!1,e)};P.parseStatement=function(e,t,i){var n=this.type,c=this.startNode(),h;switch(this.isLet(e)&&(n=m._var,h="let"),n){case m._break:case m._continue:return this.parseBreakContinueStatement(c,n.keyword);case m._debugger:return this.parseDebuggerStatement(c);case m._do:return this.parseDoStatement(c);case m._for:return this.parseForStatement(c);case m._function:return e&&(this.strict||e!=="if"&&e!=="label")&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(c,!1,!e);case m._class:return e&&this.unexpected(),this.parseClass(c,!0);case m._if:return this.parseIfStatement(c);case m._return:return this.parseReturnStatement(c);case m._switch:return this.parseSwitchStatement(c);case m._throw:return this.parseThrowStatement(c);case m._try:return this.parseTryStatement(c);case m._const:case m._var:return h=h||this.value,e&&h!=="var"&&this.unexpected(),this.parseVarStatement(c,h);case m._while:return this.parseWhileStatement(c);case m._with:return this.parseWithStatement(c);case m.braceL:return this.parseBlock(!0,c);case m.semi:return this.parseEmptyStatement(c);case m._export:case m._import:if(this.options.ecmaVersion>10&&n===m._import){he.lastIndex=this.pos;var f=he.exec(this.input),g=this.pos+f[0].length,y=this.input.charCodeAt(g);if(y===40||y===46)return this.parseExpressionStatement(c,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),n===m._import?this.parseImport(c):this.parseExport(c,i);default:if(this.isAsyncFunction())return e&&this.unexpected(),this.next(),this.parseFunctionStatement(c,!0,!e);var b=this.isAwaitUsing(!1)?"await using":this.isUsing(!1)?"using":null;if(b)return this.allowUsing||this.raise(this.start,"Using declaration cannot appear in the top level when source type is `script` or in the bare case statement"),e&&this.raise(this.start,"Using declaration is not allowed in single-statement positions"),b==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.next(),this.parseVar(c,!1,b),this.semicolon(),this.finishNode(c,"VariableDeclaration");var v=this.value,w=this.parseExpression();return n===m.name&&w.type==="Identifier"&&this.eat(m.colon)?this.parseLabeledStatement(c,v,w,e):this.parseExpressionStatement(c,w)}};P.parseBreakContinueStatement=function(e,t){var i=t==="break";this.next(),this.eat(m.semi)||this.insertSemicolon()?e.label=null:this.type!==m.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon());for(var n=0;n<this.labels.length;++n){var c=this.labels[n];if((e.label==null||c.name===e.label.name)&&(c.kind!=null&&(i||c.kind==="loop")||e.label&&i))break}return n===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,i?"BreakStatement":"ContinueStatement")};P.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")};P.parseDoStatement=function(e){return this.next(),this.labels.push(Dn),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(m._while),e.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(m.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")};P.parseForStatement=function(e){this.next();var t=this.options.ecmaVersion>=9&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;if(this.labels.push(Dn),this.enterScope(0),this.expect(m.parenL),this.type===m.semi)return t>-1&&this.unexpected(t),this.parseFor(e,null);var i=this.isLet();if(this.type===m._var||this.type===m._const||i){var n=this.startNode(),c=i?"let":this.value;return this.next(),this.parseVar(n,!0,c),this.finishNode(n,"VariableDeclaration"),this.parseForAfterInit(e,n,t)}var h=this.isContextual("let"),f=!1,g=this.isUsing(!0)?"using":this.isAwaitUsing(!0)?"await using":null;if(g){var y=this.startNode();return this.next(),g==="await using"&&(this.canAwait||this.raise(this.start,"Await using cannot appear outside of async function"),this.next()),this.parseVar(y,!0,g),this.finishNode(y,"VariableDeclaration"),this.parseForAfterInit(e,y,t)}var b=this.containsEsc,v=new yr,w=this.start,C=t>-1?this.parseExprSubscripts(v,"await"):this.parseExpression(!0,v);return this.type===m._in||(f=this.options.ecmaVersion>=6&&this.isContextual("of"))?(t>-1?(this.type===m._in&&this.unexpected(t),e.await=!0):f&&this.options.ecmaVersion>=8&&(C.start===w&&!b&&C.type==="Identifier"&&C.name==="async"?this.unexpected():this.options.ecmaVersion>=9&&(e.await=!1)),h&&f&&this.raise(C.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(C,!1,v),this.checkLValPattern(C),this.parseForIn(e,C)):(this.checkExpressionErrors(v,!0),t>-1&&this.unexpected(t),this.parseFor(e,C))};P.parseForAfterInit=function(e,t,i){return(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))&&t.declarations.length===1?(this.type===m._in?((t.kind==="using"||t.kind==="await using")&&!t.declarations[0].init&&this.raise(this.start,"Using declaration is not allowed in for-in loops"),this.options.ecmaVersion>=9&&i>-1&&this.unexpected(i)):this.options.ecmaVersion>=9&&(e.await=i>-1),this.parseForIn(e,t)):(i>-1&&this.unexpected(i),this.parseFor(e,t))};P.parseFunctionStatement=function(e,t,i){return this.next(),this.parseFunction(e,wi|(i?0:$n),!1,t)};P.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(m._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")};P.parseReturnStatement=function(e){return this.allowReturn||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(m.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")};P.parseSwitchStatement=function(e){this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(m.braceL),this.labels.push(Df),this.enterScope(Lc);for(var t,i=!1;this.type!==m.braceR;)if(this.type===m._case||this.type===m._default){var n=this.type===m._case;t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),n?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(m.colon)}else t||this.unexpected(),t.consequent.push(this.parseStatement(null));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")};P.parseThrowStatement=function(e){return this.next(),Ce.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")};var Vf=[];P.parseCatchClauseParam=function(){var e=this.parseBindingAtom(),t=e.type==="Identifier";return this.enterScope(t?Tc:0),this.checkLValPattern(e,t?$c:ht),this.expect(m.parenR),e};P.parseTryStatement=function(e){if(this.next(),e.block=this.parseBlock(),e.handler=null,this.type===m._catch){var t=this.startNode();this.next(),this.eat(m.parenL)?t.param=this.parseCatchClauseParam():(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")}return e.finalizer=this.eat(m._finally)?this.parseBlock():null,!e.handler&&!e.finalizer&&this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")};P.parseVarStatement=function(e,t,i){return this.next(),this.parseVar(e,!1,t,i),this.semicolon(),this.finishNode(e,"VariableDeclaration")};P.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(Dn),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")};P.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")};P.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")};P.parseLabeledStatement=function(e,t,i,n){for(var c=0,h=this.labels;c<h.length;c+=1){var f=h[c];f.name===t&&this.raise(i.start,"Label '"+t+"' is already declared")}for(var g=this.type.isLoop?"loop":this.type===m._switch?"switch":null,y=this.labels.length-1;y>=0;y--){var b=this.labels[y];if(b.statementStart===e.start)b.statementStart=this.start,b.kind=g;else break}return this.labels.push({name:t,kind:g,statementStart:this.start}),e.body=this.parseStatement(n?n.indexOf("label")===-1?n+"label":n:"label"),this.labels.pop(),e.label=i,this.finishNode(e,"LabeledStatement")};P.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")};P.parseBlock=function(e,t,i){for(e===void 0&&(e=!0),t===void 0&&(t=this.startNode()),t.body=[],this.expect(m.braceL),e&&this.enterScope(0);this.type!==m.braceR;){var n=this.parseStatement(null);t.body.push(n)}return i&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")};P.parseFor=function(e,t){return e.init=t,this.expect(m.semi),e.test=this.type===m.semi?null:this.parseExpression(),this.expect(m.semi),e.update=this.type===m.parenR?null:this.parseExpression(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")};P.parseForIn=function(e,t){var i=this.type===m._in;return this.next(),t.type==="VariableDeclaration"&&t.declarations[0].init!=null&&(!i||this.options.ecmaVersion<8||this.strict||t.kind!=="var"||t.declarations[0].id.type!=="Identifier")&&this.raise(t.start,(i?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=i?this.parseExpression():this.parseMaybeAssign(),this.expect(m.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,i?"ForInStatement":"ForOfStatement")};P.parseVar=function(e,t,i,n){for(e.declarations=[],e.kind=i;;){var c=this.startNode();if(this.parseVarId(c,i),this.eat(m.eq)?c.init=this.parseMaybeAssign(t):!n&&i==="const"&&!(this.type===m._in||this.options.ecmaVersion>=6&&this.isContextual("of"))?this.unexpected():!n&&(i==="using"||i==="await using")&&this.options.ecmaVersion>=17&&this.type!==m._in&&!this.isContextual("of")?this.raise(this.lastTokEnd,"Missing initializer in "+i+" declaration"):!n&&c.id.type!=="Identifier"&&!(t&&(this.type===m._in||this.isContextual("of")))?this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):c.init=null,e.declarations.push(this.finishNode(c,"VariableDeclarator")),!this.eat(m.comma))break}return e};P.parseVarId=function(e,t){e.id=t==="using"||t==="await using"?this.parseIdent():this.parseBindingAtom(),this.checkLValPattern(e.id,t==="var"?On:ht,!1)};var wi=1,$n=2,Nc=4;P.parseFunction=function(e,t,i,n,c){this.initFunction(e),(this.options.ecmaVersion>=9||this.options.ecmaVersion>=6&&!n)&&(this.type===m.star&&t&$n&&this.unexpected(),e.generator=this.eat(m.star)),this.options.ecmaVersion>=8&&(e.async=!!n),t&wi&&(e.id=t&Nc&&this.type!==m.name?null:this.parseIdent(),e.id&&!(t&$n)&&this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?On:ht:Ic));var h=this.yieldPos,f=this.awaitPos,g=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Mn(e.async,e.generator)),t&wi||(e.id=this.type===m.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,i,!1,c),this.yieldPos=h,this.awaitPos=f,this.awaitIdentPos=g,this.finishNode(e,t&wi?"FunctionDeclaration":"FunctionExpression")};P.parseFunctionParams=function(e){this.expect(m.parenL),e.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams()};P.parseClass=function(e,t){this.next();var i=this.strict;this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e);var n=this.enterClassBody(),c=this.startNode(),h=!1;for(c.body=[],this.expect(m.braceL);this.type!==m.braceR;){var f=this.parseClassElement(e.superClass!==null);f&&(c.body.push(f),f.type==="MethodDefinition"&&f.kind==="constructor"?(h&&this.raiseRecoverable(f.start,"Duplicate constructor in the same class"),h=!0):f.key&&f.key.type==="PrivateIdentifier"&&Bf(n,f)&&this.raiseRecoverable(f.key.start,"Identifier '#"+f.key.name+"' has already been declared"))}return this.strict=i,this.next(),e.body=this.finishNode(c,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")};P.parseClassElement=function(e){if(this.eat(m.semi))return null;var t=this.options.ecmaVersion,i=this.startNode(),n="",c=!1,h=!1,f="method",g=!1;if(this.eatContextual("static")){if(t>=13&&this.eat(m.braceL))return this.parseClassStaticBlock(i),i;this.isClassElementNameStart()||this.type===m.star?g=!0:n="static"}if(i.static=g,!n&&t>=8&&this.eatContextual("async")&&((this.isClassElementNameStart()||this.type===m.star)&&!this.canInsertSemicolon()?h=!0:n="async"),!n&&(t>=9||!h)&&this.eat(m.star)&&(c=!0),!n&&!h&&!c){var y=this.value;(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?f=y:n=y)}if(n?(i.computed=!1,i.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),i.key.name=n,this.finishNode(i.key,"Identifier")):this.parseClassElementName(i),t<13||this.type===m.parenL||f!=="method"||c||h){var b=!i.static&&dr(i,"constructor"),v=b&&e;b&&f!=="method"&&this.raise(i.key.start,"Constructor can't have get/set modifier"),i.kind=b?"constructor":f,this.parseClassMethod(i,c,h,v)}else this.parseClassField(i);return i};P.isClassElementNameStart=function(){return this.type===m.name||this.type===m.privateId||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword};P.parseClassElementName=function(e){this.type===m.privateId?(this.value==="constructor"&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)};P.parseClassMethod=function(e,t,i,n){var c=e.key;e.kind==="constructor"?(t&&this.raise(c.start,"Constructor can't be a generator"),i&&this.raise(c.start,"Constructor can't be an async method")):e.static&&dr(e,"prototype")&&this.raise(c.start,"Classes may not have a static property named prototype");var h=e.value=this.parseMethod(t,i,n);return e.kind==="get"&&h.params.length!==0&&this.raiseRecoverable(h.start,"getter should have no params"),e.kind==="set"&&h.params.length!==1&&this.raiseRecoverable(h.start,"setter should have exactly one param"),e.kind==="set"&&h.params[0].type==="RestElement"&&this.raiseRecoverable(h.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")};P.parseClassField=function(e){return dr(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&dr(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(m.eq)?(this.enterScope(Ei|br),e.value=this.parseMaybeAssign(),this.exitScope()):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")};P.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(Lt|br);this.type!==m.braceR;){var i=this.parseStatement(null);e.body.push(i)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")};P.parseClassId=function(e,t){this.type===m.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,ht,!1)):(t===!0&&this.unexpected(),e.id=null)};P.parseClassSuper=function(e){e.superClass=this.eat(m._extends)?this.parseExprSubscripts(null,!1):null};P.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared};P.exitClassBody=function(){var e=this.privateNameStack.pop(),t=e.declared,i=e.used;if(this.options.checkPrivateFields)for(var n=this.privateNameStack.length,c=n===0?null:this.privateNameStack[n-1],h=0;h<i.length;++h){var f=i[h];Kt(t,f.name)||(c?c.used.push(f):this.raiseRecoverable(f.start,"Private field '#"+f.name+"' must be declared in an enclosing class"))}};function Bf(e,t){var i=t.key.name,n=e[i],c="true";return t.type==="MethodDefinition"&&(t.kind==="get"||t.kind==="set")&&(c=(t.static?"s":"i")+t.kind),n==="iget"&&c==="iset"||n==="iset"&&c==="iget"||n==="sget"&&c==="sset"||n==="sset"&&c==="sget"?(e[i]="true",!1):n?!0:(e[i]=c,!1)}function dr(e,t){var i=e.computed,n=e.key;return!i&&(n.type==="Identifier"&&n.name===t||n.type==="Literal"&&n.value===t)}P.parseExportAllDeclaration=function(e,t){return this.options.ecmaVersion>=11&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ExportAllDeclaration")};P.parseExport=function(e,t){if(this.next(),this.eat(m.star))return this.parseExportAllDeclaration(e,t);if(this.eat(m._default))return this.checkExport(t,"default",this.lastTokStart),e.declaration=this.parseExportDefaultDeclaration(),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseExportDeclaration(e),e.declaration.type==="VariableDeclaration"?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[]);else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==m.string&&this.unexpected(),e.source=this.parseExprAtom(),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause());else{for(var i=0,n=e.specifiers;i<n.length;i+=1){var c=n[i];this.checkUnreserved(c.local),this.checkLocalExport(c.local),c.local.type==="Literal"&&this.raise(c.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null,this.options.ecmaVersion>=16&&(e.attributes=[])}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")};P.parseExportDeclaration=function(e){return this.parseStatement(null)};P.parseExportDefaultDeclaration=function(){var e;if(this.type===m._function||(e=this.isAsyncFunction())){var t=this.startNode();return this.next(),e&&this.next(),this.parseFunction(t,wi|Nc,!1,e)}else if(this.type===m._class){var i=this.startNode();return this.parseClass(i,"nullableID")}else{var n=this.parseMaybeAssign();return this.semicolon(),n}};P.checkExport=function(e,t,i){e&&(typeof t!="string"&&(t=t.type==="Identifier"?t.name:t.value),Kt(e,t)&&this.raiseRecoverable(i,"Duplicate export '"+t+"'"),e[t]=!0)};P.checkPatternExport=function(e,t){var i=t.type;if(i==="Identifier")this.checkExport(e,t,t.start);else if(i==="ObjectPattern")for(var n=0,c=t.properties;n<c.length;n+=1){var h=c[n];this.checkPatternExport(e,h)}else if(i==="ArrayPattern")for(var f=0,g=t.elements;f<g.length;f+=1){var y=g[f];y&&this.checkPatternExport(e,y)}else i==="Property"?this.checkPatternExport(e,t.value):i==="AssignmentPattern"?this.checkPatternExport(e,t.left):i==="RestElement"&&this.checkPatternExport(e,t.argument)};P.checkVariableExport=function(e,t){if(e)for(var i=0,n=t;i<n.length;i+=1){var c=n[i];this.checkPatternExport(e,c.id)}};P.shouldParseExportStatement=function(){return this.type.keyword==="var"||this.type.keyword==="const"||this.type.keyword==="class"||this.type.keyword==="function"||this.isLet()||this.isAsyncFunction()};P.parseExportSpecifier=function(e){var t=this.startNode();return t.local=this.parseModuleExportName(),t.exported=this.eatContextual("as")?this.parseModuleExportName():t.local,this.checkExport(e,t.exported,t.exported.start),this.finishNode(t,"ExportSpecifier")};P.parseExportSpecifiers=function(e){var t=[],i=!0;for(this.expect(m.braceL);!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;t.push(this.parseExportSpecifier(e))}return t};P.parseImport=function(e){return this.next(),this.type===m.string?(e.specifiers=Vf,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===m.string?this.parseExprAtom():this.unexpected()),this.options.ecmaVersion>=16&&(e.attributes=this.parseWithClause()),this.semicolon(),this.finishNode(e,"ImportDeclaration")};P.parseImportSpecifier=function(){var e=this.startNode();return e.imported=this.parseModuleExportName(),this.eatContextual("as")?e.local=this.parseIdent():(this.checkUnreserved(e.imported),e.local=e.imported),this.checkLValSimple(e.local,ht),this.finishNode(e,"ImportSpecifier")};P.parseImportDefaultSpecifier=function(){var e=this.startNode();return e.local=this.parseIdent(),this.checkLValSimple(e.local,ht),this.finishNode(e,"ImportDefaultSpecifier")};P.parseImportNamespaceSpecifier=function(){var e=this.startNode();return this.next(),this.expectContextual("as"),e.local=this.parseIdent(),this.checkLValSimple(e.local,ht),this.finishNode(e,"ImportNamespaceSpecifier")};P.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===m.name&&(e.push(this.parseImportDefaultSpecifier()),!this.eat(m.comma)))return e;if(this.type===m.star)return e.push(this.parseImportNamespaceSpecifier()),e;for(this.expect(m.braceL);!this.eat(m.braceR);){if(t)t=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;e.push(this.parseImportSpecifier())}return e};P.parseWithClause=function(){var e=[];if(!this.eat(m._with))return e;this.expect(m.braceL);for(var t={},i=!0;!this.eat(m.braceR);){if(i)i=!1;else if(this.expect(m.comma),this.afterTrailingComma(m.braceR))break;var n=this.parseImportAttribute(),c=n.key.type==="Identifier"?n.key.name:n.key.value;Kt(t,c)&&this.raiseRecoverable(n.key.start,"Duplicate attribute key '"+c+"'"),t[c]=!0,e.push(n)}return e};P.parseImportAttribute=function(){var e=this.startNode();return e.key=this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never"),this.expect(m.colon),this.type!==m.string&&this.unexpected(),e.value=this.parseExprAtom(),this.finishNode(e,"ImportAttribute")};P.parseModuleExportName=function(){if(this.options.ecmaVersion>=13&&this.type===m.string){var e=this.parseLiteral(this.value);return Rf.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e}return this.parseIdent(!0)};P.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)};P.isDirectiveCandidate=function(e){return this.options.ecmaVersion>=5&&e.type==="ExpressionStatement"&&e.expression.type==="Literal"&&typeof e.expression.value=="string"&&(this.input[e.start]==='"'||this.input[e.start]==="'")};var Be=ce.prototype;Be.toAssignable=function(e,t,i){if(this.options.ecmaVersion>=6&&e)switch(e.type){case"Identifier":this.inAsync&&e.name==="await"&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",i&&this.checkPatternErrors(i,!0);for(var n=0,c=e.properties;n<c.length;n+=1){var h=c[n];this.toAssignable(h,t),h.type==="RestElement"&&(h.argument.type==="ArrayPattern"||h.argument.type==="ObjectPattern")&&this.raise(h.argument.start,"Unexpected token")}break;case"Property":e.kind!=="init"&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",i&&this.checkPatternErrors(i,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),e.argument.type==="AssignmentPattern"&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":e.operator!=="="&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,i);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else i&&this.checkPatternErrors(i,!0);return e};Be.toAssignableList=function(e,t){for(var i=e.length,n=0;n<i;n++){var c=e[n];c&&this.toAssignable(c,t)}if(i){var h=e[i-1];this.options.ecmaVersion===6&&t&&h&&h.type==="RestElement"&&h.argument.type!=="Identifier"&&this.unexpected(h.argument.start)}return e};Be.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")};Be.parseRestBinding=function(){var e=this.startNode();return this.next(),this.options.ecmaVersion===6&&this.type!==m.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")};Be.parseBindingAtom=function(){if(this.options.ecmaVersion>=6)switch(this.type){case m.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(m.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case m.braceL:return this.parseObj(!0)}return this.parseIdent()};Be.parseBindingList=function(e,t,i,n){for(var c=[],h=!0;!this.eat(e);)if(h?h=!1:this.expect(m.comma),t&&this.type===m.comma)c.push(null);else{if(i&&this.afterTrailingComma(e))break;if(this.type===m.ellipsis){var f=this.parseRestBinding();this.parseBindingListItem(f),c.push(f),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}else c.push(this.parseAssignableListItem(n))}return c};Be.parseAssignableListItem=function(e){var t=this.parseMaybeDefault(this.start,this.startLoc);return this.parseBindingListItem(t),t};Be.parseBindingListItem=function(e){return e};Be.parseMaybeDefault=function(e,t,i){if(i=i||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(m.eq))return i;var n=this.startNodeAt(e,t);return n.left=i,n.right=this.parseMaybeAssign(),this.finishNode(n,"AssignmentPattern")};Be.checkLValSimple=function(e,t,i){t===void 0&&(t=hr);var n=t!==hr;switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(n?"Binding ":"Assigning to ")+e.name+" in strict mode"),n&&(t===ht&&e.name==="let"&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),i&&(Kt(i,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),i[e.name]=!0),t!==Pc&&this.declareName(e.name,t,e.start));break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":n&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return n&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,i);default:this.raise(e.start,(n?"Binding":"Assigning to")+" rvalue")}};Be.checkLValPattern=function(e,t,i){switch(t===void 0&&(t=hr),e.type){case"ObjectPattern":for(var n=0,c=e.properties;n<c.length;n+=1){var h=c[n];this.checkLValInnerPattern(h,t,i)}break;case"ArrayPattern":for(var f=0,g=e.elements;f<g.length;f+=1){var y=g[f];y&&this.checkLValInnerPattern(y,t,i)}break;default:this.checkLValSimple(e,t,i)}};Be.checkLValInnerPattern=function(e,t,i){switch(t===void 0&&(t=hr),e.type){case"Property":this.checkLValInnerPattern(e.value,t,i);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,i);break;case"RestElement":this.checkLValPattern(e.argument,t,i);break;default:this.checkLValPattern(e,t,i)}};var qe=function(t,i,n,c,h){this.token=t,this.isExpr=!!i,this.preserveSpace=!!n,this.override=c,this.generator=!!h},te={b_stat:new qe("{",!1),b_expr:new qe("{",!0),b_tmpl:new qe("${",!1),p_stat:new qe("(",!1),p_expr:new qe("(",!0),q_tmpl:new qe("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new qe("function",!1),f_expr:new qe("function",!0),f_expr_gen:new qe("function",!0,!1,null,!0),f_gen:new qe("function",!1,!1,null,!0)},Yt=ce.prototype;Yt.initialContext=function(){return[te.b_stat]};Yt.curContext=function(){return this.context[this.context.length-1]};Yt.braceIsBlock=function(e){var t=this.curContext();return t===te.f_expr||t===te.f_stat?!0:e===m.colon&&(t===te.b_stat||t===te.b_expr)?!t.isExpr:e===m._return||e===m.name&&this.exprAllowed?Ce.test(this.input.slice(this.lastTokEnd,this.start)):e===m._else||e===m.semi||e===m.eof||e===m.parenR||e===m.arrow?!0:e===m.braceL?t===te.b_stat:e===m._var||e===m._const||e===m.name?!1:!this.exprAllowed};Yt.inGeneratorContext=function(){for(var e=this.context.length-1;e>=1;e--){var t=this.context[e];if(t.token==="function")return t.generator}return!1};Yt.updateContext=function(e){var t,i=this.type;i.keyword&&e===m.dot?this.exprAllowed=!1:(t=i.updateContext)?t.call(this,e):this.exprAllowed=i.beforeExpr};Yt.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)};m.parenR.updateContext=m.braceR.updateContext=function(){if(this.context.length===1){this.exprAllowed=!0;return}var e=this.context.pop();e===te.b_stat&&this.curContext().token==="function"&&(e=this.context.pop()),this.exprAllowed=!e.isExpr};m.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?te.b_stat:te.b_expr),this.exprAllowed=!0};m.dollarBraceL.updateContext=function(){this.context.push(te.b_tmpl),this.exprAllowed=!0};m.parenL.updateContext=function(e){var t=e===m._if||e===m._for||e===m._with||e===m._while;this.context.push(t?te.p_stat:te.p_expr),this.exprAllowed=!0};m.incDec.updateContext=function(){};m._function.updateContext=m._class.updateContext=function(e){e.beforeExpr&&e!==m._else&&!(e===m.semi&&this.curContext()!==te.p_stat)&&!(e===m._return&&Ce.test(this.input.slice(this.lastTokEnd,this.start)))&&!((e===m.colon||e===m.braceL)&&this.curContext()===te.b_stat)?this.context.push(te.f_expr):this.context.push(te.f_stat),this.exprAllowed=!1};m.colon.updateContext=function(){this.curContext().token==="function"&&this.context.pop(),this.exprAllowed=!0};m.backQuote.updateContext=function(){this.curContext()===te.q_tmpl?this.context.pop():this.context.push(te.q_tmpl),this.exprAllowed=!1};m.star.updateContext=function(e){if(e===m._function){var t=this.context.length-1;this.context[t]===te.f_expr?this.context[t]=te.f_expr_gen:this.context[t]=te.f_gen}this.exprAllowed=!0};m.name.updateContext=function(e){var t=!1;this.options.ecmaVersion>=6&&e!==m.dot&&(this.value==="of"&&!this.exprAllowed||this.value==="yield"&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t};var R=ce.prototype;R.checkPropClash=function(e,t,i){if(!(this.options.ecmaVersion>=9&&e.type==="SpreadElement")&&!(this.options.ecmaVersion>=6&&(e.computed||e.method||e.shorthand))){var n=e.key,c;switch(n.type){case"Identifier":c=n.name;break;case"Literal":c=String(n.value);break;default:return}var h=e.kind;if(this.options.ecmaVersion>=6){c==="__proto__"&&h==="init"&&(t.proto&&(i?i.doubleProto<0&&(i.doubleProto=n.start):this.raiseRecoverable(n.start,"Redefinition of __proto__ property")),t.proto=!0);return}c="$"+c;var f=t[c];if(f){var g;h==="init"?g=this.strict&&f.init||f.get||f.set:g=f.init||f[h],g&&this.raiseRecoverable(n.start,"Redefinition of property")}else f=t[c]={init:!1,get:!1,set:!1};f[h]=!0}};R.parseExpression=function(e,t){var i=this;return this.catchStackOverflow(function(){var n=i.start,c=i.startLoc,h=i.parseMaybeAssign(e,t);if(i.type===m.comma){var f=i.startNodeAt(n,c);for(f.expressions=[h];i.eat(m.comma);)f.expressions.push(i.parseMaybeAssign(e,t));return i.finishNode(f,"SequenceExpression")}return h})};R.parseMaybeAssign=function(e,t,i){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var n=!1,c=-1,h=-1,f=-1;t?(c=t.parenthesizedAssign,h=t.trailingComma,f=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new yr,n=!0);var g=this.start,y=this.startLoc;(this.type===m.parenL||this.type===m.name)&&(this.potentialArrowAt=this.start,this.potentialArrowInForAwait=e==="await");var b=this.parseMaybeConditional(e,t);if(i&&(b=i.call(this,b,g,y)),this.type.isAssign){var v=this.startNodeAt(g,y);return v.operator=this.value,this.type===m.eq&&(b=this.toAssignable(b,!1,t)),n||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=b.start&&(t.shorthandAssign=-1),this.type===m.eq?this.checkLValPattern(b):this.checkLValSimple(b),v.left=b,this.next(),v.right=this.parseMaybeAssign(e),f>-1&&(t.doubleProto=f),this.finishNode(v,"AssignmentExpression")}else n&&this.checkExpressionErrors(t,!0);return c>-1&&(t.parenthesizedAssign=c),h>-1&&(t.trailingComma=h),b};R.parseMaybeConditional=function(e,t){var i=this.start,n=this.startLoc,c=this.parseExprOps(e,t);if(this.checkExpressionErrors(t))return c;if(!(c.type==="ArrowFunctionExpression"&&c.start===i)&&this.eat(m.question)){var h=this.startNodeAt(i,n);return h.test=c,h.consequent=this.parseMaybeAssign(),this.expect(m.colon),h.alternate=this.parseMaybeAssign(e),this.finishNode(h,"ConditionalExpression")}return c};R.parseExprOps=function(e,t){var i=this.start,n=this.startLoc,c=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||c.start===i&&c.type==="ArrowFunctionExpression"?c:this.parseExprOp(c,i,n,-1,e)};R.parseExprOp=function(e,t,i,n,c){var h=this.type.binop;if(h!=null&&(!c||this.type!==m._in)&&h>n){var f=this.type===m.logicalOR||this.type===m.logicalAND,g=this.type===m.coalesce;g&&(h=m.logicalAND.binop);var y=this.value;this.next();var b=this.start,v=this.startLoc,w=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,c),b,v,h,c),C=this.buildBinary(t,i,e,w,y,f||g);return(f&&this.type===m.coalesce||g&&(this.type===m.logicalOR||this.type===m.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(C,t,i,n,c)}return e};R.buildBinary=function(e,t,i,n,c,h){n.type==="PrivateIdentifier"&&this.raise(n.start,"Private identifier can only be left side of binary expression");var f=this.startNodeAt(e,t);return f.left=i,f.operator=c,f.right=n,this.finishNode(f,h?"LogicalExpression":"BinaryExpression")};R.parseMaybeUnary=function(e,t,i,n){var c=this.start,h=this.startLoc,f;if(this.isContextual("await")&&this.canAwait)f=this.parseAwait(n),t=!0;else if(this.type.prefix){var g=this.startNode(),y=this.type===m.incDec;g.operator=this.value,g.prefix=!0,this.next(),g.argument=this.parseMaybeUnary(null,!0,y,n),this.checkExpressionErrors(e,!0),y?this.checkLValSimple(g.argument):this.strict&&g.operator==="delete"&&Rc(g.argument)?this.raiseRecoverable(g.start,"Deleting local variable in strict mode"):g.operator==="delete"&&Pn(g.argument)?this.raiseRecoverable(g.start,"Private fields can not be deleted"):t=!0,f=this.finishNode(g,y?"UpdateExpression":"UnaryExpression")}else if(!t&&this.type===m.privateId)(n||this.privateNameStack.length===0)&&this.options.checkPrivateFields&&this.unexpected(),f=this.parsePrivateIdent(),this.type!==m._in&&this.unexpected();else{if(f=this.parseExprSubscripts(e,n),this.checkExpressionErrors(e))return f;for(;this.type.postfix&&!this.canInsertSemicolon();){var b=this.startNodeAt(c,h);b.operator=this.value,b.prefix=!1,b.argument=f,this.checkLValSimple(f),this.next(),f=this.finishNode(b,"UpdateExpression")}}if(!i&&!(f.type==="ArrowFunctionExpression"&&f.start===c)&&this.eat(m.starstar))if(t)this.unexpected(this.lastTokStart);else return this.buildBinary(c,h,f,this.parseMaybeUnary(null,!1,!1,n),"**",!1);else return f};function Rc(e){return e.type==="Identifier"||e.type==="ParenthesizedExpression"&&Rc(e.expression)}function Pn(e){return e.type==="MemberExpression"&&e.property.type==="PrivateIdentifier"||e.type==="ChainExpression"&&Pn(e.expression)||e.type==="ParenthesizedExpression"&&Pn(e.expression)}R.parseExprSubscripts=function(e,t){var i=this.start,n=this.startLoc,c=this.parseExprAtom(e,t);if(c.type==="ArrowFunctionExpression"&&this.input.slice(this.lastTokStart,this.lastTokEnd)!==")")return c;var h=this.parseSubscripts(c,i,n,!1,t);return e&&h.type==="MemberExpression"&&(e.parenthesizedAssign>=h.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=h.start&&(e.parenthesizedBind=-1),e.trailingComma>=h.start&&(e.trailingComma=-1)),h};R.parseSubscripts=function(e,t,i,n,c){for(var h=this.options.ecmaVersion>=8&&e.type==="Identifier"&&e.name==="async"&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start===5&&this.potentialArrowAt===e.start,f=!1;;){var g=this.parseSubscript(e,t,i,n,h,f,c);if(g.optional&&(f=!0),g===e||g.type==="ArrowFunctionExpression"){if(f){var y=this.startNodeAt(t,i);y.expression=g,g=this.finishNode(y,"ChainExpression")}return g}e=g}};R.shouldParseAsyncArrow=function(){return!this.canInsertSemicolon()&&this.eat(m.arrow)};R.parseSubscriptAsyncArrow=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!0,n)};R.parseSubscript=function(e,t,i,n,c,h,f){var g=this.options.ecmaVersion>=11,y=g&&this.eat(m.questionDot);n&&y&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions");var b=this.eat(m.bracketL);if(b||y&&this.type!==m.parenL&&this.type!==m.backQuote||this.eat(m.dot)){var v=this.startNodeAt(t,i);v.object=e,b?(v.property=this.parseExpression(),this.expect(m.bracketR)):this.type===m.privateId&&e.type!=="Super"?v.property=this.parsePrivateIdent():v.property=this.parseIdent(this.options.allowReserved!=="never"),v.computed=!!b,g&&(v.optional=y),e=this.finishNode(v,"MemberExpression")}else if(!n&&this.eat(m.parenL)){var w=new yr,C=this.yieldPos,u=this.awaitPos,I=this.awaitIdentPos;this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0;var z=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1,w);if(c&&!y&&this.shouldParseAsyncArrow())return this.checkPatternErrors(w,!1),this.checkYieldAwaitInDefaultParams(),this.awaitIdentPos>0&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=C,this.awaitPos=u,this.awaitIdentPos=I,this.parseSubscriptAsyncArrow(t,i,z,f);this.checkExpressionErrors(w,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,this.awaitIdentPos=I||this.awaitIdentPos;var ie=this.startNodeAt(t,i);ie.callee=e,ie.arguments=z,g&&(ie.optional=y),e=this.finishNode(ie,"CallExpression")}else if(this.type===m.backQuote){(y||h)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions");var Y=this.startNodeAt(t,i);Y.tag=e,Y.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(Y,"TaggedTemplateExpression")}return e};R.parseExprAtom=function(e,t,i){this.type===m.slash&&this.readRegexp();var n,c=this.potentialArrowAt===this.start;switch(this.type){case m._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),n=this.startNode(),this.next(),this.type===m.parenL&&!this.allowDirectSuper&&this.raise(n.start,"super() call outside constructor of a subclass"),this.type!==m.dot&&this.type!==m.bracketL&&this.type!==m.parenL&&this.unexpected(),this.finishNode(n,"Super");case m._this:return n=this.startNode(),this.next(),this.finishNode(n,"ThisExpression");case m.name:var h=this.start,f=this.startLoc,g=this.containsEsc,y=this.parseIdent(!1);if(this.options.ecmaVersion>=8&&!g&&y.name==="async"&&!this.canInsertSemicolon()&&this.eat(m._function))return this.overrideContext(te.f_expr),this.parseFunction(this.startNodeAt(h,f),0,!1,!0,t);if(c&&!this.canInsertSemicolon()){if(this.eat(m.arrow))return this.parseArrowExpression(this.startNodeAt(h,f),[y],!1,t);if(this.options.ecmaVersion>=8&&y.name==="async"&&this.type===m.name&&!g&&(!this.potentialArrowInForAwait||this.value!=="of"||this.containsEsc))return y=this.parseIdent(!1),(this.canInsertSemicolon()||!this.eat(m.arrow))&&this.unexpected(),this.parseArrowExpression(this.startNodeAt(h,f),[y],!0,t)}return y;case m.regexp:var b=this.value;return n=this.parseLiteral(b.value),n.regex={pattern:b.pattern,flags:b.flags},n;case m.num:case m.string:return this.parseLiteral(this.value);case m._null:case m._true:case m._false:return n=this.startNode(),n.value=this.type===m._null?null:this.type===m._true,n.raw=this.type.keyword,this.next(),this.finishNode(n,"Literal");case m.parenL:var v=this.start,w=this.parseParenAndDistinguishExpression(c,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(w)&&(e.parenthesizedAssign=v),e.parenthesizedBind<0&&(e.parenthesizedBind=v)),w;case m.bracketL:return n=this.startNode(),this.next(),n.elements=this.parseExprList(m.bracketR,!0,!0,e),this.finishNode(n,"ArrayExpression");case m.braceL:return this.overrideContext(te.b_expr),this.parseObj(!1,e);case m._function:return n=this.startNode(),this.next(),this.parseFunction(n,0);case m._class:return this.parseClass(this.startNode(),!1);case m._new:return this.parseNew();case m.backQuote:return this.parseTemplate();case m._import:return this.options.ecmaVersion>=11?this.parseExprImport(i):this.unexpected();default:return this.parseExprAtomDefault()}};R.parseExprAtomDefault=function(){this.unexpected()};R.parseExprImport=function(e){var t=this.startNode();if(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.next(),this.type===m.parenL&&!e)return this.parseDynamicImport(t);if(this.type===m.dot){var i=this.startNodeAt(t.start,t.loc&&t.loc.start);return i.name="import",t.meta=this.finishNode(i,"Identifier"),this.parseImportMeta(t)}else this.unexpected()};R.parseDynamicImport=function(e){if(this.next(),e.source=this.parseMaybeAssign(),this.options.ecmaVersion>=16)this.eat(m.parenR)?e.options=null:(this.expect(m.comma),this.afterTrailingComma(m.parenR)?e.options=null:(e.options=this.parseMaybeAssign(),this.eat(m.parenR)||(this.expect(m.comma),this.afterTrailingComma(m.parenR)||this.unexpected())));else if(!this.eat(m.parenR)){var t=this.start;this.eat(m.comma)&&this.eat(m.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)}return this.finishNode(e,"ImportExpression")};R.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="meta"&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),this.options.sourceType!=="module"&&!this.options.allowImportExportEverywhere&&this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")};R.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),t.raw.charCodeAt(t.raw.length-1)===110&&(t.bigint=t.value!=null?t.value.toString():t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")};R.parseParenExpression=function(){this.expect(m.parenL);var e=this.parseExpression();return this.expect(m.parenR),e};R.shouldParseArrow=function(e){return!this.canInsertSemicolon()};R.parseParenAndDistinguishExpression=function(e,t){var i=this.start,n=this.startLoc,c,h=this.options.ecmaVersion>=8;if(this.options.ecmaVersion>=6){this.next();var f=this.start,g=this.startLoc,y=[],b=!0,v=!1,w=new yr,C=this.yieldPos,u=this.awaitPos,I;for(this.yieldPos=0,this.awaitPos=0;this.type!==m.parenR;)if(b?b=!1:this.expect(m.comma),h&&this.afterTrailingComma(m.parenR,!0)){v=!0;break}else if(this.type===m.ellipsis){I=this.start,y.push(this.parseParenItem(this.parseRestBinding())),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element");break}else y.push(this.parseMaybeAssign(!1,w,this.parseParenItem));var z=this.lastTokEnd,ie=this.lastTokEndLoc;if(this.expect(m.parenR),e&&this.shouldParseArrow(y)&&this.eat(m.arrow))return this.checkPatternErrors(w,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=C,this.awaitPos=u,this.parseParenArrowList(i,n,y,t);(!y.length||v)&&this.unexpected(this.lastTokStart),I&&this.unexpected(I),this.checkExpressionErrors(w,!0),this.yieldPos=C||this.yieldPos,this.awaitPos=u||this.awaitPos,y.length>1?(c=this.startNodeAt(f,g),c.expressions=y,this.finishNodeAt(c,"SequenceExpression",z,ie)):c=y[0]}else c=this.parseParenExpression();if(this.options.preserveParens){var Y=this.startNodeAt(i,n);return Y.expression=c,this.finishNode(Y,"ParenthesizedExpression")}else return c};R.parseParenItem=function(e){return e};R.parseParenArrowList=function(e,t,i,n){return this.parseArrowExpression(this.startNodeAt(e,t),i,!1,n)};var jf=[];R.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e=this.startNode();if(this.next(),this.options.ecmaVersion>=6&&this.type===m.dot){var t=this.startNodeAt(e.start,e.loc&&e.loc.start);t.name="new",e.meta=this.finishNode(t,"Identifier"),this.next();var i=this.containsEsc;return e.property=this.parseIdent(!0),e.property.name!=="target"&&this.raiseRecoverable(e.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(e.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(e.start,"'new.target' can only be used in functions and class static block"),this.finishNode(e,"MetaProperty")}var n=this.start,c=this.startLoc;return e.callee=this.parseSubscripts(this.parseExprAtom(null,!1,!0),n,c,!0,!1),e.callee.type==="Super"&&this.raiseRecoverable(n,"Invalid use of 'super'"),this.eat(m.parenL)?e.arguments=this.parseExprList(m.parenR,this.options.ecmaVersion>=8,!1):e.arguments=jf,this.finishNode(e,"NewExpression")};R.parseTemplateElement=function(e){var t=e.isTagged,i=this.startNode();return this.type===m.invalidTemplate?(t||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),i.value={raw:this.value.replace(/\r\n?/g,`
`),cooked:null}):i.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,`
`),cooked:this.value},this.next(),i.tail=this.type===m.backQuote,this.finishNode(i,"TemplateElement")};R.parseTemplate=function(e){e===void 0&&(e={});var t=e.isTagged;t===void 0&&(t=!1);var i=this.startNode();this.next(),i.expressions=[];var n=this.parseTemplateElement({isTagged:t});for(i.quasis=[n];!n.tail;)this.type===m.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(m.dollarBraceL),i.expressions.push(this.parseExpression()),this.expect(m.braceR),i.quasis.push(n=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(i,"TemplateLiteral")};R.isAsyncProp=function(e){return!e.computed&&e.key.type==="Identifier"&&e.key.name==="async"&&(this.type===m.name||this.type===m.num||this.type===m.string||this.type===m.bracketL||this.type.keyword||this.options.ecmaVersion>=9&&this.type===m.star)&&!Ce.test(this.input.slice(this.lastTokEnd,this.start))};R.parseObj=function(e,t){var i=this.startNode(),n=!0,c={};for(i.properties=[],this.next();!this.eat(m.braceR);){if(n)n=!1;else if(this.expect(m.comma),this.options.ecmaVersion>=5&&this.afterTrailingComma(m.braceR))break;var h=this.parseProperty(e,t);e||this.checkPropClash(h,c,t),i.properties.push(h)}return this.finishNode(i,e?"ObjectPattern":"ObjectExpression")};R.parseProperty=function(e,t){var i=this.startNode(),n,c,h,f;if(this.options.ecmaVersion>=9&&this.eat(m.ellipsis))return e?(i.argument=this.parseIdent(!1),this.type===m.comma&&this.raiseRecoverable(this.start,"Comma is not permitted after the rest element"),this.finishNode(i,"RestElement")):(i.argument=this.parseMaybeAssign(!1,t),this.type===m.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(i,"SpreadElement"));this.options.ecmaVersion>=6&&(i.method=!1,i.shorthand=!1,(e||t)&&(h=this.start,f=this.startLoc),e||(n=this.eat(m.star)));var g=this.containsEsc;return this.parsePropertyName(i),!e&&!g&&this.options.ecmaVersion>=8&&!n&&this.isAsyncProp(i)?(c=!0,n=this.options.ecmaVersion>=9&&this.eat(m.star),this.parsePropertyName(i)):c=!1,this.parsePropertyValue(i,e,n,c,h,f,t,g),this.finishNode(i,"Property")};R.parseGetterSetter=function(e){var t=e.key.name;this.parsePropertyName(e),e.value=this.parseMethod(!1),e.kind=t;var i=e.kind==="get"?0:1;if(e.value.params.length!==i){var n=e.value.start;e.kind==="get"?this.raiseRecoverable(n,"getter should have no params"):this.raiseRecoverable(n,"setter should have exactly one param")}else e.kind==="set"&&e.value.params[0].type==="RestElement"&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params")};R.parsePropertyValue=function(e,t,i,n,c,h,f,g){(i||n)&&this.type===m.colon&&this.unexpected(),this.eat(m.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,f),e.kind="init"):this.options.ecmaVersion>=6&&this.type===m.parenL?(t&&this.unexpected(),e.method=!0,e.value=this.parseMethod(i,n),e.kind="init"):!t&&!g&&this.options.ecmaVersion>=5&&!e.computed&&e.key.type==="Identifier"&&(e.key.name==="get"||e.key.name==="set")&&this.type!==m.comma&&this.type!==m.braceR&&this.type!==m.eq?((i||n)&&this.unexpected(),this.parseGetterSetter(e)):this.options.ecmaVersion>=6&&!e.computed&&e.key.type==="Identifier"?((i||n)&&this.unexpected(),this.checkUnreserved(e.key),e.key.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=c),t?e.value=this.parseMaybeDefault(c,h,this.copyNode(e.key)):this.type===m.eq&&f?(f.shorthandAssign<0&&(f.shorthandAssign=this.start),e.value=this.parseMaybeDefault(c,h,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.kind="init",e.shorthand=!0):this.unexpected()};R.parsePropertyName=function(e){if(this.options.ecmaVersion>=6){if(this.eat(m.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(m.bracketR),e.key;e.computed=!1}return e.key=this.type===m.num||this.type===m.string?this.parseExprAtom():this.parseIdent(this.options.allowReserved!=="never")};R.initFunction=function(e){e.id=null,this.options.ecmaVersion>=6&&(e.generator=e.expression=!1),this.options.ecmaVersion>=8&&(e.async=!1)};R.parseMethod=function(e,t,i){var n=this.startNode(),c=this.yieldPos,h=this.awaitPos,f=this.awaitIdentPos;return this.initFunction(n),this.options.ecmaVersion>=6&&(n.generator=e),this.options.ecmaVersion>=8&&(n.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(Mn(t,n.generator)|br|(i?_c:0)),this.expect(m.parenL),n.params=this.parseBindingList(m.parenR,!1,this.options.ecmaVersion>=8),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(n,!1,!0,!1),this.yieldPos=c,this.awaitPos=h,this.awaitIdentPos=f,this.finishNode(n,"FunctionExpression")};R.parseArrowExpression=function(e,t,i,n){var c=this.yieldPos,h=this.awaitPos,f=this.awaitIdentPos;return this.enterScope(Mn(i,!1)|Fn),this.initFunction(e),this.options.ecmaVersion>=8&&(e.async=!!i),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,n),this.yieldPos=c,this.awaitPos=h,this.awaitIdentPos=f,this.finishNode(e,"ArrowFunctionExpression")};R.parseFunctionBody=function(e,t,i,n){var c=t&&this.type!==m.braceL,h=this.strict,f=!1;if(c)e.body=this.parseMaybeAssign(n),e.expression=!0,this.checkParams(e,!1);else{var g=this.options.ecmaVersion>=7&&!this.isSimpleParamList(e.params);(!h||g)&&(f=this.strictDirective(this.end),f&&g&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"));var y=this.labels;this.labels=[],f&&(this.strict=!0),this.checkParams(e,!h&&!f&&!t&&!i&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,Pc),e.body=this.parseBlock(!1,void 0,f&&!h),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=y}this.exitScope()};R.isSimpleParamList=function(e){for(var t=0,i=e;t<i.length;t+=1){var n=i[t];if(n.type!=="Identifier")return!1}return!0};R.checkParams=function(e,t){for(var i=Object.create(null),n=0,c=e.params;n<c.length;n+=1){var h=c[n];this.checkLValInnerPattern(h,On,t?null:i)}};R.parseExprList=function(e,t,i,n){for(var c=[],h=!0;!this.eat(e);){if(h)h=!1;else if(this.expect(m.comma),t&&this.afterTrailingComma(e))break;var f=void 0;i&&this.type===m.comma?f=null:this.type===m.ellipsis?(f=this.parseSpread(n),n&&this.type===m.comma&&n.trailingComma<0&&(n.trailingComma=this.start)):f=this.parseMaybeAssign(!1,n),c.push(f)}return c};R.checkUnreserved=function(e){var t=e.start,i=e.end,n=e.name;if(this.inGenerator&&n==="yield"&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),!(this.currentThisScope().flags&xr)&&n==="arguments"&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),this.inClassStaticBlock&&(n==="arguments"||n==="await")&&this.raise(t,"Cannot use "+n+" in class static initialization block"),this.keywords.test(n)&&this.raise(t,"Unexpected keyword '"+n+"'"),!(this.options.ecmaVersion<6&&this.input.slice(t,i).indexOf("\\")!==-1)){var c=this.strict?this.reservedWordsStrict:this.reservedWords;c.test(n)&&(!this.inAsync&&n==="await"&&this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+n+"' is reserved"))}};R.parseIdent=function(e){var t=this.parseIdentNode();return this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),t.name==="await"&&!this.awaitIdentPos&&(this.awaitIdentPos=t.start)),t};R.parseIdentNode=function(){var e=this.startNode();return this.type===m.name?e.name=this.value:this.type.keyword?(e.name=this.type.keyword,(e.name==="class"||e.name==="function")&&(this.lastTokEnd!==this.lastTokStart+1||this.input.charCodeAt(this.lastTokStart)!==46)&&this.context.pop(),this.type=m.name):this.unexpected(),e};R.parsePrivateIdent=function(){var e=this.startNode();return this.type===m.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),this.options.checkPrivateFields&&(this.privateNameStack.length===0?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e)),e};R.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===m.semi||this.canInsertSemicolon()||this.type!==m.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(m.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")};R.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")};var fr=ce.prototype;fr.raise=function(e,t){var i=Ec(this.input,e);t+=" ("+i.line+":"+i.column+")",this.sourceFile&&(t+=" in "+this.sourceFile);var n=new SyntaxError(t);throw n.pos=e,n.loc=i,n.raisedAt=this.pos,n};fr.raiseRecoverable=fr.raise;fr.curPosition=function(){if(this.options.locations)return new Ci(this.curLine,this.pos-this.lineStart)};var vt=ce.prototype,Uf=function(t){this.flags=t,this.var=[],this.lexical=[],this.functions=[]};vt.enterScope=function(e){this.scopeStack.push(new Uf(e))};vt.exitScope=function(){this.scopeStack.pop()};vt.treatFunctionsAsVarInScope=function(e){return e.flags&_t||!this.inModule&&e.flags&Tt};vt.declareName=function(e,t,i){var n=!1;if(t===ht){var c=this.currentScope();n=c.lexical.indexOf(e)>-1||c.functions.indexOf(e)>-1||c.var.indexOf(e)>-1,c.lexical.push(e),this.inModule&&c.flags&Tt&&delete this.undefinedExports[e]}else if(t===$c){var h=this.currentScope();h.lexical.push(e)}else if(t===Ic){var f=this.currentScope();this.treatFunctionsAsVar?n=f.lexical.indexOf(e)>-1:n=f.lexical.indexOf(e)>-1||f.var.indexOf(e)>-1,f.functions.push(e)}else for(var g=this.scopeStack.length-1;g>=0;--g){var y=this.scopeStack[g];if(y.lexical.indexOf(e)>-1&&!(y.flags&Tc&&y.lexical[0]===e)||!this.treatFunctionsAsVarInScope(y)&&y.functions.indexOf(e)>-1){n=!0;break}if(y.var.push(e),this.inModule&&y.flags&Tt&&delete this.undefinedExports[e],y.flags&xr)break}n&&this.raiseRecoverable(i,"Identifier '"+e+"' has already been declared")};vt.checkLocalExport=function(e){this.scopeStack[0].lexical.indexOf(e.name)===-1&&this.scopeStack[0].var.indexOf(e.name)===-1&&(this.undefinedExports[e.name]=e)};vt.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]};vt.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(xr|Ei|Lt))return t}};vt.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(t.flags&(xr|Ei|Lt)&&!(t.flags&Fn))return t}};var vr=function(t,i,n){this.type="",this.start=i,this.end=0,t.options.locations&&(this.loc=new gr(t,n)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[i,0])},Ai=ce.prototype;Ai.startNode=function(){return new vr(this,this.start,this.startLoc)};Ai.startNodeAt=function(e,t){return new vr(this,e,t)};function Fc(e,t,i,n){return e.type=t,e.end=i,this.options.locations&&(e.loc.end=n),this.options.ranges&&(e.range[1]=i),e}Ai.finishNode=function(e,t){return Fc.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)};Ai.finishNodeAt=function(e,t,i,n){return Fc.call(this,e,t,i,n)};Ai.copyNode=function(e){var t=new vr(this,e.start,this.startLoc);for(var i in e)t[i]=e[i];return t};var Hf="Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz",Mc="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",Oc=Mc+" Extended_Pictographic",Dc=Oc,Vc=Dc+" EBase EComp EMod EPres ExtPict",Bc=Vc,zf=Bc,Wf={9:Mc,10:Oc,11:Dc,12:Vc,13:Bc,14:zf},Gf="Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",qf={9:"",10:"",11:"",12:"",13:"",14:Gf},bc="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",jc="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",Uc=jc+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",Hc=Uc+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",zc=Hc+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",Wc=zc+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",Kf=Wc+" "+Hf,Yf={9:jc,10:Uc,11:Hc,12:zc,13:Wc,14:Kf},Gc={};function Qf(e){var t=Gc[e]={binary:xt(Wf[e]+" "+bc),binaryOfStrings:xt(qf[e]),nonBinary:{General_Category:xt(bc),Script:xt(Yf[e])}};t.nonBinary.Script_Extensions=t.nonBinary.Script,t.nonBinary.gc=t.nonBinary.General_Category,t.nonBinary.sc=t.nonBinary.Script,t.nonBinary.scx=t.nonBinary.Script_Extensions}for(pr=0,_n=[9,10,11,12,13,14];pr<_n.length;pr+=1)xc=_n[pr],Qf(xc);var xc,pr,_n,$=ce.prototype,mr=function(t,i){this.parent=t,this.base=i||this};mr.prototype.separatedFrom=function(t){for(var i=this;i;i=i.parent)for(var n=t;n;n=n.parent)if(i.base===n.base&&i!==n)return!0;return!1};mr.prototype.sibling=function(){return new mr(this.parent,this.base)};var tt=function(t){this.parser=t,this.validFlags="gim"+(t.options.ecmaVersion>=6?"uy":"")+(t.options.ecmaVersion>=9?"s":"")+(t.options.ecmaVersion>=13?"d":"")+(t.options.ecmaVersion>=15?"v":""),this.unicodeProperties=Gc[t.options.ecmaVersion>=14?14:t.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchV=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=Object.create(null),this.backReferenceNames=[],this.branchID=null};tt.prototype.reset=function(t,i,n){var c=n.indexOf("v")!==-1,h=n.indexOf("u")!==-1;this.start=t|0,this.source=i+"",this.flags=n,c&&this.parser.options.ecmaVersion>=15?(this.switchU=!0,this.switchV=!0,this.switchN=!0):(this.switchU=h&&this.parser.options.ecmaVersion>=6,this.switchV=!1,this.switchN=h&&this.parser.options.ecmaVersion>=9)};tt.prototype.raise=function(t){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+t)};tt.prototype.at=function(t,i){i===void 0&&(i=!1);var n=this.source,c=n.length;if(t>=c)return-1;var h=n.charCodeAt(t);if(!(i||this.switchU)||h<=55295||h>=57344||t+1>=c)return h;var f=n.charCodeAt(t+1);return f>=56320&&f<=57343?(h<<10)+f-56613888:h};tt.prototype.nextIndex=function(t,i){i===void 0&&(i=!1);var n=this.source,c=n.length;if(t>=c)return c;var h=n.charCodeAt(t),f;return!(i||this.switchU)||h<=55295||h>=57344||t+1>=c||(f=n.charCodeAt(t+1))<56320||f>57343?t+1:t+2};tt.prototype.current=function(t){return t===void 0&&(t=!1),this.at(this.pos,t)};tt.prototype.lookahead=function(t){return t===void 0&&(t=!1),this.at(this.nextIndex(this.pos,t),t)};tt.prototype.advance=function(t){t===void 0&&(t=!1),this.pos=this.nextIndex(this.pos,t)};tt.prototype.eat=function(t,i){return i===void 0&&(i=!1),this.current(i)===t?(this.advance(i),!0):!1};tt.prototype.eatChars=function(t,i){i===void 0&&(i=!1);for(var n=this.pos,c=0,h=t;c<h.length;c+=1){var f=h[c],g=this.at(n,i);if(g===-1||g!==f)return!1;n=this.nextIndex(n,i)}return this.pos=n,!0};$.validateRegExpFlags=function(e){for(var t=e.validFlags,i=e.flags,n=!1,c=!1,h=0;h<i.length;h++){var f=i.charAt(h);t.indexOf(f)===-1&&this.raise(e.start,"Invalid regular expression flag"),i.indexOf(f,h+1)>-1&&this.raise(e.start,"Duplicate regular expression flag"),f==="u"&&(n=!0),f==="v"&&(c=!0)}this.options.ecmaVersion>=15&&n&&c&&this.raise(e.start,"Invalid regular expression flag")};function Zf(e){for(var t in e)return!0;return!1}$.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&this.options.ecmaVersion>=9&&Zf(e.groupNames)&&(e.switchN=!0,this.regexp_pattern(e))};$.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames=Object.create(null),e.backReferenceNames.length=0,e.branchID=null,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),(e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets")),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,i=e.backReferenceNames;t<i.length;t+=1){var n=i[t];e.groupNames[n]||e.raise("Invalid named capture referenced")}};$.regexp_disjunction=function(e){var t=this.options.ecmaVersion>=16;for(t&&(e.branchID=new mr(e.branchID,null)),this.regexp_alternative(e);e.eat(124);)t&&(e.branchID=e.branchID.sibling()),this.regexp_alternative(e);t&&(e.branchID=e.branchID.parent),this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")};$.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););};$.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):(e.switchU?this.regexp_eatAtom(e):this.regexp_eatExtendedAtom(e))?(this.regexp_eatQuantifier(e),!0):!1};$.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var i=!1;if(this.options.ecmaVersion>=9&&(i=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!i,!0}return e.pos=t,!1};$.regexp_eatQuantifier=function(e,t){return t===void 0&&(t=!1),this.regexp_eatQuantifierPrefix(e,t)?(e.eat(63),!0):!1};$.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)};$.regexp_eatBracedQuantifier=function(e,t){var i=e.pos;if(e.eat(123)){var n=0,c=-1;if(this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(c=e.lastIntValue),e.eat(125)))return c!==-1&&c<n&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=i}return!1};$.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)};$.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1};$.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)){if(this.options.ecmaVersion>=16){var i=this.regexp_eatModifiers(e),n=e.eat(45);if(i||n){for(var c=0;c<i.length;c++){var h=i.charAt(c);i.indexOf(h,c+1)>-1&&e.raise("Duplicate regular expression modifiers")}if(n){var f=this.regexp_eatModifiers(e);!i&&!f&&e.current()===58&&e.raise("Invalid regular expression modifiers");for(var g=0;g<f.length;g++){var y=f.charAt(g);(f.indexOf(y,g+1)>-1||i.indexOf(y)>-1)&&e.raise("Duplicate regular expression modifiers")}}}}if(e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}}e.pos=t}return!1};$.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(this.options.ecmaVersion>=9?this.regexp_groupSpecifier(e):e.current()===63&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1};$.regexp_eatModifiers=function(e){for(var t="",i=0;(i=e.current())!==-1&&Jf(i);)t+=ut(i),e.advance();return t};function Jf(e){return e===105||e===109||e===115}$.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)};$.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1};$.regexp_eatSyntaxCharacter=function(e){var t=e.current();return qc(t)?(e.lastIntValue=t,e.advance(),!0):!1};function qc(e){return e===36||e>=40&&e<=43||e===46||e===63||e>=91&&e<=94||e>=123&&e<=125}$.regexp_eatPatternCharacters=function(e){for(var t=e.pos,i=0;(i=e.current())!==-1&&!qc(i);)e.advance();return e.pos!==t};$.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return t!==-1&&t!==36&&!(t>=40&&t<=43)&&t!==46&&t!==63&&t!==91&&t!==94&&t!==124?(e.advance(),!0):!1};$.regexp_groupSpecifier=function(e){if(e.eat(63)){this.regexp_eatGroupName(e)||e.raise("Invalid group");var t=this.options.ecmaVersion>=16,i=e.groupNames[e.lastStringValue];if(i)if(t)for(var n=0,c=i;n<c.length;n+=1){var h=c[n];h.separatedFrom(e.branchID)||e.raise("Duplicate capture group name")}else e.raise("Duplicate capture group name");t?(i||(e.groupNames[e.lastStringValue]=[])).push(e.branchID):e.groupNames[e.lastStringValue]=!0}};$.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1};$.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=ut(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=ut(e.lastIntValue);return!0}return!1};$.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),Xf(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function Xf(e){return et(e,!0)||e===36||e===95}$.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,i=this.options.ecmaVersion>=11,n=e.current(i);return e.advance(i),n===92&&this.regexp_eatRegExpUnicodeEscapeSequence(e,i)&&(n=e.lastIntValue),em(n)?(e.lastIntValue=n,!0):(e.pos=t,!1)};function em(e){return yt(e,!0)||e===36||e===95||e===8204||e===8205}$.regexp_eatAtomEscape=function(e){return this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e)?!0:(e.switchU&&(e.current()===99&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)};$.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var i=e.lastIntValue;if(e.switchU)return i>e.maxBackReference&&(e.maxBackReference=i),!0;if(i<=e.numCapturingParens)return!0;e.pos=t}return!1};$.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1};$.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)};$.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1};$.regexp_eatZero=function(e){return e.current()===48&&!kr(e.lookahead())?(e.lastIntValue=0,e.advance(),!0):!1};$.regexp_eatControlEscape=function(e){var t=e.current();return t===116?(e.lastIntValue=9,e.advance(),!0):t===110?(e.lastIntValue=10,e.advance(),!0):t===118?(e.lastIntValue=11,e.advance(),!0):t===102?(e.lastIntValue=12,e.advance(),!0):t===114?(e.lastIntValue=13,e.advance(),!0):!1};$.regexp_eatControlLetter=function(e){var t=e.current();return Kc(t)?(e.lastIntValue=t%32,e.advance(),!0):!1};function Kc(e){return e>=65&&e<=90||e>=97&&e<=122}$.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){t===void 0&&(t=!1);var i=e.pos,n=t||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var c=e.lastIntValue;if(n&&c>=55296&&c<=56319){var h=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var f=e.lastIntValue;if(f>=56320&&f<=57343)return e.lastIntValue=(c-55296)*1024+(f-56320)+65536,!0}e.pos=h,e.lastIntValue=c}return!0}if(n&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&tm(e.lastIntValue))return!0;n&&e.raise("Invalid unicode escape"),e.pos=i}return!1};function tm(e){return e>=0&&e<=1114111}$.regexp_eatIdentityEscape=function(e){if(e.switchU)return this.regexp_eatSyntaxCharacter(e)?!0:e.eat(47)?(e.lastIntValue=47,!0):!1;var t=e.current();return t!==99&&(!e.switchN||t!==107)?(e.lastIntValue=t,e.advance(),!0):!1};$.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(t>=49&&t<=57){do e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();while((t=e.current())>=48&&t<=57);return!0}return!1};var Yc=0,pt=1,De=2;$.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(im(t))return e.lastIntValue=-1,e.advance(),pt;var i=!1;if(e.switchU&&this.options.ecmaVersion>=9&&((i=t===80)||t===112)){e.lastIntValue=-1,e.advance();var n;if(e.eat(123)&&(n=this.regexp_eatUnicodePropertyValueExpression(e))&&e.eat(125))return i&&n===De&&e.raise("Invalid property name"),n;e.raise("Invalid property name")}return Yc};function im(e){return e===100||e===68||e===115||e===83||e===119||e===87}$.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e)){var n=e.lastStringValue;return this.regexp_validateUnicodePropertyNameAndValue(e,i,n),pt}}if(e.pos=t,this.regexp_eatLoneUnicodePropertyNameOrValue(e)){var c=e.lastStringValue;return this.regexp_validateUnicodePropertyNameOrValue(e,c)}return Yc};$.regexp_validateUnicodePropertyNameAndValue=function(e,t,i){Kt(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(i)||e.raise("Invalid property value")};$.regexp_validateUnicodePropertyNameOrValue=function(e,t){if(e.unicodeProperties.binary.test(t))return pt;if(e.switchV&&e.unicodeProperties.binaryOfStrings.test(t))return De;e.raise("Invalid property name")};$.regexp_eatUnicodePropertyName=function(e){var t=0;for(e.lastStringValue="";Qc(t=e.current());)e.lastStringValue+=ut(t),e.advance();return e.lastStringValue!==""};function Qc(e){return Kc(e)||e===95}$.regexp_eatUnicodePropertyValue=function(e){var t=0;for(e.lastStringValue="";rm(t=e.current());)e.lastStringValue+=ut(t),e.advance();return e.lastStringValue!==""};function rm(e){return Qc(e)||kr(e)}$.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)};$.regexp_eatCharacterClass=function(e){if(e.eat(91)){var t=e.eat(94),i=this.regexp_classContents(e);return e.eat(93)||e.raise("Unterminated character class"),t&&i===De&&e.raise("Negated character class may contain strings"),!0}return!1};$.regexp_classContents=function(e){return e.current()===93?pt:e.switchV?this.regexp_classSetExpression(e):(this.regexp_nonEmptyClassRanges(e),pt)};$.regexp_nonEmptyClassRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassAtom(e)){var i=e.lastIntValue;e.switchU&&(t===-1||i===-1)&&e.raise("Invalid character class"),t!==-1&&i!==-1&&t>i&&e.raise("Range out of order in character class")}}};$.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;if(e.switchU){var i=e.current();(i===99||Xc(i))&&e.raise("Invalid class escape"),e.raise("Invalid escape")}e.pos=t}var n=e.current();return n!==93?(e.lastIntValue=n,e.advance(),!0):!1};$.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)};$.regexp_classSetExpression=function(e){var t=pt,i;if(!this.regexp_eatClassSetRange(e))if(i=this.regexp_eatClassSetOperand(e)){i===De&&(t=De);for(var n=e.pos;e.eatChars([38,38]);){if(e.current()!==38&&(i=this.regexp_eatClassSetOperand(e))){i!==De&&(t=pt);continue}e.raise("Invalid character in character class")}if(n!==e.pos)return t;for(;e.eatChars([45,45]);)this.regexp_eatClassSetOperand(e)||e.raise("Invalid character in character class");if(n!==e.pos)return t}else e.raise("Invalid character in character class");for(;;)if(!this.regexp_eatClassSetRange(e)){if(i=this.regexp_eatClassSetOperand(e),!i)return t;i===De&&(t=De)}};$.regexp_eatClassSetRange=function(e){var t=e.pos;if(this.regexp_eatClassSetCharacter(e)){var i=e.lastIntValue;if(e.eat(45)&&this.regexp_eatClassSetCharacter(e)){var n=e.lastIntValue;return i!==-1&&n!==-1&&i>n&&e.raise("Range out of order in character class"),!0}e.pos=t}return!1};$.regexp_eatClassSetOperand=function(e){return this.regexp_eatClassSetCharacter(e)?pt:this.regexp_eatClassStringDisjunction(e)||this.regexp_eatNestedClass(e)};$.regexp_eatNestedClass=function(e){var t=e.pos;if(e.eat(91)){var i=e.eat(94),n=this.regexp_classContents(e);if(e.eat(93))return i&&n===De&&e.raise("Negated character class may contain strings"),n;e.pos=t}if(e.eat(92)){var c=this.regexp_eatCharacterClassEscape(e);if(c)return c;e.pos=t}return null};$.regexp_eatClassStringDisjunction=function(e){var t=e.pos;if(e.eatChars([92,113])){if(e.eat(123)){var i=this.regexp_classStringDisjunctionContents(e);if(e.eat(125))return i}else e.raise("Invalid escape");e.pos=t}return null};$.regexp_classStringDisjunctionContents=function(e){for(var t=this.regexp_classString(e);e.eat(124);)this.regexp_classString(e)===De&&(t=De);return t};$.regexp_classString=function(e){for(var t=0;this.regexp_eatClassSetCharacter(e);)t++;return t===1?pt:De};$.regexp_eatClassSetCharacter=function(e){var t=e.pos;if(e.eat(92))return this.regexp_eatCharacterEscape(e)||this.regexp_eatClassSetReservedPunctuator(e)?!0:e.eat(98)?(e.lastIntValue=8,!0):(e.pos=t,!1);var i=e.current();return i<0||i===e.lookahead()&&nm(i)||am(i)?!1:(e.advance(),e.lastIntValue=i,!0)};function nm(e){return e===33||e>=35&&e<=38||e>=42&&e<=44||e===46||e>=58&&e<=64||e===94||e===96||e===126}function am(e){return e===40||e===41||e===45||e===47||e>=91&&e<=93||e>=123&&e<=125}$.regexp_eatClassSetReservedPunctuator=function(e){var t=e.current();return sm(t)?(e.lastIntValue=t,e.advance(),!0):!1};function sm(e){return e===33||e===35||e===37||e===38||e===44||e===45||e>=58&&e<=62||e===64||e===96||e===126}$.regexp_eatClassControlLetter=function(e){var t=e.current();return kr(t)||t===95?(e.lastIntValue=t%32,e.advance(),!0):!1};$.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1};$.regexp_eatDecimalDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;kr(i=e.current());)e.lastIntValue=10*e.lastIntValue+(i-48),e.advance();return e.pos!==t};function kr(e){return e>=48&&e<=57}$.regexp_eatHexDigits=function(e){var t=e.pos,i=0;for(e.lastIntValue=0;Zc(i=e.current());)e.lastIntValue=16*e.lastIntValue+Jc(i),e.advance();return e.pos!==t};function Zc(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function Jc(e){return e>=65&&e<=70?10+(e-65):e>=97&&e<=102?10+(e-97):e-48}$.regexp_eatLegacyOctalEscapeSequence=function(e){if(this.regexp_eatOctalDigit(e)){var t=e.lastIntValue;if(this.regexp_eatOctalDigit(e)){var i=e.lastIntValue;t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=t*64+i*8+e.lastIntValue:e.lastIntValue=t*8+i}else e.lastIntValue=t;return!0}return!1};$.regexp_eatOctalDigit=function(e){var t=e.current();return Xc(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)};function Xc(e){return e>=48&&e<=55}$.regexp_eatFixedHexDigits=function(e,t){var i=e.pos;e.lastIntValue=0;for(var n=0;n<t;++n){var c=e.current();if(!Zc(c))return e.pos=i,!1;e.lastIntValue=16*e.lastIntValue+Jc(c),e.advance()}return!0};var Vn=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new gr(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},U=ce.prototype;U.next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new Vn(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()};U.getToken=function(){return this.next(),new Vn(this)};typeof Symbol<"u"&&(U[Symbol.iterator]=function(){var e=this;return{next:function(){var t=e.getToken();return{done:t.type===m.eof,value:t}}}});U.nextToken=function(){var e=this.curContext();if((!e||!e.preserveSpace)&&this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length)return this.finishToken(m.eof);if(e.override)return e.override(this);this.readToken(this.fullCharCodeAtPos())};U.readToken=function(e){return et(e,this.options.ecmaVersion>=6)||e===92?this.readWord():this.getTokenFromCode(e)};U.fullCharCodeAt=function(e){var t=this.input.charCodeAt(e);if(t<=55295||t>=56320)return t;var i=this.input.charCodeAt(e+1);return i<=56319||i>=57344?t:(t<<10)+i-56613888};U.fullCharCodeAtPos=function(){return this.fullCharCodeAt(this.pos)};U.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations)for(var n=void 0,c=t;(n=Sc(this.input,c,this.pos))>-1;)++this.curLine,c=this.lineStart=n;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,i),t,this.pos,e,this.curPosition())};U.skipLineComment=function(e){for(var t=this.pos,i=this.options.onComment&&this.curPosition(),n=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!qt(n);)n=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,i,this.curPosition())};U.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:this.input.charCodeAt(this.pos+1)===10&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(e>8&&e<14||e>=5760&&wc.test(String.fromCharCode(e)))++this.pos;else break e}}};U.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var i=this.type;this.type=e,this.value=t,this.updateContext(i)};U.readToken_dot=function(){var e=this.input.charCodeAt(this.pos+1);if(e>=48&&e<=57)return this.readNumber(!0);var t=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&e===46&&t===46?(this.pos+=3,this.finishToken(m.ellipsis)):(++this.pos,this.finishToken(m.dot))};U.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):e===61?this.finishOp(m.assign,2):this.finishOp(m.slash,1)};U.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),i=1,n=e===42?m.star:m.modulo;return this.options.ecmaVersion>=7&&e===42&&t===42&&(++i,n=m.starstar,t=this.input.charCodeAt(this.pos+2)),t===61?this.finishOp(m.assign,i+1):this.finishOp(n,i)};U.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t===e){if(this.options.ecmaVersion>=12){var i=this.input.charCodeAt(this.pos+2);if(i===61)return this.finishOp(m.assign,3)}return this.finishOp(e===124?m.logicalOR:m.logicalAND,2)}return t===61?this.finishOp(m.assign,2):this.finishOp(e===124?m.bitwiseOR:m.bitwiseAND,1)};U.readToken_caret=function(){var e=this.input.charCodeAt(this.pos+1);return e===61?this.finishOp(m.assign,2):this.finishOp(m.bitwiseXOR,1)};U.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?t===45&&!this.inModule&&this.input.charCodeAt(this.pos+2)===62&&(this.lastTokEnd===0||Ce.test(this.input.slice(this.lastTokEnd,this.pos)))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(m.incDec,2):t===61?this.finishOp(m.assign,2):this.finishOp(m.plusMin,1)};U.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),i=1;return t===e?(i=e===62&&this.input.charCodeAt(this.pos+2)===62?3:2,this.input.charCodeAt(this.pos+i)===61?this.finishOp(m.assign,i+1):this.finishOp(m.bitShift,i)):t===33&&e===60&&!this.inModule&&this.input.charCodeAt(this.pos+2)===45&&this.input.charCodeAt(this.pos+3)===45?(this.skipLineComment(4),this.skipSpace(),this.nextToken()):(t===61&&(i=2),this.finishOp(m.relational,i))};U.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return t===61?this.finishOp(m.equality,this.input.charCodeAt(this.pos+2)===61?3:2):e===61&&t===62&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(m.arrow)):this.finishOp(e===61?m.eq:m.prefix,1)};U.readToken_question=function(){var e=this.options.ecmaVersion;if(e>=11){var t=this.input.charCodeAt(this.pos+1);if(t===46){var i=this.input.charCodeAt(this.pos+2);if(i<48||i>57)return this.finishOp(m.questionDot,2)}if(t===63){if(e>=12){var n=this.input.charCodeAt(this.pos+2);if(n===61)return this.finishOp(m.assign,3)}return this.finishOp(m.coalesce,2)}}return this.finishOp(m.question,1)};U.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(e>=13&&(++this.pos,t=this.fullCharCodeAtPos(),et(t,!0)||t===92))return this.finishToken(m.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+ut(t)+"'")};U.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(m.parenL);case 41:return++this.pos,this.finishToken(m.parenR);case 59:return++this.pos,this.finishToken(m.semi);case 44:return++this.pos,this.finishToken(m.comma);case 91:return++this.pos,this.finishToken(m.bracketL);case 93:return++this.pos,this.finishToken(m.bracketR);case 123:return++this.pos,this.finishToken(m.braceL);case 125:return++this.pos,this.finishToken(m.braceR);case 58:return++this.pos,this.finishToken(m.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(m.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(t===120||t===88)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(t===111||t===79)return this.readRadixNumber(8);if(t===98||t===66)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(m.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+ut(e)+"'")};U.finishOp=function(e,t){var i=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,i)};U.readRegexp=function(){for(var e,t,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(Ce.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if(n==="[")t=!0;else if(n==="]"&&t)t=!1;else if(n==="/"&&!t)break;e=n==="\\"}++this.pos}var c=this.input.slice(i,this.pos);++this.pos;var h=this.pos,f=this.readWord1();this.containsEsc&&this.unexpected(h);var g=this.regexpState||(this.regexpState=new tt(this));g.reset(i,c,f),this.validateRegExpFlags(g),this.validateRegExpPattern(g);var y=null;try{y=new RegExp(c,f)}catch{}return this.finishToken(m.regexp,{pattern:c,flags:f,value:y})};U.readInt=function(e,t,i){for(var n=this.options.ecmaVersion>=12&&t===void 0,c=i&&this.input.charCodeAt(this.pos)===48,h=this.pos,f=0,g=0,y=0,b=t??1/0;y<b;++y,++this.pos){var v=this.input.charCodeAt(this.pos),w=void 0;if(n&&v===95){c&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),g===95&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),y===0&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),g=v;continue}if(v>=97?w=v-97+10:v>=65?w=v-65+10:v>=48&&v<=57?w=v-48:w=1/0,w>=e)break;g=v,f=f*e+w}return n&&g===95&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===h||t!=null&&this.pos-h!==t?null:f};function om(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function eu(e){return typeof BigInt!="function"?null:BigInt(e.replace(/_/g,""))}U.readRadixNumber=function(e){var t=this.pos;this.pos+=2;var i=this.readInt(e);return i==null&&this.raise(this.start+2,"Expected number in radix "+e),this.options.ecmaVersion>=11&&this.input.charCodeAt(this.pos)===110?(i=eu(this.input.slice(t,this.pos)),++this.pos):et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,i)};U.readNumber=function(e){var t=this.pos;!e&&this.readInt(10,void 0,!0)===null&&this.raise(t,"Invalid number");var i=this.pos-t>=2&&this.input.charCodeAt(t)===48;i&&this.strict&&this.raise(t,"Invalid number");var n=this.input.charCodeAt(this.pos);if(!i&&!e&&this.options.ecmaVersion>=11&&n===110){var c=eu(this.input.slice(t,this.pos));return++this.pos,et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(m.num,c)}i&&/[89]/.test(this.input.slice(t,this.pos))&&(i=!1),n===46&&!i&&(++this.pos,this.readInt(10),n=this.input.charCodeAt(this.pos)),(n===69||n===101)&&!i&&(n=this.input.charCodeAt(++this.pos),(n===43||n===45)&&++this.pos,this.readInt(10)===null&&this.raise(t,"Invalid number")),et(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var h=om(this.input.slice(t,this.pos),i);return this.finishToken(m.num,h)};U.readCodePoint=function(){var e=this.input.charCodeAt(this.pos),t;if(e===123){this.options.ecmaVersion<6&&this.unexpected();var i=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.invalidStringToken(i,"Code point out of bounds")}else t=this.readHexChar(4);return t};U.readString=function(e){for(var t="",i=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var n=this.input.charCodeAt(this.pos);if(n===e)break;n===92?(t+=this.input.slice(i,this.pos),t+=this.readEscapedChar(!1),i=this.pos):n===8232||n===8233?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(qt(n)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(i,this.pos++),this.finishToken(m.string,t)};var tu={};U.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e===tu)this.readInvalidTemplateToken();else throw e}this.inTemplateElement=!1};U.invalidStringToken=function(e,t){if(this.inTemplateElement&&this.options.ecmaVersion>=9)throw tu;this.raise(e,t)};U.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var i=this.input.charCodeAt(this.pos);if(i===96||i===36&&this.input.charCodeAt(this.pos+1)===123)return this.pos===this.start&&(this.type===m.template||this.type===m.invalidTemplate)?i===36?(this.pos+=2,this.finishToken(m.dollarBraceL)):(++this.pos,this.finishToken(m.backQuote)):(e+=this.input.slice(t,this.pos),this.finishToken(m.template,e));if(i===92)e+=this.input.slice(t,this.pos),e+=this.readEscapedChar(!0),t=this.pos;else if(qt(i)){switch(e+=this.input.slice(t,this.pos),++this.pos,i){case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:e+=`
`;break;default:e+=String.fromCharCode(i);break}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}};U.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if(this.input[this.pos+1]!=="{")break;case"`":return this.finishToken(m.invalidTemplate,this.input.slice(this.start,this.pos));case"\r":this.input[this.pos+1]===`
`&&++this.pos;case`
`:case"\u2028":case"\u2029":++this.curLine,this.lineStart=this.pos+1;break}this.raise(this.start,"Unterminated template")};U.readEscapedChar=function(e){var t=this.input.charCodeAt(++this.pos);switch(++this.pos,t){case 110:return`
`;case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return ut(this.readCodePoint());case 116:return"	";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:this.input.charCodeAt(this.pos)===10&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:if(this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e){var i=this.pos-1;this.invalidStringToken(i,"Invalid escape sequence in template string")}default:if(t>=48&&t<=55){var n=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],c=parseInt(n,8);return c>255&&(n=n.slice(0,-1),c=parseInt(n,8)),this.pos+=n.length-1,t=this.input.charCodeAt(this.pos),(n!=="0"||t===56||t===57)&&(this.strict||e)&&this.invalidStringToken(this.pos-1-n.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(c)}return qt(t)?(this.options.locations&&(this.lineStart=this.pos,++this.curLine),""):String.fromCharCode(t)}};U.readHexChar=function(e){var t=this.pos,i=this.readInt(16,e);return i===null&&this.invalidStringToken(t,"Bad character escape sequence"),i};U.readWord1=function(){this.containsEsc=!1;for(var e="",t=!0,i=this.pos,n=this.options.ecmaVersion>=6;this.pos<this.input.length;){var c=this.fullCharCodeAtPos();if(yt(c,n))this.pos+=c<=65535?1:2;else if(c===92){this.containsEsc=!0,e+=this.input.slice(i,this.pos);var h=this.pos;this.input.charCodeAt(++this.pos)!==117&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var f=this.readCodePoint();(t?et:yt)(f,n)||this.invalidStringToken(h,"Invalid Unicode escape"),e+=ut(f),i=this.pos}else break;t=!1}return e+this.input.slice(i,this.pos)};U.readWord=function(){var e=this.readWord1(),t=m.name;return this.keywords.test(e)&&(t=Nn[e]),this.finishToken(t,e)};var lm="8.18.0";ce.acorn={Parser:ce,version:lm,defaultOptions:In,Position:Ci,SourceLocation:gr,getLineInfo:Ec,Node:vr,TokenType:q,tokTypes:m,keywordTypes:Nn,TokContext:qe,tokContexts:te,isIdentifierChar:yt,isIdentifierStart:et,Token:Vn,isNewLine:qt,lineBreak:Ce,lineBreakG:$f,nonASCIIwhitespace:wc};function iu(e,t){return ce.parse(e,t)}var Qt=null,Ti=class e{static createItem(t){return{prev:null,next:null,data:t}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(t,i){let n;return Qt!==null?(n=Qt,Qt=Qt.cursor,n.prev=t,n.next=i,n.cursor=this.cursor):n={prev:t,next:i,cursor:this.cursor},this.cursor=n,n}releaseCursor(){let{cursor:t}=this;this.cursor=t.cursor,t.prev=null,t.next=null,t.cursor=Qt,Qt=t}updateCursors(t,i,n,c){let{cursor:h}=this;for(;h!==null;)h.prev===t&&(h.prev=i),h.next===n&&(h.next=c),h=h.cursor}*[Symbol.iterator](){for(let t=this.head;t!==null;t=t.next)yield t.data}get size(){let t=0;for(let i=this.head;i!==null;i=i.next)t++;return t}get isEmpty(){return this.head===null}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let i=null;this.head=null;for(let n of t){let c=e.createItem(n);i!==null?i.next=c:this.head=c,c.prev=i,i=c}return this.tail=i,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(t,i=this){let n=this.allocateCursor(null,this.head);for(;n.next!==null;){let c=n.next;n.next=c.next,t.call(i,c.data,c,this)}this.releaseCursor()}forEachRight(t,i=this){let n=this.allocateCursor(this.tail,null);for(;n.prev!==null;){let c=n.prev;n.prev=c.prev,t.call(i,c.data,c,this)}this.releaseCursor()}reduce(t,i,n=this){let c=this.allocateCursor(null,this.head),h=i,f;for(;c.next!==null;)f=c.next,c.next=f.next,h=t.call(n,h,f.data,f,this);return this.releaseCursor(),h}reduceRight(t,i,n=this){let c=this.allocateCursor(this.tail,null),h=i,f;for(;c.prev!==null;)f=c.prev,c.prev=f.prev,h=t.call(n,h,f.data,f,this);return this.releaseCursor(),h}some(t,i=this){for(let n=this.head;n!==null;n=n.next)if(t.call(i,n.data,n,this))return!0;return!1}map(t,i=this){let n=new e;for(let c=this.head;c!==null;c=c.next)n.appendData(t.call(i,c.data,c,this));return n}filter(t,i=this){let n=new e;for(let c=this.head;c!==null;c=c.next)t.call(i,c.data,c,this)&&n.appendData(c.data);return n}nextUntil(t,i,n=this){if(t===null)return;let c=this.allocateCursor(null,t);for(;c.next!==null;){let h=c.next;if(c.next=h.next,i.call(n,h.data,h,this))break}this.releaseCursor()}prevUntil(t,i,n=this){if(t===null)return;let c=this.allocateCursor(t,null);for(;c.prev!==null;){let h=c.prev;if(c.prev=h.prev,i.call(n,h.data,h,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){let t=new e;for(let i of this)t.appendData(i);return t}prepend(t){return this.updateCursors(null,t,this.head,t),this.head!==null?(this.head.prev=t,t.next=this.head):this.tail=t,this.head=t,this}prependData(t){return this.prepend(e.createItem(t))}append(t){return this.insert(t)}appendData(t){return this.insert(e.createItem(t))}insert(t,i=null){if(i!==null)if(this.updateCursors(i.prev,t,i,t),i.prev===null){if(this.head!==i)throw new Error("before doesn't belong to list");this.head=t,i.prev=t,t.next=i,this.updateCursors(null,t)}else i.prev.next=t,t.prev=i.prev,i.prev=t,t.next=i;else this.updateCursors(this.tail,t,null,t),this.tail!==null?(this.tail.next=t,t.prev=this.tail):this.head=t,this.tail=t;return this}insertData(t,i){return this.insert(e.createItem(t),i)}remove(t){if(this.updateCursors(t,t.prev,t,t.next),t.prev!==null)t.prev.next=t.next;else{if(this.head!==t)throw new Error("item doesn't belong to list");this.head=t.next}if(t.next!==null)t.next.prev=t.prev;else{if(this.tail!==t)throw new Error("item doesn't belong to list");this.tail=t.prev}return t.prev=null,t.next=null,t}push(t){this.insert(e.createItem(t))}pop(){return this.tail!==null?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return this.head!==null?this.remove(this.head):null}prependList(t){return this.insertList(t,this.head)}appendList(t){return this.insertList(t)}insertList(t,i){return t.head===null?this:(i!=null?(this.updateCursors(i.prev,t.tail,i,t.head),i.prev!==null?(i.prev.next=t.head,t.head.prev=i.prev):this.head=t.head,i.prev=t.tail,t.tail.next=i):(this.updateCursors(this.tail,t.tail,null,t.head),this.tail!==null?(this.tail.next=t.head,t.head.prev=this.tail):this.head=t.head,this.tail=t.tail),t.head=null,t.tail=null,this)}replace(t,i){"head"in i?this.insertList(i,t):this.insert(i,t),this.remove(t)}};function ru(e,t){let i=Object.create(SyntaxError.prototype),n=new Error;return Object.assign(i,{name:e,message:t,get stack(){return(n.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}
`)}})}var Bn=100,nu=60,au="    ";function su({source:e,line:t,column:i,baseLine:n,baseColumn:c},h){function f(I,z){return b.slice(I,z).map((ie,Y)=>String(I+Y+1).padStart(C)+" |"+ie).join(`
`)}let g=`
`.repeat(Math.max(n-1,0)),y=" ".repeat(Math.max(c-1,0)),b=(g+y+e).split(/\r\n?|\n|\f/),v=Math.max(1,t-h)-1,w=Math.min(t+h,b.length+1),C=Math.max(4,String(w).length)+1,u=0;i+=(au.length-1)*(b[t-1].substr(0,i-1).match(/\t/g)||[]).length,i>Bn&&(u=i-nu+3,i=nu-2);for(let I=v;I<=w;I++)I>=0&&I<b.length&&(b[I]=b[I].replace(/\t/g,au),b[I]=(u>0&&b[I].length>u?"\u2026":"")+b[I].substr(u,Bn-2)+(b[I].length>u+Bn-1?"\u2026":""));return[f(v,t),new Array(i+C+2).join("-")+"^",f(t,w)].filter(Boolean).join(`
`).replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function jn(e,t,i,n,c,h=1,f=1){return Object.assign(ru("SyntaxError",e),{source:t,offset:i,line:n,column:c,sourceFragment(y){return su({source:t,line:n,column:c,baseLine:h,baseColumn:f},isNaN(y)?0:y)},get formattedMessage(){return`Parse error: ${e}
`+su({source:t,line:n,column:c,baseLine:h,baseColumn:f},2)}})}function ye(e){return e>=48&&e<=57}function it(e){return ye(e)||e>=65&&e<=70||e>=97&&e<=102}function wr(e){return e>=65&&e<=90}function cm(e){return e>=97&&e<=122}function um(e){return wr(e)||cm(e)}function pm(e){return e>=128}function Sr(e){return um(e)||pm(e)||e===95}function Cr(e){return Sr(e)||ye(e)||e===45}function hm(e){return e>=0&&e<=8||e===11||e>=14&&e<=31||e===127}function _i(e){return e===10||e===13||e===12}function rt(e){return _i(e)||e===32||e===9}function Ee(e,t){return!(e!==92||_i(t)||t===0)}function Er(e,t,i){return e===45?Sr(t)||t===45||Ee(t,i):Sr(e)?!0:e===92?Ee(e,t):!1}function Ar(e,t,i){return e===43||e===45?ye(t)?2:t===46&&ye(i)?3:0:e===46?ye(t)?2:0:ye(e)?1:0}function Tr(e){return e===65279||e===65534?1:0}var Un=new Array(128),dm=128,Li=130,Hn=131,_r=132,zn=133;for(let e=0;e<Un.length;e++)Un[e]=rt(e)&&Li||ye(e)&&Hn||Sr(e)&&_r||hm(e)&&zn||e||dm;function Lr(e){return e<128?Un[e]:_r}function Zt(e,t){return t<e.length?e.charCodeAt(t):0}function Ir(e,t,i){return i===13&&Zt(e,t+1)===10?2:1}function Gn(e,t,i){let n=e.charCodeAt(t);return wr(n)&&(n=n|32),n===i}function It(e,t,i,n){if(i-t!==n.length||t<0||i>e.length)return!1;for(let c=t;c<i;c++){let h=n.charCodeAt(c-t),f=e.charCodeAt(c);if(wr(f)&&(f=f|32),f!==h)return!1}return!0}function ou(e,t){for(;t>=0&&rt(e.charCodeAt(t));t--);return t+1}function Ii(e,t){for(;t<e.length&&rt(e.charCodeAt(t));t++);return t}function Wn(e,t){for(;t<e.length&&ye(e.charCodeAt(t));t++);return t}function dt(e,t){if(t+=2,it(Zt(e,t-1))){for(let n=Math.min(e.length,t+5);t<n&&it(Zt(e,t));t++);let i=Zt(e,t);rt(i)&&(t+=Ir(e,t,i))}return t}function $i(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(!Cr(i)){if(Ee(i,Zt(e,t+1))){t=dt(e,t)-1;continue}break}}return t}function $r(e,t){let i=e.charCodeAt(t);if((i===43||i===45)&&(i=e.charCodeAt(t+=1)),ye(i)&&(t=Wn(e,t+1),i=e.charCodeAt(t)),i===46&&ye(e.charCodeAt(t+1))&&(t+=2,t=Wn(e,t)),Gn(e,t,101)){let n=0;i=e.charCodeAt(t+1),(i===45||i===43)&&(n=1,i=e.charCodeAt(t+2)),ye(i)&&(t=Wn(e,t+1+n+1))}return t}function Pr(e,t){for(;t<e.length;t++){let i=e.charCodeAt(t);if(i===41){t++;break}Ee(i,Zt(e,t+1))&&(t=dt(e,t))}return t}function Nr(e){if(e.length===1&&!it(e.charCodeAt(0)))return e[0];let t=parseInt(e,16);return(t===0||t>=55296&&t<=57343||t>1114111)&&(t=65533),String.fromCodePoint(t)}var Jt=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"];function Xt(e=null,t){return e===null||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}var lu=10,fm=12,cu=13;function uu(e){let t=e.source,i=t.length,n=t.length>0?Tr(t.charCodeAt(0)):0,c=Xt(e.lines,i),h=Xt(e.columns,i),f=e.startLine,g=e.startColumn;for(let y=n;y<i;y++){let b=t.charCodeAt(y);c[y]=f,h[y]=g++,(b===lu||b===cu||b===fm)&&(b===cu&&y+1<i&&t.charCodeAt(y+1)===lu&&(y++,c[y]=f,h[y]=g),f++,g=1)}c[i]=f,h[i]=g,e.lines=c,e.columns=h,e.computed=!0}var Rr=class{constructor(t,i,n,c){this.setSource(t,i,n,c),this.lines=null,this.columns=null}setSource(t="",i=0,n=1,c=1){this.source=t,this.startOffset=i,this.startLine=n,this.startColumn=c,this.computed=!1}getLocation(t,i){return this.computed||uu(this),{source:i,offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}getLocationRange(t,i,n){return this.computed||uu(this),{source:n,start:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]},end:{offset:this.startOffset+i,line:this.lines[i],column:this.columns[i]}}}};var Ke=16777215,Ye=24,Ni=1,Mr=2,kt=new Uint8Array(32);kt[2]=22;kt[21]=22;kt[19]=20;kt[23]=24;var Qe=new Uint8Array(32);Qe[2]=Ni;Qe[21]=Ni;Qe[19]=Ni;Qe[23]=Ni;Qe[22]=Mr;Qe[20]=Mr;Qe[24]=Mr;function pu(e,t,i){return e<t?t:e>i?i:e}var Fr=class{constructor(t,i){this.setSource(t,i)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(t="",i=()=>{}){t=String(t||"");let n=t.length,c=Xt(this.offsetAndType,t.length+1),h=Xt(this.balance,t.length+1),f=0,g=-1,y=0,b=t.length;this.offsetAndType=null,this.balance=null,h.fill(0),i(t,(v,w,C)=>{let u=f++;if(c[u]=v<<Ye|C,g===-1&&(g=w),h[u]=b,v===y){let I=h[b];h[b]=u,b=I,y=kt[c[I]>>Ye]}else this.isBlockOpenerTokenType(v)&&(b=u,y=kt[v])}),c[f]=0<<Ye|n,h[f]=f;for(let v=0;v<f;v++){let w=h[v];if(w<=v){let C=h[w];C!==v&&(h[v]=C)}else w>f&&(h[v]=f)}this.source=t,this.firstCharOffset=g===-1?0:g,this.tokenCount=f,this.offsetAndType=c,this.balance=h,this.reset(),this.next()}lookupType(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t]>>Ye:0}lookupTypeNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ye;if(n!==13&&n!==25&&t--===0)return n}return 0}lookupOffset(t){return t+=this.tokenIndex,t<this.tokenCount?this.offsetAndType[t-1]&Ke:this.source.length}lookupOffsetNonSC(t){for(let i=this.tokenIndex;i<this.tokenCount;i++){let n=this.offsetAndType[i]>>Ye;if(n!==13&&n!==25&&t--===0)return i-this.tokenIndex}return 0}lookupValue(t,i){return t+=this.tokenIndex,t<this.tokenCount?It(this.source,this.offsetAndType[t-1]&Ke,this.offsetAndType[t]&Ke,i):!1}getTokenStart(t){return t===this.tokenIndex?this.tokenStart:t>0?t<this.tokenCount?this.offsetAndType[t-1]&Ke:this.offsetAndType[this.tokenCount]&Ke:this.firstCharOffset}getTokenEnd(t){return t===this.tokenIndex?this.tokenEnd:this.offsetAndType[pu(t,0,this.tokenCount)]&Ke}getTokenType(t){return t===this.tokenIndex?this.tokenType:this.offsetAndType[pu(t,0,this.tokenCount)]>>Ye}substrToCursor(t){return this.source.substring(t,this.tokenStart)}isBlockOpenerTokenType(t){return Qe[t]===Ni}isBlockCloserTokenType(t){return Qe[t]===Mr}getBlockTokenPairIndex(t){let i=this.getTokenType(t);if(Qe[i]===1){let n=this.balance[t],c=this.getTokenType(n);return kt[i]===c?n:-1}else if(Qe[i]===2){let n=this.balance[t],c=this.getTokenType(n);return kt[c]===i?n:-1}return-1}isBalanceEdge(t){return this.balance[this.tokenIndex]<t}isDelim(t,i){return i?this.lookupType(i)===9&&this.source.charCodeAt(this.lookupOffset(i))===t:this.tokenType===9&&this.source.charCodeAt(this.tokenStart)===t}skip(t){let i=this.tokenIndex+t;i<this.tokenCount?(this.tokenIndex=i,this.tokenStart=this.offsetAndType[i-1]&Ke,i=this.offsetAndType[i],this.tokenType=i>>Ye,this.tokenEnd=i&Ke):(this.tokenIndex=this.tokenCount,this.next())}next(){let t=this.tokenIndex+1;t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.tokenEnd,t=this.offsetAndType[t],this.tokenType=t>>Ye,this.tokenEnd=t&Ke):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===13||this.tokenType===25;)this.next()}skipUntilBalanced(t,i){let n=t,c=0,h=0;e:for(;n<this.tokenCount;n++){if(c=this.balance[n],c<t)break e;switch(h=n>0?this.offsetAndType[n-1]&Ke:this.firstCharOffset,i(this.source.charCodeAt(h))){case 1:break e;case 2:n++;break e;default:this.isBlockOpenerTokenType(this.offsetAndType[n]>>Ye)&&(n=c)}}this.skip(n-this.tokenIndex)}forEachToken(t){for(let i=0,n=this.firstCharOffset;i<this.tokenCount;i++){let c=n,h=this.offsetAndType[i],f=h&Ke,g=h>>Ye;n=f,t(g,c,f,i)}}dump(){let t=new Array(this.tokenCount);return this.forEachToken((i,n,c,h)=>{t[h]={idx:h,type:Jt[i],chunk:this.source.substring(n,c),balance:this.balance[h]}}),t}};function Or(e,t){function i(w){return w<g?e.charCodeAt(w):0}function n(){if(b=$r(e,b),Er(i(b),i(b+1),i(b+2))){v=12,b=$i(e,b);return}if(i(b)===37){v=11,b++;return}v=10}function c(){let w=b;if(b=$i(e,b),It(e,w,b,"url")&&i(b)===40){if(b=Ii(e,b+1),i(b)===34||i(b)===39){v=2,b=w+4;return}f();return}if(i(b)===40){v=2,b++;return}v=1}function h(w){for(w||(w=i(b++)),v=5;b<e.length;b++){let C=e.charCodeAt(b);switch(Lr(C)){case w:b++;return;case Li:if(_i(C)){b+=Ir(e,b,C),v=6;return}break;case 92:if(b===e.length-1)break;let u=i(b+1);_i(u)?b+=Ir(e,b+1,u):Ee(C,u)&&(b=dt(e,b)-1);break}}}function f(){for(v=7,b=Ii(e,b);b<e.length;b++){let w=e.charCodeAt(b);switch(Lr(w)){case 41:b++;return;case Li:if(b=Ii(e,b),i(b)===41||b>=e.length){b<e.length&&b++;return}b=Pr(e,b),v=8;return;case 34:case 39:case 40:case zn:b=Pr(e,b),v=8;return;case 92:if(Ee(w,i(b+1))){b=dt(e,b)-1;break}b=Pr(e,b),v=8;return}}}e=String(e||"");let g=e.length,y=Tr(i(0)),b=y,v;for(;b<g;){let w=e.charCodeAt(b);switch(Lr(w)){case Li:v=13,b=Ii(e,b+1);break;case 34:h();break;case 35:Cr(i(b+1))||Ee(i(b+1),i(b+2))?(v=4,b=$i(e,b+1)):(v=9,b++);break;case 39:h();break;case 40:v=21,b++;break;case 41:v=22,b++;break;case 43:Ar(w,i(b+1),i(b+2))?n():(v=9,b++);break;case 44:v=18,b++;break;case 45:Ar(w,i(b+1),i(b+2))?n():i(b+1)===45&&i(b+2)===62?(v=15,b=b+3):Er(w,i(b+1),i(b+2))?c():(v=9,b++);break;case 46:Ar(w,i(b+1),i(b+2))?n():(v=9,b++);break;case 47:i(b+1)===42?(v=25,b=e.indexOf("*/",b+2),b=b===-1?e.length:b+2):(v=9,b++);break;case 58:v=16,b++;break;case 59:v=17,b++;break;case 60:i(b+1)===33&&i(b+2)===45&&i(b+3)===45?(v=14,b=b+4):(v=9,b++);break;case 64:Er(i(b+1),i(b+2),i(b+3))?(v=3,b=$i(e,b+1)):(v=9,b++);break;case 91:v=19,b++;break;case 92:Ee(w,i(b+1))?c():(v=9,b++);break;case 93:v=20,b++;break;case 123:v=23,b++;break;case 125:v=24,b++;break;case Hn:n();break;case _r:c();break;default:v=9,b++}t(v,y,y=b)}}function hu(e){let t=this.createList(),i=!1,n={recognizer:e};for(;!this.eof;){switch(this.tokenType){case 25:this.next();continue;case 13:i=!0,this.next();continue}let c=e.getNode.call(this,n);if(c===void 0)break;i&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,c,t,n),i=!1),t.push(c)}return i&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,n),t}var ii=()=>{},mm=33,gm=35,Kn=59,du=123,fu=0,bm={createList(){return[]},createSingleNodeList(e){return[e]},getFirstListNode(e){return e&&e[0]||null},getLastListNode(e){return e&&e.length>0?e[e.length-1]:null}},xm={createList(){return new Ti},createSingleNodeList(e){return new Ti().appendData(e)},getFirstListNode(e){return e&&e.first},getLastListNode(e){return e&&e.last}};function ym(e){return function(){return this[e]()}}function Yn(e){let t=Object.create(null);for(let i of Object.keys(e)){let n=e[i],c=n.parse||n;c&&(t[i]=c)}return t}function vm(e){let t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Yn(e.atrule),pseudo:Yn(e.pseudo),node:Yn(e.node)};for(let[i,n]of Object.entries(e.parseContext))switch(typeof n){case"function":t.context[i]=n;break;case"string":t.context[i]=ym(n);break}return{config:t,...t,...t.node}}function mu(e){let t="",i="<unknown>",n=!1,c=ii,h=!1,f=new Rr,g=Object.assign(new Fr,vm(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:hu,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket(v){return v===du?1:0},consumeUntilLeftCurlyBracketOrSemicolon(v){return v===du||v===Kn?1:0},consumeUntilExclamationMarkOrSemicolon(v){return v===mm||v===Kn?1:0},consumeUntilSemicolonIncluded(v){return v===Kn?2:0},createList:ii,createSingleNodeList:ii,getFirstListNode:ii,getLastListNode:ii,parseWithFallback(v,w){let C=this.tokenIndex;try{return v.call(this)}catch(u){if(h)throw u;this.skip(C-this.tokenIndex);let I=w.call(this);return h=!0,c(u,I),h=!1,I}},lookupNonWSType(v){let w;do if(w=this.lookupType(v++),w!==13&&w!==25)return w;while(w!==fu);return fu},charCodeAt(v){return v>=0&&v<t.length?t.charCodeAt(v):0},substring(v,w){return t.substring(v,w)},substrToCursor(v){return this.source.substring(v,this.tokenStart)},cmpChar(v,w){return Gn(t,v,w)},cmpStr(v,w,C){return It(t,v,w,C)},consume(v){let w=this.tokenStart;return this.eat(v),this.substrToCursor(w)},consumeFunctionName(){let v=t.substring(this.tokenStart,this.tokenEnd-1);return this.eat(2),v},consumeNumber(v){let w=t.substring(this.tokenStart,$r(t,this.tokenStart));return this.eat(v),w},eat(v){if(this.tokenType!==v){let w=Jt[v].slice(0,-6).replace(/-/g," ").replace(/^./,I=>I.toUpperCase()),C=`${/[[\](){}]/.test(w)?`"${w}"`:w} is expected`,u=this.tokenStart;switch(v){case 1:this.tokenType===2||this.tokenType===7?(u=this.tokenEnd-1,C="Identifier is expected but function found"):C="Identifier is expected";break;case 4:this.isDelim(gm)&&(this.next(),u++,C="Name is expected");break;case 11:this.tokenType===10&&(u=this.tokenEnd,C="Percent sign is expected");break}this.error(C,u)}this.next()},eatIdent(v){(this.tokenType!==1||this.lookupValue(0,v)===!1)&&this.error(`Identifier "${v}" is expected`),this.next()},eatDelim(v){this.isDelim(v)||this.error(`Delim "${String.fromCharCode(v)}" is expected`),this.next()},getLocation(v,w){return n?f.getLocationRange(v,w,i):null},getLocationFromList(v){if(n){let w=this.getFirstListNode(v),C=this.getLastListNode(v);return f.getLocationRange(w!==null?w.loc.start.offset-f.startOffset:this.tokenStart,C!==null?C.loc.end.offset-f.startOffset:this.tokenStart,i)}return null},error(v,w){let C=typeof w<"u"&&w<t.length?f.getLocation(w):this.eof?f.getLocation(ou(t,t.length-1)):f.getLocation(this.tokenStart);throw new jn(v||"Unexpected input",t,C.offset,C.line,C.column,f.startLine,f.startColumn)}}),y=()=>({filename:i,source:t,tokenCount:g.tokenCount,getTokenType:v=>g.getTokenType(v),getTokenTypeName:v=>Jt[g.getTokenType(v)],getTokenStart:v=>g.getTokenStart(v),getTokenEnd:v=>g.getTokenEnd(v),getTokenValue:v=>g.source.substring(g.getTokenStart(v),g.getTokenEnd(v)),substring:(v,w)=>g.source.substring(v,w),balance:g.balance.subarray(0,g.tokenCount+1),isBlockOpenerTokenType:g.isBlockOpenerTokenType,isBlockCloserTokenType:g.isBlockCloserTokenType,getBlockTokenPairIndex:v=>g.getBlockTokenPairIndex(v),getLocation:v=>f.getLocation(v,i),getRangeLocation:(v,w)=>f.getLocationRange(v,w,i)});return Object.assign(function(v,w){t=v,w=w||{},g.setSource(t,Or),f.setSource(t,w.offset,w.line,w.column),i=w.filename||"<unknown>",n=!!w.positions,c=typeof w.onParseError=="function"?w.onParseError:ii,h=!1,g.parseAtrulePrelude="parseAtrulePrelude"in w?!!w.parseAtrulePrelude:!0,g.parseRulePrelude="parseRulePrelude"in w?!!w.parseRulePrelude:!0,g.parseValue="parseValue"in w?!!w.parseValue:!0,g.parseCustomProperty="parseCustomProperty"in w?!!w.parseCustomProperty:!1;let{context:C="default",list:u=!0,onComment:I,onToken:z}=w;if(!(C in g.context))throw new Error("Unknown context `"+C+"`");Object.assign(g,u?xm:bm),Array.isArray(z)?g.forEachToken((Y,oe,X)=>{z.push({type:Y,start:oe,end:X})}):typeof z=="function"&&g.forEachToken(z.bind(y())),typeof I=="function"&&g.forEachToken((Y,oe,X)=>{if(Y===25){let Te=g.getLocation(oe,X),Je=It(t,X-2,X,"*/")?t.slice(oe+2,X-2):t.slice(oe+2,X);I(Je,Te)}});let ie=g.context[C].call(g,w);return g.eof||g.error(),ie},{SyntaxError:jn,config:g.config})}var Qn={};N(Qn,{AtrulePrelude:()=>bu,Selector:()=>yu,Value:()=>wu});var km=35,Sm=42,gu=43,wm=45,Cm=47,Em=117;function Ri(e){switch(this.tokenType){case 4:return this.Hash();case 18:return this.Operator();case 21:return this.Parentheses(this.readSequence,e.recognizer);case 19:return this.Brackets(this.readSequence,e.recognizer);case 5:return this.String();case 12:return this.Dimension();case 11:return this.Percentage();case 10:return this.Number();case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer);case 7:return this.Url();case 1:return this.cmpChar(this.tokenStart,Em)&&this.cmpChar(this.tokenStart+1,gu)?this.UnicodeRange():this.Identifier();case 9:{let t=this.charCodeAt(this.tokenStart);if(t===Cm||t===Sm||t===gu||t===wm)return this.Operator();t===km&&this.error("Hex or identifier is expected",this.tokenStart+1);break}}}var bu={getNode:Ri};var Am=35,Tm=38,_m=42,Lm=43,Im=47,xu=46,$m=62,Pm=124,Nm=126;function Rm(e,t){t.last!==null&&t.last.type!=="Combinator"&&e!==null&&e.type!=="Combinator"&&t.push({type:"Combinator",loc:null,name:" "})}function Fm(){switch(this.tokenType){case 19:return this.AttributeSelector();case 4:return this.IdSelector();case 16:return this.lookupType(1)===16?this.PseudoElementSelector():this.PseudoClassSelector();case 1:return this.TypeSelector();case 10:case 11:return this.Percentage();case 12:this.charCodeAt(this.tokenStart)===xu&&this.error("Identifier is expected",this.tokenStart+1);break;case 9:{switch(this.charCodeAt(this.tokenStart)){case Lm:case $m:case Nm:case Im:return this.Combinator();case xu:return this.ClassSelector();case _m:case Pm:return this.TypeSelector();case Am:return this.IdSelector();case Tm:return this.NestingSelector()}break}}}var yu={onWhiteSpace:Rm,getNode:Fm};function vu(){return this.createSingleNodeList(this.Raw(null,!1))}function ku(){let e=this.createList();if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===18){e.push(this.Operator());let t=this.tokenIndex,i=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1);if(i.type==="Value"&&i.children.isEmpty){for(let n=t-this.tokenIndex;n<=0;n++)if(this.lookupType(n)===13){i.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}e.push(i)}return e}function Su(e){return e!==null&&e.type==="Operator"&&(e.value[e.value.length-1]==="-"||e.value[e.value.length-1]==="+")}var wu={getNode:Ri,onWhiteSpace(e,t){Su(e)&&(e.value=" "+e.value),Su(t.last)&&(t.last.value+=" ")},expression:vu,var:ku};var Mm=new Set(["none","and","not","or"]),Cu={parse:{prelude(){let e=this.createList();if(this.tokenType===1){let t=this.substring(this.tokenStart,this.tokenEnd);Mm.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}};var Eu={parse:{prelude:null,block(){return this.Block(!0)}}};function Zn(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==22&&this.error()}},t||(()=>this.Raw(null,!0)))}var Au={layer(){this.skipSC();let e=this.createList(),t=Zn.call(this,this.Layer);return(t.type!=="Raw"||t.value!=="")&&e.push(t),e},supports(){this.skipSC();let e=this.createList(),t=Zn.call(this,this.Declaration,()=>Zn.call(this,()=>this.Condition("supports")));return(t.type!=="Raw"||t.value!=="")&&e.push(t),e}},Tu={parse:{prelude(){let e=this.createList();switch(this.tokenType){case 5:e.push(this.String());break;case 7:case 2:e.push(this.Url());break;default:this.error("String or url() is expected")}return this.skipSC(),this.tokenType===1&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Au)),this.skipSC(),this.tokenType===2&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Au)),(this.lookupNonWSType(0)===1||this.lookupNonWSType(0)===21)&&e.push(this.MediaQueryList()),e},block:null}};var _u={parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}};var Lu={parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}};var Iu={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var $u={parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}};var Pu={parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}};var Nu={parse:{prelude:null,block(e=!1){return this.Block(e)}}};var Ru={parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}};var Fu={container:Cu,"font-face":Eu,import:Tu,layer:_u,media:Lu,nest:Iu,page:$u,scope:Pu,"starting-style":Nu,supports:Ru};function Mu(){let e=this.createList();this.skipSC();e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier());break;case 5:e.push(this.String());break;case 18:e.push(this.Operator());break;case 22:break e;default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}var Pt={parse(){return this.createSingleNodeList(this.SelectorList())}},Jn={parse(){return this.createSingleNodeList(this.Selector())}},Om={parse(){return this.createSingleNodeList(this.Identifier())}},Dm={parse:Mu},Dr={parse(){return this.createSingleNodeList(this.Nth())}},Ou={dir:Om,has:Pt,lang:Dm,matches:Pt,is:Pt,"-moz-any":Pt,"-webkit-any":Pt,where:Pt,not:Pt,"nth-child":Dr,"nth-last-child":Dr,"nth-last-of-type":Dr,"nth-of-type":Dr,slotted:Jn,host:Jn,"host-context":Jn};var qo={};N(qo,{AnPlusB:()=>ea,Atrule:()=>ra,AtrulePrelude:()=>sa,AttributeSelector:()=>ua,Block:()=>da,Brackets:()=>ga,CDC:()=>ya,CDO:()=>Sa,ClassSelector:()=>Ea,Combinator:()=>_a,Comment:()=>$a,Condition:()=>Ra,Declaration:()=>Oa,DeclarationList:()=>ja,Dimension:()=>za,Feature:()=>qa,FeatureFunction:()=>Qa,FeatureRange:()=>es,Function:()=>rs,GeneralEnclosed:()=>ss,Hash:()=>cs,IdSelector:()=>ms,Identifier:()=>hs,Layer:()=>xs,LayerList:()=>ks,MediaQuery:()=>Cs,MediaQueryList:()=>Ts,NestingSelector:()=>Is,Nth:()=>Ns,Number:()=>Ms,Operator:()=>Vs,Parentheses:()=>Us,Percentage:()=>Ws,PseudoClassSelector:()=>Ks,PseudoElementSelector:()=>Zs,Ratio:()=>eo,Raw:()=>ro,Rule:()=>so,Scope:()=>co,Selector:()=>ho,SelectorList:()=>go,String:()=>vo,StyleSheet:()=>wo,SupportsDeclaration:()=>Ao,TypeSelector:()=>Io,UnicodeRange:()=>Ro,Url:()=>Do,Value:()=>jo,WhiteSpace:()=>zo});var ia={};N(ia,{generate:()=>ta,name:()=>Bm,parse:()=>ea,structure:()=>jm});var st=43,Ne=45,Vr=110,Nt=!0,Vm=!1;function Br(e,t){let i=this.tokenStart+e,n=this.charCodeAt(i);for((n===st||n===Ne)&&(t&&this.error("Number sign is not allowed"),i++);i<this.tokenEnd;i++)ye(this.charCodeAt(i))||this.error("Integer is expected",i)}function ri(e){return Br.call(this,0,e)}function wt(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let i="";switch(t){case Vr:i="N is expected";break;case Ne:i="HyphenMinus is expected";break}this.error(i,this.tokenStart+e)}}function Xn(){let e=0,t=0,i=this.tokenType;for(;i===13||i===25;)i=this.lookupType(++e);if(i!==10)if(this.isDelim(st,e)||this.isDelim(Ne,e)){t=this.isDelim(st,e)?st:Ne;do i=this.lookupType(++e);while(i===13||i===25);i!==10&&(this.skip(e),ri.call(this,Nt))}else return null;return e>0&&this.skip(e),t===0&&(i=this.charCodeAt(this.tokenStart),i!==st&&i!==Ne&&this.error("Number sign is expected")),ri.call(this,t!==0),t===Ne?"-"+this.consume(10):this.consume(10)}var Bm="AnPlusB",jm={a:[String,null],b:[String,null]};function ea(){let e=this.tokenStart,t=null,i=null;if(this.tokenType===10)ri.call(this,Vm),i=this.consume(10);else if(this.tokenType===1&&this.cmpChar(this.tokenStart,Ne))switch(t="-1",wt.call(this,1,Vr),this.tokenEnd-this.tokenStart){case 2:this.next(),i=Xn.call(this);break;case 3:wt.call(this,2,Ne),this.next(),this.skipSC(),ri.call(this,Nt),i="-"+this.consume(10);break;default:wt.call(this,2,Ne),Br.call(this,3,Nt),this.next(),i=this.substrToCursor(e+2)}else if(this.tokenType===1||this.isDelim(st)&&this.lookupType(1)===1){let n=0;switch(t="1",this.isDelim(st)&&(n=1,this.next()),wt.call(this,0,Vr),this.tokenEnd-this.tokenStart){case 1:this.next(),i=Xn.call(this);break;case 2:wt.call(this,1,Ne),this.next(),this.skipSC(),ri.call(this,Nt),i="-"+this.consume(10);break;default:wt.call(this,1,Ne),Br.call(this,2,Nt),this.next(),i=this.substrToCursor(e+n+1)}}else if(this.tokenType===12){let n=this.charCodeAt(this.tokenStart),c=n===st||n===Ne,h=this.tokenStart+c;for(;h<this.tokenEnd&&ye(this.charCodeAt(h));h++);h===this.tokenStart+c&&this.error("Integer is expected",this.tokenStart+c),wt.call(this,h-this.tokenStart,Vr),t=this.substring(e,h),h+1===this.tokenEnd?(this.next(),i=Xn.call(this)):(wt.call(this,h-this.tokenStart+1,Ne),h+2===this.tokenEnd?(this.next(),this.skipSC(),ri.call(this,Nt),i="-"+this.consume(10)):(Br.call(this,h-this.tokenStart+2,Nt),this.next(),i=this.substrToCursor(h+1)))}else this.error();return t!==null&&t.charCodeAt(0)===st&&(t=t.substr(1)),i!==null&&i.charCodeAt(0)===st&&(i=i.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:i}}function ta(e){if(e.a){let t=e.a==="+1"&&"n"||e.a==="1"&&"n"||e.a==="-1"&&"-n"||e.a+"n";if(e.b){let i=e.b[0]==="-"||e.b[0]==="+"?e.b:"+"+e.b;this.tokenize(t+i)}else this.tokenize(t)}else this.tokenize(e.b)}var aa={};N(aa,{generate:()=>na,name:()=>Hm,parse:()=>ra,structure:()=>Wm,walkContext:()=>zm});function Du(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Um(){for(let e=1,t;t=this.lookupType(e);e++){if(t===24)return!0;if(t===23||t===3)return!1}return!1}var Hm="Atrule",zm="atrule",Wm={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]};function ra(e=!1){let t=this.tokenStart,i,n,c=null,h=null;switch(this.eat(3),i=this.substrToCursor(t+1),n=i.toLowerCase(),this.skipSC(),this.eof===!1&&this.tokenType!==23&&this.tokenType!==17&&(this.parseAtrulePrelude?c=this.parseWithFallback(this.AtrulePrelude.bind(this,i,e),Du):c=Du.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case 17:this.next();break;case 23:hasOwnProperty.call(this.atrule,n)&&typeof this.atrule[n].block=="function"?h=this.atrule[n].block.call(this,e):h=this.Block(Um.call(this));break}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:i,prelude:c,block:h}}function na(e){this.token(3,"@"+e.name),e.prelude!==null&&this.node(e.prelude),e.block?this.node(e.block):this.token(17,";")}var la={};N(la,{generate:()=>oa,name:()=>Gm,parse:()=>sa,structure:()=>Km,walkContext:()=>qm});var Gm="AtrulePrelude",qm="atrulePrelude",Km={children:[[]]};function sa(e){let t=null;return e!==null&&(e=e.toLowerCase()),this.skipSC(),hasOwnProperty.call(this.atrule,e)&&typeof this.atrule[e].prelude=="function"?t=this.atrule[e].prelude.call(this):t=this.readSequence(this.scope.AtrulePrelude),this.skipSC(),this.eof!==!0&&this.tokenType!==23&&this.tokenType!==17&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}function oa(e){this.children(e)}var ha={};N(ha,{generate:()=>pa,name:()=>eg,parse:()=>ua,structure:()=>tg});var Ym=36,Vu=42,jr=61,Qm=94,ca=124,Zm=126;function Jm(){this.eof&&this.error("Unexpected end of input");let e=this.tokenStart,t=!1;return this.isDelim(Vu)?(t=!0,this.next()):this.isDelim(ca)||this.eat(1),this.isDelim(ca)?this.charCodeAt(this.tokenStart+1)!==jr?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Xm(){let e=this.tokenStart,t=this.charCodeAt(e);return t!==jr&&t!==Zm&&t!==Qm&&t!==Ym&&t!==Vu&&t!==ca&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),t!==jr&&(this.isDelim(jr)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}var eg="AttributeSelector",tg={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]};function ua(){let e=this.tokenStart,t,i=null,n=null,c=null;return this.eat(19),this.skipSC(),t=Jm.call(this),this.skipSC(),this.tokenType!==20&&(this.tokenType!==1&&(i=Xm.call(this),this.skipSC(),n=this.tokenType===5?this.String():this.Identifier(),this.skipSC()),this.tokenType===1&&(c=this.consume(1),this.skipSC())),this.eat(20),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:i,value:n,flags:c}}function pa(e){this.token(9,"["),this.node(e.name),e.matcher!==null&&(this.tokenize(e.matcher),this.node(e.value)),e.flags!==null&&this.token(1,e.flags),this.token(9,"]")}var ma={};N(ma,{generate:()=>fa,name:()=>ng,parse:()=>da,structure:()=>sg,walkContext:()=>ag});var ig=38;function Uu(){return this.Raw(null,!0)}function Bu(){return this.parseWithFallback(this.Rule,Uu)}function ju(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function rg(){if(this.tokenType===17)return ju.call(this,this.tokenIndex);let e=this.parseWithFallback(this.Declaration,ju);return this.tokenType===17&&this.next(),e}var ng="Block",ag="block",sg={children:[["Atrule","Rule","Declaration"]]};function da(e){let t=e?rg:Bu,i=this.tokenStart,n=this.createList();this.eat(23);e:for(;!this.eof;)switch(this.tokenType){case 24:break e;case 13:case 25:this.next();break;case 3:n.push(this.parseWithFallback(this.Atrule.bind(this,e),Uu));break;default:e&&this.isDelim(ig)?n.push(Bu.call(this)):n.push(t.call(this))}return this.eof||this.eat(24),{type:"Block",loc:this.getLocation(i,this.tokenStart),children:n}}function fa(e){this.token(23,"{"),this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")}),this.token(24,"}")}var xa={};N(xa,{generate:()=>ba,name:()=>og,parse:()=>ga,structure:()=>lg});var og="Brackets",lg={children:[[]]};function ga(e,t){let i=this.tokenStart,n=null;return this.eat(19),n=e.call(this,t),this.eof||this.eat(20),{type:"Brackets",loc:this.getLocation(i,this.tokenStart),children:n}}function ba(e){this.token(9,"["),this.children(e),this.token(9,"]")}var ka={};N(ka,{generate:()=>va,name:()=>cg,parse:()=>ya,structure:()=>ug});var cg="CDC",ug=[];function ya(){let e=this.tokenStart;return this.eat(15),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}function va(){this.token(15,"-->")}var Ca={};N(Ca,{generate:()=>wa,name:()=>pg,parse:()=>Sa,structure:()=>hg});var pg="CDO",hg=[];function Sa(){let e=this.tokenStart;return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}function wa(){this.token(14,"<!--")}var Ta={};N(Ta,{generate:()=>Aa,name:()=>fg,parse:()=>Ea,structure:()=>mg});var dg=46,fg="ClassSelector",mg={name:String};function Ea(){return this.eatDelim(dg),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}function Aa(e){this.token(9,"."),this.token(1,e.name)}var Ia={};N(Ia,{generate:()=>La,name:()=>yg,parse:()=>_a,structure:()=>vg});var gg=43,Hu=47,bg=62,xg=126,yg="Combinator",vg={name:String};function _a(){let e=this.tokenStart,t;switch(this.tokenType){case 13:t=" ";break;case 9:switch(this.charCodeAt(this.tokenStart)){case bg:case gg:case xg:this.next();break;case Hu:this.next(),this.eatIdent("deep"),this.eatDelim(Hu);break;default:this.error("Combinator is expected")}t=this.substrToCursor(e);break}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}function La(e){this.tokenize(e.name)}var Na={};N(Na,{generate:()=>Pa,name:()=>wg,parse:()=>$a,structure:()=>Cg});var kg=42,Sg=47,wg="Comment",Cg={value:String};function $a(){let e=this.tokenStart,t=this.tokenEnd;return this.eat(25),t-e+2>=2&&this.charCodeAt(t-2)===kg&&this.charCodeAt(t-1)===Sg&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}function Pa(e){this.token(25,"/*"+e.value+"*/")}var Ma={};N(Ma,{generate:()=>Fa,name:()=>Ag,parse:()=>Ra,structure:()=>Tg});var Eg=new Set([16,22,0]),Ag="Condition",Tg={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]};function zu(e){return this.lookupTypeNonSC(1)===1&&Eg.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}var _g={media:zu,container:zu,supports(){return this.SupportsDeclaration()}};function Ra(e="media"){let t=this.createList();e:for(;!this.eof;)switch(this.tokenType){case 25:case 13:this.next();continue;case 1:t.push(this.Identifier());break;case 21:{let i=this.parseWithFallback(()=>_g[e].call(this,e),()=>null);i||(i=this.parseWithFallback(()=>{this.eat(21);let n=this.Condition(e);return this.eat(22),n},()=>this.GeneralEnclosed(e))),t.push(i);break}case 2:{let i=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null);i||(i=this.GeneralEnclosed(e)),t.push(i);break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}function Fa(e){e.children.forEach(t=>{t.type==="Condition"?(this.token(21,"("),this.node(t),this.token(22,")")):this.node(t)})}var Va={};N(Va,{generate:()=>Da,name:()=>Og,parse:()=>Oa,structure:()=>Vg,walkContext:()=>Dg});var Wu=45;function Gu(e,t){return t=t||0,e.length-t>=2&&e.charCodeAt(t)===Wu&&e.charCodeAt(t+1)===Wu}var Ku=33,Lg=35,Ig=36,$g=38,Pg=42,Ng=43,qu=47;function Rg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Fg(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Mg(){let e=this.tokenIndex,t=this.Value();return t.type!=="Raw"&&this.eof===!1&&this.tokenType!==17&&this.isDelim(Ku)===!1&&this.isBalanceEdge(e)===!1&&this.error(),t}var Og="Declaration",Dg="declaration",Vg={important:[Boolean,String],property:String,value:["Value","Raw"]};function Oa(){let e=this.tokenStart,t=this.tokenIndex,i=Bg.call(this),n=Gu(i),c=n?this.parseCustomProperty:this.parseValue,h=n?Fg:Rg,f=!1,g;this.skipSC(),this.eat(16);let y=this.tokenIndex;if(n||this.skipSC(),c?g=this.parseWithFallback(Mg,h):g=h.call(this,this.tokenIndex),n&&g.type==="Value"&&g.children.isEmpty){for(let b=y-this.tokenIndex;b<=0;b++)if(this.lookupType(b)===13){g.children.appendData({type:"WhiteSpace",loc:null,value:" "});break}}return this.isDelim(Ku)&&(f=jg.call(this),this.skipSC()),this.eof===!1&&this.tokenType!==17&&this.isBalanceEdge(t)===!1&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:f,property:i,value:g}}function Da(e){this.token(1,e.property),this.token(16,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,e.important===!0?"important":e.important))}function Bg(){let e=this.tokenStart;if(this.tokenType===9)switch(this.charCodeAt(this.tokenStart)){case Pg:case Ig:case Ng:case Lg:case $g:this.next();break;case qu:this.next(),this.isDelim(qu)&&this.next();break}return this.tokenType===4?this.eat(4):this.eat(1),this.substrToCursor(e)}function jg(){this.eat(9),this.skipSC();let e=this.consume(1);return e==="important"?!0:e}var Ha={};N(Ha,{generate:()=>Ua,name:()=>Hg,parse:()=>ja,structure:()=>zg});var Ug=38;function Ba(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}var Hg="DeclarationList",zg={children:[["Declaration","Atrule","Rule"]]};function ja(){let e=this.createList();for(;!this.eof;)switch(this.tokenType){case 13:case 25:case 17:this.next();break;case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Ba));break;default:this.isDelim(Ug)?e.push(this.parseWithFallback(this.Rule,Ba)):e.push(this.parseWithFallback(this.Declaration,Ba))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}function Ua(e){this.children(e,t=>{t.type==="Declaration"&&this.token(17,";")})}var Ga={};N(Ga,{generate:()=>Wa,name:()=>Wg,parse:()=>za,structure:()=>Gg});var Wg="Dimension",Gg={value:String,unit:String};function za(){let e=this.tokenStart,t=this.consumeNumber(12);return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}function Wa(e){this.token(12,e.value+e.unit)}var Ya={};N(Ya,{generate:()=>Ka,name:()=>Kg,parse:()=>qa,structure:()=>Yg});var qg=47,Kg="Feature",Yg={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]};function qa(e){let t=this.tokenStart,i,n=null;if(this.eat(21),this.skipSC(),i=this.consume(1),this.skipSC(),this.tokenType!==22){switch(this.eat(16),this.skipSC(),this.tokenType){case 10:this.lookupNonWSType(1)===9?n=this.Ratio():n=this.Number();break;case 12:n=this.Dimension();break;case 1:n=this.Identifier();break;case 2:n=this.parseWithFallback(()=>{let c=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(qg)&&this.error(),c},()=>this.Ratio());break;default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(22),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:i,value:n}}function Ka(e){this.token(21,"("),this.token(1,e.name),e.value!==null&&(this.token(16,":"),this.node(e.value)),this.token(22,")")}var Ja={};N(Ja,{generate:()=>Za,name:()=>Qg,parse:()=>Qa,structure:()=>Zg});var Qg="FeatureFunction",Zg={kind:String,feature:String,value:["Declaration","Selector"]};function Jg(e,t){let n=(this.features[e]||{})[t];return typeof n!="function"&&this.error(`Unknown feature ${t}()`),n}function Qa(e="unknown"){let t=this.tokenStart,i=this.consumeFunctionName(),n=Jg.call(this,e,i.toLowerCase());this.skipSC();let c=this.parseWithFallback(()=>{let h=this.tokenIndex,f=n.call(this);return this.eof===!1&&this.isBalanceEdge(h)===!1&&this.error(),f},()=>this.Raw(null,!1));return this.eof||this.eat(22),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:i,value:c}}function Za(e){this.token(2,e.feature+"("),this.node(e.value),this.token(22,")")}var is={};N(is,{generate:()=>ts,name:()=>t0,parse:()=>es,structure:()=>i0});var Yu=47,Xg=60,Qu=61,e0=62,t0="FeatureRange",i0={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]};function Xa(){switch(this.skipSC(),this.tokenType){case 10:return this.isDelim(Yu,this.lookupOffsetNonSC(1))?this.Ratio():this.Number();case 12:return this.Dimension();case 1:return this.Identifier();case 2:return this.parseWithFallback(()=>{let e=this.Function(this.readSequence,this.scope.Value);return this.skipSC(),this.isDelim(Yu)&&this.error(),e},()=>this.Ratio());default:this.error("Number, dimension, ratio or identifier is expected")}}function Zu(e){if(this.skipSC(),this.isDelim(Xg)||this.isDelim(e0)){let t=this.source[this.tokenStart];return this.next(),this.isDelim(Qu)?(this.next(),t+"="):t}if(this.isDelim(Qu))return"=";this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function es(e="unknown"){let t=this.tokenStart;this.skipSC(),this.eat(21);let i=Xa.call(this),n=Zu.call(this,i.type==="Identifier"),c=Xa.call(this),h=null,f=null;return this.lookupNonWSType(0)!==22&&(h=Zu.call(this),f=Xa.call(this)),this.skipSC(),this.eat(22),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:i,leftComparison:n,middle:c,rightComparison:h,right:f}}function ts(e){this.token(21,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(22,")")}var as={};N(as,{generate:()=>ns,name:()=>r0,parse:()=>rs,structure:()=>a0,walkContext:()=>n0});var r0="Function",n0="function",a0={name:String,children:[[]]};function rs(e,t){let i=this.tokenStart,n=this.consumeFunctionName(),c=n.toLowerCase(),h;return h=t.hasOwnProperty(c)?t[c].call(this,t):e.call(this,t),this.eof||this.eat(22),{type:"Function",loc:this.getLocation(i,this.tokenStart),name:n,children:h}}function ns(e){this.token(2,e.name+"("),this.children(e),this.token(22,")")}var ls={};N(ls,{generate:()=>os,name:()=>s0,parse:()=>ss,structure:()=>o0});var s0="GeneralEnclosed",o0={kind:String,function:[String,null],children:[[]]};function ss(e){let t=this.tokenStart,i=null;this.tokenType===2?i=this.consumeFunctionName():this.eat(21);let n=this.parseWithFallback(()=>{let c=this.tokenIndex,h=this.readSequence(this.scope.Value);return this.eof===!1&&this.isBalanceEdge(c)===!1&&this.error(),h},()=>this.createSingleNodeList(this.Raw(null,!1)));return this.eof||this.eat(22),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:i,children:n}}function os(e){e.function?this.token(2,e.function+"("):this.token(21,"("),this.children(e),this.token(22,")")}var ps={};N(ps,{generate:()=>us,name:()=>c0,parse:()=>cs,structure:()=>u0,xxx:()=>l0});var l0="XXX",c0="Hash",u0={value:String};function cs(){let e=this.tokenStart;return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}function us(e){this.token(4,"#"+e.value)}var fs={};N(fs,{generate:()=>ds,name:()=>p0,parse:()=>hs,structure:()=>h0});var p0="Identifier",h0={name:String};function hs(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}function ds(e){this.token(1,e.name)}var bs={};N(bs,{generate:()=>gs,name:()=>d0,parse:()=>ms,structure:()=>f0});var d0="IdSelector",f0={name:String};function ms(){let e=this.tokenStart;return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}function gs(e){this.token(9,"#"+e.name)}var vs={};N(vs,{generate:()=>ys,name:()=>g0,parse:()=>xs,structure:()=>b0});var m0=46,g0="Layer",b0={name:String};function xs(){let e=this.tokenStart,t=this.consume(1);for(;this.isDelim(m0);)this.eat(9),t+="."+this.consume(1);return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}function ys(e){this.tokenize(e.name)}var ws={};N(ws,{generate:()=>Ss,name:()=>x0,parse:()=>ks,structure:()=>y0});var x0="LayerList",y0={children:[["Layer"]]};function ks(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===18);)this.skipSC(),this.next(),this.skipSC();return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}function Ss(e){this.children(e,()=>this.token(18,","))}var As={};N(As,{generate:()=>Es,name:()=>v0,parse:()=>Cs,structure:()=>k0});var v0="MediaQuery",k0={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]};function Cs(){let e=this.tokenStart,t=null,i=null,n=null;if(this.skipSC(),this.tokenType===1&&this.lookupTypeNonSC(1)!==21){let c=this.consume(1),h=c.toLowerCase();switch(h==="not"||h==="only"?(this.skipSC(),t=h,i=this.consume(1)):i=c,this.lookupTypeNonSC(0)){case 1:{this.skipSC(),this.eatIdent("and"),n=this.Condition("media");break}case 23:case 17:case 18:case 0:break;default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case 21:case 2:{n=this.Condition("media");break}case 23:case 17:case 0:break;default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:i,condition:n}}function Es(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)}var Ls={};N(Ls,{generate:()=>_s,name:()=>S0,parse:()=>Ts,structure:()=>w0});var S0="MediaQueryList",w0={children:[["MediaQuery"]]};function Ts(){let e=this.createList();for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===18);)this.next();return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}function _s(e){this.children(e,()=>this.token(18,","))}var Ps={};N(Ps,{generate:()=>$s,name:()=>E0,parse:()=>Is,structure:()=>A0});var C0=38,E0="NestingSelector",A0={};function Is(){let e=this.tokenStart;return this.eatDelim(C0),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}function $s(){this.token(9,"&")}var Fs={};N(Fs,{generate:()=>Rs,name:()=>T0,parse:()=>Ns,structure:()=>_0});var T0="Nth",_0={nth:["AnPlusB","Identifier"],selector:["SelectorList",null]};function Ns(){this.skipSC();let e=this.tokenStart,t=e,i=null,n;return this.lookupValue(0,"odd")||this.lookupValue(0,"even")?n=this.Identifier():n=this.AnPlusB(),t=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),i=this.SelectorList(),t=this.tokenStart),{type:"Nth",loc:this.getLocation(e,t),nth:n,selector:i}}function Rs(e){this.node(e.nth),e.selector!==null&&(this.token(1,"of"),this.node(e.selector))}var Ds={};N(Ds,{generate:()=>Os,name:()=>L0,parse:()=>Ms,structure:()=>I0});var L0="Number",I0={value:String};function Ms(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(10)}}function Os(e){this.token(10,e.value)}var js={};N(js,{generate:()=>Bs,name:()=>$0,parse:()=>Vs,structure:()=>P0});var $0="Operator",P0={value:String};function Vs(){let e=this.tokenStart;return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Bs(e){this.tokenize(e.value)}var zs={};N(zs,{generate:()=>Hs,name:()=>N0,parse:()=>Us,structure:()=>R0});var N0="Parentheses",R0={children:[[]]};function Us(e,t){let i=this.tokenStart,n=null;return this.eat(21),n=e.call(this,t),this.eof||this.eat(22),{type:"Parentheses",loc:this.getLocation(i,this.tokenStart),children:n}}function Hs(e){this.token(21,"("),this.children(e),this.token(22,")")}var qs={};N(qs,{generate:()=>Gs,name:()=>F0,parse:()=>Ws,structure:()=>M0});var F0="Percentage",M0={value:String};function Ws(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(11)}}function Gs(e){this.token(11,e.value+"%")}var Qs={};N(Qs,{generate:()=>Ys,name:()=>O0,parse:()=>Ks,structure:()=>V0,walkContext:()=>D0});var O0="PseudoClassSelector",D0="function",V0={name:String,children:[["Raw"],null]};function Ks(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Ys(e){this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var Xs={};N(Xs,{generate:()=>Js,name:()=>B0,parse:()=>Zs,structure:()=>U0,walkContext:()=>j0});var B0="PseudoElementSelector",j0="function",U0={name:String,children:[["Raw"],null]};function Zs(){let e=this.tokenStart,t=null,i,n;return this.eat(16),this.eat(16),this.tokenType===2?(i=this.consumeFunctionName(),n=i.toLowerCase(),this.lookupNonWSType(0)==22?t=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),t=this.pseudo[n].call(this),this.skipSC()):(t=this.createList(),t.push(this.Raw(null,!1))),this.eat(22)):i=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:i,children:t}}function Js(e){this.token(16,":"),this.token(16,":"),e.children===null?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(22,")"))}var io={};N(io,{generate:()=>to,name:()=>H0,parse:()=>eo,structure:()=>z0});var Ju=47;function Xu(){switch(this.skipSC(),this.tokenType){case 10:return this.Number();case 2:return this.Function(this.readSequence,this.scope.Value);default:this.error("Number of function is expected")}}var H0="Ratio",z0={left:["Number","Function"],right:["Number","Function",null]};function eo(){let e=this.tokenStart,t=Xu.call(this),i=null;return this.skipSC(),this.isDelim(Ju)&&(this.eatDelim(Ju),i=Xu.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:i}}function to(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(10,1)}var ao={};N(ao,{generate:()=>no,name:()=>G0,parse:()=>ro,structure:()=>q0});function W0(){return this.tokenIndex>0&&this.lookupType(-1)===13?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}var G0="Raw",q0={value:String};function ro(e,t){let i=this.getTokenStart(this.tokenIndex),n;return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),t&&this.tokenStart>i?n=W0.call(this):n=this.tokenStart,{type:"Raw",loc:this.getLocation(i,n),value:this.substring(i,n)}}function no(e){this.tokenize(e.value)}var lo={};N(lo,{generate:()=>oo,name:()=>Y0,parse:()=>so,structure:()=>Z0,walkContext:()=>Q0});function ep(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function K0(){let e=this.SelectorList();return e.type!=="Raw"&&this.eof===!1&&this.tokenType!==23&&this.error(),e}var Y0="Rule",Q0="rule",Z0={prelude:["SelectorList","Raw"],block:["Block"]};function so(){let e=this.tokenIndex,t=this.tokenStart,i,n;return this.parseRulePrelude?i=this.parseWithFallback(K0,ep):i=ep.call(this,e),n=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:i,block:n}}function oo(e){this.node(e.prelude),this.node(e.block)}var po={};N(po,{generate:()=>uo,name:()=>J0,parse:()=>co,structure:()=>X0});var J0="Scope",X0={root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]};function co(){let e=null,t=null;this.skipSC();let i=this.tokenStart;return this.tokenType===21&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),this.lookupNonWSType(0)===1&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(21),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(22)),{type:"Scope",loc:this.getLocation(i,this.tokenStart),root:e,limit:t}}function uo(e){e.root&&(this.token(21,"("),this.node(e.root),this.token(22,")")),e.limit&&(this.token(1,"to"),this.token(21,"("),this.node(e.limit),this.token(22,")"))}var mo={};N(mo,{generate:()=>fo,name:()=>eb,parse:()=>ho,structure:()=>tb});var eb="Selector",tb={children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]};function ho(){let e=this.readSequence(this.scope.Selector);return this.getFirstListNode(e)===null&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}function fo(e){this.children(e)}var xo={};N(xo,{generate:()=>bo,name:()=>ib,parse:()=>go,structure:()=>nb,walkContext:()=>rb});var ib="SelectorList",rb="selector",nb={children:[["Selector","Raw"]]};function go(){let e=this.createList();for(;!this.eof;){if(e.push(this.Selector()),this.tokenType===18){this.next();continue}break}return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}function bo(e){this.children(e,()=>this.token(18,","))}var So={};N(So,{generate:()=>ko,name:()=>sb,parse:()=>vo,structure:()=>ob});var yo=92,tp=34,ip=39;function Ur(e){let t=e.length,i=e.charCodeAt(0),n=i===tp||i===ip?1:0,c=n===1&&t>1&&e.charCodeAt(t-1)===i?t-2:t-1,h="";for(let f=n;f<=c;f++){let g=e.charCodeAt(f);if(g===yo){if(f===c){f!==t-1&&(h=e.substr(f+1));break}if(g=e.charCodeAt(++f),Ee(yo,g)){let y=f-1,b=dt(e,y);f=b-1,h+=Nr(e.substring(y+1,b))}else g===13&&e.charCodeAt(f+1)===10&&f++}else h+=e[f]}return h}function rp(e,t){let i=t?"'":'"',n=t?ip:tp,c="",h=!1;for(let f=0;f<e.length;f++){let g=e.charCodeAt(f);if(g===0){c+="\uFFFD";continue}if(g<=31||g===127){c+="\\"+g.toString(16),h=!0;continue}g===n||g===yo?(c+="\\"+e.charAt(f),h=!1):(h&&(it(g)||rt(g))&&(c+=" "),c+=e.charAt(f),h=!1)}return i+c+i}var sb="String",ob={value:String};function vo(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Ur(this.consume(5))}}function ko(e){this.token(5,rp(e.value))}var Eo={};N(Eo,{generate:()=>Co,name:()=>cb,parse:()=>wo,structure:()=>pb,walkContext:()=>ub});var lb=33;function np(){return this.Raw(null,!1)}var cb="StyleSheet",ub="stylesheet",pb={children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]};function wo(){let e=this.tokenStart,t=this.createList(),i;for(;!this.eof;){switch(this.tokenType){case 13:this.next();continue;case 25:if(this.charCodeAt(this.tokenStart+2)!==lb){this.next();continue}i=this.Comment();break;case 14:i=this.CDO();break;case 15:i=this.CDC();break;case 3:i=this.parseWithFallback(this.Atrule,np);break;default:i=this.parseWithFallback(this.Rule,np)}t.push(i)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}function Co(e){this.children(e)}var _o={};N(_o,{generate:()=>To,name:()=>hb,parse:()=>Ao,structure:()=>db});var hb="SupportsDeclaration",db={declaration:"Declaration"};function Ao(){let e=this.tokenStart;this.eat(21),this.skipSC();let t=this.Declaration();return this.eof||this.eat(22),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}function To(e){this.token(21,"("),this.node(e.declaration),this.token(22,")")}var Po={};N(Po,{generate:()=>$o,name:()=>mb,parse:()=>Io,structure:()=>gb});var fb=42,ap=124;function Lo(){this.tokenType!==1&&this.isDelim(fb)===!1&&this.error("Identifier or asterisk is expected"),this.next()}var mb="TypeSelector",gb={name:String};function Io(){let e=this.tokenStart;return this.isDelim(ap)?(this.next(),Lo.call(this)):(Lo.call(this),this.isDelim(ap)&&(this.next(),Lo.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function $o(e){this.tokenize(e.name)}var Mo={};N(Mo,{generate:()=>Fo,name:()=>yb,parse:()=>Ro,structure:()=>vb});var sp=43,op=45,No=63;function Fi(e,t){let i=0;for(let n=this.tokenStart+e;n<this.tokenEnd;n++){let c=this.charCodeAt(n);if(c===op&&t&&i!==0)return Fi.call(this,e+i+1,!1),-1;it(c)||this.error(t&&i!==0?"Hyphen minus"+(i<6?" or hex digit":"")+" is expected":i<6?"Hex digit is expected":"Unexpected input",n),++i>6&&this.error("Too many hex digits",n)}return this.next(),i}function Hr(e){let t=0;for(;this.isDelim(No);)++t>e&&this.error("Too many question marks"),this.next()}function bb(e){this.charCodeAt(this.tokenStart)!==e&&this.error((e===sp?"Plus sign":"Hyphen minus")+" is expected")}function xb(){let e=0;switch(this.tokenType){case 10:if(e=Fi.call(this,1,!0),this.isDelim(No)){Hr.call(this,6-e);break}if(this.tokenType===12||this.tokenType===10){bb.call(this,op),Fi.call(this,1,!1);break}break;case 12:e=Fi.call(this,1,!0),e>0&&Hr.call(this,6-e);break;default:if(this.eatDelim(sp),this.tokenType===1){e=Fi.call(this,0,!0),e>0&&Hr.call(this,6-e);break}if(this.isDelim(No)){this.next(),Hr.call(this,5);break}this.error("Hex digit or question mark is expected")}}var yb="UnicodeRange",vb={value:String};function Ro(){let e=this.tokenStart;return this.eatIdent("u"),xb.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}function Fo(e){this.tokenize(e.value)}var Bo={};N(Bo,{generate:()=>Vo,name:()=>Ab,parse:()=>Do,structure:()=>Tb});var kb=32,Oo=92,Sb=34,wb=39,Cb=40,lp=41;function cp(e){let t=e.length,i=4,n=e.charCodeAt(t-1)===lp?t-2:t-1,c="";for(;i<n&&rt(e.charCodeAt(i));)i++;for(;i<n&&rt(e.charCodeAt(n));)n--;for(let h=i;h<=n;h++){let f=e.charCodeAt(h);if(f===Oo){if(h===n){h!==t-1&&(c=e.substr(h+1));break}if(f=e.charCodeAt(++h),Ee(Oo,f)){let g=h-1,y=dt(e,g);h=y-1,c+=Nr(e.substring(g+1,y))}else f===13&&e.charCodeAt(h+1)===10&&h++}else c+=e[h]}return c}function up(e){let t="",i=!1;for(let n=0;n<e.length;n++){let c=e.charCodeAt(n);if(c===0){t+="\uFFFD";continue}if(c<=31||c===127){t+="\\"+c.toString(16),i=!0;continue}c===kb||c===Oo||c===Sb||c===wb||c===Cb||c===lp?(t+="\\"+e.charAt(n),i=!1):(i&&it(c)&&(t+=" "),t+=e.charAt(n),i=!1)}return"url("+t+")"}var Ab="Url",Tb={value:String};function Do(){let e=this.tokenStart,t;switch(this.tokenType){case 7:t=cp(this.consume(7));break;case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Ur(this.consume(5)),this.skipSC(),this.eof||this.eat(22);break;default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}function Vo(e){this.token(7,up(e.value))}var Ho={};N(Ho,{generate:()=>Uo,name:()=>_b,parse:()=>jo,structure:()=>Lb});var _b="Value",Lb={children:[[]]};function jo(){let e=this.tokenStart,t=this.readSequence(this.scope.Value);return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}function Uo(e){this.children(e)}var Go={};N(Go,{generate:()=>Wo,name:()=>$b,parse:()=>zo,structure:()=>Pb});var Ib=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),$b="WhiteSpace",Pb={value:String};function zo(){return this.eat(13),Ib}function Wo(e){this.token(13,e.value)}var pp={parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Qn,atrule:Fu,pseudo:Ou,node:qo};var hp=mu(pp);var{hasOwnProperty:Ko}=Object.prototype,Mi=function(){};function dp(e){return typeof e=="function"?e:Mi}function fp(e,t){return function(i,n,c){i.type===t&&e.call(this,i,n,c)}}function Nb(e,t){let i=t.structure,n=[];for(let c in i){if(Ko.call(i,c)===!1)continue;let h=i[c],f={name:c,type:!1,nullable:!1};Array.isArray(h)||(h=[h]);for(let g of h)g===null?f.nullable=!0:typeof g=="string"?f.type="node":Array.isArray(g)&&(f.type="list");f.type&&n.push(f)}return n.length?{context:t.walkContext,fields:n}:null}function Rb(e){let t={};for(let i in e.node)if(Ko.call(e.node,i)){let n=e.node[i];if(!n.structure)throw new Error("Missed `structure` field in `"+i+"` node type definition");t[i]=Nb(i,n)}return t}function mp(e,t){let i=e.fields.slice(),n=e.context,c=typeof n=="string";return t&&i.reverse(),function(h,f,g,y){let b;c&&(b=f[n],f[n]=h);for(let v of i){let w=h[v.name];if(!v.nullable||w){if(v.type==="list"){if(t?w.reduceRight(y,!1):w.reduce(y,!1))return!0}else if(g(w))return!0}}c&&(f[n]=b)}}function gp({StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:c}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Rule:{StyleSheet:e,Atrule:t,Rule:i,Block:n},Declaration:{StyleSheet:e,Atrule:t,Rule:i,Block:n,DeclarationList:c}}}function bp(e){let t=Rb(e),i={},n={},c=Symbol("break-walk"),h=Symbol("skip-node");for(let b in t)Ko.call(t,b)&&t[b]!==null&&(i[b]=mp(t[b],!1),n[b]=mp(t[b],!0));let f=gp(i),g=gp(n),y=function(b,v){function w(Y,oe,X){let Te=C.call(ie,Y,oe,X);return Te===c?!0:Te===h?!1:!!(I.hasOwnProperty(Y.type)&&I[Y.type](Y,ie,w,z)||u.call(ie,Y,oe,X)===c)}let C=Mi,u=Mi,I=i,z=(Y,oe,X,Te)=>Y||w(oe,X,Te),ie={break:c,skip:h,root:b,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null};if(typeof v=="function")C=v;else if(v&&(C=dp(v.enter),u=dp(v.leave),v.reverse&&(I=n),v.visit)){if(f.hasOwnProperty(v.visit))I=v.reverse?g[v.visit]:f[v.visit];else if(!t.hasOwnProperty(v.visit))throw new Error("Bad value `"+v.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")");C=fp(C,v.visit),u=fp(u,v.visit)}if(C===Mi&&u===Mi)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");w(b)};return y.break=c,y.skip=h,y.find=function(b,v){let w=null;return y(b,function(C,u,I){if(v.call(this,C,u,I))return w=C,c}),w},y.findLast=function(b,v){let w=null;return y(b,{reverse:!0,enter(C,u,I){if(v.call(this,C,u,I))return w=C,c}}),w},y.findAll=function(b,v){let w=[];return y(b,function(C,u,I){v.call(this,C,u,I)&&w.push(C)}),w},y}var Yo={};N(Yo,{AnPlusB:()=>ia,Atrule:()=>aa,AtrulePrelude:()=>la,AttributeSelector:()=>ha,Block:()=>ma,Brackets:()=>xa,CDC:()=>ka,CDO:()=>Ca,ClassSelector:()=>Ta,Combinator:()=>Ia,Comment:()=>Na,Condition:()=>Ma,Declaration:()=>Va,DeclarationList:()=>Ha,Dimension:()=>Ga,Feature:()=>Ya,FeatureFunction:()=>Ja,FeatureRange:()=>is,Function:()=>as,GeneralEnclosed:()=>ls,Hash:()=>ps,IdSelector:()=>bs,Identifier:()=>fs,Layer:()=>vs,LayerList:()=>ws,MediaQuery:()=>As,MediaQueryList:()=>Ls,NestingSelector:()=>Ps,Nth:()=>Fs,Number:()=>Ds,Operator:()=>js,Parentheses:()=>zs,Percentage:()=>qs,PseudoClassSelector:()=>Qs,PseudoElementSelector:()=>Xs,Ratio:()=>io,Raw:()=>ao,Rule:()=>lo,Scope:()=>po,Selector:()=>mo,SelectorList:()=>xo,String:()=>So,StyleSheet:()=>Eo,SupportsDeclaration:()=>_o,TypeSelector:()=>Po,UnicodeRange:()=>Mo,Url:()=>Bo,Value:()=>Ho,WhiteSpace:()=>Go});var xp={node:Yo};var yp=bp(xp);var Bp=Ef(Dp(),1),Vp=new Set(["Atrule","Selector","Declaration"]);function jp(e){let t=new Bp.SourceMapGenerator,i={line:1,column:0},n={line:0,column:0},c={line:1,column:0},h={generated:c},f=1,g=0,y=!1,b=e.node;e.node=function(C){if(C.loc&&C.loc.start&&Vp.has(C.type)){let u=C.loc.start.line,I=C.loc.start.column-1;(n.line!==u||n.column!==I)&&(n.line=u,n.column=I,i.line=f,i.column=g,y&&(y=!1,(i.line!==c.line||i.column!==c.column)&&t.addMapping(h)),y=!0,t.addMapping({source:C.loc.source,original:n,generated:i}))}b.call(this,C),y&&Vp.has(C.type)&&(c.line=f,c.column=g)};let v=e.emit;e.emit=function(C,u,I){for(let z=0;z<C.length;z++)C.charCodeAt(z)===10?(f++,g=0):g++;v(C,u,I)};let w=e.result;return e.result=function(){return y&&t.addMapping(h),{css:w(),map:t}},e}var qr={};N(qr,{safe:()=>rl,spec:()=>ix});var Xb=43,ex=45,il=(e,t)=>(e===9&&(e=t),typeof e=="string"&&(e=Math.min(e.charCodeAt(0),128)<<6),e<<1),Up=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,10],[1,11],[1,12],[1,15],[1,21],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,10],[3,11],[3,12],[3,15],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,10],[4,11],[4,12],[4,15],[12,1],[12,2],[12,7],[12,8],[12,"-"],[12,10],[12,11],[12,12],[12,15],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",10],["#",11],["#",12],["#",15],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",10],["-",11],["-",12],["-",15],[10,1],[10,2],[10,7],[10,8],[10,10],[10,11],[10,12],[10,"%"],[10,15],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",15],[".",10],[".",11],[".",12],["+",10],["+",11],["+",12],["/","*"]],tx=Up.concat([[1,4],[12,4],[4,4],[3,21],[3,5],[3,16],[11,11],[11,12],[11,2],[11,"-"],[22,1],[22,2],[22,11],[22,12],[22,4],[22,"-"]]);function Hp(e){let t=new Set(e.map(([i,n])=>il(i)<<16|il(n)));return function(i,n,c){let h=il(n,c),f=c.charCodeAt(0),g=f===ex&&n!==1&&n!==2&&n!==15||f===Xb?t.has((i&65534)<<16|f<<7):t.has((i&65534)<<16|h);return h|g}}var ix=Hp(Up),rl=Hp(tx);var rx=92;function nx(e,t){if(typeof t=="function"){let i=null;e.children.forEach(n=>{i!==null&&t.call(this,i),this.node(n),i=n});return}e.children.forEach(this.node,this)}function zp(e){let t=new Map;for(let[i,n]of Object.entries(e.node))typeof(n.generate||n)=="function"&&t.set(i,n.generate||n);return function(i,n){let c="",h=0,f={node(y){if(t.has(y.type))t.get(y.type).call(g,y);else throw new Error("Unknown node type: "+y.type)},tokenBefore:rl,token(y,b,v){h=this.tokenBefore(h,y,b),!v&&h&1&&this.emit(" ",13,!0),this.emit(b,y,!1),y===9&&b.charCodeAt(0)===rx&&this.emit(`
`,13,!0)},emit(y){c+=y},result(){return c}};n&&(typeof n.decorator=="function"&&(f=n.decorator(f)),n.sourceMap&&(f=jp(f)),n.mode in qr&&(f.tokenBefore=qr[n.mode]));let g={node:y=>f.node(y),children:nx,token:(y,b)=>f.token(y,b),tokenize:y=>Or(y,(b,v,w)=>{f.token(b,y.slice(v,w),v!==0)})};return f.node(i),f.result()}}var nl={};N(nl,{AnPlusB:()=>ta,Atrule:()=>na,AtrulePrelude:()=>oa,AttributeSelector:()=>pa,Block:()=>fa,Brackets:()=>ba,CDC:()=>va,CDO:()=>wa,ClassSelector:()=>Aa,Combinator:()=>La,Comment:()=>Pa,Condition:()=>Fa,Declaration:()=>Da,DeclarationList:()=>Ua,Dimension:()=>Wa,Feature:()=>Ka,FeatureFunction:()=>Za,FeatureRange:()=>ts,Function:()=>ns,GeneralEnclosed:()=>os,Hash:()=>us,IdSelector:()=>gs,Identifier:()=>ds,Layer:()=>ys,LayerList:()=>Ss,MediaQuery:()=>Es,MediaQueryList:()=>_s,NestingSelector:()=>$s,Nth:()=>Rs,Number:()=>Os,Operator:()=>Bs,Parentheses:()=>Hs,Percentage:()=>Gs,PseudoClassSelector:()=>Ys,PseudoElementSelector:()=>Js,Ratio:()=>to,Raw:()=>no,Rule:()=>oo,Scope:()=>uo,Selector:()=>fo,SelectorList:()=>bo,String:()=>ko,StyleSheet:()=>Co,SupportsDeclaration:()=>To,TypeSelector:()=>$o,UnicodeRange:()=>Fo,Url:()=>Vo,Value:()=>Uo,WhiteSpace:()=>Wo});var Wp={node:nl};var al=zp(Wp);var Vi="cover opening quote couple stories savedate countdown gallery videos events dress rundown rsvp live filter gifts adab families closing footer".split(" "),ax=new Set("text textarea url email tel number date time datetime color select boolean image repeater repeater-image".split(" ")),qp=new Set(["__proto__","prototype","constructor"]);function Kr(e,t){if(!(!e||typeof e!="object")){e.type&&t(e);for(let i of Object.values(e))Array.isArray(i)?i.forEach(n=>Kr(n,t)):i&&typeof i=="object"&&Kr(i,t)}}function ai(e){return e?e.computed?e.property?.value:e.property?.name:""}function si(e){if(!e)throw new Error("Nilai static tidak ditemukan");if(e.type==="Literal"&&!e.regex&&!e.bigint)return e.value;if(e.type==="UnaryExpression"&&e.operator==="!")return!si(e.argument);if(e.type==="UnaryExpression"&&["+","-"].includes(e.operator)){let t=si(e.argument);if(typeof t=="number")return e.operator==="-"?-t:t}if(e.type==="ArrayExpression")return e.elements.map(si);if(e.type==="ObjectExpression"){let t={};for(let i of e.properties){let n=i.key?.name??i.key?.value;if(i.type!=="Property"||i.computed||i.method||i.kind!=="init"||qp.has(String(n)))throw new Error("Property static tidak aman");t[n]=si(i.value)}return t}throw new Error("CONFIG dan SVE_SCHEMA harus berisi nilai static")}function Gp(e,t){let i=null;return Kr(e,n=>{if(i)return;let c=n.type==="VariableDeclarator"&&n.id.name===t,h=n.type==="AssignmentExpression"&&n.left.type==="MemberExpression"&&["window","globalThis"].includes(n.left.object.name)&&ai(n.left)===t;if(c||h)try{i=si(c?n.init:n.right)}catch{}}),i&&!Array.isArray(i)&&typeof i=="object"?i:null}function sx(e){let t=new WeakMap,i=(c,h,f=null)=>{c&&(c.type==="Identifier"?h.bindings.set(c.name,f):c.type==="RestElement"?i(c.argument,h):c.type==="AssignmentPattern"?i(c.left,h):c.type==="ArrayPattern"?c.elements.forEach(g=>i(g,h)):c.type==="ObjectPattern"&&c.properties.forEach(g=>i(g.value||g.argument,h)))},n=(c,h)=>{if(!c||typeof c!="object")return;let f=["FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"].includes(c.type);c.type==="FunctionDeclaration"&&i(c.id,h);let g=f||["Program","BlockStatement","CatchClause","ForStatement","ForOfStatement","ForInStatement"].includes(c.type),y=g?{parent:h,bindings:new Map,functionScope:null}:h;g&&(y.functionScope=f||c.type==="Program"?y:h.functionScope),t.set(c,y),f&&(c.id&&i(c.id,y),c.params.forEach(b=>i(b,y))),c.type==="CatchClause"&&i(c.param,y),c.type==="VariableDeclaration"&&c.declarations.forEach(b=>i(b.id,c.kind==="var"?y.functionScope:y,b.init));for(let b of Object.values(c))Array.isArray(b)?b.forEach(v=>n(v,y)):b&&typeof b=="object"&&n(b,y)};return n(e,null),t}function ox(e){let t=[],i=sx(e),n=(g,y=new Set)=>{if(g?.type!=="Identifier"||y.has(g))return g;y.add(g);for(let b=i.get(g);b;b=b.parent)if(b.bindings.has(g.name))return n(b.bindings.get(g.name),y);return g},c=g=>(g=n(g),g?.name==="document"||g?.type==="MemberExpression"&&["window","globalThis"].includes(g.object.name)&&ai(g)==="document"),h=g=>(g=n(g),g?.type==="MemberExpression"?c(g.object)&&ai(g)==="body":g?.type==="CallExpression"&&c(g.callee.object)&&ai(g.callee)==="querySelector"&&g.arguments[0]?.value==="body"),f=g=>(g=n(g),g?.type==="NewExpression"&&(g.callee.name==="MutationObserver"||ai(g.callee)==="MutationObserver"));return Kr(e,g=>{if(g.type==="CallExpression"&&g.callee.name==="eval"&&t.push("eval() terdeteksi"),["NewExpression","CallExpression"].includes(g.type)&&g.callee.name==="Function"&&t.push("Function constructor terdeteksi"),g.type!=="CallExpression"||ai(g.callee)!=="observe"||!f(g.callee.object)||!h(g.arguments[0]))return;let y;try{y=si(n(g.arguments[1]))}catch{}let b=y?.attributes??(y?.attributeFilter!==void 0||y?.attributeOldValue!==void 0);(!y||b&&(!Array.isArray(y.attributeFilter)||y.attributeFilter.includes("style")))&&t.push("MutationObserver pada style document.body dilarang (risiko infinite loop & Page Unresponsive)")}),t}function Kp(e){let t=[...e.children],i=t.slice(t.findLastIndex(n=>n.type==="Combinator")+1);return i.some(n=>n.type==="PseudoElementSelector")?[]:i.flatMap(n=>n.type==="TypeSelector"&&["html","body"].includes(n.name.toLowerCase())?[n.name.toLowerCase()]:n.type==="PseudoClassSelector"&&n.name==="root"?["html"]:n.type==="PseudoClassSelector"&&["is","where"].includes(n.name)&&n.children?[...n.children].flatMap(c=>c.type==="SelectorList"?[...c.children].flatMap(Kp):[]):[])}function lx(e){let t=[],i;try{i=hp(e)}catch(h){return["CSS tidak terbaca: "+h.message]}let n=[!0],c={html:{},body:{}};return yp(i,{enter(h){if(h.type==="Atrule"){h.name.toLowerCase()==="import"&&t.push("@import di dalam <style> dilarang; gunakan tag <link> di <head>");let g=h.prelude?al(h.prelude):"",y=h.name.toLowerCase()==="media"&&g.split(",").every(b=>{let v=b.match(/min-width\s*:\s*([\d.]+)px/i)||b.match(/width\s*>=?\s*([\d.]+)px/i);return/\bprint\b/i.test(b)||v&&Number(v[1])>960});n.push(n.at(-1)&&!y)}if(h.type!=="Rule"||!n.at(-1))return;let f=new Set(h.prelude?.type==="SelectorList"?[...h.prelude.children].flatMap(Kp):[]);h.block.children.forEach(g=>{if(g.type!=="Declaration")return;let y=al(g.value).trim().toLowerCase();for(let b of f)["overflow","overflow-y"].includes(g.property)&&/\bhidden\b/.test(y)&&(c[b].overflow=!0),g.property==="height"&&y==="100dvh"&&(c[b].height=!0)})},leave(h){h.type==="Atrule"&&n.pop()}}),Object.values(c).some(h=>h.height&&h.overflow)&&t.push("html/body dengan overflow:hidden dan height:100dvh dilarang pada mobile"),t}function sl({doc:e,scripts:t=[],css:i="",config:n,schema:c,requireObjects:h=!0}){let f=[],g=[];for(let C of t)try{let u=iu(C,{ecmaVersion:"latest",sourceType:"script"});g.push(u),f.push(...ox(u))}catch(u){f.push("Sintaks JavaScript gagal kompilasi: "+u.message)}n??(n=g.map(C=>Gp(C,"CONFIG")).find(Boolean)),c??(c=g.map(C=>Gp(C,"SVE_SCHEMA")).find(Boolean)),h&&!n&&f.push("CONFIG static tidak terbaca"),h&&!c&&f.push("SVE_SCHEMA static tidak terbaca");let y=c?.template?.type==="custom-page";if(c){Array.isArray(c.sections)||f.push("SVE_SCHEMA.sections wajib array");let C=Array.isArray(c.sections)?c.sections:[],u=C.map(I=>I?.id);new Set(u).size!==u.length&&f.push("SVE_SCHEMA memiliki duplicate section id"),y||(Vi.forEach(I=>{u.includes(I)||f.push("Canonical section hilang: "+I)}),u.forEach(I=>{Vi.includes(I)||f.push("Section bukan canonical: "+I)}));for(let I of C){if(I?.fields!==void 0&&!Array.isArray(I.fields)){f.push("Section fields wajib array");continue}for(let z of I?.fields||[])if(ax.has(z?.type||"text")||f.push("Field type tidak didukung: "+z?.type),!!["repeater","repeater-image"].includes(z?.type)){if(!Array.isArray(z.fields)){f.push("Repeater tanpa fields[]");continue}for(let ie of z.fields)(!ie?.key||qp.has(ie.key))&&f.push("Repeater subfield tanpa stable key yang aman"),["repeater","repeater-image"].includes(ie?.type)&&f.push("Nested repeater tidak diizinkan")}}}if(n&&!y){let C=n.sectionOrder;(!Array.isArray(C)||C.length!==Vi.length||!Vi.every(u=>C.includes(u))||C[0]!=="cover")&&f.push("CONFIG.sectionOrder belum lengkap atau cover bukan pertama")}let v=[e?.documentElement?.outerHTML||"",i,...t].join(`
`);/javascript\s*:/i.test(v)&&f.push("javascript: URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(v)&&f.push("Kemungkinan credential rahasia terdeteksi"),/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/i.test(v)&&f.push("Gambar base64 terdeteksi; gunakan URL https");let w=["html","body"].map(C=>`${C}{${e?.querySelector(C)?.getAttribute("style")||""}}`).join("");f.push(...lx(i+w));for(let C of e?.querySelectorAll("audio")||[])C.getAttribute("preload")?.toLowerCase()!=="none"&&f.push('Audio wajib menggunakan preload="none"');for(let C of e?.querySelectorAll("iframe")||[]){let u="";try{u=new URL(C.getAttribute("src")||"","https://template.invalid").hostname}catch{}/(^|\.)youtube(?:-nocookie)?\.com$/i.test(u)&&C.getAttribute("loading")?.toLowerCase()!=="lazy"&&f.push('Iframe YouTube wajib memiliki loading="lazy"')}return e?.getElementById("smartLoaderOverlay")&&f.push("smartLoaderOverlay dilarang; gunakan cover undangan langsung"),{blockers:[...new Set(f)],config:n,schema:c}}var cx="sve-background-primary sve-background-secondary sve-background-tertiary sve-text-primary sve-text-secondary sve-text-tertiary sve-button-background-primary sve-button-text-primary sve-button-background-secondary sve-button-text-secondary".split(" "),ux=["display","heading","subheading","body","small","button"].flatMap(e=>["size","weight"].map(t=>`sve-${e}-${t}`));function px(e){let t=String(e||""),i=new Set([...t.matchAll(/--([a-z0-9-]+)\s*:/gi)].map(n=>n[1]));return i.size?[...cx,...ux].filter(n=>i.has(n)&&!new RegExp(`var\\(\\s*--${n}\\s*[,)]`).test(t)).map(n=>`Token ${n} dideklarasikan tetapi tidak pernah dipakai; panel Color/Style SVE tidak akan berpengaruh`):[]}function hx(e){let t=[];for(let i of e?.querySelectorAll?.("[style]")||[]){if(i.hasAttribute?.("data-sve-literal-color"))continue;let h=(i.getAttribute("style")||"").replace(/var\([^)]*\)/g,"").match(/#[0-9a-f]{3,8}\b/gi);if(!h)continue;let f=i.getAttribute("data-pencil-id"),g=i.getAttribute("data-pencil-name"),y=f?` pada node ${f}${g?" ("+g+")":""}`:"";t.push(`Warna belum tertoken: ${[...new Set(h)].join(", ")}${y}. Panel Color SVE tidak akan mengubahnya`)}return t}function Yp(e,t){let i=String(e||"").replace(/^\uFEFF/,""),n=t(i),c=[...n.querySelectorAll("style")],h=[...n.querySelectorAll("script")],f=sl({doc:n,css:c.map(b=>b.textContent).join(`
`),scripts:h.map(b=>b.textContent)}),g=f.blockers;if(/^\s*<!doctype\s+html\b/i.test(i)||g.push("DOCTYPE HTML wajib ada"),n.documentElement?.getAttribute("lang")!=="id"&&g.push('html lang wajib "id"'),(!/<head[\s>]/i.test(i)||!n.head)&&g.push("Elemen head wajib ada"),(!/<body[\s>]/i.test(i)||!n.body)&&g.push("Elemen body wajib ada"),n.head?.querySelector("title")||g.push("Title wajib ada di head"),n.querySelector("[data-sve-template]")||g.push("Root data-sve-template tidak ditemukan"),(c.length!==1||!n.head?.contains(c[0]))&&g.push("Wajib tepat satu style di head"),(h.length!==1||!n.body?.contains(h[0]))&&g.push("Wajib tepat satu script di body"),h[0]&&h[0]!==n.body?.lastElementChild&&g.push("Script wajib menjadi elemen terakhir di body"),h.some(b=>b.hasAttribute("src"))&&g.push("Script template harus inline"),f.schema?.template?.type!=="custom-page"){let b=new Set([...n.querySelectorAll("[data-section-id]")].map(v=>v.getAttribute("data-section-id")));Vi.forEach(v=>{b.has(v)||g.push("Markup section hilang: "+v)})}g.push(...px(f.html??i));let y=hx(n);return{...f,blockers:[...new Set(g)],warnings:y,html:i}}var dx="sve-config",fx="sve-config-ack",mx="scalev-html-mode-preview-loaded";function Qp({document:e,window:t,getConfig:i,syncImages:n,metrics:c}){let h=null,f=null,g=!1,y=null,b=null,v=0,w=null,C=null,u=null,I=!1,z=null,ie=null,Y=0,oe=null,X=!1;function Te(){if(h?.isConnected)return h;let O=[...e.querySelectorAll("iframe")];return h=O.find(F=>F.getAttribute("title")==="HTML Mode preview")||O.find(F=>F.id==="preview")||O.find(F=>(F.getAttribute("srcdoc")||"").length>0)||null,h}function Je(O){if(!O)return null;try{let F=O.contentWindow;return F&&typeof F.SVE_REFRESH=="function"?F:null}catch{return null}}function Bi(){try{let F=(e.querySelector("section.studio-page")||e.getElementById("__nuxt"))?.__vue__;return!F||!F.pageDisplayValues||typeof F.pageDisplayValues.htmlDocument!="string"||typeof F.$set!="function"?null:F}catch{return null}}function oi(O,F){O.$set(O.pageDisplayValues,"htmlDocument",F)}function ji(){I||(I=!0,t.addEventListener("message",O=>{let F=O.data;if(!(!F||typeof F!="object")){if(F.type===mx){X&&(X=!1,u!==null&&(t.clearTimeout(u),u=null),z!==!0&&(z=!0,c.previewLoadedCount=(c.previewLoadedCount||0)+1));return}F.type===fx&&(O.origin!=="null"&&O.origin!==t.location?.origin||w!==null&&F.id!==w||(w=null,C!==null&&(t.clearTimeout(C),C=null),z===null&&(z=!0),c.previewAckCount=(c.previewAckCount||0)+1,F.error&&console.warn("[SVE] Preview menolak CONFIG:",F.error)))}}))}function Yr(){if(z===null){z=!1,c.previewUnsupported=!0;try{ie?.()}catch(O){console.warn("[SVE] onUnsupported gagal",O)}}}function Qr(O,F){ji();let be=JSON.parse(F),Re=++v;w=Re,O.contentWindow.postMessage({type:dx,id:Re,config:be},"*"),c.previewMessageCount=(c.previewMessageCount||0)+1,z===null&&C===null&&(C=t.setTimeout(()=>{C=null,w!==null&&Yr()},400))}function ot(O,F,be){let Re=JSON.parse(be);if(F.CONFIG=Re,F.SVE_REFRESH?.(Re),z=!0,c.previewDirectCount=(c.previewDirectCount||0)+1,g)try{O.contentDocument&&n(O.contentDocument)}catch{}}function Ft(O,F){ji();try{oi(O,F)}catch(be){return console.warn("[SVE] Payload preview Scalev gagal",be),!1}return X=!0,u===null&&(u=t.setTimeout(()=>{u=null,X&&(X=!1,oe=!1,c.previewLoadedTimeout=(c.previewLoadedTimeout||0)+1)},2500)),c.previewScalevCount=(c.previewScalevCount||0)+1,!0}function li(){f!==null&&t.cancelAnimationFrame(f),f=null;let O=Te(),F=i();if(!O||!F)return;let be=JSON.stringify(F);if(!(be===y&&O===b&&!g)){try{let Re=Je(O);Re?ot(O,Re,be):Qr(O,be),y=be,b=O,c.previewRefreshCount=(c.previewRefreshCount||0)+1}catch(Re){console.warn("[SVE] Preview refresh gagal",Re)}g=!1}}return{request({images:O=!1,force:F=!1}={}){g||(g=O),F&&(y=null,b=null),f===null&&(f=t.requestAnimationFrame(li))},fromScalevSource(O){if(typeof O!="string"||!O)return!1;if(oe===!1){if(++Y<40)return!1;Y=0}let F=Bi();if(!F)return oe=!1,!1;let be=Ft(F,O);return be&&(oe=!0),be},document(){try{return Te()?.contentDocument||null}catch{return null}},supported(){return z},onUnsupported(O){ie=O},invalidate(){h=null,y=null,b=null,oe=null},flush:li}}(function(){"use strict";let e="sve77",t="0.33.3",n=Object.freeze({endpoint:"https://template-library.nikahin.workers.dev/",timeoutMs:9e3}),c="https://nikahin.myscalev.com/home#paket",h="6282175274118",f="~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...",g="https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/scalev-visual-editor.user.js",y=g;function b(){if(location.hostname!=="app.scalev.com")return!1;let r=location.pathname.replace(/\/+$/,"")||"/";return r==="/pages/new"?new URLSearchParams(location.search).get("mode")==="html_mode":/^\/pages\/[^/]+$/.test(r)}if(!b()||new URLSearchParams(location.search).get("sve-draft")==="1"!==!1||document.getElementById(e))return;let w=(r,a=document)=>a.querySelector(r),C=(r,a=document)=>Array.from(a.querySelectorAll(r)),u={open:!1,tab:"content",search:"",editors:{html:null,css:null,js:null,head:null},allEditors:[],doc:null,rootSelector:":root",config:null,configRange:null,configSourceText:"",configOwnerSource:"",commitError:"",managedSources:null,schema:null,defaults:null,defaultConfig:null,scalevSlug:"",pendingWeddingIdSlug:"",dashboardPin:{status:"idle",slug:"",pin:"",version:0,message:"",busy:!1},templateLibrary:{status:"idle",templates:[],error:"",search:"",importedId:"",importedName:"",previousSource:null,loadedAt:0},internalEditorWrite:0,editorChangeBound:new WeakSet,freshBaselineTimer:null,baselineFingerprint:"",lastManagedFingerprint:"",contentOpenSections:new Set,contentCommitTimer:null,contentCommitMessage:"",contentStateDirty:!1,lastSerializedConfig:"",contentSearchIndex:null,contentFieldCache:new WeakMap,repeaterContentFieldCache:new WeakMap,fallbackSchemaCache:null,fallbackSchemaReady:!1,contentSectionHtmlCache:new Map,contentSectionUseTick:0,contentMaxMountedSections:6,contentPrewarmScheduled:!1,contentPrewarmHandle:null,contentPrewarmCursor:0,canvasPickMessageBound:!1,canvasPickSources:new WeakMap,sourceDirty:!0,uiPrepared:!1,renderedTab:"",renderedSearch:"",performance:{renderCount:0,skippedTabRenders:0,lastRenderMs:0,lastRenderTab:"",slowRenders:0,firstPaintMarks:[]},previewRefreshTimer:null,previewRefreshImages:!1,prewarmScheduled:!1,prewarmHandle:null,nativeCache:{save:null,publish:null,toolbarHost:null,globalHeader:null,workspaceRoot:null,topToolbar:null}};window.__SVE77_PERF=u.performance;let I=[["Background","Primary","--sve-background-primary","#f7f0e8"],["Background","Secondary","--sve-background-secondary","#ffffff"],["Background","Tertiary","--sve-background-tertiary","#e8ddd0"],["Body Teks","Primary","--sve-text-primary","#332a24"],["Body Teks","Secondary","--sve-text-secondary","#74675f"],["Body Teks","Tertiary","--sve-text-tertiary","#a09185"],["Button Primary","Background","--sve-button-background-primary","#332a24"],["Button Primary","Text","--sve-button-text-primary","#ffffff"],["Button Secondary","Background","--sve-button-background-secondary","#ffffff"],["Button Secondary","Text","--sve-button-text-secondary","#332a24"]],z=Array.from({length:31},(r,a)=>12+a*2+"px"),ie=["1.0","1.2","1.5","1.6","1.8","2.0","2.4","2.8","3.0","4.0","5.0"],Y=["100","200","300","400","500","600","700","800","900"],oe=[{key:"display",label:"Display / Hero",size:"56px",weight:"400",lineheight:"1.0"},{key:"heading",label:"Heading",size:"40px",weight:"400",lineheight:"1.2"},{key:"subheading",label:"Subheading / Card Title",size:"26px",weight:"500",lineheight:"1.3"},{key:"body",label:"Body",size:"16px",weight:"400",lineheight:"1.5"},{key:"small",label:"Small / Meta / Label",size:"12px",weight:"500",lineheight:"1.4"},{key:"button",label:"Button / CTA",size:"14px",weight:"700",lineheight:"1.2"}],X=oe.flatMap(r=>[{role:r.key,roleLabel:r.label,label:"Size",variable:"--sve-"+r.key+"-size",fallback:r.size,type:"size"},{role:r.key,roleLabel:r.label,label:"Weight",variable:"--sve-"+r.key+"-weight",fallback:r.weight,type:"weight"},{role:r.key,roleLabel:r.label,label:"Line Height",variable:"--sve-"+r.key+"-line-height",fallback:r.lineheight,type:"lineheight"}]),Te=[{target:"heading",variable:"--sve-font-heading"},{target:"body",variable:"--sve-font-body"}],Je=["cover","opening","quote","couple","stories","savedate","countdown","gallery","videos","events","dress","rundown","rsvp","live","filter","gifts","adab","families","closing","footer"],Bi=new Set(["text","textarea","url","email","tel","number","date","time","datetime","color","select","boolean","image","repeater","repeater-image"]),oi=new Set(["__proto__","prototype","constructor"]),ji=12,Yr=240,Qr=1e4;function ot(r){let a=String(r||"").trim();if(!a||a.length>Yr||a.includes("..")||a.startsWith(".")||a.endsWith("."))return null;let s=a.split(".");if(!s.length||s.length>ji)return null;for(let o of s){if(!o||oi.has(o))return null;if(/^\d+$/.test(o)){let l=Number(o);if(!Number.isSafeInteger(l)||l<0||l>Qr)return null;continue}if(!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(o))return null}return s}let Ft=/data:image\/(?!svg\+xml)[a-z0-9.+-]+;base64,/gi,li=/data:[a-z0-9.+-]+\/[a-z0-9.+-]+[;,][^\s"'`)<>]*/gi,O=4096;function F(r){return Ft.lastIndex=0,Ft.test(String(r||""))}function be(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let l=String(o||"");if(!l)return;Ft.lastIndex=0;let p=0,d=0,x;for(;x=Ft.exec(l);){p+=1;let S=x.index+x[0].length,k=S;for(;k<l.length&&/[A-Za-z0-9+/=]/.test(l[k]);)k+=1;d+=k-S}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(d*.75/1024))})}),a}function Re(r){let a=[];return Object.entries(r||{}).forEach(([s,o])=>{let l=String(o||"");if(!l)return;li.lastIndex=0;let p=0,d=0,x;for(;x=li.exec(l);){let S=x[0].length;S<=O||F(x[0])||(p+=1,d=Math.max(d,S))}p&&a.push({where:s,count:p,approxKb:Math.max(1,Math.round(d/1024))})}),a}function Zr(r){return r.map(a=>a.where+" ("+a.count+"x, \xB1"+a.approxKb+" KB)").join(", ")}let Jr=["default","center center","center left","center right","top center","top left","top right","bottom center","bottom left","bottom right"],Zp={default:"","center center":"center center","center left":"left center","center right":"right center","top center":"center top","top left":"left top","top right":"right top","bottom center":"center bottom","bottom left":"left bottom","bottom right":"right bottom"},ol=["auto","cover","contain"];function Jp(r){return r==="fill"?"cover":r==="fit"?"contain":ol.includes(r)?r:"auto"}function ll(r=""){return`
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
    `}function cl(r){return`
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
    `}function A(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ci(r,a=180){let s;return(...o)=>{clearTimeout(s),s=setTimeout(()=>r(...o),a)}}function Mt(r,a=900){return typeof window.requestIdleCallback=="function"?window.requestIdleCallback(r,{timeout:a}):window.setTimeout(()=>r({didTimeout:!0,timeRemaining:()=>0}),120)}function ul(r){r!=null&&(typeof window.cancelIdleCallback=="function"?window.cancelIdleCallback(r):clearTimeout(r))}function Xe(r){return!!(r&&r.isConnected)}function eh(r){if(!r)return null;try{if(typeof r.getWrapperElement=="function"){let a=r.getWrapperElement();if(a)return a}if(typeof r.getTextArea=="function"){let a=r.getTextArea();if(a)return a.closest?.(".CodeMirror")||a}}catch{}return null}function pl(r){let a=eh(r);return a?Xe(a):!0}function Ot(){let r=u.nativeCache;Object.keys(r).forEach(a=>{r[a]&&!Xe(r[a])&&(r[a]=null)})}function gt(r){return r==null?r:JSON.parse(JSON.stringify(r))}function Dt(r){return String(r||"").replace(/[._-]+/g," ").replace(/([a-z])([A-Z])/g,"$1 $2").replace(/\b\w/g,a=>a.toUpperCase()).trim()}function gx(){}function B(r,a){if(r==null||!a)return;let s=ot(a);if(!s)return;let o=r;for(let l of s){if(o==null)return;let p=/^\d+$/.test(l)?Number(l):l;if(!Object.prototype.hasOwnProperty.call(o,p))return;o=o[p]}return o}function He(r,a,s){let o=ot(a);if(!r||!o)return!1;let l=r;for(let x=0;x<o.length-1;x++){let S=o[x],k=/^\d+$/.test(S)?Number(S):S;if((!Object.prototype.hasOwnProperty.call(l,k)||l[k]===null||l[k]===void 0)&&(l[k]=/^\d+$/.test(o[x+1])?[]:Object.create(null)),typeof l[k]!="object")return!1;l=l[k]}let p=o.at(-1),d=/^\d+$/.test(p)?Number(p):p;return l[d]=s,!0}function Ct(r){let a=String(r||"").trim();if(!a)return"";try{/^https?:\/\//i.test(a)&&(a=new URL(a).pathname.split("/").filter(Boolean).at(-1)||"")}catch{}try{a=decodeURIComponent(a)}catch{}return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"").slice(0,64)}function Xr(r){if(!r||!(r instanceof HTMLInputElement)||r.closest("#"+e))return!1;if(String(r.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")return!0;let s=r;for(let o=0;o<5&&s;o+=1){if(String(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase().includes("slug url"))return!0;s=s.parentElement}return!1}function th(){let r=C('input[type="text"], input:not([type])').filter(a=>Xr(a));return r.length?r.find(a=>String(a.getAttribute("placeholder")||"").trim().toLowerCase()==="nama-halaman")||r[0]:null}function ih(){let r=C("a[href]").filter(a=>!a.closest("#"+e));for(let a of r){let s=a,o="";for(let l=0;l<4&&s;l+=1)o+=" "+String(s.textContent||""),s=s.parentElement;if(/saat\s*ini/i.test(o))try{let l=new URL(a.href,location.href);if(!/\.scalev\.(?:com|id)$/i.test(l.hostname)&&!/scalev\.(?:com|id)$/i.test(l.hostname))continue;let p=l.pathname.split("/").filter(Boolean),d=Ct(p.at(-1)||"");if(d)return d}catch{}}return""}function Et(){let r=th(),a=Ct(r?.value);if(a)return u.scalevSlug=a,a;let s=ih();return s?(u.scalevSlug=s,s):u.scalevSlug||""}function en(r,a){let s=String(a||r?.path||"").trim().toLowerCase(),o=String(r?.label||"").trim().toLowerCase(),l=s.replace(/[^a-z0-9]/g,"");return(s.includes("guestbook")||s.includes("rsvp"))&&l.endsWith("weddingid")||/wedding\s*id/.test(o)}function rh(){let r=new Set;try{ke().forEach(a=>{(a.fields||[]).forEach(s=>{s.type!=="repeater"&&en(s,s.path)&&s.path&&r.add(s.path)})})}catch{}return u.config&&B(u.config,"rsvp.weddingId")!==void 0&&r.add("rsvp.weddingId"),u.config&&B(u.config,"guestbook.weddingId")!==void 0&&r.add("guestbook.weddingId"),Array.from(r)}function tn(r){C('[data-auto-wedding-id="1"]').forEach(a=>{a.value!==r&&(a.value=r),a.setAttribute("readonly","")})}function ui(r,a={}){let s=Ct(r||Et());if(!s)return!1;u.scalevSlug=s;let o=rh();if(!u.config||!o.length)return u.pendingWeddingIdSlug=s,tn(s),!1;let l=!1;if(o.forEach(d=>{B(u.config,d)!==s&&(He(u.config,d,s),l=!0)}),tn(s),!l)return u.pendingWeddingIdSlug="",!1;let p=an().length>0;return a.commit!==!1&&p&&u.configRange?.editor?(u.pendingWeddingIdSlug="",Le(a.silent?void 0:"Wedding ID mengikuti Slug URL"),tn(s),!0):(u.pendingWeddingIdSlug=s,!0)}function hl(){let r=Ct(u.pendingWeddingIdSlug||u.scalevSlug||Et());return r?ui(r,{commit:!0,silent:!0}):!1}let nh=ci(()=>{let r=Et();r&&ui(r,{commit:!0})},450);function Ui(){if(Ot(),Xe(u.nativeCache.save)||Xe(u.nativeCache.publish))return{save:Xe(u.nativeCache.save)?u.nativeCache.save:null,publish:Xe(u.nativeCache.publish)?u.nativeCache.publish:null};let r=C("button").filter(l=>!l.closest("#"+e)),a=l=>(l.textContent||"").replace(/\s+/g," ").trim().toLowerCase(),s=r.find(l=>{let p=a(l);return p==="simpan"||p==="save"})||null,o=r.find(l=>{let p=a(l);return p.includes("simpan & terbitkan")||p.includes("simpan dan terbitkan")||p==="publish"})||null;return u.nativeCache.save=s,u.nativeCache.publish=o,{save:s,publish:o}}function ah(r,a){if(!r)return a?.parentElement||null;if(!a)return r?.parentElement||null;let s=new Set,o=r;for(;o;)s.add(o),o=o.parentElement;for(o=a;o;){if(s.has(o))return o;o=o.parentElement}return null}function dl(r,a){if(Ot(),Xe(u.nativeCache.toolbarHost))return u.nativeCache.toolbarHost;if(r&&a&&r.parentElement===a.parentElement)return u.nativeCache.toolbarHost=r.parentElement,r.parentElement;let s=ah(r,a);if(!s)return r?.parentElement||a?.parentElement||null;let o=s;for(let l=0;l<4&&o;l++,o=o.parentElement){let p=o.getBoundingClientRect?.();if(p&&p.top>=0&&p.top<180&&p.height<110)return u.nativeCache.toolbarHost=o,o}return u.nativeCache.toolbarHost=s,s}function rn(){let r=document.getElementById(e+"-toolbar-toggle");if(!r)return;let a=!!u.open;r.style.setProperty("display",a?"none":"",a?"important":""),r.setAttribute("aria-hidden",a?"true":"false"),r.tabIndex=a?-1:0}function fl(){let{save:r,publish:a}=Ui(),s=a||r;if(!s)return!1;let o=dl(r,a);if(!o)return!1;o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px";let l=document.getElementById(e+"-toolbar-toggle");return l||(l=s.cloneNode(!1),l.id=e+"-toolbar-toggle",l.type="button",l.disabled=!1,l.removeAttribute("disabled"),l.setAttribute("aria-controls",e+"-dock"),l.setAttribute("aria-label","Tampilkan atau sembunyikan Visual Editor"),l.setAttribute("aria-pressed","false"),l.textContent="Visual Editor",l.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),u.open?dh():Vt(!0)})),l.parentElement!==o&&(a&&a.parentElement===o?a.insertAdjacentElement("afterend",l):r&&r.parentElement===o?r.insertAdjacentElement("afterend",l):o.appendChild(l)),l.classList.toggle("sve-toolbar-active",u.open),l.setAttribute("aria-pressed",u.open?"true":"false"),rn(),u.open&&requestAnimationFrame(()=>bl(!0)),!0}function nn(){let a=[document.querySelector("#app"),document.querySelector("#__nuxt"),document.querySelector("[data-v-app]")].filter(Boolean).find(s=>!s.closest("#"+e));return a||Array.from(document.body.children).find(s=>!(!(s instanceof HTMLElement)||s.id===e||s.id===e+"-font-portal"||["SCRIPT","STYLE","LINK"].includes(s.tagName)))||null}function sh(){if(Ot(),Xe(u.nativeCache.globalHeader))return u.nativeCache.globalHeader;let r=C("div").filter(s=>{if(!(s instanceof HTMLElement)||s.closest("#"+e))return!1;let o=getComputedStyle(s),l=s.getBoundingClientRect(),p=(s.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return o.position==="fixed"&&l.top>=-2&&l.top<=4&&l.height>=36&&l.height<=64&&l.width>=window.innerWidth*.7&&p.includes("landing page studio")});if(!r.length)return null;let a=r.sort((s,o)=>{let l=s.getBoundingClientRect(),p=o.getBoundingClientRect();return l.height-p.height||l.top-p.top})[0];return u.nativeCache.globalHeader=a||null,a||null}function Hi(){let r=sh(),s=r?.getBoundingClientRect?.()?.bottom||44;(!Number.isFinite(s)||s<36||s>72)&&(s=44),document.documentElement.style.setProperty("--sve77-global-header-height",Math.round(s)+"px"),r&&r.setAttribute("data-sve77-global-header","1")}function oh(){if(Ot(),Xe(u.nativeCache.workspaceRoot))return u.nativeCache.workspaceRoot;let{save:r,publish:a}=Ui(),s=a||r;if(!s)return nn();let o=s,l=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let d=o.getBoundingClientRect();d.top>=36&&d.top<=130&&d.width>=window.innerWidth*.68&&d.height>=window.innerHeight*.62&&(l=o)}o=o.parentElement}let p=l||nn();return u.nativeCache.workspaceRoot=p||null,p}function lh(){let a=document.getElementById(e+"-dock")?.getBoundingClientRect?.().width||0;return a>0?a:Math.min(400,window.innerWidth*.32)}function ml(r){r&&(r.removeAttribute("data-sve77-page-root"),r.removeAttribute("data-sve77-layout"))}function zi(r){let a=document.querySelector('[data-sve77-page-root="1"]'),s=oh();if(a&&a!==s&&ml(a),s)if(r){let o=getComputedStyle(s),l=(o.position==="fixed"||o.position==="absolute")&&o.left!=="auto";s.setAttribute("data-sve77-page-root","1"),s.setAttribute("data-sve77-layout",l?"positioned":"flow")}else ml(s);document.documentElement.classList.toggle("sve77-panel-open",!!r),requestAnimationFrame(()=>bl(r))}function ch(){if(Ot(),Xe(u.nativeCache.topToolbar))return u.nativeCache.topToolbar;let{save:r,publish:a}=Ui(),s=a||r;if(!s)return null;let o=s,l=null;for(;o&&o!==document.body;){if(o instanceof HTMLElement){let p=getComputedStyle(o),d=o.getBoundingClientRect();if(p.position==="fixed"&&d.top>=36&&d.top<=70&&d.height>=48&&d.height<=92&&d.width>=Math.min(520,window.innerWidth*.42)){l=o;break}}o=o.parentElement}return u.nativeCache.topToolbar=l||null,l}function gl(r){r&&(r.removeAttribute("data-sve77-top-toolbar"),r.style.removeProperty("right"),r.style.removeProperty("transition"),r.style.removeProperty("box-sizing"))}function bl(r){let{save:a,publish:s}=Ui(),o=document.querySelector('[data-sve77-toolbar-host="1"]')||dl(a,s);o&&(o.setAttribute("data-sve77-toolbar-host","1"),o.style.columnGap="8px",o.style.rowGap="8px",o.style.removeProperty("transform"),o.style.removeProperty("transition"));let l=document.querySelector('[data-sve77-top-toolbar="1"]'),p=ch();if(l&&l!==p&&gl(l),!p)return;if(!r){gl(p);return}let d=Math.ceil(lh());p.setAttribute("data-sve77-top-toolbar","1"),p.style.setProperty("right",d+"px","important"),p.style.setProperty("box-sizing","border-box","important"),p.style.setProperty("transition","right .16s ease","important")}function xl(){Mt(()=>{if(u.open)try{let r=Et();r&&ui(r,{commit:!0,silent:!0}),hl()}catch{}},1200)}function yl(){let r=!1;try{(u.sourceDirty||!u.doc)&&(r=_e())}catch{}if(!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))||r)try{ue()}catch{}xl()}function uh(){performance.mark("sve-panel-paint-start"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(u.open){try{Hi(),zi(!0)}catch{}performance.mark("sve-panel-paint-laid-out"),yl(),performance.mark("sve-panel-paint-end"),hh()}})})}function ph(){if(u.prewarmScheduled=!1,u.prewarmHandle=null,u.open){yl();return}performance.mark("sve-prewarm-start");try{(u.sourceDirty||!u.doc)&&_e(),!(u.uiPrepared&&u.renderedTab===(u.tab||"content")&&u.renderedSearch===(u.search||""))&&u.doc&&ue()}catch{}performance.mark("sve-prewarm-end"),xl()}function hh(){try{let r=performance.getEntriesByType("mark");u.performance.firstPaintMarks=r.filter(a=>String(a.name).startsWith("sve-")).map(a=>({name:a.name,startTime:Math.round(a.startTime*100)/100}))}catch{}}function Wi(){u.prewarmScheduled||(u.prewarmScheduled=!0,u.prewarmHandle=Mt(ph,1200))}function Vt(r){if(!r&&!Se())return;u.open=!!r;let a=document.getElementById(e),s=document.getElementById(e+"-toolbar-toggle");if(a?.classList.toggle("open",u.open),s?.classList.toggle("sve-toolbar-active",u.open),s?.setAttribute("aria-pressed",u.open?"true":"false"),rn(),u.open){u.prewarmScheduled&&(ul(u.prewarmHandle),u.prewarmScheduled=!1,u.prewarmHandle=null),uh();return}requestAnimationFrame(()=>{try{zi(!1)}catch{}}),Wi()}function dh(){Vt(!1)}function an(){return[...new Set(C(".CodeMirror").map(r=>r.CodeMirror).filter(Boolean))]}function Gi(){let r=an();if(u.allEditors=r,!r.length)return!1;let a={html:null,css:null,js:null,head:null},s=new Set,o=(k,E,T)=>{!E||a[k]||s.has(E)||T(E.getValue?.()||"")&&(a[k]=E,s.add(E))},l=k=>/<!doctype html|<html[\s>]/i.test(k),p=k=>k.includes("--sve-background-primary")||k.includes("--sve-font-heading")||/^\s*[.#:@*\[a-z][^\n]*\{[^}]*\}/m.test(k),d=k=>k.includes("SVE_SCHEMA")||/\b(?:var|let|const)\s+CONFIG\s*=/.test(k)||/^\s*(?:\(|!|;)?\s*(?:function\b|class\b|import\b|export\b|"use strict"|'use strict')/m.test(k),x=k=>/<meta[\s>]|<link[\s>]|<script[\s>]/i.test(k)&&!l(k);C("label").forEach(k=>{let E=k.querySelector(".CodeMirror")?.CodeMirror;if(!E)return;let _=[...k.querySelectorAll(":scope > span")].map(W=>W.textContent.replace(/\s+/g," ").trim().toLowerCase()).filter(Boolean).pop()||""||(k.querySelector(":scope > span")?.textContent||"").replace(/\s+/g," ").trim().toLowerCase();_==="body html"?o("html",E,l):_==="css"?o("css",E,p):_==="javascript"?o("js",E,d):_.includes("additional head")?o("head",E,x):_.includes("html document")&&o("html",E,l)}),r.forEach(k=>{o("html",k,l),o("css",k,p),o("js",k,d),o("head",k,x)});let S=r.filter(k=>!s.has(k));if(a.html||(a.html=S.shift()||null),a.css||(a.css=S.shift()||null),!a.js){let k=S.find(E=>!l(E.getValue?.()||""));k&&(a.js=k,S.splice(S.indexOf(k),1))}return a.head||(a.head=S.shift()||null),u.editors=a,Vh(),!0}function j(r){return u.editors[r]?.getValue?.()||""}function qi(r,a=!1){if(r)try{r.save?.();let s=r.getTextArea?.();if(s){s.dispatchEvent(new Event("input",{bubbles:!0})),a&&s.dispatchEvent(new Event("change",{bubbles:!0}));return}let o=r._handlers?.change;if(!Array.isArray(o))return;let l={from:{line:0,ch:0},to:{line:0,ch:0},text:[],removed:[],origin:"sve-wake"};o.forEach(p=>{if(!(typeof p!="function"||p.__sve))try{p(r,l)}catch{}})}catch{}}function fh(r,a,s=!1){if(r){u.internalEditorWrite+=1;try{r.operation(()=>{r.setValue(a),r.save?.()}),qi(r,s),r.refresh?.()}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}Ji(),$l()}}function lt(r,a){fh(u.editors[r],a)}function mh(){return new URL(n.endpoint)}function gh(r,a=!1){try{let s=new URL(String(r||""));return s.protocol!=="https:"||!a&&s.origin!==mh().origin?"":s.href}catch{return""}}function bh(r){if(!r||typeof r!="object")return null;let a=String(r.id||"").trim(),s=String(r.name||"").trim();return!/^[a-z0-9][a-z0-9-]{1,63}$/.test(a)||!s?null:{id:a,name:s.slice(0,120),version:String(r.version||"").trim().slice(0,32),commissionRate:Number.isFinite(Number(r.commission_rate))?Number(r.commission_rate):60,sourceUrl:gh(r.source_url||r.sourceUrl)}}function xh(r){return(Array.isArray(r)?r:Array.isArray(r?.templates)?r.templates:[]).map(bh).filter(Boolean)}async function yh(r,a={}){let s=new AbortController,o=window.setTimeout(()=>s.abort(),n.timeoutMs);try{return await fetch(r,{...a,signal:s.signal,credentials:"omit",cache:"no-store"})}finally{window.clearTimeout(o)}}function vh(r,a={}){if(typeof GM_xmlhttpRequest!="function")return null;let s=a.method||"GET";return new Promise((o,l)=>{GM_xmlhttpRequest({method:s,url:r,data:a.body,headers:a.headers||{},timeout:n.timeoutMs,onload:p=>{let d=Number(p.status),x=Number.isInteger(d)&&d>=200&&d<=599?d:200,S=String(p.statusText||"").replace(/[\r\n]+/g," ").slice(0,100),k=String(p.responseHeaders||"").match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim()||"text/plain";o(new Response(p.responseText||"",{status:x,statusText:S,headers:{"Content-Type":k}}))},ontimeout:()=>l(new DOMException("The operation timed out","AbortError")),onerror:()=>l(new TypeError("Userscript request failed"))})})}async function sn(r,a={}){if(typeof GM_xmlhttpRequest=="function")try{return await vh(r,a)}catch{}return await yh(r,a)}async function vl(r=!1){let a=u.templateLibrary;if(!r&&a.status==="ready"&&a.loadedAt&&Date.now()-a.loadedAt<3e5)return a.templates;a.status="loading",a.error="";try{let s=await sn(n.endpoint,{headers:{Accept:"application/json"}}),o=await s.json().catch(()=>null);if(!s.ok)throw new Error(o?.error||"HTTP "+s.status);let l=xh(o);if(!l.length)throw new Error("Library belum memiliki template aktif");return a.templates=l,a.loadedAt=Date.now(),a.status="ready",l}catch(s){return a.templates=[],a.status="error",a.error=s?.name==="AbortError"?"Library timeout":String(s?.message||"Library belum bisa dimuat"),a.templates}}function kh(){return C('button, [role="tab"]').find(r=>{if(r.closest("#"+e))return!1;let a=String(r.textContent||"").replace(/\s+/g," ").trim().toLowerCase();return a==="kode"||a==="code"||a.includes("kode html")})||null}async function Sh(){if(Gi()&&u.editors.html)return!0;kh()?.click();let r=Date.now();for(;Date.now()-r<2200;)if(await new Promise(a=>window.setTimeout(a,120)),Gi()&&u.editors.html)return!0;return!1}function wh(r){return Yp(r,a=>new DOMParser().parseFromString(a,"text/html"))}function bx(r,a){let s=String(a||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp("(?:var|let|const)\\s+"+s+"\\s*=\\s*\\{").exec(r);if(!o)return null;let l=kl(r,r.indexOf("{",o.index));if(!l)return null;try{return Sl(l.text)}catch{return null}}function Ch(){let r=C('input[type="file"]').filter(s=>{if(s.closest("#"+e))return!1;let o=String(s.getAttribute("accept")||"").toLowerCase();return!(!o.includes("html")&&!o.includes("text/html"))});return r.filter(s=>{let o=s,l="";for(let p=0;p<5&&o;p+=1,o=o.parentElement)l+=" "+String(o.textContent||"");return/upload\s+file|import\s+html|unggah\s+file/i.test(l)})[0]||r[0]||null}function Eh(r){let a=Ch();if(!a)throw new Error("Input native Upload File belum terlihat");if(typeof DataTransfer!="function")throw new Error("Browser tidak mendukung file handoff native");let s=new DataTransfer;s.items.add(r),a.files=s.files,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0}))}function Bt(r){let a=["style","audio","compatibility"],s=r||"content",o=u.uiPrepared&&u.tab===s&&u.renderedSearch===(u.search||"");u.tab=s,u.uiPrepared=!1;let l=document.getElementById(e);if(C(".tab",l).forEach(p=>{p.classList.toggle("active",p.dataset.tab===r)}),o){u.uiPrepared=!0,u.performance.skippedTabRenders+=1;return}ue()}async function Ah(r,a,s){if(!Se())throw new Error(u.commitError||"Selesaikan perubahan konten terlebih dahulu");let o=u.templateLibrary,l=wh(await r.text());if(l.blockers.length)throw console.error("[SVE] Template library validation failed",l.blockers),new Error(l.blockers[0]);if(!await Sh())throw new Error("Buka tab Kode terlebih dahulu");let p={html:j("html"),css:j("css"),js:j("js"),head:j("head")};Eh(r);let d=Date.now(),x=!1;for(;Date.now()-d<4500;){await new Promise(E=>window.setTimeout(E,140)),Gi();let S=j("html"),k=j("js");if(S!==p.html||k!==p.js){x=!0;break}}if(!x)throw new Error("Scalev belum menyelesaikan import file");o.previousSource=p,o.importedId=a||"local-import",o.importedName=s||r.name||"Template lokal",_e(),ze(),Bt("content")}async function Th(r){let a=u.templateLibrary,s=a.templates.find(l=>l.id===r),o=l=>{a.previousSource=null,a.importedId="",a.importedName="",a.status="error",a.error=l,u.uiPrepared=!1,ue()};if(!s){o("Template tidak ditemukan");return}if(!s.sourceUrl){o("Source template belum tersedia");return}a.status="loading",a.error="",u.uiPrepared=!1,ue();try{console.log("[SVE] Import template:",s.id,s.sourceUrl);let l=await sn(s.sourceUrl,{headers:{Accept:"text/html"}});if(console.log("[SVE] Fetch response:",l.status),!l.ok)throw new Error("HTTP "+l.status);let p=await l.text();console.log("[SVE] Source length:",p.length);let d=s.id.replace(/[^a-z0-9-]+/gi,"-")+".html",x=new File([p],d,{type:"text/html"});await Ah(x,s.id,s.name),a.error="",a.status="ready",Bt("content")}catch(l){console.error("[SVE] Import gagal:",l),o("Import gagal: "+String(l?.message||"source tidak terbaca"))}}function xx(){let r=u.templateLibrary.previousSource;r&&Se()&&(lt("html",r.html),lt("css",r.css),lt("js",r.js),lt("head",r.head),u.templateLibrary.previousSource=null,u.templateLibrary.importedId="",u.templateLibrary.importedName="",_e(),ze(),Bt("library"))}function _h(){let r=u.templateLibrary;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentStateDirty=!1,["html","css","js","head"].forEach(a=>{lt(a,"")}),r.previousSource=null,r.importedId="",r.importedName="",u.sourceDirty=!0,_e(),ze(),u.uiPrepared=!1,ue()}function kl(r,a){let s=0,o=null,l=!1,p=!1,d=!1;for(let x=a;x<r.length;x++){let S=r[x],k=r[x+1];if(p){S===`
`&&(p=!1);continue}if(d){S==="*"&&k==="/"&&(d=!1,x++);continue}if(o){if(l){l=!1;continue}if(S==="\\"){l=!0;continue}S===o&&(o=null);continue}if(S==="/"&&k==="/"){p=!0,x++;continue}if(S==="/"&&k==="*"){d=!0,x++;continue}if(S==='"'||S==="'"||S==="`"){o=S;continue}if(S==="{")s++;else if(S==="}"&&(s--,s===0))return{start:a,end:x+1,text:r.slice(a,x+1)}}return null}function Sl(r){let a=0,s=T=>{throw new Error(T+" @"+a)};function o(){for(;a<r.length;){let T=r[a],_=r[a+1];if(/\s/.test(T)){a++;continue}if(T==="/"&&_==="/"){for(a+=2;a<r.length&&r[a]!==`
`;)a++;continue}if(T==="/"&&_==="*"){for(a+=2;a<r.length&&!(r[a]==="*"&&r[a+1]==="/");)a++;a+=2;continue}break}}function l(){let T=r[a++],_="";for(;a<r.length;){let W=r[a++];if(W===T)return _;if(W!=="\\"){_+=W;continue}let pe=r[a++],At={n:`
`,r:"\r",t:"	","\\":"\\","'":"'",'"':'"',"`":"`"};_+=Object.prototype.hasOwnProperty.call(At,pe)?At[pe]:pe}s("String belum ditutup")}function p(){o();let T=a;for(/[A-Za-z_$]/.test(r[a]||"")||s("Identifier invalid"),a++;a<r.length&&/[A-Za-z0-9_$]/.test(r[a]);)a++;return r.slice(T,a)}function d(){let T=r.slice(a).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);return T||s("Number invalid"),a+=T[0].length,Number(T[0])}function x(){let T=[];if(a++,o(),r[a]==="]")return a++,T;for(;a<r.length;)if(T.push(k()),o(),r[a]==="]"||(r[a]!==","&&s("Koma array hilang"),a++,o(),r[a]==="]"))return a++,T;s("Array belum selesai")}function S(){let T=Object.create(null);if(a++,o(),r[a]==="}")return a++,T;for(;a<r.length;){o();let _=['"',"'","`"].includes(r[a])?l():p();if(o(),oi.has(_)&&s("Object key terlarang: "+_),Object.prototype.hasOwnProperty.call(T,_)&&s("Duplicate object key: "+_),r[a]!==":"&&s("Titik dua hilang"),a++,T[_]=k(),o(),r[a]==="}"||(r[a]!==","&&s("Koma object hilang"),a++,o(),r[a]==="}"))return a++,T}s("Object belum selesai")}function k(){o();let T=r[a];if(T==="{")return S();if(T==="[")return x();if(['"',"'","`"].includes(T))return l();if(T==="-"||/\d/.test(T||""))return d();let _=p();if(_==="true")return!0;if(_==="false")return!1;if(_==="null")return null;_==="undefined"&&s("undefined tidak diizinkan pada strict object"),s("Value non-static: "+_)}let E=k();return o(),E}function on(r){let a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),s=new RegExp("(?:(?:var|let|const)\\s+"+a+"|(?:window|globalThis)\\."+a+")\\s*=\\s*\\{"),o=[];function l(p,d){!p||o.some(x=>x.editor===p)||o.push({editor:p,kind:d})}l(u.editors.js,"js"),l(u.editors.html,"html"),l(u.editors.head,"head"),u.allEditors.forEach(p=>l(p,"unknown"));for(let p of o){let d=p.editor.getValue?.()||"",x=s.exec(d);if(!x)continue;let S=d.indexOf("{",x.index),k=kl(d,S);if(k)try{return{kind:p.kind,editor:p.editor,obj:Sl(k.text),start:k.start,end:k.end}}catch(E){console.error("[SVE] parse "+r+" gagal",E)}}return null}function Lh(){if(!u.doc)return null;let r=[];return C("[data-sve-section]",u.doc).forEach((a,s)=>{let o=[],l=new Set;C("[data-sve-field]",a).forEach(d=>{let x=d.getAttribute("data-sve-field");!x||l.has(x)||(l.add(x),o.push({type:d.getAttribute("data-sve-type")||"text",label:d.getAttribute("data-sve-label")||Dt(x),path:x}))});let p=a.getAttribute("data-sve-countdown-path");p&&!l.has(p)&&o.push({type:"datetime",label:"Waktu Tujuan",path:p}),r.push({id:a.id||"section-"+s,label:a.getAttribute("data-sve-section")||Dt(a.id)||"Section "+(s+1),visiblePath:a.getAttribute("data-sve-visible-path")||null,canHide:!!a.getAttribute("data-sve-visible-path"),reorderable:(a.getAttribute("data-section-id")||a.id||"")!=="cover",locked:!1,fields:o})}),r.length?{template:{name:"HTML Schema Fallback"},sections:r,music:{label:"Background Music",path:"assets.music"}}:null}function Ki(){return u.schema?u.schema:(u.fallbackSchemaReady||(u.fallbackSchemaCache=Lh(),u.fallbackSchemaReady=!0),u.fallbackSchemaCache)}function ke(){let r=Ki();return Array.isArray(r?.sections)?r.sections:[]}function Z(r){return String(r?.id||"").trim()}function jt(r){let a=Z(r);return!(!a||a==="cover"||r?.locked===!0||r?.reorderable===!1)}function Yi(){let a=ke().map(Z).filter(Boolean);if(!a.length)return[];let s=new Set(a),o=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder.map(p=>String(p||"").trim()).filter(p=>p&&s.has(p)):[],l=[];return s.has("cover")&&l.push("cover"),o.forEach(p=>{p!=="cover"&&!l.includes(p)&&l.push(p)}),a.forEach(p=>{l.includes(p)||l.push(p)}),l}function pi(){let r=ke(),a=new Map(r.map(s=>[Z(s),s]));return Yi().map(s=>a.get(s)).filter(Boolean)}function Qi(r,a){let s=String(r||"").trim(),o=ke().find(x=>Z(x)===s);if(!o||!jt(o))return!1;let l=Yi(),p=l.indexOf(s);if(p<0)return!1;let d=p+a;for(;d>=0&&d<l.length;){let x=l[d],S=ke().find(k=>Z(k)===x);if(x!=="cover"&&!S?.locked)return!0;d+=a}return!1}function wl(r){if(!u.config)return!1;let a=ke(),s=new Set(a.map(Z).filter(Boolean)),o=[];return s.has("cover")&&o.push("cover"),(Array.isArray(r)?r:[]).map(l=>String(l||"").trim()).filter(l=>l&&s.has(l)&&l!=="cover").forEach(l=>{o.includes(l)||o.push(l)}),a.map(Z).filter(Boolean).forEach(l=>{o.includes(l)||o.push(l)}),u.config.sectionOrder=o,!0}function Ih(r=document){C("[data-section-card]",r).forEach(a=>{let s=a.dataset.sectionCard,o=w("[data-section-up]",a),l=w("[data-section-down]",a);o&&(o.disabled=!Qi(s,-1)),l&&(l.disabled=!Qi(s,1))})}function $h(r,a){if(!r)return;r.classList.remove("section-reordered","section-reordered-up","section-reordered-down"),r.offsetWidth,r.classList.add("section-reordered",a==="up"?"section-reordered-up":"section-reordered-down");let s=()=>{r.classList.remove("section-reordered","section-reordered-up","section-reordered-down")};r.addEventListener("animationend",s,{once:!0}),setTimeout(s,420)}function Cl(r,a,s){let o=w("#"+e+"-body");if(!o)return;let l=w(".reset-zone",o),p=new Map(C("[data-section-card]",o).map(d=>[d.dataset.sectionCard,d]));r.forEach(d=>{let x=p.get(d);x&&(l?o.insertBefore(x,l):o.appendChild(x))}),Ih(o),$h(p.get(a),s)}function El(r,a){let s=String(r||"").trim(),o=ke().find(S=>Z(S)===s);if(!o||!jt(o))return;let l=Yi(),p=l.indexOf(s);if(p<0)return;let d=p+a;for(;d>=0&&d<l.length;){let S=l[d],k=ke().find(E=>Z(E)===S);if(S!=="cover"&&!k?.locked)break;d+=a}if(d<0||d>=l.length||l[d]==="cover")return;let[x]=l.splice(p,1);l.splice(d,0,x),wl(l),Le("Urutan section diperbarui"),Cl(l,s,a<0?"up":"down")}function Ph(r,a,s){let o=String(r||"").trim(),l=String(a||"").trim();if(!o||!l||o===l)return;let p=ke(),d=p.find(pe=>Z(pe)===o),x=p.find(pe=>Z(pe)===l);if(!d||!x||!jt(d))return;let S=s==="after"?"after":"before";if(l==="cover")S="after";else if(!jt(x))return;let k=Yi(),E=k.indexOf(o);if(E<0)return;k.splice(E,1);let T=k.indexOf(l);if(T<0)return;let _=T+(S==="after"?1:0);k[0]==="cover"&&(_=Math.max(1,_)),_=Math.min(k.length,_),k.splice(_,0,o);let W=k.indexOf(o);wl(k),Le("Urutan section diperbarui"),Cl(k,o,W<E?"up":"down")}function Al(){let r=Ki();return r?.audio?r.audio:r?.music?r.music:{label:"Audio Undangan",path:"assets.audio"}}function _e(){if(u.contentStateDirty&&!Se())return!1;if(u.lastSerializedConfig="",!Gi())return u.sourceDirty=!0,!1;Mt(()=>{try{md()&&(u.sourceDirty=!0)}catch{}},200),u.doc=new DOMParser().parseFromString(j("html"),"text/html");let r=u.doc.querySelector("[data-sve-template]")||u.doc.querySelector("main[id]")||u.doc.body.firstElementChild;u.rootSelector=r?.id?"#"+r.id:":root";let a=on("CONFIG");u.config=a?.obj||null,u.configRange=a||null,u.configSourceText=a?a.editor.getValue().slice(a.start,a.end):"",u.configOwnerSource=a?a.editor.getValue():"";let s=on("SVE_SCHEMA");return u.schema=s?.obj||null,u.contentSearchIndex=null,u.contentFieldCache=new WeakMap,u.repeaterContentFieldCache=new WeakMap,u.fallbackSchemaCache=null,u.fallbackSchemaReady=!1,u.contentSectionHtmlCache.clear(),u.contentPrewarmCursor=0,u.contentPrewarmScheduled&&(ul(u.contentPrewarmHandle),u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null),Mh(),u.sourceDirty=!1,u.uiPrepared=!1,!0}function Le(r){return hi(r,{deferPreview:!0,syncImages:!0})?(_e(),!0):!1}function Zi(r){return hi(r,{deferPreview:!0,syncImages:!0})}function Nh(r,a){let s=r._handlers?.change;if(!Array.isArray(s))return a();let o=[];s.forEach((l,p)=>{l?.__sve||(o.push([p,l]),s[p]=()=>{})});try{return a()}finally{o.forEach(([l,p])=>{Array.isArray(s)&&(s[l]=p)})}}function hi(r,a={}){if(!u.config||!u.configRange?.editor)return!1;let s=Kd(u.config);if(s.length)return di(s[0]),!1;let l=u.configRange.editor.getValue()===u.configOwnerSource?u.configRange:on("CONFIG");if(!l||l.editor!==u.configRange.editor)return di("CONFIG berpindah atau tidak terbaca. Periksa source sebelum melanjutkan."),!1;let p=l.editor;if(!pl(p)){let T=u.config,_=_e(),W=u.configRange?.editor;return!_||!pl(W)?(di("Editor Scalev sudah dimuat ulang. Muat ulang panel (tombol Muat ulang source) lalu ulangi perubahan."),!1):(u.config=T,hi(r,a))}let d=p.getValue();if(d.slice(l.start,l.end)!==u.configSourceText)return di("CONFIG berubah di editor kode. Muat ulang panel setelah menyelesaikan perubahan source."),!1;let x=JSON.stringify(u.config,null,2).replace(/</g,"\\u003c");if(x===u.configSourceText)return u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),!0;let S=null,k=a.wakeScalev!==!0&&Ut.supported()===!0;try{u.internalEditorWrite+=1;let T=()=>p.operation(()=>{if(typeof p.replaceRange=="function"&&typeof p.posFromIndex=="function")p.replaceRange(x,p.posFromIndex(l.start),p.posFromIndex(l.end));else{let _=p.getValue?.()||"",W=_.slice(0,l.start)+x+_.slice(l.end);p.setValue(W)}p.save?.()});k?Nh(p,T):T(),(a.wakeScalev||!k)&&qi(p,!1)}catch(T){S=T}finally{u.internalEditorWrite=Math.max(0,u.internalEditorWrite-1)}if(S){u.internalEditorWrite+=1;try{p.getValue()!==d&&p.setValue(d),qi(p,!1)}catch{}finally{u.internalEditorWrite-=1}return di("Perubahan belum tersimpan: "+S.message),!1}l.end=l.start+x.length,l.obj=u.config,u.configRange=l,u.configSourceText=x,u.configOwnerSource=p.getValue();let E=Ut.fromScalevSource(p.getValue());return u.lastSerializedConfig=x,u.sourceDirty=!1,u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice")?.setAttribute("hidden",""),Ji(),u.performance.configCommitCount=(u.performance.configCommitCount||0)+1,Oh(),E&&!a.syncImages?u.performance.previewViaScalevCount=(u.performance.previewViaScalevCount||0)+1:a.deferPreview?Qh({syncImages:!!a.syncImages}):ze({syncImages:!!a.syncImages}),!0}function di(r){u.commitError=r,u.contentStateDirty=!0;let a=document.getElementById(e+"-commit-notice");a&&(a.hidden=!1,a.querySelector("p").textContent=r);let s=document.getElementById(e+"-update-status");s&&(s.textContent=r)}function Ji(){u.managedSources=Object.fromEntries(["html","css","js","head"].map(r=>[r,j(r)]))}function Tl(){return e+":fresh-default:"+location.origin+location.pathname}function ln(){let r=j("js"),a=u.configRange,s=a&&a.editor&&typeof a.start=="number"&&typeof a.end=="number"&&a.start<=a.end?r.slice(0,a.start)+"\u241F"+r.slice(a.end):r,o=["html",j("html"),"css",j("css"),"js",s,"head",j("head")].join("\u241E"),l=2166136261;for(let p=0;p<o.length;p++)l^=o.charCodeAt(p),l=Math.imul(l,16777619);return(l>>>0).toString(16).padStart(8,"0")}function Rh(){let r={};return I.forEach(([,,a])=>{let s=xe(a);s&&(r[a]=s)}),X.forEach(a=>{r[a.variable]=xe(a.variable)||a.fallback}),Te.forEach(({variable:a})=>{let s=xe(a);s&&(r[a]=s)}),{version:t,config:u.config?gt(u.config):null,cssTokens:r,googleFonts:gt(B(u.config,"editorStyle.googleFonts")||{})}}function _l(){try{let r=JSON.parse(localStorage.getItem(Tl())||"null");return r&&typeof r=="object"?r:null}catch{return null}}function Ll(r){try{localStorage.setItem(Tl(),JSON.stringify(r))}catch{}}function Il(){if(!u.config)return!1;let r=ln(),a=Rh();return u.defaults=a,u.defaultConfig=gt(a.config||u.config),u.baselineFingerprint=r,u.lastManagedFingerprint=r,Ji(),Ll({version:t,defaults:a,baselineFingerprint:r,lastManagedFingerprint:r}),!0}function Fh(r){let a=r?.cssTokens;return!a||typeof a!="object"?!1:Te.every(({variable:s})=>typeof a[s]=="string"&&a[s].trim()!=="")}function Mh(){if(!u.config||u.defaults&&u.managedSources&&Object.entries(u.managedSources).every(([s,o])=>j(s)===o))return;let r=ln(),a=_l();if(a?.defaults&&a.lastManagedFingerprint===r&&Fh(a.defaults)){u.defaults=a.defaults,u.defaultConfig=gt(a.defaults.config||u.config),u.baselineFingerprint=a.baselineFingerprint||r,u.lastManagedFingerprint=r,Ji();return}Il()}function $l(){if(!u.defaults||u.managedSources&&!Object.entries(u.managedSources).every(([s,o])=>j(s)===o))return;let r=ln(),a=_l()||{};u.lastManagedFingerprint=r,Ll({version:t,defaults:a.defaults||u.defaults,baselineFingerprint:a.baselineFingerprint||u.baselineFingerprint||r,lastManagedFingerprint:r})}let Oh=ci($l,700);function Dh(){clearTimeout(u.freshBaselineTimer),u.freshBaselineTimer=setTimeout(()=>{if(!u.internalEditorWrite)try{_e(),Il(),u.open?ue():Wi()}catch{}},420)}function Vh(){u.allEditors.forEach(r=>{if(!r||u.editorChangeBound.has(r)||typeof r.on!="function")return;u.editorChangeBound.add(r);let a=()=>{u.internalEditorWrite||(u.sourceDirty=!0,u.uiPrepared=!1,Dh())};a.__sve=!0,r.on("change",a)})}function yx(r){u.defaultConfig&&(He(u.config,r,gt(B(u.defaultConfig,r))),Le("Berhasil direset"),ue())}let Bh="https://wedding-guestbook.nikahin.workers.dev/admin/reveal",jh="https://nikahin.myscalev.com/dashboard",cn="nikahin_team_key";function Uh(){try{return typeof GM_getValue!="function"?"":String(GM_getValue(cn,"")||"").trim()}catch{return""}}function Hh(r){try{return typeof GM_setValue!="function"?!1:(GM_setValue(cn,String(r||"").trim()),!0)}catch{return!1}}function zh(){try{return typeof GM_setValue!="function"?!1:(GM_setValue(cn,""),!0)}catch{return!1}}let Wh={unauthorized:"Kunci tim salah. Perbaiki lalu coba lagi.",team_key_not_configured:"Worker belum punya TEAM_KEY.",pin_secret_not_configured:"Worker belum punya PIN_SECRET.",pin_set_manually:"PIN undangan ini diatur manual. Pakai Buat PIN baru kalau memang ingin menggantinya.",invalid_wedding_id:"Slug undangan tidak valid.",rate_limited:"Terlalu sering. Tunggu beberapa menit."};function un(){return Ct(u.scalevSlug||Et())||""}async function pn(r){let a=u.dashboardPin;if(a.busy)return;let s=un();if(!s){a.status="error",a.message="Slug URL belum diisi di Pengaturan Scalev.",ct();return}let o=Uh();if(!o){a.status="needkey",a.message="",ct();return}if(!(r==="generate"&&a.pin&&!window.confirm("Buat PIN baru untuk "+s+`?

PIN lama langsung tidak berlaku. Kalau sudah dikirim ke klien, PIN baru ini harus dikirim ulang.`))){a.busy=!0,a.status="loading",a.message="",ct();try{let p=await(await sn(Bh,{method:"POST",headers:{"Content-Type":"application/json","x-team-key":o},body:JSON.stringify({weddingId:s,mode:r==="generate"?"generate":"peek"})})).json();!p||p.ok!==!0?(a.status="error",a.pin="",a.message=Wh[p&&p.error]||"Gagal mengambil PIN."):(a.status="ready",a.slug=s,a.pin=String(p.pin||""),a.version=Number(p.version)||0,a.message=p.regenerated?"PIN baru dibuat. Kirim ulang ke klien.":"")}catch{a.status="error",a.pin="",a.message="Tidak bisa menghubungi server."}a.busy=!1,ct()}}function Gh(){let r=w("#"+e+"-team-key"),a=r?r.value.trim():"",s=u.dashboardPin;if(!a){s.message="Kunci tim belum diisi.",ct();return}if(!Hh(a)){s.message="Tampermonkey menolak menyimpan kunci.",ct();return}s.status="idle",s.message="",pn("peek")}function qh(){let r=u.dashboardPin;if(!zh()){r.message="Tampermonkey menolak menghapus kunci.",ct();return}r.status="needkey",r.pin="",r.version=0,r.message="",ct()}async function Kh(){let r=u.dashboardPin;if(r.pin){try{await navigator.clipboard.writeText(r.pin),r.message="PIN tersalin."}catch{r.message="Gagal menyalin. Salin manual dari kolom PIN."}ct()}}function ct(){let r=document.activeElement?.id,a=w("#"+e+"-pin-panel");a&&(a.innerHTML=Pl());let s=w("#"+e+"-pin-pill");s&&(s.outerHTML=zl()),r?.startsWith(e+"-pin-")&&document.getElementById(r)?.focus({preventScroll:!0})}function Pl(){let r=u.dashboardPin,a=un(),s=d=>d?`<small class="auto-wedding-id-note">${A(d)}</small>`:"";if(!a)return`
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
            href="${jh}"
            target="_blank"
            rel="noreferrer"
          >
            Dashboard
          </a>
        </div>
        ${s(r.message)}
      </div>
    `}function Yh(){let r=u.defaults?.config;if(!r||!u.config)return 0;let a=0,s=(o,l,p)=>{if(!(p>6)){if(Array.isArray(o)||Array.isArray(l)){let d=Array.isArray(o)?o:[],x=Array.isArray(l)?l:[],S=Math.max(d.length,x.length);for(let k=0;k<S;k+=1)s(d[k],x[k],p+1);return}if(o&&l&&typeof o=="object"&&typeof l=="object"){for(let d of new Set([...Object.keys(o),...Object.keys(l)]))s(o[d],l[d],p+1);return}o!==l&&(a+=1)}};return s(u.config,r,0),a}function Nl(){u.defaults&&(u.defaults.config&&(u.config=gt(u.defaults.config),Le()),Object.entries(u.defaults.cssTokens||{}).forEach(([r,a])=>{a&&Fe(r,a)}),ec(),Le(),ar(),_e(),ue(),ze())}function Qh({syncImages:r=!1}={}){ze({syncImages:r})}let Ut=Qp({document,window,getConfig:()=>u.config,syncImages:gd,metrics:u.performance});function ze({syncImages:r=!1,force:a=!1}={}){Ut.request({images:r,force:a})}function Zh(r){if(!r)return"";let a=new Date(r);if(Number.isNaN(a.getTime()))return"";let s=o=>String(o).padStart(2,"0");return a.getFullYear()+"-"+s(a.getMonth()+1)+"-"+s(a.getDate())+"T"+s(a.getHours())+":"+s(a.getMinutes())}function Jh(r){if(!r)return"";let a=new Date(r),s=p=>String(p).padStart(2,"0"),o=-a.getTimezoneOffset(),l=o>=0?"+":"-";return r+":00"+l+s(Math.floor(Math.abs(o)/60))+":"+s(Math.abs(o)%60)}function xe(r,a){let s=a?[a]:[hn()],o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(o+"\\s*:\\s*([^;{}]+);");for(let p of s){let d=l.exec(p||"");if(d)return d[1].trim()}return""}function fi(r,a){let s=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(s+"\\s*:\\s*[^;{}]+;").test(r||"")}function hn(){let r=[],a=j("css");return a&&r.push(a),[j("html"),j("head")].forEach(s=>{let o=String(s||""),l=/<style\b[^>]*>([\s\S]*?)<\/style>/gi,p;for(;p=l.exec(o);)p[1]&&r.push(p[1])}),r.join(`
`)}function Xh(r){let a=String(r||"").trim(),s=a.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(s){let l=s[1];l.length===3&&(l=l.split("").map(d=>d+d).join(""));let p=parseInt(l,16);return[p>>16&255,p>>8&255,p&255].join(", ")}let o=a.match(/^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/i);return o?[o[1],o[2],o[3]].join(", "):""}function Rl(r,a,s){let o=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp("("+o+"\\s*:\\s*)([^;{}]+)(;)","g");return String(r||"").replace(l,"$1"+s+"$3")}function Fl(r,a){let s=o=>{if(o)try{o.documentElement?.style?.setProperty(r,a),o.body?.style?.setProperty(r,a),o.querySelector("[data-sve-template]")?.style?.setProperty(r,a)}catch{}};C("iframe").forEach(o=>{try{s(o.contentDocument)}catch{}})}function Fe(r,a){let s=["css","head","html"],o=null;for(let S of s)if(fi(j(S),r)){o=S;break}if(!o)return!1;let l=j(o),p=Rl(l,r,a),d=r+"-rgb",x=Xh(a);return x&&fi(l,d)&&(p=Rl(p,d,x)),p===l?!1:(lt(o,p),Fl(r,a),x&&fi(l,d)&&Fl(d,x),ze(),!0)}function Xi(r){return String(u.defaults?.cssTokens?.[r]||"").trim()}function le(r){let a=String(r?.type||"text").trim().toLowerCase();return a==="datetime-local"?"datetime":a==="checkbox"?"boolean":a}function ed(r,a){return r?.readOnly===!0||r?.readonly===!0||r?.locked===!0||en(r,a)}function Ml(r){if(r&&Object.prototype.hasOwnProperty.call(r,"default"))return gt(r.default);let a=le(r);return a==="boolean"?!1:""}function td(r){return(Array.isArray(r?.options)?r.options:[]).map(s=>{if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s.value??s.id??s.key??"";return{value:String(o),label:String(s.label??s.name??o)}}return{value:String(s??""),label:String(s??"")}})}function id(r){let a=[];return["min","max","step","maxlength","minlength","pattern"].forEach(s=>{r?.[s]!==void 0&&r?.[s]!==null&&String(r[s])!==""&&a.push(`${s}="${A(r[s])}"`)}),r?.placeholder&&a.push(`placeholder="${A(r.placeholder)}"`),a.join(" ")}function rd(r){let a=String(r?.help||r?.description||"").trim();return a?`
        <small class="field-help">
          ${A(a)}
        </small>
      `:""}function nd(r,a){let s=B(u.config,a),o=le(r),l=en(r,a),p=ed(r,a),d=l?Et()||s||"":s??"",x=`data-field-path="${A(a)}" data-field-type="${A(o)}" aria-label="${A(r?.label||a)}" `+(p?'data-field-readonly="1" ':""),S=id(r);if(o==="textarea")return`
        <textarea
          class="content-control content-control-textarea"
          ${x}
          ${S}
          ${p?'readonly aria-readonly="true"':""}
        >${A(d)}</textarea>
        ${l?`
              <small class="auto-wedding-id-note">
                Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
              </small>
            `:""}
      `;if(o==="select"){let E=td(r);return`
        <select
          class="content-control content-control-select"
          ${x}
          ${p?'disabled aria-disabled="true"':""}
        >
          ${r?.placeholder?`
                <option
                  value=""
                  ${String(d??"")===""?"selected":""}
                >
                  ${A(r.placeholder)}
                </option>
              `:""}

          ${E.map(T=>`
              <option
                value="${A(T.value)}"
                ${String(d??"")===T.value?"selected":""}
              >
                ${A(T.label)}
              </option>
            `).join("")}
        </select>
      `}if(o==="boolean")return`
        <label class="boolean-field">
          <input
            type="checkbox"
            ${x}
            ${d===!0?"checked":""}
            ${p?'disabled aria-disabled="true"':""}
          >

          <span>
            ${A(r?.trueLabel||r?.toggleLabel||"Aktif")}
          </span>
        </label>
      `;if(o==="datetime")return`
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${x}
          ${S}
          value="${A(Zh(d))}"
          ${p?'readonly aria-readonly="true"':""}
        >
      `;if(o==="url")return`
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${x}
            ${S}
            value="${A(d)}"
            ${p?'readonly aria-readonly="true"':""}
          >
        </div>
      `;let k=["email","tel","number","date","time","color"].includes(o)?o:"text";return`
      <input
        class="content-control content-control-${k}"
        type="${k}"
        ${x}
        ${S}
        ${l?'data-auto-wedding-id="1"':""}
        value="${A(d)}"
        ${p?'readonly aria-readonly="true"':""}
      >
      ${l?`
            <small class="auto-wedding-id-note">
              Terkunci \xB7 otomatis mengikuti Pengaturan \u2192 Slug URL
            </small>
          `:""}
    `}function Ol(r,a){let s=a||r.path,o=A(r.label||s);return`
      <div class="field">
        ${r.hideVisibleLabel?`<span class="content-field-label-sr">${o}</span>`:`<label>${o}</label>`}

        ${nd(r,s)}

        ${rd(r)}
      </div>
    `}function mi(r){if(!r)return!1;if(r.type==="image"||r.type==="repeater-image"||r.media==="image"||r.kind==="image")return!0;let a=String(r.key||(r.path?r.path.split(".").pop():"")).trim().toLowerCase();if(new Set(["image","img","photo","foto","picture","gambar","art","avatar","logo","thumbnail","thumb","poster","coverphoto","covercard","qr","qris","src"]).has(a))return!0;let o=String(r.label||"").trim().toLowerCase();return/(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i.test(o)}function Dl(r){if(!r||typeof r!="object")return[];let a=u.repeaterContentFieldCache.get(r);if(a)return a;let s=(r?.fields||[]).filter(o=>le(o)!=="repeater"&&le(o)!=="repeater-image");return u.repeaterContentFieldCache.set(r,s),s}function ad(r){if(Vl(r,B(u.config,r.path)))return Ml(r.fields[0]);let a={};return(r.fields||[]).forEach(s=>{s?.key&&(a[s.key]=Ml(s))}),a}function Vl(r,a){if(r?.fields?.length!==1)return!1;if(r.itemType==="primitive")return!0;let s=Array.isArray(a)&&a.length?a:B(u.defaultConfig,r.path);return Array.isArray(s)&&s.length>0&&s.every(o=>typeof o=="string"||typeof o=="number")}function sd(r,a,s){let o=String(r?.itemLabelKey||"").trim(),p=[o?a?.[o]:"",a?.title,a?.name,a?.label,a?.event,a?.provider].find(d=>String(d??"").trim());return String(p??"").trim()||(r.label||"Item")+" "+(s+1)}function od(r){return(r?.fields||[]).some(s=>le(s)==="repeater"||le(s)==="repeater-image")?`
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `:""}function ld(r,a=null){let s=B(u.config,r.path),o=Array.isArray(s)?s:[],l=Number.isFinite(r.max)?r.max:999;return od(r)+o.map((p,d)=>`
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${A(sd(r,p,d))}
              </strong>

              ${r.canDelete!==!1&&o.length>(Number.isFinite(r.min)?r.min:0)?`
                    <button
                      type="button"
                      data-repeat-delete="${A(r.path)}"
                      data-repeat-index="${d}"
                    >
                      Hapus
                    </button>
                  `:""}
            </div>

            ${Dl(r).map(x=>{let S=Vl(r,o)?r.path+"."+d:r.path+"."+d+"."+x.key;if(mi(x)){let k=a?.get(S);return k?xn(k):""}return Ol({...x,type:x.type||"text"},S)}).join("")}
          </div>
        `).join("")+(r.canAdd!==!1&&o.length<l?`
            <button
              type="button"
              class="button full"
              data-repeat-add="${A(r.path)}"
            >
              + Tambah
              ${A(r.label||"Item")}
            </button>
          `:"")}function gi(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `}function cd(){return`
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `}function er(r){if(!r||typeof r!="object")return[];let a=u.contentFieldCache.get(r);if(a)return a;let s=(r.fields||[]).filter(o=>!(o.type==="repeater"&&Dl(o).length===0));return u.contentFieldCache.set(r,s),s}function ud(){if(u.contentSearchIndex)return u.contentSearchIndex;let r=new Map;return pi().forEach(a=>{let s=Z(a),o="";try{o=JSON.stringify(a).toLowerCase()}catch{o=[s,a?.label||"",...er(a).flatMap(p=>[p?.label||"",p?.path||"",...(p?.fields||[]).flatMap(d=>[d?.label||"",d?.key||""])])].join(" ").toLowerCase()}r.set(s,o)}),u.contentSearchIndex=r,r}function tr(r){r&&u.contentSectionHtmlCache.delete(String(r))}function ir(r){let a=Z(r);if(!a)return Bl(r);if(u.contentSectionHtmlCache.has(a))return u.contentSectionHtmlCache.get(a);let s=Bl(r);return u.contentSectionHtmlCache.set(a,s),s}function Ht(r){r&&(u.contentSectionUseTick+=1,r.dataset.contentUse=String(u.contentSectionUseTick))}function dn(r){if(!r)return;let a=C("[data-section-card]",r).filter(o=>w("[data-section-body]",o)?.dataset.loaded==="1"),s=a.length-u.contentMaxMountedSections;s<=0||a.filter(o=>!o.classList.contains("open")).sort((o,l)=>Number(o.dataset.contentUse||0)-Number(l.dataset.contentUse||0)).slice(0,s).forEach(o=>{let l=w("[data-section-body]",o);l&&(l.replaceChildren(),l.dataset.loaded="0")})}function pd(){if(u.contentPrewarmScheduled||!u.config||!Ki())return;let r=pi();if(!r.length)return;u.contentPrewarmScheduled=!0;let a=s=>{u.contentPrewarmScheduled=!1,u.contentPrewarmHandle=null;let o=2;for(;u.contentPrewarmCursor<r.length&&o>0;){let l=r[u.contentPrewarmCursor++],p=Z(l);if(p&&!u.contentSectionHtmlCache.has(p)&&ir(l),o-=1,s&&!s.didTimeout&&typeof s.timeRemaining=="function"&&s.timeRemaining()<5)break}u.contentPrewarmCursor<r.length&&(u.contentPrewarmScheduled=!0,u.contentPrewarmHandle=Mt(a,1200))};u.contentPrewarmHandle=Mt(a,1200)}function Bl(r){let a=er(r),s=new Map(bn(r).map(d=>[d.path,d])),o=[],l="",p=d=>{let x=String(d||"").trim();return!x||x===l?"":(l=x,`
        <div class="sv-category" data-sv-category="${A(x)}">
          ${A(x)}
        </div>
      `)};return a.forEach(d=>{let x=String(d.category||"").trim();if(x||(l=""),mi(d)&&le(d)!=="repeater-image"){let S=s.get(d.path);S&&o.push(p(x)+xn(S));return}if(le(d)==="repeater-image"){let S=Array.isArray(B(u.config,d.path))?B(u.config,d.path):[],k=Number.isFinite(d.max)?d.max:999,E=[...s.values()].filter(_=>_.rootPath===d.path).map(xn).join(""),T=d.canAdd!==!1&&S.length<k?`
              <button
                type="button"
                class="button full"
                data-repeat-add="${A(d.path)}"
              >
                + Tambah
                ${A(d.label||"Foto")}
              </button>
            `:"";(E||T)&&o.push(p(x)+E+T);return}if(d.type==="repeater"){let S=x?"":`
            <div class="group-title">
              ${A(d.label||"Daftar")}
            </div>
          `;o.push(p(x)+`
            <div class="group">
              ${S}
              <div class="group-body">
                ${ld(d,s)}
              </div>
            </div>
          `);return}o.push(p(x)+`
          <div class="group">
            <div class="group-title">
              ${A(d.label||d.path)}
            </div>

            <div class="group-body">
              ${Ol({...d,hideVisibleLabel:!0})}
            </div>
          </div>
        `)}),o.join("")}function jl(r){return pi().find(a=>Z(a)===r)||null}function hd(r){if(!r)return;let a=w("[data-section-body]",r);if(!a||a.dataset.loaded==="1")return;let s=jl(r.dataset.sectionCard);s&&(a.innerHTML=ir(s),a.dataset.loaded="1",Ht(r),dn(r.closest("#"+e+"-body")))}function fn(r){if(!r)return;let a=r.closest("#"+e+"-body");a&&(C("[data-section-card].open",a).forEach(s=>{s!==r&&(s.classList.remove("open"),w(".chev",s)?.setAttribute("aria-expanded","false"),Ht(s))}),u.contentOpenSections.clear(),u.contentOpenSections.add(r.dataset.sectionCard),r.classList.add("open"),w(".chev",r)?.setAttribute("aria-expanded","true"),hd(r),Ht(r),dn(a))}function Ul(r){if(!r)return;let a=w("[data-section-body]",r),s=jl(r.dataset.sectionCard);!a||!s||(tr(r.dataset.sectionCard),a.innerHTML=ir(s),a.dataset.loaded="1",Ht(r))}function Hl(r=""){u.contentStateDirty=!0,r&&(u.contentCommitMessage=r),clearTimeout(u.contentCommitTimer),u.contentCommitTimer=setTimeout(()=>{u.contentCommitTimer=null;let a=u.contentCommitMessage;u.contentCommitMessage="",hi(a||void 0,{validate:!1,deferPreview:!0})},100)}function Se(r=""){let a=!!u.contentCommitTimer||!!u.contentCommitMessage||u.contentStateDirty;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null;let s=r||u.contentCommitMessage;return u.contentCommitMessage="",!a&&!r?!0:hi(s||void 0,{validate:!0,deferPreview:!0})}function zl(){let r=u.dashboardPin,a=un(),s=r.status==="ready"&&r.pin&&r.slug===a,o="Belum diambil",l="idle";return a?r.busy||r.status==="loading"?(o="Memuat\u2026",l="loading"):r.status==="needkey"?(o="Perlu kunci",l="warn"):r.status==="error"?(o="Gagal",l="error"):s&&(o="Aktif",l="ok"):o="Slug kosong",`<span id="${e}-pin-pill" class="pin-pill ${l}">${o}</span>`}function Wl(){if(!u.config)return gi();if(!Ki())return cd();let r=pi(),a=ud(),s=r.filter(o=>u.search?(a.get(Z(o))||"").includes(u.search):!0);return`
      <div class="pin-zone">
        <div class="pin-zone-head">
          <span class="pin-zone-title">PIN Dashboard</span>
          ${zl()}
        </div>
        <div id="${e}-pin-panel" aria-live="polite">${Pl()}</div>
      </div>

      ${s.map(o=>{let l=Z(o),p=o.label||l,d=jt(o),x=!o.visiblePath||B(u.config,o.visiblePath)!==!1,S=er(o),k=!u.search&&u.contentOpenSections.has(l);return`
            <article
              class="section ${d?"section-sortable":"section-pinned"}${k?" open":""}"
              data-section-card="${A(l)}"
            >
              <div
                class="section-head"
                title="${d?"Drag untuk mengurutkan section":"Section terkunci"}"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${A(p)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${A(l)}"
                    draggable="${d?"true":"false"}"
                    ${d?"":"disabled"}
                    aria-label="Drag ${A(p)}"
                    title="${d?"Drag untuk mengurutkan":"Section terkunci"}"
                  >
                    ${Xp()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${A(l)}"
                    ${Qi(l,-1)?"":"disabled"}
                    aria-label="Naikkan ${A(p)}"
                    title="Naik"
                  >
                    ${cl("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${A(l)}"
                    ${Qi(l,1)?"":"disabled"}
                    aria-label="Turunkan ${A(p)}"
                    title="Turun"
                  >
                    ${cl("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${A(p)}
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
                            data-visible-path="${A(o.visiblePath)}"
                            ${x?"checked":""}
                          >
                          <span class="switch"></span>
                        </label>
                      `:""}
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${A(p)}"
                  aria-expanded="${k?"true":"false"}"
                >
                  ${ll("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${A(l)}"
                data-loaded="${k?"1":"0"}"
              >
                ${k?ir(o):""}
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
    `}function mn(){return ke().flatMap(r=>r.fields||[]).filter(r=>le(r)==="repeater-image"&&r?.path)}function vx(){return mn()[0]||null}function dd(r){let a=String(r||"").trim();return a&&mn().find(s=>String(s.path||"").trim()===a)||null}function gn(r){let a=Array.isArray(r?.fields)?r.fields:[];return a.find(s=>s?.key&&mi(s))||a.find(s=>s?.key&&String(s.key).toLowerCase()==="src")||{key:"src",label:"Foto",type:"image"}}function Gl(r){let a=String(r||"").trim();if(!a)return null;for(let s of mn()){let o=String(s.path||"").trim(),l=o+".";if(!o||!a.startsWith(l))continue;let p=a.slice(l.length).split(".");if(p.length!==2)continue;let d=Number(p[0]);if(!Number.isInteger(d)||d<0)continue;let x=gn(s),S=String(x?.key||"src");if(p[1]===S)return{field:s,imageField:x,imageKey:S,rootPath:o,index:d}}return null}function ql(r){return u.doc?!!C('[data-sve-type="image"][data-sve-field]',u.doc).find(s=>s.getAttribute("data-sve-field")===r)?.closest("[data-sve-image-wrapper]"):!1}function bn(r){let a=[],s=new Set;return(r?[r]:ke()).forEach(o=>{(o.fields||[]).forEach(l=>{if(mi(l)&&l.type!=="repeater-image"&&l.path&&!s.has(l.path)&&(a.push({label:l.label||Dt(l.path),path:l.path,gallery:!1,wrapped:ql(l.path)}),s.add(l.path)),l.type==="repeater"&&l.path){let p=B(u.config,l.path),d=(l.fields||[]).filter(x=>mi(x)&&x.key);Array.isArray(p)&&d.length&&p.forEach((x,S)=>{d.forEach(k=>{let E=l.path+"."+S+"."+k.key;s.has(E)||(a.push({label:(o.label||l.label||Dt(l.path))+" "+(S+1)+" \xB7 "+(k.label||Dt(k.key)),path:E,gallery:!1,wrapped:ql(E)}),s.add(E))})})}if(le(l)==="repeater-image"&&l.path){let p=B(u.config,l.path),d=gn(l),x=String(d?.key||"src");Array.isArray(p)&&p.forEach((S,k)=>{let E=l.path+"."+k+"."+x;s.has(E)||(a.push({label:(l.label||"Foto Gallery")+" "+(k+1),path:E,gallery:!0,index:k,rootPath:l.path,imageKey:x,wrapped:!0}),s.add(E))})}})}),u.doc&&C('[data-sve-type="image"][data-sve-field]',u.doc).forEach(o=>{let l=o.getAttribute("data-sve-field");if(!l||s.has(l))return;let p=Gl(l),d=!!p;a.push({label:o.getAttribute("data-sve-label")||Dt(l),path:l,gallery:d,index:p?p.index:null,rootPath:p?p.rootPath:null,imageKey:p?p.imageKey:null,wrapped:!!o.closest("[data-sve-image-wrapper]")}),s.add(l)}),a}function Kl(){return(!u.config.imageSettings||typeof u.config.imageSettings!="object"||Array.isArray(u.config.imageSettings))&&(u.config.imageSettings={}),u.config.imageSettings}function zt(r){let a=u.config?.imageSettings,s=a&&typeof a=="object"?a[r]:null,o=Gl(r);return{width:Math.max(0,Math.min(100,Number(s?.width??100)||0)),align:["left","center","right"].includes(s?.align)?s.align:"center",fit:Jp(s?.fit),alignPos:Jr.includes(s?.alignPos)?s.alignPos:"default",hidden:s?.hidden===!0}}function Wt(r,a){let s=Kl();s[r]={...zt(r),...a}}function fd(){let r=u.config?.imageSettings;if(!r||typeof r!="object")return;let a=new Set(bn().map(s=>s.path));Object.keys(r).forEach(s=>{a.has(s)||delete r[s]})}function md(){let r=j("css");if(!r)return;let a=r.replace(/(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,`
`).replace(/\n{3,}/g,`

`).trim();return a!==r.trim()?(lt("css",a),!0):!1}function gd(r){if(!r||!u.config)return;Array.from(r.querySelectorAll('[data-sve-type="image"][data-sve-field]')).forEach(s=>{let o=s.getAttribute("data-sve-field");if(!o)return;let l=zt(o),p=s.closest("[data-sve-image-wrapper]"),d=p||s,x=l.align==="left"?"0":"auto",S=l.align==="right"?"0":"auto";p?(p.style.display=l.hidden?"none":"",p.style.width=l.width+"%",p.style.maxWidth="100%",p.style.marginLeft=x,p.style.marginRight=S,s.style.width="100%"):(s.style.display=l.hidden?"none":"",s.style.width=l.width+"%",s.style.maxWidth="100%",s.style.marginLeft=x,s.style.marginRight=S),l.fit==="auto"?s.style.removeProperty("object-fit"):s.style.objectFit=l.fit;let k=Zp[l.alignPos]||"";k?s.style.objectPosition=k:s.style.removeProperty("object-position"),s.style.height="100%"})}function kx(){Ut.request({images:!0})}function bd(r){let a={"top left":`
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
    `}function xd(r){let a=zt(r.path),s=l=>l==="left"?`
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
              ${Jr.filter(l=>l!=="default").map(l=>`
            <button
              type="button"
              class="advance-pos-btn ${a.alignPos===l?"active":""}"
              data-image-alignpos-path="${A(r.path)}"
              data-image-alignpos="${A(l)}"
              title="${A(l)}"
              aria-label="${A("Posisi "+l)}"
            >
              ${bd(l)}
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
    `}function yd(){return`
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
    `}function vd(){return`
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
    `}function Yl(){return`
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
    `}function kd(r){return`
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${Yl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `}function Sd(){return`
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
    `}function wd(r,a){let s=B(u.config,r);if(!Array.isArray(s)||a<0||a>=s.length)return;let o=dd(r),l=gn(o),p=String(l?.key||"src"),d=Kl(),x={};for(let S=0;S<s.length;S++){let k=r+"."+S+"."+p;Object.prototype.hasOwnProperty.call(d,k)&&(x[S]=gt(d[k]))}s.splice(a,1),Object.keys(d).forEach(S=>{S.startsWith(r+".")&&S.endsWith("."+p)&&delete d[S]});for(let S=0;S<s.length;S++){let k=S<a?S:S+1,E=x[k];E&&(d[r+"."+S+"."+p]=E)}fd(),Le("Foto gallery dihapus"),ue()}function Cd(r){u.config&&(He(u.config,r,""),Wt(r,{hidden:!0}),Le("Gambar dihapus"),ue())}function xn(r){let a=B(u.config,r.path)||"",s=zt(r.path),l=`
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${!!r.gallery?`data-gallery-delete-index="${A(r.rootPath)}" data-gallery-index="${Number(r.index)}"`:`data-image-delete-path="${A(r.path)}"`}
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${vd()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${A(r.path)}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${Sd()}
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
                      `:kd(r.path)}
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${A(r.label)}">
                    ${A(r.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${A(r.path)}">
                    CONFIG.${A(r.path)}
                  </p>
                </div>

                ${l}
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
                  ${yd()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${r.gallery?(()=>{let d=r.path.replace(/\.src$/,".alt"),x=B(u.config,d)||"";return`
                        <div class="image-alt-row">
                          <input
                            type="text"
                            data-field-path="${A(d)}"
                            data-field-type="text"
                            value="${A(x)}"
                            placeholder="Deskripsi foto (alt)"
                            aria-label="Deskripsi foto ${Number(r.index)+1}"
                          >
                        </div>
                      `})():""}

              ${xd(r)}
            </div>
          `}function bi(r,a){let s=r?.closest(".image-card");if(!s)return;let o=w(".image-preview-shell",s);if(!o)return;let l=r.value.trim(),p=zt(a),d=w(".preview",o);if(l){if(!d||d.tagName!=="IMG"){let x=document.createElement("img");x.className="preview",x.alt="",d?d.replaceWith(x):o.prepend(x),d=x}d.src=l}else{if(!d||d.tagName!=="BUTTON"||!d.classList.contains("image-upload-placeholder")){let x=document.createElement("button");x.type="button",x.className="preview empty image-upload-placeholder",x.dataset.imageFocus=a,x.setAttribute("aria-label","Masukkan URL gambar"),d?d.replaceWith(x):o.prepend(x),d=x}d.innerHTML=`
        <span class="image-upload-icon">
          ${Yl()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `,d.onclick=()=>{r.focus(),r.select?.()}}d.style.width="100%",d.style.height="100%",d.style.maxWidth="none",d.style.aspectRatio="auto",d.style.objectFit="cover",d.style.marginLeft="0",d.style.marginRight="0",s.classList.toggle("image-card-hidden",p.hidden)}function rr(r,a){let s=zt(a);C(`[data-image-align-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlign===s.align)}),C(`[data-image-fit-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageFit===s.fit)}),C(`[data-image-alignpos-path="${CSS.escape(a)}"]`,r).forEach(p=>{p.classList.toggle("active",p.dataset.imageAlignpos===s.alignPos)});let o=w(`[data-image-width-path="${CSS.escape(a)}"]`,r),l=w(`[data-image-width-number="${CSS.escape(a)}"]`,r);o&&(o.value=s.width),l&&(l.value=s.width)}function Ed(r){let a=String(r||"").trim();if(!a||/^var\(/i.test(a))return!1;try{return CSS.supports("color",a)}catch{return/^#[0-9a-f]{3,8}$/i.test(a)}}function xi(r,a="#000000"){let s=String(r||"").trim(),o=s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);if(o){let l=o[1];return l.length===3&&(l=l.split("").map(p=>p+p).join("")),"#"+l.slice(0,6).toLowerCase()}try{let l=document.createElement("span");if(l.style.color=s,!l.style.color)return a;l.style.position="fixed",l.style.left="-9999px",document.body.appendChild(l);let p=getComputedStyle(l).color;l.remove();let d=p.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);if(!d)return a;let x=S=>Math.max(0,Math.min(255,Math.round(Number(S)))).toString(16).padStart(2,"0");return"#"+x(d[1])+x(d[2])+x(d[3])}catch{return a}}function Ad(){return I.some(([,,r])=>!!xe(r))}function Td(r,a){let s=xe(a);if(!s)return`
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
      `;let o=xi(s,"#ffffff");return`
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
    `}function _d(){return u.config?Ad()?[...new Set(I.map(a=>a[0]))].map(a=>`
            <div class="group">
              <div class="group-title">
                ${a}
              </div>

              ${I.filter(s=>s[0]===a).map(([,s,o])=>Td(s,o)).join("")}
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
      `:gi()}let Ld={"playwrite brasil guides":"Playwrite BR Guides"};function yn(r){return String(r||"").replace(/^["']+|["']+$/g,"").replace(/\s+/g," ").trim()}function vn(r){let a="";try{a=decodeURIComponent(String(r||"").replace(/\+/g," "))}catch{a=String(r||"").replace(/\+/g," ")}return yn(a.split(":")[0].replace(/\s+/g," "))}function yi(r){let a=yn(r);return a?Ld[a.toLowerCase()]||a:""}function Id(r){let a=String(r||"").trim();if(!a)return{family:"",isUrl:!1,valid:!1};if(/^https?:\/\//i.test(a))try{let o=new URL(a),l=o.hostname.toLowerCase();if(l==="fonts.google.com"||l==="www.fonts.google.com"){let p=o.pathname.match(/^\/specimen\/([^/?#]+)/);if(p?.[1])return{family:yi(vn(p[1])),isUrl:!0,valid:!0};let d=o.searchParams.get("family");return d?{family:yi(vn(d)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}if(l==="fonts.googleapis.com"){let d=o.searchParams.getAll("family")[0]||"";return d?{family:yi(vn(d)),isUrl:!0,valid:!0}:{family:"",isUrl:!0,valid:!1}}return{family:"",isUrl:!0,valid:!1}}catch{return{family:"",isUrl:!0,valid:!1}}let s=a.split(",")[0];return{family:yi(yn(s)),isUrl:!1,valid:!0}}function $d(r,a=""){let s=yi(r);if(!s)return"";let o=encodeURIComponent(s).replace(/%20/g,"+"),l=String(a||"").trim();return"https://fonts.googleapis.com/css2?family="+o+(l?":wght@"+encodeURIComponent(l):"")+"&display=swap"}function kn(r,a=""){let s=$d(r,a);return s?new Promise(o=>{let l=e+"-font-validation-link";document.getElementById(l)?.remove();let p=document.createElement("link"),d=!1,x=k=>{d||(d=!0,clearTimeout(S),p.onload=null,p.onerror=null,o(k))},S=setTimeout(()=>{x({ok:!1,reason:"timeout"})},7e3);p.id=l,p.rel="stylesheet",p.href=s,p.onload=async()=>{try{if(document.fonts&&typeof document.fonts.load=="function"){let k=await document.fonts.load(`16px "${String(r).replace(/"/g,'\\"')}"`,"Scalev Wedding 123");if(!k||k.length===0){x({ok:!1,reason:"font-file"});return}}x({ok:!0,reason:"ok",url:s})}catch{x({ok:!1,reason:"font-file"})}},p.onerror=()=>{x({ok:!1,reason:"stylesheet"})},document.head.appendChild(p)}):Promise.resolve({ok:!1,reason:"invalid"})}async function Pd(r,a){let o=nr(a,xe(a==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400"),l=await kn(r,o);return l.ok?{...l,weight:o}:o!=="400"&&(l=await kn(r,"400"),l.ok)?{...l,weight:"400",normalizedWeight:!0}:(l=await kn(r,""),l.ok?{...l,weight:"400",normalizedWeight:o!=="400"}:{...l,weight:o})}function Ql(r,a){if(!r)return;let s=Array.isArray(a)?a.filter(Boolean):a?[a]:[];try{let o=r.head||r.documentElement;if(!o)return;s.forEach((l,p)=>{let d=e+"-preview-font-link-"+p,x=r.getElementById(d);x||(x=r.createElement("link"),x.id=d,x.rel="stylesheet",o.appendChild(x)),x.getAttribute("href")!==l&&x.setAttribute("href",l)}),Array.from(r.querySelectorAll('link[id^="'+e+'-preview-font-link"]')).forEach(l=>{s.includes(l.getAttribute("href"))||l.remove()})}catch{}}function Zl(){let r=Sn(),a=()=>C("iframe").forEach(s=>{try{Ql(s.contentDocument,r)}catch{}});a(),requestAnimationFrame(a)}function Jl(r){return String(B(u.config,"editorStyle.googleFonts."+r)||"").trim()}function Xl(r){let a=Jl(r);if(a)return a;let o=xe(r==="heading"?"--sve-font-heading":"--sve-font-body");return o?o.split(",")[0].replace(/["']/g,"").trim():""}function Nd(r,a){return a==="heading"?"serif":"sans-serif"}function Rd(r){return r==="--sve-heading-weight"?"heading":r==="--sve-body-weight"?"body":""}function Fd(r,a){return Y.includes(String(a))}function Md(r){return Y}function nr(r,a){let s=String(a||"").trim();return Y.includes(s)?s:"400"}function Od(r,a=!1){let s=w("#"+e+"-body");if(!s)return;let o=r==="heading"?"--sve-heading-weight":"--sve-body-weight",l=w(`[data-style-var="${CSS.escape(o)}"]`,s);if(!l)return;let p=xe(o)||"400",d=nr(r,p);a&&d!==p&&Fe(o,d),l.innerHTML=or(d,Y,!1),l.value=d}function Sn(){let r=new Map;["heading","body"].forEach(s=>{let o=Jl(s);if(!o)return;let l=o.trim().toLowerCase();if(!l)return;r.has(l)||r.set(l,{family:o,weights:new Set});let d=nr(s,xe(s==="heading"?"--sve-heading-weight":"--sve-body-weight")||"400");r.get(l).weights.add(d)});let a=Array.from(r.values()).map(s=>{let o=encodeURIComponent(s.family).replace(/%20/g,"+"),l=Array.from(s.weights).sort((p,d)=>Number(p)-Number(d));return"family="+o+":wght@"+l.join(";")});return a.length?a.map(s=>"https://fonts.googleapis.com/css2?"+s+"&display=swap"):[]}function Sx(){return Sn().join("|")}function ar(){let r=Sn(),a="<!-- SVE GOOGLE FONTS START -->",s="<!-- SVE GOOGLE FONTS END -->",o=/<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;if(!r.length){if(u.editors.head){let d=j("head");o.test(d)&&lt("head",d.replace(o,"").replace(/\n{3,}/g,`

`))}document.getElementById(e+"-font-link")?.remove(),C("iframe").forEach(d=>{try{Ql(d.contentDocument,[])}catch{}});return}let l=`${a}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${r.map(d=>`<link rel="stylesheet" href="${d}">`).join(`
`)}
${s}`;if(u.editors.head){let d=j("head");d=o.test(d)?d.replace(o,l):d.trimEnd()+`

`+l+`
`,lt("head",d)}let p=Array.from(document.querySelectorAll('link[id^="'+e+'-font-link"]'));r.forEach((d,x)=>{let S=x===0?e+"-font-link":e+"-font-link-"+x,k=document.getElementById(S);k||(k=document.createElement("link"),k.id=S,k.rel="stylesheet",document.head.appendChild(k)),k.href=d}),p.forEach(d=>{r.includes(d.href)||d.remove()}),Zl()}async function sr(r){let a=w("#"+e+"-"+r+"-font");if(!a)return;let s=Id(a.value);if(!s.valid||!s.family)return;let o=s.family;a.value=o;let l=await Pd(o,r);if(!l.ok){l.reason==="stylesheet"||l.reason==="font-file"||l.reason;return}let p=r==="heading"?"--sve-font-heading":"--sve-font-body",d=r==="heading"?"--sve-heading-weight":"--sve-body-weight";l.normalizedWeight&&l.weight&&Fe(d,l.weight),He(u.config,"editorStyle.googleFonts."+r,o),Le(),Fe(p,`"${o}", ${Nd(o,r)}`),Od(r,!1),ar(),Zl(),ze()}function or(r,a,s=!0,o=!1){let l=String(r||"").trim(),p=s&&l&&!a.includes(l)?[l,...a]:[...a];return o&&(p=[...new Set(p)].sort((d,x)=>{let S=Number.parseFloat(d),k=Number.parseFloat(x);return Number.isFinite(S)&&Number.isFinite(k)?S-k:String(d).localeCompare(String(x))})),p.map((d,x)=>{let S=a.includes(l)||s?d===l:x===0;return`
            <option
              value="${A(d)}"
              ${S?"selected":""}
            >
              ${A(d)}
            </option>
          `}).join("")}function Dd(r){let a=xe(r.variable)||r.fallback;if(r.type==="size")return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${or(a,z,!0,!0)}
        </select>
      `;if(r.type==="lineheight")return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${or(a,ie,!1)}
        </select>
      `;if(r.type==="weight"){let s=Rd(r.variable),o=s?Md(s):Y,l=s?nr(s,a):a;return`
        <select
          class="style-select"
          data-style-var="${A(r.variable)}"
        >
          ${or(l,o,!1)}
        </select>
      `}return""}function ec(){if(!u.config)return!1;let r=u.defaults?.cssTokens||{},a=!1;return Te.forEach(({target:s,variable:o})=>{let l=typeof r[o]=="string"?r[o].trim():"",p=B(u.config,"editorStyle.googleFonts."+s),d=typeof p=="string"&&p.trim()!=="";l&&(Fe(o,l),a=!0),d&&(He(u.config,"editorStyle.googleFonts."+s,""),a=!0)}),a}function Vd(){u.config&&(ec(),X.forEach(r=>{let a=Xi(r.variable)||r.fallback;Fe(r.variable,a)}),Le(),ar(),ue())}function Bd(){return u.config?`
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
            value="${A(Xl("heading"))}"
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
            value="${A(Xl("body"))}"
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

          ${ll("typography-chevron")}
        </summary>

        <div class="typography-body">
          ${oe.map(r=>{let a=X.filter(s=>s.role===r.key);return`
                <div class="typography-role">
                  <div class="typography-role-title">${A(r.label)}</div>
                  <div class="typography-control-grid">
                    ${a.map(s=>`
                      <div class="typography-control">
                        <label>${A(s.label)}</label>
                        ${Dd(s)}
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
    `:gi()}function lr(r){let a=String(r||"").trim().toLowerCase();if(!a)return 0;if(/^\d+$/.test(a))return Math.max(0,Number(a));let s=a.split(":").map(d=>Number(d));if(s.length>=2&&s.length<=3&&s.every(Number.isFinite))return s.length===2?Math.max(0,Math.floor(s[0]*60+s[1])):Math.max(0,Math.floor(s[0]*3600+s[1]*60+s[2]));let o=Number(a.match(/(\d+)h/)?.[1]||0),l=Number(a.match(/(\d+)m/)?.[1]||0),p=Number(a.match(/(\d+)s/)?.[1]||0);return o||l||p?Math.max(0,o*3600+l*60+p):0}function tc(r){let a=String(r||"").trim();if(!a)return 0;try{let s=new URL(a,location.href),o=[s.searchParams.get("t"),s.searchParams.get("start"),s.hash.match(/(?:^#|[&#])t=([^&]+)/i)?.[1]||""];for(let l of o){let p=lr(l);if(p>0)return p}}catch{let o=a.match(/(?:[?&#](?:t|start)=)([^&#]+)/i);return lr(o?.[1]||"")}return 0}function wn(r){let a=Math.max(0,Math.floor(Number(r)||0)),s=Math.floor(a/3600),o=Math.floor(a%3600/60),l=a%60,p=d=>String(d).padStart(2,"0");return s>0?s+":"+p(o)+":"+p(l):o+":"+p(l)}function jd(r,a){let s=String(r||"").trim(),o=Math.max(0,Math.floor(Number(a)||0));if(!s)return s;try{let l=new URL(s,location.href);return l.searchParams.delete("start"),o>0?l.searchParams.set("t",String(o)):l.searchParams.delete("t"),l.hash&&/(?:^#|[&#])t=/i.test(l.hash)&&(l.hash=""),l.toString()}catch{let p=s.replace(/([?&])(?:t|start)=[^&#]*&?/gi,"$1").replace(/[?&]$/,"").replace(/#t=[^&]*/i,"");return o<=0?p:p+(p.includes("?")?"&":"?")+"t="+o}}function ic(r,a){let s=tc(a),o=w("#"+e+"-audio-start-enabled",r),l=w("#"+e+"-audio-start-time",r);o&&(o.checked=s>0),l&&(l.disabled=s<=0,l.value=wn(s))}function Ud(){if(!u.config)return gi();let r=Al(),a=r.path||"assets.audio",s=B(u.config,a),o=typeof s=="string"?s:"",l=tc(o);return`
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
              value="${A(wn(l))}"
              placeholder="0:00"
              ${l>0?"":"disabled"}
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `}function cr(r,a){(Array.isArray(r)?r:[]).forEach(s=>{a(s),le(s)==="repeater"&&cr(s.fields,a),le(s)==="repeater-image"&&cr(s.fields,a)})}function rc(){let r={connect_src:new Set,img_src:new Set,media_src:new Set,font_src:new Set,script_src:new Set,style_src:new Set,frame_src:new Set,worker_src:new Set,manifest_src:new Set},a={html:j("html"),css:j("css"),js:j("js"),head:j("head")},s=(S,k)=>{try{let E=new URL(k,location.origin);if(E.protocol!=="https:"&&E.protocol!=="http:")return;let T=E.origin;if(T===location.origin)return;r[S]?.add(T)}catch{}},o=(S,k)=>{let E=/https?:\/\/[^\s"'<>`)\\]+/g;(String(S||"").match(E)||[]).forEach(T=>s(k,T))};try{let S=new DOMParser().parseFromString(a.html||"","text/html");S.querySelectorAll("img[src], source[src], source[srcset]").forEach(k=>{s("img_src",k.getAttribute("src")||k.getAttribute("srcset")||"")}),S.querySelectorAll("audio[src], video[src]").forEach(k=>s("media_src",k.getAttribute("src")||"")),S.querySelectorAll("iframe[src]").forEach(k=>s("frame_src",k.getAttribute("src")||"")),S.querySelectorAll("script[src]").forEach(k=>s("script_src",k.getAttribute("src")||"")),S.querySelectorAll('link[rel="stylesheet"][href]').forEach(k=>s("style_src",k.getAttribute("href")||"")),S.querySelectorAll('link[rel="manifest"][href]').forEach(k=>s("manifest_src",k.getAttribute("href")||""))}catch{}let l=/url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g,p;for(;p=l.exec((a.css||"")+`
`+(a.head||""));){let S=p[1];/fonts\.gstatic\.com/i.test(S)?s("font_src",S):s("img_src",S)}o(a.head,"style_src");let d=JSON.stringify(u.config||{}),x=B(u.config,"guestbook.endpoint");return x&&s("connect_src",x),["rsvp.endpoint","extensions.rsvpBackend.endpoint"].forEach(S=>{let k=B(u.config,S);k&&s("connect_src",k)}),(d.match(/https?:\/\/[^"\\]+/g)||[]).forEach(S=>{/youtube\.com|youtu\.be/i.test(S)?s("frame_src",S):/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(S)?s("media_src",S):/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(S)?s("font_src",S):/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(S)&&s("img_src",S)}),/fonts\.googleapis\.com/i.test(a.head||"")&&(r.style_src.add("https://fonts.googleapis.com"),r.font_src.add("https://fonts.gstatic.com")),Object.fromEntries(Object.entries(r).map(([S,k])=>[S,Array.from(k).sort()]))}function Hd(){return{"Body HTML":j("html"),CSS:j("css"),JavaScript:j("js"),"Additional Head":j("head"),CONFIG:JSON.stringify(u.config||{})}}function nc(r,a,s){let o=Hd(),l=be(o);l.length?r("Gambar base64 terdeteksi di "+Zr(l)+"; upload gambar ke hosting lalu pakai URL https"):s("Tidak ada gambar base64");let p=Re(o);p.length&&a("Data URI berukuran besar di "+Zr(p)+"; pertimbangkan pindah ke file hosting")}function zd(){let r=[],a=[],s=[],o=ee=>r.push(ee),l=ee=>a.push(ee),p=ee=>s.push(ee);if(u.config?p("CONFIG terbaca sebagai static object"):o("CONFIG tidak terbaca"),u.schema?p("SVE_SCHEMA custom page tersedia"):o("SVE_SCHEMA wajib eksplisit"),u.config)try{JSON.stringify(u.config),p("CONFIG JSON-compatible")}catch{o("CONFIG tidak dapat diserialisasi dengan aman")}let d=Array.isArray(u.schema?.sections)?u.schema.sections:[],x=d.map(Z).filter(Boolean),S=new Set(x);d.length||o("SVE_SCHEMA custom page belum memiliki section"),x.length!==S.size&&o("SVE_SCHEMA memiliki duplicate section id");let k=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],E=new Set(k);k.length!==E.size&&o("CONFIG.sectionOrder memiliki duplicate id"),x.forEach(ee=>{E.has(ee)||o("sectionOrder belum memuat: "+ee)}),d.forEach(ee=>{let We=Z(ee);ee.visiblePath&&(ot(ee.visiblePath)||o("Unsafe visiblePath pada section "+We),u.config&&typeof B(u.config,ee.visiblePath)!="boolean"&&o("Visibility path harus boolean pada section "+We)),cr(ee.fields,Ie=>{let bt=le(Ie);Bi.has(bt)||o("Field type tidak didukung: "+bt+" ("+(Ie.path||Ie.key||We)+")"),Ie.path&&!ot(Ie.path)&&o("Unsafe field path: "+Ie.path),(bt==="repeater"||bt==="repeater-image")&&!Array.isArray(Ie.fields)&&o("Repeater tanpa fields[]: "+(Ie.path||We)),bt==="repeater"&&(Ie.fields||[]).forEach(ki=>{let Cn=le(ki);(Cn==="repeater"||Cn==="repeater-image")&&o("Nested repeater tidak diizinkan: "+(Ie.path||We)),ki.key||o("Repeater subfield tanpa stable key: "+(Ie.path||We))})})});let T=["html","css","js","head"].map(j).join(`
`);/\beval\s*\(/.test(T)&&o("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(T)&&o("new Function() terdeteksi"),/javascript\s*:/i.test(T)&&o("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(T)&&o("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(T)&&o("Kemungkinan secret/private credential terdeteksi"),nc(o,l,p);let _=hn(),W=X.map(ee=>ee.variable).filter(ee=>!fi(_,ee));W.length?o("Typography role tokens belum lengkap: "+W.join(", ")):p("Semua typography role tokens tersedia");let pe=rc();return Object.values(pe).reduce((ee,We)=>ee+We.length,0)&&l("External origin terdeteksi; salin CSP manifest ke Scalev Security"),p("Custom page aktif; validasi "+Je.length+" section wedding dilewati"),{status:r.length?"BLOCKER":a.length?"WARNING":"PASS",blockers:r,warnings:a,passes:s,csp:pe}}let ur=null;function ac(){let r=["html","css","js","head"].map(j);if(ur&&r.every((o,l)=>o===ur.sources[l]))return ur.report;let a=new DOMParser().parseFromString(r[0],"text/html");a.head.insertAdjacentHTML("beforeend",r[3]);let s=sl({doc:a,scripts:[r[2],...Array.from(a.querySelectorAll("script"),o=>o.textContent)].filter(Boolean),css:r[1]+`
`+Array.from(a.querySelectorAll("style"),o=>o.textContent).join(`
`)});return ur={sources:r,report:s},s}function Wd(){let r=ac();if(u.schema?.template?.type==="custom-page"){let M=zd();return M.blockers=[...new Set([...r.blockers,...M.blockers])],M.blockers.length&&(M.status="BLOCKER"),M}let a=[...r.blockers],s=[],o=[],l=M=>a.push(M),p=M=>s.push(M),d=M=>o.push(M);if(u.config?d("CONFIG terbaca sebagai static object"):l("CONFIG tidak terbaca"),u.schema?d("SVE_SCHEMA eksplisit tersedia"):l("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS"),u.config)try{JSON.stringify(u.config),d("CONFIG JSON-compatible")}catch{l("CONFIG tidak dapat diserialisasi dengan aman")}let x=Array.isArray(u.schema?.sections)?u.schema.sections:[],S=x.map(Z).filter(Boolean),k=new Set(S);S.length!==k.size&&l("SVE_SCHEMA memiliki duplicate section id"),Je.forEach(M=>{k.has(M)||l("Canonical section hilang: "+M)}),Je.every(M=>k.has(M))&&d(Je.length+" canonical sections tersedia");let E=Array.isArray(u.config?.sectionOrder)?u.config.sectionOrder:[],T=new Set(E);E.length!==T.size&&l("CONFIG.sectionOrder memiliki duplicate id"),Je.forEach(M=>{T.has(M)||l("sectionOrder belum memuat: "+M)}),E[0]&&E[0]!=="cover"&&l("Cover wajib menjadi section pertama"),B(u.config,"invitation.isDemo")===!0&&p("Mode Demo AKTIF \u2014 RSVP tamu tidak dikirim ke server. Matikan sebelum dipakai klien."),B(u.config,"invitation.isExclusive")===!0&&p("Undangan Khusus AKTIF \u2014 halaman hanya terbuka dengan link bertoken."),Je.filter(M=>M!=="cover").forEach(M=>{typeof B(u.config,"sections."+M)!="boolean"&&l("Boolean visibility tidak valid: sections."+M)}),x.forEach(M=>{let $e=Z(M);$e==="cover"?(M.locked!==!0||M.canHide!==!1)&&l("Cover harus locked dan canHide:false"):M.visiblePath&&!ot(M.visiblePath)&&l("Unsafe visiblePath pada section "+$e),cr(M.fields,Ge=>{let Si=le(Ge);Bi.has(Si)||l("Field type tidak didukung: "+Si+" ("+(Ge.path||Ge.key||$e)+")"),Ge.path&&!ot(Ge.path)&&l("Unsafe field path: "+Ge.path),(Si==="repeater"||Si==="repeater-image")&&!Array.isArray(Ge.fields)&&l("Repeater tanpa fields[]: "+(Ge.path||$e)),Si==="repeater"&&(Ge.fields||[]).forEach(hc=>{let dc=le(hc);(dc==="repeater"||dc==="repeater-image")&&l("Nested repeater tidak diizinkan: "+(Ge.path||$e)),hc.key||l("Repeater subfield tanpa stable key: "+(Ge.path||$e))})})});let _=["html","css","js","head"].map(j).join(`
`);/\beval\s*\(/.test(_)&&l("eval() terdeteksi"),/\bnew\s+Function\s*\(/.test(_)&&l("new Function() terdeteksi"),/javascript\s*:/i.test(_)&&l("javascript: URL terdeteksi"),/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(_)&&l("Private Scalev API URL terdeteksi"),/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(_)&&l("Kemungkinan secret/private credential terdeteksi"),nc(l,p,d);let W=j("js");/\bconst\s+CONFIG\s*=/.test(W)||s.push("CONFIG strict canonical sebaiknya memakai const"),/\bconst\s+SVE_SCHEMA\s*=/.test(W)||s.push("SVE_SCHEMA strict canonical sebaiknya memakai const");let pe=B(u.config,"sections.rsvp")===!0,At=B(u.config,"sections.guestbook")===!0,ee=String(B(u.config,"rsvp.endpoint")||""),We=B(u.config,"rsvp.enabled"),Ie=!!ee||We!==void 0;if(pe)if(Ie)We!==!0&&l("RSVP & Ucapan visible tetapi rsvp.enabled bukan true"),/^https:\/\//i.test(ee)||l("RSVP & Ucapan membutuhkan endpoint HTTPS");else{let M=String(B(u.config,"extensions.rsvpBackend.mode")||"none");if(M!=="none"&&M!=="external"&&l("RSVP backend mode harus none atau external"),M==="external"){let $e=String(B(u.config,"extensions.rsvpBackend.endpoint")||"");/^https:\/\//i.test($e)||l("RSVP external membutuhkan endpoint HTTPS")}else s.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed")}if(At){let M=B(u.config,"guestbook.enabled"),$e=String(B(u.config,"guestbook.endpoint")||"");M!==!0&&l("Ucapan & Doa legacy visible tetapi guestbook.enabled bukan true"),/^https:\/\//i.test($e)||l("Ucapan & Doa legacy visible tetapi endpoint HTTPS belum valid")}let bt=hn(),ki=X.map(M=>M.variable).filter(M=>!fi(bt,M));ki.length?l("Typography role tokens belum lengkap: "+ki.join(", ")):d("Semua typography role tokens tersedia"),/(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(bt)&&p("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");let pc=rc();return Object.values(pc).reduce((M,$e)=>M+$e.length,0)?s.push("External origin terdeteksi; salin CSP manifest ke Scalev Security"):d("Tidak ada external origin wajib dari scanner"),{status:a.length?"BLOCKER":s.length?"WARNING":"PASS",blockers:a,warnings:s,passes:o,csp:pc}}function Gd(r){return r==="PASS"?`
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
    `}function qd(){if(!u.config)return gi();let r=Wd(),a=(l,p)=>l.length?`<ul>${l.map(d=>`<li>${A(d)}</li>`).join("")}</ul>`:`<p class="compat-empty">${A(p)}</p>`,s=r.status==="PASS"?"Siap":r.status==="WARNING"?"Perlu dicek":"Masalah",o=r.status==="PASS"?"Semua siap":r.status==="WARNING"?"Perlu diperiksa":"Perlu diperbaiki";return`
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
    `}function Kd(r){let a=[],s=new WeakSet,o=(l,p="CONFIG")=>{if(l!==null){if(typeof l=="object"){if(s.has(l)){a.push("Referensi berulang: "+p);return}s.add(l)}if(Array.isArray(l)){l.forEach((d,x)=>o(d,p+"."+x));return}if(typeof l=="object"){Object.keys(l).forEach(d=>{oi.has(d)&&a.push("Forbidden key: "+p+"."+d),o(l[d],p+"."+d)});return}["string","number","boolean"].includes(typeof l)||a.push("Non-static value: "+p),typeof l=="number"&&!Number.isFinite(l)&&a.push("Non-finite number: "+p)}};o(r);try{JSON.parse(JSON.stringify(r))}catch{a.push("CONFIG gagal round-trip JSON")}return a}function Yd(){let r=u.templateLibrary,a=String(u.search||"").trim().toLowerCase(),s=r.templates.filter(p=>a?[p.name].join(" ").toLowerCase().includes(a):!0);r.status==="idle"&&vl().then(()=>{u.tab==="library"&&(u.uiPrepared=!1,ue())});let o=r.error?`
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${A(r.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `:"",l=s.map(p=>{let d=!!p.sourceUrl,x=p.id===r.importedId;return`
        <article class="library-card${x?" is-active":""}" role="listitem"${x?' aria-current="true"':""}>
          <div class="library-card-row">
            <div class="library-card-copy">
              <div class="library-card-heading">
                <h3>${A(p.name)}</h3>
              </div>
              <p class="library-commission-note">
                <span>Komisi <strong>${A(String(p.commissionRate))}%</strong> dari harga paket</span>
                <a href="${c}" target="_blank" rel="noopener noreferrer">Lihat paket \u2192</a>
              </p>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${x?"danger":"primary"} library-import-button"
                data-library-import="${A(p.id)}"
                ${d?"":"disabled"}
              >${d?x?"Reset":"Gunakan":"Belum siap"}</button>
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
    `}function Qd(){let r=w("#"+e+"-search");if(!r)return;let a=u.tab==="library";r.placeholder=a?"Cari template...":"Cari section / field...",r.setAttribute("aria-label",a?"Cari template":"Cari section atau field")}function ue(){let r=performance.now(),a=w("#"+e+"-body");if(!a)return;if(u.uiPrepared&&u.renderedTab===u.tab&&u.renderedSearch===u.search){u.performance.skippedTabRenders+=1;return}a.dataset.sveTab=u.tab||"content",u.tab==="library"?a.innerHTML=Yd():u.tab==="content"?a.innerHTML=Wl():u.tab==="colors"?a.innerHTML=_d():u.tab==="style"?a.innerHTML=Bd():u.tab==="audio"?a.innerHTML=Ud():u.tab==="compatibility"?a.innerHTML=qd():a.innerHTML=Wl(),rf(a),Qd(),u.tab==="content"&&pd(),u.uiPrepared=!0,u.renderedTab=u.tab||"content",u.renderedSearch=u.search||"";let s=performance.now()-r;u.performance.renderCount+=1,u.performance.lastRenderMs=Math.round(s*100)/100,u.performance.lastRenderTab=u.renderedTab,s>50&&(u.performance.slowRenders+=1)}function Zd(r,a){return w('[data-image-path="'+CSS.escape(a)+'"]',r)}let Jd="Gambar base64 (copy dari Canva) tidak didukung. Upload gambar ke hosting, lalu paste URL https-nya.";function sc(r){!r||typeof r.setCustomValidity!="function"||(r.setCustomValidity(Jd),r.reportValidity?.(),setTimeout(()=>{r.setCustomValidity("")},4e3))}async function Xd(r,a){let s=Zd(r,a);if(!s)return!1;try{if(!navigator.clipboard||typeof navigator.clipboard.readText!="function")throw new Error("clipboard-unavailable");let o=String(await navigator.clipboard.readText()).trim();return o?o===s.value.trim()?(s.focus({preventScroll:!0}),!0):F(o)?(sc(s),!1):(s.value=o,s.dispatchEvent(new Event("change",{bubbles:!0})),s.focus({preventScroll:!0}),!0):!1}catch{return s.focus({preventScroll:!0}),!1}}function ef(r){let a=String(r.dataset.fieldType||"text"),s=r.value;return a==="boolean"?s=!!r.checked:a==="number"?(s=r.value===""?"":Number(r.value),s!==""&&!Number.isFinite(s)&&(s="")):a==="datetime"&&(s=Jh(r.value)),s}function oc(r){if(!r?.matches?.("[data-field-path]")||r.dataset.autoWeddingId==="1"||r.dataset.fieldReadonly==="1"||r.disabled)return!1;He(u.config,r.dataset.fieldPath,ef(r));let a=r.closest("[data-section-card]");return tr(a?.dataset.sectionCard),Ht(a),u.contentStateDirty=!0,!0}function lc(r){if(r.dataset.contentDelegated==="1")return;r.dataset.contentDelegated="1";let a=()=>{C(".section.dragging, .section.drag-before, .section.drag-after",r).forEach(s=>{s.classList.remove("dragging","drag-before","drag-after"),delete s.dataset.dropPlacement})};r.addEventListener("click",s=>{let o=s.target.closest("[data-section-up]");if(o){if(s.preventDefault(),s.stopPropagation(),o.disabled)return;Se(),El(o.dataset.sectionUp,-1);return}let l=s.target.closest("[data-section-down]");if(l){if(s.preventDefault(),s.stopPropagation(),l.disabled)return;Se(),El(l.dataset.sectionDown,1);return}if(s.target.closest("[data-section-drag]")){s.preventDefault(),s.stopPropagation();return}let p=s.target.closest("[data-repeat-add]");if(p){let k=p.dataset.repeatAdd,E=ke().flatMap(_=>_.fields||[]).find(_=>(_.type==="repeater"||le(_)==="repeater-image")&&_.path===k),T=B(u.config,k);Array.isArray(T)||(He(u.config,k,[]),T=B(u.config,k)),T.push(ad(E||{})),u.contentStateDirty=!0,tr(p.closest("[data-section-card]")?.dataset.sectionCard),Se("Item ditambahkan"),Ul(p.closest("[data-section-card]"));return}let d=s.target.closest("[data-repeat-delete]");if(d){let k=B(u.config,d.dataset.repeatDelete);if(!Array.isArray(k))return;let E=ke().flatMap(_=>_.fields||[]).find(_=>(_.type==="repeater"||le(_)==="repeater-image")&&_.path===d.dataset.repeatDelete),T=Number.isFinite(E?.min)?E.min:0;if(k.length<=T){Se("Minimal "+T+" item");return}k.splice(Number(d.dataset.repeatIndex),1),u.contentStateDirty=!0,tr(d.closest("[data-section-card]")?.dataset.sectionCard),Se("Item dihapus"),Ul(d.closest("[data-section-card]"));return}if(s.target.closest("#"+e+"-reset-all")){let k=Yh(),E=k>0?"Kembalikan "+k+` field ke kondisi terakhir halaman ini dimuat?

Perubahan yang Anda buat setelah itu \u2014 nama, tanggal, rekening, foto, warna \u2014 akan hilang dan tidak bisa dibatalkan.`:`Kembalikan semua pengaturan ke kondisi terakhir halaman ini dimuat?

Perubahan Anda akan hilang dan tidak bisa dibatalkan.`;if(!window.confirm(E))return;clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,Nl();return}if(s.target.closest("#"+e+"-team-key-save")){Gh();return}if(s.target.closest("#"+e+"-pin-peek")){pn("peek");return}if(s.target.closest("#"+e+"-pin-generate")){pn("generate");return}if(s.target.closest("#"+e+"-pin-copy")){Kh();return}if(s.target.closest("#"+e+"-pin-changekey")){qh();return}let S=s.target.closest(".section-head");if(S&&!s.target.closest(".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn")){let k=S.closest("[data-section-card]");if(!k)return;let E=!k.classList.contains("open");k.classList.toggle("open",E);let T=k.dataset.sectionCard;E?fn(k):(u.contentOpenSections.delete(T),w(".chev",k)?.setAttribute("aria-expanded","false"),Ht(k),dn(r))}}),r.addEventListener("input",s=>{let o=s.target;o instanceof HTMLElement&&o.matches("[data-field-path]")&&(o.tagName==="SELECT"||o.matches('input[type="checkbox"], input[type="radio"]')||oc(o)&&Hl())}),r.addEventListener("change",s=>{let o=s.target;if(o instanceof HTMLElement){if(o.matches("[data-visible-path]")){He(u.config,o.dataset.visiblePath,o.checked),Hl(o.checked?"Section ditampilkan":"Section disembunyikan");return}oc(o)&&Se("Konten diperbarui")}}),r.addEventListener("dragstart",s=>{let o=s.target.closest("[data-section-drag]");if(!o)return;if(o.disabled||o.getAttribute("draggable")!=="true"){s.preventDefault();return}Se();let l=o.closest("[data-section-card]");l&&(l.classList.add("dragging"),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",l.dataset.sectionCard),typeof s.dataTransfer.setDragImage=="function"&&s.dataTransfer.setDragImage(l,24,24))}),r.addEventListener("dragend",a),r.addEventListener("dragover",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let l=s.dataTransfer?.getData("text/plain")||w(".section.dragging",r)?.dataset?.sectionCard||"",p=o.dataset.sectionCard;if(!l||l===p)return;let d=ke().find(k=>Z(k)===p);if(p!=="cover"&&!jt(d))return;s.preventDefault(),s.dataTransfer.dropEffect="move";let x=o.getBoundingClientRect(),S=s.clientY<x.top+x.height/2?"before":"after";p==="cover"&&(S="after"),C(".section.drag-before, .section.drag-after",r).forEach(k=>{k!==o&&(k.classList.remove("drag-before","drag-after"),delete k.dataset.dropPlacement)}),o.dataset.dropPlacement=S,o.classList.toggle("drag-before",S==="before"),o.classList.toggle("drag-after",S==="after")}),r.addEventListener("dragleave",s=>{let o=s.target.closest("[data-section-card]");o&&(s.relatedTarget&&o.contains(s.relatedTarget)||(o.classList.remove("drag-before","drag-after"),delete o.dataset.dropPlacement))}),r.addEventListener("drop",s=>{let o=s.target.closest("[data-section-card]");if(!o)return;let l=s.dataTransfer.getData("text/plain"),p=o.dataset.sectionCard,d=o.dataset.dropPlacement||(p==="cover"?"after":"before");s.preventDefault(),a(),Ph(l,p,d)})}function tf(r){C("[data-library-import]",r).forEach(a=>{a.onclick=()=>{Th(a.dataset.libraryImport)}}),w("[data-library-clear]",r)?.addEventListener("click",_h),w("[data-library-refresh]",r)?.addEventListener("click",async()=>{await vl(!0),u.uiPrepared=!1,ue()})}function vi(r,a){let s=a+"Delegated";return r.dataset[s]==="1"?!1:(r.dataset[s]="1",!0)}function rf(r){if(u.tab==="library"){tf(r);return}if(u.tab==="content"){lc(r),nf(r);return}if(u.tab==="colors"){af(r);return}if(u.tab==="style"){sf(r);return}if(u.tab==="audio"){of(r);return}if(u.tab==="compatibility"){lf(r);return}lc(r)}function nf(r){if(!vi(r,"images"))return;r.addEventListener("click",s=>{let o=s.target.closest("[data-image-paste-path]");if(o){s.preventDefault(),s.stopPropagation(),Xd(r,o.dataset.imagePastePath);return}let l=s.target.closest("[data-image-delete-path]");if(l){Cd(l.dataset.imageDeletePath);return}let p=s.target.closest("[data-image-open-advance]");if(p){let E=p.dataset.imageOpenAdvance,T=w(`[data-image-card-path="${CSS.escape(E)}"]`,r),_=T?w(".image-advance",T):null;if(_){let W=!_.open;_.open=W,p.setAttribute("aria-expanded",String(W)),p.setAttribute("aria-label",W?"Tutup pengaturan gambar":"Buka pengaturan gambar"),p.title=W?"Tutup pengaturan gambar":"Pengaturan gambar",p.classList.toggle("active",W),W?_.scrollIntoView({block:"nearest",behavior:"smooth"}):p.closest(".image-card")?.scrollIntoView({block:"nearest",behavior:"smooth"})}return}let d=s.target.closest("[data-image-align-path]");if(d){let E=d.dataset.imageAlignPath,T=["left","center","right"].includes(d.dataset.imageAlign)?d.dataset.imageAlign:"center";Wt(E,{align:T}),Zi(),rr(r,E);let _=w(`[data-image-path="${CSS.escape(E)}"]`,r);_&&bi(_,E);return}let x=s.target.closest("[data-image-fit-path]");if(x){let E=x.dataset.imageFitPath,T=ol.includes(x.dataset.imageFit)?x.dataset.imageFit:"auto";Wt(E,{fit:T}),Zi(),rr(r,E);let _=w(`[data-image-path="${CSS.escape(E)}"]`,r);_&&bi(_,E);return}let S=s.target.closest("[data-image-alignpos-path]");if(S){let E=S.dataset.imageAlignposPath,T=Jr.includes(S.dataset.imageAlignpos)?S.dataset.imageAlignpos:"default";Wt(E,{alignPos:T}),Zi(),rr(r,E);let _=w(`[data-image-path="${CSS.escape(E)}"]`,r);_&&bi(_,E);return}let k=s.target.closest("[data-gallery-delete-index]");if(k){wd(k.dataset.galleryDeleteIndex,Number(k.dataset.galleryIndex));return}}),r.addEventListener("input",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){let p=w(`[data-image-width-number="${CSS.escape(o)}"]`,r);p&&(p.value=s.target.value);return}let l=s.target.dataset.imageWidthNumber;if(l!==void 0){let p=Math.max(0,Math.min(100,Number(s.target.value)||0)),d=w(`[data-image-width-path="${CSS.escape(l)}"]`,r);d&&(d.value=p);return}});let a=(s,o)=>{let l=Math.max(0,Math.min(100,Number(o)||0));Wt(s,{width:l}),Zi();let p=w(`[data-image-path="${CSS.escape(s)}"]`,r);p&&bi(p,s),rr(r,s)};r.addEventListener("change",s=>{let o=s.target.dataset.imageWidthPath;if(o!==void 0){a(o,s.target.value);return}let l=s.target.dataset.imageWidthNumber;if(l!==void 0){a(l,s.target.value);return}let p=s.target.closest("[data-image-path]");if(!p)return;let d=p.dataset.imagePath,x=p.value.trim(),S=String(B(u.config,d)||"");if(x!==S){if(F(x)){p.value=S,sc(p);return}He(u.config,d,x),x&&Wt(d,{hidden:!1}),Le("Gambar diperbarui"),bi(p,d)}}),r.addEventListener("paste",s=>{let o=s.target.closest("[data-image-path]");o&&setTimeout(()=>{o.dispatchEvent(new Event("change",{bubbles:!0}))},0)})}function af(r){if(!vi(r,"colors"))return;let a=(o,l,p)=>{let d=o.value.trim();if(!d||!Ed(d)){if(p){let S=xe(l);S&&(o.value=S)}return}Fe(l,d);let x=w(`[data-color-var="${CSS.escape(l)}"]`,r);x&&(x.value=xi(d,x.value||"#000000"))},s=o=>{let l=Xi(o);if(!l)return;Fe(o,l);let p=w(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),d=w(`[data-color-var="${CSS.escape(o)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(l))&&(p.value=l)}d&&(d.value=xi(l,d.value))};r.addEventListener("click",o=>{let l=o.target.closest("[data-reset-token]");if(l){s(l.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-colors")){I.forEach(([,,p])=>{let d=xe(p);d&&Fe(p,Xi(p)||d)}),C("[data-color-token-var]",r).forEach(p=>{let d=p.dataset.colorTokenVar,x=xe(d);x&&(p.value=x)}),C("[data-color-var]",r).forEach(p=>{p.value=xi(xe(p.dataset.colorVar),p.value)});return}}),r.addEventListener("input",o=>{let l=o.target.dataset.colorTokenVar;if(l!==void 0){a(o.target,l,!1);return}let p=o.target.dataset.colorVar;if(p!==void 0){Fe(p,o.target.value);let d=w(`[data-color-token-var="${CSS.escape(p)}"]`,r);d&&(d.value=o.target.value)}}),r.addEventListener("change",o=>{let l=o.target.dataset.colorTokenVar;l!==void 0&&a(o.target,l,!0)})}function sf(r){if(!vi(r,"style"))return;let a=(o,l)=>{let p=String(o.value||"").trim();if(p){if((l==="--sve-heading-weight"||l==="--sve-body-weight")&&!Fd(l==="--sve-heading-weight"?"heading":"body",p)){let x=xe(l);x&&(o.value=x);return}Fe(l,p),(l==="--sve-heading-weight"||l==="--sve-body-weight")&&ar()}},s=o=>{let l=Xi(o);if(!l)return;Fe(o,l);let p=w(`[data-color-token-var="${CSS.escape(o)}"], [data-style-var="${CSS.escape(o)}"]`,r),d=w(`[data-color-var="${CSS.escape(o)}"]`,r);if(p){let x=p.tagName==="SELECT"?Array.from(p.options).map(S=>S.value):[];(!x.length||x.includes(l))&&(p.value=l)}d&&(d.value=xi(l,d.value))};r.addEventListener("click",o=>{let l=o.target.closest("[data-reset-token]");if(l){s(l.dataset.resetToken);return}if(o.target.closest("#"+e+"-reset-style")){Vd();return}if(o.target.closest("#"+e+"-reset-all")){Nl();return}if(o.target.closest("#"+e+"-heading-font-apply")){sr("heading");return}o.target.closest("#"+e+"-body-font-apply")&&sr("body")}),r.addEventListener("change",o=>{let l=o.target.dataset.styleVar;l!==void 0&&a(o.target,l)}),r.addEventListener("input",o=>{if(o.target.tagName!=="SELECT")return;let l=o.target.dataset.styleVar;l!==void 0&&a(o.target,l)}),r.addEventListener("keydown",o=>{o.key==="Enter"&&(o.target.id===e+"-heading-font"?(o.preventDefault(),sr("heading")):o.target.id===e+"-body-font"&&(o.preventDefault(),sr("body")))})}function of(r){if(!vi(r,"audio"))return;let s=Al().path||"assets.audio",o=w("#"+e+"-audio-url",r),l=w("#"+e+"-audio-start-enabled",r),p=w("#"+e+"-audio-start-time",r);if(!o)return;let d=()=>{let S=o.value.trim(),k=B(u.config,s);if(typeof k=="string"&&k===S){ic(r,S);return}He(u.config,s,S),Le("Audio diperbarui"),ic(r,S)},x=()=>{if(!l||!p)return;let S=o.value.trim(),k=l.checked?lr(p.value):0,E=jd(S,k);o.value=E,p.disabled=!l.checked,l.checked&&(p.value=wn(k)),He(u.config,s,E),Le(k>0?"Waktu mulai audio diperbarui":"Waktu mulai audio dimatikan")};o.addEventListener("paste",()=>{setTimeout(d,0)}),o.addEventListener("change",d),l?.addEventListener("change",()=>{p&&(p.disabled=!l.checked,l.checked&&lr(p.value)<=0&&(p.value="0:00",p.focus()),x())}),p?.addEventListener("change",x)}function lf(r){vi(r,"compat")}function cf(){Object.values(u.editors).forEach(r=>{r&&qi(r,!0)})}function uf(r,a=""){let s=w("#"+e+"-body");if(!s||!Se()||(u.sourceDirty||!u.doc)&&!_e()||(r=String(r||"").trim(),r&&!ot(r)))return!1;let o=r&&bn().find(k=>k.path===r),l=pi(),p=k=>er(k).some(E=>E.path===r||(E.type==="repeater"||le(E)==="repeater-image")&&r.startsWith(E.path+".")),d=r&&(l.find(k=>Z(k)===a&&p(k))||l.find(p))||l.find(k=>Z(k)===a);if(!o&&!d)return!1;u.search="";let x=w("#"+e+"-search");x&&(x.value=""),u.open||Vt(!0),Bt("content");let S;if(o){let k=w(`[data-section-card="${CSS.escape(Z(d))}"]`,s);if(!k)return!1;fn(k),S=w(`[data-image-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}else{let k=w(`[data-section-card="${CSS.escape(Z(d))}"]`,s);if(!k)return!1;fn(k),S=r&&w(`[data-field-path="${CSS.escape(r)}"]`,k),S||(S=w(".chev",k))}return S?(S.focus({preventScroll:!0}),S.scrollIntoView({block:"nearest",behavior:"auto"}),!0):!1}let cc='#builder-canvas-boundary iframe[title="HTML Mode preview"][srcdoc]';function pf(r,a,s){if(typeof a!="string"||!a||a.length>256||typeof s!="string"||!s.startsWith("html-mode-preview:")||s.length>256)return null;let o=r?.getAttribute("srcdoc")||"";if(!o)return null;let l=u.canvasPickSources.get(r);if(!l||l.source!==o){let S=document.createElement("template");S.innerHTML=o,l={source:o,root:S.content.querySelector("#scalev-html-mode-preview-root"),scripts:C("script",S.content).map(k=>k.textContent).join(`
`)},u.canvasPickSources.set(r,l)}if(!l.root||!l.scripts.includes(JSON.stringify(s)))return null;let p=l.root.querySelector(`[data-scalev-inspector-id="${CSS.escape(a)}"]`);if(!p)return null;let d=p.matches("[data-sve-field]")?p:p.querySelector("[data-sve-field]")||p.closest("[data-sve-field]"),x=p.closest("[data-section-id], [data-sve-section]");return{path:d?.getAttribute("data-sve-field")||"",sectionHint:x?.getAttribute("data-section-id")||x?.id||x?.getAttribute("data-sve-section")||""}}function hf(){if(u.canvasPickMessageBound)return;u.canvasPickMessageBound=!0;let r=location.href,a=null;window.addEventListener("message",s=>{if(location.href!==r)return;let o=s.data;if(!o||o.type!=="scalev-html-mode-inspector-selected"||s.origin!=="null"||typeof o.inspectorId!="string"||!o.inspectorId||o.inspectorId.length>256||typeof o.previewId!="string"||o.previewId.length>256)return;let l=C(cc).find(W=>W.contentWindow===s.source);if(!l||!l.sandbox.contains("allow-scripts")||l.sandbox.contains("allow-same-origin"))return;let p=l.getAttribute("srcdoc"),d=location.href,{open:x,tab:S,sourceDirty:k}=u,E=u.performance.configCommitCount,T=j("html"),_=j("js");cancelAnimationFrame(a),a=requestAnimationFrame(()=>{if(a=null,location.href!==d||!l.isConnected||!l.matches(cc)||l.contentWindow!==s.source||l.getAttribute("srcdoc")!==p||u.open!==x||u.tab!==S||u.sourceDirty!==k||u.performance.configCommitCount!==E||j("html")!==T||j("js")!==_)return;let W=pf(l,o.inspectorId,o.previewId);W&&(W.path||W.sectionHint)&&uf(W.path,W.sectionHint)})})}function df(){let r="https://wa.me/"+h+"?text="+encodeURIComponent(f);window.open(r,"_blank","noopener,noreferrer")}function ff(){performance.mark("sve-styles-start"),mf(),performance.mark("sve-styles-critical-done"),Mt(gf,50)}function mf(){if(document.getElementById(e+"-style-critical"))return;let r=document.createElement("style");r.id=e+"-style-critical",r.textContent=`#${e},
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
`,document.head.appendChild(r)}function gf(){if(document.getElementById(e+"-style-deferred"))return;let r=document.createElement("style");r.id=e+"-style-deferred",r.textContent=`
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
`,document.head.appendChild(r),performance.mark("sve-styles-all-done")}function bf(){ff();let r=document.createElement("div");r.id=e,r.dataset.sveChannel="production",r.innerHTML=`
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
    `,document.body.appendChild(r),w("#"+e+"-close").onclick=()=>{Vt(!1)},w("#"+e+"-refresh").onclick=()=>{_e()&&(ue(),ze({force:!0,syncImages:!0}))},document.getElementById(e+"-reload-source").onclick=()=>{clearTimeout(u.contentCommitTimer),u.contentCommitTimer=null,u.contentCommitMessage="",u.contentStateDirty=!1,u.commitError="",document.getElementById(e+"-commit-notice").hidden=!0,_e()&&(ue(),ze({force:!0,syncImages:!0}))},w("#"+e+"-support").onclick=df;let a=w("#"+e+"-editor-update"),s=w("#"+e+"-update-status"),o=!1,l=!1,p=0,d=null,x=15e3,S=(E,T,_=!1)=>{a.textContent=E,a.title=T,a.setAttribute("aria-label",T),a.disabled=_},k=()=>{p=Date.now()+x,S("Cek Update","Cek update Visual Editor",!0),clearTimeout(d),d=setTimeout(()=>{p=0,!l&&!o&&S("Cek Update","Cek update Visual Editor")},x)};a.addEventListener("click",()=>{if(o){window.open(g,"_blank","noopener");return}if(l||Date.now()<p){s.textContent="Tunggu sebentar";return}o=!1,l=!0,S("Mengecek...","Sedang mengecek update Visual Editor",!0),s.textContent="Mengecek GitHub...",GM_xmlhttpRequest({method:"GET",url:`${y}?check=${Date.now()}`,onload(E){let T=At=>{o=!1,l=!1,S("Cek Update","Cek update Visual Editor"),s.textContent=At,k()};if(E.status<200||E.status>=300){T(E.status===403||E.status===429?"Tunggu sebentar":"Gagal cek update");return}let W=(E.responseText||"").match(/@version\s+([^\s]+)/),pe=W&&W[1];if(!pe){T("Gagal cek update");return}pe===t?(o=!1,l=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Sudah terbaru",k()):(o=!0,l=!1,S("Pasang",`Pasang update Visual Editor versi ${pe}`),s.textContent=`Update tersedia: versi ${pe}.`)},onerror(){o=!1,l=!1,S("Cek Update","Cek update Visual Editor"),s.textContent="Gagal cek update",k()}})}),w("#"+e+"-search").addEventListener("input",ci(E=>{u.search=E.target.value.toLowerCase().trim(),u.uiPrepared=!1,ue()},100)),C(".tab",r).forEach(E=>{E.onclick=()=>{Se()&&Bt(E.dataset.tab)}})}function xf(){let r=ci(()=>{u.performance.editorScanCount=(u.performance.editorScanCount||0)+1,Ot(),Hi(),fl();let d=Et();d&&ui(d,{commit:!0,silent:!0}),u.open&&zi(!0);let x=an();if(x.length!==u.allEditors.length||x.some((S,k)=>S!==u.allEditors[k])){if(u.sourceDirty=!0,!_e())return;Ut.invalidate(),hl(),u.open?ue():Wi()}},160),a='.CodeMirror, iframe, input, button, header, [role="tab"]',s=new MutationObserver(d=>{d.some(x=>!x.target.closest?.("#"+e)&&[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}),o=null,l=()=>{let d=nn();d!==o&&(s.disconnect(),o=d,d&&s.observe(d,{childList:!0,subtree:!0}),r())};new MutationObserver(d=>{l(),d.some(x=>[...x.addedNodes,...x.removedNodes].some(S=>S instanceof Element&&S.id!==e&&!S.closest("#"+e)&&(S.matches(a)||S.querySelector(a))))&&r()}).observe(document.body,{childList:!0}),l(),document.addEventListener("load",d=>{d.target instanceof HTMLIFrameElement&&(Ut.invalidate(),ze({force:!0,syncImages:!0}))},!0),document.addEventListener("click",d=>{let x=d.target.closest?.("button");if(!(!x||x.closest("#"+e)||!/^(simpan|save|publish|terbitkan|simpan\s+(?:&|dan)\s+terbitkan)$/i.test(x.textContent.trim()))&&!(!u.config&&!u.doc?.querySelector("[data-sve-template]")&&!j("js").includes("SVE_SCHEMA"))){if(!Se()){d.preventDefault(),d.stopImmediatePropagation();return}cf(),ac().blockers.length&&(d.preventDefault(),d.stopImmediatePropagation(),Vt(!0),u.uiPrepared=!1,Bt("compatibility"))}},!0),document.addEventListener("keydown",d=>{d.key==="Escape"&&u.open&&document.getElementById(e)?.contains(d.target)&&(Vt(!1),document.getElementById(e+"-toolbar-toggle")?.focus())}),document.addEventListener("input",d=>{Xr(d.target)&&(u.scalevSlug=Ct(d.target.value),nh())},!0),document.addEventListener("change",d=>{if(Xr(d.target)){let x=Ct(d.target.value);x&&(u.scalevSlug=x,ui(x,{commit:!0}))}},!0),window.addEventListener("resize",ci(()=>{Hi(),u.open&&zi(!0)},80))}function uc(){b()&&(bf(),fl(),hf(),xf(),rn(),requestAnimationFrame(()=>{Hi()}),Wi(),console.info("[Scalev Visual Editor]",t))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",uc,{once:!0}):uc()})();})();
