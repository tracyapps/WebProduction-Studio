import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const expression = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
  let cursor = 0;

  for (const match of text.matchAll(expression)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push(text.slice(cursor, index));

    const token = match[0];
    if (token.startsWith('[')) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        parts.push(
          <a href={link[2]} key={`${index}-${link[2]}`}>
            {link[1]}
          </a>,
        );
      }
    } else if (token.startsWith('`')) {
      parts.push(<code key={index}>{token.slice(1, -1)}</code>);
    } else {
      parts.push(<strong key={index}>{token.slice(2, -2)}</strong>);
    }

    cursor = index + token.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function MarkdownDocument({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push(<pre key={`code-${index}`}><code>{code.join('\n')}</code></pre>);
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const children = inline(heading[2]);
      if (level === 1) blocks.push(<h1 key={index}>{children}</h1>);
      if (level === 2) blocks.push(<h2 key={index}>{children}</h2>);
      if (level === 3) blocks.push(<h3 key={index}>{children}</h3>);
      if (level === 4) blocks.push(<h4 key={index}>{children}</h4>);
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      blocks.push(<blockquote key={index}>{inline(line.slice(2))}</blockquote>);
      index += 1;
      continue;
    }

    if (/^- /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*- /.test(lines[index])) {
        items.push(lines[index].replace(/^\s*- /, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\. /, ''));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}
        </ol>,
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,4})\s/.test(lines[index]) &&
      !/^\s*- /.test(lines[index]) &&
      !/^\d+\. /.test(lines[index]) &&
      !lines[index].startsWith('> ') &&
      !lines[index].startsWith('```')
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={`p-${index}`}>{inline(paragraph.join(' '))}</p>);
  }

  return <div className="markdown-body">{blocks}</div>;
}
