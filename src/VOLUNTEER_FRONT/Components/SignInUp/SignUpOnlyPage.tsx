import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpFormInterface } from "../../../services/utils/CustomTypes";
import { signUpVolunteer } from "../../../services/api/auth";



export function SignUpVolunteerOnlyPage() {

  const navigate = useNavigate();
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/

  const schema = yup.object().shape({
    firstname: yup.string().required("Veuillez renseigner un prénom"),
    lastname: yup.string().required("Veuillez renseigner un nom"),
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
    phone: yup.string().matches(phoneRegex, 'Veuillez rentrer un numéro de téléphone français').required("Veuillez renseigner un numéro de téléphone"),
    profilePicture: yup.mixed()
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: SignUpFormInterface) => {

    //submit form action
    // async function signInVolunteer() {
    try {
      console.log("🚀 ~ onSubmit ~ data:", data)
      const user = await signUpVolunteer(data)
      console.log("🚀 ~ handleSubmit ~ user:", user)

      //store accessToken & refreshToken in localStorage

      // redirect to event page if connection successful
      navigate('/volonteer_signin');
    } catch (error: any) {
      console.error(error.response.data)
      //stay on sign up and display error message
    }
  }


  return (
    <Card color="transparent" shadow={false}>
      <div className="flex justify-center bg-cover bg-center bg-[url('https://www.premier-ltd.com/wp-content/uploads/2018/04/Manchester-Central-Events.jpg')]" >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white opacity-95 p-10 rounded-md mt-8 mb-8 w-80 max-w-screen-lg sm:w-96">
          <Typography className="mb-8" variant="h4" color="blue-gray">
            Inscription
          </Typography>
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Prénom
            </Typography>
            <Input
              size="lg"
              placeholder="Prénom"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              data-cy="firstname"
              {...register("firstname")}
            />
            <Typography variant="paragraph" color="red" data-cy="firstnameerror">{errors.firstname?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Nom
            </Typography>
            <Input
              size="lg"
              placeholder="Nom"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              data-cy="lastname"
              {...register("lastname")}
            />
            <Typography variant="paragraph" color="red" data-cy="lastnameerror">{errors.lastname?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="nom@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              data-cy="email"
              {...register("email")}
            />
            <Typography variant="paragraph" color="red" data-cy="emailerror">{errors.email?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mot de passe
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="password"
              data-cy="password"
              {...register("password")}
            />
            <Typography variant="paragraph" color="red" data-cy="passworderror" >{errors.password?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirmation de mot de passe
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="password"
              data-cy="confirmPassword"
              {...register("confirmPassword")}
            />
            <Typography variant="paragraph" color="red" data-cy="confirmPassworderror">{errors.confirmPassword?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              N° de téléphone
            </Typography>
            <Input
              size="lg"
              placeholder="0612345678"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              data-cy="phone"
              {...register("phone")}
            />
            <Typography variant="paragraph" color="red" >{errors.phone?.message}</Typography>
          </div>

          <Button
            type="submit"
            className="mt-6"
            data-cy="SignUpButton"
            fullWidth>
            Sign Up
          </Button>

        </form>
      </div>
    </Card>
  );
}
