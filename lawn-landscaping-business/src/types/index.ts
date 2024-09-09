export interface Customer {
    customer_id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    phone_1: string | null;
    phone_2: string | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    area_id: number | null;
    lot_size: number | null;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface Service {
    service_id: number;
    service_name: string;
    service_description: string | null;
    service_price: number;
    is_active: boolean | null;
    parent_service_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface Area {
    area_id: number;
    area_name: string;
    area_description: string | null;
  }