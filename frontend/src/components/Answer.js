import { Avatar, Button, Card, CardBody, CardHeader, Chip, Typography } from '@material-tailwind/react'
import React from 'react'

function Answer({ body, createdAt, answeredBy, cardClassName, showAcceptBtn, isAcceptedAnswer, handleMarkAccepted }) {
  return (
    <Card className={"mx-4 p-4 my-1 pb-1 " + cardClassName} shadow={false}>
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-2"
      >
        <Avatar
          size="sm"
          variant="circular"
          src="/images/user.png"
          alt="user image"
        />
        <div className="flex items-start flex-col">
          <Typography variant="h6" color="blue-gray">
            {answeredBy.username}
          </Typography>
          <Typography color="blue-gray" className="text-sm">{new Date(createdAt).toLocaleString()}</Typography>
        </div>
        {
          showAcceptBtn && (
            <Button size="sm" className="ml-auto" onClick={handleMarkAccepted}>Mark Accepted</Button>
          )
        }
        {
          isAcceptedAnswer && (
            <Chip value="Accepted" className="ml-auto" color="green"/>
          )
        }
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <Typography className="text-left">{body}</Typography>
      </CardBody>
    </Card>
  )
}

export default Answer