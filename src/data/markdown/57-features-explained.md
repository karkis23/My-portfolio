# 05 — The 57 Features Explained

---

## Feature Engineering

The Zenith engine evaluates the market using 57 normalized features. This multi-dimensional approach provides the machine learning models with a comprehensive dataset representing price, momentum, volume, and options chain sentiment. Features are grouped into 9 distinct analytical categories:

---

## Category 1: Trend (12 Features)

Evaluates the general direction and strength of the market.

| Feature | Description |
|---------|-----------------|
| `trend_ema20_status` | Short-term trend direction (+1 Bullish, -1 Bearish) |
| `trend_ema20_distance` | Mean-reversion distance from the 20-period EMA |
| `trend_sma50_status` | Medium-term trend direction |
| `trend_sma50_distance` | Distance from the 50-period simple moving average |
| `trend_psar_status` | Parabolic SAR directional alignment |
| `trend_psar_distance` | Proximity to Parabolic SAR reversal points |
| `trend_supertrend_status` | SuperTrend indicator alignment |
| `trend_aroon_up` | Aroon Up indicator (0–1 scale) |
| `trend_aroon_down` | Aroon Down indicator (0–1 scale) |
| `trend_aroon_diff` | Gap between Aroon Up and Down |
| `trend_adx` | Average Directional Index (Trend strength magnitude) |
| `trend_adx_di_diff` | Directional Movement Index spread (+DI vs -DI) |

---

## Category 2: MACD (6 Features)

Evaluates the momentum and acceleration of price movements.

| Feature | Description |
|---------|-----------------|
| `macd_histogram` | Current MACD histogram value |
| `macd_prev_histogram` | Previous period MACD histogram value |
| `macd_status` | MACD line positioning relative to the signal line |
| `macd_flip_bullish` | Boolean flag for positive zero-line crossovers |
| `macd_flip_bearish` | Boolean flag for negative zero-line crossovers |
| `macd_histogram_rising` | Derivative indicating if histogram magnitude is expanding |

---

## Category 3: Momentum (8 Features)

Evaluates market velocity and overbought/oversold conditions.

| Feature | Description |
|---------|-----------------|
| `momentum_rsi` | Relative Strength Index (Normalized 0–1 scale) |
| `momentum_rsi_overbought` | Flag for RSI exceeding upper threshold (e.g., >70) |
| `momentum_rsi_oversold` | Flag for RSI falling below lower threshold (e.g., <30) |
| `momentum_rsi_neutral_bullish` | Flag indicating RSI positioning in the bullish neutral zone |
| `momentum_rsi_neutral_bearish` | Flag indicating RSI positioning in the bearish neutral zone |
| `momentum_stoch` | Stochastic oscillator value |
| `momentum_cci` | Commodity Channel Index (mean-deviation metric) |
| `momentum_mfi` | Money Flow Index (Volume-weighted RSI alternative) |

---

## Category 4: Volatility (8 Features)

Evaluates market expansion/contraction and variance.

| Feature | Description |
|---------|-----------------|
| `vol_bb_status` | Bollinger Band breakout alignment |
| `vol_bb_position` | Price positioning relative to Bollinger Bands (0=lower, 1=upper) |
| `vol_bb_width` | Bollinger Band width (volatility squeeze detection) |
| `vol_atr` | Average True Range (Normalized) |
| `vol_vix` | Market Volatility Index (Normalized) |
| `vol_vix_extreme` | Flag denoting extreme VIX conditions overriding normal signals |
| `vol_vwap_status` | Price position relative to Volume Weighted Average Price |
| `vol_vwap_distance` | Distance of current price from VWAP baseline |

---

## Category 5: Volume (8 Features)

Evaluates order flow and volume conviction.

| Feature | Description |
|---------|-----------------|
| `volume_spike` | Detection of statistically significant volume anomalies |
| `volume_ratio` | Current volume divided by moving average volume |
| `volume_above_poc` | Price positioning relative to the Point of Control |
| `volume_poc_distance` | Distance from the highest volume node of the session |
| `volume_in_value_area` | Boolean indicating if price is within the 70% Value Area |
| `ha_trend` | Heikin Ashi calculated trend direction |
| `ha_consecutive` | Count of consecutive Heikin Ashi candles |

---

## Category 6: Options Chain Intelligence (10 Features)

Evaluates institutional positioning and derivatives sentiment.

| Feature | Description |
|---------|-----------------|
| `options_pcr_premium` | Put-Call Ratio based on traded premium |
| `options_pcr_oi` | Put-Call Ratio based on Open Interest |
| `options_writers_zone` | Aggregated bias of institutional option writers |
| `options_writers_confidence` | Calculated conviction score of option writers (0–1 scale) |
| `options_max_pain` | Calculated Max Pain strike price |
| `options_max_pain_distance` | Spot price deviation from the Max Pain level |
| `options_gex_positive` | Gamma Exposure polarity (positive vs. negative regime) |
| `options_iv_skew` | Implied Volatility skew indicating directional hedging |
| `options_ce_oi_change_direction` | Delta of Call Open Interest |
| `options_pe_oi_change_direction` | Delta of Put Open Interest |

---

## Category 7: Price Action & Structure (4 Features)

Evaluates micro-structures and candlestick formations.

| Feature | Description |
|---------|-----------------|
| `pattern_candle_score` | Weighted score of recognized candlestick patterns |
| `smc_price_action_score` | Aggregated score evaluating swing highs and lows |
| `smc_is_breakout` | Detection of overhead structural resistance breaks |
| `smc_is_breakdown` | Detection of structural support failures |

---

## Category 8: Time Context (6 Features)

Evaluates temporal dynamics and session profiling.

| Feature | Description |
|---------|-----------------|
| `minutes_from_open` | Time elapsed since market open |
| `minutes_to_close` | Time remaining until market close |
| `session_progress` | Normalized representation of the trading day (0.0 to 1.0) |
| `is_opening_drive` | Flag indicating the volatile initial 30-minute window |
| `is_midday_session` | Flag indicating standard mid-session trading |
| `is_late_session` | Flag indicating late-session dynamics and theta decay |

---

## Category 9: Data Integrity (2 Features)

Evaluates the reliability of the dataset based on historical context.

| Feature | Description |
|---------|-----------------|
| `data_candle_count` | Total number of historical candles available in context window |
| `data_today_candle_count` | Number of candles processed in the current trading session |
