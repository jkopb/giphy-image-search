# Giphy Image Search

A React SPA built with Vite that allows users to search for and display GIFs with customizable captions.

## Prerequisites

- Node.js (version 20.19 or higher)
- npm or yarn package manager

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/jkopb/giphy-image-search
   cd giphy-image-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **React 19**
- **Vite**
- **TypeScript**
- **Chakra UI**
- **TanStack Query**

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── queries/            # Data fetching logic
└── main.tsx           # Application entry point
```

## Development

The development server will automatically reload when you make changes to the code. The app uses hot module replacement (HMR) for a smooth development experience.
