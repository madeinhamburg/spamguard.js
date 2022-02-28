"use strict";
/*!
 *  spamguard.js v4.4.0
 *  🤖 Protect your email address from getting crawled by spam bots.
 *  https://github.com/madeinhamburg/spamguard.js
 *  Licensed under the MIT license.
 */function spamguard(t){for(var e=function(t,e){for(var a="",i=0;i<t.length;i++)a+="hex"==e?"&#x"+t.charCodeAt(i).toString(16)+";":"\\"+t.charCodeAt(i).toString(16);return a},a=function(t,e){var a=t.getAttribute(e);if("string"==typeof t.getAttribute("data-salt"))for(var i=t.getAttribute("data-salt"),r=0;r<i.length;r++)a=/^[A-Za-z0-9]$/.test(i[r])?a.replace(new RegExp(i[r],"g"),""):a.replace(new RegExp("\\"+i[r],"g"),"");return a},i="",r=document.querySelectorAll(t),n=0;n<r.length;n++){var s,d=r[n],g="",o="spamguard-"+(Math.random().toString(36).substring(2,7)+Math.random().toString(36).substring(2,7)),u="string"==typeof d.getAttribute("data-mailto")&&""!==d.getAttribute("data-mailto")&&"false"!=d.getAttribute("data-mailto"),b="string"==typeof d.getAttribute("data-content")&&""!==d.getAttribute("data-content")&&"false"!=d.getAttribute("data-content"),p="string"==typeof d.getAttribute("data-sgalign")&&""!==d.getAttribute("data-sgalign")?d.getAttribute("data-sgalign"):"center";if(!d.hasAttribute("data-spamguard")){if(d.setAttribute("data-spamguard",!0),0==b){"string"==typeof d.getAttribute("data-name")&&"string"==typeof d.getAttribute("data-domain")&&"string"==typeof d.getAttribute("data-tld")&&(s=a(d,"data-name")+"@"+a(d,"data-domain")+"."+a(d,"data-tld")),"string"==typeof d.getAttribute("data-number")&&(s=a(d,"data-number")),"string"==typeof d.getAttribute("data-text")&&"string"==typeof d.getAttribute("data-salt")&&(s=a(d,"data-text"));var l=s.split("").reverse().join("");l.split("").forEach(function(t,a){g+="<span>"+(" "==t?"&nbsp;":"")+"</span>",i+="."+o+">span span:nth-child("+(a+1)+'):after{content:"'+e(t)+'"}'}),d.innerHTML="<span>"+g+"</span>",d.classList.add(o),i+="."+o+">span{display:flex!important;flex-flow:row-reverse;flex-wrap:wrap-reverse;justify-content:"+p+";}"}1==u&&d.addEventListener("click",function(t){if(t.preventDefault(),"string"==typeof this.getAttribute("data-name")&&"string"==typeof this.getAttribute("data-domain")&&"string"==typeof this.getAttribute("data-tld")){var e="mailto:"+a(this,"data-name")+"@"+a(this,"data-domain")+"."+a(this,"data-tld")+"?";"string"==typeof this.getAttribute("data-subject")&&""!==this.getAttribute("data-subject")&&"false"!=this.getAttribute("data-subject")&&(e+="&subject="+encodeURIComponent(this.getAttribute("data-subject"))),"string"==typeof this.getAttribute("data-message")&&""!==this.getAttribute("data-message")&&"false"!=this.getAttribute("data-message")&&(e+="&body="+encodeURIComponent(this.getAttribute("data-message")))}if("string"==typeof this.getAttribute("data-number"))if("string"==typeof this.getAttribute("data-protocol")&&""!==this.getAttribute("data-protocol"))if("whatsapp"===this.getAttribute("data-protocol"))e="//wa.me/"+a(this,"data-number");else e=this.getAttribute("data-protocol")+":"+a(this,"data-number");else e="tel:"+a(this,"data-number");e&&(window.location.href=e)},!1)}}if(i){var f=document.createElement("style");f.appendChild(document.createTextNode(i)),document.getElementsByTagName("body")[0].appendChild(f)}}
