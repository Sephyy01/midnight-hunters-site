# 🎨 Assets do Midnight Hunters

## 📁 Estrutura de Pastas

### `/src/assets/` (Assets do Vue - processados pelo Vite)
```
📂 src/assets/
├── 📂 images/
│   ├── 📂 logos/          # Logos da guild, Tibia, etc.
│   ├── 📂 backgrounds/    # Imagens de fundo
│   ├── 📂 guild/          # Fotos da guild, membros, eventos
│   ├── 📂 tibia/          # Sprites, items, monsters do Tibia
│   └── 📂 imbuimentos/    # Imagens de imbuimentos
│       ├── 📂 life/       # Imbuimentos de vida
│       ├── 📂 mana/       # Imbuimentos de mana
│       └── 📂 critico/    # Imbuimentos críticos
└── 📂 icons/              # Ícones SVG, PNG pequenos
```

### `/public/` (Assets estáticos - servidos diretamente)
```
📂 public/
├── 📂 images/             # Imagens grandes, screenshots
└── 📂 icons/              # Favicons, ícones do app
```

## 🔧 Como usar:

### Para assets processados pelo Vite (src/assets):
```javascript
// Em components Vue
import logo from '@/assets/images/logos/guild-logo.png'

// Em templates
<img src="@/assets/images/guild/group-photo.jpg" alt="Guild Photo">
```

### Para assets estáticos (public):
```javascript
// Diretamente pela URL
<img src="/images/screenshot.png" alt="Screenshot">
<link rel="icon" href="/icons/favicon.ico">
```

## 📝 Recomendações:

- **Logos e ícones**: Use SVG quando possível
- **Fotos**: Otimize para web (WebP, compressão)
- **Nomes**: Use kebab-case (exemplo: guild-logo.png)
- **Tamanhos**: Redimensione adequadamente antes do upload

## 🎯 Tipos de arquivo recomendados:
- **Logos**: SVG, PNG com transparência
- **Fotos**: JPG, WebP
- **Ícones**: SVG, PNG (16x16, 32x32, etc.)
- **Backgrounds**: JPG, WebP (alta qualidade)
