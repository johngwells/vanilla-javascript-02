import './style.css';

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to setAttribute on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements & display to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    console.log('photo', photo);
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    const image = document.createElement('img');
    // left without refactor for my own reference
    image.setAttribute('src', photo.urls.regular);
    image.setAttribute('alt', photo.alt_description);
    image.setAttribute('title', photo.alt_description);

    // Event Listener
    image.addEventListener('load', imageLoaded);

    item.appendChild(image); // put <img> inside <a>
    imageContainer.appendChild(item); // put both inside image-container
  });
}

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.API_KEY}&count=${count}`;

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);

    photosArray = await response.json();
    console.log('try data', photosArray);

    displayPhotos();
  } catch (err) {
    console.error(err);
  }
}

// Check if srolling near bottom of page.
window.addEventListener('scroll', () => {
  // innerHeight: Total height of the browser window
  // scrollY: Distance from top of page user has scrolled
  // offsetHeight: Height of everything in body including what is not in view
  // 1000px is typical for most screens which triggers even before bottom
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
