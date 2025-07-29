import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text, Stage } from '@react-three/drei';

const ThreeDGraph = ({ excelData, labelKey, valueKey }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='chart-container'>
      <h3 className='chart-title'>3D Data Visualization</h3>
      <div className='graph-container'>
        <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }} camera={{ fov: 45 }} style={{ cursor: 'grab' }}>
          <Stage environment="city" intensity={0.5}>
            {excelData.map((item, index) => (
              <group key={index} position={[index * 3.5, 0, 0]}>
                <Box
                  args={[1.5, item[valueKey] > 0 ? item[valueKey] : 0.1, 1.5]}
                  position={[0, (item[valueKey] > 0 ? item[valueKey] : 0.1) / 2, 0]}
                >
                  <meshStandardMaterial
                    attach="material"
                    color="#8B5CF6"
                    roughness={0.4}
                    metalness={0.3}
                  />
                </Box>
                <Text
                  position={[0, item[valueKey] + 0.5, 0]}
                  fontSize={0.6}
                  color="#ffffff" // Value color
                  anchorX="center"
                >
                  {item[valueKey]}
                </Text>
                <Text
                  position={[0, -0.5, 0]}
                  fontSize={0.5}
                  color="#9CA3AF" // Label color
                  anchorX="center"
                >
                  {item[labelKey]}
                </Text>
              </group>
            ))}
          </Stage>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={0.8} enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDGraph;