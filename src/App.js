import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Error from './components/Error/Error';
import Particles from 'react-particles-js';
import { Component } from 'react';


const particlesConfig = {
  "particles": {
    "number": {
        "value": 60,
        "density": {
            "enable": true,
            "value_area": 1500
        }
    },
    "line_linked": {
        "enable": true,
        "opacity": 0.02
    },
    "move": {
        "direction": "right",
        "speed": 0.05
    },
    "size": {
        "value": 1
    },
    "opacity": {
        "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.5
        }
    }
},
"interactivity": {
    "events": {
        "onclick": {
            "enable": false,
            "mode": "push"
        }
    },
    "modes": {
        "push": {
            "particles_nb": 1
        }
    }
},
"retina_detect": true
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage')
        const width = Number(image.width);
        const height = Number(image.height)
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box});
        console.log(this.state.box)
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })
    }

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id 
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count }))
                    })
                    .catch(console.log)
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className='App'>
                <Particles 
                params = {particlesConfig} 
                className = 'particles'  />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { this.state.route === 'home'
                    ? <div>
                        <Logo /> 
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit} />
                        <FaceRecognition 
                            imageUrl={imageUrl}
                            box={box} />
                    </div>
                    : route === 'signin' || route === 'signout'
                        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    : route === 'signup'
                        ? <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    : <Error />
                }
            </div>
        );
    }
}

export default App;

