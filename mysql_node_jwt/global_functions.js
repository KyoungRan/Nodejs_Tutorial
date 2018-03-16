to = function(promise) {
  return promise
  .then(data => {
    return [null, data];
  }).catch(err => 
    [pe(err)]
  );
}

pe = require('parse-error');

TE = function(err_message, log) { // TE stands for Throw Error
  if(log === true) {
    console.log(err_meessage);
  }
  throw new Error(err_message);
}

ReE = function(res, err, code) {  // Error Web Response
  if(typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if(typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error: err });
}

ReS = function(res, data, code) { // Success Web Response
  let send_data = { success: true };

  if(typeof data == 'object') {
    send_data = Object.assign(data, send_data); // merge the obejcts
  }

  if(typeof code !== 'undefined') res.statusCode = code;

  return res.json(send_data);
};

// This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});