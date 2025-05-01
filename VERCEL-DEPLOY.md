# Vercel Deployment Guide

This guide explains how to deploy the Retro Feedback application to Vercel.

## Required Environment Variables

Set the following environment variables in your Vercel project settings:

### Database Connection
- `POSTGRES_URL`: Your PostgreSQL connection string (e.g., `postgresql://username:password@host:5432/dbname`)
- `POSTGRES_URL_NON_POOLING`: Same as above, but for direct connections (used for migrations)

### Email Service
- `RESEND_API_KEY`: Your Resend API key
- `RESEND_FROM_EMAIL`: Email address to send from (e.g., `onboarding@resend.dev`)

### Application URLs (Optional)
- `NEXT_PUBLIC_BASE_URL`: Your application's public URL (e.g., `https://your-app.vercel.app`)

## Build Settings

The application has been configured to automatically run `prisma generate` during the build process to prevent the common Prisma Client initialization error.

These settings are already configured in:
1. `package.json` - The build script includes `prisma generate`
2. `vercel.json` - Contains the build command configuration
3. `prisma/schema.prisma` - Includes binary targets for Vercel environments

## PostgreSQL Setup

### Using Vercel Postgres

If you're using Vercel's PostgreSQL integration:

1. Add the Vercel Postgres integration to your project
2. Vercel will automatically set the required environment variables

### Using External PostgreSQL

If you're using an external PostgreSQL database:

1. Create a PostgreSQL database
2. Set the connection string in the environment variables
3. Make sure your database allows connections from Vercel's IP addresses

## Troubleshooting

### Prisma Client Initialization Error

If you see this error:
```
Error [PrismaClientInitializationError]: Prisma has detected that this project was built on Vercel...
```

Make sure:
1. The build command includes `prisma generate`
2. You're using the correct database connection string
3. Your database is accessible from Vercel

### Database Connection Issues

If you have problems connecting to the database:

1. Check that your connection string is correct
2. Verify that your database allows connections from Vercel
3. Check if your database requires SSL (add `?sslmode=require` to the connection string)

### Email Sending Issues

If emails aren't being sent:

1. Verify your Resend API key is correct
2. Check that you're using a verified email domain in Resend
3. Check the Resend dashboard for error logs 