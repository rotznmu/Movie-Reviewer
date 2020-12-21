const movieArr = [];
//find if movie is already in DOM
function isMovieThere(movie) {
	let movieTitle = $('#movie-title').val();
	let movieRating = $('#movie-rating').val();
	return movie.name === movieTitle;
}
// get existing rating and use formula to update new rating
function newRating(movieInd) {
	let movieTitle = $('#movie-title').val();
	let movieRating = $('#movie-rating').val();
	let currRating = movieArr[movieInd].rating;
	let numOfRatings = movieArr[movieInd].numRatings;
	let newRating = ((currRating * numOfRatings + parseInt(movieRating)) / (numOfRatings + 1)).toFixed(2);
	movieArr[movieInd].rating = newRating;
	movieArr[movieInd].numRatings++;
	let tableLocation = $('td:contains(' + movieTitle + ')');
	tableLocation.next().text(newRating);
	tableLocation.next().next().text(numOfRatings + 1);
}
//capture table location to update table with existing movie
function updateTable(movieTitle) {
	let tableLocation = $('tr:contains(' + movieTitle + ')');
}
//event listener to check if movie already exists in DOM and update DOM and table
$('#submit-button').on('click', function(e) {
	e.preventDefault();
	let movieTitle = $('#movie-title').val();
	let movieRating = $('#movie-rating').val();
	if (movieArr.findIndex(isMovieThere) !== -1) {
		let movieInd = movieArr.findIndex(isMovieThere);
		newRating(movieInd);
	} else {
		updateTable(movieTitle, movieRating);
		updateDOM(movieTitle, movieRating);
	}
});
//function to create object and update DOM
function updateDOM(name, rating) {
	const movieObj = {
		name,
		rating: parseInt(rating),
		numRatings: 1
	};
	movieArr.push(movieObj);
}
//update the table including delete button
function updateTable(title, rating) {
	let createTr = document.createElement('tr');
	let createTd1 = document.createElement('td');
	let createTd2 = document.createElement('td');
	let createTd3 = document.createElement('td');
	let createDeletBtn = document.createElement('button');
	createTd1.innerText = title;
	createTd2.innerText = rating;
	createTd3.innerText = 1;
	createDeletBtn.innerText = 'X';
	createTr.append(createTd1);
	createTr.append(createTd2);
	createTr.append(createTd3);
	createTr.append(createDeletBtn);
	$('table').append(createTr);
}

//create eventlistener with functional delete button to remove from DOM and table
$('table').on('click', function(e) {
	e.preventDefault();
	let clickedButton = e.target;
	let movieTitle = $('#movie-title').val();
	if (clickedButton.tagName === 'BUTTON') {
		clickedButton.parentElement.remove();
		let remMovie = movieArr[movieArr.findIndex(isMovieThere)];
		movieArr.splice(movieArr.findIndex(isMovieThere), 1);
	}
});
