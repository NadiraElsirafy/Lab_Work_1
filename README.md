# Lab Work 1 - Student API

A simple Express.js application providing a RESTful API for managing a list of students.

## Features
- In-memory data store for students
- Logger middleware for all requests
- API key authentication for API routes
- Full CRUD operations (Create, Read, Update, Delete)

## Getting Started

### Prerequisites
- Node.js installed

### Installation

1. Clone the repository or open the project folder.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the application using standard Node:
```bash
node app.js
```

Or start it with nodemon to automatically restart on file changes:
```bash
npx nodemon app.js
```

The server will start running at `http://localhost:3000`.

## API Documentation

All API routes are protected and require an API key to be sent in the request headers.

**Authentication Header:**
```http
x-api-key: 123
```

### Endpoints

#### `GET /api/students`
Returns a list of all students.

#### `GET /api/students/:id`
Returns a single student by their ID.

#### `POST /api/students`
Creates a new student.
- **Body:** JSON object with `name` (string) and `gpa` (number).
- **Example:** 
  ```json
  {
    "name": "Ahmed",
    "gpa": 3.8
  }
  ```

#### `PUT /api/students/:id`
Replaces an entire student record.
- **Body:** JSON object with `name` (string) and `gpa` (number). Both are required.

#### `PATCH /api/students/:id`
Updates specific fields of a student.
- **Body:** JSON object with optional `name` (string) and/or `gpa` (number).

#### `DELETE /api/students/:id`
Removes a student by their ID.
