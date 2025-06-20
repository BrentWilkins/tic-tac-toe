# Tic-Tac-Toe

A simple tic-tac-toe game built with Next.js and TypeScript.

## Features

- Classic 3x3 tic-tac-toe gameplay
- Two-player mode (X and O)
- Winner detection
- Turn indicator
- Clean, minimalist UI with dark theme
- Keyboard shortcut: Ctrl+Z to undo last move

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## How to Play

1. The game starts with player X
2. Click any empty square to make your move
3. Players alternate turns (X, then O, then X, etc.)
4. The first player to get 3 in a row (horizontally, vertically, or diagonally) wins
5. Use Ctrl+Z to undo the last move

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Code Formatting**: [Prettier](https://prettier.io)
- **Linting**: [ESLint](https://eslint.org)

## Project Structure

```
src/
└── app/
    ├── favicon.ico    # Game favicon
    ├── layout.tsx     # Root layout with metadata
    └── page.tsx       # Main game component with all game logic
```
