import { useEffect, useState } from "react"
import { getComments } from "../../services/api/comments"
import Pagination from "../../Components/Pagination/Pagination"


export default function CommentPage() {

    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        async function loadComments() {
            const result = await getComments();
            setComments(result)
        }
        loadComments();
    })


   
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
            <div className="searchbar">
                <div className="relative flex w-full max-w-[24rem]">
                    <div className="relative h-10 w-full min-w-[200px]">
                        <input type="search"
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" Nom de l'évènement" value="" />
                        <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">

                        </label>
                    </div>
                    <button disabled
                    className="!absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                        Rechercher
                    </button>
                </div>  
            </div>
            <div className="commentlist grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {comments.map((comment: any, index: number) => 
                <div key={index} className="relative mt-6  text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 p-3 w-auto">
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
        </div>

        </>
    )


}

