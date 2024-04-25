# P2P Chat Application

For EC530 Final Project. This application is a browser based chatting application that used a GraphQL backend server for WebRTC signalling and chat storage/user management etc. All chatting is still done directly through WebRTC peers.

Currently there is a bug in Firefox that makes connections fail between two firefox clients. Please try only with Chrome. Additionally,
STUN/TURN is not properly configured, so all communication must be on a single private network.

## Installation

To install and run the P2P Chat Application, follow these steps:

1. Clone the repository: `git clone https://github.com/nsearls-bu/p2p`
2. Navigate to the project directory: `cd p2p`
3. Ensure Docker is installed on your machine.
4. Run Docker Compose to start the containers: `docker compose build && docker compose up -d`

## Usage

Once the application is running, you can access it via your web browser. Simply open your browser and navigate to `http://localhost:5173` to start using the application. First you must create a user and then login. Once other users are logged in, you should be able to search for them and begin chatting.

## Testing

Note that testing for the backend is done through Jest is contained in ".spec.ts" files. Namely the service.spec.ts files that test the database connections are used. There is a docker container for testing the backend. Run `docker compose up test` to run the unit tests.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **GraphQL**: A query language for APIs that enables clients to request only the data they need.
- **Vue.js**: A JavaScript framework for building user interfaces.
- **Vite**: A fast web development build tool that serves your code via native ES module imports during development.
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **Docker**: A platform for building, shipping, and running applications in containers.

## Author

- Ned Searls (nsearls@bu.edu)
