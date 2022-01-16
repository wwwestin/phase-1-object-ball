function gameObject() {
    const someObject = {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: {
                "Alan Anderson": { "number": 0, "shoe": 16, "points": 22,
                    "rebounds": 12, "assists": 12, "steals": 3, "blocks": 1, 
                    "slamDunks": 1 },
            	"Reggie Evans": { "number": 30, "shoe": 14, "points": 12, 
                    "rebounds": 12, "assists": 12, "steals": 12, "blocks": 12, 
                    "slamDunks": 7 },
                "Brook Lopez": { "number": 11, "shoe": 17, "points": 17,
                    "rebounds": 19, "assists": 10, "steals": 3, "blocks": 1,
                    "slamDunks": 15 },
                "Mason Plumlee": { "number": 1, "shoe": 19, "points": 26,
                    "rebounds": 12, "assists": 6, "steals": 3, "blocks": 8,
                    "slamDunks": 5 },
                "Jason Terry": { "number": 31, "shoe": 15, "points": 19,
                    "rebounds": 2, "assists": 2, "steals": 4, "blocks": 11,
                    "slamDunks": 1 }
            }
        },
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: {
                "Jeff Adrien": { "number": 4, "shoe": 18, "points": 10,
                    "rebounds": 1, "assists": 1, "steals": 2, "blocks": 7,
                    "slamDunks": 2 },
                "Bismak Biyombo": {  "number": 0, "shoe": 16, "points": 12,
                    "rebounds": 4, "assists": 7, "steals": 7, "blocks": 15,
                    "slamDunks": 10 },
                "DeSagna Diop": { "number": 2, "shoe": 14, "points": 24,
                    "rebounds": 12, "assists": 12, "steals": 4, "blocks": 5,
                    "slamDunks": 5 },
                "Ben Gordon": { "number": 8, "shoe": 15, "points": 33,
                    "rebounds": 3, "assists": 2, "steals": 1, "blocks": 1,
                    "slamDunks": 0 },
                "Brendan Haywood": { "number": 33, "shoe": 15, "points": 6,
                    "rebounds": 12, "assists": 12, "steals": 22, "blocks": 5,
                    "slamDunks": 12 }
            }
        }
    }
    return someObject
}

function homeTeamName() {
    let object = gameObject()
    return object['home']['teamName']
}

function homeJerseyNumbers() {
    const team = gameObject().home.players
    return Object.keys(team).map(player => team[player].number)
}

const awayTeamName = () => gameObject().away.teamName

// findPlayer helper function so we Don't Repeat Yourself
// a.k.a. keeping code "DRY"
function findPlayer(name, data = gameObject()) {

    // O(1) refactor
    const { home, away } = data // destructuring
    return home.players[name] ? home.players[name] : away.players[name]

    // O(1) solution
    // ---------------
    // let player
    // const data = gameObject()
    // if (data.home.players[name]) {
    //     player = data.home.players[name]
    // }
    // if (data.away.players[name]) {
    //     player = data.away.players[name]
    // }
    // return player

    // O(n)^2 solution
    // -----------------
    // const game = gameObject()
    // for (team in game) {
    //     for (player in game[team].players) {
    //         if (player === name) {
    //             return game[team].players[name]
    //         }
    //     }
    // }
}

function numPointsScored(name) { // no wet code here.
    return findPlayer(name).points
}

const shoeSize = name => findPlayer(name).shoe // super DRY code!

function teamColors(name){
    const data = gameObject()
    for (key in data) {
        if (data[key].teamName === name) {
            return data[key].colors
        }
    }
}

const teamNames = () => {
    const data = gameObject()
    return Object.keys(data).map(t => data[t].teamName)
}

const playerNumbers = name => {
    const data = gameObject()
    const team = Object.keys(data).find(t => data[t].teamName === name)
    const players = Object.keys(data[team].players)
    return players.map(player => data[team].players[player].number)
        /* ^^^ the variable declared        ^^^ the attribute of the object
               on line 179.                     we spent all that time
                                                building this morning, a.k.a.
                                                that huge object at the top of
                                                this file.
         TWO DIFFERENT "players" VARIABLES???                                      
                                                */
}

// playerStats uses our helper function from above
const playerStats = name => findPlayer(name)

const bigShoeRebounds = () => {
    const data = gameObject()
    const memory = {shoe: 0}
    for (key in data) {
        for (player in data[key].players) {
            const playerInfo = data[key].players[player]
            if (playerInfo.shoe > memory.shoe) {
                memory.shoe = playerInfo.shoe
                memory.rebounds = playerInfo.rebounds
            }
        }
    }
    return memory.rebounds
}

const mostPointsScored = () => {
    const data = gameObject()
    const memory = {name: undefined, points: 0}
    for (key in data) {
        for (player in data[key].players) {
            const playerInfo = data[key].players[player]
            if (playerInfo.points > memory.points) {
                memory.name = player
                memory.points = playerInfo.points
            }
        }
    }
    return memory.name
}

const winningTeam = () => {
    const data = gameObject()
    const memory = {}
    for (key in data) {
        memory[key] = Object.keys(data[key].players).map(p => {
            return data[key].players[p].points
        }).reduce((a, n) => a + n)
    }
    teams = Object.keys(memory)
    return memory[teams[0]] > memory[teams[1]] ? teams[0] : teams[1]
}

const playerWithLongestName = (data = gameObject()) => {
    const memory = {name: ""}
    for (key in data) {
        const team = data[key]
        Object.keys(team.players).forEach(player => {
            if (memory.name.length < player.length) {
                memory.name = player
            } 
        })
    }
    return memory.name
}

const doesLongNameStealATon = () => {
    const data = gameObject()
    const longName = playerWithLongestName(data)
    const longPlayer = findPlayer(longName, data)
    for (key in data) {
        const team = data[key]
        for (player in team.players) {
            const challenger = team.players[player]
            if (longPlayer.steals < challenger.steals) {
                return false
            }
        }
    }
    return true
}


/* otherStuff function created to show array methods used to find certain
team players
e.g... 
    otherStuff().home.players.find(e => e.name === "Alan Anderson")*/
