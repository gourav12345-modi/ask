# Ask

A simplified Stack Overflow clone built using the MERN (MongoDB, Express.js, React, Node.js) stack.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run](#run)
- [Testing](#testing)
- [Documentation](#documentation)

## Features

- User authentication with username
- Posting and editing questions
- Adding tags to questions for better searchability
- Answering questions
- Accepting answer for question

## Technologies Used

- **Frontend**:
  - React.js for the user interface
  - Redux for state management
  - Axios for HTTP requests
  - React Router for client-side routing

- **Backend**:
  - Node.js with Express.js for the API server
  - MongoDB for the database

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running or Mongodb atlas url

### Installation

1. Clone the repository:

   ```shell
   git clone <repository-url>
   cd stackoverflow-clone
   ```
2. Navigate to the project directory:

    ```shell
    cd ask
    ```
3. Install the project dependencies for frontend:

    ```shell
    cd frontend
    npm ci
    ```
4.  Install the project dependencies for backend:

    ```shell
    cd backend
    npm ci
    ```

5. Create a .env file in the in root level of backend folder and add the following configuration:
    ```shell
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```
    Replace `<your-mongodb-uri>` with your MongoDB connection URI and `<your-secret-key>` with a secret key for JWT token generation.

### Run
1.  Navigate to the backend directory and run following command:

    ```shell
    npm run dev
    ```

2. Navigate to frontend directory and run following command:
  ```shell
    npm start
  ```
