<script>
	import * as Sheet from "$lib/components/ui/sheet/index.ts";
	import * as Select from "$lib/components/ui/select/index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import CardContent from "./ui/card/card-content.svelte";
	import { extractIssue } from "$lib/utils";
	import * as v from 'valibot';
   import DatePicker from "./DatePicker.svelte";
   import { BANKS, MONTHS_STR } from "$lib";

	export let open = false;

	/** Inputs */
	let title = '';
	let supplier = '';
	let kind = 'income';
	let bank = '';
	let month;
	let amount = 0;

	/** Inputs Issues */
	let titleIssue;

	let editTransaction = false;
	let suppliers = [];
	const MONTHS = MONTHS_STR.map((mon, idx) => ({
		label: mon,
		value: idx + 1
	}))

	const newTransactionSchema = v.object({
		title: v.pipe(v.email(), v.endsWith('@example.com'))
	});
	
	function submitNewTransaction() {
		const result = v.safeParse(newTransactionSchema, {
			title
		});

		if (!result.success) {
			titleIssue = extractIssue(result, 'title');
			// console.log('TITLE ISSUE', titleIssue);
		}
	}

	export function openExistingTransaction (data) {
		open = true;
		title = data.title;
		supplier = data.supplier;
		kind = data.kind;

		editTransaction = true;
	}

	async function fetchSuppliers() {
		const response = await fetch('/api/database/suppliers');
		if (response?.status == 200) {
			suppliers = (await response.json())?.suppliers;
			console.log('SUPPLIERS', suppliers);
		} else {
			console.error(response);
		}
	}

	async function onSheetOpen(_) {
		if (open) {
			await fetchSuppliers();
			document.activeElement.blur();
		} else if (!open && editTransaction == true) {
			title = '';
			supplier = '';
			kind = 'outcome';
			editTransaction = false;
		}
	}

	$: onSheetOpen(open);
</script>

<!-- 
kind: 'outcome',
amount: 280,
title: 'Black sweater',
description: '',
supplier: 'Zara',
creationDate: '2024/07/08',
referenceDate: '2024/08',
source: 'Santander',
recurrent: {
	recurrencyID: '02118234',
	from: '2024/08',
	to: '2024/09'
},
adjusted: false 
-->

<Sheet.Root bind:open>
	<Sheet.Content class="min-w-[30rem]" side="right">
		<Sheet.Header>
			<Sheet.Title class="text-xl">{ editTransaction ? 'Edit transaction' : 'New transaction' }</Sheet.Title>
		</Sheet.Header>

		<div class="flex flex-col mt-6 gap-y-4">
			<div>
				<Label class="text-lg">Title</Label>
				<Input class="mt-1 text-base" id="name" placeholder="Milk from the store" bind:value={title} />
			</div>

			<div class="flex flex-row w-full gap-x-2">
				<div class="flex flex-col grow">
					<Label class="text-lg ">Supplier</Label>
					<Select.Root selected={{ label: supplier, value: supplier }} onSelectedChange={({ value }) => supplier = value}>
						<Select.Trigger value={supplier} class="text-base mt-1">
						  <Select.Value placeholder="Select a supplier" />
						</Select.Trigger>
	
						<Select.Content>
						  <Select.Group>
							 {#each suppliers as sup}
								<Select.Item value={sup.name} label={sup.name}>
									{sup.name}
								</Select.Item>
							 {/each}
						  </Select.Group>
						</Select.Content>
						<Select.Input name="supplier" />
					 </Select.Root>
				</div>
	
				<div class="flex flex-col">
					<Label class="text-lg" for="r2">Transaction Kind</Label>
	
					<div class="flex flex-row mt-1 *:flex *:flex-row *:items-center *:gap-x-2 gap-x-1">
						<Button variant="outline" on:click={() => kind = 'income'} class="px-3 py-1 rounded-md transition-all *:cursor-pointer cursor-pointer">
							<i data-kind={kind} class="ti ti-square-arrow-up-filled text-xl transition-all text-stone-500 data-[kind=income]:text-green-500"></i>
							<Label class="text-base" for="r1">Income</Label>
						</Button>
		
						<Button variant="outline" on:click={() => kind = 'outcome'} class="px-3 py-1 rounded-md transition-all *:cursor-pointer cursor-pointer">
							<i data-kind={kind} class="ti ti-square-arrow-down-filled text-xl transition-all text-stone-500 data-[kind=outcome]:text-red-500"></i>
							<Label class="text-base" for="r2">Outcome</Label>
						</Button>
					</div>
				</div>
			</div>

			<div class="flex flex-row w-full gap-x-2">
				<div class="flex flex-col w-1/2">
					<Label class="text-lg">Ref. month</Label>
					<Select.Root selected={{ label: MONTHS_STR[month - 1], value: month }} onSelectedChange={({ value }) => month = value}>
						<Select.Trigger value={month} class="text-base mt-1">
						  <Select.Value placeholder="Select a supplier" />
						</Select.Trigger>
	
						<Select.Content>
						  <Select.Group>
							 {#each MONTHS as _month}
								<Select.Item value={_month.value} label={_month.label}>
									{_month.label}
								</Select.Item>
							 {/each}
						  </Select.Group>
						</Select.Content>
						<Select.Input name="month" />
					 </Select.Root>
				</div>
	
				<div class="flex flex-col w-1/2">
					<Label class="text-lg ">Banks</Label>
					<Select.Root selected={{ label: bank, value: bank }} onSelectedChange={({ value }) => bank = value}>
						<Select.Trigger value={bank} class="text-base mt-1">
						  <Select.Value placeholder="Select a supplier" />
						</Select.Trigger>
	
						<Select.Content>
						  <Select.Group>
							 {#each BANKS as _bank}
								<Select.Item value={_bank.name} label={_bank.name}>
									{_bank.name}
								</Select.Item>
							 {/each}
						  </Select.Group>
						</Select.Content>
						<Select.Input name="bank" />
					 </Select.Root>
				</div>
			</div>

			<div>
				<Label class="text-lg">Amount</Label>
				<Input class="mt-1 text-base" id="amount" placeholder="R$ 50,00" bind:value={amount} />
			</div>
		</div>

		<Sheet.Footer>
			<Button class="mt-3" on:click={submitNewTransaction}>
				{ editTransaction ? 'Update transaction' : 'New transaction'}
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
