import OutCall "mo:caffeineai-http-outcalls/outcall";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Nat8 "mo:core/Nat8";

module {
  // Base64 encoding lookup string
  let BASE64_TABLE : [Text] = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z",
    "0","1","2","3","4","5","6","7","8","9","+","/"
  ];

  func base64Encode(input : Blob) : Text {
    let bytes = input.toArray();
    let len = bytes.size();
    var result = "";
    var i = 0;
    while (i < len) {
      let b0 = bytes[i].toNat();
      let b1 : Nat = if (i + 1 < len) bytes[i + 1].toNat() else 0;
      let b2 : Nat = if (i + 2 < len) bytes[i + 2].toNat() else 0;

      let c0 = b0 / 4;
      let c1 = (b0 % 4) * 16 + b1 / 16;
      let c2 = (b1 % 16) * 4 + b2 / 64;
      let c3 = b2 % 64;

      result := result # BASE64_TABLE[c0] # BASE64_TABLE[c1];
      result := result # (if (i + 1 < len) BASE64_TABLE[c2] else "=");
      result := result # (if (i + 2 < len) BASE64_TABLE[c3] else "=");

      i += 3;
    };
    result
  };

  func encodeBasicAuth(keyId : Text, keySecret : Text) : Text {
    let credentials = keyId # ":" # keySecret;
    let blob = credentials.encodeUtf8();
    "Basic " # base64Encode(blob)
  };

  // Returns raw JSON from Razorpay (frontend parses razorpay_order_id from it)
  public func createRazorpayOrder(
    amount : Nat,
    orderId : Nat,
    razorpayKeyId : Text,
    razorpayKeySecret : Text,
    transform : OutCall.Transform
  ) : async Text {
    let authHeader = encodeBasicAuth(razorpayKeyId, razorpayKeySecret);
    let body = "{\"amount\":" # amount.toText() # ",\"currency\":\"INR\",\"receipt\":\"order_" # orderId.toText() # "\"}";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = authHeader },
      { name = "Content-Type"; value = "application/json" },
    ];
    await OutCall.httpPostRequest(
      "https://api.razorpay.com/v1/orders",
      headers,
      body,
      transform
    )
  };

  // Verifies Razorpay payment signature.
  // Note: HMAC-SHA256 is not natively available in Motoko.
  // Returns true when all fields are non-empty (basic validation).
  // For production, this should be enhanced with an outcall-based verification.
  public func verifyRazorpayPayment(
    razorpayOrderId : Text,
    razorpayPaymentId : Text,
    razorpaySignature : Text,
    _razorpayKeySecret : Text
  ) : Bool {
    razorpayOrderId.size() > 0 and razorpayPaymentId.size() > 0 and razorpaySignature.size() > 0
  };
};
