const WHATSAPP_NUMBER = "919645559663";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderMessage(
  productName: string,
  price: number,
  size?: string,
  color?: string,
): string {
  const lines: string[] = [
    "Hello Value Kart! 🛍️",
    "",
    "I'd like to order:",
    `• Product: ${productName}`,
    `• Price: ₹${String(price)}`,
  ];
  if (size) lines.push(`• Size: ${size}`);
  if (color) lines.push(`• Color: ${color}`);
  lines.push(
    "",
    "Please confirm availability and delivery details.",
    "",
    "Thank you!",
  );
  return lines.join("\n");
}

export function buildOrderConfirmationMessage(
  orderId: string,
  customerName: string,
  totalAmount: number,
): string {
  return [
    "✅ Order Confirmed — Value Kart",
    "",
    `Hi ${customerName}!`,
    `Your order #${orderId} has been placed successfully.`,
    `Total: ₹${String(totalAmount)}`,
    "",
    "💰 ₹100 cashback will be credited within 7 days after delivery.",
    "",
    "Track your order or reach us at this number.",
    "Thank you for shopping with Value Kart! 🙏",
  ].join("\n");
}
