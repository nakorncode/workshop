<script setup lang="ts">
import { reactive } from 'vue'

import CompositionAPISetup from './components/CompositionAPISetup.vue'
import OptionsAPI from './components/OptionsAPI.vue'
import CompositionAPI from './components/CompositionAPI.vue'

const counter = reactive({
  a: 0,
  b: 0,
  c: 0
})

function onCounterChangedA(value: number) {
  counter.a = value
}

function onCounterChangedB(value: number) {
  counter.b = value
}

function onCounterChangedC(value: number) {
  counter.c = value
}
</script>

<template>
  <div class="p-4 max-w-md">
    <CompositionAPI @counter-changed="onCounterChangedA" title="Composition API (defineComponent)"></CompositionAPI>

    <hr>

    <CompositionAPISetup @counter-changed="onCounterChangedB" title="Composition API (Setup)"></CompositionAPISetup>

    <hr>

    <OptionsAPI @counter-changed="onCounterChangedC" title="Options API"></OptionsAPI>

    <hr>

    <pre>{{ counter }}</pre>
  </div>
</template>
