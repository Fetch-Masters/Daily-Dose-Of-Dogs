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
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    let txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    }
    else {
      a[i].style.display = "none";
    }
  }
}

listBreeds(breedList)
generateRandomDogPic(randomDogPic);
generateRandomDogFacts(randomFacts);

//CREATING NEW ITEMS IN LOCAL STORAGE
const faveImgs = [];
const saveImg = (idx, imgURL) => {
  localStorage.setItem(idx, imgURL);
}

//GET ITEMS FROM LOCAL STORAGE
// const getImg = (img) => {
//   localStorage.getItem()
// }

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
  // const oldImg = document.querySelector('img').remove()
  
}
//getFaveImgs and saveNewFaveImgs
const getFaveImgs = () => {
  // console.log(arr);
  // arr.forEach((img) => {
  //   displayFaves(img);
  // })
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
  // console.log(e.target, document.querySelector('img'))
  // for (let i = 0; i < faveImgs.length; i++) {
    // console.log(localStorage.getItem(i))
    console.log(faveImgs)
  // }
});
// localStorage.clear()
document.querySelector('#favBtn').addEventListener('click', (e) => {
//   console.log(e.target)
  const imgURL = document.querySelector('#dummy-image').src;
  // if (!faveImgs.includes(imgURL)) faveImgs.push(imgURL)
  // saveImg(faveImgs.indexOf(imgURL).toString(), imgURL)
  // console.log(localStorage)
  saveNewFaveImgs(imgURL);
  console.log(faveImgs);
});

document.querySelector('#btn').addEventListener('click', (e) => {
  // figure.innerHTML = ''
  generateRandomDogPic(randomDogPic);
  // generateRandomDogFacts(randomFacts)
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
