# Socket Testing

This project is a testing ground for Socket.io with React.

The current implementation runs the API and socket server from index.js, with the React client located in the client folder.

## Libraries Used

### Frontend
- React
- Redux
- Socket.io-client
- Redux-Observable
- Rxjs
- Tailwindcss

### Backend
- Socket.io
- Helmet
- Body-parser
- Cookie
- Cookie-parser
- Express
- Jsonwebtoken  
- Dotenv

### Why these libraries?
For the frontend, given the socket use case, redux-thunk is not as suitable due to the bi-directional nature of sockets and the client needing to react to the incoming data.

Tailwindcss is also used for future abstraction of properties to reduce reliance on bootstrap.

For the backend, JWT is used to authenticate client on login to ensure the server is opening a socket connection to the correct client.

Helmet is used for security protocols.

Body-parser, cookie and cookie-parser is there for convenience.

## Current Features

- The React client contains a login form that directs to /api/login. On successful logging in, 

## TODO:

- Implement viable use cases for socket bi-directional data flow.
- Abstract and add in session storage for single user session enforcement.
- Possibly add in Redis for session storage
- Possible addition and abstraction of DB for data storage.
