type Messages = string | string[] | null | undefined

const notification = reactive<{
  messages: Messages
  errors: Messages
  seen: boolean
}>({
  messages: null,
  errors: null,
  seen: false
})

export const useNotification = () => ({
  setMessage(messages: Messages) {
    notification.messages = messages
    notification.seen = false
  },
  setError(messages: Messages) {
    notification.errors = messages
    notification.seen = false
  },
  setSeen() {
    notification.seen = true
  },
  messages: computed(() => notification.messages),
  errors: computed(() => notification.errors),
  seen: computed(() => notification.seen)
})
