import { CardProduct, Product } from '../types';

/**
 * Organizes an array of products into separate groups based on their type ('FIXED' or 'VARIABLE'),
 * and identifies the "best" product in each group based on the lowest bestRate.
 *
 * The function performs the following steps:
 *
 * 1. **Separation by Type:**
 *    - Uses the `filter` method to create two new arrays:
 *      - `fixedProducts`: Contains products with `type === 'FIXED'`.
 *      - `variableProducts`: Contains products with `type === 'VARIABLE'`.
 *
 *    *Note on filter:*
 *    The `filter` method iterates over each element in the array and returns a new array that contains
 *    only the elements that meet a specified condition.
 *
 * 2. **Identifying the "Best" Product:**
 *    - For each product type, it uses the `reduce` method to find the product with the lowest `bestRate`.
 *    - `reduce` is a method that iterates over an array and accumulates a single result (in this case, the "best" product).
 *      - For `bestFixed`, if there are any fixed products, it reduces the `fixedProducts` array by comparing the `bestRate`
 *        of the current best candidate (`prev`) and the current product (`curr`), returning the one with the lower rate.
 *      - The same process is used for `bestVariable` on the `variableProducts` array.
 *    - If no products exist for a given type, the corresponding best product is set to `null`.
 *
 * 3. **Determining the Remaining Products:**
 *    - Once the "best" product is identified, the function creates arrays for the remaining products using `filter`:
 *      - `remainingFixed`: All fixed products except the one identified as `bestFixed`.
 *      - `remainingVariable`: All variable products except the one identified as `bestVariable`.
 *
 * 4. **Return Value:**
 *    - The function returns an object with the following structure:
 *      - `bestFixed`: The best fixed product, or `null` if none.
 *      - `remainingFixed`: An array of fixed products excluding the best one.
 *      - `bestVariable`: The best variable product, or `null` if none.
 *      - `remainingVariable`: An array of variable products excluding the best one.
 *
 *
 * Additionally, the helper includes a second function, `toCardProduct`, which converts a product object into a
 * CardProduct type suitable for display:
 *
 * 1. **toCardProduct Function:**
 *    - Accepts a product object with properties like `id`, `name`, `type`, `bestRate`, and `lenderName`.
 *    - Converts the product's `type` from its internal representation ('FIXED' or 'VARIABLE')
 *      into a more human-readable format ('Fixed' or 'Variable').
 *    - Returns a new object that conforms to the `CardProduct` type.
 *
 * **Key Methods Explained:**
 *
 * - **filter:**
 *   Iterates over an array and returns a new array containing only the elements that satisfy the condition defined
 *   in the callback function. In this code, it's used to separate products by type and to exclude the "best" product from the remaining list.
 *
 * - **reduce:**
 *   Processes an array and returns a single value by repeatedly applying a function to an accumulator and each element
 *   of the array. Here, it's used to compare products and select the one with the lowest `bestRate` from each type.
 */

export interface OrganizedProducts {
  bestFixed: Product | null;
  remainingFixed: Product[];
  bestVariable: Product | null;
  remainingVariable: Product[];
}

export const organizeProducts = (products: Product[]): OrganizedProducts => {
  const fixedProducts = products.filter((p) => p.type === 'FIXED');
  const variableProducts = products.filter((p) => p.type === 'VARIABLE');

  const bestFixed =
    fixedProducts.length > 0
      ? fixedProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  /**
       * 	1.	Initial Value:
	•	Since no initial value is provided to reduce, it automatically uses the first element of the variableProducts array as the initial accumulator (often called prev).
	2.	Iteration and Comparison:
	•	The reduce function then iterates over the array, starting with the second element.
	•	For each iteration, the function compares the bestRate property of the accumulator (prev) and the current element (curr):
	•	If prev.bestRate is lower than curr.bestRate, it returns prev, keeping it as the accumulator.
	•	Otherwise, it returns curr, which then becomes the new accumulator.
	•	This comparison continues for every element in the array.
	3.	Final Result:
	•	After processing all elements, the accumulator holds the product that has the smallest bestRate value among all products in variableProducts.
	•	If variableProducts is empty, the ternary operator returns null.
       */
  const bestVariable =
    variableProducts.length > 0
      ? variableProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  const remainingFixed = bestFixed
    ? fixedProducts.filter((p) => p.id !== bestFixed.id)
    : [];

  const remainingVariable = bestVariable
    ? variableProducts.filter((p) => p.id !== bestVariable.id)
    : [];

  return {
    bestFixed,
    remainingFixed,
    bestVariable,
    remainingVariable,
  };
};

export const toCardProduct = (product: {
  id: number;
  name: string;
  type: 'FIXED' | 'VARIABLE';
  bestRate: number;
  lenderName: string;
}): CardProduct => ({
  id: product.id,
  type: product.type === 'FIXED' ? 'Fixed' : 'Variable',
  name: product.name,
  bestRate: product.bestRate,
  lenderName: product.lenderName,
});
