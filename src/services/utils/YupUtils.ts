import * as yup from "yup";

export class YupUtils {
  //usage: add required() when necessary
  static constraints = {
    email: yup
      .string()
      .email("Veuillez entrer un mail valide"),
    password: yup
      .string()
      .min(4, "Votre mot de passe doit comporter 4 caractères minimum")
      .max(20, "Votre mot de passe doit comporter 20 caractères maximum"),

  }
}