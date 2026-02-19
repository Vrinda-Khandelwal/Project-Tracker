Project Tracker Dashboard

## Project Overview

This is a lightweight Project Tracker Dashboard built using React and TypeScript.
The application allows users to view and update project information such as status, current phase, description, and notes.

The focus of this project is clean component structure, predictable state management, and reusable UI patterns.

---

## Tech Stack

1 React – Component-based UI
2 TypeScript – Type safety
3 Vite – Development tooling
4 Tailwind CSS – Utility-first styling
5 Static mock data – Frontend-only data handling

---

## Folder Structure

```
src/
├── components/      → Reusable UI components (TextField, StatusBadge)
├── lib/
│   ├── types.ts     → Shared TypeScript types
│   └── utils.ts     → Helper functions (formatDate, statusMeta, etc.)
├── App.tsx          → Main state management and layout
├── main.tsx         → Entry point
```

1 components/ keeps UI modular and reusable.
2 lib/ separates business logic and utilities from UI.
3 App.tsx acts as the central data controller.

This structure keeps concerns separated and improves maintainability.

---

## How Data Flows Through the App

The application follows a simple top-down data flow:

1. `App.tsx` stores project data using `useState`.
2. Data is passed to child components as props.
3. User interactions trigger `onChange` handlers.
4. State updates cause React to re-render the UI.

Flow summary:

```
User Input → State Update (App) → Props → UI Re-render
```

Data is handled locally using static mock data (no backend integration).

---

## How AI Was Used

AI was used as a development assistant to:

* Optimize component readability
* Help structure documentation

---

## One Thing I’d Refactor If This Grew

If this application scaled, I would:

* Introduce a global state solution (Context API or Zustand)
* Separate form logic into custom hooks
* Add a dedicated API layer
* Implement structured form validation
* Create a design system for consistent styling

---

## Live Link

Deployement Link:- https://project-tracker-azure.vercel.app/
