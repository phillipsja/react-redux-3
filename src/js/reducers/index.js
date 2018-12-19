import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
		  //this is what we want to do essentially, but state must be immutable
      //state.articles.push(action.payload);
			//return state;
			//this is ok, but note that we could make it better? 
			//return { ...state, articles: state.articles.concat(action.payload) };
			//note the state hasn't been changed, what are we returning here? an object containing existing state and new articles list (or state entry)? 
			return { ...state, articles: [...state.articles, action.payload] };

    default:
      return state;
  }
};
export default rootReducer;