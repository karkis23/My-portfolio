"""
Testing Examples — Python (pytest)
Run: pytest examples_python.py -v
"""

import pytest


# =============================================
# FUNCTIONS TO TEST
# =============================================

def normalize_value(value: float, min_val: float, max_val: float) -> float:
    """Normalize a value to [-1, 1] range."""
    if max_val == min_val:
        return 0.0
    return 2 * (value - min_val) / (max_val - min_val) - 1


def calculate_pnl(entry: float, exit_price: float, qty: int, direction: str) -> float:
    """Calculate profit/loss for a trade."""
    if direction == "LONG":
        return (exit_price - entry) * qty
    elif direction == "SHORT":
        return (entry - exit_price) * qty
    else:
        raise ValueError(f"Invalid direction: {direction}")


def validate_signal(confidence: float, direction: str) -> dict:
    """Validate a trading signal."""
    if not 0 <= confidence <= 1:
        raise ValueError("Confidence must be between 0 and 1")
    if direction not in ("LONG", "SHORT", "NEUTRAL"):
        raise ValueError(f"Invalid direction: {direction}")
    return {
        "valid": True,
        "strength": "STRONG" if confidence >= 0.8 else "WEAK",
        "direction": direction,
    }


# =============================================
# UNIT TESTS
# =============================================

class TestNormalizeValue:
    """Test the normalize_value function."""

    def test_middle_returns_zero(self):
        assert normalize_value(50, 0, 100) == 0.0

    def test_minimum_returns_negative_one(self):
        assert normalize_value(0, 0, 100) == -1.0

    def test_maximum_returns_positive_one(self):
        assert normalize_value(100, 0, 100) == 1.0

    def test_equal_min_max_returns_zero(self):
        assert normalize_value(50, 50, 50) == 0.0

    def test_negative_range(self):
        result = normalize_value(-50, -100, 0)
        assert result == 0.0

    @pytest.mark.parametrize("value,min_v,max_v,expected", [
        (25, 0, 100, -0.5),
        (75, 0, 100, 0.5),
        (0, -100, 100, 0.0),
        (100, 0, 200, 0.0),
    ])
    def test_various_ranges(self, value, min_v, max_v, expected):
        assert normalize_value(value, min_v, max_v) == expected


class TestCalculatePnl:
    """Test the calculate_pnl function."""

    def test_long_profit(self):
        assert calculate_pnl(100, 110, 10, "LONG") == 100.0

    def test_long_loss(self):
        assert calculate_pnl(100, 90, 10, "LONG") == -100.0

    def test_short_profit(self):
        assert calculate_pnl(100, 90, 10, "SHORT") == 100.0

    def test_short_loss(self):
        assert calculate_pnl(100, 110, 10, "SHORT") == -100.0

    def test_zero_pnl(self):
        assert calculate_pnl(100, 100, 10, "LONG") == 0.0

    def test_zero_quantity(self):
        assert calculate_pnl(100, 200, 0, "LONG") == 0.0

    def test_invalid_direction_raises(self):
        with pytest.raises(ValueError, match="Invalid direction"):
            calculate_pnl(100, 110, 10, "SIDEWAYS")


class TestValidateSignal:
    """Test the validate_signal function."""

    def test_strong_long_signal(self):
        result = validate_signal(0.85, "LONG")
        assert result["valid"] is True
        assert result["strength"] == "STRONG"
        assert result["direction"] == "LONG"

    def test_weak_signal(self):
        result = validate_signal(0.5, "SHORT")
        assert result["strength"] == "WEAK"

    def test_boundary_strong(self):
        result = validate_signal(0.8, "LONG")
        assert result["strength"] == "STRONG"

    def test_boundary_weak(self):
        result = validate_signal(0.79, "LONG")
        assert result["strength"] == "WEAK"

    def test_confidence_too_high(self):
        with pytest.raises(ValueError, match="Confidence must be"):
            validate_signal(1.5, "LONG")

    def test_confidence_negative(self):
        with pytest.raises(ValueError):
            validate_signal(-0.1, "LONG")

    def test_invalid_direction(self):
        with pytest.raises(ValueError, match="Invalid direction"):
            validate_signal(0.5, "UP")


# =============================================
# FIXTURES EXAMPLE
# =============================================

@pytest.fixture
def sample_trade_data():
    """Reusable test data."""
    return {
        "entry": 23450.50,
        "exit": 23520.00,
        "quantity": 50,
        "direction": "LONG",
    }


def test_pnl_with_fixture(sample_trade_data):
    """Using fixture for test data."""
    pnl = calculate_pnl(
        sample_trade_data["entry"],
        sample_trade_data["exit"],
        sample_trade_data["quantity"],
        sample_trade_data["direction"],
    )
    assert pnl == pytest.approx(3475.0, rel=1e-2)


# =============================================
# MOCKING EXAMPLE
# =============================================

from unittest.mock import patch, MagicMock


def fetch_price(symbol: str) -> float:
    """Simulates fetching price from an external API."""
    import requests
    response = requests.get(f"https://api.example.com/price/{symbol}")
    return response.json()["price"]


@patch("__main__.fetch_price")
def test_with_mocked_api(mock_fetch):
    """Test without actually calling the API."""
    mock_fetch.return_value = 23500.0

    price = fetch_price("NIFTY")

    assert price == 23500.0
    mock_fetch.assert_called_once_with("NIFTY")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
