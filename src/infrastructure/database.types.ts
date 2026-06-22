// Hand-written database types for Tiendri V2.
// These mirror the Supabase schema defined in supabase/migrations/.
// Update here whenever the schema changes.
// Last updated: schema v10 (migrations 001–011)

// Json type as Supabase exposes it
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ── Enum types (from 001_enums.sql) ───────────────────────────────────────────

export type CatalogMode = "simple" | "nested";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type MediaContext = "product" | "banner" | "logo" | "category" | "general";

export type OfferType =
  | "percentage"
  | "fixed_amount"
  | "bogo"
  | "free_shipping"
  | "combo"
  | "flash_sale"
  | "coupon";

export type PaymentMethod = "nequi" | "daviplata" | "efectivo" | "transferencia" | "tarjeta";

export type VariantSlot =
  | "header"
  | "hero"
  | "categoryNav"
  | "productCard"
  | "footer"
  | "bottomNav"
  | "searchBar";

export type HeaderVariant = "DEFAULT" | "GLASS" | "GREETING" | "GREETING_SIMPLE" | "MINIMAL";

export type HeroVariant =
  | "FULL_BLEED"
  | "CONTAINED"
  | "SPLIT"
  | "TEXT_ONLY"
  | "CAROUSEL"
  | "CARD_SPLIT"
  | "EDITORIAL"
  | "PROMO_STRIP"
  | "PROMO_CARD";

export type CategoryNavVariant = "CHIPS" | "GRID" | "HORIZONTAL_SCROLL" | "TABS" | "COLUMNAR";

export type ProductCardVariant =
  | "BELOW_IMAGE"
  | "OVERLAY_BOTTOM"
  | "OVERLAY_FULL"
  | "SIDE_BY_SIDE"
  | "WITH_DESCRIPTION";

export type FooterVariant = "COLUMNS" | "COMPACT";

export type BottomNavVariant = "EDGE" | "FLOATING_PILL" | "DOT_INDICATOR";

export type SearchBarVariant = "INLINE" | "ICON_TRIGGER";

export type SocialMediaPlatform =
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "twitter"
  | "youtube";

// ── Database interface ─────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      // ── templates (002_reference_tables) ──────────────────────────────────
      templates: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string;
          industry: string[];
          appearance: string;
          is_active: boolean;
          sort_order: number;
          default_colors: Json;
          default_variants: Json;
          default_sections: Json;
          palettes: Json;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          description: string;
          industry: string[];
          appearance?: string;
          is_active?: boolean;
          sort_order?: number;
          default_colors?: Json;
          default_variants?: Json;
          default_sections?: Json;
          palettes?: Json;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          description?: string;
          industry?: string[];
          appearance?: string;
          is_active?: boolean;
          sort_order?: number;
          default_colors?: Json;
          default_variants?: Json;
          default_sections?: Json;
          palettes?: Json;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };

      // ── plans (002_reference_tables) ──────────────────────────────────────
      plans: {
        Row: {
          id: string;
          code: string;
          name: string;
          price_cop: number;
          product_limit: number | null;
          storage_limit: number | null;
          category_limit: number;
          media_limit: number;
          features: Json;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          price_cop?: number;
          product_limit?: number | null;
          storage_limit?: number | null;
          category_limit?: number;
          media_limit?: number;
          features?: Json;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          price_cop?: number;
          product_limit?: number | null;
          storage_limit?: number | null;
          category_limit?: number;
          media_limit?: number;
          features?: Json;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };

      // ── currencies (002_reference_tables) ─────────────────────────────────
      currencies: {
        Row: {
          id: string;
          code: string;
          name: string;
          symbol: string;
          decimal_places: number;
          locale: string;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          symbol: string;
          decimal_places?: number;
          locale?: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          code?: string;
          name?: string;
          symbol?: string;
          decimal_places?: number;
          locale?: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };

      // ── stores (003_stores) ────────────────────────────────────────────────
      stores: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          social_media: Json;
          template_id: string;
          plan_id: string;
          currency_id: string;
          catalog_mode: CatalogMode;
          palette_id: string | null;
          payment_methods: PaymentMethod[];
          onboarding_completed: boolean;
          business_info: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          social_media?: Json;
          template_id: string;
          plan_id: string;
          currency_id: string;
          catalog_mode?: CatalogMode;
          palette_id?: string | null;
          payment_methods?: PaymentMethod[];
          onboarding_completed?: boolean;
          business_info?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          social_media?: Json;
          template_id?: string;
          plan_id?: string;
          currency_id?: string;
          catalog_mode?: CatalogMode;
          palette_id?: string | null;
          payment_methods?: PaymentMethod[];
          onboarding_completed?: boolean;
          business_info?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stores_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stores_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stores_currency_id_fkey";
            columns: ["currency_id"];
            isOneToOne: false;
            referencedRelation: "currencies";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── store_appearance (003_stores) ──────────────────────────────────────
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

      // ── store_infrastructure (003_stores) ─────────────────────────────────
      store_infrastructure: {
        Row: {
          id: string;
          store_id: string;
          custom_domain: string | null;
          domain_verified: boolean;
          domain_dns_records: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          custom_domain?: string | null;
          domain_verified?: boolean;
          domain_dns_records?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          custom_domain?: string | null;
          domain_verified?: boolean;
          domain_dns_records?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_infrastructure_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: true;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── categories (004_categories) ────────────────────────────────────────
      categories: {
        Row: {
          id: string;
          store_id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          icon: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          icon?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          icon?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "categories_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── subcategories (004_categories) ────────────────────────────────────
      subcategories: {
        Row: {
          id: string;
          store_id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string | null;
          image: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          category_id: string;
          name: string;
          slug: string;
          description?: string | null;
          image?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          category_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subcategories_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subcategories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── products (005_products) ────────────────────────────────────────────
      products: {
        Row: {
          id: string;
          store_id: string;
          category_id: string;
          subcategory_id: string | null;
          name: string;
          slug: string;
          subtitle: string | null;
          description: string;
          price: number;
          compare_at_price: number | null;
          available: boolean;
          featured: boolean;
          is_best_seller: boolean;
          tags: string[];
          specs: Json;
          stock: number | null;
          sort_order: number;
          search_vector: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          category_id: string;
          subcategory_id?: string | null;
          name: string;
          slug: string;
          subtitle?: string | null;
          description?: string;
          price: number;
          compare_at_price?: number | null;
          available?: boolean;
          featured?: boolean;
          is_best_seller?: boolean;
          tags?: string[];
          specs?: Json;
          stock?: number | null;
          sort_order?: number;
          search_vector?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          category_id?: string;
          subcategory_id?: string | null;
          name?: string;
          slug?: string;
          subtitle?: string | null;
          description?: string;
          price?: number;
          compare_at_price?: number | null;
          available?: boolean;
          featured?: boolean;
          is_best_seller?: boolean;
          tags?: string[];
          specs?: Json;
          stock?: number | null;
          sort_order?: number;
          search_vector?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_subcategory_id_fkey";
            columns: ["subcategory_id"];
            isOneToOne: false;
            referencedRelation: "subcategories";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── product_images (005_products) ──────────────────────────────────────
      product_images: {
        Row: {
          id: string;
          product_id: string;
          store_id: string;
          url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          store_id: string;
          url: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          store_id?: string;
          url?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_images_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── product_variants (005_products + 011_product_variants_enhance) ─────
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          price_modifier: number;
          type: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          price_modifier?: number;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          price_modifier?: number;
          type?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── offers (006_offers) ────────────────────────────────────────────────
      offers: {
        Row: {
          id: string;
          store_id: string;
          code: string;
          name: string;
          description: string | null;
          type: OfferType;
          active: boolean;
          start_date: string | null;
          end_date: string | null;
          priority: number;
          rules: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          code: string;
          name: string;
          description?: string | null;
          type: OfferType;
          active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          priority?: number;
          rules?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          code?: string;
          name?: string;
          description?: string | null;
          type?: OfferType;
          active?: boolean;
          start_date?: string | null;
          end_date?: string | null;
          priority?: number;
          rules?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "offers_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── offer_items (006_offers) ───────────────────────────────────────────
      offer_items: {
        Row: {
          id: string;
          offer_id: string;
          product_id: string | null;
          category_id: string | null;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          offer_id: string;
          product_id?: string | null;
          category_id?: string | null;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          offer_id?: string;
          product_id?: string | null;
          category_id?: string | null;
          quantity?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "offer_items_offer_id_fkey";
            columns: ["offer_id"];
            isOneToOne: false;
            referencedRelation: "offers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "offer_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "offer_items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── orders (007_orders) ────────────────────────────────────────────────
      orders: {
        Row: {
          id: string;
          store_id: string;
          customer: Json;
          items: Json;
          total: number;
          status: OrderStatus;
          currency_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          customer: Json;
          items?: Json;
          total: number;
          status?: OrderStatus;
          currency_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          customer?: Json;
          items?: Json;
          total?: number;
          status?: OrderStatus;
          currency_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_currency_id_fkey";
            columns: ["currency_id"];
            isOneToOne: false;
            referencedRelation: "currencies";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── media_assets (008_media_pages) ─────────────────────────────────────
      media_assets: {
        Row: {
          id: string;
          store_id: string;
          filename: string;
          alt: string;
          url: string;
          mimetype: string;
          size: number;
          width: number;
          height: number;
          context: MediaContext;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          filename: string;
          alt?: string;
          url: string;
          mimetype: string;
          size: number;
          width: number;
          height: number;
          context?: MediaContext;
          tags?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          filename?: string;
          alt?: string;
          url?: string;
          mimetype?: string;
          size?: number;
          width?: number;
          height?: number;
          context?: MediaContext;
          tags?: string[];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "media_assets_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };

      // ── store_pages (008_media_pages) ──────────────────────────────────────
      store_pages: {
        Row: {
          id: string;
          store_id: string;
          slug: string;
          title: string;
          content: Json;
          published: boolean;
          seo: Json;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          slug: string;
          title: string;
          content?: Json;
          published?: boolean;
          seo?: Json;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          slug?: string;
          title?: string;
          content?: Json;
          published?: boolean;
          seo?: Json;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "store_pages_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_store_variants: {
        Args: { target_store_id: string };
        Returns: Json;
      };
      search_products: {
        Args: { target_store_id: string; search_query: string; result_limit?: number };
        Returns: Database["public"]["Tables"]["products"]["Row"][];
      };
      switch_catalog_mode_to_simple: {
        Args: { target_store_id: string };
        Returns: void;
      };
    };
    Enums: {
      catalog_mode: CatalogMode;
      order_status: OrderStatus;
      media_context: MediaContext;
      offer_type: OfferType;
      payment_method: PaymentMethod;
      variant_slot: VariantSlot;
      header_variant: HeaderVariant;
      hero_variant: HeroVariant;
      category_nav_variant: CategoryNavVariant;
      product_card_variant: ProductCardVariant;
      footer_variant: FooterVariant;
      bottom_nav_variant: BottomNavVariant;
      search_bar_variant: SearchBarVariant;
      social_media_platform: SocialMediaPlatform;
    };
  };
}

// ── Convenience type aliases ───────────────────────────────────────────────────

// Reference tables
export type TemplateRow = Database["public"]["Tables"]["templates"]["Row"];
export type TemplateInsert = Database["public"]["Tables"]["templates"]["Insert"];
export type TemplateUpdate = Database["public"]["Tables"]["templates"]["Update"];

export type PlanRow = Database["public"]["Tables"]["plans"]["Row"];
export type PlanInsert = Database["public"]["Tables"]["plans"]["Insert"];
export type PlanUpdate = Database["public"]["Tables"]["plans"]["Update"];

export type CurrencyRow = Database["public"]["Tables"]["currencies"]["Row"];
export type CurrencyInsert = Database["public"]["Tables"]["currencies"]["Insert"];
export type CurrencyUpdate = Database["public"]["Tables"]["currencies"]["Update"];

// Stores
export type StoreRow = Database["public"]["Tables"]["stores"]["Row"];
export type StoreInsert = Database["public"]["Tables"]["stores"]["Insert"];
export type StoreUpdate = Database["public"]["Tables"]["stores"]["Update"];

export type StoreAppearanceRow = Database["public"]["Tables"]["store_appearance"]["Row"];
export type StoreAppearanceInsert = Database["public"]["Tables"]["store_appearance"]["Insert"];
export type StoreAppearanceUpdate = Database["public"]["Tables"]["store_appearance"]["Update"];

export type StoreInfrastructureRow = Database["public"]["Tables"]["store_infrastructure"]["Row"];
export type StoreInfrastructureInsert =
  Database["public"]["Tables"]["store_infrastructure"]["Insert"];
export type StoreInfrastructureUpdate =
  Database["public"]["Tables"]["store_infrastructure"]["Update"];

// Catalog
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export type SubcategoryRow = Database["public"]["Tables"]["subcategories"]["Row"];
export type SubcategoryInsert = Database["public"]["Tables"]["subcategories"]["Insert"];
export type SubcategoryUpdate = Database["public"]["Tables"]["subcategories"]["Update"];

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type ProductImageRow = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductImageInsert = Database["public"]["Tables"]["product_images"]["Insert"];
export type ProductImageUpdate = Database["public"]["Tables"]["product_images"]["Update"];

export type ProductVariantRow = Database["public"]["Tables"]["product_variants"]["Row"];
export type ProductVariantInsert = Database["public"]["Tables"]["product_variants"]["Insert"];
export type ProductVariantUpdate = Database["public"]["Tables"]["product_variants"]["Update"];

// Commerce
export type OfferRow = Database["public"]["Tables"]["offers"]["Row"];
export type OfferInsert = Database["public"]["Tables"]["offers"]["Insert"];
export type OfferUpdate = Database["public"]["Tables"]["offers"]["Update"];

export type OfferItemRow = Database["public"]["Tables"]["offer_items"]["Row"];
export type OfferItemInsert = Database["public"]["Tables"]["offer_items"]["Insert"];
export type OfferItemUpdate = Database["public"]["Tables"]["offer_items"]["Update"];

export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

// Media & pages
export type MediaAssetRow = Database["public"]["Tables"]["media_assets"]["Row"];
export type MediaAssetInsert = Database["public"]["Tables"]["media_assets"]["Insert"];
export type MediaAssetUpdate = Database["public"]["Tables"]["media_assets"]["Update"];

export type StorePageRow = Database["public"]["Tables"]["store_pages"]["Row"];
export type StorePageInsert = Database["public"]["Tables"]["store_pages"]["Insert"];
export type StorePageUpdate = Database["public"]["Tables"]["store_pages"]["Update"];
