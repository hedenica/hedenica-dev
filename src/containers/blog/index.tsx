import { GetStaticProps } from 'next'
import { PostDocument, usePostsQuery } from '../../generated/graphql'

import { client } from '../../lib/apollo'
import { useRouter } from 'next/router'
import { PostCard } from '../../components/postCard'
import { Button } from '../../components/button'
import styles from './blog.module.css'

function Blog() {
  const router = useRouter()
  const { data: { posts } = {} } = usePostsQuery()

  const latestPosts = posts?.filter(
    (_, index, arr) => index > arr.length - 4 - 1
  )

  const handleRedirectToBlog = () => {
    router.push('/blog')
  }

  return latestPosts && latestPosts?.length > 0 ? (
    <div className={styles.blog}>
      <h1 className={styles.title}>
        <span className="highlight">Check</span> out my blog
      </h1>
      <h3 className={styles.latestPosts}>... and its latest posts</h3>
      <div className={styles.posts}>
        {latestPosts.map((post) => (
          <PostCard
            key={post.slug}
            post={{
              title: post.title,
              imageUrl: post.coverImage?.url ?? '',
              href: `blog/${post.slug}`,
              description: post?.excerpt ?? '',
              author: {
                name: post.author?.name ?? '',
                imageUrl: post.author?.picture?.url ?? '',
              },
              date: new Date(post.publishedAt).toDateString(),
            }}
          />
        ))}
      </div>
      <Button title="All posts" onClick={handleRedirectToBlog} />
    </div>
  ) : null
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  await client.query({
    query: PostDocument,
  })

  return {
    props: {
      apolloState: client.extract(),
    },
  }
}
