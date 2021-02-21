Application to collect and display measured boat position sample data.

# Installation

## Prerequisites

- Have an installed instance of PostgreSQL on your computer.
- Have NPM installed on your computer.
- Have Node.js installed on your computer

In development:

- PostgreSQL v10.15
- NPM v7.5.4
- Node v12.20.2

were used.

## Source

Go to your desired directory and execute this code to clone this project onto your computer:

```
git clone https://github.com/paebo/norbit-homework.git
```

It will create a folder with a cloned instance of the application.

## Database

Set up PostgreSQL environment. Run the following commands from the recently cloned folder:

```
psql -f ./SQL/01_create_db.sql
psql -f ./SQL/02_create_table_record.sql
```

## Build

Build the NPM environment. Run:

```
npm install
```

# Execute

There are three command line components. index.js is the server, boat.js is the data provider.

First, start the server:

```
npm start
```

Then, start the frontend process:

```
cd frontend/
npm start
```

This will open http://localhost:3000/ in your default browser. You shall see **_no data stream_** note in the middle of your screen.

Lastly, start the data provider:

```
cd ..
node boat
```

This will start the data streaming from _./data/line1.csv_ file to the server and to the frontend.

You should see the streamed data coordinates and heading information, changing every second.

**Enjoy :)**
