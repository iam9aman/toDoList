import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

function Home() {
  let [data, setData] = useState('');
  let [dateWithData, setDateWithData] = useState();
  let [store, setStore] = useState(true);
  let [visibility, setVisibility] = useState(true);
  let [editId, setEditId] = useState('');

  let storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
  let doneArray = JSON.parse(localStorage.getItem('DoneWork')) || [];

  useEffect(() => {
    storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
  }, [store]);

  let handleChange = (e) => {
    setData(e.target.value);
  };

  let timeNow = () => {
    const now = new Date();
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const formattedDate = now.toLocaleString('en-IN', options);
    return formattedDate;
  };

  let handleMouseOver = () => {
    let time = timeNow();
    setDateWithData({ id: uuidv4(), data, time });
  };

  let handleSubmit = () => {
    if (data === '') {
      alert('Please enter some work to do');
    } else {
      if (editId) {
        const storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
        let editOne = storedArray.find((item) => item.id === editId);
        let wholeArrayExceptEdit = storedArray.filter((item) => item.id !== editId);
        editOne.data = data;
        wholeArrayExceptEdit.push(editOne);
        localStorage.setItem('DataArr', JSON.stringify(wholeArrayExceptEdit));
        setStore(!store);
      } else {
        const storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
        if (storedArray) {
          storedArray.push(dateWithData);
          localStorage.setItem('DataArr', JSON.stringify(storedArray));
        } else {
          localStorage.setItem('DataArr', JSON.stringify([dateWithData]));
        }
        setData('');
        setVisibility(true);
      }
    }
  };

  let handleCheck = (e) => {
    let doneWork = storedArray.find((list) => list.id === e.target.id);
    doneWork.time = timeNow();
    const doneWorkFromLocal = JSON.parse(localStorage.getItem('DoneWork')) || [];

    if (doneWorkFromLocal) {
      doneWorkFromLocal.push(doneWork);
      localStorage.setItem('DoneWork', JSON.stringify(doneWorkFromLocal));
    } else {
      localStorage.setItem('DoneWork', JSON.stringify([doneWork]));
    }

    let newPendingWork = storedArray.filter((list) => list.id !== e.target.id);
    localStorage.setItem('DataArr', JSON.stringify(newPendingWork));
    setStore(!store);
  };

  let handleEditButton = async (e) => {
    setVisibility(false);
    setEditId(e);
    let editWork = storedArray.find((list) => list.id === e);
    setData(editWork.data);
  };

  let deletetaskDoneWork = (e) => {
    const storedArray = JSON.parse(localStorage.getItem('DoneWork')) || [];
    let filterData = storedArray.filter((item) => item.id !== e);
    localStorage.setItem('DoneWork', JSON.stringify(filterData));
    setStore(!store);
  };

  let deletetaskPendingWork = (e) => {
    const storedArray = JSON.parse(localStorage.getItem('DataArr')) || [];
    let filterData = storedArray.filter((item) => item.id !== e);
    localStorage.setItem('DataArr', JSON.stringify(filterData));
    setStore(!store);
  };

  return (
    <>
      <div className={`flex gap-x-2 justify-center ${visibility ? '' : 'hidden'}`}>
        <input
          type="text"
          required
          value={data}
          onChange={handleChange}
          className="px-4 py-2 border-2 w-72 border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Enter task"
        />
        <button
          className="px-4 py-2 border-2 w-24 border-gray-400 rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
          onMouseOver={handleMouseOver}
        >
          Submit
        </button>
      </div>
      <div className={`flex gap-x-2 justify-center ${visibility ? 'hidden' : ''}`}>
        <input
          type="text"
          required
          value={data || ''}
          onChange={handleChange}
          className="px-4 py-2 border-2 w-72 border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Enter task"
        />
        <button
          className="px-4 py-2 border-2 w-24 border-gray-400 rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
          onMouseOver={handleMouseOver}
        >
          Submit
        </button>
      </div>
      <div className="mt-8">
        {storedArray && storedArray.length ? (
          storedArray.map((item) => (
            <div key={item.id} className="flex gap-x-4 my-4 justify-center items-center p-4 border-b-2 border-gray-300">
              <input onChange={handleCheck} type="checkbox" id={item.id} />
              <div className="flex gap-x-20 w-full items-center">
                <p className="w-56 break-words">{item.data}</p>
                <p className="text-sm text-gray-600">Updated on: {item.time}</p>
                <CiEdit className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300" onClick={() => handleEditButton(item.id)} />
                <MdDelete className="cursor-pointer text-red-500 hover:text-red-700 transition duration-300" onClick={() => deletetaskPendingWork(item.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">You do not have any pending work</p>
        )}
      </div>
      <div className="mt-8">
        {doneArray && doneArray.length > 0 ? (
          doneArray.map((item) => (
            <div key={item.id} className="flex gap-x-4 my-4 justify-center items-center p-4 border-b-2 border-gray-300">
              <div className="flex gap-x-20 w-full items-center">
                <p className="w-56 break-words">{item.data}</p>
                <p className="text-sm text-gray-600">Finished at: {item.time}</p>
                <MdDelete className="cursor-pointer text-red-500 hover:text-red-700 transition duration-300" onClick={() => deletetaskDoneWork(item.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">You have not done anything yet</p>
        )}
      </div>
    </>
  );
}

export default Home;
