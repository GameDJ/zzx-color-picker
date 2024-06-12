<template>
	<div>
		<table class="sprite-table">
			<tr
				class="pixel-row"
				v-for="(pixel_row, rowNum) in loadedSpritePixels"
				:key="rowNum"
			>
				<td
					class="pixel"
					v-for="(pixel, colNum) in pixel_row"
					:key="colNum"
					:style="{
						backgroundColor:
							pixel
								? Color.hexString(loadedSpritePalette[pixel-1], true)
								: '#0000',
					}"
				></td>
			</tr>
		</table>
    <button @click="changeColor">Change color</button>
	</div>
</template>

<script setup lang="ts">
import {
  Sprite,
  SpritePixels,
  PaletteIndex,
  Palette,
  ColorPalette,
} from "@/types/spriteTypes";
import { Color, RGB } from "@/types/colorTypes";
import { ref } from "vue";
import { sprites } from "@/assets/sprites";

const loadedSprite = ref(sprites.zero);
const loadedSpritePixels = ref(sprites.zero.sprite);
const loadedSpritePalette = ref(Color.convertPaletteToColorPalette(sprites.zero.palette));
const loadedSpriteAddresses = ref(sprites.zero.addresses);

console.log(loadedSpritePalette.value[7]);

function changeColor() {
  loadedSpritePalette.value[1].rgb = [255, 0, 255] as RGB;
}

//const filteredPixels = computed((spritePixelsArg: SpritePixels) => spritePixelsArg.filter((pixel)));
</script>

<style scoped>
.sprite-table {
  border-collapse: collapse;
}
.pixel-row {
  margin: 0px;
}
.pixel {
  display: block;
  float: left;
  width: 15px;
  height: 15px;
  background-color: green;
  margin: 0px;
  padding: 0px;
}
</style>
