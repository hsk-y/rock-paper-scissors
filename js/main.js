const rival = document.getElementById("rival_img");
const result = document.getElementById("result");
const num = document.getElementById("num");
const btn4 = document.getElementById("btn4");
const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const paper = document.getElementById("paper");
const history = document.getElementById("history");
const btn_reset = document.getElementById("reset");
const myChoice = document.getElementById("myChoice");
const rival_deck = document.getElementById("rival_deck");
const round_text = document.getElementById("round_text");
const totalResult = document.getElementById("totalResult");
const winning_rate = document.getElementById("winning_rate");
const winning_rate_pre = document.getElementById("winning_rate_pre");
let judge = "";
let myCard = "";
let rival_text = "";
let myChoice_text = "";
let cards_num = 6 ;
let totalResultText = "";
let cardsArray = ['パー', 'パー', 'パー', 'グー', 'グー', 'チョキ'];
let winPoint = 0;
let losePoint = 0;
let totalWinPoint = 0;
let match_count = 0;
let round_count = 0;
let myChoicePre = "";

//初期化
cardsArrayDeck();

function match(myCard){
  random2();
  colorChange(judge);
  result.innerText = judge;
  history_list();
  anim();
}

function colorChange(judge){
  if(judge === "勝ち"){
    result.style.color = "#ff5500";
  }else if(judge === "負け"){
    result.style.color = "#000099";
  }else{
    result.style.color = "#666666";
  }
}

function anim(){
  document.querySelector(".rival_img").className = "rival_img";
  document.querySelector(".result").className = "result";
  document.querySelector(".myChoice").className = "myChoice";
  window.requestAnimationFrame(function (time) {
    window.requestAnimationFrame(function (time) {
      document.querySelector(".rival_img").className = "rival_img anim_rival";
      document.querySelector(".result").className = "result anim_result";
      document.querySelector(".myChoice").className = "myChoice anim_myChoice";
    });
  });
}

function cardsArrayReset(){
  cards_num = 6;
  cardsArray = ['パー', 'パー', 'パー', 'グー', 'グー', 'チョキ'];
  winPoint = 0;
  losePoint = 0;
}

function cardsArrayDeck(){
  let rival_deck_content = rival_deck.querySelectorAll("img");
  rival_deck_content.forEach(box => {
    rival_deck.removeChild(box);
  });
  for (i = 0; i < cardsArray.length; i++) {
    let rival_deck_img = document.createElement("img");
    // console.log(cardsArray[i]);
    if(cardsArray[i] === "パー"){
      rival_deck_img.src = "img/hand-spock-regular.svg";
    }else if(cardsArray[i] === "グー"){
      rival_deck_img.src = "img/hand-back-fist-regular.svg";
    }else{
      rival_deck_img.src = "img/hand-scissors-regular.svg";
    }
    rival_deck.appendChild(rival_deck_img);
  }
}

function history_list(){
  // tr要素を作成し、parentというクラスを付ける
  let parentDiv = document.createElement("tr");
  parentDiv.id = "result_tr_list";

  // 対象の要素.appendChild(追加するノード)
  history.appendChild(parentDiv);

  // 追加したulを取得・確認
  let result_tr_list = document.getElementById("result_tr_list");
  // console.log(result_tr_list);

  let myCard_td = document.createElement("td");
  let rivalCard_td = document.createElement("td");
  let result_td = document.createElement("td");
  myCard_td.innerText = myChoice_text;
  rivalCard_td.innerText = rival_text;
  result_td.innerText = judge;

  result_tr_list.appendChild(myCard_td);
  result_tr_list.appendChild(rivalCard_td);
  result_tr_list.appendChild(result_td);

  //追加後、idを消す
  result_tr_list.id = "";
}

function match_count_display(){
  round_count = (match_count - (match_count % 6)) / 6 + 1;
  round_text.innerText = round_count + "回戦 " + (match_count % 6) + "/6";
}

function winning_rate_display(){
  winning_rate.innerText = "総合勝率：" + Math.round(totalWinPoint / match_count * 100)  + "%";
  winning_rate_pre.innerText = "マッチ勝率：" + Math.round((winPoint / (match_count % 6)) * 100)  + "%";
}

function choice_reset(){
  myChoicePre = "";
  rock.style.opacity = "100%";
  scissors.style.opacity = "100%";
  paper.style.opacity = "100%";
}

function random2(){
  let random_num = Math.random() * cards_num;
  random_num = Math.floor(random_num);
  let rival_card = cardsArray.splice(random_num, 1);

  if(rival_card[0] === "パー"){
    rival_text = "パー";
    rival.src = "img/hand-spock-regular.svg";
    if(myCard === "rock"){
      judge = "負け";
      losePoint = losePoint + 1;
    }else if(myCard === "scissors"){
      judge = "勝ち";
      winPoint = winPoint + 1;
      totalWinPoint = totalWinPoint + 1;
    }else{
      judge = "引分";
    }
  }else if(rival_card[0] === "チョキ"){
    rival_text = "チョキ";
    rival.src = "img/hand-scissors-regular.svg";
    if(myCard === "rock"){
      judge = "勝ち";
      winPoint = winPoint + 1;
      totalWinPoint = totalWinPoint + 1;
    }else if(myCard === "scissors"){
      judge = "引分";
    }else{
      judge = "負け";
      losePoint = losePoint + 1;
    }
  }else{
    rival_text = "グー";
    rival.src = "img/hand-back-fist-regular.svg";
    if(myCard === "rock"){
      judge = "引分";
    }else if(myCard === "scissors"){
      judge = "負け";
      losePoint = losePoint + 1;
    }else{
      judge = "勝ち";
      winPoint = winPoint + 1;
      totalWinPoint = totalWinPoint + 1;
    }
  }

  // console.log(cardsArray);
  // console.log(rival_card);
  // console.log(cards_num);
  // console.log(random_num);

  cards_num = cards_num - 1;
  if(cards_num === 0){
    if(winPoint > losePoint){
      totalResultText = "勝利！";
      totalResult.style.color = "#ff5500";
    }else if(winPoint === losePoint){
      totalResultText = "引き分け";
      totalResult.style.color = "#666666";
    }else{
      totalResultText = "敗北...";
      totalResult.style.color = "#000099";
    }
    console.log(totalResultText);
    totalResult.innerText = totalResultText;
    cardsArrayReset();
    choice_reset()
  }

  match_count = match_count + 1;
  // console.log(match_count);
  match_count_display();
  winning_rate_display();
  cardsArrayDeck();
}

rock.addEventListener('click', () => {
  if(myChoicePre !== "グー"){
    myCard = "rock";
    myChoice_text = "グー";
    myChoicePre = "グー";
    rock.style.opacity = "10%";
    scissors.style.opacity = "100%";
    paper.style.opacity = "100%";
    myChoice.src = "img/hand-back-fist-regular.svg";
    match(myCard);
  }
});

scissors.addEventListener('click', () => {
  if(myChoicePre !== "チョキ"){
    myCard = "scissors";
    myChoice_text = "チョキ";
    myChoicePre = "チョキ";
    rock.style.opacity = "100%";
    scissors.style.opacity = "10%";
    paper.style.opacity = "100%";
    myChoice.src = "img/hand-scissors-regular.svg";
    match(myCard);
  }
});

paper.addEventListener('click', () => {
  if(myChoicePre !== "パー"){
    myCard = "paper";
    myChoice_text = "パー";
    myChoicePre = "パー";
    rock.style.opacity = "100%";
    scissors.style.opacity = "100%";
    paper.style.opacity = "10%";
    myChoice.src = "img/hand-spock-regular.svg";
    match(myCard);
  }
});

// reset.addEventListener('click', () => {
//   // document.body.removeChild(history);
//   let rival_p_2 = history.querySelectorAll("p");
//   // history.removeChild(rival_p_2);
//   rival_p_2.forEach(box => {
//     history.removeChild(box);
//   });
// });

reset.addEventListener('click', () => {
  cardsArrayReset();
  match_count = 0;
  totalWinPoint = 0;
  match_count_display();
  winning_rate_display();
  choice_reset();
  totalResult.innerText = "";
  let rival_tr_2 = history.querySelectorAll("tr");
  rival_tr_2.forEach(box => {
    history.removeChild(box);
  });
});