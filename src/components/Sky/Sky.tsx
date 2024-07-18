import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { IOptions, Engine, Container } from "tsparticles-engine";
import config from "./particlesjs-config.json";

export const Sky = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      style={{
        position: "absolute",
      }}
      options={config as unknown as IOptions}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};
