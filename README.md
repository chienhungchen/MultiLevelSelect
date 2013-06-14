#jQuery Plugin: MultiLevelSelect.js

Useful for creating multi-level drop down menus by using select objects in HTML. It takes in a JSON string containing the data for each select option and its children options.

Live demo: <a href="http://www.chienhungchen.com/portfolio/MultiLevelSelect.js/">Here</a>

##Usage

MultiLevelSelect.js needs jQuery to work, so make sure you have it (it's also in the jQuery folder if you downloaded this repo), or import it like such from Google CDN:

~~~
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
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
	$('#targetdiv').multiLevelSelect({
		data: JSON_data_string,
		arrangement: 'vertical'
	});
~~~

###Plugin Parameters
- **data:** either a JSON object or a JSON string (see the format in the Data Format section).
- **arrangement:** 'vertical' or 'horizontal', this will default to 'vertical' if the value is not specified or if it is not 'horizontal'.
- **width:** could be integer values or string in the format of '100px' or '50%'

##Data Format (can be in JSON String Format or an JSON object)

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
- **value:** this is the value that will be displayed as a choice.
- **displaytext:** the value that you want to display as the instruction text, currently this is required for an object with child options.
- **children:** this should hold an array of the same type of object (value, displaytext, children), this array can be empty if there are no more children. Currently this is required.

##License
MIT License (http://opensource.org/licenses/MIT)
