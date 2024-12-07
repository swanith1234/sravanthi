import { useState, useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { iconPaths, platformIcons } from "../constants/index.js";
import Button from "../components/Button.jsx";

const About = ({ userData }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const iconContainerRef = useRef(null);
  useEffect(() => {
    const adjustIconSizes = () => {
      const container = iconContainerRef.current;
      if (!container) return;

      const icons = container.querySelectorAll(".tech-logo-about");
      if (icons.length === 0) return; // No icons to adjust

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const iconWidth = 64; // Maximum icon width (adjust as needed)
      const maxIconsPerRow = Math.floor(containerWidth / iconWidth);

      // Calculate the number of rows required
      const numberOfRows = Math.ceil(icons.length / maxIconsPerRow);

      // Calculate icon height to fit evenly within container height
      const iconHeight = containerHeight / numberOfRows;

      icons.forEach((icon) => {
        icon.style.height = `${iconHeight}px`;
        icon.style.width = `${iconWidth}px`;
        icon.style.flex = `0 0 ${iconWidth}px`; // Ensure consistent flexbox behavior
      });

      // Apply flexbox to ensure proper layout
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
    };

    // Adjust icon sizes on mount and whenever the window resizes
    adjustIconSizes();
    window.addEventListener("resize", adjustIconSizes);
    return () => {
      window.removeEventListener("resize", adjustIconSizes);
    };
  }, []);
  const getIcons = (technologies) => {
    // Define platform-to-icon mapping

    // Process each technology (URL)
    return technologies.map((tech) => {
      const matchingPlatform = platformIcons.find((platform) =>
        tech.toLowerCase().includes(platform.domain)
      );

      if (matchingPlatform) {
        return (
          <a href={tech}>
            {" "}
            <img
              style={{
                " aspect-ratio": 1 /* Maintains a square aspect ratio */,
                width: "auto",
                "object-fit": "contain",
              }}
              key={tech}
              src={matchingPlatform.icon}
              alt={matchingPlatform.name}
              className="tech-logo-about "
            />
          </a>
        );
      }

      return (
        <span key={tech} className="tech-text">
          {tech}
        </span>
      ); // Fallback for unknown platforms
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userData.emailId);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };
  const getTechnologyIcons = (technologies) => {
    return technologies.map((tech) => {
      const matchingIcon = iconPaths.find(
        (icon) => icon.name.toLowerCase() === tech.toLowerCase()
      );
      if (matchingIcon) {
        return (
          <img
            key={tech}
            src={matchingIcon.path}
            alt={tech}
            className="tech-logo-about"
          />
        );
      }
      return (
        <span key={tech} className="tech-text">
          {tech}
        </span>
      ); // Fallback for unknown technologies
    });
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src={userData.profilePhoto}
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">Hi, I’m {userData.name}!</p>
              {/* <p className="grid-subtext">{userData.about}</p> */}
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container ">
            {/* <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" /> */}
            <img
              src="assets/grid3.png"
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
              <p>{getIcons(userData.codingProfiles)}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 40,
                    lng: -100,
                    text: "Rjieka, Croatia",
                    color: "white",
                    size: 15,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">
                I’m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I&apos;m based in Rjieka, Croatia and open to remote work
                worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container" ref={iconContainerRef}>
            {/* <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" /> */}

            <div>
              <p className="grid-headtext">Tech Stacks</p>
              <p>
                {/* {userData.techStacks.map((tech, index) => (
                  <span key={index}>
                    {tech}
                    {index !== userData.techStacks.length - 1 && ", "}
                  </span>
                ))} */}
                {getTechnologyIcons(userData.techStacks)}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">
                {getIcons(userData.contactDetails)}
                <a href={`tel:+91${userData.phoneNo}`}>
                  {" "}
                  <img src="/assets/phone.svg" alt="" />
                </a>
              </p>

              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={hasCopied ? "assets/tick.svg" : "assets/copy.svg"}
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  {userData.emailId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;