<!-- eslint-disable prettier/prettier -->
<template>
	<div>
		<table>
			<tr>
				<td class="pixel"></td>
			</tr>
		</table>
	</div>
</template>

<script setup lang="ts">
import { Sprite, SpritePixels, PaletteIndex } from "@/types/spriteTypes";

const X = "-1";

const testSprite = [
  [X, X, 1, X, X],
  [X, 1, X, 1, X],
  [1, X, X, X, 1],
  [X, 1, 1, 1, X],
] as SpritePixels;

const sprite = {
  width: 5,
  height: 4,
  pixels: testSprite,
} as Sprite;
</script>

<style scoped>
.pixel {
  display: block;
  float: left;
}
</style>
