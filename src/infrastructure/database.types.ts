// Hand-written database types for Tiendri V2.
// These mirror the Supabase schema defined in supabase/migrations/.
// Update here whenever the schema changes.

// Json type as Supabase exposes it
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      store_appearance: {
        Row: {
          id: string;
          store_id: string;
          palette_id: string | null;
          font_pair: string | null;
          theme: Json;
          layout: Json;
          variants: Json;
          sections: Json;
          content: Json;
          branding: Json;
          version: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          palette_id?: string | null;
          font_pair?: string | null;
          theme?: Json;
          layout?: Json;
          variants?: Json;
          sections?: Json;
          content?: Json;
          branding?: Json;
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          palette_id?: string | null;
          font_pair?: string | null;
          theme?: Json;
          layout?: Json;
          variants?: Json;
          sections?: Json;
          content?: Json;
          branding?: Json;
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_appearance_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: true;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };
      stores: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          whatsapp: string | null;
          template_id: string;
          catalog_mode: "simple" | "nested";
          currency: string;
          onboarding_completed: boolean;
          customization: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          whatsapp?: string | null;
          template_id?: string;
          catalog_mode?: "simple" | "nested";
          currency?: string;
          onboarding_completed?: boolean;
          customization?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          whatsapp?: string | null;
          template_id?: string;
          catalog_mode?: "simple" | "nested";
          currency?: string;
          onboarding_completed?: boolean;
          customization?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience type aliases for the stores table
export type StoreRow = Database["public"]["Tables"]["stores"]["Row"];
export type StoreInsert = Database["public"]["Tables"]["stores"]["Insert"];
export type StoreUpdate = Database["public"]["Tables"]["stores"]["Update"];

// Convenience type aliases for the store_appearance table
export type StoreAppearanceRow =
  Database["public"]["Tables"]["store_appearance"]["Row"];
export type StoreAppearanceInsert =
  Database["public"]["Tables"]["store_appearance"]["Insert"];
export type StoreAppearanceUpdate =
  Database["public"]["Tables"]["store_appearance"]["Update"];
