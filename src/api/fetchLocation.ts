import axios from 'axios'

const openCageDataKey = process.env.OPEN_CAGE_DATA_KEY;

const baseOptions = {
    method: 'GET',
    url: 'https://api.opencagedata.com/geocode/v1/json',
    params: {
        key: `${openCageDataKey}`
    }
}

interface GeoCodeResp {
    results: Result[]
}

interface Result {
    geometry: {
        lat: number
        lng: number
    }
}

export const fetchLocation = async (placeName: string) => {
    const placeNameEncoded = encodeURIComponent(placeName)

    const requestOptions = {
        ...baseOptions,
        params: {
            ...baseOptions.params,
            q: placeNameEncoded
        }
    }
    try {
        const response = await axios.request<GeoCodeResp>(requestOptions)
        if (response.data.results[0]) {
            return response.data.results[0].geometry
        }

        console.error('No results found for ')
    } catch (error) {
        console.error(error)
    }
}
