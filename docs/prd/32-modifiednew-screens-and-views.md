# 3.2 Modified/New Screens and Views

## New Primary Views

1. **Library View** (`/app/library/page.tsx`)
   - Left sidebar: Folder tree with counts
   - Main area: Grid/list of prompts with thumbnails, names, descriptions
   - Top bar: Search, filter, sort, view toggle (grid/list)
   - Action bar: New Prompt, New Folder, Import, Export

2. **Prompt Builder** (`/app/prompts/[id]/edit/page.tsx`)
   - Left panel: Module list with drag handles, add module button
   - Center panel: Selected module editor with options, variable insertion
   - Right panel: Live preview of assembled prompt with variable highlighting
   - Top bar: Prompt name, folder selector, save status, actions menu

3. **Prompt Executor** (`/app/prompts/[id]/execute/page.tsx`)
   - Top: Prompt name and description
   - Left: Module option selectors (dropdowns/radios)
   - Center: Variable input form with type-specific controls
   - Right: Assembled prompt preview
   - Bottom: Provider selector, model selector, Execute button

4. **Settings - API Keys** (`/app/settings/api-keys/page.tsx`)
   - Table of configured providers with nicknames, last used, status
   - Add Key dialog with provider selection, key input, nickname
   - Test connection button with status indicator
   - Revoke action with confirmation

## Modified Existing Views

5. **Dashboard** (`/app/dashboard/page.tsx`)
   - Add widgets: Recent prompts, prompt count, API usage chart, quick actions

6. **Subscriptions** (`/app/subscriptions/page.tsx`)
   - Extend feature comparison table to include prompt limits, API call limits
