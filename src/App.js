import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';
import React, { useContext, createContext, Component } from 'react'
import Input from './component/inputTest'
import HoocConsole from './component/hoocConsole'
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import OtakuStayTest from './OtakuStayTest.jsx'
import UserContextProvider from './RHooks/userContextProvider'
import InnerA from './innerA'
import InnerB from './innerB'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import services from './services'
import DeathLoop from './test/dethLoop'
import TTTT from './test/twoInput'
import PPT from './ppt'
import 'antd/dist/antd.css'
// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}
const HOCFactory = (Component) => {
  console.log(Component)
  return class HOC extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }
}
function HeaderBar() {
  const CurrentUser = createContext({
    name: "rexxara"
  })
  const Notifications = createContext(["1", 2, 3, 3, 3, 3])
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
      {HOCFactory(<div>1231231</div>)}
    </header>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
      iniValue: 'ABCDEFGHIGKLMNOPQRSTUVWXYZ',
      value: '',
      color: 'green',
      showOtaku: true
    };
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }
  getData = async () => {
    const res = await services.getList()
    console.log(res)
  }
  notify = () => toast("Wow so easy !");
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    })
  }
  componentDidMount() {
    this.getData()
  }
  consoleSth = () => {
    this.getData()
  }
  render() {
    const { value } = this.state
    try {
      window.hcsl(this.state)
    } catch (error) {

    }
    return (
      <div>
        <div>
          {/* <DeathLoop />
          <TTTT/>
          <button onClick={this.consoleSth}>ffffff</button>
          <button onClick={this.notify}>Notify !</button>
          <ToastContainer /> */}
        </div>
        {/* <UserContextProvider>
          <InnerA>
          <InnerB/>
          </InnerA>
        </UserContextProvider> */}
        {/* <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Try click on rect" />
            <Rect
              x={20}
              y={20}
              width={50}
              height={50}
              fill={this.state.color}
              shadowBlur={5}
              onClick={this.handleClick}
            />
          </Layer>
        </Stage> */}
        {/* <button onClick={() => this.setState({ showOtaku: !this.state.showOtaku })}>toggleOtaku</button> */}
        {/* <OtakuStayTest /> */}
        <PPT />
      </div>
    );
  }
}

export default App

{/* <div> */ }
{/* <div id='num' data-num='233'>{num}</div>
<button onClick={this.play}>play</button>
<p>{value}</p>
<button onClick={this.stop}>stop</button> */}
{/* <HeaderBar />
<ThemeContext.Provider value={this.state.theme}>
  <Toolbar changeTheme={this.toggleTheme} />
  <ThemedButton>abc</ThemedButton>
</ThemeContext.Provider>
<Input />
<hr />
<HoocConsole open /> */}

{/* </div> */ }