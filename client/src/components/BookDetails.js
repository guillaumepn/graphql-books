import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// queries
import { getBookDetailsQuery } from "../queries/queries";

class BookDetails extends Component {

  displayBookDetails() {
    let book = this.props.data.book;

    if (book) {
      return (
        <div>
          <h2>{ book.name } ({ book.genre })</h2>
          <p>Ecrit par { book.author.name }, qui a { book.author.age } ans</p>
          <p>Ses autres livres :</p>
          <ul>
            { book.author.books.map(b => {
              return (
                <li key={ b.id }>{ b.name }</li>
              );
            }) }
          </ul>
        </div>
      );
    }
  }

  render() {

    return (
      <div id="book-details">
        { this.displayBookDetails() }
      </div>
    );
  }
}

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
