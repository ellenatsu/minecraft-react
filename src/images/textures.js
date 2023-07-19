import { dirtImg, logImg, grassImg, glassImg, woodImg } from "./images";
import { NearestFilter, TextureLoader, RepeatWrapping } from "three";

const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const groundTexture = new TextureLoader().load(grassImg);

dirtTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

groundTexture.magFilter = NearestFilter; //specifies that the texture should use the nearest neighbor interpolation when magnified. This can result in a pixelated effect when the texture is scaled up.
groundTexture.wrapS = RepeatWrapping; // texture should repeat or tile when the texture coordinates extend beyond the range of 0 to 1 in the S (horizontal) and T (vertical) directions.
groundTexture.wrapT = RepeatWrapping;

export {
  dirtTexture,
  logTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  groundTexture,
};
