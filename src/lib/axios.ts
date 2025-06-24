import axios from "axios";

export const lemonSqueezyClient = axios.create({
  baseURL: "https://api.lemonsqueezy.com/v1",
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY!}`,
  },
});