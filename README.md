# Kanban Board

A simple Kanban board application built with Vue 3 and Vuetify, designed for task management. This app allows you to create, edit, delete, and drag-and-drop task cards across different status columns.

## Features

- Add, edit, and delete task cards.
- Drag and drop cards between different statuses.
- Persistent data storage using LocalStorage.
- Responsive design with Vuetify.

## Technologies Used

- **Vue 3**: A progressive JavaScript framework for building user interfaces.
- **Vuetify**: A Material Design component library for Vue.js.
- **Vite**: A next-generation, fast build tool.
- **TypeScript**: Superset of JavaScript for better type safety.
- **Vitest**: A testing framework for unit and integration testing.
- **UUID**: For generating unique IDs for task cards.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kanban-board.git

2. Navigate to the project directory:
   ```bash
    cd kanban-board

3. Install dependencies:
    ```bash
    npm install

5. Run the development server:
   ```bash
   npm run dev

6. Open the app in your browser:
  http://localhost:5173

## Project Structure

- **`src/`**: Contains all the source code for the application.
  - **`components/`**: Reusable components like `KanbanCard`, `AddCardForm`, etc.
  - **`types/`**: TypeScript interfaces and types.
  - **`App.vue`**: The main Vue component containing the board.

- **`tests/`**: Contains tests for various components and functionalities using Vitest.

## Scripts

- **`dev`**: Run the app in development mode.
- **`build`**: Build the app for production.
- **`preview`**: Preview the production build.
- **`test`**: Run tests using Vitest.
- **`lint`**: Run ESLint to check for code issues.
- **`format`**: Run Prettier to format the code.

## LocalStorage

The app stores tasks in LocalStorage, so your tasks persist even after you refresh the page. The tasks will be loaded automatically on app startup.

## Testing

This project includes tests written with **Vitest**. To run the tests, use:     
    
    npm run test

## Contributing

Feel free to fork the project, open issues, and submit pull requests.
