# IT313 Laboratory 3: TypeScript Foundations for React Native

## Problem Overview
Refactoring the JavaScript Enrollment Eligibility Checker into a fully type-safe TypeScript program to catch type-related bugs at compile time[cite: 1, 2].

## TypeScript Concepts Applied
- **Enums (`EnrollmentStatus`)**: Ensures student statuses are restricted strictly to `PASSING` or `PROBATION` rather than arbitrary strings[cite: 2, 3].
- **Interfaces (`Enrollee`, `EligibilityReport`)**: Enforces exact data shapes for student records and report objects, including an optional `remarks` property for probation students[cite: 2, 3].
- **Union Types & Narrowing**: Demonstrates runtime type-checking on batch IDs that can be either strings or numbers.
- **Generics (`groupBy<T>`)**: Dynamically groups report entries by their status with reusable typing.
- **Async/Await & Promises**: Simulates fetching data from a registrar API with proper error handling inside try/catch blocks[cite: 3].

## How to Run
1. Install dependencies:
   ```powershell
   npm install