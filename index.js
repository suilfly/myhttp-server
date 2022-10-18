const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');
const childProcess = require('child_process');

const url1 = 'http://localhost:3001';
/**
 * @description 读取文件夹/文件信息
 */
const getFileLists = (req, res) => {
  console.log(req.path)
  const url = new URL(url1 + req.url)
  const pathName = url.pathname;

  if (pathName === '/favicon.ico') return;

  // 获取最初根路径
  const finalPath = __dirname + pathName;

  // 如果文件存在
  if (fs.existsSync(finalPath)) {
    const fileStat = fs.statSync(finalPath);
    // 如果是文件夹
    if (fileStat.isDirectory()) {
      // 读取文件夹的结构
      fs.readdir(finalPath, (err, files) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('<h1>404 not found</h1>');
        } else {
          let html = "<head><meta charset='utf-8'></head>";
          const files = fs.readdirSync(finalPath);
          files.forEach((file) => {
            html += `<div><a href="/${file}">${file}</a></div>`;
          });

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(html);
        }
      });
    } else if (fileStat.isFile()) {
      // 打开文件
      fs.readFile(finalPath, (err, data) => {
        if (err) {
          res.end('cannot read file!');
          return
        }
        res.writeHead(200, {'Content-Type': mime.getType(path.basename(finalPath))})
        res.end(data)
      });
    }
  }
};

// 创建服务器
const server = http.createServer((req, res) => {
  getFileLists(req, res);
});

server.listen(3001, () => {
  console.log('listening port 3000......');
});

childProcess.exec(`start ${url1}`);
