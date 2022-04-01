import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './navbar.module.css'

function Navbar() {
  const logoVariants = {
    initial: {
      opacity: 0,
      x: '-300px',
    },
    animate: {
      opacity: 1,
      x: '20px',
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  const tagVariants = {
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

  return (
    <nav className={styles.navbar}>
      <Link href='/' passHref>
        <motion.h2
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className={styles.logo}
        >
            <motion.span
              variants={tagVariants}
              initial="initial"
              animate="animate"
              className={styles.tag}
            >
              {'< '}
            </motion.span>
            hedênica
            <motion.span
              variants={tagVariants}
              initial="initial"
              animate="animate"
              className={styles.tag}
            >
              {' />'}
            </motion.span>
        </motion.h2>
      </Link>
    </nav>
  )
}

export default Navbar
