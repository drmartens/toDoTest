$(document).ready(function(){
	$('form').on('submit', function(){
		var item = $('form input');
		var todo = {item: item.val()};

		$.ajax({
			//fire post handler
			type: 'POST',
			url: '/todo',
			data: todo,
			success: function(data){
				//do something with data via front-end
				location.reload();
			}
		});

		return false;

	});

	$('li').on('click', function(){
		// replace spaces with hyphens
		var item = $(this).text().replace(/ /g, "-");
		$.ajax({
			//fire delete handler
			type: 'DELETE',
			url: '/todo/' + item,
			success: function(data){
				//do something with data via front-end
				location.reload();
			}
		});

	});


});

setTimeout("location.reload(true);",10000);



