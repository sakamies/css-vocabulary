$(document).ready(function() {
  var vocab = [
    {
      'tokenName': 'comment',
      'humanName': 'Comment',
      'url': ''
    },
    {
      'tokenName': 'statement',
      'humanName': 'Statement',
      'url': ''
    },
    {
      'tokenName': 'rule-set',
      'humanName': 'Rule-set',
      'url': ''
    },
    {
      'tokenName': 'at-rule',
      'humanName': 'At-rule',
      'url': ''
    },
    {
      'tokenName': 'declaration-block',
      'humanName': 'Declaration block',
      'url': ''
    },
    {
      'tokenName': 'selector',
      'humanName': 'Selector',
      'url': ''
    },
    {
      'tokenName': 'simple-selector',
      'humanName': 'Simple selector',
      'url': ''
    },
    {
      'tokenName': 'id-selector',
      'humanName': 'ID selector',
      'url': ''
    },
    {
      'tokenName': 'class-selector',
      'humanName': 'Class selector',
      'url': ''
    },
    {
      'tokenName': 'attribute-selector',
      'humanName': 'Attribute selector',
      'url': ''
    },
    {
      'tokenName': 'pseudo-class',
      'humanName': 'Pseudo-class',
      'url': ''
    },
    {
      'tokenName': 'pseudo-element',
      'humanName': 'Pseudo-element',
      'url': ''
    },
    {
      'tokenName': 'combinator',
      'humanName': 'Combinator',
      'url': ''
    },
    {
      'tokenName': 'descendant-combinator',
      'humanName': 'Descendant combinator',
      'url': ''
    },
    {
      'tokenName': 'child-combinator',
      'humanName': 'Child combinator',
      'url': ''
    },
    {
      'tokenName': 'adjacent-sibling-combinator',
      'humanName': 'Adjacent sibling combinator',
      'url': ''
    },
    {
      'tokenName': 'general-sibling-combinator',
      'humanName': 'General sibling combinator',
      'url': ''
    },
    {
      'tokenName': 'declaration',
      'humanName': 'Declaration',
      'url': ''
    },
    {
      'tokenName': 'property',
      'humanName': 'Property',
      'url': ''
    },
    {
      'tokenName': 'value',
      'humanName': 'Value',
      'url': ''
    },
    {
      'tokenName': 'function',
      'humanName': 'Function',
      'url': ''
    },
    {
      'tokenName': 'keyword',
      'humanName': 'Keyword',
      'url': ''
    },
    {
      'tokenName': 'identifier',
      'humanName': 'Identifier',
      'url': ''
    },
    {
      'tokenName': 'string',
      'humanName': 'String',
      'url': ''
    },
    {
      'tokenName': 'url',
      'humanName': 'URL',
      'url': ''
    },
    {
      'tokenName': 'number',
      'humanName': 'Number',
      'url': ''
    },
    {
      'tokenName': 'percentage',
      'humanName': 'Percentage',
      'url': ''
    },
    {
      'tokenName': 'length',
      'humanName': 'Length',
      'url': ''
    },
    {
      'tokenName': 'unit',
      'humanName': 'Unit',
      'url': ''
    },
    {
      'tokenName': 'color',
      'humanName': 'Color',
      'url': ''
    },
    {
      'tokenName': 'vendor-prefix',
      'humanName': 'Vendor prefix',
      'url': ''
    },
  ];

  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].humanName;
      token = vocab[i].tokenName;
      $('.vocabList').append('<li class="'+token+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var all = '';
    var css = '';
    var vocab = '';
    obj.forEach(function (item, i, obj) {
      var name = item.tokenName;
      all = all + '.' + name + ',';
      css = css + '.css .' + name + ',';
      vocab = vocab + '.vocabList .' + name + ',';
    });
    // Remove the trailing comma in each selector string
    all = all.slice(0, -1);
    css = css.slice(0, -1);
    vocab = vocab.slice(0, -1);
    return {'allTokens': all, 'cssTokens': css, 'vocabTokens': vocab};
  }
  var selectors = buildSelectors(vocab);

  $(selectors.cssTokens).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectors.cssTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectors.vocabTokens).on('focus click', function(event) {
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

  $(selectors.allTokens).attr('tabindex', '0');
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
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
