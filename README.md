# Portfolio

A personal portfolio website built with **Next.js** and **Tailwind CSS**.

## Tech Stack

- Next.js
- React
- Tailwind CSS (+ Tailwind animations)
- shadcn/ui (base UI components)
- Framer Motion (animations)
- Resend (contact email delivery)
- Zod + react-hook-form (form validation)

## Getting Started

1. Install dependencies: `npm install`
2. Configure environment variables: copy `.env.example` to `.env` and update the values in it
3. Run the dev server: `npm run dev`
4. Open `http://localhost:3000`.

## Environment Variables

This app uses the following variables (from `.env.example`):

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_AVATAR_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_RESUME_URL`
- `NEXT_PUBLIC_GITHUB_USERNAME`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_NAME`

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run Next.js linting

