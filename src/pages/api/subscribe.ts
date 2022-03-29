import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";
import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { fauna } from "services/fauna";

type User = {
   ref: {
      id: string;
   },
   data: {
      stripe_customer_id: string;
   }
}

export default async function handlerSubscribe(
   request: NextApiRequest,
   response: NextApiResponse
) {
   
   if(request.method === 'POST') {
      const session = await getSession({ req: request })

      const user = await fauna.query<User>(
         q.Get(
            q.Match(
               q.Index("user_by_email"),
               q.Casefold(session.user.email)
            )
         )
      );

      let { data: { stripe_customer_id: customerId } } = user;

      if(!customerId) {
         const stripeCustomer = await stripe.customers.create({
            email: session.user.email
         });

         await fauna.query(
            q.Update(
               q.Ref(q.Collection("users"), user.ref.id),
               {
                  data: {
                     stripe_customer_id: stripeCustomer.id
                  }
               }
            )
         );

         customerId = stripeCustomer.id;
      }


      const stripeCheckoutSession = await stripe.checkout.sessions.create({
         customer: customerId,
         mode: 'subscription',
         success_url: process.env.STRIPE_SUCCESS_URL,
         cancel_url: process.env.STRIPE_CANCEL_URL,
         payment_method_types: ['card'],
         billing_address_collection: 'required',
         line_items: [
            { price: 'price_1KhI0PKmksunV1bVnjPhYaj0', quantity: 1 }
         ]
      });

      return response.status(200).json({
         sessionId: stripeCheckoutSession.id
      })
   } else {
      response.setHeader('Allow', 'POST');
      response.status(405).json({ message: 'Method not allowed' })
   }
}