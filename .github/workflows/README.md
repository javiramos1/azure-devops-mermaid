# GitHub Actions Workflows

This directory contains GitHub Actions CI/CD pipelines for the Azure DevOps Mermaid extension.

## Workflows

### 🔄 CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `master`, `main`, or `develop` branches
- Pull requests to `master`, `main`, or `develop` branches

**Jobs:**

1. **Test** - Runs unit tests on multiple Node.js versions
   - Tests on Node.js 18.x, 20.x, and 22.x
   - Runs Jest test suite
   - Uploads code coverage to Codecov (optional)

2. **Build & Package** - Builds and packages the extension
   - Installs dependencies
   - Builds the extension using Webpack
   - Creates `.vsix` package file
   - Uploads artifact for download (30 days retention)

3. **Quality** - Performs code quality checks
   - Security vulnerability scanning with `npm audit`
   - Package integrity verification
   - Checks for outdated dependencies

### 🚀 Release (`release.yml`)

**Triggers:**
- Push of version tags (e.g., `v2.0.0`)

**Jobs:**

1. **Create Release** - Automates GitHub releases
   - Builds and packages the extension
   - Extracts changelog for the version
   - Creates GitHub release with `.vsix` attachment
   - Optionally publishes to Azure DevOps Marketplace (requires `AZURE_DEVOPS_PAT` secret)

**Usage:**
```bash
# Create and push a new version tag
git tag -a v2.0.1 -m "Release version 2.0.1"
git push origin v2.0.1
```

### 📦 Dependency Update Check (`dependency-check.yml`)

**Triggers:**
- Scheduled: Every Monday at 9:00 AM UTC
- Manual trigger via workflow_dispatch

**Jobs:**

1. **Check Dependencies** - Monitors dependency health
   - Lists outdated packages
   - Runs security audit
   - Tests with latest dependency updates

## Setup Requirements

### Optional Secrets

To enable full functionality, add these secrets to your GitHub repository:

1. **`CODECOV_TOKEN`** (optional)
   - For code coverage reporting
   - Get from [codecov.io](https://codecov.io/)

2. **`AZURE_DEVOPS_PAT`** (optional)
   - For automatic marketplace publishing on release
   - Create from [Azure DevOps](https://dev.azure.com/) → User Settings → Personal Access Tokens
   - Requires "Marketplace (Publish)" scope

### Adding Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the secret name and value

## Status Badges

Add these badges to your README to show CI status:

```markdown
[![CI/CD](https://github.com/javiramos1/azure-devops-mermaid/actions/workflows/ci.yml/badge.svg)](https://github.com/javiramos1/azure-devops-mermaid/actions/workflows/ci.yml)
[![Release](https://github.com/javiramos1/azure-devops-mermaid/actions/workflows/release.yml/badge.svg)](https://github.com/javiramos1/azure-devops-mermaid/actions/workflows/release.yml)
```

## Monitoring

- **View workflow runs**: Go to the "Actions" tab in your GitHub repository
- **Download artifacts**: Available for 30 days after each successful build
- **Check logs**: Click on any workflow run to see detailed logs

## Local Testing

Before pushing, you can test locally:

```bash
# Run tests
npm test

# Build extension
npm run build

# Run all checks
make check
```

## Troubleshooting

### Build Failures

- **Node version issues**: The workflow tests on Node 18, 20, and 22. Ensure compatibility.
- **TFX CLI errors**: Make sure `vss-extension.json` is valid.
- **Dependency conflicts**: Run `npm ci` locally to reproduce the CI environment.

### Release Issues

- **Tag format**: Must be `vX.Y.Z` (e.g., `v2.0.0`)
- **Version mismatch**: Ensure `package.json` and `vss-extension.json` versions match the tag
- **Marketplace publish fails**: Check that `AZURE_DEVOPS_PAT` secret is set and valid

### Dependency Check

- **False positives in audit**: Some vulnerabilities may be in dev dependencies only
- **Update failures**: Test updates locally before applying to production

## Contributing

When contributing, ensure:

1. All CI checks pass before merging
2. Version numbers are updated appropriately
3. Changelog is updated for new features/fixes
4. Tests are added for new functionality

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure DevOps Extension Publishing](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview)
- [TFX CLI Documentation](https://github.com/microsoft/tfs-cli)
