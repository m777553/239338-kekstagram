'use strict';


(function () {
  var sortFilters = document.querySelector('.img-filters');
  var sortBtnPopular = sortFilters.querySelector('#filter-popular');
  var sortBtnNew = sortFilters.querySelector('#filter-new');
  var sortBtnDiscussed = sortFilters.querySelector('#filter-discussed');
  var activeSortBtn = sortFilters.querySelector('.img-filters__button--active');

  var gallery = document.querySelector('.pictures');

  var photos = [];


  // выгрузка фотографий на страницу

  var createPhotos = function (loadedPhotos) {
    photos = loadedPhotos;

    photos.forEach(function (photo, index) {
      window.data.generateDescription(photo);
      window.data.generateAvatars(photo);
      photo.id = index;
    });

    window.renderPhotos(gallery, photos);

    sortFilters.classList.remove('img-filters--inactive');
  };

  var showLoadError = function (errorMessage) {
    var errorText = 'Ошибка загрузки файлов. ' + errorMessage + '.';

    window.util.showError(errorText);
  };


  window.backend.load(createPhotos, showLoadError);


  // сортировка


  var changeSortType = function (evt, callback) {
    evt.preventDefault();

    if (evt.target !== activeSortBtn) {
      activeSortBtn.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      activeSortBtn = evt.target;

      window.debounce(function () {
        callback(gallery, photos);
      });
    }
  };


  sortBtnPopular.addEventListener('click', function (evt) {
    changeSortType(evt, window.sort.showPopularPhotos);
  });

  sortBtnNew.addEventListener('click', function (evt) {
    changeSortType(evt, window.sort.showNewPhotos);
  });

  sortBtnDiscussed.addEventListener('click', function (evt) {
    changeSortType(evt, window.sort.showDiscussedPhotos);
  });


  // открытие попапа с полноразмерным фото


  var onPhotoClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      window.photoPopup.open(photos[evt.target.parentElement.dataset.id]);
    }
  };

  var onPhotoEnterPress = function (evt) {
    if (evt.keyCode === window.util.keyCode.ENTER && document.activeElement.classList.contains('picture__link')) {
      evt.preventDefault();
      window.photoPopup.open(photos[document.activeElement.dataset.id]);
    }
  };


  gallery.addEventListener('click', onPhotoClick);
  document.addEventListener('keydown', onPhotoEnterPress);
})();
