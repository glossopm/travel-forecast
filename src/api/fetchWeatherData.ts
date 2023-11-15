import axios from 'axios'

const rapidApiKey = process.env.RAPID_API_KEY

const options = {
    method: 'GET',
    url: 'https://meteostat.p.rapidapi.com/point/daily',
    params: {
        lat: '53.9458715',
        lon: '-1.2903516',
        start: '2020-05-23',
        end: '2020-05-23'
    },
    headers: {
        'X-RapidAPI-Key': `${rapidApiKey}`,
        'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
}

interface Props {
    lat: string
    lon: string
    date: string
}

interface DailyResponse {
    data: DailyWeather[]
}

interface DailyWeather {
    date: string
    tavg: number
    tmin: number
    tmax: number
    prcp: number
    snow: number
    wdir: number
    wspd: number
    wpgt: number
    pres: number
}

export const fetchWeatherData = async ({ lat, lon, date }: Props) => {
    const requestOptions = { ...options, params: { lat, lon, start: date, end: date } }

    try {
        const response = await axios.request<DailyResponse>(requestOptions)
        if (response.data.data[0]) {
            return response.data.data[0]
        }
        console.error(`No data for ${lat} ${lon} on ${date}`)
    } catch (error) {
        console.error(error)
    }
}
