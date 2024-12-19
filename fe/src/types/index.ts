export interface Service {
    id: string;
    brand?: string;
    name?: string;
    timeAvailable?: string;
    location: string;
    price: number;
    rating?: number;
    size?: string;
    clothPrice?: number;
    helmPrice?: number;
    bedcoverPrice?: number;
  }
  
  export interface UserData {
    id: string;
    name: string;
    email: string;
    phone?: string;
    kostName?: string;
  }
  
  export interface KostStatus {
    monthlyPrice: number;
    penaltyFee: number;
    paymentStatus: string;
    delayDays: number;
    totalCost: number;
    continuousType: string;
  }