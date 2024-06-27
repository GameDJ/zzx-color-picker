<template>
	<div>
		<!-- <button @click="changeColor()">Change color</button>
		<button @click="changeSprite(sprites.zero1)">zero1</button>
		<button @click="changeSprite(sprites.zero1_dash)">zero1_dash</button>
		<button @click="changeSprite(sprites.zero234)">zero234</button>
		<button @click="changeSprite(sprites.zero234_dash)">zero234_dash</button>
		<button @click="changeSprite(sprites.vent)">Vent</button> -->
		<div class="tree-container">
			<div v-for="seriesKey in seriesList.keys()" :key="seriesKey">
				<h2 class="tree">{{ seriesKey }}</h2>
				<div
					v-for="gameKey in seriesList.get(seriesKey).keys()"
					:key="gameKey"
					style="margin-left: 100px"
				>
					<h3 class="tree">{{ gameKey }}</h3>
					<div
						v-for="spriteKey in seriesList
							.get(seriesKey)
							.get(gameKey)
							.keys()"
						:key="spriteKey"
						style="margin-left: 100px"
					>
						<button
							@click="
								changeSprite(
									seriesList
										.get(seriesKey)
										.get(gameKey)
										.get(spriteKey)
								)
							"
						>
							{{ spriteKey }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<table class="sprite-table" v-if="loadedSprite">
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
						backgroundColor: pixel
							? Color.hexString(loadedSpritePalette[pixel] as Color, true)
							: '#0000',
						visibility: pixel ? 'visible' : 'hidden',
						width: pixelScale + 'px',
						height: pixelScale + 'px',
					}"
					@click="selectPixel(pixel)"
				></td>
			</tr>
		</table>
	</div>
</template>

<script setup lang="ts">
import {
	Sprite,
	SpritePixels,
	PaletteIndex,
	Palette,
	Addresses,
} from "@/types/spriteTypes";
import { Color, RGB } from "@/types/colorTypes";
import { ref, toRefs } from "vue";
// import { sprites } from "@/assets/sprites";
import { series } from "@/assets/sprites";

const DEFAULT_SCALE = 15;
const pixelScale = ref(DEFAULT_SCALE);

const seriesList = series;
console.log(seriesList.keys());

// Initialize with empty filler values
const loadedSprite = ref({
	pixels: [][0] as PaletteIndex[][],
	palette: {
		rgbList: [][0],
		depth: 0,
	} as Palette,
	addresses: {
		addr: [],
	} as Addresses,
} as Sprite);
function loadSpriteData() {
	return {
		loadedSpritePixels: loadedSprite.value.pixels,
		loadedSpritePalette: Color.convertPaletteToColorPalette(
			loadedSprite.value.palette
		),
		loadedSpriteAddresses: loadedSprite.value.addresses,
	};
}
// const loadedResults = loadSpriteData();
// const loadedSpritePixels = ref(loadedResults.loadedSpritePixels);
// const loadedSpritePalette = ref(loadedResults.loadedSpritePalette);
// const loadedSpriteAddresses = ref(loadedResults.loadedSpriteAddresses);

// Initialize with the filler values
const loadedSpritePixels = ref(loadedSprite.value.pixels);
const loadedSpritePalette = ref([] as Color[]);
const loadedSpriteAddresses = ref(loadedSprite.value.addresses);

// console.log(loadedSpritePalette.value[7]);
// console.log("mappy", Color.convertPaletteToMap(loadedSprite.value.palette));

function changeColor(pixel: PaletteIndex = 1) {
	console.log("loaded palette pixel", loadedSpritePalette.value, pixel);
	loadedSpritePalette.value[pixel].rgb = [255, 0, 255] as RGB;
	console.log("loaded palette pixel", loadedSpritePalette.value, pixel);
}

function changeSprite(newSprite: Sprite) {
	loadedSprite.value = newSprite;
	const reloadedResults = loadSpriteData();
	loadedSpritePixels.value = reloadedResults.loadedSpritePixels;
	loadedSpritePalette.value = reloadedResults.loadedSpritePalette;
	loadedSpriteAddresses.value = reloadedResults.loadedSpriteAddresses;
	if (loadedSprite.value.scale) {
		pixelScale.value = loadedSprite.value.scale;
	} else {
		pixelScale.value = DEFAULT_SCALE;
	}
		console.log(pixelScale.value);
}

function selectPixel(pixel: PaletteIndex) {
	changeColor(pixel);
}


</script>

<style scoped>
.sprite-table {
	border-collapse: collapse;
	display: block;
	float: right;
	background-color: gray;
}
.pixel-row {
	margin: 0px;
}
.pixel {
	display: flex;
	float: left;
	width: 15px;
	height: 15px;
	/*background-color: green;*/
	margin: 0px;
	padding: 0px;
	cursor: pointer;
}
.pixel:hover {
	box-sizing: border-box;
	border-style: groove;
	border-width: 1px;
}
h2,
h3,
h4 {
	margin-top: 4px;
	margin-bottom: 4px;
}

.tree-container {
	display: block;
	float: left;
}
</style>
