// =============================================
// React Examples — TypeScript Components
// These are standalone examples you can copy
// into any React + TypeScript project
// =============================================

// =============================================
// 1. CUSTOM HOOK: useFetch
// =============================================

import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> & { refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const json: T = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}


// =============================================
// 2. CUSTOM HOOK: useLocalStorage
// =============================================

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}


// =============================================
// 3. CUSTOM HOOK: useDebounce
// =============================================

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}


// =============================================
// 4. COMPONENT: SearchBox with Debounce
// =============================================

interface SearchResult {
  id: number;
  title: string;
  category: string;
}

function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading, error } = useFetch<SearchResult[]>(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : '/api/search'
  );

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search signals..."
        className="search-input"
      />

      {loading && <p className="loading">Searching...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul className="results-list">
        {data?.map((item) => (
          <li key={item.id} className="result-item">
            <h4>{item.title}</h4>
            <span className="badge">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


// =============================================
// 5. COMPONENT: Signal Card (with TypeScript)
// =============================================

interface Signal {
  id: number;
  symbol: string;
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  confidence: number;
  createdAt: string;
}

interface SignalCardProps {
  signal: Signal;
  onSelect?: (signal: Signal) => void;
}

function SignalCard({ signal, onSelect }: SignalCardProps) {
  const directionColors: Record<Signal['direction'], string> = {
    LONG: '#22c55e',
    SHORT: '#ef4444',
    NEUTRAL: '#94a3b8',
  };

  const confidencePercentage = Math.round(signal.confidence * 100);

  return (
    <div
      className="signal-card"
      onClick={() => onSelect?.(signal)}
      style={{ borderLeft: `4px solid ${directionColors[signal.direction]}` }}
    >
      <div className="signal-header">
        <h3>{signal.symbol}</h3>
        <span
          className="direction-badge"
          style={{ color: directionColors[signal.direction] }}
        >
          {signal.direction}
        </span>
      </div>

      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{ width: `${confidencePercentage}%` }}
        />
        <span>{confidencePercentage}%</span>
      </div>

      <p className="created-at">
        {new Date(signal.createdAt).toLocaleString()}
      </p>
    </div>
  );
}


// =============================================
// 6. COMPONENT: Form with Validation
// =============================================

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.includes('@') || !form.email.includes('.')) {
      newErrors.email = 'Valid email is required';
    }
    if (form.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setIsSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setErrors({ message: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="success-message">
        <h3>✅ Message Sent!</h3>
        <p>Thank you for reaching out. I'll get back to you soon.</p>
        <button onClick={() => setIsSuccess(false)}>Send Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          placeholder="Your name"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          placeholder="your@email.com"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={errors.message ? 'input-error' : ''}
          placeholder="Tell me about your project..."
          rows={5}
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-btn">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}


// =============================================
// 7. COMPONENT: Theme Toggle with Context
// =============================================

import { createContext, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}


// =============================================
// 8. COMPONENT: Data Table with Sorting
// =============================================

type SortDirection = 'asc' | 'desc' | null;

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const modifier = sortDir === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * modifier;
    }
    return 0;
  });

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
              className={col.sortable ? 'sortable' : ''}
            >
              {col.label}
              {sortKey === col.key && (
                <span className="sort-icon">
                  {sortDir === 'asc' ? ' ↑' : sortDir === 'desc' ? ' ↓' : ''}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// =============================================
// USAGE EXAMPLE: Putting it all together
// =============================================
/*
function App() {
  return (
    <ThemeProvider>
      <header>
        <h1>Zenith Intelligence Engine</h1>
        <ThemeToggle />
      </header>

      <SearchBox />

      <SignalList />

      <DataTable
        data={signals}
        columns={[
          { key: 'symbol', label: 'Symbol', sortable: true },
          { key: 'direction', label: 'Direction', sortable: true,
            render: (val) => <span className={`badge-${val}`}>{val}</span> },
          { key: 'confidence', label: 'Confidence', sortable: true,
            render: (val) => `${Math.round(Number(val) * 100)}%` },
          { key: 'createdAt', label: 'Date', sortable: true,
            render: (val) => new Date(String(val)).toLocaleDateString() },
        ]}
      />

      <ContactForm />
    </ThemeProvider>
  );
}
*/

export { useFetch, useLocalStorage, useDebounce, SearchBox, SignalCard, ContactForm, ThemeProvider, ThemeToggle, DataTable };
