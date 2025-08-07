# 💇‍♀️ HairCare+ – Hair Clinic Management System (Frontend)

> A modern, mobile-first React Native app (frontend-only) for managing hair clinic workflows. Built with **Expo** and **TypeScript**, this app is designed for two user roles: **Doctor/Receptionist** and **Patient**. It helps track treatment timelines, upload patient photos, and generate visual progress reports.

---

## 📱 App Features (Frontend)

### 🔐 Authentication UI
- Login/Signup screens with user role selection (Doctor or Patient)
- Forgot Password UI
- Onboarding screens to introduce app features
- Splash screen with logo and tagline

### 👨‍⚕️ Doctor / Receptionist UI
- Dashboard screen with:
  - Add New Patient
  - View Existing Patients
  - Recent Activity
  - Payment Records
- Patient Type Selector (New vs Existing)
- Add New Patient form
- Search Existing Patients
- Patient Profile with:
  - Timeline (sessions, notes, uploads)
  - Photo Upload (Front/Left/Right/Back slots with notes)
  - Payment summary
  - Export to PDF (UI only)
- Settings screen

### 👤 Patient UI
- Patient Dashboard: “My Treatment”, “Download Reports”
- Visual treatment timeline
- Report download center (PDF/Image download UI only

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/HairCarePlus.git
cd HairCarePlus
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn
3. Start the development server
bash
Copy
Edit
npx expo start
📌 Notes
This is the frontend-only version. Backend integration with Firebase or a Node.js API will follow.

All data currently uses mocked states or static content.

PDF generation, image uploads, and authentication are currently UI-only – backend integration is planned in upcoming versions.

📅 Upcoming Milestones
 Connect to Firebase Authentication and Firestore

 Enable real image uploads using Firebase Storage

 Add PDF report generation

 Enable push notifications for appointments

