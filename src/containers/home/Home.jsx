import React, { useState } from "react";
import apply from "../../images/apply.png";
import "./home.css";

function Home() {
	const ReadMore = ({ children }) => {
		const text = children;
		const [isReadMore, setIsReadMore] = useState(true);
		const toggleReadMore = () => {
			setIsReadMore(!isReadMore);
		};
		return (
			<p className="text">
				{isReadMore ? text.slice(0, 150) : text}
				<span onClick={toggleReadMore} className="read-or-hide">
					{isReadMore ? "...read more" : " show less"}
				</span>
			</p>
		);
	};

	return (
		<>
			<div className="library_database">
				<h1>Home</h1>
			</div>

			<div className="container">
				<div className="grey_box">
					<h3>Available Seats</h3>
					<h2>40</h2>
				</div>
				<div className="grey_box">
					<h3>Available Group Work Areas</h3>
					<h2>4</h2>
				</div>
				<div className="grey_box">
					<h3>Job opportunities</h3>
					<h2>2</h2>
				</div>
			</div>

			<div className="read_container">
				<h1>Announcements!</h1>
				{/* <img src={apply} alt=""></img> */}
				<p>
					<ReadMore>
						Test1 Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Nostrum mollitia repellat possimus fugit quas
						repudiandae omnis, voluptatibus exercitationem aliquid
						placeat, architecto, voluptatum officiis repellendus
						odio sint obcaecati aut vitae similique?
					</ReadMore>
				</p>
				<p>
					<ReadMore>
						Test2 Lorem, ipsum dolor sit amet consectetur
						adipisicing elit. Deserunt tenetur minima commodi
						reprehenderit perspiciatis quam praesentium illo, itaque
						voluptas suscipit amet ea perferendis vero, non officia
						deleniti hic? Perspiciatis, magni?
					</ReadMore>
				</p>
			</div>
		</>
	);
}

export default Home;
