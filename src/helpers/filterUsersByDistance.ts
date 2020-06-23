// import User, {modifyUserById, retrieveUserById} from "../models/userModel";
//
// //LoggedInUser = User;
// // users = Users[];
// // while (users[i]) {
// //   users.distanceFromUser = calcDistance(user, users[i]);
// //   i++;
// // }
//
//
// // Filter by long-lat on db.
// // 1. find users information. DONE
// // 2. while loop it, if distance is closer list it closer. Bubble sort method onto the array of users.
// // 3. return list of users for display(FE)
//
// async function distance(lat1, lon1, lat2, lon2) {
//     let R = 6371; // Radius of the earth in km
//     let dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
//     let dLon = (lon2 - lon1) * Math.PI / 180;
//     let a =
//         0.5 - Math.cos(dLat) / 2 +
//         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//         (1 - Math.cos(dLon)) / 2;
//
//     return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// }
//
// // let dist = distance(-33.9258, 18.4259, -33.9165, 18.4155)
// // console.log(dist + 'km');
//
// export async function filterByDistance(user: User) {
//     console.log("userlat", user.lat, "userlong", user.long);
//     let dist = await(distance(Number(user.lat),Number(user.long), -33.9165, 18.4155));
//
//     console.log(dist+"KM", "\t", user.lat, "\t", user.long);
//     return dist;
// }
