import { renderToHtml, getHighlighter, IThemedToken } from 'shiki'

import { PostContentType } from '@/lib/notion'
import config from '@/siteconfig.json'

import {
  BookmarkBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  CodeBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ImageBlockObjectResponse,
  MentionRichTextItemResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import Image from 'next/image'

type ReactChildren = {
  children?: React.ReactNode
}

const RichText = ({
  richText,
}: {
  richText: TextRichTextItemResponse | MentionRichTextItemResponse
} & ReactChildren) => {
  if (richText.type === 'text') {
    if (richText.href !== null) {
      return (
        <a href={richText.href} target="_blank" rel="noreferrer">
          <RichText
            richText={{
              ...richText,
              href: null,
            }}
          />
        </a>
      )
    }

    if (richText.annotations.bold) {
      return (
        <b>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                bold: false,
              },
            }}
          />
        </b>
      )
    }
    if (richText.annotations.italic) {
      return (
        <i>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                italic: false,
              },
            }}
          />
        </i>
      )
    }
    if (richText.annotations.strikethrough) {
      return (
        <s>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                strikethrough: false,
              },
            }}
          />
        </s>
      )
    }
    if (richText.annotations.underline) {
      return (
        <u>
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                underline: false,
              },
            }}
          />
        </u>
      )
    }
    if (richText.annotations.code) {
      return (
        <code className="rounded-md py-1 px-2 bg-gray-100 dark:bg-gray-800">
          <RichText
            richText={{
              ...richText,
              annotations: {
                ...richText.annotations,
                code: false,
              },
            }}
          />
        </code>
      )
    }
    return <>{richText.plain_text}</>
  }

  if (richText.type === 'mention') {
    if (richText.href !== null) {
      return (
        <a href={richText.href} target="_blank" rel="noreferrer">
          <RichText
            richText={{
              ...richText,
              href: null,
            }}
          />
        </a>
      )
    }
  }

  return <>{richText.plain_text}</>
}

const RichTextGroup = ({
  richTexts,
}: {
  richTexts: RichTextItemResponse[]
} & ReactChildren) => {
  return (
    <>
      {richTexts
        .filter((i) => i.type === 'text' || i.type === 'mention')
        .map((i) => (
          <RichText
            key={i.plain_text}
            richText={i as TextRichTextItemResponse}
          />
        ))}
    </>
  )
}

const PBlock = ({
  block,
}: { block: ParagraphBlockObjectResponse } & ReactChildren) => {
  // TODO: handle children
  return (
    <p className="leading-7">
      <RichTextGroup richTexts={block.paragraph.rich_text} />
    </p>
  )
}

const H1Block = ({
  block,
}: { block: Heading1BlockObjectResponse } & ReactChildren) => {
  return (
    <h1 className="text-3xl my-3">
      <RichTextGroup richTexts={block.heading_1.rich_text} />
    </h1>
  )
}

const H2Block = ({
  block,
}: { block: Heading2BlockObjectResponse } & ReactChildren) => {
  return (
    <h2 className="text-2xl my-2">
      <RichTextGroup richTexts={block.heading_2.rich_text} />
    </h2>
  )
}

const H3Block = ({
  block,
}: { block: Heading3BlockObjectResponse } & ReactChildren) => {
  return (
    <h3 className="text-xl my-1">
      <RichTextGroup richTexts={block.heading_3.rich_text} />
    </h3>
  )
}

const CalloutBlock = ({
  block,
}: { block: CalloutBlockObjectResponse } & ReactChildren) => {
  return (
    <blockquote className="pl-4 border-l-4 border-gray-300">
      <RichTextGroup richTexts={block.callout.rich_text} />
    </blockquote>
  )
}

const BulletedListBlock = ({
  block,
  children,
}: {
  block: BulletedListItemBlockObjectResponse
} & ReactChildren) => {
  return (
    <li className="my-2">
      <RichTextGroup richTexts={block.bulleted_list_item.rich_text} />
      {children}
    </li>
  )
}

const NumberedListBlock = ({
  block,
  children,
}: {
  block: NumberedListItemBlockObjectResponse
} & ReactChildren) => {
  return (
    <li className="my-2">
      <RichTextGroup richTexts={block.numbered_list_item.rich_text} />
      {children}
    </li>
  )
}

const CodeBlock = async ({
  block,
}: { block: CodeBlockObjectResponse } & ReactChildren) => {
  const lightCodeTheme = config.codeTheme.light
  const darkCodeTheme = config.codeTheme.dark
  const highlighter = await getHighlighter({
    themes: [lightCodeTheme, darkCodeTheme],
  })
  const code = (block.code.rich_text as TextRichTextItemResponse[])
    .map((i) => i.plain_text)
    .join('')
  const lightTokens = highlighter.codeToThemedTokens(
    code,
    block.code.language,
    lightCodeTheme,
  )
  const darkTokens = highlighter.codeToThemedTokens(
    code,
    block.code.language,
    darkCodeTheme,
  )

  const customRenderToHtml = (tokens: IThemedToken[][], themeName: string) => {
    return renderToHtml(tokens, {
      fg: highlighter.getForegroundColor(themeName),
      bg: highlighter.getBackgroundColor(themeName),
      elements: {
        pre({ style, children }) {
          return `<pre class="p-4 rounded-md my-2 overflow-y-auto sm:overflow-y-visible" style="${style}">${children}</pre>`
        },

        code({ children }) {
          return `<code class="sm:whitespace-pre-wrap sm:break-all">${children}</code>`
        },

        line({ className, children }) {
          return `<span class="${className}">${children}</span>`
        },

        token({ style, children }) {
          return `<span style="${style}">${children}</span>`
        },
      },
    })
  }

  const lightHighlightedCode = customRenderToHtml(lightTokens, lightCodeTheme)
  const darkHighlightedCode = customRenderToHtml(darkTokens, darkCodeTheme)

  return (
    <>
      <div
        className="dark:hidden "
        dangerouslySetInnerHTML={{
          __html: lightHighlightedCode,
        }}></div>
      <div
        className="hidden dark:block"
        dangerouslySetInnerHTML={{
          __html: darkHighlightedCode,
        }}></div>
    </>
  )
}

const ImageBlock = ({
  block,
}: { block: ImageBlockObjectResponse } & ReactChildren) => {
  if (block.image.type === 'external') {
    return (
      <Image
        className="rounded-[3px] sm:rounded-[6px]"
        src={block.image.external.url}
        alt={
          block.image.caption.length !== 0
            ? block.image.caption.map((i) => i.plain_text).join('')
            : ''
        }
        width={1000}
        height={100}
      />
    )
  }
  if (block.image.type === 'file') {
    return (
      <Image
        className="rounded-[3px] sm:rounded-[6px]"
        src={block.image.file.url}
        alt={
          block.image.caption.length !== 0
            ? block.image.caption.map((i) => i.plain_text).join('')
            : ''
        }
        width={1000}
        height={100}
      />
    )
  }
  return null
}

const BookmarkBlock = ({
  block,
}: { block: BookmarkBlockObjectResponse } & ReactChildren) => {
  return (
    <p>
      <a
        href={block.bookmark.url}
        target="_blank"
        rel="noreferrer"
        className="block ">
        {block.bookmark.caption.length !== 0 ? (
          <RichTextGroup richTexts={block.bookmark.caption} />
        ) : (
          block.bookmark.url
        )}
      </a>
    </p>
  )
}

const RenderBlock = ({ block }: { block: PostContentType[number] }) => {
  switch (block.cur.type) {
    case 'paragraph':
      return <PBlock block={block.cur} />
    case 'heading_1':
      return <H1Block block={block.cur} />
    case 'heading_2':
      return <H2Block block={block.cur} />
    case 'heading_3':
      return <H3Block block={block.cur} />
    case 'callout':
      return <CalloutBlock block={block.cur} />
    case 'bulleted_list_item':
      return (
        <BulletedListBlock block={block.cur}>
          {block.children?.some(
            (child) => child.cur.type === 'bulleted_list_item',
          ) ? (
            <ul>
              {block.children?.map((child) => (
                <RenderBlock block={child} key={child.cur.id} />
              ))}
            </ul>
          ) : (
            block.children?.map((child) => (
              <RenderBlock block={child} key={child.cur.id} />
            ))
          )}
        </BulletedListBlock>
      )
    case 'numbered_list_item':
      return (
        <NumberedListBlock block={block.cur}>
          {block.children?.some(
            (child) => child.cur.type === 'numbered_list_item',
          ) ? (
            <ol>
              {block.children?.map((child) => (
                <RenderBlock block={child} key={child.cur.id} />
              ))}
            </ol>
          ) : (
            block.children?.map((child) => (
              <RenderBlock block={child} key={child.cur.id} />
            ))
          )}
        </NumberedListBlock>
      )
    case 'code':
      // @ts-expect-error Server Component
      return <CodeBlock block={block.cur} />
    case 'image':
      return <ImageBlock block={block.cur} />
    case 'bookmark':
      return <BookmarkBlock block={block.cur} />
    default:
      return null
  }
}

export default async function PostContent({
  blocks,
}: {
  blocks: PostContentType
}) {
  if (blocks.length === 0) {
    return <div>Post Content Not found</div>
  }
  return (
    <article className="flex flex-col gap-3 w-full max-w-[65ch]">
      {blocks
        .map((block) => {
          return <RenderBlock block={block} key={block.cur.id} />
        })
        .reduce((prev, curr) => {
          if (curr === null) {
            return prev
          }

          if (prev.length === 0) {
            return [[curr]]
          }
          const last = prev[prev.length - 1]
          const lastBlock = last[last.length - 1]
          if (
            (isJsxElementABulletedList(lastBlock) &&
              isJsxElementABulletedList(curr)) ||
            (isJsxElementANumberedList(lastBlock) &&
              isJsxElementANumberedList(curr))
          ) {
            return [...prev.slice(0, prev.length - 1), [...last, curr]]
          }
          return [...prev, [curr]]
        }, [] as JSX.Element[][])
        .map((blocks, i) => {
          if (blocks.length === 1) {
            return blocks[0]
          }
          const block = blocks[0]
          if (isJsxElementABulletedList(block)) {
            return <ul key={i}>{blocks}</ul>
          }
          if (isJsxElementANumberedList(block)) {
            return <ol key={i}>{blocks}</ol>
          }
          return null
        })}
    </article>
  )
}

function isJsxElementABulletedList(element: JSX.Element) {
  return element.props.block.cur.type === 'bulleted_list_item'
}

function isJsxElementANumberedList(element: JSX.Element) {
  return element.props.block.cur.type === 'numbered_list_item'
}
