const fs = require('fs');

const re = /\$\{([^\}]+)\}/g;

function loadProperty(p, lang, stack){
	var value = lang[p];
	var refs = value.match(re);
	if(refs){
		//判断是否循环依赖
		if(stack.indexOf(p) > -1){
			throw p+"存在循环依赖";
		} else {
			stack.push(p);
		}		
		
		//唯一refs
		var tempRefs = {};
		for(var index in refs){
			if(!tempRefs[refs[index]]){
				tempRefs[refs[index]] = true;
			}
		}			
		
		for(var ref in tempRefs){
			
			var e = re.exec(ref);
			var refName = e[1];
			var refValue = lang[refName];
			
			if(re.test(refValue)){
				refValue = loadProperty(refName, lang, stack);									
			} 			
			value = value.replace(e[0], refValue);							
		}
		
		lang[p]=value;
		stack.pop();
	}
		
	return value;
}

module.exports = function(local){	

	var lang = JSON.parse(fs.readFileSync("./lang/"+local+".json"));
	for(p in lang){
		loadProperty(p, lang, []);
	}
	
	return lang;
};