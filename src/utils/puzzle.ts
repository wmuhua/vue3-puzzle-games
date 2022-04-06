import { ElMessageBox } from "element-plus"
import type { Action } from "element-plus"
import { IMode } from "./utils"

export interface IPuzzle {
  isStart: boolean
  randomData: Array<number>
  finishData: string
  gameImg: string
  level: number
  step: number
}

// 拼图类
class Puzzle implements IPuzzle {
  isStart = false
  randomData: Array<number> = []
  finishData = ""
  gameImg = "zdg"
  level = 3
  step = 0
  constructor() {}
  // 初始化
  init({ gameImg, level }: IMode) {
    this.step = 0
    this.level = level
    this.gameImg = gameImg
    this.randomData = this.getRandomData()
    this.isStart = !this.isStart
    if (this.isStart) this.finishData = this.getFinishData()
  }
  // 鼠标移动图片
  move(idx: number) {
    let level = this.level
    let target = this.randomData.indexOf(idx) // 当前选中位置下标
    let space = this.randomData.indexOf(Math.pow(level, 2)) // 空白位置下标

    // 过滤一下，空白位置在最左边时点击右边上一个数字时也能实现交换
    // 以及空白位置在最右边点击左边下一个数字时也能实现交换
    let condition =
      (space % level == 0 && target % level == level - 1) ||
      (space % level == level - 1 && target % level == 0)

    if (!condition) {
      // 点击目标的，上或下或左或右是空白位，就交换位置
      if (
        target == space - level ||
        target == space + level ||
        target == space - 1 ||
        target == space + 1
      ) {
        this.change(space, target)
      }
    }
  }
  // 键盘事件
  onKeydown(code: number) {
    let level = this.level
    // 目标位置下标
    let target
    // 空白位置下标
    let space = this.randomData.indexOf(Math.pow(level, 2))
    switch (code) {
      case 37:
        target = space + 1
        if (space % level == level - 1) return
        this.change(space, target)
        break
      case 38:
        target = space + level
        if (target > this.randomData.length - 1) return
        this.change(space, target)
        break
      case 39:
        target = space - 1
        if (space % level == 0) return
        this.change(space, target)
        break
      case 40:
        target = space - level
        if (target < 0) return
        this.change(space, target)
        break
    }
  }
  change(space: number, target: number) {
    // 空白位置替换成目标位置
    this.randomData[space] = this.randomData[target]
    // 目标位置为最大值，就完成了替换
    this.randomData[target] = Math.pow(this.level, 2)
    this.step += 1
    this.finish()
  }
  // 检查是否拼图完成
  finish() {
    if (this.randomData.join("") == this.finishData) {
      ElMessageBox.alert(`恭喜你，闯关成功，仅用${this.step}步`, "提示", {
        confirmButtonText: "OK",
        callback: (action: Action) => {
          this.randomData = []
          this.step = 0
          this.isStart = false
        },
      })
    }
  }
  // 切换游戏图片
  setImg(img: string) {
    this.gameImg = img
  }
  // 根据不同难度生成拼图完成时的数据用来对比，判断是否完成
  getFinishData(): string {
    let str = ""
    for (let i = 1, len = Math.pow(this.level, 2); i <= len; i++) {
      str += i
    }
    return str
  }
  // 生成小图片数量数组
  getRandomData() {
    let randomData = []
    // 根据游戏等级生成最大值，减1是因为最大值保留作空白位放最后
    let max = Math.pow(this.level, 2) - 1
    while (randomData.length < max) {
      // 生成一个范围内的随机数
      let random = Math.floor(Math.random() * max) + 1
      if (randomData.indexOf(random) == -1) {
        // 没有重复的就添加
        randomData.push(random)
      }
    }
    // 添加最大数字作为空白位
    randomData.push(max + 1)
    return randomData
  }
}
export default new Puzzle()
