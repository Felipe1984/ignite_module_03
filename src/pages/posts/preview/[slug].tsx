import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router"
import { setClient } from "services/prismic";
import * as prismicH from "@prismicio/helpers";
import { formatDate } from "utils/formatDate";
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";

interface PostPreviewProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function PostPreview({ post }: PostPreviewProps) {
   const { data: session } = useSession();
   const { push } = useRouter();

   useEffect(() => {
      if (session?.activeSubscription) {
         push(`/posts/${post.slug}`)
      }
   }, [session])

   return (
      <>
         <Head>
            <title>{post.title} | Ignews</title>
         </Head>
         <main className={styles.container}>
            <article className={styles.post}>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div
                  className={`${styles.postContent} ${styles.previewContent}`}
                  dangerouslySetInnerHTML={{
                     __html: post.content
                  }}
               />

               <div className={styles.continueReading}>
                  Wanna continue reading?
                  <Link href="/">
                     <a> Subscribe now 🤗</a>
                  </Link>
               </div>
            </article>
         </main>
      </>
   );
}

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
         {
            params: { slug: 'jamstack-geleia-de-javascript-api-e-markup' }
         }
      ],
      fallback: "blocking" // true false ou blocking
   }
}

export const getStaticProps: GetStaticProps = async({ params }) => {
   const { slug } = params as { slug: string };

   const prismic = setClient()

   const {
      data: { title, content },
      last_publication_date
   } = await prismic.getByUID("publication", slug)

   const post = {
      slug,
      title: prismicH.asText(title),
      content: prismicH.asHTML(content.splice(0, 3)),
      updatedAt: formatDate({
         date: new Date(last_publication_date),
         options: {
            day: "2-digit",
            month: "long",
            year: "numeric"
         }
      })
   }

   return {
      props: {
         post
      },
      revalidate: 60 * 60 * 2 // 2 horas
   }
}