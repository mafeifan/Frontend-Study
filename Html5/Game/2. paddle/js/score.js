// 左下角的分数
export class Score {
  constructor() {
    this.step = 100 // 累加值
    this.initNumber = 0
  }
  up() {
    this.initNumber += this.step
  }
}
