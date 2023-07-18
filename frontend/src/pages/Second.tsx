import React, { useEffect, useState,ChangeEvent } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import {CreateNewsDto} from "../dtos";

export interface ISecondPageProps {};

export interface News {
  id: number;
  header: string;
  content: string;
}
const SecondPage: React.FunctionComponent<ISecondPageProps> = (props) => {
  const [news, setNews] = useState<News[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');

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

  const handleContent = (event: ChangeEvent<HTMLInputElement>) => {
          setContent(event.target.value);
      };

  const handlePost = () => {
    const dto: CreateNewsDto = { header: header, content: content };
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
  };


  return (
    <div>
      <h1>NEWS</h1>
       <ul>
        {news.map((item) => (
                  <li
                  key={item.id}>
                  <h2>{item.header}</h2>
                  <p>{item.content}</p>
                  </li>
                ))}
            </ul>
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
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default SecondPage;

