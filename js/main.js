$(document).ready(function() {


	// Create an constructor for a todo object
	function Todo(content){
		this.content = content;
		this.id = Date.now();
		this.isCompleted = false;
	}

	// Define an array that will hold our todos
	var todos = [];

	// When the user submits the form
	$("form").on("submit",function(e){

		// Tell the browser not to submit the form
		e.preventDefault();

		// Get the todo content from the input
		var content = $("input").val();

		// Create a new todo 
		var newTodo = new Todo(content);

		// Push the new todo object onto the array
		todos.push(newTodo);

		// Update our HTML
		updateHTML(todos);

		// Reset the input box
		$("input").val("");

	})

	// Function to update our page.
	function updateHTML(array){

		// Reset our HTML
		$(".items").html("");

		// Loop through the array passed into the function
		array.forEach(function(todo){

			var newClass = "";

			if(todo.isCompleted){
				newClass= "class='completed'";
			}

			// Append the item into our html
			$(".items").append(`
				<li>
                    <article ${newClass}>
                        <button data-id="${todo.id}" class='check'></button>
                        <p>${todo.content}</p>
                        <input type='text' class='edit-todo' value='learn html'>
                        <button data-id="${todo.id}" class='delete'>X</button>
                    </article>
                </li>
			`)

		})
	}


	// When a checkmark gets clicked, handle it. 
	$(".items").on("click",".check",function(){
		var id = $(this).data('id');

		// Loop through our todos and rewrite them to the page.
		todos.forEach(function(item){
			if(item.id === id)
			{
				item.isCompleted = !item.isCompleted;
			}
		})

		// Update the html with the new todo
		updateHTML(todos);
	})


	// When the delete button gets clicked handle it
	$(".items").on("click",".delete",function(){
		var id = $(this).data('id');

		todos.forEach(function(item,position){
			if(item.id === id)
			{
				todos.splice(position,1);
			}
		})

		updateHTML(todos);
	})


	// When show active gets clicked, filter the todos and update
	// the HTML
	$(".show-active").on("click",function(){

		// Update buttons ( this could be a seperate function )
		$("footer button").removeClass('active');
		$(this).addClass("active");

		var newArray = todos.filter(function(item){
			if(item.isCompleted === false){
				return true;
			}
		});

		updateHTML(newArray);
	})


	// When show active gets clicked, filter the todos and update
	// the HTML
	$(".show-completed").on("click",function(){

		// Update the active class for the button
		$("footer button").removeClass('active');
		$(this).addClass("active");

		// Filter our array down to just get the completed items
		var newArray = todos.filter(function(item){
			if(item.isCompleted === true){
				return true;
			}
		});

		updateHTML(newArray);
	})


	// When show all is clicked just use the normal array
	$(".show-all").on("click",function(){

		// Update button
		$("footer button").removeClass('active');
		$(this).addClass("active");

		updateHTML(todos);
	})

});

