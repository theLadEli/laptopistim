import db from '../config/database.js';

export default async function getCities(){
    return await db('cities').select('*');
}

export async function getCityStats(city){
    city = city.toLowerCase();
    return await db('cities').where('name', city).select('*');
}