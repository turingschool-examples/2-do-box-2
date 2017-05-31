//***********************************************************
//  objects
//***********************************************************
function Idea(title, task)  {
  this.title = title;
  this.task = task;
  this.quality = 'Normal';
  this.id = Date.now();
  this.status = 'idea-card';
}

//************************************************************
//  event listensers
//************************************************************

$(document).ready(function() {
	for (var i = 0; i < localStorage.length; i++) {
		prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
  hideCompleted();
});

$('.input-container').on('keyup', function()  {
  enableSaveButton();
})

$('.save-btn').on('click', function()  {
  var title = $('.input-title').val();
  var task = $('.input-task').val();
  var idea = new Idea(title, task);
  prepend(idea);
  clearInputFields();
  sendToStorage(idea);
  disableSaveButton();
})

$(document).keypress(function(e) {
  if(e.which == 13) {
    enableSaveButton13();
  }
})

$('.card-container').on('keyup', '.idea-title',  function() {
	var id = $(this).parent().prop('id');
	var parsedIdea = JSON.parse(localStorage.getItem(id))
	parsedIdea.title = $(this).val()
	localStorage.setItem(id, JSON.stringify(parsedIdea))
})


$('.card-container').on('keyup', '.idea-task',  function() {
	var id = $(this).parent().prop('id');
	var parsedIdea = JSON.parse(localStorage.getItem(id))
	parsedIdea.task = $(this).val()
	localStorage.setItem(id, JSON.stringify(parsedIdea))
})


$('.card-container').on('click', '.arrow-up',  function() {
  var id = $(this).parent().parent().prop('id');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var currentQuality = parsedIdea.quality;

  if(currentQuality === 'None') {
    parsedIdea.quality = 'Low';
    $(this).siblings('.quality-value').text('Low');
  }
  else if(currentQuality === 'Low') {
    parsedIdea.quality = 'Normal';
    $(this).siblings('.quality-value').text('Normal');
  }
  else if(currentQuality === 'Normal') {
    parsedIdea.quality = 'High';
    $(this).siblings('.quality-value').text('High');
  }
   else if(currentQuality === 'High') {
    parsedIdea.quality = 'Critical';
    $(this).siblings('.quality-value').text('Critical');
  }
  // noneLow();
  // lowNormal();
  // normalHigh();
  localStorage.setItem(id, JSON.stringify(parsedIdea));
});

  function noneLow() {
    if(currentQuality === 'None') {
      parsedIdea.quality = 'Low';
      $(this).siblings('.quality-value').text('Low');
    }
  }

  function lowNormal() {
    if(currentQuality === 'Low') {
      parsedIdea.quality = 'Normal';
      $(this).siblings('.quality-value').text('Normal');
    }
  }

  function normalHigh(){
    if(currentQuality === 'Normal') {
      parsedIdea.quality = 'High';
      $(this).siblings('.quality-value').text('High');
    }
  }

  function highCrit(){
    if(currentQuality === 'High') {
      parsedIdea.quality = 'Critical';
      $(this).siblings('.quality-value').text('Critical');
    }
  }

$('.card-container').on('click', '.arrow-down',  function() {
  var id = $(this).parent().parent().prop('id');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var currentQuality = parsedIdea.quality;
  console.log(currentQuality);

  if(currentQuality === 'Critical') {
    parsedIdea.quality = 'High';
    $(this).siblings('.quality-value').text('High');
  }
  else if(currentQuality === 'High') {
    parsedIdea.quality = 'Normal';
    $(this).siblings('.quality-value').text('Normal');
  }
  else if(currentQuality === 'Normal') {
    parsedIdea.quality = 'Low';
    $(this).siblings('.quality-value').text('Low');
  }
  else if(currentQuality === 'Low') {
    parsedIdea.quality = 'None';
    $(this).siblings('.quality-value').text('None');
  }
  localStorage.setItem(id, JSON.stringify(parsedIdea));
});

$('.show-btn').on('click', showCompleted)

$('.hide-btn').on('click', hideCompleted)

function showCompleted() {
  $('.task-click').show();
}

function hideCompleted() {
  $('.task-click').hide();
}

$('.card-container').on('click', '.completed', function(){
  var card = $(this).closest('.idea-card');
  var task = card.find('.idea-task');
  var id = card.attr('id');
  var grabCard = getFromStorage(id);
    card.toggleClass('task-click')
    console.log(card.attr('class'));
  var clickedCard = card.attr('class');
  grabCard.status = clickedCard;
  sendToStorage(grabCard);

});

//********************************************************************************
//   functions
//*********************************************************************************

function prepend(idea)  {
  $('.card-container').prepend(`
    <article class='${idea.status}' id='${idea.id}'>
      <input class='idea-title idea-input' type='text' value='${idea.title}'>
      <button class='delete-btn'></button>
      <textarea cols='30' rows='10' class='idea-task idea-input' type='text' value=''>${idea.task}</textarea>
      <section class='btn-container'>
        <button class='arrow-up'></button>
        <button class='arrow-down'></button>
        <p class='quality'>quality:</p>
        <p class='quality-value'>${idea.quality}</p>
        <button class='completed'>Completed Task</button>
      </section>
      <hr />
    </article>
    `)
}

// enable save button on return
function enableSaveButton13()  {
  var title = $('.input-title').val();
  var task = $('.input-task').val();
  var idea = new Idea(title, task);
    if (title === "" || task === "") {
      $('.save-btn').prop('disabled', true)
  } else {$('.save-btn').prop('disabled', false)
  prepend(idea);
  clearInputFields();
  sendToStorage(idea);
  disableSaveButton();
}
}


function enableSaveButton()  {
  var ideaTitle = $('.input-title').val();
  var ideaBody = $('.input-task').val();
    if (ideaTitle === "" || ideaBody === "") {
      $('.save-btn').prop('disabled', true)
  } else {$('.save-btn').prop('disabled', false)
}
}

function disableSaveButton() {
  $('.save-btn').prop('disabled', true)
}

function clearInputFields() {
  $('.input-title').val('');
  $('.input-task').val('');
}

function sendToStorage(idea)  {
  localStorage.setItem(idea.id, JSON.stringify(idea));
}

function getFromStorage(id) {
	var parsedIdea = JSON.parse(localStorage.getItem(id))
	return parsedIdea;
}

$('.card-container').on('click', '.delete-btn', deleteThis)

function deleteThis(){
  var id = $(this).parent().prop('id');
  localStorage.removeItem(id);
  $(this).parent().remove();
};

function getAllFromLocalStorage(){
  var allItems =[];
  for (var i = 0; i < localStorage.length; i++) {
    allItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  return allItems;
}

function filterList() {
  var filteredList = [];
  var searchText = $('.search-input').val().toUpperCase();
  var fullList = getAllFromLocalStorage();
  filteredList = fullList.filter(function(item){
    console.log(item.task);
    return item.title.toUpperCase().includes(searchText) || item.task.toUpperCase().includes(searchText) || item.quality.toUpperCase().includes(searchText);
  })
  if (filteredList.length > 0) {
    displaySearchResults(filteredList);
  }
}

function displaySearchResults(searchResults) {
  $('.card-container').empty();
  searchResults.forEach(function(item){
    prepend(item);
  })
}

$(".search-input").on("keyup", filterList);
