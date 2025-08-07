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

gbengs install steps

1. Install Node

```bash
winget install OpenJS.NodeJS.LTS
```
2. Check the version to confirm installation(optional)

```bash
node --version
```
Restart your Terminal and IDE  if you get an ERROR and run the version confirmation code again.

3. install npm 

A. First, Remove package-lock.json file in the cloned repo, this allows your npm to install properly and creates the node_modules in your project directory.

```bash
Remove-Item -Force package-lock.json
```

B. Next, proceed to install npm.

```bash
npm install
```
C. Check the version to confirm installation(optional)

```bash
npm --version
```
D. To address all issues (including breaking changes), run:
  npm audit fix --force

E. If packages are looking for funding  
   run `npm fund` for details

4. Starting the Frontend Server
   
   ```bash
      npm start
   ```
