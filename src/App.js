import "./styles.css";
import { Canvas } from "@react-three/fiber";
import { useState, useRef, Suspense } from "react";
import { useGLTF, OrbitControls, softShadows } from "@react-three/drei";
import { Box, CircularProgress } from "@material-ui/core";
import Model from "./Cardraco";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";

const state = proxy({
  current: null,
  items: {
    Orange: "#fd885e",
    Brown: "#a58574",
    Dark_brown: "#866C5E",
    Glass: "#d0cdc3",
    Black: "#4a5a5f"
  }
});

function Picker() {
  const snap = useSnapshot(state);
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker
        className="picker"
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[snap.current] = color)}
      />
    </div>
  );
}
export default function App() {
  return (
    <>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1 className="text">Super Car</h1>
        <Canvas colorManagement shadows>
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={0.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <ambientLight intensity={0.4} />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.7, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <Suspense fallback={null}>
            <Model state={state} useSnapshot={useSnapshot} />
          </Suspense>
          <OrbitControls minDistance={2} maxDistance={7} />
        </Canvas>
        <div className="bottom ">paint the car</div>
        <Picker />
      </Box>
    </>
  );
}
