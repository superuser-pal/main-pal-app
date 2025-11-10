# BMAD Migration Report: v4 → v6

**Migration Date**: 2025-11-10
**Previous Version**: v4.44.1 (BMAD Core)
**New Version**: v6.0.0-alpha.8 (BMAD with BMM)

---

## Executive Summary

Successfully migrated from BMAD v4 (`.bmad-core`) to BMAD v6 (`.bmad`) with the BMM (BMAD Method Manager) module. All project-specific configurations have been preserved and translated to the new v6 configuration format.

---

## Configuration Migration Summary

### Migrated Settings

| v4 Setting | v6 Setting | Value | Purpose |
|------------|------------|-------|---------|
| `markdownExploder` | `markdown_exploder` | `true` | Enable document sharding |
| `slashPrefix` | `slash_prefix` | `BMad` | Slash command prefix |
| `prd.prdFile` | `prd.file` | `docs/prd.md` | PRD file location |
| `prd.prdSharded` | `prd.sharded` | `true` | Enable PRD sharding |
| `prd.prdShardedLocation` | `prd.sharded_location` | `docs/prd` | PRD shard directory |
| `prd.epicFilePattern` | `prd.epic_file_pattern` | `epic-{n}*.md` | Epic file naming |
| `architecture.architectureFile` | `architecture.file` | `docs/architecture.md` | Architecture file |
| `architecture.architectureSharded` | `architecture.sharded` | `true` | Enable arch sharding |
| `architecture.architectureShardedLocation` | `architecture.sharded_location` | `docs/architecture` | Arch shard directory |
| `devStoryLocation` | `dev.story_location` | `docs/stories` | Story files location |
| `devDebugLog` | `dev.debug_log` | `.ai/debug-log.md` | Debug log location |
| `devLoadAlwaysFiles` | `dev.load_always_files` | Array of 3 files | Always-load files |
| `qa.qaLocation` | `qa.location` | `docs/qa` | QA documentation |
| N/A | `tech_docs` | `{project-root}/docs` | Technical docs path |

### New v6 Settings

Additional settings introduced in v6:

```yaml
project_name: main-pal-app
user_skill_level: intermediate
tech_docs: '{project-root}/docs'
dev_ephemeral_location: '{project-root}/.bmad-ephemeral'
tea_use_mcp_enhancements: true
user_name: Rod
communication_language: English
document_output_language: English
output_folder: '{project-root}/docs'
install_user_docs: true

# Testing paths (added post-migration)
testing:
  playwright_docs: docs/testing/playwright
  test_reports: docs/testing/reports
  test_plans: docs/testing/plans
```

---

## Architectural Changes

### Directory Structure Evolution

**v4** → **v6**:
- `.bmad-core/` → `.bmad/` (organized into core/bmm/\_cfg)
- Flat task structure → Phase-based workflow structure (1-analysis, 2-plan-workflows, 3-solutioning, 4-implementation)
- Single `core-config.yaml` → Hierarchical config system (core + module configs)
- Cursor-only → Multi-IDE support (Claude Code + Cursor)

### Key Improvements

1. **Modular Organization**: Workflows organized by SDLC phase
2. **Separation of Concerns**: Core vs. module-specific functionality
3. **Test Architecture**: New dedicated test knowledge base (`.bmad/bmm/testarch/`)
4. **Enhanced Documentation**: Comprehensive docs in `.bmad/bmm/docs/`
5. **Workflow Status Tracking**: New workflow status management system

---

## Agent Evolution

### Changes

**Removed/Renamed**:
- `bmad-orchestrator` → Enhanced `bmad-master`
- `po` (Product Owner) → Merged into `pm`
- `qa` (Quality Assurance) → Replaced by testarch workflows
- `ux-expert` → Renamed to `ux-designer`

**New Agents**:
- `tea` (Technical Engineering Architect)
- `tech-writer` (Documentation specialist)

**Retained**: `analyst`, `architect`, `dev`, `pm`, `sm`, `ux-designer`

---

## Workflow Evolution

### v4 Workflows (6 files, flat)
```
brownfield-fullstack.yaml
brownfield-service.yaml
brownfield-ui.yaml
greenfield-fullstack.yaml
greenfield-service.yaml
greenfield-ui.yaml
```

### v6 Workflows (40+ workflows, phase-organized)

**Phase 1 - Analysis**:
- brainstorm-project
- domain-research
- product-brief
- research (market, technical, deep-prompt)

**Phase 2 - Planning**:
- create-ux-design
- prd (with epic creation)
- tech-spec (Level 0 and Level 1)

**Phase 3 - Solutioning**:
- architecture
- solutioning-gate-check

**Phase 4 - Implementation**:
- create-story
- story-ready
- dev-story
- story-done
- code-review
- correct-course
- epic-tech-context
- story-context
- sprint-planning
- retrospective

**Supporting Workflows**:
- document-project (brownfield documentation)
- testarch/* (test architecture workflows)
- workflow-status (workflow tracking)

---

## New Features in v6

### 1. Test Architecture Module

Complete test knowledge base in `.bmad/bmm/testarch/knowledge/`:
- Component TDD, Contract testing, Email/Auth testing
- Error handling, Feature flags, Fixture architecture
- Network-first testing, NFR criteria, Playwright config
- Risk governance, Selector resilience, Test healing
- Test levels framework, Test priorities matrix, Visual debugging

### 2. Enhanced Workflow System

New workflows:
- **Brainstorm Project**: Facilitated brainstorming
- **Domain Research**: Domain-specific analysis
- **UX Design**: Comprehensive UX workflow
- **Solutioning Gate Check**: Quality gates
- **Epic Tech Context**: Technical context generation
- **Story Context**: Dynamic context assembly
- **Code Review**: Automated reviews
- **Retrospective**: Epic retrospectives

### 3. Documentation Standards

New `techdoc/documentation-standards.md` for consistent practices.

### 4. Multi-IDE Support

Enhanced IDE configuration for Claude Code and Cursor.

---

## Project-Specific Customizations Preserved

### Document Locations ✓
- PRD: `docs/prd.md` → `docs/prd/` (sharded)
- Architecture: `docs/architecture.md` → `docs/architecture/` (sharded)
- Stories: `docs/stories/`
- QA: `docs/qa/`
- Technical docs: `docs/`
- Testing: `docs/testing/` (playwright, reports, plans)

### Development Settings ✓
- Debug log: `.ai/debug-log.md`
- Always-load files:
  - `docs/architecture/coding-standards.md`
  - `docs/architecture/tech-stack.md`
  - `docs/architecture/source-tree.md`

### Custom Patterns ✓
- Epic naming: `epic-{n}*.md`
- Markdown exploder: Enabled
- Slash prefix: `BMad`

---

## Recommendations

### Immediate Actions

1. ✅ **Completed**: Configuration migrated
2. ⏳ **Recommended**: Test workflows with new v6 structure
3. ⏳ **Recommended**: Validate slash commands (use `/bmad:*` prefix)
4. ⏳ **Recommended**: Archive `v4-backup/` after validation

### Workflow Usage

**Initialize Project**:
```
/bmad:bmm:workflows:workflow-init
```

**Check Status**:
```
/bmad:bmm:workflows:workflow-status
```

**Story Development Flow**:
```
/bmad:bmm:workflows:create-story
/bmad:bmm:workflows:story-ready
/bmad:bmm:workflows:dev-story
/bmad:bmm:workflows:story-done
```

### Configuration Validation

Test these settings:
- PRD sharding in `docs/prd/`
- Architecture sharding in `docs/architecture/`
- Story files in `docs/stories/`
- Slash commands with `/bmad:` prefix

---

## v6 Documentation Resources

Located in [.bmad/bmm/docs/](.bmad/bmm/docs/):
- `quick-start.md` - Getting started
- `brownfield-guide.md` - Working with existing codebases
- `workflow-architecture-reference.md` - Workflow system
- `agents-guide.md` - Agent usage
- `party-mode.md` - Multi-agent conversations
- `scale-adaptive-system.md` - Scale system explained

---

## Migration Checklist

- [x] Backup v4 to `v4-backup/`
- [x] Install BMAD v6 with BMM
- [x] Migrate config: `core-config.yaml` → `config.yaml`
- [x] Fix tech_docs path: `(docs)` → `docs`
- [x] Preserve document locations
- [x] Preserve development settings
- [x] Enable multi-IDE support
- [ ] Validate workflow execution
- [ ] Test slash commands
- [ ] Verify document sharding
- [ ] Archive v4-backup

---

## Conclusion

Migration completed successfully. All project-specific customizations from v4 have been preserved in the new v6 configuration format. The enhanced v6 architecture provides:

- **Better Organization**: Phase-based workflow structure
- **Enhanced Capabilities**: Test architecture, UX design, code review workflows
- **Multi-IDE Support**: Claude Code + Cursor
- **Improved Documentation**: Comprehensive method guides

Next steps: Validate workflows and confirm slash commands work correctly.

---

**Configuration Files**:
- BMM Config: [.bmad/bmm/config.yaml](.bmad/bmm/config.yaml)
- Core Config: [.bmad/core/config.yaml](.bmad/core/config.yaml)
- Manifest: [.bmad/_cfg/manifest.yaml](.bmad/_cfg/manifest.yaml)

**Report Version**: 1.0
**Generated**: 2025-11-10
