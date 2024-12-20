# DronePilot
Backend service to manage drones, missions, and flight logs, including a simulation feature to mimic drone movement for mission execution.

---

## Overview
DronePilot is a backend service that allows users to manage drones, missions, and flight logs. The system includes a simulation feature to mimic drone movement along mission waypoints, track the mission's progress, and log flight details. The service also provides APIs to create, update, and delete drones and missions, assign drones to missions, and download flight logs as PDFs.

---

## Features
1. **User Authentication**
   - Users can sign up by providing a username, email, and password.
   - Upon login, a JWT token is generated for the user.
   - Passwords are hashed and stored securely using bcrypt.

2. **Drone Management**
   - Users can create, read, update, and delete drones.

3. **Mission Management**
   - Users can create, read, update, and delete missions.

4. **Assign Drone to Mission**
   - Users can assign a drone to a particular mission.
   - Drones and Missions are loosely coupled, single drone can be assigned to multiple missions, and each mission can be executed with a different drone.

5. **Simulation and Flight Logs**
   - Users can start a mission simulation, which simulates the movement of the drone along its waypoints.
   - The simulation calculates the distance between consecutive waypoints and determines the time to travel between waypoints based on the speed.
   - The simulation logs the drone's position at each waypoint, along with its altitude, latitude, longitude, and timestamp.
   - Upon completion, a flight log is generated and stored.
   - Users can access and download flight logs in PDF format by using a unique flight ID.

---

## Build and Run the Server
#### **Prerequisites:**
Ensure that you have the following installed on your machine:

- **Node.js** 
- **npm** 
- **MongoDB** (local or cloud service like MongoDB Atlas)
- **Postman** (for testing API requests)

#### **Steps to build and run the server:**

1. **Clone the repository:**
   Clone the repository to your local machine using Git:

   ```bash
   git clone https://github.com/Daminikesharkar/DronePilot.git
   cd DronePilot

2. **Install dependencies:**
   Clone the repository to your local machine using Git:

   ```bash
   npm install

3. **Configure environment variables:**
   Create a .env file in the root of the project directory and set up the following environment variables:

   ```bash
   PORT=3000  # Port for the server to run
   MONGO_URI=your_mongodb_connection_string  # MongoDB connection URI
   SECRET_KEY=your_jwt_secret_key  # Secret key for JWT authentication (random string)

   Replace your_mongodb_connection_string with your MongoDB connection string. if you're using MongoDB Atlas, you can get it from the MongoDB Atlas dashboard and your_jwt_secret_key with a secure key of your choice for signing JWT tokens.

4. **Run the server:**
   Run the server with the following command:

   ```bash
   npm start

5. **Testing the APIs:**
   Use **Postman** to test the APIs listed in the provided Postman collection. You can either:
   - **Import the provided Postman collection** to get started with pre-configured requests, or
   - **Set up your own Postman requests** based on the API documentation.

   ### Import the Postman Collection:
    1. Download the Postman collection file from the link below:

    [Download the Postman Collection](https://drive.google.com/file/d/18s-rRyl2s6hZ0LL7pVvfYa8SmXq2T06M/view?usp=sharing)

    2. Open **Postman** and click on **Import**.

    3. In the **Import** dialog, select the **Upload Files** tab and choose the downloaded `.json` file.

    4. After importing, the collection will appear in your Postman workspace. You can now run the API requests directly from the collection.

    ### Postman Collection Structure:
    The Postman collection includes the following API categories:

    - **User:**
    - **POST /signUp** - User Signup   
    - **POST /login** - User Login
    - **Drones:**
    - **POST /createDrone** - Create a new drone
    - **GET /getDronesByUser** - Get all drones of a specific user
    - **PUT /updateDrone/:id** - Update drone details
    - **DELETE /deleteDrone/:id** - Delete a drone
    - **Missions:**
    - **POST /createMission** - Create a new mission
    - **GET /getMissionById/:id** - Get details of a specific mission
    - **PUT /updateMission/:id** - Update mission details
    - **DELETE /deleteMission/:id** - Delete a mission
    - **POST /startMissionSimulation** - Start mission simulation
    - **Flight Logs:**
    - **GET /flightLog/:id** - Fetch flight log based on flight ID
    - **GET /flightLog/pdf/:id** - Download flight log as a PDF

    ### Running the Requests:
    Add the token generated in the login response to the **Authorization** header section of all remaining requests. 
    After importing the collection, you can easily run any API request by selecting the request from the collection and clicking **Send**. 
