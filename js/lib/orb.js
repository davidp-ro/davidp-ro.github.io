import debounce from "https://cdn.skypack.dev/debounce";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";
import * as PIXI from "https://cdn.skypack.dev/pixi.js";
import { map, random } from "./utils";

/**
 * Class representing each individual orb in the background.
 */
export default class Orb {
  constructor(fill = 0x000000) {
    /**
     * Vs it's original radius
     */
    this.scale = 1;

    /**
     * How quickly values step through time
     */
    this.delta = 0.002;

    /**
     * Color
     */
    this.fill = fill;

    /**
     * `SimplexNoise` instance
     */
    this.simplex = new SimplexNoise();

    /**
     * Only allow the orbs to be in the bottom right-ish
     */
    this.bounds = this.getBounds();

    /**
     * Initialise the orb's position to a random point
     */
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);


    /**
     * Original radius
     */
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    /**
     * Initial x offset in time
     */
    this.xOffset = random(0, 1000);

    /**
     * Initial y offset in time
     */
    this.yOffset = random(0, 1000);

    /**
     * `PIXI.Graphics` instance
     */
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;

    /**
     * Recalculate orb positions every time the window resizes
     */
    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.getBounds();
      }, 250)
    );
  }

  /**
   * Only allow the orbs to be in the bottom right-ish 
   */
  getBounds() {
    /**
     * How far from the can each orb move depending on screen size
     */
    const maxDistance =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;

    const xOrigin = window.innerWidth / 1.25;
    const yOrigin =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    // Return values
    return {
      x: {
        min: xOrigin - maxDistance,
        max: xOrigin + maxDistance,
      },
      y: {
        min: yOrigin - maxDistance,
        max: yOrigin + maxDistance,
      },
    };
  }

  /**
   * Advance in time
   */
  update() {
    // "random" values
    const xNoise = this.simplex.noise2D(this.xOffset, this.xOffset);
    const yNoise = this.simplex.noise2D(this.yOffset, this.yOffset);
    const scaleNoise = this.simplex.noise2D(this.xOffset, this.yOffset);

    // Map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    
    /**
     * Map scaleNoise (between -1 and 1) to a scale value somewhere between 
     * 1/2 of the orb's original size, and 1/1 of it's original size.
     */
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // Advance
    this.xOffset += this.delta;
    this.yOffset += this.delta;
  }

  /**
   * Put the orb on the screen
   */
  render() {
    // Update position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // Clear
    this.graphics.clear();

    // Draw the orb
    this.graphics.beginFill(this.fill);
    this.graphics.drawCircle(0, 0, this.radius);
    this.graphics.endFill();
  }
}
