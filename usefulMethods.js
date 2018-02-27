class usefulMethods {

  static countdown(start, target) {
    const startWithMilli = parseInt(start) * 1000
    const targetWithMilli = parseInt(target) * 1000
    const diff = startWithMilli + targetWithMilli - Date.now()
    const hoursLeft = diff / 60 / 60 / 1000
    let output;
    hoursLeft < 0 ? output = 0 :  output = hoursLeft.toFixed(1)
    return output;
  }
}

export default usefulMethods;
