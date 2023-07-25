import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from "../../../axios";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import '../../firebase'

const Share = () => {
  // const [file, setFile] = useState(null);
  // const [desc, setDesc] = useState("");
  const [postfile, setpostFile] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl,setImageurl] = useState("");
  // const upload = async () => {
  //   try {
  //     console.log(postfile);
  //     const formData = new FormData();
  //     formData.append("image", postfile); // Use "image" as the field name
  //     const res = await makeRequest.post("/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
    
  );
  
  useEffect(() => {
    setDescription("");
    setpostFile(null);
  }, []);
  

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let imgUrl = "";
  //     if (file) imgUrl = await upload();
  //     mutation.mutate({ desc, img: imgUrl, userId: currentUser.id });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postfile, description);
    const fileName = new Date().getTime() + postfile.name;
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, postfile);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((image) => {
          console.log('File available at', image);
          setImageurl(image);

          // Call the mutation function here with the newPost object
          // instead of directly passing it
          mutation.mutate({ 
            desc: description, 
            img: image, 
            userId: currentUser.id, 
            createdAt: Date.now() 
          });
          
          // Reset form after successful post creation
          setpostFile(null);
          setDescription("");
        });
      }
    );
  };

  console.log(imageUrl);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="right">
            {postfile && <img className="file" alt="" src={URL.createObjectURL(postfile)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setpostFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;


// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/authContext";
// import { useMutation, useQueryClient } from 'react-query';
// import { makeRequest } from "../../../axios";
// import "./share.scss";
// import Image from "../../assets/img.png";
// import Map from "../../assets/map.png";
// import Friend from "../../assets/friend.png";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import '../../firebase'

// const Share = () => {
//   // const [file, setFile] = useState(null);
//   // const [desc, setDesc] = useState("");
//   const [postfile, setpostFile] = useState(null);
//   const [description, setDescription] = useState("");
//   const [imageUrl,setImageurl] = useState("");
//   // const upload = async () => {
//   //   try {
//   //     console.log(postfile);
//   //     const formData = new FormData();
//   //     formData.append("image", postfile); // Use "image" as the field name
//   //     const res = await makeRequest.post("/upload", formData);
//   //     return res.data;
//   //   } catch (err) {
//   //     console.log(err);
//   //     return null;
//   //   }
//   // };

//   const { currentUser } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (newPost) => {
//       return makeRequest.post("/posts", newPost);
//     },
    
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
    
//   );
  
//   useEffect(() => {
//     setDescription("");
//     setpostFile(null);
//   }, []);
  

//   // const handleClick = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     let imgUrl = "";
//   //     if (file) imgUrl = await upload();
//   //     mutation.mutate({ desc, img: imgUrl, userId: currentUser.id });
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(postfile, description);
//     const fileName = new Date().getTime() + postfile.name;
//     const storage = getStorage();
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, postfile);
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//                 case 'paused':
//                     console.log('Upload is paused');
//                     break;
//                 case 'running':
//                     console.log('Upload is running');
//                     break;
//             }
//         },
//         (error) => {
//             console.log(error);
//         },
//         () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((image) => {
//                 console.log('File available at', image);
//                 setImageurl(image);
//                 //createPost(dispatch, { userId, image, description })
//             });
//         }
//     );

    
//     mutation.mutate(newPost);
//     setpostFile(null);
//     setDescription("");
// }
// console.log(imageUrl);
// const newPost = {
//   desc:description,
//   userId:currentUser.id,
//   createdAt:Date.now(),
//   image:imageUrl

// }
// console.log(newPost);
//   return (
//     <div className="share">
//       <div className="container">
//         <div className="top">
//           <div className="left">
//             <img
//               src={currentUser.profilePic}
//               alt=""
//             />
//             <input
//               type="text"
//               placeholder={`What's on your mind ${currentUser.name}?`}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="right">
//             {postfile && <img className="file" alt="" src={URL.createObjectURL(postfile)} />}
//           </div>
//         </div>
//         <hr />
//         <div className="bottom">
//           <div className="left">
//             <input
//               type="file"
//               id="file"
//               style={{ display: "none" }}
//               onChange={(e) => setpostFile(e.target.files[0])}
//             />
//             <label htmlFor="file">
//               <div className="item">
//                 <img src={Image} alt="" />
//                 <span>Add Image</span>
//               </div>
//             </label>
//             <div className="item">
//               <img src={Map} alt="" />
//               <span>Add Place</span>
//             </div>
//             <div className="item">
//               <img src={Friend} alt="" />
//               <span>Tag Friends</span>
//             </div>
//           </div>
//           <div className="right">
//             <button onClick={handleSubmit}>Post</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;