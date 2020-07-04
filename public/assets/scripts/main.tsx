import Router from './util/Router'
import common from './routes/common'
import ln from './routes/ln'
import laser from './routes/laser'
import '../styles/main.scss'

const routes = new Router({

    // All pages
    common,
    ln,
    laser,

})

document.addEventListener('DOMContentLoaded', () => { routes.loadEvents() })