<script>
  import { page } from '$app/stores';

  // Sveltekit form enhancements
  import { enhance, applyAction } from '$app/forms';

  // Import the store etc.
  import { categories, getAllCategories } from '../../../stores/productsStore';

  // Access data returned from +page.server.js
  // @ts-ignore
  export let data;
  // Access data returned from +page.server.js
  // @ts-ignore
  export let form;

  // Update list of categories (used in form)
  getAllCategories();

const { product } = data;

</script>

<h1>Params</h1>
<h3>Update Product: {$page.params.id}</h3>
<h3>Product name: {product.product_name}</h3>

