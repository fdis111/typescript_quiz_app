import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState, AnswerObject} from "./API";
import { GlobalStyle, Wrapper} from "./App.style"


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
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[questionNumber].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    } 
  }

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);

    } else{
      setQuestionNumber(nextQuestion)
    }
  }
 

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT Quiz</h1>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
          <button className="start" onClick={startTrivia}>Start</button> :  
          <p className="score">Score: {score}</p>
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
        
      </Wrapper>
    </>
  );
}  

export default App;
 