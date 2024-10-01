import React, { useState } from 'react';
import './App.css';
import arsenalLogo from './assets/Photos/arsenalLogo.png'; // Import the logo
import backgroundImage from './assets/Photos/arsenal-jersey-template-2019.png'; // Import the background image

function App() {
  const [cards, setCards] = useState([
    { question: "Who is Arsenal's all-time top scorer?", answers: ["Thierry Henry", "Henry"] },
    { question: "In what year did Arsenal go an entire Premier League season unbeaten?", answers: ["2003-2004", "2003/2004"] },
    { question: "Who was the manager of Arsenal during the 'Invincibles' season?", answers: ["Arsène Wenger", "Arsene Wenger"] },
    { question: "Which Arsenal player scored the winning goal in the 2014 FA Cup final?", answers: ["Aaron Ramsey", "Ramsey"] },
    { question: "What is the name of Arsenal's home stadium?", answers: ["Emirates Stadium", "The Emirates"] },
    { question: "Who is the youngest player to have ever played for Arsenal?", answers: ["Cesc Fàbregas", "Cesc Fabregas"] },
    { question: "Which player holds the record for the most appearances for Arsenal?", answers: ["David O'Leary", "O'Leary", "David Oleary"] },
    { question: "How many league titles has Arsenal won?", answers: ["13"] },
    { question: "Which Arsenal player was nicknamed 'The Non-Flying Dutchman'?", answers: ["Dennis Bergkamp", "Bergkamp"] },
    { question: "Who captained Arsenal to their 2005 FA Cup victory?", answers: ["Patrick Vieira", "Vieira"] }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([0]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [showMasteredList, setShowMasteredList] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  // Used to convert lowercase and remove all non-alphanumeric characters
  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[\W_]+/g, "").trim();
  };

  const submitGuess = () => {
    if (hasAnswered) return;

    const userGuessNormalized = normalizeString(userGuess);
    
    // Normalize all possible answers for the current question
    const normalizedAnswers = cards[currentIndex].answers.map(answer => normalizeString(answer));

    if (normalizedAnswers.includes(userGuessNormalized)) {
      setFeedback('Correct!');
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
      setFlipped(true);
      setHasAnswered(true);
    } else {
      setFeedback('Incorrect, try again!');
      setCurrentStreak(0);
    }
    setUserGuess(''); 
  };

  const markCardAsMastered = () => {
    const masteredCard = cards[currentIndex];
    setMasteredCards([...masteredCards, masteredCard]);

    // Remove from current cards list
    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);

    if (updatedCards.length > 0) {
      setCurrentIndex(currentIndex % updatedCards.length);
    } else {
      alert("Congratulations! You have mastered all cards!");
    }
  };

  const toggleMasteredList = () => {
    setShowMasteredList(!showMasteredList);
  };

  const showNextCard = () => {
    setFlipped(false);
    setFeedback('');
    setUserGuess('');
    setHasAnswered(false);
    let nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
    setHistory([...history, nextIndex]);
  };

  const showPreviousCard = () => {
    if (history.length > 1) {
      setFlipped(false);
      setFeedback('');
      setUserGuess('');
      let newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentIndex(newHistory[newHistory.length - 1]);
    }
  };

  const shuffleCards = () => {
    let shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]; // Swap
    }
    setCards(shuffledCards);
    setCurrentIndex(0); // Ensure we start with the first card in the shuffled deck
    setFlipped(false);
    setFeedback('');
    setUserGuess('');
    setHasAnswered(false);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,  // Set the background image here
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="app-header">
        {/* Add the Arsenal Logo */}
        <img src={arsenalLogo} alt="Arsenal F.C. Logo" className="arsenal-logo" />

        <h1 className="app-title">Arsenal F.C. Trivia</h1>
        <p className="app-description">
          Challenge yourself with a series of intriguing questions in relation to Arsenal F.C. Can you solve them all?
        </p>
        <div className="color-description">
          <div><span className="color-question">Blue</span> = Question</div>
          <div><span className="color-answer">Red</span> = Answer</div>
        </div>
        <p className="question-info">Total Questions: {cards.length}</p>
        <div className="streak-info">
          <p>Current Streak: {currentStreak}</p>
          <p>Longest Streak: {longestStreak}</p>
        </div>
      </header>

      <div className="card-container">
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={flipCard}>
          <div className="card-face card-front">
            {!flipped && (
              <>
                <p>{cards[currentIndex].question}</p>
              </>
            )}
          </div>
          <div className="card-face card-back">
            {cards[currentIndex].answers[0]}
          </div>
        </div>
        <button className="btn shuffle" onClick={shuffleCards}>Shuffle Cards</button>
      </div>
      
      <button className="btn back" onClick={showPreviousCard}>←</button>
      <button className="btn next" onClick={showNextCard}>→</button>

      <div>
        <button className="btn mastered" onClick={markCardAsMastered}>Mark as Mastered</button>
        <button className="btn masteredList" onClick={toggleMasteredList}>Show Mastered Cards</button>
        {showMasteredList && (
          <div className="mastered-cards-list">
            <h3>Mastered Cards</h3>
            <ul>
              {masteredCards.map((card, index) => (
                <li key={index} style={{ marginBottom: '20px' }}>
                  <div className="question">{card.question}</div>
                  <br />
                  <div className="answer">Answer: {card.answers[0]}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {feedback && <p style={{ marginTop: '30px' }}>{feedback}</p>}
      
      <input 
        type="text" 
        value={userGuess} 
        onChange={(e) => setUserGuess(e.target.value)} 
        placeholder="Enter your guess" 
        className="input-guess" 
        style={{ marginTop: '20px' }} 
      />

      <button 
        onClick={submitGuess}
        className="btn submit"
        style={{ marginTop: '20px' }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
