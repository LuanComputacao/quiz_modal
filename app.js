var QuizModal = {
  selector: '#quiz-modal',

  init: function (selector) {
    this.selector = selector || this.selector;
    this.bindEvents();
    console.log('QuizModal initialized');
  },
  bindEvents: function () {
    document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    console.log('QuizModal binded events');
  },

  onLoad: function () {
    this.quiz = document.querySelector(this.selector);
    this.quizQuestionsContainer = this.quiz.querySelector(".quiz-questions-container")

    this.quiz.addEventListener('click', this.onClick.bind(this));
    this.setQuizWidths()

    this.quizQuestionsContainer.style.left = 0

    console.log('QuizModal loaded');
  },

  onClick: function (event) {
    console.log('-----')
    var target = event.target;
    this.quizQuestionsContainerLeft = this.quizQuestionsContainer.style.left.replace('px', '');


    if (target.classList.contains('quiz-radio')) {
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

  },

  setQuizWidths: function () {
    this.quizBodyOffsetWidth = parseInt(this.quiz.querySelector('.quiz-body').offsetWidth);
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

    if (newPosition < this.quizQuestionsContainerLeftLimit) {

      this.quizQuestionsContainer.style.left = "0px";
    } else {
      this.quizQuestionsContainer.style.left = newPosition + "px";
    }
  },

  movePrevious: function () {
    var newPosition = (parseInt(this.quizQuestionsContainerLeft) + this.quizBodyOffsetWidth);
    if (newPosition > 0) {
      this.quizQuestionsContainer.style.left = this.quizQuestionsContainerLeftLimit + "px";
    } else {
      this.quizQuestionsContainer.style.left = newPosition + "px";
    }
  }
};


QuizModal.init();