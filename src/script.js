import './style.css';

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_API_KEY}&count=${count}`;

console.log(process.env.UNSPLASH_API_KEY)

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)

    const data = response.json();

    console.log({ data });

  } catch (err) {
    console.error(error)
  }
}

// On Load
getPhotos();