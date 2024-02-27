import CircularPagination from "../../Components/Pagination/Pagination"
import "../../Components/Navbar/Navbar.css"
import { PastEventCard } from "../../Components/Card/PastEventCard/PastEventCard"


export default function PendingRequestPage() {

    return (
        <>
        <div className="container">
            <div className="filter-bar flex justify-between mt-5 mb-5">
                <div></div>
                <div>
                    <button>Toutes les requetes</button>
                </div>

                <div>
                    <button>Demandes</button>
                </div>
                <div>
                    <button>A noter</button>
                </div>
                <div></div>
                
            </div>
            <div className="">
            <PastEventCard/>
            </div>
            <div className="flex justify-center m-5">
                <CircularPagination/>
            </div>
        </div>
        </>
    )

}