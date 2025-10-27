# Rhodes Island Chronicles

A web application for reading Arknights story content.

## Development

This project uses Yarn for package management.

### Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

3. Run tests:
   ```bash
   yarn test
   ```

4. Build for production:
   ```bash
   yarn build
   ```

### Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn lint` - Lint code
- `yarn fetch-game-data` - Fetch remote data (used by GitHub Actions)
- `yarn storybook` - Start Storybook
- `yarn build-storybook` - Build Storybook

## Data

Story data is cached locally via GitHub Actions. The `fetch-game-data` script downloads JSON files and story texts from the Arknights game data repository.