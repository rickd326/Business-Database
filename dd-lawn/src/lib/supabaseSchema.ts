export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type Timestamp = string
export type Date = string
type Nullable<T> = T | null

export interface Database {
  public: {
    Tables: {
      areas: {
        Row: {
          area_id: number
          area_description: Nullable<string>
          area_name: string
        }
        Insert: {
          area_id: number
          area_description?: Nullable<string>
          area_name: string
        }
        Update: {
          area_id?: number
          area_description?: Nullable<string>
          area_name?: string
        }
      }
      contract_changes: {
        Row: {
          old_value: Nullable<string>
          change_id: number
          new_value: Nullable<string>
          field_changed: Nullable<string>
          changed_at: Nullable<Timestamp>
          contract_id: number
          change_reason: Nullable<string>
          service_id: Nullable<number>
          changed_by: Nullable<string>
        }
        Insert: {
          old_value?: Nullable<string>
          change_id: number
          new_value?: Nullable<string>
          field_changed?: Nullable<string>
          changed_at?: Nullable<Timestamp>
          contract_id: number
          change_reason?: Nullable<string>
          service_id?: Nullable<number>
          changed_by?: Nullable<string>
        }
        Update: {
          old_value?: Nullable<string>
          change_id?: number
          new_value?: Nullable<string>
          field_changed?: Nullable<string>
          changed_at?: Nullable<Timestamp>
          contract_id?: number
          change_reason?: Nullable<string>
          service_id?: Nullable<number>
          changed_by?: Nullable<string>
        }
      }
      contract_services: {
        Row: {
          start_date: Nullable<Date>
          contract_service_id: number
          updated_at: Nullable<Timestamp>
          created_at: Nullable<Timestamp>
          contract_id: number
          custom_price: Nullable<number>
          end_date: Nullable<Date>
          quantity: Nullable<number>
          custom_description: Nullable<string>
          service_id: number
          status: string
          notes: Nullable<Json>
        }
        Insert: {
          start_date?: Nullable<Date>
          contract_service_id: number
          updated_at?: Nullable<Timestamp>
          created_at?: Nullable<Timestamp>
          contract_id: number
          custom_price?: Nullable<number>
          end_date?: Nullable<Date>
          quantity?: Nullable<number>
          custom_description?: Nullable<string>
          service_id: number
          status: string
          notes?: Nullable<Json>
        }
        Update: {
          start_date?: Nullable<Date>
          contract_service_id?: number
          updated_at?: Nullable<Timestamp>
          created_at?: Nullable<Timestamp>
          contract_id?: number
          custom_price?: Nullable<number>
          end_date?: Nullable<Date>
          quantity?: Nullable<number>
          custom_description?: Nullable<string>
          service_id?: number
          status?: string
          notes?: Nullable<Json>
        }
      }
      contracts: {
        Row: {
          end_date: Date
          total_amount: Nullable<number>
          updated_at: Nullable<Timestamp>
          start_date: Date
          status: Nullable<string>
          contract_id: number
          payment_plan: Nullable<string>
          created_at: Nullable<Timestamp>
          customer_id: number
        }
        Insert: {
          end_date: Date
          total_amount?: Nullable<number>
          updated_at?: Nullable<Timestamp>
          start_date: Date
          status?: Nullable<string>
          contract_id: number
          payment_plan?: Nullable<string>
          created_at?: Nullable<Timestamp>
          customer_id: number
        }
        Update: {
          end_date?: Date
          total_amount?: Nullable<number>
          updated_at?: Nullable<Timestamp>
          start_date?: Date
          status?: Nullable<string>
          contract_id?: number
          payment_plan?: Nullable<string>
          created_at?: Nullable<Timestamp>
          customer_id?: number
        }
      }
      customers: {
        Row: {
          last_name: string
          area_id: Nullable<number>
          first_name: string
          lot_size: Nullable<number>
          email: Nullable<string>
          street_address: Nullable<string>
          updated_at: Nullable<Timestamp>
          zip: Nullable<string>
          phone_2: Nullable<string>
          state: Nullable<string>
          phone_1: Nullable<string>
          customer_id: number
          created_at: Nullable<Timestamp>
          city: Nullable<string>
        }
        Insert: {
          last_name: string
          area_id?: Nullable<number>
          first_name: string
          lot_size?: Nullable<number>
          email?: Nullable<string>
          street_address?: Nullable<string>
          updated_at?: Nullable<Timestamp>
          zip?: Nullable<string>
          phone_2?: Nullable<string>
          state?: Nullable<string>
          phone_1?: Nullable<string>
          customer_id: number
          created_at?: Nullable<Timestamp>
          city?: Nullable<string>
        }
        Update: {
          last_name?: string
          area_id?: Nullable<number>
          first_name?: string
          lot_size?: Nullable<number>
          email?: Nullable<string>
          street_address?: Nullable<string>
          updated_at?: Nullable<Timestamp>
          zip?: Nullable<string>
          phone_2?: Nullable<string>
          state?: Nullable<string>
          phone_1?: Nullable<string>
          customer_id?: number
          created_at?: Nullable<Timestamp>
          city?: Nullable<string>
        }
      }
      proposals: {
        Row: {
          start_date: Date
          customer_id: Nullable<number>
          created_at: Nullable<Timestamp>
          status: Nullable<string>
          total_amount: Nullable<number>
          end_date: Date
          updated_at: Nullable<Timestamp>
          proposal_date: Date
          proposal_id: number
        }
        Insert: {
          start_date: Date
          customer_id?: Nullable<number>
          created_at?: Nullable<Timestamp>
          status?: Nullable<string>
          total_amount?: Nullable<number>
          end_date: Date
          updated_at?: Nullable<Timestamp>
          proposal_date: Date
          proposal_id: number
        }
        Update: {
          start_date?: Date
          customer_id?: Nullable<number>
          created_at?: Nullable<Timestamp>
          status?: Nullable<string>
          total_amount?: Nullable<number>
          end_date?: Date
          updated_at?: Nullable<Timestamp>
          proposal_date?: Date
          proposal_id?: number
        }
      }
      services: {
        Row: {
          service_id: number
          created_at: Nullable<Timestamp>
          service_price: number
          service_description: Nullable<string>
          is_active: Nullable<boolean>
          service_name: string
          parent_service_id: Nullable<number>
          updated_at: Nullable<Timestamp>
        }
        Insert: {
          service_id: number
          created_at?: Nullable<Timestamp>
          service_price: number
          service_description?: Nullable<string>
          is_active?: Nullable<boolean>
          service_name: string
          parent_service_id?: Nullable<number>
          updated_at?: Nullable<Timestamp>
        }
        Update: {
          service_id?: number
          created_at?: Nullable<Timestamp>
          service_price?: number
          service_description?: Nullable<string>
          is_active?: Nullable<boolean>
          service_name?: string
          parent_service_id?: Nullable<number>
          updated_at?: Nullable<Timestamp>
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}