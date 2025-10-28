import type { ApiResponse, ApiError, ApiConfig, ApiHeaders } from '../../types/api/types'

export class HttpClient {
  private config: ApiConfig
  private baseHeaders: ApiHeaders

  constructor(config: ApiConfig) {
    this.config = config
    this.baseHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`
    const requestId = this.generateRequestId()

    const headers: HeadersInit = {
      ...this.baseHeaders,
      ...options.headers,
      'X-Request-ID': requestId,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw this.createApiError(response.status, errorData)
      }

      const data = await response.json()
      return data as ApiResponse<T>
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createApiError(408, { message: 'Request timeout' })
        }
        throw this.createApiError(500, { message: error.message })
      }
      
      throw error
    }
  }

  async get<T>(endpoint: string, headers?: ApiHeaders): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: { ...this.baseHeaders, ...headers },
    })
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    headers?: ApiHeaders
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: { ...this.baseHeaders, ...headers },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    headers?: ApiHeaders
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: { ...this.baseHeaders, ...headers },
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, headers?: ApiHeaders): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: { ...this.baseHeaders, ...headers },
    })
  }

  async upload<T>(
    endpoint: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response as ApiResponse<T>)
          } catch (error) {
            reject(this.createApiError(500, { message: 'Invalid JSON response' }))
          }
        } else {
          reject(this.createApiError(xhr.status, { message: xhr.statusText }))
        }
      })

      xhr.addEventListener('error', () => {
        reject(this.createApiError(0, { message: 'Network error' }))
      })

      xhr.open('POST', `${this.config.baseUrl}${endpoint}`)
      xhr.setRequestHeader('X-Request-ID', this.generateRequestId())
      xhr.send(formData)
    })
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private createApiError(status: number, data: any): ApiError {
    return {
      message: data.message || 'An error occurred',
      code: data.code || `HTTP_${status}`,
      details: data.details,
      timestamp: new Date().toISOString(),
    }
  }

  setAuthToken(token: string): void {
    this.baseHeaders.Authorization = `Bearer ${token}`
  }

  removeAuthToken(): void {
    delete this.baseHeaders.Authorization
  }
}
