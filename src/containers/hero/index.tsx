import { motion } from 'framer-motion'
import { WaveEffect } from '../../components/animations/wave'

import styles from './hero.module.css'

const heroTitleVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delay: 1,
      ease: 'easeInOut',
    },
  },
}

const heroBlockquoteVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      delay: 1.7,
      ease: 'easeInOut',
    },
  },
}

function Hero() {
  return (
    <>
      <div className={styles.hero}>
        <WaveEffect />
        <motion.h1
          variants={heroTitleVariants}
          initial="initial"
          animate="animate"
          className={styles.title}
        >
          <span className="highlight">Howdy,</span> my name is Hedênica
          <br />
          and I&apos;m a frontend engineer
        </motion.h1>
        <motion.blockquote
          variants={heroBlockquoteVariants}
          initial="initial"
          animate="animate"
          className={styles.blockquote}
        >
          &quot;with great power comes great responsibility&quot;
        </motion.blockquote>
      </div>
    </>
  )
}

export default Hero
