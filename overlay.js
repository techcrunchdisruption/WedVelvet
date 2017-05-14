import React from 'react';
import { StyleSheet, Text, Plane, View, Image } from 'react-vr';
import Button from './button.js';

export default class Overlay extends React.Component {
	constructor() {
		super();
		this.styles = StyleSheet.create({
			main: {
				color: 'lightcyan',
				opacity: 0.5,

			},
			inset: {
				//color: 'lightblue',
				//opacity: 0.5,

			},

		})
	}

	onCallback(){
			console.log('in onCallback');
			this.props.overlayCallback();
	}

		render() {
			return (
				<View>

					<Image source={{uri: '../static_assets/Overlay.png'}} onEnter={ () => this.onCallback()} style={{width: 5, height: 2, transform: [{translate: [-2, 1, 0]}]}} />

				</View>


				); } }
