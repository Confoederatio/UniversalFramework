//Initialise functions
{
  window.delay = function (arg0_timeout) {
    //Convert from parameters
    var timeout = arg0_timeout;

    //Return statement
    return new Promise ((resolve) => {
      setTimeout(function(){
        resolve();
      }, timeout);
    });
  }
}
