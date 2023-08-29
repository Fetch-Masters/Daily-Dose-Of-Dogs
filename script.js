const url1 = 'https://dog.ceo/api/breeds/list/all';


//DOM MANIPULATION FOR DISPLAYING RANDOM DOG PIC
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

//FETCH PIC BY BREED
const displayBreedPic = async (url) => {
  const response = await fetch(url);
  const picByBreed = await response.json();
  console.log(picByBreed)
}


//DROP DOWN DOM MANIPULATION FOR ADDING EACH BREED
const createDogBreedOptions = (breed, breedURL) => {
  const myDropdown = document.querySelector('#myDropdown');
  const a = document.createElement('a');
  a.className = 'breed'
  a.textContent = breed;
  a.href = breedURL;
  myDropdown.append(a);
}

let selectedBreed;

// document.querySelectorAll('.breed').addEventListener('click', async (e) => {
//   e.preventDefault();
//   selectedBreed = e.target[0].value;
//   console.log(`Selected Breed: "${selectedBreed}"`);
//   listBreeds(url1);
//   // searchUL.innerHTML = '';
// })

const listBreeds = async (url) => {
  try {
    const response = await fetch(url)
    const breeds = await response.json()
    // console.log('breeds:', breeds);
    // console.log(typeof data)
    for (const breed in breeds.message) {
      // console.log(breed);
      createDogBreedOptions(breed, displayBreedPic(`https://dog.ceo/api/breed/${breed}/images/random`))
    }
  } catch (err) {
    console.error(err);
  }
}

const url2 = 'https://dog.ceo/api/breeds/image/random';

listBreeds(url1)
// // testRoute(url2)

// generateRandomDogPic(url2);
