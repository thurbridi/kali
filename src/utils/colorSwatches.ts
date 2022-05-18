import { Color } from "../types/types"

export const getRandomColor = () => {
    const colorIdx = Math.floor(Math.random() * (colorSwatch1.length))
    return colorSwatch1[colorIdx]
}

export const colorSwatch1: Color[] = [
    '#F61067',
    '#5E239D',
    '#00F0B5',
    '#FF9F1C',
    '#59A5D8',
    '#064789',
    '#3AAED8',
    '#3772FF',
    '#FF4365',
    '#E3170A',
    '#FFD400',
    '#A2FE82'
]