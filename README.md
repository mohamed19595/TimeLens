# SHS Project Setup Guide

## Prerequisites
To run this project, you will need to install **Node.js** and **Python** with required dependencies. Follow the instructions below for both frontend and backend setup.

---

## Frontend Setup

### 1. Install Node.js
First, install **Node.js** from the official website:
- [Node.js Download](https://nodejs.org/fr/download/prebuilt-installer)

### 2. Open the Project Folder
Open the main project folder in a code editor (e.g., **VSCode**).

### 3. Open a Terminal
Open a terminal inside the editor.

### 4. Navigate to the Project Directory
In the terminal, navigate to the `SHS_PROJECT` folder by running the following command:

cd SHS_PROJECT

### 5. Install Dependencies
Run the following command to install the necessary dependencies:

npm install

### 6. Start the Development Server
Run the command to start the development server:

npm run dev

### 7. Access the Website
Once the server is running, a link will appear in the terminal. Click on the link to access the website.

---

## Backend Setup

### 1. Navigate to the Backend Directory
In the terminal, navigate to the `fast_neural_style_pytorch` folder:

cd fast_neural_style_pytorch

### 2. Install pipreqs (if not installed)
Install `pipreqs` to generate the required dependencies file:

pip install pipreqs

### 3. Install Python Dependencies
Install the necessary Python dependencies:

pip install -r requirements.txt

### 4. Run the Backend Script
Finally, run the backend script:

python webcam.py

---

Now both your **frontend** and **backend** should be up and running!
