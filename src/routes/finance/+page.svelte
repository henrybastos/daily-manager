<script>
	import SuppliersSheet from "$lib/components/SuppliersSheet.svelte";
	import TransactionSheet from "$lib/components/TransactionSheet.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { onMount } from "svelte";
	import { MONTHS_STR } from "$lib";

	/** Sheet open states */
	let transactionSheetOpenState = false;
	let suppliersSheetOpenState = false;

	let openExistingTransaction;

	const MOCK_TRANSACTIONS = [
		{
			kind: "outcome",
			amount: 280,
			title: "Black sweater",
			description: "",
			supplier: "Zara",
			creationDate: "2024/07/08",
			referenceDate: "2024/08",
			source: "Santander",
			recurrent: {
					recurrencyID: "02118234",
					from: "2024/08",
					to: "2024/09",
			},
			adjusted: false,
		},
		{
			kind: "income",
			amount: 850.9,
			title: "Salary",
			description: "",
			supplier: "Company",
			creationDate: "2024/07/08",
			referenceDate: "2024/07",
			source: "Nubank",
			recurrent: {
					recurrencyID: "59915883",
					from: "2023/08",
			},
			adjusted: true,
		},
		{
			kind: "outcome",
			amount: 300.25,
			title: "Flight",
			description: "",
			supplier: "Azul Airlines",
			creationDate: "2024/07/08",
			referenceDate: "2024/08",
			source: "Santander",
			recurrent: {
					recurrencyID: "65298152",
					from: "2024/04",
					to: "2024/08",
			},
			adjusted: false,
		},
	];

	// let transactions = MOCK_TRANSACTIONS;
	let transactions = [];

	let BOTTOM_BAR_INFO = [];

	function openTransactionSheet() {
		transactionSheetOpenState = true;
	}

	function openSuppliersSheet() {
		suppliersSheetOpenState = true;
	}

	onMount(async () => {
		const response = await fetch("/api/database/transactions");
		const data = await response.json();
		transactions = data.transactions;

		console.log(transactions);
		if (transactions) {
			let incomeTransactions = transactions.filter(
					(v) => v.kind === "income",
			);
			if (incomeTransactions.length > 0) {
					incomeTransactions = incomeTransactions
						.map((v) => v.amount)
						.reduce((a, b) => a + b);
			}

			let outcomeTransactions = transactions.filter(
					(v) => v.kind === "outcome",
			);

			if (outcomeTransactions.length > 0) {
					outcomeTransactions = outcomeTransactions
						.map((v) => v.amount)
						.reduce((a, b) => a + b);
			}

			BOTTOM_BAR_INFO = [
					{
						icon: "switch-vertical",
						label: "Transactions",
						data: transactions.length,
					},
					{
						icon: "coins",
						label: "Balance",
						data: new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "BRL",
						}).format(incomeTransactions - outcomeTransactions),
					},
			];
		}
	});
</script>

<section class="flex flex-col p-3 bg-stone-800 rounded-md h-full w-full justify-between gap-y-2">
	<div>
		<Button
			on:click={openTransactionSheet}
			class="hover:bg-stone-900"
			variant="ghost"
		>
			<i class="ti ti-plus text-xl mr-3"></i>
			New transaction
		</Button>

		<Button
			on:click={openSuppliersSheet}
			class="hover:bg-stone-900"
			variant="ghost"
		>
			<i class="ti ti-users text-xl mr-3"></i>
			Suppliers
		</Button>
	</div>

	<h1 class="text-3xl font-semibold px-3">Transactions</h1>

	<div class="grid grid-cols-[min-content_min-content_min-content_auto_min-content_min-content_min-content] auto-rows-min gap-x-3 w-full h-full p-3">

		<div class="grid grid-cols-subgrid col-span-full mb-3 *:whitespace-nowrap">
			<span>Kind</span>
			<span>Supplier</span>
			<span>Title</span>
			<span>Description</span>
			<span>Source/Destination</span>
			<span>Month</span>
			<span>Amount</span>
		</div>

		<div class="p-1 border border-stone-700 rounded-md grid grid-cols-subgrid col-span-full">
			{#each transactions as transaction}
					<Button on:click={() => openExistingTransaction(transaction)} variant="ghost" class="group grid grid-cols-subgrid grid-rows-1 col-span-full hover:bg-stone-700/50 items-center *:leading-none *:whitespace-nowrap *:text-left" data-transaction-kind={transaction.kind}>
						{#if transaction.kind == "outcome"}
							<i class="ti ti-square-arrow-down-filled text-xl group-data-[transaction-kind=outcome]:text-red-500"></i>
						{:else}
							<i class="ti ti-square-arrow-up-filled text-xl group-data-[transaction-kind=income]:text-green-500"></i>
						{/if}

						<span class="text-stone-500 font-medium">
							{transaction.supplier}
						</span>

						<span>{transaction.title}</span>
						<span>{transaction.description}</span>
						<span class="border border-stone-600 text-stone-500 rounded-md px-2 py-1 w-min text-sm font-medium">
							{transaction.source}
						</span>
						<span>
							{MONTHS_STR[new Date(transaction.referenceDate).getMonth()]}
						</span>
						<span>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "BRL",
							}).format(transaction.amount)}
						</span>
					</Button>
			{/each}
		</div>
	</div>

	<div class="flex flex-row p-3 border border-stone-700 rounded-md divide-x divide-stone-600 *:px-3">
		{#each BOTTOM_BAR_INFO as item}
			<div class="flex flex-row items-center gap-x-3">
					<i class={`ti ti-${item.icon} text-xl text-primary`}></i>
					<span class="text-stone-400">{item.label}:</span>
					<span>{item.data}</span>
			</div>
		{/each}
	</div>
</section>

<TransactionSheet bind:openExistingTransaction bind:open={transactionSheetOpenState} />
<SuppliersSheet bind:open={suppliersSheetOpenState} />