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
import { EnumUtils } from "../../../services/utils/EnumUtils";
import { EventType } from "../../../services/utils/BackendEnums";

const logs = false
const PARAGRAPHS = [
  "Merci de visiter mon site! Ceci fait partie d'un projet open-source que j'ai développé. J'y ai apporté quelques modifications pour but de démonstration.",
  "Vous êtes directement connecté en tant que bénévole, et vous pouvez postuler pour des tâches lors de différents événements."

]

export function VolunteerDescriptionEventPageCard({ types }: any) {
  return (
    <>
      <Card className="w-full  shadow-lg">
        <CardBody>
          {PARAGRAPHS.map((paragraph, index) => (
            <div key={index} className="pb-8">
              <Typography variant="h5" color="blue-gray" className="font-medium mr-5">        {paragraph}
              </Typography>
            </div>
          ))}
          <Typography variant="h5" color="blue-gray" className="font-medium mr-5 pb-8">
            Voici les liens vers le code source du projet: <a href="https://github.com/antonylao/alpha-back/tree/antony_microservices" target="_blank" style={{ color: "revert", }} className="underline">back</a> et <a href="https://github.com/antonylao/alpha-front/tree/antony_cablage_2" target="_blank" style={{ color: "revert", }} className="underline">front</a>
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-medium mr-5 pb-8">
            Vous pouvez également voir mes autres projets dans mon <a href="https://v0-fullstack-developer-website-gamma.vercel.app/" target="_blank" style={{ color: "revert", }} className="underline">portfolio</a>.
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-medium mr-5 ml-5 text-left">
            Antony
          </Typography>
        </CardBody>
        <CardFooter>
          <Typography variant="paragraph" >Codes couleurs pour les types d'événements</Typography>
          <div className="flex flex-wrap gap-2 items-center ml-auto space-x-1">
            {types.map((type: string, index: number) => (
              // DEMO Change
              <Chip key={index} value={EnumUtils.getKey(EventType, +type)}
                className={`border border-black rounded-full ${eventTypeBackgroundColor(type)}`} />
              // original
              //<Chip key={index} value={EnumUtils.getKey(EventType, +type)}
              // className={`border border-black rounded-full ${eventTypeBackgroundColor(type)}`} />
            ))}
          </div>
        </CardFooter>
      </Card >
    </>
  )
}
