// 获取当前游戏大图片
export const getGameImgFile = (url: string) => {
  return new URL(`../assets/images/${url}/${url}.jpg`, import.meta.url).href
}

// 获取当前游戏小图片
export const getSmallImg = (path: string) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

export interface IMode {
  gameImg: string
  level: number
}
