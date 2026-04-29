# 📘 Complete TypeScript Guide
## Type-Safe JavaScript for Full Stack Development

---

## Chapter 1: Why TypeScript?

```
JavaScript:  "Hmm, this function takes... something? Returns... something?"
TypeScript:  "This function takes a User object and returns a Promise<Signal[]>"
```

TypeScript = JavaScript + **Type Safety**. It catches bugs at compile time instead of runtime.

```typescript
// JavaScript — bug found at RUNTIME (by user... in production)
function getUser(id) {
  return users.find(u => u.id === id);  // What if id is a string? What if users is undefined?
}

// TypeScript — bug caught at COMPILE TIME (by your editor, before deploy)
function getUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}
// Now you KNOW: id must be a number, return might be undefined — handle it!
```

---

## Chapter 2: Basic Types

```typescript
// ---- Primitives ----
let name: string = "Karki";
let age: number = 25;
let isDeveloper: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;

// ---- Arrays ----
let scores: number[] = [85, 90, 78];
let tags: string[] = ["react", "python", "docker"];
let mixed: (string | number)[] = ["hello", 42];

// ---- Tuples (fixed-length typed arrays) ----
let coordinate: [number, number] = [28.6139, 77.2090];
let entry: [string, number, boolean] = ["NIFTY", 23500, true];

// ---- Objects ----
let trade: { symbol: string; direction: string; confidence: number } = {
  symbol: "NIFTY",
  direction: "LONG",
  confidence: 0.85,
};

// ---- Any (escape hatch — avoid!) ----
let data: any = "anything goes";  // Defeats the purpose of TypeScript

// ---- Unknown (safer than any) ----
let input: unknown = getUserInput();
if (typeof input === "string") {
  console.log(input.toUpperCase());  // TypeScript knows it's a string here
}

// ---- Void (function returns nothing) ----
function logMessage(msg: string): void {
  console.log(msg);
}

// ---- Never (function never returns) ----
function throwError(msg: string): never {
  throw new Error(msg);
}
```

---

## Chapter 3: Interfaces & Types

### 3.1 Interfaces

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "viewer" | "editor";   // Union type (literal types)
  avatar?: string;                        // Optional property
  readonly createdAt: Date;               // Cannot be modified after creation
}

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}

// Implementing interfaces
function createUser(data: Omit<User, "id" | "createdAt">): User {
  return {
    ...data,
    id: Math.random(),
    createdAt: new Date(),
  };
}
```

### 3.2 Type Aliases

```typescript
// Type alias (more flexible than interface)
type Direction = "LONG" | "SHORT" | "NEUTRAL";    // Union of literals
type Confidence = number;                           // Type alias for primitives
type SignalInput = Omit<Signal, "id" | "createdAt">; // Derived type

// Intersection types (combine types)
type TimestampedSignal = Signal & { updatedAt: Date };

// Function types
type PredictFn = (features: number[]) => Direction;
type AsyncPredictFn = (features: number[]) => Promise<Direction>;

// When to use Interface vs Type:
// Interface → objects, classes (extendable, declaration merging)
// Type     → unions, primitives, computed types, utility types
```

### 3.3 Complex Types

```typescript
interface Signal {
  id: number;
  symbol: string;
  direction: Direction;
  confidence: number;
  features: number[];
  metadata: Record<string, string>;     // { [key: string]: string }
  createdAt: Date;
}

interface Trade {
  id: number;
  signal: Signal;                        // Nested type
  entry: number;
  exit: number | null;                   // Nullable
  status: "open" | "closed" | "cancelled";
  pnl?: number;                          // Optional (undefined when open)
}

// API Response type
interface ApiResponse<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// Usage
type SignalListResponse = ApiResponse<Signal[]>;
type TradeResponse = ApiResponse<Trade>;
```

---

## Chapter 4: Generics

```typescript
// Generic function — works with any type
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstElement([1, 2, 3]);        // type: number
const str = firstElement(["a", "b", "c"]);  // type: string

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const signal: Signal = { id: 1, symbol: "NIFTY", direction: "LONG", confidence: 0.85, ... };
const sym = getProperty(signal, "symbol");  // type: string
// getProperty(signal, "invalid");  // ❌ Error! "invalid" is not a key of Signal

// Generic interface
interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

class SignalRepository implements Repository<Signal> {
  async findAll(): Promise<Signal[]> { ... }
  async findById(id: number): Promise<Signal | null> { ... }
  async create(data: Omit<Signal, "id">): Promise<Signal> { ... }
  async update(id: number, data: Partial<Signal>): Promise<Signal> { ... }
  async delete(id: number): Promise<void> { ... }
}

// Generic React component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Usage
<List items={signals} renderItem={(s) => <li key={s.id}>{s.symbol}</li>} />
```

---

## Chapter 5: Utility Types

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

// Partial<T> — all properties optional
type UpdateUser = Partial<User>;
// { id?: number; username?: string; email?: string; ... }

// Required<T> — all properties required
type StrictUser = Required<User>;

// Pick<T, K> — select specific properties
type UserPreview = Pick<User, "id" | "username" | "email">;
// { id: number; username: string; email: string }

// Omit<T, K> — exclude specific properties
type CreateUser = Omit<User, "id" | "createdAt">;
// { username: string; email: string; password: string; role: string }

// Record<K, V> — dictionary type
type ErrorMessages = Record<string, string>;
// { [key: string]: string }
const errors: ErrorMessages = { email: "Required", password: "Too short" };

// Exclude / Extract — filter union types
type Status = "active" | "inactive" | "suspended" | "deleted";
type ActiveStatus = Exclude<Status, "deleted" | "suspended">;
// "active" | "inactive"

// ReturnType<T> — get function return type
function getSignals() { return [{ id: 1, symbol: "NIFTY" }]; }
type Signals = ReturnType<typeof getSignals>;
// { id: number; symbol: string }[]

// Readonly<T> — prevent mutations
type FrozenUser = Readonly<User>;
// All properties are readonly
```

---

## Chapter 6: TypeScript in React

```tsx
// Component Props
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// Typed Hooks
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Signal[]>([]);
const inputRef = useRef<HTMLInputElement>(null);

// Typed Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setQuery(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};

// Typed API call
async function fetchSignals(): Promise<Signal[]> {
  const res = await fetch("/api/signals");
  if (!res.ok) throw new Error("Failed to fetch");
  const data: ApiResponse<Signal[]> = await res.json();
  return data.data;
}
```

---

## Chapter 7: Module Declarations & Advanced

### Type Narrowing (Type Guards)

```typescript
// typeof guard
function process(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase(); // TypeScript knows it's string
  }
  return input.toFixed(2); // TypeScript knows it's number
}

// in guard
interface Dog { bark(): void; }
interface Cat { meow(): void; }

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}

// Custom type guard
function isSignal(data: unknown): data is Signal {
  return (
    typeof data === "object" &&
    data !== null &&
    "symbol" in data &&
    "direction" in data
  );
}

if (isSignal(response)) {
  console.log(response.symbol); // TypeScript knows it's Signal
}
```

### Enums (Use Sparingly)

```typescript
// String enum (preferred over numeric)
enum Direction {
  Long = "LONG",
  Short = "SHORT",
  Neutral = "NEUTRAL",
}

// Better alternative: union types (smaller bundle, more flexible)
type Direction = "LONG" | "SHORT" | "NEUTRAL";

// Use const assertion for enum-like objects
const DIRECTIONS = {
  Long: "LONG",
  Short: "SHORT",
  Neutral: "NEUTRAL",
} as const;

type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];
// "LONG" | "SHORT" | "NEUTRAL"
```

---

*TypeScript is NOT optional for professional React development. Master it to stand out from JS-only developers!* 💙
