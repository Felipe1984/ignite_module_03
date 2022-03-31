import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "services/axios";
import { getStripeJs } from "services/strype-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
   priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
   const { data: session } = useSession();
   const { push } = useRouter();

   async function handleSubscribe() {
      if (!session) {
         signIn("github");
         return;
      }

      if (session.activeSubscription) {
         push('/posts')
         return;
      }

      try {
         const response = await api.post('/subscribe');
         const { data: { sessionId } } = response

         console.log("SessionId: ", sessionId)

         const stripe = await getStripeJs()
         stripe.redirectToCheckout({ sessionId })
      } catch(err) {
         alert(err.message);
      }
   }

   return (
      <button
         type="button"
         className={styles.subscribeButton}
         onClick={handleSubscribe}
      >
         Subscribe now
      </button>
   );
}