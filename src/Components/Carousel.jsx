import React, { useRef, useState, useEffect } from 'react';
import WintherImg from '../image/vinter-silhuet.jpg';
import AsianFlower from '../image/asiatisk-blomst.png';
import HistoryImg from '../image/geografisk-have-historien.png';

// CSS modules
import Style from '@/assets/styles/components/modules/carousel.module.scss';

//component
import CarouselCard from '../Components/CarouselCard';

const carouselData = {
	stories: [
		{
			id: 1,
			title: 'Geografisk haves historier',
			img: HistoryImg,
		},
		{
			id: 2,
			title: 'Vinter Silhuetter',
			img: WintherImg,
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

	const handleDotClick = (index) => {
		setCurrentIndex(index);
	};

	useEffect(() => {
		const handleScroll = () => {
			const container = carouselRef.current;
			const containerWidth = container.clientWidth;
			const cardWidth = container.scrollWidth / carouselData.stories.length;
			const middle = containerWidth / 2;

			const targetIndex = Math.floor(
				(container.scrollLeft + middle) / cardWidth
			);

			setCurrentIndex(targetIndex);
		};

		const container = carouselRef.current;
		container.addEventListener('scroll', handleScroll);

		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={Style.Carousel}>
			<div
				className={Style.CarouselContainer}
				ref={carouselRef}>
				{carouselData.stories.map((card, index) => (
					<div
						key={index}
						className={Style.CarouselCard}>
						<CarouselCard
							StoryImg={card.img}
							StoryTitle={card.title}
						/>
					</div>
				))}
			</div>
			<div className={Style.DotNavigation}>
				{carouselData.stories.map((_, index) => (
					<div
						key={index}
						className={`${Style.Dot} ${
							index === currentIndex ? Style.Active : ''
						}`}
						onClick={() => handleDotClick(index)}
					/>
				))}
			</div>
		</div>
	);
}

export default Carousel;
