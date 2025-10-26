import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes),
    // routes
})



router.beforeEach((to, from, next) => {
    // const isAuthenticated = false
    const isAuthenticated =
        localStorage.getItem('authenticated') != null &&
        localStorage.getItem('authenticated') === 'true'
            ? true
            : false
    
    if (to.meta.layout === 'protected' && !isAuthenticated) {
        next({ path: '/' })
    } else {
        next()
    }
})

router.afterEach((to) => {
    const defaultTitle = 'MyApp'
    const pageTitle = to.meta.title
        ? `${to.meta.title} | ${defaultTitle}`
        : defaultTitle
    document.title = pageTitle
})

router.onError((err, to) => {
    if (
        err?.message?.includes?.('Failed to fetch dynamically imported module')
    ) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            console.log('Reloading page to fix dynamic import error')
            localStorage.setItem('vuetify:dynamic-reload', 'true')
            location.assign(to.fullPath)
        } else {
            console.error(
                'Dynamic import error, reloading page did not fix it',
                err
            )
        }
    } else {
        console.error(err)
    }
})

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
