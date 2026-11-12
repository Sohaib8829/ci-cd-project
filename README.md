# DevOps Practice Site

Small 3-page Node.js website (Home, Products, Contact) made for practising CI/CD.
It has **no database and no external services**, so pipelines stay simple.

## Stack
Node.js 20+, Express, EJS, Jest + Supertest (tests), ESLint (lint)

## Run locally
```bash
npm install        # (use `npm ci` in CI)
npm start          # http://localhost:3000
```

## Commands (these are what your pipeline will run)
| Command | What it does |
|---|---|
| `npm run lint` | ESLint check |
| `npm test` | all tests |
| `npm run test:unit` | unit tests only |
| `npm run test:integration` | integration tests only |
| `npm run test:coverage` | tests + coverage (fails below threshold) |
| `npm start` | starts the server |

## Endpoints
- Pages: `/`, `/products`, `/contact`
- API: `GET /api/products`, `GET /api/products/:id`, `POST /api/contact`
- Health: `GET /health`

DEVOPS PROJECT MADE 