# 🎨 PAL App Design Roadmap for Junior Designer

## Overview
This roadmap outlines exactly which screens and components need to be designed at each stage of the PAL (Program-Aided Language) application development. Each stage corresponds to a specific User Story from the implementation plan.

---

## 📐 Design System Foundation (Pre-Story Setup)

### Essential Design Tokens
Before starting any screen designs, establish these foundational elements:

#### Color Palette
- **Primary Colors**: Main brand color with 5 shades (100-900)
- **Secondary Colors**: Complementary color with 5 shades
- **Semantic Colors**:
  - Success (green shades)
  - Warning (yellow/amber shades)
  - Error (red shades)
  - Info (blue shades)
- **Neutral Colors**: Gray scale (50-950)
- **Dark Mode Variants**: All colors need dark mode equivalents

#### Typography
- **Font Families**: 
  - Primary (for UI): Inter, system-ui, or similar
  - Code/Mono: Fira Code, JetBrains Mono, or similar
- **Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
- **Font Weights**: light (300), normal (400), medium (500), semibold (600), bold (700)
- **Line Heights**: tight, normal, relaxed, loose

#### Spacing & Layout
- **Spacing Scale**: 0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
- **Border Radius**: none, sm, default, md, lg, xl, 2xl, full
- **Container Widths**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Grid System**: 12 columns with gutters

#### Shadows & Effects
- **Box Shadows**: sm, default, md, lg, xl, 2xl
- **Blur Effects**: For overlays and glassmorphism
- **Transitions**: Timing functions and durations

---

## 🎯 Stage 0: Pre-Implementation Designs
**Timeline**: Before any coding begins
**Priority**: CRITICAL - Must be completed first

### Global Components (Used Everywhere)

#### 1. Navigation Components
- **Main Navigation Bar**
  - Logo placement
  - Navigation items (active, hover, disabled states)
  - User menu dropdown
  - Theme toggle (light/dark)
  - Mobile hamburger menu
  
- **Sidebar Navigation** (for Library/Settings)
  - Collapsible/expandable states
  - Section headers
  - Active item highlighting
  - Nested navigation items
  - Icon + text layout

#### 2. Base UI Components
- **Buttons**
  - Variants: primary, secondary, outline, ghost, destructive
  - Sizes: sm, default, lg
  - States: default, hover, active, disabled, loading
  - With icons (left/right positions)

- **Form Controls**
  - Text input (all states + validation)
  - Textarea (resizable, character count)
  - Select/Dropdown
  - Checkbox
  - Radio button
  - Switch/Toggle
  - Slider
  - Date picker

- **Cards**
  - Basic card
  - Card with header/footer
  - Clickable card
  - Card with actions

- **Modals/Dialogs**
  - Standard modal (header, body, footer)
  - Confirmation dialog
  - Alert dialog
  - Full-screen modal

- **Toast Notifications**
  - Success, error, warning, info variants
  - With/without actions
  - Auto-dismiss timer

- **Loading States**
  - Spinner (sizes: sm, md, lg)
  - Skeleton loaders (text, card, list)
  - Progress bars
  - Full-page loader

- **Empty States**
  - No data illustration
  - No search results
  - Error states
  - First-time user states

---

## 📦 Stage 1: Backend Setup (Stories 10-11)
**Timeline**: Week 1
**Design Requirements**: NONE - Backend only

No UI designs needed for these stories as they involve:
- Story 10: Architecture setup
- Story 11: Database schema creation

---

## 📁 Stage 2: Folder Management (Story 12)
**Timeline**: Week 2
**Priority**: HIGH - First visible UI

### Main Screen: Library View (`/library`)

#### Layout Structure
```
┌─────────────────────────────────────────┐
│ Header (Navigation)                     │
├─────────────┬───────────────────────────┤
│ Sidebar     │ Main Content Area         │
│ (250px)     │                           │
│             │ ┌───────────────────────┐ │
│ Folders     │ │ Search & Filters      │ │
│ Tree        │ ├───────────────────────┤ │
│             │ │ Prompt Grid/List      │ │
│             │ │                       │ │
│             │ └───────────────────────┘ │
└─────────────┴───────────────────────────┘
```

### Required Components

#### 1. Folder Tree (Left Sidebar)
- **Root Level**: "All Prompts" item
- **Folder Items**:
  - Folder icon (open/closed states)
  - Folder name
  - Count badge (number of prompts)
  - Hover state with action icons
  - Selected/active state
  - Drag handle (for reordering)
- **Actions**:
  - Add folder button
  - Context menu (right-click):
    - Rename
    - Delete
    - New subfolder (if nesting allowed)
- **Empty State**: "No folders yet" message

#### 2. Folder Actions
- **Create Folder Modal**:
  - Modal title: "Create New Folder"
  - Name input field
  - Color picker (optional)
  - Icon selector (optional)
  - Cancel/Create buttons
  
- **Rename Folder Modal**:
  - Current name pre-filled
  - Validation messages
  
- **Delete Folder Confirmation**:
  - Warning message
  - Checkbox: "Move prompts to 'Uncategorized'"
  - Cancel/Delete buttons

#### 3. Drag & Drop Visual Feedback
- **Dragging State**:
  - Ghost image of folder
  - Drop zones highlighted
  - Invalid drop zones grayed out
  
- **Drop Indicators**:
  - Blue line showing where folder will be placed
  - Hover state on valid drop zones

### Mobile Responsive Design
- Sidebar becomes bottom sheet or hamburger menu
- Folder tree in modal/drawer
- Touch-friendly tap targets (min 44px)

---

## 📝 Stage 3: Prompt CRUD Operations (Story 13)
**Timeline**: Week 3
**Priority**: HIGH - Core functionality

### Required Screens

#### 1. Prompt Grid/List View (Part of Library)
**Grid View**:
- **Prompt Card** (280px x 200px):
  - Thumbnail/icon area
  - Title (truncated with ellipsis)
  - Description (2 lines max)
  - Folder badge
  - Last modified date
  - Hover state with actions:
    - Edit
    - Duplicate
    - Delete
    - Move to folder
  - Selection checkbox (top-left)

**List View**:
- **Prompt Row**:
  - Checkbox | Icon | Title | Description | Folder | Modified | Actions
  - Hover highlight
  - Click to expand preview

#### 2. Create/Edit Prompt Screen (`/prompts/new` or `/prompts/[id]/edit`)

**Layout**:
```
┌────────────────────────────────────────┐
│ Top Bar                                │
│ [Back] Title Input [Save] [More ▼]    │
├────────────────────────────────────────┤
│ Prompt Settings Bar                    │
│ [Folder ▼] [Tags] [Share] [Settings]   │
├─────────────┬──────────────────────────┤
│ Left Panel  │ Right Panel              │
│             │                          │
│ Modules     │ Preview                  │
│ List        │ (Live updated)           │
│             │                          │
└─────────────┴──────────────────────────┘
```

**Components**:
- **Title Input**: Large, prominent, auto-save
- **Description Field**: Expandable textarea
- **Save Indicator**: "Saving..." / "Saved" / "Error"
- **Action Menu**: Duplicate, Export, Delete, Version History

#### 3. Delete Confirmation Dialog
- Title: "Delete Prompt?"
- Message: "This action cannot be undone."
- Prompt name displayed
- Cancel/Delete buttons (destructive style)

#### 4. Prompt Quick Actions
- **Duplicate Modal**:
  - New name input
  - "Copy of [original]" default
  - Folder selection
  
- **Move to Folder Modal**:
  - Folder list with radio buttons
  - Search folders option
  - Create new folder link

### Validation States
- **Error States**:
  - Red border on invalid fields
  - Error message below field
  - Error icon

- **Success States**:
  - Green checkmark
  - Success toast notification

---

## 🔧 Stage 4: Module Builder (Story 14)
**Timeline**: Week 4
**Priority**: HIGH - Core builder functionality

### Module Management UI

#### 1. Module Palette (Left Panel in Builder)
**Design Requirements**:
- **Module List**:
  - Drag handle (6 dots)
  - Module number/index
  - Module name (editable inline)
  - Toggle (enabled/disabled)
  - Delete button (trash icon)
  - Reorder by dragging
  
- **Add Module Button**:
  - Prominent "+" button
  - Bottom of list or floating

#### 2. Module Editor (Center Panel)
**When Module Selected**:
```
┌─────────────────────────────────┐
│ Module Name (Editable)          │
│ ─────────────────────────────── │
│ Module Options:                 │
│ ┌─────────────────────────────┐ │
│ │ Option 1 (Default)          │ │
│ │ [Text editor area]          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Option 2                    │ │
│ │ [Text editor area]          │ │
│ └─────────────────────────────┘ │
│ [+ Add Option]                  │
└─────────────────────────────────┘
```

**Components**:
- **Module Header**:
  - Name field (inline editable)
  - Settings gear icon
  - Collapse/expand toggle

- **Option Cards**:
  - Option name/label
  - Radio button (for default selection)
  - Rich text editor
  - Delete option button
  - Drag to reorder

- **Rich Text Editor**:
  - Formatting toolbar (bold, italic, code, link)
  - Variable insertion button `{}`
  - Line numbers (optional)
  - Syntax highlighting for variables

#### 3. Drag & Drop Interactions
- **Module Dragging**:
  - Ghost module while dragging
  - Drop zone indicators between modules
  - Auto-scroll when near edges

- **Visual Feedback**:
  - Blue line for drop position
  - Smooth animations on reorder
  - Disabled state (grayed out)

#### 4. Module Templates (Optional)
- **Template Picker Modal**:
  - Common module types (Context, Instructions, Examples, etc.)
  - Preview of template content
  - "Use Template" button

---

## ⚙️ Stage 5: Module Options Editor (Story 15)
**Timeline**: Week 5
**Priority**: HIGH - Enhanced editing

### Options Configuration Panel

#### 1. Options Editor (Detail View)
**Expanded Option Card**:
```
┌──────────────────────────────────────┐
│ Option Name: [_______________] ⚙️ 🗑️  │
├──────────────────────────────────────┤
│ Description: [_______________]       │
│                                      │
│ Content:                             │
│ ┌──────────────────────────────────┐ │
│ │ [Rich text editor with           │ │
│ │  formatting toolbar]             │ │
│ │                                  │ │
│ │  {variable} insertion            │ │
│ └──────────────────────────────────┘ │
│                                      │
│ □ Set as default option              │
│ □ Required option                    │
│                                      │
│ [Conditions ▼] [Validation ▼]        │
└──────────────────────────────────────┘
```

#### 2. Option Settings Modal
- **Tabs**:
  - General (name, description)
  - Conditions (when to show)
  - Validation (rules)
  - Advanced (metadata)

#### 3. Option Controls
- **Control Types to Design**:
  - Text input
  - Number input
  - Select dropdown
  - Multi-select
  - Checkbox
  - Radio group
  - Slider (with min/max)
  - Date picker
  - Color picker
  - File upload

#### 4. Validation Rules UI
- **Rule Builder**:
  - Field selection
  - Condition (equals, contains, regex, etc.)
  - Value input
  - Error message customization
  - Add/remove rules

---

## 🔤 Stage 6: Variable System (Story 16)
**Timeline**: Week 6
**Priority**: HIGH - Dynamic content

### Variable Management UI

#### 1. Variable Insertion Popover
**Trigger**: Click `{}` button in text editor
```
┌─────────────────────────────┐
│ Insert Variable             │
├─────────────────────────────┤
│ 🔍 Search...                │
├─────────────────────────────┤
│ Recent:                     │
│ • userName                  │
│ • projectName               │
│ • currentDate               │
├─────────────────────────────┤
│ All Variables:              │
│ • companyName (text)        │
│ • userRole (select)         │
│ • taskCount (number)        │
│                             │
│ [+ Create New Variable]     │
└─────────────────────────────┘
```

#### 2. Variable Chip/Badge
**In-text Display**:
- Colored background (different color per type)
- Variable name
- Hover: tooltip with type and description
- Click: edit variable
- Color coding:
  - Blue: text
  - Green: number
  - Purple: select
  - Orange: date
  - Pink: boolean

#### 3. Create/Edit Variable Modal
```
┌──────────────────────────────────┐
│ Create Variable                  │
├──────────────────────────────────┤
│ Name: [_______________]          │
│                                  │
│ Type: [Select ▼]                 │
│       • Text                     │
│       • Number                   │
│       • Select                   │
│       • Multi-select             │
│       • Date                     │
│       • Boolean                  │
│                                  │
│ Description: [_______________]   │
│                                  │
│ Default Value: [___________]     │
│                                  │
│ □ Required                       │
│ □ Allow multiple values          │
│                                  │
│ [Type-specific options]          │
│                                  │
│ [Cancel] [Create Variable]       │
└──────────────────────────────────┘
```

#### 4. Variable Type-Specific Options
- **Text Variables**:
  - Min/max length
  - Pattern/regex
  - Placeholder text
  
- **Number Variables**:
  - Min/max values
  - Step increment
  - Unit suffix
  
- **Select Variables**:
  - Options list editor
  - Allow custom values toggle
  - Multi-select toggle

- **Date Variables**:
  - Date format
  - Min/max dates
  - Include time toggle

#### 5. Variable Autocomplete
- Inline dropdown as user types `{`
- Fuzzy search matching
- Type icons
- Description preview
- Tab/Enter to insert

---

## 👁️ Stage 7: Preview System (Story 17)
**Timeline**: Week 7
**Priority**: HIGH - Real-time feedback

### Preview Panel Design

#### 1. Preview Panel (Right side of builder)
```
┌────────────────────────────────────┐
│ Preview                  [⚙️] [⤢]  │
├────────────────────────────────────┤
│ [Raw] [Formatted] [Markdown]       │
├────────────────────────────────────┤
│                                    │
│ Module 1: Context                  │
│ ─────────────────────             │
│ You are a {role} helping with      │
│ {task}. The user's name is         │
│ {userName}.                        │
│                                    │
│ Module 2: Instructions             │
│ ─────────────────────             │
│ Please follow these guidelines:    │
│ 1. Be concise                     │
│ 2. Use examples                   │
│                                    │
│ [Copy to Clipboard] [Export]       │
└────────────────────────────────────┘
```

#### 2. Preview Modes
- **Raw View**: Plain text, monospace font
- **Formatted View**: With styling, headers, lists
- **Markdown View**: Rendered markdown
- **Code View**: Syntax highlighting

#### 3. Preview Toolbar
- View mode selector (tabs or dropdown)
- Copy button (with success feedback)
- Export menu (TXT, MD, JSON)
- Fullscreen toggle
- Settings (font size, wrap, theme)

#### 4. Variable Highlighting
- Variables shown as chips in preview
- Different colors for filled vs unfilled
- Hover to see current value
- Click to edit value (in preview mode)

#### 5. Fullscreen Preview Modal
- Larger text area
- Side-by-side: variables input | preview output
- Live updating as variables change
- Export options prominent

---

## 🔍 Stage 8: Search & Filtering (Story 18)
**Timeline**: Week 8
**Priority**: MEDIUM - Enhanced discovery

### Search and Filter UI

#### 1. Search Bar (Top of Library)
```
┌──────────────────────────────────────────┐
│ 🔍 Search prompts...          [Filters] │
└──────────────────────────────────────────┘
```

**Features**:
- Placeholder text with hint
- Clear button (X) when text present
- Search icon
- Filter button with count badge
- Recent searches dropdown

#### 2. Filter Panel (Dropdown or Sidebar)
```
┌─────────────────────────────┐
│ Filters              Clear  │
├─────────────────────────────┤
│ Folders:                    │
│ □ All folders               │
│ □ Work                      │
│ □ Personal                  │
│                             │
│ Tags:                       │
│ □ email                     │
│ □ report                    │
│ □ analysis                  │
│                             │
│ Date Modified:              │
│ ○ Any time                  │
│ ○ Today                     │
│ ○ This week                 │
│ ○ This month                │
│ ○ Custom range...           │
│                             │
│ Has Variables:              │
│ ○ Any                       │
│ ○ Yes                       │
│ ○ No                        │
│                             │
│ [Apply Filters]             │
└─────────────────────────────┘
```

#### 3. Search Results
- **Results Header**: "Showing X of Y prompts"
- **Sort Options**: Relevant, Name, Modified, Created
- **No Results State**: 
  - Illustration
  - "No prompts found"
  - Suggestions to refine search
  - Clear filters button

#### 4. Search Highlighting
- Yellow background on matched terms
- In titles, descriptions, and content
- Number of matches per item

#### 5. Filter Tags
- Active filters shown as removable chips
- "Clear all" link
- Visual indication when filters active

---

## 📤 Stage 9: Import/Export (Story 19)
**Timeline**: Week 9
**Priority**: MEDIUM - Data portability

### Import/Export Interface

#### 1. Import Wizard (Multi-step)
**Step 1: Select Source**
```
┌────────────────────────────────────┐
│ Import Prompts (Step 1 of 3)      │
├────────────────────────────────────┤
│ Choose import source:              │
│                                    │
│ ┌─────────┐ ┌─────────┐           │
│ │   📁    │ │   📋    │           │
│ │  File   │ │  Paste  │           │
│ └─────────┘ └─────────┘           │
│                                    │
│ ┌─────────┐ ┌─────────┐           │
│ │   🔗    │ │   📦    │           │
│ │   URL   │ │ Service │           │
│ └─────────┘ └─────────┘           │
│                                    │
│ [Cancel] [Next: Upload →]          │
└────────────────────────────────────┘
```

**Step 2: Upload/Configure**
```
┌────────────────────────────────────┐
│ Import Prompts (Step 2 of 3)      │
├────────────────────────────────────┤
│ Upload File:                       │
│ ┌──────────────────────────────┐   │
│ │     Drag & drop file here    │   │
│ │           - or -              │   │
│ │     [Browse Files]            │   │
│ │                               │   │
│ │  Supports: JSON, CSV, TXT     │   │
│ └──────────────────────────────┘   │
│                                    │
│ ☑️ prompts-export.json (2.4 MB)    │
│                                    │
│ [← Back] [Next: Preview →]         │
└────────────────────────────────────┘
```

**Step 3: Preview & Map**
```
┌────────────────────────────────────┐
│ Import Prompts (Step 3 of 3)      │
├────────────────────────────────────┤
│ Found 24 prompts to import:        │
│                                    │
│ ☑️ Email Templates (15)             │
│ ☑️ Report Generators (5)            │
│ ☑️ Code Assistants (4)              │
│                                    │
│ Import Options:                    │
│ □ Skip duplicates                  │
│ □ Merge with existing              │
│ □ Create in folder: [Select ▼]     │
│                                    │
│ Conflicts (3):                     │
│ ⚠️ "Daily Report" already exists    │
│   ○ Skip  ○ Replace  ○ Rename     │
│                                    │
│ [← Back] [Import 24 Prompts]       │
└────────────────────────────────────┘
```

#### 2. File Upload Zone
- **States**:
  - Default: Dashed border, upload icon
  - Hover: Solid border, highlighted
  - Dragging: Blue border, drop message
  - Uploading: Progress bar
  - Success: Green check, file name
  - Error: Red border, error message

#### 3. Export Dialog
```
┌────────────────────────────────────┐
│ Export Prompts                     │
├────────────────────────────────────┤
│ Export Format:                     │
│ ○ JSON (Recommended)               │
│ ○ CSV (Spreadsheet)                │
│ ○ Markdown (Documentation)         │
│ ○ Plain Text                       │
│                                    │
│ Export Options:                    │
│ ☑️ Include variables                │
│ ☑️ Include module options           │
│ ☑️ Include metadata                 │
│ □ Include version history          │
│                                    │
│ Prompts to Export:                 │
│ ○ All prompts (47)                 │
│ ○ Current folder only (12)         │
│ ○ Selected prompts (3)             │
│                                    │
│ [Cancel] [Export]                  │
└────────────────────────────────────┘
```

#### 4. Progress Indicators
- **Import Progress**:
  - Progress bar with percentage
  - Current item being processed
  - Time remaining estimate
  - Cancel button

- **Success State**:
  - Green checkmark
  - "Successfully imported X prompts"
  - View imported prompts button
  - Close button

---

## 🔐 Stage 10: Advanced Features (Stories 110-115)
**Timeline**: Weeks 10-12
**Priority**: MEDIUM - Enhancement features

### Story 110: API Key Management
**Settings Screen** (`/settings/api-keys`):
```
┌────────────────────────────────────────┐
│ API Keys                               │
├────────────────────────────────────────┤
│ [+ Add API Key]                        │
│                                        │
│ Your API Keys:                         │
│ ┌──────────────────────────────────┐   │
│ │ OpenAI                           │   │
│ │ Name: Primary OpenAI Key         │   │
│ │ Added: Oct 15, 2024              │   │
│ │ Last used: 2 hours ago           │   │
│ │ [Test] [Edit] [Delete]           │   │
│ └──────────────────────────────────┘   │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │ Anthropic                        │   │
│ │ Name: Claude API                 │   │
│ │ Added: Oct 10, 2024              │   │
│ │ Status: ✅ Active                 │   │
│ │ [Test] [Edit] [Delete]           │   │
│ └──────────────────────────────────┘   │
└────────────────────────────────────────┘
```

### Story 111: Prompt Execution Panel
**Execution View** (`/prompts/[id]/execute`):
- Provider selector dropdown
- Model selector
- Parameter controls (temperature, max tokens)
- Execute button with loading state
- Response display area
- Token usage display
- Copy response button

### Story 112: Extension Sync
**Sync Status Indicator**:
- Sync icon in header
- Last sync timestamp
- Manual sync button
- Sync settings modal

### Story 113: Subscription Tier Limits
**Upgrade Prompts**:
- Soft limit warning banner
- Hard limit modal
- Usage progress bars
- Upgrade CTA buttons
- Feature comparison table

### Story 114: Performance Optimization
**Loading States**:
- Skeleton loaders for all components
- Progressive loading indicators
- Cached state indicators
- Optimistic UI updates

### Story 115: Mobile Responsive
**Mobile-Specific Designs**:
- Bottom navigation bar
- Swipe gestures
- Touch-friendly controls (min 44px)
- Responsive grid layouts
- Mobile modals/sheets

---

## 📱 Responsive Design Requirements

### Breakpoints
Design for these screen sizes:

1. **Mobile** (320px - 767px)
   - Single column layouts
   - Bottom sheets instead of sidebars
   - Hamburger menu
   - Touch-optimized controls

2. **Tablet** (768px - 1023px)
   - Two column layouts
   - Collapsible sidebars
   - Hybrid navigation

3. **Desktop** (1024px - 1439px)
   - Full three-panel layouts
   - Persistent sidebars
   - Hover interactions

4. **Wide** (1440px+)
   - Maximum content width
   - Additional panels
   - Enhanced previews

---

## 🎨 Design Handoff Checklist

For each component/screen, provide:

### Required Deliverables
- [ ] Light mode design
- [ ] Dark mode design
- [ ] All interactive states (hover, active, focus, disabled)
- [ ] Mobile responsive version
- [ ] Empty states
- [ ] Loading states
- [ ] Error states
- [ ] Success states

### Specifications
- [ ] Colors (hex values)
- [ ] Typography (font, size, weight, line-height)
- [ ] Spacing (margins, padding)
- [ ] Border radius values
- [ ] Shadow specifications
- [ ] Animation/transition specs

### Assets
- [ ] Icons (SVG format)
- [ ] Illustrations (if any)
- [ ] Component library file
- [ ] Design system documentation

---

## 📅 Design Timeline

| Week | Story | Screens/Components | Priority |
|------|-------|-------------------|----------|
| 0 | Setup | Design system, base components | CRITICAL |
| 1 | 10-11 | None (backend) | - |
| 2 | 12 | Library view, Folder management | HIGH |
| 3 | 13 | Prompt CRUD, Cards, Forms | HIGH |
| 4 | 14 | Module builder, Drag-drop | HIGH |
| 5 | 15 | Options editor, Controls | HIGH |
| 6 | 16 | Variables, Chips, Popovers | HIGH |
| 7 | 17 | Preview panel, View modes | HIGH |
| 8 | 18 | Search, Filters, Results | MEDIUM |
| 9 | 19 | Import/Export wizards | MEDIUM |
| 10-12 | 110-115 | Advanced features | MEDIUM |

---

## 💡 Design Tips for Junior Designer

### Best Practices
1. **Start with mobile** - Design mobile-first, then scale up
2. **Use existing patterns** - Reference shadcn/ui components
3. **Maintain consistency** - Use the design system tokens
4. **Consider states** - Design all states, not just the happy path
5. **Think in components** - Build reusable components
6. **Document decisions** - Note why design choices were made

### Common Pitfalls to Avoid
1. **Don't skip edge cases** - Empty, error, and loading states are crucial
2. **Don't forget dark mode** - Design both themes from the start
3. **Don't use random spacing** - Stick to the spacing scale
4. **Don't create new patterns** - Use existing UI patterns when possible
5. **Don't forget accessibility** - Ensure proper contrast and touch targets

### Resources
- [shadcn/ui Components](https://ui.shadcn.com) - Reference for component patterns
- [Tailwind CSS](https://tailwindcss.com) - For understanding the utility classes
- [Lucide Icons](https://lucide.dev) - Icon library being used
- [Figma Components](https://www.figma.com/community) - Community resources

---

## 🚀 Getting Started

1. **Set up Figma file** with the design system
2. **Create component library** with base components
3. **Start with Story 12** (Folder Management) as it's the first UI
4. **Review with developers** after each story completion
5. **Iterate based on feedback** before moving to next story

Remember: Each story builds on the previous ones. Complete them in order to maintain consistency and avoid rework.

---

*This roadmap should be reviewed weekly with the development team to ensure alignment between design and implementation.*
