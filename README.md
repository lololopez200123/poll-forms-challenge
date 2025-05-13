# Poll and Form Builder

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

The application is structured with reusability in mind:

- **UI Components**: Handle the overall layout and navigation
- **Poll Components**: Specific to poll functionality
- **Form Components**: Handle form creation, submission, and results

### Routing

Vue Router is used to navigate between different views:

- `/polls`: View all polls and create new ones
- `/polls/:id`: Vote on a specific poll
- `/forms`: View all forms and create new ones
- `/forms/:id`: Fill out a specific form
- `/forms/:id/results`: View the results of a specific form

### TypeScript Integration

TypeScript is used throughout the application to provide type safety, especially for the complex data structures used in forms.

## Future Improvements

- User authentication
- Persistent storage (currently data is lost on page reload)
- More question types (e.g., checkboxes for multiple choice)
- Form templates
- Data export options for form responses
