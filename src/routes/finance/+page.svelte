<script>
       import TransactionSheet from "$lib/components/TransactionSheet.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    let transactionSheetOpenState = false;

    const MOCK_TRANSACTIONS = [
        {
            kind: 'outcome',
            amount: 279,
            title: 'Suéter preto',
            description: '',
            supplier: 'Zara',
            creationDate: '2024/07/08',
            referenceDate: '2024/05',
            source: 'Santander',
            recurrent: false,
            adjusted: false
        },
        {
            kind: 'income',
            amount: 816.54,
            title: 'Salário',
            description: '',
            supplier: 'Kebook',
            creationDate: '2024/07/08',
            referenceDate: '2024/07',
            source: 'Nubank',
            recurrent: {
                recurrencyID: '59915883',
                from: '2024/04'
            },
            adjusted: true
        },
        {
            kind: 'outcome',
            amount: 303.59,
            title: 'Passagem aérea',
            description: '',
            supplier: 'GOL',
            creationDate: '2024/07/08',
            referenceDate: '2024/07',
            source: 'Santander',
            recurrent: {
                recurrencyID: '65298152',
                from: '2024/04',
                to: '2024/08',
            },
            adjusted: false
        }
    ];

    const BOTTOM_BAR_INFO = [
        {
            icon: 'switch-vertical',
            label: 'Transactions',
            data: MOCK_TRANSACTIONS.length
        },
        {
            icon: 'coins',
            label: 'Balance',
            data: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BRL'})
                .format(MOCK_TRANSACTIONS.filter(v => v.kind === 'income').map(v => v.amount) - MOCK_TRANSACTIONS.filter(v => v.kind === 'outcome').map(v => v.amount))
        }
    ];

    const MONTHS_STR = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    function openTransactionSheet () {
        transactionSheetOpenState = true;
    }
</script>

<section class="flex flex-col p-3 bg-stone-800 rounded-md h-full w-full justify-between gap-y-2">
   <div>
       <Button on:click={openTransactionSheet} class="hover:bg-stone-900" variant="ghost">
           <i class="ti ti-plus text-xl mr-3"></i>
           New transaction
       </Button>
   </div>

   <h1 class="text-3xl font-semibold">Transactions</h1>

   <div class="grid grid-cols-[min-content_min-content_min-content_auto_min-content_min-content_min-content] auto-rows-min gap-x-3 w-full h-full">

       <div class="grid grid-cols-subgrid col-span-full my-3 *:whitespace-nowrap">
           <span>Kind</span>
           <span>Supplier</span>
           <span>Title</span>
           <span>Description</span>
           <span>Source/Destination</span>
           <span>Month</span>
           <span>Amount</span>
       </div>

       <div class="p-3 border border-stone-700 rounded-md grid grid-cols-subgrid col-span-full gap-y-2">
           {#each MOCK_TRANSACTIONS as transaction}    
               <div class="group grid grid-cols-subgrid grid-rows-1 col-span-full items-center *:leading-none" data-transaction-kind={transaction.kind}>
                   <i class="ti ti-square-arrow-up-filled text-xl group-data-[transaction-kind=income]:text-green-500 group-data-[transaction-kind=outcome]:text-red-500"></i>
                   <span class="text-stone-500 font-medium">{ transaction.supplier }</span>
                   <span class="whitespace-nowrap">{ transaction.title }</span>
                   <span class="whitespace-nowrap">{ transaction.description }</span>
                   <span class="border border-stone-600 text-stone-500 rounded-md px-2 py-1 w-min text-sm font-medium">{ transaction.source }</span>
                   <span class="whitespace-nowrap">{ MONTHS_STR[new Date(transaction.referenceDate).getMonth()] }</span>
                   <span>{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BRL'}).format(transaction.amount) }</span>
               </div>
           {/each}
       </div>
   </div>

   <div class="flex flex-row p-3 border border-stone-700 rounded-md divide-x divide-stone-600 *:px-3">
       {#each BOTTOM_BAR_INFO as item}    
           <div class="flex flex-row items-center gap-x-3">
               <i class={`ti ti-${ item.icon } text-xl text-primary`}></i>
               <span class="text-stone-400">{ item.label }:</span>
               <span>{ item.data }</span>
           </div>
       {/each}
   </div>
</section>

<TransactionSheet bind:open={transactionSheetOpenState} />