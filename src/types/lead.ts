export interface LeadFormData {
  name: string;
  phone: string;
  source: string;
  systemSize?: string;
  monthlyBill?: string;
  timestamp: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}
