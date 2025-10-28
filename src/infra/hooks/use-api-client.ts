import { useMemo } from 'react'
import { HttpClient } from '../api/http-client'

const defaultConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000, 
  retryAttempts: 3,
  retryDelay: 1000,
}

let httpClientInstance: HttpClient | null = null

export function useApiClient() {
  const apiClient = useMemo(() => {
    if (!httpClientInstance) {
      httpClientInstance = new HttpClient(defaultConfig)
    }
    return httpClientInstance
  }, [])

  return { apiClient }
}

export function useApiConfig() {
  const { apiClient } = useApiClient()

  const updateConfig = (newConfig: Partial<typeof defaultConfig>) => {
    httpClientInstance = new HttpClient({
      ...defaultConfig,
      ...newConfig,
    })
  }

  const setAuthToken = (token: string) => {
    apiClient.setAuthToken(token)
  }

  const removeAuthToken = () => {
    apiClient.removeAuthToken()
  }

  return {
    updateConfig,
    setAuthToken,
    removeAuthToken,
  }
}
