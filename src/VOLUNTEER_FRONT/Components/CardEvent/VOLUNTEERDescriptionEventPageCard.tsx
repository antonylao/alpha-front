// Vous trouverez ici tous les événements à venir.
// Vous pouvez postuler à des tâches qui ont déjà atteint le nombre requis de bénévoles, si jamais un désistement venait à se produire.
// Notez que vous ne pouvez être validé que pour une seul tâche par événement. 
import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import { eventTypeBackgroundColor } from "../../../services/utils/Utils";

const PARAGRAPHS = [
  "Vous trouverez ici tous les événements à venir.",
  "Vous pouvez postuler à des tâches qui ont déjà atteint le nombre requis de bénévoles, si jamais un désistement venait à se produire.",
  "Notez que vous ne pouvez être validé que pour une seule tâche par événement. "
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
          <Typography variant="paragraph" >Codes couleurs pour les types d'événements</Typography>
          <div className="flex flex-wrap gap-2 items-center ml-auto space-x-1">
            {types.map((type: string, index: number) => (
              <Chip key={index} value={type}
                className={`border border-black rounded-full ${eventTypeBackgroundColor(type)}`} />
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
