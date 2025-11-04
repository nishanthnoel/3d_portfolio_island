import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box ">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} alt="" className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className=" sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5 ">
      Hello, I'm <span className="font-semibold">Nishanth</span>👋
      <br /> A Passionate Software Developer!{" "}
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many companies and picked up many skills along the way"
      Link="/about"
      btnText="Learn More"
    />
  ),
  3: (
    <InfoBox
      text="Lead Multiple projects to success over the years. Curious to know the impact?"
      Link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just a few keystrokes away"
      Link="/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
