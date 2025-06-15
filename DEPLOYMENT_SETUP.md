# Auto-Deployment Setup Guide

This guide will help you set up automatic deployment to Chrome Web Store and Firefox Add-ons when you push version tags.

## 🚀 How It Works

1. **Push a version tag** (e.g., `v1.2.0`) to trigger deployment
2. **GitHub Actions** automatically builds and packages your extension
3. **Uploads to both stores** simultaneously
4. **Creates a GitHub release** with downloadable packages

## 📋 Prerequisites

Before setting up auto-deployment, you need:

1. **Published extensions** on both Chrome Web Store and Firefox Add-ons
2. **API credentials** from both platforms
3. **GitHub repository** with the extension code

## 🔧 Setup Instructions

### 1. Chrome Web Store Setup

#### A. Get Chrome Web Store API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Chrome Web Store API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Choose **Desktop application**
6. Note down your `Client ID` and `Client Secret`

#### B. Get Refresh Token

```bash
# Install the chrome-webstore-upload-cli
npm install -g chrome-webstore-upload-cli

# Generate refresh token (interactive)
chrome-webstore-upload-cli init
```

Follow the prompts to authenticate and get your refresh token.

#### C. Find Your Extension ID

Your Chrome extension ID is in the URL: `https://chrome.google.com/webstore/detail/[EXTENSION_ID]`

### 2. Firefox Add-ons Setup

#### A. Get Firefox API Credentials

1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Go to **Tools** → **API Key Management**
3. **Generate new credentials**
4. Note down your `JWT Issuer` and `JWT Secret`

#### B. Find Your Extension ID

Your Firefox extension ID is in your `manifest.json` under `browser_specific_settings.gecko.id`

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

#### Chrome Web Store Secrets:
```
CHROME_CLIENT_ID=your_chrome_client_id
CHROME_CLIENT_SECRET=your_chrome_client_secret
CHROME_REFRESH_TOKEN=your_chrome_refresh_token
CHROME_EXTENSION_ID=your_chrome_extension_id
```

#### Firefox Add-ons Secrets:
```
FIREFOX_JWT_ISSUER=your_firefox_jwt_issuer
FIREFOX_JWT_SECRET=your_firefox_jwt_secret
FIREFOX_EXTENSION_ID=your_firefox_extension_id
```

## 🎯 Usage

### Deploy a New Version

1. **Update your code** with the new features
2. **Commit and push** your changes to main branch
3. **Create and push a version tag**:

```bash
# Tag the current commit with version
git tag v1.2.0

# Push the tag to trigger deployment
git push origin v1.2.0
```

### Version Tag Format

Use semantic versioning with a `v` prefix:
- `v1.0.0` - Major release
- `v1.1.0` - Minor release
- `v1.1.1` - Patch release

## 📁 File Structure

The workflow creates this structure:

```
packages/
├── chrome-extension.zip     # For Chrome Web Store
├── firefox-extension.xpi    # For Firefox Add-ons
├── chrome/                  # Chrome build directory
└── firefox/                 # Firefox build directory
```

## ⚙️ Customization Options

### Modify Build Process

Edit the "Build extension" step in `.github/workflows/deploy.yml`:

```yaml
- name: Build extension
  run: |
    npm install
    npm run build
    # Add your custom build commands
```

### Change Trigger Conditions

Currently triggers on version tags (`v*`). You can modify:

```yaml
on:
  push:
    branches: [main]  # Deploy on every push to main
  # OR
  release:
    types: [published]  # Deploy on GitHub releases
```

### Auto-publish vs Manual Review

**Chrome**: Set `--auto-publish` to publish immediately, or remove it for manual review
**Firefox**: Extensions go through automatic review process

## 🔒 Security Best Practices

1. **Never commit API credentials** to your repository
2. **Use GitHub Secrets** for all sensitive data
3. **Limit repository access** to trusted collaborators
4. **Regularly rotate API keys**
5. **Monitor deployment logs** for any issues

## 🐛 Troubleshooting

### Common Issues

#### Chrome Web Store Upload Fails
```bash
Error: Invalid refresh token
```
**Solution**: Regenerate your refresh token using `chrome-webstore-upload-cli init`

#### Firefox Upload Fails
```bash
Error: Invalid JWT credentials
```
**Solution**: Check that your JWT issuer and secret are correct in GitHub secrets

#### Version Already Exists
```bash
Error: Version 1.2.0 already exists
```
**Solution**: Use a new version number that hasn't been used before

### Debug Mode

Add this step to see detailed logs:

```yaml
- name: Debug info
  run: |
    echo "Git ref: ${{ github.ref }}"
    echo "Git SHA: ${{ github.sha }}"
    ls -la packages/
```

## 📈 Monitoring

### View Deployment Status

1. Go to your GitHub repo → **Actions** tab
2. Click on the latest workflow run
3. View logs for each deployment step

### Store Review Status

- **Chrome**: Check [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- **Firefox**: Check [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)

## 🎉 Success!

Once set up, your deployment workflow will:

✅ Automatically build and version your extension
✅ Upload to both Chrome Web Store and Firefox Add-ons
✅ Create GitHub releases with download links
✅ Notify you of success/failure via GitHub notifications

Now you can focus on development while the CI/CD pipeline handles distribution! 🚀