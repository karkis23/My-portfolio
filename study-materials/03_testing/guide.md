# 📘 Complete Testing Guide
## pytest, Vitest & React Testing Library

---

## Chapter 1: Why Testing Matters

### Without Tests:
```
1. You write code
2. You manually test it
3. You push to production
4. Someone files a bug
5. You fix it and accidentally break something else
6. Repeat forever
```

### With Tests:
```
1. You write code + tests
2. Tests verify everything works
3. You push — CI runs tests automatically
4. Someone requests a feature
5. You add it — tests catch if you broke anything
6. Ship with confidence
```

> [!IMPORTANT]
> **For employers:** No tests = amateur code. Tests = professional code. Having tests in your projects instantly separates you from 80% of candidates.

### The Testing Pyramid

```
            ┌─────┐
           /  E2E  \          Few — expensive, slow, test user flows
          /─────────\
         / Integration\       Some — test components working together
        /───────────────\
       /    Unit Tests    \   Many — fast, isolated, test single functions
      /─────────────────────\
```

| Type | Speed | Scope | Example |
|---|---|---|---|
| **Unit** | ⚡ Fast | Single function/component | Test `normalizeFeature(value)` returns correct output |
| **Integration** | 🔄 Medium | Multiple units together | Test `POST /predict` endpoint with real database |
| **E2E** | 🐌 Slow | Full user flow | Test: login → create signal → execute trade |

---

## Chapter 2: Python Testing with pytest

### 2.1 Setup

```bash
# Install pytest and plugins
pip install pytest pytest-cov pytest-asyncio httpx

# Project structure
project/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── preprocessor.py
│   │   └── predictor.py
│   └── utils.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py          # shared fixtures
│   ├── test_utils.py
│   ├── test_preprocessor.py
│   └── test_api.py
├── pytest.ini               # or pyproject.toml
└── requirements.txt
```

**pytest.ini:**
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_functions = test_*
addopts = -v --tb=short
```

### 2.2 Writing Your First Tests

**app/utils.py:**
```python
def normalize_value(value: float, min_val: float, max_val: float) -> float:
    """Normalize a value to [-1, 1] range."""
    if max_val == min_val:
        return 0.0
    return 2 * (value - min_val) / (max_val - min_val) - 1

def calculate_pnl(entry: float, exit: float, quantity: int, direction: str) -> float:
    """Calculate profit/loss for a trade."""
    if direction == "LONG":
        return (exit - entry) * quantity
    elif direction == "SHORT":
        return (entry - exit) * quantity
    else:
        raise ValueError(f"Invalid direction: {direction}")
```

**tests/test_utils.py:**
```python
import pytest
from app.utils import normalize_value, calculate_pnl


class TestNormalizeValue:
    """Tests for the normalize_value function."""

    def test_middle_value_returns_zero(self):
        """Value exactly in the middle should return 0."""
        result = normalize_value(50, 0, 100)
        assert result == 0.0

    def test_minimum_returns_negative_one(self):
        """Minimum value should return -1."""
        result = normalize_value(0, 0, 100)
        assert result == -1.0

    def test_maximum_returns_positive_one(self):
        """Maximum value should return 1."""
        result = normalize_value(100, 0, 100)
        assert result == 1.0

    def test_same_min_max_returns_zero(self):
        """Edge case: min equals max should return 0."""
        result = normalize_value(50, 50, 50)
        assert result == 0.0

    def test_negative_range(self):
        """Should work with negative numbers."""
        result = normalize_value(-50, -100, 0)
        assert result == 0.0


class TestCalculatePnl:
    """Tests for the calculate_pnl function."""

    def test_long_profit(self):
        pnl = calculate_pnl(entry=100, exit=110, quantity=10, direction="LONG")
        assert pnl == 100.0

    def test_long_loss(self):
        pnl = calculate_pnl(entry=100, exit=90, quantity=10, direction="LONG")
        assert pnl == -100.0

    def test_short_profit(self):
        pnl = calculate_pnl(entry=100, exit=90, quantity=10, direction="SHORT")
        assert pnl == 100.0

    def test_short_loss(self):
        pnl = calculate_pnl(entry=100, exit=110, quantity=10, direction="SHORT")
        assert pnl == -100.0

    def test_invalid_direction_raises_error(self):
        with pytest.raises(ValueError, match="Invalid direction"):
            calculate_pnl(entry=100, exit=110, quantity=10, direction="SIDEWAYS")

    def test_zero_quantity(self):
        pnl = calculate_pnl(entry=100, exit=110, quantity=0, direction="LONG")
        assert pnl == 0.0
```

### 2.3 Running Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run a specific file
pytest tests/test_utils.py

# Run a specific test
pytest tests/test_utils.py::TestCalculatePnl::test_long_profit

# Run with coverage
pytest --cov=app --cov-report=html
# Open htmlcov/index.html to see coverage report

# Run tests matching a keyword
pytest -k "normalize"

# Show print statements
pytest -s
```

### 2.4 Fixtures (Shared Test Setup)

**tests/conftest.py:**
```python
import pytest
from app.main import app
from httpx import AsyncClient, ASGITransport


@pytest.fixture
def sample_market_data():
    """Provide sample market data for testing."""
    return {
        "symbol": "NIFTY",
        "open": 23400.0,
        "high": 23550.0,
        "low": 23350.0,
        "close": 23500.0,
        "volume": 1250000,
        "rsi": 65.4,
        "macd": 12.5,
        "vix": 14.2,
    }


@pytest.fixture
def sample_features():
    """Provide a normalized feature vector."""
    return [0.5, -0.3, 0.8, 0.1, -0.7, 0.2, 0.9, -0.1, 0.4, 0.6]


@pytest.fixture
async def async_client():
    """Create an async test client for FastAPI."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client
```

**Using fixtures:**
```python
def test_preprocessor_with_market_data(sample_market_data):
    """Fixture is automatically injected by name."""
    result = preprocess(sample_market_data)
    assert len(result) == 57
    assert all(-1 <= v <= 1 for v in result)
```

### 2.5 Parametrize (Multiple Test Cases)

```python
@pytest.mark.parametrize("entry,exit_p,qty,direction,expected", [
    (100, 110, 10, "LONG", 100.0),
    (100, 90, 10, "LONG", -100.0),
    (100, 90, 10, "SHORT", 100.0),
    (100, 110, 10, "SHORT", -100.0),
    (100, 100, 10, "LONG", 0.0),
])
def test_calculate_pnl_parametrized(entry, exit_p, qty, direction, expected):
    result = calculate_pnl(entry, exit_p, qty, direction)
    assert result == expected
```

### 2.6 Mocking External Dependencies

```python
from unittest.mock import patch, MagicMock

class TestPredictor:
    
    @patch("app.services.predictor.requests.get")
    def test_fetch_market_data_success(self, mock_get):
        """Mock the external API call."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"price": 23500.0}
        mock_get.return_value = mock_response

        result = fetch_market_data("NIFTY")
        assert result["price"] == 23500.0
        mock_get.assert_called_once()

    @patch("app.services.predictor.requests.get")
    def test_fetch_market_data_failure(self, mock_get):
        """Test handling of API failure."""
        mock_get.side_effect = ConnectionError("API down")

        with pytest.raises(ConnectionError):
            fetch_market_data("NIFTY")
```

### 2.7 Testing FastAPI Endpoints

```python
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_predict_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/predict", json={
            "symbol": "NIFTY",
            "features": [0.5] * 57
        })
    
    assert response.status_code == 200
    data = response.json()
    assert "direction" in data
    assert "confidence" in data
    assert data["direction"] in ["LONG", "SHORT", "NEUTRAL"]


@pytest.mark.asyncio
async def test_predict_invalid_features():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post("/predict", json={
            "symbol": "NIFTY",
            "features": [0.5] * 10  # Wrong number of features
        })
    
    assert response.status_code == 422  # Validation error


@pytest.mark.asyncio
async def test_health_check():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/health")
    
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
```

---

## Chapter 3: JavaScript/TypeScript Testing with Vitest

### 3.1 Setup in Your Vite Project

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**vite.config.ts (add test config):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
```

**src/test/setup.ts:**
```typescript
import '@testing-library/jest-dom';
```

**package.json (add scripts):**
```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

### 3.2 Unit Tests (Pure Functions)

```typescript
// src/utils/formatting.ts
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateWinRate(wins: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
```

```typescript
// src/utils/__tests__/formatting.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateWinRate, truncateText } from '../formatting';

describe('formatCurrency', () => {
  it('formats positive amounts with rupee symbol', () => {
    expect(formatCurrency(67450)).toBe('₹67,450');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });

  it('formats negative amounts', () => {
    expect(formatCurrency(-1000)).toBe('₹-1,000');
  });
});

describe('calculateWinRate', () => {
  it('calculates correct win rate', () => {
    expect(calculateWinRate(74, 100)).toBe(74);
  });

  it('returns 0 for zero total', () => {
    expect(calculateWinRate(0, 0)).toBe(0);
  });

  it('rounds to nearest integer', () => {
    expect(calculateWinRate(1, 3)).toBe(33);
  });
});

describe('truncateText', () => {
  it('does not truncate short text', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('truncates long text with ellipsis', () => {
    expect(truncateText('hello world', 5)).toBe('hello...');
  });
});
```

### 3.3 Component Tests (React Testing Library)

```typescript
// src/components/ui/__tests__/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectCard from '../ProjectCard';

const mockProject = {
  id: '1',
  slug: 'test-project',
  name: 'Test Project',
  tagline: 'A test project',
  description: 'This is a test project description',
  category: 'ai',
  status: 'production',
  color: '#3b82f6',
  icon: '🧠',
  tech: ['Python', 'FastAPI', 'React'],
  features: ['Feature 1', 'Feature 2'],
  metrics: { 'Latency': '<50ms' },
  links: { github: 'https://github.com/test' },
};

// Wrap component with Router since it uses `Link`
function renderWithRouter(component: React.ReactElement) {
  return render(
    <BrowserRouter>{component}</BrowserRouter>
  );
}

describe('ProjectCard', () => {
  it('renders project name', () => {
    renderWithRouter(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    renderWithRouter(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('A test project')).toBeInTheDocument();
  });

  it('renders tech badges', () => {
    renderWithRouter(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    renderWithRouter(<ProjectCard project={mockProject} index={0} />);
    expect(screen.getByText(/production/i)).toBeInTheDocument();
  });

  it('links to project detail page', () => {
    renderWithRouter(<ProjectCard project={mockProject} index={0} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/test-project');
  });
});
```

### 3.4 Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Example: A search/filter component
function SearchFilter({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <input
      type="text"
      placeholder="Search projects..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

describe('SearchFilter', () => {
  it('calls onSearch when user types', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchFilter onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search projects...');
    await user.type(input, 'zenith');

    // Called once for each character typed
    expect(mockOnSearch).toHaveBeenCalledTimes(6);
    expect(mockOnSearch).toHaveBeenLastCalledWith('zenith');
  });
});
```

### 3.5 Testing Async Operations

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Mock fetch
global.fetch = vi.fn();

describe('DataComponent', () => {
  it('shows loading then data', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ signals: [{ id: 1, direction: 'LONG' }] }),
    });

    render(<DataComponent />);

    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // After fetch resolves, shows data
    await waitFor(() => {
      expect(screen.getByText('LONG')).toBeInTheDocument();
    });
  });

  it('shows error on fetch failure', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<DataComponent />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

### 3.6 Running Vitest

```bash
# Run in watch mode (re-runs on file changes)
npm test

# Run once (for CI)
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific file
npx vitest tests/utils.test.ts

# Run tests matching pattern
npx vitest -t "formatCurrency"
```

---

## Chapter 4: Test Patterns & Best Practices

### The AAA Pattern
```
Arrange → Act → Assert

def test_something():
    # Arrange — set up test data
    data = {"symbol": "NIFTY", "confidence": 0.85}
    
    # Act — call the function under test
    result = process_signal(data)
    
    # Assert — verify the result
    assert result.direction == "LONG"
```

### What to Test vs What NOT to Test

| ✅ Test This | ❌ Don't Test This |
|---|---|
| Business logic (calculations, validations) | Framework internals (React, FastAPI) |
| Edge cases (empty inputs, nulls, boundaries) | Third-party library code |
| Error handling (what happens when things fail) | Implementation details (internal state) |
| Public API contracts | CSS styling |
| Integration between your modules | Every getter/setter |

### Test Naming Convention
```python
# Good: describes WHAT the function does and WHEN
def test_normalize_returns_zero_when_value_is_midpoint():
def test_predict_returns_error_when_features_empty():
def test_trade_calculates_correct_pnl_for_short_position():

# Bad: vague names
def test_normalizer():
def test_1():
def test_predict():
```

---

*Add tests to your Zenith project TODAY. Start with 5 utility function tests. Then expand to API endpoint tests. Then add React component tests.* 🧪
