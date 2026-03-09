# انقذني — Enkzany
## Hospital Dashboard Web App — MVP Description

---

## Overview

Enkzany's hospital dashboard is a **clean, fast, web-based platform** used by hospital staff to manage their real-time bed availability data. It is the engine behind what patients see on the mobile app — when a nurse updates a number here, it reflects instantly on every patient's phone.

The design philosophy is **clinical simplicity**: white backgrounds, blue accents, zero clutter. A nurse in a busy ward should be able to complete an update in under 30 seconds without any training.

**Primary color:** `#1A5276` (deep blue)
**Secondary color:** `#2E86C1` (medium blue)
**Background:** `#FFFFFF` (white)
**Surface/cards:** `#F4F8FB` (very light blue-white)
**Text:** `#1C2833` (near black)
**Border:** `#D6E4F0` (light blue-gray)

---

## Who Uses This App

| User | Role | What They Do |
|------|------|-------------|
| Nurse / Ward Manager | Primary user | Updates bed counts multiple times per shift |
| Hospital Admin | Secondary user | Manages hospital profile and account settings |
| Enkzany Super Admin | Internal only | Onboards new hospitals, manages subscriptions |

---

## Pages & Screens

---

### 1. Login Page `/login`

**Layout:**
- Full white page, centered card (max-width 420px)
- Top of card: Enkzany logo (blue wordmark) + tagline: *"إدارة توفر الأسرة في الوقت الفعلي"*
- Below: form fields

**Form fields:**
- Email input — label: "البريد الإلكتروني / Email"
- Password input — label: "كلمة المرور / Password" with show/hide toggle
- "تذكرني / Remember me" checkbox
- Primary blue button: **"تسجيل الدخول / Login"** (full width, 48px height)
- Link below button: "نسيت كلمة المرور؟ / Forgot your password?"

**Behavior:**
- On successful login → redirect to Dashboard
- On failure → inline red error message below the button: *"البريد الإلكتروني أو كلمة المرور غير صحيحة"*
- Show a loading spinner inside the button while the request is processing
- The card has a subtle blue top border (4px solid `#1A5276`) as a branding accent

**Visual feel:**
- Page background: light blue-gray `#EBF4FB`
- Card: pure white with soft box shadow
- Hospital name appears above the card if the URL contains a hospital token

---

### 2. Forgot Password Page `/forgot-password`

- Same centered card layout as Login
- Single email input field
- Blue button: **"إرسال رابط الاستعادة / Send Reset Link"**
- On submit: green success banner: *"تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني"*
- Link back to login: *"العودة إلى تسجيل الدخول"*

---

### 3. Main Dashboard `/dashboard` ⭐

This is the **most important page**. A nurse opens this page, sees the current numbers, updates them, hits save. Done.

**Page structure:**

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  [Enkzany Logo]   مستشفى دمنهور العام        [👤 Admin ▾]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌── STATUS BANNER ──────────────────────────────────────────┐  │
│  │  🟢  الحالة الحالية: متاح  |  آخر تحديث: منذ 14 دقيقة    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌── UPDATE PANEL ────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │   🛏  أسرة عامة          [  −  ]  [ 12 ]  [  +  ]         │  │
│  │                                                            │  │
│  │   💉  عناية مركزة        [  −  ]  [  3 ]  [  +  ]         │  │
│  │                                                            │  │
│  │   🚨  طوارئ              [  −  ]  [  5 ]  [  +  ]         │  │
│  │                                                            │  │
│  │   ─────────────────────────────────────────               │  │
│  │   المجموع الكلي: 20 سرير متاح                              │  │
│  │                                                            │  │
│  │          [  تحديث الآن / Update Now  ]                     │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌── UPDATE HISTORY ──────────────────────────────────────────┐  │
│  │  سجل آخر التحديثات                          [عرض الكل]    │  │
│  │  ─────────────────────────────────────────────────────     │  │
│  │  اليوم 14:32    عامة: 12  عناية: 3  طوارئ: 5   ✓          │  │
│  │  اليوم 10:15    عامة: 8   عناية: 2  طوارئ: 3   ✓          │  │
│  │  أمس   22:00    عامة: 0   عناية: 1  طوارئ: 0   ✓          │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Header:**
- Left: Enkzany logo (blue, 32px)
- Center: Hospital name in Arabic + English (bold, `#1A5276`)
- Right: user avatar circle + name + dropdown arrow → reveals "الملف الشخصي" and "تسجيل الخروج"
- Header background: white, bottom border `1px solid #D6E4F0`, sticky on scroll

**Status banner:**
- Full-width strip below the header
- Background color changes dynamically:
  - Green `#E9F7EF` with green text → when total beds > 5 → **"الحالة الحالية: متاح"**
  - Amber `#FEF9E7` with amber text → when total beds 1–5 → **"الحالة الحالية: محدود"**
  - Red `#FDEDEC` with red text → when total beds = 0 → **"الحالة الحالية: ممتلئ"**
- Right side of banner: *"آخر تحديث: منذ 14 دقيقة"* — updates live using a timer
- If last update is over 6 hours ago: amber banner with warning icon ⚠️ *"تحذير: لم يتم التحديث منذ أكثر من 6 ساعات"*

**Update panel (the core of the page):**
- White card, blue left border accent (4px `#1A5276`), rounded corners, soft shadow
- Three rows — one per bed category: General, ICU, Emergency
- Each row contains:
  - Icon + label (Arabic on right, English below it in gray)
  - A stepper control: `[ − ]` big number field `[ + ]`
  - The number field is large (40px font, centered, 80px wide) — easy to tap on mobile too
  - Minus button disabled and grayed out when value = 0
  - Max value: 999
- Below the rows: a thin divider line
- Total row: **"المجموع الكلي: 20 سرير متاح"** — bold, blue, updates live as user changes values
- **"تحديث الآن / Update Now"** button:
  - Large, full-width, deep blue `#1A5276`, white text, 52px height
  - On hover: slightly darker blue `#154360`
  - On click: shows loading spinner inside button
  - On success: button turns green for 2 seconds + green success toast appears at top: ✅ *"تم التحديث بنجاح في 14:32"*
  - On error: red toast: ❌ *"حدث خطأ، يرجى المحاولة مرة أخرى"*

**Update history (below the panel):**
- Section title: *"سجل آخر التحديثات"* with a "عرض الكل ←" link on the left
- Shows last 5 updates in a clean table
- Columns: التاريخ والوقت | عامة | عناية مركزة | طوارئ | المجموع | بواسطة
- Alternating row backgrounds: white / `#F4F8FB`
- Header row: blue background `#1A5276` with white text

---

### 4. Full Update History `/dashboard/history`

Accessible from the "عرض الكل" link on the dashboard.

**Layout:**
- Page title: *"سجل التحديثات الكامل"*
- Date range filter: two date pickers (From / To) + blue "بحث / Search" button
- Full table with all update records, paginated (20 rows per page)
- Export button: **"تصدير CSV"** — downloads the filtered history as a spreadsheet
- Each row: timestamp, general beds, ICU beds, emergency beds, total, updated by

---

### 5. Hospital Profile `/dashboard/profile`

Where the hospital admin manages their public-facing information.

**Page layout — two-column on desktop, stacked on mobile:**

**Left column — Hospital Info Form:**
- Section title: *"معلومات المستشفى"*
- Fields:
  - Hospital name in Arabic (text input)
  - Hospital name in English (text input)
  - Address (textarea, 2 rows)
  - Phone number (tel input, with Egyptian flag prefix +20)
  - Operating hours (text input, e.g. "24/7" or "08:00 - 22:00")
  - Hospital type: radio buttons — "حكومي / Public" | "خاص / Private"
- Blue save button: **"حفظ التغييرات / Save Changes"**
- After saving: blue info banner: *"✅ تم إرسال التغييرات للمراجعة وستظهر خلال 24 ساعة"*

**Right column — Account Settings:**
- Section title: *"إعدادات الحساب"*
- Current email (read-only, gray)
- Change password form:
  - Current password
  - New password
  - Confirm new password
  - Button: **"تحديث كلمة المرور"**
- Danger zone section (red border card):
  - *"إلغاء تفعيل الحساب"* — with a warning message and a red outlined button

---

### 6. Notifications Page `/dashboard/notifications`

A simple page for in-app alerts from the Enkzany team.

**Layout:**
- List of notification cards, newest first
- Each card: blue left border if unread, gray if read
- Content: notification title (bold) + body text + timestamp
- Mark all as read button (top right)
- Types of notifications:
  - 🔔 Reminder to update bed availability
  - 💳 Subscription renewal reminder
  - 📢 Platform announcements from Enkzany team
  - ⚠️ Warning: data hasn't been updated in over 12 hours

---

### 7. Subscription Page `/dashboard/subscription`

Shows the hospital's current plan and allows upgrade.

**Layout:**
- Current plan card (highlighted in blue):
  - Plan name: أساسية / معيارية / مميزة
  - Price per month
  - Renewal date
  - Status badge: نشط (green) / منتهي (red)
- Three plan cards side by side (or stacked on mobile):

| | أساسية | معيارية | مميزة |
|--|--------|---------|-------|
| السعر | 500 جنيه/شهر | 900 جنيه/شهر | 1,500 جنيه/شهر |
| الإدراج في التطبيق | ✓ | ✓ | ✓ |
| تحديث الأسرة | ✓ | ✓ | ✓ |
| الأولوية في البحث | ✗ | ✓ | ✓ |
| سجل التحديثات | ✗ | ✓ | ✓ |
| تقرير شهري | ✗ | ✗ | ✓ |
| دعم مخصص | ✗ | ✗ | ✓ |

- Current plan card has a bold blue border
- Upgrade buttons on non-current plans: *"الترقية إلى هذه الخطة"*
- Note below: *"للاشتراك السنوي، تواصل معنا للحصول على خصم 15%"*

---

## Navigation Structure

```
Sidebar (collapsible on mobile → hamburger menu)
├── 🏠  لوحة التحكم         /dashboard
├── 📋  سجل التحديثات       /dashboard/history
├── 🏥  ملف المستشفى        /dashboard/profile
├── 🔔  الإشعارات            /dashboard/notifications   [badge with count]
└── 💳  الاشتراك             /dashboard/subscription
    ─────────────────
└── 🚪  تسجيل الخروج
```

- Sidebar background: deep blue `#1A5276`
- Active item: white background with blue text, rounded pill shape
- Inactive items: white semi-transparent text
- Sidebar width: 240px on desktop, hidden (slides in) on mobile
- Enkzany logo at the top of the sidebar (white version)
- Hospital name + type badge (حكومي/خاص) below the logo

---

## Responsiveness

| Breakpoint | Layout |
|-----------|--------|
| Desktop (> 1024px) | Sidebar + content side by side |
| Tablet (768–1024px) | Collapsed sidebar with icon-only mode |
| Mobile (< 768px) | Hamburger menu, full-width stacked layout |

The dashboard's Update Panel must be fully usable on a mobile phone — the stepper buttons must be at least 48px × 48px so nurses can tap them easily while wearing gloves or in a rush.

---

## Color Usage Guide

| Element | Color |
|---------|-------|
| Sidebar background | `#1A5276` (deep blue) |
| Primary buttons | `#1A5276` |
| Button hover | `#154360` |
| Links & active states | `#2E86C1` |
| Page background | `#FFFFFF` |
| Card/surface background | `#F4F8FB` |
| Card border | `#D6E4F0` |
| Table header | `#1A5276` with white text |
| Table row alt | `#F4F8FB` |
| Success state | `#1E8449` (green) |
| Warning state | `#D68910` (amber) |
| Error/full state | `#C0392B` (red) |
| Body text | `#1C2833` |
| Secondary text | `#5D6D7E` |

---

## Tech Stack Recommendation

- **Framework:** Next.js (React) — for routing, SSR, and easy deployment
- **Styling:** Tailwind CSS — fast, utility-first, easy to enforce the color system
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js with JWT sessions
- **Language:** TypeScript
- **Deployment:** Vercel (free tier works for MVP)
- **Real-time:** 30-second polling on the patient app side (no WebSockets needed for MVP)

---

## MVP Scope — What to Build First

| Priority | Feature | Page |
|----------|---------|------|
| 🔴 Must | Login / Logout | `/login` |
| 🔴 Must | Bed availability update panel | `/dashboard` |
| 🔴 Must | Status banner (available/limited/full) | `/dashboard` |
| 🔴 Must | Last 5 updates history | `/dashboard` |
| 🟡 Should | Hospital profile edit | `/dashboard/profile` |
| 🟡 Should | Full update history + export | `/dashboard/history` |
| 🟢 Nice | Notifications | `/dashboard/notifications` |
| 🟢 Nice | Subscription page | `/dashboard/subscription` |
| 🟢 Nice | Forgot password flow | `/forgot-password` |

---

## Key Design Rules

1. **White and blue only** — no other background colors on the main content area
2. **Every interactive element** must have a visible focus state (blue outline) for accessibility
3. **Arabic is the default language** — all labels appear in Arabic first, English below in smaller gray text
4. **RTL layout** — the entire app runs right-to-left; sidebar is on the right side on desktop
5. **The Update Now button** is always visible without scrolling on desktop — it is the primary action
6. **No unnecessary modals** — confirmations happen inline with toast notifications, not popup dialogs
7. **Data staleness is always visible** — if the last update is old, the user must see a warning before anything else