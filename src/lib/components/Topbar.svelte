<script>
   import { Button } from "./ui/button";
   import { goto } from "$app/navigation";

   const ROUTES = [
      {
         label: 'Home',
         icon: 'home',
         path: '/'
      },
      {
         label: 'Finance',
         icon: 'wallet',
         path: '/finance'
      },
      {
         label: 'Login',
         icon: 'user',
         path: '/login'
      }
   ];

   function navigateTo(path) {
      goto(path);
   }
</script>

<div class="p-2 bg-stone-800 rounded-md">
   {#each ROUTES as route}   
      <Button on:click={() => navigateTo(route.path)} class="hover:bg-neutral-900" variant="ghost">
         <i class={`ti ti-${ route.icon } text-xl mr-2`}></i>
         { route.label }
      </Button>
   {/each}
</div>