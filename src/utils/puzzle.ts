import { ElMessageBox } from "element-plus"
import type { Action } from "element-plus"
import { IMode } from "./utils"

export interface IPuzzle {
  isStart: boolean
  data: Array<number>
  gameImg: string
  level: number
  step: number
}

// 拼图类
export default class Puzzle implements IPuzzle {
  isStart = false
  data: Array<number> = []
  gameImg = "zdg"
  level = 3
  step = 0
  constructor() {}
  // 初始化
  init({ gameImg, level }: IMode) {
    this.step = 0
    this.level = level
    this.gameImg = gameImg
    this.data = this.getRandomData()
  }
  // 游戏状态
  change(state: boolean) {
    this.isStart = state
  }
  // 移动图片
  move(idx: number) {
    let level = this.level
    let index = this.data.indexOf(idx) // 当前选中位置下标
    let space = this.data.indexOf(Math.pow(level, 2)) // 空白位置下标

    // 过滤 空白位置在最左边时点击右边上一个数字时也能实现交换
    // 以及空白位置在最右边点击左边下一个数字时也能实现交换
    let condition =
      (space % level == 0 && index % level == level - 1) ||
      (space % level == level - 1 && index % level == 0)

    if (!condition) {
      if (
        index == space - level ||
        index == space + level ||
        index == space - 1 ||
        index == space + 1
      ) {
        // 空白位置为点击位置
        this.data[space] = this.data[index]
        // 点击位置为最大值，实现交换
        this.data[index] = Math.pow(level, 2)
        // 步数
        this.step += 1
      }
    }
    this.finish()
  }
  // 检查是否拼图完成
  finish() {
    if (this.data.join("") == this.finishData()) {
      ElMessageBox.alert(`恭喜你，闯关成功，仅用${this.step}步`, "提示", {
        confirmButtonText: "OK",
        callback: (action: Action) => {
          this.data = []
          this.step = 0
          this.isStart = false
        },
      })
    }
  }
  // 生成拼图完成时的数据用来对比，判断是否完成
  finishData(): string {
    let str = ""
    for (let i = 1, len = Math.pow(this.level, 2); i <= len; i++) {
      str += i
    }
    return str
  }
  // 切换游戏图片
  setImg(img: string) {
    this.gameImg = img
  }
  // 生成小图片数量数组
  getRandomData() {
    let randomArr = [] // 随机数集合
    let max = Math.pow(this.level, 2) - 1 //根据游戏等级生成最大值
    while (randomArr.length < max) {
      // 生成一个范围内的随机数
      let randDigit = Math.floor(Math.random() * max) + 1
      if (randomArr.indexOf(randDigit) == -1) {
        // 没有重复的就添加
        randomArr.push(randDigit)
      }
    }
    randomArr.push(max + 1) // 添加最大数字作为空白位
    return randomArr
  }
}
