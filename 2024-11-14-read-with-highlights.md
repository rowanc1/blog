---
title: Highlighting text in a scientific article
description: What if scientific articles were a bit more like IDEs and you could highlight a word and see where those abbreviations or words are used throughout the document.
identifiers:
  bsky: https://bsky.app/profile/row1.ca/post/3laxqx6dcuc2g
date: 2024-11-14
thumbnail: images/short/read-with-highlights.png
tags:
  - short
  - thoughts
  - experiment
---

What if scientific articles were a bit more like IDEs and you could highlight a word and see where those abbreviations or words are used throughout the document.

:::{figure} ./images/highlight-text.mp4
:label: fig:highlight-text
Clicking on a word, highlights all instances of that word!
:::

When you highlight some text, it highlights it where ever that is in the document. This is similar to how IDEs work.

This was done by adding this code to rerender the full article on a page. Probably not that efficient!

```typescript
const [x, setX] = useState(article);
let timeoutId: NodeJS.Timeout | null = null;

const getCurrentSelection = () => {
  const selection = window.getSelection();
  return selection ? selection.toString() : null;
};

useEffect(() => {
  const handleSelectionChange = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to update the selected text
    timeoutId = setTimeout(() => {
      const selectedText = getCurrentSelection();

      if (!selectedText || selectedText.length > 15 || selectedText.length < 2) return;
      const clone = structuredClone(article.mdast);
      findAndReplace(clone as any, [
        [
          selectedText,
          () =>
            ({
              type: 'span',
              style: { color: 'red' },
              children: [{ type: 'text', value: selectedText }],
            } as any),
        ],
      ]);
      setX({ ...article, mdast: clone });
    }, 600); // Adjust delay as needed
  };

  document.addEventListener('selectionchange', handleSelectionChange);

  // Cleanup event listener on component unmount
  return () => {
    document.removeEventListener('selectionchange', handleSelectionChange);
  };
}, []);
```
