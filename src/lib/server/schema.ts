import { boolean, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
    id: uuid('id').primaryKey().defaultRandom(),
    sort_id: integer('sort_id').notNull().default(0),
    name: varchar('name').notNull(),
    avatar: varchar('avatar').notNull(),
});

export const players = pgTable("players", {
    id: uuid('id').primaryKey().defaultRandom(),
    game_id: varchar('game_id').notNull(),
    team_id: uuid('team_id').references(() => teams.id).notNull(),
    captian: boolean('captian').notNull()
});

export const mappools = pgTable("mappools", {
    id: uuid('id').primaryKey().defaultRandom(),
    sort_id: integer('sort_id').notNull().default(0),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    bplist: text('bplist').notNull(),
    maps: uuid('maps').references(() => maps.id).array().notNull(),
})

export const maps = pgTable("maps", {
    id: uuid('id').primaryKey().defaultRandom(),
    hex: varchar('hex').notNull(),
    diff: varchar('diff').notNull(),
})