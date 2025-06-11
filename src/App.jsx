import { Button, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import VideoPlayer from './components/videoPlayer';
import VideoUpload from './components/videoUpload';

function App() {
  const [videoId, setVideoId] = useState(
    '573cc103-d591-44a9-9a7b-0ed8e6db6cab'
  );

  const [fieldValue, setFieldValue] = useState('');

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full pl-24 pr-9">
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          autoClose={3000}
          theme="light"
        />
        <h1 className="text-3xl font-bold dark:bg-slate-900 dark:text-white mt-12 mb-4">
          Welcome to Video Streamimg App
        </h1>
        <div className="flex mt-12 space-x-12 w-full justify-between items-center">
          <div className="w-full">
            <h1 className="text-white text-2xl semi-bold text-center mb-5">
              Playing Video
            </h1>
            <div>
              <VideoPlayer
                src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}
              />
            </div>
          </div>
          <div className="w-full">
            <VideoUpload />
          </div>
        </div>
        <div className="mt-12 flex space-x-3">
          <div className="w-full">
            <TextInput
              onChange={(e) => setFieldValue(e.target.value)}
              name="videoId_field"
              placeholder="Enter Video ID"
            />
          </div>
          <div>
            <Button
              onClick={() => setVideoId(fieldValue)}
              className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800"
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
