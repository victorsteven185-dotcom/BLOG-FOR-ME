# 🚀 Simple Namecheap Upload Guide (No-Code Method)

If you just want to upload your files to Namecheap's `public_html` without touching a terminal or Node.js settings, follow these exact steps:

### Phase 1: Export from AI Studio
1. Click the **Export** button in the AI Studio header.
2. Download the project as a **ZIP file**.
3. Unzip the file on your computer.

### Phase 2: Create the "Static" Build
Since Namecheap `public_html` just reads HTML/JS files:
1. If you have Node.js on your computer:
   - Open your folder in a terminal.
   - Run `npm install`.
   - Run `npm run build`.
2. **The Folder you need**: Look for the new folder named `dist`.

### Phase 3: The Namecheap Upload
1. Log into **Namecheap cPanel**.
2. Open **File Manager** -> **public_html**.
3. Upload everything **INSIDE** the `dist` folder into `public_html`.
4. **CRITICAL**: Create a new file in `public_html` called `.htaccess` and paste this in:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Why this works:
This turns your React app into a "Static Site." Namecheap servers love this because it is extremely fast and requires zero server maintenance. You get the professional look of a complex app with the ease of a simple HTML site.
