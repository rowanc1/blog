import fs from 'fs';

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

const cvItemsDirective = {
  name: 'cv-items',
  doc: 'List out the CV items',
  arg: {
    type: String,
    doc: 'A link to JSON file',
  },
  options: {},
  run(data) {
    const fileName = data.arg;
    let items;
    try {
      items = JSON.parse(fs.readFileSync(fileName).toString());
    } catch (error) {
      console.error('No file found or not in JSON format');
    }

    return [
      {
        type: 'cvItems',
        data: { items },
      },
    ];
  },
};

const plugin = {
  name: 'Plugins',
  directives: [articlesDirective, cvItemsDirective],
};

export default plugin;
