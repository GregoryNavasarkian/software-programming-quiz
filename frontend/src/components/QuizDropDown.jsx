import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import axios from 'axios';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
}

const QuizDropDown = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    };
    try {
      await axios.delete(`/quiz/${id}`, config);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100">
          Quiz Options
          <AiOutlineArrowDown className="-mr-1 h-5 w-5 text-slate-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right rounded-md bg-slate-50 shadow-lg ring-1 ring-slate-800 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
                  <button 
                    onClick={handleDelete}
                    className={classNames(
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-900',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Delete Quiz
                  </button>
                  <hr />
                  <Link
                    to="/edit-quiz/:id"
                    className={classNames(
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-900',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit Quiz
                  </Link>
                  <hr />
                  <Link
                    to="/edit-quiz/:id"
                    className={classNames(
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-900',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Add Question
                  </Link>
                </>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default QuizDropDown;