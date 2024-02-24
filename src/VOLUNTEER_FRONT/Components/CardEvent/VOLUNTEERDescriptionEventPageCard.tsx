// Vous trouverez ici tous les événements à venir.
// Vous pouvez postuler à des tâches qui ont déjà atteint le nombre requis de bénévoles, si jamais un désistement venait à se produire.
// Notez que vous ne pouvez être validé que pour une seul tâche par événement. 
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";

const PARAGRAPHS = [
  "Vous trouverez ici tous les événements à venir.",
  "Vous pouvez postuler à des tâches qui ont déjà atteint le nombre requis de bénévoles, si jamais un désistement venait à se produire.",
  "Notez que vous ne pouvez être validé que pour une seul tâche par événement. "
]

export function VolunteerDescriptionEventPageCard({ types }: any) {



  return (
    <>
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardBody>
          {PARAGRAPHS.map((paragraph, index) => (
            <div key={index} className="pb-8">
              <Typography variant="h5" color="blue-gray" className="font-medium mr-5">        {paragraph}
              </Typography>
            </div>
          ))}
        </CardBody>
        <CardFooter>
          <div className="flex items-center ml-auto space-x-1">
            {types.map((type, index) => (
              <div key={index}
                className={`border border-black rounded-full ${type === "concert"
                  ? "bg-blue-500"
                  : type === "theatre"
                    ? "bg-orange-500"
                    : type === "one_man_show"
                      ? "bg-red-500"
                      : ""
                  }`}
              >
                {type}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
