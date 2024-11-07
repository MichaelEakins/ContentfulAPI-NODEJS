
# Contentful TypeScript API with Swagger Documentation

This project is a Node.js API built with TypeScript to interact with Contentful. It provides endpoints to manage content types and entries, and includes Swagger for API documentation.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd contentful-ts-api
```

### 2. Run the Installation Script

This project includes a setup script, `install.sh`, which will generate the `.env` file with your Contentful credentials.

#### **Run the Script**

```bash
./install.sh
```

#### **Provide the Following Values When Prompted**:

- **SPACE_ID**: The unique identifier for your Contentful space.
- **CDA_ACCESS_TOKEN**: Content Delivery API token used to fetch content.
- **CMA_ACCESS_TOKEN**: Content Management API token used to manage content.

> **Note**: These credentials are sensitive and should not be exposed publicly.

### 3. Verify `.env` File

The script will generate a `.env` file in the root of your project. This file contains the following:

```env
SPACE_ID=your_space_id
CDA_ACCESS_TOKEN=your_cda_access_token
CMA_ACCESS_TOKEN=your_cma_access_token
```

### 4. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 5. Start the Server

To start the API server, run:

```bash
npm start
```

This will start the server on `http://localhost:3000`.

---

## Using Swagger for API Documentation

### Access Swagger UI

Once the server is running, open your browser and navigate to:

```
http://localhost:3000/api-docs
```

### What is Swagger?

Swagger provides an interactive interface for exploring and testing your API. It documents all available endpoints, including their required parameters and responses, allowing you to:

- View detailed information about each endpoint.
- Test API routes directly from the browser.
- Debug and validate API functionality.

---

## Important Notes

- **Sensitive Data**: The `.env` file contains sensitive API keys and tokens. While this file is currently added to the Git repository, it is strongly recommended to exclude it from version control in real-world applications by adding `.env` to `.gitignore`.
  
- **Starting the Server**:
  Ensure your `.env` file is properly configured before starting the server. The API will fail if required environment variables are missing.
