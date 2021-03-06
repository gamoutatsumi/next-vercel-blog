import React from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface P {
  value: string
  language?: string
}

const CodeBlock: React.FC<P> = ({ language, value }) => {
  return (
    <div className='px-2 py-1'>
      <SyntaxHighlighter language={language} style={style}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
