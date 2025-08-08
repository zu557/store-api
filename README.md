# Store API

A Node.js backend for a simple store, built with Express.js and MongoDB. This API provides an endpoint to retrieve a list of products with advanced searching, sorting, and filtering capabilities.

## Features

  - **Product Listing**: Fetch all products from the database.
  - **Advanced Filtering**: Filter products by `featured` status, `company`, and `name`.
  - **Numeric Filters**: Search for products based on a numeric range for `price` and `rating` (e.g., `price>40`).
  - **Sorting**: Sort products by any field, including multiple fields (e.g., `sort=price,-rating`).
  - **Field Selection**: Select specific fields to return in the response (e.g., `fields=name,price`).
  - **Pagination**: Handle large result sets by specifying `page` and `limit` query parameters.

## Technology Stack

  * **Node.js**: JavaScript runtime environment.
  * **Express.js**: Web framework for handling HTTP requests and routing.
  * **MongoDB**: NoSQL database for storing product data.
  * **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
  * **`express-async-errors`**: Middleware to handle asynchronous errors without explicit `try...catch` blocks in every async route.
  * **`dotenv`**: For managing environment variables.

-----

## Getting Started

### Prerequisites

  * Node.js (LTS version recommended)
  * MongoDB Atlas account or a local MongoDB instance

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your MongoDB connection string.

    ```env
    MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.abcde.mongodb.net/StoreAPI?retryWrites=true&w=majority
    PORT=3000
    ```

### Running the App

To start the server, run the following command:

```bash
npm start
```

The server will be running on the port specified in your `.env` file (or `3000` by default).

-----
