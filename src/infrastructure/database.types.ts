export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string
          id: string
          image: string | null
          name: string
          slug: string
          sort_order: number
          store_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image?: string | null
          name: string
          slug: string
          sort_order?: number
          store_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          image?: string | null
          name?: string
          slug?: string
          sort_order?: number
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          decimal_places: number
          id: string
          is_active: boolean
          locale: string
          name: string
          sort_order: number
          symbol: string
        }
        Insert: {
          code: string
          decimal_places?: number
          id?: string
          is_active?: boolean
          locale?: string
          name: string
          sort_order?: number
          symbol: string
        }
        Update: {
          code?: string
          decimal_places?: number
          id?: string
          is_active?: boolean
          locale?: string
          name?: string
          sort_order?: number
          symbol?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt: string
          context: Database["public"]["Enums"]["media_context"]
          created_at: string
          filename: string
          height: number
          id: string
          mimetype: string
          size: number
          store_id: string
          tags: string[]
          url: string
          width: number
        }
        Insert: {
          alt?: string
          context?: Database["public"]["Enums"]["media_context"]
          created_at?: string
          filename: string
          height: number
          id?: string
          mimetype: string
          size: number
          store_id: string
          tags?: string[]
          url: string
          width: number
        }
        Update: {
          alt?: string
          context?: Database["public"]["Enums"]["media_context"]
          created_at?: string
          filename?: string
          height?: number
          id?: string
          mimetype?: string
          size?: number
          store_id?: string
          tags?: string[]
          url?: string
          width?: number
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_items: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          offer_id: string
          product_id: string | null
          quantity: number
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          offer_id: string
          product_id?: string | null
          quantity?: number
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          offer_id?: string
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "offer_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_items_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          active: boolean
          code: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          priority: number
          rules: Json
          start_date: string | null
          store_id: string
          type: Database["public"]["Enums"]["offer_type"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          priority?: number
          rules?: Json
          start_date?: string | null
          store_id: string
          type: Database["public"]["Enums"]["offer_type"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          priority?: number
          rules?: Json
          start_date?: string | null
          store_id?: string
          type?: Database["public"]["Enums"]["offer_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency_id: string
          customer: Json
          id: string
          items: Json
          status: Database["public"]["Enums"]["order_status"]
          store_id: string
          total: number
        }
        Insert: {
          created_at?: string
          currency_id: string
          customer: Json
          id?: string
          items?: Json
          status?: Database["public"]["Enums"]["order_status"]
          store_id: string
          total: number
        }
        Update: {
          created_at?: string
          currency_id?: string
          customer?: Json
          id?: string
          items?: Json
          status?: Database["public"]["Enums"]["order_status"]
          store_id?: string
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          category_limit: number
          code: string
          created_at: string
          features: Json
          id: string
          is_active: boolean
          media_limit: number
          name: string
          price_cop: number
          product_limit: number | null
          sort_order: number
          storage_limit: number | null
        }
        Insert: {
          category_limit?: number
          code: string
          created_at?: string
          features?: Json
          id?: string
          is_active?: boolean
          media_limit?: number
          name: string
          price_cop?: number
          product_limit?: number | null
          sort_order?: number
          storage_limit?: number | null
        }
        Update: {
          category_limit?: number
          code?: string
          created_at?: string
          features?: Json
          id?: string
          is_active?: boolean
          media_limit?: number
          name?: string
          price_cop?: number
          product_limit?: number | null
          sort_order?: number
          storage_limit?: number | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          product_id: string
          sort_order: number
          store_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          sort_order?: number
          store_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          sort_order?: number
          store_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          name: string
          price_modifier: number
          product_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name: string
          price_modifier?: number
          product_id: string
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name?: string
          price_modifier?: number
          product_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available: boolean
          category_id: string
          compare_at_price: number | null
          created_at: string
          description: string
          featured: boolean
          id: string
          is_best_seller: boolean
          name: string
          price: number
          search_vector: unknown
          slug: string
          sort_order: number
          specs: Json
          stock: number | null
          store_id: string
          subcategory_id: string | null
          subtitle: string | null
          tags: string[]
          updated_at: string
        }
        Insert: {
          available?: boolean
          category_id: string
          compare_at_price?: number | null
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          is_best_seller?: boolean
          name: string
          price: number
          search_vector?: unknown
          slug: string
          sort_order?: number
          specs?: Json
          stock?: number | null
          store_id: string
          subcategory_id?: string | null
          subtitle?: string | null
          tags?: string[]
          updated_at?: string
        }
        Update: {
          available?: boolean
          category_id?: string
          compare_at_price?: number | null
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          is_best_seller?: boolean
          name?: string
          price?: number
          search_vector?: unknown
          slug?: string
          sort_order?: number
          specs?: Json
          stock?: number | null
          store_id?: string
          subcategory_id?: string | null
          subtitle?: string | null
          tags?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      store_appearance: {
        Row: {
          branding: Json
          content: Json
          created_at: string
          font_pair: string | null
          id: string
          layout: Json
          palette_id: string | null
          sections: Json
          store_id: string
          theme: Json
          updated_at: string
          variants: Json
          version: number
        }
        Insert: {
          branding?: Json
          content?: Json
          created_at?: string
          font_pair?: string | null
          id?: string
          layout?: Json
          palette_id?: string | null
          sections?: Json
          store_id: string
          theme?: Json
          updated_at?: string
          variants?: Json
          version?: number
        }
        Update: {
          branding?: Json
          content?: Json
          created_at?: string
          font_pair?: string | null
          id?: string
          layout?: Json
          palette_id?: string | null
          sections?: Json
          store_id?: string
          theme?: Json
          updated_at?: string
          variants?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_appearance_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_infrastructure: {
        Row: {
          created_at: string
          custom_domain: string | null
          domain_dns_records: Json
          domain_verified: boolean
          id: string
          store_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_domain?: string | null
          domain_dns_records?: Json
          domain_verified?: boolean
          id?: string
          store_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_domain?: string | null
          domain_dns_records?: Json
          domain_verified?: boolean
          id?: string
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_infrastructure_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_pages: {
        Row: {
          content: Json
          created_at: string
          id: string
          published: boolean
          seo: Json
          slug: string
          sort_order: number
          store_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          published?: boolean
          seo?: Json
          slug: string
          sort_order?: number
          store_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          published?: boolean
          seo?: Json
          slug?: string
          sort_order?: number
          store_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_pages_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          business_info: Json
          catalog_mode: Database["public"]["Enums"]["catalog_mode"]
          created_at: string
          currency_id: string
          description: string | null
          id: string
          name: string
          onboarding_completed: boolean
          owner_id: string
          palette_id: string | null
          payment_methods: Database["public"]["Enums"]["payment_method"][]
          plan_id: string
          slug: string
          social_media: Json
          template_id: string
          updated_at: string
        }
        Insert: {
          business_info?: Json
          catalog_mode?: Database["public"]["Enums"]["catalog_mode"]
          created_at?: string
          currency_id: string
          description?: string | null
          id?: string
          name: string
          onboarding_completed?: boolean
          owner_id: string
          palette_id?: string | null
          payment_methods?: Database["public"]["Enums"]["payment_method"][]
          plan_id: string
          slug: string
          social_media?: Json
          template_id: string
          updated_at?: string
        }
        Update: {
          business_info?: Json
          catalog_mode?: Database["public"]["Enums"]["catalog_mode"]
          created_at?: string
          currency_id?: string
          description?: string | null
          id?: string
          name?: string
          onboarding_completed?: boolean
          owner_id?: string
          palette_id?: string | null
          payment_methods?: Database["public"]["Enums"]["payment_method"][]
          plan_id?: string
          slug?: string
          social_media?: Json
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
          slug: string
          sort_order: number
          store_id: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
          slug: string
          sort_order?: number
          store_id: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          slug?: string
          sort_order?: number
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subcategories_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          appearance: string
          code: string
          created_at: string
          default_colors: Json
          default_sections: Json
          default_variants: Json
          description: string
          id: string
          industry: string[]
          is_active: boolean
          metadata: Json
          name: string
          palettes: Json
          sort_order: number
        }
        Insert: {
          appearance?: string
          code: string
          created_at?: string
          default_colors?: Json
          default_sections?: Json
          default_variants?: Json
          description: string
          id?: string
          industry: string[]
          is_active?: boolean
          metadata?: Json
          name: string
          palettes?: Json
          sort_order?: number
        }
        Update: {
          appearance?: string
          code?: string
          created_at?: string
          default_colors?: Json
          default_sections?: Json
          default_variants?: Json
          description?: string
          id?: string
          industry?: string[]
          is_active?: boolean
          metadata?: Json
          name?: string
          palettes?: Json
          sort_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_store_variants: { Args: { target_store_id: string }; Returns: Json }
      is_store_owner: { Args: { check_store_id: string }; Returns: boolean }
      is_store_public: { Args: { check_store_id: string }; Returns: boolean }
      search_products: {
        Args: {
          result_limit?: number
          search_query: string
          target_store_id: string
        }
        Returns: {
          available: boolean
          category_id: string
          compare_at_price: number | null
          created_at: string
          description: string
          featured: boolean
          id: string
          is_best_seller: boolean
          name: string
          price: number
          search_vector: unknown
          slug: string
          sort_order: number
          specs: Json
          stock: number | null
          store_id: string
          subcategory_id: string | null
          subtitle: string | null
          tags: string[]
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "products"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      slugify: { Args: { input_text: string }; Returns: string }
      switch_catalog_mode_to_simple: {
        Args: { target_store_id: string }
        Returns: undefined
      }
    }
    Enums: {
      bottom_nav_variant: "EDGE" | "FLOATING_PILL" | "DOT_INDICATOR"
      catalog_mode: "simple" | "nested"
      category_nav_variant:
        | "CHIPS"
        | "GRID"
        | "HORIZONTAL_SCROLL"
        | "TABS"
        | "COLUMNAR"
      footer_variant: "COLUMNS" | "COMPACT"
      header_variant:
        | "DEFAULT"
        | "GLASS"
        | "GREETING"
        | "GREETING_SIMPLE"
        | "MINIMAL"
      hero_variant:
        | "FULL_BLEED"
        | "CONTAINED"
        | "SPLIT"
        | "TEXT_ONLY"
        | "CAROUSEL"
        | "CARD_SPLIT"
        | "EDITORIAL"
        | "PROMO_STRIP"
        | "PROMO_CARD"
      media_context: "product" | "banner" | "logo" | "category" | "general"
      offer_type:
        | "percentage"
        | "fixed_amount"
        | "bogo"
        | "free_shipping"
        | "combo"
        | "flash_sale"
        | "coupon"
      order_status:
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
      payment_method:
        | "nequi"
        | "daviplata"
        | "efectivo"
        | "transferencia"
        | "tarjeta"
      product_card_variant:
        | "BELOW_IMAGE"
        | "OVERLAY_BOTTOM"
        | "OVERLAY_FULL"
        | "SIDE_BY_SIDE"
        | "WITH_DESCRIPTION"
      search_bar_variant: "INLINE" | "ICON_TRIGGER"
      social_media_platform:
        | "whatsapp"
        | "instagram"
        | "facebook"
        | "tiktok"
        | "twitter"
        | "youtube"
      variant_slot:
        | "header"
        | "hero"
        | "categoryNav"
        | "productCard"
        | "footer"
        | "bottomNav"
        | "searchBar"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      bottom_nav_variant: ["EDGE", "FLOATING_PILL", "DOT_INDICATOR"],
      catalog_mode: ["simple", "nested"],
      category_nav_variant: [
        "CHIPS",
        "GRID",
        "HORIZONTAL_SCROLL",
        "TABS",
        "COLUMNAR",
      ],
      footer_variant: ["COLUMNS", "COMPACT"],
      header_variant: [
        "DEFAULT",
        "GLASS",
        "GREETING",
        "GREETING_SIMPLE",
        "MINIMAL",
      ],
      hero_variant: [
        "FULL_BLEED",
        "CONTAINED",
        "SPLIT",
        "TEXT_ONLY",
        "CAROUSEL",
        "CARD_SPLIT",
        "EDITORIAL",
        "PROMO_STRIP",
        "PROMO_CARD",
      ],
      media_context: ["product", "banner", "logo", "category", "general"],
      offer_type: [
        "percentage",
        "fixed_amount",
        "bogo",
        "free_shipping",
        "combo",
        "flash_sale",
        "coupon",
      ],
      order_status: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      payment_method: [
        "nequi",
        "daviplata",
        "efectivo",
        "transferencia",
        "tarjeta",
      ],
      product_card_variant: [
        "BELOW_IMAGE",
        "OVERLAY_BOTTOM",
        "OVERLAY_FULL",
        "SIDE_BY_SIDE",
        "WITH_DESCRIPTION",
      ],
      search_bar_variant: ["INLINE", "ICON_TRIGGER"],
      social_media_platform: [
        "whatsapp",
        "instagram",
        "facebook",
        "tiktok",
        "twitter",
        "youtube",
      ],
      variant_slot: [
        "header",
        "hero",
        "categoryNav",
        "productCard",
        "footer",
        "bottomNav",
        "searchBar",
      ],
    },
  },
} as const


// ── Convenience type aliases ────────────────────────────────────────────────
export type StoreRow = Database["public"]["Tables"]["stores"]["Row"];
export type StoreInsert = Database["public"]["Tables"]["stores"]["Insert"];
export type StoreUpdate = Database["public"]["Tables"]["stores"]["Update"];

export type StoreAppearanceRow = Database["public"]["Tables"]["store_appearance"]["Row"];
export type StoreAppearanceInsert = Database["public"]["Tables"]["store_appearance"]["Insert"];
export type StoreAppearanceUpdate = Database["public"]["Tables"]["store_appearance"]["Update"];

export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type SubcategoryRow = Database["public"]["Tables"]["subcategories"]["Row"];
export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductImageRow = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductVariantRow = Database["public"]["Tables"]["product_variants"]["Row"];
export type MediaAssetRow = Database["public"]["Tables"]["media_assets"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type CurrencyRow = Database["public"]["Tables"]["currencies"]["Row"];
