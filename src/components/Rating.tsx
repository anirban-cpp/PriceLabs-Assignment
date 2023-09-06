import { RatingProps } from '@/interfaces'
import React from 'react'

import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({ rating, reviews }: RatingProps) => {
    if (!rating) return null

    const integralRating = Math.floor(rating)
    const fractionalRating = rating - integralRating

    return (
        <div className='flex items-center gap-3'>
            <span className='flex items-center'>
                {
                    [...Array(integralRating)].map((_e, i) => <FaStar size={13} color="gray" key={i} />)
                }
                {
                    fractionalRating ? <FaStarHalfAlt color="gray" size={13} /> : null
                }
            </span>
            {reviews && <p className='text-gray-500'>({reviews})</p>}
        </div>
    )
}

export default Rating