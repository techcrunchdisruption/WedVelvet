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
} from 'react-vr';

import Button from './button.js';
import Overlay from './overlay.js';
//import Table from './table.js';

//import {flatten, range, map, xprod} from 'ramda';

export default class EventPlannerVR extends React.Component {
  constructor() {
    super();
    this.state = {
       overlayClicked: true
    };
    this.handleOverlayClicked = this.handleOverlayClicked.bind(this);
  }

  handleOverlayClicked() {
    console.log('hiding overlay');

    this.setState((props) => {
      return {overlayClicked:false};
    });
  }

    render() {
    return (
      <Backdrop overlayClicked={this.state.handleOverlayClicked}/>
          );
  }
};



class HomeBackdrop extends React.Compoent {

  constructor() {
    super();

    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'column',
        width: 1,
        alignItems: 'stretch',
        transform: [{translate: [2, 2, -5]}]},
      intro: {
        transform: [{translate: [0, 0, -5]}]},
      });
    }

  render() {
  return (
    <View>

  <Pano source={asset('Church_Photo.jpg')}/>
  <View style={ this.styles.intro }>
    <Overlay overlayCallback={this.props.onOverlayClicked}/>
  </View>

    </View>

  );}
}

class WeddingBackdrop extends React.Compoent {
  changeTables() {
    console.log('doing something');
    this.setState(() => {
      this.calculateTables(2);
      this.showBigTable = ! this.showBigTable
    })
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

  constructor() {
    super();
    this.state = {
       rotation: 130,
       zoom: -70,
       textColor: 'white',
    };


    this.calculateTables(1);
    //this.overlayClicked = true;
    this.showBigTable = false;


  }


  render() {
  return (
    <View>
       <View>
      <Pano source={asset('Testing.png')}/>
      <View
        style={{
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [7, -1, -3]}],
        }}
        >
      <Button text='click me' callback={ () => this.changeTables() } />


    </View>

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


      </View>
    }


  }


class Backdrop extends React.Component {

  render() {

  return (
    <View>
  //   {this.props.overlayClicked ?
  //     <WeddingBackdrop />
   //
  //    :
   //
  //    </HomeBackdrop />
  //  }
   </View>
);
}
}

AppRegistry.registerComponent('EventPlannerVR', () => EventPlannerVR);
