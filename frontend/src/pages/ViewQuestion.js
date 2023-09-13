import React, { useEffect, useState } from 'react'
import { Input, Textarea, Chip, Typography, Button, Collapse, Card, CardBody, Alert, CardFooter } from "@material-tailwind/react";
import * as api from "../api"
import { REQUEST_FAILURE, REQUEST_INITIATED, REQUEST_NOT_INITIATED, REQUEST_SUCCESS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Answer from '../components/Answer';

function ViewQuestion() {

  const { userId, username } = useSelector((state) => state.userData)
  const [question, setQuestion] = useState({
    _id: "",
    title: "",
    body: "",
    tags: [],
    answers: [],
    creator: "",
    acceptedAnswer: ""
  })
  const [answer, setAnswer] = useState("")
  const [errors, setErrors] = useState({})
  const [answerSubmitState, setAnswerSubmitState] = useState(REQUEST_NOT_INITIATED)

  useEffect(() => {
    async function fetchQuestionData() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const questionId = params.get('id');
      try {
        const { data } = await api.getQuestion(questionId)
        setQuestion(data)
      } catch (error) {
        console.log(error)
        setErrors(error?.response?.data)
      }
    }
    fetchQuestionData()
  }, [])

  const handleAnswerSubmit = async () => {
    try {
      setAnswerSubmitState(REQUEST_INITIATED)
      const { data } = await api.createAnswer(question._id, {body: answer})
      const answerResponse = {...data, answeredBy: {_id: userId, username}}
      setQuestion({...question, answers: [answerResponse, ...question.answers]})
      setErrors({})
      setAnswerSubmitState(REQUEST_NOT_INITIATED)
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
      setAnswerSubmitState(REQUEST_FAILURE)
    }
  }

  const handleMarkAccepted = async (answerId) => {
    try {
      await api.markAnswerAccepted(question._id, answerId)
      setQuestion({...question, acceptedAnswer: answerId})
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
    }
  }

  return (
    <div className="view-page py-10">
     
      <Question {...question} currentUserId={userId} cardClassName="max-w-[700px] mx-auto" />
      {
        errors?.message && (<Alert color="red" className='max-w-[400px] mx-auto'>{errors.message}</Alert>)
      }
      <Card className="max-w-[700px] mx-auto">
        <CardBody>
          <Textarea variant="static" placeholder="Your Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </CardBody>
        <CardFooter>
          <Button className="text-left" onClick={handleAnswerSubmit} disabled={answerSubmitState === REQUEST_INITIATED}>
            {answerSubmitState === REQUEST_INITIATED ? "Submitting" : "Answer"}
          </Button>
        </CardFooter>
      </Card>

      {
        question.answers.map((answer) => (
          <Answer {...answer} showAcceptBtn={(question.creator === userId && !question.acceptedAnswer)} cardClassName="max-w-[700px] mx-auto" isAcceptedAnswer={answer._id === question.acceptedAnswer} handleMarkAccepted={(e) => handleMarkAccepted(answer._id)}/>
        ))
      }

    </div>
  )
}

export default ViewQuestion
