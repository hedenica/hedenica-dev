import Image from 'next/image'
import Link from 'next/link'
import styles from './postCard.module.css'

type PostProps = {
  post: {
    title: string
    imageUrl: string
    href: string
    description: string
    author: {
      name: string
      imageUrl: string
    }
    date: string
  }
}

export const PostCard = ({ post }: PostProps) => {
  return (
    <div className={styles.container}>
      <Link href={post.href} passHref>
        <div className={styles.card}>
          <Image
            className={styles.image}
            src={post.imageUrl}
            width={420}
            height={180}
            alt="post image"
          />
          <div className={styles.content}>
            <h4 className={styles.title}>{post.title}</h4>
            <p className={styles.description}>{post.description}</p>

            <div className={styles.postInfo}>
              <Image
                className={styles.authorImage}
                src={post.author.imageUrl}
                width={40}
                height={40}
                alt="author image"
              />
              <div>
                <h6 className={styles.author}>{post.author.name}</h6>
                <time className={styles.publishedDate}>{post.date}</time>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
