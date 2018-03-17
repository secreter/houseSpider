/**
 * Created by So on 2018/3/9.
 */
const _ = require('lodash')
const traverseArrayTree = (arrayTree, cb = x => x) => {
  if (!_.isArray(arrayTree)) {
    console.log('traverseArrayTree require array!')
  }
  arrayTree.map(node => {
    cb(node)
  })
}
module.exports = {
  traverseArrayTree
}
