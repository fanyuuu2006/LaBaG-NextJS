import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Links() {
  return (
    <div className="Links">
      <GitHub/>
      <Instagram/>
    </div>
  );
}

function GitHub() {
  const URL = "https://github.com/fanyuuu2006/LaBaG-NextJS.git";
  return (
    <FaGithub
      title="前往 GitHub Repository"
      color="#FFFFFF"
      size={35}
      style={{ cursor: "pointer" }}
      onClick={() => {
        window.open(URL, "_blank");
      }}
    />
  );
}

function Instagram() {
  const URL = "https://www.instagram.com/fan._.yuuu/";
  return (
    <FaInstagram
      title="前往作者 Instagram"
      color="#FFFFFF"
      size={35}
      style={{ cursor: "pointer" }}
      onClick={() => {
        window.open(URL, "_blank");
      }}
    />
  );
}
