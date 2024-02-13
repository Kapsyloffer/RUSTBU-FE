import './../App.css';
import { useEffect } from "react";
import Cookies from "js-cookie";

const set_name = () => {
  const usernameInput = document.getElementById("name");
  const username = sanitizeInput(usernameInput.value);
  
  Cookies.set("playerID", username, { expires: 7 });
  alert("Your name is now: " + Cookies.get("playerID"));
  usernameInput.value = username;
}

function sanitizeInput(input) {
  const sanitizedInput = input.replace(/[^A-Za-z0-9]/g, '');
  const doc = new DOMParser().parseFromString(sanitizedInput, 'text/html');
  return doc.body.textContent || "";
}
const NameInput = () => {
    useEffect(() => {
      let name = Cookies.get("playerID");
      document.getElementById("name").value = name;
    }, []);
    return ( 
    <div className="Index">
    <input type="text" placeholder="Username" id="name"></input>
    <button onClick={set_name} className="btn-primary">Set username</button>
  </div>
    );
  };
  
  export default NameInput;
  