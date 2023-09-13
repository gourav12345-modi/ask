import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip
} from "@material-tailwind/react";

function Question({ title, body, tags, answers }) {
  return (
    <Card className="m-4 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-left">
          {title}
        </Typography>
        <Typography className="text-left">
          {
            body.length > 70 ? (body.substring(0, 70) + "...") : body
          }
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex flex-wrap">
        <Chip value={`${answers.length} ${answers.length > 1 ? "answers" : "answer"}`} className="w-fit m-1" color="indigo" />
        {
          tags.map((tag) => (
            <Chip value={tag} className="w-fit m-1" />

          ))
        }
      </CardFooter>
    </Card>
  )
}

export default Question
