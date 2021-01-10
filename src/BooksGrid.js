import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handeNewShelf = (book, newOption) => {
    this.props.onChangeShelf(book, newOption)
  }

  render() {
    const books = this.props.books;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id} className='book'>
            <div className='book-top'>
              <div className="book-cover"
                   style={{
                    width: 128, height: 193, backgroundSize: "cover", backgroundImage: `url(${book.imageLinks.thumbnail})`
                   }}
              ></div>
              <div className="book-shelf-changer">
                <ChangeShelf
                  currentValue={book.shelf}
                  onChangeOption={(newOption) => {
                    this.handeNewShelf(book, newOption)
                  }}
                />
              </div>
            ></div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksGrid
