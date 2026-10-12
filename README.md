# AI-Enabled Cross-Layer Healthcare Database Optimization System

An intelligent healthcare database optimization project focused on analyzing SQL query performance across the application and database layers, with planned integration of operating-system metrics and machine learning project

## Overview
Healthcare applications handle patient records, doctor information, appointments, and clinical reports. As databases grow, inefficient SQL queries and unsuitable indexes can affect application performance.

The AI-Enabled Cross-Layer Healthcare Database Optimization System aims to analyze query execution behavior, identify potential performance bottlenecks, and recommend query rewrites and indexes for developer review.

The project uses MedChart, a healthcare web application, as its working environment. The current implementation includes healthcare management features, PostgreSQL query-performance tracking, execution-plan analysis, and a developer dashboard for optimization recommendations.

## Key Features
* Patient and Doctor Authentication: Registration and login using JSON Web Tokens (JWT).
* Appointment Management: Appointment booking and treatment-status tracking.
* Clinical Report Management: Uploading, storing, and authorized access to clinical reports.
* Query Performance Tracking: Recording query execution time and returned row counts.
* Execution Plan Analysis: Analyzing PostgreSQL EXPLAIN JSON plans, including estimated costs, estimated rows, and scan methods.
* Optimization Recommendations: Identifying potential query bottlenecks and suggesting query rewrites or indexes for developer review.
* Developer Dashboard: Presenting query-analysis information and optimization recommendations.

## Technology Stack

| Component | Technology |
| :--- | :--- |
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Authentication | JSON Web Tokens (JWT) |
| Query Analysis | PostgreSQL execution plans and performance tracking |
| Planned Enhancement | Operating-system monitoring and machine learning |

## System Architecture
The system follows a layered architecture:

* Application Layer: Provides the MedChart interface and healthcare functionality.
* Backend Layer: Handles APIs, authentication, and application logic through Node.js and Express.
* Database Layer: Stores healthcare data in PostgreSQL and supports query execution analysis.
* Query Analysis Layer: Examines execution plans and performance measurements to identify potential bottlenecks.
* Planned AI and OS Monitoring Layer: Will combine query, database, and operating-system information to support machine-learning-based performance prediction.

## How Query Optimization Works
The current query-analysis workflow focuses on:
1. Recording query execution time and the number of rows returned.
2. Observing PostgreSQL EXPLAIN JSON plans to examine estimated costs, row estimates, and scan methods.
3. Identifying potential performance bottlenecks.
4. Recommending candidate query rewrites or indexes.
5. Allowing developers to review recommendations before applying changes.

Note: PostgreSQL's built-in cost-based optimizer remains responsible for query execution. Automatic query rewriting is disabled by default, and recommendations require further validation and performance evaluation.

## Project Status

### Implemented
* Healthcare web application with patient and doctor authentication.
* Appointment booking and treatment-status management.
* Clinical report storage and authorized access.
* PostgreSQL query execution-time and returned-row tracking.
* Execution-plan analysis.
* Initial developer dashboard for query-analysis and optimization recommendations.

### Planned Development
* CPU, memory, disk I/O, and system-load monitoring.
* Representative healthcare SQL workloads of different complexity levels.
* Collection of actual execution measurements using EXPLAIN ANALYZE in a controlled test environment.
* Creation of a combined query, DBMS, and operating-system dataset.
* Training and evaluation of a machine-learning model for query-performance prediction.
* Validation of query rewrites and index recommendations through performance experiments.
* Comparison of prediction accuracy using query-only, query-plus-DBMS, and query-plus-DBMS-plus-OS features.

## Challenges and Research Goals
* Estimated Cost vs. Actual Performance: Query cost estimates may not reflect actual execution time under different system conditions.
* Index Selection: Indexes can improve reads but may increase storage requirements and slow insert and update operations.
* Query Correctness: Rewritten queries must preserve the results of their original queries.
* Machine Learning Reliability: A useful prediction model requires representative execution samples across query types and system conditions.

The central research goal is to determine whether incorporating operating-system metrics alongside query and database information improves query-performance prediction accuracy.

## Expected Outcome
The project aims to develop a healthcare database application with cross-layer performance analysis and intelligent optimization support. Its final evaluation will compare prediction accuracy across different combinations of query, DBMS, and operating-system features.

## Team MedOptix
* Keshav Chaudhary - Team Lead
* Atul Rawat
* Mayank Rawat
* Piyush Chauhan

Academic project - OSDBMS, Phase II, 2026.  
Project Status: Currently under development.
