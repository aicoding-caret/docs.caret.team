#!/bin/bash

# Automated script to update Caret documentation from Cline source
# Usage: ./update-from-cline-docs.sh [cline-docs-path] [target-language]
# Example: ./update-from-cline-docs.sh /path/to/cline/docs en

CLINE_DOCS_PATH=${1:-"../cline/docs"}
TARGET_LANG=${2:-"en"}
TARGET_DIR="docs-${TARGET_LANG}"

echo "🔄 Starting Cline docs update process"
echo "📁 Source: $CLINE_DOCS_PATH"
echo "🎯 Target: $TARGET_DIR"

# Step 1: Check if Cline docs exist
if [ ! -d "$CLINE_DOCS_PATH" ]; then
    echo "❌ Error: Cline docs not found at $CLINE_DOCS_PATH"
    echo "Please provide the correct path to Cline docs as first argument"
    exit 1
fi

# Step 2: Backup existing what-is-caret.mdx if it exists (preserve fork attribution)
if [ -f "$TARGET_DIR/getting-started/what-is-caret.mdx" ]; then
    echo "💾 Backing up what-is-caret.mdx to preserve fork attribution"
    cp "$TARGET_DIR/getting-started/what-is-caret.mdx" "/tmp/what-is-caret-backup.mdx"
fi

# Step 3: Copy updated Cline docs to English directory (overwrite everything)
echo "📂 Copying Cline docs to $TARGET_DIR"
if [ "$TARGET_LANG" = "en" ]; then
    # For English, copy directly from Cline docs
    rsync -av --delete "$CLINE_DOCS_PATH/" "$TARGET_DIR/" --exclude="*.json"
else
    echo "⚠️  Warning: This script currently only supports English (en) updates"
    echo "For other languages, copy English first, then run translation"
    exit 1
fi

# Step 4: Restore what-is-caret.mdx with fork attribution if backup exists
if [ -f "/tmp/what-is-caret-backup.mdx" ]; then
    echo "🔄 Restoring what-is-caret.mdx with Cline attribution"
    mv "/tmp/what-is-caret-backup.mdx" "$TARGET_DIR/getting-started/what-is-caret.mdx"
fi

# Step 5: Run conversion scripts to transform content
echo "🔧 Running Mintlify to Docusaurus conversion"
if [ -f "./scripts/mintlify-to-docusaurus-converter-v2.sh" ]; then
    ./scripts/mintlify-to-docusaurus-converter-v2.sh "$TARGET_DIR"
else
    echo "⚠️  Warning: Mintlify converter not found, skipping conversion"
fi

# Step 6: Run Cline to Caret branding replacement
echo "🎨 Converting Cline branding to Caret"
if [ -f "./scripts/cline-to-caret-content-replacer.sh" ]; then
    ./scripts/cline-to-caret-content-replacer.sh "$TARGET_DIR"
else
    echo "⚠️  Warning: Content replacer not found, skipping branding conversion"
fi

# Step 7: Run file renaming
echo "📝 Renaming files from Cline to Caret"
if [ -f "./scripts/cline-to-caret-renamer.sh" ]; then
    ./scripts/cline-to-caret-renamer.sh "$TARGET_DIR"
else
    echo "⚠️  Warning: File renamer not found, skipping file renaming"
fi

# Step 8: Fix any remaining component issues
echo "🔧 Fixing remaining component formatting"
if [ -f "./scripts/fix-all-components.sh" ]; then
    ./scripts/fix-all-components.sh "$TARGET_DIR"
else
    echo "⚠️  Warning: Component fixer not found, skipping component fixes"
fi

# Step 9: Update sidebar configuration
echo "📋 Updating sidebar configuration"
SIDEBAR_FILE="sidebars-${TARGET_LANG}.ts"
if [ -f "$SIDEBAR_FILE" ]; then
    # Update sidebar references from cline to caret
    sed -i "s/'exploring-clines-tools/'exploring-carets-tools/g" "$SIDEBAR_FILE"
    sed -i "s/'getting-started\/installing-cline'/'getting-started\/installing-caret'/g" "$SIDEBAR_FILE"
    sed -i "s/'getting-started\/what-is-cline'/'getting-started\/what-is-caret'/g" "$SIDEBAR_FILE"
    sed -i "s/'features\/cline-rules'/'features\/caret-rules'/g" "$SIDEBAR_FILE"
    sed -i "s/'prompting\/cline-memory-bank'/'prompting\/caret-memory-bank'/g" "$SIDEBAR_FILE"
    sed -i "s/'provider-config\/litellm-and-cline-using-codestral'/'provider-config\/litellm-and-caret-using-codestral'/g" "$SIDEBAR_FILE"
    sed -i "s/'exploring-clines-tools\/cline-tools-guide'/'exploring-carets-tools\/caret-tools-guide'/g" "$SIDEBAR_FILE"
    echo "✅ Updated $SIDEBAR_FILE"
else
    echo "⚠️  Warning: Sidebar file $SIDEBAR_FILE not found"
fi

# Step 10: Show summary
echo ""
echo "✅ Cline docs update completed!"
echo "📋 Summary:"
echo "  - Copied latest Cline docs to $TARGET_DIR"
echo "  - Preserved Caret fork attribution in what-is-caret.mdx"
echo "  - Applied Mintlify to Docusaurus conversion"
echo "  - Converted Cline branding to Caret branding"
echo "  - Renamed files and directories"
echo "  - Fixed component formatting"
echo "  - Updated sidebar configuration"
echo ""
echo "🚀 Next steps:"
echo "  1. Review changes with: git diff"
echo "  2. Test the documentation: npm start"
echo "  3. If updating non-English docs, run translations"
echo "  4. Commit changes when satisfied"
echo ""
echo "💡 For other languages, copy from English then translate:"
echo "   cp -r docs-en/* docs-[lang]/"
echo "   # Then apply translations to the copied content"