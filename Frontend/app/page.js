import styles from "./page.module.css";
import ChatArea from "./ChatArea";


export default function Home() {


  return (
    <main className={styles.main}>
      <div className={styles.description}><p><b>My-Bot</b></p></div>
      <div className={styles.mainChatContainer}>
      <ChatArea/>
      </div>
         <div className={styles.footer}>
          <p><br></br>
          http://github.com/renemrhfr</p>
      </div>
    </main>
  );
}
