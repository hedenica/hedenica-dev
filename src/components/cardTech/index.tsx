import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { ReactIcon } from '../icons'

import styles from './card.module.css'

type CardTechProps = {
  techs: {
    tag: string
    tech: {
      id: number
      name: string
    }[]
  }[]
}

export const CardTech = ({ techs }: CardTechProps) => {
  const carousel = useRef<HTMLDivElement>(null)
  const innerCarousel = useRef<HTMLDivElement>(null)
  const itemCarousel = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [cardActiveIndex, setCardActiveIndex] = useState(1)

  useEffect(() => {
    if (carousel.current) {
      setHeight(carousel.current.scrollHeight - carousel?.current?.offsetHeight)
    }
  }, [])

  const y = useMotionValue(0)

  const DISTANE_HEIGHT_OFFSET = 130

  useEffect(() => {
    y.onChange(() => {
      const activeIndex =
        parseInt(String((y.get() / DISTANE_HEIGHT_OFFSET) * -1), 10) + 1

      setCardActiveIndex(activeIndex)
    })
  }, [y])

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
        style={{ y }}
      >
        {techs.map((item) =>
          item.tech.map(({ id, name }) => (
            <motion.div
              ref={itemCarousel}
              key={id}
              className={styles.item}
              data-card-active={cardActiveIndex === id}
            >
              <ReactIcon size="100" className={styles.icon} />
              <h4 className={styles.techName}>{name}</h4>

              <div className={styles.tagContainer}>
                <p className={styles.tag}>{item.tag}</p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}
