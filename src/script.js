import './style.css';

let photosArray = [];

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


// Create elements & display to the DOM
function displayPhotos() {
  console.log('DisplayPhotos', photosArray)
  photosArray.forEach(photo => {
    console.log('photo', photo)
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
  
    const image = document.createElement('img');
    image.setAttribute('src', photo.urls.regular);
    image.setAttribute('alt', photo.alt_description);
    image.setAttribute('title', photo.alt_description);
  
    item.appendChild(image); // put <img> inside <a>
    imageContainer.appendChild(item) // put both inside image-container
  })
}

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.API_KEY}&count=${count}`;

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    
    photosArray = await response.json();
    console.log('try data', photosArray)
    
    displayPhotos();
  } catch (err) {
    console.error(err)
  }
}

// On Load
getPhotos();
