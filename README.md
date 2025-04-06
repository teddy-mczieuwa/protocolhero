# ProtocolHero - FormBuilder Assessment

The FormBuilder allows users to create custom forms with various input types, styling options, and field properties.

## Features

- **Two-panel Layout**: Side-by-side form preview and styling options interface
- **Dynamic Field Creation**: Support for various input types (text, email, checkbox, etc.)
- **Visual Customization**: Easily change background colors, font families, and field labels
- **Field Property Editing**: Modify labels, placeholders, and field types
- **Intuitive Interface**: Drag and drop-style form building experience

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/protocolhero.git
   cd protocolhero
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to view the application

## Project Structure

```
protocolhero/
├── public/                # Static files
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Shared components
│   ├── features/
│   │   └── form-builder/  # Form Builder feature
│   │       ├── components/# UI components for the form builder
│   │       ├── hooks/     # Custom React hooks
│   │       ├── types/     # TypeScript type definitions
│   │       └── utils/     # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack

- **React**: UI library
- **TypeScript**: For type safety
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework

## Building for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Development

- `npm run lint` - Run ESLint to check for code quality and style issues
- `npm run build` - Build the project for production
