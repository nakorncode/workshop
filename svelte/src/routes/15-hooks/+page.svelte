<script lang="ts">
  import type { PageProps } from "./$types";
  let props: PageProps = $props()
</script>

<p><b>Current username from hook:</b> {props.data.currentUsername}</p>
