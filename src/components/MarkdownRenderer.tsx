import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import React from 'react';

interface Props {
    children: string
    className?: string
}

const MardownRenderer = (props: Props) => {
    // Just a wrapper component to use the same plugins throughout the app
    return (
        <ReactMarkdown
            className={props.className}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
        >
            {props.children}
        </ReactMarkdown>
    )
}

export default MardownRenderer