import { Quiz } from "./quiz.module.js";

export class Setting{
   constructor(){
    document.getElementById("start").addEventListener('click',() => {
       this.startQuestion();
    })

   }

  async startQuestion(){
    const category = document.getElementById("category").value;
    const difficulty=document.querySelector('[ name="difficulty"]:checked').value;
    const numberOfQuestion = document.getElementById("amount").value;
    if(numberOfQuestion > 0){
      const result =await this.getQuestion(numberOfQuestion , category ,difficulty);
     console.log(result)
     $("#setting").removeClass("show");
     $("#quiz").addClass("show")

     const quiz = new Quiz(result);
    }
    else{
      $("#alertNumber").fadeIn(1000)
    }
   }

  async getQuestion(amount ,cat , diff ){
      const apiResult =await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${diff}`)
      const Response = await apiResult.json();

      return Response.results

   }
}