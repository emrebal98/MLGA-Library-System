import React, { useState, useEffect } from "react";
import axios from "axios";
// import apply from "../../images/apply.png";
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

	const [seats, setSeats] = useState([]);
	const [gSeats, setgSeats] = useState([]);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/seat/0", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setSeats(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get("http://localhost:5000/seat/1", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setgSeats(temp);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get("http://localhost:5000/job", { withCredentials: true })
			.then((res) => {
				let temp = res.data;
				// console.log(res.data);
				if (temp.length > 0) {
					setJobs([]);
					for (let index = 0; index < temp.length; index++) {
						const element = temp[index];

						setJobs((prevState) => [
							...prevState,
							{
								id: element.jID,
								jobName: element.jTitle,
								description: element.jDescription,
								availability: element.jAvailability,
							},
						]);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="home">
				<h1>Home</h1>
				<div className="container">
					<div className="grey_box">
						<h3>Total Seats</h3>
						<h2>{seats.length}</h2>
					</div>
					<div className="grey_box">
						<h3>Total Group Work Areas</h3>
						<h2>{gSeats.length}</h2>
					</div>
					<div className="grey_box">
						<h3>Job opportunities</h3>
						<h2>{jobs.length}</h2>
					</div>
				</div>
				<div className="read_container">
					<h1>Announcements!</h1>
					{/* <img src={apply} alt=""></img> */}
					<p>
						<ReadMore>
							Test1 Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Nostrum mollitia repellat possimus
							fugit quas repudiandae omnis, voluptatibus
							exercitationem aliquid placeat, architecto,
							voluptatum officiis repellendus odio sint obcaecati
							aut vitae similique?
						</ReadMore>
					</p>
					<p>
						<ReadMore>
							Test2 Lorem, ipsum dolor sit amet consectetur
							adipisicing elit. Deserunt tenetur minima commodi
							reprehenderit perspiciatis quam praesentium illo,
							itaque voluptas suscipit amet ea perferendis vero,
							non officia deleniti hic? Perspiciatis, magni?
						</ReadMore>
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;
