# Publishing Guide for Azure DevOps Mermaid

This guide will help you publish the Azure DevOps Mermaid extension to the marketplace.

## Prerequisites

### 1. Create a Publisher Account

1. Go to [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage/publishers)
2. Click **Create Publisher**
3. Use the publisher ID: **jramos**
4. Fill in the required information:
   - Display Name: jramos or your preferred name
   - Description: Professional extensions for Azure DevOps
5. Verify your publisher account

### 2. Generate a Personal Access Token (PAT)

1. Go to your Azure DevOps organization
2. Click on **User Settings** → **Personal Access Tokens**
3. Click **New Token**
4. Configure:
   - Name: Marketplace Publishing
   - Organization: All accessible organizations
   - Expiration: Set as needed (e.g., 90 days)
   - Scopes: **Marketplace** → Select **Manage**
5. Copy the token securely (you won't see it again!)

### 3. Install TFX CLI

```bash
npm install -g tfx-cli
```

## Publishing Steps

### Step 1: Build the Extension

```bash
# Make sure all dependencies are installed
npm install

# Build the production bundle
npm run build
```

This creates a `.vsix` file in the project root: `jramos.azure-devops-mermaid-2.0.0.vsix`

### Step 2: Login to TFX

**Option A: Interactive Login**
```bash
# Login with your publisher account
tfx login

# When prompted:
# - Service URL: Press Enter (uses default)
# - Personal Access Token: Paste your PAT
```

**Option B: Direct Publish (recommended)**
```bash
# Publish directly with token
tfx extension publish \
  --publisher jramos \
  --token YOUR_PAT_HERE \
  --vsix jramos.azure-devops-mermaid-2.0.0.vsix
```

### Step 3: Verify the Extension

After publishing:

1. Go to [Marketplace Publisher Management](https://marketplace.visualstudio.com/manage/publishers/jramos)
2. Find your extension in the list
3. Check the status (it will be **private** by default)

### Step 4: Share the Extension

**Make it Public:**
1. In the publisher portal, find your extension
2. Click **Share/Unshare**
3. Select **Public** to make it available to everyone
4. Or **Share** with specific Azure DevOps organizations for testing

**Direct Link:**
`https://marketplace.visualstudio.com/items?itemName=jramos.azure-devops-mermaid`

## Testing Before Going Public

### Install in Test Organization

1. Keep the extension **private** initially
2. Share it with your test Azure DevOps organization
3. Install it: Go to Organization Settings → Extensions → Browse Marketplace
4. Search for your extension (or use the direct link)
5. Click **Get it free** and install

### Verify Features

Test all functionality:
- ✅ Mermaid diagrams render correctly
- ✅ Tables display with proper styling
- ✅ GFM features work (task lists, strikethrough)
- ✅ No console errors
- ✅ Works across different browsers

## Updating the Extension

To publish updates:

1. **Update Version Numbers:**
   ```bash
   # Edit package.json
   "version": "2.0.1"
   
   # Edit vss-extension.json
   "version": "2.0.1"
   ```

2. **Update Changelog:**
   ```bash
   # Edit marketplace/changelog.md
   ## [2.0.1] - 2025-10-XX
   ### Fixed
   - Bug fix description
   ```

3. **Build and Publish:**
   ```bash
   npm run build
   tfx extension publish \
     --publisher jramos \
     --token YOUR_PAT_HERE \
     --vsix jramos.azure-devops-mermaid-2.0.1.vsix
   ```

The marketplace will automatically update for all users.

## Troubleshooting

### Publisher Not Found
**Problem:** `Error: Failed to find publisher 'jramos'`

**Solution:**
- Verify you created the publisher account with ID **jramos**
- Check you're logged into the correct Microsoft account
- Wait a few minutes for the publisher to propagate

### Permission Denied
**Problem:** `Error: Access Denied: You do not have sufficient privileges`

**Solution:**
- Ensure your PAT has **Marketplace (Manage)** scope
- Verify the PAT hasn't expired
- Check you're using the correct organization

### Extension Already Exists
**Problem:** `Error: Extension 'jramos.azure-devops-mermaid' already exists`

**Solution:**
- If taking over from original extension, change the ID in `vss-extension.json`
- Or contact marketplace support to transfer ownership
- Use a different unique ID like `azure-devops-mermaid-gfm`

### Build Fails
**Problem:** Build errors or missing dependencies

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json dist/
npm install
npm run build
```

### VSIX is Too Large
**Problem:** Warning about asset size limits

**Solution:**
- This is just a warning, the extension will still work
- Consider code splitting or lazy loading in future versions
- Current size (2.2M) is acceptable for this extension

## Important Files

### Extension Manifest
- **File:** `vss-extension.json`
- **Purpose:** Defines extension metadata, contributions, and configuration
- **Key Fields:** `id`, `version`, `publisher`, `name`, `description`

### Package Configuration  
- **File:** `package.json`
- **Purpose:** Project dependencies and build scripts
- **Key Fields:** `name`, `version`, `author`, `scripts`

### Marketplace Content
- **File:** `marketplace/overview.md`
- **Purpose:** Extension description shown in marketplace
- **Tip:** Use rich formatting, images, and examples

### Release Notes
- **File:** `marketplace/changelog.md`
- **Purpose:** Version history and release notes
- **Tip:** Follow semantic versioning

### Extension Icon
- **File:** `marketplace/logo.png`
- **Purpose:** Extension icon in marketplace
- **Size:** 128x128px recommended

## Best Practices

### Before Publishing

1. ✅ Test thoroughly in a test organization
2. ✅ Review marketplace overview for typos
3. ✅ Ensure changelog is up to date
4. ✅ Verify version numbers match
5. ✅ Test the built `.vsix` file locally

### After Publishing

1. 📧 Monitor email for marketplace notifications
2. 👀 Watch GitHub issues for bug reports
3. 📊 Track marketplace analytics
4. 💬 Respond to reviews and feedback
5. 🔄 Plan regular updates

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **Major (X.0.0):** Breaking changes
- **Minor (2.X.0):** New features, backward compatible
- **Patch (2.0.X):** Bug fixes, backward compatible

Examples:
- `2.0.0` → `2.0.1`: Bug fix
- `2.0.0` → `2.1.0`: New feature
- `2.0.0` → `3.0.0`: Breaking change

## Security

### Protecting Your PAT

⚠️ **Never commit your PAT to version control!**

**Good practices:**
```bash
# Use environment variable
export AZURE_DEVOPS_PAT="your-token-here"
tfx extension publish --token $AZURE_DEVOPS_PAT --vsix *.vsix

# Or store in .env (add to .gitignore)
echo "AZURE_DEVOPS_PAT=your-token" >> .env
echo ".env" >> .gitignore
```

### PAT Rotation

- Set PAT expiration (e.g., 90 days)
- Rotate tokens regularly
- Revoke old tokens after creating new ones

## Support Resources

### Official Documentation
- [Azure DevOps Extensions](https://learn.microsoft.com/en-us/azure/devops/extend/)
- [TFX CLI Reference](https://learn.microsoft.com/en-us/azure/devops/extend/publish/command-line)
- [Marketplace Publishing](https://learn.microsoft.com/en-us/azure/devops/extend/publish/overview)

### Community
- [GitHub Discussions](https://github.com/javiramos1/azure-devops-mermaid/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/azure-devops-extension)

### Contact
- **Issues:** [GitHub Issues](https://github.com/javiramos1/azure-devops-mermaid/issues)
- **Email:** javier.ramos1@gmail.com

## Quick Reference

### Common Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start dev server
npm run dev

# Build extension
npm run build

# Publish extension
tfx extension publish --publisher jramos --token $PAT --vsix *.vsix

# Update existing extension
tfx extension publish --vsix *.vsix --token $PAT --override

# Share with organization
tfx extension share --publisher jramos --extension-id azure-devops-mermaid \
  --share-with YOUR_ORG_NAME --token $PAT
```

### URLs to Bookmark

- Publisher Portal: https://marketplace.visualstudio.com/manage/publishers/jramos
- Extension Page: https://marketplace.visualstudio.com/items?itemName=jramos.azure-devops-mermaid
- Analytics: https://marketplace.visualstudio.com/manage/publishers/jramos/extensions/azure-devops-mermaid/hub

## Success Checklist

Before going public, verify:

- [ ] Extension builds without errors
- [ ] Tested in at least one Azure DevOps organization
- [ ] All Mermaid diagram types render correctly
- [ ] Tables display with proper formatting
- [ ] Marketplace overview looks professional
- [ ] Changelog is accurate and up to date
- [ ] Version numbers match across files
- [ ] Extension icon displays correctly
- [ ] No console errors in browser
- [ ] Works in Chrome, Edge, and Firefox

## Congratulations! 🎉

Once published, your extension will be available to millions of Azure DevOps users!

**Next steps:**
1. Share your extension on social media
2. Write a blog post about your journey
3. Engage with users who provide feedback
4. Plan v2.1.0 with new features

---

**Ready to publish? Run `npm run build` and use the commands above!**

Last updated: October 2, 2025