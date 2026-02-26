import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Chip,
} from "@material-tailwind/react";

const logs = false

const PARAGRAPHS = [
  "Sur cette page, vous pouvez commentez les événements auxquels vous avez participé. Cela permettra à l'organisateur de s'améliorer, mais ne proférez pas d'insultes s'il-vous-plaît ! :)"

]

export function VolunteerDescriptionEventAwaitingCommentPageCard() {
  return (
    <>
      <Card className="w-full  shadow-lg ">
        <CardBody>
          {PARAGRAPHS.map((paragraph, index) => (
            <div key={index} >
              <Typography variant="h5" color="blue-gray" className="font-medium mr-5">        {paragraph}
              </Typography>
            </div>
          ))}
        </CardBody>
      </Card >
    </>
  )
}
