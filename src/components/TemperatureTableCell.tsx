import React from 'react'
import { TableCellProps } from '@mui/material/TableCell'
import { StyledCell } from './StyledCell'

interface GradientTableCellProps extends TableCellProps {
    children: React.ReactNode
    temperature: number
}

const TemperatureTableCell: React.FC<GradientTableCellProps> = ({ children, temperature, ...rest }) => {
    const maxTemp = 25
    const midTemp = 15
    const lowTemp = 0

    const calculateBackgroundColor = (temperature: number) => {
        if (temperature === 0) {
            return 'rgb(0,0,0)'
        }
        if (temperature >= maxTemp) {
            // Red for temperatures above maxTemp
            return 'rgb(255, 100, 100)'
        } else if (temperature >= midTemp) {
            // Gradient from Dark Red (maxTemp) to White (midTemp)
            const percent = (temperature - midTemp) / (maxTemp - midTemp)
            const red = 255
            const green = 180 - Math.floor(percent * 75)
            const blue = 180 - Math.floor(percent * 75)
            return `rgb(${red},${green},${blue})`
        } else if (temperature >= lowTemp) {
            // Gradient from Dark Blue (midTemp) to White (lowTemp)
            const percent = (temperature - lowTemp) / (midTemp - lowTemp)
            const red = 100 + Math.floor(percent * 100)
            const green = 100 + Math.floor(percent * 100)
            const blue = 255
            return `rgb(${red},${green},${blue})`
        } else {
            // Blue for temperatures below lowTemp
            return 'rgb(100, 100, 255)'
        }
    }

    return (
        <StyledCell {...rest} style={{ backgroundColor: calculateBackgroundColor(temperature) }}>
            {children}
        </StyledCell>
    )
}

export default TemperatureTableCell
