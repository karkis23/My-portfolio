# 🗝️ React & Frontend — Key Notes (Cheat Sheet)

## Hooks Summary Card

| Hook | Purpose | Re-renders? | Example |
|---|---|---|---|
| `useState` | Component state | ✅ Yes | `const [count, setCount] = useState(0)` |
| `useEffect` | Side effects (fetch, timers, subscriptions) | — | `useEffect(() => { fetch(...) }, [dep])` |
| `useRef` | Mutable reference, DOM access | ❌ No | `const ref = useRef(null)` |
| `useMemo` | Cache expensive computation | — | `useMemo(() => sort(data), [data])` |
| `useCallback` | Cache function reference | — | `useCallback((x) => fn(x), [dep])` |
| `useContext` | Access context value | ✅ Yes (on change) | `const theme = useContext(ThemeCtx)` |
| `useReducer` | Complex state logic | ✅ Yes | `const [state, dispatch] = useReducer(reducer, init)` |
| `useId` | Unique ID for accessibility | ❌ No | `const id = useId()` |

## useEffect Rules

```
useEffect(() => { ... })                → Runs on EVERY render
useEffect(() => { ... }, [])            → Runs ONCE on mount
useEffect(() => { ... }, [dep])         → Runs when dep changes
useEffect(() => { return () => {} }, []) → Cleanup on unmount
```

**Always clean up:** intervals, timeouts, subscriptions, event listeners, WebSockets

## Component Lifecycle (Hooks vs Class)

```
Mount:    useEffect(() => { ... }, [])     ≈  componentDidMount
Update:   useEffect(() => { ... }, [val])  ≈  componentDidUpdate
Unmount:  useEffect(() => { return cleanup }, [])  ≈  componentWillUnmount
```

## React Rendering Rules

1. **State change → re-render** (component and all children)
2. **Props change → re-render** (unless wrapped in `memo`)
3. **Context change → re-render** (all consumers)
4. `useRef` changes → **NO re-render**
5. Variables outside useState → **lost on re-render**

## Anti-Patterns to Avoid

```tsx
// ❌ BAD: Object/array in dependency causes infinite loop
useEffect(() => { ... }, [{ key: 'val' }]);

// ✅ GOOD: Use primitive values or useMemo
const dep = useMemo(() => ({ key: 'val' }), []);
useEffect(() => { ... }, [dep]);

// ❌ BAD: setState in useEffect without condition (infinite loop)
useEffect(() => { setCount(count + 1) });

// ❌ BAD: Mutating state directly
items.push('new');  // DON'T mutate!
setItems([...items, 'new']);  // DO create new array

// ❌ BAD: Missing key in lists
items.map(item => <div>{item}</div>);
// ✅ GOOD
items.map(item => <div key={item.id}>{item}</div>);
```

## Project Structure (Recommended)

```
src/
├── components/
│   ├── ui/           ← Reusable: Button, Card, Modal, Input
│   └── layout/       ← Layout: Header, Footer, Sidebar
├── pages/            ← Route-level: HomePage, ProjectsPage
├── hooks/            ← Custom hooks: useFetch, useAuth
├── context/          ← Context providers: AuthContext
├── services/         ← API calls: api.ts
├── types/            ← TypeScript interfaces
├── utils/            ← Helper functions
├── data/             ← Static data, constants
├── assets/           ← Images, fonts
├── App.tsx
├── main.tsx
└── index.css
```

## Key Libraries for Full Stack React

| Library | Purpose | Install |
|---|---|---|
| `react-router-dom` | Client-side routing | `npm i react-router-dom` |
| `@tanstack/react-query` | Server state management | `npm i @tanstack/react-query` |
| `zustand` | Client state management | `npm i zustand` |
| `axios` / `ky` | HTTP client | `npm i axios` |
| `react-hook-form` | Form management | `npm i react-hook-form` |
| `zod` | Schema validation | `npm i zod` |
| `framer-motion` | Animations | `npm i framer-motion` |
| `lucide-react` | Icons | `npm i lucide-react` |
| `recharts` | Charts | `npm i recharts` |
| `date-fns` | Date formatting | `npm i date-fns` |
