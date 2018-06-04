'use strict'
import Vue from 'vue'

export default function treeToArray(data, expandAll, parent = null, level = null) {
    let tmp = [];
    // Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例
    Array.from(data).forEach(function(record) {
        if (record._expanded === undefined) {
            Vue.set(record, '_expanded', expandAll)
        }

        let _level = 1
        if (level !== undefined && level !== null) {
            _level = level + 1
        }
        Vue.set(record, '_level', _level)

        // 如果有父元素
        if (parent) {
            Vue.set(record, 'parent', parent)
        }

        tmp.push(record)

        // 判断是否有子元素
        if (record.children && record.children.length > 0) {
            const children = treeToArray(record.children, expandAll, record, _level)
            tmp = tmp.concat(children)
        }
    })
    return tmp
}


