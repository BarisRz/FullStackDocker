# Full-Stack App Template with React, Express, MySQL, and Docker

This is a template for building a full-stack application using React for the front-end, Express for the back-end, MySQL for the database, and Docker for easy deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- Docker (only if you plan to deploy)

## Getting Started

1. Run the command :

```bash
npm install
```

2. Clone this repo and dont FORGET to configure your .env (in /backend AND /fronted) by looking the sample to help you :

### Backend :

```bash
# Port for the backend server (Express)
APP_PORT=5000

# Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=USER
DB_PASSWORD=DB_PASSWORD
DB_NAME=YourDBName
```

For easy setup of a database, you can dump a set of data into the file `/backend/schema.sql` if you want to use fake data, the base schema is already set. To use them run, you can also run the same command to create a database with your own data :

```bash
npm run db:migrate
```
