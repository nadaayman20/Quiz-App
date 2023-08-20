export class Quiz{
    constructor(result){
       this.result =result;
       document.getElementById("to").innerHTML = this.result.length;
       this.currentCounter =0;
       this.correctAnswer;
       this.score = 0;
       this.from =document.getElementById("from");
       this.question=document.getElementById("questionTitle");
       this.showQuestion();

       document.getElementById("nextBtn").addEventListener("click", () => {
       this.nextQuestion()
       })
       document.getElementById("end").addEventListener("click", () =>{
        location.reload();
       })
       
    }


    showQuestion(){
       this.from.innerHTML= this.currentCounter +1;
       const currentQuestion =this.result[this.currentCounter];
       console.log(currentQuestion)
       this.question.innerHTML = currentQuestion.question;
       const answers = [...currentQuestion.incorrect_answers];
       this.correctAnswer = currentQuestion.correct_answer;
       const randomAnswer = Math.ceil(Math.random() * answers.length);
       answers.splice(randomAnswer, 0 , this.correctAnswer);
      
       let answerBox = "";
       for (let i=0 ; i<answers.length ;i++){
        answerBox += `
        <div class="form-check mb-3">
        
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
            <label class="form-check-label mt-2 ms-2 fs-5">  ${answers[i]} </label>
        </div>
       
        `
       }
       document.getElementById("questionContent").innerHTML= answerBox;
    }

    nextQuestion(){
        const currentAns=document.querySelector('[ name="answer"]:checked')?.value;

        if(currentAns != undefined){
            $("#alertAns").fadeOut(300);
            this.currentCounter ++;

            if(this.currentCounter > this.result.length -1){
                $("#quiz").removeClass("show");
                $("#finsish").addClass("show");
                document.getElementById("score").innerHTML=this.score;
                
            }
            else{
                if(currentAns == this.correctAnswer){
                    $("#correct").fadeIn(0);
                    setTimeout(() => {
                        $("#correct").fadeOut(0); 
                    },1000)
                    this.score ++;
                }
                else{
                    $("#inCorrect").fadeIn(0);
                    setTimeout(() => {
                        $("#inCorrect").fadeOut(0); 
                    },1000)
                }
                this.showQuestion();
            }
        }
        else{
            $("#alertAns").fadeIn(300);
        }
    }
}