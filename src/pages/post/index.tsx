import React from 'react'
import Link from 'next/link'
import Layout, { Props } from '@/components/Layout'
import { PostContent, readContentFiles } from '@/lib/content-loader'
import { GetStaticProps, NextPage } from 'next'

interface IndexProps extends Props {
  posts: PostContent[]
}

const Home: NextPage<IndexProps> = ({ posts }) => {
  return (
    <Layout title="">
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser"
      >
        <h2><Link href="/post/[category]/[id]" as={`/post/${post.category}/${post.slug}`}><a>{post.title}</a></Link></h2>
        <div><span>{post.published}</span></div>
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
