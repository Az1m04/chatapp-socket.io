import React from 'react';

function message({message,user}) {
    console.log(user,"DD");
  if (user) 
 { return (<div className='w-full flex justify-start mt-4 pl-4 '>
      <div className='bg-blue-400 p-4 rounded-md w-1/2 mr-4  flex justify-start text-white'>
      {`${user}: ${message}`}
  </div>
  </div>)
}
else {
    return (<div className='w-full flex justify-end '>
    <div className='bg-white p-4 rounded-md w-1/2 mr-4   text-black'>
    {`You: ${message}`}
</div>
</div>)
}}

export default message;
