var DICE_REGEX = /^(100|[0-9][0-9]|[1-9])(d{1}|D{1})(100|[0-9][0-9]|[2-9])$/

function roll(dice) {
    //if dice matches regex for 'xdy'
    if(DICE_REGEX.test(dice)) {
        //process string   
        let args = dice.toLowerCase().split("d");
        let rolls = Number(args[0]);
        let sides = Number(args[1]);
        
        let result = {
            rolls: [],
            sorted: [],
            max: 0,
            min: 0,
            total: 0
        }

        //roll dice
        for(i = 0; i < rolls; i++) {
            let current_roll = Math.floor(Math.random() * sides) + 1;
            result.rolls.push(current_roll);
            result.total += current_roll;
        }

        //process rolls
        result.sorted = result.rolls.slice().sort((a, b) => b - a);
        result.max = result.sorted[0];
        result.min = result.sorted[result.sorted.length - 1];
        
        return result;
    }
    //if doesnt match regex, return error
    else { 
        return "Does not match the form 'xdy' where 1 < x < 100 and 2 < y < 100"
    }
}

function roll_character_ability_scores() {
    //prepare result
    let result = {
        natural: [],
        sorted: [],
        min: 0,
        max: 0,
        average: 0
    }

    //get character ability scores
    for (let i = 0; i < 6; i++) {
        let rolls = roll('4d6');
        result.natural.push(rolls.total - rolls.min);
        result.average += result.natural[i];
    }

    //process results
    result.sorted = result.natural.slice().sort((a, b) => b - a);
    result.min = result.sorted[result.sorted.length - 1];
    result.max = result.sorted[0];
    result.average /= 6;
    return result;
}

module.exports = {
    roll_character_ability_scores: roll_character_ability_scores,
    roll: roll,
    DICE_REGEX: DICE_REGEX
}