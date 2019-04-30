import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';
import React ,{useContext,createContext}from 'react';
import Input from './component/inputTest'


// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

function HeaderBar() {
  const CurrentUser=createContext({
    name:"rexxara"
  })
  const Notifications=createContext(["1",2,3,3,3,3])
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
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
  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <div>
        <HeaderBar/>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <div>
          <ThemedButton text={"1111"}/>
        </div>
        <Input/>
      </div>
    );
  }
}

export default App