import React from 'react'
import { StyleSheet, Text, Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text as NText } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { startClock, pauseClock, resetClock } from '../actions/clock'

type Props = {
  startClock: Function,
  pauseClock: Function,
  resetClock: Function,
  clockTime: number
}

const { height } = Dimensions.get('window')
/* native-base doesn't support StyleSheet :/ */
const actionIconStyle = {
  color: '#fff',
  alignSelf: 'center',
  fontSize: 78
}
const NAV_HEIGHT: number = Platform.OS === 'ios' ? 32 : 40

class Home extends React.Component {
  props: Props

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Chrono</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Grid>
            <Row style={{ backgroundColor: '#343434', height: height / 2 - NAV_HEIGHT }}>
              <Col style={{ justifyContent: 'center' }}>
                <Text style={styles.timeText}>
                  {this.props.clockTime}
                </Text>
                <Button style={{ position: 'absolute', right: 10, top: 10 }} onPress={this._resetClock}>
                  <NText>Reset</NText>
                </Button>
              </Col>
            </Row>
            <Row style={{ backgroundColor: '#343434', height: height / 2 - NAV_HEIGHT }}>
              <Col style={{ backgroundColor: '#26A69A' }}>
                <Button full style={{ flex: 1, backgroundColor: '#26A69A' }} onPress={this._startClock}>
                  <Icon style={actionIconStyle} name='play' />
                </Button>
              </Col>
              <Col style={{ backgroundColor: '#5C6BC0' }}>
                <Button full style={{ flex: 1, backgroundColor: '#5C6BC0' }} onPress={this._pauseClock}>
                  <Icon style={actionIconStyle} name='pause' />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }

  _startClock = (): void => {
    this.props.startClock()
  }

  _pauseClock = (): void => {
    this.props.pauseClock()
  }

  _resetClock = (): void => {
    this.props.resetClock()
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  textCenter: {
    textAlign: 'center'
  },
  timeText: {
    color: '#fff',
    fontSize: 78,
    textAlign: 'center'
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ clock }) => ({
  clockTime: clock.time
})

const mapDispatchToProps = dispatch => ({
  startClock: bindActionCreators(startClock, dispatch),
  pauseClock: bindActionCreators(pauseClock, dispatch),
  resetClock: bindActionCreators(resetClock, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
