import "./update.scss";
import "../../firebase";
import "firebase/storage";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../../axios";

export const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedUser) => {
      return makeRequest.put(`/users/${user.id}`, updatedUser);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleImageUpload = async (file, type) => {
    const storageRef = firebase.storage().ref();
    const fileName = Date.now() + "-" + file.name;
    const imageRef = storageRef.child(`images/${fileName}`);

    try {
      // Upload the image to Firebase Storage
      const snapshot = await imageRef.put(file);
      // Get the download URL for the uploaded image
      const downloadURL = await snapshot.ref.getDownloadURL();

      // Determine which state to update based on the 'type' parameter
      if (type === "cover") {
        setCover(downloadURL);
      } else if (type === "profile") {
        setProfile(downloadURL);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Upload cover and profile images if they are selected
    if (cover) {
      handleImageUpload(cover, "cover");
    }
    if (profile) {
      handleImageUpload(profile, "profile");
    }

    // Prepare the updated user data based on the form inputs
    const updatedUser = {
      name: texts.name,
      city: texts.city,
      website: texts.website,
      // Add cover and profile image URLs to the user object if they are available
      ...(cover && { cover: cover }),
      ...(profile && { profile: profile }),
    };

    // Call the mutation function to update the user data
    mutation.mutate(updatedUser);

    // Reset form after successful update
    setCover(null);
    setProfile(null);
    setTexts({
      name: "",
      city: "",
      website: "",
    });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <h2>Update</h2>
      <form>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input
          type="text"
          name="name"
          value={texts.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="city"
          value={texts.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="website"
          value={texts.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button onClick={handleClick}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>Close</button>
    </div>
  );
};
 


// export const Update = ({ setOpenUpdate, user }) => {
//   const [cover, setCover] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [texts, setTexts] = useState({
//     name: "",
//     city: "",
//     website: "",
//   });

//   const handleChange = (e) => {
//     setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     (user) => {
//       return makeRequest.put("/users", user);
//     },
    
//     {
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["user"]);
//       },
//     }
    
//   );

//   const handleImageUpload = async (file, type) => {
//     const storageRef = firebase.storage().ref();
//     const fileName = Date.now() + '-' + file.name;
//     const imageRef = storageRef.child(`images/${fileName}`);

//     try {
//       // Upload the image to Firebase Storage
//       const snapshot = await imageRef.put(file);
//       // Get the download URL for the uploaded image
//       const downloadURL = await snapshot.ref.getDownloadURL();

//       // Determine which state to update based on the 'type' parameter
//       if (type === 'cover') {
//         setCover(downloadURL);
//       } else if (type === 'profile') {
//         setProfile(downloadURL);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     // Upload cover and profile images if they are selected
//     if (cover) {
//       handleImageUpload(cover, 'cover');
//     }
//     if (profile) {
//       handleImageUpload(profile, 'profile');
//     }

//     setCover(null);
//     setProfile(null);
//     setTexts({
//       name: "",
//       city: "",
//       website: "",
//     });
//     setOpenUpdate(false);
//   };

//   return (
//     <div className="update">
//       <h2>Update</h2>
//       <form>
        
//           <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        
//           <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
       
//           <input type="text" name="name" value={texts.name} onChange={handleChange} />
        
//           <input type="text" name="city" value={texts.city} onChange={handleChange} />
       
//           <input type="text" name="website" value={texts.website} onChange={handleChange} />
        
//         <button onClick={handleClick}>Update</button>
//       </form>
//       <button onClick={() => setOpenUpdate(false)}>Close</button>
//     </div>
//   );
// };




// export const Update = ({setOpenUpdate}) => {
//   const [cover, setCover] = useState(null)
//   const [profile, setProfile] = useState(null)
//   const [texts, setTexts] = useState({
//     name: "",
//     city: "",
//     website: "",
//   });

//   const handleChange = (e) => {
//     setTexts((prev) => ({...prev, [e.target.name]: [e.target.value] }))
//   };

//   return (
//     <div className="update">
//       Update
//       <form>
//       <input type="file" />
//       <input type="file" />
//       <input type="text" name="name" onChange={handleChange}/>
//       <input type="text" name="city" onChange={handleChange}/>
//       <input type="text" name="website" onChange={handleChange}/>
//       </form>
     
//       <button onClick={()=> setOpenUpdate(false)}>X</button>
//       </div>
//   )
// }
