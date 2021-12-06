let QuizModal = {
  selector: '#quiz-modal',

  /**
   * Initialize the modal
   *
   * @param {Object} options {selector: '#quiz-modal', loop: false}
   * @param {Function} callback postQuizHandler(quiz)
   * @returns void
   */
  init: function (options, callback) {
    this.options = options;
    this.selector = this.options["selector"] || this.selector;
    this.loop = this.options["loop"] || false;
    this.callback = callback;
    this.bindEvents();
    console.log('QuizModal initialized');
  },

  bindEvents: function () {
    document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    console.log('QuizModal binded events');
  },

  onLoad: function () {
    this.storeElements();

    this.initial = true;
    this.completed = false;

    this.getQuestions();

    this.quiz.addEventListener('click', this.onClick.bind(this));
    this.setQuizWidths()

    this.quizQuestionsContainer.style.left = 0

    console.log('QuizModal loaded');
  },

  getQuestions: function () {
    this.questions = {};
    this.quiz.querySelectorAll('.quiz-question').forEach(function (question, index) {
      question.setAttribute('data-index', index);
      this.questions[index] = {
        title: question.querySelector('.quiz-question-title').innerHTML || '',
        answer: null
      }
    }.bind(this));
    console.log(this.questions)
  },

  storeElements: function () {
    this.quiz = document.querySelector(this.selector);
    this.quizQuestionsContainer = this.quiz.querySelector(".quiz-questions-container")
    this.quizButtonNext = this.quiz.querySelector(".quiz-button-next");
    this.quizButtonPrev = this.quiz.querySelector(".quiz-button-prev");
  },

  onClick: function (event) {
    console.log('-----')
    var target = event.target;
    this.quizQuestionsContainerLeft = this.quizQuestionsContainer.style.left.replace('px', '');


    if (target.classList.contains('quiz-radio')) {
      this.storeAnswers(target);
      this.setQuizState();
      setTimeout(function () {
        this.moveForward()
      }.bind(this), 500);

    }
    if (target.classList.contains('quiz-button-next')) {
      console.log('next');
      this.moveForward()
    }

    if (target.classList.contains('quiz-button-prev')) {
      console.log('prev');
      this.movePrevious();
    }

    this.callback(this, target);

  },

  setQuizWidths: function () {
    this.quizBodyOffsetWidth = parseInt(this.quiz.querySelector('.quiz-body').offsetWidth);
    if (this.quizBodyOffsetWidth == 0) {
      if (this.quizBodyOffsetWidth > 0) {
        this.quizBodyOffsetWidth = 600;
      }
    }
    this.quizQuestions = this.quiz.querySelectorAll('.quiz-question');
    this.quizQuestions.forEach(function (question) {
      question.style.width = this.quizBodyOffsetWidth + 'px';
    }.bind(this));

    var newWidth = ((this.quizBodyOffsetWidth) * this.quizQuestions.length) + 'px';
    this.quizQuestionsContainer.style.width = newWidth;
    this.quizQuestionsContainerLeftLimit = (parseInt(newWidth.replace('px', '')) - parseInt(this.quizBodyOffsetWidth)) * -1;
  },

  moveForward: function () {
    var newPosition = (this.quizQuestionsContainerLeft - this.quizBodyOffsetWidth);


    if (parseInt(newPosition) === parseInt(this.quizQuestionsContainerLeftLimit) && !this.loop) {
      console.log('stop')
      this.quizButtonNext.setAttribute('disabled', 'disabled');
    }

    if (newPosition < 0) {
      this.quizButtonPrev.removeAttribute('disabled');
    }

    if (newPosition < this.quizQuestionsContainerLeftLimit) {
      if (this.loop) {
        this.quizQuestionsContainer.style.left = "0px";
      }
    } else {
      this.quizQuestionsContainer.style.left = newPosition + "px";
    }
  },

  movePrevious: function () {
    var newPosition = (parseInt(this.quizQuestionsContainerLeft) + this.quizBodyOffsetWidth);

    if (parseInt(newPosition) === 0 && !this.loop) {
      console.log('stop')
      this.quizButtonPrev.setAttribute('disabled', 'disabled');
    }

    if (newPosition > this.quizQuestionsContainerLeftLimit) {
      this.quizButtonNext.removeAttribute('disabled');
    }

    if (newPosition > 0) {
      if (this.loop) {
        this.quizQuestionsContainer.style.left = this.quizQuestionsContainerLeftLimit + "px";
      }
    } else {
      this.quizQuestionsContainer.style.left = newPosition + "px";
    }
  },

  storeAnswers: function (target) {
    const name = target.getAttribute('name')
    const value = this.quiz.querySelector('input[name="' + name + '"]:checked').value;
    const questionIndex = target.parentElement.parentElement.getAttribute('data-index')

    this.questions[questionIndex].answer = value;
  },

  setQuizState: function () {
    var count = 0;
    for (var key in this.questions) {
      if (this.questions[key].answer) {
        count++;
      }
    }

    this.completed = count === Object.keys(QuizModal.questions).length;
  }

};


function postQuizHandler(quiz, target) {
  if (quiz.completed) {
    console.log('end')
    quiz.quiz.querySelector('.quiz-button-submit').style.display = 'block';
  }

  if (target.classList.contains('quiz-button-submit')) {
    console.log(quiz.questions)
    console.log("submit");
  }
}

QuizModal.init({}, postQuizHandler);