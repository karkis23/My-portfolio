# 🗝️ TypeScript — Key Notes (Cheat Sheet)

## Type System at a Glance

```typescript
// Primitives
let s: string    let n: number    let b: boolean
let x: null      let y: undefined let z: any

// Objects
let obj: { name: string; age: number }
let obj: Record<string, any>         // dictionary

// Arrays
let arr: number[]                    // array of numbers
let arr: Array<number>               // same thing
let tuple: [string, number]          // fixed length + types

// Functions
let fn: (x: number) => string       // function type
let fn: () => void                   // no return

// Union & Intersection
let id: string | number             // either
let combo: TypeA & TypeB             // both

// Literals
let dir: "LONG" | "SHORT"           // exact values only
let status: 200 | 404 | 500         // exact numbers only
```

## Utility Types Quick Card

| Utility | Input | Output | Use Case |
|---|---|---|---|
| `Partial<T>` | `{ a: string; b: number }` | `{ a?: string; b?: number }` | Update forms |
| `Required<T>` | `{ a?: string; b?: number }` | `{ a: string; b: number }` | Strict validation |
| `Pick<T, K>` | Full type | Selected keys only | API responses |
| `Omit<T, K>` | Full type | Without specified keys | Create forms (omit id) |
| `Record<K, V>` | — | `{ [key: K]: V }` | Dictionaries |
| `Readonly<T>` | `{ a: string }` | `{ readonly a: string }` | Immutable config |
| `ReturnType<F>` | Function type | Its return type | Infer from functions |
| `Parameters<F>` | Function type | Tuple of arg types | Match function args |

## React + TypeScript Patterns

```tsx
// Component props
interface Props {
  name: string;           // required
  age?: number;           // optional
  onClick: () => void;    // callback
  children: React.ReactNode; // children
  style?: React.CSSProperties; // inline styles
}

// Typed hooks
useState<number>(0)
useState<User | null>(null)
useState<Signal[]>([])
useRef<HTMLInputElement>(null)
useRef<HTMLDivElement>(null)

// Typed events
React.ChangeEvent<HTMLInputElement>        // onChange
React.FormEvent<HTMLFormElement>            // onSubmit
React.MouseEvent<HTMLButtonElement>         // onClick
React.KeyboardEvent<HTMLInputElement>       // onKeyDown

// Generic component
function List<T>({ items, render }: { items: T[]; render: (item: T) => JSX.Element }) {
  return <>{items.map(render)}</>;
}
```

## Type Guards
```typescript
typeof x === "string"              // primitive check
x instanceof Date                  // class check
"key" in obj                       // property check
Array.isArray(x)                   // array check
function isFoo(x: unknown): x is Foo  // custom guard
```

## tsconfig.json Key Settings
```json
{
  "compilerOptions": {
    "target": "ES2022",           // JS version to output
    "module": "ESNext",           // Module system
    "strict": true,               // Enable all strict checks
    "jsx": "react-jsx",           // JSX transform (React 17+)
    "esModuleInterop": true,      // import express from 'express'
    "resolveJsonModule": true,    // import config from './config.json'
    "noUnusedLocals": true,       // Error on unused variables
    "noUnusedParameters": true,   // Error on unused params
    "forceConsistentCasingInFileNames": true
  }
}
```

## Common Mistakes

```typescript
// ❌ Using `any` everywhere
let data: any = fetchData();

// ✅ Use proper types or `unknown`
let data: unknown = fetchData();
if (isSignal(data)) { /* use data as Signal */ }

// ❌ Not handling null/undefined
const user = getUser(id);
console.log(user.name);  // might crash!

// ✅ Use optional chaining + nullish coalescing
console.log(user?.name ?? "Unknown");

// ❌ Type assertion without validation
const data = response as Signal;  // dangerous!

// ✅ Validate first, then narrow
if (isSignal(response)) {
  const data: Signal = response;  // safe!
}
```
