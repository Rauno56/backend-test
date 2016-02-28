# Back-end Test
Back-end skill test repository.

## After clone
`npm install`

## Environment variables
* PORT
* DATA_SOURCE
* DSN

## Testing

### Over in-memory mockups
`set DATA_SOURCE=inMemory&&npm test` (Yeah! Windows <3)

### Over a real database like PostgreSQL
`set DATA_SOURCE=postgreSQL&&set DSN=postgres://postgres:123@localhost:5432/backend_test&&npm test`

## Building

`npm run build`

## Running

### Dev server
`set PORT=3000&&set DATA_SOURCE=postgreSQL&&set DSN=postgres://postgres:123@localhost:5432/backend_test&&npm run dev`

### Production server (after build)
`set PORT=3001&&set DATA_SOURCE=postgreSQL&&set DSN=postgres://postgres:123@localhost:5432/backend_test&&npm start`
