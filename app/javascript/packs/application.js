// Support component names relative to this directory:
// Support component names relative to this directory:
// import "actiontext"

//= require jquery3
//= require jquery_ujs
//= require_tree .
//= require "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"

// require("../../assets/stylesheets/assets/plugins/bootstrap/js/bootstrap.min.js")
// require("../../assets/stylesheets/assets/js/vendor-all.min.js")

const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');
const axios = require('axios');

const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
ReactRailsUJS.useContext(componentRequireContext);
