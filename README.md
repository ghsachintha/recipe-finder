# MELO - Interactive Recipe Finder

A responsive, user-centric recipe application designed for the Associate UI/UX Engineer assessment. This project bridges the gap between high-fidelity design and functional React development.

## 🚀 Live Demo
(https://melo-recipe-finder.vercel.app/)

## 🎨 Design Rationale
**Target User:** Busy individuals and food enthusiasts looking for quick, reliable recipe inspiration without clutter.

**Key UX Decisions:**
* **"Surprise Me" Feature:** Addresses decision paralysis by offering instant recipe suggestions.
* **Dark Mode:** Implemented a high-contrast dark theme for comfortable night-time browsing, a crucial feature for modern apps.
* **Visual Hierarchy:** Prioritized high-quality imagery and clear "difficulty/time" tags to help users scan recipes quickly.
* **Mobile-First Navigation:** Designed a dedicated mobile drawer menu to keep the interface clean on smaller screens.

## ✨ Features Implemented
* **Recipe Search:** Real-time search using TheMealDB API.
* **Dynamic Filtering:** Category filtering (Seafood, Breakfast, etc.) via intuitive pill labels.
* **Favorites System:** Persists user favorites to `localStorage` so data isn't lost on refresh.
* **Responsive Design:** Fully fluid layout that adapts from Desktop to Mobile.
* **Dark Mode:** Global theme toggle with persistent state.
* **Recipe Details:** Comprehensive view with parsed ingredient lists and step-by-step instruction splitting.

## 🛠️ Tech Stack
* **Frontend:** React (Vite), functional components, Hooks (`useState`, `useEffect`, `useMemo`).
* **Styling:** SCSS (SASS) with CSS Variables for theming.
* **Routing:** React Router DOM v6.
* **Icons:** Lucide React.
* **API:** TheMealDB (Free public API).

## ⚙️ Setup & Installation
To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ghsachintha/recipe-finder.git
    cd recipe-finder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 💡 Challenges & Solutions
* **API Limitations:** The API provides instructions as a single text block. I implemented a parsing function to split the text by newlines, creating a structured "Step-by-Step" view.
* **Theme Management:** Managing colors across components was solved by using CSS Variables (`var(--card-bg)`, `var(--text-color)`) defined in a global SCSS file.