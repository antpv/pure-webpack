import anime from 'animejs/lib/anime.es.js'
import './main.scss'

class Jonh {
  constructor(options) {
    this.rootElement = options.rootElement
  }

  getTest() {
    console.log(this.rootElement)
  }
}

const instance = new Jonh({
  rootElement: document.body.querySelector('.container')
})

console.log(instance)
console.log(anime)
