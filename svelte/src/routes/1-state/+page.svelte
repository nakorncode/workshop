<script lang="ts">
  import Counter from "./Counter.svelte";
  import Note from "./Note.svelte";
  import SimpleCard from "./SimpleCard.svelte";
  import Sum from "./Sum.svelte";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
  import ThemeToggler from "./ThemeToggler.svelte";
  import Todo from "./Todo.svelte";
</script>

<Counter></Counter>

<hr class="my-4">

<Todo></Todo>

<hr class="my-4">

<Sum></Sum>

<hr class="my-4">

<Note></Note>

<hr class="my-4">

<div class="space-y-4">
  <h2 class="text-xl font-bold mb-2">Theme Switcher</h2>
  <ThemeSwitcher></ThemeSwitcher>
  <ThemeToggler></ThemeToggler>
  <SimpleCard></SimpleCard>
</div>
