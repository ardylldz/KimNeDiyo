import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SecondPage.css";

export interface ISecondPageProps {}

export interface News {
  id: number;
  header: string;
  content: string;
  image: string | null; // Add the imageUrl property
}

export interface CreateNewsDto {
  header: string;
  content: string | null;
  image: File | null;
}

const SecondPage: React.FunctionComponent<ISecondPageProps> = (props) => {
  const [news, setNews] = useState<News[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<News[]>(
          "http://localhost:8080/api/news",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [token]);

  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    return () => {
      mySwiper.destroy();
    };
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

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("header", header);
    formData.append("content", content);
    if (image) {
      formData.append("img", image);
    }

    try {
      const response = await fetch("http://localhost:8080/api/news", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Invalid attempt");
      }
    } catch (error) {
      console.error(error);
      alert("Error posting news");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (!token) {
        console.log("Token not available.");
        return;
      }
      await axios.delete(`http://localhost:8080/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const swiperRef = useRef(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const handleShowContent = (index: number) => {
    setCurrentContentIndex(index);
  };
  return (
    <div className="page-container">
      <div className="news-container">
        <h1 className="news-heading">NEWS</h1>
        <div className="add-news" style={{ width: "30%" }}>
          <h2 style={{ fontSize: "1.2rem" }}>Add News:</h2>
          <input
            type="text"
            value={header}
            onChange={handleHeader}
            placeholder="Header"
          />
          <textarea
            value={content}
            onChange={handleContent}
            placeholder="Content"
          />
          <input type="file" onChange={handleImage} />
          <button
            onClick={handlePost}
            style={{ fontSize: "1rem", padding: "5px 10px" }}
          >
            Submit
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center align the card vertically
            minHeight: "100vh",
          }}
        >
          <div
            className="swiper-container"
            ref={swiperRef}
            style={{ marginBottom: "100px" }}
          >
            <div className="swiper-wrapper">
              {news.map(
                (item, index) =>
                  currentContentIndex === index && (
                    <div
                      key={item.id}
                      className={`swiper-slide homepage-slide ${
                        currentContentIndex === index
                          ? "swiper-slide-active"
                          : ""
                      }`}
                      style={{ width: "330px", height: "455px" }}
                    >
                      <Card
                        style={{
                          width: "23rem",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "right",
                          margin: "auto", // Center align the card horizontally
                        }}
                      >
                        <div style={{ flex: 1, overflow: "hidden" }}>
                          <img
                            alt="News"
                            src={
                              item.image
                                ? `data:image/jpeg;base64,${item.image}`
                                : "https://picsum.photos/300/200"
                            }
                            style={{
                              width: "100%",
                              height: "110%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <CardBody style={{ position: "relative" }}>
                          <CardTitle tag="h3" style={{ fontWeight: "bold" }}>
                            {item.header}
                          </CardTitle>
                          <CardText>{item.content}</CardText>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </CardBody>
                        <div
                          className="content-buttons"
                          style={{ textAlign: "center" }}
                        >
                          {news.map((item, index) => (
                            <button
                              key={item.id}
                              onClick={() => handleShowContent(index)}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <Link to="/" className="go-home-link">
        Go Home
      </Link>
    </div>
  );
};

export default SecondPage;
