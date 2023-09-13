import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Question from '../components/Question'
import { Alert } from '@material-tailwind/react'
import { getQuestions } from '../actions/question.actions'

function Home() {
  const dispatch = useDispatch()

  const { questions } = useSelector((state) => state.questionData)
  const { userId } = useSelector((state) => state.userData)

  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  return (
    <div className="questions px-4  py-10">
      {
        !userId && (
          <Alert color="blue" className='w-fit min-w-[400px] mx-auto'>Please login to ask a question</Alert>
        )
      }
      <div className="questions-container flex flex-wrap">
        {
          questions?.map((question) => (
            <Question {...question} currentUserId={userId} cardClassName="w-96" />
          ))
        }
      </div>

    </div>
  )
}

export default Home