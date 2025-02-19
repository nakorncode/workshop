interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
}

const user = ref<User | null>(null)

export const useUser = () => {
  const auth = useAuth()
  const notification = useNotification()
  return {
    async getSession(): Promise<boolean> {
      const session = await auth.getSession()
      if (session.error || session.data === null) {
        user.value = null
        return false
      }
      user.value = session.data.user
      return true
    },
    async logout() {
      await auth.signOut()
      await this.getSession()
      notification.setMessage('Logout successful.')
      navigateTo('/login')
    },
    user
  }
}
