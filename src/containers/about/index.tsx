import { useInView } from 'react-hook-inview'
import { motion, Variants } from 'framer-motion'
import styles from './about.module.css'

import denny from '../../../public/denny.jpeg'

const About = () => {
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

  const backgroundTextVariants = {
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
          I&apos;m a Frontend Software Engineer and Team Leader with experience
          in building high-quality web and mobile applications. Skilled in
          React, Next.js, React Native, and TypeScript, I focus on creating
          scalable, user-centric solutions while leading and mentoring teams to
          achieve their best.
        </p>
      </div>
      <motion.img
        src={denny.src}
        variants={imageVariants}
        initial="initial"
        animate={inView && 'animate'}
        className={styles.photo}
      />
      <motion.h1
        className={styles.backgroundText}
        variants={backgroundTextVariants}
        initial="initial"
        animate={inView && 'animate'}
      >
        who i am
      </motion.h1>
    </motion.div>
  )
}

export default About
