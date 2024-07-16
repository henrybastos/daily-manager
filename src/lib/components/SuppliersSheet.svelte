<script>
	import * as Sheet from "$lib/components/ui/sheet/index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.ts";
	import { Label } from "$lib/components/ui/label/index.ts";
	import CardContent from "./ui/card/card-content.svelte";
	import * as v from 'valibot';

	export let open = false;

	let name = '';
	let kind = 'income';

	let nameIssue;

	const newSupplierSchema = v.object({
		name: v.pipe(v.maxLength(60, 'The maximum length allowed is 60'), v.minLength(2, 'Name cannot be empty'))
	});

	function extractIssue(issues, key) {
		return issues
			.filter(issue => issue.issueKeys.includes(key))
			?.map(v => v.message)
			.reduce((a,b) => `${a} ${b}`);
	}

	function addNewSupplier() {
		const result = v.safeParse(newSupplierSchema, {
			name
		});

      console.log('wtf??', result);

		if (!result.success) {
			const issues = result.issues.map(issue => ({
				issueKeys: issue.path.map(issuePath => issuePath.key),
				message: issue.message
			}));

			nameIssue = extractIssue(issues, 'name');
			console.log('NAME ISSUE', nameIssue);
		}
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Content class="min-w-[60rem]" side="right">
		<Sheet.Header>
			<Sheet.Title class="text-xl">Suppliers</Sheet.Title>
         <Sheet.Description class="text-base">Any company/individual that supplies some kind of service or product.</Sheet.Description>
		</Sheet.Header>

		<div class="flex flex-col mt-6 gap-y-4">
			<div>
				<Label class="text-base" for="name">Name</Label>
				<Input class="mt-1 text-base" id="name" placeholder="McDonalds" bind:value={name} />
            <Button variant="outline" class="mt-3" on:click={addNewSupplier}>New supplier</Button>
			</div>
		</div>

		<Sheet.Footer>
			
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
