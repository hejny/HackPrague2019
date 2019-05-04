import { Model } from 'objection';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config';
import * as Knex from 'knex';

//todo better
export const knex = Knex({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        dateStrings: true,
    },
});
Model.knex(knex);

export const initDBConnection = () => {
    return knex;
};
