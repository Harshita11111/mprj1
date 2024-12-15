// let lastScrollTop = 0;
// const background = document.querySelector('.background');

// window.addEventListener('scroll', () => {
//     let st = window.pageYOffset || document.documentElement.scrollTop;
    
//     if (st < lastScrollTop) {
//         // Scrolling Up
//         background.style.opacity = '1';
//     } else {
//         // Scrolling Down
//         background.style.opacity = '0';
//     }
    
//     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// });




        // function initMap() {
        //     // Check if Geolocation is available
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(
        //             (position) => {
        //                 const userLocation = {
        //                     lat: position.coords.latitude,
        //                     lng: position.coords.longitude,
        //                 };

        //                 // Initialize the map
        //                 const map = new google.maps.Map(document.getElementById("map"), {
        //                     center: userLocation,
        //                     zoom: 14,
        //                 });

        //                 // Add a marker for the user's location
        //                 new google.maps.Marker({
        //                     position: userLocation,
        //                     map: map,
        //                     title: "You are here!",
        //                 });
        //             },
        //             (error) => {
        //                 console.error("Error getting location: ", error);
        //                 alert("Unable to retrieve your location.");
        //             }
        //         );
        //     } else {
        //         alert("Geolocation is not supported by this browser.");
        //     }
        // }

        // // Initialize the map after the API is loaded
        // window.onload = initMap;