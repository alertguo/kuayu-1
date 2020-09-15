// 封装jsonp
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = 'alertJSONPCallbackName' + Math.random()
    window[random] = (data) => {
      resolve(data)
    } // 成功时拿到 data
    const script = document.createElement('script') // 创建 script 标签
    script.src = `${url}?callback=${random}` // 设置src,拿数据
    script.onload = () => {
      script.remove()
    } // 删除 script
    script.onerror = () => {
      reject()
    } // 失败时调用 reject
    document.body.appendChild(script) // 添加到 body
  })
}
// 调用jsonp
jsonp('http://qq.com:8888/friends.js')
  .then((data) => {
  console.log(data)
})

// AJAX 发请求
// const request = new XMLHttpRequest()
// request.open('GET', 'http://qq.com:8888/friends.json')
// request.onreadystatechange = () => {
//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request.response)
//   }
// }
// request.send()
