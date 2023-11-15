
# User Management

This application is a basic user management system built with Node.js, Express, and MySQL. It allows you to perform CRUD operations (Create, Read, Update, Delete) on users in a database.


## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/user-management.git
```

2. Navigate to the project directory:
```bash
cd user-management
```

3. Install dependencies:
```bash
npm install
```

4. Set up the database:

- Ensure you have MySQL installed and running.
- Create a database named user_management (or your preferred name).
- Update the database configuration in your .env file with the following configuration
```bash
PORT=your_app_port
MYSQL_DB=your_db_name
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=your_mysql_username
MYSQL_DB_PSWD=your_mysql_password
```

5. Run the application on development:
```bash
npm run dev
```
The app will now be running on `http://localhost:PORT/`

## API Reference

#### Get all users

```http
  GET /api/v1/users
```

#### Get user

```http
  GET /api/v1/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of users to fetch |

#### Create user
```http
  POST /api/v1/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of users to create |

#### Update user
```http
  PUT /api/v1/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of users to update |

#### Delete user
```http
  DELETE /api/v1/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of users to delete |

## Usage

- Use API testing tools like Postman or cURL to interact with the endpoints.
- Ensure proper authentication and authorization mechanisms before deploying in a production environment.

## Running Tests
### 1. Technologies used
- Chai

Chai is an assertion library that works seamlessly with Node.js and browsers, providing a clean, readable syntax for writing tests.

- Chai HTTP

Chai HTTP is an extension of Chai that offers a set of convenient methods for testing HTTP requests/responses.

- Sinon
Sinon is a versatile testing tool used for creating spies, stubs, and mocks in JavaScript.

### 2. Running the tests
To run tests, run the following command

```bash
  npm run test
```
### 3. Writing Tests
Each test file follows a specific naming convention and structure to organize and execute tests.

For example:

- `users.controllers.test.js`: Contains unit tests for user-related controllers.
- `auth.routes.test.js`: Contains API endpoint tests related to authentication.


## Contributing

Contributions are always welcome!

Please, create a pull request for any improvements or features.


## License

[MIT](https://choosealicense.com/licenses/mit/)


