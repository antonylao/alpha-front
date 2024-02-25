import { useEffect, useState } from "react"
import { getComments } from "../../services/api/comments"
import { Select, Option } from '@material-tailwind/react';
import { normalizeString, stringToRegExp } from "../../services/utils/Utils";
import CircularPagination from "../../Components/Pagination/Pagination"
import CalendarStart from "../../Components/SearchBar/SearchBarComment/Calendar/calendarstart"
import CalendarEnd from "../../Components/SearchBar/SearchBarComment/Calendar/calendarend"
import SearchBarComment from '../../Components/SearchBar/SearchBarComment/SearchBar'
import "./Comment.css"


export default function CommentPage() {

    const [comments, setComments] = useState<any>([])
    const [allComments, setAllComments] = useState<any>([])

    const handleChange = (value: any) => {
        console.log('value:', value);
    };

    console.log("haha", comments)

    useEffect(() => {
        async function loadComments() {
            const result = await getComments();
            setAllComments(result)
            setComments(result)
        }
        console.log("loadcomment", loadComments())
        loadComments();
    }, [])

    const receiveSearchBarCommentData = (value: string) => {
        value = normalizeString(value)

        if (value.length === 0) {
            setComments([...allComments]);
            return
        }


        const searchValRegexp = stringToRegExp(value);

        setComments(
            [...allComments].filter((comments: any) => {
                console.log("coucou de comment page", comments)

                return (
                    comments.name.match(searchValRegexp)
                );
            })
        );
    }


    return (


        //mapping des commentaires
        /* 
        {comments.map((comment: any, index:number) => 
            <div key="index">
                - {comment.name}    
            </div>
        )} */


        <>


            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className='w-72 filter-input'>
                        <Select label='Sélectionner une ou plusieurs tâches' onChange={handleChange} >
                            <Option>Billetterie</Option>
                            <Option>Vente boissons et nourriture</Option>
                            <Option>Orientation clientèle</Option>
                            <Option>Backstage</Option>
                            <Option>Assistant régisseur</Option>
                            <Option>Assistant lumière</Option>
                            <Option>Assistant son</Option>
                        </Select>
                    </div>
                    <CalendarStart />
                    <CalendarEnd />
                    <SearchBarComment sendToCommentPage={receiveSearchBarCommentData} />
                </div>
                <div className="commentlist grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {comments.map((comment: any, index: number) =>
                        <div key={index} className="relative text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 p-3 w-auto">
                            <div className=" ps-3 pe-3  pb-2 flex justify-between">
                                <div className="flex justify-between">
                                    <p className="pe-5">
                                        {comment.name}
                                    </p>
                                    <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3  text-xs uppercase text-white h-7 w-17">
                                        <span className="">{comment.id}</span>
                                    </div>
                                </div>
                                <p>{comment.id}</p>
                            </div>
                            <div className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-200 text-xs uppercase text-black h-7 w-12 m-2">
                                <span className="">{comment.postId}</span>
                            </div>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit p-1 border rounded">
                                {comment.body}
                            </p>
                            <div className="pt-4 flex justify-end">
                                <p className="">{comment.email}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 m-4">
                    <div></div>
                    <div className="">
                        <CircularPagination />
                    </div>
                    <div></div>
                </div>
            </div>

        </>
    )


}


