import React, {useEffect, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');
//
// See: https://socket.io/get-started/chatdefaultChecked="true"
//      https://www.npmjs.com/package/socket.io-client

const LiveFeed = ({ posts }) => {
  const [lowPriorityChecked, setLowPriorityChecked] = useState(false);
  const [mediumPriorityChecked, setMediumPriorityChecked] = useState(false);
  const [highPriorityChecked, setHighPriorityChecked] = useState(false);
  const [criticalPriorityChecked, setCriticalPriorityChecked] = useState(false);
  
  const [fireProblemChecked, setFireProblemChecked] = useState(false);
  const [floodProblemChecked, setFloodProblemChecked] = useState(false);
  const [powerProblemChecked, setPowerProblemChecked] = useState(false);
  const [medicalProblemChecked, setMedicalProblemChecked] = useState(false);

  const handleLowChange = (e) => { setLowPriorityChecked(!lowPriorityChecked); }
  const handleMediumChange = (e) => { setMediumPriorityChecked(!mediumPriorityChecked); }
  const handleHighChange = (e) => { setHighPriorityChecked(!highPriorityChecked); }
  const handleCriticalChange = (e) => { setCriticalPriorityChecked(!criticalPriorityChecked); }
  
  const handleFireChange = (e) => { setFireProblemChecked(!fireProblemChecked); }
  const handleFloodChange = (e) => { setFloodProblemChecked(!floodProblemChecked); }
  const handlePowerChange = (e) => { setPowerProblemChecked(!powerProblemChecked); }
  const handleMedicalChange = (e) => { setMedicalProblemChecked(!medicalProblemChecked); }

  function isChecked(post) {
    if (post.priority === "Low" && !lowPriorityChecked) return true;
    else if (post.priority === "Medium" && !mediumPriorityChecked) return true;
    else if (post.priority === "High" && !highPriorityChecked) return true;
    else if (post.priority === "Critical" && !criticalPriorityChecked) return true;
    
    else if (post.problem === "Fire" && !fireProblemChecked) return true;
    else if (post.problem === "Flood" && !floodProblemChecked) return true;
    else if (post.problem === "Power" && !powerProblemChecked) return true;
    else if (post.problem === "Medical" && !medicalProblemChecked) return true;
  }

  const filteredPosts = posts.filter(isChecked);
  return (
    <div class="page">
      <div class="checks">
        <input type="checkbox" id="low" onChange={handleLowChange} defaultChecked="true" />
        <label for="low">Low</label> <br/>
        <input type="checkbox" id="medium" onChange={handleMediumChange} defaultChecked="true" />
        <label for="medium">Medium</label> <br/>
        <input type="checkbox" id="high" onChange={handleHighChange} defaultChecked="true"/>
        <label for="high">High</label> <br/>
        <input type="checkbox" id="critical" onChange={handleCriticalChange} defaultChecked="true"/>
        <label for="critical">Critical</label>
        <hr class="hline"></hr>
        <input type="checkbox" id="fire" onChange={handleFireChange} defaultChecked="true"/>
        <label for="fire">Fire</label> <br/>
        <input type="checkbox" id="flood" onChange={handleFloodChange} defaultChecked="true"/>
        <label for="flood">Flood</label> <br/>
        <input type="checkbox" id="power" onChange={handlePowerChange} defaultChecked="true"/>
        <label for="power">Power</label> <br/>
        <input type="checkbox" id="medical" onChange={handleMedicalChange} defaultChecked="true"/>
        <label for="medical">Medical</label>
      </div>
      {filteredPosts.map( 
        ({name,image,content,problem,priority,id}) => 
          <div class="card">
            <div class="card-body" key={id}> 
              <img class="card-img-top" src={image} alt="{name}" /> <br />
                <p class="card-title">{name}</p>
                <p class="label">{problem}</p>
                <p class="label">|</p>
                <p class="label">{priority}</p> <br />
                <hr class="hline2"></hr>
                <p class="card-text">{content}</p>
            </div> 
          </div>
        )}
    </div>
  );
}

class Home extends React.Component 
{  
  render () 
  {      
    return ( 
    <div class="page">
      <h2>Welcome to the Disaster Dashboard.</h2> 
      <p>This is a hub for checking in on the issues that are currently going on in your community.</p>
      <hr></hr>
      <h4><i><b>LiveFeed: </b></i>A live feed of individual issues in the area.</h4>
      <h4><i><b>Analytics: </b></i>An active count of each issue based on problem and priority.</h4>
    </div>
    );
  }    
};

const Analytics = ({ posts }) => {
  const lowC = posts.filter( p => p.priority === "Low").length;
  return (
    <div class="page">
      <table class="analyticstable">

        <tbody>
          <tr class="tabletitle">
            <td>#</td>
            <td>Fire</td>
            <td>Flood</td>
            <td>Power</td>
            <td>Medical</td>
            <td>Total</td>
          </tr>
          <tr>
            <td class="tabletitle">Low</td>
            <td>{posts.filter( p => p.priority === "Low" && p.problem === "Fire").length}</td>
            <td>{posts.filter( p => p.priority === "Low" && p.problem === "Flood").length}</td>
            <td>{posts.filter( p => p.priority === "Low" && p.problem === "Power").length}</td>
            <td>{posts.filter( p => p.priority === "Low" && p.problem === "Medical").length}</td>
            <td>{posts.filter( p => p.priority === "Low").length}</td>
          </tr>
          <tr>
            <td class="tabletitle">Medium</td>
            <td>{posts.filter( p => p.priority === "Medium" && p.problem === "Fire").length}</td>
            <td>{posts.filter( p => p.priority === "Medium" && p.problem === "Flood").length}</td>
            <td>{posts.filter( p => p.priority === "Medium" && p.problem === "Power").length}</td>
            <td>{posts.filter( p => p.priority === "Medium" && p.problem === "Medical").length}</td>
            <td>{posts.filter( p => p.priority === "Medium").length}</td>
          </tr>
          <tr>
            <td class="tabletitle">High</td>
            <td>{posts.filter( p => p.priority === "High" && p.problem === "Fire").length}</td>
            <td>{posts.filter( p => p.priority === "High" && p.problem === "Flood").length}</td>
            <td>{posts.filter( p => p.priority === "High" && p.problem === "Power").length}</td>
            <td>{posts.filter( p => p.priority === "High" && p.problem === "Medical").length}</td>
            <td>{posts.filter( p => p.priority === "High").length}</td>
          </tr>
          <tr>
            <td class="tabletitle">Critical</td>
            <td>{posts.filter( p => p.priority === "Critical" && p.problem === "Fire").length}</td>
            <td>{posts.filter( p => p.priority === "Critical" && p.problem === "Flood").length}</td>
            <td>{posts.filter( p => p.priority === "Critical" && p.problem === "Power").length}</td>
            <td>{posts.filter( p => p.priority === "Critical" && p.problem === "Medical").length}</td>
            <td>{posts.filter( p => p.priority === "Critical").length}</td>
          </tr>
          <tr>
            <td class="tabletitle">Total</td>
            <td>{posts.filter( p => p.problem === "Fire").length}</td>
            <td>{posts.filter( p => p.problem === "Flood").length}</td>
            <td>{posts.filter( p => p.problem === "Power").length}</td>
            <td>{posts.filter( p => p.problem === "Medical").length}</td>
            <td>{posts.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


// We can get at the route parameter with this.props.match.params 
// followed by the route parameter name defined in the route.  
class RouteParmExample extends React.Component 
{
  render()
  {
    return ( <p>Route parm: {this.props.match.params.someid} </p> );
  }
}


class App extends React.Component 
{

  // Output all the posts into a table
  constructor(props) {
    super(props);

    // An array of social media posts messages, and we'll increment nextID
    // to maintain a unique ID for each post in our array
    this.state = {posts: [],nextID: 0};

    // We can setup the event handlers for the messages in the constructor...
    socket.on('connect', function(){

      console.log("Connect....");

      // When we receive a social media message, call setState and insert 
      // it into the array of posts
      socket.on('post', 

        function(data) {

          // Can uncomment this to see the raw data coming in...
          // console.log("post: " + JSON.stringify(data));

          // increment the next unique ID, and put post data into the list of 
          // posts... use the '...' syntax to make this insertion easier:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
          this.setState( 
            {posts: [...this.state.posts,
                     {name: data.name, 
                      image: data.image, 
                      content: data.content, 
                      problem: data.problem,
                      priority: data.priority,
                      id: this.state.nextID}]
            ,nextID: this.state.nextID + 1} );
        }.bind(this));
        // ^^ Like other event handlers, we bind the callback function to the 
        // component so we can use setState        

    }.bind(this));
    // ^^ ... And same with the callback function for when a connection is made
  }


  render ()
  {
    return (

      <Router>
        <div>
          <Navbar id="nav" expand="sm">
            <Navbar.Brand>Disaster Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink activeClassName="ac" className="navl" exact to="/"><p class="nav-item">Home</p></NavLink>
                <NavLink activeClassName="ac" className="navl" to="/livefeed"><p class="nav-item">LiveFeed</p></NavLink>
                <NavLink activeClassName="ac" className="navl" to="/analyitics"><p class="nav-item">Analytics</p></NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" component={Home}/>
          <Route path="/livefeed" exact render={(props) => <LiveFeed {...props} posts={this.state.posts} /> } />
          <Route path="/analyitics" component={(props) => <Analytics {...props} posts={this.state.posts} /> } />

        </div>
      </Router>
    );
  }
}

export default App;
