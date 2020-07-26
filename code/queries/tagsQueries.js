function createTags(labels) {
  if (!(labels && labels.length)) return '';
  const values = labels.reduce((acc, cur) => {
    if (!acc) return `('${cur}')`;
    return `${acc}, ('${cur}')`;
  }, '');
  return `INSERT INTO tags (label) VALUES ${values};`;
}

function getTags() {
  return 'SELECT * FROM tags;';
}

module.exports = {
  createTags,
  getTags
}