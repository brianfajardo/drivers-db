# Drivers Database 🚖

Backend project that models closely to the core functionality of rideshare companies such as Uber and Lyft. Geolocations of drivers are supported through GeoJSON and Mongo's `geoNear` method

## Technologies:
- Node.js
- MongoDB
- Mongoose
- Mocha (testing)

## API routes:
- GET on `/api/drivers`
  - returns a list of all drivers around a coordinate pair taken from the query params

- POST on `/api/drivers`
  - creates a new driver record

- PUT on `/api/drivers/:id`
  - updates a driver by ID

- DELETE on `/api/drivers/:id`
  - deletes a driver by ID

## Todos:
- Create a web client with React/Redux
- Create a mobile client with React Native