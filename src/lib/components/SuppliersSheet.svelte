<script>
	import * as Sheet from "$lib/components/ui/sheet/index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import CardContent from "./ui/card/card-content.svelte";
	import { extractIssue } from "$lib/utils";
	import * as v from 'valibot';
   import { onMount } from "svelte";

	export let open = false;

	/** Inputs */
	let name = '';

	/** Inputs Issues */
	let nameIssue;

	let suppliers = [];

	const newSupplierSchema = v.object({
		name: v.pipe(v.maxLength(6, 'The maximum length allowed is 60'), v.email())
	});

	async function addNewSupplier() {
		const result = v.safeParse(newSupplierSchema, {
			
		});

		if (!result.success) {
			nameIssue = extractIssue(result, 'name');
			// console.log('NAME ISSUE', nameIssue);
			return;
		}

		const response = await fetch('/api/database/suppliers', {
			method: 'POST',
			body: JSON.stringify({ name })
		})

		if (response?.status == 200) {
			const data = await response.json();
			console.log(data);
			await fetchSuppliers();
			name = '';
		} else {
			console.error(response);
		}
	}

	async function fetchSuppliers() {
		const response = await fetch('/api/database/suppliers');
		if (response?.status == 200) {
			suppliers = (await response.json())?.suppliers;

			const { transactions } = await (await fetch("/api/database/transactions")).json();

			const transactionsBySupplier = suppliers.map(sup => {
				let amount = transactions.filter(trans => trans.supplier == sup.name);

				if (amount.length > 1) {
					amount = amount.reduce((a, b) => {
						return (a.kind == 'income' ? a.amount : (a.amount * -1)) + (b.kind == 'income' ? b.amount : (b.amount * -1))
					})
				} else if (amount.length == 1) {
					amount = amount[0].amount;
				} else {
					amount = 0;
				}

				return {
					name: sup.name,
					transactions_value: amount
				};
			});

			console.log(transactionsBySupplier);

			console.log('SUPPLIERS', suppliers);
		} else {
			console.error(response);
		}
	}

	async function onSheetOpen(_) {
		if (open) {
			await fetchSuppliers();
		}
	}

	$: onSheetOpen(open);
</script>

<Sheet.Root bind:open>
	<Sheet.Content class="min-w-[30rem]" side="right">
		<Sheet.Header>
			<Sheet.Title class="text-xl">Suppliers</Sheet.Title>
         <Sheet.Description class="text-base">Any company/individual that supplies some kind of service or product.</Sheet.Description>
		</Sheet.Header>

		<div id="suppliers_sheet_content" class="flex flex-col gap-y-3 mt-6">
			<div class="flex flex-col">
				<h3 class="text-lg font-medium mb-1">Add supplier</h3>
	
				<div class="flex flex-col">
					<Label class="text-base" for="name">Name</Label>
					<Input class="mt-1 text-base" id="name" placeholder="McDonalds" bind:value={name} />
					<Button variant="secondary" class="mt-3" on:click={addNewSupplier}>New supplier</Button>
				</div>
			</div>
	
			<div class="mt-3">
				<h3 class="mb-1 text-lg font-medium">Suppliers summary</h3>

				<ul class="grid grid-cols-[min-content_min-content_auto] auto-rows-min border border-stone-800 rounded-md gap-y-1 p-3">
					{#each suppliers as supplier}
						<li class="grid grid-cols-subgrid col-span-full border-b border-transparent hover:border-stone-600">
							<span class="mr-3 text-stone-400">3x</span>
							<span class="font-medium whitespace-nowrap">{ supplier.name }</span>
							<span class="text-right">R$ 350,00</span>
						</li>
					{:else}
						<li class="text-stone-400 whitespace-nowrap text-center col-span-full">
							<i class="ti ti-cactus text-lg"></i>
							<span>No suppliers</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<Sheet.Footer>
			
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
