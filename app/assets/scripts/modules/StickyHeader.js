import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector('.site-header')
    this.pageSections = document.querySelectorAll('.page-section')
    this.toTop = document.querySelector('.to-top')
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    this.events()
  }

  events() {
    window.addEventListener(
      'scroll',
      throttle(() => this.runOnScroll(), 200)
    )
    window.addEventListener(
      'resize',
      debounce(() => {
        this.browserHeight = window.innerHeight
      }, 300)
    )
  }

  runOnScroll() {
    this.determineScrollDirection()

    if (window.scrollY > 60) {
      this.siteHeader.classList.add('site-header--dark')
      this.toTop.classList.add('to-top--is-visible')
    } else {
      this.siteHeader.classList.remove('site-header--dark')
      this.toTop.classList.remove('to-top--is-visible')
    }

    this.pageSections.forEach(el => this.calcSection(el))
  }

  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }
    this.previousScrollY = window.scrollY
  }

  calcSection(el) {
    let scrollPercent
    let matchingLink = el.getAttribute('data-matching-link')
    if (
      window.scrollY + this.browserHeight > el.offsetTop &&
      window.scrollY < el.offsetTop + el.offsetHeight
    ) {
      scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100

      if (
        (scrollPercent < 18 &&
          scrollPercent > -0.1 &&
          this.scrollDirection == 'down') ||
        (scrollPercent < 30 && this.scrollDirection == 'up')
      ) {
        document
          .querySelectorAll(`.primary-nav a:not(${matchingLink}`)
          .forEach(el => el.classList.remove('is-current-link'))
        document.querySelector(matchingLink).classList.add('is-current-link')
      }
    }

    if (matchingLink == '#our-beginning-link' && scrollPercent > 45) {
      document.querySelector(matchingLink).classList.remove('is-current-link')
    }
  }
}

export default StickyHeader
