export type Nullable<T> = T | null;
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type Timestamp = string;
export type Date = string;
import './global.css';  // Import once here

export interface Area {
  area_id: number;
  area_description: Nullable<string>;
  area_name: string;
}

export interface ContractChange {
  old_value: Nullable<string>;
  change_id: number;
  new_value: Nullable<string>;
  field_changed: Nullable<string>;
  changed_at: Nullable<Timestamp>;
  contract_id: number;
  change_reason: Nullable<string>;
  service_id: Nullable<number>;
  changed_by: Nullable<string>;
}

export interface ContractService {
  start_date: Nullable<Date>;
  contract_service_id: number;
  updated_at: Nullable<Timestamp>;
  created_at: Nullable<Timestamp>;
  contract_id: number;
  custom_price: Nullable<number>;
  end_date: Nullable<Date>;
  quantity: Nullable<number>;
  custom_description: Nullable<string>;
  service_id: number;
  status: string;
  notes: Nullable<Json>;
}

export interface Contract {
  end_date: Date;
  total_amount: Nullable<number>;
  updated_at: Nullable<Timestamp>;
  start_date: Date;
  status: Nullable<string>;
  contract_id: number;
  payment_plan: Nullable<string>;
  created_at: Nullable<Timestamp>;
  customer_id: number;
}

export interface Customer {
  last_name: string;
  area_id: Nullable<number>;
  first_name: string;
  lot_size: Nullable<number>;
  email: Nullable<string>;
  street_address: Nullable<string>;
  updated_at: Nullable<Timestamp>;
  zip: Nullable<string>;
  phone_2: Nullable<string>;
  state: Nullable<string>;
  phone_1: Nullable<string>;
  customer_id: number;
  created_at: Nullable<Timestamp>;
  city: Nullable<string>;
}

export interface Proposal {
  start_date: Date;
  customer_id: Nullable<number>;
  created_at: Nullable<Timestamp>;
  status: Nullable<string>;
  total_amount: Nullable<number>;
  end_date: Date;
  updated_at: Nullable<Timestamp>;
  proposal_date: Date;
  proposal_id: number;
}

export interface Service {
  service_id: number;
  created_at: Nullable<Timestamp>;
  service_price: number;
  service_description: Nullable<string>;
  is_active: Nullable<boolean>;
  service_name: string;
  parent_service_id: Nullable<number>;
  updated_at: Nullable<Timestamp>;
}
export interface ActiveContractServicesRow {
  contract_service_id: number;
  contract_id: number;
  service_id: number;
  custom_description: Nullable<string>;
  custom_price: Nullable<number>;
  quantity: Nullable<number>;
  start_date: Nullable<Date>;
  end_date: Nullable<Date>;
  notes: Nullable<Json>;
  created_at: Nullable<Timestamp>;
  updated_at: Nullable<Timestamp>;
  status: string;
  active: Nullable<boolean>;
  customer_id: number;
  contract_service_notes: Nullable<Json>;
  total: Nullable<number>;
  service_name: string;
}