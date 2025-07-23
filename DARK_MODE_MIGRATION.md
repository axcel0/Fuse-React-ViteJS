# Tailwind CSS v4 Dark Mode Migration Guide

## 🌙 Enhanced Dark Mode System

Proyek ini telah berhasil di-upgrade ke **Tailwind CSS v4** dengan sistem dark mode yang lebih canggih dan terintegrasi dengan Material-UI.

## ✨ Fitur Baru

### 1. **Tiga Mode Theme**
- **Light Mode**: Theme terang klasik
- **Dark Mode**: Theme gelap yang eye-friendly  
- **System Mode**: Mengikuti preferensi sistem operasi secara otomatis

### 2. **No FOUC (Flash of Unstyled Content)**
- Script prevention di `index.html` mencegah kedipan content saat load
- Theme diterapkan sebelum render untuk pengalaman smooth

### 3. **Persistent Theme Storage**
- Pilihan theme disimpan di `localStorage`
- Otomatis restore saat refresh/reload halaman

### 4. **CSS Variables Integration**
- Custom CSS variables: `--fuse-primary`, `--fuse-secondary`, etc.
- Seamless integration antara Tailwind dan Material-UI

## 🔧 Komponen Utama

### `useTheme()` Hook
```tsx
import { useTheme } from 'src/hooks/useTheme';

function MyComponent() {
  const { 
    theme,        // 'light' | 'dark' | 'system'
    effectiveTheme, // 'light' | 'dark' (resolved)
    isDark,       // boolean
    isLight,      // boolean  
    isSystem,     // boolean
    setTheme,     // function
    toggleTheme   // function
  } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800">
      Current theme: {theme}
    </div>
  );
}
```

### Theme Manager Utility
```tsx
import { themeManager } from 'src/utils/themeManager';

// Manual theme control
themeManager.setTheme('dark');
themeManager.toggleTheme();

// Listen to theme changes
themeManager.addListener((theme) => {
  console.log('Theme changed to:', theme);
});
```

### Enhanced LightDarkModeToggle
- Menambahkan opsi "System" mode
- Visual indicator yang lebih jelas
- Integration dengan kedua theme system (Tailwind + MUI)

## 🎨 CSS Classes Baru

### Tailwind Dark Mode Classes
```css
/* Background colors */
.bg-white dark:bg-gray-800
.bg-gray-100 dark:bg-gray-700

/* Text colors */  
.text-gray-900 dark:text-gray-100
.text-gray-600 dark:text-gray-400

/* Border colors */
.border-gray-200 dark:border-gray-700

/* Custom Fuse colors */
.bg-fuse-primary
.text-fuse-text-primary
.border-fuse-border
```

### CSS Variables
```css
:root {
  --fuse-primary: rgb(37 99 235);
  --fuse-secondary: rgb(245 158 11);
  --fuse-surface: rgb(255 255 255);
  --fuse-background: rgb(249 250 251);
  --fuse-text-primary: rgb(17 24 39);
  --fuse-text-secondary: rgb(75 85 99);
  --fuse-border: rgb(229 231 235);
}

:root.dark {
  --fuse-primary: rgb(96 165 250);
  --fuse-secondary: rgb(251 191 36);
  --fuse-surface: rgb(31 41 55);
  --fuse-background: rgb(17 24 39);
  --fuse-text-primary: rgb(243 244 246);
  --fuse-text-secondary: rgb(156 163 175);
  --fuse-border: rgb(55 65 81);
}
```

## ⚙️ Konfigurasi

### Tailwind Config (`src/styles/tailwind.config.js`)
```js
export default {
  darkMode: ['selector', '.dark'], // Tailwind v4 syntax
  theme: {
    extend: {
      colors: {
        'fuse': {
          'primary': 'var(--fuse-primary)',
          'secondary': 'var(--fuse-secondary)',
          // ... custom color variables
        }
      }
    }
  }
}
```

### PostCSS Config (`postcss.config.js`)
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## 🚀 Penggunaan dalam Komponen

### Basic Dark Mode Styling
```tsx
function MyCard() {
  return (
    <div className="
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100
      border border-gray-200 dark:border-gray-700
      p-6 rounded-lg
      transition-colors duration-200
    ">
      <h2 className="text-xl font-bold mb-4">Card Title</h2>
      <p className="text-gray-600 dark:text-gray-400">
        This card adapts to dark mode automatically.
      </p>
    </div>
  );
}
```

### Success/Error Messages
```tsx
// Success message
<div className="
  p-3 
  bg-green-50 dark:bg-green-900/20 
  border-l-4 border-green-500 
  text-green-700 dark:text-green-300
">
  Success message
</div>

// Error message  
<div className="
  p-3 
  bg-red-50 dark:bg-red-900/20 
  border-l-4 border-red-500 
  text-red-700 dark:text-red-300
">
  Error message
</div>
```

### Interactive Elements
```tsx
<button className="
  px-4 py-2 
  bg-blue-600 hover:bg-blue-700 
  dark:bg-blue-500 dark:hover:bg-blue-600 
  text-white 
  rounded
  transition-colors duration-200
">
  Button
</button>
```

## 🔄 Migration dari System Lama

### Before (Material-UI only)
```tsx
const theme = useTheme();
const isDark = theme.palette.mode === 'dark';
```

### After (Tailwind + MUI)
```tsx
const { isDark, theme } = useTheme();
// atau tetap gunakan MUI theme untuk backward compatibility
const muiTheme = useMainTheme();
```

## 🌟 Best Practices

1. **Gunakan CSS Variables**: Untuk konsistensi antara Tailwind dan MUI
2. **Transition Classes**: Tambahkan `transition-colors duration-200` untuk smooth transitions
3. **System Theme Support**: Selalu sediakan opsi "System" untuk UX yang lebih baik
4. **Accessibility**: Pastikan contrast ratio memadai di kedua mode
5. **Testing**: Test di kedua light dan dark mode

## 🐛 Troubleshooting

### Theme tidak tersinkronisasi antara Tailwind dan MUI
- Pastikan `FuseTheme.tsx` sudah menerapkan class ke `documentElement`
- Check apakah `useMuiThemeSync()` hook dipanggil

### FOUC masih terjadi
- Pastikan script di `index.html` berada di `<head>` section
- Verify localStorage key `'theme'` tersimpan dengan benar

### CSS Variables tidak terbaca
- Check import `app.css` di `index.css`
- Pastikan PostCSS config benar

## 📚 Demo Component

Lihat `src/components/DarkModeDemo.tsx` untuk contoh implementasi lengkap fitur dark mode.

---

**🎉 Congratulations!** 
Proyek Anda sekarang sudah menggunakan Tailwind CSS v4 dengan sistem dark mode yang modern dan terintegrasi!
