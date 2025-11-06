import React from 'react'
import caloriesIcon from '@/Assets/calories-icon.svg'
import proteinIcon from '@/Assets/protein-icon.svg'
import carbsIcon from '@/Assets/carbs-icon.svg'
import lipideIcon from '@/Assets/lipide-icon.svg'

const Nutriments = ({ keyData }) => {
    const nutrimentsList = [
        {
            icon: caloriesIcon,
            value: `${keyData.calorieCount.toLocaleString('fr-FR')}kCal`,
            label: 'Calories',
            bgColor: 'rgba(255, 0, 0, 0.1)'
        },
        {
            icon: proteinIcon,
            value: `${keyData.proteinCount}g`,
            label: 'Proteines',
            bgColor: 'rgba(74, 184, 255, 0.1)'
        },
        {
            icon: carbsIcon,
            value: `${keyData.carbohydrateCount}g`,
            label: 'Glucides',
            bgColor: 'rgba(249, 206, 35, 0.1)'
        },
        {
            icon: lipideIcon,
            value: `${keyData.lipidCount}g`,
            label: 'Lipides',
            bgColor: 'rgba(253, 81, 129, 0.1)'
        }
    ]

    return (
        <div className='nutriments'>
            {nutrimentsList.map((nutriment, index) => (
                <div key={index} className='nutriment-card'>
                    <img
                        src={nutriment.icon}
                        alt={nutriment.label}
                        className='nutriment-card__icon'
                    />
                    <div className='nutriment-card__content'>
                        <p className='nutriment-card__value'>{nutriment.value}</p>
                        <p className='nutriment-card__label'>{nutriment.label}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Nutriments