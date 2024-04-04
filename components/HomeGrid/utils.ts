export function getProductsForRow(products: any[], productsForRow: number) {
  return products.reduce((acc, product, i) => {
    if (i % productsForRow === 0) {
      acc.push(products.slice(i, i + productsForRow));
    }
    return acc;
  }, []);
}
