// pts for total cust, 0 - 12 properties
const ACR = 
{
    hp: 6,  // 0
    atk: 2,// 1
    acc: 0.2,// 2
    def: 2,// 3
    psi: 11,// 4
    sta: 2,// 5
    eth: 5,// 6
    pos: 10,// 7
    neg: -10,// 8
    maxAtbCharge: 10,// 9
    currentATBCharge: 1,// 10
    phase: '',// 11
    charN: '',// 12
    spd: 1 // 13
};

//var canvas = document.querySelector('canvas');
//console.log(canvas);
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

var z = document.getElementById('z');
var x = document.getElementById('x');
var c = document.getElementById('c');

var i = document.getElementById('i');
var o = document.getElementById('o');
var p = document.getElementById('p');

var k = document.getElementById('k');
var u = document.getElementById('u');

var p1L = document.getElementById('d1ev');
var p1S = document.getElementById('P1Stats');

var p2L = document.getElementById('d2ev');
var p2S = document.getElementById('P2Stats');

var posi = document.getElementById('posDia');
var negi = document.getElementById('negDia');
var addm = document.getElementById('medDia');

var p2El = document.getElementById('table');
var p1El = document.getElementById('manuel');

var etc1 = document.getElementById('etc1');
var etc2 = document.getElementById('etc2');

var phEnum = [
  'start', //0 
  'turn', // 1
  'action',  //2
  'turnEnd', //3
  'battleEnd',  // 4
  'defending', //5
  'attacking'//6
]; 

let hpmin = 1;
let hpmax = 7;
let atmax = 5;
let atmin = 1;
let accmin = 0.1;
let accmax = 2.0;
let dfmin = 1;
let dfmax = 3;
let psmin = 1;
let psmax = 5;
let stmin = 1;
let stmax = 5;
let posmin = 1;
let posmax = 15;
let negmin = 0; // reversed
let negmax = -15; // plane
let gameOver = false;
let turnPh = false;
let currentATBCharge = 1;
let maxAtbCharge = 5;

function setPlATBC(PT)
{
    log(PT[0]); // this works
}

function playerATBCharge(PT)
{
    (PT[10] += 1);
}

var logMe = document.getElementById('logBox');
function outputColor(idn){
    logMe.style.color = `${idn}`;
}

function log(l)
{
  logMe.innerText += '\n' + l;
} 

function clearLog()
{
  logMe.innerText = '';
}

function dLog(yu = false)
{
  if(yu == true)
    logMe.style.display = 'none';
  else{
    logMe.style.display = 'block';
  }
}

display_dials();
// normal output
//outputColor('white');
// dmg 
outputColor('rgb(238, 255, 248)');

// dialogue
//outputColor('blue');
//outputColor('darkblue'); // noice

var coinTossed = false;
var p1T = false;
var p2T = false;
var winnerChosen = false;
var pointP1C = 0;
var pointP2C = 0;

let P1 = ACR[11]; // cust these stats
let P2 = ACR[11]; // cust these stats

randT = (hmax, hmin) => Math.floor(Math.random() * (hmax - hmin + 1)) + hmin;

// randomizer stats are set and working %defaults%
P1 = [randT(hpmax, hpmin),randT(atmax, atmin),randT(accmax, accmin),randT(dfmax, dfmin),randT(psmax, psmin),randT(stmax, stmin),randT(10, 7), randT(posmin, posmax),randT(negmin, negmax),10,1,'','Manuel',randT(stmin, stmax)];

P2 = [randT(hpmax, hpmin),randT(atmax, atmin),randT(accmax, accmin),randT(dfmax, dfmin),randT(psmax, psmin),randT(stmax, stmin),randT(10, 7), randT(posmin, posmax),randT(negmin, negmax),10,1,'','Table',randT(stmin, stmax)];

function displayP1Stats()
{
  p1S.innerHTML = `<div id="np1Hp">HP: ${P1[0]}</div>
        <div id="np1Eth">Ether: ${P1[6]}</div>
        <div id="np1Def">Def: ${P1[3]}</div>
        <div id="np1Acc">Acc:${P1[2]} </div>
        <div id="np1Atk">Atk:${P1[1]} </div>
        <div> Psy:${P1[4]} </div>
        <div id="np1Sta">Sta:${P1[5]} </div>
        <div id="np1Pos">Pos:${P1[7]} </div>
        <div id="np1Neg">Neg:${P1[8]} </div>
        <div id="np1Sta">Spd:${P1[13]} </div>`;
}

function displayP2Stats()
{
  p2S.innerHTML = `<div id="np2Hp">HP: ${P2[0]} </div>
        <div id="np2Eth">Ether: ${P2[6]} </div>
        <div id="np2Def">Def: ${P2[3]} </div>
        <div id="np2Acc">Acc: ${P2[2]} </div>
        <div id="np2Atk">Atk: ${P2[1]} </div>
        <div> Psy:${P2[4]} </div>
        <div id="np2Sta">Sta: ${P2[5]} </div>
        <div id="np1Pos">Pos:${P2[7]} </div>
        <div id="np1Neg">Neg:${P2[8]} </div>
        <div id="np1Sta">Spd:${P2[13]} </div>`;
}

displayP1Stats(); // works and
displayP2Stats(); // works

function AtbLoader()
{
  while (P1[9] < P1[10] && P2[9] < P2[10]) 
  {
    if (P1[9] < P1[10]) 
    {
      atbChargers();
      P1[11] == 'turn';
      p1T = true;
      break;
    }
    else if (P2[9] < P2[10])
    {
      atbChargers();
      P2[11] == 'turn';
      p2T = true;
      break;
    }
  }
}

// controls
function showP1Charger()
{
  k.style.display = 'block';
}

function hideP1Charger()
{
  k.style.display = 'none';
}

function showP2Charger()
{
  u.style.display = 'block';
}

function hideP2Charger()
{
  u.style.display = 'block';
}

function showOptionsP1()
{
    c.style.display = 'block'; 
    z.style.display = 'block'; 
    x.style.display = 'block';
}

function showOptionsP2()
{
    i.style.display = 'block'; 
    o.style.display = 'block'; 
    p.style.display = 'block';
}

function hideOptionsP1()
{
    z.style.display = 'none'; 
    x.style.display = 'none'; 
    c.style.display = 'none';
}

function hideOptionsP2()
{
    i.style.display = 'none'; 
    o.style.display = 'none'; 
    p.style.display = 'none';
}

function PsiOverEx(PT)
{
    log(`${PT[12]} has suffered from psionic over-exersion...`);
}

function chargeEtherP1(max)
{
  hideOptionsP1();
  hideOptionsP2();
  var ig = 0;
  etc1.innerHTML = `EtCharge: ${ig}`;
    k.onkeydown = function (){
        ig++;
        etc1.innerHTML = `EtCharge: ${++ig}`;
      };
  
  k.onkeyup = function () {
    if (ig >= 0) {
      if (max < ig) {
        log(`${max} ether has been used..`);
        psy(P1, max);
        return max;
      }
      else{
        log(`${ig} ether has been used..`);
        psy(P1, ig);
        return ig;
      }
    }
    return ig;
  };
}
function ActionBase(){
  z.onclick = function() {
    log('attacking!!!');
    allydmgLog(P1, P2);
    p1T = false;
  };
  x.onclick = function() {
    clearLog();
    p1T = false;
    log('Using Psi');
    if (P1[6] <= 0)
    {
        log('Insufficient Ether.');
    }
    else{
        log('How much...?');
        // charge function
        log(`dont let the 'med => gray'`);
        log(`go outside the blue or red`);
        
        var maxEth = P1[6];
        display_dials();
        var dialnumP = document.getElementById('posI').innerHTML = `${P1[7]}`;
        var dialnumN = document.getElementById('negI').innerHTML = `${P1[8]}`;
        var medi = (P1[7] + P1[8])/2;
        var dialnumM = document.getElementById('medI').innerHTML = `${medi}`;
        // calc and reduction happens here
        showP1Charger();
        chargeEtherP1(maxEth);
        }
      };
  c.onclick = function() 
  {
    p1T = false;
  log('defence is chosen');
  // guard graphic here --<
  P1[11] = 'defending';
  showOptionsP2();
  };
}

function chargeEtherP2(max) {
  hideOptionsP1();
  hideOptionsP2();
  var ig = 0;
  etc1.innerHTML = `EtCharge: ${ig}`;
    u.onkeydown = function (){
        ig++;
        etc1.innerHTML = `EtCharge: ${++ig}`;
      };
  
  u.onkeyup = function () {
    if (ig >= 0) {
      if (max < ig) {
        log(`${max} ether has been used..`);
        psy(P2, max);
        return max;
      }
      else{
        log(`${ig} ether has been used..`);
        psy(P2, ig);
        return ig;
      }
    }
    return ig;
  };
}

function etherChecks(PT, etherOut, posDia, median, negDia)
{
// ether shift mitigation && // dial shift consequence
  if (median > posDia || posDia < negDia) 
  {
      median -= etherOut;
      posDia += (etherOut) * 2;
      PT[7] = posDia;
      PT[8] = negDia;
      if (posDia < negDia) 
      {
        PsiOverEx(PT);
          gameOver = true;
      }
    return etherOut;
  }
  else if (median < negDia || posDia < negDia) 
  {
      median += etherOut;
      negDia -= (etherOut) * 2;
      PT[7] = posDia;
      PT[8] = negDia;
      if (negDia > posDia) 
      {
        PsiOverEx(PT);
          gameOver = true;
      }
    return etherOut;
  }
  else
  {
    return etherOut;
  }
}

function psy(PT, etherOut = 0)
{
  display_dials();
    let outputOOO = 0;
    etherOut += PT[6];
    let cost = (PT[6] / 2); // cost 
    etherOut -= cost;
    var posDia = PT[7];
    var negDia = PT[8];
    var median = (posDia + negDia) / 2;
    
    etherOut = etherChecks(PT, etherOut, posDia, median, negDia);

    if(etherOut === median)
    {
      hide_dials();
      outputOOO = (negDia + etherOut + posDia) * 100;
    }

      outputOOO = negDia + etherOut + posDia;
      log(`${negDia + etherOut + posDia} = PsiDmg ouput`);
    PT[7] = posDia;
    PT[8] = negDia;
    hide_dials();
    return outputOOO;
}

function attack(PT, T)
{
    T[0] -= PT[1];
    return PT[1]; // sending a message for output and saving time
}

function defend(PT, A)
{
    A -= PT[3];
    return A; // output and call if def is chosen
}
    // await means waiting on the function in que then execution of everything else.

    function endGame() 
    {
      clearLog();
        outputColor('white');
        hideOptionsP1();
        hideOptionsP2();
        log('End Theme. Cue..');
        log('You have to create a new future.');
        log('For all psychics.');
    }

    function display_dials()
    {
      posi.style.display = 'block';
      negi.style.display = 'block';
      addm.style.display = 'block';
      document.getElementById('dials').style.display = 'block';
    }

    function hide_dials()
    {
      document.getElementById('dials').style.display = 'none';
    }

    function actionBase2(PT, T)
    {
      i.onclick = function() {
        log('attacking!!!');
        allydmgLog(P2, P1);
        p2T = false;
      };
      o.onclick = function() {
        clearLog();
        p2T = false;
        log('Using Psi');
        if (P2[6] <= 0)
        {
            log('Insufficient Ether.');
        }
        else{
            log('How much...?');
            // charge function
            log(`dont let the 'med => gray'`);
            log(`go outside the blue or red`);
            
            var maxEth = P2[6];
            display_dials();
            var dialnumP = document.getElementById('posI').innerHTML = `${P2[7]}`;
            var dialnumN = document.getElementById('negI').innerHTML = `${P2[8]}`;
            var medi = (P2[7] + P2[8])/2;
            var dialnumM = document.getElementById('medI').innerHTML = `${medi}`;
            // calc and reduction happens here
            showP2Charger();
            chargeEtherP2(maxEth);
            }
          };
      p.onclick = function() 
      {
        p2T = false;
      log('defence is chosen');
      // guard graphic here --<
      P2[11] = 'defending';
      showOptionsP2();
      };
    }
    // async battle functions

    // done
    async function coinToss()
    {
        // heads 1 beats tails 0
        //p1 cointoss
        if (randT(-10,10) <= 0)
        {
            p1T = false;
            log(p1T + ' player1 goes last');
        }
        else if (randT(-10,10) >= 1) 
        {
            p1T = true;
            log(p1T + ' player1 goes first');
        }
        else{
            p1T = false;
            log(p1T + ' player1 goes last');
        }
        // redo 
        //p2 cointoss
        if (randT(-10, 10) <= 0)
        {
            p2T = false;
            log(p2T + ' player2 goes last');
        }
        else if (randT(-10,10) >= 1) 
        {
            p2T = true;
            log(p2T + ' player2 goes first');
        }
        else{
            p2T = false;
            log(p2T + ' player2 goes last');
        }
        coinTossed = true;
    }
    
    function clearAtb(PT)
    {
      PT[10] = 0;
    }

    function allydmgLog(PT, T)
    {
      clearLog();
      if(Math.random() < PT[2])
      {
            log('You hit em! NICE!');
            hideOptionsP1();
            hideOptionsP2();
                if (T[11] == phEnum[5]) 
                {
                  log(`${T[12]}` + 'defends.');
                  log(`${PT[12]} attacks for : ${attack(defend(PT, T[1]), T)}`);
                }
                if (T[0] > 0) 
                {
                  log(`${PT[12]} attacks for : ${PT[1]}`); // leave this
                    // play Target hurt anim
                }
                else
                {
                log('battle complete.');
                  if(T[0] <= 0)
                  {
                      endGame();
                  }
                  else
                  {
                    coinToss = false;
                  }
                }
                if (PT[0] <= 0)
                {  
                // 
                  gameOver = true;
                }
      }
        else
        {
            log('you missed!');
        }
    }

var battlers = [1];
battlers[0] = P1;
battlers[1] = P2;

atbMax = function()
{
  return 100;
};

function atbFillRate() 
{
  return 1;
}

updateAtb = function(PT) {
  //  PT[x] = find atb stat
  PT[9] = Math.min(PT[10] + atbFillRate() * PT[13], atbMax());
};

function atbChargers()
{
  playerATBCharge(P1);
  playerATBCharge(P2);
}

  function hpCheck()
  {
    if(gameOver == true)
    { 
      hideOptionsP1();
      hideOptionsP2();
    }
    else if(P1[0] <= 0 && P2[0] > 0)
    {
        // call winner 
        winnerChosen = true;
        log(`${P1[12]} is the Winner!`);
    }
    else if(P2[0] <= 0 && P1[0] > 0)
    {
        //call winner
        winnerChosen = true;
        log(`${P2[12]} is the Winner!`);
    }
    else
    {
      log(`P1 Hp is --> ${P1[0]}`);
      log(`P2 Hp is --> ${P2[0]}`);
    }
  }


function hideOptions()
{
    hideOptionsP1();
    hideOptionsP2();
}
function battleProcessing2()
{
  dLog(false);
  // hide stuff
  hideOptionsP1();
  hideOptionsP2();
  hide_dials(); // works
  if(coinTossed == false)
  {
    do
    {
      coinToss();
   // segment 1 
    if (p1T == true && p2T == true) 
    {
        log('retoss!');
        coinTossed = false;
        p1T = null;
        p2T = null;
        coinToss();
    }
    else if (p1T == false && p2T == false)
    {
        log('retoss!');
        coinTossed = false;
        p1T = null;
        p2T = null;
        coinToss();
    }} while(p1T == false && p2T == false || p1T == true && p2T == true); // clean and lean!
  }
  else{
    // hp check
    if(gameOver == true)
    { 
      hideOptionsP1();
      hideOptionsP2();
    }
    else if(P1[0] <= 0 && P2[0] > 0)
    {
        // call winner 
        winnerChosen = true;
    }
    else if(P2[0] <= 0 && P1[0] > 0)
    {
        //call winner
        winnerChosen = true;
    }
    if (p1T == true)
    {
      clearLog();
      log('Player1 turn...');
      log('Attack / Psi / Defend');
      showOptionsP1();
      displayP1Stats();
      actionBase(P1, P2);
      clearAtb(P1);
        p1T = false;
    }
    else if (p2T == true)
    {
      clearLog();
      log('Player2 turn...');
      log('Attack / Psi / Defend');
      showOptionsP2();
      displayP2Stats();
      actionBase2(P2, P1);
      clearAtb(P2);
        p2T = false;
    }
    hpCheck();
  }
  setTimeout(() => {
      // use a switch statement
  switch(coinTossed)
  {
    case true:
    {
        hpCheck();
        clearLog();
        if (p1T == true)
          {
            clearLog();
            log('Player1 turn...');
            log('Attack / Psi / Defend');
            showOptionsP1();
            clearAtb(P1);
            ActionBase();
            
              p1T = false;
          }
          else if (p2T == true)
          {
            clearLog();
            log('Player2 turn...');
            log('Attack / Psi / Defend');
            showOptionsP2();
            clearAtb(P2);
            actionBase2(P2, P1);
            
              p2T = false;
          }
          if (P1[0] > 0 && P2[0] > 0) 
          {
            battlers.push(P1);
            battlers.push(P2);
          }
    }
  }
    return;
  }, 1000);
  atbChargers();
}
async function battleProcessing()
    {
        hide_dials();
        hideOptionsP1();
        hideOptionsP2();
    // player coin toss
        if (coinTossed == false) 
        {
            await coinToss();
            battleProcessing();

            if (p1T == true && p2T == true) 
            {
                log('retoss!');
                coinTossed = false;
                p1T = null;
                p2T = null;
                battleProcessing();
            }
            else if (p1T == false && p2T == false)
            {
                log('retoss!');
                coinTossed = false;
                p1T = null;
                p2T = null;
                battleProcessing();
            }
        }

          if(gameOver == true)
          { 
            hideOptionsP1();
            hideOptionsP2();
          }
          else if(P1[0] <= 0 && P2[0] > 0)
          {
              // call winner 
              winnerChosen = true;
          }
          else if(P2[0] <= 0 && P1[0] > 0)
          {
              //call winner
              winnerChosen = true;
          }
          if (p1T == true)
          {
            clearLog();
            log('Player1 turn...');
            log('Attack / Psi / Defend');
            showOptionsP1();
            //displayP1Stats();
            actionBase(P1, P2);
            clearAtb(P1);
              p1T = false;
          }
          else if (p2T == true)
          {
            clearLog();
            log('Player2 turn...');
            log('Attack / Psi / Defend');
            showOptionsP2();
            //displayP2Stats();
            actionBase2(P2, P1);
            clearAtb(P2);
              p2T = false;
          }
    }
battleProcessing2();