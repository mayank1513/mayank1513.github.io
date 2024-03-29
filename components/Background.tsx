import { styled } from "linaria/react";
import Image from "next/image";
import stars from "/assets/stars.jpg";
import research from "/assets/research.jpg";
import edu from "/assets/edu.jpg";
import { useEffect } from "react";

const StyledBackground = styled.div`
  &,
  .bg {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden !important;
    max-width: 100vw;
    video {
      overflow: hidden !important;
      &.cover {
        position: fixed;
        min-width: 100vw;
        min-height: 100vh;
      }
      &.contain {
        max-width: 100vw;
        max-height: 100vh;
        z-index: 10;
      }
    }
  }
  .cover {
    filter: blur(4px);
  }
  .web-dev {
    background: #4f00b1;
    .cover {
      display: none !important;
    }
  }
  .yogi {
    background: black;
  }
`;

export default function Background({ bg }) {
  useEffect(() => {
    if (!bg) return;
    const el = document.querySelector(`.${bg}.lazy`);
    if (el) {
      (el.children[0] as HTMLVideoElement).load();
      (el.children[1] as HTMLVideoElement).load();
      el.classList.remove("lazy");
    }
  }, [bg]);
  return (
    <StyledBackground>
      {[
        stars,
        "web-dev",
        "cv",
        "full-stack",
        "cv1",
        "mobile",
        research,
        "prof",
        edu,
        "yogi",
      ].map((src) => {
        if (typeof src == "string") {
          const cls = src;
          return (
            <div
              key={cls}
              className={`bg ${cls} lazy`}
              style={{ opacity: bg == cls ? 1 : 0 }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                className="cover"
              >
                <source
                  src={bg == cls ? `/${cls}.webm` : null}
                  type="video/webm"
                />
                <source
                  src={bg == cls ? `/${cls}.mp4` : null}
                  type="video/mp4"
                />
              </video>
              <video autoPlay loop muted playsInline className="contain">
                <source
                  src={bg == cls ? `/${cls}.webm` : null}
                  type="video/webm"
                />
                <source
                  src={bg == cls ? `/${cls}.mp4` : null}
                  type="video/mp4"
                />
              </video>
            </div>
          );
        }
        const cls = src.src.slice(src.src.lastIndexOf("/") + 1).split(".")[0];
        return (
          <div
            key={cls}
            className={`bg ${cls}`}
            style={{ opacity: bg == cls ? 1 : 0 }}
          >
            <Image
              src={src}
              layout="fill"
              objectFit="cover"
              className="cover"
            />
            <Image
              src={src}
              layout="fill"
              objectFit="contain"
              className="contain"
            />
          </div>
        );
      })}
    </StyledBackground>
  );
}
