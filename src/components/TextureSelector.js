import { useState, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { dirtImg, logImg, grassImg, glassImg, woodImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  log: logImg,
  wood: woodImg,
};
export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  //boolean for each texture
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = [dirt, grass, glass, wood, log];
    const pressedTexture = Object.entries(textures).find(([k, v]) => v); //store the true texture
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  //set the timeout for visibility
  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
};
