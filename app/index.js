// import { Observable } from 'rxjs'
// import { interval, map } from 'rxjs/operators'

// const stream$ = new Observable(subscriber => {
//   subscriber.next({
//     items: []
//   })
// }).pipe(
//   interval(1000, v => v),
//   map(payload => ({
//     ...payload,
//     loading: true
//   })
// )


// stream$.subscribe(payload => {
//   console.log(payload)
// })
// ***

import './main.scss'

// Push skeletons
const wrapper = document.body.querySelector('.async-swipe-wrapper')
const createSkeleton = value => `<div class="async-swipe-wrapper__skeleton">${value}</div>`
let renderSkeletonsCount = 30

while (renderSkeletonsCount--) {
  wrapper.innerHTML += createSkeleton(`Skeleton ${renderSkeletonsCount}`)
}

// Code
console.log('test')

wrapper.addEventListener('touchstart', (e) => {
  console.log(e)
})
