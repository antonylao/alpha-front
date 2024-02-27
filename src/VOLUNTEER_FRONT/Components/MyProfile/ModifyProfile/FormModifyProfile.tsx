import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"; 
import {
    Dialog,
    Avatar,
    Input,
    Button,
    CardFooter,
    Typography,
    Card,
    CardBody,
  } from "@material-tailwind/react";

  interface Volunteer {
    firstName: string
    lastName: string
    email: string, 
    password: string,
    confirmPassword: string
    phoneNumber: string
    picture: File
  }

// lien de la video tuto hookform/yup utilisée dans ce code 
// https://www.youtube.com/watch?v=wlltgs5jmZw&ab_channel=PedroTech

export const FormModifyProfile = () =>{

    const [volunteer, setVolunteer] = useState<Volunteer[]>([])
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/

    // schema indique la forme que doit prendre l'objet recu du formulaire
    const schema = yup.object({
        firstName: yup.string().required("Veuillez renseigner un prénom"),
        lastName: yup.string().required("Veuillez renseigner un nom"),
        email: yup.string().email("Veuillez renseigner un email valide").required("Veuillez renseigner un email"),
        password: yup.string().required("Veuillez créer un mot de passe")
        // check minimum characters
        .min(8, "Le mot de passe doit comporter au moins 8 caractères").max(15, "Le mot de passe doit comporter au maximum 15 caractères"),
        // different error messages for different requirements
        // .matches(/[0-9]/, getCharacterValidationError("digit"))
        // .matches(/[a-z]/, getCharacterValidationError("lowercase"))
        // .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
        confirmPassword: yup.string().required("Veuiller confirmer votre mot de passe ")
        // use oneOf to match one of the values inside the array.
        // use "ref" to get the value of passwrod.
        .oneOf([yup.ref("password")], "Les mots de passes ne sont pas identiques"),
        phoneNumber: yup.string().matches(phoneRegex, 'Veuillez rentrer un numéro de téléphone français').required("Veuillez renseigner un numéro de téléphone"),
    })

    // le resorlver fait le lien entre hookform et yup pour integrer le schema 
    // de facon à implementer les validations crées dans le schema 
    // sur le formulaire
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        console.log("Hookform profile", data)
        setVolunteer([data])
        console.log("volunteer", volunteer)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
        <Avatar
        onClick={handleOpen}
        variant="circular"
        size="md"
        alt="edit_icon"
        className="border border-gray-900 p-0.5"
        src="/Edit_icon-icons.com_55921.png"/>
        <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography 
                        variant="h4" 
                        color="blue-gray"
                        >
                            Modifier mon profile
                        </Typography>
                        <Typography
                        className="-mb-2" 
                        variant="h6"
                        >
                            Prénom
                        </Typography>
                        <Input size="lg" type="text" placeholder="Prénom" {...register("firstName")} autoComplete="on"/>
                        <p className="error-message">{errors.firstName?.message}</p>
                        <Typography
                        className="-mb-2" 
                        variant="h6"
                        >
                            Nom
                        </Typography>
                        <Input size="lg" type="text" placeholder="Nom" {...register("lastName")} autoComplete="on"/>
                        <p className="error-message">{errors.lastName?.message}</p>
                        <Typography
                        className="-mb-2" 
                        variant="h6"
                        >
                            Adresse mail
                        </Typography>
                        <Input size="lg" type="email" placeholder="Email" {...register("email")} autoComplete="on"/>
                        <p className="error-message">{errors.email?.message}</p>
                        <Typography 
                        className="-mb-2" 
                        variant="h6"
                        >
                            Nouveau mot de passe
                        </Typography>
                        <Input size="lg" type="password" placeholder="Nouveau mot de passe" {...register("password")} autoComplete="off" />
                        <p className="error-message">{errors.password?.message}</p>
                        <Typography 
                        className="-mb-2" 
                        variant="h6"
                        >
                            Confirmer le nouveau mot de passe
                        </Typography>
                        <Input size="lg" type="password" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} autoComplete="off" />
                        <p className="error-message">{errors.confirmPassword?.message}</p>
                        <Typography 
                        className="-mb-2" 
                        variant="h6"
                        >
                            N° de téléphone
                        </Typography>
                        <Input size="lg" type="text" placeholder="N° de téléphone" {...register("phoneNumber")} autoComplete="off" />
                        <p className="error-message">{errors.phoneNumber?.message}</p>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-between">
                        <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className=""
                        >
                            <span>Annuler</span>
                        </Button>
                        <Button 
                        variant="gradient"
                        color="green" 
                        type="submit"
                        // onClick={handleSubmit}
                        >
                            <span>Enregistrer</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Dialog>
        </>
)}