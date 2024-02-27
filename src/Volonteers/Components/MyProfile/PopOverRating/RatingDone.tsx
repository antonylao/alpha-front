import { Rating } from "@material-tailwind/react";
 
export function RatingDone(props:any) {
  const {value} = props

  return <Rating value={value} readonly />;
}