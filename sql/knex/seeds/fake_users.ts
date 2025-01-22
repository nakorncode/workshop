import { Knex } from "knex";
import { faker } from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    const total = 1000
    const masterPassword = 'pass123'

    const usernames = faker.helpers.uniqueArray(faker.internet.username, total)
    const emails = faker.helpers.uniqueArray(faker.internet.email, total)

    for (let i = 0; i < total; i++) {
        await knex("users").insert({
            name: usernames[i],
            email: emails[i],
            password: masterPassword
        });
    }
};
