<script>
   import Topbar from "$lib/components/Topbar.svelte";
   import "../app.css";
</script>

<main class="flex flex-col p-3 gap-3 w-screen h-full">
   <Topbar />
   <slot></slot>
</main>