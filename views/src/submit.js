var mainHTML = document.getElementsByTagName("html")[0]

$(document).ready(function(){
    var lang = navigator.language
    if (lang.indexOf("en") >= 0)
    {
        lang = "en"
        mainHTML.setAttribute("lang", lang)
    }
    else if (lang.indexOf("vi") >= 0)
    {
        lang = "vi"
        mainHTML.setAttribute("lang",lang)
    }
    $("#lang").val(lang)
    SelectLanguage()
    // $("btnShowHidePassword").Edge

})

function submitSurvey() {

    // var questionSector = document.getElementById("questionSector")

    // var questions = questionSector.children
    // console.log(questions.length)
    var answers = []
    answers[0] = $("[name='question-1']:checked").val()
    answers[1] = $("[name='question-2']:checked").val()
    answers[2] = $("[name='question-3']").val()
    answers[3] = $("[name='question-4']:checked").val()
    answers[4] = $("[name='question-4-1']").val()
    answers[5] = $("[name='question-5']").val()

    console.log(answers)

       $.post('/submit', 
        {
            answers: answers
        },
        function(data, status) {
       
        if(data.OK) {
            console.log(data.OK.msg)
        } 
        else {
            console.log('Cannot get data from servers! Please check your internet connection!')
        }
   })
}

function SelectLanguage()
{
    element = document.getElementById("lang")
    var lang = element.value;
    mainHTML.setAttribute("lang", lang)    
    var LangHash = language[lang];
    for (var key in LangHash)
    {
        if (key.indexOf("val-") === 0)
        {
            $("[langkey='" + key+ "']").val( LangHash[key]);
        }
        else if(key.indexOf("holder-") === 0)
        {
            $("[langkey='" + key+ "']").attr("placeholder",LangHash[key]);
        }  
        else if(key.indexOf("img-") === 0)
        {
            $("[langkey='" + key+ "']").attr("src",LangHash[key]);
        }   
        else if(key.indexOf("html-") === 0)
        {
           
            $("[langkey='" + key+ "']").html(LangHash[key]);
        }          
        else{
            $("[langkey='" + key+ "']").text( LangHash[key]);
        }
    }    
}

