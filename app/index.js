import { greetingText } from './messages'
import './main.scss'

const doc = document
const app = doc.getElementById('app')

doc.addEventListener('DOMContentLoaded', () => {
  const button = doc.getElementById('button')

  button.innerText = greetingText

  button.onclick = () => {
    setTimeout(() => {
      import('./messages-async')
        .then(asyncModule => {
          const morty = doc.createElement('div')
          morty.classList.add('morty')

          app.appendChild(morty)
        })
    }, 3000)
  }
})
