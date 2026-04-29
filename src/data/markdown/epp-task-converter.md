# ⚡ EPP Task Converter: Business Day Filter & Parsing Tool

The EPP Task Converter is a high-performance, browser-based utility designed for data analysts, operations teams, and approval managers to process heavy unstructured text logs efficiently and accurately.

---

## 🎯 The Challenge
When managing large-scale logs and approval chains, raw data is often output as thousands of lines of unstructured, multi-line text blocks. Manually filtering these logs to identify tasks that have breached a specific "business day" SLA (Service Level Agreement) is time-consuming and error-prone.

## 🚀 The Solution
The EPP Task Converter automates this parsing workflow. It allows users to paste large log datasets directly into the browser and instantly receive a clean, filtered, and structured summary containing only the relevant SLA-breached tasks.

## ✨ Key Features

### Fast Data Parsing
The tool automatically ingests continuous lines of text and intelligently splits them into manageable 9-line data blocks, matching the standard structure of the underlying data source.

### Intelligent Business Day Filtering
A custom algorithm powers the core filtering engine. Users configure a threshold filter "n", and the system inherently accounts for weekends and non-business days, filtering out entries younger than the specified SLA requirement.

### Dual Structured Formats
The engine structures the filtered data into two distinct formats simultaneously, catering to different reporting, email, or ticketing system requirements without requiring manual reformatting.

### One-Click Export
Designed for operational efficiency, the parsed data can be instantly copied to the clipboard or downloaded as a structured file with a single click, streamlining back-office workflows.

---

## 🛠️ Technology Stack
- **Core Logic:** Vanilla JavaScript (ES6+), DOM Parsing, Advanced Regex
- **Layout & Structure:** HTML5
- **Styling:** CSS3
