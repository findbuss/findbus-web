import Sidebar from '@/components/Sidebar';

import DynamicMap from '@/components/DynamicMap';
import styles from './page.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <DynamicMap />
      </main>
    </div>
  );
}
