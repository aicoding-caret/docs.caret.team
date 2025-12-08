# Caret Docs Update Master Plan - 2025-12-01

## 1. Project Structure & Status
- **Root**: `/home/luke/dev/docs.caret.team`
- **Core Directories**:
    - `caret/`: Submodule/folder tracking the upstream `caret` repository (currently synced to `origin/main`).
    - `docs-en/`: English documentation, recently updated from `caret/docs` via scripts.
    - `docs-ko/`: Korean documentation (target for translation).
    - `scripts/`: Automation scripts for updating and converting docs.
- **Current Status**:
    - `caret` folder updated to latest `main`.
    - `docs-en` updated with latest content from `caret`, converted to Docusaurus format, and branding updated to 'Caret'.
    - `sidebars-en.ts` updated to reflect the new structure.
    - Build (`npm run build`) verified successfully.

## 2. Workflow
1.  **Analyze Changes**: Identify what has changed in the latest version compared to the previous state.
2.  **Translate & Convert**:
    - Read updated English docs (`docs-en`).
    - Translate content to Korean (`docs-ko`).
    - Ensure 'Caret' branding and specific features are correctly represented in both languages.
3.  **Verify & Feedback**:
    - Start local server (`npm start`).
    - Review changes in the browser.
    - Receive user feedback and iterate.

## 3. Progress Log

### Phase 1: Initialization & Sync (Completed)
- [x] Check git status and `caret` folder.
- [x] Force sync `caret` folder to `origin/main`.
- [x] Run `scripts/update-from-cline-docs.sh` to update `docs-en`.
- [x] Fix `sidebars-en.ts` to resolve build errors (removed dead links, updated structure).
- [x] Remove duplicate file in `docs-en/merging/` to fix routing warning.
- [x] Verify build with `npm run build`.

### Phase 2: Translation & Content Update (Current)
- [ ] **Identify Changes**: Compare `docs-en` (new) vs `docs-ko` (old) or check git diffs to see what needs translation.
- [ ] **Translate**: Update `docs-ko` files to match `docs-en`.
    - Priority: New features, changed structures.
- [ ] **Caret Conversion**: Ensure all 'Cline' references are appropriately changed to 'Caret' in Korean docs (English is already done by script).

### Phase 3: Review
- [ ] Start development server.
- [ ] User feedback loop.
