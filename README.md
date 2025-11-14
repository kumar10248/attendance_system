# 🎓 Attendance System# Attendance management system



A modern, high-performance attendance management system built with React, TypeScript, and Tailwind CSS.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🎨 Design ThemeCurrently, two official plugins are available:



The application features a sophisticated color scheme combining:- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

- **Amber** (#F59E0B) - Primary actions and highlights- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Purple** (#9333EA) - Accent colors and secondary elements

- **Silver** (#9CA3AF) - Neutral tones and backgrounds## Expanding the ESLint configuration

- **Black** (#000000) - Text and contrast

- **White** (#FFFFFF) - Backgrounds and light elementsIf you are developing a production application, we recommend updating the configuration to enable type aware lint rules:



## ✨ Features- Configure the top-level `parserOptions` property like this:



### Core Functionality```js

- ✅ **Real-time Attendance Tracking** - Mark students present/absent with instant updatesexport default tseslint.config({

- 🔍 **Advanced Filtering** - Search by name, UID, section, or group  languageOptions: {

- 📊 **Live Statistics** - View attendance rates and counts in real-time    // other options...

- 📥 **Excel Export** - Export attendance records to XLSX format    parserOptions: {

- 🌓 **Dark Mode Support** - Beautiful light and dark themes      project: ['./tsconfig.node.json', './tsconfig.app.json'],

      tsconfigRootDir: import.meta.dirname,

### UI/UX Enhancements    },

- 🎯 **Glass Morphism Effects** - Modern frosted glass UI elements  },

- ✨ **Smooth Animations** - Fade-in, slide-up, and scale animations})

- 🎨 **Gradient Backgrounds** - Eye-catching amber-purple gradients```

- 💫 **Shimmer Loading** - Elegant loading states

- 📱 **Fully Responsive** - Works seamlessly on all device sizes- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`

- 🎭 **Interactive Cards** - Hover effects and smooth transitions- Optionally add `...tseslint.configs.stylisticTypeChecked`

- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

### Performance Optimizations

- ⚡ **Code Splitting** - Automatic chunking for faster load times```js

- 🔄 **Lazy Loading** - Heavy dependencies loaded on-demand (XLSX)// eslint.config.js

- 💾 **Session Caching** - 5-minute cache for API responsesimport react from 'eslint-plugin-react'

- 🎯 **Memoized Components** - React.memo for StudentCard and StatCard

- 🚀 **Optimized Filtering** - Efficient search algorithmsexport default tseslint.config({

- 📦 **Tree Shaking** - Remove unused code in production  // Set the react version

- 🗜️ **Minification** - Compressed builds with Terser  settings: { react: { version: '18.3' } },

- 🎨 **CSS Optimization** - Purged unused Tailwind classes  plugins: {

    // Add the react plugin

## 🚀 Getting Started    react,

  },

### Prerequisites  rules: {

- Node.js (v16 or higher)    // other rules...

- npm or yarn    // Enable its recommended rules

    ...react.configs.recommended.rules,

### Installation    ...react.configs['jsx-runtime'].rules,

  },

1. Clone the repository:})

```bash```

git clone https://github.com/kumar10248/attendance_system.git
cd attendance_system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` folder with:
- Minified JavaScript and CSS
- Code-split chunks for optimal loading
- Removed console.logs
- Compressed assets

## 🎯 Usage

### Marking Attendance
1. Click the **Search** button to load all students
2. Use filters to narrow down specific sections or groups
3. Click **Mark Present/Absent** on student cards to toggle attendance
4. View live statistics in the header cards

### Exporting Data
1. Filter students as needed
2. Click the **Export** button
3. An Excel file will be downloaded with all attendance data

### Theme Toggle
- Click the sun/moon icon in the top-right corner
- Choose between Light, Dark, or System theme

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── mode-toggle.tsx # Theme switcher
│   └── theme-provider.tsx
├── pages/              # Page components
│   └── index.tsx       # Main attendance page
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── assets/             # Static assets
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **XLSX** - Excel file generation
- **React Router** - Client-side routing
- **Framer Motion** - Advanced animations

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: 45 93% 47%;    /* Amber */
  --accent: 270 70% 60%;    /* Purple */
  --secondary: 240 5% 75%;  /* Silver */
}
```

### Adding New Features
1. Create components in `src/components/`
2. Add routes in `src/routes.ts`
3. Update types in `src/types.ts`

## 🔧 Configuration

### Vite Config
Performance settings are configured in `vite.config.ts`:
- Manual code splitting
- Terser minification
- Dependency optimization
- HMR configuration

### Tailwind Config
Custom theme extensions in `tailwind.config.js`:
- Custom colors (amber, silver, purple)
- Custom animations
- Border radius tokens

## 📊 Performance Metrics

- ⚡ **First Contentful Paint**: < 1.5s
- 🎯 **Time to Interactive**: < 3.0s
- 📦 **Bundle Size**: Optimized with code splitting
- 🔄 **Cache Strategy**: 5-minute session storage
- 💾 **Memory Usage**: Optimized with React.memo

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Kumar**
- GitHub: [@kumar10248](https://github.com/kumar10248)

## 🙏 Acknowledgments

- Chandigarh University for the project inspiration
- shadcn for the amazing UI components
- The React and Tailwind communities

---

Made with ❤️ and ⚡ by Kumar
