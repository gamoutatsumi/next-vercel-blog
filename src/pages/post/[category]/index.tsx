import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles, listContentFiles, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IndexProps extends Props {
  posts: PostContent[]
}

const Home: NextPage<IndexProps> = ({ posts }) => {
  const title = posts[0].category.charAt(0).toUpperCase() + posts[0].category.slice(1)
  return (
    <Layout title={title} isArticle={false}>
      <h1>{title}</h1>
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser border m-3 p-2"
      >
        <div className="my-1">
          <h2><Link href="/post/[category]/[id]" as={`/post/${post.category}/${post.slug}`}><a className="hover:underline">{post.title}</a></Link></h2>
        </div>
        <div className="text-right flex justify-end">
          <div className="mr-2">
            <FontAwesomeIcon className="fa-fw mr-1" icon={['far', 'calendar']} />
            <span>{post.published}</span>
          </div>
          <div>
            <Link href="/post/[category]" as={`/post/${post.category}`}>
              <a>
                <FontAwesomeIcon className="fa-fw mr-1" icon={['far', 'folder']} />
                <span className="hover:underline inline-block w-10 text-left">{post.category}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>)}
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
