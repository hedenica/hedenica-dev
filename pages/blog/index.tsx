import { usePostsQuery } from "../../src/generated/graphql";
import { PostCard } from "../../src/components/postCard";

import styles from './posts.module.css'

export default function Blog() {
  const { data: { posts } = {} } = usePostsQuery();

  return (
    <div className={styles.posts}>
      {posts?.map((post) => (
        <PostCard key={post.slug} post={{
          title: post.title,
          imageUrl: post.coverImage?.url,
          href: `blog/${post.slug}`,
          description: post.excerpt,
          author:{
            name: post.author?.name,
            imageUrl:  post.author?.picture?.url,
          },
          date: new Date(post.publishedAt).toDateString(),
        }} />
      ))}
    </div>
  )
}
