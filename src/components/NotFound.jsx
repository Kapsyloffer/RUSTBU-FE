import './../App.css';
import not_found_img from "../img/404.png";

const NotFound = () => {
    return ( 
    <div className="Index">
      <img src={not_found_img} className='img404'/>
      <h2>404: Not found</h2>
      <a href="/">Go home.</a>
  </div>
    );
  };
  
  export default NotFound;
  