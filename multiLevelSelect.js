(function($, undefined){
	$.fn.multiLevelSelect = function(dataString){
		var targetId = $(this).attr('id'); //Getting the id of the target div for future usage
		var selectIdNameSpace = targetId + '_mls_'; //Starting namespace for the select objects IDs
		var data = $.parseJSON(dataString); //Parsing the dataString into a JSON object

		//Generate new select objects
		function generateList(children, index, parentVal, firstValue){
			var $select = $("<select />");
			$select.data('index', index);
			$select.data('parent', parentVal);
			$select.data('displaytext', firstValue);
			$select.attr('id', selectIdNameSpace + index);
			if(firstValue != null || firstValue != undefined){
				$select.append($('<option />').text(firstValue));
			}
			for(var i = 0; i < children.length; i++){
				$select.append($('<option />').text(children[i].value));
			}
			return $select;
		}
		
		//Finds the sub-options for a particular option
		function findOptionInData(currentSelect){
			var path = [], i, childrenFound = false, current = data.children;
			if(currentSelect.data('parent') === undefined || currentSelect.data('parent') === null){ //root
				for(i = 0; i < current.length; i++){
					if(current[i].value === currentSelect.val()){
						childrenFound = true;
						return current[i];
					}
				}
				if(childrenFound === false){ return undefined; }
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
			console.log(currentSelect.data('parent'));
			console.log(currentSelect.data('index'));
		}
		
		//Removes the appropriate select objects when a value has been changed in a previously chosen select menu
		function removeSelect(main, index){
			var arr = $(main).find('select');
			for(var i = index + 1; i < arr.length; i++){
				$(main).find('#' + selectIdNameSpace + i).remove();
				$(main).find('br.' + selectIdNameSpace + i).remove();
			}
		}
		//Recursively calls upon itself to add a change() function to each select
		function onChange(main , selectToFind){
			$(main).find('#' + selectToFind).first().each(function(){
				$(this).change(function(){
					if($(this).val() != $(this).data('displaytext')){
						if($(this).data('hasGen')){
							removeSelect(main, $(this).data('index'));
						}
						else{
							$(this).data('hasGen', true);
						}
						currentOption = findOptionInData($(this));
						if(currentOption.children.length > 0){
							var $br = $("<br />");
							$br.attr('class', selectIdNameSpace + ($(this).data('index') + 1));
							$(this).parent().append($br);
							$(this).parent().append(generateList(currentOption.children, $(this).data('index') + 1, $(this).val(), currentOption.displaytext));
							onChange(main, selectIdNameSpace + ($(this).data('index') + 1));
						}
					}
				});
			});
		}
		
		//First Drop Down Menu
		this.append(generateList(data.children, 0, undefined, data.displaytext));
		onChange(this, selectIdNameSpace + '0');
	};
})(jQuery);