import { useInView } from 'react-hook-inview';
import { CardProject } from '../../components/cardProject';
import { motion } from 'framer-motion';

import styles from './projects.module.css';

function Projects() {
  const [ref, inView] = useInView()

  const sasProjects = [
    {
      id: 1,
      name: 'Classroom',
      description: 'enables teachers and students to interact with each other through chat and video they can also upload and download files with unlimited sizes.',
      isOpen: false,
      responsibilities: [
        { 
          id: 'item-1',
          item: '◉ Decide with the team the best architecture for the project'
        },
        { 
          id: 'item-2',
          item: '◉ Bring UI designs to life as realistically as possible'
        },
        { 
          id: 'item-3',
          item: '◉ I started the testing culture into the company'
        },
        { 
          id: 'item-4',
          item: '◉ Worked with micro-frontends'
        },
      ]
    },
    {
      id: 2,
      name: 'Lesson Plan',
      description: `This project aimed to make the teacher's life easier, making it possible to plan materials online, for different classes.`,
      isOpen: false,
      responsibilities: [
        { 
          id: 'item-1',
          item: '◉ Decide with the team the best architecture for the project'
        },
        { 
          id: 'item-2',
          item: '◉ Bring UI designs to life as realistically as possible'
        },
        { 
          id: 'item-3',
          item: '◉ I started the testing culture into the company'
        },
        { 
          id: 'item-4',
          item: '◉ Worked with micro-frontends'
        },
      ]
    },
    {
      id: 3,
      name: 'SAS Adapt',
      description: 'This project aimed to make teaching more flexible, the teacher had the autonomy to change the entire content according to the rhythm of the class.',
      isOpen: false,
      responsibilities: [
        { 
          id: 'item-1',
          item: '◉ Decide with the team the best architecture for the project'
        },
        { 
          id: 'item-2',
          item: '◉ Bring UI designs to life as realistically as possible'
        },
        { 
          id: 'item-3',
          item: '◉ I started the testing culture into the company'
        },
        { 
          id: 'item-4',
          item: '◉ Worked with micro-frontends'
        },
      ]
    },
  ]

  const zeProjects = [
    {
      id: 1,
      name: 'Zé Delivery App',
      description: `a delivery app, my squad is responsible for the development 
        of member get member features, acting as a growth assset, bringing new users to the platform.
        We offer a discount cupom to current users that invite people to the app.
        `,
      isOpen: false,
      responsibilities: [
        { 
          id: 'item-1',
          item: '◉ To choose wether or not to use libraries to help us develop features through MVPs or POC'
        },
        { 
          id: 'item-2',
          item: '◉ Bring UI designs to life as realistically as possible'
        },
        { 
          id: 'item-3',
          item: '◉ Implement events to track users interactions within the application (web and mobile app).'
        },
        { 
          id: 'item-4',
          item: '◉ Testing our features through unit tests, also am responsible for deploying our features'
        },
        { 
          id: 'item-5',
          item: '◉ Actively engaged in the Frontend Chapter'
        },
      ]
    },
  ]

  const projectVariants = {
    initial: { 
      opacity: 1,
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
      className={styles.projects}
      variants={projectVariants}
      initial='initial'
      animate={inView && 'animate'}
    >
      <h1 ref={ref} className={styles.title}>
        <span className="highlight">Professional</span> projects
      </h1>
        <h3 className={styles.company}>
          <a href="https://www.ze.delivery" target="_blank" rel="noreferrer">
            Zé Delivery | Anheuser-Busch InBev
          </a>
        </h3>
        <span className={styles.time}>September, 2021 | Present </span>
          <p className={styles.description}>
            Zé Delivery is the largest bevarage delivery app in the world,
            with over 44 billion orders in 2021.
          </p>
          <div className={styles.zeCardContainer}>
          <CardProject inView={inView} projects={zeProjects} className={styles.zeCard} />
        </div>
        <h3 ref={ref} className={styles.company}>
          <a href="https://saseducacao.com.br/" target="_blank" rel="noreferrer">
            SAS Plataforma de Educação
          </a>
        </h3>
        <span className={styles.time}>April, 2020 | September, 2021 </span>
        <p className={styles.description}>
          This company provides integrated solutions to private schools all over Brazil.
          During my time there I actively worked on 3 main projects.
        </p>
        <div className={styles.zeCardContainer}>
          <CardProject inView={inView} projects={sasProjects} className={styles.sasCard} />
        </div>
        <motion.h1
          className={styles.backgroundText}
          variants={backgrountTextVariants}
          initial='initial'
          animate={inView && 'animate'}
        >
        what i&apos;ve done
      </motion.h1>
    </motion.div>
  )
}

export default Projects