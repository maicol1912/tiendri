export type CheckoutMode = 'live' | 'preview'

export interface CheckoutItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string | null
}

export interface DetailedFormData {
  nombre: string
  whatsapp: string
  email: string
  direccion: string
  notas: string
}

export interface MinimalFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  notes: string
}

export interface CheckoutPageProps {
  items: CheckoutItem[]
  subtotal: number
  currencySymbol?: string
  mode?: CheckoutMode
  isSubmitting?: boolean
  onSubmit?: () => void
}

export interface DetailedCheckoutProps extends CheckoutPageProps {
  formData?: Partial<DetailedFormData>
  onFieldChange?: (field: keyof DetailedFormData, value: string) => void
}

export interface MinimalCheckoutProps extends CheckoutPageProps {
  formData?: Partial<MinimalFormData>
  onFieldChange?: (field: keyof MinimalFormData, value: string) => void
  onBack?: () => void
}
