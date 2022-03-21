import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'
import { ReactIcon } from '../icons'

import styles from './card.module.css'

type CardTechTypes = {
  techs: { tag: string; name: string[]}[]
  
}

export const CardTech = ({ techs }: CardTechTypes) => {
  const carousel = useRef<HTMLDivElement>(null)
  const innerCarousel = useRef<HTMLDivElement>(null)
  const itemCarousel = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0);
  // const [isCardActive, setIsCardActive] = useState(true)

  useEffect(() => {
    if (carousel.current) {
      setHeight(
        carousel.current.scrollHeight
        - carousel?.current?.offsetHeight
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
        ref={innerCarousel}
        drag="y"
        dragConstraints={{ bottom: 0, top: -height }}
        className={styles.inner}
      >
        {techs.map(tech => (
          tech.name.map((techName) => (
            <motion.div
              ref={itemCarousel}
              key={techName}
              className={styles.item}
              data-card-active={true}
            >
            <ReactIcon size="100" className={styles.icon} />
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