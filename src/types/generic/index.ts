export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

export interface FormField<T = unknown> {
  name: string
  value: T
  error?: string
  required?: boolean
  disabled?: boolean
}

export interface EventHandler<T = Event> {
  (event: T): void
}

export interface AsyncEventHandler<T = Event> {
  (event: T): Promise<void>
}

export interface ComponentWithChildren {
  children: React.ReactNode
}

export interface ComponentWithClassName {
  className?: string
}

export interface ComponentWithId {
  id?: string
}

export interface LoadingState {
  isLoading: boolean
  error?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface StateMachine<T = unknown> {
  status: Status
  data?: T
  error?: string
}
