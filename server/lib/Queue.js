/**
 * Created by pengchaoyang on 2018/3/9
 */
const _ = require('lodash')

/**
 * 一个队列，从尾部添加，从头部出去；
 */
class Queue {
  /**
   * 构造函数
   * @param unique 是否是唯一队列，true表示需要去重
   * @param getKey 函数，返回去重依据的key
   */
  constructor (unique = false, getKey = x => x) {
    this.unique = unique
    this.getKey = getKey
    this.queue = []
  }
  push (x) {
    if (this.unique === true && this.isInQueue(x)) {
      return false
    }
    this.queue.push(x)
    return true
  }
  pop () {
    return this.queue.shift()
  }
  isInQueue (x) {
    let key = this.getKey(x)
    return this.queue.some(item => {
      return key === this.getKey(item)
    })
  }
  isEmpty () {
    return _.isEmpty(this.queue)
  }
  getQueue () {
    return this.queue
  }
  getList (reg, remove = false) {
    let regex = new RegExp(reg)
    let list = this.queue.filter(item => {
      return regex.test(this.getKey(item))
    })
    if (remove) {
      this.queue = this.queue.filter(item => {
        return !regex.test(this.getKey(item))
      })
    }
    return list
  }
  get length () {
    return this.queue.length
  }
}
module.exports = Queue
