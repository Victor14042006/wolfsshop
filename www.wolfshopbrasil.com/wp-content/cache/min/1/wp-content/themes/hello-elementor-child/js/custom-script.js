jQuery(document).ready(function($) {
    var initialLines = 4;
    var additionalLines = 4;
    var textClass = '.minha-classe-text-gradient';

    function expandText($element) {
        $element.removeClass('gradient');
        $element.css('max-height', 'none')
    }

    function collapseText($element) {
        $element.addClass('gradient');
        $element.css('max-height', '')
    }

    function createReadMoreButton($element) {
        var readMoreButton = $('<span>').text('Leia mais').addClass('leia-mais');
        $element.after(readMoreButton);
        readMoreButton.on('click', function() {
            expandText($element);
            readMoreButton.remove();
            createShowLessButton($element)
        })
    }

    function createShowLessButton($element) {
        var showLessButton = $('<span>').text('Mostrar menos').addClass('mostrar-menos');
        $element.after(showLessButton);
        showLessButton.on('click', function() {
            collapseText($element);
            showLessButton.remove();
            createReadMoreButton($element)
        })
    }
    var textElements = $(textClass);
    textElements.each(function() {
        var $this = $(this);
        if ($this[0].scrollHeight > $this.innerHeight()) {
            $this.addClass('gradient');
            if ($this.hasClass('expanded')) {
                expandText($this);
                createShowLessButton($this)
            } else {
                var originalContent = $this.html();
                $this.css('max-height', initialLines * $this.css('line-height'));
                if ($this[0].scrollHeight > $this.innerHeight()) {
                    var additionalHeight = additionalLines * parseInt($this.css('line-height'));
                    $this.css('max-height', (initialLines + additionalLines) * parseInt($this.css('line-height')));
                    createReadMoreButton($this)
                } else {
                    $this.removeClass('gradient')
                }
            }
        }
    })
})