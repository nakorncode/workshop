<script lang="ts">
  import Counter from "./Counter.svelte";
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

<div class="space-y-4">
  <ThemeSwitcher></ThemeSwitcher>
  <ThemeToggler></ThemeToggler>
  <SimpleCard></SimpleCard>
</div>
