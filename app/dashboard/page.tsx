'use client'

import {useState} from 'react'

export default function Dashboard() {
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState('')
  const [budget, setBudget] = useState('Medium')
  const [interests, setInterests] = useState('')
  const [trip, setTrip] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    try {
      setLoading(true)

      const res = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          days,
          budget,
          interests,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setTrip(data.trip)
      } else {
        alert('Failed to generate trip')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">
          AI Travel Planner ✈️
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Number of Days"
            value={days}
            onChange={e => setDays(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <select
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="Low">Low Budget</option>
            <option value="Medium">Medium Budget</option>
            <option value="High">High Budget</option>
          </select>

          <input
            type="text"
            placeholder="Interests (Food, Shopping, Adventure)"
            value={interests}
            onChange={e => setInterests(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </button>
        </div>

        {trip && (
          <div className="mt-8 bg-gray-50 border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Generated Itinerary
            </h2>

            <pre className="whitespace-pre-wrap text-gray-800">
              {trip}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}