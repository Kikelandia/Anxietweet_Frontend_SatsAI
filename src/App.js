import anxieImg from './logo.jpg'
import './App.css';
import React from "react";
import axios from "axios";

import RenderResults from "./Components/ResultsFromPrediction"
import PublicConstants from "./Utils/Constants"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.predictMessage = this.predictMessage.bind(this);
    this.realtimetweet = this.realtimetweet.bind(this);
    this.renderInputForUserText = this.renderInputForUserText.bind(this);
    this.userText = this.userText.bind(this);
    this.showHideInstructions = this.showHideInstructions.bind(this);

    this.state = {
      show_Instructions : false,
      original_text : null,
      message : "",
      cleanned_text : "",
      number_interpretation : "",
      original_tweet : "",
      original_tweet_prediction : "",
      original_tweet_accuracy : "",
      orig_tweet_button_disabled : false,
      realTweet : "",
      realTweetProcessed : "",
      realTweetasNumbers : "",
      realTweetPrediction : "",
      realTweetAccuracy : "",
      realTweetID : 0,
      realTweetButtonDisabled : false,
      userUsingApp : false,
      usertText : "",
      usertTextProcessed : "",
      usertTextasNumbers : "",
      usertTextPrediction : "",
      usertTextAccuracy : "",
      usertTextButtonDisabled : false,
      errorInPredTrans : false
    };
  }



  predictMessage(e){
    e.preventDefault();
    this.setState( { original_text : "Loading...",
                      orig_tweet_button_disabled : true}, () => {
      axios.post(`http://127.0.0.1:5000/getDBTweet`, {
        message : this.state.message
      }).then((result) => {
        this.setState({
          original_text : result.data.tweetFromDB,
          cleanned_text : result.data.preprocessedTweetFromDB,
          number_interpretation : result.data.vectorizedTweetFromDB,
          original_tweet_prediction : result.data.finalPrediction,
          original_tweet_accuracy : result.data.predAccuracy,
          orig_tweet_button_disabled : false
        })
      })
    });
  }

  realtimetweet(e){
    e.preventDefault();
    this.setState( { realTweet : "Loading..." ,
                      realTweetButtonDisabled : true}, () => {
      axios.post("http://127.0.0.1:5000/getRealTweet", {
        message : this.state.message
      }).then((result) => {
        this.setState({
          realTweet : result.data.recentTweet,
          realTweetProcessed : result.data.recentTweetProcessed,
          realTweetasNumbers : result.data.recentTweetasNumbers,
          realTweetPrediction : result.data.finalPrediction,
          realTweetAccuracy : result.data.predAccuracy,
          realTweetID : result.data.tweetID,
          realTweetButtonDisabled : false
        })
      })
    });
  }

  renderInputForUserText(e){
    e.preventDefault();
    this.setState({userUsingApp:true})
  }

  userText(e){
    e.preventDefault();
    console.log(this.state.usertTextProcessed)
    this.setState( { usertTextProcessed : "Loading..." ,
                      usertTextButtonDisabled : true}, () => {
      axios.post("http://127.0.0.1:5000/processUserText", {
        message : this.state.usertText
      }).then((result) => {
        this.setState({
          usertTextProcessed : result.data.userTextProcessed,
          usertTextasNumbers : result.data.userTextasNumbers,
          usertTextPrediction : result.data.finalPrediction,
          usertTextAccuracy : result.data.predAccuracy,
          usertTextButtonDisabled : false
        })
        if (result.data.userTextasNumbers === ""){
          this.setState({errorInPredTrans : true})
        } else {
          this.setState({errorInPredTrans : false})
        }
      })
    });
  }

  showHideInstructions(e){
    if (!this.state.show_Instructions){
      this.setState({show_Instructions:true})
    } else {
      this.setState({show_Instructions:false})
    }
  }

  render() {
    let instructions = [];
    let original_text = null;
    let real_time_tweet = null;
    let input_for_user = null;
    let results_from_users_text = null;
    let renderErrorInPred = null

    if (this.state.original_text){
      original_text =
      <React.Fragment>
        <RenderResults
          originalText = {this.state.original_text}
          preProcessedText = {this.state.cleanned_text}
          transformedText = {this.state.number_interpretation}
          finalPrediction = {this.state.original_tweet_prediction}
          accuracyPrediction = {this.state.original_tweet_accuracy}
          />
      </React.Fragment>
    }

    if (this.state.realTweet){
      real_time_tweet =
      <React.Fragment>
        <RenderResults
          originalText = {this.state.realTweet}
          preProcessedText = {this.state.realTweetProcessed}
          transformedText = {this.state.realTweetasNumbers}
          finalPrediction = {this.state.realTweetPrediction}
          accuracyPrediction = {this.state.realTweetAccuracy}
          realTweetID = {this.state.realTweetID}
          />
      </React.Fragment>
    }

    if (this.state.usertTextasNumbers){
      results_from_users_text =
      <React.Fragment>
        <RenderResults
          preProcessedText = {this.state.usertTextProcessed}
          transformedText = {this.state.usertTextasNumbers}
          finalPrediction = {this.state.usertTextPrediction}
          accuracyPrediction = {this.state.usertTextAccuracy}
          />
      </React.Fragment>
    }

    if (this.state.userUsingApp){
      input_for_user =
      <div>
        <textarea
          value = {this.state.usertText}
          onChange = {inputText => {
            this.setState({ usertText : inputText.target.value });
            }}
          />
          <br/>
        <button
          onClick = {this.userText}
          className = "btn btn-lg btn-secondary"
          disabled={this.state.usertTextButtonDisabled}>
          Sumbit
        </button>
      </div>
    }

    if (this.state.show_Instructions){
      const template = 'instructionsTemplate'
      Object.getOwnPropertyNames(PublicConstants).filter(e =>
        e.includes(template)).forEach((value) => {
          var tempStr = PublicConstants[value];
          instructions.push(<li key={value}>{tempStr}</li>);
          if (tempStr=== PublicConstants.instructionsTemplate4){
            instructions.push(<br key="br"></br>);
          }
      })
    }

    if (this.state.errorInPredTrans){
      renderErrorInPred =
      <div>
        <p>{PublicConstants.errorInPredTransTemplate}
            <br/>
            {PublicConstants.errorInPredTransTemplate2}
        </p>
        <li>{PublicConstants.errorInPredTransTemplate3}</li>
        <li>{PublicConstants.errorInPredTransTemplate4}</li>
        <li>{PublicConstants.errorInPredTransTemplate5}</li>
      </div>
    }

    return (
      <div className="anxietweetMain text-center">
        <div>
          <button
          className = "btn btn-lg btn-secondary"
          onClick = {this.showHideInstructions}>
            Show / Hide Instructions
          </button>
          <br/>
          <br/>
        </div>
        <div>
          {instructions}
        </div>
        <div>
          <p>
            <a href = "/" className = "anxieLogo">
              <img src={anxieImg} alt = "Anxie Tweet Logo"/>
            </a>
          </p>
          <form onSubmit = {this.predictMessage} >
            <p>
              <button type = "submit"
                      className = "btn btn-lg btn-primary"
                      disabled={this.state.orig_tweet_button_disabled}>
                      Stored Tweet
              </button>
            </p>
            </form>
          {original_text}

          <div>
            <form onSubmit = {this.realtimetweet} >
              <p>
                <button type = "submit"
                        className = "btn btn-lg btn-primary"
                        disabled={this.state.realTweetButtonDisabled}>
                        Real Time Tweet
                </button>
              </p>
            </form>
            {real_time_tweet}
          </div>

          <div>
            <button onClick = {this.renderInputForUserText}
                    className = "btn btn-lg btn-primary">
                    Try it With Your Own Text
            </button>
          </div>
          <div>
            {input_for_user}
          </div>
          <div>
            {results_from_users_text}
          </div>
            {renderErrorInPred}
        </div>
      </div>
    );
  }
}

export default App;
