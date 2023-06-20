import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address') as HTMLInputElement;

const GOOGLE_API_KEY = '';

type GoogleGeocodinResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAdress(event: Event) {
  event.preventDefault();
  const enteredAdress = addressInput.value;

  //google APIに送信
  axios
    .get<GoogleGeocodinResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAdress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('座標を取得できませんでした');
      }
      const coordinates = response.data.results[0].geometry.location;

      const loader = new Loader({
        apiKey: GOOGLE_API_KEY,
      });

      loader
        .load()
        .then(() => {
          const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 16,
          });
          new google.maps.Marker({
            position: coordinates,
            map,
          });
        })
        .catch((err) => {
          alert(err.message);
          console.log(err);
        });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener('submit', searchAdress);
