import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles, listContentFiles, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolder } from '@fortawesome/free-regular-svg-icons'

const COUNT_PER_PAGE = 5

interface IndexProps extends Props {
  posts: PostContent[]
}

const Home: NextPage<IndexProps> = ({ posts }) => {
  const title = posts[0].category.charAt(0).toUpperCase() + posts[0].category.slice(1)
  return (
    <Layout title={title}>
      <h1>{title}</h1>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => readContentFile({ filename: filename })).map(post => ({
    params: {
      query: post.category
    }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await readContentFiles(params?.category)

  return {
    props: {
      posts: posts.slice(0, COUNT_PER_PAGE)
    }
  }
}

export default Home
