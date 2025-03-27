export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'gray'
    },
    toaster: {
      defaultVariants: {
        position: 'top-center'
      }
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    }
  }
})
