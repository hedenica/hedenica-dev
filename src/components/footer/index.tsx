import Image from 'next/image'

import styles from './footer.module.css'

import heart from '../../../public/heart.svg'

import { Github, LinkedIn, Instagram, Twitter } from '../icons'

function Footer() {
  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.wrapper}>
        <h1 className={styles.content}>made with</h1>
        <div className={styles.heart}>
          <Image src={heart} alt="heart" />
        </div>
        <h1 className={styles.content}>by hedênica</h1>
      </div>
      <div>
        <a href="https://github.com/hedenica" target="_blank" rel="noreferrer">
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/hedenica/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
        <a
          href="https://www.instagram.com/_hedenica"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </a>
        <a href="https://twitter.com/hedenica" target="_blank" rel="noreferrer">
          <Twitter />
        </a>
      </div>
    </footer>
  )
}

export default Footer
