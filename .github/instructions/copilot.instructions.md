# Copilot Instructions for Azure DevOps Mermaid Extension

## Project Overview
This is an Azure DevOps extension that enables rendering Mermaid diagrams directly within Markdown files in Azure DevOps repositories. The extension parses Markdown content, identifies Mermaid code blocks, and renders them as interactive diagrams.

## Technology Stack
- **Language**: JavaScript (ES6 modules)
- **Build Tool**: Webpack
- **Dependencies**:
  - `azure-devops-extension-sdk`: For integrating with Azure DevOps
  - `mermaid`: For diagram rendering
  - `marked`: For Markdown parsing with GitHub Flavored Markdown (GFM) support, including tables
- **Development Server**: Webpack Dev Server

## Project Structure
- `src/index.js`: Entry point that initializes the SDK and registers the renderer
- `src/viewer.js`: Contains the logic to parse Markdown and render Mermaid diagrams
- `dev/dev.js`: Development setup for local testing
- `dev/test.md`: Sample Markdown file with Mermaid diagrams for testing
- `webpack.config.js`: Build configuration
- `vss-extension.json`: Azure DevOps extension manifest
- `package.json`: Project dependencies and scripts
- `marketplace/`: Documentation and assets for the extension marketplace

## Development Workflow
1. **Local Testing**: Run `npm run serve` to start the development server. This uses the test.md file to preview the rendering.
2. **Building**: Run `npm run build` to create the production bundle and package the extension using tfx-cli.
3. **Publishing**: The build script creates the extension package ready for upload to Azure DevOps Marketplace.

## Coding Guidelines
- Use ES6 modules for imports/exports
- Follow standard JavaScript naming conventions
- Ensure compatibility with Azure DevOps SDK APIs
- Handle errors gracefully in rendering logic
- Keep the code modular and maintainable

## Key Components
- **Renderer Registration**: In `index.js`, register the `mermaid_renderer` with the SDK
- **Content Rendering**: `viewer.js` processes raw Markdown using the `marked` library (with GFM support for tables, task lists, etc.), extracts Mermaid blocks, and initializes Mermaid rendering
- **DOM Manipulation**: The viewer targets a container div (`md-mermaid-viewer`) to inject rendered content

## Testing
- Use the development server to test changes locally
- Verify that Mermaid diagrams render correctly in various formats (sequence diagrams, mindmaps, etc.)
- Ensure Markdown parsing works correctly with GFM features (tables, strikethrough, task lists)
- Test table rendering to ensure proper formatting with CSS styles

## Deployment
- The extension targets Azure Repos for content rendering
- Supports `.md` files with `text/html` MIME type
- Default behavior is to show rendered content

When contributing, ensure all changes maintain backward compatibility and follow the existing code patterns.