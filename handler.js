(function(){
	var getNode = function(s){
		return document.querySelector(s);
	},
	status = getNode('.chatStatus span'),
	textarea = getNode('.chat textarea'),
	messages = getNode('.chatMessages'),
	chatname = getNode('.chatTitle'),
	statusDefault = status.textContent,
	
	setStatus = function(s){
		status.textContent = s;
		
		if(s!== statusDefault){
			var delay = setTimeout(function(){
				setStatus(statusDefault);
				clearInterval(delay);
			},3000);
		}
	};
	
	try{
		var socket = io.connect('http://127.0.0.1:8080');
	}catch(e){
		setStatus('Warning! Socket io error');
	}
	
	if(socket !== undefined){
		socket.on('output',function(data){
			if(data.length){
				for(i=0;i<data.length;i++){
					var message = document.createElement('div');
					message.setAttribute('class','chatMessage');
					message.textContent = data[x].name + ' : '+data[x].message;
					messages.appendChild(message);
					messages.insertBefore(message,messages.firstChild);
				}
			}
		});
		
		socket.on('status',function(data){
			setStatus((typeof data === 'object')?data.message : data);
			
			if(data.clear === true){
				textarea.value = '';
			}
		});
	}
});