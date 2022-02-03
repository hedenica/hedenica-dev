import { useInView } from 'react-hook-inview';
import { motion } from 'framer-motion'
import { CardTech } from '../../components/cardTech';
import styles from './tech.module.css';

function Technologies() {
  const [ref, inView] = useInView()

  const techs1 = [
    {
      tag: 'language',
      name: ['Javascript', 'Typescript'],
    },
    {
      tag: 'frameworks',
      name: ['Next JS', 'Remix']
    },
    {
      tag: 'libraries',
      name: ['React JS', 'React Native']
    },
  ]

  const techs2 = [
    {
      tag: 'styling',
      name: ['Styled Components', 'CSS', 'CSS Modules', 'SASS']
    },
    {
      tag: 'state management',
      name: ['Context API', 'Redux']
    },
    {
      tag: 'data',
      name: ['API Rest', 'GraphQL'],
    },
  ]

  const techs3 = [
    {
      tag: 'testing',
      name: ['Jest', 'React Testing Library'],
    },
    {
      tag: 'tooling',
      name: ['ES Lint', 'Husky', 'Prettier'],
    }
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
        <CardTech techs={techs1} />
        <CardTech techs={techs2} />
        <CardTech techs={techs3} />
      </div>

      <motion.h1 
        className={styles.backgroundText}
        variants={backgrountTextVariants}
        initial='initial'
        animate={inView && 'animate'}
      >
        what i know
      </motion.h1>
    </motion.div>
  )
}

export default Technologies