

class Utils{
  cleanStrAndRetArrOfFloats(arrAsString){
    var result = []
    var array = []
    result = arrAsString
    result = result.substring(1, result.length -1)
    result = result.trim()
    result = result.replace(/\s{2,}/g, ' ')
    result = result.split(" ")
    array = result.map(Number)
    return(array)
  }

}
export default Utils;
