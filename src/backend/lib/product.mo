import Map "mo:core/Map";
import Time "mo:core/Time";
import ProductTypes "../types/product";

module {
  public type ProductMap = Map.Map<Nat, ProductTypes.Product>;

  public func addProduct(
    products : ProductMap,
    nextId : Nat,
    input : ProductTypes.ProductInput
  ) : (ProductTypes.Product, Nat) {
    let product : ProductTypes.Product = {
      id = nextId;
      name = input.name;
      imageUrl = input.imageUrl;
      sizes = input.sizes;
      colors = input.colors;
      price = input.price;
      commission = input.commission;
      description = input.description;
      category = input.category;
      createdAt = Time.now();
    };
    products.add(nextId, product);
    (product, nextId + 1)
  };

  public func updateProduct(
    products : ProductMap,
    id : Nat,
    input : ProductTypes.ProductInput
  ) : ?ProductTypes.Product {
    switch (products.get(id)) {
      case null null;
      case (?existing) {
        let updated : ProductTypes.Product = {
          existing with
          name = input.name;
          imageUrl = input.imageUrl;
          sizes = input.sizes;
          colors = input.colors;
          price = input.price;
          commission = input.commission;
          description = input.description;
          category = input.category;
        };
        products.add(id, updated);
        ?updated
      };
    }
  };

  public func deleteProduct(products : ProductMap, id : Nat) : Bool {
    switch (products.get(id)) {
      case null false;
      case (?_) {
        products.remove(id);
        true
      };
    }
  };

  public func getProduct(products : ProductMap, id : Nat) : ?ProductTypes.Product {
    products.get(id)
  };

  public func listProducts(products : ProductMap) : [ProductTypes.Product] {
    let all = products.values().toArray();
    all.sort(func(a, b) = if (a.createdAt > b.createdAt) #less else if (a.createdAt < b.createdAt) #greater else #equal)
  };
};
