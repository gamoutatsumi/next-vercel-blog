import path from 'path'
import matter from 'gray-matter'
import formatDate from '@/lib/date'
import fs from 'fs'

const DIR = path.join(process.cwd(), 'content')
const EXTENSION = '.md'

const listContentFiles = (dir?: string): string[] => {
  if (dir === undefined) dir = path.join(DIR, 'posts')
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const dirs: string[] = []
  let files: string[] = []
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
    if (dirent.isFile()) files.push(`${dir}/${dirent.name}`)
  }
  for (const d of dirs) {
    files = files.concat(listContentFiles(d))
  }
  return files.filter((filename: string) => path.parse(filename).ext === EXTENSION)
}

const readContentFile = ({ category, slug, filename, isPost }: { category?: string | string[], slug?: string | string[], filename?: string, isPost?: boolean }): PostContent => {
  if (isPost === undefined) isPost = true
  if (slug === undefined) {
    if (filename !== undefined) {
      slug = path.parse(filename).name
    } else {
      throw new TypeError()
    }
  } else if (slug instanceof Array) {
    slug = slug.join()
  }
  if (category instanceof Array) {
    category = category.join()
  }
  if (category === undefined || category === '') {
    if (isPost) {
      category = path.join(path.relative(path.join(DIR, 'posts'), path.dirname(filename ?? slug)))
    } else {
      category = ''
    }
  }
  let raw = ''
  if (isPost) {
    raw = fs.readFileSync(path.join(path.join(DIR, 'posts'), category, `${slug}${EXTENSION}`), 'utf8')
  } else {
    raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  }
  const matterResult = matter(raw)

  const image = matterResult.data.image ?? null

  const keyword = matterResult.data.keyword ?? null

  const { title, date: rawPublished } = matterResult.data

  const content = matterResult.content

  return {
    title,
    published: formatDate(rawPublished),
    content,
    slug,
    category,
    image,
    keyword
  }
}

const readContentFiles = async (category: string | string[] | undefined = ''): Promise<PostContent[]> => {
  if (category instanceof Array) category = category.join('/')
  const promisses = listContentFiles([path.join(DIR, 'posts'), category].join('/')).map((filename) => readContentFile({ filename: filename }))
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
  category: string
  image: string | null
  keyword: string | null
}

export { listContentFiles, readContentFile, readContentFiles }
