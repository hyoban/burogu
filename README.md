# burogu

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhyoban%2Fburogu&env=NOTION_DATABASE_ID,NOTION_TOKEN)

## How to use this project

### Prepare Notion database

1. First prepare an empty database for storing blog posts, get `NOTION_DATABASE_ID`
2. Create [Integrations](https://www.notion.so/my-integrations), get `NOTION_TOKEN`, and connect to the database

### Start setup

1. Fork my code or use this repository as a template
2. Modify the contents of `site.config.ts` according to your information
3. Create a new project in Vercel with this repository
4. Fill in the environment variables `NOTION_TOKEN`, `NOTION_DATABASE_ID`

## Recommended writing mode

Write on any other page, and when finished, copy or move to the created database.
