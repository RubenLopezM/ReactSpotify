import React from "react";
import MusicPLayer from "./MusicPlayer.jsx";
import { useState } from "react";
import { useEffect } from "react";

const URL = "https://assets.breatheco.de/apis/sound/songs";
const SoundsUrl = "https://assets.breatheco.de/apis/sound/";

const Home = () => {
	const [sounds, setSounds] = useState([]);
	const [soundsComponents, setSoundsComponents] = useState([]);
	const [volume, setVolume] = useState(0.5);

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail");
			})
			.then(responseAsJSON => {
				setSounds(responseAsJSON);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	console.log(sounds);

	useEffect(() => {
		if (sounds) {
			setSoundsComponents(
				sounds.map((sound, index) => {
					return (
						<MusicPLayer
							className="music"
							song={sound}
							key={index.toString()}
							change={changeSong}></MusicPLayer>
					);
				})
			);
		}
	}, [sounds]);

	const [Song, SetSong] = useState("");

	const changeSong = song => {
		SetSong(song);
	};

	useEffect(() => {
		playAndpause();
	}, [Song]);

	const previousSong = () => {
		let currentindex = sounds.indexOf(Song);
		let btn = document.querySelector(".Playbtn");
		if (currentindex > 0) {
			SetSong(sounds[currentindex - 1]);
		} else {
			SetSong(sounds[sounds.length - 1]);
		}
		btn.textContent = "Pause";
	};

	const playAndpause = () => {
		let AUDIO = document.querySelector("audio");
		let btn = document.querySelector(".Playbtn");
		if (AUDIO.paused) {
			AUDIO.play();
			btn.textContent = "Pause";
			document
				.querySelector(".input")
				.setAttribute("max", AUDIO.duration.toFixed(0));
			AUDIO.addEventListener("timeupdate", update);
		} else {
			AUDIO.pause();
			btn.textContent = "Play";
		}
	};

	function update(e) {
		const { currentTime } = e.srcElement;
		let input = document.querySelector(".input");
		input.value = currentTime;
	}
	const nextSong = () => {
		let currentindex = sounds.indexOf(Song);
		let btn = document.querySelector(".Playbtn");
		if (currentindex < sounds.length - 1) {
			SetSong(sounds[currentindex + 1]);
		} else {
			SetSong(sounds[0]);
		}
		btn.textContent = "Pause";
	};

	const morevolume = () => {
		let AUDIO = document.querySelector("audio");
		AUDIO.volume += 0.1;
	};

	const lessvolumne = () => {
		let AUDIO = document.querySelector("audio");
		AUDIO.volume -= 0.1;
	};

	const repeataudio = () => {
		let AUDIO = document.querySelector("audio");
		if (AUDIO.loop == false) {
			AUDIO.loop = true;
		} else {
			AUDIO.loop = false;
		}
	};

	const randomsong = () => {
		let randomnumber = Math.floor(Math.random() * sounds.length);
		SetSong(sounds[randomnumber]);
	};

	let AUDIO = document.querySelector("audio");

	return (
		<div className="musicplayer">
			<h1 className="title"> Spotify</h1>
			<ol>{soundsComponents}</ol>
			<hr className="separation" />
			<audio autoPlay src={SoundsUrl.concat(Song.url)}></audio>
			<p className="namesong">{Song.name}</p>
			<input
				className="input"
				type="range"
				min="0"
				onInput={e => {
					AUDIO.currentTime = e.target.value;
				}}></input>

			<div className="btn">
				<button onClick={previousSong}>Previous</button>
				<button className="Playbtn" onClick={playAndpause}>
					Play/Pause
				</button>
				<button onClick={nextSong}>Next</button>
				<button onClick={repeataudio}>Repeat</button>
				<button onClick={randomsong}>Shuffle</button>
				<div className="volumebtn">
					<p>Volume</p>
					<button onClick={morevolume}>+</button>
					<button onClick={lessvolumne}>-</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
