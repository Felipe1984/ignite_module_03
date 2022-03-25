import Image from "next/image";
import logoImg from "images/logo.svg";

import styles from "./style.module.scss"
import { SignInButton } from "components/SignInButton";

export function Header() {
   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Image src={logoImg} alt="ig.news" />
            <nav>
               <a href="#" className={styles.active}>Home</a>
               <a href="#">Posts</a>
            </nav>
            <SignInButton />
         </div>
      </header>
   );
}