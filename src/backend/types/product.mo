import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  public type Product = {
    id : ProductId;
    name : Text;
    imageUrl : Text;
    sizes : [Text];
    colors : [Text];
    price : Nat;
    commission : Nat;
    description : Text;
    category : Text;
    createdAt : Timestamp;
  };

  public type ProductInput = {
    name : Text;
    imageUrl : Text;
    sizes : [Text];
    colors : [Text];
    price : Nat;
    commission : Nat;
    description : Text;
    category : Text;
  };
};
