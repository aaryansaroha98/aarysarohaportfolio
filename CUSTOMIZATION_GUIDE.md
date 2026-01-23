# How to Customize Your Portfolio Website

## 📁 File Structure
```
portfolioaaryan/
├── index.html          # Main HTML file (all content)
├── css/
│   └── styles.css      # Custom animations & styles
├── js/
│   └── main.js         # JavaScript functionality
└── CUSTOMIZATION_GUIDE.md
```

---

## 🎯 Step-by-Step Customization

### 1. Changing Your Name
**File:** `index.html`

Search for "Your Name" and replace with your actual name:
```html
<h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
    <span class="bg-gradient-to-r from-light via-primary to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Hi, I'm </span>
    <span class="text-light">Aaryan Saroha</span>
</h1>

<p class="text-gray-400 text-sm">© 2024 Aaryan Saroha. All rights reserved.</p>
```

### 2. Adding Your Photo
**File:** `index.html`

Replace the icon with your photo:
```html
<div class="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-float">
    <div class="w-full h-full rounded-full bg-dark flex items-center justify-center overflow-hidden">
        <img src="path/to/your-photo.jpg" alt="Your Name" class="w-full h-full object-cover">
    </div>
</div>
```

**Tips:**
- Use square images (400x400 pixels)
- JPG or PNG format
- Place images in an `images` folder

### 3. Updating Your Bio
**File:** `index.html`

Find the About section:
```html
<p class="text-gray-400 leading-relaxed">
    I'm a passionate web developer with expertise in building modern, responsive, 
    and user-friendly websites. I love turning complex problems into simple, 
    beautiful, and intuitive designs.
    <!-- Replace with your own bio -->
</p>
```

### 4. Modifying Skills
**File:** `index.html`

Find the Skills section and customize:
```html
<div class="bg-dark border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-all">
    <div class="flex items-center gap-4 mb-4">
        <div class="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 text-2xl">
            <i class="fab fa-python"></i>  <!-- Change icon -->
        </div>
        <div>
            <h4 class="font-semibold">Python</h4>  <!-- Skill name -->
            <p class="text-sm text-gray-400">Advanced</p>
        </div>
    </div>
    <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" 
             style="width: 90%"></div>  <!-- Change percentage -->
    </div>
</div>
```

**Available Icons:**
- HTML: `fab fa-html5`
- CSS: `fab fa-css3-alt`
- JavaScript: `fab fa-js`
- React: `fab fa-react`
- Node.js: `fab fa-node-js`
- Python: `fab fa-python`
- Git: `fab fa-git-alt`
- GitHub: `fab fa-github`

### 5. Adding/Editing Projects
**File:** `index.html`

Customize project cards:
```html
<div class="project-card group relative bg-dark border border-gray-800 rounded-2xl overflow-hidden hover:border-primary transition-all">
    <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <img src="path/to/project-image.jpg" alt="Project Name" class="w-full h-full object-cover">
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Project Name</h3>
        <p class="text-gray-400 text-sm mb-4">Description of your project...</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">React</span>
            <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs">Node.js</span>
        </div>
        <div class="flex gap-3">
            <a href="https://your-project-url.com" class="flex-1 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-center text-sm font-medium">Live Demo</a>
            <a href="https://github.com/yourusername/project" class="flex-1 py-2 border border-gray-600 rounded-lg text-light text-center text-sm font-medium">Code</a>
        </div>
    </div>
</div>
```

### 6. Updating Education
**File:** `index.html`

```html
<div class="w-5/12 bg-dark border border-gray-800 rounded-xl p-6 ml-6">
    <h3 class="text-lg font-bold text-light">Bachelor's Degree</h3>
    <p class="text-primary">Computer Science</p>
    <p class="text-gray-400 text-sm">University Name • 2020 - 2024</p>
</div>
```

### 7. Updating Contact Information
**File:** `index.html`

```html
<p class="text-light">your.email@example.com</p>  <!-- Your email -->
<p class="text-light">+1 234 567 8900</p>  <!-- Your phone -->
<p class="text-light">Your City, Country</p>  <!-- Your location -->
```

### 8. Updating Social Media Links
**File:** `index.html`

```html
<a href="https://github.com/yourusername" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-light hover:bg-primary hover:text-white hover:scale-110 transition-all">
    <i class="fab fa-github text-xl"></i>
</a>
<a href="https://linkedin.com/in/yourusername" class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-light hover:bg-blue-600 hover:text-white hover:scale-110 transition-all">
    <i class="fab fa-linkedin-in text-xl"></i>
</a>
```

### 9. Changing Typing Effect Phrases
**File:** `js/main.js`

```javascript
function initTypingEffect() {
    const phrases = [
        'Full Stack Developer',
        'React Specialist',
        'UI/UX Designer',
        'Problem Solver',
        'Tech Enthusiast'
    ];
    // ... rest of code
}
```

### 10. Customizing Colors
**File:** `index.html`

In the Tailwind config:
```javascript
colors: {
    primary: '#6366f1',   // Change this hex
    secondary: '#8b5cf6', // Change this hex
    accent: '#06b6d4',    // Change this hex
    // ...
}
```

**Popular color combinations:**
- Purple: primary: '#8b5cf6', secondary: '#7c3aed'
- Blue: primary: '#3b82f6', secondary: '#2563eb'
- Green: primary: '#10b981', secondary: '#059669'
- Pink: primary: '#ec4899', secondary: '#db2777'

---

## 🚀 Deploying Your Portfolio

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push your files
3. Go to Settings > Pages
4. Select main branch
5. Your site: `https://yourusername.github.io/repo-name`

### Netlify (Free)
1. Create account at netlify.com
2. Drag and drop your project folder
3. Deploy automatically

---

## ✅ Quick Checklist

- [ ] Name updated
- [ ] Profile photo added
- [ ] Bio written
- [ ] Skills updated with correct percentages
- [ ] Projects added with descriptions
- [ ] Education updated
- [ ] Contact info updated
- [ ] Social media links added
- [ ] Colors customized (optional)
- [ ] Tested on mobile
- [ ] Deployed online

---

## 💡 Pro Tips

1. Keep it simple - Don't overload with information
2. Use quality images - Blurry images look unprofessional
3. Update regularly - Keep projects and skills current
4. Test on multiple devices - Mobile, tablet, desktop
5. Get feedback - Ask friends to review

Good luck with your portfolio! 🎉

