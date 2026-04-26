import Map "mo:core/Map";
import OrderLib "../lib/order";
import OrderTypes "../types/order";

mixin (
  orders : Map.Map<Nat, OrderTypes.Order>,
  nextOrderId : { var value : Nat }
) {
  // Public: create a new order, returns orderId
  public shared func createOrder(input : OrderTypes.OrderInput) : async Nat {
    let (order, newId) = OrderLib.createOrder(orders, nextOrderId.value, input);
    nextOrderId.value := newId;
    order.id
  };

  // Public: update payment status after Razorpay callback
  public shared func updateOrderPaymentStatus(
    orderId : Nat,
    status : OrderTypes.PaymentStatus,
    razorpayPaymentId : ?Text
  ) : async ?OrderTypes.Order {
    OrderLib.updateOrderPaymentStatus(orders, orderId, status, razorpayPaymentId)
  };

  // Admin: update order status (processing/shipped/etc.)
  public shared func updateOrderStatus(
    orderId : Nat,
    status : OrderTypes.OrderStatus
  ) : async ?OrderTypes.Order {
    OrderLib.updateOrderStatus(orders, orderId, status)
  };

  // Admin: mark order as delivered, records timestamp
  public shared func markDelivered(orderId : Nat) : async ?OrderTypes.Order {
    OrderLib.markDelivered(orders, orderId)
  };

  // Admin: mark cashback as given (requires 7 days since delivery)
  public shared func markCashbackGiven(orderId : Nat) : async ?OrderTypes.Order {
    OrderLib.markCashbackGiven(orders, orderId)
  };

  // Public: get a single order
  public query func getOrder(orderId : Nat) : async ?OrderTypes.Order {
    OrderLib.getOrder(orders, orderId)
  };

  // Admin: list all orders
  public query func listOrders() : async [OrderTypes.Order] {
    OrderLib.listOrders(orders)
  };

  // Admin: total order count
  public query func getTotalOrders() : async Nat {
    OrderLib.totalOrders(orders)
  };
};
