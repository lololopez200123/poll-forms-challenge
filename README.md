![Preview](./docs/formsandpolls.jpg)

# FORMS AND POLLS APP

![Vue 3](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Pinia](https://img.shields.io/badge/Pinia-3.0-orange.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue.svg)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.5-red.svg)

A Vue 3 application that allows users to create and respond to Polls and Forms.

## Features

### Polls

- Create single-question polls with multiple options
- Vote on polls
- View poll results with a visual representation

### Forms

- Create forms with multiple questions
- Support for different question types:
  - Short answer (text input)
  - Long answer (textarea)
  - Number (numeric input)
  - Radio (single-choice)
- Mark questions as required or optional
- Add placeholders to questions
- Submit form responses
- View form submissions

## Technologies Used

- **Vue 3**: Framework using the Composition API
- **TypeScript**: For type safety
- **Pinia**: State management
- **Vue Router**: Navigation
- **Tailwind CSS**: Styling

## Project Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

## Design Decisions

### State Management

The application uses Pinia for state management, with two main stores:

1. **Poll Store**: Manages the state of polls, including creation, voting, and results.
2. **Form Store**: Handles the more complex form functionality, including creation, submission, and viewing results.

### Component Structure

The application is structured with modularity and reusability in mind:

- **Common Components**: Reusable UI elements like buttons, inputs, and cards
- **Page Components**: Handle the overall layout and navigation
- **Poll Components**: Specific to poll functionality
- **Form Components**: Handle form creation, submission, and results

### Composables

The application uses Vue 3 Composition API with several composables for code reuse:

- **useTheme**: Handles dark/light theme toggling
- **useFormQuestions**: Handles form question management
- **useValidation**: Provides form validation functionality
- **useAlert**: Manages application alerts and notifications

### Type Organization

Types are organized by domain for better maintainability:

- **poll.ts**: Poll-related types
- **form.ts**: Form definition types
- **response.ts**: Form response types

### Routing

Vue Router is used to navigate between different views:

- `/polls`: View all polls and create new ones
- `/polls/:id`: Vote on a specific poll
- `/forms`: View all forms and create new ones
- `/forms/:id`: Fill out a specific form
- `/forms/:id/results`: View the results of a specific form

### TypeScript Integration

TypeScript is used throughout the application to provide type safety, especially for the complex data structures used in forms.
