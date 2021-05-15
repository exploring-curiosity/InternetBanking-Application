import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import * as THREE from 'three';
//import oc from 'three-orbit-controls'
//import * as dat from 'dat.gui';
//import gsap from 'gsap';

//const OrbitControls = oc(THREE)
const scene = new THREE.Scene();
//const gui = new dat.GUI();

/*const world = {
    plane: {
        width: 25,
        height: 25,
        hs: 25,
        ws: 25
    }
}*/

//gui.add(world.plane, 'width', 1, 50).onChange(generatePlane);
//gui.add(world.plane, 'height', 1, 50).onChange(generatePlane);
//gui.add(world.plane, 'ws', 1, 50).onChange(generatePlane);
//gui.add(world.plane, 'hs', 1, 50).onChange(generatePlane);
/*
function generatePlane() {
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.ws, world.plane.hs);
    const { array } = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        array[i + 2] = z + Math.random()
    }
    const colors = []
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
        colors.push(0, 0.19, 0.4);
    }

    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
}*/
const raycaster = new THREE.Raycaster();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function (){
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
});

//new OrbitControls(camera, renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(400, 400, 50, 50);

const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true })

const planeMesh = new THREE.Mesh(planeGeometry, material);

scene.add(planeMesh);

const randomValues = []
const { array } = planeMesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i] = x + (Math.random() - 0.5) * 3;
    array[i + 1] = y + (Math.random() - 0.5) * 3;
    array[i + 2] = z + Math.random() * 4;
    randomValues.push((Math.random() - 0.5) * Math.PI * 2);
    randomValues.push((Math.random() - 0.5) * Math.PI * 2);
    randomValues.push((Math.random() - 0.5) * Math.PI * 2);
}

planeMesh.geometry.attributes.position.randomValues = randomValues;
planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array;
console.log(planeMesh.geometry.attributes.position)
const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);
}

planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(0.5, -1, 1);
scene.add(light);

const backlight = new THREE.DirectionalLight(0xFFFFFF, 1);
backlight.position.set(0, 0, -1);
scene.add(backlight);

camera.position.z = 50;
const mouse = {
    x: undefined,
    y: undefined
}
let frame = 0;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);
    frame += 0.01;
    const { array, originalPosition, randomValues } = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.005;
        array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i + 1]) * 0.005;
    }
    planeMesh.geometry.attributes.position.needsUpdate = true;

    /*const intersects = raycaster.intersectObject(planeMesh);
    if (intersects.length > 0) {
        const { color } = intersects[0].object.geometry.attributes;
        color.setX(intersects[0].face.a, 0.1);
        color.setX(intersects[0].face.b, 0.1);
        color.setX(intersects[0].face.c, 0.1);

        color.setY(intersects[0].face.a, 0.5);
        color.setY(intersects[0].face.b, 0.5);
        color.setY(intersects[0].face.c, 0.5);

        color.setZ(intersects[0].face.a, 1);
        color.setZ(intersects[0].face.b, 1);
        color.setZ(intersects[0].face.c, 1);
        color.needsUpdate = true;

        const initialColor = {
            r: 0,
            g: 0.19,
            b: 0.40
        }
        const hoverColor = {
            r: 0.1,
            g: 0.5,
            b: 1
        }

        /*gsap.to(hoverColor, {
            r: initialColor.r,
            g: initialColor.g,
            b: initialColor.b,
            onUpdate: () => {
                color.setX(intersects[0].face.a, hoverColor.r);
                color.setX(intersects[0].face.b, hoverColor.r);
                color.setX(intersects[0].face.c, hoverColor.r);

                color.setY(intersects[0].face.a, hoverColor.g);
                color.setY(intersects[0].face.b, hoverColor.g);
                color.setY(intersects[0].face.c, hoverColor.g);

                color.setZ(intersects[0].face.a, hoverColor.b);
                color.setZ(intersects[0].face.b, hoverColor.b);
                color.setZ(intersects[0].face.c, hoverColor.b);
                color.needsUpdate = true;
            }
        })
    }*/
}

animate();


addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientY / innerHeight) * -2 + 1;
})