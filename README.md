# Lebasee

Lebasee is a 3D model-based clothing visualization web app that allows users to design a 3D model based on their specific body dimensions. Users can input parameters like height, weight, and detailed measurements of body parts. The generated model helps users check how various clothing items look on their body, enhancing their online shopping or outfit planning experience.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Running the Project](#running-the-project)
5. [Building the Project](#building-the-project)
6. [Technologies Used](#technologies-used)

---

## Features

- **3D Model Generation**: Users can input body dimensions and generate a customizable 3D model.
- **Clothing Visualization**: Users can select and apply clothing items to the model to visualize how they look on their body.
- **Interactive Interface**: Seamless interaction and UI for ease of use.

## Project Structure

```
├── src
│   ├── assets          # Images, fonts, and other static files
│   ├── components      # Reusable components for the UI
│   ├── pages           # Application pages (e.g., Home, Model Viewer)
│   ├── styles          # Base styles including color themes, typography
│   ├── api             # API endpoint handlers
│   └── App.tsx         # Root component
├── public              # Public files and icons
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Lebasee/Lebasee-Frontend.git
   cd lebasee
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if you use yarn
   yarn install
   ```

## Running the Project

Start the development server using Vite:

```bash
npm run dev
# or if you use yarn
yarn dev
```

Access the app at `http://localhost:5173`.

## Building the Project

To create a production build, run:

```bash
npm run build
# or if you use yarn
yarn build
```

The build files will be in the `dist` folder.

## Technologies Used

- **React**: Core library for building the user interface
- **TypeScript**: For type safety and scalability


---
