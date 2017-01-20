// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/JoshComponentStyle'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('JoshComponent', () =>
  <JoshComponent />
)

export default class JoshComponent extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text>JoshComponent Component</Text>
        <Text>JoshComponent Component</Text>
        <Text>JoshComponent Component</Text>
        <Text>JoshComponent Component</Text>
      </View>
    )
  }
}

// // Prop type warnings
// JoshComponent.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// JoshComponent.defaultProps = {
//   someSetting: false
// }
