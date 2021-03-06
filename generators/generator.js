const moment = require('moment');

const inputRequired = (name) => {
  return (value) => (/.+/.test(value) ? true : `${name} is required`);
};

module.exports = (plop) => {
  plop.setGenerator('package', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
        validate: inputRequired('name'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        validate: inputRequired('description'),
      },
      {
        type: 'input',
        name: 'url',
        message: 'URL:',
      },
      {
        type: 'list',
        name: 'license',
        message: 'License:',
        choices: ['MIT', 'GPL'],
        default: 0,
      },
      {
        type: 'list',
        name: 'category',
        message: 'Category:',
        choices: ['Extension', 'Layout', 'Graphics', 'Color', 'Image', 'Data', 'Chart', 'Control'],
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Comma-separated tags:',
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name:',
      },
      {
        type: 'input',
        name: 'authorWebsite',
        message: 'Author website:',
      },
      {
        type: 'input',
        name: 'authorAvatar',
        message: 'Author avatar:',
      },
      {
        type: 'input',
        name: 'authorTwitter',
        message: 'Author Twitter:',
      },
    ],
    actions: (data) => {
      let date = Date.now();
      data.added = moment(date).format('YYYY-MM-DDTHH:mmZ');

      if (data.tags) {
        data.tags = `\ntags:\n  - ${data.tags
          .split(',')
          .map(function(e) {
            return e.trim();
          })
          .join('\n  - ')}`;
      }

      return [
        {
          type: 'add',
          path: '../data/libraries/{{dashCase name}}.yml',
          templateFile: './template-yml.template',
        },
      ];
    },
  });
};
