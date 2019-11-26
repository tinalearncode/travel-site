import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'

let mobileMenue = new MobileMenu()

if (module.hot) {
  module.hot.accept()
}
