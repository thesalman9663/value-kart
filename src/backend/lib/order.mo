import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/order";

module {
  public type OrderMap = Map.Map<Nat, OrderTypes.Order>;

  // 7 days in nanoseconds
  let SEVEN_DAYS_NS : Int = 604_800_000_000_000;

  public func createOrder(
    orders : OrderMap,
    nextId : Nat,
    input : OrderTypes.OrderInput
  ) : (OrderTypes.Order, Nat) {
    let order : OrderTypes.Order = {
      id = nextId;
      customerName = input.customerName;
      customerPhone = input.customerPhone;
      customerAddress = input.customerAddress;
      customerEmail = input.customerEmail;
      productId = input.productId;
      productName = input.productName;
      productPrice = input.productPrice;
      productSize = input.productSize;
      productColor = input.productColor;
      quantity = input.quantity;
      paymentMethod = input.paymentMethod;
      paymentStatus = #pending;
      orderStatus = #placed;
      cashbackStatus = #pending;
      deliveryTimestamp = null;
      cashbackTimestamp = null;
      createdAt = Time.now();
      razorpayOrderId = input.razorpayOrderId;
      razorpayPaymentId = null;
    };
    orders.add(nextId, order);
    (order, nextId + 1)
  };

  public func updateOrderPaymentStatus(
    orders : OrderMap,
    orderId : Nat,
    status : OrderTypes.PaymentStatus,
    razorpayPaymentId : ?Text
  ) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?existing) {
        let updated : OrderTypes.Order = {
          existing with
          paymentStatus = status;
          razorpayPaymentId = razorpayPaymentId;
        };
        orders.add(orderId, updated);
        ?updated
      };
    }
  };

  public func updateOrderStatus(
    orders : OrderMap,
    orderId : Nat,
    status : OrderTypes.OrderStatus
  ) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?existing) {
        let updated : OrderTypes.Order = { existing with orderStatus = status };
        orders.add(orderId, updated);
        ?updated
      };
    }
  };

  public func markDelivered(orders : OrderMap, orderId : Nat) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?existing) {
        let updated : OrderTypes.Order = {
          existing with
          orderStatus = #delivered;
          deliveryTimestamp = ?Time.now();
        };
        orders.add(orderId, updated);
        ?updated
      };
    }
  };

  public func markCashbackGiven(orders : OrderMap, orderId : Nat) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null null;
      case (?existing) {
        switch (existing.deliveryTimestamp) {
          case null null; // not delivered yet
          case (?deliveredAt) {
            let now = Time.now();
            if (now - deliveredAt < SEVEN_DAYS_NS) {
              null // not eligible yet
            } else {
              let updated : OrderTypes.Order = {
                existing with
                cashbackStatus = #given;
                cashbackTimestamp = ?now;
              };
              orders.add(orderId, updated);
              ?updated
            };
          };
        }
      };
    }
  };

  public func getOrder(orders : OrderMap, orderId : Nat) : ?OrderTypes.Order {
    orders.get(orderId)
  };

  public func listOrders(orders : OrderMap) : [OrderTypes.Order] {
    let all = orders.values().toArray();
    all.sort(func(a, b) = if (a.createdAt > b.createdAt) #less else if (a.createdAt < b.createdAt) #greater else #equal)
  };

  public func totalOrders(orders : OrderMap) : Nat {
    orders.size()
  };
};
