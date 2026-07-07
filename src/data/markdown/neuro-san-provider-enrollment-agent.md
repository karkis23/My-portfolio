# Neuro SAN Provider Enrollment Status Agent: Multi-Agent Automation in Healthcare

## Introduction
In the healthcare industry, provider credentialing and enrollment is a critical but notoriously slow process. Providers must register and enroll with various insurance payers (such as Medicare or commercial plans) to receive reimbursements. Enrollment specialists spend hours logging into multiple payer portals to check application statuses, effective dates, and missing documents. 

The **Neuro SAN Provider Enrollment Status Agent** is a multi-agent system built on the **Neuro® AI Multi-Agent Accelerator (Neuro SAN)** framework. It automates this workflow entirely by identifying the correct payer portal, logging in securely, searching the provider database, and extracting structured enrollment summaries.

---

## System Architecture

The prototype decouples scraping, simulation, extraction, and coordination into cooperating agents operating under a frontman model:

- **`EnrollmentManager` (Coordinator)**: Serves as the frontman. It parses the initial request, gathers identifiers (NPI, PTAN, Submitter ID), requests user credentials if missing, and compiles the final Markdown status report.
- **`PortalScraper` (Scraper Agent)**: Interacts with the target payer portal website using the custom `PortalBrowserTool` Python coded tool.
- **`PortalBrowserTool` (Coded Tool)**: An asynchronous tool executing in the Python backend. It features high-fidelity portal simulation for CGS Medicare and Novitas Solutions (mocking secure login steps and search response screens) and a live HTTP crawler fallback for unknown portals.
- **`DataExtractor` (Extraction Agent)**: Receives raw scraped text and logs from the portal browser, extracts the relevant fields, and outputs a structured JSON schema representing the enrollment state.

---

## Key Features & Highlights

1. **Secure Credential Inputs**: Prompts and handles portal login usernames and passwords to perform secure status checks.
2. **High-Fidelity Simulation & Live Fallback**: Provides simulated secure portal sessions for the main Medicare payers and live web crawling fallback for other payers.
3. **Decoupled Orchestration**: Employs independent agents communicating via HOCON configurations, allowing easy scaling and simple modifications.
4. **Structured JSON Output**: Extracts NPI, PTAN, status, effective date, and pending actions cleanly.

---

## Conclusion
By shifting the burden of portal login and search from human specialists to cooperating AI agents, this project reduces enrollment research time from hours to seconds. It provides a blueprint for scalable, agent-led automation in healthcare administration.
