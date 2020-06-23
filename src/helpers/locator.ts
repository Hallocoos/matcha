// import User, {modifyUserById} from "../models/userModel";
import User, {modifyUserById, retrieveUserById} from "../models/userModel";
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


export async function filterByDistance(user: User) {
    console.log(user);
    console.log("userlat", user.lat, "userlong", user.long);
    let dist = await(distance(Number(user.lat),Number(user.long), -33.9165, 18.4155));

    // let dist = distance(-33.9258, 18.4259, -33.9165, 18.4155)
    // console.log(dist + 'km');
    console.log(dist+"KM", "\t", user.lat, "\t", user.long);
    return dist;
}


export async function locateUser(user: User, ipAddress) {
    console.log("u: ", "ipAddress: ", ipAddress)
    await ip2location.fetch(ipAddress, (err, res) => {
        console.log(res);
        let body = {
            id: user.id,
            countryName: res.country_name,
            city: res.city,
            latitude: res.latitude,
            longitude: res.longitude
        }
        modifyUserById(body);
    });
}