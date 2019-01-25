var zoom=1;
var rotate=0;
var stage;
var video;
var controls;
var prop;
var setFilter;
var TotMovDur;
var ProgBar;
var pBarmarks;
var volOnOff=true;
var msg;

function init(){
    stage=document.getElementById('stage');
    video=document.querySelector('#myVideo');
    controls=document.getElementById('controls');
    setFilter=document.getElementById('filter');
    ProgBar=document.getElementById('progBar');
    pBarmarks=document.getElementById('progBarMarks');
    msg=document.getElementById('msg');
    
    msg.innerHTML="";

    var properties=['transform', 'WebkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    prop=properties[0];

    video.volume=0.5;
    var i,j;
    for(i=0,j=properties.length;i<j;i++){
        if(typeof stage.style[properties[i]]!=='undefined'){
            prop=properties[i];
            break;
        }
    }
    video.style.left=0;
    video.style.top=0;
    //filter section
    setFilter.addEventListener('click',function(e){
        var el=e.target;
        var changeSumCaption=document.getElementById('filterTitle');
        
        switch (el.id){
            case 'grayscale':
                changeSumCaption.innerHTML='Filter-Gray';        
                video.className="gray"; 
                
        
                break;
            case 'sepia':
                changeSumCaption.innerHTML='Filter-Sepia';
                video.className="sepia";
                break;
            case 'blur':
            changeSumCaption.innerHTML='Filter-Blur';
                video.className="blur";
                break;
            case 'brightness':
                changeSumCaption.innerHTML='Filter-Brightness';
                video.className="brightness";
                break;
            case 'contrast':
                changeSumCaption.innerHTML='Filter-Contrast';
                video.className="contrast";
                break;
            case 'hue':
                changeSumCaption.innerHTML='Filter-Hue(normal)';
                video.className="hue";
                break;
            case 'hue2':
                changeSumCaption.innerHTML='Filter-Hue(medium)';
                video.className="hue2";
                break;
            case 'hue3':
                changeSumCaption.innerHTML='Filter-Hue(high)';
                
                video.className="hue3";
                break;
            case 'saturate':
                changeSumCaption.innerHTML='Filter-Saturate';
                video.className="saturate";
                break;
            case 'invert':
                changeSumCaption.innerHTML='Filter-Invert';
                video.className="invert";
                break;
            case 'none':
                changeSumCaption.innerHTML='Filter';
                video.className="nofilter";
                break;
           
        }
    });
    //Change moveis section
    var changeMovie=document.getElementById('poster');
    changeMovie.addEventListener('click', function(e){
        var movieIndex=e.target.id;
        var movieAdd;
        msg.innerHTML="";
            
        switch (movieIndex){
            
            case '0':
                movieAdd="/movies/funny.mp4";
                loadMovie(movieAdd);
                break;
            case '1':
                movieAdd="movies/mjut.mp4";
                loadMovie(movieAdd);
                break;
        }       
    });

    //progBar
    video.addEventListener('progress', function(e){
        var movCurTime=video.currentTime;
        var movDur=video.duration;
        TotMovDur=movDur-movCurTime;
        
    });
    
    //prog Time Update
    video.addEventListener('timeupdate', timUpdate,false);
    
    function timUpdate(e){
        var movCurTime=video.currentTime;
        var curPersent=parseInt((movCurTime/TotMovDur)*100);
        ProgBar.style.width=curPersent+'%';

    }

    //movie ended
    video.addEventListener('ended',function(e){
        if(video.pause){
            var btnPlay=document.getElementById('play');
            btnPlay.innerHTML="&#x22b3;";
            btnPlay.style.color="green";

        }else{
            controls.innerHTML="&#x220e;";
        }
    });
    //move movie 
        pBarmarks.addEventListener('click', function(e){
            
        if(video.src!=""){
            msg.innerHTML="";
            var wid=pBarmarks.getBoundingClientRect();
            var p=parseInt(((e.x-wid.x)/wid.width)*100);
            ProgBar.style.width= e.x-wid.x + 'px';
            var vp=(video.duration/100)*p;
            video.currentTime=vp;
            
            /*
            var barRectInf=pBarmarks.getBoundingClientRect();
            var barLeftVal=barRectInf.x;
            var barWidth=barRectInf.width+barLeftVal;
            var barCurVal=e.x-barLeftVal;
            var barParsent=((barCurVal+barLeftVal)/barWidth)*100;
            
            ProgBar.style.width=barCurVal + "px";

            var movDur=video.duration;
            var movCurTime=(movDur/barParsent)*100;

            console.log(barParsent,movCurTime,video.duration);
            //video.currentTime=movCurTime;
           */
        }else{
            msg.innerHTML="Progress Message... please load a movie."
        }
    });
    
    
   
}

//end init function ===================
//=============================================

function upDateVol(e){
    
    if(video.src!="") {
        if(volOnOff) {
            var volValue=e.target.value;
            volValue=volValue/100;
            video.volume=volValue;
        }else{
            document.getElementById('volume').value="50";
            
        }
    }else{
        msg.innerHTML="Volume Message...please load a movie.";
    }
     
}
//Volume on/off
function vol_OnOff(e){
    if(video.src!=""){
        if(volOnOff){
            e.target.src="icons/player/voloff.png";
            volOnOff=false;
            video.volume=0;
        }else{
            e.target.src="icons/player/volon.png";
            volOnOff=true;
            video.volume=0.5;
        }
    }else{
        msg.innerHTML="Sound on/off message...please load a movie.";
    }  

}
//load Movie
function loadMovie(madd){
    video.src=madd;
    var btnPlay=document.getElementById('play');
    btnPlay.innerHTML="&#x22b3;";
    btnPlay.style.color="green";

}

//player button section
function play(e){
    if(video.src!=""){
        if(video.paused){
            video.play();
            e.target.innerHTML="&#x220e;";
            e.target.style.color="red";
        }else{
            video.pause();
            e.target.innerHTML="&#x22b3;";
            e.target.style.color="green";
        }
    }else{
        msg.innerHTML="Playing Message...please load a movie.";
    }

}
//button funtions
function left(){
    video.style.left=(parseInt(video.style.left,10)-5) + 'px';
}
function right(){
    video.style.left=(parseInt(video.style.left,10)+5)+ 'px';
}
function scalePlus(){
    zoom=zoom+0.1;
    video.style[prop]='scale('+zoom+')rotate('+rotate+'deg)';

}
function scaleMinus(){
    zoom=zoom-0.1;
    video.style[prop]='scale('+zoom+')rotate('+rotate+'deg)';
}
function rotateR(){
    rotate=rotate+5;
    video.style[prop]='rotate('+rotate+'deg) scale('+zoom+')';
}
function rotateL(){
    rotate=rotate-5;
    video.style[prop]='rotate('+rotate+'deg) scale(' +zoom+ ')';
}
function reset(){
    zoom=1;
    rotate=0;
    video.style.left=0+'px';
    video.style.top=0+'px';
    video.style[prop]='rotate(' + rotate + 'deg) scale(' + zoom + ')';
}
function bxx(){
    video.currentTime=video.currentTime-5;
 
}
function fxx(){
    video.currentTime=video.currentTime+5;
}
