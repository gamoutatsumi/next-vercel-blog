import remark from 'remark'
import remark2react from 'remark-react'
import path from 'path'
import matter from 'gray-matter'
import formatDate from '@/lib/date'
import fs from 'fs'

const DIR = path.join(process.cwd(), 'content/posts')
const EXTENSION = '.md'

const listContentFiles = (): string[] => {
  const filenames = fs.readdirSync(DIR)
  return filenames.filter((filename: string) => path.parse(filename).ext === EXTENSION)
}

const readContentFile = (slug?: string, filename?: string): PostContent => {
  const processor = remark().use(remark2react)
  if (slug === undefined) {
    if (filename !== undefined) {
      slug = path.parse(filename).name
    } else {
      throw new TypeError()
    }
  }
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)

  const { title, date: rawPublished } = matterResult.data

  const parsedContent = processor.processSync(matterResult.content)
  const content = parsedContent.toString()

  return {
    title,
    published: formatDate(rawPublished),
    content,
    slug
  }
}

const readContentFiles = async (): Promise<PostContent[]> => {
  const promisses = listContentFiles().map((filename) => readContentFile(filename))
  const contents = await Promise.all(promisses)
  return contents.sort(sortWithProp('published', true))
}

const sortWithProp = (name: string, reversed: boolean) => (a: PostContent, b: PostContent) => {
  if (reversed) {
    return a[name] < b[name] ? 1 : -1
  } else {
    return a[name] < b[name] ? -1 : 1
  }
}

export interface PostContent {
  title: string
  published: string
  content: string
  slug: string
}

export { listContentFiles, readContentFile, readContentFiles }
