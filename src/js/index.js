import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/app";
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);



//[previous example: 
//import store from "../js/store/index";
//import { addArticle } from "../js/actions/index";
//by adding these as globals, we can run statements in the console and heed the majesty? 
//window.store = store;
//window.addArticle = addArticle;

//start the application and run these statements in the console
//register the callback with any dispatch? 
//store.subscribe(() => console.log('Look ma, Redux!!'))
//dispatch something and witness the call back above
//store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) )
//]