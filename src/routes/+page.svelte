<script>
	import {
		products,
		categories,
		getAllProducts,
		getProductsByCat
	} from '../stores/productsStore.js';

	// filtered is subscribed to the $products store
	// this copy of $products is used as $products cannot be sorted like an ordinary array.
	// initially filtered is a copy of products (from the store)
	$: filtered = $products;

	// Object to store sort directions
	const table_sort = {
		id: false,
		product_name: false,
		product_description: false,
		product_stock: false,
		product_price: false
	};

	// Sort alpha values in a givren column (default to product_name)
	const sortAlpha = (col = 'product_name') => {
		// reverse current sort direction for this col
		// i.e. reverse the current order
		table_sort[col] = !table_sort[col];

		// output to the  browser console
		console.log(`${col} : ${table_sort[col]}`);

		// sort the products array based on column selected
		// sort takes a function parameter to indicate which column should be sorted (e.g. product_name)
		filtered = filtered.sort((a, b) => {
			// sort asc
			if (table_sort[col] === true) {
				return a[col].toLowerCase() < b[col].toLowerCase();
				// sort desc
			} else {
				return a[col].toLowerCase() > b[col].toLowerCase();
			}
		});
	};

	// sort numeric values in a given column (default to product_price)
	const sortNumeric = (col = 'product_price') => {
		// reverse current sort direction for this col
		table_sort[col] = !table_sort[col];

		// check browser console for output
		// sort takes a function parameter to indicate which column should be sorted (e.g. product_price)
		console.log(`${col} : ${table_sort[col]}`);

		// sort the products array based on column selected
		filtered = filtered.sort((a, b) => {
			if (table_sort[col] === true) {
				return a[col] - b[col];
			} else {
				return b[col] - a[col];
			}
		});
	};

	const deleteProduct = (id = 0) => {

	}

</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Products List</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="categoryList" class="list-group">
				<!-- placeholders - replace with real category links -->
				<button
					on:click={() => getAllProducts()}
					class="category-link list-group-item list-group-item-action"
				>
					All Products
				</button>
				{#each $categories as cat}
					<button
						on:click={() => getProductsByCat(cat.id)}
						class="category-link list-group-item list-group-item-action"
					>
						{cat.category_name}
					</button>
				{/each}
			</div>
		</div>
		<!-- End category col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->
			<div id="products">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><a on:click={() => sortNumeric('id')} href="/">id</a></th>
							<th><a on:click={() => sortAlpha('product_name')} href="/">name</a></th>
							<th><a on:click={() => sortAlpha('product_description')} href="/">description</a></th>
							<th><a on:click={() => sortNumeric('product_stock')} href="/">stock</a></th>
							<th><a on:click={() => sortNumeric('product_price')} href="/">price</a></th>
						</tr>
					</thead>
					<tbody id="productRows">
						<!-- Product Rows to be inserted here -->
						{#each filtered as product}
							<tr>
								<td>{product.id}</td>
								<td>{product.product_name}</td>
								<td>{product.product_description}</td>
								<td>{product.product_stock}</td>
								<td class="price">&euro;{Number(product.product_price).toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<!-- Add product button goes here -->
			<a id="AddProductButton" class="btn btn-primary" href="/addproduct" role="button"
				>New Product</a
			>
		</div>
		<!-- End Product col -->
	</div>
	<!-- End Row -->
</div>
<!-- End Main Content-->
