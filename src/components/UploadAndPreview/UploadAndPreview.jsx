import "./styles.css";
import { useState } from 'react';
import GenerateThumbnails from "../GenerateThumbnails/GenerateThumbnails";


function UploadAndPreview() {
  const [key, setKey] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setKey((prevKey) => prevKey + 1); // Increment the key to force re-rendering of the media element
  };

  const renderMedia = () => {
    if (!selectedFile) {
      return null;
    }
    const { type } = selectedFile;
    let mediaURL = URL.createObjectURL(selectedFile);

    let mediaElement = null;
    if (type.startsWith('image/')) {
      mediaElement = <img style={{ height: "500px" }} src={mediaURL} alt="Preview" key={key} />;
    } else if (type.startsWith('audio/')) {
      mediaElement = (
        <audio controls key={key}>
          <source src={mediaURL} />
          Your browser does not support the audio tag.
        </audio>
      );
    } else if (type.startsWith('video/')) {
      mediaElement = (
        <video className="video" controls key={key} autoPlay muted>
          <source src={mediaURL} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      mediaElement = <p>Unsupported media type.</p>;
    }

    return (
      <>
        {mediaElement.type == "video" ?
          <>
            {mediaElement}
            <GenerateThumbnails videoUrl={mediaURL} /> {/* Instead of `HelloWorld` now we will have the thumbnails */}
          </>
          :
          <>
            {mediaElement}
          </>
        }

      </>
    );
  };

  return (
    <div className='container'>
      <input type="file" onChange={handleFileUpload} />
      {renderMedia()}
    </div>
  );
}

export default UploadAndPreview;