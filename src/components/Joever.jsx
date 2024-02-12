import joever from "./../img/loser_placeholder.png";

const Joever = () => {
    return ( 
    <div className="Index">
    <span>(Click on Joe to go back home)</span>
      <a href="/"><img src={joever} className='win_img'/></a>
  </div>
    );
  };
  
  export default Joever;
  