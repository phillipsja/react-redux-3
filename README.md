"# react-redux-3" 

This is a continuation of [react-redux tutorial](https://www.valentinog.com/blog/react-redux-tutorial-beginners/) where now react-redux library has been added to show how you can use the [connect](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function to bind React to the store. Sort of like a helper to make the hookup simpler. 

The central ideas that might take a minute to grasp are the arguments passed to the connect function: 
- mapStateToProps function
- mapDispatchToProps function

This will allow a React component access to the exact part of the store it needs. 

Consider how function "addArticle" in project react-redux-2,  was defined in a reducer to add
an article to the redux store: 

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

And this was used in a console example by making the store global: 

store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) )

Well, we never saw how this actually gets hooked up to a component. Basically, there are two examples. 
The first uses connect without the optional second argument, mapDispatchToProps. The component is 
considered stateless since it does not store its own state, it is passed in as a prop. 

```javascript
const mapStateToProps = state => {
  return { articles: state.articles };
};
const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export List;
```

So we have wrapped article state in a function and passed it
to connect, along with the component, ConnectedList, which
returns the connected component, List. 

In the second example, only the dispatch-ing
of actions is connected, whereas the component keeps its own state. This is the weird
part for me. The component has its own state, but it still dispatches changes to the "global" 
store. 

```javascript
import { addArticle } from "../actions/index";
const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
```

According to the tutorial: 
mapDispatchToProps connects Redux actions to React props. This way a connected component is able to dispatch actions.
You can see how the action gets dispatched in the handleSubmit method:
```javascript
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id }); // Relevant Redux part!!
```

So does this mean without the connect, that 
```javascript
this.props.addArticle({ title, id }); // Relevant Redux part!!
```
wouldn't work? I'll have to think on that. 
