/* Retrieval-practice quiz widget.
   Answers in each question MUST be the same number of words and, where possible,
   the same number of characters — otherwise formatting leaks the answer. */

(function () {
  document.querySelectorAll('.quiz').forEach(function (q) {
    var buttons = q.querySelectorAll('button');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var right = b.dataset.ok === '1';
        buttons.forEach(function (x) {
          if (x.dataset.ok === '1') x.classList.add('reveal');
        });
        if (!right) b.classList.add('wrong');
        var why = q.querySelector('.why');
        if (why) why.classList.add('on');
      });
    });
  });
})();