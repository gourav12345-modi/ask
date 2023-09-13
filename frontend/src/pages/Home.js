import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Question from '../components/Question'
import { Alert } from '@material-tailwind/react'
import { getQuestions } from '../actions/question.actions'

function Home() {
  const dispatch = useDispatch()

  const { questions } = useSelector((state) => state.questionData)
  const { userId } = useSelector((state) => state.userData)
  console.log("questinos",questions)
  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  return (
    <div className="questions px-4  py-10">
      {
        !userId && (
          <Alert color="blue" className='w-fit min-w-[400px] mx-auto mb-4'>Please login to ask a question</Alert>
        )
      }
      <div className="questions-container flex flex-wrap">
        {
          (questions && questions.length)? questions.map((question) => (
            <Question {...question} currentUserId={userId} cardClassName="w-96" />
          )): (<Alert color="blue" className='w-fit min-w-[400px] mx-auto'>No questions present. Please create one!</Alert>)
        }
      </div>

    </div>
  )
}

export default Home