!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},l={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in l){var r=l[e];delete l[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){l[e]=t},e.parcelRequired7c6=r),r("4QITu"),r("jyQZK");var n=r("jzQFI"),o=document.querySelector('[name="ligthswitcher"]'),i=document.querySelector("body"),a=document.querySelector("footer"),s=document.getElementsByClassName("film-tittle");if(console.log(s),"off"===n.default.load("light")){o.checked=!0,i.classList.add("night"),a.classList.add("night");for(var d=0;d<s.length;d+=1)s[d]=s[d].classList.add("nigthText")}console.log(s),o.addEventListener("change",(function(){if(o.checked){n.default.save("light","off"),i.classList.add("night"),a.classList.add("night");var e=!0,t=!1,l=void 0;try{for(var r,d=s[Symbol.iterator]();!(e=(r=d.next()).done);e=!0){var c=r.value;c=c.classList.add("nigthText")}}catch(e){t=!0,l=e}finally{try{e||null==d.return||d.return()}finally{if(t)throw l}}}else{i.classList.remove("night"),a.classList.remove("night"),n.default.save("light","on");var f=!0,u=!1,h=void 0;try{for(var g,v=s[Symbol.iterator]();!(f=(g=v.next()).done);f=!0){var y=g.value;y=y.classList.remove("nigthText")}}catch(e){u=!0,h=e}finally{try{f||null==v.return||v.return()}finally{if(u)throw h}}}}))}();
//# sourceMappingURL=index.1a70ea43.js.map