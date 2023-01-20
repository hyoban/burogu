import shiki from 'shiki'

import { PostContentType } from '@/lib/notion'

import {
  BulletedListItemBlockObjectResponse,
  CodeBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const RichText = ({ richText }: { richText: TextRichTextItemResponse }) => {
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
      <code>
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

const RichTextGroup = ({
  richTexts,
}: {
  richTexts: RichTextItemResponse[]
}) => {
  return (
    <>
      {richTexts
        .filter((i) => i.type === 'text')
        .map((i) => (
          <RichText
            key={i.plain_text}
            richText={i as TextRichTextItemResponse}
          />
        ))}
    </>
  )
}

const PBlock = ({ block }: { block: ParagraphBlockObjectResponse }) => {
  // TODO: handle children
  return (
    <p>
      <RichTextGroup richTexts={block.paragraph.rich_text} />
    </p>
  )
}

const H1Block = ({ block }: { block: Heading1BlockObjectResponse }) => {
  return (
    <h1>
      <RichTextGroup richTexts={block.heading_1.rich_text} />
    </h1>
  )
}

const H2Block = ({ block }: { block: Heading2BlockObjectResponse }) => {
  return (
    <h2>
      <RichTextGroup richTexts={block.heading_2.rich_text} />
    </h2>
  )
}

const H3Block = ({ block }: { block: Heading3BlockObjectResponse }) => {
  return (
    <h3>
      <RichTextGroup richTexts={block.heading_3.rich_text} />
    </h3>
  )
}

const BulletedListBlock = ({
  block,
}: {
  block: BulletedListItemBlockObjectResponse
}) => {
  return (
    <li>
      <RichTextGroup richTexts={block.bulleted_list_item.rich_text} />
    </li>
  )
}

const NumberedListBlock = ({
  block,
}: {
  block: NumberedListItemBlockObjectResponse
}) => {
  return (
    <li>
      <RichTextGroup richTexts={block.numbered_list_item.rich_text} />
    </li>
  )
}

const CodeBlock = async ({ block }: { block: CodeBlockObjectResponse }) => {
  const lightCodeTheme = 'github-light'
  const darkCodeTheme = 'github-dark-dimmed'
  const highlighter = await shiki.getHighlighter({
    themes: [lightCodeTheme, darkCodeTheme],
  })
  const code = (block.code.rich_text as TextRichTextItemResponse[])
    .map((i) => i.plain_text)
    .join('')
  const lightHighlightedCode = highlighter.codeToHtml(
    code,
    block.code.language,
    lightCodeTheme,
  )
  const darkHighlightedCode = highlighter.codeToHtml(
    code,
    block.code.language,
    darkCodeTheme,
  )

  return (
    <div className="shiki-container">
      <div
        className="shiki-light"
        dangerouslySetInnerHTML={{
          __html: lightHighlightedCode,
        }}></div>
      <div
        className="shiki-dark"
        dangerouslySetInnerHTML={{
          __html: darkHighlightedCode,
        }}></div>
    </div>
  )
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
    <>
      {blocks
        .map((block) => {
          switch (block.type) {
            case 'paragraph':
              return <PBlock key={block.id} block={block} />
            case 'heading_1':
              return <H1Block key={block.id} block={block} />
            case 'heading_2':
              return <H2Block key={block.id} block={block} />
            case 'heading_3':
              return <H3Block key={block.id} block={block} />
            case 'bulleted_list_item':
              return <BulletedListBlock key={block.id} block={block} />
            case 'numbered_list_item':
              return <NumberedListBlock key={block.id} block={block} />
            case 'code':
              // @ts-expect-error Server Component
              return <CodeBlock key={block.id} block={block} />
            default:
              return null
          }
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
            lastBlock.type === BulletedListBlock &&
            curr.type === BulletedListBlock
          ) {
            return [...prev.slice(0, prev.length - 1), [...last, curr]]
          }
          if (
            lastBlock.type === NumberedListBlock &&
            curr.type === NumberedListBlock
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
          if (block.type === BulletedListBlock) {
            return <ul key={i}>{blocks}</ul>
          }
          if (block.type === NumberedListBlock) {
            return <ol key={i}>{blocks}</ol>
          }
          return null
        })}
    </>
  )
}
