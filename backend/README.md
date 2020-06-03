<div align="center">

# Backend
[![typescript](https://img.shields.io/badge/typescript-^3.8.3-success.svg)](https://www.typescriptlang.org/)
[![eslint](https://img.shields.io/badge/eslint-^6.8.0-blueviolet.svg)](https://eslint.org/)
[![express](https://img.shields.io/badge/express-^4.17.1-grey.svg)](https://expressjs.com/)
[![typeorm](https://img.shields.io/badge/typeorm-^0.2.24-red.svg)](https://typeorm.io/#/)

</div>

## Description
This api will go manage the login, sign up, and favorite movies of the user of the application.

The utilization of **TypeORM** helps very in communication with the database **PostgreSQL**, this is an ORM to be used with **Typescript**, making it easier to create queries in the database.

## Settings
- Create a file in the root of project *.env* and define a variable **SECRET** what will use as the key secret of JWT, the value that variable can to be anything, but let it be a difficult word to guess.

## Run
- installation dependencies:<br>
  ``` yarn OR npm i```
- run project:<br>
  ``` yarn dev OR npm dev```

## structure folder

| folder      | description                                                   |
|-------------|---------------------------------------------------------------|
| src         | Contain all of files required                                 |
| database  | Connection with the DB of PostgreSQL                          |
| controllers | All logic of communication with the DB (CRUD)                 |
| entity      | Entity is a class that maps to a database table.              |
| utils       | functions generics what that can be used in every application |
| routes.ts   | All the routes used                                           |
