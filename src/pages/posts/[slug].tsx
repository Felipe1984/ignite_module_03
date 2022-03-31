import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { setClient } from "services/prismic";
import * as prismicH from "@prismicio/helpers";
import { formatDate } from "utils/formatDate";
import Head from "next/head";

import styles from "./post.module.scss";

interface PostProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function Post({ post }: PostProps) {
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
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{
                     __html: post.content
                  }}
               />
            </article>
         </main>
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async({ req, params }) => {
   const session = await getSession({ req });
   const { slug } = params as { slug: string };
   // console.log(slug)
   const prismic = setClient()

   const {
      data: { title, content },
      last_publication_date
   } = await prismic.getByUID("publication", slug)

   // console.log(JSON.stringify(response, null, 2));

   const post = {
      slug,
      title: prismicH.asText(title),
      content: prismicH.asHTML(content),
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
      }
   }
}