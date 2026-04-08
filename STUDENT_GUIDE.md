# Student Guide

This project is a React Native app built with Expo Router, Redux Toolkit, and i18next.

## Important note about comments

- Most `.ts` and `.tsx` files now have a teaching-style header comment at the top.
- The locale files are `.json`, and JSON does not support comments.
- Because of that, the translation files are explained here instead of inside the JSON files themselves.

## Recommended reading order

1. `app/_layout.tsx`
2. `app/src/app/bootstrap.ts`
3. `app/src/store/store.ts`
4. `app/src/store/hooks.ts`
5. `app/src/i18n/index.ts`
6. `app/index.tsx`
7. `app/src/Screens/landingScreen.tsx`
8. `app/src/Navigation/bottomNav.tsx`
9. `app/src/features/notes/model/noteModel.ts`
10. `app/src/features/notes/state/notesSlice.ts`
11. `app/src/features/notes/storage/notesStorage.ts`
12. `app/src/Screens/notesScreen.tsx`
13. `app/src/Screens/noteDetailsScreen.tsx`
14. `app/src/Screens/settingsScreen.tsx`
15. `app/src/Screens/tasksScreen.tsx`

## How the project is organized

### `app/`

- Holds Expo Router route files.
- Each file here becomes a route automatically.
- Example:
  - `index.tsx` -> `/`
  - `notes.tsx` -> `/notes`
  - `tasks.tsx` -> `/tasks`
  - `settings.tsx` -> `/settings`

### `app/src/app/`

- Holds startup and app-level preparation logic.
- `bootstrap.ts` prepares data and language before the app becomes visible.

### `app/src/store/`

- Holds Redux store setup and typed hooks.
- `store.ts` creates the store.
- `hooks.ts` exports typed `useDispatch` and `useSelector` helpers.
- `registerPersistence.ts` connects note changes to device storage.

### `app/src/features/notes/`

- Holds the notes feature domain and state.
- `model/noteModel.ts` defines note types, constants, and helpers.
- `state/notesSlice.ts` defines note Redux actions and reducers.
- `storage/notesStorage.ts` saves and loads notes from the device.

### `app/src/Screens/`

- Holds screen-level components.
- Screens coordinate data, navigation, and presentation components.

### `app/src/Notes/Components/`

- Holds reusable UI pieces for the notes feature.
- These components should mostly focus on rendering, not business logic.

### `app/src/Tasks/Components/`

- Holds reusable UI pieces for the tasks feature.

### `app/src/Landing/`

- Holds reusable UI pieces for the landing/home section.

### `app/src/i18n/`

- Holds translation setup and locale files.
- `index.ts` configures languages, namespaces, RTL, and saved language state.

## Translation files explained

### `app/src/i18n/locales/en/common.json`
### `app/src/i18n/locales/ar/common.json`

- Shared text used in multiple parts of the app.
- Good place for reusable labels like bottom navigation names.

### `app/src/i18n/locales/en/landing.json`
### `app/src/i18n/locales/ar/landing.json`

- Text specific to the landing screen.

### `app/src/i18n/locales/en/tasks.json`
### `app/src/i18n/locales/ar/tasks.json`

- Text specific to the tasks screen and task components.

### `app/src/i18n/locales/en/notes.json`
### `app/src/i18n/locales/ar/notes.json`

- Text specific to the notes screen and note list components.

### `app/src/i18n/locales/en/settings.json`
### `app/src/i18n/locales/ar/settings.json`

- Text specific to the settings screen.

## How to study a screen file

When you open a screen like `notesScreen.tsx`, read it in this order:

1. Imports
   - Learn which feature files and UI components it depends on.
2. Small helper functions
   - These usually transform data for the screen.
3. Hooks and local state
   - Look for `useState`, `useRef`, `useTranslation`, and Redux selectors.
4. Derived values
   - These are filtered or sorted values built from the main state.
5. Event handlers
   - These explain what happens when the user taps or types.
6. JSX return
   - This is the rendered UI tree.

## How to study a Redux slice

When you open `notesSlice.ts`, read it in this order:

1. Imported model types and helpers
2. Slice state type
3. Initial sample data
4. Initial state
5. Helper functions
6. Reducers
7. Exported actions
8. Default reducer export

## How to study the i18n system

Read `app/src/i18n/index.ts` slowly from top to bottom:

1. Imported locale files
2. Language and route types
3. Storage keys
4. Helper functions
5. `initI18n`
6. Language persistence helpers
7. Route persistence helpers
8. `hydrateStoredLanguage`
9. `setAppLanguage`
10. `toggleAppLanguage`
11. `isRTL`

## Best advice for the student

- Read one file at a time, then immediately trace its imports.
- Compare the notes feature with the tasks feature to see two different complexity levels.
- Follow the data:
  - route file -> screen -> component -> Redux action -> storage
- Follow the text:
  - screen/component -> `useTranslation(...)` -> locale JSON file
- Follow the startup:
  - `_layout.tsx` -> `bootstrap.ts` -> `store.ts` -> `i18n/index.ts`

## Final note

You asked for very heavy explanation so the student can learn from the project.
The code files now include file-level teaching comments, and this guide fills the gap for the JSON files and architecture-level reading.
If you want the next step, a good one would be:

1. create `STUDENT_GUIDE_NOTES_FLOW.md` just for the notes feature
2. create `STUDENT_GUIDE_TASKS_FLOW.md` just for the tasks feature
3. create `STUDENT_GUIDE_I18N.md` just for translations and RTL
