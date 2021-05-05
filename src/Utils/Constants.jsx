

class PublicConstants{
  static get instructionsTemplate() {
    const instTemplate1 = "You have three different options:"
    return(instTemplate1);
  }

  static get instructionsTemplate2() {
    const instTemplate2 = `Clicking on the "Stored Tweet" button;
                            you will retrieve one of the 52k tweets
                              that were used for the model training`
    return(instTemplate2);
  }

  static get instructionsTemplate3() {
    const instTemplate3 = `Clicking on the "Real Time Tweet" button;
                            you will retrieve one recent tweet directly
                              from tweeter, it will be less than 10 days old`
    return(instTemplate3)
  }

  static get instructionsTemplate4() {
    const instTemplate4 = `Clicking on the "Try it With Your Own Text" button;
                            you will be able to test the accuracy of the model with
                              your own personalized text (It works only in English)`
    return(instTemplate4)
  }

  static get instructionsTemplate5() {
    const instTemplate5 = `What will you get?`
    return(instTemplate5)
  }

  static get instructionsTemplate6() {
    const instTemplate6 = `First a text clean up, the preprocessed text will have
                            no stop, redundant or irrelevant words, also we will
                              ignore hashtags and labelings`
    return(instTemplate6)
  }

  static get instructionsTemplate7() {
    const instTemplate7 = `Second a text transformation, from words to a vector it
                            is fitted with the "Bag of Words" from the trainning
                              part and also converted with a tf-idf transformer`
    return(instTemplate7)
  }

  static get instructionsTemplate8() {
    const instTemplate8 = `Finally the prediction will be shown, with the accuracy
                            level for the prediction`
    return(instTemplate8)
  }

  static get errorInPredTransTemplate() {
    const errorPredTemplate = `Text cannot be analized by the Model`
    return(errorPredTemplate)
  }

  static get errorInPredTransTemplate2() {
    const errorPredTemplate2 = `It is either:`
    return(errorPredTemplate2)
  }
  static get errorInPredTransTemplate3() {
    const errorPredTemplate3 = `A null / blank text`
    return(errorPredTemplate3)
  }

  static get errorInPredTransTemplate4() {
    const errorPredTemplate4 = `A set of only stop words such as: me, myself,
                                  what, who, this, that, the, between, only, now, etc`
    return(errorPredTemplate4)
  }

  static get errorInPredTransTemplate5() {
    const errorPredTemplate5 = `A set of special or alphanumeric characters
                                  that cannot be interpreted`
    return(errorPredTemplate5)
  }

  static get resultPredTemplate() {
    const resPredTemp = `User is Stressed: `
    return(resPredTemp)
  }

  static get resultPredTemplate2() {
    const resPredTemp2 = `User is Neutral: `
    return(resPredTemp2)
  }

  static get resultPredTemplate3() {
    const resPredTemp3 = `User is Not Stressed: `
    return(resPredTemp3)
  }
}
export default PublicConstants;
