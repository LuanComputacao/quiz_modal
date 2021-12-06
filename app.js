var QuizModal = {
  selector: '#quiz-modal',

  /**
   * Initialize the modal
   *
   * @param {Object} options
   * @returns void
   */
  init: function (options) {
    this.options = {}
    this.selector = this.options["selector"] || this.selector;
    this.loop = this.options["loop"] || false;
    this.bindEvents();
    console.log('QuizModal initialized');
  },

  bindEvents: function () {
    document.addEventListener('DOMContentLoaded', this.onLoad.bind(this));
    console.log('QuizModal binded events');
  },

  onLoad: function () {

    this.storeElements();

    this.quiz.addEventListener('click', this.onClick.bind(this));
    this.setQuizWidths()

    this.quizQuestionsContainer.style.left = 0

    console.log('QuizModal loaded');
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
  }
};


QuizModal.init({});