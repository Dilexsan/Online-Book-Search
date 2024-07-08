
import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyBwKlFiU5agDEpvNQkpBOvtBp36NhmxB2E`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors}</p>
            <img
              src={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : 'https://via.placeholder.com/150'
              }
              alt={book.volumeInfo.title}
            />
            <p>{book.volumeInfo.description}</p>
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              View Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
