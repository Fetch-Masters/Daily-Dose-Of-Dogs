const breedList = 'https://dog.ceo/api/breeds/list/all';
const randomDogPic = 'https://dog.ceo/api/breeds/image/random';
const randomFacts = 'https://dog-api.kinduff.com/api/facts';

//DOM MANIPULATION FOR DISPLAYING DOG PIC
let figure;
const createDogPics = (imgURL) => {
    figure = document.querySelector('figure');
    const img = document.querySelector('#dummy-image');
    img.src = imgURL;
}

//DOM MANIPULATION FOR DROP DOWN ADDING EACH BREED
const createDogBreedOptions = (breed) => {
  const myDropdown = document.querySelector('#myDropdown');
  const button = document.createElement('button');
  button.className = 'breed'
  button.textContent = breed;
  button.dataset.breed = breed;
  myDropdown.append(button);
}

// DOM MANIPULATION FOR DISPLAYING DOG FACTS
 let figCap;
 const createDogFacts = (facts) => {
  figCap = document.querySelector('figcaption');
  figCap.textContent = facts
 }

//FETCHING THE RANDOM DOG PICS FROM API
const generateRandomDogPic = async (url) => {
    try {
        const response = await fetch(url);
        const dogs = await response.json();
        createDogPics(dogs.message);
    }
    catch (err) {
        console.error(err)
    }
}

///FETCHING RANDOM DOG FACTS FROM API
const generateRandomDogFacts = async (url) => {
  try {
    const response = await fetch(url);
    const factsObj = await response.json();
    createDogFacts(factsObj.facts)
  }
  catch (err) {
    console.log(err)
  }
}

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
generateRandomDogFacts(randomFacts);

//EVENT LISTENERS

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#btn').addEventListener('click', (e) => {
    generateRandomDogPic(randomDogPic);
    generateRandomDogFacts(randomFacts);
  });
  document.querySelector("#myDropdown").addEventListener('click', async (e) => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${e.target.dataset.breed}/images/random`);
      const selectedBreed = await response.json();
      figure.innerHTML = ''
      createDogPics(selectedBreed.message)
    } catch (err) {
      console.error(err);
    }
    // console.log(e.target.data-breed)
  })
});