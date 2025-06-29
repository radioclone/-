# Contributing to VorteX

Thank you for your interest in contributing to the VorteX project! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/vortex-access.git
   cd vortex-access
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Run the development server**
   ```bash
   npm start
   ```

## Development Workflow

1. **Create a new branch for your feature or bugfix**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes**
   - Follow the [coding standards](#coding-standards)
   - Keep changes focused on a single issue or feature

3. **Test your changes**
   - Ensure your changes work as expected
   - Check for any regressions

4. **Commit your changes**
   - Follow the [commit message guidelines](#commit-message-guidelines)

5. **Push your changes to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a pull request**
   - Follow the [pull request process](#pull-request-process)

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that do not affect the meaning of the code (formatting, etc.)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or fixing tests
- **chore**: Changes to the build process or auxiliary tools

### Scope
The scope should be the name of the component affected (e.g., sequence, dice-roller, tee-dogg, etc.)

### Examples
```
feat(sequence): implement wallet connection UI
fix(dice-roller): resolve issue with random number generation
docs(readme): update project status and roadmap
```

## Pull Request Process

1. **Create a pull request from your fork to the main repository**
2. **Provide a clear description of the changes**
   - What does this PR do?
   - Why is it needed?
   - How has it been tested?
3. **Reference any related issues**
   - Use GitHub's issue linking syntax (e.g., "Fixes #123")
4. **Wait for review**
   - Address any feedback from reviewers
   - Make requested changes
5. **Once approved, your PR will be merged**

## Project Structure

The project is organized into the following directories:

- `app/` – Frontend UI and entry point
- `tee-dogg/` – Agent logic and dialogue
- `sequence-bridge/` – Wallet connection and NFT verification
- `dice-roller/` – Dice rolling logic
- `startale-integration/` - Startale RPC integration
- `interface-layer/` - Scene and interaction logic
- `docs/` - Comprehensive project documentation

## Coding Standards

### JavaScript
- Use ES6+ features
- Use meaningful variable and function names
- Add comments for complex logic
- Follow modular design principles

### HTML/CSS
- Use semantic HTML
- Follow BEM naming convention for CSS classes
- Keep styles modular and reusable

### General
- Keep files focused on a single responsibility
- Follow the existing architectural patterns
- Maintain separation of concerns

## Testing

Currently, the project does not have automated tests. When contributing:

- Manually test your changes
- Ensure they work across different browsers
- Check for any regressions in existing functionality

## Documentation

- Update documentation when changing functionality
- Document new features or components
- Keep the README and other docs up to date
- Use clear, concise language

---

Thank you for contributing to VorteX! Your help is greatly appreciated.
