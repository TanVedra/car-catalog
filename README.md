# Car Catalog Project - Setup and Usage Guide

This guide outlines the steps for setting up and running the Car Catalog project. Make sure you have Node.js version 20.15.1 installed, as specified in the project's package.json.

---

## Step 1: Install Dependencies
1. From the root folder of the project, run:
   ```bash
   npm ci
   ```
   This command installs all necessary packages listed in `package.json`.

## Step 2: Set Up Environment Variables
1. Locate the `.env.example` file in the project directory.
2. **Option A:** Rename `.env.example` to `.env`.
   ```bash
   mv .env.example .env
   ```
3. **Option B:** Create a new `.env` file and copy the contents of `.env.example`.

## Step 3: Start MongoDB with Docker
1. Use Docker to start MongoDB by running:
   ```bash
   docker-compose up -d
   ```

## Step 4: Build the Project
1. Compile the project by running:
   ```bash
   npm run build
   ```
   This command transpiles TypeScript files into JavaScript in the `dist` directory.

## Step 5: Start the Project
1. To start the project in production mode, run:
   ```bash
   npm run start
   ```
2. Alternatively, for development mode, use:
   ```bash
   npm run dev
   ```
   This command uses `nodemon` for automatic restarts on file changes.

## Step 6: Seed Database with Migrations
1. To populate the database with initial seed data, execute:
   ```bash
   npm run migrations
   ```

## Step 7: Run ESLint
1. To check the code for linting errors, run:
   ```bash
   npm run eslint-check
   ```

## Step 8: Initialize CLI
1. To make the CLI accessible globally, initialize it by running:
   ```bash
   npm run cli:init
   ```

## Step 9: Fix CLI Permissions (Linux only)
1. If you encounter a `permission denied` error when running the CLI, grant execute permissions with:
   ```bash
   npm run cli:permission
   ```

---

Now you're ready to use the Car Catalog project. For additional information on available CLI commands, refer to the CLI documentation.


# Car Catalog CLI - Import Cars and Categories

The **Car Catalog CLI** is a command-line tool for importing categories and cars into the application from a JSON file. This file should contain categories with their associated cars, including details like model, price, color, and image URL. 

## Supported Format

This CLI only supports **JSON** files as the import source.

## Usage

To run the CLI, use the following command:

```bash
import-data-cli --file <path_to_file>
```

### Options

| Option                 | Description                                     |
|------------------------|-------------------------------------------------|
| `-V`, `--version`      | Outputs the version number of the CLI           |
| `-f`, `--file <path>`  | Specifies the path to the JSON file to import   |
| `-h`, `--help`         | Displays the help message for the CLI           |

### Examples

#### Importing Data from JSON

```bash
import-data-cli --file /path/to/cars.json
```

This command will parse the JSON file specified by the `--file` option and import the data into the application's database.

## JSON File Format

The JSON file should follow the format below:

```json
[
  {
    "name": "Category Name",
    "description": "Detailed description of the category.",
    "imageUrl": "URL of the category image",
    "cars": [
      {
        "model": "Car Model",
        "price": 12345,
        "color": "Color of the car",
        "description": "Detailed description of the car.",
        "imageUrl": "URL of the car image"
      }
    ]
  }
]
```

### Sample Data

Below is a sample JSON structure for importing data:

```json
[
  {
    "name": "Pickup trucks",
    "description": "Description of the Pickup trucks category.",
    "imageUrl": "https://example.com/category_image.png",
    "cars": [
      {
        "model": "Nissan Navara 2007",
        "price": 8500,
        "color": "Dark Grey",
        "description": "Description of the car.",
        "imageUrl": "https://example.com/car_image.png"
      },
      {
        "model": "Toyota Tundra 2020",
        "price": 38900,
        "color": "Red",
        "description": "Description of the car.",
        "imageUrl": "https://example.com/car_image.png"
      }
    ]
  }
]
```

### Description of Fields

- **name**: The category name.
- **description**: Detailed information about the category.
- **imageUrl**: URL of an image representing the category.
- **cars**: An array of car objects within the category, each with:
  - **model**: The car model.
  - **price**: The price of the car.
  - **color**: The color of the car.
  - **description**: Detailed information about the car.
  - **imageUrl**: URL of an image representing the car.
