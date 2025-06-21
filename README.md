# Creative Soft AI - Landing Page

Professional landing page for Creative Soft AI, a software development company specializing in AI-powered SaaS solutions, custom enterprise software, and strategic technology consulting.

## 🌟 Features

- **Premium Design**: Apple-style minimalist design with sophisticated animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Contact Integration**: Functional contact form with Formspree integration
- **Legal Compliance**: Complete privacy policy, terms of service, and refund policy
- **Performance Optimized**: Fast loading with modern web standards
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with Tailwind CSS
- **JavaScript**: Vanilla JS for interactions and animations
- **Formspree**: Contact form handling
- **GitHub Pages**: Hosting and deployment

## 📁 Project Structure

```
CREATIVESOFTAI_LANDING/
├── index.html          # Main landing page
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
├── .gitignore          # Git ignore rules
└── CONTACT_SETUP.md    # Contact form setup guide
```

## 🚀 Deployment

### GitHub Pages Setup

1. **Repository Configuration**
   - Ensure all files are committed to the main branch
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder

2. **Custom Domain Setup**
   - Add your domain in Settings → Pages → Custom domain
   - Create a CNAME file in the repository root with your domain
   - Configure DNS records in your domain provider

### DNS Configuration (Hostinger)

Add the following DNS records in your Hostinger domain panel:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: your-username.github.io
```

## 📧 Contact Form Setup

The contact form uses Formspree for form handling. To set up:

1. Create account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action in `script.js` with your Formspree endpoint

Current configuration uses form ID: `xldnwkpr`

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/creativesoftai-landing.git
   cd creativesoftai-landing
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:8000`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design System

### Colors
- **Primary**: Slate (900, 800, 700)
- **Secondary**: Gray (600, 500, 400)
- **Accent**: Green, Purple, Orange (for highlights)
- **Background**: White, Slate-50

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold)

## 📄 Legal

This website includes comprehensive legal policies:
- Privacy Policy
- Terms of Service  
- Refund Policy

All policies are designed for informational websites and can be accessed via footer links.

## 🤝 Contributing

This is a private project for Creative Soft AI. For inquiries, please use the contact form on the website.

## 📞 Contact

For technical inquiries about this website, please use the contact form at [your-domain.com](https://your-domain.com)

---

© 2025 Creative Soft AI. Professional software development. 