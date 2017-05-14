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

//import Button from './button.js';
//import Table from './table.js';

//import {flatten, range, map, xprod} from 'ramda';

export default class EventPlannerVR extends React.Component {
  constructor() {
    super();
    this.state = {
       rotation: 130,
	     zoom: -70,
       textColor: 'white',       
    };
    const randomPosition = () => Math.floor(Math.random() * 10) - 5;
    //const grid = xprod(1, 2);
    //console.log('hello grid ' + grid);
    // this.tables = grid.map((entry, index) => {
    //   console.log('grid '+index);
    //   return {
    //     x: entry[0] * 8 + randomPosition(),
    //     y: entry[1] * 8 + randomPosition(),
    //     id: index,
    //   };
    // });
    this.tables = []
    var count = 0
    for (xPos = -2; xPos <= 2; xPos++) {
     for (zPos = -3; zPos <= -1; zPos++) {
       ++count;
      this.tables.push({
         x: 4 * xPos, // * 8 + randomPosition(),
         z: 4 * zPos,
         id: count,
      })
     }
      //console.log('hello tables ' + this.tables);
    }
    this.tables.map(table => {
      console.log('<table=' + JSON.stringify(table))
    })

  }

  render() {
    return (
    <View>

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
   
  
   <View>
      {this.tables.map(table => {
        return (<Model 
            style={{
                layoutOrigin: [0.5, 0.5],
                transform: [
                  {translate: [table.x, 0, table.z]},
                  {scale: [0.001, 0.001, 0.001] },
                  {translate: [0, 0, -1000]},
                ],
            }}
            source={{
              obj:asset('table.obj'),  
            }}
            texture={asset('wood3.jpg')}
            lit={true} 
            />
        );
      })}
   </View>
 
      <Plane
        dimWidth={10}
        dimHeight={10}
      />
    </View>
    );
  }
};

AppRegistry.registerComponent('EventPlannerVR', () => EventPlannerVR);
