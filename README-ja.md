



### 設定

| 名 | 型 | デフォルトの値 | 概要 |
--
| <span lang="en">auto</span>（オート）| ブール値 | true | start automatically the slider animation |
| <span lang="en">stop</span>（ストップ）| ブール値 | true | Auto stop the carousel after a certain amount of time |
| <span lang="en">speed</span>（スピード）| 数値 | 0 | Speed of the transition, in milliseconds. By default retrieved dynamically from the first item's css transiton duration |
| <span lang="en">timeout</span>（タイムアウト） | 数値 | 4000 | Time between slide transitions, in milliseconds (1s = 1000ms) |
| <span lang="en">pager</span>（ページャー） | ブール値 | <span lang="en">false</span> | ページネーションの表示 |
| <span lang="en">nav</span>（ナビ） | ブール値 | <span lang="en">false</span> | ナビゲーションの表示（「前へ」と「次へ」のやじるし） |
| <span lang="en">pause</span> （一時停止） | ブール値 | false | Suspendre la lecture automatique quand l'utilisateur interagit avec la diapositive en cours |
| <span lang="en">pauseControls</span> （コントロールの一時停止）| ブール値 | false | Suspendre la lecture automatique quand l'utilisateur survole les boutons de contrôles |
| <span lang="en">prevText</span>（前へのテキスト） | 文字列 | Previous | 一個前に戻りのボタン名 |
| <span lang="en">nextText</span>（次へのテキスト） | 文字列 | Next | 一個後に進みのボタン名 |
| <span lang="en">maxWidth</span> （最大値）| 数値 | 0 | スライドの最大値（単位：ピクセル、0：自動）|
| <span lang="en">navContainer</span> (ナビのラッパー) | 文字列 | '' | 決めたのHTMLノードがありましたら、ナビゲーションのボータンがそこに追加されます。なければ、ULタグの後に追加されます。|
| <span lang="en">manualControls</span> (カスタムページネーション) | 文字列 | '' | HTMLの中にあるのカスタムページネーションのHTMLルートノード |