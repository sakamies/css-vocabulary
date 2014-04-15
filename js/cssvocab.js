$(document).ready(function() {
  var vocab = [
    'comment',
    'statement',
    'rule-set',
    'at-rule',
    'declaration-block',
    'selector',
    'simple-selector',
    'id-selector',
    'class-selector',
    'attribute-selector',
    'combinator',
    'declaration',
    'property',
    'value',
    'function',
    'keyword',
    'identifier',
    'string',
    'url',
    'number',
    'percentage',
    'length',
    'unit',
    'color',
    'vendor-prefix',
    'pseudo-element'
  ];
  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].replace('-', ' ');
      text = text.charAt(0).toUpperCase() + text.slice(1);
      $('.vocabList').append('<li class="'+vocab[i]+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  function buildVocabSelect (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].replace('-', ' ');
      text = text.charAt(0).toUpperCase() + text.slice(1);
      $('.vocabSelect').append('<option value="'+vocab[i]+'">'+text+'</option>');
    }
  }
  buildVocabSelect(vocab);

  var selectable = '.' + vocab.join(', .');
  var selectableCSS = '.css .' + vocab.join(', .css .');
  var selectableVocab = '.vocabList .' + vocab.join(', .vocabList .');

  $(selectableCSS).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectableCSS).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    console.log('.css ' + '.' + pals.join('.'));
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectableVocab).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectable).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    console.log('hide sidebar');
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    console.log('show sidebar');
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
