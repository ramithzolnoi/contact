# Zolnoi Contact Form (Vite + React + Tailwind + Airtable)

A lightweight contact capture page for a startup (NASSCOM incubator showcase ready). Collects Name, Email, Company and stores submissions in an Airtable base.

## Stack

- Vite + React 18
- Tailwind CSS 3
- Airtable JS SDK
- Framer Motion

## Quick Start

1. Install deps:
   ```bash
   npm install
   ```
2. Set up Airtable:
   - Create a new Airtable base
   - Create a table called "Table 1" with fields: Name, Email, Company, Purpose, Comment, Source
   - Get your API key from https://airtable.com/account
   - Get your Base ID from your base URL
3. Create `.env` file:
   ```bash
   VITE_AIRTABLE_API_KEY=your_api_key_here
   VITE_AIRTABLE_BASE_ID=your_base_id_here
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

Visit http://localhost:5173

## Environment Variables

Defined in `.env` (never commit actual secrets):

```
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

## Features

- Minimal client-side validation (presence + email format)
- Disabled button until valid
- Loading spinner + error state
- Duplicate email detection
- QR code generator for easy sharing
- Responsive design with mobile support
- Founder cards with LinkedIn integration
- On success, shows founder connect panel with LinkedIn + Website links

## Production Build

```bash
npm run build
npm run preview
```

---

Built with care for fast iteration.
