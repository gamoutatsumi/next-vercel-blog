import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles } from '@/lib/content-loader'
import { GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolder } from '@fortawesome/free-regular-svg-icons'

interface IndexProps extends Props {
  posts: PostContent[]
}

const Home: NextPage<IndexProps> = ({ posts }) => {
  return (
    <Layout title="Posts">
      <h1>Posts</h1>
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser"
      >
        <h2><Link href="/post/[category]/[id]" as={`/post/${post.category}/${post.slug}`}><a className="hover:underline">{post.title}</a></Link></h2>
        <div>
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
  const MAX_COUNT = 10
  const posts = await readContentFiles()

  return {
    props: {
      posts: posts.slice(0, MAX_COUNT)
    }
  }
}

export default Home
