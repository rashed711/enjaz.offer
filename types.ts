
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
}

export interface ClientInfo {
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface QuotationData {
  number: string;
  date: string;
  client: ClientInfo;
  items: ServiceItem[];
  vatRate: number;
  terms: string[];
}
