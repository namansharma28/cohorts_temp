export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Cohorts</h1>
        <p className="text-lg text-gray-600 mb-8">Connect, collaborate, and grow together</p>
        <a 
          href="/login" 
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Login
        </a>
        <a 
          href="/signup" 
          className="inline-block bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors ml-4"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}