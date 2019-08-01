/**
 * @author 林嘉珉
 * 用 node 运行
 * @description 递归读取文件夹中文件的字符串内容，已去除注释与空行
 */

const root = './pro-ex/src' // 源码目录
const filename = 'dist.txt' // 生成文件名，生成的文件在当前目录下

const fs = require('fs')
try {
    fs.unlinkSync(`./${filename}`)
} catch (e) {
}

let fileNameArr = []

// 递归读取文件名
function readFile(path, result = []) {
    let files = fs.readdirSync(path, {
        withFileTypes: true
    })
    let dirs = []
    files.forEach(item => {
        if (item.isDirectory()) {
            dirs.push({
                path: `${path}/${item.name}`,
                data: item
            })
        } else if (item.name !== '.DS_Store') {
            result.push(`${path}/${item.name}`)
        }
    })

    dirs.forEach(item => {
        readFile(item.path, result)
    })

    return result
}
readFile(root, fileNameArr)

fileNameArr.forEach(item => {
    let str = ''
    str += fs.readFileSync(item, {
        encoding: 'utf8'
    })
    str += '\n'

    str = str.replace(/(\/\/.*)|(\/\*[\s\S]*?\*\/)/g, ""). // 去除注销
            replace(/\n\s*(\n)/g, '$1') // 去除空行

    // 写入文件
    fs.writeFileSync(`./${filename}`, str, {
        flag: 'a'
    })
})

