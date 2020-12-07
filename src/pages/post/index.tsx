import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles } from '@/lib/content-loader'
import { GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IndexProps extends Props {
  posts: PostContent[]
  totalPage: number
  pageCount: number
}

const Home: NextPage<IndexProps> = (props) => {
  const { posts } = props

  return (
    <Layout title="Posts" isArticle={false}>
      <h1>Posts</h1>
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser border m-3 p-2"
      >
        <div className="my-1">
          <h2>
            <Link
              href="/post/[category]/[id]"
              as={`/post/${post.category}/${post.slug}`}><a className="hover:underline">{post.title}</a>
            </Link>
          </h2>
        </div>
        <div className="text-right flex justify-end">
          <div className="mr-2">
            <FontAwesomeIcon
              className="mr-1"
              fixedWidth
              size='sm'
              icon={['far', 'calendar']} />
            <span>{post.published}</span>
          </div>
          <div>
            <Link
              href="/post/[category]"
              as={`/post/${post.category}`}>
              <a>
                <FontAwesomeIcon
                  className="mr-1"
                  fixedWidth size='sm'
                  icon={['far', 'folder']} />
                <span className="hover:underline inline-block w-10 text-left">{post.category}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>)}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await readContentFiles()

  return {
    props: {
      posts: posts,
      pageCount: posts.length
    }
  }
}

export default Home
