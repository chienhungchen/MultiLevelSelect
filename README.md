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

##License
- Copyright (C) 2012 Chien-Hung Chen under the MIT License
- For more info on the MIT License: http://opensource.org/licenses/mit-license.php/