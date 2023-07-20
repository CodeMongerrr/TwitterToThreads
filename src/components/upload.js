import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#111111",
    color: "#ffffff",
  },
  fileInput: {
    display: "none", // Hide the file input element
  },
  text: {
    fontSize: "30px",
  },
  dropzone: {
    border: "5px dashed #aaaaaa",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "40px",
    transition: "background-color 0.3s ease-in-out", // Add a transition effect for the background color change
    "&.uploaded": {
      backgroundColor: "#007bff", // Change the background color to blue when uploaded
    },
  },
  dragdrop: {
    padding: "30px",
    "&.uploaded": {
      backgroundColor: "#dddddd", // Change the background color to blue when uploaded
    },
  },
}));

const ExtractedData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection to the server
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (event) => {
      console.log("Enter hua hai yaha pe ");
      const jsonStartIndex = event.data.indexOf("["); // Find the first curly brace
      const Data = JSON.parse(event.data.slice(jsonStartIndex));
      setData(Data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      console.log(data);
    };

    // Cleanup the WebSocket connection on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {/* Display the extracted JSON data on the frontend */}
      {data ? <pre>{}</pre> : <p>Loading data...</p>}
    </div>
  );
};

const Upload = () => {
  const classes = useStyles();
  const [extracted, setExtracted] = useState(false);

  const handleNotificationClick = () => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported in this browser.");
      return;
    }
    if (Notification.permission === "granted") {
      sendPushNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          sendPushNotification();
        }
      });
    }
  };

  const sendPushNotification = () => {
    // Send a push notification to the Service Worker
    if(navigator.serviceWorker){
      alert("Yes")
    }
    else{
      alert("No")
    }
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then((subscription) => {
        console.log("Enter ho gaya hai ");

        if (subscription) {
          console.log("idhar bhi ");

          const payload = {
            title: "New Message",
            body: "You have a new message!",
            image: "https://example.com/image.jpg",
            customData: "Some custom data",
          };

          // Send a request to your server to trigger the push event
          axios
            .post("http://localhost:5000/api/sendNotification", {
              subscription: subscription,
            })
            .then((response) => {
              console.log("Push notification sent successfully");
            })
            .catch((error) => {
              console.error("Error sending push notification:", error);
            });
        } else {
          // If the user hasn't subscribed yet, ask for permission
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: "BBbcw4os1iBKmtHck2tk4aIVipYP0svn6Uno0IxTxxwZEMvmqDYjLX1CKHsyQpwQbmK1uGRBRCK84BwZn-00LBc", // Replace with your VAPID public key
            })
            .then((newSubscription) => {
              // Save the new subscription to your server if needed
              console.log(
                "User subscribed to push notifications:",
                newSubscription
              );
              // Now, you can call sendPushNotification again to send the notification
              sendPushNotification();
            })
            .catch((error) => {
              console.error("Error subscribing to push notifications:", error);
            });
        }
      });
    });
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();

    try {
      formData.append("zipFile", file);

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(
        "http://localhost:5000/api/upload",
        requestOptions
      );

      if (response.ok) {
        setExtracted(true);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    // Add any visual cues to indicate the drag target (e.g., change border color)
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    // Remove any visual cues from the drag target (e.g., revert border color)
  };

  const handleDropzoneClick = () => {
    // Programmatically click the hidden file input when the dropzone is clicked
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>Upload Zip and Send Push Notification</div>
      <div className={`${classes.dropzone} ${extracted ? "uploaded" : ""}`}>
        <div
          className={`${classes.dropzone} ${extracted ? "uploaded" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={handleDropzoneClick}
        >
          Drag and drop or click to select
        </div>
        <input
          type="file"
          accept=".zip"
          className={classes.fileInput}
          id="fileInput"
          onChange={handleDrop}
        />
      </div>
      {extracted && <p>Files extracted successfully!</p>}
      {extracted && <ExtractedData />}
      <button onClick={handleNotificationClick}>Send Push Notification</button>
    </div>
  );
};

export default Upload;