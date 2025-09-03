# 🍽️ FeedTheNeed – Frontend

Frontend for **FeedTheNeed**, a platform that connects surplus food with communities in need.  
This is the **UI implementation**, prepared and structured for integration with the backend.

---

## ✅ Completed in this Task
- Rebranded project from **PlateFullPromise → FeedTheNeed**.
- Built and organized all **frontend pages**:
  - Landing Page (About, How It Works, Contact, Call To Action, Footer).
  - Login & Registration (Individual & Organization flows).
  - Admin Dashboard (User Management, Activity Feed, Pending Tasks).
  - User Dashboard (Impact Visualization, Notifications, Schedule, Quick Actions).
- Added **Navigation Header & Footer** shared across the app.
- Configured **page routing** for:
  - `/` → Landing Page
  - `/login` → Login
  - `/registration` → Registration
  - `/admin` → Admin Dashboard
  - `/user` → User Dashboard
- Ensured **responsive design** with TailwindCSS.
- Prepared the UI for **backend integration** (auth, donations, data).

---

## 🚧 Pending / Next Steps
- Connect login & registration with backend authentication APIs.
- Integrate dashboards with live backend data (users, donations, activities).
- Finalize CI/CD deployment pipeline after backend setup.

---

## ⚡ Development & Build

### Install dependencies
```sh
npm install
npm run dev 
or
npm start

Build for production
npm run build

👉 Output will be generated in the /dist folder.

Preview production build
npm run preview

Hey team,
I’ve set up the frontend structure and created the main pages (Landing, Login, Registration, User Dashboard, Admin Dashboard). Please follow the same folder and component structure when building your remaining pages.

Place each page under src/pages/{page-name} with its own index.jsx and a components/ folder.

Use TailwindCSS for styling.

Keep components small, reusable, and consistent with existing ones.

When adding a new page, don’t forget to register the route inside src/Routes.jsx.

Use AppIcon.jsx for icons and put images inside public/assets/images/.

This way, our project stays clean and consistent, and everyone’s work will integrate smoothly. 🚀