import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "../../components/list/List"
import "./search.css"

export default function Search() {
  const [inputText, setInputText] = useState("")
  let handleInput = (e)=> {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase)
  }
  return (
          <div className="main">
            <h1>Search Here</h1>
            <div className="search">
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Search"
                onChange={handleInput}
              />
            </div>
            <List input={inputText} />
          </div>
  )
}
