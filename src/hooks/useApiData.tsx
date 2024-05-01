import { useState, useEffect } from 'react';
import { fetchLocation } from '../api/fetchLocation';
import { fetchWeatherData } from '../api/fetchWeatherData';
import { startSept, itinerary } from '../config/itinerary';
import { formatDateToCustomFormat } from '../util/customDateFormat';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function addDays(date: Date, days: number) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

interface ItineraryStop {
  location: string
  date: string
  duration: number
  cumulativeDuration: number
  lowTemp: number
  highTemp: number
  avgTemp: number
  avgPrecip: number
}

const useApiData = () => {
  const [itineraryData, setItineraryData] = useState<ItineraryStop[]>(startSept)
    const [startDate, setStartDate] = useState<Date | null>(new Date('2022-09-01'))

    useEffect(() => {
        if (startDate) {
            const fetchItineraryData = async () => {
                const updatedItinerary: ItineraryStop[] = []

                for (const stop of itinerary) {
                    // Calculate cumulative duration
                    const cumulativeDuration: number =
                        updatedItinerary.length > 0 ? updatedItinerary[updatedItinerary.length - 1].cumulativeDuration + stop.duration : stop.duration
                    // Fetch latitude and longitude for each location
                    const locationData = await fetchLocation(stop.location)

                    const requestedDate = startDate ? addDays(startDate, cumulativeDuration).toISOString().split('T')[0] : null

                    if (locationData && requestedDate) {
                        const { lat, lng } = locationData

                        // Fetch weather data based on coordinates
                        const weatherData = await fetchWeatherData({ lat: lat.toString(), lon: lng.toString(), date: requestedDate })

                        updatedItinerary.push({
                            location: stop.location,
                            duration: stop.duration,
                            date: formatDateToCustomFormat(requestedDate),
                            cumulativeDuration,
                            lowTemp: weatherData?.tmin || 0,
                            highTemp: weatherData?.tmax || 0,
                            avgTemp: weatherData?.tavg || 0,
                            avgPrecip: weatherData?.prcp || 0
                        })

                        await delay(1000); // Adjust the delay based on the rate limit
                    }
                }
                console.log(updatedItinerary)
                setItineraryData(updatedItinerary)
            }

            fetchItineraryData()
        }
    }, [startDate])

  return { itineraryData, startDate, setStartDate };
};

export default useApiData;