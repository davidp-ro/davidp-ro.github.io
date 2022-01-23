import "../css/base.css";
import "../css/cursor.css";

import $ from "jquery";
import * as PIXI from "https://cdn.skypack.dev/pixi.js";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur";

import Cursor from "./vendor/cursor";
import Magnetic from "./vendor/magnetic";

import Orb from "./lib/orb";
import ColorPalette from "./lib/colorPalette";

// prettier-ignore
console.log(`%c  ✨✨✨  Hi there!  ✨✨✨ 
%c
To create this small portfolio I used / got inspired by some really cool people:

🔥 The cursor follwing effect and "magnetic" text is the artwork of Cuberto (www.cuberto.com) [www.github.com/Cuberto/cursor-magnetic-demo]
🪐 The orb background effect is based on a great tutorial by George Francis [www.georgefrancis.dev/writing/create-a-generative-landing-page-and-webgl-powered-background/]

The source for this website is here: www.github.com/davidp-ro/davidp-ro.github.io
%c
This website has no commercial use. All works are the properties of their respective owners. Made with ❤️ by David Pescariu
`, `
padding: 16px;
font-size: 24px;
`, `
font-size: 16px;
`, `
padding-top: 8px;
font-size: 10px;
`);

// Create PixiJS app
const app = new PIXI.Application({
  // Bind to the canvas element
  view: document.querySelector(".orb-canvas"),
  resizeTo: window,
  backgroundAlpha: 0,
});
app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

// Create colour palette
const colorPalette = new ColorPalette();

// Create orbs
const orbs = [];

for (let i = 0; i < 10; i++) {
  const orb = new Orb(colorPalette.randomColor());

  app.stage.addChild(orb.graphics);

  orbs.push(orb);
}

// Animate according to the user's preference (checks prefers-reduced-motion)
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  app.ticker.add(() => {
    orbs.forEach((orb) => {
      orb.update();
      orb.render();
    });
  });
} else {
  orbs.forEach((orb) => {
    orb.update();
    orb.render();
  });
}

// Chnage background on keypress
document.addEventListener("keypress", (e) => {
  if (e.key === "n") {
    colorPalette.generateColors();
    colorPalette.updateProps();

    orbs.forEach((orb) => {
      orb.fill = colorPalette.randomColor();
    });
  }
});

// Initialize the cursor if we're on desktop
if (window.matchMedia("(min-width: 840px)").matches) {
  new Cursor();
} else {
  // Make sure we have some kind of cursor if we don't show the fancy one
  document.querySelector('html').style.cursor = 'auto';
}

// Initialize the magnetic effect
document.querySelectorAll('[data-magnetic]').forEach((e) => {
  new Magnetic(e);
});

// Remove the loading screen
window.addEventListener("load", () => {
  /** @type {HTMLElement} */
  const el = document.querySelector(".loading");
  const main = document.querySelector("main");
  if (el !== null && el !== undefined) {
    el.style.opacity = "0";
    setTimeout(() => {
      el.style.display = "none";
      main.style.opacity = "1";
    }, 500);
  }
});
