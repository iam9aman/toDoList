  import React, { useState, useEffect } from 'react';
  import { v4 as uuidv4 } from 'uuid';
  import { MdDelete } from 'react-icons/md';
  import { CiEdit } from 'react-icons/ci';
  import { FiPlus } from 'react-icons/fi';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { motion } from 'framer-motion';

  function Home() {
    const [data, setData] = useState('');
    const [store, setStore] = useState([]);
    const [doneWork, setDoneWork] = useState([]);
    const [visibility, setVisibility] = useState(true);
    const [editId, setEditId] = useState('');

    useEffect(() => {
      const storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
      const doneArray = JSON.parse(localStorage.getItem('DoneWork')) || [];
      setStore(storedArray);
      setDoneWork(doneArray);
    }, []);

    const handleChange = (e) => {
      setData(e.target.value);
    };

    const timeNow = () => {
      const now = new Date();
      const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      };
      return now.toLocaleString('en-IN', options);
    };

    const handleSubmit = () => {
      if (data.trim() === '') {
        toast.error('Please enter some work to do', { autoClose: 1500 });
        return;
      }

      if (editId) {
        // Handle editing an existing item
        const updatedArray = store.map(item =>
          item.id === editId ? { ...item, data, time: timeNow() } : item
        );
        localStorage.setItem('DataArr', JSON.stringify(updatedArray));
        setStore(updatedArray);
        toast.success('Task updated successfully', { autoClose: 1500 });
        setEditId('');
      } else {
        // Handle adding a new item
        const newItem = { id: uuidv4(), data, time: timeNow() };
        const newArray = [...store, newItem];
        localStorage.setItem('DataArr', JSON.stringify(newArray));
        setStore(newArray);
        toast.success('Task added successfully', { autoClose: 1500 });
      }
      
      setData('');
      setVisibility(true);
    };

    const handleCheck = (e) => {
      const checkedItem = store.find(item => item.id === e.target.id);
      if (checkedItem) {
        checkedItem.time = timeNow();
        const newDoneWork = [...doneWork, checkedItem];
        localStorage.setItem('DoneWork', JSON.stringify(newDoneWork));
        setDoneWork(newDoneWork);

        const newPendingArray = store.filter(item => item.id !== e.target.id);
        localStorage.setItem('DataArr', JSON.stringify(newPendingArray));
        setStore(newPendingArray);
        toast.info('Task marked as completed', { autoClose: 1500 });
      }
    };

    const handleEditButton = (id) => {
      setVisibility(false);
      setEditId(id);
      const itemToEdit = store.find(item => item.id === id);
      if (itemToEdit) {
        setData(itemToEdit.data);
      }
    };

    const deletetaskDoneWork = (id) => {
      const updatedDoneArray = doneWork.filter(item => item.id !== id);
      localStorage.setItem('DoneWork', JSON.stringify(updatedDoneArray));
      setDoneWork(updatedDoneArray);
      toast.error('Task deleted from finished work', { autoClose: 1500 });
    };

    const deletetaskPendingWork = (id) => {
      const updatedPendingArray = store.filter(item => item.id !== id);
      localStorage.setItem('DataArr', JSON.stringify(updatedPendingArray));
      setStore(updatedPendingArray);
      toast.error('Task deleted from pending work', { autoClose: 1500 });
    };

    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-100 to-pink-100 min-h-screen">
        <ToastContainer />
        <div className={`flex gap-x-2 justify-center ${visibility ? '' : 'hidden'} mb-8`}>
          <input
            type="text"
            required
            value={data}
            onChange={handleChange}
            className="px-4 py-2 border-2 w-72 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white"
            placeholder="Enter task"
          />
          <button
            className="p-3 border-2 w-16 border-gray-300 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            onClick={handleSubmit}
          >
            <FiPlus className="text-xl" />
          </button>
        </div>
        <div className={`flex gap-x-2 justify-center ${visibility ? 'hidden' : ''} mb-8`}>
          <input
            type="text"
            required
            value={data}
            onChange={handleChange}
            className="px-4 py-2 border-2 w-72 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-white"
            placeholder="Enter task"
          />
          <button
            className="p-3 border-2 w-16 border-gray-300 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            onClick={handleSubmit}
          >
            <FiPlus className="text-xl" />
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Pending Works</h2>
          {store.length ? (
            store.map(item => (
              <motion.div
                key={item.id}
                className="flex gap-x-4 my-4 justify-between items-center p-4 max-w-4xl w-[90vw] border-b-2 border-gray-300 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input type="checkbox" id={item.id} onChange={handleCheck} />
                <div className="flex flex-col pr-6 gap-y-1 w-full">
                  <p className="text-lg font-medium text-gray-700 break-words">{item.data}</p>
                  <p className="text-sm text-gray-600">Updated on: {item.time}</p>
                  <div className="flex gap-x-2 mt-2">
                    <CiEdit className="text-blue-500 hover:text-blue-700 transition duration-300 cursor-pointer text-xl" onClick={() => handleEditButton(item.id)} />
                    <MdDelete className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer text-xl" onClick={() => deletetaskPendingWork(item.id)} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">You do not have any pending work</p>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Finished Works</h2>
          {doneWork.length ? (
            doneWork.map(item => (
              <motion.div
                key={item.id}
                className="flex gap-x-4 my-4 w-[90vw] justify-between items-center p-4 max-w-4xl w-full border-b-2 border-gray-300 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-y-1 w-full">
                  <p className="text-lg font-medium text-gray-700 break-words">{item.data}</p>
                  <p className="text-sm text-gray-600">Finished at: {item.time}</p>
                  <div className="flex gap-x-2 mt-2">
                    <MdDelete className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer text-xl" onClick={() => deletetaskDoneWork(item.id)} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">You have not done anything yet</p>
          )}
        </div>
      </div>
    );
  }

  export default Home;
