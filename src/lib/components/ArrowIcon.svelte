<script lang="ts">
  let { direction = "right" }: { direction?: "right" | "down" } = $props();
</script>

<svg
  aria-hidden="true"
  class="arrow-icon arrow-icon--{direction}"
  viewBox="0 0 16 16"
>
  <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
</svg>
