// Import sveltekit dependencies
// @ts-ignore
import { invalid, redirect } from "@sveltejs/kit"

// Import addNewProduct function from the product store
import {addNewProduct} from '../../stores/productsStore';


// The form action handler(s)
export const actions = {

  // This is where the form sends its data
  // @ts-ignore
  addproduct: async ({request }) => {
    // @ts-ignore
    let success = false;

    // get data from the POST request
    const form_data = await request.formData();

    // read each value
    const product = {
      category_id: Number(form_data.get('category_id')),
      product_name: form_data.get('product_name'),
      product_description: form_data.get('product_description'),
      product_stock: Number(form_data.get('product_stock')),
      product_price: Number(form_data.get('product_price'))
    }

    // Basic validation check
    if (product.category_id > 0 &&
        product.product_name != '' &&
        product.product_description != '' &&
        product.product_stock > 0 &&
        product.product_price > 0
    ) {
        // Add the new product to Supabase
        const result = await addNewProduct(product);
        console.log('add product result: ', result)

      // If validation passed - return the result
      // This is a JS object containing the success state, a message, and a copy of the newly added product (from Supabase)
      return { 
        success: true,
        // The following annotation is to ignore TypeScript Syntax errors detected by ESLint and the Svelte VS Code extensions
        // @ts-ignore
        message: `New product added with id: ${result[0].id}`,
        // @ts-ignore
        product: result[0]
      };
      // If va;idation failed
      // Return a response with Status 400
      // set error state, a message, and return product (a copy of the form data) 
    } else {
      return invalid(400, {
        error: true,
        message: 'validation failed',
        product: product
      })
    }
  }

};
