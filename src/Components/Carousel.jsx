import React from 'react';
import WintherImg from '../image/vinter-silhuet.jpg';
import AsianFlower from '../image/asiatisk-blomst.png';

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
	return (
		<div>
			{carouselData &&
				carouselData.stories.map((card) => (
					<CarouselCard
						key={card.id}
						StoryImg={card.img}
						StoryTitle={card.title}
					/>
				))}
		</div>
	);
}

export default Carousel;
