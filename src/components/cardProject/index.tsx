import { useState } from 'react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import styles from './card.module.css'

type Responsibilities = {
  id: string
  item: string
}

type Projects = {
  id: number
  name: string
  description: string
  isOpen: boolean
  responsibilities: Responsibilities[]
}

type CardTypes = {
  projects: Projects[]
  inView: boolean
  className?: string
}

export const CardProject = ({ projects, inView, className }: CardTypes) => {
  const [cards, setCards] = useState(projects)

  const handleExpandCard = (id: number) => {
    const updatedList = cards.map((card) =>
      card.id === id ? { ...card, isOpen: !card.isOpen } : card
    )

    setCards(updatedList)
  }

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  const numberVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <AnimateSharedLayout>
      {cards.map((card) => (
        <motion.div
          className={`${styles.container} ${
            card.isOpen && styles.overlay
          } ${className}`}
          data-card={card.isOpen}
          onClick={() => handleExpandCard(card.id)}
          variants={cardVariants}
          initial="initial"
          animate={inView && 'animate'}
          exit="exit"
          whileHover={!card.isOpen ? { scale: 1.1 } : {}}
          key={card.id}
          layoutId={card.name}
          layout
        >
          <motion.h1 className={styles.number} variants={numberVariants}>
            {card.id}
          </motion.h1>
          <h1 className={styles.name}>{card.name}</h1>
          <p className={styles.description}>{card.description}</p>
          <AnimatePresence>
            {card.isOpen && (
              <motion.div>
                <h3 className={styles.responsibilities}>responsibilities</h3>
                <ul>
                  {card.responsibilities.map((responsability) => (
                    <li key={responsability.id} className={styles.item}>
                      {responsability.item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </AnimateSharedLayout>
  )
}
