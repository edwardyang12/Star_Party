'use strict';

// filter join code
var joinCode = document.getElementById('joincode');
joinCode.addEventListener('input', function(){
  var v = joinCode.value;
  joinCode.value = v.replace(/[^2-9A-Za-z]|[OoIi]/g, '');
  if(joinCode.value.length < v.length)
    joinErr('A-Z, 2-9 only... no spaces, O, 0, I, or 1');
  if(joinCode.value.length === 6)
    joinSubmit();
})

// return error messages
var errExpTime = 0;
var joinErrMsg = document.getElementById('joinerr');
function joinErr(msg){
  joinErrMsg.innerHTML = msg;
  errExpTime = Date.now() + 3900;
  setTimeout(function(){
    if(Date.now() > errExpTime) joinErrMsg.innerHTML = '';
  }, 4000);
}

// submit joinCode
function joinSubmit(){

}
