<script>
  import { page } from '$app/stores';
</script>

<h1>Params</h1>
{#if Number($page.params.id) === 0}
  <p>Add new Product</p>
{:else}
<p>Update Product {$page.params.id}</p>
{/if}