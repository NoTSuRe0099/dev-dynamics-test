import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router';

const Navbar: React.FC<{ title?: string }> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 shadow-slate-50 rounded-lg">
        <nav className="relative w-full mx-auto flex justify-between items-center md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center gap-x-4">
            {props?.title && (
              <button
                onClick={() => navigate('/')}
                className="py-[7px] px-2.5 inline-flex items-center gap-1 font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              >
                <BiArrowBack /> Back
              </button>
            )}

            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 block"
              href="#"
              aria-label="Dashboard"
            >
              <img
                src="https://cdn.prod.website-files.com/642535c7875ea6e60927dd49/65cb115f23533388f1d0b7e2_DevDynamics_Logo.svg"
                alt="DevDynamics"

                className='h-7'
              />
            </a>
          </div>
          {props?.title && (
            <h1 className="font-semibold text-xl text-black">{props?.title}</h1>
          )}

          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1 grow">
              <div className="grow"></div>

              <div className=" flex flex-wrap items-center gap-x-1.5">
                <a
                  className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                  href="#"
                >
                  Sign in
                </a>
                <a
                  className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
