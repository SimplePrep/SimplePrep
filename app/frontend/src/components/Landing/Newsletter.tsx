import React from 'react';

const Notification = () => {
  return (
    <div className="w-full py-16 bg-green-400">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-8 p-2">
        <div className="lg:col-span-2 my-4 text-slate-600">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Want tips & tricks to optimize your study habits?
          </h1>
          <p className="text-xl">Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className="my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <input
              type="email"
              className="p-3 flex w-full rounded-md text-black"
              placeholder="Enter your Email"
            />
            <button className="w-full sm:w-[150px] hover:bg-blue-400 hover:text-white rounded-md font-medium py-3 sm:py-5">
              Notify Me
            </button>
          </div>
          <p className="mt-4 text-center sm:text-left text-slate-700">
            We care about the protection of your data. Read our{' '}
            <span className="text-blue-600">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
