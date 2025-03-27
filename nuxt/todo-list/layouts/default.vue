<template>
  <div class="p-3 text-gray-700">
    <nav>
      <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">
        <ul class="flex items-center gap-2">
          <li><NuxtLink class="font-bold text-lg text-blue-600 underline" to="/">Todo List</NuxtLink></li>
          <li class="ml-auto"><NuxtLink to="/sign-up" class="text-white bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-800">Sign Up</NuxtLink></li>
        </ul>
      </div>
    </nav>

    <main class="mt-4">
      <div class="max-w-md mx-auto">
        <slot/>
      </div>
    </main>
  </div>
</template>
