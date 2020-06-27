import Router from './util/Router'
import common from './routes/common'
import '../styles/main.scss'

const routes = new Router({

    // All pages
    common,

})

document.addEventListener('DOMContentLoaded', () => { routes.loadEvents() })