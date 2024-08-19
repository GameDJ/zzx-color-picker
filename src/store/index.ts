import { Color } from "@/types/colorTypes";
import { Addresses, LoadedColorPalette, LoadedSprite, Palette, PaletteIndex, Sprite } from "@/types/spriteTypes";
import { ActionContext, createStore } from "vuex";

export default createStore({
  state: {
    currentSprite: null as LoadedSprite,
    currentColorPalette: null as LoadedColorPalette,
  },
  getters: {
    currentSprite(state) {
      return state.currentSprite;
    },
    currentColorPalette(state) {
      return state.currentColorPalette;
    },
  },
  mutations: {
    setCurrentSprite(state, newSprite: Sprite) {
      state.currentSprite = newSprite;
    },
    resetPalette(state) {
      if (state.currentSprite) {
        state.currentColorPalette = Color.convertPaletteToColorPalette(state.currentSprite.palette);
      }
    },
	loadPalette(state, newPalette: Color[]) {
		state.currentColorPalette = newPalette;
	},
	changePaletteColor(state, payload: { index: PaletteIndex, color: Color }) {
		try {
			if (!state.currentColorPalette) {
				throw new Error("No palette initialized");
			} else {
				state.currentColorPalette[payload.index] = payload.color;
			}
		} catch (e) {
			console.warn("Error changing palette color:", e);
		}
	}
  },
  actions: {
	setCurrentSprite(context, newSprite: Sprite) {
		context.commit("setCurrentSprite", newSprite);
	},
	resetPalette(context) {
		context.commit("resetPalette");
	},
	loadPalette(context, newPalette: Color[]) {
		context.commit("loadPalette", newPalette);
	},
	changePaletteColor(context, payload: { index: PaletteIndex, color: Color }) {
		context.commit("changePaletteColor", payload)
	}
  },
  modules: {},
});
