/**************************************************************************

  jQuery Textfill Plugin v0.1.0

  This plugin is designed to automatically resize fonts based on a container size.


  Documentation available at: http://jyore.com/opensource/jquery/textfill


---DISTRIBUTED UNDER THE MIT LICENSE---

Copyright (c) 2011 Joey Yore

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
  
**************************************************************************/
(function($) {
	
	var settings = {
		maxFontSize : 40,
		minFontSize : 3,
	}

	var methods = {
		opts : {},
		init : function(options) {
			return this.each(function() {
				methods.opts = $.extend({},settings,options);
				var me = $(this);
				
				var text = me.text();
				me.text('');

				me.append('<span class="textfill-inner">'+text+'</span>');
				me.addClass('textfill');
				methods.update.apply(this,arguments);;
			});
		},
		destroy : function() {
			var inner = $(this).children('.textfill-inner');
			var text = inner.text();
			inner.remove();
			$(this).removeClass('textfill').text(text);
		},
		update : function(value) {
			var element = $(this);
			var text = element.children('.textfill-inner');

			if(typeof value === 'string') {
				text.text(value);
			}

			
			var size = methods.opts.maxFontSize;
			var maxH = element.height();
			var maxW = element.width();
			var textH;
			var textW;

			do {
				text.css('font-size',size--);
				textH = text.height();
				textW = text.width();
			} while((textH > maxH || textW > maxW) && size > methods.opts.minFontSize);
		}
	};
			
		
	$.fn.textfill = function(method) {
		if(methods[method]) {
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		} else if(typeof method === 'object' || !method) {
			return methods.init.apply(this,arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.textfill');
		}
	};
})(jQuery);

