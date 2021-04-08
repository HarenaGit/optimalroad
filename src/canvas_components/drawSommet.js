
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
}

// Infinity Gauntlet Style
const style = {
    0: { color: "yellow", size: 15 },
    1: { color: "gold", size: 6 },
    2: { color: "green", size: 10 },
    3: { color: "gold", size: 6 },
    4: { color: "gold", size: 6 },
    5: { color: "purple", size: 10 },
    6: { color: "gold", size: 6 },
    7: { color: "gold", size: 6 },
    8: { color: "gold", size: 6 },
    9: { color: "blue", size: 10 },
    10: { color: "gold", size: 6 },
    11: { color: "gold", size: 6 },
    12: { color: "gold", size: 6 },
    13: { color: "red", size: 10 },
    14: { color: "gold", size: 6 },
    15: { color: "gold", size: 6 },
    16: { color: "gold", size: 6 },
    17: { color: "orange", size: 10 },
    18: { color: "gold", size: 6 },
    19: { color: "gold", size: 6 },
    20: { color: "gold", size: 6 },
  };

//drawing function

export const drawHand = (ctx) => {
    

                    ctx.beginPath();
                    ctx.moveTo(
                        22,
                        100
                    );

                    ctx.lineTo(
                        57,
                        43
                    );
                    ctx.strokeStyle = "plum";
                    ctx.lineWidth = 4;
                    ctx.stroke();

                 ctx.beginPath();
                ctx.arc(22, 100, style[3]["size"], 0, 3 * Math.PI);

                // Set line color
                ctx.fillStyle = style[3]["color"];
}