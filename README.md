# Myndos – AI-Powered Learning Platform with Interactive Mind Maps

## Overview

**Myndos** is a web application designed to help students learn more effectively by visualizing knowledge through interactive mind maps and verifying their progress with AI-generated exams. The application combines a visual learning experience with AI-powered testing to create a feedback loop: **Learn → Test → Track Progress → Improve**.

The MVP (Minimum Viable Product) focuses on delivering a predefined mathematical logic curriculum with an adaptive, color-coded progress tracking system that adjusts based on exam performance.

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun
- Supabase project (for database and authentication)
- OpenAI API key (for exam generation)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myndos
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
OPENAI_API_KEY=<your-openai-api-key>
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Status**: MVP in active development  
**Current Focus**: Implementing core learning and testing features with mathematical logic curriculum
