const $ = document.querySelector.bind(document);  //doing thís so we can get any classes from the whole HTML file later
const $$ = document.querySelectorAll.bind(document);

        const PLAYER_STORAGE_KEY = 'F8_PLAYER'

        const player = $('.player')
        const heading = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')
        const cd = $('.cd')
        const playBtn = $('.btn-toggle-play')
        const progress = $('#progress')
        const nextBtn = $('.btn-next')
        const prevBtn = $('.btn-prev')
        const randomBtn = $('.btn-random')
        const repeatBtn = $('.btn-repeat')
        const playlist = $('.playlist')


      

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [ //song is just one property of the variable app, which is an object
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path:
        "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path:
        "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],

    setConfig: function(key, value){
      this.config[key] - value;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));    //this.config is a whole object, and localStorage only receives strings
    },

    render: function(){ //this property function is to display song boxs in the list 
        var htmls = this.songs.map(function(song, index){   // using method map to scan through each element in the object song, which contains data of songs
                                                            // using parameter index for activating the playing song 
            return  `
            <div class="song ${index === this.currentIndex ? 'active':''}" data-index="${index}">
              <div class="thumb" 
                style="background-image: url('${song.img}')">
              </div>
              <div class="body">  
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
          `
        }) //and this is what we want to be displayed on the screen

        playlist.innerHTML = htmls.join('') //the whole variable song is an array, 
                                                // and after method map each element is now the thing in the return. 
                                                //So using join() to convert the elements into string,
                                                //then use innerHTML to drop them into div block that has class playlist in HTML file
                                                //now thóe strings become HTML content which are displayed on screen

    },

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    

    handleEvents: function(){
        
        // const randomBtn = $('btn-random')
        const _this = this
        const cdWidth = cd.offsetWidth

        //rotate CD thumb
          const cdThumbAnimate = cdThumb.animate([ //using animation API, has 2 parameters
            {transform: 'rotate(360deg)'}
          ], {
            duration: 10000, // 10 secs
            iterations: Infinity
          })                                      //this animation API returns an object

        // cdThumbAnimate.pause() that's why we would have this method later



        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop // if not using window.scrollY then we can
                                        //use document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            
            cd.style.width = newCdWidth > 0? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick =  function(){  //this is an evemt
            if(_this.isPlaying){
                audio.pause()
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()

              } else{
                _this.isPlaying = true
                player.classList.add('playing')
                audio.play()
                cdThumbAnimate.play()

              }
              
            }

            //When a song is played
        audio.onplay = function(){ //this is an event
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

          }
            //When a song is paused
        audio.onpause = function(){
          _this.isPlaying = false
          player.classList.remove('playing')
          cdThumbAnimate.pause()
        }

            //When we change the progression of a song
        audio.ontimeupdate = function(){
          if(audio.duration){ //since at very first the duration of a song is NaN 
            const progressPercent = Math.floor(audio.currentTIme / audio.duration *100)
            progress.value = progressPercent //replace progress with new value
          }
      }

      //when we seek in a song  
      progress.onchange = function(e){
          const seekTime = audio.duration / 100 * e.target.value //e target is the variable accessing this event
          audio.currentTIme = seekTime
      }

      //When move on next song
      nextBtn.onclick = function(){
        if (_this.isRandom){
          _this.playRandomSong()
        }else{
          _this.nextSong()
        }
        audio.play() //so that when we click move on, the next song will automatically play
        _this.render() 
        _this.scrollToActiveSong()
        
      }

      prevBtn.onclick = function(){
        if(_this.isRandom){
          _this.playRandomSong()
        }else {
          _this.prevSong()
        }
        

        audio.play()
        _this.render()
        
    }

      //When shuffle
      randomBtn.onclick = function(e){
        // if(_this.isRandom){
        //   randomBtn.classList.remove('active')
        //   _this.isRandom = false
        // }
        // else{
        //   randomBtn.classList.add('active')
        //   _this.isRandom = true
        // }

        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom', _this.isRandom)          //to save what we leave off
        randomBtn.classList.toggle('active', _this.isRandom) //.classList.toggle() has 2 parameters, the first parameter is a class and will be added when the second parameter, a boolean, is true
        
      }

      //When we hit repeat button
      repeatBtn.onclick = function(){
        _this.isRepeat = !_this.isRepeat
        _this.setConfig('isRepeat', _this.isRepeat)
        repeatBtn.classList.toggle('active', _this.isRepeat)
        }
      

      //When the song ends
      audio.onended = function(){   //taking advantage of the onended method for repeat mode
        if(isRepeat){               //if the repeat mode is on then replay the song
        audio.play() 
        }else{
          nextBtn.click()           //this method works the same as a manual click action
        }
      }

      //pick a song when click on any song in the list
      playlist.onclick = function(e){         //e.target means when we click on any element in the class "playlist" it returns that exact element
        const songNode = e.target.closest('.song:not(.active)')

        if (songNode  || e.target.closest('.option')) {
            if (songNode){
              _this.currentIndex = Number(songNode.dataset.index)   //getAttribute('....') to get the value of the class   
              _this.loadCurrentSong()
              _this.render()
              audio.play()
            }                                               //but I used "data-..." earlier so now I can get the index by dataset.index
            }                                                   //closest returns itself or its parent class, if not returns null
            
      }
    },

    scrollToActiveSong: function(){
      setTimeout(()=>{
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
    }, 100)
  },

  loadConfig: function(){
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

    loadCurrentSong: function(){
        

        heading.textContent = this.currentSong.name                         //changing the song name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`  //changing the cd thumb 
        audio.src = this.currentSong.path                                   //changing the URL link leading to the song
      },

        
      nextSong: function(){
        this.currentIndex++ //move to the next song in the list, which means the next index
        if (this.currentIndex >= this.songs.length){
          this.currentIndex = 0
        }
  
        this.loadCurrentSong()
      },
      
        

    

    prevSong: function(){
      this.currentIndex-- //move to the next song in the list, which means the next index
      if (this.currentIndex < 0){
        this.currentIndex = this.songs.length-1
      }

      this.loadCurrentSong()
    },

    playRandomSong: function(){
      let newIndex
      do {
        newIndex = Math(floor(Math.random() * this.currentSong.length))
      } while (newIndex === this.currentIndex); //to eliminate the occurence of having the same song as before (if having the same then keep randomizing)

      this.currentIndex = newIndex
      this.loadCurrentSong()

    },


    start: function(){

        this.loadConfig()

        this.defineProperties()

        this.handleEvents()
        
        this.loadCurrentSong()

        this.render()

        //Display the initial status of repeat and random buttons
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
        
    }
}

app.start()