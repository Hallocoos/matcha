import User, {modifyUserById} from "../models/userModel";
var ip2location = require('ip-to-location');


export async function locateUser(user: User, ipAddress) {
    console.log("u: ", "ipAddress: ", ipAddress)
    await ip2location.fetch(ipAddress, (err, res) => {
        console.log(res);
        let body = {
            id : user.id,
            countryName : res.country_name,
            city : res.city,
            latitude : res.latitude,
            longitude : res.longitude
        }
        modifyUserById(body)
    });
}

// export function storeUserLocation() {
// }