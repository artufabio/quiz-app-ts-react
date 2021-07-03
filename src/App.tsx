import React, {useState} from 'react';

import { fetchQuizQuestions } from './API';

// Components
import QuestionCard from './components/QuestionCard-component/QuestionCard.Component';

// Types
import { Difficulty, QuestionState } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS: number = 10

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions( TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User answer
      const answer: string = e.currentTarget.value;
      // Check user answer against correct answer
      const correct: boolean = questions[number].correct_answer === answer;
      // Add score if ansewr is correct
      if (correct) setScore(prevState => prevState++);
      // Save answer in the userAnswers array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers( prevState => [...prevState, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last one
    const nextQuestion: number = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {
        // display start button only when game hasn't started or it's over
        gameOver || userAnswers.length === TOTAL_QUESTIONS 
        ?
        (<button className='start' onClick={startTrivia}>Start the Quiz!</button>)
        :
        null
      }
      {
        // display score only when game is not over
        !gameOver ? <p className='score'>Score:</p> : null
      }
      {
        // Display spinner or similar only when is loading
        loading && <p>Loading Questions...</p>
      }
      {
        // Display QuestionCard if not loading and if game is not over
        !loading && !gameOver
        &&
        (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined }
            callback={checkAnswer}
          />
        )
      }
      {
        // Display next question button if
        !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 
        ?
        (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        )
        :
        null
      }
      
    </div>
  );
}

export default App;
