import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handeNewShelf = (book, newOption) => {
    this.props.onChangeShelf(book, newOption)
  }

  state = {
    query: '',
    newBooks: []
  }

  searchBooks = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
    if (query) {
      BooksAPI.search(query)
        .then((newBooks) => {
          if(newBooks.error) {
            this.setState(() => ({
              newBooks: []
            }))
          }
          else {
            const filteretBooks = newBooks.map(b => {
            const existingBook = this.props.books.find(book => book.id === b.id);
            return existingBook ?
                {...b, shelf: existingBook.shelf}
                :
                {...b, shelf: 'none'}
            });

            this.setState(() => ({
              newBooks: filteretBooks
            }))
          }
        })
      }
      else {
        this.setState(() => ({
          newBooks: []
        }))
      }
  }

  render() {
    const newBooks = this.state.newBooks;
    const query = this.state.query;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {newBooks.map((book) => (
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
                <div className="book-authors">{book.authors}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
