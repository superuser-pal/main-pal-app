// Domain-specific types for Variables
// Story 1.1: Database Schema and Core Models

import { Database } from './database'

// Base types from database schema
export type Variable = Database['public']['Tables']['variables']['Row']
export type VariableInsert = Database['public']['Tables']['variables']['Insert']
export type VariableUpdate = Database['public']['Tables']['variables']['Update']

// Variable type enum
export enum VariableType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  DATE = 'date',
  BOOLEAN = 'boolean',
}

// Variable configuration interfaces by type
export interface TextVariableConfig {
  placeholder?: string
  default?: string
  minLength?: number
  maxLength?: number
  pattern?: string // Regex pattern for validation
  helpText?: string
}

export interface NumberVariableConfig {
  default?: number
  min?: number
  max?: number
  step?: number
  unit?: string // e.g., "px", "ms", "%"
  helpText?: string
}

export interface SelectVariableConfig {
  options: SelectOption[]
  default?: string
  allowCustom?: boolean // Allow user to enter custom value
  helpText?: string
}

export interface MultiSelectVariableConfig {
  options: SelectOption[]
  default?: string[]
  minSelections?: number
  maxSelections?: number
  helpText?: string
}

export interface DateVariableConfig {
  default?: string // ISO date string
  min?: string
  max?: string
  includeTime?: boolean
  helpText?: string
}

export interface BooleanVariableConfig {
  default?: boolean
  trueLabel?: string
  falseLabel?: string
  helpText?: string
}

export interface SelectOption {
  label: string
  value: string
  description?: string
}

// Union type for all config types
export type VariableConfig =
  | TextVariableConfig
  | NumberVariableConfig
  | SelectVariableConfig
  | MultiSelectVariableConfig
  | DateVariableConfig
  | BooleanVariableConfig

// Variable with typed config
export interface TypedVariable {
  id: string
  prompt_id: string
  name: string
  type: string
  created_at: string
  updated_at: string
  config: VariableConfig | null
}

// Variable value types by variable type
export type TextValue = string
export type NumberValue = number
export type SelectValue = string
export type MultiSelectValue = string[]
export type DateValue = string // ISO date string
export type BooleanValue = boolean

export type VariableValue =
  | TextValue
  | NumberValue
  | SelectValue
  | MultiSelectValue
  | DateValue
  | BooleanValue

// Variable value map for prompt execution
export type VariableValues = Record<string, VariableValue>

// Variable validation
export interface VariableValidationResult {
  isValid: boolean
  errors: VariableValidationError[]
}

export interface VariableValidationError {
  variableName: string
  message: string
  actualValue?: unknown
  expectedType?: VariableType
}

// Variable insertion in templates
export interface VariableReference {
  name: string
  position: number // Character position in template
  length: number // Length of variable reference (e.g., {{variable_name}})
}

export interface VariableSubstitution {
  variable: Variable
  value: VariableValue
  formattedValue: string
}

export interface VariableSubstitutionResult {
  substitutions: VariableSubstitution[]
  missingVariables: string[]
  invalidVariables: string[]
}

// Variable template parsing
export interface ParsedTemplate {
  rawContent: string
  variables: VariableReference[]
  hasVariables: boolean
}

// Variable builder types
export interface VariableBuilder {
  name: string
  type: VariableType
  config: VariableConfig
}

// Variable duplication
export interface VariableDuplicateRequest {
  variableId: string
  newName: string
}

// Variable statistics
export interface VariableStats {
  totalVariables: number
  variablesByType: Record<VariableType, number>
  requiredVariables: number
  optionalVariables: number
}

// Variable search/filter types
export interface VariableSearchParams {
  promptId: string
  type?: VariableType
  sortBy?: 'name' | 'type' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

export interface VariableSearchResult {
  variables: TypedVariable[]
  total: number
}

// Variable form types (for UI)
export interface VariableFormData {
  name: string
  type: VariableType
  config: VariableConfig
}

export interface VariableFormErrors {
  name?: string
  type?: string
  config?: Record<string, string>
}

// Variable execution context
export interface VariableExecutionContext {
  promptId: string
  variables: TypedVariable[]
  values: VariableValues
  timestamp: string
}
