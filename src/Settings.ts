export const DEV_ENV: Settings = {
  is_dev: true, // shows an indication when its dev
  api_url: "http://localhost:8080/",
  osu_id: 12978, // osu! OAuth client ID
  osu_redirect: "http://localhost:3000/login"
};

export const PROD_ENV: Settings = {
  is_dev: false, // shows an indication when its dev
  api_url: "https://bnplannerbackend.greaper.net/",
  osu_id: 14229, // osu! OAuth client ID
  osu_redirect: "https://bnplanner.greaper.net/login"
};

interface Settings {
  is_dev: boolean,
  api_url: string,
  osu_id: number,
  osu_redirect: string
}

export const BACKEND_ENVIRONMENT =
  typeof window !== 'undefined' && window.location.host !== 'bnplanner.greaper.net'
          ? 'dev'
          : 'prod'

export const CONFIG = BACKEND_ENVIRONMENT === "prod" ? PROD_ENV : DEV_ENV;
