// Auto-generated Database Types for PromptPal Schema
// Generated from: supabase/migrations/20251108000921_create_promptpal_schema.sql
// Story 1.1: Database Schema and Core Models

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
      folders: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prompts: {
        Row: {
          id: string
          user_id: string
          folder_id: string | null
          name: string
          description: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          folder_id?: string | null
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          folder_id?: string | null
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompts_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          }
        ]
      }
      modules: {
        Row: {
          id: string
          prompt_id: string
          name: string
          order_index: number
          visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          name: string
          order_index: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          name?: string
          order_index?: number
          visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
      module_options: {
        Row: {
          id: string
          module_id: string
          content: string
          is_default: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          module_id: string
          content: string
          is_default?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          module_id?: string
          content?: string
          is_default?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_options_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          }
        ]
      }
      variables: {
        Row: {
          id: string
          prompt_id: string
          name: string
          type: string
          config: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          prompt_id: string
          name: string
          type?: string
          config?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          prompt_id?: string
          name?: string
          type?: string
          config?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "variables_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
      encrypted_api_keys: {
        Row: {
          id: string
          user_id: string
          provider: string
          nickname: string | null
          encrypted_key: string
          last_used_at: string | null
          created_at: string
          revoked_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          nickname?: string | null
          encrypted_key: string
          last_used_at?: string | null
          created_at?: string
          revoked_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          nickname?: string | null
          encrypted_key?: string
          last_used_at?: string | null
          created_at?: string
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "encrypted_api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      usage_tracking: {
        Row: {
          id: string
          user_id: string
          prompt_id: string | null
          action: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt_id?: string | null
          action: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt_id?: string | null
          action?: string
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_tracking_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
