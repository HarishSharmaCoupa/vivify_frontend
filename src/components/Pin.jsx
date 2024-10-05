import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import { categories } from '../utils/data';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  
  const userInfo = fetchUser()
  const navigate = useNavigate();
  console.log(pin)
  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin.id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out'
      >
        {pin.image && (
          <img
            className='w-full rounded-lg mt-5'
            src={"http://localhost:3001/" + pin.image.url}
            alt='user post'
          />
        )}

        {postHovered && (
          <div
            className='absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ pointerEvents: 'none' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${pin.image}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className='bg-white w-9 h-9 p-2 mt-5 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  style={{ pointerEvents: 'auto' }}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
          
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
