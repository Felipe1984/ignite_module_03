import { createClient, Client } from '@prismicio/client'

export function setClient(): Client {
   const client = createClient(
      "https://ignewsfb3.prismic.io/api/v2",
      {
         accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      }
   )

   return client;
}