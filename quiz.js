let questionIndex = 0;
let correctChoiceCounter = 0;
let currentAnswer = undefined;


// Soru listesi
let Questions = [{
   text: "1950'li yılların sonlarında tahılları yedikleri gerekçesiyle ülkesindeki tüm serçelerin öldürülmesini emreden ünlü dikdatör kimdir?",
   answers: [
      {
         text: "Josef Stalin",
         isCorrect: false,
      },
      {
         text: "Adolf Hitler",
         isCorrect: false,
      },
      {
         text: "Mao Zedong",
         isCorrect: true,
      },
      {
         text: "Saddam el Kaddafi",
         isCorrect: false,
      }
   ]
}, {
   text: "1972’de Apollo 17 uzay aracı mürettebatınca çekilen ve yerküreyi bütün olarak gösteren ünlü fotoğrafın adı nedir?",
   answers: [
      {
         text: "Mavi Boncuk",
         isCorrect: false,
      },
      {
         text: "Mavi Bilye",
         isCorrect: true,
      },
      {
         text: "Mavi Gezegen",
         isCorrect: false,
      },
      {
         text: "Mavi Mavi",
         isCorrect: false,
      }
   ]
}, {
   text: "Yüzüklerin Efendisi ve Hobbit film serilerinin ünlü yönetmeni kimdir?",
   answers: [
      {
         text: "Peter Jackson",
         isCorrect: true,
      },
      {
         text: "Ridley Scott",
         isCorrect: false,
      },
      {
         text: "Francis Ford Coppola",
         isCorrect: false,
      },
      {
         text: "Martin Scorsese",
         isCorrect: false,
      }
   ]
}, {
   text: "Benjamin Button'ın Tuhaf Hikâyesi filminde yaşlı doğup gençleşen Benjamin Button karakterini kim canlandırmıştır?",
   answers: [
      {
         text: "Matt Damon",
         isCorrect: false,
      },
      {
         text: "Tom Cruise",
         isCorrect: false,
      },
      {
         text: "Brad Pitt",
         isCorrect: true,
      },
      {
         text: "Cem Yılmaz",
         isCorrect: false,
      }
   ]
}, {
   text: "Star-Lord, Gamora, Drax ve Groot hangi film serisinde yer alan karakterlerdir?",
   answers: [
      {
         text: "Transformers",
         isCorrect: false,
      },
      {
         text: "Fantastik Dörtlü",
         isCorrect: false,
      },
      {
         text: "Harry Potter",
         isCorrect: false,
      },
      {
         text: "Galaksinin Koruyucuları",
         isCorrect: true,
      }
   ]
}];

// quizPageBody HTML elementinin içerisine her soru değiştiğinde 
// yerleştirebilmek sorularımızın kapsayıcısı olan elementimizi aldık
let questionBody = document.querySelector("#quizPageBody");

// bu metot ile soru değişikliğinde aktif olan soruyu
// yani questionIndex index'ine sahip olan soruyu yeni soru olarak
// işleyip  questionBody elementinin içerisine eliyoruz
const questionRender = () => {
   let answersHtml = "";
   

   Questions[questionIndex].answers.forEach(item => {
      answersHtml +=
         `<div class="quiz__answers-answer" 
        data-iscorrect="${item.isCorrect}" 
        onclick="selectedChoice(this)">
         ${item.text}
      </div>`
   });

   

   let questionHtml = `<div class="quiz__question">
   <h3>Question ${questionIndex + 1}</h3>
   <p>
     ${Questions[questionIndex].text}
   </p>
   </div>
   <div class="quiz__answers">
    ${answersHtml}
   </div > 

  `

   questionBody.innerHTML = questionHtml;
}

// önceki bir seçim varsa bu kaldırılır 
// daha sonra seçilen cevap belirlenir
const selectedChoice = (e) => {
   if (questionIndex != Questions.length) {
      let questionAnswers = Array.from(document.getElementsByClassName("quiz__answers-answer"));
      for (let i = 0; i < questionAnswers.length; i++) {
         if (questionAnswers[i].classList.contains("selected")) {
            questionAnswers[i].classList.remove("selected");
            break;
         }
      }

      e.classList.add("selected");
      currentAnswer = e;
   }
};

// bir sonraki soruya geçmek için kullanılır
const nextQuestion = () => {

   // eğer bir soru seçimi yapıldıysa
   // bir aksyion veriyoruz aksi durumda hiçbirşey yapmadık
   if (currentAnswer != undefined) {
      // doğru soru seçildiyse seçilen elemen'a 'correct' class'ını ekleyip
      // doğru olarak gösterdi
      if (currentAnswer.dataset.iscorrect == "true") {
         currentAnswer.classList.add("correct");
         correctChoiceCounter++;
      } else {
         /**
          * seçilen soru yanlış ise seçilen eleman'a 'wrong' classını ekledik
          * bu ekleme cevabının yanlış olduğunu gösteren kırmızı rengi ekledi
          * ve daha sonra cevaplarımız içinde doğru olanı bulup ona 'correct'
          * classını ekleyerek doğru olan cevabı gösterdik
          */
         currentAnswer.classList.add("wrong");
         let questionAnswers = Array.from(document.getElementsByClassName("quiz__answers-answer"));
         for (let i = 0; i < questionAnswers.length; i++) {
            if (questionAnswers[i].dataset.iscorrect == "true") {
               questionAnswers[i].classList.add("correct");
               break;
            }
         }
      }

      /**
       * eğer aktif soru son soru ise 
       * kullanıcıya doğru bilgisini ve başarı oranını gösteriyoruz
       */
      if (Questions.length - 1 == questionIndex) {
         questionIndex += 1;
         setTimeout(() => {
            showHide();
            // alert(`Toplam ${correctChoiceCounter} doğru yaptınız başarı oranınız : %${(correctChoiceCounter / Questions.length) * 100}`);
         }, 1000);

      } else {
         // eğer son soru değil se 500ms sonra sonraki soruya geçiriyoruz
         setTimeout(() => {
            questionIndex += 1;
            questionRender();
            currentAnswer = undefined;
         }, 500);
      }


   }
}

const prevQuestion = () => {
   if (questionIndex != 0) {
      questionIndex -= 1;
      questionRender();
   }
   
}

// sayfa ilk açıldığında ilk soruyu getirmesi için 
// "questionRender" metodumuzu bi kere çalıştırıyoruz
questionRender();

// ================Questions-Optic===============



 














// ===========Alert&Toast============

const showHide = (status)=>{
   const toastContainerEl = document.querySelector(".toast__container");
   let successRateNum = (correctChoiceCounter / Questions.length) * 100;
   let progressLine = document.querySelector(".toast__progress");
   

   

   if(toastContainerEl.classList.contains("hide"))
       toastContainerEl.classList.remove("hide");
       toastContainerEl.classList.add("show");
       toastContainerEl.classList.add(status);

   setTimeout(() =>{
       toastContainerEl.classList.remove("show")
       toastContainerEl.classList.remove(status);
       toastContainerEl.classList.add("hide");
   } , 5000 );


   let trueAnswer = document.getElementById("true-answer")
   trueAnswer.innerText = ` Doğru:${correctChoiceCounter} Yanlış:${5-correctChoiceCounter}`

   let successRate = document.getElementById("success-rate");
   successRate.innerText = `Başarı Oranınız:%${(correctChoiceCounter / Questions.length) * 100}`

   if(successRateNum > 40){
      progressLine.style.backgroundColor = "green";
   }else{
      progressLine.style.backgroundColor = "red";
      
   }
   

};