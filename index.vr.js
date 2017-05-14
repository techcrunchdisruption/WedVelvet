import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  AmbientLight,
  PointLight,
  DirectionalLight,
  Plane,
} from 'react-vr';

import Button from './button.js';

export default class EventPlannerVR extends React.Component {
  constructor() {
    super();
    this.state = {
       rotation: 130,
	     zoom: -70,
       textColor: 'white'
    };
  }

  render() {
    return (
    <View>
      <Pano source={asset('ballroom.jpg')}/>
      
     <Text
        style={{
          color: this.state.textColor,
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 10, -30]}],
        }}
        onEnter={() => this.setState({textColor: 'red'})}
        onExit={() => this.setState({textColor: 'white'})}>
        Move cursor over Hello Event Planner. 
      </Text>
       <AmbientLight intensity={ 2.6 }  />
       <PointLight
          intensity={0.35}
          style={{color: 'white', transform: [{translate: [0, 600, 300]}]}}
        />
       <DirectionalLight
          intensity={0.1}
          style={{transform: [{translate: [0, -600, -300]}]}}
        />
      <Model 
        style={{
            transform: [
              {translate: [-10, -10, -25]},
              {scale: 0.005 },
              {rotateY: 0},
              {rotateX: 0},
              {rotateZ: 0}
            ],
        }}
        source={{
           obj:asset('table.obj'),  
        }}
        texture={asset('wood3.jpg')}
        lit={true} 
        />
      <Model 
        style={{
            transform: [
              {translate: [10, -10, -25]},
              {scale: 0.005 },
              {rotateY: 0},
              {rotateX: 0},
              {rotateZ: 0}
            ],
        }}
        source={{
           obj:asset('table.obj'),  
        }}
        texture={asset('wood1.png')}
        lit={true} 
        />
      <Plane
        dimWidth={10}
        dimHeight={10}
      />
    </View>
    );
  }
};

AppRegistry.registerComponent('EventPlannerVR', () => EventPlannerVR);
