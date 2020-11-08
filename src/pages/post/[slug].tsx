import path from 'path'
import Layout from '@/components/Layout'

import { listContentFiles, readContentFile } from '@/lib/content-loader'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = readContentFile({ slug: params?.slug?.slice(-1)[0] })

  return {
    props: {
      ...content
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = listContentFiles().map((filename) => ({
    params: {
      slug: path.parse(filename).name
    }
  }))

  return { paths, fallback: false }
}
