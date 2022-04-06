<template>
  <div class="control">
    <div class="line">
      <span class="label">主图：</span>
      <el-select
        v-model="formData.gameImg"
        :disabled="games.isStart"
        @change="changeGameImg"
      >
        <el-option
          v-for="item in formInline.imgList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="line">
      <span class="label">等级：</span>
      <el-select v-model="formData.level" :disabled="games.isStart">
        <el-option
          v-for="item in formInline.levelList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="line" v-if="games.isStart">步数：{{ games.step }}</div>
    <div class="line">
      <el-button type="primary" @click="changeGame">{{
        games.isStart ? "结束游戏" : "开始游戏"
      }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from "vue"
const props = defineProps<{ games: any }>()

// 开始游戏、重来
const changeGame = () => {
  props.games.init(formData.value)
}
// 切换主图
const changeGameImg = (img: string) => {
  props.games.setImg(img)
}

const data = reactive({
  formData: {
    gameImg: "zdg",
    level: 3,
  },
  formInline: {
    imgList: [
      { label: "沐华", value: "mh" },
      { label: "尘世行", value: "zdg" },
      { label: "大妹子", value: "woman" },
      { label: "大兄弟", value: "man" },
      { label: "斗破苍穹", value: "dp" },
    ],
    levelList: [
      { label: "初级", value: 3 },
      { label: "中级", value: 4 },
      { label: "高级", value: 5 },
    ],
  },
})
const { formData, formInline } = toRefs(data)
</script>
<style lang="scss" scoped>
.line {
  display: flex;
  align-items: center;
  justify-content: center;
  & + .line {
    margin-top: 20px;
  }
  .el-select {
    flex: 1;
  }
}
</style>
