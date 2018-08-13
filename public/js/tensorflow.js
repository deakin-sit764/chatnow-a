// Function to start the Tensorflow chatbot widget
    function startTensorChat() {
    	tensorWindow();
    }

    function tensorWindow() {
    var div = document.createElement("div");
    document.getElementsByTagName('body')[0].appendChild(div);
    div.outerHTML = "<div id='botDiv' style='height: 400px; position: fixed; bottom: 0; z-index: 1000; background-color: #fff'><div id='botTitleBar' style='height: 38px; width: 300px; position:fixed; cursor: pointer;'></div><iframe width='300px' height='400px' src='tensorflowui.html'></iframe></div>"; 

    document.querySelector('body').addEventListener('click', function (e) {
        e.target.matches = e.target.matches || e.target.msMatchesSelector;
        if (e.target.matches('#botTitleBar')) { 
            var botDiv = document.querySelector('#botDiv'); 
            botDiv.style.height = botDiv.style.height == '400px' ? '20px' : '400px';
        };
    });
};
