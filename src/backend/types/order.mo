import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  public type PaymentMethod = { #UPI; #COD };
  public type PaymentStatus = { #pending; #completed; #failed };
  public type OrderStatus = { #placed; #processing; #shipped; #delivered };
  public type CashbackStatus = { #pending; #given };

  public type Order = {
    id : OrderId;
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    customerEmail : ?Text;
    productId : ProductId;
    productName : Text;
    productPrice : Nat;
    productSize : Text;
    productColor : Text;
    quantity : Nat;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    orderStatus : OrderStatus;
    cashbackStatus : CashbackStatus;
    deliveryTimestamp : ?Timestamp;
    cashbackTimestamp : ?Timestamp;
    createdAt : Timestamp;
    razorpayOrderId : ?Text;
    razorpayPaymentId : ?Text;
  };

  public type OrderInput = {
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    customerEmail : ?Text;
    productId : ProductId;
    productName : Text;
    productPrice : Nat;
    productSize : Text;
    productColor : Text;
    quantity : Nat;
    paymentMethod : PaymentMethod;
    razorpayOrderId : ?Text;
  };
};
