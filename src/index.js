import _ from "lodash"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import YTSearch from "youtube-api-search"
import SearchBar from "./components/search_bar"
import VideoList from "./components/video_list"
import VideoDetail from "./components/video_detail"
const API_KEY = "AIzaSyA7iITGgqoVLqMfLYobciUxQkmjrJPg6es"


// Create a new component. This components shoud produce some HTML

class App extends Component {
    constructor(props){
      super(props)

      this.state = {
        videos: [],
        selectVideo: null
      }
    this.videoSearch("surfboards");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({
        videos :  videos,
        selectVideo : videos[0]
       })
    })
  }


  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectVideo}/>
        <VideoList
        onVideoSelect = { selectVideo => this.setState({selectVideo}) }
        videos = {this.state.videos} />
      </div>
    )
  }
}

// Take this component's generated HTML and put it on page in DOM


ReactDOM.render(<App />, document.querySelector(".container"))
