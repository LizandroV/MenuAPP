# 🍽️ Restaurant Menu App

A web app for restaurants to display their menu publicly and manage it privately.

**Live demo:** [menu-app-umber-ten.vercel.app](https://menu-app-umber-ten.vercel.app)

---

## Features

- Public menu organized by category: Starters, Mains, Specials, and Drinks
- Each dish shows a photo, description, and price
- Sold-out items are visually crossed out in real time
- Private admin panel to add, edit, delete dishes and upload photos
- Secure login for restaurant owners

---

## Tech Stack

|                 |                          |
| --------------- | ------------------------ |
| React + Vite    | Frontend                 |
| Tailwind CSS    | Styling                  |
| React Router v6 | Navigation               |
| Supabase        | Database, auth & storage |
| Vercel          | Hosting                  |

> Total cost: **$0/month**

---

## Local Setup

```bash
git clone https://github.com/LizandroV/MenuAPP.git
cd MenuAPP
npm install
npm run dev
```

Create a `.env.local` file in the root:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project → **Settings → API**.

---

## License

Private project — all rights reserved.
