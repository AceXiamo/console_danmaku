const getImageSrc = (e) => {
  return e.childNodes[0].getAttribute('src')
}

let target = document.getElementById('chat-items'), lastText = ''
let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    let nodes = target.childNodes
    let last = nodes[nodes.length - 1]
    let nick = last.getAttribute('data-uname')
    let say = last.childNodes[1].childNodes
    let sayText = ``
    let styles = ['color: #6366f1']

    say.forEach((v) => {
      if (v.childNodes.length > 1) {
        // sayText += '%c'
        // styles.push(`background:url(${getImageSrc(v)}) cover no-repeat;height:20px;width:20px;`)
      } else {
        sayText += `%c${v.textContent}`
        styles.push('color: #cbd5e1')
      }
    })
    let logText = `[🧨 Danmaku] %c${nick || '?'}: ${sayText}`
    
    if (logText === lastText) return
    lastText = logText
    console.log(logText, ...styles)
  })
})
let config = { attributes: true, childList: true, characterData: true }
observer.observe(target, config)

const sendDmk = (msg) => {
  const textarea = document.querySelector('textarea.chat-input.border-box')
  const inputEvent = new InputEvent('input', { bubbles: true })
  textarea.value = msg
  textarea.dispatchEvent(inputEvent)

  document.querySelector('button.bl-button').click()
}
