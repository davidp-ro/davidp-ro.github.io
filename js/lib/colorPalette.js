import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import { random } from "./utils";

/**
 * Handle generating the random palette
 */
export default class ColorPalette {
  constructor() {
    this.generateColors();
    this.updateProps();
  }

  /**
   * Generate the color palette and save it in `this.colors`
   */
  generateColors() {
    /**
     * Random hue
     */
    this.hue = ~~random(0, 360);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;

    this.saturation = 95;
    this.lightness = 50;

    /**
     * The base color
     */
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);

    /**
     * Complimentary color, 30 degress away from the base
     */
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );

    /**
     * Second complimentary color, 60 degress away from the base
     */
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    this.colors = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2,
    ];
  }

  /**
   * Pick a random color from the previously generated ones
   */
  randomColor() {
    return this.colors[~~random(0, this.colors.length)].replace(
      "#",
      "0x"
    );
  }

  /**
   * Set/Update the CSS custom properties so that the colors defined here can be
   * used throughout the UI (ie. used in the loading screen, etc)
   */
  updateProps() {
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}
