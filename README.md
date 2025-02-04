# Task Management API

This project is a backend for a task management application. It uses **Node.js**, **Express**, and **MongoDB** to manage tasks and users with **Role-Based Access Control (RBAC)**. The API supports user authentication, task management, and role-based permissions for accessing and modifying data.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Task Endpoints](#task-endpoints)
  - [User Endpoints](#user-endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)

---

## Technologies Used

- **Node.js** - JavaScript runtime environment.
- **Express** - Web framework for Node.js.
- **MongoDB** - NoSQL database.
- **Mongoose** - MongoDB object modeling for Node.js.
- **JWT (JSON Web Tokens)** - For authentication.
- **Bcryptjs** - For hashing passwords.
- **dotenv** - To manage environment variables.
- **Role-Based Access Control (RBAC)** - For managing access permissions based on roles (Admin, Manager, User).

---

## Installation

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** running locally or via a cloud provider (e.g., MongoDB Atlas).

### Steps

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-repo/task-management-api.git
   cd task-management-api
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=mongodb://127.0.0.1:27017/test  # or your MongoDB connection URI
   ```

4. Start MongoDB (if you are running it locally) or ensure your MongoDB URI is correct.

5. Start the server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:8080`.

---

## Usage

### Authentication

- **JWT-based authentication** is used in this application. You must send a valid JWT token in the `Authorization` header for most endpoints. The token should be prefixed with `Bearer` like so:

  ```
  Authorization: Bearer <your_jwt_token>
  ```

- **Login**: (For the purpose of this task, you may manually add users to the database with different roles and JWT tokens)
  
  After logging in (via a route you could implement or add manually), you'll receive a JWT token that you can use to access other endpoints.

### Role-Based Access Control (RBAC)

- **Admin**: Can create tasks, delete tasks, view all users, and delete users.
- **Manager**: Can create tasks and update their own tasks.
- **User**: Can view tasks assigned to them and update their own tasks.

---

## API Endpoints

### Task Endpoints

- **`GET /tasks`**  
  **Description**: Fetch all tasks (for Admin).  
  **Role Required**: Admin.

- **`POST /tasks`**  
  **Description**: Create a new task (for Admin and Manager).  
  **Role Required**: Admin, Manager.

- **`PUT /tasks/:id`**  
  **Description**: Update a specific task (for Admin or Manager who created the task).  
  **Role Required**: Admin, Manager (who created the task).

- **`DELETE /tasks/:id`**  
  **Description**: Delete a specific task (for Admin).  
  **Role Required**: Admin.

### User Endpoints

- **`GET /users`**  
  **Description**: Get all users (for Admin).  
  **Role Required**: Admin.

- **`GET /users/me`**  
  **Description**: Get the authenticated user's information.  
  **Role Required**: Any authenticated user.

- **`PUT /users/me`**  
  **Description**: Update the authenticated user's information.  
  **Role Required**: Any authenticated user.

- **`DELETE /users/:id`**  
  **Description**: Delete a specific user (for Admin).  
  **Role Required**: Admin.

---

## Environment Variables

The project requires the following environment variables to be set:

- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`MONGODB_URI`**: MongoDB URI for connecting to the database.
  
Example:

```env
JWT_SECRET=supersecretkey
MONGODB_URI=mongodb://localhost:27017/task-management-api
```

---

## Testing

You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

- **Authorization**: Use `Bearer <JWT_TOKEN>` in the headers for protected routes.
- **Roles**: Test different roles (Admin, Manager, User) to ensure that RBAC is working as expected.

---

## Future Improvements

- Add user registration and login endpoints.
- Implement validation of input using a package like `Joi` or `express-validator`.
- Improve error handling and logging.
- Add automated tests (e.g., with Jest or Mocha).
- Integrate a frontend application to interact with this API.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you need any modifications or additions to the `README`!