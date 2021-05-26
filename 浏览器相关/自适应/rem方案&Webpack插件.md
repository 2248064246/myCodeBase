# rem方案

```javaScript
function rem() {
	const baseSize = 32; // 32
	function setRem() {
		const scale = document.documentElement.clientWidth / 750 // 750
		document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px"
		console.log(baseSize * Math.min(scale, 2) + "px")
	}
	setRem()

	window.onresize = function() {
		setRem();
	}
}
```

在 postcss.config.js 配置
```javaScript
postcss: {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 32, // 换算的基数
      propList: ['*'],
      // minPixelValue: 2
    }),
  ]
},
```



