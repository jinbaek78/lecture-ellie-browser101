/**
 * 기능
 * 
 시작버튼 또는 리플레이 버튼 클릭: play()
	시작버튼이 중지버튼으로 변경: changePlayBtnToStopBtn()
	타이머 시작: startTimer()
	당근수 표시: setCarrotCount()
	당근, 버그 랜덤배치: scatterImages()
	배경음악 시작: playBG()

중지버튼 클릭: stop()
	중지 버튼 사라짐: hideStopBtn()
	타이머 멈춤: stopTimer()
	결과배너 표시: 리플레이 버튼 + 'Replay ?': displayResultBanner(type: replay | win | lose)

당근 클릭
	당근수 하나씩 줄어듬: reduceCarrotCount()
	당근 클릭 사운드 재생: playCarrotPull()
	당근 개수가 1개에서 0개가 되면
		중지버튼 사라짐: hideStopBtn()
		타이머 멈춤: stopTimer()
		결과 배너 표시: 리플레이 버튼 + YOU WIN :displayResultBanner('win')

버그 클릭
	중지버튼 사라짐: hideStopBtn()
	버그 클릭 사운드 재생: playBugPull()
	타이머 멈춤: stopTimer()
	결과 배너 표시: 리플레이 버튼 + YOU LOST: displayResultBanner('lose')

타이머가 0초가 디면
	중지버튼 사라짐: hideStopBtn();
	결과배너 표시: 리플레이 버튼 + YOU LOST: displayResultBanner('lose')
  
 * 
 * 함수
 * 
 */
