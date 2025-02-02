import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {Animated, Easing, TouchableOpacity, View} from 'react-native';
import Pulse from './Pulse';
import {PINK, White} from '../../themes/constantColors';
import {shadow} from '../../utils/regex';
import FastImage from 'react-native-fast-image';

const LocationPulseLoader: FunctionComponent<> = ({interval}: any) => {
	const [state, setState] = useState({
		circles: []
	})
	const anim = useRef(new Animated.Value(1));
	const counter = useRef(1);
	const saveInterval = useRef(null);
	

	const setCircleInterval = () => {
		saveInterval.current = setInterval(addCircle.bind(this), interval);
		addCircle();
	}

	useEffect(() => {
		setCircleInterval();
	}, [])


	const addCircle = () => {
		setState({ circles: [...state.circles, counter] });
		counter.current++;
	}

	onPressIn() {
		Animated.timing(this.anim, {
			toValue: this.props.pressInValue,
			duration: this.props.pressDuration,
			easing: this.props.pressInEasing,
		}).start(() => clearInterval(this.setInterval));
	}

	onPressOut() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.pressDuration,
			easing: this.props.pressOutEasing,
		}).start(this.setCircleInterval.bind(this));
	}

	render() {
		const { size, avatar, avatarBackgroundColor, interval } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}

				<TouchableOpacity
					activeOpacity={1}
					onPressIn={this.onPressIn.bind(this)}
					onPressOut={this.onPressOut.bind(this)}
					style={{
						transform: [{
							scale: this.anim
						}]
					}}
				>
					<FastImage
						source={{ uri: avatar }}
						style={{
							width: size,
							height: size,
							borderRadius: size/2,
							backgroundColor: avatarBackgroundColor,
							borderWidth: 2,
							borderColor: White,
							...shadow(5)
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

LocationPulseLoader.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  avatar: PropTypes.string.isRequired,
  avatarBackgroundColor: PropTypes.string,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
};

LocationPulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  avatar: undefined,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: PINK,
  backgroundColor: PINK,
  getStyle: undefined,
};

