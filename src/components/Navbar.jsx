import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { FaTasks } from 'react-icons/fa'; // Example icon for the app name
import { motion } from 'framer-motion'; // For animation

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }} // Slightly enlarge and rotate on hover
            transition={{ duration: 0.3 }}
          >
            <FaTasks className="text-gray-800 text-3xl" />
          </motion.div>
          <Link
            to="/"
            className="text-gray-800 text-2xl font-bold hover:text-gray-600 transition duration-300 flex items-center space-x-2"
          >
            <motion.span
              whileHover={{ scale: 1.1 }} // Slightly enlarge text on hover
              transition={{ duration: 0.3 }}
            >
              ToDoList
            </motion.span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
