import React from "react";
function DetailsContact({ userClicked }) {
  return (
    <div className="rounded-md shadow-md w-[300px] h-[300px] mt-6 bg-gray-100 mx-4">
      <div className="flex justify-center py-4">
        <img
          src="https://source.unsplash.com/random/110x110"
          className="rounded-full"
          alt=""
        />
      </div>
      <div className="pl-4">
        <h1 className="flex justify-start">Email:</h1>
        {userClicked && userClicked.username && <h2 className="flex justify-start">{userClicked.username}</h2>}
        <h2 className="flex justify-start">{userClicked.email}</h2>
        <div className="mt-1 flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1 ">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Online</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsContact;
