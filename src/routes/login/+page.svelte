<script>
   import Button from "$lib/components/ui/button/button.svelte";  
   import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";

   let username = '';
   let password = '';
   
   let usernameCheck = true;
   let passwordCheck = true;

   let hidePassword = true;

   async function login() {
      const user = {
         username,
         password
      };

      usernameCheck = username !== '';
      passwordCheck = password !== '';

      if (username && password) {
         const response = await fetch('/api/gen-token', {
            method: 'POST',
            body: JSON.stringify({
               username,
               password
            })
         });
   
         const { token } = await response.json();
         console.log('New user token:', token);
      }
   }
</script>

<section class="grid place-items-center p-3 bg-stone-800 rounded-md h-full w-full">
   <div class="flex flex-col gap-y-6 w-fit">
      <h1 class="text-3xl font-semibold">Login</h1>
   
      <div class="flex flex-col gap-y-2">
         <div>
            <Label class="text-base">Username</Label>
            <Input type="text" class="mt-1 text-base bg-stone-900 autofill:bg-slate-900" id="username" placeholder="user_name" bind:value={username} />
            <span data-check={usernameCheck} class="text-red-500 text-sm data-[check=false]:flex hidden">Username cannot be empty.</span>
         </div>
      
         <div>
            <Label class="text-base">Password</Label>
            <div class="flex flex-row gap-x-2 items-center">
               <Input type={hidePassword ? 'password' : 'text'} class="mt-1 text-base bg-stone-900 autofill:bg-slate-900" id="password" placeholder="*****" bind:value={password} />
               <Button on:click={() => hidePassword = !hidePassword} class="text-stone-400 hover:text-stone-50" variant="ghost" size="icon">
                  {#if hidePassword}
                     <i class="ti ti-eye-off"></i>
                  {:else}
                     <i class="ti ti-eye"></i>
                  {/if}
               </Button>
            </div>
            <span data-check={passwordCheck} class="text-red-500 text-sm data-[check=false]:flex hidden">Password cannot be empty.</span>
         </div>
      </div>
   
      <Button on:click={login} class="hover:bg-stone-900 w-full" variant="default">
          Login
      </Button>
   </div>
</section>