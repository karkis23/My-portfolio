# 🗝️ Testing — Key Notes (Cheat Sheet)

## The Testing Pyramid
```
         /  E2E  \        → Few tests, slow, expensive
        /Integration\     → Some tests, medium speed
       /  Unit Tests  \   → Many tests, fast, cheap
```

## Golden Rules
1. **Test behavior, not implementation** — test WHAT a function does, not HOW
2. **Each test should test ONE thing** — one assertion per logical concept
3. **Tests should be independent** — no test depends on another test running first
4. **Tests should be deterministic** — same input = same result every time
5. **Mock external dependencies** — databases, APIs, file systems
6. **Follow AAA pattern** — Arrange → Act → Assert

---

## pytest Quick Reference

### Running Tests
```bash
pytest                          # Run all tests
pytest -v                       # Verbose output
pytest -k "keyword"             # Run tests matching keyword
pytest tests/test_api.py        # Run specific file
pytest --cov=app                # With coverage
pytest --cov=app --cov-report=html  # HTML coverage report
pytest -x                       # Stop on first failure
pytest -s                       # Show print statements
```

### Assertions
```python
assert result == expected
assert result != wrong_value
assert result is True
assert result is None
assert isinstance(result, dict)
assert len(items) == 5
assert "key" in dictionary
assert 5 < result < 10

# Exception testing
with pytest.raises(ValueError, match="invalid"):
    function_that_should_fail()
```

### Fixtures
```python
@pytest.fixture
def sample_data():
    return {"key": "value"}

def test_something(sample_data):   # auto-injected by name
    assert sample_data["key"] == "value"
```

### Parametrize
```python
@pytest.mark.parametrize("input_val,expected", [
    (1, 1), (2, 4), (3, 9), (0, 0), (-2, 4)
])
def test_square(input_val, expected):
    assert square(input_val) == expected
```

### Mocking
```python
from unittest.mock import patch, MagicMock

@patch("module.external_api_call")
def test_with_mock(mock_api):
    mock_api.return_value = {"status": "ok"}
    result = my_function()
    assert result == "ok"
    mock_api.assert_called_once()
```

---

## Vitest Quick Reference

### Running
```bash
npm test              # Watch mode
npm run test:run      # Run once (for CI)
npm run test:coverage # With coverage
```

### Common Matchers
```typescript
expect(value).toBe(exact)           // strict equality
expect(value).toEqual(deep)         // deep equality
expect(value).toBeTruthy()          // truthy check
expect(value).toBeNull()            // null check
expect(value).toContain(item)       // array/string contains
expect(value).toHaveLength(n)       // length check
expect(fn).toThrow()                // exception check
expect(fn).toHaveBeenCalledWith(x)  // mock call check
```

### React Testing Library
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Render component
render(<MyComponent prop="value" />);

// Find elements
screen.getByText('Hello')           // exact text
screen.getByRole('button')          // by ARIA role
screen.getByPlaceholderText('...')   // input placeholder
screen.getByTestId('my-id')         // data-testid
screen.queryByText('optional')      // returns null if missing

// User interactions
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'hello');

// Async waiting
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

---

## What to Test — Priority

| Priority | What | Example |
|---|---|---|
| 🔴 P0 | Pure functions with logic | `calculatePnl()`, `normalizeValue()` |
| 🔴 P0 | API endpoints (happy + error) | POST /predict returns 200, bad input returns 422 |
| 🟡 P1 | Component rendering | ProjectCard shows correct title |
| 🟡 P1 | User interactions | Click button triggers callback |
| 🟢 P2 | Edge cases | Empty arrays, null inputs, very large numbers |
| ⚪ Skip | CSS styling, third-party library internals | Visual appearance |
