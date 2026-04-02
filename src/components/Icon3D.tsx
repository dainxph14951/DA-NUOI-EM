import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const Heart3D: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff1493" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const Ring3D: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 32, 100]} />
      <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
    </mesh>
  );
};

const Cube3D: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#ff69b4" metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

const Sphere3D: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#ff6b9d"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff1493"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const Clock3D: React.FC = () => {
  const clockFaceRef = useRef<Mesh>(null);
  const hourHandRef = useRef<Mesh>(null);
  const minuteHandRef = useRef<Mesh>(null);

  useFrame(() => {
    if (clockFaceRef.current) {
      clockFaceRef.current.rotation.z += 0.001;
    }

    if (hourHandRef.current && minuteHandRef.current) {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();

      hourHandRef.current.rotation.z =
        -(hours * Math.PI) / 6 - (minutes * Math.PI) / (6 * 60);
      minuteHandRef.current.rotation.z = -(minutes * Math.PI) / 30;
    }
  });

  return (
    <group>
      {/* Clock Face */}
      <mesh ref={clockFaceRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.6}
          roughness={0.3}
          emissive="#ffb6d9"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Hour Hand */}
      <mesh ref={hourHandRef} position={[0, 0.2, 0.1]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#ff1493" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Minute Hand */}
      <mesh ref={minuteHandRef} position={[0, 0.3, 0.12]}>
        <boxGeometry args={[0.08, 0.6, 0.04]} />
        <meshStandardMaterial color="#ff69b4" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center Dot */}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ffd700"
          metalness={0.9}
          roughness={0.1}
          emissive="#ff1493"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

interface Icon3DCanvasProps {
  type?: "heart" | "ring" | "cube" | "sphere" | "clock";
  size?: number;
}

export const Icon3DCanvas: React.FC<Icon3DCanvasProps> = ({
  type = "heart",
  size = 200,
}) => {
  const renderIcon = () => {
    switch (type) {
      case "ring":
        return <Ring3D />;
      case "cube":
        return <Cube3D />;
      case "sphere":
        return <Sphere3D />;
      case "clock":
        return <Clock3D />;
      case "heart":
      default:
        return <Heart3D />;
    }
  };

  return (
    <Canvas
      style={{ width: size, height: size }}
      camera={{ position: [0, 0, 3] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ff1493" />
      {renderIcon()}
    </Canvas>
  );
};
