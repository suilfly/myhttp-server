const http = require('http')
const fs = require('fs')
const path = require('path')


/**
 * @description 读取文件夹/文件信息
*/
const getFileLists = (iPath) => {
    const dir = path.resolve(__dirname)
    console.log(dir)

    fs.stat(iPath, (err, stat) => {
        if(err) return
        // 读取当前目录

        fs.readdir(dir, (err, files) => {
            console.log(files)

            let html = `${[
                '<!doctype html>',
                '<html>',
                '   <head>',
                '    <meta charset="utf-8">',
                '    <meta name="viewport" content="width=device-width">',
                `    <title>Index of /</title>`,
                '   </head>',
                '   <body>',
                '</html>'
            ]}`
        })
    }) 
}

getFileLists('/')

// 创建服务器
const server = http.createServer((req, res) => {

})