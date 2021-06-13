import React from 'react';
import Highlighter from 'react-highlight-words';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { index, item, query } = this.state;

    return (
      <li className="card" key={index}>
        <a href={item.url} className="card-link">
          <div className="content">
            <h3 className="title">
              <img className={'icon ' + item.category.toLowerCase()} src={'/icons/' + item.category.toLowerCase() + '-icon.svg'} alt="Icon" />
              <Highlighter textToHighlight={item.name} searchWords={query.split()} />
            </h3>
            <p className="description">
              <Highlighter textToHighlight={item.description} searchWords={query.split()} />
              {' '}By <strong><Highlighter textToHighlight={item.authorName || item.author.name} searchWords={query.split()} /></strong>
            </p>
          </div>
        </a>
      </li>
    );
  }
}

export default Card;
