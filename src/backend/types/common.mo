module {
  public type Timestamp = Int;
  public type OrderId = Nat;
  public type ProductId = Nat;

  public type Result<T, E> = { #ok : T; #err : E };
};
