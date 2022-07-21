const updateActors = (actors, payload) => {
    actors = {};
    payload.forEach(actor => {
        actors[actor['id']] = actor;
    });
    return actors;
}

const updateMovies = (movies, payload) => {
    payload.forEach(movie => {
        if(Object.keys(movies).includes(movie['actorId'].toString())){
            movies[movie['actorId']].push(movie);
        } else {
            movies[movie['actorId']] = [movie];
        }
    });
    const temp = {};
    Object.keys(movies).forEach((key) => {
        temp[key] = arrayUniqueByKey(movies[key], "name");
    })
    return temp;
}

const arrayUniqueByKey = (array, key) => {
    const uniqueArray = [...new Map(array.map(item =>
        [item[key], item])).values()];
    console.log(uniqueArray);
    return uniqueArray;
};

const updatePageCount = (count) => {
    const a = Math.floor(count / 10);
    const b = count % 10 > 0 ? 1 : 0;
    return a + b;
}

export {
    updateActors,
    updateMovies,
    updatePageCount
}