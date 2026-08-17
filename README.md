# 🏫 Xanaano - Daryeel Management System

Welcome to **Xanaano**, a comprehensive and modern multi-tenant school and care management platform. Built with a focus on speed, user experience, and scalability, Xanaano empowers platform administrators, school staff, teachers, and parents with powerful tools to streamline educational and administrative tasks.

---

## 🌟 Key Features & Role-Based Portals

### 👑 Super Admin (Platform Management)
- **Multi-Tenant Architecture:** Effortlessly manage multiple schools and tenants from a single dashboard.
- **Subscriptions & Billing:** Handle subscription plans, track platform payments, and monitor revenue growth.
- **System Control:** Oversee school admins, platform users, roles, permissions, audit logs, and platform-wide announcements.

### 🏢 School Administration
- **Entity Management:** Efficiently manage students, teachers, parents, classes, sections, and subjects.
- **Academic Operations:** Track daily attendance, build and manage timetables, handle assignments, input exams, compute results, and generate detailed report cards.
- **Financial Tracking:** Handle school fee collections, process payments, issue invoices, and manage school expenses.
- **Communication Hub:** Broadcast important announcements, schedule events, and utilize internal messaging.

### 👨‍🏫 Teacher Portal
- **Classroom Management:** View assigned classes, monitor students, and record attendance with ease.
- **Academic Tools:** Create assignments, record exam scores, and track individual student performance.
- **Stay Connected:** Keep up with school announcements, messages, and real-time notifications.

### 👨‍👩‍👧‍👦 Parent Portal
- **Student Progress:** Monitor your children's daily attendance, assignments, exam scores, and overall academic results.
- **Financial Overview:** View fee structures, track past payments, and easily access pending invoices.
- **Engagement:** Stay continuously updated with school announcements, upcoming events, and direct messaging with teachers and administration.

---

## 🛠️ Technology Stack

Xanaano is built using a modern, fast, and highly responsive web stack designed for peak performance:

- **Core Framework:** React 19 & React DOM 19
- **Build Tooling:** Vite 8 (Lightning-fast HMR and highly optimized production builds)
- **Styling:** Tailwind CSS v4 (Utility-first CSS, seamlessly integrated via the Vite plugin)
- **Language:** TypeScript 5.7 (Providing strong typing for robust, error-free code quality)
- **Data Visualization:** Recharts (For creating beautiful, interactive data dashboards and reporting tools)
- **Code Formatting:** oxfmt (For consistent and clean codebase formatting)

---

## 🚀 Getting Started

Follow these simple steps to get a local development copy up and running:

### Prerequisites
Make sure you have Node.js and a package manager like `npm` or `pnpm` installed on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate into the project directory:**
   ```bash
   cd xanaano
   ```

3. **Install the required dependencies:**
   ```bash
   npm install
   # or if using pnpm
   pnpm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   *The application will start in development mode, automatically listening on `0.0.0.0` for easy local network access.*

---

## 🏗️ Project Structure

- **`src/components/`** — Reusable UI components including Layouts, Data Tables, Modals, and Navigation bars.
- **`src/pages/`** — Role-specific views nicely organized into subdirectories (`superadmin`, `schooladmin`, `teacher`, `parent`, `shared`).
- **`src/data/`** — Mock data models representing the complex application state during development.
- **`src/context/`** — Global state management utilizing React Context (e.g., `AppContext` for user sessions).
- **`src/App.tsx`** — Main application routing engine and role-based access control logic.
- **`src/index.css`** — Global CSS entry point where Tailwind v4 is imported and customized.

---

## 🎨 Styling Guidelines

We heavily utilize **Tailwind CSS v4**. All global styles and theme customizations are centralized directly in `src/index.css` using the new `@theme` directive. You won't find a `tailwind.config.js` file here—everything is beautifully streamlined via Vite!

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are always welcome! 
- Please ensure that any new features utilize the established UI component patterns.
- Always strongly type new features using TypeScript.
- Before committing your work, remember to run the formatter to maintain a beautifully clean codebase:
  ```bash
  npm run format
  ```
