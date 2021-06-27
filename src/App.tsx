import React, {useState} from 'react';

// Components
import QuestionCard from './components/QuestionCard-component/QuestionCard.Component';

const TOTAL_QUESTIONS: number = 10

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {}

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

  const nextQuestion = () => {}

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <button className='start' onClick={startTrivia}>Start the Quiz!</button>
      <p className='score'>Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answer}
        userAnswer={userAnswers ? userAnswers[number] : undefined }
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
