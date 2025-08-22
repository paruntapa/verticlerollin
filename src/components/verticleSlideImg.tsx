"use client"

import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const verticleSlideImg = () => {

    gsap.registerPlugin(ScrollTrigger)

    const config = {
        gap: 0.08,
        speed: 0.3,
        arcRadius: 200
    }

    const spotlightItems = [
        { name: 'Eminem', img: 'images/img_1.jpg'},
        { name: 'Messi', img: 'images/img_2.jpg'},
        { name: 'Choso', img: 'images/img_3.jpg'},
        { name: 'Silent Voice', img: 'images/img_4.jpg'},
        { name: 'Velvet Loop', img: 'images/img_5.jpg'},
        { name: 'Fairy Tail', img: 'images/img_6.jpg'},
        // { name: 'Stillroom', img: 'images/img_7.jpg'},
        // { name: 'Ghostline', img: 'images/img_8.jpg'},
        // { name: 'Mono 73', img: 'images/img_9.jpg'},

    ]

    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        const titlesContainer = document.querySelector('.spotlight-titles') as HTMLElement;
        const imagesContainer = document.querySelector('.spotlight-images') as HTMLElement;
        const spotlightHeader = document.querySelector('.spotlight-header') as HTMLElement;
        const titlesContainerElement = document.querySelector(
            ".spotlight-titles-container"
        )

        const introTextElements = document.querySelectorAll(
            ".spotlight-intro-text"
        ) as NodeListOf<HTMLElement>;
        const imagesElements: HTMLElement[] = [];

        spotlightItems.forEach((item, index) => {
            const titleElement = document.createElement('h1');
            titleElement.textContent = item.name;
            if (index === 0) titleElement.style.opacity = '1';
            titlesContainer?.appendChild(titleElement);

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'spotlight-img'
            const imgElement = document.createElement("img");
            imgElement.src = item.img;
            imgElement.alt = '';
            imgWrapper.appendChild(imgElement);
            imagesContainer.appendChild(imgWrapper);
            imagesElements.push(imgWrapper);
        });

        const titleElements = titlesContainer.querySelectorAll('h1');
        let currentActiveIndex = 0;

        const containerWidth = window.innerWidth * 0.5;
        const containerHeight = window.innerHeight;
        const arcStartX = 100 + containerWidth; // Position images at far left
        const arcStartY = -200;
        const arcEndY = containerHeight + 200;
        const arcControlPointX = arcStartX + config.arcRadius;
        const arcControlPointY = containerHeight / 2;


        function getBezierPosition(t: number){
        const x =
            (1 - t) * (1 - t) * arcStartX +
            2 * (1 - t ) * t * arcControlPointX +
            t * t * arcStartX;
        const y =
            (1 - t) * (1 - t) * arcStartY +
            2 * (1 - t) * t * arcControlPointY +
            t * t * arcEndY;
        return { x, y};
        }

        function getImgProgressState(index: number, overallProgress: number) {
            const startTime = index * config.gap;
            const endTime = startTime + config.speed;

            if (overallProgress < startTime) return - 1;
            if (overallProgress > endTime) return 2;

            return (overallProgress - startTime) / config.speed;
        }

        imagesElements.forEach((img) => (gsap.set(img, { opacity: 0 })));

        ScrollTrigger.create({
            trigger: ".spotlight",
            start: "top top",
            end: `+=${window.innerHeight * 10}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                if (progress <= 0.2) {
                    const animationProgress = progress / 0.2;

                    const moveDistance = window.innerWidth * 0.6;

                    gsap.set(introTextElements[0], {
                        x: -animationProgress * moveDistance,
                    });
                    gsap.set(introTextElements[1], {
                        x: animationProgress * moveDistance,
                    });
                    gsap.set(introTextElements[0], { opacity: 1 });
                    gsap.set(introTextElements[1], { opacity: 1 });

                    gsap.set(".spotlight-bg-img", {
                        transform: `scale(${animationProgress})`,
                    });
                    gsap.set(".spotlight-bg-img img", {
                        transform: `scale(${1.5 - animationProgress * 0.5})`,
                    });

                    imagesElements.forEach((img) => gsap.set(img, { opacity: 0 }));
                    spotlightHeader.style.opacity = "0";
                    gsap.set(titlesContainerElement, {
                        "--before-opacity": "0",
                        "--after-opacity": "0"
                    });
                }

                else if ( progress > 0.2 && progress <= 0.25 ){
                    gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
                    gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

                    gsap.set(introTextElements[0], { opacity: 0 });
                    gsap.set(introTextElements[1], { opacity: 0 });

                    imagesElements.forEach((img)=> gsap.set(img, { opacity: 0 }));
                    spotlightHeader.style.opacity = "1";
                    gsap.set(titlesContainerElement, {
                        "--before-opacity": "1",
                        "--after-opacity": "1",
                    });
                }

                else if ( progress > 0.25 && progress <= 0.95 ) {
                    gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
                    gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

                    gsap.set(introTextElements[0], { opacity: 0 });
                    gsap.set(introTextElements[1], { opacity: 0 });

                    spotlightHeader.style.opacity = "1";
                    gsap.set(titlesContainerElement, {
                        "--before-opacity": "1",
                        "--after-opacity": "1",
                    });

                    const switchProgress = ( progress - 0.25 ) / 0.7;
                    const viewportHeight = window.innerHeight;
                    const titlesContainerHeight = titlesContainer.scrollHeight;
                    const startPosition = viewportHeight;
                    const targetPosition = -titlesContainerHeight;
                    const totalDistance = startPosition - targetPosition;
                    const currentY = startPosition - switchProgress * totalDistance;

                    gsap.set(".spotlight-titles", {
                        transform: `translateY(${currentY}px)`,
                    });

                    imagesElements.forEach((img, idx) => {
                        const imageProgress = getImgProgressState(idx, switchProgress);

                        if (imageProgress < 0 || imageProgress > 1) {
                            gsap.set(img, { opacity: 0 });
                        } else {
                            const pos = getBezierPosition(imageProgress);
                            gsap.set(img, {
                                x: pos.x,
                                y: pos.y - 75,
                                opacity: 1
                            });
                        }
                    });

                    const viewportMiddle = viewportHeight / 2;
                    let closesetIndex = 0;
                    let closestDistance = Infinity;

                    titleElements.forEach((title, index) => {
                        const titleRect = title.getBoundingClientRect();
                        const titleCenter = titleRect.top + titleRect.height / 2;
                        const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

                        if ( distanceFromCenter < closestDistance) {
                            closestDistance = distanceFromCenter;
                            closesetIndex = index;
                        }
                    });

                    if ( closesetIndex !== currentActiveIndex) {
                        if ( titleElements[currentActiveIndex]) {
                            titleElements[currentActiveIndex].style.opacity = "0.25";
                        }
                        titleElements[closesetIndex].style.opacity = "1";
                        const bgImgElement = document.querySelector(".spotlight-bg-img img") as HTMLImageElement;
                        if (bgImgElement) {
                            bgImgElement.src = spotlightItems[closesetIndex].img;
                        }
                        currentActiveIndex = closesetIndex;
                    }
                } else if ( progress > 0.95) {
                    spotlightHeader.style.opacity = "0";
                    gsap.set(titlesContainerElement, {
                        "--before-opacity": "0",
                        "--after-opacity": "0",
                    })
                }
            }

        })

    })

  return (
    <div>
        <section className='intro'>
            <h1>Surreal Frames.</h1>
        </section>
        <section className='spotlight'>
            <div className="spotlight-intro-text-wrapper absolute top-[50%] flex gap-[0.5rem] translate-y-[-50%] w-[100%]">
                <div className="spotlight-titles-container flex-1 relative will-change-transform spotlight-intro-text">
                    <p>Beneath</p>
                </div>
                <div className="spotlight-titles-container flex-1 relative will-change-transform spotlight-intro-text">
                    <p>Beyond</p>
                </div>
            </div>

            <div className='spotlight-bg-img absolute w-[100%] h-[100%] overflow-hidden will-change-transform'>
                <img src="images/img_1.jpg" alt="" />
            </div>
            <div className="spotlight-titles-container absolute  left-[300px] w-[100%] h-[100%] overflow-hidden ">
                <div className="spotlight-titles"></div>
            </div>
            
            <div className="spotlight-images"></div>

            <div className="spotlight-header">
                <p>Discover</p>
            </div>
        </section>
        <section className='outro'>
            <h1>Everthing in verticle motion.</h1>
        </section>
    </div>
  )
}

export default verticleSlideImg