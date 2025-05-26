import gsap from 'gsap';
import { PerspectiveCamera, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { Pane } from 'tweakpane';

import { loadGLTF, loadTexture } from './utils';

import { createDrag } from './drag';

import Camera from './components/Camera';
import Cube from './components/Cube';
import Earth from './components/Earth';

let canvas, webgl, renderer;

webgl = {};

canvas = document.createElement('canvas');
canvas.classList.add('webgl');
const app = document.querySelector('#app');
app.appendChild(canvas);

async function init() {
    webgl.canvas = canvas;

    const pr = window.devicePixelRatio;
    renderer = new WebGLRenderer({
        canvas,
    });
    renderer.setPixelRatio(pr);

    // DOM
    webgl.viewport = new Vector2();
    webgl.gui = new Pane();

    // STATES
    webgl.scroll = 0;

    // UNIFORMS
    webgl.uniforms = {
        time: { type: 'f', value: 0 },
    };

    webgl.drag = createDrag(webgl);

    resize();

    await preload();

    start();

    // Start Update
    gsap.ticker.add(update);
}

async function preload() {
    const textureLoader = new TextureLoader();
    webgl.textures = {};

    await loadTexture('/textures/bump.jpg', {
        onLoad: node => {
            webgl.textures.earth = node;
        },
    });

    await loadTexture('/textures/clouds.jpg', {
        onLoad: node => {
            webgl.textures.clouds = node;
        },
    });

    await loadTexture('/textures/noise.png', {
        repeat: true,
        onLoad: node => {
            webgl.textures.noise = node;
        },
    });

    // await loadGLTF('/models/model.glb', {
    //     onLoad: gltf => {
    //         const scene = gltf.scene;
    //         scene.traverse(node => {
    //             if (node.name === 'TEE') {
    //                 webgl.shirt = node;
    //             }
    //         });
    //     },
    // });
}

function start() {
    webgl.scene = new Scene();
    webgl.camera = new Camera();
    webgl.cube = new Cube();
    webgl.earth = new Earth();
}

function update(time, deltaTime, frame) {
    webgl.uniforms.time.value = time * 0.001;

    webgl.camera?.update();
    webgl.cube?.update();
    webgl.earth?.update();

    webgl.slider?.slides.forEach(slide => {
        slide?.update();
    });

    render();
}

function render() {
    renderer.render(webgl.scene, webgl.camera.active);
}

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    webgl.viewportRatio = width / height;
    webgl.viewport.set(width, height);
    webgl.pixelRatio = window.devicePixelRatio;
    webgl.camera?.resize();
    renderer?.setSize(width, height);
}

init();

window.addEventListener('resize', resize);

export function getWebGL() {
    return webgl;
}
