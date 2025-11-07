// Domain-specific types for Prompts
// Story 1.1: Database Schema and Core Models

import { Database } from './database'

// Base types from database schema
export type Prompt = Database['public']['Tables']['prompts']['Row']
export type PromptInsert = Database['public']['Tables']['prompts']['Insert']
export type PromptUpdate = Database['public']['Tables']['prompts']['Update']

// Extended types with relationships
export interface PromptWithFolder extends Prompt {
  folder?: Folder | null
}

export interface PromptWithModules extends Prompt {
  modules: Module[]
}

export interface PromptWithVariables extends Prompt {
  variables: Variable[]
}

export interface PromptWithAll extends Prompt {
  folder?: Folder | null
  modules: ModuleWithOptions[]
  variables: Variable[]
}

// Folder types
export type Folder = Database['public']['Tables']['folders']['Row']
export type FolderInsert = Database['public']['Tables']['folders']['Insert']
export type FolderUpdate = Database['public']['Tables']['folders']['Update']

export interface FolderWithPrompts extends Folder {
  prompts: Prompt[]
  prompt_count?: number
}

// Module types
export type Module = Database['public']['Tables']['modules']['Row']
export type ModuleInsert = Database['public']['Tables']['modules']['Insert']
export type ModuleUpdate = Database['public']['Tables']['modules']['Update']

export interface ModuleWithOptions extends Module {
  options: ModuleOption[]
}

// Module option types
export type ModuleOption = Database['public']['Tables']['module_options']['Row']
export type ModuleOptionInsert = Database['public']['Tables']['module_options']['Insert']
export type ModuleOptionUpdate = Database['public']['Tables']['module_options']['Update']

// Module option metadata structure
export interface ModuleOptionMetadata {
  tags?: string[]
  author?: string
  description?: string
  [key: string]: unknown
}

// Variable types (imported from variables.ts to avoid duplication)
export type Variable = Database['public']['Tables']['variables']['Row']
export type VariableInsert = Database['public']['Tables']['variables']['Insert']
export type VariableUpdate = Database['public']['Tables']['variables']['Update']

// Prompt execution types
export interface PromptExecution {
  prompt: PromptWithAll
  variableValues: Record<string, unknown>
  selectedModuleOptions: Record<string, string> // moduleId -> optionId
}

export interface CompiledPrompt {
  content: string
  metadata: {
    promptId: string
    promptName: string
    compiledAt: string
    variableCount: number
    moduleCount: number
  }
}

// Prompt search/filter types
export interface PromptSearchParams {
  query?: string
  folderId?: string | null
  includeDeleted?: boolean
  sortBy?: 'created_at' | 'updated_at' | 'name'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface PromptSearchResult {
  prompts: PromptWithFolder[]
  total: number
  hasMore: boolean
}

// Prompt statistics
export interface PromptStats {
  totalPrompts: number
  totalFolders: number
  promptsByFolder: Record<string, number>
  recentlyUsed: Prompt[]
  recentlyCreated: Prompt[]
}
