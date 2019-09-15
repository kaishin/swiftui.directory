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
          <div className={'icon-container ' + item.category.toLowerCase()}>
            <span className="icon" />
            <span className="icon-pattern" />
            <span className="icon-pattern" />
            <span className="icon-pattern" />
          </div>
          <div className="content">
            <h3 className="title">
              <Highlighter textToHighlight={item.name} searchWords={query.split()} />
            </h3>
            <h4 className="author">
              <img
                className="avatar"
                src={item.authorAvatar || item.author.avatar}
                alt={item.authorName || item.author.name}
              />

              <span>By {item.authorName || item.author.name}</span>
            </h4>
            <small className="description">
              <Highlighter textToHighlight={item.description} searchWords={query.split()} />
            </small>
          </div>
        </a>
      </li>
    );
  }
}

export default Card;
