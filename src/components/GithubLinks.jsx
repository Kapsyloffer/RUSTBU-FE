import banner from "./../img/banner.png";
import bannerbe from "./../img/gitstuff/rustbu_banner.png";
import bannerfe from "./../img/gitstuff/bannerfe.png";
import me_af from "./../img/gitstuff/me_af.png";

const GithubLinks = () => {
    return ( 
      <div className="Index">
      <img src={banner} alt="rustbu banner"/>
      <br/>
      <h2>Backend repo:</h2>
      <a href="https://github.com/Kapsyloffer/RUSTBU" target="_blank" rel="noreferrer"><img src={bannerbe} alt="Link to the backend repo (Rust 🦀)" className="gitbanners"/></a>
      <br/>
      <br/>
      <h2>Frontend repo:</h2>
      <a href="https://github.com/Kapsyloffer/RUSTBU-FE" target="_blank" rel="noreferrer"><img src={bannerfe} alt="Link to the frontend repo (React 🤢)" className="gitbanners"/></a>
      <br/>
      <br/>
      <h2>Me af:</h2>
      <a href="https://github.com/Kapsyloffer/" target="_blank" rel="noreferrer"><img src={me_af} alt="Who need they gitussy ate? Omg meee" className="gitbanners"/></a>
      <br/>
      <br/>
      <a href="/">Return.</a>
      <br/>
      <br/>

    </div>
    );
  };
  
  export default GithubLinks;
  