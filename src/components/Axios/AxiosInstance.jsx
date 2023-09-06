import axios from 'axios';


// const headers = {
//   Authorization: 'Bearer YOUR_ACCESS_TOKEN',
//   // Add any other headers specific to this request
// };

// // Make a GET request with dynamic headers
// axiosInstance
//   .get('/some-endpoint', {
//     headers: headers,
//   })
//   .then((response) => {
//     // Handle the response here
//     console.log(response.data);
//   })
//   https://creativedesignsguru.com/next-js-formik/
//   .catch((error) => {
//     // Handle errors here
//     console.error(error);
//   });

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Accept': 'application/json',
  },
});

export default axiosInstance;
