export function showInfo(msg) {
  const p = document.createElement('p')
  const chatOutput = document.getElementById('chat-output')
  let ctaId = window.crypto.randomUUID()
  if (typeof msg === 'object') {
    p.innerHTML = msg.text.replace('{cta}', `<a id=${ctaId} class="cta cta-copy text-gray-200 underline cursor-pointer">${msg.cta}</a>`)
  } else if (typeof msg === 'string') {
    const txt = document.createTextNode(msg)
    p.appendChild(txt)
  }

  p.classList.add('mb-2', 'text-sm', 'text-gray-400', 'text-center')
  chatOutput.appendChild(p)

  chatOutput.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.id === ctaId) {
      navigator.clipboard.writeText(msg.cta)
    }
  })
}

export function showMsg(msg, peer) {
  const fromMyself = window.peer.id === peer
  const p = document.createElement('p')
  const span = document.createElement('span')
  const txt = document.createTextNode(msg)
  span.appendChild(txt)
  span.classList.add('px-4', 'py-1', 'inline-block', 'rounded-lg', fromMyself ? 'bg-slate-950' : 'bg-slate-800')
  p.appendChild(span)
  const chatOutput = document.getElementById('chat-output')

  p.classList.add('mb-2', fromMyself ? 'text-left' : 'text-right')
  chatOutput.appendChild(p)
}