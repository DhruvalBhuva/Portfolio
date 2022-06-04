import React, { useState } from "react";
import axios from "axios";
import { Carousel, BackTop, message, Button } from "antd";

import AboutImg from "../assets/img/About.jpg";
import ProfileImg from "../assets/img/Profile.png";
import Project1Img from "../assets/img/Project1.png";
import Project2Img from "../assets/img/Project2.png";
import Project3Img from "../assets/img/Project3.png";

import {
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineArrowRight,
  AiOutlineArrowDown,
  AiFillExperiment,
  AiOutlineCloudDownload,
  AiTwotoneCalendar,
  AiFillCaretDown,
  AiOutlineAntCloud,
  AiOutlineDoubleRight,
  AiOutlineCloseCircle,
  AiFillStar,
  AiOutlineAppstoreAdd,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMouse, BiMailSend } from "react-icons/bi";
import {
  BsFront,
  BsServer,
  BsArrowDownRightSquareFill,
  BsSkype,
  BsFillCloudMoonFill,
} from "react-icons/bs";
import {
  FaGraduationCap,
  FaUniversity,
  FaRobot,
  FaSchool,
} from "react-icons/fa";

import "./style.css";

const Index = () => {
  const [qualificationTab, setQualificationTab] = useState("education");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, subject, description } = userData;
    if (name === "" || email === "" || subject === "" || description === "") {
      message.info("Enter All the details properly");
      setIsLoading(false);
      return;
    } else {
      const res = await axios.post(
        "https://dhruval-portfolio-server.herokuapp.com/contactMe",
        userData
      );
      if (res.status === 200) {
        message.info("Mail send Successfully, I'll contact you soon");
        setUserData({
          name: "",
          email: "",
          subject: "",
          description: "",
        });
      } else {
        message.error("Error in sending mail, Try Again");
      }
      setIsLoading(false);
    }
  };

  /*==================== MENU SHOW Y HIDDEN ====================*/

  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");
  /*===== MENU SHOW =====*/
  /* Validate if constant exists */
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  /*===== MENU HIDDEN =====*/
  /* Validate if constant exists */
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  /*==================== REMOVE MENU MOBILE ====================*/
  const navLinks = document.querySelectorAll(".nav__link");
  const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
  };
  navLinks.forEach((navLink) => navLink.addEventListener("click", linkAction));

  const changeQualificationTab = (value) => {
    setQualificationTab(value);
    const tab = document.querySelectorAll(".qualification__button");
    console.log(tab);
    tab.forEach((current) => {
      current.classList.remove("active-link");
    });
    document.getElementById(value).classList.add("active-link");
  };

  /*==================== ACCORDION SKILLS ====================*/
  const skillsContent = document.getElementsByClassName("skills__content");

  const toggleSkills = (e) => {
    let itemClass = e.target.parentNode.className;

    for (var i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = "skills__content skills__close";
    }

    if (itemClass === "skills__content skills__close") {
      e.target.parentNode.className = "skills__content skills__open";
    }
  };

  /*==================== SERVICES MODAL ====================*/

  const viewServices = (index) => {
    const modelViews = document.querySelectorAll(".services__model");
    modelViews[index].classList.add("active-model");
  };

  const closeServiceModel = () => {
    const modelViews = document.querySelectorAll(".services__model");
    const modelCloses = document.querySelectorAll(".services__model-close");
    modelCloses.forEach((modelClose) => {
      modelClose.addEventListener("click", () => {
        modelViews.forEach((modelView) => {
          modelView.classList.remove("active-model");
        });
      });
    });
  };

  const scrollActive = () => {
    const section = document.querySelectorAll("section[id");
    const scrollY = window.pageYOffset;
    section.forEach((current) => {
      const sectionheight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionheight) {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.add("active-link");
      } else {
        document
          .querySelector(".nav__menu a[href*=" + sectionId + "]")
          .classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive);

  /*==================== DARK LIGHT THEME ====================*/
  // const themeButton = document.getElementById("theme-button"),
  //   darkTheme = "dark-theme",
  //   iconTheme = "uil-sun";

  // // Previously seleted topic
  // const selectedTheme = localStorage.getItem("selected-theme");
  // const selectedIcon = localStorage.getItem("selected-icon");

  // // we obtain the current theme that the interface has by validating the dark-theme class
  // const getCurrentTheme = () => {
  //   document.body.classList.contains(darkTheme) ? "dark" : "light";
  // };
  // const getCurrentIcon = () => {
  //   themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
  // };

  // if (selectedTheme) {
  //   document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
  //     darkTheme
  //   );
  //   themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
  //     iconTheme
  //   );
  // }

  // // Activate/deactive the theme manually with the buttn
  // themeButton.addEventListener("click", () => {
  //   // Add or remove the dark/ icon theme
  //   document.body.classList.toggle(darkTheme);
  //   themeButton.classList.toggle(iconTheme);

  //   // We save the theme and the current icon that the user chose
  //   localStorage.setItem("selected-theme", getCurrentTheme());
  //   localStorage.setItem("selected-icon", getCurrentIcon());
  // });
  return (
    <div onScroll={scrollActive}>
      <BackTop />
      {/* // <!--==================== HEADER ====================--> */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav__logo">
            Dhruval Bhuva
          </a>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list grid">
              <li className="nav__item">
                <a href="#home" className="nav__link active-link">
                  <i className="uil uil-estate nav__icon"></i> Home
                </a>
              </li>
              <li className="nav__item">
                <a href="#about" className="nav__link">
                  <i className="uil uil-user nav__icon"></i> About
                </a>
              </li>
              <li className="nav__item">
                <a href="#skills" className="nav__link">
                  <i className="uil uil-file-alt nav__icon"></i> Skills
                </a>
              </li>
              <li className="nav__item">
                <a href="#portfolio" className="nav__link">
                  <i className="uil uil-scenery nav__icon"></i> Projects
                </a>
              </li>
              <li className="nav__item">
                <a href="#services" className="nav__link">
                  <i className="uil uil-briefcase-alt nav__icon"></i> Services
                </a>
              </li>

              <li className="nav__item">
                <a href="#contact" className="nav__link">
                  <i className="uil uil-description nav__icon"></i> ContactMe
                </a>
              </li>
            </ul>
            <AiOutlineCloseCircle className="nav__close" id="nav-close" />
          </div>

          <div className="nav__btns">
            {/* <!-- Theme Change button --> */}
            {/* <BsFillCloudMoonFill className="change-theme" id="theme-button" /> */}

            <div className="nav__toggle" id="nav-toggle">
              <AiOutlineAppstoreAdd />
            </div>
          </div>
        </nav>
      </header>

      {/* // <!--==================== MAIN ====================--> */}
      <main className="main">
        {/* <!--==================== HOME ====================--> */}
        <section className="home section" id="home">
          <div className="home__container container grid">
            <div className="home__content grid">
              <div className="home__social">
                <a
                  href="https://www.linkedin.com/in/dhruval-bhuva-54289416a/"
                  target="_blank"
                  className="home__social-icon"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/the_dhruval.bhuva/"
                  className="home__social-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram />
                </a>
                <a
                  href="https://github.com/DhruvalBhuva"
                  className="home__social-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineGithub />
                </a>
              </div>
              <div className="home__img">
                <svg
                  className="home__blob"
                  viewBox="0 0 200 187"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask id="mask0" mask-type="alpha">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                            130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                            97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                            0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                            165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                            129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                            -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"
                    />
                    <image
                      className="home__blob-img"
                      x="12"
                      y="18"
                      xlinkHref={ProfileImg}
                    />
                  </g>
                </svg>
              </div>

              <div className="home__data">
                <h1 className="home__title">Hello, I'm Dhruval Bhuva</h1>
                <h3 className="home__subtitle">
                  FullStake Web Developer and Freelancer
                </h3>
                <a href="#contact" className="button button-flex">
                  Contact Me <AiOutlineArrowRight className="ms-2" />
                </a>
              </div>
            </div>
            <div className="home__scroll">
              <a href="#about" className="home__scroll-button button-flex">
                <BiMouse className="home__scroll-mouse" />
                <span className="home__scroll-name">Scroll down</span>
                <AiOutlineArrowDown className="home__scroll-arrow" />
              </a>
            </div>
          </div>
        </section>

        {/* <!--==================== ABOUT ====================--> */}
        <section className="about section" id="about">
          <h2 className="section__title">About Me</h2>
          <span className="section__subtitle">My introduction</span>

          <div className="about__container grid">
            <img src={AboutImg} className="about__img" />

            <div className="about__data">
              <div className="about__description">
                <p className="about__text">
                  A boy who loves to play games, believes in magic, trust God,
                  manifest and work hard to make the dreams come true.
                </p>

                <p className="about__text">
                  Since 22 years, I have been learning things which are
                  necessary to serve the society for next 22 years of my life or
                  may be more! Loves to do the work which can uplift the weaker
                  sections in the society. Computer engineer who is pretty much
                  business oriented, good at public speaking, people’s person,
                  can do well in event management and public management.
                  Extrovert with ample amount of ideas, loves to travel and
                  explore new food places.
                </p>

                <p className="about__text">
                  A young and enthusiastic MERN stack web developer who is
                  comfortable with both front-end and back-end web development
                  having ability to work on React UI and REST API. And also with
                  willingness to learn and master single page application &
                  other useful technologies. Excited to go into Blockchain
                  technology.
                </p>
              </div>

              <div className="about__button">
                <a
                  download=""
                  href="https://drive.google.com/file/d/1rPuWrscI02gzWuC8sC9DN3j5QIs-6PWt/view?usp=sharing"
                  className="button button-flex"
                >
                  Download Resume
                  <AiOutlineCloudDownload className="button__icon" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== QUALIFICATION ====================--> */}
        <section className="qualification section">
          <h2 className="section__title">Qualification</h2>
          <span className="section__subtitle">My personal journey</span>

          <div className="qualification__container">
            <div className="qualification__tabs">
              <div
                className="qualification__button button-flex active-link qualification__active"
                id="education"
                data-target="#education"
                onClick={() => changeQualificationTab("education")}
              >
                <FaGraduationCap className="qualification__icon" />
                Education
              </div>
              <div
                className="qualification__button button-flex"
                id="experience"
                data-target="#work"
                onClick={() => changeQualificationTab("experience")}
              >
                <AiFillExperiment className="qualification__icon" />
                Experience
              </div>
            </div>

            {qualificationTab === "education" ? (
              <div className="qualification__section">
                {/* <!--==================== QUALIFICATION CONTENT 1====================--> */}
                <div
                  className="qualification__content qualification__active"
                  data-content
                >
                  {/* <!--==================== QUALIFICATION 1====================--> */}
                  {/* <div className="qualification__data">
                    <div>
                      <div className="qualification__calendar">
                        <i className="uil uil-calendar-alt"></i>
                        2023 - Present
                      </div>
                      <h3 className="qualification__title">
                        10<sup>th</sup> GSEB
                      </h3>
                      <span className="qualification__subtitle">
                        <i className="uil uil-book"></i> Pathak Schools, Rajkot,
                        Gujrat
                      </span>

                      <div className="qualification__percentge">
                        Percentage: 84.7%
                      </div>
                    </div>

                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>
                  </div> */}
                  {/* <!--==================== QUALIFICATION 1====================--> */}
                  <div className="qualification__data">
                    <div>
                      <div className="qualification__calendar">
                        <AiTwotoneCalendar />
                        2018 - 2022
                      </div>
                      <h3 className="qualification__title">
                        Computer Engineering
                      </h3>
                      <span className="qualification__subtitle">
                        <FaUniversity /> Marwadi Education and Foundation,
                        Gujarat
                      </span>

                      <div className="qualification__percentge">
                        CGPI : 9.17
                      </div>
                    </div>

                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>
                  </div>

                  {/* <!--==================== QUALIFICATION 2====================--> */}
                  <div className="qualification__data">
                    <div></div>
                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>

                    <div>
                      <div className="qualification__calendar">
                        <AiTwotoneCalendar />
                        2016 - 2018
                      </div>
                      <h3 className="qualification__title">
                        12<sup>th</sup> GSEB
                      </h3>
                      <span className="qualification__subtitle">
                        <FaSchool /> The School of Science,Rajkot, Gujarat
                      </span>

                      <div className="qualification__percentge">
                        Percentage : 81%
                      </div>
                    </div>
                  </div>

                  {/* <!--==================== QUALIFICATION 3====================--> */}
                  <div className="qualification__data">
                    <div>
                      <div className="qualification__calendar">
                        <AiTwotoneCalendar />
                        2016
                      </div>
                      <h3 className="qualification__title">
                        10<sup>th</sup> GSEB
                      </h3>
                      <span className="qualification__subtitle">
                        <FaSchool /> Pathak Schools, Rajkot, Gujrat
                      </span>

                      <div className="qualification__percentge">
                        Percentage: 84.7%
                      </div>
                    </div>

                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="qualification__section">
                {/* <!--==================== QUALIFICATION CONTENT 2====================--> */}
                <div className="qualification__content" data-content>
                  {/* <!--==================== Experience 1====================--> */}
                  <div className="qualification__data">
                    <div>
                      <div className="qualification__calendar">
                        <AiTwotoneCalendar />
                        Feb 2022 - June 2022
                      </div>
                      <h3 className="qualification__title">
                        Internship - Full Stack Web Developer
                      </h3>
                      <span className="qualification__subtitle">
                        <i className="uil uil-university"></i> MERN Stack Web
                        Developer
                      </span>

                      <div className="qualification__percentge">
                        At, TechnoComet Solutions
                      </div>
                    </div>

                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>
                  </div>

                  {/* <!--==================== Experience 2====================--> */}
                  <div className="qualification__data">
                    <div></div>
                    <div>
                      <span className="qualification__rounder"></span>
                      <span className="qualification__line"></span>
                    </div>

                    <div>
                      <div className="qualification__calendar">
                        <AiTwotoneCalendar />
                        Nov 2021 - Feb 2022
                      </div>
                      <h3 className="qualification__title">
                        Trainee - Full Stack web Development
                      </h3>
                      {/* <span className="qualification__subtitle">
                        <i className="uil uil-university"></i> Full Stack Web
                        Developer
                      </span> */}

                      <div className="qualification__percentge">
                        At, TechnoComet Solutions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* <!--==================== SKILLS ====================--> */}
        <section className="skills section" id="skills">
          <h2 className="section__title">Skills</h2>
          <span className="section__subtitle">My techinacal level</span>

          <div className="skills__container container grid">
            {/* <!--==================== SKILLS 1====================--> */}
            <div className="skills__content skills__open">
              <div className="skills__header" onClick={(e) => toggleSkills(e)}>
                <BsFront className="skills__icon" />
                <div>
                  <h1 className="skills__title">Frontend development Skills</h1>
                  {/* <span className="skills__subtitle">More than 4 year</span> */}
                </div>

                <AiFillCaretDown className="skills__arrow" />
              </div>

              <div className="skills__list grid">
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">HTML</h3>
                    <span className="skills__number">90%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__html"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">CSS</h3>
                    <span className="skills__number">85%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__css"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">JavaScript</h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__js"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">React</h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__react"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--==================== SKILLS 2====================--> */}
            <div className="skills__content skills__close">
              <div className="skills__header" onClick={(e) => toggleSkills(e)}>
                <BsServer className="skills__icon" />

                <div>
                  <h1 className="skills__title">Backend development skills</h1>
                  {/* <span className="skills__subtitle">More than 2 year</span> */}
                </div>

                <AiFillCaretDown className="skills__arrow" />
              </div>

              <div className="skills__list grid">
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Node.js</h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__node"></span>
                  </div>
                </div>

                {/* <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">PHP</h3>
                    <span className="skills__number">70%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__php"></span>
                  </div>
                </div> */}

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">MongoDB</h3>
                    <span className="skills__number">75%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__mongoDB"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">MySql</h3>
                    <span className="skills__number">70%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__mySql"></span>
                  </div>
                </div>
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Cloud Services</h3>
                    <span className="skills__number">60%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__cloud"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--==================== SKILLS 3====================--> */}
            <div className="skills__content skills__close">
              <div className="skills__header" onClick={(e) => toggleSkills(e)}>
                <FaRobot className="skills__icon" />

                <div>
                  <h1 className="skills__title">Technical Skills</h1>
                  {/* <span className="skills__subtitle">More than 2 year</span> */}
                </div>

                <AiFillCaretDown className="skills__arrow" />
              </div>

              <div className="skills__list grid">
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Java</h3>
                    <span className="skills__number">70%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__java"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Python</h3>
                    <span className="skills__number">60%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__python"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">DBMS</h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__DBMS"></span>
                  </div>
                </div>

                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">
                      Algorithm and Data Structure
                    </h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage skills__Al_DS"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== project ====================--> */}
        <section className="portfolio section" id="portfolio">
          <h2 className="section__title">Projects</h2>
          <span className="section__subtitle">Most recent work</span>

          <div className="portfolio__container container swiper-container">
            <div className="swiper-wrapper">
              <Carousel autoplay>
                <div>
                  <h3
                    style={{
                      height: "250px",
                      color: "#000",
                      padding: "1.1rem",
                      textAlign: "center",
                      background: "hsl(250deg 18% 90%)",
                      display: "flex",
                    }}
                  >
                    <img src={Project1Img} alt="" className="portfolio__img" />
                    <div className="portfolio__data">
                      <h3 className="portfolio__title">Memories</h3>
                      <p className="portfolio__description">
                        Memories is an online social platform. The aim of
                        Memories is to share Memorable events with friends and
                        they can like events, authorized person can share and
                        delete memories. This platform is build using MERN stack
                      </p>
                      {/* <a
                        href="#"
                        className="button button-flex button-small portfolio__button"
                      >
                        Demo
                        <AiOutlineArrowRight className="button__icon" />
                      </a> */}
                    </div>
                  </h3>
                </div>
                <div>
                  <h3
                    style={{
                      height: "250px",
                      color: "#000",
                      padding: "1.1rem",
                      textAlign: "center",
                      background: "hsl(250deg 18% 90%)",
                      display: "flex",
                    }}
                  >
                    <img src={Project2Img} alt="" className="portfolio__img" />
                    <div className="portfolio__data">
                      <h3 className="portfolio__title">Service Experts</h3>
                      <p className="portfolio__description">
                        Service expert is an online servicing platform. The aim
                        of service expert is to provide technical and
                        non-technical services at door step. The front end of
                        the platform is build using HTML, CSS, JS and backend is
                        build using PHP, MySql
                      </p>
                      {/* <a
                        href="#"
                        className="button button-flex button-small portfolio__button"
                      >
                        Demo
                        <AiOutlineArrowRight className="button__icon" />
                      </a> */}
                    </div>
                  </h3>
                </div>
                <div>
                  <h3
                    style={{
                      height: "250px",
                      color: "#000",
                      padding: "1.1rem",
                      textAlign: "center",
                      background: "hsl(250deg 18% 90%)",
                      display: "flex",
                    }}
                  >
                    <img src={Project3Img} alt="" className="portfolio__img" />
                    <div className="portfolio__data">
                      <h3 className="portfolio__title">Weather Info</h3>
                      <p className="portfolio__description">
                        Weather Info is an online platform. The aim of
                        Weather-Info is to provide currently weather information
                        to the user which can be maintained by the user. This
                        platform is build using HBS, JS, CSS, and backend work
                        using Node.js Express, MongoDb.
                      </p>
                      {/* <a
                        href="#"
                        className="button button-flex button-small portfolio__button"
                      >
                        Demo
                        <AiOutlineArrowRight className="button__icon" />
                      </a> */}
                    </div>
                  </h3>
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* <!--==================== SERVICES ====================--> */}
        <section className="services section" id="services">
          <h2 className="section__title">Services</h2>
          <span className="section__subtitle">What I offer</span>

          <div className="services__container container grid">
            {/* <!--==================== SERVICES 1 ====================--> */}
            <div className="services__content">
              <div>
                <BsFront className="services__icon" />

                <h3 className="services__title">
                  Frontend <br />
                  Development
                </h3>
              </div>

              <span
                className="
                services__button
                button-flex button-small button-link
                survices__button
              "
                onClick={() => viewServices(0)}
              >
                View More
                <AiOutlineArrowRight className="button__icon" />
              </span>

              <div className="services__model">
                <div className="services__model-content">
                  <h4 className="services__model-title">
                    Frontend <br />
                    Development
                  </h4>
                  <AiOutlineCloseCircle
                    className="services__model-close"
                    onClick={closeServiceModel}
                  />

                  <ul className="services__model-services grid">
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I develop the user interface</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>Web page development</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I Create ux element interaction</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>
                        We are constantly updating ourselves to serve the latest
                        technology introduced to the web development.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!--==================== SERVICES 2 ====================--> */}
            <div className="services__content">
              <div>
                <BsServer className="services__icon" />

                <h3 className="services__title">
                  Backend <br />
                  Development
                </h3>
              </div>

              <span
                className="
                services__button
                button-flex button-small button-link
                survices__button
              "
                onClick={() => viewServices(1)}
              >
                View More
                <AiOutlineArrowRight className="button__icon" />
              </span>

              <div className="services__model">
                <div className="services__model-content">
                  <h4 className="services__model-title">
                    Backend <br />
                    Development
                  </h4>
                  <AiOutlineCloseCircle
                    className="services__model-close"
                    onClick={closeServiceModel}
                  />
                  <ul className="services__model-services grid">
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I develop the user interface</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>Web page development</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I Create ux element interaction</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I posotion your company brand</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!--==================== SERVICES 3 ====================--> */}
            <div className="services__content">
              <div>
                <AiOutlineAntCloud className="services__icon" />
                <h3 className="services__title">
                  Cloud
                  <br />
                  Services
                </h3>
              </div>

              <span
                className="
                services__button
                button-flex button-small button-link
                survices__button
              "
                onClick={() => viewServices(2)}
              >
                View More
                <AiOutlineArrowRight className="button__icon" />
              </span>

              <div className="services__model">
                <div className="services__model-content">
                  <h4 className="services__model-title">
                    Cloud
                    <br />
                    Services
                  </h4>
                  <AiOutlineCloseCircle
                    className="services__model-close"
                    onClick={closeServiceModel}
                  />
                  <ul className="services__model-services grid">
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I develop the user interface</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>Web page development</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I Create ux element interaction</p>
                    </li>
                    <li className="services__model-service">
                      <AiOutlineDoubleRight className="services__model-icon" />
                      <p>I posotion your company brand</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--==================== PROJECT IN MIND ====================--> */}
        <section className="project section">
          <div className="project__bg">
            <div className="project__container container grid">
              <div className="project__data">
                <h2 className="project__title">You have a new project</h2>
                <p className="project__description">
                  Contact me now and get a 30% discount
                </p>
                <a href="#contact" className="button button-flex button-white">
                  Contact Me
                  <BsArrowDownRightSquareFill className="button__icon" />
                </a>
              </div>
              {/* <img src="assets/img/project.png " alt="" /> */}
            </div>
          </div>
        </section>

        {/* <!--==================== TESTIMONIAL ====================--> */}
        {/* <section className="testimonial section swiper-container">
          <h2 className="section__title">Testimonial</h2>
          <span className="section__subtitle">My client saying</span>

          <div className="testimonial__contaier container swiper-container">
            <div className="swiper-wrapper">
              <Carousel autoplay effect="fade"> */}
        {/* <!--==================== TESTIMONIAL 1 ====================--> */}
        {/* <div>
                  <div
                    className="testimonial__content"
                    style={{
                      height: "160px",
                      color: "#fff",
                      textAlign: "center",
                      padding: "1.1rem",
                      background: "hsl(250deg 69% 61%)",
                    }}
                  >
                    <div className="testimonial__data">
                      <div className="testimonial__header">
                        <img
                          src="assets/img/testimonial1.jpg"
                          alt=""
                          className="testimonial__img"
                        />
                        <div>
                          <h3 className="testimonial__name">Ravi Vagadiya</h3>
                          <span className="testimonial__client">CEO, TechnoComent</span>
                        </div>
                      </div>

                      <div>
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiOutlineStar className="testimonial__icon" />
                      </div>
                    </div>

                    <div className="testimonial__description">
                      I get a good impression, I carry out my project with all
                      the posible quality and attenion and support 24 hours a
                      day
                    </div>
                  </div>
                </div> */}
        {/* <!--==================== TESTIMONIAL 2 ====================--> */}
        {/* <div>
                  <div
                    className="testimonial__content"
                    style={{
                      height: "160px",
                      color: "#fff",
                      textAlign: "center",
                      padding: "1.1rem",
                      background: "hsl(250deg 69% 61%)",
                    }}
                  >
                    <div className="testimonial__data">
                      <div className="testimonial__header">
                        <img
                          src="assets/img/testimonial1.jpg"
                          alt=""
                          className="testimonial__img"
                        />
                        <div>
                          <h3 className="testimonial__name">Sara Smith</h3>
                          <span className="testimonial__client">Client</span>
                        </div>
                      </div>

                      <div>
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiOutlineStar className="testimonial__icon" />
                      </div>
                    </div>

                    <div className="testimonial__description">
                      I get a good impression, I carry out my project with all
                      the posible quality and attenion and support 24 hours a
                      day
                    </div>
                  </div>
                </div> */}
        {/* <!--==================== TESTIMONIAL 3 ====================--> */}
        {/* <div>
                  <div
                    className="testimonial__content"
                    style={{
                      height: "160px",
                      color: "#fff",
                      textAlign: "center",
                      padding: "1.1rem",
                      background: "hsl(250deg 69% 61%)",
                    }}
                  >
                    <div className="testimonial__data">
                      <div className="testimonial__header">
                        <img
                          src="assets/img/testimonial1.jpg"
                          alt=""
                          className="testimonial__img"
                        />
                        <div>
                          <h3 className="testimonial__name">Sara Smith</h3>
                          <span className="testimonial__client">Client</span>
                        </div>
                      </div>

                      <div>
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiFillStar className="testimonial__icon" />
                        <AiOutlineStar className="testimonial__icon" />
                      </div>
                    </div>

                    <div className="testimonial__description">
                      I get a good impression, I carry out my project with all
                      the posible quality and attenion and support 24 hours a
                      day
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </section> */}

        {/* <!--==================== CONTACT ME ====================--> */}
        <section className="contact section" id="contact">
          <h2 className="section__title">Contact Me</h2>
          <span className="section__subtitle">Get in touch</span>

          {/* <!--==================== CONTACT ME call ====================--> */}
          <div className="contact__container container grid">
            <div>
              <div className="contact__information">
                <i className="uil uil-phone contact__icon"></i>
                <div>
                  <h3 className="contact__title">Call Me</h3>
                  <span className="contact__subtitle">+91 9725691256</span>
                </div>
              </div>

              {/* <!--==================== CONTACT ME email ====================--> */}
              <div className="contact__information">
                <i className="uil uil-envelope contact__icon"></i>
                <div>
                  <h3 className="contact__title">Email Me</h3>
                  <span className="contact__subtitle">
                    dhruvalbhuva2000@gmail.com
                  </span>
                </div>
              </div>

              {/* <!--==================== CONTACT ME location ====================--> */}
              <div className="contact__information">
                <i className="uil uil-map-marker contact__icon"></i>

                <div>
                  <h3 className="contact__title">Locatiion</h3>
                  <span className="contact__subtitle">
                    Rajkot-Gujrat, India
                  </span>
                </div>
              </div>
            </div>

            <form action="" className="contact__form grid">
              <div className="contct__inputs grid">
                <div className="contact__content">
                  <label htmlFor="" className="contact__label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    className="contact__input"
                    onChange={changeHandler}
                  />
                </div>
                <div className="contact__content">
                  <label htmlFor="" className="contact__label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    className="contact__input"
                    onChange={changeHandler}
                  />
                </div>
                <div className="contact__content">
                  <label htmlFor="" className="contact__label">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={userData.subject}
                    className="contact__input"
                    onChange={changeHandler}
                  />
                </div>
                <div className="contact__content">
                  <label htmlFor="" className="contact__label">
                    description
                  </label>
                  <textarea
                    onChange={changeHandler}
                    name="description"
                    id=""
                    value={userData.description}
                    cols="0"
                    rows="7"
                    className="contact__input"
                  ></textarea>
                </div>

                <div>
                  <Button
                    className="button button-flex mailBtn"
                    loading={isLoading}
                    onClick={sendMail}
                  >
                    Send E-mail
                    <BiMailSend className="button__icon" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* <!--==================== FOOTER ====================--> */}
      <footer className="footer">
        <div className="footer__bg">
          <div className="footer__container container grid">
            <div>
              <h1 className="footer__title">Dhruval</h1>
              <span className="footer__subtitle">Software Engineer</span>
            </div>

            <ul className="footer__links">
              <li>
                <a href="#about" className="footer__link">
                  About
                </a>
              </li>
              <li>
                <a href="#portfolio" className="footer__link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="footer__link">
                  Contact Me
                </a>
              </li>
            </ul>
            <div className="footer__socials">
              <a
                href="https://www.linkedin.com/in/dhruval-bhuva-54289416a/"
                target="_blank"
                className="footer__social"
                rel="noreferrer"
              >
                <AiFillLinkedin />
              </a>
              <a
                href="https://www.instagram.com/the_dhruval.bhuva/"
                className="footer__social"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillInstagram />
              </a>
              <a
                href="https://github.com/DhruvalBhuva"
                className="footer__social"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineGithub />
              </a>
            </div>
          </div>

          <p className="footer__copy">
            &#169; DhruvalBhuva. All right reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
