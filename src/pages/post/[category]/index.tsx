import React from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { PostContent, readContentFiles, listContentFiles, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

interface Props {
  posts: PostContent[]
}

const Home: NextPage<Props> = ({ posts }) => {
  const title = posts[0].category.charAt(0).toUpperCase() + posts[0].category.slice(1)

  return (
    <Layout title={title} isArticle={false}>
      <article>
        <h1>{title}</h1>
        {posts.map((post) => <div
          key={post.slug}
          className="p-2 m-3 border post-teaser"
        >
          <div className="my-1">
            <h2>
              <Link
                href="/post/[category]/[id]"
                as={`/post/${post.category}/${post.slug}`}>
                <a className="hover:underline">{post.title}</a>
              </Link>
            </h2>
          </div>
          <div className="flex justify-end text-right">
            <div className="mr-2">
              <FAIcon className="mr-1 fa-fw" icon={['far', 'calendar']} />
              <span>{post.published}</span>
            </div>
            <div>
              <Link href="/post/[category]" as={`/post/${post.category}`}>
                <a>
                  <FAIcon className="mr-1 fa-fw" icon={['far', 'folder']} />
                  <span className="inline-block w-10 text-left hover:underline">{post.category}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>)}
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => readContentFile({ filename: filename })).map(post => ({
    params: {
      category: post.category
    }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await readContentFiles(params?.category)

  return {
    props: {
      posts: posts
    }
  }
}

export default Home
