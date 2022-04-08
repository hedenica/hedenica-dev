import Image from 'next/image'
import { useInView } from 'react-hook-inview'
import { motion, Variants, Transition } from 'framer-motion'
import styles from './about.module.css'

import denny from '../../../public/denny.jpg'

function About() {
  const [ref, inView] = useInView()

  const aboutVariants: Variants = {
    initial: {
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.5,
      },
    },
  }

  const backgrountTextVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 0.05,
      transition: {
        type: 'tween',
        stiffness: 100,
        bounce: 0.5,
      },
    },
  }

  const imageVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 1,
      },
    },
  }

  return (
    <motion.div
      className={styles.about}
      variants={aboutVariants}
      initial="initial"
      animate={inView && 'animate'}
    >
      <div ref={ref} className={styles.container}>
        <h1 className={styles.title}>
          <span className="highlight">Get</span> to know me a little
        </h1>
        <p className={styles.description}>
          I love to build beautiful stuff, I&apos;m always thinking about code
          and reading about it. <br />
          <br />
          To wrap it up, I work mostly with ReactJS, React Native, and a whole
          lot of Javascript/Typescript.
        </p>
      </div>
      <motion.div
        variants={imageVariants}
        initial="initial"
        animate={inView && 'animate'}
        className={styles.photo}
      >
        <Image src={denny} alt="hedênica" />
      </motion.div>
      <motion.h1
        className={styles.backgroundText}
        variants={backgrountTextVariants}
        initial="initial"
        animate={inView && 'animate'}
      >
        who i am
      </motion.h1>
    </motion.div>
  )
}

export default About
