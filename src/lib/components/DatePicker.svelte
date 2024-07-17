<script lang="ts">
   import {
     type DateValue,
     DateFormatter,
     getLocalTimeZone,
   } from "@internationalized/date";
   import { cn } from "$lib/utils.js";
   import { Button } from "$lib/components/ui/button";
   import { Calendar } from "$lib/components/ui/calendar";
   import * as Popover from "$lib/components/ui/popover";
  
   const df = new DateFormatter("pt-BR", {
     dateStyle: "short",
   });
  
   let open = false;
   let value: DateValue | undefined = undefined;
 </script>
  
 <Popover.Root bind:open openFocus>
   <Popover.Trigger asChild let:builder>
     	<Button
			variant="outline"
			class={cn("justify-start text-left font-normal", !value && "text-muted-foreground")}
			builders={[builder]}
		>
			<i class="ti ti-calendar-search text-xl mr-2"></i>
			{value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
     	</Button>
   </Popover.Trigger>
   <Popover.Content class="w-auto p-0">
     	<Calendar onValueChange={() => open = false} bind:value initialFocus />
   </Popover.Content>
 </Popover.Root>