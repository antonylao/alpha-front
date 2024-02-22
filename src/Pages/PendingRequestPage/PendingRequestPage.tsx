import CircularPagination from "../../Components/Pagination/Pagination"
import "../../Components/Navbar/Navbar.css"
// import { BookingCard } from "../../Components/Card/EventCard/EventCard"


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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/>
                <BookingCard/> */}
            </div>
            <div className="flex justify-center m-5">
                <CircularPagination/>
            </div>
        </div>
        </>
    )

}