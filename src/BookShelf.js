import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfType: PropTypes.string.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  }

  state = {
    shelfTitle: ''
  }

  componentDidMount() {
    const {shelfType} = this.props

    if (shelfType == 'read') {
      this.setState({ shelfTitle: 'Read' })
    } else if (shelfType === 'wantToRead') {
      this.setState({shelfTitle: 'Want to Read'})
    } else if (shelfType === 'currentlyReading') {
      this.setState({shelfTitle: 'Currently Reading'})
    }
  }

  render() {
    const { books } = this.props
    const { shelfType } = this.props
    const { updateBookShelf } = this.props


    let showingBooks
    showingBooks = books.filter((book) => book.shelf===shelfType)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <Book
                updateBookShelf={updateBookShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>

    )
  }
}

export default BookShelf
