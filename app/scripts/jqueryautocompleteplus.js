$.fn.jqueryautocompleteplus = function(data){

	var self = this['selector'];

	// By default trigger is off
	var triggered = false;

	// Defining triggers
	var leTrigger;

	var trigger1 = data.trigger1;
	var minLength1 = data.minLength1;
	var outputTrigger1 = data.outputTrigger1;
	var data1 = data.data1;

	var trigger2 = data.trigger2; 
	var minLength2 = data.minLength2;
	var outputTrigger2 = data.outputTrigger2;
	var data2 = data.data2;

	// Position of trigger and the caret
	var position1 = 0;  
	var position2 = 0; 
	
	// Query to the server
	var query = "";

	// Position of the caret
	var caretPosition;

	// Test function returns the correct data according to the trigger 
	function test(request, response){
		if (leTrigger === trigger1){
			if(query.length < minLength1){
				return;
			}
			response(data1);
		}
		else if (leTrigger === trigger2){
			if(query.length < minLength2){
				return;
			}
			response(data2);
		}
	};

	// Autocomplete function
	$("body").on("focus.autocomplete", self, function(){
		$(self).autocomplete({
		source: test,
		focus: function(){
			return false;
		},
		search: function(){
			if (!triggered){
				return false;
			}
			else if(leTrigger == trigger1 && query.length < 3){
				$( self ).blur().focus();
				return false;
			}
			else if(leTrigger == trigger2 && query.length < 2){
				$(self).blur().focus();
				return false;
			}
		},
		select: function (event, ui){
			var text = this.value;
			
			var prefix = text.substring(0, position1 - 1);   // defining prefix mid and suffix

			if(outputTrigger1 == true){
				var mid1 = leTrigger + ui.item.value + " ";
			}
			else{
				var mid1 = ui.item.value + " ";
			}

			if(outputTrigger2 == true){
				var mid2 = leTrigger + ui.item.value + " "; 
			}
			else{
				var mid2 = ui.item.value + " "; 				
			}

			var suffix1 = text.substring(position2+1);
			var suffix2 = text.substring(position2+1);

			if (leTrigger == trigger1){
				this.value = prefix + mid1 + suffix1;
				caretPosition = prefix.length + mid1.length ;
			}
			else if (leTrigger == trigger2){
				this.value = prefix+mid2+suffix2;
				caretPosition = prefix.length + mid2.length;
			}
			this.setSelectionRange(caretPosition, caretPosition);   // setting the caret position
			query = "";
			triggered = false;
			return false;
		}
	}).data("ui-autocomplete")._renderItem = function (ul, item) {   // rendering the data
		
			ul.addClass('tacData');
			if(leTrigger == trigger1){
				return $("<li>")
				.append("<a class='tacResults'><b>" + item.label + "</div></a>")
				.appendTo(ul); 
			}
			else if(leTrigger == trigger2){
				return $("<li>")
				.append("<a class='tacResults'><b>" + item.value  + "</b></a>")
				.appendTo(ul); 
			}
		};
	});

	function getPosition2(jQitem){
		var input = jQitem.get(0);
		if (!input) return;
		if ('selectionStart' in input) {
			return input.selectionStart;
		}
	}


	// check every keypress and looks for a trigger
	$("body").on("input",self,function(){

		text = this.value;

		position2 = this.selectionStart;
		var charTyped = text[position2 - 1];

		if( position1 >= position2 || charTyped == " " ){
			$( self ).blur().focus();
			triggered = false;
		}

		if(triggered){
	
			query = text.substring(position1, position2);

			$(this).autocomplete("search",query);
		}
		else{
			triggered = false;
			if(charTyped == trigger1){
				leTrigger = trigger1;
				triggered = true;
			}
			else if( charTyped == trigger2){
				leTrigger = trigger2;
				triggered = true;
			}
			position1 = this.selectionStart;
		}
		
	});

};