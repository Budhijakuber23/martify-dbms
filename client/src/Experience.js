import { Text, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'



export default function Experience()
{
    const doodh = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/carton/model.gltf')
    const chair = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf')
    const banana = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/banana/model.gltf')
    const ship = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ship-light/model.gltf')
    const ball = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/beach-ball/model.gltf')
    const guitar = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/guitar/model.gltf')
    const knife = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/knife-block/model.gltf')
    
    
    return <>
    {/* <Canvas></Canvas> */}
        <color args={ [ '#695b5b' ] } attach="background" />

        <Environment preset="city" />
        
        <PresentationControls
            // global
            // rotation={ [ 0.13, 0.1, 0 ] }
            // polar={ [ - 0.4, 0.2 ] }
            // azimuth={ [ - 1, 0.75 ] }
            // config={ { mass: 2, tension: 400 } }
            // snap={ { mass: 4, tension: 400 } }
        >
            <Float rotationIntensity={ 0.5 } intensity={1} >  
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#ff6900' }

                />
                <primitive object={banana.scene} position={[-2.2, 0.9 ,1.62]}  scale={2}></primitive>
                <primitive object={chair.scene} position={[-2.9, -0.4 , -3]}  scale={0.8}></primitive>
                <primitive object={doodh.scene} position={[0.75, 0.7 , -2]} scale={2}></primitive>
                <primitive object={ship.scene}  position={[1.9, -0.7 , 1.7]} scale={0.12}></primitive>
                <primitive object={ball.scene}  position={[-1.9, -0.2 , 1.7]} scale={0.12}></primitive>
                <primitive object={guitar.scene}  position={[2, 1.5 , 1.7]} scale={1.12}></primitive>
                <primitive object={knife.scene}  position={[0, -1.2 , 1.7]} scale={1.12}></primitive>


                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={ 1 }
                    position={ [ 0, 0, 0 ] }
                    maxWidth={ 2 }
                >
                    MARTIFY
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ - 1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />

    </>
}