import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        VueRouter({
            routesFolder: 'src/pages',
        }),
        Layouts({
            layoutsDirs: 'src/layouts',
            defaultLayout: 'default',
        }),
        vue(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@composables': path.resolve(__dirname, './src/composables')
        },
    },
})
