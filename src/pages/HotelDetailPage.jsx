import { useParams } from "react-router-dom";

const HotelDetailPage = () => {
    const {id} = useParams();

    return <h1>Hotel id:{id} </h1>
}

export default HotelDetailPage;