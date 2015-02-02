
// function to save the input for number of pages to the local storage
function SaveInput(){
  localStorage.setItem('pages_Input' ,document.getElementsByName('pagesInput')[0].value )
}
function GetLanguage(){
  if (document.getElementById('Python').checked){
  LanguageChoices.push("Python");
  }
  if (document.getElementById('JSON').checked){
  LanguageChoices.push("JSON");
 }
  if (document.getElementById('JavaScript').checked){
  LanguageChoices.push("JavaScript");
  }
  if (document.getElementById('SQL').checked){
  LanguageChoices.push("SQL");
  }
  //console.log(LanguageChoices.length);
}
// retrieving the number pf pages from the local storage
var pages = localStorage.getItem('pages_Input');
var gistsArray = [];
var LanguageChoices = [];
var saveArray = [];
var saveUrl = [];
var saveId = [];
// funtion to call the request based on the user's input of N pages 
function GetWebPages(page , pages){  

  var req = new XMLHttpRequest();

    req.onreadystatechange = function(){
      if (req.readyState==4 && req.status==200){
        var parsed = JSON.parse(req.responseText);
        
        //var obj = parsed[page][page].files;
        for (var prop in parsed) {
        if( parsed.hasOwnProperty( prop ) ){
        }
        var filter = parsed[prop];
        var files = filter.files;
        var GistUrl = filter.url;
        //console.log(files);
        for ( var key in files) {
          var lang = files[key]
          //console.log(lang);
          for (var i in lang){
          //console.log(lang['language']);
          //console.log(GistUrl);
          var temp = null;
          for (var i=0 ; i <= LanguageChoices.length ; i++){
            if (lang['language'] === LanguageChoices[i]){

            var ListDiv = document.createElement('div');
            var Item = document.createElement('Item');
            var favorite = document.createElement('button');
            favorite.setAttribute('id', filter.id);
            console.log(filter.id);
            var list = document.getElementById("result");
            Item.innerHTML = '<a href="' + GistUrl + '">'+ filter.description + '</a>';
            if (filter.description === '' || filter.description === null){
              text = document.createTextNode("No Description provided");
              Item.innerHTML = '<a href="' + GistUrl +'">'+ "No Description provided" + '</a>';
            }
            saveArray.push(filter.description);
            saveUrl.push(GistUrl);
            saveId.push(filter.id);
            Item.appendChild(favorite);
            ListDiv.appendChild(Item);
            list.appendChild(ListDiv);
            favorite.innerHTML = 'Favorite';
            var xy = filter.description;
            favorite.onclick = function(){
              var test = document.getElementById(favorite.id);
              console.log(test);
              var newList = document.getElementById("favorites");
              var newDiv = document.createElement('div');
              var NewItem = document.createElement('x');
              var unfavorite = document.createElement('button');
              var text = document.createTextNode(filter.description);
              NewItem.innerHTML =  '<a href="' + saveUrl[i] + '">'+ saveArray[i] + '</a>';
              NewItem.appendChild(unfavorite);
              newDiv.appendChild(NewItem);
              newList.appendChild(newDiv);
              unfavorite.innerHTML = 'UnFavorite';
              }
            
            localStorage.setItem(filter.id, GistUrl);
            localStorage.setItem(filter.id, filter.description);
            }
            if(LanguageChoices.length === 0){
              var ListDiv = document.createElement('div');
              var Item = document.createElement('Item');
              var favorite = document.createElement('button');
              var list = document.getElementById("result");
              var text = document.createTextNode(filter.description);
              Item.innerHTML = '<a href="' + GistUrl + '">'+ filter.description + '</a>';
              if (filter.description === '' || filter.description === null){
              text = document.createTextNode("No Description provided");
              Item.innerHTML = '<a href="' + GistUrl +'">'+ "No Description provided" + '</a>';
              }

              Item.appendChild(favorite);
              ListDiv.appendChild(Item);
              list.appendChild(ListDiv);
              favorite.innerHTML = 'Favorite';

            }
          }
          }
        }
      } 
      }

      if (page < pages){

        GetWebPages(page+1 , pages);
      }
  }
  var url = "https://api.github.com/gists" + "?page=" + page + "&mode=json" ;
  req.open("GET", url ,true);
  req.send();
}

var addFavorite = function (){
  //console.log(document.getElementsByName('favorite'));
  var x = document.getElementsByName('Favorite').innerHTML;
  console.log(x);
  for (var i = 0 ; i < saveArray.length ; i++){
    //console.log(saveArray[i]);
    //console.log(saveUrl[i]);
    //console.log(saveId[i]);
    for ( var x in localStorage){
      if ( x === saveId[i]){
     }
    }
  }

  var gist_desc = localStorage.getItem('');
  var ListDiv = document.createElement('div');
  var Item = document.createElement('Item');
  var favorite = document.createElement('button');
  var list = document.getElementById("favorites");
  var text = document.createTextNode("Hi there");
  Item.appendChild(favorite);
  ListDiv.appendChild(Item);
  list.appendChild(ListDiv);
  favorite.innerHTML = 'Favorite'
}
