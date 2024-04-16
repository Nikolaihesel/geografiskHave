import React, { useRef, useState} from 'react';
import WintherImg from '../image/vinter-silhuet.jpg';
import AsianFlower from '../image/asiatisk-blomst.png';

// CSS modules
import Style from "../assets/styles/components/modules/carousel.module.scss";

//component
import CarouselCard from '../Components/CarouselCard';
const carouselData = {
	stories: [
		{
			id: 1,
			title: 'Vinter Silhuetter',
			img: WintherImg,
		},
		{
			id: 2,
			title: 'Geografiskhaves historie',
			img: AsianFlower,
		},
		{
			id: 3,
			title: 'Asiens eventyrlige planer',
			img: AsianFlower,
		},
	],
};

function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef();
	let startX;

	const handleTouchStart = (e) => {
		startX = e.touches[0].clientX;
	};

	const handleTouchMove = (e) => {
		if (!startX) {
			return;
		}

		let xDiff = startX - e.touches[0].clientX;
		startX = null;

		if (xDiff > 0) {
			// swiped left
			setCurrentIndex((currentIndex + 1) % carouselData.stories.length);
		} else {
			// swiped right
			setCurrentIndex((currentIndex - 1 + carouselData.stories.length) % carouselData.stories.length);
		}
	};

	const handleTransitionEnd = () => {
		if (currentIndex === 0) {
			setCurrentIndex(carouselData.stories.length);
		} else if (currentIndex === carouselData.stories.length + 1) {
			setCurrentIndex(1);
		}
	};

	return (
	<div className={Style.Carousel}
		onTouchStart={handleTouchStart}
		onTouchMove={handleTouchMove}
		onTransitionEnd={handleTransitionEnd}
	>
		<div className={Style.CarouselContainer} ref={carouselRef}>
			{[carouselData.stories[carouselData.stories.length - 1], ...carouselData.stories, carouselData.stories[0]].map((card, index) => (
				<CarouselCard
					key={index}
					StoryImg={card.img}
					StoryTitle={card.title}
					style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
				/>
			))}
		</div>
	</div>
	);
}

export default Carousel;