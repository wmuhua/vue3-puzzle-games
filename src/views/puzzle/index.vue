<template>
  <div class="container">
    <div class="stage">
      <div class="game-name" v-show="!isStart">华容道</div>
      <div class="content clearfix" v-show="isStart">
        <div
          v-for="item in randomData"
          :key="item"
          :class="`img${level}`"
          @click="handleMove(item)"
        >
          <el-image
            v-if="item != randomData.length"
            :src="getSmallImg(`${gameImg}/${level}/${item}.jpg`)"
          ></el-image>
        </div>
      </div>
    </div>
    <div class="other">
      <div class="point">
        <el-image :src="getGameImgFile(gameImg)"></el-image>
      </div>
      <Control :games="games"></Control>
    </div>
  </div>
</template>

<script setup lang="ts">
import Control from "./components/control.vue"
import { onBeforeUnmount, onMounted, reactive, toRefs } from "vue"
import { getGameImgFile, getSmallImg } from "@/utils/utils"
import Puzzle from "@/utils/puzzle"
let games = reactive(Puzzle)
const { gameImg, randomData, level, isStart } = toRefs(games)

// 鼠标移动图片
const handleMove = (index: number) => {
  games.move(index)
}
// 键盘事件
const handleKeyDown = (e: any) => {
  if (!isStart.value) return
  games.onKeydown(e.keyCode)
}
onMounted(() => {
  document.addEventListener("keydown", handleKeyDown)
})
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown)
})
</script>

<style scoped></style>
