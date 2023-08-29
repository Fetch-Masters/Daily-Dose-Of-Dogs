const breedList = 'https://dog.ceo/api/breeds/list/all';
const randomDogPic = 'https://dog.ceo/api/breeds/image/random';

//DOM MANIPULATION FOR DISPLAYING DOG PIC
let figure;
const createDogPics = (imgURL) => {
    figure = document.querySelector('figure');
    const img = document.createElement('img');
    img.src = imgURL;
    figure.append(img)
}
//DOM MANIPULATION FOR DROP DOWN ADDING EACH BREED
const createDogBreedOptions = (breed) => {
  const myDropdown = document.querySelector('#myDropdown');
  const a = document.createElement('a');
  a.className = 'breed'
  a.textContent = breed;
  // a.href = breedURL;
  myDropdown.append(a);
}

//FETCHING THE RANDOM DOG PICS FROM API
const generateRandomDogPic = async (url) => {
    try {
        const response = await fetch(url);
        const dogs = await response.json();
        createDogPics((dogs.message));
    }
    catch (err) {
        console.error(err)
    }
}

//FETCHING RANDOM DOG PICS BY BREED FROM API
// const displayBreedPic = async (url) => {
//   const response = await fetch(url);
//   const picByBreed = await response.json();
// }

//DECLARING THIS VARIABLE IN THE GLOBAL SCOPE IN ORDER TO USE IT IN ANOTHER FUNCTION
// let selectedBreed;

//FETCHING THE LIST OF DOG BREEDS FROM API
const listBreeds = async (url) => {
  try {
    const response = await fetch(url)
    const breeds = await response.json()
    for (const breed in breeds.message) {
      createDogBreedOptions(breed)
    }
  } catch (err) {
    console.error(err);
  }
}

//DROP DOWN MENU FUNCTIONALITY
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

listBreeds(breedList)
generateRandomDogPic(randomDogPic);

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#btn').addEventListener('click', (e) => {
      generateRandomDogPic(randomDogPic);
    figure.innerHTML = ''
    });
    // document.querySelector('.breed').addEventListener("click", (e) => {
    //   // generateRandomDogPic()
    // })
});