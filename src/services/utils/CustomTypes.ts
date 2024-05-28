export type UserRoleStr = "organiser" | "volunteer"

export interface SignInFormInterface {
  email: string;
  password: string;
}

export interface SignUpFormInterface {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

export interface VolunteerUpdateInterface {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  phone?: string;
  profilePicture?: string;
}
