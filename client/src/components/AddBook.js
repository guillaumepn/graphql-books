import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// queries
import {getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option>Chargement...</option>);
    } else {
      return data.authors.map(author => (
        <option key={ author.id } value={ author.id }>{ author.name }</option>
      ));
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [
        { query: getBooksQuery }
      ]
    });
  }

  render() {

    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label htmlFor="book-name">Book name :</label>
          <input type="text" id="book-name" onChange={ (e) => this.setState({ name: e.target.value }) }/>
        </div>

        <div className="field">
          <label htmlFor="book-genre">Book genre :</label>
          <input type="text" id="book-genre" onChange={ (e) => this.setState({ genre: e.target.value }) }/>
        </div>

        <div className="field">
          <label htmlFor="author-name">Author name :</label>
          <select id="author-name" onChange={ (e) => this.setState({ authorId: e.target.value }) }>
            <option value="Select author">Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
