import { SignInButton } from "components/SignInButton";
import { ActiveLink } from "components/ActiveLink";

import Image from "next/image";
import logoImg from "images/logo.svg";

import styles from "./style.module.scss"

export function Header() {

   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Image src={logoImg} alt="ig.news" />
            <nav>
               <ActiveLink activeClassName={styles.active} href="/">
                  <a>Home</a> 
               </ActiveLink>
               <ActiveLink activeClassName={styles.active} href="/posts">
                  <a>Posts</a>
               </ActiveLink>
            </nav>
            <SignInButton />
         </div>
      </header>
   );
}