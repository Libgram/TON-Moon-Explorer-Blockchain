export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'TonMoon - first ecosystem on Telegram Open Network',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap'},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=1' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
 
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
  ],

  pwa: {
    icon: {
      fileName:'favicon.png',
      source: '/static/favicon.png'
    },
    meta: {
      name: 'TonMoon',
      mobileAppIOS:true
    },
    manifest: {
      name: 'TonMoon'
    }
},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
