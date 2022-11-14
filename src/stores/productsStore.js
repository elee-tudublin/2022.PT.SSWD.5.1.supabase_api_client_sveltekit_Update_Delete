// import dependencies
import { writable } from 'svelte/store';
import {supabase} from "$lib/supabase.js";

// two writable stores for products and categories
export const products = writable([]);
export const categories = writable([]);

// Function to get all products
// This uses the Supabase client to query the product table
export const getAllProducts = async () => {
        
    const {data, error} = await supabase
        .from('product')
        .select()
        .order('product_name', {ascending: true});

    if(error) {
        return console.error(error);
    }

    // @ts-ignore
    products.set(data);
}

// Function to get all categories
// This uses the Supabase client to query the category table
export const getAllCategories= async () => {
        
    const {data, error} = await supabase
        .from('category')
        .select()
        .order('category_name', {ascending: true});

    if(error) {
        return console.error(error);
    }

    // @ts-ignore
    categories.set(data);
}

// Get products by category id
export const getProductsByCat = async (cat_id = 0) => {

    if (cat_id > 0) {

        const {data, error} = await supabase
            .from('product')
            .select()
            .eq('category_id', cat_id)
            .order('product_name', {ascending: true});

        if(error) {
            return console.error(error);
        }
    
        // @ts-ignore
        products.set(data);

        
    } else {
        getAllProducts();
    }
}

// Function to call Supabase and insert a row
// @ts-ignore
export const addNewProduct = async (new_product) => {
    const { data, error } = await supabase
    .from('product')
    .insert([
        { category_id: Number(new_product?.category_id), 
          product_name: new_product?.product_name,
          product_description: new_product?.product_description,
          product_stock: Number(new_product?.product_stock),
          product_price: Number(new_product?.product_price)
         },
    ])
    // Select the newly inserted product (so that it can be returned)
    .select();
    
    if(error) {
        return console.error(error);
    }

    // return inserted product
    return data;
}

// initialise the store
// getAllProducts();
// getAllCategories();
