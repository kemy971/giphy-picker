import reqwest from 'reqwest'

export const fetchTrending = (callback) => {
    reqwest({
        url:"http://api.giphy.com/v1/gifs/trending",
        method:"get",
        data:{"api_key":"dc6zaTOxFJmzC"},
        success: (resp) => {
            callback(resp)
        }
    })
};

export const search = (searchText, callback) => {
    reqwest({
        url: "http://api.giphy.com/v1/gifs/search",
        method:"get",
        data:{
            "q": searchText,
            "api_key": "dc6zaTOxFJmzC"
        },
        success: (resp) => {
            callback(resp)
        }
    })
};
