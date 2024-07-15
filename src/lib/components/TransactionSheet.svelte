<script>
   import * as Sheet from "$lib/components/ui/sheet/index.ts";
   import Button from "$lib/components/ui/button/button.svelte";
   import { Input } from "$lib/components/ui/input/index.ts";
   import { Label } from "$lib/components/ui/label/index.ts";
    import CardContent from "./ui/card/card-content.svelte";

   export let open = false;
</script>

<Sheet.Root bind:open>
   <Sheet.Content side="right">
     <Sheet.Header>
       <Sheet.Title>Edit profile</Sheet.Title>
       <Sheet.Description>
         Make changes to your profile here. Click save when you're done.
       </Sheet.Description>
     </Sheet.Header>
     <div class="grid gap-4 py-4">
       <div class="grid grid-cols-4 items-center gap-4">
         <Label for="name" class="text-right">Name</Label>
         <Input id="name" value="Pedro Duarte" class="col-span-3" />
       </div>
       <div class="grid grid-cols-4 items-center gap-4">
         <Label for="username" class="text-right">Username</Label>
         <Input id="username" value="@peduarte" class="col-span-3" />
       </div>
     </div>
     <Sheet.Footer>
       <Sheet.Close asChild let:builder>
         <Button builders={[builder]} type="submit">Save changes</Button>
       </Sheet.Close>
     </Sheet.Footer>
   </Sheet.Content>
 </Sheet.Root>