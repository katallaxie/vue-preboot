/**
 * Dll's
 */
export function polyfills() {
  return [
    'core-js/es6/promise',
  ];
}

export function vendor() {
  return [
    'vue',
    'vue-router',
    'vuex',
    'vuex-class',
    'vue-class-component'
  ];
}
