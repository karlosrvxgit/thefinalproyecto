"use client";
// import Image from 'next/image'
// import styles from './SideBar.css'
import { useState } from "react";
import React from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <input
        id="inputmain"
        type="text"
        placeholder="Search for places"
       
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id="buttons">s</button>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result) => <p key={result}>{result}</p>)
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
