(()=>{var e={57:(e,t,i)=>{function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e){"function"!=typeof e&&(e=s.defunct);var t=[],i=[],n=0;function o(){for(var e=[],t=0,n=this.state,s=this.index,o=this.input,l=0,r=i.length;l<r;l++){var a=i[l],h=a.start,u=h.length;if(!u||h.indexOf(n)>=0||n%2&&1===u&&!h[0]){var c=a.pattern;c.lastIndex=s;var d=c.exec(o);if(d&&d.index===s){var p=e.push({result:d,action:a.action,length:d[0].length});for(a.global&&(t=p);--p>t;){var f=p-1;if(e[p].length>e[f].length){var g=e[p];e[p]=e[f],e[f]=g}}}}}return e}this.state=0,this.index=0,this.input="",this.addRule=function(e,t,n){var s=e.global;if(!s){var o="g";e.multiline&&(o+="m"),e.ignoreCase&&(o+="i"),e=new RegExp(e.source,o)}return"[object Array]"!==Object.prototype.toString.call(n)&&(n=[0]),i.push({pattern:e,global:s,action:t,start:n}),this},this.setInput=function(e){return n=0,this.state=0,this.index=0,t.length=0,this.input=e,this},this.lex=function(){if(t.length)return t.shift();for(this.reject=!0;this.index<=this.input.length;){for(var i=o.call(this).splice(n),s=this.index;i.length&&this.reject;){var l=i.shift(),r=l.result,a=l.length;this.index+=a,this.reject=!1,n++;var h=l.action.apply(this,r);if(this.reject)this.index=r.index;else if(void 0!==h)switch(Object.prototype.toString.call(h)){case"[object Array]":t=h.slice(1),h=h[0];default:return a&&(n=0),h}}var u=this.input;if(s<u.length)if(this.reject){if(n=0,void 0!==(h=e.call(this,u.charAt(this.index++))))return"[object Array]"===Object.prototype.toString.call(h)?(t=h.slice(1),h[0]):h}else this.index!==s&&(n=0),this.reject=!0;else{if(!i.length)break;this.reject=!0}}}}"object"===n(e=i.nmd(e))&&"object"===n(e.exports)&&(e.exports=s),s.defunct=function(e){throw new Error("Unexpected character at index "+(this.index-1)+": "+e)}}},t={};function i(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n](o,o.exports,i),o.loaded=!0,o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{"use strict";var e=i(57),t=i.n(e);function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e){this.size=0,this.limit=e,this.oldest=this.newest=void 0,this._keymap={}}s.prototype._markEntryAsUsed=function(e){e!==this.newest&&(e.newer&&(e===this.oldest&&(this.oldest=e.newer),e.newer.older=e.older),e.older&&(e.older.newer=e.newer),e.newer=void 0,e.older=this.newest,this.newest&&(this.newest.newer=e),this.newest=e)},s.prototype.put=function(e,t){var i=this._keymap[e];return i?(i.value=t,void this._markEntryAsUsed(i)):(this._keymap[e]=i={key:e,value:t,older:void 0,newer:void 0},this.newest?(this.newest.newer=i,i.older=this.newest):this.oldest=i,this.newest=i,this.size++,this.size>this.limit?this.shift():void 0)},s.prototype.shift=function(){var e=this.oldest;return e&&(this.oldest.newer?(this.oldest=this.oldest.newer,this.oldest.older=void 0):(this.oldest=void 0,this.newest=void 0),e.newer=e.older=void 0,delete this._keymap[e.key],this.size--),e},s.prototype.get=function(e,t){var i=this._keymap[e];if(void 0!==i)return this._markEntryAsUsed(i),t?i:i.value},s.prototype.find=function(e){return this._keymap[e]},s.prototype.set=function(e,t){var i,n=this.get(e,!0);return n?(i=n.value,n.value=t):(i=this.put(e,t))&&(i=i.value),i},s.prototype.remove=function(e){var t=this._keymap[e];if(t)return delete this._keymap[t.key],t.newer&&t.older?(t.older.newer=t.newer,t.newer.older=t.older):t.newer?(t.newer.older=void 0,this.oldest=t.newer):t.older?(t.older.newer=void 0,this.newest=t.older):this.oldest=this.newest=void 0,this.size--,t.value},s.prototype.removeAll=function(){this.oldest=this.newest=void 0,this.size=0,this._keymap={}},"function"==typeof Object.keys?s.prototype.keys=function(){return Object.keys(this._keymap)}:s.prototype.keys=function(){var e=[];for(var t in this._keymap)e.push(t);return e},s.prototype.forEach=function(e,t,i){var s;if(!0===t?(i=!0,t=void 0):"object"!==n(t)&&(t=this),i)for(s=this.newest;s;)e.call(t,s.key,s.value,this),s=s.older;else for(s=this.oldest;s;)e.call(t,s.key,s.value,this),s=s.newer},s.prototype.toJSON=function(){for(var e=new Array(this.size),t=0,i=this.oldest;i;)e[t++]={key:i.key,value:i.value},i=i.newer;return e},s.prototype.toString=function(){for(var e="",t=this.oldest;t;)e+=String(t.key)+":"+t.value,(t=t.newer)&&(e+=" < ");return e};const o=s;var l="(-?0|-?[1-9][0-9]*)",r="[eE][+-]?[0-9]+",a=new RegExp(l),h=new RegExp(l+"\\.[0-9]+"+"[eE][+-]?[0-9]+|"+l+"\\.[0-9]+|"+l+r),u=new RegExp('\\"(\\\\[\\\\"/bfnrt]|\\\\u[0-9A-Fa-f]{4}|[^\\"\\\\\\n\\r\\u2028\\u2029])*\\"'),c=/[ \t\v\f\u00A0]+/,d=new(t())((function(){}));function p(e,t){return{name:e,value:t}}function f(e,t,i,n){var s=e;return void 0!==n&&(s+="<i>"+n+"</i>"),{text:e,snippetBefore:t||"",snippetAfter:i||"",suggestionText:s}}d.addRule(c,(function(){})),d.addRule(/\./,(function(e){return p("DOT",e)})),d.addRule(/,/,(function(e){return p("COMMA",e)})),d.addRule(new RegExp("or(?![_0-9A-Za-z])"),(function(e){return p("OR",e)})),d.addRule(new RegExp("and(?![_0-9A-Za-z])"),(function(e){return p("AND",e)})),d.addRule(new RegExp("not(?![_0-9A-Za-z])"),(function(e){return p("NOT",e)})),d.addRule(new RegExp("in(?![_0-9A-Za-z])"),(function(e){return p("IN",e)})),d.addRule(new RegExp("True(?![_0-9A-Za-z])"),(function(e){return p("TRUE",e)})),d.addRule(new RegExp("False(?![_0-9A-Za-z])"),(function(e){return p("FALSE",e)})),d.addRule(new RegExp("None(?![_0-9A-Za-z])"),(function(e){return p("NONE",e)})),d.addRule(/[_A-Za-z][_0-9A-Za-z]*(\.[_A-Za-z][_0-9A-Za-z]*)*/,(function(e){return p("NAME",e)})),d.addRule(u,(function(e){return p("STRING_VALUE",e.slice(1,e.length-1))})),d.addRule(a,(function(e){return p("INT_VALUE",e)})),d.addRule(h,(function(e){return p("FLOAT_VALUE",e)})),d.addRule(/\(/,(function(e){return p("PAREN_L",e)})),d.addRule(/\)/,(function(e){return p("PAREN_R",e)})),d.addRule(/=/,(function(e){return p("EQUALS",e)})),d.addRule(/!=/,(function(e){return p("NOT_EQUALS",e)})),d.addRule(/>/,(function(e){return p("GREATER",e)})),d.addRule(/>=/,(function(e){return p("GREATER_EQUAL",e)})),d.addRule(/</,(function(e){return p("LESS",e)})),d.addRule(/<=/,(function(e){return p("LESS_EQUAL",e)})),d.addRule(/~/,(function(e){return p("CONTAINS",e)})),d.addRule(/!~/,(function(e){return p("NOT_CONTAINS",e)})),d.lexAll=function(){for(var e,t=[];e=this.lex();)e.start=this.index-e.value.length,e.end=this.index,t.push(e);return t};var g=function(e){var t=100;this.options=e,this.currentModel=null,this.models={},this.suggestionsAPIUrl=null,this.token=p,this.lexer=d,this.prefix="",this.suggestions=[],this.selected=null,this.valuesCaseSensitive=!1,this.highlightCaseSensitive=!0,this.textarea=null,this.completion=null,this.completionUL=null,this.completionEnabled=!1,this.isObject(e)?(this.loadIntrospections(e.introspections),"string"==typeof e.selector?this.textarea=document.querySelector(e.selector):this.textarea=e.selector,this.textarea?"TEXTAREA"===this.textarea.tagName?(e.valuesCaseSensitive&&(this.valuesCaseSensitive=!0),e.cacheSize&&(parseInt(e.cacheSize,10)!==e.cacheSize||e.cacheSize<1?this.logError("cacheSize must be a positive integer"):t=e.cacheSize),this.suggestionsCache=new o(t),this.debouncedLoadFieldOptions=this.debounce(this.loadFieldOptions.bind(this),300),this.loading=!1,this.enableCompletion=this.enableCompletion.bind(this),this.disableCompletion=this.disableCompletion.bind(this),this.onCompletionMouseClick=this.onCompletionMouseClick.bind(this),this.onCompletionMouseDown=this.onCompletionMouseDown.bind(this),this.popupCompletion=this.popupCompletion.bind(this),this.debouncedRenderCompletion=this.debounce(this.renderCompletion.bind(this),50),this.textarea.setAttribute("autocomplete","off"),this.textarea.addEventListener("keydown",this.onKeydown.bind(this)),this.textarea.addEventListener("blur",this.hideCompletion.bind(this)),this.textarea.addEventListener("click",this.popupCompletion),e.autoResize?(this.textareaResize=this.textareaResize.bind(this),this.textarea.style.resize="none",this.textarea.style.overflow="hidden",this.textarea.addEventListener("input",this.textareaResize),this.textareaResize(),window.addEventListener("load",this.textareaResize)):(this.textareaResize=null,this.textarea.addEventListener("mouseup",this.renderCompletion.bind(this,!0)),this.textarea.addEventListener("mouseout",this.renderCompletion.bind(this,!0))),this.createCompletionElement()):this.logError("selector must be pointing to <textarea> element, but "+this.textarea.tagName+" was found"):this.logError("Element not found by selector: "+e.selector)):this.logError("Please pass an object with initialization parameters")};g.init=function(e){return new g(e)},g.DOMReady=function(e){"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},g.prototype={createCompletionElement:function(){var e,t=this.options;this.completion||(this.completion=document.createElement("div"),this.completion.className="djangoql-completion",document.querySelector("body").appendChild(this.completion),this.completionUL=document.createElement("ul"),this.completionUL.onscroll=this.throttle(this.onCompletionScroll.bind(this),50),this.completion.appendChild(this.completionUL),"string"==typeof t.syntaxHelp&&((e=document.createElement("p")).className="syntax-help",e.innerHTML='<a href="'+t.syntaxHelp+'" target="_blank">Syntax Help</a>',e.addEventListener("mousedown",(function(e){e.preventDefault()})),this.completion.appendChild(e)),this.completionEnabled=!t.hasOwnProperty("completionEnabled")||t.completionEnabled)},destroyCompletionElement:function(){this.completion&&(this.completion.parentNode.removeChild(this.completion),this.completion=null,this.completionEnabled=!1)},enableCompletion:function(){this.completionEnabled=!0},disableCompletion:function(){this.completionEnabled=!1,this.hideCompletion()},getJson:function(e,t){this.loading=!0;var i=function(){this.loading=!1,this.request=null,this.logError("failed to fetch from "+e)}.bind(this);this.request&&this.request.abort(),this.request=new XMLHttpRequest,this.request.open("GET",e,!0),this.request.onload=function(){this.loading=!1,200===this.request.status?"function"==typeof t.success&&t.success(JSON.parse(this.request.responseText)):i(),this.request=null}.bind(this),this.request.ontimeout=i,this.request.onerror=i,this.request.onprogress=function(){},window.setTimeout(this.request.send.bind(this.request))},loadIntrospections:function(e){var t=function(e){this.currentModel=e.current_model,this.models=e.models,this.suggestionsAPIUrl=e.suggestions_api_url}.bind(this);"string"==typeof e?this.getJson(e,{success:t}):this.isObject(e)?t(e):this.logError("introspections parameter is expected to be either URL or object with definitions, but "+e+" was found")},isObject:function(e){return"[object Object]"==={}.toString.call(e)},debounce:function(e,t,i){var n,s,o,l,r,a=function a(){var h=Date.now()-r;h<t&&h>=0?l=setTimeout(a,t-h):(l=null,i||(o=e.apply(s,n),l||(n=null,s=null)))};return function(){var h;return s=this,n=arguments,r=Date.now(),h=i&&!l,l||(l=setTimeout(a,t)),h&&(o=e.apply(s,n),n=null,s=null),o}},throttle:function(e,t,i){var n,s,o,l,r,a,h=0;return i||(i={}),r=function(){h=!1===i.leading?0:(new Date).getTime(),n=null,l=e.apply(s,o),n||(s=null,o=null)},(a=function(){var a,u=(new Date).getTime();return h||!1!==i.leading||(h=u),s=this,o=arguments,(a=t-(u-h))<=0||a>t?(n&&(window.clearTimeout(n),n=null),h=u,l=e.apply(s,o),n||(s=null,o=null)):n||!1===i.trailing||(n=window.setTimeout(r,a)),l}).cancel=function(){window.clearTimeout(n),h=0,n=null,s=null,o=null},a},setUrlParams:function(e,t){var i,n,s,o,l=e.split("?"),r=l[0],a=l.slice(1).join("?"),h=a.split("&");for(n in t)if(t.hasOwnProperty(n)){for(n=encodeURI(n),s=encodeURI(t[n]),o=h.length;o--;)if((i=h[o].split("="))[0]===n){i[1]=s,h[o]=i.join("=");break}o<0&&h.push(n+"="+s)}return(a=h.join("&"))?[r,a].join("?"):r},logError:function(e){console.error("DjangoQL: "+e)},onCompletionMouseClick:function(e){this.selectCompletion(parseInt(e.currentTarget.getAttribute("data-index"),10))},onCompletionMouseDown:function(e){e.preventDefault()},onKeydown:function(e){switch(e.keyCode){case 38:this.suggestions.length&&(null===this.selected?this.selected=this.suggestions.length-1:0===this.selected?this.selected=null:this.selected-=1,this.renderCompletion(),e.preventDefault());break;case 40:this.suggestions.length&&(null===this.selected?this.selected=0:this.selected<this.suggestions.length-1?this.selected+=1:this.selected=null,this.renderCompletion(),e.preventDefault());break;case 9:null!==this.selected&&(this.selectCompletion(this.selected),e.preventDefault());break;case 13:null!==this.selected?this.selectCompletion(this.selected):"function"==typeof this.options.onSubmit?this.options.onSubmit(this.textarea.value):e.currentTarget.form.submit(),e.preventDefault();break;case 27:this.hideCompletion();break;case 16:case 17:case 18:case 91:case 93:break;default:window.setTimeout(this.popupCompletion,10)}},textareaResize:function(){var e=window.getComputedStyle(this.textarea,null),t=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom);this.textarea.style.height="5px",this.textarea.style.height=this.textarea.scrollHeight-t+1+"px"},popupCompletion:function(){this.generateSuggestions(),this.renderCompletion()},selectCompletion:function(e){var t=this.getContext(this.textarea.value,this.textarea.selectionStart),i=t.currentFullToken,n=this.textarea.value,s=this.textarea.selectionStart-t.prefix.length,o=null;i&&(o=i.end,n=n.slice(0,s)+n.slice(o));var l=n.slice(0,s),r=n.slice(s);r=r.trim();var a=this.suggestions[e],h=a.snippetBefore,u=a.snippetAfter,c=u.split("|");c.length>1&&(u=c.join(""),h||a.text||(h=c[0],u=c[1])),l.endsWith(h)&&(h=""),r.startsWith(u)&&(u="");var d=h+a.text+u,p=l.length+d.length;c.length>1&&(p-=c[1].length),this.textarea.value=l+d+r,this.textarea.focus(),this.textarea.setSelectionRange(p,p),this.selected=null,this.textareaResize&&this.textareaResize(),this.generateSuggestions(this.textarea),this.renderCompletion()},hideCompletion:function(){this.selected=null,this.completion&&(this.completion.style.display="none")},escapeRegExp:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},highlight:function(e,t){return t&&e?this.highlightCaseSensitive?e.split(t).join("<b>"+t+"</b>"):e.replace(new RegExp("("+this.escapeRegExp(t)+")","ig"),"<b>$1</b>"):e},renderCompletion:function(e){var t,i,n,s,o,l,r,a,h;if(this.completionEnabled){if(!e||"none"!==this.completion.style.display)if(this.suggestions.length||this.loading){for(a=this.suggestions.length,r=(l=[].slice.call(this.completionUL.querySelectorAll("li[data-index]"))).length,i=0;i<a;i++)i<r?t=l[i]:((t=document.createElement("li")).setAttribute("data-index",i),t.addEventListener("click",this.onCompletionMouseClick),t.addEventListener("mousedown",this.onCompletionMouseDown),this.completionUL.appendChild(t)),t.innerHTML=this.highlight(this.suggestions[i].suggestionText,this.prefix),i===this.selected?(t.className="active",s=t.getBoundingClientRect(),n=this.completionUL.getBoundingClientRect(),s.bottom>n.bottom?this.completionUL.scrollTop=this.completionUL.scrollTop+2+(s.bottom-n.bottom):s.top<n.top&&(this.completionUL.scrollTop=this.completionUL.scrollTop-2-(n.top-s.top))):t.className="";for(;r>a;)l[--r].removeEventListener("click",this.onCompletionMouseClick),l[r].removeEventListener("mousedown",this.onCompletionMouseDown),this.completionUL.removeChild(l[r]);h=this.completionUL.querySelector("li.djangoql-loading"),this.loading?h||((h=document.createElement("li")).className="djangoql-loading",h.innerHTML="&nbsp;",this.completionUL.appendChild(h)):h&&this.completionUL.removeChild(h),o=this.textarea.getBoundingClientRect(),this.completion.style.top=window.pageYOffset+o.top+o.height+"px",this.completion.style.left=o.left+"px",this.completion.style.display="block"}else this.hideCompletion()}else this.hideCompletion()},resolveName:function(e){var t,i,n,s=e.split("."),o=this.currentModel,l=null;if(o)for(i=0,n=s.length;i<n;i++){if(!(t=this.models[o][s[i]])){o=null,l=null;break}"relation"===t.type?(o=t.relation,l=null):l=s[i]}return{model:o,field:l}},getContext:function(e,t){var i,n,s,o,l=null,r=null,a=null,h=null,u=null,d=this.lexer.setInput(e.slice(0,t)).lexAll(),p=this.lexer.setInput(e).lexAll(),f=null;return d.length&&d[d.length-1].end>=t&&(f=p[d.length-1],d.pop()),d.length&&(h=d[d.length-1],d.length>1&&(u=d[d.length-2])),(n=(i=e.slice(h?h.end:0,t)).match(c))&&(i=i.slice(n[0].length)),"("===i&&(i=""),(")"!==i||n)&&(!h||["AND","OR"].indexOf(h.name)>=0&&n||"."===i&&h&&!n||"PAREN_L"===h.name&&(!u||["AND","OR"].indexOf(u.name)>=0)?(l="field",r=this.currentModel,"."===i&&(i=e.slice(h.start,t)),(s=i.split(".")).length>1&&(i=s.pop(),(o=this.resolveName(s.join("."))).model&&!o.field?r=o.model:(l=null,r=null))):h&&n&&u&&"NAME"===u.name&&["EQUALS","NOT_EQUALS","CONTAINS","NOT_CONTAINS","GREATER_EQUAL","GREATER","LESS_EQUAL","LESS"].indexOf(h.name)>=0?(o=this.resolveName(u.value)).model&&(l="value",r=o.model,a=o.field,'"'!==i[0]||"str"!==this.models[r][a].type&&!this.models[r][a].options||(i=i.slice(1))):h&&n&&"NAME"===h.name?(o=this.resolveName(h.value)).model&&(l="comparison",r=o.model,a=o.field):h&&n&&["PAREN_R","INT_VALUE","FLOAT_VALUE","STRING_VALUE"].indexOf(h.name)>=0&&(l="logical")),{prefix:i,scope:l,model:r,field:a,currentFullToken:f}},getCurrentFieldOptions:function(){var e=this.textarea,t=this.getContext(e.value,e.selectionStart),i=this.models[t.model],n=t.field&&i[t.field],s={cacheKey:null,context:t,field:n,model:i,options:null};if("value"!==t.scope||!n||!n.options)return null;if(Array.isArray(n.options))s.options=n.options;else if(!0===n.options){if(!this.suggestionsAPIUrl)return null;s.cacheKey=t.model+"."+t.field+"|"+t.prefix}return s},loadFieldOptions:function(e){var t,i,n,s=this.getCurrentFieldOptions()||{},o=s.context;if(s.cacheKey){if(n={field:o.model+"."+o.field,search:o.prefix},t=this.suggestionsCache.get(s.cacheKey)||{},e&&t.has_next)n.page=t.page?t.page+1:1;else if(t.page)return;t.loading=!0,this.suggestionsCache.set(s.cacheKey,t),i=this.setUrlParams(this.suggestionsAPIUrl,n),this.getJson(i,{success:function(e){var t=this.suggestionsCache.get(s.cacheKey)||{};e.page-1===(t.page||0)&&(e.items=(t.items||[]).concat(e.items),this.suggestionsCache.set(s.cacheKey,e),this.loading=!1,this.populateFieldOptions(),this.renderCompletion())}.bind(this)}),this.populateFieldOptions(),this.renderCompletion()}},populateFieldOptions:function(e){var t=this.getCurrentFieldOptions();if(null!==t){var i,n=t.options,s=t.context&&t.context.prefix;if(n)n=this.valuesCaseSensitive?n.filter((function(e){return e.indexOf(s)>=0})):n.filter((function(e){return e.toLowerCase().indexOf(s.toLowerCase())>=0}));else{if(this.suggestions=[],!t.cacheKey)return;if(n=(i=this.suggestionsCache.get(t.cacheKey)||{}).items||[],!i.loading&&(!i.page||e&&i.has_next)&&this.debouncedLoadFieldOptions(e),!n.length)return}this.highlightCaseSensitive=this.valuesCaseSensitive,this.suggestions=n.map((function(e){return f(e,'"','"')}))}},onCompletionScroll:function(){var e=this.completionUL.getBoundingClientRect().height,t=this.completionUL.scrollTop+e;t>e&&t>this.completionUL.scrollHeight-e&&this.populateFieldOptions(!0)},generateSuggestions:function(){var e,t,i,n,s,o,l=this.textarea;if(!this.completionEnabled)return this.prefix="",void(this.suggestions=[]);if(this.currentModel){if(l.selectionStart!==l.selectionEnd)return this.prefix="",void(this.suggestions=[]);switch(o=function(e){return e.text.indexOf(this.prefix)>=0}.bind(this),this.highlightCaseSensitive=!0,e=this.getContext(l.value,l.selectionStart),this.prefix=e.prefix,t=this.models[e.model],i=e.field&&t[e.field],e.scope){case"field":this.suggestions=Object.keys(t).map((function(e){return f(e,"","relation"===t[e].type?".":" ")}));break;case"comparison":n=["=",["!=","is not equal to"]],s=" ",i&&"bool"!==i.type&&(["str","date","datetime"].indexOf(i.type)>=0?(n.push(["~","contains"]),n.push(["!~","does not contain"]),s=' "|"'):i.options&&(s=' "|"'),"str"!==i.type&&Array.prototype.push.apply(n,[">",">=","<","<="])),this.suggestions=n.map((function(e){return"string"==typeof e?f(e,"",s):f(e[0],"",s,e[1])})),i&&"bool"!==i.type&&(s=["str","date","datetime"].indexOf(i.type)>=0||i.options?' ("|")':" (|)",this.suggestions.push(f("in","",s)),this.suggestions.push(f("not in","",s))),o=function(e){return 0===e.text.lastIndexOf(this.prefix,0)}.bind(this);break;case"value":i?i.options?(this.prefix=e.prefix,this.populateFieldOptions()):"bool"===i.type?(this.suggestions=[f("True",""," "),f("False",""," ")],i.nullable&&this.suggestions.push(f("None",""," "))):"unknown"===i.type&&(this.prefix="",this.suggestions=[]):this.suggestions=[f("None",""," ")];break;case"logical":this.suggestions=[f("and",""," "),f("or",""," ")];break;default:this.prefix="",this.suggestions=[]}this.suggestions=this.suggestions.filter(o),1===this.suggestions.length?this.selected=0:this.selected=null}}},window.DjangoQL=g})()})();
//# sourceMappingURL=completion.js.map