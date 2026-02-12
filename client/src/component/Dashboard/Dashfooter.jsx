import React from 'react'

const DashFooter = () => {
    return (
        <footer className="border-t border-gray-100 bg-white">
            <div className="mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
                <p>
                    &copy; {new Date().getFullYear()} The Dashboard.
                </p>
                
            </div>
        </footer>
    )
}

export default DashFooter