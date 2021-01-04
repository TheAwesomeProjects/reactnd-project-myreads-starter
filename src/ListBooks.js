import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  handeNewShelf = (book, newOption) => {
    this.props.onChangeShelf(book, newOption)
  }


  render() {
    const books = this.props.books;
    const currentlyReading = books.filter(book => book.shelf.toLowerCase() === 'currentlyreading');
    const wantToRead = books.filter(book => book.shelf.toLowerCase() === 'wanttoread');
    const read_done = books.filter(book => book.shelf.toLowerCase() === 'read');

    const shelves = [
      {name: 'Currently Reading', books: currentlyReading},
      {name: 'Want to Read', books: wantToRead},
      {name: 'Read', books: read_done},
    ];

    return (
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelve) => (
              <div key={shelve.name} className="bookshelf">
                <h2 className="bookshelf-title">{shelve.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelve.books.map((book) => (
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
             ))}
            </div>
          </div>
          <Link
            to='/search'
            className='open-search'
          >Add a book</Link>
        </div>
    )
  }
}

export default ListBooks
