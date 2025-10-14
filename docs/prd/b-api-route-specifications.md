# B. API Route Specifications

## Prompts API

- `GET /api/prompts` - List user's prompts (with pagination, filtering, search)
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/[id]` - Get prompt details with modules and variables
- `PATCH /api/prompts/[id]` - Update prompt metadata
- `DELETE /api/prompts/[id]` - Soft delete prompt
- `POST /api/prompts/[id]/duplicate` - Duplicate prompt

## Folders API

- `GET /api/folders` - List user's folders with prompt counts
- `POST /api/folders` - Create new folder
- `PATCH /api/folders/[id]` - Rename folder
- `DELETE /api/folders/[id]` - Delete folder (with cascade options)

## Modules API

- `POST /api/prompts/[promptId]/modules` - Add module to prompt
- `PATCH /api/modules/[id]` - Update module (name, order, visibility)
- `DELETE /api/modules/[id]` - Delete module
- `POST /api/modules/[id]/reorder` - Bulk reorder modules

## Variables API

- `GET /api/prompts/[promptId]/variables` - Get all variables for prompt
- `PATCH /api/variables/[id]` - Update variable configuration

## Execution API

- `POST /api/prompts/execute` - Execute prompt with LLM provider
- `GET /api/prompts/[id]/history` - Get execution history

## Extension API

- `POST /api/extension/auth` - Authenticate extension
- `GET /api/extension/prompts` - Get full library
- `GET /api/extension/prompts/sync` - Get incremental updates
