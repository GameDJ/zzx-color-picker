/* eslint-disable prettier/prettier */
import { ColorData } from "./colorTypes";

export type Palette = ColorData[];
export type Address = string;
export type Addresses = Address[];
export type PaletteIndex = number;
export type SpritePixels = PaletteIndex[][];

export interface Sprite {
    width: number,
    height: number,
    scale: number | 20,
    pixels: SpritePixels,
    palette: Palette,
    addresses: Addresses,
};