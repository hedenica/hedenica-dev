import Image from 'next/image'
import { useInView } from 'react-hook-inview';
import { motion } from 'framer-motion'
import styles from './about.module.css';

import denny from '../../../public/denny-foto.jpeg'

function About() {
  const [ref, inView] = useInView()

  const aboutVariants = {
    initial: { 
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.5
      }
    }
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
      }
    }
  }

  return (
    <motion.div
      className={styles.about}
      variants={aboutVariants}
      initial='initial'
      animate={inView && 'animate'}
    >
      <div ref={ref} className={styles.container}>
        <h1 className={styles.title}>
          <span className='highlight'>Get</span> to know me a little
        </h1>
        <p className={styles.description}>
          When I fell in love with the whole Frontend ecosystem I found purpose and meaning not only in my professional life but also in my 
          personal life.<br/>

          I&apos;m always thinking about code, and reading about it. <br/><br/>

          Academicaly speaking, I have a bachelor&apos;s degree in Business Administration and also an MBA degree in Business 
          Intelligence & Analytics. <br/><br/>

          To wrap it up, I work mostly with ReactJS, React Native, and a whole lot of Javascript.
        </p>
      </div>
      <div className={styles.photo}>
        <Image src={denny} alt="hedênica" />
      </div>
      <motion.h1
        className={styles.backgroundText}
        variants={backgrountTextVariants}
        initial='initial'
        animate={inView && 'animate'}
      >
        who i am
      </motion.h1>
    </motion.div>
  )
}

export default About
