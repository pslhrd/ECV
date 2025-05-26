import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createScroll(webgl) {
    const target = document.querySelector('.scroller');
    const sections = target.querySelectorAll('div');

    ScrollTrigger.create({
        trigger: target,
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
            webgl.scroll = self.progress;
        },
        onToggle: () => {},
    });
}
