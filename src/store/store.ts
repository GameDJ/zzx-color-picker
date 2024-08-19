import { reactive } from "vue";
import {
  Address,
  Addresses,
  Palette,
  PaletteIndex,
  Sprite,
  SpritePixels,
} from "@/types/spriteTypes";
import { Color } from "@/types/colorTypes";

const SCALE_DEFAULT = 15;

export const state = reactive({
  //   sprite: null as LoadedSprite,
  //   palette: null as LoadedColorPalette,
  // Initialize with empty filler values
  pixels: [][0] as SpritePixels,
  //   palette: {
  //     rgbList: [][0],
  //     depth: 0,
  //   } as Palette,
  colors: [] as Color[],
  addresses: {addr: []} as Addresses,
  scale: SCALE_DEFAULT,
});

// actions
export default {
  pixels(): SpritePixels {
    return state.pixels;
  },
  palette(): Color[] {
    return state.colors;
  },
  addresses(): Addresses {
    return state.addresses;
  },
  scale(): number {
    return state.scale;
  },
  loadSprite(newSprite: Sprite) {
    console.log("loading sprite", newSprite)
    state.pixels = newSprite.pixels;
    state.colors = Color.convertPaletteToColorPalette(newSprite.palette);
    // state.colors = newSprite.palette;
    state.addresses = newSprite.addresses;
    if (newSprite.scale) {
      state.scale = newSprite.scale;
    } else {
      state.scale = SCALE_DEFAULT;
    }
  },
  changePaletteColor(payload: { index: PaletteIndex; color: Color }) {
    try {
      if (!state.colors) {
        throw new Error("No palette initialized");
      } else {
        state.colors[payload.index] = payload.color;
      }
    } catch (e) {
      console.warn("Error changing palette color:", e);
    }
  },
};
