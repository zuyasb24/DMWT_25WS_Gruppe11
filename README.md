# Green IT Repair

Green IT Repair is a React + Next.js web application that promotes sustainability, encouraging repair instead of replacement.  
The project combines storytelling, interactive UI elements, tutorials, and a community forum with real backend interaction.

---

## Overview

The website is designed as a scroll-friendly landing page with multiple sections and interactive elements:

- **Hero & About** sections introduce the problem of e-waste and repair culture
- **Interactive infographic** helps users explore repair decisions
- **Tutorial section** with filters and user ratings
- **Community forum** where authenticated users can ask and answer questions
- **Backend integration** for user authentication (login/register), forum questions and replies, and tutorial ratings

---

## Key Features

- Scroll-based storytelling landing page
- Interactive infographic (hover and click)
- Filterable repair tutorials (search, device type, difficulty)
- Tutorial rating system (database-backed)
- Community forum with questions and replies
- Authentication (login/logout)
- Backend integration for user authentication, forum content, and tutorial ratings
- Responsive design (Tailwind CSS)
- UI animations (Framer Motion and integrated GIF animations)

---

## Content Creator Access (Scope Note)

The **Content Creator access** shown on the website is a **planned feature** and is **not implemented** in this prototype.

- The “Request creator access” CTA redirects users to the **Contact page**
- This is intentional and demonstrates the **conceptual user flow**
- Full creator workflows were **out of scope** and not part of the assignment requirements

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React (TypeScript / TSX)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion + integrated GIF animations
- **Authentication:** NextAuth
- **Database:** PostgreSQL (Neon via Vercel Postgres)
- **Deployment:** Vercel

---

## Project Structure & Architecture

The frontend follows a **component-based structure inspired by Atomic Design**:

- **atoms/** – small, reusable UI elements  
- **molecules/** – combinations of atoms (cards, form elements)  
- **organisms/** – larger UI sections composed of multiple components  
  (e.g. Hero, Header, Infographic, Forum, About)

Pages such as **Legal Notice** and **Privacy Policy** are implemented as standalone components but follow the same structural principles.

This structure improves clarity, reusability, and maintainability.

- State updates are immutable and trigger proper re-renders.
- Responsive styling is implemented using Tailwind utility classes.

---

## Backend Usage

The application includes real backend interaction via API route handlers:
- User authentication and session handling
- Fetching and creating forum questions and replies (authenticated users)
- Fetching and submitting tutorial ratings
- Persisting all data in a PostgreSQL database

---
## Code Documentation

The codebase follows a **clean-code approach**:

- Clear naming and structure are preferred over excessive inline comments  
- Comments are added only where additional context is needed (e.g. API routes, auth flow)  
- High-level architecture and design decisions are documented **in this README**

---

## AI Usage Disclosure

AI tools were used as **support during development**.  
All final decisions, code integration, and verification were performed manually.

### AI Usage Overview
All images used in the project (including the hero background and infographic visuals) are **AI-generated** and used solely for illustrative and non-commercial purposes.

| Area | AI Usage | Manual Verification |
|-----|---------|---------------------|
| Images | Hero background image generated using an AI image tool | Visual inspection; used only as a decorative background |
| Text Content | Drafting and rephrasing section text | Manual editing for clarity, tone, and consistency |
| Debugging | Assistance understanding errors and edge cases | Manual testing of login, forum, and rating flows |
| Refactoring | Suggestions for component structure and state handling | Verified props/state flow and React best practices |
| Styling | Tailwind CSS class and layout suggestions | Checked responsiveness and UI behavior on different screen sizes |

### Verification Process

- Tested authentication (login/logout) behavior
- Created and retrieved forum questions and replies
- Verified tutorial rating updates and database persistence
- Ensured state updates were immutable and triggered correct re-renders
- Reviewed effects (`useEffect`) dependency arrays and side-effect usage

---
## My Contribution

This project was developed as part of a university group assignment.

My primary responsibilities included:

- Overall UI/UX concept and implementation (Tailwind + global styling system)
- Full-stack development using Next.js
- Frontend routing and reusable component architecture
- Responsive design implementation
- Interactive infographic implementation
- Backend/API integration with Neon database (authentication, forum, tutorials with rating/like system)
- State management, debugging, troubleshooting, and deployment
- Project coordination and technical integration of all components

---
## Running Locally

```bash
npm install
npm run dev

---


