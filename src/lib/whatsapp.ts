interface WhatsAppLeadContext {
  name?: string;
  phone?: string;
  source?: string;
  systemSize?: string;
  monthlyBill?: string;
}

export function buildWhatsAppLeadMessage(context: WhatsAppLeadContext) {
  const lines = [
    context.name
      ? `Namaste, main ${context.name} aapki website ke through sampark kar raha/rahi hoon.`
      : "Namaste, main aapki website ke through sampark kar raha/rahi hoon.",
    context.phone ? `Phone: ${context.phone}` : null,
    context.systemSize ? `Required System: ${context.systemSize}` : "Required System: Rooftop solar system",
    context.monthlyBill ? `Monthly Bill: Rs ${context.monthlyBill}` : null,
    "Mujhe solar system ke baare mein detail chahiye.",
    `Source: ${context.source || "Website enquiry"}`,
  ];

  return lines.filter(Boolean).join("\n");
}

export function buildWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
