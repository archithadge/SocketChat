import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
// Field of view,aspect ratio,frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 'blue',
});

const torus = new THREE.Mesh(geometry, material);
torus.rotation.x=-0.4;
scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff);
const ambientlight = new THREE.AmbientLight(0xffffff);
const lighthelper = new THREE.PointLightHelper(pointlight);
const gridhelper = new THREE.GridHelper(300, 50);
pointlight.position.set(5, 5, 5);
scene.add(pointlight, ambientlight, lighthelper, gridhelper);

const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

const loader = new THREE.CubeTextureLoader();
loader.setPath( './' );
const textureCube = loader.load( [
	'windows.jpeg', 'windows.jpeg',
	'windows.jpeg', 'windows.jpeg',
	'windows.jpeg', 'windows.jpeg'
] );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
const geometry2 = new THREE.BoxGeometry( 300, 300, 300 );
const cube = new THREE.Mesh( geometry2, material2 );
scene.add( cube );

function addRandomStar() {
    const geometry = new THREE.SphereGeometry(0.15, 25, 25);
    const meshMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, meshMaterial);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(100).fill().forEach(addRandomStar);

const background=new THREE.TextureLoader().load('sky.jpg');
scene.background=background;

const moontexture=new THREE.TextureLoader().load('moon.jpg');
const moon=new THREE.Mesh(new THREE.SphereGeometry(3,1000,1000),new THREE.MeshStandardMaterial({
    map:moontexture
}))
scene.add(moon);
moon.position.z=30;
moon.position.x=-10;

function moveCamera(){
    const t=document.body.getBoundingClientRect().top;
    camera.position.x=-t*0.1;
    camera.position.y=-t*0.1;
    camera.position.z=-t*0.1;
    torus.rotation.x=t*0.01;
}

document.body.onscroll=moveCamera;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x+=0.001;
    cube.rotation.y+=0.001;
    cube.rotation.z+=0.001;
    
    controls.update();
}

animate();
