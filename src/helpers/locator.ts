import User, { modifyUserById } from "../models/userModel";
import ipify = require("ipify");
var ip2location = require('ip-to-location');

async function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
}

export async function calculateDistance(user: User, allUsers) {
    allUsers = allUsers.filter(obj => obj.id !== user.id);
    for (let i = 0; allUsers[i]; i++)
        allUsers[i].distance =
            await (distance(Number(user.latitude), Number(user.longitude), Number(allUsers[i].latitude), Number(allUsers[i].longitude)));
    return (allUsers);
}

export async function locateUser(user) {
    let locationData = await ip2location.fetch(await ipify({ useIPv6: false }));
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