# 📘 Complete React & Frontend Guide
## From Fundamentals to Production-Grade Applications

---

## Chapter 1: React Core Concepts

### 1.1 What is React?

React is a JavaScript library for building user interfaces. It uses a **component-based architecture** where UI is broken into reusable, independent pieces.

**Key Principles:**
- **Declarative:** You describe WHAT the UI should look like, React handles HOW to update the DOM
- **Component-Based:** Build encapsulated components that manage their own state
- **Unidirectional Data Flow:** Data flows from parent → child via props
- **Virtual DOM:** React diffs a virtual copy against the real DOM and applies minimal updates

### 1.2 JSX (JavaScript XML)

JSX lets you write HTML-like syntax in JavaScript:

```jsx
// JSX — gets compiled to React.createElement() calls
const element = <h1 className="title">Hello, {name}!</h1>;

// Rules:
// 1. Use className instead of class
// 2. Use camelCase for attributes (onClick, onChange, htmlFor)
// 3. Must return ONE root element (use <> fragments for multiple)
// 4. Close all tags (<img />, <br />, <input />)
// 5. JavaScript expressions go inside {curly braces}

// Conditional rendering
const greeting = (
  <div>
    {isLoggedIn ? <Dashboard /> : <LoginForm />}
    {showBanner && <Banner />}
  </div>
);

// List rendering — always use unique key!
const list = items.map(item => (
  <li key={item.id}>{item.name}</li>
));
```

---

## Chapter 2: Components & Props

### 2.1 Functional Components (Modern Standard)

```tsx
// Simple component
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

// Arrow function component
const ProductCard = ({ title, price, onBuy }: ProductCardProps) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>₹{price.toLocaleString()}</p>
      <button onClick={onBuy}>Buy Now</button>
    </div>
  );
};

// Usage
<Welcome name="Karki" />
<ProductCard title="Widget" price={999} onBuy={() => alert('Purchased!')} />
```

### 2.2 Props

```tsx
// Defining prop types with TypeScript
interface ProjectCardProps {
  name: string;                    // Required string
  tagline: string;
  category: 'ai' | 'trading' | 'automation';  // Union type
  metrics?: Record<string, string>;            // Optional
  onSelect: (id: string) => void;              // Callback function
  children?: React.ReactNode;                  // Children elements
}

// Default values
function ProjectCard({ 
  name, 
  tagline, 
  category = 'ai',      // Default value
  metrics = {},
  onSelect 
}: ProjectCardProps) {
  return (
    <div onClick={() => onSelect(name)}>
      <h3>{name}</h3>
      <p>{tagline}</p>
      <span>{category}</span>
    </div>
  );
}
```

### 2.3 Children Pattern

```tsx
// Wrapper/Layout component
function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="Signal Data">
  <p>Direction: LONG</p>
  <p>Confidence: 0.82</p>
</Card>
```

---

## Chapter 3: Hooks (Deep Dive)

### 3.1 useState — State Management

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);               // number
  const [name, setName] = useState('');                 // string
  const [items, setItems] = useState<string[]>([]);     // typed array
  const [user, setUser] = useState<User | null>(null);  // nullable object

  // Direct value
  setCount(5);

  // Updater function (use when new state depends on old state)
  setCount(prev => prev + 1);

  // Updating objects (must spread to create new reference)
  const [form, setForm] = useState({ name: '', email: '' });
  setForm(prev => ({ ...prev, name: 'Karki' }));

  // Updating arrays
  setItems(prev => [...prev, 'new item']);       // add
  setItems(prev => prev.filter(i => i !== 'x')); // remove
  setItems(prev => prev.map(i => i === 'old' ? 'new' : i)); // update

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  );
}
```

### 3.2 useEffect — Side Effects

```tsx
import { useEffect, useState } from 'react';

function DataFetcher({ userId }: { userId: string }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Runs on EVERY render (rarely used)
  useEffect(() => {
    console.log('Rendered');
  });

  // Runs ONCE on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted'); // cleanup
  }, []);

  // Runs when userId changes
  useEffect(() => {
    let cancelled = false;  // prevent stale updates

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => { cancelled = true; }; // cleanup on dependency change
  }, [userId]);

  // Cleanup example: interval
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);
    return () => clearInterval(timer); // MUST clean up!
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### 3.3 useRef — Persistent Mutable Reference

```tsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Track renders without causing re-render
  renderCount.current += 1;

  return (
    <div>
      <input ref={inputRef} placeholder="Auto-focused!" />
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}
```

### 3.4 useMemo & useCallback — Performance

```tsx
import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ data, onFilter }: Props) {
  // useMemo: Cache expensive computation result
  // Only recalculates when `data` changes
  const sortedData = useMemo(() => {
    console.log('Sorting...');
    return [...data].sort((a, b) => b.confidence - a.confidence);
  }, [data]);

  // useCallback: Cache function reference
  // Prevents child re-renders when parent re-renders
  const handleFilter = useCallback((query: string) => {
    onFilter(query.toLowerCase());
  }, [onFilter]);

  return (
    <div>
      <SearchBar onSearch={handleFilter} />
      {sortedData.map(item => <Card key={item.id} item={item} />)}
    </div>
  );
}
```

### 3.5 useContext — Global State

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Create context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 2. Create provider component
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setUser(data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create custom hook for easy access
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

// 4. Wrap app
function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

// 5. Use in any component
function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3.6 Custom Hooks — Reusable Logic

```tsx
// Custom hook: useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    fetch(url)
      .then(res => res.json())
      .then(json => { if (!cancelled) setData(json); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
function SignalList() {
  const { data, loading, error } = useFetch<Signal[]>('/api/signals');
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  return data?.map(s => <SignalCard key={s.id} signal={s} />);
}

// Custom hook: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Custom hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

---

## Chapter 4: React Router v7

```tsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// App with routes
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Dynamic route with params
function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Project: {slug}</h1>
      <button onClick={() => navigate('/projects')}>Back</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

// Protected route
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Chapter 5: State Management Patterns

### 5.1 When to Use What

| Approach | Best For | Complexity |
|---|---|---|
| **useState** | Component-local UI state | Simple |
| **useContext** | Theme, auth, locale (low-frequency updates) | Medium |
| **Zustand** | Global app state with frequent updates | Medium |
| **Redux Toolkit** | Large apps with complex state logic | Complex |
| **React Query / TanStack** | Server state (API data) | Medium |

### 5.2 Zustand (Recommended for Most Apps)

```tsx
// store.ts
import { create } from 'zustand';

interface SignalStore {
  signals: Signal[];
  loading: boolean;
  fetchSignals: () => Promise<void>;
  addSignal: (signal: Signal) => void;
  clearSignals: () => void;
}

const useSignalStore = create<SignalStore>((set) => ({
  signals: [],
  loading: false,
  
  fetchSignals: async () => {
    set({ loading: true });
    const res = await fetch('/api/signals');
    const data = await res.json();
    set({ signals: data, loading: false });
  },
  
  addSignal: (signal) => set((state) => ({ 
    signals: [...state.signals, signal] 
  })),
  
  clearSignals: () => set({ signals: [] }),
}));

// Usage in any component — no Provider needed!
function SignalList() {
  const { signals, loading, fetchSignals } = useSignalStore();
  
  useEffect(() => { fetchSignals(); }, [fetchSignals]);
  
  if (loading) return <Spinner />;
  return signals.map(s => <SignalCard key={s.id} signal={s} />);
}
```

---

## Chapter 6: Forms & Validation

```tsx
import { useState, FormEvent } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email required';
    if (form.message.length < 10) newErrors.message = 'Min 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      alert('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      alert('Failed to send');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' })); // clear error on type
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

---

## Chapter 7: Performance Optimization

```tsx
import { memo, lazy, Suspense } from 'react';

// 1. React.memo — skip re-renders if props didn't change
const ExpensiveCard = memo(function ExpensiveCard({ data }: { data: DataType }) {
  return <div>{/* expensive rendering */}</div>;
});

// 2. Lazy loading — code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart data={chartData} />
    </Suspense>
  );
}

// 3. Virtualization for long lists (react-window)
import { FixedSizeList } from 'react-window';

function SignalList({ signals }: { signals: Signal[] }) {
  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={signals.length}
      itemSize={80}
    >
      {({ index, style }) => (
        <div style={style}>
          <SignalCard signal={signals[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}

// 4. Debounce expensive operations
function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

---

## Chapter 8: Fetching Data Patterns

### Pattern 1: Simple fetch + useState
```tsx
// Good for simple cases — see useEffect example above
```

### Pattern 2: TanStack Query (React Query) — RECOMMENDED
```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function SignalList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['signals'],
    queryFn: () => fetch('/api/signals').then(r => r.json()),
    staleTime: 30_000,     // cache for 30 seconds
    refetchInterval: 60_000, // auto-refetch every 60 seconds
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return data.map((s: Signal) => <SignalCard key={s.id} signal={s} />);
}

// Mutations (POST, PUT, DELETE)
function CreateSignal() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newSignal: SignalInput) =>
      fetch('/api/signals', {
        method: 'POST',
        body: JSON.stringify(newSignal),
      }).then(r => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] }); // refetch list
    },
  });

  return (
    <button onClick={() => mutation.mutate({ direction: 'LONG', confidence: 0.85 })}>
      {mutation.isPending ? 'Creating...' : 'Create Signal'}
    </button>
  );
}
```

---

*Master these React concepts and you'll handle any frontend interview question. Build your portfolio site as proof of mastery!* ⚛️
