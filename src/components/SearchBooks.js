import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    books: [],
  };

  updateQuery = (query) => {
    const homeBooks = this.props.books

    if (!query) {
      this.setState({query: '', books: []})
    } else {
      this.setState({query: query})
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = []
        }

        let searchBooks = books.map(book => {
            for (let hb of homeBooks) {
              if (book.id === hb.id) {
                book.shelf = hb.shelf;
                return book
              }
            }
            return book
          }
        );

        this.setState({books: searchBooks})
      })
    }
  };

  render() {
    const {updateBookShelf} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.sort(sortBy('title'))
              .map(book => (
                <Book
                  updateBookShelf={updateBookShelf}
                  key={book.id}
                  book={book}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
