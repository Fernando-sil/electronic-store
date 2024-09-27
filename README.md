# Electronic Store

This is the front-end part of the electronic store app. To be used together with the backend. The following technologies were used:

- React
- Typescript
- Tanstack Router
- Tanstack Query
- React-toastify

## Authentication

This app includes authentication using JWT and refresh token.

### Authentication Strategy

- Backend sends JWT and refresh token to the front-end
- Refresh token is stored in http-only cookie
- JWT has a short life of 1h and is saved in session storage

When JWT expires, the front-end sends the expired JWT together with the refresh token to the backend. If expired JWT has a valid signature and refresh token is valid and not expired, the backend sends new JWT and refresh token to the front-end.
If refresh token is expired, user must login again.
