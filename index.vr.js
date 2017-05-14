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
  StyleSheet,
  Plane,
  Image
} from 'react-vr';

import Button from './button.js';
import Overlay from './overlay.js';
//import Table from './table.js';

//import {flatten, range, map, xprod} from 'ramda';

export default class EventPlannerVR extends React.Component {
  constructor() {
    super();
    this.state = {
       rotation: 130,
	     zoom: -70,
       textColor: 'white',
       stage: 1
    };

    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'column',
        width: 1,
        alignItems: 'stretch',
        transform: [{translate: [2, 2, -5]}], },
      intro: {
        transform: [{translate: [0, 0, -5]}], },
      });
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
    this.calculateTables(1);
    //this.stage = true;
    this.showBigTable = false;
    this.changeToStage = this.changeToStage.bind(this);

  }

  calculateTables(size) {
    this.tables = []
    var count = 0
    for (xPos = -size; xPos <= size; xPos++) {
     for (zPos = -3; zPos <= -1; zPos++) {
       if(xPos == 0) {
         continue;
       }
       ++count;
      this.tables.push({
         x: 3 * xPos, // * 8 + randomPosition(),
         z: 3 * zPos,
         id: count,
      })
     }
      //console.log('hello tables ' + this.tables);
    }
    this.tables.map(table => {
      console.log('<table=' + JSON.stringify(table))
    })
  }

  doSomethingInteresting() {
    console.log('doing something');
    this.setState(() => {
      this.calculateTables(2);
      this.showBigTable = ! this.showBigTable
    })
  }


  changeToStage(stage) {
    console.log('*********changing to :' + stage);

    this.setState((props) => {
      return {stage:stage};
    });
  }
 render(){
    let backdrop = null;

      if(this.state.stage == 1){
        backdrop =  <View>
          <Pano source={asset('Church_Photo.jpg')}/>
          <View style={ this.styles.intro }>
          <Overlay overlayCallback={this.changeToStage}/>
          </View>
          </View>;
    }
    else if(this.state.stage == 2){
      backdrop =  <View>
        <Pano source={asset('Church_Photo.jpg')}/>
        <View>
        <Image source={{uri: '../static_assets/venue_options.png'}} style={{width: 16, height: 4, transform: [{translate: [-7, 1.5, 0]}]}} />
        <Image source={{uri: '../static_assets/Transparant_Screen.png'}} onEnter={ () => this.changeToStage(3)} style={{width: 1, height: 1, transform: [{translate: [-3.30, 5, 0]}]}} />
        <Image source={{uri: '../static_assets/Grace_Assistant_HomePage.png'}} style={{width: 30, height: 8, transform: [{translate: [-14.5, 8, -3]}]}} />

        </View>
        </View>;
      }

      else{
        backdrop =
        <View>
        <Pano source={asset('Matrix_Room.png')}
        style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              {rotateY: 90},
            ],
        }}
        />
        <View>
  {  (this.showBigTable ?
     <Model
         style={{
             layoutOrigin: [0.5, 0.5],
             transform: [
               {translate: [0, 0, -5]},
               {scale: [0.021, 0.021, 0.021] },
             ],
         }}
         source={{
           obj:asset('rect-table.obj'),
         }}
         texture={asset('wood3.jpg')}
         lit={true}
         />
       :
         <View/>)
   }
</View>
<View>
   {this.tables.map(table => {
     return (<Model
         style={{
             layoutOrigin: [0.5, 0.5],
             transform: [
               {translate: [table.x, 0, table.z]},
               {scale: [0.001, 0.001, 0.001] },
             ],
         }}
         source={{
           obj:asset('round-table.obj'),
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
        </View>;
    }


  return (<View>{backdrop}</View>);

  }
};

AppRegistry.registerComponent('EventPlannerVR', () => EventPlannerVR);
