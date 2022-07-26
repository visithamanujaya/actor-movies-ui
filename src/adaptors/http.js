const HOST = 'https://d2icr8q4nhruqs.cloudfront.net';

const get = async (path = '', headers = {}) => {
    try {
        const response = await fetch(`${HOST}/${path}`, {
            method: 'GET',
            headers
        });
        const res = await response.json();
        return res;
    } catch (err) {
        console.log('Error in GET - ', err.message);
        throw new Error(err);
    }
};

const post = async (path = '', payload = {}) => {
    try {
        const response = await fetch(`${HOST}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        const res = await response.json();
        return res;
    } catch (err) {
        console.log('Error in POST - ', err.message)
        throw new Error(err);
    }
};

export {
    get,
    post
}