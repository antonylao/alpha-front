import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"; 
import { useNavigate } from 'react-router-dom';
import { VolunteerProfileUpdate } from "../../../../services/api/VolunteerProfileUpdate";
import { VolunteerUpdateInterface } from "../../../../services/utils/CustomTypes";
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

//   interface Volunteer {
//     firstName: string,
//     lastName: string,
//     email: string, 
//     password: string,
//     phoneNumber: string,
//     profilePicture: File
//   }

// lien de la video tuto hookform/yup utilisée dans ce code 
// https://www.youtube.com/watch?v=wlltgs5jmZw&ab_channel=PedroTech

export const FormModifyProfile = () =>{

    // const { newProfile } = props
    // const [volunteer, setVolunteer] = useState<Volunteer[]>([])
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
    const [picture, setPicture] = useState('');
    const navigate = useNavigate();

    const loadPicture = (e: any) => {
        setPicture(URL.createObjectURL(e.target.files[0]));
    };

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
        profilePicture: yup.mixed()
    })

    // le resorlver fait le lien entre hookform et yup pour integrer le schema 
    // de facon à implementer les validations créées dans le schema 
    // sur le formulaire
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    // const onSubmit = (data: any) => {
    //     setVolunteer(data)
    //     updateVolunteerProfile(1 , data)
    //     newProfile(data)
    // }

    const onSubmit = async (data: VolunteerUpdateInterface) => {
        try {
          console.log("🚀 ~ onSubmit ~ data:", data)
          const user = await VolunteerProfileUpdate(data)
          console.log("🚀 ~ handleSubmit ~ user:", user)

          navigate('/api/volunteer_profile');
        } catch (error: any) {
        //   console.error(error.response.data)
        }
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
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="">
                    <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div>
                            <Typography
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Prénom
                            </Typography>
                            <Input size="lg" type="text" placeholder="Prénom" {...register("firstName")} autoComplete="on"/>
                            <p className="error-message">{errors.firstName?.message}</p>
                            <Typography
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Nom
                            </Typography>
                            <Input size="lg" type="text" placeholder="Nom" {...register("lastName")} autoComplete="on"/>
                            <p className="error-message">{errors.lastName?.message}</p>
                            <Typography
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Adresse mail
                            </Typography>
                            <Input size="lg" type="email" placeholder="Email" {...register("email")} autoComplete="on"/>
                            <p className="error-message">{errors.email?.message}</p>
                            <Typography 
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Nouveau mot de passe
                            </Typography>
                            <Input size="lg" type="password" placeholder="Nouveau mot de passe" {...register("password")} autoComplete="off" />
                            <p className="error-message">{errors.password?.message}</p>
                            <Typography 
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Confirmer le nouveau mot de passe
                            </Typography>
                            <Input size="lg" type="password" placeholder="Confirmer le mot de passe" {...register("confirmPassword")} autoComplete="off" />
                            <p className="error-message">{errors.confirmPassword?.message}</p>
                            <Typography 
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                N° de téléphone
                            </Typography>
                            <Input size="lg" type="text" placeholder="N° de téléphone" {...register("phoneNumber")} autoComplete="off" />
                            <p className="error-message">{errors.phoneNumber?.message}</p>
                        </div>
                        <div>
                            <Typography 
                            className="mb-1 mt-5" 
                            variant="h6"
                            >
                                Photo de profile
                            </Typography>
                            <Input 
                                size="lg" 
                                type="file" 
                                placeholder="Photo de profile" 
                                accept='image/*'
                                {...register("profilePicture")}
                                onChange={loadPicture} 
                                />
                            <div className="rounded h-80 w-80 mt-6 ms-10">
                                <img className="object-cover rounded-full h-80 w-80 border-2 border-black bg-gray-300"  src={picture}></img>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-around">
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