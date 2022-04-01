import Image from 'next/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import { PostDocument, usePostQuery } from '../../src/generated/graphql'
import { client } from '../../src/lib/apollo'

import styles from './blog.module.css'

interface PostParams {
  slug: string
}

export default function Post({ slug }: PostParams) {
  const { data: { post } = {} } = usePostQuery({
    variables: { slug },
  })

  return (
    post && (
      <div>
        <div className={styles.postImage}>
          {post.coverImage?.url && (
            <Image
              src={post.coverImage.url}
              objectFit="cover"
              alt="post image"
              layout="fill"
            />
          )}
        </div>
        <div className="px-9 pt-16 md:w-4/5 m-auto lg:px-8 lg:w-[700px]">
          <h1 className="highlight block text-3xl text-center leading-8 font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div
            className="mt-6 prose-lg mx-auto mb-10"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </div>
      </div>
    )
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await client.query({
    query: PostDocument,
    variables: {
      slug: params?.slug,
    },
  })

  return {
    props: {
      apolloState: client.extract(),
      slug: params?.slug,
    },
  }
}
