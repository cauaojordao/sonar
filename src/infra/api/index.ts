export * from '../../types/api/types'
export * from './http-client'
export * from './audio-processing.service'
export * from './file-upload.service'

import { HttpClient } from './http-client'

const defaultConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
}

export const apiClient = new HttpClient(defaultConfig)
