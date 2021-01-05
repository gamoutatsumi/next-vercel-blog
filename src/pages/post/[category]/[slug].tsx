import React from 'react'
import Layout from '@/components/Layout'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import gfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'
import unwrapimages from 'remark-unwrap-images'
import github from 'remark-github'
import { TwitterShareButton, TwitterIcon, PocketShareButton, PocketIcon, HatenaShareButton, HatenaIcon } from 'react-share'
import Isso from '@/components/Isso'
import { listContentFiles, PostContent, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import CodeBlock from '@/components/CodeBlock'

const slugger = new GithubSlugger()

type Props = InferGetStaticPropsType<typeof getStaticProps>

interface PostProps extends PostContent {
  url: string
}

interface ListProps extends Props {
  ordered: boolean
}

interface HeadProps extends Props {
  level?: number
  children: JSX.Element[]
}

interface InlineCodeProps {
  children: JSX.Element[]
}

interface LinkProps {
  children: JSX.Element[]
  href: string
}

const Link: React.FC<LinkProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }

  return React.createElement(
    'a',
    {
      className: 'hover:underline cursor-pointer',
      href: props.href
    },
    props.children
  )
}

const InlineCode: React.FC<InlineCodeProps> = (props) => {
  if (props.children == null || props.children === undefined) {
    return React.createElement('')
  }

  return React.createElement(
    'code',
    {
      style: { backgroundColor: 'rgba(27,31,35,0.05)', padding: '0.2em 0.4em', borderRadius: '6px' }
    },
    props.children
  )
}

const Heading: React.FC<HeadProps> = (props) => {
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
      className: 'mx-2 my-1 text-sm md:text-base'
    },
    props.children
  )
}

const List: React.FC<ListProps> = (props) => {
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

const Post: NextPage<PostProps> = ({ title, content, published, image, keyword, url }) => {
  const shareTitle = (process.env.SITE_TITLE !== undefined) ? title + ' | ' + process.env.SITE_TITLE : title

  return (
    <Layout
      title={title}
      isArticle={true}
      keyword={keyword}
      image={image}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <article>
        <h1>{title}</h1>
        <ReactMarkdown
          allowDangerousHtml
          plugins={
            [
              [github, { repository: process.env.REPO_URL }],
              unwrapimages,
              gfm,
              [toc, { heading: '目次' }]
            ]
          }
          renderers={{
            inlineCode: InlineCode,
            code: CodeBlock,
            heading: Heading,
            paragraph: Paragraph,
            list: List,
            link: Link
          }}
          source={content} />
      </article>
      <div className='flex justify-end'>
        <TwitterShareButton
          className='mr-2'
          url={url}
          title={shareTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <PocketShareButton
          className='mr-2'
          url={url}
          title={shareTitle}>
          <PocketIcon size={32} round />
        </PocketShareButton>
        <HatenaShareButton url={url} title={shareTitle}>
          <HatenaIcon size={32} round />
        </HatenaShareButton>
      </div>
      <Isso />
    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const url = [process.env.BASE_URL, 'post', params?.category, params?.slug].join('/')
  const content = readContentFile({ category: params?.category, slug: params?.slug })

  return {
    props: {
      url: url,
      ...content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => readContentFile({ filename: filename })).map(post => ({
    params: {
      category: post.category,
      slug: post.slug
    }
  }))

  return { paths: paths, fallback: false }
}

export default Post
