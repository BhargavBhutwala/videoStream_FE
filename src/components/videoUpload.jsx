import axios from 'axios';
import {
  Alert,
  Button,
  Card,
  FileInput,
  Label,
  Progress,
  Textarea,
  TextInput,
} from 'flowbite-react';
import { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    courseId: 1,
  });

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    // console.log(e.target.files[0]);
    setFile(selectedFile);
  }

  function handleVideoData(e) {
    setVideoData({
      ...videoData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Button Clicked');

    if (!file) {
      toast.error('Please add a video file');
      return;
    }

    // submit data to server
    saveDataToServer(file, videoData);
  }

  async function saveDataToServer(file, videoMetaData) {
    setUploading(true);
    // api call
    const data = new FormData();
    data.append('file', file);
    data.append('title', videoMetaData.title);
    data.append('description', videoMetaData.description);
    data.append('courseId', videoMetaData.courseId);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/videos/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        }
      );
      console.log(response);
      setMessage(
        'Video uploaded successfully! Video ID: ' + response.data.videoId
      );
      setUploading(false);
      setProgress(0);
    } catch (error) {
      console.log(error);
      setUploading(false);
      setProgress(0);
      setMessage('Video upload failed!');
    }
  }

  return (
    <div className="max-w-lg w-full items-center justify-center mt-3">
      {message && (
        <Alert
          color={
            message.startsWith('Video uploaded successfully!')
              ? 'success'
              : 'failure'
          }
          icon={HiInformationCircle}
          onDismiss={() => setMessage('')}
          rounded
        >
          <span className="font-medium">{message}</span>
        </Alert>
      )}
      <Card className="dark:bg-slate-800 mt-6 flex flex-col">
        <h1 className="text-2xl font-bold dark:text-white text-center">
          Upload Video
        </h1>
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex max-w-md flex-col gap-3">
            <div className="mb-3">
              <div className="mb-2 block">
                <Label htmlFor="title">Video Title</Label>
              </div>
              <TextInput
                id="title"
                name="title"
                type="text"
                onChange={handleVideoData}
                placeholder="My First Video"
                sizing="md"
              />
            </div>
            <div className="max-w-md mb-3">
              <div className="mb-2 block">
                <Label htmlFor="description">Video Description</Label>
              </div>
              <Textarea
                id="description"
                name="description"
                onChange={handleVideoData}
                placeholder="Write something..."
                rows={4}
              />
            </div>
            <div className="mb-3">
              <Label className="mb-2 block" htmlFor="file-upload">
                Upload file
              </Label>
              <FileInput onChange={handleFileChange} id="file-upload" />
            </div>
            <div className="mb-3 flex flex-col">
              {uploading && (
                <Progress
                  progress={progress}
                  color="yellow"
                  size="xl"
                  textLabel="Uploading..."
                  textLabelPosition="outside"
                  labelProgress
                  labelText
                />
              )}
            </div>
            <div className="items-center justify-center flex mt-3">
              <Button
                disabled={uploading}
                type="submit"
                color="green"
                className="rounded-lg w-2/4"
              >
                Upload
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default VideoUpload;
