<script>
	import * as Sheet from "$lib/components/ui/sheet/index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import CardContent from "./ui/card/card-content.svelte";
	import * as v from 'valibot';

	export let open = false;

	let title = '';
	let kind = 'income';

	let titleIssue;

	const newTransactionSchema = v.object({
		title: v.pipe(v.maxLength(250, 'The maximum length allowed is 250'))
	});

	function extractIssue(issues, key) {
		return issues
			.filter(issue => issue.issueKeys.includes(key))
			?.map(v => v.message)
			.reduce((a,b) => `${a} ${b}`);
	}

	function submitNewTransaction() {
		const result = v.safeParse(newTransactionSchema, {
			title
		});

		if (!result.success) {
			const issues = result.issues.map(issue => ({
				issueKeys: issue.path.map(issuePath => issuePath.key),
				message: issue.message
			}));
			// console.log('[ERROR]', issues);
			titleIssue = extractIssue(issues, 'title');
			console.log('TITLE ISSUE', titleIssue);
		}
	}
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
	<Sheet.Content class="min-w-[60rem]" side="right">
		<Sheet.Header>
			<Sheet.Title class="text-xl">New Transaction</Sheet.Title>
		</Sheet.Header>

		<div class="flex flex-col mt-6 gap-y-4">
			<div>
				<Label class="text-base">Title</Label>
				<Input class="mt-1 text-base" id="name" placeholder="Milk from the store" bind:value={title} />
			</div>

			<div class="flex flex-col">
				<Label class="text-base" for="r2">Transaction Kind</Label>

				<div class="flex flex-row mt-1 *:flex *:flex-row *:items-center *:gap-x-3 gap-x-2">
					<Button variant="ghost" on:click={() => kind = 'income'} class="px-3 py-1 rounded-md transition-all *:cursor-pointer cursor-pointer">
						<i data-kind={kind} class="ti ti-square-arrow-up-filled text-xl transition-all text-stone-500 data-[kind=income]:text-green-500"></i>
						<Label class="text-base" for="r1">Income</Label>
					</Button>
	
					<Button variant="ghost" on:click={() => kind = 'outcome'} class="px-3 py-1 rounded-md transition-all *:cursor-pointer cursor-pointer">
						<i data-kind={kind} class="ti ti-square-arrow-up-filled text-xl transition-all text-stone-500 data-[kind=outcome]:text-red-500"></i>
						<Label class="text-base" for="r2">Outcome</Label>
					</Button>
				</div>
			</div>
		</div>

		<!-- <div class="grid grid-cols-[min-content_auto] auto-rows-min gap-4 py-4">
			<div class="grid grid-cols-subgrid col-span-full">
				<Label for="name" class="text-left">Name</Label>
				<Input id="name" value="Pedro Duarte" />
			</div>
			<div class="grid grid-cols-subgrid col-span-full">
				<Label for="username" class="text-left">Username</Label>
				<Input id="username" value="@peduarte" />
			</div>
		</div> -->

		<Sheet.Footer>
			<Button class="mt-3" on:click={submitNewTransaction}>
				<i class="ti ti-plus text-xl mr-2"></i>
				New transaction
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
