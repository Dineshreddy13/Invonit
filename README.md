
```
Invonit
├─ client
│  ├─ .env
│  ├─ components.json
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ jsconfig.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ api
│  │  │  └─ apiClient.js
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ auth
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ PublicRoute.jsx
│  │  │  └─ ui
│  │  │     ├─ button.jsx
│  │  │     ├─ checkbox.jsx
│  │  │     ├─ dialog.jsx
│  │  │     ├─ field.jsx
│  │  │     ├─ input-otp.jsx
│  │  │     ├─ input.jsx
│  │  │     ├─ label.jsx
│  │  │     ├─ select.jsx
│  │  │     ├─ separator.jsx
│  │  │     └─ textarea.jsx
│  │  ├─ index.css
│  │  ├─ layouts
│  │  │  ├─ AuthLayout.jsx
│  │  │  └─ MainLayout.jsx
│  │  ├─ lib
│  │  │  └─ utils.js
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ auth
│  │  │  │  ├─ ForgotPassword.jsx
│  │  │  │  ├─ PasswordReset.jsx
│  │  │  │  ├─ SignIn.jsx
│  │  │  │  ├─ SignUp.jsx
│  │  │  │  └─ VerifyOtp.jsx
│  │  │  └─ Dashboard.jsx
│  │  └─ store
│  │     └─ authStore.js
│  └─ vite.config.js
└─ server
   ├─ .env
   ├─ app.js
   ├─ config
   │  ├─ env.js
   │  ├─ mail.js
   │  └─ redis.js
   ├─ database
   │  ├─ db.js
   │  └─ schemas
   │     ├─ index.js
   │     └─ user.schema.js
   ├─ drizzle
   │  ├─ 0000_clever_outlaw_kid.sql
   │  └─ meta
   │     ├─ 0000_snapshot.json
   │     └─ _journal.json
   ├─ drizzle.config.js
   ├─ jobs
   │  ├─ queues
   │  │  └─ email.queue.js
   │  └─ workers
   │     └─ email.worker.js
   ├─ middlewares
   │  └─ auth.middleware.js
   ├─ modules
   │  └─ auth
   │     ├─ auth.controller.js
   │     ├─ auth.routes.js
   │     └─ auth.service.js
   ├─ package-lock.json
   ├─ package.json
   ├─ services
   │  ├─ email.service.js
   │  └─ otp.service.js
   ├─ templates
   │  └─ emails
   │     └─ otpEmail.hbs
   └─ utils
      ├─ otp.js
      ├─ templateRenderer.js
      └─ token.js

```