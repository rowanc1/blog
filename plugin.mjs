const articlesDirective = {
  name: 'articles',
  doc: 'A directive that lists recent articles or thoughts from a given category/tag.',
  arg: {
    type: String,
    doc: 'A short heading (for display) e.g., "Recent Thoughts"',
  },
  options: {
    tagged: {
      type: String,
      doc: 'Tag/category to filter articles. For example, "thoughts".',
    },
    limit: {
      type: Number,
      doc: 'The maximum number of articles to display. For example, 3.',
    },
    slugs: {
      type: String,
      doc: 'A comma-separated list of slugs',
    },
    url: {
      type: String,
      doc: 'A URL where the full listing of articles is located. For example, "/thoughts".',
    },
  },
  run(data) {
    // Parse data from directive usage:
    // ::: {articles} recent thoughts
    // :tagged: thoughts
    // :limit: 3
    // :url: /thoughts
    // :::

    const title = data.arg;
    const { tagged, limit, url, slugs } = data.options;

    return [
      {
        type: 'articleList',
        data: { title, tagged, limit, url, slugs: slugs?.split(',').map((s) => s.trim()) },
      },
    ];
  },
};

// Combine your directive(s) into a plugin:
const plugin = {
  name: 'Articles Plugin',
  directives: [articlesDirective],
};

export default plugin;

// const unsplashDirective = {
//   name: 'unsplash',
//   doc: 'An example directive for showing a nice random image at a custom size.',
//   alias: ['random-pic'],
//   arg: { type: String, doc: 'The kinds of images to search for, e.g., `fruit`' },
//   options: {
//     size: { type: String, doc: 'Size of the image, for example, `500x200`.' },
//   },
//   run(data) {
//     const query = data.arg;
//     const size = data.options.size || '500x200';
//     const url = `https://source.unsplash.com/random/${size}/?${query}`;
//     const img = { type: 'image', url };
//     return [img];
//   },
// };

// const plugin = { name: 'Unsplash Images', directives: [unsplashDirective] };

// export default plugin;
