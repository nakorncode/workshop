<script setup lang="ts">
import { ref } from 'vue'

// JavaScript Expressions
const currentYear = new Date().getFullYear()
const a = 2
const b = 5

// v-text, v-html
const message = ref('Hello World!')
const html = ref('<u><b>Hello World!</b></u>')

// v-bind (:)
const color = ref('#000000')
setInterval(() => {
  color.value = '#' + Math.floor(Math.random() * 16777215).toString(16)
}, 1000)

// v-if, v-else, v-else-if
type Pet = 'cat' | 'dog' | 'rabbit'
const currentPet = ref<Pet>('cat')
const currentPetIndex = ref(0)
setInterval(() => {
  currentPetIndex.value = (currentPetIndex.value + 1) % 3
  currentPet.value = ['cat', 'dog', 'rabbit'][currentPetIndex.value] as Pet
}, 1000)

// v-show
const isVisible = ref(false)
setInterval(() => {
  isVisible.value = !isVisible.value
}, 3000)

// v-for
const people: { name: string; age: number }[] = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 40 }
]
const countries: string[] = [
  'United States',
  'France',
  'Thailand'
]
const currencies: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  THB: '฿'
}

// v-on (@)
function alertMe() {
  alert('Hello!')
}
function onSubmitWithPrevent(event: Event) {
  event.preventDefault()
  const data = new FormData(event.target as HTMLFormElement)
  alert(JSON.stringify(Object.fromEntries(data.entries())))
}
function onSubmitWithoutPrevent(event: Event) {
  const data = new FormData(event.target as HTMLFormElement)
  alert(JSON.stringify(Object.fromEntries(data.entries())))
}

// v-model
const username = ref('')
const age = ref(0)
const bio = ref('')
const isMarried = ref(false)
const gender = ref<'male' | 'female' | 'other'>('other')
const country = ref<'us' | 'fr' | 'th' | null>(null)
</script>

<template>
  <div class="max-w-md p-4 prose prose-p:my-2 prose-hr:my-4 prose-hr:border-black prose-li:my-0">
    <h2>JavaScript Expressions <code>&lcub;&lcub;  &rcub;&rcub;</code></h2>
    <p>Current Year: {{ currentYear }}</p>
    <p>{{ a }} + {{ b }} = {{ a + b }}</p>

    <hr>

    <h2><code>v-text</code> <code>v-html</code></h2>
    <p>{{ message }}</p>
    <p v-text="message"></p>
    <p v-html="message"></p>
    <p>{{ html }}</p>
    <p v-text="html"></p>
    <p v-html="html"></p>

    <hr>

    <h2><code>v-bind</code> <code>:</code></h2>
    <!-- <p>Color (Incorrect): <span style="background-color: {{ color }}">{{ color }}</span></p> -->
    <p>Color (v-bind): <span v-bind:style="{ backgroundColor: color }">{{ color }}</span></p>
    <p>Color (shorthand): <span :style="{ backgroundColor: color }">{{ color }}</span></p>
    <hr>
    <h2><code>v-if</code> <code>v-else</code> <code>v-else-if</code></h2>
    <p>Current Pet: {{ currentPet }}</p>
    <div :class="`is-${currentPet}`">
      <p v-if="currentPet === 'cat'">🐈 Meow </p>
      <p v-else-if="currentPet === 'dog'">🐕 Woof </p>
      <p v-else>🐇 Squeak </p>
    </div>

    <hr>

    <h2><code>v-show</code></h2>
    <p v-show="isVisible">👀 I'm visible (v-show)</p>
    <p v-if="isVisible">👀 I'm visible (v-if)</p>

    <hr>

    <h2><code>v-for</code></h2>
    <ul>
      <li v-for="i in 5">{{ i }}</li>
    </ul>
    <ul>
      <li v-for="person in people">Name: {{ person.name }}, Age: {{ person.age }}</li>
    </ul>
    <ul>
      <li v-for="person of people">Name: {{ person.name }}, Age: {{ person.age }}</li>
    </ul>
    <!-- แทรก :key="" เพื่อช่วยให้อัลกอริทึมการวนลูปบน DOM ได้ดีขึ้น โดยต้องเป็นข้อมูล Unique สามารถอ่านเพิ่มเติมที่ https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key -->
    <ul>
      <li v-for="(value, key) in countries" :key="key">Index {{ key }}, Country: {{ value }}</li>
    </ul>
    <ul>
      <li v-for="(value, key, index) in currencies" :key="key">Index: {{ index }}, Currency: {{ key }}, Symbol: {{ value }}</li>
    </ul>

    <hr>

    <h2><code>v-on</code> <code>@</code></h2>
    <div class="flex gap-2">
      <button v-on:click="alertMe">Click Me! (v-on)</button>
      <button @click="alertMe">Click Me! (shorthand)</button>
    </div>
    <form @submit="onSubmitWithPrevent" style="margin-top: 1em;">
      <fieldset>
        <legend>Form (@submit)</legend>
        <div class="space-y-2">
          <div>
            <input name="title" type="text" placeholder="Please enter a title">
          </div>
          <div>
            <textarea name="description" placeholder="Please enter a description"></textarea>
          </div>
          <div>
            <label>
              <input name="accept" type="checkbox"> I accept the terms
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
    <form @submit.prevent="onSubmitWithoutPrevent" style="margin-top: 1em;">
      <fieldset>
        <legend>Form (@submit.prevent)</legend>
        <div class="space-y-2">
          <div>
            <input name="title" type="text" placeholder="Please enter a title">
          </div>
          <div>
            <textarea name="description" placeholder="Please enter a description"></textarea>
          </div>
          <div>
            <label>
              <input name="accept" type="checkbox"> I accept the terms
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </fieldset>
    </form>

    <hr>

    <h2><code>v-model</code></h2>
    <div class="space-y-2">
      <div>
        <label class="space-y-2">
          <span>Username:</span>
          <input v-model="username" type="text" placeholder="Please enter a username (v-model)">
          <input :value="username" @input="username = ($event.target as HTMLInputElement).value" type="text" placeholder="Please enter a username (traditional)">
        </label>
      </div>
      <div>
        <label>
          <span>Bio:</span>
          <textarea v-model.trim="bio" placeholder="Please enter a bio"></textarea>
        </label>
      </div>
      <div>
        <label>
          <span>Age:</span>
          <input v-model.number="age" type="number" placeholder="Please enter an age">
        </label>
      </div>
      <div>
        <label>
          <span class="mr-2">Is Married:</span>
          <input v-model="isMarried" type="checkbox">
        </label>
      </div>
      <div>
        <span class="font-bold mb-1 inline-block">Gender:</span>
        <label>
          <input v-model="gender" value="male" type="radio">
          Male
        </label>
        <label>
          <input v-model="gender" value="female" type="radio">
          Female
        </label>
        <label>
          <input v-model="gender" value="other" type="radio">
          Other
        </label>
      </div>
      <div>
        <span class="font-bold mb-1 inline-block">Country:</span>
        <select v-model="country">
          <option :value="null">-- Please select a country --</option>
          <option value="us">United States</option>
          <option value="fr">France</option>
          <option value="th">Thailand</option>
        </select>
      </div>
      <textarea class="font-mono text-sm" readonly cols="50" rows="8">{{ { username, bio, age, isMarried, gender, country } }}</textarea>
    </div>
  </div>
</template>

<style scoped>
.is-cat {
  background-color: lightsalmon;
}
.is-dog {
  background-color: lightgreen;
}
.is-rabbit {
  background-color: lightblue;
}
</style>
