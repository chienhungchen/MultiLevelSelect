#jQuery Plugin: Multi-Level Drop Down Menu

Useful for creating multi-level drop down menus by using select objects in HTML. It takes in a JSON string containing the data for each select option and its children options.


##Usage

MultiLevelSelect.js needs jQuery to work, so make sure you have it, or import it like such:

~~~
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
~~~

Now import multiLevelSelect.js as such:

~~~
	<script src="multiLevelSelect.js"></script>
~~~

Then create an HTML object where you want the drop down menus to be:

~~~
	<div id='targetdiv'></div>
~~~

Then put this bit of JavaScript somewhere below the HTML object you created:

~~~
	$('#targetdiv').multiLevelSelect(JSON_data_string);
~~~

Take note that the JSON_data_string is a JSON string. Please see below for the format.

##JSON String Format

Below is a snippet of what a JSON data string could look like:

~~~
{
	"displaytext": "Please select from one of the following",
	"children": [
       				{
						"value": "Fruit",
						"displaytext": "Please select from one of the following",
				 		"children": [
										{"value": "Kiwi", "children": []},
										{"value": "Apple", "children": []},
										{
											"value": "Berry",
											"children": [
															{"value": "Strawberry", "children": []},
															{"value": "Blueberry", "children": []}
														]
										}
						     		]
					},
					{
						"value": "Vegetable",
						"displaytext": "Please select from one of the following",
						"children": [
										{"value": "Spinach", "children": []},
										{"value": "Cabbage", "children": []},
										{"value": "Green Beans", "children": []}
									]
					},
					{
						"value": "Candy",
						"children": []
					}
    	  	  	]
}
~~~

###Fields
- value: this is the value that will be displayed as a choice.
- displaytext: the value that you want to display as the instruction text, currently this is required for an object with child options.
- children: this should hold an array of the same type of object (value, displaytext, children), this array i

##License
- Copyright (C) 2012 Chien-Hung Chen under the MIT License
- For more info on the MIT License: http://opensource.org/licenses/mit-license.php/