import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles } from '@/lib/content-loader'
import { GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolder } from '@fortawesome/free-regular-svg-icons'

interface IndexProps extends Props {
  posts: PostContent[]
  totalPage: number
  pageCount: number
}

const COUNT_PER_PAGE = 10

const Home: NextPage<IndexProps> = (props) => {
  const { posts } = props
  return (
    <Layout title="Posts">
      <h1>Posts</h1>
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser border m-3 p-2"
      >
        <div className="my-1">
          <h2><Link href="/post/[category]/[id]" as={`/post/${post.category}/${post.slug}`}><a className="hover:underline">{post.title}</a></Link></h2>
        </div>
        <div className="text-right">
          <span className="mr-2">
            <FontAwesomeIcon className="mr-1" icon={faCalendar} />
            {post.published}
          </span>
          <span>
            <Link href="/post/[category]" as={`/post/${post.category}`}>
              <a className="hover:underline">
                <FontAwesomeIcon className="mr-1" icon={faFolder} />
                {post.category}
              </a>
            </Link>
          </span>
        </div>
      </div>)}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await readContentFiles()
  return {
    props: {
      posts: posts.slice(0, COUNT_PER_PAGE),
      pageCount: posts.length,
      totalPage: COUNT_PER_PAGE
    }
  }
}

export default Home
