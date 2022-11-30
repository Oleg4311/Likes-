const ReactDOMServer = require('react-dom/server');
const React = require('react');

const renderTemplate = (component, props = {}, response) => {
  const reactElement = React.createElement(component, props);

  const html = ReactDOMServer.renderToStaticMarkup(reactElement);

  response.write('<!DOCTYPE html>');
  response.end(html);
};

module.exports = renderTemplate;
