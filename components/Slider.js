import Slide from './Slide';
import { getWebGL } from '..';

export default class Slider {
    constructor() {
        this.webgl = getWebGL();
        this.scene = this.webgl.scene;

        this.settings = {
            count: 5,
        };

        this.current = 0;
        this.oldSlide = null;

        this.slides = this.createSlides();

        this.initEvents();
        this.initFirstSlide();
    }

    initEvents() {
        const target = this.webgl.canvas;
        this.event = new Event('SLIDE:CHANGE');
        // target.addEventListener('click', this.nextSlide.bind(this));
    }

    initFirstSlide() {
        this.slides[this.current].enter();
        this.oldSlide = this.slides[this.current];
    }

    setSlide(index) {
        if (this.oldSlide) {
            this.oldSlide.leave();
        }
        if (!this.slides[index]) return;
        this.slides[index].enter();
        this.oldSlide = this.slides[index];
    }

    nextSlide() {
        let step = this.current + 1;
        if (step > this.settings.count - 1) step = 0;
        this.current = step;

        if (this.oldSlide) {
            this.oldSlide.leave();
        }

        if (!this.slides[step]) return;
        this.slides[step].enter();
        this.oldSlide = this.slides[step];

        window.dispatchEvent(this.event);
    }

    previousSlide() {}

    createSlides() {
        const slides = [];
        for (let i = 0; i < this.settings.count; i++) {
            const slide = new Slide({
                index: i,
            });
            slides.push(slide);
        }
        return slides;
    }
}
