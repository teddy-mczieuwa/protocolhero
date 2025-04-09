# ProtocolHero - Interactive Form Builder

This project empowers users to create custom forms with styling options, various input types, and advanced field properties.

## 🌟 Key Features

- **Interactive Two-Panel Interface**: Real-time form preview alongside configuration panels
- **Rich Form Elements**: Support for text, email, number, checkbox, radio, select, and more input types
- **Advanced Styling Options**: Customize colors, fonts, spacing, and layouts to match your brand
- **Field Validation Rules**: Set required fields, input patterns, and custom validation messages
- **Responsive Design**: Forms adapt beautifully to all screen sizes
- **Real-Time Preview**: See your changes instantly while editing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/protocolhero.git
   cd protocolhero
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or with yarn
   yarn
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Access the application**

   Open your browser and visit: `http://localhost:5173`

## 📂 Project Structure

protocolhero/
├── public/ # Static assets
│ └── index.html # Main page
├── src/
│ ├── components/ # React components
│ │ ├── form-builder/ # FormBuilder component
│ │ ├── form-field/ # FormField component
│ │ ├── form-header/ # FormHeader component
│ │ ├── form-preview/ # FormPreview component
│ │ ├── form-preview-modal/ # FormPreviewModal component
│ │ ├── form-properties/ # FormProperties component
│ │ ├── form-settings/ # FormSettings component
│ │ ├── sidebar/ # Sidebar component
│ │ └── sidebar-item/ # SidebarItem component
│ ├── App.tsx # Main application component
│ ├── hooks/ # Custom hooks
│ │ └── useFormFields.ts # useFormFields hook
│ ├── i18n/ # Internationalization
│ │ └── i18n.ts # i18next configuration
│ ├── main.tsx # Application entry point
│ ├── types/ # Type definitions
│ │ └── form.ts # Form type
│ └── utils/ # Utility functions
│ └── form-utils.ts # Form utility functions
├── package.json # Project dependencies and scripts

## 🛠️ Technology Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: For type safety and improved developer experience
- **Vite**: Modern build tool for faster development and optimized builds
- **TailwindCSS**: Utility-first CSS framework for rapid UI development

## 🔧 Development Commands

- `npm run dev` - Start the development server
- `npm run test` - Run tests
