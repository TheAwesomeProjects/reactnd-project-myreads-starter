import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  handeShelfUpdate = (book, newShelf) => {
    BooksAPI.update(book, newShelf)

    const filteredBooks = this.state.books.filter(b => b.id !== book.id).concat(book);

    this.setState({
      books: filteredBooks.map((b) => (
        b.id === book.id ?
          {...b,shelf: newShelf}
        :
          {...b}
      ))
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={(book, newShelf) => {
              this.handeShelfUpdate(book, newShelf)
            }}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={(book, newShelf) => {
              this.handeShelfUpdate(book, newShelf)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
