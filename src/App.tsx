import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    
    setQuestions(newQuestion);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswers([]);
    setLoading(false);
  }
  
  


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {
 
  }
 

  return (
    <div>
      <h1>REACT Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
        <button className="start" onClick={startTrivia}> Start </button> :  
        <p className="score">Score: </p>
      }
      
      
      {loading && <p>Loading Questions ...</p>}

      {!loading && !gameOver && 
        <QuestionCard 
          questionNumber = {questionNumber + 1}
          question = {questions[questionNumber].question} 
          answers = {questions[questionNumber].answers} 
          callback = {checkAnswer} 
          userAnswer = {userAnswers ? userAnswers[questionNumber] : undefined} 
          totalQuestions = {TOTAL_QUESTIONS}
        />
      }
      {
        !gameOver && !loading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS - 1 ? 
          <button className="next" onClick={nextQuestion}>Next question</button> : 
          null

      }
      
    </div>
  );
}  

export default App;
 