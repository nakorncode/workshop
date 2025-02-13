<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

definePageMeta({
  layout: 'auth'
})

const auth = useAuth()
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(z.object({
    name: z.string({ message: 'Name is required' }).min(1, { message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ message: 'Password is required' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password must be strong and contain at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character'
    }),
    confirmPassword: z.string({ message: 'Confirm password is required' }).min(1, { message: 'Confirm password is required' })
  }).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword']
      })
    }
  }))
})

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false
})

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false
})

const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', {
  validateOnModelUpdate: false
})

const router = useRouter()
const notification = useNotification()

const onSubmitError = ref<string | null>(null)
const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await auth.signUp.email(values)
    if (res.error) {
      throw new Error(res.error.message)
    }
    notification.setMessage('Sign up successful. You can login now.')
    router.push('/login')
  } catch (error) {
    onSubmitError.value = (error as Error).message
  }
})
</script>

<template>
  <div class="mt-6 shadow-xl p-6 rounded-md">
    <h1 class="text-xl font-bold">Sign Up</h1>
    <ShowNotification :errors="errors" class="mt-4"></ShowNotification>
    <ShowNotification :errors="onSubmitError" class="mt-4"></ShowNotification>
    <form class="mt-6" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="name" class="block font-medium text-gray-700">Name:</label>
        <input v-model="name" v-bind="nameAttrs" type="text" id="name" name="name" class="input mt-1" />
      </div>
      <div class="mb-4">
        <label for="email" class="block font-medium text-gray-700">Email:</label>
        <input v-model="email" v-bind="emailAttrs" type="email" id="email" name="email" class="input mt-1" />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-medium text-gray-700">Password:</label>
        <input v-model="password" v-bind="passwordAttrs" type="password" id="password" name="password" class="input mt-1" />
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block font-medium text-gray-700">Confirm Password:</label>
        <input v-model="confirmPassword" v-bind="confirmPasswordAttrs" type="password" id="confirmPassword" name="confirmPassword" class="input mt-1" />
      </div>
      <button type="submit" class="btn w-full mt-2">
        Sign Up
      </button>
    </form>
    <div class="mt-4">
      <p>
        Already have an account? <NuxtLink to="/login" class="underline text-blue-600">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>
