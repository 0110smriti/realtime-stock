# Stock Prices Tracker

This project is a simple web application that collects and displays real-time price data for selected stocks. It is built using Express.js, MongoDB with Mongoose, React, Redux, and TypeScript.

## Prerequisites

- Node.js and npm
- MongoDB (installed and running locally or via MongoDB Atlas)

## Installation

1. **Clone and enter the repository:**

```bash
git clone https://github.com/0110smriti/stock.git
cd stock
```

2. **Set up the backend:**

```bash
npm install
```

3. **Set up the frontend:**

```bash
cd frontend
npm install
```

## Configuration

### Backend

1. Create a `.env` file in the `stock` directory with the following content:

```
MONGODB_URI=<your-mongodb-uri>
FINNHUB_API_KEY=<your-finnhub-api-key>
PORT=5000
```

Replace `<your-mongodb-uri>` with your MongoDB connection string and `<your-finnhub-api-key>` with your Finnhub API key.

### Frontend

No additional configuration is needed for the frontend.

## Running the Application

1. **Start the backend server:**

```bash
cd backend
npm run dev
```

2. **Start the frontend development server:**

```bash
cd ../frontend
npm start
```

The frontend will be available at `http://localhost:3000`.

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Select a stock  from the dropdown.
3. The table will update every 5 seconds with the latest price data.
4. Click the "Change Stock" button to open the modal and select a different stock.