import React from "react";
import PropTypes from "prop-types";

const MusicPLayer = props => {
	return (
		<li
			className="classong"
			onClick={() => {
				props.change(props.song);
			}}>
			{props.song.name}
		</li>
	);
};

MusicPLayer.propTypes = {
	song: PropTypes.object,
	change: PropTypes.func
};

export default MusicPLayer;
