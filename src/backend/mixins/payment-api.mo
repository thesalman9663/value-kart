import OutCall "mo:caffeineai-http-outcalls/outcall";
import PaymentLib "../lib/payment";

mixin (
  razorpayKeyId : Text,
  razorpayKeySecret : Text
) {
  // Transform callback required by IC HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

  // Create a Razorpay order via HTTP outcall, returns raw JSON response (frontend parses razorpay_order_id)
  public shared func createRazorpayOrder(amount : Nat, orderId : Nat) : async Text {
    await PaymentLib.createRazorpayOrder(amount, orderId, razorpayKeyId, razorpayKeySecret, transform)
  };

  // Verify Razorpay payment signature, returns true if valid
  public shared func verifyRazorpayPayment(
    razorpayOrderId : Text,
    razorpayPaymentId : Text,
    razorpaySignature : Text
  ) : async Bool {
    PaymentLib.verifyRazorpayPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature, razorpayKeySecret)
  };
};
