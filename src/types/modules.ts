// Domain-specific types for Modules and Module Options
// Story 1.1: Database Schema and Core Models

import { Database } from './database'

// Base types from database schema
export type Module = Database['public']['Tables']['modules']['Row']
export type ModuleInsert = Database['public']['Tables']['modules']['Insert']
export type ModuleUpdate = Database['public']['Tables']['modules']['Update']

export type ModuleOption = Database['public']['Tables']['module_options']['Row']
export type ModuleOptionInsert = Database['public']['Tables']['module_options']['Insert']
export type ModuleOptionUpdate = Database['public']['Tables']['module_options']['Update']

// Extended module types
export interface ModuleWithOptions extends Module {
  options: ModuleOption[]
  selected_option_id?: string | null
}

export interface ModuleWithDefaultOption extends Module {
  default_option?: ModuleOption | null
}

// Module option metadata interface
export interface ModuleOptionMetadata {
  tags?: string[]
  author?: string
  description?: string
  version?: string
  lastModified?: string
  wordCount?: number
  characterCount?: number
  [key: string]: unknown
}

// Module builder types
export interface ModuleBuilder {
  name: string
  order_index: number
  visible: boolean
  options: ModuleOptionBuilder[]
}

export interface ModuleOptionBuilder {
  content: string
  is_default: boolean
  metadata?: ModuleOptionMetadata
}

// Module reordering
export interface ModuleReorderRequest {
  moduleId: string
  newOrderIndex: number
}

export interface ModuleReorderResult {
  updated: Module[]
  errors: string[]
}

// Module visibility toggle
export interface ModuleVisibilityUpdate {
  moduleId: string
  visible: boolean
}

// Module duplication
export interface ModuleDuplicateRequest {
  moduleId: string
  includeOptions: boolean
  newName?: string
}

export interface ModuleDuplicateResult {
  original: Module
  duplicate: ModuleWithOptions
}

// Module option selection
export interface ModuleOptionSelection {
  moduleId: string
  optionId: string
}

export interface ModuleOptionSelections {
  selections: ModuleOptionSelection[]
  isValid: boolean
  missingModules: string[]
}

// Module compilation
export interface CompiledModule {
  moduleId: string
  moduleName: string
  content: string
  metadata: ModuleOptionMetadata | null
}

export interface CompiledModules {
  modules: CompiledModule[]
  totalLength: number
  moduleCount: number
}

// Module statistics
export interface ModuleStats {
  totalModules: number
  visibleModules: number
  hiddenModules: number
  totalOptions: number
  averageOptionsPerModule: number
}

// Module validation
export interface ModuleValidationResult {
  isValid: boolean
  errors: ModuleValidationError[]
  warnings: ModuleValidationWarning[]
}

export interface ModuleValidationError {
  moduleId: string
  field: string
  message: string
}

export interface ModuleValidationWarning {
  moduleId: string
  field: string
  message: string
}

// Module search/filter types
export interface ModuleSearchParams {
  promptId: string
  includeHidden?: boolean
  sortBy?: 'order_index' | 'name' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

export interface ModuleSearchResult {
  modules: ModuleWithOptions[]
  total: number
}
