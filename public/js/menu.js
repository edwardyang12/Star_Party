'use strict';

// easy element selector borrowed from jquery
function $(query){
  var q = document.querySelectorAll(query);
  return q.length > 1 ? q : q[0];
}

$('.createbtn').addEventListener('click', function(){
  window.location.href = '/party';
});
