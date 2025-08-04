# Inventory Management System

A modern React-based inventory management system.

## Deployment to Netlify

### Option 1: Deploy from Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, etc.)
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18 (or latest LTS)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Manual Deploy

1. **Build locally**
   ```bash
   npm install
   npm run build
   ```

2. **Drag and drop**
   - Drag the `build` folder to Netlify's deploy area

### Environment Variables (if needed)

If your app needs environment variables, add them in Netlify's site settings under "Environment variables".

## Local Development

```bash
npm install
npm start
```

The app will run on http://localhost:3000 