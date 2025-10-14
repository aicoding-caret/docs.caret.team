#!/bin/bash

# Fix internal documentation links in Korean docs
# Adds /ko prefix to internal links

set -e

TARGET_DIR="${1:-docs-ko}"

echo "🔧 Fixing internal documentation links in $TARGET_DIR..."

# Function to fix links in a file
fix_file_links() {
    local file="$1"
    echo "Processing: $file"

    # Backup original file
    cp "$file" "$file.backup"

    # Fix links - add /ko prefix to internal links that don't have it
    # Pattern: ](/features/ or ](/getting-started/ etc.
    sed -i '' \
        -e 's|](\/features\/|](\/ko\/features\/|g' \
        -e 's|](\/getting-started\/|](\/ko\/getting-started\/|g' \
        -e 's|](\/prompting\/|](\/ko\/prompting\/|g' \
        -e 's|](\/provider-config\/|](\/ko\/provider-config\/|g' \
        -e 's|](\/mcp\/|](\/ko\/mcp\/|g' \
        -e 's|](\/running-models-locally\/|](\/ko\/running-models-locally\/|g' \
        -e 's|](\/troubleshooting\/|](\/ko\/troubleshooting\/|g' \
        -e 's|](\/exploring-carets-tools\/|](\/ko\/exploring-carets-tools\/|g' \
        -e 's|](\/enterprise-solutions\/|](\/ko\/enterprise-solutions\/|g' \
        -e 's|](\/more-info\/|](\/ko\/more-info\/|g' \
        "$file"

    # Check if file was actually modified
    if diff -q "$file" "$file.backup" > /dev/null 2>&1; then
        # No changes, remove backup
        rm "$file.backup"
        echo "  ✓ No changes needed"
    else
        echo "  ✓ Links fixed"
        rm "$file.backup"
    fi
}

# Find all .mdx files and fix their links
find "$TARGET_DIR" -name "*.mdx" -type f | while read -r file; do
    fix_file_links "$file"
done

echo ""
echo "✅ All links have been fixed!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff $TARGET_DIR"
echo "2. Test the site: npm start"
echo "3. Verify links work correctly in the browser"
