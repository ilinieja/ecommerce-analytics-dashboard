# E-commerce Analytics Dashboard

Stores, processes and displays key E-commerce metrics.

![Screenshot](docs/screenshots/ecomerce-analytics-dashboard.gif)

## Tech stack

### [Next.js](https://nextjs.org/)

Main framework for UI and API layers.

### [MongoDB](https://www.mongodb.com/)

Raw orders data storage and analytical views aggregation.

### [Agenda](https://github.com/agenda/agenda)

Jobs scheduler for analytical view updates.

### [Redux](https://redux-toolkit.js.org/)

UI state management.

### [D3](https://d3js.org/)

Charts and dataviz elements.

### [Docker](https://www.docker.com/)

Containerization for the app and dependencies.

## Deploy
The app and its dependencise are containerized and ready to be deployed using `docker-compose.yml`. To deploy it you need to:
- Create `.env` file in the project root and copy `.env.default` contents into it.
Each env var has description in the comment, change if needed.
You may want to change the `APP_PORT` env var since it controls on which port the app will be available.

- Run `docker-compose -f docker-compose.yml up -d` (you'll need Docker installed on your machine).

- Now you can add data - you can either create the script to insert your data (and use [insertOrders helper](./api/mocks/insert-orders.ts) to write to DB), or [populate mock data](#mock-data).

## Development

To start app the app locally in live-reload/debug mode you need to:

- Create `.env` file in the project root and copy `.env.default` contents into it.
Each env var has description in the comment, change if needed
(defaults are supposed to work fine though).

- Run `docker-compose -f docker-compose.dev.yml up -d` (you'll need Docker installed on your machine), it'll run the app dependencies and expose them for local use (defaults from `.env.default` are aligned with that).

- Next you'll need to [add some orders](#mock-data).

- Now process the data to get analytical views - run `npm run jobs`, that'll schedule the jobs and start the worker, you can keep that running if you want the views to be updated on schedule.

- Run `npm run start:dev` to start the app locally. UI will be available on port 3000 (default Next.js port).


## Testing
There's test env setup available in `docker-compose.test.yml`. It runs the app with dependencies, populates test data and runs tests against it (in a separate test-runner container). Use `docker-compose -f docker-compose.test.yml up -d` to start the app in test mode.

## Mock data
There are 2 ways to add mock orders:
- `npm run populate-mock-orders` - adds random orders.
- `npm run populate-mock-orders-from-file` - adds fixed orders from `/api/mocks/mock-orders.json`.
