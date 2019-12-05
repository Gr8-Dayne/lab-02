'use strict'

function HornImage(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;

  allImages.push(this);
}

const allImages =[];

HornImage.prototype.renderHornObject = function() {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');
  let cloneTemplate = $('#photo-template').html();

  $clone.html(cloneTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);
  $clone.find('img').attr('alt', this.title);
  $clone.removeClass('clone');
  // give class of keyword to filter out the images
  $clone.attr('class', this.keyword);
}


HornImage.prototype.renderKeywords = function() {
  let filterKeywords = [];
  // remove all elements except for first one
  $('option').not(':first').remove();
  allImages.forEach(image => {
    if (!filterKeywords.includes(image.keyword)) {
      filterKeywords.push(image.keyword);
    }
  });

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
}

function filterHornImg() {
  $('select').on('change', function() {
    let selectedKeyword = $(this).val();
    if(selectedKeyword !== 'default') {
      $('section').hide();
      $(`section[class = "${selectedKeyword}"]`).show();
    } else {
      $('section').show();
    }
  });
}

function readJsonData() {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornImglObj => {
        new HornImage(hornImglObj);
      })
    })
    .then(() => {
      allImages.forEach( image =>{
        image.renderHornObject();
        image.renderKeywords();
      })
    })
}


$(() => {
  readJsonData();
  filterHornImg();
});
