import axios from "axios";

const getData = async (category , difficulty) => {
    if(!category || !difficulty){
        difficulty = 'easy'
        category = 27
    }
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
    return response.data
}

export {getData}