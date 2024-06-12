<template>
  <div>
    <p>Hello World!</p>
    <p>raw: {{ color.rgb }}</p>
    <p>r: {{ color.r }} g: {{ color.g }} b: {{ color.b }}</p>
    <p>rgb: {{ Color.rgbString(color) }}</p>
    <p>hex: {{ Color.hexString(color) }}</p>
    <p>gba: {{ Color.gbaString(color) }}</p>
    <form @submit.prevent="setColor()">
      <input type="number" name="r" placeholder="red" ref="r" />
      <br />
      <input type="number" name="g" placeholder="green" ref="g" />
      <br />
      <input type="number" name="b" placeholder="blue" ref="b" />
      <br />
      <label to="depth">Bit Depth </label>
      <input type="number" name="depth" placeholder="bit depth" ref="depth" />
      <br />
      <button>Change color</button>
    </form>
    <div
      class="color-sample"
      :style="{ 'background-color': 'rgb(' + Color.rgbString(color) + ')' }"
    ></div>
    <div
      class="color-sample"
      :style="{ 'background-color': Color.hexString(color, true) }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Color, ColorData, ColorChannel, BitDepth } from "@/types/colorTypes";
const color = ref(new Color(31, 3, 1, 15));
// const colorValues = toRefs(
//   reactive({
//     r: 0 as ColorChannel,
//     g: 0 as ColorChannel,
//     b: 0 as ColorChannel,
//     depth: 0 as BitDepth,
//   })
// );
//const theRGB = ref(color.rgb);
// function changeColor() {
//   color.value.colorData = {
//     rgb: [147, 6, 198] as ColorChannel[],
//     depth: 24 as BitDepth,
//   } as ColorData;
//   // color.value.colorData = {
//   //   rgb: [2, 23, 30] as ColorChannel[],
//   //   depth: 15 as BitDepth,
//   // } as ColorData;
// }
const r = ref(0 as ColorChannel);
const g = ref(0 as ColorChannel);
const b = ref(0 as ColorChannel);
const depth = ref(15 as BitDepth);
function setColor() {
  console.log("arr", r.value.value);
  color.value.colorData = {
    rgb: [
      parseInt(r.value.value),
      parseInt(g.value.value),
      parseInt(b.value.value),
    ] as ColorChannel[],
    depth: parseInt(depth.value.value) as BitDepth,
  } as ColorData;
}
</script>

<style scoped>
.color-sample {
  margin: auto;
  margin-top: 5px;
  width: 200px;
  height: 10px;
  border-style: solid;
  border-width: 1px;
}
</style>
