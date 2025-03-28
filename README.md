# JWT-Authentication-System
## Features
- User signup with JWT token generation
- User login with token authentication
- Fetch user details using JWT authentication
- Logout functionality

## Technologies Used
- **Frontend:** HTML, JavaScript, Axios
- **Backend:** Node.js, Express, JSON Web Token (JWT)

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. Open `index.html` in a browser or serve it via a static server.

## API Endpoints

### User Signup
- **Endpoint:** `POST /signup`
- **Request Body:**
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "You are signed up",
    "token": "your-jwt-token"
  }
  ```

### User Signin
- **Endpoint:** `POST /signin`
- **Request Body:**
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "You are signed in",
    "token": "your-jwt-token"
  }
  ```

### Get User Info
- **Endpoint:** `GET /me`
- **Headers:**
  ```sh
  Authorization: Bearer your-jwt-token
  ```
- **Response:**
  ```json
  {
    "username": "user1"
  }

