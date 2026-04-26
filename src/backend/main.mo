import Map "mo:core/Map";
import ProductTypes "types/product";
import OrderTypes "types/order";
import ProductApiMixin "mixins/product-api";
import OrderApiMixin "mixins/order-api";
import AdminApiMixin "mixins/admin-api";
import PaymentApiMixin "mixins/payment-api";

actor {
  // Product state
  let products = Map.empty<Nat, ProductTypes.Product>();
  let nextProductId = { var value : Nat = 1 };

  // Order state
  let orders = Map.empty<Nat, OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 1 };

  // Admin session state (token -> expiry timestamp)
  let sessions = Map.empty<Text, Int>();

  // Counter used as token seed for uniqueness
  let loginCounter = { var value : Nat = 0 };

  // Admin credentials stored in canister (never exposed to frontend)
  let adminUsername = "salman";
  let adminPassword = "rs@6119";

  // Razorpay credentials (stored canister-private)
  let razorpayKeyId = "rzp_test_placeholder";
  let razorpayKeySecret = "placeholder_secret";

  include ProductApiMixin(products, nextProductId);
  include OrderApiMixin(orders, nextOrderId);
  include AdminApiMixin(sessions, adminUsername, adminPassword, loginCounter);
  include PaymentApiMixin(razorpayKeyId, razorpayKeySecret);
};
