import Map "mo:core/Map";
import ProductLib "../lib/product";
import ProductTypes "../types/product";

mixin (
  products : Map.Map<Nat, ProductTypes.Product>,
  nextProductId : { var value : Nat }
) {
  // Admin: add a new product
  public shared func addProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    let (product, newId) = ProductLib.addProduct(products, nextProductId.value, input);
    nextProductId.value := newId;
    product
  };

  // Admin: update an existing product
  public shared func updateProduct(id : Nat, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    ProductLib.updateProduct(products, id, input)
  };

  // Admin: delete a product
  public shared func deleteProduct(id : Nat) : async Bool {
    ProductLib.deleteProduct(products, id)
  };

  // Public: get a single product
  public query func getProduct(id : Nat) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id)
  };

  // Public: list all products
  public query func listProducts() : async [ProductTypes.Product] {
    ProductLib.listProducts(products)
  };

  // Admin: total product count
  public query func getTotalProducts() : async Nat {
    products.size()
  };
};
