import React, { Component } from "react";

import Utils from "../Utils/Utils"
import PublicConstants from "../Utils/Constants"

class RenderResults extends Component{
  constructor(props) {
    super();
    this.tools = new Utils()
  }

  render() {
    let original_Text = null
    let hyperlinkForRealTweet = null
    let classesAccuracy = this.props.accuracyPrediction
    classesAccuracy = this.tools.cleanStrAndRetArrOfFloats(classesAccuracy)
    var maxValue = Math.max.apply(Math,classesAccuracy)
    let predictionInterpretation = null

    if ("originalText" in this.props){
      original_Text =
      <p>
        Original Text:
          <br/>
            {this.props.originalText}
      </p>
    }
    
    if (this.props.realTweetID){
      var url = "https://twitter.com/twitter/statuses/" + this.props.realTweetID
      hyperlinkForRealTweet =
        <a href={url} target="_blank" rel="noopener noreferrer">
          Original Tweet
        </a>
    }

    if (this.props.finalPrediction){
      if (this.props.finalPrediction === "-1"){
        predictionInterpretation = PublicConstants.resultPredTemplate
      }
      if (this.props.finalPrediction === "0"){
        predictionInterpretation = PublicConstants.resultPredTemplate2
      }
      if (this.props.finalPrediction === "1"){
        predictionInterpretation = PublicConstants.resultPredTemplate3
      }
    }
    return (
      <div>
        <div>
          {original_Text}
        </div>
        <p>
          Preprocessed Text:
            <br/>
            {this.props.preProcessedText}
            <br/>
            {hyperlinkForRealTweet}
        </p>
        <p>
          Text As Vector:
            <br/>
              {this.props.transformedText}
        </p>
        <p>
          Prediction From Model:
            <br/>
              {predictionInterpretation} With an Accuracy of: {maxValue}
        </p>
      </div>
    )
  }
}
export default RenderResults;
