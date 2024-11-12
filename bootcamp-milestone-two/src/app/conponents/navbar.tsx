import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={style.navbar} >
      <h1> Torriani's Personal Website </h1>
      <nav className="navbar">  
            <h2> Navigation Bar </h2>
            <ul className= "nav-list">
                <a href="blog.html">Blog </a>
            </ul>
        </nav>  
    </header>
  );
} 