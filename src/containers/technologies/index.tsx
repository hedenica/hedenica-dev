import { useInView } from 'react-hook-inview'
import { motion } from 'framer-motion'
import { CardTech } from '../../components/cardTech'
import styles from './tech.module.css'

import arrowDown from '../../../public/arrow_down_icon.svg'
import Image from 'next/image'

function Technologies() {
  const [ref, inView] = useInView()

  const techs = [
    {
      tag: 'language',
      tech: [
        { id: 0, name: 'Javascript' },
        { id: 1, name: 'Typescript' },
      ],
    },
    {
      tag: 'frameworks',
      tech: [
        { id: 2, name: 'Next JS' },
        { id: 3, name: 'Remix' },
      ],
    },
    {
      tag: 'libraries',
      tech: [
        { id: 4, name: 'React JS' },
        { id: 5, name: 'React Native' },
      ],
    },
    {
      tag: 'styling',
      tech: [
        { id: 6, name: 'Styled Components' },
        { id: 7, name: 'CSS' },
        { id: 8, name: 'CSS Modules' },
        { id: 9, name: 'SASS' },
      ],
    },
    {
      tag: 'state management',
      tech: [
        { id: 10, name: 'Context API' },
        { id: 11, name: 'Redux' },
      ],
    },
    {
      tag: 'data',
      tech: [
        { id: 12, name: 'API Rest' },
        { id: 13, name: 'GraphQL' },
      ],
    },
    {
      tag: 'testing',
      tech: [
        { id: 14, name: 'Jest' },
        { id: 15, name: 'React Testing Library' },
      ],
    },
    {
      tag: 'tooling',
      tech: [
        { id: 16, name: 'ES Lint' },
        { id: 17, name: 'Husky' },
        { id: 18, name: 'Prettier' },
      ],
    },
  ]

  const techVariants = {
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

  return (
    <motion.div
      ref={ref}
      className={styles.tech}
      variants={techVariants}
      initial="initial"
      animate={inView && 'animate'}
    >
      <h1 className={styles.title}>
        <span className="highlight">My</span> technologies
      </h1>

      <div className={styles.techContainer}>
        <CardTech techs={techs} />
        <div className={styles.arrowDown}>
          <Image src={arrowDown} alt="arrow down" />
        </div>
      </div>

      <motion.h1
        className={styles.backgroundText}
        variants={backgrountTextVariants}
        initial="initial"
        animate={inView && 'animate'}
      >
        what i know
      </motion.h1>
    </motion.div>
  )
}

export default Technologies
