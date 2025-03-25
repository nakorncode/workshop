<script setup lang="ts">
const currentYear = new Date().getFullYear()

const { user, logout } = useUser()

interface NavItem {
  title: string
  to: string
  isExternal?: boolean
}

const navItems: NavItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Products', to: '/products' },
  { title: 'About', to: '/about' },
  { title: 'Nuxt Homepage', to: 'https://nuxtjs.org', isExternal: true }
]
</script>

<template>
  <nav>
    <ul>
      <!-- default nav list -->
      <li v-for="item in navItems" :key="item.title">
        <NuxtLink v-if="!item.isExternal" :to="item.to">{{ item.title }}</NuxtLink>
        <a v-else :href="item.to" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
      </li>

      <!-- authenticated nav list -->
      <template v-if="!user">
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/sign-up">Sign Up</NuxtLink>
        </li>
      </template>
      <li v-else><button @click="logout">Logout</button></li>
    </ul>
  </nav>

  <main>
    <slot></slot>
  </main>

  <footer>
    <p>&copy; {{ currentYear }}</p>
  </footer>
</template>