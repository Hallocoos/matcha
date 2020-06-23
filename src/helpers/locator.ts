// import User, {modifyUserById} from "../models/userModel";
import User, {modifyUserById, retrieveUserById, retrieveUsers} from "../models/userModel";
import {body} from "express-validator";
import ipify = require("ipify");
import {Optional} from "express-validator/src/context";
var ip2location = require('ip-to-location');


//LoggedInUser = User;
// users = Users[];
// while (users[i]) {
//   users.distanceFromUser = calcDistance(user, users[i]);
//   i++;
// }


// Filter by long-lat on db.
// 1. find users information. DONE
// 2. while loop it, if distance is closer list it closer. Bubble sort method onto the array of users.
// 3. return list of users for display(FE)

async function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// lat2long2 = user we want to compare with
// so get all users
// loop users object and compare distance
// put in place ? .sort?????
export async function filterByDistance(user: User, locationData) {
    let allUsers = await retrieveUsers();
    console.log(user.latitude, user.longitude);

    let usersFilteredByDistance;
    let i = 0;
    while (allUsers[i] && user != allUsers[i]) {
        if (allUsers[i].latitude == "" || allUsers[i].longitude == "") { // check if empty cords
            i++;
        } else if (allUsers[i].latitude && allUsers[i].longitude) {
            // let dist = await(distance(Number(ME),Number(ME), Number(YOU), Number(YOU)));
            let dist = await(distance(Number(user.latitude),Number(user.longitude), allUsers[i].latitude, allUsers[i].longitude));
            console.log(dist);
        }
        i++;
    }
    // usersFilteredByDistance.sort
    console.log(usersFilteredByDistance);
    return usersFilteredByDistance;
}

export async function locateUser(user: User) {
    let locationData = await locationQuery();
    console.log(locationData);

    let body = {
        id: user.id,
        countryName: locationData.country_name,
        city: locationData.city,
        latitude: locationData.latitude,
        longitude: locationData.longitude
    }

    await modifyUserById(body);
    return (locationData);
}

// function to get ipv4
export async function locationQuery() {
    let locationData = await ip2location.fetch(await ipify({useIPv6: false}))
    return locationData;
}