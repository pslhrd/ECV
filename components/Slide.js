import {
    BoxGeometry,
    Color,
    DoubleSide,
    GridHelper,
    Mesh,
    MeshBasicMaterial,
    MeshNormalMaterial,
    MeshStandardMaterial,
} from 'three';
import { getWebGL } from '..';
import gsap from 'gsap';

export default class Slide {
    constructor(opts = {}) {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;
        this.props = opts;

        this.scaleTween = null;

        this.posTween = null;

        this.mesh = this.initGeometry();
    }

    initGeometry() {
        const mult = 1.3;
        const color = new Color(Math.random() * mult, Math.random() * mult, Math.random() * mult);

        const material = new MeshStandardMaterial({ color: color, side: DoubleSide });
        const mesh = this.webgl.shirt.clone();
        mesh.material = material;

        const c = this.props.index * 0.05;
        const offset = 1.2;

        mesh.scale.setScalar(0);
        this.scene.add(mesh);

        return mesh;
    }

    change(value) {}

    enter() {
        this.scaleTween?.kill();
        this.posTween?.kill();

        this.posTween = gsap.fromTo(
            this.mesh.position,
            {
                x: -1,
            },
            {
                x: 0,
                duration: 2,
                ease: 'expo.out',
            }
        );

        this.scaleTween = gsap.to(this.mesh.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 2,
            ease: 'expo.out',
        });
    }

    leave() {
        this.scaleTween?.kill();
        this.posTween?.kill();
        // this.mesh.scale.setScalar(0);

        this.posTween = gsap.to(this.mesh.position, {
            x: 1,
            duration: 1,
            ease: 'power3.out',
        });

        this.scaleTween = gsap.to(this.mesh.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }

    update() {
        this.mesh.rotation.y = this.mesh.position.x;
        this.mesh.rotation.x = this.webgl.scroll * Math.PI;
        this.mesh.rotation.z = this.webgl.scroll * Math.PI;
    }
}
