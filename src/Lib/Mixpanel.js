import mixpanel from 'mixpanel-browser';
import ReactGA from "react-ga4";
mixpanel.init('---MASKED---');

let env_check = true;// process.env.NODE_ENV === 'production';

let actions = {
  identify: (id) => {
    if (env_check) 
        return mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) 
        return mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check){
        ReactGA.event(name);
        return mixpanel.track(name, props);
    }   
  },
  people: {
    set: (props) => {
      if (env_check) 
        return mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;