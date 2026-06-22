export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          AI Travel Planner ✈️
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Plan your dream trip with AI-generated itineraries
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </a>

          <a
            href="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
}