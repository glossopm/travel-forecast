import React, { useEffect, useState } from 'react'
import { fetchWeatherData } from '../api/fetchWeatherData'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { fetchLocation } from '../api/fetchLocation'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { formatDateToCustomFormat } from '../util/customDateFormat'
import { itinerary, midAugust, midSept, startSept } from '../config/itinerary'
import TemperatureTableCell from '../components/TemperatureTableCell'
import './styles.css' // Import your CSS file
import { rainByCountryMonth } from '../config/rain'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    customTableContainer: {
        overflowX: 'initial'
    }
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function addDays(date: Date, days: number) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}
const getMonthNumber = (dateString: string) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // Extract the month name and day from the date string
    const monthMatch = dateString.match(/(\d{1,2}(st|nd|rd|th)?\s(\w{3}))/)

    if (monthMatch) {
        const monthName = monthMatch[3]
        const monthIndex = monthNames.indexOf(monthName)

        if (monthIndex !== -1) {
            return monthIndex + 1 // Add 1 to get a 1-based index
        }
    }

    return 0 // Return null if the month name is not found
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

const HomePage: React.FC = () => {
    const classes = useStyles()

    const [itineraryData, setItineraryData] = useState<ItineraryStop[]>(startSept)
    const [startDate, setStartDate] = useState<Date | null>(new Date('2022-09-01'))

    // useEffect(() => {
    //     if (startDate) {
    //         const fetchItineraryData = async () => {
    //             const updatedItinerary: ItineraryStop[] = []

    //             for (const stop of itinerary) {
    //                 // Calculate cumulative duration
    //                 const cumulativeDuration: number =
    //                     updatedItinerary.length > 0 ? updatedItinerary[updatedItinerary.length - 1].cumulativeDuration + stop.duration : stop.duration
    //                 // Fetch latitude and longitude for each location
    //                 const locationData = await fetchLocation(stop.location)

    //                 const requestedDate = startDate ? addDays(startDate, cumulativeDuration).toISOString().split('T')[0] : null

    //                 if (locationData && requestedDate) {
    //                     const { lat, lng } = locationData

    //                     // Fetch weather data based on coordinates
    //                     const weatherData = await fetchWeatherData({ lat: lat.toString(), lon: lng.toString(), date: requestedDate })

    //                     updatedItinerary.push({
    //                         location: stop.location,
    //                         duration: stop.duration,
    //                         date: formatDateToCustomFormat(requestedDate),
    //                         cumulativeDuration,
    //                         lowTemp: weatherData?.tmin || 0,
    //                         highTemp: weatherData?.tmax || 0,
    //                         avgTemp: weatherData?.tavg || 0,
    //                         avgPrecip: weatherData?.prcp || 0
    //                     })

    //                     await delay(1000); // Adjust the delay based on the rate limit
    //                 }
    //             }
    //             console.log(updatedItinerary)
    //             setItineraryData(updatedItinerary)
    //         }

    //         fetchItineraryData()
    //     }
    // }, [startDate])

    const data = itineraryData.map((stop) => {
        const country = stop.location.split(', ')[1]
        const month = getMonthNumber(stop.date)
        const rain = rainByCountryMonth[country].days[month]
        const mm = rainByCountryMonth[country].mm?.[month]
        if (!rain) {
            console.log({ location: stop.location, date: stop.date, country, rain, month })
        }
        return { ...stop, rain, mm }
    })

    return (
        <div>
            <h1>Itinerary Table</h1>
            <DatePicker selected={startDate} onSelect={(date) => setStartDate(date)} onChange={(date) => setStartDate(date)} />
            <h1 style={{ fontSize: '4em' }}>{startDate?.toDateString()}</h1>
            <div style={{ position: 'relative' }}>
                <TableContainer component={Paper} style={{ overflowX: 'initial', top: '48px' }}>
                    <Table stickyHeader className={classes.table} aria-label="Itinerary Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Location</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Sum Duration</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Average Temp</TableCell>
                                <TableCell>Low Temp</TableCell>
                                <TableCell>High Temp</TableCell>
                                <TableCell>Days of Rain / Month</TableCell>
                                <TableCell>Millimeters of rain</TableCell>
                                <TableCell>Average Precipitation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((stop, index) => (
                                <TableRow key={index} className="thinner-rows">
                                    <TableCell size="small">{stop.location}</TableCell>
                                    <TableCell size="small">{stop.duration} days</TableCell>
                                    <TableCell size="small">{stop.cumulativeDuration} days</TableCell>
                                    <TableCell size="small">{stop.date}</TableCell>
                                    <TemperatureTableCell size="small" temperature={stop.avgTemp}>
                                        {stop.avgTemp}°C
                                    </TemperatureTableCell>
                                    <TemperatureTableCell size="small" temperature={stop.lowTemp}>
                                        {stop.lowTemp}°C
                                    </TemperatureTableCell>
                                    <TemperatureTableCell size="small" temperature={stop.highTemp}>
                                        {stop.highTemp}°C
                                    </TemperatureTableCell>
                                    <TemperatureTableCell size="small" temperature={stop.rain}>
                                        {stop.rain || 0} days
                                    </TemperatureTableCell>
                                    <TemperatureTableCell size="small" temperature={stop.mm || 0}>
                                        {stop.mm || 0}mm
                                    </TemperatureTableCell>
                                    <TableCell size="small">{stop.avgPrecip}mm</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div
                    style={{
                        position: 'sticky',
                        zIndex: 99999,
                        bottom: '0',
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '8px',
                        background: 'white'
                    }}
                >
                    <Button variant="outlined" onClick={() => setItineraryData(midAugust)}>
                        Mid August
                    </Button>
                    <Button variant="outlined" onClick={() => setItineraryData(startSept)}>
                        Start September
                    </Button>
                    <Button variant="outlined" onClick={() => setItineraryData(midSept)}>
                        Mid September
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage
