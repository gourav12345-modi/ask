import React, { useState } from 'react'
import { Input, Textarea, Chip, Typography, Button, Collapse, Card, CardBody, Alert } from "@material-tailwind/react";
import * as api from "../api"
import { CREATE_QUESTION, REQUEST_FAILURE, REQUEST_INITIATED, REQUEST_NOT_INITIATED, REQUEST_SUCCESS } from '../constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [question, setQuestion] = useState({
    title: "",
    body: "",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState({})

  const [questionCreateState, setQuestionCreateState] = useState(REQUEST_NOT_INITIATED)

  const handleAddTag = (e) => {
    if (e.key !== "Enter") return;

    setQuestion({
      ...question,
      tags: [...question.tags, tagInput]
    })
    setTagInput("")
  }

  const handleCreateQuestion = async () => {
    try {
      setQuestionCreateState(REQUEST_INITIATED)
      await api.createQuestion(question)
      setErrors({})
      setQuestionCreateState(REQUEST_SUCCESS)
      setTimeout(() => {
        setQuestionCreateState(REQUEST_NOT_INITIATED)
        navigate("/")
      }, 2000)
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
      setQuestionCreateState(REQUEST_FAILURE)
    }
  }

  return (
    <div className="create-question-page ">
      <div className=" py-10 max-w-[500px] mx-auto  ">
      
        <Typography variant="h5" className="text-left mb-12">Add your question details bellow.</Typography>

        {
              errors?.message ? ( <Alert color="red" className='w-full'>{errors.message}</Alert> ): 
              questionCreateState === REQUEST_SUCCESS &&  ( <Alert color="green" className='w-full'>Question Created Successfully. Redirecting to Home page</Alert> )
        }

        <div className="my-6 mx-2">
          <Input variant="static" label="Title" placeholder="Add your title" value={question.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
          <Typography
            variant="small"
            color="gray"
            className="flex justify-start font-normal"
          >
            {errors?.title}
          </Typography>
        </div>
        <div className="my-6 mx-2">
          <Textarea label="Body" value={question.body} onChange={(e) => setQuestion({ ...question, body: e.target.value })} />

        </div>
        <div className="tags-containe my-6 mx-2">
          <div className="w-full">
            <Input variant="static" label="Tags" value={tagInput} className="px-2" placeholder="write and press enter to add tag." onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} />
          </div>
          <div className="tags flex flex-wrap mt-2">
            {
              question.tags.map((tag) => (
                <Chip className="m-1" value={tag}
                  onClose={(e) => {
                    const newTagList = question.tags.filter((currentTag) => currentTag !== tag)
                    setQuestion({ ...question, tags: newTagList })
                  }
                  }
                />
              ))
            }
          </div>
        </div>

        <Button onClick={handleCreateQuestion} disabled={questionCreateState===REQUEST_INITIATED}>
          {
            questionCreateState === REQUEST_INITIATED ?"Creating":
            "Create" 
          }</Button>
      </div>
    </div>

  )
}

export default CreateQuestion