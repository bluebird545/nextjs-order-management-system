# Next.js Order Management System (OMS)

## Description
An example of an order management system

## Running the project
Developement:

`npm run dev`


## Running the ETL
Reads and extracts data from CSV files, transforms it, and loads it to PostgreSQL database using environment variables in `.env`
run ETL:

Using MAKEFILE:
`make run-etl`

Running script from package.json:
`npm run etl`