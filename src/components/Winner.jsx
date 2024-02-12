import Winner from "./../img/crabrave.gif";

const WinnerCrab = () => {
    return ( 
    <div className="Index">
    <span>Well done!<br/>(Click on Crabrave to go back home)</span>
      <a href="/"><img src={Winner} className='win_img'/></a>
  </div>
    );
  };
  
  export default WinnerCrab;
  