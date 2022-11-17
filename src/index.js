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
    neg: 0,// 8
    maxAtbCharge: 10,// 9
    currentATBCharge: 1,// 10
    phase: '',// 11
    charN: '',// 12
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

var k = document.getElementById('n1');
var u = document.getElementById('n2');

var p1L = document.getElementById('d1ev');
var p1S = document.getElementById('P1Stats');

var p2L = document.getElementById('d2ev');
var p2S = document.getElementById('P2Stats');

var posi = document.getElementById('posDia');
var negi = document.getElementById('negDia');
var addm = document.getElementById('medDia');

var p2El = document.getElementById('table');
var p1El = document.getElementById('manuel');

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
let negmin = -15; // reversed
let negmax = 0; // plane
let gameOver = false;
let turnPh = false;

function setPlATBC(PT)
{
    log(PT[0]); // this works
}

function playerATBCharge(PT)
{
    PT[10] += 1;
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

hide_dials();
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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

randT = (hmax, hmin) => Math.floor(Math.random() * (hmax - hmin + 1)) + hmin;

// randomizer 6 stats are set and working %defaults%
P1 = [randT(hpmax, hpmin),randT(atmax, atmin),randT(accmax, accmin),randT(dfmax, dfmin),randT(psmax, psmin),randT(stmax, stmin), randT(10, 7), randT(0, 4), 0, 1, 1,'','Manuel'];

P2 = [randT(hpmax, hpmin),randT(atmax, atmin),randT(accmax, accmin),randT(dfmax, dfmin),randT(psmax, psmin),randT(stmax, stmin), randT(10, 7), randT(0, 4), 0, 1, 1,'','Table'];

function displayP1Stats()
{
  p1S.innerHTML = `<div id="np1Hp">HP: ${P1[1]}</div>
        <div id="np1Eth">Ether: ${P1[6]}</div>
        <div id="np1Def">Def: ${P1[3]}</div>
        <div id="np1Acc">Acc:${P1[2]} </div>
        <div id="np1Atk">Atk:${P1[0]} </div>
        <div> Psy:${P1[4]} </div>
        <div id="np1Sta">Sta:${P1[5]} </div>`;
}

function displayP2Stats()
{
  p2S.innerHTML = `<div id="np2Hp">HP: ${P2[1]} </div>
        <div id="np2Eth">Ether: ${P2[6]} </div>
        <div id="np2Def">Def: ${P2[3]} </div>
        <div id="np2Acc">Acc: ${P2[2]} </div>
        <div id="np2Atk">Atk: ${P2[0]} </div>
        <div> Psy:${P2[4]} </div>
        <div id="np2Sta">Sta: ${P2[5]} </div>`;
}

displayP1Stats(); // works and
displayP2Stats(); // works

function DecreasedATB(factor = 1)
{
    currentATBCharge = clamp(currentATBCharge - (factor * maxAtbCharge), 0, maxAtbCharge);
}

function setCurrentATB(newCharge)
{
    currentATBCharge = newCharge;
}

// controls
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
    
    // ether shift mitigation && // dial shift consequence
    if (etherOut > posDia || median > posDia) 
    {
        negDia -= etherOut;
        if (posDia < negDia) 
        {
            gameOver = true;
        }
    }
    else if (median < negDia || median < negDia) 
    {
        posDia += etherOut;
        if (posDia > negDia) 
        {
            gameOver = true;
        }
    }
    else if(etherOut === median)
    {
      hide_dials();
        outputOOO = (negDia + etherOut + posDia)* 100;
    }

    let min = Math.ceil(negDia);
    let max = Math.floor(posDia);

    if (Math.floor(Math.random() * (max - min + 1)) + etherOut > posDia || Math.floor(Math.random() * (max - min + 1)) + etherOut < negDia) 
    {
        PsiOverEx(PT);
        gameOver = true;
        hide_dials();
    }
    else
    {
        outputOOO = negDia + etherOut + posDia;
        log(`${negDia + etherOut + posDia} = PsiDmg ouput`);
    }
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

function chargeEther(max)
{
  hideOptionsP1();
  hideOptionsP2();
  var ig = 0;
  k.onkeydown = function () {
    k.textContent = `${++ig}`;
  };

  k.onkeyup = function () {
    log(`${ig} ether has been used..`);
    return ig;
  };

  u.onkeydown = function () {
    u.textContent = `${++ig}`;
  };

  u.onkeyup = function () {
    log(`${ig} ether has been used..`);
    return ig;
  };
  if (max < ig) {
    return max;
  }
  
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
    }

    function hide_dials()
    {
      posi.style.display = 'none';
      negi.style.display = 'none';
      addm.style.display = 'none';
    }
          
    function actionBase(PT, T)
    {
        z.onclick = function() {
            log('attacking!!!');
            allydmgLog(PT, T);
        };
        x.onclick = function() {
          
            if (PT[6] <= 0) {
                log('Insufficient Ether.');
                //PT.miss = 0;
            }
            else{
                log('How much...?');
                // charge function
                log(`dont let the 'med'`);
                log(`go outside the blue or red`);
                log('Using Psi');
                var maxEth = PT[6];
                display_dials();
                // calc and reduction happens here
                psy(PT, chargeEther(maxEth));
            }
        };
        c.onclick = function() 
        {
          log('defence is chosen');
          // guard graphic here --<
          PT[11] = 'defending';
          // pre-calculated dmg output here
          battleProcessing();
          // <------------------------
          //retreat();
        };
    }

    function actionBase2(PT, T)
    {
      i.onclick = function() {
        log('attacking!!!');
        allydmgLog(PT, T);
    };
    o.onclick = function() {
      
        if (PT[6] <= 0) {
            log('Insufficient Ether.');
            //PT.miss = 0;
        }
        else{
            log('How much...?');
            // charge function
            log(`dont let the 'med'`);
            log(`go outside the blue or red`);
            log('Using Psi');
            var maxEth = PT[6];
            display_dials();
            // calc and reduction happens here
            psy(PT, chargeEther(maxEth));
        }
    };
      p.onclick = function() 
      {
        log('defence is chosen');
        // guard graphic here --<
        PT[11] = 'defending';
        // pre-calculated dmg output here
        battleProcessing();
        // <------------------------
        //retreat();
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
            setTimeout(() => 
            {
                if (T[11] == phEnum[5]) 
                {
                  log(`${T[12]}` + 'defends.');
                  log(`${PT[12]} attacks for : ${attack(defend(PT,T[1]), T)}`);
                }
                if (T[0] > 0) 
                {
                    log(`${PT[12]} attacks for : ${PT[1]}`); // leave this
                    // play Target hurt anim
                    battleProcessing();
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
                      playerPhase();
                  }
                }
                if (PT[0] <= 0)
                {  
                // 
                  gameOver = true;
                }
            },1000);
      }
        else
        {
            log('you missed!');
            battleProcessing();
        }
    }

gameParty1 = [];
gameParty2 = [];
gameParty1[0] = P1;
gameParty2[0] = P2;
//party initializer
// initMembers = function() {
//     initAtb();
// };

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
  PT[9] = Math.min(PT[10] + atbFillRate(), atbMax());
};
// updater

updateFrame = function() {
  updateAtb();
};

function atbChargers()
  {
    while(P1[9] > P1[10] && P2[9] > P2[10])
    {
      if(turnPh == false)
      {
        break;
      }
      playerATBCharge(P1 * atbFillRate());
      playerATBCharge(P2 * atbFillRate());
    }
  }


// drawActorAtb = function(actor, x, y, width) {
//   width = width || 186;
//   var atb = actor.atb();
//   var atbMax = actor.atbMax();
//   var color1 = hpGaugeColor1();
//   var color2 = hpGaugeColor2();
//   drawGauge(x, y, width, atb / atbMax, color1, color2);
//   changeTextColor(systemColor());
//   drawText("ATB", x, y, 44);
// };

// drawGaugeAreaWithTp = function(rect, actor) {    
//   this.drawActorHp(actor, rect.x + 0, rect.y, 108);
//   this.drawActorMp(actor, rect.x + 123, rect.y, 96);
//   this.drawActorAtb(actor, rect.x + 234, rect.y, 96);
// };


async function battleProcessing()
    {
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

    battleProcessing2()
    {
      // test stuff here
      // hide shit
      // cointoss check
      // hp check
      // ues a switch statement
    }

//battleProcessing();