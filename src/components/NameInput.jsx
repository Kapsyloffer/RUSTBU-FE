import './../App.css';
import { useEffect } from "react";
import Cookies from "js-cookie";

const set_name = () => {
  const usernameInput = document.getElementById("name");
  const username = sanitizeInput(usernameInput.value);
  if (!username || username === "" || username == "ChumBucketAI") {
    const randomString = Math.random().toString(36).substring(2, 20);
    Cookies.set("playerID", randomString, { expires: 7 });
    usernameInput.value = randomString;
  }else{
  Cookies.set("playerID", username, { expires: 7 });
  usernameInput.value = username;
  }
  alert("Your name is now: " + Cookies.get("playerID"));
}

function sanitizeInput(input) {
  const sanitizedInput = input.replace(/[^A-Za-z0-9]/g, '');
  const doc = new DOMParser().parseFromString(sanitizedInput, 'text/html');
  return doc.body.textContent || "";
}
const NameInput = () => {
    //Set player cookie to random String.
    useEffect(() => {
      const existingCookie = Cookies.get("playerID");
      //If there is no cookie, bake a cookie.
    if (!existingCookie || existingCookie === "" || existingCookie === "ChumBucketAI") {
        const randomString = Math.random().toString(36).substring(2, 20);
        Cookies.set("playerID", randomString, { expires: 7 });
      }
    });
    useEffect(() => {
      let name = Cookies.get("playerID");
      document.getElementById("name").value = name;
    }, []);
    return ( 
    <p><input type="text" placeholder="Username" id="name"></input>
    <button onClick={set_name} className="btn-cope">Set username</button></p>
    );
  };
  
  export default NameInput;
  