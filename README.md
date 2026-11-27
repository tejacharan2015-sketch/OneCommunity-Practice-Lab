# Commonspace — OneCommunity OS Practice Lab

A deliberately imperfect React + JavaScript + Vite community-management dashboard. It is a **separate training project**: it does not connect to OneCommunity OS, Firebase, or any real resident data.

## Run it

1. Install Node.js (LTS).
2. Extract this ZIP and open the `onecommunity-practice-lab` folder in VS Code.
3. Open the VS Code terminal in this folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address printed by Vite (usually `http://localhost:5173`).

To check the production build:

```bash
npm run build
```

## What is included

- React functional components and hooks (`useState`, `useMemo`)
- JavaScript data arrays and array methods (`map`, `filter`)
- Props and component composition
- Event handlers and controlled inputs
- Conditional rendering
- CSS layout, responsive design, tables, cards, and modal UI
- Vite development and production build setup

## Team practice rules

- Work on a separate Git branch per person.
- Before editing, run the app and reproduce the reported behaviour.
- Make one focused fix per commit.
- Do not remove features to hide a bug.
- After each fix, test the affected feature and at least one nearby feature.
- Merge only after the team has reviewed the changes.

Suggested branches:
- `main` — shared starting point
- `anup-fixes`
- `partner-fixes`

## Bug-fix missions

The app has intentional defects. Treat these as issue tickets; do not immediately inspect every line and try random changes. Reproduce, locate, fix, and verify.

### Mission 1 — Resident search
On the Residents page, search for a resident by name, unit, or email. One of those search paths behaves incorrectly. Make all three work, including mixed uppercase/lowercase input.

### Mission 2 — Status filter
Combine the search box with the status dropdown. The results should satisfy **both** conditions at the same time. Check the current filtering logic.

### Mission 3 — Request workflow
On the Requests page, update a request more than once. The status cycle is incomplete or inconsistent. Define a sensible workflow:
- Open → In progress
- In progress → Resolved
- Resolved → Open

### Mission 4 — Add resident
Add a resident with a full name and unit. Check the dashboard count, directory row, initials, and generated email. Then try a name with extra spaces. Make the form input handling robust.

### Mission 5 — Header search
The top-right global search field is visible on the dashboard. Test it on the Residents and Requests pages. Decide what the global search should do and implement consistent behaviour, rather than leaving it disconnected from the page content.

### Mission 6 — Empty and edge states
Try a search with no matches, add a resident, and change filters. Check table layout, empty-state messaging, and whether the interface remains usable on a narrow screen.

### Mission 7 — Data persistence (extension)
Refresh the browser after adding a resident or updating a request. Changes currently reset. Add browser persistence with `localStorage`, including safe parsing and a fallback to the initial sample data.

### Mission 8 — Quality pass (extension)
Improve accessibility and reliability:
- Add useful labels to inputs and buttons.
- Ensure modal close/cancel behaviour is consistent.
- Prevent accidental form submission from non-submit buttons.
- Check the browser console and fix warnings/errors.

## Definition of done

A mission is complete when:
1. You can explain the root cause.
2. The fix is small and understandable.
3. You have tested the expected path and at least one edge case.
4. `npm run build` succeeds.
5. Your branch is pushed and ready for review.

## Important

This project intentionally contains bugs for learning. The sample names and contact details are fictional. Never paste real OneCommunity credentials, API keys, Firebase configuration, or resident data into this practice project.
