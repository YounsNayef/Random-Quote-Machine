import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching the quote', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className={loading ? 'loading' : ''}>
      <div id="text" className="quote-text">{quote}</div>
      <div id="author" className="quote-author">- {author}</div>
      <button id="new-quote" onClick={fetchQuote}>New Quote</button>
      <a 
        id="tweet-quote" 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} 
        target="_blank" 
        rel="noopener noreferrer">
        Tweet Quote
      </a>
    </div>
  );
};

export default App;
