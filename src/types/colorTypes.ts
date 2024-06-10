/** just type aliases; might add validation logic later if I can figure out how */
export type ColorChannel = number;
export type BitDepth = number;

export type ColorData = {
  // list of color channel values
  rgb: ColorChannel[];
  // bit color depth (15 means 32 colors per channel; 24 means 256)
  depth: BitDepth;
};

/**
 * @param rgb three integers from 0 to 31 (5 bit to support gba)
 * @param depth bit color depth; generally either 24 for rgb/hex formats or 15 for gba
 */
export class Color {
  private _colorData: ColorData;

  // might change this to take a single ColorData object, but this should be ok for now
  constructor(
    r: ColorChannel,
    g: ColorChannel,
    b: ColorChannel,
    depth: ColorChannel
  ) {
    this._colorData = {
      rgb: [r, g, b],
      depth: depth,
    } as ColorData;
    // Validation just prints an error for now (which is why this is after the assignment)
    this.validateData();
  }

  /** @returns comma-separated rgb values */
  rgbString(): string {
    let retVal = "";
    for (let i = 0; i < this.rgb.length; i++) {
      retVal += this.channelToNBitDepth(this.rgb[i], this.depth / 3);
      if (i < this.rgb.length - 1) retVal += ",";
    }
    return retVal;
  }

  /**
   * @returns hex format eg. C50AEB
   * @param includeHash defaults to false
   * @param toUpperCase defaults to true
   */
  hexString(includeHash = false, toUpperCase = true): string {
    let retVal = "";
    if (includeHash) retVal += "#";

    // Convert each channel to hex and append it to the return string
    let nextChannelHex = "";
    for (const channel of this.rgb) {
      // convert it to a string in hexadecimal format
      nextChannelHex = this.channelToNBitDepth(
        channel,
        this.depth / 3
      ).toString(16);

      // Add trailing zeros if necessary
      if (nextChannelHex.length < 2) nextChannelHex = "0" + nextChannelHex;

      retVal += nextChannelHex;
      nextChannelHex = "";
    }

    if (toUpperCase) retVal = retVal.toUpperCase();
    return retVal;
  }

  /**
   * @returns the color in 15-bit gba format
   * @param toUpperCase defaults to true
   */
  gbaString(toUpperCase = true): string {
    let retVal = "";
    let nextChannel = "";
    for (let i = 2; i >= 0; i--) {
      // convert its 5-bit-depth-channel (if it wasn't already) value into a string in binary format
      nextChannel = this.channelToNBitDepth(
        this.rgb[i],
        this.depth / 3,
        5
      ).toString(2);

      //console.log("channel conversion (from, to)", this.rgb[i], nextChannel);

      // Add trailing zeros if necessary
      while (nextChannel.length < 5) {
        nextChannel = "0" + nextChannel;
      }

      // Validate
      if (nextChannel.length > 5) {
        console.log("Error in gba format channel calculation!");
        this.printData();
        console.log("converted channel:", i, nextChannel);
      }
      retVal += nextChannel;
      nextChannel = "";
    }
    // parse the completed string as binary then convert it into hex
    retVal = parseInt(retVal, 2).toString(16);
    // add leading zeros if necessary
    while (retVal.length < 4) retVal = "0" + retVal;
    if (toUpperCase) retVal = retVal.toUpperCase();

    // validate
    if (retVal.length != 4) {
      console.log("Error in gba format final calculation!");
      this.printData();
      console.log("conversion result:", retVal);
    }
    return retVal;
  }

  // Getters and Setters

  get colorData(): ColorData {
    return this._colorData;
  }
  set colorData(newColorData: ColorData) {
    // For now it simply doesn't set the new data if validation fails
    if (this.validateData(newColorData)) this._colorData = newColorData;
  }

  get rgb(): ColorChannel[] {
    return this.colorData.rgb;
  }
  get depth(): BitDepth {
    return this.colorData.depth;
  }

  get r(): ColorChannel {
    return this.rgb[0];
  }
  set r(newChannelVal: ColorChannel) {
    this.rgb[0] = newChannelVal;
  }
  get g(): ColorChannel {
    return this.rgb[1];
  }
  set g(newChannelVal: ColorChannel) {
    this.rgb[1] = newChannelVal;
  }
  get b(): ColorChannel {
    return this.rgb[2];
  }
  set b(newChannelVal: ColorChannel) {
    this.rgb[2] = newChannelVal;
  }

  // Private methods

  private validateData(newColorData: ColorData | null = null): boolean {
    // If no argument is provided, it validates the object's existing data
    let dataToValidate = null;
    if (newColorData) dataToValidate = newColorData;
    else dataToValidate = this.colorData;

    if (dataToValidate.rgb.length != 3) {
      console.log(
        "validateData: incorrect number of channels provided",
        dataToValidate.rgb
      );
      return false;
    }
    if (!Number.isInteger(dataToValidate.depth)) {
      console.log(
        "validateData: provided newRGB.depth is not an integer!",
        dataToValidate.depth
      );
      return false;
    }
    for (let i = 0; i < dataToValidate.rgb.length; i++) {
      //
      if (
        !Number.isInteger(dataToValidate.rgb[i]) ||
        dataToValidate.rgb[i] < 0 ||
        // Make sure not greater than 31 for 15-bit or 255 for 24-bit
        dataToValidate.rgb[i] > Math.pow(2, dataToValidate.depth / 3) - 1
      ) {
        console.log(
          "validateData: bad channel data! (index, value):",
          i,
          dataToValidate.rgb[i]
        );
        return false;
      }
    }
    return true;
  }

  /**
   *
   * @param channelValue value of the single r, g, or b channel
   * @param oldDepth the channel's current bit depth (NOT the total color bit depth!)
   * @param newDepth the channel's desired bit depth; default is 8
   * @returns channel's n-bit equivalent, eg. (16, 5) converts 5-bit 16 to 8-bit 128
   */
  private channelToNBitDepth(
    channelValue: BitDepth,
    oldDepth: BitDepth,
    newDepth: BitDepth = 8
  ): BitDepth {
    // eg. 8-bit channels are 2^3 times as big as 5-bit channels
    const multiplier = Math.pow(2, newDepth - oldDepth);
    return Math.floor(channelValue * multiplier);
  }

  private printData() {
    console.log("rgb:", this.colorData);
    console.log("depth:", this.depth);
  }
}
