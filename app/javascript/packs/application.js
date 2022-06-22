// Support component names relative to this directory:
// Support component names relative to this directory:
import 'actiontext';
import 'controllers';

const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');
const axios = require('axios');

const csrf = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
ReactRailsUJS.useContext(componentRequireContext);
