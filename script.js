//***********************************************************
//  objects
//***********************************************************
function Idea(title, task)  {
  this.title = title;
  this.task = task;
  this.quality = 'Swill';
  this.id = Date.now();
}

//************************************************************
//  event listensers
//************************************************************

$(document).ready(function() {
	for (var i = 0; i < localStorage.length; i++) {
		prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
	}
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
  if(currentQuality === 'Swill') {
    parsedIdea.quality = 'Plausible';
    $(this).siblings('.quality-value').text('Plausible');
  }
  else if(currentQuality === 'Plausible') {
    parsedIdea.quality = 'Genius';
    $(this).siblings('.quality-value').text('Genius');
  }
  localStorage.setItem(id, JSON.stringify(parsedIdea));
})

$('.card-container').on('click', '.arrow-down',  function() {
  var id = $(this).parent().parent().prop('id');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var currentQuality = parsedIdea.quality;
  if(currentQuality === 'Genius') {
    parsedIdea.quality = 'Plausible'
    $(this).siblings('.quality-value').text('Plausible');
  }
  else if(currentQuality === 'Plausible') {
    parsedIdea.quality = 'Swill';
    $(this).siblings('.quality-value').text('Swill');
  }
  localStorage.setItem(id, JSON.stringify(parsedIdea));
})

$('.card-container').on('click', '.completed', function(){
  var card = $(this).parent().parent()
  var task = card.find('.idea-task').val();
  var title = card.find('.idea-title').val();
  var container = card.parent()
  console.log(container);
  console.log(title)
  // container.filter(index, function(){
  //   if(card.prop('title') === title){
  //     return index.prop('id');
  //   }
  //   console.log(index.prop('id'))
  // })
  var idea = new Idea(title, task);
  (card.find('.idea-task').toggleClass('task-click'));
  console.log(card.find('.idea-task'))

  $('#container').toggleClass(localStorage.toggled);

   /* Toggle */
   $('.bar-toggle').on('click',function(){

      //localstorage values are always strings (no booleans)

      if (localStorage.toggled != "with_toggle" ) {
         $('#container').toggleClass("with_toggle", true );
         localStorage.toggled = "with_toggle";
      } else {
         $('#container').toggleClass("with_toggle", false );
         localStorage.toggled = "";
      }
   });
})

//********************************************************************************
//   functions
//*********************************************************************************

function prepend(idea)  {
  $('.card-container').prepend(`
    <article class='idea-card'id=${idea.id}>
      <input class='idea-title idea-input' type='text' value='${idea.title}'>
      <button class='delete-btn'></button>
      <textarea cols='30' rows='10' class='idea-task idea-input' type='text' value=''>${idea.task}</textarea>
      <section class='btn-container'>
        <button class='arrow-up'></button>
        <button class='arrow-down'></button>
        <p class='quality'>quality:</p>
        <p class='quality-value'> ${idea.quality}</p>
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

$(".search-input").on("keyup", function() {
  var localArray = []
  var searchText = this.value.toUpperCase();
  console.log(searchText);
  $(".idea-input").each( function(index, ideaCard){
    localArray.push(ideaCard.value.toUpperCase())
    console.log(localArray)
    if(ideaCard.value.toUpperCase().includes(searchText)) {
      console.log(ideaCard)
      $(this).closest(".idea-card").show()
    } else {
      $(this).closest(".idea-card").hide()
    }
  })
})
