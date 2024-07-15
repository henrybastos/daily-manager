<script>
	import * as Sheet from "$lib/components/ui/sheet/index.ts";
	import * as RadioGroup from "$lib/components/ui/radio-group/index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import * as v from 'valibot';
	import { invoke } from "@tauri-apps/api/tauri";

	export let open = false;
	export let data;

	let title = '';
	let kind = 'income';

	let titleIssue;

	const newTransacSchema = v.object({
		title: v.pipe(v.string('The title must be a text'))
	});

	function extractIssue(issues, key) {
		return issues
			.filter(issue => issue.issueKeys.includes(key))
			?.map(v => v.message)
			.reduce((a,b) => `${a} ${b}`);
	}

	async function submitNewTransaction() {
		const result = v.safeParse(newTransacSchema, {
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
		} else {
			console.log('Creating database...');
			console.log('INVOKE', await invoke('create_database'));
		}
	}

	function resetFields(v) {
		if (!v) {
			title = '';
			kind = 'income';
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

<Sheet.Root onOpenChange={resetFields} bind:open>
	<Sheet.Content class="min-w-[46rem] bg-stone-900" side="right">
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>

		<div class="flex flex-col mt-6 gap-y-4">
			<div>
				<Label class="text-base">Title</Label>
				<Input class="mt-1 text-base" id="name" placeholder="Milk from the store" bind:value={title} />
			</div>

			<div>
				<Label class="text-base">Description</Label>
				<Textarea rows="3" class="mt-1 text-base resize-none" placeholder="Some description"/>
			</div>

			<div class="flex flex-col">
				<Label class="text-base" for="r2">Transaction Kind</Label>

				<div class="flex flex-row mt-1 *:flex *:flex-row *:items-center *:gap-x-3 gap-x-2">
					<Button variant="ghost" on:click={() => kind = 'income'} class="px-3 py-1 hover:bg-stone-800 rounded-md transition-all *:cursor-pointer cursor-pointer">
						<i data-kind={kind} class="ti ti-square-arrow-up-filled text-xl transition-all text-stone-500 data-[kind=income]:text-green-500"></i>
						<Label class="text-base" for="r1">Income</Label>
					</Button>
	
					<Button variant="ghost" on:click={() => kind = 'outcome'} class="px-3 py-1 hover:bg-stone-800 rounded-md transition-all *:cursor-pointer cursor-pointer">
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
			<Button on:click={submitNewTransaction} type="submit">New transaction</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
