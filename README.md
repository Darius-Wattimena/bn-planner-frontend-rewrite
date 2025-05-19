# Nomination Planner

The Nomination Planner is a web application designed to help Beatmap Nominators plan and manage their nominations. The 

To run locally adjust the `Settings.ts` file and adjust the `osu_id` in the `DEV_ENV` to your osu! OAuth client ID. Besides this you need to run the backend found [here at my bnplanner-2 repo](https://github.com/Darius-Wattimena/bnplanner-2). 

```typescript
export const DEV_ENV: Settings = {
  is_dev: true, // shows an indication when its dev
  api_url: "http://localhost:8080/",
  osu_id: 1, // osu! OAuth client ID
  osu_redirect: "http://localhost:3000/login"
};
```

## Features Requests

Want something changed? Contact me on Discord at `greaper` or contact me directly on osu!.