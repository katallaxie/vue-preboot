import { inBrowser } from './utils'

if (inBrowser && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.error('SW registration failed: ', registrationError)
    });
  })
}
