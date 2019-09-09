exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `PackagesYaml`) {
    const searchIndex =
      node.description + ' ' + node.tags.join(', ') + ' ' + node.category + ' ' + node.license + ' ' + node.author.name;

    createNodeField({
      node,
      name: 'searchIndex',
      value: searchIndex
    });
  }
};
