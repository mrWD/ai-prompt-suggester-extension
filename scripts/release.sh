#!/bin/bash

# AI Prompt Suggester - Release Script
# Usage: ./scripts/release.sh [version]
# Example: ./scripts/release.sh 1.2.0

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if version is provided
if [ -z "$1" ]; then
    print_error "Version number is required!"
    echo "Usage: ./scripts/release.sh [version]"
    echo "Example: ./scripts/release.sh 1.2.0"
    exit 1
fi

VERSION="$1"
TAG="v$VERSION"

# Validate version format (semantic versioning)
if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "Invalid version format! Use semantic versioning (e.g., 1.2.0)"
    exit 1
fi

print_status "Starting release process for version $VERSION..."

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "You're not on the main branch (currently on: $CURRENT_BRANCH)"
    echo -n "Do you want to continue? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_error "Release cancelled."
        exit 1
    fi
fi

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
    print_error "Working directory is not clean. Please commit your changes first."
    git status --short
    exit 1
fi

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
    print_error "Tag $TAG already exists!"
    exit 1
fi

# Pull latest changes
print_status "Pulling latest changes..."
git pull origin "$CURRENT_BRANCH"

# Update version in manifest.json
print_status "Updating version in manifest.json..."
if [ -f "manifest.json" ]; then
    # Create backup
    cp manifest.json manifest.json.bak

    # Update version using sed
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" manifest.json
    else
        # Linux
        sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" manifest.json
    fi

    # Verify the change
    if grep -q "\"version\": \"$VERSION\"" manifest.json; then
        print_success "Version updated in manifest.json"
    else
        print_error "Failed to update version in manifest.json"
        mv manifest.json.bak manifest.json  # Restore backup
        exit 1
    fi

    # Remove backup
    rm manifest.json.bak
else
    print_error "manifest.json not found!"
    exit 1
fi

# Show diff
print_status "Changes made:"
git diff manifest.json

# Commit version update
echo -n "Commit version update? (Y/n): "
read -r response
if [[ ! "$response" =~ ^[Nn]$ ]]; then
    print_status "Committing version update..."
    git add manifest.json
    git commit -m "🔖 Bump version to $VERSION"

    print_status "Pushing version update..."
    git push origin "$CURRENT_BRANCH"
fi

# Create and push tag
print_status "Creating tag $TAG..."
git tag -a "$TAG" -m "Release version $VERSION

🚀 Auto-deployment will begin shortly.

## What's new in this version:
- [Add your release notes here]

## Links:
- Chrome Web Store: [Will be updated after deployment]
- Firefox Add-ons: [Will be updated after deployment]
"

print_status "Pushing tag to trigger deployment..."
git push origin "$TAG"

print_success "🎉 Release $VERSION initiated!"
echo
echo "Next steps:"
echo "1. 🤖 GitHub Actions will automatically build and deploy"
echo "2. 📱 Check the Actions tab: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/actions"
echo "3. 📦 GitHub release will be created automatically"
echo "4. 🏪 Extensions will be uploaded to both stores"
echo "5. ⏳ Wait for store review processes to complete"
echo
print_warning "Remember to update the release notes in the GitHub release!"