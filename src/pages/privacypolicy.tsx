import React from 'react'
import Layout from '@/components/Layout'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import gfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'
import { PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import CodeBlock from '@/components/CodeBlock'

const slugger = new GithubSlugger()

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {
  level: number
  children: JSX.Element[]
  ordered: boolean
}

const Heading: React.FC<Props> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }

  if (props.level === undefined) {
    return React.createElement('')
  }

  if (props.level === 2) {
    return React.createElement(
      `h${props.level}`,
      {
        id: slugger.slug(props.children[0].props.children),
        className: 'my-2 border-b-2'
      },
      props.children
    )
  }

  return React.createElement(
    `h${props.level}`,
    {
      id: slugger.slug(props.children[0].props.children),
      className: 'my-2'
    },
    props.children
  )
}

const Paragraph: React.FC<Props> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }

  return React.createElement(
    'p',
    {
      className: 'mx-2 my-1'
    },
    props.children
  )
}

const List: React.FC<Props> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }

  if (props.ordered) {
    return React.createElement(
      'ol',
      {
        className: 'mx-2 my-1 pl-6 list-decimal'
      },
      props.children
    )
  } else {
    return React.createElement(
      'ul',
      {
        className: 'mx-4 my-1 pl-6 list-disc'
      },
      props.children
    )
  }
}

const Post: NextPage<PostContent> = ({ title, content, published, image, keyword }) => {
  return (
    <Layout title={title} isArticle={true} keyword={keyword} image={image}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <article>
        <h1>{title}</h1>
        <ReactMarkdown
          plugins={[[gfm], [toc, { heading: '目次' }]]}
          renderers={{ code: CodeBlock, heading: Heading, paragraph: Paragraph, list: List }}
          source={content} />
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = readContentFile({ slug: 'privacypolicy', isPost: false })
  return {
    props: {
      ...content
    }
  }
}

export default Post
