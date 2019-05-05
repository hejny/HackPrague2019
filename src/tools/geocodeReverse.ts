import axios from 'axios';

export async function geocodeReverse(location: {
    latitude: number;
    longitude: number;
}): Promise<{}> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${
        location.latitude
    }&lon=${location.longitude}`;

    const response = await axios.request({
        method: 'GET',
        url,
    });

    return response.data;
}
