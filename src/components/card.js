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
        <div className="icon-container">
          <span className="icon" />
          <span className="icon-pattern" />
          <span className="icon-pattern" />
        </div>
        <div className="content">
          <h3 className="title">
            <Highlighter textToHighlight={item.name} searchWords={query.split()} />
          </h3>
          <small>
            <Highlighter textToHighlight={item.description} searchWords={query.split()} />
          </small>
        </div>
      </li>
    );
  }
}

export default Card;
