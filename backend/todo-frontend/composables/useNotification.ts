type Messages = string | string[] | null

const notification = reactive<{
  messages: Messages
}>({
  messages: null
})

export const useNotification = () => ({
  setMessage(messages: Messages) {
    notification.messages = messages
  },
  messages: computed(() => notification.messages)
})
