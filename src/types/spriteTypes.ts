import { ColorData, Color, RGB, BitDepth } from "./colorTypes";

export interface Palette {
    rgbList: RGB[],
    depth: BitDepth,
}
export type ColorPalette = Color[];
export type Address = string;
export interface Addresses {
    addr: Address[],
    version?: string,
}
export type PaletteIndex = number;
export type SpritePixels = PaletteIndex[][];
export interface SpriteData {
    sprite: SpritePixels,
    palette: Palette,
    addresses: Addresses,
} 

export interface Sprite {
    // width: number,
    // height: number,
    pixels: SpritePixels,
    palette: Palette,
    addresses: Addresses,
    scale?: number,
}

// use this regex to find empty commas:
// (?<![\d\w\]]),