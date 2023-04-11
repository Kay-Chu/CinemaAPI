import axios from "axios";

export default axios.create({
    baseURL: "https://streaming-availability.p.rapidapi.com/v2/",
    headers: {
        'X-RapidAPI-Key': '23e7de4453mshb034b7870fedc6bp18739fjsn4e8925f0ee59',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
});