export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          symbol: string
          name: string
          shares: number
          avg_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          name: string
          shares?: number
          avg_price?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          name?: string
          shares?: number
          avg_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          symbol: string
          name: string
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          name: string
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          name?: string
          added_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          symbol: string
          type: 'buy' | 'sell'
          quantity: number
          price: number
          total: number
          status: 'pending' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          type: 'buy' | 'sell'
          quantity: number
          price: number
          total: number
          status?: 'pending' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          type?: 'buy' | 'sell'
          quantity?: number
          price?: number
          total?: number
          status?: 'pending' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          symbol: string
          type: 'price-above' | 'price-below' | 'percent-change' | 'volume-spike'
          target_value: number
          current_value: number | null
          triggered: boolean
          created_at: string
          triggered_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          type: 'price-above' | 'price-below' | 'percent-change' | 'volume-spike'
          target_value: number
          current_value?: number | null
          triggered?: boolean
          created_at?: string
          triggered_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          type?: 'price-above' | 'price-below' | 'percent-change' | 'volume-spike'
          target_value?: number
          current_value?: number | null
          triggered?: boolean
          created_at?: string
          triggered_at?: string | null
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme: 'light' | 'dark'
          notifications_enabled: boolean
          email_alerts: boolean
          default_chart_timeframe: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: 'light' | 'dark'
          notifications_enabled?: boolean
          email_alerts?: boolean
          default_chart_timeframe?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: 'light' | 'dark'
          notifications_enabled?: boolean
          email_alerts?: boolean
          default_chart_timeframe?: string
          created_at?: string
          updated_at?: string
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