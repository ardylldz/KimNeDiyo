import React, { useEffect, useState,ChangeEvent, FormEvent} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

export interface ISecondPageProps {};

export interface News {
  id: number;
  header: string;
  content: string;
}

export interface CreateNewsDto {
  header: string;
  content: string | null;
  image: File | null;
}


const SecondPage: React.FunctionComponent<ISecondPageProps> = (props) => {
  const [news, setNews] = useState<News[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<News[]>("http://localhost:8080/api/news", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleHeader = (event: ChangeEvent<HTMLInputElement>) => {
          setHeader(event.target.value);
      };

  const handleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(event.target.value);
      };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };


    const handlePost = (e: FormEvent) => {
       e.preventDefault();

       const formData = new FormData();
       formData.append('header', header);
       formData.append('content', content);
       if (image) {
         formData.append("img", image);
       }

       fetch("http://localhost:8080/api/news", {
         method: "POST",
         headers: {
           "Authorization": `Bearer ${token}`,
           "Content-Type": "multipart/form-data"
         },
         body: formData
       })
         .then((response) => {
           if (response.ok) {

             window.location.reload();
           } else {
             throw new Error("Invalid attempt");
           }
         })
         .catch((error) => {
           alert(error.message);
         });
     };



  /*const handlePost = () => {
    const dto: CreateNewsDto = { header: header, content: content};
    fetch("http://localhost:8080/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    })
      .then((response) => {
        if (response.status === 200) {
          // Post was successfully created, refresh the page to see the updated list of posts
          window.location.reload();
        } else {
          throw new Error("Invalid attempt");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };*/



   /*const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";

    const [img, setImg] = useState<string | undefined>(undefined);

     const fetchImage = async () => {
       const res = await fetch(imageUrl);
       const imageBlob = await res.blob();
       const imageObjectURL = URL.createObjectURL(imageBlob);
       setImg(imageObjectURL);
     };

     useEffect(() => {
       fetchImage();
     }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleUploadImage = () => {
      // Here, you can send the selectedImage data to the server using an HTTP POST request or other methods for image upload.
      // For example, you can use the Fetch API or Axios to send the image data to your server.
      // Once the image is uploaded and processed on the server, you can handle the response accordingly.
      console.log('Upload image data:', selectedImage);


      <div>
                   <h1>Image Upload</h1>
                   <input type="file" accept="image/*" onChange={handleImageChange} />
                   {selectedImage && <img src={selectedImage} alt="Selected" width="200" height="200" />}
                   <button onClick={handleUploadImage}>Upload Image</button>
                 </div>

              <img src={img} alt="icons" />
      <div>
                         <label htmlFor="header">Header:</label>
                         <input
                                             type="text"
                                             id="header"
                                             name="header"
                                             onChange={handleHeader}
                                             value={header}
                                             required/>
                     </div>

                     <div>
                         <label htmlFor="content">Content:</label>
                         <input
                                             type="textarea"
                                             id="content"
                                             name="content"
                                             onChange={handleContent}
                                             value={content}
                                             required/>
                     </div>

            <button type="submit" onClick={handlePost}>Add a post</button>
    };*/


  return (
    <div>
      <h1>NEWS</h1>
       <div>
            <h2>Add News:</h2>
            <input type="text" value={header} onChange={handleHeader} placeholder="Header" />
                  <textarea value={content || ''} onChange={handleContent} placeholder="Content" />
                  <input type="file" onChange={handleImage} />
                  <button onClick={handlePost}>Submit</button>
          </div>
       <ul>
        {news.map((item) => (
                  <li
                  key={item.id}>
                  <h2>{item.header}</h2>
                  <p>{item.content}</p>
                  </li>
                ))}
            </ul>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export default SecondPage;

