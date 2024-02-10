
<p align="center">
<a href=https://github.com/vagnermaltauro/doc-quest target="_blank">
<img src='/placeholder.jpg' width="100%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/top/vagnermaltauro/doc-quest" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/code-size/vagnermaltauro/doc-quest" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/stars/vagnermaltauro/doc-quest" alt="GitHub stars" />
<img src="https://img.shields.io/github/deployments/vagnermaltauro/doc-quest/production" alt="GitHub deployment" />
</p>

## 📌 Overview

Doc-Quest is a Modern Fullstack SaaS-Platform

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [✅ Prerequisites](#prerequisites)

* [🚀 Run Locally](#run-locally)

## 📁 Project Structure

```bash
├── .commitlintrc.json
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .husky
│   └── commit-msg
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── README.md
├── app
│   ├── _trpc
│   │   └── client.ts
│   ├── api
│   │   ├── auth
│   │   │   └── [kindeAuth]
│   │   │       └── route.ts
│   │   ├── message
│   │   │   └── route.ts
│   │   ├── trpc
│   │   │   └── [trpc]
│   │   │       └── route.ts
│   │   ├── uploadthing
│   │   │   ├── core.ts
│   │   │   └── route.ts
│   │   └── webhooks
│   │       └── stripe
│   │           └── route.ts
│   ├── auth-callback
│   │   └── page.tsx
│   ├── dashboard
│   │   ├── [fileId]
│   │   │   └── page.tsx
│   │   ├── billing
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── page.tsx
│   └── pricing
│       ├── _pricing-items.ts
│       └── page.tsx
├── components.json
├── components
│   ├── billing-form.tsx
│   ├── chat
│   │   ├── chat-context.tsx
│   │   ├── chat-input.tsx
│   │   ├── chat-wrapper.tsx
│   │   ├── message.tsx
│   │   └── messages.tsx
│   ├── dashboard.tsx
│   ├── icons.tsx
│   ├── max-width-wrapper.tsx
│   ├── nav-bar.tsx
│   ├── pdf-fullscreen.tsx
│   ├── pdf-renderer.tsx
│   ├── providers.tsx
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.ts
│   ├── upgrade-button.tsx
│   └── upload-button.tsx
├── config
│   ├── infinite-query.ts
│   └── stripe.ts
├── db
│   └── index.ts
├── lib
│   ├── openai.ts
│   ├── pinecone.ts
│   ├── stripe.ts
│   ├── uploadthing.ts
│   ├── utils.ts
│   └── validators
│       └── send-message-validator.ts
├── middleware.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── public
│   ├── next.svg
│   └── vercel.svg
├── styles
│   └── globals.css
├── tailwind.config.ts
├── trpc
│   ├── index.ts
│   └── trpc.ts
├── tsconfig.json
└── types
    └── message.ts
```

## ✅ Prerequisites

- Prerequisite 1

- Prerequisite 2

## 🚀 Run Locally
1.Clone the doc-quest repository:
```sh
git clone https://github.com/vagnermaltauro/doc-quest
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

