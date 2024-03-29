import React from 'react'

function AutoSaveLine({ success }: { success: any }) {
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-xl font-bold text-green-500 ">
          Saved up to this point.
        </p>
        <div className="h-1 w-[80%] rounded-3xl bg-green-500"></div>
        <p className=" italic text-[#a8a8a8]">Pictures Do Not Auto Save</p>
      </div>
    )
  } else if (success === false) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-xl font-bold text-red-500 ">
        <h1 className="text-4xl">DO NOT CONTINUE!</h1>
        <p>Not saved up to this point. Please finish the packet in person.</p>
        <div className="h-1 w-[80%] rounded-3xl bg-red-500"></div>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default AutoSaveLine
