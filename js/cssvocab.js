$(document).ready(function() {
  var supportsHashChange = 'onhashchange' in window;
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
      'tokenName': 'media-query',
      'humanName': 'Media query',
      'url': ''
    },
    {
      'tokenName': 'media-query-list',
      'humanName': 'Media query list',
      'url': ''
    },

    {
      'tokenName': 'media-type',
      'humanName': 'Media type',
      'url': ''
    },
    {
      'tokenName': 'expression',
      'humanName': 'Expression',
      'url': ''
    },
    {
      'tokenName': 'media-feature',
      'humanName': 'Media feature',
      'url': ''
    },
    {
      'tokenName': 'block',
      'humanName': 'Block',
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
      'tokenName': 'type-selector',
      'humanName': 'Type selector',
      'url': ''
    },
    {
      'tokenName': 'universal-selector',
      'humanName': 'Universal selector',
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
    /*{
      'tokenName': 'identifier',
      'humanName': 'Identifier',
      'url': ''
    },*/
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
    var vocabListItems = [];
    var text;
    var token;

    $.each(vocab, function (i, val) {
      text = val.humanName;
      token = val.tokenName;
      vocabListItems.push('<li class="'+token+'"><a href="#'+token+'">'+text+'</a></li>')
    });

    $('.vocabList').append(vocabListItems.join(''));
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var selectors = $.map(vocab, function (val) {
      return val.tokenName;
    }).join(', .');

    return '.' + selectors;
  }
  var selectors = buildSelectors(vocab);

  function getTokens(element) {
    var className = element.className;
    var tokens = className.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    return tokens.split(' ');
  }

  function hiliteTokens(tokens) {
    var cssPals = '.css .' + tokens.join('.');
    var vocabPals = '.vocabList .' + tokens.join(', .vocabList .');
    $('.hilite').removeClass('hilite');
    $(cssPals).addClass('hilite');
    $(vocabPals).addClass('hilite');
  }

  function hiliteHash() {
    var hash = location.hash;
    var tokens;
    if (hash) {
      tokens = hash.substr(1).split('+');
    }
    if (tokens) {
      hiliteTokens(tokens);
    }
  }
  hiliteHash();

  if (supportsHashChange) {
    $(window).on('hashchange', function () {
      hiliteHash();
    });
  }

  $(selectors).on('focus click', function(event) {
    var tokens = getTokens(this);

    event.stopPropagation();

    $(this).closest('.content, .sidebar').addClass('focus')
      .siblings().removeClass('focus');

    $('.selected').removeClass('selected');
    $(this).addClass('selected');

    location.hash = '#' + tokens.join('+');

    if (!supportsHashChange) {
      $(window).trigger('hashchange');
    }
  });

  $(selectors).attr('tabindex', '0');
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
