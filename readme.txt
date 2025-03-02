# Prisma ORM Quick Guide

We are using Prisma ORM in our project for managing database migrations and operations.

1. Create migrations
- To create a new migration after modifying your schema.prisma: `npx prisma migrate dev --name <migration-name>` command.
2. Check Migration Status
- To check the current migration status and see if your schema is up-to-date: `npx prisma migrate status` command.
3. Reset Database
To reset the database (only for development) — clears everything and applies all migrations again: `npx prisma migrate reset` command.
4. Update the Database Schema
To apply the latest schema changes and migrations to your database: `npx prisma migrate deploy` command.
5. Reset migration
Mark the migration as rolled-back `npx prisma migrate resolve --<migration file name>`

