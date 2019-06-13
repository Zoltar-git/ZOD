ZOD = {
    object: (obj, val) => {
        result = "";
        Object.keys(obj).forEach((d)=>{
            if(obj[d] && Object.keys(obj[d]).includes(val)) {
                result = obj[d]
            }
        })
        return result
    },
    function: (obj, val) => {
        result = "";
        Object.keys(Object.getPrototypeOf(obj)).forEach((d)=>{
            if(obj[d] && obj[d].toString().includes(val)) {
                result = obj[d];
            }
        })
        return result
    },
    proto: (obj, val) => {
        result = "";
        Object.keys(obj).forEach((d)=>{
            if(obj[d] && Object.keys(Object.getPrototypeOf(obj[d])).includes(val)) {
                result = obj[d]
            }
        })
        return result
    },
    //parses code
    variableByLength: (object, length, returnKey) => {
        let keyFound = null;
    
        Object.keys(object).forEach((i) => {
            if(!object[i]) return;
    
            if(object[i].length === length)
                keyFound = returnKey ? i : object[i];
        });
    
        Object.keys(Object.getPrototypeOf(object)).forEach((i) => {
            if(!object[i]) return;
    
            if(object[i].length === length)
                keyFound = returnKey ? i : object[i];
        });
    
        return keyFound;
    }
}
ig.game.player = ZOD.object(ig.game,'rank'),ig.game.player.changeName = ZOD.function(ig.game.player,'screenName=a'),ig.game.item = ZOD.proto(ig.game,'removeItemFromCollection'),ig.game.item.equip = ZOD.function(ig.game.item,'AnimationSheet(null,d'),ig.game.players = ZOD.object(ig.game,'ui').player,sockets = ZOD.object(ig.game,'ws'),sockets.dict = ZOD.object(sockets,'WSLIMIT')

//parses code
const idFromScreenName = screenName => {
	updatePlayers();
	const key = ZOD.variableByLength(ig.game.player, 24, true);
	return new Promise((res, rej) => {
		ig.game.players.forEach(player => {
			if(player.screenName === screenName) {
				res(player[key]);
			}
		});

		rej('Player not found!');
	});
}

const updatePlayers = () => {
	ig.game.players = ZOD.object(ig.game, "betweenDefaultAndPlayer").player;
}

