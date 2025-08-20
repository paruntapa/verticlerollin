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
        arcRadius: 500
    }

    const spotlightItems = [
        { name: 'Silent Arc', img: 'images/img_1.jpg'},
        { name: 'Bloom25', img: 'images/img_2.jpg'},
        { name: 'Glass Fade', img: 'images/img_3.jpg'},
        { name: 'Echo g', img: 'images/img_4.jpg'},
        { name: 'Velvet Loop', img: 'images/img_5.jpg'},
        { name: 'Field Two', img: 'images/img_6.jpg'},
        // { name: 'Stillroom', img: 'images/img_7.jpg'},
        // { name: 'Ghostline', img: 'images/img_8.jpg'},
        // { name: 'Mono 73', img: 'images/img_9.jpg'},

    ]

    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        const titlesContainer = document.querySelector('.spotlight-title') as HTMLElement;
        const imagesContainer = document.querySelector('.spotlight-images') as HTMLElement;
        const spotlightHeader = document.querySelector('.spotlight-header') as HTMLElement;
        const titlesContainerElement = document.querySelector(
            ".spotlight-titles-container"
        )

        const introTextElements = document.querySelectorAll(
            ".spotlight-intro-text"
        ) as NodeListOf<HTMLElement>;
        const imagesElements = [];

        spotlightItems.forEach((item, index) => {
            const titleElement = document.createElement('h1');
            titleElement.textContent = item.name;
            if (index === 0) titleElement.style.opacity = '1';
            titlesContainer?.appendChild(titleElement);

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'spotlight-img'
            const imgElement = document.createElement("img");
            imgElement.src = item.img;
            imgElement.alt = item.name;
            imgWrapper.appendChild(imgElement);
            imagesContainer.appendChild(imgWrapper);
            imagesElements.push(imgWrapper);
        });

        const titleElements = titlesContainer.querySelectorAll('h1');
        let currentActiveIndex = 0;

        const containerWidth = window.innerWidth * 0.3;
        const containerHeight = window.innerHeight;
        const arcStartX = containerWidth - 220;
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
            <div className="spotlight-title-container absolute top-0 left-15vw w-[100%] h-[100%] overflow-hidden ">
                <div className="spotlight-title"></div>
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