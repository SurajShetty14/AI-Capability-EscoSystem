# AssessAI Admin Dashboard

A modern, AI-powered assessment platform admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dashboard Overview**: Real-time metrics, charts, and activity feeds
- **Assessment Management**: Create, manage, and track assessments
- **Candidate Management**: Comprehensive candidate profiles and tracking
- **Analytics**: Detailed analytics with charts and insights
- **DSA Competency Builder**: Build data structures and algorithms competencies
- **Activity Logs**: Real-time activity tracking
- **Reports**: Generate and schedule reports
- **Settings**: Comprehensive settings management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assessai-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Dashboard routes
│   │   ├── layout.tsx        # Dashboard layout
│   │   ├── page.tsx          # Dashboard home
│   │   ├── assessments/      # Assessment pages
│   │   ├── candidates/       # Candidate pages
│   │   ├── analytics/        # Analytics pages
│   │   └── ...
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── dashboard/            # Dashboard components
│   ├── assessments/          # Assessment components
│   └── ...
├── lib/
│   ├── utils.ts              # Utility functions
│   ├── constants.ts          # Constants
│   ├── types.ts              # TypeScript types
│   └── api.ts                # API client
├── hooks/                     # Custom React hooks
└── store/                     # Zustand stores
```

## 🎨 Design System

The dashboard uses a custom design system with:
- **Primary Color**: Indigo (#6366F1)
- **Secondary Color**: Emerald (#10B981)
- **Accent Color**: Amber (#F59E0B)
- **Error Color**: Red (#EF4444)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The dashboard includes authentication setup. Configure your auth provider in the settings.

## 📊 Features in Development

- [ ] Complete assessment creation flow
- [ ] AI-powered question generation
- [ ] Advanced analytics
- [ ] Real-time proctoring
- [ ] Email notifications
- [ ] API integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

