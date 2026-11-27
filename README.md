# solitaire
A Solitaire game made in React.

Live: https://jacobsen1.github.io/solitaire

## Stack
React 19 · TypeScript 7 · Vite 8 · MUI 9 · Redux Toolkit 2 · react-dnd 16 · Playwright

## Development
Requires Node.js 22.12+ (CI uses the version in `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:3000/solitaire/
npm run build      # type-check + production build to build/
npm run preview    # serve the production build on http://localhost:4317/solitaire/
npm run deploy     # publish build/ to GitHub Pages (gh-pages branch)
```

## UI tests
```sh
npx playwright install chromium   # first time only
npm test                          # builds, serves and runs the Playwright suite
npx playwright show-report
```

Tests use a seeded `Math.random`, so the deal is the same on every run (`tests/fixtures.ts`).
The test plan lives in `specs/`.

The Playwright test agents (planner / generator / healer) are set up for Claude Code in
`.claude/agents/`, with the Playwright MCP server in `.mcp.json` (`npx playwright init-agents --loop=claude`).
