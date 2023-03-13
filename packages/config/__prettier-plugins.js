const sortImports = require("@trivago/prettier-plugin-sort-imports");

const combinedFormatter = {
  parsers: {
    typescript: {
      preprocess: sortImports.parsers.typescript.preprocess,
    },
  },
};

module.exports = combinedFormatter;
