const breedListURL = 'https://dog.ceo/api/breeds/list/all';
const randomDogPicURL = 'https://dog.ceo/api/breeds/image/random';
const randomFactsURL = 'https://dog-api.kinduff.com/api/facts';

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
  }
  catch (err) {
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
  const buttons = document.getElementsByClassName("breed");
  for (let i = 0; i < buttons.length; i++) {
    let txtValue = buttons[i].textContent || buttons[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      buttons[i].style.display = "";
    }
    else {
      buttons[i].style.display = "none";
    }
  }
}

listBreeds(breedListURL)
generateRandomDogPic(randomDogPicURL);
generateRandomDogFacts(randomFactsURL);

const faveImgs = [];

//DOM MANIPULATION FOR DISPLAYING FAVORITES
const displayFaves = () => {
  const favesEl = document.querySelector('#faves');
  favesEl.innerHTML = '';
  console.log(faveImgs)
  getFaveImgs().forEach((imgURL) => {
    const img = document.createElement('img');
    img.src = imgURL;
    favesEl.append(img);
  })

}
//getFaveImgs and saveNewFaveImgs
const getFaveImgs = () => {
  return faveImgs;
}

const saveNewFaveImgs = (url) => {
  if (!faveImgs.includes(url)) faveImgs.push(url);
  console.log(faveImgs)
}

//EVENT LISTENERS

document.querySelector('#viewFaves').addEventListener('click', (e) => {
  displayFaves();
  document.querySelector('#favPopUp').showModal()
    console.log(faveImgs)
  // }
});
document.querySelector('#favBtn').addEventListener('click', (e) => {
//   console.log(e.target)
  const imgURL = document.querySelector('#dummy-image').src;
  saveNewFaveImgs(imgURL);
  console.log(faveImgs);
});

document.querySelector('#btn').addEventListener('click', (e) => {
  generateRandomDogPic(randomDogPicURL);
  generateRandomDogFacts(randomFactsURL)
});

document.querySelector("#myDropdown").addEventListener('click', async (e) => {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${e.target.dataset.breed}/images/random`);
    const selectedBreed = await response.json();
    createDogPics(selectedBreed.message)
  }
  catch (err) {
    console.error(err);
  }
});
