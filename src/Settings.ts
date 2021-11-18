export const DEV_ENV: Settings = {
  is_dev: true, // shows an indication when its dev
  api_url: "http://localhost:8080/",
  osu_id: 0, // osu! OAuth client ID
  osu_redirect: "http://localhost:3000/login"
};

interface Settings {
  is_dev: boolean,
  api_url: string,
  osu_id: number,
  osu_redirect: string
}

export const CONFIG = DEV_ENV;
