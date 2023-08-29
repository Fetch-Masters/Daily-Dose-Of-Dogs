const createDogPics = (imgURL) => {
    const figure = document.querySelector('figure');
    const img = document.createElement('img');
    img.src = imgURL;
    figure.append(img)
}

const generateRandomDogPic = async (url) => {
    try {
        const response = await fetch(url);
        const dogs = await response.json();
        console.log('dogs:', dogs);
        createDogPics((dogs.message));
    }
    catch (err) {
        console.error(err)
    }
}

const testRoute = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log('data:', data);
}

const url1 = 'https://dog.ceo/api/breeds/list/all';
const url2 = 'https://dog.ceo/api/breeds/image/random';

testRoute(url1)
// testRoute(url2)

generateRandomDogPic(url2);
