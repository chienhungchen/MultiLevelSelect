/********
* MultiLevelSelect.js
* Copyright (c) 2012 Chien-Hung Chen
* Github: https://www.github.com/chienhungchen/MultiLevelSelect
* Licensed Under the WTFPL (or MIT if that makes you happier)
********/

(function($, undefined){
	/********
	* IMPORTANT: This is a jQuery plugin and needs jQuery to function
	* 	params and their possible values:
	* 		data: 		JSON string,
	* 		arrangement: 	vertical or horizontal (defaults to vertical if it is not horizontal)
	* 		width:  	string or integer value, or default to largest text width for each select
	* 		clearbutton: 	true or false
	********/
	$.fn.multiLevelSelect = function(params){
		var targetId = $(this).attr('id'); //Getting the id of the target div for future usage
		var selectIdNameSpace = targetId + '_mls_'; //Starting namespace for the select objects IDs
		var data = $.parseJSON(params.data); //Parsing the dataString into a JSON object
		if(data === null) { data = params.data; } //makes params.data able to accept a JSON object directly
		
		//Generate new select objects
		function generateList(children, index, parentVal, firstValue) {
			var $select = $("<select />");
			$select.data('index', index);
			$select.data('parent', parentVal);
			$select.data('displaytext', firstValue);
			$select.attr('id', selectIdNameSpace + index);
			
			//setting width from param
			if(params.width != null || params.width != undefined) { $select.css({ width: params.width }); }
			
			if(firstValue != null || firstValue != undefined) {
				$select.append($('<option />').text(firstValue));
			}
			for(var i = 0; i < children.length; i++) {
				$select.append($('<option />').text(children[i].value));
			}
			return $select;
		}
		
		//Finds the sub-options for a particular option
		function findOptionInData(currentSelect) {
			var i, path = [], childrenFound = false, current = data.children;
			if(currentSelect.data('parent') === undefined || currentSelect.data('parent') === null){ //root
				for(i = 0; i < current.length; i++){
					if(current[i].value === currentSelect.val()) {
						childrenFound = true;
						return current[i];
					}
				}
				if(childrenFound === false) { return undefined; }
			}
			else{
				for(i = 0; i < currentSelect.data("index"); i++){
					path.push($(currentSelect.parent().find("select")[i]).val());
				}
				path.push(currentSelect.val());
				for(var i = 0; i < path.length; i++){
					for(var j = 0; j < current.length; j++){
						if(current[j].value === path[i]){
							if(i === (path.length - 1)){
								return current[j];
							}
							childrenFound = true;
							current = current[j].children;
							break;
						}
					}
					if(!childrenFound){ return undefined; }
					childrenFound = false;
				}
			}
		}
		
		//Removes the appropriate select objects when a value has been changed in a previously chosen select menu
		function removeSelect(main, index) {
			var arr = $(main).find('select');
			for(var i = index + 1; i < arr.length; i++) {
				$(main).find('#' + selectIdNameSpace + i).remove();
				$(main).find('br.' + selectIdNameSpace + i).remove();
			}
		}
		//Recursively calls upon itself to add a change() function to each select
		function onChange(main , selectToFind) {
			var $br, currentOption;
			$(main).find('#' + selectToFind).first().change(function() {
				removeSelect(main, $(this).data('index'));
				currentOption = findOptionInData($(this));
				if(currentOption != undefined && currentOption.children.length > 0) {
					if(params.arrangement != 'horizontal') {
						$br = $("<br />");
						$br.attr('class', selectIdNameSpace + ($(this).data('index') + 1));
						$(this).parent().append($br);
					}
					$(this).parent().append(generateList(currentOption.children, $(this).data('index') + 1, $(this).val(), currentOption.displaytext));
					onChange(main, selectIdNameSpace + ($(this).data('index') + 1));
				}
			});
		}
		
		//Generate first select
		this.append(generateList(data.children, 0, undefined, data.displaytext));
		onChange(this, selectIdNameSpace + '0');
	};
})(jQuery);