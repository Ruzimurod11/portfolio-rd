import { RoundedStar, Rating as SmastromRating } from "@smastrom/react-rating"
import "@smastrom/react-rating/style.css"
import React from "react"

import type { ItemStyles } from "@smastrom/react-rating"

type RatingProps = {
    value: number
    onChange?: (value: number) => void
    readOnly?: boolean
    max?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    size?: "small" | "medium" | "large"
}

const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
}

const customStyles: ItemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#fbbf24", // sariq
    inactiveFillColor: "#e5e7eb", // kulrang
}

const Rating: React.FC<RatingProps> = ({
    value,
    onChange,
    readOnly = false,
    max = 5, // default qiymat — bu to‘g‘ri
    size = "medium",
}) => {
    return (
        <SmastromRating
            className="focus:outline-none outline-none shadow-none border-none"
            style={{ maxWidth: sizeMap[size] * max }}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            items={max}
            itemStyles={customStyles}
        />
    )
}

export default Rating
