import React from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { PostContent, readContentFiles } from '@/lib/content-loader'
import { GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

interface Props {
  posts: PostContent[]
  totalPage: number
  pageCount: number
}

const Home: NextPage<Props> = (props) => {
  const { posts } = props

  return (
    <Layout title="Posts" isArticle={false}>
      <article>
        <h1>Posts</h1>
        {posts.map((post) => <div
          key={post.slug}
          className="p-2 m-3 border post-teaser"
        >
          <div className="my-1">
            <h2>
              <Link
                href="/post/[category]/[id]"
                as={`/post/${post.category}/${post.slug}`}><a className="hover:underline">{post.title}</a>
              </Link>
            </h2>
          </div>
          <div className="flex justify-end text-right">
            <div className="mr-2">
              <FAIcon
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
                  <FAIcon
                    className="mr-1"
                    fixedWidth size='sm'
                    icon={['far', 'folder']} />
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
