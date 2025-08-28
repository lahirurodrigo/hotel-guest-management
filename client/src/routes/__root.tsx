import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

// Root route for the entire app
export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen bg-gray-50">
            {/* navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-gray-800">Hotel Guest Management</Link>
                        <Link to="/guests" className="text-blue-600 hover:text-blue-800 font-medium">Guests</Link>
                        <Link to="/guests/new" className="text-blue-600 hover:text-blue-800 font-medium">Add Guest</Link>
                    </div>
                </div>
            </nav>
            {/* main content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <Outlet/>
            </main>
            
        </div>
    ),
})