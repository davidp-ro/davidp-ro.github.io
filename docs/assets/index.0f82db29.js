import{$ as n,g as p}from"./vendor.0fe98181.js";import*as f from"https://cdn.skypack.dev/pixi.js";import{KawaseBlurFilter as y}from"https://cdn.skypack.dev/@pixi/filter-kawase-blur";import g from"https://cdn.skypack.dev/debounce";import w from"https://cdn.skypack.dev/simplex-noise";import l from"https://cdn.skypack.dev/hsl-to-hex";const v=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}};v();class k extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("div");e.className="loading-container",e.innerHTML=`
      <svg class="tea" width="37" height="48" viewbox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z" stroke="var(--secondary)" stroke-width="2"></path>
        <path d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34" stroke="var(--secondary)" stroke-width="2"></path>
        <path id="teabag" fill="var(--secondary)" fill-rule="evenodd" clip-rule="evenodd" d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"></path>
        <path id="steamL" d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="var(--secondary)"></path>
        <path id="steamR" d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13" stroke="var(--secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <div class="credit"> Created by <a href="https://www.codepen.io/avstorm/pen/RwNzPNN">Andreas Storm on Codepen</a> </div>
    `;const i=document.createElement("style");i.textContent=`
      .loading-container {
        margin-top: 40vh;
        text-align: center;
      }

      .credit {
        font-size: 12px;
        margin-top: 40vh;
        color: var(--base);
      }

      a {
        color: var(--base);
        text-decoration: underline;
        cursor: none;
      }
    
      svg.tea {
        --secondary: var(--base);
      }
      svg.tea #teabag {
        transform-origin: top center;
        transform: rotate(3deg);
        animation: swing 2s infinite;
      }
      svg.tea #steamL {
        stroke-dasharray: 13;
        stroke-dashoffset: 13;
        animation: steamLarge 2s infinite;
      }
      svg.tea #steamR {
        stroke-dasharray: 9;
        stroke-dashoffset: 9;
        animation: steamSmall 2s infinite;
      }
      @-moz-keyframes swing {
        50% {
          transform: rotate(-3deg);
        }
      }
      @-webkit-keyframes swing {
        50% {
          transform: rotate(-3deg);
        }
      }
      @-o-keyframes swing {
        50% {
          transform: rotate(-3deg);
        }
      }
      @keyframes swing {
        50% {
          transform: rotate(-3deg);
        }
      }
      @-moz-keyframes steamLarge {
        0% {
          stroke-dashoffset: 13;
          opacity: 0.6;
        }
        100% {
          stroke-dashoffset: 39;
          opacity: 0;
        }
      }
      @-webkit-keyframes steamLarge {
        0% {
          stroke-dashoffset: 13;
          opacity: 0.6;
        }
        100% {
          stroke-dashoffset: 39;
          opacity: 0;
        }
      }
      @-o-keyframes steamLarge {
        0% {
          stroke-dashoffset: 13;
          opacity: 0.6;
        }
        100% {
          stroke-dashoffset: 39;
          opacity: 0;
        }
      }
      @keyframes steamLarge {
        0% {
          stroke-dashoffset: 13;
          opacity: 0.6;
        }
        100% {
          stroke-dashoffset: 39;
          opacity: 0;
        }
      }
      @-moz-keyframes steamSmall {
        10% {
          stroke-dashoffset: 9;
          opacity: 0.6;
        }
        80% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
      }
      @-webkit-keyframes steamSmall {
        10% {
          stroke-dashoffset: 9;
          opacity: 0.6;
        }
        80% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
      }
      @-o-keyframes steamSmall {
        10% {
          stroke-dashoffset: 9;
          opacity: 0.6;
        }
        80% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
      }
      @keyframes steamSmall {
        10% {
          stroke-dashoffset: 9;
          opacity: 0.6;
        }
        80% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
        100% {
          stroke-dashoffset: 27;
          opacity: 0;
        }
      }
    `,t.appendChild(i),t.appendChild(e)}}customElements.define("page-loading",k);/*!
 * Cuberto Cursor
 *
 * @version 1.5.0
 * @author Cuberto (cuberto.com)
 * @licence Copyright (c) 2020, Cuberto. All rights reserved.
 */class x{constructor(t){this.options=n.extend(!0,{container:"body",speed:.5,ease:"expo.out",visibleTimeout:300},t),this.body=n(this.options.container),this.el=n('<div class="cb-cursor"></div>'),this.text=n('<div class="cb-cursor-text"></div>'),this.init()}init(){this.el.append(this.text),this.body.append(this.el),this.bind(),this.move(-window.innerWidth,-window.innerHeight,0)}bind(){const t=this;this.body.on("mouseleave",()=>{t.hide()}).on("mouseenter",()=>{t.show()}).on("mousemove",e=>{this.pos={x:this.stick?this.stick.x-(this.stick.x-e.clientX)*.15:e.clientX,y:this.stick?this.stick.y-(this.stick.y-e.clientY)*.15:e.clientY},this.update()}).on("mousedown",()=>{t.setState("-active")}).on("mouseup",()=>{t.removeState("-active")}).on("mouseenter","a,input,textarea,button",()=>{t.setState("-pointer")}).on("mouseleave","a,input,textarea,button",()=>{t.removeState("-pointer")}).on("mouseenter","iframe",()=>{t.hide()}).on("mouseleave","iframe",()=>{t.show()}).on("mouseenter","[data-cursor]",function(){t.setState(this.dataset.cursor)}).on("mouseleave","[data-cursor]",function(){t.removeState(this.dataset.cursor)}).on("mouseenter","[data-cursor-text]",function(){t.setText(this.dataset.cursorText)}).on("mouseleave","[data-cursor-text]",function(){t.removeText()}).on("mouseenter","[data-cursor-stick]",function(){t.setStick(this.dataset.cursorStick)}).on("mouseleave","[data-cursor-stick]",function(){t.removeStick()})}setState(t){this.el.addClass(t)}removeState(t){this.el.removeClass(t)}toggleState(t){this.el.toggleClass(t)}setText(t){this.text.html(t),this.el.addClass("-text")}removeText(){this.el.removeClass("-text")}setStick(t){const e=n(t),i=e.get(0).getBoundingClientRect();this.stick={y:i.top+e.height()/2,x:i.left+e.width()/2},this.move(this.stick.x,this.stick.y,5)}removeStick(){this.stick=!1}update(){this.move(),this.show()}move(t,e,i){p.to(this.el,{x:t||this.pos.x,y:e||this.pos.y,force3D:!0,overwrite:!0,ease:this.options.ease,duration:this.visible?i||this.options.speed:0})}show(){this.visible||(clearInterval(this.visibleInt),this.el.addClass("-visible"),this.visibleInt=setTimeout(()=>this.visible=!0))}hide(){clearInterval(this.visibleInt),this.el.removeClass("-visible"),this.visibleInt=setTimeout(()=>this.visible=!1,this.options.visibleTimeout)}}/*!
 * Cuberto Magnetic
 *
 * @version 1.5.0
 * @author Cuberto (cuberto.com)
 * @licence Copyright (c) 2020, Cuberto. All rights reserved.
 */class b{constructor(t,e={}){this.el=n(t),this.options=n.extend(!0,{y:.2,x:.2,s:.2,rs:.7},this.el.data("magnetic")||e),this.y=0,this.x=0,this.width=0,this.height=0,!this.el.data("magnetic-init")&&(this.el.data("magnetic-init",!0),this.bind())}bind(){this.el.on("mouseenter",()=>{this.y=this.el.offset().top-window.pageYOffset,this.x=this.el.offset().left-window.pageXOffset,this.width=this.el.outerWidth(),this.height=this.el.outerHeight()}),this.el.on("mousemove",t=>{const e=(t.clientY-this.y-this.height/2)*this.options.y,i=(t.clientX-this.x-this.width/2)*this.options.x;this.move(i,e,this.options.s)}),this.el.on("mouseleave",t=>{this.move(0,0,this.options.rs)})}move(t,e,i){p.to(this.el,{y:e,x:t,force3D:!0,overwrite:!0,duration:i})}}const a=(s,t)=>Math.random()*(t-s)+s,m=(s,t,e,i,o)=>(s-t)/(e-t)*(o-i)+i;class C{constructor(t=0){this.simplex=new w,this.bounds=this.setBounds(),this.x=a(this.bounds.x.min,this.bounds.x.max),this.y=a(this.bounds.y.min,this.bounds.y.max),this.scale=1,this.fill=t,this.radius=a(window.innerHeight/6,window.innerHeight/3),this.xOff=a(0,1e3),this.yOff=a(0,1e3),this.inc=.002,this.graphics=new f.Graphics,this.graphics.alpha=.825,window.addEventListener("resize",g(()=>{this.bounds=this.setBounds()},250))}setBounds(){const t=window.innerWidth<1e3?window.innerWidth/3:window.innerWidth/5,e=window.innerWidth/1.25,i=window.innerWidth<1e3?window.innerHeight:window.innerHeight/1.375;return{x:{min:e-t,max:e+t},y:{min:i-t,max:i+t}}}update(){const t=this.simplex.noise2D(this.xOff,this.xOff),e=this.simplex.noise2D(this.yOff,this.yOff),i=this.simplex.noise2D(this.xOff,this.yOff);this.x=m(t,-1,1,this.bounds.x.min,this.bounds.x.max),this.y=m(e,-1,1,this.bounds.y.min,this.bounds.y.max),this.scale=m(i,-1,1,.5,1),this.xOff+=this.inc,this.yOff+=this.inc}render(){this.graphics.x=this.x,this.graphics.y=this.y,this.graphics.scale.set(this.scale),this.graphics.clear(),this.graphics.beginFill(this.fill),this.graphics.drawCircle(0,0,this.radius),this.graphics.endFill()}}class S{constructor(){this.setColors(),this.setCustomProperties()}setColors(){this.hue=~~a(0,360),this.complimentaryHue1=this.hue+30,this.complimentaryHue2=this.hue+60,this.saturation=95,this.lightness=50,this.baseColor=l(this.hue,this.saturation,this.lightness),this.complimentaryColor1=l(this.complimentaryHue1,this.saturation,this.lightness),this.complimentaryColor2=l(this.complimentaryHue2,this.saturation,this.lightness),this.colorChoices=[this.baseColor,this.complimentaryColor1,this.complimentaryColor2]}randomColor(){return this.colorChoices[~~a(0,this.colorChoices.length)].replace("#","0x")}setCustomProperties(){document.documentElement.style.setProperty("--hue",this.hue),document.documentElement.style.setProperty("--hue-complimentary1",this.complimentaryHue1),document.documentElement.style.setProperty("--hue-complimentary2",this.complimentaryHue2)}}console.log(`%c  \u2728\u2728\u2728  Hi there!  \u2728\u2728\u2728 
%c
To create this small portfolio I used / got inspired by some really cool people:

\u{1F525} The cursor follwing effect and "magnetic" text is the artwork of Cuberto (www.cuberto.com) [www.github.com/Cuberto/cursor-magnetic-demo]
\u{1FA90} The orb background effect is based on a great tutorial by George Francis [www.georgefrancis.dev/writing/create-a-generative-landing-page-and-webgl-powered-background/]

The source for this website is here: www.github.com/davidp-ro/davidp-ro.github.io
%c
This website has no commercial use. All works are the properties of their respective owners. Made with \u2764\uFE0F by David Pescariu
`,`
padding: 16px;
font-size: 24px;
`,`
font-size: 16px;
`,`
padding-top: 8px;
font-size: 10px;
`);const u=new f.Application({view:document.querySelector(".orb-canvas"),resizeTo:window,backgroundAlpha:0}),h=new S;u.stage.filters=[new y(30,10,!0)];const c=[];for(let s=0;s<10;s++){const t=new C(h.randomColor());u.stage.addChild(t.graphics),c.push(t)}window.matchMedia("(prefers-reduced-motion: reduce)").matches?c.forEach(s=>{s.update(),s.render()}):u.ticker.add(()=>{c.forEach(s=>{s.update(),s.render()})});document.addEventListener("keypress",s=>{s.key==="n"&&(h.setColors(),h.setCustomProperties(),c.forEach(t=>{t.fill=h.randomColor()}))});new x;n("[data-magnetic]").each(function(){new b(this)});window.addEventListener("load",()=>{const s=document.querySelector(".loading"),t=document.querySelector("main");s!=null&&(s.style.opacity="0",setTimeout(()=>{s.style.display="none",t.style.opacity="1"},500))});
