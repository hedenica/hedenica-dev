import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'
import { ReactIcon } from '../icons'

import styles from './card.module.css'

type CardTechTypes = {
  techs: { tag: string; name: string[]}[]
  
}

export const CardTech = ({ techs }: CardTechTypes) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carousel.current) {
      setWidth(
        carousel?.current?.scrollWidth 
        - carousel?.current?.offsetWidth
      )
    }
  },[])

  return (
    <motion.div 
      ref={carousel} 
      className={styles.carousel}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileDrag={{ scale: 1.1 }}
        className={styles.inner}
      >
        {techs.map(tech => (
          tech.name.map((techName) => (
            <motion.div key={techName} className={styles.item}>
            <ReactIcon size="140" className={styles.icon} />
              <h4 className={styles.techName}>
                {techName}
              </h4>

              <div className={styles.tagContainer}>
                <p className={styles.tag}>
                  {tech.tag}
                </p>
              </div>
            </motion.div>
          ))
        ))}
      </motion.div>
    </motion.div>
  )
}