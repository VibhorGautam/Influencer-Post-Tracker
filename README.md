# Influencer Post Tracker

A modern, user-friendly web app to track influencer marketing campaigns. Built with Next.js and designed for non-technical team members to use daily.

## 🚀 Live Demo

**[View Live App on Vercel →](https://influencer-post-tracker-1poe.vercel.app/)**

## 📋 What This App Does

Track everything about your influencer campaigns in one place:

- **Influencer Details**: Username, profile links, platform (Instagram/TikTok/Both)
- **Performance Metrics**: Average views, total views, current campaign views
- **Video Management**: Track up to 4 videos per influencer with links, titles, and dates
- **Status Tracking**: Script Needed → Approve Needed → Posted → Paid
- **Campaign Totals**: See overall campaign performance at a glance

## ✅ All Requirements Met

### Must-Have Features ✓
- ✅ Track all influencer data (username, profile, platform, views, video links, dates)
- ✅ Add new influencers with easy-to-use form
- ✅ Status filtering with toggle buttons (Posted/Script Needed/Approve Needed/Paid)
- ✅ Data persists when you refresh the page
- ✅ Campaign totals automatically calculated

### Nice-to-Have Features ✓
- ✅ "Mark as Paid" button that updates instantly
- ✅ Mobile-friendly design that works on phones and tablets

## 🎯 Bonus Features We Added

We went way beyond the original requirements and built something that feels like a professional tool:

### Excel-Like Experience
- **Advanced Filtering**: Filter by platform, status, view ranges, date ranges
- **Smart Sorting**: Click any column header to sort (username, views, dates, etc.)
- **Search**: Find influencers instantly by typing their username
- **Clear Filters**: Reset all filters with one click

### Professional Design
- **Clean Interface**: Modern design that's pleasant to use daily
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Visual Status Badges**: Color-coded status indicators
- **Platform Icons**: Instagram and TikTok icons for quick recognition
- **Enhanced Visibility**: Dark, readable text and placeholder text throughout

### Enhanced Data Management
- **Campaign System**: Organize influencers into different campaigns
- **Individual Video Status**: Each video can have its own status
- **Optional Dates**: Don't require dates until videos are actually posted
- **Smart Calculations**: Total views auto-calculate (median × 5)
- **Form Reorganization**: Dates and statuses grouped with their respective videos

### User Experience Improvements
- **Inline Editing**: Click any field to edit it directly in the table
- **Expandable Rows**: Click "View" to see detailed video information
- **Form Validation**: Prevents errors with smart form validation
- **Loading States**: Smooth transitions and feedback
- **Sample Data**: Load example data to test the app immediately
- **Intuitive Labels**: Changed "Details" to "View" for better clarity

### Technical Excellence
- **Fast Performance**: Built with Next.js for speed
- **Local Storage**: Data saves automatically in your browser
- **Type Safety**: Built with TypeScript to prevent bugs
- **Modern Code**: Clean, maintainable codebase

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS for modern design
- **Language**: TypeScript for reliability
- **Storage**: Browser localStorage (no database needed)
- **Deployment**: Vercel for instant global access

## 🚀 Quick Setup

1. **Clone the repo**
   ```bash
   git clone [your-repo-url]
   cd influencer-tracker-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

That's it! No database setup, no API keys, no complicated configuration.

## 📱 How to Use

1. **Create a Campaign**: Start by creating your first campaign
2. **Add Influencers**: Use the "Add New Influencer" button
3. **Track Progress**: Update video statuses as work progresses
4. **Mark as Paid**: Use the green "Mark Paid" button when payments are complete
5. **Filter & Search**: Use the filters to find exactly what you need

## ⏱ Development Time

**Total Time Spent**: ~8 hours

**Breakdown**:
- Initial setup and basic features: 3 hours
- Advanced filtering and sorting: 2 hours
- Mobile responsiveness and design: 2 hours
- Polish and additional features: 1 hour

## 🔮 What We'd Add Next

If we had more time, here's what would make this even better:

1. **Export Features**: Download data as Excel/CSV files
2. **Team Collaboration**: Multiple users, comments, notifications
3. **Analytics Dashboard**: Charts and graphs for campaign performance
4. **Integration**: Connect with Instagram/TikTok APIs for automatic data
5. **Templates**: Save campaign templates for faster setup
6. **Backup**: Cloud storage and data backup options

## 💭 Development Notes

- **AI Assistance**: Used AI tools (Claude/Cursor) for faster development and code review
- **Mobile-First**: Designed for mobile users first, then enhanced for desktop
- **User-Focused**: Every feature was built thinking "would a non-technical person enjoy using this?"
- **Performance**: Optimized for speed - everything loads instantly
- **Accessibility**: High contrast, clear labels, keyboard navigation support

## 🎨 Design Philosophy

We focused on making this feel like a tool people would actually want to use:

- **Simple but Powerful**: Easy for beginners, powerful for advanced users
- **Visual Clarity**: Color-coded statuses, clear typography, logical layout
- **No Friction**: Minimal clicks to get things done
- **Forgiving**: Easy to undo mistakes, clear error messages
- **Professional**: Looks good in client presentations

## 🤝 Perfect For

- Marketing agencies tracking multiple influencer campaigns
- Brands managing their own influencer partnerships
- Social media managers organizing content creators
- Anyone who needs to track video content and payments

---

**Built with ❤️ for teams who want influencer tracking that actually works.**
