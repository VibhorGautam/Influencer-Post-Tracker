# Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Influencer Tracker MVP"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

## Alternative Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `.next` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect Next.js and deploy

### Manual Static Export
1. Add to `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```
2. Run: `npm run build`
3. Upload the `out` folder to any static hosting service

## Environment Variables

For production deployment, you may want to add:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Performance Optimizations

The app is already optimized with:
- ✅ Static generation
- ✅ Code splitting
- ✅ Image optimization
- ✅ CSS optimization
- ✅ TypeScript compilation

## Post-Deployment Checklist

- [ ] Test all functionality on live URL
- [ ] Verify localStorage persistence
- [ ] Test mobile responsiveness
- [ ] Check form validation
- [ ] Test status filtering
- [ ] Verify campaign totals calculation

## Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- Vercel Analytics (if using Vercel)

## Custom Domain

If using Vercel:
1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
