import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
  const {destination, days, budget, interests} = await req.json()

  const lowHotels = [
    `${destination} Budget Inn`,
    `${destination} Backpackers Hostel`,
    `${destination} Economy Stay`,
  ]

  const mediumHotels = [
    `${destination} Grand Hotel`,
    `${destination} City Residency`,
    `${destination} Comfort Suites`,
  ]

  const highHotels = [
    `${destination} Luxury Palace`,
    `${destination} Royal Resort`,
    `${destination} Premium Grand`,
  ]

  const activities = {
    food: [
      'Try famous local street food',
      'Visit popular restaurants',
      'Food tasting tour',
      'Local market food experience',
    ],
    shopping: [
      'Explore shopping malls',
      'Visit local markets',
      'Buy souvenirs',
      'Luxury shopping district',
    ],
    adventure: [
      'Water sports',
      'Trekking experience',
      'Adventure park visit',
      'Nature exploration',
    ],
    culture: [
      'Museum visit',
      'Historical monuments',
      'Cultural performance',
      'Heritage walk',
    ],
  }

  let itinerary = `🌍 ${destination} Travel Plan\n\n`
  itinerary += `Duration: ${days} Days\n`
  itinerary += `Budget: ${budget}\n`
  itinerary += `Interests: ${interests}\n\n`

  const interestList = interests
    .toLowerCase()
    .split(',')
    .map((item: string) => item.trim())

  for (let day = 1; day <= Number(days); day++) {
    itinerary += `Day ${day}\n`

    itinerary += `• Explore a famous attraction in ${destination}\n`

    interestList.forEach((interest: string) => {
      const options =
        activities[interest as keyof typeof activities]

      if (options) {
        itinerary += `• ${
          options[(day - 1) % options.length]
        }\n`
      }
    })

    itinerary += '\n'
  }

  let flights = 0
  let accommodation = 0
  let food = 0
  let activityCost = 0

  if (budget === 'Low') {
    flights = 200
    accommodation = Number(days) * 40
    food = Number(days) * 20
    activityCost = Number(days) * 15
  } else if (budget === 'Medium') {
    flights = 400
    accommodation = Number(days) * 80
    food = Number(days) * 40
    activityCost = Number(days) * 30
  } else {
    flights = 800
    accommodation = Number(days) * 150
    food = Number(days) * 80
    activityCost = Number(days) * 60
  }

  const total =
    flights + accommodation + food + activityCost

  itinerary += `
Estimated Budget

Flights: $${flights}
Accommodation: $${accommodation}
Food: $${food}
Activities: $${activityCost}

Total Estimated Budget: $${total}

Recommended Hotels
`

  const hotels =
    budget === 'Low'
      ? lowHotels
      : budget === 'Medium'
      ? mediumHotels
      : highHotels

  hotels.forEach(hotel => {
    itinerary += `\n• ${hotel}`
  })

  return NextResponse.json({
    success: true,
    trip: itinerary,
  })
}