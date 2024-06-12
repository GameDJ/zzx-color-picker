import { ColorData, Color, RGB, BitDepth } from "./colorTypes";

export interface Palette {
    rgbList: RGB[],
    depth: BitDepth,
};
export type ColorPalette = Color[];
export type Address = string;
export interface Addresses {
    addr: Address[],
    version: string,
}
export type PaletteIndex = number | null;
export type SpritePixels = PaletteIndex[][];

export interface Sprite {
    // width: number,
    // height: number,
    scale: number | 20,
    pixels: SpritePixels,
    palette: Palette,
    addresses: Addresses,
}

// use this regex to find empty commas:
// (?<![\d\w\]]),