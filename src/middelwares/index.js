export const logger = (store) => (next) => (action) => {
    console.log(action);
    next(action)
}

export const featuring = (store) => (next) => (action) => {
    //console.log(action);
    const featured = [{ "name": "Anya"}, ...action.payload]

    const updatedActionInfo = {
        ...action,
        payload: featured
    }

    next(updatedActionInfo)
}